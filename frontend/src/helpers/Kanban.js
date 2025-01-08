export const formatTasksToKanban = (tasks) => {
    
  const kanban = {
    columns: {
      pending: {
        id: 'pending',
        title: 'Pendiente',
        taskIds: []
      },
      'in progress': {
        id: 'in progress',
        title: 'En Progreso',
        taskIds: []
      },
      completed: {
        id: 'completed',
        title: 'Completado',
        taskIds: []
      }
    },
    tasks: {},
    columnOrder: ['pending', 'in progress', 'completed']
  };
  
  tasks.forEach((task) => {
    // Añadir tarea a la lista de tareas
    kanban.tasks[task.id] = {
      id: task.id.toString(),
      title: task.title,
      description: task.description,
      priority: task.priority,
      due_date: task.due_date,
      assigned_to: task.assigned_to,
      created_at: task.created_at,
      updated_at: task.updated_at
    };

    // Determinar columna basada en 'status'
    let status = task.status || 'pending'; // Si el status está vacío, va a 'pending'

    if (!kanban.columns[status]) {
      // Si el status no existe en las columnas, lo creamos
      kanban.columns[status] = {
        id: status,
        title: status.charAt(0).toUpperCase() + status.slice(1),
        taskIds: []
      };
      kanban.columnOrder.push(status);
    }

    // Agregar tarea a la columna correspondiente
    kanban.columns[status].taskIds.push(task.id.toString());
  });

  return kanban;
}