# HƯỚNG DẪN SỬ DỤNG HỆ THỐNG QUẢN LÝ TỒN KHO

## TỔNG QUAN HỆ THỐNG

Hệ thống Quản lý Tồn kho được thiết kế để giúp doanh nghiệp theo dõi, quản lý và kiểm soát tồn kho một cách hiệu quả và chính xác. Hệ thống cung cấp các tính năng toàn diện:

### 🎯 Mục tiêu chính:
- Theo dõi tồn kho thời gian thực
- Quản lý giao dịch xuất/nhập kho
- Thực hiện chốt kho định kỳ
- Tạo báo cáo và phân tích xu hướng
- Cảnh báo tình trạng tồn kho

### 🏗️ Các chức năng chính:
1. **📦 Tồn kho hiện tại** - Xem tình trạng tồn kho real-time
2. **📋 Lịch sử tồn kho** - Theo dõi các giao dịch xuất/nhập kho  
3. **✅ Chốt kho** - Kiểm kê và chốt tồn kho định kỳ
4. **➕ Tạo giao dịch mới** - Tạo phiếu xuất/nhập kho

## 🔐 CÁCH TRUY CẬP HỆ THỐNG

### Đăng nhập và điều hướng
1. **Đăng nhập**: Truy cập trang quản lý và đăng nhập bằng tài khoản có quyền
2. **Menu chính**: Tìm menu "📁 Quản lý tồn kho" trên thanh điều hướng
3. **Submenu**: Chọn chức năng cần sử dụng từ menu con

### Cấu trúc menu chi tiết
```
📁 Quản lý tồn kho
├── 📦 Tồn kho hiện tại (/admin/ton-kho-hien-tai)
├── 📋 Lịch sử tồn kho (/admin/lichsu-tonkho)  
├── ✅ Chốt kho (/admin/lichsu-tonkho/chot-kho)
└── ➕ Tạo giao dịch mới (/admin/lichsu-tonkho/0)
```

### Phân quyền truy cập
- **👑 Quản lý kho**: Toàn quyền truy cập tất cả tính năng
- **👨‍💼 Nhân viên kho**: Tạo/xem giao dịch, xem tồn kho
- **🧮 Kế toán**: Xem báo cáo, thực hiện chốt kho
- **👁️ Chỉ xem**: Chỉ xem thông tin, không chỉnh sửa

---

## 📦 1. TỒN KHO HIỆN TẠI

### 🎯 Mục đích và lợi ích
Trang này hiển thị tình trạng tồn kho thời gian thực của tất cả sản phẩm, giúp:
- ✅ Theo dõi số lượng tồn kho chính xác
- ✅ Tính toán giá trị tài sản tồn kho  
- ✅ Phát hiện sản phẩm sắp hết/quá mức
- ✅ Hỗ trợ quyết định mua hàng/xuất kho

### 🚀 Cách truy cập
**Phương pháp 1**: Menu → "Quản lý tồn kho" → "Tồn kho hiện tại"
**Phương pháp 2**: URL trực tiếp `/admin/ton-kho-hien-tai`

### 📊 Giao diện và tính năng

#### Dashboard thống kê tổng quan:
- **📈 Tổng sản phẩm**: Số lượng SKU có tồn kho > 0
- **💰 Tổng giá trị**: Tổng giá trị tài sản tồn kho (VNĐ)
- **⚠️ Sắp hết hàng**: Sản phẩm có SL < mức tối thiểu
- **📦 Quá mức**: Sản phẩm có SL > mức tối đa khuyến nghị

#### Bảng dữ liệu chi tiết:
| Cột | Mô tả | Ví dụ |
|-----|-------|-------|
| **Mã SP** | Mã định danh sản phẩm | SP001 |
| **Tên sản phẩm** | Tên đầy đủ | Áo thun cotton nam |
| **Danh mục** | Phân loại sản phẩm | Thời trang nam |
| **Số lượng** | Tồn kho hiện tại | 150 |
| **Đơn vị** | Đơn vị tính | Cái, Kg, Thùng |
| **Giá vốn** | Giá nhập trung bình | 100,000 VNĐ |
| **Tổng giá trị** | SL × Giá vốn | 15,000,000 VNĐ |
| **Trạng thái** | Tình trạng tồn kho | Bình thường/Sắp hết/Quá mức |
| Tồn kho hiện tại | Số lượng hiện có trong kho |
| Giá trị tồn kho | Tổng giá trị = Số lượng × Đơn giá |
| Tồn kho tối thiểu | Mức cảnh báo sắp hết hàng |
| Tồn kho tối đa | Mức cảnh báo quá mức |
| Trạng thái | Bình thường, Sắp hết, Hết hàng, Quá mức |
| Cập nhật cuối | Thời gian cập nhật gần nhất |
| Thao tác | Các hành động có thể thực hiện |

#### Tính năng tìm kiếm và lọc
- **Tìm kiếm**: Nhập mã hoặc tên sản phẩm vào ô tìm kiếm
- **Lọc theo trạng thái**: 
  - Tất cả trạng thái
  - Bình thường
  - Sắp hết hàng
  - Hết hàng
  - Quá mức
- **Lọc theo danh mục**: Chọn danh mục sản phẩm

### 🔍 Tính năng tìm kiếm và lọc

#### Thanh tìm kiếm thông minh:
- **🔤 Tìm theo mã**: Nhập mã sản phẩm chính xác (VD: SP001)
- **📝 Tìm theo tên**: Hỗ trợ tìm kiếm mờ (VD: "áo" → tìm tất cả áo)
- **🏷️ Tìm theo danh mục**: Lọc theo phân loại sản phẩm

#### Bộ lọc nâng cao:
```
🔽 Danh mục sản phẩm:
├── Tất cả danh mục
├── Thời trang nam  
├── Thời trang nữ
├── Phụ kiện
└── [Các danh mục khác...]

🔽 Trạng thái tồn kho:
├── Tất cả sản phẩm
├── Bình thường (tồn kho ổn định)
├── Sắp hết hàng (SL < 10)
├── Hết hàng (SL = 0)
└── Quá mức (SL > 1000)
```

