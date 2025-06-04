import { AuditAction } from '@prisma/client';
export declare const AUDIT_METADATA_KEY = "audit";
export interface AuditConfig {
    entity: string;
    action: AuditAction;
    entityIdField?: string;
    includeResponse?: boolean;
    metadata?: Record<string, any>;
}
export declare const Audit: (config: AuditConfig) => import("@nestjs/common").CustomDecorator<string>;
