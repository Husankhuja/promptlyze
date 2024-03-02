import os
import sys
# Add the parent directory to the sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), os.path.pardir)))

import unittest
import json
from app import create_app, db  # Adjust the import path according to your project structure

from app.models.user import User

def sign_up_user(client):
    user_data = {
            'firstname': 'John',
            'lastname': 'Doe',
            'email': 'johndoe@gmail.com',
            'password': 'password123'
        }
    
    return client.post('/register', data=json.dumps(user_data), content_type='application/json')

def login_user(client):
    user_data = {
        'email': 'johndoe@gmail.com',
        'password': 'password123'
    }
    return client.post('/login', data=json.dumps(user_data), content_type='application/json')

def get_user():
    return User.query.filter_by(email="johndoe@gmail.com").first()



class UserRegistrationTestCase(unittest.TestCase):

    def setUp(self):
        """Define test variables and initialize app."""
        # Assuming you have a testing configuration set in your Flask app
        self.app = create_app()
        self.client = self.app.test_client()
        # binds the app to the current context
        with self.app.app_context():
            # create all tables
            db.create_all()

    def test_user_registration(self):
        """Test API can register a user (POST request)"""
        res = sign_up_user(self.client)
        self.assertEqual(res.status_code, 201)
        self.assertIn('User registered successfully', str(res.data))

    def test_user_login(self):
        """Test API can login a user (POST request)"""
        # First, register a user
        sign_up_user(self.client)
        # Then, login the user
        res = login_user(self.client)
        self.assertEqual(res.status_code, 200)
        self.assertIn('token', str(res.data))

    def tearDown(self):
        """Tear down all initialized variables."""
        with self.app.app_context():
            # drop all tables
            db.session.remove()
            db.drop_all()

if __name__ == "__main__":
    unittest.main()
