import { Injectable, inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const GET_USER_PERMISSION_DETAILS = gql`
  query GetUserPermissionDetails($userId: String!) {
    user: getUserById(id: $userId) {
      id
      username
      email
      roles {
        id
        name
        description
        permissions {
          id
          name
          description
          resource
          action
        }
      }
      userPermissions {
        id
        type
        permission {
          id
          name
          description
          resource
          action
        }
        createdAt
        updatedAt
      }
    }
  }
`;

const GET_ALL_PERMISSIONS = gql`
  query GetAllPermissions {
    permissions: getAllPermissions {
      id
      name
      description
      resource
      action
    }
  }
`;

export interface Permission {
  id: string;
  name: string;
  description?: string;
  resource?: string;
  action?: string;
}

export interface UserPermission {
  id: string;
  type: 'GRANTED' | 'DENIED';
  permission: Permission;
  createdAt: string;
  updatedAt: string;
}

export interface Role {
  id: string;
  name: string;
  description?: string;
  permissions: Permission[];
}

export interface UserPermissionDetails {
  id: string;
  username: string;
  email: string;
  roles: Role[];
  userPermissions: UserPermission[];
}

@Injectable({
  providedIn: 'root'
})
export class UserPermissionDetailsService {
  private apollo = inject(Apollo);

  getUserPermissionDetails(userId: string): Observable<UserPermissionDetails | null> {
    return this.apollo.query<{ user: UserPermissionDetails }>({
      query: GET_USER_PERMISSION_DETAILS,
      variables: { userId },
      errorPolicy: 'all'
    }).pipe(
      map(result => result.data?.user || null)
    );
  }

  getAllPermissions(): Observable<Permission[]> {
    return this.apollo.query<{ permissions: Permission[] }>({
      query: GET_ALL_PERMISSIONS,
      errorPolicy: 'all'
    }).pipe(
      map(result => result.data?.permissions || [])
    );
  }

  calculateEffectivePermissions(user: UserPermissionDetails): Permission[] {
    if (!user) return [];

    // Get all permissions from roles
    const rolePermissions = new Map<string, Permission>();
    user.roles?.forEach(role => {
      role.permissions?.forEach(permission => {
        rolePermissions.set(permission.name, permission);
      });
    });

    // Apply user-specific permissions
    const deniedPermissions = new Set<string>();
    const grantedPermissions = new Map<string, Permission>();

    user.userPermissions?.forEach(userPerm => {
      if (userPerm.type === 'DENIED') {
        deniedPermissions.add(userPerm.permission.name);
        // Remove from granted if it was there
        grantedPermissions.delete(userPerm.permission.name);
      } else if (userPerm.type === 'GRANTED') {
        // Only grant if not denied
        if (!deniedPermissions.has(userPerm.permission.name)) {
          grantedPermissions.set(userPerm.permission.name, userPerm.permission);
        }
      }
    });

    // Final effective permissions = role permissions + granted - denied
    const effective = new Map<string, Permission>();

    // Add role permissions (except denied ones)
    rolePermissions.forEach((permission, name) => {
      if (!deniedPermissions.has(name)) {
        effective.set(name, permission);
      }
    });

    // Add granted permissions
    grantedPermissions.forEach((permission, name) => {
      effective.set(name, permission);
    });

    return Array.from(effective.values());
  }

  getPermissionSummary(user: UserPermissionDetails) {
    if (!user) {
      return {
        totalRolePermissions: 0,
        grantedPermissions: 0,
        deniedPermissions: 0,
        effectivePermissions: [],
        rolePermissions: [],
        userGranted: [],
        userDenied: []
      };
    }

    const rolePermissions = user.roles?.flatMap(role => 
      role.permissions || []
    ) || [];

    const userGranted = user.userPermissions?.filter(up => up.type === 'GRANTED') || [];
    const userDenied = user.userPermissions?.filter(up => up.type === 'DENIED') || [];

    const effectivePermissions = this.calculateEffectivePermissions(user);

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
}