from app import db
class projects(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=True)
    created_by = db.Column(db.Integer, nullable=False)  # Clave foránea
    created_at = db.Column(db.Date, nullable=False)
    updated_at = db.Column(db.Date, nullable=False)

    def __repr__(self):
        return f'<Proyecto {self.name}>'
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "created_by": self.created_by,
            "created_at": self.created_at.strftime('%Y-%m-%d %H:%M:%S') if self.created_at else None,
            "updated_at": self.updated_at.strftime('%Y-%m-%d %H:%M:%S') if self.updated_at else None,
        }
    
class Task(db.Model):
    __tablename__ = 'tasks'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.Text, nullable=False)  # Título de la tarea
    description = db.Column(db.Text)  # Descripción detallada de la tarea
    status = db.Column(
        db.Enum('pending', 'in progress', 'completed', name='task_status'),
        default='pending',
        nullable=False
    )  # Estado de la tarea
    priority = db.Column(
        db.Enum('low', 'medium', 'high', name='task_priority'),
        default='medium',
        nullable=False
    )  # Prioridad de la tarea
    due_date = db.Column(db.DateTime)  # Fecha de vencimiento
    assigned_to = db.Column(db.Integer, nullable=True)  # ID del usuario asignado
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=False)  # Relación con Proyecto
    created_at = db.Column(db.DateTime)  # Fecha de creación
    updated_at = db.Column(db.DateTime)  # Fecha de actualización

    comments = db.relationship(
        'Comment',
        backref='task',
        cascade="all, delete"
    )

    def to_dict(self):
        """Convierte la tarea en un diccionario para respuesta JSON"""
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "status": self.status,
            "priority": self.priority,
            "due_date": self.due_date.strftime('%Y-%m-%d %H:%M:%S') if self.due_date else None,
            "assigned_to": self.assigned_to,
            "project_id": self.project_id,
            "created_at": self.created_at.strftime('%Y-%m-%d %H:%M:%S') if self.created_at else None,
            "updated_at": self.updated_at.strftime('%Y-%m-%d %H:%M:%S') if self.updated_at else None,
        }
    
class Comment(db.Model):
    __tablename__ = 'comments'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=True)
    task_id = db.Column(db.Integer, db.ForeignKey('tasks.id'), nullable=False)
    comment = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime)  # Fecha de creación

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    role = db.Column(
        db.Enum('admin', 'member', name='user_role'),
        default='member',
        nullable=False
    )  # Estado de la tarea
    created_at = db.Column(db.DateTime)  # Fecha de creación
    updated_at = db.Column(db.DateTime)  # Fecha de actualización