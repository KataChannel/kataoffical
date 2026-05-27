import {
  ListImportdataComponent
} from "./chunk-RPP5AXBV.js";
import "./chunk-WSPM3ROW.js";
import "./chunk-KR6X3Z2G.js";
import "./chunk-X4GJLDCB.js";
import "./chunk-QA4Y3GND.js";
import "./chunk-HN7XISGO.js";
import "./chunk-ZTSOB43M.js";
import "./chunk-QEWHOYUO.js";
import "./chunk-W2AEWQA4.js";
import "./chunk-OYBNSF2S.js";
import "./chunk-4I62SID5.js";
import "./chunk-DR2JAJDC.js";
import "./chunk-WNHP5LA7.js";
import "./chunk-CVAZHUNB.js";
import "./chunk-LIKOVN7R.js";
import "./chunk-R5HFYA7U.js";
import "./chunk-TPCMQIAP.js";
import "./chunk-MKCJCKWI.js";
import "./chunk-QY5L4FGH.js";
import "./chunk-D7PAKJDY.js";
import "./chunk-NL7URNET.js";
import {
  RouterModule
} from "./chunk-2GXGFE2W.js";
import "./chunk-DGYBLSTA.js";
import "./chunk-F5CW4EPT.js";
import "./chunk-KFQ5QPP6.js";
import "./chunk-6ECEDFXD.js";
import "./chunk-Y6PF6L3J.js";
import "./chunk-3D4DVDG5.js";
import "./chunk-5Z5IQRCP.js";
import "./chunk-RYTJZHDX.js";
import "./chunk-FEROIANE.js";
import "./chunk-QEGCNOFQ.js";
import "./chunk-SP2Z3Q73.js";
import "./chunk-TAPSLW5I.js";
import "./chunk-GQA7LESQ.js";
import "./chunk-FRF6QBEZ.js";
import "./chunk-TMSN764N.js";
import "./chunk-GSONKL3O.js";
import "./chunk-DKLGAVRA.js";
import "./chunk-6PYLDKWR.js";
import "./chunk-FL6G6YYX.js";
import "./chunk-EPU6HK6I.js";
import "./chunk-XM7PTE63.js";
import "./chunk-TAI2MURD.js";
import {
  ɵɵdefineInjector,
  ɵɵdefineNgModule
} from "./chunk-SEHLAVZZ.js";
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
        loadComponent: () => import("./chunk-O4CQEH3Q.js").then((c) => c.DetailImportdataComponent)
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
//# sourceMappingURL=chunk-6QPASEL5.js.map
