import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { QuanlyqrcodeService } from './quanlyqrcode.service';
@Controller('quanlyqrcode')
export class QuanlyqrcodeController {
  constructor(private readonly quanlyqrcodeService: QuanlyqrcodeService) {}
  @Post()
  create(@Body() createquanlyqrcodeDto: any) {
    return this.quanlyqrcodeService.create(createquanlyqrcodeDto);
  }
  @Post('findby')
  findby(@Body() param: any) {
    return this.quanlyqrcodeService.findby(param);
  }
  @Get()
  findAll() {
    return this.quanlyqrcodeService.findAll();
  }
  @Get('last-updated')
    async getLastUpdatedquanlyqrcode() {
      return this.quanlyqrcodeService.getLastUpdatedquanlyqrcode();
  }
  @Get('findid/:id')
  findOne(@Param('id') id: string) {
    return this.quanlyqrcodeService.findOne(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.quanlyqrcodeService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quanlyqrcodeService.remove(id);
  }
}