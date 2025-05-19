// import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
// import { PrismaService } from 'prisma/prisma.service';
// import { title } from 'process';
// import { ErrorlogService } from 'src/errorlog/errorlog.service';
// import { SocketGateway } from 'src/socket.gateway';

// @Injectable()
// export class HoadonchitietService {
//   constructor(
//     private readonly prisma: PrismaService,
//     private _SocketGateway: SocketGateway,
//     private _ErrorlogService: ErrorlogService,
//   ) {}

//   async getLastUpdatedhoadonChitiet(): Promise<{ updatedAt: number }> {
//     try {
//       const lastUpdated = await this.prisma.hoadonChitiet.aggregate({
//         _max: { updatedAt: true },
//       });
//       return {
//         updatedAt: lastUpdated._max.updatedAt
//           ? new Date(lastUpdated._max.updatedAt).getTime()
//           : 0,
//       };
//     } catch (error) {
//       this._ErrorlogService.logError('getLastUpdatedhoadonChitiet', error);
//       if (error instanceof HttpException) throw error;
//       throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
//     }
//   }

//   async generateCodeId(): Promise<string> {
//     try {
//       const latest = await this.prisma.hoadonChitiet.findFirst({
//         orderBy: { codeId: 'desc' },
//       });
//       let nextNumber = 1;
//       if (latest && latest.codeId) {
//         const prefix = 'DONHANG';
//         const match = latest.codeId.match(new RegExp(prefix + '(\d+)'));
//         if (match) {
//           nextNumber = parseInt(match[1]) + 1;
//         }
//       }
//       const newPrefix = 'DONHANG';
//       return `${newPrefix}${nextNumber.toString().padStart(5, '0')}`;
//     } catch (error) {
//       this._ErrorlogService.logError('generatehoadonChitietCodeId', error);
//       if (error instanceof HttpException) throw error;
//       throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
//     }
//   }

//   async create(data: any) {
//     try {
//       const maxOrder = await this.prisma.hoadonChitiet.aggregate({
//         _max: { order: true },
//       });
//       const newOrder = (maxOrder._max?.order || 0) + 1;
//       const codeId = await this.generateCodeId();
//       // Ensure data includes a valid idhoadon
//       const { id, idhoadon, ...rest } = data;
//       console.log('Creating hoadonChitiet with idhoadon:', idhoadon);
//       const hoadonExists = await this.prisma.hoadon.findFirst({
//         where: { id: idhoadon },
//       });

//       if (!hoadonExists) {
//         throw new HttpException(
//           'Referenced Hoadon not found',
//           HttpStatus.BAD_REQUEST,
//         );
//       }

//       const created = await this.prisma.hoadonChitiet.create({
//         data: {
//           ...rest,
//           order: newOrder,
//           codeId: codeId,
//           idhoadon: idhoadon,
//         },
//       });
//       this._SocketGateway.sendUpdate('hoadonchitiet');
//       return created;
//     } catch (error) {
//       this._ErrorlogService.logError('createhoadonChitiet', error);
//       if (error instanceof HttpException) throw error;
//       throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
//     }
//   }

//   async findBy(param: any) {
//     try {
//       const { isOne, page = 1, limit = 20, ...where } = param;
//       if (isOne) {
//         const result = await this.prisma.hoadonChitiet.findFirst({
//           where,
//           orderBy: { order: 'asc' },
//         });
//         return result;
//       }
//       const skip = (page - 1) * limit;
//       const [data, total] = await Promise.all([
//         this.prisma.hoadonChitiet.findMany({
//           where,
//           skip,
//           take: limit,
//           orderBy: { order: 'asc' },
//         }),
//         this.prisma.hoadonChitiet.count({ where }),
//       ]);
//       return {
//         data,
//         total,
//         page,
//         pageCount: Math.ceil(total / limit),
//       };
//     } catch (error) {
//       this._ErrorlogService.logError('findByhoadonChitiet', error);
//       if (error instanceof HttpException) throw error;
//       throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
//     }
//   }

