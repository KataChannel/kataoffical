# Rausach V3 - Deployment Guide

## Overview
Deployment configuration for Rausach V3 with the following specifications:
- **Frontend Port**: 12100
- **Backend Port**: 12101
- **Database**: rausachv3 on 116.118.49.243:55432
- **Deployment Path**: /opt/rausachv3

## Quick Start

### 1. Build and Deploy (All-in-one)
```bash
./deploy-v3.sh all
```

This will:
1. Build API Docker image
2. Build Frontend Docker image
3. Save images to tar.gz files
4. Upload to server
5. Deploy on server

### 2. Step-by-Step Deployment

#### Build Images Only
```bash
./deploy-v3.sh build
```

#### Build API Only
```bash
./deploy-v3.sh api
```

#### Build Frontend Only
```bash
./deploy-v3.sh frontend
```

#### Upload to Server
```bash
./deploy-v3.sh upload
```

#### Deploy on Server
```bash
./deploy-v3.sh deploy
```

## Prerequisites

### Local Machine
- Docker installed
- Bun installed (for API)
- Node.js 18+ (for Frontend)
- SSH access to server (116.118.49.243)

### Server Requirements
- Docker and Docker Compose installed
- SSH access enabled
- Directory `/opt/rausachv3` with write permissions

## Architecture

### Docker Images
- **Backend**: `rausach-backend:latest`
  - Built from `./api/Dockerfile`
  - Uses Bun runtime
  - Multi-stage build for optimization
  
- **Frontend**: `rausach-frontend:latest`
  - Built from `./frontend/Dockerfile`
  - Angular SSR
  - Node.js 18 Alpine

### Services
```
┌─────────────────────────────────────────┐
│          Rausach V3 System              │
├─────────────────────────────────────────┤
│                                         │
│  ┌──────────────┐  ┌─────────────────┐ │
│  │  Frontend    │  │   Backend       │ │
│  │  Port: 12100 │  │   Port: 12101   │ │
│  │  Angular SSR │  │   NestJS + Bun  │ │
│  └──────────────┘  └─────────────────┘ │
│         │                  │            │
│         └──────────┬───────┘            │
│                    │                    │
│         ┌──────────▼───────────┐        │
│         │  PostgreSQL DB       │        │
│         │  rausachv3           │        │
│         │  Port: 55432         │        │
│         └──────────────────────┘        │
│                                         │
│  External Services:                     │
│  - Redis: 116.118.49.243:56379         │
│  - MinIO: storage.rausachtrangia.com   │
└─────────────────────────────────────────┘
```

## Environment Variables

### Backend Environment (.env.production)
```env
DATABASE_URL=postgresql://...@116.118.49.243:55432/rausachv3
BASE_URL=https://v3.rausachtrangia.com
SERVER_URL=https://apiv3.rausachtrangia.com
PORT=3331
REDIS_HOST=116.118.49.243
REDIS_PORT=56379
MINIO_ENDPOINT=storage.rausachtrangia.com
```

### Frontend Environment
```env
NODE_ENV=production
```

## Deployment Process

### 1. Local Build
```bash
# API Build
cd api
bun install
bun prisma generate
bun run build
docker build -t rausach-backend:latest .

# Frontend Build
cd frontend
npm install
npm run build:ssr
docker build -t rausach-frontend:latest .
```

### 2. Save Images
```bash
# Save to tar.gz for transfer
docker save rausach-backend:latest | gzip > rausach-backend.tar.gz
docker save rausach-frontend:latest | gzip > rausach-frontend.tar.gz
```

### 3. Upload to Server
```bash
# Create directory
ssh root@116.118.49.243 "mkdir -p /opt/rausachv3/docker-images"

# Upload files
scp docker-compose.v3.yml root@116.118.49.243:/opt/rausachv3/docker-compose.yml
scp rausach-backend.tar.gz root@116.118.49.243:/opt/rausachv3/docker-images/
scp rausach-frontend.tar.gz root@116.118.49.243:/opt/rausachv3/docker-images/
```

### 4. Deploy on Server
```bash
ssh root@116.118.49.243

# Load images
cd /opt/rausachv3
docker load < docker-images/rausach-backend.tar.gz
docker load < docker-images/rausach-frontend.tar.gz

# Stop old containers
docker-compose down

# Start new containers
docker-compose up -d

# Check status
docker-compose ps
```

## Verification

### Check Services
```bash
# On server
docker-compose ps
docker-compose logs -f api
docker-compose logs -f frontend
```

### Test Endpoints
```bash
# Frontend
curl http://116.118.49.243:12100

# Backend
curl http://116.118.49.243:12101/health
```

## URLs

- **Frontend**: http://116.118.49.243:12100
- **Backend API**: http://116.118.49.243:12101
- **Backend Health**: http://116.118.49.243:12101/health

## Troubleshooting

### Check Container Logs
```bash
docker logs rausachv3-api
docker logs rausachv3-frontend
```

### Restart Services
```bash
docker-compose restart api
docker-compose restart frontend
```

### Full Rebuild
```bash
docker-compose down
docker-compose up -d --force-recreate
```

### Database Connection Test
```bash
# From API container
docker exec -it rausachv3-api bun prisma db pull
```

## Maintenance

### Update Backend Only
```bash
./deploy-v3.sh api
./deploy-v3.sh upload
ssh root@116.118.49.243 "cd /opt/rausachv3 && docker load < docker-images/rausach-backend.tar.gz && docker-compose up -d --no-deps api"
```

### Update Frontend Only
```bash
./deploy-v3.sh frontend
./deploy-v3.sh upload
ssh root@116.118.49.243 "cd /opt/rausachv3 && docker load < docker-images/rausach-frontend.tar.gz && docker-compose up -d --no-deps frontend"
```

### View Logs
```bash
ssh root@116.118.49.243 "cd /opt/rausachv3 && docker-compose logs -f"
```

## Backup and Restore

### Database Backup
```bash
# From local
bun run db:backup
```

### Database Restore
```bash
# From local
bun run db:restore
```

## Security Notes

- All sensitive credentials are in `.env` files
- `.env` files are not committed to git
- SSH key-based authentication recommended
- Consider using Docker secrets for production

## Support

For issues or questions, contact the development team.

---

Last updated: December 27, 2025
