"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auditMiddleware = void 0;
const client_1 = require("@prisma/client");
function auditMiddleware() {
    return async (params, next) => {
        const result = await next(params);
        if (!['create', 'update', 'delete'].includes(params.action)) {
            return result;
        }
        const prisma = params.model ? client_1.Prisma : null;
        if (!prisma)
            return result;
        const auditData = {
            userId: 1,
            action: params.action,
            entity: params.model ?? 'unknown',
            entityId: params.args?.where?.id || result?.id || 0,
            oldValue: null,
            newValue: null,
        };
        if (params.action === 'update') {
            const oldData = params.model ? await prisma[params.model.toLowerCase()].findUnique({
                where: params.args.where,
            }) : null;
            auditData.oldValue = oldData ? JSON.parse(JSON.stringify(oldData)) : null;
            auditData.newValue = JSON.parse(JSON.stringify({ ...oldData, ...params.args.data }));
        }
        if (params.action === 'create') {
            auditData.newValue = JSON.parse(JSON.stringify(result));
        }
        if (params.action === 'delete') {
            auditData.oldValue = JSON.parse(JSON.stringify(result));
        }
        await prisma['auditLog'].create({
            data: {
                userId: auditData.userId,
                action: auditData.action,
                entity: auditData.entity,
                entityId: auditData.entityId,
                oldValue: auditData.oldValue ? JSON.stringify(auditData.oldValue) : null,
                newValue: auditData.newValue ? JSON.stringify(auditData.newValue) : null,
            },
        });
        return result;
    };
}
exports.auditMiddleware = auditMiddleware;
//# sourceMappingURL=prisma.middleware.js.map