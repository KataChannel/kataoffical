"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const express = require("express");
const path_1 = require("path");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    app.useGlobalInterceptors(new common_1.ClassSerializerInterceptor(app.get(core_1.Reflector)));
    app.useGlobalPipes(new common_1.ValidationPipe());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Kataapp API')
        .setDescription('The Kataapp API description with Redis, WebSocket and Pagination')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    app.enableCors();
    app.use('/images', express.static((0, path_1.join)(__dirname, '../sandbox/images')));
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    if (process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
        const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
        console.log('✅ Firebase initialized with Service Account from ENV');
    }
    else {
        console.error('❌ GOOGLE_APPLICATION_CREDENTIALS_JSON is missing!');
    }
    console.log('port', process.env.PORT);
    await app.listen(process.env.PORT ?? 3100);
}
bootstrap();
//# sourceMappingURL=main.js.map