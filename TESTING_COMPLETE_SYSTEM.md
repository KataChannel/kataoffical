# 🧪 Complete Testing Guide - Price History System

## Quick Test Scenarios

### Scenario 1: Create Order with Price Tracking

**Step 1: Create an order**
```http
POST http://localhost:3000/donhang
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN

{
  "title": "Test Order",
  "type": "donsi",
  "ngaygiao": "2025-01-15",
  "khachhangId": "{your-khachhang-id}",
  "banggiaId": "{your-banggia-id}",
  "vat": 0.05,
  "sanpham": [
    {
      "idSP": "{sanpham-id}",
      "giaban": 15000,
      "sldat": 10,
      "slgiao": 0,
      "slnhan": 0
    }
  ]
}
```

**Step 2: Verify metadata stored**
```sql
SELECT 
  d.madonhang,
  ds.ghichu,
  ds.giaban,
  s.masp
FROM "Donhang" d
JOIN "Donhangsanpham" ds ON ds."donhangId" = d.id
JOIN "Sanpham" s ON s.id = ds."idSP"
WHERE d.madonhang = 'DH0001'  -- Replace with your order code
```

Expected ghichu format:
```json
{
  "banggiaId": "84a62698-...",
  "sanphamId": "sp-...",
  "capturedAt": "2025-01-10T14:30:00.000Z",
  "priceSource": "banggia",
  "actualPrice": 15000,
  "userNote": ""
}
```

---

### Scenario 2: Update Price in Banggia

**Step 1: Update product price**
```http
PATCH http://localhost:3000/banggia/{banggiaId}
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN

{
  "title": "Bảng giá test",
  "sanpham": [
    {
      "sanphamId": "{sanpham-id}",
      "giaban": 20000  // Changed from 15000 to 20000
    }
  ],
  "userId": "test-user"
}
```

**Step 2: Check AuditLog**
```sql
SELECT 
  "entityName",
  "action",
  "oldValues",
  "newValues",
  "metadata",
  "timestamp"
FROM "AuditLog"
WHERE "entityName" = 'Banggiasanpham'
  AND "metadata"->>'sanphamId' = '{sanpham-id}'
ORDER BY "timestamp" DESC
LIMIT 5;
```

Expected result:
```json
{
  "entityName": "Banggiasanpham",
  "action": "UPDATE",
  "oldValues": {"giaban": 15000},
  "newValues": {"giaban": 20000},
  "metadata": {
    "banggiaId": "...",
    "sanphamId": "...",
    "priceChange": {
      "oldPrice": 15000,
      "newPrice": 20000,
      "difference": 5000,
      "percentChange": 33.33
    }
  }
}
```

---

### Scenario 3: Verify Order Prices

**Step 1: Get price history**
```http
GET http://localhost:3000/banggia/{banggiaId}/sanpham/{sanphamId}/price-history
```

Expected response:
```json
{
  "sanphamId": "sp-123",
  "banggiaId": "bg-456",
  "history": [
    {
      "timestamp": "2025-01-10T15:00:00.000Z",
      "oldPrice": 15000,
      "newPrice": 20000,
      "difference": 5000,
      "percentChange": 33.33,
      "userId": "test-user",
      "reason": "Price updated via banggia update"
    }
  ]
}
```

**Step 2: Verify order prices**
```http
GET http://localhost:3000/donhang/verify-prices/{donhangId}
```

Expected response:
```json
{
  "donhangId": "dh-789",
  "madonhang": "DH0001",
  "verifiedAt": "2025-01-10T16:00:00.000Z",
  "totalItems": 1,
  "hasDiscrepancies": true,
  "discrepancies": [
    {
      "sanphamId": "sp-123",
      "sanphamCode": "SP001",
      "sanphamTitle": "Rau xanh",
      "issue": "PRICE_CHANGED",
      "orderPrice": 15000,
      "currentPrice": 20000,
      "difference": 5000,
      "percentChange": 33.33,
      "capturedAt": "2025-01-10T14:30:00.000Z",
      "message": "Giá đã thay đổi 33.33% so với khi đặt hàng"
    }
  ]
}
```

---

### Scenario 4: Large Price Change Warning

**Test**: Update price by >50% should work but note the change

```http
PATCH http://localhost:3000/banggia/{banggiaId}
{
  "sanpham": [
    {
      "sanphamId": "{sanpham-id}",
      "giaban": 30000  // 100% increase from 15000
    }
  ],
  "userId": "admin-user"
}
```

Check AuditLog - should have warning in metadata:
```sql
SELECT "metadata"->'priceChange'->>'percentChange' as percent_change
FROM "AuditLog"
WHERE "entityName" = 'Banggiasanpham'
ORDER BY "timestamp" DESC
LIMIT 1;
```

