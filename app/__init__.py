from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

# Inicializa la base de datos
db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    CORS(app)    
    # Cargar configuraciones desde el archivo config.py
    app.config.from_pyfile('../config.py')

    jwt = JWTManager(app)

    # Inicializar SQLAlchemy con la aplicación
    db.init_app(app)

    # Importar y registrar las rutas
    from .routes import main
    from .auth_routes import auth
    app.register_blueprint(main)
    app.register_blueprint(auth)

    return app
