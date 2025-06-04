import { AuditService } from './auditlog.service';
export declare class AuditLogController {
    private auditService;
    constructor(auditService: AuditService);
    getAuditLogs(param: any): Promise<({
        user: {
            email: string | null;
        } | null;
    } & {
        id: string;
        entityName: string;
        entityId: string;
        action: import(".prisma/client").$Enums.AuditAction;
        userId: string | null;
        userEmail: string | null;
        oldValues: import("@prisma/client/runtime/library").JsonValue | null;
        newValues: import("@prisma/client/runtime/library").JsonValue | null;
        changedFields: string[];
        ipAddress: string | null;
        userAgent: string | null;
        sessionId: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        createdAt: Date;
        updatedAt: Date;
    }) | {
        data: ({
            user: {
                email: string | null;
            } | null;
        } & {
            id: string;
            entityName: string;
            entityId: string;
            action: import(".prisma/client").$Enums.AuditAction;
            userId: string | null;
            userEmail: string | null;
            oldValues: import("@prisma/client/runtime/library").JsonValue | null;
            newValues: import("@prisma/client/runtime/library").JsonValue | null;
            changedFields: string[];
            ipAddress: string | null;
            userAgent: string | null;
            sessionId: string | null;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
            createdAt: Date;
            updatedAt: Date;
        })[];
        pagination: {
            page: any;
            pageSize: any;
            total: number;
            pages: number;
        };
    } | null>;
}
