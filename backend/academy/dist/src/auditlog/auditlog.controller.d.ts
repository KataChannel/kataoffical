import { AuditLogService } from './auditlog.service';
export declare class AuditLogController {
    private auditLogService;
    constructor(auditLogService: AuditLogService);
    getLogs(entity: string, entityId: string): Promise<{
        id: string;
        userId: string;
        action: string | null;
        entity: string | null;
        entityId: string | null;
        oldValue: import("@prisma/client/runtime/library").JsonValue | null;
        newValue: import("@prisma/client/runtime/library").JsonValue | null;
        createdAt: Date;
    }[]>;
}
