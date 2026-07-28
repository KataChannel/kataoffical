# 📊 PHÂN TÍCH HỆ THỐNG QUẢN LÝ GIÁ - GIẢI PHÁP CHUYÊN NGHIỆP

## 🎯 TÓM TẮT VẤN ĐỀ

Bạn cần giải quyết vấn đề **Price History & Price Audit** - Ghi nhận và theo dõi lịch sử giá sản phẩm theo thời gian khi tạo đơn hàng.

---

## 📐 KIẾN TRÚC HIỆN TẠI

### 1. Database Schema

```prisma
model Sanpham {
  id              String
  masp            String            @unique
  title           String
  giagoc          Decimal           // Giá gốc
  giaban          Decimal           // Giá bán mặc định
  banggia         Banggiasanpham[]  // Relation N-N với Banggia
}

model Banggia {
  id        String
  mabanggia String
  title     String
  batdau    DateTime?
  ketthuc   DateTime?
  isDefault Boolean
  sanpham   Banggiasanpham[]  // Giá của sản phẩm trong bảng giá này
  khachhang Khachhang[]       // Khách hàng sử dụng bảng giá này
}

model Banggiasanpham {
  id        String
  giaban    Decimal           // ⚠️ Giá hiện tại trong bảng giá
  sanphamId String
  banggiaId String
}

model Khachhang {
  id         String
  makh       String   @unique
  name       String
  banggiaId  String?           // Bảng giá mặc định của khách hàng
  banggia    Banggia[]
}

model Donhang {
  id          String
  madonhang   String    @unique
  ngaygiao    DateTime
  banggiaId   String?           // Bảng giá được sử dụng khi tạo đơn
  khachhangId String?
  sanpham     Donhangsanpham[]
  createdAt   DateTime
}

model Donhangsanpham {
  id        String
  idSP      String              // FK to Sanpham
  donhangId String              // FK to Donhang
  giaban    Decimal             // ⭐ Giá bán tại thời điểm tạo đơn
  slnhan    Decimal
  ttnhan    Decimal             // Thành tiền
  vat       Decimal
  ttsauvat  Decimal
}
```

### 2. Logic Hiện Tại

**Khi tạo đơn hàng (`DonhangService.create()`):**

```typescript
// 1. Lấy khách hàng và bảng giá của khách
const khachhang = await prisma.khachhang.findUnique({
  where: { id: dto.khachhangId },
  include: { banggia: true }
});

// 2. Xác định bảng giá sử dụng
const banggiaId = dto.banggiaId || khachhang.banggiaId || DEFAUL_BANGGIA_ID;

// 3. Lấy bảng giá và giá sản phẩm
const banggia = await prisma.banggia.findUnique({
  where: { id: banggiaId },
  include: { sanpham: true }
});

// 4. Cập nhật giá sản phẩm từ bảng giá
dto.sanpham.map((sp) => {
  const giaSanpham = banggia?.sanpham.find(
    bgsp => bgsp.sanphamId === sp.idSP
  );
  
  // ⭐ Lấy giá từ bảng giá tại thời điểm hiện tại
  if (giaSanpham) {
    giaban = parseFloat(giaSanpham.giaban.toString());
  } else if (giaSanphamDefault) {
    giaban = parseFloat(giaSanphamDefault.giaban.toString());
  }
  
  // 5. Lưu giá vào Donhangsanpham
  return {
    idSP: sp.idSP,
    giaban: giaban,  // ✅ Giá đã snapshot
    slnhan: sp.slnhan,
    ttnhan: giaban * slnhan
  };
});
```

---

## ⚠️ VẤN ĐỀ HIỆN TẠI

### Scenario Thực Tế:

**Ngày 1 (Hôm nay):**
- Khách hàng: Ụt Ụt 47
- Bảng giá: Bảng giá 21
- Sản phẩm I100002: giá = 20,000 VNĐ
- Tạo đơn hàng DH001
- ✅ **Kết quả:** Donhangsanpham.giaban = 20,000

**Ngày 2 (Ngày mai):**
- Admin cập nhật giá I100002 trong Bảng giá 21 → 25,000 VNĐ
- Tạo đơn hàng mới DH002
- ✅ **Kết quả:** Donhangsanpham.giaban = 25,000

**⚠️ VẤN ĐỀ:**

1. **✅ ĐÃ ĐÚNG:** Giá được snapshot vào `Donhangsanpham.giaban` tại thời điểm tạo đơn
   - DH001 vẫn giữ giá 20,000
   - DH002 có giá mới 25,000
   
