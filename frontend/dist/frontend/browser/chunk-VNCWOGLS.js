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

// src/app/admin/banggia/banggia.service.ts
var BanggiaService = class _BanggiaService {
  _StorageService;
  router;
  constructor(_StorageService, router) {
    this._StorageService = _StorageService;
    this.router = router;
  }
  ListBanggia = signal([]);
  DetailBanggia = signal({});
  banggiaId = signal(null);
  setBanggiaId(id) {
    this.banggiaId.set(id);
  }
  importBGKH(dulieu) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(dulieu)
        };
        const response = yield fetch(`${environment.APIURL}/banggia/importbgkh`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        if (!response.ok) {
          this.handleError(response.status);
        }
        this.getAllBanggia();
      } catch (error) {
        return console.error(error);
      }
    });
  }
  importSPBG(dulieu) {
    return __async(this, null, function* () {
      try {
        const batchSize = 10;
        const batches = [];
        for (let i = 0; i < dulieu.length; i += batchSize) {
          batches.push(dulieu.slice(i, i + batchSize));
        }
        for (const batch of batches) {
          const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(batch)
          };
          const response = yield fetch(`${environment.APIURL}/banggia/importspbg`, options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = yield response.json();
          if (!response.ok) {
            this.handleError(response.status);
          }
        }
        this.getAllBanggia();
      } catch (error) {
        return console.error(error);
      }
    });
  }
  ImportBanggia(dulieu) {
    return __async(this, null, function* () {
      console.log("bg", dulieu);
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(dulieu)
        };
        const response = yield fetch(`${environment.APIURL}/banggia/import`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        if (!response.ok) {
          this.handleError(response.status);
        }
        this.getAllBanggia();
      } catch (error) {
        return console.error(error);
      }
    });
  }
  CreateBanggia(dulieu) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(dulieu)
        };
        const response = yield fetch(`${environment.APIURL}/banggia`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        if (!response.ok) {
          this.handleError(response.status);
        }
        this.getAllBanggia();
        this.banggiaId.set(data.id);
      } catch (error) {
        return console.error(error);
      }
    });
  }
  getAllBanggia() {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this._StorageService.getItem("token")}`
          }
        };
        const response = yield fetch(`${environment.APIURL}/banggia`, options);
        if (!response.ok) {
          this.handleError(response.status);
        }
        const data = yield response.json();
        this.ListBanggia.set(data);
        return data;
      } catch (error) {
        console.error(error);
      }
    });
  }
  getAllBGSP() {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this._StorageService.getItem("token")}`
          }
        };
        const response = yield fetch(`${environment.APIURL}/banggia/getbgsp`, options);
        if (!response.ok) {
          this.handleError(response.status);
        }
        const data = yield response.json();
        return data;
      } catch (error) {
        console.error(error);
      }
    });
  }
  getAllBGKH() {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this._StorageService.getItem("token")}`
          }
        };
        const response = yield fetch(`${environment.APIURL}/banggia/getbgkh`, options);
        if (!response.ok) {
          this.handleError(response.status);
        }
        const data = yield response.json();
        return data;
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
    const result = JSON.stringify({ code: status, title: message });
    this.router.navigate(["/errorserver"], { queryParams: { data: result } });
  }
  getBanggiaByid(id) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        };
        const response = yield fetch(`${environment.APIURL}/banggia/findid/${id}`, options);
        if (!response.ok) {
          this.handleError(response.status);
        }
        const data = yield response.json();
        this.DetailBanggia.set(data);
      } catch (error) {
        return console.error(error);
      }
    });
  }
  updateBanggia(dulieu) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(dulieu)
        };
        const response = yield fetch(`${environment.APIURL}/banggia/${dulieu.id}`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        if (!response.ok) {
          this.handleError(response.status);
        }
        this.getAllBanggia();
        this.getBanggiaByid(dulieu.id);
      } catch (error) {
        return console.error(error);
      }
    });
  }
  DeleteBanggia(item) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        };
        const response = yield fetch(`${environment.APIURL}/banggia/${item.id}`, options);
        if (!response.ok) {
          this.handleError(response.status);
        }
        this.getAllBanggia();
      } catch (error) {
        return console.error(error);
      }
    });
  }
  addKHtoBG(dulieu) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(dulieu)
        };
        const response = yield fetch(`${environment.APIURL}/banggia/addKHtoBG`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        if (!response.ok) {
        }
        this.getBanggiaByid(dulieu.banggiaId);
      } catch (error) {
        return console.error(error);
      }
    });
  }
  removeKHfromBG(dulieu) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(dulieu)
        };
        const response = yield fetch(`${environment.APIURL}/banggia/removeKHfromBG`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        if (!response.ok) {
        }
        this.getBanggiaByid(dulieu.banggiaId);
      } catch (error) {
        return console.error(error);
      }
    });
  }
  static \u0275fac = function BanggiaService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BanggiaService)(\u0275\u0275inject(StorageService), \u0275\u0275inject(Router));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _BanggiaService, factory: _BanggiaService.\u0275fac, providedIn: "root" });
};

export {
  BanggiaService
};
//# sourceMappingURL=chunk-VNCWOGLS.js.map
