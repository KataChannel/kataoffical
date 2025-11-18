export interface Nhanvien {
  id: string;
  maNV: string;
  hoTen: string;
  cmnd?: string | null;
  gioiTinh?: GioiTinh | null;
  ngaySinh?: Date | string | null;
  queQuan?: string | null;
  diaChiHienTai?: string | null;
  soDienThoai?: string | null;
  email?: string | null;
  
  // Work information
  phongbanId?: string | null;
  chucVu?: string | null;
  viTri?: string | null;
  ngayVaoLam?: Date | string | null;
  trangThai: TrangThaiNhanvien;
  
  // Salary information
  luongCoBan?: number | null;
  phuCap?: number | null;
  heSoLuong?: number | null;
  
  // Bank information
  soTaiKhoan?: string | null;
  nganHang?: string | null;
  chiNhanh?: string | null;
  
  // System information
  userId?: string | null;
  isActive: boolean;
  ghiChu?: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
  
  // Relations
  phongban?: Phongban | null;
  user?: UserInfo | null;
}

export enum GioiTinh {
  NAM = 'NAM',
  NU = 'NU',
  KHAC = 'KHAC'
}

export const GioiTinhLabels: Record<GioiTinh, string> = {
  [GioiTinh.NAM]: 'Nam',
  [GioiTinh.NU]: 'Nữ',
  [GioiTinh.KHAC]: 'Khác'
};

export enum TrangThaiNhanvien {
  DANGLAMVIEC = 'DANGLAMVIEC',
  NGHIPHEP = 'NGHIPHEP',
  THUVIEC = 'THUVIEC',
  DANGHIVIEC = 'DANGHIVIEC',
  TAMNGHI = 'TAMNGHI',
  KHAC = 'KHAC'
}

export const TrangThaiNhanvienLabels: Record<TrangThaiNhanvien, string> = {
  [TrangThaiNhanvien.DANGLAMVIEC]: 'Đang làm việc',
  [TrangThaiNhanvien.NGHIPHEP]: 'Nghỉ phép',
  [TrangThaiNhanvien.THUVIEC]: 'Thử việc',
  [TrangThaiNhanvien.DANGHIVIEC]: 'Đã nghỉ việc',
  [TrangThaiNhanvien.TAMNGHI]: 'Tạm nghỉ',
  [TrangThaiNhanvien.KHAC]: 'Khác'
};

export const TrangThaiNhanvienColors: Record<TrangThaiNhanvien, string> = {
  [TrangThaiNhanvien.DANGLAMVIEC]: 'text-green-600 bg-green-50',
  [TrangThaiNhanvien.NGHIPHEP]: 'text-blue-600 bg-blue-50',
  [TrangThaiNhanvien.THUVIEC]: 'text-yellow-600 bg-yellow-50',
  [TrangThaiNhanvien.DANGHIVIEC]: 'text-gray-600 bg-gray-50',
  [TrangThaiNhanvien.TAMNGHI]: 'text-orange-600 bg-orange-50',
  [TrangThaiNhanvien.KHAC]: 'text-purple-600 bg-purple-50'
};

export interface CreateNhanvienDto {
  maNV: string;
  hoTen: string;
  cmnd?: string;
  gioiTinh?: GioiTinh;
  ngaySinh?: string;
  queQuan?: string;
  diaChiHienTai?: string;
  soDienThoai?: string;
  email?: string;
  phongbanId?: string;
  chucVu?: string;
  viTri?: string;
  ngayVaoLam?: string;
  trangThai?: TrangThaiNhanvien;
  luongCoBan?: number;
  phuCap?: number;
  heSoLuong?: number;
  soTaiKhoan?: string;
  nganHang?: string;
  chiNhanh?: string;
  userId?: string;
  isActive?: boolean;
  ghiChu?: string;
}

export interface UpdateNhanvienDto extends Partial<CreateNhanvienDto> {}

export interface NhanvienListResponse {
  data: Nhanvien[];
  total: number;
  page: number;
  limit: number;
}

export interface NhanvienQueryOptions {
  phongbanId?: string;
  trangThai?: TrangThaiNhanvien;
  chucVu?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface NhanvienStatistics {
  total: number;
  byPhongban: Array<{
    phongbanId: string | null;
    phongbanMa: string;
    phongbanTen: string;
    count: number;
  }>;
  byTrangThai: Array<{
    trangThai: TrangThaiNhanvien;
    _count: number;
  }>;
  byChucVu: Array<{
    chucVu: string | null;
    _count: number;
  }>;
  withUser: number;
  withoutPhongban: number;
}

// User info for relations
export interface UserInfo {
  id: string;
  email?: string | null;
  name?: string | null;
  isActive: boolean;
  createdAt?: Date | string;
}

// Import Phongban type for circular reference
export interface Phongban {
  id: string;
  ma: string;
  ten: string;
  [key: string]: any;
}
