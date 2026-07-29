-- CreateEnum
CREATE TYPE "public"."LoaiThuChi" AS ENUM ('THU', 'CHI');

-- AlterTable
ALTER TABLE "public"."Khachhang" ADD COLUMN     "hanmucno" DOUBLE PRECISION,
ADD COLUMN     "isTemplate2" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "khuvuc" TEXT,
ADD COLUMN     "latitude" DOUBLE PRECISION,
ADD COLUMN     "longitude" DOUBLE PRECISION,
ADD COLUMN     "thoihanno" INTEGER;

-- AlterTable
ALTER TABLE "public"."Nhacungcap" ADD COLUMN     "hanmucno" DOUBLE PRECISION,
ADD COLUMN     "mst" TEXT,
ADD COLUMN     "thoihanno" INTEGER;

-- CreateTable
CREATE TABLE "public"."LienheKhachhang" (
    "id" TEXT NOT NULL,
    "khachhangId" TEXT NOT NULL,
    "hoten" TEXT NOT NULL,
    "sdt" TEXT,
    "email" TEXT,
    "vaitro" TEXT,
    "ghichu" TEXT,
    "isHienTai" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LienheKhachhang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TaiKhoan" (
    "id" TEXT NOT NULL,
    "so" TEXT NOT NULL,
    "ten" TEXT NOT NULL,
    "loai" TEXT NOT NULL,
    "congNoChiTiet" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TaiKhoan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CongNoDauKy" (
    "id" TEXT NOT NULL,
    "doiTuongLoai" TEXT NOT NULL,
    "doiTuongKey" TEXT NOT NULL,
    "khachhangId" TEXT,
    "nhacungcapId" TEXT,
    "tk" TEXT NOT NULL,
    "soDuNo" DECIMAL(20,3) NOT NULL DEFAULT 0,
    "soDuCo" DECIMAL(20,3) NOT NULL DEFAULT 0,
    "ngayChot" TIMESTAMP(3) NOT NULL,
    "ghichu" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CongNoDauKy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PhieuThuChi" (
    "id" TEXT NOT NULL,
    "maphieu" TEXT NOT NULL,
    "loai" "public"."LoaiThuChi" NOT NULL,
    "ngay" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sotien" DECIMAL(20,3) NOT NULL,
    "hinhthuc" TEXT NOT NULL,
    "nghiepvu" TEXT NOT NULL,
    "khachhangId" TEXT,
    "nhacungcapId" TEXT,
    "donhangId" TEXT,
    "ghichu" TEXT,
    "userId" TEXT,
    "butToanId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PhieuThuChi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CongNoGiaoDich" (
    "id" TEXT NOT NULL,
    "doiTuongLoai" TEXT NOT NULL,
    "khachhangId" TEXT,
    "nhacungcapId" TEXT,
    "ngay" TIMESTAMP(3) NOT NULL,
    "chungTuLoai" TEXT NOT NULL,
    "chungTuId" TEXT,
    "soChungTu" TEXT,
    "dienGiai" TEXT,
    "psNo" DECIMAL(20,3) NOT NULL DEFAULT 0,
    "psCo" DECIMAL(20,3) NOT NULL DEFAULT 0,
    "hanThanhToan" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CongNoGiaoDich_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ButToan" (
    "id" TEXT NOT NULL,
    "soCT" TEXT NOT NULL,
    "ngay" TIMESTAMP(3) NOT NULL,
    "dienGiai" TEXT,
    "nguon" TEXT NOT NULL,
    "nguonId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ButToan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ButToanChiTiet" (
    "id" TEXT NOT NULL,
    "butToanId" TEXT NOT NULL,
    "tkNo" TEXT,
    "tkCo" TEXT,
    "soTien" DECIMAL(20,3) NOT NULL,
    "khachhangId" TEXT,
    "nhacungcapId" TEXT,

    CONSTRAINT "ButToanChiTiet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."HoaDon" (
    "id" TEXT NOT NULL,
    "donhangId" TEXT,
    "khachhangId" TEXT,
    "kyHieu" TEXT,
    "soHoaDon" TEXT,
    "ngayHD" TIMESTAMP(3),
    "mst" TEXT,
    "tienHang" DECIMAL(20,3) NOT NULL DEFAULT 0,
    "tienThue" DECIMAL(20,3) NOT NULL DEFAULT 0,
    "tongTien" DECIMAL(20,3) NOT NULL DEFAULT 0,
    "thueSuat" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "trangThai" TEXT NOT NULL DEFAULT 'NHAP',
    "maCQT" TEXT,
    "linkTraCuu" TEXT,
    "provider" TEXT,
    "providerRef" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HoaDon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."HoaDonMuaVao" (
    "id" TEXT NOT NULL,
    "nhacungcapId" TEXT,
    "dathangId" TEXT,
    "soHoaDon" TEXT,
    "ngayHD" TIMESTAMP(3),
    "mstNcc" TEXT,
    "tienHang" DECIMAL(20,3) NOT NULL DEFAULT 0,
    "tienThue" DECIMAL(20,3) NOT NULL DEFAULT 0,
    "thueSuat" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HoaDonMuaVao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."KhoaSoKeToan" (
    "id" TEXT NOT NULL,
    "nam" INTEGER NOT NULL,
    "thang" INTEGER NOT NULL,
    "isLocked" BOOLEAN NOT NULL DEFAULT true,
    "lockedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lockedBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "KhoaSoKeToan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "LienheKhachhang_khachhangId_idx" ON "public"."LienheKhachhang"("khachhangId");

-- CreateIndex
CREATE UNIQUE INDEX "TaiKhoan_so_key" ON "public"."TaiKhoan"("so");

-- CreateIndex
CREATE UNIQUE INDEX "CongNoDauKy_doiTuongKey_key" ON "public"."CongNoDauKy"("doiTuongKey");

-- CreateIndex
CREATE INDEX "CongNoDauKy_khachhangId_idx" ON "public"."CongNoDauKy"("khachhangId");

-- CreateIndex
CREATE INDEX "CongNoDauKy_nhacungcapId_idx" ON "public"."CongNoDauKy"("nhacungcapId");

-- CreateIndex
CREATE UNIQUE INDEX "PhieuThuChi_maphieu_key" ON "public"."PhieuThuChi"("maphieu");

-- CreateIndex
CREATE INDEX "PhieuThuChi_loai_ngay_idx" ON "public"."PhieuThuChi"("loai", "ngay");

-- CreateIndex
CREATE INDEX "PhieuThuChi_khachhangId_idx" ON "public"."PhieuThuChi"("khachhangId");

-- CreateIndex
CREATE INDEX "PhieuThuChi_nhacungcapId_idx" ON "public"."PhieuThuChi"("nhacungcapId");

-- CreateIndex
CREATE INDEX "PhieuThuChi_donhangId_idx" ON "public"."PhieuThuChi"("donhangId");

-- CreateIndex
CREATE INDEX "CongNoGiaoDich_doiTuongLoai_khachhangId_ngay_idx" ON "public"."CongNoGiaoDich"("doiTuongLoai", "khachhangId", "ngay");

-- CreateIndex
CREATE INDEX "CongNoGiaoDich_doiTuongLoai_nhacungcapId_ngay_idx" ON "public"."CongNoGiaoDich"("doiTuongLoai", "nhacungcapId", "ngay");

-- CreateIndex
CREATE INDEX "CongNoGiaoDich_chungTuLoai_chungTuId_idx" ON "public"."CongNoGiaoDich"("chungTuLoai", "chungTuId");

-- CreateIndex
CREATE UNIQUE INDEX "ButToan_soCT_key" ON "public"."ButToan"("soCT");

-- CreateIndex
CREATE INDEX "ButToan_ngay_idx" ON "public"."ButToan"("ngay");

-- CreateIndex
CREATE INDEX "ButToan_nguon_nguonId_idx" ON "public"."ButToan"("nguon", "nguonId");

-- CreateIndex
CREATE INDEX "ButToanChiTiet_butToanId_idx" ON "public"."ButToanChiTiet"("butToanId");

-- CreateIndex
CREATE INDEX "ButToanChiTiet_tkNo_idx" ON "public"."ButToanChiTiet"("tkNo");

-- CreateIndex
CREATE INDEX "ButToanChiTiet_tkCo_idx" ON "public"."ButToanChiTiet"("tkCo");

-- CreateIndex
CREATE INDEX "HoaDon_donhangId_idx" ON "public"."HoaDon"("donhangId");

-- CreateIndex
CREATE INDEX "HoaDon_khachhangId_idx" ON "public"."HoaDon"("khachhangId");

-- CreateIndex
CREATE INDEX "HoaDon_trangThai_idx" ON "public"."HoaDon"("trangThai");

-- CreateIndex
CREATE INDEX "HoaDonMuaVao_nhacungcapId_idx" ON "public"."HoaDonMuaVao"("nhacungcapId");

-- CreateIndex
CREATE UNIQUE INDEX "KhoaSoKeToan_nam_thang_key" ON "public"."KhoaSoKeToan"("nam", "thang");

-- AddForeignKey
ALTER TABLE "public"."LienheKhachhang" ADD CONSTRAINT "LienheKhachhang_khachhangId_fkey" FOREIGN KEY ("khachhangId") REFERENCES "public"."Khachhang"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ButToanChiTiet" ADD CONSTRAINT "ButToanChiTiet_butToanId_fkey" FOREIGN KEY ("butToanId") REFERENCES "public"."ButToan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

