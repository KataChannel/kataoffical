import './polyfills.server.mjs';
import {
  ListAuditlogComponent
} from "./chunk-A73QGNSZ.mjs";
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

// src/app/admin/auditlog/auditlog.route.ts
var routes = [
  {
    path: "",
    component: ListAuditlogComponent,
    children: [
      __spreadValues({
        path: ":id",
        loadComponent: () => import("./chunk-JIUDND2S.mjs").then((c) => c.DetailAuditlogComponent)
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
//# sourceMappingURL=chunk-S32T6AUF.mjs.map
