const fs = require('fs');
const path = require('path');

// Hàm tạo thư mục và file
function createFile(filePath, content) {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, content);
}

// Cấu trúc dự án
const projectDir = 'game2';
const backendDir = path.join(projectDir, 'backend');
const frontendDir = path.join(projectDir, 'frontend');

// Tạo thư mục gốc
if (!fs.existsSync(projectDir)) {
    fs.mkdirSync(projectDir);
}

// 1. Backend files (NestJS 11)
const backendFiles = {
    // package.json
    'package.json': `{
        "name": "ngu-hanh-farm-backend",
        "version": "1.0.0",
        "scripts": {
            "start": "nest start",
            "start:prod": "node dist/main",
            "prisma:generate": "prisma generate",
            "prisma:migrate": "prisma migrate dev"
        },
        "dependencies": {
            "@nestjs/common": "^11.0.0",
            "@nestjs/core": "^11.0.0",
            "@nestjs/platform-express": "^11.0.0",
            "@prisma/client": "^5.20.0",
            "tonweb": "^0.0.66",
            "dotenv": "^16.4.5",
            "node-telegram-bot-api": "^0.66.0",
            "rxjs": "^7.8.1"
        },
        "devDependencies": {
            "@nestjs/cli": "^11.0.0",
            "@nestjs/schematics": "^11.0.0",
            "prisma": "^5.20.0",
            "typescript": "^5.5.0"
        }
    }`,

    // tsconfig.json
    'tsconfig.json': `{
        "compilerOptions": {
            "module": "commonjs",
            "declaration": true,
            "removeComments": true,
            "emitDecoratorMetadata": true,
            "experimentalDecorators": true,
            "allowSyntheticDefaultImports": true,
            "target": "ES2021",
            "sourceMap": true,
            "outDir": "./dist",
            "baseUrl": "./",
            "incremental": true,
            "skipLibCheck": true,
            "strictNullChecks": false,
            "noImplicitAny": false,
            "strictBindCallApply": false,
            "forceConsistentCasingInFileNames": false,
            "noFallthroughCasesInSwitch": false
        }
    }`,

    // .env
    '.env': `DATABASE_URL=postgresql://user:password@localhost:5432/nguhanhfarm?schema=public
TON_API_KEY=YOUR_TONCENTER_API_KEY
MASTER_WALLET_SEED=YOUR_SEED_PHRASE
MASTER_WALLET_ADDRESS=YOUR_WALLET_ADDRESS
TELEGRAM_TOKEN=YOUR_BOT_TOKEN`,

    // prisma/schema.prisma
    'prisma/schema.prisma': `generator client {
    provider = "prisma-client-js"
}

datasource db {
    provider = "postgresql"
    url      = env("DATABASE_URL")
}

model User {
    id           String   @id @default(uuid())
    userId       String   @unique
    telegramChatId String?
    crops        Json[]
    xp           Int      @default(0)
    lastWater    Float    @default(0)
    wallet       String?
    balance      Float    @default(0)
    vip          Boolean  @default(false)
    vipExpiry    Float    @default(0)
}
`,

    // src/main.ts
    'src/main.ts': `import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.listen(3000);
}
bootstrap();
`,

    // src/app.module.ts
    'src/app.module.ts': `import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { TelegramModule } from './telegram/telegram.module';

@Module({
    imports: [UsersModule, PrismaModule, TelegramModule],
})
export class AppModule {}
`,

    // src/prisma/prisma.service.ts
    'src/prisma/prisma.service.ts': `import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
    }
}
`,

    // src/prisma/prisma.module.ts
    'src/prisma/prisma.module.ts': `import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
    providers: [PrismaService],
    exports: [PrismaService],
})
export class PrismaModule {}
`,

    // src/telegram/telegram.service.ts
    'src/telegram/telegram.service.ts': `import { Injectable } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';

@Injectable()
export class TelegramService {
    private bot: TelegramBot;

    constructor() {
        this.bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: false });
    }

    async sendNotification(chatId: string, message: string) {
        try {
            await this.bot.sendMessage(chatId, message);
        } catch (error) {
            console.error('Telegram notification error:', error);
        }
    }
}
`,

    // src/telegram/telegram.module.ts
    'src/telegram/telegram.module.ts': `import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';

@Module({
    providers: [TelegramService],
    exports: [TelegramService],
})
export class TelegramModule {}
`,

    // src/users/users.service.ts
    'src/users/users.service.ts': `import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TelegramService } from '../telegram/telegram.service';
import * as TonWeb from 'tonweb';

@Injectable()
export class UsersService {
    private tonweb = new TonWeb(new TonWeb.HttpProvider('https://testnet.toncenter.com/api/v2/jsonRPC', {
        apiKey: process.env.TON_API_KEY
    }));
    private crops = {
        'truc vang': { time: 60, xp: 20, tokenChances: { 0.7: 0.02, 0.2: 0.05, 0.1: 0.1 }, premium: true }, // Kim
        'tre': { time: 60, xp: 15, tokenChances: { 0.7: 0.01, 0.2: 0.03, 0.1: 0.08 }, premium: false }, // Mộc
        'sen': { time: 60, xp: 25, tokenChances: { 0.7: 0.015, 0.2: 0.04, 0.1: 0.09 }, premium: true }, // Thủy
        'phuong vi': { time: 60, xp: 30, tokenChances: { 0.7: 0.02, 0.2: 0.06, 0.1: 0.12 }, premium: true }, // Hỏa
        'lua': { time: 60, xp: 18, tokenChances: { 0.7: 0.01, 0.2: 0.04, 0.1: 0.07 }, premium: false } // Thổ
    };

    constructor(private prisma: PrismaService, private telegramService: TelegramService) {}

    async getUser(userId: string) {
        let user = await this.prisma.user.findUnique({ where: { userId } });
        if (!user) {
            user = await this.prisma.user.create({
                data: {
                    userId,
                    crops: [{ name: 'lua', planted_at: Date.now() / 1000, time_to_mature: this.crops['lua'].time }],
                    xp: 0,
                    lastWater: 0,
                    balance: 0,
                    vip: false,
                    vipExpiry: 0
                }
            });
        }
        return user;
    }

    async plantCrop(userId: string, cropName: string) {
        const user = await this.getUser(userId);
        if (this.crops[cropName].premium && user.balance < 0.5) {
            throw new Error('Not enough TON testnet');
        }
        if (user.crops.length >= 10) {
            throw new Error('Maximum 10 crops');
        }

        user.crops.push({ name: cropName, planted_at: Date.now() / 1000, time_to_mature: this.crops[cropName].time });
        if (this.crops[cropName].premium) user.balance -= 0.5;
        await this.prisma.user.update({ where: { userId }, data: { crops: user.crops, balance: user.balance } });
        if (user.telegramChatId) {
            await this.telegramService.sendNotification(user.telegramChatId, \`Bạn vừa trồng \${cropName}!\`);
        }
        return { message: \`Planted \${cropName}\`, user };
    }

    async waterCrops(userId: string) {
        const user = await this.getUser(userId);
        const currentTime = Date.now() / 1000;
        if (!user.crops.length) throw new Error('No crops to water');
        if (!user.vip && currentTime - user.lastWater < 1800) {
            throw new Error('Wait 30 minutes or buy VIP');
        }

        user.crops.forEach(crop => { crop.time_to_mature *= 0.9; });
        user.lastWater = currentTime;
        await this.prisma.user.update({ where: { userId }, data: { crops: user.crops, lastWater: user.lastWater } });
        if (user.telegramChatId) {
            await this.telegramService.sendNotification(user.telegramChatId, \`Bạn vừa tưới nước, cây trưởng thành nhanh hơn 10%!\`);
        }
        return { message: 'Watered crops', user };
    }

    async harvestCrops(userId: string) {
        const user = await this.getUser(userId);
        const currentTime = Date.now() / 1000;
        const matureCrops = user.crops.filter(crop => currentTime - crop.planted_at >= crop.time_to_mature);
        if (!matureCrops.length) throw new Error('No mature crops');

        const results = [];
        let totalTon = 0;
        const fee = 0.005 * matureCrops.length;
        if (user.balance < fee) throw new Error(\`Need \${fee} TON testnet\`);

        user.balance -= fee;

        for (const harvestedCrop of matureCrops) {
            const cropName = harvestedCrop.name;
            const xpEarned = user.vip ? this.crops[cropName].xp * 1.2 : this.crops[cropName].xp;
            user.xp += xpEarned;

            const tokenChance = Math.random();
            let tokenAmount = 0;
            let cumulative = 0;
            for (const [prob, amount] of Object.entries(this.crops[cropName].tokenChances)) {
                cumulative += parseFloat(prob);
                if (tokenChance <= cumulative) {
                    tokenAmount = amount;
                    break;
                }
            }

            results.push({ cropName, xpEarned, tokenAmount });
            totalTon += tokenAmount;
        }

        user.crops = user.crops.filter(c => !matureCrops.includes(c));

        let tokenMessage = '';
        if (user.wallet && totalTon > 0) {
            try {
                const wallet = this.tonweb.wallet.create({ publicKey: TonWeb.utils.hexToBytes(await this.tonweb.utils.mnemonicToHex(process.env.MASTER_WALLET_SEED.split(' '))) });
                const seqno = await wallet.methods.seqno().call() || 0;
                await wallet.methods.transfer({
                    secretKey: TonWeb.utils.hexToBytes(await this.tonweb.utils.mnemonicToHex(process.env.MASTER_WALLET_SEED.split(' '))),
                    toAddress: user.wallet,
                    amount: TonWeb.utils.toNano(totalTon.toString()),
                    seqno: seqno,
                    payload: \`Harvest \${matureCrops.length} crops (Testnet)\`
                }).send();
                user.balance += totalTon;
                tokenMessage = \`Received \${totalTon} TON testnet\`;

                if (user.telegramChatId) {
                    await this.telegramService.sendNotification(
                        user.telegramChatId,
                        \`Bạn vừa thu hoạch \${matureCrops.length} cây! Nhận \${user.xp} XP và \${totalTon} TON testnet.\`
                    );
                }
            } catch (error) {
                console.error('TON transfer error:', error);
                tokenMessage = 'Failed to send TON testnet';
            }
        } else {
            tokenMessage = user.wallet ? 'No TON this time' : 'Wallet not connected';
        }

        await this.prisma.user.update({ where: { userId }, data: { crops: user.crops, xp: user.xp, balance: user.balance } });
        return { message: \`Harvested \${matureCrops.length} crops! \${tokenMessage}\`, results, user };
    }

    async connectWallet(userId: string, walletAddress: string) {
        if (!walletAddress.startsWith('EQ') && !walletAddress.startsWith('UQ')) {
            throw new Error('Invalid TON testnet address');
        }
        const user = await this.getUser(userId);
        user.wallet = walletAddress;
        await this.prisma.user.update({ where: { userId }, data: { wallet: user.wallet } });
        if (user.telegramChatId) {
            await this.telegramService.sendNotification(user.telegramChatId, \`Kết nối ví TON: \${walletAddress}\`);
        }
        return { message: \`Connected wallet \${walletAddress}\`, user };
    }

    async buyItem(userId: string, item: string) {
        const user = await this.getUser(userId);
        let price = 0;
        let message = '';
        if (['truc vang', 'sen', 'phuong vi'].includes(item)) {
            price = 0.5;
            message = \`Bought \${item} seed\`;
        } else if (item === 'fertilizer') {
            price = 0.2;
            message = 'Bought fertilizer';
            user.crops.forEach(crop => crop.time_to_mature *= 0.8);
        } else if (item === 'vip') {
            price = 1;
            message = 'Bought VIP for 30 days';
            user.vip = true;
            user.vipExpiry = Date.now() / 1000 + 30 * 24 * 60 * 60;
        }

        if (user.balance < price) throw new Error('Not enough TON testnet');
        user.balance -= price;
        await this.prisma.user.update({ where: { userId }, data: { crops: user.crops, balance: user.balance, vip: user.vip, vipExpiry: user.vipExpiry } });
        if (user.telegramChatId) {
            await this.telegramService.sendNotification(user.telegramChatId, message);
        }
        return { message, user };
    }

    async deposit(userId: string, amount: number) {
        const user = await this.getUser(userId);
        user.balance += amount;
        await this.prisma.user.update({ where: { userId }, data: { balance: user.balance } });
        if (user.telegramChatId) {
            await this.telegramService.sendNotification(user.telegramChatId, \`Nạp \${amount} TON testnet (demo)\`);
        }
        return { message: \`Deposited \${amount} TON testnet\`, user };
    }

    async withdraw(userId: string, amount: number) {
        const user = await this.getUser(userId);
        if (!user.wallet) throw new Error('No wallet connected');
        if (amount <= 0 || user.balance < amount) throw new Error('Insufficient balance');

        const fee = amount * 0.1;
        try {
            const wallet = this.tonweb.wallet.create({ publicKey: TonWeb.utils.hexToBytes(await this.tonweb.utils.mnemonicToHex(process.env.MASTER_WALLET_SEED.split(' '))) });
            const seqno = await wallet.methods.seqno().call() || 0;
            await wallet.methods.transfer({
                secretKey: TonWeb.utils.hexToBytes(await this.tonweb.utils.mnemonicToHex(process.env.MASTER_WALLET_SEED.split(' '))),
                toAddress: user.wallet,
                amount: TonWeb.utils.toNano((amount - fee).toString()),
                seqno: seqno,
                payload: \`Withdraw from Ngu Hanh Farm (Testnet)\`
            }).send();
            user.balance -= amount;
            await this.prisma.user.update({ where: { userId }, data: { balance: user.balance } });
            if (user.telegramChatId) {
                await this.telegramService.sendNotification(user.telegramChatId, \`Rút \${amount - fee} TON testnet thành công!\`);
            }
            return { message: \`Withdrew \${amount - fee} TON testnet\`, user };
        } catch (error) {
            console.error('TON withdraw error:', error);
            throw new Error('Failed to withdraw TON testnet');
        }
    }

    async linkTelegram(userId: string, telegramChatId: string) {
        const user = await this.getUser(userId);
        await this.prisma.user.update({ where: { userId }, data: { telegramChatId } });
        await this.telegramService.sendNotification(telegramChatId, \`Chào mừng đến với Ngũ Hành Farm!\`);
        return { message: \`Linked Telegram chat \${telegramChatId}\`, user };
    }

    async adReward(userId: string) {
        const user = await this.getUser(userId);
        user.balance += 0.01;
        await this.prisma.user.update({ where: { userId }, data: { balance: user.balance } });
        if (user.telegramChatId) {
            await this.telegramService.sendNotification(user.telegramChatId, 'Nhận 0.01 TON từ quảng cáo!');
        }
        return { message: 'Ad reward: 0.01 TON', user };
    }
}
`,

    // src/users/users.controller.ts
    'src/users/users.controller.ts': `import { Controller, Get, Post, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get(':userId')
    async getUser(@Param('userId') userId: string) {
        return this.usersService.getUser(userId);
    }

    @Post('plant')
    async plantCrop(@Body() body: { userId: string; cropName: string }) {
        try {
            return await this.usersService.plantCrop(body.userId, body.cropName);
        } catch (error: any) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Post('water')
    async waterCrops(@Body() body: { userId: string }) {
        try {
            return await this.usersService.waterCrops(body.userId);
        } catch (error: any) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Post('harvest')
    async harvestCrops(@Body() body: { userId: string }) {
        try {
            return await this.usersService.harvestCrops(body.userId);
        } catch (error: any) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Post('connect_wallet')
    async connectWallet(@Body() body: { userId: string; walletAddress: string }) {
        try {
            return await this.usersService.connectWallet(body.userId, body.walletAddress);
        } catch (error: any) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Post('buy')
    async buyItem(@Body() body: { userId: string; item: string }) {
        try {
            return await this.usersService.buyItem(body.userId, body.item);
        } catch (error: any) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Post('deposit')
    async deposit(@Body() body: { userId: string; amount: number }) {
        try {
            return await this.usersService.deposit(body.userId, body.amount);
        } catch (error: any) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Post('withdraw')
    async withdraw(@Body() body: { userId: string; amount: number }) {
        try {
            return await this.usersService.withdraw(body.userId, body.amount);
        } catch (error: any) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Post('link_telegram')
    async linkTelegram(@Body() body: { userId: string; telegramChatId: string }) {
        try {
            return await this.usersService.linkTelegram(body.userId, body.telegramChatId);
        } catch (error: any) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Post('ad')
    async adReward(@Body() body: { userId: string }) {
        try {
            return await this.usersService.adReward(body.userId);
        } catch (error: any) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
`,

    // src/users/users.module.ts
    'src/users/users.module.ts': `import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { TelegramModule } from '../telegram/telegram.module';

@Module({
    imports: [PrismaModule, TelegramModule],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}
`
};

