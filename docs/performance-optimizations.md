# Performance Optimization Plan for Phieugiaohang Operations

## Critical Issues Identified

### 1. N+1 Query Problem in updatePhieugiao()
**Current Code (Line 2595-2615):**
```typescript
for (const sp of data.sanpham) {
  await prisma.donhangsanpham.updateMany({
    where: { donhangId: id, idSP: sp.id },
    data: { ... }
  });
}
```

**Optimized Solution:**
```typescript
// Batch update approach
const batchUpdates = data.sanpham.map(sp => ({
  where: { donhangId: id, idSP: sp.id },
  data: {
    ghichu: sp.ghichu,
    sldat: parseFloat((sp.sldat ?? 0).toFixed(3)),
    // ... other fields
  }
}));

// Use Promise.all for concurrent updates
await Promise.all(
  batchUpdates.map(update => 
    prisma.donhangsanpham.updateMany(update)
  )
);
```

### 2. Transaction Timeout in updateBulk()
**Current Code (Line 2626-2750):**
```typescript
for (const id of ids) {
  // Sequential processing - SLOW!
}
```

**Optimized Solution:**
```typescript
// Process in smaller batches with timeout control
const batchSize = 10;
for (let i = 0; i < ids.length; i += batchSize) {
  const batch = ids.slice(i, i + batchSize);
  
  await this.prisma.$transaction(async (prisma) => {
    // Process batch concurrently
    await Promise.all(batch.map(async (id) => {
      // Individual order processing
    }));
  }, {
    timeout: 30000 // 30 second timeout
  });
}
```

### 3. Frontend Memory Leaks
**Current Code (Line 132-147):**
```typescript
this._route.paramMap.subscribe(async (params) => {
  await this._SanphamService.getAllSanpham({pageSize:99999});
});

effect(async () => {
  await this._UserService.getProfile();
});
```

**Optimized Solution:**
```typescript
// Use takeUntilDestroyed and proper cleanup
private destroy$ = new Subject<void>();

constructor() {
  this._route.paramMap
    .pipe(takeUntilDestroyed())
    .subscribe(params => {
      // Non-async operations only
      const id = params.get('id');
      if (id) {
        this.loadData(id); // Separate async method
      }
    });
}

private async loadData(id: string) {
  // Paginated loading instead of 99999 records
  await this._SanphamService.getAllSanpham({
    page: 1,
    pageSize: 50 // Reasonable limit
  });
}
```

## Implementation Priority

1. **URGENT**: Fix frontend async-in-subscribe patterns
2. **HIGH**: Implement batch processing for updatePhieugiao
3. **HIGH**: Add transaction timeouts and batch sizing
4. **MEDIUM**: Optimize product loading with pagination
5. **LOW**: Add performance monitoring and alerts

## Performance Metrics to Track

- Transaction duration
- Memory usage during bulk operations
- Database connection pool utilization
- Frontend component lifecycle events

## Testing Requirements

1. Load test with 1000+ concurrent users
2. Bulk operation test with 100+ orders
3. Memory profiling during peak usage
4. Database connection monitoring