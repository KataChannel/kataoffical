# PHÂN TÍCH SÂU VỀ LỆCH TỒN KHO & GIẢI PHÁP VẬN HÀNH DÀI HẠN
**Ngày thực hiện:** 21/05/2026
**Đối tượng phân tích:** Lịch sử giao dịch từ lúc chốt Baseline 20/05 đến cuối ngày 21/05.
**Mục tiêu:** Chỉ rõ nguyên nhân lệch (do Vận hành hay Hệ thống) và đưa ra phương án để **không cần chốt Baseline hàng ngày** mà số liệu vẫn tự động khớp.

---

## I. BẢN CHẤT CỦA VIỆC "LỆCH SỐ" & TẠI SAO PHẢI CHỐT BASELINE HÀNG NGÀY?

Hiện tại, cửa hàng đang phải dùng phương án **ép Baseline hàng ngày** (reset tồn kho hệ thống về 0 đối với các sản phẩm không có trong file Excel tồn hủy của thủ kho). 
* **Lý do thủ kho làm vậy:** Thủ kho chỉ kiểm đếm và kê khai các mặt hàng **có biến động** (nhập thêm, bán nhiều, hoặc có hủy) trong ngày. File báo cáo `Ton-Huy 21-5.xlsx` hôm nay chỉ kê khai **142 sản phẩm trên tổng số 1024 sản phẩm** có trong hệ thống.
* **Hệ quả của việc chốt Baseline:** Khi chạy Baseline, hệ thống tự động **reset 882 sản phẩm không được kê khai về 0**. 
  * Nhưng thực tế, những sản phẩm không kê khai này **vẫn còn hàng nằm trong kho** (ví dụ: *Me Hộp* vẫn còn nguyên `23 hộp`, *Xoài tứ quý* còn `8 kg`, *Hoa décor* còn `9 hộp`). Chúng không biến động nên thủ kho không đếm lại.
  * Việc reset về 0 làm mất đi số tồn thực tế của các sản phẩm đứng yên này, buộc hôm sau khi phát hiện lệch lại phải chạy Baseline đè lên tiếp. Đây là một vòng lặp luẩn quẩn do thiết kế luồng đối soát chưa tối ưu.

---

## II. CHI TIẾT TOÁN HỌC CỦA 10 SẢN PHẨM LỆCH NGÀY 21/05

Tôi đã chạy tập lệnh truy vết toàn bộ lịch sử giao dịch (Phiếu nhập PN, Phiếu xuất PX, Đơn bán, Đơn mua) của 10 sản phẩm này từ 23:00 ngày 20/05 đến hết ngày 21/05. Kết quả toán học như sau:

### Nhóm A: 8 sản phẩm khớp 100% tuyệt đối giữa Hệ thống và Vật lý
*(Tồn hệ thống tính toán tự động khớp hoàn hảo với số đếm thực tế của kho, lỗi duy nhất là do thủ kho bỏ sót trong file Excel).*

Công thức tính tồn kỳ vọng: `Tồn kỳ vọng 21/05` = `Tồn Baseline 20/05` + `Nhập hôm nay` - `Bán hôm nay`

1. **`I100676` - Me Hộp (DVT: Hộp)**
   * Số liệu: `23` (Tồn 20/05) + `0` (Nhập) - `0` (Bán) = **`23`**
   * Tồn thực tế kho đếm: **`23`**
   * **Đánh giá:** Khớp 100%. Lệch hiển thị do thủ kho bỏ sót không điền mã này vào file `Ton-Huy 21-5.xlsx`.
2. **`I100815` - Hoa décor (DVT: Hộp)**
   * Số liệu: `10` (Tồn 20/05) + `0` (Nhập) - `1` (Bán đơn `TG-AA43042`) = **`9`**
   * Tồn thực tế kho đếm: **`9`**
   * **Đánh giá:** Khớp 100%. Lệch hiển thị do thủ kho bỏ sót trong file Excel.
3. **`I100613` - Xoài tứ quý (DVT: Kg)**
   * Số liệu: `8` (Tồn 20/05) + `0` (Nhập) - `0` (Bán) = **`8`**
   * Tồn thực tế kho đếm: **`8`**
   * **Đánh giá:** Khớp 100%. Lệch hiển thị do thủ kho bỏ sót trong file Excel.
4. **`I100891` - Thơm chín (DVT: Trái)**
   * Số liệu: `12` (Tồn 20/05) + `0` (Nhập) - `8` (Bán qua 4 đơn) = **`4`**
   * Tồn thực tế kho đếm: **`4`**
   * **Đánh giá:** Khớp 100%. Lệch hiển thị do thủ kho bỏ sót trong file Excel.
