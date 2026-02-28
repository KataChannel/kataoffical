# 📊 Hướng Dẫn Phân Tích Chỉ Số Nhu Cầu Đặt Hàng & Review Sản Phẩm

Tài liệu này tổng hợp ý nghĩa các chỉ số trong hệ thống **Nhu cầu đặt hàng** (Ordering Demand) và đánh giá chi tiết cho các mã sản phẩm cụ thể.

---

## I. Giải Thích Các Cột & Công Thức Tính Toán

Hệ thống giúp tối ưu hóa việc nhập hàng bằng cách tính toán nhu cầu thực tế dựa trên các chỉ số sau:

### 1. Chỉ số Nhu cầu (Đầu ra)
*   **🛒 TỔNG ĐẶT (KHÁCH) (`khachdat`):** Tổng số lượng khách hàng đã đặt (trạng thái đơn hàng là `Đã đặt`) nhưng chưa xử lý giao.
*   **📦 TỔNG BÁN (GIAO) (`khachgiao`):** Tổng số lượng thực tế đã thực hiện giao hàng thành công hoặc đang vận chuyển.

### 2. Chỉ số Tồn kho (Đầu vào)
*   **💻 Tồn Hệ Thống (`slton`):** Số lượng tồn kho lý thuyết được ghi nhận trên phần mềm qua các nghiệp vụ nhập/xuất/bán.
*   **✅ Tồn Chốt Kho (`sltontt`):** Số lượng thực tế kiểm kê được tại lần chốt kho gần nhất. Đây là con số tin cậy nhất.
*   **🏢 Tồn Kho Nhánh (`kho1` -> `kho6`):** Số lượng hàng đang được đặt hoặc luân chuyển tại các kho phụ (Long An, Đà Lạt, HCM, SG1, SG2...).
*   **🏗️ TỔNG TỒN HIỆN CÓ (`tongkho`):** Tổng hợp tất cả nguồn hàng đang có sẵn hoặc sắp nhập về.
    *   **Công thức:** `tongkho = (∑ kho1...kho6) + sltontt`

### 3. Chỉ số Hao hụt & Gợi ý
*   **📉 Tỉ Lệ Hao Hụt (`haohut`):** Phần trăm dự kiến hàng bị hỏng, bay hơi hoặc thất thoát (theo đặc thù từng loại sản phẩm).
*   **⚠️ SL Hao Hụt (`slhaohut`):** Lượng hàng bù đắp cho phần hao hụt dựa trên đơn khách.
    *   **Công thức:** `slhaohut = khachdat * (haohut / 100)`
*   **💡 SL CẦN ĐẶT (GỢI Ý) (`goiy`):** Con số quyết định lượng hàng cần nhập từ Nhà cung cấp (NCC).
    *   **Công thức:** `goiy = khachdat + slhaohut - tongkho`

---

## II. Review Chi Tiết 3 Sản Phẩm Mục Tiêu

Dựa trên cấu trúc dữ liệu, dưới đây là phân tích cho 3 mã sản phẩm yêu cầu:

### 1. 🟢 Bánh Canh Bột Gạo (Mã: `I100248`)
*   **Thông tin:** ĐVT: `Kg` | Giá gốc: 15,000đ.
*   **Đặc tính:** Hàng thực phẩm tươi, hạn sử dụng ngắn.
*   **Phân tích:** 
    *   Yêu cầu độ chính xác cao về thời gian nhập hàng.
    *   Màu sắc **Gợi ý**: Nếu hiện màu đỏ (>0), cần nhập ngay để đóng gói đơn hàng trong ngày.
    *   Hao hụt thường thấp, ưu tiên kiểm soát tồn thực tế (`sltontt`) để tránh hàng cũ.

### 2. 🍉 Dưa hấu (Mã: `I100479`)
*   **Thông tin:** ĐVT: `Kg` | Giá gốc: 12,000đ.
*   **Đặc tính:** Trọng lượng lớn, dễ dập vỡ, hao hụt cao khi để lâu.
*   **Phân tích:**
    *   Cần đặc biệt chú ý cột **Tỉ Lệ Hao Hụt**. Nếu đang mùa nắng nóng, cần chỉnh tỉ lệ này cao hơn để hệ thống gợi ý nhập dôi dư hàng, đảm bảo đủ quả đạt chất lượng giao khách.
    *   Kiểm tra kỹ **Tổng tồn các kho** để tránh nhập chồng chéo khi kho nhánh vẫn còn hàng.

### 3. 🥚 Trứng vịt muối (Mã: `I100275`)
*   **Thông tin:** ĐVT: `Quả` | Giá gốc: 3,600đ.
*   **Đặc tính:** Hàng khô/đóng gói, bảo quản lâu dài.
*   **Phân tích:**
    *   Đơn vị tính là `Quả`, cần kiểm kê số lượng lẻ chính xác.
    *   Nếu **Gợi ý** hiện số âm (màu xanh/xám), nghĩa là kho đang dư nhiều, tuyệt đối không nhập thêm để tránh đọng vốn.
    *   Ít chịu ảnh hưởng bởi hao hụt biến động hàng ngày.

---

## III. Hướng Dẫn Vận Hành Nhanh

| Màu sắc chỉ số Gợi ý | Ý nghĩa | Hành động đề xuất |
| :--- | :--- | :--- |
| **Đỏ rực (Số dương)** | **THIẾU HÀNG** | Tạo đơn đặt NCC ngay lập tức đúng số lượng gợi ý. |
| **Xanh/Xám (Số âm)** | **DƯ HÀNG** | Không nhập thêm. Kiểm tra hạn sử dụng để đẩy bán sớm. |
| **Cảnh báo (Warning)** | **TỒN QUÁ CAO** | Tồn kho thực tế vượt xa nhu cầu khách đặt. Cần xả hàng hoặc chuyển kho. |

---
*Tài liệu được tổng hợp tự động dựa trên cấu trúc hệ thống Rausach Final - 2026.*
