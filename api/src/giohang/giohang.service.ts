import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class GiohangService {
  constructor(private readonly prisma: PrismaService) {}

  // async create(data: any) {
  //   return this.prisma.giohang.create({ data });
  // }
  async create(data: any) {
 let newOrder: number;
 const maxOrder = await this.prisma.giohang.aggregate({
   _max: { order: true },
 });
 newOrder = (maxOrder._max?.order || 0) + 1;
 return this.prisma.giohang.create({
   data: {
     ...data,
     order: newOrder,
   },
 });
  }

  async reorderGiohangs(giohangIds: string[]) {
    // Update the order of each giohang based on its position in the array
    for (let i = 0; i < giohangIds.length; i++) {
      await this.prisma.giohang.update({
        where: { id: giohangIds[i] },
        data: { order: i + 1 },
      });
    }
  }
  async findAll() {
    return this.prisma.giohang.findMany();
  }

  async findOne(id: string) {
    const giohang = await this.prisma.giohang.findUnique({ where: { id } });
    if (!giohang) throw new NotFoundException('Giohang not found');
    return giohang;
  }

  async update(id: string, data: any) {
    return this.prisma.giohang.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.giohang.delete({ where: { id } });
  }
}