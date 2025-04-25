// src/app/models/block.model.ts
export type BlockType = 'text' | 'image' | 'button' | 'columns' | 'section' | 'container'; // <-- Thêm section, container

export interface Block {
  id: string;
  type: BlockType;
  order: number;
  data: BlockDataMap[BlockType] | any; // Sử dụng kiểu Map để rõ ràng hơn
  styles?: { [key: string]: string };
  parentId?: string | null; // ID của drop list chứa khối này (vd: main-drop-list, col-xyz, section-abc, container-def)
}

// Định nghĩa kiểu dữ liệu cụ thể cho từng loại khối
export interface TextBlockData { content: string; }
export interface ImageBlockData { src: string; alt?: string; }
export interface ButtonBlockData { text: string; link?: string; variant?: 'primary' | 'secondary'; }
export interface Column { // Định nghĩa một Cột
  id: string; // ID duy nhất cho drop list của cột này
  blocks: Block[]; // Mảng các khối nằm trong cột này
  styles?: { [key: string]: string }; // Kiểu dáng riêng cho cột (ví dụ: width)
}
export interface ColumnsBlockData {
  columns: Column[]; // Mảng các cột
  // Có thể thêm các tùy chọn khác như khoảng cách giữa các cột (gap)
  gap?: string; // ví dụ: '10px'
}
// --- Dữ liệu cho các khối mới ---
export interface SectionBlockData {
  // Có thể thêm các thuộc tính như tag (section, div, etc.), id riêng cho section...
  // Hiện tại chỉ cần để phân biệt loại khối
}
export interface ContainerBlockData {
  // Container cũng không lưu block con trong data, mà dùng parentId
  // Có thể thêm các tùy chọn layout sau này (vd: max-width, background...)
}

// Tạo một kiểu Map để liên kết BlockType với kiểu Data tương ứng
// Giúp type checking tốt hơn trong component và template
export interface BlockDataMap {
  text: TextBlockData;
  image: ImageBlockData;
  button: ButtonBlockData;
  columns: ColumnsBlockData;
  section: SectionBlockData; // Section không trực tiếp chứa 'blocks' trong data
  container: ContainerBlockData; // Container không trực tiếp chứa 'blocks' trong data
}