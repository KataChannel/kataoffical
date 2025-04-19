import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { DexuatService } from './dexuat.service';
@Controller('dexuat')
export class DexuatController {
  constructor(private readonly dexuatService: DexuatService) {}
  @Post()
  create(@Body() createDexuatDto: any) {
    return this.dexuatService.create(createDexuatDto);
  }
  @Post('findby')
  findby(@Body() param: any) {
    return this.dexuatService.findby(param);
  }
  @Get()
  findAll() {
    return this.dexuatService.findAll();
  }
  @Get('last-updated')
    async getLastUpdatedDexuat() {
      return this.dexuatService.getLastUpdatedDexuat();
  }
  @Get('findid/:id')
  findOne(@Param('id') id: string) {
    return this.dexuatService.findOne(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.dexuatService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dexuatService.remove(id);
  }
  @Post('reorder')
  reorder(@Body() body: { dexuatIds: string[] }) {
    return this.dexuatService.reorderDexuats(body.dexuatIds);
  }
}