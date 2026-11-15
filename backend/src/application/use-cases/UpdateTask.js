import { Task } from '../../domain/entities/Task.js';
export class UpdateTask {
  constructor(taskRepository) { this.tasks = taskRepository; }
  async execute(userId, taskId, input) {
    const current = await this.tasks.findById(userId, taskId);
    if (!current) throw new Error('Tarea no encontrada.');
    const validated = new Task({ ...current, ...input, userId, id: Number(taskId) });
    return this.tasks.update(userId, taskId, validated);
  }
}
