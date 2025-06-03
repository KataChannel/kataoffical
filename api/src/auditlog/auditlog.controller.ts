import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AuditService } from './auditlog.service';
@Controller('auditlog')
export class AuditLogController {
  constructor(private auditService: AuditService) {}
  @Post('findby')
  async getAuditLogs(@Body() param: any) {
    return await this.auditService.getAuditLogs(param);
  }
}
