import {
  ListNhacungcapComponent
} from "./chunk-CW24U54C.js";
import "./chunk-FJBGIWGZ.js";
import "./chunk-HXYVFSEQ.js";
import "./chunk-FTMLWTPE.js";
import "./chunk-MBT6RSCF.js";
import "./chunk-S6K43KTV.js";
import "./chunk-UBU6BPOA.js";
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

// src/app/admin/nhacungcap/nhacungcap.route.ts
var routes = [
  {
    path: "",
    component: ListNhacungcapComponent,
    children: [
      __spreadValues({
        path: ":id",
        loadComponent: () => import("./chunk-L5ZJ3RO4.js").then((c) => c.DetailNhacungcapComponent)
      }, false ? { \u0275entryName: "src/app/admin/nhacungcap/detailnhacungcap/detailnhacungcap.component.ts" } : {})
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
//# sourceMappingURL=chunk-2BZSRNYG.js.map
