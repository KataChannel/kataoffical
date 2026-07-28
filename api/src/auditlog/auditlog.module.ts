import { Module } from '@nestjs/common';
import { AuditLogController } from './auditlog.controller';
import { AuditService } from './auditlog.service';

@Module({
  providers: [AuditService],
  controllers: [AuditLogController],
  exports: [AuditService],
})
export class AuditLogModule { }
