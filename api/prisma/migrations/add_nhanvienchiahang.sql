-- Add nhanvienchiahang column to Donhang table
ALTER TABLE "Donhang" ADD COLUMN IF NOT EXISTS "nhanvienchiahang" TEXT;
