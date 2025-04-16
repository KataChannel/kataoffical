import { BadRequestException, Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { SearchDto } from './app.dto';
import { CallbackDataInput } from './callback/dto/callback-data-input.dto';
import { CallbackDataOutput } from './callback/dto/callback-data-output.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('v')
  getVersion(): string {
    return '1.1.6'
  }
  @Post()
  async callBackData(@Body() param: CallbackDataInput): Promise<CallbackDataOutput> {
    console.log(param);
    const result = await this.appService.processCallback(param);
    console.log('Callback processed:', result);
    return result;
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
