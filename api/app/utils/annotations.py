from app.models.document import Document
from app.models.annotation import Annotation 

from app import bucketService

from app.services.vision_service import async_batch_annotation
from app.utils.vision import save_annotations

def document_has_annotation(document_id):
    return Annotation.query.filter_by(document_id=document_id).first() is not None

def get_annotation(document_id):
    return Annotation.query.filter_by(document_id=document_id).first()

def get_annotation_by_id(annotation_id):
    return Annotation.query.filter_by(id=annotation_id).first()

def create_annotation(file_name, user_id, document_id):
    annotation = Annotation(file_name=file_name, user_id=user_id, document_id=document_id)
    annotation.save()
    return annotation

def delete_annotation(annotation_id):
    annotation = get_annotation_by_id(annotation_id)
    annotation.delete()
    return annotation

def annotate_document(document_id, user_id):
    document = Document.query.filter_by(id=document_id).first()
    stored_file_name = document.stored_file_name
    annotation_file_name = stored_file_name[:-4]
    async_batch_annotation([stored_file_name])
    save_annotations(annotation_file_name)
    return create_annotation(annotation_file_name, user_id, document_id)

def annotate_documents(document_ids, user_id):
    file_names = {document_id: Document.query.filter_by(id=document_id).first().stored_file_name for document_id in document_ids}
    async_batch_annotation(file_names.values())
    for document_id, file_name in file_names.items():
        save_annotations(file_name[:-4])
        create_annotation(file_name[:-4], user_id, document_id)

def get_annotation_text(annotation_id):
    annotation = get_annotation_by_id(annotation_id)
    annotation_file_name = f"texts/{annotation.file_name}.txt"
    return bucketService.read_blob(annotation_file_name)