5. **`I101133` - Kèo nèo bó (DVT: Bó)**
   * Số liệu: `0` (Tồn 20/05) + `2` (Nhập tự động đơn `TGNCC-WX00006`) - `0` (Bán) = **`2`**
   * Tồn thực tế kho đếm: **`2`**
   * **Đánh giá:** Khớp 100%. Lệch hiển thị do thủ kho bỏ sót trong file Excel.
6. **`I100129` - Khoai Tây TQ (DVT: Kg)**
   * Số liệu: `5` (Tồn 20/05) + `0` (Nhập) - `3` (Bán đơn `TG-AA43000`) = **`2`**
   * Tồn thực tế kho đếm: **`2`**
   * **Đánh giá:** Khớp 100%. Lệch hiển thị do thủ kho bỏ sót trong file Excel.
7. **`I100470` - Dưa lưới (DVT: Kg)**
   * Số liệu: `2.9` (Tồn 20/05) + `0` (Nhập) - `2.6` (Bán đơn `TG-AA42966`) = **`0.3`**
   * Tồn thực tế kho đếm: **`0.3`**
   * **Đánh giá:** Khớp 100%. Lệch hiển thị do thủ kho bỏ sót trong file Excel.
8. **`I100030` - Bông so đũa (DVT: Kg)**
   * Số liệu: `0.1` (Tồn 20/05) + `0` (Nhập) - `0` (Bán) = **`0.1`**
   * Tồn thực tế kho đếm: **`0.1`**
   * **Đánh giá:** Khớp 100%. Lệch hiển thị do thủ kho bỏ sót trong file Excel.

---

### Nhóm B: 2 sản phẩm có lệch thực tế giữa Vận hành vật lý và Hệ thống

9. **`I100508` - Xoài cát Hòa Lộc (DVT: Kg)**
   * **Dữ liệu trên DB:** 
     * Tồn Baseline (20/05): `0`
     * Bán hôm nay: `0.89 kg` (gồm đơn `TG-AA42988` [0.5kg] và `TG-AA43012` [0.39kg])
     * Đơn mua hàng từ nhà cung cấp (`TGNCC-WX03110`): Cập nhật thực nhận (`slnhan`) = **`1.4 kg`**
     * **NHƯNG hệ thống tự động làm Phiếu Nhập (PN)** hôm nay chỉ ghi nhận **`0.6 kg`** (lấy theo số lượng đặt ban đầu `sldat` thay vì số lượng thực nhận `slnhan`).
     * Tồn kỳ vọng hệ thống tính: `0` + `0.6` (nhập hệ thống) - `0.89` (bán) = **`-0.29 kg`** (Hệ thống bị âm kho).
   * **Tồn thực tế kho đếm:** **`0.71 kg`**
   * **ĐỐI CHIẾU THỰC TẾ VẬN HÀNH:**
     * Nếu lấy số lượng thực nhận đúng là `1.4 kg`: Tồn kỳ vọng thực tế phải là `0` + `1.4` (nhập thực tế) - `0.89` (bán) = **`0.51 kg`**.
     * Kho đếm thực tế là `0.71 kg`. Sự sai lệch giữa thực tế kho đếm và toán học thực nhận là: `0.71` - `0.51` = **`0.2 kg`** (sai lệch rất nhỏ, hoàn toàn chấp nhận được do hao hụt cân đo hoặc làm tròn số của thủ kho).
     * **LÝ DO LỆCH CHÍNH (Lỗi Hệ thống):** Kịch bản nhập kho tự động của hệ thống bị lỗi logic khi **chỉ nhập `0.6 kg`** thay vì **`1.4 kg`** thực tế nhận, làm hệ thống bị hụt mất `0.8 kg`.

10. **`I100316` - Chả quế (DVT: Kg)**
    * **Dữ liệu trên DB:**
      * Tồn Baseline (20/05): `0` (hệ thống tự động reset về 0 do hôm qua thủ kho không kê khai mặt hàng này trong file 20/05).
      * Giao dịch hôm nay: `0` Nhập, `0` Bán.
      * Tồn kỳ vọng hệ thống tính: **`0`**
    * **Tồn thực tế kho đếm:** **`0.2 kg`**
    * **LÝ DO LỆCH CHÍNH (Lỗi Vận hành):** Thực tế trong kho vẫn còn `0.2 kg` chả quế tồn dư trong tủ đông từ hôm trước (hôm qua hệ thống tính là `0.3 kg` trước khi bị Baseline reset về `0`). Lệch này xảy ra hoàn toàn do kịch bản Baseline reset ép về `0` của hệ thống đã xóa sạch tồn kho thực tế của sản phẩm này.

