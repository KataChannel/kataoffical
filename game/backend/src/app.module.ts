import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { TelegramModule } from './telegram/telegram.module';
import { TonModule } from './ton/ton.module';

@Module({
    imports: [
        UsersModule, 
        PrismaModule,
        TelegramModule,
        TonModule
    ],
})
export class AppModule {}
