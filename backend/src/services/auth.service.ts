import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { AppDataSource } from '../config/data-source';
import { User, UserRole } from '../entities/User';
import { ApiError } from '../utils/api-error';
import {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken,
    TokenPayload,
} from '../utils/jwt';

const userRepo = () => AppDataSource.getRepository(User);

export interface RegisterDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role?: UserRole;
}

export interface LoginDto {
    email: string;
    password: string;
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function buildPayload(user: User): TokenPayload {
    return { sub: user.id, email: user.email, role: user.role };
}

function issueTokens(user: User): AuthTokens {
    const payload = buildPayload(user);
    return {
        accessToken: generateAccessToken(payload),
        refreshToken: generateRefreshToken(payload),
    };
}

// ─── Service methods ─────────────────────────────────────────────────────────

export async function register(dto: RegisterDto): Promise<{ user: Partial<User>; tokens: AuthTokens }> {
    const repo = userRepo();

    const existing = await repo.findOne({ where: { email: dto.email } });
    if (existing) {
        throw ApiError.conflict('An account with that email already exists.');
    }

    if (dto.role === UserRole.Admin) {
        throw ApiError.forbidden('Cannot register as Admin.');
    }

    const user = repo.create({
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        password: dto.password,        // hashed by @BeforeInsert hook
        role: dto.role ?? UserRole.Student,
    });

    await repo.save(user);

    const tokens = issueTokens(user);

    // Persist hashed refresh token correctly
    const hashed = await bcrypt.hash(
        crypto.createHash('sha256').update(tokens.refreshToken).digest('hex'), 
        10
    );
    await repo.update(user.id, { refreshToken: hashed });

    const { password: _p, refreshToken: _rt, ...safeUser } = user as any;
    return { user: safeUser, tokens };
}

export async function login(dto: LoginDto): Promise<{ user: Partial<User>; tokens: AuthTokens }> {
    const repo = userRepo();

    const user = await repo.findOne({
        where: { email: dto.email },
        select: ['id', 'email', 'isActive', 'password', 'role', 'refreshToken']
    });

    if (!user) throw ApiError.unauthorized('Invalid email or password.');
    if (!user.isActive) throw ApiError.forbidden('Your account has been deactivated.');

    const valid = await user.comparePassword(dto.password);
    if (!valid) throw ApiError.unauthorized('Invalid email or password.');

    const tokens = issueTokens(user);
    const hashed = await bcrypt.hash(
        crypto.createHash('sha256').update(tokens.refreshToken).digest('hex'), 
        10
    );
    await repo.update(user.id, { refreshToken: hashed });

    const { password: _p, refreshToken: _rt, ...safeUser } = user as any;
    return { user: safeUser, tokens };
}

export async function refreshTokens(oldRefreshToken: string): Promise<AuthTokens> {
    let payload: TokenPayload;
    try {
        payload = verifyRefreshToken(oldRefreshToken);
    } catch {
        throw ApiError.unauthorized('Invalid or expired refresh token.');
    }

    const repo = userRepo();
    const user = await repo.findOne({
        where: { id: payload.sub },
        select: ['id', 'email', 'isActive', 'password', 'role', 'refreshToken']
    });

    if (!user || !user.refreshToken) {
        throw ApiError.unauthorized('Token has been revoked.');
    }

    const tokenMatch = await bcrypt.compare(
        crypto.createHash('sha256').update(oldRefreshToken).digest('hex'), 
        user.refreshToken
    );
    if (!tokenMatch) throw ApiError.unauthorized('Token mismatch — possible replay attack.');

    const tokens = issueTokens(user);
    const hashed = await bcrypt.hash(
        crypto.createHash('sha256').update(tokens.refreshToken).digest('hex'), 
        10
    );
    await repo.update(user.id, { refreshToken: hashed });

    return tokens;
}

export async function logout(userId: string): Promise<void> {
    const repo = userRepo();
    await repo.update(userId, { refreshToken: null });
}
