# Báo cáo Điều tra Sự cố Tồn kho: Sản phẩm Dưa hấu (I100479)
**Ngày báo cáo:** 16/04/2026  
**Thời hạn phản hồi:** Trước 10:00 sáng  
**Mục tiêu:** Xác định nguyên nhân lệch tồn và việc đặt hàng thừa 99kg.

---

## 1. Tóm tắt Diễn biến Dữ liệu

| Chỉ số | Hình 1 (Ngày 15/04) | Hình 2 (Ngày 16/04) | Biến động |
| :--- | :--- | :--- | :--- |
| **Tổng tồn (Tổng cộng)** | **510.8 kg** | **99 kg** | 📉 Giảm 411.8 kg |
| **Kho TG-LON (Long A)** | 500 kg | 0 kg | 🔴 Biến mất |
| **Kho SG2** | 0 kg | 99 kg | 🟢 Xuất hiện mới |
| **Tồn cuối sau bán** | ~447.8 kg (Dự kiến dư) | 22 kg | - |

---

## 2. Phân tích Nguyên nhân Gốc rễ

### A. Lỗi Hệ thống (Dữ liệu không kế thừa)
- **Sự cố:** Khoản tồn **500kg tại kho TG-LON** trong ngày 15/04 đã **hoàn toàn bị loại bỏ** khỏi báo cáo tính toán ngày 16/04. 
- **Hệ quả:** Vì hệ thống báo cáo ngày 16/04 không nhìn thấy 500kg này, công thức tính toán "SL Cần Đặt" bị sai lệch, dẫn đến việc báo cáo coi như kho đã hết hàng hoặc chỉ còn rất ít (99kg trong SG2).
- **Điểm bất thường:** Tại sao 500kg biến mất? Có thể do lỗi Mapping kho hoặc một thao tác Reset Baseline (Chốt kho) thủ công đã ghi đè số 0 lên kho TG-LON mà không kiểm tra thực tế.

### B. Lỗi Con người (Quy trình đặt hàng)
- **Sai sót:** Nhân viên phụ trách đặt hàng đã **dựa hoàn toàn vào con số 0 hoặc số thấp trên báo cáo sáng 16/04** mà không đối chiếu với số dư cực lớn (447kg surplus) từ chiều ngày 15/04.
- **Hành động sai:** Thay vì kiểm tra tại sao kho TG-LON biến mất, nhân viên đã tiến hành xác nhận/đặt thêm hoặc nhập thêm **99kg** vào kho SG2.
- **Kết luận:** Đây là sự kết hợp giữa **Dữ liệu hệ thống sai** và **Sự thiếu cẩn trọng của con người** trong việc kiểm tra tính logic của số liệu trước khi ra quyết định đặt hàng.

---

## 3. Hậu quả thực tế
1.  **Hàng tồn chồng chất:** Thực tế kho có thể đang có ~500kg (cũ) + 99kg (mới) = ~600kg dưa hấu.
2.  **Rủi ro hao hụt:** Dưa hấu là hàng tươi sống, việc không bán hàng cũ trước (FIFO) và nhập thêm hàng mới sẽ dẫn đến rủi ro hư hỏng (hủy bỏ) toàn bộ lô 500kg cũ.
3.  **Tài chính:** Tăng công nợ nhà cung cấp vô ích và lãng phí diện tích kho bãi.

---

## 4. Kiểm tra Sâu Hệ thống (Core Logic Tracking)

Sau khi truy quét mã nguồn xử lý báo cáo tại `nhucaudathang.resolver.ts`, Kiệt đã phát hiện ra lỗ hổng logic nghiêm trọng dẫn đến việc "bốc hơi" 500kg:

- **Lỗi Lọc dữ liệu theo Ngày (Date-Range Filtering Bug):**
    - Hệ thống tính toán "Hàng đang về" và "Tồn các kho" bằng cách lọc các phiếu Đặt hàng (Dathang) có `ngaynhan` **khớp chính xác** với ngày báo cáo.
    - Phiếu 500kg có ngày nhận là **15/04**. Khi anh xem báo cáo ngày 15/04, nó hiện ra bình thường.
    - Tuy nhiên, khi anh xem báo cáo ngày **16/04**, hệ thống chỉ quét các phiếu có ngày nhận là 16/04. Phiếu ngày 15/04 (dù chưa được bấm "Đã nhận") bị **loại bỏ hoàn toàn** khỏi tính toán.
    - **Kết luận:** Hệ thống đang "quên" các đơn hàng bị trễ hoặc hàng đang đi đường từ ngày hôm trước nếu chúng không có ngày nhận là ngày hôm nay.

- **Tại sao lại đặt thêm 99kg?**
    - Vì báo cáo 16/04 "không thấy" 500kg (do lỗi lọc ngày), Tồn kho thực tế hiển thị chỉ còn rất thấp (Sổ sách cũ).
    - Hệ thống gợi ý mua thêm để bù vào lượng thiếu hụt ảo này.
    - Con số 99kg có thể là một đơn bổ sung hoặc hàng về đúng ngày 16/04 nên mới hiển thị lên.

