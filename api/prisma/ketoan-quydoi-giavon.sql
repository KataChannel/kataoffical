-- AlterTable
ALTER TABLE "public"."Sanpham" ADD COLUMN     "haoHutQuyDoi" DECIMAL(6,4) NOT NULL DEFAULT 0,
ADD COLUMN     "heSoQuyDoi" DECIMAL(20,6) NOT NULL DEFAULT 1,
ADD COLUMN     "sanphamGocId" TEXT;

-- AddForeignKey
ALTER TABLE "public"."Sanpham" ADD CONSTRAINT "Sanpham_sanphamGocId_fkey" FOREIGN KEY ("sanphamGocId") REFERENCES "public"."Sanpham"("id") ON DELETE SET NULL ON UPDATE CASCADE;

