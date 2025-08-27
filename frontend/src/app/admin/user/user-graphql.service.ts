import { Injectable, signal, computed, inject } from '@angular/core';
import { GraphqlService, OptimizedFindManyOptions } from '../../shared/services/graphql.service';
import { StorageService } from '../../shared/utils/storage.service';

export interface User {
  id: string;
  email: string;
  username: string;
  fullName?: string;
  phone?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  roles?: UserRole[];
}

export interface UserRole {
  id: string;
  userId: string;
  roleId: string;
  role: {
    id: string;
    name: string;
    permissions?: Permission[];
  };
}

interface Permission {
  id: string;
  name: string;
  code: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserGraphQLService {
  // Signals for state management
  private _allUsers = signal<User[]>([]);
  private _searchTerm = signal<string>('');
  private _currentPage = signal<number>(1);
  private _pageSize = signal<number>(50);
  private _isLoading = signal<boolean>(false);
  private _selectedUsers = signal<Set<string>>(new Set());
  private _statusFilter = signal<'all' | 'active' | 'inactive'>('all');

  // Public computed signals
  allUsers = this._allUsers.asReadonly();
  searchTerm = this._searchTerm.asReadonly();
  currentPage = this._currentPage.asReadonly();
  pageSize = this._pageSize.asReadonly();
  isLoading = this._isLoading.asReadonly();
  selectedUsers = this._selectedUsers.asReadonly();
  statusFilter = this._statusFilter.asReadonly();

  // Search and filter results
  filteredUsers = computed(() => {
    let filtered = this._allUsers();

    // Apply status filter
    const status = this._statusFilter();
    if (status !== 'all') {
      filtered = filtered.filter(user => 
        status === 'active' ? user.isActive : !user.isActive
      );
    }

    // Apply search term
    const term = this._searchTerm().toLowerCase();
    if (term) {
      filtered = filtered.filter(user =>
        user.email.toLowerCase().includes(term) ||
        user.username.toLowerCase().includes(term) ||
        user.fullName?.toLowerCase().includes(term) ||
        user.phone?.toLowerCase().includes(term)
      );
    }

    return filtered;
  });

  // Computed pagination
  totalItems = computed(() => this.filteredUsers().length);
  totalPages = computed(() => Math.ceil(this.totalItems() / this._pageSize()));
  
  // Client-side pagination
  paginatedUsers = computed(() => {
    const start = (this._currentPage() - 1) * this._pageSize();
    const end = start + this._pageSize();
    return this.filteredUsers().slice(start, end);
  });

  constructor(
    private storageService: StorageService
  ) {
    // Computed signals are automatically initialized
  }

  private graphqlService = inject(GraphqlService);

  // ========================= CRUD Operations =========================

  async loadAllUsers(forceRefresh = false): Promise<User[]> {
    if (!forceRefresh && this._allUsers().length > 0) {
      return this._allUsers();
    }

    this._isLoading.set(true);
    
    try {
      const options: OptimizedFindManyOptions = {
        orderBy: { createdAt: 'desc' },
        include: {
          roles: {
            include: {
              role: {
                include: {
                  permissions: {
                    include: { permission: true }
                  }
                }
              }
            }
          }
        }
      };

      const users = await this.graphqlService.findMany<User>('user', options) as User[];
      this._allUsers.set(users);
      
      // Reset to first page
      this._currentPage.set(1);
      
      return users;
    } catch (error) {
      console.error('Error loading users:', error);
      throw error;
    } finally {
      this._isLoading.set(false);
    }
  }

  async createUser(data: Partial<User> & { password: string, roleIds?: string[] }): Promise<User> {
    this._isLoading.set(true);
    
    try {
      const userData = {
        email: data.email,
        username: data.username,
        password: data.password,
        fullName: data.fullName,
        phone: data.phone,
        isActive: data.isActive ?? true
      };

      const newUser = await this.graphqlService.createOne<User>('user', {
        data: userData,
        include: {
          roles: {
            include: {
              role: {
                include: {
                  permissions: {
                    select: {
                      id: true,
                      name: true,
                      code: true
                    }
                  }
                }
              }
            }
          }
        }
      }) as User;

      // Assign roles if provided
      if (data.roleIds && data.roleIds.length > 0) {
        await this.assignRolesToUser(newUser.id, data.roleIds);
        // Reload user data with roles
        const userWithRoles = await this.getUserById(newUser.id);
        if (userWithRoles) {
          const currentUsers = this._allUsers();
          this._allUsers.set([userWithRoles, ...currentUsers.filter(u => u.id !== newUser.id)]);
          return userWithRoles;
        }
      }

      // Update local state
      const currentUsers = this._allUsers();
      this._allUsers.set([newUser, ...currentUsers]);
      
      return newUser;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    } finally {
      this._isLoading.set(false);
    }
  }

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    this._isLoading.set(true);
    
    try {
      const updatedUser = await this.graphqlService.updateOne<User>('user', { id }, data, {
        include: {
          roles: {
            include: {
              role: {
                include: {
                  permissions: {
                    select: {
                      id: true,
                      name: true,
                      code: true
                    }
                  }
                }
              }
            }
          }
        }
      }) as User;

      // Update local state
      const currentUsers = this._allUsers();
      const index = currentUsers.findIndex(u => u.id === id);
      if (index !== -1) {
        const updated = [...currentUsers];
        updated[index] = updatedUser;
        this._allUsers.set(updated);
      }
      
      return updatedUser;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    } finally {
      this._isLoading.set(false);
    }
  }

