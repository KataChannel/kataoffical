# Báo Cáo Chi Tiết Quy Trình Đơn Hàng & Phân Quyền Hệ Thống

Tài liệu này cung cấp cái nhìn toàn diện về quy trình nghiệp vụ của đơn hàng (`Donhang`) và đơn đặt hàng (`Dathang`), các trạng thái tương ứng, cùng với sơ đồ phân quyền chi tiết cho từng vai trò người dùng trong hệ thống.

---

## 1. Tổng Quan Quy Trình (Process Overview)

Hệ thống phân chia rõ rệt thành 2 mảng nghiệp vụ chính:
- **Donhang (Sales Orders)**: Quản lý việc bán hàng cho Khách hàng (Khách sỉ, Khách lẻ).
- **Dathang (Purchase Orders)**: Quản lý việc đặt hàng từ Nhà cung cấp (NCC).

Cả hai quy trình đều sử dụng chung một bộ trạng thái (`StatusDonhang`) nhưng có ý nghĩa nghiệp vụ khác nhau tùy theo ngữ cảnh.

---

## 2. Trạng Thái & Vòng Đời Đơn Hàng (Statuses & Lifecycle)

| Trạng thái | Ý nghĩa Sales Order (Donhang) | Ý nghĩa Purchase Order (Dathang) |
| :--- | :--- | :--- |
| **`dadat`** | Đơn mới được tạo, chờ chuẩn bị hàng. | Đơn đặt đã gửi cho NCC, chờ NCC xác nhận. |
| **`dagiao`** | Hàng đã rời kho, đang trên đường đến khách. | NCC đã giao hàng, hàng đang trên đường về kho. |
| **`danhan`** | Khách đã nhận hàng, chờ đối soát. | Kho đã nhận hàng, đã kiểm đếm thực tế. |
| **`hoanthanh`** | Đã hoàn tất thanh toán/đối soát. | Đã thanh toán cho NCC, kết thúc đơn. |
| **`huy`** | Đơn bị hủy. | Đơn đặt bị hủy do NCC không cung ứng được. |

---

## 3. Vai Trò Hệ Thống (User Roles)

Dựa trên dữ liệu thực tế, hệ thống có các vai trò chính sau:

1.  **Admin**: Toàn quyền điều hành, cấu hình hệ thống, quản lý User và xem mọi báo cáo.
2.  **PKD (Phòng Kinh Doanh)**: Tập trung vào quản lý đơn hàng khách hàng, điều chỉnh giá và CSKH.
3.  **ORDER (Xử lý đơn)**: Chuyên trách việc nhận đơn, điều phối hàng hóa và xử lý các vấn đề phát sinh của đơn hàng.
4.  **KẾ TOÁN**: Đối soát công nợ khách hàng (CNKH), công nợ NCC (CNNCC), quản lý bảng giá và xuất báo cáo tài chính.
5.  **KHO VẬN**: Thực hiện các thao tác nhập/xuất kho thực tế, in phiếu giao hàng và quản lý tồn kho.
6.  **Đặt hàng**: Chuyên trách việc tạo đơn đặt hàng tới nhà cung cấp dựa trên nhu cầu thực tế.

---

## 4. Ma Trận Phân Quyền Chi Tiết (Permission Matrix)

Hệ thống sử dụng **Permission Codes** (Mã quyền) để kiểm soát truy cập. Dưới đây là bảng phân bổ quyền tiêu biểu cho các nhóm chức năng chính:

### Nhóm Đơn Hàng (Sales)
| Quyền (Code) | Admin | PKD | ORDER | KẾ TOÁN | KHO VẬN |
| :--- | :---: | :---: | :---: | :---: | :---: |
| `donhang.view` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `donhang.edit` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `donhang.delete` | ✅ | ❌ | ❌ | ✅ | ✅ |
| `donhang.sldat` | ✅ | ❌ | ✅ | ❌ | ❌ |
| `donhang.soluonggiao` | ✅ | ❌ | ✅ | ❌ | ❌ |
| `donhang.soluongnhan` | ✅ | ❌ | ✅ | ❌ | ❌ |

### Nhóm Đặt Hàng (Purchase)
| Quyền (Code) | Admin | Đặt hàng | KẾ TOÁN | KHO VẬN |
| :--- | :---: | :---: | :---: | :---: |
| `dathang.view` | ✅ | ✅ | ✅ | ❌ |
| `dathang.sldat` | ✅ | ✅ | ✅ | ✅ |
| `dathang.slgiao` | ✅ | ✅ | ✅ | ✅ |
| `dathang.slnhan` | ✅ | ✅ | ✅ | ✅ |
| `dathang.gianhap` | ✅ | ✅ | ✅ | ✅ |

### Nhóm Kho & Vận Đơn
| Quyền (Code) | Admin | ORDER | KHO VẬN |
| :--- | :---: | :---: | :---: |
| `kho.view` | ✅ | ❌ | ✅ |
| `vandon.view` | ✅ | ✅ | ✅ |
| `phieugiaohang.view` | ✅ | ✅ | ✅ |
| `phieuchuyen.view` | ✅ | ✅ | ✅ |

---

## 5. Quy Trình Nghiệp Vụ Đặc Thù

### 5.1 Tự động hóa trạng thái (Automated Transitions)
Hệ thống sử dụng **Cron Job** (trong `donhang-cron.service.ts`) để tự động hóa:
- **Auto-Complete**: Tự động chuyển các đơn hàng từ `dagiao` hoặc `danhan` sang trạng thái tiếp theo dựa trên thời gian thực tế để giảm bớt thao tác thủ công.
- Thời gian chạy mặc định: **13:00 hàng ngày**.

### 5.2 Xử lý sai lệch nhập kho (Shortage Handling)
Khi nhập hàng từ NCC (`Dathang`), nếu Số lượng nhận (`slnhan`) thấp hơn Số lượng NCC báo giao (`slgiao`), hệ thống có khả năng tự động tạo **Phiếu trả hàng (RET)** để trừ trực tiếp vào công nợ NCC.

### 5.3 Lịch sử giá & Audit (Traceability)
Mọi thay đổi nhạy cảm như **Giá bán** hoặc **Xóa đơn hàng** đều được ghi lại trong:
- `AuditLog`: Lưu vết Ai - Làm gì - Khi nào - Giá trị cũ/mới.
- `DonhangPriceAudit`: Chuyên biệt cho việc theo dõi biến động giá trong đơn hàng.

---

## 6. Danh Sách Tài Khoản Phụ Trách (Ghi nhận thực tế)

- **Quản trị**: `chikiet88@gmail.com`, `ceo@rausachtrangia.com` (Admin).
- **Phòng Kinh Doanh**: `pkd.rausachtrangia.com` (Thanh Thúy).
- **Xử lý đơn**: `minhman20123@gmail.com` (Minh Mẫn).
- **Kho Vận**: `dv949723@gmail.com` (Bích Dung).
- **Kế toán**: `hanhnguyen361@gmail.com` (Chị Hạnh).
- **Mua hàng**: `nguyenbao.coolguy@gmail.com` (Thành Bảo).

---
*Báo cáo được trích xuất từ hệ thống KataChannel - 2026.*
