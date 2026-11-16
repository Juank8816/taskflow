const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export async function request(endpoint, options = {}) {
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

  // Leer como texto primero para evitar que falle si la respuesta está vacía
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}