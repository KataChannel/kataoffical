# 🚀 HƯỚNG DẪN TRIỂN KHAI NHANH

**Dự án:** Thu Chi & Hóa Đơn Điện Tử  
**Ngày:** 28/12/2025  
**Thời gian ước tính:** 2-3 giờ

---

## 📋 CHECKLIST TRƯỚC KHI BẮT ĐẦU

- [ ] Node.js >= 18.x
- [ ] Bun hoặc npm
- [ ] PostgreSQL running
- [ ] Git repository access
- [ ] Environment files (.env)

---

## 🔧 BƯỚC 1: CÀI ĐẶT & SETUP

### 1.1 Backend Setup

```bash
cd /chikiet/kata2025/rausachfinalv2/api

# Install dependencies
bun install

# Setup environment
cp .env.example .env
# Edit .env với database credentials

# Generate Prisma Client
bunx prisma generate

# Run migrations
bunx prisma migrate deploy

# (Optional) Seed data
bunx prisma db seed
```

### 1.2 Frontend Setup

```bash
cd /chikiet/kata2025/rausachfinalv2/frontend

# Install dependencies
bun install

# Hoặc nếu dùng npm
npm install

# Setup environment
cp src/environments/environment.example.ts src/environments/environment.ts
# Update API URL nếu cần
```

---

## 🏃 BƯỚC 2: CHẠY DEVELOPMENT

### Terminal 1: Backend
```bash
cd api
bun run dev
# hoặc
bun run start:dev

# Server sẽ chạy tại: http://localhost:3000
# GraphQL Playground: http://localhost:3000/graphql
```

### Terminal 2: Frontend
```bash
cd frontend
bun run dev
# hoặc
npm run dev

# App sẽ chạy tại: http://localhost:4301
```

### Terminal 3: Database Studio (Optional)
```bash
cd api
bunx prisma studio

# Prisma Studio: http://localhost:5555
```

---

## 🧪 BƯỚC 3: TESTING

### 3.1 Kiểm tra UI Components

1. Mở browser: `http://localhost:4301`
2. Kiểm tra responsive:
   - Desktop (>= 1024px)
   - Tablet (768px - 1024px)
   - Mobile (320px - 768px)

**Sử dụng Chrome DevTools:**
- F12 → Toggle device toolbar (Ctrl+Shift+M)
- Test các breakpoints

### 3.2 Test Phiếu Thu Chi

```bash
# 1. Truy cập
http://localhost:4301/admin/phieuthuchi

# 2. Tạo phiếu thu mới
- Click "Tạo phiếu mới"
- Điền thông tin
- Chọn loại: THU
- Số tiền: 1,000,000
- Đối tượng: KHACHHANG
- Lưu

# 3. Kiểm tra trên mobile
- Mở Chrome DevTools
- Chọn iPhone 12 Pro
- Verify card layout
```

### 3.3 Test Thanh Toán

```bash
# 1. Truy cập
http://localhost:4301/admin/thanhtoan

# 2. Kiểm tra stats dashboard
- Tổng thanh toán
- Đã thanh toán
- Chờ thanh toán

# 3. Test filters
- Lọc theo loại
- Lọc theo trạng thái
- Tìm kiếm
```

### 3.4 Test Confirmation (2-Way)

```bash
# 1. Tạo token cho đơn hàng
# Backend API call hoặc GraphQL

mutation {
  generateConfirmToken(donhangId: "uuid-here") {
    token
  }
}

# 2. Truy cập public page
http://localhost:4301/confirm/{token}

# 3. Test trên mobile
- Xem thông tin đơn hàng
- Thêm ghi chú
- Xác nhận lần 1
- Xác nhận lần 2

# 4. Verify trong database
SELECT * FROM "Donhang" WHERE "confirmToken" = 'token-here';
```

---

## 📦 BƯỚC 4: BUILD PRODUCTION

### 4.1 Frontend Build

```bash
cd frontend

# Build
ng build --configuration production

# Output: dist/frontend/browser/

# Check bundle size
ls -lh dist/frontend/browser/*.js

# Nên < 2MB total
```

### 4.2 Backend Build

```bash
cd api

# Build
bun run build

# Output: dist/

# Test production build
NODE_ENV=production bun run start:prod
```

---

## 🌐 BƯỚC 5: DEPLOYMENT

### 5.1 Deploy to VPS/Server

```bash
# SSH to server
ssh user@your-server.com

# Clone/Pull code
git pull origin main

# Backend
cd api
bun install --production
bunx prisma migrate deploy
pm2 restart api

# Frontend
cd ../frontend
bun install
ng build --configuration production
# Copy dist/ to nginx/apache
```

### 5.2 Environment Variables

**Backend (.env):**
```bash
DATABASE_URL="postgresql://user:pass@localhost:5432/db"
JWT_SECRET="your-secret-key"
PORT=3000
NODE_ENV=production
CORS_ORIGIN=https://yourdomain.com
```

