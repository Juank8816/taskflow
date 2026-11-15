import { useState } from 'react';
export default function AuthPage({ onLogin, onRegister }) {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const change = e => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = async e => {
    e.preventDefault(); setError('');
    try { await (mode === 'login' ? onLogin(form) : onRegister(form)); }
    catch (err) { setError(err.message); }
  };
  return <main className="auth-shell"><section className="auth-card">
    <div className="brand-mark">T</div><h1>TASKFLOW</h1><p className="muted">Organiza tu tiempo. Alcanza tus objetivos.</p>
    <h2>{mode === 'login' ? 'Bienvenido de nuevo' : 'Crear cuenta'}</h2>
    <form onSubmit={submit}>
      {mode === 'register' && <input name="name" placeholder="Nombre completo" value={form.name} onChange={change} required />}
      <input name="email" type="email" placeholder="Correo electrónico" value={form.email} onChange={change} required />
      <input name="password" type="password" placeholder="Contraseña (mínimo 8 caracteres)" value={form.password} onChange={change} minLength="8" required />
      {error && <p className="error">{error}</p>}
      <button className="primary full">{mode === 'login' ? 'Iniciar sesión' : 'Registrarme'}</button>
    </form>
    <button className="link-button" onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}>
      {mode === 'login' ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
    </button>
  </section></main>;
}