  async deleteUser(id: string): Promise<void> {
    this._isLoading.set(true);
    
    try {
      await this.graphqlService.deleteOne('user', { id }) as any;

      // Update local state
      const currentUsers = this._allUsers();
      const filtered = currentUsers.filter(u => u.id !== id);
      this._allUsers.set(filtered);
      
      // Remove from selected if exists
      const selected = new Set(this._selectedUsers());
      selected.delete(id);
      this._selectedUsers.set(selected);
      
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    } finally {
      this._isLoading.set(false);
    }
  }

  async getUserById(id: string): Promise<User | null> {
    try {
      const user = await this.graphqlService.findUnique<User>('user', { id }, {
        include: {
          roles: {
            include: {
              role: {
                include: {
                  permissions: {
                    select: {
                      id: true,
                      name: true,
                      code: true
                    }
                  }
                }
              }
            }
          }
        }
      }) as User;

      return user;
    } catch (error) {
      console.error('Error getting user by id:', error);
      return null;
    }
  }

  // ========================= Role Management =========================

  async assignRolesToUser(userId: string, roleIds: string[]): Promise<void> {
    this._isLoading.set(true);
    
    try {
      // Create new roles using batchCreate
      const roleData = roleIds.map(roleId => ({
        userId,
        roleId
      }));

      await this.graphqlService.batchCreate('userRole', roleData) as any;

      // Update local user data
      const updatedUser = await this.getUserById(userId);
      if (updatedUser) {
        const currentUsers = this._allUsers();
        const index = currentUsers.findIndex(u => u.id === userId);
        if (index !== -1) {
          const updated = [...currentUsers];
          updated[index] = updatedUser;
          this._allUsers.set(updated);
        }
      }
      
    } catch (error) {
      console.error('Error assigning roles to user:', error);
      throw error;
    } finally {
      this._isLoading.set(false);
    }
  }

  async removeRoleFromUser(userId: string, roleId: string): Promise<void> {
    this._isLoading.set(true);
    
    try {
      // Find the userRole record to delete
      const user = await this.getUserById(userId);
      const userRole = user?.roles?.find(ur => ur.roleId === roleId);
      
      if (userRole) {
        await this.graphqlService.deleteOne('userRole', { id: userRole.id }) as any;

        // Update local user data
        const updatedUser = await this.getUserById(userId);
        if (updatedUser) {
          const currentUsers = this._allUsers();
          const index = currentUsers.findIndex(u => u.id === userId);
          if (index !== -1) {
            const updated = [...currentUsers];
            updated[index] = updatedUser;
            this._allUsers.set(updated);
          }
        }
      }
      
    } catch (error) {
      console.error('Error removing role from user:', error);
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

  setStatusFilter(status: 'all' | 'active' | 'inactive'): void {
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

  toggleUserSelection(id: string): void {
    const selected = new Set(this._selectedUsers());
    if (selected.has(id)) {
      selected.delete(id);
    } else {
      selected.add(id);
    }
    this._selectedUsers.set(selected);
  }

  selectAllCurrentPage(): void {
    const selected = new Set(this._selectedUsers());
    this.paginatedUsers().forEach(user => {
      selected.add(user.id);
    });
    this._selectedUsers.set(selected);
  }

  deselectAllCurrentPage(): void {
    const selected = new Set(this._selectedUsers());
    this.paginatedUsers().forEach(user => {
      selected.delete(user.id);
    });
    this._selectedUsers.set(selected);
  }

  clearSelection(): void {
    this._selectedUsers.set(new Set());
  }

  isSelected(id: string): boolean {
    return this._selectedUsers().has(id);
  }

  get selectedCount(): number {
    return this._selectedUsers().size;
  }

  get selectedIds(): string[] {
    return Array.from(this._selectedUsers());
  }

  // ========================= Utility Methods =========================

  findUserById(id: string): User | undefined {
    return this._allUsers().find(u => u.id === id);
  }

  getUsersByRole(roleId: string): User[] {
    return this._allUsers().filter(user => 
      user.roles?.some(userRole => userRole.roleId === roleId)
    );
  }

  getActiveUsers(): User[] {
    return this._allUsers().filter(u => u.isActive);
  }

  getUserPermissions(userId: string): Permission[] {
    const user = this.findUserById(userId);
    if (!user || !user.roles) return [];

    const permissions: Permission[] = [];
    user.roles.forEach(userRole => {
      if (userRole.role.permissions) {
        permissions.push(...userRole.role.permissions);
      }
    });

    // Remove duplicates
    return permissions.filter((permission, index, self) => 
      index === self.findIndex(p => p.id === permission.id)
    );
  }

  hasPermission(userId: string, permissionCode: string): boolean {
    const permissions = this.getUserPermissions(userId);
    return permissions.some(p => p.code === permissionCode);
  }

  // ========================= Cache Management =========================

  clearCache(): void {
    this._allUsers.set([]);
    this._searchTerm.set('');
    this._statusFilter.set('all');
    this._currentPage.set(1);
    this.clearSelection();
  }

  refreshData(): Promise<User[]> {
    return this.loadAllUsers(true);
  }
}
