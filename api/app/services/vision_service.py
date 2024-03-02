# function to perform annotation on documents
# function to check if annotations for document exists
# function to save annotatations as text file
from google.cloud import vision_v1
from google.cloud.vision_v1 import types
from google.oauth2 import service_account


from app.config import config

def async_batch_annotation(filenames):
    """Annotate a PDF document stored in Google Cloud Storage.

    Args:
        gcs_source_uri (str): The GCS URI of the PDF file to annotate (e.g., 'gs://your-source-bucket/path/to/document.pdf').
        gcs_destination_uri (str): The GCS URI for the output results (e.g., 'gs://your-destination-bucket/path/to/output/').
    """
    credentials = service_account.Credentials.from_service_account_file('./service-account.json')
    client = vision_v1.ImageAnnotatorClient(credentials=credentials)

    # Specify the feature(s) you want to extract
    feature = vision_v1.Feature(type_=vision_v1.Feature.Type.DOCUMENT_TEXT_DETECTION)
    dest = f"gs://{config['BUCKET_NAME']}/annotations/"

    requests = []

    for filename in filenames:
        source = f"gs://{config['BUCKET_NAME']}/{filename}"

        gcs_source = vision_v1.GcsSource(uri=source)
        input_config = vision_v1.InputConfig(gcs_source=gcs_source, mime_type='application/pdf')

        # Specify the GCS destination for the output
        gcs_destination = vision_v1.GcsDestination(uri=dest)
        output_config = vision_v1.OutputConfig(gcs_destination=gcs_destination, batch_size=1)

        async_request = vision_v1.AsyncAnnotateFileRequest(
            features=[feature],
            input_config=input_config,
            output_config=output_config
        )

        requests.append(async_request)


    operation = client.async_batch_annotate_files(requests=requests)

    print('Waiting for the operation to finish.')
    operation.result(timeout=180)  # Adjust the timeout as needed

    print(f'Output files saved to {dest}')
    return True
