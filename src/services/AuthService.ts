import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import User from '../models/User';

const register = async (username: string, email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, password: hashedPassword });
  return user;
};

const authenticate = async (email: string, password: string) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error('User not found');
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) throw new Error('Invalid password');
  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};

export { register, authenticate };
