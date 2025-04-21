import { Module } from '@nestjs/common';
import { TrackingService } from './tracking.service';
import { TrackingController } from './tracking.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { SocketGateway } from 'src/socket.gateway';
import { ErrorlogModule } from 'src/errorlog/errorlog.module';

@Module({
  imports: [PrismaModule, ErrorlogModule],
  controllers: [TrackingController],
  providers: [TrackingService, SocketGateway],
  exports: [TrackingService],
})
export class TrackingModule {}