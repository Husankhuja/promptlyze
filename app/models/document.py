from app import db

class Document(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    file_name = db.Column(db.String(100), nullable=False)
    stored_file_name = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    
    user = db.relationship('User', backref='documents')

    def save(self):
        db.session.add(self)
        db.session.commit()
    
    def __repr__(self):
        return f"Document('{self.file_name}', '{self.stored_file_name}')"