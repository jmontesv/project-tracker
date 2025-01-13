import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getProject } from '../services/projectService';
import { Kanban } from '../components/Kanban';
import { formatTasksToKanban } from '../helpers/Kanban'
import { TaskContext } from '../contexts/TaskContext'

export const ProjectDetails = () => {
  const { id } = useParams(); // Obtener el ID del proyecto de la URL
  const [project, setProject] = useState({})
  const [data, setData] = useState({});
  const { tasks, loadTasks, loadingTasks, errorTasks } = useContext(TaskContext)
  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
    loadTasks(id)
    fetchProjectDetails()
  }, [id]);
  
  useEffect(() => {
    if (tasks.length > 0) {
      const kanban = formatTasksToKanban(tasks)
      setData(kanban)
    }
  }, [tasks])



  if (loadingTasks) return <p>Cargando tareas...</p>;
  if (errorTasks) return <p>Error: {error}</p>;
  if (Object.keys(data).length > 0)
    return (
      <>
        <h1>{project.name}</h1>
        <p>{project.description}</p>
        <Kanban data={data} setData={setData} draggedTaskId={draggedTaskId} setDraggedTaskId={setDraggedTaskId}/>
      </>
    )   
}