### ⚡ Thao tác nhanh

#### Với từng sản phẩm:
- **👁️ Xem chi tiết**: Click vào dòng sản phẩm
- **✏️ Chỉnh sửa**: Menu 3 chấm → "Chỉnh sửa sản phẩm"  
- **📋 Xem lịch sử**: Menu 3 chấm → "Lịch sử giao dịch"

#### Thao tác hàng loạt:
- **📊 Xuất Excel**: Tải danh sách tồn kho
- **🔄 Làm mới**: Cập nhật dữ liệu mới nhất
- **✅ Tạo chốt kho**: Chốt tồn kho hiện tại

### 🎨 Màu sắc và ký hiệu

#### Trạng thái tồn kho:
- 🟢 **Xanh lá**: Tồn kho bình thường
- 🟡 **Vàng**: Sắp hết hàng (cần đặt hàng)
- 🔴 **Đỏ**: Hết hàng (cần nhập gấp)
- 🟦 **Xanh dương**: Quá mức (cần xuất kho)

#### Biểu tượng hành động:
- 👁️ Xem chi tiết
- ✏️ Chỉnh sửa thông tin
- 📋 Lịch sử giao dịch
- ⚠️ Cảnh báo tồn kho

---

## 📋 2. LỊCH SỬ TỒN KHO

### 🎯 Mục đích và lợi ích
Theo dõi toàn bộ hoạt động xuất/nhập kho để:
- ✅ Kiểm tra tính chính xác của tồn kho
- ✅ Phân tích xu hướng xuất/nhập hàng
- ✅ Truy vết nguồn gốc thay đổi tồn kho
- ✅ Hỗ trợ kiểm toán và báo cáo

### 🚀 Cách truy cập
**Phương pháp 1**: Menu → "Quản lý tồn kho" → "Lịch sử tồn kho"
**Phương pháp 2**: URL trực tiếp `/admin/lichsu-tonkho`

### 📊 Giao diện và tính năng

#### Dashboard thống kê:
- **📈 Tổng giao dịch**: Số lượng phiếu xuất/nhập trong kỳ
- **⬆️ Tổng nhập**: Tổng số lượng/giá trị nhập kho
- **⬇️ Tổng xuất**: Tổng số lượng/giá trị xuất kho  
- **💹 Biến động**: Chênh lệch nhập/xuất kho

#### Bảng giao dịch chi tiết:
| Cột | Mô tả | Ví dụ |
|-----|-------|-------|
| **Mã GD** | Mã giao dịch duy nhất | NK2024001, XK2024002 |
| **Loại** | Nhập kho/Xuất kho | 🟢 Nhập / 🔴 Xuất |
| **Ngày** | Thời gian thực hiện | 15/01/2024 14:30 |
| **Sản phẩm** | Tên SP và số lượng | Áo thun (50 cái) |
| **Đối tác** | NCC hoặc khách hàng | Công ty ABC |
| **Giá trị** | Tổng giá trị giao dịch | 5,000,000 VNĐ |
| **Người tạo** | Nhân viên thực hiện | Nguyễn Văn A |
| **Trạng thái** | Tình trạng xử lý | Hoàn thành/Đang xử lý |

### 🔍 Tính năng tìm kiếm nâng cao

#### Tìm kiếm đa tiêu chí:
```
🔍 Thanh tìm kiếm:
├── Mã giao dịch (VD: NK2024001)
├── Tên sản phẩm (VD: "áo thun")
├── Tên đối tác (VD: "Công ty ABC")
└── Tên nhân viên (VD: "Nguyễn Văn A")
```

#### Bộ lọc chi tiết:
```
📅 Thời gian:
├── Hôm nay
├── 7 ngày qua  
├── Tháng này
├── Tháng trước
└── Tùy chỉnh (từ ngày - đến ngày)

🏷️ Loại giao dịch:
├── Tất cả giao dịch
├── 🟢 Chỉ nhập kho
└── 🔴 Chỉ xuất kho

📦 Sản phẩm:
├── Tất cả sản phẩm
└── [Chọn sản phẩm cụ thể]

👥 Đối tác:
├── Tất cả đối tác
├── Nhà cung cấp
└── Khách hàng
```

### ⚡ Thao tác với giao dịch

#### Xem chi tiết giao dịch:
1. **Click vào dòng giao dịch** để mở popup chi tiết
2. **Thông tin hiển thị**:
   - Thông tin cơ bản (mã, ngày, loại)
   - Danh sách sản phẩm chi tiết
   - Tồn kho trước/sau giao dịch
   - Lịch sử thay đổi trạng thái
   - File đính kèm (nếu có)

#### Thao tác khác:
- **📄 In phiếu**: Xuất phiếu nhập/xuất kho
- **✏️ Sửa giao dịch**: Chỉnh sửa (nếu chưa hoàn thành)
- **❌ Hủy giao dịch**: Hủy và hoàn tồn kho
- **📋 Sao chép**: Tạo giao dịch mới dựa trên giao dịch cũ

### 📊 Báo cáo và xuất dữ liệu

#### Xuất báo cáo:
- **📑 Excel chi tiết**: Tất cả giao dịch trong khoảng thời gian
- **📈 Báo cáo tổng hợp**: Thống kê theo ngày/tháng/quý
- **📊 Phân tích xu hướng**: Biểu đồ xuất/nhập theo thời gian

---

## ✅ 3. CHỐT KHO

### 🎯 Mục đích và tầm quan trọng
Chốt kho là quy trình quan trọng để:
- ✅ **Kiểm kê chính xác**: Đảm bảo số liệu tồn kho đúng
- ✅ **Tạo mốc thời gian**: Lưu trữ snapshot tồn kho tại thời điểm
- ✅ **Phân tích so sánh**: So sánh tồn kho giữa các kỳ
- ✅ **Báo cáo tài chính**: Hỗ trợ báo cáo cuối kỳ

### 🚀 Cách truy cập
**Phương pháp 1**: Menu → "Quản lý tồn kho" → "Chốt kho"
**Phương pháp 2**: URL trực tiếp `/admin/lichsu-tonkho/chot-kho`

