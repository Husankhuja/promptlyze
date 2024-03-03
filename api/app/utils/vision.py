import json, os

from app import bucketService

def extract_from_all_annotations(blobs):
    text = ''
    for blob in blobs:
        data = bucketService.read_blob(blob)
        content = json.loads(data)
        text += extract_from_annotation(content) 
    return text

def extract_from_annotation(content):
    text = ''
    for response in content['responses']:
        for page in response['fullTextAnnotation']['pages']:
            blocks = page['blocks']
            paragraphs = [[get_starting_y(paragraph), get_p_text(paragraph)] for block in blocks for paragraph in block['paragraphs']]
            paragraphs.sort()
            for paragraph in paragraphs:
                text += paragraph[1] + '\n'
    return text

def get_starting_y(element):
    vertice = element['boundingBox']['normalizedVertices'][0]
    y = vertice.get('y') if vertice.get('y') else 0
    x = vertice.get('x') if vertice.get('x') else 0
    return y + x / 100000000

def get_p_text(paragraph):
    para = ""
    line = ""
    for word in paragraph['words']:
        for symbol in word['symbols']:
            line += symbol['text']
            if not('property' in symbol):
                continue
            if not('detectedBreak' in symbol['property']):
                continue

            if symbol['property']['detectedBreak']['type'] == 'SPACE':
                line += ' '
            if symbol['property']['detectedBreak']['type'] == 'EOL_SURE_SPACE':
                line += ' '
                para += line + '\n'
                line = ''
            if symbol['property']['detectedBreak']['type'] == 'LINE_BREAK':
                para += line + '\n'
                line = ''
    return para

def get_related_annotations(filename):
    blobs = bucketService.list_blobs()
    return [blob for blob in blobs if f"annotations/{filename}-output-" in blob]

def remove_related_annotations(filename):
    blobs = bucketService.list_blobs_with_prefix('annotations/')
    for blob in blobs:
        if f"annotations/{filename}-output-" in blob:
            bucketService.delete_blob(blob)

def save_annotations(filename):
    blobs = get_related_annotations(filename)
    text = extract_from_all_annotations(blobs)
    bucketService.upload_blob_from_string(text, f'texts/{filename}.txt')
    remove_related_annotations(filename)