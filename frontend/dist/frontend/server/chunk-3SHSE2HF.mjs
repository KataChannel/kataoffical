import './polyfills.server.mjs';
import {
  ListNhomnccComponent
} from "./chunk-TKQEU53R.mjs";
import "./chunk-7OSI4ORM.mjs";
import "./chunk-PFX6ZNS2.mjs";
import "./chunk-EB4UUH73.mjs";
import "./chunk-KMEFW6OC.mjs";
import "./chunk-TEMMKMG5.mjs";
import "./chunk-CXFG5YDN.mjs";
import "./chunk-TACHADZV.mjs";
import "./chunk-RGTCKLO2.mjs";
import "./chunk-DX7YIIY5.mjs";
import "./chunk-IQORQLD3.mjs";
import {
  RouterModule
} from "./chunk-TLYIA537.mjs";
import "./chunk-3VZFOMYA.mjs";
import "./chunk-SLWHV4LF.mjs";
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
import "./chunk-3RMAAFYO.mjs";
import {
  __spreadValues
} from "./chunk-FMEBT56H.mjs";

// src/app/admin/nhomncc/nhomncc.route.ts
var routes = [
  {
    path: "",
    component: ListNhomnccComponent,
    children: [
      __spreadValues({
        path: ":id",
        loadComponent: () => import("./chunk-BQIBLV6M.mjs").then((c) => c.DetailNhomnccComponent)
      }, true ? { \u0275entryName: "src/app/admin/nhomncc/detailnhomncc/detailnhomncc.component.ts" } : {})
    ]
  }
];
var NhomnccRoutingModule = class _NhomnccRoutingModule {
  static \u0275fac = function NhomnccRoutingModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NhomnccRoutingModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _NhomnccRoutingModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
};
export {
  NhomnccRoutingModule
};
//# sourceMappingURL=chunk-3SHSE2HF.mjs.map
