import './polyfills.server.mjs';
import {
  environment
} from "./chunk-QFPTY5IH.mjs";
import {
  ɵɵdefineInjectable
} from "./chunk-4EQURZBD.mjs";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-FMEBT56H.mjs";

// src/app/shared/services/errorlog.service.ts
var ErrorLogService = class _ErrorLogService {
  logError(message, details) {
    return __async(this, null, function* () {
      const logEntry = {
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        message,
        details: __spreadProps(__spreadValues({}, details), {
          userAgent: navigator.userAgent,
          // Thêm thông tin client
          url: window.location.href
        })
      };
      try {
        yield fetch(`${environment.APIURL}/errorlogs`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(logEntry)
        });
      } catch (err) {
        console.error("Failed to send log to server:", err);
        localStorage.setItem("errorLogs", JSON.stringify(logEntry));
      }
    });
  }
  ClearRedisCache() {
    return __async(this, null, function* () {
      try {
        yield fetch(`${environment.APIURL}/redis/clear`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" }
        });
      } catch (err) {
        console.error("Failed to send log to server:", err);
      }
    });
  }
  static \u0275fac = function ErrorLogService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ErrorLogService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ErrorLogService, factory: _ErrorLogService.\u0275fac, providedIn: "root" });
};

export {
  ErrorLogService
};
//# sourceMappingURL=chunk-RCQ574CW.mjs.map
