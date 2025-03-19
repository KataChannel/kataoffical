import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ErrorlogsService } from './errorlogs.service';

@Controller('errorlogs')
export class ErrorlogsController {
  constructor(private readonly errorlogsService: ErrorlogsService) {}
  @Post()
  async logFromClient(@Body() logData: { timestamp: string; message: string; details?: any }) {
    await this.errorlogsService.logError(logData.message, logData.details, 'client');
    return { status: 'Logged' };
  }
  // @Post()
  // create(@Body() createErrorlogsDto: any) {
  //   return this.errorlogsService.create(createErrorlogsDto);
  // }
  @Get()
  findAll() {
    return this.errorlogsService.findAll();
  }

  @Get('findid/:id')
  findOne(@Param('id') id: string) {
    return this.errorlogsService.findOne(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateErrorlogsDto: any) {
    return this.errorlogsService.update(id, updateErrorlogsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.errorlogsService.remove(id);
  }
}