import {
  lookup
} from "./chunk-56QAEOBZ.js";
import {
  environment
} from "./chunk-U3IXXJDR.js";
import {
  ɵɵdefineInjectable
} from "./chunk-IHZ7YO24.js";

// src/app/shared/services/sharedsocket.service.ts
var SharedSocketService = class _SharedSocketService {
  socket;
  constructor() {
    this.socket = lookup(`${environment.APIURL}`, {
      transports: ["websocket"],
      reconnectionAttempts: 5,
      timeout: 5e3
    });
  }
  getSocket() {
    return this.socket;
  }
  static \u0275fac = function SharedSocketService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SharedSocketService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _SharedSocketService, factory: _SharedSocketService.\u0275fac, providedIn: "root" });
};

export {
  SharedSocketService
};
//# sourceMappingURL=chunk-KRR6EHK2.js.map
