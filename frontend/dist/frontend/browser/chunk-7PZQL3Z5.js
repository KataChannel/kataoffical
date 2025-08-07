import {
  environment
} from "./chunk-U3IXXJDR.js";
import {
  Router
} from "./chunk-JGMWTFVW.js";
import {
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-IHZ7YO24.js";
import {
  __async
} from "./chunk-SXK72SKC.js";

// src/app/shared/services/search.service.ts
var SearchService = class _SearchService {
  router;
  constructor(router) {
    this.router = router;
  }
  Search(dulieu) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(dulieu)
        };
        const response = yield fetch(`${environment.APIURL}/search`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        if (!response.ok) {
          let message = "L\u1ED7i kh\xF4ng x\xE1c \u0111\u1ECBnh";
          switch (response.status) {
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
        return data;
      } catch (error) {
        return console.error(error);
      }
    });
  }
  static \u0275fac = function SearchService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SearchService)(\u0275\u0275inject(Router));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _SearchService, factory: _SearchService.\u0275fac, providedIn: "root" });
};

export {
  SearchService
};
//# sourceMappingURL=chunk-7PZQL3Z5.js.map
