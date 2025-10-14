# 🛠️ IMPLEMENTATION GUIDE - PRICE HISTORY SYSTEM

## 📋 QUICK START

### Tình huống của bạn:

**Khách hàng Ụt Ụt 47:**
- Hôm nay: Bảng giá 21, I100002 = 20,000 → Tạo đơn → Lưu 20,000 ✅
- Ngày mai: Bảng giá 21, I100002 = 25,000 → Tạo đơn → Lưu 25,000 ✅
- **Vấn đề:** Làm sao verify giá 20,000 là đúng? Làm sao sync lại nếu sai?

---

## STEP 1: DATABASE MIGRATION

### 1.1. Update Schema

```prisma
// File: api/prisma/schema.prisma

// ✅ THÊM MỚI: Bảng lịch sử giá
model BanggiasanphamHistory {
  id            String   @id @default(uuid())
  banggiaId     String
  sanphamId     String
  giaban        Decimal  @postgres.Decimal(20, 3)
  
  // Temporal fields
  validFrom     DateTime @default(now())
  validTo       DateTime?
  
  // Audit fields
  createdBy     String?
  reason        String?
  metadata      Json?
  
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  // Relations
  banggia       Banggia  @relation("BanggiaHistory", fields: [banggiaId], references: [id])
  sanpham       Sanpham  @relation("SanphamPriceHistory", fields: [sanphamId], references: [id])
  
  @@index([banggiaId, sanphamId, validFrom, validTo], name: "idx_price_temporal")
  @@index([sanphamId, validFrom], name: "idx_product_price_date")
  @@index([validFrom], name: "idx_valid_from")
}

// ✅ CẬP NHẬT: Thêm relation vào Banggia
model Banggia {
  id              String                     @id @default(uuid())
  // ... existing fields ...
  sanpham         Banggiasanpham[]
  priceHistory    BanggiasanphamHistory[]    @relation("BanggiaHistory")  // ⭐ NEW
}

// ✅ CẬP NHẬT: Thêm relation vào Sanpham
model Sanpham {
  id              String                     @id @default(uuid())
  // ... existing fields ...
  banggia         Banggiasanpham[]
  priceHistory    BanggiasanphamHistory[]    @relation("SanphamPriceHistory")  // ⭐ NEW
}

// ✅ CẬP NHẬT: Thêm tracking fields vào Donhangsanpham
model Donhangsanpham {
  id                    String   @id @default(uuid())
  idSP                  String
  donhangId             String
  giaban                Decimal  @postgres.Decimal(20, 3)
  sldat                 Decimal  @default(0) @postgres.Decimal(20, 3)
  slgiao                Decimal  @default(0) @postgres.Decimal(20, 3)
  slnhan                Decimal  @default(0) @postgres.Decimal(20, 3)
  // ... existing fields ...
  
  // ⭐ THÊM MỚI: Price tracking
  priceHistoryId        String?              // FK to BanggiasanphamHistory
  priceSnapshotAt       DateTime?            // Thời điểm snapshot giá
  originalBanggiaId     String?              // Bảng giá ban đầu
  priceSource           String?              // 'banggia' | 'default' | 'manual'
  
  donhang               Donhang  @relation(fields: [donhangId], references: [id], onDelete: Cascade)
  sanpham               Sanpham  @relation(fields: [idSP], references: [id])
  
  @@index([donhangId])
  @@index([idSP])
  @@index([priceHistoryId])  // ⭐ NEW
}
```

### 1.2. Generate Migration

```bash
cd api
npx prisma migrate dev --name add_price_history_system
```

### 1.3. Data Migration Script

