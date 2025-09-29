import { Controller, Get, Post, Body, Param, Patch, Delete, UsePipes, ValidationPipe, Ip,Headers } from '@nestjs/common';
import { TrackingeventService } from './trackingevent.service';

@Controller('trackingevent')
export class TrackingeventController {
  constructor(private readonly trackingeventService: TrackingeventService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(
    @Body() data: any,
    @Ip() ipAddress: string,
    @Headers('user-agent') userAgent: string,
  ) {
    return this.trackingeventService.create(data,ipAddress,userAgent);
  }

  @Post('findby')
  @UsePipes(new ValidationPipe())
  findBy(@Body() param: any) {
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
  update(@Param('id') id: string, @Body() updateTrackingeventDto: any) {
    return this.trackingeventService.update(id, updateTrackingeventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trackingeventService.remove(id);
  }
}