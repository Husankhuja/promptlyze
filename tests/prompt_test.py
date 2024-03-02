import os, sys, json
# Add the parent directory to the sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), os.path.pardir)))


import unittest
from flask import json
from app import create_app, db
from app.models.user import User 

from tests.auth_test import sign_up_user, login_user, get_user


def create_prompt(client, token):
    data = {'prompt': 'This is a test prompt'}
    headers = {'Authorization': f'Bearer {token}'}
    return client.post('/prompts', headers=headers, data=json.dumps(data), content_type='application/json')

def get_prompts(client, token):
    return client.get('/prompts', headers={'Authorization': f'Bearer {token}'})

def get_prompt(client, token, prompt_id):
    return client.get(f'/prompts/{prompt_id}', headers={'Authorization': f'Bearer {token}'})

def update_prompt(client, token, prompt_id):
    data = {'prompt': 'This is an updated prompt'}
    headers = {'Authorization': f'Bearer {token}'}
    return client.put(f'/prompts/{prompt_id}', headers=headers, data=json.dumps(data), content_type='application/json')

def delete_prompt(client, token, prompt_id):
    return client.delete(f'/prompts/{prompt_id}', headers={'Authorization': f'Bearer {token}'})

class PromptAPITestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app()
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()
        self.client = self.app.test_client()

        sign_up_user(self.client)
        response = login_user(self.client)
        self.token = json.loads(response.data)['token']
        self.user = get_user()


    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_create_prompt(self):
        response = create_prompt(self.client, self.token)
        self.assertEqual(response.status_code, 201)
        self.assertIn('Prompt created successfully', response.get_data(as_text=True))

    def test_get_prompts(self):
        create_prompt(self.client, self.token)
        create_prompt(self.client, self.token)
        response = get_prompts(self.client, self.token)
        self.assertEqual(response.status_code, 200)
        self.assertIn('This is a test prompt', response.get_data(as_text=True))

    def test_get_prompt(self):
        create_prompt(self.client, self.token)
        response = get_prompt(self.client, self.token, 1)

        self.assertEqual(response.status_code, 200)
        self.assertIn('This is a test prompt', response.get_data(as_text=True))

    def test_update_prompt(self):
        create_prompt(self.client, self.token)
        response = update_prompt(self.client, self.token, 1)

        self.assertEqual(response.status_code, 200)
        self.assertIn('Prompt updated successfully', response.get_data(as_text=True))

        response = get_prompt(self.client, self.token, 1)
        self.assertIn('This is an updated prompt', response.get_data(as_text=True))

    def test_delete_prompt(self):
        create_prompt(self.client, self.token)
        response = delete_prompt(self.client, self.token, 1)

        self.assertEqual(response.status_code, 200)
        self.assertIn('Prompt deleted successfully', response.get_data(as_text=True))

        response = get_prompt(self.client, self.token, 1)
        self.assertEqual(response.status_code, 404)

if __name__ == '__main__':
    unittest.main()
