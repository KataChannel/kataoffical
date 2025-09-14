import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { MenuService } from './menu.service';
import { AuditAction } from '@prisma/client';
import { Audit } from 'src/auditlog/audit.decorator';
import { Cache, CacheInvalidate } from '../common/cache.interceptor';
import { SmartCache } from '../common/smart-cache.decorator';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  @Audit({entity: 'Create Menu', action: AuditAction.CREATE, includeResponse: true})
  @SmartCache({
    invalidate: ['menu'],
    get: { ttl: 1800, keyPrefix: 'menu' },
    updateCache: true
  })
  create(@Body() createMenuDto: any) {
    return this.menuService.create(createMenuDto);
  }

  @Get()
  @Cache(1800, 'menu')
  findAll() {
    return this.menuService.findAll();
  }
  @Post('/tree')
  getTree(@Body() data: any) {
    return this.menuService.getTree(data);
  }
  @Post('reorder')
  @CacheInvalidate(['menu'])
  reorder(@Body() banggiaIds: string[]) {
    return this.menuService.reorderMenus(banggiaIds);
  }
  @Get(':id')
  @Cache(1800, 'menu')
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(id);
  }

  @Patch(':id')
  @Audit({entity: 'Update Menu', action: AuditAction.UPDATE, includeResponse: true})
  @SmartCache({
    invalidate: ['menu'],
    get: { ttl: 1800, keyPrefix: 'menu' },
    updateCache: true
  })
  update(@Param('id') id: string, @Body() updateMenuDto: any) {
    return this.menuService.update(id, updateMenuDto);
  }

  @Delete(':id')
  @Audit({entity: 'Delete Menu', action: AuditAction.DELETE, includeResponse: true})
  @CacheInvalidate(['menu'])
  remove(@Param('id') id: string) {
    return this.menuService.remove(id);
  }

}
