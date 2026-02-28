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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerformanceController = void 0;
const common_1 = require("@nestjs/common");
const performance_logger_1 = require("../performance-logger");
const performance_log_service_1 = require("../services/performance-log.service");
let PerformanceController = class PerformanceController {
    constructor(performanceLogService) {
        this.performanceLogService = performanceLogService;
    }
    getPerformanceStats() {
        return performance_logger_1.PerformanceLogger.getStatistics();
    }
    async getDatabaseStats(hours = 24) {
        return await this.performanceLogService.getStatistics(hours);
    }
    async getLogs(limit = 100, offset = 0, operation, success, minDuration, hours = 24) {
        const startDate = new Date(Date.now() - hours * 60 * 60 * 1000);
        return await this.performanceLogService.getLogs({
            startDate,
            operation,
            success: success ? success === 'true' : undefined,
            minDuration,
            limit,
            offset
        });
    }
    async getTrends(hours = 24) {
        return await this.performanceLogService.getTrends(hours);
    }
    async getPerformanceSummary(hours = 24) {
        const [memoryStats, dbStats, trends] = await Promise.all([
            performance_logger_1.PerformanceLogger.getStatistics(),
            this.performanceLogService.getStatistics(hours),
            this.performanceLogService.getTrends(hours)
        ]);
        return {
            realTime: {
                totalOperations: memoryStats.total,
                errorRate: `${memoryStats.errorRate.toFixed(2)}%`,
                recent: {
                    last5Minutes: {
                        count: memoryStats.last5Minutes.count,
                        averageResponseTime: `${memoryStats.last5Minutes.avgDuration.toFixed(2)}ms`,
                        successRate: `${memoryStats.last5Minutes.successRate.toFixed(2)}%`,
                    },
                    last1Hour: {
                        count: memoryStats.last1Hour.count,
                        averageResponseTime: `${memoryStats.last1Hour.avgDuration.toFixed(2)}ms`,
                        successRate: `${memoryStats.last1Hour.successRate.toFixed(2)}%`,
                    }
                },
                slowestOperations: memoryStats.slowest.map(metric => ({
                    operation: metric.name,
                    duration: `${metric.duration.toFixed(2)}ms`,
                    timestamp: new Date(metric.timestamp).toISOString(),
                }))
            },
            historical: dbStats,
            trends: trends
        };
    }
    async cleanupOldLogs(days = 30) {
        const deletedCount = await this.performanceLogService.cleanupOldLogs(days);
        return {
            message: `Cleaned up ${deletedCount} old performance logs older than ${days} days`
        };
    }
    clearMemoryMetrics() {
        performance_logger_1.PerformanceLogger.clearMetrics();
        return { message: 'Memory performance metrics cleared successfully' };
    }
};
exports.PerformanceController = PerformanceController;
__decorate([
    (0, common_1.Get)('stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "getPerformanceStats", null);
__decorate([
    (0, common_1.Get)('db-stats'),
    __param(0, (0, common_1.Query)('hours', new common_1.ParseIntPipe({ optional: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PerformanceController.prototype, "getDatabaseStats", null);
__decorate([
    (0, common_1.Get)('logs'),
    __param(0, (0, common_1.Query)('limit', new common_1.ParseIntPipe({ optional: true }))),
    __param(1, (0, common_1.Query)('offset', new common_1.ParseIntPipe({ optional: true }))),
    __param(2, (0, common_1.Query)('operation')),
    __param(3, (0, common_1.Query)('success')),
    __param(4, (0, common_1.Query)('minDuration', new common_1.ParseIntPipe({ optional: true }))),
    __param(5, (0, common_1.Query)('hours', new common_1.ParseIntPipe({ optional: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String, Number, Number]),
    __metadata("design:returntype", Promise)
], PerformanceController.prototype, "getLogs", null);
__decorate([
    (0, common_1.Get)('trends'),
    __param(0, (0, common_1.Query)('hours', new common_1.ParseIntPipe({ optional: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PerformanceController.prototype, "getTrends", null);
__decorate([
    (0, common_1.Get)('summary'),
    __param(0, (0, common_1.Query)('hours', new common_1.ParseIntPipe({ optional: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PerformanceController.prototype, "getPerformanceSummary", null);
__decorate([
    (0, common_1.Get)('cleanup'),
    __param(0, (0, common_1.Query)('days', new common_1.ParseIntPipe({ optional: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PerformanceController.prototype, "cleanupOldLogs", null);
__decorate([
    (0, common_1.Get)('clear'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "clearMemoryMetrics", null);
exports.PerformanceController = PerformanceController = __decorate([
    (0, common_1.Controller)('performance'),
    __metadata("design:paramtypes", [performance_log_service_1.PerformanceLogService])
], PerformanceController);
//# sourceMappingURL=performance.controller.js.map