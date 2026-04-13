# Quy trình Ghi nhận & Đối soát Tồn kho (Toàn diện)

Tài liệu này giải trình chi tiết luồng dữ liệu của một sản phẩm từ lúc phát sinh đơn hàng đến khi chốt kho thực tế và cách hệ thống xử lý các con số "ảo".

---

## 1. Sơ đồ Luồng Dữ liệu (Workflow)

Quy trình vận hành xoay quanh 5 cột mốc chính:

1.  **Đơn hàng (Sales Order):** Ghi nhận nhu cầu xuất (Giảm tồn tương lai).
2.  **Đặt hàng (Purchase Order):** Ghi nhận nhu cầu nhập (Tăng tồn thực tế).
3.  **Tồn Kho Hệ Thống (Snapshot):** Số liệu tính toán từ Log (Sổ sách).
4.  **Chốt Kho (Stock Take):** Con người đếm thực tế (Kiểm kê).
5.  **Tồn Kho (Sync to Reality):** Cập nhật thực tế vào Database (Hợp nhất).

---

## 2. Định nghĩa các khái niệm số liệu

| Thuật ngữ | Ý nghĩa kỹ thuật | Cách tính |
| :--- | :--- | :--- |
| **SL Tồn (slton)** | Số lượng thực tế đang có trong kho tại thời điểm hiện tại. | `[Số chốt gần nhất] + [Nhập] - [Xuất]` |
| **SL Chờ Giao** | Hàng đã có khách đặt nhưng chưa rời kho. | Tổng `slgiao` của các Đơn hàng (status: `dadat`, `dagiao`) |
| **SL Chờ Nhập** | Hàng đã đặt nhà cung cấp nhưng chưa về kho. | Tổng `slgiao` của các phiếu Đặt hàng (status: `dadat`) |
| **Snapshot (Tính toán)**| Số lượng sổ sách "lẽ ra phải có". | `[Thực tế lần chốt trước] + Σ Nhập - Σ Xuất (kể từ ngày chốt)` |

---

## 3. Ví dụ Cụ thể các Trường hợp

### 🟦 Trường hợp 1: Quy trình Chuẩn (Mọi thứ khớp nhau)
*Sản phẩm A đang có 100 cái (đã chốt).*

1.  **Đơn hàng:** Khách đặt 20 cái.
    *   `slchogiao` = 20. `slton` vẫn là 100.
2.  **Xuất hàng:** Đơn chuyển trạng thái `dagiao`.
    *   `slchogiao` = 0. `slton` giảm xuống **80**.
3.  **Đặt hàng:** Nhập thêm 50 cái từ nhà cung cấp (status `danhan`).
    *   `slton` tăng lên **130**.
4.  **Chốt kho:** Nhân viên đếm tại kệ thấy đúng **130**.
    *   **Hệ thống tính:** 100 - 20 + 50 = 130.
    *   **Kết luận:** Chênh lệch = 0. Hệ thống ghi nhận trạng thái ổn định.

---

### 🟥 Trường hợp 2: "Xuất trước - Nhập sau" (Dẫn đến số âm)
*Sản phẩm B đang có 0 cái. Xe hàng đang ở cổng chưa kịp bấm xác nhận vào hệ thống.*

1.  **Xuất hàng:** Khách cần gấp, nhân viên bốc hàng từ xe giao luôn 10 cái (status `dagiao`).
    *   `slton` = 0 - 10 = **-10 (Âm)**.
2.  **Đặt hàng (Trễ):** 1 tiếng sau, nhân viên kho mới bấm "Đã nhận" cho phiếu nhập 50 cái.
    *   `slton` = -10 + 50 = **40**.
3.  **Đối soát:** Nếu lấy Snapshot tại thời điểm (1), hệ thống sẽ báo lỗi số liệu âm. Đây là nguyên nhân phổ biến nhất gây lệch trong ảnh chụp đối soát.

---

### 🟧 Trường hợp 3: Hao hụt thực tế (Mất mát/Hư hỏng)
*Sản phẩm C đã chốt 100 cái.*

1.  **Giao dịch:** Trong tháng xuất 30 cái, nhập 0.
2.  **Hệ thống tính (Snapshot):** 100 - 30 = **70**.
3.  **Kiểm kho thực tế:** Nhân viên đếm chỉ thấy **65** (hỏng 5 cái chưa khai báo).
4.  **Hành động Chốt Kho:**
    *   Nhập `sltonthucte` = 65, `slhuy` = 5.
    *   Hệ thống ghi nhận `chenhlech` = 0 (vì đã giải trình vào slhuy).
    *   **Quan trọng:** `TonKho.slton` được ghi đè về **65**. Mốc thời gian được reset để tính cho kỳ sau.

