-- CreateIndex
-- Add unique constraint for mabanggia + batdau + ketthuc
CREATE UNIQUE INDEX "unique_banggia_time_range" ON "Banggia"("mabanggia", "batdau", "ketthuc");

-- CreateIndex  
-- Add index for mabanggia to improve query performance
CREATE INDEX "Banggia_mabanggia_idx" ON "Banggia"("mabanggia");

-- CreateIndex
-- Add composite index for batdau and ketthuc to improve date range queries
CREATE INDEX "Banggia_batdau_ketthuc_idx" ON "Banggia"("batdau", "ketthuc");
