import 'reflect-metadata';
import express, { Application, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';

import { globalLimiter } from './middleware/rate-limiter';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import { ApiError } from './utils/api-error';
import { sendError } from './utils/api-response';
import logger from './utils/logger';

config();

const app: Application = express();

// ─── Security middleware ────────────────────────────────────────────────────
app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN ?? 'http://localhost:3000',
    credentials: true,
}));
if (process.env.NODE_ENV !== 'test') {
    app.use(globalLimiter);
}

// ─── Body parsing ───────────────────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ─── Health check ───────────────────────────────────────────────────────────
app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ success: true, message: 'SafeStayPK API is running.' });
});

// ─── Routes ─────────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// ─── 404 handler ────────────────────────────────────────────────────────────
app.use((_req: Request, res: Response) => {
    res.status(404).json({ success: false, message: 'Route not found.' });
});

// ─── Global error handler ────────────────────────────────────────────────────
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof ApiError) {
        sendError(res, err.message, err.statusCode);
        return;
    }

    // Log unexpected errors (don't expose internals)
    logger.error('Unhandled Error', err);
    sendError(res, 'Internal server error.', 500);
});

export default app;
