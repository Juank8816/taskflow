export class ListTasks {
  constructor(taskRepository) { this.tasks = taskRepository; }
  async execute(userId, filters = {}) { return this.tasks.findAllByUser(userId, filters); }
}
