import pickle
import os
from app.config import DB_FILE_PATH 

def load_database():
    """Charge la base de données depuis un fichier Pickle."""
    if os.path.exists(DB_FILE_PATH):
        with open(DB_FILE_PATH, "rb") as db_file:
            return pickle.load(db_file)
    else:
        # Retourne une base vide si le fichier n'existe pas
        return {"encodings": [], "names": []}

def save_database(face_db):
    """Sauvegarde la base de données dans un fichier Pickle."""
    with open(DB_FILE_PATH, "wb") as db_file:
        pickle.dump(face_db, db_file)
