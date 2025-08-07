import {
  SharedSocketService
} from "./chunk-KRR6EHK2.js";
import {
  openDB
} from "./chunk-R5HFYA7U.js";
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
  __spreadValues
} from "./chunk-SXK72SKC.js";

// src/app/admin/khachhang/khachhang.service.ts
var KhachhangService = class _KhachhangService {
  _StorageService;
  router;
  _ErrorLogService;
  _sharedSocketService;
  socket;
  constructor(_StorageService, router, _ErrorLogService, _sharedSocketService) {
    this._StorageService = _StorageService;
    this.router = router;
    this._ErrorLogService = _ErrorLogService;
    this._sharedSocketService = _sharedSocketService;
    this.socket = this._sharedSocketService.getSocket();
    this.listenKhachhangUpdates();
  }
  _snackBar = inject(MatSnackBar);
  ListKhachhang = signal([]);
  DetailKhachhang = signal({});
  page = signal(1);
  totalPages = signal(1);
  total = signal(0);
  pageSize = signal(50);
  // Mặc định 10 mục mỗi trang
  khachhangId = signal(null);
  // Khởi tạo IndexedDB
  initDB() {
    return __async(this, null, function* () {
      return yield openDB("KhachhangDB", 4, {
        upgrade(db, oldVersion) {
          if (oldVersion < 1) {
            db.createObjectStore("khachhangs", { keyPath: "id" });
          }
          if (oldVersion < 3) {
            if (db.objectStoreNames.contains("khachhangs")) {
              db.deleteObjectStore("khachhangs");
            }
            if (db.objectStoreNames.contains("pagination")) {
              db.deleteObjectStore("pagination");
            }
            db.createObjectStore("khachhangs", { keyPath: "id" });
          }
          if (oldVersion < 4) {
          }
        }
      });
    });
  }
  // Lưu dữ liệu và phân trang vào IndexedDB
  // Lấy dữ liệu và phân trang từ cache
  setKhachhangId(id) {
    this.khachhangId.set(id);
  }
  ImportKhachhang(dulieu) {
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
        const response = yield fetch(`${environment.APIURL}/khachhang/import`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        if (!response.ok) {
          this.handleError(response.status);
        }
        this.getAllKhachhang();
        this.khachhangId.set(data.id);
      } catch (error) {
        return console.error(error);
      }
    });
  }
  CreateKhachhang(dulieu) {
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
        const response = yield fetch(`${environment.APIURL}/khachhang`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        this.getAllKhachhang(this.pageSize());
        this.khachhangId.set(data.id);
      } catch (error) {
        this._ErrorLogService.logError("Failed to CreateKhachhang", error);
        console.error(error);
      }
    });
  }
  getKhachhangforselect() {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this._StorageService.getItem("token")}`
          }
        };
        const response = yield fetch(`${environment.APIURL}/khachhang/forselect`, options);
        if (!response.ok) {
          this.handleError(response.status);
          return [];
        }
        const data = yield response.json();
        this.ListKhachhang.set(data.data);
        return data.data;
      } catch (error) {
        console.error(error);
        return [];
      }
    });
  }
  getAllKhachhang() {
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
        const response = yield fetch(`${environment.APIURL}/khachhang?${query}`, options);
        if (!response.ok) {
          this.handleError(response.status);
        }
        const data = yield response.json();
        this.ListKhachhang.set(data.data);
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
        const response = yield fetch(`${environment.APIURL}/khachhang/updateCodeIds`, options);
        if (!response.ok) {
          this.handleError(response.status);
        }
        const data = yield response.json();
        this.getAllKhachhang(this.pageSize());
        return data.data;
      } catch (error) {
        this._ErrorLogService.logError("Failed to getUpdatedCodeIds", error);
        console.error(error);
      }
    });
  }
  listenKhachhangUpdates() {
    this.socket.off("khachhang-updated");
    this.socket.on("khachhang-updated", () => __async(this, null, function* () {
      console.log("\u{1F504} D\u1EEF li\u1EC7u s\u1EA3n ph\u1EA9m thay \u0111\u1ED5i, c\u1EADp nh\u1EADt l\u1EA1i cache...");
      this._StorageService.removeItem("khachhangs_updatedAt");
      yield this.getAllKhachhang();
    }));
  }
  getKhachhangBy(param) {
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
        const response = yield fetch(`${environment.APIURL}/khachhang/findby`, options);
        if (!response.ok) {
          this.handleError(response.status);
        }
        const data = yield response.json();
        if (param.isOne === true) {
          this.DetailKhachhang.set(data);
          return data;
        } else {
          this._StorageService.setItem("khachhangs_updatedAt", (/* @__PURE__ */ new Date()).toISOString());
          this.ListKhachhang.set(data.data);
          this.page.set(data.page || 1);
          this.totalPages.set(data.totalPages || 1);
          this.total.set(data.total || data.data.length);
          this.pageSize.set(this.pageSize());
          return data.data;
        }
      } catch (error) {
        console.error(error);
      }
    });
  }
  updateKhachhang(dulieu) {
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
        const response = yield fetch(`${environment.APIURL}/khachhang/${dulieu.id}`, options);
        if (!response.ok) {
          this.handleError(response.status);
        }
        const data = yield response.json();
        this.getAllKhachhang(this.pageSize());
        this.getKhachhangBy({ id: data.id, isOne: true });
      } catch (error) {
        this._ErrorLogService.logError("Failed to updateKhachhang", error);
        console.error(error);
      }
    });
  }
  DeleteKhachhang(item) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this._StorageService.getItem("token")}`
          }
        };
        const response = yield fetch(`${environment.APIURL}/khachhang/${item.id}`, options);
        if (!response.ok) {
          this.handleError(response.status);
        }
        this.getAllKhachhang(this.pageSize());
      } catch (error) {
        this._ErrorLogService.logError("Failed to DeleteKhachhang", error);
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
  static \u0275fac = function KhachhangService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _KhachhangService)(\u0275\u0275inject(StorageService), \u0275\u0275inject(Router), \u0275\u0275inject(ErrorLogService), \u0275\u0275inject(SharedSocketService));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _KhachhangService, factory: _KhachhangService.\u0275fac, providedIn: "root" });
};

export {
  KhachhangService
};
//# sourceMappingURL=chunk-4UKCSTFJ.js.map
