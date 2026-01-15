// src/routes/index.ts
import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { TicketController } from '../controllers/TicketController'; 
import { authMiddleware } from '../middlewares/authMiddleware'; 

const router = Router();
const userController = new UserController();
const ticketController = new TicketController();

// Rota de Cadastro
// @ts-ignore 
router.post('/users', userController.create);

// Rota de Login
// @ts-ignore
router.post('/login', userController.login);

// Rotas de Tickets (protegidas pelo AuthMiddleware)
// @ts-ignore
router.post('/tickets', authMiddleware, ticketController.create);
// @ts-ignore
router.get('/tickets', authMiddleware, ticketController.list);
// @ts-ignore
router.put('/tickets/:id', authMiddleware, ticketController.update);
// @ts-ignore
router.delete('/tickets/:id', authMiddleware, ticketController.delete);

export default router;