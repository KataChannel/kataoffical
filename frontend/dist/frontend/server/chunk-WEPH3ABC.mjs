import './polyfills.server.mjs';
import {
  environment
} from "./chunk-QFPTY5IH.mjs";
import {
  StorageService
} from "./chunk-A6W66WDU.mjs";
import {
  Router
} from "./chunk-PLFAEF4K.mjs";
import {
  signal,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-4EQURZBD.mjs";
import {
  __async
} from "./chunk-FMEBT56H.mjs";

// src/app/admin/menu/menu/menu.service.ts
var MenuService = class _MenuService {
  _StorageService;
  router;
  constructor(_StorageService, router) {
    this._StorageService = _StorageService;
    this.router = router;
  }
  ListMenu = signal([]);
  DetailMenu = signal({});
  menuId = signal(null);
  setMenuId(id) {
    this.menuId.set(id);
  }
  // getListMenu(): Signal<any[]> {    
  //   return this.ListMenu;
  // }
  // getDetailMenu(): Signal<any | null> {
  //   return this.DetailMenu;
  // }
  CreateMenu(dulieu) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(dulieu)
        };
        const response = yield fetch(`${environment.APIURL}/menu`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        if (!response.ok) {
        }
        this.getAllMenu();
        this.menuId.set(data.id);
      } catch (error) {
        return console.error(error);
      }
    });
  }
  getAllMenu() {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this._StorageService.getItem("token")
          }
        };
        const response = yield fetch(`${environment.APIURL}/menu`, options);
        if (!response.ok) {
        }
        const data = yield response.json();
        this.ListMenu.set(data);
      } catch (error) {
        return console.error(error);
      }
    });
  }
  getTreeMenu(permissions) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(permissions)
        };
        const response = yield fetch(`${environment.APIURL}/menu/tree`, options);
        if (!response.ok) {
        }
        const data = yield response.json();
        this.ListMenu.set(data);
      } catch (error) {
        return console.error(error);
      }
    });
  }
  getMenuByid(id) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        };
        const response = yield fetch(`${environment.APIURL}/menu/${id}`, options);
        if (!response.ok) {
          if (response.status === 401) {
            const result = JSON.stringify({ code: response.status, title: "Vui l\xF2ng \u0111\u0103ng nh\u1EADp l\u1EA1i" });
            this.router.navigate(["/errorserver"], { queryParams: { data: result } });
          } else if (response.status === 403) {
            const result = JSON.stringify({ code: response.status, title: "B\u1EA1n kh\xF4ng c\xF3 quy\u1EC1n truy c\u1EADp" });
            this.router.navigate(["/errorserver"], { queryParams: { data: result } });
          } else if (response.status === 500) {
            const result = JSON.stringify({ code: response.status, title: "L\u1ED7i m\xE1y ch\u1EE7, vui l\xF2ng th\u1EED l\u1EA1i sau" });
            this.router.navigate(["/errorserver"], { queryParams: { data: result } });
          } else {
            const result = JSON.stringify({ code: response.status, title: "L\u1ED7i kh\xF4ng x\xE1c \u0111\u1ECBnh" });
            this.router.navigate(["/errorserver"], { queryParams: { data: result } });
          }
        }
        const data = yield response.json();
        this.DetailMenu.set(data);
      } catch (error) {
        return console.error(error);
      }
    });
  }
  updateMenu(dulieu) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(dulieu)
        };
        const response = yield fetch(`${environment.APIURL}/menu/${dulieu.id}`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        if (!response.ok) {
        }
        this.getAllMenu();
        this.getMenuByid(dulieu.id);
      } catch (error) {
        return console.error(error);
      }
    });
  }
  DeleteMenu(item) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        };
        const response = yield fetch(`${environment.APIURL}/menu/${item.id}`, options);
        if (!response.ok) {
          if (response.status === 401) {
            const result = JSON.stringify({ code: response.status, title: "Vui l\xF2ng \u0111\u0103ng nh\u1EADp l\u1EA1i" });
            this.router.navigate(["/errorserver"], { queryParams: { data: result } });
          } else if (response.status === 403) {
            const result = JSON.stringify({ code: response.status, title: "B\u1EA1n kh\xF4ng c\xF3 quy\u1EC1n truy c\u1EADp" });
            this.router.navigate(["/errorserver"], { queryParams: { data: result } });
          } else if (response.status === 500) {
            const result = JSON.stringify({ code: response.status, title: "L\u1ED7i m\xE1y ch\u1EE7, vui l\xF2ng th\u1EED l\u1EA1i sau" });
            this.router.navigate(["/errorserver"], { queryParams: { data: result } });
          } else {
            const result = JSON.stringify({ code: response.status, title: "L\u1ED7i kh\xF4ng x\xE1c \u0111\u1ECBnh" });
            this.router.navigate(["/errorserver"], { queryParams: { data: result } });
          }
        }
        this.getAllMenu();
      } catch (error) {
        return console.error(error);
      }
    });
  }
  updateOrder(dulieu) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(dulieu)
        };
        const response = yield fetch(`${environment.APIURL}/menu/reorder`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        if (!response.ok) {
        }
        this.getAllMenu();
        this.menuId.set(data.id);
      } catch (error) {
        return console.error(error);
      }
    });
  }
  static \u0275fac = function MenuService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MenuService)(\u0275\u0275inject(StorageService), \u0275\u0275inject(Router));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _MenuService, factory: _MenuService.\u0275fac, providedIn: "root" });
};

export {
  MenuService
};
//# sourceMappingURL=chunk-WEPH3ABC.mjs.map
