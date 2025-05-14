import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('resource')
@Controller('resource')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new resource' })
  @ApiBody({ type: Object })
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() data: any) {
    try {
      return await this.resourceService.create(data);
    } catch (error) {
      throw new HttpException(error.message || 'Create failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  @ApiOperation({ summary: 'Find resources by parameters' })
  @ApiBody({ type: Object })
  @Post('findby')
  async findby(@Body() param: any) {
    try {
      return await this.resourceService.findBy(param);
    } catch (error) {
      throw new HttpException(error.message || 'Find failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  @ApiOperation({ summary: 'Get all resources' })
  @Get()
  async findAll() {
    try {
      return await this.resourceService.findAll();
    } catch (error) {
      throw new HttpException(error.message || 'Find all failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  @ApiOperation({ summary: 'Get last updated resource' })
  @Get('lastupdated')
  async getLastUpdatedResource() {
    try {
      return await this.resourceService.getLastUpdatedResource();
    } catch (error) {
      throw new HttpException(error.message || 'Get last updated failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Find resource by ID' })
  @ApiParam({ name: 'id', type: String })
  @Get('findid/:id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.resourceService.findOne(id);
    } catch (error) {
      throw new HttpException(error.message || 'Find one failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a resource' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: Object })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    try {
      return await this.resourceService.update(id, data);
    } catch (error) {
      throw new HttpException(error.message || 'Update failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a resource' })
  @ApiParam({ name: 'id', type: String })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.resourceService.remove(id);
    } catch (error) {
      throw new HttpException(error.message || 'Delete failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  @ApiOperation({ summary: 'Reorder resources' })
  @ApiBody({
    schema: {
      properties: {
        resourceIds: { type: 'array', items: { type: 'string' } },
      },
    },
  })
  @Post('reorder')
  async reorder(@Body() body: { resourceIds: string[] }) {
    try {
      return await this.resourceService.reorderResources(body.resourceIds);
    } catch (error) {
      throw new HttpException(error.message || 'Reorder failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}