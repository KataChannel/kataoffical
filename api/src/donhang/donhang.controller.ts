import { Controller, Get, Post, Body, Param, Patch, Delete, Query } from '@nestjs/common';
import { DonhangService } from './donhang.service';
import { AuditAction } from '@prisma/client';
import { Audit } from 'src/auditlog/audit.decorator';
import { DonhangCronService } from './donhang-cron.service';

@Controller('donhang')
export class DonhangController {
  constructor(
    private readonly donhangService: DonhangService,
    private readonly donhangCronService: DonhangCronService,
  ) {}
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
  @Post('congnokhachhang')
  async congnokhachhang(@Body() params: any) {
    return this.donhangService.congnokhachhang(params);
  }
  @Post('phieuchuyen')
  async phieuchuyen(@Body() params: any) {
    return this.donhangService.phieuchuyen(params);
  }
  @Post('dongbogia')
  async dongbogia(@Body() params: any) {
    return this.donhangService.dongbogia(params);
  }
  @Post('getchogiao')
  async getchogiao(@Body() params: any) {
    return this.donhangService.getchogiao(params);
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
    console.log(id);
    
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
  @Patch('bulk')
  @Audit({entity: 'Update bulk Donhang', action: AuditAction.UPDATE, includeResponse: true})
  updateBulk(@Body() data: any[]) {
    return this.donhangService.updateBulk(data,'danhan');
  }
  @Patch(':id')
  @Audit({entity: 'Update Donhang', action: AuditAction.UPDATE, includeResponse: true})
  update(@Param('id') id: string, @Body() updateDonhangDto: any) {
    return this.donhangService.update(id, updateDonhangDto);
  }

  @Delete('bulk')
  @Audit({entity: 'Delete Donhang', action: AuditAction.DELETE, includeResponse: true})
  async removeBulk(@Body() ids: any[]) {
      return await this.donhangService.removeBulk(ids);
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
  @Post(':id/dagiao')
  @Audit({entity: 'Create Donhang', action: AuditAction.CREATE, includeResponse: true})
  async dagiao(@Param('id') id: string,@Body() data: any) {
    const result =  await this.donhangService.dagiao(id,data);
    console.log('result', result);
    return result;
  }
  @Post(':id/danhan')
  @Audit({entity: 'Create Donhang', action: AuditAction.CREATE, includeResponse: true})
  async danhan(@Param('id') id: string,@Body() data: any) {
    const result =  await this.donhangService.danhan(id,data);
    console.log('result', result);
    return result;
  }
  // @Post(':id/danhan')
  // @Audit({entity: 'Create Donhang', action: AuditAction.CREATE, includeResponse: true})
  // danhan(@Body() data: any) {
  //   return this.donhangService.danhan(data);
  // }
  @Get('autoCompleteOrdersDaily')
  async autoCompleteOrdersDaily() {
    return this.donhangCronService.autoCompleteOrdersDaily();
  }
}