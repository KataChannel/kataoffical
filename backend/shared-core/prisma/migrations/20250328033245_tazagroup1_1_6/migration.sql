-- CreateEnum
CREATE TYPE "DriveItemType" AS ENUM ('folder', 'file');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isSuperAdmin" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "DriveItem" (
    "id" TEXT NOT NULL,
    "googleId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "DriveItemType" NOT NULL,
    "parentId" TEXT,
    "mimeType" TEXT,
    "size" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DriveItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PermissionDrive" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "driveItemId" TEXT NOT NULL,
    "permission" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PermissionDrive_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DriveItem_googleId_key" ON "DriveItem"("googleId");

-- CreateIndex
CREATE INDEX "DriveItem_parentId_idx" ON "DriveItem"("parentId");

-- CreateIndex
CREATE INDEX "DriveItem_type_idx" ON "DriveItem"("type");

-- CreateIndex
CREATE UNIQUE INDEX "PermissionDrive_userId_driveItemId_key" ON "PermissionDrive"("userId", "driveItemId");

-- AddForeignKey
ALTER TABLE "DriveItem" ADD CONSTRAINT "DriveItem_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "DriveItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermissionDrive" ADD CONSTRAINT "PermissionDrive_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermissionDrive" ADD CONSTRAINT "PermissionDrive_driveItemId_fkey" FOREIGN KEY ("driveItemId") REFERENCES "DriveItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
