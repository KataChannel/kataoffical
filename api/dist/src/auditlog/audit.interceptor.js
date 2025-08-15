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
exports.AuditInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const core_1 = require("@nestjs/core");
const auditlog_service_1 = require("../auditlog/auditlog.service");
const audit_decorator_1 = require("./audit.decorator");
let AuditInterceptor = class AuditInterceptor {
    constructor(auditService, reflector) {
        this.auditService = auditService;
        this.reflector = reflector;
    }
    intercept(context, next) {
        const auditConfig = this.reflector.get(audit_decorator_1.AUDIT_METADATA_KEY, context.getHandler());
        if (!auditConfig) {
            return next.handle();
        }
        const request = context.switchToHttp().getRequest();
        const startTime = Date.now();
        return next.handle().pipe((0, operators_1.tap)(async (result) => {
            try {
                const dynamicConfig = request.auditConfig || {};
                await this.auditService.logActivity({
                    entityName: auditConfig.entity,
                    entityId: dynamicConfig.entityId || this.extractEntityId(request, result, auditConfig),
                    action: auditConfig.action,
                    userId: request.user?.id || null,
                    userEmail: request.user?.email || null,
                    oldValues: dynamicConfig.changes?.oldValues || request.auditOldValues || null,
                    newValues: dynamicConfig.changes?.newValues || this.extractNewValues(result, auditConfig),
                    changedFields: this.getChangedFields(dynamicConfig.changes?.oldValues || request.auditOldValues, dynamicConfig.changes?.newValues || result),
                    ipAddress: this.getClientIp(request),
                    userAgent: request.headers['user-agent'] || null,
                    sessionId: request.session?.id || null,
                    metadata: {
                        endpoint: request.url,
                        method: request.method,
                        responseTime: Date.now() - startTime,
                        ...auditConfig.metadata,
                    },
                    status: dynamicConfig.status || 'SUCCESS',
                    errorDetails: dynamicConfig.errorDetails || null,
                });
            }
            catch (error) {
                console.error('Audit logging failed:', error);
            }
        }), (0, operators_1.catchError)((error) => {
            const dynamicConfig = request.auditConfig || {};
            this.auditService.logActivity({
                entityName: auditConfig.entity,
                entityId: dynamicConfig.entityId || request.params?.id || 'N/A',
                action: auditConfig.action,
                userId: request.user?.id || null,
                userEmail: request.user?.email || null,
                oldValues: dynamicConfig.changes?.oldValues || request.auditOldValues || null,
                newValues: dynamicConfig.changes?.newValues || null,
                changedFields: this.getChangedFields(dynamicConfig.changes?.oldValues || request.auditOldValues, dynamicConfig.changes?.newValues),
                ipAddress: this.getClientIp(request),
                userAgent: request.headers['user-agent'] || null,
                sessionId: request.session?.id || null,
                metadata: {
                    endpoint: request.url,
                    method: request.method,
                    responseTime: Date.now() - startTime,
                    ...auditConfig.metadata,
                },
                status: 'ERROR',
                errorDetails: {
                    message: error.message || 'Unknown error',
                    statusCode: error instanceof common_1.HttpException ? error.getStatus() : 500,
                },
            }).catch((auditError) => {
                console.error('Audit logging failed:', auditError);
            });
            return (0, rxjs_1.throwError)(() => error);
        }));
    }
    extractEntityId(request, result, config) {
        return config.entityIdField
            ? result?.[config.entityIdField] || request.params?.id || 'N/A'
            : request.params?.id || result?.id || 'N/A';
    }
    extractNewValues(result, config) {
        if (config.includeResponse && result) {
            return this.sanitizeData(result);
        }
        return null;
    }
    getClientIp(request) {
        return (request.headers['x-forwarded-for'] ||
            request.headers['x-real-ip'] ||
            request.connection?.remoteAddress ||
            request.ip ||
            null);
    }
    sanitizeData(data) {
        const sensitiveFields = ['password', 'token', 'secret', 'key'];
        if (typeof data !== 'object' || data === null)
            return data;
        const sanitized = { ...data };
        sensitiveFields.forEach((field) => {
            if (field in sanitized) {
                sanitized[field] = '[REDACTED]';
            }
        });
        return sanitized;
    }
    getChangedFields(oldValues, newValues) {
        if (!oldValues || !newValues)
            return [];
        const changed = [];
        const allKeys = new Set([...Object.keys(oldValues || {}), ...Object.keys(newValues || {})]);
        for (const key of allKeys) {
            if (JSON.stringify(oldValues[key]) !== JSON.stringify(newValues[key])) {
                changed.push(key);
            }
        }
        return changed;
    }
};
exports.AuditInterceptor = AuditInterceptor;
exports.AuditInterceptor = AuditInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auditlog_service_1.AuditService,
        core_1.Reflector])
], AuditInterceptor);
//# sourceMappingURL=audit.interceptor.js.map