// auditlog.service.ts
import { Injectable } from '@nestjs/common';
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

@Injectable()
export class AuditService {
  private auditQueue: Array<AuditLogData> = [];
  private isProcessing = false;
  private batchSize = 10;
  private batchTimeout = 5000; // 5 seconds
  
  constructor(private readonly prisma: PrismaService) {
    // Start batch processing
    this.processBatchPeriodically();
  }

  async logActivity(data: AuditLogData): Promise<void> {
    try {
      // Log warning if userId is null for tracking purposes
      if (!data.userId) {
        console.warn(`AUDIT SERVICE: Logging activity without userId - Entity: ${data.entityName}, Action: ${data.action}, IP: ${data.ipAddress}`);
      }
      
      // Add to queue for batch processing instead of immediate DB write
      const changedFields = data.changedFields || this.getChangedFields(data.oldValues, data.newValues);
      this.auditQueue.push({
        ...data,
        changedFields: changedFields || [],
        status: data.status || 'SUCCESS'
      });

      // Trigger immediate processing if queue is full
      if (this.auditQueue.length >= this.batchSize) {
        this.processBatch();
      }
    } catch (error) {
      console.error('Failed to queue audit log:', error);
      // Không throw error để không ảnh hưởng business logic
    }
  }

  private async processBatch(): Promise<void> {
    if (this.isProcessing || this.auditQueue.length === 0) {
      return;
    }

    this.isProcessing = true;
    const batch = this.auditQueue.splice(0, this.batchSize);

    try {
      // Use batch insert to reduce connection usage
      await this.prisma.auditLog.createMany({
        data: batch.map(item => ({
          entityName: item.entityName,
          entityId: item.entityId,
          action: item.action,
          userId: item.userId,
          userEmail: item.userEmail,
          oldValues: item.oldValues || null,
          newValues: item.newValues || null,
          changedFields: item.changedFields || [],
          ipAddress: item.ipAddress || null,
          userAgent: item.userAgent || null,
          sessionId: item.sessionId || null,
          metadata: item.metadata || null,
          status: item.status || 'SUCCESS',
          errorDetails: item.errorDetails || null,
        })),
        skipDuplicates: true
      });
    } catch (error) {
      console.error('Failed to create audit log batch:', error);
      // Re-queue failed items for retry (optional)
    } finally {
      this.isProcessing = false;
    }
  }

  private processBatchPeriodically(): void {
    setInterval(() => {
      this.processBatch();
    }, this.batchTimeout);
  }

  async getAuditLogs(param: any) {
    const { page = 1, pageSize = 50,isOne, ...where } = param;
    const skip = (page - 1) * pageSize;
    const whereClause: any = {};
    if (where.id) whereClause.id = where.id;
    if (where.entityName) {
      whereClause.entityName = { contains: where.entityName, mode: 'insensitive' };
    }
    if (where.entityId) {
      whereClause.entityId = { contains: where.entityId, mode: 'insensitive' };
    }
    if (where.userId) {
      whereClause.userId = { contains: where.userId, mode: 'insensitive' };
    }
    if (where.action) {
      whereClause.action = { contains: where.action, mode: 'insensitive' };
    }
    if (where.status) {
      whereClause.status = { contains: where.status, mode: 'insensitive' };
    }
    if (where.startDate || where.endDate) {
      whereClause.createdAt = {};
      if (where.startDate) whereClause.createdAt.gte = new Date(where.startDate);
      if (where.endDate) whereClause.createdAt.lte = new Date(where.endDate);
    }
    if(isOne){
        const result =  await this.prisma.auditLog.findFirst({
        where: whereClause,
        include: {
          user: { select: { email: true, SDT: true } },
        },
      })
      return result
    }

    const [logs, total] = await Promise.all([
      this.prisma.auditLog.findMany({
        where: whereClause,
        include: {
          user: { select: { email: true, SDT: true } },
        },
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.auditLog.count({ where: whereClause }),
    ]);

    return {
      data: logs,
      page,
      pageSize,
      total,
      pageCount: Math.ceil(total / pageSize),
    };


  }

  private getChangedFields(oldValues: any, newValues: any): string[] {
    if (!oldValues || !newValues) return [];

    const changed: string[] = [];
    const allKeys = new Set([...Object.keys(oldValues || {}), ...Object.keys(newValues || {})]);

    for (const key of allKeys) {
      if (JSON.stringify(oldValues[key]) !== JSON.stringify(newValues[key])) {
        changed.push(key);
      }
    }

    return changed;
  }
}