import { RegisterUser } from '../../application/use-cases/RegisterUser.js';
import { LoginUser } from '../../application/use-cases/LoginUser.js';
import { MySQLUserRepository } from '../../infrastructure/repositories/MySQLUserRepository.js';
import { PasswordHasher } from '../../infrastructure/security/PasswordHasher.js';
import { TokenService } from '../../infrastructure/security/TokenService.js';

const users = new MySQLUserRepository();
const passwords = new PasswordHasher();
const tokens = new TokenService();

export class AuthController {
  async register(req, res, next) {
    try {
      const result = await new RegisterUser(users, passwords, tokens).execute(req.body);
      res.status(201).json(result);
    } catch (error) { next(error); }
  }
  async login(req, res, next) {
    try {
      const result = await new LoginUser(users, passwords, tokens).execute(req.body);
      res.json(result);
    } catch (error) { next(error); }
  }
  async me(req, res, next) {
    try {
      const user = await users.findById(req.user.id);
      if (!user) return res.status(404).json({ message: 'Usuario no encontrado.' });
      res.json({ user });
    } catch (error) { next(error); }
  }
}
