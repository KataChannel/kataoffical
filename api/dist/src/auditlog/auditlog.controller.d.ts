import { AuditService } from './auditlog.service';
export declare class AuditLogController {
    private auditService;
    constructor(auditService: AuditService);
    getAuditLogs(param: any): Promise<({
        user: {
            email: string | null;
            SDT: string | null;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        entityName: string | null;
        entityId: string | null;
        action: import(".prisma/client").$Enums.AuditAction;
        userEmail: string | null;
        oldValues: import("@prisma/client/runtime/library").JsonValue | null;
        newValues: import("@prisma/client/runtime/library").JsonValue | null;
        changedFields: string[];
        ipAddress: string | null;
        userAgent: string | null;
        sessionId: string | null;
        status: string;
        errorDetails: import("@prisma/client/runtime/library").JsonValue | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        userId: string | null;
    }) | {
        data: ({
            user: {
                email: string | null;
                SDT: string | null;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            entityName: string | null;
            entityId: string | null;
            action: import(".prisma/client").$Enums.AuditAction;
            userEmail: string | null;
            oldValues: import("@prisma/client/runtime/library").JsonValue | null;
            newValues: import("@prisma/client/runtime/library").JsonValue | null;
            changedFields: string[];
            ipAddress: string | null;
            userAgent: string | null;
            sessionId: string | null;
            status: string;
            errorDetails: import("@prisma/client/runtime/library").JsonValue | null;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
            userId: string | null;
        })[];
        page: any;
        pageSize: any;
        total: number;
        pageCount: number;
    } | null>;
}