2. **❌ THIẾU:** Không có audit trail
   - Không biết giá 20,000 được lấy từ bảng giá nào?
   - Không biết giá đó có phải giá chính xác của bảng giá 21 tại thời điểm đó không?
   - Không thể verify nếu có tranh chấp

3. **❌ THIẾU:** Khi cập nhật lại giá cho đơn hàng cũ
   - Nếu cần sync lại giá (có chức năng `dongbogia`)
   - Không biết giá cũ là bao nhiêu
   - Không có history để rollback

---

## ✅ ĐÁNH GIÁ HỆ THỐNG HIỆN TẠI

### Những điểm ĐÃ TỐT:

1. **✅ Price Snapshot:** Giá đã được snapshot vào `Donhangsanpham.giaban`
   ```typescript
   // Giá không bị thay đổi khi Banggiasanpham.giaban thay đổi
   Donhangsanpham.giaban = 20000 (immutable)
   ```

2. **✅ Price Source Tracking:** Có lưu `banggiaId` trong Donhang
   ```typescript
   Donhang.banggiaId = "84a62698-5784-4ac3-b506-5e662d1511cb"
   ```

3. **✅ Price Priority Logic:** 
   ```typescript
   // 1. Ưu tiên giá từ bảng giá của đơn hàng
   // 2. Fallback về giá từ bảng giá mặc định
   // 3. Fallback về giá từ dto
   ```

4. **✅ Sync Price Feature:** Có chức năng `dongbogia` để cập nhật lại giá
   ```typescript
   // Enhanced dongbogia service
   dongbogiaEnhanced(listdonhang: any[])
   ```

### Những điểm CẦN CẢI THIỆN:

1. **❌ No Price History:** Không lưu lịch sử thay đổi giá trong Banggiasanpham
2. **❌ No Audit Trail:** Không ghi log khi thay đổi giá
3. **❌ No Price Verification:** Không có cách verify giá đã đúng hay chưa
4. **❌ No Rollback Capability:** Không thể khôi phục giá cũ

---

## 🎯 GIẢI PHÁP CHUYÊN NGHIỆP

### Option 1: **TEMPORAL TABLE APPROACH** ⭐ RECOMMENDED

Sử dụng bảng lịch sử giá riêng biệt (Price History Table)

#### 1.1. Schema Changes

```prisma
// ✅ THÊM MỚI: Bảng lịch sử giá
model BanggiasanphamHistory {
  id            String   @id @default(uuid())
  banggiaId     String
  sanphamId     String
  giaban        Decimal  @postgres.Decimal(20, 3)
  
  // Audit fields
  validFrom     DateTime @default(now())  // Giá có hiệu lực từ
  validTo       DateTime?                  // Giá hết hiệu lực (NULL = hiện tại)
  createdBy     String?                    // User ID
  reason        String?                    // Lý do thay đổi giá
  
  // Metadata
  createdAt     DateTime @default(now())
  
  // Relations
  banggia       Banggia  @relation(fields: [banggiaId], references: [id])
  sanpham       Sanpham  @relation(fields: [sanphamId], references: [id])
  
  // Indexes for performance
  @@index([banggiaId, sanphamId, validFrom, validTo])
  @@index([sanphamId, validFrom])
}

// ✅ CẬP NHẬT: Thêm tracking vào Donhangsanpham
model Donhangsanpham {
  id                    String   @id @default(uuid())
  idSP                  String
  donhangId             String
  giaban                Decimal  @postgres.Decimal(20, 3)
  
  // ⭐ THÊM MỚI: Price tracking
  priceHistoryId        String?  // FK to BanggiasanphamHistory
  priceSnapshotAt       DateTime @default(now())  // Thời điểm snapshot giá
  originalBanggiaId     String?  // Bảng giá ban đầu
  
  // ... existing fields
}
```

#### 1.2. Migration Script

```typescript
// Migration: add_price_history
import { PrismaClient } from '@prisma/client';

export async function up(prisma: PrismaClient) {
  // 1. Create BanggiasanphamHistory table (done by Prisma)
  
  // 2. Migrate current prices to history
  const allBanggiasanpham = await prisma.banggiasanpham.findMany();
  
  for (const bgsp of allBanggiasanpham) {
    await prisma.banggiasanphamHistory.create({
      data: {
        banggiaId: bgsp.banggiaId,
        sanphamId: bgsp.sanphamId,
        giaban: bgsp.giaban,
        validFrom: new Date(), // Assume current price valid from now
        validTo: null, // Current price
        reason: 'Initial migration'
      }
    });
  }
  
  console.log(`✅ Migrated ${allBanggiasanpham.length} prices to history`);
}
```

