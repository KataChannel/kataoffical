import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class NhacungcapService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.nhacungcap.create({ data });
  }
  async findAll() {
    return this.prisma.nhacungcap.findMany();
  }

  async findOne(id: string) {
    const nhacungcap = await this.prisma.nhacungcap.findUnique({ where: { id } });
    if (!nhacungcap) throw new NotFoundException('Nhacungcap not found');
    return nhacungcap;
  }

  async update(id: string, data: any) {
    return this.prisma.nhacungcap.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.nhacungcap.delete({ where: { id } });
  }
}