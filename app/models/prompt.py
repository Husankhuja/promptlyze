from app import db

class Prompt(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    prompt = db.Column(db.String(1000), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    
    user = db.relationship('User', backref='prompts')
    
    def save(self):
        db.session.add(self)
        db.session.commit()
    
    def __repr__(self):
        return f"Prompt('{self.prompt}')"