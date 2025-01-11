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