import { useContext } from 'react'
import { TaskContext } from '../contexts/TaskContext'
import { Task } from './Task';
import { TaskForm } from './TaskForm';

export const Column = ({ column, tasks, onDragStart, onDrop }) => {
  const { createTask } = useContext(TaskContext)
  

  const handleSubmit = (newTask) => {
    createTask(newTask)
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
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <h3>{column.title}</h3>
      <TaskForm defaultStatus={column.id} onSubmit={handleSubmit}/>
      {tasks.map((task) => (
        <Task key={task.id} task={task} onDragStart={onDragStart} />
      ))}
    </div>
  );
};