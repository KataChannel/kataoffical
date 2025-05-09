import { Module } from '@nestjs/common';
import { UserguideService } from './userguide.service';
import { UserguideController } from './userguide.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { SocketGateway } from '../socket.gateway';
import { ErrorlogModule } from 'src/errorlog/errorlog.module';

@Module({
  imports: [PrismaModule, ErrorlogModule],
  controllers: [UserguideController],
  providers: [UserguideService],
  exports: [UserguideService, SocketGateway]
})
export class UserguideModule {}