import { Controller, Get, Post, Body, Param, Patch, Delete, Query } from '@nestjs/common';
import { DonhangService } from './donhang.service';

@Controller('donhang')
export class DonhangController {
  constructor(private readonly donhangService: DonhangService) {}
  @Post()
  create(@Body() createDonhangDto: any) {
    return this.donhangService.create(createDonhangDto);
  }
  @Post('import')
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
    return this.donhangService.phieugiao(params);
  }
  @Post('searchfield')
  async searchfield(@Body() searchParams: Record<string, any>) {
    return this.donhangService.searchfield(searchParams);
  }
  @Get()
  findAll() {
    return this.donhangService.findAll();
  }
  @Get('findid/:id')
  findOne(@Param('id') id: string) {
    return this.donhangService.findOne(id);
  }
  @Patch('phieugiao/:id')
  updatePhieugiao(@Param('id') id: string, @Body() updateDonhangDto: any) {
    return this.donhangService.updatePhieugiao(id, updateDonhangDto);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDonhangDto: any) {
    return this.donhangService.update(id, updateDonhangDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.donhangService.remove(id);
  }
  @Post('reorder')
  reorder(@Body() body: { donhangIds: string[] }) {
    return this.donhangService.reorderDonHangs(body.donhangIds);
  }
}