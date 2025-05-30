import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';
import * as bodyParser from 'body-parser';
import * as admin from 'firebase-admin';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Chỉ cho phép các thuộc tính được định nghĩa trong DTO
    forbidNonWhitelisted: true, // Báo lỗi nếu có thuộc tính thừa
    transform: true, // Tự động chuyển đổi kiểu dữ liệu (vd: string -> number)
    transformOptions: {
      enableImplicitConversion: true, // Cho phép chuyển đổi ngầm định
    },
  }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(new ValidationPipe());
  
  const config = new DocumentBuilder()
    .setTitle('Kataapp API')
    .setDescription('The Kataapp API description with Redis, WebSocket and Pagination')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors();
  app.use('/images', express.static(join(__dirname, '../sandbox/images')));
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  // Lấy Service Account từ biến môi trường
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
    const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    console.log('✅ Firebase initialized with Service Account from ENV');
  } else {
    console.error('❌ GOOGLE_APPLICATION_CREDENTIALS_JSON is missing!');
  }
  console.log('port',process.env.PORT);
  
  await app.listen(process.env.PORT ?? 3100);
}

bootstrap();
