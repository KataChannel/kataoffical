// audit.interceptor.ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';
import { AuditService } from '../auditlog/auditlog.service';
import { AUDIT_METADATA_KEY } from './audit.decorator';


@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(
    private readonly auditService: AuditService,
    private readonly reflector: Reflector,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const auditConfig = this.reflector.get(AUDIT_METADATA_KEY, context.getHandler());
    if (!auditConfig) {
      return next.handle();
    }
    const request = context.switchToHttp().getRequest();
    const startTime = Date.now();
    return next.handle().pipe(
      tap(async (result) => {
        try {
          const dynamicConfig = request.auditConfig || {};
          
          // Log warning if user is not authenticated for audit action
          if (!request.user?.id) {
            console.warn(`AUDIT WARNING: Action '${auditConfig.action}' on entity '${auditConfig.entity}' performed without authenticated user. IP: ${this.getClientIp(request)}, Endpoint: ${request.url}${request.auditMissingAuth ? ' [FLAGGED BY VALIDATION]' : ''}`);
          }
          
          await this.auditService.logActivity({
            entityName: auditConfig.entity,
            entityId: dynamicConfig.entityId || this.extractEntityId(request, result, auditConfig),
            action: auditConfig.action,
            userId: request.user?.id || null,
            userEmail: request.user?.email || null,
            oldValues: dynamicConfig.changes?.oldValues || request.auditOldValues || null,
            newValues: dynamicConfig.changes?.newValues || this.extractNewValues(result, auditConfig),
            changedFields: this.getChangedFields(
              dynamicConfig.changes?.oldValues || request.auditOldValues,
              dynamicConfig.changes?.newValues || result,
            ),
            ipAddress: this.getClientIp(request),
            userAgent: request.headers['user-agent'] || null,
            sessionId: request.session?.id || null,
            metadata: {
              endpoint: request.url,
              method: request.method,
              responseTime: Date.now() - startTime,
              authenticated: !!request.user?.id,
              ...auditConfig.metadata,
            },
            status: dynamicConfig.status || 'SUCCESS',
            errorDetails: dynamicConfig.errorDetails || null,
          });
        } catch (error) {
          console.error('Audit logging failed:', error);
        }
      }),
      catchError((error) => {
        const dynamicConfig = request.auditConfig || {};
        
        // Log warning if user is not authenticated for audit action (error case)
        if (!request.user?.id) {
          console.warn(`AUDIT WARNING: Error in action '${auditConfig.action}' on entity '${auditConfig.entity}' performed without authenticated user. IP: ${this.getClientIp(request)}, Endpoint: ${request.url}, Error: ${error.message}${request.auditMissingAuth ? ' [FLAGGED BY VALIDATION]' : ''}`);
        }
        
        this.auditService.logActivity({
          entityName: auditConfig.entity,
          entityId: dynamicConfig.entityId || request.params?.id || 'N/A',
          action: auditConfig.action,
          userId: request.user?.id || null,
          userEmail: request.user?.email || null,
          oldValues: dynamicConfig.changes?.oldValues || request.auditOldValues || null,
          newValues: dynamicConfig.changes?.newValues || null,
          changedFields: this.getChangedFields(
            dynamicConfig.changes?.oldValues || request.auditOldValues,
            dynamicConfig.changes?.newValues,
          ),
          ipAddress: this.getClientIp(request),
          userAgent: request.headers['user-agent'] || null,
          sessionId: request.session?.id || null,
          metadata: {
            endpoint: request.url,
            method: request.method,
            responseTime: Date.now() - startTime,
            authenticated: !!request.user?.id,
            ...auditConfig.metadata,
          },
          status: 'ERROR',
          errorDetails: {
            message: error.message || 'Unknown error',
            statusCode: error instanceof HttpException ? error.getStatus() : 500,
          },
        }).catch((auditError) => {
          console.error('Audit logging failed:', auditError);
        });
        return throwError(() => error);
      }),
    );
  }

  private extractEntityId(request: any, result: any, config: any): string {
    return config.entityIdField
      ? result?.[config.entityIdField] || request.params?.id || 'N/A'
      : request.params?.id || result?.id || 'N/A';
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
      request.ip ||
      null
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

  private getChangedFields(oldValues: any, newValues: any): string[] {
    if (!oldValues || !newValues) return [];

    const changed: string[] = [];
    const allKeys = new Set([...Object.keys(oldValues || {}), ...Object.keys(newValues || {})]);

    for (const key of allKeys) {
      if (JSON.stringify(oldValues[key]) !== JSON.stringify(newValues[key])) {
        changed.push(key);
      }
    }

    return changed;
  }
}