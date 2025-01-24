# face_model.py
import face_recognition
import numpy as np
from app.config import TOLERANCE

def encode_face(image_file):
    # Charger l'image
    image = face_recognition.load_image_file(image_file)
    encodings = face_recognition.face_encodings(image)

    if len(encodings) == 0:
        return None
    return encodings[0]

def comparing_faces(known_encodings, face_encoding, tolerance=TOLERANCE):
    matches = face_recognition.compare_faces(known_encodings, face_encoding, tolerance=tolerance)
    distances = face_recognition.face_distance(known_encodings, face_encoding)
    return matches, distances
