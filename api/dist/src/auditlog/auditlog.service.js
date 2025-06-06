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
exports.AuditService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let AuditService = class AuditService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async logActivity(data) {
        try {
            const changedFields = this.getChangedFields(data.oldValues, data.newValues);
            await this.prisma.auditLog.create({
                data: {
                    entityName: data.entityName,
                    entityId: data.entityId,
                    action: data.action,
                    userId: data.userId,
                    userEmail: data.userEmail,
                    oldValues: data.oldValues,
                    newValues: data.newValues,
                    changedFields,
                    ipAddress: data.ipAddress,
                    userAgent: data.userAgent,
                    sessionId: data.sessionId,
                    metadata: data.metadata,
                },
            });
        }
        catch (error) {
            console.error('Failed to create audit log:', error);
        }
    }
    async getAuditLogs(param) {
        const { page = 1, pageSize = 50, isOne, ...where } = param;
        const whereClause = {};
        if (where.entityName)
            whereClause.entityName = where.entityName;
        if (where.entityId)
            whereClause.entityId = where.entityId;
        if (where.userId)
            whereClause.userId = where.userId;
        if (where.action)
            whereClause.action = where.action;
        if (where.startDate || where.endDate) {
            whereClause.createdAt = {};
            if (where.startDate)
                whereClause.createdAt.gte = where.startDate;
            if (where.endDate)
                whereClause.createdAt.lte = where.endDate;
        }
        if (isOne) {
            const oneLog = await this.prisma.auditLog.findFirst({
                where: whereClause,
                include: {
                    user: { select: { email: true } },
                },
                orderBy: { createdAt: 'desc' },
            });
            return oneLog;
        }
        const skip = (page - 1) * pageSize;
        const [logs, total] = await Promise.all([
            this.prisma.auditLog.findMany({
                where: whereClause,
                include: {
                    user: { select: { email: true } },
                },
                skip,
                take: pageSize,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.auditLog.count({ where: whereClause }),
        ]);
        return {
            data: logs,
            pagination: {
                page,
                pageSize,
                total,
                pageCount: Math.ceil(total / pageSize),
            },
        };
    }
    getChangedFields(oldValues, newValues) {
        if (!oldValues || !newValues)
            return [];
        const changed = [];
        const allKeys = new Set([...Object.keys(oldValues), ...Object.keys(newValues)]);
        for (const key of allKeys) {
            if (JSON.stringify(oldValues[key]) !== JSON.stringify(newValues[key])) {
                changed.push(key);
            }
        }
        return changed;
    }
};
exports.AuditService = AuditService;
exports.AuditService = AuditService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuditService);
//# sourceMappingURL=auditlog.service.js.map