import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ErrorlogService } from 'src/errorlog/errorlog.service';
import { SocketGateway } from 'src/socket.gateway';

@Injectable()
export class MenuService {
  constructor(
    private readonly prisma: PrismaService,
    private _SocketGateway: SocketGateway,
    private _ErrorlogService: ErrorlogService,
  ) {}
  async getLastUpdated() {
    try {
      const lastUpdated = await this.prisma.menu.aggregate({
        _max: {
          updatedAt: true,
        },
      });
      return { updatedAt: lastUpdated._max.updatedAt || 0 };
    } catch (error) {
      this._ErrorlogService.logError('getLastUpdated', error);
      throw error;
    }
  }

  async create(data: any) {
    return this.prisma.menu.create({ data });
  }

  async findAll() {
    return this.prisma.menu.findMany({
      include: { children: true },
      orderBy: { order: 'asc' },
    });
  }
  async findby(param: any) {
    console.log('param', param);
    
    try {
      const menu = await this.prisma.menu.findUnique({ where: param });
      console.log('menu', menu);
      
      if (!menu) throw new NotFoundException('menu not found');
      return menu;
    } catch (error) {
      this._ErrorlogService.logError('findby',error);
      throw error;
    }
  }
  async findOne(id: string) {
    return this.prisma.menu.findUnique({ where: { id }, include: { children: true } });
  }

  async update(id: string, data: any) {
    try {
      await this.prisma.menu.update({ where: { id }, data });
      this._SocketGateway.sendMenuUpdate();
      return this.prisma.menu.update({ where: { id }, data });
    } catch (error) {
      this._ErrorlogService.logError('updateMenu', error);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      this._SocketGateway.sendMenuUpdate();
      return this.prisma.menu.delete({ where: { id } });
    } catch (error) {
      this._ErrorlogService.logError('removeMenu', error);
      throw error;
    }
  }

  async getTree(data: any) {
    // Default permissions if none provided
    const permissions = Array.isArray(data.permissions) && data.permissions.length > 0
      ? data.permissions
      : ['welcome.view'];

    // Build menu query
    const where: any = { isActive: true };
    if (data?.serviceType) {
      where.serviceType = data.serviceType;
    }

    // Fetch all menus
    const menus = await this.prisma.menu.findMany({
      where,
      include: { children: true },
      orderBy: { order: 'asc' },
    });

    console.log('menu', menus);
    
    // Filter menus by permissions
    const filteredMenus = menus.filter(menu => {
      const slug = menu.slug;
      const permission = `${slug?.split('/').pop()}.view`;
      menu.isActive = permissions.includes(permission);
      return menu.isActive;
    });

    // Ensure parent menus are included
    const parentIds = new Set(filteredMenus.map(menu => menu.parentId).filter(Boolean));
    const parentMenus = menus.filter(menu => parentIds.has(menu.id));
    const finalMenus = [...filteredMenus, ...parentMenus];

    // Remove duplicates by id
    const uniqueMenus = Array.from(
      new Map(finalMenus.map(menu => [menu.id, menu])).values()
    );

    return this.buildTree(uniqueMenus);
  }

  private buildTree(menus: any[], parentId: string | null = null) {
    return menus
      .filter(menu => menu.parentId === parentId)
      .map(menu => ({ ...menu, children: this.buildTree(menus, menu.id) }));
  }
}
