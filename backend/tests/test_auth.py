"""
Authentication and user management tests
"""

import os
import sys
import time
import unittest

# ensure backend path is resolved fr
BACKEND_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
if BACKEND_DIR not in sys.path:
    sys.path.insert(0, BACKEND_DIR)

from fastapi.testclient import TestClient
from server import app
from core.security import verify_password, get_password_hash, create_access_token

client = TestClient(app)

class TestAuthEndpoints(unittest.TestCase):
    def setUp(self):
        # make unique email each run so no collisions fr
        self.unique_id = int(time.time() * 1000)
        self.test_email = f"sec_user_{self.unique_id}@example.com"
        self.test_password = "SuperSecretPassword123!"

    def test_password_hashing_and_verification(self):
        # test password hashing logic
        hashed = get_password_hash("mySecurePass")
        self.assertTrue(verify_password("mySecurePass", hashed))
        self.assertFalse(verify_password("wrongPass", hashed))

    def test_create_access_token(self):
        # test jwt token generation
        token = create_access_token(subject="user-12345")
        self.assertIsInstance(token, str)
        self.assertGreater(len(token), 20)

    def test_register_and_login_flow(self):
        # register brand new user
        reg_payload = {
            "email": self.test_email,
            "password": self.test_password,
            "full_name": "Roshan Dev",
            "organization_name": f"Cloud Corp {self.unique_id}"
        }
        reg_resp = client.post("/api/v1/auth/register", json=reg_payload)
        self.assertEqual(reg_resp.status_code, 200)
        reg_data = reg_resp.json()
        self.assertIn("access_token", reg_data)
        self.assertEqual(reg_data["user"]["email"], self.test_email)

        # test duplicate registration fails cleanly
        dup_resp = client.post("/api/v1/auth/register", json=reg_payload)
        self.assertEqual(dup_resp.status_code, 400)

        # login with same user
        login_payload = {
            "email": self.test_email,
            "password": self.test_password
        }
        login_resp = client.post("/api/v1/auth/login", json=login_payload)
        self.assertEqual(login_resp.status_code, 200)
        login_data = login_resp.json()
        token = login_data["access_token"]
        self.assertTrue(token)

        # fetch profile /me using bearer token
        headers = {"Authorization": f"Bearer {token}"}
        me_resp = client.get("/api/v1/auth/me", headers=headers)
        self.assertEqual(me_resp.status_code, 200)
        me_data = me_resp.json()
        self.assertEqual(me_data["email"], self.test_email)

    def test_login_invalid_password(self):
        # test bad password rejected
        login_payload = {
            "email": "admin@grcengine.com",
            "password": "totallyWrongPassword"
        }
        resp = client.post("/api/v1/auth/login", json=login_payload)
        self.assertEqual(resp.status_code, 401)

if __name__ == "__main__":
    unittest.main()
