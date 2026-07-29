import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { StorageService } from '../../shared/utils/storage.service';

/**
 * Service gọi REST phân hệ Kế toán (/ketoan/*). Dùng fetch() + signals theo đúng
 * convention của DonhangService (interceptor Angular không áp cho fetch → tự gắn Bearer).
 */
@Injectable({ providedIn: 'root' })
export class KetoanService {
  private _storage = inject(StorageService);

  // state signals
  CongNoKH = signal<any[]>([]);
  TuoiNo = signal<any[]>([]);
  CongNoNCC = signal<any[]>([]);
  SoQuy = signal<any[]>([]);
  ChotList = signal<any[]>([]);
  NhacChot = signal<any[]>([]);

  private headers() {
    return {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this._storage.getItem('token'),
    };
  }

  private qs(params: Record<string, any>): string {
    const p = Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== '');
    return p.length ? '?' + p.map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join('&') : '';
  }

  private async get(path: string): Promise<any> {
    const res = await fetch(`${environment.APIURL}${path}`, { method: 'GET', headers: this.headers() });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }

  private async post(path: string, body: any): Promise<any> {
    const res = await fetch(`${environment.APIURL}${path}`, { method: 'POST', headers: this.headers(), body: JSON.stringify(body) });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }

  private async del(path: string): Promise<any> {
    const res = await fetch(`${environment.APIURL}${path}`, { method: 'DELETE', headers: this.headers() });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }

  async loadCongNoKH(limit?: number) {
    const data = await this.get(`/ketoan/bao-cao-cong-no${this.qs({ limit })}`);
    this.CongNoKH.set(data || []);
    return data;
  }

  async loadTuoiNo(asOf?: string, limit?: number) {
    const data = await this.get(`/ketoan/tuoi-no${this.qs({ asOf, limit })}`);
    this.TuoiNo.set(data || []);
    return data;
  }

  async loadCongNoNCC(limit?: number) {
    const data = await this.get(`/ketoan/bao-cao-cong-no-ncc${this.qs({ limit })}`);
    this.CongNoNCC.set(data || []);
    return data;
  }

  doiChieu(khachhangId: string) {
    return this.get(`/ketoan/doi-chieu/${khachhangId}`);
  }

  async loadSoQuy(params: { loai?: string; tuNgay?: string; denNgay?: string; limit?: number } = {}) {
    const data = await this.get(`/ketoan/phieu-thu-chi${this.qs(params)}`);
    this.SoQuy.set(data || []);
    return data;
  }

  taoPhieuThuChi(dto: any) {
    return this.post('/ketoan/phieu-thu-chi', dto);
  }

  /** Công nợ hiện tại của 1 khách (số dư cuối kỳ) — hiển thị khi lập phiếu thu. */
  congNoKhach(khachhangId: string) {
    return this.get(`/ketoan/cong-no-khach-hang/${khachhangId}`);
  }

  /** Xoá phiếu thu/chi nhầm (đảo bút toán + khôi phục công nợ). */
  xoaPhieu(id: string) {
    return this.del(`/ketoan/phieu-thu-chi/${id}`);
  }

  // ---- Chốt / đối chiếu công nợ ----
  taoBienBanChot(khachhangId: string, tuNgay: string, denNgay: string, force = false) {
    return this.post('/ketoan/chot-cong-no/tao', { khachhangId, tuNgay, denNgay, force });
  }

  taoBienBanChotNhom(nhomId: string, tuNgay: string, denNgay: string, force = false) {
    return this.post('/ketoan/chot-cong-no/tao', { nhomId, tuNgay, denNgay, force });
  }

  /** Tạo biên bản cho NHIỀU khách: sheetMode 'chung' (1 BB gộp) | 'tach' (mỗi KH 1 BB). */
  taoBienBanChotNhieu(khachhangIds: string[], tuNgay: string, denNgay: string, sheetMode: 'chung' | 'tach') {
    return this.post('/ketoan/chot-cong-no/tao-nhieu', { khachhangIds, tuNgay, denNgay, sheetMode });
  }

  /** Xoá biên bản NHÁP. */
  xoaBienBan(id: string) {
    return this.del(`/ketoan/chot-cong-no/${id}`);
  }

  /** Huỷ biên bản ĐÃ CHỐT (đảo bút toán). */
  huyBienBan(id: string, lyDo?: string) {
    return this.post(`/ketoan/chot-cong-no/${id}/huy`, { lyDo });
  }

  // ---- Nhóm khách hàng (chốt/thu chung) ----
  loadNhom() {
    return this.get('/ketoan/nhom');
  }
  capNhatChotChungNhom(nhomId: string, chotChung: boolean) {
    return this.post(`/ketoan/nhom/${nhomId}/chot-chung`, { chotChung });
  }
  congNoNhom(id: string, tuNgay?: string) {
    return this.get(`/ketoan/nhom/${id}/cong-no${this.qs({ tuNgay })}`);
  }
  /** Thành viên (chi nhánh) của nhóm — để bung ra chọn nhiều. */
  thanhVienNhom(id: string) {
    return this.get(`/ketoan/nhom/${id}/thanh-vien`);
  }

  chotCongNo(id: string, soChot?: number, lyDo?: string) {
    return this.post(`/ketoan/chot-cong-no/${id}/chot`, { soChot, lyDo });
  }

  async loadChotList(params: { khachhangId?: string; trangThai?: string; limit?: number } = {}) {
    const data = await this.get(`/ketoan/chot-cong-no${this.qs(params)}`);
    this.ChotList.set(data || []);
    return data;
  }

  async loadNhacChot(soNgayCanhBao = 7) {
    const data = await this.get(`/ketoan/nhac-chot${this.qs({ soNgayCanhBao })}`);
    this.NhacChot.set(data || []);
    return data;
  }

  caiChuKyChot(khachhangId: string, chuKyChotCongNo: number | null) {
    return this.post('/ketoan/cai-dat-chu-ky-chot', { khachhangId, chuKyChotCongNo });
  }

  chiTietBienBan(id: string) {
    return this.get(`/ketoan/chot-cong-no/${id}/chi-tiet`);
  }

  importChotFile(id: string, dong: any[]) {
    return this.post(`/ketoan/chot-cong-no/${id}/import`, { dong });
  }

  /** Tải file Excel biên bản đối chiếu về máy (fetch kèm token -> blob -> download). */
  async exportBienBan(id: string, filename?: string) {
    const res = await fetch(`${environment.APIURL}/ketoan/chot-cong-no/${id}/export`, { method: 'GET', headers: this.headers() });
    if (!res.ok) throw new Error(await res.text());
    const blob = await res.blob();
    const cd = res.headers.get('Content-Disposition') || '';
    const m = cd.match(/filename="?([^"]+)"?/);
    const name = filename || (m ? decodeURIComponent(m[1]) : `DoiChieu_${id}.xlsx`);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = name; a.click();
    URL.revokeObjectURL(url);
  }

  /** Tải 1 file Excel gồm NHIỀU biên bản (mỗi biên bản 1 sheet — tách sheet). */
  async exportBienBanNhieu(ids: string[], filename?: string) {
    const res = await fetch(`${environment.APIURL}/ketoan/chot-cong-no/export-nhieu`, { method: 'POST', headers: this.headers(), body: JSON.stringify({ ids }) });
    if (!res.ok) throw new Error(await res.text());
    const blob = await res.blob();
    const cd = res.headers.get('Content-Disposition') || '';
    const m = cd.match(/filename="?([^"]+)"?/);
    const name = filename || (m ? decodeURIComponent(m[1]) : `DoiChieu_${ids.length}BB.xlsx`);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = name; a.click();
    URL.revokeObjectURL(url);
  }

  // ---- Go-live + khai báo đầu kỳ ----
  layGoLive() {
    return this.get('/ketoan/go-live');
  }
  datGoLive(ngay: string) {
    return this.post('/ketoan/go-live', { ngay });
  }
  importGoLive(rows: any[], ngayChot?: string) {
    return this.post('/ketoan/khai-bao-go-live/import', { rows, ngayChot });
  }
  /** Tải template khai báo go-live (đã liệt kê khách). */
  async taiTemplateGoLive() {
    const res = await fetch(`${environment.APIURL}/ketoan/khai-bao-go-live/template`, { method: 'GET', headers: this.headers() });
    if (!res.ok) throw new Error(await res.text());
    const blob = await res.blob();
    const cd = res.headers.get('Content-Disposition') || '';
    const m = cd.match(/filename="?([^"]+)"?/);
    const name = m ? decodeURIComponent(m[1]) : 'KhaiBao_GoLive.xlsx';
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = name; a.click();
    URL.revokeObjectURL(url);
  }

  // ---- Quy đổi giá vốn ----
  capNhatQuyDoi(sanphamId: string, dto: { sanphamGocId: string | null; heSoQuyDoi: number; haoHutQuyDoi: number }) {
    return this.post(`/ketoan/quy-doi/${sanphamId}`, dto);
  }
  giaVonSanPham(sanphamId: string) {
    return this.get(`/ketoan/gia-von/${sanphamId}`);
  }
}
