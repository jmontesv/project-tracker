import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProjectTasks } from '../services/projectService';

export const ProjectTasks = () => {
  const { id } = useParams(); // Obtener el ID del proyecto de la URL
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getProjectTasks(id);
        setTasks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [id]);

  if (loading) return <p>Cargando tareas...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Tareas del Proyecto #{id}</h2>
      <ul>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li key={task.id}>
              <strong>{task.title}</strong> - {task.status}
            </li>
          ))
        ) : (
          <p>No hay tareas disponibles.</p>
        )}
      </ul>
    </div>
  );
};