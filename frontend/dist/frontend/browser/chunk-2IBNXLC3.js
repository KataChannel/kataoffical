import {
  memoize
} from "./chunk-FTMLWTPE.js";
import {
  SearchfilterComponent
} from "./chunk-7SCXXJPI.js";
import {
  MatPaginator,
  MatPaginatorModule
} from "./chunk-4I62SID5.js";
import {
  MatSort,
  MatSortHeader,
  MatSortModule
} from "./chunk-DR2JAJDC.js";
import {
  MatDrawer,
  MatDrawerContainer,
  MatSidenavModule
} from "./chunk-QY5L4FGH.js";
import {
  MatMenu,
  MatMenuItem,
  MatMenuModule,
  MatMenuTrigger
} from "./chunk-D7PAKJDY.js";
import {
  Router,
  RouterOutlet
} from "./chunk-2GXGFE2W.js";
import {
  StorageService
} from "./chunk-F5CW4EPT.js";
import {
  MatDialog,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule
} from "./chunk-Y6PF6L3J.js";
import {
  MatSnackBar
} from "./chunk-3D4DVDG5.js";
import {
  GraphqlService
} from "./chunk-FEROIANE.js";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatNoDataRow,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
  MatTableModule
} from "./chunk-SP2Z3Q73.js";
import {
  MatTooltip,
  MatTooltipModule
} from "./chunk-TAPSLW5I.js";
import {
  MatSelectModule
} from "./chunk-GQA7LESQ.js";
import {
  MatInput,
  MatInputModule
} from "./chunk-FRF6QBEZ.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MatFormField,
  MatFormFieldModule,
  MatLabel,
  MatPrefix,
  NgControlStatus,
  NgModel
} from "./chunk-TMSN764N.js";
import {
  MatIcon,
  MatIconModule
} from "./chunk-GSONKL3O.js";
import {
  MatButton,
  MatButtonModule,
  MatIconButton
} from "./chunk-FL6G6YYX.js";
import {
  CommonModule,
  DatePipe,
  NgIf
} from "./chunk-TAI2MURD.js";
import {
  computed,
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMapInterpolate1,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-SEHLAVZZ.js";
import {
  __decorate
} from "./chunk-E3MB3462.js";
import {
  __async,
  __spreadValues
} from "./chunk-SXK72SKC.js";

// src/app/admin/user/user-graphql.service.ts
var UserGraphQLService = class _UserGraphQLService {
  storageService;
  // Signals for state management
  _allUsers = signal([]);
  _searchTerm = signal("");
  _currentPage = signal(1);
  _pageSize = signal(50);
  _isLoading = signal(false);
  _selectedUsers = signal(/* @__PURE__ */ new Set());
  _statusFilter = signal("all");
  _currentUser = signal(null);
  // Public computed signals
  allUsers = this._allUsers.asReadonly();
  searchTerm = this._searchTerm.asReadonly();
  currentPage = this._currentPage.asReadonly();
  pageSize = this._pageSize.asReadonly();
  isLoading = this._isLoading.asReadonly();
  selectedUsers = this._selectedUsers.asReadonly();
  statusFilter = this._statusFilter.asReadonly();
  currentUser = this._currentUser.asReadonly();
  // Search and filter results
  filteredUsers = computed(() => {
    let filtered = this._allUsers();
    const status = this._statusFilter();
    if (status !== "all") {
      filtered = filtered.filter((user) => status === "active" ? user.isActive : !user.isActive);
    }
    const term = this._searchTerm().toLowerCase();
    if (term) {
      filtered = filtered.filter((user) => user.email?.toLowerCase().includes(term) || user.profile?.name?.toLowerCase().includes(term) || user.SDT?.toLowerCase().includes(term));
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
  constructor(storageService) {
    this.storageService = storageService;
  }
  graphqlService = inject(GraphqlService);
  // ========================= CRUD Operations =========================
  loadAllUsers(forceRefresh = false) {
    return __async(this, null, function* () {
      if (!forceRefresh && this._allUsers().length > 0) {
        return this._allUsers();
      }
      this._isLoading.set(true);
      try {
        const options = {
          orderBy: { createdAt: "desc" },
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
        const users = yield this.graphqlService.findMany("user", options);
        this._allUsers.set(users);
        this._currentPage.set(1);
        return users;
      } catch (error) {
        console.error("Error loading users:", error);
        throw error;
      } finally {
        this._isLoading.set(false);
      }
    });
  }
  createUser(data) {
    return __async(this, null, function* () {
      this._isLoading.set(true);
      try {
        const userData = {
          email: data.email,
          password: data.password,
          SDT: data.SDT,
          isActive: data.isActive ?? true
        };
        const newUser = yield this.graphqlService.createOne("user", userData, {
          include: {
            roles: {
              include: {
                role: {
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
                    }
                  }
                }
              }
            }
          }
        });
        if (data.roleIds && data.roleIds.length > 0) {
          yield this.assignRolesToUser(newUser.id, data.roleIds);
          const userWithRoles = yield this.getUserById(newUser.id);
          if (userWithRoles) {
            const currentUsers2 = this._allUsers();
            this._allUsers.set([
              userWithRoles,
              ...currentUsers2.filter((u) => u.id !== newUser.id)
            ]);
            return userWithRoles;
          }
        }
        const currentUsers = this._allUsers();
        this._allUsers.set([newUser, ...currentUsers]);
        return newUser;
      } catch (error) {
        console.error("Error creating user:", error);
        throw error;
      } finally {
        this._isLoading.set(false);
      }
    });
  }
  updateUser(id, data) {
    return __async(this, null, function* () {
      this._isLoading.set(true);
      try {
        const cleanData = __spreadValues({}, data);
        delete cleanData.roles;
        delete cleanData.permissions;
        delete cleanData.profile;
        delete cleanData.userRoles;
        Object.keys(cleanData).forEach((key) => {
          const value = cleanData[key];
          if (value && typeof value === "object" && Array.isArray(value)) {
            const hasComplexObjects = value.some((item) => item && typeof item === "object" && Object.keys(item).length > 2);
            if (hasComplexObjects) {
              console.warn(`Removing complex array field '${key}' from user update`);
              delete cleanData[key];
            }
          }
        });
        console.log("Updating user with cleaned data:", { id, originalKeys: Object.keys(data), cleanedKeys: Object.keys(cleanData) });
        const updatedUser = yield this.graphqlService.updateOne("user", { id }, cleanData, {
          include: {
            roles: {
              include: {
                role: {
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
                    }
                  }
                }
              }
            }
          }
        });
        const currentUsers = this._allUsers();
        const index = currentUsers.findIndex((u) => u.id === id);
        if (index !== -1) {
          const updated = [...currentUsers];
          updated[index] = updatedUser;
          this._allUsers.set(updated);
        }
        return updatedUser;
      } catch (error) {
        console.error("Error updating user:", error);
        throw error;
      } finally {
        this._isLoading.set(false);
      }
    });
  }
  deleteUser(id) {
    return __async(this, null, function* () {
      this._isLoading.set(true);
      try {
        try {
          yield this.graphqlService.deleteOne("user", { id });
        } catch (error) {
          console.warn("User already deleted or not found:", error);
        }
        const currentUsers = this._allUsers();
        const filtered = currentUsers.filter((u) => u.id !== id);
        this._allUsers.set(filtered);
        const selected = new Set(this._selectedUsers());
        selected.delete(id);
        this._selectedUsers.set(selected);
      } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
      } finally {
        this._isLoading.set(false);
      }
    });
  }
  getUserById(id) {
    return __async(this, null, function* () {
      try {
        const user = yield this.graphqlService.findUnique("user", { id }, {
          include: {
            roles: {
              include: {
                role: {
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
                    }
                  }
                }
              }
            }
          }
        });
        return user;
      } catch (error) {
        console.error("Error getting user by id:", error);
        return null;
      }
    });
  }
  // ========================= Role Management =========================
  assignRolesToUser(userId, roleIds) {
    return __async(this, null, function* () {
      this._isLoading.set(true);
      try {
        const roleData = roleIds.map((roleId) => ({
          userId,
          roleId
        }));
        yield this.graphqlService.batchCreate("userRole", roleData);
        const updatedUser = yield this.getUserById(userId);
        if (updatedUser) {
          const currentUsers = this._allUsers();
          const index = currentUsers.findIndex((u) => u.id === userId);
          if (index !== -1) {
            const updated = [...currentUsers];
            updated[index] = updatedUser;
            this._allUsers.set(updated);
          }
        }
      } catch (error) {
        console.error("Error assigning roles to user:", error);
        throw error;
      } finally {
        this._isLoading.set(false);
      }
    });
  }
  removeRoleFromUser(userId, roleId) {
    return __async(this, null, function* () {
      this._isLoading.set(true);
      try {
        const user = yield this.getUserById(userId);
        const userRole = user?.roles?.find((ur) => ur.roleId === roleId);
        if (userRole) {
          try {
            yield this.graphqlService.deleteOne("userRole", {
              id: userRole.id
            });
          } catch (error) {
            console.warn("UserRole already deleted or not found:", error);
          }
          const updatedUser = yield this.getUserById(userId);
          if (updatedUser) {
            const currentUsers = this._allUsers();
            const index = currentUsers.findIndex((u) => u.id === userId);
            if (index !== -1) {
              const updated = [...currentUsers];
              updated[index] = updatedUser;
              this._allUsers.set(updated);
            }
          }
        } else {
          console.warn(`UserRole not found for userId: ${userId}, roleId: ${roleId}`);
        }
      } catch (error) {
        console.error("Error removing role from user:", error);
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
  toggleUserSelection(id) {
    const selected = new Set(this._selectedUsers());
    if (selected.has(id)) {
      selected.delete(id);
    } else {
      selected.add(id);
    }
    this._selectedUsers.set(selected);
  }
  selectAllCurrentPage() {
    const selected = new Set(this._selectedUsers());
    this.paginatedUsers().forEach((user) => {
      selected.add(user.id);
    });
    this._selectedUsers.set(selected);
  }
  deselectAllCurrentPage() {
    const selected = new Set(this._selectedUsers());
    this.paginatedUsers().forEach((user) => {
      selected.delete(user.id);
    });
    this._selectedUsers.set(selected);
  }
  clearSelection() {
    this._selectedUsers.set(/* @__PURE__ */ new Set());
  }
  isSelected(id) {
    return this._selectedUsers().has(id);
  }
  get selectedCount() {
    return this._selectedUsers().size;
  }
  get selectedIds() {
    return Array.from(this._selectedUsers());
  }
  // ========================= Utility Methods =========================
  findUserById(id) {
    return this._allUsers().find((u) => u.id === id);
  }
  getUsersByRole(roleId) {
    return this._allUsers().filter((user) => user.roles?.some((userRole) => userRole.roleId === roleId));
  }
  getActiveUsers() {
    return this._allUsers().filter((u) => u.isActive);
  }
  getUserPermissions(userId) {
    const user = this.findUserById(userId);
    if (!user || !user.roles)
      return [];
    const permissions = [];
    user.roles.forEach((userRole) => {
      if (userRole.role.permissions) {
        permissions.push(...userRole.role.permissions);
      }
    });
    return permissions.filter((permission, index, self) => index === self.findIndex((p) => p.id === permission.id));
  }
  hasPermission(userId, permissionCode) {
    const permissions = this.getUserPermissions(userId);
    return permissions.some((p) => p.codeId === permissionCode);
  }
  // ========================= Cache Management =========================
  clearCache() {
    this._allUsers.set([]);
    this._searchTerm.set("");
    this._statusFilter.set("all");
    this._currentPage.set(1);
    this.clearSelection();
    this._currentUser.set(null);
  }
  refreshData() {
    return this.loadAllUsers(true);
  }
  // ========================= Current User Management =========================
  setCurrentUser(user) {
    this._currentUser.set(user);
  }
  clearCurrentUser() {
    this._currentUser.set(null);
  }
  static \u0275fac = function UserGraphQLService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UserGraphQLService)(\u0275\u0275inject(StorageService));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _UserGraphQLService, factory: _UserGraphQLService.\u0275fac, providedIn: "root" });
};

