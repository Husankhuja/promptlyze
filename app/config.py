import os
from dotenv import load_dotenv 

load_dotenv()

config = {
    'SQLALCHEMY_DATABASE_URI' : 'sqlite:///mydb.db',
    'JWT_SECRET_KEY' : os.getenv('JWT_SECRET_KEY', 'test-key'),
    'SQLALCHEMY_TRACK_MODIFICATIONS' : False,
    'UPLOAD_FOLDER' : './documents/',
    'BUCKET_NAME' : os.getenv('BUCKET_NAME', 'test-bucket'),
}