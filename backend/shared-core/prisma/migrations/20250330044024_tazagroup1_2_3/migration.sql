/*
  Warnings:

  - A unique constraint covering the columns `[userIdDrive,driveId,googleId]` on the table `PermissionDrive` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "PermissionDrive_userIdDrive_driveId_key";

-- CreateIndex
CREATE UNIQUE INDEX "PermissionDrive_userIdDrive_driveId_googleId_key" ON "PermissionDrive"("userIdDrive", "driveId", "googleId");
