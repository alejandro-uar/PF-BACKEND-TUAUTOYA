import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Tu-AutoYa-API')
    .setDescription('Tu-AutoYa API description')
    .setVersion('1.0')
    .addTag('Tu-AutoYa')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  // Configuración de cookie-parser
  app.use(cookieParser('asdasdasd'));

  // Configuración de CORS
  app.enableCors({
    origin: '*', // Permite cualquier origen
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
    credentials: true, // Permite el envío de cookies
  });

  // Configuración de ValidationPipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  // Inicio del servidor
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
