-- AlterTable
ALTER TABLE "Banggia" ADD COLUMN     "mabanggia" TEXT,
ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "type" DROP NOT NULL;
