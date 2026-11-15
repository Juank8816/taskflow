import { pool } from '../database/mysql.js';
export class MySQLUserRepository {
  async create({ name, email, passwordHash }) {
    const [result] = await pool.execute(
      'INSERT INTO users (name,email,password_hash) VALUES (?,?,?)',
      [name, email, passwordHash]
    );
    return { id: result.insertId, name, email };
  }
  async findByEmail(email) {
    const [rows] = await pool.execute(
      'SELECT id,name,email,password_hash AS passwordHash FROM users WHERE email = ? LIMIT 1', [email]
    );
    return rows[0] || null;
  }
  async findById(id) {
    const [rows] = await pool.execute('SELECT id,name,email FROM users WHERE id = ?', [id]);
    return rows[0] || null;
  }
}
