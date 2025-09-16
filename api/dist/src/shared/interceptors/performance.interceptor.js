"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerformanceInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const perf_hooks_1 = require("perf_hooks");
const performance_logger_1 = require("../performance-logger");
let PerformanceInterceptor = class PerformanceInterceptor {
    constructor() {
        this.logger = new common_1.Logger('PerformanceInterceptor');
    }
    intercept(context, next) {
        const start = perf_hooks_1.performance.now();
        const httpContext = context.switchToHttp();
        const request = httpContext?.getRequest();
        let method = 'UNKNOWN';
        let url = 'UNKNOWN';
        let ip = 'UNKNOWN';
        let headers = {};
        if (request) {
            ({ method = 'UNKNOWN', url = 'UNKNOWN', ip = 'UNKNOWN', headers = {} } = request);
        }
        const requestId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const requestInfo = {
            id: requestId,
            method,
            url,
            ip,
            userAgent: headers['user-agent'] || 'UNKNOWN',
            timestamp: new Date().toISOString(),
        };
        this.logger.debug(`🚀 [${requestId}] ${method} ${url} started`);
        return next.handle().pipe((0, operators_1.tap)({
            next: (data) => {
                const duration = perf_hooks_1.performance.now() - start;
                const httpContext = context.switchToHttp();
                const response = httpContext?.getResponse();
                const logData = {
                    ...requestInfo,
                    duration: parseFloat(duration.toFixed(2)),
                    statusCode: response?.statusCode || 200,
                    success: true,
                    responseSize: data ? JSON.stringify(data).length : 0,
                };
                this.logRequest(logData);
            },
            error: (error) => {
                const duration = perf_hooks_1.performance.now() - start;
                const logData = {
                    ...requestInfo,
                    duration: parseFloat(duration.toFixed(2)),
                    statusCode: error.status || 500,
                    success: false,
                    error: error.message,
                };
                this.logRequest(logData);
            },
        }));
    }
    logRequest(data) {
        const { id, method, url, duration, statusCode, success, error } = data;
        const emoji = success ? '✅' : '❌';
        const speedLevel = duration > 1000 ? 'SLOW' : duration > 500 ? 'MEDIUM' : 'FAST';
        const message = `${emoji} [${speedLevel}] ${method} ${url} | ${duration}ms | ${statusCode} | ${data.responseSize || 0}bytes${error ? ` | Error: ${error}` : ''}`;
        if (duration > 1000) {
            this.logger.warn(message);
        }
        else if (duration > 500) {
            this.logger.log(message);
        }
        else {
            this.logger.debug(message);
        }
        const operationName = `HTTP_${method}_${url}`;
        const memoryUsage = process.memoryUsage().heapUsed / 1024 / 1024;
        if (success) {
            performance_logger_1.PerformanceLogger.logDuration(operationName, duration, {
                method,
                url,
                statusCode,
                responseSize: data.responseSize || 0,
                memoryUsage,
                requestId: id
            });
        }
        else {
            const metric = {
                name: operationName,
                duration,
                timestamp: Date.now(),
                context: {
                    method,
                    url,
                    statusCode,
                    memoryUsage,
                    requestId: id
                },
                success: false,
                error,
                method,
                url,
                statusCode,
                memoryUsage
            };
            performance_logger_1.PerformanceLogger.recordMetric(metric);
        }
        this.saveToMetrics(data);
    }
    saveToMetrics(data) {
        if (data.duration > 2000) {
            this.logger.error(`🐌 Very slow request detected: ${data.method} ${data.url} took ${data.duration}ms`);
        }
    }
};
exports.PerformanceInterceptor = PerformanceInterceptor;
exports.PerformanceInterceptor = PerformanceInterceptor = __decorate([
    (0, common_1.Injectable)()
], PerformanceInterceptor);
//# sourceMappingURL=performance.interceptor.js.map