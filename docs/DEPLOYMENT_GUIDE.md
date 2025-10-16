# 🚀 Hướng Dẫn Deployment - Price History System

**Ngày**: 16/10/2025  
**Ước tính thời gian**: 4-6 giờ  
**Prerequisite**: Phase 1 & 2 đã hoàn thành

---

## 📋 PRE-DEPLOYMENT CHECKLIST

### 1. Code Quality Verification (15 phút)

```bash
# Check TypeScript errors
cd /chikiet/kataoffical/rausachfinal/api
npm run build

cd /chikiet/kataoffical/rausachfinal/frontend  
npm run build

# Should have ZERO errors
```

### 2. Environment Configuration (30 phút)

#### Backend `.env` Review
```bash
cd /chikiet/kataoffical/rausachfinal/api
cat .env
```

**Verify these variables**:
```env
DATABASE_URL="postgresql://..."
JWT_SECRET="your-secret-key"
NODE_ENV="production"
PORT=3000
CORS_ORIGIN="https://rausachtrangia.com"
```

#### Frontend Environment
```typescript
// frontend/src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://api.rausachtrangia.com',
  graphqlUrl: 'https://api.rausachtrangia.com/graphql'
};
```

### 3. Database Verification (10 phút)

```bash
cd /chikiet/kataoffical/rausachfinal/api

# Verify schema
bunx prisma db pull

# Generate Prisma Client
bunx prisma generate

# Verify AuditLog table exists
bunx prisma studio
# Check: AuditLog table có sẵn
```

### 4. Security Audit (15 phút)

```bash
# Backend
cd api
npm audit fix

# Frontend  
cd frontend
npm audit fix

# Review critical vulnerabilities
npm audit
```

---

## 🔧 DEPLOYMENT STEPS

### STEP 1: Backend API Deployment (1.5 giờ)

#### 1.1. Build Production Bundle (10 phút)

```bash
cd /chikiet/kataoffical/rausachfinal/api

# Clean previous builds
rm -rf dist

# Build
npm run build

# Verify build success
ls dist/
# Should see: main.js, src/, prisma/, etc.
```

#### 1.2. Install Production Dependencies (5 phút)

```bash
# Production dependencies only
npm ci --production

# Verify node_modules size reduced
du -sh node_modules/
```

#### 1.3. Setup PM2 (15 phút)

```bash
# Install PM2 globally (if not installed)
npm install -g pm2

# Create PM2 ecosystem config
cat > ecosystem.config.js <<EOF
module.exports = {
  apps: [{
    name: 'rausach-api',
    script: 'dist/main.js',
    instances: 2,
    exec_mode: 'cluster',
    watch: false,
    max_memory_restart: '500M',
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: 'logs/error.log',
    out_file: 'logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    autorestart: true,
    max_restarts: 10,
    min_uptime: '10s'
  }]
};
EOF

# Start API
pm2 start ecosystem.config.js --env production

# Save PM2 config
pm2 save

# Setup PM2 startup
pm2 startup
# Chạy command được suggest
```

#### 1.4. Verify API Running (10 phút)

```bash
# Check PM2 status
pm2 status

# Check logs
pm2 logs rausach-api --lines 50

# Test API health
curl http://localhost:3000/health
# Should return: {"status":"ok"}

# Test price history endpoint
curl http://localhost:3000/banggia/price-history
```

#### 1.5. Setup Nginx Reverse Proxy (30 phút)

```bash
# Install Nginx (if needed)
sudo apt update
sudo apt install nginx

# Create Nginx config
sudo nano /etc/nginx/sites-available/rausach-api
```

**Nginx Configuration**:
```nginx
server {
    listen 80;
    server_name api.rausachtrangia.com;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name api.rausachtrangia.com;

    # SSL Certificates (Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/api.rausachtrangia.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.rausachtrangia.com/privkey.pem;

    # SSL Settings
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # CORS headers
    add_header Access-Control-Allow-Origin "https://rausachtrangia.com" always;
    add_header Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS" always;
    add_header Access-Control-Allow-Headers "Content-Type, Authorization" always;

    # Proxy to Node.js
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Health check
    location /health {
        access_log off;
        proxy_pass http://localhost:3000/health;
    }

    # Logging
    access_log /var/log/nginx/rausach-api-access.log;
    error_log /var/log/nginx/rausach-api-error.log;
}
```

**Enable site and restart Nginx**:
```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/rausach-api /etc/nginx/sites-enabled/

# Test config
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx

# Verify Nginx status
sudo systemctl status nginx
```

#### 1.6. Setup SSL with Let's Encrypt (20 phút)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d api.rausachtrangia.com

# Verify auto-renewal
sudo certbot renew --dry-run

# Schedule auto-renewal
sudo crontab -e
# Add: 0 3 * * * certbot renew --quiet
```

#### 1.7. API Smoke Testing (10 phút)

```bash
# Test from external
curl https://api.rausachtrangia.com/health

# Test GraphQL
curl -X POST https://api.rausachtrangia.com/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ __typename }"}'

