// Usa la variable de entorno de Render o recae en localhost para desarrollo local
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const httpClient = {
  async request(endpoint, options = {}) {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }
};