import { Prisma } from '@prisma/client';
export function auditMiddleware(): Prisma.Middleware {
  return async (params, next) => {
    const result = await next(params);
    // Skip if it's not a mutation
    if (!['create', 'update', 'delete'].includes(params.action)) {
      return result;
    }

    // Get the Prisma client from the context
    const prisma = params.model ? Prisma : null;
    
    if (!prisma) return result;

    const auditData = {
      userId: 1, // Thay bằng logic lấy user ID thực tế từ request context
      action: params.action,
      entity: params.model ?? 'unknown',
      entityId: params.args?.where?.id || result?.id || 0,
      oldValue: null,
      newValue: null,
    };

    // For update operations, get old value
    if (params.action === 'update') {
      const oldData = params.model ? await prisma[params.model.toLowerCase()].findUnique({
        where: params.args.where,
      }) : null;
      auditData.oldValue = oldData ? JSON.parse(JSON.stringify(oldData)) : null;
      auditData.newValue = JSON.parse(JSON.stringify({ ...oldData, ...params.args.data }));
    }

    // For create operations
    if (params.action === 'create') {
      auditData.newValue = JSON.parse(JSON.stringify(result));
    }

    // For delete operations
    if (params.action === 'delete') {
      auditData.oldValue = JSON.parse(JSON.stringify(result));
    }

    // Create audit log
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