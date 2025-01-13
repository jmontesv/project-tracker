import api from './api';

// Crear nueva taera
export const createNewTask = async (taskData) => {
  try {
    const response = await api.post('/tareas', taskData);
    return response.data;
  } catch (error) {
    throw new Error('Error al crear la tarea:', error);
  }
};

export const removeTask = async (taskId) => {
  try {
    const response = await api.delete(`/tareas/${taskId}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar la tarea:', error.response?.data?.error || error.message);
    throw new Error(error.response?.data?.error || 'Error al eliminar la tarea');
  }
};