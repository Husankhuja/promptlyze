import os
from datetime import datetime
from flask import Blueprint, request, jsonify, send_from_directory
from werkzeug.utils import secure_filename
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.models.document import Document

from app.config import config

document_blueprint = Blueprint('document', __name__)

from app import bucketService

@document_blueprint.route('/upload', methods=['POST'])
@jwt_required()
def upload_document():
    user_id = get_jwt_identity()

    if 'file' not in request.files:
        return jsonify({'message': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'message': 'No selected file'}), 400

    if file:
        try:
            unique_filename = create_unique_filename(file.filename)
            # Temporarily save file to disk
            temp_path = os.path.join('/tmp', unique_filename)
            os.makedirs(os.path.dirname(temp_path), exist_ok=True)  # Create the directory if it doesn't exist
            file.save(temp_path)

            # Upload file to cloud storage
            bucketService.upload_blob(temp_path, unique_filename)

            # After upload, create a new document record
            new_document = Document(file_name=file.filename, stored_file_name=unique_filename, user_id=user_id)
            new_document.save()

            # Optionally, delete the temp file if no longer needed
            os.remove(temp_path)

            return jsonify({'message': 'File uploaded successfully'}), 200
        except Exception as e:
            return jsonify({'message': 'An error occurred'}), 500
    else:
        return jsonify({'message': 'File type not allowed'}), 400

    
@document_blueprint.route('/documents', methods=['GET'])
@jwt_required()
def get_documents():
    user_id = get_jwt_identity()
    documents = Document.query.filter_by(user_id=user_id).all()
    return jsonify([(document.file_name, document.stored_file_name) for document in documents]), 200

# route to delete a document
@document_blueprint.route('/documents/<int:document_id>', methods=['DELETE'])
@jwt_required()
def delete_document(document_id):
    user_id = get_jwt_identity()
    document = Document.query.filter_by(user_id=user_id, id=document_id).first()
    if not document:
        return 'Document not found', 404
    try:
        bucketService.delete_blob(document.stored_file_name)
        document.delete()
        return 'Document deleted successfully', 200
    except Exception as e:
        return 'An error occurred', 500

# route to download a document
@document_blueprint.route('/documents/<int:document_id>', methods=['GET'])
@jwt_required()
def download_document(document_id):
    user_id = get_jwt_identity()
    document = Document.query.filter_by(user_id=user_id, id=document_id).first()
    if not document:
        return 'Document not found', 404
    try:
        blob = bucketService.get_blob(document.stored_file_name)
        if blob is None:
            return 'Document not found in cloud storage', 404
        return blob.download_as_text(), 200
    except Exception as e:
        return 'An error occurred', 500

def allowed_file(filename):
    return filename[:-4] == '.pdf'

def create_unique_filename(original_filename):
    """
    Generate a unique filename based on the original filename by appending
    a timestamp before the file ext ension.
    """
    base, extension = os.path.splitext(original_filename)
    base = secure_filename(base)  # Sanitize the filename
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S%f")  # Current time down to microseconds
    unique_name = f"{base}_{timestamp}{extension}"
    return unique_name
