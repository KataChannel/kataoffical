"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AuditUserValidationMiddleware_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditUserValidationMiddleware = void 0;
const common_1 = require("@nestjs/common");
let AuditUserValidationMiddleware = AuditUserValidationMiddleware_1 = class AuditUserValidationMiddleware {
    constructor() {
        this.logger = new common_1.Logger(AuditUserValidationMiddleware_1.name);
    }
    use(req, res, next) {
        const publicEndpoints = [
            '/auth/login',
            '/auth/register',
            '/auth/google',
            '/auth/facebook',
            '/auth/zalo',
            '/health',
            '/swagger',
            '/callback',
            '/app'
        ];
        const isPublicEndpoint = publicEndpoints.some(endpoint => req.path.startsWith(endpoint));
        const isPublicSearchEndpoint = req.method === 'POST' && req.path.includes('/findby');
        if (!isPublicEndpoint && !isPublicSearchEndpoint) {
            const isModifyingOperation = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method);
            if (isModifyingOperation && !req.user?.id) {
                this.logger.warn(`Potential security issue: ${req.method} ${req.path} accessed without authentication from IP: ${this.getClientIp(req)}`);
                req.auditMissingAuth = true;
            }
        }
        next();
    }
    getClientIp(request) {
        return (request.headers['x-forwarded-for'] ||
            request.headers['x-real-ip'] ||
            request.connection?.remoteAddress ||
            request.ip ||
            'unknown');
    }
};
exports.AuditUserValidationMiddleware = AuditUserValidationMiddleware;
exports.AuditUserValidationMiddleware = AuditUserValidationMiddleware = AuditUserValidationMiddleware_1 = __decorate([
    (0, common_1.Injectable)()
], AuditUserValidationMiddleware);
//# sourceMappingURL=audit-user-validation.middleware.js.map