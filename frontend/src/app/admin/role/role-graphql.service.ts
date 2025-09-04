import { Injectable, signal, computed, inject } from '@angular/core';
import { GraphqlService, OptimizedFindManyOptions } from '../../shared/services/graphql.service';
import { StorageService } from '../../shared/utils/storage.service';

export interface Role {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  permissions?: RolePermission[];
  users?: UserRole[];
}

export interface RolePermission {
  id: string;
  roleId: string;
  permissionId: string;
  permission: {
    id: string;
    name: string;
    codeId?: string;
    group?: string;
    description?: string;
    order?: number;
  };
}

export interface UserRole {
  id: string;
  userId: string;
  roleId: string;
  user: {
    id: string;
    email?: string;
    SDT?: string;
    isActive: boolean;
    profile?: {
      name: string;
      avatar?: string;
      bio?: string;
    };
  };
}

interface Permission {
  id: string;
  name: string;
  codeId?: string;
  group?: string;
  description?: string;
  order?: number;
}

@Injectable({
  providedIn: 'root'
})
export class RoleGraphQLService {
  // Signals for state management
  private _allRoles = signal<Role[]>([]);
  private _searchTerm = signal<string>('');
  private _currentPage = signal<number>(1);
  private _pageSize = signal<number>(50);
  private _isLoading = signal<boolean>(false);
  private _selectedRoles = signal<Set<string>>(new Set());
  private _statusFilter = signal<'all'>('all');

  // Search and filter - computed signal that returns filtered data
  searchResults = computed(() => {
    let filtered = this._allRoles();

    // Apply search term (only search by name since description doesn't exist in schema)
    const term = this._searchTerm().toLowerCase();
    if (term) {
      filtered = filtered.filter(role =>
        role.name.toLowerCase().includes(term)
      );
    }

    return filtered;
  });

  // Public computed signals
  allRoles = this._allRoles.asReadonly();
  filteredRoles = this.searchResults; // Use searchResults directly
  searchTerm = this._searchTerm.asReadonly();
  currentPage = this._currentPage.asReadonly();
  pageSize = this._pageSize.asReadonly();
  isLoading = this._isLoading.asReadonly();
  selectedRoles = this._selectedRoles.asReadonly();
  statusFilter = this._statusFilter.asReadonly();

  // Computed pagination
  totalItems = computed(() => this.searchResults().length);
  totalPages = computed(() => Math.ceil(this.totalItems() / this._pageSize()));
  
  // Client-side pagination
  paginatedRoles = computed(() => {
    const start = (this._currentPage() - 1) * this._pageSize();
    const end = start + this._pageSize();
    return this.searchResults().slice(start, end);
  });

  constructor(
    private storageService: StorageService
  ) {
    // Computed signals are automatically initialized when accessed
  }

  private graphqlService = inject(GraphqlService);

  // ========================= CRUD Operations =========================

  async loadAllRoles(forceRefresh = false): Promise<Role[]> {
    if (!forceRefresh && this._allRoles().length > 0) {
      return this._allRoles();
    }

    this._isLoading.set(true);
    
    try {
      const options: OptimizedFindManyOptions = {
        orderBy: { name: 'asc' },
        include: {
          permissions: {
            include: {
              permission: {
                select: {
                  id: true,
                  name: true,
                  codeId: true,
                }
              }
            }
          },
          users: {
            include: {
              user: {
                include: {
                  profile: {
                    select: {
                      name: true,
                      avatar: true,
                      bio: true
                    }
                  }
                }
              }
            }
          }
        }
      };

      const roles = await this.graphqlService.findMany<Role>('role', options) as Role[];
      this._allRoles.set(roles);
      
      // Reset to first page
      this._currentPage.set(1);
      
      return roles;
    } catch (error) {
      console.error('Error loading roles:', error);
      throw error;
    } finally {
      this._isLoading.set(false);
    }
  }

