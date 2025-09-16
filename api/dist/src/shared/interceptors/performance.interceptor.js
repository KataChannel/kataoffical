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
const graphql_1 = require("@nestjs/graphql");
let PerformanceInterceptor = class PerformanceInterceptor {
    constructor() {
        this.logger = new common_1.Logger('PerformanceInterceptor');
    }
    intercept(context, next) {
        const start = perf_hooks_1.performance.now();
        const contextType = context.getType();
        let requestInfo;
        if (contextType === 'graphql') {
            const gqlContext = graphql_1.GqlExecutionContext.create(context);
            const info = gqlContext.getInfo();
            const args = gqlContext.getArgs();
            const gqlRequest = gqlContext.getContext().req;
            const requestId = `gql-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
            requestInfo = {
                id: requestId,
                method: 'GRAPHQL',
                url: `/graphql/${info.fieldName}`,
                operation: info.operation.operation,
                fieldName: info.fieldName,
                parentType: info.parentType.name,
                ip: gqlRequest?.ip || 'UNKNOWN',
                userAgent: gqlRequest?.headers?.['user-agent'] || 'UNKNOWN',
                args: args,
                timestamp: new Date().toISOString(),
            };
            this.logger.debug(`🔮 [${requestId}] GraphQL ${info.operation.operation.toUpperCase()} ${info.fieldName} started`);
        }
        else {
            const httpContext = context.switchToHttp();
            const request = httpContext?.getRequest();
            let method = 'UNKNOWN';
            let url = 'UNKNOWN';
            let ip = 'UNKNOWN';
            let headers = {};
            if (request) {
                ({ method = 'UNKNOWN', url = 'UNKNOWN', ip = 'UNKNOWN', headers = {} } = request);
            }
            const requestId = `http-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
            requestInfo = {
                id: requestId,
                method,
                url,
                ip,
                userAgent: headers['user-agent'] || 'UNKNOWN',
                timestamp: new Date().toISOString(),
            };
            this.logger.debug(`🚀 [${requestId}] ${method} ${url} started`);
        }
        return next.handle().pipe((0, operators_1.tap)({
            next: (data) => {
                const duration = perf_hooks_1.performance.now() - start;
                let logData;
                if (contextType === 'graphql') {
                    logData = {
                        ...requestInfo,
                        duration: parseFloat(duration.toFixed(2)),
                        statusCode: 200,
                        success: true,
                        responseSize: data ? JSON.stringify(data).length : 0,
                        dataType: 'GraphQL Response',
                    };
                }
                else {
                    const httpContext = context.switchToHttp();
                    const response = httpContext?.getResponse();
                    logData = {
                        ...requestInfo,
                        duration: parseFloat(duration.toFixed(2)),
                        statusCode: response?.statusCode || 200,
                        success: true,
                        responseSize: data ? JSON.stringify(data).length : 0,
                    };
                }
                this.logRequest(logData);
            },
            error: (error) => {
                const duration = perf_hooks_1.performance.now() - start;
                let logData;
                if (contextType === 'graphql') {
                    logData = {
                        ...requestInfo,
                        duration: parseFloat(duration.toFixed(2)),
                        statusCode: 400,
                        success: false,
                        error: error.message,
                        errorCode: error.extensions?.code || 'GRAPHQL_ERROR',
                        dataType: 'GraphQL Error',
                    };
                }
                else {
                    logData = {
                        ...requestInfo,
                        duration: parseFloat(duration.toFixed(2)),
                        statusCode: error.status || 500,
                        success: false,
                        error: error.message,
                    };
                }
                this.logRequest(logData);
            },
        }));
    }
    logRequest(data) {
        const { id, method, url, duration, statusCode, success, error, fieldName, operation, dataType } = data;
        const emoji = success ? '✅' : '❌';
        const speedLevel = duration > 1000 ? 'SLOW' : duration > 500 ? 'MEDIUM' : 'FAST';
        let message;
        if (method === 'GRAPHQL') {
            const operationType = operation || 'query';
            const field = fieldName || 'unknown';
            message = `${emoji} [${speedLevel}] GraphQL ${operationType.toUpperCase()} ${field} | ${duration}ms | ${statusCode} | ${data.responseSize || 0}bytes${error ? ` | Error: ${error}` : ''}`;
            if (data.args && Object.keys(data.args).length > 0) {
                this.logger.debug(`📋 [${id}] GraphQL Args: ${JSON.stringify(data.args)}`);
            }
        }
        else {
            message = `${emoji} [${speedLevel}] ${method} ${url} | ${duration}ms | ${statusCode} | ${data.responseSize || 0}bytes${error ? ` | Error: ${error}` : ''}`;
        }
        if (duration > 1000) {
            this.logger.warn(message);
        }
        else if (duration > 500) {
            this.logger.log(message);
        }
        else {
            this.logger.debug(message);
        }
        let operationName;
        if (method === 'GRAPHQL') {
            operationName = `GraphQL_${operation || 'query'}_${fieldName || 'unknown'}`;
        }
        else {
            operationName = `HTTP_${method}_${url}`;
        }
        const memoryUsage = process.memoryUsage().heapUsed / 1024 / 1024;
        if (success) {
            performance_logger_1.PerformanceLogger.logDuration(operationName, duration, {
                method,
                url,
                statusCode,
                responseSize: data.responseSize || 0,
                memoryUsage,
                requestId: id,
                ...(method === 'GRAPHQL' && {
                    operation: data.operation,
                    fieldName: data.fieldName,
                    parentType: data.parentType,
                    args: data.args,
                })
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
                    requestId: id,
                    ...(method === 'GRAPHQL' && {
                        operation: data.operation,
                        fieldName: data.fieldName,
                        parentType: data.parentType,
                        args: data.args,
                        errorCode: data.errorCode,
                    })
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
            if (data.method === 'GRAPHQL') {
                this.logger.error(`🐌 Very slow GraphQL ${data.operation || 'query'} detected: ${data.fieldName} took ${data.duration}ms`);
            }
            else {
                this.logger.error(`🐌 Very slow request detected: ${data.method} ${data.url} took ${data.duration}ms`);
            }
        }
        if (data.method === 'GRAPHQL' && data.args) {
            const argCount = Object.keys(data.args).length;
            if (argCount > 5) {
                this.logger.warn(`📊 GraphQL ${data.fieldName} has many arguments (${argCount}), consider optimizing`);
            }
        }
        const currentMemory = process.memoryUsage().heapUsed / 1024 / 1024;
        if (currentMemory > 500) {
            this.logger.warn(`🧠 High memory usage detected: ${currentMemory.toFixed(2)}MB during ${data.method === 'GRAPHQL' ? `GraphQL ${data.fieldName}` : `${data.method} ${data.url}`}`);
        }
    }
};
exports.PerformanceInterceptor = PerformanceInterceptor;
exports.PerformanceInterceptor = PerformanceInterceptor = __decorate([
    (0, common_1.Injectable)()
], PerformanceInterceptor);
//# sourceMappingURL=performance.interceptor.js.map