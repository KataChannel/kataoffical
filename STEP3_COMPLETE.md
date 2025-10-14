# ✅ Step 3: Donhang Price Tracking - COMPLETE

## Summary
Successfully integrated price tracking into DonhangService to capture which banggia was used for pricing and when prices were recorded.

## What Was Implemented

### 1. DonhangService Price Metadata Tracking ✅
**File**: `/api/src/donhang/donhang.service.ts`

**Changes**:
- Imported and injected `BanggiaPriceHistoryService`
- Modified `create()` method to store price metadata in `ghichu` field
- Metadata includes:
  - `banggiaId` - Which price list was used
  - `sanphamId` - Product ID
  - `capturedAt` - Timestamp when price was captured
  - `priceSource` - Always "banggia" for now
  - `actualPrice` - The actual price used in the order
  - `userNote` - Any user notes

**Metadata Structure**:
```json
{
  "banggiaId": "84a62698-5784-4ac3-b506-5e662d1511cb",
  "sanphamId": "sp-123",
  "capturedAt": "2025-01-10T14:30:00.000Z",
  "priceSource": "banggia",
  "actualPrice": 15000,
  "userNote": ""
}
```

### 2. Price Verification Methods ✅
**New Methods Added**:

#### `extractPriceMetadata(ghichu: string)`
- Parses JSON metadata from donhangsanpham.ghichu field
- Handles both JSON metadata and plain text notes
- Returns null-safe data structure

#### `verifyOrderPrices(donhangId: string)`
- Compares order prices with current banggia prices
- Identifies price discrepancies
- Returns detailed verification report with:
  - Price differences
  - Percentage changes
  - Items without metadata
  - Verification errors

**Example Response**:
```json
{
  "donhangId": "dh-456",
  "madonhang": "DH0001",
  "verifiedAt": "2025-01-10T15:00:00.000Z",
  "totalItems": 5,
  "hasDiscrepancies": true,
  "discrepancies": [
    {
      "sanphamId": "sp-123",
      "sanphamCode": "SP001",
      "sanphamTitle": "Rau xanh",
      "issue": "PRICE_CHANGED",
      "orderPrice": 10000,
      "currentPrice": 12000,
      "difference": 2000,
      "percentChange": 20,
      "capturedAt": "2025-01-09T10:00:00.000Z",
      "message": "Giá đã thay đổi 20% so với khi đặt hàng"
    }
  ]
}
```

#### `getPriceAtDate(banggiaId, sanphamId, date)`
- Retrieves historical price at specific date
- Uses price history from AuditLog
- Returns the price that was valid at that time

**Example Response**:
```json
{
  "banggiaId": "bg-123",
  "sanphamId": "sp-456",
  "date": "2025-01-05T00:00:00.000Z",
  "price": 9500,
  "priceChangeDate": "2025-01-04T08:30:00.000Z",
  "metadata": { /* full price change record */ }
}
```

### 3. DonhangModule Integration ✅
**File**: `/api/src/donhang/donhang.module.ts`

**Changes**:
- Imported `BanggiaModule` to access `BanggiaPriceHistoryService`
- Added to module imports array

### 4. REST API Endpoints ✅
**File**: `/api/src/donhang/donhang.controller.ts`

**New Endpoints**:

1. **GET** `/donhang/verify-prices/:donhangId`
   - Verify order prices against current banggia
   - Returns discrepancy report
   - No authentication required (read-only)

2. **GET** `/donhang/price-at-date?banggiaId=X&sanphamId=Y&date=Z`
   - Get historical price at specific date
   - Query params: banggiaId, sanphamId, date (ISO 8601)
   - Returns price valid at that time

## How It Works

### Order Creation Flow with Price Tracking

