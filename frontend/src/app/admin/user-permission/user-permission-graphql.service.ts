import { Injectable, signal, computed, inject } from '@angular/core';
import {
  GraphqlService,
  OptimizedFindManyOptions,
} from '../../shared/services/graphql.service';
import { StorageService } from '../../shared/utils/storage.service';

export interface UserPermission {
  id: string;
  userId: string;
  permissionId: string;
  isGranted: boolean;
  grantedBy?: string;
  grantedAt?: Date;
  expiresAt?: Date;
  reason?: string;
  createdAt: Date;
  updatedAt: Date;
  user?: {
    id: string;
    name?: string;
    email?: string;
  };
  permission?: {
    id: string;
    name: string;
    codeId?: string;
    description?: string;
    group?: string;
  };
}

export interface UserPermissionCreateData {
  userId: string;
  permissionId: string;
  isGranted: boolean;
  grantedBy: string;
  reason?: string;
  expiresAt?: Date;
}

export interface UserPermissionUpdateData {
  isGranted?: boolean;
  grantedBy?: string;
  reason?: string;
  expiresAt?: Date;
}

@Injectable({
  providedIn: 'root',
})
export class UserPermissionGraphQLService {
  private graphqlService = inject(GraphqlService);
  private storageService = inject(StorageService);

  // Internal state
  private _allUserPermissions = signal<UserPermission[]>([]);
  private _selectedUserPermissions = signal<Set<string>>(new Set());
  private _searchTerm = signal<string>('');
  private _userFilter = signal<string>('all');
  private _permissionFilter = signal<string>('all');
  private _grantedFilter = signal<string>('all'); // 'all', 'granted', 'denied'
  private _expiredFilter = signal<string>('all'); // 'all', 'active', 'expired'
  private _currentPage = signal<number>(1);
  private _pageSize = signal<number>(50);
  private _isLoading = signal<boolean>(false);
  private _currentUserPermission = signal<UserPermission | null>(null);

  // Computed values
  readonly allUserPermissions = computed(() => this._allUserPermissions());
  readonly selectedUserPermissions = computed(() => this._selectedUserPermissions());
  readonly searchTerm = computed(() => this._searchTerm());
  readonly userFilter = computed(() => this._userFilter());
  readonly permissionFilter = computed(() => this._permissionFilter());
  readonly grantedFilter = computed(() => this._grantedFilter());
  readonly expiredFilter = computed(() => this._expiredFilter());
  readonly currentPage = computed(() => this._currentPage());
  readonly pageSize = computed(() => this._pageSize());
  readonly isLoading = computed(() => this._isLoading());
  readonly currentUserPermission = computed(() => this._currentUserPermission());

  // Filtered and paginated data
  readonly filteredUserPermissions = computed(() => {
    let filtered = this._allUserPermissions();
    const searchTerm = this._searchTerm().toLowerCase();
    const userFilter = this._userFilter();
    const permissionFilter = this._permissionFilter();
    const grantedFilter = this._grantedFilter();
    const expiredFilter = this._expiredFilter();

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(up => 
        up.user?.name?.toLowerCase().includes(searchTerm) ||
        up.user?.email?.toLowerCase().includes(searchTerm) ||
        up.permission?.name?.toLowerCase().includes(searchTerm) ||
        up.permission?.description?.toLowerCase().includes(searchTerm) ||
        up.reason?.toLowerCase().includes(searchTerm)
      );
    }

    // User filter
    if (userFilter !== 'all') {
      filtered = filtered.filter(up => up.userId === userFilter);
    }

    // Permission filter
    if (permissionFilter !== 'all') {
      filtered = filtered.filter(up => up.permissionId === permissionFilter);
    }

    // Granted filter
    if (grantedFilter === 'granted') {
      filtered = filtered.filter(up => up.isGranted);
    } else if (grantedFilter === 'denied') {
      filtered = filtered.filter(up => !up.isGranted);
    }

    // Expired filter
    if (expiredFilter === 'active') {
      filtered = filtered.filter(up => !up.expiresAt || up.expiresAt > new Date());
    } else if (expiredFilter === 'expired') {
      filtered = filtered.filter(up => up.expiresAt && up.expiresAt <= new Date());
    }

    return filtered.sort((a, b) => {
      // Sort by granted status first, then by creation date
      if (a.isGranted !== b.isGranted) {
        return a.isGranted ? -1 : 1;
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  });

  readonly paginatedUserPermissions = computed(() => {
    const filtered = this.filteredUserPermissions();
    const page = this._currentPage();
    const pageSize = this._pageSize();
    const startIndex = (page - 1) * pageSize;
    return filtered.slice(startIndex, startIndex + pageSize);
  });

  readonly totalPages = computed(() => {
    const total = this.filteredUserPermissions().length;
    const pageSize = this._pageSize();
    return Math.ceil(total / pageSize);
  });

  readonly totalCount = computed(() => this.filteredUserPermissions().length);

  // ========================= CRUD Operations =========================

  async loadUserPermissions(options?: OptimizedFindManyOptions): Promise<UserPermission[]> {
    this._isLoading.set(true);
    
    try {
      const userPermissions = await this.graphqlService.findMany<UserPermission>(
        'userPermission',
        {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
            permission: {
              select: {
                id: true,
                name: true,
                codeId: true,
                description: true,
                group: true,
              },
            },
          },
          orderBy: [
            { isGranted: 'desc' },
            { createdAt: 'desc' },
          ],
          ...options,
        }
      ) as UserPermission[];

      this._allUserPermissions.set(userPermissions);
      return userPermissions;
    } catch (error) {
      console.error('Error loading user permissions:', error);
      throw error;
    } finally {
      this._isLoading.set(false);
    }
  }

  async getUserPermissionById(id: string): Promise<UserPermission | null> {
    try {
      const userPermission = await this.graphqlService.findUnique<UserPermission>(
        'userPermission',
        { id },
        {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
            permission: {
              select: {
                id: true,
                name: true,
                codeId: true,
                description: true,
                group: true,
              },
            },
          },
        }
      ) as UserPermission;

      this._currentUserPermission.set(userPermission);
      return userPermission;
    } catch (error) {
      console.error('Error getting user permission by id:', error);
      return null;
    }
  }

