export interface PhieuThuChi {
  id: string;
  maPhieu: string;
  loai: 'THU' | 'CHI';
  ngay: Date;
  soTien: number;
  donhangId?: string;
  dathangId?: string;
  doiTuong: 'KHACHHANG' | 'NHACUNGCAP' | 'NHANVIEN' | 'KHAC';
  doiTuongId?: string;
  tenDoiTuong?: string;
  phuongThuc: 'TIEN_MAT' | 'CHUYEN_KHOAN' | 'THE' | 'VI_DIEN_TU';
  coHoaDon: boolean;
  trangThai: 'NHAP' | 'CHO_DUYET' | 'DA_DUYET' | 'HUY' | 'DA_THANH_TOAN';
  paymentProposalSupplierId?: string;
  billImage?: string;
  nguoiTaoId?: string;
  nguoiDuyetId?: string;
  ngayDuyet?: Date;
  ghichu?: string;
  lydo?: string;
  createdAt: Date;
  updatedAt: Date;
  donhang?: any;
  dathang?: any;
}

export interface CreatePhieuThuChiDto {
  loai: 'THU' | 'CHI';
  soTien: number;
  donhangId?: string;
  dathangId?: string;
  paymentProposalSupplierId?: string;
  billImage?: string;
  doiTuong: 'KHACHHANG' | 'NHACUNGCAP' | 'NHANVIEN' | 'KHAC';
  doiTuongId?: string;
  tenDoiTuong?: string;
  phuongThuc?: 'TIEN_MAT' | 'CHUYEN_KHOAN' | 'THE' | 'VI_DIEN_TU';
  coHoaDon?: boolean;
  ghichu?: string;
  lydo?: string;
  ngay?: string;
  maDathang?: string;
  arDocumentItemId?: string;
}

export interface PhieuThuChiFilter {
  loai?: 'THU' | 'CHI';
  trangThai?: 'NHAP' | 'CHO_DUYET' | 'DA_DUYET' | 'HUY';
  doiTuong?: string;
  tuNgay?: string;
  denNgay?: string;
  page?: number;
  limit?: number;
}
