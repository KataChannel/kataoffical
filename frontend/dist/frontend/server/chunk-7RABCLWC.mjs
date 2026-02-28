import './polyfills.server.mjs';
import {
  ListChotkhoComponent
} from "./chunk-KWZLRMS4.mjs";
import "./chunk-L5J3S7SR.mjs";
import "./chunk-S3RNB2QN.mjs";
import "./chunk-P4O2AH4P.mjs";
import "./chunk-2FMT7VQU.mjs";
import "./chunk-L2YTN2QG.mjs";
import "./chunk-XJHVYA25.mjs";
import "./chunk-RT23KED7.mjs";
import "./chunk-77WWCF4N.mjs";
import "./chunk-RGTCKLO2.mjs";
import "./chunk-AESSWZ4W.mjs";
import "./chunk-JNHRISVT.mjs";
import "./chunk-NU7WWMYS.mjs";
import "./chunk-VFPWTYCL.mjs";
import {
  RouterModule
} from "./chunk-HRPVH7WR.mjs";
import "./chunk-VF45CXPP.mjs";
import "./chunk-3I55OMWU.mjs";
import "./chunk-HAGRL2CT.mjs";
import "./chunk-ZYFSGH3S.mjs";
import "./chunk-BKGWM7TB.mjs";
import "./chunk-HJOOFARF.mjs";
import "./chunk-6GML6PCL.mjs";
import "./chunk-UMQUK2UX.mjs";
import "./chunk-LPLDGY7B.mjs";
import "./chunk-E2GALVII.mjs";
import "./chunk-GDGUHJEW.mjs";
import "./chunk-UCMTPX2K.mjs";
import "./chunk-VDRWKQ4T.mjs";
import "./chunk-Q2CU4U3P.mjs";
import "./chunk-27SFIHK6.mjs";
import "./chunk-DZ43XGSB.mjs";
import "./chunk-BRLSQF3K.mjs";
import "./chunk-3B3VS2W4.mjs";
import "./chunk-RDBGA3AP.mjs";
import "./chunk-KWDBPYQT.mjs";
import "./chunk-7GASYLAT.mjs";
import "./chunk-Y3VBDLFR.mjs";
import "./chunk-VNUZ7HP6.mjs";
import {
  ɵɵdefineInjector,
  ɵɵdefineNgModule
} from "./chunk-6NXY6CBU.mjs";
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
        loadComponent: () => import("./chunk-7C7CMWVX.mjs").then((c) => c.DetailChotkhoComponent)
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
//# sourceMappingURL=chunk-7RABCLWC.mjs.map
