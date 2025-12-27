# 📊 ĐÁNH GIÁ SERVER 116.118.49.243 - TRIỂN KHAI LOGGING STACK

**Ngày:** 27/12/2025  
**Server:** 116.118.49.243 (rausachtrangia.com)  
**Mục đích:** Đánh giá khả năng triển khai ClickHouse + Vector + Grafana logging stack

---

## ✅ TÓM TẮT: KHẢ THI VỚI LƯU Ý

| Tiêu chí | Yêu cầu | Thực tế | Đánh giá |
|----------|---------|---------|----------|
| **RAM Total** | ≥ 6GB | 9.7GB | ✅ ĐỦ |
| **RAM Available** | ≥ 2GB | 2.8GB | ✅ ĐỦ (tight) |
| **RAM Used** | < 70% | 65% (6.3GB/9.7GB) | ⚠️ CAO |
| **Disk Total** | ≥ 30GB | 80GB | ✅ ĐỦ |
| **Disk Available** | ≥ 15GB | 14GB | ⚠️ TIGHT |
| **Disk Used** | < 80% | 82% (62GB/80GB) | ⚠️ CAO |
| **CPU** | ≥ 2 cores | 4 cores AMD EPYC | ✅ TốT |
| **Docker** | Installed | v28.3.3 | ✅ OK |
| **Ports** | 58123, 58686, 58300 | Available | ✅ FREE |

---

## 📋 CHI TIẾT PHÂN TÍCH

### 1. Tài nguyên RAM

```
Total:     9.7GB
Used:      6.3GB (65%)
Free:      431MB
Available: 2.8GB
Buffer:    3.0GB
```

#### Phân tích:
- ✅ **Total RAM đủ** cho logging stack (cần ~2GB)
- ⚠️ **RAM available khá tight** (2.8GB)
- ⚠️ **Free RAM rất thấp** (431MB)
- ✅ **Buffer/cache cao** (3GB) - có thể giải phóng khi cần

#### Top memory consumers:
```
kataoffical-backend:  783MB
rausach-backend:      733MB
shopbackend:          529MB
timona-backend:       486MB
tazagroup-backend:    457MB
kataoffical-frontend: 208MB
shopfrontend:         163MB
timona-frontend:      122MB
tazagroup-worker:     118MB
shared-minio:         107MB
```

**Tổng containers đang dùng:** ~4.7GB

#### Dự kiến khi thêm logging stack:
```
Hiện tại:           6.3GB
+ ClickHouse:       1.2GB (limit 1.5GB)
+ Vector:           300MB (limit 512MB)
+ Grafana:          300MB (limit 512MB)
─────────────────────────
Tổng dự kiến:       8.1GB / 9.7GB (83%)
RAM còn lại:        1.6GB available
```

**Kết luận:** ⚠️ **TIGHT nhưng KHẢ THI**
- Cần monitor chặt chẽ
- Xem xét giảm memory cho một số containers không quan trọng
- Thiết lập swap nếu chưa có (hiện tại swap = 0)

---

### 2. Tài nguyên Disk

```
Total:  80GB
Used:   62GB (82%)
Avail:  14GB
```

#### Breakdown:
```
/var/lib/docker:  51GB (Docker images + containers)
/opt/rausachv3:   533MB
/opt/shoprausach: 640MB
/opt/tazacore:    915MB
/opt/taza_prod:   156MB
/opt/kataoffical: 205MB
```

#### Dự kiến khi thêm logging stack:
```
Hiện tại:              62GB
+ ClickHouse data:     ~2-5GB (tùy log volume)
+ Docker images:       ~1GB (3 images)
+ Grafana data:        ~100MB
+ Configs:             ~10MB
─────────────────────────────
Tổng dự kiến:          65-68GB / 80GB (81-85%)
Disk còn lại:          12-15GB
```

**Kết luận:** ⚠️ **TIGHT - CẦN CLEANUP**

**Khuyến nghị:**
```bash
# 1. Clean Docker unused data
docker system prune -af --volumes
# Có thể giải phóng 5-10GB

# 2. Clean old logs
find /var/log -name "*.log" -mtime +30 -delete
journalctl --vacuum-time=7d

# 3. Thiết lập aggressive TTL cho ClickHouse
# 30 ngày thay vì 60 ngày
```

---

### 3. CPU & Load Average

```
CPU:    4 cores AMD EPYC 7763
Load:   1.13, 0.86, 0.68 (1min, 5min, 15min)
```

