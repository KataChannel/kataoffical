import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.role.create({ data });
  }

  async findAll() {
    return this.prisma.role.findMany({ include: { permissions: true } });
  }

  async findOne(id: string) {
    return this.prisma.role.findUnique({ where: { id }, include: { permissions: true } });
  }

  async update(id: string, data: any) {
    return this.prisma.role.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.role.delete({ where: { id } });
  }
}
