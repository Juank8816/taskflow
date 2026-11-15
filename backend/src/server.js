import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './presentation/routes/authRoutes.js';
import taskRoutes from './presentation/routes/taskRoutes.js';
import { pool } from './infrastructure/database/mysql.js';

dotenv.config();
const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));
app.use(express.json());
app.get('/api/health', (_req, res) => res.json({ status: 'ok', application: 'TASKFLOW API' }));
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use((err, _req, res, _next) => {
  console.error(err);
  const duplicate = err.code === 'ER_DUP_ENTRY';
  res.status(duplicate ? 409 : 400).json({
    message: duplicate ? 'El correo ya está registrado.' : (err.message || 'Error interno.')
  });
});
const PORT = process.env.PORT || 3001;
try {
  await pool.query('SELECT 1');
  app.listen(PORT, () => console.log(`TASKFLOW API ejecutándose en http://localhost:${PORT}`));
} catch (error) {
  console.error('No fue posible conectar con MySQL:', error.message);
  process.exit(1);
}
