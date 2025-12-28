# 📊 PHÂN TÍCH STORAGE VÀ ĐỒNG BỘ DỮ LIỆU

**Ngày phân tích:** 27/12/2025  
**Môi trường:** Production Server (116.118.49.243)

---

## 🎯 TÓM TẮT NHANH

| Metric | Giá trị | Đánh giá |
|--------|---------|----------|
| Database Source Size | **976 MB** | ⚠️ Trung bình |
| Database Target Size | **880 MB** | ✅ OK |
| Số bảng | **48 bảng** | ✅ OK |
| File dump tạm | **~150-200 MB** | ⚠️ Cần monitor |
| Tần suất đồng bộ | **2 lần/ngày** | ✅ Hợp lý |
| Log files | **~7 KB/lần** | ✅ Rất nhỏ |

**🔴 KẾT LUẬN:** Có vấn đề về dung lượng, cần tối ưu!

---

## 📈 CHI TIẾT PHÂN TÍCH

### 1. **Kích thước Database**

#### Source Database (rausachfinal)
- **Tổng dung lượng:** 976 MB
- **Số bảng:** 48 bảng
- **Tốc độ tăng trưởng:** ~1-2 MB/ngày (ước tính)

#### Target Database (rausachv3)
- **Tổng dung lượng:** 880 MB
- **Chênh lệch:** 96 MB (9.8% nhỏ hơn)

**Nguyên nhân chênh lệch:**
- rausachv3 có thể thiếu 1 bảng (47 vs 48)
- Vacuum/analyze chưa chạy đầy đủ
- Index rebuild khác nhau

---

### 2. **Top 10 Bảng Lớn Nhất**

| Bảng | Kích thước | Số dòng | % Tổng DB | Đánh giá |
|------|------------|---------|-----------|----------|
| **AuditLog** | 420 MB | ~256K | 43% | 🔴 RẤT LỚN |
| **performance_logs** | 248 MB | ~408K | 25% | 🔴 RẤT LỚN |
| **PhieuKhoSanpham** | 118 MB | ~292K | 12% | 🟡 Lớn |
| **Donhangsanpham** | 105 MB | ~314K | 11% | 🟡 Lớn |
| **Banggiasanpham** | 27 MB | ~50K | 3% | ✅ OK |
| **Donhang** | 15 MB | ~20K | 1.5% | ✅ OK |
| **Dathangsanpham** | 13 MB | ~36K | 1.3% | ✅ OK |
| **PhieuKho** | 5.5 MB | ~18K | 0.6% | ✅ OK |
| **Dathang** | 5.4 MB | ~8K | 0.6% | ✅ OK |
| **BanggiasanphamHistory** | 4.9 MB | ~7K | 0.5% | ✅ OK |

**🔴 VẤN ĐỀ NGHIÊM TRỌNG:**
- **2 bảng log** chiếm **68%** tổng database (668 MB)
- Bảng `AuditLog` và `performance_logs` không cần thiết phải đồng bộ mỗi ngày!

---

### 3. **Phân tích Storage Impact - Đồng bộ 2 lần/ngày**

#### 📁 File tạm trong quá trình đồng bộ

```
Database size: 976 MB
→ pg_dump tạo file .sql: ~150-200 MB (compressed text)
→ Thời gian giữ file: ~1-2 phút (rồi xóa)
```

#### 📊 Dung lượng sử dụng theo thời gian

| Thời điểm | Dung lượng | Mô tả |
|-----------|------------|-------|
| **Bình thường** | 0 MB | Không có file tạm |
| **Đang dump** | +200 MB | File .sql trong /tmp |
| **Đang restore** | +200 MB | File .sql + write buffer |
| **Sau đồng bộ** | 0 MB | File đã xóa |

**Peak storage trong 1 lần đồng bộ:** ~200-250 MB (tạm thời)

#### 🗓️ Dung lượng log files

```
1 lần đồng bộ = ~7 KB log
2 lần/ngày × 7 KB = 14 KB/ngày
14 KB × 365 ngày = 5.1 MB/năm

Với retention 7 ngày: ~100 KB tối đa
```

**✅ Log files không phải vấn đề**

---

### 4. **Tính toán Storage theo thời gian**

