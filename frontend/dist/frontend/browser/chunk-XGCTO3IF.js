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
  isPlatformBrowser
} from "./chunk-E6DSVUBK.js";
import {
  BehaviorSubject,
  PLATFORM_ID,
  inject,
  of,
  signal,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-IHZ7YO24.js";
import {
  __async
} from "./chunk-SXK72SKC.js";

// src/app/shared/utils/auth.utils.ts
var AuthUtils = class {
  constructor() {
  }
  static isTokenExpired(token, offsetSeconds) {
    if (!token || token === "") {
      return true;
    }
    const date = this._getTokenExpirationDate(token);
    offsetSeconds = offsetSeconds || 0;
    if (date === null) {
      return true;
    }
    return !(date.valueOf() > (/* @__PURE__ */ new Date()).valueOf() + offsetSeconds * 1e3);
  }
  static _b64decode(str) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    let output = "";
    str = String(str).replace(/=+$/, "");
    if (str.length % 4 === 1) {
      throw new Error("The string to be decoded is not correctly encoded.");
    }
    for (let bc = 0, bs, buffer, idx = 0; buffer = str.charAt(idx++); ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer, bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0) {
      buffer = chars.indexOf(buffer);
    }
    return output;
  }
  static _b64DecodeUnicode(str) {
    return decodeURIComponent(Array.prototype.map.call(this._b64decode(str), (c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)).join(""));
  }
  static _urlBase64Decode(str) {
    let output = str.replace(/-/g, "+").replace(/_/g, "/");
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += "==";
        break;
      case 3:
        output += "=";
        break;
      default:
        throw Error("Illegal base64url string!");
    }
    return this._b64DecodeUnicode(output);
  }
  static _decodeToken(token) {
    if (!token) {
      return null;
    }
    const parts = token.split(".");
    if (parts.length !== 3) {
      throw new Error("Invalid JWT. Check for three parts and refer to https://jwt.io.");
    }
    const decoded = this._urlBase64Decode(parts[1]);
    if (!decoded) {
      throw new Error("Cannot decode the token.");
    }
    return JSON.parse(decoded);
  }
  static _getTokenExpirationDate(token) {
    const decodedToken = this._decodeToken(token);
    if (!decodedToken.hasOwnProperty("exp")) {
      return null;
    }
    const date = /* @__PURE__ */ new Date(0);
    date.setUTCSeconds(decodedToken.exp);
    return date;
  }
  static removeDuplicatePermissions(user) {
    const uniquePermissions = /* @__PURE__ */ new Map();
    user.roles.forEach((role) => {
      role.role.permissions.forEach((permission) => {
        if (!uniquePermissions.has(permission.permissionId)) {
          uniquePermissions.set(permission.permissionId, permission);
        }
      });
    });
    user.permissions = Array.from(uniquePermissions.values());
    return user;
  }
};