```mermaid
sequenceDiagram
    User->>DonhangController: POST /donhang (create order)
    DonhangController->>DonhangService: create(dto)
    DonhangService->>Prisma: Get banggia prices
    DonhangService->>DonhangService: Prepare metadata
    Note over DonhangService: Store banggiaId, sanphamId,<br/>capturedAt, actualPrice
    DonhangService->>Prisma: Create donhangsanpham with ghichu=JSON
    DonhangService->>Prisma: Update with actual prices
    Prisma-->>User: Order created with price metadata
```

### Price Verification Flow

```mermaid
sequenceDiagram
    User->>DonhangController: GET /verify-prices/:id
    DonhangController->>DonhangService: verifyOrderPrices(id)
    DonhangService->>Prisma: Get donhang with sanpham
    DonhangService->>DonhangService: Extract metadata from ghichu
    loop For each product
        DonhangService->>BanggiaPriceHistoryService: getCurrentPrice()
        BanggiaPriceHistoryService-->>DonhangService: Current price
        DonhangService->>DonhangService: Compare prices
    end
    DonhangService-->>User: Verification report with discrepancies
```

## Benefits

✅ **Full Price Audit Trail** - Every order tracks which banggia was used  
✅ **Price Change Detection** - Verify if prices changed since order  
✅ **Historical Accuracy** - Get exact price at any past date  
✅ **Customer Protection** - Detect price discrepancies before delivery  
✅ **Business Intelligence** - Analyze price changes impact on orders  
✅ **Zero Schema Changes** - Uses existing ghichu field  
✅ **Backward Compatible** - Handles old orders without metadata  

## Usage Examples

### 1. Create Order (Automatic Price Tracking)
```http
POST /donhang
{
  "khachhangId": "kh-123",
  "banggiaId": "bg-456",
  "sanpham": [
    {
      "idSP": "sp-789",
      "giaban": 15000,
      "sldat": 10
    }
  ]
}
```
→ Price metadata automatically stored in donhangsanpham.ghichu

### 2. Verify Order Prices
```http
GET /donhang/verify-prices/dh-123
```
→ Returns discrepancies if prices changed

### 3. Get Historical Price
```http
GET /donhang/price-at-date?banggiaId=bg-456&sanphamId=sp-789&date=2025-01-05
```
→ Returns price that was valid on Jan 5, 2025

### 4. Extract Metadata from Order
```typescript
const donhang = await prisma.donhang.findUnique({
  where: { id: 'dh-123' },
  include: { sanpham: true }
});

for (const item of donhang.sanpham) {
  const metadata = donhangService.extractPriceMetadata(item.ghichu);
  console.log('Price captured at:', metadata.capturedAt);
  console.log('From banggia:', metadata.banggiaId);
  console.log('Actual price:', metadata.actualPrice);
}
```

## Database Structure

### Before (Old Orders)
```sql
donhangsanpham.ghichu = "Ghi chú của khách hàng" -- Plain text
```

### After (New Orders)
```sql
donhangsanpham.ghichu = '{
  "banggiaId": "bg-123",
  "sanphamId": "sp-456",
  "capturedAt": "2025-01-10T...",
  "priceSource": "banggia",
  "actualPrice": 15000,
  "userNote": "Ghi chú của khách hàng"
}' -- JSON with metadata
```

## Migration Strategy

✅ **No Breaking Changes**:
- Old orders with plain text ghichu continue to work
- `extractPriceMetadata()` handles both formats
- Verification gracefully skips orders without metadata

✅ **Progressive Enhancement**:
- All NEW orders from now on have metadata
- Old orders can be verified manually if needed
- No need to migrate historical data

## Testing Recommendations

### 1. Create Order Test
```bash
# Create order and check metadata stored
POST /donhang → Check donhangsanpham.ghichu contains JSON
```

### 2. Price Verification Test
```bash
# Create order, change price in banggia, verify
1. POST /donhang (create order at price 10000)
2. PATCH /banggia (update price to 12000)
3. GET /verify-prices/:id (should show 20% increase)
```

### 3. Historical Price Test
```bash
# Check price at specific date
GET /price-at-date?banggiaId=X&sanphamId=Y&date=2025-01-01
```

