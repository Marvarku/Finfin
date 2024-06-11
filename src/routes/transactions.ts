import { Router } from 'express';
import { sendMoney, getHistory } from '../controllers/TransactionsController';
import validateUser from '../middlewares/validateUser';

const router = Router();

router.post('/send', validateUser, sendMoney);
router.get('/history', validateUser, getHistory);

export default router;