#### Phân tích:
- ✅ **CPU đủ mạnh** cho logging stack
- ✅ **Load average OK** (~28% average load)
- ✅ **Có dư để xử lý log ingestion**

#### Dự kiến load khi thêm logging:
```
Current avg:       0.86 (21% của 4 cores)
+ ClickHouse:      0.3-0.5 core (idle-moderate)
+ Vector:          0.1-0.2 core
+ Grafana:         0.05-0.1 core
─────────────────────────────
Total:             ~1.3-1.7 / 4 cores (32-42%)
```

**Kết luận:** ✅ **TỐT** - CPU không phải vấn đề

---

### 4. Containers hiện tại

**Tổng:** 34 containers đang chạy

**Vấn đề:**
- ⚠️ `rausachv3-api` - **Restarting** (lỗi)
- ⚠️ `timonaaffiliate-backend` - **Restarting** (lỗi)
- ⚠️ Nhiều containers **unhealthy**:
  - tazagroup-frontend
  - tazagroup-backend
  - kataoffical-backend
  - kataoffical-frontend
  - shopfrontend
  - shopbackend
  - timona-frontend
  - timona-backend

**Khuyến nghị:**
1. Fix `rausachv3-api` trước khi deploy logging
2. Investigate unhealthy containers - có thể stop các containers không dùng để giải phóng RAM

---

### 5. Network & Ports

```
Total listening ports: 71
Ports cần dùng: 58123 (ClickHouse), 58686 (Vector), 58300 (Grafana)
Status: ✅ ALL AVAILABLE
```

**Firewall:** Cần mở 3 ports
```bash
ufw allow 58123/tcp
ufw allow 58686/tcp  
ufw allow 58300/tcp
```

---

## 🎯 KHUYẾN NGHỊ TRIỂN KHAI

### ✅ Option 1: DEPLOY NGAY VỚI OPTIMIZATION (KHUYẾN NGHỊ)

**Bước chuẩn bị:**

```bash
# 1. Cleanup disk (giải phóng 5-10GB)
docker system prune -af --volumes
journalctl --vacuum-time=7d

# 2. Setup swap 4GB (backup cho RAM)
fallocate -l 4G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab

# 3. Stop containers không dùng (nếu có)
# docker stop <container_name>

# 4. Fix rausachv3-api trước
docker logs rausachv3-api --tail 50
# Fix lỗi rồi mới tiếp tục
```

**Config tối ưu cho server này:**

```yaml
# docker-compose.logging.yml - OPTIMIZED
clickhouse:
  mem_limit: 1.2g          # Giảm từ 1.5g
  mem_reservation: 512m
  cpus: 1.0

vector:
  mem_limit: 384m          # Giảm từ 512m
  cpus: 0.3

grafana:
  mem_limit: 384m          # Giảm từ 512m
  cpus: 0.3
```

**ClickHouse TTL aggressive:**
```sql
-- 30 ngày thay vì 60
TTL date + INTERVAL 30 DAY DELETE
```

**Vector sampling aggressive:**
```toml
# Chỉ giữ 5% performance logs (thay vì 10%)
random_float(0.0, 1.0) < 0.05
```

**Expected footprint:**
- RAM: +1.8GB (total 8.1GB / 9.7GB = 83%)
- Disk: +3GB (total 65GB / 80GB = 81%)
- CPU: +0.5 core avg

---

### ⚠️ Option 2: DEPLOY SAU KHI CLEANUP & UPGRADE

**Nếu lo ngại về tài nguyên:**

1. **Cleanup triệt để:**
   - Stop/remove các project không dùng
   - Mục tiêu: Giải phóng 2-3GB RAM, 10GB disk

2. **Hoặc upgrade server:**
   - RAM: 10GB → 16GB
   - Disk: 80GB → 120GB
   - Chi phí: ~$5-10/tháng thêm

3. **Sau đó deploy logging stack**

---

### 🚫 Option 3: VPS RIÊNG (Backup plan)

Nếu server quá tải:
- VPS Contabo: 8GB RAM, 200GB SSD = €4.99/tháng
- Deploy logging stack riêng
- Network latency: +2-5ms

---

## 📊 RISK ASSESSMENT

