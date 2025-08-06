import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super();
    // Đăng ký middleware để cập nhật totalVat
    // this.$use(async (params, next) => {      
    //   if (params.model === 'Donhang' && ['create', 'update', 'delete'].includes(params.action)) {
    //     let donhangId: string | undefined;
    //     donhangId = params.args.where.id || undefined;
    //     const result = await next(params);
    //     console.log('Prisma Middleware:', result);
    //   if (donhangId) {
    //       const donhangSanphams = await this.donhangsanpham.findMany({
    //         where: { donhangId },
    //         select: { ttnhan: true, ttsauvat: true },
    //       });
    //       const tongvat = donhangSanphams.reduce((sum, item) => sum + Number(item.ttsauvat), 0);
    //       const tongtien = donhangSanphams.reduce((sum, item) => sum + Number(item.ttnhan), 0) + tongvat;
    //       await this.donhang.update({
    //         where: { id: donhangId },
    //         data: { tongvat, tongtien },
    //       });
    //        console.log('Prisma Middleware:', result);
    //        console.log('Prisma Middleware:', tongvat, tongtien);
    //     }
    //     return result;
    //   }

    //   return next(params);
    // });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}