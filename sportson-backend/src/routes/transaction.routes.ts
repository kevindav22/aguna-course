import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { upload } from '../middleware/upload.middleware';
import { createTransaction, getTransactions, updateTransaction } from '../controllers/transaction.controller';

const router = Router();

router.post('/checkout', authenticate, upload.single('paymentProof'), createTransaction);
router.get('/', authenticate, getTransactions);
router.get('/:id', getTransactions);
router.patch('/:id', authenticate, updateTransaction);

export default router;

