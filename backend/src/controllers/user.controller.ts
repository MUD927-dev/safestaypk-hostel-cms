import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../config/data-source';
import { User, UserRole } from '../entities/User';
import { sendSuccess } from '../utils/api-response';
import { ApiError } from '../utils/api-error';

// GET /api/users/me
export async function getMe(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        if (!req.user) throw ApiError.unauthorized();
        const repo = AppDataSource.getRepository(User);
        const user = await repo.findOne({ where: { id: req.user.sub } });
        if (!user) throw ApiError.notFound('User not found.');
        sendSuccess(res, user, 'Profile fetched.');
    } catch (err) {
        next(err);
    }
}

// GET /api/users  (Admin only)
export async function listUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const repo = AppDataSource.getRepository(User);
        const users = await repo.find({ order: { createdAt: 'DESC' } });
        sendSuccess(res, users, 'Users fetched.');
    } catch (err) {
        next(err);
    }
}

// PATCH /api/users/:id/role  (Admin only)
export async function updateRole(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { id } = req.params;
        const { role } = req.body;

        if (!role || !Object.values(UserRole).includes(role)) {
            throw ApiError.badRequest('Invalid role provided.');
        }

        const repo = AppDataSource.getRepository(User);
        const user = await repo.findOne({ where: { id: id as string } });
        if (!user) throw ApiError.notFound('User not found.');

        user.role = role;
        await repo.save(user);

        sendSuccess(res, user, 'User role updated.');
    } catch (err) {
        next(err);
    }
}
