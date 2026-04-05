import jwt, { SignOptions, JwtPayload } from 'jsonwebtoken';
import { config } from 'dotenv';
import crypto from 'crypto';

config();

export interface TokenPayload {
    sub: string;   // user id
    email: string;
    role: string;
}

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;
const ACCESS_EXPIRY = (process.env.JWT_ACCESS_EXPIRY ?? '15m') as SignOptions['expiresIn'];
const REFRESH_EXPIRY = (process.env.JWT_REFRESH_EXPIRY ?? '7d') as SignOptions['expiresIn'];

export function generateAccessToken(payload: TokenPayload): string {
    return jwt.sign(payload, ACCESS_SECRET, { expiresIn: ACCESS_EXPIRY });
}

export function generateRefreshToken(payload: TokenPayload): string {
    return jwt.sign({ ...payload, nonce: crypto.randomUUID() }, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRY });
}

export function verifyAccessToken(token: string): JwtPayload & TokenPayload {
    return jwt.verify(token, ACCESS_SECRET) as JwtPayload & TokenPayload;
}

export function verifyRefreshToken(token: string): JwtPayload & TokenPayload {
    return jwt.verify(token, REFRESH_SECRET) as JwtPayload & TokenPayload;
}
