# Audit Log Cho Đồng Bộ Giá Đơn Hàng

## Tổng Quan

Hệ thống ghi log đầy đủ mọi thay đổi giá khi chạy đồng bộ giá (`dongbogia`), giúp đối soát và kiểm tra lịch sử thay đổi.

## Cấu Trúc Audit Log

### Model AuditLog
```prisma
model AuditLog {
  id            String      @id @default(uuid())
  entityName    String?     // 'Donhangsanpham' hoặc 'Donhang'
  entityId      String?     // ID của entity
  action        AuditAction // 'UPDATE'
  userId        String?
  userEmail     String?
  oldValues     Json?       // Giá trị cũ
  newValues     Json?       // Giá trị mới
  changedFields String[]    // Các field đã thay đổi
  metadata      Json?       // Thông tin bổ sung
  createdAt     DateTime    @default(now())
  status        String      @default("SUCCESS")
}
```

## Các Loại Log

### 1. Log Cập Nhật Giá Sản Phẩm

**Khi nào**: Mỗi khi giá sản phẩm trong đơn hàng thay đổi

**Entity**: `Donhangsanpham`

**Dữ liệu ghi**:

```typescript
{
  entityName: 'Donhangsanpham',
  entityId: '<donhangsanpham_id>',
  action: 'UPDATE',
  
  oldValues: {
    giaban: 10000,      // Giá bán cũ
    ttdat: 100000,      // Thành tiền đặt cũ
    ttgiao: 100000,     // Thành tiền giao cũ
    ttnhan: 100000,     // Thành tiền nhận cũ
    ttsauvat: 110000    // Thành tiền sau VAT cũ
  },
  
  newValues: {
    giaban: 12000,      // Giá bán mới
    ttdat: 120000,      // Thành tiền đặt mới
    ttgiao: 120000,     // Thành tiền giao mới
    ttnhan: 120000,     // Thành tiền nhận mới
    ttsauvat: 132000    // Thành tiền sau VAT mới
  },
  
  changedFields: ['giaban', 'ttdat', 'ttgiao', 'ttnhan', 'ttsauvat'],
  
  metadata: {
    action: 'DONGBOGIA',
    donhangId: '<donhang_id>',
    madonhang: 'DH-2025-001',
    khachhangId: '<khachhang_id>',
    khachhangName: 'Công ty ABC',
    banggiaId: '<banggia_id>',
    mabanggia: 'BG-VIP-2025',
    sanphamId: '<sanpham_id>',
    sanphamTitle: 'Gạo ST25 túi 5kg',
    sanphamMasp: 'GAO-ST25-5KG',
    giaSource: 'bảng giá BG-VIP-2025 (của khách hàng)',
    giaDifference: 2000,              // 12000 - 10000
    percentChange: '20.00%'           // (2000 / 10000) * 100
  },
  
  status: 'SUCCESS'
}
```

### 2. Log Cập Nhật Tổng Tiền Đơn Hàng

**Khi nào**: Sau khi cập nhật xong tất cả sản phẩm trong đơn hàng

**Entity**: `Donhang`

**Dữ liệu ghi**:

```typescript
{
  entityName: 'Donhang',
  entityId: '<donhang_id>',
  action: 'UPDATE',
  
  oldValues: {
    tongvat: 10000,     // Tổng VAT cũ
    tongtien: 110000    // Tổng tiền cũ
  },
  
  newValues: {
    tongvat: 12000,     // Tổng VAT mới
    tongtien: 132000    // Tổng tiền mới
  },
  
  changedFields: ['tongvat', 'tongtien'],
  
  metadata: {
    action: 'DONGBOGIA_TOTAL',
    madonhang: 'DH-2025-001',
    khachhangId: '<khachhang_id>',
    khachhangName: 'Công ty ABC',
    banggiaId: '<banggia_id>',
    mabanggia: 'BG-VIP-2025',
    tongchua: 120000,                 // Tổng chưa VAT
    vatRate: 0.1,                     // 10%
    tongtienDifference: 22000,        // 132000 - 110000
    percentChange: '20.00%',          // (22000 / 110000) * 100
    updatedProductsCount: 5           // Số sản phẩm đã cập nhật
  },
  
  status: 'SUCCESS'
}
```

## Truy Vấn Audit Log

### 1. Xem Lịch Sử Thay Đổi Giá Của Một Đơn Hàng