//   async findAll(page: number = 1, limit: number = 20) {
//     try {
//       const skip = (page - 1) * limit;
//       const [data, total] = await Promise.all([
//         this.prisma.hoadonChitiet.findMany({
//           skip,
//           take: limit,
//           orderBy: { order: 'asc' },
//           include: {
//             hoadon: {
//               select: {
//                 ntao: true,
//                 tdlap: true,
//                 thlap: true,
//               },
//             },
//           },
//         }),
//         this.prisma.hoadonChitiet.count(),
//       ]);
//       const result = data.map((item) => {
//         const { hoadon, ...rest } = item;
//         return {
//           ...rest,
//           ntao: hoadon?.ntao ? new Date(hoadon.ntao).toLocaleDateString() : '',
//           tdlap: hoadon?.tdlap
//             ? new Date(hoadon.tdlap).toLocaleDateString()
//             : '',
//           thlap: hoadon?.thlap
//             ? hoadon.thlap.toString().replace(/^(\d{4})(\d{2})$/, '$2/$1')
//             : '',
//         };
//       });
//       return {
//         data: result,
//         total,
//         page,
//         pageCount: Math.ceil(total / limit),
//       };
//     } catch (error) {
//       this._ErrorlogService.logError('findAllhoadonChitiet', error);
//       if (error instanceof HttpException) throw error;
//       throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
//     }
//   }
  
//   async xuatnhapton(param) {
//     console.log('param', param);
//     const { isOne, page = 1, limit = 20, batdau, ketthuc, ...where } = param;
//     const Mathang = this.prisma.mathang.findMany();
//     try {
//       const skip = (page - 1) * limit;
//       const dateFilter =
//         batdau && ketthuc
//           ? {
//               hoadon: {
//                 tdlap: {
//                   gte: new Date(batdau),
//                   lte: new Date(ketthuc),
//                 },
//               },
//             }
//           : {};
//       const [data, total] = await Promise.all([
//         this.prisma.hoadonChitiet.findMany({
//           skip,
//           take: limit,
//           orderBy: { order: 'asc' },
//           where: { ...where, ...dateFilter },
//           include: {
//             hoadon: {
//               select: {
//                 ntao: true,
//                 tdlap: true,
//                 thlap: true,
//                 nbmst: true,
//               },
//             },
//           },
//         }),
//         this.prisma.hoadonChitiet.count({
//           where: { ...where, ...dateFilter },
//         }),
//       ]);     
 
//       const mathangs = await this.prisma.mathang.findMany();
//       // const dailyGrouped = hoadonchitiets.reduce((acc, item) => {
//       //   if (!item.hoadon?.tdlap) return acc;
//       //   const date = new Date(item.hoadon.tdlap).toISOString().slice(0, 10);
//       //   if (!acc[date]) {
//       //     acc[date] = { ngay: date, slnhap: 0, ttnhap: 0, slxuat: 0, ttxuat: 0 };
//       //   }
//       //   if (item.hoadon.nbmst === '5900363291') {
//       //     acc[date].slxuat += Number(item.sluong) || 0;
//       //     acc[date].ttxuat += Number(item.thtien) || 0;
//       //   } else {
//       //     acc[date].slnhap += Number(item.sluong) || 0;
//       //     acc[date].ttnhap += Number(item.thtien) || 0;
//       //   }
//       //   return acc;
//       // }, {});
//       // const dailyResult = Object.values(dailyGrouped);

//       // const monthlyGrouped = hoadonchitiets.reduce((acc, item) => {
//       //   if (!item.hoadon?.tdlap) return acc;
//       //   const dt = new Date(item.hoadon.tdlap);
//       //   const monthKey = `${dt.getFullYear()}-${(dt.getMonth() + 1)
//       //     .toString()
//       //     .padStart(2, '0')}`;
//       //   if (!acc[monthKey]) {
//       //     acc[monthKey] = { thang: monthKey, slnhap: 0, ttnhap: 0, slxuat: 0, ttxuat: 0 };
//       //   }
//       //   if (item.hoadon.nbmst === '5900363291') {
//       //     acc[monthKey].slxuat += Number(item.sluong) || 0;
//       //     acc[monthKey].ttxuat += Number(item.thtien) || 0;
//       //   } else {
//       //     acc[monthKey].slnhap += Number(item.sluong) || 0;
//       //     acc[monthKey].ttnhap += Number(item.thtien) || 0;
//       //   }
//       //   return acc;
//       // }, {});
//       // const monthlyResult = Object.values(monthlyGrouped);

