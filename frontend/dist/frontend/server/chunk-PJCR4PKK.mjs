import './polyfills.server.mjs';
import {
  ListKhachhangComponent
} from "./chunk-UU32UDLS.mjs";
import "./chunk-FOXQ7452.mjs";
import "./chunk-6R25CFXQ.mjs";
import "./chunk-BMDXMCXP.mjs";
import "./chunk-CXFG5YDN.mjs";
import "./chunk-UCGC4G46.mjs";
import "./chunk-2FMT7VQU.mjs";
import "./chunk-J322K7NT.mjs";
import "./chunk-C4Q5BIA5.mjs";
import "./chunk-TGADPWSB.mjs";
import "./chunk-DWV2CVG4.mjs";
import "./chunk-RCQ574CW.mjs";
import "./chunk-7O7BZAOJ.mjs";
import "./chunk-RGTCKLO2.mjs";
import "./chunk-GOLLTURE.mjs";
import "./chunk-Z7QVUZWX.mjs";
import "./chunk-I23Q342N.mjs";
import "./chunk-RUJ72W7P.mjs";
import "./chunk-TEMMKMG5.mjs";
import "./chunk-YOUETZOR.mjs";
import "./chunk-TGETIOQI.mjs";
import "./chunk-BTD2ENWJ.mjs";
import "./chunk-DRJRGOAY.mjs";
import "./chunk-QFPTY5IH.mjs";
import "./chunk-A6W66WDU.mjs";
import "./chunk-AVOXPLBL.mjs";
import "./chunk-MGLNC3ZQ.mjs";
import "./chunk-2QXHUJNF.mjs";
import "./chunk-7GJ6SLXG.mjs";
import "./chunk-CE5R7E7Z.mjs";
import {
  RouterModule
} from "./chunk-PLFAEF4K.mjs";
import "./chunk-HCNIBG7Y.mjs";
import "./chunk-H3GF4RFC.mjs";
import {
  ɵɵdefineInjector,
  ɵɵdefineNgModule
} from "./chunk-4EQURZBD.mjs";
import "./chunk-QS2IQGEQ.mjs";
import {
  __spreadValues
} from "./chunk-FMEBT56H.mjs";

// src/app/admin/khachhang/khachhang.route.ts
var routes = [
  __spreadValues({
    path: "dashboard",
    loadComponent: () => import("./chunk-Y2CMI6V4.mjs").then((c) => c.DashboarkhachhangComponent)
  }, true ? { \u0275entryName: "src/app/admin/khachhang/dashboarkhachhang/dashboarkhachhang.component.ts" } : {}),
  {
    path: "",
    component: ListKhachhangComponent,
    children: [
      __spreadValues({
        path: ":id",
        loadComponent: () => import("./chunk-CEBYTBHW.mjs").then((c) => c.DetailKhachhangComponent)
      }, true ? { \u0275entryName: "src/app/admin/khachhang/detailkhachhang/detailkhachhang.component.ts" } : {})
    ]
  }
];
var KhachhangRoutingModule = class _KhachhangRoutingModule {
  static \u0275fac = function KhachhangRoutingModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _KhachhangRoutingModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _KhachhangRoutingModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
};
export {
  KhachhangRoutingModule
};
//# sourceMappingURL=chunk-PJCR4PKK.mjs.map