#### 1.3. Service Implementation

```typescript
// banggia/banggia.service.ts

@Injectable()
export class BanggiaService {
  constructor(private prisma: PrismaService) {}
  
  /**
   * Cập nhật giá sản phẩm với history tracking
   */
  async updateProductPrice(
    banggiaId: string,
    sanphamId: string,
    newPrice: number,
    userId?: string,
    reason?: string
  ) {
    return await this.prisma.$transaction(async (tx) => {
      // 1. Lấy giá hiện tại
      const currentBgsp = await tx.banggiasanpham.findFirst({
        where: { banggiaId, sanphamId }
      });
      
      if (!currentBgsp) {
        throw new NotFoundException('Không tìm thấy sản phẩm trong bảng giá');
      }
      
      const oldPrice = currentBgsp.giaban;
      
      // 2. Đóng history record cũ (set validTo)
      await tx.banggiasanphamHistory.updateMany({
        where: {
          banggiaId,
          sanphamId,
          validTo: null // Current active record
        },
        data: {
          validTo: new Date()
        }
      });
      
      // 3. Tạo history record mới
      const historyRecord = await tx.banggiasanphamHistory.create({
        data: {
          banggiaId,
          sanphamId,
          giaban: newPrice,
          validFrom: new Date(),
          validTo: null, // New current price
          createdBy: userId,
          reason: reason || `Price update: ${oldPrice} → ${newPrice}`
        }
      });
      
      // 4. Cập nhật giá trong Banggiasanpham
      const updated = await tx.banggiasanpham.update({
        where: { id: currentBgsp.id },
        data: { giaban: newPrice }
      });
      
      // 5. Ghi audit log
      await tx.auditLog.create({
        data: {
          userId,
          action: 'UPDATE',
          entityName: 'Banggiasanpham',
          entityId: currentBgsp.id,
          oldValues: { giaban: oldPrice },
          newValues: { giaban: newPrice },
          metadata: {
            historyId: historyRecord.id,
            banggiaId,
            sanphamId,
            reason
          }
        }
      });
      
      return {
        updated,
        historyRecord,
        oldPrice,
        newPrice
      };
    });
  }
  
  /**
   * Lấy giá tại một thời điểm cụ thể
   */
  async getPriceAtDate(
    banggiaId: string,
    sanphamId: string,
    date: Date
  ): Promise<number | null> {
    const history = await this.prisma.banggiasanphamHistory.findFirst({
      where: {
        banggiaId,
        sanphamId,
        validFrom: { lte: date },
        OR: [
          { validTo: null },
          { validTo: { gte: date } }
        ]
      },
      orderBy: { validFrom: 'desc' }
    });
    
    return history ? Number(history.giaban) : null;
  }
  
  /**
   * Lấy lịch sử thay đổi giá
   */
  async getPriceHistory(
    banggiaId: string,
    sanphamId: string,
    options?: {
      from?: Date,
      to?: Date,
      limit?: number
    }
  ) {
    const where: any = { banggiaId, sanphamId };
    
    if (options?.from || options?.to) {
      where.validFrom = {};
      if (options.from) where.validFrom.gte = options.from;
      if (options.to) where.validFrom.lte = options.to;
    }
    
    return await this.prisma.banggiasanphamHistory.findMany({
      where,
      orderBy: { validFrom: 'desc' },
      take: options?.limit || 100,
      include: {
        banggia: { select: { mabanggia: true, title: true } },
        sanpham: { select: { masp: true, title: true } }
      }
    });
  }
}
```

#### 1.4. Update Donhang Service