// 2. Frontend files (Angular 19, giữ nguyên)
const frontendFiles = {
    'package.json': `{
        "name": "ngu-hanh-farm-frontend",
        "version": "1.0.0",
        "scripts": {
            "start": "ng serve",
            "build": "ng build --prod"
        },
        "dependencies": {
            "@angular/animations": "^19.0.0",
            "@angular/common": "^19.0.0",
            "@angular/compiler": "^19.0.0",
            "@angular/core": "^19.0.0",
            "@angular/forms": "^19.0.0",
            "@angular/platform-browser": "^19.0.0",
            "@angular/platform-browser-dynamic": "^19.0.0",
            "@angular/router": "^19.0.0",
            "rxjs": "~7.8.0",
            "tslib": "^2.3.0",
            "zone.js": "~0.15.0"
        },
        "devDependencies": {
            "@angular-devkit/build-angular": "^19.0.0",
            "@angular/cli": "^19.0.0",
            "@angular/compiler-cli": "^19.0.0",
            "typescript": "~5.5.0"
        }
    }`,

    'angular.json': `{
        "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
        "version": 1,
        "newProjectRoot": "projects",
        "projects": {
            "ngu-hanh-farm-frontend": {
                "projectType": "application",
                "schematics": {},
                "root": "",
                "sourceRoot": "src",
                "prefix": "app",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-angular:application",
                        "options": {
                            "outputPath": "dist/ngu-hanh-farm-frontend",
                            "index": "src/index.html",
                            "browser": "src/main.ts",
                            "polyfills": ["zone.js"],
                            "tsConfig": "tsconfig.app.json",
                            "assets": ["src/favicon.ico", "src/assets"],
                            "styles": ["src/styles.css"],
                            "scripts": []
                        },
                        "configurations": {
                            "production": {
                                "budgets": [
                                    {
                                        "type": "initial",
                                        "maximumWarning": "500kb",
                                        "maximumError": "1mb"
                                    },
                                    {
                                        "type": "anyComponentStyle",
                                        "maximumWarning": "2kb",
                                        "maximumError": "4kb"
                                    }
                                ],
                                "outputHashing": "all"
                            },
                            "development": {
                                "optimization": false,
                                "extractLicenses": false,
                                "sourceMap": true
                            }
                        },
                        "defaultConfiguration": "production"
                    },
                    "serve": {
                        "builder": "@angular-devkit/build-angular:dev-server",
                        "configurations": {
                            "production": {
                                "buildTarget": "ngu-hanh-farm-frontend:build:production"
                            },
                            "development": {
                                "buildTarget": "ngu-hanh-farm-frontend:build:development"
                            }
                        },
                        "defaultConfiguration": "development"
                    },
                    "extract-i18n": {
                        "builder": "@angular-devkit/build-angular:extract-i18n"
                    },
                    "test": {
                        "builder": "@angular-devkit/build-angular:karma",
                        "options": {
                            "polyfills": ["zone.js"],
                            "tsConfig": "tsconfig.spec.json",
                            "assets": ["src/favicon.ico", "src/assets"],
                            "styles": ["src/styles.css"],
                            "scripts": []
                        }
                    }
                }
            }
        }
    }`,

    'tsconfig.json': `{
        "compileOnSave": false,
        "compilerOptions": {
            "outDir": "./dist/out-tsc",
            "forceConsistentCasingInFileNames": true,
            "strict": true,
            "noImplicitOverride": true,
            "noPropertyAccessFromIndexSignature": true,
            "noImplicitReturns": true,
            "noFallthroughCasesInSwitch": true,
            "sourceMap": true,
            "declaration": false,
            "downlevelIteration": true,
            "experimentalDecorators": true,
            "moduleResolution": "node",
            "importHelpers": true,
            "target": "ES2022",
            "module": "ES2022",
            "useDefineForClassFields": false,
            "lib": ["ES2022", "dom"]
        },
        "angularCompilerOptions": {
            "enableI18nLegacyMessageIdFormat": false,
            "strictInjectionParameters": true,
            "strictInputAccessModifiers": true,
            "strictTemplates": true
        }
    }`,

    'tsconfig.app.json': `{
        "extends": "./tsconfig.json",
        "compilerOptions": {
            "outDir": "./out-tsc/app",
            "types": []
        },
        "files": [
            "src/main.ts"
        ],
        "include": [
            "src/**/*.d.ts"
        ]
    }`,

    'tsconfig.spec.json': `{
        "extends": "./tsconfig.json",
        "compilerOptions": {
            "outDir": "./out-tsc/spec",
            "types": ["jasmine"]
        },
        "include": [
            "src/**/*.spec.ts",
            "src/**/*.d.ts"
        ]
    }`,

    'src/main.ts': `import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
    .catch((err) => console.error(err));
`,

    'src/styles.css': `/* You can add global styles to this file, and also import other style files */
html, body { height: 100%; }
body { margin: 0; font-family: Roboto, "Helvetica Neue", sans-serif; }
`,

    'src/index.html': `<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Ngu Hanh Farm</title>
    <base href="/">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
    <app-root></app-root>
    <script async src="https://telegram.org/js/telegram-widget.js?22" data-telegram-login="YOUR_BOT_NAME" data-size="large" data-onauth="onTelegramAuth(user)"></script>
    <script>
        window.onTelegramAuth = function(user) {
            fetch('http://localhost:3000/users/link_telegram', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.id.toString(), telegramChatId: user.id.toString() })
            }).then(response => response.json()).then(data => {
                localStorage.setItem('userId', user.id.toString());
                window.location.reload();
            });
        };
    </script>
</body>
</html>
`,

    'src/app/app.config.ts': `import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideHttpClient(),
        provideClientHydration()
    ]
};
`,

    'src/app/app.routes.ts': `import { Routes } from '@angular/router';

export const routes: Routes = [];
`,

    'src/app/app.component.ts': `import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FarmComponent } from './farm/farm.component';
import { ShopComponent } from './shop/shop.component';
import { StatusComponent } from './status/status.component';
import { WalletComponent } from './wallet/wallet.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, FarmComponent, ShopComponent, StatusComponent, WalletComponent],
    template: \`
        <div class="container">
            <h1>Ngũ Hành Farm (Testnet)</h1>
            <div *ngIf="!user">Please log in with Telegram to start playing.</div>
            <div *ngIf="user" class="tabs">
                <button (click)="activeTab = 'farm'" [class.active]="activeTab === 'farm'">Farm</button>
                <button (click)="activeTab = 'shop'" [class.active]="activeTab === 'shop'">Shop</button>
                <button (click)="activeTab = 'status'" [class.active]="activeTab === 'status'">Status</button>
                <button (click)="activeTab = 'wallet'" [class.active]="activeTab === 'wallet'">Wallet</button>
            </div>
            <app-farm *ngIf="user && activeTab === 'farm'" [user]="user" (userChange)="updateUser($event)"></app-farm>
            <app-shop *ngIf="user && activeTab === 'shop'" [user]="user" (userChange)="updateUser($event)"></app-shop>
            <app-status *ngIf="user && activeTab === 'status'" [user]="user"></app-status>
            <app-wallet *ngIf="user && activeTab === 'wallet'" [user]="user" (userChange)="updateUser($event)"></app-wallet>
        </div>
    \`,
    styles: [\`
        .container { max-width: 800px; margin: auto; padding: 20px; text-align: center; }
        .tabs button { margin: 5px; padding: 10px; cursor: pointer; border: none; background: #f0f0f0; }
        .tabs button.active { background: #007bff; color: white; }
        h1 { font-size: 2em; }
    \`]
})
export class AppComponent implements OnInit {
    activeTab = 'farm';
    userId: string | null = null;
    user: any = null;

    async ngOnInit() {
        this.userId = localStorage.getItem('userId');
        if (this.userId) {
            await this.fetchUser(this.userId);
        }
    }

    async fetchUser(userId: string) {
        const response = await fetch(\`http://localhost:3000/users/\${userId}\`);
        this.user = await response.json();
    }

    updateUser(user: any) {
        this.user = user;
    }
}
`,

    'src/app/farm/farm.component.ts': `import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-farm',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './farm.component.html',
    styleUrls: ['./farm.component.css']
})
export class FarmComponent {
    @Input() user: any;
    @Output() userChange = new EventEmitter<any>();

    cropImages = {
        'truc vang': '/assets/trucvang.jpg',
        'tre': '/assets/tre.jpg',
        'sen': '/assets/sen.jpg',
        'phuong vi': '/assets/phuongvi.jpg',
        'lua': '/assets/lua.jpg'
    };

    async plantCrop(cropName: string) {
        try {
            const response = await fetch('http://localhost:3000/users/plant', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: this.user.userId, cropName })
            });
            const data = await response.json();
            this.userChange.emit(data.user);
            alert(data.message);
        } catch (error: any) {
            alert(error.message);
        }
    }

    async waterCrops() {
        try {
            const response = await fetch('http://localhost:3000/users/water', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: this.user.userId })
            });
            const data = await response.json();
            this.userChange.emit(data.user);
            alert(data.message);
        } catch (error: any) {
            alert(error.message);
        }
    }

    async harvestCrops() {
        try {
            const response = await fetch('http://localhost:3000/users/harvest', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: this.user.userId })
            });
            const data = await response.json();
            this.userChange.emit(data.user);
            alert(data.message);
        } catch (error: any) {
            alert(error.message);
        }
    }

    async watchAd() {
        try {
            const response = await fetch('http://localhost:3000/users/ad', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: this.user.userId })
            });
            const data = await response.json();
            this.userChange.emit(data.user);
            alert(data.message);
        } catch (error: any) {
            alert(error.message);
        }
    }

    currentTime() {
        return Date.now() / 1000;
    }
}
`,

    'src/app/farm/farm.component.html': `<div class="farm">
    <h2>Farm</h2>
    <div class="plant-section">
        <h3>Plant a Crop</h3>
        <button (click)="plantCrop('truc vang')"><img src="/assets/trucvang.jpg" width="30"> Trúc Vàng (Kim)</button>
        <button (click)="plantCrop('tre')"><img src="/assets/tre.jpg" width="30"> Tre (Mộc)</button>
        <button (click)="plantCrop('sen')"><img src="/assets/sen.jpg" width="30"> Sen (Thủy)</button>
        <button (click)="plantCrop('phuong vi')"><img src="/assets/phuongvi.jpg" width="30"> Phượng Vĩ (Hỏa)</button>
        <button (click)="plantCrop('lua')"><img src="/assets/lua.jpg" width="30"> Lúa (Thổ)</button>
    </div>
    <div class="action-section">
        <button (click)="waterCrops()">Water Crops</button>
        <button (click)="harvestCrops()">Harvest</button>
        <button (click)="watchAd()">Watch Ad (+0.01 TON)</button>
    </div>
    <div class="crops-section">
        <h3>Your Crops</h3>
        <div *ngIf="!user.crops.length">No crops planted.</div>
        <div *ngFor="let crop of user.crops" class="crop-card">
            <img [src]="cropImages[crop.name]" width="50">
            <p>{{ crop.name }}: {{ crop.time_to_mature - (currentTime() - crop.planted_at) > 0 ? (crop.time_to_mature - (currentTime() - crop.planted_at)) / 60 | number:'1.0-0' : 'Mature' }} minutes left</p>
        </div>
    </div>
</div>
`,

    'src/app/farm/farm.component.css': `.farm { padding: 20px; }
.plant-section button { margin: 5px; padding: 8px; display: inline-flex; align-items: center; }
.plant-section img { margin-right: 5px; }
.action-section button { margin: 10px; padding: 10px 20px; background: #28a745; color: white; border: none; cursor: pointer; }
.crops-section { margin-top: 20px; }
.crop-card { display: flex; align-items: center; margin: 10px 0; padding: 10px; border: 1px solid #ddd; border-radius: 5px; }
.crop-card img { margin-right: 10px; }
.crop-card:hover { transform: scale(1.05); transition: transform 0.2s; }
`,

    'src/app/shop/shop.component.ts': `import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-shop',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.css']
})
export class ShopComponent {
    @Input() user: any;
    @Output() userChange = new EventEmitter<any>();

    async buyItem(item: string) {
        try {
            const response = await fetch('http://localhost:3000/users/buy', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: this.user.userId, item })
            });
            const data = await response.json();
            this.userChange.emit(data.user);
            alert(data.message);
        } catch (error: any) {
            alert(error.message);
        }
    }
}
`,

    'src/app/shop/shop.component.html': `<div>
    <h2>Shop</h2>
    <button (click)="buyItem('truc vang')">Trúc Vàng Seed (0.5 TON)</button>
    <button (click)="buyItem('sen')">Sen Seed (0.5 TON)</button>
    <button (click)="buyItem('phuong vi')">Phượng Vĩ Seed (0.5 TON)</button>
    <button (click)="buyItem('fertilizer')">Fertilizer (0.2 TON)</button>
    <button (click)="buyItem('vip')">VIP (1 TON)</button>
</div>
`,

    'src/app/shop/shop.component.css': `button { margin: 5px; padding: 8px 16px; background: #007bff; color: white; border: none; cursor: pointer; }
`,

    'src/app/status/status.component.ts': `import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-status',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './status.component.html',
    styleUrls: ['./status.component.css']
})
export class StatusComponent {
    @Input() user: any;

    currentTime() {
        return Date.now() / 1000;
    }
}
`,

    'src/app/status/status.component.html': `<div>
    <h2>Status</h2>
    <p>XP: {{ user.xp }}</p>
    <p>TON Testnet Balance: {{ user.balance.toFixed(3) }}</p>
    <p>Wallet: {{ user.wallet || 'Not connected' }}</p>
    <p>VIP: {{ user.vip && user.vipExpiry > currentTime() ? 'Active' : 'None' }}</p>
    <h3>Crops</h3>
    <p *ngIf="!user.crops.length">No crops planted.</p>
    <p *ngFor="let crop of user.crops">
        {{ crop.name }}: {{ crop.time_to_mature - (currentTime() - crop.planted_at) > 0 ? (crop.time_to_mature - (currentTime() - crop.planted_at)) / 60 | number:'1.0-0' : 'Mature' }} minutes left
    </p>
</div>
`,

    'src/app/status/status.component.css': `div { padding: 20px; }
p { margin: 5px 0; }
`,

    'src/app/wallet/wallet.component.ts': `import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-wallet',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './wallet.component.html',
    styleUrls: ['./wallet.component.css']
})
export class WalletComponent {
    @Input() user: any;
    @Output() userChange = new EventEmitter<any>();
    walletAddress = '';
    withdrawAmount = '';

    async connectWallet() {
        try {
            const response = await fetch('http://localhost:3000/users/connect_wallet', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: this.user.userId, walletAddress: this.walletAddress })
            });
            const data = await response.json();
            this.userChange.emit(data.user);
            alert(data.message);
        } catch (error: any) {
            alert(error.message);
        }
    }

    async deposit() {
        try {
            const response = await fetch('http://localhost:3000/users/deposit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: this.user.userId, amount: 2 })
            });
            const data = await response.json();
            this.userChange.emit(data.user);
            alert(data.message);
        } catch (error: any) {
            alert(error.message);
        }
    }

    async withdraw() {
        try {
            const response = await fetch('http://localhost:3000/users/withdraw', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: this.user.userId, amount: parseFloat(this.withdrawAmount) })
            });
            const data = await response.json();
            this.userChange.emit(data.user);
            alert(data.message);
        } catch (error: any) {
            alert(error.message);
        }
    }
}
`,

    'src/app/wallet/wallet.component.html': `<div>
    <h2>Wallet</h2>
    <div>
        <input [(ngModel)]="walletAddress" placeholder="TON Testnet Address (EQ...)" />
        <button (click)="connectWallet()">Connect Wallet</button>
    </div>
    <div>
        <button (click)="deposit()">Deposit 2 TON Testnet (Demo)</button>
    </div>
    <div>
        <input [(ngModel)]="withdrawAmount" type="number" placeholder="Amount to withdraw" />
        <button (click)="withdraw()">Withdraw</button>
    </div>
</div>
`,

    'src/app/wallet/wallet.component.css': `div { padding: 20px; }
input { margin: 5px; padding: 8px; width: 200px; }
button { margin: 5px; padding: 8px 16px; background: #dc3545; color: white; border: none; cursor: pointer; }
`
};

