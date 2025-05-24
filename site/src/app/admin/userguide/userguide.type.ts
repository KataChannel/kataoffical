// src/app/models/process.model.ts (Phiên bản Cập nhật)

// Định nghĩa các loại khối nội dung
export type ContentBlockType = 'text' | 'list' | 'image' | 'video';

// Interface cho một khối nội dung bất kỳ
export interface ContentBlock {
  type: ContentBlockType; // Loại nội dung ('text', 'list', 'image', 'video')
  text?: string; // Dùng cho type 'text'
  listItems?: string[]; // Dùng cho type 'list' (tương tự subSteps cũ)
  imageUrl?: string; // Dùng cho type 'image' (URL của hình ảnh)
  imageAlt?: string; // Alt text cho hình ảnh (tốt cho SEO và Accessibility)
  videoUrl?: string; // Dùng cho type 'video' (URL nguồn video)
  videoType?: string; // Loại video (ví dụ: 'video/mp4', 'video/webm' - tùy chọn, giúp trình duyệt chọn nguồn)
  caption?: string; // Chú thích cho hình ảnh hoặc video (tùy chọn)
  // Có thể thêm các thuộc tính khác như width/height cho media, author, v.v.
}

// Interface cho một bước trong quy trình (cập nhật để dùng contentBlocks)
export interface UserguidStep {
  time: string; // Thời gian hoặc nhãn bước
  title: string; // Tiêu đề chính của bước
  description?: string; // Mô tả tổng quan cho bước (tùy chọn)
  contentBlocks: ContentBlock[]; // Mảng các khối nội dung trong bước này
}

// Kiểu dữ liệu cho toàn bộ quy trình vẫn là mảng các bước
export type UserguidFlowData = UserguidStep[];