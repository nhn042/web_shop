// import { MYSQL_CONFIG } from '../constant.config';
import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () =>
      createConnection({
        type: 'postgres',
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: 5432,
        host: process.env.DB_HOST,
        database: process.env.DB_DB,
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
  },
];
