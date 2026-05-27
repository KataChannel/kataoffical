import './polyfills.server.mjs';
import {
  __spreadValues
} from "./chunk-FMEBT56H.mjs";

// src/app/admin/phongban/phongban.route.ts
var phongbanRoutes = [
  {
    path: "",
    redirectTo: "list",
    pathMatch: "full"
  },
  __spreadValues({
    path: "list",
    loadComponent: () => import("./chunk-DRIXRHTN.mjs").then((m) => m.ListPhongbanComponent),
    data: {
      title: "Danh s\xE1ch Ph\xF2ng Ban",
      breadcrumb: "Danh s\xE1ch"
    }
  }, true ? { \u0275entryName: "src/app/admin/phongban/listphongban/listphongban.component.ts" } : {}),
  __spreadValues({
    path: "create",
    loadComponent: () => import("./chunk-X4L7ODDA.mjs").then((m) => m.FormPhongbanComponent),
    data: {
      title: "Th\xEAm Ph\xF2ng Ban",
      breadcrumb: "Th\xEAm m\u1EDBi",
      mode: "create"
    }
  }, true ? { \u0275entryName: "src/app/admin/phongban/formphongban/formphongban.component.ts" } : {}),
  __spreadValues({
    path: "edit/:id",
    loadComponent: () => import("./chunk-X4L7ODDA.mjs").then((m) => m.FormPhongbanComponent),
    data: {
      title: "S\u1EEDa Ph\xF2ng Ban",
      breadcrumb: "Ch\u1EC9nh s\u1EEDa",
      mode: "edit"
    }
  }, true ? { \u0275entryName: "src/app/admin/phongban/formphongban/formphongban.component.ts" } : {}),
  __spreadValues({
    path: "detail/:id",
    loadComponent: () => import("./chunk-54YX4JP3.mjs").then((m) => m.DetailPhongbanComponent),
    data: {
      title: "Chi Ti\u1EBFt Ph\xF2ng Ban",
      breadcrumb: "Chi ti\u1EBFt"
    }
  }, true ? { \u0275entryName: "src/app/admin/phongban/detailphongban/detailphongban.component.ts" } : {})
  // TODO: Tree view coming soon
  // {
  //   path: 'tree',
  //   loadComponent: () => 
  //     import('./treephongban/treephongban.component').then(m => m.TreePhongbanComponent),
  //   data: { 
  //     title: 'Sơ Đồ Tổ Chức',
  //     breadcrumb: 'Sơ đồ'
  //   }
  // }
];
export {
  phongbanRoutes
};
//# sourceMappingURL=chunk-N64BHMMM.mjs.map
