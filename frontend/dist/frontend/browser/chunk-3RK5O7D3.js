import {
  TimezoneService
} from "./chunk-QPEFXVGJ.js";
import {
  Router
} from "./chunk-I3HWRSST.js";
import {
  StorageService
} from "./chunk-S5TWTPVL.js";
import {
  environment
} from "./chunk-5F4VG3UZ.js";
import {
  signal,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-FWM3YOMT.js";
import {
  __async,
  __spreadValues
} from "./chunk-SXK72SKC.js";

// src/app/admin/donhang/donhang.service.ts
var DonhangService = class _DonhangService {
  _StorageService;
  router;
  timezoneService;
  constructor(_StorageService, router, timezoneService) {
    this._StorageService = _StorageService;
    this.router = router;
    this.timezoneService = timezoneService;
  }
  ListDonhang = signal([]);
  DetailDonhang = signal({});
  page = signal(1);
  pageCount = signal(1);
  total = signal(0);
  pageSize = signal(50);
  donhangId = signal(null);
  setDonhangId(id) {
    this.donhangId.set(id);
  }
  ImportDonhangCu(dulieu) {
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
        const response = yield fetch(`${environment.APIURL}/donhang/importold`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        if (data.status === "duplicates_found") {
          return {
            needsConfirmation: true,
            message: data.message,
            duplicates: data.duplicates,
            pendingOrders: data.pendingOrders,
            processResults: data.processResults
          };
        }
        return data;
      } catch (error) {
        console.error("Error in ImportDonhangCu:", error);
        throw error;
      }
    });
  }
  // 🎯 NEW METHOD: Handle confirmed duplicate orders
  ImportDonhangCuConfirmed(pendingOrders, userChoice) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this._StorageService.getItem("token")
          },
          body: JSON.stringify({ pendingOrders, userChoice })
        };
        const response = yield fetch(`${environment.APIURL}/donhang/importold/confirmed`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        if (data.status === "completed" && data.success > 0) {
        }
        return data;
      } catch (error) {
        console.error("Error in ImportDonhangCuConfirmed:", error);
        throw error;
      }
    });
  }
  ImportDonhang(dulieu) {
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
        const response = yield fetch(`${environment.APIURL}/donhang/import`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        this.donhangId.set(data.id);
        return data;
      } catch (error) {
        return console.error(error);
      }
    });
  }
  DongboGia(list) {
    return __async(this, null, function* () {
      const dulieu = list.map((item) => item.id);
      if (dulieu.length === 0) {
        return {
          status: "error",
          message: "Kh\xF4ng c\xF3 \u0111\u01A1n h\xE0ng n\xE0o \u0111\u01B0\u1EE3c ch\u1ECDn \u0111\u1EC3 \u0111\u1ED3ng b\u1ED9 gi\xE1"
        };
      }
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this._StorageService.getItem("token")
          },
          body: JSON.stringify(dulieu)
        };
        const response = yield fetch(`${environment.APIURL}/donhang/dongbogia`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        return data;
      } catch (error) {
        console.error("L\u1ED7i khi \u0111\u1ED3ng b\u1ED9 gi\xE1:", error);
        return {
          status: "error",
          message: error.message || "L\u1ED7i khi \u0111\u1ED3ng b\u1ED9 gi\xE1 t\u1EEB server"
        };
      }
    });
  }
  CreateDonhang(dulieu) {
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
        const response = yield fetch(`${environment.APIURL}/donhang`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        this.donhangId.set(data.id);
        const currentList = this.ListDonhang();
        if (Array.isArray(currentList)) {
          this.ListDonhang.set([data, ...currentList]);
        }
        return data;
      } catch (error) {
        console.error("Error in CreateDonhang:", error);
        throw error;
      }
    });
  }
  DagiaoDonhang(dulieu) {
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
        const response = yield fetch(`${environment.APIURL}/donhang/${dulieu.id}/dagiao`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        if (!response.ok) {
        }
        console.log(data);
      } catch (error) {
        return console.error(error);
      }
    });
  }
  getSLChogiao(SearchParams) {
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
        const response = yield fetch(`${environment.APIURL}/donhang/getchogiao`, options);
        if (!response.ok) {
        }
        const data = yield response.json();
        this.ListDonhang.set(data.data);
        this.page.set(data.pageNumber);
        this.pageCount.set(data.totalPages);
        this.total.set(data.total);
        this.pageSize.set(data.pageSize);
        return data;
      } catch (error) {
        return console.error(error);
      }
    });
  }
  searchDonhang(SearchParams) {
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
        const response = yield fetch(`${environment.APIURL}/donhang/search`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        if (Array.isArray(data.data)) {
          this.ListDonhang.set(data.data);
        } else {
          console.error("searchDonhang: data.data is not an array:", data.data);
          this.ListDonhang.set([]);
        }
        this.page.set(data.pageNumber || 1);
        this.pageCount.set(data.totalPages || 0);
        this.total.set(data.total || 0);
        this.pageSize.set(data.pageSize || 50);
        return data;
      } catch (error) {
        console.error("Error in searchDonhang:", error);
        this.ListDonhang.set([]);
        return { data: [], pageNumber: 1, totalPages: 0, total: 0, pageSize: 50 };
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
        const response = yield fetch(`${environment.APIURL}/donhang/congnokhachhang`, options);
        if (!response.ok) {
        }
        const data = yield response.json();
        this.ListDonhang.set(data);
        return data;
      } catch (error) {
        return console.error(error);
      }
    });
  }
  downloadCongno(SearchParams) {
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
        const response = yield fetch(`${environment.APIURL}/donhang/downloadcongnokhachhang`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const contentDisposition = response.headers.get("Content-Disposition");
        let filename = "CongNoKhachHang.xlsx";
        if (contentDisposition) {
          const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
          if (filenameMatch && filenameMatch[1]) {
            filename = filenameMatch[1].replace(/['"]/g, "");
          }
        }
        const blob = yield response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        return { success: true, filename };
      } catch (error) {
        console.error("Error downloading congno:", error);
        throw error;
      }
    });
  }
  Phieuchuyen(SearchParams) {
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
        const response = yield fetch(`${environment.APIURL}/donhang/phieuchuyen`, options);
        if (!response.ok) {
        }
        const data = yield response.json();
        this.ListDonhang.set(data);
      } catch (error) {
        return console.error(error);
      }
    });
  }
  Phieugiaohang(Params) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this._StorageService.getItem("token")
          },
          body: JSON.stringify(Params)
        };
        const response = yield fetch(`${environment.APIURL}/donhang/phieugiao`, options);
        if (!response.ok) {
        }
        const data = yield response.json();
        this.DetailDonhang.set(data);
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
        const response = yield fetch(`${environment.APIURL}/donhang/findbysanpham/${id}`, options);
        if (!response.ok) {
        }
        const data = yield response.json();
        return data;
      } catch (error) {
        return console.error(error);
      }
    });
  }
  getAllDonhang() {
    return __async(this, null, function* () {
      console.warn("getAllDonhang() is deprecated. Use searchDonhang() instead.");
      try {
        yield this.searchDonhang({
          pageSize: 999999,
          Type: "all"
        });
      } catch (error) {
        console.error("Error in getAllDonhang:", error);
        if (!Array.isArray(this.ListDonhang())) {
          this.ListDonhang.set([]);
        }
      }
    });
  }
  getDonhangByid(id) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this._StorageService.getItem("token")
          }
        };
        const response = yield fetch(`${environment.APIURL}/donhang/findid/${id}`, options);
        if (!response.ok) {
        }
        const data = yield response.json();
        this.DetailDonhang.set(data);
      } catch (error) {
        return console.error(error);
      }
    });
  }
  updateDonhang(dulieu) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this._StorageService.getItem("token")
          },
          body: JSON.stringify(dulieu)
        };
        const response = yield fetch(`${environment.APIURL}/donhang/${dulieu.id}`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        const currentList = this.ListDonhang();
        if (Array.isArray(currentList)) {
          const index = currentList.findIndex((item) => item.id === dulieu.id);
          if (index !== -1) {
            currentList[index] = __spreadValues(__spreadValues({}, currentList[index]), data);
            this.ListDonhang.set([...currentList]);
          }
        }
        this.getDonhangByid(dulieu.id);
        return data;
      } catch (error) {
        return console.error(error);
      }
    });
  }
  updatePhieugiao(dulieu) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this._StorageService.getItem("token")
          },
          body: JSON.stringify(dulieu)
        };
        const response = yield fetch(`${environment.APIURL}/donhang/phieugiao/${dulieu.id}`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        if (!response.ok) {
        }
        this.Phieugiaohang({ id: dulieu.id });
      } catch (error) {
        return console.error(error);
      }
    });
  }
  DeleteDonhang(item) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this._StorageService.getItem("token")
          }
        };
        const response = yield fetch(`${environment.APIURL}/donhang/${item.id}`, options);
        if (!response.ok) {
        }
      } catch (error) {
        return console.error(error);
      }
    });
  }
  UpdateBulkDonhang(items) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this._StorageService.getItem("token")
          },
          body: JSON.stringify(items)
        };
        const response = yield fetch(`${environment.APIURL}/donhang/bulk`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        return data;
      } catch (error) {
        console.error("Error in UpdateBulkDonhang:", error);
        throw error;
      }
    });
  }
  DeleteBulkDonhang(items) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this._StorageService.getItem("token")
          },
          body: JSON.stringify(items)
        };
        const response = yield fetch(`${environment.APIURL}/donhang/bulk`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        return data;
      } catch (error) {
        console.error("Error in DeleteBulkDonhang:", error);
        throw error;
      }
    });
  }
  // async SearchDonhang(SearchParams:any) {
  //   try {
  //     const options = {
  //       method:'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(SearchParams),
  //     };
  //         const response = await fetch(`${environment.APIURL}/donhang/search`,options);
  //         if (!response.ok) {
  //         }
  //         const data = await response.json();   
  //         this.ListDonhang.set(data.items)
  //         return data;
  //     } catch (error) {
  //         return console.error(error);
  //     }
  // }
  SearchField(SearchParams) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this._StorageService.getItem("token")
          },
          body: JSON.stringify(SearchParams)
        };
        const response = yield fetch(`${environment.APIURL}/donhang/searchfield`, options);
        if (!response.ok) {
        }
        const data = yield response.json();
        this.DetailDonhang.set(data);
        return data;
      } catch (error) {
        return console.error(error);
      }
    });
  }
  /**
   * Hủy đơn hàng với lý do
   * @param donhangId ID đơn hàng cần hủy
   * @param lydohuy Lý do hủy đơn (bắt buộc, tối thiểu 10 ký tự)
   * @returns Promise với kết quả hủy đơn
   */
  cancelDonhang(donhangId, lydohuy) {
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
        const response = yield fetch(`${environment.APIURL}/orders/donhang/${donhangId}/cancel`, options);
        if (!response.ok) {
          const errorData = yield response.json();
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        const currentList = this.ListDonhang();
        if (Array.isArray(currentList)) {
          const index = currentList.findIndex((item) => item.id === donhangId);
          if (index !== -1) {
            currentList[index] = __spreadValues(__spreadValues({}, currentList[index]), data);
            this.ListDonhang.set([...currentList]);
          }
        }
        return data;
      } catch (error) {
        console.error("L\u1ED7i khi h\u1EE7y \u0111\u01A1n h\xE0ng:", error);
        throw error;
      }
    });
  }
  static \u0275fac = function DonhangService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DonhangService)(\u0275\u0275inject(StorageService), \u0275\u0275inject(Router), \u0275\u0275inject(TimezoneService));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DonhangService, factory: _DonhangService.\u0275fac, providedIn: "root" });
};

export {
  DonhangService
};
//# sourceMappingURL=chunk-3RK5O7D3.js.map
