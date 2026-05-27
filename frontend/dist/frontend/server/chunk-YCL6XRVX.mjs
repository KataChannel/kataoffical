import './polyfills.server.mjs';
import {
  Router
} from "./chunk-TLYIA537.mjs";
import {
  StorageService
} from "./chunk-A5AQV4K7.mjs";
import "./chunk-AF3EHXCM.mjs";
import "./chunk-LOJIWTVC.mjs";
import "./chunk-K6ADGRHN.mjs";
import "./chunk-VMLPK7VD.mjs";
import "./chunk-RILUB63S.mjs";
import "./chunk-AJDW274Y.mjs";
import "./chunk-UP6A7POK.mjs";
import {
  inject,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵtext
} from "./chunk-I6KZCWLZ.mjs";
import "./chunk-QS2IQGEQ.mjs";
import "./chunk-FMEBT56H.mjs";

// src/app/site/lienheadmin/lienheadmin.component.ts
var LienheadminComponent = class _LienheadminComponent {
  _StorageService = inject(StorageService);
  _route = inject(Router);
  constructor() {
  }
  ngOnInit() {
    const permissions = this._StorageService.getItem("permissions");
    if (permissions && Array.isArray(permissions) && permissions.length > 0) {
      const target = permissions[0];
      if (target) {
        const path = typeof target === "string" ? target : target.name || target.path || "";
        if (path && typeof path === "string") {
          this._route.navigate(["admin/", path.split(".")[0]]);
        }
      }
    }
  }
  static \u0275fac = function LienheadminComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LienheadminComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LienheadminComponent, selectors: [["app-lienheadmin"]], decls: 8, vars: 0, consts: [[1, "bg-gray-100", "flex", "items-center", "justify-center", "h-screen"], [1, "text-center"], [1, "text-9xl", "font-bold", "text-gray-800"], [1, "text-2xl", "text-gray-600", "mt-4"], [1, "text-gray-500", "mt-2"]], template: function LienheadminComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1", 2);
      \u0275\u0275text(3, "Th\xF4ng B\xE1o");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "p", 3);
      \u0275\u0275text(5, "R\u1EA5t ti\u1EBFc! B\u1EA1n Ch\u01B0a \u0110\u01B0\u1EE3c Ph\xE2n Quy\u1EC1n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "p", 4);
      \u0275\u0275text(7, "Vui l\xF2ng li\xEAn h\u1EC7 admin \u0111\u1EC3 \u0111\u01B0\u1EE3c c\u1EA5p quy\u1EC1n. Zalo : 0977272967");
      \u0275\u0275elementEnd()()();
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LienheadminComponent, { className: "LienheadminComponent", filePath: "src/app/site/lienheadmin/lienheadmin.component.ts", lineNumber: 11 });
})();
export {
  LienheadminComponent
};
//# sourceMappingURL=chunk-YCL6XRVX.mjs.map
