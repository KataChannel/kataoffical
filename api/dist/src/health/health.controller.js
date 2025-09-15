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
exports.HealthController = void 0;
const common_1 = require("@nestjs/common");
const server_stability_service_1 = require("../common/server-stability.service");
const prisma_service_1 = require("../../prisma/prisma.service");
let HealthController = class HealthController {
    constructor(serverStability, prisma) {
        this.serverStability = serverStability;
        this.prisma = prisma;
    }
    async getHealth() {
        return this.serverStability.getHealthStatus();
    }
    async getDetailedHealth() {
        const basicHealth = await this.serverStability.getHealthStatus();
        const dbConnectionsCount = await this.getDatabaseConnectionsCount();
        const processStats = this.getProcessStats();
        return {
            ...basicHealth,
            detailed: {
                database: {
                    ...basicHealth.database,
                    connectionsCount: dbConnectionsCount,
                },
                process: processStats,
                environment: {
                    nodeVersion: process.version,
                    platform: process.platform,
                    arch: process.arch,
                }
            }
        };
    }
    async getReadiness() {
        try {
            await this.prisma.$queryRaw `SELECT 1`;
            return {
                status: 'ready',
                timestamp: new Date().toISOString(),
                checks: {
                    database: 'ok'
                }
            };
        }
        catch (error) {
            return {
                status: 'not ready',
                timestamp: new Date().toISOString(),
                checks: {
                    database: 'failed'
                },
                error: error.message
            };
        }
    }
    async getLiveness() {
        const memUsage = process.memoryUsage();
        const heapUsedMB = Math.round(memUsage.heapUsed / 1024 / 1024);
        const isHealthy = heapUsedMB < 2048;
        return {
            status: isHealthy ? 'alive' : 'unhealthy',
            timestamp: new Date().toISOString(),
            uptime: Math.floor(process.uptime()),
            memoryUsage: heapUsedMB
        };
    }
    async getDatabaseConnectionsCount() {
        try {
            const result = await this.prisma.$queryRaw `
        SELECT count(*) as count 
        FROM pg_stat_activity 
        WHERE state = 'active'
      `;
            return Number(result[0]?.count || 0);
        }
        catch (error) {
            return -1;
        }
    }
    getProcessStats() {
        const cpuUsage = process.cpuUsage();
        const memUsage = process.memoryUsage();
        return {
            pid: process.pid,
            uptime: Math.floor(process.uptime()),
            cpu: {
                user: cpuUsage.user,
                system: cpuUsage.system
            },
            memory: {
                rss: Math.round(memUsage.rss / 1024 / 1024),
                heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024),
                heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024),
                external: Math.round(memUsage.external / 1024 / 1024)
            }
        };
    }
};
exports.HealthController = HealthController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "getHealth", null);
__decorate([
    (0, common_1.Get)('detailed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "getDetailedHealth", null);
__decorate([
    (0, common_1.Get)('readiness'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "getReadiness", null);
__decorate([
    (0, common_1.Get)('liveness'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "getLiveness", null);
exports.HealthController = HealthController = __decorate([
    (0, common_1.Controller)('health'),
    __metadata("design:paramtypes", [server_stability_service_1.ServerStabilityService,
        prisma_service_1.PrismaService])
], HealthController);
//# sourceMappingURL=health.controller.js.map