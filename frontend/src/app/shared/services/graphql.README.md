# GraphQL Service - Hướng dẫn sử dụng

GraphQL Service cung cấp một interface thống nhất để tương tác với GraphQL API server, hỗ trợ tất cả các model trong hệ thống.

## Tính năng chính

### 🚀 Universal CRUD Operations
- Hỗ trợ tất cả các model trong Prisma schema
- Type-safe với TypeScript
- Automatic JWT authentication
- Error handling và logging
- Reactive state management với Angular Signals

### 📊 Advanced Features
- Pagination và filtering
- Full-text search
- Bulk operations
- Custom queries
- Dashboard analytics
- Inventory management
- Batch operations

## Cài đặt và sử dụng

### 1. Import service trong component/service

```typescript
import { Component, inject } from '@angular/core';
import { GraphqlService } from './shared/services/graphql.service';

@Component({...})
export class MyComponent {
  private graphqlService = inject(GraphqlService);
}
```

### 2. Basic CRUD Operations

#### Lấy danh sách với pagination
```typescript
async loadProducts() {
  const result = await this.graphqlService.getSanphams({
    take: 10,           // Số lượng records
    skip: 0,            // Bỏ qua số records
    orderBy: { createdAt: 'desc' },
    where: { isActive: true },
    include: {
      banggia: true,
      nhacungcap: true
    }
  });

  if (result.data) {
    console.log('Products:', result.data.data);
    console.log('Total:', result.data.total);
  }
}
```

#### Lấy một record cụ thể
```typescript
async loadProduct(id: string) {
  const result = await this.graphqlService.getSanphamById(id, {
    banggia: true,
    nhacungcap: true,
    tonkhos: {
      include: {
        kho: true
      }
    }
  });

  if (result.data) {
    console.log('Product:', result.data);
  }
}
```

#### Tạo mới record
```typescript
async createProduct() {
  const newProduct = {
    title: 'Sản phẩm mới',
    masp: 'SP001',
    giaban: 50000,
    giagoc: 45000,
    dvt: 'cái',
    isActive: true
  };

  const result = await this.graphqlService.createSanpham(newProduct);
  
  if (result.data) {
    console.log('Created:', result.data);
  }
}
```

#### Cập nhật record
```typescript
async updateProduct(id: string) {
  const updates = {
    title: 'Tên sản phẩm mới',
    giaban: 60000
  };

  const result = await this.graphqlService.updateSanpham(id, updates);
  
  if (result.data) {
    console.log('Updated:', result.data);
  }
}
```

#### Xóa record
```typescript
async deleteProduct(id: string) {
  const result = await this.graphqlService.deleteSanpham(id);
  
  if (result.data) {
    console.log('Deleted successfully');
  }
}
```

### 3. Advanced Operations

#### Search với multiple fields
```typescript
async searchProducts(searchTerm: string) {
  const result = await this.graphqlService.search(
    'Sanpham',
    searchTerm,
    ['title', 'masp', 'description'],
    {
      take: 20,
      orderBy: { title: 'asc' }
    }
  );

  if (result.data) {
    console.log('Search results:', result.data.data);
  }
}
```

#### Bulk operations
```typescript
async bulkDeleteProducts(ids: string[]) {
  const result = await this.graphqlService.bulkDelete('Sanpham', ids);
  
  if (result.data) {
    console.log(`Deleted ${result.data} products`);
  }
}
```

#### Count records
```typescript
async countActiveProducts() {
  const result = await this.graphqlService.count('Sanpham', {
    isActive: true
  });

  console.log(`Active products: ${result.data}`);
}
```

### 4. Dashboard và Analytics

#### Dashboard statistics
```typescript
async loadDashboardStats() {
  const result = await this.graphqlService.getDashboardStats({
    dateRange: {
      from: new Date('2025-01-01'),
      to: new Date()
    }
  });

  if (result.data) {
    console.log('Dashboard stats:', result.data);
  }
}
```

#### Inventory summary
```typescript
async loadInventory(khoId?: string) {
  const result = await this.graphqlService.getInventorySummary(khoId);

  if (result.data) {
    console.log('Inventory:', result.data);
  }
}
```

### 5. Custom Queries

```typescript
async customQuery() {
  const query = `
    query CustomOrderAnalysis($startDate: String!) {
      orders: findMany(
        modelName: "Donhang"
        where: {
          createdAt: { gte: $startDate }
        }
        include: {
          khachhang: true
          donhangsanphams: {
            include: { sanpham: true }
          }
        }
      )
    }
  `;

  const result = await this.graphqlService.executeCustomQuery(query, {
    startDate: '2025-01-01'
  });

  if (result.data) {
    console.log('Custom query result:', result.data);
  }
}
```

