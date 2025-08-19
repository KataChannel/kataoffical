import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
const DEFAUL_KHO_ID = '4cc01811-61f5-4bdc-83de-a493764e9258';
@Injectable()
export class DonhangService {
  constructor(private readonly prisma: PrismaService) {}

  // ✅ Helper methods để thay thế TimezoneUtilService (vì frontend gửi UTC)
  private formatDateForFilename(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    return `${year}${month}${day}_${hours}${minutes}${seconds}`;
  }

  private formatDateUnderscored(): string {
    return this.formatDateForFilename();
  }

  private convertDateFilters(filters: any): any {
    // ✅ Frontend đã gửi UTC, chỉ cần parse trực tiếp
    const result: any = {};

    if (filters.fromDate) {
      result.fromDate = new Date(filters.fromDate);
    }

    if (filters.toDate) {
      result.toDate = new Date(filters.toDate);
    }

    return result;
  }

  private getStartOfDay(date: any): Date {
    const d = new Date(date);
    d.setUTCHours(0, 0, 0, 0);
    return d;
  }

  private getEndOfDay(date: any): Date {
    const d = new Date(date);
    d.setUTCHours(23, 59, 59, 999);
    return d;
  }

  /**
   * Helper method to safely update TonKho, creating record if not exists
   */
  private async updateTonKhoSafe(
    prisma: any,
    sanphamId: string,
    updateData: {
      slton?: { increment?: number; decrement?: number };
      slchogiao?: { increment?: number; decrement?: number };
      slchonhap?: { increment?: number; decrement?: number };
    },
  ) {
    try {
      await prisma.tonKho.upsert({
        where: { sanphamId },
        create: {
          sanphamId,
          slton: this.getCreateValue(updateData.slton),
          slchogiao: this.getCreateValue(updateData.slchogiao),
          slchonhap: this.getCreateValue(updateData.slchonhap),
        },
        update: updateData,
      });
    } catch (error) {
      console.error(`Error updating TonKho for sanphamId ${sanphamId}:`, error);
      throw error;
    }
  }

  /**
   * Helper to calculate initial value for TonKho creation
   */
  private getCreateValue(operation?: {
    increment?: number;
    decrement?: number;
  }): number {
    if (!operation) return 0;
    if (operation.increment) return operation.increment;
    if (operation.decrement) return -operation.decrement;
    return 0;
  }

  async generateNextOrderCode(): Promise<string> {
    // Lấy mã đơn hàng gần nhất
    const lastOrder = await this.prisma.donhang.findFirst({
      orderBy: { createdAt: 'desc' },
    });

    let nextCode = 'TG-AA00001'; // Mã đầu tiên

    if (lastOrder) {
      nextCode = this.incrementOrderCode(lastOrder.madonhang);
    }
    // console.log('nextCode', nextCode);

    return nextCode;
  }

  private incrementOrderCode(orderCode: string): string {
    const prefix = 'TG-';
    const letters = orderCode.slice(3, 5); // Lấy AA → ZZ
    const numbers = parseInt(orderCode.slice(5), 10); // Lấy 00001 → 99999

    let newLetters = letters;
    let newNumbers = numbers + 1;

    if (newNumbers > 99999) {
      newNumbers = 1; // Reset về 00001
      newLetters = this.incrementLetters(letters);
    }
    return `${prefix}${newLetters}${newNumbers.toString().padStart(5, '0')}`;
  }

  private incrementLetters(letters: string): string {
    let firstChar = letters.charCodeAt(0);
    let secondChar = letters.charCodeAt(1);

    if (secondChar === 90) {
      // 'Z'
      if (firstChar === 90) return 'ZZ'; // Giới hạn cuối cùng
      firstChar++;
      secondChar = 65; // Reset về 'A'
    } else {
      secondChar++;
    }
    return String.fromCharCode(firstChar) + String.fromCharCode(secondChar);
  }

  async reorderDonHangs(donhangIds: string[]) {
    // Update the order of each donhang based on its position in the array
    for (let i = 0; i < donhangIds.length; i++) {
      await this.prisma.donhang.update({
        where: { id: donhangIds[i] },
        data: { order: i + 1 },
      });
    }
  }

  async search(params: any) {
    const {
      Batdau,
      Ketthuc,
      Type,
      pageSize = 10,
      pageNumber = 1,
      query,
    } = params;

    const ngaygiao =
      Batdau || Ketthuc
        ? {
            ...(Batdau && { gte: new Date(Batdau) }),
            ...(Ketthuc && { lte: new Date(Ketthuc) }),
          }
        : undefined;

    const where: any = {
      ...(ngaygiao && { ngaygiao }),
      status: Array.isArray(params.Status)
        ? { in: params.Status }
        : params.Status,
    };

    if (query) {
      where.OR = [
        { madonhang: { contains: query, mode: 'insensitive' } },
        { khachhang: { name: { contains: query, mode: 'insensitive' } } },
      ];
    }

    const [total, donhangs] = await Promise.all([
      this.prisma.donhang.count({ where }),
      this.prisma.donhang.findMany({
        where,
        include: {
          sanpham: {
            include: {
              sanpham: true,
            },
          },
          khachhang: { include: { banggia: { include: { sanpham: true } } } },
        },
        orderBy: { createdAt: 'desc' },
        skip: (Number(pageNumber) - 1) * Number(pageSize),
        take: Number(pageSize),
      }),
    ]);
    const result = donhangs.map(({ khachhang, sanpham, ...donhang }) => ({
      ...donhang,
      sanpham: sanpham.map((item: any) => {
        const priceFromBanggia = khachhang?.banggia
          ? khachhang.banggia.sanpham.find((sp) => sp.sanphamId === item.idSP)
              ?.giaban
          : 0;
        const giaban =
          priceFromBanggia !== 0 ? priceFromBanggia : item.sanpham.giaban;

        return {
          ...item.sanpham,
          idSP: item.idSP,
          giaban: giaban,
          sldat: parseFloat((item.sldat ?? 0).toFixed(3)),
          slgiao: parseFloat((item.slgiao ?? 0).toFixed(3)),
          slnhan: parseFloat((item.slnhan ?? 0).toFixed(3)),
          ttdat: parseFloat((item.ttdat ?? 0).toFixed(3)),
          ttgiao: parseFloat((item.ttgiao ?? 0).toFixed(3)),
          ttnhan: parseFloat((item.ttnhan ?? 0).toFixed(3)),
          ghichu: item.ghichu,
        };
      }),
      khachhang: khachhang
        ? (({ banggia, ...rest }) => rest)(khachhang as any)
        : null, // Xóa banggia
      name: khachhang?.name,
    }));

    return {
      data: result,
      total,
      pageNumber,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  async congnokhachhang(params: any) {
    const { Batdau, Ketthuc, query } = params;

    // ✅ Sử dụng TimezoneUtilService cho date range
    const dateRange =  {
        gte: Batdau ? new Date(Batdau) : undefined,
        lte: Ketthuc ? new Date(Ketthuc) : undefined,
      }

    const where: any = {
      ngaygiao: dateRange,
      // type: Type,
      status: Array.isArray(params.Status)
        ? { in: params.Status }
        : params.Status,
    };

    if (query) {
      where.OR = [
        { madonhang: { contains: query, mode: 'insensitive' } },
        { khachhang: { name: { contains: query, mode: 'insensitive' } } },
      ];
    }

    const donhangs = await this.prisma.donhang.findMany({
      where,
      include: {
        sanpham: {
          include: {
            sanpham: true,
          },
        },
        khachhang: { include: { banggia: { include: { sanpham: true } } } },
      },
      orderBy: { createdAt: 'desc' },
    });
    const result = donhangs.map((v: any) => {
      const [tong, soluong] = v.sanpham.reduce(
        (acc: [number, number], item: any) => {
          const slnhan = parseFloat((item.slnhan || 0).toString());
          const giaban = parseFloat((item.sanpham?.giaban || 0).toString());
          return [
            acc[0] + (slnhan * giaban),
            acc[1] + slnhan
          ];
        },
        [0, 0]
      );      
      return {
        madonhang: v.madonhang,
        ngaygiao: v.ngaygiao,
        tong:tong.toFixed(3),
        soluong:soluong.toFixed(3),
        tongtien: v.tongtien,
        tongvat: v.tongvat,
        name: v.khachhang?.name,
        makh: v.khachhang?.makh,
      }
    })
    return result || [];
  }
  async downloadcongnokhachhang(params: any) {
    const { Batdau, Ketthuc, query } = params;
    
    // ✅ Sử dụng TimezoneUtilService cho date range
    const dateRange =  {
        gte: Batdau ? new Date(Batdau) : undefined,
        lte: Ketthuc ? new Date(Ketthuc) : undefined,
    } 
    const where: any = {
      ngaygiao: dateRange,
      status: Array.isArray(params.Status)
        ? { in: params.Status }
        : params.Status,
    };

    if (query) {
      where.OR = [
        { madonhang: { contains: query, mode: 'insensitive' } },
        { khachhang: { name: { contains: query, mode: 'insensitive' } } },
      ];
    }
    console.log('where', where);
    
    const donhangs = await this.prisma.donhang.findMany({
      where,
      include: {
        sanpham: {
          include: {
            sanpham: true,
          },
        },
        khachhang: { include: { banggia: { include: { sanpham: true } } } },
      },
      orderBy: { createdAt: 'desc' },
    });
    
    const Sanphams = await this.prisma.sanpham.findMany();
    const result = donhangs.flatMap((v: any) => {
      const orderItems = v.sanpham.map((v1: any) => {
        const product = Sanphams.find((sp: any) => sp.id === v1.idSP);
        const giaban =
          v?.khachhang?.banggia?.sanpham.find((sp: any) => sp.id === v1.idSP)
            ?.giaban ||
          product?.giaban ||
          0;
        const vat: any = product?.vat || 0;
        const thanhtiensauvat = v1.slgiao * giaban * (1 + vat / 100);
        return {
          id: v.id,
          ngaygiao: v.ngaygiao,
          tenkhachhang: v.khachhang?.name,
          makhachhang: v.khachhang?.makh,
          madonhang: v.madonhang,
          tenhang: product?.title || '',
          mahang: product?.masp || '',
          dvt: product?.dvt || '',
          soluong: v1.slgiao,
          dongia: giaban,
          thanhtientruocvat: v1.slgiao * giaban,
          vat: vat,
          dongiavathoadon: giaban * (1 + vat / 100),
          thanhtiensauvat: thanhtiensauvat,
          ghichu: v1.ghichu,
        };
      });

      // Calculate tongtiensauvat for the entire order
      const tongtiensauvat = orderItems.reduce(
        (sum, item) => sum + item.thanhtiensauvat,
        0,
      );

      // Add tongtiensauvat to each item
      return orderItems.map((item) => ({
        ...item,
        tongtiensauvat: tongtiensauvat,
      }));
    });
    
    // Group data by customer and create Excel file
    return this.createCongnoExcelFile(result || [], params);
  }

  /**
   * Create Excel file for Congno with grouped data by customer
   */
  private async createCongnoExcelFile(data: any[], params: any) {
    const ExcelJS = require('exceljs');
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Công Nợ Khách Hàng');

    // Define column headers
    const columns = [
      { key: 'ngaygiao', header: 'Ngày Giao', width: 15 },
      { key: 'makhachhang', header: 'Mã Khách Hàng', width: 15 },
      { key: 'tenkhachhang', header: 'Tên Khách Hàng', width: 25 },
      { key: 'madonhang', header: 'Mã Đơn Hàng', width: 15 },
      { key: 'mahang', header: 'Mã Hàng', width: 15 },
      { key: 'tenhang', header: 'Tên Hàng', width: 30 },
      { key: 'dvt', header: 'ĐVT', width: 10 },
      { key: 'soluong', header: 'Số Lượng', width: 12 },
      { key: 'dongia', header: 'Đơn Giá', width: 15 },
      { key: 'thanhtientruocvat', header: 'Thành Tiền Trước VAT', width: 20 },
      { key: 'vat', header: 'VAT (%)', width: 10 },
      { key: 'dongiavathoadon', header: 'Đơn Giá VAT', width: 15 },
      { key: 'thanhtiensauvat', header: 'Thành Tiền Sau VAT', width: 20 },
      { key: 'ghichu', header: 'Ghi Chú', width: 20 },
      { key: 'tongtiensauvat', header: 'Tổng Tiền Sau Thuế', width: 20 }
    ];

    worksheet.columns = columns;

    // Style header row
    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true, color: { argb: 'FFFFFF' } };
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '366092' }
    };
    headerRow.alignment = { horizontal: 'center', vertical: 'middle' };
    headerRow.height = 25;

