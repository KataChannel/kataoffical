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
  isPlatformBrowser
} from "./chunk-RKTFENMZ.js";
import {
  PLATFORM_ID,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-RBDY2J7V.js";
import {
  __async
} from "./chunk-SXK72SKC.js";

// src/app/shared/googlesheets/googlesheets.service.ts
var GoogleSheetService = class _GoogleSheetService {
  _StorageService;
  platformId;
  router;
  _authenticated = false;
  APIURL = environment.APIURL;
  isBrowser;
  constructor(_StorageService, platformId, router) {
    this._StorageService = _StorageService;
    this.platformId = platformId;
    this.router = router;
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  getDrive(DriveInfo) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        };
        const response = yield fetch(`https://sheets.googleapis.com/v4/spreadsheets/${DriveInfo.IdSheet}/values/${DriveInfo.SheetName}?key=${DriveInfo.ApiKey}`, options);
        const data = yield response.json();
        return data;
      } catch (error) {
        return console.error(error);
      }
    });
  }
  static \u0275fac = function GoogleSheetService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GoogleSheetService)(\u0275\u0275inject(StorageService), \u0275\u0275inject(PLATFORM_ID), \u0275\u0275inject(Router));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _GoogleSheetService, factory: _GoogleSheetService.\u0275fac, providedIn: "root" });
};

export {
  GoogleSheetService
};
//# sourceMappingURL=chunk-LIZF5AEJ.js.map
