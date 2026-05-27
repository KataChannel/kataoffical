import {
  Router
} from "./chunk-2GXGFE2W.js";
import {
  StorageService
} from "./chunk-F5CW4EPT.js";
import "./chunk-3D4DVDG5.js";
import "./chunk-DKLGAVRA.js";
import "./chunk-6PYLDKWR.js";
import "./chunk-FL6G6YYX.js";
import "./chunk-EPU6HK6I.js";
import "./chunk-XM7PTE63.js";
import "./chunk-TAI2MURD.js";
import {
  inject,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵtext
} from "./chunk-SEHLAVZZ.js";
import "./chunk-E3MB3462.js";
import "./chunk-SXK72SKC.js";

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
//# sourceMappingURL=chunk-4E6SLIKD.js.map
