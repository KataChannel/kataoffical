import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class MenuService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.menu.create({ data });
  }

  async findAll() {
    return this.prisma.menu.findMany({
      include: { children: true },
      orderBy: { order: 'asc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.menu.findUnique({ where: { id }, include: { children: true } });
  }

  async update(id: string, data: any) {
    return this.prisma.menu.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.menu.delete({ where: { id } });
  }

  async getTree(){
    const menus = await this.findAll();    
    return this.buildTree(menus);
  }

  private buildTree(menus: any[], parentId: string | null = null) {
    return menus
      .filter(menu => menu.parentId === parentId)
      .map(menu => ({ ...menu, children: this.buildTree(menus, menu.id) }));
  }
}
