import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { PhieukhoService } from './phieukho.service';

@Controller('phieukho')
export class PhieukhoController {
  constructor(private readonly phieukhoService: PhieukhoService) {}

  @Post()
  create(@Body() createPhieukhoDto: any) {
    return this.phieukhoService.create(createPhieukhoDto);
  }

  @Get()
  findAll() {
    return this.phieukhoService.findAll();
  }

  @Get('findid/:id')
  findOne(@Param('id') id: string) {
    return this.phieukhoService.findOne(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePhieukhoDto: any) {
    return this.phieukhoService.update(id, updatePhieukhoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.phieukhoService.remove(id);
  }
}