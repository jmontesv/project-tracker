import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProjectTasks, getProject } from '../services/projectService';
import { Kanban } from '../components/Kanban';
import { formatTasksToKanban } from '../helpers/Kanban'

export const ProjectDetails = () => {
  const { id } = useParams(); // Obtener el ID del proyecto de la URL
  const [tasks, setTasks] = useState([]); 
  const [project, setProject] = useState({})
  const [data, setData] = useState({});
  const [draggedTaskId, setDraggedTaskId] = useState(null);
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
    const fetchProjectDetails = async () => {
      try {
        const data = await getProject(id);
        setProject(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails()
    fetchTasks();
  }, [id]);
  
  useEffect(() => {
    if (tasks.length > 0) {
      const kanban = formatTasksToKanban(tasks)
      setData(kanban)
    }
  }, [tasks])



  if (loading) return <p>Cargando tareas...</p>;
  if (error) return <p>Error: {error}</p>;
  if (Object.keys(data).length > 0)
    return (
      <>
        <h1>{project.name}</h1>
        <p>{project.description}</p>
        <Kanban data={data} setData={setData} draggedTaskId={draggedTaskId} setDraggedTaskId={setDraggedTaskId}/>
      </>
    )   
}