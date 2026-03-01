import {
  ListNhomnccComponent
} from "./chunk-6CCEU35O.js";
import "./chunk-LIZF5AEJ.js";
import "./chunk-YK4IEOL5.js";
import "./chunk-TVYI4UUP.js";
import "./chunk-DOJR6IHP.js";
import "./chunk-TF67DZTX.js";
import "./chunk-LIKOVN7R.js";
import "./chunk-R5HFYA7U.js";
import "./chunk-EMT3PHD4.js";
import "./chunk-MKCJCKWI.js";
import "./chunk-XY2N6Z76.js";
import "./chunk-RUSDLITN.js";
import {
  RouterModule
} from "./chunk-AGKEHWOL.js";
import "./chunk-SSKGL4JO.js";
import "./chunk-5F4VG3UZ.js";
import "./chunk-43IDDEVP.js";
import "./chunk-Y4MVQOE5.js";
import "./chunk-IABB4NTX.js";
import "./chunk-TUEMV45J.js";
import "./chunk-E3N2TZ4N.js";
import "./chunk-JNSSVLJO.js";
import "./chunk-65RDCWJI.js";
import "./chunk-XDPJU2GK.js";
import "./chunk-SOPKJ4GV.js";
import "./chunk-ZRMLZ234.js";
import "./chunk-4ERWVCO4.js";
import "./chunk-U5KYXYKC.js";
import "./chunk-FZT2LBIG.js";
import "./chunk-BRETK2KI.js";
import "./chunk-EMBYIBW3.js";
import "./chunk-HCACJZKN.js";
import "./chunk-RKTFENMZ.js";
import {
  ɵɵdefineInjector,
  ɵɵdefineNgModule
} from "./chunk-RBDY2J7V.js";
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
        loadComponent: () => import("./chunk-7J4YGGRK.js").then((c) => c.DetailNhomnccComponent)
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
//# sourceMappingURL=chunk-NWCZPYUM.js.map
