import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class SanphamService {
  constructor(private readonly prisma: PrismaService) {}

  // async create(data: any) {
  //   return this.prisma.sanpham.create({ data });
  // }
  async create(data: any) {
    let newOrder: number;
    const maxOrder = await this.prisma.sanpham.aggregate({
      _max: { order: true },
    });
    newOrder = (maxOrder._max?.order || 0) + 1;
    // Create the new sanpham entry
    return this.prisma.sanpham.create({
      data: {
        ...data,
        order: newOrder,
      },
    });
  }

  async reorderSanphams(sanphamIds: string[]) {
    // Update the order of each sanpham based on its position in the array
    for (let i = 0; i < sanphamIds.length; i++) {
      await this.prisma.sanpham.update({
        where: { id: sanphamIds[i] },
        data: { order: i + 1 },
      });
    }
  }
  async findAll() {
    return this.prisma.sanpham.findMany();
  }

  async findOne(id: string) {
    const sanpham = await this.prisma.sanpham.findUnique({ where: { id } });
    if (!sanpham) throw new NotFoundException('Sanpham not found');
    return sanpham;
  }

  async update(id: string, data: any) {
    if(data.order){
      const { order, ...rest } = data;
      await this.prisma.sanpham.update({ where: { id }, data: rest });
      await this.prisma.sanpham.update({ where: { id }, data: { order } });
    }
    return this.prisma.sanpham.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.sanpham.delete({ where: { id } });
  }
}