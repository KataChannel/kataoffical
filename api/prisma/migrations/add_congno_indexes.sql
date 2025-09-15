-- Performance optimization indexes for congnokhachhang endpoint

-- Index on ngaygiao for date range queries
CREATE INDEX IF NOT EXISTS "Donhang_ngaygiao_idx" ON "Donhang" ("ngaygiao");

-- Index on status for status filtering
CREATE INDEX IF NOT EXISTS "Donhang_status_idx" ON "Donhang" ("status");

-- Index on khachhangId for customer filtering
CREATE INDEX IF NOT EXISTS "Donhang_khachhangId_idx" ON "Donhang" ("khachhangId");

-- Composite index for the most common query pattern (date range + status)
CREATE INDEX IF NOT EXISTS "Donhang_ngaygiao_status_idx" ON "Donhang" ("ngaygiao", "status");

-- Composite index for customer filtering with date range
CREATE INDEX IF NOT EXISTS "Donhang_khachhangId_ngaygiao_idx" ON "Donhang" ("khachhangId", "ngaygiao");

-- Index on createdAt for ordering (if not exists)
CREATE INDEX IF NOT EXISTS "Donhang_createdAt_idx" ON "Donhang" ("createdAt");

-- Index on madonhang for text search (if using gin for full text search)
-- CREATE INDEX IF NOT EXISTS "Donhang_madonhang_gin_idx" ON "Donhang" USING gin(to_tsvector('simple', "madonhang"));

-- Index on Donhangsanpham for join performance
CREATE INDEX IF NOT EXISTS "Donhangsanpham_donhangId_idx" ON "Donhangsanpham" ("donhangId");

-- Index on Khachhang name for search
CREATE INDEX IF NOT EXISTS "Khachhang_name_idx" ON "Khachhang" ("name");
