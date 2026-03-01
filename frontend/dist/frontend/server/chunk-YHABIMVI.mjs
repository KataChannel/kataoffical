import './polyfills.server.mjs';
import {
  ListChotkhoComponent
} from "./chunk-NZIEXBMW.mjs";
import "./chunk-NXFUDCIF.mjs";
import "./chunk-S3RNB2QN.mjs";
import "./chunk-ESQR3GQR.mjs";
import "./chunk-2FMT7VQU.mjs";
import "./chunk-T2GSXKIR.mjs";
import "./chunk-NV7NCVB6.mjs";
import "./chunk-QGE5RGZP.mjs";
import "./chunk-HSH2C6QH.mjs";
import "./chunk-RGTCKLO2.mjs";
import "./chunk-BKIOO2IQ.mjs";
import "./chunk-UASPM37G.mjs";
import "./chunk-7FHKYRY5.mjs";
import "./chunk-LRQVYHIC.mjs";
import {
  RouterModule
} from "./chunk-XXHMETOB.mjs";
import "./chunk-LXPCAAVO.mjs";
import "./chunk-MECBLMI6.mjs";
import "./chunk-XEJ7KODZ.mjs";
import "./chunk-2BTDEHR6.mjs";
import "./chunk-BKGWM7TB.mjs";
import "./chunk-UYYJQ6OX.mjs";
import "./chunk-OBYVUVCN.mjs";
import "./chunk-PGBOYRYY.mjs";
import "./chunk-G5Q3EA6K.mjs";
import "./chunk-AJSGP2QM.mjs";
import "./chunk-WVX3EDL3.mjs";
import "./chunk-AQETVGJS.mjs";
import "./chunk-5444DBJD.mjs";
import "./chunk-IU3FX4W2.mjs";
import "./chunk-DV7552T6.mjs";
import "./chunk-WUOSISWE.mjs";
import "./chunk-SPQ4ZDSL.mjs";
import "./chunk-K2LNKYXW.mjs";
import "./chunk-7RV546X3.mjs";
import "./chunk-IKKFEUUM.mjs";
import "./chunk-DRZ4ITVR.mjs";
import "./chunk-2JIL42JL.mjs";
import "./chunk-WGGH2PUJ.mjs";
import {
  ɵɵdefineInjector,
  ɵɵdefineNgModule
} from "./chunk-ADMXANIA.mjs";
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
        loadComponent: () => import("./chunk-W5Z7C55W.mjs").then((c) => c.DetailChotkhoComponent)
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
//# sourceMappingURL=chunk-YHABIMVI.mjs.map
