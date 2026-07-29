-- AlterTable
ALTER TABLE "public"."ChotCongNoChiTiet" ADD COLUMN     "donGia" DECIMAL(20,3) NOT NULL DEFAULT 0,
ADD COLUMN     "donhangsanphamId" TEXT,
ADD COLUMN     "dvt" TEXT,
ADD COLUMN     "masp" TEXT,
ADD COLUMN     "sanphamId" TEXT,
ADD COLUMN     "soLuongChot" DECIMAL(20,3) NOT NULL DEFAULT 0,
ADD COLUMN     "soLuongHeThong" DECIMAL(20,3) NOT NULL DEFAULT 0,
ADD COLUMN     "tenSp" TEXT;

