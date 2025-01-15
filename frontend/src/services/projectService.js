import api from './api';

// Obtener todos los proyectos
export const getProjects = async () => {
  try {
    const response = await api.get('/proyectos');
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener los proyectos', error);
  }
}

// Obtener todos los proyectos de un determinado usuario
export const getProjectsOfUser = async (userId) => {
  try {
    const response = await api.get(`/proyectos/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener los proyectos', error);
  }
}

// Crear un nuevo proyecto
export const createProject = async (projectData) => {
  try {
    const response = await api.post('/proyectos', projectData);
    return response.data;
  } catch (error) {
    throw new Error('Error al crear el proyecto', error);
  }
};

// Obtener un proyecto específico
export const getProject = async (projectId) => {
  try {
    const response = await api.get(`/proyectos/${projectId}`);
    return response.data; // Asume que las tareas vienen en `response.data`
  } catch (error) {
    console.error(`Error al obtener el proyecto con ID ${projectId}:`, error.message);
    throw new Error('No se pudo obtener el proyecto');
  }
};

// Obtener tareas de proyecto
export const getProjectTasks = async (projectId) => {
  try {
    const response = await api.get(`tareas/proyecto/${projectId}`);
    return response.data; // Asume que las tareas vienen en `response.data`
  } catch (error) {
    console.error(`Error al obtener las tareas del proyecto con ID ${projectId}:`, error.message);
    throw new Error('No se pudieron obtener las tareas del proyecto');
  }
};