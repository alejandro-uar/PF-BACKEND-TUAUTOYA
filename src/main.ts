import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Tu-AutoYa-API')
    .setDescription('Tu-AutoYa API description')
    .setVersion('1.0')
    .addTag('Tu-AutoYa')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, documentFactory);

  app.use(cookieParser('asdasdasd'))
  
  const whitelist = ['http://127.0.0.1:5500']

  app.enableCors({
    origin: whitelist,
    methods: ['GET', 'POST','PUT', 'DELETE'],
    credentials: true,
  })
    
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
  }))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
