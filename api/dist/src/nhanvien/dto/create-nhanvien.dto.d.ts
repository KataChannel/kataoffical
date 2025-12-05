import { GioiTinh, TrangThaiNhanvien } from '@prisma/client';
export declare class CreateNhanvienDto {
    maNV: string;
    maLamViec?: string;
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
