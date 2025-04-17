-- DropIndex
DROP INDEX "DriveItem_parentId_idx";

-- DropIndex
DROP INDEX "DriveItem_type_idx";

-- DropIndex
DROP INDEX "PermissionDrive_userIdDrive_key";

-- CreateIndex
CREATE INDEX "DriveItem_type_parentId_idx" ON "DriveItem"("type", "parentId");
