/*
  Warnings:

  - Added the required column `googleId` to the `PermissionDrive` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PermissionDrive" DROP CONSTRAINT "PermissionDrive_driveId_fkey";

-- AlterTable
ALTER TABLE "PermissionDrive" ADD COLUMN     "googleId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "PermissionDrive" ADD CONSTRAINT "PermissionDrive_driveId_fkey" FOREIGN KEY ("driveId") REFERENCES "DriveItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
