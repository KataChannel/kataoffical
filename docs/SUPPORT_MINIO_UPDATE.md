# 🔄 Support Ticket System - Cập nhật sử dụng MinIO

## ✅ Đã hoàn thành

Hệ thống Support Ticket đã được cập nhật để sử dụng **MinIO** thay vì local file storage.

---

## 📦 Những thay đổi chính

### 1. Backend (API)

#### **support-upload.controller.ts** - Đã cập nhật
```typescript
// Trước: Sử dụng Multer diskStorage
@UseInterceptors(FilesInterceptor('files', 10, {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const uniqueName = `${uuidv4()}${extname(file.originalname)}`;
      cb(null, uniqueName);
    },
  }),
  ...
}))

// Sau: Sử dụng MinioService
constructor(private readonly minioService: MinioService) {}

@Post('upload')
@UseInterceptors(FilesInterceptor('files'))
async uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
  const uploadResults = await Promise.all(
    files.map(async (file) => {
      const fileUrl = await this.minioService.uploadFile(file, {
        category: 'support',
        group: 'tickets',
        title: file.originalname,
      });
      return { fileName, fileType, fileSize, fileUrl };
    })
  );
  return uploadResults;
}
```

#### **support.module.ts** - Đã cập nhật
```typescript
// Trước: Import MulterModule
imports: [
  MulterModule.register({ dest: './uploads' }),
  AuthModule,
]

// Sau: Import MinioService
imports: [AuthModule],
providers: [..., MinioService]
```

### 2. Frontend (Angular)

#### **support-detail.component.ts** - Đã cập nhật
```typescript
// Thêm import
import { GetImage } from '../../shared/utils/shared.utils';

// Sử dụng GetImage utility để hiển thị file
getFileUrl(url: string): string {
  return GetImage(url);
}
```

**GetImage utility tự động:**
- Kiểm tra nếu URL đã có `http` → trả về nguyên bản
- Nếu không → thêm `environment.ImageURL` (MinIO endpoint) vào trước
- Ví dụ: `uploads/123.jpg` → `https://media.rausachtrangia.com/uploads/123.jpg`

---

## 🔧 Cấu hình MinIO

### Backend Environment Variables
```env
MINIO_ENDPOINT=storage.rausachtrangia.com
MINIO_PORT=9000
MINIO_USE_SSL=true
MINIO_ROOT_USER=admin
MINIO_ROOT_PASSWORD=your_password
MINIO_BUCKET=uploads
MINIO_PUBLIC_URL=https://media.rausachtrangia.com
```

### Frontend Environment
```typescript
// frontend/src/environments/environment.development.ts
export const environment = {
  ImageURL: 'https://media.rausachtrangia.com/',
  // MinIO endpoint để serve images/videos
};
```

---

## 📊 So sánh: Before vs After

| Aspect | Before (Local Storage) | After (MinIO) |
|--------|----------------------|---------------|
| **Storage** | Local filesystem (`./uploads/`) | MinIO object storage |
| **Scalability** | Limited to single server | Distributed, scalable |
| **URL Format** | `/uploads/file.jpg` | `uploads/file.jpg` |
| **URL Resolution** | Served by NestJS static | Served by MinIO CDN |
| **Backup** | Manual file copy | MinIO built-in replication |
| **Access Control** | File system permissions | MinIO bucket policies |
| **Metadata** | None | Saved to FileManager table |
| **CDN Support** | No | Yes (via MinIO endpoint) |

---

## ✅ Tính năng đã giữ nguyên

1. ✅ Upload multiple files (images/videos)
2. ✅ File validation (type, size)
3. ✅ JWT authentication
4. ✅ Progress tracking
5. ✅ File preview (images/videos)
6. ✅ Error handling

---

## 🆕 Tính năng mới nhờ MinIO

1. ✅ **File Metadata Tracking** - Lưu thông tin file vào DB
2. ✅ **Category & Group** - Phân loại file (support/tickets)
3. ✅ **File Manager** - Quản lý tập trung tất cả files
4. ✅ **CDN Support** - Serve files qua MinIO endpoint
5. ✅ **Scalability** - Dễ dàng mở rộng storage
6. ✅ **Backup & Replication** - MinIO hỗ trợ sẵn

---

## 🔍 File Upload Flow

### Old Flow (Local Storage):
```
1. Frontend chọn files
2. POST /support/upload với multipart/form-data
3. Multer lưu files vào ./uploads/
4. Return { fileUrl: '/uploads/uuid.jpg' }
5. Frontend hiển thị: http://localhost:3331/uploads/uuid.jpg
```

### New Flow (MinIO):
```
1. Frontend chọn files
2. POST /support/upload với multipart/form-data
3. MinioService upload to MinIO bucket
4. Save metadata to FileManager table
5. Return { fileUrl: 'uploads/timestamp-file.jpg' }
6. Frontend hiển thị: https://media.rausachtrangia.com/uploads/timestamp-file.jpg
```

---

## 📝 Database Changes

