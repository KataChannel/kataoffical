-- AlterEnum
ALTER TYPE "AuditAction" ADD VALUE 'IMPORT';

-- AlterTable
ALTER TABLE "AuditLog" ALTER COLUMN "entityId" DROP NOT NULL,
ALTER COLUMN "entityName" DROP NOT NULL;