  async getUserPermissions(userId: string): Promise<UserPermission[]> {
    try {
      const userPermissions = await this.graphqlService.findMany<UserPermission>(
        'userPermission',
        {
          where: { userId },
          include: {
            permission: {
              select: {
                id: true,
                name: true,
                codeId: true,
                description: true,
                group: true,
              },
            },
          },
          orderBy: [
            { isGranted: 'desc' },
            { permission: { name: 'asc' } },
          ],
        }
      ) as UserPermission[];

      return userPermissions;
    } catch (error) {
      console.error('Error getting user permissions:', error);
      return [];
    }
  }

  async assignPermissionToUser(data: UserPermissionCreateData): Promise<UserPermission> {
    this._isLoading.set(true);
    console.log('Assigning permission to user with data:', data);
    try {
      const newUserPermission = await this.graphqlService.createOne<UserPermission>(
        'userPermission',{
            userId: data.userId,
            permissionId: data.permissionId,
            isGranted: data.isGranted,
            grantedBy: data.grantedBy,
            reason: data.reason,
            expiresAt: data.expiresAt,
        },
        {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
            permission: {
              select: {
                id: true,
                name: true,
                codeId: true,
                description: true,
                group: true,
              },
            },
          },
        }
      ) as UserPermission;

      // Update local state
      const currentUserPermissions = this._allUserPermissions();
      this._allUserPermissions.set([newUserPermission, ...currentUserPermissions]);
      
      return newUserPermission;
    } catch (error) {
      console.error('Error assigning permission to user:', error);
      throw error;
    } finally {
      this._isLoading.set(false);
    }
  }

  async updateUserPermission(id: string, data: UserPermissionUpdateData): Promise<UserPermission> {
    this._isLoading.set(true);
    
    try {
      const updatedUserPermission = await this.graphqlService.updateOne<UserPermission>(
        'userPermission',
        { id },
        data,
        {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
            permission: {
              select: {
                id: true,
                name: true,
                codeId: true,
                description: true,
                group: true,
              },
            },
          },
        }
      ) as UserPermission;

      // Update local state
      const currentUserPermissions = this._allUserPermissions();
      const index = currentUserPermissions.findIndex(up => up.id === id);
      if (index !== -1) {
        const updated = [...currentUserPermissions];
        updated[index] = updatedUserPermission;
        this._allUserPermissions.set(updated);
      }

      if (this._currentUserPermission()?.id === id) {
        this._currentUserPermission.set(updatedUserPermission);
      }
      
      return updatedUserPermission;
    } catch (error) {
      console.error('Error updating user permission:', error);
      throw error;
    } finally {
      this._isLoading.set(false);
    }
  }

  async deleteUserPermission(id: string): Promise<boolean> {
    this._isLoading.set(true);
    
    try {
      await this.graphqlService.deleteOne('userPermission', { id });

      // Update local state
      const currentUserPermissions = this._allUserPermissions();
      this._allUserPermissions.set(currentUserPermissions.filter(up => up.id !== id));

      if (this._currentUserPermission()?.id === id) {
        this._currentUserPermission.set(null);
      }

      // Remove from selection if selected
      const selected = this._selectedUserPermissions();
      if (selected.has(id)) {
        selected.delete(id);
        this._selectedUserPermissions.set(new Set(selected));
      }
      
      return true;
    } catch (error) {
      console.error('Error deleting user permission:', error);
      return false;
    } finally {
      this._isLoading.set(false);
    }
  }

  async deleteUserPermissions(ids: string[]): Promise<boolean> {
    this._isLoading.set(true);
    
    try {
      // Delete each user permission individually
      const deletePromises = ids.map(id => 
        this.graphqlService.deleteOne('userPermission', { id })
      );
      await Promise.all(deletePromises);

      // Update local state
      const currentUserPermissions = this._allUserPermissions();
      this._allUserPermissions.set(
        currentUserPermissions.filter(up => !ids.includes(up.id))
      );

      // Clear selection
      this._selectedUserPermissions.set(new Set());
      
      return true;
    } catch (error) {
      console.error('Error deleting user permissions:', error);
      return false;
    } finally {
      this._isLoading.set(false);
    }
  }

  // ========================= Filter & Search Methods =========================

  setSearchTerm(term: string): void {
    this._searchTerm.set(term);
    this._currentPage.set(1); // Reset to first page
  }

  setUserFilter(userId: string): void {
    this._userFilter.set(userId);
    this._currentPage.set(1);
  }

  setPermissionFilter(permissionId: string): void {
    this._permissionFilter.set(permissionId);
    this._currentPage.set(1);
  }

  setGrantedFilter(filter: 'all' | 'granted' | 'denied'): void {
    this._grantedFilter.set(filter);
    this._currentPage.set(1);
  }

  setExpiredFilter(filter: 'all' | 'active' | 'expired'): void {
    this._expiredFilter.set(filter);
    this._currentPage.set(1);
  }

  setCurrentPage(page: number): void {
    this._currentPage.set(page);
  }

  setPageSize(size: number): void {
    this._pageSize.set(size);
    this._currentPage.set(1);
  }

  clearFilters(): void {
    this._searchTerm.set('');
    this._userFilter.set('all');
    this._permissionFilter.set('all');
    this._grantedFilter.set('all');
    this._expiredFilter.set('all');
    this._currentPage.set(1);
  }

  // ========================= Selection Management =========================

  toggleUserPermissionSelection(id: string): void {
    const selected = new Set(this._selectedUserPermissions());
    if (selected.has(id)) {
      selected.delete(id);
    } else {
      selected.add(id);
    }
    this._selectedUserPermissions.set(selected);
  }

  selectAllCurrentPage(): void {
    const selected = new Set(this._selectedUserPermissions());
    this.paginatedUserPermissions().forEach(userPermission => {
      selected.add(userPermission.id);
    });
    this._selectedUserPermissions.set(selected);
  }

  deselectAllCurrentPage(): void {
    const selected = new Set(this._selectedUserPermissions());
    this.paginatedUserPermissions().forEach(userPermission => {
      selected.delete(userPermission.id);
    });
    this._selectedUserPermissions.set(selected);
  }

  clearSelection(): void {
    this._selectedUserPermissions.set(new Set());
  }

  isSelected(id: string): boolean {
    return this._selectedUserPermissions().has(id);
  }

  get selectedCount(): number {
    return this._selectedUserPermissions().size;
  }

  get selectedIds(): string[] {
    return Array.from(this._selectedUserPermissions());
  }

  // ========================= Utility Methods =========================

  findUserPermissionById(id: string): UserPermission | undefined {
    return this._allUserPermissions().find(up => up.id === id);
  }

  getUserPermissionsByUser(userId: string): UserPermission[] {
    return this._allUserPermissions().filter(up => up.userId === userId);
  }

  getUserPermissionsByPermission(permissionId: string): UserPermission[] {
    return this._allUserPermissions().filter(up => up.permissionId === permissionId);
  }

  getActiveUserPermissions(): UserPermission[] {
    return this._allUserPermissions().filter(up => 
      !up.expiresAt || up.expiresAt > new Date()
    );
  }

  getExpiredUserPermissions(): UserPermission[] {
    return this._allUserPermissions().filter(up => 
      up.expiresAt && up.expiresAt <= new Date()
    );
  }

  getGrantedUserPermissions(): UserPermission[] {
    return this._allUserPermissions().filter(up => up.isGranted);
  }

  getDeniedUserPermissions(): UserPermission[] {
    return this._allUserPermissions().filter(up => !up.isGranted);
  }

  // ========================= Cache Management =========================

  clearCache(): void {
    this._allUserPermissions.set([]);
    this._searchTerm.set('');
    this._userFilter.set('all');
    this._permissionFilter.set('all');
    this._grantedFilter.set('all');
    this._expiredFilter.set('all');
    this._currentPage.set(1);
    this.clearSelection();
    this._currentUserPermission.set(null);
  }

  refreshData(): Promise<UserPermission[]> {
    return this.loadUserPermissions();
  }
}