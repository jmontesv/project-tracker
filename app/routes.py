# app/routes.py
from flask import Blueprint, render_template

# Crear un Blueprint llamado "main"
main = Blueprint('main', __name__)

# Definir una ruta
@main.route('/')
def home():
    return "¡Hola, Mundo!"

# Otra ruta de ejemplo
@main.route('/about')
def about():
    return "Acerca de esta aplicación"