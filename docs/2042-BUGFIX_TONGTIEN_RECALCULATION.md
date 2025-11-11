# Bug Fix: Cập nhật tự động tongtien khi thay đổi slnhan

**Ngày:** 2025-01-XX  
**Severity:** 🔴 HIGH - Ảnh hưởng tính toán tài chính  
**Status:** ✅ FIXED

---

## 🐛 Mô tả bug

Khi cập nhật **số lượng nhận** (`slnhan`) trong đơn hàng, các field tính toán **KHÔNG được cập nhật**:
- ❌ `ttnhan` (thành tiền nhận) không được tính lại theo công thức `giaban * slnhan`
- ❌ `ttsauvat` (thành tiền sau VAT) không được tính lại theo công thức `ttnhan * (1 + vat)`
- ❌ `tongtien` của đơn hàng không được tính lại
- ❌ `tongvat` của đơn hàng không được tính lại

**Hậu quả:**
- Số tiền hiển thị không chính xác
- Báo cáo tài chính/công nợ sai
- Dữ liệu không đồng bộ giữa số lượng và thành tiền

---

## 🔍 Root Cause Analysis

### Công thức tính toán đúng:
```typescript
// Tính cho từng sản phẩm
ttnhan = giaban * slnhan
ttsauvat = ttnhan * (1 + vat)

// Tính cho đơn hàng
tongchua = SUM(ttnhan của tất cả sản phẩm)
tongvat = tongchua * vatRate
tongtien = tongchua + tongvat
```

### Các hàm bị ảnh hưởng:

#### 1. **`update()` - Chuyển trạng thái sang `danhan`**
📍 **Line:** ~2497

**Code cũ:**
```typescript
sanpham: {
  updateMany: data.sanpham.map((item: any) => {
    return {
      where: { idSP: item.id },
      data: {
        ghichu: shortageNote,
        slnhan: received,  // ❌ Chỉ update slnhan
      },
    };
  }),
},
```

**Vấn đề:** Chỉ cập nhật `slnhan` và `ghichu`, không tính lại `ttnhan`, `ttsauvat`, `tongtien`, `tongvat`.

---

#### 2. **`completeDonhang()` - Hoàn tất đơn hàng**
📍 **Line:** ~3348

**Code cũ:**
```typescript
await prisma.donhangsanpham.update({
  where: { id: sp.id },
  data: {
    slnhan: data.slnhan,  // ❌ Chỉ update slnhan
    ghichu: data.ghichu
  }
});
```

**Vấn đề:** Giống như trên, không tính lại các trường tiền.

---

#### 3. **`completePendingDeliveriesForProduct()` - Auto-complete trước chốt kho**
📍 **Line:** ~3445

**Code cũ:**
```typescript
await prisma.donhangsanpham.update({
  where: { id: update.id },
  data: {
    slnhan: update.slnhan,  // ❌ Chỉ update slnhan
    ghichu: update.ghichu
  }
});
```

**Vấn đề:** Khi auto-complete hàng loạt đơn hàng, tất cả đều có tiền sai.

---

## ✅ Solution

### Fix 1: Hàm `update()` - Trạng thái `danhan`

**Code mới:**
```typescript
// 🔥 Tính lại ttnhan, ttsauvat và tổng tiền cho đơn hàng
let tongchua = 0;

// Update từng sản phẩm với tính toán lại giá trị
for (const item of data.sanpham) {
  const delivered = parseFloat((item.slgiao ?? 0).toFixed(3));
  const received = parseFloat((item.slnhan ?? 0).toFixed(3));
  
  // Tìm sản phẩm trong DB để lấy giaban và vat
  const donhangSanpham = oldDonhang.sanpham.find((sp: any) => sp.idSP === item.id);
  if (!donhangSanpham) continue;
  
  const giaban = parseFloat((donhangSanpham.giaban ?? 0).toFixed(3));
  const vat = parseFloat((donhangSanpham.vat ?? 0).toFixed(3));
  
  // 🔥 Tính lại ttnhan và ttsauvat dựa trên slnhan
  const ttnhan = giaban * received;
  const ttsauvat = ttnhan * (1 + vat);
  
  tongchua += ttnhan;
  
  const shortageNote = received < delivered
    ? item.ghichu
      ? `${item.ghichu}; thiếu ${(delivered - received).toFixed(3)}`
      : `Thiếu ${(delivered - received).toFixed(3)}`
    : item.ghichu || '';
  
  await prisma.donhangsanpham.update({
    where: { id: donhangSanpham.id },
    data: {
      ghichu: shortageNote,
      slnhan: received,
      ttnhan: parseFloat(ttnhan.toFixed(3)),        // ✅ Tính lại
      ttsauvat: parseFloat(ttsauvat.toFixed(3)),    // ✅ Tính lại
    },
  });
}

// 🔥 Tính lại tổng tiền cho đơn hàng
const vatRate = parseFloat((oldDonhang.vat ?? 0).toFixed(3));
const tongvat = tongchua * vatRate;
const tongtien = tongchua + tongvat;

return prisma.donhang.update({
  where: { id },
  data: {
    status: 'danhan',
    printCount: data.printCount !== undefined ? data.printCount : undefined,
    tongtien: parseFloat(tongtien.toFixed(3)),      // ✅ Cập nhật
    tongvat: parseFloat(tongvat.toFixed(3)),        // ✅ Cập nhật
  },
});
```

