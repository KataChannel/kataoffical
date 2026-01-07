# Kế hoạch nâng cấp Angular 19 lên Angular 21

## 1. Có nâng cấp được không?
**Trả lời: ĐƯỢC và RẤT NÊN.**
Angular có chu kỳ ra phiên bản lớn mỗi 6 tháng. 
- **Angular 20**: Dự kiến tháng 5/2025.
- **Angular 21**: Dự kiến tháng 11/2025.

Việc nâng cấp giúp ứng dụng nhận được các cải tiến về hiệu năng (Zoneless Angular), bảo mật và các tính năng Signals mới.

## 2. Lộ trình nâng cấp (Roadmap)

### Giai đoạn 1: Chuẩn bị (Hiện tại - Sớm 2025)
- Duy trì dự án ở Angular 19.x ổn định.
- Triệt để sử dụng Signals và Standalone Components (dự án hiện tại đã làm rất tốt điều này).

### Giai đoạn 2: Nâng cấp lên Angular 20 (Giữa 2025)
- Khi Angular 20 ra mắt, thực hiện lệnh `ng update @angular/core@20 @angular/cli@20`.
- Kiểm tra các thư viện bên thứ ba (Material, Tailwind) xem có tương thích không.

### Giai đoạn 3: Nâng cấp lên Angular 21 (Cuối 2025)
- Thực hiện nâng cấp tương tự từ 20 lên 21.
- **Lưu ý quan trọng**: Không nên nhảy cóc từ 19 lên 21 mà phải đi qua bản 20 để tránh lỗi vặt và tận dụng các script chuyển đổi tự động (Schematics).

## 3. Ưu và nhược điểm
- **Ưu điểm**: App chạy nhanh hơn, tốn ít bộ nhớ hơn, code dễ viết hơn.
- **Nhược điểm**: Cần tốn thời gian kiểm tra lại toàn bộ UI sau mỗi lần nâng cấp (Regression Testing).