---

### Scenario 5: Bulk Price Update

```http
POST http://localhost:3000/banggia/bulk-update-prices
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN

{
  "updates": [
    {
      "banggiaId": "{bg-id}",
      "sanphamId": "{sp1-id}",
      "newPrice": 12000,
      "reason": "Giảm giá khuyến mãi"
    },
    {
      "banggiaId": "{bg-id}",
      "sanphamId": "{sp2-id}",
      "newPrice": 25000,
      "reason": "Tăng giá theo thị trường"
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
  "results": [
    {
      "action": "UPDATED",
      "banggiaId": "...",
      "sanphamId": "sp1-id",
      "oldPrice": 10000,
      "newPrice": 12000
    },
    {
      "action": "UPDATED",
      "banggiaId": "...",
      "sanphamId": "sp2-id",
      "oldPrice": 20000,
      "newPrice": 25000
    }
  ]
}
```

---

### Scenario 6: Historical Price Query

**Get price at specific date**
```http
GET http://localhost:3000/donhang/price-at-date?banggiaId={bg-id}&sanphamId={sp-id}&date=2025-01-05T00:00:00.000Z
```

Expected response:
```json
{
  "banggiaId": "bg-123",
  "sanphamId": "sp-456",
  "date": "2025-01-05T00:00:00.000Z",
  "price": 9500,
  "priceChangeDate": "2025-01-04T08:30:00.000Z",
  "metadata": {
    "oldPrice": 9000,
    "newPrice": 9500,
    "reason": "Seasonal adjustment"
  }
}
```

---

## SQL Verification Queries

### 1. Check Price Metadata in Orders
```sql
SELECT 
  d.madonhang,
  d.status,
  d."createdAt",
  s.masp,
  s.title as sanpham,
  ds.giaban,
  ds.ghichu::jsonb->>'banggiaId' as banggia_used,
  ds.ghichu::jsonb->>'capturedAt' as price_captured_at,
  ds.ghichu::jsonb->>'actualPrice' as actual_price
FROM "Donhang" d
JOIN "Donhangsanpham" ds ON ds."donhangId" = d.id
JOIN "Sanpham" s ON s.id = ds."idSP"
WHERE ds.ghichu LIKE '{%'
ORDER BY d."createdAt" DESC
LIMIT 10;
```

### 2. Find Orders with Price Changes
```sql
WITH order_prices AS (
  SELECT 
    d.id as donhang_id,
    d.madonhang,
    ds."idSP" as sanpham_id,
    ds.giaban as order_price,
    ds.ghichu::jsonb->>'banggiaId' as banggia_id,
    d."createdAt"
  FROM "Donhang" d
  JOIN "Donhangsanpham" ds ON ds."donhangId" = d.id
  WHERE ds.ghichu LIKE '{%'
    AND d.status IN ('dadat', 'dagiao')
),
current_prices AS (
  SELECT 
    "banggiaId",
    "sanphamId",
    giaban as current_price
  FROM "Banggiasanpham"
)
SELECT 
  op.madonhang,
  s.masp,
  s.title,
  op.order_price,
  cp.current_price,
  (cp.current_price - op.order_price) as difference,
  ROUND(((cp.current_price - op.order_price) / op.order_price * 100)::numeric, 2) as percent_change
FROM order_prices op
JOIN current_prices cp ON cp."banggiaId" = op.banggia_id AND cp."sanphamId" = op.sanpham_id
JOIN "Sanpham" s ON s.id = op.sanpham_id
WHERE cp.current_price != op.order_price
ORDER BY ABS(percent_change) DESC;
```

### 3. Price Change History
```sql
SELECT 
  "metadata"->>'sanphamCode' as masp,
  "metadata"->'priceChange'->>'oldPrice' as old_price,
  "metadata"->'priceChange'->>'newPrice' as new_price,
  "metadata"->'priceChange'->>'percentChange' as percent_change,
  "metadata"->>'reason' as reason,
  "userId",
  "timestamp"
FROM "AuditLog"
WHERE "entityName" = 'Banggiasanpham'
  AND "action" IN ('UPDATE', 'CREATE')
ORDER BY "timestamp" DESC
LIMIT 20;
```

### 4. Audit Log Volume Check
```sql
SELECT 
  DATE("timestamp") as date,
  COUNT(*) as price_changes,
  COUNT(DISTINCT "metadata"->>'sanphamId') as unique_products,
  AVG(("metadata"->'priceChange'->>'percentChange')::numeric) as avg_percent_change
FROM "AuditLog"
WHERE "entityName" = 'Banggiasanpham'
  AND "timestamp" > NOW() - INTERVAL '30 days'
GROUP BY DATE("timestamp")
ORDER BY date DESC;
```

