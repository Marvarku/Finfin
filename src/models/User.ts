import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../utils/database';

// Define the attributes for the User model
interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  walletBalance?: number;
}

// Define creation attributes for the User model
interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'walletBalance'> {}

// Extend Sequelize's Model class
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public walletBalance!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize the User model
User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  walletBalance: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
}, {
  sequelize,
  modelName: 'User',
});

export default User;
