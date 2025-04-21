import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AuditLogController } from './auditlog.controller';
import { AuditLogService } from './auditlog.service';

@Module({
  providers: [AuditLogService, PrismaService],
  controllers: [AuditLogController],
})
export class AuditLogModule {}
