import { Router } from 'express';
import * as AuthController from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth.middleware';
import { authLimiter } from '../middleware/rate-limiter';
import { registerValidator, loginValidator } from '../validators/auth.validator';

const router = Router();

if (process.env.NODE_ENV !== 'test') {
    router.use('/register', authLimiter);
    router.use('/login', authLimiter);
}

router.post('/register', registerValidator, AuthController.register);
router.post('/login', loginValidator, AuthController.login);
router.post('/refresh', AuthController.refresh);
router.post('/logout', authenticate, AuthController.logout);

export default router;
