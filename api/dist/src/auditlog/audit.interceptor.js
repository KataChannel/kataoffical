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
const operators_1 = require("rxjs/operators");
const core_1 = require("@nestjs/core");
const auditlog_service_1 = require("./auditlog.service");
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
                await this.auditService.logActivity({
                    entityName: auditConfig.entity || 'Unknown',
                    entityId: this.extractEntityId(request, result, auditConfig) || '',
                    action: auditConfig.action,
                    userId: request.user?.id || null,
                    userEmail: request.user?.email || null,
                    oldValues: request.auditOldValues || null,
                    newValues: this.extractNewValues(result, auditConfig),
                    changedFields: Object.keys(request.auditOldValues || {}).filter((key) => request.auditOldValues[key] !== result?.[key]),
                    ipAddress: this.getClientIp(request),
                    userAgent: request.headers['user-agent'] || '',
                    sessionId: request.session?.id || null,
                    metadata: {
                        endpoint: request.url,
                        method: request.method,
                        responseTime: Date.now() - startTime,
                        ...auditConfig.metadata,
                    },
                });
            }
            catch (error) {
                console.error('Audit logging failed:', error);
            }
        }));
    }
    extractEntityId(request, result, config) {
        return config.entityIdField
            ? result?.[config.entityIdField] || request.params?.id
            : request.params?.id || result?.id;
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
            request.ip);
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
};
exports.AuditInterceptor = AuditInterceptor;
exports.AuditInterceptor = AuditInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auditlog_service_1.AuditService,
        core_1.Reflector])
], AuditInterceptor);
//# sourceMappingURL=audit.interceptor.js.map