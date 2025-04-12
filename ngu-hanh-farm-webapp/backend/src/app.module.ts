import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { TelegramModule } from './telegram/telegram.module';

@Module({
    imports: [UsersModule, PrismaModule, TelegramModule],
})
export class AppModule {}
