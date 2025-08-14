-- DropForeignKey
ALTER TABLE "public"."Dathang" DROP CONSTRAINT "Dathang_nhacungcapId_fkey";

-- AlterTable
ALTER TABLE "public"."Dathang" ADD COLUMN     "khoId" TEXT,
ALTER COLUMN "ngaynhan" SET DATA TYPE DATE,
ALTER COLUMN "nhacungcapId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."Donhang" ADD COLUMN     "isshowvat" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "tongtien" DECIMAL(20,2) NOT NULL DEFAULT 0,
ADD COLUMN     "tongvat" DECIMAL(20,2) NOT NULL DEFAULT 0,
ALTER COLUMN "ngaygiao" SET DATA TYPE DATE;

-- CreateTable
CREATE TABLE "public"."FileManager" (
    "id" TEXT NOT NULL,
    "codeId" TEXT,
    "title" TEXT,
    "url" TEXT,
    "description" TEXT,
    "fileType" TEXT,
    "fileSize" INTEGER,
    "metaData" JSONB,
    "category" TEXT,
    "group" TEXT,
    "order" INTEGER DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FileManager_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FileManager_codeId_key" ON "public"."FileManager"("codeId");

-- AddForeignKey
ALTER TABLE "public"."Dathang" ADD CONSTRAINT "Dathang_nhacungcapId_fkey" FOREIGN KEY ("nhacungcapId") REFERENCES "public"."Nhacungcap"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Dathang" ADD CONSTRAINT "Dathang_khoId_fkey" FOREIGN KEY ("khoId") REFERENCES "public"."Kho"("id") ON DELETE SET NULL ON UPDATE CASCADE;
