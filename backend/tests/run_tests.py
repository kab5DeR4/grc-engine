"""
Test suite runner for GRC Engine Backend
"""

import os
import sys
import unittest
import asyncio

# ensure backend directory is in python sys.path fr
BACKEND_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
if BACKEND_DIR not in sys.path:
    sys.path.insert(0, BACKEND_DIR)

from database import init_db

def run():
    print("=" * 60)
    print("RUNNING GRC ENGINE BACKEND TEST SUITE")
    print("=" * 60)

    # ensure tables exist
    asyncio.run(init_db())

    loader = unittest.TestLoader()
    suite = loader.discover(os.path.dirname(__file__), pattern="test_*.py")
    runner = unittest.TextTestRunner(verbosity=2)
    result = runner.run(suite)
    if not result.wasSuccessful():
        sys.exit(1)
    print("\n[OK] ALL TESTS PASSED CLEANLY!")

if __name__ == "__main__":
    run()
