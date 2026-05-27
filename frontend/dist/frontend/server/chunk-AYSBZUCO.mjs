import './polyfills.server.mjs';
import {
  Router
} from "./chunk-TLYIA537.mjs";
import {
  GraphqlService
} from "./chunk-SLWHV4LF.mjs";
import {
  StorageService
} from "./chunk-A5AQV4K7.mjs";
import {
  Apollo
} from "./chunk-ZZDECD7O.mjs";
import {
  MatSnackBar
} from "./chunk-AF3EHXCM.mjs";
import {
  inject,
  signal,
  ɵɵdefineInjectable
} from "./chunk-I6KZCWLZ.mjs";
import {
  __async,
  __spreadValues
} from "./chunk-FMEBT56H.mjs";

// src/app/admin/role/role.service.ts
var RoleService = class _RoleService {
  graphqlService = inject(GraphqlService);
  storageService = inject(StorageService);
  snackBar = inject(MatSnackBar);
  apollo = inject(Apollo);
  router = inject(Router);
  modelName = "Role";
  ListRole = signal([]);
  DetailRole = signal(null);
  roleId = signal(null);
  isLoading = signal(false);
  constructor() {
  }
  setRoleId(id) {
    this.roleId.set(id);
  }
  CreateRole(dulieu) {
    return __async(this, null, function* () {
      try {
        this.isLoading.set(true);
        const result = yield this.graphqlService.createOne(this.modelName, dulieu, {
          select: {
            id: true,
            name: true,
            createdAt: true,
            updatedAt: true
          }
        });
        console.log(result);
        if (result) {
          this.showSuccessMessage("T\u1EA1o role th\xE0nh c\xF4ng");
          const currentRoles = this.ListRole();
          this.ListRole.set([result, ...currentRoles]);
          this.roleId.set(result.id);
          return true;
        }
        return false;
      } catch (error) {
        console.error("Error creating role:", error);
        this.handleCreateUpdateError(error, "t\u1EA1o");
        return false;
      } finally {
        this.isLoading.set(false);
      }
    });
  }
  getAllRole() {
    return __async(this, null, function* () {
      try {
        this.isLoading.set(true);
        const result = yield this.graphqlService.findMany(this.modelName, {
          orderBy: { createdAt: "desc" },
          include: {
            permissions: {
              include: {
                permission: {
                  select: {
                    id: true,
                    name: true,
                    description: true,
                    group: true
                  }
                }
              }
            }
          }
        });
        if (result) {
          this.ListRole.set(result);
          return result;
        }
        return [];
      } catch (error) {
        console.error("Error getting roles:", error);
        this.showErrorMessage("L\u1ED7i khi t\u1EA3i danh s\xE1ch role");
        return [];
      } finally {
        this.isLoading.set(false);
      }
    });
  }
  getRoleByid(id) {
    return __async(this, null, function* () {
      try {
        this.isLoading.set(true);
        const result = yield this.graphqlService.findUnique(this.modelName, { id }, {
          include: {
            permissions: {
              include: {
                permission: {
                  select: {
                    id: true,
                    name: true,
                    description: true,
                    group: true,
                    codeId: true
                  }
                }
              }
            }
          }
        });
        if (result) {
          this.DetailRole.set(result);
          return result;
        }
        return null;
      } catch (error) {
        console.error("Error getting role by id:", error);
        this.handleError(error);
        return null;
      } finally {
        this.isLoading.set(false);
      }
    });
  }
  updateRole(dulieu) {
    return __async(this, null, function* () {
      try {
        this.isLoading.set(true);
        const result = yield this.graphqlService.updateOne(this.modelName, { id: dulieu.id }, {
          name: dulieu.name
        }, {
          select: {
            id: true,
            name: true,
            createdAt: true,
            updatedAt: true
          }
        });
        if (result) {
          this.showSuccessMessage("C\u1EADp nh\u1EADt role th\xE0nh c\xF4ng");
          const currentRoles = this.ListRole();
          const updatedRoles = currentRoles.map((role) => role.id === result.id ? __spreadValues(__spreadValues({}, role), result) : role);
          this.ListRole.set(updatedRoles);
          const currentDetail = this.DetailRole();
          if (currentDetail?.id === result.id) {
            this.DetailRole.set(__spreadValues(__spreadValues({}, currentDetail), result));
          }
          return true;
        }
        return false;
      } catch (error) {
        console.error("Error updating role:", error);
        this.handleCreateUpdateError(error, "c\u1EADp nh\u1EADt");
        return false;
      } finally {
        this.isLoading.set(false);
      }
    });
  }
  assignPermissionToRole(data) {
    return __async(this, null, function* () {
      try {
        const result = yield this.graphqlService.createOne("RolePermission", {
          roleId: data.roleId,
          permissionId: data.permissionId
        });
        if (result) {
          this.showSuccessMessage("G\xE1n quy\u1EC1n th\xE0nh c\xF4ng");
          const currentDetail = this.DetailRole();
          if (currentDetail?.id === data.roleId) {
            yield this.getRoleByid(data.roleId);
          }
          return true;
        }
        return false;
      } catch (error) {
        console.error("Error assigning permission:", error);
        this.handlePermissionError(error, "g\xE1n");
        return false;
      }
    });
  }
  removePermissionFromRole(data) {
    return __async(this, null, function* () {
      try {
        const result = yield this.graphqlService.deleteOne("RolePermission", {
          roleId: data.roleId,
          permissionId: data.permissionId
        });
        if (result) {
          this.showSuccessMessage("X\xF3a quy\u1EC1n th\xE0nh c\xF4ng");
          const currentDetail = this.DetailRole();
          if (currentDetail?.id === data.roleId) {
            yield this.getRoleByid(data.roleId);
          }
          return true;
        }
        return false;
      } catch (error) {
        console.error("Error removing permission:", error);
        this.handlePermissionError(error, "x\xF3a");
        return false;
      }
    });
  }
  DeleteRole(item) {
    return __async(this, null, function* () {
      try {
        this.isLoading.set(true);
        const result = yield this.graphqlService.deleteOne(this.modelName, { id: item.id });
        if (result) {
          this.showSuccessMessage("X\xF3a role th\xE0nh c\xF4ng");
          yield this.getAllRole();
          return true;
        }
        return false;
      } catch (error) {
        console.error("Error deleting role:", error);
        this.handleError(error);
        return false;
      } finally {
        this.isLoading.set(false);
      }
    });
  }
  // Helper methods
  showSuccessMessage(message) {
    this.snackBar.open(message, "\u0110\xF3ng", {
      duration: 3e3,
      horizontalPosition: "center",
      verticalPosition: "top",
      panelClass: ["snackbar-success"]
    });
  }
  showErrorMessage(message) {
    this.snackBar.open(message, "\u0110\xF3ng", {
      duration: 5e3,
      horizontalPosition: "center",
      verticalPosition: "top",
      panelClass: ["snackbar-error"]
    });
  }
  /**
   * Handle specific errors for Create and Update operations
   */
  handleCreateUpdateError(error, operation) {
    console.error(`Error ${operation} role:`, error);
    let errorMessage = "";
    if (error?.message) {
      errorMessage = error.message;
    } else if (error?.error?.message) {
      errorMessage = error.error.message;
    } else if (error?.graphQLErrors?.[0]?.message) {
      errorMessage = error.graphQLErrors[0].message;
    } else if (typeof error === "string") {
      errorMessage = error;
    }
    console.log("Processed error message:", errorMessage);
    this.showErrorMessage(`T\xEAn role n\xE0y \u0111\xE3 t\u1ED3n t\u1EA1i. Vui l\xF2ng ch\u1ECDn t\xEAn kh\xE1c.`);
    if (this.isUniqueConstraintError(errorMessage, "name")) {
      this.showErrorMessage(`T\xEAn role n\xE0y \u0111\xE3 t\u1ED3n t\u1EA1i. Vui l\xF2ng ch\u1ECDn t\xEAn kh\xE1c.`);
      return;
    }
    if (this.isUniqueConstraintError(errorMessage)) {
      this.showErrorMessage(`Th\xF4ng tin n\xE0y \u0111\xE3 t\u1ED3n t\u1EA1i trong h\u1EC7 th\u1ED1ng. Vui l\xF2ng ki\u1EC3m tra l\u1EA1i.`);
      return;
    }
    if (this.isValidationError(errorMessage)) {
      this.showErrorMessage(`D\u1EEF li\u1EC7u kh\xF4ng h\u1EE3p l\u1EC7. Vui l\xF2ng ki\u1EC3m tra l\u1EA1i th\xF4ng tin.`);
      return;
    }
    this.showErrorMessage(`L\u1ED7i khi ${operation} role. Vui l\xF2ng th\u1EED l\u1EA1i.`);
  }
  /**
   * Check if error is unique constraint violation
   */
  isUniqueConstraintError(errorMessage, field) {
    const uniqueKeywords = [
      "Unique constraint failed",
      "unique constraint",
      "UNIQUE constraint",
      "duplicate key",
      "already exists"
    ];
    const hasUniqueError = uniqueKeywords.some((keyword) => errorMessage.toLowerCase().includes(keyword.toLowerCase()));
    if (!hasUniqueError)
      return false;
    if (field) {
      const fieldPattern = new RegExp(`\\(\`${field}\`\\)|${field}`, "i");
      return fieldPattern.test(errorMessage);
    }
    return true;
  }
  /**
   * Check if error is validation error
   */
  isValidationError(errorMessage) {
    const validationKeywords = [
      "validation failed",
      "invalid input",
      "required field",
      "field is required",
      "invalid value"
    ];
    return validationKeywords.some((keyword) => errorMessage.toLowerCase().includes(keyword.toLowerCase()));
  }
  /**
   * Handle specific errors for Permission operations
   */
  handlePermissionError(error, operation) {
    console.error(`Error ${operation} permission:`, error);
    let errorMessage = "";
    if (error?.message) {
      errorMessage = error.message;
    } else if (error?.error?.message) {
      errorMessage = error.error.message;
    } else if (error?.graphQLErrors?.[0]?.message) {
      errorMessage = error.graphQLErrors[0].message;
    } else if (typeof error === "string") {
      errorMessage = error;
    }
    console.log("Permission error message:", errorMessage);
    if (this.isUniqueConstraintError(errorMessage)) {
      if (operation === "g\xE1n") {
        this.showErrorMessage("Quy\u1EC1n n\xE0y \u0111\xE3 \u0111\u01B0\u1EE3c g\xE1n cho role. Kh\xF4ng th\u1EC3 g\xE1n l\u1EA1i.");
      } else {
        this.showErrorMessage("L\u1ED7i tr\xF9ng l\u1EB7p khi thao t\xE1c v\u1EDBi quy\u1EC1n.");
      }
      return;
    }
    if (this.isForeignKeyError(errorMessage)) {
      this.showErrorMessage("Role ho\u1EB7c Permission kh\xF4ng t\u1ED3n t\u1EA1i. Vui l\xF2ng ki\u1EC3m tra l\u1EA1i.");
      return;
    }
    if (this.isNotFoundError(errorMessage)) {
      if (operation === "x\xF3a") {
        this.showErrorMessage("Quy\u1EC1n n\xE0y ch\u01B0a \u0111\u01B0\u1EE3c g\xE1n cho role.");
      } else {
        this.showErrorMessage("Kh\xF4ng t\xECm th\u1EA5y th\xF4ng tin c\u1EA7n thi\u1EBFt.");
      }
      return;
    }
    this.showErrorMessage(`L\u1ED7i khi ${operation} quy\u1EC1n. Vui l\xF2ng th\u1EED l\u1EA1i.`);
  }
  /**
   * Check if error is foreign key constraint violation
   */
  isForeignKeyError(errorMessage) {
    const foreignKeyKeywords = [
      "foreign key constraint",
      "foreign key",
      "reference constraint",
      "violates foreign key"
    ];
    return foreignKeyKeywords.some((keyword) => errorMessage.toLowerCase().includes(keyword.toLowerCase()));
  }
  /**
   * Check if error is not found error
   */
  isNotFoundError(errorMessage) {
    const notFoundKeywords = [
      "not found",
      "does not exist",
      "record not found",
      "no record found"
    ];
    return notFoundKeywords.some((keyword) => errorMessage.toLowerCase().includes(keyword.toLowerCase()));
  }
  handleError(error) {
    console.error("Service error:", error);
    if (error.status === 401) {
      const result = JSON.stringify({
        code: error.status,
        title: "Vui l\xF2ng \u0111\u0103ng nh\u1EADp l\u1EA1i"
      });
      this.router.navigate(["/errorserver"], {
        queryParams: { data: result }
      });
    } else if (error.status === 403) {
      const result = JSON.stringify({
        code: error.status,
        title: "B\u1EA1n kh\xF4ng c\xF3 quy\u1EC1n truy c\u1EADp"
      });
      this.router.navigate(["/errorserver"], {
        queryParams: { data: result }
      });
    } else if (error.status === 500) {
      const result = JSON.stringify({
        code: error.status,
        title: "L\u1ED7i m\xE1y ch\u1EE7, vui l\xF2ng th\u1EED l\u1EA1i sau"
      });
      this.router.navigate(["/errorserver"], {
        queryParams: { data: result }
      });
    } else {
      this.showErrorMessage("L\u1ED7i kh\xF4ng x\xE1c \u0111\u1ECBnh");
    }
  }
  static \u0275fac = function RoleService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RoleService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _RoleService, factory: _RoleService.\u0275fac, providedIn: "root" });
};

export {
  RoleService
};
//# sourceMappingURL=chunk-AYSBZUCO.mjs.map