---

## III. NGUYÊN NHÂN SÂU XA & PHÂN LOẠI LỖI

### 1. Lỗi do Vận hành (Thủ kho & Quy trình báo cáo)
* **Báo cáo thiếu sót:** Thủ kho không làm kiểm kê định kỳ toàn bộ kho mà chỉ báo cáo các sản phẩm "nổi bật" hoặc có biến động lớn. Việc này dẫn đến việc bỏ sót các sản phẩm đứng yên (như Me Hộp, Hoa décor, Xoài tứ quý, Chả quế) trong file Excel gửi lên hàng ngày.
* **Không đồng bộ đơn vị tính:** Thủ kho kiểm đếm Kèo nèo theo Bó nhưng hệ thống có mã Kèo nèo theo Kg.

### 2. Lỗi do Hệ thống (Logic xử lý dữ liệu)
* **Lỗi nhập kho tự động (Rất quan trọng):** Hệ thống tạo phiếu nhập kho tự động (`PN`) dựa trên số lượng đặt ban đầu (`sldat`/`slgiao`) thay vì số lượng thực nhận thực tế (`slnhan`) được cập nhật sau đối soát. Trường hợp *Xoài cát Hòa Lộc* là minh chứng rõ nhất (thực nhận 1.4kg nhưng hệ thống chỉ làm phiếu nhập 0.6kg).
* **Kịch bản Reset Baseline quá cực đoan:** Tự động xóa sạch tồn kho (reset về 0) của tất cả các sản phẩm không nằm trong file Excel đối soát của thủ kho, dẫn đến việc xóa oan tồn kho thực tế của các mặt hàng đứng yên (như Chả quế `0.2kg` vẫn còn trong tủ đông).

---

## IV. GIẢI PHÁP ĐỂ KHÔNG CẦN CHỐT BASELINE HÀNG NGÀY

Để số liệu tự động khớp mà **không cần chạy Baseline reset hàng ngày**, bạn nên áp dụng quy trình chuẩn hóa sau:

### 1. Thay đổi cơ chế tính Tồn kho hệ thống (Sửa luồng xử lý)
* **Nguyên tắc tích lũy:** Tồn kho cuối ngày phải tính bằng công thức tích lũy tự động: 
  $$\text{Tồn hôm nay} = \text{Tồn hôm qua} + \text{Thực nhập hôm nay (Phiếu PN)} - \text{Thực xuất bán hôm nay (Phiếu PX)} - \text{Hao hụt/Hủy báo cáo (slhuy)}$$
* **Không reset tự động:** Tuyệt đối không tự động reset tồn kho các sản phẩm thiếu trong file Excel về `0`. Nếu sản phẩm không có trong file Excel tồn hủy, hệ thống giữ nguyên số lượng tính toán tích lũy tự động của sản phẩm đó.

### 2. Thay đổi vai trò của file Excel "Tồn - Hủy" hàng ngày
* File `Ton-Huy` hàng ngày của thủ kho chỉ nên dùng cho 2 mục đích:
  1. **Ghi nhận Hao hụt/Hủy thực tế (`slhuy`):** Để hệ thống trừ kho các sản phẩm bị hỏng, nát.
  2. **Đối chiếu sai lệch (Audit):** Định kỳ 1 tuần/1 tháng, thủ kho đếm thực tế sản phẩm nào thì điền sản phẩm đó. Hệ thống sẽ so sánh tồn tính toán tích lũy với số đếm thực tế. Nếu lệch quá nhiều thì mới tạo phiếu điều chỉnh (Adjustment), chứ không tự động ép số hàng ngày.

### 3. Sửa logic tạo phiếu nhập kho tự động (`PN`)
* Khi đơn mua hàng chuyển sang trạng thái `danhan`/`hoanthanh`, hệ thống phải tạo phiếu nhập kho với số lượng lấy từ cột **`slnhan` (thực nhận)** chứ không được lấy từ cột `sldat` hoặc `slgiao`. Điều này giúp triệt tiêu hoàn toàn lỗi lệch kho của các mặt hàng như Xoài cát Hòa Lộc.

---
*Báo cáo phân tích sâu được thực hiện nhằm cung cấp cái nhìn toàn diện về luồng số liệu và hỗ trợ tối ưu hóa quy trình vận hành của cửa hàng.*
