import './polyfills.server.mjs';
import {
  ListChotkhoComponent
} from "./chunk-ZPRA5HWX.mjs";
import "./chunk-NJA7P42H.mjs";
import "./chunk-S3RNB2QN.mjs";
import "./chunk-K3I5UUJH.mjs";
import "./chunk-2FMT7VQU.mjs";
import "./chunk-3XVDGDXS.mjs";
import "./chunk-PFX6ZNS2.mjs";
import "./chunk-EB4UUH73.mjs";
import "./chunk-ZVEFRUHR.mjs";
import "./chunk-RGTCKLO2.mjs";
import "./chunk-DX7YIIY5.mjs";
import "./chunk-IQORQLD3.mjs";
import "./chunk-EWXDPTNY.mjs";
import "./chunk-AM3BBS5E.mjs";
import "./chunk-XHRWGDIX.mjs";
import {
  RouterModule
} from "./chunk-TLYIA537.mjs";
import "./chunk-6YRKHWJL.mjs";
import "./chunk-3VZFOMYA.mjs";
import "./chunk-5PWX7G23.mjs";
import "./chunk-SLWHV4LF.mjs";
import "./chunk-KJH76OSC.mjs";
import "./chunk-PQY5STY2.mjs";
import "./chunk-KU7CK3YB.mjs";
import "./chunk-4QEJTP76.mjs";
import "./chunk-K4777VIL.mjs";
import "./chunk-VOLHFDBH.mjs";
import "./chunk-A5AQV4K7.mjs";
import "./chunk-OWHCCJ6T.mjs";
import "./chunk-ZZDECD7O.mjs";
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

// src/app/admin/chotkho/chotkho.route.ts
var routes = [
  {
    path: "",
    component: ListChotkhoComponent,
    children: [
      __spreadValues({
        path: ":id",
        loadComponent: () => import("./chunk-U7PWMTNA.mjs").then((c) => c.DetailChotkhoComponent)
      }, true ? { \u0275entryName: "src/app/admin/chotkho/detailchotkho/detailchotkho.ts" } : {})
    ]
  }
];
var ChotkhoRoutingModule = class _ChotkhoRoutingModule {
  static \u0275fac = function ChotkhoRoutingModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ChotkhoRoutingModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _ChotkhoRoutingModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
};
export {
  ChotkhoRoutingModule
};
//# sourceMappingURL=chunk-23J2M2VW.mjs.map
