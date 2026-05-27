import './polyfills.server.mjs';
import {
  __spreadValues
} from "./chunk-FMEBT56H.mjs";

// src/app/admin/nhanvien/nhanvien.route.ts
var nhanvienRoutes = [
  {
    path: "",
    redirectTo: "list",
    pathMatch: "full"
  },
  __spreadValues({
    path: "list",
    loadComponent: () => import("./chunk-3JDXXYIJ.mjs").then((m) => m.ListNhanvienComponent),
    data: {
      title: "Danh s\xE1ch Nh\xE2n Vi\xEAn",
      breadcrumb: "Danh s\xE1ch"
    }
  }, true ? { \u0275entryName: "src/app/admin/nhanvien/listnhanvien/listnhanvien.component.ts" } : {}),
  __spreadValues({
    path: "create",
    loadComponent: () => import("./chunk-6IRB73EH.mjs").then((m) => m.FormNhanvienComponent),
    data: {
      title: "Th\xEAm Nh\xE2n Vi\xEAn",
      breadcrumb: "Th\xEAm m\u1EDBi",
      mode: "create"
    }
  }, true ? { \u0275entryName: "src/app/admin/nhanvien/formnhanvien/formnhanvien.component.ts" } : {}),
  __spreadValues({
    path: "edit/:id",
    loadComponent: () => import("./chunk-6IRB73EH.mjs").then((m) => m.FormNhanvienComponent),
    data: {
      title: "Ch\u1EC9nh S\u1EEDa Nh\xE2n Vi\xEAn",
      breadcrumb: "Ch\u1EC9nh s\u1EEDa",
      mode: "edit"
    }
  }, true ? { \u0275entryName: "src/app/admin/nhanvien/formnhanvien/formnhanvien.component.ts" } : {}),
  __spreadValues({
    path: "detail/:id",
    loadComponent: () => import("./chunk-PRXMUS2B.mjs").then((m) => m.DetailNhanvienComponent),
    data: {
      title: "Chi Ti\u1EBFt Nh\xE2n Vi\xEAn",
      breadcrumb: "Chi ti\u1EBFt"
    }
  }, true ? { \u0275entryName: "src/app/admin/nhanvien/detailnhanvien/detailnhanvien.component.ts" } : {})
];
export {
  nhanvienRoutes
};
//# sourceMappingURL=chunk-2FMVMSJA.mjs.map
