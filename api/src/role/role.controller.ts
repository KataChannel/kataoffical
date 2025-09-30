import { Controller, Get, Post, Body, Param, Delete, Patch, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { Audit } from 'src/auditlog/audit.decorator';
import { AuditAction } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@Controller('role')
export class RoleController {
  constructor(private readonly rolesService: RoleService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @Audit({entity: 'Create Role', action: AuditAction.CREATE, includeResponse: true})
  create(@Body() createRoleDto: any) {
    return this.rolesService.create(createRoleDto);
  }
  @Post('assign')
  @UseGuards(JwtAuthGuard)
  @Audit({entity: 'Assign Permission to Role', action: AuditAction.CREATE, includeResponse: true})
  async assignPermissionToRole(@Body() data: any) {
    return this.rolesService.assignPermissionToRole(data);
  }

  @Delete('remove')
  @UseGuards(JwtAuthGuard)
  @Audit({entity: 'Remove Permission from Role', action: AuditAction.DELETE, includeResponse: true})
  async removePermissionFromRole(@Body() data: any) {
    return this.rolesService.removePermissionFromRole(data);
  }
  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @Audit({entity: 'Update Role', action: AuditAction.UPDATE, includeResponse: true})
  update(@Param('id') id: string, @Body() updateRoleDto: any) {
    return this.rolesService.update(id, updateRoleDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Audit({entity: 'Delete Role', action: AuditAction.DELETE, includeResponse: true})
  remove(@Param('id') id: string) {
    return this.rolesService.remove(id);
  }
}
