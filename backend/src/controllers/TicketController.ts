import { Request, Response } from 'express';
import { TicketService } from '../services/TicketService';

export class TicketController {
  
  async create(req: Request, res: Response) {
    const ticketService = new TicketService();
    try {
      const { title, description, priority } = req.body;
      // @ts-ignore (Pega o ID do usuário que o AuthMiddleware colocou na requisição)
      const userId = req.userId; 

      const ticket = await ticketService.createTicket({ 
        title, 
        description, 
        priority, 
        userId 
      });

      return res.status(201).json(ticket);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async list(req: Request, res: Response) {
    const ticketService = new TicketService();
    try {
      // Pega paginação da URL (ex: ?page=2&limit=5)
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;

      const tickets = await ticketService.listTickets(page, limit);
      return res.status(200).json(tickets);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response) {
    const ticketService = new TicketService();
    try {
      const { id } = req.params;
      const data = req.body;

      const ticket = await ticketService.updateTicket(Number(id), data);
      return res.status(200).json(ticket);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    const ticketService = new TicketService();
    try {
      const { id } = req.params;
      await ticketService.deleteTicket(Number(id));
      return res.status(204).send(); // 204 = No Content (Sucesso sem corpo)
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}