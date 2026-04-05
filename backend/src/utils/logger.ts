import winston from 'winston';

const { combine, timestamp, printf, colorize, errors } = winston.format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} ${level}: ${stack || message}`;
});

const isProd = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'test';

const logger = winston.createLogger({
    level: isProd ? 'info' : 'debug',
    // Do not log output when running Jest tests unless it's a critical error
    silent: isTest,
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        errors({ stack: true }),
        isProd ? winston.format.json() : combine(colorize(), logFormat)
    ),
    transports: [
        new winston.transports.Console()
    ],
});

export default logger;
