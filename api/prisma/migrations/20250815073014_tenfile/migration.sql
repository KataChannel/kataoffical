-- DropForeignKey
ALTER TABLE "public"."Donhang" DROP CONSTRAINT "Donhang_khachhangId_fkey";

-- AlterTable
ALTER TABLE "public"."Donhang" ADD COLUMN     "banggiaId" TEXT,
ALTER COLUMN "khachhangId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Donhang" ADD CONSTRAINT "Donhang_khachhangId_fkey" FOREIGN KEY ("khachhangId") REFERENCES "public"."Khachhang"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Donhang" ADD CONSTRAINT "Donhang_banggiaId_fkey" FOREIGN KEY ("banggiaId") REFERENCES "public"."Banggia"("id") ON DELETE SET NULL ON UPDATE CASCADE;
