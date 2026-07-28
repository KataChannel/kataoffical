/*
  Warnings:

  - You are about to drop the column `ngay` on the `Chotkho` table. All the data in the column will be lost.
  - You are about to drop the `ChotkhoDetail` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."ChotkhoDetail" DROP CONSTRAINT "ChotkhoDetail_chotkhoId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ChotkhoDetail" DROP CONSTRAINT "ChotkhoDetail_phieukhoId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ChotkhoDetail" DROP CONSTRAINT "ChotkhoDetail_sanphamId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ChotkhoDetail" DROP CONSTRAINT "ChotkhoDetail_tonkhoId_fkey";

-- AlterTable
ALTER TABLE "public"."Chotkho" DROP COLUMN "ngay",
ADD COLUMN     "ngaychot" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "public"."ChotkhoDetail";

-- CreateTable
CREATE TABLE "public"."Chotkhodetail" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "ngaychot" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sltonhethong" DECIMAL(20,3) NOT NULL DEFAULT 0,
    "sltonthucte" DECIMAL(20,3) NOT NULL DEFAULT 0,
    "slhuy" DECIMAL(20,3) NOT NULL DEFAULT 0,
    "chenhlech" DECIMAL(20,3) NOT NULL DEFAULT 0,
    "ghichu" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "order" INTEGER DEFAULT 1,
    "sanphamId" TEXT,
    "chotkhoId" TEXT,
    "userId" TEXT,

    CONSTRAINT "Chotkhodetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."performance_logs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "duration" DOUBLE PRECISION NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "context" JSONB,
    "success" BOOLEAN NOT NULL DEFAULT true,
    "error" TEXT,
    "method" TEXT,
    "url" TEXT,
    "statusCode" INTEGER,
    "memoryUsage" DOUBLE PRECISION,

    CONSTRAINT "performance_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Chotkhodetail_sanphamId_idx" ON "public"."Chotkhodetail"("sanphamId");

-- CreateIndex
CREATE INDEX "Chotkhodetail_ngaychot_idx" ON "public"."Chotkhodetail"("ngaychot");

-- CreateIndex
CREATE INDEX "performance_logs_timestamp_idx" ON "public"."performance_logs"("timestamp");

-- CreateIndex
CREATE INDEX "performance_logs_name_idx" ON "public"."performance_logs"("name");

-- CreateIndex
CREATE INDEX "performance_logs_success_idx" ON "public"."performance_logs"("success");

-- CreateIndex
CREATE INDEX "performance_logs_duration_idx" ON "public"."performance_logs"("duration");

-- CreateIndex
CREATE INDEX "Chotkho_codeId_idx" ON "public"."Chotkho"("codeId");

-- CreateIndex
CREATE INDEX "Chotkho_ngaychot_idx" ON "public"."Chotkho"("ngaychot");

-- CreateIndex
CREATE INDEX "Chotkho_khoId_idx" ON "public"."Chotkho"("khoId");

-- CreateIndex
CREATE INDEX "Dathang_ngaynhan_idx" ON "public"."Dathang"("ngaynhan");

-- CreateIndex
CREATE INDEX "Dathang_status_idx" ON "public"."Dathang"("status");

-- CreateIndex
CREATE INDEX "Dathang_nhacungcapId_idx" ON "public"."Dathang"("nhacungcapId");

-- CreateIndex
CREATE INDEX "Dathang_ngaynhan_status_idx" ON "public"."Dathang"("ngaynhan", "status");

-- CreateIndex
CREATE INDEX "Dathang_nhacungcapId_ngaynhan_idx" ON "public"."Dathang"("nhacungcapId", "ngaynhan");

-- CreateIndex
CREATE INDEX "Dathang_createdAt_idx" ON "public"."Dathang"("createdAt");

-- CreateIndex
CREATE INDEX "Dathangsanpham_dathangId_idx" ON "public"."Dathangsanpham"("dathangId");

-- CreateIndex
CREATE INDEX "Dathangsanpham_idSP_idx" ON "public"."Dathangsanpham"("idSP");

-- CreateIndex
CREATE INDEX "Donhang_ngaygiao_idx" ON "public"."Donhang"("ngaygiao");

-- CreateIndex
CREATE INDEX "Donhang_status_idx" ON "public"."Donhang"("status");

-- CreateIndex
CREATE INDEX "Donhang_khachhangId_idx" ON "public"."Donhang"("khachhangId");

-- CreateIndex
CREATE INDEX "Donhang_ngaygiao_status_idx" ON "public"."Donhang"("ngaygiao", "status");

-- CreateIndex
CREATE INDEX "Donhang_khachhangId_ngaygiao_idx" ON "public"."Donhang"("khachhangId", "ngaygiao");

-- CreateIndex
CREATE INDEX "Donhang_createdAt_idx" ON "public"."Donhang"("createdAt");

-- CreateIndex
CREATE INDEX "Donhangsanpham_donhangId_idx" ON "public"."Donhangsanpham"("donhangId");

-- CreateIndex
CREATE INDEX "Donhangsanpham_idSP_idx" ON "public"."Donhangsanpham"("idSP");

-- CreateIndex
CREATE INDEX "Khachhang_name_idx" ON "public"."Khachhang"("name");

-- AddForeignKey
ALTER TABLE "public"."Chotkhodetail" ADD CONSTRAINT "Chotkhodetail_sanphamId_fkey" FOREIGN KEY ("sanphamId") REFERENCES "public"."Sanpham"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Chotkhodetail" ADD CONSTRAINT "Chotkhodetail_chotkhoId_fkey" FOREIGN KEY ("chotkhoId") REFERENCES "public"."Chotkho"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Chotkhodetail" ADD CONSTRAINT "Chotkhodetail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
