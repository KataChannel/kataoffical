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
    const { page = 1, pageSize = 50, isOne, ...where } = param;
    const skip = (page - 1) * pageSize;
    
    // Build base where clause
    const baseWhere: any = {};
    
    if (where.id) baseWhere.id = where.id;
    
    if (where.entityName) {
      baseWhere.entityName = { contains: where.entityName, mode: 'insensitive' };
    }
    
    if (where.entityId) {
      baseWhere.entityId = { contains: where.entityId, mode: 'insensitive' };
    }
    
    if (where.userId) {
      baseWhere.userId = { contains: where.userId, mode: 'insensitive' };
    }
    
    if (where.action) {
      baseWhere.action = { contains: where.action, mode: 'insensitive' };
    }
    
    if (where.status) {
      baseWhere.status = { contains: where.status, mode: 'insensitive' };
    }
    
    // Handle date range filtering - support both old and new parameter names
    const dateFrom = where.createdAtFrom || where.startDate;
    const dateTo = where.createdAtTo || where.endDate;
    
    if (dateFrom || dateTo) {
      baseWhere.createdAt = {};
      
      if (dateFrom) {
        // Set to start of day (00:00:00)
        const fromDate = new Date(dateFrom);
        fromDate.setHours(0, 0, 0, 0);
        baseWhere.createdAt.gte = fromDate;
      }
      
      if (dateTo) {
        // Set to end of day (23:59:59.999)
        const toDate = new Date(dateTo);
        toDate.setHours(23, 59, 59, 999);
        baseWhere.createdAt.lte = toDate;
      }
    }

    // For JSON search, we need to use raw SQL due to Prisma limitations
    if (where.searchValue) {
      // Build SQL conditions array
      const sqlConditions: string[] = [];
      const sqlParams: any[] = [];
      let paramIndex = 1;

      // Add all base where conditions
      if (baseWhere.entityName) {
        sqlConditions.push(`"entityName" ILIKE $${paramIndex}`);
        sqlParams.push(`%${where.entityName}%`);
        paramIndex++;
      }
      
      if (baseWhere.entityId) {
        sqlConditions.push(`"entityId" ILIKE $${paramIndex}`);
        sqlParams.push(`%${where.entityId}%`);
        paramIndex++;
      }
      
      if (baseWhere.userId) {
        sqlConditions.push(`"userId" ILIKE $${paramIndex}`);
        sqlParams.push(`%${where.userId}%`);
        paramIndex++;
      }
      
      if (baseWhere.action) {
        sqlConditions.push(`action::text ILIKE $${paramIndex}`);
        sqlParams.push(`%${where.action}%`);
        paramIndex++;
      }
      
      if (baseWhere.status) {
        sqlConditions.push(`status ILIKE $${paramIndex}`);
        sqlParams.push(`%${where.status}%`);
        paramIndex++;
      }
      
      if (baseWhere.createdAt?.gte) {
        sqlConditions.push(`"createdAt" >= $${paramIndex}`);
        sqlParams.push(baseWhere.createdAt.gte);
        paramIndex++;
      }
      
      if (baseWhere.createdAt?.lte) {
        sqlConditions.push(`"createdAt" <= $${paramIndex}`);
        sqlParams.push(baseWhere.createdAt.lte);
        paramIndex++;
      }

      // Add JSON search condition
      sqlConditions.push(`("oldValues"::text ILIKE $${paramIndex} OR "newValues"::text ILIKE $${paramIndex + 1})`);
      sqlParams.push(`%${where.searchValue}%`);
      sqlParams.push(`%${where.searchValue}%`);
      paramIndex += 2;

      const whereClause = sqlConditions.length > 0 ? `WHERE ${sqlConditions.join(' AND ')}` : '';
      
      if (isOne) {
        const result: any = await this.prisma.$queryRawUnsafe(
          `SELECT * FROM "AuditLog" ${whereClause} ORDER BY "createdAt" DESC LIMIT 1`,
          ...sqlParams
        );
        
        if (result.length > 0) {
          const log = result[0];
          // Fetch user data separately
          if (log.userId) {
            const user = await this.prisma.user.findUnique({
              where: { id: log.userId },
              select: { email: true, SDT: true }
            });
            log.user = user;
          }
          return log;
        }
        return null;
      }

      // Get total count
      const countResult: any = await this.prisma.$queryRawUnsafe(
        `SELECT COUNT(*)::int as count FROM "AuditLog" ${whereClause}`,
        ...sqlParams
      );
      const total = countResult[0]?.count || 0;

      // Get paginated data
      sqlParams.push(pageSize);
      sqlParams.push(skip);
      
      const logs: any = await this.prisma.$queryRawUnsafe(
        `SELECT * FROM "AuditLog" ${whereClause} ORDER BY "createdAt" DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`,
        ...sqlParams
      );

      // Fetch user data for all logs
      const logsWithUsers = await Promise.all(logs.map(async (log: any) => {
        if (log.userId) {
          const user = await this.prisma.user.findUnique({
            where: { id: log.userId },
            select: { email: true, SDT: true }
          });
          return { ...log, user };
        }
        return log;
      }));

      return {
        data: logsWithUsers,
        page,
        pageSize,
        total,
        pageCount: Math.ceil(total / pageSize),
      };
    }

    // No JSON search - use normal Prisma query
    if (isOne) {
      const result = await this.prisma.auditLog.findFirst({
        where: baseWhere,
        include: {
          user: { select: { email: true, SDT: true } },
        },
      });
      return result;
    }

    const [logs, total] = await Promise.all([
      this.prisma.auditLog.findMany({
        where: baseWhere,
        include: {
          user: { select: { email: true, SDT: true } },
        },
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.auditLog.count({ where: baseWhere }),
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