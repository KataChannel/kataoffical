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
  inject,
  signal,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-IHZ7YO24.js";
import {
  __async
} from "./chunk-SXK72SKC.js";

// src/app/admin/userguide/userguide.service.ts
var UserguideService = class _UserguideService {
  _StorageService;
  _ErrorLogService;
  _snackBar;
  constructor(_StorageService, _ErrorLogService, _snackBar = inject(MatSnackBar)) {
    this._StorageService = _StorageService;
    this._ErrorLogService = _ErrorLogService;
    this._snackBar = _snackBar;
  }
  ListUserguide = signal([]);
  DetailUserguide = signal({});
  userguideId = signal(null);
  setUserguideId(id) {
    this.userguideId.set(id);
  }
  CreateUserguide(dulieu) {
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
        const response = yield fetch(`${environment.APIURL}/userguide`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        if (!response.ok) {
          this.handleError(response.status);
        }
        this.getAllUserguide();
        this.userguideId.set(data.id);
      } catch (error) {
        this._ErrorLogService.logError("Failed to CreateUserguide", error);
        return console.error(error);
      }
    });
  }
  getAllUserguide() {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        };
        const response = yield fetch(`${environment.APIURL}/userguide`, options);
        if (!response.ok) {
          this.handleError(response.status);
        }
        const data = yield response.json();
        this.ListUserguide.set(data.data);
        return data.data;
      } catch (error) {
        console.error(error);
      }
    });
  }
  getUserguideBy(param) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this._StorageService.getItem("token")}`
          },
          body: JSON.stringify(param)
        };
        const response = yield fetch(`${environment.APIURL}/userguide/findby`, options);
        if (!response.ok) {
          this.handleError(response.status);
        }
        const data = yield response.json();
        this.DetailUserguide.set(data.data[0]);
      } catch (error) {
        this._ErrorLogService.logError("Failed to getUserguideBy", error);
        return console.error(error);
      }
    });
  }
  updateUserguide(dulieu) {
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
        const response = yield fetch(`${environment.APIURL}/userguide/${dulieu.id}`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        if (!response.ok) {
          this.handleError(response.status);
        }
        yield this.getAllUserguide();
      } catch (error) {
        this._ErrorLogService.logError("Failed to updateUserguide", error);
        return console.error(error);
      }
    });
  }
  DeleteUserguide(item) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        };
        const response = yield fetch(`${environment.APIURL}/userguide/${item.id}`, options);
        if (!response.ok) {
          this.handleError(response.status);
        }
        this.getAllUserguide();
      } catch (error) {
        this._ErrorLogService.logError("Failed to DeleteUserguide", error);
        return console.error(error);
      }
    });
  }
  handleError(status) {
    let message = "L\u1ED7i kh\xF4ng x\xE1c \u0111\u1ECBnh";
    switch (status) {
      case 400:
        message = "Th\xF4ng tin \u0111\xE3 t\u1ED3n t\u1EA1i";
        this._snackBar.open(message, "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
        break;
      case 404:
        message = "Vui l\xF2ng \u0111\u0103ng nh\u1EADp l\u1EA1i";
        break;
      case 401:
        message = "Vui l\xF2ng \u0111\u0103ng nh\u1EADp l\u1EA1i";
        break;
      case 403:
        message = "B\u1EA1n kh\xF4ng c\xF3 quy\u1EC1n truy c\u1EADp";
        this._snackBar.open(message, "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
        break;
      case 500:
        message = "L\u1ED7i m\xE1y ch\u1EE7, vui l\xF2ng th\u1EED l\u1EA1i sau";
        this._snackBar.open(message, "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
        break;
      default:
        this._snackBar.open(message, "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
        break;
    }
    const result = JSON.stringify({ code: status, title: message });
  }
  static \u0275fac = function UserguideService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UserguideService)(\u0275\u0275inject(StorageService), \u0275\u0275inject(ErrorLogService), \u0275\u0275inject(MatSnackBar));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _UserguideService, factory: _UserguideService.\u0275fac, providedIn: "root" });
};

export {
  UserguideService
};
//# sourceMappingURL=chunk-YSHAUWVW.js.map
