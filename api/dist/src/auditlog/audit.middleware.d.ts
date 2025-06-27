import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from 'prisma/prisma.service';
export declare class AuditMiddleware implements NestMiddleware {
    private readonly prisma;
    constructor(prisma: PrismaService);
    use(req: Request & {
        auditOldValues?: any;
    }, res: Response, next: NextFunction): Promise<void>;
    private getOldData;
    private sanitizeData;
}
