import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { SocketGateway } from 'src/socket.gateway';
import { ErrorlogsModule } from 'src/errorlogs/errorlogs.module';
import { SharedModule } from '../shared/shared.module';
@Module({
  imports: [PrismaModule, ErrorlogsModule, SharedModule],
  controllers: [DashboardController],
  providers: [DashboardService, SocketGateway],
  exports: [DashboardService],
})
export class DashboardModule {}