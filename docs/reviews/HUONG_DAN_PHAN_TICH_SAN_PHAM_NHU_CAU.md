# 📊 Hướng Dẫn Phân Tích Chỉ Số Nhu Cầu Đặt Hàng & Review Sản Phẩm

> **Cập nhật:** 28/02/2026 - Đã fix tất cả bug logic tính toán

---

## I. Giải Thích Các Cột & Công Thức Tính Toán

### 1. Chỉ số Nhu cầu (Đầu ra)
| Cột | Tên | Ý nghĩa | Nguồn dữ liệu |
|:----|:----|:--------|:---------------|
| `khachdat` | TỔNG ĐẶT (KHÁCH) | Đơn status = `dadat` (chưa xử lý giao) | `Donhang` where `status = 'dadat'` |
| `khachgiao` | TỔNG BÁN (GIAO) | Đã giao + nhận + hoàn thành | `Donhang` where `status IN ('dagiao','danhan','hoanthanh')` |

> ⚠️ **LƯU Ý:** Enum `StatusDonhang` chỉ có 5 giá trị: `dadat`, `dagiao`, `danhan`, `huy`, `hoanthanh`.
> Đơn `huy` được loại bỏ hoàn toàn khỏi tính toán.

### 2. Chỉ số Tồn kho (Đầu vào)
| Cột | Tên | Ý nghĩa | Nguồn dữ liệu |
|:----|:----|:--------|:---------------|
| `slton` | Tồn Hệ Thống | Tồn kho tự động, cập nhật qua phiếu nhập/xuất kho | `TonKho.slton` |
| `sltontt` | Tồn Chốt Kho | Số lượng kiểm kê vật lý lần cuối | `TonKho.sltontt` |
| `kho1→kho6` | Tồn kho nhánh | SL hàng đặt từ NCC cho từng kho | Tổng `Dathang.sldat` theo `makho` |
| `tongkho` | TỔNG TỒN | Tổng hàng có sẵn để bán | **Công thức:** `Σkho + sltontt` |

### 3. Chỉ số Hao hụt & Gợi ý
| Cột | Tên | Công thức |
|:----|:----|:----------|
| `haohut` | Tỉ Lệ Hao Hụt | % dự kiến hỏng (từ `TonKho.haohut` hoặc `Sanpham.haohut`) |
| `slhaohut` | SL Hao Hụt | `khachdat × (haohut / 100)` |
| `goiy` | SL CẦN ĐẶT (Gợi Ý) | `khachdat + slhaohut - tongkho` |

---

## II. Luồng Dữ Liệu Chi Tiết

```
API Query → Donhang (theo ngày) + Dathang (theo ngày) + TonKho + Sanpham
    ↓
DonhangsTranfer: flat map mỗi đơn → { masp, sldat, slgiao, slnhan, status }
DathangsTranfer: flat map mỗi đơn NCC → { masp, sldat, makho, mancc }
TonkhosTranfer:  map → { masp, slton, sltontt, slchogiao, slchonhap }
    ↓
transformFinalData():
  - Gắn NCC, kho vào sản phẩm
  - Phân khachdat (status=dadat) và khachgiao (dagiao/danhan/hoanthanh)
  - Phân bổ SL đặt NCC vào kho1-kho6 theo makho
    ↓
TonghopsFinal.forEach():
  - tongkho = Σkho + sltontt
  - slhaohut = GetSLHaohut(item)
  - goiy = GetGoiy(item)
    ↓
Sort by goiy DESC → Hiển thị bảng
```

---

## III. Ví dụ Tính Toán Thực Tế

### I100883 - Đậu hủ trứng CP 220gr
| Chỉ số | Giá trị | Giải thích |
|:-------|:--------|:-----------|
| khachdat | 5 | 5 cây được đặt (status=dadat) |
| khachgiao | 0 | Chưa giao đơn nào |
| slton | -36 | ⚠️ Âm! Có lỗi trong lịch sử phiếu kho |
| sltontt | 0 | Kiểm kê lúc 11:54 28/02 = 0 cây |
| kho1→kho6 | 0 | Không có hàng đang về từ NCC |
| **tongkho** | **0** | = 0 + 0 = 0 |
| haohut | 0% | Không tính hao hụt |
| slhaohut | 0 | = 5 × 0% = 0 |
| **goiy** | **5** | = 5 + 0 - 0 = **Cần đặt 5 cây** |

---

## IV. Các Bug Đã Fix (28/02/2026)

### Bug 1: Filter status dùng giá trị SAI
- **Trước:** Filter `khachgiao` dùng `completed`, `processed`, `done` → **KHÔNG TỒN TẠI** trong DB
- **Sau:** Dùng `dagiao`, `danhan`, `hoanthanh` → **khớp 100% với enum `StatusDonhang`**
- **Hậu quả cũ:** `khachgiao` luôn = 0 cho mọi sản phẩm

### Bug 2: tongkho tính sai
- **Trước:** `tongkho = Σkho + slton + khachdat` → Cộng cả tồn tự động (có thể âm) + nhu cầu khách
- **Sau:** `tongkho = Σkho + sltontt` → Chỉ dựa trên kiểm kê thực tế + hàng đang về NCC
- **Hậu quả cũ:** tongkho = -31 cho I100883 (phải là 0), goiy = 36 (phải là 5)

### Bug 3: Thứ tự tính slhaohut & goiy
- **Trước:** Tính `goiy` trước `slhaohut` → goiy không bao gồm hao hụt
- **Sau:** Tính `slhaohut` trước, rồi mới tính `goiy` → Chính xác

---

## V. Hướng Dẫn Vận Hành Nhanh

| Màu sắc Gợi ý | Ý nghĩa | Hành động |
|:--------------|:---------|:----------|
| 🔴 Đỏ (>0) | **THIẾU HÀNG** | Đặt NCC ngay theo số gợi ý |
| 🟢 Xanh (<0) | **ĐỦ HÀNG** | Không cần đặt thêm |
| 🟠 Cam (<-100) + ⚠️ | **DƯ NHIỀU** | Kiểm tra hạn sử dụng, cân nhắc xả hàng |

---
*Tài liệu cập nhật: 28/02/2026 16:28 - Hệ thống Rausach Final*
