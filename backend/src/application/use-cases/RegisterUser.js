export class RegisterUser {
  constructor(userRepository, passwordHasher, tokenService) {
    this.users = userRepository;
    this.passwordHasher = passwordHasher;
    this.tokens = tokenService;
  }
  async execute({ name, email, password }) {
    if (!name?.trim() || !email?.trim() || !password) throw new Error('Todos los campos son obligatorios.');
    if (password.length < 8) throw new Error('La contraseña debe tener al menos 8 caracteres.');
    const normalizedEmail = email.trim().toLowerCase();
    if (await this.users.findByEmail(normalizedEmail)) throw new Error('El correo ya está registrado.');
    const passwordHash = await this.passwordHasher.hash(password);
    const user = await this.users.create({ name: name.trim(), email: normalizedEmail, passwordHash });
    return { user, token: this.tokens.sign({ id: user.id, email: user.email }) };
  }
}
