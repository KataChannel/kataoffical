import {
  StorageService
} from "./chunk-S5TWTPVL.js";
import {
  GraphqlService
} from "./chunk-RPDITV5T.js";
import {
  computed,
  effect,
  inject,
  signal,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-FWM3YOMT.js";
import {
  __async,
  __spreadValues
} from "./chunk-SXK72SKC.js";

// src/app/admin/user-permission/user-permission-graphql.service.ts
var UserPermissionGraphQLService = class _UserPermissionGraphQLService {
  graphqlService = inject(GraphqlService);
  storageService = inject(StorageService);
  // Internal state
  _allUserPermissions = signal([]);
  _selectedUserPermissions = signal(/* @__PURE__ */ new Set());
  _searchTerm = signal("");
  _userFilter = signal("all");
  _permissionFilter = signal("all");
  _grantedFilter = signal("all");
  // 'all', 'granted', 'denied'
  _expiredFilter = signal("all");
  // 'all', 'active', 'expired'
  _currentPage = signal(1);
  _pageSize = signal(50);
  _isLoading = signal(false);
  _currentUserPermission = signal(null);
  // Computed values
  allUserPermissions = computed(() => this._allUserPermissions());
  selectedUserPermissions = computed(() => this._selectedUserPermissions());
  searchTerm = computed(() => this._searchTerm());
  userFilter = computed(() => this._userFilter());
  permissionFilter = computed(() => this._permissionFilter());
  grantedFilter = computed(() => this._grantedFilter());
  expiredFilter = computed(() => this._expiredFilter());
  currentPage = computed(() => this._currentPage());
  pageSize = computed(() => this._pageSize());
  isLoading = computed(() => this._isLoading());
  currentUserPermission = computed(() => this._currentUserPermission());
  // Filtered and paginated data
  filteredUserPermissions = computed(() => {
    let filtered = this._allUserPermissions();
    const searchTerm = this._searchTerm().toLowerCase();
    const userFilter = this._userFilter();
    const permissionFilter = this._permissionFilter();
    const grantedFilter = this._grantedFilter();
    const expiredFilter = this._expiredFilter();
    if (searchTerm) {
      filtered = filtered.filter((up) => up.user?.name?.toLowerCase().includes(searchTerm) || up.user?.email?.toLowerCase().includes(searchTerm) || up.permission?.name?.toLowerCase().includes(searchTerm) || up.permission?.description?.toLowerCase().includes(searchTerm) || up.reason?.toLowerCase().includes(searchTerm));
    }
    if (userFilter !== "all") {
      filtered = filtered.filter((up) => up.userId === userFilter);
    }
    if (permissionFilter !== "all") {
      filtered = filtered.filter((up) => up.permissionId === permissionFilter);
    }
    if (grantedFilter === "granted") {
      filtered = filtered.filter((up) => up.isGranted);
    } else if (grantedFilter === "denied") {
      filtered = filtered.filter((up) => !up.isGranted);
    }
    if (expiredFilter === "active") {
      filtered = filtered.filter((up) => !up.expiresAt || up.expiresAt > /* @__PURE__ */ new Date());
    } else if (expiredFilter === "expired") {
      filtered = filtered.filter((up) => up.expiresAt && up.expiresAt <= /* @__PURE__ */ new Date());
    }
    return filtered.sort((a, b) => {
      if (a.isGranted !== b.isGranted) {
        return a.isGranted ? -1 : 1;
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  });
  paginatedUserPermissions = computed(() => {
    const filtered = this.filteredUserPermissions();
    const page = this._currentPage();
    const pageSize = this._pageSize();
    const startIndex = (page - 1) * pageSize;
    return filtered.slice(startIndex, startIndex + pageSize);
  });
  totalPages = computed(() => {
    const total = this.filteredUserPermissions().length;
    const pageSize = this._pageSize();
    return Math.ceil(total / pageSize);
  });
  totalCount = computed(() => this.filteredUserPermissions().length);
  // ========================= CRUD Operations =========================
  loadUserPermissions(options) {
    return __async(this, null, function* () {
      this._isLoading.set(true);
      try {
        const userPermissions = yield this.graphqlService.findMany("userPermission", __spreadValues({
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true
              }
            },
            permission: {
              select: {
                id: true,
                name: true,
                codeId: true,
                description: true,
                group: true
              }
            }
          },
          orderBy: [
            { isGranted: "desc" },
            { createdAt: "desc" }
          ]
        }, options));
        this._allUserPermissions.set(userPermissions);
        return userPermissions;
      } catch (error) {
        console.error("Error loading user permissions:", error);
        throw error;
      } finally {
        this._isLoading.set(false);
      }
    });
  }
  getUserPermissionById(id) {
    return __async(this, null, function* () {
      try {
        const userPermission = yield this.graphqlService.findUnique("userPermission", { id }, {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true
              }
            },
            permission: {
              select: {
                id: true,
                name: true,
                codeId: true,
                description: true,
                group: true
              }
            }
          }
        });
        this._currentUserPermission.set(userPermission);
        return userPermission;
      } catch (error) {
        console.error("Error getting user permission by id:", error);
        return null;
      }
    });
  }
  getUserPermissions(userId) {
    return __async(this, null, function* () {
      try {
        const userPermissions = yield this.graphqlService.findMany("userPermission", {
          where: { userId },
          include: {
            permission: {
              select: {
                id: true,
                name: true,
                codeId: true,
                description: true,
                group: true
              }
            }
          },
          orderBy: [
            { isGranted: "desc" },
            { permission: { name: "asc" } }
          ]
        });
        return userPermissions;
      } catch (error) {
        console.error("Error getting user permissions:", error);
        return [];
      }
    });
  }
  assignPermissionToUser(data) {
    return __async(this, null, function* () {
      this._isLoading.set(true);
      console.log("Assigning permission to user with data:", data);
      try {
        const newUserPermission = yield this.graphqlService.createOne("userPermission", {
          userId: data.userId,
          permissionId: data.permissionId,
          isGranted: data.isGranted,
          grantedBy: data.grantedBy,
          reason: data.reason,
          expiresAt: data.expiresAt
        }, {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true
              }
            },
            permission: {
              select: {
                id: true,
                name: true,
                codeId: true,
                description: true,
                group: true
              }
            }
          }
        });
        const currentUserPermissions = this._allUserPermissions();
        this._allUserPermissions.set([newUserPermission, ...currentUserPermissions]);
        return newUserPermission;
      } catch (error) {
        console.error("Error assigning permission to user:", error);
        throw error;
      } finally {
        this._isLoading.set(false);
      }
    });
  }
  updateUserPermission(id, data) {
    return __async(this, null, function* () {
      this._isLoading.set(true);
      try {
        const updatedUserPermission = yield this.graphqlService.updateOne("userPermission", { id }, data, {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true
              }
            },
            permission: {
              select: {
                id: true,
                name: true,
                codeId: true,
                description: true,
                group: true
              }
            }
          }
        });
        const currentUserPermissions = this._allUserPermissions();
        const index = currentUserPermissions.findIndex((up) => up.id === id);
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
        console.error("Error updating user permission:", error);
        throw error;
      } finally {
        this._isLoading.set(false);
      }
    });
  }
  deleteUserPermission(id) {
    return __async(this, null, function* () {
      this._isLoading.set(true);
      try {
        yield this.graphqlService.deleteOne("userPermission", { id });
        const currentUserPermissions = this._allUserPermissions();
        this._allUserPermissions.set(currentUserPermissions.filter((up) => up.id !== id));
        if (this._currentUserPermission()?.id === id) {
          this._currentUserPermission.set(null);
        }
        const selected = this._selectedUserPermissions();
        if (selected.has(id)) {
          selected.delete(id);
          this._selectedUserPermissions.set(new Set(selected));
        }
        return true;
      } catch (error) {
        console.error("Error deleting user permission:", error);
        return false;
      } finally {
        this._isLoading.set(false);
      }
    });
  }
  deleteUserPermissions(ids) {
    return __async(this, null, function* () {
      this._isLoading.set(true);
      try {
        const deletePromises = ids.map((id) => this.graphqlService.deleteOne("userPermission", { id }));
        yield Promise.all(deletePromises);
        const currentUserPermissions = this._allUserPermissions();
        this._allUserPermissions.set(currentUserPermissions.filter((up) => !ids.includes(up.id)));
        this._selectedUserPermissions.set(/* @__PURE__ */ new Set());
        return true;
      } catch (error) {
        console.error("Error deleting user permissions:", error);
        return false;
      } finally {
        this._isLoading.set(false);
      }
    });
  }
  // ========================= Filter & Search Methods =========================
  setSearchTerm(term) {
    this._searchTerm.set(term);
    this._currentPage.set(1);
  }
  setUserFilter(userId) {
    this._userFilter.set(userId);
    this._currentPage.set(1);
  }
  setPermissionFilter(permissionId) {
    this._permissionFilter.set(permissionId);
    this._currentPage.set(1);
  }
  setGrantedFilter(filter) {
    this._grantedFilter.set(filter);
    this._currentPage.set(1);
  }
  setExpiredFilter(filter) {
    this._expiredFilter.set(filter);
    this._currentPage.set(1);
  }
  setCurrentPage(page) {
    this._currentPage.set(page);
  }
  setPageSize(size) {
    this._pageSize.set(size);
    this._currentPage.set(1);
  }
  clearFilters() {
    this._searchTerm.set("");
    this._userFilter.set("all");
    this._permissionFilter.set("all");
    this._grantedFilter.set("all");
    this._expiredFilter.set("all");
    this._currentPage.set(1);
  }
  // ========================= Selection Management =========================
  toggleUserPermissionSelection(id) {
    const selected = new Set(this._selectedUserPermissions());
    if (selected.has(id)) {
      selected.delete(id);
    } else {
      selected.add(id);
    }
    this._selectedUserPermissions.set(selected);
  }
  selectAllCurrentPage() {
    const selected = new Set(this._selectedUserPermissions());
    this.paginatedUserPermissions().forEach((userPermission) => {
      selected.add(userPermission.id);
    });
    this._selectedUserPermissions.set(selected);
  }
  deselectAllCurrentPage() {
    const selected = new Set(this._selectedUserPermissions());
    this.paginatedUserPermissions().forEach((userPermission) => {
      selected.delete(userPermission.id);
    });
    this._selectedUserPermissions.set(selected);
  }
  clearSelection() {
    this._selectedUserPermissions.set(/* @__PURE__ */ new Set());
  }
  isSelected(id) {
    return this._selectedUserPermissions().has(id);
  }
  get selectedCount() {
    return this._selectedUserPermissions().size;
  }
  get selectedIds() {
    return Array.from(this._selectedUserPermissions());
  }
  // ========================= Utility Methods =========================
  findUserPermissionById(id) {
    return this._allUserPermissions().find((up) => up.id === id);
  }
  getUserPermissionsByUser(userId) {
    return this._allUserPermissions().filter((up) => up.userId === userId);
  }
  getUserPermissionsByPermission(permissionId) {
    return this._allUserPermissions().filter((up) => up.permissionId === permissionId);
  }
  getActiveUserPermissions() {
    return this._allUserPermissions().filter((up) => !up.expiresAt || up.expiresAt > /* @__PURE__ */ new Date());
  }
  getExpiredUserPermissions() {
    return this._allUserPermissions().filter((up) => up.expiresAt && up.expiresAt <= /* @__PURE__ */ new Date());
  }
  getGrantedUserPermissions() {
    return this._allUserPermissions().filter((up) => up.isGranted);
  }
  getDeniedUserPermissions() {
    return this._allUserPermissions().filter((up) => !up.isGranted);
  }
  // ========================= Cache Management =========================
  clearCache() {
    this._allUserPermissions.set([]);
    this._searchTerm.set("");
    this._userFilter.set("all");
    this._permissionFilter.set("all");
    this._grantedFilter.set("all");
    this._expiredFilter.set("all");
    this._currentPage.set(1);
    this.clearSelection();
    this._currentUserPermission.set(null);
  }
  refreshData() {
    return this.loadUserPermissions();
  }
  static \u0275fac = function UserPermissionGraphQLService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UserPermissionGraphQLService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _UserPermissionGraphQLService, factory: _UserPermissionGraphQLService.\u0275fac, providedIn: "root" });
};

