import './polyfills.server.mjs';
import {
  ListImportdataComponent
} from "./chunk-SXUDLUOF.mjs";
import "./chunk-TS5VI2QG.mjs";
import "./chunk-YTE3TFOP.mjs";
import "./chunk-UZS2VT3J.mjs";
import "./chunk-6C4QP5HU.mjs";
import "./chunk-G2WBPEJY.mjs";
import "./chunk-EUI2DIEC.mjs";
import "./chunk-VITNIRTU.mjs";
import "./chunk-CJ3CJXAJ.mjs";
import "./chunk-3MPX6R2V.mjs";
import "./chunk-XJHVYA25.mjs";
import "./chunk-RT23KED7.mjs";
import "./chunk-WS5XWDEX.mjs";
import "./chunk-XQWRZCE6.mjs";
import "./chunk-WJ6GNNQZ.mjs";
import "./chunk-TEMMKMG5.mjs";
import "./chunk-CXFG5YDN.mjs";
import "./chunk-77WWCF4N.mjs";
import "./chunk-BLREHDPM.mjs";
import "./chunk-RGTCKLO2.mjs";
import "./chunk-AESSWZ4W.mjs";
import "./chunk-JNHRISVT.mjs";
import "./chunk-NU7WWMYS.mjs";
import "./chunk-VFPWTYCL.mjs";
import {
  RouterModule
} from "./chunk-HRPVH7WR.mjs";
import "./chunk-VF45CXPP.mjs";
import "./chunk-3I55OMWU.mjs";
import "./chunk-HAGRL2CT.mjs";
import "./chunk-ZYFSGH3S.mjs";
import "./chunk-BKGWM7TB.mjs";
import "./chunk-HJOOFARF.mjs";
import "./chunk-LPLDGY7B.mjs";
import "./chunk-E2GALVII.mjs";
import "./chunk-GDGUHJEW.mjs";
import "./chunk-UCMTPX2K.mjs";
import "./chunk-VDRWKQ4T.mjs";
import "./chunk-Q2CU4U3P.mjs";
import "./chunk-27SFIHK6.mjs";
import "./chunk-DZ43XGSB.mjs";
import "./chunk-BRLSQF3K.mjs";
import "./chunk-3B3VS2W4.mjs";
import "./chunk-RDBGA3AP.mjs";
import "./chunk-KWDBPYQT.mjs";
import "./chunk-7GASYLAT.mjs";
import "./chunk-Y3VBDLFR.mjs";
import "./chunk-VNUZ7HP6.mjs";
import {
  ɵɵdefineInjector,
  ɵɵdefineNgModule
} from "./chunk-6NXY6CBU.mjs";
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
        loadComponent: () => import("./chunk-VBDAU7HL.mjs").then((c) => c.DetailImportdataComponent)
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
//# sourceMappingURL=chunk-PMDKERAF.mjs.map