### 6. Reactive State Management

```typescript
export class MyComponent {
  private graphqlService = inject(GraphqlService);
  
  // Reactive signals
  isLoading = this.graphqlService.isLoading;
  error = this.graphqlService.error;
  
  // Template sử dụng signals
  template: `
    <div *ngIf="isLoading()">Đang tải...</div>
    <div *ngIf="error()" class="error">Lỗi: {{ error() }}</div>
  `
}
```

### 7. Error Handling

```typescript
async loadDataWithErrorHandling() {
  try {
    const result = await this.graphqlService.getSanphams();
    
    if (result.errors) {
      // GraphQL errors
      console.error('GraphQL errors:', result.errors);
      return;
    }
    
    if (result.data) {
      // Success
      console.log('Data:', result.data);
    }
  } catch (error) {
    // Network hoặc other errors
    console.error('Request error:', error);
  }
}
```

## Model-specific Methods

### User Methods
```typescript
// Users
this.graphqlService.getUsers(options)
this.graphqlService.getUserById(id, include)
this.graphqlService.createUser(data)
this.graphqlService.updateUser(id, data)
this.graphqlService.deleteUser(id)
```

### Product Methods
```typescript
// Sanpham
this.graphqlService.getSanphams(options)
this.graphqlService.getSanphamById(id, include)
this.graphqlService.createSanpham(data)
this.graphqlService.updateSanpham(id, data)
this.graphqlService.deleteSanpham(id)
```

### Customer Methods
```typescript
// Khachhang
this.graphqlService.getKhachhangs(options)
this.graphqlService.getKhachhangById(id, include)
this.graphqlService.createKhachhang(data)
this.graphqlService.updateKhachhang(id, data)
this.graphqlService.deleteKhachhang(id)
```

### Order Methods
```typescript
// Donhang
this.graphqlService.getDonhangs(options)
this.graphqlService.getDonhangById(id, include)
this.graphqlService.createDonhang(data)
this.graphqlService.updateDonhang(id, data)
this.graphqlService.deleteDonhang(id)
```

### Warehouse Methods
```typescript
// Kho
this.graphqlService.getKhos(options)
this.graphqlService.getKhoById(id, include)
this.graphqlService.createKho(data)
this.graphqlService.updateKho(id, data)
this.graphqlService.deleteKho(id)

// PhieuKho
this.graphqlService.getPhieuKhos(options)
this.graphqlService.getPhieuKhoById(id, include)
this.graphqlService.createPhieuKho(data)
this.graphqlService.updatePhieuKho(id, data)
this.graphqlService.deletePhieuKho(id)
```

### Supplier Methods
```typescript
// Nhacungcap
this.graphqlService.getNhacungcaps(options)
this.graphqlService.getNhacungcapById(id, include)
this.graphqlService.createNhacungcap(data)
this.graphqlService.updateNhacungcap(id, data)
this.graphqlService.deleteNhacungcap(id)
```

## Generic Methods

Ngoài các method specific cho từng model, service cũng cung cấp các generic methods:

```typescript
// Generic CRUD
this.graphqlService.findMany('ModelName', options)
this.graphqlService.findUnique('ModelName', where, include)
this.graphqlService.create('ModelName', data)
this.graphqlService.update('ModelName', where, data)
this.graphqlService.delete('ModelName', where)

// Generic utilities
this.graphqlService.count('ModelName', where)
this.graphqlService.search('ModelName', searchTerm, fields, options)
this.graphqlService.bulkDelete('ModelName', ids)
this.graphqlService.batchCreate('ModelName', dataArray)
this.graphqlService.batchUpdate('ModelName', updates)
```

## Filter và Sort Options

### Where Clause Examples
```typescript
const whereOptions = {
  // Basic filters
  isActive: true,
  giaban: { gte: 10000, lte: 100000 },
  
  // Text search
  title: { contains: 'search term', mode: 'insensitive' },
  
  // Date range
  createdAt: {
    gte: new Date('2025-01-01'),
    lte: new Date('2025-12-31')
  },
  
  // Relations
  nhacungcap: {
    tenNhacungcap: { contains: 'supplier name' }
  },
  
  // OR conditions
  OR: [
    { title: { contains: 'keyword' } },
    { masp: { contains: 'keyword' } }
  ],
  
  // AND conditions
  AND: [
    { isActive: true },
    { giaban: { gte: 10000 } }
  ]
};
```

### OrderBy Examples
```typescript
const orderByOptions = {
  // Single field
  createdAt: 'desc',
  title: 'asc',
  
  // Multiple fields
  [
    { createdAt: 'desc' },
    { title: 'asc' }
  ],
  
  // Relation fields
  nhacungcap: {
    tenNhacungcap: 'asc'
  }
};
```

