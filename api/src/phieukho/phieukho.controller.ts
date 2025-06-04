import { Controller, Get, Post, Body, Param, Patch, Delete, Query } from '@nestjs/common';
import { PhieukhoService } from './phieukho.service';
import { Audit } from 'src/auditlog/audit.decorator';
import { AuditAction } from '@prisma/client';
@Controller('phieukho')
export class PhieukhoController {
  constructor(private readonly phieukhoService: PhieukhoService) {}

  @Post()
  @Audit({entity: 'Create Phieukho', action: AuditAction.CREATE, includeResponse: true})
  create(@Body() createPhieukhoDto: any) {
    return this.phieukhoService.create(createPhieukhoDto);
  }

  @Get()
  findAll() {
    return this.phieukhoService.findAll();
  }
  @Post('xuatnhapton')
  @Audit({entity: 'Xuat Nhap Ton', action: AuditAction.CREATE, includeResponse: true})
  xuatnhapton(@Body() query: any) {
    return this.phieukhoService.xuatnhapton(query);
  }

  @Get('findid/:id')
  findOne(@Param('id') id: string) {
    return this.phieukhoService.findOne(id);
  }
  @Patch(':id')
  @Audit({entity: 'Update Phieukho', action: AuditAction.UPDATE, includeResponse: true})
  update(@Param('id') id: string, @Body() updatePhieukhoDto: any) {
    return this.phieukhoService.update(id, updatePhieukhoDto);
  }

  @Delete(':id')
  @Audit({entity: 'Remove Phieukho', action: AuditAction.DELETE, includeResponse: true})
  remove(@Param('id') id: string) {
    return this.phieukhoService.remove(id);
  }
}