# Update: So Sánh Giá - Format Mới

## Thay Đổi

Đã cập nhật tính năng so sánh giá với format mới: **Mỗi row = 1 sản phẩm từ 1 nhà cung cấp, với các cột là ngày**.

## Format Dữ Liệu Mới

### Cấu Trúc Bảng

```
| Mã SP    | Tên SP    | Tên NCC        | 1/1/2025 | 2/1/2025 | 3/1/2025 | ... |
|----------|-----------|----------------|----------|----------|----------|-----|
| I100001  | Bạc hà    | A Bằng CN      | 10.000   | 8.000    | 9.000    | ... |
| I100001  | Bạc hà    | MƠ - THÚY N2   | 11.000   | 8.000    | 10.000   | ... |
| I100001  | Bạc hà    | VŨ MUA         | 12.000   | 8.000    | 11.000   | ... |
| I100002  | Bắp cải   | BÌNH L2-18     | 13.000   | 8.000    | 12.000   | ... |
```

### Cột Cố Định (Sticky)
1. **Mã SP** (120px)
2. **Tên SP** (250px)
3. **Tên NCC** (200px)

### Cột Động
- Các cột ngày được tạo tự động từ dữ liệu
- Format: `D/M/YYYY` (ví dụ: `1/1/2025`, `15/3/2025`)
- Sắp xếp theo thứ tự thời gian
- Hiển thị giá nhập cho ngày đó

## Ví Dụ Data

```typescript
const data = [
  {
    "Mã SP": "I100001",
    "Tên SP": "Bạc hà",
    "Tên NCC": "A Bằng Cần Nước",
    "1/1/2025": 10000,
    "2/1/2025": 8000,
    "3/1/2025": 9000
  },
  {
    "Mã SP": "I100001",
    "Tên SP": "Bạc hà",
    "Tên NCC": "MƠ - THÚY N2-18",
    "1/1/2025": 11000,
    "2/1/2025": 8000,
    "3/1/2025": 10000
  }
];
```

## Logic Xử Lý

### 1. Fetch Data (`fetchComparePriceData`)

```typescript
// Key = masp_tenncc để group theo sản phẩm + nhà cung cấp
const key = `${masp}_${nhacungcap}`;

// Structure
{
  'Mã SP': 'I100001',
  'Tên SP': 'Bạc hà',
  'Tên NCC': 'A Bằng CN',
  dates: {
    '1/1/2025': 10000,
    '2/1/2025': 8000
  }
}

// Flatten thành row
{
  'Mã SP': 'I100001',
  'Tên SP': 'Bạc hà',
  'Tên NCC': 'A Bằng CN',
  '1/1/2025': 10000,
  '2/1/2025': 8000
}
```

### 2. Build Columns (`buildComparePriceColumns`)

```typescript
// Extract unique dates
const dateSet = new Set<string>();
data.forEach(row => {
  Object.keys(row).forEach(key => {
    if (key !== 'Mã SP' && key !== 'Tên SP' && key !== 'Tên NCC') {
      dateSet.add(key); // Date columns
    }
  });
});

// Sort dates chronologically
comparePriceDateColumns = Array.from(dateSet).sort((a, b) => {
  return moment(a, 'D/M/YYYY').valueOf() - moment(b, 'D/M/YYYY').valueOf();
});

// Build full column list
comparePriceColumns = ['Mã SP', 'Tên SP', 'Tên NCC', ...comparePriceDateColumns];
```

### 3. Display (HTML Template)

```html
<!-- Static Columns -->
<ng-container matColumnDef="Mã SP">
  <th mat-header-cell *matHeaderCellDef class="sticky left-0">Mã SP</th>
  <td mat-cell *matCellDef="let element" class="sticky left-0">
    {{ element['Mã SP'] }}
  </td>
</ng-container>

<!-- Dynamic Date Columns -->
@for (dateCol of comparePriceDateColumns; track dateCol) {
  <ng-container [matColumnDef]="dateCol">
    <th mat-header-cell *matHeaderCellDef>{{ dateCol }}</th>
    <td mat-cell *matCellDef="let element">
      {{ element[dateCol] | number:'1.0-0' }} đ
    </td>
  </ng-container>
}
```

### 4. Export Excel

```typescript
// Header row
{ 'Mã SP': 'Mã SP', 'Tên SP': 'Tên SP', 'Tên NCC': 'Tên NCC', '1/1/2025': '1/1/2025', ... }

// Data rows
{
  'Mã SP': 'I100001',
  'Tên SP': 'Bạc hà',
  'Tên NCC': 'A Bằng CN',
  '1/1/2025': '10,000 đ',
  '2/1/2025': '8,000 đ'
}
```

## Lợi Ích Format Mới

### 1. Dễ So Sánh
- ✅ Cùng 1 sản phẩm, nhiều NCC → so sánh ngang
- ✅ Cùng 1 NCC, nhiều ngày → so sánh dọc
- ✅ Dễ tìm giá thấp nhất theo ngày

### 2. Compact
- ✅ Mỗi row = 1 combo (sản phẩm + NCC)
- ✅ Ngày nằm ngang → tiết kiệm không gian dọc
- ✅ Hiển thị nhiều data hơn trên 1 màn hình

