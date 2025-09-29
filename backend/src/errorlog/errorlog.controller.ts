import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ErrorlogService } from './errorlog.service';

@Controller('errorlog')
export class ErrorlogController {
  constructor(private readonly errorlogService: ErrorlogService) {}
  @Post()
  async logFromClient(@Body() logData: { timestamp: string; message: string; details?: any }) {
    await this.errorlogService.logError(logData.message, logData.details, 'client');
    return { status: 'Logged' };
  }
  // @Post()
  // create(@Body() createErrorlogDto: any) {
  //   return this.errorlogService.create(createErrorlogDto);
  // }

  @Get()
  findAll() {
    return this.errorlogService.findAll();
  }

  @Get('findid/:id')
  findOne(@Param('id') id: string) {
    return this.errorlogService.findOne(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateErrorlogDto: any) {
    return this.errorlogService.update(id, updateErrorlogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.errorlogService.remove(id);
  }
}