//       // const yearlyGrouped = hoadonchitiets.reduce((acc, item) => {
//       //   if (!item.hoadon?.tdlap) return acc;
//       //   const yearKey = new Date(item.hoadon.tdlap).getFullYear().toString();
//       //   if (!acc[yearKey]) {
//       //     acc[yearKey] = { nam: yearKey, slnhap: 0, ttnhap: 0, slxuat: 0, ttxuat: 0 };
//       //   }
//       //   if (item.hoadon.nbmst === '5900363291') {
//       //     acc[yearKey].slxuat += Number(item.sluong) || 0;
//       //     acc[yearKey].ttxuat += Number(item.thtien) || 0;
//       //   } else {
//       //     acc[yearKey].slnhap += Number(item.sluong) || 0;
//       //     acc[yearKey].ttnhap += Number(item.thtien) || 0;
//       //   }
//       //   return acc;
//       // }, {});
//       // const yearlyResult = Object.values(yearlyGrouped);

//       // const result = {
//       //   daily: dailyResult,
//       //   monthly: monthlyResult,
//       //   yearly: yearlyResult,
//       // };




//           const hoadonchitiets = data.map((item) => {
//             const { hoadon, ...rest } = item;
//             // Format dates from hoadon
//             const formattedNtao = hoadon?.ntao
//               ? new Date(hoadon.ntao).toLocaleDateString()
//               : '';
//             const formattedTdlap = hoadon?.tdlap
//               ? new Date(hoadon.tdlap).toLocaleDateString()
//               : '';
//             const formattedThlap = hoadon?.thlap
//               ? hoadon.thlap.toString().replace(/^(\d{4})(\d{2})$/, '$2/$1')
//               : '';
//             return {
//               ...rest,
//               ntao: formattedNtao,
//               tdlap: formattedTdlap,
//               thlap: formattedThlap,
//             };
//           })


//        // Get unique products from data and data1
//         const products = new Set([...data.filter(item => item.ten).map(item => item.ten), ...data1.map(item => item.ten)]);
//         const productDetails = {};
//         [...data, ...data1].forEach(item => {
//             if (item.ten) {
//                 productDetails[item.ten] = {
//                     code: item.title || item.ten,
//                     unit: item.dvtinh || 'N/A'
//                 };
//             }
//         });

//         // Process daily report
//         const dailyReport = [];
//         data.forEach(item => {
//             if (item.ten && item.sluong && item.ntao) {
//                 dailyReport.push({
//                     date: parseDate(item.ntao),
//                     product: item.ten,
//                     code: item.title || item.ten,
//                     unit: item.dvtinh || 'N/A',
//                     inward: item.sluong || 0,
//                     outward: 0 // Assuming no outward data; adjust if needed
//                 });
//             }
//         });

//         // Calculate opening and closing stock per day
//         const dailyStock = {};
//         dailyReport.forEach(item => {
//             const key = `${item.product}_${formatDate(item.date)}`;
//             if (!dailyStock[key]) {
//                 dailyStock[key] = {
//                     date: item.date,
//                     product: item.product,
//                     code: item.code,
//                     unit: item.unit,
//                     opening: 0, // Assume opening stock is 0; adjust if initial stock data is provided
//                     inward: 0,
//                     outward: 0
//                 };
//             }
//             dailyStock[key].inward += item.inward;
//             dailyStock[key].outward += item.outward;
//         });

//         // Calculate closing stock for each day
//         const sortedDays = [...new Set(dailyReport.map(item => formatDate(item.date)))].sort((a, b) => parseDate(a) - parseDate(b));
//         const productStock = {};
//         Object.values(dailyStock).forEach(entry => {
//             if (!productStock[entry.product]) {
//                 productStock[entry.product] = { lastStock: 0 };
//             }
//             entry.opening = productStock[entry.product].lastStock;
//             entry.closing = entry.opening + entry.inward - entry.outward;
//             productStock[entry.product].lastStock = entry.closing;
//         });

//         // Process monthly report
//         const monthlyReport = {};
//         dailyReport.forEach(item => {
//             const monthKey = `${item.product}_${formatMonth(item.date)}`;
//             if (!monthlyReport[monthKey]) {
//                 monthlyReport[monthKey] = {
//                     month: formatMonth(item.date),
//                     product: item.product,
//                     code: item.code,
//                     unit: item.unit,
//                     totalInward: 0,
//                     totalOutward: 0,
//                     opening: 0
//                 };
//             }
//             monthlyReport[monthKey].totalInward += item.inward;
//             monthlyReport[monthKey].totalOutward += item.outward;
//         });

