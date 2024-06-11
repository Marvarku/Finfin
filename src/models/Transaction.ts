import { DataTypes, Model } from 'sequelize';
import sequelize from '../utils/database';
import User from './User';

class Transaction extends Model {
  public id!: number;
  public amount!: number;
  public senderId!: number;
  public receiverId!: number;
  public idempotencyKey!: string;
}

Transaction.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  receiverId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  idempotencyKey: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Transaction',
});

Transaction.belongsTo(User, { as: 'sender', foreignKey: 'senderId' });
Transaction.belongsTo(User, { as: 'receiver', foreignKey: 'receiverId' });

export default Transaction;