    // Group data by customer
    const groupedData = this.groupDataByCustomer(data);
    
    let currentRow = 2;
    const mergeRanges: any[] = [];

    // Add data with customer grouping
    for (const customerData of groupedData) {
      const startRow = currentRow;
      
      for (const item of customerData.items) {
        const row = worksheet.getRow(currentRow);
        
        // Format date
        const ngaygiao = item.ngaygiao ? new Date(item.ngaygiao) : null;
        
        row.values = {
          ngaygiao: ngaygiao ? ngaygiao.toLocaleDateString('vi-VN') : '',
          makhachhang: item.makhachhang || '',
          tenkhachhang: item.tenkhachhang || '',
          madonhang: item.madonhang || '',
          mahang: item.mahang || '',
          tenhang: item.tenhang || '',
          dvt: item.dvt || '',
          soluong: Number(item.soluong) || 0,
          dongia: Number(item.dongia) || 0,
          thanhtientruocvat: Number(item.thanhtientruocvat) || 0,
          vat: Number(item.vat) || 0,
          dongiavathoadon: Number(item.dongiavathoadon) || 0,
          thanhtiensauvat: Number(item.thanhtiensauvat) || 0,
          ghichu: item.ghichu || '',
          tongtiensauvat: Number(item.tongtiensauvat) || 0
        };

        // Format number columns
        ['soluong', 'dongia', 'thanhtientruocvat', 'dongiavathoadon', 'thanhtiensauvat', 'tongtiensauvat'].forEach(col => {
          const cell = row.getCell(col);
          cell.numFmt = '#,##0.00';
          cell.alignment = { horizontal: 'right' };
        });

        ['vat'].forEach(col => {
          const cell = row.getCell(col);
          cell.numFmt = '0.00%';
          cell.alignment = { horizontal: 'right' };
        });

        currentRow++;
      }

      const endRow = currentRow - 1;
      
      // Create merge ranges for customer info (only if multiple rows)
      if (endRow > startRow) {
        ['makhachhang', 'tenkhachhang', 'tongtiensauvat'].forEach(col => {
          const colIndex = columns.findIndex(c => c.key === col) + 1;
          mergeRanges.push({
            range: `${String.fromCharCode(64 + colIndex)}${startRow}:${String.fromCharCode(64 + colIndex)}${endRow}`,
            value: customerData.items[0][col]
          });
        });
      }
    }

    // Apply merge ranges
    mergeRanges.forEach(merge => {
      worksheet.mergeCells(merge.range);
      const cell = worksheet.getCell(merge.range.split(':')[0]);
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
      cell.font = { bold: true };
    });

