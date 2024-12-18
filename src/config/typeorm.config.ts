// config/typeorm.config.ts
import { registerAs } from '@nestjs/config';
import { DataSource } from 'typeorm';

export default registerAs('typeorm', () => ({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/**/*.entity{.ts,.js}'],
  dropSchema: true,
  logging: false,
  synchronize: true
}));

