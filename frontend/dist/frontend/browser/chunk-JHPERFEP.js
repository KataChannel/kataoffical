import {
  environment
} from "./chunk-U3IXXJDR.js";
import {
  StorageService
} from "./chunk-WD36GM3Q.js";
import {
  Router
} from "./chunk-JGMWTFVW.js";
import {
  signal,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-IHZ7YO24.js";
import {
  __async
} from "./chunk-SXK72SKC.js";

// src/app/admin/phieukho/phieukho.service.ts
var PhieukhoService = class _PhieukhoService {
  _StorageService;
  router;
  constructor(_StorageService, router) {
    this._StorageService = _StorageService;
    this.router = router;
  }
  ListPhieukho = signal([]);
  DetailPhieukho = signal({});
  phieukhoId = signal(null);
  setPhieukhoId(id) {
    this.phieukhoId.set(id);
  }
  // getListPhieukho(): Signal<any[]> {    
  //   return this.ListPhieukho;
  // }
  // getDetailPhieukho(): Signal<any | null> {
  //   return this.DetailPhieukho;
  // }
  CreatePhieukho(dulieu) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(dulieu)
        };
        const response = yield fetch(`${environment.APIURL}/phieukho`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        if (!response.ok) {
        }
        this.getAllPhieukho();
        this.phieukhoId.set(data.id);
      } catch (error) {
        return console.error(error);
      }
    });
  }
  getAllPhieukho() {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this._StorageService.getItem("token")
          }
        };
        const response = yield fetch(`${environment.APIURL}/phieukho`, options);
        if (!response.ok) {
        }
        const data = yield response.json();
        this.ListPhieukho.set(data);
      } catch (error) {
        return console.error(error);
      }
    });
  }
  getPhieukhoByid(id) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        };
        const response = yield fetch(`${environment.APIURL}/phieukho/findid/${id}`, options);
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
        this.DetailPhieukho.set(data);
      } catch (error) {
        return console.error(error);
      }
    });
  }
  getxuatnhapton(query) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(query)
        };
        const response = yield fetch(`${environment.APIURL}/phieukho/xuatnhapton`, options);
        if (!response.ok) {
        }
        const data = yield response.json();
        this.ListPhieukho.set(data);
      } catch (error) {
        return console.error(error);
      }
    });
  }
  updatePhieukho(dulieu) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(dulieu)
        };
        const response = yield fetch(`${environment.APIURL}/phieukho/${dulieu.id}`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        if (!response.ok) {
        }
        this.getAllPhieukho();
        this.getPhieukhoByid(dulieu.id);
      } catch (error) {
        return console.error(error);
      }
    });
  }
  DeletePhieukho(item) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        };
        const response = yield fetch(`${environment.APIURL}/phieukho/${item.id}`, options);
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
        this.getAllPhieukho();
      } catch (error) {
        return console.error(error);
      }
    });
  }
  static \u0275fac = function PhieukhoService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PhieukhoService)(\u0275\u0275inject(StorageService), \u0275\u0275inject(Router));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PhieukhoService, factory: _PhieukhoService.\u0275fac, providedIn: "root" });
};

export {
  PhieukhoService
};
//# sourceMappingURL=chunk-JHPERFEP.js.map
