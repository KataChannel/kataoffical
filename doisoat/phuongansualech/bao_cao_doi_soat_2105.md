# BÁO CÁO ĐỐI SOÁT & PHƯƠNG ÁN XỬ LÝ LỆCH TỒN KHO
**Ngày thực hiện:** 21/05/2026
**File nguồn đối soát:** `doisoat/doisoat2105.jpg` & `doisoat/Ton-Huy 21-5.xlsx`
**Database đối chiếu:** `rausachfinal` (PostgreSQL)

---

## I. TỔNG QUAN VẤN ĐỀ
Dựa trên hình ảnh đối soát ngày 21/05 (`doisoat2105.jpg`), có **10 mặt hàng** đang bị lỗi hiển thị tồn kho hệ thống (`FILE TỒN` hiển thị `#N/A`), mặc dù thực tế có ghi nhận số lượng `TỒN CHỐT KHO (THỰC TẾ)` và có các phát sinh nhập - bán trong ngày.

Sau khi truy vấn dữ liệu trực tiếp từ Database hệ thống và đối chiếu với file báo cáo của thủ kho (`Ton-Huy 21-5.xlsx`), dưới đây là các câu trả lời chi tiết và nguyên nhân cốt lõi.

---

## II. GIẢI ĐÁP CHI TIẾT 4 VẤN ĐỀ CỦA CỬA HÀNG

### 1. Kèo nèo bó có tính vào kèo nèo kg không?
> **Kết luận:** **KHÔNG**. Hai mặt hàng này được quản lý tách biệt hoàn toàn trong hệ thống.
* **Mã sản phẩm trong DB:**
  * **`I100115` - Kèo nèo (DVT: Kg):** Tồn kho hệ thống hiện tại = `0`. Trong ngày 21/05 không có phát sinh đơn hàng bán hay nhập.
  * **`I101133` - Kèo nèo bó (DVT: Bó):** Tồn kho hệ thống = `2`. Ngày 21/05 có phát sinh nhập kho tự động `2 Bó` từ nhà cung cấp theo đơn đặt hàng `TGNCC-WX00006` (Mã phiếu nhập: `PN-TGNCC-WX00006-20260520_230002`).
* **Lý do lệch:** Thủ kho quản lý và kiểm đếm theo đơn vị khác nhau nhưng hệ thống không tự động quy đổi hay gộp chung vì chúng là 2 mã hàng độc lập (Kg và Bó).

### 2. Khoai tây TQ có tính vào khoai tây DL không?
> **Kết luận:** **KHÔNG**. Đây là hai sản phẩm riêng biệt với mã hàng và lịch sử giao dịch độc lập.
* **Mã sản phẩm trong DB:**
  * **`I100128` - Khoai Tây DL lớn (DVT: Kg):** Ngày 21/05 phát sinh bán ra **45.9 kg** (18 đơn hàng) và nhập vào **30 kg** từ đơn hàng `TGNCC-WW00002`. Tồn kho hiện tại trong DB là `7 kg`.
  * **`I100129` - Khoai Tây TQ (DVT: Kg):** Ngày 21/05 phát sinh bán ra **3 kg** (1 đơn hàng `PX-TG-AA43000`). Tồn kho hiện tại trong DB là `2 kg` (khớp chính xác với số liệu tồn chốt thực tế).
* **Lý do lệch:** Hệ thống ghi nhận đúng mã hàng của từng loại. Khoai tây Trung Quốc không bị gộp chung vào Khoai tây Đà Lạt lớn.

### 3. Thơm chín có đi mã thơm hườm không?
> **Kết luận:** **KHÔNG**. Thơm chín sử dụng đúng mã hàng riêng của nó và không bị chuyển sang mã thơm hườm.
* **Mã sản phẩm trong DB:**
  * **`I100891` - Thơm chín (DVT: Trái):** Ngày 21/05 phát sinh bán ra **8 Trái** (4 đơn hàng, gồm các phiếu xuất `PX-TG-AA43001` [2 trái], `PX-TG-AA42945` [1 trái], `PX-TG-AA42943` [3 trái], `PX-TG-AA42959` [2 trái]). Tồn kho hiện tại trong DB là `4 Trái`.
  * **`I100600` - Thơm trái hườm (DVT: Trái):** Tồn kho hiện tại = `30 Trái`. Không có phát sinh giao dịch nào trong ngày 21/05.
  * **`I101128` - Thơm hườm (kg) (DVT: Kg):** Tồn kho hiện tại = `0`. Không có phát sinh giao dịch.
* **Lý do lệch:** Lịch sử xuất kho ngày 21/05 chứng minh tất cả các đơn hàng bán thơm chín đều được xuất tự động chuẩn xác từ mã `I100891` (Thơm chín). Không có hiện tượng đi nhầm sang mã thơm hườm.

