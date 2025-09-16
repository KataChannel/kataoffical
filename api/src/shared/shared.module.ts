import { Module, OnModuleInit } from '@nestjs/common';
import { PerformanceController } from './controllers/performance.controller';
import { PerformanceLogService } from './services/performance-log.service';
import { PerformanceLogger } from './performance-logger';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PerformanceController],
  providers: [PerformanceLogService],
  exports: [PerformanceLogService],
})
export class SharedModule implements OnModuleInit {
  constructor(private readonly performanceLogService: PerformanceLogService) {}

  onModuleInit() {
    // Inject PerformanceLogService vào PerformanceLogger static class
    PerformanceLogger.setPerformanceLogService(this.performanceLogService);
  }
}
