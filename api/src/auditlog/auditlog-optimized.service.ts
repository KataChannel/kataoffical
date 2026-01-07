// ======================================================================
// Optimized Audit Log Service - Zero-Cost Solution
// ======================================================================
// Changes:
// 1. Sampling: Only log 10% of non-critical actions
// 2. Minimal diff: Store only changed values, not full oldValues/newValues
// 3. Compressed user agent: Reduce UA string size
// 4. Critical entity detection: Always log important entities
// ======================================================================

import { Injectable, Logger } from '@nestjs/common';
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
export class AuditServiceOptimized {
  private readonly logger = new Logger(AuditServiceOptimized.name);
  private auditQueue: Array<any> = [];
  private isProcessing = false;
  private batchSize = 10;
  private batchTimeout = 5000; // 5 seconds

  // Critical entities that should always be logged
  private readonly criticalEntities = [
    'Donhang',
    'Khachhang',
    'User',
    'Banggia',
    'BanggiaSanpham',
    'Nhacungcap',
    'Dathang',
  ];

  // Critical actions that should always be logged
  private readonly criticalActions: AuditAction[] = ['DELETE'];

  constructor(private readonly prisma: PrismaService) {
    // Start batch processing
    this.processBatchPeriodically();

    // Log configuration on startup
    this.logger.log('Audit Service Optimized initialized');
    this.logger.log(`Critical entities: ${this.criticalEntities.join(', ')}`);
    this.logger.log(`Sampling: 90% non-critical actions skipped`);
  }

  async logActivity(data: AuditLogData): Promise<void> {
    try {
      // Strategy 1: Determine if this is a critical action
      const isCritical = this.isCriticalChange(data);

      // Strategy 2: Sampling - Skip 90% of non-critical logs
      if (!isCritical && Math.random() > 0.1) {
        // Silently skip non-critical logs
        return;
      }

      // Log critical vs non-critical (for monitoring)
      if (isCritical) {
        this.logger.debug(
          `[CRITICAL] Logging ${data.action} on ${data.entityName}`,
        );
      }

      // Strategy 3: Store minimal diff instead of full data
      const changedFields =
        data.changedFields ||
        this.getChangedFields(data.oldValues, data.newValues);
      const changeSummary = this.createMinimalDiff(
        data.oldValues,
        data.newValues,
      );

      // Strategy 4: Compress user agent
      const compressedUserAgent = this.compressUserAgent(data.userAgent);

      // Add to queue for batch processing
      this.auditQueue.push({
        entityName: data.entityName,
        entityId: data.entityId,
        action: data.action,
        userId: data.userId,
        userEmail: data.userEmail,
        changedFields: changedFields || [],
        // Don't store oldValues/newValues - save ~80% space
        metadata: {
          changeSummary: changeSummary,
          compressed: true,
          isCritical: isCritical,
          ...data.metadata,
        },
        ipAddress: data.ipAddress,
        userAgent: compressedUserAgent, // Compressed UA
        sessionId: data.sessionId,
        status: data.status || 'SUCCESS',
        errorDetails: data.errorDetails || null,
      });

      // Trigger immediate processing if queue is full
      if (this.auditQueue.length >= this.batchSize) {
        await this.processBatch();
      }
    } catch (error) {
      this.logger.error(
        `Failed to queue audit log: ${error.message}`,
        error.stack,
      );
      // Don't throw - don't break business logic
    }
  }

  /**
   * Determine if this change is critical and should always be logged
   */
  private isCriticalChange(data: AuditLogData): boolean {
    // Always log critical entities
    if (this.criticalEntities.includes(data.entityName)) {
      return true;
    }

    // Always log critical actions (DELETE, etc.)
    if (this.criticalActions.includes(data.action)) {
      return true;
    }

    // Always log if there was an error
    if (data.status === 'ERROR' || data.errorDetails) {
      return true;
    }

    return false;
  }

  /**
   * Create minimal diff - only store what changed, not full objects
   */
  private createMinimalDiff(oldVal: any, newVal: any): string {
    if (!oldVal || !newVal) {
      return JSON.stringify(newVal || oldVal || {});
    }

    const changes: any = {};

    // Only store changed values
    for (const key in newVal) {
      if (oldVal[key] !== newVal[key]) {
        // Store only new value, not both old and new
        // If you need old value for critical fields, add here
        changes[key] = newVal[key];

        // For critical numeric fields, store delta
        if (
          typeof newVal[key] === 'number' &&
          typeof oldVal[key] === 'number'
        ) {
          changes[`${key}_delta`] = newVal[key] - oldVal[key];
        }
      }
    }

    // Compress JSON
    return JSON.stringify(changes);
  }

