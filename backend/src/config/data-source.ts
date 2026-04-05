import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { User } from '../entities/User';

config();

const DATABASE_URL = process.env.DATABASE_URL!;
const isTest = process.env.NODE_ENV === 'test';

export const AppDataSource = new DataSource({
    type: isTest ? 'sqlite' : 'postgres',
    database: isTest ? ':memory:' : undefined,
    url: isTest ? undefined : DATABASE_URL,
    ssl: isTest ? false : {
        rejectUnauthorized: false,
    },
    entities: [User],
    synchronize: true,  // auto-sync schema in dev / test
    logging: false,
} as any);