### 📊 Giao diện quản lý chốt kho

#### Dashboard tổng quan:
- **📊 Tổng số lần chốt**: Số lần chốt kho đã thực hiện
- **📅 Lần chốt gần nhất**: Thời gian chốt kho cuối cùng
- **💰 Giá trị hiện tại**: Tổng giá trị tồn kho hiện tại
- **📈 Biến động**: % thay đổi so với lần chốt trước

#### Bảng lịch sử chốt kho:
| Cột | Mô tả | Ví dụ |
|-----|-------|-------|
| **Mã chốt** | Mã định danh | CK2024001 |
| **Ngày chốt** | Thời gian thực hiện | 31/01/2024 23:59 |
| **Người thực hiện** | Nhân viên chốt kho | Nguyễn Thị B |
| **Tổng SP** | Số lượng sản phẩm | 1,234 SKU |
| **Tổng giá trị** | Giá trị tài sản | 500,000,000 VNĐ |
| **Trạng thái** | Tình trạng | Hoàn thành/Đang xử lý |
| **Ghi chú** | Mô tả bổ sung | Chốt kho cuối tháng |

### 🆕 Tạo chốt kho mới

#### Quy trình thực hiện:
1. **🎯 Chuẩn bị**: 
   - Hoàn thành tất cả giao dịch pending
   - Kiểm tra tính nhất quán của dữ liệu
   - Thông báo cho team tạm dừng giao dịch

2. **🚀 Bắt đầu chốt**:
   ```
   👆 Click "Tạo chốt kho mới"
   ├── 📅 Chọn ngày chốt (mặc định: hôm nay)
   ├── 📝 Nhập ghi chú (VD: "Chốt kho cuối tháng 1")
   ├── ☑️ Xác nhận thông tin
   └── 🎯 Click "Bắt đầu chốt kho"
   ```

3. **⏳ Xử lý tự động**:
   - Hệ thống tạo snapshot tồn kho
   - Tính toán tổng giá trị tài sản
   - Tạo mã chốt kho duy nhất
   - Lưu trữ chi tiết từng sản phẩm

4. **✅ Hoàn thành**:
   - Kiểm tra kết quả chốt kho
   - Xuất báo cáo Excel
   - Thông báo completion cho team

### 🔍 Xem chi tiết chốt kho

#### Thông tin tổng quan:
- **📊 Thống kê cơ bản**: Tổng SP, tổng giá trị, ngày chốt
- **👥 Thông tin người tạo**: Nhân viên và thời gian
- **📝 Ghi chú**: Mô tả mục đích chốt kho

#### Danh sách sản phẩm chi tiết:
| Cột | Mô tả |
|-----|-------|
| **Mã SP** | Mã sản phẩm |
| **Tên SP** | Tên đầy đủ |
| **SL tồn** | Số lượng tại thời điểm chốt |
| **Đơn giá** | Giá vốn tại thời điểm chốt |
| **Thành tiền** | Số lượng × Đơn giá |
| **Ghi chú** | Mô tả đặc biệt (nếu có) |

#### So sánh với chốt kho trước:
- **📈 Sản phẩm tăng**: Danh sách SP có tồn kho tăng
- **📉 Sản phẩm giảm**: Danh sách SP có tồn kho giảm  
- **🆕 Sản phẩm mới**: SP được thêm sau lần chốt trước
- **❌ Sản phẩm ngừng**: SP không còn tồn kho

### 📊 Báo cáo và xuất dữ liệu

#### Các loại báo cáo:
- **📑 Báo cáo chi tiết**: Excel đầy đủ thông tin tất cả SP
- **📈 Báo cáo tổng hợp**: Thống kê theo danh mục
- **📊 Phân tích so sánh**: So sánh với chốt kho trước
- **💹 Báo cáo biến động**: Phân tích xu hướng tồn kho

---

## ➕ 4. TẠO GIAO DỊCH MỚI

### 🎯 Mục đích và phạm vi
Tính năng này cho phép tạo các loại giao dịch:
- ✅ **📥 Nhập kho**: Nhập hàng từ nhà cung cấp
- ✅ **📤 Xuất kho**: Bán hàng, chuyển kho, hủy hàng
- ✅ **🔄 Điều chuyển**: Chuyển hàng giữa các kho
- ✅ **📊 Kiểm kê**: Điều chỉnh tồn kho sau kiểm đếm

### 🚀 Cách truy cập
**Phương pháp 1**: Menu → "Quản lý tồn kho" → "Tạo giao dịch mới"
**Phương pháp 2**: URL trực tiếp `/admin/lichsu-tonkho/0`
**Phương pháp 3**: Từ trang khác click nút "➕ Tạo giao dịch"

### 📥 TẠO PHIẾU NHẬP KHO

#### Bước 1: Thông tin cơ bản
```
📋 Form nhập thông tin:
├── 🏷️ Mã phiếu: [Tự động] hoặc [Nhập thủ công]
├── 📅 Ngày nhập: [Chọn ngày] (mặc định: hôm nay)
├── 🏢 Nhà cung cấp: [Dropdown chọn NCC]
├── 🏪 Kho nhận: [Dropdown chọn kho đích]
├── 💰 Loại nhập: [Nhập mua/Nhập trả/Điều chuyển]
└── 📝 Ghi chú: [Mô tả lý do nhập kho]
```

#### Bước 2: Thêm sản phẩm
```
🛒 Danh sách sản phẩm:
├── 🔍 Tìm sản phẩm: [Mã/Tên/Barcode]
├── ➕ Thêm sản phẩm: 
│   ├── 📦 Chọn sản phẩm
│   ├── 🔢 Số lượng nhập
│   ├── 💵 Đơn giá nhập
│   ├── 📊 Tự động tính thành tiền
│   └── 📝 Ghi chú cho SP
└── 📋 Danh sách đã thêm
```

