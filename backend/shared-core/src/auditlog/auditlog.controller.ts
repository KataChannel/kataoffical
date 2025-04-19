import { Controller, Get, Query } from '@nestjs/common';
import { AuditLogService } from './auditlog.service';

@Controller('audit-logs')
export class AuditLogController {
  constructor(private auditLogService: AuditLogService) {}

  @Get()
  async getLogs(@Query('entity') entity: string, @Query('entityId') entityId: string) {
    return this.auditLogService.getLogs(entity, entityId);
  }
}
