import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
        email?: string;
        [key: string]: any;
    };
    auditMissingAuth?: boolean;
}
export declare class AuditUserValidationMiddleware implements NestMiddleware {
    private readonly logger;
    use(req: AuthenticatedRequest, res: Response, next: NextFunction): void;
    private getClientIp;
}
export {};
