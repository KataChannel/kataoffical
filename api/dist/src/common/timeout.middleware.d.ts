import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
export declare class TimeoutMiddleware implements NestMiddleware {
    private readonly logger;
    private readonly activeRequests;
    use(req: Request, res: Response, next: NextFunction): void;
    private getTimeoutForRoute;
    getActiveRequestCount(): number;
    clearAllTimeouts(): void;
}
