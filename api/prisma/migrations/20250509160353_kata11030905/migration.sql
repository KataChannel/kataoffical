-- AlterTable
ALTER TABLE "HoadonChitiet" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "category" TEXT,
ADD COLUMN     "group" TEXT;
