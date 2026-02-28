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
var ServerStabilityService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerStabilityService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let ServerStabilityService = ServerStabilityService_1 = class ServerStabilityService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(ServerStabilityService_1.name);
        this.circuitBreakers = new Map();
        this.activeRequests = new Map();
        this.initializeHealthChecks();
    }
    initializeHealthChecks() {
        setInterval(async () => {
            await this.checkDatabaseHealth();
        }, 30000);
        setInterval(() => {
            this.checkMemoryUsage();
        }, 60000);
        setInterval(() => {
            this.checkRequestTimeouts();
        }, 10000);
        setInterval(() => {
            this.updateCircuitBreakerStates();
        }, 300000);
    }
    async safeTransaction(operation, options = {}) {
        const { timeout = 15000, maxWait = 20000, circuitBreakerKey, retryCount = 0 } = options;
        if (circuitBreakerKey && !this.isCircuitBreakerClosed(circuitBreakerKey)) {
            throw new Error(`Circuit breaker OPEN for ${circuitBreakerKey}`);
        }
        const operationId = `tx_${Date.now()}_${Math.random().toString(36)}`;
        try {
            this.activeRequests.set(operationId, {
                startTime: Date.now(),
                route: circuitBreakerKey || 'database_transaction',
                timeout: timeout
            });
            const result = await this.prisma.$transaction(operation, {
                timeout,
                maxWait
            });
            if (circuitBreakerKey) {
                this.recordCircuitBreakerSuccess(circuitBreakerKey);
            }
            return result;
        }
        catch (error) {
            this.logger.error(`Transaction failed: ${error.message}`, error.stack);
            if (circuitBreakerKey) {
                this.recordCircuitBreakerFailure(circuitBreakerKey);
            }
            if (retryCount < 2 && this.isRetryableError(error)) {
                this.logger.warn(`Retrying transaction, attempt ${retryCount + 1}`);
                await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1)));
                return this.safeTransaction(operation, { ...options, retryCount: retryCount + 1 });
            }
            throw error;
        }
        finally {
            this.activeRequests.delete(operationId);
        }
    }
    isRetryableError(error) {
        const retryableMessages = [
            'timeout',
            'connection',
            'ECONNRESET',
            'ENOTFOUND',
            'ETIMEDOUT'
        ];
        return retryableMessages.some(msg => error.message?.toLowerCase().includes(msg.toLowerCase()));
    }
    async checkDatabaseHealth() {
        try {
            const start = Date.now();
            await this.prisma.$queryRaw `SELECT 1`;
            const duration = Date.now() - start;
            if (duration > 5000) {
                this.logger.warn(`Database response slow: ${duration}ms`);
            }
            this.recordCircuitBreakerSuccess('database');
        }
        catch (error) {
            this.logger.error('Database health check failed', error);
            this.recordCircuitBreakerFailure('database');
        }
    }
    checkMemoryUsage() {
        const memUsage = process.memoryUsage();
        const heapUsedMB = Math.round(memUsage.heapUsed / 1024 / 1024);
        const heapTotalMB = Math.round(memUsage.heapTotal / 1024 / 1024);
        if (heapUsedMB > 512) {
            this.logger.warn(`High memory usage: ${heapUsedMB}MB / ${heapTotalMB}MB`);
        }
        if (heapUsedMB > 1024 && global.gc) {
            this.logger.warn('Forcing garbage collection due to high memory usage');
            global.gc();
        }
    }
    checkRequestTimeouts() {
        const now = Date.now();
        for (const [id, request] of this.activeRequests) {
            const duration = now - request.startTime;
            if (duration > request.timeout) {
                this.logger.error(`Request timeout detected: ${request.route} running for ${duration}ms`);
                this.recordCircuitBreakerFailure(request.route);
            }
        }
    }
    isCircuitBreakerClosed(key) {
        const breaker = this.circuitBreakers.get(key);
        if (!breaker)
            return true;
        const now = Date.now();
        switch (breaker.state) {
            case 'CLOSED':
                return true;
            case 'OPEN':
                if (now - breaker.lastFailureTime > breaker.timeout) {
                    breaker.state = 'HALF_OPEN';
                    return true;
                }
                return false;
            case 'HALF_OPEN':
                return true;
            default:
                return true;
        }
    }
    recordCircuitBreakerSuccess(key) {
        const breaker = this.circuitBreakers.get(key);
        if (breaker) {
            breaker.failureCount = 0;
            breaker.state = 'CLOSED';
        }
    }
    recordCircuitBreakerFailure(key) {
        let breaker = this.circuitBreakers.get(key);
        if (!breaker) {
            breaker = {
                failureCount: 0,
                lastFailureTime: 0,
                state: 'CLOSED',
                threshold: 5,
                timeout: 60000
            };
            this.circuitBreakers.set(key, breaker);
        }
        breaker.failureCount++;
        breaker.lastFailureTime = Date.now();
        if (breaker.failureCount >= breaker.threshold) {
            breaker.state = 'OPEN';
            this.logger.error(`Circuit breaker OPEN for ${key} after ${breaker.failureCount} failures`);
        }
    }
    updateCircuitBreakerStates() {
        const now = Date.now();
        for (const [key, breaker] of this.circuitBreakers) {
            if (breaker.state === 'OPEN' && now - breaker.lastFailureTime > breaker.timeout) {
                breaker.state = 'HALF_OPEN';
                this.logger.log(`Circuit breaker ${key} moved to HALF_OPEN state`);
            }
        }
    }
    async getHealthStatus() {
        const memUsage = process.memoryUsage();
        const uptime = process.uptime();
        let dbStatus = 'healthy';
        let dbResponseTime = 0;
        try {
            const start = Date.now();
            await this.prisma.$queryRaw `SELECT 1`;
            dbResponseTime = Date.now() - start;
        }
        catch (error) {
            dbStatus = 'unhealthy';
        }
        return {
            status: dbStatus === 'healthy' ? 'healthy' : 'unhealthy',
            timestamp: new Date().toISOString(),
            uptime: Math.floor(uptime),
            memory: {
                heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024),
                heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024),
                external: Math.round(memUsage.external / 1024 / 1024)
            },
            database: {
                status: dbStatus,
                responseTime: dbResponseTime
            },
            activeRequests: this.activeRequests.size,
            circuitBreakers: Array.from(this.circuitBreakers.entries()).map(([key, breaker]) => ({
                key,
                state: breaker.state,
                failureCount: breaker.failureCount
            }))
        };
    }
};
exports.ServerStabilityService = ServerStabilityService;
exports.ServerStabilityService = ServerStabilityService = ServerStabilityService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ServerStabilityService);
//# sourceMappingURL=server-stability.service.js.map