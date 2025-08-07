import './polyfills.server.mjs';
import {
  lookup
} from "./chunk-BMDXMCXP.mjs";
import {
  environment
} from "./chunk-QFPTY5IH.mjs";
import {
  ɵɵdefineInjectable
} from "./chunk-4EQURZBD.mjs";

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
//# sourceMappingURL=chunk-6R25CFXQ.mjs.map
