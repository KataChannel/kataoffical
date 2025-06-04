import { Controller, Get, Post, Body, Param, Patch, Delete, Query } from '@nestjs/common';
import { khoService } from './kho.service';

@Controller('kho')
export class khoController {
  constructor(private readonly khoService: khoService) {}

  @Post()
  create(@Body() createkhoDto: any) {
    return this.khoService.create(createkhoDto);
  }
  @Get('tonkho')
  getPaginated(@Query('page') page: string, @Query('limit') limit: string) {
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 10;
    return this.khoService.gettonkho(pageNumber, limitNumber);
  }
  @Get()
  findAll() {
    return this.khoService.findAll();
  }

  @Get('findid/:id')
  findOne(@Param('id') id: string) {
    return this.khoService.findOne(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatekhoDto: any) {
    return this.khoService.update(id, updatekhoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.khoService.remove(id);
  }
}