//         // Calculate monthly opening and closing stock
//         Object.values(monthlyReport).forEach(entry => {
//             entry.opening = productStock[entry.product] ? productStock[entry.product].lastStock : 0;
//             entry.closing = entry.opening + entry.totalInward - entry.totalOutward;
//             productStock[entry.product].lastStock = entry.closing;
//         });

//         // Process yearly report
//         const yearlyReport = {};
//         dailyReport.forEach(item => {
//             const yearKey = `${item.product}_${item.date.getFullYear()}`;
//             if (!yearlyReport[yearKey]) {
//                 yearlyReport[yearKey] = {
//                     year: item.date.getFullYear(),
//                     product: item.product,
//                     code: item.code,
//                     unit: item.unit,
//                     totalInward: 0,
//                     totalOutward: 0,
//                     opening: 0
//                 };
//             }
//             yearlyReport[yearKey].totalInward += item.inward;
//             yearlyReport[yearKey].totalOutward += item.outward;
//         });

//         // Calculate yearly opening and closing stock
//         Object.values(yearlyReport).forEach(entry => {
//             entry.opening = productStock[entry.product] ? productStock[entry.product].lastStock : 0;
//             entry.closing = entry.opening + entry.totalInward - entry.totalOutward;
//             productStock[entry.product].lastStock = entry.closing;
//         });

//         // Combine reports
//         const combinedReport = [];
//         Object.values(dailyStock).forEach(daily => {
//             const monthKey = `${daily.product}_${formatMonth(daily.date)}`;
//             const yearKey = `${daily.product}_${daily.date.getFullYear()}`;
//             combinedReport.push({
//                 date: formatDate(daily.date),
//                 code: daily.code,
//                 product: daily.product,
//                 unit: daily.unit,
//                 openingDay: daily.opening,
//                 inwardDay: daily.inward,
//                 outwardDay: daily.outward,
//                 closingDay: daily.closing,
//                 month: monthlyReport[monthKey]?.month || formatMonth(daily.date),
//                 totalInwardMonth: monthlyReport[monthKey]?.totalInward || 0,
//                 totalOutwardMonth: monthlyReport[monthKey]?.totalOutward || 0,
//                 closingMonth: monthlyReport[monthKey]?.closing || 0,
//                 year: yearlyReport[yearKey]?.year || daily.date.getFullYear(),
//                 totalInwardYear: yearlyReport[yearKey]?.totalInward || 0,
//                 totalOutwardYear: yearlyReport[yearKey]?.totalOutward || 0,
//                 closingYear: yearlyReport[yearKey]?.closing || 0
//             });
//         });

//         // Add products from data1 that have no transactions
//         products.forEach(product => {
//             if (!combinedReport.some(row => row.product === product)) {
//                 const details = productDetails[product] || { code: product, unit: 'N/A' };
//                 combinedReport.push({
//                     date: 'N/A',
//                     code: details.code,
//                     product: product,
//                     unit: details.unit,
//                     openingDay: 0,
//                     inwardDay: 0,
//                     outwardDay: 0,
//                     closingDay: 0,
//                     month: 'N/A',
//                     totalInwardMonth: 0,
//                     totalOutwardMonth: 0,
//                     closingMonth: 0,
//                     year: 'N/A',
//                     totalInwardYear: 0,
//                     totalOutwardYear: 0,
//                     closingYear: 0
//                 });
//             }
//         });






//             // let grouped = data.reduce((acc: Record<string, any>, item: any) => {
//             //   const { hoadon, sldk = 0, ttdk = 0, ...rest } = item;
           
//             //   // Format dates from hoadon
//             //   const formattedNtao = hoadon?.ntao ? new Date(hoadon.ntao).toLocaleDateString() : '';
//             //   const formattedTdlap = hoadon?.tdlap ? new Date(hoadon.tdlap).toLocaleDateString() : '';
//             //   const formattedThlap = hoadon?.thlap
//             //   ? hoadon.thlap.toString().replace(/^(\d{4})(\d{2})$/, '$2/$1')
//             //   : '';
           
