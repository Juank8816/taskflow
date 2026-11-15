// Puerto: la infraestructura implementa este contrato.
export class TaskRepository {
  async create(_userId, _data) { throw new Error('Not implemented'); }
  async findAllByUser(_userId, _filters) { throw new Error('Not implemented'); }
  async findById(_userId, _taskId) { throw new Error('Not implemented'); }
  async update(_userId, _taskId, _data) { throw new Error('Not implemented'); }
  async delete(_userId, _taskId) { throw new Error('Not implemented'); }
}
