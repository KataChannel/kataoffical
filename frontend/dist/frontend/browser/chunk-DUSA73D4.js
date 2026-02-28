import {
  ListNhomnccComponent
} from "./chunk-QTC2M4EF.js";
import "./chunk-7CDWZLNJ.js";
import "./chunk-S6K43KTV.js";
import "./chunk-UBU6BPOA.js";
import "./chunk-DOJR6IHP.js";
import "./chunk-TF67DZTX.js";
import "./chunk-LIKOVN7R.js";
import "./chunk-R5HFYA7U.js";
import "./chunk-EMT3PHD4.js";
import "./chunk-MKCJCKWI.js";
import "./chunk-W6W5IZUE.js";
import "./chunk-BLSCHC3G.js";
import {
  RouterModule
} from "./chunk-I3HWRSST.js";
import "./chunk-S5TWTPVL.js";
import "./chunk-5F4VG3UZ.js";
import "./chunk-7TLPKC3B.js";
import "./chunk-RPDITV5T.js";
import "./chunk-4KYN7I6C.js";
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

// src/app/admin/nhomncc/nhomncc.route.ts
var routes = [
  {
    path: "",
    component: ListNhomnccComponent,
    children: [
      __spreadValues({
        path: ":id",
        loadComponent: () => import("./chunk-TAZJLBOL.js").then((c) => c.DetailNhomnccComponent)
      }, false ? { \u0275entryName: "src/app/admin/nhomncc/detailnhomncc/detailnhomncc.component.ts" } : {})
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
//# sourceMappingURL=chunk-DUSA73D4.js.map
