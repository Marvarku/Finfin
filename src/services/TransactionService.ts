import Transaction from '../models/Transaction';
import User from '../models/User';
import { Op } from 'sequelize';

const createTransaction = async (senderId: number, receiverId: number, amount: number, idempotencyKey: string) => {
  const sender = await User.findByPk(senderId);
  const receiver = await User.findByPk(receiverId);

  if (!sender || !receiver) throw new Error('Sender or Receiver not found');
  if (sender.walletBalance < amount) throw new Error('Insufficient funds');

  // Ensure idempotency
  const existingTransaction = await Transaction.findOne({ where: { idempotencyKey } });
  if (existingTransaction) return existingTransaction;

  // Create transaction
  const transaction = await Transaction.create({
    amount,
    senderId,
    receiverId,
    idempotencyKey,
  });

  // Update wallet balances
  sender.walletBalance -= amount;
  receiver.walletBalance += amount;

  await sender.save();
  await receiver.save();

  return transaction;
};

const getTransactionHistory = async (userId: number) => {
  const transactions = await Transaction.findAll({
    where: {
      [Op.or]: [{ senderId: userId }, { receiverId: userId }],
    },
    include: [
      { model: User, as: 'sender', attributes: ['username'] },
      { model: User, as: 'receiver', attributes: ['username'] },
    ],
    order: [['createdAt', 'DESC']],
  });
  return transactions;
};

export { createTransaction, getTransactionHistory };
