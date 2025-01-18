# app/routes.py
from flask import Blueprint, request, jsonify, abort
from app.models import db, projects, Task, ProjectMembers
from flask_jwt_extended import jwt_required, get_jwt_identity

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

            nuevo_miembro = ProjectMembers(
                project_id=nuevo_proyecto.id,
                user_id=data['usuario_id'],
                role='admin'
            )

            db.session.add(nuevo_miembro)
            db.session.commit()

            return jsonify({"message": f"Proyecto {data['nombre']} agregado con éxito!"}), 201  
    elif request.method == 'GET':
        proyectos = projects.query.all()
        
         # Serializar los proyectos
        projects_list = [project.to_dict() for project in proyectos]
        
        return jsonify(projects_list), 200

@main.route('/proyectos/<int:owner_id>', methods=['GET'])
def get_projects_by_owner(owner_id):
    try:
        # Obtener proyectos por el ID del propietario
        proyectos = projects.query.filter_by(created_by=owner_id).all()
        
        # Verificar si hay proyectos
        if not proyectos:
            return jsonify({"message": "No se encontraron proyectos para este ID."}), 404

        # Convertir a JSON y responder
        return jsonify([proyecto.to_dict() for proyecto in proyectos]), 200

    except Exception as e:
        return jsonify({"error": "Ocurrió un error al obtener los proyectos.", "details": str(e)}), 500

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
@jwt_required()
def tareasDeUnProyecto(project_id):
    try:
        # Obtener el ID del usuario autenticado
        user_id = get_jwt_identity()

        # Verificar si el usuario pertenece al proyecto
        membership = ProjectMembers.query.filter_by(project_id=project_id, user_id=user_id).first()
        if not membership:
            return jsonify({"error": "No tienes acceso a este proyecto"}), 403
        
        # Consultar todas las tareas asociadas al proyecto
        tareas = Task.query.filter_by(project_id=project_id).all()
        
        # Validar si hay tareas asociadas
        if not tareas:
            return jsonify({"message": f"No se han encontrado tareas del proyecto {project_id}"}), 404
        
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

@main.route('/tareas/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    try:
        # Busca la tarea por ID
        task = Task.query.get(task_id)
        
        # Si no se encuentra, retorna un error 404
        if not task:
            abort(404, description=f"Tarea con ID {task_id} no encontrada.")
        
        # Elimina la tarea de la base de datos
        db.session.delete(task)
        db.session.commit()
        
        return jsonify({"message": f"Tarea con ID {task_id} eliminada exitosamente."}), 200
    
    except Exception as e:
        # Manejo de errores genérico
        db.session.rollback()
        return jsonify({"error": "Ocurrió un error al intentar eliminar la tarea.", "details": str(e)}), 500