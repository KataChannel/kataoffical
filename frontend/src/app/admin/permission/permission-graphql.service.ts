import { Injectable, signal, computed, inject, effect } from '@angular/core';
import {
  GraphqlService,
  OptimizedFindManyOptions,
  PaginationResult,
} from '../../shared/services/graphql.service';
import { StorageService } from '../../shared/utils/storage.service';

export interface Permission {
  id: string;
  name: string;
  code: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  roles?: Role[];
}

export interface Role {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  permissions?: Permission[];
}

@Injectable({
  providedIn: 'root',
})
export class PermissionGraphQLService {
  // Signals for state management
  private _allPermissions = signal<Permission[]>([]);
  private _filteredPermissions = signal<Permission[]>([]);
  private _searchTerm = signal<string>('');
  private _currentPage = signal<number>(1);
  private _pageSize = signal<number>(50);
  private _isLoading = signal<boolean>(false);
  private _selectedPermissions = signal<Set<string>>(new Set());

  // Public computed signals
  allPermissions = this._allPermissions.asReadonly();
  filteredPermissions = this._filteredPermissions.asReadonly();
  searchTerm = this._searchTerm.asReadonly();
  currentPage = this._currentPage.asReadonly();
  pageSize = this._pageSize.asReadonly();
  isLoading = this._isLoading.asReadonly();
  selectedPermissions = this._selectedPermissions.asReadonly();

  // Computed pagination
  totalItems = computed(() => this._filteredPermissions().length);
  totalPages = computed(() => Math.ceil(this.totalItems() / this._pageSize()));

  // Client-side pagination
  paginatedPermissions = computed(() => {
    const start = (this._currentPage() - 1) * this._pageSize();
    const end = start + this._pageSize();
    return this._filteredPermissions().slice(start, end);
  });

  // Search and filter
  searchResults = computed(() => {
    const term = this._searchTerm().toLowerCase();
    if (!term) {
      return this._allPermissions();
    }

    const filtered = this._allPermissions().filter(
      (permission) =>
        permission.name.toLowerCase().includes(term) ||
        permission.code.toLowerCase().includes(term) ||
        permission.description?.toLowerCase().includes(term)
    );
    return filtered;
  });

  constructor(private storageService: StorageService) {
    // Effect to update _filteredPermissions when searchResults changes
    effect(() => {
      const results = this.searchResults();
      this._filteredPermissions.set(results);
    });
  }

  private graphqlService = inject(GraphqlService);

  // ========================= CRUD Operations =========================

  async loadAllPermissions(forceRefresh = false): Promise<Permission[]> {
    if (!forceRefresh && this._allPermissions().length > 0) {
      return this._allPermissions();
    }

    this._isLoading.set(true);

    try {
      const options: OptimizedFindManyOptions = {
        orderBy: { createdAt: 'desc' },
        include: {
          roles: {
            select: {
              role: {
                select: {
                  id: true,
                  name: true,
                  createdAt: true,
                  updatedAt: true,
                },
              },
            },
          },
        },
      };

      const permissions = (await this.graphqlService.findMany<Permission>(
        'permission',
        options
      )) as Permission[];
      this._allPermissions.set(permissions);

      // Reset to first page
      this._currentPage.set(1);

      return permissions;
    } catch (error) {
      console.error('Error loading permissions:', error);
      throw error;
    } finally {
      this._isLoading.set(false);
    }
  }

  async createPermission(data: Partial<Permission>): Promise<Permission> {
    this._isLoading.set(true);

    try {
      const newPermission = (await this.graphqlService.createOne<Permission>(
        'permission',
        {
          data: {
            name: data.name,
            code: data.code,
            description: data.description,
            isActive: data.isActive ?? true,
          },
          include: {
            roles: {
              select: {
                role: {
                  select: {
                    id: true,
                    name: true,
                    createdAt: true,
                    updatedAt: true,
                  },
                },
              },
            },
          },
        }
      )) as Permission;

      // Update local state
      const currentPermissions = this._allPermissions();
      this._allPermissions.set([newPermission, ...currentPermissions]);

      return newPermission;
    } catch (error) {
      console.error('Error creating permission:', error);
      throw error;
    } finally {
      this._isLoading.set(false);
    }
  }

