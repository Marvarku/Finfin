import express from 'express';
import dotenv from 'dotenv';
import sequelize from './utils/database';
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import transactionRoutes from './routes/transactions';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/transactions', transactionRoutes);

sequelize.sync().then(() => {
  console.log('Database connected');
}).catch((err) => {
  console.log('Error connecting to the database', err);
});

export default app;