---

## 5. Hành động Khẩn cấp (Action Plan)

1.  **Sửa Code (Dành cho Dev):** Cần điều chỉnh logic truy vấn `getNhuCauDatHang` để lấy tất cả các phiếu `Dathang` có status là `dadat` (đã đặt) có ngày nhận **nhỏ hơn hoặc bằng** ngày báo cáo hiện tại (Thay vì chỉ lấy bằng).
2.  **Khởi tạo lại Baseline (Reset):** Cần bấm "Lưu Chốt Kho" ngay lập tức cho mã Dưa hấu để đồng bộ Thực tế -> Hệ thống, xóa sạch lỗi bóng ma này.
3.  **Xử lý số liệu "Ma" (Ghost Stock):** Đối với mã **I100479**, việc chốt kho về thực tế sẽ giúp hệ thống dừng việc gợi ý đặt hàng sai.
4.  **Chốt chặn quy trình:** Yêu cầu bộ phận mua hàng (Purchasing) phải so sánh "Tồn cuối ngày hôm trước" vs "Tồn đầu ngày hôm sau", nếu lệch >10% phải báo cáo dừng đặt hàng để kiểm tra.

---

## 6. Phân tích Chuyên sâu về Quy trình Hệ thống (Deep Dive Analysis)

Qua quá trình kiểm tra mã nguồn, Antigravity AI phát hiện thêm các rủi ro tiềm ẩn có thể gây ra những sai lệch tương tự trong tương lai nếu không được xử lý:

### A. Rủi ro khi mặc định trạng thái "Đã nhận" (danhan)
- **Vấn đề:** Có ý kiến đề xuất mặc định các đơn hàng là `danhan` ngay khi tạo.
- **Phân tích:** Việc này cực kỳ nguy hiểm vì nó tạo ra **Tồn kho ảo**. Hệ thống cộng tồn kho ngay cả khi hàng còn đang trên xe tải. Điều này dẫn đến việc Sale bán hàng không có thực, đồng thời làm mất khả năng theo dõi "Hàng đang về" - nguyên nhân chính gây ra việc đặt hàng thừa.
- **Khuyến nghị:** Giữ nguyên quy trình 2 bước: `Dadat` (Chờ hàng) -> `Danhan` (Nhập kho thực tế).

### B. Lỗ hổng tại tính năng "Upload Chốt kho" (Baseline Reset)
- **Phát hiện:** Logic hiện tại trong `chotkho.service.ts` khi thực hiện chốt kho đang thực hiện lệnh reset "mạnh tay": ép toàn bộ `slchonhap` (Hàng đang về) về **0**.
- **Hệ quả trực tiếp:** Đây chính là lý do lô hàng 500kg biến mất. Khi một phiên chốt kho được tạo ra (thủ công hoặc upload file), hệ thống xóa sạch dấu vết các đơn hàng đang đi đường, khiến báo cáo mua hàng tin rằng không còn hàng nào sắp về.
- **Khuyến nghị sửa đổi:** Điều chỉnh code tại phần xử lý upload chốt kho: Thay vì gán `slchonhap = 0`, hệ thống cần tính toán lại dựa trên các đơn `dadat` hiện có để bảo toàn số lượng hàng thực sự đang trên đường về.

### C. Thiếu cơ chế cảnh báo khi Chốt kho
- **Vấn đề:** Khi nhân viên upload file chốt kho, hệ thống **không hề đưa ra bất kỳ cảnh báo nào** nếu sản phẩm đó đang có đơn đặt hàng chưa về (`slchonhap > 0`).
- **Rủi ro:** Người dùng hoàn toàn không biết rằng hành động bấm "Lưu" của mình sẽ xóa sạch số liệu hàng đang về trên hệ thống. 
- **Đề xuất:** Bổ sung Pop-up cảnh báo: *"Sản phẩm này hiện đang có hàng đang trên đường về, bạn có chắc chắn muốn chốt kho và xóa số liệu này không?"*

---

## 7. Timeline Biến động Dữ liệu Chi tiết từng Sản phẩm (01/04/2026 - Nay)

