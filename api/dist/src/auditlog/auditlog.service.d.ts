import { AuditAction } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
export interface AuditLogData {
    entityName: string;
    entityId: string;
    action: AuditAction;
    userId: string;
    userEmail: string;
    oldValues: any;
    newValues: any;
    changedFields: string[];
    ipAddress: string;
    userAgent: string;
    sessionId: string;
    metadata: any;
}
export declare class AuditService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    logActivity(data: AuditLogData): Promise<void>;
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
            entityName: string | null;
            entityId: string | null;
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
    private getChangedFields;
}
