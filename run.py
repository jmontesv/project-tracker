from app import create_app

# Crear la aplicación
app = create_app()

# Ejecutar la aplicación
if __name__ == '__main__':
    app.run(debug=True)