# Test price history endpoint
curl https://api.rausachtrangia.com/banggia/price-history
```

---

### STEP 2: Frontend Deployment (1 giờ)

#### 2.1. Build Production (15 phút)

```bash
cd /chikiet/kataoffical/rausachfinal/frontend

# Update environment
nano src/environments/environment.prod.ts
# Verify apiUrl points to production

# Build
npm run build -- --configuration production --optimization=true

# Verify build
ls dist/
# Should see: index.html, main.*.js, styles.*.css, etc.

# Check build size
du -sh dist/
```

#### 2.2. Deploy Static Files (15 phút)

```bash
# Create web root directory
sudo mkdir -p /var/www/rausachtrangia

# Copy build files
sudo cp -r dist/* /var/www/rausachtrangia/

# Set permissions
sudo chown -R www-data:www-data /var/www/rausachtrangia
sudo chmod -R 755 /var/www/rausachtrangia
```

#### 2.3. Configure Nginx for Frontend (20 phút)

```bash
sudo nano /etc/nginx/sites-available/rausach-frontend
```

**Nginx Configuration**:
```nginx
server {
    listen 80;
    server_name rausachtrangia.com www.rausachtrangia.com;
    return 301 https://rausachtrangia.com$request_uri;
}

server {
    listen 443 ssl http2;
    server_name www.rausachtrangia.com;
    return 301 https://rausachtrangia.com$request_uri;
}

server {
    listen 443 ssl http2;
    server_name rausachtrangia.com;

    # SSL Certificates
    ssl_certificate /etc/letsencrypt/live/rausachtrangia.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/rausachtrangia.com/privkey.pem;

    # SSL Settings
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Root directory
    root /var/www/rausachtrangia;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Angular routing - redirect all to index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    # Logging
    access_log /var/log/nginx/rausach-frontend-access.log;
    error_log /var/log/nginx/rausach-frontend-error.log;
}
```

**Enable and restart**:
```bash
sudo ln -s /etc/nginx/sites-available/rausach-frontend /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### 2.4. Get SSL Certificate (10 phút)

```bash
sudo certbot --nginx -d rausachtrangia.com -d www.rausachtrangia.com
```

#### 2.5. Frontend Smoke Testing (5 phút)

```bash
# Test from browser
curl https://rausachtrangia.com
# Should return HTML

# Test specific routes
curl https://rausachtrangia.com/admin/banggia
curl https://rausachtrangia.com/admin/price-analytics
```

---

### STEP 3: Integration Testing (45 phút)

#### 3.1. Manual UI Testing (30 phút)

**Test Checklist**:
```
Login & Authentication
[ ] Login successful
[ ] JWT token stored
[ ] Protected routes work

Price History Features
[ ] Open price history dialog from banggia detail
[ ] Dialog displays correctly
[ ] Timeline shows data
[ ] Loading states work
[ ] Error handling works

Bulk Price Update
[ ] Navigate to /admin/bulk-price-update
[ ] Select banggia (dropdown loads real data)
[ ] Download template works
[ ] Upload Excel works
[ ] Preview shows correctly
[ ] Save price updates works

Price Analytics
[ ] Navigate to /admin/price-analytics
[ ] Dashboard loads data
[ ] Filters work (date range, banggia)
[ ] Export Excel works
[ ] Export PDF works

Price Comparison
[ ] Navigate to /admin/price-comparison
[ ] Select multiple banggia
[ ] Select products
[ ] Table displays comparison
[ ] Export works

Price Verification
[ ] Open donhang detail
[ ] Price verification component shows
[ ] Click "Kiểm tra giá"
[ ] Discrepancies display correctly
[ ] Severity colors correct
```

#### 3.2. API Testing (15 phút)

```bash
# Test price history API
curl -X GET "https://api.rausachtrangia.com/banggia/BANGGIA_ID/sanpham/SANPHAM_ID/price-history" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Test verify prices
curl -X GET "https://api.rausachtrangia.com/donhang/verify-prices/DONHANG_ID" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Test bulk update
curl -X POST "https://api.rausachtrangia.com/banggia/bulk-update-prices" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "updates": [
      {"banggiaId": "...", "sanphamId": "...", "newPrice": 10000}
    ],
    "userId": "..."
  }'
```

---

### STEP 4: Monitoring Setup (1 giờ)

#### 4.1. PM2 Monitoring (10 phút)

```bash
# Install PM2 monitoring
pm2 install pm2-logrotate

# Configure log rotation
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 30
pm2 set pm2-logrotate:compress true

# View monitoring dashboard
pm2 monit
```

#### 4.2. Nginx Log Monitoring (10 phút)

```bash
# Install log analyzer
sudo apt install goaccess

# Analyze access logs in real-time
sudo goaccess /var/log/nginx/rausach-frontend-access.log -o report.html --log-format=COMBINED --real-time-html

# View in browser
# http://your-server-ip/report.html
```

#### 4.3. Database Monitoring (15 phút)

```sql
-- Check AuditLog growth
SELECT 
  DATE(created_at) as date,
  COUNT(*) as audit_entries
FROM "AuditLog"
WHERE "entityName" = 'Banggiasanpham'
GROUP BY DATE(created_at)
ORDER BY date DESC
LIMIT 30;

-- Check table sizes
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- Active connections
SELECT count(*) FROM pg_stat_activity;
```

#### 4.4. Error Tracking (Optional - 25 phút)

```bash
# Install Sentry (optional)
npm install @sentry/node @sentry/angular

# Configure backend
# api/src/main.ts
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: 'YOUR_SENTRY_DSN',
  environment: 'production'
});

# Configure frontend
# frontend/src/main.ts
import * as Sentry from '@sentry/angular';

Sentry.init({
  dsn: 'YOUR_SENTRY_DSN',
  environment: 'production'
});
```

---

## 📊 POST-DEPLOYMENT VERIFICATION

### Day 1: Intensive Monitoring (6 giờ)

**Every 30 minutes**:
```bash
# Check PM2 status
pm2 status

# Check error logs
pm2 logs rausach-api --lines 100 | grep ERROR

# Check Nginx error logs
sudo tail -100 /var/log/nginx/rausach-api-error.log
sudo tail -100 /var/log/nginx/rausach-frontend-error.log

# Check database connections
psql -U postgres -d rausach -c "SELECT count(*) FROM pg_stat_activity;"

# Check system resources
htop
df -h
free -m
```

**Metrics to track**:
- [ ] API response time < 200ms
- [ ] Zero 500 errors
- [ ] Database connection pool healthy
- [ ] Memory usage stable
- [ ] CPU usage < 70%

### Week 1: Daily Checks

```bash
# Daily health check script
cat > daily_check.sh <<'EOF'
#!/bin/bash
echo "=== Daily Health Check $(date) ==="

# API status
echo "API Status:"
pm2 status | grep rausach-api

# Error count
echo "Error count (last 24h):"
pm2 logs rausach-api --lines 10000 | grep ERROR | wc -l

# Database size
echo "Database size:"
psql -U postgres -d rausach -c "SELECT pg_size_pretty(pg_database_size('rausach'));"

# Disk space
echo "Disk space:"
df -h | grep -E '^/dev/'

# Memory
echo "Memory usage:"
free -h

echo "=== Check complete ==="
EOF

chmod +x daily_check.sh

# Schedule daily check
crontab -e
# Add: 0 9 * * * /path/to/daily_check.sh >> /var/log/daily_check.log
```

---

## 🆘 ROLLBACK PLAN

### If Critical Issues Found

#### 1. Stop New Deployments
```bash
# Stop PM2 app
pm2 stop rausach-api

# Restore previous frontend
sudo rm -rf /var/www/rausachtrangia/*
sudo cp -r /var/www/rausachtrangia.backup/* /var/www/rausachtrangia/
```

#### 2. Revert Code
```bash
cd /chikiet/kataoffical/rausachfinal
git log --oneline -10
git revert <commit-hash>
git push
```

#### 3. Database (No rollback needed - zero schema changes)
```bash
# Nothing to rollback - using existing AuditLog table
# All new data is additive, doesn't break old system
```

#### 4. Restart Old Version
```bash
cd api
git checkout <previous-stable-commit>
npm install
npm run build
pm2 restart rausach-api
```

---

## 📝 DEPLOYMENT CHECKLIST SUMMARY

### Pre-Deployment
- [x] Code reviewed
- [x] Zero compilation errors
- [ ] Tests passing (if written)
- [ ] Environment variables set
- [ ] Database schema verified
- [ ] Security audit passed

### Deployment
- [ ] Backend built successfully
- [ ] PM2 started and running
- [ ] Nginx configured correctly
- [ ] SSL certificates installed
- [ ] Frontend built and deployed
- [ ] Static files served correctly

### Post-Deployment
- [ ] API health check passes
- [ ] Frontend loads in browser
- [ ] Login works
- [ ] Price history features work
- [ ] No console errors
- [ ] Monitoring setup complete

### Documentation
- [x] User guide available
- [x] Technical docs complete
- [ ] Team trained on new features
- [ ] Support process defined

---

## 🎯 SUCCESS CRITERIA

Deployment được coi là thành công khi:

1. ✅ API trả về status 200 cho `/health`
2. ✅ Frontend load không có errors
3. ✅ Users có thể login
4. ✅ Price history dialog mở được
5. ✅ Bulk price update works
6. ✅ Price analytics displays data
7. ✅ Price verification works
8. ✅ Zero 500 errors trong 24h đầu
9. ✅ Response time < 500ms
10. ✅ Uptime > 99.9%

---

## 📞 SUPPORT CONTACTS

### Technical Issues
- **DevOps**: [email/phone]
- **Database**: [email/phone]
- **Frontend**: [email/phone]

### Escalation Path
1. Check logs first
2. Review documentation
3. Contact dev team
4. Emergency rollback if critical

---

**Prepared by**: AI Assistant  
**Last Updated**: 16/10/2025  
**Version**: 1.0  
**Estimated Deployment Time**: 4-6 hours
