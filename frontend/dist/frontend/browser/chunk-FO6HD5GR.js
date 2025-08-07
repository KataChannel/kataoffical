import {
  ErrorLogService
} from "./chunk-UV2EYCAL.js";
import {
  environment
} from "./chunk-U3IXXJDR.js";
import {
  MatSnackBar,
  StorageService
} from "./chunk-WD36GM3Q.js";
import {
  Router
} from "./chunk-JGMWTFVW.js";
import {
  inject,
  signal,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-IHZ7YO24.js";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-SXK72SKC.js";

// src/app/admin/permission/permission.service.ts
var PermissionService = class _PermissionService {
  _StorageService;
  router;
  _ErrorLogService;
  constructor(_StorageService, router, _ErrorLogService) {
    this._StorageService = _StorageService;
    this.router = router;
    this._ErrorLogService = _ErrorLogService;
  }
  _snackBar = inject(MatSnackBar);
  ListPermission = signal([]);
  DetailPermission = signal({});
  page = signal(1);
  pageCount = signal(1);
  total = signal(0);
  pageSize = signal(10);
  // Mặc định 10 mục mỗi trang
  permissionId = signal(null);
  setPermissionId(id) {
    this.permissionId.set(id);
  }
  CreatePermission(dulieu) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this._StorageService.getItem("token")}`
          },
          body: JSON.stringify(dulieu)
        };
        const response = yield fetch(`${environment.APIURL}/permission`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        this.getAllPermission(this.pageSize());
        this.permissionId.set(data.id);
      } catch (error) {
        this._ErrorLogService.logError("Failed to CreatePermission", error);
        console.error(error);
      }
    });
  }
  getAllPermission() {
    return __async(this, arguments, function* (pageSize = this.pageSize(), forceRefresh = false) {
      this.pageSize.set(pageSize);
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this._StorageService.getItem("token")}`
          }
        };
        const query = new URLSearchParams({
          page: this.page().toString(),
          limit: pageSize.toString()
        });
        const response = yield fetch(`${environment.APIURL}/permission?${query}`, options);
        if (!response.ok) {
          this.handleError(response.status);
        }
        const data = yield response.json();
        this.ListPermission.set(data.data);
        this.page.set(data.page || 1);
        this.pageCount.set(data.pageCount || 1);
        this.total.set(data.total || data.data.length);
        this.pageSize.set(pageSize);
        return data.data;
      } catch (error) {
        console.error(error);
      }
    });
  }
  getUpdatedCodeIds() {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this._StorageService.getItem("token")}`
          }
        };
        const response = yield fetch(`${environment.APIURL}/permission/updateCodeIds`, options);
        if (!response.ok) {
          this.handleError(response.status);
        }
        const data = yield response.json();
        this.getAllPermission(this.pageSize());
        return data.data;
      } catch (error) {
        this._ErrorLogService.logError("Failed to getUpdatedCodeIds", error);
        console.error(error);
      }
    });
  }
  getPermissionBy(_0) {
    return __async(this, arguments, function* (param, pageSize = this.pageSize()) {
      this.pageSize.set(pageSize);
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this._StorageService.getItem("token")}`
          },
          body: JSON.stringify(__spreadProps(__spreadValues({}, param), { page: this.page(), limit: pageSize }))
        };
        const response = yield fetch(`${environment.APIURL}/permission/findby`, options);
        if (!response.ok) {
          this.handleError(response.status);
        }
        const data = yield response.json();
        if (param.isOne === true) {
          this.DetailPermission.set(data);
        } else {
          this._StorageService.setItem("permissions_updatedAt", (/* @__PURE__ */ new Date()).toISOString());
          this.ListPermission.set(data.data);
          this.page.set(data.page || 1);
          this.pageCount.set(data.pageCount || 1);
          this.total.set(data.total || data.data.length);
          this.pageSize.set(pageSize);
        }
      } catch (error) {
        console.error(error);
      }
    });
  }
  updatePermission(dulieu) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this._StorageService.getItem("token")}`
          },
          body: JSON.stringify(dulieu)
        };
        const response = yield fetch(`${environment.APIURL}/permission/${dulieu.id}`, options);
        if (!response.ok) {
          this.handleError(response.status);
        }
        const data = yield response.json();
        this.getAllPermission(this.pageSize());
        this.getPermissionBy({ id: data.id, isOne: true }, this.pageSize());
      } catch (error) {
        this._ErrorLogService.logError("Failed to updatePermission", error);
        console.error(error);
      }
    });
  }
  DeletePermission(item) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this._StorageService.getItem("token")}`
          }
        };
        const response = yield fetch(`${environment.APIURL}/permission/${item.id}`, options);
        if (!response.ok) {
          this.handleError(response.status);
        }
        this.getAllPermission(this.pageSize());
      } catch (error) {
        this._ErrorLogService.logError("Failed to DeletePermission", error);
        console.error(error);
      }
    });
  }
  handleError(status) {
    let message = "L\u1ED7i kh\xF4ng x\xE1c \u0111\u1ECBnh";
    switch (status) {
      case 400:
        message = "Th\xF4ng tin \u0111\xE3 t\u1ED3n t\u1EA1i";
        break;
      case 401:
      case 404:
        message = "Vui l\xF2ng \u0111\u0103ng nh\u1EADp l\u1EA1i";
        break;
      case 403:
        message = "B\u1EA1n kh\xF4ng c\xF3 quy\u1EC1n truy c\u1EADp";
        break;
      case 500:
        message = "L\u1ED7i m\xE1y ch\u1EE7, vui l\xF2ng th\u1EED l\u1EA1i sau";
        break;
    }
    this._snackBar.open(message, "", {
      duration: 1e3,
      horizontalPosition: "end",
      verticalPosition: "top",
      panelClass: ["snackbar-error"]
    });
  }
  static \u0275fac = function PermissionService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PermissionService)(\u0275\u0275inject(StorageService), \u0275\u0275inject(Router), \u0275\u0275inject(ErrorLogService));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PermissionService, factory: _PermissionService.\u0275fac, providedIn: "root" });
};

export {
  PermissionService
};
//# sourceMappingURL=chunk-FO6HD5GR.js.map
