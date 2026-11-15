export class Task {
  constructor({ id, userId, title, description = '', dueDate = null,
    priority = 'Media', status = 'Pendiente', createdAt = null }) {
    if (!title || !title.trim()) throw new Error('El título es obligatorio.');
    if (title.trim().length > 160) throw new Error('El título no puede superar 160 caracteres.');
    if (!['Baja', 'Media', 'Alta'].includes(priority)) throw new Error('Prioridad inválida.');
    if (!['Pendiente', 'En progreso', 'Completada'].includes(status)) throw new Error('Estado inválido.');
    Object.assign(this, {
      id, userId, title: title.trim(), description, dueDate, priority, status, createdAt
    });
  }
}
