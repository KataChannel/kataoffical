-- Refactor: dùng lại Nhomkhachhang thay cho model HeThongKhachHang riêng.
-- Chốt/công nợ/thu CHUNG chạy trên thành viên nhóm (bảng nối ẩn "_KhachhangNhom").
-- Idempotent — an toàn khi chạy lại trên DB đã migrate.

-- AlterTable: cờ chốt chung cho nhóm
ALTER TABLE "public"."Nhomkhachhang" ADD COLUMN IF NOT EXISTS "chotChung" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable: ChotCongNo gắn nhóm thay vì hệ thống
ALTER TABLE "public"."ChotCongNo" ADD COLUMN IF NOT EXISTS "nhomId" TEXT;
ALTER TABLE "public"."ChotCongNo" DROP COLUMN IF EXISTS "heThongId";

-- AlterTable: PhieuThuChi (thu chung) gắn nhóm thay vì hệ thống
ALTER TABLE "public"."PhieuThuChi" ADD COLUMN IF NOT EXISTS "nhomId" TEXT;
ALTER TABLE "public"."PhieuThuChi" DROP COLUMN IF EXISTS "heThongId";

-- AlterTable: bỏ liên kết hệ thống trên Khachhang (thay bằng membership nhóm)
ALTER TABLE "public"."Khachhang" DROP COLUMN IF EXISTS "heThongId";

-- DropTable: model hệ thống trùng lặp
DROP TABLE IF EXISTS "public"."HeThongKhachHang";
