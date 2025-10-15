"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerformanceLogger = void 0;
const perf_hooks_1 = require("perf_hooks");
const common_1 = require("@nestjs/common");
class PerformanceLogger {
    static setPerformanceLogService(service) {
        this.performanceLogService = service;
    }
    static async logAsync(name, fn, context) {
        const start = perf_hooks_1.performance.now();
        const timestamp = Date.now();
        try {
            const result = await fn();
            const duration = perf_hooks_1.performance.now() - start;
            const metric = {
                name,
                duration,
                timestamp,
                context,
                success: true
            };
            this.recordMetric(metric);
            this.logPerformance(name, duration, context, true);
            return result;
        }
        catch (error) {
            const duration = perf_hooks_1.performance.now() - start;
            const metric = {
                name,
                duration,
                timestamp,
                context,
                success: false,
                error: error.message
            };
            this.recordMetric(metric);
            this.logPerformance(name, duration, context, false, error.message);
            throw error;
        }
    }
    static logSync(name, fn, context) {
        const start = perf_hooks_1.performance.now();
        const timestamp = Date.now();
        try {
            const result = fn();
            const duration = perf_hooks_1.performance.now() - start;
            const metric = {
                name,
                duration,
                timestamp,
                context,
                success: true
            };
            this.recordMetric(metric);
            this.logPerformance(name, duration, context, true);
            return result;
        }
        catch (error) {
            const duration = perf_hooks_1.performance.now() - start;
            const metric = {
                name,
                duration,
                timestamp,
                context,
                success: false,
                error: error.message
            };
            this.recordMetric(metric);
            this.logPerformance(name, duration, context, false, error.message);
            throw error;
        }
    }
    static logDuration(name, duration, context) {
        const timestamp = Date.now();
        const metric = {
            name,
            duration,
            timestamp,
            context,
            success: true
        };
        this.recordMetric(metric);
        this.logPerformance(name, duration, context, true);
    }
    static recordMetric(metric) {
        this.metrics.push(metric);
        if (this.metrics.length > this.MAX_METRICS) {
            this.metrics.shift();
        }
        if (this.performanceLogService) {
            this.performanceLogService.saveMetric(metric).catch((error) => {
                this.logger.error(`Failed to save metric to database: ${error.message}`);
            });
        }
    }
    static logPerformance(name, duration, context, success = true, error) {
        const contextStr = context ? ` | Context: ${JSON.stringify(context)}` : '';
        const statusEmoji = success ? '✅' : '❌';
        if (duration > 1000) {
            this.logger.warn(`${statusEmoji} [SLOW] ${name} | Duration: ${duration.toFixed(2)}ms${contextStr}${error ? ` | Error: ${error}` : ''}`);
        }
        else if (duration > 500) {
            this.logger.log(`${statusEmoji} [MEDIUM] ${name} | Duration: ${duration.toFixed(2)}ms${contextStr}${error ? ` | Error: ${error}` : ''}`);
        }
        else {
            this.logger.debug(`${statusEmoji} [FAST] ${name} | Duration: ${duration.toFixed(2)}ms${contextStr}${error ? ` | Error: ${error}` : ''}`);
        }
    }
    static getStatistics() {
        const now = Date.now();
        const last5Minutes = this.metrics.filter(m => now - m.timestamp < 5 * 60 * 1000);
        const last1Hour = this.metrics.filter(m => now - m.timestamp < 60 * 60 * 1000);
        return {
            total: this.metrics.length,
            last5Minutes: {
                count: last5Minutes.length,
                avgDuration: last5Minutes.length > 0
                    ? last5Minutes.reduce((sum, m) => sum + m.duration, 0) / last5Minutes.length
                    : 0,
                successRate: last5Minutes.length > 0
                    ? (last5Minutes.filter(m => m.success).length / last5Minutes.length) * 100
                    : 100
            },
            last1Hour: {
                count: last1Hour.length,
                avgDuration: last1Hour.length > 0
                    ? last1Hour.reduce((sum, m) => sum + m.duration, 0) / last1Hour.length
                    : 0,
                successRate: last1Hour.length > 0
                    ? (last1Hour.filter(m => m.success).length / last1Hour.length) * 100
                    : 100
            },
            slowest: [...this.metrics]
                .sort((a, b) => b.duration - a.duration)
                .slice(0, 10)
                .map(m => ({ name: m.name, duration: m.duration, timestamp: m.timestamp })),
            errorRate: this.metrics.length > 0
                ? (this.metrics.filter(m => !m.success).length / this.metrics.length) * 100
                : 0
        };
    }
    static clearMetrics() {
        this.metrics = [];
        this.logger.log('🧹 Performance metrics cleared');
    }
}
exports.PerformanceLogger = PerformanceLogger;
PerformanceLogger.logger = new common_1.Logger('PerformanceLogger');
PerformanceLogger.metrics = [];
PerformanceLogger.MAX_METRICS = 1000;
//# sourceMappingURL=performance-logger.js.map