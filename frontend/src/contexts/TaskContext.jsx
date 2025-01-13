import { createContext, useState } from 'react';
import { getProjectTasks } from '../services/projectService'; // Importa tus servicios de tareas
import { createNewTask } from '../services/taskService'; // Importa tus servicios de tareas

// Crear el contexto
export const TaskContext = createContext();

// Proveedor del contexto
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar tareas desde la API
  const loadTasks = async (projectId) => {
    setLoading(true);
    try {
      const fetchedTasks = await getProjectTasks(projectId);
      setTasks(fetchedTasks);
    } catch (err) {
      console.error('Error al cargar tareas:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Crear una nueva tarea
  const createTask = async (taskData) => {
    setLoading(true);
    try {
      const { task: newTask } = await createNewTask(taskData)
      setTasks((prevTasks) => [...prevTasks, {...newTask}])
      return newTask
    } catch (err) {
      console.error('Error al crear la tarea:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Eliminar una tarea (opcional)
  const deleteTask = async (taskId) => {
    setLoading(true);
    try {
      // Implementa la lógica de eliminar tarea en la API si es necesario
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (err) {
      console.error('Error al eliminar la tarea:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        loadTasks,
        createTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};


