import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { UserguideService } from './userguide.service';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Audit } from 'src/auditlog/audit.decorator';
import { AuditAction } from '@prisma/client';
@ApiTags('userguide')
@Controller('userguide')
export class UserguideController {
  constructor(private readonly userguideService: UserguideService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new userguide' })
  @ApiBody({ type: Object })
  @UseGuards(JwtAuthGuard)
  @Post()
  @Audit({entity: 'Create Userguide', action: AuditAction.CREATE, includeResponse: true})
  async create(@Body() data: any) {
    try {
      return await this.userguideService.create(data);
    } catch (error) {
      throw new HttpException(error.message || 'Create failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Find userguides by parameters' })
  @ApiBody({ type: Object })
  @Post('findby')
  async findby(@Body() param: any) {
    try {
      return await this.userguideService.findBy(param);
    } catch (error) {
      throw new HttpException(error.message || 'Find failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Get all userguides' })
  @Get()
  async findAll() {
    try {
      return await this.userguideService.findAll();
    } catch (error) {
      throw new HttpException(error.message || 'Find all failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Get last updated userguide' })
  @Get('lastupdated')
  async getLastUpdatedUserguide() {
    try {
      return await this.userguideService.getLastUpdatedUserguide();
    } catch (error) {
      throw new HttpException(error.message || 'Get last updated failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Find userguide by ID' })
  @ApiParam({ name: 'id', type: String })
  @Get('findid/:id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.userguideService.findOne(id);
    } catch (error) {
      throw new HttpException(error.message || 'Find one failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a userguide' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: Object })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @Audit({entity: 'Update Userguide', action: AuditAction.UPDATE, includeResponse: true})
  async update(@Param('id') id: string, @Body() data: any) {
    try {
      return await this.userguideService.update(id, data);
    } catch (error) {
      throw new HttpException(error.message || 'Update failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a userguide' })
  @ApiParam({ name: 'id', type: String })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @Audit({entity: 'Delete Userguide', action: AuditAction.DELETE, includeResponse: true})
  async remove(@Param('id') id: string) {
    try {
      return await this.userguideService.remove(id);
    } catch (error) {
      throw new HttpException(error.message || 'Delete failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Reorder userguides' })
  @ApiBody({
    schema: {
      properties: {
        userguideIds: { type: 'array', items: { type: 'string' } },
      },
    },
  })
  @Post('reorder')
  async reorder(@Body() body: { userguideIds: string[] }) {
    try {
      return await this.userguideService.reorderUserguides(body.userguideIds);
    } catch (error) {
      throw new HttpException(error.message || 'Reorder failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}