import rateLimit from 'express-rate-limit';

/** Global limiter — 100 requests per 15 minutes per IP */
export const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: 'Too many requests, please try again later.' },
});

/** Auth limiter — 5 attempts per 15 minutes per IP (brute-force protection) */
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: 'Too many authentication attempts. Please try again in 15 minutes.' },
});
