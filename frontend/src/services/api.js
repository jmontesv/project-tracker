import axios from 'axios';

// Configuración de Axios para establecer una base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://api.projecttracker.com', // URL base desde .env
  timeout: 5000,  // Tiempo máximo de espera
});

// Puedes agregar interceptores aquí si lo necesitas (ejemplo, para manejar tokens)
api.interceptors.request.use(
  (config) => {
    // Aquí puedes agregar un token de autenticación si es necesario
    const token = localStorage.getItem('authToken');
    if (token) {
       config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;