  /**
   * Compress user agent string to save space
   * "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36..."
   * → "Win/Chrome"
   */
  private compressUserAgent(ua: string | null): string | null {
    if (!ua) return null;

    try {
      // Detect OS
      let os = 'Other';
      if (ua.includes('Windows')) os = 'Win';
      else if (ua.includes('Mac')) os = 'Mac';
      else if (ua.includes('Linux')) os = 'Linux';
      else if (ua.includes('Android')) os = 'Android';
      else if (ua.includes('iOS') || ua.includes('iPhone')) os = 'iOS';

      // Detect Browser
      let browser = 'Other';
      if (ua.includes('Chrome') && !ua.includes('Edg')) browser = 'Chrome';
      else if (ua.includes('Firefox')) browser = 'Firefox';
      else if (ua.includes('Safari') && !ua.includes('Chrome'))
        browser = 'Safari';
      else if (ua.includes('Edg')) browser = 'Edge';

      return `${os}/${browser}`;
    } catch (error) {
      return 'Unknown';
    }
  }

  /**
   * Get changed fields from old and new values
   */
  private getChangedFields(oldValues: any, newValues: any): string[] {
    if (!oldValues || !newValues) return [];

    const changed: string[] = [];

    for (const key in newValues) {
      if (oldValues[key] !== newValues[key]) {
        changed.push(key);
      }
    }

    return changed;
  }

  /**
   * Process batch of audit logs
   */
  private async processBatch(): Promise<void> {
    if (this.isProcessing || this.auditQueue.length === 0) {
      return;
    }

    this.isProcessing = true;
    const batch = this.auditQueue.splice(0, this.batchSize);

    try {
      await this.prisma.auditLog.createMany({
        data: batch,
        skipDuplicates: true,
      });

      this.logger.debug(`Processed ${batch.length} audit logs`);
    } catch (error) {
      this.logger.error(
        `Failed to create audit log batch: ${error.message}`,
        error.stack,
      );
      // Could implement retry logic here
    } finally {
      this.isProcessing = false;
    }
  }

  /**
   * Periodic batch processing
   */
  private processBatchPeriodically(): void {
    setInterval(() => {
      this.processBatch();
    }, this.batchTimeout);
  }

  /**
   * Get audit logs with optimized queries
   */
  async getAuditLogs(param: any) {
    const { page = 1, pageSize = 50, isOne, ...where } = param;
    const skip = (page - 1) * pageSize;

    // Build where clause
    const baseWhere: any = {};

    if (where.id) baseWhere.id = where.id;
    if (where.entityName) {
      baseWhere.entityName = {
        contains: where.entityName,
        mode: 'insensitive',
      };
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

    // Date range filtering
    const dateFrom = where.createdAtFrom || where.startDate;
    const dateTo = where.createdAtTo || where.endDate;

    if (dateFrom || dateTo) {
      baseWhere.createdAt = {};
      if (dateFrom) {
        const fromDate = new Date(dateFrom);
        fromDate.setHours(0, 0, 0, 0);
        baseWhere.createdAt.gte = fromDate;
      }
      if (dateTo) {
        const toDate = new Date(dateTo);
        toDate.setHours(23, 59, 59, 999);
        baseWhere.createdAt.lte = toDate;
      }
    }

    if (isOne) {
      return this.prisma.auditLog.findFirst({ where: baseWhere });
    }

    const [data, total] = await Promise.all([
      this.prisma.auditLog.findMany({
        where: baseWhere,
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.auditLog.count({ where: baseWhere }),
    ]);

    return {
      data,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  /**
   * Get statistics about logging
   */
  async getStatistics(days: number = 7) {
    const since = new Date();
    since.setDate(since.getDate() - days);

    const [total, critical, byCriticalEntity, byAction] = await Promise.all([
      // Total logs
      this.prisma.auditLog.count({
        where: { createdAt: { gte: since } },
      }),

      // Critical logs
      this.prisma.auditLog.count({
        where: {
          createdAt: { gte: since },
          metadata: {
            path: ['isCritical'],
            equals: true,
          },
        },
      }),

      // By entity
      this.prisma.$queryRaw`
        SELECT "entityName", COUNT(*) as count
        FROM "AuditLog"
        WHERE "createdAt" >= ${since}
        GROUP BY "entityName"
        ORDER BY count DESC
        LIMIT 10
      `,

      // By action
      this.prisma.$queryRaw`
        SELECT action, COUNT(*) as count
        FROM "AuditLog"
        WHERE "createdAt" >= ${since}
        GROUP BY action
        ORDER BY count DESC
      `,
    ]);

    return {
      total,
      critical,
      samplingRate:
        total > 0 ? ((critical / total) * 100).toFixed(2) + '%' : '0%',
      byCriticalEntity,
      byAction,
      period: `Last ${days} days`,
    };
  }
}
