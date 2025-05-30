/*
  Warnings:

  - A unique constraint covering the columns `[userIdDrive]` on the table `PermissionDrive` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PermissionDrive_userIdDrive_key" ON "PermissionDrive"("userIdDrive");
