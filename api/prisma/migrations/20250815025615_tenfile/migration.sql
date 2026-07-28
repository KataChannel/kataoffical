-- AlterTable
ALTER TABLE "public"."AuditLog" ALTER COLUMN "changedFields" SET DEFAULT ARRAY[]::TEXT[];
