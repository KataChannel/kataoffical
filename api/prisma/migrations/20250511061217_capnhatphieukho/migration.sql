-- AlterTable
ALTER TABLE "PhieuKho" ADD COLUMN     "madathang" TEXT,
ADD COLUMN     "madncc" TEXT,
ADD COLUMN     "madonhang" TEXT;

-- AddForeignKey
ALTER TABLE "PhieuKho" ADD CONSTRAINT "PhieuKho_madonhang_fkey" FOREIGN KEY ("madonhang") REFERENCES "Donhang"("madonhang") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhieuKho" ADD CONSTRAINT "PhieuKho_madncc_fkey" FOREIGN KEY ("madncc") REFERENCES "Dathang"("madncc") ON DELETE SET NULL ON UPDATE CASCADE;
