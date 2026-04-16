# TỔNG HỢP VẤN ĐỀ VÀ HƯỚNG XỬ LÝ (2026-04-16)

## 1. Sự cố Lệch tồn kho và "Hàng đang về" ("Ghost Stock")

### Hiện trạng lỗi (Bug Analysis)
*   **Vấn đề:** Khi bộ phận kho thực hiện "Chốt kho", hệ thống ghi đè giá trị `slchonhap` (số lượng chờ nhập) và `slchogiao` (số lượng chờ giao) về **0**.
*   **Hậu quả:** Toàn bộ dữ liệu về "Đơn hàng đang trên đường trung chuyển" bị xóa khỏi hệ thống. Điều này khiến báo cáo mua hàng tính sai nhu cầu (vì tưởng không có hàng đang về), dẫn đến việc đặt thừa hàng (ví dụ: dư 500kg dưa hấu, dư 11.000kg bún ảo).
*   **Điểm kỹ thuật:** Lỗi nằm trong file `api/src/chotkho/chotkho.service.ts` tại hàm `create` và `updateChotkhoWithDetails`. Cấu trúc logic cũ không bảo toàn trạng thái đơn hàng trung chuyển khi lập biên bản đối soát.

### Cách xử lý (Technical Resolution)
*   **Bảo toàn dữ liệu trung chuyển:** Viết lại toàn bộ phần tính toán `sltontt` (Tồn kho tổng). Thay vì gán cứng bằng 0, hệ thống dùng lệnh `aggregate` để quét lại toàn bộ các đơn hàng (`Dathangsanpham` và `Donhangsanpham`) ở trạng thái chờ/đang giao. Bóc tách logic này vào 2 biến `currentPendingIn` (đang về) và `currentPendingOut` (đang đi) để cập nhật đồng bộ vào `TonKho`.
*   **Cơ chế Cảnh báo (Early warning):** Bổ sung array `pendingWarnings` đẩy về cho Frontend. Khi người dùng bấm chốt kho những mã đang có lô hàng trung chuyển, hệ thống sẽ chèn cảnh báo *"⚠️ Sản phẩm có X kg hàng đang về và Y kg đơn đang chờ giao"*.
*   **Chốt và Nhận cùng lúc (Smart Matching / Implicit Reception):** Bổ sung danh sách `confirmOrderIds` vào hàm `create`. Nếu có hàng vừa mới nhập kho thực tế nhưng chưa kịp click "Đã Nhận", người dùng có thể gửi ID các đơn đặt hàng này vào chung lệnh chốt kho. Hệ thống sẽ **tự động chuyển trạng thái đơn hàng** (`danhan`) và tạo sinh **Phiếu Nhập Kho** rồi mới tính lại tồn Baseline. Giúp quy trình không bị ngắt quãng.

### Tối ưu Hiệu suất (Performance Boost)
*   Tốc độ GraphQL Mutation `chotkhoCreate` bị lỗi quá chậm (lớn hơn 3 giây - "🐌 Very slow GraphQL mutation detected").
*   Đã thiết kế lại cấu trúc bằng **Batch Fetching**. Truy vấn 1 lần duy nhất danh sách `TonKho` và `Sanpham` bằng mệnh đề `in: [...]` thay vì gọi database trong vòng lặp loop (loại bỏ vấn đề lỗi N+1 Query). Thời gian thực thi đã giảm mạnh, đảm bảo app không bị thắt cổ chai khi chốt kho nhiều mặt hàng.

---

## 2. Quy trình & Tiêu chuẩn Vận hành Khuyến nghị (SOP)

Nhằm đảm bảo hệ thống "bắt đầu đúng" và dữ liệu luôn khớp tại mọi thời điểm, cần áp dụng nghiêm ngặt quy trình sau:

### Bước 1: Thiết lập "Điểm chuẩn" (Baseline Initialization)
*   Thực hiện "Lưu Chốt Kho" (Snapshot) cho toàn bộ danh mục sản phẩm (sửa cái sai từ quá khứ nếu có).

### Bước 2: Kỷ luật Chứng từ (Real-time Documentation)
*   **Nhập trước - Xuất sau:** Tuyệt đối không xác nhận đơn hàng bán ra (xuất kho) nếu chưa xác nhận phiếu nhập từ nhà cung cấp lên hệ thống.
*   **Xác nhận ngay:** Hàng về đến kho phải được bấm "Đã nhận" (`danhan`) ngay lập tức trên App/Web. Không để đơn treo quá ngày dự kiến (trừ khi dùng tính năng "Nhận tự động" ở bản cập nhật mới).

