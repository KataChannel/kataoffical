import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { SettingService } from './setting.service';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('setting')
@Controller('setting')
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new setting' })
  @ApiBody({ type: Object })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() data: any) {
    return this.settingService.create(data);
  }

  @ApiOperation({ summary: 'Find settings by parameters' })
  @ApiBody({ type: Object })
  @Post('findby')
  findby(@Body() param: any) {
    return this.settingService.findBy(param);
  }
  
  @ApiOperation({ summary: 'Get all settings' })
  @Get()
  findAll() {
    return this.settingService.findAll();
  }

  @ApiOperation({ summary: 'Get last updated setting' })
  @Get('lastupdated')
  async getLastUpdatedSetting() {
    return this.settingService.getLastUpdatedSetting();
  }

  @ApiOperation({ summary: 'Find setting by ID' })
  @ApiParam({ name: 'id', type: String })
  @Get('findid/:id')
  findOne(@Param('id') id: string) {
    return this.settingService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a setting' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: Object })
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.settingService.update(id, data);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a setting' })
  @ApiParam({ name: 'id', type: String })
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.settingService.remove(id);
  }

  @ApiOperation({ summary: 'Reorder settings' })
  @ApiBody({ schema: { properties: { settingIds: { type: 'array', items: { type: 'string' } } } } })
  @Post('reorder')
  reorder(@Body() body: { settingIds: string[] }) {
    return this.settingService.reorderSettings(body.settingIds);
  }
}