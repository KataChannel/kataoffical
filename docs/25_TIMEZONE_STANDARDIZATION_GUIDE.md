# Hệ Thống Timezone Chuẩn Hóa - Hướng Dẫn Sử Dụng

## Tổng Quan
Hệ thống đã được cập nhật để lưu trữ tất cả dữ liệu ngày tháng dưới dạng UTC trong database, đảm bảo tính nhất quán cho clients ở bất kỳ múi giờ nào.

## Kiến Trúc

### Backend (API)
- **TimezoneUtilService**: Service xử lý chuyển đổi timezone
- **Enhanced GraphQL Service**: Tự động chuẩn hóa date fields khi CRUD
- **Date Response Interceptor**: Format dates trong response

### Frontend (Angular)
- **TimezoneService**: Service xử lý timezone cho UI
- **Component Methods**: Helper methods cho format và parse dates

## Cách Hoạt Động

### 1. Lưu Trữ Dữ Liệu (Client → Server → Database)
```
Client (Local Time) → TimezoneService.formDateToUTC() → Server (UTC) → Database (UTC)
```

### 2. Hiển Thị Dữ Liệu (Database → Server → Client)
```
Database (UTC) → Server (UTC) → TimezoneService.formatForDisplay() → Client (Local Time)
```

## Sử Dụng Trong Frontend

### 1. Import TimezoneService
```typescript
import { TimezoneService } from '../../../shared/services/timezone.service';

constructor(private _timezoneService = inject(TimezoneService)) {}
```

### 2. Chuyển Đổi Date Input Từ Form
```typescript
// Khi user nhập date vào form
const userDate = '2025-08-10'; // YYYY-MM-DD từ date input
const utcDate = this._timezoneService.formDateToUTC(userDate);

// Gửi utcDate lên server
await this.api.create({ ngaynhan: utcDate });
```

### 3. Hiển Thị Date Từ Server
```typescript
// Trong component
formatDateForDisplay(utcDate: any, format: string = 'DD/MM/YYYY'): string {
  return this._timezoneService.formatForDisplay(utcDate, format);
}
```

```html
<!-- Trong template -->
<span>{{ formatDateForDisplay(item.ngaynhan, 'DD/MM/YYYY') }}</span>
```

### 4. Export Excel
```typescript
async ExportExcel(data: any[], title: string) {
  const dulieu = data.map((item: any) => ({
    ngaynhan: this._timezoneService.nowLocal('YYYY-MM-DD'), // Ngày hiện tại local
    // ... other fields
  }));
}
```

## Sử Dụng Trong Backend

### 1. Tự Động Chuẩn Hóa (GraphQL)
```typescript
// GraphQL tự động xử lý khi create/update
mutation {
  createOne(
    modelName: "donhang"
    data: {
      ngaynhan: "2025-08-10"  # Sẽ tự động convert sang UTC
    }
  )
}
```

### 2. Date Filters
```typescript
// Query với date range
query {
  findMany(
    modelName: "donhang"
    where: {
      ngaynhan: {
        gte: "2025-08-01"     # Tự động convert sang UTC
        lte: "2025-08-31"     # Tự động convert sang UTC
      }
    }
  )
}
```

### 3. Sử Dụng TimezoneUtilService Trực Tiếp
```typescript
import { TimezoneUtilService } from '../shared/services/timezone-util.service';

@Injectable()
export class MyService {
  constructor(private timezoneUtil: TimezoneUtilService) {}

  async createRecord(data: any) {
    // Chuẩn hóa date fields
    const normalizedData = this.timezoneUtil.normalizeDateFields(data, ['ngaynhan', 'ngaygiao']);
    
    // Lưu vào database
    return await this.prisma.model.create({ data: normalizedData });
  }
}
```

## Cấu Hình Date Fields

### Backend - Date Fields Mapping
```typescript
// Trong enhanced-universal.service.ts
const dateFieldsMap: Record<string, string[]> = {
  donhang: ['ngaynhan', 'ngaygiao', 'createdAt', 'updatedAt'],
  dathang: ['ngaynhan', 'ngaygiao', 'createdAt', 'updatedAt'], 
  tonkho: ['ngaynhan', 'createdAt', 'updatedAt'],
  phieugiaohang: ['ngaynhan', 'ngaygiao', 'createdAt', 'updatedAt'],
  // Thêm model mới tại đây
};
```

## Lợi Ích

### 1. Tính Nhất Quán
- Tất cả dates được lưu UTC trong database
- Không phụ thuộc vào timezone của server
- Clients ở múi giờ khác nhau đều thấy dữ liệu chính xác

### 2. Tự Động Hóa
- GraphQL tự động convert dates khi CRUD
- Component helper methods sẵn sàng sử dụng
- Không cần xử lý thủ công cho mỗi date field

### 3. Linh Hoạt
- Dễ dàng thêm date fields mới
- Support nhiều format hiển thị
- Xử lý được date ranges, comparisons

## Ví Dụ Thực Tế

### Scenario: User ở Singapore (UTC+8) tạo đơn hàng
```typescript
// Frontend (Singapore - UTC+8)
const ngayNhan = '2025-08-10'; // User chọn ngày 10/08/2025
const utcDate = this._timezoneService.formDateToUTC(ngayNhan);
// Result: '2025-08-09T16:00:00.000Z' (UTC)

// Backend lưu vào database
await this.donhangService.create({
  ngaynhan: utcDate // Lưu UTC vào database
});

// Khi user ở Vietnam (UTC+7) xem:
const displayDate = this._timezoneService.formatForDisplay(utcDate, 'DD/MM/YYYY');
// Result: '10/08/2025' (Hiển thị đúng ngày user Singapore đã chọn)
```

## Migration Dữ Liệu Cũ

Nếu có dữ liệu cũ với timezone không chuẩn:

```sql
-- Ví dụ: Convert existing data sang UTC (nếu cần)
UPDATE donhang 
SET ngaynhan = ngaynhan AT TIME ZONE 'Asia/Ho_Chi_Minh' AT TIME ZONE 'UTC'
WHERE ngaynhan IS NOT NULL;
```

## Best Practices

### 1. Always Use Service Methods
```typescript
// ✅ Đúng
const displayDate = this._timezoneService.formatForDisplay(utcDate);

// ❌ Sai
const displayDate = new Date(utcDate).toLocaleDateString();
```

### 2. Consistent Date Formats
```typescript
// ✅ Đúng - sử dụng ISO format
const utcDate = this._timezoneService.formDateToUTC('2025-08-10');

// ❌ Sai - format không chuẩn
const badDate = this._timezoneService.formDateToUTC('10/08/2025');
```

### 3. Handle Edge Cases
```typescript
// ✅ Đúng - check null/undefined
formatDateForDisplay(utcDate: any): string {
  if (!utcDate) return '';
  return this._timezoneService.formatForDisplay(utcDate);
}
```

## Troubleshooting

### 1. Date Hiển Thị Sai
- Kiểm tra dữ liệu trong database có đúng UTC không
- Confirm TimezoneService được inject đúng cách
- Verify date format input

### 2. Performance Issues
- GraphQL tự động optimize với DataLoader
- Date conversion được cache khi có thể
- Sử dụng proper indexing cho date fields

### 3. Timezone Confusion
- Luôn nhớ: Database = UTC, Display = Local
- Server không giả định timezone của client
- Client tự xử lý conversion với TimezoneService

---

Hệ thống này đảm bảo tính nhất quán về timezone trên toàn bộ ứng dụng, phù hợp cho môi trường multi-timezone và có thể scale được.
