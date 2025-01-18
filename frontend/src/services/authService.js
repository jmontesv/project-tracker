import api from "./api";

export const login = async (email, password) => {
  try {
    const response = await api.post('/login', {
      email,
      password,
    })

    // Guardar token en el localStorage 
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token)
    }

    return response.data;
  } catch (error) {
    console.error('Error en el servicio de login:', error)
    throw new Error(
      error.response?.data?.error || 'Ocurrió un error al iniciar sesión.'
    )
  }
}

export const getUser = async () => {
  try {
    // Obtener el token desde el almacenamiento local
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('No se encontró un token de autenticación.');
    }

    // Hacer la solicitud al endpoint del backend
    const response = await api.get('/user');

    // Devolver los datos del usuario
    return response.data;
  } catch (error) {
    console.error('Error al obtener los datos del usuario:', error);
    throw new Error(error.response?.data?.error || 'Error desconocido al obtener el usuario.');
  }
};