  async updatePermission(
    id: string,
    data: Partial<Permission>
  ): Promise<Permission> {
    this._isLoading.set(true);

    try {
      const updatedPermission =
        (await this.graphqlService.updateOne<Permission>(
          'permission',
          { id },
          data,
          {
            include: {
              role: {
                select: {
                  id: true,
                  name: true,
                  createdAt: true,
                  updatedAt: true,
                },
              },
            },
          }
        )) as Permission;

      // Update local state
      const currentPermissions = this._allPermissions();
      const index = currentPermissions.findIndex((p) => p.id === id);
      if (index !== -1) {
        const updated = [...currentPermissions];
        updated[index] = updatedPermission;
        this._allPermissions.set(updated);
      }

      return updatedPermission;
    } catch (error) {
      console.error('Error updating permission:', error);
      throw error;
    } finally {
      this._isLoading.set(false);
    }
  }

  async deletePermission(id: string): Promise<void> {
    this._isLoading.set(true);

    try {
      (await this.graphqlService.deleteOne('permission', { id })) as any;

      // Update local state
      const currentPermissions = this._allPermissions();
      const filtered = currentPermissions.filter((p) => p.id !== id);
      this._allPermissions.set(filtered);

      // Remove from selected if exists
      const selected = new Set(this._selectedPermissions());
      selected.delete(id);
      this._selectedPermissions.set(selected);
    } catch (error) {
      console.error('Error deleting permission:', error);
      throw error;
    } finally {
      this._isLoading.set(false);
    }
  }

  async batchDeletePermissions(ids: string[]): Promise<void> {
    this._isLoading.set(true);

    try {
      (await this.graphqlService.batchDelete('permission', ids)) as any;

      // Update local state
      const currentPermissions = this._allPermissions();
      const filtered = currentPermissions.filter((p) => !ids.includes(p.id));
      this._allPermissions.set(filtered);

      // Clear selected
      this._selectedPermissions.set(new Set());
    } catch (error) {
      console.error('Error batch deleting permissions:', error);
      throw error;
    } finally {
      this._isLoading.set(false);
    }
  }

  // ========================= Search and Pagination =========================

  setSearchTerm(term: string): void {
    this._searchTerm.set(term);
    this._currentPage.set(1); // Reset to first page when searching
  }

  setPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this._currentPage.set(page);
    }
  }

  setPageSize(size: number): void {
    this._pageSize.set(size);
    this._currentPage.set(1); // Reset to first page when changing page size
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

  togglePermissionSelection(id: string): void {
    const selected = new Set(this._selectedPermissions());
    if (selected.has(id)) {
      selected.delete(id);
    } else {
      selected.add(id);
    }
    this._selectedPermissions.set(selected);
  }

  selectAllCurrentPage(): void {
    const selected = new Set(this._selectedPermissions());
    this.paginatedPermissions().forEach((permission) => {
      selected.add(permission.id);
    });
    this._selectedPermissions.set(selected);
  }

  deselectAllCurrentPage(): void {
    const selected = new Set(this._selectedPermissions());
    this.paginatedPermissions().forEach((permission) => {
      selected.delete(permission.id);
    });
    this._selectedPermissions.set(selected);
  }

  clearSelection(): void {
    this._selectedPermissions.set(new Set());
  }

  isSelected(id: string): boolean {
    return this._selectedPermissions().has(id);
  }

  get selectedCount(): number {
    return this._selectedPermissions().size;
  }

  get selectedIds(): string[] {
    return Array.from(this._selectedPermissions());
  }

  // ========================= Utility Methods =========================

  findPermissionById(id: string): Permission | undefined {
    return this._allPermissions().find((p) => p.id === id);
  }

  getPermissionsByCode(codes: string[]): Permission[] {
    return this._allPermissions().filter((p) => codes.includes(p.code));
  }

  getActivePermissions(): Permission[] {
    return this._allPermissions().filter((p) => p.isActive);
  }

  // ========================= Cache Management =========================

  clearCache(): void {
    this._allPermissions.set([]);
    this._searchTerm.set('');
    this._currentPage.set(1);
    this.clearSelection();
  }

  refreshData(): Promise<Permission[]> {
    return this.loadAllPermissions(true);
  }
}