#### Bước 3: Kiểm tra và hoàn thành
```
✅ Kiểm tra thông tin:
├── 📊 Tổng số lượng sản phẩm
├── 💰 Tổng giá trị nhập kho
├── 📋 Review danh sách chi tiết
└── 🎯 Hành động:
    ├── 💾 Lưu nháp (có thể sửa sau)
    └── ✅ Hoàn thành (cập nhật tồn kho)
```

### 📤 TẠO PHIẾU XUẤT KHO

#### Bước 1: Thông tin cơ bản
```
📋 Form nhập thông tin:
├── 🏷️ Mã phiếu: [Tự động] hoặc [Nhập thủ công]
├── 📅 Ngày xuất: [Chọn ngày] (mặc định: hôm nay)
├── 👥 Khách hàng: [Dropdown chọn KH] (nếu bán)
├── 🏪 Kho xuất: [Dropdown chọn kho nguồn]
├── 🎯 Lý do xuất: [Bán hàng/Chuyển kho/Hủy hàng/Khác]
└── 📝 Ghi chú: [Mô tả chi tiết]
```

#### Bước 2: Thêm sản phẩm (có kiểm tra tồn kho)
```
🛒 Danh sách sản phẩm:
├── 🔍 Tìm sản phẩm: [Hiển thị số lượng tồn]
├── ➕ Thêm sản phẩm:
│   ├── 📦 Chọn sản phẩm
│   ├── 🔢 Số lượng xuất ⚠️ [Không vượt quá tồn kho]
│   ├── 💵 Đơn giá xuất (nếu bán)
│   ├── 📊 Tự động tính thành tiền
│   └── 📝 Ghi chú cho SP
└── ⚠️ Cảnh báo: Đỏ nếu vượt tồn kho
```

#### Bước 3: Xác nhận và hoàn thành
```
✅ Kiểm tra kỹ lưỡng:
├── 📊 Tổng số lượng xuất
├── 🔍 Kiểm tra tồn kho đủ
├── 💰 Tổng giá trị (nếu bán)
└── 🎯 Hành động:
    ├── 💾 Lưu nháp
    └── ✅ Hoàn thành (trừ tồn kho)
```

### 🔄 Quy trình kiểm tra và xác nhận

#### Validation tự động:
- ✅ **Kiểm tra tồn kho**: Không cho xuất quá số lượng có
- ✅ **Kiểm tra thông tin**: Bắt buộc nhập đầy đủ
- ✅ **Kiểm tra quyền**: Xác thực quyền của user
- ✅ **Kiểm tra logic**: Đảm bảo tính hợp lý

#### Trạng thái giao dịch:
- 📝 **Nháp**: Chưa ảnh hưởng tồn kho, có thể sửa
- ⏳ **Đang xử lý**: Đã khóa, chờ xác nhận
- ✅ **Hoàn thành**: Đã cập nhật tồn kho
- ❌ **Đã hủy**: Đã hủy và hoàn tồn kho

### 📋 Quản lý giao dịch sau tạo

#### Chỉnh sửa giao dịch:
- **📝 Giao dịch nháp**: Có thể sửa tất cả thông tin
- **⏳ Đang xử lý**: Chỉ sửa ghi chú và một số thông tin
- **✅ Hoàn thành**: Không thể sửa, chỉ có thể xem

#### Hủy giao dịch:
- **📝 Giao dịch nháp**: Xóa trực tiếp
- **✅ Hoàn thành**: Tạo giao dịch đảo ngược để hoàn tồn kho

---

## 🛠️ TÍNH NĂNG NÂNG CAO

### 🔍 Tìm kiếm thông minh

#### Smart Search Engine:
- **🔤 Tìm chính xác**: Mã sản phẩm, mã giao dịch
- **🔍 Tìm mờ**: Tên sản phẩm, tên khách hàng  
- **🏷️ Tìm theo thuộc tính**: Danh mục, nhà cung cấp
- **📅 Tìm theo thời gian**: Ngày, tuần, tháng, năm

#### Advanced Filters:
```
🎯 Bộ lọc đa tiêu chí:
├── 🏷️ Danh mục sản phẩm
├── 💰 Khoảng giá trị
├── 📊 Trạng thái tồn kho  
├── 👥 Nhà cung cấp/Khách hàng
├── 📅 Khoảng thời gian
└── 👤 Người thực hiện
```

### 📊 Dashboard và thống kê

#### Real-time Analytics:
- **📈 Xu hướng tồn kho**: Biểu đồ theo thời gian
- **🔥 Top sản phẩm**: Bán chạy, ít bán, sắp hết
- **💹 Phân tích giá trị**: Tài sản, doanh thu, lợi nhuận
- **⚠️ Cảnh báo thông minh**: Tồn kho, giá trị, xu hướng

#### Custom Reports:
- **📑 Báo cáo tùy chỉnh**: Chọn trường, filter, format
- **📅 Báo cáo định kỳ**: Tự động gửi email hàng ngày/tuần
- **📊 Dashboard cá nhân**: Thiết lập theo vai trò
- **📈 Phân tích so sánh**: Kỳ này vs kỳ trước

### 🔐 Bảo mật và phân quyền

#### Hệ thống phân quyền chi tiết:
```
👑 Super Admin:
├── ✅ Toàn quyền truy cập
├── ✅ Cấu hình hệ thống
├── ✅ Quản lý user và quyền
└── ✅ Xóa/sửa bất kỳ dữ liệu

👨‍💼 Quản lý kho:
├── ✅ Xem tất cả báo cáo
├── ✅ Tạo/sửa giao dịch
├── ✅ Chốt kho
└── ❌ Không xóa dữ liệu quan trọng

👷 Nhân viên kho:
├── ✅ Xem tồn kho hiện tại
├── ✅ Tạo giao dịch xuất/nhập
├── ❌ Không chốt kho
└── ❌ Không xem báo cáo tài chính

🧮 Kế toán:
├── ✅ Xem tất cả báo cáo
├── ✅ Chốt kho
├── ❌ Không tạo giao dịch
└── ❌ Không sửa tồn kho

👁️ Chỉ xem:
├── ✅ Xem dashboard và báo cáo
└── ❌ Không có quyền chỉnh sửa
```

