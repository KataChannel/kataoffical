import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import * as moment from 'moment-timezone';
import { PrismaService } from 'prisma/prisma.service';
import { StatusMachineService } from '../common/status-machine.service';
import { TonkhoManagerService } from '../common/tonkho-manager.service';
const DEFAUL_KHO_ID = '4cc01811-61f5-4bdc-83de-a493764e9258';
const DEFAUL_BANGGIA_ID = '84a62698-5784-4ac3-b506-5e662d1511cb';
@Injectable()
export class DonhangService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly statusMachine: StatusMachineService,
    private readonly tonkhoManager: TonkhoManagerService
  ) {}

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
        // const priceFromBanggia = khachhang?.banggia
        //   ? khachhang.banggia.sanpham.find((sp) => sp.sanphamId === item.idSP)
        //       ?.giaban
        //   : 0;
        // const giaban =
        //   priceFromBanggia !== 0 ? priceFromBanggia : item.sanpham.giaban;

        return {
          ...item.sanpham,
          idSP: item.idSP,
          giaban: item.giaban,
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
        id:v.id,
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
    const { Batdau, Ketthuc, query,ids } = params;
    
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
    if(ids.length>0){
      where.id = { in: ids };
    }
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
    
    const Sanphams = await this.prisma.sanpham.findMany();
    
    // Step 1: Flatten all order items với thông tin cơ bản
    const flatItems = donhangs.flatMap((v: any) => {
      return v.sanpham.map((v1: any) => {
        const product = Sanphams.find((sp: any) => sp.id === v1.idSP);
        const giaban = v1.giaban || 0;
        const vat: any = Number(product?.vat) || 0;
        const thanhtiensauvat = v1.slnhan * giaban * (1 + vat);
        
        // Chuẩn hóa ngày giao để đảm bảo grouping chính xác
        const normalizedDate = v.ngaygiao ? 
          moment(v.ngaygiao).utc().startOf('day').format('YYYY-MM-DD') : 
          'no-date';
        
        return {
          id: v.id,
          ngaygiao: v.ngaygiao,
          ngaygiaoNormalized: normalizedDate, // Thêm field để group chính xác
          tenkhachhang: v.khachhang?.name,
          makhachhang: v.khachhang?.makh,
          madonhang: v.madonhang,
          tenhang: product?.title || '',
          mahang: product?.masp || '',
          dvt: product?.dvt || '',
          soluong: v1.slnhan,
          dongia: giaban,
          thanhtientruocvat: v1.slnhan * giaban,
          vat: vat,
          dongiavathoadon: giaban * (1 + vat),
          thanhtiensauvat: thanhtiensauvat,
          ghichu: v1.ghichu,
        };
      });
    });

    // Step 2: Tính tongtiensauvat cho mỗi combination duy nhất (ngaygiao + khachhang)
    const combinationTotals = new Map();
    
    flatItems.forEach(item => {
      // Tạo key duy nhất cho combination (customer + date)
      const customerKey = item.makhachhang || 'unknown-customer';
      const dateKey = item.ngaygiaoNormalized;
      const combinationKey = `${customerKey}|${dateKey}`;
      
      if (!combinationTotals.has(combinationKey)) {
        combinationTotals.set(combinationKey, {
          tongtiensauvat: 0,
          itemCount: 0,
          customerInfo: {
            makhachhang: item.makhachhang,
            tenkhachhang: item.tenkhachhang
          },
          dateInfo: {
            ngaygiao: item.ngaygiao,
            ngaygiaoNormalized: item.ngaygiaoNormalized
          }
        });
      }
      
      const combination = combinationTotals.get(combinationKey);
      combination.tongtiensauvat += item.thanhtiensauvat;
      combination.itemCount += 1;
    });

    // Step 3: Apply tongtiensauvat cho từng item dựa trên combination
    const result = flatItems.map(item => {
      const customerKey = item.makhachhang || 'unknown-customer';
      const dateKey = item.ngaygiaoNormalized;
      const combinationKey = `${customerKey}|${dateKey}`;
      const combination = combinationTotals.get(combinationKey);
      
      return {
        ...item,
        tongtiensauvat: combination ? combination.tongtiensauvat : item.thanhtiensauvat,
        // Thêm debug info (có thể remove sau)
        _debug: {
          combinationKey: combinationKey,
          itemsInCombination: combination?.itemCount || 0
        }
      };
    });
    
    console.log('=== COMBINATION TOTALS DEBUG ===');
    combinationTotals.forEach((value, key) => {
      console.log(`${key}: ${value.tongtiensauvat} VND (${value.itemCount} items)`);
    });
    console.log('================================');
    console.log('result', result);
    
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
      { key: 'ghichu', header: 'Ghi Chú', width: 20 },
      { key: 'vat', header: 'VAT (%)', width: 10 },
      { key: 'dongiavathoadon', header: 'Đơn Giá VAT', width: 15 },
      { key: 'thanhtiensauvat', header: 'Thành Tiền Sau VAT', width: 20 },
      { key: 'tongtiensauvat', header: 'Tổng Tiền Sau Thuế', width: 20 },
      { key: 'tongcong', header: 'Tổng Cộng Khách Hàng', width: 25 }
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

    // Group data by customer and then by date
    const groupedData = this.groupDataByCustomerAndDate(data);
    
    let currentRow = 2;
    const mergeRanges: any[] = [];

    // Add data with customer and date grouping
    for (const customerData of groupedData) {
      const customerStartRow = currentRow;
      
      for (const dateGroup of customerData.dateGroups) {
        const dateStartRow = currentRow;
        
        // Group items by madonhang within this date group
        const orderGroups = new Map();
        dateGroup.items.forEach(item => {
          const orderKey = item.madonhang || 'unknown-order';
          if (!orderGroups.has(orderKey)) {
            orderGroups.set(orderKey, []);
          }
          orderGroups.get(orderKey).push(item);
        });
        
        // Process each order group
        for (const [orderKey, orderItems] of orderGroups) {
          const orderStartRow = currentRow;
          
          for (const item of orderItems) {
            const row = worksheet.getRow(currentRow);
            
            // Format date
            const ngaygiao = item.ngaygiao ? new Date(item.ngaygiao) : null;
            
            row.values = {
              ngaygiao: ngaygiao ? moment(ngaygiao).tz('Asia/Ho_Chi_Minh').format("DD/MM/YYYY") : '',
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
              tongtiensauvat: Number(item.tongtiensauvat) || 0,
              tongcong: Number(customerData.tongtiensauvat) || 0  // Tổng cộng của cả khách hàng
            };

            // Format number columns
            ['soluong', 'dongia', 'thanhtientruocvat', 'dongiavathoadon', 'thanhtiensauvat', 'tongtiensauvat', 'tongcong'].forEach(col => {
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
          
          const orderEndRow = currentRow - 1;
          
          // Create merge ranges for customer info by madonhang
          if (orderEndRow > orderStartRow) {
            const makhachhangColIndex = columns.findIndex(c => c.key === 'makhachhang') + 1;
            const tenkhachhangColIndex = columns.findIndex(c => c.key === 'tenkhachhang') + 1;
            const madonhangColIndex = columns.findIndex(c => c.key === 'madonhang') + 1;
            
            // Merge makhachhang theo madonhang
            mergeRanges.push({
              range: `${String.fromCharCode(64 + makhachhangColIndex)}${orderStartRow}:${String.fromCharCode(64 + makhachhangColIndex)}${orderEndRow}`,
              value: orderItems[0].makhachhang || ''
            });
            
            // Merge tenkhachhang theo madonhang
            mergeRanges.push({
              range: `${String.fromCharCode(64 + tenkhachhangColIndex)}${orderStartRow}:${String.fromCharCode(64 + tenkhachhangColIndex)}${orderEndRow}`,
              value: orderItems[0].tenkhachhang || ''
            });
            
            // Merge madonhang theo madonhang (giống logic trước đó)
            mergeRanges.push({
              range: `${String.fromCharCode(64 + madonhangColIndex)}${orderStartRow}:${String.fromCharCode(64 + madonhangColIndex)}${orderEndRow}`,
              value: orderItems[0].madonhang || ''
            });
          }
        }

        const dateEndRow = currentRow - 1;
        
        // Skip daily summary row - removed as requested
        
        // Create merge ranges for date grouping (merge ngaygiao column for same date)
        if (dateEndRow > dateStartRow) {
          const ngaygiaoColIndex = columns.findIndex(c => c.key === 'ngaygiao') + 1;
          mergeRanges.push({
            range: `${String.fromCharCode(64 + ngaygiaoColIndex)}${dateStartRow}:${String.fromCharCode(64 + ngaygiaoColIndex)}${dateEndRow}`,
            value: dateGroup.items[0].ngaygiao ? moment(dateGroup.items[0].ngaygiao).tz('Asia/Ho_Chi_Minh').format("DD/MM/YYYY") : ''
          });
          
          // THÊM: Merge tongtiensauvat cho cùng ngày giao của cùng khách hàng
          const tongtiensauvatColIndex = columns.findIndex(c => c.key === 'tongtiensauvat') + 1;
          mergeRanges.push({
            range: `${String.fromCharCode(64 + tongtiensauvatColIndex)}${dateStartRow}:${String.fromCharCode(64 + tongtiensauvatColIndex)}${dateEndRow}`,
            value: dateGroup.items[0].tongtiensauvat
          });
        }
      }

      const customerEndRow = currentRow - 1;
      
      // THÊM: Merge tongcong cho toàn bộ khách hàng
      if (customerEndRow > customerStartRow) {
        const tongcongColIndex = columns.findIndex(c => c.key === 'tongcong') + 1;
        mergeRanges.push({
          range: `${String.fromCharCode(64 + tongcongColIndex)}${customerStartRow}:${String.fromCharCode(64 + tongcongColIndex)}${customerEndRow}`,
          value: customerData.tongtiensauvat  // Tổng cộng của cả khách hàng
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
   * Group data by customer and then by date (updated with normalized date keys)
   */
  private groupDataByCustomerAndDate(data: any[]): any[] {
    const customerMap = new Map();
    
    data.forEach(item => {
      const customerKey = item.makhachhang || 'unknown-customer';
      
      if (!customerMap.has(customerKey)) {
        customerMap.set(customerKey, {
          makhachhang: item.makhachhang,
          tenkhachhang: item.tenkhachhang,
          tongtiensauvat: 0, // Sẽ được tính lại dựa trên từng date group
          items: [],
          dateGroups: []
        });
      }
      
      const customer = customerMap.get(customerKey);
      customer.items.push(item);
      // KHÔNG tính tổng ở đây, sẽ tính từ date groups
    });
    
    // Group items by normalized date within each customer
    customerMap.forEach(customer => {
      const dateMap = new Map();
      
      customer.items.forEach(item => {
        // Sử dụng normalized date key giống như logic chính
        const dateKey = item.ngaygiaoNormalized || 'no-date';
        
        if (!dateMap.has(dateKey)) {
          dateMap.set(dateKey, {
            date: item.ngaygiao,
            dateKey: dateKey,
            items: [],
            tongtiensauvat: 0,
            combinationKey: `${customer.makhachhang}|${dateKey}`
          });
        }
        
        const dateGroup = dateMap.get(dateKey);
        dateGroup.items.push(item);
        // Sử dụng tongtiensauvat đã được tính trong main logic
        // Chỉ cần lấy từ item đầu tiên vì tất cả items trong cùng combination có cùng giá trị
        if (dateGroup.items.length === 1) {
          dateGroup.tongtiensauvat = Number(item.tongtiensauvat) || 0;
        }
      });
      
      // Sort date groups by date
      customer.dateGroups = Array.from(dateMap.values()).sort((a, b) => {
        if (!a.date && !b.date) return 0;
        if (!a.date) return 1;
        if (!b.date) return -1;
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
      
      // Tính tổng customer.tongtiensauvat từ các date groups (chỉ để hiển thị tổng cho customer)
      customer.tongtiensauvat = customer.dateGroups.reduce((sum, dateGroup) => {
        return sum + dateGroup.tongtiensauvat;
      }, 0);
    });
    
    // Sort customers by name
    return Array.from(customerMap.values()).sort((a, b) => 
      (a.tenkhachhang || '').localeCompare(b.tenkhachhang || '')
    );
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

              // Lấy bảng giá mặc định để fallback
              const banggiaDefault = await prisma.banggia.findUnique({
                where: { id: DEFAUL_BANGGIA_ID },
                include: {
                  sanpham: {
                    include: {
                      sanpham: true
                    }
                  },
                },
              });

              console.log(`Cập nhật giá cho đơn hàng ${donhang.madonhang} từ bảng giá ${donhang.banggia.mabanggia}`);

              let tongchua = 0; // Tổng tiền chưa VAT
              let hasUpdates = false;

              // 3. Cập nhật giá cho từng sản phẩm trong đơn hàng với logic ưu tiên
              for (const donhangSanpham of donhang.sanpham) {
                // Tìm giá từ bảng giá chỉ định (ưu tiên 1)
                const giaSanpham = donhang.banggia.sanpham.find(
                  (bgsp) => bgsp.sanphamId === donhangSanpham.idSP,
                );

                // Tìm giá từ bảng giá mặc định (ưu tiên 2)
                const giaSanphamDefault = banggiaDefault?.sanpham.find(
                  (bgsp) => bgsp.sanphamId === donhangSanpham.idSP,
                );

                let giaban = 0;
                let giaSource = 'none';

                // Logic ưu tiên lấy giá
                if (giaSanpham) {
                  const giabanFromBanggia = Number(giaSanpham.giaban);
                  if (giabanFromBanggia > 0) {
                    // Ưu tiên 1: Có giá từ bảng giá chỉ định và > 0
                    giaban = giabanFromBanggia;
                    giaSource = `bảng giá ${donhang.banggia.mabanggia}`;
                  } else if (giaSanphamDefault && Number(giaSanphamDefault.giaban) > 0) {
                    // Ưu tiên 2: Giá bảng giá chỉ định = 0, lấy từ bảng giá mặc định
                    giaban = Number(giaSanphamDefault.giaban);
                    giaSource = 'bảng giá mặc định (fallback do giá = 0)';
                  } else {
                    // Ưu tiên 3: Cả 2 đều = 0 hoặc không có, trả về 0
                    giaban = 0;
                    giaSource = 'không tìm thấy giá hợp lệ (trả về 0)';
                  }
                } else if (giaSanphamDefault && Number(giaSanphamDefault.giaban) > 0) {
                  // Ưu tiên 2: Không có trong bảng giá chỉ định, lấy từ bảng giá mặc định
                  giaban = Number(giaSanphamDefault.giaban);
                  giaSource = 'bảng giá mặc định (không có trong bảng giá chỉ định)';
                } else {
                  // Ưu tiên 3: Không tìm thấy ở đâu, trả về 0
                  giaban = 0;
                  giaSource = 'không tìm thấy trong cả 2 bảng giá (trả về 0)';
                }

                if (giaban > 0) {
                  const sldat = Number(donhangSanpham.sldat) || 0;
                  const slgiao = Number(donhangSanpham.slgiao) || 0;
                  const slnhan = Number(donhangSanpham.slnhan) || 0;
                  const vat = Number(donhangSanpham.vat) || 0;

                  // 4. Cập nhật giá và tính toán lại các giá trị
                  const ttdat = giaban * sldat;
                  const ttgiao = giaban * slgiao;
                  const ttnhan = giaban * slnhan;
                  const ttsauvat = ttnhan * (1 + vat);

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

                  console.log(`✅ Cập nhật sản phẩm ${donhangSanpham.sanpham?.title} - Giá: ${giaban} (từ ${giaSource})`);
                } else {
                  console.warn(`⚠️ Sản phẩm ${donhangSanpham.sanpham?.title} - ${giaSource}, giữ nguyên giá cũ`);
                }
              }

              // 5. Tính lại tổng tiền cho đơn hàng
              if (hasUpdates) {
                const vatRate = Number(donhang.vat) || 0;
                const tongvat = tongchua * (vatRate);
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
        khachhang: true,
        // khachhang: { include: { banggia: { include: { sanpham: true } } } },
        banggia: {select: {id:true,title:true,mabanggia:true}},
      },
    });
    if (!result) {
      throw new NotFoundException('DonHang not found');
    }

    return {
      ...result,
      sanpham: result.sanpham.map((item: any) => {
        return {
          ...item.sanpham,
          idSP: item.idSP,
          giaban: item.giaban,
          sldat: parseFloat((item.sldat ?? 0).toFixed(3)),
          slgiao: parseFloat((item.slgiao ?? 0).toFixed(3)),
          slnhan: parseFloat((item.slnhan ?? 0).toFixed(3)),
          ttdat: parseFloat((item.ttdat ?? 0).toFixed(3)),
          ttgiao: parseFloat((item.ttgiao ?? 0).toFixed(3)),
          ttnhan: parseFloat((item.ttnhan ?? 0).toFixed(3)),
          vat: parseFloat((item.vat ?? 0).toFixed(3)),
          ttsauvat: parseFloat(
            (item.ttnhan * (1 + (item.vat || 0))).toFixed(3),
          ),
          ghichu: item.ghichu,
        };
      })
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
        // const priceFromBanggia = donhang.khachhang?.banggia
        //   ? donhang.khachhang.banggia.sanpham.find(
        //       (sp) => sp.sanphamId === item.idSP,
        //     )?.giaban
        //   : 0;
        // const giaban =
        //   priceFromBanggia !== 0 ? priceFromBanggia : item.sanpham.giaban;
        return {
          ...item.sanpham,
          idSP: item.idSP,
          giaban: item.giaban,
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
        // const priceFromBanggia = donhang.khachhang?.banggia
        //   ? donhang.khachhang.banggia.sanpham.find(
        //       (sp) => sp.sanphamId === item.idSP,
        //     )?.giaban
        //   : 0;
        // const giaban =
        //   priceFromBanggia !== 0 ? priceFromBanggia : item.sanpham.giaban;
        return {
          ...item.sanpham,
          idSP: item.idSP,
          giaban: item.giaban,
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
        // const priceFromBanggia = donhang.khachhang?.banggia
        //   ? donhang.khachhang.banggia.sanpham.find(
        //       (sp) => sp.sanphamId === item.idSP,
        //     )?.giaban
        //   : 0;
        // const giaban =
        //   priceFromBanggia !== 0 ? priceFromBanggia : item.sanpham.giaban;
        return {
          ...item.sanpham,
          idSP: item.idSP,
          giaban: item.giaban,
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
                  ghichu:item.Remark || '',
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
            originalData: v, // Keep original for reference
          };
        } catch (error) {
          console.warn(`Lỗi xử lý đơn hàng ${v.tenkh}, bỏ qua:`, error);
          return null;
        }
      }),
    );

    // Filter out null orders (failed orders)
    const validRawData = rawData.filter((item) => item !== null);

    // 🎯 NEW LOGIC: Detect duplicates and handle confirmation
    const duplicateChecks: any[] = [];
    const processResults = {
      success: 0,
      fail: 0,
      skip: 0,
      duplicates: [] as any[],
      errors: [] as any[]
    };

    for (const order of validRawData) {
      try {
        // Additional validation for each order
        if (!order || !order.khachhangId || !order.ngaygiao) {
          processResults.fail++;
          processResults.errors.push({
            customer: order?.originalData?.tenkh || 'Unknown',
            error: 'Missing required data (khachhangId or ngaygiao)'
          });
          continue;
        }

        // Kiểm tra đơn hàng theo ngày (ngày giao tính theo startOf day và endOf day)
        const startOfDay = this.getStartOfDay(order.ngaygiao);
        const endOfDay = this.getEndOfDay(order.ngaygiao);
        
        const existingOrders = await this.prisma.donhang.findMany({
          where: {
            khachhangId: order.khachhangId,
            ngaygiao: { 
              gte: startOfDay, 
              lte: endOfDay 
            },
          },
          include: { 
            sanpham: true,
            khachhang: true 
          },
        });

        if (existingOrders.length > 0) {
          // Tìm thấy đơn hàng trùng - thêm vào danh sách duplicate
          duplicateChecks.push({
            order: order,
            existingOrders: existingOrders,
            customerName: order.originalData?.tenkh || 'Unknown',
            deliveryDate: order.ngaygiao,
            newProductCount: order.sanpham.length,
            existingProductCounts: existingOrders.map(eo => eo.sanpham.length)
          });
        } else {
          // Không trùng - tạo mới luôn
          try {
            await this.create(order);
            processResults.success++;
          } catch (createError: any) {
            console.error(`Lỗi tạo đơn hàng cho ${order.originalData?.tenkh}:`, createError);
            processResults.fail++;
            processResults.errors.push({
              customer: order.originalData?.tenkh,
              error: createError.message || 'Unknown error'
            });
          }
        }
      } catch (checkError: any) {
        console.error(`Lỗi kiểm tra đơn hàng cho ${order.originalData?.tenkh}:`, checkError);
        processResults.fail++;
        processResults.errors.push({
          customer: order.originalData?.tenkh,
          error: checkError.message || 'Check error'
        });
      }
    }

    // Nếu có duplicates, trả về để frontend xử lý xác nhận
    if (duplicateChecks.length > 0) {
      return {
        status: 'duplicates_found',
        message: `Tìm thấy ${duplicateChecks.length} đơn hàng trùng ngày giao`,
        duplicates: duplicateChecks.map(dup => ({
          customerName: dup.customerName,
          deliveryDate: dup.deliveryDate,
          newProductCount: dup.newProductCount,
          existingOrderCount: dup.existingOrders.length,
          existingProductCounts: dup.existingProductCounts
        })),
        processResults,
        pendingOrders: duplicateChecks.map(dup => dup.order) // Lưu để xử lý sau
      };
    }

    // Không có duplicates hoặc đã xử lý hết
    return {
      status: 'completed',
      message: `Import hoàn tất: ${processResults.success} thành công, ${processResults.fail} thất bại`,
      ...processResults
    };
  }

  // 🎯 NEW METHOD: Process confirmed duplicate orders
  async ImportDonhangOldConfirmed(pendingOrders: any[], userChoice: 'proceed' | 'skip') {
    const processResults = {
      success: 0,
      fail: 0,
      skip: 0,
      errors: [] as any[]
    };

    if (userChoice === 'skip') {
      processResults.skip = pendingOrders.length;
      return {
        status: 'skipped',
        message: `Đã bỏ qua ${pendingOrders.length} đơn hàng trùng lặp`,
        ...processResults
      };
    }

    // userChoice === 'proceed' - Tạo đơn hàng mới cho tất cả
    for (const order of pendingOrders) {
      try {
        await this.create(order);
        processResults.success++;
      } catch (createError: any) {
        console.error(`Lỗi tạo đơn hàng cho ${order.originalData?.tenkh}:`, createError);
        processResults.fail++;
        processResults.errors.push({
          customer: order.originalData?.tenkh,
          error: createError.message || 'Unknown error'
        });
      }
    }

    return {
      status: 'completed',
      message: `Import hoàn tất: ${processResults.success} thành công, ${processResults.fail} thất bại`,
      ...processResults
    };
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
        include: { banggia: true },
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
          banggiaId: dto.banggiaId||khachhang.banggiaId ||DEFAUL_BANGGIA_ID,
          vat: parseFloat((dto.vat || 0.05).toString()), // Default 5% VAT
          isActive: dto.isActive,
          order: maxOrder + 1,
          ghichu: dto.ghichu,
          isshowvat: khachhang.isshowvat, // Set isshowvat from khachhang
          sanpham: {
            create: (() => {
              // ✅ FIX: Handle both direct array and GraphQL nested format
              let sanphamArray;
              if (Array.isArray(dto?.sanpham)) {
                sanphamArray = dto.sanpham;
              } else if (dto?.sanpham?.create && Array.isArray(dto.sanpham.create)) {
                sanphamArray = dto.sanpham.create;
              } else {
                sanphamArray = [];
              }
              
              return sanphamArray.map((sp) => ({
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
              }));
            })()
          },
        },
        include: {
          sanpham: true,
        },
      });

      // Calculate totals using new formula and helper method
      const vatRate = parseFloat((dto.vat || 0.05).toString());
      
      // Get banggia to update product prices
      const banggia = await prisma.banggia.findUnique({
        where: { id: dto.banggiaId || khachhang.banggiaId || DEFAUL_BANGGIA_ID },
        include: { sanpham: true },
      });
      const banggiaDefault = await prisma.banggia.findUnique({
        where: { id: DEFAUL_BANGGIA_ID },
        include: { sanpham: true },
      });

      // Update product prices from banggia and recalculate totals
      const updatedSanpham = dto?.sanpham?.map((sp) => {
        const giaSanpham = banggia?.sanpham.find(bgsp => bgsp.sanphamId === (sp.idSP || sp.id));
        const giaSanphamDefault = banggiaDefault?.sanpham.find(bgsp => bgsp.sanphamId === (sp.idSP || sp.id));
        
        let giaban = parseFloat((sp.giaban || 0).toString());
        
        if (giaSanpham) {
          const giabanFromBanggia = parseFloat(giaSanpham.giaban.toString());
          if (giabanFromBanggia === 0 && giaSanphamDefault) {
        // Nếu giá trong bảng giá hiện tại = 0, lấy giá từ bảng giá mặc định
        giaban = parseFloat(giaSanphamDefault.giaban.toString());
          } else {
        giaban = giabanFromBanggia;
          }
        } else if (giaSanphamDefault) {
          // Nếu không tìm thấy trong bảng giá hiện tại, lấy từ bảng giá mặc định
          giaban = parseFloat(giaSanphamDefault.giaban.toString());
        }
        
        const slnhan = parseFloat((sp.slnhan ?? 0).toString());
        const vat = parseFloat((sp.vat ?? 0).toString());
        
        return {
          ...sp,
          giaban: giaban,
          ttdat: giaban * parseFloat((sp.sldat ?? 0).toString()),
          ttgiao: giaban * parseFloat((sp.slgiao ?? 0).toString()),
          ttnhan: giaban * slnhan,
          ttsauvat: (giaban * slnhan) * (1 + vat),
        };
      }) || [];

      // Update donhangsanpham with new prices
      if (updatedSanpham.length > 0) {
        await Promise.all(
          updatedSanpham.map(async (sp) => {
        await prisma.donhangsanpham.updateMany({
          where: { 
            donhangId: newDonhang.id,
            idSP: sp.idSP || sp.id 
          },
          data: {
            giaban: sp.giaban,
            ttdat: sp.ttdat,
            ttgiao: sp.ttgiao,
            ttnhan: sp.ttnhan,
            ttsauvat: sp.ttsauvat,
          },
        });
          })
        );
      }

      const { tongvat, tongtien } = this.calculateDonhangTotals(updatedSanpham, vatRate);
      
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
          where: { sanphamId: sp.idSP || sp.id },
          update: {
            slchogiao: { increment: incrementValue },
          },
          create: {
            sanphamId: sp.idSP || sp.id,
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

      // 2. Validate status transition if status is changing
      if (data.status && data.status !== oldDonhang.status) {
        const transition = this.statusMachine.validateTransition(
          'donhang',
          oldDonhang.status,
          data.status,
          true // Allow reverse transitions for corrections
        );

        if (!transition.isValid) {
          throw new BadRequestException(
            `Invalid status transition: ${oldDonhang.status} → ${data.status}. ${transition.reason}`
          );
        }
      }

      // 3. Handle status transitions with proper TonKho management
      const tonkhoOps: any[] = [];

      // 3a. Rollback từ 'dagiao' về 'dadat'
      if (oldDonhang.status === 'dagiao' && data.status === 'dadat') {
        // Rollback tồn kho
        for (const sp of oldDonhang.sanpham) {
          const incValue = parseFloat((sp.slgiao ?? 0).toFixed(3));
          tonkhoOps.push({
            sanphamId: sp.idSP,
            operation: 'increment',
            slchogiao: incValue,
            slton: incValue,
            reason: `Rollback DAGIAO→DADAT for order ${oldDonhang.madonhang}`
          });
        }

        // Execute TonKho updates atomically
        await this.tonkhoManager.updateTonkhoAtomic(tonkhoOps);

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

      // REMOVED: All invalid direct status transitions
      // The status machine will prevent these automatically

      // 4. DADAT → DAGIAO: Reserve inventory and create PhieuKho
      if (oldDonhang.status === 'dadat' && data.status === 'dagiao') {
        const tonkhoOpsGiao: any[] = [];
        
        for (const sp of data.sanpham) {
          const decValue = parseFloat((sp.slgiao ?? 0).toFixed(3));
          tonkhoOpsGiao.push({
            sanphamId: sp.id,
            operation: 'decrement',
            slchogiao: decValue,
            slton: decValue,
            reason: `DADAT→DAGIAO for order ${data.madonhang}`
          });
        }

        // Execute TonKho updates atomically
        await this.tonkhoManager.updateTonkhoAtomic(tonkhoOpsGiao);

        // Create PhieuKho
        const maphieuNew = `PX-${data.madonhang}`;
        
        // Check for existing phieu to prevent duplicates
        const existingPhieu = await prisma.phieuKho.findUnique({
          where: { maphieu: maphieuNew }
        });

        if (!existingPhieu) {
          await prisma.phieuKho.create({
            data: {
              maphieu: maphieuNew,
              ngay: new Date(data.ngaygiao),
              type: 'xuat',
              khoId: DEFAUL_KHO_ID,
              ghichu: data.ghichu || 'Phiếu xuất hàng cho đơn hàng',
              isActive: data.isActive ?? true,
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

        // Update order status
        return prisma.donhang.update({
          where: { id },
          data: {
            ...data,
            status: 'dagiao',
            ngaygiao: new Date(data.ngaygiao),
            sanpham: {
              updateMany: data.sanpham.map((sp: any) => ({
                where: { idSP: sp.id },
                data: {
                  slgiao: parseFloat((sp.slgiao ?? 0).toFixed(3)),
                  ghichu: sp.ghichu,
                },
              })),
            },
          },
        });
      }

      // 5. DAGIAO → DANHAN: Handle received quantities and shortages
      if (oldDonhang.status === 'dagiao' && data.status === 'danhan') {
        const tonkhoOpsNhan: any[] = [];
        const shortageItems: any[] = [];
        
        for (const item of data.sanpham) {
          const receivedQty = parseFloat((item.slnhan ?? 0).toFixed(3));
          const shippedQty = parseFloat((item.slgiao ?? 0).toFixed(3));
          
          if (receivedQty < shippedQty) {
            // Handle shortage - return excess to inventory
            const shortage = shippedQty - receivedQty;
            tonkhoOpsNhan.push({
              sanphamId: item.id,
              operation: 'increment',
              slton: shortage,
              reason: `Shortage return for order ${data.madonhang}: ${shortage.toFixed(3)}`
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

        // Execute TonKho updates for shortages
        if (tonkhoOpsNhan.length > 0) {
          await this.tonkhoManager.updateTonkhoAtomic(tonkhoOpsNhan);
        }

        // Create return phieukho for shortages if any
        if (shortageItems.length > 0) {
          const maphieuNhap = `PN-${data.madonhang}-RET-${this.formatDateForFilename()}`;
          await prisma.phieuKho.create({
            data: {
              maphieu: maphieuNhap,
              ngay: new Date(data.ngaygiao),
              type: 'nhap',
              khoId: DEFAUL_KHO_ID,
              ghichu: 'Phiếu nhập hàng trả về do thiếu hàng khi nhận',
              isActive: data.isActive ?? true,
              sanpham: {
                create: shortageItems,
              },
            },
          });
        }

        // Update order with received quantities
        return prisma.donhang.update({
          where: { id },
          data: {
            ...data,
            status: 'danhan',
            sanpham: {
              updateMany: data.sanpham.map((sp: any) => ({
                where: { idSP: sp.id },
                data: {
                  slnhan: parseFloat((sp.slnhan ?? 0).toFixed(3)),
                  ghichu: sp.ghichu,
                },
              })),
            },
          },
        });
      }

      // 6. DANHAN → HOANTHANH: Final completion
      if (oldDonhang.status === 'danhan' && data.status === 'hoanthanh') {
        return prisma.donhang.update({
          where: { id },
          data: {
            status: 'hoanthanh',
          },
        });
      }

      // 7. Cancel order (any status → HUY)
      if (data.status === 'huy') {
        const tonkhoOpsCancel: any[] = [];
        
        // Rollback inventory based on current status
        if (oldDonhang.status === 'dadat') {
          // Just remove slchogiao reservation
          for (const sp of oldDonhang.sanpham) {
            const incValue = parseFloat((sp.sldat ?? 0).toFixed(3));
            tonkhoOpsCancel.push({
              sanphamId: sp.idSP,
              operation: 'decrement',
              slchogiao: incValue,
              reason: `Cancel order ${oldDonhang.madonhang} from DADAT`
            });
          }
        } else if (oldDonhang.status === 'dagiao') {
          // Return both slchogiao and slton
          for (const sp of oldDonhang.sanpham) {
            const incValue = parseFloat((sp.slgiao ?? 0).toFixed(3));
            tonkhoOpsCancel.push({
              sanphamId: sp.idSP,
              operation: 'increment',
              slchogiao: incValue,
              slton: incValue,
              reason: `Cancel order ${oldDonhang.madonhang} from DAGIAO`
            });
          }
        }

        // Execute TonKho rollback
        if (tonkhoOpsCancel.length > 0) {
          await this.tonkhoManager.updateTonkhoAtomic(tonkhoOpsCancel);
        }

        // Remove related PhieuKho
        const maphieu = `PX-${oldDonhang.madonhang}`;
        const existingPhieu = await prisma.phieuKho.findUnique({
          where: { maphieu }
        });
        
        if (existingPhieu) {
          await prisma.phieuKhoSanpham.deleteMany({
            where: { phieuKhoId: existingPhieu.id }
          });
          await prisma.phieuKho.delete({
            where: { id: existingPhieu.id }
          });
        }

        return prisma.donhang.update({
          where: { id },
          data: {
            status: 'huy',
            ghichu: data.ghichu || 'Đơn hàng đã hủy',
          },
        });
      }

      // 8. Regular update without status change
      if (!data.status || data.status === oldDonhang.status) {
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
      }

      // If no valid transition found, return error
      throw new Error(`Invalid status transition from ${oldDonhang.status} to ${data.status}`);
    });
  }

  async danhan(id: string, data: any) {
    // Delegate to update method with status validation
    return this.update(id, { ...data, status: 'danhan' });
  }

  async dagiao(id: string, data: any) {
    // Delegate to update method with status validation
    return this.update(id, { ...data, status: 'dagiao' });
  }

  async updatePhieugiao(id: string, data: any) {
    try {
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
          },
          include: {
            sanpham: true,
          },
        });

        // Update existing sanpham records
        for (const sp of data.sanpham) {
          await prisma.donhangsanpham.updateMany({
            where: { 
              donhangId: id,
              idSP: sp.id 
            },
            data: {
              ghichu: sp.ghichu,
              sldat: parseFloat((sp.sldat ?? 0).toFixed(3)),
              slgiao: parseFloat((sp.slgiao ?? 0).toFixed(3)),
              slnhan: parseFloat((sp.slnhan ?? 0).toFixed(3)),
              ttdat: parseFloat((sp.ttdat ?? 0).toFixed(3)),
              ttgiao: parseFloat((sp.ttgiao ?? 0).toFixed(3)),
              ttnhan: parseFloat((sp.ttnhan ?? 0).toFixed(3)),
              vat: parseFloat((sp.vat ?? 0).toFixed(3)),
              ttsauvat: parseFloat((sp.ttsauvat ?? 0).toFixed(3)),
            },
          });
        }

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

  // 🎯 NEW METHODS: Xử lý đơn hàng tồn đọng cho workflow chốt kho

  /**
   * Tìm các đơn hàng theo trạng thái và sản phẩm
   */
  async findOrdersByStatus(params: {
    sanphamId: string;
    status: string[];
  }): Promise<any[]> {
    try {
      const data = await this.prisma.donhang.findMany({
        where: {
          status: { in: params.status as any[] },
          sanpham: {
            some: {
              idSP: params.sanphamId
            }
          }
        },
        include: {
          sanpham: {
            where: { idSP: params.sanphamId }
          },
          khachhang: {
            select: {
              id: true,
              name: true,
              makh: true
            }
          }
        }
      });
      
      return data || [];
    } catch (error) {
      console.error('Error finding orders by status:', error);
      return [];
    }
  }

  /**
   * Hoàn tất đơn hàng - chuyển trạng thái sang 'danhan'
   */
  async completeDonhang(id: string, data: {
    status: string;
    slnhan: number;
    completedBy?: string;
    completedAt?: Date;
    ghichu?: string;
  }): Promise<{ success: boolean; message?: string }> {
    try {
      return await this.prisma.$transaction(async (prisma) => {
        // Lấy đơn hàng hiện tại
        const donhang = await prisma.donhang.findUnique({
          where: { id },
          include: { sanpham: true }
        });

        if (!donhang) {
          return { success: false, message: 'Đơn hàng không tồn tại' };
        }

        // Cập nhật trạng thái đơn hàng sang danhan
        await prisma.donhang.update({
          where: { id },
          data: {
            status: 'danhan',
            ghichu: data.ghichu,
            updatedAt: new Date()
          }
        });

        // Cập nhật số lượng nhận trong donhangsanpham
        for (const sp of donhang.sanpham) {
          await prisma.donhangsanpham.update({
            where: { id: sp.id },
            data: {
              slnhan: data.slnhan,
              ghichu: data.ghichu
            }
          });

          // 🎯 QUAN TRỌNG: Cập nhật TonKho - giảm slchogiao về 0
          const oldSlgiao = parseFloat((sp.slgiao || 0).toString());
          const newSlnhan = parseFloat(data.slnhan.toString());
          
          // Nếu nhận đủ: slchogiao = 0
          // Nếu nhận thiếu: hoàn lại phần thiếu vào slton
          const shortage = oldSlgiao - newSlnhan;
          
          await this.updateTonKhoSafely(sp.idSP, {
            slchogiao: { decrement: oldSlgiao }, // Giảm về 0
            ...(shortage > 0 && { slton: { increment: shortage } }) // Hoàn lại nếu thiếu
          });
        }

        return { success: true, message: 'Hoàn tất đơn hàng thành công' };
      });
    } catch (error) {
      console.error('Error completing donhang:', error);
      return { success: false, message: error.message };
    }
  }

  /**
   * Hoàn tất tất cả đơn hàng chờ giao cho sản phẩm cụ thể
   */
  async completePendingDeliveriesForProduct(sanphamId: string): Promise<{ success: boolean; count: number; message?: string }> {
    try {
      // First, find all pending orders without transaction to avoid timeout
      const pendingOrders = await this.prisma.donhang.findMany({
        where: {
          status: { in: ['dadat', 'dagiao'] },
          sanpham: {
            some: {
              idSP: sanphamId,
              slgiao: { gt: 0 }
            }
          }
        },
        include: {
          sanpham: {
            where: { idSP: sanphamId }
          }
        }
      });

      if (pendingOrders.length === 0) {
        return {
          success: true,
          count: 0,
          message: 'Không có đơn hàng chờ giao nào'
        };
      }

      // Process in smaller batches to avoid transaction timeout
      const batchSize = 10;
      let totalCompleted = 0;

      for (let i = 0; i < pendingOrders.length; i += batchSize) {
        const batch = pendingOrders.slice(i, i + batchSize);
        
        const batchResult = await this.prisma.$transaction(async (prisma) => {
          let batchCount = 0;
          
          for (const order of batch) {
            // Collect all sanpham updates for this order
            const sanphamUpdates = order.sanpham.map(sp => ({
              id: sp.id,
              slnhan: sp.slgiao,
              ghichu: (sp.ghichu || '') + ' | Auto-completed for inventory close'
            }));

            // Update order status
            await prisma.donhang.update({
              where: { id: order.id },
              data: {
                status: 'danhan',
                ghichu: (order.ghichu || '') + ' | Tự động hoàn tất trước chốt kho',
                updatedAt: new Date()
              }
            });

            // Batch update all sanpham for this order
            for (const update of sanphamUpdates) {
              await prisma.donhangsanpham.update({
                where: { id: update.id },
                data: {
                  slnhan: update.slnhan,
                  ghichu: update.ghichu
                }
              });
            }

            // Update TonKho using atomic operations
            for (const sp of order.sanpham) {
              await this.tonkhoManager.updateTonkhoAtomic([{
                sanphamId: sp.idSP,
                operation: 'decrement',
                slchogiao: parseFloat(sp.slgiao.toString()),
                reason: `Auto-complete pending delivery for order ${order.madonhang}`
              }]);
            }

            batchCount += order.sanpham.length;
          }
          
          return batchCount;
        }, {
          timeout: 30000 // Increase timeout to 30 seconds
        });

        totalCompleted += batchResult;
      }

      return {
        success: true,
        count: totalCompleted,
        message: `Đã hoàn tất ${totalCompleted} đơn hàng chờ giao`
      };
    } catch (error) {
      console.error('Error completing pending deliveries:', error);
      return {
        success: false,
        count: 0,
        message: error.message || 'Lỗi khi hoàn tất đơn hàng chờ giao'
      };
    }
  }

  /**
   * Helper method to safely update TonKho, creating record if not exists
   */
  private async updateTonKhoSafely(sanphamId: string, updateData: any): Promise<void> {
    try {
      // Kiểm tra TonKho có tồn tại không
      const existingTonKho = await this.prisma.tonKho.findUnique({
        where: { sanphamId }
      });

      if (existingTonKho) {
        // Update existing record
        await this.prisma.tonKho.update({
          where: { sanphamId },
          data: updateData
        });
      } else {
        // Create new record với giá trị mặc định
        const initialValue = this.calculateInitialTonKhoValue(updateData);
        await this.prisma.tonKho.create({
          data: {
            sanphamId,
            slton: initialValue.slton,
            slchogiao: initialValue.slchogiao,
            slchonhap: initialValue.slchonhap
          }
        });
      }
    } catch (error) {
      console.error(`Error updating TonKho for product ${sanphamId}:`, error);
      throw error;
    }
  }

  /**
   * Helper to calculate initial value for TonKho creation
   */
  private calculateInitialTonKhoValue(updateData: any): {
    slton: number;
    slchogiao: number; 
    slchonhap: number;
  } {
    // Tính toán giá trị ban đầu dựa trên updateData
    let slton = 0;
    let slchogiao = 0;
    let slchonhap = 0;

    if (updateData.slton) {
      if (typeof updateData.slton === 'object' && updateData.slton.increment) {
        slton = updateData.slton.increment;
      } else {
        slton = updateData.slton;
      }
    }

    if (updateData.slchogiao) {
      if (typeof updateData.slchogiao === 'object' && updateData.slchogiao.increment) {
        slchogiao = updateData.slchogiao.increment;
      } else if (typeof updateData.slchogiao === 'object' && updateData.slchogiao.decrement) {
        slchogiao = -updateData.slchogiao.decrement;
      } else {
        slchogiao = updateData.slchogiao;
      }
    }

    if (updateData.slchonhap) {
      if (typeof updateData.slchonhap === 'object' && updateData.slchonhap.increment) {
        slchonhap = updateData.slchonhap.increment;
      } else if (typeof updateData.slchonhap === 'object' && updateData.slchonhap.decrement) {
        slchonhap = -updateData.slchonhap.decrement;
      } else {
        slchonhap = updateData.slchonhap;
      }
    }

    return { slton, slchogiao, slchonhap };
  }

  // 🎯 ADDITIONAL METHODS for GraphQL integration

  /**
   * Get pending orders with full details for frontend
   */
  async getPendingOrdersForProduct(sanphamId: string): Promise<any[]> {
    try {
      const orders = await this.prisma.donhang.findMany({
        where: {
          status: { in: ['dadat', 'dagiao'] },
          sanpham: {
            some: {
              idSP: sanphamId,
              slgiao: { gt: 0 }
            }
          }
        },
        include: {
          sanpham: {
            where: { idSP: sanphamId }
          },
          khachhang: {
            select: {
              id: true,
              name: true,
              makh: true
            }
          }
        }
      });

      return orders.map(order => ({
        id: order.id,
        status: order.status,
        khachhang: order.khachhang,
        sanpham: order.sanpham[0], // Since we filtered by sanphamId
        createdAt: order.createdAt
      }));
    } catch (error) {
      console.error('Error getting pending orders for product:', error);
      return [];
    }
  }
}