#### Kịch bản 1: Giữ nguyên như hiện tại
```
Database tăng ~2 MB/ngày (ước tính)

Sau 1 năm:
- Database size: 976 MB + (2 MB × 365) = 1,706 MB (~1.7 GB)
- Peak storage khi sync: 1,706 MB × 1.2 = 2,047 MB (~2 GB)
```

#### Kịch bản 2: AuditLog tăng trưởng nhanh
```
AuditLog hiện tại: 420 MB (256K records)
Nếu tăng 1,000 records/ngày:

Sau 6 tháng:
- AuditLog: 420 MB + 180K records ≈ 714 MB
- Total DB: 976 MB + 294 MB = 1,270 MB

Peak storage: ~1,500 MB
```

---

## 🔴 CÁC VẤN ĐỀ CẦN LƯU Ý

### Vấn đề 1: **Đồng bộ dữ liệu không cần thiết** 🔴🔴🔴

**Hiện tại:** Đồng bộ TOÀN BỘ database
```bash
pg_dump -h ... -d rausachfinal  # Dump ALL tables
```

**Vấn đề:**
- Bảng `AuditLog` (420 MB) - Chỉ cần cho audit, không cần sync
- Bảng `performance_logs` (248 MB) - Logs cũ, không cần sync
- **668 MB không cần thiết** được dump & restore mỗi ngày (2 lần)

**Tác động:**
- Lãng phí băng thông: 668 MB × 2 = 1.3 GB/ngày
- Tốn thời gian: ~5-10 phút/lần (chủ yếu là log tables)
- Tăng I/O disk không cần thiết

---

### Vấn đề 2: **Không có compression** 🟡

**Hiện tại:**
```bash
pg_dump ... > file.sql  # Plain text SQL
```

**File size:**
- Plain SQL: ~200 MB
- Nếu dùng gzip: ~40-60 MB (tiết kiệm 70%)

**Tác động:**
- Tốn 140 MB disk space mỗi lần sync
- Transfer data lớn hơn cần thiết

---

### Vấn đề 3: **Cleanup logs không đủ tốt** 🟡

**Hiện tại:**
```bash
find /tmp -name "db-sync-*.log" -mtime +7 -delete
```

**Vấn đề:**
- Chỉ xóa log trong `/tmp`
- Không xóa log trong `/app/logs` (Docker volume)
- Có thể tích tụ log trong Docker volume

---

### Vấn đề 4: **Không có disk space check** 🟡

**Hiện tại:** Script không kiểm tra dung lượng trước khi dump

**Rủi ro:**
- Nếu disk full → dump fail
- Container có thể crash
- Application downtime

---

### Vấn đề 5: **Database lock khi restore** 🔴

**Hiện tại:**
```bash
psql ... < dump.sql  # Restore trực tiếp
```

**Vấn đề:**
- DROP TABLE → Mất data tạm thời
- Application có thể báo lỗi trong lúc restore
- Downtime ~2-5 phút mỗi lần sync

---

## ✅ GIẢI PHÁP ĐỀ XUẤT

### 🎯 Giải pháp 1: **Loại trừ các bảng log** (QUAN TRỌNG NHẤT)

**Tác động:** Giảm 68% dung lượng đồng bộ

```bash
# Thay vì dump toàn bộ
pg_dump -h ... -d rausachfinal

# Dump có chọn lọc
pg_dump -h ... -d rausachfinal \
  --exclude-table=AuditLog \
  --exclude-table=performance_logs \
  --exclude-table='*_logs' \
  --exclude-table='*_history'
```

**Lợi ích:**
- ✅ Giảm từ 976 MB → 308 MB (giảm 68%)
- ✅ Thời gian dump/restore nhanh hơn 3-4 lần
- ✅ Giảm I/O và băng thông
- ✅ Giảm peak storage từ 200 MB → 70 MB

**Trade-off:**
- ⚠️ Bảng log không được đồng bộ (nhưng không cần thiết)

---

### 🎯 Giải pháp 2: **Sử dụng compression**

```bash
# Dump với gzip
pg_dump ... | gzip > dump.sql.gz

# Restore
gunzip < dump.sql.gz | psql ...
```

**Lợi ích:**
- ✅ Giảm file size 70-80%
- ✅ 308 MB → 60-80 MB
- ✅ Faster transfer

---

### 🎯 Giải pháp 3: **Incremental sync** (Nâng cao)

