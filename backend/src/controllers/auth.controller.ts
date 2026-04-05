import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import * as AuthService from '../services/auth.service';
import { sendSuccess, sendError } from '../utils/api-response';
import { ApiError } from '../utils/api-error';
import logger from '../utils/logger';

function validateRequest(req: Request, res: Response): boolean {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        sendError(res, 'Validation failed.', 422, errors.array());
        return false;
    }
    return true;
}

// POST /api/auth/register
export async function register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        if (!validateRequest(req, res)) return;
        const result = await AuthService.register(req.body);
        sendSuccess(res, result, 'Account created successfully.', 201);
    } catch (err) {
        next(err);
    }
}

// POST /api/auth/login
export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        if (!validateRequest(req, res)) return;
        const result = await AuthService.login(req.body);
        logger.info(`Login successful for user ${result.user.id}`);
        sendSuccess(res, result, 'Login successful.');
    } catch (err) {
        logger.error(`Login failed for user ${req.body.email}`);
        next(err);
    }
}

// POST /api/auth/refresh
export async function refresh(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            sendError(res, 'Refresh token is required.', 400);
            return;
        }
        const tokens = await AuthService.refreshTokens(refreshToken);
        sendSuccess(res, tokens, 'Tokens refreshed.');
    } catch (err) {
        next(err);
    }
}

// POST /api/auth/logout  (protected)
export async function logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        if (!req.user) throw ApiError.unauthorized();
        await AuthService.logout(req.user.sub);
        sendSuccess(res, null, 'Logged out successfully.');
    } catch (err) {
        next(err);
    }
}
