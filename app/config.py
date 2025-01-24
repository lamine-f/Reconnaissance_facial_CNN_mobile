import os

SECRET_KEY = os.environ.get("SECRET_KEY", "secret_key")
DB_FILE_PATH = "../face_database.pkl"
TOLERANCE = 0.65
