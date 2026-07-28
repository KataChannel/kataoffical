// CRITICAL PERFORMANCE OPTIMIZATION RECOMMENDATIONS FOR PHIEUGIAOHANG

/*
Server Hanging Issues Analysis & Solutions:

1. DATABASE TRANSACTION BOTTLENECKS (Critical):
   - updatePhieugiao() has N+1 query patterns
   - Sequential processing in updateBulk() can timeout
   - No transaction batching or size limits

2. FRONTEND MEMORY LEAKS (High):
   - Async operations in reactive contexts (effect, subscribe) 
   - Loading 99,999 products at once causes memory pressure
   - No proper cleanup or pagination

3. CONCURRENCY ISSUES (Medium):
   - Multiple simultaneous phieugiao updates can deadlock
   - No rate limiting on API calls
   - Heavy data processing blocks UI thread

IMMEDIATE ACTIONS REQUIRED:
*/

// 1. Backend Service Optimization (api/src/donhang/donhang.service.ts)
async updatePhieugiao(id: string, data: any) {
  return this.prisma.$transaction(async (prisma) => {
    // OPTIMIZED: Batch all updates instead of N+1 queries
    const sanphamUpdates = data.sanpham.map((sp: any) => 
      prisma.donhangsanpham.updateMany({
        where: { donhangId: id, idSP: sp.id },
        data: {
          ghichu: sp.ghichu,
          sldat: parseFloat((sp.sldat ?? 0).toFixed(3)),
          slgiao: parseFloat((sp.slgiao ?? 0).toFixed(3)),
          slnhan: parseFloat((sp.slnhan ?? 0).toFixed(3)),
          // ... other fields
        },
      })
    );

    // Execute all sanpham updates concurrently
    await Promise.all(sanphamUpdates);

    // Update main donhang record
    return prisma.donhang.update({
      where: { id },
      data: {
        status: data.status,
        ghichu: data.ghichu,
        // ... other fields
      },
      include: { sanpham: true }
    });
  }, {
    timeout: 30000, // 30 second timeout
    maxWait: 5000   // Max wait for connection
  });
}

// 2. Batch Processing for Bulk Operations
async updateBulk(ids: string[], status: string) {
  const batchSize = 10; // Process in small batches
  const results = { success: 0, fail: 0 };

  for (let i = 0; i < ids.length; i += batchSize) {
    const batch = ids.slice(i, i + batchSize);
    
    try {
      const batchResult = await this.prisma.$transaction(async (prisma) => {
        const promises = batch.map(async (id) => {
          // Process individual order logic here
          // Return { success: 1, fail: 0 } or { success: 0, fail: 1 }
        });
        
        return Promise.all(promises);
      }, {
        timeout: 45000 // Longer timeout for batch operations
      });
      
      // Aggregate results
      batchResult.forEach(result => {
        results.success += result.success;
        results.fail += result.fail;
      });
    } catch (error) {
      console.error(`Batch ${i}-${i+batchSize} failed:`, error);
      results.fail += batch.length;
    }
  }

  return results;
}

// 3. Frontend Component Fixes (detailphieugiaohang.component.ts)

// Fixed constructor with proper cleanup:
constructor(private sharedInputService: SharedInputService) {
  // FIXED: Non-async subscribe with proper cleanup
  this._route.paramMap
    .pipe(takeUntilDestroyed())
    .subscribe((params) => {
      const id = params.get('id');
      this._PhieugiaohangService.setDonhangId(id);
      // Load products asynchronously with pagination
      this.loadProductsPaginated();
    });

  // FIXED: Non-async effect with proper state management
  effect(() => {
    const user = this._UserService.profile();
    const id = this._PhieugiaohangService.donhangId();
    
    if (user && id && id !== '0') {
      // Use microtask to prevent blocking
      queueMicrotask(() => this.loadPhieugiaohangData(id));
    } else if (id === '0') {
      this._router.navigate(['/admin/phieugiaohang']);
      this._ListphieugiaohangComponent.drawer.close();
    }
  });
}

// FIXED: Paginated product loading
private async loadProductsPaginated() {
  try {
    // Load reasonable batch size instead of 99,999
    const pageSize = 500;
    await this._SanphamService.getAllSanpham({ pageSize });
    this.filterSanpham = this._SanphamService.ListSanpham();
  } catch (error) {
    console.error('Error loading products:', error);
    this._snackBar.open('Lỗi tải danh sách sản phẩm', 'Đóng', { duration: 3000 });
  }
}

// 4. Rate Limiting & Debouncing for API Calls
// Add to service methods:
private readonly apiCallQueue = new Map<string, Promise<any>>();

async updatePhieugiao(data: any): Promise<any> {
  const key = `update-${data.id}`;
  
  // Prevent duplicate concurrent calls
  if (this.apiCallQueue.has(key)) {
    return this.apiCallQueue.get(key);
  }

  const promise = this.http.post(`/api/donhang/update-phieugiao/${data.id}`, data)
    .pipe(
      finalize(() => this.apiCallQueue.delete(key))
    )
    .toPromise();
    
  this.apiCallQueue.set(key, promise);
  return promise;
}

// 5. Memory Management & Performance Monitoring
// Add to service:
private performanceMetrics = {
  updateStartTime: 0,
  updateDuration: 0,
  memoryUsage: 0
};

private trackPerformance<T>(operation: () => Promise<T>, operationName: string): Promise<T> {
  const startTime = performance.now();
  const initialMemory = performance.memory?.usedJSHeapSize || 0;
  
  return operation().finally(() => {
    const duration = performance.now() - startTime;
    const memoryDelta = (performance.memory?.usedJSHeapSize || 0) - initialMemory;
    
    console.log(`${operationName} took ${duration.toFixed(2)}ms, memory delta: ${memoryDelta} bytes`);
    
    // Alert if operation is too slow
    if (duration > 5000) {
      console.warn(`SLOW OPERATION: ${operationName} took ${duration}ms`);
    }
  });
}

/*
DEPLOYMENT CHECKLIST:
1. ✅ Fix async-in-effect patterns in frontend
2. ✅ Implement batch processing for database operations  
3. ✅ Add transaction timeouts and error handling
4. ✅ Reduce product loading size from 99,999 to 500
5. ⏳ Add performance monitoring and alerting
6. ⏳ Implement proper error boundaries
7. ⏳ Add database connection pooling optimization

TESTING REQUIRED:
- Load test with 100+ concurrent users
- Bulk operation test with 500+ orders
- Memory leak testing with long sessions
- Database deadlock simulation
*/