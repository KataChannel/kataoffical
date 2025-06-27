# Shared

Thư viện `shared` cung cấp các thành phần, pipe, directive và service dùng chung cho các dự án Angular.

## Cài đặt

Thêm thư viện vào dự án Angular của bạn:

```bash
npm install path/to/dist/shared
```

Hoặc nếu đã publish lên npm:

```bash
npm install @your-org/shared
```

## Sử dụng thư viện

### 1. Import SharedModule

Trong module bạn muốn sử dụng các thành phần chung, import `SharedModule`:

```typescript
import { SharedModule } from '@your-org/shared';

@NgModule({
   imports: [
      SharedModule
   ]
})
export class FeatureModule { }
```

### 2. Sử dụng Component, Pipe, Directive

Ví dụ: Thư viện có các component như `ButtonComponent`, `TableComponent`, một pipe `CapitalizePipe` và một directive `HighlightDirective`.

**Sử dụng trong template:**

```html
<!-- Dùng component button -->
<lib-button label="Click me"></lib-button>

<!-- Dùng component table -->
<lib-table [columns]="columns" [data]="data"></lib-table>

<!-- Dùng pipe -->
<p>{{ 'hello world' | capitalize }}</p>

<!-- Dùng directive -->
<p appHighlight>Đoạn văn bản được highlight</p>
```

#### Hướng dẫn sử dụng TableComponent

**1. Chuẩn bị dữ liệu và cấu hình cột trong component:**

```typescript
// app.component.ts
columns = [
  { field: 'name', header: 'Tên' },
  { field: 'age', header: 'Tuổi' },
  { field: 'email', header: 'Email' }
];

data = [
  { name: 'Nguyễn Văn A', age: 28, email: 'a@example.com' },
  { name: 'Trần Thị B', age: 32, email: 'b@example.com' }
];
```

**2. Sử dụng trong template:**

```html
<lib-table [columns]="columns" [data]="data"></lib-table>
```

**3. Kết quả:**  
Bảng sẽ hiển thị danh sách với các cột "Tên", "Tuổi", "Email" và dữ liệu tương ứng.

### 3. Sử dụng Service

Inject service vào constructor:

```typescript
import { SharedService } from '@your-org/shared';

constructor(private sharedService: SharedService) {}

ngOnInit() {
   this.sharedService.doSomething();
}
```

## Demo chi tiết

Giả sử bạn muốn sử dụng một button chung, table và pipe capitalize:

**app.module.ts**

```typescript
import { SharedModule } from '@your-org/shared';

@NgModule({
   imports: [SharedModule],
   bootstrap: [AppComponent]
})
export class AppModule {}
```

**app.component.ts**

```typescript
columns = [
  { field: 'name', header: 'Tên' },
  { field: 'age', header: 'Tuổi' }
];

data = [
  { name: 'Nguyễn Văn A', age: 28 },
  { name: 'Trần Thị B', age: 32 }
];
```

**app.component.html**

```html
<lib-button label="Đăng nhập"></lib-button>
<p>{{ 'xin chào angular' | capitalize }}</p>
<lib-table [columns]="columns" [data]="data"></lib-table>
```

Kết quả:

- Hiển thị một nút "Đăng nhập" với style chung.
- Đoạn văn bản sẽ được chuyển thành "Xin chào angular".
- Hiển thị bảng danh sách với các cột "Tên" và "Tuổi".

## Xây dựng thư viện

```bash
ng build shared
```

## Publish lên npm

```bash
cd dist/shared
npm publish
```

## Chạy unit test

```bash
ng test shared
```

## Tài liệu tham khảo

- [Angular CLI](https://angular.dev/tools/cli)
- [Hướng dẫn tạo thư viện Angular](https://angular.dev/guide/creating-libraries)

