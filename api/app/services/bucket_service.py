from google.cloud import storage

from app.config import config

class BucketService:
    def __init__(self):
        self.storage_client = storage.Client.from_service_account_json('./service-account.json')
        self.bucket = self.storage_client.bucket(config['BUCKET_NAME'])

    def upload_blob(self, source_file_name, destination_blob_name):
        """Uploads a file to the bucket."""
        blob = self.bucket.blob(destination_blob_name)
        blob.upload_from_filename(source_file_name)

    def upload_blob_from_string(self, data, destination_blob_name):
        """Uploads a file to the bucket."""
        blob = self.bucket.blob(destination_blob_name)
        blob.upload_from_string(data)

    def download_blob(self, source_blob_name, destination_file_name):
        """Downloads a blob from the bucket."""
        blob = self.bucket.blob(source_blob_name)
        blob.download_to_filename(destination_file_name)

    def read_blob(self, blob_name):
        """Reads a blob from the bucket."""
        blob = self.bucket.blob(blob_name)
        return blob.download_as_text()

    def delete_blob(self, blob_name):
        """Deletes a blob from the bucket."""
        blob = self.bucket.blob(blob_name)
        blob.delete()

    def list_blobs(self):
        """Lists all the blobs in the bucket."""
        blobs = self.bucket.list_blobs()
        return [blob.name for blob in blobs]
    
    def list_blobs_with_prefix(self, prefix):
        """Lists all the blobs in the bucket."""
        blobs = self.bucket.list_blobs(prefix=prefix)
        return [blob.name for blob in blobs]
