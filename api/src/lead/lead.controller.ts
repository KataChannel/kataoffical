import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { leadService } from './lead.service';
@Controller('lead')
export class leadController {
  constructor(private readonly leadService: leadService) {}
  @Post()
  create(@Body() createleadDto: any) {
    return this.leadService.create(createleadDto);
  }
  @Post('findby')
  findby(@Body() param: any) {
    return this.leadService.findby(param);
  }
  @Get()
  findAll() {
    return this.leadService.findAll();
  }
  @Get('last-updated')
    async getLastUpdatedlead() {
      return this.leadService.getLastUpdatedlead();
  }
  @Get('findid/:id')
  findOne(@Param('id') id: string) {
    return this.leadService.findOne(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.leadService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leadService.remove(id);
  }
  @Post('reorder')
  reorder(@Body() body: { leadIds: string[] }) {
    return this.leadService.reorderleads(body.leadIds);
  }
}