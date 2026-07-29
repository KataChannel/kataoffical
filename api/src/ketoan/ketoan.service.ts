import { Injectable, BadRequestException, Inject, Optional } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { HOADON_PROVIDER, HoaDonProvider } from './hoadon-provider';

/**
 * KetoanService — Phân hệ Tài chính - Kế toán (chuẩn VN, TT133).
 * Phase 2: phiếu thu/chi + sổ chi tiết công nợ (CongNoGiaoDich) + bút toán tự động.
 *
 * Nguyên tắc hạch toán:
 *  - Ghi nhận bán hàng (đơn danhan):  Nợ 131 / Có 511 (+ Có 3331 nếu VAT)
 *  - Thu tiền khách hàng (PT):        Nợ 111/112 / Có 131
 *  - Chi trả nhà cung cấp (PC):       Nợ 331 / Có 111/112
 * Công nợ ròng = số dư đầu kỳ (CongNoDauKy) + Σ(psNo − psCo) trong CongNoGiaoDich.
 */
@Injectable()
export class KetoanService {
  constructor(
    private prisma: PrismaService,
    @Optional() @Inject(HOADON_PROVIDER) private hoaDonProvider?: HoaDonProvider,
  ) {}

  private tkTien(hinhthuc: string): string {
    return hinhthuc === 'CHUYENKHOAN' ? '112' : '111';
  }

  /** Sinh mã phiếu PT-/PC- tăng dần, zero-pad 6 chữ số. */
  private async genMaPhieu(loai: 'THU' | 'CHI', db: any): Promise<string> {
    const prefix = loai === 'THU' ? 'PT-' : 'PC-';
    const last = await db.phieuThuChi.findFirst({
      where: { loai },
      orderBy: { maphieu: 'desc' },
      select: { maphieu: true },
    });
    let n = 1;
    if (last?.maphieu?.startsWith(prefix)) {
      const num = parseInt(last.maphieu.slice(prefix.length), 10);
      if (!isNaN(num)) n = num + 1;
    }
    return prefix + String(n).padStart(6, '0');
  }

  /** Sinh số chứng từ bút toán, tăng dần theo prefix. */
  private async genSoButToan(db: any): Promise<string> {
    const last = await db.butToan.findFirst({
      where: { soCT: { startsWith: 'BT-' } },
      orderBy: { soCT: 'desc' },
      select: { soCT: true },
    });
    let n = 1;
    if (last?.soCT) {
      const num = parseInt(last.soCT.slice(3), 10);
      if (!isNaN(num)) n = num + 1;
    }
    return 'BT-' + String(n).padStart(8, '0');
  }

  /**
   * Lập phiếu thu / chi, tự sinh bút toán + ghi sổ chi tiết công nợ (gạch nợ).
   */
  async taoPhieuThuChi(dto: {
    loai: 'THU' | 'CHI';
    ngay?: Date;
    sotien: number;
    hinhthuc: string; // TIENMAT | CHUYENKHOAN
    nghiepvu: string; // THU_KH | TRA_NCC | CHI_PHI | KHAC
    khachhangId?: string;
    nhomId?: string; // thu 1 cục cho cả nhóm (chốt chung)
    nhacungcapId?: string;
    donhangId?: string;
    ghichu?: string;
    userId?: string;
  }) {
    if (!dto.sotien || dto.sotien <= 0) throw new BadRequestException('Số tiền phải > 0');
    if (dto.loai === 'THU' && dto.nghiepvu === 'THU_KH' && !dto.khachhangId && !dto.nhomId)
      throw new BadRequestException('Thu tiền khách hàng cần khachhangId hoặc nhomId');
    if (dto.loai === 'CHI' && dto.nghiepvu === 'TRA_NCC' && !dto.nhacungcapId)
      throw new BadRequestException('Chi trả NCC cần nhacungcapId');

    const ngay = dto.ngay ?? new Date();
    const tkTien = this.tkTien(dto.hinhthuc);

    return this.prisma.$transaction(async (tx) => {
      const maphieu = await this.genMaPhieu(dto.loai, tx);
      const soCT = await this.genSoButToan(tx);

      // 1) Bút toán kép
      const chiTiet: any[] = [];
      if (dto.loai === 'THU') {
        // Nợ 111/112 / Có 131 (khách hàng)
        chiTiet.push({ tkNo: tkTien, tkCo: '131', soTien: dto.sotien, khachhangId: dto.khachhangId ?? null });
      } else {
        // Nợ 331 (NCC) / Có 111/112
        chiTiet.push({ tkNo: '331', tkCo: tkTien, soTien: dto.sotien, nhacungcapId: dto.nhacungcapId ?? null });
      }
      const butToan = await tx.butToan.create({
        data: {
          soCT,
          ngay,
          dienGiai: `${dto.loai === 'THU' ? 'Thu' : 'Chi'} - ${dto.nghiepvu}`,
          nguon: dto.loai === 'THU' ? 'PHIEUTHU' : 'PHIEUCHI',
          chiTiet: { create: chiTiet },
        },
      });

      // 2) Phiếu thu/chi
      const phieu = await tx.phieuThuChi.create({
        data: {
          maphieu,
          loai: dto.loai,
          ngay,
          sotien: dto.sotien,
          hinhthuc: dto.hinhthuc,
          nghiepvu: dto.nghiepvu,
          khachhangId: dto.khachhangId ?? null,
          nhomId: dto.nhomId ?? null,
          nhacungcapId: dto.nhacungcapId ?? null,
          donhangId: dto.donhangId ?? null,
          ghichu: dto.ghichu ?? null,
          userId: dto.userId ?? null,
          butToanId: butToan.id,
        },
      });

      // 3) Sổ chi tiết công nợ (gạch nợ)
      if (dto.loai === 'THU' && dto.khachhangId) {
        // Thu tiền KH -> giảm nợ phải thu -> psCo
        await tx.congNoGiaoDich.create({
          data: {
            doiTuongLoai: 'KH',
            khachhangId: dto.khachhangId,
            ngay,
            chungTuLoai: 'PHIEUTHU',
            chungTuId: phieu.id,
            soChungTu: maphieu,
            dienGiai: dto.ghichu ?? 'Thu tiền khách hàng',
            psNo: 0,
            psCo: dto.sotien,
          },
        });
      } else if (dto.loai === 'CHI' && dto.nhacungcapId) {
        // Trả tiền NCC -> giảm nợ phải trả -> psNo
        await tx.congNoGiaoDich.create({
          data: {
            doiTuongLoai: 'NCC',
            nhacungcapId: dto.nhacungcapId,
            ngay,
            chungTuLoai: 'PHIEUCHI',
            chungTuId: phieu.id,
            soChungTu: maphieu,
            dienGiai: dto.ghichu ?? 'Trả tiền nhà cung cấp',
            psNo: dto.sotien,
            psCo: 0,
          },
        });
      }

      return { phieu, butToan };
    });
  }

  /**
   * Ghi nhận bán hàng cho 1 đơn đã giao (danhan): sinh bút toán doanh thu + ghi công nợ phải thu.
   * Idempotent: nếu đã ghi (nguon=DONHANG, nguonId=donhangId) thì bỏ qua.
   */
  async ghiNhanBanHang(donhangId: string) {
    const dh = await this.prisma.donhang.findUnique({
      where: { id: donhangId },
      select: {
        id: true, madonhang: true, status: true, isshowvat: true,
        tongtien: true, tongvat: true, ngaygiao: true, khachhangId: true,
      },
    });
    if (!dh) throw new BadRequestException('Không tìm thấy đơn hàng');
    if (dh.status !== 'danhan') throw new BadRequestException(`Đơn chưa ở trạng thái danhan (hiện: ${dh.status})`);
    if (!dh.khachhangId) throw new BadRequestException('Đơn không gắn khách hàng');

    const existed = await this.prisma.butToan.findFirst({ where: { nguon: 'DONHANG', nguonId: dh.id } });
    if (existed) return { skipped: true, reason: 'Đã ghi nhận trước đó' };

    // Doanh thu theo luật đã verify: isshowvat ? tongtien : Σ(slnhan×giaban)
    let phaiThu: number, doanhThu: number, vat: number;
    if (dh.isshowvat) {
      phaiThu = Number(dh.tongtien);
      vat = Number(dh.tongvat);
      doanhThu = phaiThu - vat;
    } else {
      const agg = await this.prisma.donhangsanpham.findMany({
        where: { donhangId: dh.id },
        select: { slnhan: true, giaban: true },
      });
      const tong = agg.reduce((s, l) => s + Number(l.slnhan) * Number(l.giaban), 0);
      phaiThu = tong; doanhThu = tong; vat = 0;
    }
    if (phaiThu <= 0) return { skipped: true, reason: 'Đơn không phát sinh doanh thu' };

    const kh = await this.prisma.khachhang.findUnique({
      where: { id: dh.khachhangId }, select: { thoihanno: true },
    });
    const ngay = dh.ngaygiao ?? new Date();
    const hanThanhToan = kh?.thoihanno
      ? new Date(ngay.getTime() + kh.thoihanno * 86400000)
      : null;

    return this.prisma.$transaction(async (tx) => {
      const soCT = await this.genSoButToan(tx);
      const chiTiet: any[] = [
        { tkNo: '131', tkCo: null, soTien: phaiThu, khachhangId: dh.khachhangId },
        { tkNo: null, tkCo: '511', soTien: doanhThu },
      ];
      if (vat > 0) chiTiet.push({ tkNo: null, tkCo: '3331', soTien: vat });

      const butToan = await tx.butToan.create({
        data: {
          soCT, ngay, dienGiai: `Ghi nhận bán hàng ${dh.madonhang}`,
          nguon: 'DONHANG', nguonId: dh.id, chiTiet: { create: chiTiet },
        },
      });
      await tx.congNoGiaoDich.create({
        data: {
          doiTuongLoai: 'KH', khachhangId: dh.khachhangId, ngay,
          chungTuLoai: 'GIAOHANG', chungTuId: dh.id, soChungTu: dh.madonhang,
          dienGiai: 'Giao hàng ghi nợ', psNo: phaiThu, psCo: 0, hanThanhToan,
        },
      });
      return { butToan, phaiThu, doanhThu, vat };
    });
  }

