import { Injectable, inject } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UserPermissionGraphQLService, UserPermission } from './user-permission-graphql.service';
import { PermissionGraphQLService, Permission as BasePermission } from '../permission/permission-graphql.service';
import { UserGraphQLService, User } from '../user/user-graphql.service';

// Updated interfaces to match Prisma schema

export interface UserPermissionDetails {
  id: string;
  email?: string;
  SDT?: string;
  isActive: boolean;
  profile?: {
    name: string;
    avatar?: string;
    bio?: string;
  };
  roles: any[]; // Use any for compatibility with existing UserRole from user service
  userPermissions: {
    id: string;
    isGranted: boolean;
    grantedBy?: string;
    grantedAt?: string;
    expiresAt?: string;
    reason?: string;
    permission: BasePermission;
    createdAt?: string;
    updatedAt?: string;
  }[];
}

export interface PermissionSummary {
  totalRolePermissions: number;
  grantedPermissions: number;
  deniedPermissions: number;
  effectivePermissions: BasePermission[];
  rolePermissions: BasePermission[];
  userGranted: any[];
  userDenied: any[];
}

@Injectable({
  providedIn: 'root'
})
export class UserPermissionDetailsService {
  private userPermissionService = inject(UserPermissionGraphQLService);
  private permissionService = inject(PermissionGraphQLService);
  private userService = inject(UserGraphQLService);

  private cachedUsers = new Map<string, UserPermissionDetails>();
  private cachedPermissions: BasePermission[] = [];

  /**
   * Get user permission details by userId
   */
  getUserPermissionDetails(userId: string): Observable<UserPermissionDetails | null> {
    if (!userId || userId === 'new') {
      return of(null);
    }

    // Check cache first
    if (this.cachedUsers.has(userId)) {
      return of(this.cachedUsers.get(userId)!);
    }

    // Load user data with roles and user permissions
    return this.loadUserWithPermissions(userId).pipe(
      map(userDetails => {
        if (userDetails) {
          // Cache the result
          this.cachedUsers.set(userId, userDetails);
        }
        return userDetails;
      }),
      catchError(error => {
        console.error('Error loading user permission details:', error);
        return of(null);
      })
    );
  }

  /**
   * Get all available permissions
   */
  getAllPermissions(): Observable<BasePermission[]> {
    if (this.cachedPermissions.length > 0) {
      return of(this.cachedPermissions);
    }

    return new Observable(observer => {
      this.permissionService.loadAllPermissions().then(() => {
        this.cachedPermissions = this.permissionService.allPermissions();
        observer.next(this.cachedPermissions);
        observer.complete();
      }).catch(error => {
        console.error('Error loading permissions:', error);
        observer.next([]);
        observer.complete();
      });
    });
  }

  /**
   * Generate permission summary for a user
   */
  getPermissionSummary(userDetails: UserPermissionDetails): PermissionSummary {
    const rolePermissions = this.extractRolePermissions(userDetails.roles);
    const userGranted = userDetails.userPermissions.filter(up => up.isGranted);
    const userDenied = userDetails.userPermissions.filter(up => !up.isGranted);
    // console.log('rolePermissions', rolePermissions);
    // console.log('userGranted', userGranted);
    // console.log('userDenied', userDenied);
    
    // Calculate effective permissions - convert to Permission format
    const effectivePermissions = this.calculateEffectivePermissions(
      rolePermissions,
      userGranted.map(up => up.permission),
      userDenied.map(up => up.permission)
    );

    return {
      totalRolePermissions: rolePermissions.length,
      grantedPermissions: userGranted.length,
      deniedPermissions: userDenied.length,
      effectivePermissions,
      rolePermissions,
      userGranted,
      userDenied
    };
  }

  /**
   * Clear cached data
   */
  clearCache() {
    this.cachedUsers.clear();
    this.cachedPermissions = [];
  }

  /**
   * Clear specific user cache
   */
  clearUserCache(userId: string) {
    this.cachedUsers.delete(userId);
  }

  // Private methods

  private loadUserWithPermissions(userId: string): Observable<UserPermissionDetails | null> {
    return new Observable(observer => {
      this.loadUserWithPermissionsAsync(userId).then(result => {
        observer.next(result);
        observer.complete();
      }).catch(error => {
        console.error('Error in loadUserWithPermissions:', error);
        observer.next(null);
        observer.complete();
      });
    });
  }

  private async loadUserWithPermissionsAsync(userId: string): Promise<UserPermissionDetails | null> {
    try {
      // Load user basic info
      const user = await this.userService.getUserById(userId);
      if (!user) {
        return null;
      }

      // Load user permissions
      const userPermissions = await this.userPermissionService.getUserPermissions(userId);

      // Transform to expected format
      const userDetails: UserPermissionDetails = {
        id: user.id,
        email: user.email,
        SDT: user.SDT,
        isActive: user.isActive,
        profile: user.profile,
        roles: user.roles || [],
        userPermissions: userPermissions.map((up:any) => ({
          id: up.id,
          isGranted: up.isGranted,
          permission: up.permission ? {
            id: up.permission.id,
            name: up.permission.name,
            code: up.permission.codeId || '',
            description: up.permission.description,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date()
          } : {
            id: '',
            name: 'Unknown Permission',
            code: '',
            description: '',
            isActive: false,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          createdAt: up.createdAt,
          updatedAt: up.updatedAt
        }))
      };

      return userDetails;
    } catch (error) {
      console.error('Error in loadUserWithPermissionsAsync:', error);
      return null;
    }
  }

  private extractRolePermissions(roles: any[]): BasePermission[] {
    const permissionMap = new Map<string, BasePermission>();
    
    roles.forEach(userRole => {
      const role = userRole.role;
      // console.log('role.permissions',role.permissions);
      
      if (role && role.permissions) {
        role.permissions.forEach((permission: any) => {
          if (permission && permission.id) {
            // Convert to proper Permission format
            const fullPermission: BasePermission = {
              id: permission.id,
              name: permission?.permission?.name,
              code: permission?.permission?.codeId || permission?.permission?.code || '',
              description: permission.description,
              isActive: true,
              createdAt: new Date(),
              updatedAt: new Date()
            };
            permissionMap.set(permission.id, fullPermission);
          }
        });
      }
    });

    return Array.from(permissionMap.values());
  }

  private calculateEffectivePermissions(
    rolePermissions: BasePermission[],
    userGranted: any[],
    userDenied: any[]
  ): BasePermission[] {
    const effectiveMap = new Map<string, BasePermission>();
    
    // Start with role permissions
    rolePermissions.forEach(permission => {
      effectiveMap.set(permission.id, permission);
    });

    // Add user granted permissions (convert to Permission format)
    userGranted.forEach(permission => {
      if (permission && permission.id) {
        const fullPermission: BasePermission = {
          id: permission.id,
          name: permission.name,
          code: permission.codeId || permission.code || '',
          description: permission.description,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        effectiveMap.set(permission.id, fullPermission);
      }
    });

    // Remove user denied permissions
    userDenied.forEach(permission => {
      if (permission && permission.id) {
        effectiveMap.delete(permission.id);
      }
    });

    return Array.from(effectiveMap.values());
  }
}