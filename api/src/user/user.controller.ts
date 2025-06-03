import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Audit } from 'src/auditlog/audit.decorator';
import { AuditAction } from '@prisma/client';
import { AuditService } from 'src/auditlog/auditlog.service';
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Post()
  @Audit({
    entity: 'User',
    action: AuditAction.CREATE,
    includeResponse: true,
  })
  create(@Body() dto: any) {
    return this.userService.createUser(dto);
  }
  @Post('findby')
  findby(@Body() param: any) {
    return this.userService.findby(param);
  }
  @Get()
  findAll() {
    return this.userService.findAll();
  }
  @Get('last-updated')
  async getLastUpdated() {
    return this.userService.getLastUpdated();
}
  @Get('leaderboard')
  leaderboard() {
    return this.userService.leaderboard();
  }
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  // @Permissions('view_profile')
  async getProfile(@Req() req: any) {    
    return this.userService.findOne(req.user.id);
  }
  @Post('assign')
  async assignRoleToUser(@Body() data: any) {
    return this.userService.assignRoleToUser(data);
  }

  @Delete('remove')
  async removeRoleFromUser(@Body() data: any) {
    return this.userService.removeRoleFromUser(data);
  }
  @Get('findid/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
  @Patch(':id')
  @Audit({
    entity: 'User',
    action: AuditAction.UPDATE,
    includeResponse: true,
  })
  update(@Param('id') id: string, @Body() data: any) {
    return this.userService.update(id, data);
  }
  @Delete(':id')
  @Audit({
    entity: 'User',
    action: AuditAction.DELETE,
  })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }  
}
