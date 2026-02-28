import {
  ListAuditlogComponent
} from "./chunk-VECXWAX5.js";
import "./chunk-FTMLWTPE.js";
import "./chunk-MBT6RSCF.js";
import "./chunk-7CDWZLNJ.js";
import "./chunk-S6K43KTV.js";
import "./chunk-UBU6BPOA.js";
import "./chunk-DOJR6IHP.js";
import "./chunk-TF67DZTX.js";
import "./chunk-LIKOVN7R.js";
import "./chunk-GODCD4GS.js";
import "./chunk-EMT3PHD4.js";
import "./chunk-MKCJCKWI.js";
import "./chunk-W6W5IZUE.js";
import "./chunk-BLSCHC3G.js";
import {
  RouterModule
} from "./chunk-I3HWRSST.js";
import "./chunk-S5TWTPVL.js";
import "./chunk-5F4VG3UZ.js";
import "./chunk-5TD47VMU.js";
import "./chunk-PQ5C5V7E.js";
import "./chunk-7TLPKC3B.js";
import "./chunk-FQNHKKYV.js";
import "./chunk-SSCVWHZW.js";
import "./chunk-FCO3RLCX.js";
import "./chunk-JUAFAJ2Y.js";
import "./chunk-EOVYE2CD.js";
import "./chunk-ZGUYOD2D.js";
import "./chunk-QKOCOOG3.js";
import "./chunk-OB46FS5W.js";
import "./chunk-PBFAMPOS.js";
import "./chunk-C5TB4WSU.js";
import "./chunk-EXJ7KYIY.js";
import "./chunk-JCKTSD6E.js";
import "./chunk-2QF354AD.js";
import "./chunk-WSR5IJUW.js";
import "./chunk-2VHAU5LM.js";
import {
  ɵɵdefineInjector,
  ɵɵdefineNgModule
} from "./chunk-FWM3YOMT.js";
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
        loadComponent: () => import("./chunk-WVCW3F7V.js").then((c) => c.DetailAuditlogComponent)
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
//# sourceMappingURL=chunk-A4GLNCHI.js.map