  // ================= GO-LIVE (mốc bắt đầu dùng hệ thống) =================
  /** Ngày go-live lưu ở SystemSetting (key 'ketoan.goLive'). Báo cáo mặc định cắt phát sinh từ mốc này. */
  private async getGoLive(): Promise<string | null> {
    const s = await this.prisma.systemSetting.findUnique({ where: { key: 'ketoan.goLive' } });
    return s?.value && /^\d{4}-\d{2}-\d{2}$/.test(s.value) ? s.value : null;
  }
  async layGoLive() { return { goLive: await this.getGoLive() }; }
  async datGoLive(ngay: string) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(ngay || '')) throw new BadRequestException('Ngày go-live phải dạng YYYY-MM-DD');
    await this.prisma.systemSetting.upsert({
      where: { key: 'ketoan.goLive' },
      update: { value: ngay },
      create: { id: 'ketoan.goLive', key: 'ketoan.goLive', value: ngay },
    });
    return { goLive: ngay };
  }

  /**
   * Công nợ ròng của 1 khách hàng (tính ON-THE-FLY, cùng nguồn với báo cáo tổng hợp):
   * = số dư đầu kỳ + Σ(đơn danhan, luật verified) − Σ(phiếu thu). Lọc từ mốc go-live (mặc định = cấu hình).
   */
  async congNoRongKhachHang(khachhangId: string, tuNgay?: string) {
    const goLive = (tuNgay && /^\d{4}-\d{2}-\d{2}$/.test(tuNgay)) ? tuNgay : (await this.getGoLive());
    const fBan = goLive ? `AND d.ngaygiao >= DATE '${goLive}'` : '';
    const fThu = goLive ? `AND ngay >= DATE '${goLive}'` : '';
    const fGt = goLive ? `AND "denNgay" >= DATE '${goLive}'` : '';

    const dauKy = await this.prisma.congNoDauKy.findFirst({
      where: { doiTuongLoai: 'KH', khachhangId },
      select: { soDuNo: true, soDuCo: true },
    });
    const opening = Number(dauKy?.soDuNo ?? 0) - Number(dauKy?.soDuCo ?? 0);

    const banRows: any[] = await this.prisma.$queryRawUnsafe(`
      SELECT COALESCE(SUM(CASE WHEN d.isshowvat THEN d.tongtien ELSE COALESCE(li.tong,0) END),0)::float ps_no
      FROM "Donhang" d
      LEFT JOIN (SELECT "donhangId", SUM(slnhan*giaban) tong FROM "Donhangsanpham" GROUP BY "donhangId") li
        ON li."donhangId"=d.id
      WHERE d.status='danhan' AND d."khachhangId"=$1 ${fBan}
    `, khachhangId);
    const thuRows: any[] = await this.prisma.$queryRawUnsafe(`
      SELECT COALESCE(SUM(sotien),0)::float ps_co FROM "PhieuThuChi"
      WHERE loai='THU' AND "khachhangId"=$1 ${fThu}
    `, khachhangId);
    const gtRows: any[] = await this.prisma.$queryRawUnsafe(`
      SELECT COALESCE(SUM("chenhLech"),0)::float giam FROM "ChotCongNo"
      WHERE "trangThai"='DA_CHOT' AND "khachhangId"=$1 ${fGt}
    `, khachhangId);

    const psNo = Number(banRows[0]?.ps_no ?? 0);
    const psCo = Number(thuRows[0]?.ps_co ?? 0);
    const giamTru = Number(gtRows[0]?.giam ?? 0);
    return {
      khachhangId,
      soDuDauKy: opening,
      phatSinhNo: psNo,
      giamTru,
      phatSinhCo: psCo,
      soDuCuoiKy: opening + psNo - giamTru - psCo,
    };
  }

  /**
   * Báo cáo công nợ phải thu TỔNG HỢP theo từng khách hàng (thay logic Excel rỗng).
   * Số dư cuối = đầu kỳ (CongNoDauKy) + phát sinh Nợ (bán hàng danhan, luật verified)
   *              − phát sinh Có (phiếu thu). Kèm cờ vượt hạn mức.
   * Khác biệt với code cũ: code cũ đặt "số dư cuối = doanh số kỳ" (không đầu kỳ, không trừ thu).
   */
  async baoCaoCongNoTongHop(params?: { tuNgay?: string; limit?: number }) {
    // tuNgay = mốc go-live: chỉ cộng phát sinh SAU ngày này (đầu kỳ đã gồm nợ cũ) -> tránh trùng.
    // Mặc định lấy go-live đã cấu hình (SystemSetting) nếu không truyền tuNgay.
    const goLive = (params?.tuNgay && /^\d{4}-\d{2}-\d{2}$/.test(params.tuNgay)) ? params.tuNgay : (await this.getGoLive());
    const fBan = goLive ? `AND d.ngaygiao >= DATE '${goLive}'` : '';
    const fThu = goLive ? `AND ngay >= DATE '${goLive}'` : '';
    const fGt = goLive ? `AND "denNgay" >= DATE '${goLive}'` : '';
    const rows: any[] = await this.prisma.$queryRawUnsafe(`
      WITH ban AS (
        SELECT d."khachhangId" kh,
               SUM(CASE WHEN d.isshowvat THEN d.tongtien ELSE COALESCE(li.tong,0) END) ps_no
        FROM "Donhang" d
        LEFT JOIN (SELECT "donhangId", SUM(slnhan*giaban) tong
                   FROM "Donhangsanpham" GROUP BY "donhangId") li ON li."donhangId"=d.id
        WHERE d.status='danhan' AND d."khachhangId" IS NOT NULL ${fBan}
        GROUP BY d."khachhangId"
      ),
      thu AS (
        SELECT "khachhangId" kh, SUM(sotien) ps_co
        FROM "PhieuThuChi" WHERE loai='THU' AND "khachhangId" IS NOT NULL ${fThu}
        GROUP BY "khachhangId"
      ),
      dk AS (
        SELECT "khachhangId" kh, SUM("soDuNo"-"soDuCo") dau_ky
        FROM "CongNoDauKy" WHERE "doiTuongLoai"='KH' AND "khachhangId" IS NOT NULL
        GROUP BY "khachhangId"
      ),
      gt AS (
        SELECT "khachhangId" kh, SUM("chenhLech") giam
        FROM "ChotCongNo" WHERE "trangThai"='DA_CHOT' AND "khachhangId" IS NOT NULL ${fGt}
        GROUP BY "khachhangId"
      )
      SELECT k.makh, k.name, k.hanmucno,
             COALESCE(dk.dau_ky,0)::float dau_ky,
             COALESCE(ban.ps_no,0)::float ps_no,
             COALESCE(gt.giam,0)::float giam_tru,
             COALESCE(thu.ps_co,0)::float ps_co,
             (COALESCE(dk.dau_ky,0)+COALESCE(ban.ps_no,0)-COALESCE(gt.giam,0)-COALESCE(thu.ps_co,0))::float cuoi_ky
      FROM "Khachhang" k
      LEFT JOIN dk  ON dk.kh=k.id
      LEFT JOIN ban ON ban.kh=k.id
      LEFT JOIN thu ON thu.kh=k.id
      LEFT JOIN gt  ON gt.kh=k.id
      WHERE COALESCE(ban.ps_no,0)>0 OR COALESCE(dk.dau_ky,0)<>0 OR COALESCE(thu.ps_co,0)>0 OR COALESCE(gt.giam,0)>0
      ORDER BY cuoi_ky DESC
      ${params?.limit ? `LIMIT ${Number(params.limit)}` : ''}
    `);
    return rows.map((r) => ({
      makh: r.makh,
      name: r.name,
      hanMucNo: r.hanmucno,
      soDuDauKy: r.dau_ky,
      phatSinhNo: r.ps_no,
      giamTru: r.giam_tru,
      phatSinhCo: r.ps_co,
      soDuCuoiKy: r.cuoi_ky,
      vuotHanMuc: r.hanmucno != null && r.cuoi_ky > Number(r.hanmucno),
    }));
  }

  private asOfLiteral(asOf?: string): string {
    // Chỉ chấp nhận YYYY-MM-DD để chèn an toàn vào SQL
    if (asOf && /^\d{4}-\d{2}-\d{2}$/.test(asOf)) return `DATE '${asOf}'`;
    return 'CURRENT_DATE';
  }

  /**
   * Báo cáo TUỔI NỢ (aging) phải thu theo khách hàng — phân bổ thanh toán FIFO (đơn cũ trả trước),
   * đầu kỳ tính như chứng từ cũ nhất. Chia mốc theo hạn thanh toán (ngaygiao + thoihanno).
   */
  async baoCaoTuoiNo(params?: { asOf?: string; limit?: number }) {
    const asOf = this.asOfLiteral(params?.asOf);
    // Cắt go-live: nợ trước mốc nằm trong đầu kỳ (1 dòng), chỉ tính riêng đơn TỪ go-live -> tránh trùng.
    const goLive = await this.getGoLive();
    const fBan = goLive ? `AND d.ngaygiao >= DATE '${goLive}'` : '';
    const rows: any[] = await this.prisma.$queryRawUnsafe(`
      WITH ct AS (
        SELECT dk."khachhangId" kh, dk."ngayChot" ngay, (dk."soDuNo"-dk."soDuCo") amt, dk."ngayChot" han
        FROM "CongNoDauKy" dk
        WHERE dk."doiTuongLoai"='KH' AND dk."khachhangId" IS NOT NULL AND (dk."soDuNo"-dk."soDuCo") > 0
        UNION ALL
        SELECT d."khachhangId", d.ngaygiao,
               (CASE WHEN d.isshowvat THEN d.tongtien ELSE COALESCE(li.tong,0) END),
               (d.ngaygiao + COALESCE(k.thoihanno,0) * interval '1 day')
        FROM "Donhang" d
        JOIN "Khachhang" k ON k.id=d."khachhangId"
        LEFT JOIN (SELECT "donhangId", SUM(slnhan*giaban) tong FROM "Donhangsanpham" GROUP BY "donhangId") li
          ON li."donhangId"=d.id
        WHERE d.status='danhan' AND d."khachhangId" IS NOT NULL ${fBan}
          AND (CASE WHEN d.isshowvat THEN d.tongtien ELSE COALESCE(li.tong,0) END) > 0
      ),
      paid AS (
        SELECT kh, SUM(amt) p FROM (
          SELECT "khachhangId" kh, sotien amt FROM "PhieuThuChi" WHERE loai='THU' AND "khachhangId" IS NOT NULL
          UNION ALL
          SELECT "khachhangId" kh, "chenhLech" amt FROM "ChotCongNo" WHERE "trangThai"='DA_CHOT' AND "khachhangId" IS NOT NULL
        ) x GROUP BY kh
      ),
      run AS (
        SELECT ct.*, SUM(ct.amt) OVER (PARTITION BY ct.kh ORDER BY ct.ngay, ct.han
                 ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) cum, COALESCE(p.p,0) paid
        FROM ct LEFT JOIN paid p ON p.kh=ct.kh
      ),
      outs AS (
        SELECT kh, han, GREATEST(0, LEAST(amt, cum - paid)) con_no FROM run
      )
      SELECT k.makh, k.name, k.hanmucno,
        SUM(o.con_no)::float tong_no,
        SUM(CASE WHEN o.han::date >= ${asOf} THEN o.con_no ELSE 0 END)::float trong_han,
        SUM(CASE WHEN o.han::date < ${asOf} AND ${asOf} - o.han::date <= 30 THEN o.con_no ELSE 0 END)::float qua_1_30,
        SUM(CASE WHEN ${asOf} - o.han::date > 30 AND ${asOf} - o.han::date <= 60 THEN o.con_no ELSE 0 END)::float qua_31_60,
        SUM(CASE WHEN ${asOf} - o.han::date > 60 THEN o.con_no ELSE 0 END)::float qua_60
      FROM outs o JOIN "Khachhang" k ON k.id=o.kh
      WHERE o.con_no > 0
      GROUP BY k.makh, k.name, k.hanmucno
      HAVING SUM(o.con_no) > 0
      ORDER BY SUM(o.con_no) DESC
      ${params?.limit ? `LIMIT ${Number(params.limit)}` : ''}
    `);
    return rows.map((r) => ({
      makh: r.makh, name: r.name, hanMucNo: r.hanmucno,
      tongNo: r.tong_no, trongHan: r.trong_han,
      quaHan_1_30: r.qua_1_30, quaHan_31_60: r.qua_31_60, quaHan_tren60: r.qua_60,
      vuotHanMuc: r.hanmucno != null && r.tong_no > Number(r.hanmucno),
    }));
  }

  /**
   * Chi tiết công nợ 1 khách hàng (dữ liệu cho BẢNG ĐỐI CHIẾU): liệt kê chứng từ + số dư lũy kế.
   */
  async chiTietCongNoKhachHang(khachhangId: string) {
    const kh = await this.prisma.khachhang.findUnique({
      where: { id: khachhangId }, select: { makh: true, name: true, thoihanno: true, hanmucno: true },
    });
    if (!kh) throw new BadRequestException('Không tìm thấy khách hàng');

    const dauKyRow = await this.prisma.congNoDauKy.findFirst({
      where: { doiTuongLoai: 'KH', khachhangId }, select: { soDuNo: true, soDuCo: true, ngayChot: true },
    });
    const soDuDauKy = Number(dauKyRow?.soDuNo ?? 0) - Number(dauKyRow?.soDuCo ?? 0);
    const goLive = await this.getGoLive();
    const fBan = goLive ? `AND d.ngaygiao >= DATE '${goLive}'` : '';

    // Phát sinh nợ: đơn danhan TỪ go-live (nợ trước mốc nằm trong đầu kỳ)
    const dons: any[] = await this.prisma.$queryRawUnsafe(`
      SELECT d.id, d.madonhang, d.ngaygiao,
             (CASE WHEN d.isshowvat THEN d.tongtien ELSE COALESCE(li.tong,0) END)::float amt
      FROM "Donhang" d
      LEFT JOIN (SELECT "donhangId", SUM(slnhan*giaban) tong FROM "Donhangsanpham" GROUP BY "donhangId") li
        ON li."donhangId"=d.id
      WHERE d.status='danhan' AND d."khachhangId"=$1 ${fBan}
      ORDER BY d.ngaygiao ASC, d.id ASC
    `, khachhangId);

    // Phát sinh có: phiếu thu
    const thus = await this.prisma.phieuThuChi.findMany({
      where: { loai: 'THU', khachhangId }, orderBy: { ngay: 'asc' },
      select: { maphieu: true, ngay: true, sotien: true, ghichu: true },
    });

    const chungTu = [
      ...dons.filter((d) => d.amt > 0).map((d) => ({ ngay: d.ngaygiao, soCT: d.madonhang, dienGiai: 'Giao hàng', psNo: d.amt, psCo: 0 })),
      ...thus.map((t) => ({ ngay: t.ngay, soCT: t.maphieu, dienGiai: t.ghichu || 'Thu tiền', psNo: 0, psCo: Number(t.sotien) })),
    ].sort((a, b) => new Date(a.ngay).getTime() - new Date(b.ngay).getTime());

    let luyKe = soDuDauKy;
    const dong = chungTu.map((c) => { luyKe += c.psNo - c.psCo; return { ...c, soDu: luyKe }; });

    return {
      khachhang: kh, soDuDauKy,
      chungTu: dong,
      soDuCuoiKy: luyKe,
      vuotHanMuc: kh.hanmucno != null && luyKe > Number(kh.hanmucno),
    };
  }

  // ================= KHAI BÁO GO-LIVE (đầu kỳ + thời hạn/chu kỳ per khách) =================

  /** Sinh template Excel: liệt kê khách active có phát sinh, để đổ số dư đầu kỳ + thời hạn + chu kỳ + hạn mức. */
  async templateKhaiBaoGoLive(): Promise<{ buffer: Buffer; filename: string }> {
    const goLive = (await this.getGoLive()) || '';
    const khs: any[] = await this.prisma.$queryRawUnsafe(`
      SELECT k.makh, k.name, k.loaikh, k.mst, k.thoihanno, k."chuKyChotCongNo" chu_ky, k.hanmucno
      FROM "Khachhang" k
      WHERE k."isActive" AND EXISTS (SELECT 1 FROM "Donhang" d WHERE d."khachhangId"=k.id AND d.status='danhan')
      ORDER BY k.makh ASC
    `);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const ExcelJS = require('exceljs');
    const wb = new ExcelJS.Workbook();
    const ws = wb.addWorksheet('KhaiBao_GoLive');
    ws.mergeCells('A1:H1');
    ws.getCell('A1').value = `KHAI BÁO CÔNG NỢ ĐẦU KỲ + THỜI HẠN — Go-live: ${goLive || '(chưa đặt)'}`;
    ws.getCell('A1').font = { bold: true, size: 13 };
    ws.getCell('A2').value = 'Điền cột vàng: Số dư đầu kỳ (chỉ khách CÒN NỢ tại go-live) · Thời hạn nợ (ngày) · Chu kỳ chốt (ngày) · Hạn mức nợ. Bỏ trống = giữ nguyên. KHÔNG sửa cột Mã KH.';
    ws.getCell('A2').font = { italic: true, color: { argb: 'FF7A0000' } };
    const H = 4;
    ws.getRow(H).values = ['Mã KH', 'Tên KH', 'Loại', 'MST', 'Số dư đầu kỳ (Nợ)', 'Thời hạn nợ (ngày)', 'Chu kỳ chốt (ngày)', 'Hạn mức nợ'];
    ws.getRow(H).eachCell((c: any) => { c.font = { bold: true, color: { argb: 'FFFFFFFF' } }; c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF2E7D32' } }; c.alignment = { horizontal: 'center', wrapText: true }; });
    let r = H + 1;
    for (const k of khs) {
      ws.getRow(r).values = [k.makh, k.name, k.loaikh, k.mst, null, k.thoihanno ?? null, k.chu_ky ?? null, k.hanmucno ?? null];
      ['E', 'F', 'G', 'H'].forEach((col) => { ws.getCell(`${col}${r}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFF3CD' } }; });
      ws.getCell(`E${r}`).numFmt = '#,##0'; ws.getCell(`H${r}`).numFmt = '#,##0';
      r++;
    }
    ws.columns = [{ width: 14 }, { width: 32 }, { width: 10 }, { width: 15 }, { width: 18 }, { width: 16 }, { width: 16 }, { width: 16 }];
    ws.views = [{ state: 'frozen', ySplit: H }];
    const buffer = await wb.xlsx.writeBuffer();
    return { buffer: Buffer.from(buffer), filename: `KhaiBao_GoLive_${goLive || 'template'}.xlsx` };
  }

  /** Import khai báo go-live: set số dư đầu kỳ (CongNoDauKy) + thời hạn/chu kỳ/hạn mức/MST per khách. Idempotent theo mã KH. */
  async importKhaiBaoGoLive(
    rows: Array<{ makh: string; soDuNo?: number | null; thoihanno?: number | null; chuKyChot?: number | null; hanmucno?: number | null; mst?: string | null }>,
    ngayChot?: string,
  ) {
    const goLive = (ngayChot && /^\d{4}-\d{2}-\d{2}$/.test(ngayChot)) ? ngayChot : (await this.getGoLive());
    if (!goLive) throw new BadRequestException('Chưa cấu hình ngày go-live. Đặt go-live trước khi import.');
    const num = (v: any) => (v == null || v === '' || isNaN(Number(v))) ? null : Number(v);
    const ket = { capNhatKhach: 0, dauKy: 0, boQua: 0, loi: [] as string[] };
    for (const row of rows || []) {
      const makh = String(row.makh || '').trim();
      if (!makh) { ket.boQua++; continue; }
      const kh = await this.prisma.khachhang.findFirst({ where: { makh }, select: { id: true } });
      if (!kh) { ket.loi.push(`Không tìm thấy mã KH: ${makh}`); continue; }

      // Cập nhật điều khoản — chỉ field có giá trị
      const data: any = {};
      const thn = num(row.thoihanno); if (thn != null) data.thoihanno = Math.max(0, Math.floor(thn));
      const ck = num(row.chuKyChot); if (ck != null) data.chuKyChotCongNo = ck > 0 ? Math.floor(ck) : null;
      const hm = num(row.hanmucno); if (hm != null) data.hanmucno = hm;
      if (row.mst && String(row.mst).trim()) data.mst = String(row.mst).trim();
      if (Object.keys(data).length) { await this.prisma.khachhang.update({ where: { id: kh.id }, data }); ket.capNhatKhach++; }

      // Số dư đầu kỳ — chỉ khi có số dư khác 0
      const sd = num(row.soDuNo);
      if (sd != null && sd !== 0) {
        const key = `KH:${kh.id}`;
        await this.prisma.congNoDauKy.upsert({
          where: { doiTuongKey: key },
          update: { soDuNo: sd, soDuCo: 0, ngayChot: new Date(goLive), tk: '131' },
          create: { doiTuongLoai: 'KH', doiTuongKey: key, khachhangId: kh.id, tk: '131', soDuNo: sd, soDuCo: 0, ngayChot: new Date(goLive) },
        });
        ket.dauKy++;
      }
    }
    return ket;
  }

  // ================= AP — CÔNG NỢ NHÀ CUNG CẤP =================

  /**
   * Ghi nhận nhập mua cho 1 đơn NCC đã nhận (danhan): Nợ 156 / Có 331 + tăng nợ phải trả.
   * (VAT đầu vào 133 ghi riêng qua HoaDonMuaVao khi nhập hóa đơn NCC.)
   */
  async ghiNhanNhapMua(dathangId: string) {
    const dt = await this.prisma.dathang.findUnique({
      where: { id: dathangId },
      select: { id: true, madncc: true, status: true, nhacungcapId: true, ngaynhan: true },
    });
    if (!dt) throw new BadRequestException('Không tìm thấy đơn đặt hàng NCC');
    if (dt.status !== 'danhan') throw new BadRequestException(`Đơn NCC chưa nhận hàng (hiện: ${dt.status})`);
    if (!dt.nhacungcapId) throw new BadRequestException('Đơn không gắn nhà cung cấp');

    const existed = await this.prisma.butToan.findFirst({ where: { nguon: 'NHAPMUA', nguonId: dt.id } });
    if (existed) return { skipped: true, reason: 'Đã ghi nhận' };

    const lines = await this.prisma.dathangsanpham.findMany({
      where: { dathangId: dt.id }, select: { slnhan: true, gianhap: true },
    });
    const tienHang = lines.reduce((s, l) => s + Number(l.slnhan) * Number(l.gianhap), 0);
    if (tienHang <= 0) return { skipped: true, reason: 'Không phát sinh giá trị' };
    const ngay = dt.ngaynhan ?? new Date();

    return this.prisma.$transaction(async (tx) => {
      const soCT = await this.genSoButToan(tx);
      const butToan = await tx.butToan.create({
        data: {
          soCT, ngay, dienGiai: `Nhập mua ${dt.madncc}`, nguon: 'NHAPMUA', nguonId: dt.id,
          chiTiet: { create: [
            { tkNo: '156', tkCo: null, soTien: tienHang },
            { tkNo: null, tkCo: '331', soTien: tienHang, nhacungcapId: dt.nhacungcapId },
          ] },
        },
      });
      await tx.congNoGiaoDich.create({
        data: {
          doiTuongLoai: 'NCC', nhacungcapId: dt.nhacungcapId, ngay,
          chungTuLoai: 'NHAPMUA', chungTuId: dt.id, soChungTu: dt.madncc,
          dienGiai: 'Nhập mua ghi nợ phải trả', psNo: 0, psCo: tienHang,
        },
      });
      return { butToan, tienHang };
    });
  }

  /** Báo cáo công nợ phải trả NCC = đầu kỳ + Σ nhập mua − Σ phiếu chi. */
  async baoCaoCongNoNCC(params?: { limit?: number }) {
    const rows: any[] = await this.prisma.$queryRawUnsafe(`
      WITH mua AS (
        SELECT dt."nhacungcapId" ncc, SUM(li.tong) ps_co
        FROM "Dathang" dt
        JOIN (SELECT "dathangId", SUM(slnhan*gianhap) tong FROM "Dathangsanpham" GROUP BY "dathangId") li
          ON li."dathangId"=dt.id
        WHERE dt.status='danhan' AND dt."nhacungcapId" IS NOT NULL
        GROUP BY dt."nhacungcapId"
      ),
      chi AS (
        SELECT "nhacungcapId" ncc, SUM(sotien) ps_no FROM "PhieuThuChi"
        WHERE loai='CHI' AND "nhacungcapId" IS NOT NULL GROUP BY "nhacungcapId"
      ),
      dk AS (
        SELECT "nhacungcapId" ncc, SUM("soDuCo"-"soDuNo") dau_ky FROM "CongNoDauKy"
        WHERE "doiTuongLoai"='NCC' AND "nhacungcapId" IS NOT NULL GROUP BY "nhacungcapId"
      )
      SELECT n.mancc, n.name, n.hanmucno,
        COALESCE(dk.dau_ky,0)::float dau_ky,
        COALESCE(mua.ps_co,0)::float ps_co,
        COALESCE(chi.ps_no,0)::float ps_no,
        (COALESCE(dk.dau_ky,0)+COALESCE(mua.ps_co,0)-COALESCE(chi.ps_no,0))::float cuoi_ky
      FROM "Nhacungcap" n
      LEFT JOIN dk  ON dk.ncc=n.id
      LEFT JOIN mua ON mua.ncc=n.id
      LEFT JOIN chi ON chi.ncc=n.id
      WHERE COALESCE(mua.ps_co,0)>0 OR COALESCE(dk.dau_ky,0)<>0 OR COALESCE(chi.ps_no,0)>0
      ORDER BY cuoi_ky DESC
      ${params?.limit ? `LIMIT ${Number(params.limit)}` : ''}
    `);
    return rows.map((r) => ({
      mancc: r.mancc, name: r.name,
      soDuDauKy: r.dau_ky, phatSinhTang: r.ps_co, phatSinhGiam: r.ps_no, soDuCuoiKy: r.cuoi_ky,
    }));
  }

  /** Danh sách phiếu thu/chi (sổ quỹ) kèm tên KH/NCC. */
  async danhSachPhieuThuChi(params?: { loai?: 'THU' | 'CHI'; tuNgay?: string; denNgay?: string; limit?: number }) {
    const conds: string[] = [];
    const args: any[] = [];
    if (params?.loai) { args.push(params.loai); conds.push(`p.loai = $${args.length}::"LoaiThuChi"`); }
    if (params?.tuNgay) { args.push(new Date(params.tuNgay)); conds.push(`p.ngay >= $${args.length}`); }
    if (params?.denNgay) { args.push(new Date(params.denNgay)); conds.push(`p.ngay <= $${args.length}`); }
    const where = conds.length ? `WHERE ${conds.join(' AND ')}` : '';
    const limit = Number(params?.limit ?? 300);
    const rows: any[] = await this.prisma.$queryRawUnsafe(`
      SELECT p.id, p.maphieu, p.loai::text, p.ngay, p.sotien::float sotien, p.hinhthuc, p.nghiepvu, p.ghichu,
             k.makh, k.name kh_ten, n.mancc, n.name ncc_ten, nh.name nhom_ten
      FROM "PhieuThuChi" p
      LEFT JOIN "Khachhang" k ON k.id=p."khachhangId"
      LEFT JOIN "Nhacungcap" n ON n.id=p."nhacungcapId"
      LEFT JOIN "Nhomkhachhang" nh ON nh.id=p."nhomId"
      ${where}
      ORDER BY p.ngay DESC, p.maphieu DESC
      LIMIT ${limit}
    `, ...args);
    return rows;
  }

  /** Xoá phiếu thu/chi nhầm: đảo bút toán + xoá giao dịch gạch nợ + xoá phiếu (khôi phục công nợ). */
  async xoaPhieuThuChi(id: string) {
    const phieu = await this.prisma.phieuThuChi.findUnique({ where: { id }, select: { id: true, maphieu: true, butToanId: true } });
    if (!phieu) throw new BadRequestException('Không tìm thấy phiếu');
    return this.prisma.$transaction(async (tx) => {
      await tx.congNoGiaoDich.deleteMany({ where: { chungTuLoai: { in: ['PHIEUTHU', 'PHIEUCHI'] }, chungTuId: id } });
      if (phieu.butToanId) {
        await tx.butToanChiTiet.deleteMany({ where: { butToanId: phieu.butToanId } });
        await tx.butToan.delete({ where: { id: phieu.butToanId } });
      }
      await tx.phieuThuChi.delete({ where: { id } });
      return { deleted: true, maphieu: phieu.maphieu };
    });
  }

  // ================= KHÓA SỔ KỲ KẾ TOÁN =================

  async khoaSo(nam: number, thang: number, lockedBy: string) {
    return this.prisma.khoaSoKeToan.upsert({
      where: { nam_thang: { nam, thang } },
      create: { nam, thang, isLocked: true, lockedBy },
      update: { isLocked: true, lockedBy, lockedAt: new Date() },
    });
  }

  async moKhoaSo(nam: number, thang: number) {
    return this.prisma.khoaSoKeToan.updateMany({ where: { nam, thang }, data: { isLocked: false } });
  }

  /** Guard: ném lỗi nếu ngày thuộc kỳ đã khóa sổ. Gọi từ donhang/phieukho khi update/delete. */
  async kiemTraKhoaSo(date?: Date | string | null) {
    if (!date) return;
    const d = new Date(date);
    if (isNaN(d.getTime())) return;
    const lock = await this.prisma.khoaSoKeToan.findUnique({
      where: { nam_thang: { nam: d.getFullYear(), thang: d.getMonth() + 1 } },
    });
    if (lock?.isLocked)
      throw new BadRequestException(`Dữ liệu tháng ${d.getMonth() + 1}/${d.getFullYear()} đã khóa sổ kế toán, không thể chỉnh sửa`);
  }

  // ================= HÓA ĐƠN GTGT ĐIỆN TỬ + THUẾ =================

  /** Phát hành hóa đơn GTGT điện tử cho 1 đơn danhan (khách có VAT). */
  async phatHanhHoaDon(donhangId: string) {
    if (!this.hoaDonProvider) throw new BadRequestException('Chưa cấu hình nhà cung cấp HĐĐT');
    const dh = await this.prisma.donhang.findUnique({
      where: { id: donhangId },
      select: { id: true, madonhang: true, status: true, isshowvat: true, tongtien: true, tongvat: true, khachhangId: true },
    });
    if (!dh) throw new BadRequestException('Không tìm thấy đơn hàng');
    if (dh.status !== 'danhan') throw new BadRequestException('Đơn chưa giao (danhan)');
    if (!dh.isshowvat) throw new BadRequestException('Đơn không xuất VAT (isshowvat=false)');

    const existed = await this.prisma.hoaDon.findFirst({ where: { donhangId: dh.id, trangThai: 'DA_PHAT_HANH' } });
    if (existed) return { skipped: true, hoaDon: existed };

    const kh = dh.khachhangId
      ? await this.prisma.khachhang.findUnique({ where: { id: dh.khachhangId }, select: { name: true, mst: true, diachi: true } })
      : null;

    const tongTien = Number(dh.tongtien);
    const tienThue = Number(dh.tongvat);
    const tienHang = tongTien - tienThue;
    const thueSuat = tienHang > 0 ? Math.round((tienThue / tienHang) * 100) : 0;

    const kq = await this.hoaDonProvider.phatHanh({
      khachhang: { ten: kh?.name, mst: kh?.mst, diachi: kh?.diachi },
      tienHang, tienThue, tongTien, thueSuat, soDonHang: dh.madonhang,
    });

    const hoaDon = await this.prisma.hoaDon.create({
      data: {
        donhangId: dh.id, khachhangId: dh.khachhangId, kyHieu: kq.kyHieu, soHoaDon: kq.soHoaDon,
        ngayHD: new Date(), mst: kh?.mst, tienHang, tienThue, tongTien, thueSuat,
        trangThai: 'DA_PHAT_HANH', maCQT: kq.maCQT, linkTraCuu: kq.linkTraCuu,
        provider: kq.provider, providerRef: kq.providerRef,
      },
    });
    return { hoaDon };
  }

  /** Bảng kê hóa đơn bán ra (đầu ra) — phục vụ kê khai GTGT. */
  async bangKeHoaDonBanRa(params?: { tuNgay?: string; denNgay?: string }) {
    const where: any = { trangThai: 'DA_PHAT_HANH' };
    if (params?.tuNgay || params?.denNgay) {
      where.ngayHD = {};
      if (params.tuNgay) where.ngayHD.gte = new Date(params.tuNgay);
      if (params.denNgay) where.ngayHD.lte = new Date(params.denNgay);
    }
    const hds = await this.prisma.hoaDon.findMany({ where, orderBy: { ngayHD: 'asc' } });
    const tong = hds.reduce(
      (a, h) => ({ tienHang: a.tienHang + Number(h.tienHang), tienThue: a.tienThue + Number(h.tienThue), tongTien: a.tongTien + Number(h.tongTien) }),
      { tienHang: 0, tienThue: 0, tongTien: 0 },
    );
    return { soHoaDon: hds.length, ...tong, chiTiet: hds };
  }

  /** Bảng kê hóa đơn mua vào (đầu vào) — VAT được khấu trừ. */
  async bangKeHoaDonMuaVao(params?: { tuNgay?: string; denNgay?: string }) {
    const where: any = {};
    if (params?.tuNgay || params?.denNgay) {
      where.ngayHD = {};
      if (params.tuNgay) where.ngayHD.gte = new Date(params.tuNgay);
      if (params.denNgay) where.ngayHD.lte = new Date(params.denNgay);
    }
    const hds = await this.prisma.hoaDonMuaVao.findMany({ where, orderBy: { ngayHD: 'asc' } });
    const tong = hds.reduce(
      (a, h) => ({ tienHang: a.tienHang + Number(h.tienHang), tienThue: a.tienThue + Number(h.tienThue) }),
      { tienHang: 0, tienThue: 0 },
    );
    return { soHoaDon: hds.length, ...tong, chiTiet: hds };
  }

  // ================= CHỐT / ĐỐI CHIẾU CÔNG NỢ =================

  private async genSoBienBan(db: any): Promise<string> {
    const last = await db.chotCongNo.findFirst({
      where: { soBienBan: { startsWith: 'BBCN-' } },
      orderBy: { soBienBan: 'desc' }, select: { soBienBan: true },
    });
    let n = 1;
    if (last?.soBienBan) { const num = parseInt(last.soBienBan.slice(5), 10); if (!isNaN(num)) n = num + 1; }
    return 'BBCN-' + String(n).padStart(6, '0');
  }

  /** Số hệ thống của 1 khách trong kỳ [tuNgay, denNgay] = Σ đơn danhan (luật verified). */
  private async soHeThongKy(khachhangId: string, tuNgay: string, denNgay: string): Promise<number> {
    const rows: any[] = await this.prisma.$queryRawUnsafe(`
      SELECT COALESCE(SUM(CASE WHEN d.isshowvat THEN d.tongtien ELSE COALESCE(li.tong,0) END),0)::float s
      FROM "Donhang" d
      LEFT JOIN (SELECT "donhangId", SUM(slnhan*giaban) tong FROM "Donhangsanpham" GROUP BY "donhangId") li
        ON li."donhangId"=d.id
      WHERE d.status='danhan' AND d."khachhangId"=$1
        AND d.ngaygiao >= $2::date AND d.ngaygiao < ($3::date + interval '1 day')
    `, khachhangId, tuNgay, denNgay);
    return Number(rows[0]?.s ?? 0);
  }

  /**
   * Tạo biên bản chốt (nháp) kèm CHI TIẾT TỪNG ĐƠN.
   * - Chốt riêng: truyền khachhangId (1 khách/chi nhánh).
   * - Chốt chung: truyền nhomId (gom đơn của TẤT CẢ khách trong nhóm).
   */
  async taoBienBanChot(dto: { khachhangId?: string; nhomId?: string; khachhangIds?: string[]; tuNgay: string; denNgay: string; nguoiChot?: string; force?: boolean }) {
    const nhieuKH = Array.isArray(dto.khachhangIds) && dto.khachhangIds.length > 0; // chung sheet: nhiều KH lẻ, không phải nhóm
    if (!dto.khachhangId && !dto.nhomId && !nhieuKH) throw new BadRequestException('Cần khachhangId (chốt riêng) / nhomId (chốt chung nhóm) / khachhangIds (chung sheet nhiều khách)');

    // Chống trùng: cùng đối tượng + kỳ chồng lấp đã có biên bản (bỏ qua biên bản đã HUỶ). force=true để tạo đè.
    // Chung-sheet nhiều KH lẻ (ad-hoc) không kiểm trùng.
    if (!dto.force && !nhieuKH) {
      const trung = await this.prisma.chotCongNo.findFirst({
        where: {
          ...(dto.nhomId ? { nhomId: dto.nhomId } : { khachhangId: dto.khachhangId }),
          trangThai: { in: ['NHAP', 'DA_CHOT'] },
          tuNgay: { lte: new Date(dto.denNgay) },
          denNgay: { gte: new Date(dto.tuNgay) },
        },
        select: { soBienBan: true, tuNgay: true, denNgay: true, trangThai: true },
        orderBy: { createdAt: 'desc' },
      });
      if (trung) {
        const d = (x: any) => new Date(x).toLocaleDateString('vi-VN');
        throw new BadRequestException(`TRUNG: Đã có biên bản ${trung.soBienBan} (${trung.trangThai === 'DA_CHOT' ? 'đã chốt' : 'nháp'}) kỳ ${d(trung.tuNgay)}–${d(trung.denNgay)} cho đối tượng này. Vẫn tạo thêm?`);
      }
    }

    let khIds: string[];
    if (nhieuKH) {
      const khs = await this.prisma.khachhang.findMany({ where: { id: { in: dto.khachhangIds! } }, select: { id: true } });
      khIds = khs.map((k) => k.id);
      if (!khIds.length) throw new BadRequestException('Không tìm thấy khách hàng nào trong danh sách');
    } else if (dto.nhomId) {
      khIds = await this.khachhangIdsCuaNhom(dto.nhomId); // tất cả khách là thành viên nhóm
      if (!khIds.length) throw new BadRequestException('Nhóm chưa có khách hàng');
    } else {
      const kh = await this.prisma.khachhang.findUnique({ where: { id: dto.khachhangId }, select: { id: true } });
      if (!kh) throw new BadRequestException('Không tìm thấy khách hàng');
      khIds = [dto.khachhangId!];
    }
    const ghiTenKH = !!dto.nhomId || nhieuKH; // biên bản >1 khách -> cột ghi chú hiện tên KH mỗi dòng

    // Chi tiết theo TỪNG MÓN (dòng hàng) trong mỗi đơn
    const lines: any[] = await this.prisma.$queryRawUnsafe(`
      SELECT d.id donhang_id, d.madonhang, d.ngaygiao, k.makh branch_makh,
             dsp.id dsp_id, dsp."idSP" sanpham_id, s.masp, s.title ten_sp, s.dvt,
             dsp.slnhan::float sl, dsp.giaban::float gia
      FROM "Donhang" d
      JOIN "Khachhang" k ON k.id=d."khachhangId"
      JOIN "Donhangsanpham" dsp ON dsp."donhangId"=d.id
      JOIN "Sanpham" s ON s.id=dsp."idSP"
      WHERE d.status='danhan' AND d."khachhangId" = ANY($1::text[])
        AND d.ngaygiao >= $2::date AND d.ngaygiao < ($3::date + interval '1 day')
        AND dsp.slnhan * dsp.giaban > 0
      ORDER BY d.ngaygiao ASC, d.madonhang ASC, s.title ASC
    `, khIds, dto.tuNgay, dto.denNgay);

    const chiTiet = lines.map((l) => {
      const tt = Number(l.sl) * Number(l.gia);
      return {
        donhangId: l.donhang_id, madonhang: l.madonhang, ngay: l.ngaygiao,
        donhangsanphamId: l.dsp_id, sanphamId: l.sanpham_id, masp: l.masp, tenSp: l.ten_sp, dvt: l.dvt,
        soLuongHeThong: Number(l.sl), donGia: Number(l.gia), soLuongChot: Number(l.sl),
        soHeThong: tt, soChot: tt, chenhLech: 0,
        ghichu: ghiTenKH ? `KH: ${l.branch_makh}` : null,
      };
    });
    const soHeThong = chiTiet.reduce((s, o) => s + o.soHeThong, 0);
    const soBienBan = await this.genSoBienBan(this.prisma);

    return this.prisma.chotCongNo.create({
      data: {
        soBienBan, khachhangId: dto.khachhangId ?? null, nhomId: dto.nhomId ?? null,
        tuNgay: new Date(dto.tuNgay), denNgay: new Date(dto.denNgay),
        soHeThong, soChot: soHeThong, chenhLech: 0, trangThai: 'NHAP', nguoiChot: dto.nguoiChot ?? null,
        chiTiet: { create: chiTiet },
      },
      include: { chiTiet: { orderBy: { ngay: 'asc' } } },
    });
  }

  /** Chi tiết 1 biên bản (cho xuất Excel / hiển thị). */
  async chiTietBienBan(id: string) {
    const bb = await this.prisma.chotCongNo.findUnique({
      where: { id }, include: { chiTiet: { orderBy: { ngay: 'asc' } } },
    });
    if (!bb) throw new BadRequestException('Không tìm thấy biên bản');
    const kh = bb.khachhangId
      ? await this.prisma.khachhang.findUnique({ where: { id: bb.khachhangId }, select: { makh: true, name: true, mst: true, diachi: true } })
      : null;
    const nhom = bb.nhomId
      ? await this.prisma.nhomkhachhang.findUnique({ where: { id: bb.nhomId }, select: { name: true } })
      : null;
    return { bienBan: bb, khachhang: kh, nhom };
  }

  /**
   * Nhập lại file khách đã sửa: cập nhật soChot theo TỪNG ĐƠN (khớp mã đơn), tính lại chênh lệch + tổng.
   */
  async importChot(id: string, dong: { madonhang: string; masp?: string; soLuongChot?: number | string; soChot?: number | string; ghichu?: string }[]) {
    const bb = await this.prisma.chotCongNo.findUnique({ where: { id }, include: { chiTiet: true } });
    if (!bb) throw new BadRequestException('Không tìm thấy biên bản');
    if (bb.trangThai === 'DA_CHOT') throw new BadRequestException('Biên bản đã chốt, không thể nhập lại');

    const key = (ma: any, sp: any) => `${String(ma).trim()}|${String(sp ?? '').trim()}`;
    const map = new Map((dong || []).map((r) => [key(r.madonhang, r.masp), r]));
    const num = (v: any) => Number(String(v).replace(/[^\d.-]/g, ''));
    let updated = 0;
    for (const ct of bb.chiTiet) {
      const row = map.get(key(ct.madonhang, ct.masp));
      if (!row) continue;
      // Ưu tiên "số lượng chốt" (thực nhận) -> thành tiền = SL × đơn giá; fallback nhập thẳng thành tiền
      let soLuongChot: number, thanhTien: number;
      if (row.soLuongChot != null && String(row.soLuongChot) !== '') {
        soLuongChot = num(row.soLuongChot);
        if (isNaN(soLuongChot) || soLuongChot < 0) continue;
        thanhTien = soLuongChot * Number(ct.donGia);
      } else if (row.soChot != null && String(row.soChot) !== '') {
        thanhTien = num(row.soChot);
        if (isNaN(thanhTien) || thanhTien < 0) continue;
        soLuongChot = Number(ct.donGia) > 0 ? thanhTien / Number(ct.donGia) : Number(ct.soLuongChot);
      } else continue;
      await this.prisma.chotCongNoChiTiet.update({
        where: { id: ct.id },
        data: { soLuongChot, soChot: thanhTien, chenhLech: Number(ct.soHeThong) - thanhTien, ghichu: row.ghichu ?? ct.ghichu },
      });
      updated++;
    }
    const agg = await this.prisma.chotCongNoChiTiet.aggregate({ where: { chotId: id }, _sum: { soChot: true } });
    const soChotTong = Number(agg._sum.soChot ?? 0);
    await this.prisma.chotCongNo.update({
      where: { id }, data: { soChot: soChotTong, chenhLech: Number(bb.soHeThong) - soChotTong },
    });
    return { updated, tongDong: bb.chiTiet.length, soChotTong, chenhLechTong: Number(bb.soHeThong) - soChotTong };
  }

  /** Xuất file Excel biên bản đối chiếu (gửi khách điền cột "Số chốt"). */
  async xuatExcelBienBan(id: string): Promise<{ buffer: Buffer; filename: string }> {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const ExcelJS = require('exceljs');
    const wb = new ExcelJS.Workbook();
    const data = await this.chiTietBienBan(id);
    await this._ghiSheetBienBan(wb.addWorksheet('DoiChieuCongNo'), data);
    const buffer = await wb.xlsx.writeBuffer();
    return { buffer: Buffer.from(buffer), filename: `DoiChieu_${data.bienBan.soBienBan}.xlsx` };
  }

  /** Xuất NHIỀU biên bản vào 1 file Excel, mỗi biên bản 1 sheet (tách sheet). */
  async xuatExcelNhieu(ids: string[]): Promise<{ buffer: Buffer; filename: string }> {
    if (!ids?.length) throw new BadRequestException('Chưa chọn biên bản để xuất');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const ExcelJS = require('exceljs');
    const wb = new ExcelJS.Workbook();
    const used = new Set<string>();
    for (const id of ids) {
      const data = await this.chiTietBienBan(id);
      let base = (data.khachhang?.makh || data.bienBan.soBienBan || 'BB').replace(/[\\/*?:\[\]]/g, '').slice(0, 28) || 'BB';
      let name = base, i = 1;
      while (used.has(name)) name = base.slice(0, 25) + '_' + (++i);
      used.add(name);
      await this._ghiSheetBienBan(wb.addWorksheet(name), data);
    }
    const buffer = await wb.xlsx.writeBuffer();
    return { buffer: Buffer.from(buffer), filename: `DoiChieu_${ids.length}BB.xlsx` };
  }

  /** Ghi 1 biên bản đối chiếu vào 1 worksheet (dùng cho xuất đơn & xuất nhiều-sheet). */
  private async _ghiSheetBienBan(ws: any, data: { bienBan: any; khachhang: any; nhom: any }): Promise<void> {
    const { bienBan, khachhang, nhom } = data;
    // Cột "Ghi chú" của biên bản nhiều khách hiện TÊN khách (mỗi đơn thuộc 1 chi nhánh). Chi tiết lưu "KH: <mã>" → tra tên.
    const makhs = [...new Set((bienBan.chiTiet || [])
      .map((c: any) => (c.ghichu || '').replace(/^KH:\s*/, '').trim())
      .filter(Boolean))] as string[];
    const doiTuong = khachhang
      ? `${khachhang.makh || ''} - ${khachhang.name || ''}${khachhang.mst ? ' | MST: ' + khachhang.mst : ''}`
      : nhom
        ? `Nhóm: ${nhom?.name || ''}`
        : `Nhiều khách (${makhs.length}): ${makhs.slice(0, 10).join(', ')}${makhs.length > 10 ? '…' : ''}`;
    const khNameMap: Record<string, string> = {};
    if (makhs.length) {
      const khs = await this.prisma.khachhang.findMany({ where: { makh: { in: makhs } }, select: { makh: true, name: true } });
      khs.forEach((k) => { if (k.makh) khNameMap[k.makh] = k.name || k.makh; });
    }
    const tenKHcuaDong = (ct: any): string => {
      const makh = (ct.ghichu || '').replace(/^KH:\s*/, '').trim();
      return makh ? (khNameMap[makh] || makh) : (ct.ghichu || '');
    };
    const fmtDate = (d: any) => (d ? new Date(d).toLocaleDateString('vi-VN') : '');

    ws.mergeCells('A1:F1');
    ws.getCell('A1').value = `BIÊN BẢN ĐỐI CHIẾU CÔNG NỢ — ${bienBan.soBienBan}`;
    ws.getCell('A1').font = { bold: true, size: 14 };
    ws.getCell('A2').value = `Đối tượng: ${doiTuong}`;
    ws.getCell('A3').value = `Kỳ đối chiếu: ${fmtDate(bienBan.tuNgay)} đến ${fmtDate(bienBan.denNgay)}`;
    ws.getCell('A4').value = 'Đề nghị Quý khách kiểm tra và điền lại cột "Số chốt" nếu có chênh lệch (hao hụt/hàng hư), rồi gửi lại.';
    ws.getCell('A4').font = { italic: true, color: { argb: 'FF7A0000' } };

    const H = 6;
    const header = ['STT', 'Mã đơn', 'Ngày', 'Mã SP', 'Tên sản phẩm', 'ĐVT', 'SL hệ thống', 'Đơn giá', 'Thành tiền HT', 'SL chốt (Quý khách điền)', 'Thành tiền chốt', 'Ghi chú'];
    ws.getRow(H).values = header;
    ws.getRow(H).eachCell((c: any) => { c.font = { bold: true, color: { argb: 'FFFFFFFF' } }; c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF2E7D32' } }; c.alignment = { horizontal: 'center', wrapText: true }; });

    let r = H + 1;
    let prevMadon = '';
    (bienBan.chiTiet || []).forEach((ct: any, i: number) => {
      const row = ws.getRow(r);
      const sameOrder = ct.madonhang === prevMadon; // gộp: dòng lặp cùng đơn -> bỏ trống mã đơn + ngày
      row.values = [
        i + 1,
        sameOrder ? '' : ct.madonhang,
        sameOrder ? '' : (ct.ngay ? new Date(ct.ngay) : ''),
        ct.masp, ct.tenSp, ct.dvt,
        Number(ct.soLuongHeThong), Number(ct.donGia), Number(ct.soHeThong),
        Number(ct.soLuongChot), null, sameOrder ? '' : tenKHcuaDong(ct),
      ];
      if (!sameOrder) { row.getCell(3).numFmt = 'dd/mm/yyyy'; prevMadon = ct.madonhang; }
      row.getCell(8).numFmt = '#,##0';   // đơn giá (số nguyên)
      row.getCell(9).numFmt = '#,##0';   // thành tiền HT
      row.getCell(11).numFmt = '#,##0';  // thành tiền chốt
      // Cột SL (7, 10) để General -> số lẻ hiển thị tự nhiên (1,6 / 7), tránh dấu phẩy thừa
      row.getCell(10).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFF3CD' } }; // SL chốt: vàng (khách điền)
      row.getCell(11).value = { formula: `J${r}*H${r}` }; // Thành tiền chốt = SL chốt × đơn giá
      r++;
    });
    const tong = ws.getRow(r);
    tong.getCell(6).value = 'TỔNG CỘNG'; tong.getCell(6).font = { bold: true };
    tong.getCell(9).value = { formula: `SUM(I${H + 1}:I${r - 1})` };
    tong.getCell(11).value = { formula: `SUM(K${H + 1}:K${r - 1})` };
    tong.getCell(9).numFmt = '#,##0'; tong.getCell(11).numFmt = '#,##0';
    tong.getCell(9).font = { bold: true }; tong.getCell(11).font = { bold: true };

    ws.columns = [{ width: 5 }, { width: 16 }, { width: 11 }, { width: 12 }, { width: 26 }, { width: 7 }, { width: 12 }, { width: 12 }, { width: 15 }, { width: 16 }, { width: 15 }, { width: 20 }];
  }

  /** Tạo NHIỀU biên bản đối chiếu 1 lần: sheetMode='chung' (1 BB gộp) hoặc 'tach' (mỗi KH 1 BB). */
  async taoBienBanChotNhieu(dto: { khachhangIds: string[]; tuNgay: string; denNgay: string; sheetMode?: 'chung' | 'tach'; nguoiChot?: string; force?: boolean }) {
    const ids = [...new Set((dto.khachhangIds || []).filter(Boolean))];
    if (!ids.length) throw new BadRequestException('Chưa chọn khách hàng');
    if (!dto.tuNgay || !dto.denNgay) throw new BadRequestException('Thiếu từ ngày / đến ngày');
    if ((dto.sheetMode || 'chung') === 'chung') {
      const bb = await this.taoBienBanChot({ khachhangIds: ids, tuNgay: dto.tuNgay, denNgay: dto.denNgay, nguoiChot: dto.nguoiChot });
      return { sheetMode: 'chung', bienBans: [bb], loi: [] as string[] };
    }
    // tách: mỗi khách 1 biên bản
    const bienBans: any[] = []; const loi: string[] = [];
    for (const khachhangId of ids) {
      try {
        bienBans.push(await this.taoBienBanChot({ khachhangId, tuNgay: dto.tuNgay, denNgay: dto.denNgay, nguoiChot: dto.nguoiChot, force: true }));
      } catch (e: any) {
        loi.push(`${khachhangId}: ${e?.message || e}`);
      }
    }
    return { sheetMode: 'tach', bienBans, loi };
  }

  /** Chốt (finalize): đặt số 2 bên thống nhất → giảm trừ chênh lệch + bút toán Nợ511/Có131. */
  async chotCongNo(id: string, soChot?: number, lyDo?: string, nguoiChot?: string) {
    const bb = await this.prisma.chotCongNo.findUnique({ where: { id }, include: { chiTiet: true } });
    if (!bb) throw new BadRequestException('Không tìm thấy biên bản chốt');
    if (bb.trangThai === 'DA_CHOT') throw new BadRequestException('Biên bản đã chốt rồi');

    // Có chi tiết theo đơn -> số chốt = Σ chi tiết đơn; nếu không -> dùng số truyền vào (chốt theo tổng).
    let soChotFinal: number;
    if (bb.chiTiet.length) {
      const agg = await this.prisma.chotCongNoChiTiet.aggregate({ where: { chotId: id }, _sum: { soChot: true } });
      soChotFinal = Number(agg._sum.soChot ?? 0);
    } else {
      if (soChot == null) throw new BadRequestException('Thiếu số chốt');
      soChotFinal = Number(soChot);
    }
    const chenhLech = Number(bb.soHeThong) - soChotFinal;
    if (chenhLech < 0) throw new BadRequestException('Số chốt không được lớn hơn số hệ thống');

    return this.prisma.$transaction(async (tx) => {
      let butToanId: string | null = null;
      if (chenhLech > 0) {
        const soCT = await this.genSoButToan(tx);
        const bt = await tx.butToan.create({
          data: {
            soCT, ngay: bb.denNgay, dienGiai: `Giảm trừ chốt công nợ ${bb.soBienBan} (hao hụt/hư khi giao)`,
            nguon: 'CHOTCONGNO', nguonId: bb.id,
            chiTiet: { create: [
              { tkNo: '511', tkCo: null, soTien: chenhLech },
              { tkNo: null, tkCo: '131', soTien: chenhLech, khachhangId: bb.khachhangId },
            ] },
          },
        });
        butToanId = bt.id;
        if (bb.khachhangId) {
          await tx.congNoGiaoDich.create({
            data: {
              doiTuongLoai: 'KH', khachhangId: bb.khachhangId, ngay: bb.denNgay,
              chungTuLoai: 'GIAMTRU_CHOT', chungTuId: bb.id, soChungTu: bb.soBienBan,
              dienGiai: lyDo || 'Giảm trừ hao hụt khi chốt công nợ', psNo: 0, psCo: chenhLech,
            },
          });
        }
      }
      return tx.chotCongNo.update({
        where: { id },
        data: {
          soChot: soChotFinal, chenhLech, lyDo: lyDo ?? null, trangThai: 'DA_CHOT',
          ngayChot: new Date(), nguoiChot: nguoiChot ?? bb.nguoiChot, butToanId,
        },
      });
    });
  }

  async danhSachBienBanChot(params?: { khachhangId?: string; nhomId?: string; trangThai?: string; limit?: number }) {
    return this.prisma.chotCongNo.findMany({
      where: {
        khachhangId: params?.khachhangId || undefined,
        nhomId: params?.nhomId || undefined,
        trangThai: params?.trangThai || undefined,
      },
      orderBy: { createdAt: 'desc' }, take: params?.limit ?? 300,
    });
  }

  /** Xoá biên bản NHÁP (dọn nháp/rỗng/trùng). KHÔNG xoá được biên bản đã chốt. */
  async xoaBienBanNhap(id: string) {
    const bb = await this.prisma.chotCongNo.findUnique({ where: { id }, select: { trangThai: true, soBienBan: true } });
    if (!bb) throw new BadRequestException('Không tìm thấy biên bản');
    if (bb.trangThai === 'DA_CHOT') throw new BadRequestException('Biên bản đã chốt — không xoá được. Dùng chức năng Huỷ (đảo bút toán).');
    if (bb.trangThai === 'HUY') throw new BadRequestException('Biên bản đã huỷ — giữ lại để truy vết, không xoá.');
    await this.prisma.chotCongNo.delete({ where: { id } }); // chi tiết cascade
    return { deleted: true, soBienBan: bb.soBienBan };
  }

  /** Huỷ biên bản ĐÃ CHỐT: đảo bút toán giảm trừ + đảo giao dịch giảm trừ, đánh dấu HUỶ (giữ để truy vết). */
  async huyBienBanChot(id: string, lyDo?: string, nguoiHuy?: string) {
    const bb = await this.prisma.chotCongNo.findUnique({ where: { id }, select: { trangThai: true, soBienBan: true, butToanId: true } });
    if (!bb) throw new BadRequestException('Không tìm thấy biên bản');
    if (bb.trangThai === 'HUY') throw new BadRequestException('Biên bản đã huỷ rồi');
    if (bb.trangThai !== 'DA_CHOT') throw new BadRequestException('Chỉ huỷ biên bản ĐÃ CHỐT. Biên bản nháp thì Xoá.');
    return this.prisma.$transaction(async (tx) => {
      if (bb.butToanId) {
        await tx.butToanChiTiet.deleteMany({ where: { butToanId: bb.butToanId } });
        await tx.butToan.delete({ where: { id: bb.butToanId } });
      }
      await tx.congNoGiaoDich.deleteMany({ where: { chungTuLoai: 'GIAMTRU_CHOT', chungTuId: id } });
      return tx.chotCongNo.update({
        where: { id },
        data: { trangThai: 'HUY', butToanId: null, lyDoHuy: lyDo ?? null, ngayHuy: new Date(), nguoiHuy: nguoiHuy ?? null },
      });
    });
  }

  /** Cài đặt chu kỳ chốt công nợ (số ngày) cho 1 khách hàng. */
  async caiDatChuKyChot(khachhangId: string, chuKyChotCongNo: number | null) {
    return this.prisma.khachhang.update({
      where: { id: khachhangId },
      data: { chuKyChotCongNo: chuKyChotCongNo && chuKyChotCongNo > 0 ? Math.floor(chuKyChotCongNo) : null },
      select: { id: true, makh: true, name: true, chuKyChotCongNo: true },
    });
  }

  /**
   * NHẮC CHỐT công nợ: liệt kê KH sắp tới hạn / tới hạn / quá hạn chốt.
   * Hạn chốt = (lần chốt gần nhất, hoặc đơn danhan đầu tiên nếu chưa chốt) + chu kỳ chốt của KH.
   */
  async nhacChotCongNo(params?: { asOf?: string; soNgayCanhBao?: number }) {
    const asOf = this.asOfLiteral(params?.asOf);
    const canhBao = Number.isFinite(params?.soNgayCanhBao as any) ? Number(params!.soNgayCanhBao) : 3;
    const rows: any[] = await this.prisma.$queryRawUnsafe(`
      WITH base AS (
        SELECT k.id, k.makh, k.name, k."chuKyChotCongNo" chu_ky,
          COALESCE(
            (SELECT MAX(c."denNgay")::date FROM "ChotCongNo" c WHERE c."khachhangId"=k.id AND c."trangThai"='DA_CHOT'),
            (SELECT MIN(d.ngaygiao)::date FROM "Donhang" d WHERE d."khachhangId"=k.id AND d.status='danhan')
          ) AS moc
        FROM "Khachhang" k
        WHERE k."isActive" AND k."chuKyChotCongNo" IS NOT NULL AND k."chuKyChotCongNo" > 0
      ),
      calc AS (
        SELECT b.*, (moc + chu_ky)::date han, ((moc + chu_ky)::date - ${asOf}) con_lai
        FROM base b WHERE b.moc IS NOT NULL
      )
      SELECT makh, name, chu_ky::int chu_ky, moc, han, con_lai::int con_lai,
        CASE WHEN con_lai < 0 THEN 'QUA_HAN'
             WHEN con_lai = 0 THEN 'TOI_HAN'
             WHEN con_lai <= ${canhBao} THEN 'SAP_TOI'
             ELSE 'CON_HAN' END trang_thai
      FROM calc
      WHERE con_lai <= ${canhBao}
      ORDER BY con_lai ASC
    `);
    return rows.map((r) => ({
      makh: r.makh, name: r.name, chuKy: r.chu_ky,
      mocGanNhat: r.moc, hanChot: r.han, conLaiNgay: r.con_lai, trangThai: r.trang_thai,
    }));
  }

  // ================= NHÓM KHÁCH HÀNG (chốt/thu chung) =================

  /** Tất cả khachhangId là thành viên của 1 nhóm (bảng nối ẩn _KhachhangNhom: A=khachhangId, B=nhomkhachhangId). */
  private async khachhangIdsCuaNhom(nhomId: string): Promise<string[]> {
    const rows: any[] = await this.prisma.$queryRawUnsafe(
      `SELECT "A" AS id FROM "_KhachhangNhom" WHERE "B" = $1`,
      nhomId,
    );
    return rows.map((r) => r.id);
  }

  /** Thành viên (chi nhánh) của 1 nhóm — để bung ra chọn nhiều (bỏ bớt CN không cần chốt). */
  async thanhVienNhom(nhomId: string) {
    const ids = await this.khachhangIdsCuaNhom(nhomId);
    if (!ids.length) return [];
    return this.prisma.khachhang.findMany({
      where: { id: { in: ids } },
      select: { id: true, makh: true, name: true, loaikh: true },
      orderBy: { makh: 'asc' },
    });
  }

  /** Bật/tắt cờ chốt chung cho 1 nhóm (nhóm được quản lý ở /admin/nhomkhachhang). */
  async capNhatChotChungNhom(nhomId: string, chotChung: boolean) {
    return this.prisma.nhomkhachhang.update({ where: { id: nhomId }, data: { chotChung: !!chotChung } });
  }

  /** Danh sách nhóm KH kèm số thành viên + cờ chốt chung (cho màn chốt công nợ). */
  async danhSachNhom() {
    const nhoms = await this.prisma.nhomkhachhang.findMany({
      select: { id: true, name: true, description: true, chotChung: true, _count: { select: { khachhang: true } } },
      orderBy: { name: 'asc' },
    });
    return nhoms.map((n) => ({
      id: n.id, name: n.name, description: n.description, chotChung: n.chotChung, soThanhVien: n._count.khachhang,
    }));
  }

  /** Công nợ TỔNG của cả nhóm = Σ công nợ thành viên − thu chung − giảm trừ chung. */
  async congNoNhom(nhomId: string, tuNgay?: string) {
    const khIds = await this.khachhangIdsCuaNhom(nhomId);
    const members = await this.prisma.khachhang.findMany({
      where: { id: { in: khIds } }, select: { id: true, makh: true, name: true },
    });
    const chiNhanh: any[] = [];
    let tong = 0;
    for (const b of members) {
      const cn = await this.congNoRongKhachHang(b.id, tuNgay);
      chiNhanh.push({ makh: b.makh, name: b.name, soDuCuoiKy: cn.soDuCuoiKy });
      tong += cn.soDuCuoiKy;
    }
    const goLive = tuNgay && /^\d{4}-\d{2}-\d{2}$/.test(tuNgay) ? new Date(tuNgay) : null;
    const thuAgg = await this.prisma.phieuThuChi.aggregate({
      where: { loai: 'THU', nhomId, ...(goLive ? { ngay: { gte: goLive } } : {}) }, _sum: { sotien: true },
    });
    const giamAgg = await this.prisma.chotCongNo.aggregate({
      where: { nhomId, trangThai: 'DA_CHOT', ...(goLive ? { denNgay: { gte: goLive } } : {}) }, _sum: { chenhLech: true },
    });
    const thuChung = Number(thuAgg._sum.sotien ?? 0);
    const giamTruChung = Number(giamAgg._sum.chenhLech ?? 0);
    return {
      nhomId, soChiNhanh: members.length,
      congNoChiNhanh: tong, thuChung, giamTruChung,
      soDuCuoiKy: tong - thuChung - giamTruChung,
      chiNhanh,
    };
  }

  // ================= QUY ĐỔI GIÁ VỐN (đơn vị nhập ≠ bán, biến thể) =================

  /** Giá vốn GỐC theo kỳ = bình quân gia quyền gianhap của chính SP; fallback giagoc tĩnh. */
  private async giaVonGocKy(sanphamId: string, tu?: string, den?: string): Promise<number> {
    const conds = ['dts."idSP" = $1', 'dts.gianhap > 0', 'dts.slnhan > 0'];
    const args: any[] = [sanphamId];
    if (tu) { args.push(tu); conds.push(`dt.ngaynhan >= $${args.length}::date`); }
    if (den) { args.push(den); conds.push(`dt.ngaynhan < ($${args.length}::date + interval '1 day')`); }
    const rows: any[] = await this.prisma.$queryRawUnsafe(`
      SELECT SUM(dts.slnhan*dts.gianhap)/NULLIF(SUM(dts.slnhan),0) gv
      FROM "Dathangsanpham" dts JOIN "Dathang" dt ON dt.id=dts."dathangId"
      WHERE ${conds.join(' AND ')}
    `, ...args);
    const gv = Number(rows[0]?.gv ?? 0);
    if (gv > 0) return gv;
    const sp = await this.prisma.sanpham.findUnique({ where: { id: sanphamId }, select: { giagoc: true } });
    return Number(sp?.giagoc ?? 0);
  }

  /**
   * Giá vốn 1 sản phẩm (đã quy đổi): nếu là biến thể -> tính từ SP GỐC × hệ số / (1 − hao hụt),
   * đi ngược lên cây gốc (tối đa 5 cấp). SP nhập trực tiếp -> bình quân gianhap của chính nó.
   */
  async giaVonSanPham(sanphamId: string, tu?: string, den?: string) {
    const sel = { id: true, masp: true, title: true, sanphamGocId: true, heSoQuyDoi: true, haoHutQuyDoi: true, dvt: true };
    let cur: any = await this.prisma.sanpham.findUnique({ where: { id: sanphamId }, select: sel });
    if (!cur) throw new BadRequestException('Không tìm thấy sản phẩm');
    let heSoTong = 1, conLai = 1, depth = 0;
    while (cur?.sanphamGocId && depth < 5) {
      heSoTong *= Number(cur.heSoQuyDoi || 1);
      conLai *= 1 - Number(cur.haoHutQuyDoi || 0);
      cur = await this.prisma.sanpham.findUnique({ where: { id: cur.sanphamGocId }, select: sel });
      depth++;
    }
    const giaVonGoc = await this.giaVonGocKy(cur.id, tu, den);
    const giaVon = conLai > 0 ? (giaVonGoc * heSoTong) / conLai : giaVonGoc * heSoTong;
    return { sanphamId, giaVon, spGoc: `${cur.masp} - ${cur.title}`, dvtGoc: cur.dvt, giaVonGoc, heSo: heSoTong, haoHut: 1 - conLai };
  }

  /** Khai báo quy đổi cho 1 SP biến thể. */
  async capNhatQuyDoi(sanphamId: string, dto: { sanphamGocId?: string | null; heSoQuyDoi?: number; haoHutQuyDoi?: number }) {
    return this.prisma.sanpham.update({
      where: { id: sanphamId },
      data: {
        sanphamGocId: dto.sanphamGocId ?? null,
        heSoQuyDoi: dto.heSoQuyDoi != null ? dto.heSoQuyDoi : undefined,
        haoHutQuyDoi: dto.haoHutQuyDoi != null ? dto.haoHutQuyDoi : undefined,
      },
      select: { id: true, masp: true, title: true, sanphamGocId: true, heSoQuyDoi: true, haoHutQuyDoi: true },
    });
  }

  /** Bảng đối chiếu giá vốn: giá vốn tĩnh (giagoc) vs giá vốn tính theo quy đổi. */
  async bangGiaVonQuyDoi(params?: { tu?: string; den?: string; chiBienThe?: boolean }) {
    const sps = await this.prisma.sanpham.findMany({
      where: { isActive: true, ...(params?.chiBienThe ? { sanphamGocId: { not: null } } : {}) },
      select: { id: true, masp: true, title: true, dvt: true, giagoc: true, sanphamGocId: true },
      take: 500,
    });
    const rows: any[] = [];
    for (const sp of sps) {
      const gv = await this.giaVonSanPham(sp.id, params?.tu, params?.den);
      rows.push({
        masp: sp.masp, title: sp.title, dvt: sp.dvt,
        giaVonTinh: Math.round(gv.giaVon), giagocTinh: Number(sp.giagoc),
        laBienThe: !!sp.sanphamGocId, spGoc: sp.sanphamGocId ? gv.spGoc : '', heSo: gv.heSo, haoHut: gv.haoHut,
        lech: Math.round(gv.giaVon) - Number(sp.giagoc),
      });
    }
    return rows;
  }
}
