# Rausach V3 - Deployment Summary

## ✅ Hoàn thành

Dự án đã được chuẩn bị sẵn sàng cho deployment với cấu hình sau:

### 📋 Thông tin Deployment

| Thành phần | Giá trị |
|------------|---------|
| **Frontend Port** | 12100 |
| **Backend Port** | 12101 |
| **Database** | rausachv3 |
| **Database Host** | 116.118.49.243:55432 |
| **Server Path** | /opt/rausachv3 |
| **Frontend URL** | http://116.118.49.243:12100 |
| **Backend URL** | http://116.118.49.243:12101 |

### 📁 Files đã tạo/cập nhật

1. **docker-compose.v3.yml** - Docker Compose configuration cho V3
2. **deploy-v3.sh** - Script tự động build và deploy
3. **deploy-info.sh** - Quick reference commands
4. **.env.production** - Production environment variables
5. **DEPLOYMENT_V3.md** - Hướng dẫn chi tiết deployment
6. **api/.env** - Đã cập nhật DATABASE_URL sang rausachv3
7. **package.json** - Thêm các npm scripts cho deployment V3

### 🚀 Cách sử dụng nhanh

#### Option 1: Deploy toàn bộ (Recommended)
```bash
./deploy-v3.sh all
```

#### Option 2: Từng bước
```bash
# 1. Build images
./deploy-v3.sh build

# 2. Upload lên server
./deploy-v3.sh upload

# 3. Deploy trên server
./deploy-v3.sh deploy
```

#### Option 3: Sử dụng npm scripts
```bash
# Deploy toàn bộ
npm run deploy:v3

# Chỉ build
npm run deploy:v3:build

# Chỉ upload
npm run deploy:v3:upload

# Xem thông tin
npm run deploy:v3:info
```

### 🔧 Cấu trúc Docker

#### Backend (API)
- **Image**: rausach-backend:latest
- **Base**: oven/bun:latest
- **Build**: Multi-stage với builder và production
- **Port**: 3331 (internal) → 12101 (external)
- **Features**:
  - Prisma Client generated
  - Optimized production build
  - Non-root user for security

#### Frontend
- **Image**: rausach-frontend:latest
- **Base**: node:18-alpine
- **Type**: Angular SSR
- **Port**: 4301 (internal) → 12100 (external)
- **Features**:
  - Server-side rendering
  - Production optimized

### 🔐 Environment Variables

#### Backend (.env.production)
```env
DATABASE_URL=postgresql://...@116.118.49.243:55432/rausachv3
BASE_URL=https://v3.rausachtrangia.com
SERVER_URL=https://apiv3.rausachtrangia.com
PORT=3331
REDIS_HOST=116.118.49.243
REDIS_PORT=56379
MINIO_ENDPOINT=storage.rausachtrangia.com
```

### 📊 Deployment Process Flow

```
┌─────────────────────────────────────────────────────────┐
│                   LOCAL MACHINE                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  1. Build API Image                                     │
│     ├─ bun install                                      │
│     ├─ bun prisma generate                              │
│     ├─ bun run build                                    │
│     └─ docker build -t rausach-backend:latest           │
│                                                         │
│  2. Build Frontend Image                                │
│     ├─ npm install                                      │
│     ├─ npm run build:ssr                                │
│     └─ docker build -t rausach-frontend:latest          │
│                                                         │
│  3. Save Images                                         │
│     ├─ docker save backend | gzip > backend.tar.gz      │
│     └─ docker save frontend | gzip > frontend.tar.gz    │
│                                                         │
└─────────────────────────────────────────────────────────┘
                           │
                           │ SCP Upload
                           ▼
┌─────────────────────────────────────────────────────────┐
│              SERVER (116.118.49.243)                    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  /opt/rausachv3/                                        │
│  ├─ docker-compose.yml                                  │
│  └─ docker-images/                                      │
│     ├─ rausach-backend.tar.gz                           │
│     └─ rausach-frontend.tar.gz                          │
│                                                         │
│  4. Load Images                                         │
│     ├─ docker load < backend.tar.gz                     │
│     └─ docker load < frontend.tar.gz                    │
│                                                         │
│  5. Deploy                                              │
│     ├─ docker-compose down                              │
│     └─ docker-compose up -d                             │
│                                                         │
│  Running Containers:                                    │
│  ├─ rausachv3-api (port 12101)                          │
│  └─ rausachv3-frontend (port 12100)                     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### 🎯 Next Steps

1. **Test Local Build** (optional):
   ```bash
   ./deploy-v3.sh build
   ```

2. **Deploy to Server**:
   ```bash
   ./deploy-v3.sh all
   ```

3. **Verify Deployment**:
   ```bash
   # Check frontend
   curl http://116.118.49.243:12100
   
   # Check backend
   curl http://116.118.49.243:12101/health
   
   # View logs
   ssh root@116.118.49.243 "cd /opt/rausachv3 && docker-compose logs -f"
   ```

### 📝 Important Notes

1. **Database**: Đã được cấu hình sẵn để sử dụng `rausachv3` database
2. **Ports**: 
   - Frontend: 12100 (mapped từ internal 4301)
   - Backend: 12101 (mapped từ internal 3331)
3. **Redis & MinIO**: Sử dụng services hiện có trên server
4. **SSL**: Chưa cấu hình, có thể cần reverse proxy (nginx) cho production domains

### 🔍 Monitoring & Logs

```bash
# View all logs
ssh root@116.118.49.243 "cd /opt/rausachv3 && docker-compose logs -f"

# View API logs only
ssh root@116.118.49.243 "docker logs -f rausachv3-api"

# View Frontend logs only
ssh root@116.118.49.243 "docker logs -f rausachv3-frontend"

# Check container status
ssh root@116.118.49.243 "cd /opt/rausachv3 && docker-compose ps"
```

### 🛠️ Troubleshooting

**Issue: Container won't start**
```bash
ssh root@116.118.49.243 "docker logs rausachv3-api"
ssh root@116.118.49.243 "docker logs rausachv3-frontend"
```

**Issue: Database connection failed**
- Verify DATABASE_URL in docker-compose.v3.yml
- Check if database `rausachv3` exists
- Test connection from server

**Issue: Port already in use**
```bash
ssh root@116.118.49.243 "netstat -tulpn | grep -E '12100|12101'"
```

### 📚 Documentation

- **Full Guide**: [DEPLOYMENT_V3.md](./DEPLOYMENT_V3.md)
- **Quick Reference**: Run `./deploy-info.sh`
- **Docker Compose**: [docker-compose.v3.yml](./docker-compose.v3.yml)

---

**Created**: December 27, 2025  
**Status**: ✅ Ready for Deployment  
**Version**: Rausach V3
