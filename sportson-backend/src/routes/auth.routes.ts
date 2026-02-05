import { Router } from 'express';
import { createdNewAdmin, signin } from '../controllers/auth.controller';

const router = Router();

router.post('/signin', signin);
router.post('/register', createdNewAdmin);

export default router;
