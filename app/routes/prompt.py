import os
from datetime import datetime
from flask import Blueprint, request, jsonify, send_from_directory
from werkzeug.utils import secure_filename
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.models.document import Document
from app.models.prompt import Prompt

from app.config import config

prompt_blueprint = Blueprint('prompt', __name__)


@prompt_blueprint.route('/prompts', methods=['POST'])
@jwt_required()
def create_prompt():
    user_id = get_jwt_identity()
    data = request.get_json()

    if 'prompt' not in data:
        return jsonify({'message': 'No prompt provided'}), 400

    new_prompt = Prompt(prompt=data['prompt'], user_id=user_id)
    new_prompt.save()

    return jsonify({'message': 'Prompt created successfully', 'prompt': data['prompt']}), 201

@prompt_blueprint.route('/prompts', methods=['GET'])
@jwt_required()
def get_prompts():
    user_id = get_jwt_identity()
    prompts = Prompt.query.filter_by(user_id=user_id).all()
    return jsonify({'prompts': [prompt.prompt for prompt in prompts]}), 200

@prompt_blueprint.route('/prompts/<int:prompt_id>', methods=['GET'])
@jwt_required()
def get_prompt(prompt_id):
    user_id = get_jwt_identity()
    prompt = Prompt.query.filter_by(id=prompt_id, user_id=user_id).first()

    if prompt is None:
        return jsonify({'message': 'Prompt not found'}), 404

    return jsonify({'prompt': prompt.prompt}), 200

@prompt_blueprint.route('/prompts/<int:prompt_id>', methods=['PUT'])
@jwt_required()
def update_prompt(prompt_id):
    user_id = get_jwt_identity()
    prompt = Prompt.query.filter_by(id=prompt_id, user_id=user_id).first()

    if prompt is None:
        return jsonify({'message': 'Prompt not found'}), 404

    data = request.get_json()
    prompt.prompt = data.get('prompt', prompt.prompt)

    prompt.save()

    return jsonify({'message': 'Prompt updated successfully'}), 200

@prompt_blueprint.route('/prompts/<int:prompt_id>', methods=['DELETE'])
@jwt_required()
def delete_prompt(prompt_id):
    user_id = get_jwt_identity()
    prompt = Prompt.query.filter_by(id=prompt_id, user_id=user_id).first()

    if not prompt:
        return jsonify({'message': 'Prompt not found'}), 404

    prompt.delete()

    return jsonify({'message': 'Prompt deleted successfully'}), 200
