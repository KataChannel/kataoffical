import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
// Generate file with dynamic content
async function generateFile(filePath, content) {
    try {
      await fs.ensureDir(path.dirname(filePath));
      await fs.writeFile(filePath, content.trim());
      console.log(chalk.green(`Created: ${filePath}`));
    } catch (error) {
      console.error(chalk.red(`Error creating ${filePath}:`), error.message);
    }
  }
  
  // Generate all files
  export async function generateNestFiles({ name, outputDir }) {
    const Viethoa = name.charAt(0).toUpperCase() + name.slice(1);
    const TenThuong = name.toLowerCase().replace(/\s+/g, '-');
    
    // Define file content
    const componentContent = `
    import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  create(@Body() createMenuDto: any) {
    return this.menuService.create(createMenuDto);
  }

  @Get()
  findAll() {
    return this.menuService.findAll();
  }

  @Get('findid/:id')
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMenuDto: any) {
    return this.menuService.update(id, updateMenuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuService.remove(id);
  }
  @Post('reorder')
  reorder(@Body() body: { menuIds: string[] }) {
    return this.menuService.reorderMenus(body.menuIds);
  }
}
`;

  const moduleContent = `
import { Module } from '@nestjs/common';
  import { MenuService } from './menu.service';
  import { MenuController } from './menu.controller';
import { PrismaModule } from 'prisma/prisma.module';
  @Module({
    imports: [PrismaModule],
    controllers: [MenuController],
    providers: [MenuService],
    exports:[MenuService]
  })
  export class MenuModule {}
  `;
  
  
    const serviceContent = `
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
    return this.prisma.menu.findMany();
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
`;
  
  
  
  

  const entityContent = `
  export class Menu {}
`;
  const componentFile = path.join(outputDir, `${TenThuong}.controller.ts`);
  const moduleFile = path.join(outputDir, `${TenThuong}.module.ts`);
  const serviceFile = path.join(outputDir, `${TenThuong}.service.ts`);
  const entityFile = path.join(outputDir, `entities/${TenThuong}.entity.ts`);

    // Generate primary files
    await generateFile(componentFile, componentContent);
    await generateFile(moduleFile, moduleContent);
    await generateFile(serviceFile, serviceContent);
    await generateFile(entityFile, entityContent);
  }