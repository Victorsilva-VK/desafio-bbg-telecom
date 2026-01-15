import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Carrega as variáveis do arquivo .env
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME as string, // Nome do Banco
  process.env.DB_USER as string, // Usuário
  process.env.DB_PASS as string, // Senha
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false,
  }
);

export default sequelize;