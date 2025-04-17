import { BadRequestException, Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { SearchDto } from './app.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('v')
  getVersion(): string {
    return '1.1.1'
  }
  @Post('search')
  async search(@Body() searchDto: SearchDto) {
    if (!searchDto.model) {
      throw new BadRequestException('Thiếu model cần tìm kiếm');
    }
    return this.appService.search(searchDto);
  }
  @Get('last-updated')
  async getLastUpdated(@Query('table') table: string) {
    return this.appService.getLastUpdated(table);
  }
}