### 4. Tại sao các mặt hàng còn lại nhập về nhiều hơn bán ra nhưng không thấy nhập tồn (hiển thị `#N/A` ở cột FILE TỒN)?
> **NGUYÊN NHÂN CỐT LÕI:** **10 sản phẩm này hoàn toàn BỊ BỎ SÓT (không xuất hiện) trong file báo cáo tồn kho ngày 21/05 (`Ton-Huy 21-5.xlsx`) của thủ kho.**
* Khi lập bảng đối soát chốt kho hàng ngày, nhân viên sử dụng hàm `VLOOKUP` để kéo dữ liệu tồn kho từ file `Ton-Huy 21-5.xlsx` sang cột `FILE TỒN`.
* Vì thủ kho **không kê khai** 10 sản phẩm này trong sheet báo cáo tồn hủy hôm nay, hàm VLOOKUP không tìm thấy mã sản phẩm nên trả về kết quả lỗi **`#N/A`**.
* **Thực tế trong Database:** Số liệu tồn kho vật lý (`slton`) của các mặt hàng này vẫn được lưu trữ nguyên vẹn từ phiên chốt Baseline tối ngày 20/05 (Ví dụ: Me Hộp = `23`, Hoa décor = `9`, Xoài tứ quý = `8`, v.v. khớp 100% với cột tồn thực tế). Giao dịch nhập - xuất trong ngày 21/05 vẫn được ghi nhận đầy đủ, tuy nhiên do **chưa chạy phiên chốt kho (Baseline script) cho ngày 21/05** nên tồn kho hệ thống cuối ngày chưa được tính toán cập nhật số mới.

---

## III. BẢNG ĐỐI CHIẾU SỐ LIỆU CHI TIẾT (21/05/2026)

Dưới đây là bảng số liệu chi tiết đối chiếu giữa **Hình đối soát**, **File tồn hủy hôm nay** và **Dữ liệu thực tế trong Database**:

| Mã SP | Tên Sản Phẩm | DVT | Tồn Thực Tế (Hình) | Tồn trong File `Ton-Huy 21-5` | Tồn hiện tại trong DB | Nhập hôm nay (DB) | Bán hôm nay (DB) | Trạng thái & Nguyên nhân |
| :--- | :--- | :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **I100676** | Me Hộp | Hộp | 23 | **Không có (#N/A)** | 23 | 0 | 0 | ⚠️ Bị bỏ sót trong file Ton-Huy 21-5 |
| **I100815** | Hoa décor (12g) | Hộp | 9 | **Không có (#N/A)** | 9 | 0 | 1 | ⚠️ Bị bỏ sót trong file Ton-Huy 21-5 |
| **I100613** | Xoài tứ quý | Kg | 8 | **Không có (#N/A)** | 8 | 0 | 0 | ⚠️ Bị bỏ sót trong file Ton-Huy 21-5 |
| **I100891** | Thơm chín | Trái | 4 | **Không có (#N/A)** | 4 | 0 | 8 | ⚠️ Bị bỏ sót trong file Ton-Huy 21-5 |
| **I101133** | Kèo nèo bó | Bó | 2 | **Không có (#N/A)** | 2 | 2 | 0 | ⚠️ Bị bỏ sót trong file Ton-Huy 21-5 |
| **I100129** | Khoai Tây TQ | Kg | 2 | **Không có (#N/A)** | 2 | 0 | 3 | ⚠️ Bị bỏ sót trong file Ton-Huy 21-5 |
| **I100508** | Xoài cát Hòa Lộc | Kg | 0.71 | **Không có (#N/A)** | 0.71 | 1.4 | 0.89 | ⚠️ Bị bỏ sót trong file Ton-Huy 21-5 |
| **I100470** | Dưa lưới | Kg | 0.3 | **Không có (#N/A)** | 0.3 | 0 | 2.6 | ⚠️ Bị bỏ sót trong file Ton-Huy 21-5 |
| **I100316** | Chả quế | Kg | 0.2 | **Không có (#N/A)** | 0.2 | 0 | 0 | ⚠️ Bị bỏ sót trong file Ton-Huy 21-5 |
| **I100030** | Bông so đũa | Kg | 0.1 | **Không có (#N/A)** | 0.1 | 0 | 0 | ⚠️ Bị bỏ sót trong file Ton-Huy 21-5 |

---

## IV. PHƯƠNG ÁN XỬ LÝ ĐỀ XUẤT (HƯỚNG GIẢI QUYẾT)

Để giải quyết triệt để lỗi hiển thị `#N/A` và chuẩn hóa số liệu tồn kho ngày 21/05/2026, đề xuất quy trình xử lý sau:

### Bước 1: Yêu cầu Thủ kho cập nhật file Ton-Huy 21-5
* Bổ sung 10 mã sản phẩm bị thiếu ở trên vào file `Ton-Huy 21-5.xlsx` với số lượng tồn thực tế tương ứng (cột `slton` điền theo số tồn chốt kho thực tế trong hình: 23, 9, 8, 4, 2, 2, 0.71, 0.3, 0.2, 0.1).
* Điều này giúp loại bỏ hoàn toàn lỗi `#N/A` khi làm báo cáo đối soát Excel.

### Bước 2: Chạy kịch bản chốt Baseline ngày 21/05/2026 trên Hệ thống
* Sau khi file `Ton-Huy 21-5.xlsx` được cập nhật đầy đủ, lập trình viên/vận hành hệ thống sẽ chạy kịch bản chốt kho Baseline tự động (tương tự kịch bản ngày 20/05).
* Kịch bản này sẽ:
  1. Cập nhật tồn kho thực tế của các sản phẩm có trong file Excel vào bảng `SanphamKho` và `TonKho`.
  2. Tự động tính toán lại tồn kho dự phòng dựa trên các đơn hàng của ngày tiếp theo (22/05).
  3. Khởi tạo ngày làm việc mới 22/05 với số liệu sạch.

---
*Báo cáo được thực hiện bởi Antigravity AI nhằm làm rõ chênh lệch số liệu vận hành ngày 21/05/2026.*