Tạo file: `api/prisma/migrations/migrate-existing-prices.ts`

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function migrateExistingPrices() {
  console.log('🚀 Starting price history migration...');
  
  try {
    // 1. Get all current prices from Banggiasanpham
    const allPrices = await prisma.banggiasanpham.findMany({
      include: {
        banggia: true,
        sanpham: true
      }
    });
    
    console.log(`📊 Found ${allPrices.length} price records to migrate`);
    
    let migrated = 0;
    let failed = 0;
    
    // 2. Create history record for each current price
    for (const price of allPrices) {
      try {
        await prisma.banggiasanphamHistory.create({
          data: {
            banggiaId: price.banggiaId,
            sanphamId: price.sanphamId,
            giaban: price.giaban,
            validFrom: price.createdAt || new Date(),  // Use creation date if available
            validTo: null,  // Current price = validTo is NULL
            reason: 'Initial migration from existing data',
            metadata: {
              migratedAt: new Date().toISOString(),
              originalId: price.id,
              banggia: price.banggia.mabanggia,
              sanpham: price.sanpham.masp
            }
          }
        });
        
        migrated++;
        
        if (migrated % 100 === 0) {
          console.log(`✅ Migrated ${migrated}/${allPrices.length} prices`);
        }
      } catch (error) {
        console.error(`❌ Failed to migrate price ${price.id}:`, error.message);
        failed++;
      }
    }
    
    console.log(`\n✅ Migration completed!`);
    console.log(`   - Successfully migrated: ${migrated}`);
    console.log(`   - Failed: ${failed}`);
    
    // 3. Optional: Migrate existing order prices
    await migrateOrderPrices();
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function migrateOrderPrices() {
  console.log('\n🚀 Migrating order price snapshots...');
  
  const orders = await prisma.donhang.findMany({
    include: {
      sanpham: true
    },
    take: 1000  // Process in batches
  });
  
  let updated = 0;
  
  for (const order of orders) {
    for (const sp of order.sanpham) {
      try {
        // Find the price history that was valid at order creation time
        const priceHistory = await prisma.banggiasanphamHistory.findFirst({
          where: {
            banggiaId: order.banggiaId || DEFAUL_BANGGIA_ID,
            sanphamId: sp.idSP,
            validFrom: { lte: order.createdAt },
            OR: [
              { validTo: null },
              { validTo: { gte: order.createdAt } }
            ]
          },
          orderBy: { validFrom: 'desc' }
        });
        
        if (priceHistory) {
          await prisma.donhangsanpham.update({
            where: { id: sp.id },
            data: {
              priceHistoryId: priceHistory.id,
              priceSnapshotAt: order.createdAt,
              originalBanggiaId: order.banggiaId,
              priceSource: 'banggia'
            }
          });
          
          updated++;
        }
      } catch (error) {
        console.error(`Failed to link price history for order ${order.madonhang}:`, error.message);
      }
    }
  }
  
  console.log(`✅ Updated ${updated} order line items with price history links`);
}

// Run migration
migrateExistingPrices()
  .then(() => {
    console.log('\n🎉 All migrations completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Migration failed:', error);
    process.exit(1);
  });
```

**Chạy migration:**

```bash
cd api
npx ts-node prisma/migrations/migrate-existing-prices.ts
```

---

## STEP 2: SERVICE LAYER

### 2.1. Create Price History Service

Tạo file: `api/src/banggia/banggia-price-history.service.ts`

```typescript
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class BanggiaPriceHistoryService {
  constructor(private prisma: PrismaService) {}
  
  /**
   * Cập nhật giá với history tracking
   */
  async updatePrice(params: {
    banggiaId: string;
    sanphamId: string;
    newPrice: number;
    userId?: string;
    reason?: string;
  }) {
    const { banggiaId, sanphamId, newPrice, userId, reason } = params;
    
    // Validate
    if (newPrice < 0) {
      throw new BadRequestException('Giá không thể âm');
    }
    
    return await this.prisma.$transaction(async (tx) => {
      // 1. Get current price
      const currentBgsp = await tx.banggiasanpham.findFirst({
        where: { banggiaId, sanphamId },
        include: {
          banggia: { select: { mabanggia: true, title: true } },
          sanpham: { select: { masp: true, title: true } }
        }
      });
      
      if (!currentBgsp) {
        // Create new if doesn't exist
        const newBgsp = await tx.banggiasanpham.create({
          data: {
            banggiaId,
            sanphamId,
            giaban: newPrice,
            isActive: true
          }
        });
        
        // Create history record
        await tx.banggiasanphamHistory.create({
          data: {
            banggiaId,
            sanphamId,
            giaban: newPrice,
            validFrom: new Date(),
            validTo: null,
            createdBy: userId,
            reason: reason || 'Tạo giá mới',
            metadata: {
              action: 'CREATE',
              newPrice
            }
          }
        });
        
        return { action: 'CREATED', newBgsp };
      }
      
      const oldPrice = Number(currentBgsp.giaban);
      
      // Check if price actually changed
      if (oldPrice === newPrice) {
        return { 
          action: 'NO_CHANGE', 
          message: 'Giá không thay đổi',
          currentPrice: oldPrice 
        };
      }
      
      // Check for large price changes (>50%)
      const priceChange = Math.abs((newPrice - oldPrice) / oldPrice);
      if (priceChange > 0.5 && !reason) {
        throw new BadRequestException(
          `Thay đổi giá quá lớn (${(priceChange * 100).toFixed(1)}%). Vui lòng nhập lý do.`
        );
      }
      
      // 2. Close current history record
      await tx.banggiasanphamHistory.updateMany({
        where: {
          banggiaId,
          sanphamId,
          validTo: null  // Current active record
        },
        data: {
          validTo: new Date()
        }
      });
      
      // 3. Create new history record
      const historyRecord = await tx.banggiasanphamHistory.create({
        data: {
          banggiaId,
          sanphamId,
          giaban: newPrice,
          validFrom: new Date(),
          validTo: null,
          createdBy: userId,
          reason: reason || `Cập nhật giá: ${oldPrice.toLocaleString()} → ${newPrice.toLocaleString()}`,
          metadata: {
            action: 'UPDATE',
            oldPrice,
            newPrice,
            changePercent: priceChange * 100,
            banggia: currentBgsp.banggia,
            sanpham: currentBgsp.sanpham
          }
        }
      });
      
      // 4. Update current price in Banggiasanpham
      const updated = await tx.banggiasanpham.update({
        where: { id: currentBgsp.id },
        data: { giaban: newPrice }
      });
      
      // 5. Create audit log
      if (userId) {
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
              reason,
              changePercent: priceChange * 100
            }
          }
        });
      }
      
      console.log(`✅ Updated price: ${currentBgsp.sanpham.masp} in ${currentBgsp.banggia.mabanggia}: ${oldPrice} → ${newPrice}`);
      
      return {
        action: 'UPDATED',
        updated,
        historyRecord,
        oldPrice,
        newPrice,
        changePercent: priceChange * 100
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
   * Lấy lịch sử giá
   */
  async getPriceHistory(
    banggiaId: string,
    sanphamId: string,
    options?: {
      from?: Date;
      to?: Date;
      limit?: number;
    }
  ) {
    const where: any = { banggiaId, sanphamId };
    
    if (options?.from || options?.to) {
      where.validFrom = {};
      if (options.from) where.validFrom.gte = options.from;
      if (options.to) where.validFrom.lte = options.to;
    }
    
    const history = await this.prisma.banggiasanphamHistory.findMany({
      where,
      orderBy: { validFrom: 'desc' },
      take: options?.limit || 100,
      include: {
        banggia: { 
          select: { id: true, mabanggia: true, title: true } 
        },
        sanpham: { 
          select: { id: true, masp: true, title: true } 
        }
      }
    });
    
    return history.map(h => ({
      ...h,
      giaban: Number(h.giaban),
      period: {
        from: h.validFrom,
        to: h.validTo,
        isCurrent: h.validTo === null
      }
    }));
  }
  
  /**
   * Rollback về giá cũ
   */
  async rollbackToPrice(
    banggiaId: string,
    sanphamId: string,
    historyId: string,
    userId?: string
  ) {
    const targetHistory = await this.prisma.banggiasanphamHistory.findUnique({
      where: { id: historyId },
      include: {
        banggia: { select: { mabanggia: true } },
        sanpham: { select: { masp: true } }
      }
    });
    
    if (!targetHistory) {
      throw new NotFoundException('Không tìm thấy lịch sử giá');
    }
    
    const rollbackPrice = Number(targetHistory.giaban);
    
    return this.updatePrice({
      banggiaId,
      sanphamId,
      newPrice: rollbackPrice,
      userId,
      reason: `Rollback về giá ${rollbackPrice.toLocaleString()} từ ${targetHistory.validFrom.toLocaleDateString()}`
    });
  }
}
```

### 2.2. Update Banggia Service

File: `api/src/banggia/banggia.service.ts`

```typescript
import { BanggiaPriceHistoryService } from './banggia-price-history.service';

@Injectable()
export class BanggiaService {
  constructor(
    private prisma: PrismaService,
    private priceHistoryService: BanggiaPriceHistoryService  // ⭐ Inject
  ) {}
  
  /**
   * Cập nhật giá sản phẩm trong bảng giá
   * ⭐ SỬ DỤNG METHOD NÀY thay vì update trực tiếp
   */
  async updateProductPrice(
    banggiaId: string,
    sanphamId: string,
    newPrice: number,
    userId?: string,
    reason?: string
  ) {
    return this.priceHistoryService.updatePrice({
      banggiaId,
      sanphamId,
      newPrice,
      userId,
      reason
    });
  }
  
  /**
   * Bulk update giá với history tracking
   */
  async bulkUpdatePrices(updates: Array<{
    banggiaId: string;
    sanphamId: string;
    newPrice: number;
  }>, userId?: string, reason?: string) {
    const results = [];
    
    for (const update of updates) {
      try {
        const result = await this.priceHistoryService.updatePrice({
          ...update,
          userId,
          reason
        });
        results.push({ success: true, ...update, result });
      } catch (error) {
        results.push({ success: false, ...update, error: error.message });
      }
    }
    
    return {
      total: updates.length,
      successful: results.filter(r => r.success).length,
      failed: results.filter(r => !r.success).length,
      results
    };
  }
}
```

---

## STEP 3: UPDATE DONHANG SERVICE

File: `api/src/donhang/donhang.service.ts`

```typescript
import { BanggiaPriceHistoryService } from '../banggia/banggia-price-history.service';

@Injectable()
export class DonhangService {
  constructor(
    private prisma: PrismaService,
    private priceHistoryService: BanggiaPriceHistoryService  // ⭐ Inject
  ) {}
  
  async create(dto: any) {
    // ... existing code ...
    
    return this.prisma.$transaction(async (prisma) => {
      const khachhang = await prisma.khachhang.findUnique({
        where: { id: dto.khachhangId },
        include: { banggia: true }
      });
      
      const banggiaId = dto.banggiaId || khachhang.banggiaId || DEFAUL_BANGGIA_ID;
      const creationDate = new Date();
      
      // ⭐ Lấy giá với history tracking
      const updatedSanpham = await Promise.all(
        dto.sanpham.map(async (sp) => {
          // Lấy giá tại thời điểm hiện tại từ price history
          const priceAtDate = await this.priceHistoryService.getPriceAtDate(
            banggiaId,
            sp.idSP,
            creationDate
          );
          
          let giaban = priceAtDate || Number(sp.giaban || 0);
          let priceSource = 'manual';
          
          if (priceAtDate) {
            giaban = priceAtDate;
            priceSource = 'banggia';
          }
          
          // Get price history ID for tracking
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
          
          const slnhan = Number(sp.slnhan || 0);
          const vat = Number(sp.vat || 0);
          const ttnhan = giaban * slnhan;
          const ttsauvat = ttnhan * (1 + vat);
          
          return {
            idSP: sp.idSP,
            giaban,
            priceHistoryId: priceHistory?.id,      // ⭐ Link to history
            priceSnapshotAt: creationDate,          // ⭐ Timestamp
            originalBanggiaId: banggiaId,           // ⭐ Source banggia
            priceSource,                            // ⭐ Source type
            slnhan,
            ttnhan,
            vat,
            ttsauvat,
            // ... other fields
          };
        })
      );
      
      // Create donhang with tracked prices
      const newDonhang = await prisma.donhang.create({
        data: {
          // ... existing fields
          banggiaId,
          sanpham: {
            create: updatedSanpham
          }
        },
        include: {
          sanpham: {
            include: {
              sanpham: true
            }
          }
        }
      });
      
      return newDonhang;
    });
  }
}
```

---

## STEP 4: PRICE VERIFICATION & SYNC

Tạo file: `api/src/donhang/donhang-price-verification.service.ts`

```typescript
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BanggiaPriceHistoryService } from '../banggia/banggia-price-history.service';

@Injectable()
export class DonhangPriceVerificationService {
  constructor(
    private prisma: PrismaService,
    private priceHistoryService: BanggiaPriceHistoryService
  ) {}
  
  /**
   * Verify giá của đơn hàng
   */
  async verifyOrderPrices(donhangId: string) {
    const donhang = await this.prisma.donhang.findUnique({
      where: { id: donhangId },
      include: {
        sanpham: {
          include: {
            sanpham: { select: { masp: true, title: true } }
          }
        }
      }
    });
    
    if (!donhang) {
      throw new NotFoundException('Đơn hàng không tồn tại');
    }
    
    const verifications = await Promise.all(
      donhang.sanpham.map(async (sp) => {
        // Get expected price at order creation time
        const expectedPrice = await this.priceHistoryService.getPriceAtDate(
          donhang.banggiaId,
          sp.idSP,
          donhang.createdAt
        );
        
        const currentPrice = Number(sp.giaban);
        const isCorrect = expectedPrice !== null && currentPrice === expectedPrice;
        const difference = expectedPrice ? currentPrice - expectedPrice : 0;
        
        return {
          sanphamId: sp.idSP,
          masp: sp.sanpham.masp,
          title: sp.sanpham.title,
          currentPrice,
          expectedPrice,
          isCorrect,
          difference,
          differencePercent: expectedPrice ? (difference / expectedPrice * 100) : 0,
          priceHistoryId: sp.priceHistoryId,
          priceSnapshotAt: sp.priceSnapshotAt
        };
      })
    );
    
    const summary = {
      donhangId,
      madonhang: donhang.madonhang,
      totalProducts: verifications.length,
      correctPrices: verifications.filter(v => v.isCorrect).length,
      incorrectPrices: verifications.filter(v => !v.isCorrect).length,
      missingExpectedPrice: verifications.filter(v => v.expectedPrice === null).length
    };
    
    return {
      summary,
      details: verifications
    };
  }
  
  /**
   * Sync lại giá đúng từ price history
   */
  async syncOrderPrices(donhangId: string, userId?: string) {
    const verification = await this.verifyOrderPrices(donhangId);
    
    if (verification.summary.incorrectPrices === 0) {
      return {
        message: 'Tất cả giá đã đúng, không cần sync',
        updated: 0
      };
    }
    
    const updates = await this.prisma.$transaction(async (tx) => {
      const results = [];
      
      for (const detail of verification.details) {
        if (!detail.isCorrect && detail.expectedPrice !== null) {
          const updated = await tx.donhangsanpham.update({
            where: { id: detail.sanphamId },
            data: {
              giaban: detail.expectedPrice,
              ttnhan: detail.expectedPrice * Number((await tx.donhangsanpham.findUnique({ where: { id: detail.sanphamId } })).slnhan)
            }
          });
          
          results.push({
            sanphamId: detail.sanphamId,
            masp: detail.masp,
            oldPrice: detail.currentPrice,
            newPrice: detail.expectedPrice
          });
        }
      }
      
      // Create audit log
      if (userId && results.length > 0) {
        await tx.auditLog.create({
          data: {
            userId,
            action: 'UPDATE',
            entityName: 'Donhang',
            entityId: donhangId,
            metadata: {
              action: 'PRICE_SYNC',
              updatedProducts: results.length,
              details: results
            }
          }
        });
      }
      
      return results;
    });
    
    return {
      message: `Đã sync ${updates.length} sản phẩm`,
      updated: updates.length,
      details: updates
    };
  }
  
  /**
   * Bulk verify multiple orders
   */
  async bulkVerifyOrders(donhangIds: string[]) {
    const results = await Promise.all(
      donhangIds.map(id => this.verifyOrderPrices(id))
    );
    
    const summary = {
      totalOrders: results.length,
      ordersWithErrors: results.filter(r => r.summary.incorrectPrices > 0).length,
      totalIncorrectPrices: results.reduce((sum, r) => sum + r.summary.incorrectPrices, 0)
    };
    
    return {
      summary,
      orders: results
    };
  }
}
```

---

## STEP 5: CONTROLLER & API ENDPOINTS

File: `api/src/banggia/banggia.controller.ts`

```typescript
@Controller('banggia')
export class BanggiaController {
  constructor(
    private banggiaService: BanggiaService,
    private priceHistoryService: BanggiaPriceHistoryService
  ) {}
  
  /**
   * POST /banggia/:banggiaId/sanpham/:sanphamId/price
   * Cập nhật giá sản phẩm
   */
  @Post(':banggiaId/sanpham/:sanphamId/price')
  async updateProductPrice(
    @Param('banggiaId') banggiaId: string,
    @Param('sanphamId') sanphamId: string,
    @Body() dto: {
      newPrice: number;
      reason?: string;
    },
    @Req() req: any
  ) {
    return this.banggiaService.updateProductPrice(
      banggiaId,
      sanphamId,
      dto.newPrice,
      req.user?.id,
      dto.reason
    );
  }
  
  /**
   * GET /banggia/:banggiaId/sanpham/:sanphamId/price-history
   * Lấy lịch sử giá
   */
  @Get(':banggiaId/sanpham/:sanphamId/price-history')
  async getPriceHistory(
    @Param('banggiaId') banggiaId: string,
    @Param('sanphamId') sanphamId: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
    @Query('limit') limit?: string
  ) {
    return this.priceHistoryService.getPriceHistory(
      banggiaId,
      sanphamId,
      {
        from: from ? new Date(from) : undefined,
        to: to ? new Date(to) : undefined,
        limit: limit ? parseInt(limit) : undefined
      }
    );
  }
  
  /**
   * GET /banggia/:banggiaId/sanpham/:sanphamId/price-at-date
   * Lấy giá tại thời điểm cụ thể
   */
  @Get(':banggiaId/sanpham/:sanphamId/price-at-date')
  async getPriceAtDate(
    @Param('banggiaId') banggiaId: string,
    @Param('sanphamId') sanphamId: string,
    @Query('date') date: string
  ) {
    const price = await this.priceHistoryService.getPriceAtDate(
      banggiaId,
      sanphamId,
      new Date(date)
    );
    
    return { price };
  }
}
```

File: `api/src/donhang/donhang.controller.ts`

```typescript
@Controller('donhang')
export class DonhangController {
  constructor(
    private donhangService: DonhangService,
    private priceVerificationService: DonhangPriceVerificationService
  ) {}
  
  /**
   * POST /donhang/:id/verify-prices
   * Kiểm tra giá đơn hàng
   */
  @Post(':id/verify-prices')
  async verifyPrices(@Param('id') id: string) {
    return this.priceVerificationService.verifyOrderPrices(id);
  }
  
  /**
   * POST /donhang/:id/sync-prices
   * Sync lại giá đúng
   */
  @Post(':id/sync-prices')
  async syncPrices(
    @Param('id') id: string,
    @Req() req: any
  ) {
    return this.priceVerificationService.syncOrderPrices(id, req.user?.id);
  }
  
  /**
   * POST /donhang/bulk-verify-prices
   * Verify nhiều đơn hàng
   */
  @Post('bulk-verify-prices')
  async bulkVerifyPrices(@Body() dto: { donhangIds: string[] }) {
    return this.priceVerificationService.bulkVerifyOrders(dto.donhangIds);
  }
}
```

---

## STEP 6: FRONTEND INTEGRATION

### 6.1. Service Methods

File: `frontend/src/app/admin/banggia/banggia.service.ts`

```typescript
/**
 * Cập nhật giá sản phẩm
 */
async updateProductPrice(
  banggiaId: string,
  sanphamId: string,
  newPrice: number,
  reason?: string
): Promise<any> {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this._StorageService.getItem('token')
    },
    body: JSON.stringify({ newPrice, reason })
  };
  
  const response = await fetch(
    `${environment.APIURL}/banggia/${banggiaId}/sanpham/${sanphamId}/price`,
    options
  );
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Lỗi cập nhật giá');
  }
  
  return response.json();
}

