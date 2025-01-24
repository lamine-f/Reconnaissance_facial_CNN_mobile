from flask import Blueprint, request, jsonify
from .models.recognition import learn_face, recognize_face

# Définir le Blueprint
bp = Blueprint('routes', __name__)

@bp.route('/learn', methods=['POST'])
def learn():
    name = request.form.get('name')
    image_file = request.files.get('image')

    if not name or not image_file:
        return jsonify({"error": "Missing 'name' or 'image' in the request."}), 400

    response, status = learn_face(name, image_file)
    return jsonify(response), status

@bp.route('/recognize', methods=['POST'])
def recognize():
    try:
        image_file = request.files.get('image')

        if not image_file:
            return jsonify({"error": "Missing 'image' in the request."}), 400

        response, status = recognize_face(image_file)
        return jsonify(response), status
    except Exception as e:
        # Log l'erreur pour le débogage
        print(f"Erreur dans la route /recognize : {e}")
        return jsonify({"error": "Une erreur est survenue sur le serveur."}), 500

