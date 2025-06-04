import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Permissions } from '../decorators/permissions.decorator';
import { PermissionsGuard } from '../guards/permissions.guard';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Audit } from 'src/auditlog/audit.decorator';
import { AuditAction } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  @Audit({entity: 'Create User', action: AuditAction.CREATE, includeResponse: true})
  create(@Body() dto: any) {
    return this.userService.createUser(dto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  // @Permissions('view_profile')
  async getProfile(@Req() req) {
    return this.userService.findOne(req.user.id);
  }
  @Post('assign')
  @Audit({entity: 'Assign Role to User', action: AuditAction.CREATE, includeResponse: true})
  async assignRoleToUser(@Body() data: any) {
    return this.userService.assignRoleToUser(data);
  }

  @Delete('remove')
  @Audit({entity: 'Remove Role from User', action: AuditAction.DELETE, includeResponse: true})
  async removeRoleFromUser(@Body() data: any) {
    return this.userService.removeRoleFromUser(data);
  }
  @Get('findid/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
  @Patch(':id')
  @Audit({entity: 'Update User', action: AuditAction.UPDATE, includeResponse: true})
  update(@Param('id') id: string, @Body() data: any) {
    return this.userService.update(id, data);
  }

  @Delete(':id')
  @Audit({entity: 'Delete User', action: AuditAction.DELETE, includeResponse: true})
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }  
}