---

### ⬛ Trường hợp 4: Baseline chưa khởi tạo (Sản phẩm mới)
*Sản phẩm D mới nhập về 10,000 cái nhưng chưa bao giờ thực hiện "Chốt Kho" lần nào.*

1.  **Vấn đề:** Hệ thống tính `Snapshot = [Lần chốt cuối] + Biến động`. Vì chưa chốt bao giờ, `Lần chốt cuối` mặc định = 0.
2.  **Sai lệch:** Dù trong kho có 10,000 cái, nhưng Snapshot có thể báo 0 hoặc một con số âm rất lớn nếu chỉ có đơn xuất.
3.  **Giải pháp:** Bắt buộc phải thực hiện **"Chốt kho lần đầu"** để xác lập Baseline (Điểm chuẩn) cho sản phẩm.

---

## 4. Cách Hệ thống Tự sửa lỗi (Self-Healing)

Khi bạn thực hiện thao tác **"Lưu Chốt Kho"**, quy trình sau sẽ diễn ra:

1.  **Trace Log:** Hệ thống chạy hàm `calculateStockFromLogs` để tự xây dựng lại lịch sử biến động từ các phiếu Nhập/Xuất chính thống.
2.  **Override:** Con số bạn nhập vào (Thực tế) sẽ **ghi đè** hoàn toàn lên giá trị cũ trong table `TonKho`.
3.  **Reset Baseline:** Cập nhật `updatedAt` của sản phẩm. Kể từ giây phút này, mọi tính toán Snapshot cho tương lai sẽ lấy con số bạn vừa nhập làm mốc xuất phát, cắt bỏ hoàn toàn các lỗi sai từ quá khứ.

---

## 5. Kịch bản Tổng hợp (Hành trình "Sóng gió" của Sản phẩm X)

Để hiểu toàn diện, hãy xem ví dụ về một sản phẩm mới trong vòng 1 tháng:

| Thời điểm | Hoạt động | Biến động | Tồn Sổ Sách (Snapshot) | Thực tế tại kệ | Ghi chú Trạng thái |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **01/04** | Nhập 1000 cái đầu tiên | +1000 | **0** | 1000 | ⚠️ **Lỗi Baseline:** Chưa chốt kho lần đầu nên Snapshot mặc định là 0. |
| **05/04** | Bán 200 cái | -200 | **-200** | 800 | 🔴 Hệ thống báo âm dù thực tế còn rất nhiều. |
| **10/04** | **Chốt Kho lần 1** | Reset | **800** | 800 | ✅ Thiết lập Baseline. Hệ thống đã khớp. |
| **12/04** | Bán 100 cái (Giao trước) | -100 | **700** | 700 | Standard flow. |
| **15/04** | Bán thêm 150 cái | -150 | **550** | 550 | Standard flow. |
| **20/04** | Xe hàng về 500 cái | (Chưa bấm) | **550** | 1050 | ⚠️ Hàng đã vào kệ nhưng chưa xác nhận trên App. |
| **21/04** | Giao đơn lớn 600 cái | -600 | **-50** | 450 | ⚠️ **Xuất trước - Nhập sau:** Sổ sách báo âm (-50) dù kệ còn 450 cái. |
| **21/04** | Nhập kho (Xác nhận trễ)| +500 | **450** | 450 | ✅ Hợp nhất dữ liệu. Hệ thống dương trở lại. |
| **28/04** | Chuột cắn hỏng 10 cái | 0 | **450** | 440 | ⚠️ **Hao hụt:** Sổ sách chưa biết có hàng hỏng. |
| **30/04** | **Chốt Kho Cuối Tháng** | -10 (Hủy) | **440** | 440 | ✅ Nhập SL Thực tế 440 - SL Hủy 10. Chênh lệch về 0. |

### Bài học rút ra từ Kịch bản này:
1.  **Nhìn số Âm không nên hoảng sợ:** Thường là do phiếu nhập chưa được xác nhận kịp thời.
2.  **Chốt kho là "Cứu cánh":** Bất kể quá khứ dữ liệu có sai bê bết thế nào, chỉ cần một thao tác **Chốt Kho Thực tế**, hệ thống sẽ tự động quét sạch lỗi và bắt đầu lại từ mốc chuẩn.
3.  **Tầm quan trọng của SL Hủy:** Luôn phải tách riêng số lượng bán được và số lượng hỏng để hệ thống tính toán chính xác lý do chênh lệch.

---
**Kết thúc tài liệu.**
**Người hiệu đính:** Antigravity AI  
**Vị trí tài liệu:** `/chikiet/kata2025/rausachfinal/doisoat/Quy_trinh_ghi_nhan_ton_kho.md`
