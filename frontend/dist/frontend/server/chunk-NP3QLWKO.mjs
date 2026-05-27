import './polyfills.server.mjs';
import {
  ListNhacungcapComponent
} from "./chunk-B6SCMR4W.mjs";
import "./chunk-DA5VIJEH.mjs";
import "./chunk-VL2LVL37.mjs";
import "./chunk-2FMT7VQU.mjs";
import "./chunk-3XVDGDXS.mjs";
import "./chunk-PFX6ZNS2.mjs";
import "./chunk-EB4UUH73.mjs";
import "./chunk-RGTCKLO2.mjs";
import "./chunk-DX7YIIY5.mjs";
import "./chunk-IQORQLD3.mjs";
import "./chunk-EWXDPTNY.mjs";
import "./chunk-AM3BBS5E.mjs";
import {
  RouterModule
} from "./chunk-TLYIA537.mjs";
import "./chunk-3VZFOMYA.mjs";
import "./chunk-5PWX7G23.mjs";
import "./chunk-PQY5STY2.mjs";
import "./chunk-KU7CK3YB.mjs";
import "./chunk-4QEJTP76.mjs";
import "./chunk-K4777VIL.mjs";
import "./chunk-VOLHFDBH.mjs";
import "./chunk-A5AQV4K7.mjs";
import "./chunk-OWHCCJ6T.mjs";
import "./chunk-AF3EHXCM.mjs";
import "./chunk-LOJIWTVC.mjs";
import "./chunk-K6ADGRHN.mjs";
import "./chunk-VMLPK7VD.mjs";
import "./chunk-RILUB63S.mjs";
import "./chunk-AJDW274Y.mjs";
import "./chunk-UP6A7POK.mjs";
import {
  ɵɵdefineInjector,
  ɵɵdefineNgModule
} from "./chunk-I6KZCWLZ.mjs";
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
        loadComponent: () => import("./chunk-XI257SO7.mjs").then((c) => c.DetailNhacungcapComponent)
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
//# sourceMappingURL=chunk-NP3QLWKO.mjs.map
