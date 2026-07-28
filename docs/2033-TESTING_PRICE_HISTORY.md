# Price History Testing Guide

## Quick Manual Test

### 1. Update a Price
```http
PATCH /banggia/{banggiaId}
Content-Type: application/json

{
  "title": "Bảng giá test",
  "sanpham": [
    {
      "sanphamId": "{sanphamId}",
      "giaban": 15000
    }
  ],
  "userId": "test-user"
}
```

### 2. Check AuditLog
```sql
SELECT * FROM "AuditLog" 
WHERE "entityName" = 'Banggiasanpham' 
ORDER BY "timestamp" DESC 
LIMIT 10;
```

### 3. Get Price History via API
```http
GET /banggia/{banggiaId}/sanpham/{sanphamId}/price-history
```

Expected response:
```json
{
  "sanphamId": "...",
  "banggiaId": "...",
  "history": [
    {
      "timestamp": "2025-01-10T...",
      "oldPrice": 10000,
      "newPrice": 15000,
      "difference": 5000,
      "percentChange": 50,
      "userId": "test-user",
      "reason": "Price updated via banggia update",
      "banggiaCode": "...",
      "sanphamCode": "..."
    }
  ]
}
```

### 4. Test Large Price Change (should require reason)
```http
PATCH /banggia/{banggiaId}
{
  "sanpham": [
    {
      "sanphamId": "{sanphamId}",
      "giaban": 30000  // >50% increase
    }
  ],
  "userId": "test-user"
}
```

Expected: Should succeed but log warning in metadata

### 5. Test Bulk Update
```http
POST /banggia/bulk-update-prices
{
  "updates": [
    {
      "banggiaId": "{bg1}",
      "sanphamId": "{sp1}",
      "newPrice": 12000,
      "reason": "Giảm giá khuyến mãi"
    },
    {
      "banggiaId": "{bg1}",
      "sanphamId": "{sp2}",
      "newPrice": 25000
    }
  ],
  "userId": "admin-user"
}
```

Expected response:
```json
{
  "success": 2,
  "failed": 0,
  "results": [...]
}
```

## Database Verification

### Check AuditLog metadata structure
```sql
SELECT 
  "entityId",
  "action",
  "userId",
  "oldValues",
  "newValues",
  "metadata"
FROM "AuditLog"
WHERE "entityName" = 'Banggiasanpham'
  AND "metadata"->>'banggiaId' IS NOT NULL
ORDER BY "timestamp" DESC;
```

### Count price changes per product
```sql
SELECT 
  "metadata"->>'sanphamCode' as "sanpham",
  "metadata"->>'banggiaCode' as "banggia",
  COUNT(*) as "priceChanges"
FROM "AuditLog"
WHERE "entityName" = 'Banggiasanpham'
GROUP BY "metadata"->>'sanphamCode', "metadata"->>'banggiaCode"
ORDER BY "priceChanges" DESC;
```

## Postman/Thunder Client Collection

Create a collection with these requests:

1. **Get Current Price**
   - GET `{{baseUrl}}/banggia/{{banggiaId}}/sanpham/{{sanphamId}}/current-price`

2. **Get Price History**
   - GET `{{baseUrl}}/banggia/{{banggiaId}}/sanpham/{{sanphamId}}/price-history`

3. **Update Banggia Price**
   - PATCH `{{baseUrl}}/banggia/{{banggiaId}}`
   - Body: (see above)

4. **Bulk Update Prices**
   - POST `{{baseUrl}}/banggia/bulk-update-prices`
   - Body: (see above)

## Environment Variables
```
baseUrl=http://localhost:3000
banggiaId=<your-test-banggia-id>
sanphamId=<your-test-sanpham-id>
```

## Expected Results Checklist

- [ ] Price updates create AuditLog entries
- [ ] AuditLog has correct metadata structure
- [ ] Price history API returns formatted data
- [ ] Large price changes (>50%) require reason
- [ ] Bulk updates handle partial failures
- [ ] Current price endpoint returns latest
- [ ] No TypeScript compilation errors
- [ ] No runtime errors in console
