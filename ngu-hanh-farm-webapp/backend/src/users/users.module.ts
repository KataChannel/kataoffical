import { Module } from '@nestjs/common';
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
