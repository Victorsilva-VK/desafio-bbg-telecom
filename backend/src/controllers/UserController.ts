// src/controllers/UserController.ts
import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
  async create(req: Request, res: Response) {
    const userService = new UserService();

    try {
      const { name, email, password, role } = req.body;

      // Validação básica
      if (!name || !email || !password || !role) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
      }

      const user = await userService.registerUser({ name, email, password, role });
      
      return res.status(201).json(user);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
  async login(req: Request, res: Response) {
    const userService = new UserService();

    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
      }

      const result = await userService.login(email, password);
      
      return res.status(200).json(result);
    } catch (error: any) {
      // Retornar 401 (Unauthorized) é mais semântico para erro de login
      return res.status(401).json({ error: error.message });
    }
  }
}