    // Add borders to all cells
    worksheet.eachRow((row, rowNumber) => {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };
      });
    });

    // Generate filename
    const dateStr = this.formatDateForFilename();
    const filename = `CongNoKhachHang_${dateStr}.xlsx`;

    // Generate buffer
    const buffer = await workbook.xlsx.writeBuffer();
    
    return {
      buffer: buffer,
      filename: filename,
      contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    };
  }

  /**
   * Group data by customer (helper method)
   */
  private groupDataByCustomer(data: any[]): any[] {
    const customerMap = new Map();
    
    data.forEach(item => {
      const customerKey = item.makhachhang || 'unknown';
      
      if (!customerMap.has(customerKey)) {
        customerMap.set(customerKey, {
          makhachhang: item.makhachhang,
          tenkhachhang: item.tenkhachhang,
          tongtiensauvat: 0,
          items: []
        });
      }
      
      const customer = customerMap.get(customerKey);
      customer.items.push(item);
      customer.tongtiensauvat += Number(item.thanhtiensauvat) || 0;
    });
    
    // Sort customers by name
    return Array.from(customerMap.values()).sort((a, b) => 
      (a.tenkhachhang || '').localeCompare(b.tenkhachhang || '')
    );
  }

  /**
   * Tổng hợp số lượng sản phẩm chờ giao trong các đơn hàng theo điều kiện lọc.
   * Trả về danh sách sản phẩm với tổng số lượng đặt (sldat) theo từng mã sản phẩm.
   */
  async getchogiao(params: any) {
    const { Batdau, Ketthuc, Type } = params;

    // ✅ Sử dụng TimezoneUtilService cho date range
    const dateRange = {
        gte: Batdau ? new Date(Batdau) : undefined,
        lte: Ketthuc ? new Date(Ketthuc) : undefined,
      }

    // Lấy danh sách đơn hàng theo điều kiện lọc
    const donhangs = await this.prisma.donhang.findMany({
      where: {
        ngaygiao: dateRange,
        // type: Type,
        // Có thể bổ sung điều kiện status nếu cần
      },
      include: {
        sanpham: {
          include: { sanpham: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Gộp số lượng đặt theo từng sản phẩm
    const productMap = new Map<
      string,
      { title: string; masp: string; sldat: number }
    >();

    for (const dh of donhangs) {
      for (const sp of dh.sanpham) {
        if (!sp?.sanpham) continue;
        const key = sp.idSP;
        if (productMap.has(key)) {
          productMap.get(key)!.sldat += Number(sp.sldat) || 0;
        } else {
          productMap.set(key, {
            title: sp.sanpham.title,
            masp: sp.sanpham.masp,
            sldat: Number(sp.sldat) || 0,
          });
        }
      }
    }

    // Trả về danh sách tổng hợp
    return Array.from(productMap, ([idSP, value]) => ({
      idSP,
      title: value.title,
      masp: value.masp,
      slchogiaott: parseFloat(value.sldat.toFixed(3)),
    }));
  }

  async dongbogia(listdonhang: any) {
    console.log('Đồng bộ giá cho danh sách đơn hàng:', listdonhang);

    let totalUpdatedCount = 0;
    let totalErrorCount = 0;
    const batchSize = 5; // Giảm batch size để tránh timeout

    // Chia danh sách đơn hàng thành các batch nhỏ
    for (let i = 0; i < listdonhang.length; i += batchSize) {
      const batch = listdonhang.slice(i, i + batchSize);
      console.log(`Xử lý batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(listdonhang.length / batchSize)} với ${batch.length} đơn hàng`);

      try {
        const batchResult = await this.prisma.$transaction(async (prisma) => {
          let updatedCount = 0;
          let errorCount = 0;

          for (const donhangId of batch) {
            try {
              // 1. Tìm đơn hàng với bảng giá và sản phẩm
              const donhang = await prisma.donhang.findUnique({
                where: { id: donhangId },
                include: {
                  banggia: {
                    include: {
                      sanpham: {
                        include: {
                          sanpham: true
                        }
                      },
                    },
                  },
                  khachhang: true,
                  sanpham: {
                    include: {
                      sanpham: true
                    }
                  },
                },
              });

              if (!donhang) {
                console.warn(`Đơn hàng ${donhangId} không tồn tại`);
                errorCount++;
                continue;
              }

              // 2. Kiểm tra đơn hàng có bảng giá không
              if (!donhang.banggia) {
                console.warn(`Đơn hàng ${donhang.madonhang} không có bảng giá được chỉ định`);
                errorCount++;
                continue;
              }

              console.log(`Cập nhật giá cho đơn hàng ${donhang.madonhang} từ bảng giá ${donhang.banggia.mabanggia}`);

              let tongchua = 0; // Tổng tiền chưa VAT
              let hasUpdates = false;

              // 3. Cập nhật giá cho từng sản phẩm trong đơn hàng
              for (const donhangSanpham of donhang.sanpham) {
                // Tìm giá từ bảng giá của đơn hàng
                const giaSanpham = donhang.banggia.sanpham.find(
                  (bgsp) => bgsp.sanphamId === donhangSanpham.idSP,
                );

                if (giaSanpham) {
                  const giaban = Number(giaSanpham.giaban);
                  const sldat = Number(donhangSanpham.sldat) || 0;
                  const slgiao = Number(donhangSanpham.slgiao) || 0;
                  const slnhan = Number(donhangSanpham.slnhan) || 0;
                  const vat = Number(donhangSanpham.vat) || 0;

                  // 4. Cập nhật giá và tính toán lại các giá trị
                  const ttdat = giaban * sldat;
                  const ttgiao = giaban * slgiao;
                  const ttnhan = giaban * slnhan;
                  const ttsauvat = ttnhan * (1 + vat / 100);

                  await prisma.donhangsanpham.update({
                    where: { id: donhangSanpham.id },
                    data: {
                      giaban: giaban,
                      ttdat: ttdat,
                      ttgiao: ttgiao,
                      ttnhan: ttnhan,
                      ttsauvat: ttsauvat,
                    },
                  });

                  tongchua += ttnhan;
                  hasUpdates = true;

                  console.log(`Cập nhật sản phẩm ${donhangSanpham.sanpham?.title} - Giá mới: ${giaban}`);
                } else {
                  console.warn(`Không tìm thấy giá cho sản phẩm ${donhangSanpham.sanpham?.title} trong bảng giá ${donhang.banggia.mabanggia}`);
                }
              }

              // 5. Tính lại tổng tiền cho đơn hàng
              if (hasUpdates) {
                const vatRate = Number(donhang.vat) || 0;
                const tongvat = tongchua * (vatRate / 100);
                const tongtien = tongchua + tongvat;

                await prisma.donhang.update({
                  where: { id: donhangId },
                  data: {
                    tongvat: tongvat,
                    tongtien: tongtien,
                  },
                });

                console.log(`Cập nhật tổng tiền đơn hàng ${donhang.madonhang}: Tổng chưa VAT: ${tongchua}, VAT: ${tongvat}, Tổng tiền: ${tongtien}`);
              }

              updatedCount++;
            } catch (error) {
              console.error(`Lỗi khi cập nhật đơn hàng ${donhangId}:`, error);
              errorCount++;
            }
          }

          return { updatedCount, errorCount };
        }, {
          maxWait: 15000, // Tăng thời gian chờ tối đa lên 15 giây
          timeout: 12000,  // Tăng timeout cho mỗi transaction lên 12 giây
        });

        totalUpdatedCount += batchResult.updatedCount;
        totalErrorCount += batchResult.errorCount;

        console.log(`Hoàn thành batch: ${batchResult.updatedCount} thành công, ${batchResult.errorCount} lỗi`);
        
        // Thêm delay nhỏ giữa các batch để tránh quá tải
        if (i + batchSize < listdonhang.length) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }

      } catch (error) {
        console.error(`Lỗi khi xử lý batch từ ${i} đến ${i + batchSize - 1}:`, error);
        totalErrorCount += batch.length; // Đếm toàn bộ batch này là lỗi
      }
    }

    return {
      status: 'success',
      message: `Đã đồng bộ giá thành công cho ${totalUpdatedCount} đơn hàng${totalErrorCount > 0 ? `, ${totalErrorCount} đơn hàng lỗi` : ''}`,
      updatedCount: totalUpdatedCount,
      errorCount: totalErrorCount,
      totalProcessed: listdonhang.length,
    };
  }

  async phieuchuyen(params: any) {
    const { Batdau, Ketthuc, Type } = params;

    // ✅ Sử dụng TimezoneUtilService cho date range
    const dateRange = {
        gte: Batdau ? new Date(Batdau) : undefined,
        lte: Ketthuc ? new Date(Ketthuc) : undefined,
      }

    const result = await this.prisma.donhang.findMany({
      where: {
        ngaygiao: dateRange,
        // type: Type,
        status: Array.isArray(params.Status)
          ? { in: params.Status }
          : params.Status,
      },
      include: {
        sanpham: {
          include: {
            sanpham: true,
          },
        },
        khachhang: { include: { banggia: { include: { sanpham: true } } } },
      },
      orderBy: { createdAt: 'desc' },
    });
    return result.map(({ khachhang, sanpham, ...donhang }) => ({
      ...donhang,
      name: khachhang?.name,
      diachi: khachhang?.diachi,
      sdt: khachhang?.sdt,
      gionhanhang: khachhang?.gionhanhang,
      tongsomon: sanpham.length,
      soluongtt: parseFloat(
        sanpham
          .reduce((total, item: any) => total + Number(item.slgiao || 0), 0)
          .toFixed(3),
      ),
    }));
  }

  async phieugiao(params: any) {
    const result = await this.prisma.donhang.findUnique({
      where: params,
      include: {
        sanpham: {
          include: {
            sanpham: true,
          },
        },
        khachhang: { include: { banggia: { include: { sanpham: true } } } },
      },
    });
    if (!result) {
      throw new NotFoundException('DonHang not found');
    }
    return {
      ...result,
      sanpham: result.sanpham.map((item: any) => {
        const priceFromBanggia = result.khachhang?.banggia
          ? result.khachhang.banggia.sanpham.find(
              (sp) => sp.sanphamId === item.idSP,
            )?.giaban
          : 0;
        const giaban =
          priceFromBanggia !== 0 ? priceFromBanggia : item.sanpham.giaban;
        return {
          ...item.sanpham,
          idSP: item.idSP,
          giaban: giaban,
          sldat: parseFloat((item.sldat ?? 0).toFixed(3)),
          slgiao: parseFloat((item.slgiao ?? 0).toFixed(3)),
          slnhan: parseFloat((item.slnhan ?? 0).toFixed(3)),
          ttdat: parseFloat((item.ttdat ?? 0).toFixed(3)),
          ttgiao: parseFloat((item.ttgiao ?? 0).toFixed(3)),
          ttnhan: parseFloat((item.ttnhan ?? 0).toFixed(3)),
          vat: parseFloat((item.vat ?? 0).toFixed(3)),
          ttsauvat: parseFloat(
            (item.ttnhan * (1 + (item.vat || 0) / 100)).toFixed(3),
          ),
          ghichu: item.ghichu,
        };
      }),
      khachhang: result.khachhang
        ? (({ banggia, ...rest }) => rest)(result.khachhang as any)
        : null, // Xóa banggia
    };
  }

  async findAll() {
    const donhangs = await this.prisma.donhang.findMany({
      include: {
        sanpham: {
          include: {
            sanpham: true,
          },
        },
        khachhang: { include: { banggia: { include: { sanpham: true } } } },
      },
      orderBy: { createdAt: 'desc' },
    });
    const result = donhangs.map((donhang) => ({
      ...donhang,
      sanpham: donhang.sanpham.map((item: any) => {
        const priceFromBanggia = donhang.khachhang?.banggia
          ? donhang.khachhang.banggia.sanpham.find(
              (sp) => sp.sanphamId === item.idSP,
            )?.giaban
          : 0;
        const giaban =
          priceFromBanggia !== 0 ? priceFromBanggia : item.sanpham.giaban;
        return {
          ...item.sanpham,
          idSP: item.idSP,
          giaban: giaban,
          sldat: parseFloat((item.sldat ?? 0).toFixed(3)),
          slgiao: parseFloat((item.slgiao ?? 0).toFixed(3)),
          slnhan: parseFloat((item.slnhan ?? 0).toFixed(3)),
          ttdat: parseFloat((item.ttdat ?? 0).toFixed(3)),
          ttgiao: parseFloat((item.ttgiao ?? 0).toFixed(3)),
          ttnhan: parseFloat((item.ttnhan ?? 0).toFixed(3)),
          ghichu: item.ghichu,
        };
      }),
      name: donhang.khachhang?.name,
    }));
    return result;
  }

  async searchfield(searchParams: Record<string, any>) {
    const where: any = {};

    // Xây dựng điều kiện tìm kiếm linh hoạt
    for (const [key, value] of Object.entries(searchParams)) {
      if (!value) continue;

      if (key === 'id') {
        where[key] = value; // Tìm chính xác theo ID
      } else if (typeof value === 'number' || typeof value === 'boolean') {
        where[key] = value; // Tìm theo số hoặc boolean
      } else {
        where[key] = { contains: value, mode: 'insensitive' }; // Tìm gần đúng với string
      }
    }

    const donhang = await this.prisma.donhang.findFirst({
      where,
      include: {
        sanpham: {
          include: {
            sanpham: true,
          },
        },
        khachhang: {
          include: {
            banggia: {
              include: { sanpham: true },
            },
          },
        },
      },
    });

    if (!donhang) throw new NotFoundException('DonHang not found');

    return {
      ...donhang,
      sanpham: donhang.sanpham.map((item) => {
        const priceFromBanggia = donhang.khachhang?.banggia
          ? donhang.khachhang.banggia.sanpham.find(
              (sp) => sp.sanphamId === item.idSP,
            )?.giaban
          : 0;
        const giaban =
          priceFromBanggia !== 0 ? priceFromBanggia : item.sanpham.giaban;
        return {
          ...item.sanpham,
          idSP: item.idSP,
          giaban: giaban,
          sldat: parseFloat((item.sldat ?? 0).toFixed(3)),
          slgiao: parseFloat((item.slgiao ?? 0).toFixed(3)),
          slnhan: parseFloat((item.slnhan ?? 0).toFixed(3)),
          ttdat: parseFloat((item.ttdat ?? 0).toFixed(3)),
          ttgiao: parseFloat((item.ttgiao ?? 0).toFixed(3)),
          ttnhan: parseFloat((item.ttnhan ?? 0).toFixed(3)),
          ghichu: item.ghichu,
        };
      }),
      khachhang: donhang.khachhang
        ? (({ banggia, ...rest }) => rest)(donhang.khachhang as any)
        : null, // Xóa banggia
    };
  }
  async findOne(id: string) {
    const donhang = await this.prisma.donhang.findUnique({
      where: { id },
      include: {
        sanpham: {
          include: {
            sanpham: true,
          },
        },
        khachhang: { include: { banggia: { include: { sanpham: true } } } },
      },
    });
    if (!donhang) throw new NotFoundException('DonHang not found');
    const result = {
      ...donhang,
      sanpham: donhang.sanpham.map((item) => {
        const priceFromBanggia = donhang.khachhang?.banggia
          ? donhang.khachhang.banggia.sanpham.find(
              (sp) => sp.sanphamId === item.idSP,
            )?.giaban
          : 0;
        const giaban =
          priceFromBanggia !== 0 ? priceFromBanggia : item.sanpham.giaban;
        return {
          ...item.sanpham,
          idSP: item.idSP,
          giaban: giaban,
          sldat: parseFloat((item.sldat ?? 0).toFixed(3)),
          slgiao: parseFloat((item.slgiao ?? 0).toFixed(3)),
          slnhan: parseFloat((item.slnhan ?? 0).toFixed(3)),
          slhuy: parseFloat((item.slhuy ?? 0).toFixed(3)),
          ttdat: parseFloat((item.ttdat ?? 0).toFixed(3)),
          ttgiao: parseFloat((item.ttgiao ?? 0).toFixed(3)),
          ttnhan: parseFloat((item.ttnhan ?? 0).toFixed(3)),
          ghichu: item.ghichu,
        };
      }),
    };
    return result;
  }

  async ImportDonhangOld(dulieu: any) {
    // Step 1: Map input data to the expected internal format
    const rawData = await Promise.all(
      dulieu.map(async (v: any) => {
        try {
          const mappedSanpham = await Promise.all(
            v.sanpham.map(async (item: any) => {
              try {
                const sp = await this.prisma.sanpham.findFirst({
                  where: { masp: item.ItemCode },
                });

                if (!sp) {
                  console.warn(
                    `Sản phẩm với mã ${item.ItemCode} không tồn tại, bỏ qua`,
                  );
                  return null;
                }

                return {
                  id: sp.id,
                  sldat: parseFloat((item.Quantity ?? 0).toFixed(3)),
                  slgiao: parseFloat((item.Quantity ?? 0).toFixed(3)),
                  slnhan: parseFloat((item.Quantity ?? 0).toFixed(3)),
                  slhuy: 0,
                  ttdat: 0,
                  ttgiao: 0,
                  ttnhan: 0,
                };
              } catch (error) {
                console.warn(
                  `Lỗi xử lý sản phẩm ${item.ItemCode}, bỏ qua:`,
                  error,
                  item,
                );
                return null;
              }
            }),
          );

          // Filter out null items (failed products)
          const validSanpham = mappedSanpham.filter((item) => item !== null);

          // Skip this order if no valid products
          if (validSanpham.length === 0) {
            console.warn(
              `Đơn hàng ${v.tenkh} không có sản phẩm hợp lệ, bỏ qua`,
            );
            return null;
          }

          return {
            title: `Import ${v.tenkh} - ${this.formatDateUnderscored()}`,
            type: 'donsi',
            ngaygiao: new Date(v.ngaygiao) || new Date(),
            khachhangId: v.khachhangId,
            sanpham: validSanpham,
          };
        } catch (error) {
          console.warn(`Lỗi xử lý đơn hàng ${v.tenkh}, bỏ qua:`, error);
          return null;
        }
      }),
    );

    // Filter out null orders (failed orders)
    const validRawData = rawData.filter((item) => item !== null);

    let success = 0;
    let fail = 0;
    let skip = 0;

    for (const order of rawData) {
      // Kiểm tra đơn hàng theo ngày (ngày giao tính theo startOf day và endOf day)
      const startOfDay = this.getStartOfDay(order.ngaygiao);
      const endOfDay = this.getEndOfDay(order.ngaygiao);
      const existingOrder = await this.prisma.donhang.findFirst({
        where: {
          khachhangId: order.khachhangId,
          ngaygiao: { gte: startOfDay, lte: endOfDay },
        },
        include: { sanpham: true },
      });

      // Nếu đã tồn tại đơn hàng với cùng khachhangId, ngaygiao và số lượng sanpham giống nhau thì bỏ qua
      if (
        existingOrder &&
        existingOrder.sanpham.length === order.sanpham.length
      ) {
        skip++;
        continue;
      }

      // Nếu không tồn tại, tạo mới đơn hàng
      try {
        await this.create(order);
        success++;
      } catch (error) {
        console.log(error);
        
        fail++;
      }
    }
    return { success, fail, skip };
  }

  async ImportDonhang(data: any) {
    const acc: Record<string, any> = {};
    for (const curr of data) {
      if (!acc[curr.makh]) {
        const khachhang = await this.prisma.khachhang.findFirst({
          where: { makh: curr.makh },
        });
        acc[curr.makh] = {
          title: `Import ${this.formatDateUnderscored()}`,
          ngaygiao: curr.ngaygiao,
          makh: curr.makh,
          khachhangId: khachhang?.id,
          name: khachhang?.name,
          mabanggia: curr.mabanggia,
          sanpham: [],
          khachhang: {
            makh: curr.makh,
          },
        };
      }
      const sanphamRecord = await this.prisma.sanpham.findFirst({
        where: { masp: curr.masp },
      });
      acc[curr.makh].sanpham.push({
        masp: curr.masp,
        id: sanphamRecord?.id,
        sldat: Number(curr.sldat),
        slgiao: Number(curr.slgiao),
        slnhan: Number(curr.slnhan),
        ghichu: curr.ghichu,
      });
    }
    const convertData: any = Object.values(acc);
    let success = 0;
    let fail = 0;
    for (const element of convertData) {
      try {
        await this.create(element);
        success += 1;
      } catch (error) {
        // console.log('error', error);

        await this.prisma.importHistory.create({
          data: {
            codeId: element.madonhang, // using madonhang as the unique code identifier
            title: element.title, // new field: title
            type: 'donhang', // new field: type
            caseDetail: {
              errorMessage: error.message,
              errorStack: error.stack,
              additionalInfo: 'Failed during donhang import process',
            },
            order: 1, // update based on your ordering logic if needed
            createdBy: 'system', // replace with the actual account ID if available
          },
        });
        fail += 1;
      }
    }
    return {
      success,
      fail,
    };
  }


  async DonhangcodeToNumber(code: any) {
    if (!code.match(/^TG-[A-Z]{2}\d{5}$/)) {
      throw new Error('Mã không đúng định dạng TG-XXYYYYY');
    }

    const letters = code.slice(3, 5);
    const number = parseInt(code.slice(5), 10);

    const letterValue =
      (letters.charCodeAt(0) - 65) * 26 + (letters.charCodeAt(1) - 65);

    return letterValue * 100000 + number;
  }

  async DonhangnumberToCode(number: any) {
    if (number < 1 || number > 676 * 100000) {
      throw new Error('Số thứ tự không hợp lệ');
    }

    const letterValue = Math.floor(number / 100000);
    const numValue = number % 100000;

    const firstLetter = String.fromCharCode(65 + Math.floor(letterValue / 26));
    const secondLetter = String.fromCharCode(65 + (letterValue % 26));

    const numStr = numValue.toString().padStart(5, '0');

    return `TG-${firstLetter}${secondLetter}${numStr}`;
  }

  // Helper method to calculate totals based on new formula
  private calculateDonhangTotals(sanpham: any[], vatRate: number = 0.05) {
    // tong = sum(sanpham.giaban * sanpham.slnhan)
    const tong = sanpham.reduce((total, sp) => {
      const giaban = parseFloat((sp.giaban || 0).toString());
      const slnhan = parseFloat((sp.slnhan || 0).toString());
      return total + (giaban * slnhan);
    }, 0);

    // tongvat = tong * donhang.vat
    const tongvat = tong * vatRate;

    // tongtien = tong + tongvat
    const tongtien = tong + tongvat;

    return { tong, tongvat, tongtien };
  }
  async create(dto: any) {

    const maxOrderResult = await this.prisma.donhang.aggregate({
      _max: {
      order: true,
      },
    });
    let maxOrder = maxOrderResult._max.order || 0;
    let madonhang = await this.DonhangnumberToCode(maxOrder + 1);
    
    // Kiểm tra mã đơn hàng đã tồn tại chưa
    let existingDonhang = await this.prisma.donhang.findUnique(
      { where: { madonhang } }
    );

    // Nếu mã đã tồn tại, tăng maxOrder cho đến khi tìm được mã chưa tồn tại
    while (existingDonhang) {
      maxOrder++;
      madonhang = await this.DonhangnumberToCode(maxOrder + 1);
      existingDonhang = await this.prisma.donhang.findUnique({
      where: { madonhang },
      });
    }    



    return this.prisma.$transaction(async (prisma) => {
      // Get khachhang data
      const khachhang = await prisma.khachhang.findUnique({
        where: { id: dto.khachhangId },
      });
      if (!khachhang) {
        throw new NotFoundException('Khách hàng không tồn tại');
      }
      const newDonhang = await prisma.donhang.create({
        data: {
          title: dto.title,
          type: dto.type || 'donsi',
          madonhang: madonhang,
          ngaygiao: new Date(dto.ngaygiao),
          khachhangId: dto.khachhangId,
          banggiaId: dto.banggiaId,
          vat: parseFloat((dto.vat || 0.05).toString()), // Default 5% VAT
          isActive: dto.isActive,
          order: maxOrder + 1,
          ghichu: dto.ghichu,
          isshowvat: khachhang.isshowvat, // Set isshowvat from khachhang
          sanpham: {
            create: dto?.sanpham?.map((sp) => ({
              idSP: sp.idSP || sp.id,
              giaban: parseFloat((sp.giaban || 0).toString()),
              ghichu: sp.ghichu,
              sldat: parseFloat((sp.sldat ?? 0).toString()),
              slgiao: parseFloat((sp.slgiao ?? 0).toString()),
              slnhan: parseFloat((sp.slnhan ?? 0).toString()),
              slhuy: parseFloat((sp.slhuy ?? 0).toString()),
              ttdat: parseFloat((sp.ttdat ?? 0).toString()),
              ttgiao: parseFloat((sp.ttgiao ?? 0).toString()),
              ttnhan: parseFloat((sp.ttnhan ?? 0).toString()),
              vat: parseFloat((sp.vat ?? 0).toString()),
              ttsauvat: parseFloat((sp.ttsauvat ?? 0).toString()),
              order: sp.order || 1,
              isActive: sp.isActive !== undefined ? sp.isActive : true,
            })) || [],
          },
        },
        include: {
          sanpham: true,
        },
      });

      // Calculate totals using new formula and helper method
      const vatRate = parseFloat((dto.vat || 0.05).toString());
      const { tongvat, tongtien } = this.calculateDonhangTotals(dto.sanpham || [], vatRate);

      // Update donhang with calculated totals
      await prisma.donhang.update({
        where: { id: newDonhang.id },
        data: {
          tongvat: tongvat,
          tongtien: tongtien,
        },
      });

      for (const sp of dto.sanpham) {
        const incrementValue = parseFloat((sp.sldat ?? 0).toFixed(3));
        await prisma.tonKho.upsert({
          where: { sanphamId: sp.id },
          update: {
            slchogiao: { increment: incrementValue },
          },
          create: {
            sanphamId: sp.id,
            slchogiao: incrementValue,
          },
        });
      }
      return newDonhang;
    });
  }

  async update(id: string, data: any) {
    return this.prisma.$transaction(async (prisma) => {
      // 1. Lấy đơn hàng cũ kèm chi tiết sản phẩm
      const oldDonhang = await prisma.donhang.findUnique({
        where: { id },
        include: { sanpham: true },
      });
      if (!oldDonhang) {
        throw new NotFoundException('Đơn hàng không tồn tại');
      }

      // 2. Rollback từ 'dagiao' về 'dadat'
      if (oldDonhang.status === 'dagiao' && data.status === 'dadat') {
        // Rollback tồn kho
        for (const sp of oldDonhang.sanpham) {
          const incValue = parseFloat((sp.slgiao ?? 0).toFixed(3));
          await prisma.tonKho.update({
            where: { sanphamId: sp.idSP },
            data: {
              slchogiao: { increment: incValue },
              slton: { increment: incValue },
            },
          });
        }
        // Xóa phiếu kho
        const maphieuOld = `PX-${oldDonhang.madonhang}`;
        const phieuKho = await prisma.phieuKho.findUnique({
          where: { maphieu: maphieuOld },
        });
        if (phieuKho) {
          await prisma.phieuKhoSanpham.deleteMany({
            where: { phieuKhoId: phieuKho.id },
          });
          await prisma.phieuKho.delete({
            where: { maphieu: maphieuOld },
          });
        }
        // Cập nhật đơn hàng
        const updatedOrder = await prisma.donhang.update({
          where: { id },
          data: {
            title: data.title,
            type: data.type,
            ngaygiao: new Date(data.ngaygiao),
            khachhangId: data.khachhangId,
            isActive: data.isActive,
            order: data.order,
            ghichu: data.ghichu,
            status: 'dadat',
            ...(data.sanpham && data.sanpham.length
              ? {
                  sanpham: {
                    updateMany: data.sanpham.map((sp: any) => ({
                      where: { idSP: sp.id },
                      data: {
                        ghichu: sp.ghichu,
                        slgiao: parseFloat((sp.slgiao ?? 0).toFixed(3)),
                      },
                    })),
                  },
                }
              : {}),
          },
        });
        // Cập nhật tồn kho theo chênh lệch số lượng giao mới/cũ
        for (const sp of data.sanpham) {
          const newSlgiao = parseFloat((sp.slgiao ?? 0).toFixed(3));
          const oldItem = oldDonhang.sanpham.find((o: any) => o.idSP === sp.id);
          const oldSlgiao = oldItem
            ? parseFloat((oldItem.slgiao ?? 0).toFixed(3))
            : 0;
          const difference = newSlgiao - oldSlgiao;
          if (difference !== 0) {
            await prisma.tonKho.update({
              where: { sanphamId: sp.id },
              data: {
                slchogiao:
                  difference > 0
                    ? { decrement: difference }
                    : { increment: -difference },
                slton:
                  difference > 0
                    ? { decrement: difference }
                    : { increment: -difference },
              },
            });
          }
        }
        return updatedOrder;
      }

      // 3. Sửa đơn hàng ở trạng thái 'dadat'
      if (oldDonhang.status === 'dadat' && data.status === 'dadat') {
        // Cập nhật tồn kho cho các sản phẩm có trong cả đơn hàng cũ và mới
        for (const sp of data.sanpham) {
          const newSldat = parseFloat((sp.sldat ?? 0).toFixed(3));
          const oldItem = oldDonhang.sanpham.find((o: any) => o.idSP === sp.id);
          if (oldItem) {
            const oldSldat = parseFloat((oldItem.sldat ?? 0).toFixed(3));
            const difference = newSldat - oldSldat;
            if (difference !== 0) {
              await prisma.tonKho.update({
                where: { sanphamId: sp.id },
                data: {
                  slchogiao:
                    difference > 0
                      ? { increment: difference }
                      : { decrement: Math.abs(difference) },
                },
              });
            }
          } else {
            await prisma.tonKho.update({
              where: { sanphamId: sp.id },
              data: {
                slchogiao: { increment: newSldat },
              },
            });
          }
        }
        // Xử lý các sản phẩm đã có trong đơn hàng cũ nhưng bị loại bỏ trong đơn hàng mới
        for (const oldItem of oldDonhang.sanpham) {
          const exists = data.sanpham.find((sp: any) => sp.id === oldItem.idSP);
          if (!exists) {
            const oldSldat = parseFloat((oldItem.sldat ?? 0).toFixed(3));
            await prisma.tonKho.update({
              where: { sanphamId: oldItem.idSP },
              data: {
                slchogiao: { decrement: oldSldat },
              },
            });
          }
        }
        return prisma.donhang.update({
          where: { id },
          data: {
            title: data.title,
            type: data.type,
            ngaygiao: new Date(data.ngaygiao),
            khachhangId: data.khachhangId,
            isActive: data.isActive,
            order: data.order,
            ghichu: data.ghichu,
            ...(data.sanpham && data.sanpham.length
              ? {
                  sanpham: {
                    deleteMany: {},
                    createMany: {
                      data: data.sanpham.map((sp: any) => ({
                        idSP: sp.id,
                        ghichu: sp.ghichu,
                        sldat: parseFloat((sp.sldat ?? 0).toFixed(3)),
                        slgiao: parseFloat((sp.slgiao ?? 0).toFixed(3)),
                        slnhan: parseFloat((sp.slnhan ?? 0).toFixed(3)),
                        ttgiao: parseFloat((sp.ttgiao ?? 0).toFixed(3)),
                      })),
                    },
                  },
                }
              : {}),
          },
        });
      }

      // 4. Chuyển sang 'dagiao'
      if (oldDonhang.status === 'dadat' && data.status === 'dagiao') {
        for (const sp of data.sanpham) {
          const decValue = parseFloat((sp.slgiao ?? 0).toFixed(3));
          await this.updateTonKhoSafe(prisma, sp.id, {
            slchogiao: { decrement: decValue },
            slton: { decrement: decValue },
          });
        }
        const maphieuNew = `PX-${data.madonhang}`;
        const phieuPayload = {
          ngay: new Date(data.ngaygiao),
          type: 'xuat',
          khoId: DEFAUL_KHO_ID,
          ghichu: data.ghichu,
          isActive: data.isActive ?? true,
          sanpham: {
            create: data.sanpham.map((sp: any) => ({
              sanphamId: sp.id,
              soluong: parseFloat((sp.slgiao ?? 0).toFixed(3)),
              ghichu: sp.ghichu,
            })),
          },
        };

        // Handle phieuKho upsert manually to avoid unique constraint violation
        const existingPhieu = await prisma.phieuKho.findUnique({
          where: { maphieu: maphieuNew },
          include: { sanpham: true },
        });

        if (existingPhieu) {
          // Delete existing sanpham records first
          await prisma.phieuKhoSanpham.deleteMany({
            where: { phieuKhoId: existingPhieu.id },
          });

          // Update the phieuKho and create new sanpham records
          await prisma.phieuKho.update({
            where: { maphieu: maphieuNew },
            data: {
              ngay: phieuPayload.ngay,
              type: phieuPayload.type,
              khoId: phieuPayload.khoId,
              ghichu: phieuPayload.ghichu,
              isActive: phieuPayload.isActive,
              sanpham: {
                create: data.sanpham.map((sp: any) => ({
                  sanphamId: sp.id,
                  soluong: parseFloat((sp.slgiao ?? 0).toFixed(3)),
                  ghichu: sp.ghichu,
                })),
              },
            },
          });
        } else {
          // Create new phieuKho with sanpham
          const uniqueSanpham = data.sanpham.reduce((acc: any[], sp: any) => {
            const existing = acc.find((item) => item.sanphamId === sp.id);
            if (existing) {
              existing.soluong += parseFloat((sp.slgiao ?? 0).toFixed(3));
            } else {
              acc.push({
                sanphamId: sp.id,
                soluong: parseFloat((sp.slgiao ?? 0).toFixed(3)),
                ghichu: sp.ghichu,
              });
            }
            return acc;
          }, []);

          await prisma.phieuKho.create({
            data: {
              maphieu: maphieuNew,
              ngay: phieuPayload.ngay,
              type: phieuPayload.type,
              khoId: phieuPayload.khoId,
              ghichu: phieuPayload.ghichu,
              isActive: phieuPayload.isActive,
              sanpham: {
                create: uniqueSanpham,
              },
            },
          });
        }

        return prisma.donhang.update({
          where: { id },
          data: {
            status: 'dagiao',
            sanpham: {
              updateMany: data.sanpham.map((sp: any) => ({
                where: { idSP: sp.id },
                data: {
                  ghichu: sp.ghichu,
                  sldat: parseFloat((sp.sldat ?? 0).toFixed(3)),
                  slgiao: parseFloat((sp.slgiao ?? 0).toFixed(3)),
                  slnhan: parseFloat((sp.slnhan ?? 0).toFixed(3)),
                },
              })),
            },
          },
        });
      }

      // 5. Chuyển sang 'danhan'
      if (oldDonhang.status === 'dagiao' && data.status === 'danhan') {
        const shortageItems: {
          sanphamId: string;
          soluong: number;
          ghichu?: string;
        }[] = [];
        
        for (const item of data.sanpham) {
          const receivedQty = parseFloat((item.slnhan ?? 0).toFixed(3));
          const shippedQty = parseFloat((item.slgiao ?? 0).toFixed(3));
          
          if (receivedQty < shippedQty) {
            // Xử lý hao hụt: hoàn lại tồn kho cho phần thiếu
            const shortage = shippedQty - receivedQty;
            await prisma.tonKho.update({
              where: { sanphamId: item.id },
              data: { slton: { increment: shortage } }, // Hoàn lại số lượng thiếu vào tồn kho
            });
            
            shortageItems.push({
              sanphamId: item.id,
              soluong: shortage,
              ghichu: item.ghichu
                ? `${item.ghichu}; thiếu ${shortage.toFixed(3)}`
                : `Thiếu ${shortage.toFixed(3)}`,
            });
          }
          // Không cần làm gì thêm nếu slnhan === slgiao vì tồn kho đã được giảm ở bước DAGIAO
        }
        if (shortageItems.length > 0) {
          const maphieuNhap = `PN-${data.madonhang}-RET-${this.formatDateForFilename()}`;
          const phieuKhoData = {
            maphieu: maphieuNhap,
            ngay: new Date(data.ngaygiao),
            type: 'nhap',
            khoId: DEFAUL_KHO_ID,
            ghichu: 'Phiếu nhập hàng trả về do thiếu hàng khi nhận',
            isActive: data.isActive ?? true,
            sanpham: {
              create: shortageItems.map((item) => ({
                sanphamId: item.sanphamId,
                soluong: item.soluong,
                ghichu: item.ghichu,
              })),
            },
          };
          await prisma.phieuKho.create({ data: phieuKhoData });
        }
        return prisma.donhang.update({
          where: { id },
          data: {
            status: 'danhan',
            sanpham: {
              updateMany: data.sanpham.map((item: any) => {
                const delivered = parseFloat((item.slgiao ?? 0).toFixed(3));
                const received = parseFloat((item.slnhan ?? 0).toFixed(3));
                const shortageNote =
                  received < delivered
                    ? item.ghichu
                      ? `${item.ghichu}; thiếu ${(delivered - received).toFixed(3)}`
                      : `Thiếu ${(delivered - received).toFixed(3)}`
                    : item.ghichu || '';
                return {
                  where: { idSP: item.id },
                  data: {
                    ghichu: shortageNote,
                    slnhan: received,
                  },
                };
              }),
            },
          },
        });
      }

      // 6. Chuyển sang 'hoanthanh'
      if (data.status === 'hoanthanh') {
        return prisma.donhang.update({
          where: { id },
          data: {
            status: 'hoanthanh',
          },
        });
      }

      // 7. Chuyển từ 'danhan' về 'dadat'
      if (oldDonhang.status === 'danhan' && data.status === 'dadat') {
        for (const sp of oldDonhang.sanpham) {
          const incValue = parseFloat((sp.slnhan ?? 0).toFixed(3));
          await prisma.tonKho.update({
            where: { sanphamId: sp.idSP },
            data: {
              slchogiao: { increment: incValue },
              slton: { increment: incValue },
            },
          });
        }
        const maphieuNhap = `PN-${oldDonhang.madonhang}-RET-${this.formatDateForFilename()}`;
        const phieuNhap = await prisma.phieuKho.findUnique({
          where: { maphieu: maphieuNhap },
        });
        if (phieuNhap) {
          await prisma.phieuKhoSanpham.deleteMany({
            where: { phieuKhoId: phieuNhap.id },
          });
          await prisma.phieuKho.delete({
            where: { maphieu: maphieuNhap },
          });
        }
        const updatedOrder = await prisma.donhang.update({
          where: { id },
          data: {
            title: data.title,
            type: data.type,
            ngaygiao: new Date(data.ngaygiao),
            khachhangId: data.khachhangId,
            isActive: data.isActive,
            order: data.order,
            ghichu: data.ghichu,
            status: 'dadat',
            ...(data.sanpham && data.sanpham.length
              ? {
                  sanpham: {
                    updateMany: data.sanpham.map((sp: any) => ({
                      where: { idSP: sp.id },
                      data: {
                        ghichu: sp.ghichu,
                        sldat: parseFloat((sp.sldat ?? 0).toFixed(3)),
                        slgiao: parseFloat((sp.slgiao ?? 0).toFixed(3)),
                        slnhan: parseFloat((sp.slnhan ?? 0).toFixed(3)),
                        ttgiao: parseFloat((sp.ttgiao ?? 0).toFixed(3)),
                        ttnhan: parseFloat((sp.ttnhan ?? 0).toFixed(3)),
                      },
                    })),
                  },
                }
              : {}),
          },
        });
        return updatedOrder;
      }

      // 8. Chuyển trực tiếp từ 'dadat' sang 'danhan'
      if (oldDonhang.status === 'dadat' && data.status === 'danhan') {
        for (const sp of data.sanpham) {
          const decValue = parseFloat((sp.slgiao ?? 0).toFixed(3));
          await prisma.tonKho.update({
            where: { sanphamId: sp.id },
            data: {
              slchogiao: { decrement: decValue },
              slton: { decrement: decValue },
            },
          });
        }
        const maphieuNew = `PX-${data.madonhang}-${this.formatDateForFilename()}`;
        const phieuPayload = {
          ngay: new Date(data.ngaygiao),
          type: 'xuat',
          khoId: DEFAUL_KHO_ID,
          ghichu: data.ghichu,
          isActive: data.isActive ?? true,
          sanpham: {
            create: data.sanpham.map((sp: any) => ({
              sanphamId: sp.id,
              soluong: parseFloat((sp.slgiao ?? 0).toFixed(3)),
              ghichu: sp.ghichu,
            })),
          },
        };

        // Handle phieuKho upsert manually to avoid unique constraint violation
        const existingPhieu = await prisma.phieuKho.findUnique({
          where: { maphieu: maphieuNew },
          include: { sanpham: true },
        });

        if (existingPhieu) {
          // Delete existing sanpham records first
          await prisma.phieuKhoSanpham.deleteMany({
            where: { phieuKhoId: existingPhieu.id },
          });

          // Update the phieuKho and create new sanpham records
          await prisma.phieuKho.update({
            where: { maphieu: maphieuNew },
            data: {
              ngay: phieuPayload.ngay,
              type: phieuPayload.type,
              khoId: phieuPayload.khoId,
              ghichu: phieuPayload.ghichu,
              isActive: phieuPayload.isActive,
              sanpham: {
                create: data.sanpham.map((sp: any) => ({
                  sanphamId: sp.id,
                  soluong: parseFloat((sp.slgiao ?? 0).toFixed(3)),
                  ghichu: sp.ghichu,
                })),
              },
            },
          });
        } else {
          // Create new phieuKho with sanpham
          await prisma.phieuKho.create({
            data: {
              maphieu: maphieuNew,
              ngay: phieuPayload.ngay,
              type: phieuPayload.type,
              khoId: phieuPayload.khoId,
              ghichu: phieuPayload.ghichu,
              isActive: phieuPayload.isActive,
              sanpham: {
                create: data.sanpham.map((sp: any) => ({
                  sanphamId: sp.id,
                  soluong: parseFloat((sp.slgiao ?? 0).toFixed(3)),
                  ghichu: sp.ghichu,
                })),
              },
            },
          });
        }

        // Xử lý nhận hàng
        const shortageItems: {
          sanphamId: string;
          soluong: number;
          ghichu?: string;
        }[] = [];
        for (const item of data.sanpham) {
          const receivedQty = parseFloat((item.slnhan ?? 0).toFixed(3));
          const shippedQty = parseFloat((item.slgiao ?? 0).toFixed(3));
          if (receivedQty < shippedQty) {
            const shortage = shippedQty - receivedQty;
            await prisma.tonKho.update({
              where: { sanphamId: item.id },
              data: { slton: { increment: shortage } },
            });
            shortageItems.push({
              sanphamId: item.id,
              soluong: shortage,
              ghichu: item.ghichu
                ? `${item.ghichu}; thiếu ${shortage.toFixed(3)}`
                : `Thiếu ${shortage.toFixed(3)}`,
            });
          }
        }
        if (shortageItems.length > 0) {
          const maphieuNhap = `PN-${data.madonhang}-RET-${this.formatDateForFilename()}`;
          const phieuKhoData = {
            maphieu: maphieuNhap,
            ngay: new Date(data.ngaygiao),
            type: 'nhap',
            khoId: DEFAUL_KHO_ID,
            ghichu: 'Phiếu nhập hàng trả về do thiếu hàng khi nhận',
            isActive: data.isActive ?? true,
            sanpham: {
              create: shortageItems.map((item) => ({
                sanphamId: item.sanphamId,
                soluong: item.soluong,
                ghichu: item.ghichu,
              })),
            },
          };
          await prisma.phieuKho.create({ data: phieuKhoData });
        }
        return prisma.donhang.update({
          where: { id },
          data: {
            status: 'danhan',
            sanpham: {
              updateMany: data.sanpham.map((item: any) => {
                const delivered = parseFloat((item.slgiao ?? 0).toFixed(3));
                const received = parseFloat((item.slnhan ?? 0).toFixed(3));
                const shortageNote =
                  received < delivered
                    ? item.ghichu
                      ? `${item.ghichu}; thiếu ${(delivered - received).toFixed(3)}`
                      : `Thiếu ${(delivered - received).toFixed(3)}`
                    : item.ghichu || '';
                return {
                  where: { idSP: item.id },
                  data: {
                    ghichu: shortageNote,
                    slgiao: delivered,
                    slnhan: received,
                  },
                };
              }),
            },
          },
        });
      }

      // 9. Nếu trạng thái không thuộc các trường hợp trên, chỉ cập nhật thông tin cơ bản
      const updatedDonhang = await prisma.donhang.update({
        where: { id },
        data: {
          title: data.title,
          type: data.type,
          ngaygiao: new Date(data.ngaygiao),
          khachhangId: data.khachhangId,
          banggiaId: data.banggiaId,
          vat: data.vat ? parseFloat(data.vat.toString()) : undefined,
          isActive: data.isActive,
          order: data.order,
          ghichu: data.ghichu,
          status: data.status,
        },
        include: {
          sanpham: true,
        },
      });

      // Recalculate totals if sanpham data is provided or VAT rate changed
      if (data.sanpham || data.vat) {
        const sanphamForCalculation = data.sanpham || updatedDonhang.sanpham.map(sp => ({
          giaban: sp.giaban,
          slnhan: sp.slnhan
        }));
        
        const vatRate = data.vat ? parseFloat(data.vat.toString()) : parseFloat(updatedDonhang.vat.toString());
        const { tongvat, tongtien } = this.calculateDonhangTotals(sanphamForCalculation, vatRate);

        await prisma.donhang.update({
          where: { id },
          data: {
            tongvat,
            tongtien,
          },
        });
      }

      return updatedDonhang;
    });
  }

  async danhan(id: string, data: any) {
    return this.prisma.$transaction(async (prisma) => {
      // 1. Lấy đơn hàng cũ kèm chi tiết sản phẩm
      const oldDonhang = await prisma.donhang.findUnique({
        where: { id },
        include: { sanpham: true },
      });
      if (!oldDonhang) {
        throw new NotFoundException('Đơn hàng không tồn tại');
      }

      // 2. Rollback từ 'dagiao' về 'dadat' và cập nhật lại chi tiết đơn hàng (donhangsanpham)
      if (oldDonhang.status === 'dagiao' && data.status === 'dadat') {
        // 2.1. Rollback tồn kho: tăng lại slchogiao và slton theo slgiao cũ
        for (const sp of oldDonhang.sanpham) {
          const incValue = parseFloat((sp.slgiao ?? 0).toFixed(3));
          await prisma.tonKho.update({
            where: { sanphamId: sp.idSP },
            data: {
              slchogiao: { increment: incValue },
              slton: { increment: incValue },
            },
          });
        }

        // 2.2. Xóa phiếu kho dựa theo madonhang cũ
        const maphieuOld = `PX-${oldDonhang.madonhang}`;
        const phieuKho = await prisma.phieuKho.findUnique({
          where: { maphieu: maphieuOld },
        });
        if (!phieuKho) {
          throw new NotFoundException('Phiếu kho không tồn tại');
        }
        try {
          await prisma.phieuKhoSanpham.deleteMany({
            where: { phieuKhoId: phieuKho.id },
          });
          await prisma.phieuKho.delete({
            where: { maphieu: maphieuOld },
          });
        } catch (error) {
          throw error;
        }

        // 2.3. Cập nhật đơn hàng (update các thông tin đơn hàng và donhangsanpham)
        const updatedOrder = await prisma.donhang.update({
          where: { id },
          data: {
            title: data.title,
            type: data.type,
            ngaygiao: new Date(data.ngaygiao),
            khachhangId: data.khachhangId,
            isActive: data.isActive,
            order: data.order,
            ghichu: data.ghichu,
            status: 'dadat',
            ...(data.sanpham && data.sanpham.length
              ? {
                  sanpham: {
                    updateMany: data.sanpham.map((sp: any) => ({
                      where: { idSP: sp.id },
                      data: {
                        ghichu: sp.ghichu,
                        slgiao: parseFloat((sp.slgiao ?? 0).toFixed(3)),
                      },
                    })),
                  },
                }
              : {}),
          },
        });

        // 2.4. Cập nhật tồn kho theo chênh lệch giữa số lượng giao mới và cũ
        for (const sp of data.sanpham) {
          const newSlgiao = parseFloat((sp.slgiao ?? 0).toFixed(3));
          const oldItem = oldDonhang.sanpham.find((o: any) => o.idSP === sp.id);
          const oldSlgiao = oldItem
            ? parseFloat((oldItem.slgiao ?? 0).toFixed(3))
            : 0;
          const difference = newSlgiao - oldSlgiao;
          if (difference !== 0) {
            await prisma.tonKho.update({
              where: { sanphamId: sp.id },
              data: {
                slchogiao:
                  difference > 0
                    ? { decrement: difference }
                    : { increment: -difference },
                slton:
                  difference > 0
                    ? { decrement: difference }
                    : { increment: -difference },
              },
            });
          }
        }

        return updatedOrder;
      }

      // Thêm trường hợp sửa đơn hàng ở trạng thái 'dadat'
      if (oldDonhang.status === 'dadat' && data.status === 'dadat') {
        // Cập nhật tồn kho cho các sản phẩm có trong cả đơn hàng cũ và mới
        for (const sp of data.sanpham) {
          const newSldat = parseFloat((sp.sldat ?? 0).toFixed(3));
          const oldItem = oldDonhang.sanpham.find((o: any) => o.idSP === sp.id);
          if (oldItem) {
            const oldSldat = parseFloat((oldItem.sldat ?? 0).toFixed(3));
            const difference = newSldat - oldSldat;
            if (difference !== 0) {
              await prisma.tonKho.update({
                where: { sanphamId: sp.id },
                data: {
                  slchogiao:
                    difference > 0
                      ? { increment: difference }
                      : { decrement: Math.abs(difference) },
                },
              });
            }
          } else {
            // Nếu sp mới được thêm vào: tăng slchogiao bằng sldat mới
            await prisma.tonKho.update({
              where: { sanphamId: sp.id },
              data: {
                slchogiao: { increment: newSldat },
              },
            });
          }
        }

        // Xử lý các sản phẩm đã có trong đơn hàng cũ nhưng bị loại bỏ trong đơn hàng mới
        for (const oldItem of oldDonhang.sanpham) {
          const exists = data.sanpham.find((sp: any) => sp.id === oldItem.idSP);
          if (!exists) {
            const oldSldat = parseFloat((oldItem.sldat ?? 0).toFixed(3));
            await prisma.tonKho.update({
              where: { sanphamId: oldItem.idSP },
              data: {
                slchogiao: { decrement: oldSldat },
              },
            });
          }
        }

        return prisma.donhang.update({
          where: { id },
          data: {
            title: data.title,
            type: data.type,
            ngaygiao: new Date(data.ngaygiao),
            khachhangId: data.khachhangId,
            isActive: data.isActive,
            order: data.order,
            ghichu: data.ghichu,
            ...(data.sanpham && data.sanpham.length
              ? {
                  sanpham: {
                    deleteMany: {},
                    createMany: {
                      data: data.sanpham.map((sp: any) => ({
                        idSP: sp.id,
                        ghichu: sp.ghichu,
                        slgiao: parseFloat((sp.slgiao ?? 0).toFixed(3)),
                        slnhan: parseFloat((sp.slnhan ?? 0).toFixed(3)),
                        ttgiao: parseFloat((sp.ttgiao ?? 0).toFixed(3)),
                      })),
                    },
                  },
                }
              : {}),
          },
        });
      } // 3. Chuyển sang 'dagiao' (xuất kho) và cập nhật lại chi tiết đơn hàng
      if (data.status === 'dagiao') {
        // 3.1. Giảm tồn kho
        for (const sp of data.sanpham) {
          const decValue = parseFloat((sp.slgiao ?? 0).toFixed(3));
          await prisma.tonKho.update({
            where: { sanphamId: sp.id },
            data: {
              slchogiao: { decrement: decValue },
              slton: { decrement: decValue },
            },
          });
        }
        // 3.2. Chuẩn bị payload cho phiếu kho và upsert
        const maphieuNew = `PX-${data.madonhang}`;
        const phieuPayload = {
          ngay: new Date(data.ngaygiao),
          type: 'xuat',
          khoId: DEFAUL_KHO_ID,
          ghichu: data.ghichu,
          isActive: data.isActive ?? true,
          sanpham: {
            create: data.sanpham.map((sp: any) => ({
              sanphamId: sp.id,
              soluong: parseFloat((sp.slgiao ?? 0).toFixed(3)),
              ghichu: sp.ghichu,
            })),
          },
        };

        // Handle phieuKho upsert manually to avoid unique constraint violation
        const existingPhieu = await prisma.phieuKho.findUnique({
          where: { maphieu: maphieuNew },
          include: { sanpham: true },
        });

        if (existingPhieu) {
          // Delete existing sanpham records first
          await prisma.phieuKhoSanpham.deleteMany({
            where: { phieuKhoId: existingPhieu.id },
          });

          // Update the phieuKho and create new sanpham records
          await prisma.phieuKho.update({
            where: { maphieu: maphieuNew },
            data: {
              ngay: phieuPayload.ngay,
              type: phieuPayload.type,
              khoId: phieuPayload.khoId,
              ghichu: phieuPayload.ghichu,
              isActive: phieuPayload.isActive,
              sanpham: {
                create: data.sanpham.map((sp: any) => ({
                  sanphamId: sp.id,
                  soluong: parseFloat((sp.slgiao ?? 0).toFixed(3)),
                  ghichu: sp.ghichu,
                })),
              },
            },
          });
        } else {
          // Create new phieuKho with sanpham
          await prisma.phieuKho.create({
            data: {
              maphieu: maphieuNew,
              ngay: phieuPayload.ngay,
              type: phieuPayload.type,
              khoId: phieuPayload.khoId,
              ghichu: phieuPayload.ghichu,
              isActive: phieuPayload.isActive,
              sanpham: {
                create: data.sanpham.map((sp: any) => ({
                  sanphamId: sp.id,
                  soluong: parseFloat((sp.slgiao ?? 0).toFixed(3)),
                  ghichu: sp.ghichu,
                })),
              },
            },
          });
        }

        // 3.3. Cập nhật trạng thái đơn hàng và cập nhật chi tiết donhangsanpham
        return prisma.donhang.update({
          where: { id },
          data: {
            status: 'dagiao',
            sanpham: {
              updateMany: data.sanpham.map((sp: any) => ({
                where: { idSP: sp.id },
                data: {
                  ghichu: sp.ghichu,
                  slgiao: parseFloat((sp.slgiao ?? 0).toFixed(3)),
                },
              })),
            },
          },
        });
      }

      // 4. Chuyển sang 'danhan' và cập nhật lại chi tiết đơn hàng
      if (data.status === 'danhan') {
        // Mảng lưu thông tin các sản phẩm có số lượng thiếu
        const shortageItems: {
          sanphamId: string;
          soluong: number;
          ghichu?: string;
        }[] = [];

        for (const item of data.sanpham) {
          const receivedQty = parseFloat((item.slnhan ?? 0).toFixed(3));
          const shippedQty = parseFloat((item.slgiao ?? 0).toFixed(3));
          if (receivedQty < shippedQty) {
            const shortage = shippedQty - receivedQty;
            // Cập nhật tồn kho: hoàn lại số lượng chưa nhận
            await prisma.tonKho.update({
              where: { sanphamId: item.idSP },
              data: { slton: { increment: shortage } },
            });
            // Thu thập thông tin sản phẩm thiếu
            shortageItems.push({
              sanphamId: item.id,
              soluong: shortage,
              ghichu: item.ghichu
                ? `${item.ghichu}; thiếu ${shortage.toFixed(3)}`
                : `Thiếu ${shortage.toFixed(3)}`,
            });
          } else if (receivedQty === shippedQty) {
            // Trường hợp nhận đủ số lượng: cập nhật tồn kho (mặc định không thay đổi giá trị)
            await prisma.tonKho.update({
              where: { sanphamId: item.idSP },
              data: { slton: { decrement: receivedQty } },
            });
          }
        }

        // Nếu có sản phẩm thiếu, phát sinh phiếu kho nhập hàng trả về
        if (shortageItems.length > 0) {
          const maphieuNhap = `PN-${data.madonhang}-RET-${this.formatDateForFilename()}`; // Tạo mã phiếu nhập phù hợp
          const phieuKhoData = {
            maphieu: maphieuNhap,
            ngay: new Date(data.ngaygiao), // Ngày nhập có thể sử dụng ngày giao hoặc hiện tại
            type: 'nhap', // Loại phiếu nhập
            khoId: DEFAUL_KHO_ID,
            ghichu: 'Phiếu nhập hàng trả về do thiếu hàng khi nhận',
            isActive: data.isActive ?? true,
            sanpham: {
              create: shortageItems.map((item) => ({
                sanphamId: item.sanphamId,
                soluong: item.soluong,
                ghichu: item.ghichu,
              })),
            },
          };

          await prisma.phieuKho.create({
            data: phieuKhoData,
          });
        }

        // Cập nhật trạng thái đơn hàng và thông tin từng sản phẩm
        return prisma.donhang.update({
          where: { id },
          data: {
            status: 'danhan',
            sanpham: {
              updateMany: data.sanpham.map((item: any) => {
                const delivered = parseFloat((item.slgiao ?? 0).toFixed(3));
                const received = parseFloat((item.slnhan ?? 0).toFixed(3));
                const shortageNote =
                  received < delivered
                    ? item.ghichu
                      ? `${item.ghichu}; thiếu ${(delivered - received).toFixed(3)}`
                      : `Thiếu ${(delivered - received).toFixed(3)}`
                    : item.ghichu || '';
                return {
                  where: { idSP: item.id },
                  data: {
                    ghichu: shortageNote,
                    slnhan: received,
                  },
                };
              }),
            },
          },
        });
      }
      if (data.status === 'hoanthanh') {
        return prisma.donhang.update({
          where: { id },
          data: {
            status: 'hoanthanh',
          },
        });
      }
      // Nếu không rơi vào các trường hợp trên, sử dụng logic cập nhật phiếu giao (updatePhieugiao)
      // return this.updatePhieugiao(id, data);
    });
  }
  async dagiao(id: string, data: any) {
    return this.prisma.$transaction(async (prisma) => {
      // 1. Lấy đơn hàng cũ kèm chi tiết sản phẩm
      const oldDonhang = await prisma.donhang.findUnique({
        where: { id },
        include: { sanpham: true },
      });
      if (!oldDonhang) {
        return {
          message: 'Đơn hàng không tồn tại',
          code: 'NOT_FOUND',
          result: null,
        };
      }

      // 3. Chuyển sang 'dagiao' (xuất kho) và cập nhật lại chi tiết đơn hàng
      if (data.status === 'dagiao') {
        // 3.1. Giảm tồn kho
        for (const sp of data.sanpham) {
          const decValue = parseFloat((sp.slgiao ?? 0).toFixed(3));
          await prisma.tonKho.update({
            where: { sanphamId: sp.id },
            data: {
              slchogiao: { decrement: decValue },
              slton: { decrement: decValue },
            },
          });
        }
        // 3.2. Chuẩn bị payload cho phiếu kho và upsert
        const maphieuNew = `PX-${data.madonhang}`;
        const phieuPayload = {
          ngay: new Date(data.ngaygiao),
          type: 'xuat',
          khoId: DEFAUL_KHO_ID,
          ghichu: data.ghichu,
          isActive: data.isActive ?? true,
          sanpham: {
            create: data.sanpham.map((sp: any) => ({
              sanphamId: sp.id,
              soluong: parseFloat((sp.slgiao ?? 0).toFixed(3)),
              ghichu: sp.ghichu,
            })),
          },
        };

        // Handle phieuKho upsert manually to avoid unique constraint violation
        const existingPhieu = await prisma.phieuKho.findUnique({
          where: { maphieu: maphieuNew },
          include: { sanpham: true },
        });

        if (existingPhieu) {
          // Delete existing sanpham records first
          await prisma.phieuKhoSanpham.deleteMany({
            where: { phieuKhoId: existingPhieu.id },
          });

          // Update the phieuKho and create new sanpham records
          await prisma.phieuKho.update({
            where: { maphieu: maphieuNew },
            data: {
              ngay: phieuPayload.ngay,
              type: phieuPayload.type,
              khoId: phieuPayload.khoId,
              ghichu: phieuPayload.ghichu,
              isActive: phieuPayload.isActive,
              sanpham: {
                create: data.sanpham.map((sp: any) => ({
                  sanphamId: sp.id,
                  soluong: parseFloat((sp.slgiao ?? 0).toFixed(3)),
                  ghichu: sp.ghichu,
                })),
              },
            },
          });
        } else {
          // Create new phieuKho with sanpham
          await prisma.phieuKho.create({
            data: {
              maphieu: maphieuNew,
              ngay: phieuPayload.ngay,
              type: phieuPayload.type,
              khoId: phieuPayload.khoId,
              ghichu: phieuPayload.ghichu,
              isActive: phieuPayload.isActive,
              sanpham: {
                create: data.sanpham.map((sp: any) => ({
                  sanphamId: sp.id,
                  soluong: parseFloat((sp.slgiao ?? 0).toFixed(3)),
                  ghichu: sp.ghichu,
                })),
              },
            },
          });
        }

        // 3.3. Cập nhật trạng thái đơn hàng và cập nhật chi tiết donhangsanpham
        const updatedOrder = await prisma.donhang.update({
          where: { id },
          data: {
            status: 'dagiao',
            sanpham: {
              updateMany: data.sanpham.map((sp: any) => ({
                where: { idSP: sp.id },
                data: {
                  ghichu: sp.ghichu,
                  slgiao: parseFloat((sp.slgiao ?? 0).toFixed(3)),
                },
              })),
            },
          },
        });
        return {
          message: 'Cập nhật trạng thái đơn hàng sang "Đã giao" thành công',
          code: 'SUCCESS',
          result: updatedOrder,
        };
      }
      return {
        message: 'Trạng thái không hợp lệ hoặc không thay đổi',
        code: 'INVALID_STATUS',
        result: null,
      };
    });
  }

  async updatePhieugiao(id: string, data: any) {
    try {
      // console.log(data);

      return await this.prisma.$transaction(async (prisma) => {
        const updatedDonhang = await prisma.donhang.update({
          where: { id },
          data: {
            title: data.title,
            type: data.type,
            madonhang: data.madonhang,
            ngaygiao: new Date(data.ngaygiao),
            khachhangId: data.khachhangId,
            isActive: data.isActive,
            status: data.status,
            order: data.order,
            ghichu: data.ghichu,
            printCount: data.printCount,
            isshowvat: data.isshowvat,
            sanpham: {
              deleteMany: {},
              create: data.sanpham.map((sp: any) => ({
                idSP: sp.id,
                ghichu: sp.ghichu,
                sldat: parseFloat((sp.sldat ?? 0).toFixed(3)),
                slgiao: parseFloat((sp.slgiao ?? 0).toFixed(3)),
                slnhan: parseFloat((sp.slnhan ?? 0).toFixed(3)),
                ttdat: parseFloat((sp.ttdat ?? 0).toFixed(3)),
                ttgiao: parseFloat((sp.ttgiao ?? 0).toFixed(3)),
                ttnhan: parseFloat((sp.ttnhan ?? 0).toFixed(3)),
                vat: parseFloat((sp.vat ?? 0).toFixed(3)),
                ttsauvat: parseFloat((sp.ttsauvat ?? 0).toFixed(3)),
              })),
            },
          },
          include: {
            sanpham: true,
          },
        });

        return updatedDonhang;
      });
    } catch (error) {
      console.error('Error updating phieugiao:', error);
      throw error;
    }
  }

  async updateBulk(ids: string[], status: string) {
    return this.prisma.$transaction(async (prisma) => {
      let success = 0;
      let fail = 0;

      for (const id of ids) {
        try {
          // 1. Lấy đơn hàng cũ kèm chi tiết sản phẩm
          const oldDonhang = await prisma.donhang.findUnique({
            where: { id },
            include: { sanpham: true },
          });

          if (!oldDonhang) {
            fail++;
            continue;
          }

          // 2. Chuyển từ 'dadat' sang 'danhan'
          if (oldDonhang.status === 'dadat' && status === 'danhan') {
            // Giảm tồn kho cho từng sản phẩm
            for (const sp of oldDonhang.sanpham) {
              const decValue = parseFloat((sp.sldat ?? 0).toFixed(3));
              await prisma.tonKho.update({
                where: { sanphamId: sp.idSP },
                data: {
                  slchogiao: { decrement: decValue },
                  slton: { decrement: decValue },
                },
              });
            }

            // Deduplicate products and aggregate quantities
            const uniqueSanpham = oldDonhang.sanpham.reduce(
              (acc: any[], sp: any) => {
                const existing = acc.find((item) => item.sanphamId === sp.idSP);
                if (existing) {
                  existing.soluong += parseFloat((sp.sldat ?? 0).toFixed(3));
                } else {
                  acc.push({
                    sanphamId: sp.idSP,
                    soluong: parseFloat((sp.sldat ?? 0).toFixed(3)),
                    ghichu: sp.ghichu,
                  });
                }
                return acc;
              },
              [],
            );

            // Tạo phiếu xuất kho
            const maphieuNew = `PX-${oldDonhang.madonhang}-${this.formatDateForFilename()}`;
            const phieuPayload = {
              ngay: oldDonhang.ngaygiao
                ? new Date(oldDonhang.ngaygiao)
                : new Date(),
              type: 'xuat',
              khoId: DEFAUL_KHO_ID,
              ghichu: oldDonhang.ghichu || 'Xuất kho hàng loạt',
              isActive: true,
            };

            // Handle phieuKho upsert manually to avoid unique constraint violation
            const existingPhieu = await prisma.phieuKho.findUnique({
              where: { maphieu: maphieuNew },
              include: { sanpham: true },
            });

            if (existingPhieu) {
              // Delete existing sanpham records first
              await prisma.phieuKhoSanpham.deleteMany({
                where: { phieuKhoId: existingPhieu.id },
              });

              // Update the phieuKho and create new sanpham records
              await prisma.phieuKho.update({
                where: { maphieu: maphieuNew },
                data: {
                  ngay: phieuPayload.ngay,
                  type: phieuPayload.type,
                  khoId: phieuPayload.khoId,
                  ghichu: phieuPayload.ghichu,
                  isActive: phieuPayload.isActive,
                  sanpham: {
                    create: uniqueSanpham,
                  },
                },
              });
            } else {
              // Create new phieuKho with sanpham
              await prisma.phieuKho.create({
                data: {
                  maphieu: maphieuNew,
                  ngay: phieuPayload.ngay,
                  type: phieuPayload.type,
                  khoId: phieuPayload.khoId,
                  ghichu: phieuPayload.ghichu,
                  isActive: phieuPayload.isActive,
                  sanpham: {
                    create: uniqueSanpham,
                  },
                },
              });
            }

            // Cập nhật trạng thái đơn hàng và số liệu
            await prisma.donhang.update({
              where: { id },
              data: {
                status: 'danhan',
                sanpham: {
                  updateMany: oldDonhang.sanpham.map((sp: any) => ({
                    where: { idSP: sp.idSP },
                    data: {
                      slgiao: parseFloat((sp.sldat ?? 0).toFixed(3)),
                      slnhan: parseFloat((sp.sldat ?? 0).toFixed(3)),
                    },
                  })),
                },
              },
            });

            success++;
          } else {
            fail++;
          }
        } catch (error) {
          console.error(`Error updating donhang ${id}:`, error);
          fail++;
        }
      }

      return { success, fail };
    });
  }

  async remove(id: string) {
    // return this.prisma.$transaction(async (prisma) => {
    //   // 1. Lấy đơn hàng bao gồm chi tiết sản phẩm
    //   const donhang = await prisma.donhang.findUnique({
    //     where: { id },
    //     include: { sanpham: true },
    //   });
    //   if (!donhang) {
    //     throw new NotFoundException('Đơn hàng không tồn tại');
    //   }
    //   // 2. Cập nhật TONKHO cho từng sản phẩm theo trạng thái đơn hàng
    //   for (const sp of donhang.sanpham) {
    //     const sldat = parseFloat((sp.sldat ?? 0).toFixed(3));
    //     if (donhang.status === 'dagiao' || donhang.status === 'danhan') {
    //       const slgiao = parseFloat((sp.slgiao ?? 0).toFixed(3));
    //       await prisma.tonKho.update({
    //         where: { sanphamId: sp.idSP },
    //         data: {
    //           // Loại bỏ số lượng đơn hàng đã thêm ban đầu
    //           slchogiao: { decrement: sldat },
    //           // Cộng lại số lượng đã giao đã trừ khi xuất kho
    //           slton: { increment: slgiao },
    //         },
    //       });
    //     } else {
    //       await prisma.tonKho.update({
    //         where: { sanphamId: sp.idSP },
    //         data: {
    //           slchogiao: { decrement: sldat },
    //         },
    //       });
    //     }
    //   }
    //   // 3. Xóa đơn hàng
    //   return prisma.donhang.delete({ where: { id } });
    // });
  }

  async removeBulk(ids: string[]) {
    return this.prisma.$transaction(async (prisma) => {
      let success = 0;
      let fail = 0;
      for (const id of ids) {
        try {
          // 1. Lấy đơn hàng bao gồm chi tiết sản phẩm
          const donhang = await prisma.donhang.findUnique({
            where: { id },
            include: { sanpham: true },
          });
          if (!donhang) {
            fail++;
            continue;
          }

          // 2. Cập nhật TONKHO cho từng sản phẩm theo trạng thái đơn hàng
          for (const sp of donhang.sanpham) {
            const sldat = parseFloat((sp.sldat ?? 0).toFixed(3));
            if (donhang.status === 'dagiao' || donhang.status === 'danhan') {
              const slgiao = parseFloat((sp.slgiao ?? 0).toFixed(3));
              await prisma.tonKho.update({
                where: { sanphamId: sp.idSP },
                data: {
                  slton: { increment: slgiao },
                },
              });
            } else {
              await prisma.tonKho.update({
                where: { sanphamId: sp.idSP },
                data: {
                  slchogiao: { decrement: sldat },
                },
              });
            }
          }

          // 3. Xóa phiếu kho liên quan nếu có
          const maphieuXuat = `PX-${donhang.madonhang}-${this.formatDateForFilename()}`;
          const maphieuNhap = `PN-${donhang.madonhang}-RET-${this.formatDateForFilename()}`;
          // Xóa phiếu xuất kho
          const phieuXuat = await prisma.phieuKho.findUnique({
            where: { maphieu: maphieuXuat },
          });
          if (phieuXuat) {
            await prisma.phieuKhoSanpham.deleteMany({
              where: { phieuKhoId: phieuXuat.id },
            });
            await prisma.phieuKho.delete({ where: { maphieu: maphieuXuat } });
          }
          // Xóa phiếu nhập kho trả về (nếu có)
          const phieuNhap = await prisma.phieuKho.findUnique({
            where: { maphieu: maphieuNhap },
          });
          if (phieuNhap) {
            await prisma.phieuKhoSanpham.deleteMany({
              where: { phieuKhoId: phieuNhap.id },
            });
            await prisma.phieuKho.delete({ where: { maphieu: maphieuNhap } });
          }

          // 4. Xóa đơn hàng
          await prisma.donhang.delete({ where: { id } });
          success++;
        } catch (error) {
          fail++;
        }
      }
      return { success, fail };
    });
  }

  async findByProductId(idSP: string) {
    const donhangs = await this.prisma.donhang.findMany({
      where: {
        sanpham: {
          some: { idSP },
        },
      },
      include: {
        sanpham: {
          where: { idSP },
          include: {
            sanpham: true,
          },
        },
        khachhang: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    // console.log(donhangs);

    return donhangs.map((donhang) => ({
      ...donhang,
      sanpham: donhang.sanpham.find((item: any) => item.idSP === idSP),
    }));
  }
}
