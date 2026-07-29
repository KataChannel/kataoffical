-- Vòng đời biên bản chốt: bổ sung trạng thái HUY + audit huỷ (đảo bút toán/giảm trừ).
-- Idempotent.
ALTER TABLE "public"."ChotCongNo"
  ADD COLUMN IF NOT EXISTS "lyDoHuy"  TEXT,
  ADD COLUMN IF NOT EXISTS "ngayHuy"  TIMESTAMP(3),
  ADD COLUMN IF NOT EXISTS "nguoiHuy" TEXT;
