import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors: true});
  app.setGlobalPrefix('api/v1')
  app.use(cookieParser())
  app.enableCors({
    origin: ['http://localhost:4000'],
    methods: ['GET', 'POST'],
    credentials: true
  })
    
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
  }))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
