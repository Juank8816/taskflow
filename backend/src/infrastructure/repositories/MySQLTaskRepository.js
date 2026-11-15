import { pool } from '../database/mysql.js';

const mapTask = row => row ? ({
  id: row.id, userId: row.user_id, title: row.title, description: row.description || '',
  dueDate: row.due_date, priority: row.priority, status: row.status, createdAt: row.created_at
}) : null;

export class MySQLTaskRepository {
  async create(userId, task) {
    const [result] = await pool.execute(
      `INSERT INTO tasks (user_id,title,description,due_date,priority,status)
       VALUES (?,?,?,?,?,?)`,
      [userId, task.title, task.description, task.dueDate || null, task.priority, task.status]
    );
    return this.findById(userId, result.insertId);
  }
  async findAllByUser(userId, filters = {}) {
    let sql = 'SELECT * FROM tasks WHERE user_id = ?';
    const params = [userId];
    if (filters.status) { sql += ' AND status = ?'; params.push(filters.status); }
    if (filters.priority) { sql += ' AND priority = ?'; params.push(filters.priority); }
    if (filters.search) {
      sql += ' AND (title LIKE ? OR description LIKE ?)';
      params.push(`%${filters.search}%`, `%${filters.search}%`);
    }
    sql += ' ORDER BY created_at DESC';
    const [rows] = await pool.execute(sql, params);
    return rows.map(mapTask);
  }
  async findById(userId, taskId) {
    const [rows] = await pool.execute('SELECT * FROM tasks WHERE user_id = ? AND id = ?', [userId, taskId]);
    return mapTask(rows[0]);
  }
  async update(userId, taskId, task) {
    await pool.execute(
      `UPDATE tasks SET title=?, description=?, due_date=?, priority=?, status=?
       WHERE user_id=? AND id=?`,
      [task.title, task.description, task.dueDate || null, task.priority, task.status, userId, taskId]
    );
    return this.findById(userId, taskId);
  }
  async delete(userId, taskId) {
    const [result] = await pool.execute('DELETE FROM tasks WHERE user_id=? AND id=?', [userId, taskId]);
    return result.affectedRows > 0;
  }
}