/**
 * Lấy lịch sử giá
 */
async getPriceHistory(
  banggiaId: string,
  sanphamId: string
): Promise<any> {
  const options = {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + this._StorageService.getItem('token')
    }
  };
  
  const response = await fetch(
    `${environment.APIURL}/banggia/${banggiaId}/sanpham/${sanphamId}/price-history`,
    options
  );
  
  return response.json();
}
```

File: `frontend/src/app/admin/donhang/donhang.service.ts`

```typescript
/**
 * Verify giá đơn hàng
 */
async verifyOrderPrices(donhangId: string): Promise<any> {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this._StorageService.getItem('token')
    }
  };
  
  const response = await fetch(
    `${environment.APIURL}/donhang/${donhangId}/verify-prices`,
    options
  );
  
  return response.json();
}

/**
 * Sync lại giá đúng
 */
async syncOrderPrices(donhangId: string): Promise<any> {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this._StorageService.getItem('token')
    }
  };
  
  const response = await fetch(
    `${environment.APIURL}/donhang/${donhangId}/sync-prices`,
    options
  );
  
  return response.json();
}
```

---

## 📋 TESTING CHECKLIST

### Test Scenario 1: Price Update with History

```typescript
// 1. Cập nhật giá
const result = await banggiaService.updateProductPrice(
  'banggia-21-id',
  'i100002-id',
  25000,
  'user-id',
  'Điều chỉnh giá theo thị trường'
);

