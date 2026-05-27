import {
  __spreadValues
} from "./chunk-SXK72SKC.js";

// src/app/admin/nhanvien/nhanvien.route.ts
var nhanvienRoutes = [
  {
    path: "",
    redirectTo: "list",
    pathMatch: "full"
  },
  __spreadValues({
    path: "list",
    loadComponent: () => import("./chunk-777NQAPV.js").then((m) => m.ListNhanvienComponent),
    data: {
      title: "Danh s\xE1ch Nh\xE2n Vi\xEAn",
      breadcrumb: "Danh s\xE1ch"
    }
  }, false ? { \u0275entryName: "src/app/admin/nhanvien/listnhanvien/listnhanvien.component.ts" } : {}),
  __spreadValues({
    path: "create",
    loadComponent: () => import("./chunk-5OXJR3QB.js").then((m) => m.FormNhanvienComponent),
    data: {
      title: "Th\xEAm Nh\xE2n Vi\xEAn",
      breadcrumb: "Th\xEAm m\u1EDBi",
      mode: "create"
    }
  }, false ? { \u0275entryName: "src/app/admin/nhanvien/formnhanvien/formnhanvien.component.ts" } : {}),
  __spreadValues({
    path: "edit/:id",
    loadComponent: () => import("./chunk-5OXJR3QB.js").then((m) => m.FormNhanvienComponent),
    data: {
      title: "Ch\u1EC9nh S\u1EEDa Nh\xE2n Vi\xEAn",
      breadcrumb: "Ch\u1EC9nh s\u1EEDa",
      mode: "edit"
    }
  }, false ? { \u0275entryName: "src/app/admin/nhanvien/formnhanvien/formnhanvien.component.ts" } : {}),
  __spreadValues({
    path: "detail/:id",
    loadComponent: () => import("./chunk-L56G7ZP4.js").then((m) => m.DetailNhanvienComponent),
    data: {
      title: "Chi Ti\u1EBFt Nh\xE2n Vi\xEAn",
      breadcrumb: "Chi ti\u1EBFt"
    }
  }, false ? { \u0275entryName: "src/app/admin/nhanvien/detailnhanvien/detailnhanvien.component.ts" } : {})
];
export {
  nhanvienRoutes
};
//# sourceMappingURL=chunk-G2YGWM7M.js.map