```sql
SELECT 
  al.*
FROM 
  "AuditLog" al
WHERE 
  al."metadata"->>'madonhang' = 'DH-2025-001'
  AND al."metadata"->>'action' IN ('DONGBOGIA', 'DONGBOGIA_TOTAL')
ORDER BY 
  al."createdAt" DESC;
```

### 2. Xem Tất Cả Sản Phẩm Đã Thay Đổi Giá

```sql
SELECT 
  al."createdAt",
  al."metadata"->>'madonhang' as madonhang,
  al."metadata"->>'sanphamTitle' as sanpham,
  al."oldValues"->>'giaban' as gia_cu,
  al."newValues"->>'giaban' as gia_moi,
  al."metadata"->>'giaDifference' as chenh_lech,
  al."metadata"->>'percentChange' as phan_tram,
  al."metadata"->>'giaSource' as nguon_gia
FROM 
  "AuditLog" al
WHERE 
  al."entityName" = 'Donhangsanpham'
  AND al."metadata"->>'action' = 'DONGBOGIA'
ORDER BY 
  al."createdAt" DESC;
```

### 3. Thống Kê Đồng Bộ Giá Theo Ngày

```sql
SELECT 
  DATE(al."createdAt") as ngay,
  COUNT(DISTINCT al."metadata"->>'madonhang') as so_don_hang,
  COUNT(CASE WHEN al."entityName" = 'Donhangsanpham' THEN 1 END) as so_san_pham,
  AVG((al."newValues"->>'giaban')::numeric - (al."oldValues"->>'giaban')::numeric) as avg_gia_chenh_lech
FROM 
  "AuditLog" al
WHERE 
  al."metadata"->>'action' = 'DONGBOGIA'
GROUP BY 
  DATE(al."createdAt")
ORDER BY 
  ngay DESC;
```

### 4. Xem Đơn Hàng Có Thay Đổi Giá Lớn Nhất

```sql
SELECT 
  al."metadata"->>'madonhang' as madonhang,
  al."metadata"->>'khachhangName' as khach_hang,
  al."metadata"->>'mabanggia' as bang_gia,
  (al."newValues"->>'tongtien')::numeric - (al."oldValues"->>'tongtien')::numeric as chenh_lech_tien,
  al."metadata"->>'percentChange' as phan_tram_thay_doi,
  al."createdAt"
FROM 
  "AuditLog" al
WHERE 
  al."entityName" = 'Donhang'
  AND al."metadata"->>'action' = 'DONGBOGIA_TOTAL'
ORDER BY 
  ABS((al."newValues"->>'tongtien')::numeric - (al."oldValues"->>'tongtien')::numeric) DESC
LIMIT 10;
```

### 5. Kiểm Tra Sản Phẩm Có Giá Tăng/Giảm

```sql
-- Giá tăng
SELECT 
  al."metadata"->>'sanphamTitle' as san_pham,
  al."metadata"->>'sanphamMasp' as ma_sp,
  COUNT(*) as so_lan_tang,
  AVG((al."metadata"->>'giaDifference')::numeric) as avg_tang,
  MAX(al."createdAt") as lan_gan_nhat
FROM 
  "AuditLog" al
WHERE 
  al."entityName" = 'Donhangsanpham'
  AND al."metadata"->>'action' = 'DONGBOGIA'
  AND (al."metadata"->>'giaDifference')::numeric > 0
GROUP BY 
  al."metadata"->>'sanphamTitle',
  al."metadata"->>'sanphamMasp'
ORDER BY 
  so_lan_tang DESC;

-- Giá giảm
SELECT 
  al."metadata"->>'sanphamTitle' as san_pham,
  al."metadata"->>'sanphamMasp' as ma_sp,
  COUNT(*) as so_lan_giam,
  AVG((al."metadata"->>'giaDifference')::numeric) as avg_giam,
  MAX(al."createdAt") as lan_gan_nhat
FROM 
  "AuditLog" al
WHERE 
  al."entityName" = 'Donhangsanpham'
  AND al."metadata"->>'action' = 'DONGBOGIA'
  AND (al."metadata"->>'giaDifference')::numeric < 0
GROUP BY 
  al."metadata"->>'sanphamTitle',
  al."metadata"->>'sanphamMasp'
ORDER BY 
  so_lan_giam DESC;
```

## Use Cases

### 1. Đối Soát Thay Đổi Giá

**Scenario**: Khách hàng phàn nàn giá đơn hàng thay đổi

