import { Injectable, Logger } from '@nestjs/common';
import { CronJobStatus, Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

export interface CreateCronLogDto {
  jobId: string;
  jobName: string;
  category?: string;
  triggeredBy?: string;
}

export interface UpdateCronLogDto {
  status?: CronJobStatus;
  message?: string;
  error?: string;
  details?: any;
  executionTime?: number;
  endTime?: Date;
}

export interface CronLogFilter {
  jobId?: string;
  status?: CronJobStatus;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
}

@Injectable()
export class CronLogService {
  private readonly logger = new Logger(CronLogService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Tạo log entry mới khi bắt đầu chạy cron job
   */
  async createLog(data: CreateCronLogDto): Promise<string> {
    try {
      const log = await this.prisma.cronExecutionLog.create({
        data: {
          jobId: data.jobId,
          jobName: data.jobName,
          category: data.category,
          triggeredBy: data.triggeredBy || 'system',
          status: 'running',
        },
      });
      this.logger.log(`📝 Created cron log: ${log.id} for job ${data.jobId}`);
      return log.id;
    } catch (error) {
      this.logger.error(`Error creating cron log: ${error.message}`);
      throw error;
    }
  }

  /**
   * Cập nhật log entry khi job hoàn thành
   */
  async updateLog(logId: string, data: UpdateCronLogDto): Promise<void> {
    try {
      await this.prisma.cronExecutionLog.update({
        where: { id: logId },
        data: {
          status: data.status,
          message: data.message,
          error: data.error,
          details: data.details ? data.details : undefined,
          executionTime: data.executionTime,
          endTime: data.endTime || new Date(),
        },
      });
      this.logger.log(`📝 Updated cron log: ${logId} - status: ${data.status}`);
    } catch (error) {
      this.logger.error(`Error updating cron log: ${error.message}`);
    }
  }

  /**
   * Lấy danh sách logs với filter
   */
  async getLogs(filter: CronLogFilter = {}) {
    const where: Prisma.CronExecutionLogWhereInput = {};

    if (filter.jobId) {
      where.jobId = filter.jobId;
    }

    if (filter.status) {
      where.status = filter.status;
    }

    if (filter.startDate || filter.endDate) {
      where.startTime = {};
      if (filter.startDate) {
        where.startTime.gte = filter.startDate;
      }
      if (filter.endDate) {
        where.startTime.lte = filter.endDate;
      }
    }

    const [logs, total] = await Promise.all([
      this.prisma.cronExecutionLog.findMany({
        where,
        orderBy: { startTime: 'desc' },
        take: filter.limit || 50,
        skip: filter.offset || 0,
      }),
      this.prisma.cronExecutionLog.count({ where }),
    ]);

    return { logs, total };
  }

  /**
   * Lấy log theo ID
   */
  async getLogById(id: string) {
    return this.prisma.cronExecutionLog.findUnique({
      where: { id },
    });
  }

  /**
   * Lấy thống kê tổng quan
   */
  async getStats() {
    const now = new Date();
    const last24h = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const last7d = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const [total, running, success24h, failed24h, successRate7d] = await Promise.all([
      this.prisma.cronExecutionLog.count(),
      this.prisma.cronExecutionLog.count({ where: { status: 'running' } }),
      this.prisma.cronExecutionLog.count({
        where: { status: 'success', startTime: { gte: last24h } },
      }),
      this.prisma.cronExecutionLog.count({
        where: { status: 'failed', startTime: { gte: last24h } },
      }),
      this.prisma.cronExecutionLog.groupBy({
        by: ['status'],
        where: { startTime: { gte: last7d } },
        _count: true,
      }),
    ]);

    // Calculate success rate
    const total7d = successRate7d.reduce((sum, s) => sum + s._count, 0);
    const success7d = successRate7d.find(s => s.status === 'success')?._count || 0;
    const rate = total7d > 0 ? Math.round((success7d / total7d) * 100) : 100;

    return {
      total,
      running,
      success24h,
      failed24h,
      successRate7d: rate,
    };
  }

  /**
   * Xóa logs cũ (giữ lại 30 ngày)
   */
  async cleanupOldLogs(daysToKeep: number = 30): Promise<number> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

    const result = await this.prisma.cronExecutionLog.deleteMany({
      where: {
        createdAt: { lt: cutoffDate },
      },
    });

    this.logger.log(`🗑️ Cleaned up ${result.count} old cron logs`);
    return result.count;
  }

  /**
   * Xóa tất cả logs
   */
  async clearAllLogs(): Promise<number> {
    const result = await this.prisma.cronExecutionLog.deleteMany({});
    this.logger.log(`🗑️ Cleared all ${result.count} cron logs`);
    return result.count;
  }
}
