from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

# Inicializa la base de datos
db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    CORS(app)    
    # Cargar configuraciones desde el archivo config.py
    app.config.from_pyfile('../config.py')

    # Inicializar SQLAlchemy con la aplicación
    db.init_app(app)

    # Importar y registrar las rutas
    from .routes import main
    app.register_blueprint(main)

    return app
