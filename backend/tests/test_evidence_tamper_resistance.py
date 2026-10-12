"""
Evidence Vault Tamper-Resistance Tests
Tests modifying payload, modifying both payload and digest, deleting records, and unauthorized updates.
"""

import os
import sys
import json
import uuid
import unittest
import asyncio
from datetime import datetime, timezone

# ensure backend path resolved fr
BACKEND_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
if BACKEND_DIR not in sys.path:
    sys.path.insert(0, BACKEND_DIR)

from fastapi.testclient import TestClient
from server import app
from database import async_session_factory
from models.evidence import EvidenceArtifact
from models.organization import Organization
from models.integration import Integration
from models.asset import Asset
from core.trust_anchor import (
    compute_payload_digest,
    build_evidence_manifest,
    sign_evidence_manifest,
    trust_anchor_ledger,
)

client = TestClient(app)

class TestEvidenceTamperResistance(unittest.TestCase):

    def setUp(self):
        # helper to seed base org and asset if needed fr
        async def seed_prereqs():
            async with async_session_factory() as session:
                from sqlalchemy import select
                org_res = await session.execute(select(Organization).limit(1))
                org = org_res.scalars().first()
                if not org:
                    org = Organization(name="Tamper Test Org", slug="tamper-org")
                    session.add(org)
                    await session.flush()

                integ_res = await session.execute(select(Integration).limit(1))
                integ = integ_res.scalars().first()
                if not integ:
                    integ = Integration(
                        organization_id=org.id,
                        provider_type="github",
                        name="GitHub Test Integ",
                        category="CI/CD",
                        status="CONNECTED",
                        credentials_encrypted="test-token"
                    )
                    session.add(integ)
                    await session.flush()

                asset_res = await session.execute(select(Asset).limit(1))
                asset = asset_res.scalars().first()
                if not asset:
                    asset = Asset(
                        organization_id=org.id,
                        integration_id=integ.id,
                        asset_type="github_repository",
                        external_id="acme/vault-repo",
                        name="vault-repo",
                        environment="production"
                    )
                    session.add(asset)
                    await session.flush()

                await session.commit()
                return org.id, asset.id

        self.org_id, self.asset_id = asyncio.run(seed_prereqs())

    def _create_anchored_evidence(self, payload: dict) -> str:
        # helper to create legitimate anchored evidence artifact
        ev_id = str(uuid.uuid4())
        digest = compute_payload_digest(payload)
        collected_dt = datetime(2026, 10, 12, 12, 0, 0, tzinfo=timezone.utc)
        
        manifest = build_evidence_manifest(
            evidence_id=ev_id,
            organization_id=self.org_id,
            canonical_control_id="CTL-GH-01",
            source_uri="github://acme/vault-repo/protection",
            collected_at=collected_dt,
            payload_digest=digest,
        )
        manifest_sig = sign_evidence_manifest(manifest)
        anchor_entry = trust_anchor_ledger.record_anchor(ev_id, digest, manifest_sig)

        async def insert_artifact():
            async with async_session_factory() as session:
                artifact = EvidenceArtifact(
                    id=ev_id,
                    organization_id=self.org_id,
                    asset_id=self.asset_id,
                    canonical_control_id="CTL-GH-01",
                    evidence_code="EVD-TMP-01",
                    title="Tamper Test Evidence",
                    sha256_hash=digest,
                    manifest_signature=manifest_sig,
                    trust_anchor_id=str(anchor_entry.get("sequence")),
                    source_uri="github://acme/vault-repo/protection",
                    raw_payload_json=payload,
                    status="VERIFIED_IMMUTABLE",
                    collected_at=collected_dt,
                )
                session.add(artifact)
                await session.commit()
                return artifact.id

        return asyncio.run(insert_artifact())

    def test_tamper_payload_only_fails_verification(self):
        # 1. modify payload only in db, digest check should catch it fr
        original_payload = {"branch": "main", "protected": True, "strict": True}
        artifact_id = self._create_anchored_evidence(original_payload)

        # verify valid at first
        resp = client.get(f"/api/v1/evidence/{artifact_id}/verify")
        self.assertEqual(resp.status_code, 200)
        self.assertTrue(resp.json()["is_valid"])

        # simulate attacker mutating only the payload column in the database
        async def mutate_payload_in_db():
            async with async_session_factory() as session:
                from sqlalchemy import select
                res = await session.execute(select(EvidenceArtifact).where(EvidenceArtifact.id == artifact_id))
                artifact = res.scalars().first()
                # bypass orm check using internal flag to simulate direct db row tampering
                artifact._allow_internal_modification = True
                artifact.raw_payload_json = {"branch": "main", "protected": False, "strict": False}
                await session.commit()

        asyncio.run(mutate_payload_in_db())

        # hit verification endpoint
        verify_resp = client.get(f"/api/v1/evidence/{artifact_id}/verify")
        self.assertEqual(verify_resp.status_code, 200)
        data = verify_resp.json()
        
        # payload digest mismatch detected!
        self.assertFalse(data["digest_matches"])
        self.assertFalse(data["is_valid"])
        self.assertIn("Payload digest mismatch", data["verification_details"])

    def test_tamper_both_payload_and_digest_fails_verification(self):
        # 2. sneaky attacker modifies BOTH payload and adjacent digest in db
        original_payload = {"branch": "main", "enforce_admins": True}
        artifact_id = self._create_anchored_evidence(original_payload)

        tampered_payload = {"branch": "main", "enforce_admins": False}
        tampered_digest = compute_payload_digest(tampered_payload)

        # simulate attacker updating both columns in mutable database store
        async def mutate_both_columns():
            async with async_session_factory() as session:
                from sqlalchemy import select
                res = await session.execute(select(EvidenceArtifact).where(EvidenceArtifact.id == artifact_id))
                artifact = res.scalars().first()
                artifact._allow_internal_modification = True
                artifact.raw_payload_json = tampered_payload
                artifact.sha256_hash = tampered_digest
                await session.commit()

        asyncio.run(mutate_both_columns())

        # hit verify endpoint
        verify_resp = client.get(f"/api/v1/evidence/{artifact_id}/verify")
        self.assertEqual(verify_resp.status_code, 200)
        data = verify_resp.json()

        # adjacent digest matches tampered payload... BUT independent trust anchor catches it!
        self.assertTrue(data["digest_matches"])
        self.assertFalse(data["trust_anchor_verified"])
        self.assertFalse(data["is_valid"])
        self.assertIn("Trust anchor signature mismatch", data["verification_details"])

    def test_delete_records_rejected_and_detected(self):
        # 3. delete records: api blocks it, orm blocks it, and ledger detects missing records fr
        payload = {"branch": "main", "required_reviews": 2}
        artifact_id = self._create_anchored_evidence(payload)

        # attempt HTTP DELETE on endpoint -> blocked 405
        del_resp = client.delete(f"/api/v1/evidence/{artifact_id}")
        self.assertEqual(del_resp.status_code, 405)

        # attempt ORM delete without bypass -> raises ValueError
        async def try_orm_delete():
            async with async_session_factory() as session:
                from sqlalchemy import select
                res = await session.execute(select(EvidenceArtifact).where(EvidenceArtifact.id == artifact_id))
                artifact = res.scalars().first()
                await session.delete(artifact)
                await session.commit()

        with self.assertRaises(ValueError):
            asyncio.run(try_orm_delete())

        # now simulate raw sql deletion and ensure trust anchor ledger detects missing record
        async def raw_sql_delete():
            async with async_session_factory() as session:
                from sqlalchemy import select
                res = await session.execute(select(EvidenceArtifact).where(EvidenceArtifact.id == artifact_id))
                artifact = res.scalars().first()
                artifact._allow_internal_modification = True
                await session.delete(artifact)
                await session.commit()

        asyncio.run(raw_sql_delete())

        # querying deleted record via API returns 404
        get_resp = client.get(f"/api/v1/evidence/{artifact_id}/verify")
        self.assertEqual(get_resp.status_code, 404)

        # trust anchor ledger detects that anchored record is missing from active db set
        missing = trust_anchor_ledger.detect_missing_records(active_evidence_ids=set())
        self.assertIn(artifact_id, missing)

    def test_unauthorized_updates_rejected(self):
        # 4. in-place updates: api blocks PUT/PATCH, orm blocks update, forged signatures fail fr
        payload = {"branch": "main", "strict_linear": True}
        artifact_id = self._create_anchored_evidence(payload)

        # attempt HTTP PUT -> 405 Method Not Allowed
        put_resp = client.put(f"/api/v1/evidence/{artifact_id}", json={"strict_linear": False})
        self.assertEqual(put_resp.status_code, 405)

        # attempt HTTP PATCH -> 405 Method Not Allowed
        patch_resp = client.patch(f"/api/v1/evidence/{artifact_id}", json={"status": "REVOKED"})
        self.assertEqual(patch_resp.status_code, 405)

        # attempt ORM update without bypass -> raises ValueError
        async def try_orm_update():
            async with async_session_factory() as session:
                from sqlalchemy import select
                res = await session.execute(select(EvidenceArtifact).where(EvidenceArtifact.id == artifact_id))
                artifact = res.scalars().first()
                artifact.status = "TAMPERED"
                await session.commit()

        with self.assertRaises(ValueError):
            asyncio.run(try_orm_update())

        # test forged signature / unauthorized key
        forged_id = str(uuid.uuid4())
        fake_sig = "deadbeef" * 8
        digest = compute_payload_digest({"forged": True})

        async def insert_forged_artifact():
            async with async_session_factory() as session:
                artifact = EvidenceArtifact(
                    id=forged_id,
                    organization_id=self.org_id,
                    asset_id=self.asset_id,
                    evidence_code="EVD-FORGED",
                    title="Forged Artifact",
                    sha256_hash=digest,
                    manifest_signature=fake_sig,
                    source_uri="github://fake/repo",
                    raw_payload_json={"forged": True},
                    status="VERIFIED_IMMUTABLE",
                )
                session.add(artifact)
                await session.commit()

        asyncio.run(insert_forged_artifact())

        # verification fails because trust anchor signature was forged
        resp = client.get(f"/api/v1/evidence/{forged_id}/verify")
        self.assertEqual(resp.status_code, 200)
        self.assertFalse(resp.json()["trust_anchor_verified"])
        self.assertFalse(resp.json()["is_valid"])

if __name__ == "__main__":
    unittest.main()