```typescript
// donhang/donhang.service.ts

async create(dto: any) {
  return this.prisma.$transaction(async (prisma) => {
    // ... existing code to get khachhang, banggia ...
    
    const banggiaId = dto.banggiaId || khachhang.banggiaId || DEFAUL_BANGGIA_ID;
    const creationDate = new Date();
    
    // ⭐ Lấy giá với history tracking
    const updatedSanpham = await Promise.all(
      dto.sanpham.map(async (sp) => {
        // Lấy giá tại thời điểm hiện tại từ history
        const priceHistory = await prisma.banggiasanphamHistory.findFirst({
          where: {
            banggiaId,
            sanphamId: sp.idSP,
            validFrom: { lte: creationDate },
            OR: [
              { validTo: null },
              { validTo: { gte: creationDate } }
            ]
          },
          orderBy: { validFrom: 'desc' }
        });
        
        const giaban = priceHistory 
          ? Number(priceHistory.giaban) 
          : Number(sp.giaban || 0);
        
        return {
          idSP: sp.idSP,
          giaban,
          priceHistoryId: priceHistory?.id,  // ⭐ Link to history
          priceSnapshotAt: creationDate,     // ⭐ Timestamp
          originalBanggiaId: banggiaId,      // ⭐ Source
          slnhan: sp.slnhan,
          ttnhan: giaban * sp.slnhan,
          // ... other fields
        };
      })
    );
    
    // Create donhang với price tracking
    const newDonhang = await prisma.donhang.create({
      data: {
        // ... existing fields
        sanpham: {
          create: updatedSanpham
        }
      }
    });
    
    return newDonhang;
  });
}
```

---

### Option 2: **EVENT SOURCING APPROACH** (Advanced)

Lưu tất cả sự kiện thay đổi giá

```prisma
model PriceChangeEvent {
  id            String   @id @default(uuid())
  eventType     String   // 'PRICE_CREATED', 'PRICE_UPDATED', 'PRICE_DELETED'
  aggregateId   String   // banggiaId + sanphamId
  
  // Event data
  banggiaId     String
  sanphamId     String
  oldPrice      Decimal?
  newPrice      Decimal
  
  // Metadata
  timestamp     DateTime @default(now())
  userId        String?
  reason        String?
  metadata      Json?
  
  @@index([aggregateId, timestamp])
}
```

---

### Option 3: **SNAPSHOT + DELTA APPROACH** (Hybrid)

Kết hợp snapshot và delta changes

```prisma
model PriceSnapshot {
  id            String   @id @default(uuid())
  banggiaId     String
  sanphamId     String
  giaban        Decimal
  snapshotAt    DateTime @default(now())
  version       Int      // Version number
  
  // Changes since last snapshot
  deltaChanges  Json?    // [{timestamp, oldPrice, newPrice, userId, reason}]
}
```

---

## 🛠️ IMPLEMENTATION PLAN

### Phase 1: Foundation (Week 1)

1. **Database Migration**
   ```bash
   # Step 1: Thêm BanggiasanphamHistory model vào schema
   # Step 2: Generate migration
   npx prisma migrate dev --name add_price_history
   
   # Step 3: Run migration script để migrate data hiện tại
   npm run migrate:price-history
   ```

2. **Service Layer**
   - Tạo `BanggiaPriceHistoryService`
   - Implement CRUD cho price history
   - Add hooks vào existing update methods

3. **Testing**
   - Unit tests cho price history service
   - Integration tests cho price snapshot

### Phase 2: Frontend Integration (Week 2)

1. **UI Components**
   - Price history timeline viewer
   - Price change dialog với reason input
   - Price comparison tool

2. **Admin Features**
   - Bulk price update với history
   - Price audit report
   - Price rollback feature

### Phase 3: Advanced Features (Week 3)

1. **Price Verification**
   ```typescript
   async verifyOrderPrices(donhangId: string) {
     const donhang = await this.prisma.donhang.findUnique({
       where: { id: donhangId },
       include: { sanpham: true }
     });
     
     const verifications = await Promise.all(
       donhang.sanpham.map(async (sp) => {
         const expectedPrice = await this.getPriceAtDate(
           donhang.banggiaId,
           sp.idSP,
           donhang.createdAt
         );
         
         return {
           sanphamId: sp.idSP,
           currentPrice: Number(sp.giaban),
           expectedPrice,
           isCorrect: Number(sp.giaban) === expectedPrice,
           difference: Number(sp.giaban) - (expectedPrice || 0)
         };
       })
     );
     
     return verifications;
   }
   ```

2. **Bulk Price Sync**
   ```typescript
   async syncPricesWithHistory(donhangIds: string[]) {
     const results = [];
     
     for (const id of donhangIds) {
       const donhang = await this.prisma.donhang.findUnique({
         where: { id },
         include: { sanpham: true }
       });
       
       const updates = await Promise.all(
         donhang.sanpham.map(async (sp) => {
           // Lấy giá chính xác tại thời điểm tạo đơn
           const correctPrice = await this.getPriceAtDate(
             donhang.banggiaId,
             sp.idSP,
             donhang.createdAt
           );
           
           if (correctPrice && Number(sp.giaban) !== correctPrice) {
             return this.prisma.donhangsanpham.update({
               where: { id: sp.id },
               data: { 
                 giaban: correctPrice,
                 ttnhan: correctPrice * Number(sp.slnhan)
               }
             });
           }
         })
       );
       
       results.push({ donhangId: id, updated: updates.filter(Boolean).length });
     }
     
     return results;
   }
   ```

