export default function TaskCard({ task, onEdit, onDelete, onStatus }) {
  return <article className="task-card">
    <div className="task-main">
      <div className="task-title-row"><h3>{task.title}</h3><span className={`priority ${task.priority.toLowerCase()}`}>{task.priority}</span></div>
      <p>{task.description || 'Sin descripción'}</p>
      <div className="task-meta"><span>{task.status}</span><span>Vence: {task.dueDate || 'Sin fecha'}</span></div>
    </div>
    <div className="task-actions">
      <button className="secondary small" onClick={() => onStatus(task)}>{task.status === 'Completada' ? 'Reabrir' : 'Cambiar estado'}</button>
      <button className="secondary small" onClick={() => onEdit(task)}>Editar</button>
      <button className="danger small" onClick={() => onDelete(task.id)}>Eliminar</button>
    </div>
  </article>;
}
