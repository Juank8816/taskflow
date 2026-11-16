import { request } from '../api/httpClient.js';

export class ApiAuthRepository {
  async login(credentials) {
    const result = await request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) });
    this.saveSession(result);
    return result?.user || result;
  }

  async register(data) {
    const result = await request('/auth/register', { method: 'POST', body: JSON.stringify(data) });
    
    if (result && result.token) {
      this.saveSession(result);
    }
    
    return result?.user || result;
  }

  async me() { 
    return request('/auth/me'); 
  }

  saveSession(result) {
    if (!result) return;
    if (result.token) {
      localStorage.setItem('taskflow_token', result.token);
    }
    if (result.user) {
      localStorage.setItem('taskflow_user', JSON.stringify(result.user));
    }
  }

  logout() {
    localStorage.removeItem('taskflow_token');
    localStorage.removeItem('taskflow_user');
  }
}