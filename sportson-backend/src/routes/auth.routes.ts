import { Router } from 'express';
import { createdNewAdmin, signin } from '../controllers/auth.controller';

const router = Router();

router.post('/sign-in', signin);
router.post('/created-admin', createdNewAdmin);

export default router;
