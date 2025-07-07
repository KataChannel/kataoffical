/*
  Warnings:

  - You are about to drop the column `driveItemId` on the `PermissionDrive` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userIdDrive,driveId]` on the table `PermissionDrive` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `driveId` to the `PermissionDrive` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PermissionDrive" DROP CONSTRAINT "PermissionDrive_driveItemId_fkey";

-- DropIndex
DROP INDEX "PermissionDrive_userIdDrive_driveItemId_key";

-- AlterTable
ALTER TABLE "PermissionDrive" DROP COLUMN "driveItemId",
ADD COLUMN     "driveId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PermissionDrive_userIdDrive_driveId_key" ON "PermissionDrive"("userIdDrive", "driveId");

-- AddForeignKey
ALTER TABLE "PermissionDrive" ADD CONSTRAINT "PermissionDrive_driveId_fkey" FOREIGN KEY ("driveId") REFERENCES "DriveItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
