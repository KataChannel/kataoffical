import { SetMetadata } from '@nestjs/common';
import { AuditAction } from '@prisma/client';
export const AUDIT_METADATA_KEY = 'audit';
export interface AuditConfig {
  entity: string;
  action: AuditAction;
  entityIdField?: string;
  includeResponse?: boolean;
  metadata?: Record<string, any>;
}
export const Audit = (config: AuditConfig) => SetMetadata(AUDIT_METADATA_KEY, config);