#### Audit Trail:
- **📝 Log đầy đủ**: Ghi lại mọi thay đổi dữ liệu
- **👤 Thông tin user**: Ai, khi nào, làm gì
- **🔍 Truy vết**: Theo dõi lịch sử thay đổi
- **🔒 Không thể xóa**: Log được bảo vệ

### 📱 Responsive Design

#### Tương thích đa thiết bị:
```
💻 Desktop (>= 1024px):
├── 📊 Giao diện đầy đủ tính năng
├── 🗂️ Hiển thị nhiều cột bảng
├── 📈 Biểu đồ và dashboard chi tiết
└── ⌨️ Hỗ trợ keyboard shortcuts

💽 Tablet (768px - 1023px):
├── 📱 Giao diện tối ưu cảm ứng
├── 🔄 Cột bảng có thể ẩn/hiện
├── 👆 Touch-friendly buttons
└── 📊 Dashboard responsive

📱 Mobile (< 768px):
├── 📋 Giao diện dạng list/card
├── 🔍 Tìm kiếm và filter ưu tiên
├── ➕ Action buttons dễ chạm
└── 📊 Charts tối giản
```

### 🔔 Hệ thống thông báo

#### Real-time Notifications:
- **⚠️ Cảnh báo tồn kho**: Sắp hết, quá mức
- **✅ Hoàn thành giao dịch**: Xác nhận thành công
- **❌ Lỗi xử lý**: Thông báo lỗi và cách khắc phục
- **📊 Báo cáo định kỳ**: Tổng kết hàng ngày/tuần

#### Notification Channels:
- **🔔 In-app**: Thông báo trong ứng dụng
- **📧 Email**: Gửi email cho các sự kiện quan trọng
- **📱 Push**: Thông báo push trên mobile
- **💬 Chat**: Tích hợp Slack/Teams (nếu có)

### 🔧 Cấu hình hệ thống

#### Tùy chỉnh nghiệp vụ:
```
⚙️ Cài đặt tồn kho:
├── 📏 Mức tồn kho tối thiểu
├── 📊 Mức tồn kho tối đa
├── 💰 Phương pháp tính giá (FIFO/LIFO/WAC)
└── 🔄 Tần suất chốt kho

⚙️ Cài đặt giao dịch:
├── 🏷️ Mẫu mã phiếu tự động
├── 📝 Trường bắt buộc
├── ✅ Quy trình phê duyệt
└── 🔒 Khóa chỉnh sửa sau X ngày

⚙️ Cài đặt báo cáo:
├── 📊 Template báo cáo mặc định
├── 📅 Lịch gửi báo cáo tự động
├── 🎨 Customize giao diện
└── 📈 Biểu đồ mặc định
```

---

## 🚨 XỬ LÝ SỰ CỐ VÀ KHẮC PHỤC LỖI

### ❗ Các tình huống thường gặp

#### 🔢 Sai lệch số liệu tồn kho

**🔍 Triệu chứng:**
- Số lượng tồn kho không khớp với thực tế
- Báo cáo có số âm
- Giá trị tồn kho bất thường

**🕵️ Nguyên nhân phổ biến:**
- Giao dịch chưa được xử lý hoàn tất
- Nhập sai số liệu khi tạo giao dịch
- Lỗi hệ thống trong quá trình cập nhật
- Có giao dịch bị duplicate

**🛠️ Cách khắc phục:**

1. **Kiểm tra giao dịch gần đây:**
   ```
   📋 Checklist:
   ├── ✅ Xem lịch sử giao dịch 7 ngày qua
   ├── ✅ Tìm giao dịch có trạng thái "Đang xử lý"
   ├── ✅ Kiểm tra giao dịch có số lượng bất thường
   └── ✅ Hoàn thành các giao dịch pending
   ```

2. **Thực hiện chốt kho điều chỉnh:**
   ```
   🔧 Quy trình:
   ├── 📊 Kiểm đếm tồn kho thực tế
   ├── 📋 So sánh với số liệu hệ thống  
   ├── 📝 Tạo phiếu điều chỉnh
   └── ✅ Cập nhật vào hệ thống
   ```

3. **Liên hệ support nếu cần:**
   - Cung cấp mã sản phẩm có vấn đề
   - Screenshot số liệu sai lệch
   - Thời gian phát hiện sự cố

#### 🚫 Không thể tạo giao dịch xuất kho

**🔍 Triệu chứng:**
- Hệ thống báo "Không đủ tồn kho"
- Button "Hoàn thành" bị disable
- Số lượng xuất bị giới hạn

**🕵️ Nguyên nhân:**
- Số lượng xuất > tồn kho hiện có
- Có giao dịch khác đang "hold" hàng
- Sản phẩm bị khóa tạm thời

**🛠️ Cách khắc phục:**

1. **Kiểm tra tồn kho thực tế:**
   ```
   🔍 Các bước:
   ├── 📦 Vào "Tồn kho hiện tại"
   ├── 🔍 Tìm sản phẩm cần xuất
   ├── 👁️ Xem số lượng available
   └── 📋 Kiểm tra giao dịch đang pending
   ```

2. **Điều chỉnh số lượng xuất:**
   - Giảm số lượng xuất phù hợp với tồn kho
   - Hoặc chia thành nhiều lần xuất

3. **Xử lý giao dịch pending:**
   - Hoàn thành giao dịch đang dở
   - Hoặc hủy nếu không cần thiết

#### 🌐 Dữ liệu không hiển thị

**🔍 Triệu chứng:**
- Trang trắng hoặc loading mãi
- Bảng không có dữ liệu
- Lỗi "Không thể kết nối server"

**🛠️ Cách khắc phục:**

1. **Kiểm tra cơ bản:**
   ```
   🔧 Quick fixes:
   ├── 🔄 Làm mới trang (Ctrl+F5)
   ├── 🧹 Xóa cache trình duyệt
   ├── 🌐 Kiểm tra kết nối internet
   └── 🔄 Đăng xuất và đăng nhập lại
   ```

