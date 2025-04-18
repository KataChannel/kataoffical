import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { SocketGateway } from 'src/socket.gateway';
import { ErrorlogsModule } from 'src/errorlogs/errorlogs.module';
@Module({
  imports: [PrismaModule, ErrorlogsModule],
  controllers: [DashboardController],
  providers: [DashboardService, SocketGateway],
  exports: [DashboardService],
})
export class DashboardModule {}