import {TypeOrmModuleOptions} from '@nestjs/typeorm';
import * as dotenv from 'dotenv'

dotenv.config();

export const config: TypeOrmModuleOptions = {
    type: 'postgres',
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: 5432,
    host: process.env.DB_HOST,
    database: process.env.DB_DB,
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
};
