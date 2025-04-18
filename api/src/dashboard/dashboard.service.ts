import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { SocketGateway } from 'src/socket.gateway';
import { CreateDashboardDto, UpdateDashboardDto } from './dto/dashboard.dto';
import { ErrorlogsService } from 'src/errorlogs/errorlogs.service';
import { SummaryQueryDto } from './dto/summary-query.dto';

@Injectable()
export class DashboardService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly socketGateway: SocketGateway,
    private readonly errorLogService: ErrorlogsService,
  ) {}

  getSummary(query: SummaryQueryDto) {
    throw new Error('Method not implemented.');
  }
  getTopSellingProducts(limit: number, query: SummaryQueryDto) {
    throw new Error('Method not implemented.');
  }
  getLowStockProducts() {
    throw new Error('Method not implemented.');
  }
  getRecentOrders(limit: number) {
    throw new Error('Method not implemented.');
  }
  getSalesTrend(query: SummaryQueryDto) {
    throw new Error('Method not implemented.');
  }
}