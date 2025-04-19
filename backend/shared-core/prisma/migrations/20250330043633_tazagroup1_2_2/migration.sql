-- DropForeignKey
ALTER TABLE "PermissionDrive" DROP CONSTRAINT "PermissionDrive_driveId_fkey";

-- AddForeignKey
ALTER TABLE "PermissionDrive" ADD CONSTRAINT "PermissionDrive_driveId_fkey" FOREIGN KEY ("driveId") REFERENCES "DriveItem"("googleId") ON DELETE CASCADE ON UPDATE CASCADE;
