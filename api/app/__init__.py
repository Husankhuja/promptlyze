from flask import Flask
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy

from app.services.bucket_service import BucketService

# Initialize extensions, but don't associate them with an app yet
db = SQLAlchemy()
jwt = JWTManager()
bucketService = BucketService()

def create_app():
    app = Flask(__name__)

    # App configuration
    from .config import config
    app.config['SQLALCHEMY_DATABASE_URI'] = config['SQLALCHEMY_DATABASE_URI']
    app.config['JWT_SECRET_KEY'] = config['JWT_SECRET_KEY']
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = config['SQLALCHEMY_TRACK_MODIFICATIONS']
    app.config['UPLOAD_FOLDER'] = config['UPLOAD_FOLDER']

    # Initialize extensions with the app
    db.init_app(app)
    jwt.init_app(app)

    # Import and register blueprints
    from .routes.auth import auth_blueprint
    app.register_blueprint(auth_blueprint)

    from .routes.document import document_blueprint
    app.register_blueprint(document_blueprint)

    from .routes.prompt import prompt_blueprint
    app.register_blueprint(prompt_blueprint)

    from .routes.function import function_blueprint
    app.register_blueprint(function_blueprint)

    # Import models
    from .models.user import User
    from .models.document import Document
    from .models.prompt import Prompt
    from .models.annotation import Annotation

    # Create database tables
    with app.app_context():
        db.create_all()

    return app


