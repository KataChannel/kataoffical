// audit.decorator.ts
import { SetMetadata } from '@nestjs/common';
import { AuditAction } from '@prisma/client';

export interface AuditConfig {
  entity: string;
  action: AuditAction;
  entityIdField?: string;
  includeResponse?: boolean;
}
export const AUDIT_METADATA_KEY = 'audit';
export const Audit = (config: AuditConfig) => SetMetadata(AUDIT_METADATA_KEY, config);