  async createRole(data: Partial<Role> & { permissionIds?: string[] }): Promise<Role> {
    this._isLoading.set(true);
    
    try {
      const roleData = {
        name: data.name
      };

      const newRole = await this.graphqlService.createOne<Role>('role', {
        data: roleData,
        include: {
          permissions: {
            include: {
              permission: {
                select: {
                  id: true,
                  name: true,
                  codeId: true,
                }
              }
            }
          },
          users: {
            include: {
              user: {

                include: {
                  profile: {
                    select: {
                      name: true,
                      avatar: true,
                      bio: true
                    }
                  }
                }
              }
            }
          }
        }
      }) as Role;

      // Assign permissions if provided
      if (data.permissionIds && data.permissionIds.length > 0) {
        await this.assignPermissionsToRole(newRole.id, data.permissionIds);
        // Reload role data with permissions
        const roleWithPermissions = await this.getRoleById(newRole.id);
        if (roleWithPermissions) {
          const currentRoles = this._allRoles();
          this._allRoles.set([roleWithPermissions, ...currentRoles.filter(r => r.id !== newRole.id)]);
          return roleWithPermissions;
        }
      }

      // Update local state
      const currentRoles = this._allRoles();
      this._allRoles.set([newRole, ...currentRoles]);
      
      return newRole;
    } catch (error) {
      console.error('Error creating role:', error);
      throw error;
    } finally {
      this._isLoading.set(false);
    }
  }

  async updateRole(id: string, data: Partial<Role>): Promise<Role> {
    this._isLoading.set(true);
    
    try {
      const updatedRole = await this.graphqlService.updateOne<Role>('role', { id }, data, {
        include: {
          permissions: {
            include: {
              permission: {
                select: {
                  id: true,
                  name: true,
                  codeId: true,
                }
              }
            }
          },
          users: {
            include: {
              user: {

                include: {
                  profile: {
                    select: {
                      name: true,
                      avatar: true,
                      bio: true
                    }
                  }
                }
              }
            }
          }
        }
      }) as Role;

      // Update local state
      const currentRoles = this._allRoles();
      const index = currentRoles.findIndex(r => r.id === id);
      if (index !== -1) {
        const updated = [...currentRoles];
        updated[index] = updatedRole;
        this._allRoles.set(updated);
      }
      
      return updatedRole;
    } catch (error) {
      console.error('Error updating role:', error);
      throw error;
    } finally {
      this._isLoading.set(false);
    }
  }

  async deleteRole(id: string): Promise<void> {
    this._isLoading.set(true);
    
    try {
      await this.graphqlService.deleteOne('role', { id }) as any;

      // Update local state
      const currentRoles = this._allRoles();
      const filtered = currentRoles.filter(r => r.id !== id);
      this._allRoles.set(filtered);
      
      // Remove from selected if exists
      const selected = new Set(this._selectedRoles());
      selected.delete(id);
      this._selectedRoles.set(selected);
      
    } catch (error) {
      console.error('Error deleting role:', error);
      throw error;
    } finally {
      this._isLoading.set(false);
    }
  }

  async getRoleById(id: string): Promise<Role | null> {
    try {
      const role = await this.graphqlService.findUnique<Role>('role', { id }, {
        include: {
          permissions: {
            include: {
              permission: {
                select: {
                  id: true,
                  name: true,
                  codeId: true,
                }
              }
            }
          },
          users: {
            include: {
              user: {

                include: {
                  profile: {
                    select: {
                      name: true,
                      avatar: true,
                      bio: true
                    }
                  }
                }
              }
            }
          }
        }
      }) as Role;

      return role;
    } catch (error) {
      console.error('Error getting role by id:', error);
      return null;
    }
  }

  // ========================= Permission Management =========================

  async assignPermissionsToRole(roleId: string, permissionIds: string[]): Promise<void> {
    this._isLoading.set(true);
    
    try {
      // Create new permissions using batchCreate
      const permissionData = permissionIds.map(permissionId => ({
        roleId,
        permissionId
      }));

      await this.graphqlService.batchCreate('rolePermission', permissionData) as any;

      // Update local role data
      const updatedRole = await this.getRoleById(roleId);
      if (updatedRole) {
        const currentRoles = this._allRoles();
        const index = currentRoles.findIndex(r => r.id === roleId);
        if (index !== -1) {
          const updated = [...currentRoles];
          updated[index] = updatedRole;
          this._allRoles.set(updated);
        }
      }
      
    } catch (error) {
      console.error('Error assigning permissions to role:', error);
      throw error;
    } finally {
      this._isLoading.set(false);
    }
  }

