import './polyfills.server.mjs';
import {
  ListNhacungcapComponent
} from "./chunk-2Q7S3TML.mjs";
import "./chunk-HVVVXKUA.mjs";
import "./chunk-6R25CFXQ.mjs";
import "./chunk-BMDXMCXP.mjs";
import "./chunk-UCGC4G46.mjs";
import "./chunk-2FMT7VQU.mjs";
import "./chunk-J322K7NT.mjs";
import "./chunk-DWV2CVG4.mjs";
import "./chunk-7O7BZAOJ.mjs";
import "./chunk-RGTCKLO2.mjs";
import "./chunk-GOLLTURE.mjs";
import "./chunk-Z7QVUZWX.mjs";
import "./chunk-RUJ72W7P.mjs";
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

// src/app/admin/nhacungcap/nhacungcap.route.ts
var routes = [
  {
    path: "",
    component: ListNhacungcapComponent,
    children: [
      __spreadValues({
        path: ":id",
        loadComponent: () => import("./chunk-Q2MLTBST.mjs").then((c) => c.DetailNhacungcapComponent)
      }, true ? { \u0275entryName: "src/app/admin/nhacungcap/detailnhacungcap/detailnhacungcap.component.ts" } : {})
    ]
  }
];
var NhacungcapRoutingModule = class _NhacungcapRoutingModule {
  static \u0275fac = function NhacungcapRoutingModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NhacungcapRoutingModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _NhacungcapRoutingModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
};
export {
  NhacungcapRoutingModule
};
//# sourceMappingURL=chunk-SKV5G474.mjs.map
