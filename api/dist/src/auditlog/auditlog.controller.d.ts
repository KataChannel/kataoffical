import { AuditService } from './auditlog.service';
export declare class AuditLogController {
    private auditService;
    constructor(auditService: AuditService);
    getAuditLogs(param: any): Promise<any>;
}
