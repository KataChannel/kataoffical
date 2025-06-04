import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { MenuService } from './menu.service';
import { AuditAction } from '@prisma/client';
import { Audit } from 'src/auditlog/audit.decorator';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  @Audit({entity: 'Create Menu', action: AuditAction.CREATE, includeResponse: true})
  create(@Body() createMenuDto: any) {
    return this.menuService.create(createMenuDto);
  }

  @Get()
  findAll() {
    return this.menuService.findAll();
  }
  @Post('/tree')
  getTree(@Body() data: any) {
    return this.menuService.getTree(data);
  }
  @Post('reorder')
  reorder(@Body() banggiaIds: string[]) {
    return this.menuService.reorderMenus(banggiaIds);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(id);
  }

  @Patch(':id')
  @Audit({entity: 'Update Menu', action: AuditAction.UPDATE, includeResponse: true})
  update(@Param('id') id: string, @Body() updateMenuDto: any) {
    return this.menuService.update(id, updateMenuDto);
  }

  @Delete(':id')
  @Audit({entity: 'Delete Menu', action: AuditAction.DELETE, includeResponse: true})
  remove(@Param('id') id: string) {
    return this.menuService.remove(id);
  }

}