// Expected:
// - Banggiasanpham.giaban = 25000
// - Old history record: validTo = NOW
// - New history record: giaban = 25000, validFrom = NOW, validTo = NULL
```

### Test Scenario 2: Create Order with Price Tracking

```typescript
// 2. Tạo đơn hàng
const donhang = await donhangService.create({
  khachhangId: 'ut-ut-47-id',
  banggiaId: 'banggia-21-id',
  sanpham: [
    { idSP: 'i100002-id', slnhan: 10 }
  ]
});

// Expected:
// - Donhangsanpham.giaban = 25000 (giá hiện tại)
// - Donhangsanpham.priceHistoryId = history-record-id
// - Donhangsanpham.priceSnapshotAt = NOW
// - Donhangsanpham.originalBanggiaId = 'banggia-21-id'
```

### Test Scenario 3: Verify Old Order Prices

```typescript
// 3. Verify giá đơn hàng cũ
const verification = await priceVerificationService.verifyOrderPrices('old-order-id');

// Expected:
// - summary.correctPrices = số sản phẩm đúng giá
// - summary.incorrectPrices = số sản phẩm sai giá
// - details[] có thông tin chi tiết từng sản phẩm
```

### Test Scenario 4: Sync Incorrect Prices

```typescript
// 4. Sync lại giá đúng
const syncResult = await priceVerificationService.syncOrderPrices('old-order-id');

// Expected:
// - Cập nhật giá sản phẩm về giá đúng tại thời điểm tạo đơn
// - Ghi audit log
// - Return số sản phẩm đã cập nhật
```

---

## 🎯 SUMMARY

Với implementation này, bạn có thể:

✅ **Track toàn bộ lịch sử thay đổi giá**
✅ **Verify giá đơn hàng đã đúng chưa**
✅ **Sync lại giá chính xác khi cần**
✅ **Audit trail đầy đủ**
✅ **Rollback về giá cũ**
✅ **Prevent large price changes without reason**

**Next Steps:**
1. Run migrations
2. Test with sample data
3. Add frontend UI
4. Deploy to staging
5. Test với real data
6. Deploy to production
