import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSION_KEY } from '../decorators/permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.get<string[]>(PERMISSION_KEY, context.getHandler());
    if (!requiredPermissions) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;    
    if (!user) {
      throw new UnauthorizedException('Bạn chưa đăng nhập');
    }

    for (const permission of requiredPermissions) {

    }

    throw new UnauthorizedException('Bạn không có quyền truy cập');
  }
}
