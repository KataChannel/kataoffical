import './polyfills.server.mjs';
import {
  require_moment
} from "./chunk-TEMMKMG5.mjs";
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
  __async,
  __spreadValues,
  __toESM
} from "./chunk-FMEBT56H.mjs";

// src/app/admin/dathang/dathang.service.ts
var import_moment = __toESM(require_moment());
var DathangService = class _DathangService {
  _StorageService;
  router;
  constructor(_StorageService, router) {
    this._StorageService = _StorageService;
    this.router = router;
  }
  ListDathang = signal([]);
  DetailDathang = signal({});
  page = signal(1);
  pageCount = signal(1);
  total = signal(0);
  pageSize = signal(50);
  // Mặc định 10 mục mỗi trang
  dathangId = signal(null);
  setDathangId(id) {
    this.dathangId.set(id);
  }
  // getListDathang(): Signal<any[]> {    
  //   return this.ListDathang;
  // }
  // getDetailDathang(): Signal<any | null> {
  //   return this.DetailDathang;
  // }  
  ImportDathang(dulieu) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(dulieu)
        };
        const response = yield fetch(`${environment.APIURL}/dathang/import`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        if (!response.ok) {
          console.log(response.status);
        }
        return data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    });
  }
  CreateDathang(dulieu) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(dulieu)
        };
        const response = yield fetch(`${environment.APIURL}/dathang`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        if (!response.ok) {
        }
        this.getAllDathang();
        this.dathangId.set(data.id);
      } catch (error) {
        return console.error(error);
      }
    });
  }
  CreateByNhucau(dulieu) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(dulieu)
        };
        const response = yield fetch(`${environment.APIURL}/dathang/bynhucau`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        if (!response.ok) {
        }
        this.getAllDathang();
        this.dathangId.set(data.id);
      } catch (error) {
        return console.error(error);
      }
    });
  }
  getSLChonhap(SearchParams) {
    return __async(this, null, function* () {
      const payload = __spreadValues({}, SearchParams);
      payload.Batdau = (0, import_moment.default)(payload.Batdau).utc();
      payload.Ketthuc = (0, import_moment.default)(payload.Ketthuc).utc();
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this._StorageService.getItem("token")
          },
          body: JSON.stringify(payload)
        };
        const response = yield fetch(`${environment.APIURL}/dathang/getchonhap`, options);
        if (!response.ok) {
        }
        const data = yield response.json();
        return data;
      } catch (error) {
        return console.error(error);
      }
    });
  }
  searchDathang(SearchParams) {
    return __async(this, null, function* () {
      const payload = __spreadValues({}, SearchParams);
      payload.Batdau = (0, import_moment.default)(payload.Batdau).utc();
      payload.Ketthuc = (0, import_moment.default)(payload.Ketthuc).utc();
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this._StorageService.getItem("token")
          },
          body: JSON.stringify(payload)
        };
        const response = yield fetch(`${environment.APIURL}/dathang/search`, options);
        if (!response.ok) {
        }
        const data = yield response.json();
        this.ListDathang.set(data.data);
        return data;
      } catch (error) {
        return console.error(error);
      }
    });
  }
  getAllDathang() {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this._StorageService.getItem("token")
          }
        };
        const response = yield fetch(`${environment.APIURL}/dathang?`, options);
        if (!response.ok) {
        }
        const data = yield response.json();
        this.ListDathang.set(data);
        return data;
      } catch (error) {
        return console.error(error);
      }
    });
  }
  getDathangByid(id) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        };
        const response = yield fetch(`${environment.APIURL}/dathang/findid/${id}`, options);
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
        this.DetailDathang.set(data);
      } catch (error) {
        return console.error(error);
      }
    });
  }
  findbysanpham(id) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        };
        const response = yield fetch(`${environment.APIURL}/dathang/findbysanpham/${id}`, options);
        if (!response.ok) {
          this.handleError(response.status);
        }
        const data = yield response.json();
        return data;
      } catch (error) {
        return console.error(error);
      }
    });
  }
  updateDathang(dulieu) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(dulieu)
        };
        const response = yield fetch(`${environment.APIURL}/dathang/${dulieu.id}`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        if (!response.ok) {
        }
        this.getAllDathang();
        this.getDathangByid(dulieu.id);
      } catch (error) {
        return console.error(error);
      }
    });
  }
  DeleteDathang(item) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        };
        const response = yield fetch(`${environment.APIURL}/dathang/${item.id}`, options);
        if (!response.ok) {
        }
        this.getAllDathang();
      } catch (error) {
        return console.error(error);
      }
    });
  }
  getDathangBy(param) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this._StorageService.getItem("token")}`
          },
          body: JSON.stringify(__spreadValues({}, param))
        };
        const response = yield fetch(`${environment.APIURL}/dathang/findby`, options);
        if (!response.ok) {
          this.handleError(response.status);
        }
        const data = yield response.json();
        if (param.isOne === true) {
          this.DetailDathang.set(data);
        } else {
          this._StorageService.setItem("dathangs_updatedAt", (/* @__PURE__ */ new Date()).toISOString());
          this.ListDathang.set(data.data);
          this.page.set(data.page || 1);
          this.pageCount.set(data.pageCount || 1);
          this.total.set(data.total || data.data.length);
          this.pageSize.set(this.pageSize());
        }
      } catch (error) {
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
  }
  ImportDathangCu(listImportData) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this._StorageService.getItem("token")
          },
          body: JSON.stringify(listImportData)
        };
        const response = yield fetch(`${environment.APIURL}/dathang/importcu`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        this.getAllDathang();
        return data;
      } catch (error) {
        console.error("Error importing dathang:", error);
        throw error;
      }
    });
  }
  DeleteBulkDathang(ids) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this._StorageService.getItem("token")
          },
          body: JSON.stringify({ ids })
        };
        const response = yield fetch(`${environment.APIURL}/dathang/deletebulk`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        this.getAllDathang();
        return data;
      } catch (error) {
        console.error("Error deleting bulk dathang:", error);
        throw error;
      }
    });
  }
  getNhacungcapBy(params) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this._StorageService.getItem("token")
          },
          body: JSON.stringify(params)
        };
        const response = yield fetch(`${environment.APIURL}/nhacungcap/findby`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        return data;
      } catch (error) {
        console.error("Error finding nhacungcap:", error);
        throw error;
      }
    });
  }
  static \u0275fac = function DathangService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DathangService)(\u0275\u0275inject(StorageService), \u0275\u0275inject(Router));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DathangService, factory: _DathangService.\u0275fac, providedIn: "root" });
};

export {
  DathangService
};
//# sourceMappingURL=chunk-VX6D2TRX.mjs.map
