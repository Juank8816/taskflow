import { useEffect, useMemo, useState } from 'react';
import { ApiTaskRepository } from '../../infrastructure/repositories/ApiTaskRepository.js';
import { TaskUseCases } from '../../application/use-cases/taskUseCases.js';
import TaskForm from '../components/TaskForm.jsx';
import TaskCard from '../components/TaskCard.jsx';

const useCases = new TaskUseCases(new ApiTaskRepository());
export default function DashboardPage({ user, onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const load = async () => { try { setTasks(await useCases.list({ search, status, priority })); setError(''); } catch(e) { setError(e.message); } };
  useEffect(() => { load(); }, [search, status, priority]);
  const counts = useMemo(() => ({
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'Pendiente').length,
    progress: tasks.filter(t => t.status === 'En progreso').length,
    completed: tasks.filter(t => t.status === 'Completada').length
  }), [tasks]);
  const save = async data => { try { editing ? await useCases.update(editing.id, data) : await useCases.create(data); setEditing(null); setShowForm(false); await load(); } catch(e) { setError(e.message); } };
  const edit = task => { setEditing(task); setShowForm(true); };
  const remove = async id => { if (!confirm('¿Eliminar esta tarea?')) return; try { await useCases.remove(id); await load(); } catch(e) { setError(e.message); } };
  const changeStatus = async task => {
    const next = task.status === 'Pendiente' ? 'En progreso' : task.status === 'En progreso' ? 'Completada' : 'Pendiente';
    try { await useCases.update(task.id, { ...task, status: next }); await load(); } catch(e) { setError(e.message); }
  };
  return <div className="layout">
    <aside className="sidebar"><div className="brand"><span>T</span> TASKFLOW</div><p className="side-label">ESPACIO DE TRABAJO</p><div className="nav-active">▦ &nbsp; Panel de tareas</div><div className="side-bottom"><div className="avatar">{user?.name?.[0]?.toUpperCase()}</div><div className="user-info"><strong>{user?.name}</strong><small>{user?.email}</small></div><button title="Cerrar sesión" className="logout" onClick={onLogout}>↪</button></div></aside>
    <main className="workspace">
      <header className="topbar"><div><p className="eyebrow">RESUMEN GENERAL</p><h1>Mis tareas</h1><p className="muted">Gestiona tus actividades y mantén el control de tu tiempo.</p></div><button className="primary" onClick={() => { setEditing(null); setShowForm(!showForm); }}>+ Nueva tarea</button></header>
      <section className="stats">
        <article><span className="stat-icon blue">▦</span><strong>{counts.total}</strong><small>Total de tareas</small></article>
        <article><span className="stat-icon amber">◷</span><strong>{counts.pending}</strong><small>Pendientes</small></article>
        <article><span className="stat-icon violet">↗</span><strong>{counts.progress}</strong><small>En progreso</small></article>
        <article><span className="stat-icon green">✓</span><strong>{counts.completed}</strong><small>Completadas</small></article>
      </section>
      {showForm && <section className="panel"><h2>{editing ? 'Editar tarea' : 'Crear nueva tarea'}</h2><TaskForm initialTask={editing} onSubmit={save} onCancel={() => { setShowForm(false); setEditing(null); }} /></section>}
      <section className="panel task-panel"><div className="section-heading"><div><h2>Listado de tareas</h2><p className="muted">Consulta y administra tus actividades.</p></div></div>
        <div className="filters"><input placeholder="Buscar por título o descripción..." value={search} onChange={e => setSearch(e.target.value)} /><select value={status} onChange={e => setStatus(e.target.value)}><option value="">Todos los estados</option><option>Pendiente</option><option>En progreso</option><option>Completada</option></select><select value={priority} onChange={e => setPriority(e.target.value)}><option value="">Todas las prioridades</option><option>Baja</option><option>Media</option><option>Alta</option></select></div>
        {error && <p className="error">{error}</p>}
        <div className="task-list">{tasks.map(task => <TaskCard key={task.id} task={task} onEdit={edit} onDelete={remove} onStatus={changeStatus} />)}
          {tasks.length === 0 && <div className="empty"><span>✓</span><h3>No hay tareas para mostrar</h3><p>Crea una nueva tarea o modifica los filtros.</p></div>}
        </div>
      </section>
      <footer>TASKFLOW · Sistema de gestión de tareas</footer>
    </main>
  </div>;
}
