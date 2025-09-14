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
        this.auditQueue = [];
        this.isProcessing = false;
        this.batchSize = 10;
        this.batchTimeout = 5000;
        this.processBatchPeriodically();
    }
    async logActivity(data) {
        try {
            const changedFields = data.changedFields || this.getChangedFields(data.oldValues, data.newValues);
            this.auditQueue.push({
                ...data,
                changedFields: changedFields || [],
                status: data.status || 'SUCCESS'
            });
            if (this.auditQueue.length >= this.batchSize) {
                this.processBatch();
            }
        }
        catch (error) {
            console.error('Failed to queue audit log:', error);
        }
    }
    async processBatch() {
        if (this.isProcessing || this.auditQueue.length === 0) {
            return;
        }
        this.isProcessing = true;
        const batch = this.auditQueue.splice(0, this.batchSize);
        try {
            await this.prisma.auditLog.createMany({
                data: batch.map(item => ({
                    entityName: item.entityName,
                    entityId: item.entityId,
                    action: item.action,
                    userId: item.userId,
                    userEmail: item.userEmail,
                    oldValues: item.oldValues || null,
                    newValues: item.newValues || null,
                    changedFields: item.changedFields || [],
                    ipAddress: item.ipAddress || null,
                    userAgent: item.userAgent || null,
                    sessionId: item.sessionId || null,
                    metadata: item.metadata || null,
                    status: item.status || 'SUCCESS',
                    errorDetails: item.errorDetails || null,
                })),
                skipDuplicates: true
            });
        }
        catch (error) {
            console.error('Failed to create audit log batch:', error);
        }
        finally {
            this.isProcessing = false;
        }
    }
    processBatchPeriodically() {
        setInterval(() => {
            this.processBatch();
        }, this.batchTimeout);
    }
    async getAuditLogs(param) {
        const { page = 1, pageSize = 50, isOne, ...where } = param;
        const skip = (page - 1) * pageSize;
        const whereClause = {};
        if (where.id)
            whereClause.id = where.id;
        if (where.entityName) {
            whereClause.entityName = { contains: where.entityName, mode: 'insensitive' };
        }
        if (where.entityId) {
            whereClause.entityId = { contains: where.entityId, mode: 'insensitive' };
        }
        if (where.userId) {
            whereClause.userId = { contains: where.userId, mode: 'insensitive' };
        }
        if (where.action) {
            whereClause.action = { contains: where.action, mode: 'insensitive' };
        }
        if (where.status) {
            whereClause.status = { contains: where.status, mode: 'insensitive' };
        }
        if (where.startDate || where.endDate) {
            whereClause.createdAt = {};
            if (where.startDate)
                whereClause.createdAt.gte = new Date(where.startDate);
            if (where.endDate)
                whereClause.createdAt.lte = new Date(where.endDate);
        }
        if (isOne) {
            const result = await this.prisma.auditLog.findFirst({
                where: whereClause,
                include: {
                    user: { select: { email: true, SDT: true } },
                },
            });
            return result;
        }
        const [logs, total] = await Promise.all([
            this.prisma.auditLog.findMany({
                where: whereClause,
                include: {
                    user: { select: { email: true, SDT: true } },
                },
                skip,
                take: pageSize,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.auditLog.count({ where: whereClause }),
        ]);
        return {
            data: logs,
            page,
            pageSize,
            total,
            pageCount: Math.ceil(total / pageSize),
        };
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
exports.AuditService = AuditService;
exports.AuditService = AuditService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuditService);
//# sourceMappingURL=auditlog.service.js.map