### Bước 3: Cơ chế Chốt chặn đối soát (Reconciliation Protocol)
*   Thực hiện chốt kho định kỳ (ít nhất 1 lần/ngày vào cuối ca).
*   Kiểm tra chéo: Trước khi bấm "Lưu", nhân viên phải đối chiếu cột **Snapshot** (hệ thống tính) vs **Thực tế** (đếm tay).
*   Thấy thông báo ⚠️ Cảnh báo hàng trung chuyển phải rà soát lại ngay.

### Bước 4: Kiểm soát Nhu cầu Đặt hàng (Purchasing Control)
*   Mua hàng phải nhìn vào 2 chỉ số: `slton` (thực có) và `slchonhap` (đang về). Nếu tồn kho hôm nay và hôm qua lệch > 20% mà không có đơn bán tương ứng, phải gọi điện xác nhận trực tiếp với thủ kho.

---

## 3. Phân tích Chiến lược: Khóa cứng (Hard Block) vs Cảnh báo mềm (Soft Constraint)

Trong quá trình đối soát, hệ thống phát hiện số lượng lớn cảnh báo *"Sản phẩm đang có hàng đang về / đơn đang đi chưa hoàn tất"*. Có câu hỏi đặt ra: **Có nên chặn không cho chốt kho (disable nút Lưu) cho đến khi nhân viên xử lý xong các đơn hàng treo này hay không?**

### Quyết định: ÁP DỤNG CẢNH BÁO MỀM (Soft Constraint)
Sau khi đánh giá sự phức tạp của vận hành thực tế (đóng gói, xe tải delay, từ chối nhận hàng do chất lượng), thiết kế hệ thống hiện tại áp dụng phương pháp Khuyên Dùng (Soft Constraint). Người dùng vẫn thấy cảnh báo (màu vàng), nhưng có quyền click **"Vẫn xác nhận cập nhật"**.

**Lý do (Trade-offs):**
1. **Ngăn chặn dữ liệu rác (No Garbage Data):** Nếu ép buộc nhân viên phải "xóa" danh sách cảnh báo mới cho đi về nhà vào cuối ca, họ sẽ sinh ra hành vi chống đối: Click "Đã Nhận / Đã Giao" cho toàn bộ đơn hàng đang bị khóa dở dang (dù hàng chưa lên xe hoặc xe chưa tới). Việc này phá vỡ công nợ và làm hỏng dòng thời gian giao nhận.
2. **Cập nhật Backend mạnh mẽ (Backend Safety Net):** Mã nguồn Backend phiên bản ngày 16/04/2026 đã tự động khắc phục tình trạng này. Khác với phiên bản cũ (auto reset `slchonhap` về 0 làm mất phiếu pending), phiên bản mới **bảo toàn hoàn toàn** các con số đang treo bất chấp thao tác chốt số tại Kho diễn ra liên tục. 
3. **Hiệu suất chuỗi cung ứng (Supply Chain Flow):** Kho bãi được vận hành liên tục. Hàng thực tế có bao nhiêu chốt bấy nhiêu. Hàng trên đường đi vẫn tồn tại độc lập trên hệ thống chờ người xác nhận, không cản trở nhau.

### Hướng giải quyết dứt điểm số lượng cảnh báo tồn đọng:
- **Ngắn hạn (Công nghệ):** Áp dụng phát triển tính năng *"Xác nhận nhanh toàn bộ"* (`confirmOrderIds` hiện đã được cắm ngầm trong logic `chotkhoCreate`) ngay tại UI Chốt kho để thanh lý nhanh các đơn hàng mà nhân viên chắc chắn đã có tại kho.
- **Dài hạn (Human Operations):** Áp dụng **SOP (Bước 2)**. Kể từ nay, bất kỳ đơn nhập hàng hay xuất giao nào đi qua ngày `(T+1)` (quá 24 giờ) mà vẫn ở trạng thái "Đang về/Đang đi", quản lý cần tiến hành rà soát để nhắc nhở và có chế tài cảnh cáo chuyên cần đối với tổ kho vận nhằm duy trì danh sách cảnh báo ở mức Minimum (Dưới 10).

---
**Cập nhật lần cuối:** 16-04-2026 (Bổ sung hạng mục ràng buộc hệ thống)
