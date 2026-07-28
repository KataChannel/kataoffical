import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserPermissionService } from './user-permission.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../guards/permissions.guard';
import { Permissions } from '../decorators/permissions.decorator';

@Controller('user-permissions')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class UserPermissionController {
  constructor(private readonly userPermissionService: UserPermissionService) {}

  /**
   * Assign permission to user
   */
  @Post('assign')
  @Permissions('manage_user_permissions')
  async assignPermissionToUser(
    @Body() data: {
      userId: string;
      permissionId: string;
      isGranted: boolean;
      grantedBy: string;
      reason?: string;
      expiresAt?: string; // ISO date string
    }
  ) {
    const assignData = {
      ...data,
      expiresAt: data.expiresAt ? new Date(data.expiresAt) : undefined,
    };

    return this.userPermissionService.assignPermissionToUser(assignData);
  }

  /**
   * Remove user permission
   */
  @Delete(':userId/:permissionId')
  @Permissions('manage_user_permissions')
  async removeUserPermission(
    @Param('userId') userId: string,
    @Param('permissionId') permissionId: string
  ) {
    return this.userPermissionService.removeUserPermission(userId, permissionId);
  }

  /**
   * Get user permissions
   */
  @Get('user/:userId')
  @Permissions('view_user_permissions')
  async getUserPermissions(@Param('userId') userId: string) {
    return this.userPermissionService.getUserPermissions(userId);
  }

  /**
   * Get user effective permission
   */
  @Get('user/:userId/permission/:permissionId')
  @Permissions('view_user_permissions')
  async getUserEffectivePermission(
    @Param('userId') userId: string,
    @Param('permissionId') permissionId: string
  ) {
    return this.userPermissionService.getUserEffectivePermission(userId, permissionId);
  }

  /**
   * Get user effective permission by name
   */
  @Get('user/:userId/permission-name/:permissionName')
  @Permissions('view_user_permissions')
  async getUserEffectivePermissionByName(
    @Param('userId') userId: string,
    @Param('permissionName') permissionName: string
  ) {
    return this.userPermissionService.getUserEffectivePermissionByName(userId, permissionName);
  }

  /**
   * Get all user permissions with filtering and pagination
   */
  @Get()
  @Permissions('view_user_permissions')
  async findMany(
    @Query('userId') userId?: string,
    @Query('permissionId') permissionId?: string,
    @Query('isGranted') isGranted?: string,
    @Query('isExpired') isExpired?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string
  ) {
    return this.userPermissionService.findMany({
      userId,
      permissionId,
      isGranted: isGranted === 'true' ? true : isGranted === 'false' ? false : undefined,
      isExpired: isExpired === 'true' ? true : isExpired === 'false' ? false : undefined,
      page: page ? parseInt(page) : undefined,
      limit: limit ? parseInt(limit) : undefined,
    });
  }

  /**
   * Batch assign permissions to multiple users
   */
  @Post('batch-assign')
  @Permissions('manage_user_permissions')
  async batchAssignPermissions(
    @Body() data: {
      userIds: string[];
      permissionIds: string[];
      isGranted: boolean;
      grantedBy: string;
      reason?: string;
      expiresAt?: string; // ISO date string
    }
  ) {
    const assignData = {
      ...data,
      expiresAt: data.expiresAt ? new Date(data.expiresAt) : undefined,
    };

    return this.userPermissionService.batchAssignPermissions(assignData);
  }

  /**
   * Clean up expired permissions
   */
  @Post('cleanup-expired')
  @Permissions('manage_user_permissions')
  async cleanupExpiredPermissions() {
    return this.userPermissionService.cleanupExpiredPermissions();
  }

  /**
   * Get permission statistics
   */
  @Get('stats')
  @Permissions('view_user_permissions')
  async getPermissionStats() {
    return this.userPermissionService.getPermissionStats();
  }
}