import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database';
import User from './User';

interface TicketAttributes {
  id: number;
  title: string;
  description: string;
  status: 'ABERTO' | 'EM_PROGRESSO' | 'CONCLUIDO';
  priority: 'BAIXA' | 'MEDIA' | 'ALTA';
  userId: number; // ID do Cliente que criou
  createdAt?: Date;
  updatedAt?: Date;
}

// id, createdAt e updatedAt são opcionais na criação
interface TicketCreationAttributes extends Optional<TicketAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Ticket extends Model<TicketAttributes, TicketCreationAttributes> implements TicketAttributes {
  public id!: number;
  public title!: string;
  public description!: string;
  public status!: 'ABERTO' | 'EM_PROGRESSO' | 'CONCLUIDO';
  public priority!: 'BAIXA' | 'MEDIA' | 'ALTA';
  public userId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Ticket.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('ABERTO', 'EM_PROGRESSO', 'CONCLUIDO'),
      defaultValue: 'ABERTO',
    },
    priority: {
      type: DataTypes.ENUM('BAIXA', 'MEDIA', 'ALTA'),
      defaultValue: 'BAIXA',
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Users', key: 'id' },
    },
  },
  {
    sequelize,
    tableName: 'Tickets',
  }
);

// Criar o relacionamento: Um Ticket pertence a um Usuário
Ticket.belongsTo(User, { foreignKey: 'userId', as: 'cliente' });
User.hasMany(Ticket, { foreignKey: 'userId', as: 'chamados' });

export default Ticket;