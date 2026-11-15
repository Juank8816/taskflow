export const TASK_STATUSES = ['Pendiente', 'En progreso', 'Completada'];
export const TASK_PRIORITIES = ['Baja', 'Media', 'Alta'];
export function validateTask(task) {
  if (!task.title?.trim()) throw new Error('El título es obligatorio.');
  if (!TASK_PRIORITIES.includes(task.priority)) throw new Error('Prioridad inválida.');
  if (!TASK_STATUSES.includes(task.status)) throw new Error('Estado inválido.');
  return { ...task, title: task.title.trim() };
}
