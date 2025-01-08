import { useState } from 'react'
import { TextField, Button } from '@radix-ui/themes';
import { Task } from './Task';

export const Column = ({ column, tasks, onDragStart, onDrop }) => {
  const [formData, setFormData] = useState({
    pending: '',
    'in progress': '',
    completed: ''
  });

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value // Actualiza el campo correspondiente
    });
  }
  // Manejar el envío del formulario
   const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Valores de los inputs:', formData);
  }

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => onDrop(e, column.id)}
      style={{
        margin: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        width: '300px',
        backgroundColor: '#ffecd2',
        minHeight: '600px',
        padding: '8px',
      }}
    >
      <h3 style={{ textAlign: 'center' }}>{column.title}</h3>
      <form onSubmit={handleSubmit}>
        <TextField.Root name={column.id} value={formData[column.id]} onInput={handleChange} mb='4' variant="surface" placeholder="Introduce una tarea…" />
        <Button variant='classic'>Crear</Button>
      </form>
      {tasks.map((task) => (
        <Task key={task.id} task={task} onDragStart={onDragStart} />
      ))}
    </div>
  );
};