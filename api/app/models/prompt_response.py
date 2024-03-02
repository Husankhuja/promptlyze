from datetime import datetime
from app import db

class PromptResponse(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    prompt_id = db.Column(db.Integer, db.ForeignKey('prompt.id'), nullable=False)
    response_text = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    document_id = db.Column(db.Integer, db.ForeignKey('document.id'), nullable=False)

    prompt = db.relationship('Prompt', backref='responses')
    user = db.relationship('User', backref='responses')
    document = db.relationship('Document', backref='responses')


    def save(self):
        db.session.add(self)
        db.session.commit()

