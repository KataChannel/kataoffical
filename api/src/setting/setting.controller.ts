import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { SettingService } from './setting.service';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('setting')
@Controller('setting')
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  @ApiOperation({ summary: 'Create a new setting' })
  @ApiBody({ type: Object })
  @Post()
  async create(@Body() data: any) {
    try {
      const result = await this.settingService.create(data);
      return { statusCode: HttpStatus.CREATED, data: result };
    } catch (error) {
      throw new HttpException(error.message || 'Create setting failed', HttpStatus.BAD_REQUEST);
    }
  }

  @ApiOperation({ summary: 'Find settings by parameters' })
  @ApiBody({ type: Object })
  @Post('findby')
  async findby(@Body() param: any) {
    try {
      const result = await this.settingService.findBy(param);
      return { statusCode: HttpStatus.OK, data: result };
    } catch (error) {
      throw new HttpException(error.message || 'Find settings failed', HttpStatus.BAD_REQUEST);
    }
  }
  
  @ApiOperation({ summary: 'Get all settings' })
  @Get()
  async findAll() {
    try {
      const result = await this.settingService.findAll();
      return { statusCode: HttpStatus.OK, data: result };
    } catch (error) {
      throw new HttpException(error.message || 'Get all settings failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Get last updated setting' })
  @Get('lastupdated')
  async getLastUpdatedSetting() {
    try {
      const result = await this.settingService.getLastUpdatedSetting();
      return { statusCode: HttpStatus.OK, data: result };
    } catch (error) {
      throw new HttpException(error.message || 'Get last updated setting failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Find setting by ID' })
  @ApiParam({ name: 'id', type: String })
  @Get('findid/:id')
  async findOne(@Param('id') id: string) {
    try {
      const result = await this.settingService.findOne(id);
      if (!result) {
        throw new HttpException('Setting not found', HttpStatus.NOT_FOUND);
      }
      return { statusCode: HttpStatus.OK, data: result };
    } catch (error) {
      throw new HttpException(error.message || 'Find setting by ID failed', error.status || HttpStatus.BAD_REQUEST);
    }
  }

   @ApiOperation({ summary: 'Update a setting' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: Object })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    try {
      const result = await this.settingService.update(id, data);
      return { statusCode: HttpStatus.OK, data: result };
    } catch (error) {
      throw new HttpException(error.message || 'Update setting failed', HttpStatus.BAD_REQUEST);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a setting' })
  @ApiParam({ name: 'id', type: String })
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const result = await this.settingService.remove(id);
      return { statusCode: HttpStatus.OK, data: result };
    } catch (error) {
      throw new HttpException(error.message || 'Delete setting failed', HttpStatus.BAD_REQUEST);
    }
  }

  @ApiOperation({ summary: 'Reorder settings' })
  @ApiBody({ schema: { properties: { settingIds: { type: 'array', items: { type: 'string' } } } } })
  @Post('reorder')
  async reorder(@Body() body: { settingIds: string[] }) {
    try {
      const result = await this.settingService.reorderSettings(body.settingIds);
      return { statusCode: HttpStatus.OK, data: result };
    } catch (error) {
      throw new HttpException(error.message || 'Reorder settings failed', HttpStatus.BAD_REQUEST);
    }
  }
}