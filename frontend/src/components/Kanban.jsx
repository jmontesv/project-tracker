import { Column } from './Column'

export const Kanban = ({ data, setData, draggedTaskId, setDraggedTaskId }) => {
  
  const handleDragStart = (e, taskId) => {
    setDraggedTaskId(taskId);
  };

  const handleDrop = (e, columnId) => {
    if (!draggedTaskId) return;

    // Encontrar columna de origen y destino
    const sourceColumnId = Object.keys(data.columns).find((columnId) =>
      data.columns[columnId].taskIds.includes(draggedTaskId)
    );

    if (sourceColumnId === columnId) return;

    // Remover tarea de la columna de origen
    const sourceTasks = data.columns[sourceColumnId].taskIds.filter(
      (id) => id !== draggedTaskId
    );

    // Añadir tarea a la columna de destino
    const destTasks = [...data.columns[columnId].taskIds, draggedTaskId];

    setData((prev) => ({
      ...prev,
      columns: {
        ...prev.columns,
        [sourceColumnId]: {
          ...prev.columns[sourceColumnId],
          taskIds: sourceTasks,
        },
        [columnId]: {
          ...prev.columns[columnId],
          taskIds: destTasks,
        },
      },
    }));

    setDraggedTaskId(null);
  };
  
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '16px' }}>
      {data.columnOrder.map((columnId) => {
        const column = data.columns[columnId];
        const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

        return (
          <Column
            key={column.id}
            column={column}
            tasks={tasks}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
            se
          />
        );
      })}
  </div>
  );
};