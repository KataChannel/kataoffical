-- Fix duplicate Banggia records
-- Strategy: Keep the latest record (newest createdAt), delete others

-- First, let's see what we have
SELECT 
  mabanggia, 
  batdau::date as batdau_date, 
  ketthuc::date as ketthuc_date, 
  COUNT(*) as count
FROM "Banggia"
WHERE mabanggia IS NOT NULL 
  AND batdau IS NOT NULL 
  AND ketthuc IS NOT NULL
GROUP BY mabanggia, batdau::date, ketthuc::date
HAVING COUNT(*) > 1;

-- If there are duplicates, we'll delete them keeping the newest one
-- This will be done in a separate step after reviewing
