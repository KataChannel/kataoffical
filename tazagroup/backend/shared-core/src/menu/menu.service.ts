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

  async getTree(data:any){   
    if(Object.entries(data).length === 0){
      data =['donhang.view'];
    }
    const menus = await this.findAll();  
    const filteredMenus = menus.filter(v => {
      const path = v.slug;
      const result = `${path?.split("/").pop()}.view`;
      v.isActive = data?.includes(result);
      return v.isActive;
    });
    const parentIds = new Set(filteredMenus.map(v => v.parentId).filter(id => id));
    const parents = menus.filter(v => parentIds.has(v.id));
    filteredMenus.push(...parents);
    menus.length = 0;
    menus.push(...filteredMenus);    
    return this.buildTree(menus);
  }

  private buildTree(menus: any[], parentId: string | null = null) {
    return menus
      .filter(menu => menu.parentId === parentId)
      .map(menu => ({ ...menu, children: this.buildTree(menus, menu.id) }));
  }
}