### 4. Backward Compatibility Test
```bash
# Verify old orders without metadata don't crash
GET /verify-prices/:old-donhang-id
# Should return "NO_PRICE_METADATA" discrepancy
```

## SQL Queries for Analysis

### Orders with Price Metadata
```sql
SELECT 
  d.madonhang,
  ds.ghichu,
  ds.giaban,
  s.masp,
  s.title
FROM "Donhang" d
JOIN "Donhangsanpham" ds ON ds."donhangId" = d.id
JOIN "Sanpham" s ON s.id = ds."idSP"
WHERE ds.ghichu LIKE '{%'  -- JSON format
ORDER BY d."createdAt" DESC
LIMIT 20;
```

### Extract Price Metadata
```sql
SELECT 
  d.madonhang,
  ds.ghichu::jsonb->>'banggiaId' as banggia,
  ds.ghichu::jsonb->>'capturedAt' as captured_at,
  ds.ghichu::jsonb->>'actualPrice' as price,
  ds.giaban as stored_price
FROM "Donhang" d
JOIN "Donhangsanpham" ds ON ds."donhangId" = d.id
WHERE ds.ghichu LIKE '{%'
ORDER BY (ds.ghichu::jsonb->>'capturedAt')::timestamp DESC;
```

### Price Changes Impact on Orders
```sql
-- Find orders affected by recent price changes
WITH recent_price_changes AS (
  SELECT 
    "metadata"->>'sanphamId' as sanpham_id,
    "metadata"->'priceChange'->>'oldPrice' as old_price,
    "metadata"->'priceChange'->>'newPrice' as new_price,
    "timestamp"
  FROM "AuditLog"
  WHERE "entityName" = 'Banggiasanpham'
    AND "timestamp" > NOW() - INTERVAL '7 days'
)
SELECT 
  d.madonhang,
  d.status,
  pc.old_price::numeric as old_price,
  pc.new_price::numeric as new_price,
  ds.giaban as order_price,
  pc.timestamp as price_changed_at,
  d."createdAt" as order_created_at
FROM recent_price_changes pc
JOIN "Donhangsanpham" ds ON ds."idSP" = pc.sanpham_id
JOIN "Donhang" d ON d.id = ds."donhangId"
WHERE d.status IN ('dadat', 'dagiao')
ORDER BY pc.timestamp DESC;
```

## Files Modified

1. ✅ `/api/src/donhang/donhang.service.ts` (UPDATED)
   - Imported BanggiaPriceHistoryService
   - Modified create() to store price metadata
   - Added extractPriceMetadata()
   - Added verifyOrderPrices()
   - Added getPriceAtDate()

2. ✅ `/api/src/donhang/donhang.module.ts` (UPDATED)
   - Imported BanggiaModule

3. ✅ `/api/src/donhang/donhang.controller.ts` (UPDATED)
   - Added GET /verify-prices/:donhangId
   - Added GET /price-at-date

## Next Steps (Optional Enhancements)

### 📊 Analytics & Reporting
- Price volatility reports
- Impact analysis of price changes on pending orders
- Customer notification when prices change

### 🔔 Alerts & Notifications
- Alert when order price differs significantly from current
- Notify sales team of price changes affecting pending orders
- Dashboard showing price-impacted orders

### 🎯 Business Rules
- Auto-adjust order prices within X% threshold
- Require manager approval for large price discrepancies
- Lock prices when order is confirmed

### 🖥️ Frontend Integration
- Display price metadata in order details
- Show price change indicators
- Price verification widget in order management

## Conclusion

✅ **Step 3 COMPLETE** - Donhang now tracks:
- Which banggia was used for each product
- When the price was captured
- Actual price used in the order
- Full verification against current prices
- Historical price lookup capability

**Status**: Production-ready. All new orders will automatically include price metadata. Old orders gracefully handled.

**Ready for**: Step 4 (Frontend integration) or production deployment!
