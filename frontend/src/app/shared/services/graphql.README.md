# GraphQL Service - Hướng dẫn chi tiết và Examples

Đây là hướng dẫn toàn diện cho [`GraphqlService`](frontend/src/app/shared/services/graphql.service.ts) - service được tối ưu hóa để tương tác với GraphQL API trong ứng dụng Angular.

## 📋 Mục lục

1. [Tổng quan](#tổng-quan)
2. [Cài đặt và Import](#cài-đặt-và-import)
3. [Các tính năng chính](#các-tính-năng-chính)
4. [API Reference](#api-reference)
5. [Examples chi tiết](#examples-chi-tiết)
6. [Best Practices](#best-practices)
7. [Performance Optimization](#performance-optimization)
8. [Error Handling](#error-handling)
9. [Migration Guide](#migration-guide)
10. [Troubleshooting](#troubleshooting)

## 🎯 Tổng quan

[`GraphqlService`](frontend/src/app/shared/services/graphql.service.ts) cung cấp một interface thống nhất và tối ưu để tương tác với GraphQL API, bao gồm:

### ✨ Tính năng nổi bật
- **Reactive State Management**: Sử dụng Angular Signals để quản lý state
- **Smart Caching**: Cache thông minh với TTL và invalidation
- **Batch Processing**: Xử lý hàng loạt cho datasets lớn
- **Type Safety**: Full TypeScript support
- **Auto Authentication**: Tự động inject JWT token
- **Error Handling**: Xử lý lỗi toàn diện
- **Performance Monitoring**: Theo dõi cache hit rate và performance

### 🏗️ Kiến trúc
```
GraphqlService
├── Cache Management (Memory + Apollo)
├── Authentication (JWT Auto-inject)
├── State Management (Angular Signals)
├── Batch Processing (Large Datasets)
├── Error Handling (Comprehensive)
└── Performance Monitoring
```

## 🚀 Cài đặt và Import

### 1. Import trong Component/Service

```typescript
import { Component, inject, signal } from '@angular/core';
import { GraphqlService, OptimizedFindManyOptions } from './shared/services/graphql.service';

@Component({
  selector: 'app-my-component',
  template: `
    <div *ngIf="isLoading()">Đang tải...</div>
    <div *ngIf="error()" class="error">{{ error() }}</div>
    <div *ngFor="let item of data()">{{ item.title }}</div>
  `
})
export class MyComponent {
  private graphqlService = inject(GraphqlService);
  
  // Reactive signals
  isLoading = this.graphqlService.isLoading;
  error = this.graphqlService.error;
  data = signal<any[]>([]);
}
```

### 2. Dependency Injection (Constructor)

```typescript
constructor(
  private graphqlService: GraphqlService
) {}
```

## 🔧 Các tính năng chính

### 1. Reactive State Management
Service sử dụng Angular Signals để quản lý state reactive:

```typescript
// Signals có sẵn
this.graphqlService.isLoading()     // boolean
this.graphqlService.error()         // string | null
this.graphqlService.cacheHits()     // number
this.graphqlService.cacheMisses()   // number
this.graphqlService.cacheHitRate()  // number (%)
```

### 2. Intelligent Caching
- **Memory Cache**: Cache trong memory với TTL
- **Apollo Cache**: Cache GraphQL queries
- **Smart Invalidation**: Tự động invalidate khi có mutations

### 3. Batch Processing
Tự động xử lý datasets lớn bằng batch processing:

```typescript
async getAllProducts() {
  // Tự động sử dụng batch processing cho datasets lớn
  const result = await this.graphqlService.getAllSanphams({
    enableBatching: true,
    batchSize: 500
  });
}
```

## 📚 API Reference

### Core Methods

#### `findMany<T>(modelName, options)`
Tìm nhiều records với pagination và caching.

```typescript
interface OptimizedFindManyOptions {
  where?: any;              // Điều kiện lọc
  orderBy?: any;           // Sắp xếp
  skip?: number;           // Bỏ qua số records
  take?: number;           // Số lượng records
  include?: any;           // Include relations
  select?: any;            // Select fields
  useCache?: boolean;      // Sử dụng cache (default: true)
  cacheTimeout?: number;   // TTL cache (ms)
  cacheKey?: string;       // Custom cache key
  enableBatching?: boolean; // Enable batch processing
  batchSize?: number;      // Batch size
}
```

#### `findAll<T>(modelName, options)`
Lấy tất cả records (sử dụng batch processing cho datasets lớn).

#### `executeGraphQL<T>(query)`
Execute custom GraphQL query.

#### `executeMutation<T>(mutation)`
Execute GraphQL mutation.

### Model-specific Methods

#### Sản phẩm (Sanpham)
```typescript
// Lấy danh sách sản phẩm với pagination
await this.graphqlService.getSanphams(options)

// Lấy tất cả sản phẩm
await this.graphqlService.getAllSanphams(options)
```

#### Khách hàng (Khachhang)
```typescript
await this.graphqlService.getKhachhangs(options)
await this.graphqlService.getAllKhachhangs(options)
```

#### Đơn hàng (Donhang)
```typescript
await this.graphqlService.getDonhangs(options)
await this.graphqlService.getAllDonhangs(options)
```

#### Đặt hàng (Dathang)
```typescript
await this.graphqlService.getDathangs(options)
await this.graphqlService.getAllDathangs(options)
```

#### Nhà cung cấp (Nhacungcap)
```typescript
await this.graphqlService.getNhacungcaps(options)
await this.graphqlService.getAllNhacungcaps(options)
```

### Search Method
```typescript
await this.graphqlService.search<T>(
  modelName: string,
  searchTerm: string,
  searchFields: string[],
  options?: OptimizedFindManyOptions
)
```

### Cache Management
```typescript
// Xem thống kê cache
this.graphqlService.getCacheStats()

// Clear cache
this.graphqlService.clearCache()        // Clear all
this.graphqlService.clearCache('sanpham') // Clear pattern

// Invalidate specific model cache
this.graphqlService.invalidateModelCache('sanpham')

// Refresh cache
await this.graphqlService.refreshCache()
```

## 💡 Examples chi tiết

### 1. Basic Product Listing với Pagination

```typescript
@Component({
  selector: 'app-product-list',
  template: `
    <div class="loading" *ngIf="isLoading()">
      <mat-spinner></mat-spinner>
      Đang tải sản phẩm...
    </div>
    
    <div class="error" *ngIf="error()">
      <mat-icon>error</mat-icon>
      {{ error() }}
      <button mat-button (click)="retry()">Thử lại</button>
    </div>
    
    <div class="products" *ngIf="!isLoading() && !error()">
      <mat-card *ngFor="let product of products()" class="product-card">
        <mat-card-header>
          <mat-card-title>{{ product.title }}</mat-card-title>
          <mat-card-subtitle>{{ product.masp }}</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p>Giá: {{ product.giaban | currency:'VND' }}</p>
          <p>NCC: {{ product.nhacungcap?.tenNhacungcap }}</p>
        </mat-card-content>
      </mat-card>
      
      <!-- Pagination -->
      <mat-paginator 
        [length]="totalRecords()"
        [pageSize]="pageSize()"
        [pageSizeOptions]="[10, 25, 50, 100]"
        (page)="onPageChange($event)">
      </mat-paginator>
    </div>
    
    <!-- Cache Stats (dev mode) -->
    <div class="cache-stats" *ngIf="showCacheStats">
      Cache Hit Rate: {{ cacheHitRate() | number:'1.1-1' }}%
    </div>
  `
})
export class ProductListComponent implements OnInit {
  private graphqlService = inject(GraphqlService);
  
  // Reactive signals
  isLoading = this.graphqlService.isLoading;
  error = this.graphqlService.error;
  products = signal<any[]>([]);
  totalRecords = signal(0);
  currentPage = signal(0);
  pageSize = signal(25);
  cacheHitRate = this.graphqlService.cacheHitRate;
  
  // Filter signals
  searchTerm = signal('');
  selectedCategory = signal<string | null>(null);
  priceRange = signal<{min: number, max: number} | null>(null);
  
  showCacheStats = environment.production === false;

  async ngOnInit() {
    await this.loadProducts();
  }

  async loadProducts() {
    try {
      const skip = this.currentPage() * this.pageSize();
      
      // Build filters
      const where: any = { isActive: true };
      
      if (this.searchTerm()) {
        where.OR = [
          { title: { contains: this.searchTerm(), mode: 'insensitive' } },
          { masp: { contains: this.searchTerm(), mode: 'insensitive' } }
        ];
      }
      
      if (this.selectedCategory()) {
        where.nhomsp = this.selectedCategory();
      }
      
      if (this.priceRange()) {
        const range = this.priceRange()!;
        where.giaban = { gte: range.min, lte: range.max };
      }

      const result = await this.graphqlService.getSanphams({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: this.pageSize(),
        include: {
          nhacungcap: true,
          banggia: true,
          tonkhos: {
            where: { soluong: { gt: 0 } }
          }
        },
        useCache: true,
        cacheTimeout: 300000 // 5 minutes
      });

      if (result.data) {
        this.products.set(result.data.data);
        this.totalRecords.set(result.data.total);
      }
    } catch (error) {
      console.error('Error loading products:', error);
    }
  }

  async onPageChange(event: any) {
    this.currentPage.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    await this.loadProducts();
  }

  async onSearch(searchTerm: string) {
    this.searchTerm.set(searchTerm);
    this.currentPage.set(0);
    await this.loadProducts();
  }

  async retry() {
    this.graphqlService.clearError();
    await this.loadProducts();
  }
}
```

### 2. Advanced Search với Debouncing

```typescript
@Component({
  selector: 'app-product-search',
  template: `
    <mat-form-field class="search-field">
      <mat-label>Tìm kiếm sản phẩm</mat-label>
      <input matInput 
             [formControl]="searchControl"
             placeholder="Nhập tên hoặc mã sản phẩm...">
      <mat-icon matSuffix>search</mat-icon>
    </mat-form-field>
    
    <div class="search-results">
      <div *ngIf="searchResults().length > 0">
        <p>Tìm thấy {{ totalResults() }} kết quả</p>
        <mat-list>
          <mat-list-item *ngFor="let product of searchResults()">
            <div matListItemTitle>{{ product.title }}</div>
            <div matListItemLine>{{ product.masp }} - {{ product.giaban | currency:'VND' }}</div>
          </mat-list-item>
        </mat-list>
        
        <button mat-button 
                *ngIf="hasMore()" 
                (click)="loadMore()"
                [disabled]="isLoading()">
          Xem thêm
        </button>
      </div>
      
      <div *ngIf="searchControl.value && searchResults().length === 0 && !isLoading()">
        Không tìm thấy sản phẩm nào
      </div>
    </div>
  `
})
export class ProductSearchComponent implements OnInit, OnDestroy {
  private graphqlService = inject(GraphqlService);
  private destroy$ = new Subject<void>();
  
  searchControl = new FormControl('');
  isLoading = this.graphqlService.isLoading;
  searchResults = signal<any[]>([]);
  totalResults = signal(0);
  hasMore = signal(false);
  currentPage = signal(0);
  
  readonly PAGE_SIZE = 20;

  ngOnInit() {
    // Debounced search
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(searchTerm => {
      this.performSearch(searchTerm || '');
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private async performSearch(searchTerm: string) {
    if (!searchTerm.trim()) {
      this.searchResults.set([]);
      this.totalResults.set(0);
      this.hasMore.set(false);
      return;
    }

    try {
      this.currentPage.set(0);
      
      const result = await this.graphqlService.search('sanpham', searchTerm, 
        ['title', 'masp', 'mota'], // Search fields
        {
          take: this.PAGE_SIZE,
          skip: 0,
          include: { nhacungcap: true },
          where: { isActive: true },
          orderBy: [
            { title: 'asc' },
            { createdAt: 'desc' }
          ]
        }
      );

      this.searchResults.set(result.data);
      this.totalResults.set(result.total);
      this.hasMore.set(result.hasMore);
      
    } catch (error) {
      console.error('Search error:', error);
      this.searchResults.set([]);
    }
  }

  async loadMore() {
    const searchTerm = this.searchControl.value;
    if (!searchTerm) return;

    try {
      const nextPage = this.currentPage() + 1;
      
      const result = await this.graphqlService.search('sanpham', searchTerm, 
        ['title', 'masp', 'mota'],
        {
          take: this.PAGE_SIZE,
          skip: nextPage * this.PAGE_SIZE,
          include: { nhacungcap: true },
          where: { isActive: true }
        }
      );

      // Append new results
      const currentResults = this.searchResults();
      this.searchResults.set([...currentResults, ...result.data]);
      this.hasMore.set(result.hasMore);
      this.currentPage.set(nextPage);
      
    } catch (error) {
      console.error('Load more error:', error);
    }
  }
}
```

### 3. Custom GraphQL Query Example

```typescript
@Component({
  selector: 'app-dashboard-analytics'
})
export class DashboardAnalyticsComponent implements OnInit {
  private graphqlService = inject(GraphqlService);
  
  salesData = signal<any>(null);
  topProducts = signal<any[]>([]);
  revenueData = signal<any>(null);

  async ngOnInit() {
    await this.loadDashboardData();
  }

  async loadDashboardData() {
    try {
      // Custom query cho dashboard analytics
      const query = `
        query DashboardAnalytics($startDate: String!, $endDate: String!) {
          # Thống kê doanh thu
          revenueStats: findMany(
            modelName: "donhang"
            where: {
              createdAt: { gte: $startDate, lte: $endDate }
              trangthai: "hoantat"
            }
          )
          
          # Top sản phẩm bán chạy
          topSellingProducts: findMany(
            modelName: "donhangsanpham"
            where: {
              donhang: {
                createdAt: { gte: $startDate, lte: $endDate }
                trangthai: "hoantat"
              }
            }
            include: {
              sanpham: { include: { nhacungcap: true } }
              donhang: true
            }
            orderBy: { soluong: "desc" }
            take: 10
          )
          
          # Khách hàng mới
          newCustomers: findMany(
            modelName: "khachhang"
            where: {
              createdAt: { gte: $startDate, lte: $endDate }
            }
            orderBy: { createdAt: "desc" }
            take: 20
          )
        }
      `;

      const startDate = DateHelpers.formatDateForAPI(moment().subtract(30, 'days'));
      const endDate = DateHelpers.formatDateForAPI(moment());

      const result = await this.graphqlService.executeGraphQL({
        query,
        variables: { startDate, endDate }
      });

      if (result.data) {
        this.processAnalyticsData(result.data);
      }
    } catch (error) {
      console.error('Dashboard analytics error:', error);
    }
  }

  private processAnalyticsData(data: any) {
    // Process revenue data
    const orders = data.revenueStats || [];
    const totalRevenue = orders.reduce((sum: number, order: any) => 
      sum + (order.tongtien || 0), 0);
    
    this.revenueData.set({
      totalRevenue,
      totalOrders: orders.length,
      averageOrderValue: orders.length > 0 ? totalRevenue / orders.length : 0
    });

    // Process top products
    const productSales = new Map();
    (data.topSellingProducts || []).forEach((item: any) => {
      const productId = item.sanpham?.id;
      if (productId) {
        const existing = productSales.get(productId) || {
          product: item.sanpham,
          totalQuantity: 0,
          totalRevenue: 0
        };
        existing.totalQuantity += item.soluong || 0;
        existing.totalRevenue += (item.soluong || 0) * (item.dongia || 0);
        productSales.set(productId, existing);
      }
    });

    const topProducts = Array.from(productSales.values())
      .sort((a, b) => b.totalQuantity - a.totalQuantity)
      .slice(0, 10);
    
    this.topProducts.set(topProducts);
  }
}
```

### 4. Bulk Operations Example

```typescript
@Component({
  selector: 'app-bulk-product-update'
})
export class BulkProductUpdateComponent {
  private graphqlService = inject(GraphqlService);
  
  selectedProducts = signal<string[]>([]);
  bulkUpdateData = signal<any>({});

  async bulkUpdatePrices(priceIncrease: number) {
    const productIds = this.selectedProducts();
    if (productIds.length === 0) return;

    try {
      // Custom mutation cho bulk update
      const mutation = `
        mutation BulkUpdateProductPrices($updates: [ProductUpdateInput!]!) {
          bulkUpdateProducts(updates: $updates) {
            success
            updatedCount
            errors {
              id
              message
            }
          }
        }
      `;

      // Prepare updates
      const updates = productIds.map(id => ({
        id,
        data: {
          giaban: { increment: priceIncrease }
        }
      }));

      const result = await this.graphqlService.executeMutation({
        query: mutation,
        variables: { updates }
      });

      if (result.data?.bulkUpdateProducts?.success) {
        console.log(`Updated ${result.data.bulkUpdateProducts.updatedCount} products`);
        
        // Invalidate cache
        this.graphqlService.invalidateModelCache('sanpham');
        
        // Reload data
        await this.reloadProducts();
      }
    } catch (error) {
      console.error('Bulk update error:', error);
    }
  }

  async bulkDelete(productIds: string[]) {
    try {
      const mutation = `
        mutation BulkDeleteProducts($ids: [String!]!) {
          bulkDeleteProducts(ids: $ids) {
            success
            deletedCount
            errors {
              id
              message
            }
          }
        }
      `;

      const result = await this.graphqlService.executeMutation({
        query: mutation,
        variables: { ids: productIds }
      });

      if (result.data?.bulkDeleteProducts?.success) {
        console.log(`Deleted ${result.data.bulkDeleteProducts.deletedCount} products`);
        this.graphqlService.invalidateModelCache('sanpham');
        await this.reloadProducts();
      }
    } catch (error) {
      console.error('Bulk delete error:', error);
    }
  }

  private async reloadProducts() {
    // Reload product list
  }
}
```

### 5. Real-time Data với Polling

```typescript
@Component({
  selector: 'app-realtime-orders'
})
export class RealtimeOrdersComponent implements OnInit, OnDestroy {
  private graphqlService = inject(GraphqlService);
  private pollingInterval?: number;
  
  orders = signal<any[]>([]);
  lastUpdated = signal<Date>(new Date());

  ngOnInit() {
    this.startPolling();
  }

  ngOnDestroy() {
    this.stopPolling();
  }

  private startPolling() {
    // Initial load
    this.loadOrders();
    
    // Poll every 30 seconds
    this.pollingInterval = window.setInterval(() => {
      this.loadOrders();
    }, 30000);
  }

  private stopPolling() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
    }
  }

  private async loadOrders() {
    try {
      const result = await this.graphqlService.getDonhangs({
        where: {
          trangthai: { in: ['moi', 'xacnhan', 'danggiao'] }
        },
        orderBy: { createdAt: 'desc' },
        take: 50,
        include: {
          khachhang: true,
          donhangsanpham: {
            include: { sanpham: true }
          }
        },
        useCache: false // Disable cache for real-time data
      });

      if (result.data) {
        this.orders.set(result.data.data);
        this.lastUpdated.set(new Date());
      }
    } catch (error) {
      console.error('Error loading orders:', error);
    }
  }

  async refreshOrders() {
    // Clear cache và reload
    this.graphqlService.invalidateModelCache('donhang');
    await this.loadOrders();
  }
}
```

## 🎯 Best Practices

### 1. Error Handling Pattern

```typescript
async loadDataWithErrorHandling() {
  try {
    // Clear previous error
    this.graphqlService.clearError();
    
    const result = await this.graphqlService.getSanphams();
    
    if (result.errors) {
      // Handle GraphQL errors
      console.error('GraphQL errors:', result.errors);
      this.showErrorMessage('Có lỗi xảy ra khi tải dữ liệu');
      return;
    }
    
    if (result.data) {
      // Process successful data
      this.processData(result.data);
    }
  } catch (error: any) {
    // Handle network/other errors
    console.error('Request error:', error);
    
    if (error.message?.includes('401')) {
      this.handleUnauthorized();
    } else if (error.message?.includes('network')) {
      this.showErrorMessage('Lỗi kết nối mạng');
    } else {
      this.showErrorMessage('Có lỗi không xác định');
    }
  }
}
```

### 2. Loading State Management

```typescript
@Component({
  template: `
    <div class="content-wrapper">
      <!-- Global loading indicator -->
      <div class="loading-overlay" *ngIf="isGlobalLoading()">
        <mat-spinner></mat-spinner>
        <p>Đang tải dữ liệu...</p>
      </div>
      
      <!-- Content with local loading -->
      <div class="data-section" [class.loading]="isLoading()">
        <ng-container *ngIf="!isLoading(); else loadingTemplate">
          <!-- Your content here -->
        </ng-container>
        
        <ng-template #loadingTemplate>
          <div class="local-loading">
            <mat-progress-bar mode="indeterminate"></mat-progress-bar>
          </div>
        </ng-template>
      </div>
    </div>
  `
})
export class DataComponent {
  private graphqlService = inject(GraphqlService);
  
  // Global loading state từ service
  isGlobalLoading = this.graphqlService.isLoading;
  
  // Local loading state
  isLoading = signal(false);

  async loadData() {
    // Prevent multiple concurrent requests
    if (this.isGlobalLoading()) {
      return;
    }
    
    this.isLoading.set(true);
    
    try {
      const result = await this.graphqlService.getSanphams();
      // Process result
    } finally {
      this.isLoading.set(false);
    }
  }
}
```

### 3. Pagination Best Practices

```typescript
@Component({})
export class PaginatedListComponent {
  private graphqlService = inject(GraphqlService);
  
  // Pagination state
  currentPage = signal(0);
  pageSize = signal(25);
  totalRecords = signal(0);
  
  // Computed pagination info
  totalPages = computed(() => Math.ceil(this.totalRecords() / this.pageSize()));
  hasNext = computed(() => this.currentPage() < this.totalPages() - 1);
  hasPrevious = computed(() => this.currentPage() > 0);
  
  async loadPage(page: number, pageSize?: number) {
    if (pageSize) {
      this.pageSize.set(pageSize);
    }
    
    const skip = page * this.pageSize();
    
    const result = await this.graphqlService.getSanphams({
      skip,
      take: this.pageSize(),
      orderBy: { createdAt: 'desc' },
      // Cache với page number trong key
      cacheKey: `products:page:${page}:size:${this.pageSize()}`
    });
    
    if (result.data) {
      this.currentPage.set(page);
      this.totalRecords.set(result.data.total);
      // Update your data signal
    }
  }
  
  async nextPage() {
    if (this.hasNext()) {
      await this.loadPage(this.currentPage() + 1);
    }
  }
  
  async previousPage() {
    if (this.hasPrevious()) {
      await this.loadPage(this.currentPage() - 1);
    }
  }
}
```

### 4. Filtering và Sorting Pattern

```typescript
export class FilterableListComponent {
  private graphqlService = inject(GraphqlService);
  
  // Filter state
  filters = signal({
    search: '',
    category: null,
    priceRange: null,
    dateRange: null,
    status: 'active'
  });
  
  // Sort state
  sortOptions = signal({
    field: 'createdAt',
    direction: 'desc' as 'asc' | 'desc'
  });
  
  // Computed where clause
  whereClause = computed(() => {
    const f = this.filters();
    const where: any = {};
    
    if (f.search) {
      where.OR = [
        { title: { contains: f.search, mode: 'insensitive' } },
        { masp: { contains: f.search, mode: 'insensitive' } }
      ];
    }
    
    if (f.category) {
      where.nhomsp = f.category;
    }
    
    if (f.priceRange) {
      where.giaban = {
        gte: f.priceRange.min,
        lte: f.priceRange.max
      };
    }
    
    if (f.dateRange) {
      where.createdAt = {
        gte: DateHelpers.formatDateForAPI(f.dateRange.start),
        lte: DateHelpers.formatDateForAPI(f.dateRange.end)
      };
    }
    
    if (f.status) {
      where.isActive = f.status === 'active';
    }
    
    return where;
  });
  
  // Computed order clause
  orderClause = computed(() => {
    const sort = this.sortOptions();
    return { [sort.field]: sort.direction };
  });
  
  async loadData() {
    const result = await this.graphqlService.getSanphams({
      where: this.whereClause(),
      orderBy: this.orderClause(),
      take: 25,
      skip: 0,
      include: { nhacungcap: true }
    });
    
    // Process result
  }
  
  updateFilter(filterName: string, value: any) {
    this.filters.update(current => ({
      ...current,
      [filterName]: value
    }));
    
    // Reload data
    this.loadData();
  }
  
  updateSort(field: string) {
    this.sortOptions.update(current => ({
      field,
      direction: current.field === field && current.direction === 'asc' ? 'desc' : 'asc'
    }));
    
    this.loadData();
  }
}
```

## ⚡ Performance Optimization

### 1. Cache Strategy

```typescript
// Cache với different TTL dựa trên data type
const CACHE_TIMEOUTS = {
  STATIC_DATA: 15 * 60 * 1000,     // 15 minutes (nhacungcap, categories)
  DYNAMIC_DATA: 3 * 60 * 1000,     // 3 minutes (donhang, tonkho)
  USER_DATA: 5 * 60 * 1000,        // 5 minutes (khachhang, user profiles)
  SEARCH_RESULTS: 2 * 60 * 1000    // 2 minutes (search results)
};

// Usage
await this.graphqlService.getNhacungcaps({
  useCache: true,
  cacheTimeout: CACHE_TIMEOUTS.STATIC_DATA
});

await this.graphqlService.getDonhangs({
  useCache: true,
  cacheTimeout: CACHE_TIMEOUTS.DYNAMIC_DATA
});
```

### 2. Selective Field Loading

```typescript
// Chỉ load các fields cần thiết
await this.graphqlService.getSanphams({
  select: {
    id: true,
    title: true,
    masp: true,
    giaban: true,
    // Không load mota, hinhanh để tiết kiệm bandwidth
  },
  include: {
    nhacungcap: {
      select: {
        id: true,
        tenNhacungcap: true
        // Không load address, phone, etc.
      }
    }
  }
});
```

### 3. Batch Loading cho Large Datasets

```typescript
// Sử dụng batch loading cho datasets lớn
const allProducts = await this.graphqlService.getAllSanphams({
  enableBatching: true,
  batchSize: 500,           // Điều chỉnh dựa trên memory
  cacheTimeout: 10 * 60 * 1000  // Cache lâu hơn
});

// Monitor batch processing
console.log('Cache stats:', this.graphqlService.getCacheStats());
```

### 4. Preloading Strategy

```typescript
export class DataPreloadService {
  constructor(private graphqlService: GraphqlService) {}
  
  // Preload static data khi app start
  async preloadStaticData() {
    const promises = [
      this.graphqlService.getAllNhacungcaps({ useCache: true }),
      this.graphqlService.findMany('nhomsp', { useCache: true }),
      this.graphqlService.findMany('banggia', { useCache: true })
    ];
    
    await Promise.allSettled(promises);
    console.log('Static data preloaded');
  }
  
  // Preload theo route
  async preloadRouteData(route: string) {
    switch (route) {
      case 'products':
        await this.graphqlService.getSanphams({ take: 50 });
        break;
      case 'orders':
        await this.graphqlService.getDonhangs({ take: 25 });
        break;
    }
  }
}
```

## 🚨 Error Handling

### 1. Comprehensive Error Handler

```typescript
export class GraphQLErrorHandler {
  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private storageService: StorageService
  ) {}

  handleError(error: any, context?: string) {
    let userMessage = 'Có lỗi xảy ra';
    let shouldRedirect = false;
    
    // GraphQL Errors
    if (error.graphQLErrors?.length > 0) {
      const gqlError = error.graphQLErrors[0];
      
      switch (gqlError.extensions?.code) {
        case 'UNAUTHENTICATED':
          userMessage = 'Phiên đăng nhập đã hết hạn';
          shouldRedirect = true;
          break;
        case 'FORBIDDEN':
          userMessage = 'Bạn không có quyền thực hiện hành động này';
          break;
        case 'BAD_USER_INPUT':
          userMessage = 'Dữ liệu đầu vào không hợp lệ';
          break;
        default:
          userMessage = gqlError.message || 'Lỗi GraphQL';
      }
    }
    
    // Network Errors
    else if (error.networkError) {
      if (error.networkError.status === 401) {
        userMessage = 'Phiên đăng nhập đã hết hạn';
        shouldRedirect = true;
      } else if (error.networkError.status >= 500) {
        userMessage = 'Lỗi máy chủ, vui lòng thử lại sau';
      } else {
        userMessage = 'Lỗi kết nối mạng';
      }
    }
    
    // Show user message
    this.snackBar.open(userMessage, 'Đóng', {
      duration: 5000,
      panelClass: ['snackbar-error']
    });
    
    // Handle redirect if needed
    if (shouldRedirect) {
      this.storageService.removeItem('token');
      this.router.navigate(['/login']);
    }
    
    // Log error for debugging
    console.error('GraphQL Error:', {
      context,
      error,
      timestamp: new Date().toISOString()
    });
  }
}
```

### 2. Retry Logic

```typescript
export class RetryableGraphQLService {
  constructor(private graphqlService: GraphqlService) {}
  
  async executeWithRetry<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3,
    delay: number = 1000
  ): Promise<T> {
    let lastError: any;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error: any) {
        lastError = error;
        
        // Don't retry on certain errors
        if (this.shouldNotRetry(error)) {
          throw error;
        }
        
        if (attempt < maxRetries) {
          console.log(`Attempt ${attempt} failed, retrying in ${delay}ms...`);
          await this.sleep(delay * attempt); // Exponential backoff
        }
      }
    }
    
    throw lastError;
  }
  
  private shouldNotRetry(error: any): boolean {
    // Don't retry on authentication errors
    if (error.networkError?.status === 401) return true;
    
    // Don't retry on bad user input
    if (error.graphQLErrors?.some((e: any) => 
      e.extensions?.code === 'BAD_USER_INPUT'
    )) return true;
    
    return false;
  }
  
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
```

## 🔄 Migration Guide

### From REST API to GraphQL Service

#### Before (REST)
```typescript
// OLD REST approach
async loadProducts() {
  const response = await fetch(`${APIURL}/sanpham?page=1&limit=25`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  const data = await response.json();
  return data;
}

async searchProducts(term: string) {
  const response = await fetch(`${APIURL}/sanpham/search?q=${term}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.json();
}

async createProduct(productData: any) {
  const response = await fetch(`${APIURL}/sanpham`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(productData)
  });
  return response.json();
}
```

#### After (GraphQL Service)
```typescript
// NEW GraphQL approach
async loadProducts() {
  const result = await this.graphqlService.getSanphams({
    take: 25,
    skip: 0,
    include: { nhacungcap: true }
  });
  return result.data;
}

async searchProducts(term: string) {
  const result = await this.graphqlService.search('sanpham', term, 
    ['title', 'masp'], 
    { include: { nhacungcap: true } }
  );
  return result.data;
}

async createProduct(productData: any) {
  const mutation = `
    mutation CreateProduct($input: CreateSanphamInput!) {
      createSanpham(input: $input) {
        id
        title
        masp
      }
    }
  `;
  
  const result = await this.graphqlService.executeMutation({
    query: mutation,
    variables: { input: productData }
  });
  return result.data?.createSanpham;
}
```

### Migration Benefits
1. **Automatic caching** - Không cần tự implement cache
2. **Type safety** - Full TypeScript support
3. **Loading states** - Automatic loading state management
4. **Error handling** - Comprehensive error handling
5. **Authentication** - Auto JWT injection
6. **Performance** - Optimized queries và batch processing

## 🔧 Troubleshooting

### Common Issues

#### 1. 401 Unauthorized
```typescript
// Check JWT token
const token = this._StorageService.getItem('token');
if (!token) {
  // Redirect to login
  this.router.navigate(['/login']);
}

// Verify token expiry
const tokenPayload = JSON.parse(atob(token.split('.')[1]));
if (tokenPayload.exp * 1000 < Date.now()) {
  // Token expired
  this._StorageService.removeItem('token');
  this.router.navigate(['/login']);
}
```

#### 2. GraphQL Schema Errors
```typescript
// Debug schema
const introspectionQuery = `
  query IntrospectionQuery {
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
`;

const result = await this.graphqlService.executeGraphQL({
  query: introspectionQuery
});

console.log('Available types:', result.data);
```

#### 3. Network Timeout
```typescript
// Configure Apollo Client timeout
private setupApolloClient() {
  const httpLink = createHttpLink({
    uri: `${environment.APIURL}/graphql`,
    timeout: 30000  // 30 seconds
  });
  
  // Add retry link
  const retryLink = new RetryLink({
    delay: {
      initial: 300,
      max: Infinity,
      jitter: true
    },
    attempts: {
      max: 3,
      retryIf: (error, _operation) => !!error
    }
  });
}
```

#### 4. Memory Leaks
```typescript
export class ComponentWithSubscription implements OnDestroy {
  private destroy$ = new Subject<void>();
  
  ngOnInit() {
    // Use takeUntil để prevent memory leaks
    this.someObservable$.pipe(
      takeUntil(this.destroy$)
    ).subscribe();
  }
  
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    
    // Clear cache if needed
    this.graphqlService.clearCache('specific-pattern');
  }
}
```

#### 5. Debug Cache Issues
```typescript
// Monitor cache performance
setInterval(() => {
  const stats = this.graphqlService.getCacheStats();
  console.log('Cache Stats:', {
    hitRate: `${stats.hitRate.toFixed(1)}%`,
    size: stats.size,
    hits: stats.hits,
    misses: stats.misses
  });
}, 10000);

// Clear cache when needed
if (stats.hitRate < 20) {
  console.warn('Low cache hit rate, consider adjusting cache strategy');
}
```

### Performance Monitoring

```typescript
export class PerformanceMonitor {
  private metrics = new Map<string, number[]>();
  
  async measureOperation<T>(
    name: string, 
    operation: () => Promise<T>
  ): Promise<T> {
    const start = performance.now();
    
    try {
      const result = await operation();
      const duration = performance.now() - start;
      
      this.recordMetric(name, duration);
      
      if (duration > 2000) {
        console.warn(`Slow operation detected: ${name} took ${duration}ms`);
      }
      
      return result;
    } catch (error) {
      const duration = performance.now() - start;
      this.recordMetric(`${name}_error`, duration);
      throw error;
    }
  }
  
  private recordMetric(name: string, duration: number) {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }
    
    const measurements = this.metrics.get(name)!;
    measurements.push(duration);
    
    // Keep only last 100 measurements
    if (measurements.length > 100) {
      measurements.shift();
    }
  }
  
  getMetrics() {
    const summary = new Map();
    
    for (const [name, measurements] of this.metrics) {
      const avg = measurements.reduce((a, b) => a + b, 0) / measurements.length;
      const min = Math.min(...measurements);
      const max = Math.max(...measurements);
      
      summary.set(name, { avg, min, max, count: measurements.length });
    }
    
    return summary;
  }
}

// Usage
const monitor = new PerformanceMonitor();

const products = await monitor.measureOperation('loadProducts', () =>
  this.graphqlService.getSanphams({ take: 100 })
);
```

## 📊 Monitoring và Analytics

### Cache Analytics Dashboard

```typescript
@Component({
  selector: 'app-cache-analytics',
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>GraphQL Cache Analytics</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <div class="metrics-grid">
          <div class="metric">
            <h3>Hit Rate</h3>
            <div class="value">{{ cacheStats().hitRate | number:'1.1-1' }}%</div>
          </div>
          <div class="metric">
            <h3>Cache Size</h3>
            <div class="value">{{ cacheStats().size }}</div>
          </div>
          <div class="metric">
            <h3>Total Hits</h3>
            <div class="value">{{ cacheStats().hits }}</div>
          </div>
          <div class="metric">
            <h3>Total Misses</h3>
            <div class="value">{{ cacheStats().misses }}</div>
          </div>
        </div>
        
        <button mat-button (click)="clearCache()">Clear Cache</button>
        <button mat-button (click)="refreshStats()">Refresh</button>
      </mat-card-content>
    </mat-card>
  `
})
export class CacheAnalyticsComponent {
  private graphqlService = inject(GraphqlService);
  
  cacheStats = signal(this.graphqlService.getCacheStats());
  
  refreshStats() {
    this.cacheStats.set(this.graphqlService.getCacheStats());
  }
  
  clearCache() {
    this.graphqlService.clearCache();
    this.refreshStats();
  }
}
```

## 🏁 Kết luận

[`GraphqlService`](frontend/src/app/shared/services/graphql.service.ts) cung cấp một giải pháp hoàn chỉnh và tối ưu cho việc tương tác với GraphQL API trong ứng dụng Angular. Với các tính năng như intelligent caching, batch processing, reactive state management và comprehensive error handling, service này giúp:

### ✅ Advantages
- **Performance**: Cache thông minh + batch processing
- **Developer Experience**: Type-safe + reactive state
- **Maintainability**: Consistent API + comprehensive error handling
- **Scalability**: Optimized cho large datasets

### 📈 Key Metrics to Monitor
- Cache hit rate (target: >80%)
- Average query response time (<500ms)
- Error rate (<1%)
- Memory usage stability

### 🔮 Future Enhancements
- WebSocket subscriptions cho real-time data
- Offline support với IndexedDB
- Advanced query optimization
- GraphQL Federation support

Tham khảo thêm trong [`graphql.service copy.ts`](frontend/src/app/shared/services/graphql.service copy.ts) và [GraphQL README](frontend/src/app/shared/services/graphql.README.md) để có thêm nhiều examples và patterns khác.