import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { landingPageService } from './landingpage.service';
@Controller('landingpage')
export class LandingpageController {
  constructor(private readonly landingpageService: landingPageService) {}
  @Post()
  create(@Body() data: any) {
     return this.landingpageService.create(data);
  }
  @Post('findby')
  findby(@Body() param: any) {
    return this.landingpageService.findBy(param);
  }
  @Get()
  findAll() {
    return this.landingpageService.findAll();
  }
  @Get('findid/:id')
  findOne(@Param('id') id: string) {
    return this.landingpageService.findOne(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.landingpageService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.landingpageService.remove(id);
  }
  @Post('reorder')
  reorder(@Body() body: { landingpageIds: string[] }) {
    return this.landingpageService.reorderlandingPages(body.landingpageIds);
  }
}