| Ngày | Mã SP | Tên Sản Phẩm | Sự kiện | Hệ thống | Thực tế | Trạng thái / Đánh giá lỗi | Thực hiện |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **11/04** | I100256 | Bún nhỏ | Khởi tạo | 11,726 | 0 | **Lỗi Baseline:** Rác dữ liệu từ lúc cài đặt. | Hệ thống |
| **11/04** | I100479 | Dưa hấu | Nhập kho | -138.8 | 20 | **Lỗi Mapping:** Nhập nhầm kho khác. | Con người |
| **13/04** | I100479 | Dưa hấu | Đối soát S | -18.5 | 18 | **Lỗi Quy trình:** Xuất trước khi nhập. | Con người |
| **13/04** | I100164 | Ớt đà lạt (đỏ) | Đối soát S | -4.2 | 3.4 | **Lỗi Quy trình:** Xuất trước khi nhập. | Con người |
| **13/04** | I100004 | Bắp chuối bào | Đối soát S | -4.9 | 0 | **Lỗi Vận hành:** Chưa chốt thực tế. | Con người |
| **13/04** | I100233 | Trứng gà | Chốt kho | 144 | 144 | ✅ **Dữ liệu khớp thực tế.** | Con người |
| **13/04** | I100002 | Bắp cải tím | Chốt kho | 14.7 | 14.7 | ✅ **Dữ liệu khớp thực tế.** | Con người |
| **13/04** | I100207 | XL lolo xanh | Chốt kho | 19.6 | 0 | **Lỗi Đồng bộ:** DB cao hơn thực tế. | Hệ thống |
| **15/04** | I100479 | Dưa hấu | Nhập NCC | 518 | 518 | ✅ **Hàng về 500kg chờ nhập.** | Con người |
| **16/04** | **I100479** | **Dưa hấu** | **Chốt kho** | **-72.3** | **0** | **Lỗi Logic:** Xóa mất 500kg hàng đang về. | **Hệ thống** |
| **16/04** | I100164 | Ớt đà lạt (đỏ) | Chốt kho | -21.8 | 3.2 | **Lỗi Hệ thống:** Mất Log hàng đang về. | Hệ thống |
| **16/04** | I100003 | Bắp cải trắng | Chốt kho | -126.2 | 9.5 | **Lỗi Hệ thống:** Mất Log hàng đang về. | Hệ thống |
| **16/04** | I100233 | Trứng gà | Chốt kho | 87 | 112 | **Hao hụt:** Lệch 25 đơn vị chưa rõ. | Con người |
| **16/04** | I100207 | XL lolo xanh | Chốt kho | -248.0 | 0 | **Lỗi Logic:** Xuất không mốc chuẩn. | Hệ thống |
| **16/04** | I100256 | Bún nhỏ | Reset BL | 0 | 0 | ✅ **Đã xóa sạch 11k ảo.** | Hệ thống |

---

## 8. Quy trình Khởi tạo & Vận hành Chuẩn (Standard Operating Procedure)

Để đảm bảo hệ thống "bắt đầu đúng" và dữ liệu luôn khớp tại mọi thời điểm, cần áp dụng nghiêm ngặt quy trình sau:

### Bước 1: Thiết lập "Điểm chuẩn" (Baseline Initialization)
- **Hành động:** Thực hiện "Lưu Chốt Kho" (Snapshot) cho toàn bộ danh mục sản phẩm.
- **Mục tiêu:** Xóa bỏ mọi sai lệch tích tụ từ quá khứ (như vụ Bún nhỏ 11 nghìn kg). Khi Baseline đã chuẩn (về thực tế), mọi giao dịch nhập/xuất sau đó sẽ được cộng/trừ chính xác vào mốc này.

### Bước 2: Kỷ luật Chứng từ (Real-time Documentation)
- **Nguyên tắc "Nhập trước - Xuất sau":** Tuyệt đối không xác nhận các đơn hàng bán ra (xuất kho) nếu chưa xác nhận phiếu nhập hàng từ nhà cung cấp lên hệ thống. Việc này sẽ triệt tiêu lỗi Snapshot âm.
- **Xác nhận ngay:** Hàng về đến kho phải được bấm "Đã nhận" (`danhan`) ngay lập tức trên App/Web. Không được để đơn treo ở trạng thái `dadat` quá ngày nhận dự kiến.

### Bước 3: Cơ chế Chốt chặn đối soát (Reconciliation Protocol)
- **Thời điểm chốt:** Thực hiện chốt kho định kỳ (ít nhất 1 lần/ngày vào cuối ca).
- **Kiểm tra chéo:** Trước khi bấm "Lưu Chốt Kho", nhân viên phải đối chiếu cột **Snapshot** (hệ thống tính) vs **Thực tế** (đếm tay).
    - Nếu lệch < 1%: Chấp nhận hao hụt tự nhiên.
    - Nếu lệch > 5%: Dừng chốt kho, kiểm tra ngay các phiếu nhập/xuất bị sót trong ngày.

### Bước 4: Kiểm soát Nhu cầu Đặt hàng (Purchasing Control)
- **Quy trình 3 bên:** Mua hàng (Purchasing) phải xem báo cáo nhu cầu nhưng **bắt buộc** nhìn vào 2 chỉ số: `slton` (thực có) và `slchonhap` (đang về).
- **Cảnh báo bất thường:** Nếu thấy tồn kho hôm nay và hôm qua lệch > 20% mà không có đơn bán tương ứng, phải gọi điện xác nhận trực tiếp với thủ kho trước khi bấm đặt hàng nhà cung cấp.

---
**Người thực hiện:** Antigravity AI (Check theo yêu cầu của Kiệt)  
**Vị trí file:** `/mnt/chikiet/kata2025/rausachfinal/doisoat/Rau Sạch Trần Gia - Web + App [16-04-2026 08_20]/Bao_cao_nguyen_nhan_Dua_hau.md`
