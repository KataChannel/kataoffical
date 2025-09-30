# Hướng dẫn sử dụng GraphQL Service

## 🚀 GraphQL Service - Apollo Server Integration

File service này đã được tối ưu hoàn toàn để sử dụng với Apollo Server backend đã cấu hình.

## 📋 Tính năng chính

### ✅ Caching thông minh với TTL
### ✅ Performance monitoring real-time
### ✅ Batch operations cho xử lý hàng loạt
### ✅ Error handling và retry logic
### ✅ Loading state management
### ✅ Health check monitoring
### ✅ Model-specific optimized methods

## 🔧 Cách sử dụng trong Component

### 1. Basic Import và Injection

```typescript
import { Component, OnInit, signal } from '@angular/core';
import { GraphqlService, OptimizedFindManyOptions, PaginationResult } from '../shared/services/graphql.service';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html'
})
export class ExampleComponent implements OnInit {
  
  sanphamList = signal<any[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor(private graphqlService: GraphqlService) {}

  ngOnInit() {
    this.loadSanphamData();
  }
}
```

### 2. Tải dữ liệu cơ bản - findMany

```typescript
// Tải danh sách sản phẩm
loadSanphamData() {
  this.loading.set(true);
  
  const options: OptimizedFindManyOptions = {
    take: 20,
    orderBy: { ten: 'asc' },
    select: {
      id: true,
      ten: true,
      gia: true,
      mota: true
    }
  };

  this.graphqlService.findMany('sanpham', options).subscribe({
    next: (data) => {
      this.sanphamList.set(data);
      this.loading.set(false);
    },
    error: (error) => {
      this.error.set(error.message);
      this.loading.set(false);
    }
  });
}
```

### 3. Sử dụng phương thức tối ưu sẵn có

```typescript
// Sử dụng method đã được tối ưu
loadSanphamOptimized() {
  this.graphqlService.getSanphamList({
    take: 50,
    where: {
      active: true
    }
  }).subscribe({
    next: (data) => {
      this.sanphamList.set(data);
    },
    error: (error) => {
      console.error('Error loading sanpham:', error);
    }
  });
}
```

### 4. Tải chi tiết một record - findUnique

```typescript
loadSanphamDetail(id: string) {
  this.graphqlService.getSanphamById(id).subscribe({
    next: (sanpham) => {
      if (sanpham) {
        console.log('Sanpham detail:', sanpham);
      }
    },
    error: (error) => {
      console.error('Error loading sanpham detail:', error);
    }
  });
}
```

### 5. Tạo mới dữ liệu - createOne

```typescript
createNewSanpham() {
  const newSanphamData = {
    ten: 'Sản phẩm mới',
    gia: 100000,
    mota: 'Mô tả sản phẩm',
    active: true
  };

  this.graphqlService.createOne('sanpham', newSanphamData, {
    select: {
      id: true,
      ten: true,
      gia: true
    }
  }).subscribe({
    next: (newSanpham) => {
      console.log('Created sanpham:', newSanpham);
      // Cache sẽ được tự động invalidate
      this.loadSanphamData(); // Reload list
    },
    error: (error) => {
      console.error('Error creating sanpham:', error);
    }
  });
}
```

### 6. Cập nhật dữ liệu - updateOne

```typescript
updateSanpham(id: string) {
  const updateData = {
    ten: 'Tên sản phẩm đã cập nhật',
    gia: 150000
  };

  this.graphqlService.updateOne('sanpham', { id }, updateData).subscribe({
    next: (updatedSanpham) => {
      console.log('Updated sanpham:', updatedSanpham);
      // Cache sẽ được tự động invalidate
    },
    error: (error) => {
      console.error('Error updating sanpham:', error);
    }
  });
}
```

### 7. Xóa dữ liệu - deleteOne

```typescript
deleteSanpham(id: string) {
  if (confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
    this.graphqlService.deleteOne('sanpham', { id }).subscribe({
      next: (deletedSanpham) => {
        console.log('Deleted sanpham:', deletedSanpham);
        // Reload list sau khi xóa
        this.loadSanphamData();
      },
      error: (error) => {
        console.error('Error deleting sanpham:', error);
      }
    });
  }
}
```

### 8. Batch Operations - Xử lý hàng loạt

```typescript
// Tạo nhiều sản phẩm cùng lúc
createMultipleSanpham() {
  const sanphamData = [
    { ten: 'Sản phẩm 1', gia: 100000 },
    { ten: 'Sản phẩm 2', gia: 200000 },
    { ten: 'Sản phẩm 3', gia: 300000 }
  ];

  this.graphqlService.batchCreate('sanpham', sanphamData).subscribe({
    next: (createdSanphams) => {
      console.log('Created multiple sanphams:', createdSanphams);
    },
    error: (error) => {
      console.error('Error batch creating:', error);
    }
  });
}

// Cập nhật nhiều records cùng lúc
batchUpdateSanpham() {
  const operations = [
    { where: { id: '1' }, data: { gia: 110000 } },
    { where: { id: '2' }, data: { gia: 220000 } },
    { where: { id: '3' }, data: { gia: 330000 } }
  ];

  this.graphqlService.batchUpdate('sanpham', operations).subscribe({
    next: (updatedSanphams) => {
      console.log('Updated multiple sanphams:', updatedSanphams);
    },
    error: (error) => {
      console.error('Error batch updating:', error);
    }
  });
}
```

### 9. Pagination với helper method