2. **Kiểm tra trình duyệt:**
   ```
   🌐 Browser support:
   ├── ✅ Chrome (khuyến nghị)
   ├── ✅ Firefox
   ├── ✅ Safari  
   ├── ✅ Edge
   └── ❌ IE (không hỗ trợ)
   ```

3. **Kiểm tra quyền truy cập:**
   - Đảm bảo account có quyền xem module
   - Liên hệ admin để cấp quyền

#### ⏰ Lỗi khi chốt kho

**🔍 Triệu chứng:**
- "Không thể thực hiện chốt kho"
- Process bị stuck ở một bước
- Timeout error

**🕵️ Nguyên nhân:**
- Có giao dịch đang xử lý
- Dữ liệu quá lớn
- Conflict với user khác

**🛠️ Cách khắc phục:**

1. **Chuẩn bị trước khi chốt:**
   ```
   📋 Pre-checklist:
   ├── ✅ Hoàn thành tất cả giao dịch pending
   ├── ✅ Thông báo team tạm dừng thao tác
   ├── ✅ Kiểm tra không có user khác online
   └── ✅ Backup dữ liệu (optional)
   ```

2. **Retry với timeout lớn hơn:**
   - Đợi 5-10 phút rồi thử lại
   - Chọn thời gian ít traffic (sáng sớm, tối muộn)

3. **Liên hệ support kỹ thuật:**
   - Cung cấp thời gian thực hiện
   - Screenshot error message
   - Số lượng sản phẩm trong hệ thống

### 🔧 Bảo trì định kỳ

#### 🕐 Lịch bảo trì hệ thống

**Bảo trì hàng ngày (tự động):**
- **2:00 AM - 3:00 AM**: Backup dữ liệu
- **3:00 AM - 3:30 AM**: Dọn dẹp log cũ
- **3:30 AM - 4:00 AM**: Optimize database

**Bảo trì hàng tuần:**
- **Chủ nhật 1:00 AM - 5:00 AM**: Bảo trì tổng thể
- Kiểm tra hiệu suất hệ thống
- Cập nhật security patches
- Sync dữ liệu với hệ thống khác

**Bảo trì hàng tháng:**
- **Chủ nhật đầu tháng 0:00 AM - 6:00 AM**: Bảo trì lớn
- Cập nhật phiên bản mới
- Optimize toàn bộ database
- Testing và quality check

#### 💾 Backup và recovery

**Backup schedule:**
```
💾 Backup tự động:
├── 🕐 Hàng giờ: Backup transaction logs
├── 🌙 Hàng ngày: Full backup database  
├── 📅 Hàng tuần: Backup files và config
└── 📆 Hàng tháng: Archive backup lâu dài
```

**Recovery options:**
- **⚡ Point-in-time recovery**: Phục hồi đến thời điểm cụ thể
- **📊 Selective recovery**: Chỉ phục hồi dữ liệu cần thiết
- **🔄 Full system restore**: Phục hồi toàn bộ hệ thống

#### 📊 Monitoring và alerts

**Real-time monitoring:**
- **🚀 Performance**: Response time, CPU, Memory
- **💾 Storage**: Disk space, backup status  
- **👥 Users**: Concurrent users, failed logins
- **🔄 Transactions**: Success rate, error rate

**Alert thresholds:**
```
⚠️ Warning alerts:
├── 📊 CPU > 70% trong 5 phút
├── 💾 Disk space < 20%
├── 🐌 Response time > 3 seconds
└── ❌ Error rate > 5%

🚨 Critical alerts:
├── 📊 CPU > 90% trong 2 phút
├── 💾 Disk space < 10%
├── 🐌 Response time > 10 seconds
└── ❌ Error rate > 20%
```

---

## 📞 HỖ TRỢ VÀ LIÊN HỆ

### 🎯 Kênh hỗ trợ chính

#### 📞 Hotline 24/7
- **☎️ Số điện thoại**: [Cập nhật số hotline]
- **⏰ Thời gian**: 24/7 cho sự cố nghiêm trọng
- **🕐 Giờ hành chính**: 8:00 - 17:00 (T2-T6) cho support thường
- **🆔 Khi gọi cần cung cấp**: 
  - Tên công ty và mã khách hàng
  - Mô tả sự cố chi tiết
  - Thời gian xảy ra sự cố
  - Username đang gặp vấn đề

#### 📧 Email Support
- **✉️ Email chính**: support@[domain].com
- **🚨 Email khẩn cấp**: emergency@[domain].com  
- **📊 Email báo cáo**: reports@[domain].com
- **⏱️ Response time**: 
  - Khẩn cấp: < 1 giờ
  - Cao: < 4 giờ  
  - Trung bình: < 24 giờ
  - Thấp: < 72 giờ

#### 💬 Live Chat
- **🌐 Trên website**: Click icon chat góc phải
- **⏰ Online**: 8:00 - 22:00 (T2-CN)
- **🤖 Chatbot**: 24/7 cho câu hỏi cơ bản
- **👨‍💻 Human agent**: Trong giờ hành chính

### 🐛 Báo cáo lỗi hiệu quả

#### 📋 Template báo cáo bug

```
🐛 BUG REPORT TEMPLATE:

📍 THÔNG TIN CƠ BẢN:
├── 🕐 Thời gian: [DD/MM/YYYY HH:MM]
├── 👤 Username: [Tên đăng nhập]
├── 🌐 Trình duyệt: [Chrome/Firefox/Safari + version]
├── 💻 Thiết bị: [Desktop/Tablet/Mobile]
└── 🔗 URL: [Link trang có lỗi]

🎯 MÔ TẢ LỖI:
├── 📝 Mô tả ngắn gọn: [Tóm tắt 1 dòng]
├── 📋 Các bước tái hiện:
│   ├── 1. [Bước 1]
│   ├── 2. [Bước 2]  
│   └── 3. [Bước 3]
├── 🎯 Kết quả mong đợi: [Gì được dự kiến xảy ra]
├── 💥 Kết quả thực tế: [Gì thực sự xảy ra]
└── 📊 Tác động: [Nghiêm trọng/Trung bình/Nhẹ]

📎 ĐÍNH KÈM:
├── 🖼️ Screenshot: [Ảnh chụp màn hình]
├── 🎥 Video: [Nếu cần thiết]
├── 📄 Log files: [Nếu có]
└── 📋 Error messages: [Copy text lỗi]
```

