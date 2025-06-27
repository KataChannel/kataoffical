// audit.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AuditMiddleware implements NestMiddleware {
  constructor(private readonly prisma: PrismaService) {}

  async use(req: Request & { auditOldValues?: any }, res: Response, next: NextFunction) {
    if (req.method === 'PUT' || req.method === 'PATCH' || req.method === 'DELETE') {
      try {
        const entityId = req.params?.id || req.params[0] || null;
        if (entityId) {
          const oldData = await this.getOldData(req.originalUrl, entityId);
          req.auditOldValues = oldData ? this.sanitizeData(oldData) : null;
        }
      } catch (error) {
        console.error('Failed to fetch old values for audit:', error);
      }
    }

    next();
  }

  private async getOldData(url: string, id: string): Promise<any> {
    if (url.includes('/users/')) {
      return await this.prisma.user.findUnique({ where: { id } });
    }
    if (url.includes('/sanpham/')) {
      return await this.prisma.sanpham.findUnique({ where: { id } });
    }
    if (url.includes('/khachhang/import/')) {
      return await this.prisma.khachhang.findUnique({ where: { id } });
    }
    return null;
  }

  private sanitizeData(data: any): any {
    const sensitiveFields = ['password', 'token', 'secret', 'key'];
    if (typeof data !== 'object' || data === null) return data;

    const sanitized = { ...data };
    sensitiveFields.forEach((field) => {
      if (field in sanitized) {
        sanitized[field] = '[REDACTED]';
      }
    });

    return sanitized;
  }
}