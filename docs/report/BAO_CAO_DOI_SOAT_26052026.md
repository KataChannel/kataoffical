Created At: 2026-05-26T15:42:10Z
Completed At: 2026-05-26T15:45:30Z
File Path: `file:///home/kata/Coding/rausachfinal/docs/report/BAO_CAO_DOI_SOAT_26052026.md`

# BÁO CÁO TỔNG KẾT THAY ĐỔI HỆ THỐNG KHO & KẾT QUẢ ĐỐI SOÁT NGÀY 26/05/2026 (ĐÃ ĐIỀU CHỈNH CHUẨN)

## 1. Phát hiện & Phân tích Nguyên nhân Lệch Tồn Kho (HCM)
*   **Vấn đề cốt lõi:** Người dùng (Kế toán đối soát) sửa đổi số lượng thực nhận (`slnhan`) trên các đơn đặt hàng nhà cung cấp (Purchase Orders) đã ở trạng thái **Đã nhận (`danhan`)** trong quá khứ.
*   **Cơ chế gây lỗi:** Hệ thống tính toán lượng chênh lệch: `Delta = Số lượng nhận mới - Số lượng nhận cũ` và gọi hàm cập nhật kho `updateTonkhoAtomic` cho kho vệ tinh. Do cơ chế **Mirror Logic** của hệ thống, bất kỳ thay đổi nào ở kho vệ tinh (SG2, SG1, TG-LONG AN, TG-ĐÀ LẠT, Bổ Sung) đều được **tự động cộng/trừ tương ứng vào KHO - HCM (Kho Tổng)** mà không sinh phiếu kho vật lý hay thẻ kho tại HCM. Khi chạy chốt kho cuối ngày, số tồn kho hệ thống đã bị lệch âm thầm này được khóa lại làm tồn chốt cuối kỳ.
*   **Hai trường hợp điển hình:**
    1.  **`I100263` (Đậu hủ trứng Ichiban):** Đơn **`TGNCC-SZ00097`** (SG2, đặt ngày **05/04/2026**) bị cập nhật tăng `slnhan` từ `93` lên `108` (`+15` delta) vào lúc **10:20:30 ngày 26/05/2026** bởi user **Lâm Như Ngọc** (`ktcntrangia1@gmail.com`).
    2.  **`I100259` (Đậu hủ miếng chiên):** Đơn **`TGNCC-XG00001`** (SG2, đặt ngày **25/05/2026**) bị cập nhật tăng `slnhan` từ `15` lên `35` (`+20` delta) vào lúc **06:23:01 ngày 26/05/2026** bởi user **Lâm Như Ngọc** (`ktcntrangia1@gmail.com`).

---

## 2. Kết quả Đối Soát & Khớp Tồn Baseline Theo Thực Tế (Đã Khắc Phục Lỗi Đối Soát Tự Động)
Để xử lý triệt để chênh lệch tồn trong ngày 26/05/2026 và sửa lỗi của script tính toán tự động cũ (vốn dùng công thức `tồn đầu + nhập - xuất` gây lệch so với số thực đếm tại kho), chúng tôi đã chạy script dọn dẹp và chốt baseline chuẩn hóa ngày 26/05/2026:

*   **Dọn dẹp số liệu lỗi cũ:**
    *   Xóa bỏ hoàn toàn phiên chốt kho lỗi ngày 26/05 (`ID: 081e7b6d-624b-48a9-ac61-08c811667b07`) cùng toàn bộ các dòng chi tiết chênh lệch sai của nó.
    *   Xóa bỏ 4 phiếu kho đối soát ảo (`PX-DOISOAT-26052026-*` và `PN-DOISOAT-26052026-*`) vốn được tạo ra để ép số liệu khớp theo công thức toán học bị sai lệch.
