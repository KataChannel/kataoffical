import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Permissions } from '../decorators/permissions.decorator';
import { PermissionsGuard } from '../guards/permissions.guard';
import { AuthService } from '../auth/auth.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  create(@Body() dto: any) {
    return this.userService.createUser(dto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }
  @Get('profile')
  @UseGuards(PermissionsGuard)
  @Permissions('view_profile')
  async getProfile(@Req() req) {
    return this.authService.getUserRoles(req.user.id);
  }
  @Get('findid/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.userService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }  
}
