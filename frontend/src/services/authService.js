import api from "./api";

export const login = async (email, password) => {
  try {
    const response = await api.post('/login', {
      email,
      password,
    });

    // Guardar token en el localStorage 
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }

    return response.data;
  } catch (error) {
    console.error('Error en el servicio de login:', error);
    throw new Error(
      error.response?.data?.error || 'Ocurrió un error al iniciar sesión.'
    );
  }
};