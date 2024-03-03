import os, json
from datetime import datetime
from flask import Blueprint, request, jsonify, send_from_directory
from werkzeug.utils import secure_filename
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.models.document import Document
from app.models.prompt import Prompt

from app.config import config

from app.services.openai_service import extract_information
from app.utils.annotations import document_has_annotation, get_annotation, annotate_documents, get_annotation_text


function_blueprint = Blueprint('function', __name__)

@function_blueprint.route('/run_prompt', methods=['POST'])
@jwt_required()
def run_prompt():
    user_id = get_jwt_identity()
    data = request.get_json()

    if 'documents' not in data:
        return jsonify({'message': 'No document provided'}), 400

    if 'prompt' not in data:
        return jsonify({'message': 'No prompt provided'}), 400

    documents = data['documents']
    
    
    texts = {} # documnt_id: text
    docs_to_annotate = []
    for document in documents:
        document_id = document['id']
        if not document_has_annotation(document_id):
            docs_to_annotate.append(document_id)

    annotate_documents(docs_to_annotate, user_id)

    for document in documents:
        document_id = document['id']
        annotation = get_annotation(document_id)
        
        text = get_annotation_text(annotation.id)
        texts[document_id] = text

    # if prompt has id, get promp by id, else create it
    if 'id' in data['prompt']:
        prompt = Prompt.query.filter_by(id=data['prompt']['id']).first()
    else:
        prompt = Prompt(user_id=user_id, prompt=json.dumps(data['prompt']))
        prompt.save()

    parameters = data['prompt']

    outputs = []
    for document_id in texts:
        output = extract_information(texts[document_id], parameters)
        output['document_id'] = document_id
        outputs.append(output)
    return jsonify(outputs), 200