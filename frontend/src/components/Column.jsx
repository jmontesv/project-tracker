import { useState, useContext } from 'react'
import { TaskContext } from '../contexts/TaskContext'
import { TextField, Button, AlertDialog, Flex, TextArea, Box, Select} from '@radix-ui/themes';
import { Task } from './Task';
import { useParams } from 'react-router-dom';

const defaultValuesStatus = {
  "Pendiente": "pending",
  "En Progreso": "in progress",
  "Completado": "completed"
}

export const Column = ({ column, tasks, onDragStart, onDrop }) => {

  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { createTask } = useContext(TaskContext)
  const [newTask, setNewTask] = useState({
    titulo: "",
    descripcion: "",
    status: defaultValuesStatus[column.title],
    prioridad: "low",
    fecha_fin: "",
    asignado_a: 1,
    id_proyecto: Number(id), 
    se_creo: new Date().toISOString(),
    se_actualizo: new Date().toISOString()
  });

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask({  
      ...newTask,
      [name]: value // Actualiza el campo correspondiente
    });
  }

  const handleChangeSelectStatusValue = (newValue) => {
    setNewTask((prevTask) => {
      return {...prevTask, status: newValue}
    })
  }

  const handleChangeSelectPriorityValue = (newValue) => {
    setNewTask((prevTask) => {
      return {...prevTask, prioridad: newValue}
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true);
    setError(null);
    try {
      const result = await createTask(newTask)
      console.log('Tarea creada exitosamente:', result)
       // Limpia el formulario después de la creación exitosa
       setNewTask({
        titulo: "",
        descripcion: "",
        status: "",
        prioridad: "low",
        fecha_fin: "",
        asignado_a: 1,
        id_proyecto: id, 
        se_creo: new Date().toISOString(),
        se_actualizo: new Date().toISOString()
      });
    } catch (err) {
      setError(err.message)
    } finally{
      setLoading(false)
    }
  }

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => onDrop(e, column.id)}
      style={{
        margin: "8px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        width: "300px",
        backgroundColor: "#ffecd2",
        minHeight: "600px",
        padding: "8px",
      }}
    >
      <h3 style={{ textAlign: "center" }}>{column.title}</h3>
      <TextField.Root
        name="titulo"
        value={newTask.titulo}
        onInput={handleChange}
        mb="4"
        variant="surface"
        placeholder="Introduce una tarea…"
      />
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button variant="classic">Crear</Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content maxWidth="450px">
          <form onSubmit={handleSubmit}>
            <AlertDialog.Title>Crear tarea</AlertDialog.Title>
            <AlertDialog.Description size="2">
              <Flex direction="column" gap="2">
                <Box>
                  <label>Título</label>
                  <TextField.Root
                    size="1"
                    name="titulo"
                    value={newTask.titulo}
                    onChange={handleChange}
                    placeholder="Introduce un título..."
                  />
                </Box>
                <Box>
                  <label>Descripción</label>
                  <TextArea
                    name="descripcion"
                    value={newTask.descripcion}
                    onChange={handleChange}
                    placeholder="Introduce una descripción..."
                  />
                </Box>
                <Box>
                  <label style={{ display: "block" }}>Status</label>
                  <Select.Root
                    defaultValue={defaultValuesStatus[column.title]}
                    name="status"
                    onValueChange={handleChangeSelectStatusValue}
                  >
                    <Select.Trigger />
                    <Select.Content>
                      <Select.Item value="pending">Pendiente</Select.Item>
                      <Select.Item value="in progress">En Progreso</Select.Item>
                      <Select.Item value="completed">Completado</Select.Item>
                    </Select.Content>
                  </Select.Root>
                </Box>
                <Box>
                  <label style={{ display: "block" }}>Prioridad</label>
                  <Select.Root
                    defaultValue={newTask.prioridad}
                    onValueChange={handleChangeSelectPriorityValue}
                    name="prioridad"
                  >
                    <Select.Trigger />
                    <Select.Content>
                      <Select.Item value="low">Baja</Select.Item>
                      <Select.Item value="medium">Media</Select.Item>
                      <Select.Item value="high">Alta</Select.Item>
                    </Select.Content>
                  </Select.Root>
                </Box>
                <Box>
                  <label style={{ display: "block" }}>Fecha fin</label>
                  <input
                    type="date"
                    value={newTask.fecha_fin}
                    onChange={handleChange}
                    name="fecha_fin"
                  />
                </Box>
              </Flex>
            </AlertDialog.Description>
            <Flex gap="3" mt="4" justify="end">
              <AlertDialog.Cancel>
                <Button variant="soft" color="gray">
                  Cancelar
                </Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action>
                <Button type='submit' variant="classic">
                  Crear
                </Button>
              </AlertDialog.Action>
            </Flex>
          </form>
        </AlertDialog.Content>
      </AlertDialog.Root>
      {tasks.map((task) => (
        <Task key={task.id} task={task} onDragStart={onDragStart} />
      ))}
    </div>
  );
};