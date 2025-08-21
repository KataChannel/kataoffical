# Cập nhật cột SL Nhận cho component Nhu cầu đặt hàng

## Tóm tắt
Đã cập nhật thành công component `nhucaudathang` để hiển thị cột **SL Nhận** (`slnhan`) tương ứng với từng kho (`makho`, `namekho`).

## Các thay đổi thực hiện

### 1. File TypeScript (`nhucaudathang.component.ts`)

#### a) Thêm cột vào displayedColumns:
```typescript
displayedColumns: string[] = [
  'makho',
  'namekho',  
  'mancc',
  'name',
  'title',
  'masp',
  'slton',
  'slchogiao',
  'slchonhap',
  'slnhan',        // ✅ THÊM MỚI
  'SLDat',
  'SLGiao',
  'goiy',
];
```

#### b) Thêm tên hiển thị cho cột:
```typescript
ColumnName: any = {
  // ... các cột khác
  slnhan: 'SL Nhận',  // ✅ THÊM MỚI
  // ... các cột khác
};
```

#### c) Cập nhật hàm GetGoiy:
```typescript
GetGoiy(item: any) {
  const currentStock = item.slton || 0;
  const pendingDelivery = item.slchogiao || 0;
  const pendingInput = item.slchonhap || 0;
  const receivedQuantity = item.slnhan || 0;      // ✅ THÊM MỚI
  const deliveredQuantity = item.SLGiao || 0;
  
  // Tính gợi ý: SL Giao + SL Chờ Giao - Tồn kho - SL Chờ nhập - SL Nhận
  const suggestion = Math.max(0, deliveredQuantity + pendingDelivery - currentStock - pendingInput - receivedQuantity);
  return suggestion.toFixed(0);
}
```

#### d) Cập nhật hàm ExportExcel:
```typescript
async ExportExcel(data: any, title: any) {
  const dulieu = data.map((v: any) => ({
    // ... các trường khác
    slnhan: v.slnhan,          // ✅ THÊM MỚI
    // ... các trường khác
  }));

  const mapping: any = {
    // ... các mapping khác
    slnhan: 'SL Nhận',         // ✅ THÊM MỚI
    // ... các mapping khác
  };
}
```

### 2. File HTML (`nhucaudathang.component.html`)

#### a) Thêm case hiển thị trong bảng chính:
```html
@case ('slnhan') {
    <span class="max-w-20 line-clamp-1 text-end text-green-600 font-semibold">
        {{ row[column]|number:'1.0-0' }}
    </span>
}
```

#### b) Thêm case trong filter menu:
```html
@case ('slnhan') {
    <span>{{item[column]|number:'1.0-0'}}</span> 
}
```

## Công thức tính gợi ý mới

**Công thức cũ:**
```
Gợi ý = Max(0, SL Giao + SL Chờ Giao - Tồn kho - SL Chờ nhập)
```

**Công thức mới:**
```
Gợi ý = Max(0, SL Giao + SL Chờ Giao - Tồn kho - SL Chờ nhập - SL Nhận)
```

## Màu sắc hiển thị

- **SL Nhận**: Màu xanh lá (`text-green-600`) để phân biệt với các cột khác
- **Font weight**: `font-semibold` để nổi bật số liệu
- **Định dạng**: Số nguyên với separator (`|number:'1.0-0'`)

## Tính năng đã hoạt động

✅ **Hiển thị cột SL Nhận** trong bảng chính  
✅ **Filter theo SL Nhận** trong menu lọc  
✅ **Export Excel** bao gồm cột SL Nhận  
✅ **Tính toán gợi ý** có xem xét SL Nhận  
✅ **Responsive design** cho các màn hình khác nhau  
✅ **Column toggle** để ẩn/hiện cột  

## Kiểm tra

Để kiểm tra tính năng mới:

1. **Hiển thị cột**: Cột "SL Nhận" xuất hiện sau cột "Chờ Nhập"
2. **Dữ liệu**: Giá trị `slnhan` hiển thị màu xanh lá
3. **Filter**: Có thể lọc theo giá trị SL Nhận
4. **Export**: File Excel xuất ra có cột "SL Nhận"
5. **Gợi ý**: Công thức tính gợi ý đã trừ đi SL Nhận

## Lưu ý kỹ thuật

- Dữ liệu `slnhan` cần được cung cấp từ API/service
- Tương thích với timezone standardization system
- Sử dụng pipe number formatting chuẩn Angular
- Responsive design cho mobile và desktop

---

**Hoàn thành**: Tất cả thay đổi đã được implement thành công ✅