// src/app/admin/user/shared/drawer.service.ts
var DrawerService = class _DrawerService {
  _isOpen = signal(false);
  // Public readonly signal
  isOpen = this._isOpen.asReadonly();
  open() {
    this._isOpen.set(true);
  }
  close() {
    this._isOpen.set(false);
  }
  toggle() {
    this._isOpen.update((value) => !value);
  }
  static \u0275fac = function DrawerService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DrawerService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DrawerService, factory: _DrawerService.\u0275fac, providedIn: "root" });
};

// src/app/admin/user/listuser/listuser.component.ts
var _c0 = ["drawer"];
var _c1 = () => ({ standalone: true });
var _forTrack0 = ($index, $item) => $item.key;
var _forTrack1 = ($index, $item) => $item.id;
function ListUserComponent_button_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 36);
    \u0275\u0275listener("click", function ListUserComponent_button_21_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      const DeleteDialog_r4 = \u0275\u0275reference(64);
      return \u0275\u0275resetView(ctx_r2.openDeleteDialog(DeleteDialog_r4));
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "delete");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 16);
    \u0275\u0275text(4, "Xo\xE1");
    \u0275\u0275elementEnd()();
  }
}
function ListUserComponent_For_59_Conditional_1_th_0_For_16_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 49);
    \u0275\u0275listener("click", function ListUserComponent_For_59_Conditional_1_th_0_For_16_Conditional_0_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r7);
      const item_r8 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(4);
      ctx_r2.toggleColumn(item_r8);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("disabled", true);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r8.isShow ? "check_box" : "check_box_outline_blank");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r8.value);
  }
}
function ListUserComponent_For_59_Conditional_1_th_0_For_16_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 50);
    \u0275\u0275listener("click", function ListUserComponent_For_59_Conditional_1_th_0_For_16_Conditional_1_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r9);
      const item_r8 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(4);
      ctx_r2.toggleColumn(item_r8);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r8.isShow ? "check_box" : "check_box_outline_blank");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r8.value);
  }
}
function ListUserComponent_For_59_Conditional_1_th_0_For_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, ListUserComponent_For_59_Conditional_1_th_0_For_16_Conditional_0_Template, 5, 3, "button", 47)(1, ListUserComponent_For_59_Conditional_1_th_0_For_16_Conditional_1_Template, 5, 2, "button", 48);
  }
  if (rf & 2) {
    const item_r8 = ctx.$implicit;
    \u0275\u0275conditional(item_r8.key == "stt" ? 0 : 1);
  }
}
function ListUserComponent_For_59_Conditional_1_th_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "th", 37)(1, "button", 41)(2, "mat-icon");
    \u0275\u0275text(3, "tune");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "mat-menu", null, 4)(6, "div", 42)(7, "mat-form-field", 43)(8, "input", 44);
    \u0275\u0275listener("input", function ListUserComponent_For_59_Conditional_1_th_0_Template_input_input_8_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.doFilterColumns($event));
    })("click", function ListUserComponent_For_59_Conditional_1_th_0_Template_input_click_8_listener($event) {
      \u0275\u0275restoreView(_r6);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "mat-icon", 45);
    \u0275\u0275text(10, "search");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "button", 27);
    \u0275\u0275listener("click", function ListUserComponent_For_59_Conditional_1_th_0_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.updateDisplayedColumns());
    });
    \u0275\u0275elementStart(12, "mat-icon");
    \u0275\u0275text(13, "check_circle");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "div", 46);
    \u0275\u0275repeaterCreate(15, ListUserComponent_For_59_Conditional_1_th_0_For_16_Template, 2, 1, null, null, _forTrack0);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const menu_r10 = \u0275\u0275reference(5);
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("matMenuTriggerFor", menu_r10);
    \u0275\u0275advance(14);
    \u0275\u0275repeater(ctx_r2.FilterColumns);
  }
}
function ListUserComponent_For_59_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, ListUserComponent_For_59_Conditional_1_th_0_Template, 17, 1, "th", 40);
  }
}
function ListUserComponent_For_59_Conditional_2_th_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "th", 38)(1, "span", 52);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "app-searchfilter", 53);
    \u0275\u0275listener("OutFilter", function ListUserComponent_For_59_Conditional_2_th_0_Template_app_searchfilter_OutFilter_3_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.onOutFilter($event));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const column_r12 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.ColumnName[column_r12], " ");
    \u0275\u0275advance();
    \u0275\u0275property("icon", "filter_alt")("ListItem", ctx_r2.Listuser())("fieldsearch", column_r12)("ListFilter", ctx_r2.ListFilter)("filterItem", ctx_r2.FilterHederColumn(ctx_r2.dataSource.filteredData, column_r12));
  }
}
function ListUserComponent_For_59_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, ListUserComponent_For_59_Conditional_2_th_0_Template, 4, 6, "th", 51);
  }
}
function ListUserComponent_For_59_td_3_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 58);
    \u0275\u0275listener("click", function ListUserComponent_For_59_td_3_Case_1_Template_span_click_0_listener() {
      \u0275\u0275restoreView(_r13);
      const row_r14 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.goToDetail(row_r14));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r14 = \u0275\u0275nextContext().$implicit;
    const column_r12 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r14[column_r12], " ");
  }
}
function ListUserComponent_For_59_td_3_Case_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "check");
    \u0275\u0275elementEnd();
  }
}
function ListUserComponent_For_59_td_3_Case_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const idx_r16 = \u0275\u0275nextContext(2).index;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(idx_r16 + 1);
  }
}
function ListUserComponent_For_59_td_3_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 59);
    \u0275\u0275listener("click", function ListUserComponent_For_59_td_3_Case_2_Template_span_click_0_listener() {
      \u0275\u0275restoreView(_r15);
      const row_r14 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.AddToEdit(row_r14));
    });
    \u0275\u0275template(1, ListUserComponent_For_59_td_3_Case_2_Conditional_1_Template, 2, 0, "mat-icon")(2, ListUserComponent_For_59_td_3_Case_2_Conditional_2_Template, 2, 1, "span");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r14 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.CheckSelect(row_r14) ? 1 : 2);
  }
}
function ListUserComponent_For_59_td_3_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 57);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r14 = \u0275\u0275nextContext().$implicit;
    const column_r12 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r14[column_r12], "dd/MM/yyyy"), " ");
  }
}
function ListUserComponent_For_59_td_3_Case_4_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 60);
    \u0275\u0275text(1, "check_circle");
    \u0275\u0275elementEnd();
  }
}
function ListUserComponent_For_59_td_3_Case_4_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 61);
    \u0275\u0275text(1, "cancel");
    \u0275\u0275elementEnd();
  }
}
function ListUserComponent_For_59_td_3_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 57);
    \u0275\u0275template(1, ListUserComponent_For_59_td_3_Case_4_Conditional_1_Template, 2, 0, "mat-icon", 60)(2, ListUserComponent_For_59_td_3_Case_4_Conditional_2_Template, 2, 0, "mat-icon", 61);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r14 = \u0275\u0275nextContext().$implicit;
    const column_r12 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(row_r14[column_r12] ? 1 : 2);
  }
}
function ListUserComponent_For_59_td_3_Case_5_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 62);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const userRole_r17 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", userRole_r17.role.name, " ");
  }
}
function ListUserComponent_For_59_td_3_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 57);
    \u0275\u0275repeaterCreate(1, ListUserComponent_For_59_td_3_Case_5_For_2_Template, 2, 1, "span", 62, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r14 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275repeater(row_r14.roles);
  }
}
function ListUserComponent_For_59_td_3_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 57);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r14 = \u0275\u0275nextContext().$implicit;
    const column_r12 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r14[column_r12], " ");
  }
}
function ListUserComponent_For_59_td_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 54);
    \u0275\u0275template(1, ListUserComponent_For_59_td_3_Case_1_Template, 2, 1, "span", 55)(2, ListUserComponent_For_59_td_3_Case_2_Template, 3, 1, "span", 56)(3, ListUserComponent_For_59_td_3_Case_3_Template, 3, 4, "span", 57)(4, ListUserComponent_For_59_td_3_Case_4_Template, 3, 1, "span", 57)(5, ListUserComponent_For_59_td_3_Case_5_Template, 3, 0, "div", 57)(6, ListUserComponent_For_59_td_3_Case_6_Template, 2, 1, "span", 57);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_17_0;
    const column_r12 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_17_0 = column_r12) === "email" ? 1 : tmp_17_0 === "stt" ? 2 : tmp_17_0 === "createdAt" ? 3 : tmp_17_0 === "isActive" ? 4 : tmp_17_0 === "roles" ? 5 : 6);
  }
}
function ListUserComponent_For_59_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0, 32);
    \u0275\u0275template(1, ListUserComponent_For_59_Conditional_1_Template, 1, 0, "th", 37)(2, ListUserComponent_For_59_Conditional_2_Template, 1, 0, "th", 38)(3, ListUserComponent_For_59_td_3_Template, 7, 1, "td", 39);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const column_r12 = ctx.$implicit;
    \u0275\u0275property("matColumnDef", column_r12);
    \u0275\u0275advance();
    \u0275\u0275conditional(column_r12 == "stt" ? 1 : 2);
  }
}
function ListUserComponent_tr_60_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 63);
  }
}
function ListUserComponent_tr_61_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 64);
  }
  if (rf & 2) {
    const row_r18 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classMapInterpolate1("hover:bg-slate-50 ", ctx_r2.CheckItemInEdit(row_r18) ? "!bg-blue-50" : "", "");
  }
}
function ListUserComponent_tr_62_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 65)(1, "td", 66);
    \u0275\u0275text(2, "Kh\xF4ng t\xECm th\u1EA5y");
    \u0275\u0275elementEnd()();
  }
}
function ListUserComponent_ng_template_63_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-dialog-content")(1, "div", 67)(2, "div", 68);
    \u0275\u0275text(3, "X\xE1c Nh\u1EADn");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 69)(7, "button", 70);
    \u0275\u0275text(8, "\u0110\u1ED3ng \xDD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 71);
    \u0275\u0275text(10, "Hu\u1EF7 B\u1ECF");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("B\u1EA1n ch\u1EAFc ch\u1EAFn mu\u1ED1n xo\xE1 ", ctx_r2.EditList.length, " user kh\xF4ng?");
  }
}
var ListUserComponent = class _ListUserComponent {
  userGraphQLService;
  dialog;
  router;
  snackBar;
  drawerService;
  displayedColumns = ["stt", "email", "name", "SDT", "isActive", "roles", "createdAt"];
  AllColumn = ["stt", "email", "name", "SDT", "isActive", "roles", "createdAt"];
  ColumnName = {
    stt: "#",
    email: "Email",
    name: "H\u1ECD v\xE0 t\xEAn",
    SDT: "S\u1ED1 \u0111i\u1EC7n tho\u1EA1i",
    isActive: "Tr\u1EA1ng th\xE1i",
    roles: "Vai tr\xF2",
    createdAt: "Ng\xE0y t\u1EA1o"
  };
  FilterColumns = [];
  dataSource = new MatTableDataSource([]);
  paginator;
  sort;
  drawer;
  // Services
  constructor(userGraphQLService, dialog, router, snackBar, drawerService) {
    this.userGraphQLService = userGraphQLService;
    this.dialog = dialog;
    this.router = router;
    this.snackBar = snackBar;
    this.drawerService = drawerService;
  }
  _GraphqlService = inject(GraphqlService);
  // State - initialized after constructor
  Listuser = signal([]);
  isLoading;
  ListFilter = [];
  EditList = [];
  // Pagination
  page = signal(1);
  pageSize = signal(50);
  total = signal(0);
  totalPages = signal(1);
  ngOnInit() {
    return __async(this, null, function* () {
      this.isLoading = this.userGraphQLService.isLoading;
      this.initializeColumns();
      yield this.loadUsers();
    });
  }
  ngAfterViewInit() {
  }
  initializeColumns() {
    this.FilterColumns = this.AllColumn.map((column) => ({
      key: column,
      value: this.ColumnName[column],
      isShow: this.displayedColumns.includes(column)
    }));
  }
  loadUsers() {
    return __async(this, null, function* () {
      try {
        const users = yield this.userGraphQLService.loadAllUsers();
        this.dataSource.data = users;
        this.Listuser.set(users);
        this.total.set(users.length);
        this.updatePagination();
      } catch (error) {
        this.snackBar.open("L\u1ED7i khi t\u1EA3i d\u1EEF li\u1EC7u: " + error.message, "\u0110\xF3ng", { duration: 3e3 });
      }
    });
  }
  updatePagination() {
    const totalItems = this.dataSource.data.length;
    this.total.set(totalItems);
    this.totalPages.set(Math.ceil(totalItems / this.pageSize()));
  }
  applyFilter(event) {
    const filterValue = event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.page.set(1);
    this.updatePagination();
  }
  onPageSizeChange(newSize, menu) {
    this.pageSize.set(newSize);
    this.page.set(1);
    this.updatePagination();
    if (menu) {
      menu.closeMenu();
    }
  }
  onNextPage() {
    if (this.page() < this.totalPages()) {
      this.page.set(this.page() + 1);
    }
  }
  onPreviousPage() {
    if (this.page() > 1) {
      this.page.set(this.page() - 1);
    }
  }
  doFilterColumns(event) {
    const filterValue = event.target.value.toLowerCase();
    this.FilterColumns = this.AllColumn.map((column) => ({
      key: column,
      value: this.ColumnName[column],
      isShow: this.displayedColumns.includes(column)
    })).filter((column) => column.value.toLowerCase().includes(filterValue));
  }
  toggleColumn(column) {
    column.isShow = !column.isShow;
  }
  updateDisplayedColumns() {
    this.displayedColumns = this.FilterColumns.filter((column) => column.isShow).map((column) => column.key);
  }
  FilterHederColumn(list, column) {
    const uniqueList = list.filter((obj, index, self) => index === self.findIndex((t) => t[column] === obj[column]));
    return uniqueList;
  }
  onOutFilter(event) {
    this.dataSource.data = event;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilters() {
    let filteredData = [...this.Listuser()];
    this.ListFilter.forEach((filter) => {
      if (filter.values && filter.values.length > 0) {
        filteredData = filteredData.filter((item) => filter.values.includes(item[filter.field]));
      }
    });
    this.dataSource.data = filteredData;
    this.page.set(1);
    this.updatePagination();
  }
  create() {
    this.router.navigate(["/admin/user/new"], { relativeTo: null });
  }
  goToDetail(user) {
    this.router.navigate(["/admin/user/" + user.id], { relativeTo: null });
  }
  AddToEdit(user) {
    const index = this.EditList.findIndex((item) => item.id === user.id);
    if (index > -1) {
      this.EditList.splice(index, 1);
    } else {
      this.EditList.push(user);
    }
  }
  CheckSelect(user) {
    return this.EditList.some((item) => item.id === user.id);
  }
  CheckItemInEdit(user) {
    return this.EditList.some((item) => item.id === user.id);
  }
  openDeleteDialog(template) {
    const dialogRef = this.dialog.open(template);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteSelectedUsers();
      }
    });
  }
  deleteSelectedUsers() {
    return __async(this, null, function* () {
      try {
        for (const user of this.EditList) {
          yield this.userGraphQLService.deleteUser(user.id);
        }
        this.snackBar.open(`\u0110\xE3 x\xF3a ${this.EditList.length} user th\xE0nh c\xF4ng`, "\u0110\xF3ng", { duration: 3e3 });
        this.EditList = [];
        yield this.loadUsers();
      } catch (error) {
        this.snackBar.open("L\u1ED7i khi x\xF3a user: " + error.message, "\u0110\xF3ng", { duration: 3e3 });
      }
    });
  }
  ExportUser() {
    return __async(this, null, function* () {
      const ListUser = yield this._GraphqlService.findAll("User", {
        aggressiveCache: true,
        take: 1e4,
        enableParallelFetch: true,
        select: {
          id: true,
          email: true,
          SDT: true,
          name: true,
          roles: {
            select: {
              role: {
                select: {
                  name: true,
                  permissions: {
                    select: {
                      permission: {
                        select: { name: true }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      });
      console.log(ListUser);
      const exportListUser = ListUser.data.map((user) => {
        return {
          email: user.email,
          SDT: user.SDT,
          roles: user.roles.map((roleUser) => roleUser.role.name).join(", "),
          permissions: user.roles.flatMap((roleUser) => roleUser.role.permissions.map((permissionRole) => permissionRole.permission.name)).join(", ")
        };
      });
      const XLSX = yield import("./chunk-JOVYPMSF.js");
      const ws = XLSX.utils.json_to_sheet(exportListUser);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Users");
      XLSX.writeFile(wb, "users-export.xlsx");
    });
  }
  static \u0275fac = function ListUserComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ListUserComponent)(\u0275\u0275directiveInject(UserGraphQLService), \u0275\u0275directiveInject(MatDialog), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(MatSnackBar), \u0275\u0275directiveInject(DrawerService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ListUserComponent, selectors: [["app-listuser"]], viewQuery: function ListUserComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(MatPaginator, 5);
      \u0275\u0275viewQuery(MatSort, 5);
      \u0275\u0275viewQuery(_c0, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.paginator = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.sort = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.drawer = _t.first);
    }
  }, decls: 65, vars: 18, consts: [["drawer", ""], ["menuHienthi", "matMenuTrigger"], ["menu1", "matMenu"], ["DeleteDialog", ""], ["menu", "matMenu"], ["autosize", "", 1, "w-full", "h-full"], ["mode", "over", 1, "flex", "flex-col", "!w-full", "h-full", 3, "position"], [1, "flex", "flex-col", "space-y-2", "h-screen-16", "w-full", "p-2"], [1, "p-2", "cursor-pointer", "w-full", "relative", "flex", "lg:flex-row", "lg:space-y-2", "space-y-0", "flex-col", "space-x-2", "justify-between", "items-center", "bg-white", "rounded-lg"], [1, "w-full", "flex", "flex-col", "gap-2", "lg:flex-row", "lg:items-center", "lg:justify-between"], [1, "flex", "flex-row", "space-x-2", "items-center"], [1, "relative", "w-full"], ["type", "text", "placeholder", "T\xECm Ki\u1EBFm User...", 1, "block", "w-full", "pl-10", "pr-4", "py-2", "text-gray-700", "bg-white", "border", "border-gray-300", "rounded-lg", "focus:border-blue-400", "focus:ring-blue-400", "focus:outline-none", "focus:ring", "focus:ring-opacity-40", 3, "keyup"], [1, "absolute", "inset-y-0", "left-0", "flex", "items-center", "pl-3", "pointer-events-none"], [1, "material-symbols-outlined", "text-gray-500"], ["color", "primary", "matTooltip", "Th\xEAm m\u1EDBi", "mat-flat-button", "", 1, "flex", "flex-row", "items-center", 3, "click"], [1, "whitespace-nowrap"], ["matTooltip", "T\u1EA3i xu\u1ED1ng file excel", "color", "primary", "mat-icon-button", "", 3, "click"], ["class", "flex flex-row items-center", "color", "warn", "matTooltip", "Xo\xE1", "mat-flat-button", "", 3, "click", 4, "ngIf"], [1, "w-full", "flex", "flex-row", "space-x-4", "justify-end", "items-center"], [1, "flex", "items-center", "text-center"], [1, "flex", "items-center", "justify-center"], [1, "flex", "flex-row", "space-x-2", "justify-center", "items-center"], [1, "font-bold", "text-blue-600", 3, "matMenuTriggerFor"], [1, "w-full", "flex", "flex-row", "space-x-2", "p-4", 3, "click"], ["appearance", "outline", "subscriptSizing", "dynamic"], ["matInput", "", "placeholder", "Vui l\xF2ng Nh\u1EADp S\u1ED1 L\u01B0\u1EE3ng", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["mat-icon-button", "", "color", "primary", 3, "click"], [1, "flex", "flex-row", "items-center"], ["mat-icon-button", "", "color", "primary", 3, "click", "disabled"], [1, "w-full", "h-full", "overflow-auto"], ["mat-table", "", "matSort", "", 1, "!border", "w-full", "cursor-pointer", 3, "dataSource"], [3, "matColumnDef"], ["mat-header-row", "", 4, "matHeaderRowDef", "matHeaderRowDefSticky"], ["class", "border", "mat-row", "", 3, "class", 4, "matRowDef", "matRowDefColumns"], ["class", "mat-row border", 4, "matNoDataRow"], ["color", "warn", "matTooltip", "Xo\xE1", "mat-flat-button", "", 1, "flex", "flex-row", "items-center", 3, "click"], ["mat-header-cell", "", 1, "!border", "!bg-slate-100", "justify-center"], ["mat-header-cell", "", "mat-sort-header", "", 1, "!border", "whitespace-nowrap", "!bg-slate-100"], ["class", "border", "mat-cell", "", 4, "matCellDef"], ["class", "!border !bg-slate-100 justify-center", "mat-header-cell", "", 4, "matHeaderCellDef"], ["matTooltip", "\u1EA8n hi\u1EC7n c\u1ED9t", "mat-icon-button", "", "color", "primary", 3, "matMenuTriggerFor"], [1, "flex", "flex-row", "space-x-2", "items-center", "p-4"], ["appearance", "outline", "subscriptSizing", "dynamic", 1, "w-full"], ["matInput", "", "placeholder", "T\xECm Ki\u1EBFm", 3, "input", "click"], ["matPrefix", ""], [1, "flex", "flex-col", "max-h-80", "overflow-auto"], ["mat-menu-item", "", 3, "disabled"], ["mat-menu-item", ""], ["mat-menu-item", "", 3, "click", "disabled"], ["mat-menu-item", "", 3, "click"], ["class", "!border whitespace-nowrap !bg-slate-100", "mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], [1, "max-w-40", "line-clamp-4", "me-4"], [3, "OutFilter", "icon", "ListItem", "fieldsearch", "ListFilter", "filterItem"], ["mat-cell", "", 1, "border"], [1, "max-w-40", "line-clamp-4", "font-bold", "text-blue-600"], [1, "flex", "justify-center", "items-center", "font-bold", "text-blue-600"], [1, "max-w-40", "line-clamp-4"], [1, "max-w-40", "line-clamp-4", "font-bold", "text-blue-600", 3, "click"], [1, "flex", "justify-center", "items-center", "font-bold", "text-blue-600", 3, "click"], [1, "text-green-500"], [1, "text-red-500"], [1, "inline-block", "bg-blue-100", "text-blue-800", "text-xs", "px-2", "py-1", "rounded-full", "mr-1", "mb-1"], ["mat-header-row", ""], ["mat-row", "", 1, "border"], [1, "mat-row", "border"], ["colspan", "4", 1, "mat-cell", "p-4"], [1, "flex", "flex-col", "space-y-8", "items-center", "justify-center"], [1, "font-bold"], [1, "flex", "flex-row", "space-x-2", "items-center", "justify-center"], ["mat-flat-button", "", "color", "primary", "mat-dialog-close", "true"], ["mat-flat-button", "", "color", "warn", "mat-dialog-close", "false"]], template: function ListUserComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "mat-drawer-container", 5)(1, "mat-drawer", 6, 0);
      \u0275\u0275element(3, "router-outlet");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 7)(5, "div", 8)(6, "div", 9)(7, "div", 10)(8, "div", 11)(9, "input", 12);
      \u0275\u0275listener("keyup", function ListUserComponent_Template_input_keyup_9_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.applyFilter($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "div", 13)(11, "span", 14);
      \u0275\u0275text(12, "search");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(13, "button", 15);
      \u0275\u0275listener("click", function ListUserComponent_Template_button_click_13_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.create());
      });
      \u0275\u0275elementStart(14, "mat-icon");
      \u0275\u0275text(15, "add_circle");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "span", 16);
      \u0275\u0275text(17, "T\u1EA1o M\u1EDBi");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(18, "button", 17);
      \u0275\u0275listener("click", function ListUserComponent_Template_button_click_18_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.ExportUser());
      });
      \u0275\u0275elementStart(19, "mat-icon");
      \u0275\u0275text(20, "file_download");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(21, ListUserComponent_button_21_Template, 5, 0, "button", 18);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(22, "div", 19)(23, "div", 20)(24, "strong");
      \u0275\u0275text(25);
      \u0275\u0275elementEnd();
      \u0275\u0275text(26, " - ");
      \u0275\u0275elementStart(27, "strong");
      \u0275\u0275text(28);
      \u0275\u0275elementEnd();
      \u0275\u0275text(29);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "div", 21)(31, "span");
      \u0275\u0275text(32);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "span");
      \u0275\u0275text(34, "Trang");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(35, "div", 22)(36, "span", 23, 1);
      \u0275\u0275text(38);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(39, "mat-menu", null, 2)(41, "div", 24);
      \u0275\u0275listener("click", function ListUserComponent_Template_div_click_41_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView($event.stopPropagation());
      });
      \u0275\u0275elementStart(42, "mat-form-field", 25)(43, "mat-label");
      \u0275\u0275text(44, "S\u1ED1 l\u01B0\u1EE3ng");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(45, "input", 26);
      \u0275\u0275twoWayListener("ngModelChange", function ListUserComponent_Template_input_ngModelChange_45_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.pageSize, $event) || (ctx.pageSize = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(46, "button", 27);
      \u0275\u0275listener("click", function ListUserComponent_Template_button_click_46_listener() {
        \u0275\u0275restoreView(_r1);
        const menuHienthi_r5 = \u0275\u0275reference(37);
        return \u0275\u0275resetView(ctx.onPageSizeChange(ctx.pageSize(), menuHienthi_r5));
      });
      \u0275\u0275elementStart(47, "mat-icon");
      \u0275\u0275text(48, "published_with_changes");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(49, "div", 28)(50, "button", 29);
      \u0275\u0275listener("click", function ListUserComponent_Template_button_click_50_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onPreviousPage());
      });
      \u0275\u0275elementStart(51, "mat-icon");
      \u0275\u0275text(52, "keyboard_arrow_left");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(53, "button", 29);
      \u0275\u0275listener("click", function ListUserComponent_Template_button_click_53_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onNextPage());
      });
      \u0275\u0275elementStart(54, "mat-icon");
      \u0275\u0275text(55, "keyboard_arrow_right");
      \u0275\u0275elementEnd()()()()()();
      \u0275\u0275elementStart(56, "div", 30)(57, "table", 31);
      \u0275\u0275repeaterCreate(58, ListUserComponent_For_59_Template, 4, 2, "ng-container", 32, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275template(60, ListUserComponent_tr_60_Template, 1, 0, "tr", 33)(61, ListUserComponent_tr_61_Template, 1, 3, "tr", 34)(62, ListUserComponent_tr_62_Template, 3, 0, "tr", 35);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275template(63, ListUserComponent_ng_template_63_Template, 11, 1, "ng-template", null, 3, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      const menu1_r19 = \u0275\u0275reference(40);
      \u0275\u0275advance();
      \u0275\u0275property("position", "end");
      \u0275\u0275advance(20);
      \u0275\u0275property("ngIf", ctx.EditList.length > 0);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate((ctx.page() - 1) * ctx.pageSize() + 1);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.page() * ctx.pageSize() > ctx.total() ? ctx.total() : ctx.page() * ctx.pageSize());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" / ", ctx.total(), " m\u1EE5c ");
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate2("", ctx.page(), "/", ctx.totalPages(), " ");
      \u0275\u0275advance(4);
      \u0275\u0275property("matMenuTriggerFor", menu1_r19);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("", ctx.pageSize(), " m\u1EE5c");
      \u0275\u0275advance(7);
      \u0275\u0275twoWayProperty("ngModel", ctx.pageSize);
      \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(17, _c1));
      \u0275\u0275advance(5);
      \u0275\u0275property("disabled", ctx.page() === 1);
      \u0275\u0275advance(3);
      \u0275\u0275property("disabled", ctx.page() === ctx.totalPages());
      \u0275\u0275advance(4);
      \u0275\u0275property("dataSource", ctx.dataSource);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.displayedColumns);
      \u0275\u0275advance(2);
      \u0275\u0275property("matHeaderRowDef", ctx.displayedColumns)("matHeaderRowDefSticky", true);
      \u0275\u0275advance();
      \u0275\u0275property("matRowDefColumns", ctx.displayedColumns);
    }
  }, dependencies: [
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatPrefix,
    MatInputModule,
    MatInput,
    MatTableModule,
    MatTable,
    MatHeaderCellDef,
    MatHeaderRowDef,
    MatColumnDef,
    MatCellDef,
    MatRowDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatNoDataRow,
    MatSortModule,
    MatSort,
    MatSortHeader,
    MatPaginatorModule,
    MatMenuModule,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatSidenavModule,
    MatDrawer,
    MatDrawerContainer,
    RouterOutlet,
    MatIconModule,
    MatIcon,
    MatButtonModule,
    MatButton,
    MatIconButton,
    MatSelectModule,
    CommonModule,
    NgIf,
    DatePipe,
    FormsModule,
    DefaultValueAccessor,
    NgControlStatus,
    NgModel,
    MatTooltipModule,
    MatTooltip,
    MatDialogModule,
    MatDialogClose,
    MatDialogContent,
    SearchfilterComponent
  ], styles: ["\n\n.user-list-container[_ngcontent-%COMP%]   .toolbar-section[_ngcontent-%COMP%] {\n  transition: all 0.3s ease;\n}\n.user-list-container[_ngcontent-%COMP%]   .toolbar-section[_ngcontent-%COMP%]   .search-field[_ngcontent-%COMP%] {\n  transition: border-color 0.2s ease;\n}\n.user-list-container[_ngcontent-%COMP%]   .toolbar-section[_ngcontent-%COMP%]   .search-field[_ngcontent-%COMP%]:focus-within {\n  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);\n}\n.user-list-container[_ngcontent-%COMP%]   .data-table-container[_ngcontent-%COMP%] {\n  position: relative;\n}\n.user-list-container[_ngcontent-%COMP%]   .data-table-container[_ngcontent-%COMP%]   .mat-mdc-table[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 8px;\n}\n.user-list-container[_ngcontent-%COMP%]   .data-table-container[_ngcontent-%COMP%]   .mat-mdc-table[_ngcontent-%COMP%]   .mat-mdc-header-row[_ngcontent-%COMP%] {\n  background-color: #f8fafc;\n  border-bottom: 2px solid #e2e8f0;\n}\n.user-list-container[_ngcontent-%COMP%]   .data-table-container[_ngcontent-%COMP%]   .mat-mdc-table[_ngcontent-%COMP%]   .mat-mdc-header-cell[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #374151;\n  padding: 16px 12px;\n}\n.user-list-container[_ngcontent-%COMP%]   .data-table-container[_ngcontent-%COMP%]   .mat-mdc-table[_ngcontent-%COMP%]   .mat-mdc-header-cell.mat-sort-header-sorted[_ngcontent-%COMP%] {\n  color: #2563eb;\n}\n.user-list-container[_ngcontent-%COMP%]   .data-table-container[_ngcontent-%COMP%]   .mat-mdc-table[_ngcontent-%COMP%]   .mat-mdc-row[_ngcontent-%COMP%] {\n  transition: background-color 0.15s ease;\n  border-bottom: 1px solid #f1f5f9;\n}\n.user-list-container[_ngcontent-%COMP%]   .data-table-container[_ngcontent-%COMP%]   .mat-mdc-table[_ngcontent-%COMP%]   .mat-mdc-row[_ngcontent-%COMP%]:hover {\n  background-color: #f8fafc;\n}\n.user-list-container[_ngcontent-%COMP%]   .data-table-container[_ngcontent-%COMP%]   .mat-mdc-table[_ngcontent-%COMP%]   .mat-mdc-row.selected[_ngcontent-%COMP%] {\n  background-color: #eff6ff;\n  border-color: #bfdbfe;\n}\n.user-list-container[_ngcontent-%COMP%]   .data-table-container[_ngcontent-%COMP%]   .mat-mdc-table[_ngcontent-%COMP%]   .mat-mdc-row.editing[_ngcontent-%COMP%] {\n  background-color: #fefce8;\n  border-color: #fcd34d;\n}\n.user-list-container[_ngcontent-%COMP%]   .data-table-container[_ngcontent-%COMP%]   .mat-mdc-table[_ngcontent-%COMP%]   .mat-mdc-cell[_ngcontent-%COMP%] {\n  padding: 12px;\n  vertical-align: middle;\n}\n.user-list-container[_ngcontent-%COMP%]   .data-table-container[_ngcontent-%COMP%]   .mat-mdc-table[_ngcontent-%COMP%]   .mat-mdc-cell[_ngcontent-%COMP%]   .mat-mdc-form-field[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.user-list-container[_ngcontent-%COMP%]   .data-table-container[_ngcontent-%COMP%]   .mat-mdc-table[_ngcontent-%COMP%]   .mat-mdc-cell[_ngcontent-%COMP%]   .mat-mdc-form-field[_ngcontent-%COMP%]   .mat-mdc-form-field-wrapper[_ngcontent-%COMP%] {\n  padding-bottom: 0;\n}\n.user-list-container[_ngcontent-%COMP%]   .data-table-container[_ngcontent-%COMP%]   .loading-overlay[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(255, 255, 255, 0.8);\n  -webkit-backdrop-filter: blur(2px);\n  backdrop-filter: blur(2px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 10;\n}\n.user-list-container[_ngcontent-%COMP%]   .pagination-info[_ngcontent-%COMP%]   .page-size-selector[_ngcontent-%COMP%]   .mat-mdc-form-field[_ngcontent-%COMP%] {\n  min-width: 80px;\n}\n.user-list-container[_ngcontent-%COMP%]   .pagination-info[_ngcontent-%COMP%]   .page-navigation[_ngcontent-%COMP%]   .mat-mdc-icon-button[_ngcontent-%COMP%] {\n  transition: background-color 0.2s ease;\n}\n.user-list-container[_ngcontent-%COMP%]   .pagination-info[_ngcontent-%COMP%]   .page-navigation[_ngcontent-%COMP%]   .mat-mdc-icon-button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n}\n.user-list-container[_ngcontent-%COMP%]   .pagination-info[_ngcontent-%COMP%]   .page-navigation[_ngcontent-%COMP%]   .current-page[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f3f4f6 0%,\n      #e5e7eb 100%);\n  border: 1px solid #d1d5db;\n  color: #374151;\n  font-weight: 600;\n}\n.user-list-container[_ngcontent-%COMP%]   .column-menu[_ngcontent-%COMP%] {\n  max-width: 320px;\n}\n.user-list-container[_ngcontent-%COMP%]   .column-menu[_ngcontent-%COMP%]   .column-search[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #e5e7eb;\n  margin-bottom: 8px;\n}\n.user-list-container[_ngcontent-%COMP%]   .column-menu[_ngcontent-%COMP%]   .column-list[_ngcontent-%COMP%] {\n  max-height: 300px;\n  overflow-y: auto;\n}\n.user-list-container[_ngcontent-%COMP%]   .column-menu[_ngcontent-%COMP%]   .column-list[_ngcontent-%COMP%]   .mat-mdc-checkbox[_ngcontent-%COMP%] {\n  margin: 4px 0;\n}\n.user-list-container[_ngcontent-%COMP%]   .column-menu[_ngcontent-%COMP%]   .column-list[_ngcontent-%COMP%]   .mat-mdc-checkbox[_ngcontent-%COMP%]   .mdc-checkbox[_ngcontent-%COMP%] {\n  padding: 8px;\n}\n.user-list-container[_ngcontent-%COMP%]   .column-menu[_ngcontent-%COMP%]   .column-list[_ngcontent-%COMP%]   .mat-mdc-checkbox[_ngcontent-%COMP%]   .mdc-form-field[_ngcontent-%COMP%] {\n  color: #374151;\n}\n.user-list-container[_ngcontent-%COMP%]   .bulk-actions[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #dbeafe 0%,\n      #bfdbfe 100%);\n  border: 1px solid #93c5fd;\n  border-radius: 8px;\n  padding: 8px 16px;\n}\n.user-list-container[_ngcontent-%COMP%]   .bulk-actions[_ngcontent-%COMP%]   .selected-count[_ngcontent-%COMP%] {\n  color: #1d4ed8;\n  font-weight: 600;\n}\n.user-list-container[_ngcontent-%COMP%]   .bulk-actions[_ngcontent-%COMP%]   .action-buttons[_ngcontent-%COMP%]   .mat-mdc-icon-button[_ngcontent-%COMP%] {\n  margin: 0 4px;\n}\n.user-list-container[_ngcontent-%COMP%]   .status-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 4px 8px;\n  border-radius: 12px;\n  font-size: 12px;\n  font-weight: 500;\n}\n.user-list-container[_ngcontent-%COMP%]   .status-badge.active[_ngcontent-%COMP%] {\n  background-color: #dcfce7;\n  color: #166534;\n  border: 1px solid #bbf7d0;\n}\n.user-list-container[_ngcontent-%COMP%]   .status-badge.inactive[_ngcontent-%COMP%] {\n  background-color: #fef2f2;\n  color: #dc2626;\n  border: 1px solid #fecaca;\n}\n.user-list-container[_ngcontent-%COMP%]   .role-badges[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 4px;\n}\n.user-list-container[_ngcontent-%COMP%]   .role-badges[_ngcontent-%COMP%]   .role-badge[_ngcontent-%COMP%] {\n  background-color: #dbeafe;\n  color: #1e40af;\n  padding: 2px 8px;\n  border-radius: 12px;\n  font-size: 11px;\n  font-weight: 500;\n  border: 1px solid #bfdbfe;\n}\n.user-list-container[_ngcontent-%COMP%]   .action-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n  justify-content: center;\n}\n.user-list-container[_ngcontent-%COMP%]   .action-buttons[_ngcontent-%COMP%]   .mat-mdc-icon-button[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n}\n.user-list-container[_ngcontent-%COMP%]   .action-buttons[_ngcontent-%COMP%]   .mat-mdc-icon-button[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n.user-list-container[_ngcontent-%COMP%]   .no-data-message[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 48px 24px;\n  color: #6b7280;\n}\n.user-list-container[_ngcontent-%COMP%]   .no-data-message[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  width: 48px;\n  height: 48px;\n  margin-bottom: 16px;\n  opacity: 0.5;\n}\n.user-list-container[_ngcontent-%COMP%]   .no-data-message[_ngcontent-%COMP%]   .message[_ngcontent-%COMP%] {\n  font-size: 16px;\n  margin-bottom: 16px;\n}\n@media (max-width: 768px) {\n  .user-list-container[_ngcontent-%COMP%]   .toolbar-section[_ngcontent-%COMP%]   .search-field[_ngcontent-%COMP%] {\n    min-width: 200px;\n  }\n  .user-list-container[_ngcontent-%COMP%]   .toolbar-section[_ngcontent-%COMP%]   .filter-controls[_ngcontent-%COMP%]   .mat-mdc-form-field[_ngcontent-%COMP%] {\n    width: 120px;\n  }\n  .user-list-container[_ngcontent-%COMP%]   .pagination-info[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 16px;\n    align-items: stretch;\n  }\n  .user-list-container[_ngcontent-%COMP%]   .pagination-info[_ngcontent-%COMP%]   .results-summary[_ngcontent-%COMP%] {\n    text-align: center;\n  }\n  .user-list-container[_ngcontent-%COMP%]   .pagination-info[_ngcontent-%COMP%]   .page-controls[_ngcontent-%COMP%] {\n    justify-content: center;\n  }\n  .user-list-container[_ngcontent-%COMP%]   .data-table-container[_ngcontent-%COMP%]   .mat-mdc-table[_ngcontent-%COMP%]   .mat-mdc-header-cell[_ngcontent-%COMP%], \n   .user-list-container[_ngcontent-%COMP%]   .data-table-container[_ngcontent-%COMP%]   .mat-mdc-table[_ngcontent-%COMP%]   .mat-mdc-cell[_ngcontent-%COMP%] {\n    padding: 8px 6px;\n    font-size: 13px;\n  }\n  .user-list-container[_ngcontent-%COMP%]   .data-table-container[_ngcontent-%COMP%]   .mat-mdc-table[_ngcontent-%COMP%]   .mat-mdc-header-cell.actions-column[_ngcontent-%COMP%], \n   .user-list-container[_ngcontent-%COMP%]   .data-table-container[_ngcontent-%COMP%]   .mat-mdc-table[_ngcontent-%COMP%]   .mat-mdc-cell.actions-column[_ngcontent-%COMP%] {\n    width: 120px;\n  }\n}\n@media (prefers-color-scheme: dark) {\n  .user-list-container[_ngcontent-%COMP%]   .data-table-container[_ngcontent-%COMP%]   .mat-mdc-table[_ngcontent-%COMP%] {\n    background: #1f2937;\n  }\n  .user-list-container[_ngcontent-%COMP%]   .data-table-container[_ngcontent-%COMP%]   .mat-mdc-table[_ngcontent-%COMP%]   .mat-mdc-header-row[_ngcontent-%COMP%] {\n    background-color: #374151;\n  }\n  .user-list-container[_ngcontent-%COMP%]   .data-table-container[_ngcontent-%COMP%]   .mat-mdc-table[_ngcontent-%COMP%]   .mat-mdc-header-cell[_ngcontent-%COMP%] {\n    color: #f9fafb;\n  }\n  .user-list-container[_ngcontent-%COMP%]   .data-table-container[_ngcontent-%COMP%]   .mat-mdc-table[_ngcontent-%COMP%]   .mat-mdc-row[_ngcontent-%COMP%] {\n    border-bottom-color: #374151;\n  }\n  .user-list-container[_ngcontent-%COMP%]   .data-table-container[_ngcontent-%COMP%]   .mat-mdc-table[_ngcontent-%COMP%]   .mat-mdc-row[_ngcontent-%COMP%]:hover {\n    background-color: #374151;\n  }\n  .user-list-container[_ngcontent-%COMP%]   .data-table-container[_ngcontent-%COMP%]   .mat-mdc-table[_ngcontent-%COMP%]   .mat-mdc-cell[_ngcontent-%COMP%] {\n    color: #e5e7eb;\n  }\n}\n/*# sourceMappingURL=listuser.component.css.map */"], changeDetection: 0 });
};
__decorate([
  memoize()
], ListUserComponent.prototype, "FilterHederColumn", null);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ListUserComponent, { className: "ListUserComponent", filePath: "src/app/admin/user/listuser/listuser.component.ts", lineNumber: 48 });
})();

export {
  UserGraphQLService,
  ListUserComponent
};
//# sourceMappingURL=chunk-2IBNXLC3.js.map
