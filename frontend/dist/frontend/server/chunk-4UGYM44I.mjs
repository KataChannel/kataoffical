import './polyfills.server.mjs';
import {
  ListAuditlogComponent
} from "./chunk-4JEZUD3F.mjs";
import "./chunk-2FMT7VQU.mjs";
import "./chunk-T2GSXKIR.mjs";
import "./chunk-VO5ZZWXY.mjs";
import "./chunk-NV7NCVB6.mjs";
import "./chunk-QGE5RGZP.mjs";
import "./chunk-XQWRZCE6.mjs";
import "./chunk-WJ6GNNQZ.mjs";
import "./chunk-TEMMKMG5.mjs";
import "./chunk-SRFBCIVI.mjs";
import "./chunk-OLFDOXYK.mjs";
import "./chunk-RGTCKLO2.mjs";
import "./chunk-BKIOO2IQ.mjs";
import "./chunk-UASPM37G.mjs";
import "./chunk-7FHKYRY5.mjs";
import {
  RouterModule
} from "./chunk-XXHMETOB.mjs";
import "./chunk-LXPCAAVO.mjs";
import "./chunk-2BTDEHR6.mjs";
import "./chunk-BKGWM7TB.mjs";
import "./chunk-OBYVUVCN.mjs";
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

// src/app/admin/auditlog/auditlog.route.ts
var routes = [
  {
    path: "",
    component: ListAuditlogComponent,
    children: [
      __spreadValues({
        path: ":id",
        loadComponent: () => import("./chunk-QWBBHGU2.mjs").then((c) => c.DetailAuditlogComponent)
      }, true ? { \u0275entryName: "src/app/admin/auditlog/detailauditlog/detailauditlog.component.ts" } : {})
    ]
  }
];
var AuditlogRoutingModule = class _AuditlogRoutingModule {
  static \u0275fac = function AuditlogRoutingModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AuditlogRoutingModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _AuditlogRoutingModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
};
export {
  AuditlogRoutingModule
};
//# sourceMappingURL=chunk-4UGYM44I.mjs.map
