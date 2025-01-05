from app import db

class projects(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=True)
    created_by = db.Column(db.Integer, nullable=False)  # Clave foránea
    created_at = db.Column(db.Date, nullable=False)
    updated_at = db.Column(db.Date, nullable=False)

   # tareas = db.relationship('Tarea', backref='projects', lazy=True)  # Relación 1:N con Tarea

    def __repr__(self):
        return f'<Proyecto {self.name}>'
    