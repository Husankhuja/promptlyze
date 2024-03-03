import os, sys, json
# Add the parent directory to the sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), os.path.pardir)))

import unittest
from app import create_app, db, bucketService

from app.models.document import Document

from tests.auth_test import sign_up_user, login_user, get_user
from tests.document_test import upload_file, upload_files


class RunPromptTestCase(unittest.TestCase):
    def setUp(self):
        """Define test variables and initialize app."""
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
        """Tear down all initialized variables."""
        with self.app.app_context():
            db.session.remove()
            db.drop_all()


    def test_run_prompt(self):
        """Test running a prompt."""
        upload_files(self.client, self.token)
        documents = Document.query.filter_by(user_id=self.user.id)
        data = {
            "documents": [{"id": document.id} for document in documents],
            "prompt": {"name": "name found in the document"}
        }
        headers = {
            'Authorization': f'Bearer {self.token}'
        }

        response = self.client.post('/run_prompt', data=json.dumps(data), content_type='application/json', headers=headers)
        print(response.data)

        self.assertEqual(response.status_code, 200)

if __name__ == '__main__':
    unittest.main()
