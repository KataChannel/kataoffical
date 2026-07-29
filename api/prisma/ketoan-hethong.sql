-- AlterTable
ALTER TABLE "public"."ChotCongNo" ADD COLUMN     "heThongId" TEXT,
ALTER COLUMN "khachhangId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."Khachhang" ADD COLUMN     "heThongId" TEXT;

-- AlterTable
ALTER TABLE "public"."PhieuThuChi" ADD COLUMN     "heThongId" TEXT;

-- CreateTable
CREATE TABLE "public"."HeThongKhachHang" (
    "id" TEXT NOT NULL,
    "ma" TEXT NOT NULL,
    "ten" TEXT NOT NULL,
    "chotChung" BOOLEAN NOT NULL DEFAULT false,
    "ghichu" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HeThongKhachHang_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HeThongKhachHang_ma_key" ON "public"."HeThongKhachHang"("ma");

-- AddForeignKey
ALTER TABLE "public"."Khachhang" ADD CONSTRAINT "Khachhang_heThongId_fkey" FOREIGN KEY ("heThongId") REFERENCES "public"."HeThongKhachHang"("id") ON DELETE SET NULL ON UPDATE CASCADE;

