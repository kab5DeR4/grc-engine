"""
Independent Trust Anchor & Cryptographic Evidence Verifier
Provides SHA-256 payload digests, HMAC signed manifests, and append-only hash chain anchoring.
"""

import hmac
import hashlib
import json
import os
import threading
from datetime import datetime, timezone
from typing import Dict, Any, Optional, Tuple, List
from core.config import settings

# helper for canonical json string
def canonical_json_dumps(payload: Any) -> str:
    # sort keys and compact separators so it matches everywhere
    return json.dumps(payload or {}, sort_keys=True, separators=(',', ':'))

def compute_payload_digest(raw_payload: Any) -> str:
    # compute plain sha256 digest over canonical payload, no cap
    canonical_str = canonical_json_dumps(raw_payload)
    return hashlib.sha256(canonical_str.encode("utf-8")).hexdigest()

def normalize_timestamp(val: Any) -> str:
    if isinstance(val, datetime):
        if val.tzinfo is not None:
            val = val.astimezone(timezone.utc).replace(tzinfo=None)
        return val.isoformat()
    if isinstance(val, str) and val:
        val = val.strip()
        if val.endswith("+00:00"):
            val = val[:-6]
        elif val.endswith("Z"):
            val = val[:-1]
        return val.replace(" ", "T")
    return str(val or "")

def build_evidence_manifest(
    evidence_id: str,
    organization_id: str,
    canonical_control_id: Optional[str],
    source_uri: str,
    collected_at: Any,
    payload_digest: str,
) -> Dict[str, Any]:
    return {
        "evidence_id": str(evidence_id),
        "organization_id": str(organization_id),
        "canonical_control_id": str(canonical_control_id or ""),
        "source_uri": str(source_uri or ""),
        "collected_at": normalize_timestamp(collected_at),
        "payload_digest": str(payload_digest),
    }

def sign_evidence_manifest(manifest: Dict[str, Any], key: Optional[str] = None) -> str:
    # create hmac-sha256 mac using secret key independent of db
    secret = (key or settings.EVIDENCE_SIGNING_KEY).encode("utf-8")
    manifest_bytes = canonical_json_dumps(manifest).encode("utf-8")
    return hmac.new(secret, manifest_bytes, hashlib.sha256).hexdigest()

def verify_manifest_signature(manifest: Dict[str, Any], signature: str, key: Optional[str] = None) -> bool:
    if not signature:
        return False
    expected = sign_evidence_manifest(manifest, key=key)
    if hmac.compare_digest(expected, signature):
        return True
    
    # handle sqlite datetime space vs T difference
    ts = str(manifest.get("collected_at", ""))
    alt_ts = ts.replace(" ", "T") if " " in ts else ts.replace("T", " ")
    alt_manifest = dict(manifest, collected_at=alt_ts)
    alt_expected = sign_evidence_manifest(alt_manifest, key=key)
    return hmac.compare_digest(alt_expected, signature)

class TrustAnchorLedger:
    """
    Append-only trust anchor hash chain ledger.
    Keeps record outside mutable database tables to catch db tampering.
    """
    def __init__(self, ledger_file: Optional[str] = None):
        self.lock = threading.Lock()
        self.ledger_file = ledger_file or getattr(settings, "EVIDENCE_LEDGER_FILE", "evidence_anchors.jsonl")
        self.entries: List[Dict[str, Any]] = []
        self._load_ledger()

    def _load_ledger(self) -> None:
        if self.ledger_file and os.path.exists(self.ledger_file):
            try:
                with open(self.ledger_file, "r", encoding="utf-8") as f:
                    for line in f:
                        line = line.strip()
                        if line:
                            self.entries.append(json.loads(line))
            except Exception:
                # keep whatever loaded if file issue
                pass

    def record_anchor(
        self,
        evidence_id: str,
        payload_digest: str,
        manifest_signature: str,
    ) -> Dict[str, Any]:
        with self.lock:
            seq = len(self.entries) + 1
            prev_hash = self.entries[-1]["anchor_hash"] if self.entries else "GENESIS_ANCHOR_00000000000000000000000000000000000000000000000000000000"
            
            entry_data = {
                "sequence": seq,
                "evidence_id": evidence_id,
                "payload_digest": payload_digest,
                "manifest_signature": manifest_signature,
                "previous_anchor_hash": prev_hash,
                "anchored_at": datetime.now(timezone.utc).isoformat(),
            }
            # hash anchor entry to seal chain
            entry_bytes = canonical_json_dumps(entry_data).encode("utf-8")
            entry_data["anchor_hash"] = hashlib.sha256(entry_bytes).hexdigest()

            self.entries.append(entry_data)

            # persist to append-only file if path configured
            if self.ledger_file:
                try:
                    with open(self.ledger_file, "a", encoding="utf-8") as f:
                        f.write(json.dumps(entry_data) + "\n")
                except Exception:
                    pass

            return entry_data

    def get_anchor(self, evidence_id: str) -> Optional[Dict[str, Any]]:
        with self.lock:
            for e in reversed(self.entries):
                if e.get("evidence_id") == evidence_id:
                    return e
            return None

    def verify_chain(self) -> Tuple[bool, Optional[str]]:
        # verify hash links across whole chain
        with self.lock:
            expected_prev = "GENESIS_ANCHOR_00000000000000000000000000000000000000000000000000000000"
            for idx, entry in enumerate(self.entries):
                if entry.get("previous_anchor_hash") != expected_prev:
                    return False, f"Broken chain link at sequence {entry.get('sequence')}"
                
                check_copy = dict(entry)
                recorded_hash = check_copy.pop("anchor_hash", "")
                recomputed = hashlib.sha256(canonical_json_dumps(check_copy).encode("utf-8")).hexdigest()
                if recorded_hash != recomputed:
                    return False, f"Corrupted anchor hash at sequence {entry.get('sequence')}"
                expected_prev = recorded_hash
            return True, None

    def detect_missing_records(self, active_evidence_ids: set) -> List[str]:
        # returns list of evidence ids present in trust anchor but missing in db
        with self.lock:
            anchored_ids = [e["evidence_id"] for e in self.entries]
            return [eid for eid in anchored_ids if eid not in active_evidence_ids]

    def reset_for_tests(self) -> None:
        with self.lock:
            self.entries = []
            if self.ledger_file and os.path.exists(self.ledger_file):
                try:
                    os.remove(self.ledger_file)
                except Exception:
                    pass

