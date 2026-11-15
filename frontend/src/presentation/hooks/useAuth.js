import { useState } from 'react';
import { ApiAuthRepository } from '../../infrastructure/repositories/ApiAuthRepository.js';
const auth = new ApiAuthRepository();
export function useAuth() {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('taskflow_user')); } catch { return null; }
  });
  const [error, setError] = useState('');
  const login = async data => { setError(''); try { const u = await auth.login(data); setUser(u); } catch(e) { setError(e.message); throw e; } };
  const register = async data => { setError(''); try { const u = await auth.register(data); setUser(u); } catch(e) { setError(e.message); throw e; } };
  const logout = () => { auth.logout(); setUser(null); };
  return { user, error, login, register, logout };
}
