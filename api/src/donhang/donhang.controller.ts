import { Controller, Get, Post, Body, Param, Patch, Delete, Query } from '@nestjs/common';
import { DonhangService } from './donhang.service';
import { AuditAction } from '@prisma/client';
import { Audit } from 'src/auditlog/audit.decorator';

@Controller('donhang')
export class DonhangController {
  constructor(private readonly donhangService: DonhangService) {}
  @Post()
  @Audit({entity: 'Create Donhang', action: AuditAction.CREATE, includeResponse: true})
  create(@Body() createDonhangDto: any) {
    return this.donhangService.create(createDonhangDto);
  }
  @Post('importold')
  @Audit({entity: 'Import Donhang Cu', action: AuditAction.CREATE, includeResponse: true})
  ImportDonhangOld(@Body() data: any) {
    return this.donhangService.ImportDonhangOld(data);
  }
  @Post('import')
  @Audit({entity: 'Import Donhang', action: AuditAction.CREATE, includeResponse: true})
  ImportDonhang(@Body() data: any) {
    return this.donhangService.ImportDonhang(data);
  }
  @Post('search')
  async search(@Body() params: any) {
    return this.donhangService.search(params);
  }
  @Post('phieuchuyen')
  async phieuchuyen(@Body() params: any) {
    return this.donhangService.phieuchuyen(params);
  }
  @Post('phieugiao')
  async phieugiao(@Body() params: any) {
    const result = await this.donhangService.phieugiao(params);
    return result;
  }
  @Post('searchfield')
  async searchfield(@Body() searchParams: Record<string, any>) {
    return this.donhangService.searchfield(searchParams);
  }
  @Get()
  findAll() {
    return this.donhangService.findAll();
  }
  @Get('findbysanpham/:id')
  findByProductId(@Param('id') id: string) {
    return this.donhangService.findByProductId(id);
  }
  @Get('findid/:id')
  findOne(@Param('id') id: string) {
    return this.donhangService.findOne(id);
  }
  @Patch('phieugiao/:id')
  @Audit({entity: 'Update Phieugiao', action: AuditAction.UPDATE, includeResponse: true})
  async updatePhieugiao(@Param('id') id: string, @Body() updateDonhangDto: any) {
    const result = await  this.donhangService.updatePhieugiao(id, updateDonhangDto);
    return result;
  }
  @Patch(':id')
  @Audit({entity: 'Update Donhang', action: AuditAction.UPDATE, includeResponse: true})
  update(@Param('id') id: string, @Body() updateDonhangDto: any) {
    return this.donhangService.update(id, updateDonhangDto);
  }

  @Delete(':id')
  @Audit({entity: 'Delete Donhang', action: AuditAction.DELETE, includeResponse: true})
  remove(@Param('id') id: string) {
    return this.donhangService.remove(id);
  }
  @Post('reorder')
  reorder(@Body() body: { donhangIds: string[] }) {
    return this.donhangService.reorderDonHangs(body.donhangIds);
  }
}