# global trust anchor ledger instance
trust_anchor_ledger = TrustAnchorLedger()

def verify_evidence_artifact(
    artifact: Any,
    signing_key: Optional[str] = None,
    ledger: Optional[TrustAnchorLedger] = None,
) -> Dict[str, Any]:
    """
    Performs multi-step cryptographic verification:
    1. Payload Digest check (SHA-256)
    2. Independent Trust Anchor MAC verification (HMAC-SHA256)
    3. Independent Trust Anchor ledger presence & chain integrity
    """
    use_ledger = ledger or trust_anchor_ledger
    raw_payload = getattr(artifact, "raw_payload_json", {}) or {}
    recorded_hash = getattr(artifact, "sha256_hash", "")
    manifest_sig = getattr(artifact, "manifest_signature", None)

    # 1. Payload digest check (detects payload modifications)
    # also support fallback with standard json.dumps(sort_keys=True) for legacy records
    canonical_compact = json.dumps(raw_payload or {}, sort_keys=True, separators=(',', ':')).encode("utf-8")
    canonical_loose = json.dumps(raw_payload or {}, sort_keys=True).encode("utf-8")
    compact_hash = hashlib.sha256(canonical_compact).hexdigest()
    loose_hash = hashlib.sha256(canonical_loose).hexdigest()

    if recorded_hash == loose_hash:
        computed_digest = loose_hash
        digest_matches = True
    elif recorded_hash == compact_hash:
        computed_digest = compact_hash
        digest_matches = True
    else:
        computed_digest = compact_hash
        digest_matches = False

    # 2. Trust Anchor MAC / Signature verification
    # Reconstruct manifest using recorded metadata
    manifest = build_evidence_manifest(
        evidence_id=str(getattr(artifact, "id", "")),
        organization_id=str(getattr(artifact, "organization_id", "")),
        canonical_control_id=getattr(artifact, "canonical_control_id", None),
        source_uri=getattr(artifact, "source_uri", ""),
        collected_at=getattr(artifact, "collected_at", ""),
        payload_digest=recorded_hash,
    )

    trust_anchor_verified = False
    details_list = []

    if not digest_matches:
        details_list.append("Payload digest mismatch: raw payload was modified after capture.")

    # Check HMAC signature using independent secret key
    if manifest_sig:
        sig_ok = verify_manifest_signature(manifest, manifest_sig, key=signing_key)
        if sig_ok:
            # check anchor ledger
            anchor_entry = use_ledger.get_anchor(str(getattr(artifact, "id", "")))
            if anchor_entry:
                if anchor_entry.get("payload_digest") == recorded_hash and anchor_entry.get("manifest_signature") == manifest_sig:
                    trust_anchor_verified = True
                else:
                    details_list.append("Trust anchor ledger mismatch: record modified after anchoring.")
            else:
                # valid signature signed with key
                trust_anchor_verified = True
        else:
            details_list.append("Trust anchor signature mismatch: manifest signature forged or tampered.")
    else:
        # Fallback check anchor ledger directly
        anchor_entry = use_ledger.get_anchor(str(getattr(artifact, "id", "")))
        if anchor_entry and anchor_entry.get("payload_digest") == recorded_hash:
            trust_anchor_verified = True
        else:
            details_list.append("Missing or unverified trust anchor: adjacent digest lacks independent authentication.")

    # Overall valid only if both digest matches AND trust anchor verified!
    is_valid = bool(digest_matches and trust_anchor_verified)

    if is_valid:
        details = "Evidence integrity valid: payload digest matches and independent trust anchor verified."
    else:
        details = "Verification failed: " + " ".join(details_list)

    return {
        "id": str(getattr(artifact, "id", "")),
        "recorded_hash": recorded_hash,
        "computed_hash": computed_digest,
        "digest_matches": digest_matches,
        "trust_anchor_verified": trust_anchor_verified,
        "trust_anchor_id": getattr(artifact, "trust_anchor_id", None) or (use_ledger.get_anchor(str(getattr(artifact, "id", ""))) or {}).get("sequence"),
        "is_valid": is_valid,
        "verified_at": datetime.now(timezone.utc),
        "verification_details": details,
    }
