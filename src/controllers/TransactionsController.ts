import { Request, Response } from 'express';
import { createTransaction, getTransactionHistory } from '../services/TransactionService';

const sendMoney = async (req: Request, res: Response) => {
  try {
    const { senderId, receiverId, amount, idempotencyKey } = req.body;
    const transaction = await createTransaction(senderId, receiverId, amount, idempotencyKey);
    res.status(201).json(transaction);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    res.status(400).json({ message:errorMessage });
  }
};

const getHistory = async (req: Request, res: Response) => {
  try {
    if (req.user) {
      const userId = req.user?.id;
      const transactions = await getTransactionHistory(userId);
      res.status(200).json(transactions);
    } else {
      throw new Error('User not found');
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    res.status(400).json({ message: errorMessage });
  }
};

export { sendMoney, getHistory };
