import { Controller, Get, Post, Body, Param, Patch, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { TrackingeventService } from './trackingevent.service';
import { CreateTrackingeventDto, UpdateTrackingeventDto, ReorderTrackingeventDto, FindByDto } from './dto/trackingevent.dto';

@Controller('trackingevent')
export class TrackingeventController {
  constructor(private readonly trackingeventService: TrackingeventService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createTrackingeventDto: CreateTrackingeventDto) {
    return this.trackingeventService.create(createTrackingeventDto);
  }

  @Post('findby')
  @UsePipes(new ValidationPipe())
  findBy(@Body() param: FindByDto) {
    return this.trackingeventService.findBy(param);
  }

  @Get()
  findAll() {
    return this.trackingeventService.findAll();
  }

  @Get('findid/:id')
  findOne(@Param('id') id: string) {
    return this.trackingeventService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: string, @Body() updateTrackingeventDto: UpdateTrackingeventDto) {
    return this.trackingeventService.update(id, updateTrackingeventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trackingeventService.remove(id);
  }

  @Post('reorder')
  @UsePipes(new ValidationPipe())
  reorder(@Body() reorderTrackingeventDto: ReorderTrackingeventDto) {
    return this.trackingeventService.reorderTrackingevents(reorderTrackingeventDto.trackingeventIds);
  }
}