import {
  ListImportdataComponent
} from "./chunk-5J4XD57N.js";
import "./chunk-43QJYMYB.js";
import "./chunk-7WVYP3U4.js";
import "./chunk-QBADE6I6.js";
import "./chunk-23TLPLBD.js";
import "./chunk-5Z2QWFRS.js";
import "./chunk-SBR2VK7Y.js";
import "./chunk-VRWIKL3Q.js";
import "./chunk-2XNI5BG3.js";
import "./chunk-LEINIWDA.js";
import "./chunk-YK4IEOL5.js";
import "./chunk-TVYI4UUP.js";
import "./chunk-JWBKJV3R.js";
import "./chunk-DOJR6IHP.js";
import "./chunk-TF67DZTX.js";
import "./chunk-LIKOVN7R.js";
import "./chunk-R5HFYA7U.js";
import "./chunk-OI2XW6CY.js";
import "./chunk-MKCJCKWI.js";
import "./chunk-XY2N6Z76.js";
import "./chunk-RUSDLITN.js";
import "./chunk-RP2YRSE3.js";
import {
  RouterModule
} from "./chunk-AGKEHWOL.js";
import "./chunk-NOVTUKZ4.js";
import "./chunk-SSKGL4JO.js";
import "./chunk-5F4VG3UZ.js";
import "./chunk-FL27G2EY.js";
import "./chunk-43IDDEVP.js";
import "./chunk-Z46IZ3PI.js";
import "./chunk-6SHRRI2O.js";
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

// src/app/admin/importdata/importdata.route.ts
var routes = [
  {
    path: "",
    component: ListImportdataComponent,
    children: [
      __spreadValues({
        path: ":id",
        loadComponent: () => import("./chunk-7UFGTSLX.js").then((c) => c.DetailImportdataComponent)
      }, false ? { \u0275entryName: "src/app/admin/importdata/detailimportdata/detailimportdata.component.ts" } : {})
    ]
  }
];
var ImportdataRoutingModule = class _ImportdataRoutingModule {
  static \u0275fac = function ImportdataRoutingModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ImportdataRoutingModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _ImportdataRoutingModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
};
export {
  ImportdataRoutingModule
};
//# sourceMappingURL=chunk-U6UPQHL4.js.map
