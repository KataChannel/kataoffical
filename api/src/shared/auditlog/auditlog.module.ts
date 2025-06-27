import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AuditLogController } from './auditlog.controller';
import { AuditService } from './auditlog.service';
@Module({
  providers: [AuditService, PrismaService],
  controllers: [AuditLogController],
})
export class AuditLogModule {}