*   **Thiết lập lại số liệu Baseline chuẩn xác:**
    *   Đọc trực tiếp số liệu từ tệp kiểm kho thực tế [Ton-Huy 26-5.xlsx](file:///home/kata/Coding/rausachfinal/doisoat/Ton-Huy%2026-5.xlsx).
    *   Khởi tạo phiên chốt kho Baseline mới: **`Chốt kho Base Line 26-05-2026`**.
    *   Đồng bộ toàn bộ tồn kho vật lý tại `SanphamKho` (Kho HCM) và `TonKho` toàn cục về đúng số lượng kiểm kho thực tế từ Excel.
*   **Xử lý đơn hàng tồn đọng & Tính toán lượng chờ giao/chờ nhận:**
    *   Tự động phát hiện và chuyển các đơn đặt hàng/bán hàng tồn đọng trạng thái `dadat` trước ngày 27/05/2026 về trạng thái **`choxuly`** (chờ xử lý) để giải phóng "lượng giữ kho khống".
    *   Tính toán lại chính xác chỉ số chờ giao (`slchogiao`) và chờ nhận (`slchonhap`) của các sản phẩm dựa trên các đơn hàng hợp lệ từ ngày 27/05/2026 trở đi.
*   **Kết quả đạt được:**
    *   **147 sản phẩm** được cập nhật trực tiếp theo kiểm kho Excel (ví dụ: *Trứng bắc thảo* được cập nhật về đúng **192 quả**, *Thơm trái xanh* về đúng **243 trái**,...).
    *   **877 sản phẩm** không xuất hiện trong file Excel kiểm kho được tự động reset về **0** (hoặc đồng bộ chuẩn theo số lượng thực tế).
    *   Đồng bộ dữ liệu thành công giữa bảng chốt chi tiết `Chotkhodetail`, tồn kho vật lý `SanphamKho` tại HCM, và tồn kho toàn hệ thống `TonKho`.
    *   **Kết quả:** Hệ thống chốt kho ngày 26/05/2026 hiện tại đã khớp **100% hoàn hảo** với số lượng đếm vật lý thực tế tại kho.

---

## 3. Thay Đổi Mã Nguồn Backend (Triển khai Đề xuất Tối ưu Hệ thống - Locking Period)
Chúng tôi đã sửa đổi và biên dịch thành công mã nguồn Backend tại dự án `rausachfinal/api` để triển khai giải pháp: **Khóa kỳ Chốt kho (Locking Period)**.

### 🛠 Các tệp đã chỉnh sửa:
1.  **[dathang.service.ts](file:///home/kata/Coding/rausachfinal/api/src/dathang/dathang.service.ts#L700-L718):**
    *   Bổ sung kiểm tra trước khi thực hiện giao dịch `update` đơn đặt hàng.
    *   Nếu đơn đặt hàng có ngày nhận (`ngaynhan` hoặc `createdAt`) nằm trong hoặc trước một phiên chốt kho đã được khóa (`isLocked = true`), hệ thống lập tức chặn lại và ném ra ngoại lệ `BadRequestException`.
2.  **[donhang.service.ts](file:///home/kata/Coding/rausachfinal/api/src/donhang/donhang.service.ts#L2469-L2488):**
    *   Tương tự đối với đơn bán hàng, tại phương thức cập nhật `_updateInternal`, hệ thống tự động kiểm tra ngày giao (`ngaygiao` hoặc `createdAt`) so với ngày chốt khóa sổ gần nhất. Nếu thuộc kỳ đã khóa, chặn quyền cập nhật.

### 🔬 Kết quả xác thực (Compile & Build):
*   Đã chạy kiểm tra biên dịch dự án Backend: `npm run build` tại thư mục `api`.
*   **Kết quả:** Dự án NestJS biên dịch **Thành công 100%** không phát sinh lỗi cú pháp hay kiểu dữ liệu.

---

## 4. Quy trình vận hành mới khuyến nghị
1.  **Khi đối soát đơn quá khứ:** Kế toán sẽ không thể trực tiếp sửa các đơn cũ đã qua kỳ chốt kho.
2.  **Khi cần điều chỉnh số liệu kế toán:** Kế toán phải tạo phiếu điều chỉnh ở ngày hiện tại, hệ thống sẽ tự động tạo một phiếu kho điều chỉnh tương ứng với ngày hôm nay, giúp thủ kho theo dõi ngay trên dòng thời gian thẻ kho mà không làm sai lệch chốt kho của các ngày trước.

---

## 5. Phân Tích Tác Động và Xung Đột Khi Sửa Đơn Hàng Cũ trong Quá Khứ
Nhằm làm rõ ý kiến về việc *"sửa số lượng hoặc giá tiền đơn hàng cũ không liên quan đến kho thực tại"*, chúng tôi đã phân tích chi tiết tác động và các xung đột hệ thống phát sinh nếu cho phép kế toán tự ý thực hiện hành động này:

### 5.1. Xung đột trực tiếp với Logic Kho tự động (System & Warehouse Conflict)
Dù kế toán hoặc cấp trên có thể giả định rằng việc sửa đổi này *"chỉ để khớp số liệu tài chính trên giấy tờ, không động vào hàng vật lý tại kho"*, hệ thống phần mềm lại được thiết kế theo mô hình **dữ liệu liên kết nhất quán (Data Integrity)**:
*   **Cơ chế kích hoạt tự động (Auto-trigger):** Khi sửa đổi số lượng thực nhận (`slnhan`) trên đơn hàng đã hoàn thành, hệ thống lập tức tính toán lượng chênh lệch:
    $$\Delta = \text{Số lượng nhận mới} - \text{Số lượng nhận cũ}$$
    Và tự động gọi hàm `updateTonkhoAtomic` để cộng/trừ chênh lệch này vào kho vệ tinh.
*   **Hệ quả Lệch tồn âm thầm:** Do cơ chế **Mirror Logic** của hệ thống, lượng $\Delta$ này tự động được cộng/trừ thẳng vào **Kho Tổng HCM** mà không hề sinh ra phiếu kho vật lý hay thẻ kho tại HCM. Điều này trực tiếp gây ra sự lệch số liệu nghiêm trọng giữa tồn kho hệ thống và tồn kho thực tế đếm tại kho (như đã xảy ra vào ngày 26/05/2026 với mã `I100263` và `I100259`).

### 5.2. Sai lệch về Kế toán & Tài chính (Accounting & Financial Impact)
Việc sửa ngược lịch sử (Retroactive changes) vi phạm nghiêm trọng nguyên tắc kế toán bất biến và gây ra **hiệu ứng cánh bướm (Butterfly Effect)** lên số liệu báo cáo tài chính:
*   **Giá trị tồn kho & Giá vốn hàng bán (COGS):** Hệ thống tính giá trị tồn kho theo phương pháp **Bình quân gia quyền** hoặc **FIFO**. Khi thay đổi giá tiền hoặc số lượng nhập hàng của một đơn cũ trong quá khứ, giá trị đầu vào của sản phẩm đó tại thời điểm đó thay đổi. Hệ thống sẽ tự động tính toán lại toàn bộ giá trị tồn kho và giá vốn hàng bán của các kỳ sau đó. Điều này làm thay đổi biên lợi nhuận gộp của các tháng trước vốn đã được chốt số liệu và báo cáo thuế.
*   **Xung đột chứng từ gốc:** Số liệu sửa đổi trên phần mềm sẽ hoàn toàn lệch so với hóa đơn VAT, biên bản giao nhận gốc đã ký tá với nhà cung cấp hoặc khách hàng vào thời điểm đó.
*   **Công nợ nhà cung cấp:** Thay đổi giá trị đơn hàng cũ làm sai lệch số dư công nợ của kỳ trước, gây tranh chấp số liệu khi đối chiếu công nợ cuối tháng.

### 5.3. Kết luận
*   **Giải pháp kỹ thuật đã chặn:** Đây là lý do tại sao hệ thống bắt buộc phải triển khai giải pháp chặn cập nhật đơn hàng cũ nằm trong kỳ đã khóa (`isLocked = true`) ở các file dịch vụ `dathang.service.ts` và `donhang.service.ts`.
*   **Khuyến nghị vận hành:** Kế toán tuyệt đối **không được sửa trực tiếp** vào đơn cũ. Mọi điều chỉnh về kho hoặc tài chính phải được thực hiện bằng các chứng từ phát sinh ở **thời điểm hiện tại** (như Phiếu điều chỉnh kho, Bút toán điều chỉnh tài chính/bù trừ công nợ của kỳ hiện tại) kèm ghi chú đối chiếu rõ ràng với mã đơn cũ trong quá khứ.

---

## 6. Vá lỗi Docker & Docker Compose thành công
Chúng tôi đã rà soát và xử lý triệt để 2 lỗi phát sinh khi build Docker của dự án:
1.  **Lỗi cảnh báo lỗi thời (`obsolete version`):**
    *   **Nguyên nhân:** Dòng cấu hình `version: '3.8'` ở đầu tệp `docker-compose.yml` đã lỗi thời và không còn khuyến nghị trong Docker Compose V2.
    *   **Xử lý:** Đã xóa bỏ dòng cấu hình này khỏi đầu tệp [docker-compose.yml](file:///home/kata/Coding/rausachfinal/docker-compose.yml).
2.  **Lỗi crash panic trong Docker Buildx (`panic: invalid dim (6, 0)`):**
    *   **Nguyên nhân:** Docker Buildx cố gắng hiển thị thanh tiến trình đồ họa (console rendering UI) trong một cửa sổ terminal không có kích thước dòng/cột hợp lệ, dẫn đến lỗi phân đoạn bộ nhớ (SIGSEGV) trong thư viện vt100 của Go.
    *   **Xử lý:** Thiết lập biến môi trường `BUILDKIT_PROGRESS=plain` khi chạy lệnh để chuyển thanh tiến trình sang chế độ dòng văn bản đơn giản.
    *   **Kết quả:** Chạy thử nghiệm lệnh `BUILDKIT_PROGRESS=plain docker compose build` đã biên dịch và đóng gói thành công các Container Backend (`berausach`) và Frontend (`ferausach`) **100% thành công không còn cảnh báo hay crash**.
