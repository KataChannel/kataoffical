// import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
// import { PrismaService } from 'prisma/prisma.service';
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

//             let result = data.map((item:any) => {
//               const { hoadon, sldk = 0, ttdk = 0, ...rest } = item;
       
//               // Format dates from hoadon
//               const formattedNtao = hoadon?.ntao ? new Date(hoadon.ntao).toLocaleDateString() : '';
//               const formattedTdlap = hoadon?.tdlap ? new Date(hoadon.tdlap).toLocaleDateString() : '';
//               const formattedThlap = hoadon?.thlap
//                 ? hoadon.thlap.toString().replace(/^(\d{4})(\d{2})$/, '$2/$1')
//                 : '';
       
//               // Determine export or import fields based on nbmst
//               let slxuat = 0, ttxuat = 0, slnhap = 0, ttnhap = 0;
//               if (hoadon?.nbmst === '5900363291') {
//                 slxuat = Number(rest.sluong) || 0;
//                 ttxuat = Number(rest.thtien) || 0;
//               } else {
//                 slnhap = Number(rest.sluong) || 0;
//                 ttnhap = Number(rest.thtien) || 0;
//               }
       
//               // Calculate stock balance
//               const slck = Number(sldk) + slnhap - slxuat;
//               const ttck = Number(ttdk) + ttnhap - ttxuat;
       
//               return {
//                 ten: rest.ten,
//                 dvtinh: rest.dvtinh,
//                 ntao: formattedNtao,
//                 tdlap: formattedTdlap,
//                 thlap: formattedThlap,
//                 ttdk: Number(ttdk),
//                 slnhap,
//                 ttnhap,
//                 slxuat,
//                 ttxuat,
//                 slck,
//                 ttck,
//               };
//             });


//       return {
//         data: result,
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
