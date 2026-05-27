import {
  ListNhomnccComponent
} from "./chunk-KQACNJ7K.js";
import "./chunk-2DPLPREP.js";
import "./chunk-4I62SID5.js";
import "./chunk-DR2JAJDC.js";
import "./chunk-CVAZHUNB.js";
import "./chunk-LIKOVN7R.js";
import "./chunk-R5HFYA7U.js";
import "./chunk-I2ZL5X6B.js";
import "./chunk-MKCJCKWI.js";
import "./chunk-QY5L4FGH.js";
import "./chunk-D7PAKJDY.js";
import {
  RouterModule
} from "./chunk-2GXGFE2W.js";
import "./chunk-F5CW4EPT.js";
import "./chunk-KFQ5QPP6.js";
import "./chunk-6ECEDFXD.js";
import "./chunk-3D4DVDG5.js";
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

// src/app/admin/nhomncc/nhomncc.route.ts
var routes = [
  {
    path: "",
    component: ListNhomnccComponent,
    children: [
      __spreadValues({
        path: ":id",
        loadComponent: () => import("./chunk-DXTFV4HI.js").then((c) => c.DetailNhomnccComponent)
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
//# sourceMappingURL=chunk-ABY7T7I5.js.map
