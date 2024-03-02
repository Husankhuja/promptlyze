from flask import Blueprint, request, jsonify
from app.models.user import User

from flask_jwt_extended import create_access_token


auth_blueprint = Blueprint('auth', __name__)

@auth_blueprint.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    firstname = data.get('firstname')
    lastname = data.get('lastname')
    email = data.get('email')
    password = data.get('password')
    new_user = User(email=email, firstname=firstname, lastname=lastname)
    new_user.password = password
    new_user.save()
    
    return jsonify({'message': 'User registered successfully'}), 201

@auth_blueprint.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    user = authenticate_user(email, password)
    if not user:
        return jsonify({'message': 'Invalid credentials'}), 401
    
    token = create_access_token(identity=user.id)
    
    return jsonify({'token': token}), 200

# Function to authenticate user, this is just a placeholder.
def authenticate_user(email, password):
    user = User.query.filter_by(email=email).first()
    if user and user.verify_password(password):
        return user
    return None
