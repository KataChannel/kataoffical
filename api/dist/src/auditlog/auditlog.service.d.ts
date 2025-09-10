import { AuditAction } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
export interface AuditLogData {
    entityName: string;
    entityId: string;
    action: AuditAction;
    userId: string | null;
    userEmail: string | null;
    oldValues?: any;
    newValues?: any;
    changedFields?: string[];
    ipAddress: string | null;
    userAgent: string | null;
    sessionId: string | null;
    metadata?: any;
    status?: 'SUCCESS' | 'ERROR';
    errorDetails?: any;
}
export declare class AuditService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    logActivity(data: AuditLogData): Promise<void>;
    getAuditLogs(param: any): Promise<({
        user: {
            email: string | null;
            SDT: string | null;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
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
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        errorDetails: import("@prisma/client/runtime/library").JsonValue | null;
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
            status: string;
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
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
            errorDetails: import("@prisma/client/runtime/library").JsonValue | null;
            userId: string | null;
        })[];
        page: any;
        pageSize: any;
        total: number;
        pageCount: number;
    } | null>;
    private getChangedFields;
}
