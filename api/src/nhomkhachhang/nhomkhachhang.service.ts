import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class NhomkhachhangService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.nhomkhachhang.create({ data });
  }
  async findAll() {
    return this.prisma.nhomkhachhang.findMany();
  }

  async findOne(id: string) {
    const nhomkhachhang = await this.prisma.nhomkhachhang.findUnique({ where: { id } });
    if (!nhomkhachhang) throw new NotFoundException('Nhomkhachhang not found');
    return nhomkhachhang;
  }

  async update(id: string, data: any) {
    return this.prisma.nhomkhachhang.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.nhomkhachhang.delete({ where: { id } });
  }
}