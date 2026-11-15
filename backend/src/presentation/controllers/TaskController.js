import { MySQLTaskRepository } from '../../infrastructure/repositories/MySQLTaskRepository.js';
import { CreateTask } from '../../application/use-cases/CreateTask.js';
import { ListTasks } from '../../application/use-cases/ListTasks.js';
import { UpdateTask } from '../../application/use-cases/UpdateTask.js';
import { DeleteTask } from '../../application/use-cases/DeleteTask.js';

const repository = new MySQLTaskRepository();
export class TaskController {
  async list(req, res, next) {
    try { res.json(await new ListTasks(repository).execute(req.user.id, req.query)); }
    catch (error) { next(error); }
  }
  async create(req, res, next) {
    try { res.status(201).json(await new CreateTask(repository).execute(req.user.id, req.body)); }
    catch (error) { next(error); }
  }
  async update(req, res, next) {
    try { res.json(await new UpdateTask(repository).execute(req.user.id, req.params.id, req.body)); }
    catch (error) { next(error); }
  }
  async delete(req, res, next) {
    try { res.json(await new DeleteTask(repository).execute(req.user.id, req.params.id)); }
    catch (error) { next(error); }
  }
}
