import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class KhachhangService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    let pricelist = await this.prisma.banggia.findUnique({
      where: { id: data.banggia }
    });
    if (!pricelist) {delete data.banggia}
    return this.prisma.khachhang.create({ data });
  }
  async findAll() {
    return this.prisma.khachhang.findMany();
  }

  async findOne(id: string) {
    const khachhang = await this.prisma.khachhang.findUnique({ where: { id } });
    if (!khachhang) throw new NotFoundException('Khachhang not found');
    return khachhang;
  }

  async update(id: string, data: any) {
    return this.prisma.khachhang.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.khachhang.delete({ where: { id } });
  }
}