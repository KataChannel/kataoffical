# QUY TẮC ĐỐI SOÁT & CHỐT KHO BASELINE (RECONCILIATION & BASELINE RULES)

Tài liệu này tổng hợp các quy tắc đối soát số liệu tồn kho, xử lý baseline về 0 và cơ chế quy đổi đặc thù áp dụng cho hệ thống quản lý kho Rau Sạch Trần Gia.

---

## 1. Quy Tắc Đối Soát Chung & Chốt Baseline

### 1.1. Quy tắc triệt tiêu kho âm (Chỉ áp dụng khi sản phẩm không có trong Excel)
*   **Tồn hệ thống bị âm (Không có trong Excel):** Nếu một sản phẩm **không xuất hiện trong file Excel** kiểm kho nhưng có **số tồn hệ thống âm (`sltonhethong < 0`)** trước khi chốt kho, hệ thống sẽ **tự động reset cả tồn hệ thống và tồn thực tế chốt về 0**.
*   **Sản phẩm có trong Excel:** Luôn lấy số tồn thực tế từ Excel để cập nhật. Tuy nhiên, nếu tồn hệ thống của sản phẩm bị âm, tồn hệ thống sẽ được tự động đưa về `0` để tránh âm ảo lũy kế.
*   **Ghi chú trong DB:** `Tự động reset kho âm về 0 (Rules.md)` hoặc `Cập nhật từ Excel (Tồn hệ thống âm tự động reset về 0)`
*   **Độ ưu tiên:** Quy tắc triệt tiêu kho âm được ưu tiên kiểm tra đầu tiên trong nhóm các sản phẩm không có trong Excel (áp dụng trước cả nhóm tự động chuyển qua như Bắp, Dưa hấu...).

### 1.2. Nhóm sản phẩm tự động chuyển qua (Auto-carried over - Chỉ áp dụng cho tồn >= 0)
Các sản phẩm thuộc nhóm sau đây sẽ **tự động được chuyển qua** (giữ nguyên số liệu hệ thống hoặc cập nhật tương ứng từ file đối soát) nếu số lượng tồn >= 0:
*   **Dưa hấu**
*   **Bắp**
*   **Cải chua**
*   **Thơm** (Áp dụng thêm quy tắc gom tồn ở mục 2)
*   **Hành tây**

> [!NOTE]
> Các sản phẩm này không bị tự động reset về 0 kể cả khi không có tên/không xuất hiện trong file Excel kiểm kho thực tế (với điều kiện tồn ban đầu không bị âm).

### 1.3. Nhóm sản phẩm chốt Baseline về 0
*   **Sản phẩm không có trong file Excel:** Tất cả các sản phẩm còn lại (ngoài danh sách tự động chuyển qua ở trên) nếu không xuất hiện trong file Excel kiểm kho thực tế sẽ bị **chốt baseline về 0**.
*   **Các sản phẩm thơm khác (ngoài Thơm trái xanh và Thơm gọt):** Sẽ bị reset số lượng tồn kho về 0 theo quy tắc đặc thù của nhóm Thơm.

---

## 2. Quy Tắc Đặc Thù Nhóm Sản Phẩm "Thơm" (Pineapple Consolidation Rules)

Áp dụng quy trình chuẩn hóa và quy đổi tồn kho đối với các sản phẩm làm từ trái Thơm:

### 2.1. Phân loại & Reset tồn kho
*   **Thơm trái xanh (I100220 - đơn vị Trái):** Chuyển qua (giữ lại và làm sản phẩm gốc quy đổi).
*   **Thơm gọt (bao gồm Thơm gọt kg và Thơm gọt trái):** Được loại trừ khỏi tất cả quy tắc reset và quy đổi (giữ nguyên độc lập theo số liệu thực tế).
*   **Tất cả các loại thơm khác:** (Ví dụ: Thơm xanh kg [I101127], Thơm chín, Thơm trái hườm, Thơm băm...) sẽ bị **reset tồn kho về 0**.

### 2.2. Quy đổi số liệu & Hàng tồn (Inventory Consolidation)
Để quy nhất số liệu tồn kho về sản phẩm gốc là **Thơm trái xanh**, hệ thống thực hiện tính toán quy đổi theo nguyên tắc:
1.  **Tỷ lệ quy đổi:** Quy đổi với tỷ lệ **1 trái tương đương 1 kg** đối với các loại thơm tính bằng ký. Các thơm trái khác quy đổi tỷ lệ 1-1.
2.  **Nhập Thơm trái xanh:** Mọi dữ liệu nhập kho của các loại thơm khác (ngoài Thơm gọt) sẽ được quy đổi và ghi nhận vào lượng **Nhập của Thơm trái xanh**.
3.  **Xuất các loại thơm khác:** Mọi dữ liệu xuất kho của các loại thơm khác (ngoài Thơm gọt) sẽ được ghi nhận tương ứng và quy đổi giảm vào tồn kho của **Thơm trái xanh**.
4.  **Quy đổi tồn kho:** Toàn bộ số lượng tồn kho của các loại thơm khác (sau khi chốt về 0) được quy đổi giá trị/số lượng tương đương để cộng dồn vào tồn kho của **Thơm trái xanh**.
5.  **Loại trừ Thơm gọt:** Các sản phẩm **Thơm gọt** hoàn toàn không tham gia vào luồng tính toán nhập xuất và quy đổi tồn kho này.

