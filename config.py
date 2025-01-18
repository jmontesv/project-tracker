import os


# Configuración de la base de datos
SQLALCHEMY_DATABASE_URI = 'mysql://root:@localhost/project_tracker'
SQLALCHEMY_TRACK_MODIFICATIONS = False
JWT_SECRET_KEY = 'tu_clave_secreta_aqui'
JWT_VERIFY_SUB = False