**Frontend (environment.prod.ts):**
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.yourdomain.com',
  graphqlUrl: 'https://api.yourdomain.com/graphql'
};
```

### 5.3 Nginx Configuration

```nginx
# Frontend
server {
    listen 80;
    server_name yourdomain.com;
    
    root /var/www/frontend/dist/browser;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # API Proxy
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 🔍 BƯỚC 6: VERIFICATION

### 6.1 Health Checks

```bash
# Backend health
curl http://localhost:3000/api/health
# Should return: {"status":"ok"}

# Database connection
curl http://localhost:3000/api/health/db
# Should return: {"status":"ok","database":"connected"}

# Frontend
curl http://localhost:4301
# Should return HTML
```

### 6.2 Functional Tests

**Checklist:**
- [ ] Login works
- [ ] PhieuThuChi list loads
- [ ] PhieuThuChi create works
- [ ] ThanhToan list loads
- [ ] ThanhToan filters work
- [ ] Confirmation page loads with token
- [ ] Confirmation lan 1 works
- [ ] Confirmation lan 2 works
- [ ] Mobile responsive (all pages)
- [ ] Desktop layout correct

### 6.3 Performance Tests

```bash
# Lighthouse (Chrome DevTools)
1. Mở page
2. F12 → Lighthouse
3. Run audit
4. Check scores:
   - Performance > 90
   - Accessibility > 90
   - Best Practices > 90
   - SEO > 90

# Load testing (optional)
npm install -g autocannon
autocannon -c 10 -d 30 http://localhost:3000/api/health
```

---

## 🐛 BƯỚC 7: TROUBLESHOOTING

### Issue: Frontend không kết nối backend

**Solution:**
```typescript
// Check environment.ts
export const environment = {
  apiUrl: 'http://localhost:3000', // Đúng port
};

// Check CORS in backend (main.ts)
app.enableCors({
  origin: 'http://localhost:4301',
  credentials: true
});
```

### Issue: GraphQL errors

**Solution:**
```bash
# Check GraphQL playground
http://localhost:3000/graphql

# Test query
query {
  phieuThuChiList {
    items {
      id
      maPhieu
    }
  }
}

# Check logs
tail -f api/logs/error.log
```

### Issue: Prisma migration fails

**Solution:**
```bash
# Reset database (DEV ONLY!)
bunx prisma migrate reset

# Or manual fix
bunx prisma db push
bunx prisma generate
```

### Issue: Mobile layout broken

**Solution:**
```bash
# Rebuild Tailwind
cd frontend
npm run build:css

# Clear cache
rm -rf .angular/cache
ng serve
```

---

## 📊 MONITORING

### 7.1 Setup PM2 (Production)

```bash
# Install PM2
npm install -g pm2

# Start backend
pm2 start dist/main.js --name api

# Monitor
pm2 monit

# Logs
pm2 logs api

# Startup script
pm2 startup
pm2 save
```

### 7.2 Database Backups

```bash
# Daily backup script
#!/bin/bash
DATE=$(date +%Y%m%d)
pg_dump dbname > backup_$DATE.sql
# Upload to S3/Cloud
```

### 7.3 Error Tracking (Optional)

```bash
# Sentry setup
npm install @sentry/node @sentry/angular

# Configure in main.ts (backend)
# Configure in main.ts (frontend)
```

---

## 🎯 ACCEPTANCE CRITERIA

### Must Have (MVP)
- [x] PhieuThuChi CRUD hoạt động
- [x] ThanhToan list & filters
- [x] Confirmation 2-way works
- [x] Mobile responsive (all pages)
- [x] Desktop layout correct
- [ ] Routes configured
- [ ] Menu updated
- [ ] Production ready

### Nice to Have
- [ ] Email notifications
- [ ] PDF generation
- [ ] WebSocket realtime
- [ ] Dashboard widgets
- [ ] Reports

### Future Enhancements
- [ ] PWA features
- [ ] Offline mode
- [ ] Push notifications
- [ ] Advanced analytics

---

## 📞 SUPPORT

### Development Issues
- Check logs: `tail -f api/logs/*.log`
- Check console: Browser DevTools
- Check network: Network tab

### Production Issues
- PM2 logs: `pm2 logs api`
- Nginx logs: `tail -f /var/log/nginx/error.log`
- Database: `psql -d dbname -c "SELECT ..."` 

### Contact
- Developer: [Your Name]
- Email: [Your Email]
- Docs: /docs/

---

## ✅ DEPLOYMENT CHECKLIST

**Pre-Deployment:**
- [ ] All tests pass
- [ ] Code reviewed
- [ ] Environment variables set
- [ ] Database backed up
- [ ] SSL certificates ready

**Deployment:**
- [ ] Build successful
- [ ] Migrations run
- [ ] Static files deployed
- [ ] Services restarted
- [ ] Health checks pass

**Post-Deployment:**
- [ ] Smoke tests pass
- [ ] Mobile testing
- [ ] Performance check
- [ ] Error monitoring active
- [ ] Stakeholders notified

---

**🎉 Deployment Complete! Enjoy your mobile-first Thu Chi system!**

**Next Steps:**
1. Run UAT with users
2. Collect feedback
3. Iterate & improve
4. Scale as needed

---

**Estimated Time:**
- Setup: 30 min
- Testing: 1 hour
- Build: 30 min
- Deploy: 1 hour
- **Total: 2-3 hours**
