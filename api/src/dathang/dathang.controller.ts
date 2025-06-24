import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { DathangService } from './dathang.service';
import { AuditAction } from '@prisma/client';
import { Audit } from 'src/auditlog/audit.decorator';

@Controller('dathang')
export class DathangController {
  constructor(private readonly dathangService: DathangService) {}

  @Post()
  @Audit({entity: 'Create Dathang', action: AuditAction.CREATE, includeResponse: true})
  create(@Body() createDathangDto: any) {
    return this.dathangService.create(createDathangDto);
  }
  @Post('import')
  @Audit({entity: 'Import Dathang', action: AuditAction.CREATE, includeResponse: true})
  import(@Body() data: any) {
    return this.dathangService.import(data);
  }
  @Post('bynhucau')
  @Audit({entity: 'Create Dathang by nhu cau', action: AuditAction.CREATE, includeResponse: true})
  createbynhucau(@Body() data: any) {
    return this.dathangService.createbynhucau(data);
  }
  @Post('getchonhap')
  async getchonhap(@Body() params: any) {
    return this.dathangService.getchonhap(params);
  }
  @Post('search')
    async search(@Body() params: any) {
    return this.dathangService.search(params);
  }
  @Get()
  findAll() {
    return this.dathangService.findAll();
  }
  @Post('findby')
  findby(@Body() param: any) {
    return this.dathangService.findby(param);
  }
  @Get('findid/:id')
  findOne(@Param('id') id: string) {
    return this.dathangService.findOne(id);
  }
  @Get('findbysanpham/:id')
  findByProductId(@Param('id') id: string) {
    return this.dathangService.findByProductId(id);
  }
  @Patch(':id')
  @Audit({entity: 'Update Dathang', action: AuditAction.UPDATE, includeResponse: true})
  update(@Param('id') id: string, @Body() updateDathangDto: any) {
    return this.dathangService.update(id, updateDathangDto);
  }

  @Delete(':id')
  @Audit({entity: 'Delete Dathang', action: AuditAction.DELETE, includeResponse: true})
  remove(@Param('id') id: string) {
    return this.dathangService.remove(id);
  }
  @Post('reorder')
  reorder(@Body() body: { dathangIds: string[] }) {
    return this.dathangService.reorderDathangs(body.dathangIds);
  }
}