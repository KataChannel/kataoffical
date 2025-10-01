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
exports.GraphQLPerformanceService = void 0;
const common_1 = require("@nestjs/common");
let GraphQLPerformanceService = class GraphQLPerformanceService {
    constructor() {
        this.metrics = new Map();
        this.queryCache = new Map();
        console.log('🚀 GraphQL Performance Service initialized');
        setInterval(() => {
            this.cleanupOldMetrics();
        }, 60 * 60 * 1000);
    }
    startOperation(operationName, modelName, context = {}) {
        const operationId = `${operationName}_${modelName}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        this.metrics.set(operationId, {
            operationName,
            modelName,
            startTime: Date.now(),
            context,
            status: 'running'
        });
        return operationId;
    }
    endOperation(operationId, result) {
        const metric = this.metrics.get(operationId);
        if (!metric)
            return;
        const endTime = Date.now();
        const duration = endTime - metric.startTime;
        const finalMetric = {
            ...metric,
            endTime,
            duration,
            status: result.success ? 'completed' : 'failed',
            recordCount: result.recordCount || 0,
            error: result.error,
            queryOptimized: result.queryOptimized || false,
            cacheHit: result.cacheHit || false,
        };
        this.metrics.set(operationId, finalMetric);
        this.logPerformanceInfo(finalMetric);
        this.updateAggregatedStats(finalMetric);
    }
    getPerformanceStats(modelName) {
        const stats = {
            totalOperations: 0,
            averageDuration: 0,
            successRate: 0,
            optimizedQueryRate: 0,
            cacheHitRate: 0,
            operationsByModel: new Map(),
            slowestQueries: [],
            fastestQueries: [],
            recentErrors: []
        };
        const relevantMetrics = Array.from(this.metrics.values()).filter(metric => !modelName || metric.modelName === modelName);
        if (relevantMetrics.length === 0)
            return stats;
        stats.totalOperations = relevantMetrics.length;
        const completedOperations = relevantMetrics.filter(m => m.status === 'completed');
        const successfulOperations = completedOperations.filter(m => !m.error);
        if (completedOperations.length > 0) {
            stats.averageDuration = completedOperations.reduce((sum, m) => sum + m.duration, 0) / completedOperations.length;
            stats.successRate = (successfulOperations.length / completedOperations.length) * 100;
            stats.optimizedQueryRate = (completedOperations.filter(m => m.queryOptimized).length / completedOperations.length) * 100;
            stats.cacheHitRate = (completedOperations.filter(m => m.cacheHit).length / completedOperations.length) * 100;
        }
        relevantMetrics.forEach(metric => {
            const modelStats = stats.operationsByModel.get(metric.modelName) || {
                count: 0,
                averageDuration: 0,
                successRate: 0
            };
            modelStats.count++;
            stats.operationsByModel.set(metric.modelName, modelStats);
        });
        const sortedByDuration = completedOperations.sort((a, b) => b.duration - a.duration);
        stats.slowestQueries = sortedByDuration.slice(0, 5).map(this.formatMetricForDisplay);
        stats.fastestQueries = sortedByDuration.slice(-5).reverse().map(this.formatMetricForDisplay);
        stats.recentErrors = relevantMetrics
            .filter(m => m.error)
            .sort((a, b) => b.startTime - a.startTime)
            .slice(0, 10)
            .map(this.formatMetricForDisplay);
        return stats;
    }
    cacheQueryResult(queryKey, result, ttl = 300000) {
        const cacheEntry = {
            result,
            timestamp: Date.now(),
            ttl,
            hits: 0
        };
        this.queryCache.set(queryKey, cacheEntry);
        this.cleanupExpiredCache();
    }
    getCachedQueryResult(queryKey) {
        const cacheEntry = this.queryCache.get(queryKey);
        if (!cacheEntry)
            return null;
        if (Date.now() - cacheEntry.timestamp > cacheEntry.ttl) {
            this.queryCache.delete(queryKey);
            return null;
        }
        cacheEntry.hits++;
        return cacheEntry.result;
    }
    generateQueryKey(modelName, operation, args) {
        const argsHash = this.hashObject(args);
        return `${modelName}:${operation}:${argsHash}`;
    }
    getCacheStats() {
        const totalEntries = this.queryCache.size;
        const totalHits = Array.from(this.queryCache.values()).reduce((sum, entry) => sum + entry.hits, 0);
        return {
            totalEntries,
            totalHits,
            memoryUsage: this.estimateCacheMemoryUsage(),
            topCachedQueries: this.getTopCachedQueries()
        };
    }
    clearAll() {
        this.metrics.clear();
        this.queryCache.clear();
        console.log('🗑️ All GraphQL performance data cleared');
    }
    exportPerformanceData() {
        return {
            metrics: Array.from(this.metrics.entries()),
            cacheStats: this.getCacheStats(),
            performanceStats: this.getPerformanceStats(),
            exportedAt: new Date().toISOString()
        };
    }
    logPerformanceInfo(metric) {
        const { operationName, modelName, duration, recordCount, queryOptimized, cacheHit, error } = metric;
        const logMessage = `📊 ${operationName}(${modelName}): ${duration}ms`;
        const details = [
            recordCount ? `${recordCount} records` : '',
            queryOptimized ? '🚀 optimized' : '',
            cacheHit ? '💾 cache hit' : '',
            error ? `❌ error: ${error}` : '✅ success'
        ].filter(Boolean).join(', ');
        if (error) {
            console.error(`${logMessage} - ${details}`);
        }
        else if (duration > 1000) {
            console.warn(`${logMessage} - ${details} (SLOW QUERY)`);
        }
        else {
            console.log(`${logMessage} - ${details}`);
        }
    }
    updateAggregatedStats(metric) {
    }
    formatMetricForDisplay(metric) {
        return {
            operation: `${metric.operationName}(${metric.modelName})`,
            duration: `${metric.duration}ms`,
            recordCount: metric.recordCount,
            optimized: metric.queryOptimized,
            cacheHit: metric.cacheHit,
            timestamp: new Date(metric.startTime).toISOString()
        };
    }
    hashObject(obj) {
        const str = JSON.stringify(obj, Object.keys(obj).sort());
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash.toString();
    }
    cleanupOldMetrics() {
        const cutoffTime = Date.now() - (24 * 60 * 60 * 1000);
        for (const [id, metric] of this.metrics) {
            if (metric.startTime < cutoffTime) {
                this.metrics.delete(id);
            }
        }
        console.log(`🧹 Cleaned up old performance metrics. Current count: ${this.metrics.size}`);
    }
    cleanupExpiredCache() {
        const now = Date.now();
        for (const [key, entry] of this.queryCache) {
            if (now - entry.timestamp > entry.ttl) {
                this.queryCache.delete(key);
            }
        }
    }
    estimateCacheMemoryUsage() {
        const totalSize = Array.from(this.queryCache.values()).reduce((size, entry) => {
            return size + JSON.stringify(entry.result).length;
        }, 0);
        if (totalSize < 1024)
            return `${totalSize} bytes`;
        if (totalSize < 1024 * 1024)
            return `${(totalSize / 1024).toFixed(3)} KB`;
        return `${(totalSize / (1024 * 1024)).toFixed(3)} MB`;
    }
    getTopCachedQueries() {
        return Array.from(this.queryCache.entries())
            .map(([key, entry]) => ({
            query: key,
            hits: entry.hits,
            age: Date.now() - entry.timestamp
        }))
            .sort((a, b) => b.hits - a.hits)
            .slice(0, 10);
    }
};
exports.GraphQLPerformanceService = GraphQLPerformanceService;
exports.GraphQLPerformanceService = GraphQLPerformanceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], GraphQLPerformanceService);
//# sourceMappingURL=performance.service.js.map