import os, sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), os.path.pardir)))

import unittest
from app.services.vision_service import async_batch_annotation
from app.utils.vision import save_annotations

from app import create_app, db

async_batch_annotation(['document.pdf'])
save_annotations('document')

