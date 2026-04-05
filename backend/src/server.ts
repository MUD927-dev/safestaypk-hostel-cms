import 'reflect-metadata';
import { config } from 'dotenv';
config();

import { AppDataSource } from './config/data-source';
import app from './app';
import logger from './utils/logger';

const PORT = parseInt(process.env.PORT ?? '5000', 10);

async function bootstrap(): Promise<void> {
    try {
        logger.info('⏳ Connecting to Supabase PostgreSQL...');
        await AppDataSource.initialize();
        logger.info('✅ Database connected and schema synchronised.');

        app.listen(PORT, () => {
            logger.info(`🚀 SafeStayPK API running at http://localhost:${PORT}`);
        });
    } catch (error) {
        logger.error('❌ Failed to start server:', error);
        process.exit(1);
    }
}

bootstrap();
