import { request } from '../api/httpClient.js';
export class ApiTaskRepository {
  list(filters = {}) {
    const params = new URLSearchParams(Object.entries(filters).filter(([,v]) => v));
    return request(`/tasks${params.toString() ? `?${params}` : ''}`);
  }
  create(task) { return request('/tasks', { method: 'POST', body: JSON.stringify(task) }); }
  update(id, task) { return request(`/tasks/${id}`, { method: 'PUT', body: JSON.stringify(task) }); }
  remove(id) { return request(`/tasks/${id}`, { method: 'DELETE' }); }
}
