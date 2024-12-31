// config/typeorm.config.ts
import { registerAs } from '@nestjs/config';

export default registerAs('typeorm', () => {
  if(
    !process.env.DB_HOST ||
    !process.env.DB_PORT ||
    !process.env.DB_USER ||
    !process.env.DB_PASSSWORD ||
    !process.env.DB_NAME
  ){
    throw new Error('Faltan variables de entorno de base de datos. Por favor revise su archivo .env.');
  }

  return {
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
  };
});

