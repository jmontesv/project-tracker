import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getProject } from '../services/projectService';
import { Kanban } from '../components/Kanban';
import { formatTasksToKanban } from '../helpers/Kanban'
import { TaskContext } from '../contexts/TaskContext'

export const ProjectDetails = () => {
  const { id } = useParams()
  const [project, setProject] = useState({})
  const [data, setData] = useState({});
  const { tasks, loadTasks, loading: loadingTasks, error: errorTasks } = useContext(TaskContext)
  const [draggedTaskId, setDraggedTaskId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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
    setData({}); // Limpia el estado de Kanban
    fetchProjectDetails()
    loadTasks(id)
  }, [id]);

  useEffect(() => {
    if (tasks.length > 0) {
      console.log(tasks)
      const kanban = formatTasksToKanban(tasks)
      setData(kanban)
    }
  }, [tasks])

  if (loading) return <p>Cargando proyecto....</p>

  return <>
    <h1>{project.name}</h1>
    <p>{project.description}</p>
    {
      loadingTasks 
        ? <p>Cargando tareas...</p>
        : 
          errorTasks 
            ? <p>Error: {errorTasks}</p>
            : tasks.length > 0 && Object.keys(data).length > 0 && <Kanban data={data} setData={setData} draggedTaskId={draggedTaskId} setDraggedTaskId={setDraggedTaskId}/>      
    }
  </>  
}