| Rủi ro | Mức độ | Giải pháp |
|---------|--------|-----------|
| **RAM hết** | ⚠️ MEDIUM | - Setup swap 4GB<br>- Monitor với alerts<br>- Giảm memory limits |
| **Disk đầy** | ⚠️ MEDIUM | - Cleanup trước khi deploy<br>- TTL 30 ngày<br>- Auto cleanup cron |
| **Performance giảm** | 🟢 LOW | - CPU đủ mạnh<br>- Logging async không block |
| **Containers bị OOM** | ⚠️ MEDIUM | - Memory limits strict<br>- Swap backup |
| **Network bottleneck** | 🟢 LOW | - Bandwidth đủ<br>- Compression enabled |

---

## ✅ CHECKLIST TRIỂN KHAI AN TOÀN

### Phase 1: Chuẩn bị (30 phút)
- [ ] Backup dữ liệu quan trọng
- [ ] Fix lỗi `rausachv3-api`
- [ ] Cleanup disk: `docker system prune -af`
- [ ] Setup swap 4GB
- [ ] Test RAM available: `free -h`
- [ ] Test disk available: `df -h`

### Phase 2: Deploy logging stack (15 phút)
- [ ] Tạo `/root/logging-stack/`
- [ ] Copy docker-compose.logging.yml (OPTIMIZED version)
- [ ] Copy configs (ClickHouse, Vector)
- [ ] Start services: `docker-compose up -d`
- [ ] Wait 30s for ClickHouse
- [ ] Create schema
- [ ] Test endpoints

### Phase 3: Testing (10 phút)
- [ ] Send test logs to Vector
- [ ] Verify ClickHouse receiving data
- [ ] Access Grafana
- [ ] Check container memory: `docker stats`
- [ ] Check disk usage: `df -h`

### Phase 4: Monitoring (1 tuần)
- [ ] Daily check: `/root/logging-stack/monitor.sh`
- [ ] Watch RAM usage trend
- [ ] Watch disk usage trend
- [ ] Điều chỉnh TTL nếu cần
- [ ] Điều chỉnh sampling nếu cần

---

## 📈 MONITORING ALERTS

Setup alerts cho:

```bash
# 1. RAM usage > 90%
if [ $(free | grep Mem | awk '{print ($3/$2) * 100}' | cut -d. -f1) -gt 90 ]; then
  echo "WARNING: RAM usage > 90%"
fi

# 2. Disk usage > 85%
if [ $(df / | tail -1 | awk '{print $5}' | sed 's/%//') -gt 85 ]; then
  echo "WARNING: Disk usage > 85%"
fi

# 3. ClickHouse container restarting
if [ $(docker inspect -f '{{.RestartCount}}' logging-clickhouse) -gt 3 ]; then
  echo "WARNING: ClickHouse unstable"
fi
```

---

## 🎯 KẾT LUẬN CUỐI CÙNG

### ✅ **TRIỂN KHAI ĐƯỢC** với điều kiện:

1. **Cleanup disk trước** (giải phóng 5-10GB)
2. **Setup swap** (4GB backup RAM)
3. **Sử dụng config OPTIMIZED** (memory limits thấp hơn)
4. **TTL aggressive** (30 ngày)
5. **Sampling aggressive** (5% performance logs)
6. **Monitor chặt chẽ** tuần đầu

### 📊 Expected metrics sau khi deploy:

```
RAM:  8.1GB / 9.7GB (83%) - ⚠️ Acceptable với swap
Disk: 65GB / 80GB (81%)   - ⚠️ Cần monitor
CPU:  1.5 / 4 cores (37%) - ✅ Good
```

### 🚀 Bước tiếp theo:

**Option A: Deploy ngay (30 phút)**
```bash
# Run cleanup & setup script
wget https://gist.github.com/... /deploy-logging-optimized.sh
chmod +x deploy-logging-optimized.sh
./deploy-logging-optimized.sh
```

**Option B: Manual careful deployment**
1. Review [DEPLOY_LOGGING_EXISTING_SERVER.md](DEPLOY_LOGGING_EXISTING_SERVER.md)
2. Run cleanup commands
3. Deploy từng bước
4. Test từng giai đoạn

---

## 📞 SUPPORT

Nếu gặp vấn đề:
1. Check logs: `docker logs <container>`
2. Check resources: `/root/logging-stack/monitor.sh`
3. Rollback: `docker-compose -f docker-compose.logging.yml down`
4. Refer to troubleshooting guide

---

**Prepared by:** GitHub Copilot  
**Date:** 27/12/2025  
**Status:** ✅ READY TO DEPLOY (with optimizations)
