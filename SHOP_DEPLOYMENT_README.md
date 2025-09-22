# 🏪 Shop Deployment Guide

## 📋 Tổng quan

Dự án bao gồm 2 ứng dụng chính:
- **beshop**: Backend API (NestJS + TypeORM + MySQL)
- **feshop**: Frontend (Angular SSR)

## 🚀 Deployment

### 1. Deploy toàn bộ hệ thống
```bash
./run.sh
# Chọn: deploy.sh
```

### 2. Deploy chỉ shop services
```bash
./scripts/deploy-shop.sh
```

### 3. Kiểm tra tình trạng services
```bash
./scripts/status-check-shop.sh
```

## 🌐 Access URLs

| Service | URL | Description |
|---------|-----|-------------|
| Backend API | http://localhost:3500 | REST API + GraphQL |
| Frontend | http://localhost:4500 | Angular SSR App |
| API Docs | http://localhost:3500/ui | Swagger UI |
| phpMyAdmin | http://localhost:8080 | MySQL Management |
| MinIO Console | http://localhost:9093 | File Storage |

## 🗄️ Database Configuration

### Environment Variables
- `DB_HOST`: mysql (Docker) / 103.221.222.71 (External)
- `DB_PORT`: 3306
- `DB_USERNAME`: tazaspac_chikiet
- `DB_PASSWORD`: @Hikiet88
- `DB_DATABASE`: tazaspac_chikiet

### phpMyAdmin Access
- URL: http://localhost:8080
- Username: `tazaspac_chikiet`
- Password: `@Hikiet88`

## 📊 Docker Services

```bash
# Xem tình trạng containers
docker compose ps

# Xem logs
docker compose logs -f backend-shop frontend-shop

# Restart services
docker compose restart backend-shop frontend-shop

# Stop services
docker compose down

# Build lại từ đầu
docker compose build --no-cache backend-shop frontend-shop
```

## 🔧 Development

### Backend (beshop)
```bash
cd beshop
npm install
npm run dev  # Chạy development server
npm run build  # Build production
```

### Frontend (feshop)
```bash
cd feshop
npm install
npm start  # Chạy development server (port 6300)
npm run build  # Build production
```

## 🐳 Docker Configuration

### Backend Dockerfile Features
- Multi-stage build để tối ưu kích thước
- Non-root user để bảo mật
- Health check tự động
- Volume mount cho uploads

### Frontend Dockerfile Features
- Angular SSR build
- Production optimization
- Health check
- Port 4000 internal

## 🔍 Troubleshooting

### Kiểm tra logs
```bash
# Backend logs
docker compose logs backend-shop

# Frontend logs
docker compose logs frontend-shop

# MySQL logs
docker compose logs mysql
```

### Kiểm tra kết nối
```bash
# Test backend API
curl http://localhost:3500

# Test frontend
curl http://localhost:4500

# Test MySQL connection
mysql -h localhost -P 3306 -u tazaspac_chikiet -p
```

### Reset database
```bash
docker compose down
docker volume rm rausachsite_mysql_data
docker compose up -d mysql
```

## 🔐 Security Notes

- Containers chạy với non-root user
- Database password được encrypt
- CORS được cấu hình cho development
- Production build loại bỏ dev dependencies

## 📈 Performance

- Multi-stage Docker builds
- .dockerignore để loại bỏ files không cần thiết  
- Volume caching cho node_modules
- Health checks để đảm bảo service sẵn sàng