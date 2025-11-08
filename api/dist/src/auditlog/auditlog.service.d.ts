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
    private auditQueue;
    private isProcessing;
    private batchSize;
    private batchTimeout;
    constructor(prisma: PrismaService);
    logActivity(data: AuditLogData): Promise<void>;
    private processBatch;
    private processBatchPeriodically;
    getAuditLogs(param: any): Promise<any>;
    private getChangedFields;
}
