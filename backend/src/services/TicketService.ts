import { TicketRepository } from '../repositories/TicketRepository';

export class TicketService {
  private ticketRepository: TicketRepository;

  constructor() {
    this.ticketRepository = new TicketRepository();
  }

  async createTicket(data: any) {
    return await this.ticketRepository.create(data);
  }

  async listTickets(page: number, limit: number) {
    const result = await this.ticketRepository.findAll(page, limit);
    
    // Retorna formatado com metadados de paginação
    return {
      data: result.rows,
      total: result.count,
      page,
      totalPages: Math.ceil(result.count / limit)
    };
  }

  async updateTicket(id: number, data: any) {
    const ticket = await this.ticketRepository.findById(id);

    if (!ticket) {
      throw new Error('Chamado não encontrado.');
    }

    // REGRA DE NEGÓCIO: Não permitir edição se já estiver CONCLUIDO
    if (ticket.status === 'CONCLUIDO') {
      throw new Error('Não é permitido editar chamados finalizados (CONCLUIDO).');
    }

    await this.ticketRepository.update(id, data);
    return await this.ticketRepository.findById(id); // Retorna o ticket atualizado
  }

  async deleteTicket(id: number) {
    const ticket = await this.ticketRepository.findById(id);
    if (!ticket) {
      throw new Error('Chamado não encontrado.');
    }
    return await this.ticketRepository.delete(id);
  }
}