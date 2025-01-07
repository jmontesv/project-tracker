# app/routes.py
from flask import Blueprint, request, jsonify
from app.models import db, projects, Task

# Crear un Blueprint llamado "main"
main = Blueprint('main', __name__)

# Definir una ruta
@main.route('/')
def home():
    return "¡Bienvenido a Project-tracker!"

# Otra ruta de ejemplo
@main.route('/proyectos', methods=['POST', 'GET'])
def proyectos():
    if request.method == 'POST':
        # Obtener los datos enviados en el cuerpo de la solicitud
        data = request.get_json()  # Si envías JSON
        if data:
            nuevo_proyecto = projects(
                name=data['nombre'],
                description=data['descripcion'],
                created_by=data['usuario_id'],
                created_at=data['fecha_inicio'],
                updated_at=data['fecha_actualizacion']
            )
        
            db.session.add(nuevo_proyecto)
            db.session.commit()
            return jsonify({"message": f"Proyecto {data['nombre']} agregado con éxito!"}), 201  
    elif request.method == 'GET':
        proyectos = projects.query.all()
        
         # Serializar los proyectos
        projects_list = [project.to_dict() for project in proyectos]
        
        return jsonify(projects_list), 200
@main.route('/tareas/proyecto/<int:project_id>', methods=['GET'])
def tareasDeUnProyecto(project_id):
    try:
        # Consultar todas las tareas asociadas al proyecto
        tareas = Task.query.filter_by(project_id=project_id).all()
        
        # Validar si hay tareas asociadas
        if not tareas:
            return jsonify({"message": f"No tasks found for project with id {project_id}"}), 404
        
        # Serializar las tareas a formato JSON
        lista_tareas = [tarea.to_dict() for tarea in tareas]
        return jsonify(lista_tareas), 200
    
    except Exception as e:
        return jsonify({"error": f"Ha ocurrido un error: {str(e)}"}), 500