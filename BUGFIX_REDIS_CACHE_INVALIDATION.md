# FIX REDIS CACHE - Khách Hàng Update Không Hiển Thị Dữ Liệu Mới

## 🔴 VẤNĐỀ
Sau khi update khách hàng, frontend vẫn hiển thị dữ liệu cũ từ Redis cache. Phải xóa cache thủ công mới có dữ liệu mới.

---

## ✅ GIẢI PHÁP

### 1️⃣ **Backend - Cache Controller** ✅ NEW

**File**: `/api/src/cache/cache.controller.ts` (NEW)

Tạo endpoint để invalidate Redis cache:

```typescript
@Post('invalidate/:model')
@UseGuards(JwtAuthGuard)
async invalidateCache(@Param('model') model: string) {
  // Xóa tất cả keys trong Redis matching model name
  const pattern = `*${model.toLowerCase()}*`;
  const keys = await this.redis.keys(pattern);
  
  if (keys && keys.length > 0) {
    await this.redis.del(...keys);
  }
  
  return { success: true, deletedKeys: keys?.length || 0 };
}
```

**Endpoints**:
- `POST /cache/invalidate/banggia` - Xóa cache cho banggia
- `POST /cache/invalidate-all` - Xóa tất cả cache
- `POST /cache/stats` - Xem cache statistics

### 2️⃣ **Backend - App Module** ✅ UPDATED

**File**: `/api/src/app.module.ts`

Import CacheModule:
```typescript
import { CacheModule } from './cache/cache.module';

@Module({
  imports: [
    // ... other modules
    CacheModule,
  ],
})
```

### 3️⃣ **Frontend - Service** ✅ UPDATED

**File**: `/frontend/src/app/admin/banggia/banggia-graphql.service.ts`

Thêm cache invalidation sau update:

```typescript
async updateBanggia(dulieu: any) {
  // ... update logic ...
  
  const updatedBanggia = await this._GraphqlService.updateOne(...);
  
  // ✅ CRITICAL: Invalidate Redis cache
  console.log('[UPDATE-BG] Invalidating cache for banggia...');
  try {
    const response = await fetch(`${environment.APIURL}/cache/invalidate/banggia`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this._StorageService.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      console.log('[UPDATE-BG] ✅ Cache invalidated successfully');
    }
  } catch (cacheError) {
    console.warn('[UPDATE-BG] ⚠️ Cache invalidation error:', cacheError);
  }
  
  this.DetailBanggia.set(updatedBanggia);
  await this.getAllBanggia();
  
  return updatedBanggia;
}
```

---

## 🧪 CÁCH KIỂM TRA

### Test Cache Invalidation

```bash
# 1. Mở DevTools (F12) → Console

# 2. Cập nhật khách hàng, kiểm tra logs:
[UPDATE-BG] Invalidating cache for banggia...
[UPDATE-BG] ✅ Cache invalidated successfully

# 3. Backend logs:
[CACHE] Invalidating cache for model: banggia
[CACHE] Found X keys matching pattern: *banggia*
[CACHE] ✅ Deleted X cache keys

# 4. Kiểm tra cache stats:
curl -H "Authorization: Bearer TOKEN" \
  -X POST http://localhost:3000/cache/stats

# Response:
{
  "success": true,
  "totalKeys": 5,
  "dbSize": 1024,
  "sampleKeys": [...]
}
```

### Test End-to-End

```
1. Mở bảng giá detail
2. Cập nhật khách hàng (thêm/xóa)
3. Kiểm tra:
   ✅ Frontend logs: Cache invalidation message
   ✅ Backend logs: Keys deleted
   ✅ UI: Dữ liệu mới hiển thị ngay (không cần reload)
4. Reload page → Dữ liệu vẫn chính xác
```

---

## 📊 FLOW CÓ CACHE INVALIDATION

```
Frontend cập nhật khách hàng
  ↓
GraphQL updateOne() → Backend
  ↓
Database update ✅
  ↓
Frontend: Gọi /cache/invalidate/banggia
  ↓
Backend: Xóa tất cả Redis keys matching *banggia*
  ✅ Keys deleted: 15
  ↓
Frontend: getAllBanggia() reload from DB (không cache)
  ↓
UI: Hiển thị dữ liệu mới chính xác ✅
```

---

## 🔑 KEY CHANGES

| File | Change | Impact |
|------|--------|--------|
| `cache.controller.ts` | NEW | Endpoint để invalidate Redis cache |
| `cache.module.ts` | NEW | NestJS Module wrapper |
| `app.module.ts` | Import CacheModule | Cache controller available |
| `banggia-graphql.service.ts` | Call /cache/invalidate | Tự động clear cache sau update |

---

## ⚙️ ENVIRONMENT VARIABLES

```bash
# .env (backend)
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=  # Optional
```

---

## 🚀 DEPLOYMENT

```bash
# Build backend
cd api && npm run build

# Start backend
npm start  # hoặc npm run dev:watch

# Cache controller sẽ available tại:
POST /cache/invalidate/:model
POST /cache/invalidate-all
POST /cache/stats
```

---

## 🐛 TROUBLESHOOTING

| Problem | Solution |
|---------|----------|
| Cache không delete | Kiểm tra Redis connection, logs hiển thị gì |
| Vẫn hiển thị dữ liệu cũ | Check Redis keys `redis-cli KEYS '*banggia*'` |
| Error 401 Unauthorized | Kiểm tra JWT token trong request |
| Connection refused | Kiểm tra Redis running: `redis-cli ping` |

---

## 📝 NOTES

- Cache invalidation chỉ xóa keys matching `*banggia*`
- Frontend tự động call invalidate endpoint sau update
- Nếu cache error không throw - update vẫn thành công
- Backend logs `[CACHE]` prefix để dễ debug

---

**Status**: ✅ FIXED & DEPLOYED
**Last Updated**: 2025-10-23
**Impact**: Auto cache invalidation on banggia/khachhang update
