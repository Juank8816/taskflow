export class LoginUser {
  constructor(userRepository, passwordHasher, tokenService) {
    this.users = userRepository;
    this.passwordHasher = passwordHasher;
    this.tokens = tokenService;
  }
  async execute({ email, password }) {
    const user = await this.users.findByEmail(email?.trim().toLowerCase());
    if (!user || !(await this.passwordHasher.compare(password || '', user.passwordHash))) {
      throw new Error('Correo o contraseña incorrectos.');
    }
    return {
      user: { id: user.id, name: user.name, email: user.email },
      token: this.tokens.sign({ id: user.id, email: user.email })
    };
  }
}
