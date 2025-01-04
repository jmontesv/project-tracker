from flask import Flask
from flask_sqlalchemy import SQLAlchemy

# Crear la instancia de la aplicación Flask
app = Flask(__name__)

# Cargar las configuraciones desde el archivo config.py
app.config.from_pyfile('../config.py')

# Inicializar la extensión SQLAlchemy
db = SQLAlchemy(app)

@app.route('/')
def home():
    return "¡Bienvenido a ProjectTracker!"

# Iniciar el servidor
if __name__ == '__main__':
    app.run(debug=True)