// src/app/admin/permission/permission-graphql.service.ts
var PermissionGraphQLService = class _PermissionGraphQLService {
  storageService;
  // Signals for state management
  _allPermissions = signal([]);
  _filteredPermissions = signal([]);
  _searchTerm = signal("");
  _currentPage = signal(1);
  _pageSize = signal(50);
  _isLoading = signal(false);
  _selectedPermissions = signal(/* @__PURE__ */ new Set());
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
    const filtered = this._allPermissions().filter((permission) => permission.name.toLowerCase().includes(term) || permission.code.toLowerCase().includes(term) || permission.description?.toLowerCase().includes(term));
    return filtered;
  });
  constructor(storageService) {
    this.storageService = storageService;
    effect(() => {
      const results = this.searchResults();
      this._filteredPermissions.set(results);
    });
  }
  graphqlService = inject(GraphqlService);
  // ========================= CRUD Operations =========================
  loadAllPermissions(forceRefresh = false) {
    return __async(this, null, function* () {
      if (!forceRefresh && this._allPermissions().length > 0) {
        return this._allPermissions();
      }
      this._isLoading.set(true);
      try {
        const options = {
          orderBy: { createdAt: "desc" },
          include: {
            roles: {
              select: {
                role: {
                  select: {
                    id: true,
                    name: true,
                    createdAt: true,
                    updatedAt: true
                  }
                }
              }
            }
          }
        };
        const permissions = yield this.graphqlService.findMany("permission", options);
        this._allPermissions.set(permissions);
        this._currentPage.set(1);
        return permissions;
      } catch (error) {
        console.error("Error loading permissions:", error);
        throw error;
      } finally {
        this._isLoading.set(false);
      }
    });
  }
  createPermission(data) {
    return __async(this, null, function* () {
      this._isLoading.set(true);
      try {
        const newPermission = yield this.graphqlService.createOne("permission", {
          data: {
            name: data.name,
            code: data.code,
            description: data.description,
            isActive: data.isActive ?? true
          },
          include: {
            roles: {
              select: {
                role: {
                  select: {
                    id: true,
                    name: true,
                    createdAt: true,
                    updatedAt: true
                  }
                }
              }
            }
          }
        });
        const currentPermissions = this._allPermissions();
        this._allPermissions.set([newPermission, ...currentPermissions]);
        return newPermission;
      } catch (error) {
        console.error("Error creating permission:", error);
        throw error;
      } finally {
        this._isLoading.set(false);
      }
    });
  }
  updatePermission(id, data) {
    return __async(this, null, function* () {
      this._isLoading.set(true);
      try {
        const updatedPermission = yield this.graphqlService.updateOne("permission", { id }, data, {
          include: {
            role: {
              select: {
                id: true,
                name: true,
                createdAt: true,
                updatedAt: true
              }
            }
          }
        });
        const currentPermissions = this._allPermissions();
        const index = currentPermissions.findIndex((p) => p.id === id);
        if (index !== -1) {
          const updated = [...currentPermissions];
          updated[index] = updatedPermission;
          this._allPermissions.set(updated);
        }
        return updatedPermission;
      } catch (error) {
        console.error("Error updating permission:", error);
        throw error;
      } finally {
        this._isLoading.set(false);
      }
    });
  }
  deletePermission(id) {
    return __async(this, null, function* () {
      this._isLoading.set(true);
      try {
        yield this.graphqlService.deleteOne("permission", { id });
        const currentPermissions = this._allPermissions();
        const filtered = currentPermissions.filter((p) => p.id !== id);
        this._allPermissions.set(filtered);
        const selected = new Set(this._selectedPermissions());
        selected.delete(id);
        this._selectedPermissions.set(selected);
      } catch (error) {
        console.error("Error deleting permission:", error);
        throw error;
      } finally {
        this._isLoading.set(false);
      }
    });
  }
  batchDeletePermissions(ids) {
    return __async(this, null, function* () {
      this._isLoading.set(true);
      try {
        yield this.graphqlService.batchDelete("permission", ids);
        const currentPermissions = this._allPermissions();
        const filtered = currentPermissions.filter((p) => !ids.includes(p.id));
        this._allPermissions.set(filtered);
        this._selectedPermissions.set(/* @__PURE__ */ new Set());
      } catch (error) {
        console.error("Error batch deleting permissions:", error);
        throw error;
      } finally {
        this._isLoading.set(false);
      }
    });
  }
  // ========================= Search and Pagination =========================
  setSearchTerm(term) {
    this._searchTerm.set(term);
    this._currentPage.set(1);
  }
  setPage(page) {
    if (page >= 1 && page <= this.totalPages()) {
      this._currentPage.set(page);
    }
  }
  setPageSize(size) {
    this._pageSize.set(size);
    this._currentPage.set(1);
  }
  nextPage() {
    if (this._currentPage() < this.totalPages()) {
      this._currentPage.set(this._currentPage() + 1);
    }
  }
  previousPage() {
    if (this._currentPage() > 1) {
      this._currentPage.set(this._currentPage() - 1);
    }
  }
  // ========================= Selection Management =========================
  togglePermissionSelection(id) {
    const selected = new Set(this._selectedPermissions());
    if (selected.has(id)) {
      selected.delete(id);
    } else {
      selected.add(id);
    }
    this._selectedPermissions.set(selected);
  }
  selectAllCurrentPage() {
    const selected = new Set(this._selectedPermissions());
    this.paginatedPermissions().forEach((permission) => {
      selected.add(permission.id);
    });
    this._selectedPermissions.set(selected);
  }
  deselectAllCurrentPage() {
    const selected = new Set(this._selectedPermissions());
    this.paginatedPermissions().forEach((permission) => {
      selected.delete(permission.id);
    });
    this._selectedPermissions.set(selected);
  }
  clearSelection() {
    this._selectedPermissions.set(/* @__PURE__ */ new Set());
  }
  isSelected(id) {
    return this._selectedPermissions().has(id);
  }
  get selectedCount() {
    return this._selectedPermissions().size;
  }
  get selectedIds() {
    return Array.from(this._selectedPermissions());
  }
  // ========================= Utility Methods =========================
  findPermissionById(id) {
    return this._allPermissions().find((p) => p.id === id);
  }
  getPermissionsByCode(codes) {
    return this._allPermissions().filter((p) => codes.includes(p.code));
  }
  getActivePermissions() {
    return this._allPermissions().filter((p) => p.isActive);
  }
  // ========================= Cache Management =========================
  clearCache() {
    this._allPermissions.set([]);
    this._searchTerm.set("");
    this._currentPage.set(1);
    this.clearSelection();
  }
  refreshData() {
    return this.loadAllPermissions(true);
  }
  static \u0275fac = function PermissionGraphQLService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PermissionGraphQLService)(\u0275\u0275inject(StorageService));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PermissionGraphQLService, factory: _PermissionGraphQLService.\u0275fac, providedIn: "root" });
};

export {
  UserPermissionGraphQLService,
  PermissionGraphQLService
};
//# sourceMappingURL=chunk-6ZXGKAIC.js.map
