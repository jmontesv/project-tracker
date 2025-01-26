import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getProject } from '../services/projectService';
import { Kanban } from '../components/Kanban';
import { formatTasksToKanban } from '../helpers/Kanban'
import { TaskContext } from '../contexts/TaskContext'
import { Navigate } from 'react-router-dom';
import { PROJECT_WITHOUT_TASKS, NO_AUTHORIZED } from '../constants'
import { TaskForm } from '../components/TaskForm';
import { Spinner, Flex } from '@radix-ui/themes';

export const ProjectDetails = () => {
  const { id } = useParams()
  const [project, setProject] = useState({})
  const [data, setData] = useState({});
  const { tasks, loadTasks, createTask, loading: loadingTasks, error: errorTasks, setError: setErrorTasks } = useContext(TaskContext)
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

  const handleSubmit = (newTask) => {
    createTask(newTask)
    setErrorTasks(null)
  }

  if (loading) return <Spinner />

  return (
    <>
      <h2>{project.name}</h2>
      <Flex direction='column' align='center'>
        <p>{project.description}</p>
        {loadingTasks ? (
          <Spinner />
        ) : errorTasks ? (
          <>
            {errorTasks == NO_AUTHORIZED ? (
              <Navigate to="/login" replace />
            ) : (
              errorTasks == PROJECT_WITHOUT_TASKS && <TaskForm onSubmit={handleSubmit} />
            )}
          </>
        ) : tasks.length > 0 && Object.keys(data).length > 0 ? (
          <Kanban
            data={data}
            setData={setData}
            draggedTaskId={draggedTaskId}
            setDraggedTaskId={setDraggedTaskId}
          />
        ) : (
          <TaskForm onSubmit={handleSubmit} />
        )}
      </Flex>
    </>
  );  
}