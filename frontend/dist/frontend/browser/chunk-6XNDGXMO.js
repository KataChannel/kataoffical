import {
  ListImportdataComponent
} from "./chunk-25SUIBXA.js";
import "./chunk-JHPERFEP.js";
import "./chunk-P65SF2KI.js";
import "./chunk-UX4CDG7I.js";
import "./chunk-I2ATNWV5.js";
import "./chunk-542P3TXC.js";
import "./chunk-VNCWOGLS.js";
import "./chunk-4UKCSTFJ.js";
import "./chunk-MDKJ5PGV.js";
import "./chunk-KRR6EHK2.js";
import "./chunk-H3SQLGMC.js";
import "./chunk-56QAEOBZ.js";
import "./chunk-R5HFYA7U.js";
import "./chunk-XGCTO3IF.js";
import "./chunk-UV2EYCAL.js";
import "./chunk-YS6BOFHA.js";
import "./chunk-VONEIXGX.js";
import "./chunk-S32RIQSG.js";
import "./chunk-OZX2XR6T.js";
import "./chunk-JFLWRVXN.js";
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

// src/app/admin/importdata/importdata.route.ts
var routes = [
  {
    path: "",
    component: ListImportdataComponent,
    children: [
      __spreadValues({
        path: ":id",
        loadComponent: () => import("./chunk-X7BJCLQR.js").then((c) => c.DetailImportdataComponent)
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
//# sourceMappingURL=chunk-6XNDGXMO.js.map
