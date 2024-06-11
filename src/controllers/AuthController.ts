import { Request, Response } from 'express';
import { register, authenticate } from '../services/AuthService';

const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const user = await register(username, email, password);
    res.status(201).json(user);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    res.status(400).json({ message: errorMessage });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await authenticate(email, password);
    res.status(200).json({ token });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    res.status(400).json({ message: errorMessage });
  }
};

export { registerUser, loginUser };
