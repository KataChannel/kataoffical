import './polyfills.server.mjs';
import {
  ListUserComponent,
  UserGraphQLService
} from "./chunk-TS3XRXOQ.mjs";
import {
  PermissionGraphQLService,
  UserPermissionGraphQLService
} from "./chunk-BWTHTCOX.mjs";
import "./chunk-2FMT7VQU.mjs";
import "./chunk-T2GSXKIR.mjs";
import "./chunk-NV7NCVB6.mjs";
import "./chunk-QGE5RGZP.mjs";
import {
  MatCheckbox,
  MatCheckboxModule
} from "./chunk-HSH2C6QH.mjs";
import {
  GenId,
  convertToSlug
} from "./chunk-OLFDOXYK.mjs";
import "./chunk-RGTCKLO2.mjs";
import "./chunk-BKIOO2IQ.mjs";
import {
  MatMenu,
  MatMenuItem,
  MatMenuModule,
  MatMenuTrigger
} from "./chunk-UASPM37G.mjs";
import {
  MatTab,
  MatTabGroup,
  MatTabLabel,
  MatTabsModule
} from "./chunk-O5KUZYBA.mjs";
import "./chunk-7FHKYRY5.mjs";
import {
  ActivatedRoute,
  Router
} from "./chunk-XXHMETOB.mjs";
import "./chunk-LXPCAAVO.mjs";
import {
  GraphqlService
} from "./chunk-MECBLMI6.mjs";
import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-XEJ7KODZ.mjs";
import {
  StorageService
} from "./chunk-2BTDEHR6.mjs";
import "./chunk-BKGWM7TB.mjs";
import "./chunk-UYYJQ6OX.mjs";
import {
  MatExpansionModule,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "./chunk-SI2YIUBM.mjs";
import {
  MatSlideToggleModule
} from "./chunk-OBYVUVCN.mjs";
import {
  MatDividerModule
} from "./chunk-C52QPDRD.mjs";
import {
  MatChipListbox,
  MatChipOption,
  MatChipsModule
} from "./chunk-PGBOYRYY.mjs";
import {
  MatTooltip,
  MatTooltipModule
} from "./chunk-G5Q3EA6K.mjs";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle
} from "./chunk-AJSGP2QM.mjs";
import {
  MatSelectModule
} from "./chunk-WVX3EDL3.mjs";
import {
  MatInput,
  MatInputModule
} from "./chunk-AQETVGJS.mjs";
import {
  DefaultValueAccessor,
  FormsModule,
  MatFormField,
  MatFormFieldModule,
  MatLabel,
  MatPrefix,
  MatSuffix,
  NgControlStatus,
  NgModel,
  RadioControlValueAccessor
} from "./chunk-5444DBJD.mjs";
import "./chunk-IU3FX4W2.mjs";
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardSubtitle,
  MatCardTitle
} from "./chunk-QDIHOGXG.mjs";
import {
  MatIcon,
  MatIconModule
} from "./chunk-DV7552T6.mjs";
import {
  MatSnackBar
} from "./chunk-WUOSISWE.mjs";
import "./chunk-SPQ4ZDSL.mjs";
import "./chunk-K2LNKYXW.mjs";
import {
  MatButton,
  MatButtonModule,
  MatIconButton
} from "./chunk-7RV546X3.mjs";
import "./chunk-IKKFEUUM.mjs";
import "./chunk-DRZ4ITVR.mjs";
import "./chunk-2JIL42JL.mjs";
import {
  CommonModule,
  NgIf
} from "./chunk-WGGH2PUJ.mjs";
import {
  Observable,
  catchError,
  computed,
  effect,
  inject,
  input,
  map,
  of,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-ADMXANIA.mjs";
import "./chunk-QS2IQGEQ.mjs";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-FMEBT56H.mjs";

// src/app/admin/role/role-graphql.service.ts
var RoleGraphQLService = class _RoleGraphQLService {
  storageService;
  // Signals for state management
  _allRoles = signal([]);
  _searchTerm = signal("");
  _currentPage = signal(1);
  _pageSize = signal(50);
  _isLoading = signal(false);
  _selectedRoles = signal(/* @__PURE__ */ new Set());
  _statusFilter = signal("all");
  // Search and filter - computed signal that returns filtered data
  searchResults = computed(() => {
    let filtered = this._allRoles();
    const term = this._searchTerm().toLowerCase();
    if (term) {
      filtered = filtered.filter((role) => role.name.toLowerCase().includes(term));
    }
    return filtered;
  });
  // Public computed signals
  allRoles = this._allRoles.asReadonly();
  filteredRoles = this.searchResults;
  // Use searchResults directly
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
  constructor(storageService) {
    this.storageService = storageService;
  }
  graphqlService = inject(GraphqlService);
  // ========================= CRUD Operations =========================
  loadAllRoles(forceRefresh = false) {
    return __async(this, null, function* () {
      if (!forceRefresh && this._allRoles().length > 0) {
        return this._allRoles();
      }
      this._isLoading.set(true);
      try {
        const options = {
          orderBy: { name: "asc" },
          include: {
            permissions: {
              include: {
                permission: {
                  select: {
                    id: true,
                    name: true,
                    codeId: true
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
        const roles = yield this.graphqlService.findMany("role", options);
        this._allRoles.set(roles);
        this._currentPage.set(1);
        return roles;
      } catch (error) {
        console.error("Error loading roles:", error);
        throw error;
      } finally {
        this._isLoading.set(false);
      }
    });
  }
  createRole(data) {
    return __async(this, null, function* () {
      this._isLoading.set(true);
      try {
        const roleData = {
          name: data.name
        };
        const newRole = yield this.graphqlService.createOne("role", {
          data: roleData,
          include: {
            permissions: {
              include: {
                permission: {
                  select: {
                    id: true,
                    name: true,
                    codeId: true
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
        });
        if (data.permissionIds && data.permissionIds.length > 0) {
          yield this.assignPermissionsToRole(newRole.id, data.permissionIds);
          const roleWithPermissions = yield this.getRoleById(newRole.id);
          if (roleWithPermissions) {
            const currentRoles2 = this._allRoles();
            this._allRoles.set([roleWithPermissions, ...currentRoles2.filter((r) => r.id !== newRole.id)]);
            return roleWithPermissions;
          }
        }
        const currentRoles = this._allRoles();
        this._allRoles.set([newRole, ...currentRoles]);
        return newRole;
      } catch (error) {
        console.error("Error creating role:", error);
        throw error;
      } finally {
        this._isLoading.set(false);
      }
    });
  }
  updateRole(id, data) {
    return __async(this, null, function* () {
      this._isLoading.set(true);
      try {
        const updatedRole = yield this.graphqlService.updateOne("role", { id }, data, {
          include: {
            permissions: {
              include: {
                permission: {
                  select: {
                    id: true,
                    name: true,
                    codeId: true
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
        });
        const currentRoles = this._allRoles();
        const index = currentRoles.findIndex((r) => r.id === id);
        if (index !== -1) {
          const updated = [...currentRoles];
          updated[index] = updatedRole;
          this._allRoles.set(updated);
        }
        return updatedRole;
      } catch (error) {
        console.error("Error updating role:", error);
        throw error;
      } finally {
        this._isLoading.set(false);
      }
    });
  }
  deleteRole(id) {
    return __async(this, null, function* () {
      this._isLoading.set(true);
      try {
        yield this.graphqlService.deleteOne("role", { id });
        const currentRoles = this._allRoles();
        const filtered = currentRoles.filter((r) => r.id !== id);
        this._allRoles.set(filtered);
        const selected = new Set(this._selectedRoles());
        selected.delete(id);
        this._selectedRoles.set(selected);
      } catch (error) {
        console.error("Error deleting role:", error);
        throw error;
      } finally {
        this._isLoading.set(false);
      }
    });
  }
  getRoleById(id) {
    return __async(this, null, function* () {
      try {
        const role = yield this.graphqlService.findUnique("role", { id }, {
          include: {
            permissions: {
              include: {
                permission: {
                  select: {
                    id: true,
                    name: true,
                    codeId: true
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
        });
        return role;
      } catch (error) {
        console.error("Error getting role by id:", error);
        return null;
      }
    });
  }
  // ========================= Permission Management =========================
  assignPermissionsToRole(roleId, permissionIds) {
    return __async(this, null, function* () {
      this._isLoading.set(true);
      try {
        const permissionData = permissionIds.map((permissionId) => ({
          roleId,
          permissionId
        }));
        yield this.graphqlService.batchCreate("rolePermission", permissionData);
        const updatedRole = yield this.getRoleById(roleId);
        if (updatedRole) {
          const currentRoles = this._allRoles();
          const index = currentRoles.findIndex((r) => r.id === roleId);
          if (index !== -1) {
            const updated = [...currentRoles];
            updated[index] = updatedRole;
            this._allRoles.set(updated);
          }
        }
      } catch (error) {
        console.error("Error assigning permissions to role:", error);
        throw error;
      } finally {
        this._isLoading.set(false);
      }
    });
  }
  removePermissionFromRole(roleId, permissionId) {
    return __async(this, null, function* () {
      this._isLoading.set(true);
      try {
        const role = yield this.getRoleById(roleId);
        const rolePermission = role?.permissions?.find((rp) => rp.permissionId === permissionId);
        if (rolePermission) {
          yield this.graphqlService.deleteOne("rolePermission", { id: rolePermission.id });
          const updatedRole = yield this.getRoleById(roleId);
          if (updatedRole) {
            const currentRoles = this._allRoles();
            const index = currentRoles.findIndex((r) => r.id === roleId);
            if (index !== -1) {
              const updated = [...currentRoles];
              updated[index] = updatedRole;
              this._allRoles.set(updated);
            }
          }
        }
      } catch (error) {
        console.error("Error removing permission from role:", error);
        throw error;
      } finally {
        this._isLoading.set(false);
      }
    });
  }
  // ========================= Search and Filtering =========================
  setSearchTerm(term) {
    this._searchTerm.set(term);
    this._currentPage.set(1);
  }
  setStatusFilter(status) {
    this._statusFilter.set(status);
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
  toggleRoleSelection(id) {
    const selected = new Set(this._selectedRoles());
    if (selected.has(id)) {
      selected.delete(id);
    } else {
      selected.add(id);
    }
    this._selectedRoles.set(selected);
  }
  selectAllCurrentPage() {
    const selected = new Set(this._selectedRoles());
    this.paginatedRoles().forEach((role) => {
      selected.add(role.id);
    });
    this._selectedRoles.set(selected);
  }
  deselectAllCurrentPage() {
    const selected = new Set(this._selectedRoles());
    this.paginatedRoles().forEach((role) => {
      selected.delete(role.id);
    });
    this._selectedRoles.set(selected);
  }
  clearSelection() {
    this._selectedRoles.set(/* @__PURE__ */ new Set());
  }
  isSelected(id) {
    return this._selectedRoles().has(id);
  }
  get selectedCount() {
    return this._selectedRoles().size;
  }
  get selectedIds() {
    return Array.from(this._selectedRoles());
  }
  // ========================= Utility Methods =========================
  findRoleById(id) {
    return this._allRoles().find((r) => r.id === id);
  }
  getRolesByPermission(permissionId) {
    return this._allRoles().filter((role) => role.permissions?.some((rolePermission) => rolePermission.permissionId === permissionId));
  }
  getRolePermissions(roleId) {
    const role = this.findRoleById(roleId);
    if (!role || !role.permissions)
      return [];
    return role.permissions.map((rp) => rp.permission);
  }
  hasPermission(roleId, permissionCode) {
    const permissions = this.getRolePermissions(roleId);
    return permissions.some((p) => p.codeId === permissionCode);
  }
  getRolesByGroup(group) {
    return this._allRoles().filter((role) => role.permissions?.some((rp) => rp.permission.group === group));
  }
  getUsersInRole(roleId) {
    const role = this.findRoleById(roleId);
    if (!role || !role.users)
      return [];
    return role.users.map((ur) => ur.user);
  }
  // ========================= Cache Management =========================
  clearCache() {
    this._allRoles.set([]);
    this._searchTerm.set("");
    this._currentPage.set(1);
    this.clearSelection();
  }
  refreshData() {
    return this.loadAllRoles(true);
  }
  static \u0275fac = function RoleGraphQLService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RoleGraphQLService)(\u0275\u0275inject(StorageService));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _RoleGraphQLService, factory: _RoleGraphQLService.\u0275fac, providedIn: "root" });
};

// src/app/admin/user-permission/user-permission-details.service.ts
var UserPermissionDetailsService = class _UserPermissionDetailsService {
  userPermissionService = inject(UserPermissionGraphQLService);
  permissionService = inject(PermissionGraphQLService);
  userService = inject(UserGraphQLService);
  cachedUsers = /* @__PURE__ */ new Map();
  cachedPermissions = [];
  /**
   * Get user permission details by userId
   */
  getUserPermissionDetails(userId) {
    if (!userId || userId === "new") {
      return of(null);
    }
    if (this.cachedUsers.has(userId)) {
      return of(this.cachedUsers.get(userId));
    }
    return this.loadUserWithPermissions(userId).pipe(map((userDetails) => {
      if (userDetails) {
        this.cachedUsers.set(userId, userDetails);
      }
      return userDetails;
    }), catchError((error) => {
      console.error("Error loading user permission details:", error);
      return of(null);
    }));
  }
  /**
   * Get all available permissions
   */
  getAllPermissions() {
    if (this.cachedPermissions.length > 0) {
      return of(this.cachedPermissions);
    }
    return new Observable((observer) => {
      this.permissionService.loadAllPermissions().then(() => {
        this.cachedPermissions = this.permissionService.allPermissions();
        observer.next(this.cachedPermissions);
        observer.complete();
      }).catch((error) => {
        console.error("Error loading permissions:", error);
        observer.next([]);
        observer.complete();
      });
    });
  }
  /**
   * Generate permission summary for a user
   */
  getPermissionSummary(userDetails) {
    const rolePermissions = this.extractRolePermissions(userDetails.roles);
    const userGranted = userDetails.userPermissions.filter((up) => up.isGranted);
    const userDenied = userDetails.userPermissions.filter((up) => !up.isGranted);
    const effectivePermissions = this.calculateEffectivePermissions(rolePermissions, userGranted.map((up) => up.permission), userDenied.map((up) => up.permission));
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
  clearUserCache(userId) {
    this.cachedUsers.delete(userId);
  }
  // Private methods
  loadUserWithPermissions(userId) {
    return new Observable((observer) => {
      this.loadUserWithPermissionsAsync(userId).then((result) => {
        observer.next(result);
        observer.complete();
      }).catch((error) => {
        console.error("Error in loadUserWithPermissions:", error);
        observer.next(null);
        observer.complete();
      });
    });
  }
  loadUserWithPermissionsAsync(userId) {
    return __async(this, null, function* () {
      try {
        const user = yield this.userService.getUserById(userId);
        if (!user) {
          return null;
        }
        const userPermissions = yield this.userPermissionService.getUserPermissions(userId);
        const userDetails = {
          id: user.id,
          email: user.email,
          SDT: user.SDT,
          isActive: user.isActive,
          profile: user.profile,
          roles: user.roles || [],
          userPermissions: userPermissions.map((up) => ({
            id: up.id,
            isGranted: up.isGranted,
            permission: up.permission ? {
              id: up.permission.id,
              name: up.permission.name,
              code: up.permission.codeId || "",
              description: up.permission.description,
              isActive: true,
              createdAt: /* @__PURE__ */ new Date(),
              updatedAt: /* @__PURE__ */ new Date()
            } : {
              id: "",
              name: "Unknown Permission",
              code: "",
              description: "",
              isActive: false,
              createdAt: /* @__PURE__ */ new Date(),
              updatedAt: /* @__PURE__ */ new Date()
            },
            createdAt: up.createdAt,
            updatedAt: up.updatedAt
          }))
        };
        return userDetails;
      } catch (error) {
        console.error("Error in loadUserWithPermissionsAsync:", error);
        return null;
      }
    });
  }
  extractRolePermissions(roles) {
    const permissionMap = /* @__PURE__ */ new Map();
    roles.forEach((userRole) => {
      const role = userRole.role;
      if (role && role.permissions) {
        role.permissions.forEach((permission) => {
          if (permission && permission.id) {
            const fullPermission = {
              id: permission.id,
              name: permission?.permission?.name,
              code: permission?.permission?.codeId || permission?.permission?.code || "",
              description: permission.description,
              isActive: true,
              createdAt: /* @__PURE__ */ new Date(),
              updatedAt: /* @__PURE__ */ new Date()
            };
            permissionMap.set(permission.id, fullPermission);
          }
        });
      }
    });
    return Array.from(permissionMap.values());
  }
  calculateEffectivePermissions(rolePermissions, userGranted, userDenied) {
    const effectiveMap = /* @__PURE__ */ new Map();
    rolePermissions.forEach((permission) => {
      effectiveMap.set(permission.id, permission);
    });
    userGranted.forEach((permission) => {
      if (permission && permission.id) {
        const fullPermission = {
          id: permission.id,
          name: permission.name,
          code: permission.codeId || permission.code || "",
          description: permission.description,
          isActive: true,
          createdAt: /* @__PURE__ */ new Date(),
          updatedAt: /* @__PURE__ */ new Date()
        };
        effectiveMap.set(permission.id, fullPermission);
      }
    });
    userDenied.forEach((permission) => {
      if (permission && permission.id) {
        effectiveMap.delete(permission.id);
      }
    });
    return Array.from(effectiveMap.values());
  }
  static \u0275fac = function UserPermissionDetailsService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UserPermissionDetailsService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _UserPermissionDetailsService, factory: _UserPermissionDetailsService.\u0275fac, providedIn: "root" });
};

// src/app/admin/user/detailuser/user-roles-info.component.ts
var _forTrack0 = ($index, $item) => $item.id || $item.roleId;
var _forTrack1 = ($index, $item) => $item.id || $item.name;
function UserRolesInfoComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7)(1, "small", 8);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u2705 UserRolesInfoComponent loaded - User: ", ((tmp_1_0 = ctx_r0.user()) == null ? null : tmp_1_0.email) || ((tmp_1_0 = ctx_r0.user()) == null ? null : tmp_1_0.name) || ((tmp_1_0 = ctx_r0.user()) == null ? null : tmp_1_0.id), "");
  }
}
function UserRolesInfoComponent_Conditional_10_For_2_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 14);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const userRole_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (userRole_r2.role == null ? null : userRole_r2.role.description) || userRole_r2.description, " ");
  }
}
function UserRolesInfoComponent_Conditional_10_For_2_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const userRole_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getRolePermissions(userRole_r2).length, " quy\u1EC1n ");
  }
}
function UserRolesInfoComponent_Conditional_10_For_2_Conditional_10_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 20);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const permission_r3 = ctx.$implicit;
    \u0275\u0275property("title", permission_r3.description || permission_r3.name);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", permission_r3.permission.name, " ");
  }
}
function UserRolesInfoComponent_Conditional_10_For_2_Conditional_10_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 22);
    \u0275\u0275listener("click", function UserRolesInfoComponent_Conditional_10_For_2_Conditional_10_Conditional_4_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const userRole_r2 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.toggleShowPermissions(userRole_r2.id || userRole_r2.roleId));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const userRole_r2 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.showAllPermissions[userRole_r2.id || userRole_r2.roleId] ? "Thu g\u1ECDn" : "..." + (ctx_r0.getRolePermissions(userRole_r2).length - 4) + " n\u1EEFa", " ");
  }
}
function UserRolesInfoComponent_Conditional_10_For_2_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16)(1, "div", 19);
    \u0275\u0275repeaterCreate(2, UserRolesInfoComponent_Conditional_10_For_2_Conditional_10_For_3_Template, 2, 2, "span", 20, _forTrack1);
    \u0275\u0275template(4, UserRolesInfoComponent_Conditional_10_For_2_Conditional_10_Conditional_4_Template, 2, 1, "button", 21);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const userRole_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.getRolePermissions(userRole_r2).slice(0, ctx_r0.showAllPermissions[userRole_r2.id || userRole_r2.roleId] ? ctx_r0.getRolePermissions(userRole_r2).length : 4));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.getRolePermissions(userRole_r2).length > 4 ? 4 : -1);
  }
}
function UserRolesInfoComponent_Conditional_10_For_2_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17)(1, "mat-icon", 23);
    \u0275\u0275text(2, "block");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Kh\xF4ng c\xF3 quy\u1EC1n");
    \u0275\u0275elementEnd()();
  }
}
function UserRolesInfoComponent_Conditional_10_For_2_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18)(1, "mat-icon", 24);
    \u0275\u0275text(2, "schedule");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 25);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const userRole_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" G\xE1n l\xFAc: ", ctx_r0.formatDate(userRole_r2.assignedAt || userRole_r2.createdAt), " ");
  }
}
function UserRolesInfoComponent_Conditional_10_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "div", 10)(2, "div", 11)(3, "mat-icon", 12);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div")(6, "h4", 13);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275template(8, UserRolesInfoComponent_Conditional_10_For_2_Conditional_8_Template, 2, 1, "p", 14);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(9, UserRolesInfoComponent_Conditional_10_For_2_Conditional_9_Template, 2, 1, "span", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275template(10, UserRolesInfoComponent_Conditional_10_For_2_Conditional_10_Template, 5, 1, "div", 16)(11, UserRolesInfoComponent_Conditional_10_For_2_Conditional_11_Template, 5, 0, "div", 17)(12, UserRolesInfoComponent_Conditional_10_For_2_Conditional_12_Template, 5, 1, "div", 18);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const userRole_r2 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.getRoleIcon((userRole_r2.role == null ? null : userRole_r2.role.name) || userRole_r2.name), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", (userRole_r2.role == null ? null : userRole_r2.role.name) || userRole_r2.name, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional((userRole_r2.role == null ? null : userRole_r2.role.description) || userRole_r2.description ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.getRolePermissions(userRole_r2).length > 0 ? 9 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.getRolePermissions(userRole_r2).length > 0 ? 10 : 11);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(userRole_r2.assignedAt || userRole_r2.createdAt ? 12 : -1);
  }
}
function UserRolesInfoComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275repeaterCreate(1, UserRolesInfoComponent_Conditional_10_For_2_Template, 13, 6, "div", 9, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.user().roles);
  }
}
function UserRolesInfoComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "mat-icon", 26);
    \u0275\u0275text(2, "person_outline");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 27);
    \u0275\u0275text(4, "Ch\u01B0a c\xF3 vai tr\xF2 n\xE0o");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 4);
    \u0275\u0275text(6, "User n\xE0y ch\u01B0a \u0111\u01B0\u1EE3c g\xE1n vai tr\xF2 n\xE0o");
    \u0275\u0275elementEnd()();
  }
}
var UserRolesInfoComponent = class _UserRolesInfoComponent {
  user = input();
  showAllPermissions = {};
  constructor() {
    effect(() => {
    });
  }
  getRolePermissions(userRole) {
    const result = userRole.role?.permissions || userRole.permissions || userRole.role?.rolePermissions?.map((rp) => rp.permission) || [];
    return result;
  }
  getRoleIcon(roleName) {
    if (!roleName)
      return "person";
    const name = roleName.toLowerCase();
    if (name.includes("admin"))
      return "admin_panel_settings";
    if (name.includes("manager") || name.includes("qu\u1EA3n l\xFD"))
      return "manage_accounts";
    if (name.includes("user") || name.includes("ng\u01B0\u1EDDi d\xF9ng"))
      return "person";
    if (name.includes("guest") || name.includes("kh\xE1ch"))
      return "person_outline";
    if (name.includes("moderator"))
      return "gavel";
    if (name.includes("editor"))
      return "edit";
    if (name.includes("viewer"))
      return "visibility";
    return "group";
  }
  toggleShowPermissions(roleId) {
    this.showAllPermissions[roleId] = !this.showAllPermissions[roleId];
  }
  formatDate(dateStr) {
    if (!dateStr)
      return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }
  static \u0275fac = function UserRolesInfoComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UserRolesInfoComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UserRolesInfoComponent, selectors: [["app-user-roles-info"]], inputs: { user: [1, "user"] }, decls: 12, vars: 3, consts: [["class", "mb-2 p-2 bg-blue-50 border border-blue-200 rounded", 4, "ngIf"], [1, "roles-info"], [1, "text-sm", "font-medium", "flex", "items-center"], [1, "mr-2", "text-blue-500"], [1, "text-xs"], [1, "space-y-4"], [1, "text-center", "py-6", "text-gray-500"], [1, "mb-2", "p-2", "bg-blue-50", "border", "border-blue-200", "rounded"], [1, "text-blue-700"], [1, "border", "rounded-lg", "p-3", "bg-gray-50"], [1, "flex", "items-center", "justify-between", "mb-2"], [1, "flex", "items-center"], [1, "mr-2", "text-blue-600"], [1, "font-medium", "text-sm", "text-gray-800"], [1, "text-xs", "text-gray-600"], [1, "px-2", "py-1", "text-xs", "bg-blue-100", "text-blue-800", "rounded-full"], [1, "mt-2"], [1, "text-center", "text-gray-400", "text-xs", "py-2"], [1, "flex", "items-center", "mt-2", "pt-2", "border-t", "border-gray-200"], [1, "flex", "flex-wrap", "gap-1"], [1, "px-2", "py-1", "text-xs", "bg-white", "border", "border-blue-200", "text-blue-700", "rounded", 3, "title"], ["mat-button", "", 1, "!text-xs", "!p-1", "!min-w-0", "text-blue-600"], ["mat-button", "", 1, "!text-xs", "!p-1", "!min-w-0", "text-blue-600", 3, "click"], [1, "text-gray-300"], [1, "mr-1", "text-gray-400", 2, "font-size", "14px"], [1, "text-xs", "text-gray-500"], [1, "text-4xl", "text-gray-300"], [1, "mt-2", "text-sm"]], template: function UserRolesInfoComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275template(0, UserRolesInfoComponent_div_0_Template, 3, 1, "div", 0);
      \u0275\u0275elementStart(1, "mat-card", 1)(2, "mat-card-header")(3, "mat-card-title", 2)(4, "mat-icon", 3);
      \u0275\u0275text(5, "groups");
      \u0275\u0275elementEnd();
      \u0275\u0275text(6, " Vai Tr\xF2 & Quy\u1EC1n ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "mat-card-subtitle", 4);
      \u0275\u0275text(8);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "mat-card-content");
      \u0275\u0275template(10, UserRolesInfoComponent_Conditional_10_Template, 3, 0, "div", 5)(11, UserRolesInfoComponent_Conditional_11_Template, 7, 0, "div", 6);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      let tmp_1_0;
      let tmp_2_0;
      \u0275\u0275property("ngIf", ctx.user());
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate1(" ", ((tmp_1_0 = ctx.user()) == null ? null : tmp_1_0.roles == null ? null : tmp_1_0.roles.length) || 0, " vai tr\xF2 \u0111\u01B0\u1EE3c g\xE1n ");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(((tmp_2_0 = ctx.user()) == null ? null : tmp_2_0.roles) && ctx.user().roles.length > 0 ? 10 : 11);
    }
  }, dependencies: [
    CommonModule,
    NgIf,
    MatCardModule,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatIconModule,
    MatIcon,
    MatChipsModule,
    MatButtonModule,
    MatButton
  ], styles: ["\n\n.roles-info[_ngcontent-%COMP%] {\n  border-left: 4px solid #2196f3;\n}\n.roles-info[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%] {\n  padding-bottom: 8px;\n}\n.roles-info[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n.roles-info[_ngcontent-%COMP%]   .border[_ngcontent-%COMP%]:hover {\n  border-color: #2196f3;\n  background-color: #f3f4f6;\n}\n/*# sourceMappingURL=user-roles-info.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UserRolesInfoComponent, { className: "UserRolesInfoComponent", filePath: "src/app/admin/user/detailuser/user-roles-info.component.ts", lineNumber: 139 });
})();

