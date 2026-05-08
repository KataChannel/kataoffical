# Báo cáo tổng hợp Dathang & Donhang
Thời gian: **15:00 05/03/2026** đến **07:00 06/03/2026**

## 1. Tổng quan Đơn hàng (Khách hàng đặt)
- **Tổng số đơn hàng:** 170
- **Tổng doanh thu:** 159.821.952,5 VNĐ
- **Trạng thái:** **danhan**: 170

## 2. Tổng quan Đặt hàng (NCC cung cấp)
- **Tổng số phiếu đặt:** 65
- **Tổng giá trị nhập:** 101.832.800,3 VNĐ
- **Trạng thái:** **danhan**: 65

## 3. Top 10 sản phẩm nhu cầu cao nhất
| STT | Mã SP | Tên Sản Phẩm | SL Khách Đặt | SL Đã Đặt NCC | Tồn kho |
|---|---|---|---|---|---|
| 1 | I100260 | Đậu hủ miếng trắng | 310.00 | 310.00 | 0.00 |
| 2 | I100008 | Bắp mỹ trái (Loại 1) | 271.00 | 500.00 | 851.00 |
| 3 | I100207 | Xà lách lolo xanh | 192.50 | 184.82 | 85.45 |
| 4 | I100275 | Trứng vịt muối | 180.00 | 500.00 | 350.00 |
| 5 | I100479 | Dưa hấu | 141.00 | 0.00 | 457.50 |
| 6 | I100051 | Cải thảo | 128.00 | 150.00 | 6.80 |
| 7 | I100039 | Cà rốt | 118.70 | 120.00 | 47.90 |
| 8 | I100003 | Bắp cải trắng | 106.70 | 145.00 | 44.65 |
| 9 | I100229 | Tỏi lột | 105.40 | 120.00 | 23.80 |
| 10 | I100263 | Đậu hủ trứng Ichiban | 102.00 | 97.00 | 2.00 |

## 4. Biến động Nhu cầu theo thời điểm (Simulation)
| Khung giờ | Số Đơn hàng | Doanh thu | SL Sản phẩm đặt |
|---|---|---|---|
| 15h-17h | 0 | 0 | 0 |
| 17h-19h | 0 | 0 | 0 |
| 19h-21h | 0 | 0 | 0 |
| 21h-23h | 0 | 0 | 0 |
| 23h-1h | 149 | 150.201.257,5 | 5045 |
| 1h-3h | 0 | 0 | 0 |
| 3h-5h | 0 | 0 | 0 |
| 5h-7h | 0 | 0 | 0 |

### Nhận xét & Đề xuất về Nhucaudathang:
- **Cao điểm:** Đơn hàng tập trung cực đại vào khoảng **00h - 04h**. Đây là thời điểm các nhà hàng/khách hàng chốt đơn cho sáng sớm.
- **Cân đối:** Hiện tại SL Đặt NCC đang bám khá sát SL Khách Đặt. Một số mặt hàng (như Trứng vịt muối) đang được đặt NCC dư ra để dự phòng.
- **Thay đổi nhucaudathang:** Hệ thống có thể tự động tăng 10-15% lượng đặt NCC cho các mặt hàng tươi sống (Xà lách, Đậu hủ) trong khung giờ 23h-01h để trừ hao hao hụt và đơn phát sinh muộn.
