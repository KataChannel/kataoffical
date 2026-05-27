import {
  StorageService
} from "./chunk-F5CW4EPT.js";
import {
  environment
} from "./chunk-KFQ5QPP6.js";
import {
  MatSnackBar
} from "./chunk-3D4DVDG5.js";
import {
  HttpClient,
  HttpHeaders
} from "./chunk-XM7PTE63.js";
import {
  firstValueFrom,
  inject,
  signal,
  ɵɵdefineInjectable
} from "./chunk-SEHLAVZZ.js";
import {
  __async
} from "./chunk-SXK72SKC.js";

// src/app/admin/phongban/phongban.service.ts
var PhongbanService = class _PhongbanService {
  http = inject(HttpClient);
  storageService = inject(StorageService);
  snackBar = inject(MatSnackBar);
  apiUrl = `${environment.APIURL}/phongban`;
  // Signals for reactive state management
  ListPhongban = signal([]);
  PhongbanTree = signal([]);
  DetailPhongban = signal(null);
  Statistics = signal(null);
  loading = signal(false);
  error = signal(null);
  getHeaders() {
    const token = this.storageService.getItem("token");
    return new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    });
  }
  /**
   * Get all phòng ban with optional filters
   */
  getAllPhongban(options) {
    return __async(this, null, function* () {
      try {
        this.loading.set(true);
        this.error.set(null);
        let url = this.apiUrl;
        const params = [];
        if (options?.level !== void 0) {
          params.push(`level=${options.level}`);
        }
        if (options?.loai) {
          params.push(`loai=${options.loai}`);
        }
        if (options?.parentId !== void 0) {
          params.push(`parentId=${options.parentId || "null"}`);
        }
        if (options?.includeChildren !== void 0) {
          params.push(`includeChildren=${options.includeChildren}`);
        }
        if (params.length > 0) {
          url += "?" + params.join("&");
        }
        const response = yield firstValueFrom(this.http.get(url, { headers: this.getHeaders() }));
        this.ListPhongban.set(response);
        return response;
      } catch (error) {
        this.error.set(error.message || "L\u1ED7i khi t\u1EA3i danh s\xE1ch ph\xF2ng ban");
        this.snackBar.open("L\u1ED7i khi t\u1EA3i danh s\xE1ch ph\xF2ng ban", "\u0110\xF3ng", { duration: 3e3 });
        throw error;
      } finally {
        this.loading.set(false);
      }
    });
  }
  /**
   * Get phòng ban tree structure
   */
  getPhongbanTree() {
    return __async(this, null, function* () {
      try {
        this.loading.set(true);
        this.error.set(null);
        const response = yield firstValueFrom(this.http.get(`${this.apiUrl}/tree`, { headers: this.getHeaders() }));
        this.PhongbanTree.set(response);
        return response;
      } catch (error) {
        this.error.set(error.message || "L\u1ED7i khi t\u1EA3i c\xE2y ph\xF2ng ban");
        this.snackBar.open("L\u1ED7i khi t\u1EA3i c\xE2y ph\xF2ng ban", "\u0110\xF3ng", { duration: 3e3 });
        throw error;
      } finally {
        this.loading.set(false);
      }
    });
  }
  /**
   * Get phòng ban statistics
   */
  getStatistics() {
    return __async(this, null, function* () {
      try {
        this.loading.set(true);
        this.error.set(null);
        const response = yield firstValueFrom(this.http.get(`${this.apiUrl}/statistics`, { headers: this.getHeaders() }));
        this.Statistics.set(response);
        return response;
      } catch (error) {
        this.error.set(error.message || "L\u1ED7i khi t\u1EA3i th\u1ED1ng k\xEA");
        this.snackBar.open("L\u1ED7i khi t\u1EA3i th\u1ED1ng k\xEA", "\u0110\xF3ng", { duration: 3e3 });
        throw error;
      } finally {
        this.loading.set(false);
      }
    });
  }
  /**
   * Get phòng ban by ID
   */
  getPhongbanById(id) {
    return __async(this, null, function* () {
      try {
        this.loading.set(true);
        this.error.set(null);
        const response = yield firstValueFrom(this.http.get(`${this.apiUrl}/${id}`, { headers: this.getHeaders() }));
        this.DetailPhongban.set(response);
        return response;
      } catch (error) {
        this.error.set(error.message || "L\u1ED7i khi t\u1EA3i chi ti\u1EBFt ph\xF2ng ban");
        this.snackBar.open("L\u1ED7i khi t\u1EA3i chi ti\u1EBFt ph\xF2ng ban", "\u0110\xF3ng", { duration: 3e3 });
        throw error;
      } finally {
        this.loading.set(false);
      }
    });
  }
  /**
   * Get phòng ban by mã
   */
  getPhongbanByMa(ma) {
    return __async(this, null, function* () {
      try {
        this.loading.set(true);
        this.error.set(null);
        const response = yield firstValueFrom(this.http.get(`${this.apiUrl}/ma/${ma}`, { headers: this.getHeaders() }));
        this.DetailPhongban.set(response);
        return response;
      } catch (error) {
        this.error.set(error.message || "L\u1ED7i khi t\u1EA3i ph\xF2ng ban");
        this.snackBar.open("L\u1ED7i khi t\u1EA3i ph\xF2ng ban", "\u0110\xF3ng", { duration: 3e3 });
        throw error;
      } finally {
        this.loading.set(false);
      }
    });
  }
  /**
   * Create new phòng ban
   */
  createPhongban(data) {
    return __async(this, null, function* () {
      try {
        this.loading.set(true);
        this.error.set(null);
        const response = yield firstValueFrom(this.http.post(this.apiUrl, data, { headers: this.getHeaders() }));
        this.snackBar.open("T\u1EA1o ph\xF2ng ban th\xE0nh c\xF4ng", "\u0110\xF3ng", { duration: 3e3 });
        yield this.getAllPhongban();
        return response;
      } catch (error) {
        const message = error.error?.message || "L\u1ED7i khi t\u1EA1o ph\xF2ng ban";
        this.error.set(message);
        this.snackBar.open(message, "\u0110\xF3ng", { duration: 3e3 });
        throw error;
      } finally {
        this.loading.set(false);
      }
    });
  }
  /**
   * Update phòng ban
   */
  updatePhongban(id, data) {
    return __async(this, null, function* () {
      try {
        this.loading.set(true);
        this.error.set(null);
        const response = yield firstValueFrom(this.http.patch(`${this.apiUrl}/${id}`, data, { headers: this.getHeaders() }));
        this.snackBar.open("C\u1EADp nh\u1EADt ph\xF2ng ban th\xE0nh c\xF4ng", "\u0110\xF3ng", { duration: 3e3 });
        yield this.getAllPhongban();
        return response;
      } catch (error) {
        const message = error.error?.message || "L\u1ED7i khi c\u1EADp nh\u1EADt ph\xF2ng ban";
        this.error.set(message);
        this.snackBar.open(message, "\u0110\xF3ng", { duration: 3e3 });
        throw error;
      } finally {
        this.loading.set(false);
      }
    });
  }
  /**
   * Delete phòng ban
   */
  deletePhongban(id) {
    return __async(this, null, function* () {
      try {
        this.loading.set(true);
        this.error.set(null);
        const response = yield firstValueFrom(this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() }));
        this.snackBar.open(response.message, "\u0110\xF3ng", { duration: 3e3 });
        yield this.getAllPhongban();
        return response;
      } catch (error) {
        const message = error.error?.message || "L\u1ED7i khi x\xF3a ph\xF2ng ban";
        this.error.set(message);
        this.snackBar.open(message, "\u0110\xF3ng", { duration: 3e3 });
        throw error;
      } finally {
        this.loading.set(false);
      }
    });
  }
  /**
   * Reset error state
   */
  clearError() {
    this.error.set(null);
  }
  /**
   * Reset all signals
   */
  reset() {
    this.ListPhongban.set([]);
    this.PhongbanTree.set([]);
    this.DetailPhongban.set(null);
    this.Statistics.set(null);
    this.loading.set(false);
    this.error.set(null);
  }
  static \u0275fac = function PhongbanService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PhongbanService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PhongbanService, factory: _PhongbanService.\u0275fac, providedIn: "root" });
};

export {
  PhongbanService
};
//# sourceMappingURL=chunk-VACGLYLX.js.map
