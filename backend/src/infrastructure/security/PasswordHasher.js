import bcrypt from 'bcryptjs';
export class PasswordHasher {
  hash(password) { return bcrypt.hash(password, 12); }
  compare(password, hash) { return bcrypt.compare(password, hash); }
}
