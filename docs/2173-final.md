
***FLOW CHUẨN

1. các trạng thái của ĐƠN MUA HÀNG NCC
ĐƠN MỚI -> ĐÃ_ĐỐI_CHIẾU → CHỜ_THANH_TOÁN → ĐÃ_THANH_TOÁN (Đã đối chiếu ở đây là cập nhật lại số lượng nhận và giá tiền thực tế)
 2. Các trạng thái của ĐỀ XUẤT THANH TOÁN
a. ĐX MỚI -> DUYỆT → CHỜ_THANH_TOÁN → ĐÃ_THANH_TOÁN
b. ĐX MỚI -> KHÔNG DUYỆT -> Nhập Comment
3. PHIẾU CHI
a. Hiển thị mặc định theo tháng - cho chọn khoảng ngày
b. Chi theo ĐỀ XUẤT THANH TOÁN -> chỉ hiển thị các ĐXTT (Đã tách thành nhiều Phiếu chi theo NCC từ ĐXTT) có trạng thái CHỜ THANH TOÁN
c. Sau khi thanh toán thì bắt buộc up bill (Hình thức chuyển khoản) lên và bấm ĐÃ THANH TOÁN Sau đó cập nhật ngược trạng thái ĐÃ THANH TOÁN cho các đơn hàng có trong PHIẾU CHI cho ĐƠN MUA HÀNG


I. PHÂN TÍCH & CHỐT
1️⃣ TRẠNG THÁI ĐƠN MUA HÀNG NCC

Bạn đề xuất:

ĐƠN MỚI
→ ĐÃ_ĐỐI_CHIẾU
→ CHỜ_THANH_TOÁN
→ ĐÃ_THANH_TOÁN

✅ KẾT LUẬN: HỢP LÝ – ĐÚNG THỰC TẾ DOANH NGHIỆP
Giải thích từng trạng thái (rất quan trọng):
🔹 ĐƠN MỚI

Đơn đặt hàng ban đầu

Số lượng & đơn giá theo hợp đồng / báo giá

🔹 ĐÃ_ĐỐI_CHIẾU ✅ (bạn mô tả RẤT ĐÚNG)

“Cập nhật lại số lượng nhận và giá tiền thực tế”

Thực chất là GRN + Invoice reconciliation

Cho phép:

Điều chỉnh SL thực nhận

Điều chỉnh đơn giá thực tế

Sau trạng thái này:

❌ KHÔNG cho sửa lại giá & số lượng

✅ Bắt đầu phát sinh công nợ NCC

👉 Việc đưa ĐÃ_ĐỐI_CHIẾU vào ĐƠN MUA HÀNG là CHUẨN ERP, không sai.

🔹 CHỜ_THANH_TOÁN

Đơn đã:

Đối chiếu xong

Đã/đang nằm trong ĐỀ XUẤT THANH TOÁN ĐÃ DUYỆT

Chưa có tiền ra

👉 Trạng thái này giúp:

Kế toán biết: “đơn này đã lên kế hoạch chi tiền”

Tránh bị chọn trùng vào nhiều đề xuất

🔹 ĐÃ_THANH_TOÁN

Toàn bộ giá trị đơn đã được chi trả

Được set chỉ bởi PHIẾU CHI

🔒 RÀNG BUỘC BẮT BUỘC (nên code cứng)
- Không cho quay lại từ ĐÃ_ĐỐI_CHIẾU
- CHỜ_THANH_TOÁN chỉ set khi ĐXTT = CHỜ_THANH_TOÁN
- ĐÃ_THANH_TOÁN chỉ set khi Phiếu chi = ĐÃ_THANH_TOÁN

II. PHÂN TÍCH & CHỐT
2️⃣ TRẠNG THÁI ĐỀ XUẤT THANH TOÁN

Bạn đưa ra 2 nhánh:

a. LUỒNG DUYỆT
ĐX MỚI → DUYỆT → CHỜ_THANH_TOÁN → ĐÃ_THANH_TOÁN

b. LUỒNG KHÔNG DUYỆT
ĐX MỚI → KHÔNG DUYỆT → (Nhập comment)

⚠️ CHỈNH NHẸ ĐỂ CHUẨN HÓA (RẤT NHỎ, NHƯNG QUAN TRỌNG)
👉 DUYỆT KHÔNG NÊN là trạng thái lưu DB

Nó là ACTION, không phải STATE.

✅ STATE CHUẨN NÊN LƯU:
ĐX_MỚI
→ CHỜ_THANH_TOÁN   (sau khi DUYỆT)
→ ĐÃ_THANH_TOÁN


Và nhánh:

ĐX_MỚI → KHÔNG_DUYỆT (có comment)


👉 Điều này giúp:

DB gọn

Không dư trạng thái

Action “DUYỆT” vẫn log trong audit

🔍 Ý NGHĨA NGHIỆP VỤ
Trạng thái	Ý nghĩa
ĐX_MỚI	Tạo xong, chưa duyệt
KHÔNG_DUYỆT	Bị từ chối, chỉ lưu vết
CHỜ_THANH_TOÁN	Đã duyệt, căn cứ chi tiền
ĐÃ_THANH_TOÁN	Tất cả phiếu chi đã xong
III. PHÂN TÍCH & CHỐT
3️⃣ PHIẾU CHI (THỦ QUỸ)
a. Hiển thị

✅ Mặc định theo tháng hiện tại

✅ Cho chọn khoảng ngày

→ Chuẩn UI kế toán, không có vấn đề.

b. Nguồn tạo Phiếu chi

“Chi theo ĐỀ XUẤT THANH TOÁN → chỉ hiển thị ĐXTT CHỜ THANH TOÁN”

✅ HOÀN TOÀN ĐÚNG – RẤT QUAN TRỌNG

Phiếu chi KHÔNG được tạo tự do

Luôn có:

payment_proposal_id

supplier_id

1 ĐXTT → N Phiếu chi (theo NCC)

c. Hoàn tất thanh toán

“Bắt buộc up bill (chuyển khoản) → bấm ĐÃ THANH TOÁN”

✅ ĐÚNG & NÊN CODE CỨNG
IF payment_method = TRANSFER
AND bill_image IS NULL
→ KHÔNG cho chuyển trạng thái ĐÃ_THANH_TOÁN

🔄 CẬP NHẬT NGƯỢC (CASCADE – CỐT LÕI)

Khi PHIẾU CHI = ĐÃ_THANH_TOÁN:

Các ĐƠN MUA HÀNG trong phiếu:

→ ĐÃ_THANH_TOÁN


Nếu toàn bộ Phiếu chi của ĐXTT đã xong:

→ ĐỀ XUẤT = ĐÃ_THANH_TOÁN


Cập nhật công nợ NCC

👉 Logic này CHỈ đặt ở backend service, không đặt ở UI.

IV. KẾT LUẬN CHỐT CUỐI (RẤT QUAN TRỌNG)

✔ Trạng thái ĐƠN MUA HÀNG bạn đưa ra: CHUẨN – NÊN GIỮ
✔ Trạng thái ĐỀ XUẤT THANH TOÁN: chỉ cần bỏ DUYỆT khỏi STATE, giữ như ACTION
✔ PHIẾU CHI là điểm phát sinh tiền duy nhất
✔ Cascade bạn mô tả là 100% đúng chuẩn ERP