  async removePermissionFromRole(roleId: string, permissionId: string): Promise<void> {
    this._isLoading.set(true);
    
    try {
      // Find the rolePermission record to delete
      const role = await this.getRoleById(roleId);
      const rolePermission = role?.permissions?.find(rp => rp.permissionId === permissionId);
      
      if (rolePermission) {
        await this.graphqlService.deleteOne('rolePermission', { id: rolePermission.id }) as any;

        // Update local role data
        const updatedRole = await this.getRoleById(roleId);
        if (updatedRole) {
          const currentRoles = this._allRoles();
          const index = currentRoles.findIndex(r => r.id === roleId);
          if (index !== -1) {
            const updated = [...currentRoles];
            updated[index] = updatedRole;
            this._allRoles.set(updated);
          }
        }
      }
      
    } catch (error) {
      console.error('Error removing permission from role:', error);
      throw error;
    } finally {
      this._isLoading.set(false);
    }
  }

  // ========================= Search and Filtering =========================

  setSearchTerm(term: string): void {
    this._searchTerm.set(term);
    this._currentPage.set(1);
  }

  setStatusFilter(status: 'all'): void {
    this._statusFilter.set(status);
    this._currentPage.set(1);
  }

  setPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this._currentPage.set(page);
    }
  }

  setPageSize(size: number): void {
    this._pageSize.set(size);
    this._currentPage.set(1);
  }

  nextPage(): void {
    if (this._currentPage() < this.totalPages()) {
      this._currentPage.set(this._currentPage() + 1);
    }
  }

  previousPage(): void {
    if (this._currentPage() > 1) {
      this._currentPage.set(this._currentPage() - 1);
    }
  }

  // ========================= Selection Management =========================

  toggleRoleSelection(id: string): void {
    const selected = new Set(this._selectedRoles());
    if (selected.has(id)) {
      selected.delete(id);
    } else {
      selected.add(id);
    }
    this._selectedRoles.set(selected);
  }

  selectAllCurrentPage(): void {
    const selected = new Set(this._selectedRoles());
    this.paginatedRoles().forEach(role => {
      selected.add(role.id);
    });
    this._selectedRoles.set(selected);
  }

  deselectAllCurrentPage(): void {
    const selected = new Set(this._selectedRoles());
    this.paginatedRoles().forEach(role => {
      selected.delete(role.id);
    });
    this._selectedRoles.set(selected);
  }

  clearSelection(): void {
    this._selectedRoles.set(new Set());
  }

  isSelected(id: string): boolean {
    return this._selectedRoles().has(id);
  }

  get selectedCount(): number {
    return this._selectedRoles().size;
  }

  get selectedIds(): string[] {
    return Array.from(this._selectedRoles());
  }

  // ========================= Utility Methods =========================

  findRoleById(id: string): Role | undefined {
    return this._allRoles().find(r => r.id === id);
  }

  getRolesByPermission(permissionId: string): Role[] {
    return this._allRoles().filter(role => 
      role.permissions?.some(rolePermission => rolePermission.permissionId === permissionId)
    );
  }

  getRolePermissions(roleId: string): Permission[] {
    const role = this.findRoleById(roleId);
    if (!role || !role.permissions) return [];

    return role.permissions.map(rp => rp.permission);
  }

  hasPermission(roleId: string, permissionCode: string): boolean {
    const permissions = this.getRolePermissions(roleId);
    return permissions.some(p => p.codeId === permissionCode);
  }

  getRolesByGroup(group: string): Role[] {
    return this._allRoles().filter(role => 
      role.permissions?.some(rp => rp.permission.group === group)
    );
  }

  getUsersInRole(roleId: string): any[] {
    const role = this.findRoleById(roleId);
    if (!role || !role.users) return [];

    return role.users.map(ur => ur.user);
  }

  // ========================= Cache Management =========================

  clearCache(): void {
    this._allRoles.set([]);
    this._searchTerm.set('');
    this._currentPage.set(1);
    this.clearSelection();
  }

  refreshData(): Promise<Role[]> {
    return this.loadAllRoles(true);
  }
}
