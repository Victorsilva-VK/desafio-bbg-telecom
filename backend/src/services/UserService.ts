// src/services/UserService.ts
import bcrypt from 'bcryptjs';
import { UserRepository } from '../repositories/UserRepository';

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async registerUser(data: any) {
    // 1. Verificar se o email já existe
    const userExists = await this.userRepository.findByEmail(data.email);
    if (userExists) {
      throw new Error('Usuário já cadastrado com este e-mail.');
    }

    // 2. Criptografar a senha (Hash)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    // 3. Criar o usuário com a senha segura
    const newUser = await this.userRepository.create({
      ...data,
      password: hashedPassword,
    });

    // 4. Retornar usuário sem a senha (segurança)
    const { password, ...userWithoutPassword } = newUser.toJSON();
    return userWithoutPassword;
  }
}