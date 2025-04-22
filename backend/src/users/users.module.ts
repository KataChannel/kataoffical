import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { TelegramModule } from '../telegram/telegram.module';
import { TonModule } from 'src/ton/ton.module';
@Module({
  imports: [PrismaModule, TelegramModule, TonModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