//             //   // Determine export or import fields based on nbmst
//             //   let slxuat = 0, ttxuat = 0, slnhap = 0, ttnhap = 0;
//             //   if (hoadon?.nbmst === '5900363291') {
//             //   slxuat = Number(rest.sluong) || 0;
//             //   ttxuat = Number(rest.thtien) || 0;
//             //   } else {
//             //   slnhap = Number(rest.sluong) || 0;
//             //   ttnhap = Number(rest.thtien) || 0;
//             //   }
           
//             //   // Group records by title (rest.title)
//             //   const key = rest.title;
//             //   if (acc[key]) {
//             //   acc[key].slnhap += slnhap;
//             //   acc[key].ttnhap += ttnhap;
//             //   acc[key].slxuat += slxuat;
//             //   acc[key].ttxuat += ttxuat;
//             //   } else {
//             //   acc[key] = {
//             //     ten: rest.ten,  
//             //     title: rest.title,
//             //     dvtinh: rest.dvtinh,
//             //     ntao: formattedNtao,
//             //     tdlap: formattedTdlap,
//             //     thlap: formattedThlap,
//             //     ttdk: Number(ttdk),
//             //     sldk: Number(sldk),
//             //     slnhap: slnhap,
//             //     ttnhap: ttnhap,
//             //     slxuat: slxuat,
//             //     ttxuat: ttxuat,
//             //   };
//             //   }
//             //   return acc;
//             // }, {} as Record<string, any>);
           
//             // let result = Object.values(grouped).map((group: any) => {
//             //   // Calculate stock balance for the group
//             //   group.slck = Number(group.sldk) + group.slnhap - group.slxuat;
//             //   group.ttck = Number(group.ttdk) + group.ttnhap - group.ttxuat;
//             //   return group;
//             // });


//       return {
//         data: hoadonchitiets,
//         data1:mathangs,
//         total,
//         page,
//         pageCount: Math.ceil(total / limit),
//       };
//     } catch (error) {
//       this._ErrorlogService.logError('xuatnhapton', error);
//       if (error instanceof HttpException) throw error;
//       throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
//     }
//   }

//   async findOne(id: string) {
//     try {
//       const item = await this.prisma.hoadonChitiet.findUnique({
//         where: { id },
//       });
//       if (!item)
//         throw new HttpException(
//           'hoadonChitiet not found',
//           HttpStatus.NOT_FOUND,
//         );
//       return item;
//     } catch (error) {
//       this._ErrorlogService.logError('findOnehoadonChitiet', error);
//       if (error instanceof HttpException) throw error;
//       throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
//     }
//   }

//   async update(id: string, data: any) {
//     try {
//       let updated;
//       if (data.order) {
//         const { order, ...rest } = data;
//         await this.prisma.hoadonChitiet.update({ where: { id }, data: rest });
//         updated = await this.prisma.hoadonChitiet.update({
//           where: { id },
//           data: { order },
//         });
//       } else {
//         updated = await this.prisma.hoadonChitiet.update({
//           where: { id },
//           data,
//         });
//       }
//       this._SocketGateway.sendUpdate('hoadonchitiet');
//       return updated;
//     } catch (error) {
//       this._ErrorlogService.logError('updatehoadonChitiet', error);
//       if (error instanceof HttpException) throw error;
//       throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
//     }
//   }

//   async remove(id: string) {
//     try {
//       const deleted = await this.prisma.hoadonChitiet.delete({ where: { id } });
//       this._SocketGateway.sendUpdate('hoadonchitiet');
//       return deleted;
//     } catch (error) {
//       this._ErrorlogService.logError('removehoadonChitiet', error);
//       if (error instanceof HttpException) throw error;
//       throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
//     }
//   }

//   async reorderhoadonChitiets(hoadonChitietIds: string[]) {
//     try {
//       for (let i = 0; i < hoadonChitietIds.length; i++) {
//         await this.prisma.hoadonChitiet.update({
//           where: { id: hoadonChitietIds[i] },
//           data: { order: i + 1 },
//         });
//       }
//       this._SocketGateway.sendUpdate('hoadonchitiet');
//       return { status: 'success' };
//     } catch (error) {
//       this._ErrorlogService.logError('reorderhoadonChitiets', error);
//       if (error instanceof HttpException) throw error;
//       throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
//     }
//   }
// }
