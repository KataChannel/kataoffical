// src/app/models/process.model.ts

// Định nghĩa các loại khối nội dung
export type ContentBlockType = 'text' | 'list' | 'image' | 'video';

// Interface cho một khối nội dung bất kỳ
export interface ContentBlock {
  type: ContentBlockType; // Loại nội dung ('text', 'list', 'image', 'video')
  text?: string; // Dùng cho type 'text'
  listItems?: string[]; // Dùng cho type 'list'
  imageUrl?: string; // Dùng cho type 'image' (URL của hình ảnh)
  imageAlt?: string; // Alt text cho hình ảnh
  videoUrl?: string; // Dùng cho type 'video' (URL nguồn video)
  videoType?: string; // Loại video (ví dụ: 'video/mp4')
  caption?: string; // Chú thích cho hình ảnh hoặc video
}

// Interface cho một bước trong quy trình
export interface ProcessStep {
  time: string; // Thời gian hoặc nhãn bước
  title: string; // Tiêu đề chính của bước
  description?: string; // Mô tả tổng quan cho bước
  contentBlocks: ContentBlock[]; // Mảng các khối nội dung trong bước này
}

// Kiểu dữ liệu cho toàn bộ quy trình
export type ProcessFlowData = ProcessStep[];
