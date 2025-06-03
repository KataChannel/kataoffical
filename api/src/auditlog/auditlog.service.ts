import { Injectable } from '@nestjs/common';
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

@Injectable()
export class AuditService {
  constructor(private readonly prisma: PrismaService) {}
  async logActivity(data: AuditLogData): Promise<void> {
    try {
      const changedFields = this.getChangedFields(data.oldValues, data.newValues);
      await this.prisma.auditLog.create({
        data: {
          entityName: data.entityName,
          entityId: data.entityId,
          action: data.action,
          userId: data.userId,
          userEmail: data.userEmail,
          oldValues: data.oldValues,
          newValues: data.newValues,
          changedFields,
          ipAddress: data.ipAddress,
          userAgent: data.userAgent,
          sessionId: data.sessionId,
          metadata: data.metadata,
        },
      });
    } catch (error) {
      console.error('Failed to create audit log:', error);
      // Không throw error để không ảnh hưởng business logic
    }
  }

  async getAuditLogs(param:any) {
    const { page = 1, pageSize = 50, ...where } = param;
    const skip = (page - 1) * pageSize;
    const whereClause: any = {};
    if (where.entityName) whereClause.entityName = where.entityName;
    if (where.entityId) whereClause.entityId = where.entityId;
    if (where.userId) whereClause.userId = where.userId;
    if (where.action) whereClause.action = where.action;
    if (where.startDate || where.endDate) {
      whereClause.createdAt = {};
      if (where.startDate) whereClause.createdAt.gte = where.startDate;
      if (where.endDate) whereClause.createdAt.lte = where.endDate;
    }
    const [logs, total] = await Promise.all([
      this.prisma.auditLog.findMany({
        where: whereClause,
        include: {
          user: { select: { email: true, name: true } },
        },
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.auditLog.count({ where: whereClause }),
    ]);

    return {
      data: logs,
      pagination: {
        page,
        pageSize,
        total,
        pages: Math.ceil(total / pageSize),
      },
    };
  }


  private getChangedFields(oldValues: any, newValues: any): string[] {
    if (!oldValues || !newValues) return [];
    
    const changed: string[] = [];
    const allKeys = new Set([...Object.keys(oldValues), ...Object.keys(newValues)]);
    
    for (const key of allKeys) {
      if (JSON.stringify(oldValues[key]) !== JSON.stringify(newValues[key])) {
        changed.push(key);
      }
    }
    
    return changed;
  }
}