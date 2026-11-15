import { Task } from '../../domain/entities/Task.js';
export class CreateTask {
  constructor(taskRepository) { this.tasks = taskRepository; }
  async execute(userId, input) {
    const task = new Task({ ...input, userId });
    return this.tasks.create(userId, task);
  }
}
