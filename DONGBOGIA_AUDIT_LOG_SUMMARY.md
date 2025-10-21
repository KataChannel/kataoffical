# Summary: Audit Log Đồng Bộ Giá

## Thay Đổi

Đã bổ sung ghi log audit đầy đủ cho chức năng đồng bộ giá (`dongbogia`) trong file `api/src/donhang/donhang.service.ts`.

## Tính Năng

### 1. Log Thay Đổi Giá Sản Phẩm
- Ghi log **CHỈ KHI** giá thay đổi (không ghi nếu giá không đổi)
- Lưu giá trị cũ và mới của: `giaban`, `ttdat`, `ttgiao`, `ttnhan`, `ttsauvat`
- Metadata chi tiết: đơn hàng, khách hàng, bảng giá, nguồn giá, % thay đổi

### 2. Log Cập Nhật Tổng Tiền
- Ghi log sau khi cập nhật xong tất cả sản phẩm
- Lưu giá trị cũ và mới của: `tongvat`, `tongtien`
- Metadata: tổng chưa VAT, VAT rate, % thay đổi, số sản phẩm cập nhật

## Metadata Lưu Trong Log

### Log Sản Phẩm:
```json
{
  "action": "DONGBOGIA",
  "madonhang": "DH-2025-001",
  "khachhangName": "Công ty ABC",
  "mabanggia": "BG-VIP-2025",
  "sanphamTitle": "Gạo ST25 túi 5kg",
  "sanphamMasp": "GAO-ST25-5KG",
  "giaSource": "bảng giá BG-VIP-2025 (của khách hàng)",
  "giaDifference": 2000,
  "percentChange": "20.00%"
}
```

### Log Đơn Hàng:
```json
{
  "action": "DONGBOGIA_TOTAL",
  "madonhang": "DH-2025-001",
  "khachhangName": "Công ty ABC",
  "mabanggia": "BG-VIP-2025",
  "tongchua": 120000,
  "vatRate": 0.1,
  "tongtienDifference": 22000,
  "percentChange": "20.00%",
  "updatedProductsCount": 5
}
```

## Console Log Mới

### Giá thay đổi:
```
✅ Cập nhật sản phẩm Gạo ST25 túi 5kg - Giá: 10000 → 12000 (từ bảng giá BG-VIP-2025 (của khách hàng))
```

### Giá không đổi:
```
ℹ️ Sản phẩm Gạo ST25 túi 5kg - Giá không đổi: 12000 (từ bảng giá BG-VIP-2025 (của khách hàng))
```

### Tổng tiền:
```
Cập nhật tổng tiền đơn hàng DH-2025-001: Tổng chưa VAT: 120000, VAT: 12000, Tổng tiền: 110000 → 132000
```

## Truy Vấn Đối Soát

### Xem lịch sử thay đổi giá của đơn hàng:
```sql
SELECT * FROM "AuditLog"
WHERE metadata->>'madonhang' = 'DH-2025-001'
  AND metadata->>'action' IN ('DONGBOGIA', 'DONGBOGIA_TOTAL')
ORDER BY "createdAt" DESC;
```

### Xem tất cả sản phẩm có giá thay đổi hôm nay:
```sql
SELECT 
  metadata->>'sanphamTitle' as sanpham,
  "oldValues"->>'giaban' as gia_cu,
  "newValues"->>'giaban' as gia_moi,
  metadata->>'percentChange' as thay_doi
FROM "AuditLog"
WHERE "entityName" = 'Donhangsanpham'
  AND metadata->>'action' = 'DONGBOGIA'
  AND DATE("createdAt") = CURRENT_DATE
ORDER BY "createdAt" DESC;
```

## Lợi Ích

✅ **Đối soát**: Có thể tra cứu lịch sử thay đổi giá bất kỳ lúc nào  
✅ **Truy vết**: Biết giá lấy từ đâu (bảng giá nào, khách hàng nào)  
✅ **Phân tích**: Thống kê xu hướng thay đổi giá  
✅ **Rollback**: Có thể hoàn tác nếu cần (dùng oldValues)  
✅ **Compliance**: Đáp ứng yêu cầu audit, kiểm toán  

## Performance

- ⚡ Audit log tạo trong **cùng transaction** với update
- ⚡ Chỉ ghi log khi **có thay đổi thực sự**
- ⚡ Không ảnh hưởng performance đáng kể

## Recommendation

📊 Thêm indexes cho queries nhanh hơn:
```sql
CREATE INDEX idx_auditlog_metadata_action ON "AuditLog" ((metadata->>'action'));
CREATE INDEX idx_auditlog_metadata_madonhang ON "AuditLog" ((metadata->>'madonhang'));
```

---

**Files Modified**:
- ✅ `api/src/donhang/donhang.service.ts` - Thêm audit log logic

**Documentation**:
- ✅ `DONGBOGIA_AUDIT_LOG.md` - Chi tiết đầy đủ
- ✅ `DONGBOGIA_AUDIT_LOG_SUMMARY.md` - Tóm tắt (file này)

**Status**: ✅ Completed & Ready for Testing
