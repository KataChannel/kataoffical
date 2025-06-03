import { AuditService } from './auditlog.service';
export declare class AuditLogController {
    private auditService;
    constructor(auditService: AuditService);
    getAuditLogs(param: any): Promise<{
        data: ({
            user: {
                name: string | null;
                email: string | null;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string | null;
            entityName: string;
            entityId: string;
            action: import(".prisma/client").$Enums.AuditAction;
            userEmail: string | null;
            oldValues: import(".prisma/client/runtime/library").JsonValue | null;
            newValues: import(".prisma/client/runtime/library").JsonValue | null;
            changedFields: string[];
            ipAddress: string | null;
            userAgent: string | null;
            sessionId: string | null;
            metadata: import(".prisma/client/runtime/library").JsonValue | null;
        })[];
        pagination: {
            page: any;
            pageSize: any;
            total: number;
            pages: number;
        };
    }>;
}