**Cách xử lý**:
```typescript
// Query audit log
const logs = await prisma.auditLog.findMany({
  where: {
    metadata: {
      path: ['madonhang'],
      equals: 'DH-2025-001'
    },
    entityName: 'Donhangsanpham'
  },
  orderBy: { createdAt: 'desc' }
});

// Kiểm tra từng thay đổi
logs.forEach(log => {
  console.log(`
    Sản phẩm: ${log.metadata.sanphamTitle}
    Giá cũ: ${log.oldValues.giaban}
    Giá mới: ${log.newValues.giaban}
    Nguồn: ${log.metadata.giaSource}
    Thời gian: ${log.createdAt}
    Bảng giá: ${log.metadata.mabanggia}
  `);
});
```

### 2. Báo Cáo Thay Đổi Giá Hàng Loạt

**Scenario**: Cần báo cáo tất cả đơn hàng đã đồng bộ giá trong tháng

**Cách xử lý**:
```typescript
const report = await prisma.auditLog.groupBy({
  by: ['entityName'],
  where: {
    metadata: {
      path: ['action'],
      string_contains: 'DONGBOGIA'
    },
    createdAt: {
      gte: new Date('2025-01-01'),
      lte: new Date('2025-01-31')
    }
  },
  _count: true
});

console.log(`
  Tổng số sản phẩm cập nhật giá: ${report[0]._count}
  Tổng số đơn hàng cập nhật: ${report[1]._count}
`);
```

### 3. Kiểm Tra Sản Phẩm Không Đồng Bộ Được

**Scenario**: Một số sản phẩm không tìm thấy giá

**Cách xử lý**:
```typescript
// Tìm trong console log
const warnings = await prisma.auditLog.findMany({
  where: {
    entityName: 'Donhangsanpham',
    metadata: {
      path: ['giaSource'],
      string_contains: 'không tìm thấy'
    }
  }
});

// Danh sách sản phẩm cần kiểm tra
const problemProducts = warnings.map(w => ({
  sanpham: w.metadata.sanphamTitle,
  masp: w.metadata.sanphamMasp,
  donhang: w.metadata.madonhang,
  banggia: w.metadata.mabanggia,
  reason: w.metadata.giaSource
}));
```

### 4. Rollback Giá (Nếu Cần)

**Scenario**: Cần hoàn tác đồng bộ giá do nhầm lẫn

**Cách xử lý**:
```typescript
// Lấy log của batch đồng bộ cuối cùng
const lastSync = await prisma.auditLog.findMany({
  where: {
    metadata: {
      path: ['action'],
      equals: 'DONGBOGIA'
    },
    createdAt: {
      gte: lastSyncTime
    }
  },
  orderBy: { createdAt: 'asc' }
});

// Rollback từng record
for (const log of lastSync) {
  if (log.entityName === 'Donhangsanpham') {
    await prisma.donhangsanpham.update({
      where: { id: log.entityId },
      data: log.oldValues
    });
  } else if (log.entityName === 'Donhang') {
    await prisma.donhang.update({
      where: { id: log.entityId },
      data: log.oldValues
    });
  }
}
```

## Console Log Output

### Khi Giá Thay Đổi:
```
✅ Cập nhật sản phẩm Gạo ST25 túi 5kg - Giá: 10000 → 12000 (từ bảng giá BG-VIP-2025 (của khách hàng))
```

### Khi Giá Không Đổi:
```
ℹ️ Sản phẩm Gạo ST25 túi 5kg - Giá không đổi: 12000 (từ bảng giá BG-VIP-2025 (của khách hàng))
```

### Khi Không Tìm Thấy Giá:
```
⚠️ Sản phẩm Gạo ST25 túi 5kg - không tìm thấy trong cả 2 bảng giá (trả về 0), giữ nguyên giá cũ
```

### Khi Cập Nhật Tổng Tiền:
```
Cập nhật tổng tiền đơn hàng DH-2025-001: Tổng chưa VAT: 120000, VAT: 12000, Tổng tiền: 110000 → 132000
```

## Performance Considerations

### 1. Batch Processing
- Audit log được tạo trong cùng transaction với update
- Không ảnh hưởng đến tốc độ xử lý chính

