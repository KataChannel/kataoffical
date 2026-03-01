import {
  openDB
} from "./chunk-R5HFYA7U.js";
import {
  Router
} from "./chunk-AGKEHWOL.js";
import {
  StorageService
} from "./chunk-SSKGL4JO.js";
import {
  environment
} from "./chunk-5F4VG3UZ.js";
import {
  MatSnackBar
} from "./chunk-43IDDEVP.js";
import {
  signal,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-RBDY2J7V.js";
import {
  __async,
  __spreadValues
} from "./chunk-SXK72SKC.js";

// src/app/admin/sanpham/sanpham.service.ts
var SanphamService = class _SanphamService {
  _StorageService;
  router;
  _snackBar;
  constructor(_StorageService, router, _snackBar) {
    this._StorageService = _StorageService;
    this.router = router;
    this._snackBar = _snackBar;
  }
  ListSanpham = signal([]);
  DetailSanpham = signal({});
  sanphamId = signal(null);
  page = signal(1);
  totalPages = signal(1);
  total = signal(0);
  pageSize = signal(50);
  // Mặc định 50 mục mỗi trang
  setSanphamId(id) {
    this.sanphamId.set(id);
  }
  Banggiamacdinh(dulieu) {
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
        const response = yield fetch(`${environment.APIURL}/sanpham/banggiamacdinh`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        if (!response.ok) {
          this.handleError(response.status);
        }
        this.getAllSanpham();
        return data;
      } catch (error) {
        return console.error(error);
      }
    });
  }
  ImportSanpham(dulieu) {
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
        const response = yield fetch(`${environment.APIURL}/sanpham/import`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        if (!response.ok) {
          this.handleError(response.status);
        }
        this.getAllSanpham();
      } catch (error) {
        return console.error(error);
      }
    });
  }
  CreateSanpham(dulieu) {
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
        const response = yield fetch(`${environment.APIURL}/sanpham`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        if (!response.ok) {
          this.handleError(response.status);
        }
        this.getAllSanpham();
        this.sanphamId.set(data.id);
      } catch (error) {
        return console.error(error);
      }
    });
  }
  getSanphamforselect() {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this._StorageService.getItem("token")}`
          }
        };
        const response = yield fetch(`${environment.APIURL}/sanpham/forselect`, options);
        if (!response.ok) {
          this.handleError(response.status);
          return [];
        }
        const data = yield response.json();
        this.ListSanpham.set(data.data);
        return data.data;
      } catch (error) {
        console.error(error);
        return [];
      }
    });
  }
  getNhucau() {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this._StorageService.getItem("token")}`
          }
        };
        const response = yield fetch(`${environment.APIURL}/sanpham/nhucaudathang`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        if (!response.ok) {
          this.handleError(response.status);
        }
        this.ListSanpham.set(data);
        return data;
      } catch (error) {
        return console.error(error);
      }
    });
  }
  getAllSanpham() {
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
        const response = yield fetch(`${environment.APIURL}/sanpham?${query}`, options);
        if (!response.ok) {
          this.handleError(response.status);
        }
        const data = yield response.json();
        this.ListSanpham.set(data.data);
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
  handleError(status) {
    let message = "L\u1ED7i kh\xF4ng x\xE1c \u0111\u1ECBnh";
    switch (status) {
      case 401:
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
      duration: 3e3,
      horizontalPosition: "end",
      verticalPosition: "top",
      panelClass: ["snackbar-warning"]
    });
  }
  // 3️⃣ Lắng nghe cập nhật từ WebSocket
  listenSanphamUpdates() {
  }
  initDB() {
    return __async(this, null, function* () {
      return yield openDB("SanphamDB", 4, {
        upgrade(db, oldVersion) {
          if (oldVersion < 1) {
            db.createObjectStore("sanphams", { keyPath: "id" });
          }
          if (oldVersion < 3) {
            if (db.objectStoreNames.contains("sanphams")) {
              db.deleteObjectStore("sanphams");
            }
            if (db.objectStoreNames.contains("pagination")) {
              db.deleteObjectStore("pagination");
            }
            db.createObjectStore("sanphams", { keyPath: "id" });
          }
          if (oldVersion < 4) {
          }
        }
      });
    });
  }
  // Lấy dữ liệu và phân trang từ cache
  getSanphamByid(id) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this._StorageService.getItem("token")}`
          }
        };
        const response = yield fetch(`${environment.APIURL}/sanpham/findid/${id}`, options);
        if (!response.ok) {
          this.handleError(response.status);
        }
        const data = yield response.json();
        this.DetailSanpham.set(data);
      } catch (error) {
        return console.error(error);
      }
    });
  }
  getSanphamBy(param) {
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
        const response = yield fetch(`${environment.APIURL}/sanpham/findby`, options);
        if (!response.ok) {
          this.handleError(response.status);
        }
        const data = yield response.json();
        if (param.isOne === true) {
          this.DetailSanpham.set(data);
          return data;
        } else {
          this.ListSanpham.set(data.data);
          this.page.set(data.page || 1);
          this.totalPages.set(data.totalPages || 1);
          this.total.set(data.total || data.data.length);
          this.pageSize.set(this.pageSize());
          return data.data;
        }
      } catch (error) {
      }
    });
  }
  updateSanpham(dulieu) {
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
        const response = yield fetch(`${environment.APIURL}/sanpham/${dulieu.id}`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        if (!response.ok) {
          this.handleError(response.status);
        }
        this.getAllSanpham();
        this.getSanphamByid(dulieu.id);
      } catch (error) {
        return console.error(error);
      }
    });
  }
  DeleteSanpham(item) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this._StorageService.getItem("token")}`
          }
        };
        const response = yield fetch(`${environment.APIURL}/sanpham/${item.id}`, options);
        if (!response.ok) {
          this.handleError(response.status);
        }
        this.getAllSanpham();
      } catch (error) {
        return console.error(error);
      }
    });
  }
  static \u0275fac = function SanphamService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SanphamService)(\u0275\u0275inject(StorageService), \u0275\u0275inject(Router), \u0275\u0275inject(MatSnackBar));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _SanphamService, factory: _SanphamService.\u0275fac, providedIn: "root" });
};

export {
  SanphamService
};
//# sourceMappingURL=chunk-LEINIWDA.js.map
