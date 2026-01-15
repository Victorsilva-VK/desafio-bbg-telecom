// src/services/UserService.ts
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
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

    // Novo método de Login
  async login(email: string, password: string) {
    // 1. Buscar usuário
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('E-mail ou senha inválidos.');
    }

    // 2. Comparar senha (O que veio do front vs O hash do banco)
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('E-mail ou senha inválidos.');
    }

    // 3. Gerar o Token JWT
    // Colocamos o ID e o ROLE dentro do token para saber quem é o usuário depois
    const token = jwt.sign(
      { id: user.id, role: user.role }, 
      process.env.JWT_SECRET as string, 
      { expiresIn: '1d' } // Token expira em 1 dia
    );

    return { token };
  }
}