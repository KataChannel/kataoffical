import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import * as moment from 'moment-timezone';
import { PrismaService } from 'prisma/prisma.service';
import { StatusMachineService } from '../common/status-machine.service';
import { TonkhoManagerService } from '../common/tonkho-manager.service';
import { PerformanceLogger } from '../shared/performance-logger';
import { BanggiaPriceHistoryService } from '../banggia/banggia-price-history.service';
import { PriceHistoryService } from './price-history.service';
import { UpdateProductPriceDto } from './dto/price-management.dto';
import { ImportdataService } from '../importdata/importdata.service';
import { CancelOrderService } from './cancel-order.service';
import { NotificationService } from '../notification/notification.service';
const DEFAUL_KHO_ID = '4cc01811-61f5-4bdc-83de-a493764e9258';
const DEFAUL_BANGGIA_ID = '84a62698-5784-4ac3-b506-5e662d1511cb';
@Injectable()
export class DonhangService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly _ImportdataService: ImportdataService,
    private readonly statusMachine: StatusMachineService,
    private readonly tonkhoManager: TonkhoManagerService,
    private readonly cancelOrderService: CancelOrderService,
    private readonly priceHistoryService: BanggiaPriceHistoryService,
    private readonly donhangPriceHistoryService: PriceHistoryService,
    private readonly notificationService: NotificationService,
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
    return await PerformanceLogger.logAsync('DonhangService.search', async () => {
      const {
        Batdau,
        Ketthuc,
        Type,
        pageSize: rawPageSize = 10,
        pageNumber: rawPageNumber = 1,
        query,
      } = params;

      const pageSize = Math.min(Math.max(Number(rawPageSize) || 10, 1), 1000); // 🛡️ CAP at 1000 to prevent OOM/Bridge errors
      const pageNumber = Math.max(Number(rawPageNumber) || 1, 1);

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
    if (Type && Type !== 'all') {
      where.khachhang = { loaikh: Type };
    }
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
          khachhang: true,
        },
        orderBy: { createdAt: 'desc' },
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
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
      khachhang: khachhang || null,
      name: khachhang?.name,
    }));

    return {
      data: result,
      total,
      pageNumber,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
    }, params);
  }

  async congnokhachhang(params: any) {
    return await PerformanceLogger.logAsync('DonhangService.congnokhachhang', async () => {
      const { Batdau, Ketthuc, Status, khachhangIds, query } = params;

    console.time('congnokhachhang-query');

    // Build WHERE clause efficiently
    const whereConditions: any = {};

    // Date range filter
    if (Batdau && Ketthuc) {
      whereConditions.ngaygiao = {
        gte: new Date(Batdau),
        lte: new Date(Ketthuc),
      };
    }

    // Status filter
    if (Status && Array.isArray(Status) && Status.length > 0) {
      whereConditions.status = { in: Status };
    }

    // Customer filter
    if (khachhangIds && Array.isArray(khachhangIds) && khachhangIds.length > 0) {
      whereConditions.khachhangId = { in: khachhangIds };
    }

    // Search query
    if (query) {
      whereConditions.OR = [
        { madonhang: { contains: query, mode: 'insensitive' } },
        { khachhang: { name: { contains: query, mode: 'insensitive' } } },
      ];
    }

    // Optimized query with minimal select and efficient joins
    const donhangs = await this.prisma.donhang.findMany({
      where: whereConditions,
      select: {
        id: true,
        madonhang: true,
        ngaygiao: true,
        tongtien: true,
        tongvat: true,
        vat: true, // 🔥 Thêm vat để tính lại tongtien từ tong
        isshowvat: true, // Thêm isshowvat để kiểm tra
        khachhang: {
          select: {
            name: true,
            makh: true,
          },
        },
        sanpham: {
          select: {
            slnhan: true,
            giaban: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Process results efficiently
    const result = donhangs.map((donhang) => {
      let tong = 0;
      let soluong = 0;

      // Calculate totals efficiently without parseFloat overhead
      // 🔥 Loại bỏ sản phẩm có slnhan = 0
      for (const item of donhang.sanpham) {
        const slnhan = Number(item.slnhan) || 0;
        
        // Skip items with zero received quantity
        if (slnhan === 0) continue;
        
        const giaban = Number(item.giaban) || 0;
        tong += slnhan * giaban;
        soluong += slnhan;
      }

      // 🔥 BUGFIX: Tính lại tongvat và tongtien từ tong (đã tính từ slnhan)
      // Thay vì lấy trực tiếp từ DB (có thể cũ)
      const vatRate = donhang.isshowvat ? (Number(donhang.vat) || 0) : 0;
      const tongvat = tong * vatRate;
      const tongtien = tong + tongvat;

      return {
        id: donhang.id,
        madonhang: donhang.madonhang,
        ngaygiao: donhang.ngaygiao,
        tong: tong.toFixed(3),
        soluong: soluong.toFixed(3),
        tongtien: parseFloat(tongtien.toFixed(3)),
        tongvat: parseFloat(tongvat.toFixed(3)),
        name: donhang.khachhang?.name,
        makh: donhang.khachhang?.makh,
      };
    });

    console.timeEnd('congnokhachhang-query');
    return result || [];
    }, params);
  }


  async downloadcongnokhachhang(params: any) {
    const { Batdau, Ketthuc, query, ids, Status } = params;
    
    // Date Range Setup
    const dateRange = {
        gte: Batdau ? new Date(Batdau) : undefined,
        lte: Ketthuc ? new Date(Ketthuc) : undefined,
    };

    const where: any = {
      ngaygiao: dateRange,
      status: Array.isArray(Status) ? { in: Status } : Status,
    };

    if(ids?.length > 0){
      where.id = { in: ids };
    }

    if (query) {
      where.OR = [
        { madonhang: { contains: query, mode: 'insensitive' } },
        { khachhang: { name: { contains: query, mode: 'insensitive' } } },
      ];
    }
    
    // Fetch orders with relations + Groups
    const donhangs = await this.prisma.donhang.findMany({
      where,
      include: {
        sanpham: {
          include: {
            sanpham: true,
          },
        },
        khachhang: { 
            include: { 
                nhomkhachhang: true // Fetch Group info
            } 
        },
      },
      orderBy: { ngaygiao: 'asc' },
    });
    
    // Process Data for Summary Report
    const groupedData = new Map<string, Map<string, any>>();
    const allMonths = new Set<string>();

    for (const dh of donhangs) {
        if (!dh.khachhang) continue;

        // Determine Customer Group
        const groupName = dh.khachhang.nhomkhachhang && dh.khachhang.nhomkhachhang.length > 0 
            ? dh.khachhang.nhomkhachhang[0].name 
            : 'Khác';
        
        const customerId = dh.khachhang.id;
        const customerName = dh.khachhang.name || 'Khách lẻ';

        // Init Group Map
        if (!groupedData.has(groupName)) {
            groupedData.set(groupName, new Map());
        }
        const groupCustomers = groupedData.get(groupName)!;

        // Init Customer Data
        if (!groupCustomers.has(customerId)) {
            groupCustomers.set(customerId, {
                groupName: groupName,
                customerName: customerName,
                customerId: customerId,
                tkCongNo: '131',
                soDuDauKy: 0,
                phatSinhTang: 0,
                phatSinhGiam: 0,
                soDuCuoiKy: 0,
                monthlyData: new Map<string, number>()
            });
        }
        const customerData = groupCustomers.get(customerId);

        // Calculate Order Total (Sau VAT)
        let orderTotal = 0;
        for (const sp of dh.sanpham) {
            const slnhan = Number(sp.slnhan) || 0;
            if (slnhan > 0) {
                 const giaban = Number(sp.giaban) || 0;
                 const vat = dh.isshowvat ? (Number(sp.sanpham?.vat) || 0) : 0;
                 orderTotal += (slnhan * giaban) * (1 + vat);
            }
        }

        // Aggregate
        customerData.phatSinhTang += orderTotal;
        customerData.soDuCuoiKy += orderTotal; 

        // Month Breakdown
        if (dh.ngaygiao) {
            const monthKey = moment(dh.ngaygiao).tz('Asia/Ho_Chi_Minh').format('MM/YYYY');
            allMonths.add(monthKey);
            const currentMonthVal = customerData.monthlyData.get(monthKey) || 0;
            customerData.monthlyData.set(monthKey, currentMonthVal + orderTotal);
        }
    }

    // Sort months
    const sortedMonths = Array.from(allMonths).sort((a, b) => {
        return moment(a, 'MM/YYYY').toDate().getTime() - moment(b, 'MM/YYYY').toDate().getTime();
    });

    return this.createSummaryExcelFile(groupedData, sortedMonths, params);
  }

  /**
   * Helper to create Summary Excel Report
   */
  private async createSummaryExcelFile(groupedData: Map<string, Map<string, any>>, sortedMonths: string[], params: any) {
    const ExcelJS = require('exceljs');
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Tổng Hợp Công Nợ');

    const columns = [
        { key: 'nhomkhachhang', width: 25 },     
        { key: 'tenkhachhang', width: 40 },       
        { key: 'tkcongno', width: 12 },           
        { key: 'sodudauky', width: 18 },          
        { key: 'phatsinhtang', width: 22 },       
        { key: 'phatsinhgiam', width: 18 },       
        { key: 'soducuoiky', width: 22 },         
    ];

    sortedMonths.forEach((month, index) => {
        columns.push({ key: `month_${index}`, width: 18 });
    });

    worksheet.columns = columns;
    const totalColsChar = String.fromCharCode(65 + columns.length - 1); 

    // Header Info
    worksheet.mergeCells(`A1:${totalColsChar}1`);
    const titleCell = worksheet.getCell('A1');
    titleCell.value = 'TỔNG HỢP CÔNG NỢ PHẢI THU KHÁCH HÀNG';
    titleCell.font = { name: 'Arial', bold: true, size: 16 };
    titleCell.alignment = { horizontal: 'center', vertical: 'middle' };
    worksheet.getRow(1).height = 35;

    worksheet.mergeCells(`A2:F2`);
    worksheet.getCell('A2').value = `Tài khoản: 131`; 
    worksheet.getCell('A2').font = { name: 'Arial', italic: true, bold: true, size: 11 };
    worksheet.getCell('A2').alignment = { horizontal: 'center', vertical: 'middle' };

    worksheet.mergeCells(`G2:${totalColsChar}2`);
    const startDate = params.Batdau ? moment(params.Batdau).format('DD/MM/YYYY') : '...';
    const endDate = params.Ketthuc ? moment(params.Ketthuc).format('DD/MM/YYYY') : '...';
    worksheet.getCell('G2').value = `Từ ngày ${startDate} Đến ngày ${endDate}`;
    worksheet.getCell('G2').font = { name: 'Arial', italic: true, bold: true, size: 11 };
    worksheet.getCell('G2').alignment = { horizontal: 'left', vertical: 'middle' };
    worksheet.getRow(2).height = 25;

    // Headers
    const setHeader = (ref, val, color = 'FFFFFF00') => {
        const c = worksheet.getCell(ref);
        c.value = val;
        c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: color } };
        c.font = { name: 'Arial', bold: true, size: 10 };
        c.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
        c.border = { top: {style:'thin'}, left: {style:'thin'}, right: {style:'thin'}, bottom: {style:'thin'} };
    };

    ['A', 'B', 'C', 'D', 'E', 'F', 'G'].forEach(col => worksheet.mergeCells(`${col}3:${col}4`));
    worksheet.getRow(3).height = 40;

    setHeader('A3', 'NHÓM KHÁCH HÀNG');
    setHeader('B3', 'Tên khách hàng');
    setHeader('C3', 'TK công nợ', 'FFD9D9D9');
    setHeader('D3', 'Số dư đầu kỳ', 'FFD9D9D9');
    setHeader('E3', 'Phát sinh tăng\n(DOANH SỐ TỔNG-VAT)');
    setHeader('F3', 'Phát sinh giảm', 'FFD9D9D9');
    setHeader('G3', 'Số dư cuối kỳ', 'FFD9D9D9');

    if (sortedMonths.length > 0) {
        const startMonthColIndex = 7; 
        const endMonthColIndex = startMonthColIndex + sortedMonths.length - 1;
        const startColChar = String.fromCharCode(65 + startMonthColIndex);
        const endColChar = String.fromCharCode(65 + endMonthColIndex);
        
        worksheet.mergeCells(`${startColChar}3:${endColChar}3`);
        const tdHeader = worksheet.getCell(`${startColChar}3`);
        tdHeader.value = 'Trong đó';
        tdHeader.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD9D9D9' } };
        tdHeader.font = { name: 'Arial', bold: true, size: 10 };
        tdHeader.alignment = { horizontal: 'center', vertical: 'middle' };
        tdHeader.border = { top: {style:'thin'}, left: {style:'thin'}, right: {style:'thin'}, bottom: {style:'thin'} };

        sortedMonths.forEach((month, idx) => {
            setHeader(`${String.fromCharCode(65 + startMonthColIndex + idx)}4`, `Tháng ${month}`, 'FFD9D9D9');
        });
    }

    // Data
    let currentRowIndex = 5;
    const sortedGroups = Array.from(groupedData.keys()).sort();

    for (const groupName of sortedGroups) {
        const customers = groupedData.get(groupName)!;
        const sortedCustomerIds = Array.from(customers.keys());
        if (sortedCustomerIds.length === 0) continue;

        const groupStartRow = currentRowIndex;

        for (const custId of sortedCustomerIds) {
            const custData = customers.get(custId);
            const row = worksheet.getRow(currentRowIndex);
            
            row.getCell(1).value = groupName; 
            row.getCell(2).value = custData.customerName;
            row.getCell(3).value = custData.tkCongNo;
            row.getCell(4).value = custData.soDuDauKy || '';
            row.getCell(5).value = custData.phatSinhTang;
            row.getCell(6).value = custData.phatSinhGiam || '';
            row.getCell(7).value = custData.soDuCuoiKy;

            sortedMonths.forEach((month, idx) => {
                row.getCell(8 + idx).value = custData.monthlyData.get(month) || '';
                row.getCell(8 + idx).numFmt = '#,##0.00';
            });

            [4, 5, 6, 7].forEach(c => {
                 row.getCell(c).numFmt = '#,##0.00';
                 row.getCell(c).alignment = { horizontal: 'right' };
            });

            currentRowIndex++;
        }
        
        // Merge Group Name
        if (currentRowIndex - 1 >= groupStartRow) {
            worksheet.mergeCells(`A${groupStartRow}:A${currentRowIndex - 1}`);
            const gCell = worksheet.getCell(`A${groupStartRow}`);
            gCell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
            gCell.font = { bold: true };
            gCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFF00' } };
        }
    }

    // Borders
    for (let r = 3; r < currentRowIndex; r++) {
         const row = worksheet.getRow(r);
         for (let c = 1; c <= columns.length; c++) {
             row.getCell(c).border = { top: {style:'thin'}, left: {style:'thin'}, right: {style:'thin'}, bottom: {style:'thin'} };
         }
    }

    const dateStr = this.formatDateForFilename();
    const filename = `TongHopCongNo_${dateStr}.xlsx`;
    const buffer = await workbook.xlsx.writeBuffer();
    
    return {
      buffer: buffer,
      filename: filename,
      contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    };
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
      { key: 'tongtientruocthue', header: 'Tổng Tiền Trước Thuế', width: 20 },
      { key: 'tongcong', header: 'Tổng Cộng Khách Hàng', width: 25 }
    ];


    worksheet.columns = columns;

    // Style header row
  // Header logo and title for rows 1-9
  // Add logo image
  // Helper function to set fallback logo
  const setFallbackLogo = () => {
    const logoCell = worksheet.getCell('A1');
    logoCell.value = 'TRAN GIA';
    logoCell.font = { 
      bold: true, 
      size: 16, 
      color: { argb: 'FFFF0000' }
    };
    logoCell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFFFCC00' }
    };
    logoCell.alignment = { horizontal: 'left', vertical: 'middle' };
    logoCell.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };
    // Set row height for fallback text
    worksheet.getRow(1).height = 30;
  };

  try {
    const response = await fetch('https://tg.rausachtrangia.com/images/logo.svg');
    if (response.ok) {
      const imageBuffer = await response.arrayBuffer();
      const imageId = workbook.addImage({
        buffer: imageBuffer,
        extension: 'png',
      });
      
      // Merge cells A1:P1 for logo area first
      worksheet.mergeCells('A1:P1');
      
      // Add image to cell A1 with specific dimensions
      worksheet.addImage(imageId, {
        tl: { col: 0, row: 0 }, // Top-left position (A1)
        ext: { width: 200, height: 60 } // Image dimensions in pixels
      });
      
      // Set row height to match image height (convert pixels to points: pixels * 0.75)
      worksheet.getRow(1).height = 60 * 0.75; // 45 points
    } else {
      // Fallback to text if image fails to load
      worksheet.mergeCells('A1:P1');
      setFallbackLogo();
    }
  } catch (error) {
    console.error('Error loading logo image:', error);
    // Fallback to text if image fails to load
    worksheet.mergeCells('A1:H1');
    worksheet.mergeCells('I1:P1');
    setFallbackLogo();
  }
  
  // Group data by customer and then by date
  const groupedData = this.groupDataByCustomerAndDate(data);
  
  // Get first customer info for display
  const firstCustomer = groupedData[0];  
  worksheet.getCell('A4').value = `Tên Khách Hàng: ${firstCustomer?.tenkhachhang || ''}`;
  worksheet.getCell('A5').value = `Địa chỉ: ${firstCustomer?.diachi || ''}`; 
  worksheet.getCell('A6').value = `Điện thoại: ${firstCustomer?.SDT || ''}`;
  worksheet.getCell('A7').value = `Người Liên Hệ: ${firstCustomer?.nguoilienhe || ''}`;
  worksheet.getCell('I7').value = `Email: ${firstCustomer?.email || ''}`;

  // Merge company info across columns
  worksheet.mergeCells('A4:P4');
  worksheet.mergeCells('A5:P5');
  worksheet.mergeCells('A6:P6');
  worksheet.mergeCells('A7:H7');
  worksheet.mergeCells('I7:P7');

  // Add report title
  const titleCell = worksheet.getCell('A2');
  titleCell.value = 'BÁO CÁO CÔNG NỢ KHÁCH HÀNG';
  titleCell.font = { bold: true, size: 14 };
  titleCell.alignment = { horizontal: 'center', vertical: 'middle' };
  worksheet.mergeCells('A2:P2');

  // Add date range if available
  if (params.Batdau || params.Ketthuc) {
    const dateRange = `Từ ngày: ${params.Batdau ? moment(params.Batdau).format('DD/MM/YYYY') : 'N/A'} - Đến ngày: ${params.Ketthuc ? moment(params.Ketthuc).format('DD/MM/YYYY') : 'N/A'}`;
    const dateCell = worksheet.getCell('A3');
    dateCell.value = dateRange;
    dateCell.alignment = { horizontal: 'center', vertical: 'middle' };
    worksheet.mergeCells('A3:P3');
  }

  // Set row heights for header section
  worksheet.getRow(1).height = 30;
  worksheet.getRow(2).height = 25;
  worksheet.getRow(3).height = 20;

  // Add actual column headers at row 10
  columns.forEach((column, index: number) => {
    const cell = worksheet.getCell(10, index + 1);
    cell.value = column.header;
  });


    const headerRow = worksheet.getRow(10);


    headerRow.font = { bold: true, color: { argb: 'FFFFFF' } };
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '366092' }
    };
    headerRow.alignment = { horizontal: 'center', vertical: 'middle' };
    headerRow.height = 25;
    
    let currentRow = 11; // Start after header row
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
              tongtientruocthue: Number(item.tongtientruocthue) || 0,
              tongcong: Number(customerData.tongtiensauvat) || 0  // Tổng cộng của cả khách hàng
            };

            // Format number columns
            ['soluong', 'dongia', 'thanhtientruocvat', 'dongiavathoadon', 'thanhtiensauvat', 'tongtiensauvat', 'tongtientruocthue', 'tongcong'].forEach(col => {
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
          
          // THÊM: Merge tongtientruocthue cho cùng ngày giao của cùng khách hàng
          const tongtientruocthueColIndex = columns.findIndex(c => c.key === 'tongtientruocthue') + 1;
          mergeRanges.push({
            range: `${String.fromCharCode(64 + tongtientruocthueColIndex)}${dateStartRow}:${String.fromCharCode(64 + tongtientruocthueColIndex)}${dateEndRow}`,
            value: dateGroup.items[0].tongtientruocthue
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

    // Apply merge ranges with duplicate check
    const appliedRanges = new Set<string>();
    mergeRanges.forEach(merge => {
      if (!appliedRanges.has(merge.range)) {
        try {
          worksheet.mergeCells(merge.range);
          appliedRanges.add(merge.range);
          const cell = worksheet.getCell(merge.range.split(':')[0]);
          cell.alignment = { horizontal: 'center', vertical: 'middle' };
          cell.font = { bold: true };
        } catch (error) {
          console.warn(`Warning: Could not merge range ${merge.range}:`, error.message);
        }
      }
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
          diachi: item.diachi,
          SDT: item.SDT,
          email : item.email,
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
  /**
   * Preview price changes without actually updating.
   * Returns old vs new prices for review before confirming.
   */
  async dongbogiaPreview(listdonhang: any) {
    const previews: any[] = [];

    for (const donhangId of listdonhang) {
      try {
        const donhang = await this.prisma.donhang.findUnique({
          where: { id: donhangId },
          include: {
            banggia: {
              include: {
                sanpham: { include: { sanpham: true } },
              },
            },
            khachhang: {
              include: {
                banggia: {
                  include: {
                    sanpham: { include: { sanpham: true } },
                  },
                },
              },
            },
            sanpham: { include: { sanpham: true } },
          },
        });

        if (!donhang) continue;

        const banggiaUuTien = donhang.banggia || donhang.khachhang?.banggia;
        const banggiaKhachhang = donhang.khachhang?.banggia;

        if (!banggiaUuTien) continue;

        const banggiaDefault = await this.prisma.banggia.findUnique({
          where: { id: DEFAUL_BANGGIA_ID },
          include: { sanpham: { include: { sanpham: true } } },
        });

        const products: any[] = [];
        let hasChanges = false;

        for (const sp of donhang.sanpham) {
          const giaSanpham = banggiaUuTien.sanpham.find(
            (bgsp) => bgsp.sanphamId === sp.idSP,
          );
          const giaSanphamKH = (donhang.banggia && banggiaKhachhang)
            ? banggiaKhachhang.sanpham.find((bgsp) => bgsp.sanphamId === sp.idSP)
            : null;
          const giaSanphamDefault = banggiaDefault?.sanpham.find(
            (bgsp) => bgsp.sanphamId === sp.idSP,
          );

          let newPrice = 0;
          let giaSource = 'Không tìm thấy';

          if (giaSanpham && Number(giaSanpham.giaban) > 0) {
            newPrice = Number(giaSanpham.giaban);
            giaSource = `${banggiaUuTien.mabanggia}${donhang.banggia ? ' (đơn hàng)' : ' (khách hàng)'}`;
          } else if (giaSanphamKH && Number(giaSanphamKH.giaban) > 0) {
            newPrice = Number(giaSanphamKH.giaban);
            giaSource = `${banggiaKhachhang?.mabanggia} (fallback KH)`;
          } else if (giaSanphamDefault && Number(giaSanphamDefault.giaban) > 0) {
            newPrice = Number(giaSanphamDefault.giaban);
            giaSource = 'BG04 (mặc định)';
          }

          const oldPrice = Number(sp.giaban) || 0;
          const changed = Math.abs(oldPrice - newPrice) > 0.01;
          if (changed) hasChanges = true;

          products.push({
            title: sp.sanpham?.title || '',
            masp: sp.sanpham?.masp || '',
            oldPrice,
            newPrice,
            giaSource,
            changed,
            slnhan: Number(sp.slnhan) || 0,
            sldat: Number(sp.sldat) || 0,
          });
        }

        previews.push({
          donhangId: donhang.id,
          madonhang: donhang.madonhang,
          khachhang: donhang.khachhang?.name || '',
          banggiaOnDon: donhang.banggia
            ? { mabanggia: donhang.banggia.mabanggia, title: donhang.banggia.title }
            : null,
          banggiaOnKH: donhang.khachhang?.banggia
            ? { mabanggia: donhang.khachhang.banggia.mabanggia, title: donhang.khachhang.banggia.title }
            : null,
          banggiaUsed: {
            mabanggia: banggiaUuTien.mabanggia,
            title: banggiaUuTien.title,
            source: donhang.banggia ? 'Đơn hàng' : 'Khách hàng',
          },
          hasChanges,
          products,
        });
      } catch (err) {
        console.error(`Preview error for ${donhangId}:`, err);
      }
    }

    return { previews };
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
              // 1. Tìm đơn hàng với bảng giá trên đơn + bảng giá khách hàng
              const donhang = await prisma.donhang.findUnique({
                where: { id: donhangId },
                include: {
                  // ✅ Bảng giá gắn trực tiếp trên đơn hàng (ưu tiên cao nhất)
                  banggia: {
                    include: {
                      sanpham: {
                        include: {
                          sanpham: true
                        }
                      },
                    },
                  },
                  khachhang: {
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
                    },
                  },
                  sanpham: {
                    include: {
                      sanpham: true
                    }
                  },
                },
              });

              console.log(`Đơn hàng ${donhangId} đã được tìm thấy`);
              // console.log(`Đơn hàng ${donhang} đã được tìm thấy`);
              
              if (!donhang) {
                console.warn(`Đơn hàng ${donhangId} không tồn tại`);
                errorCount++;
                continue;
              }

              // 2. Kiểm tra có bảng giá không
              if (!donhang.banggia && !donhang.khachhang?.banggia) {
                console.warn(`Đơn hàng ${donhang.madonhang} không có bảng giá (trên đơn và trên khách hàng)`);
                errorCount++;
                continue;
              }

              // ✅ Ưu tiên: Bảng giá trên đơn hàng > Bảng giá của khách hàng
              const banggiaUuTien = (donhang.banggia || donhang.khachhang?.banggia)!;
              const banggiaKhachhang = donhang.khachhang?.banggia;

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

              console.log(`Cập nhật giá cho đơn hàng ${donhang.madonhang} từ bảng giá ${banggiaUuTien.mabanggia}${donhang.banggia ? ' (trên đơn hàng)' : ' (của khách hàng)'}`);

              let tongchua = 0; // Tổng tiền chưa VAT
              let hasUpdates = false;

              // 3. Cập nhật giá cho từng sản phẩm trong đơn hàng với logic ưu tiên
              for (const donhangSanpham of donhang.sanpham) {
                // ✅ Tìm giá từ bảng giá ưu tiên (đơn hàng > khách hàng) (ưu tiên 1)
                const giaSanpham = banggiaUuTien.sanpham.find(
                  (bgsp) => bgsp.sanphamId === donhangSanpham.idSP,
                );

                // Tìm giá từ bảng giá khách hàng nếu bảng giá ưu tiên là đơn hàng (ưu tiên 2)
                const giaSanphamKH = (donhang.banggia && banggiaKhachhang) 
                  ? banggiaKhachhang.sanpham.find((bgsp) => bgsp.sanphamId === donhangSanpham.idSP)
                  : null;

                // Tìm giá từ bảng giá mặc định (ưu tiên 3)
                const giaSanphamDefault = banggiaDefault?.sanpham.find(
                  (bgsp) => bgsp.sanphamId === donhangSanpham.idSP,
                );

                let giaban = 0;
                let giaSource = 'none';

                // Logic ưu tiên lấy giá: Đơn hàng > Khách hàng > Mặc định
                if (giaSanpham && Number(giaSanpham.giaban) > 0) {
                  // Ưu tiên 1: Có giá từ bảng giá ưu tiên (trên đơn hàng hoặc khách hàng) và > 0
                  giaban = Number(giaSanpham.giaban);
                  giaSource = `bảng giá ${banggiaUuTien.mabanggia}${donhang.banggia ? ' (trên đơn hàng)' : ' (của khách hàng)'}`;
                } else if (giaSanphamKH && Number(giaSanphamKH.giaban) > 0) {
                  // Ưu tiên 2: Fallback về bảng giá khách hàng (khi bảng giá đơn hàng không có SP này)
                  giaban = Number(giaSanphamKH.giaban);
                  giaSource = `bảng giá ${banggiaKhachhang?.mabanggia} (fallback từ khách hàng)`;
                } else if (giaSanphamDefault && Number(giaSanphamDefault.giaban) > 0) {
                  // Ưu tiên 3: Lấy từ bảng giá mặc định
                  giaban = Number(giaSanphamDefault.giaban);
                  giaSource = 'bảng giá mặc định (fallback)';
                } else {
                  // Không tìm thấy giá hợp lệ ở đâu, trả về 0
                  giaban = 0;
                  giaSource = 'không tìm thấy giá hợp lệ trong tất cả bảng giá (trả về 0)';
                }

                if (giaban > 0) {
                  const sldat = Number(donhangSanpham.sldat) || 0;
                  const slgiao = Number(donhangSanpham.slgiao) || 0;
                  const slnhan = Number(donhangSanpham.slnhan) || 0;
                  const vat = donhang.isshowvat ? (Number(donhangSanpham.vat) || 0) : 0;

                  // Lưu giá trị cũ để ghi log
                  const oldGiaban = Number(donhangSanpham.giaban) || 0;
                  const oldTtdat = Number(donhangSanpham.ttdat) || 0;
                  const oldTtgiao = Number(donhangSanpham.ttgiao) || 0;
                  const oldTtnhan = Number(donhangSanpham.ttnhan) || 0;
                  const oldTtsauvat = Number(donhangSanpham.ttsauvat) || 0;

                  // 4. Cập nhật giá và tính toán lại các giá trị
                  const ttdat = giaban * sldat;
                  const ttgiao = giaban * slgiao;
                  const ttnhan = giaban * slnhan;
                  const ttsauvat = ttnhan * (1 + vat);

                  // 🔥 BUGFIX: Luôn cộng ttnhan vào tongchua để tính tongtien chính xác
                  // Không phụ thuộc vào việc giá có thay đổi hay không
                  tongchua += ttnhan;

                  // Kiểm tra có thay đổi giá không
                  const hasGiaChange = oldGiaban !== giaban;

                  if (hasGiaChange) {
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

                    // Ghi log audit cho việc đồng bộ giá
                    await prisma.auditLog.create({
                      data: {
                        entityName: 'Donhangsanpham',
                        entityId: donhangSanpham.id,
                        action: 'UPDATE',
                        oldValues: {
                          giaban: oldGiaban,
                          ttdat: oldTtdat,
                          ttgiao: oldTtgiao,
                          ttnhan: oldTtnhan,
                          ttsauvat: oldTtsauvat,
                        },
                        newValues: {
                          giaban: giaban,
                          ttdat: ttdat,
                          ttgiao: ttgiao,
                          ttnhan: ttnhan,
                          ttsauvat: ttsauvat,
                        },
                        changedFields: ['giaban', 'ttdat', 'ttgiao', 'ttnhan', 'ttsauvat'],
                        metadata: {
                          action: 'DONGBOGIA',
                          donhangId: donhang.id,
                          madonhang: donhang.madonhang,
                          khachhangId: donhang.khachhang?.id,
                          khachhangName: donhang.khachhang?.name,
                          banggiaId: banggiaUuTien.id,
                          mabanggia: banggiaUuTien.mabanggia,
                          sanphamId: donhangSanpham.idSP,
                          sanphamTitle: donhangSanpham.sanpham?.title,
                          sanphamMasp: donhangSanpham.sanpham?.masp,
                          giaSource: giaSource,
                          giaDifference: giaban - oldGiaban,
                          percentChange: oldGiaban > 0 ? ((giaban - oldGiaban) / oldGiaban * 100).toFixed(2) + '%' : 'N/A',
                        },
                        status: 'SUCCESS',
                      },
                    });

                    hasUpdates = true;

                    console.log(`✅ Cập nhật sản phẩm ${donhangSanpham.sanpham?.title} - Giá: ${oldGiaban} → ${giaban} (từ ${giaSource})`);
                  } else {
                    // Giá không đổi, nhưng vẫn tính tongchua để cập nhật tongtien
                    console.log(`ℹ️ Sản phẩm ${donhangSanpham.sanpham?.title} - Giá không đổi: ${giaban} (từ ${giaSource})`);
                  }
                } else {
                  // Nếu không có giá hợp lệ, vẫn cộng ttnhan hiện tại vào tongchua
                  const currentTtnhan = Number(donhangSanpham.ttnhan) || 0;
                  tongchua += currentTtnhan;
                  console.warn(`⚠️ Sản phẩm ${donhangSanpham.sanpham?.title} - ${giaSource}, sử dụng ttnhan hiện tại: ${currentTtnhan}`);
                }
              }

              // 5. 🔥 BUGFIX: Luôn tính lại tổng tiền cho đơn hàng dựa trên tongchua
              // Không chỉ khi hasUpdates = true, vì slnhan có thể đã thay đổi trước đó
              // Lưu giá trị cũ của đơn hàng
              const oldTongvat = Number(donhang.tongvat) || 0;
              const oldTongtien = Number(donhang.tongtien) || 0;

              const vatRate = donhang.isshowvat ? (Number(donhang.vat) || 0) : 0;
              const tongvat = tongchua * (vatRate);
              const tongtien = tongchua + tongvat;

              // Chỉ cập nhật nếu có sự thay đổi về tổng tiền
              const hasTotalChange = Math.abs(tongtien - oldTongtien) > 0.01; // Tolerance cho làm tròn

              if (hasTotalChange || hasUpdates) {
                await prisma.donhang.update({
                  where: { id: donhangId },
                  data: {
                    tongvat: tongvat,
                    tongtien: tongtien,
                  },
                });

                // Ghi log audit cho việc cập nhật tổng tiền đơn hàng
                await prisma.auditLog.create({
                  data: {
                    entityName: 'Donhang',
                    entityId: donhang.id,
                    action: 'UPDATE',
                    oldValues: {
                      tongvat: oldTongvat,
                      tongtien: oldTongtien,
                    },
                    newValues: {
                      tongvat: tongvat,
                      tongtien: tongtien,
                    },
                    changedFields: ['tongvat', 'tongtien'],
                    metadata: {
                      action: 'DONGBOGIA_TOTAL',
                      madonhang: donhang.madonhang,
                      khachhangId: donhang.khachhang?.id,
                      khachhangName: donhang.khachhang?.name,
                      banggiaId: banggiaUuTien.id,
                      mabanggia: banggiaUuTien.mabanggia,
                      tongchua: tongchua,
                      vatRate: vatRate,
                      tongtienDifference: tongtien - oldTongtien,
                      percentChange: oldTongtien > 0 ? ((tongtien - oldTongtien) / oldTongtien * 100).toFixed(2) + '%' : 'N/A',
                      updatedProductsCount: donhang.sanpham.length,
                      reason: hasUpdates ? 'Price changed' : 'Total recalculation (slnhan may have changed)',
                    },
                    status: 'SUCCESS',
                  },
                });

                console.log(`✅ Cập nhật tổng tiền đơn hàng ${donhang.madonhang}: Tổng chưa VAT: ${tongchua}, VAT: ${tongvat}, Tổng tiền: ${oldTongtien} → ${tongtien} ${hasUpdates ? '(giá thay đổi)' : '(tính lại từ slnhan)'}`);
              } else {
                console.log(`ℹ️ Đơn hàng ${donhang.madonhang}: Tổng tiền không thay đổi (${tongtien})`);
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
        khachhang: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return result.map(({ khachhang, sanpham, ...donhang }) => {
      return {
        ...donhang,
        name: khachhang?.name,
        diachi: khachhang?.diachi,
        sdt: khachhang?.sdt,
        gionhanhang: khachhang?.gionhanhang,
        machuyen: khachhang?.machuyen,
        tongsomon: sanpham.length,
        soluongtt: parseFloat(sanpham.reduce((total, item: any) => total + Number(item.slgiao || 0), 0).toFixed(3)),
        loadpoint: parseFloat(sanpham.reduce((total, item: any) => total + (Number(item.sanpham?.loadpoint || 0) * Number(item.sldat || 0)), 0).toFixed(3)),
        // ✅ nhanvienchiahang and shipper are now string fields
        shipper: donhang.shipper || null,
        nhanvienchiahang: donhang.nhanvienchiahang || null,
        phieuve: donhang.phieuve,
        giodi: donhang.giodi,
        giove: donhang.giove,
        kynhan: donhang.kynhan,
      };
    });
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
        // khachhang: true,
        khachhang: { include: { banggia: {select: {id:true,title:true,mabanggia:true}} } },
        banggia: {select: {id:true,title:true,mabanggia:true}},
      },
    });
    if (!result) {
      throw new NotFoundException('DonHang not found');
    }

    return {
      ...result,
      loadpoint: parseFloat(result?.sanpham?.reduce((total, item: any) => total + (Number(item.sanpham?.loadpoint || 0) * Number(item.sldat || 0)), 0).toFixed(3)),
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
          vat: result.isshowvat ? parseFloat((item.vat ?? 0).toFixed(3)) : 0,
          ttsauvat: result.isshowvat ? parseFloat((item.ttnhan * (1 + (item.vat || 0))).toFixed(3)) : parseFloat(item.ttnhan.toFixed(3)),
          ghichu: item.ghichu,
        };
      })
    };
  }

  async findAll() {
    return await PerformanceLogger.logAsync('DonhangService.findAll', async () => {
      const donhangs = await this.prisma.donhang.findMany({
      include: {
        sanpham: {
          include: {
            sanpham: true,
          },
        },
        khachhang: true,
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
    });
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
        khachhang: true,
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
      khachhang: donhang.khachhang || null,
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
        khachhang: true,
      },
    });
    if (!donhang) throw new NotFoundException('DonHang not found');
    const result = {
      ...donhang,
      sanpham: donhang.sanpham.map((item) => {
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
    
    // ✅ FIX: Track duplicate products per customer to merge quantities
    const productTracker: Record<string, Map<string, any>> = {};
    
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
        // Initialize product tracker for this customer
        productTracker[curr.makh] = new Map();
      }
      
      const sanphamRecord = await this.prisma.sanpham.findFirst({
        where: { masp: curr.masp },
      });
      
      // ✅ FIX: Check if product already exists for this customer
      const tracker = productTracker[curr.makh];
      const existingProduct = tracker.get(curr.masp);
      
      if (existingProduct) {
        // Product already exists - merge quantities
        console.log(`⚠️ [IMPORT] Duplicate product ${curr.masp} for customer ${curr.makh} - merging quantities`);
        existingProduct.sldat = Number(existingProduct.sldat) + Number(curr.sldat);
        existingProduct.slgiao = Number(existingProduct.slgiao) + Number(curr.slgiao);
        existingProduct.slnhan = Number(existingProduct.slnhan) + Number(curr.slnhan);
        
        // Append notes if different
        if (curr.ghichu && curr.ghichu !== existingProduct.ghichu) {
          existingProduct.ghichu = existingProduct.ghichu 
            ? `${existingProduct.ghichu}; ${curr.ghichu}` 
            : curr.ghichu;
        }
      } else {
        // New product - add to tracker and list
        const productData = {
          masp: curr.masp,
          id: sanphamRecord?.id,
          sldat: Number(curr.sldat),
          slgiao: Number(curr.slgiao),
          slnhan: Number(curr.slnhan),
          ghichu: curr.ghichu,
        };
        
        tracker.set(curr.masp, productData);
        acc[curr.makh].sanpham.push(productData);
      }
    }
    const convertData: any = Object.values(acc);
    
    // ✅ Enhanced tracking with detailed results
    let success = 0;
    let fail = 0;
    const successList: any[] = [];
    const failList: any[] = [];
    const duplicateInfo: any[] = [];
    
    for (const element of convertData) {
      try {
        const result = await this.create(element);
        success += 1;
        successList.push({
          makh: element.makh,
          name: element.name,
          madonhang: result.madonhang,
          totalProducts: element.sanpham.length,
          ngaygiao: element.ngaygiao
        });
        
        // Track if any products were merged (duplicates detected)
        const mergedProducts = element.sanpham.filter((sp: any) => 
          sp.sldat > 0 || sp.slgiao > 0 || sp.slnhan > 0
        );
        if (mergedProducts.length < data.filter((d: any) => d.makh === element.makh).length) {
          duplicateInfo.push({
            makh: element.makh,
            originalCount: data.filter((d: any) => d.makh === element.makh).length,
            mergedCount: mergedProducts.length,
            saved: data.filter((d: any) => d.makh === element.makh).length - mergedProducts.length
          });
        }
      } catch (error) {
        console.error(`❌ [IMPORT] Failed to import order for ${element.makh}:`, error.message);

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
        failList.push({
          makh: element.makh,
          name: element.name,
          error: error.message
        });
      }
    }
    
    if (success > 0) {
      this.notificationService.broadcastToAdmins({
        title: 'Import Đơn Hàng Thành Công',
        body: `Đã import thành công ${success} đơn hàng.`,
        url: '/admin/donhang/list',
        type: 'import'
      }).catch(err => console.error('Failed to send notification:', err));
    }
    
    // ✅ Return detailed import summary
    console.log('✅ [IMPORT] Import completed:', {
      total: convertData.length,
      success,
      fail,
      duplicatesDetected: duplicateInfo.length
    });
    
    return {
      total: convertData.length,
      success,
      fail,
      successList,
      failList,
      duplicateInfo: duplicateInfo.length > 0 ? duplicateInfo : undefined,
      message: `Imported ${success}/${convertData.length} orders successfully${
        duplicateInfo.length > 0 ? `, merged ${duplicateInfo.reduce((sum, d) => sum + d.saved, 0)} duplicate products` : ''
      }`
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

  // Helper method to deduplicate sanpham by idSP
  private deduplicateSanpham(sanpham: any[]) {
    if (!Array.isArray(sanpham)) return [];
    const seen = new Set();
    return sanpham.filter((sp) => {
      const idSP = sp.idSP || sp.id;
      if (!idSP || seen.has(idSP)) return false;
      seen.add(idSP);
      return true;
    });
  }

  
  async create(dto: any) {

    const maxOrderResult = await this.prisma.donhang.aggregate({
      _max: {
      order: true,
      },
    });
    let maxOrder = maxOrderResult._max.order || 0;
    let madonhang = await this.DonhangnumberToCode(maxOrder + 1);
    
    // Kiểm tra mã đơn hàng đã tồn tại chưa với giới hạn attempts để tránh infinite loop
    let existingDonhang = await this.prisma.donhang.findUnique(
      { where: { madonhang } }
    );

    // Nếu mã đã tồn tại, tăng maxOrder cho đến khi tìm được mã chưa tồn tại
    let attempts = 0;
    const maxOrderAttempts = 50;
    
    while (existingDonhang && attempts < maxOrderAttempts) {
      maxOrder++;
      madonhang = await this.DonhangnumberToCode(maxOrder + 1);
      existingDonhang = await this.prisma.donhang.findUnique({
        where: { madonhang },
      });
      attempts++;
    }
    
    if (existingDonhang) {
      throw new InternalServerErrorException(
        `Không thể tạo mã đơn hàng duy nhất sau ${maxOrderAttempts} lần thử`
      );
    }    



    const result = await this.prisma.$transaction(async (prisma) => {
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
          vat: dto.vat !== undefined ? parseFloat(dto.vat.toString()) : (khachhang.loaikh === 'khachsi' && !khachhang.isshowvat ? 0 : 0.05), // Default 0 for khachsi without VAT, else 5%
          isActive: dto.isActive,
          order: maxOrder + 1,
          ghichu: dto.ghichu,
          khoId: dto.khoId || DEFAUL_KHO_ID,
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
              
              // ✅ FIX: Deduplicate sanpham before mapping to prevent x2/x3 items
              const uniqueSanpham = this.deduplicateSanpham(sanphamArray);
              
              return uniqueSanpham.map((sp) => {
                return {
                  idSP: sp.idSP || sp.id,
                  giaban: parseFloat((sp.giaban || 0).toString()),
                  ghichu: sp.ghichu || '', // Keep original user note
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
                };
              });
            })()
          },
        },
        include: {
          sanpham: true,
        },
      });

      // Calculate totals using correct VAT rate
      const vatRate = khachhang.isshowvat ? parseFloat((dto.vat || 0.05).toString()) : 0;
      
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
        const vat = khachhang.isshowvat ? parseFloat((sp.vat ?? 0).toString()) : 0;
        
        return {
          ...sp,
          giaban: giaban,
          ttdat: giaban * parseFloat((sp.sldat ?? 0).toString()),
          ttgiao: giaban * parseFloat((sp.slgiao ?? 0).toString()),
          ttnhan: giaban * slnhan,
          ttsauvat: (giaban * slnhan) * (1 + vat),
        };
      }) || [];

      // Update donhangsanpham with new prices and create audit logs
      if (updatedSanpham.length > 0) {
        await Promise.all(
          updatedSanpham.map(async (sp) => {
            const originalProduct = dto.sanpham.find(p => (p.idSP || p.id) === (sp.idSP || sp.id));
            const originalPrice = originalProduct ? parseFloat((originalProduct.giaban || 0).toString()) : 0;
            
            // Update price
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
                // Keep original ghichu - DON'T overwrite with metadata
              },
            });
            
            // Create audit log if price changed
            if (sp.giaban !== originalPrice) {
              try {
                await prisma.auditLog.create({
                  data: {
                    entityName: 'Donhangsanpham',
                    entityId: `${newDonhang.id}-${sp.idSP || sp.id}`,
                    action: 'UPDATE',
                    userId: dto.userId || null,
                    oldValues: { giaban: originalPrice },
                    newValues: { giaban: sp.giaban },
                    changedFields: ['giaban'],
                    metadata: {
                      donhangId: newDonhang.id,
                      madonhang: newDonhang.madonhang,
                      sanphamId: sp.idSP || sp.id,
                      banggiaId: dto.banggiaId || khachhang.banggiaId || DEFAUL_BANGGIA_ID,
                      capturedAt: new Date().toISOString(),
                      priceSource: 'banggia',
                      priceChange: {
                        from: originalPrice,
                        to: sp.giaban,
                        difference: sp.giaban - originalPrice,
                        percentChange: originalPrice > 0 ? ((sp.giaban - originalPrice) / originalPrice * 100) : 0
                      },
                      userNote: sp.ghichu || ''
                    }
                  }
                });
              } catch (auditError) {
                // Don't fail order creation if audit log fails
                console.error('Failed to create price audit log:', auditError);
              }
            }
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
            slton: { decrement: incrementValue },
            slchogiao: { increment: incrementValue },
          },
          create: {
            sanphamId: sp.idSP || sp.id,
            slton: -incrementValue,
            slchogiao: incrementValue,
          },
        });
      }
      return newDonhang;
    });

    if (result) {
      const khachhang = result.khachhangId ? await this.prisma.khachhang.findUnique({ where: { id: result.khachhangId } }) : null;
      this.notificationService.broadcastToAdmins({
        title: 'Đơn Hàng Mới',
        body: `Đơn hàng ${result.madonhang} đã được tạo cho KH ${khachhang?.name || 'N/A'}.`,
        url: `/admin/donhang/detail/${result.id}`,
        type: 'donhang'
      }).catch(err => console.error('Failed to send notification:', err));
    }

    return result;
  }

  async update(id: string, data: any) {
    return await this.prisma.safeTransaction(async (prisma) => {
      // 1. Get original order with products
      const oldDonhang = await prisma.donhang.findUnique({
        where: { id },
        include: { sanpham: { include: { sanpham: true } } },
      });

      if (!oldDonhang) {
        throw new NotFoundException('Đơn hàng không tồn tại');
      }

      const isStatusChanged = data.status && data.status !== oldDonhang.status;
      const tonkhoOps: any[] = [];

      // 2. Handle Inventory Rollback (if moving AWAY from fulfilled states)
      if (isStatusChanged) {
        if (['dagiao', 'danhan', 'hoanthanh'].includes(oldDonhang.status)) {
          // Re-add slton (because it was deducted during dagiao)
          for (const sp of oldDonhang.sanpham) {
            const val = parseFloat((sp.slgiao ?? 0).toFixed(3));
            if (val > 0) {
              tonkhoOps.push({
                sanphamId: sp.idSP,
                operation: 'increment',
                slton: val,
                slchogiao: val, // Re-add to reservation too so it can be handled by the next state
                reason: `Rollback FROM ${oldDonhang.status} for order ${oldDonhang.madonhang}`
              });
            }
          }
        } else if (oldDonhang.status === 'dadat') {
          // Rollback reservation: Decrease slchogiao and restore slton
          for (const sp of oldDonhang.sanpham) {
            const val = parseFloat((sp.sldat ?? 0).toFixed(3));
            if (val > 0) {
              tonkhoOps.push({
                sanphamId: sp.idSP,
                operation: 'increment',
                slton: val,
                reason: `Rollback reservation FROM DADAT for order ${oldDonhang.madonhang}`
              });
              tonkhoOps.push({
                sanphamId: sp.idSP,
                operation: 'decrement',
                slchogiao: val,
                reason: `Clear reservation FROM DADAT for order ${oldDonhang.madonhang}`
              });
            }
          }
        }
      }

      // 3. Handle Inventory Deduction (if moving TO fulfilled states or updating DADAT)
      const targetStatus = data.status || oldDonhang.status;
      
      if (isStatusChanged || targetStatus === 'dadat') {
        if (['dagiao', 'danhan', 'hoanthanh'].includes(targetStatus)) {
          // Deduct from slton
          const products = data.sanpham || oldDonhang.sanpham.map(sp => ({ id: sp.idSP, slgiao: sp.slgiao || sp.sldat }));
          for (const sp of products) {
            const val = parseFloat((sp.slgiao ?? sp.sldat ?? 0).toFixed(3));
            if (val > 0) {
              tonkhoOps.push({
                sanphamId: sp.id,
                operation: 'decrement',
                sltontt: val,
                slton: val,
                reason: `Physical and Available deduction for ${targetStatus} for order ${oldDonhang.madonhang}`
              });
            }
          }
        } else if (targetStatus === 'dadat') {
          // Just reserve in slchogiao
          const products = data.sanpham || oldDonhang.sanpham.map(sp => ({ id: sp.idSP, sldat: sp.sldat }));
          for (const sp of products) {
            const val = parseFloat((sp.sldat ?? 0).toFixed(3));
            if (val > 0) {
              tonkhoOps.push({
                sanphamId: sp.id,
                operation: 'increment',
                slchogiao: val,
                reason: `Reserve for DADAT for order ${oldDonhang.madonhang}`
              });
            }
          }
        }
      }

      // Execute inventory updates
      if (tonkhoOps.length > 0) {
        await this.tonkhoManager.updateTonkhoAtomic(tonkhoOps);
      }

      // 4. Handle PhieuKho management
      const maphieu = `PX-${oldDonhang.madonhang}`;
      if (isStatusChanged && ['huy', 'choxuly', 'khonggiao', 'dadat'].includes(targetStatus)) {
        // Delete PhieuKho
        const existingPhieu = await prisma.phieuKho.findUnique({ where: { maphieu } });
        if (existingPhieu) {
          await prisma.phieuKhoSanpham.deleteMany({ where: { phieuKhoId: existingPhieu.id } });
          await prisma.phieuKho.delete({ where: { id: existingPhieu.id } });
        }
      } else if (targetStatus === 'dagiao' || (isStatusChanged && targetStatus === 'danhan')) {
        // Upsert PhieuKho
        const phieuData = {
          ngay: data.ngaygiao ? new Date(data.ngaygiao) : (oldDonhang.ngaygiao || new Date()),
          type: 'xuat',
          khoId: DEFAUL_KHO_ID,
          ghichu: data.ghichu || oldDonhang.ghichu,
          isActive: true,
        };
        
        const products = data.sanpham || oldDonhang.sanpham.map(sp => ({ id: sp.idSP, slgiao: sp.slgiao || sp.sldat, ghichu: sp.ghichu }));
        
        await prisma.phieuKho.upsert({
          where: { maphieu },
          create: {
            maphieu,
            ...phieuData,
            sanpham: { create: products.map(p => ({ sanphamId: p.id, soluong: parseFloat(p.slgiao.toString()), ghichu: p.ghichu })) }
          },
          update: {
            ...phieuData,
            sanpham: {
              deleteMany: {},
              create: products.map(p => ({ sanphamId: p.id, soluong: parseFloat(p.slgiao.toString()), ghichu: p.ghichu }))
            }
          }
        });
      }

      // 5. Update Donhang and Products
      const updatedDonhang = await prisma.donhang.update({
        where: { id },
        data: {
          title: data.title,
          type: data.type,
          ngaygiao: data.ngaygiao ? new Date(data.ngaygiao) : undefined,
          khachhangId: data.khachhangId,
          banggiaId: data.banggiaId,
          vat: data.vat !== undefined ? parseFloat(data.vat.toString()) : undefined,
          isActive: data.isActive,
          status: targetStatus,
          ghichu: data.ghichu,
          nhanvienchiahang: data.nhanvienchiahang,
          shipper: data.shipper,
          printCount: data.printCount,
          sanpham: data.sanpham ? {
            deleteMany: {},
            create: this.deduplicateSanpham(data.sanpham).map((sp: any) => ({
              idSP: sp.id || sp.idSP,
              sldat: sp.sldat !== undefined ? parseFloat(sp.sldat.toString()) : 0,
              slgiao: sp.slgiao !== undefined ? parseFloat(sp.slgiao.toString()) : 0,
              slnhan: sp.slnhan !== undefined ? parseFloat(sp.slnhan.toString()) : 0,
              ghichu: sp.ghichu,
              giaban: sp.giaban !== undefined ? parseFloat(sp.giaban.toString()) : 0,
            }))
          } : undefined
        },
        include: { sanpham: true }
      });

      // 6. Final Task: Recalculate totals
      const { tongvat, tongtien } = this.calculateDonhangTotals(
        updatedDonhang.sanpham.map(sp => ({ giaban: sp.giaban, slnhan: sp.slnhan || sp.slgiao || sp.sldat })),
        parseFloat((updatedDonhang.vat || 0).toString())
      );

      return prisma.donhang.update({
        where: { id },
        data: { tongvat, tongtien },
        include: { sanpham: true }
      });
    });
  }
  async danhan(id: string, data: any) {
    return this.update(id, { ...data, status: 'danhan' });
  }

  async dagiao(id: string, data: any) {
    return this.update(id, { ...data, status: 'dagiao' });
  }

  async updatePhieugiao(id: string, data: any) {
    try {
      return await this.prisma.safeTransaction(async (prisma) => {
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
            tongtien: parseFloat((data.tongtien ?? 0).toFixed(3)),
            tongvat: parseFloat((data.tongvat ?? 0).toFixed(3))
          },
          include: {
            sanpham: true,
          },
        });

        // Get current sanpham IDs in database
        const currentSanpham = await prisma.donhangsanpham.findMany({
          where: { donhangId: id },
          select: { idSP: true }
        });
        
        const currentSanphamIds = currentSanpham.map(sp => sp.idSP);
        const newSanphamIds = data.sanpham.map((sp: any) => sp.id);
        
        // Delete sanpham that are no longer in the frontend array
        const sanphamToDelete = currentSanphamIds.filter(spId => !newSanphamIds.includes(spId));
        if (sanphamToDelete.length > 0) {
          await prisma.donhangsanpham.deleteMany({
            where: {
              donhangId: id,
              idSP: {
                in: sanphamToDelete
              }
            }
          });
        }

        // OPTIMIZATION: Replace N+1 queries with batch operations using Promise.all
        const updatePromises = data.sanpham.map((sp: any) =>
          prisma.donhangsanpham.updateMany({
            where: { 
              donhangId: id,
              idSP: sp.id 
            },
            data: {
              ghichu: sp.ghichu,
              sldat: parseFloat((Number(sp.sldat) || 0).toFixed(3)),
              slgiao: parseFloat((Number(sp.slgiao) || 0).toFixed(3)),
              slnhan: parseFloat((Number(sp.slnhan) || 0).toFixed(3)),
              ttdat: parseFloat((Number(sp.ttdat) || 0).toFixed(3)),
              ttgiao: parseFloat((Number(sp.ttgiao) || 0).toFixed(3)),
              ttnhan: parseFloat((Number(sp.ttnhan) || 0).toFixed(3)),
              vat: parseFloat((Number(sp.vat) || 0).toFixed(3)),
              ttsauvat: parseFloat((Number(sp.ttsauvat) || 0).toFixed(3)),
            },
          })
        );

        // Execute all updates concurrently instead of sequentially
        await Promise.all(updatePromises);

        return updatedDonhang;
      }, {
        timeout: 45000,  // Increase timeout to 45 seconds
        maxWait: 10000,  // Wait up to 10 seconds for connection
        retries: 2       // Retry twice on timeout
      });
    } catch (error) {
      console.error('Error updating phieugiao:', error);
      throw error;
    }
  }

  async updateBulk(ids: string[], status: string) {
    const BATCH_SIZE = 10;
    let totalSuccess = 0;
    let totalFail = 0;

    // Process in smaller batches to prevent timeout
    for (let i = 0; i < ids.length; i += BATCH_SIZE) {
      const batch = ids.slice(i, i + BATCH_SIZE);
      
      try {
        const batchResult = await this.prisma.safeTransaction(async (prisma) => {
          let success = 0;
          let fail = 0;

          // Process batch items concurrently instead of sequentially
          const batchPromises = batch.map(async (id) => {
            try {
              // 1. Lấy đơn hàng cũ kèm chi tiết sản phẩm
              const oldDonhang = await prisma.donhang.findUnique({
                where: { id },
                include: { sanpham: true },
              });

              if (!oldDonhang) {
                return { success: 0, fail: 1 };
              }

              // 2. Chuyển từ 'dadat' sang 'danhan'
              if (oldDonhang.status === 'dadat' && status === 'danhan') {
                // Batch inventory updates
                const inventoryUpdates = oldDonhang.sanpham.map(sp => {
                  const decValue = parseFloat((sp.sldat ?? 0).toFixed(3));
                  return prisma.tonKho.update({
                    where: { sanphamId: sp.idSP },
                    data: {
                      slchogiao: { decrement: decValue },
                      slton: { decrement: decValue },
                    },
                  });
                });

                await Promise.all(inventoryUpdates);

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

                // Create phieu xuat kho
                const maphieuNew = `PX-${oldDonhang.madonhang}-${this.formatDateForFilename()}`;
                const phieuPayload = {
                  ngay: oldDonhang.ngaygiao
                    ? new Date(oldDonhang.ngaygiao)
                    : new Date(),
                  type: 'xuat',
                  khoId: 'DEFAUL_KHO_ID', // Define this constant
                  ghichu: oldDonhang.ghichu || 'Xuất kho hàng loạt',
                  isActive: true,
                };

                // Handle phieuKho upsert
                const existingPhieu = await prisma.phieuKho.findUnique({
                  where: { maphieu: maphieuNew },
                  include: { sanpham: true },
                });

                if (existingPhieu) {
                  await prisma.phieuKhoSanpham.deleteMany({
                    where: { phieuKhoId: existingPhieu.id },
                  });

                  await prisma.phieuKho.update({
                    where: { maphieu: maphieuNew },
                    data: {
                      ...phieuPayload,
                      sanpham: {
                        create: uniqueSanpham,
                      },
                    },
                  });
                } else {
                  await prisma.phieuKho.create({
                    data: {
                      maphieu: maphieuNew,
                      ...phieuPayload,
                      sanpham: {
                        create: uniqueSanpham,
                      },
                    },
                  });
                }

                // Update order status and quantities
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
              }

              return { success: 1, fail: 0 };
            } catch (error) {
              console.error(`Error updating donhang ${id}:`, error);
              return { success: 0, fail: 1 };
            }
          });

          const results = await Promise.all(batchPromises);
          
          results.forEach(result => {
            success += result.success;
            fail += result.fail;
          });

          return { success, fail };
        }, {
          timeout: 60000,  // 60 seconds for bulk operations
          maxWait: 10000,
          retries: 2
        });

        totalSuccess += batchResult.success;
        totalFail += batchResult.fail;
        
        // Add small delay between batches to prevent overwhelming database
        if (i + BATCH_SIZE < ids.length) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      } catch (error) {
        console.error(`Batch ${Math.floor(i/BATCH_SIZE) + 1} failed:`, error);
        totalFail += batch.length;
      }
    }

    return { success: totalSuccess, fail: totalFail };
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
    const result = await this.prisma.$transaction(async (prisma) => {
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

        // Cập nhật số lượng nhận trong donhangsanpham và tính lại ttnhan, ttsauvat
        let tongchua = 0;
        
        for (const sp of donhang.sanpham) {
          const giaban = parseFloat((sp.giaban || 0).toString());
          const vat = parseFloat((sp.vat || 0).toString());
          const newSlnhan = parseFloat(data.slnhan.toString());
          
          // 🔥 Tính lại ttnhan và ttsauvat dựa trên slnhan
          const ttnhan = giaban * newSlnhan;
          const ttsauvat = ttnhan * (1 + vat);
          
          tongchua += ttnhan;
          
          await prisma.donhangsanpham.update({
            where: { id: sp.id },
            data: {
              slnhan: newSlnhan,
              ttnhan: parseFloat(ttnhan.toFixed(3)),
              ttsauvat: parseFloat(ttsauvat.toFixed(3)),
              ghichu: data.ghichu
            }
          });

          // 🎯 QUAN TRỌNG: Cập nhật TonKho - giảm slchogiao về 0
          const oldSlgiao = parseFloat((sp.slgiao || 0).toString());
          
          // Nếu nhận đủ: slchogiao = 0
          // Nếu nhận thiếu: hoàn lại phần thiếu vào slton
          const shortage = oldSlgiao - newSlnhan;
          
          await this.updateTonKhoSafely(sp.idSP, {
            sltontt: { decrement: newSlnhan },
            slchogiao: { decrement: oldSlgiao }, // Release reservation
            slton: { increment: shortage } // Restore slton ONLY if there was a shortage (ordered > delivered)
          });
        }
        
        // 🔥 Tính lại tổng tiền cho đơn hàng
        const vatRate = parseFloat((donhang.vat || 0).toString());
        const tongvat = tongchua * vatRate;
        const tongtien = tongchua + tongvat;
        
        await prisma.donhang.update({
          where: { id },
          data: {
            tongtien: parseFloat(tongtien.toFixed(3)),
            tongvat: parseFloat(tongvat.toFixed(3)),
          }
        });

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
            // 🔥 Tính lại tổng tiền cho đơn hàng
            let tongchua = 0;
            
            // Collect all sanpham updates for this order
            const sanphamUpdates = order.sanpham.map(sp => {
              const giaban = parseFloat((sp.giaban || 0).toString());
              const vat = parseFloat((sp.vat || 0).toString());
              const slnhan = parseFloat((sp.slgiao || 0).toString()); // slnhan = slgiao khi auto-complete
              
              // 🔥 Tính lại ttnhan và ttsauvat
              const ttnhan = giaban * slnhan;
              const ttsauvat = ttnhan * (1 + vat);
              
              tongchua += ttnhan;
              
              return {
                id: sp.id,
                slnhan: slnhan,
                ttnhan: parseFloat(ttnhan.toFixed(3)),
                ttsauvat: parseFloat(ttsauvat.toFixed(3)),
                ghichu: (sp.ghichu || '') + ' | Auto-completed for inventory close'
              };
            });

            // 🔥 Tính tổng tiền đơn hàng
            const vatRate = parseFloat((order.vat || 0).toString());
            const tongvat = tongchua * vatRate;
            const tongtien = tongchua + tongvat;

            // Update order status
            await prisma.donhang.update({
              where: { id: order.id },
              data: {
                status: 'danhan',
                tongtien: parseFloat(tongtien.toFixed(3)),
                tongvat: parseFloat(tongvat.toFixed(3)),
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
                  ttnhan: update.ttnhan,
                  ttsauvat: update.ttsauvat,
                  ghichu: update.ghichu
                }
              });
            }

            // Update TonKho using atomic operations
            for (const sp of order.sanpham) {
              await this.tonkhoManager.updateTonkhoAtomic([{
                sanphamId: sp.idSP,
                operation: 'decrement',
                sltontt: parseFloat(sp.slgiao.toString()),
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

  /**
   * ✅ Get price metadata from donhangsanpham ghichu field
   */
  extractPriceMetadata(ghichu: string): any {
    try {
      if (!ghichu) return null;
      return JSON.parse(ghichu);
    } catch (error) {
      // ghichu is not JSON, might be plain text note
      return { userNote: ghichu };
    }
  }

  /**
   * ✅ Verify order price against price history
   * Returns discrepancies if any
   */
  async verifyOrderPrices(donhangId: string): Promise<any> {
    try {
      const donhang = await this.prisma.donhang.findUnique({
        where: { id: donhangId },
        include: {
          sanpham: {
            include: {
              sanpham: { select: { masp: true, title: true } }
            }
          },
          banggia: { select: { mabanggia: true, title: true } }
        }
      });

      if (!donhang) {
        throw new NotFoundException('Đơn hàng không tồn tại');
      }

      const discrepancies: any[] = [];

      for (const item of donhang.sanpham) {
        // Extract price metadata
        const metadata = this.extractPriceMetadata(item.ghichu || '');
        
        if (!metadata?.banggiaId || !metadata?.capturedAt) {
          discrepancies.push({
            sanphamId: item.idSP,
            sanphamCode: item.sanpham.masp,
            issue: 'NO_PRICE_METADATA',
            message: 'Không có thông tin giá gốc'
          });
          continue;
        }

        // Get current price from banggia
        try {
          const currentPrice = await this.priceHistoryService.getCurrentPrice(
            metadata.banggiaId,
            item.idSP
          );

          if (!currentPrice) {
            discrepancies.push({
              sanphamId: item.idSP,
              sanphamCode: item.sanpham.masp,
              issue: 'PRICE_NOT_FOUND',
              message: 'Không tìm thấy giá hiện tại'
            });
            continue;
          }

          const orderPrice = Number(item.giaban);
          const currentPriceValue = currentPrice; // getCurrentPrice already returns a number

          if (orderPrice !== currentPriceValue) {
            const priceDiff = currentPriceValue - orderPrice;
            const percentChange = ((priceDiff / orderPrice) * 100).toFixed(2);

            discrepancies.push({
              sanphamId: item.idSP,
              sanphamCode: item.sanpham.masp,
              sanphamTitle: item.sanpham.title,
              issue: 'PRICE_CHANGED',
              orderPrice: orderPrice,
              currentPrice: currentPriceValue,
              difference: priceDiff,
              percentChange: parseFloat(percentChange),
              capturedAt: metadata.capturedAt,
              message: `Giá đã thay đổi ${percentChange}% so với khi đặt hàng`
            });
          }
        } catch (error) {
          discrepancies.push({
            sanphamId: item.idSP,
            sanphamCode: item.sanpham.masp,
            issue: 'VERIFICATION_ERROR',
            message: error.message
          });
        }
      }

      return {
        donhangId: donhang.id,
        madonhang: donhang.madonhang,
        verifiedAt: new Date().toISOString(),
        totalItems: donhang.sanpham.length,
        discrepancies: discrepancies,
        hasDiscrepancies: discrepancies.length > 0
      };
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Error verifying order prices'
      );
    }
  }

  /**
   * ✅ Get price at specific date from history
   */
  async getPriceAtDate(banggiaId: string, sanphamId: string, date: Date): Promise<any> {
    try {
      const history = await this.priceHistoryService.getPriceHistory(banggiaId, sanphamId);
      
      if (!history || !Array.isArray(history) || history.length === 0) {
        return null;
      }

      // Find the price that was valid at the given date
      const targetDate = new Date(date);
      
      // Sort history by changedAt descending (history is already an array)
      const sortedHistory = history.sort((a: any, b: any) => 
        new Date(b.changedAt).getTime() - new Date(a.changedAt).getTime()
      );

      // Find the first price change that happened before or at the target date
      for (const change of sortedHistory) {
        const changeDate = new Date(change.changedAt);
        if (changeDate <= targetDate) {
          return {
            banggiaId,
            sanphamId,
            date: date,
            price: change.newPrice,
            priceChangeDate: change.changedAt,
            metadata: change
          };
        }
      }

      // If no price change found before target date, return the oldest price
      const oldestChange = sortedHistory[sortedHistory.length - 1];
      return {
        banggiaId,
        sanphamId,
        date: date,
        price: oldestChange.oldPrice || oldestChange.newPrice,
        priceChangeDate: oldestChange.changedAt,
        note: 'Price before first recorded change'
      };
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Error getting price at date'
      );
    }
  }

  /**
   * ⭐ NEW: Update product price in order with audit trail
   */
  async updateProductPrice(dto: UpdateProductPriceDto) {
    try {
      // Validate order status
      const donhang = await this.prisma.donhang.findUnique({
        where: { id: dto.donhangId },
        include: {
          sanpham: {
            where: { id: dto.donhangsanphamId },
            include: { sanpham: true }
          }
        }
      });

      if (!donhang) {
        throw new NotFoundException(`Đơn hàng không tồn tại`);
      }

      // Không cho sửa đơn đã giao/hoàn thành
      if (donhang.status === 'dagiao' || donhang.status === 'hoanthanh') {
        throw new BadRequestException('Không thể sửa giá đơn hàng đã giao/hoàn thành');
      }

      const donhangsanpham = donhang.sanpham[0];
      if (!donhangsanpham) {
        throw new NotFoundException('Sản phẩm không tồn tại trong đơn hàng');
      }

      const oldPrice = Number(donhangsanpham.giaban);

      // Validate price change percentage
      const changePercent = oldPrice !== 0 ? ((dto.newPrice - oldPrice) / oldPrice) * 100 : 0;
      
      // Require reason if change > 20%
      if (Math.abs(changePercent) > 20 && !dto.changeReason) {
        throw new BadRequestException('Thay đổi giá > 20% yêu cầu nhập lý do');
      }

      // Execute in transaction
      return await this.prisma.$transaction(async (tx) => {
        // 1. Update price
        const updated = await tx.donhangsanpham.update({
          where: { id: dto.donhangsanphamId },
          data: {
            giaban: dto.newPrice,
            ttnhan: dto.newPrice * Number(donhangsanpham.slnhan),
            ttgiao: dto.newPrice * Number(donhangsanpham.slgiao),
            ttdat: dto.newPrice * Number(donhangsanpham.sldat),
          }
        });

        // 2. Track in audit log
        await this.donhangPriceHistoryService.trackDonhangPriceChange(dto, oldPrice);

        // 3. Recalculate order totals
        const allProducts = await tx.donhangsanpham.findMany({
          where: { donhangId: dto.donhangId }
        });

        const tongtien = allProducts.reduce((sum, p) => sum + Number(p.ttnhan), 0);
        const tongvat = tongtien * (Number(donhang.vat || 0) / 100);

        await tx.donhang.update({
          where: { id: dto.donhangId },
          data: {
            tongtien,
            tongvat
          }
        });

        return {
          success: true,
          message: 'Cập nhật giá thành công',
          data: {
            donhangsanphamId: dto.donhangsanphamId,
            sanpham: donhangsanpham.sanpham.title,
            oldPrice,
            newPrice: dto.newPrice,
            changePercent: changePercent.toFixed(2) + '%',
            newTotals: {
              tongtien,
              tongvat,
              tongcong: tongtien + tongvat
            }
          }
        };
      });
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(
        error.message || 'Lỗi khi cập nhật giá sản phẩm'
      );
    }
  }

  /**
   * ⭐ NEW: Get price audit history for order
   */
  async getDonhangPriceAudit(donhangId: string) {
    try {
      return await this.donhangPriceHistoryService.getDonhangPriceAudit({ 
        donhangId,
        limit: 100 
      });
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Lỗi khi lấy lịch sử giá'
      );
    }
  }
}