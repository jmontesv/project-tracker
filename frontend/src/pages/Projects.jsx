import { useEffect, useState,useContext } from 'react';
import { getProjectsOfUser, createProject } from '../services/projectService';
import { ProjectForm } from '../components/ProjectForm'
import { Flex, Card, Text, AlertDialog, Button } from '@radix-ui/themes'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProjects = async () => {
      if (Object.keys(user).length > 0) {
        try {
          const data = await getProjectsOfUser(user.id);
          setProjects(data);
        } catch (error) {
          setError('No se pudieron cargar los proyectos', error);
        }
      }
    };

    fetchProjects();
  }, [user]);

  const handleFormSubmit = async (formData) => {
    try {
      console.log('Enviando datos del formulario:', formData);
      const response = await createProject(formData);
      console.log('Proyecto creado:', response);
      alert('¡Proyecto creado exitosamente!');
    } catch (error) {
      console.error('Error al crear el proyecto:', error.message);
      alert('Error al crear el proyecto');
    }
  }
  
  const handleClickOnProject = async (projectId) => {
    try {
      console.log('Enviando datos del formulario:', projectId)
      navigate(`/proyectos/${projectId}`)

    } catch (error) {
      console.error('Error al crear el proyecto:', error.message);
      alert('Error al crear el proyecto');
    }
  }

  return (
    <div>
      <h2>Proyectos</h2>
      {error && <p>{error}</p>}
      <Flex align='left' mb='2'>
        <AlertDialog.Root>
          <AlertDialog.Trigger  >
            <Button color="green">Añadir proyecto</Button>
          </AlertDialog.Trigger>
          <AlertDialog.Content maxWidth="450px">
            <AlertDialog.Title>Añadir proyecto</AlertDialog.Title>
            <ProjectForm onSubmit={handleFormSubmit} />
            <Flex gap="3" mt="4" justify="end">
              <AlertDialog.Cancel>
                <Button variant="soft" color="red">
                  Cancelar
                </Button>
              </AlertDialog.Cancel>
            </Flex>
          </AlertDialog.Content>
        </AlertDialog.Root>
      </Flex>
      <Flex direction="column" gap="3" maxWidth="auto" style={{cursor: 'pointer'}}>
        {projects.map((project) => (
          <Card onClick={() => handleClickOnProject(project.id)} key={project.id} variant="classic">
            <Text as="div" size="2" weight="bold">
              {project.name}
            </Text>
            <Text as="div" color="gray" size="2">
              {project.description}
            </Text>
	        </Card>
        ))}
      </Flex>
    </div>
  );
};

export default Projects;