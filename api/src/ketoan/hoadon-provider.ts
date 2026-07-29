/**
 * Lớp trừu tượng nhà cung cấp Hóa đơn điện tử (HĐĐT).
 * Khi chốt nhà cung cấp thật (VNPT / Viettel S-Invoice / MISA meInvoice / EasyInvoice),
 * chỉ cần thêm 1 class implements HoaDonProvider và đăng ký ở KetoanModule.
 */
export interface HoaDonPhatHanhInput {
  khachhang?: { ten?: string | null; mst?: string | null; diachi?: string | null };
  tienHang: number;
  tienThue: number;
  tongTien: number;
  thueSuat: number;
  soDonHang?: string | null;
}

export interface HoaDonPhatHanhKetQua {
  provider: string;
  kyHieu: string;
  soHoaDon: string;
  maCQT: string; // mã cơ quan thuế
  linkTraCuu: string;
  providerRef: string;
}

export interface HoaDonProvider {
  readonly ten: string;
  phatHanh(input: HoaDonPhatHanhInput): Promise<HoaDonPhatHanhKetQua>;
  huy(soHoaDon: string, lyDo: string): Promise<{ ok: boolean }>;
}

export const HOADON_PROVIDER = 'HOADON_PROVIDER';

/**
 * Adapter MẪU (sandbox) — mô phỏng phát hành, KHÔNG gọi API thật.
 * Sinh số hóa đơn + mã CQT giả để chạy end-to-end trước khi tích hợp NCC thật.
 */
export class MockHoaDonProvider implements HoaDonProvider {
  readonly ten = 'MOCK';
  private seq = 0;

  async phatHanh(input: HoaDonPhatHanhInput): Promise<HoaDonPhatHanhKetQua> {
    this.seq += 1;
    const so = String(this.seq).padStart(8, '0');
    return {
      provider: this.ten,
      kyHieu: 'K26TAA',
      soHoaDon: so,
      maCQT: 'M' + so + 'CQT',
      linkTraCuu: `https://tracuu.example/hoadon/${so}`,
      providerRef: 'mock-' + so,
    };
  }

  async huy(): Promise<{ ok: boolean }> {
    return { ok: true };
  }
}
