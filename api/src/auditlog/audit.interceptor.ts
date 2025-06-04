import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';
import { AuditService } from './auditlog.service';
import { AUDIT_METADATA_KEY } from './audit.decorator';
@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(
    private readonly auditService: AuditService,
    private readonly reflector: Reflector,
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const auditConfig = this.reflector.get(
      AUDIT_METADATA_KEY,
      context.getHandler(),
    );
    if (!auditConfig) {
      return next.handle();
    }
    const request = context.switchToHttp().getRequest();
    const startTime = Date.now();
    return next.handle().pipe(
      tap(async (result) => {
        try {
          await this.auditService.logActivity({
            entityName: auditConfig.entity || 'Unknown',
            entityId: this.extractEntityId(request, result, auditConfig) || '',
            action: auditConfig.action,
            userId: request.user?.id || null,
            userEmail: request.user?.email || null,
            oldValues: request.auditOldValues || null,
            newValues: this.extractNewValues(result, auditConfig),
            changedFields: Object.keys(request.auditOldValues || {}).filter(
              (key) => request.auditOldValues[key] !== result?.[key],
            ),
            ipAddress: this.getClientIp(request),
            userAgent: request.headers['user-agent'] || '',
            sessionId: request.session?.id || null,
            metadata: {
              endpoint: request.url,
              method: request.method,
              responseTime: Date.now() - startTime,
              ...auditConfig.metadata,
            },
          });
        } catch (error) {
          console.error('Audit logging failed:', error);
        }
      }),
    );
  }

  private extractEntityId(request: any, result: any, config: any): string {
    return config.entityIdField
      ? result?.[config.entityIdField] || request.params?.id
      : request.params?.id || result?.id;
  }

  private extractNewValues(result: any, config: any): any {
    if (config.includeResponse && result) {
      return this.sanitizeData(result);
    }
    return null;
  }

  private getClientIp(request: any): string {
    return (
      request.headers['x-forwarded-for'] ||
      request.headers['x-real-ip'] ||
      request.connection?.remoteAddress ||
      request.ip
    );
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