#### 🏷️ Phân loại mức độ ưu tiên

```
🚨 CRITICAL (Khẩn cấp):
├── 💥 Hệ thống down hoàn toàn
├── 💾 Mất dữ liệu
├── 🔒 Lỗi bảo mật nghiêm trọng
└── 💰 Ảnh hưởng trực tiếp doanh thu

⚠️ HIGH (Cao):
├── 🔧 Tính năng chính không hoạt động
├── 📊 Báo cáo sai số liệu
├── 🐌 Performance quá chậm
└── 👥 Ảnh hưởng nhiều user

🟡 MEDIUM (Trung bình):
├── 🎨 Lỗi giao diện  
├── 🔧 Tính năng phụ lỗi
├── 📱 Vấn đề responsive
└── 🔍 Lỗi tìm kiếm/lọc

🟢 LOW (Thấp):
├── 📝 Lỗi chính tả
├── 🎨 Màu sắc không đẹp
├── 💡 Đề xuất cải thiện  
└── 📚 Cập nhật documentation
```

### 📚 Tài liệu và nguồn học

#### 📖 Documentation Library
- **📋 User Manual**: Hướng dẫn chi tiết từng tính năng
- **🎥 Video Tutorials**: Playlist hướng dẫn trực quan  
- **❓ FAQ**: Câu hỏi thường gặp và giải đáp
- **🔄 Release Notes**: Thông tin cập nhật mới
- **📊 Best Practices**: Kinh nghiệm thực tế

#### 🎓 Training Program
```
📚 CHƯƠNG TRÌNH ĐÀO TẠO:

🎯 Basic Level (2-4 giờ):
├── 📖 Giới thiệu tổng quan hệ thống
├── 🔑 Hướng dẫn đăng nhập và navigation  
├── 📦 Sử dụng tồn kho hiện tại
└── 📋 Xem lịch sử giao dịch

🎯 Intermediate Level (4-6 giờ):
├── ➕ Tạo giao dịch nhập/xuất kho
├── ✅ Thực hiện chốt kho
├── 🔍 Sử dụng tìm kiếm nâng cao
└── 📊 Đọc hiểu báo cáo

🎯 Advanced Level (6-8 giờ):
├── ⚙️ Cấu hình hệ thống
├── 👥 Quản lý phân quyền
├── 📈 Phân tích dữ liệu chuyên sâu
└── 🔧 Xử lý sự cố phức tạp

🎯 Admin Level (8-12 giờ):
├── 🏗️ Cấu trúc database và API
├── 🔒 Bảo mật và backup
├── 📊 Monitoring và optimization
└── 🚀 Deployment và scaling
```

#### 🌐 Online Resources
- **🌍 Knowledge Base**: [URL knowledge base]
- **💬 Community Forum**: [URL forum thảo luận]
- **📺 YouTube Channel**: [Channel hướng dẫn]
- **📱 Mobile App**: [Link tải app mobile]

### 📅 Lịch bảo trì và thông báo

#### 📢 Kênh thông báo chính thức
- **📧 Email Newsletter**: Gửi hàng tuần
- **🔔 In-app Notifications**: Thông báo trong ứng dụng
- **📱 SMS**: Cho thông báo khẩn cấp
- **🌐 Status Page**: [URL trang trạng thái hệ thống]

#### 📅 Lịch bảo trì định kỳ
```
📆 MAINTENANCE SCHEDULE:

🕐 Hàng ngày:
├── 2:00-4:00 AM: Database backup và cleanup
└── Không ảnh hưởng sử dụng

📅 Hàng tuần:  
├── Chủ nhật 1:00-5:00 AM: Bảo trì hệ thống
├── ⚠️ Có thể gián đoạn 1-2 giờ
└── 📧 Thông báo trước 48 giờ

📆 Hàng tháng:
├── Chủ nhật đầu tháng 0:00-6:00 AM: Major update
├── ⚠️ Có thể gián đoạn 3-4 giờ  
└── 📧 Thông báo trước 1 tuần

🚀 Major Release:
├── 📅 Theo kế hoạch phát triển
├── ⚠️ Có thể gián đoạn 4-8 giờ
└── 📧 Thông báo trước 2 tuần
```

### 🎖️ Service Level Agreement (SLA)

#### ⏱️ Cam kết thời gian phản hồi
```
🎯 RESPONSE TIME SLA:

🚨 Critical Issues:
├── ⏱️ Response: < 1 giờ
├── 🔧 First fix: < 4 giờ  
└── ✅ Resolution: < 24 giờ

⚠️ High Priority:
├── ⏱️ Response: < 4 giờ
├── 🔧 First fix: < 24 giờ
└── ✅ Resolution: < 72 giờ

🟡 Medium Priority:
├── ⏱️ Response: < 24 giờ
├── 🔧 First fix: < 72 giờ
└── ✅ Resolution: < 1 tuần

🟢 Low Priority:
├── ⏱️ Response: < 72 giờ  
├── 🔧 First fix: < 1 tuần
└── ✅ Resolution: < 2 tuần
```

#### 📊 Cam kết chất lượng dịch vụ
- **⚡ Uptime**: ≥ 99.5% (< 3.6 giờ downtime/tháng)
- **🚀 Performance**: Response time < 3 giây (95% requests)
- **💾 Data integrity**: 99.99% tính chính xác dữ liệu
- **🔒 Security**: 100% tuân thủ chuẩn bảo mật

---

## 📝 PHỤ LỤC

### 🔤 Thuật ngữ và định nghĩa

