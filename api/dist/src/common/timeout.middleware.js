"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TimeoutMiddleware_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeoutMiddleware = void 0;
const common_1 = require("@nestjs/common");
let TimeoutMiddleware = TimeoutMiddleware_1 = class TimeoutMiddleware {
    constructor() {
        this.logger = new common_1.Logger(TimeoutMiddleware_1.name);
        this.activeRequests = new Map();
    }
    use(req, res, next) {
        const requestId = `${Date.now()}_${Math.random().toString(36)}`;
        const startTime = Date.now();
        const timeout = this.getTimeoutForRoute(req.path);
        const timeoutId = setTimeout(() => {
            if (!res.headersSent) {
                this.logger.error(`Request timeout: ${req.method} ${req.path} after ${timeout}ms`);
                res.status(408).json({
                    error: 'Request Timeout',
                    message: `Request timed out after ${timeout}ms`,
                    path: req.path,
                    timestamp: new Date().toISOString()
                });
            }
            this.activeRequests.delete(requestId);
        }, timeout);
        this.activeRequests.set(requestId, timeoutId);
        res.on('finish', () => {
            const duration = Date.now() - startTime;
            if (this.activeRequests.has(requestId)) {
                clearTimeout(this.activeRequests.get(requestId));
                this.activeRequests.delete(requestId);
            }
            if (duration > 3000) {
                this.logger.warn(`Slow request: ${req.method} ${req.path} took ${duration}ms`);
            }
        });
        res.on('close', () => {
            if (this.activeRequests.has(requestId)) {
                clearTimeout(this.activeRequests.get(requestId));
                this.activeRequests.delete(requestId);
            }
        });
        next();
    }
    getTimeoutForRoute(path) {
        const timeoutConfig = [
            { pattern: /\/graphql/, timeout: 30000 },
            { pattern: /\/api\/.*\/dongbogia/, timeout: 60000 },
            { pattern: /\/api\/.*\/import/, timeout: 120000 },
            { pattern: /\/api\/.*\/download/, timeout: 45000 },
            { pattern: /\/api\/.*\/upload/, timeout: 30000 },
            { pattern: /\/api\/.*\/congno/, timeout: 15000 },
            { pattern: /\/api\/.*\/phieugiao/, timeout: 10000 },
            { pattern: /\/api\/health/, timeout: 5000 },
        ];
        for (const config of timeoutConfig) {
            if (config.pattern.test(path)) {
                return config.timeout;
            }
        }
        return 20000;
    }
    getActiveRequestCount() {
        return this.activeRequests.size;
    }
    clearAllTimeouts() {
        for (const [requestId, timeoutId] of this.activeRequests) {
            clearTimeout(timeoutId);
        }
        this.activeRequests.clear();
        this.logger.log('Cleared all request timeouts');
    }
};
exports.TimeoutMiddleware = TimeoutMiddleware;
exports.TimeoutMiddleware = TimeoutMiddleware = TimeoutMiddleware_1 = __decorate([
    (0, common_1.Injectable)()
], TimeoutMiddleware);
//# sourceMappingURL=timeout.middleware.js.map