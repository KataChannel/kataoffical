-- CreateEnum
CREATE TYPE "LoaiGiaoDichKho" AS ENUM ('NHAP', 'XUAT', 'KIEM_KE', 'DIEU_CHINH', 'CHUYEN_KHO', 'HUY_HANG');

-- CreateEnum
CREATE TYPE "TrangThaiChotKho" AS ENUM ('DANG_MO', 'DA_CHOT', 'TAM_KHOA');

-- AlterTable
ALTER TABLE "TonKho" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "LichSuTonKho" (
    "id" TEXT NOT NULL,
    "tonKhoId" TEXT NOT NULL,
    "loaiGiaoDich" "LoaiGiaoDichKho" NOT NULL,
    "soLuongTruoc" DECIMAL(20,2) NOT NULL DEFAULT 0,
    "soLuongSauQuay" DECIMAL(20,2) NOT NULL DEFAULT 0,
    "soLuongSau" DECIMAL(20,2) NOT NULL DEFAULT 0,
    "donGia" DECIMAL(20,2) DEFAULT 0,
    "thanhTien" DECIMAL(20,2) DEFAULT 0,
    "phieuKhoId" TEXT,
    "donhangId" TEXT,
    "chotKhoId" TEXT,
    "userId" TEXT,
    "lyDo" TEXT,
    "ghichu" TEXT,
    "soChungTu" TEXT,
    "ngayGiaoDich" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LichSuTonKho_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChotKho" (
    "id" TEXT NOT NULL,
    "maChotKho" TEXT NOT NULL,
    "tenChotKho" TEXT NOT NULL,
    "tuNgay" TIMESTAMP(3) NOT NULL,
    "denNgay" TIMESTAMP(3) NOT NULL,
    "trangThai" "TrangThaiChotKho" NOT NULL DEFAULT 'DANG_MO',
    "userId" TEXT,
    "ngayChot" TIMESTAMP(3),
    "ghichu" TEXT,
    "tongSanPham" INTEGER DEFAULT 0,
    "tongGiaTri" DECIMAL(20,2) DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChotKho_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChiTietChotKho" (
    "id" TEXT NOT NULL,
    "chotKhoId" TEXT NOT NULL,
    "sanphamId" TEXT NOT NULL,
    "slTonDauKy" DECIMAL(20,2) NOT NULL DEFAULT 0,
    "slNhapTrongKy" DECIMAL(20,2) NOT NULL DEFAULT 0,
    "slXuatTrongKy" DECIMAL(20,2) NOT NULL DEFAULT 0,
    "slDieuChinhTrongKy" DECIMAL(20,2) NOT NULL DEFAULT 0,
    "slTonCuoiKy" DECIMAL(20,2) NOT NULL DEFAULT 0,
    "donGiaTrungBinh" DECIMAL(20,2) DEFAULT 0,
    "giaTri" DECIMAL(20,2) DEFAULT 0,
    "ghichu" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChiTietChotKho_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "LichSuTonKho_tonKhoId_idx" ON "LichSuTonKho"("tonKhoId");

-- CreateIndex
CREATE INDEX "LichSuTonKho_ngayGiaoDich_idx" ON "LichSuTonKho"("ngayGiaoDich");

-- CreateIndex
CREATE INDEX "LichSuTonKho_loaiGiaoDich_idx" ON "LichSuTonKho"("loaiGiaoDich");

-- CreateIndex
CREATE INDEX "LichSuTonKho_phieuKhoId_idx" ON "LichSuTonKho"("phieuKhoId");

-- CreateIndex
CREATE INDEX "LichSuTonKho_donhangId_idx" ON "LichSuTonKho"("donhangId");

-- CreateIndex
CREATE UNIQUE INDEX "ChotKho_maChotKho_key" ON "ChotKho"("maChotKho");

-- CreateIndex
CREATE INDEX "ChotKho_tuNgay_denNgay_idx" ON "ChotKho"("tuNgay", "denNgay");

-- CreateIndex
CREATE INDEX "ChotKho_trangThai_idx" ON "ChotKho"("trangThai");

-- CreateIndex
CREATE INDEX "ChotKho_ngayChot_idx" ON "ChotKho"("ngayChot");

-- CreateIndex
CREATE INDEX "ChiTietChotKho_chotKhoId_idx" ON "ChiTietChotKho"("chotKhoId");

-- CreateIndex
CREATE INDEX "ChiTietChotKho_sanphamId_idx" ON "ChiTietChotKho"("sanphamId");

-- CreateIndex
CREATE UNIQUE INDEX "ChiTietChotKho_chotKhoId_sanphamId_key" ON "ChiTietChotKho"("chotKhoId", "sanphamId");

-- AddForeignKey
ALTER TABLE "LichSuTonKho" ADD CONSTRAINT "LichSuTonKho_tonKhoId_fkey" FOREIGN KEY ("tonKhoId") REFERENCES "TonKho"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LichSuTonKho" ADD CONSTRAINT "LichSuTonKho_phieuKhoId_fkey" FOREIGN KEY ("phieuKhoId") REFERENCES "PhieuKho"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LichSuTonKho" ADD CONSTRAINT "LichSuTonKho_donhangId_fkey" FOREIGN KEY ("donhangId") REFERENCES "Donhang"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LichSuTonKho" ADD CONSTRAINT "LichSuTonKho_chotKhoId_fkey" FOREIGN KEY ("chotKhoId") REFERENCES "ChotKho"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LichSuTonKho" ADD CONSTRAINT "LichSuTonKho_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChotKho" ADD CONSTRAINT "ChotKho_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChiTietChotKho" ADD CONSTRAINT "ChiTietChotKho_chotKhoId_fkey" FOREIGN KEY ("chotKhoId") REFERENCES "ChotKho"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChiTietChotKho" ADD CONSTRAINT "ChiTietChotKho_sanphamId_fkey" FOREIGN KEY ("sanphamId") REFERENCES "Sanpham"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
