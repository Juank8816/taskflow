const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
export async function request(path, options = {}) {
  const token = localStorage.getItem('taskflow_token');
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers
    }
  });
  const data = response.status === 204 ? null : await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data?.message || 'No fue posible completar la solicitud.');
  return data;
}
