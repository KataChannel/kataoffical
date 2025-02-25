import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { BanggiaService } from './banggia.service';

@Controller('banggia')
export class BanggiaController {
  constructor(private readonly banggiaService: BanggiaService) {}

  @Post()
  create(@Body() createBanggiaDto: any) {
    return this.banggiaService.createBanggia(createBanggiaDto);
  }

  @Get()
  findAll() {
    return this.banggiaService.findAll();
  }

  @Get('findid/:id')
  findOne(@Param('id') id: string) {
    return this.banggiaService.findOne(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBanggiaDto: any) {
    return this.banggiaService.update(id, updateBanggiaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.banggiaService.remove(id);
  }
  @Post('reorder')
  reorder(@Body() body: { banggiaIds: string[] }) {
    return this.banggiaService.reorderBanggias(body.banggiaIds);
  }
}