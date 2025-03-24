import { AuditLogService } from './auditlog.service';
export declare class AuditLogController {
    private auditLogService;
    constructor(auditLogService: AuditLogService);
    getLogs(entity: string, entityId: string): Promise<any>;
}
