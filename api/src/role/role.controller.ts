import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { RoleService } from './role.service';
import { Audit } from 'src/auditlog/audit.decorator';
import { AuditAction } from '@prisma/client';
@Controller('role')
export class RoleController {
  constructor(private readonly rolesService: RoleService) {}

  @Post()
  @Audit({entity: 'Create Role', action: AuditAction.CREATE, includeResponse: true})
  create(@Body() createRoleDto: any) {
    return this.rolesService.create(createRoleDto);
  }
  @Post('assign')
  @Audit({entity: 'Assign Permission to Role', action: AuditAction.CREATE, includeResponse: true})
  async assignPermissionToRole(@Body() data: any) {
    return this.rolesService.assignPermissionToRole(data);
  }

  @Delete('remove')
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
  @Audit({entity: 'Update Role', action: AuditAction.UPDATE, includeResponse: true})
  update(@Param('id') id: string, @Body() updateRoleDto: any) {
    return this.rolesService.update(id, updateRoleDto);
  }

  @Delete(':id')
  @Audit({entity: 'Delete Role', action: AuditAction.DELETE, includeResponse: true})
  remove(@Param('id') id: string) {
    return this.rolesService.remove(id);
  }
}
