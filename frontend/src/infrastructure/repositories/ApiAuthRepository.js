import { request } from '../api/httpClient.js';
export class ApiAuthRepository {
  async login(credentials) {
    const result = await request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) });
    this.saveSession(result);
    return result.user;
  }
  async register(data) {
    const result = await request('/auth/register', { method: 'POST', body: JSON.stringify(data) });
    this.saveSession(result);
    return result.user;
  }
  async me() { return request('/auth/me'); }
  saveSession(result) {
    localStorage.setItem('taskflow_token', result.token);
    localStorage.setItem('taskflow_user', JSON.stringify(result.user));
  }
  logout() {
    localStorage.removeItem('taskflow_token');
    localStorage.removeItem('taskflow_user');
  }
}
