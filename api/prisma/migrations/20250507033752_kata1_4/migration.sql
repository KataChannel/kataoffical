-- AlterTable
ALTER TABLE "Setting" ADD COLUMN     "order" INTEGER DEFAULT 1;

-- CreateIndex
CREATE INDEX "Setting_isActive_idx" ON "Setting"("isActive");

-- CreateIndex
CREATE INDEX "Setting_order_idx" ON "Setting"("order");

-- CreateIndex
CREATE INDEX "Setting_createdById_idx" ON "Setting"("createdById");
