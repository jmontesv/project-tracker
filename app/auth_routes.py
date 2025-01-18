from flask import Blueprint, request, jsonify
from werkzeug.security import check_password_hash, generate_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from datetime import timedelta
from app.models import User  # Modelo del usuario en tu base de datos
from app.models import db

auth = Blueprint('auth', __name__)

@auth.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    # Validar que los datos necesarios están presentes
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({"error": "Faltan credenciales"}), 400

    email = data.get('email')
    password = data.get('password')

    # Buscar al usuario en la base de datos
    user = User.query.filter_by(email=email).first()

    if not user or not check_password_hash(user.password, password):
        return jsonify({"error": "Credenciales inválidas"}), 401

    # Crear un token JWT
    access_token = create_access_token(identity=user.id, expires_delta=timedelta(hours=1))

    return jsonify({
        "message": "Inicio de sesión exitoso",
        "token": access_token,
        "user": {
            "id": user.id,
            "email": user.email,
            "name": user.username
        }
    }), 200


@auth.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    # Validaciones básicas
    if not data or not data.get('name') or not data.get('email') or not data.get('password'):
        return jsonify({"error": "Faltan datos obligatorios (name, email, password)"}), 400

    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    # Verificar si el email ya está registrado
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"error": "El email ya está registrado"}), 409

    # Hashear la contraseña
    hashed_password = generate_password_hash(password)

    # Crear el nuevo usuario
    new_user = User(username=name, email=email, password=hashed_password)

    try:
        # Guardar el usuario en la base de datos
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "Usuario registrado exitosamente"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Ocurrió un error al registrar el usuario", "details": str(e)}), 500
    

@auth.route('/user', methods=['GET'])
@jwt_required()  # Requiere un token válido
def get_user_details():
    try:
        # Obtén el ID del usuario desde el token
        user_id = get_jwt_identity()

        # Busca al usuario en la base de datos
        user = User.query.get(user_id)

        if not user:
            return jsonify({"error": "Usuario no encontrado"}), 404

        # Devuelve los detalles del usuario
        return jsonify({
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "created_at": user.created_at
        }), 200

    except Exception as e:
        return jsonify({"error": "Ocurrió un error al obtener los datos del usuario", "details": str(e)}), 500