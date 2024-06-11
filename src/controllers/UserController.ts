// src/controllers/userController.ts
import { Request, Response } from 'express';
import User from '../models/User';

const getUserWallet = async (req: Request, res: Response) => {
  try {
    if (!req.user || typeof req.user !== 'object' || !('id' in req.user)) {
      throw new Error('User not authenticated');
    }
    const userId = req.user.id;
    const user = await User.findByPk(userId);
    if (!user) throw new Error('User not found');

    res.status(200).json({ walletBalance: user.walletBalance });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    res.status(400).json({ message: errorMessage });
  }
};

export { getUserWallet };
