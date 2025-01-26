import { Card, Text } from "@radix-ui/themes"
import { Cross1Icon } from "@radix-ui/react-icons"
import { TaskContext } from '../contexts/TaskContext'
import { useContext } from 'react';

export const Task = ({ task, onDragStart }) => {
  const { deleteTask } = useContext(TaskContext)
  
  const handleClickRemoveTask = () => {
    deleteTask(Number(task.id))
  }
  
  return (
    <Card
      variant='surface'
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      style={{
        padding: '8px',
        margin: '8px 0',
        cursor: 'grab',
        minWidth: "200px"
      }}
    >
      <Text as="div" size="2" weight="bold">
        {task.title}
      </Text>
      <Cross1Icon onClick={handleClickRemoveTask} style={{position: 'absolute', top: 5, right: 5}} />
    </Card>
  );
};