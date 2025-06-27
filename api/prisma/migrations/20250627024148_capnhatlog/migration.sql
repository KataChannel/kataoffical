-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "AuditAction" ADD VALUE 'READ';
ALTER TYPE "AuditAction" ADD VALUE 'IMPORT';

-- AlterTable
ALTER TABLE "AuditLog" ADD COLUMN     "error_details" JSONB,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'SUCCESS',
ALTER COLUMN "entityName" DROP NOT NULL,
ALTER COLUMN "entityId" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "AuditLog_status_idx" ON "AuditLog"("status");
