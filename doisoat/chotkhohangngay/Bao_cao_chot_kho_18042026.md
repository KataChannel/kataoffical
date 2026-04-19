# Báo cáo Chốt Kho Hàng Ngày - 18/04/2026

Dữ liệu được trích xuất và phân tích từ hình ảnh đối soát `solieu1804.jpg` cung cấp vào lúc 18:42 cùng ngày.

## 1. Bảng Tổng Hợp Dữ Liệu Đối Soát

| Mã Sản Phẩm | Tên Sản Phẩm | Tồn Hệ Thống | Thực Tế (Chốt) | Snapshot (Logs) | Chênh Lệch | Đánh Giá/Nguyên Nhân |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **I100233** | Trứng gà | 114 | 114 | 118 | **+4** | Khớp thực tế. Chênh lệch Snapshot nhỏ. |
| **I100479** | Dưa hấu | 350 | 350 | 332.5 | **-17.5** | Khớp thực tế. |
| **I100164** | Ớt đà lạt (đỏ) | 14 | 14 | -14.5 | **-28.5** | ⚠️ Xuất trước - Nhập sau (TH2) |
| **I100165** | Ớt đà lạt (vàng) | 14 | 14 | -1.06 | **-15.06** | ⚠️ Xuất trước - Nhập sau (TH2) |
| **I100166** | Ớt đà lạt (xanh) | 1 | 1 | -10.27 | **-11.27** | ⚠️ Xuất trước - Nhập sau (TH2) |
| **I100003** | Bắp cải trắng | 0.7 | 0.7 | -99.57 | **-100.27** | 🔴 Lệch Snapshot nặng (TH2) |
| **I100002** | Bắp cải tím | 26.5 | 26.5 | 1.1 | **-25.4** | Snapshot chưa cập nhật phiếu nhập |
| **I100113** | Húng lũi | 0 | 0 | -10.25 | **-10.25** | Âm snapshot do xuất hàng âm |
| **I100207** | Xà lách lolo xanh | 5 | 5 | -204.8 | **-209.8** | 🔴 Âm snapshot nặng (TH2) |
| **I100004** | Bắp chuối bào | 0 | 0 | -16.4 | **-16.4** | Âm snapshot |
| **I100256** | Bún nhỏ | 0 | 0 | -141.8 | **-141.8** | 🔴 Âm snapshot nặng |

---

## 2. Phân Tích & Nhận Xét

### 🔍 Đặc điểm chung:
- **Tồn Hệ Thống và Thực Tế KHỚP NHAU 100%:** Điều này cho thấy nhân viên đã thực hiện nhập số liệu thực tế dựa trên số tồn hiện tại của hệ thống, hoặc hệ thống vừa mới được cập nhật (Sync).
- **Snapshot liên tục ÂM:** Có 9/11 sản phẩm có số liệu Snapshot (tổng kết từ log nhập/xuất kể từ lần chốt trước) mang giá trị âm. 

### ⚙️ Kết quả Truy vấn Cơ sở dữ liệu (Deep Analyze):
Qua chạy script chẩn đoán `deep_analyze_1804.ts`, chúng tôi ghi nhận:
- **I100256 (Bún nhỏ):** Hiện có **11,728.14** kg trong DB nhưng chưa bao giờ được chốt kho (Last Close: N/A). Snapshot âm (-141.8) là do hệ thống chỉ thấy các đơn xuất mà không có mốc khởi đầu.
- **I100479 (Dưa hấu):** DB ghi nhận tồn **350 kg** (được nhập vào từ sau ngày 17/04). Snapshot báo **332.5 kg** là con số chính xác sau khi trừ các đơn hàng đã giao trong ngày.
- **I100233 (Trứng gà):** Đã được chốt ngày 17/04 với số lượng **112**. Hôm nay tăng lên **114** (Thực tế) và Snapshot báo **118** (cho thấy có biến động nhập/xuất đan xen).

### 🚩 Nguyên nhân gốc rễ:
Phần lớn các sản phẩm rơi vào **Trường hợp 2 & 4** trong [Quy trình Ghi nhận tồn kho](file:///chikiet/kata2025/rausachfinal/doisoat/Quy_trinh_ghi_nhan_ton_kho.md):
1. **Chưa có Baseline:** Các mã như Bún nhỏ, Bắp chuối bào chưa được chốt kho lần nào dẫn đến Snapshot sai lệch hoàn toàn.
2. **Sai lệch thời điểm ghi nhận:** Hàng nhập về (Nhập) và hàng giao đi (Xuất) không được xác nhận đồng bộ trên App App, dẫn đến Snapshot "đi trước" hoặc "đi sau" thực tế.

### 🚩 Các trường hợp cần lưu ý:
1. **Xà lách lolo xanh (I100207) & Bún nhỏ (I100256):** Snapshot âm rất lớn (-209.8 và -141.8). Đây là các mặt hàng tươi sống, có tần suất xuất hàng cao. Việc snapshot âm nặng cho thấy mốc Baseline (lần chốt kho gần nhất) vẫn chưa "đuổi kịp" lượng hàng thực tế luân chuyển.
2. **Bắp cải trắng (I100003):** Lệch -100.27 đơn vị. Cần kiểm tra lại các phiếu nhập hàng từ 16/04 đến nay xem có phiếu nào đang ở trạng thái `Treo` (chưa xác nhận) hay không.
3. **Trứng gà (I100233):** Là mặt hàng duy nhất có Snapshot dương (+4 so với thực tế). Đây là dấu hiệu tốt, cho thấy dữ liệu nhập xuất của mặt hàng này khá ổn định.

---

## 3. Khuyến Nghị Hành Động (Action Plan)

1. **Thực hiện Chốt Kho ngay:** Bấm **"Lưu Chốt Kho"** với các con số Thực tế đã ghi nhận trong ảnh. Thao tác này sẽ:
   - Reset Snapshot về mốc 0 (hoặc bằng Thực tế tùy logic code).
   - Thiết lập Baseline mới cho tất cả 11 mã hàng này.
   - Xóa bỏ các con số Snapshot âm gây nhiễu báo cáo.

2. **Rà soát Quy trình Nhập hàng:**
   - Yêu cầu bộ phận kho kiểm tra các phiếu nhập còn tồn đọng của ngày 17/04 và sáng 18/04. 
   - Đảm bảo quy tắc: **"Phải nhập hệ thống trước khi xuất thực tế"** để Snapshot không bị âm.

3. **Kiểm tra Logic Snapshot (Dành cho Dev):**
   - Nếu sau khi chốt kho mà Snapshot vẫn bị lệch lớn trong vài ngày tới, cần kiểm tra lại hàm `calculateStockFromLogs` xem có đang lọc đúng `khoId` và loại trừ các phiếu hủy/trả hàng hay chưa.

---
**Người báo cáo:** Antigravity AI  
**Ngày:** 18/04/2026  
**Nguồn dữ liệu:** `solieu1804.jpg`  
**Vị trí lưu trữ:** `/doisoat/chotkhohangngay/Bao_cao_chot_kho_18042026.md`
