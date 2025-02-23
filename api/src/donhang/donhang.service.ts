import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class DonhangService {
  constructor(private readonly prisma: PrismaService) {}

  // async create(data: any) {
  //   return this.prisma.donhang.create({ data });
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

  async reorderDonHangs(donhangIds: string[]) {
    // Update the order of each donhang based on its position in the array
    for (let i = 0; i < donhangIds.length; i++) {
      await this.prisma.donhang.update({
        where: { id: donhangIds[i] },
        data: { order: i + 1 },
      });
    }
  }
  async findAll() {
    return this.prisma.donhang.findMany();
  }

  async findOne(id: string) {
    const donhang = await this.prisma.donhang.findUnique({ where: { id } });
    if (!donhang) throw new NotFoundException('DonHang not found');
    return donhang;
  }

  async update(id: string, data: any) {
    return this.prisma.donhang.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.donhang.delete({ where: { id } });
  }
}
