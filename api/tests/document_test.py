import os, sys, json
from google.cloud import storage

# Add the parent directory to the sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), os.path.pardir)))

import unittest
from app import create_app, db, bucketService

from tests.auth_test import sign_up_user, login_user, get_user

from app.models.document import Document
from app.models.user import User

from app.config import config

def upload_file(client, token):
    data = {
        'file': (open('./tests/documents/document.pdf', 'rb'), 'document.pdf')
    }
    headers = {
        'Authorization': f'Bearer {token}'
    }
    return client.post('/upload', data=data, content_type='multipart/form-data', headers=headers)

def remove_uploads(filename):
    """Remove uploaded files from Google Cloud Storage."""
    blob = bucketService.delete_blob(filename)

class DocumentRouteTestCase(unittest.TestCase):
    def setUp(self):
        """Set up test variables."""
        self.app = create_app()
        self.client = self.app.test_client()
        self.upload_url = '/upload'
        with self.app.app_context():
            db.create_all()

    def tearDown(self):
        """Tear down test variables."""
        with self.app.app_context():
            db.session.remove()
            db.drop_all()

    def test_upload_file(self):
        """Test file upload."""
        sign_up_user(self.client)
        res = login_user(self.client)
        token = json.loads(res.data)['token']
        
        response = upload_file(self.client, token)

        self.assertEqual(response.status_code, 200)

        with self.app.app_context():
            user = get_user()
            document = Document.query.filter_by(user_id=user.id).first()

        self.assertIsNotNone(document)
        self.assertEqual(document.file_name, 'document.pdf')

        blob = bucketService.bucket.blob(document.stored_file_name)
        self.assertTrue(blob.exists())

        remove_uploads(document.stored_file_name)

    def test_get_documents(self):
        """Test getting user documents."""
        sign_up_user(self.client)
        res = login_user(self.client)
        token = json.loads(res.data)['token']

        upload_file(self.client, token)

        headers = {
            'Authorization': f'Bearer {token}'
        }
        response = self.client.get('/documents', headers=headers)

        document = json.loads(response.data)[0]

        self.assertEqual(response.status_code, 200)
        self.assertEqual(document[0], 'document.pdf')

        remove_uploads(document[1])

if __name__ == '__main__':
    unittest.main()