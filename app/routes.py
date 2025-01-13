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
    
@main.route('/proyectos/<int:project_id>', methods=['GET'])
def proyecto(project_id):
    try:
        # Buscar el proyecto por ID
        project = projects.query.get(project_id)
        
        if not project:
            return jsonify({"message": f"Project with ID {project_id} not found"}), 404
        
        # Serializar el proyecto a formato JSON
        return jsonify(project.to_dict()), 200
    
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

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
    
# Otra ruta de ejemplo
@main.route('/tareas', methods=['POST'])
def tareas():
    # Obtener los datos enviados en el cuerpo de la solicitud
    data = request.get_json()  # Si envías JSON
    if data:
        nueva_tarea = Task(
            title=data['titulo'],
            description=data['descripcion'],
            status=data['status'],
            priority=data['prioridad'],
            due_date=data['fecha_fin'],
            assigned_to=data['asignado_a'],
            project_id=data['id_proyecto'],
            created_at=data['se_creo'],
            updated_at=data['se_actualizo']
        )
        
        db.session.add(nueva_tarea)
        db.session.commit()

        # Obtener el ID de la tarea recién creada
    return jsonify({"message": f"La tarea {data['titulo']} agregada con éxito!", "task": nueva_tarea.to_dict()}), 201 