# Báo Cáo Tổng Hợp Vấn Đề & Phương Án Xử Lý Dứt Điểm Hệ Thống Rau Sạch Trần Gia
**Ngày lập:** 16/04/2026  
**Người tổng hợp:** Antigravity AI (Dựa trên dữ liệu đối soát 08/04 - 16/04)

---

## I. TỔNG HỢP VẤN ĐỀ CỐT LÕI (WHERE IS THE PROBLEM?)

Dựa trên các báo cáo từ ngày 11/04 đến 16/04, hệ thống đang gặp lỗi tại 3 "điểm nghẽn" chính:

### 1. Lỗi Logic Kỹ Thuật (Technical Bugs)
*   **Lỗ hổng "Ngày nhận" (Date-Range Filtering):** Hệ thống đặt hàng chỉ quét các đơn hàng có ngày nhận *khớp chính xác* với ngày hiện tại. Các đơn bị trễ hoặc hàng đang đi từ ngày hôm trước bị "bốc hơi" khỏi tính toán, dẫn đến việc gợi ý đặt thừa hàng (Trường hợp Dưa hấu I100479 thừa 99kg).
*   **Lỗi "Đa kho nhầm lẫn" (Cross-Warehouse Aggregation):** Hàm tính toán tồn kho (`calculateStockFromLogs`) bị mất bộ lọc `khoId`. Hệ thống lấy tổng tồn cả chuỗi (HCM + SG2 + Long An) hiển thị cho một kho duy nhất, gây ảo giác dư hàng hoặc lệch số liệu Snapshot cực nặng.
*   **Thiếu Baseline (Dữ liệu nền):** Các sản phẩm mới (như Bún nhỏ I100256) chưa được reset về 0 hoặc chốt kho lần đầu, dẫn đến việc mang theo "rác dữ liệu" hàng vạn kg từ quá khứ.

### 2. Lỗi Vận Hành (Operational Gaps)
*   **"Xuất trước - Nhập sau":** Nhân viên xác nhận xuất hàng trước khi bấm nhận phiếu nhập từ nhà cung cấp, khiến tồn kho hệ thống bị âm (Dưa hấu, Ớt đỏ thường xuyên bị âm).
*   **Sai lệch Mapping Kho:** Hàng thực tế về kho HCM nhưng phiếu nhập lại được ghi nhận vào kho SG2 hoặc Long An. Hệ thống tại HCM không thấy hàng, tiếp tục báo thiếu.

### 3. Thiếu Công Cụ Tự Động
*   Chưa có quy trình **"Chuyển Kho"** tự động giữa Kho Tổng và Siêu Thị; hiện tại đang làm thủ công hoặc dùng phiếu Nhập/Xuất rời rạc dễ gây sai sót.

---

## II. HƯỚNG XỬ LÝ CHI TIẾT CHO TỪNG BỘ PHẬN

### 1. Bộ Phận Kỹ Thuật (Dev Team) - ƯU TIÊN 1
*   **Xử lý Query đặt hàng:** Sửa code tại `nhucaudathang.resolver.ts`, thay đổi điều kiện lọc `ngaynhan = today` thành `ngaynhan <= today` đối với các phiếu có trạng thái `dadat`.
*   **Khôi phục bộ lọc Kho:** Cập nhật `chotkho.service.ts` để đảm bảo mọi tính toán Snapshot phải luôn gắn chặt với `khoId` cụ thể.
*   **Triển khai Module Chuyển Kho:** Hoàn thiện logic Transaction: `Giảm tồn Kho A -> Tăng tồn Kho B` trong một thao tác duy nhất.
*   **Vá lỗi hiển thị Excel:** Thêm Border và định dạng Sheet Order cho bộ phận Siêu thị theo yêu cầu ngày 08/04.

### 2. Bộ Phận Kho & Vận Hành (Warehouse) - ƯU TIÊN 2
*   **Kỷ luật nhập liệu:** Yêu cầu bấm "Xác nhận đã nhận" **NGAY LẬP TỨC** khi hàng về đến kệ. Tuyệt đối không để xảy ra tình trạng hàng đã bán nhưng phiếu nhập vẫn treo.
*   **Kiểm tra mã Kho:** Khi nhận hàng, phải đối soát đúng tên Kho trên hệ thống (VD: HCM, SG2, Long An) để tránh lệch Snapshot.
*   **Chốt kho định kỳ:** Thực hiện bấm "Lưu Chốt Kho" cuối mỗi phiên (sáng/chiều) để hệ thống ghi đè số thực tế lên số ảo, tránh lỗi dồn tích log.

