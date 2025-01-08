import { Card, Text } from "@radix-ui/themes";

export const Task = ({ task, onDragStart }) => {
  return (
    <Card
      variant='surface'
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      style={{
        padding: '8px',
        margin: '8px 0',
        cursor: 'grab',
      }}
    >
      <Text as="div" size="2" weight="bold">
        {task.title}
      </Text>
    </Card>
  );
};