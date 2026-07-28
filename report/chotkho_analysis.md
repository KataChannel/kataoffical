# Báo Cáo Phân Tích Chốt Kho - Tồn Thực Tế & Số Lượng Hệ Thống

## 1. Cơ Chế Ghi Nhận "Số Lượng Tồn Hệ Thống" & "Tồn Thực Tế"
Dựa vào phân tích kiến trúc database (Prisma Schema) và Backend (NestJS), hệ thống quản lý xuất nhập tồn **thực sự phân tách và lưu trữ độc lập hai loại số lượng tồn kho này**:

### A. Realtime (Biến động theo hệ thống)
*   **Trường Dữ Liệu:** `slton` (số lượng tồn) nằm trong model `TonKho`.
*   **Đặc Điểm:** Con số này liên tục thay đổi realtime mỗi khi có các nghiệp vụ phát sinh (Ví dụ: tạo đơn hàng, giao hàng, nhập kho, xuất kho).

### B. Tồn Thực Tế Cuối Ngày (Từ kiểm kê kho)
*   **Trường Dữ Liệu:** `sltontt` (số lượng tồn thực tế) nằm trong model `TonKho`.
*   **Đặc Điểm:** Con số này được ghi nhận lại thông qua nghiệp vụ kiểm kê kho/chốt kho cuối ngày. Nó không bị tự động làm thay đổi bởi các giao dịch mua bán realtime.

### C. Quá Trình "Chốt Kho"
Mỗi khi nhân viên thực hiện tính năng "Chốt Kho", Backend (file `chotkho.service.ts`) sẽ tạo ra các record trong bảng `Chotkhodetail` bảo lưu cứng toàn bộ trạng thái sống tại chính thời điểm chốt đó:
*   `sltonhethong`: Chốt cứng "Tồn hệ thống" lúc đó.
*   `sltonthucte`:  Chốt cứng "Tồn thực tế" lúc đó.
*   `slhuy`:        Số lượng huỷ.

**=> Kết Luận:** Hai dữ liệu `slton` và `sltontt` chạy song song với nhau rất an toàn. Việc bạn nhập "Tồn thực tế cuối ngày" sẽ không ghi đè, làm mất, hay làm hỏng "SL Tồn Hệ Thống". 

---

## 2. Thêm Cột Chênh Lệch
Việc bổ sung thêm 1 cột "Chênh lệch" (Sẽ hiển thị kết quả của: *Tồn Thực Tế C.Ngày - SL Tồn realtime*) là **100% khả thi và dễ dàng thực hiện** trên trang "Xuất Nhập Tồn" (như theo ảnh cung cấp).

### Lý Do:
1.  **Backend Đã Hỗ Trợ:** Dưới Database đã có sẵn logic tính toán chênh lệch (trường `chenhlech`) thông qua quy tắc: `Chênh Lệch = SL Tồn Hệ Thống - SL Tồn Thực Tế - SL Huỷ` trong các tính năng lưu chốt kho.
2.  **Frontend Đã Có Đủ Dữ Liệu:** Trên Table hiển thị danh sách sản phẩm, cả `slton` và `sltontt` đều đang được fetch về sẵn cho từng `row`. 

### Hướng Triển Khai Nếu Muốn Mở Rộng:
Chỉ cần thực hiện 2 thay đổi nhỏ trên mã nguồn Frontend tại màn hình danh sách:

*   **File TS (`xuatnhapton.component.ts`):** 
    Khai báo thêm cột mới định nghĩa `chenhlech` vào mảng các cột được phép hiển thị (`displayedColumns` và `ColumnName`).
    
*   **File HTML (`xuatnhapton.component.html`):**
    Thêm đoạn code tạo cột vào trong bảng chứa biểu thức toán học dạng như `{{ row.sltontt - row.slton }}` để nó render số chênh lệch trực tiếp tại thời điểm xem.

---

## 3. Logic Cập Nhật Tồn Kho Qua Chức Năng "Upload File Excel"
*(Tại màn hình Nhu Cầu Đặt Hàng - `nhucaudathang.component.ts`)*

Dựa trên việc kiểm tra chi tiết mã nguồn chức năng **`Capnhattonkho()`** (tiến trình upload file Excel cập nhật tồn kho), quá trình xử lý đang diễn ra như sau:

### Trả lời câu hỏi: Từ 100 -> nhập 0 vào file -> Hệ thống xử lý thế nào?
**=> Kết quả:** Hệ thống sẽ **GHI NHẬN LÀ 0 SẢN PHẨM** (Sản phẩm bị đưa về số tồn kho bằng 0). 

### Chi tiết cách logic đang hoạt động (Nguồn: code nội hàm `Capnhattonkho`):
1. **Xử lý số lượng từ file:** Khi hệ thống đọc file, nếu phát hiện cột tồn bị bỏ trống, là giá trị `<= 0`, hệ thống sẽ **ép kiểu bắt buộc số lượng về `0`** tại dòng lệnh:
   `if (isNaN(slton) || slton == null || slton <= 0) { slton = 0; }`
2. **Cập nhật dữ liệu cũ (`allTonkho`):** Hệ thống lấy danh sách toàn bộ sản phẩm đang có thông tin Tồn Kho và duyệt qua từng cái một.
   - Nếu mã sản phẩm có mặt trong file Excel: Dữ liệu biến được gắn bằng giá trị file Excel (trường hợp bạn điền 0, giá trị là 0).
   - **Rất nguy hiểm:** Nếu mã sản phẩm **không có** trong file Excel, hệ thống vẫn mang dữ liệu đó ra cập nhật và do giá trị khởi tạo biến là `0` - nó nhận giá trị `0`. 
3. **Cập nhật vào Database:** 
   Hệ thống gửi lệnh đè trực tiếp xuống Database cho mọi sản phẩm đang duyệt:
   `await this._GraphqlService.updateOne('tonkho', ..., { sltontt: newSltontt, slton: newSltontt })`

### Đánh giá Hệ Luỵ & Rủi Ro (Rất quan trọng):
Khi bạn upload file Excel từ tính năng "Cập Nhật Tồn Kho", thao tác này đang mang nhiều rủi ro nếu áp dụng thực tế:
1. Giá trị Tồn kho lấy từ Excel sẽ **chép đè bằng nhau** cho cả 2 trường `sltontt` & `slton`. (Cấu trúc song song an toàn ở Mục 1 sẽ bị vô hiệu hoá trên các sản phẩm bị chép đè).
2. Những sản phẩm đang có tồn (ví dụ 100) nếu bị điền giá trị 0 hoặc **Thậm chí bị xoá lọt dòng trong file Excel**, hệ thống mặc định coi là 0 và **Reset trực tiếp số lượng kho của các sản phẩm đó về 0**. 
3. Ở chức năng này, kho bị thay đổi kiểu Master-Overwrite (đè thẳng vào core DB) thay vì tạo hoá đơn bù đắp tự động qua Phiếu Xuất/Nhập (Giống như logic ở màn hình `Xuất Nhập Tồn` gốc). Lịch sử truy xuất biến động số dư sẽ bị đứt gãy.