---

## 📋 BEST PRACTICES

### 1. Price Update Workflow

```typescript
// ❌ BAD: Direct update without history
await prisma.banggiasanpham.update({
  where: { id },
  data: { giaban: newPrice }
});

// ✅ GOOD: Update with history tracking
await banggiaService.updateProductPrice(
  banggiaId,
  sanphamId,
  newPrice,
  userId,
  'Monthly price adjustment'
);
```

### 2. Price Retrieval

```typescript
// ❌ BAD: Lấy giá hiện tại cho đơn hàng cũ
const banggia = await prisma.banggia.findUnique({
  where: { id: banggiaId },
  include: { sanpham: true }
});
const giaban = banggia.sanpham.find(sp => sp.sanphamId === sanphamId).giaban;

// ✅ GOOD: Lấy giá tại thời điểm tạo đơn
const giaban = await banggiaService.getPriceAtDate(
  banggiaId,
  sanphamId,
  donhang.createdAt
);
```

### 3. Price Verification

```typescript
// Verify trước khi xuất hóa đơn
const verification = await verifyOrderPrices(donhangId);
const hasErrors = verification.some(v => !v.isCorrect);

if (hasErrors) {
  console.warn('⚠️ Price mismatch detected:', verification);
  // Offer to fix or notify admin
}
```

---

## 🎓 SENIOR-LEVEL INSIGHTS

### 1. **Data Integrity**

- Sử dụng `$transaction` cho mọi price update
- Validate price changes (không cho phép giá âm, thay đổi quá 50% 1 lần)
- Soft delete thay vì hard delete history records

### 2. **Performance Optimization**

```sql
-- Index cho price history queries
CREATE INDEX idx_price_history_temporal 
ON "BanggiasanphamHistory" 
(banggiaId, sanphamId, validFrom DESC, validTo DESC);

-- Materialized view cho current prices
CREATE MATERIALIZED VIEW current_prices AS
SELECT DISTINCT ON (banggiaId, sanphamId)
  banggiaId, sanphamId, giaban, validFrom
FROM "BanggiasanphamHistory"
WHERE validTo IS NULL
ORDER BY banggiaId, sanphamId, validFrom DESC;
```

### 3. **Monitoring & Alerting**

```typescript
// Alert khi có thay đổi giá bất thường
if (Math.abs((newPrice - oldPrice) / oldPrice) > 0.5) {
  await notificationService.alert({
    type: 'PRICE_CHANGE_ANOMALY',
    message: `Price changed >50%: ${oldPrice} → ${newPrice}`,
    banggiaId,
    sanphamId,
    userId
  });
}
```

### 4. **Audit & Compliance**

- Log mọi thay đổi giá vào AuditLog
- Lưu trữ reason cho mọi price change
- Export audit report định kỳ
- Implement price approval workflow cho thay đổi lớn

---

## 🚀 DEPLOYMENT CHECKLIST

- [ ] Backup database trước khi migrate
- [ ] Run migration script trên staging
- [ ] Test price history queries performance
- [ ] Update API documentation
- [ ] Train users về price change workflow
- [ ] Setup monitoring alerts
- [ ] Create price audit report template

---

## 📊 KẾT LUẬN

**Hệ thống hiện tại của bạn:**
- ✅ Đã snapshot giá đúng cách
- ✅ Có logic price fallback tốt
- ❌ Thiếu price history tracking
- ❌ Thiếu price verification tools

**Giải pháp đề xuất:**
1. **Implement Option 1** (Temporal Table) - Best balance
2. **Add price verification tools**
3. **Enable price audit reports**
4. **Implement price approval workflow**

Với giải pháp này, bạn có thể:
- ✅ Track mọi thay đổi giá
- ✅ Verify giá đã đúng tại thời điểm tạo đơn
- ✅ Sync lại giá chính xác khi cần
- ✅ Có audit trail đầy đủ
- ✅ Rollback về giá cũ nếu cần

**Timeline:** 3 weeks
**Effort:** Medium
**Impact:** High
**Risk:** Low (backward compatible)
