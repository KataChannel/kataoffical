import { Controller, Get, Post, Body, Param, Patch, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { TrackingService } from './tracking.service';
import { CreateTrackingDto, UpdateTrackingDto, ReorderTrackingDto, FindByDto } from './dto/tracking.dto';

@Controller('tracking')
export class TrackingController {
  constructor(private readonly trackingService: TrackingService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createTrackingDto: CreateTrackingDto) {
    return this.trackingService.create(createTrackingDto);
  }

  @Post('findby')
  @UsePipes(new ValidationPipe())
  findBy(@Body() param: FindByDto) {
    return this.trackingService.findBy(param);
  }

  @Get()
  findAll() {
    return this.trackingService.findAll();
  }

  @Get('findid/:id')
  findOne(@Param('id') id: string) {
    return this.trackingService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: string, @Body() updateTrackingDto: UpdateTrackingDto) {
    return this.trackingService.update(id, updateTrackingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trackingService.remove(id);
  }

  @Post('reorder')
  @UsePipes(new ValidationPipe())
  reorder(@Body() reorderTrackingDto: ReorderTrackingDto) {
    return this.trackingService.reorderTrackings(reorderTrackingDto.trackingIds);
  }
}