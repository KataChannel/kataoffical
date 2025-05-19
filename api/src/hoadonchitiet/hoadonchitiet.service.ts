import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ErrorlogService } from 'src/errorlog/errorlog.service';
import { SocketGateway } from 'src/socket.gateway';
import * as moment from 'moment';
import * as ExcelJS from 'exceljs';
import { Readable } from 'stream';

@Injectable()
export class HoadonchitietService {
  constructor(
    private readonly prisma: PrismaService,
    private _SocketGateway: SocketGateway,
    private _ErrorlogService: ErrorlogService,
  ) {}

  async getLastUpdatedhoadonChitiet(): Promise<{ updatedAt: number }> {
    try {
      const lastUpdated = await this.prisma.hoadonChitiet.aggregate({
        _max: { updatedAt: true },
      });
      return {
        updatedAt: lastUpdated._max.updatedAt
          ? new Date(lastUpdated._max.updatedAt).getTime()
          : 0,
      };
    } catch (error) {
      this._ErrorlogService.logError('getLastUpdatedhoadonChitiet', error);
      if (error instanceof HttpException) throw error;
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async generateCodeId(): Promise<string> {
    try {
      const latest = await this.prisma.hoadonChitiet.findFirst({
        orderBy: { codeId: 'desc' },
      });
      let nextNumber = 1;
      if (latest && latest.codeId) {
        const prefix = 'DONHANG';
        const match = latest.codeId.match(new RegExp(prefix + '(\d+)'));
        if (match) {
          nextNumber = parseInt(match[1]) + 1;
        }
      }
      const newPrefix = 'DONHANG';
      return `${newPrefix}${nextNumber.toString().padStart(5, '0')}`;
    } catch (error) {
      this._ErrorlogService.logError('generatehoadonChitietCodeId', error);
      if (error instanceof HttpException) throw error;
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(data: any) {
    try {
      const maxOrder = await this.prisma.hoadonChitiet.aggregate({
        _max: { order: true },
      });
      const newOrder = (maxOrder._max?.order || 0) + 1;
      const codeId = await this.generateCodeId();
      // Ensure data includes a valid idhoadon
      const { id, idhoadon, ...rest } = data;
      const hoadonExists = await this.prisma.hoadon.findFirst({
        where: { id: idhoadon },
      });

      if (!hoadonExists) {
        throw new HttpException(
          'Referenced Hoadon not found',
          HttpStatus.BAD_REQUEST,
        );
      }

      const created = await this.prisma.hoadonChitiet.create({
        data: {
          ...rest,
          order: newOrder,
          codeId: codeId,
          idhoadon: idhoadon,
        },
      });
      this._SocketGateway.sendUpdate('hoadonchitiet');
      return created;
    } catch (error) {
      this._ErrorlogService.logError('createhoadonChitiet', error);
      if (error instanceof HttpException) throw error;
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findBy(param: any) {
    try {
      const { isOne, page = 1, limit = 20, ...where } = param;
      if (isOne) {
        const result = await this.prisma.hoadonChitiet.findFirst({
          where,
          orderBy: { order: 'asc' },
        });
        return result;
      }
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.prisma.hoadonChitiet.findMany({
          where,
          skip,
          take: limit,
          orderBy: { order: 'asc' },
        }),
        this.prisma.hoadonChitiet.count({ where }),
      ]);
      return {
        data,
        total,
        page,
        pageCount: Math.ceil(total / limit),
      };
    } catch (error) {
      this._ErrorlogService.logError('findByhoadonChitiet', error);
      if (error instanceof HttpException) throw error;
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(page: number = 1, limit: number = 20) {
    try {
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.prisma.hoadonChitiet.findMany({
          skip,
          take: limit,
          orderBy: { order: 'asc' },
          include: {
            hoadon: {
              select: {
                ntao: true,
                tdlap: true,
                thlap: true,
              },
            },
          },
        }),
        this.prisma.hoadonChitiet.count(),
      ]);
      const result = data.map((item) => {
        const { hoadon, ...rest } = item;
        return {
          ...rest,
          ntao: hoadon?.ntao ? new Date(hoadon.ntao).toLocaleDateString() : '',
          tdlap: hoadon?.tdlap
            ? new Date(hoadon.tdlap).toLocaleDateString()
            : '',
          thlap: hoadon?.thlap
            ? hoadon.thlap.toString().replace(/^(\d{4})(\d{2})$/, '$2/$1')
            : '',
        };
      });
      return {
        data: result,
        total,
        page,
        pageCount: Math.ceil(total / limit),
      };
    } catch (error) {
      this._ErrorlogService.logError('findAllhoadonChitiet', error);
      if (error instanceof HttpException) throw error;
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  formatDate(date) {
    if (typeof date === 'string') {
      date = new Date(date);
    }

    if (!(date instanceof Date) || isNaN(date.getTime())) {
      throw new Error('Invalid date');
    }

    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  }

  formatMonth(date) {
    if (typeof date === 'string') {
      date = new Date(date);
    }

    if (!(date instanceof Date) || isNaN(date.getTime())) {
      throw new Error('Invalid date');
    }
    return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  }

  async xuatnhapton(param: any) {
    delete param.isDownload;
    const {
      page = 1,
      limit = 20,
      sizesp = 10,
      batdau,
      ketthuc,
      ...where
    } = param;
    try {
      const skip = (page - 1) * limit;
      const dateFilter =
        batdau && ketthuc
          ? {
              hoadon: {
                tdlap: {
                  gte: new Date(batdau),
                  lte: new Date(ketthuc),
                },
              },
            }
          : {};
      const [hoadonchitiets, total, mathangs] = await Promise.all([
        this.prisma.hoadonChitiet.findMany({
          skip,
          take: limit,
          orderBy: { order: 'asc' },
          where: { ...where, ...dateFilter },
          include: {
            hoadon: {
              select: { ntao: true, tdlap: true, thlap: true, nbmst: true },
            },
          },
        }),
        this.prisma.hoadonChitiet.count({
          where: { ...where, ...dateFilter },
        }),
        this.prisma.mathang.findMany(),
      ]);
      const productDetails: {
        [title2: string]: { code: string; unit: string };
      } = {};
      mathangs.forEach((item: any) => {
        if (item.title) {
          productDetails[item.title2] = {
            code: item.title2,
            unit: item.dvtinh || 'N/A',
          };
        }
      });
      const dailyMap: { [key: string]: any } = {};
      // console.log('hoadonchitiets', hoadonchitiets);
      hoadonchitiets.forEach((item: any) => {
        if (item.title && item.sluong && item.hoadon && item.hoadon.ntao) {
          const date = new Date(item.hoadon.ntao);
          const dateStr = moment(date).format('DD/MM/YYYY');
          const key = `${item.title}_${dateStr}`;
          if (!dailyMap[key]) {
        dailyMap[key] = {
          ngay: dateStr,
          ma: item.title,
          sanpham: item.ten,
          donvi: item.dvtinh || 'N/A',
          dauNgay: 0,
          nhapNgay: 0,
          xuatNgay: 0,
          cuoiNgay: 0,
          ttdauNgay: 0,
          ttnhapNgay: 0,
          ttxuatNgay: 0,
          ttcuoiNgay: 0,
          thang: this.formatMonth(date),
          tongNhapThang: 0,
          tongXuatThang: 0,
          tongCuoiThang: 0,
          ttnhapThang: 0,
          ttxuatThang: 0,
          ttcuoiThang: 0,
          nam: date.getFullYear(),
          tongNhapNam: 0,
          tongXuatNam: 0,
          tongCuoiNam: 0,
          ttnhapNam: 0,
          ttxuatNam: 0,
          ttcuoiNam: 0,
        };
          }
      
          if (item.hoadon.nbmst === '5900363291') {
        // Incoming transaction
        dailyMap[key].nhapNgay += item.sluong || 0;
        dailyMap[key].ttnhapNgay += item.thtien || 0;
        dailyMap[key].tongNhapThang += item.sluong || 0;
        dailyMap[key].ttnhapThang += item.thtien || 0;
        dailyMap[key].tongNhapNam += item.sluong || 0;
        dailyMap[key].ttnhapNam += item.thtien || 0;
          } else {
        // Outgoing transaction
        dailyMap[key].xuatNgay += item.sluong || 0;
        dailyMap[key].ttxuatNgay += item.thtien || 0;
        dailyMap[key].tongXuatThang += item.sluong || 0;
        dailyMap[key].ttxuatThang += item.thtien || 0;
        dailyMap[key].tongXuatNam += item.sluong || 0;
        dailyMap[key].ttxuatNam += item.thtien || 0;
          }
      
          // Calculate the daily closing balance for the current day
          dailyMap[key].cuoiNgay =
        dailyMap[key].dauNgay + dailyMap[key].nhapNgay - dailyMap[key].xuatNgay;
          dailyMap[key].ttcuoiNgay =
        dailyMap[key].ttdauNgay + dailyMap[key].ttnhapNgay - dailyMap[key].ttxuatNgay;
        }
      });
      
      // Update subsequent days so that the previous day's closing balance becomes the next day's opening balance.
      const groupedByProduct: { [product: string]: any[] } = {};
      Object.keys(dailyMap).forEach(key => {
        const record = dailyMap[key];
        const productKey = record.ma;
        if (!groupedByProduct[productKey]) {
          groupedByProduct[productKey] = [];
        }
        groupedByProduct[productKey].push(record);
      });
      
      Object.values(groupedByProduct).forEach(records => {
        records.sort((a, b) => {
          const dateA = moment(a.ngay, 'DD/MM/YYYY').toDate().getTime();
          const dateB = moment(b.ngay, 'DD/MM/YYYY').toDate().getTime();
          return dateA - dateB;
        });
        for (let i = 1; i < records.length; i++) {
          // Set opening balances of the current day to previous day's closing balances.
          records[i].dauNgay = records[i - 1].cuoiNgay;
          records[i].ttdauNgay = records[i - 1].ttcuoiNgay;
          // Recalculate the closing balances with the updated opening balances.
          records[i].cuoiNgay =
        records[i].dauNgay + records[i].nhapNgay - records[i].xuatNgay;
          records[i].ttcuoiNgay =
        records[i].ttdauNgay + records[i].ttnhapNgay - records[i].ttxuatNgay;
        }
      });
      
      const baoCaoHangNgay = Object.values(dailyMap);

      // const monthlyMap: { [key: string]: any } = {};
      // const yearlyMap: { [key: string]: any } = {};
      // baoCaoHangNgay.forEach((record: any) => {
      //   const monthKey = `${record.ma}_${moment(record.date).format('MM/YYYY')}`;
      //   if (!monthlyMap[monthKey]) {
      //     monthlyMap[monthKey] = {
      //       thang: moment(record.date).format('MM/YYYY'),
      //       sanpham: record.sanpham,
      //       ma: record.ma,
      //       donvi: record.donvi,
      //       tongNhapThang: 0,
      //       tongXuatThang: 0,
      //       opening: 0,
      //       closing: 0,
      //     };
      //   }
      //   monthlyMap[monthKey].tongNhapThang += record.nhapNgay;
      //   monthlyMap[monthKey].tongXuatThang += record.xuatNgay;
      //   const yearKey = `${record.ma}_${moment(record.date).format('YYYY')}`;
      //   if (!yearlyMap[yearKey]) {
      //     yearlyMap[yearKey] = {
      //       nam: moment(record.date).format('YYYY'),
      //       sanpham: record.sanpham,
      //       ma: record.ma,
      //       donvi: record.donvi,
      //       tongNhapNam: 0,
      //       tongXuatNam: 0,
      //       opening: 0,
      //       closing: 0,
      //     };
      //   }
      //   yearlyMap[yearKey].tongNhapNam += record.nhapNgay;
      //   yearlyMap[yearKey].tongXuatNam += record.xuatNgay;
      // });

      // Object.values(monthlyMap).forEach((entry: any) => {
      //   entry.opening = 0;
      //   entry.closing = entry.tongNhapThang - entry.tongXuatThang;
      // });
      // Object.values(yearlyMap).forEach((entry: any) => {
      //   entry.opening = 0;
      //   entry.closing = entry.tongNhapNam - entry.tongXuatNam;
      // });

      // const products = new Set<string>([
      //   ...hoadonchitiets
      //     .map((item: any) => item.title)
      //     .filter((t: any) => t != null),
      //   ...mathangs
      //     .map((item: any) => item.title)
      //     .filter((t: any) => t != null),
      // ]);

      // // Use current date as fallback for products with no transactions.

      // const baoCaoTongHop = [...baoCaoHangNgay];
      // console.log('baoCaoTongHop', baoCaoTongHop);

      // products.forEach((product) => {
      //   if (!baoCaoTongHop.some((row: any) => row.ma === product)) {
      //     const mathangItem = mathangs.find(
      //       (item: any) => item.title === product,
      //     );
      //     const productName =
      //       mathangItem && mathangItem.ten ? mathangItem.ten : product;
      //     const details = productDetails[product] || {
      //       code: product,
      //       unit: 'N/A',
      //     };
      //     baoCaoTongHop.push({
      //       ngay: 'N/A',
      //       ma: details.code,
      //       sanpham: productName,
      //       donvi: details.unit,
      //       dauNgay: 0,
      //       nhapNgay: 0,
      //       xuatNgay: 0,
      //       cuoiNgay: 0,
      //       ttnhap: 0,
      //       ttxuat: 0,
      //       thang: 'N/A',
      //       tongNhapThang: 0,
      //       tongXuatThang: 0,
      //       closing: 0,
      //       nam: 'N/A',
      //       tongNhapNam: 0,
      //       tongXuatNam: 0,
      //     });  
      //   }
      // });

    const filteredBaoCaoTongHop = baoCaoHangNgay.filter(
      record => record.ngay !== 'N/A' && record.thang !== 'N/A' && record.nam !== 'N/A',
    );



      return {
        data: filteredBaoCaoTongHop.slice(0, sizesp),
        total,
        totalSP: sizesp,
        page,
        pageCount: Math.ceil(total / limit),
        // monthly: Object.values(monthlyMap),
        // yearly: Object.values(yearlyMap),
      };

    } catch (error) {
      this._ErrorlogService.logError('xuatnhapton', error);
      if (error instanceof HttpException) throw error;
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


    async generateExcel(dulieu: any): Promise<Buffer> {        
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Sheet1');
        console.log('dulieu', dulieu);
        
        if (!dulieu || !dulieu.length) {
            throw new Error('No data provided');
        }

        // Define headers dynamically using the keys of the first object
        const headers = Object.keys(dulieu[0]);
        worksheet.columns = headers.map(key => ({
            header: key.toUpperCase(),
            key,
            width: 20,
        }));
        // Add data in batches
        const batchSize = 10000;
        for (let i = 0; i < dulieu.length; i += batchSize) {
            const batch = dulieu.slice(i, i + batchSize);
            worksheet.addRows(batch);
        }
        // Convert workbook to buffer
        const data = await workbook.xlsx.writeBuffer();
        return Buffer.from(data);
    }


  async mathang(param: any) {
    const { page = 1, pageSize = 50, ...where } = param;
    try {
      const skip = (page - 1) * pageSize;
      const filter = { ...where };
      if (filter.title || filter.title2) {
        const searchTerm = filter.title || filter.title2;
        filter.OR = [
          { title: { contains: searchTerm, mode: 'insensitive' } },
          { title2: { contains: searchTerm, mode: 'insensitive' } },
        ];
        delete filter.title;
        delete filter.title2;
      }
      const [mathangs, total] = await Promise.all([
        this.prisma.mathang.findMany({
          skip,
          take: pageSize,
          orderBy: [{ title: 'asc' }, { giavon: 'asc' }],
          where: filter,
        }),
        this.prisma.mathang.count({
          where: filter,
        }),
      ]);

      return {
        data: mathangs.map((item: any) => {
          item.giavon = Number(item.giavon).toFixed(0);
          return item;
        }),
        total,
        page,
        pageCount: Math.ceil(total / pageSize),
      };
    } catch (error) {
      this._ErrorlogService.logError('mathang', error);
      if (error instanceof HttpException) throw error;
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string) {
    try {
      const item = await this.prisma.hoadonChitiet.findUnique({
        where: { id },
      });
      if (!item)
        throw new HttpException(
          'hoadonChitiet not found',
          HttpStatus.NOT_FOUND,
        );
      return item;
    } catch (error) {
      this._ErrorlogService.logError('findOnehoadonChitiet', error);
      if (error instanceof HttpException) throw error;
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateMathang(id: string, data: any) {
    console.log('data', data);
    // Convert giavon to a float if it exists and is a string
    if (data.giavon && typeof data.giavon === 'string') {
      data.giavon = parseFloat(data.giavon);
    }

    try {
      const updated = await this.prisma.mathang.update({
        where: { id },
        data,
      });
      console.log('updated', updated);

      return updated;
    } catch (error) {
      this._ErrorlogService.logError('updateMathang', error);
      if (error instanceof HttpException) throw error;
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  async update(id: string, data: any) {
    try {
      let updated;
      if (data.order) {
        const { order, ...rest } = data;
        await this.prisma.hoadonChitiet.update({ where: { id }, data: rest });
        updated = await this.prisma.hoadonChitiet.update({
          where: { id },
          data: { order },
        });
      } else {
        updated = await this.prisma.hoadonChitiet.update({
          where: { id },
          data,
        });
      }
      this._SocketGateway.sendUpdate('hoadonchitiet');
      return updated;
    } catch (error) {
      this._ErrorlogService.logError('updatehoadonChitiet', error);
      if (error instanceof HttpException) throw error;
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string) {
    try {
      const deleted = await this.prisma.hoadonChitiet.delete({ where: { id } });
      this._SocketGateway.sendUpdate('hoadonchitiet');
      return deleted;
    } catch (error) {
      this._ErrorlogService.logError('removehoadonChitiet', error);
      if (error instanceof HttpException) throw error;
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async reorderhoadonChitiets(hoadonChitietIds: string[]) {
    try {
      for (let i = 0; i < hoadonChitietIds.length; i++) {
        await this.prisma.hoadonChitiet.update({
          where: { id: hoadonChitietIds[i] },
          data: { order: i + 1 },
        });
      }
      this._SocketGateway.sendUpdate('hoadonchitiet');
      return { status: 'success' };
    } catch (error) {
      this._ErrorlogService.logError('reorderhoadonChitiets', error);
      if (error instanceof HttpException) throw error;
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
