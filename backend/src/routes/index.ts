// src/routes/index.ts
import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const router = Router();
const userController = new UserController();

// Rota de Cadastro
// @ts-ignore (para evitar erro de tipagem estrita do express no momento)
router.post('/users', userController.create);

export default router;