import { useEffect, useState } from 'react';
const empty = { title: '', description: '', dueDate: '', priority: 'Media', status: 'Pendiente' };
export default function TaskForm({ initialTask, onSubmit, onCancel }) {
  const [form, setForm] = useState(initialTask || empty);
  useEffect(() => setForm(initialTask || empty), [initialTask]);
  const change = e => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = async e => { e.preventDefault(); await onSubmit(form); if (!initialTask) setForm(empty); };
  return <form className="task-form" onSubmit={submit}>
    <input name="title" placeholder="Título de la tarea" value={form.title} onChange={change} maxLength="160" required />
    <textarea name="description" placeholder="Descripción" value={form.description || ''} onChange={change} />
    <div className="form-row">
      <label>Vencimiento<input type="date" name="dueDate" value={form.dueDate || ''} onChange={change} /></label>
      <label>Prioridad<select name="priority" value={form.priority} onChange={change}><option>Baja</option><option>Media</option><option>Alta</option></select></label>
      <label>Estado<select name="status" value={form.status} onChange={change}><option>Pendiente</option><option>En progreso</option><option>Completada</option></select></label>
    </div>
    <div className="form-actions"><button className="primary">{initialTask ? 'Guardar cambios' : 'Agregar tarea'}</button>{onCancel && <button type="button" className="secondary" onClick={onCancel}>Cancelar</button>}</div>
  </form>;
}
