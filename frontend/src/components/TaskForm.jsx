import { useState, useContext, useEffect } from "react";
import { TextField, TextArea, Select, Button, Flex, Box, AlertDialog, Spinner } from "@radix-ui/themes"; 
import { useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { getProjectMembers } from "../services/projectService";

export const TaskForm = ({
  onSubmit,
  defaultTask = {},
  defaultStatus = "pending",
  defaultPriority = "low"
}) => {
  const { id: idProject } = useParams()
  const { user } = useContext(AuthContext)
  const [members, setMembers] = useState([])
  const [errorMembers, setErrorMembers] = useState(null)
  const [loadingMembers, setLoadingMembers] = useState(false)
  const [task, setTask] = useState({
    titulo: "",
    descripcion: "",
    status: defaultStatus,
    prioridad: defaultPriority,
    fecha_fin: "",
    asignado_a: user.id,
    id_proyecto: idProject,
    se_creo: new Date().toISOString(),
    se_actualizo: new Date().toISOString(),
    ...defaultTask, // Sobrescribe los valores predeterminados con los del defaultTask
  });

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const fetchedMembers = await getProjectMembers(idProject);
        setMembers(fetchedMembers);
      } catch (err) {
        setErrorMembers(err.message);
      } finally {
        setLoadingMembers(false);
      }
    };

    fetchMembers();
  }, [idProject]);

  console.log(members)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({
      ...task,
      [name]: value,
    });
  };

  const handleSelectChange = (field, value) => {
    setTask((prevTask) => ({
      ...prevTask,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(task);
    // Limpia el formulario después de enviar
    setTask({
      titulo: "",
      descripcion: "",
      status: defaultStatus,
      prioridad: defaultPriority,
      fecha_fin: "",
      asignado_a: user.id,
      id_proyecto: idProject,
      se_creo: new Date().toISOString(),
      se_actualizo: new Date().toISOString(),
    });
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button variant="classic">Crear Tarea</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="450px">
        <form onSubmit={handleSubmit}>
          <AlertDialog.Title>Crear Tarea</AlertDialog.Title>
          <AlertDialog.Description size="2">
            <Flex direction="column" gap="2">
              <Box>
                <label>Título</label>
                <TextField.Root
                  name="titulo"
                  value={task.titulo}
                  onChange={handleChange}
                  placeholder="Introduce un título..."
                />
              </Box>
              <Box>
                <label>Descripción</label>
                <TextArea
                  name="descripcion"
                  value={task.descripcion}
                  onChange={handleChange}
                  placeholder="Introduce una descripción..."
                />
              </Box>
              <Box>
                <label style={{ display: "block" }}>Status</label>
                <Select.Root
                  defaultValue={task.status}
                  onValueChange={(value) => handleSelectChange("status", value)}
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
                  defaultValue={task.prioridad}
                  onValueChange={(value) => handleSelectChange("prioridad", value)}
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
                <label style={{ display: "block" }}>Asignado a</label>
                <Select.Root
                  defaultValue={task.asignado_a}
                  onValueChange={(value) => handleSelectChange("asignado_a", value)}
                >
                  <Select.Trigger />
                  <Select.Content>
                    {loadingMembers && <Spinner />}
                    {errorMembers && <p>{errorMembers}</p>}
                    {members.map((member) => {
                      return (
                        <Select.Item key={member.id} value={String(member.id)}>
                          {member.name}
                        </Select.Item>
                      );
                    })}
                  </Select.Content>
                </Select.Root>
              </Box>
              <Box>
                <label style={{ display: "block" }}>Fecha Fin</label>
                <input
                  type="date"
                  value={task.fecha_fin}
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
              <Button type="submit" variant="classic">
                Crear
              </Button>
            </AlertDialog.Action>
          </Flex>
        </form>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};
