# ID Confusion Diagram

## Problem: ID Confusion in Banggia Detail

```
┌─────────────────────────────────────────────────────────────────┐
│                    DATABASE STRUCTURE                            │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────┐         ┌──────────────────┐        ┌─────────────┐
│   Banggia       │         │ Banggiasanpham   │        │  Sanpham    │
├─────────────────┤         ├──────────────────┤        ├─────────────┤
│ id: BG-123      │◄────────│ id: BGSP-456     │───────►│ id: SP-789  │
│ mabanggia: BG24 │         │ banggiaId: BG-123│        │ masp: I10001│
│ title: ...      │         │ sanphamId: SP-789│        │ title: Bạc hà│
└─────────────────┘         │ giaban: 50001    │        └─────────────┘
                            └──────────────────┘

ACTUAL DATA:
- Banggiasanpham ID: 6b567353-7d8b-4dda-be20-0819c6b35b41
- Sanpham ID:        74414ab9-d7aa-4790-aa23-f39c4243bf88


┌─────────────────────────────────────────────────────────────────┐
│                 ❌ BEFORE FIX - BROKEN                           │
└─────────────────────────────────────────────────────────────────┘

Backend findOne() response:
{
  sanpham: banggia.sanpham.map(item => ({
    ...item.sanpham,        // Spread overwrites IDs!
    giaban: item.giaban
  }))
}

Result:
{
  id: "SP-789",            // ❓ From item.sanpham.id (Sanpham ID)
  title: "Bạc hà",
  masp: "I100001",
  giaban: 50001
  // ❌ LOST: item.id (BGSP-456)
  // ❌ LOST: item.sanphamId (SP-789 explicit)
}

Frontend receives:
row.id = "SP-789"          // Sometimes correct
row.id = "BGSP-456"        // Sometimes wrong! (in some edge cases)
row.sanphamId = undefined  // ❌ Always missing!

Frontend calls:
showPriceHistory(row) {
  sanphamId: row.id        // ❌ Could be BGSP-456 (wrong!)
}

API endpoint called:
GET /banggia/BG-123/sanpham/BGSP-456/price-history
                                     ^^^^^^^^ Wrong ID!

Backend query:
SELECT * FROM banggiasanpham 
WHERE banggiaId = 'BG-123' 
  AND sanphamId = 'BGSP-456'  // ❌ No match! (should be SP-789)

Result: [] (empty)


┌─────────────────────────────────────────────────────────────────┐
│                 ✅ AFTER FIX - WORKING                           │
└─────────────────────────────────────────────────────────────────┘

Backend findOne() response:
{
  sanpham: banggia.sanpham.map(item => ({
    ...item.sanpham,
    giaban: item.giaban,
    banggiasanphamId: item.id,      // ✅ Preserve BGSP ID
    sanphamId: item.sanphamId        // ✅ Explicit Sanpham ID
  }))
}

Result:
{
  id: "SP-789",                      // Sanpham ID (from spread)
  banggiasanphamId: "BGSP-456",      // ✅ NEW: Banggiasanpham ID
  sanphamId: "SP-789",                // ✅ NEW: Explicit Sanpham ID
  title: "Bạc hà",
  masp: "I100001",
  giaban: 50001
}

Frontend receives:
row.id = "SP-789"                    // Sanpham ID
row.banggiasanphamId = "BGSP-456"    // ✅ Join table ID
row.sanphamId = "SP-789"             // ✅ Explicit Sanpham ID

Frontend calls:
showPriceHistory(row) {
  sanphamId: row.sanphamId || row.id  // ✅ Prioritize sanphamId
}
// = "SP-789" ✅ Correct!

API endpoint called:
GET /banggia/BG-123/sanpham/SP-789/price-history
                                    ^^^^^^ Correct ID!

Backend query:
SELECT * FROM banggiasanpham 
WHERE banggiaId = 'BG-123' 
  AND sanphamId = 'SP-789'  // ✅ Match found!

Then query audit logs:
SELECT * FROM auditlog
WHERE entityName = 'Banggiasanpham'
  AND entityId = 'BGSP-456'  // ✅ Correct Banggiasanpham ID

Result: [{ oldPrice: 50000, newPrice: 50001, ... }] ✅


┌─────────────────────────────────────────────────────────────────┐
│                   KEY TAKEAWAYS                                  │
└─────────────────────────────────────────────────────────────────┘

1. ❌ Spreading objects can overwrite important IDs
   { ...item.sanpham } overwrites item.id

2. ✅ Always preserve critical IDs explicitly
   banggiasanphamId: item.id,
   sanphamId: item.sanphamId

3. ✅ Frontend should prioritize explicit fields
   sanpham.sanphamId || sanpham.id

4. ✅ Use descriptive field names
   - id: The main entity ID (context-dependent)
   - banggiasanphamId: Explicit join table ID
   - sanphamId: Explicit sanpham ID


┌─────────────────────────────────────────────────────────────────┐
│                   DATA FLOW                                      │
└─────────────────────────────────────────────────────────────────┘

1. USER ACTION: Click history icon on "Bạc hà"

2. FRONTEND: 
   - Receives row object
   - Extracts: sanphamId = row.sanphamId || row.id
   - Calls: /banggia/{banggiaId}/sanpham/{sanphamId}/price-history

3. BACKEND API:
   - Receives: banggiaId, sanphamId
   - Queries: banggiasanpham WHERE banggiaId AND sanphamId
   - Gets: banggiasanpham record
   - Queries: auditlog WHERE entityId = banggiasanpham.id
   - Returns: Array of price changes

4. FRONTEND DIALOG:
   - Displays: Audit log history
   - Shows: oldPrice → newPrice, user, timestamp, reason


┌─────────────────────────────────────────────────────────────────┐
│                   VERIFICATION                                   │
└─────────────────────────────────────────────────────────────────┘

Test with real data:

Banggia:        693b9b8c-8d5a-462d-9e2a-826fdc81c589 (BG24)
Banggiasanpham: 6b567353-7d8b-4dda-be20-0819c6b35b41
Sanpham:        74414ab9-d7aa-4790-aa23-f39c4243bf88 (I100001 - Bạc hà)

❌ Before: Called with BGSP ID → empty result
✅ After:  Called with SP ID → audit logs returned
```