// src/app/admin/user-permission/permission-selector-dialog.component.ts
var _forTrack02 = ($index, $item) => $item.id;
function PermissionSelectorDialogComponent_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 57);
    \u0275\u0275listener("click", function PermissionSelectorDialogComponent_Conditional_42_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.clearSearch());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "clear");
    \u0275\u0275elementEnd()();
  }
}
function PermissionSelectorDialogComponent_Conditional_74_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 43)(1, "mat-icon", 58);
    \u0275\u0275text(2, "search_off");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 59);
    \u0275\u0275text(4, "Kh\xF4ng t\xECm th\u1EA5y quy\u1EC1n n\xE0o");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 60);
    \u0275\u0275text(6, "Th\u1EED t\xECm ki\u1EBFm v\u1EDBi t\u1EEB kh\xF3a kh\xE1c");
    \u0275\u0275elementEnd()();
  }
}
function PermissionSelectorDialogComponent_Conditional_75_For_2_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 68);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const permission_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", permission_r4.description, " ");
  }
}
function PermissionSelectorDialogComponent_Conditional_75_For_2_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 69);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const permission_r4 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ID: ", ctx_r1.getPermissionCode(permission_r4), " ");
  }
}
function PermissionSelectorDialogComponent_Conditional_75_For_2_Conditional_12_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 76)(1, "mat-icon", 79);
    \u0275\u0275text(2, "group");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " T\u1EEB vai tr\xF2 ");
    \u0275\u0275elementEnd();
  }
}
function PermissionSelectorDialogComponent_Conditional_75_For_2_Conditional_12_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 77)(1, "mat-icon", 79);
    \u0275\u0275text(2, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " \u0110\xE3 c\u1EA5p ri\xEAng ");
    \u0275\u0275elementEnd();
  }
}
function PermissionSelectorDialogComponent_Conditional_75_For_2_Conditional_12_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 78)(1, "mat-icon", 79);
    \u0275\u0275text(2, "block");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " \u0110\xE3 t\u1EEB ch\u1ED1i ");
    \u0275\u0275elementEnd();
  }
}
function PermissionSelectorDialogComponent_Conditional_75_For_2_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, PermissionSelectorDialogComponent_Conditional_75_For_2_Conditional_12_Conditional_0_Template, 4, 0, "span", 76)(1, PermissionSelectorDialogComponent_Conditional_75_For_2_Conditional_12_Conditional_1_Template, 4, 0, "span", 77)(2, PermissionSelectorDialogComponent_Conditional_75_For_2_Conditional_12_Conditional_2_Template, 4, 0, "span", 78);
  }
  if (rf & 2) {
    const status_r5 = ctx;
    \u0275\u0275conditional(status_r5 === "role" ? 0 : status_r5 === "granted" ? 1 : status_r5 === "denied" ? 2 : -1);
  }
}
function PermissionSelectorDialogComponent_Conditional_75_For_2_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 71)(1, "mat-icon", 79);
    \u0275\u0275text(2, "radio_button_unchecked");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Ch\u01B0a thi\u1EBFt l\u1EADp ");
    \u0275\u0275elementEnd();
  }
}
function PermissionSelectorDialogComponent_Conditional_75_For_2_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 72)(1, "mat-icon", 79);
    \u0275\u0275text(2, "folder");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const permission_r4 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.getPermissionGroup(permission_r4), " ");
  }
}
function PermissionSelectorDialogComponent_Conditional_75_For_2_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 80);
    \u0275\u0275listener("click", function PermissionSelectorDialogComponent_Conditional_75_For_2_Conditional_16_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r6);
      const permission_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.togglePermission(permission_r4, true);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(1, "mat-icon", 81);
    \u0275\u0275text(2, "add_circle_outline");
    \u0275\u0275elementEnd()();
  }
}
function PermissionSelectorDialogComponent_Conditional_75_For_2_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 82);
    \u0275\u0275listener("click", function PermissionSelectorDialogComponent_Conditional_75_For_2_Conditional_17_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r7);
      const permission_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.togglePermission(permission_r4, false);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(1, "mat-icon", 81);
    \u0275\u0275text(2, "remove_circle_outline");
    \u0275\u0275elementEnd()();
  }
}
function PermissionSelectorDialogComponent_Conditional_75_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 62);
    \u0275\u0275listener("click", function PermissionSelectorDialogComponent_Conditional_75_For_2_Template_div_click_0_listener() {
      const permission_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.togglePermissionByClick(permission_r4));
    });
    \u0275\u0275elementStart(1, "div", 63)(2, "mat-checkbox", 64);
    \u0275\u0275listener("change", function PermissionSelectorDialogComponent_Conditional_75_For_2_Template_mat_checkbox_change_2_listener($event) {
      const permission_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.togglePermission(permission_r4, $event.checked));
    })("click", function PermissionSelectorDialogComponent_Conditional_75_For_2_Template_mat_checkbox_click_2_listener($event) {
      \u0275\u0275restoreView(_r3);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 65)(4, "div", 66)(5, "div", 65)(6, "h5", 67);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275template(8, PermissionSelectorDialogComponent_Conditional_75_For_2_Conditional_8_Template, 2, 1, "p", 68)(9, PermissionSelectorDialogComponent_Conditional_75_For_2_Conditional_9_Template, 2, 1, "p", 69);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 70)(11, "div", 26);
    \u0275\u0275template(12, PermissionSelectorDialogComponent_Conditional_75_For_2_Conditional_12_Template, 3, 1)(13, PermissionSelectorDialogComponent_Conditional_75_For_2_Conditional_13_Template, 4, 0, "span", 71)(14, PermissionSelectorDialogComponent_Conditional_75_For_2_Conditional_14_Template, 4, 1, "span", 72);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 73);
    \u0275\u0275template(16, PermissionSelectorDialogComponent_Conditional_75_For_2_Conditional_16_Template, 3, 0, "button", 74)(17, PermissionSelectorDialogComponent_Conditional_75_For_2_Conditional_17_Template, 3, 0, "button", 75);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    let tmp_20_0;
    const permission_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("bg-blue-50", ctx_r1.isPermissionSelected(permission_r4))("border-l-4", ctx_r1.isPermissionSelected(permission_r4))("border-l-blue-500", ctx_r1.isPermissionSelected(permission_r4))("shadow-sm", ctx_r1.isPermissionSelected(permission_r4));
    \u0275\u0275advance(2);
    \u0275\u0275property("checked", ctx_r1.isPermissionSelected(permission_r4))("disabled", ctx_r1.isPermissionDisabled(permission_r4));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", permission_r4.name, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(permission_r4.description ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.getPermissionCode(permission_r4) ? 9 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275conditional((tmp_20_0 = ctx_r1.getPermissionStatus(permission_r4)) ? 12 : 13, tmp_20_0);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.getPermissionGroup(permission_r4) ? 14 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!ctx_r1.isPermissionSelected(permission_r4) ? 16 : 17);
  }
}
function PermissionSelectorDialogComponent_Conditional_75_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 44);
    \u0275\u0275repeaterCreate(1, PermissionSelectorDialogComponent_Conditional_75_For_2_Template, 18, 16, "div", 61, _forTrack02);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.filteredPermissions());
  }
}
function PermissionSelectorDialogComponent_Conditional_107_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 56);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.selectedPermissions().length, " ");
  }
}
var PermissionSelectorDialogComponent = class _PermissionSelectorDialogComponent {
  dialogRef = inject(MatDialogRef);
  data = inject(MAT_DIALOG_DATA);
  searchTerm = "";
  grantType = "grant";
  reason = "";
  selectedPermissions = signal([]);
  filteredPermissions = signal([]);
  permissionGroups = signal([]);
  constructor() {
    this.filteredPermissions.set(this.data.availablePermissions);
  }
  filterPermissions() {
    const term = this.searchTerm.toLowerCase();
    let filtered = this.data.availablePermissions;
    if (term) {
      filtered = filtered.filter((p) => p.name.toLowerCase().includes(term) || p.description && p.description.toLowerCase().includes(term) || this.getPermissionGroup(p).toLowerCase().includes(term));
    }
    this.filteredPermissions.set(filtered);
  }
  // Remove the updatePermissionGroups method since we're not using groups
  getPermissionCode(permission) {
    return permission.code || "";
  }
  getPermissionGroup(permission) {
    return permission.group || "Kh\xE1c";
  }
  isPermissionSelected(permission) {
    return this.selectedPermissions().some((p) => p.id === permission.id);
  }
  isPermissionDisabled(permission) {
    return false;
  }
  getPermissionStatus(permission) {
    const hasFromRole = this.data.currentRolePermissions.some((p) => p.id === permission.id);
    if (hasFromRole)
      return "role";
    const userPerm = this.data.currentUserPermissions.find((up) => up.permission.id === permission.id);
    if (userPerm) {
      return userPerm.isGranted ? "granted" : "denied";
    }
    return null;
  }
  togglePermission(permission, checked) {
    const current = this.selectedPermissions();
    if (checked) {
      if (!this.isPermissionSelected(permission)) {
        this.selectedPermissions.set([...current, permission]);
      }
    } else {
      this.selectedPermissions.set(current.filter((p) => p.id !== permission.id));
    }
  }
  clearSearch() {
    this.searchTerm = "";
    this.filterPermissions();
  }
  selectAllVisible() {
    const allVisiblePermissions = [];
    this.filteredPermissions().forEach((permission) => {
      if (!this.isPermissionDisabled(permission) && !this.isPermissionSelected(permission)) {
        allVisiblePermissions.push(permission);
      }
    });
    this.selectedPermissions.set([...this.selectedPermissions(), ...allVisiblePermissions]);
  }
  clearSelection() {
    this.selectedPermissions.set([]);
  }
  // New methods for "select all" functionality in the flat list
  isAllSelected() {
    const enabledPermissions = this.filteredPermissions().filter((p) => !this.isPermissionDisabled(p));
    return enabledPermissions.length > 0 && enabledPermissions.every((p) => this.isPermissionSelected(p));
  }
  isAllIndeterminate() {
    const enabledPermissions = this.filteredPermissions().filter((p) => !this.isPermissionDisabled(p));
    const selectedCount = enabledPermissions.filter((p) => this.isPermissionSelected(p)).length;
    return selectedCount > 0 && selectedCount < enabledPermissions.length;
  }
  toggleAll(checked) {
    const enabledPermissions = this.filteredPermissions().filter((p) => !this.isPermissionDisabled(p));
    if (checked) {
      const toAdd = enabledPermissions.filter((p) => !this.isPermissionSelected(p));
      this.selectedPermissions.set([...this.selectedPermissions(), ...toAdd]);
    } else {
      const visibleIds = enabledPermissions.map((p) => p.id);
      this.selectedPermissions.set(this.selectedPermissions().filter((p) => !visibleIds.includes(p.id)));
    }
  }
  togglePermissionByClick(permission) {
    if (!this.isPermissionDisabled(permission)) {
      this.togglePermission(permission, !this.isPermissionSelected(permission));
    }
  }
  // Group-related methods removed since we're using a flat list
  // These methods are kept for backward compatibility but simplified
  onCancel() {
    this.dialogRef.close();
  }
  onConfirm() {
    const result = {
      selectedPermissions: this.selectedPermissions(),
      grantType: this.grantType,
      reason: this.reason.trim() || void 0
    };
    this.dialogRef.close(result);
  }
  static \u0275fac = function PermissionSelectorDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PermissionSelectorDialogComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PermissionSelectorDialogComponent, selectors: [["app-permission-selector-dialog"]], decls: 108, vars: 18, consts: [["mat-dialog-title", "", 1, "w-full", "!flex", "!items-center", "!bg-gradient-to-r", "!from-blue-50", "!to-indigo-50", "!p-6", "!rounded-t-lg"], [1, "mr-3", "text-blue-600", "text-2xl"], [1, "text-xl", "font-semibold", "text-gray-800"], [1, "text-sm", "text-gray-600", "mt-1"], [1, "mat-typography", "!p-6", "!max-h-[70vh]", "!overflow-y-auto"], [1, "space-y-6"], [1, "bg-white", "border", "border-gray-200", "rounded-xl", "p-4", "shadow-sm"], [1, "flex", "items-center", "mb-3"], [1, "mr-2", "text-indigo-500"], [1, "text-base", "font-medium", "text-gray-800"], [1, "grid", "grid-cols-2", "gap-3"], [1, "relative"], ["type", "radio", "id", "grant", "name", "grantType", "value", "grant", 1, "sr-only", "peer", 3, "ngModelChange", "ngModel"], ["for", "grant", 1, "flex", "items-center", "justify-center", "p-4", "border-2", "border-gray-200", "rounded-lg", "cursor-pointer", "transition-all", "duration-200", "peer-checked:border-green-500", "peer-checked:bg-green-50", "hover:border-green-300", "hover:bg-green-25"], [1, "text-center"], [1, "text-green-500", "mb-2"], [1, "font-medium", "text-gray-800"], [1, "text-xs", "text-gray-500"], ["type", "radio", "id", "deny", "name", "grantType", "value", "deny", 1, "sr-only", "peer", 3, "ngModelChange", "ngModel"], ["for", "deny", 1, "flex", "items-center", "justify-center", "p-4", "border-2", "border-gray-200", "rounded-lg", "cursor-pointer", "transition-all", "duration-200", "peer-checked:border-red-500", "peer-checked:bg-red-50", "hover:border-red-300", "hover:bg-red-25"], [1, "text-red-500", "mb-2"], ["appearance", "outline", 1, "w-full", "!mb-0"], ["matInput", "", "placeholder", "Nh\u1EADp t\xEAn quy\u1EC1n, m\xF4 t\u1EA3 ho\u1EB7c nh\xF3m quy\u1EC1n...", 3, "ngModelChange", "ngModel"], ["matPrefix", "", 1, "!mr-2"], ["matSuffix", "", "mat-icon-button", ""], [1, "flex", "flex-wrap", "gap-2", "items-center", "justify-between", "bg-gray-50", "p-3", "rounded-lg"], [1, "flex", "flex-wrap", "gap-2"], ["mat-stroked-button", "", "size", "small", 1, "!text-blue-600", "!border-blue-300", 3, "click"], [1, "!text-sm", "mr-1"], ["mat-stroked-button", "", "size", "small", 1, "!text-gray-600", "!border-gray-300", 3, "click"], [1, "text-sm", "font-medium", "text-gray-600"], [1, "text-blue-600"], [1, "bg-white", "border", "border-gray-200", "rounded-xl", "overflow-hidden", "shadow-sm"], [1, "bg-gradient-to-r", "from-blue-50", "to-indigo-50", "p-4", "border-b", "border-gray-200"], [1, "flex", "items-center", "justify-between"], [1, "flex", "items-center"], [1, "mr-3", 3, "change", "checked", "indeterminate"], [1, "mr-2", "text-blue-600"], [1, "font-semibold", "text-gray-800", "text-lg"], [1, "flex", "items-center", "space-x-3"], [1, "text-sm", "text-gray-600", "bg-white", "px-3", "py-1", "rounded-full", "border"], [1, "text-xs", "text-blue-600", "bg-blue-100", "px-2", "py-1", "rounded"], [1, "bg-white"], [1, "text-center", "py-12", "text-gray-500"], [1, "max-h-[50vh]", "overflow-y-auto"], [1, "mr-2", "text-amber-500"], ["matInput", "", "rows", "3", "placeholder", "Nh\u1EADp l\xFD do c\u1EA5p ho\u1EB7c thu h\u1ED3i quy\u1EC1n n\xE0y \u0111\u1EC3 d\u1EC5 theo d\xF5i...", 3, "ngModelChange", "ngModel"], ["matPrefix", "", 1, "!mr-2", "!mt-3"], [1, "!p-6", "!border-t", "!border-gray-200", "!bg-gray-50"], [1, "flex", "items-center", "justify-between", "w-full"], [1, "flex", "items-center", "space-x-4"], [1, "text-sm", "text-gray-600", "flex", "items-center"], [1, "text-blue-600", "mx-1"], ["mat-stroked-button", "", 1, "!border-gray-300", "!text-gray-700", "!px-6", 3, "click"], [1, "mr-1"], ["mat-raised-button", "", "color", "primary", 1, "!px-6", "!py-2", "!shadow-lg", 3, "click", "disabled"], [1, "ml-1", "bg-white", "bg-opacity-20", "px-2", "py-0.5", "rounded-full", "text-xs"], ["matSuffix", "", "mat-icon-button", "", 3, "click"], [1, "text-5xl", "mb-3", "text-gray-300"], [1, "text-lg", "font-medium"], [1, "text-sm", "mt-1"], [1, "border-b", "border-gray-100", "last:border-b-0", "hover:bg-blue-25", "transition-all", "duration-200", "cursor-pointer", 3, "bg-blue-50", "border-l-4", "border-l-blue-500", "shadow-sm"], [1, "border-b", "border-gray-100", "last:border-b-0", "hover:bg-blue-25", "transition-all", "duration-200", "cursor-pointer", 3, "click"], [1, "p-4", "flex", "items-start", "space-x-4"], [1, "!mt-1", "flex-shrink-0", 3, "change", "click", "checked", "disabled"], [1, "flex-1", "min-w-0"], [1, "flex", "items-start", "justify-between"], [1, "font-semibold", "text-gray-900", "text-base", "truncate", "hover:text-blue-600", "transition-colors"], [1, "text-sm", "text-gray-600", "mt-1", "leading-relaxed", "line-clamp-2"], [1, "text-xs", "text-gray-500", "mt-1", "font-mono", "bg-gray-100", "px-2", "py-1", "rounded", "inline-block"], [1, "flex", "items-center", "justify-between", "mt-3"], [1, "inline-flex", "items-center", "px-2.5", "py-0.5", "rounded-full", "text-xs", "font-medium", "bg-gray-100", "text-gray-600"], [1, "inline-flex", "items-center", "px-2", "py-0.5", "rounded", "text-xs", "font-medium", "bg-purple-100", "text-purple-700"], [1, "flex", "items-center", "space-x-1", "opacity-0", "group-hover:opacity-100", "transition-opacity"], ["mat-icon-button", "", "size", "small", "matTooltip", "Ch\u1ECDn quy\u1EC1n n\xE0y", 1, "!text-green-600", "!w-8", "!h-8"], ["mat-icon-button", "", "size", "small", "matTooltip", "B\u1ECF ch\u1ECDn quy\u1EC1n n\xE0y", 1, "!text-red-600", "!w-8", "!h-8"], [1, "inline-flex", "items-center", "px-2.5", "py-0.5", "rounded-full", "text-xs", "font-medium", "bg-blue-100", "text-blue-800", "animate-fade-in"], [1, "inline-flex", "items-center", "px-2.5", "py-0.5", "rounded-full", "text-xs", "font-medium", "bg-green-100", "text-green-800", "animate-fade-in"], [1, "inline-flex", "items-center", "px-2.5", "py-0.5", "rounded-full", "text-xs", "font-medium", "bg-red-100", "text-red-800", "animate-fade-in"], [1, "!text-xs", "mr-1"], ["mat-icon-button", "", "size", "small", "matTooltip", "Ch\u1ECDn quy\u1EC1n n\xE0y", 1, "!text-green-600", "!w-8", "!h-8", 3, "click"], [1, "!text-lg"], ["mat-icon-button", "", "size", "small", "matTooltip", "B\u1ECF ch\u1ECDn quy\u1EC1n n\xE0y", 1, "!text-red-600", "!w-8", "!h-8", 3, "click"]], template: function PermissionSelectorDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "mat-icon", 1);
      \u0275\u0275text(2, "security");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "div")(4, "h2", 2);
      \u0275\u0275text(5, "Qu\u1EA3n L\xFD Quy\u1EC1n Ng\u01B0\u1EDDi D\xF9ng");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "p", 3);
      \u0275\u0275text(7, "C\u1EA5p ho\u1EB7c thu h\u1ED3i quy\u1EC1n truy c\u1EADp");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(8, "mat-dialog-content", 4)(9, "div", 5)(10, "div", 6)(11, "div", 7)(12, "mat-icon", 8);
      \u0275\u0275text(13, "tune");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "label", 9);
      \u0275\u0275text(15, "Lo\u1EA1i thao t\xE1c:");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(16, "div", 10)(17, "div", 11)(18, "input", 12);
      \u0275\u0275twoWayListener("ngModelChange", function PermissionSelectorDialogComponent_Template_input_ngModelChange_18_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.grantType, $event) || (ctx.grantType = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "label", 13)(20, "div", 14)(21, "mat-icon", 15);
      \u0275\u0275text(22, "add_circle_outline");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "div", 16);
      \u0275\u0275text(24, "C\u1EA5p Quy\u1EC1n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "div", 17);
      \u0275\u0275text(26, "Cho ph\xE9p truy c\u1EADp");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(27, "div", 11)(28, "input", 18);
      \u0275\u0275twoWayListener("ngModelChange", function PermissionSelectorDialogComponent_Template_input_ngModelChange_28_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.grantType, $event) || (ctx.grantType = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "label", 19)(30, "div", 14)(31, "mat-icon", 20);
      \u0275\u0275text(32, "remove_circle_outline");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "div", 16);
      \u0275\u0275text(34, "Thu H\u1ED3i");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(35, "div", 17);
      \u0275\u0275text(36, "T\u1EEB ch\u1ED1i truy c\u1EADp");
      \u0275\u0275elementEnd()()()()()();
      \u0275\u0275elementStart(37, "div", 6)(38, "mat-form-field", 21)(39, "input", 22);
      \u0275\u0275twoWayListener("ngModelChange", function PermissionSelectorDialogComponent_Template_input_ngModelChange_39_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.searchTerm, $event) || (ctx.searchTerm = $event);
        return $event;
      });
      \u0275\u0275listener("ngModelChange", function PermissionSelectorDialogComponent_Template_input_ngModelChange_39_listener() {
        return ctx.filterPermissions();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "mat-icon", 23);
      \u0275\u0275text(41, "search");
      \u0275\u0275elementEnd();
      \u0275\u0275template(42, PermissionSelectorDialogComponent_Conditional_42_Template, 3, 0, "button", 24);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(43, "div", 25)(44, "div", 26)(45, "button", 27);
      \u0275\u0275listener("click", function PermissionSelectorDialogComponent_Template_button_click_45_listener() {
        return ctx.selectAllVisible();
      });
      \u0275\u0275elementStart(46, "mat-icon", 28);
      \u0275\u0275text(47, "select_all");
      \u0275\u0275elementEnd();
      \u0275\u0275text(48, " Ch\u1ECDn t\u1EA5t c\u1EA3 ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(49, "button", 29);
      \u0275\u0275listener("click", function PermissionSelectorDialogComponent_Template_button_click_49_listener() {
        return ctx.clearSelection();
      });
      \u0275\u0275elementStart(50, "mat-icon", 28);
      \u0275\u0275text(51, "deselect");
      \u0275\u0275elementEnd();
      \u0275\u0275text(52, " B\u1ECF ch\u1ECDn ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(53, "div", 30);
      \u0275\u0275text(54, " \u0110\xE3 ch\u1ECDn: ");
      \u0275\u0275elementStart(55, "span", 31);
      \u0275\u0275text(56);
      \u0275\u0275elementEnd();
      \u0275\u0275text(57, " quy\u1EC1n ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(58, "div", 32)(59, "div", 33)(60, "div", 34)(61, "div", 35)(62, "mat-checkbox", 36);
      \u0275\u0275listener("change", function PermissionSelectorDialogComponent_Template_mat_checkbox_change_62_listener($event) {
        return ctx.toggleAll($event.checked);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(63, "div", 35)(64, "mat-icon", 37);
      \u0275\u0275text(65, "security");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(66, "h4", 38);
      \u0275\u0275text(67, "T\u1EA5t c\u1EA3 quy\u1EC1n h\u1EC7 th\u1ED1ng");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(68, "div", 39)(69, "span", 40);
      \u0275\u0275text(70);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(71, "span", 41);
      \u0275\u0275text(72);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(73, "div", 42);
      \u0275\u0275template(74, PermissionSelectorDialogComponent_Conditional_74_Template, 7, 0, "div", 43)(75, PermissionSelectorDialogComponent_Conditional_75_Template, 3, 0, "div", 44);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(76, "div", 6)(77, "div", 7)(78, "mat-icon", 45);
      \u0275\u0275text(79, "note_add");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(80, "label", 9);
      \u0275\u0275text(81, "Ghi ch\xFA (t\xF9y ch\u1ECDn):");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(82, "mat-form-field", 21)(83, "textarea", 46);
      \u0275\u0275twoWayListener("ngModelChange", function PermissionSelectorDialogComponent_Template_textarea_ngModelChange_83_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.reason, $event) || (ctx.reason = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(84, "mat-icon", 47);
      \u0275\u0275text(85, "edit_note");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(86, "mat-dialog-actions", 48)(87, "div", 49)(88, "div", 50)(89, "div", 51)(90, "mat-icon", 28);
      \u0275\u0275text(91, "info");
      \u0275\u0275elementEnd();
      \u0275\u0275text(92, " S\u1EBD th\u1EF1c hi\u1EC7n ");
      \u0275\u0275elementStart(93, "strong", 31);
      \u0275\u0275text(94);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(95, "strong", 52);
      \u0275\u0275text(96);
      \u0275\u0275elementEnd();
      \u0275\u0275text(97, " quy\u1EC1n ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(98, "div", 39)(99, "button", 53);
      \u0275\u0275listener("click", function PermissionSelectorDialogComponent_Template_button_click_99_listener() {
        return ctx.onCancel();
      });
      \u0275\u0275elementStart(100, "mat-icon", 54);
      \u0275\u0275text(101, "close");
      \u0275\u0275elementEnd();
      \u0275\u0275text(102, " H\u1EE7y b\u1ECF ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(103, "button", 55);
      \u0275\u0275listener("click", function PermissionSelectorDialogComponent_Template_button_click_103_listener() {
        return ctx.onConfirm();
      });
      \u0275\u0275elementStart(104, "mat-icon", 54);
      \u0275\u0275text(105);
      \u0275\u0275elementEnd();
      \u0275\u0275text(106);
      \u0275\u0275template(107, PermissionSelectorDialogComponent_Conditional_107_Template, 2, 1, "span", 56);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(18);
      \u0275\u0275twoWayProperty("ngModel", ctx.grantType);
      \u0275\u0275advance(10);
      \u0275\u0275twoWayProperty("ngModel", ctx.grantType);
      \u0275\u0275advance(11);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchTerm);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.searchTerm ? 42 : -1);
      \u0275\u0275advance(14);
      \u0275\u0275textInterpolate(ctx.selectedPermissions().length);
      \u0275\u0275advance(6);
      \u0275\u0275property("checked", ctx.isAllSelected())("indeterminate", ctx.isAllIndeterminate());
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate2(" ", ctx.selectedPermissions().length, "/", ctx.filteredPermissions().length, " \u0111\xE3 ch\u1ECDn ");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.filteredPermissions().length, " quy\u1EC1n ");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.filteredPermissions().length === 0 ? 74 : 75);
      \u0275\u0275advance(9);
      \u0275\u0275twoWayProperty("ngModel", ctx.reason);
      \u0275\u0275advance(11);
      \u0275\u0275textInterpolate(ctx.grantType === "grant" ? "c\u1EA5p" : "thu h\u1ED3i");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.selectedPermissions().length);
      \u0275\u0275advance(7);
      \u0275\u0275property("disabled", ctx.selectedPermissions().length === 0);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.grantType === "grant" ? "check_circle" : "cancel", " ");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.grantType === "grant" ? "C\u1EA5p Quy\u1EC1n" : "Thu H\u1ED3i", " ");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.selectedPermissions().length > 0 ? 107 : -1);
    }
  }, dependencies: [
    CommonModule,
    FormsModule,
    DefaultValueAccessor,
    RadioControlValueAccessor,
    NgControlStatus,
    NgModel,
    MatDialogModule,
    MatDialogTitle,
    MatDialogActions,
    MatDialogContent,
    MatButtonModule,
    MatButton,
    MatIconButton,
    MatIconModule,
    MatIcon,
    MatCheckboxModule,
    MatCheckbox,
    MatFormFieldModule,
    MatFormField,
    MatPrefix,
    MatSuffix,
    MatInputModule,
    MatInput,
    MatSelectModule,
    MatChipsModule,
    MatDividerModule,
    MatTooltipModule,
    MatTooltip
  ], styles: ['\n\n.peer[_ngcontent-%COMP%]:checked    ~ label[_ngcontent-%COMP%] {\n  transform: scale(1.02);\n}\n.peer[_ngcontent-%COMP%]:checked    ~ label[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  top: 8px;\n  right: 8px;\n  width: 20px;\n  height: 20px;\n  background: currentColor;\n  border-radius: 50%;\n  opacity: 0.1;\n}\n.transition-all[_ngcontent-%COMP%] {\n  transition-property: all;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 200ms;\n}\n.mat-mdc-checkbox.mat-primary[_ngcontent-%COMP%]   .mdc-checkbox__native-control[_ngcontent-%COMP%]:enabled    ~ .mdc-checkbox__background[_ngcontent-%COMP%]   .mdc-checkbox__checkmark[_ngcontent-%COMP%] {\n  color: white;\n}\n.hover\\:bg-blue-25[_ngcontent-%COMP%]:hover {\n  background-color: rgb(239, 246, 255);\n}\n.hover\\:bg-green-25[_ngcontent-%COMP%]:hover {\n  background-color: rgb(240, 253, 244);\n}\n.hover\\:bg-red-25[_ngcontent-%COMP%]:hover {\n  background-color: rgb(254, 242, 242);\n}\n.overflow-y-auto[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 8px;\n}\n.overflow-y-auto[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: #f1f5f9;\n  border-radius: 4px;\n}\n.overflow-y-auto[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: #cbd5e1;\n  border-radius: 4px;\n}\n.overflow-y-auto[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background: #94a3b8;\n}\n.animate-fade-in[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeIn 0.3s ease-in-out;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(-4px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.bg-gradient-to-r[_ngcontent-%COMP%] {\n  background: linear-gradient(to right, var(--tw-gradient-stops));\n}\n.mat-mdc-form-field[_ngcontent-%COMP%]:focus-within {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n}\n.mat-mdc-raised-button[_ngcontent-%COMP%] {\n  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);\n}\n.mat-mdc-raised-button[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);\n  transform: translateY(-1px);\n}\n.permission-item[_ngcontent-%COMP%] {\n  transition: all 0.2s ease-in-out;\n}\n.permission-item[_ngcontent-%COMP%]:hover {\n  transform: translateX(4px);\n}\n.permission-item.selected[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      rgba(59, 130, 246, 0.05) 0%,\n      rgba(147, 197, 253, 0.1) 100%);\n}\n.line-clamp-2[_ngcontent-%COMP%] {\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.mat-mdc-checkbox[_ngcontent-%COMP%] {\n  --mdc-checkbox-state-layer-size: 48px;\n}\n.mat-mdc-checkbox[_ngcontent-%COMP%]:hover   .mdc-checkbox__ripple[_ngcontent-%COMP%] {\n  background: rgba(59, 130, 246, 0.1);\n}\n.group[_ngcontent-%COMP%]:hover   .opacity-0[_ngcontent-%COMP%] {\n  opacity: 1 !important;\n}\n.permission-row[_ngcontent-%COMP%] {\n  position: relative;\n}\n.permission-row[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  width: 0;\n  background:\n    linear-gradient(\n      90deg,\n      rgba(59, 130, 246, 0.1) 0%,\n      transparent 100%);\n  transition: width 0.3s ease;\n}\n.permission-row[_ngcontent-%COMP%]:hover::before {\n  width: 100%;\n}\n.status-badge[_ngcontent-%COMP%] {\n  -webkit-backdrop-filter: blur(10px);\n  backdrop-filter: blur(10px);\n  background: rgba(255, 255, 255, 0.9);\n}\n.border-l-blue-500[_ngcontent-%COMP%] {\n  border-left-width: 4px;\n  border-left-color: rgb(59, 130, 246);\n}\n@media (max-width: 640px) {\n  [_nghost-%COMP%] {\n    max-width: 95vw;\n  }\n  .permission-item[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .grid-cols-2[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=permission-selector-dialog.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PermissionSelectorDialogComponent, { className: "PermissionSelectorDialogComponent", filePath: "src/app/admin/user-permission/permission-selector-dialog.component.ts", lineNumber: 538 });
})();

