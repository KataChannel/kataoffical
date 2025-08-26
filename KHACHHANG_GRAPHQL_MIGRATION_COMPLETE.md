# GraphQL Migration for Khachhang Components

## Overview
Migrated khachhang (customer) management components from REST API to GraphQL for improved performance and optimized data fetching.

## Files Updated

### 1. New GraphQL Service
**File**: `khachhang-graphql.service.ts`
- **Purpose**: Centralized GraphQL service for customer operations
- **Key Features**:
  - Reactive signals for state management
  - Optimized field selection for improved performance
  - Real-time updates via WebSocket
  - Batch operations for bulk imports
  - Error handling and loading states
  - Pagination with GraphQL
  - Cache management

### 2. Updated List Component
**File**: `listkhachhang.component.ts`
- **Changes**:
  - Replaced `KhachhangService` with `KhachhangGraphqlService`
  - Added reactive loading and error states
  - Updated method calls to match GraphQL service API
  - Added `MatProgressSpinnerModule` for loading indicators
  - Optimized pagination with GraphQL

### 3. Updated Detail Component
**File**: `detailkhachhang.component.ts`
- **Changes**:
  - Replaced `KhachhangService` with `KhachhangGraphqlService`
  - Updated CRUD operations to use GraphQL methods
  - Added loading and error state handling
  - Added `MatProgressSpinnerModule` for better UX
  - Fixed type safety issues

## Performance Optimizations

### 1. Selective Field Loading
```typescript
// List view - minimal fields for performance
const select = {
  id: true,
  makh: true,
  name: true,
  diachi: true,
  // ... only required fields
  banggia: {
    select: {
      id: true,
      title: true,
      mabanggia: true
    }
  }
};
```

### 2. Detailed Loading for Edit View
```typescript
// Detail view - full data with relations
const include = {
  banggia: {
    select: {
      id: true,
      title: true,
      mabanggia: true,
      type: true,
      status: true
    }
  },
  donhang: {
    select: {
      id: true,
      madonhang: true,
      ngaydat: true,
      status: true,
      // ... relevant fields
    },
    orderBy: { createdAt: 'desc' },
    take: 10 // Limit to recent orders
  }
};
```

### 3. Optimized Search with GraphQL
```typescript
// Advanced search with OR conditions
const where: any = {
  isActive: true,
  OR: [
    { name: { contains: searchTerm, mode: 'insensitive' } },
    { makh: { contains: searchTerm, mode: 'insensitive' } },
    { email: { contains: searchTerm, mode: 'insensitive' } },
    { sdt: { contains: searchTerm, mode: 'insensitive' } }
  ]
};
```

### 4. Pagination Optimization
```typescript
// Server-side pagination with GraphQL
const skip = (this.page() - 1) * this.pageSize();
const take = this.pageSize();

// Separate total count query for efficiency
const totalResult = await this._GraphqlService.findMany('khachhang', {
  where,
  select: { id: true } // Minimal select for count
});
```

### 5. Batch Operations
```typescript
// Bulk import with batch create
const result = await this._GraphqlService.batchCreate('khachhang', batchData);
```

## Real-time Features

### 1. WebSocket Integration
```typescript
// Real-time updates via Socket.IO
this.socket.on('khachhang:created', (data: any) => {
  const current = this.ListKhachhang();
  this.ListKhachhang.set([data, ...current]);
});

this.socket.on('khachhang:updated', (data: any) => {
  // Update list and detail views reactively
});
```

### 2. Reactive State Management
```typescript
// Angular signals for reactive updates
ListKhachhang = signal<any[]>([]);
DetailKhachhang = signal<any>({});
loading = signal<boolean>(false);
error = signal<string | null>(null);
```

## Error Handling

### 1. Centralized Error Management
```typescript
try {
  // GraphQL operation
} catch (error) {
  console.error('Error:', error);
  this.error.set('User-friendly error message');
  this._ErrorLogService.logError('operation', error);
  this._snackBar.open('Error message', 'Close', { duration: 3000 });
}
```

### 2. Loading States
```typescript
// Reactive loading indicators
effect(() => {
  const isLoading = this.loading();
  // Update UI based on loading state
});
```

## Benefits Achieved

### 1. Performance Improvements
- **Reduced Data Transfer**: Only fetch required fields
- **Optimized Queries**: Single request for complex data relationships
- **Efficient Pagination**: Server-side pagination with total count optimization
- **Batch Operations**: Bulk operations for better throughput

### 2. Better User Experience
- **Real-time Updates**: Instant UI updates via WebSocket
- **Loading States**: Visual feedback during operations
- **Error Handling**: User-friendly error messages
- **Reactive UI**: Automatic updates when data changes

### 3. Developer Experience
- **Type Safety**: Better TypeScript integration
- **Centralized Logic**: All data operations in one service
- **Reactive Patterns**: Angular signals for state management
- **Error Logging**: Centralized error tracking

### 4. Scalability
- **Caching**: Built-in caching mechanisms
- **Batch Operations**: Handle large datasets efficiently
- **Optimized Network**: Reduced API calls
- **Real-time Sync**: Consistent data across multiple clients

## Usage Examples

### 1. List All Customers
```typescript
await this._KhachhangService.getAllKhachhang();
// Automatically updates ListKhachhang signal
```

### 2. Search Customers
```typescript
const searchParams = { subtitle: 'search term' };
await this._KhachhangService.getKhachhangBy(searchParams);
```

### 3. Get Customer Details
```typescript
await this._KhachhangService.getKhachhangById('customer-id');
// Updates DetailKhachhang signal with full data
```

### 4. Create Customer
```typescript
const newCustomer = { name: 'Customer Name', /* ... */ };
await this._KhachhangService.createKhachhang(newCustomer);
```

### 5. Update Customer
```typescript
await this._KhachhangService.updateKhachhang(customerId, updateData);
```

### 6. Delete Customer (Soft Delete)
```typescript
await this._KhachhangService.deleteKhachhang(customerId);
```

### 7. Bulk Import
```typescript
const customerList = [/* array of customers */];
await this._KhachhangService.importKhachhang(customerList);
```

## Migration Completed
✅ **GraphQL Service**: Fully implemented with optimizations
✅ **List Component**: Migrated to GraphQL with reactive state
✅ **Detail Component**: Updated with GraphQL CRUD operations
✅ **Performance**: Optimized queries and data fetching
✅ **Real-time**: WebSocket integration for live updates
✅ **Error Handling**: Comprehensive error management
✅ **Loading States**: Visual feedback for all operations

The khachhang components are now fully optimized with GraphQL, providing better performance, user experience, and maintainability.