**Changes:**
- ✅ Tính lại `ttnhan = giaban * slnhan`
- ✅ Tính lại `ttsauvat = ttnhan * (1 + vat)`
- ✅ Sum tất cả `ttnhan` thành `tongchua`
- ✅ Tính lại `tongvat = tongchua * vatRate`
- ✅ Tính lại `tongtien = tongchua + tongvat`

---

### Fix 2: Hàm `completeDonhang()`

**Code mới:**
```typescript
// Cập nhật số lượng nhận trong donhangsanpham và tính lại ttnhan, ttsauvat
let tongchua = 0;

for (const sp of donhang.sanpham) {
  const giaban = parseFloat((sp.giaban || 0).toString());
  const vat = parseFloat((sp.vat || 0).toString());
  const newSlnhan = parseFloat(data.slnhan.toString());
  
  // 🔥 Tính lại ttnhan và ttsauvat dựa trên slnhan
  const ttnhan = giaban * newSlnhan;
  const ttsauvat = ttnhan * (1 + vat);
  
  tongchua += ttnhan;
  
  await prisma.donhangsanpham.update({
    where: { id: sp.id },
    data: {
      slnhan: newSlnhan,
      ttnhan: parseFloat(ttnhan.toFixed(3)),        // ✅ Tính lại
      ttsauvat: parseFloat(ttsauvat.toFixed(3)),    // ✅ Tính lại
      ghichu: data.ghichu
    }
  });

  // ... TonKho updates ...
}

// 🔥 Tính lại tổng tiền cho đơn hàng
const vatRate = parseFloat((donhang.vat || 0).toString());
const tongvat = tongchua * vatRate;
const tongtien = tongchua + tongvat;

await prisma.donhang.update({
  where: { id },
  data: {
    tongtien: parseFloat(tongtien.toFixed(3)),      // ✅ Cập nhật
    tongvat: parseFloat(tongvat.toFixed(3)),        // ✅ Cập nhật
  }
});
```

---

### Fix 3: Hàm `completePendingDeliveriesForProduct()`

**Code mới:**
```typescript
for (const order of batch) {
  // 🔥 Tính lại tổng tiền cho đơn hàng
  let tongchua = 0;
  
  // Collect all sanpham updates for this order
  const sanphamUpdates = order.sanpham.map(sp => {
    const giaban = parseFloat((sp.giaban || 0).toString());
    const vat = parseFloat((sp.vat || 0).toString());
    const slnhan = parseFloat((sp.slgiao || 0).toString()); // slnhan = slgiao khi auto-complete
    
    // 🔥 Tính lại ttnhan và ttsauvat
    const ttnhan = giaban * slnhan;
    const ttsauvat = ttnhan * (1 + vat);
    
    tongchua += ttnhan;
    
    return {
      id: sp.id,
      slnhan: slnhan,
      ttnhan: parseFloat(ttnhan.toFixed(3)),        // ✅ Tính lại
      ttsauvat: parseFloat(ttsauvat.toFixed(3)),    // ✅ Tính lại
      ghichu: (sp.ghichu || '') + ' | Auto-completed for inventory close'
    };
  });

  // 🔥 Tính tổng tiền đơn hàng
  const vatRate = parseFloat((order.vat || 0).toString());
  const tongvat = tongchua * vatRate;
  const tongtien = tongchua + tongvat;

  // Update order status
  await prisma.donhang.update({
    where: { id: order.id },
    data: {
      status: 'danhan',
      tongtien: parseFloat(tongtien.toFixed(3)),    // ✅ Cập nhật
      tongvat: parseFloat(tongvat.toFixed(3)),      // ✅ Cập nhật
      ghichu: (order.ghichu || '') + ' | Tự động hoàn tất trước chốt kho',
      updatedAt: new Date()
    }
  });

  // Batch update all sanpham for this order
  for (const update of sanphamUpdates) {
    await prisma.donhangsanpham.update({
      where: { id: update.id },
      data: {
        slnhan: update.slnhan,
        ttnhan: update.ttnhan,            // ✅ Update
        ttsauvat: update.ttsauvat,        // ✅ Update
        ghichu: update.ghichu
      }
    });
  }
  
  // ... TonKho updates ...
}
```

