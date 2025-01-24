import numpy as np
from .database import load_database, save_database
from .face_model import encode_face, comparing_faces

def learn_face(name, image_file):
    # Charger la base de données
    face_db = load_database()

    # Encoder le visage
    face_encoding = encode_face(image_file)
    if face_encoding is None:
        return {"Erreur": "Aucun visage détecté sur cette image"}, 400

    # Ajouter l'encodage et le nom à la base de données
    face_db["encodings"].append(face_encoding)
    face_db["names"].append(name)

    # Sauvegarder la base de données
    save_database(face_db)

    return {"message": f"Le visage de '{name}' a été appris avec succès"}, 200

def recognize_face(image_file):
    # Charger la base de données
    face_db = load_database()

    # Étape 1 : Encodage de l'image soumise
    face_encoding = encode_face(image_file)
    if face_encoding is None:
        return {"Erreur": "Aucun visage détecté sur cette image"}, 400

    # Étape 2 : Comparaison avec la base de données
    matches, distances = comparing_faces(face_db["encodings"], face_encoding)

    # Étape 3 : Identification du meilleur match
    if True in matches:
        best_match_index = np.argmin(distances)
        name = face_db["names"][best_match_index]
        accuracy = (1 - distances[best_match_index]) * 100
        return {
            "name": name,
            "distance": distances[best_match_index],
            "accuracy": f"{accuracy:.2f}%"
        }, 200
    else:
        return {"message": "Visage non reconnu !"}, 404
