import {
  ListAuditlogComponent
} from "./chunk-CKRNRVOC.js";
import "./chunk-X7ROAIMK.js";
import "./chunk-FTMLWTPE.js";
import "./chunk-OTAJRW5P.js";
import "./chunk-UV2EYCAL.js";
import "./chunk-YS6BOFHA.js";
import "./chunk-S32RIQSG.js";
import "./chunk-CB53OP7A.js";
import "./chunk-OZX2XR6T.js";
import "./chunk-JFLWRVXN.js";
import "./chunk-657A73EG.js";
import "./chunk-MKCJCKWI.js";
import "./chunk-KRIHICU6.js";
import "./chunk-VZZGNK7J.js";
import "./chunk-LIKOVN7R.js";
import "./chunk-3J77SWWE.js";
import "./chunk-ZAANGQNB.js";
import "./chunk-WEAWHMFJ.js";
import "./chunk-44ZKFD54.js";
import "./chunk-U3IXXJDR.js";
import "./chunk-WD36GM3Q.js";
import "./chunk-2AWV6PYA.js";
import "./chunk-4E5W4BJX.js";
import "./chunk-HICNAP2H.js";
import "./chunk-LD5X4C2B.js";
import "./chunk-GWKJMKCD.js";
import {
  RouterModule
} from "./chunk-JGMWTFVW.js";
import "./chunk-KJMZCM3Q.js";
import "./chunk-E6DSVUBK.js";
import {
  ɵɵdefineInjector,
  ɵɵdefineNgModule
} from "./chunk-IHZ7YO24.js";
import "./chunk-E3MB3462.js";
import {
  __spreadValues
} from "./chunk-SXK72SKC.js";

// src/app/admin/auditlog/auditlog.route.ts
var routes = [
  {
    path: "",
    component: ListAuditlogComponent,
    children: [
      __spreadValues({
        path: ":id",
        loadComponent: () => import("./chunk-XCCNEVFW.js").then((c) => c.DetailAuditlogComponent)
      }, false ? { \u0275entryName: "src/app/admin/auditlog/detailauditlog/detailauditlog.component.ts" } : {})
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
//# sourceMappingURL=chunk-3H6RMMR3.js.map