// src/app/admin/user/user.service.ts
var UserService = class _UserService {
  _StorageService;
  platformId;
  router;
  _secret;
  _authenticated = false;
  APIURL = environment.APIURL;
  isBrowser;
  constructor(_StorageService, platformId, router) {
    this._StorageService = _StorageService;
    this.platformId = platformId;
    this.router = router;
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  BASE_URL = `${environment.APIURL}/auth`;
  profile = signal({});
  ListUser = signal([]);
  DetailUser = signal({});
  userId = signal(null);
  setUserId(id) {
    this.userId.set(id);
  }
  permissionsSubject = new BehaviorSubject([]);
  permissions$ = this.permissionsSubject.asObservable();
  getAdmin() {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        };
        const response = yield fetch(`${environment.APIURL}/users/get/admin`, options);
        const data = yield response.json();
        return data;
      } catch (error) {
        return console.error(error);
      }
    });
  }
  CreateUser(dulieu) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(dulieu)
        };
        const response = yield fetch(`${environment.APIURL}/users`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        if (!response.ok) {
          this.handleError(response.status);
        }
        this.getAllUser();
        this.userId.set(data.id);
      } catch (error) {
        return console.error(error);
      }
    });
  }
  getAllUser() {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this._StorageService.getItem("token")
          }
        };
        const response = yield fetch(`${environment.APIURL}/users`, options);
        if (!response.ok) {
          this.handleError(response.status);
        }
        const data = yield response.json();
        this.ListUser.set(data);
      } catch (error) {
        return console.error(error);
      }
    });
  }
  getUserByid(id) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        };
        const response = yield fetch(`${environment.APIURL}/users/findid/${id}`, options);
        if (!response.ok) {
          this.handleError(response.status);
        }
        const data = yield response.json();
        this.DetailUser.set(data);
      } catch (error) {
        return console.error(error);
      }
    });
  }
  updateUser(dulieu) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(dulieu)
        };
        const response = yield fetch(`${environment.APIURL}/users/${dulieu.id}`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        if (!response.ok) {
          this.handleError(response.status);
        }
        this.getAllUser();
        this.getUserByid(dulieu.id);
      } catch (error) {
        return console.error(error);
      }
    });
  }
  assignRoleToUser(dulieu) {
    return __async(this, null, function* () {
      try {
        console.log(dulieu);
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(dulieu)
        };
        const response = yield fetch(`${environment.APIURL}/users/assign`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        if (!response.ok) {
          this.handleError(response.status);
        }
        this.getUserByid(dulieu.userId);
      } catch (error) {
        return console.error(error);
      }
    });
  }
  removeRoleFromUser(dulieu) {
    return __async(this, null, function* () {
      try {
        console.log(dulieu);
        const options = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(dulieu)
        };
        const response = yield fetch(`${environment.APIURL}/users/remove`, options);
        if (!response.ok) {
        }
        console.log(dulieu);
        this.getUserByid(dulieu.userId);
      } catch (error) {
        return console.error(error);
      }
    });
  }
  DeleteUser(item) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        };
        const response = yield fetch(`${environment.APIURL}/users/${item.id}`, options);
        if (!response.ok) {
          this.handleError(response.status);
        }
        this.getAllUser();
      } catch (error) {
        return console.error(error);
      }
    });
  }
  changepass(data) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        };
        const response = yield fetch(`${environment.APIURL}/users/changepass`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = yield response.json();
        return result;
      } catch (error) {
        return console.error(error);
      }
    });
  }
  Randompass(data) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        };
        const response = yield fetch(`${environment.APIURL}/auth/randompass`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log(data);
        return data;
      } catch (error) {
        return console.error(error);
      }
    });
  }
  getProfile() {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this._StorageService.getItem("token")
          }
        };
        const response = yield fetch(`${environment.APIURL}/users/profile`, options);
        if (!response.ok) {
          console.log(response.status);
          this.handleError(response.status);
        }
        const data = yield response.json();
        const permissions = data.permissions.map((p) => p.name);
        this.profile.set(data);
        if (permissions.length > 0) {
          this._StorageService.setItem("permissions", JSON.stringify(permissions));
        }
        return data;
      } catch (error) {
        return console.error(error);
      }
    });
  }
  set accessToken(token) {
    if (this.isBrowser) {
      this._StorageService.setItem("token", token);
    }
  }
  get accessToken() {
    return this.isBrowser ? this._StorageService.getItem("token") ?? "" : "";
  }
  login(user) {
    return __async(this, null, function* () {
      if (this._authenticated) {
        return of([false, "User \u0110\xE3 \u0110\u0103ng Nh\u1EADp"]);
      }
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(user)
        };
        const response = yield fetch(`${environment.APIURL}/auth/login`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        if (data) {
          this._authenticated = true;
          this.accessToken = data.access_token;
          this._StorageService.setItem("permissions", JSON.stringify(data?.user?.permissions || []));
          this.permissionsSubject.next(data?.user?.permissions);
          return [true, data];
        }
        return [false, "\u0110\u0103ng Nh\u1EADp Th\u1EA5t B\u1EA1i"];
      } catch (error) {
        return console.error(error);
      }
    });
  }
  loadPermissions() {
    const permissions = this._StorageService.getItem("permissions");
    this.permissionsSubject.next(permissions);
    return permissions;
  }
  hasPermission(permission) {
    if (!this.permissionsSubject?.getValue()) {
      this.logout();
    }
    return this.permissionsSubject?.getValue()?.includes(permission);
  }
  register(user) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(user)
        };
        const response = yield fetch(`${environment.APIURL}/users/register`, options);
        if (!response.ok) {
          this.handleError(response.status);
        }
        const data = yield response.json();
        console.log(data);
        return data;
      } catch (error) {
        return console.error(error);
      }
    });
  }
  LoginByGoogle(user) {
    return __async(this, null, function* () {
      if (this._authenticated) {
        return of([false, "User \u0110\xE3 \u0110\u0103ng Nh\u1EADp"]);
      }
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(user)
        };
        const response = yield fetch(`${environment.APIURL}/users/loginbygoogle`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        this._authenticated = true;
        this.accessToken = data[1].access_token;
        console.log(data);
        return [true, this.accessToken];
      } catch (error) {
        return console.error(error);
      }
    });
  }
  checkDangnhap() {
    if (this._authenticated) {
      return of(true);
    }
    if (!this.accessToken || this.accessToken === "undefined") {
      if (this.isBrowser) {
        this._StorageService.removeItem("token");
      }
      return of(false);
    }
    if (AuthUtils.isTokenExpired(this.accessToken)) {
      return of(false);
    }
    return of(true);
  }
  loginWithGoogle() {
    window.location.href = `${this.BASE_URL}/google`;
  }
  loginWithFacebook() {
    window.location.href = `${this.BASE_URL}/facebook`;
  }
  loginWithZalo() {
    window.location.href = `${this.BASE_URL}/zalo`;
  }
  handleOAuthCallback(token) {
    localStorage.setItem("access_token", token);
    this.router.navigate(["/dashboard"]);
  }
  getToken() {
    return this._StorageService.getItem("token");
  }
  logout() {
    return __async(this, null, function* () {
      this._StorageService.removeItem("token");
      this._StorageService.removeItem("permissions");
      this.permissionsSubject.next([]);
      this.router.navigate(["/"]);
      return true;
    });
  }
  _snackBar = inject(MatSnackBar);
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
  }
  static \u0275fac = function UserService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UserService)(\u0275\u0275inject(StorageService), \u0275\u0275inject(PLATFORM_ID), \u0275\u0275inject(Router));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _UserService, factory: _UserService.\u0275fac, providedIn: "root" });
};

export {
  UserService
};
//# sourceMappingURL=chunk-XGCTO3IF.js.map
