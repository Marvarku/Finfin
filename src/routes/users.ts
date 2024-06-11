import { Router } from 'express';
import { getUserWallet } from '../controllers/UserController';
import validateUser from '../middlewares/validateUser';

const router = Router();

router.get('/wallet', validateUser, getUserWallet);

export default router;
