export class DeleteTask {
  constructor(taskRepository) { this.tasks = taskRepository; }
  async execute(userId, taskId) {
    const deleted = await this.tasks.delete(userId, taskId);
    if (!deleted) throw new Error('Tarea no encontrada.');
    return { message: 'Tarea eliminada correctamente.' };
  }
}
