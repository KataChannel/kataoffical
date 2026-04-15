# Phân tích Logic Xuất Excel - Sheet Phiếu Chuyến

Tài liệu này tổng hợp phân tích về cách tính toán các trường dữ liệu trong sheet **Phiếu Chuyển** khi thực hiện chức năng "Xuất Excel SIÊU THỊ".

## 1. Chức năng Xuất Excel
- **Vị trí UI:** Nút download tại trang Vận đơn (Admin > Đơn hàng > Vận đơn).
- **Toolbox:** "Xuất Excel SIÊU THỊ (3 sheet: Vận đơn + Hàng Siêu Thị + Phiếu Chuyến)".
- **Hàm xử lý (Frontend):** `exportVandonToExcel()` trong `DonhangGraphqlService`.

## 2. Phân tích cột "Số Lượng TT" (Sheet Phiếu Chuyển)

Cột **Số Lượng TT** (Số lượng Thực Tế) trong sheet Phiếu Chuyển được thiết kế để thể hiện tổng khối lượng/số lượng hàng thực tế được bốc đi giao cho khách.

### Nguồn dữ liệu & Logic tính toán:
- **Trường dữ liệu gốc:** Lấy từ quan hệ `sanpham` (chi tiết sản phẩm trong đơn hàng - bảng `Donhangsanpham`).
- **Ưu tiên:**
    1. `slgiao` (Số lượng giao): Đây là giá thực tế được nhập sau khi soạn hàng.
    2. `sldat` (Số lượng đặt): Nếu `slgiao` chưa được cập nhật (bằng 0 hoặc null), hệ thống sẽ lấy `sldat` làm giá trị mặc định.
- **Phạm vi tính:** Chỉ tính tổng cho các sản phẩm có trạng thái `isActive = true`.

### Công thức mã nguồn (TypeScript):
```typescript
// Vị trí: frontend/src/app/admin/donhang/donhang-graphql.service.ts

const phieuChuyenSheetData = allActiveOrders.map((order: any, index: number) => {
  const activeProducts = (order.sanpham || []).filter((sp: any) => sp.isActive);
  
  // Số Lượng TT = Tổng SL Giao (Ưu tiên slgiao, fallback về sldat)
  const totalQtyTT = activeProducts.reduce((sum: number, sp: any) => 
    sum + (Number(sp.slgiao || sp.sldat) || 0), 0
  );

  return {
    // ... các trường khác
    'Số Lượng TT': totalQtyTT,
    // ...
  };
});
```

## 3. So sánh với các cột liên quan

| Cột trong Excel | Logic tính toán | Mục đích |
| :--- | :--- | :--- |
| **Số Lượng** | Tổng cộng `sldat` | Thể hiện nhu cầu đặt hàng ban đầu của khách. |
| **Số Lượng TT** | Tổng cộng (`slgiao` \|\| `sldat`) | Thể hiện khối lượng thực tế shipper mang đi. |
| **Tổng Số Món** | Đếm (count) số lượng dòng sản phẩm | Giúp shipper kiểm tra số lượng túi/thùng hàng. |

## 4. Kết luận
Cột **Số Lượng TT** là một cột động, phụ thuộc vào quá trình cập nhật số lượng giao thực tế trong hệ thống. Trong trường hợp nhân viên kho chưa cập nhật số lượng giao, nó sẽ hiển thị bằng đúng số lượng khách đặt.
