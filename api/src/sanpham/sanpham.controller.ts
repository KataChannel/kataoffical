import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { SanphamService } from './sanpham.service';

@Controller('sanpham')
export class SanphamController {
  constructor(private readonly sanphamService: SanphamService) {}

  @Post()
  create(@Body() createSanphamDto: any) {
    return this.sanphamService.create(createSanphamDto);
  }
  @Post('import')
  import(@Body() data: any) {
    return this.sanphamService.import(data);
  }
  @Post('findby')
  findby(@Body() param: any) {
    return this.sanphamService.findby(param);
  }
  @Get()
  findAll() {
    return this.sanphamService.findAll();
  }
  @Get('nhucaudathang')
  nhucaudathang() {
    return this.sanphamService.nhucaudathang();
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
  update(@Param('id') id: string, @Body() updateSanphamDto: any) {
    return this.sanphamService.update(id, updateSanphamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sanphamService.remove(id);
  }
  @Post('reorder')
  reorder(@Body() body: { sanphamIds: string[] }) {
    return this.sanphamService.reorderSanphams(body.sanphamIds);
  }
}