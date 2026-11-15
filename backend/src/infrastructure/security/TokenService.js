import jwt from 'jsonwebtoken';
export class TokenService {
  sign(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '8h' });
  }
  verify(token) { return jwt.verify(token, process.env.JWT_SECRET); }
}
