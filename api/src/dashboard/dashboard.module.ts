import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { ErrorlogsModule } from 'src/errorlogs/errorlogs.module';
import { SocketGateway } from 'src/socket.gateway';
import { SharedModule } from '../shared/shared.module';
import { DashboardController } from './dashboard.controller';
import { DashboardResolver } from './dashboard.resolver';
import { DashboardService } from './dashboard.service';

@Module({
  imports: [PrismaModule, ErrorlogsModule, SharedModule],
  controllers: [DashboardController],
  providers: [DashboardService, SocketGateway, DashboardResolver],
  exports: [DashboardService],
})
export class DashboardModule {}