### 2. Index Recommendations
```sql
-- Index cho metadata queries
CREATE INDEX idx_auditlog_metadata_action 
ON "AuditLog" ((metadata->>'action'));

CREATE INDEX idx_auditlog_metadata_madonhang 
ON "AuditLog" ((metadata->>'madonhang'));

CREATE INDEX idx_auditlog_metadata_sanphamId 
ON "AuditLog" ((metadata->>'sanphamId'));

-- Index cho date range queries
CREATE INDEX idx_auditlog_createdat_entityname 
ON "AuditLog" ("createdAt", "entityName");
```

### 3. Retention Policy
```sql
-- Xóa audit log cũ hơn 6 tháng (tùy chọn)
DELETE FROM "AuditLog"
WHERE 
  "createdAt" < NOW() - INTERVAL '6 months'
  AND "metadata"->>'action' IN ('DONGBOGIA', 'DONGBOGIA_TOTAL');
```

## Data Retention

### Khuyến Nghị:
- **Production**: Giữ log ít nhất 12 tháng
- **Archive**: Backup sang cold storage sau 12 tháng
- **Hot data**: 3 tháng gần nhất (query nhanh)

### Storage Estimate:
- Mỗi log sản phẩm: ~2KB
- Mỗi log đơn hàng: ~1KB
- 1000 đơn/tháng × 10 sản phẩm/đơn = 20MB/tháng
- 12 tháng ≈ 240MB

## Security & Compliance

### 1. Access Control
```typescript
// Chỉ admin mới xem được audit log
@UseGuards(AdminGuard)
@Get('audit-logs')
async getAuditLogs(@Query() query: AuditLogQuery) {
  return this.auditService.findLogs(query);
}
```

### 2. Data Privacy
- Không lưu thông tin nhạy cảm (password, token)
- Chỉ lưu metadata cần thiết cho đối soát
- Tuân thủ GDPR/PDPA nếu có

### 3. Audit Trail Integrity
- Log không thể sửa/xóa (immutable)
- Timestamp đáng tin cậy (server time)
- Có checksum/hash nếu cần (tùy chọn)

## Troubleshooting

### 1. Log Không Được Tạo

**Nguyên nhân**:
- Transaction failed
- Prisma client error
- Database connection issue

**Kiểm tra**:
```typescript
try {
  await prisma.auditLog.create({ ... });
} catch (error) {
  console.error('Failed to create audit log:', error);
  // Log ra file hoặc monitoring system
}
```

### 2. Metadata Không Đúng

**Nguyên nhân**:
- JSON structure sai
- Missing fields

**Validate**:
```typescript
const metadata = {
  action: 'DONGBOGIA',
  madonhang: donhang.madonhang,
  // ... ensure all required fields
};

// Validate before insert
if (!metadata.madonhang || !metadata.mabanggia) {
  throw new Error('Invalid audit log metadata');
}
```

### 3. Performance Issues

**Nguyên nhân**:
- Too many logs
- Missing indexes
- Large JSON data

**Optimize**:
- Add proper indexes
- Paginate queries
- Archive old data
- Use materialized views for reports

## Best Practices

1. ✅ **Always log trong transaction**: Đảm bảo consistency
2. ✅ **Include context**: Đủ thông tin để trace back
3. ✅ **Structured metadata**: JSON có cấu trúc rõ ràng
4. ✅ **Timestamp accurate**: Dùng database time
5. ✅ **Status tracking**: SUCCESS/ERROR/PARTIAL
6. ✅ **Meaningful messages**: Console log dễ đọc
7. ✅ **Index strategically**: Query performance
8. ✅ **Archive old data**: Storage management
9. ✅ **Monitor log volume**: Alert nếu bất thường
10. ✅ **Test rollback**: Có thể hoàn tác nếu cần

## Summary

### Audit Log Features:
- ✅ Ghi log mọi thay đổi giá sản phẩm
- ✅ Ghi log mọi thay đổi tổng tiền đơn hàng
- ✅ Lưu giá trị cũ và mới đầy đủ
- ✅ Metadata chi tiết (khách hàng, bảng giá, nguồn giá, % thay đổi)
- ✅ Timestamp chính xác
- ✅ Có thể truy vấn và đối soát
- ✅ Hỗ trợ rollback nếu cần

### Use Cases:
- 📊 Báo cáo thay đổi giá
- 🔍 Đối soát khách hàng
- 📈 Phân tích xu hướng giá
- 🛡️ Audit compliance
- ⏮️ Rollback nếu sai

---

**Created**: January 2025  
**Version**: 1.0.0  
**Status**: ✅ Implemented & Documented
