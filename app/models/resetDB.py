import pickle
import os

# Chemin du fichier Pickle
DB_FILE_PATH = "face_database.pkl"

# Fonction pour créer une base de données vide ou initialisée
def create_pickle_database():
    # Structure de la base de données
    face_db = {
        "encodings": [],  # Liste des encodages de visages
        "names": []       # Liste des noms associés
    }

    # Vérifier si le fichier existe déjà
    if os.path.exists(DB_FILE_PATH):
        # Supprimer le fichier existant
        os.remove(DB_FILE_PATH)
        print(f"Le fichier existant {DB_FILE_PATH} a été supprimé.")

    # Sauvegarder la base vide dans le fichier Pickle
    with open(DB_FILE_PATH, "wb") as db_file:
        pickle.dump(face_db, db_file)
    print(f"Base de données créée avec succès dans {DB_FILE_PATH}.")

# Exécution du script
if __name__ == "__main__":
    create_pickle_database()
