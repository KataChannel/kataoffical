-- Find duplicate Banggia records based on mabanggia + batdau + ketthuc
SELECT 
  mabanggia, 
  batdau, 
  ketthuc, 
  COUNT(*) as count,
  STRING_AGG(id::text, ', ') as ids
FROM "Banggia"
WHERE mabanggia IS NOT NULL 
  AND batdau IS NOT NULL 
  AND ketthuc IS NOT NULL
GROUP BY mabanggia, batdau, ketthuc
HAVING COUNT(*) > 1
ORDER BY count DESC;