```typescript
loadSanphamWithPagination(page: number = 1) {
  this.graphqlService.findManyWithPagination('sanpham', {
    pageSize: 20,
    page: page,
    where: {
      active: true
    },
    orderBy: { createdAt: 'desc' }
  }).subscribe({
    next: (result: PaginationResult<any>) => {
      console.log('Pagination result:', result);
      console.log('Data:', result.data);
      console.log('Total count:', result.totalCount);
      console.log('Has next page:', result.hasNextPage);
      console.log('Current page:', result.currentPage);
    },
    error: (error) => {
      console.error('Error loading paginated data:', error);
    }
  });
}
```

### 10. Monitoring và Performance

```typescript
// Kiểm tra performance metrics
checkPerformance() {
  const metrics = this.graphqlService.getPerformanceMetrics();
  const cacheHitRate = this.graphqlService.getCacheHitRate();
  const errors = this.graphqlService.getErrors();
  const isHealthy = this.graphqlService.getHealthStatus();
  
  console.log('Performance metrics:', metrics);
  console.log('Cache hit rate:', cacheHitRate + '%');
  console.log('Recent errors:', errors);
  console.log('System healthy:', isHealthy);
}

// Kiểm tra loading state
checkLoadingState() {
  this.graphqlService.isLoading('findMany', 'sanpham').subscribe(loading => {
    console.log('Sanpham findMany loading:', loading);
  });
}

// Xóa cache khi cần
clearCacheIfNeeded() {
  // Xóa toàn bộ cache
  this.graphqlService.clearCache();
  
  // Hoặc xóa cache theo pattern
  this.graphqlService.clearCache('sanpham');
}
```

### 11. Làm việc với quan hệ (Relations)

```typescript
// Load đơn hàng với thông tin khách hàng và sản phẩm
loadDonhangWithRelations() {
  this.graphqlService.findMany('donhang', {
    take: 10,
    include: {
      khachhang: {
        select: {
          id: true,
          ten: true,
          email: true
        }
      },
      donhangsanpham: {
        include: {
          sanpham: {
            select: {
              id: true,
              ten: true,
              gia: true
            }
          }
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  }).subscribe({
    next: (donhangs) => {
      console.log('Donhangs with relations:', donhangs);
    },
    error: (error) => {
      console.error('Error loading donhangs:', error);
    }
  });
}
```

### 12. Tìm kiếm và Filter

```typescript
searchSanpham(searchTerm: string) {
  this.graphqlService.findMany('sanpham', {
    where: {
      OR: [
        { ten: { contains: searchTerm, mode: 'insensitive' } },
        { mota: { contains: searchTerm, mode: 'insensitive' } }
      ]
    },
    orderBy: { ten: 'asc' }
  }).subscribe({
    next: (results) => {
      console.log('Search results:', results);
    },
    error: (error) => {
      console.error('Search error:', error);
    }
  });
}

// Filter theo điều kiện phức tạp
filterSanphamAdvanced() {
  this.graphqlService.findMany('sanpham', {
    where: {
      AND: [
        { active: true },
        { gia: { gte: 100000 } }, // Giá >= 100,000
        { gia: { lte: 1000000 } }, // Giá <= 1,000,000
        {
          OR: [
            { ten: { contains: 'laptop' } },
            { ten: { contains: 'máy tính' } }
          ]
        }
      ]
    },
    orderBy: [
      { gia: 'desc' },
      { ten: 'asc' }
    ]
  }).subscribe({
    next: (results) => {
      console.log('Filtered results:', results);
    }
  });
}
```

## 🎯 Best Practices

### 1. Sử dụng select để tối ưu performance
```typescript
// Chỉ lấy những field cần thiết
this.graphqlService.findMany('sanpham', {
  select: {
    id: true,
    ten: true,
    gia: true
    // Không lấy mota nếu không cần
  }
});
```

### 2. Sử dụng pagination cho danh sách lớn
```typescript
// Luôn sử dụng take để giới hạn số lượng
this.graphqlService.findMany('sanpham', {
  take: 50, // Tối đa 50 records
  skip: 0   // Bắt đầu từ record 0
});
```

### 3. Cache management
```typescript
// Cache sẽ tự động được invalidate khi có mutation
// Nhưng bạn có thể clear cache thủ công nếu cần
this.graphqlService.clearCache('sanpham'); // Clear cache cho model cụ thể
```

### 4. Error handling
```typescript
this.graphqlService.findMany('sanpham').subscribe({
  next: (data) => {
    // Handle success
  },
  error: (error) => {
    // Handle error properly
    console.error('GraphQL Error:', error);
    
    // Check if it's a network error
    if (error.networkError) {
      console.error('Network error:', error.networkError);
    }
    
    // Check GraphQL errors
    if (error.graphQLErrors) {
      error.graphQLErrors.forEach((err: any) => {
        console.error('GraphQL error:', err.message);
      });
    }
  }
});
```

## 📊 Monitoring và Debug

### Kiểm tra hiệu suất
```typescript
// Trong component hoặc service khác
ngOnInit() {
  // Theo dõi metrics
  setInterval(() => {
    const metrics = this.graphqlService.getPerformanceMetrics();
    const cacheHitRate = this.graphqlService.getCacheHitRate();
    
    console.log('Cache hit rate:', cacheHitRate + '%');
    console.log('Average query time:', 
      metrics.reduce((acc, m) => acc + m.queryTime, 0) / metrics.length
    );
  }, 30000); // Check every 30 seconds
}
```

## 🔧 Configuration Options

Service đã được cấu hình với các giá trị tối ưu:

- **Cache TTL**: 5 phút (có thể tùy chỉnh)
- **Max Cache Size**: 1000 entries
- **Request Timeout**: 30 giây
- **Max Retries**: 3 lần
- **Cleanup Interval**: 1 phút

Bạn có thể điều chỉnh các giá trị này trong constructor của service nếu cần.
