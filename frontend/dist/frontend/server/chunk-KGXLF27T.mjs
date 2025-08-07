import './polyfills.server.mjs';
import {
  ListImportdataComponent
} from "./chunk-44ZSP2WN.mjs";
import "./chunk-HIZ2UIRP.mjs";
import "./chunk-7QWUG222.mjs";
import "./chunk-PVLDU33E.mjs";
import "./chunk-GHPWMJNO.mjs";
import "./chunk-VX6D2TRX.mjs";
import "./chunk-HVVVXKUA.mjs";
import "./chunk-ESYIALWJ.mjs";
import "./chunk-FOXQ7452.mjs";
import "./chunk-UXO2SBGM.mjs";
import "./chunk-6R25CFXQ.mjs";
import "./chunk-BMDXMCXP.mjs";
import "./chunk-CXFG5YDN.mjs";
import "./chunk-KPXPV3IG.mjs";
import "./chunk-C4Q5BIA5.mjs";
import "./chunk-DWV2CVG4.mjs";
import "./chunk-RCQ574CW.mjs";
import "./chunk-7O7BZAOJ.mjs";
import "./chunk-RGTCKLO2.mjs";
import "./chunk-GOLLTURE.mjs";
import "./chunk-Z7QVUZWX.mjs";
import "./chunk-HQOWTRL4.mjs";
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

// src/app/admin/importdata/importdata.route.ts
var routes = [
  {
    path: "",
    component: ListImportdataComponent,
    children: [
      __spreadValues({
        path: ":id",
        loadComponent: () => import("./chunk-H3N5GHZR.mjs").then((c) => c.DetailImportdataComponent)
      }, true ? { \u0275entryName: "src/app/admin/importdata/detailimportdata/detailimportdata.component.ts" } : {})
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
//# sourceMappingURL=chunk-KGXLF27T.mjs.map