| Thuật ngữ | Định nghĩa | Ví dụ |
|-----------|------------|-------|
| **SKU** | Stock Keeping Unit - Đơn vị lưu kho | SP001, SP002 |
| **Tồn kho** | Số lượng hàng hóa có sẵn trong kho | 150 cái, 20kg |
| **Chốt kho** | Kiểm kê và xác định tồn kho tại thời điểm | Chốt cuối tháng |
| **FIFO** | First In, First Out - Xuất trước, nhập trước | Hàng cũ xuất trước |
| **LIFO** | Last In, First Out - Xuất sau, nhập sau | Hàng mới xuất trước |
| **WAC** | Weighted Average Cost - Giá trung bình gia quyền | Tính theo tỷ lệ |

### 🔢 Công thức tính toán

#### 💰 Giá trị tồn kho:
```
Tổng giá trị = Σ(Số lượng × Đơn giá vốn)
```

#### 📊 Tỷ lệ vòng quay kho:
```
Inventory Turnover = Giá vốn hàng bán / Tồn kho trung bình
```

#### 📈 Tồn kho an toàn:
```
Safety Stock = (Mức tiêu thụ tối đa × Lead time) - (Mức tiêu thụ trung bình × Lead time)
```

### 🔧 Keyboard Shortcuts

| Phím tắt | Chức năng | Ghi chú |
|----------|-----------|---------|
| `Ctrl + F` | Tìm kiếm trong trang | Focus vào search box |
| `Ctrl + R` | Làm mới dữ liệu | Reload trang hiện tại |
| `Ctrl + N` | Tạo mới | Giao dịch/Chốt kho mới |
| `Ctrl + S` | Lưu | Lưu form đang nhập |
| `Ctrl + Enter` | Hoàn thành | Submit form |
| `Esc` | Hủy/Đóng | Đóng popup/modal |
| `F5` | Refresh | Tải lại trang |
| `Ctrl + P` | In | In báo cáo/phiếu |

### 📊 Status Codes và Messages

#### ✅ Success Messages:
- `200 OK`: Thao tác thành công
- `201 Created`: Tạo mới thành công  
- `204 No Content`: Xóa thành công

#### ⚠️ Warning Messages:
- `400 Bad Request`: Dữ liệu đầu vào không hợp lệ
- `401 Unauthorized`: Chưa đăng nhập
- `403 Forbidden`: Không có quyền truy cập
- `404 Not Found`: Không tìm thấy dữ liệu

#### 🚨 Error Messages:
- `500 Internal Server Error`: Lỗi hệ thống
- `502 Bad Gateway`: Lỗi kết nối server
- `503 Service Unavailable`: Hệ thống đang bảo trì
- `504 Gateway Timeout`: Quá thời gian chờ

### 🔗 API Endpoints (For Technical Users)

```
📡 MAIN ENDPOINTS:

GET /api/inventory/current
├── Lấy tồn kho hiện tại
└── Params: search, category, status

GET /api/inventory/history  
├── Lấy lịch sử giao dịch
└── Params: from, to, type, product

POST /api/inventory/transaction
├── Tạo giao dịch mới
└── Body: type, products[], note

GET /api/inventory/closing
├── Lấy danh sách chốt kho
└── Params: from, to, status

POST /api/inventory/closing
├── Tạo chốt kho mới  
└── Body: date, note

GET /api/reports/inventory
├── Báo cáo tồn kho
└── Params: format, date, filters
```

---

## 📋 CHECKLIST TRIỂN KHAI

### ✅ Checklist cho Admin/IT

#### 🔧 Cài đặt hệ thống:
- [ ] ✅ Cài đặt database và cấu hình
- [ ] ✅ Deploy application lên server
- [ ] ✅ Cấu hình SSL và security
- [ ] ✅ Setup backup tự động
- [ ] ✅ Cấu hình monitoring và alerting
- [ ] ✅ Test performance và load balancing

#### 👥 Quản lý người dùng:
- [ ] ✅ Tạo tài khoản cho từng nhân viên
- [ ] ✅ Phân quyền theo vai trò  
- [ ] ✅ Cấu hình Single Sign-On (nếu có)
- [ ] ✅ Setup email notifications
- [ ] ✅ Training cho power users
- [ ] ✅ Tạo documentation cho team

#### 📊 Migration dữ liệu:
- [ ] ✅ Backup dữ liệu hiện tại
- [ ] ✅ Import danh sách sản phẩm
- [ ] ✅ Import tồn kho ban đầu
- [ ] ✅ Import lịch sử giao dịch (nếu có)
- [ ] ✅ Verification tính chính xác
- [ ] ✅ UAT testing với real data

### ✅ Checklist cho End Users

#### 📚 Chuẩn bị:
- [ ] ✅ Nhận thông tin đăng nhập
- [ ] ✅ Tham gia training session
- [ ] ✅ Đọc user manual
- [ ] ✅ Bookmark các URL quan trọng
- [ ] ✅ Test đăng nhập và basic functions
- [ ] ✅ Save contact thông tin support

#### 🎯 Go-live checklist:
- [ ] ✅ Sync tồn kho cuối cùng
- [ ] ✅ Thông báo ngừng sử dụng hệ thống cũ
- [ ] ✅ Switch sang hệ thống mới
- [ ] ✅ Monitor closely trong 24h đầu
- [ ] ✅ Collect feedback từ users
- [ ] ✅ Fine-tune configuration

---

**📄 Thông tin tài liệu:**
- **📋 Tên tài liệu**: Hướng dẫn sử dụng Hệ thống Quản lý Tồn kho
- **📅 Phiên bản**: v2.0 
- **🗓️ Ngày cập nhật**: [Ngày hiện tại]
- **👤 Người soạn**: [Tên team phát triển]
- **✅ Trạng thái**: Phiên bản chính thức
- **🔄 Lần cập nhật tiếp theo**: [Ngày dự kiến]

**⚠️ Lưu ý quan trọng:**
> Tài liệu này được cập nhật thường xuyên theo phiên bản hệ thống. Vui lòng luôn sử dụng phiên bản mới nhất từ hệ thống hoặc liên hệ support để được cung cấp bản cập nhật.

**📞 Liên hệ cập nhật tài liệu:**
- Email: docs@[domain].com
- Đề xuất cải thiện: feedback@[domain].com
