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
    const componentContent = `import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { SanphamService } from './sanpham.service';
@Controller('sanpham')
export class SanphamController {
  constructor(private readonly sanphamService: SanphamService) {}
  @Post()
  create(@Body() createSanphamDto: any) {
    return this.sanphamService.create(createSanphamDto);
  }
  @Post('findby')
  findby(@Body() param: any) {
    return this.sanphamService.findby(param);
  }
  @Get()
  findAll() {
    return this.sanphamService.findAll();
  }
  @Get('last-updated')
    async getLastUpdatedSanpham() {
      return this.sanphamService.getLastUpdatedSanpham();
  }
  @Get('findid/:id')
  findOne(@Param('id') id: string) {
    return this.sanphamService.findOne(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.sanphamService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sanphamService.remove(id);
  }
  @Post('reorder')
  reorder(@Body() body: { sanphamIds: string[] }) {
    return this.sanphamService.reorderSanphams(body.sanphamIds);
  }
}`;

  const moduleContent = `
import { Module } from '@nestjs/common';
import { SanphamService } from './sanpham.service';
import { SanphamController } from './sanpham.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { SocketGateway } from 'src/socket.gateway';
  @Module({
    imports: [PrismaModule],
    controllers: [SanphamController],
    providers: [SanphamService,SocketGateway],
    exports:[SanphamService]
  })
  export class SanphamModule {}
  `;
  
  
    const serviceContent = `import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { SocketGateway } from 'src/socket.gateway';

@Injectable()
export class SanphamService {
  constructor(
    private readonly prisma: PrismaService,
    private _SocketGateway: SocketGateway,
  ) {}

  // async create(data: any) {
  //   return this.prisma.sanpham.create({ data });
  // }
  async getLastUpdatedSanpham() {
    const lastUpdated = await this.prisma.sanpham.aggregate({
      _max: {
        updatedAt: true,
      },
    });
    return { updatedAt: lastUpdated._max.updatedAt || 0 };
  }
  async generateMaSP(): Promise<string> {
    // Lấy NCC mới nhất
    const latest = await this.prisma.sanpham.findFirst({
      orderBy: { masp: 'desc' },
    });

    // Nếu chưa có NCC nào, bắt đầu từ 1
    let nextNumber = 1;
    if (latest) {
      const match = latest.masp.match(/I1(\d+)/);
      if (match) {
        nextNumber = parseInt(match[1]) + 1;
      }
    }

    // Tạo mã mới dạng TG-NCC00001
    return \`I1\${nextNumber.toString().padStart(5, '0')}\`;
  }
  async create(data: any) {
    let newOrder: number;
    const maxOrder = await this.prisma.sanpham.aggregate({
      _max: { order: true },
    });
    newOrder = (maxOrder._max?.order || 0) + 1;
    // Create the new sanpham entry
    this._SocketGateway.sendSanphamUpdate();
    const masp = await this.generateMaSP();
    return this.prisma.sanpham.create({
      data: {
        ...data,
        order: newOrder,
        masp:masp,
      },
    });
  }

  async reorderSanphams(sanphamIds: string[]) {
    // Update the order of each sanpham based on its position in the array
    for (let i = 0; i < sanphamIds.length; i++) {
      await this.prisma.sanpham.update({
        where: { id: sanphamIds[i] },
        data: { order: i + 1 },
      });
    }
  }
  async findAll() {
    return this.prisma.sanpham.findMany();
  }

  async findby(param: any) {
    const sanpham = await this.prisma.sanpham.findUnique({ where: param });
    if (!sanpham) throw new NotFoundException('Sanpham not found');
    return sanpham;
  }
  async findOne(id: string) {
    const sanpham = await this.prisma.sanpham.findUnique({ where: { id } });
    if (!sanpham) throw new NotFoundException('Sanpham not found');
    return sanpham;
  }

  async update(id: string, data: any) {
    if(data.order){
      const { order, ...rest } = data;
      await this.prisma.sanpham.update({ where: { id }, data: rest });
      await this.prisma.sanpham.update({ where: { id }, data: { order } });
    }
    this._SocketGateway.sendSanphamUpdate();
    return this.prisma.sanpham.update({ where: { id }, data });
  }

  async remove(id: string) {
    this._SocketGateway.sendSanphamUpdate();
    return this.prisma.sanpham.delete({ where: { id } });
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