---

## Postman/Thunder Client Collection

### Environment Variables
```json
{
  "baseUrl": "http://localhost:3000",
  "token": "your-jwt-token",
  "banggiaId": "84a62698-5784-4ac3-b506-5e662d1511cb",
  "sanphamId": "your-sanpham-id",
  "khachhangId": "your-khachhang-id",
  "donhangId": "your-donhang-id"
}
```

### Collection Structure
```
Price History System/
├─ Banggia/
│  ├─ Update Price (PATCH /banggia/:id)
│  ├─ Get Price History (GET /banggia/:id/sanpham/:spId/price-history)
│  ├─ Get Current Price (GET /banggia/:id/sanpham/:spId/current-price)
│  └─ Bulk Update Prices (POST /banggia/bulk-update-prices)
├─ Donhang/
│  ├─ Create Order (POST /donhang)
│  ├─ Verify Prices (GET /donhang/verify-prices/:id)
│  └─ Get Price at Date (GET /donhang/price-at-date)
└─ Database/
   └─ (SQL queries in description field)
```

---

## Expected Behaviors Checklist

### ✅ Order Creation
- [ ] Order created successfully
- [ ] donhangsanpham.ghichu contains JSON metadata
- [ ] Metadata includes banggiaId, sanphamId, capturedAt, actualPrice
- [ ] User note preserved in metadata.userNote

### ✅ Price Updates
- [ ] Price update creates AuditLog entry
- [ ] AuditLog has correct entityName='Banggiasanpham'
- [ ] Metadata includes priceChange with oldPrice, newPrice, difference, percentChange
- [ ] Large changes (>50%) are logged but allowed

### ✅ Price History
- [ ] GET price-history returns array of changes
- [ ] History sorted by timestamp descending
- [ ] Each entry has complete metadata
- [ ] Empty history returns empty array (not error)

### ✅ Price Verification
- [ ] Verify endpoint compares order vs current prices
- [ ] Discrepancies identified correctly
- [ ] Percentage changes calculated accurately
- [ ] Orders without metadata handled gracefully

### ✅ Bulk Operations
- [ ] Bulk update processes all items
- [ ] Partial failures don't break entire batch
- [ ] Success/fail counts accurate
- [ ] Each item has individual AuditLog entry

### ✅ Historical Queries
- [ ] Price at date returns correct historical value
- [ ] Handles dates before first price change
- [ ] Handles dates after last price change
- [ ] Returns null for non-existent price

---

## Common Issues & Solutions

### Issue 1: TypeScript Errors
**Problem**: "Cannot find module 'prisma/prisma.service'"  
**Solution**: Import path should be `'prisma/prisma.service'` not `'../prisma/prisma.service'`

### Issue 2: Circular Dependency
**Problem**: BanggiaModule and DonhangModule import each other  
**Solution**: BanggiaModule exports BanggiaPriceHistoryService, DonhangModule imports BanggiaModule

### Issue 3: JSON Parse Errors
**Problem**: ghichu field not valid JSON  
**Solution**: extractPriceMetadata() has try-catch for backward compatibility

### Issue 4: No Price History
**Problem**: getPriceHistory returns empty array  
**Solution**: Check if BanggiasanphamHistory exists OR if AuditLog has Banggiasanpham entries

### Issue 5: Large Price Changes
**Problem**: >50% price change rejected  
**Solution**: Include "reason" field when updating price

---

## Performance Testing

### Load Test: Bulk Price Updates
```bash
# Test 100 concurrent price updates
for i in {1..100}; do
  curl -X POST http://localhost:3000/banggia/bulk-update-prices \
    -H "Content-Type: application/json" \
    -d '{...}' &
done
wait
```

### Database Query Performance
```sql
-- Should use index on entityName + timestamp
EXPLAIN ANALYZE
SELECT * FROM "AuditLog"
WHERE "entityName" = 'Banggiasanpham'
  AND "timestamp" > NOW() - INTERVAL '30 days';

-- Consider adding index if slow:
CREATE INDEX idx_auditlog_entity_timestamp 
ON "AuditLog"("entityName", "timestamp" DESC);
```

---

## Conclusion

✅ **Ready to Test**:
1. Start with Scenario 1 (Create Order)
2. Verify metadata stored correctly
3. Test price updates (Scenario 2)
4. Verify price tracking works (Scenario 3)
5. Test edge cases (large changes, bulk operations)

📊 **Success Metrics**:
- All orders have price metadata
- Price changes logged to AuditLog
- Verification returns accurate discrepancies
- System performance acceptable (<200ms per request)

🎯 **Next**: Production deployment or frontend integration!
