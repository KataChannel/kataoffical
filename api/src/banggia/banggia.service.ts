import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class BanggiaService {
  constructor(private readonly prisma: PrismaService) {}

  // async create(data: any) {
  //   return this.prisma.banggia.create({ data });
  // }
  async create(data: any) {
    let newOrder: number;
    const maxOrder = await this.prisma.banggia.aggregate({
      _max: { order: true },
    });
    newOrder = (maxOrder._max?.order || 0) + 1;
    // Create the new sanpham entry
    return this.prisma.banggia.create({
      data: {
        ...data,
        order: newOrder,
      },
    });
  }

  async reorderBanggias(banggiaIds: string[]) {
    // Update the order of each banggia based on its position in the array
    for (let i = 0; i < banggiaIds.length; i++) {
      await this.prisma.banggia.update({
        where: { id: banggiaIds[i] },
        data: { order: i + 1 },
      });
    }
  }
  async findAll() {
    return this.prisma.banggia.findMany();
  }

  async findOne(id: string) {
    const banggia = await this.prisma.banggia.findUnique({ where: { id } });
    if (!banggia) throw new NotFoundException('Banggia not found');
    return banggia;
  }

  async update(id: string, data: any) {
    return this.prisma.banggia.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.banggia.delete({ where: { id } });
  }
}
