import { TokenService } from '../../infrastructure/security/TokenService.js';
const tokens = new TokenService();
export function authenticate(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) return res.status(401).json({ message: 'Autenticación requerida.' });
    req.user = tokens.verify(token);
    next();
  } catch {
    return res.status(401).json({ message: 'Sesión inválida o expirada.' });
  }
}
