import { AuditAction } from '@prisma/client';
export interface AuditConfig {
    entity: string;
    action: AuditAction;
    entityIdField?: string;
    includeResponse?: boolean;
}
export declare const AUDIT_METADATA_KEY = "audit";
export declare const Audit: (config: AuditConfig) => import("@nestjs/common").CustomDecorator<string>;