---

## 🧪 Testing

### Test Case 1: Chuyển sang `danhan` với slnhan < slgiao
```typescript
// Given: Đơn hàng dagiao
const order = {
  sanpham: [{
    idSP: 'sp1',
    giaban: 100,
    vat: 0.1,
    slgiao: 10,
    slnhan: 0
  }]
};

// When: Update slnhan = 8 (thiếu 2)
await donhangService.update(orderId, {
  status: 'danhan',
  sanpham: [{
    id: 'sp1',
    slnhan: 8
  }]
});

// Then: Kiểm tra kết quả
const updated = await prisma.donhangsanpham.findFirst({ where: { idSP: 'sp1' }});
expect(updated.slnhan).toBe(8);
expect(updated.ttnhan).toBe(800);          // ✅ 100 * 8 = 800
expect(updated.ttsauvat).toBe(880);        // ✅ 800 * 1.1 = 880

const donhang = await prisma.donhang.findUnique({ where: { id: orderId }});
expect(donhang.tongtien).toBe(880);        // ✅ tongchua + tongvat
expect(donhang.tongvat).toBe(80);          // ✅ 800 * 0.1
```

### Test Case 2: completeDonhang với slnhan khác nhau
```typescript
await donhangService.completeDonhang(orderId, {
  status: 'danhan',
  slnhan: 7,
  ghichu: 'Khách nhận 7'
});

// Expect: ttnhan = 700, ttsauvat = 770, tongtien = 770
```

### Test Case 3: Auto-complete hàng loạt
```typescript
await donhangService.completePendingDeliveriesForProduct('sp1');

// Expect: Tất cả đơn hàng chứa sp1 có tongtien được tính lại đúng
```

---

## 📊 Impact Analysis

### Before Fix:
| Field | Được tính đúng? |
|-------|----------------|
| slnhan | ✅ Có |
| ttnhan | ❌ Không |
| ttsauvat | ❌ Không |
| tongtien | ❌ Không |
| tongvat | ❌ Không |

### After Fix:
| Field | Được tính đúng? |
|-------|----------------|
| slnhan | ✅ Có |
| ttnhan | ✅ Có |
| ttsauvat | ✅ Có |
| tongtien | ✅ Có |
| tongvat | ✅ Có |

---

## 🔒 Prevention

### Code Review Checklist:
- [ ] Khi update `sldat` → phải tính lại `ttdat`
- [ ] Khi update `slgiao` → phải tính lại `ttgiao`
- [ ] Khi update `slnhan` → phải tính lại `ttnhan`, `ttsauvat`
- [ ] Khi update bất kỳ `tt*` → phải tính lại `tongtien`, `tongvat` của đơn hàng
- [ ] Khi update `giaban` → phải tính lại tất cả `tt*` fields

### Đề xuất refactor:
Tạo helper function:
```typescript
private calculateProductTotals(giaban: number, slnhan: number, vat: number) {
  const ttnhan = giaban * slnhan;
  const ttsauvat = ttnhan * (1 + vat);
  return {
    ttnhan: parseFloat(ttnhan.toFixed(3)),
    ttsauvat: parseFloat(ttsauvat.toFixed(3))
  };
}

private calculateOrderTotals(sanpham: any[], vatRate: number) {
  const tongchua = sanpham.reduce((sum, sp) => sum + sp.ttnhan, 0);
  const tongvat = tongchua * vatRate;
  const tongtien = tongchua + tongvat;
  return {
    tongtien: parseFloat(tongtien.toFixed(3)),
    tongvat: parseFloat(tongvat.toFixed(3))
  };
}
```

---

## 📝 Related Issues

- **Schema:** `Donhangsanpham.ttnhan`, `Donhangsanpham.ttsauvat`, `Donhang.tongtien`, `Donhang.tongvat`
- **Related functions:**
  - `dongbogia()` - Có logic tính toán đúng (reference implementation)
  - `update()` - ✅ FIXED
  - `completeDonhang()` - ✅ FIXED
  - `completePendingDeliveriesForProduct()` - ✅ FIXED

---

**Author:** AI Assistant  
**Reviewed by:** [Pending]  
**Version:** 1.0.0  
**Last Updated:** 2025-01-XX