```mermaid
graph TD
    subgraph Nhóm Thơm
        TX[Thơm xanh]
        TG[Thơm gọt]
        TK[Các loại thơm khác]
    end

    TX -->|Giữ lại & Tự động chuyển qua| TX_Stock[Tồn Thơm xanh]
    TG -->|Loại trừ hoàn toàn khỏi quy tắc quy đổi| TG_Stock[Tồn Thơm gọt độc lập]
    TK -->|Reset baseline về 0| Reset0[Tồn kho = 0]
    
    TK_Nhap[Nhập các loại thơm khác] -->|Quy đổi thành| TX_Nhap[Nhập Thơm xanh]
    TK_Xuat[Xuất các loại thơm khác] -->|Quy đổi thành| TX_Xuat[Xuất Thơm xanh]
    TK_Ton[Tồn các loại thơm khác] -->|Quy đổi cộng dồn về| TX_Stock

---

## 3. Quy Tắc Kế Toán Sửa Số Liệu & Điều Chỉnh Ngày Cũ (Accounting Correction Rules)

Nhằm duy trì tính toàn vẹn của dữ liệu snapshot và tránh các lỗi sai lệch tồn kho lũy kế (Ghost Stock, âm kho ảo), kế toán và thủ kho bắt buộc phải tuân thủ nghiêm ngặt các quy tắc sau khi xử lý số liệu ngày cũ:

### 3.1. Nguyên tắc khóa sổ & Không sửa ngược (No Retrospective Edits)
*   **Không sửa ngược chứng từ cũ:** Một khi phiên chốt kho Baseline của ngày $T$ đã hoàn tất (giờ bấm chốt thực tế được ghi nhận trên hệ thống), kế toán **tuyệt đối không được quay lại sửa đổi số lượng thực nhận (`slnhan`), thực giao (`slgiao`) hoặc trạng thái (`status`)** của bất kỳ đơn hàng NCC (`Dathang`) hay đơn khách hàng (`Donhang`) nào của ngày $T$ trở về trước.
*   **Hậu quả vi phạm:** Việc sửa ngược đơn cũ sau giờ chốt kho sẽ làm sai lệch tồn kho tức thời, tạo ra các "lỗi bóng ma" (Ghost Stock) và phá vỡ tính khớp số 100% của phiên chốt.

### 3.2. Cơ chế điều chỉnh sai lệch phát sinh (Inventory Adjustment Protocol)
*   **Sử dụng Phiếu điều chỉnh (Inventory Adjustment):** Khi phát hiện chênh lệch số liệu do nhập sai hoặc sót chứng từ của ngày cũ, kế toán không được sửa trực tiếp đơn cũ mà phải **tạo Phiếu điều chỉnh tồn kho vật lý** vào **phiên làm việc ngày hôm nay** ($T+1$).
*   **Yêu cầu minh bạch:** Phiếu điều chỉnh cần ghi rõ mã sản phẩm, số lượng điều chỉnh (+/-), và lý do điều chỉnh cụ thể để hệ thống ghi vết (Audit Trail) rõ ràng, phục vụ đối soát định kỳ.

### 3.3. Xử lý và thanh lý đơn hàng treo (Overdue Order Cleanup)
*   **Rà soát định kỳ hàng tuần:** Kế toán phải kiểm tra danh sách các đơn hàng ở trạng thái `dadat` hoặc `choxuly` có ngày giao/nhận quá hạn (quá 7 ngày).
*   **Hành động đóng đơn:**
    *   Nếu đơn không giao/nhập nữa: Phải cập nhật trạng thái đơn thành **Hủy (`huy`)**.
    *   Nếu đơn đã giao/nhập thực tế nhưng chưa hoàn tất trên app: Phải phối hợp với kho để cập nhật về **Hoàn thành (`hoanthanh`)** hoặc **Đã nhận (`danhan`)**.
*   **Mục đích:** Tránh việc đơn cũ treo quá lâu làm hệ thống liên tục tính lũy kế nhu cầu mua hàng, dẫn đến gợi ý đặt dư thừa hàng hóa thực tế.

### 3.4. Logic tính hao hụt và đối soát công nợ
*   **Công thức tính giá trị hao hụt tài chính:** 
    $$\text{Giá trị hao hụt} = (\text{Tồn hệ thống} - \text{Tồn thực tế} - \text{Hao hụt/Hủy báo cáo}) \times \text{Giá gốc snapshot}$$
*   **Đối soát chênh lệch giao - nhận:** Đối với công nợ kế toán, luôn đối chiếu số lượng thực tế giao từ Kho (`slgiao`) với số lượng khách thực nhận chốt (`slnhan`) để khấu trừ công nợ chính xác, tránh lệch tiền do khách trả hàng hoặc giao thiếu.

```
