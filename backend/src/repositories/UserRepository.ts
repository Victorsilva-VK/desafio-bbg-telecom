// src/repositories/UserRepository.ts
import User from '../models/User';

export class UserRepository {
  // Buscar usuário por email
  async findByEmail(email: string) {
    return await User.findOne({ where: { email } });
  }

  // Criar novo usuário
  async create(data: any) {
    return await User.create(data);
  }
  
  // Buscar usuário por ID (será útil depois)
  async findById(id: number) {
    return await User.findByPk(id);
  }
}