### 3. Bộ Phận Mua Hàng (Purchasing/Procurement)
*   **Quy trình đối soát chéo:** Trước khi xác nhận đặt hàng, phải so sánh "Tồn cuối ngày hôm trước" và "Tồn đầu ngày hôm nay". Nếu lệch >10% (như vụ Dưa hấu 500kg), phải dừng đặt hàng và yêu cầu IT kiểm tra lỗi bóng ma (Ghost Stock).
*   **Xử lý hàng tồn:** Ưu tiên xuất hàng theo FIFO (nhất là hàng tươi sống như Dưa hấu) để tránh hư hỏng do hàng mới đè hàng cũ trên hệ thống.

### 4. Bộ Phận Kế Toán/Admin
*   **Reset Baseline:** Chạy script đưa tồn kho của các mã lỗi nặng (Bún nhỏ - 11k kg) về đúng thực tế (0 hoặc số kiểm đếm gần nhất).
*   **Giám sát hao hụt:** Áp dụng công thức `Hao hụt = Tồn ST - (Thực tế + Hàng hủy)` để truy thu hoặc điều chỉnh định mức sơ chế.

---

## III. CÁC VẤN ĐỀ KỸ THUẬT ĐÃ XỬ LÝ XONG (RESOLVED)

Tính đến 09:15 ngày 16/04/2026, các lỗi kỹ thuật nghiêm trọng đã được Antigravity AI xử lý triệt để:

1.  ✅ **Sửa lỗi "Bốc hơi" 500kg dưa hấu:** Cập nhật logic lọc theo ngày trong `getNhuCauDatHang`. Hệ thống giờ đây đã bao quát toàn bộ các đơn hàng NCC đang về (Pending arrivals) từ quá khứ, không chỉ lọc riêng ngày hiện tại.
2.  ✅ **Sửa lỗi "Cộng dồn đa kho" sai lệch:** Khôi phục bộ lọc `khoId` trong hàm tính toán Snapshot. Đảm bảo tồn kho chi nhánh nào chỉ tính dựa trên log giao dịch của chi nhánh đó, không bị cộng nhầm hàng từ kho khác.
3.  ✅ **Sửa lỗi cập nhật Tồn kho tổng (TonKho):** Thay đổi logic chốt kho. Khi chốt một chi nhánh, hệ thống tự động tính toán lại Tổng tồn thực tế trên toàn chuỗi bằng cách SUM tất cả các kho, tránh việc ghi đè số lẻ của một kho lên tổng cục.
4.  ✅ **Sửa lỗi Transaction Chuyển Kho:** Đồng bộ hóa cách sử dụng khóa chính (`sanphamId_khoId`) trong `PhieukhoService`. Giúp các giao dịch luân chuyển hàng giữa các kho không còn bị lỗi trùng lặp dữ liệu.
5.  ✅ **Kích hoạt Kẻ ô Excel (Borders):** Cấu hình `cellStyles: true` cho toàn bộ các module xuất file. Các báo cáo Excel từ nay sẽ có đầy đủ đường kẻ khung, chuyên nghiệp và dễ đọc hơn.

---

## IV. CÁC ĐIỂM CẦN XÁC MINH LẠI ĐỂ XỬ LÝ DỨT ĐIỂM

Để kết thúc tình trạng lệch số này, cần làm rõ 3 câu hỏi sau với các bên liên quan:

1.  **Xác minh trạng thái 500kg Dưa hấu (Ngày 15/04):** Thực tế 500kg này đã nhập kho HCM chưa? Hay vẫn đang nằm tại kho Long An/đang trên đường đi? (Cần kho Long An xác nhận phiếu xuất).
2.  **Xác minh quy trình xác nhận hàng Siêu thị:** Bộ phận Siêu thị đang lấy hàng trực tiếp từ HCM hay từ NCC khác? Nếu lấy từ HCM, bắt buộc phải dùng phiếu **"Chuyển Kho"**, không được dùng phiếu "Xuất" vì sẽ làm mất dấu vết hàng hóa trong chuỗi.
3.  **Kiểm tra số liệu Bún nhỏ:** Con số 11.726kg trên hệ thống ngày 13/04 xuất phát từ đâu? (Cần kiểm tra lại lịch sử nhập hàng từ đầu tháng 4 để xem có ai nhập nhầm đơn vị tính kg thành gram hay không).

---
**Tài liệu tham chiếu:**
- [Báo cáo Dưa hấu 16/04](file:///mnt/chikiet/kata2025/rausachfinal/doisoat/Rau%20S%E1%BA%A1ch%20Tr%E1%BA%A7n%20Gia%20-%20Web%20+%20App%20%5B16-04-2026%2008_20%5D/Bao_cao_nguyen_nhan_Dua_hau.md)
- [Báo cáo đối soát 13/04](file:///mnt/chikiet/kata2025/rausachfinal/doisoat/Bao_cao_doi_soat_13042026.md)
- [Tổng hợp yêu cầu Fixbug](file:///mnt/chikiet/kata2025/rausachfinal/docs/fixbug/TONG_HOP_FIXBUG_20260408.md)
