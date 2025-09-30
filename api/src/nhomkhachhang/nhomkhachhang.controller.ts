import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { NhomkhachhangService } from './nhomkhachhang.service';
import { Audit } from 'src/auditlog/audit.decorator';
import { AuditAction } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('nhomkhachhang')
export class NhomkhachhangController {
  constructor(private readonly nhomkhachhangService: NhomkhachhangService) {}
  @Post()
  @UseGuards(JwtAuthGuard)
  @Audit({entity: 'Create Nhomkhachhang', action: AuditAction.CREATE, includeResponse: true})
  create(@Body() createNhomkhachhangDto: any) {
    return this.nhomkhachhangService.create(createNhomkhachhangDto);
  }
  @Get()
  findAll() {
    return this.nhomkhachhangService.findAll();
  }
  @Post('addKHtoNhom')
  @UseGuards(JwtAuthGuard)
  @Audit({entity: 'Add Khachhang to Nhom', action: AuditAction.CREATE, includeResponse: true})
  addMultipleKhachhangToNhom(@Body() data:any) {
    return this.nhomkhachhangService.addKHtoNhom(data.nhomId,data.khachhangIds);
  }
  @Post('removeKHfromNhom')
  @UseGuards(JwtAuthGuard)
  @Audit({entity: 'Remove Khachhang from Nhom', action: AuditAction.DELETE, includeResponse: true})
  removeKHfromNhom(@Body() data:any) {
    return this.nhomkhachhangService.removeKHfromNhom(data.nhomId,data.khachhangIds);
  }
  @Get('findid/:id')
  findOne(@Param('id') id: string) {
    return this.nhomkhachhangService.findOne(id);
  }
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @Audit({entity: 'Update Nhomkhachhang', action: AuditAction.UPDATE, includeResponse: true})
  update(@Param('id') id: string, @Body() updateNhomkhachhangDto: any) {
    return this.nhomkhachhangService.update(id, updateNhomkhachhangDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Audit({entity: 'Delete Nhomkhachhang', action: AuditAction.DELETE, includeResponse: true})
  remove(@Param('id') id: string) {
    return this.nhomkhachhangService.remove(id);
  }
}