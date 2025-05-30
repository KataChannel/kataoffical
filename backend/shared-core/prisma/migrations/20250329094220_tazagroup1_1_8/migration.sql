/*
  Warnings:

  - You are about to drop the column `permission` on the `PermissionDrive` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `PermissionDrive` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userIdDrive,driveItemId]` on the table `PermissionDrive` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `kind` to the `PermissionDrive` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `PermissionDrive` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `PermissionDrive` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userIdDrive` to the `PermissionDrive` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PermissionDrive" DROP CONSTRAINT "PermissionDrive_userId_fkey";

-- DropIndex
DROP INDEX "PermissionDrive_userId_driveItemId_key";

-- AlterTable
ALTER TABLE "PermissionDrive" DROP COLUMN "permission",
DROP COLUMN "userId",
ADD COLUMN     "emailAddress" TEXT,
ADD COLUMN     "kind" TEXT NOT NULL,
ADD COLUMN     "role" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "userIdDrive" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PermissionDrive_userIdDrive_driveItemId_key" ON "PermissionDrive"("userIdDrive", "driveItemId");
