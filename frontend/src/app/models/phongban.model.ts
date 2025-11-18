export interface Phongban {
  id: string;
  ma: string;
  ten: string;
  loai: LoaiPhongban;
  level: number;
  moTa?: string | null;
  dienThoai?: string | null;
  email?: string | null;
  diaChi?: string | null;
  truongPhongId?: string | null;
  parentId?: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
  
  // Relations
  parent?: Phongban | null;
  children?: Phongban[];
  truongPhong?: Nhanvien | null;
  nhanviens?: Nhanvien[];
  
  // Counts
  _count?: {
    children: number;
    nhanviens: number;
  };
}

export enum LoaiPhongban {
  PHONGBAN = 'PHONGBAN',
  BOPHAN = 'BOPHAN',
  PHONG = 'PHONG',
  BAN = 'BAN',
  TO = 'TO',
  NHOM = 'NHOM',
  KHAC = 'KHAC'
}

export const LoaiPhongbanLabels: Record<LoaiPhongban, string> = {
  [LoaiPhongban.PHONGBAN]: 'Phòng Ban',
  [LoaiPhongban.BOPHAN]: 'Bộ Phận',
  [LoaiPhongban.PHONG]: 'Phòng',
  [LoaiPhongban.BAN]: 'Ban',
  [LoaiPhongban.TO]: 'Tổ',
  [LoaiPhongban.NHOM]: 'Nhóm',
  [LoaiPhongban.KHAC]: 'Khác'
};

export interface CreatePhongbanDto {
  ma: string;
  ten: string;
  loai: LoaiPhongban;
  level?: number;
  moTa?: string;
  dienThoai?: string;
  email?: string;
  diaChi?: string;
  truongPhongId?: string;
  parentId?: string;
}

export interface UpdatePhongbanDto extends Partial<CreatePhongbanDto> {}

export interface PhongbanStatistics {
  total: number;
  byLevel: Array<{ level: number; _count: number }>;
  byLoai: Array<{ loai: LoaiPhongban; _count: number }>;
  topByNhanvien: Array<{
    id: string;
    ma: string;
    ten: string;
    nhanvienCount: number;
  }>;
}

// For GraphQL queries
export interface PhongbanQueryOptions {
  level?: number;
  loai?: LoaiPhongban;
  parentId?: string | null;
  includeChildren?: boolean;
}

// Import Nhanvien type for circular reference
export interface Nhanvien {
  id: string;
  maNV: string;
  hoTen: string;
  [key: string]: any;
}