Thay vì dump/restore toàn bộ, chỉ sync dữ liệu thay đổi:

```sql
-- Chỉ sync records mới/updated trong 24h
SELECT * FROM Donhang 
WHERE updated_at > NOW() - INTERVAL '24 hours'
```

**Lợi ích:**
- ✅ Chỉ sync ~1-5% dữ liệu
- ✅ Nhanh hơn 10-20 lần
- ✅ Không downtime

**Trade-off:**
- ⚠️ Phức tạp hơn
- ⚠️ Cần tracking thay đổi

---

### 🎯 Giải pháp 4: **Disk space monitoring**

```bash
# Check available space trước khi dump
AVAILABLE=$(df /tmp | tail -1 | awk '{print $4}')
REQUIRED=300000  # 300 MB in KB

if [ $AVAILABLE -lt $REQUIRED ]; then
    echo "ERROR: Không đủ dung lượng!"
    exit 1
fi
```

---

### 🎯 Giải pháp 5: **Database rotation** (Zero downtime)

```bash
# Restore vào database tạm
psql ... -d rausachv3_temp < dump.sql

# Rename atomic
ALTER DATABASE rausachv3 RENAME TO rausachv3_old;
ALTER DATABASE rausachv3_temp RENAME TO rausachv3;
DROP DATABASE rausachv3_old;
```

---

## 📋 KHUYẾN NGHỊ HÀNH ĐỘNG

### ⚡ Ưu tiên CAO (Làm ngay)

1. **Loại trừ bảng log khỏi sync**
   - Exclude: AuditLog, performance_logs
   - Giảm 68% dung lượng ngay lập tức

2. **Thêm compression (gzip)**
   - Giảm thêm 70% file size
   - Tổng: giảm 90% storage impact

3. **Thêm disk space check**
   - Tránh script fail khi disk full

### 🔄 Ưu tiên TRUNG (Tuần tới)

4. **Cleanup log files trong Docker volume**
   - Thêm cron xóa log cũ trong /app/logs

5. **Monitor database growth**
   - Track AuditLog size hàng tuần
   - Alert nếu >500 MB

### 🚀 Ưu tiên THẤP (Tháng tới)

6. **Xem xét incremental sync**
   - Nếu database >2 GB

7. **Archive old AuditLog**
   - Move logs >3 tháng ra external storage

---

## 📊 SO SÁNH BEFORE/AFTER

| Metric | Hiện tại | Sau tối ưu | Cải thiện |
|--------|----------|------------|-----------|
| Dump size | 200 MB | 20 MB | **-90%** |
| Dump time | 2-3 phút | 20-30 giây | **-83%** |
| Restore time | 3-4 phút | 30-40 giây | **-87%** |
| Peak storage | 250 MB | 25 MB | **-90%** |
| Bandwidth/day | 400 MB | 40 MB | **-90%** |
| Downtime/sync | 5 phút | 1 phút | **-80%** |

---

## 💰 ƯỚC TÍNH CHI PHÍ

### Storage cost (giả định)
```
Current:
- Database: 976 MB
- Peak temp: 250 MB
- Total: 1,226 MB

After optimization:
- Database: 976 MB (không thay đổi)
- Peak temp: 25 MB
- Total: 1,001 MB

Tiết kiệm: 225 MB storage overhead
```

### Bandwidth cost
```
2 sync/day × 365 days = 730 syncs/year

Current: 730 × 200 MB = 146 GB/year
Optimized: 730 × 20 MB = 14.6 GB/year

Tiết kiệm: 131.4 GB/year
```

---

## 🎯 KẾT LUẬN

### Đánh giá hiện tại: **⚠️ CẦN TỐI ƯU**

**Vấn đề chính:**
- 🔴 Đồng bộ 668 MB dữ liệu không cần thiết (68% database)
- 🟡 Không có compression
- 🟡 Có thể gây downtime

**Tác động:**
- ✅ Chức năng hoạt động tốt
- ⚠️ Lãng phí tài nguyên đáng kể
- ⚠️ Sẽ trở thành vấn đề khi DB tăng lên 2-3 GB

**Ưu tiên:**
1. ⚡ Exclude log tables (5 phút implement)
2. ⚡ Add gzip (2 phút implement)
3. 🔄 Monitoring & alerts (30 phút setup)
