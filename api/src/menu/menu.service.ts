import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class MenuService {
  constructor(private readonly prisma: PrismaService) {}

  // async create(data: any) {
  //   return this.prisma.menu.create({ data });
  // }
  async create(data: any) {
    let newOrder: number;

    if (data.parentId) {
      // If the menu has a parent, find the maximum order value for its children
      const maxOrder = await this.prisma.menu.aggregate({
        _max: {
          order: true,
        },
        where: {
          parentId: data.parentId,
        },
      });

      newOrder = (maxOrder._max.order || 0) + 1;
    } else {
      // If the menu is a root menu, find the maximum order value for all root menus
      const maxOrder = await this.prisma.menu.aggregate({
        _max: {
          order: true,
        },
        where: {
          parentId: null,
        },
      });

      newOrder = (maxOrder._max.order || 0) + 1;
    }

    // Create the new menu entry
    return this.prisma.menu.create({
      data: {
        ...data,
        order: newOrder,
      },
    });
  }

  async reorderMenus(menuIds: string[]) {
    // Update the order of each menu based on its position in the array
    for (let i = 0; i < menuIds.length; i++) {
      await this.prisma.menu.update({
        where: { id: menuIds[i] },
        data: { order: i + 1 },
      });
    }
  }
  async findAll() {
    return this.prisma.menu.findMany({
        orderBy: [
        {
          order: 'asc', // Sắp xếp tăng dần theo order
        },
      ],
      });
  }

  async findOne(id: string) {
    const menu = await this.prisma.menu.findUnique({ where: { id } });
    if (!menu) throw new NotFoundException('Menu not found');
    return menu;
  }

  async update(id: string, data: any) {
    return this.prisma.menu.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.menu.delete({ where: { id } });
  }
}
