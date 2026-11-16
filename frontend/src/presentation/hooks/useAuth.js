import { useState, useEffect } from 'react';
import { ApiAuthRepository } from '../../infrastructure/repositories/ApiAuthRepository.js';

const authRepository = new ApiAuthRepository();

export function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('taskflow_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Error al leer el usuario guardado", e);
      }
    }
  }, []);

  const login = async (credentials) => {
    try {
      const loggedUser = await authRepository.login(credentials);
      if (loggedUser) {
        setUser(loggedUser);
      }
    } catch (error) {
      console.error("Error en login:", error);
      alert("No se pudo iniciar sesión. Verifica tus datos.");
      throw error;
    }
  };

  const register = async (data) => {
    try {
      const registeredUser = await authRepository.register(data);
      if (registeredUser) {
        setUser(registeredUser);
      } else {
        alert("Registro exitoso. Por favor inicia sesión.");
      }
    } catch (error) {
      console.error("Error en registro:", error);
      alert("Ocurrió un error al registrarse.");
      throw error;
    }
  };

  const logout = () => {
    authRepository.logout();
    setUser(null);
  };

  return { user, login, register, logout };
}