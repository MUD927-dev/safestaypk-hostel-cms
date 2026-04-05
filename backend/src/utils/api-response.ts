import { Response } from 'express';

interface ApiResponseData<T> {
    success: boolean;
    message: string;
    data?: T;
    errors?: unknown[];
}

export function sendSuccess<T>(
    res: Response,
    data: T,
    message = 'Success',
    statusCode = 200
): Response {
    const body: ApiResponseData<T> = { success: true, message, data };
    return res.status(statusCode).json(body);
}

export function sendError(
    res: Response,
    message: string,
    statusCode = 500,
    errors?: unknown[]
): Response {
    const body: ApiResponseData<null> = { success: false, message, errors };
    return res.status(statusCode).json(body);
}