### 3. Flexible
- ✅ Số cột ngày tự động theo dữ liệu
- ✅ Không cần biết trước có bao nhiêu ngày
- ✅ Sort ngày tự động

## UI Features

### Table Display
- **Sticky Columns**: Mã SP, Tên SP, Tên NCC luôn hiển thị khi scroll ngang
- **Sticky Header**: Header luôn hiển thị khi scroll dọc
- **Hover Effect**: Highlight row khi hover
- **Empty State**: Icon + message khi không có data

### Date Columns
- **Header**: Ngày + label "Giá nhập"
- **Cell**: Format số + " đ" (ví dụ: `10,000 đ`)
- **Empty**: Hiển thị "-" nếu không có giá
- **Alignment**: Text-right cho số tiền

### Info Bar
- **Left**: "Hiển thị 10 / 45 dòng"
- **Right**: Button "Xuất Excel (Toàn bộ 45 dòng)"

## Use Cases

### Case 1: So Sánh Giá Cùng Sản Phẩm
```
Bạc hà - A Bằng CN:    10.000  8.000  9.000
Bạc hà - MƠ THÚY:      11.000  8.000  10.000
Bạc hà - VŨ MUA:       12.000  8.000  11.000
                       ↑       ↑      ↑
                    1/1/25  2/1/25  3/1/25
```
→ Dễ thấy NCC nào rẻ nhất từng ngày

### Case 2: Theo Dõi Xu Hướng Giá
```
Bạc hà - A Bằng CN:    10.000 → 8.000 → 9.000
                         (↓2k)   (↑1k)
```
→ Thấy giá tăng/giảm theo thời gian

### Case 3: Tìm Deal Tốt Nhất
- Filter theo sản phẩm
- Nhìn ngang các NCC
- Pick giá thấp nhất

## Code Changes

### TypeScript (`listdathang.component.ts`)

**Properties**:
```typescript
comparePriceData: any[] = [];              // Array of rows
comparePriceColumns: string[] = [];        // All columns
comparePriceDateColumns: string[] = [];    // Only date columns
comparePriceTotalRecords = 0;
```

**Methods**:
1. ✅ `fetchComparePriceData()` - Fetch & transform data
2. ✅ `buildComparePriceColumns()` - Build column list
3. ✅ `getDisplayedComparePriceData()` - Get first 10 rows
4. ✅ `exportComparePriceExcel()` - Export all data

### HTML (`listdathang.component.html`)

**Template Changes**:
1. ✅ Static columns: Mã SP, Tên SP, Tên NCC
2. ✅ Dynamic columns: Loop `comparePriceDateColumns`
3. ✅ Sticky positioning: Left-0, Left-120px, Left-370px
4. ✅ Format giá: `number:'1.0-0'` + " đ"

## Performance

### Optimization
- ✅ Only render 10 rows in table
- ✅ Full data stored for export
- ✅ Lazy rendering với Mat-table virtual scroll (có thể thêm)

### Memory
- 100 rows × 30 days = 3000 cells
- Each cell ≈ 8 bytes (number)
- Total ≈ 24KB → Nhẹ!

## Future Enhancements

### 1. Highlight Min/Max
```typescript
// Highlight giá thấp nhất màu xanh, cao nhất màu đỏ
[ngClass]="{
  'bg-green-100': isMinPrice(row, date),
  'bg-red-100': isMaxPrice(row, date)
}"
```

### 2. Filter
- Filter theo mã SP
- Filter theo tên NCC
- Filter theo khoảng giá

### 3. Sort
- Sort theo mã SP
- Sort theo tên SP
- Sort theo giá (1 cột ngày cụ thể)

### 4. Chart View
- Line chart: Giá theo thời gian
- Bar chart: So sánh giá giữa NCC

### 5. Pagination
- Next/Previous buttons
- Page size selector

## Testing Checklist

- [ ] Open dialog với date range
- [ ] Verify columns: Mã SP, Tên SP, Tên NCC + dates
- [ ] Verify sticky columns work
- [ ] Verify data hiển thị đúng
- [ ] Verify format giá (10,000 đ)
- [ ] Verify empty cells show "-"
- [ ] Verify scroll ngang/dọc
- [ ] Verify "10/total" counter
- [ ] Export Excel và kiểm tra format
- [ ] Verify Excel có đầy đủ data

## Migration Notes

### Breaking Changes
- ❌ Old format: Sản phẩm × (NCC + Date) columns
- ✅ New format: (Sản phẩm + NCC) × Date columns

### Data Impact
- Không ảnh hưởng database
- Chỉ thay đổi cách hiển thị
- Dữ liệu vẫn từ `dathang` và `sanpham`

---

**Updated**: January 2025  
**Version**: 2.0.0  
**Status**: ✅ Implemented & Ready for Testing

## Summary

Format mới giúp:
- ✅ **Dễ so sánh**: Nhìn ngang = so sánh NCC, nhìn dọc = so sánh ngày
- ✅ **Compact**: Tiết kiệm không gian, hiển thị nhiều data hơn
- ✅ **Flexible**: Tự động adapt với số ngày bất kỳ
- ✅ **Intuitive**: Dễ hiểu, dễ phân tích
- ✅ **Excel-friendly**: Export format giống với display

Cấu trúc mới phù hợp hơn cho việc so sánh giá theo thời gian! 🎉
