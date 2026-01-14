// src/database.ts
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Ajuste aqui com os dados do seu MySQL Local
const sequelize = new Sequelize('desafio_bbg', 'root', '@AdmSQL+23', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, // Para não poluir o terminal com SQL
});

export default sequelize;