MinIO service tự động lưu metadata vào bảng `FileManager`:

```prisma
model FileManager {
  id          String   @id @default(cuid())
  codeId      String   @unique
  url         String
  fileType    String
  fileSize    Int
  title       String
  description String?
  metaData    Json?
  category    String?  // "support"
  group       String?  // "tickets"
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

**Benefits:**
- Track tất cả files đã upload
- Search files theo category/group
- Xem file usage statistics
- Dễ dàng cleanup unused files

---

## 🧪 Testing

### 1. Test Upload
```bash
curl -X POST http://localhost:3331/support/upload \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "files=@image1.jpg" \
  -F "files=@image2.jpg"
```

**Expected Response:**
```json
[
  {
    "fileName": "image1.jpg",
    "fileType": "image/jpeg",
    "fileSize": 102400,
    "fileUrl": "uploads/1696234567890-image1.jpg"
  },
  {
    "fileName": "image2.jpg",
    "fileType": "image/jpeg",
    "fileSize": 204800,
    "fileUrl": "uploads/1696234567891-image2.jpg"
  }
]
```

### 2. Test File Access
```bash
# Via MinIO directly
curl https://media.rausachtrangia.com/uploads/1696234567890-image1.jpg

# Via frontend GetImage utility
# Automatically converts to full URL
```

### 3. Test Frontend Upload
1. Mở http://localhost:4301/admin/support/new
2. Chọn images/videos
3. Submit ticket
4. Verify files hiển thị đúng trong detail page

---

## 🛠️ Troubleshooting

### Issue 1: Files không hiển thị
**Solution:** Check MinIO bucket policy
```bash
# Set public read access
mc policy set download myminio/uploads
```

### Issue 2: Upload failed
**Solution:** Check MinIO credentials
```bash
# Test connection
mc alias set myminio http://storage.rausachtrangia.com:9000 admin password
mc ls myminio/uploads
```

### Issue 3: CORS errors
**Solution:** Configure MinIO CORS
```bash
mc admin config set myminio api cors_allow_origin="*"
mc admin service restart myminio
```

---

## 🚀 Production Deployment

### 1. MinIO Setup
```bash
# Install MinIO
wget https://dl.min.io/server/minio/release/linux-amd64/minio
chmod +x minio
./minio server /data --console-address ":9001"
```

### 2. Configure Bucket
```bash
# Create bucket
mc mb myminio/uploads

# Set public policy
mc policy set download myminio/uploads

# Enable versioning
mc version enable myminio/uploads
```

### 3. Update Environment
```bash
# Backend .env
MINIO_ENDPOINT=storage.rausachtrangia.com
MINIO_PORT=9000
MINIO_USE_SSL=true
MINIO_ROOT_USER=your_admin_user
MINIO_ROOT_PASSWORD=your_secure_password
MINIO_BUCKET=uploads
MINIO_PUBLIC_URL=https://media.rausachtrangia.com
```

---

## 📊 Benefits Summary

### Performance
- ✅ Faster file serving via CDN
- ✅ Reduced backend load
- ✅ Parallel downloads

### Scalability  
- ✅ Unlimited storage (add more disks)
- ✅ Multi-node clustering
- ✅ Geographic distribution

### Management
- ✅ Central file management
- ✅ Easy backup & restore
- ✅ Access control policies
- ✅ Usage analytics

### Developer Experience
- ✅ Consistent API
- ✅ S3-compatible
- ✅ Easy integration
- ✅ Good documentation

---

## ✅ Completion Checklist

- [x] Update support-upload.controller.ts to use MinioService
- [x] Update support.module.ts to import MinioService
- [x] Update support-detail.component.ts to use GetImage
- [x] Remove Multer disk storage dependency
- [x] Test file upload flow
- [x] Test file display in frontend
- [x] Document changes
- [x] Update environment configuration

---

## 🎯 Next Steps (Optional)

### Phase 1: Enhanced Features
- [ ] Add file compression before upload
- [ ] Generate thumbnails for images
- [ ] Add file download analytics
- [ ] Implement file expiration

### Phase 2: Advanced Features
- [ ] Direct browser upload to MinIO (presigned URLs)
- [ ] Background file processing (resize, watermark)
- [ ] File virus scanning
- [ ] CDN cache invalidation

### Phase 3: Admin Features
- [ ] File manager dashboard
- [ ] Storage usage reports
- [ ] Cleanup old/unused files
- [ ] Bulk file operations

---

## 📞 Support

**Documentation:**
- MinIO Service: `/api/src/minio/minio.service.ts`
- Upload Controller: `/api/src/support/support-upload.controller.ts`
- GetImage Utility: `/frontend/src/app/shared/utils/shared.utils.ts`

**MinIO Console:** https://storage.rausachtrangia.com:9001  
**API Endpoint:** http://localhost:3331/support/upload

---

**Status:** ✅ **HOÀN THÀNH - PRODUCTION READY**  
**Updated:** October 2, 2025  
**Migration:** Local Storage → MinIO Object Storage
