import { Controller, Get, Post, Body, Param, Patch, Delete, Query } from '@nestjs/common';
import { KhachhangService } from './khachhang.service';

@Controller('khachhang')
export class KhachhangController {
  constructor(private readonly khachhangService: KhachhangService) {}

  @Post()
  create(@Body() createKhachhangDto: any) {
    return this.khachhangService.create(createKhachhangDto);
  }

  
  @Get('vttech')
  findAllVttech(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;
    return this.khachhangService.findAllVttech({ page: pageNumber, limit: limitNumber });
  }
  
  @Get()
  findAll() {
    return this.khachhangService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.khachhangService.findOne(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKhachhangDto: any) {
    return this.khachhangService.update(id, updateKhachhangDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.khachhangService.remove(id);
  }
}