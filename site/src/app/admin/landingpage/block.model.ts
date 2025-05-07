// src/app/models/block.model.ts
export type BlockType = 'text' | 'image' | 'button' | 'columns' | 'section' | 'container';

// --- Định nghĩa cấu trúc cho một tương tác ---
export interface Interaction {
  id: string; // ID duy nhất cho tương tác
  trigger: 'hover' | 'click'; // Sự kiện kích hoạt
  action: 'addClass'; // Hành động thực hiện (hiện tại chỉ hỗ trợ thêm class)
  // Có thể mở rộng action: removeClass, toggleClass, runAnimation, goToUrl,...
  className: string; // Tên lớp CSS sẽ được thêm
  // target?: string; // 'self' hoặc selector con (cho các action phức tạp hơn)
}

export interface Block {
  id: string;
  type: BlockType;
  order: number;
  data: BlockDataMap[BlockType] | any;
  styles?: { [key: string]: string };
  parentId?: string | null; // ID của drop list chứa khối này (vd: main-drop-list, col-xyz, section-abc, container-def)
  interactions?: Interaction[]; // Mảng interactions (tùy chọn)
}

// Định nghĩa kiểu dữ liệu cụ thể cho từng loại khối
export interface TextBlockData { content: string; }
export interface ImageBlockData { src: string; alt?: string; }
export interface ButtonBlockData { text: string; link?: string; variant?: 'primary' | 'secondary'; }
export interface Column { // Định nghĩa một Cột
  id: string; // ID duy nhất cho drop list của cột này
  blocks: Block[]; // **Quan trọng**: Mảng này không còn dùng để lưu trữ con trực tiếp, thay vào đó dùng parentId
  styles?: { [key: string]: string };
}
export interface ColumnsBlockData {
  columns: Omit<Column, 'blocks'>[]; // Chỉ lưu thông tin cột (id, styles), không lưu blocks lồng nhau ở đây
  gap?: string;
}
export interface SectionBlockData { } // Không lưu con trong data
export interface ContainerBlockData { } // Không lưu con trong data

// Tạo một kiểu Map để liên kết BlockType với kiểu Data tương ứng
export interface BlockDataMap {
  text: TextBlockData;
  image: ImageBlockData;
  button: ButtonBlockData;
  columns: ColumnsBlockData;
  section: SectionBlockData;
  container: ContainerBlockData;
}