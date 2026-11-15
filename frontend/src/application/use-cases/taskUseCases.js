import { validateTask } from '../../domain/entities/task.js';
export class TaskUseCases {
  constructor(taskRepository) { this.repository = taskRepository; }
  list(filters) { return this.repository.list(filters); }
  create(data) { return this.repository.create(validateTask(data)); }
  update(id, data) { return this.repository.update(id, validateTask(data)); }
  remove(id) { return this.repository.remove(id); }
}
