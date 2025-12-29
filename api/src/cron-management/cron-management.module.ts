import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { DonhangModule } from '../donhang/donhang.module';
import { DatabaseSyncService } from '../services/database-sync.service';
import { CronLogService } from './cron-log.service';
import { CronManagementController } from './cron-management.controller';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    JwtModule.register({}),
    DonhangModule,
  ],
  controllers: [CronManagementController],
  providers: [DatabaseSyncService, CronLogService],
  exports: [CronLogService],
})
export class CronManagementModule {}
