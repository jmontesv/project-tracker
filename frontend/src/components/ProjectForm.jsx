import { Button, TextArea, TextField, Flex } from '@radix-ui/themes';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export const ProjectForm = ({ onSubmit }) => {

  const { user } = useContext(AuthContext)
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    fecha_inicio: new Date().toISOString(),
    fecha_actualizacion: new Date().toISOString(),
    usuario_id: user.id,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Llama a la función proporcionada por el padre
  };

  return (
    <form onSubmit={handleSubmit}> 
      <Flex direction='column' gap='2'>
        <div>
          <label>Nombre:</label>
          <TextField.Root
            type='text'
            name='nombre'
            value={formData.nombre}
            onChange={handleChange}
            required
            >
          </TextField.Root>
        </div>
        <div>
          <label>Descripción:</label>
          <TextArea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label style={{display: 'block'}}>Fecha de Inicio:</label>
          <input
            type="date"
            name="fecha_inicio"
            value={formData.fecha_inicio}
            onChange={handleChange}
            required
          />
        </div>
        <Button mt='2' type="submit">Crear Proyecto</Button>
      </Flex> 
    </form>
  );
};
