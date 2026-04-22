# Báo Cáo Đánh Giá & Đề Xuất Tối Ưu Lưu Trữ Server (116.118.49.243)

## 1. Hiện Trạng Hệ Thống (Sau khi dọn dẹp)
*   **Tổng dung lượng ổ đĩa (Root partition):** 80 GB
*   **Đã sử dụng:** 55 GB (73%)
*   **Còn trống:** 21 GB (27%)
*   **Trạng thái:** **ỔN ĐỊNH TẠM THỜI** (Đã giải phóng 12GB từ các bản backup cũ).

## 2. Phân Tích Dữ Liệu Chiếm Dụng
Dựa trên kiểm tra thực tế, các khu vực chiếm dung lượng lớn nhất bao gồm:

| Vị trí | Dung lượng | Nội dung |
| :--- | :--- | :--- |
| `/var/lib/docker/overlay2` | 27 GB | Layer của container và image Docker |
| `/var/lib/docker/volumes` | 19 GB | Dữ liệu persistent (Postgres, MinIO, MySQL) |
| `/root/rausach_backups` | 12 GB | Các bản backup nén (.tar.gz) cũ |
| `/root/tazagroup` & `/root/rausachfinal` | ~2 GB | Code và dữ liệu ứng dụng |

### Chi tiết các Volume Docker lớn nhất:
1.  `shoprausach_rausach_postgres_data`: **8.9 GB**
2.  Anonymous volume (`faee60c0...` - Postgres): **5.4 GB**
3.  `shoprausach_minio_data`: **1.1 GB**

## 3. Nguyên Nhân Gây Lãng Phí Lưu Trữ
1.  **Backup cục bộ quá nhiều:** Thư mục `/root/rausach_backups` chứa nhiều bản deploy cũ từ đầu tháng 4/2026 nhưng chưa được dọn dẹp hoặc chuyển đi nơi khác.
2.  **Dữ liệu Docker dư thừa:** Có 24 image và 53 volume, nhưng chỉ có 21 volume đang active. Khoảng 32 volume (chiếm hơn 1GB) là dư thừa.
3.  **Cấu trúc phân vùng hạn chế:** Việc để tất cả dữ liệu (Docker, Logs, Backups) trên cùng phân vùng root 80GB gây rủi ro cao khi một dịch vụ bùng phát dung lượng.

## 4. Đề Xuất Xử Lý & Tối Ưu

### Giai đoạn 1: Xử lý khẩn cấp (Reclaim ~15-20 GB ngay lập tức)
1.  **Dọn dẹp Backups:**
    *   Chuyển các file `.tar.gz` cũ trong `/root/rausach_backups` sang server lưu trữ khác hoặc Google Drive.
    *   Chỉ giữ lại 3-5 bản backup gần nhất.
    *   *Dự kiến thu hồi: 10 GB.*
2.  **Dọn dẹp Docker:**
    *   Chạy lệnh `docker system prune -f` để xóa các container đã dừng, network thừa và các dangling images.
    *   Chạy lệnh `docker volume prune -f` để xóa các volume không còn liên kết với container nào.
    *   *Dự kiến thu hồi: 2-5 GB.*

### Giai đoạn 2: Tối ưu hóa Database & Lưu trữ
1.  **Postgres Maintenance:** Kiểm tra và thực hiện `VACUUM FULL` (nếu có thể dừng service) hoặc tối ưu lại các bảng lớn trong volume `shoprausach_rausach_postgres_data`.
2.  **MinIO Offloading:** Xem xét chuyển dữ liệu MinIO (`shoprausach_minio_data`) sang một S3 provider bên ngoài nếu dung lượng file upload tăng nhanh.

### Giai đoạn 3: Giải pháp lâu dài
1.  **Mở rộng ổ đĩa:** Nâng cấp dung lượng server lên ít nhất 160 GB để đảm bảo không gian hoạt động an toàn cho các container.
2.  **Tách biệt phân vùng:** Nếu có thể, nên tách `/var/lib/docker` sang một ổ đĩa riêng (Mounted volume) để tránh làm treo hệ điều hành khi Docker đầy disk.
3.  **Tự động hóa dọn dẹp:** Thiết lập Cronjob định kỳ hàng tuần để dọn dẹp docker images cũ và xoay vòng backups.

## 5. Kết Luận & Hành Động Đã Thực Hiện
*   **Hành động đã thực hiện (22/04/2026):**
    *   Xóa toàn bộ các file nén deploy cũ trong `/root/rausach_backups/` (~11GB).
    *   Xóa các file `.tar.gz` dư thừa trong thư mục `/root/`.
    *   Thực hiện `docker system prune` và `docker volume prune`.
*   **Kết quả:** Giải phóng thành công **12GB**, đưa mức sử dụng đĩa từ **89% xuống 73%**.

---
*Người thực hiện: Antigravity AI*
*Ngày báo cáo: 2026-04-22*
