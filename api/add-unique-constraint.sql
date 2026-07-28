-- Add unique constraint to prevent duplicate banggia-sanpham combinations
ALTER TABLE "Banggiasanpham" 
ADD CONSTRAINT "unique_banggia_sanpham" 
UNIQUE ("banggiaId", "sanphamId");
