// src/models/User.ts
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database';

// Tipagem dos atributos
interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password?: string; // Opcional na leitura, obrigatório na escrita
  role: 'CLIENTE' | 'TECNICO';
}

// Tipagem para criação (ID é opcional pois é auto-increment)
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: 'CLIENTE' | 'TECNICO';
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('CLIENTE', 'TECNICO'),
      allowNull: false,
      defaultValue: 'CLIENTE',
    },
  },
  {
    sequelize,
    tableName: 'Users',
  }
);

export default User;