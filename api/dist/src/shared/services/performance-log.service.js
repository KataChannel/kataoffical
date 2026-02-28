"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerformanceLogService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let PerformanceLogService = class PerformanceLogService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger('PerformanceLogService');
    }
    async saveMetric(metric) {
        try {
            await this.prisma.performanceLog.create({
                data: {
                    name: metric.name,
                    duration: metric.duration,
                    timestamp: new Date(metric.timestamp),
                    context: metric.context,
                    success: metric.success,
                    error: metric.error,
                    method: metric.method,
                    url: metric.url,
                    statusCode: metric.statusCode,
                    memoryUsage: metric.memoryUsage,
                },
            });
        }
        catch (error) {
            this.logger.error(`Failed to save performance metric: ${error.message}`);
        }
    }
    async saveMetrics(metrics) {
        try {
            await this.prisma.performanceLog.createMany({
                data: metrics.map(metric => ({
                    name: metric.name,
                    duration: metric.duration,
                    timestamp: new Date(metric.timestamp),
                    context: metric.context,
                    success: metric.success,
                    error: metric.error,
                    method: metric.method,
                    url: metric.url,
                    statusCode: metric.statusCode,
                    memoryUsage: metric.memoryUsage,
                })),
            });
        }
        catch (error) {
            this.logger.error(`Failed to save performance metrics: ${error.message}`);
        }
    }
    async getLogs(options = {}) {
        const where = {};
        if (options.startDate || options.endDate) {
            where.timestamp = {};
            if (options.startDate)
                where.timestamp.gte = options.startDate;
            if (options.endDate)
                where.timestamp.lte = options.endDate;
        }
        if (options.operation) {
            where.name = { contains: options.operation };
        }
        if (options.success !== undefined) {
            where.success = options.success;
        }
        if (options.minDuration || options.maxDuration) {
            where.duration = {};
            if (options.minDuration)
                where.duration.gte = options.minDuration;
            if (options.maxDuration)
                where.duration.lte = options.maxDuration;
        }
        return await this.prisma.performanceLog.findMany({
            where,
            orderBy: { timestamp: 'desc' },
            take: options.limit || 100,
            skip: options.offset || 0,
        });
    }
    async getStatistics(hours = 24) {
        const startTime = new Date(Date.now() - hours * 60 * 60 * 1000);
        const [totalCount, successCount, avgDuration, slowestOperations, errorLogs, operationBreakdown] = await Promise.all([
            this.prisma.performanceLog.count({
                where: { timestamp: { gte: startTime } }
            }),
            this.prisma.performanceLog.count({
                where: {
                    timestamp: { gte: startTime },
                    success: true
                }
            }),
            this.prisma.performanceLog.aggregate({
                where: { timestamp: { gte: startTime } },
                _avg: { duration: true },
                _max: { duration: true },
                _min: { duration: true }
            }),
            this.prisma.performanceLog.findMany({
                where: { timestamp: { gte: startTime } },
                orderBy: { duration: 'desc' },
                take: 10,
                select: {
                    name: true,
                    duration: true,
                    timestamp: true,
                    url: true,
                    error: true
                }
            }),
            this.prisma.performanceLog.findMany({
                where: {
                    timestamp: { gte: startTime },
                    success: false
                },
                orderBy: { timestamp: 'desc' },
                take: 20
            }),
            this.prisma.performanceLog.groupBy({
                by: ['name'],
                where: { timestamp: { gte: startTime } },
                _count: { name: true },
                _avg: { duration: true },
                _max: { duration: true },
                _min: { duration: true },
                orderBy: { _avg: { duration: 'desc' } }
            })
        ]);
        return {
            timeRange: `Last ${hours} hours`,
            overview: {
                totalOperations: totalCount,
                successfulOperations: successCount,
                failedOperations: totalCount - successCount,
                successRate: totalCount > 0 ? ((successCount / totalCount) * 100).toFixed(2) + '%' : '100%',
                avgDuration: avgDuration._avg?.duration?.toFixed(2) + 'ms' || '0ms',
                maxDuration: avgDuration._max?.duration?.toFixed(2) + 'ms' || '0ms',
                minDuration: avgDuration._min?.duration?.toFixed(2) + 'ms' || '0ms'
            },
            slowestOperations: slowestOperations.map(op => ({
                name: op.name,
                duration: op.duration.toFixed(2) + 'ms',
                timestamp: op.timestamp.toISOString(),
                url: op.url,
                error: op.error
            })),
            recentErrors: errorLogs.map(log => ({
                name: log.name,
                error: log.error,
                duration: log.duration.toFixed(2) + 'ms',
                timestamp: log.timestamp.toISOString(),
                url: log.url
            })),
            operationBreakdown: operationBreakdown.map(op => ({
                operation: op.name,
                count: op._count.name,
                avgDuration: op._avg.duration?.toFixed(2) + 'ms' || '0ms',
                maxDuration: op._max.duration?.toFixed(2) + 'ms' || '0ms',
                minDuration: op._min.duration?.toFixed(2) + 'ms' || '0ms'
            }))
        };
    }
    async cleanupOldLogs(daysToKeep = 30) {
        const cutoffDate = new Date(Date.now() - daysToKeep * 24 * 60 * 60 * 1000);
        const result = await this.prisma.performanceLog.deleteMany({
            where: {
                timestamp: { lt: cutoffDate }
            }
        });
        this.logger.log(`Cleaned up ${result.count} old performance logs`);
        return result.count;
    }
    async getTrends(hours = 24) {
        const startTime = new Date(Date.now() - hours * 60 * 60 * 1000);
        const trends = await this.prisma.$queryRaw `
      SELECT 
        DATE_TRUNC('hour', timestamp) as hour,
        COUNT(*) as total_operations,
        AVG(duration) as avg_duration,
        MAX(duration) as max_duration,
        COUNT(CASE WHEN success = false THEN 1 END) as error_count
      FROM performance_logs 
      WHERE timestamp >= ${startTime}
      GROUP BY DATE_TRUNC('hour', timestamp)
      ORDER BY hour DESC
    `;
        return trends.map(trend => ({
            hour: trend.hour,
            totalOperations: parseInt(trend.total_operations),
            avgDuration: parseFloat(trend.avg_duration).toFixed(2) + 'ms',
            maxDuration: parseFloat(trend.max_duration).toFixed(2) + 'ms',
            errorCount: parseInt(trend.error_count),
            errorRate: (parseInt(trend.error_count) / parseInt(trend.total_operations) * 100).toFixed(2) + '%'
        }));
    }
};
exports.PerformanceLogService = PerformanceLogService;
exports.PerformanceLogService = PerformanceLogService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PerformanceLogService);
//# sourceMappingURL=performance-log.service.js.map