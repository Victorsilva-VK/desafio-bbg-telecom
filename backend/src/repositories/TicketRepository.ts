import Ticket from '../models/Ticket';
import User from '../models/User';

export class TicketRepository {
  // Criar Ticket
  async create(data: any) {
    return await Ticket.create(data);
  }

  // Listar com Paginação (Diferencial)
  async findAll(page: number = 1, limit: number = 10) {
    const offset = (page - 1) * limit;

    return await Ticket.findAndCountAll({
      limit: limit,
      offset: offset,
      order: [['createdAt', 'DESC']], // Mais recentes primeiro
      include: [
        { model: User, as: 'cliente', attributes: ['id', 'name', 'email'] } // Traz dados do dono
      ]
    });
  }

  // Buscar por ID
  async findById(id: number) {
    return await Ticket.findByPk(id);
  }

  // Atualizar
  async update(id: number, data: any) {
    return await Ticket.update(data, { where: { id } });
  }

  // Deletar
  async delete(id: number) {
    return await Ticket.destroy({ where: { id } });
  }
}