### Include Examples
```typescript
const includeOptions = {
  // Basic relations
  nhacungcap: true,
  banggia: true,
  
  // Nested relations
  donhangs: {
    include: {
      khachhang: true,
      donhangsanphams: {
        include: {
          sanpham: true
        }
      }
    }
  },
  
  // Conditional includes
  tonkhos: {
    where: { soluong: { gt: 0 } },
    include: { kho: true }
  }
};
```

## Best Practices

### 1. Error Handling
```typescript
async loadData() {
  try {
    const result = await this.graphqlService.getSanphams();
    
    if (result.errors) {
      // Handle GraphQL errors
      this.handleGraphQLErrors(result.errors);
      return;
    }
    
    if (result.data) {
      this.processData(result.data);
    }
  } catch (error) {
    // Handle network/other errors
    this.handleNetworkError(error);
  }
}
```

### 2. Loading States
```typescript
async loadWithLoading() {
  if (this.graphqlService.isLoadingState()) {
    return; // Prevent multiple concurrent requests
  }
  
  await this.graphqlService.getSanphams();
  // Loading state automatically managed by service
}
```

### 3. Pagination Pattern
```typescript
class PaginatedComponent {
  currentPage = signal(1);
  pageSize = signal(10);
  totalPages = signal(0);
  
  async loadPage(page: number) {
    const skip = (page - 1) * this.pageSize();
    
    const result = await this.graphqlService.getSanphams({
      skip,
      take: this.pageSize(),
      orderBy: { createdAt: 'desc' }
    });
    
    if (result.data) {
      this.currentPage.set(page);
      this.totalPages.set(Math.ceil(result.data.total / this.pageSize()));
      // Update data...
    }
  }
}
```

### 4. Search with Debouncing
```typescript
searchControl = new FormControl('');

ngOnInit() {
  this.searchControl.valueChanges.pipe(
    debounceTime(300),
    distinctUntilChanged()
  ).subscribe(searchTerm => {
    this.performSearch(searchTerm);
  });
}

async performSearch(searchTerm: string) {
  if (!searchTerm) {
    await this.loadAllData();
    return;
  }
  
  const result = await this.graphqlService.search(
    'Sanpham',
    searchTerm,
    ['title', 'masp', 'description']
  );
  
  if (result.data) {
    this.updateResults(result.data.data);
  }
}
```

## Migration từ REST API

Nếu bạn đang migrate từ REST API sang GraphQL, đây là các pattern tương đương:

### REST → GraphQL
```typescript
// REST
const response = await fetch(`${APIURL}/sanpham?page=1&limit=10`);
const data = await response.json();

// GraphQL
const result = await this.graphqlService.getSanphams({
  skip: 0,
  take: 10
});
```

### POST → Create
```typescript
// REST
await fetch(`${APIURL}/sanpham`, {
  method: 'POST',
  body: JSON.stringify(data)
});

// GraphQL
await this.graphqlService.createSanpham(data);
```

### PUT → Update
```typescript
// REST
await fetch(`${APIURL}/sanpham/${id}`, {
  method: 'PUT',
  body: JSON.stringify(updates)
});

// GraphQL
await this.graphqlService.updateSanpham(id, updates);
```

### DELETE → Delete
```typescript
// REST
await fetch(`${APIURL}/sanpham/${id}`, {
  method: 'DELETE'
});

// GraphQL
await this.graphqlService.deleteSanpham(id);
```

## Performance Tips

1. **Sử dụng select để giới hạn fields**: Chỉ lấy các field cần thiết
2. **Optimize includes**: Chỉ include các relations thực sự cần
3. **Implement pagination**: Luôn sử dụng take/skip cho large datasets  
4. **Cache results**: Implement caching strategy cho data ít thay đổi
5. **Batch operations**: Sử dụng bulk operations cho multiple records

## Troubleshooting

### Common Issues

1. **401 Unauthorized**: Kiểm tra JWT token trong localStorage
2. **GraphQL errors**: Check query syntax và field names
3. **Network errors**: Verify API endpoint và server status
4. **Type errors**: Ensure model names match Prisma schema

### Debug Mode
```typescript
// Enable detailed logging
await this.graphqlService.executeCustomQuery(`
  query Debug {
    __schema {
      types {
        name
        fields {
          name
          type {
            name
          }
        }
      }
    }
  }
`);
```

## Kết luận

GraphQL Service cung cấp một interface mạnh mẽ và linh hoạt để tương tác với dữ liệu. Với các method type-safe và reactive state management, việc development trở nên hiệu quả và dễ maintain hơn.

Tham khảo file `graphql.examples.ts` để xem thêm các ví dụ chi tiết về cách sử dụng service này.
