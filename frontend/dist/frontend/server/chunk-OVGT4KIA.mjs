import './polyfills.server.mjs';
import {
  TimezoneService
} from "./chunk-5FENH2CU.mjs";
import {
  Router
} from "./chunk-TLYIA537.mjs";
import {
  StorageService
} from "./chunk-A5AQV4K7.mjs";
import {
  environment
} from "./chunk-OWHCCJ6T.mjs";
import {
  signal,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-I6KZCWLZ.mjs";
import {
  __async,
  __spreadValues
} from "./chunk-FMEBT56H.mjs";

// src/app/admin/dathang/dathang.service.ts
var DathangService = class _DathangService {
  _StorageService;
  router;
  timezoneService;
  constructor(_StorageService, router, timezoneService) {
    this._StorageService = _StorageService;
    this.router = router;
    this.timezoneService = timezoneService;
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
  ImportDathang(dulieu) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this._StorageService.getItem("token")
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
        console.log("\u{1F504} Creating dathang with enhanced date sync:", dulieu);
        const synchronizedData = this.timezoneService.synchronizeObjectDates(dulieu, ["ngaygiao", "ngaynhan", "ngaynhanEnd"]);
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this._StorageService.getItem("token")
          },
          body: JSON.stringify(synchronizedData)
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
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this._StorageService.getItem("token")
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
      console.log("\u{1F504} Enhanced date sync for getSLChonhap:", payload);
      if (payload.Batdau || payload.Ketthuc) {
        payload.Batdau = this.timezoneService.toUTC(payload.Batdau, "searchStartDate");
        payload.Ketthuc = this.timezoneService.toUTC(payload.Ketthuc, "searchEndDate");
      }
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
      console.log("\u{1F504} Enhanced date sync for searchDathang:", payload);
      if (payload.Batdau || payload.Ketthuc) {
        payload.Batdau = this.timezoneService.toUTC(payload.Batdau, "searchStartDate");
        payload.Ketthuc = this.timezoneService.toUTC(payload.Ketthuc, "searchEndDate");
      }
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
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this._StorageService.getItem("token")
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
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this._StorageService.getItem("token")
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
        console.log("\u{1F504} Updating dathang with enhanced date sync:", dulieu);
        const synchronizedData = this.timezoneService.synchronizeObjectDates(dulieu, ["ngaygiao", "ngaynhan", "ngaynhanEnd"]);
        const options = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this._StorageService.getItem("token")
          },
          body: JSON.stringify(synchronizedData)
        };
        const response = yield fetch(`${environment.APIURL}/dathang/${dulieu.id}`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        if (!response.ok) {
        }
        console.log("data Update", data);
        this.getDathangByid(data.id);
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
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this._StorageService.getItem("token")
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
      if (param.Batdau || param.Ketthuc) {
        const dateRange = this.timezoneService.getAPIDateRange(param.Batdau, param.Ketthuc);
        param.Batdau = dateRange.Batdau;
        param.Ketthuc = dateRange.Ketthuc;
      }
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
          this._StorageService.setItem("dathangs_updatedAt", this.timezoneService.nowUTC());
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
  searchCongno(SearchParams) {
    return __async(this, null, function* () {
      const payload = __spreadValues({}, SearchParams);
      if (payload.Batdau || payload.Ketthuc) {
        const dateRange = this.timezoneService.getAPIDateRange(payload.Batdau, payload.Ketthuc);
        payload.Batdau = dateRange.Batdau;
        payload.Ketthuc = dateRange.Ketthuc;
      }
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this._StorageService.getItem("token")
          },
          body: JSON.stringify(payload)
        };
        const response = yield fetch(`${environment.APIURL}/dathang/congnoncc`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        this.ListDathang.set(data);
        return data;
      } catch (error) {
        console.error("Error searching congno:", error);
        return [];
      }
    });
  }
  /**
   * Hủy đơn đặt hàng với lý do
   * @param dathangId ID đơn đặt hàng cần hủy
   * @param lydohuy Lý do hủy đơn (bắt buộc, tối thiểu 10 ký tự)
   * @returns Promise với kết quả hủy đơn
   */
  cancelDathang(dathangId, lydohuy) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this._StorageService.getItem("token")
          },
          body: JSON.stringify({ lydohuy })
        };
        const response = yield fetch(`${environment.APIURL}/orders/dathang/${dathangId}/cancel`, options);
        if (!response.ok) {
          const errorData = yield response.json();
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        this.getAllDathang();
        return data;
      } catch (error) {
        console.error("L\u1ED7i khi h\u1EE7y \u0111\u01A1n \u0111\u1EB7t h\xE0ng:", error);
        throw error;
      }
    });
  }
  /**
   * Tự động xác nhận nhận hàng cho toàn bộ sản phẩm đang chờ nhập
   * @param sanphamId ID sản phẩm
   */
  confirmReceiptByProduct(sanphamId) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this._StorageService.getItem("token")
          }
        };
        const response = yield fetch(`${environment.APIURL}/dathang/complete-pending-receipts/${sanphamId}`, options);
        if (!response.ok) {
          const errorData = yield response.json();
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        return yield response.json();
      } catch (error) {
        console.error("L\u1ED7i khi x\xE1c nh\u1EADn nh\u1EADn h\xE0ng h\xE0ng lo\u1EA1t:", error);
        throw error;
      }
    });
  }
  /**
   * Tự động xác nhận nhận hàng hàng loạt cho nhiều sản phẩm
   * @param sanphamIds Danh sách ID sản phẩm
   */
  confirmReceiptBulk(sanphamIds) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + (this._StorageService.getItem("token") || "")
          },
          body: JSON.stringify({ sanphamIds })
        };
        const response = yield fetch(`${environment.APIURL}/dathang/complete-pending-receipts-bulk`, options);
        if (!response.ok) {
          const errorData = yield response.json();
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        return yield response.json();
      } catch (error) {
        console.error("L\u1ED7i khi x\xE1c nh\u1EADn nh\u1EADn h\xE0ng h\xE0ng lo\u1EA1t:", error);
        throw error;
      }
    });
  }
  static \u0275fac = function DathangService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DathangService)(\u0275\u0275inject(StorageService), \u0275\u0275inject(Router), \u0275\u0275inject(TimezoneService));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DathangService, factory: _DathangService.\u0275fac, providedIn: "root" });
};

export {
  DathangService
};
//# sourceMappingURL=chunk-OVGT4KIA.mjs.map
