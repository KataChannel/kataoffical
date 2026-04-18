# Quy trình Xử lý Trạng thái "Không giao" (khonggiao)

Tài liệu này tổng hợp logic xử lý trong hệ thống `rausachfinal` khi thực hiện chuyển đổi một **Đơn đặt hàng** (Purchase Order) hoặc **Đơn bán hàng** (Sales Order) sang trạng thái không phân phối/nhận hàng là `"không giao"` (`khonggiao`). Thông tin được phân tích từ source code thông qua các tệp tin `dathang.service.ts`, `donhang.service.ts`, và `status-machine.service.ts`.

---

## 1. Luồng xử lý của Đặt hàng (Purchase Orders)
*Mã nguồn tham chiếu: `dathang.service.ts`*

Trạng thái `khonggiao` được xử lý gộp chung cùng luồng điều kiện với các trạng thái `huy` (hủy) và `choxuly` (chờ xử lý). Khi người dùng cập nhật một phiếu đặt hàng về `khonggiao`, hệ thống thực hiện theo thứ tự sau:

1. **Hoàn trả số lượng tồn kho (Rollback slton):**
   * Nếu trước đó phiếu đang ở trạng thái `danhan` (đã nhận), hệ thống sẽ trừ bớt tồn kho thực tế (`slton`) một lượng đúng bằng số lượng sản phẩm hàng hóa đã nhận trước đó (`slnhan`).

2. **Hoàn trả số lượng chờ nhập kho (Rollback slchonhap):**
   * Nếu trước đó phiếu ở trạng thái `dadat` (đã đặt) hoặc `dagiao` (đang trên đường giao), hệ thống sẽ gỡ bỏ dự kiến nhập hàng bằng cách trừ lượng hàng hóa chờ nhập (`slchonhap`) bằng đúng lượng hàng đã đặt (`sldat`).

3. **Hủy/Xóa Phiếu kho liên quan:**
   * Hệ thống tìm kiếm phiếu nhập/xuất kho tương ứng của phiếu đặt hàng thông qua mã chứng từ (`PX-mã_đặt_hàng`).
   * Nếu có tồn tại phiếu kho này, tiến hành xóa sạch bản ghi phiếu kho ở cấp độ chi tiết sản phẩm (`PhieuKhoSanpham`) và bản kiểm soát tổng (`PhieuKho`).

4. **Cập nhật dữ liệu Đặt hàng chính:**
   * Ghi nhận trạng thái mới của phiếu (`status: 'khonggiao'`).
   * Thay đổi trạng thái các mặt hàng bên trong: số lượng giao (`slgiao`) và lượng nhận (`slnhan`) đều bị set về **0**. 
   * *(Lưu ý thêm)*: Đối với trạng thái là `huy`, hệ thống đẩy số lượng hủy (`slhuy`) bằng với số lượng đã đặt, tuy nhiên với luồng `khonggiao` thì `slhuy` vẫn bằng **0**.
   * Hệ thống tự động đẩy thêm dòng `ghichu` ở cấp đơn và sản phẩm để diễn giải: *"Đơn đặt hàng chuyển sang khonggiao"*.

---

## 2. Luồng xử lý của Đơn hàng (Sales Orders)
*Mã nguồn tham chiếu: `donhang.service.ts`*

Khác với mua hàng, đơn bán hàng có nghiệp vụ đi kèm đến việc trừ tồn và kiểm soát số lượng cho khách. Việc chuyển trạng thái sang `khonggiao` sẽ kích hoạt luồng dọn dẹp (Rollback):

1. **Xử lý Rollback Tồn kho:**
   * **Từ trạng thái đã xử lý xuất kho** (`dagiao`, `danhan`, `hoanthanh`): Hệ thống sẽ hoàn thành thao tác **cộng trả tồn kho thực tế** (`slton`) bằng đúng lượng hàng đã giao (`slgiao`). Vì lượng tồn kho này không còn được xuất cho khách này nữa nhưng hoàn toàn có thể bán tiếp, hệ thống sẽ đưa số đồ này về lượng hàng chờ lưu chuyển (`slchogiao`).
   * **Từ trạng thái chờ xuất kho** (`dadat`): Đơn hàng chưa kịp xuất kho mà bị không giao sẽ phải dỡ bỏ ngưng chặn giữ chỗ (reserve), hệ thống trừ ngược lại lượng hàng chưa giao được ghim (`slchogiao`) mà không động tới tồn kho thực do chưa được dời đi.

2. **Hủy cấn trừ (Deduction bypass):**
   * Ngược với các trạng thái ghi nhận giao dịch ('dagiao', 'danhan', 'hoanthanh'), việc sang `khonggiao` không rơi vào diện tích cực (thành công) và không bắt giữ chỗ thêm lượng kho (`slchogiao`). Do đó hệ thống pass luôn qua bước giữ (reserve) tồn.

3. **Quản lý Phiếu Kho xuất:**
   * Việc chuyển qua trạng thái `khonggiao` (tương đương với `huy` và `choxuly`) buộc hệ thống sẽ đi tìm và **Xóa hoàn toàn Phiếu kho xuất** tương ứng trước đó đi (định ranh bằng mã `'PX-mã_đơn_hàng'`).

4. **Lưu mới trạng thái Đơn hàng:**
   * Hệ thống ghi nhận trạng thái cuối `status: 'khonggiao'` và duy trì nội dung thông tin giỏ hàng ở trạng thái mới nhất cho các luồng theo dõi đối soát phía sau.

---

## 3. Quy định hợp lệ chuyển đổi dòng trạng thái (State Machine)
*Mã nguồn tham chiếu: `status-machine.service.ts`*

Cỗ máy kiểm soát quy định các con đường hợp lệ khi thao tác với cả Đơn hàng & Đặt hàng:

* **Đầu vào (Inbound):** Trạng thái `khonggiao` chỉ có thể được chọn chuyển tiếp tính từ lúc đơn hàng/đặt hàng đang nằm ở mức `dagiao`. 
* **Đầu ra (Outbound):** Một khi đơn đã rớt về khu vực `khonggiao`, người dùng chỉ có 2 option hợp lệ có thể chuyển đi hướng khác là đưa đơn về `dadat` (làm lại) hoặc qua hẳn trạng thái `huy` (chấm dứt).