// 3. Tạo .gitignore
const gitignore = `node_modules
.env
frontend/dist
backend/prisma/dev.db
`;

// Tạo tất cả file
Object.entries(backendFiles).forEach(([file, content]) => {
    createFile(path.join(backendDir, file), content);
});

Object.entries(frontendFiles).forEach(([file, content]) => {
    createFile(path.join(frontendDir, file), content);
});

createFile(path.join(projectDir, '.gitignore'), gitignore);

// Tạo thư mục assets (cho hình ảnh)
fs.mkdirSync(path.join(frontendDir, 'src/assets'), { recursive: true });

console.log('Dự án Ngũ Hành Farm (NestJS 11, Angular 19) đã được tạo thành công!');
console.log('Tiếp theo:');
console.log('1. Cập nhật backend/.env với thông tin thực tế (DATABASE_URL, TON_API_KEY, TELEGRAM_TOKEN, v.v.).');
console.log('2. Thêm hình ảnh vào frontend/src/assets (trucvang.jpg, tre.jpg, sen.jpg, phuongvi.jpg, lua.jpg).');
console.log('3. Chạy: cd ngu-hanh-farm-webapp/backend && npm install && npx prisma migrate dev');
console.log('4. Chạy: cd ngu-hanh-farm-webapp/frontend && npm install');
console.log('5. Chạy backend: cd backend && npm run start');
console.log('6. Chạy frontend: cd frontend && npm start');