import {
  require_moment
} from "./chunk-LIKOVN7R.js";
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
  __async,
  __spreadValues,
  __toESM
} from "./chunk-SXK72SKC.js";

// src/app/admin/donhang/donhang.service.ts
var import_moment = __toESM(require_moment());
var DonhangService = class _DonhangService {
  _StorageService;
  router;
  constructor(_StorageService, router) {
    this._StorageService = _StorageService;
    this.router = router;
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
            "Content-Type": "application/json"
          },
          body: JSON.stringify(dulieu)
        };
        const response = yield fetch(`${environment.APIURL}/donhang/importold`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        if (!response.ok) {
        }
        return data;
      } catch (error) {
        return console.error(error);
      }
    });
  }
  ImportDonhang(dulieu) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(dulieu)
        };
        const response = yield fetch(`${environment.APIURL}/donhang/import`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        if (!response.ok) {
        }
        this.getAllDonhang();
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
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(dulieu)
        };
        const response = yield fetch(`${environment.APIURL}/donhang/dongbogia`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        if (!response.ok) {
        }
        this.getAllDonhang();
        return data;
      } catch (error) {
        return console.error(error);
      }
    });
  }
  CreateDonhang(dulieu) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(dulieu)
        };
        const response = yield fetch(`${environment.APIURL}/donhang`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        if (!response.ok) {
        }
        this.getAllDonhang();
        this.donhangId.set(data.id);
        return data;
      } catch (error) {
        return console.error(error);
      }
    });
  }
  DagiaoDonhang(dulieu) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
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
        const response = yield fetch(`${environment.APIURL}/donhang/search`, options);
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
  searchCongno(SearchParams) {
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
  Phieuchuyen(SearchParams) {
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
            "Content-Type": "application/json"
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
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this._StorageService.getItem("token")
          }
        };
        const response = yield fetch(`${environment.APIURL}/donhang`, options);
        if (!response.ok) {
        }
        const data = yield response.json();
        this.ListDonhang.set(data);
      } catch (error) {
        return console.error(error);
      }
    });
  }
  getDonhangByid(id) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
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
            "Content-Type": "application/json"
          },
          body: JSON.stringify(dulieu)
        };
        const response = yield fetch(`${environment.APIURL}/donhang/${dulieu.id}`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        if (!response.ok) {
        }
        this.getAllDonhang();
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
            "Content-Type": "application/json"
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
            "Content-Type": "application/json"
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
            "Content-Type": "application/json"
          },
          body: JSON.stringify(items)
        };
        const response = yield fetch(`${environment.APIURL}/donhang/bulk`, options);
        if (!response.ok) {
        }
        this.getAllDonhang();
        const data = yield response.json();
        return data;
      } catch (error) {
        return console.error(error);
      }
    });
  }
  DeleteBulkDonhang(items) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(items)
        };
        const response = yield fetch(`${environment.APIURL}/donhang/bulk`, options);
        if (!response.ok) {
        }
        this.getAllDonhang();
        const data = yield response.json();
        return data;
      } catch (error) {
        return console.error(error);
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
            "Content-Type": "application/json"
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
  static \u0275fac = function DonhangService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DonhangService)(\u0275\u0275inject(StorageService), \u0275\u0275inject(Router));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DonhangService, factory: _DonhangService.\u0275fac, providedIn: "root" });
};

export {
  DonhangService
};
//# sourceMappingURL=chunk-VONEIXGX.js.map
