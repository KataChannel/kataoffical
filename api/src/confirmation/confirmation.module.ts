import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { SocketGateway } from '../socket.gateway';
import { ConfirmationController } from './confirmation.controller';
import { ConfirmationService } from './confirmation.service';

@Module({
  imports: [PrismaModule],
  controllers: [ConfirmationController],
  providers: [ConfirmationService, SocketGateway],
  exports: [ConfirmationService],
})
export class ConfirmationModule {}
