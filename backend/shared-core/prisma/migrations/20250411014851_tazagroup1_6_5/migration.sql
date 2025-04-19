-- AlterTable
ALTER TABLE "DriveItem" ADD COLUMN     "createdTime" TIMESTAMP(3),
ADD COLUMN     "modifiedTime" TIMESTAMP(3),
ALTER COLUMN "size" SET DATA TYPE BIGINT;