// src/app/admin/user-permission/user-permission-overview.component.ts
var _forTrack03 = ($index, $item) => $item.id;
function UserPermissionOverviewComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 4);
  }
}
function UserPermissionOverviewComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275element(1, "mat-spinner", 10);
    \u0275\u0275elementStart(2, "p", 11);
    \u0275\u0275text(3, "\u0110ang t\u1EA3i th\xF4ng tin quy\u1EC1n...");
    \u0275\u0275elementEnd()();
  }
}
function UserPermissionOverviewComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7)(1, "mat-icon", 12);
    \u0275\u0275text(2, "error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 13);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 14);
    \u0275\u0275listener("click", function UserPermissionOverviewComponent_Conditional_12_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.loadPermissionData());
    });
    \u0275\u0275elementStart(6, "mat-icon");
    \u0275\u0275text(7, "refresh");
    \u0275\u0275elementEnd();
    \u0275\u0275text(8, " Th\u1EED l\u1EA1i ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.error());
  }
}
function UserPermissionOverviewComponent_Conditional_13_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 58);
    \u0275\u0275text(1, "groups");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " Roles & Nh\xF3m Quy\u1EC1n ");
  }
}
function UserPermissionOverviewComponent_Conditional_13_app_user_roles_info_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-user-roles-info", 59);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("user", ctx_r1.user());
  }
}
function UserPermissionOverviewComponent_Conditional_13_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 58);
    \u0275\u0275text(1, "dashboard");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " T\u1ED5ng Quan ");
  }
}
function UserPermissionOverviewComponent_Conditional_13_Conditional_37_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 60);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const perm_r4 = ctx.$implicit;
    \u0275\u0275property("title", perm_r4.description || perm_r4.name);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", perm_r4.name, " ");
  }
}
function UserPermissionOverviewComponent_Conditional_13_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 36);
    \u0275\u0275repeaterCreate(1, UserPermissionOverviewComponent_Conditional_13_Conditional_37_For_2_Template, 2, 2, "span", 60, _forTrack03);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.currentSummary().rolePermissions);
  }
}
function UserPermissionOverviewComponent_Conditional_13_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 37);
    \u0275\u0275text(1, "Kh\xF4ng c\xF3 quy\u1EC1n t\u1EEB roles");
    \u0275\u0275elementEnd();
  }
}
function UserPermissionOverviewComponent_Conditional_13_Conditional_46_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 61);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const perm_r5 = ctx.$implicit;
    \u0275\u0275property("title", perm_r5.description || perm_r5.name);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", perm_r5.name, " ");
  }
}
function UserPermissionOverviewComponent_Conditional_13_Conditional_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 36);
    \u0275\u0275repeaterCreate(1, UserPermissionOverviewComponent_Conditional_13_Conditional_46_For_2_Template, 2, 2, "span", 61, _forTrack03);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.currentSummary().effectivePermissions);
  }
}
function UserPermissionOverviewComponent_Conditional_13_Conditional_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "mat-icon", 62);
    \u0275\u0275text(2, "block");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 63);
    \u0275\u0275text(4, "Ng\u01B0\u1EDDi d\xF9ng kh\xF4ng c\xF3 quy\u1EC1n n\xE0o");
    \u0275\u0275elementEnd()();
  }
}
function UserPermissionOverviewComponent_Conditional_13_ng_template_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 58);
    \u0275\u0275text(1, "settings");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " Qu\u1EA3n L\xFD ");
  }
}
function UserPermissionOverviewComponent_Conditional_13_Conditional_61_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 64)(1, "span", 24);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 65);
    \u0275\u0275listener("click", function UserPermissionOverviewComponent_Conditional_13_Conditional_61_For_2_Template_button_click_3_listener() {
      const up_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.revokePermission(up_r7));
    });
    \u0275\u0275elementStart(4, "mat-icon", 5);
    \u0275\u0275text(5, "close");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const up_r7 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(up_r7.permission.name);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.isUpdatingPermission());
  }
}
function UserPermissionOverviewComponent_Conditional_13_Conditional_61_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 36);
    \u0275\u0275repeaterCreate(1, UserPermissionOverviewComponent_Conditional_13_Conditional_61_For_2_Template, 6, 2, "div", 64, _forTrack03);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.currentSummary().userGranted);
  }
}
function UserPermissionOverviewComponent_Conditional_13_Conditional_62_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 45);
    \u0275\u0275text(1, "Ch\u01B0a c\xF3 quy\u1EC1n n\xE0o \u0111\u01B0\u1EE3c c\u1EA5p ri\xEAng");
    \u0275\u0275elementEnd();
  }
}
function UserPermissionOverviewComponent_Conditional_13_Conditional_72_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 66)(1, "span", 27);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 67);
    \u0275\u0275listener("click", function UserPermissionOverviewComponent_Conditional_13_Conditional_72_For_2_Template_button_click_3_listener() {
      const up_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.restorePermission(up_r9));
    });
    \u0275\u0275elementStart(4, "mat-icon", 5);
    \u0275\u0275text(5, "refresh");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const up_r9 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(up_r9.permission.name);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.isUpdatingPermission());
  }
}
function UserPermissionOverviewComponent_Conditional_13_Conditional_72_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 36);
    \u0275\u0275repeaterCreate(1, UserPermissionOverviewComponent_Conditional_13_Conditional_72_For_2_Template, 6, 2, "div", 66, _forTrack03);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.currentSummary().userDenied);
  }
}
function UserPermissionOverviewComponent_Conditional_13_Conditional_73_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 50);
    \u0275\u0275text(1, "Kh\xF4ng c\xF3 quy\u1EC1n n\xE0o b\u1ECB t\u1EEB ch\u1ED1i");
    \u0275\u0275elementEnd();
  }
}
function UserPermissionOverviewComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-tab-group", 8)(1, "mat-tab");
    \u0275\u0275template(2, UserPermissionOverviewComponent_Conditional_13_ng_template_2_Template, 3, 0, "ng-template", 15);
    \u0275\u0275elementStart(3, "div", 16);
    \u0275\u0275template(4, UserPermissionOverviewComponent_Conditional_13_app_user_roles_info_4_Template, 1, 1, "app-user-roles-info", 17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "mat-tab");
    \u0275\u0275template(6, UserPermissionOverviewComponent_Conditional_13_ng_template_6_Template, 3, 0, "ng-template", 15);
    \u0275\u0275elementStart(7, "div", 16)(8, "div", 18)(9, "div", 19)(10, "div", 20);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 21);
    \u0275\u0275text(13, "T\u1EEB Roles");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 22)(15, "div", 23);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 24);
    \u0275\u0275text(18, "\u0110\u01B0\u1EE3c C\u1EA5p");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 25)(20, "div", 26);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div", 27);
    \u0275\u0275text(23, "B\u1ECB T\u1EEB Ch\u1ED1i");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "div", 28)(25, "div", 29);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "div", 30);
    \u0275\u0275text(28, "Cu\u1ED1i C\xF9ng");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(29, "div", 31)(30, "mat-expansion-panel", 32)(31, "mat-expansion-panel-header")(32, "mat-panel-title", 33)(33, "mat-icon", 34);
    \u0275\u0275text(34, "groups");
    \u0275\u0275elementEnd();
    \u0275\u0275text(35);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "div", 35);
    \u0275\u0275template(37, UserPermissionOverviewComponent_Conditional_13_Conditional_37_Template, 3, 0, "div", 36)(38, UserPermissionOverviewComponent_Conditional_13_Conditional_38_Template, 2, 0, "p", 37);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(39, "mat-expansion-panel", 38)(40, "mat-expansion-panel-header")(41, "mat-panel-title", 33)(42, "mat-icon", 39);
    \u0275\u0275text(43, "verified_user");
    \u0275\u0275elementEnd();
    \u0275\u0275text(44);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(45, "div", 35);
    \u0275\u0275template(46, UserPermissionOverviewComponent_Conditional_13_Conditional_46_Template, 3, 0, "div", 36)(47, UserPermissionOverviewComponent_Conditional_13_Conditional_47_Template, 5, 0, "div", 9);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(48, "mat-tab");
    \u0275\u0275template(49, UserPermissionOverviewComponent_Conditional_13_ng_template_49_Template, 3, 0, "ng-template", 15);
    \u0275\u0275elementStart(50, "div", 16)(51, "div", 31)(52, "div", 40)(53, "div", 41)(54, "div", 33)(55, "mat-icon", 42);
    \u0275\u0275text(56, "add_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(57, "h3", 43);
    \u0275\u0275text(58, "Quy\u1EC1n \u0110\u01B0\u1EE3c C\u1EA5p Ri\xEAng");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(59, "span", 44);
    \u0275\u0275text(60);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(61, UserPermissionOverviewComponent_Conditional_13_Conditional_61_Template, 3, 0, "div", 36)(62, UserPermissionOverviewComponent_Conditional_13_Conditional_62_Template, 2, 0, "p", 45);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(63, "div", 46)(64, "div", 41)(65, "div", 33)(66, "mat-icon", 47);
    \u0275\u0275text(67, "remove_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(68, "h3", 48);
    \u0275\u0275text(69, "Quy\u1EC1n B\u1ECB T\u1EEB Ch\u1ED1i");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(70, "span", 49);
    \u0275\u0275text(71);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(72, UserPermissionOverviewComponent_Conditional_13_Conditional_72_Template, 3, 0, "div", 36)(73, UserPermissionOverviewComponent_Conditional_13_Conditional_73_Template, 2, 0, "p", 50);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(74, "div", 51)(75, "div", 52)(76, "mat-icon", 53);
    \u0275\u0275text(77, "add_task");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(78, "h3", 54);
    \u0275\u0275text(79, "C\u1EA5p Quy\u1EC1n M\u1EDBi");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(80, "div", 55)(81, "p", 56);
    \u0275\u0275text(82, "Ch\u1ECDn quy\u1EC1n \u0111\u1EC3 c\u1EA5p ri\xEAng cho ng\u01B0\u1EDDi d\xF9ng n\xE0y (override quy\u1EC1n t\u1EEB roles)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(83, "button", 57);
    \u0275\u0275listener("click", function UserPermissionOverviewComponent_Conditional_13_Template_button_click_83_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openPermissionSelector());
    });
    \u0275\u0275elementStart(84, "mat-icon");
    \u0275\u0275text(85, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(86, " Th\xEAm Quy\u1EC1n ");
    \u0275\u0275elementEnd()()()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r1.user());
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r1.currentSummary().totalRolePermissions);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.currentSummary().grantedPermissions);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.currentSummary().deniedPermissions);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.currentSummary().effectivePermissions.length);
    \u0275\u0275advance(4);
    \u0275\u0275property("expanded", true);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" Quy\u1EC1n t\u1EEB Roles (", ctx_r1.currentSummary().rolePermissions.length, ") ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.currentSummary().rolePermissions.length > 0 ? 37 : 38);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1(" Quy\u1EC1n Cu\u1ED1i C\xF9ng (", ctx_r1.currentSummary().effectivePermissions.length, ") ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.currentSummary().effectivePermissions.length > 0 ? 46 : 47);
    \u0275\u0275advance(14);
    \u0275\u0275textInterpolate1(" ", ctx_r1.currentSummary().userGranted.length, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.currentSummary().userGranted.length > 0 ? 61 : 62);
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate1(" ", ctx_r1.currentSummary().userDenied.length, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.currentSummary().userDenied.length > 0 ? 72 : 73);
    \u0275\u0275advance(11);
    \u0275\u0275property("disabled", ctx_r1.isUpdatingPermission());
  }
}
function UserPermissionOverviewComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "mat-icon", 62);
    \u0275\u0275text(2, "info");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 63);
    \u0275\u0275text(4, "Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u quy\u1EC1n");
    \u0275\u0275elementEnd()();
  }
}
var UserPermissionOverviewComponent = class _UserPermissionOverviewComponent {
  userPermissionService = inject(UserPermissionDetailsService);
  userPermissionGraphQLService = inject(UserPermissionGraphQLService);
  dialog = inject(MatDialog);
  snackBar = inject(MatSnackBar);
  userId = input.required();
  user = input();
  isLoading = signal(false);
  isUpdatingPermission = signal(false);
  summary = signal(null);
  error = signal(null);
  availablePermissions = signal([]);
  // Computed signal để dễ access trong template
  currentSummary = computed(() => this.summary());
  constructor() {
    effect(() => {
      const id = this.userId();
      if (id && id !== "new") {
        this.error.set(null);
        this.summary.set(null);
        setTimeout(() => {
          this.loadPermissionData();
          this.loadAvailablePermissions();
        }, 0);
      } else {
        this.summary.set(null);
        this.error.set(null);
      }
    });
  }
  loadPermissionData() {
    return __async(this, null, function* () {
      const userId = this.userId();
      if (!userId || userId === "new") {
        this.summary.set(null);
        this.error.set(null);
        return;
      }
      this.isLoading.set(true);
      this.error.set(null);
      try {
        const userDetails = yield new Promise((resolve, reject) => {
          this.userPermissionService.getUserPermissionDetails(userId).subscribe({
            next: (data) => resolve(data),
            error: (error) => reject(error)
          });
        });
        if (userDetails) {
          const summaryData = this.userPermissionService.getPermissionSummary(userDetails);
          this.summary.set(summaryData);
          this.error.set(null);
        } else {
          this.summary.set(null);
          this.error.set("Kh\xF4ng t\xECm th\u1EA5y d\u1EEF li\u1EC7u ng\u01B0\u1EDDi d\xF9ng");
        }
      } catch (error) {
        console.error("Error loading permission data:", error);
        this.summary.set(null);
        this.error.set("L\u1ED7i khi t\u1EA3i th\xF4ng tin quy\u1EC1n. Vui l\xF2ng th\u1EED l\u1EA1i.");
      } finally {
        this.isLoading.set(false);
      }
    });
  }
  loadAvailablePermissions() {
    return __async(this, null, function* () {
      try {
        const permissions = yield new Promise((resolve, reject) => {
          this.userPermissionService.getAllPermissions().subscribe({
            next: (data) => resolve(data),
            error: (error) => reject(error)
          });
        });
        this.availablePermissions.set(permissions);
      } catch (error) {
        console.error("Error loading available permissions:", error);
      }
    });
  }
  revokePermission(userPermission) {
    return __async(this, null, function* () {
      if (!userPermission || this.isUpdatingPermission())
        return;
      this.isUpdatingPermission.set(true);
      try {
        yield this.userPermissionGraphQLService.updateUserPermission(userPermission.id, {
          isGranted: false,
          grantedBy: "system",
          reason: "Revoked by admin"
        });
        yield this.loadPermissionData();
      } catch (error) {
        console.error("Error revoking permission:", error);
        this.error.set("L\u1ED7i khi thu h\u1ED3i quy\u1EC1n");
      } finally {
        this.isUpdatingPermission.set(false);
      }
    });
  }
  restorePermission(userPermission) {
    return __async(this, null, function* () {
      if (!userPermission || this.isUpdatingPermission())
        return;
      this.isUpdatingPermission.set(true);
      try {
        yield this.userPermissionGraphQLService.updateUserPermission(userPermission.id, {
          isGranted: true,
          grantedBy: "system",
          reason: "Restored by admin"
        });
        yield this.loadPermissionData();
      } catch (error) {
        console.error("Error restoring permission:", error);
        this.error.set("L\u1ED7i khi kh\xF4i ph\u1EE5c quy\u1EC1n");
      } finally {
        this.isUpdatingPermission.set(false);
      }
    });
  }
  openPermissionSelector() {
    const currentSummary = this.summary();
    if (!currentSummary || this.isUpdatingPermission())
      return;
    const dialogRef = this.dialog.open(PermissionSelectorDialogComponent, {
      width: "90vw",
      maxHeight: "90vh",
      data: {
        availablePermissions: this.availablePermissions(),
        currentUserPermissions: currentSummary.userGranted.concat(currentSummary.userDenied),
        currentRolePermissions: currentSummary.rolePermissions
      }
    });
    dialogRef.afterClosed().subscribe((result) => __async(this, null, function* () {
      if (result && result.selectedPermissions.length > 0) {
        yield this.processPermissionChanges(result);
      }
    }));
  }
  processPermissionChanges(result) {
    return __async(this, null, function* () {
      if (this.isUpdatingPermission())
        return;
      this.isUpdatingPermission.set(true);
      const userId = this.userId();
      let successCount = 0;
      let errorCount = 0;
      try {
        for (const permission of result.selectedPermissions) {
          try {
            const existingUserPerm = this.summary()?.userGranted.concat(this.summary()?.userDenied || []).find((up) => up.permission.id === permission.id);
            if (existingUserPerm) {
              yield this.userPermissionGraphQLService.updateUserPermission(existingUserPerm.id, {
                isGranted: result.grantType === "grant",
                grantedBy: "admin",
                reason: result.reason
              });
            } else {
              yield this.userPermissionGraphQLService.assignPermissionToUser({
                userId,
                permissionId: permission.id,
                isGranted: result.grantType === "grant",
                grantedBy: "admin",
                reason: result.reason
              });
            }
            successCount++;
          } catch (error) {
            console.error(`Error processing permission ${permission.name}:`, error);
            errorCount++;
          }
        }
        const action = result.grantType === "grant" ? "c\u1EA5p" : "t\u1EEB ch\u1ED1i";
        if (successCount > 0) {
          this.snackBar.open(`\u0110\xE3 ${action} ${successCount} quy\u1EC1n th\xE0nh c\xF4ng${errorCount > 0 ? `, ${errorCount} l\u1ED7i` : ""}`, "\u0110\xF3ng", { duration: 5e3 });
        } else if (errorCount > 0) {
          this.snackBar.open(`L\u1ED7i khi ${action} quy\u1EC1n`, "\u0110\xF3ng", { duration: 5e3 });
        }
        yield this.loadPermissionData();
      } finally {
        this.isUpdatingPermission.set(false);
      }
    });
  }
  static \u0275fac = function UserPermissionOverviewComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UserPermissionOverviewComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UserPermissionOverviewComponent, selectors: [["app-user-permission-overview"]], inputs: { userId: [1, "userId"], user: [1, "user"] }, decls: 15, vars: 2, consts: [[1, "permission-overview"], [1, "permission-main-card"], [1, "text-lg", "font-medium", "flex", "items-center"], [1, "mr-2", "text-indigo-500"], ["diameter", "16", 1, "ml-2"], [1, "text-sm"], [1, "text-center", "py-8"], [1, "text-center", "py-8", "text-red-500"], ["animationDuration", "300ms"], [1, "text-center", "py-8", "text-gray-500"], ["diameter", "48"], [1, "mt-4", "text-gray-600"], [1, "text-4xl", "text-red-400"], [1, "mt-2", "font-medium"], ["mat-raised-button", "", "color", "primary", 1, "mt-4", 3, "click"], ["mat-tab-label", ""], [1, "py-4"], [3, "user", 4, "ngIf"], [1, "grid", "grid-cols-2", "md:grid-cols-4", "gap-4", "mb-6"], [1, "text-center", "p-4", "bg-blue-50", "rounded-lg", "border", "border-blue-200"], [1, "text-2xl", "font-bold", "text-blue-600"], [1, "text-sm", "text-blue-800", "font-medium"], [1, "text-center", "p-4", "bg-green-50", "rounded-lg", "border", "border-green-200"], [1, "text-2xl", "font-bold", "text-green-600"], [1, "text-sm", "text-green-800", "font-medium"], [1, "text-center", "p-4", "bg-red-50", "rounded-lg", "border", "border-red-200"], [1, "text-2xl", "font-bold", "text-red-600"], [1, "text-sm", "text-red-800", "font-medium"], [1, "text-center", "p-4", "bg-purple-50", "rounded-lg", "border", "border-purple-200"], [1, "text-2xl", "font-bold", "text-purple-600"], [1, "text-sm", "text-purple-800", "font-medium"], [1, "space-y-6"], [1, "permission-section", 3, "expanded"], [1, "flex", "items-center"], [1, "mr-2", "text-blue-500"], [1, "pt-4"], [1, "flex", "flex-wrap", "gap-2"], [1, "text-gray-500", "text-center", "py-4"], [1, "permission-section"], [1, "mr-2", "text-purple-500"], [1, "bg-green-50", "rounded-lg", "p-4", "border", "border-green-200"], [1, "flex", "items-center", "justify-between", "mb-4"], [1, "mr-2", "text-green-600"], [1, "text-lg", "font-medium", "text-green-800"], [1, "px-3", "py-1", "bg-green-200", "text-green-800", "rounded-full", "text-sm", "font-medium"], [1, "text-green-700", "text-center", "py-4"], [1, "bg-red-50", "rounded-lg", "p-4", "border", "border-red-200"], [1, "mr-2", "text-red-600"], [1, "text-lg", "font-medium", "text-red-800"], [1, "px-3", "py-1", "bg-red-200", "text-red-800", "rounded-full", "text-sm", "font-medium"], [1, "text-red-700", "text-center", "py-4"], [1, "bg-gray-50", "rounded-lg", "p-4", "border", "border-gray-200"], [1, "flex", "items-center", "mb-4"], [1, "mr-2", "text-gray-600"], [1, "text-lg", "font-medium", "text-gray-800"], [1, "space-y-3"], [1, "text-sm", "text-gray-600"], ["mat-raised-button", "", "color", "primary", 3, "click", "disabled"], [1, "mr-2"], [3, "user"], [1, "px-3", "py-1", "text-sm", "bg-blue-100", "text-blue-800", "rounded-full", "border", "border-blue-200", 3, "title"], [1, "px-3", "py-1", "text-sm", "bg-purple-100", "text-purple-800", "rounded-full", "border", "border-purple-200", "font-medium", 3, "title"], [1, "text-4xl", "text-gray-400"], [1, "mt-2"], [1, "flex", "items-center", "bg-white", "rounded-lg", "px-3", "py-2", "border", "border-green-300"], ["mat-icon-button", "", "color", "warn", "title", "Thu h\u1ED3i quy\u1EC1n", 1, "ml-2", "w-6", "h-6", 3, "click", "disabled"], [1, "flex", "items-center", "bg-white", "rounded-lg", "px-3", "py-2", "border", "border-red-300"], ["mat-icon-button", "", "color", "primary", "title", "Kh\xF4i ph\u1EE5c quy\u1EC1n", 1, "ml-2", "w-6", "h-6", 3, "click", "disabled"]], template: function UserPermissionOverviewComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "mat-card", 1)(2, "mat-card-header")(3, "mat-card-title", 2)(4, "mat-icon", 3);
      \u0275\u0275text(5, "admin_panel_settings");
      \u0275\u0275elementEnd();
      \u0275\u0275text(6, " Qu\u1EA3n L\xFD Quy\u1EC1n H\u1EA1n ");
      \u0275\u0275template(7, UserPermissionOverviewComponent_Conditional_7_Template, 1, 0, "mat-spinner", 4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "mat-card-subtitle", 5);
      \u0275\u0275text(9, " T\xF3m t\u1EAFt v\xE0 qu\u1EA3n l\xFD quy\u1EC1n chi ti\u1EBFt cho ng\u01B0\u1EDDi d\xF9ng ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "mat-card-content");
      \u0275\u0275template(11, UserPermissionOverviewComponent_Conditional_11_Template, 4, 0, "div", 6)(12, UserPermissionOverviewComponent_Conditional_12_Template, 9, 1, "div", 7)(13, UserPermissionOverviewComponent_Conditional_13_Template, 87, 15, "mat-tab-group", 8)(14, UserPermissionOverviewComponent_Conditional_14_Template, 5, 0, "div", 9);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275conditional(ctx.isLoading() ? 7 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.isLoading() ? 11 : ctx.error() ? 12 : ctx.currentSummary() ? 13 : 14);
    }
  }, dependencies: [
    CommonModule,
    NgIf,
    MatCardModule,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatIconModule,
    MatIcon,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatProgressSpinner,
    MatButtonModule,
    MatButton,
    MatIconButton,
    MatDividerModule,
    MatExpansionModule,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatTabsModule,
    MatTabLabel,
    MatTab,
    MatTabGroup,
    MatDialogModule,
    UserRolesInfoComponent
  ], styles: ["\n\n.permission-overview[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.permission-main-card[_ngcontent-%COMP%] {\n  border-left: 4px solid #4f46e5;\n  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);\n}\n.permission-section[_ngcontent-%COMP%] {\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n}\n.permission-section[_ngcontent-%COMP%]   mat-expansion-panel-header[_ngcontent-%COMP%] {\n  background-color: #f8fafc;\n}\n  .mat-mdc-tab-group .mat-mdc-tab-header {\n  border-bottom: 2px solid #e2e8f0;\n}\n/*# sourceMappingURL=user-permission-overview.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UserPermissionOverviewComponent, { className: "UserPermissionOverviewComponent", filePath: "src/app/admin/user-permission/user-permission-overview.component.ts", lineNumber: 318 });
})();

