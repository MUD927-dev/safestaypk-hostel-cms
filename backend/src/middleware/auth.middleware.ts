import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken, TokenPayload } from '../utils/jwt';
import { ApiError } from '../utils/api-error';
import { UserRole } from '../entities/User';

// Extend Express Request to carry the decoded user
declare global {
    namespace Express {
        interface Request {
            user?: TokenPayload;
        }
    }
}

/**
 * authenticate — verifies the Bearer access token in Authorization header.
 * Attaches decoded payload to req.user.
 */
export function authenticate(req: Request, _res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        return next(ApiError.unauthorized('No token provided.'));
    }

    const token = authHeader.split(' ')[1];

    try {
        req.user = verifyAccessToken(token);
        next();
    } catch {
        next(ApiError.unauthorized('Invalid or expired access token.'));
    }
}

/**
 * authorize — checks that the authenticated user's role is in the allowed list.
 * Must be used after authenticate.
 */
export function authorize(...roles: UserRole[]) {
    return (req: Request, _res: Response, next: NextFunction): void => {
        if (!req.user) {
            return next(ApiError.unauthorized('Not authenticated.'));
        }
        if (!roles.includes(req.user.role as UserRole)) {
            return next(ApiError.forbidden('You do not have permission to perform this action.'));
        }
        next();
    };
}
