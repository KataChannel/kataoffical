import {
  SharedSocketService
} from "./chunk-KRR6EHK2.js";
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
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-SXK72SKC.js";

// src/app/admin/nhacungcap/nhacungcap.service.ts
var NhacungcapService = class _NhacungcapService {
  _StorageService;
  _sharedSocketService;
  socket;
  constructor(_StorageService, _sharedSocketService) {
    this._StorageService = _StorageService;
    this._sharedSocketService = _sharedSocketService;
    this.socket = this._sharedSocketService.getSocket();
  }
  _snackBar = inject(MatSnackBar);
  ListNhacungcap = signal([]);
  DetailNhacungcap = signal({});
  page = signal(1);
  totalPages = signal(1);
  total = signal(0);
  pageSize = signal(50);
  // Mặc định 50 mục mỗi trang
  nhacungcapId = signal(null);
  setNhacungcapId(id) {
    this.nhacungcapId.set(id);
  }
  ImportNhacungcap(dulieu) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(dulieu)
        };
        const response = yield fetch(`${environment.APIURL}/nhacungcap/import`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        if (!response.ok) {
          this.handleError(response.status);
          return;
        }
        this.getAllNhacungcap();
      } catch (error) {
        return console.error(error);
      }
    });
  }
  Findbyids(dulieu) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(dulieu)
        };
        const response = yield fetch(`${environment.APIURL}/nhacungcap/finbyids`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        if (!response.ok) {
          this.handleError(response.status);
          return;
        }
        return data.data;
      } catch (error) {
        return console.error(error);
      }
    });
  }
  CreateNhacungcap(dulieu) {
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
        const response = yield fetch(`${environment.APIURL}/nhacungcap`, options);
        if (!response.ok) {
          this.handleError(response.status);
          return;
        }
        const data = yield response.json();
        this.getAllNhacungcap();
        console.log(data);
        this.nhacungcapId.set(data.id);
      } catch (error) {
        console.error(error);
      }
    });
  }
  getAllNhacungcap() {
    return __async(this, arguments, function* (queryParams = {}, forceRefresh = false) {
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this._StorageService.getItem("token")}`
          }
        };
        queryParams = __spreadValues({
          page: this.page().toString(),
          pageSize: this.pageSize().toString()
        }, queryParams);
        const query = new URLSearchParams();
        Object.entries(queryParams).forEach(([key, value]) => {
          if (value) {
            query.append(key, String(value));
          }
        });
        const response = yield fetch(`${environment.APIURL}/nhacungcap?${query}`, options);
        if (!response.ok) {
          this.handleError(response.status);
        }
        const data = yield response.json();
        this.ListNhacungcap.set(data.data);
        this.page.set(data.page || 1);
        this.totalPages.set(data.totalPages || 1);
        this.total.set(data.total || data.data.length);
        this.pageSize.set(this.pageSize());
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
        const response = yield fetch(`${environment.APIURL}/nhacungcap/updateCodeIds`, options);
        if (!response.ok) {
          this.handleError(response.status);
        }
        const data = yield response.json();
        this.getAllNhacungcap(this.pageSize());
        return data.data;
      } catch (error) {
        console.error(error);
      }
    });
  }
  getNhacungcapBy(_0) {
    return __async(this, arguments, function* (param, pageSize = this.pageSize()) {
      this.pageSize.set(pageSize);
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this._StorageService.getItem("token")}`
          },
          body: JSON.stringify(__spreadProps(__spreadValues({}, param), { page: this.page() }))
        };
        const response = yield fetch(`${environment.APIURL}/nhacungcap/findby`, options);
        if (!response.ok) {
          this.handleError(response.status);
        }
        const data = yield response.json();
        if (param.isOne === true) {
          this.DetailNhacungcap.set(data);
        } else {
          this.ListNhacungcap.set(data.data);
          this.page.set(data.page || 1);
          this.totalPages.set(data.totalPages || 1);
          this.total.set(data.total || data.data.length);
          this.pageSize.set(pageSize);
        }
      } catch (error) {
        console.error(error);
      }
    });
  }
  updateNhacungcap(dulieu) {
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
        const response = yield fetch(`${environment.APIURL}/nhacungcap/${dulieu.id}`, options);
        if (!response.ok) {
          this.handleError(response.status);
        }
        const data = yield response.json();
        this.getAllNhacungcap(this.pageSize());
        this.getNhacungcapBy({ id: data.id, isOne: true }, this.pageSize());
      } catch (error) {
        console.error(error);
      }
    });
  }
  DeleteNhacungcap(item) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this._StorageService.getItem("token")}`
          }
        };
        const response = yield fetch(`${environment.APIURL}/nhacungcap/${item.id}`, options);
        if (!response.ok) {
          this.handleError(response.status);
        }
        this.getAllNhacungcap(this.pageSize());
      } catch (error) {
        console.error(error);
      }
    });
  }
  handleError(status) {
    console.log(`Error: ${status}`);
    let message = "L\u1ED7i kh\xF4ng x\xE1c \u0111\u1ECBnh";
    let panelClass = "snackbar-error";
    switch (status) {
      case 400:
        message = "Th\xF4ng tin \u0111\xE3 t\u1ED3n t\u1EA1i ho\u1EB7c kh\xF4ng h\u1EE3p l\u1EC7";
        break;
      case 401:
        message = "Phi\xEAn \u0111\u0103ng nh\u1EADp \u0111\xE3 h\u1EBFt h\u1EA1n, vui l\xF2ng \u0111\u0103ng nh\u1EADp l\u1EA1i";
        break;
      case 403:
        message = "B\u1EA1n kh\xF4ng c\xF3 quy\u1EC1n th\u1EF1c hi\u1EC7n thao t\xE1c n\xE0y";
        break;
      case 404:
        message = "Kh\xF4ng t\xECm th\u1EA5y d\u1EEF li\u1EC7u y\xEAu c\u1EA7u";
        break;
      case 422:
        message = "D\u1EEF li\u1EC7u kh\xF4ng h\u1EE3p l\u1EC7";
        break;
      case 500:
        message = "L\u1ED7i m\xE1y ch\u1EE7, vui l\xF2ng th\u1EED l\u1EA1i sau";
        break;
      case 503:
        message = "D\u1ECBch v\u1EE5 t\u1EA1m th\u1EDDi kh\xF4ng kh\u1EA3 d\u1EE5ng";
        break;
      default:
        message = `L\u1ED7i HTTP ${status}`;
    }
    this._snackBar.open(message, "\u0110\xF3ng", {
      duration: 4e3,
      horizontalPosition: "end",
      verticalPosition: "top",
      panelClass: [panelClass]
    });
  }
  static \u0275fac = function NhacungcapService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NhacungcapService)(\u0275\u0275inject(StorageService), \u0275\u0275inject(SharedSocketService));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _NhacungcapService, factory: _NhacungcapService.\u0275fac, providedIn: "root" });
};

export {
  NhacungcapService
};
//# sourceMappingURL=chunk-MDKJ5PGV.js.map
