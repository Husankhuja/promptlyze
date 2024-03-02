from app import db

class DocumentAnnotation:
    def __init__(self, file_name, user_id, document_id):
        self.file_name = file_name
        self.user_id = user_id
        self.document_id = document_id

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def __repr__(self):
        return f'<DocumentAnnotation {self.file_name}>'