// src/app/admin/user/detailuser/detailuser.component.ts
function DetailUserComponent_button_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 3);
    \u0275\u0275listener("click", function DetailUserComponent_button_7_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.handleUserAction());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "save");
    \u0275\u0275elementEnd()();
  }
}
function DetailUserComponent_button_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 3);
    \u0275\u0275listener("click", function DetailUserComponent_button_8_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleEdit());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "edit");
    \u0275\u0275elementEnd()();
  }
}
function DetailUserComponent_button_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 10);
    \u0275\u0275listener("click", function DetailUserComponent_button_9_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleDelete());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "delete");
    \u0275\u0275elementEnd()();
  }
}
function DetailUserComponent_ng_container_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 11)(2, "div", 12);
    \u0275\u0275text(3, "B\u1EA1n ch\u1EAFc ch\u1EAFn mu\u1ED1n xo\xE1 kh\xF4ng?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 13)(5, "button", 14);
    \u0275\u0275listener("click", function DetailUserComponent_ng_container_11_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.DeleteData());
    });
    \u0275\u0275text(6, "\u0110\u1ED3ng \xDD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 15);
    \u0275\u0275listener("click", function DetailUserComponent_ng_container_11_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleDelete());
    });
    \u0275\u0275text(8, "Hu\u1EF7 B\u1ECF");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementContainerEnd();
  }
}
function DetailUserComponent_ng_container_12_Conditional_25_For_2_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 40);
    \u0275\u0275text(1, "refresh");
    \u0275\u0275elementEnd();
  }
}
function DetailUserComponent_ng_container_12_Conditional_25_For_2_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-icon", 42);
    \u0275\u0275listener("click", function DetailUserComponent_ng_container_12_Conditional_25_For_2_Conditional_6_Template_mat_icon_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const item_r8 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.handleRemoveRole(item_r8));
    });
    \u0275\u0275text(1, " close ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275styleProp("cursor", "pointer");
  }
}
function DetailUserComponent_ng_container_12_Conditional_25_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-chip-listbox")(1, "mat-chip-option", 37)(2, "div", 38)(3, "span", 39);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, DetailUserComponent_ng_container_12_Conditional_25_For_2_Conditional_5_Template, 2, 0, "mat-icon", 40)(6, DetailUserComponent_ng_container_12_Conditional_25_For_2_Conditional_6_Template, 2, 2, "mat-icon", 41);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r8 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275classProp("opacity-50", ctx_r1.isRemovingRole());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate((item_r8 == null ? null : item_r8.role == null ? null : item_r8.role.name) || (item_r8 == null ? null : item_r8.name));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isRemovingRole() ? 5 : ctx_r1.isEdit() ? 6 : -1);
  }
}
function DetailUserComponent_ng_container_12_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 25);
    \u0275\u0275repeaterCreate(1, DetailUserComponent_ng_container_12_Conditional_25_For_2_Template, 7, 4, "mat-chip-listbox", null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.DetailUser().roles);
  }
}
function DetailUserComponent_ng_container_12_Conditional_26_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "button", 45)(1, "mat-icon");
    \u0275\u0275text(2, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Th\xEAm nh\xF3m \u0111\u1EA7u ti\xEAn ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275nextContext(2);
    const menu_r9 = \u0275\u0275reference(28);
    \u0275\u0275property("matMenuTriggerFor", menu_r9);
  }
}
function DetailUserComponent_ng_container_12_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26)(1, "mat-icon", 43);
    \u0275\u0275text(2, "group_off");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 44);
    \u0275\u0275text(4, "Ch\u01B0a c\xF3 nh\xF3m quy\u1EC1n n\xE0o");
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, DetailUserComponent_ng_container_12_Conditional_26_Conditional_5_Template, 4, 1, "button", 45);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(ctx_r1.isEdit() ? 5 : -1);
  }
}
function DetailUserComponent_ng_container_12_For_37_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 46);
    \u0275\u0275listener("click", function DetailUserComponent_ng_container_12_For_37_Template_button_click_0_listener() {
      const item_r11 = \u0275\u0275restoreView(_r10).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.handleAddRole(item_r11));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r11 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r11.name);
  }
}
function DetailUserComponent_ng_container_12_div_41_app_user_permission_overview_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-user-permission-overview", 51);
  }
  if (rf & 2) {
    let tmp_5_0;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("userId", (tmp_5_0 = ctx_r1.DetailUser()) == null ? null : tmp_5_0.id)("user", ctx_r1.DetailUser());
  }
}
function DetailUserComponent_ng_container_12_div_41_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 52)(1, "mat-icon", 53);
    \u0275\u0275text(2, "refresh");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 54);
    \u0275\u0275text(4, "\u0110ang t\u1EA3i th\xF4ng tin quy\u1EC1n...");
    \u0275\u0275elementEnd()();
  }
}
function DetailUserComponent_ng_container_12_div_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 47)(1, "div", 48);
    \u0275\u0275template(2, DetailUserComponent_ng_container_12_div_41_app_user_permission_overview_2_Template, 1, 2, "app-user-permission-overview", 49)(3, DetailUserComponent_ng_container_12_div_41_div_3_Template, 5, 0, "div", 50);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_4_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.DetailUser() && ((tmp_4_0 = ctx_r1.DetailUser()) == null ? null : tmp_4_0.id) && !ctx_r1.isLoading());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isLoading());
  }
}
function DetailUserComponent_ng_container_12_div_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 55)(1, "div", 56)(2, "div", 57)(3, "mat-icon", 58);
    \u0275\u0275text(4, "info");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 59);
    \u0275\u0275text(6, "L\u01B0u user tr\u01B0\u1EDBc \u0111\u1EC3 qu\u1EA3n l\xFD quy\u1EC1n \u0111\u1EB7c bi\u1EC7t");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 60);
    \u0275\u0275text(8, "Sau khi t\u1EA1o user, b\u1EA1n c\xF3 th\u1EC3 c\u1EA5p/thu h\u1ED3i quy\u1EC1n ri\xEAng");
    \u0275\u0275elementEnd()()()();
  }
}
function DetailUserComponent_ng_container_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 16)(2, "mat-form-field", 17)(3, "mat-label");
    \u0275\u0275text(4, "Email");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "input", 18);
    \u0275\u0275twoWayListener("ngModelChange", function DetailUserComponent_ng_container_12_Template_input_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailUser().email, $event) || (ctx_r1.DetailUser().email = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "mat-form-field", 17)(7, "mat-label");
    \u0275\u0275text(8, "H\u1ECD V\xE0 T\xEAn");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "input", 19);
    \u0275\u0275listener("input", function DetailUserComponent_ng_container_12_Template_input_input_9_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.updateUserName($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "mat-form-field", 17)(11, "mat-label");
    \u0275\u0275text(12, "S\u1ED1 \u0110i\u1EC7n Tho\u1EA1i");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "input", 20);
    \u0275\u0275twoWayListener("ngModelChange", function DetailUserComponent_ng_container_12_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailUser().SDT, $event) || (ctx_r1.DetailUser().SDT = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "mat-form-field", 17)(15, "mat-label");
    \u0275\u0275text(16, "M\u1EADt Kh\u1EA9u ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "input", 21);
    \u0275\u0275twoWayListener("ngModelChange", function DetailUserComponent_ng_container_12_Template_input_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailUser().password, $event) || (ctx_r1.DetailUser().password = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 22)(19, "button", 23, 0)(21, "mat-icon");
    \u0275\u0275text(22, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(23, " Th\xEAm Nh\xF3m ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div", 24);
    \u0275\u0275template(25, DetailUserComponent_ng_container_12_Conditional_25_Template, 3, 0, "div", 25)(26, DetailUserComponent_ng_container_12_Conditional_26_Template, 6, 1, "div", 26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "mat-menu", null, 1)(29, "div", 27);
    \u0275\u0275listener("click", function DetailUserComponent_ng_container_12_Template_div_click_29_listener($event) {
      \u0275\u0275restoreView(_r6);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(30, "div", 28)(31, "input", 29);
    \u0275\u0275listener("keyup", function DetailUserComponent_ng_container_12_Template_input_keyup_31_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.doFilterHederColumn($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "div", 30)(33, "span", 31);
    \u0275\u0275text(34, "search");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(35, "div", 32);
    \u0275\u0275repeaterCreate(36, DetailUserComponent_ng_container_12_For_37_Template, 2, 1, "button", 33, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "div", 34)(39, "button", 15);
    \u0275\u0275listener("click", function DetailUserComponent_ng_container_12_Template_button_click_39_listener() {
      \u0275\u0275restoreView(_r6);
      const menuTrigger_r12 = \u0275\u0275reference(20);
      return \u0275\u0275resetView(menuTrigger_r12.closeMenu());
    });
    \u0275\u0275text(40, "\u0110\xF3ng");
    \u0275\u0275elementEnd()()()()()();
    \u0275\u0275template(41, DetailUserComponent_ng_container_12_div_41_Template, 4, 2, "div", 35)(42, DetailUserComponent_ng_container_12_div_42_Template, 9, 0, "div", 36);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    let tmp_5_0;
    let tmp_15_0;
    let tmp_16_0;
    const menu_r9 = \u0275\u0275reference(28);
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailUser().email);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ((tmp_5_0 = ctx_r1.DetailUser()) == null ? null : tmp_5_0.name) || "")("disabled", !ctx_r1.isEdit());
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailUser().SDT);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailUser().password);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx_r1.isEdit() || ctx_r1.isAddingRole())("matMenuTriggerFor", menu_r9);
    \u0275\u0275advance(6);
    \u0275\u0275conditional(ctx_r1.DetailUser().roles && ctx_r1.DetailUser().roles.length > 0 ? 25 : 26);
    \u0275\u0275advance(11);
    \u0275\u0275repeater(ctx_r1.FilterRole());
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ((tmp_15_0 = ctx_r1.DetailUser()) == null ? null : tmp_15_0.id) && ((tmp_15_0 = ctx_r1.DetailUser()) == null ? null : tmp_15_0.id) !== "new");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ((tmp_16_0 = ctx_r1.DetailUser()) == null ? null : tmp_16_0.id) === "new");
  }
}
var DetailUserComponent = class _DetailUserComponent {
  _ListuserComponent = inject(ListUserComponent);
  _UserGraphQLService = inject(UserGraphQLService);
  _RoleGraphQLService = inject(RoleGraphQLService);
  _route = inject(ActivatedRoute);
  _router = inject(Router);
  _snackBar = inject(MatSnackBar);
  constructor() {
    this._route.paramMap.subscribe((params) => {
      const id = params.get("id");
      if (id === "new") {
        this.userId.set(id);
      } else if (id && !this._UserGraphQLService.currentUser()) {
        this.userId.set(id);
      }
    });
  }
  DetailUser = signal(null);
  isEdit = signal(false);
  isDelete = signal(false);
  isLoading = signal(false);
  isAddingRole = signal(false);
  isRemovingRole = signal(false);
  userId = signal(null);
  ListRole = signal([]);
  FilterRole = signal([]);
  getUserById(id) {
    return __async(this, null, function* () {
      try {
        const user = yield this._UserGraphQLService.getUserById(id);
        if (user) {
          this.DetailUser.set(__spreadProps(__spreadValues({}, user), {
            SDT: user.SDT || ""
          }));
        }
      } catch (error) {
        console.error("Error loading user:", error);
        this._snackBar.open("L\u1ED7i khi t\u1EA3i th\xF4ng tin ng\u01B0\u1EDDi d\xF9ng", "\u0110\xF3ng", { duration: 3e3 });
      }
    });
  }
  ngOnInit() {
    return __async(this, null, function* () {
      const id = this.userId();
      if (!id) {
        this._router.navigate(["/admin/user"]);
        this._ListuserComponent.drawer.close();
        return;
      }
      if (id === "new") {
        this.DetailUser.set({
          id: "new",
          email: "",
          password: "",
          SDT: "",
          name: "",
          isActive: true,
          roles: [],
          profile: {
            name: "",
            avatar: "",
            bio: ""
          }
        });
        this._ListuserComponent?.drawer?.open();
        this.isEdit.set(true);
      } else if (id) {
        try {
          yield this.getUserById(id);
          this._ListuserComponent?.drawer?.open();
          this._router.navigate(["/admin/user", id]);
        } catch (error) {
          console.error("Error loading user:", error);
          this._snackBar.open("L\u1ED7i khi t\u1EA3i th\xF4ng tin ng\u01B0\u1EDDi d\xF9ng", "\u0110\xF3ng", { duration: 3e3 });
          this._router.navigate(["/admin/user"]);
          return;
        }
      }
      try {
        yield this._RoleGraphQLService.loadAllRoles();
        this.ListRole.set(this._RoleGraphQLService.allRoles());
        this.updateFilterRole();
      } catch (error) {
        console.error("Error loading roles:", error);
      }
    });
  }
  updateFilterRole() {
    const allRoles = this.ListRole() || [];
    const currentUser = this.DetailUser();
    const userRoles = currentUser?.roles || [];
    if (allRoles.length === 0) {
      this.FilterRole.set([]);
      return;
    }
    const filteredRoles = allRoles.filter((role) => {
      if (!role || !role.id)
        return false;
      return !userRoles.some((userRole) => {
        if (!userRole)
          return false;
        return userRole.roleId === role.id || userRole.role?.id === role.id;
      });
    });
    this.FilterRole.set(filteredRoles);
  }
  updateUserName(event) {
    const value = event.target.value;
    const currentUser = this.DetailUser();
    if (currentUser) {
      currentUser.name = value;
      this.DetailUser.set(__spreadValues({}, currentUser));
    }
  }
  handleUserAction() {
    return __async(this, null, function* () {
      if (this.userId() === "new") {
        yield this.createUser();
      } else {
        yield this.updateUser();
      }
    });
  }
  createUser() {
    return __async(this, null, function* () {
      try {
        if (!this.DetailUser().password || this.DetailUser().password.trim() === "") {
          this._snackBar.open("Vui l\xF2ng nh\u1EADp password", "", {
            duration: 3e3,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-error"]
          });
          return;
        }
        if (!this.DetailUser().SDT || this.DetailUser().SDT.trim() === "") {
          this._snackBar.open("Vui l\xF2ng nh\u1EADp SDT", "", {
            duration: 3e3,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-error"]
          });
          return;
        }
        yield this._UserGraphQLService.createUser(this.DetailUser());
        this._snackBar.open("T\u1EA1o M\u1EDBi Th\xE0nh C\xF4ng", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        this.isEdit.update((value) => !value);
      } catch (error) {
        console.error("L\u1ED7i khi t\u1EA1o user:", error);
      }
    });
  }
  updateUser() {
    return __async(this, null, function* () {
      try {
        yield this._UserGraphQLService.updateUser(this.DetailUser().id, this.DetailUser());
        this._snackBar.open("C\u1EADp Nh\u1EADt Th\xE0nh C\xF4ng", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        this.isEdit.update((value) => !value);
      } catch (error) {
        console.error("L\u1ED7i khi c\u1EADp nh\u1EADt user:", error);
      }
    });
  }
  DeleteData() {
    return __async(this, null, function* () {
      try {
        yield this._UserGraphQLService.deleteUser(this.DetailUser().id);
        this._snackBar.open("X\xF3a Th\xE0nh C\xF4ng", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        this._router.navigate(["/admin/user"]);
      } catch (error) {
        console.error("L\u1ED7i khi x\xF3a user:", error);
      }
    });
  }
  FillSlug() {
    this.DetailUser.update((v) => {
      return __spreadProps(__spreadValues({}, v), {
        slug: convertToSlug(v.title)
      });
    });
  }
  doFilterHederColumn(event) {
    const allRoles = this.ListRole();
    this.FilterRole.set(allRoles.filter((v) => v.name.toLowerCase().includes(event.target.value.toLowerCase())));
  }
  handleAddRole(item) {
    return __async(this, null, function* () {
      if (!item || !item.id || this.isAddingRole()) {
        if (!item || !item.id) {
          this._snackBar.open("D\u1EEF li\u1EC7u vai tr\xF2 kh\xF4ng h\u1EE3p l\u1EC7", "", {
            duration: 3e3,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-error"]
          });
        }
        return;
      }
      this.isAddingRole.set(true);
      try {
        const userRoles = this.DetailUser()?.roles || [];
        const roleExists = userRoles.some((userRole) => userRole.roleId === item.id || userRole.role?.id === item.id);
        if (roleExists) {
          this._snackBar.open("Vai tr\xF2 \u0111\xE3 \u0111\u01B0\u1EE3c th\xEAm", "", {
            duration: 2e3,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-warning"]
          });
          return;
        }
        yield this._UserGraphQLService.assignRolesToUser(this.DetailUser().id, [item.id]);
        this.DetailUser.update((v) => {
          return __spreadProps(__spreadValues({}, v), {
            roles: [
              ...v.roles || [],
              {
                id: GenId(8, false),
                userId: this.DetailUser().id,
                roleId: item.id,
                role: item
              }
            ]
          });
        });
        this.updateFilterRole();
        this._snackBar.open("Th\xEAm vai tr\xF2 th\xE0nh c\xF4ng", "", {
          duration: 2e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
      } catch (error) {
        console.error("Error adding role:", error);
        this._snackBar.open("L\u1ED7i khi th\xEAm vai tr\xF2", "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      } finally {
        this.isAddingRole.set(false);
      }
    });
  }
  handleRemoveRole(item) {
    return __async(this, null, function* () {
      if (!item || this.isRemovingRole()) {
        if (!item) {
          this._snackBar.open("D\u1EEF li\u1EC7u vai tr\xF2 kh\xF4ng h\u1EE3p l\u1EC7", "", {
            duration: 3e3,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-error"]
          });
        }
        return;
      }
      this.isRemovingRole.set(true);
      try {
        const roleId = item.role?.id || item.roleId;
        if (!roleId) {
          this._snackBar.open("Kh\xF4ng th\u1EC3 x\xE1c \u0111\u1ECBnh ID vai tr\xF2", "", {
            duration: 3e3,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-error"]
          });
          return;
        }
        yield this._UserGraphQLService.removeRoleFromUser(this.DetailUser().id, roleId);
        this.DetailUser.update((v) => {
          return __spreadProps(__spreadValues({}, v), {
            roles: (v.roles || []).filter((r) => (r.role?.id || r.roleId) !== roleId)
          });
        });
        this.updateFilterRole();
        this._snackBar.open("X\xF3a vai tr\xF2 th\xE0nh c\xF4ng", "", {
          duration: 2e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
      } catch (error) {
        console.error("Error removing role:", error);
        this._snackBar.open("L\u1ED7i khi x\xF3a vai tr\xF2", "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      } finally {
        this.isRemovingRole.set(false);
      }
    });
  }
  goBack() {
    this._UserGraphQLService.clearCurrentUser();
    this._ListuserComponent.drawer.close();
    this._router.navigate(["/admin/user"]);
  }
  trackByFn(index, item) {
    return item.id;
  }
  toggleEdit() {
    this.isEdit.update((value) => !value);
  }
  toggleDelete() {
    this.isDelete.update((value) => !value);
  }
  static \u0275fac = function DetailUserComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DetailUserComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DetailUserComponent, selectors: [["app-detailuser"]], decls: 13, vars: 6, consts: [["menuTrigger", "matMenuTrigger"], ["menu", "matMenu"], [1, "flex", "flex-row", "justify-between", "items-center", "space-x-2", "p-2"], ["mat-icon-button", "", "color", "primary", 3, "click"], [1, "font-bold"], [1, "flex", "flex-row", "space-x-2", "items-center"], ["mat-icon-button", "", "color", "primary", 3, "click", 4, "ngIf"], ["mat-icon-button", "", "color", "warn", 3, "click", 4, "ngIf"], [1, "relative", "flex", "flex-col", "w-full", "p-4", "overflow-auto"], [4, "ngIf"], ["mat-icon-button", "", "color", "warn", 3, "click"], [1, "flex", "flex-col", "space-y-4", "items-center", "justify-center"], [1, "font-bold", "text-2xl"], [1, "flex", "flex-row", "space-x-2", "items-center", "justify-center"], ["mat-flat-button", "", "color", "primary", 3, "click"], ["mat-flat-button", "", "color", "warn", 3, "click"], [1, "w-full", "grid", "grid-cols-2", "gap-4"], ["appearance", "outline"], ["matInput", "", "placeholder", "Vui l\xF2ng nh\u1EADp Email", 3, "ngModelChange", "ngModel", "disabled"], ["matInput", "", "placeholder", "Vui l\xF2ng nh\u1EADp H\u1ECD V\xE0 T\xEAn", 3, "input", "value", "disabled"], ["matInput", "", "placeholder", "Vui l\xF2ng nh\u1EADp S\u1ED1 \u0110i\u1EC7n Tho\u1EA1i", 3, "ngModelChange", "ngModel", "disabled"], ["matInput", "", "type", "password", "placeholder", "Vui l\xF2ng nh\u1EADp M\u1EADt kh\u1EA9u", 3, "ngModelChange", "ngModel", "disabled"], [1, "col-span-2", "w-full", "flex", "flex-wrap", "gap-2", "space-x-2", "items-center"], ["mat-flat-button", "", "color", "primary", 1, "flex", "items-center", 3, "disabled", "matMenuTriggerFor"], [1, ""], [1, "flex", "flex-row", "flex-wrap", "gap-2"], [1, "text-center", "text-gray-500", "py-4"], [1, "cursor-pointer", "flex", "flex-col", "space-y-4", "p-3", 3, "click"], [1, "relative", "w-full"], ["type", "text", "placeholder", "T\xECm Ki\u1EBFm...", 1, "block", "w-full", "pl-10", "pr-4", "py-2", "text-gray-700", "bg-white", "border", "border-gray-300", "rounded-lg", "focus:border-blue-400", "focus:ring-blue-400", "focus:outline-none", "focus:ring", "focus:ring-opacity-40", 3, "keyup"], [1, "absolute", "inset-y-0", "left-0", "flex", "items-center", "pl-3", "pointer-events-none"], [1, "material-symbols-outlined", "text-gray-500"], [1, "w-full", "flex", "flex-col", "space-y-2", "max-h-44", "overflow-auto"], ["mat-menu-item", ""], [1, "flex", "flex-row", "space-x-2", "items-center", "justify-end"], ["class", "mt-8 !w-full", 4, "ngIf"], ["class", "!w-full mt-8", 4, "ngIf"], [1, "bg-blue-100"], [1, "flex", "items-center"], [1, "mr-2"], [1, "animate-spin", "text-gray-500", "text-sm"], ["color", "warn", 1, "text-sm", "hover:text-red-600", 3, "cursor"], ["color", "warn", 1, "text-sm", "hover:text-red-600", 3, "click"], [1, "text-gray-400"], [1, "text-sm", "mt-1"], ["mat-stroked-button", "", "color", "primary", 1, "mt-2", "flex", "items-center", 3, "matMenuTriggerFor"], ["mat-menu-item", "", 3, "click"], [1, "mt-8", "!w-full"], [1, "!w-full", "border-t", "pt-6"], ["class", "!w-full", 3, "userId", "user", 4, "ngIf"], ["class", "p-8 text-center", 4, "ngIf"], [1, "!w-full", 3, "userId", "user"], [1, "p-8", "text-center"], [1, "animate-spin", "text-4xl", "text-gray-400"], [1, "text-lg", "text-gray-500", "mt-4"], [1, "!w-full", "mt-8"], [1, "border-t", "pt-6"], [1, "text-center", "text-gray-500", "py-8"], [1, "text-4xl", "text-gray-400"], [1, "mt-2"], [1, "text-xs"]], template: function DetailUserComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 2)(1, "button", 3);
      \u0275\u0275listener("click", function DetailUserComponent_Template_button_click_1_listener() {
        return ctx.goBack();
      });
      \u0275\u0275elementStart(2, "mat-icon");
      \u0275\u0275text(3, "arrow_back");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(4, "div", 4);
      \u0275\u0275text(5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "div", 5);
      \u0275\u0275template(7, DetailUserComponent_button_7_Template, 3, 0, "button", 6)(8, DetailUserComponent_button_8_Template, 3, 0, "button", 6)(9, DetailUserComponent_button_9_Template, 3, 0, "button", 7);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "div", 8);
      \u0275\u0275template(11, DetailUserComponent_ng_container_11_Template, 9, 0, "ng-container", 9)(12, DetailUserComponent_ng_container_12_Template, 43, 13, "ng-container", 9);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_0_0;
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(((tmp_0_0 = ctx.DetailUser()) == null ? null : tmp_0_0.email) || "Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u");
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.isEdit() && ctx.DetailUser());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isEdit() && ctx.DetailUser());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.DetailUser());
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.isDelete());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isDelete() && ctx.DetailUser());
    }
  }, dependencies: [
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatInputModule,
    MatInput,
    FormsModule,
    DefaultValueAccessor,
    NgControlStatus,
    NgModel,
    MatIconModule,
    MatIcon,
    MatButtonModule,
    MatButton,
    MatIconButton,
    MatSelectModule,
    MatDialogModule,
    CommonModule,
    NgIf,
    MatSlideToggleModule,
    MatMenuModule,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatCardModule,
    MatDividerModule,
    MatChipsModule,
    MatChipListbox,
    MatChipOption,
    UserPermissionOverviewComponent
  ], styles: ["\n\n.permission-management[_ngcontent-%COMP%] {\n  border-left: 4px solid #4caf50;\n}\n.permission-management[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%] {\n  padding-bottom: 8px;\n}\n.permission-management[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n/*# sourceMappingURL=detailuser.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DetailUserComponent, { className: "DetailUserComponent", filePath: "src/app/admin/user/detailuser/detailuser.component.ts", lineNumber: 57 });
})();
export {
  DetailUserComponent
};
//# sourceMappingURL=chunk-R6WYTNGE.mjs.map
