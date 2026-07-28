# 📊 BÁO CÁO TỔNG HỢP: CHIẾN LƯỢC TỐI ƯU HÓA SERVER (VPS 116.118.49.243)

**Dự án:** Rausach Final  
**Server Target:** `116.118.49.243`  
**Ngày cập nhật:** 2026-05-09  
**Mục tiêu:** Tối ưu hóa hiệu năng hạ tầng, hạ nhiệt lưu trữ và tăng cường bảo mật server.

---

## 1. 🌐 TỐI ƯU HÓA MẠNG NỘI BỘ (INTERNAL NETWORKING)

Hiện trạng hệ thống đang sử dụng IP Public để các container kết nối với nhau, gây độ trễ và rủi ro bảo mật.

| Hạng mục | Hiện trạng | Đề xuất tối ưu | Lợi ích |
| :--- | :--- | :--- | :--- |
| **Database URL** | Dùng IP `116.118.49.243:55432` | Chuyển sang dùng container name `postgres:5432` | Giảm độ trễ mạng, tăng bảo mật nội bộ |
| **Redis Host** | Dùng IP Public | Chuyển sang dùng alias `redis` | Truy xuất cache nhanh hơn (Direct link) |
| **MinIO API** | Dùng Port Public | Chuyển sang kết nối nội bộ cổng `9000` | Tránh lộ dữ liệu qua port public không cần thiết |

---

## 2. 🛡️ QUẢN TRỊ TÀI NGUYÊN HỆ THỐNG (INFRASTRUCTURE)

Đảm bảo VPS hoạt động ổn định, tránh tình trạng treo máy (Server Hang) do tràn bộ nhớ hoặc quá tải CPU.

### 📍 Thiết lập Resource Limits (Docker Compose)
Cần bổ sung giới hạn tài nguyên cho từng dịch vụ trong `docker-compose.yml`:
- **API Backend:** Limit 2GB RAM, 1.0 CPU.
- **Database:** Limit 2GB RAM, 1.0 CPU.
- **Frontend:** Limit 512MB RAM, 0.5 CPU.

### 📍 Quản lý Log tập trung
Cấu hình Docker Logging Driver để tránh file log chiếm hết ổ cứng:
```yaml
logging:
  driver: "json-file"
  options:
    max-size: "10m"
    max-file: "3"
```

---

## 3. 💾 CHIẾN LƯỢC LƯU TRỮ DỮ LIỆU (STORAGE STRATEGY)

Tập trung vào việc dọn dẹp các bảng Log khổng lồ và thu hồi dung lượng thực tế.

### 📉 Database Purge & Vacuum
1. **Dọn dẹp định kỳ:** Chạy script `api/scripts/cleanup-database.ts` để xóa các dữ liệu log (Audit, Error, Performance) cũ hơn 30 ngày.
2. **Thu hồi dung lượng:** Thực hiện lệnh `VACUUM FULL` hoặc `VACUUM ANALYZE` sau khi dọn dẹp để PostgreSQL trả lại dung lượng ổ cứng cho OS.
3. **AuditLog Management:** Di chuyển thư mục `api/rausach_json` (chứa 1.3GB JSON logs) sang một Volume gắn ngoài hoặc lưu trữ trên MinIO để giảm kích thước Application Container.

---

## 🏗️ 4. TỐI ƯU HÓA DOCKER IMAGE SIZE

Giảm kích thước Image từ **~1.5 GB** xuống còn **~400 MB**.

- **Base Image:** Chuyển sang sử dụng `oven/bun:slim` cho Backend.
- **Multi-stage Build:** Thực hiện build (compile) trong một stage tạm thời và chỉ copy tệp tin thực thi (`dist`) sang stage chạy thực tế.
- **Prune System:** Thực hiện `docker system prune -f` trên VPS định kỳ để xóa sạch các Image cũ và Volume không sử dụng sau mỗi lần deploy.

---

## 🔐 5. BẢO MẬT & QUẢN LÝ BIẾN MÔI TRƯỜNG

- **Security:** Chuyển các thông tin nhạy cảm (Credentials, API Keys) từ `docker-compose.yml` sang file `.env` được bảo mật hoặc dùng Docker Secrets.
- **Database Access:** Đóng các port Public (`55432`, `56379`) và chỉ cho phép kết nối nội bộ hoặc qua VPN/SSH Tunnel nếu cần bảo trì.

---

## 📈 KẾT QUẢ KỲ VỌNG SAU TỐI ƯU

| Metric | Hiện tại | Sau tối ưu | Cải thiện |
| :--- | :---: | :---: | :---: |
| **Dung lượng Database** | Đang phình to | Ổn định | **~40%** |
| **Response Time API** | Bị trễ do mạng public | Phản hồi tức thì | **-50ms** |
| **Dung lượng Docker Image** | 1.5 GB | 400 MB | **-73%** |
| **Độ ổn định Server** | Nguy cơ treo máy cao | Rất ổn định | **100%** |

---
**Lưu ý:** Báo cáo này tập trung hoàn toàn vào môi trường vận hành trên **VPS 116.118.49.243**. Các thay đổi này không ảnh hưởng đến code nghiệp vụ nhưng sẽ cải thiện đáng kể độ bền của hệ thống.

*Người lập: Antigravity Agent*
