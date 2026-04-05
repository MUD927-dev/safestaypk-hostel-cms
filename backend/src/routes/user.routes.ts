import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth.middleware';
import * as UserController from '../controllers/user.controller';
import { UserRole } from '../entities/User';

const router = Router();

// All user routes require authentication
router.use(authenticate);

router.get('/me', UserController.getMe);
router.get('/', authorize(UserRole.Admin), UserController.listUsers);
router.patch('/:id/role', authorize(UserRole.Admin), UserController.updateRole);

export default router;