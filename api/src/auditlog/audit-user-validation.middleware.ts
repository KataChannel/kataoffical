import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email?: string;
    [key: string]: any;
  };
  auditMissingAuth?: boolean;
}

@Injectable()
export class AuditUserValidationMiddleware implements NestMiddleware {
  private readonly logger = new Logger(AuditUserValidationMiddleware.name);

  use(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    // Skip validation for public endpoints
    const publicEndpoints = [
      '/auth/login',
      '/auth/register',
      '/auth/google',
      '/auth/facebook',
      '/auth/zalo',
      '/health',
      '/swagger',
      '/callback',
      '/app'
    ];

    const isPublicEndpoint = publicEndpoints.some(endpoint => 
      req.path.startsWith(endpoint)
    );

    // Skip for GET requests on findby endpoints (often used for searching without auth)
    const isPublicSearchEndpoint = req.method === 'POST' && req.path.includes('/findby');

    if (!isPublicEndpoint && !isPublicSearchEndpoint) {
      // Check if this is a modifying operation that should have authentication
      const isModifyingOperation = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method);
      
      if (isModifyingOperation && !req.user?.id) {
        this.logger.warn(`Potential security issue: ${req.method} ${req.path} accessed without authentication from IP: ${this.getClientIp(req)}`);
        
        // Add a flag to the request to indicate missing authentication for audit
        req.auditMissingAuth = true;
      }
    }

    next();
  }

  private getClientIp(request: any): string {
    return (
      request.headers['x-forwarded-for'] ||
      request.headers['x-real-ip'] ||
      request.connection?.remoteAddress ||
      request.ip ||
      'unknown'
    );
  }
}