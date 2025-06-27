-- AlterEnum
ALTER TYPE "AuditAction" ADD VALUE 'READ';

-- AlterTable
ALTER TABLE "AuditLog" ADD COLUMN     "error_details" JSONB,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'SUCCESS';

-- CreateIndex
CREATE INDEX "AuditLog_status_idx" ON "AuditLog"("status");
