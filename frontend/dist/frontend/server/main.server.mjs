import './polyfills.server.mjs';
import {
  FIREBASE_OPTIONS
} from "./chunk-YLEDBPUB.mjs";
import "./chunk-ZAXNRHQN.mjs";
import "./chunk-CXFG5YDN.mjs";
import {
  destroyAngularServerApp,
  extractRoutesAndCreateRouteTree,
  getOrCreateAngularServerApp,
  provideServerRendering,
  setAngularAppManifest
} from "./chunk-T37PKVDL.mjs";
import "./chunk-Y4MPHOE3.mjs";
import {
  provideServiceWorker
} from "./chunk-4YVKCS5L.mjs";
import {
  UserService
} from "./chunk-XHRWGDIX.mjs";
import {
  Router,
  RouterOutlet,
  provideRouter
} from "./chunk-TLYIA537.mjs";
import {
  StorageService
} from "./chunk-A5AQV4K7.mjs";
import {
  environment
} from "./chunk-OWHCCJ6T.mjs";
import {
  APOLLO_OPTIONS,
  Apollo,
  ApolloLink,
  InMemoryCache,
  Observable as Observable2,
  print
} from "./chunk-ZZDECD7O.mjs";
import {
  MatSnackBar
} from "./chunk-AF3EHXCM.mjs";
import "./chunk-LOJIWTVC.mjs";
import "./chunk-K6ADGRHN.mjs";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  NativeDateAdapter,
  provideNativeDateAdapter
} from "./chunk-VMLPK7VD.mjs";
import "./chunk-RILUB63S.mjs";
import {
  DomRendererFactory2,
  HttpClient,
  HttpHeaders,
  Meta,
  Title,
  bootstrapApplication,
  provideClientHydration,
  provideHttpClient,
  withFetch,
  withInterceptors
} from "./chunk-AJDW274Y.mjs";
import {
  DOCUMENT,
  isPlatformBrowser
} from "./chunk-UP6A7POK.mjs";
import {
  ANIMATION_MODULE_TYPE,
  ChangeDetectionScheduler,
  Injectable,
  InjectionToken,
  Injector,
  NgZone,
  Observable,
  PLATFORM_ID,
  RendererFactory2,
  RuntimeError,
  finalize,
  inject,
  makeEnvironmentProviders,
  mergeApplicationConfig,
  of,
  performanceMarkFeature,
  provideZoneChangeDetection,
  resetCompiledComponents,
  setClassMetadata,
  switchMap,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵgetInheritedFactory,
  ɵɵinject,
  ɵɵinvalidFactory
} from "./chunk-I6KZCWLZ.mjs";
import {
  __assign,
  __extends,
  __rest
} from "./chunk-QS2IQGEQ.mjs";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-FMEBT56H.mjs";

// angular:main-server-inject-manifest:angular:main-server-inject-manifest
import manifest from "./angular-app-manifest.mjs";
setAngularAppManifest(manifest);

// src/app/app.component.ts
var AppComponent = class _AppComponent {
  titleService;
  metaService;
  _UserService;
  title = "Rau S\u1EA1ch Tr\u1EA7n Gia";
  constructor(titleService, metaService, _UserService) {
    this.titleService = titleService;
    this.metaService = metaService;
    this._UserService = _UserService;
  }
  ngOnInit() {
    this._UserService.loadPermissions();
    this.titleService.setTitle("Rau S\u1EA1ch Tr\u1EA7n Gia");
    this.metaService.addTags([
      { name: "description", content: "Rau S\u1EA1ch Tr\u1EA7n Gia - Gi\u1EA3i ph\xE1p ch\u0103m s\xF3c da to\xE0n di\u1EC7n v\u1EDBi c\xF4ng ngh\u1EC7 ti\xEAn ti\u1EBFn, mang l\u1EA1i l\xE0n da kh\u1ECFe m\u1EA1nh, r\u1EA1ng r\u1EE1." },
      { name: "keywords", content: "Rau S\u1EA1ch Tr\u1EA7n Gia, ch\u0103m s\xF3c da, c\xF4ng ngh\u1EC7, l\xE0m \u0111\u1EB9p, skincare, m\u1EF9 ph\u1EA9m, da kh\u1ECFe m\u1EA1nh" },
      { name: "author", content: "T\xEAn t\xE1c gi\u1EA3 ho\u1EB7c c\xF4ng ty" },
      { property: "og:title", content: "Rau S\u1EA1ch Tr\u1EA7n Gia" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "URL c\u1EE7a trang web" },
      { property: "og:image", content: "URL c\u1EE7a h\xECnh \u1EA3nh \u0111\u1EA1i di\u1EC7n" },
      { property: "og:description", content: "M\xF4 t\u1EA3 ng\u1EAFn g\u1ECDn, h\u1EA5p d\u1EABn v\u1EC1 Rau S\u1EA1ch Tr\u1EA7n Gia." },
      { property: "og:site_name", content: "T\xEAn trang web" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Rau S\u1EA1ch Tr\u1EA7n Gia" },
      { name: "twitter:description", content: "M\xF4 t\u1EA3 ng\u1EAFn g\u1ECDn, h\u1EA5p d\u1EABn v\u1EC1 Rau S\u1EA1ch Tr\u1EA7n Gia." },
      { name: "twitter:image", content: "URL c\u1EE7a h\xECnh \u1EA3nh \u0111\u1EA1i di\u1EC7n" }
    ]);
  }
  static \u0275fac = function AppComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AppComponent)(\u0275\u0275directiveInject(Title), \u0275\u0275directiveInject(Meta), \u0275\u0275directiveInject(UserService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AppComponent, selectors: [["app-root"]], decls: 1, vars: 0, template: function AppComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "router-outlet");
    }
  }, dependencies: [RouterOutlet], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AppComponent, { className: "AppComponent", filePath: "src/app/app.component.ts", lineNumber: 11 });
})();

// src/app/shared/mockdata/routeMap.ts
var routeMap = {
  "v1": "sanpham",
  "v2": "danhmuc",
  "v3": "baiviet",
  "v4": "danhmucbaiviet",
  "v5": "danhmucgioithieu",
  "v6": "gioithieu"
};

// src/app/dynamic-component.resolver.ts
var DynamicComponentResolver = class _DynamicComponentResolver {
  router;
  platformId;
  constructor(router, platformId) {
    this.router = router;
    this.platformId = platformId;
  }
  resolve(route) {
    const slug = route.paramMap.get("slug");
    const lastPart = slug.slice(slug.lastIndexOf("-") + 1);
    const componentType = routeMap[lastPart] || "notfound";
    console.log(componentType);
    if (isPlatformBrowser(this.platformId)) {
      history.replaceState({ componentType }, "");
    }
    return of(componentType);
  }
  determineComponentType(slug) {
    switch (slug) {
      case "v1":
        return "sanpham";
      case "v2":
        return "danhmuc";
      case "v3":
        return "baiviet";
      case "v4":
        return "danhmucbaiviet";
      case "v5":
        return "danhmucgioithieu";
      case "v6":
        return "gioithieu";
      default:
        return "notfound";
    }
  }
  static \u0275fac = function DynamicComponentResolver_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DynamicComponentResolver)(\u0275\u0275inject(Router), \u0275\u0275inject(PLATFORM_ID));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DynamicComponentResolver, factory: _DynamicComponentResolver.\u0275fac, providedIn: "root" });
};

// src/app/shared/common/users/guards/auth.guard.ts
var AuthGuard = class _AuthGuard {
  _UserService;
  _router;
  platformId;
  constructor(_UserService, _router, platformId) {
    this._UserService = _UserService;
    this._router = _router;
    this.platformId = platformId;
  }
  canActivate(route, state) {
    const redirectUrl = state.url === "/logout" ? "/" : state.url;
    return this._check(redirectUrl);
  }
  canActivateChild(childRoute, state) {
    const redirectUrl = state.url === "/logout" ? "/" : state.url;
    return this._check(redirectUrl);
  }
  canLoad(route, segments) {
    return this._check("/");
  }
  _check(redirectURL) {
    if (!isPlatformBrowser(this.platformId)) {
      return of(true);
    }
    return this._UserService.checkDangnhap().pipe(switchMap((authenticated) => {
      if (!authenticated) {
        if (isPlatformBrowser(this.platformId)) {
          this._router.navigate(["/login"], { queryParams: { redirectURL } });
        }
        return of(false);
      }
      return of(true);
    }), finalize(() => {
    }));
  }
  static \u0275fac = function AuthGuard_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AuthGuard)(\u0275\u0275inject(UserService), \u0275\u0275inject(Router), \u0275\u0275inject(PLATFORM_ID));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthGuard, factory: _AuthGuard.\u0275fac, providedIn: "root" });
};

// src/app/shared/common/users/guards/guest.guard.ts
var GuestGuard = class _GuestGuard {
  _UserService;
  _router;
  constructor(_UserService, _router) {
    this._UserService = _UserService;
    this._router = _router;
  }
  canActivate(route, state) {
    return this._check();
  }
  canActivateChild(childRoute, state) {
    return this._check();
  }
  canLoad(route, segments) {
    return this._check();
  }
  _check() {
    return this._UserService.checkDangnhap().pipe(switchMap((authenticated) => {
      if (authenticated) {
        this._router.navigate([""]);
        return of(false);
      }
      return of(true);
    }));
  }
  static \u0275fac = function GuestGuard_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GuestGuard)(\u0275\u0275inject(UserService), \u0275\u0275inject(Router));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _GuestGuard, factory: _GuestGuard.\u0275fac, providedIn: "root" });
};

// src/app/shared/common/users/guards/permission.guard.ts
var PermissionGuard = class _PermissionGuard {
  _UserService;
  router;
  _snackBar;
  platformId;
  constructor(_UserService, router, _snackBar, platformId) {
    this._UserService = _UserService;
    this.router = router;
    this._snackBar = _snackBar;
    this.platformId = platformId;
  }
  canActivate(route) {
    if (!isPlatformBrowser(this.platformId)) {
      return true;
    }
    const requiredPermission = route.data["permission"];
    if (!this._UserService.hasPermission(requiredPermission)) {
      if (isPlatformBrowser(this.platformId)) {
        this._snackBar.open("Ch\u01B0a C\xF3 Quy\u1EC1n Truy C\u1EADp", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-warning"]
        });
        this.router.navigate(["/login"]);
      }
      return false;
    } else {
      return true;
    }
  }
  static \u0275fac = function PermissionGuard_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PermissionGuard)(\u0275\u0275inject(UserService), \u0275\u0275inject(Router), \u0275\u0275inject(MatSnackBar), \u0275\u0275inject(PLATFORM_ID));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PermissionGuard, factory: _PermissionGuard.\u0275fac, providedIn: "root" });
};

// src/app/app.routes.ts
var routes = [
  { path: "", redirectTo: "admin/lienheadmin", pathMatch: "full" },
  __spreadValues({
    path: "404",
    loadComponent: () => import("./chunk-CDJS4DB2.mjs").then((c) => c.NotfoundComponent)
  }, true ? { \u0275entryName: "src/app/site/notfound/notfound.component.ts" } : {}),
  __spreadValues({
    path: "admin",
    canActivate: [AuthGuard],
    loadComponent: () => import("./chunk-S7N4CAGX.mjs").then((c) => c.AdminmainComponent),
    children: [
      {
        path: "bulk-price-update",
        loadComponent: () => import("./chunk-GYOAWFBM.mjs").then((m) => m.BulkPriceUpdateComponent)
      },
      {
        path: "price-alerts",
        loadComponent: () => import("./chunk-P7SE2EWC.mjs").then((m) => m.PriceAlertsComponent)
      },
      {
        path: "price-analytics",
        loadComponent: () => import("./chunk-DHEVJ3EA.mjs").then((m) => m.PriceAnalyticsComponent)
      },
      {
        path: "price-comparison",
        loadComponent: () => import("./chunk-RYRTFMFN.mjs").then((m) => m.PriceComparisonComponent)
      },
      {
        path: "auditlog",
        canActivate: [PermissionGuard],
        data: { permission: "auditlog.view" },
        loadChildren: () => import("./chunk-Z7YOGGB2.mjs").then((m) => m.AuditlogRoutingModule)
      },
      {
        path: "performance",
        loadComponent: () => import("./chunk-TPIPT2DJ.mjs").then((c) => c.PerformanceComponent)
      },
      {
        path: "dashboard",
        loadComponent: () => import("./chunk-C5FO2XQ3.mjs").then((c) => c.DashboardComponent)
      },
      {
        path: "dashboard/baocaodoanhthu",
        loadComponent: () => import("./chunk-3S6K6SZA.mjs").then((c) => c.BaocaodoanhtuComponent)
      },
      {
        path: "thongke",
        loadChildren: () => import("./chunk-PYTMILKX.mjs").then((m) => m.THONGKE_ROUTES)
      },
      {
        path: "testing",
        loadComponent: () => import("./chunk-E2G5RM2Z.mjs").then((c) => c.TestingComponent)
      },
      {
        path: "lienheadmin",
        loadComponent: () => import("./chunk-YCL6XRVX.mjs").then((c) => c.LienheadminComponent)
      },
      {
        path: "menu",
        canActivate: [PermissionGuard],
        data: { permission: "menu.view" },
        loadComponent: () => import("./chunk-MLUGQBEB.mjs").then((c) => c.ListMenuComponent),
        children: [
          {
            path: "",
            loadComponent: () => import("./chunk-MLUGQBEB.mjs").then((c) => c.ListMenuComponent)
          },
          {
            path: ":id",
            loadComponent: () => import("./chunk-OJBSM3J2.mjs").then((c) => c.DetailMenuComponent)
          }
        ]
      },
      {
        path: "hotro",
        loadComponent: () => import("./chunk-Z3WJXDGW.mjs").then((c) => c.ListHotroComponent),
        children: [
          {
            path: ":id",
            loadComponent: () => import("./chunk-L5OHQ4AB.mjs").then((c) => c.DetailHotroComponent)
          }
        ]
      },
      {
        path: "support",
        loadComponent: () => import("./chunk-AZVTWDUK.mjs").then((c) => c.SupportListComponent)
      },
      {
        path: "support/new",
        loadComponent: () => import("./chunk-6XATP6P7.mjs").then((c) => c.SupportCreateComponent)
      },
      {
        path: "support/:id",
        loadComponent: () => import("./chunk-HNW5VEDB.mjs").then((c) => c.SupportDetailComponent)
      },
      {
        path: "nhomuser",
        canActivate: [PermissionGuard],
        data: { permission: "nhomuser.view" },
        loadComponent: () => import("./chunk-X2BBG63W.mjs").then((c) => c.ListRoleComponent),
        children: [
          {
            path: "",
            loadComponent: () => import("./chunk-X2BBG63W.mjs").then((c) => c.ListRoleComponent)
          },
          {
            path: ":id",
            loadComponent: () => import("./chunk-PPQU2SXL.mjs").then((c) => c.DetailRoleComponent)
          }
        ]
      },
      {
        path: "permission",
        canActivate: [PermissionGuard],
        data: { permission: "permission.view" },
        loadComponent: () => import("./chunk-H6OGTRRR.mjs").then((c) => c.ListPermissionComponent),
        children: [
          {
            path: "",
            loadComponent: () => import("./chunk-H6OGTRRR.mjs").then((c) => c.ListPermissionComponent)
          },
          {
            path: ":id",
            loadComponent: () => import("./chunk-CW5IEFO6.mjs").then((c) => c.DetailPermissionComponent)
          }
        ]
      },
      {
        path: "user-permission",
        // canActivate: [PermissionGuard],
        // data: { permission: 'user-permission.view' },
        loadComponent: () => import("./chunk-V4GPS3VQ.mjs").then((c) => c.UserPermissionManagementComponent)
      },
      // {
      //   path: 'user-permission-demo',
      //   loadComponent: () =>
      //     import('./admin/user-permission-demo/user-permission-demo.component').then(
      //       (c) => c.UserPermissionDemoComponent
      //     ),
      // },
      {
        path: "phongban",
        canActivate: [PermissionGuard],
        data: { permission: "phongban.view" },
        loadChildren: () => import("./chunk-N64BHMMM.mjs").then((m) => m.phongbanRoutes)
      },
      {
        path: "nhanvien",
        canActivate: [PermissionGuard],
        data: { permission: "nhanvien.view" },
        loadChildren: () => import("./chunk-2FMVMSJA.mjs").then((m) => m.nhanvienRoutes)
      },
      {
        path: "importdata",
        canActivate: [PermissionGuard],
        data: { permission: "importdata.view" },
        loadChildren: () => import("./chunk-B372NYIN.mjs").then((m) => m.ImportdataRoutingModule)
      },
      {
        path: "danhmuc",
        loadComponent: () => import("./chunk-6C6BQLSS.mjs").then((c) => c.ListdanhmucComponent),
        children: [
          {
            path: ":id",
            loadComponent: () => import("./chunk-AR7F42VZ.mjs").then((c) => c.DetailDanhmucComponent)
          }
        ]
      },
      {
        path: "baiviet",
        loadComponent: () => import("./chunk-LU6DW7V6.mjs").then((c) => c.ListbaivietComponent),
        children: [
          {
            path: ":id",
            loadComponent: () => import("./chunk-T7ZD76UF.mjs").then((c) => c.DetailBaivietComponent)
          }
        ]
      },
      {
        path: "goooglesheets",
        loadComponent: () => import("./chunk-LQ5K4JOX.mjs").then((c) => c.GooglesheetsComponent)
      },
      {
        path: "sanpham",
        canActivate: [PermissionGuard],
        data: { permission: "sanpham.view" },
        loadComponent: () => import("./chunk-GYMZ7C7Y.mjs").then((c) => c.ListSanphamComponent),
        children: [
          {
            path: "",
            loadComponent: () => import("./chunk-GYMZ7C7Y.mjs").then((c) => c.ListSanphamComponent)
          },
          {
            path: ":id",
            loadComponent: () => import("./chunk-BKDU7HKQ.mjs").then((c) => c.DetailSanphamComponent)
          }
        ]
      },
      {
        path: "banggia",
        canActivate: [PermissionGuard],
        data: { permission: "banggia.view" },
        loadComponent: () => import("./chunk-TV443S47.mjs").then((c) => c.ListBanggiaComponent),
        children: [
          {
            path: "",
            loadComponent: () => import("./chunk-TV443S47.mjs").then((c) => c.ListBanggiaComponent)
          },
          {
            path: ":id",
            loadComponent: () => import("./chunk-VWM3I3FF.mjs").then((c) => c.DetailBanggiaComponent)
          }
        ]
      },
      {
        path: "khachhang",
        canActivate: [PermissionGuard],
        data: { permission: "khachhang.view" },
        loadChildren: () => import("./chunk-XHVHIFYX.mjs").then((m) => m.KhachhangRoutingModule)
      },
      // {
      //   path: 'khachhang',
      //   canActivate: [PermissionGuard],
      //   data: { permission: 'khachhang.view' },
      //   loadComponent: () =>
      //     import(
      //       './admin/khachhang/listkhachhang/listkhachhang.component'
      //     ).then((c) => c.ListKhachhangComponent),
      //   children: [
      //     {
      //       path: '',
      //       loadComponent: () =>
      //         import(
      //           './admin/khachhang/listkhachhang/listkhachhang.component'
      //         ).then((c) => c.ListKhachhangComponent),
      //     },
      //     {
      //       path: ':id',
      //       loadComponent: () =>
      //         import(
      //           './admin/khachhang/detailkhachhang/detailkhachhang.component'
      //         ).then((c) => c.DetailKhachhangComponent),
      //     },
      //   ],
      // },
      {
        path: "nhomkhachhang",
        canActivate: [PermissionGuard],
        data: { permission: "nhomkhachhang.view" },
        loadComponent: () => import("./chunk-ZWM7MXUI.mjs").then((c) => c.ListNhomkhachhangComponent),
        children: [
          {
            path: "",
            loadComponent: () => import("./chunk-ZWM7MXUI.mjs").then((c) => c.ListNhomkhachhangComponent)
          },
          {
            path: ":id",
            loadComponent: () => import("./chunk-XLEHOEYJ.mjs").then((c) => c.DetailNhomkhachhangComponent)
          }
        ]
      },
      {
        path: "nhacungcap",
        canActivate: [PermissionGuard],
        data: { permission: "nhacungcap.view" },
        loadChildren: () => import("./chunk-NP3QLWKO.mjs").then((m) => m.NhacungcapRoutingModule)
      },
      {
        path: "nhomncc",
        canActivate: [PermissionGuard],
        data: { permission: "nhomncc.view" },
        loadChildren: () => import("./chunk-3SHSE2HF.mjs").then((m) => m.NhomnccRoutingModule)
      },
      {
        path: "dathang",
        canActivate: [PermissionGuard],
        data: { permission: "dathang.view" },
        loadComponent: () => import("./chunk-X66DWBZR.mjs").then((c) => c.ListDathangComponent),
        children: [
          {
            path: "",
            loadComponent: () => import("./chunk-X66DWBZR.mjs").then((c) => c.ListDathangComponent)
          },
          {
            path: ":id",
            loadComponent: () => import("./chunk-CDMJXVJM.mjs").then((c) => c.DetailDathangComponent)
          }
        ]
      },
      {
        path: "nhucaudathang",
        canActivate: [PermissionGuard],
        data: { permission: "nhucaudathang.view" },
        loadComponent: () => import("./chunk-EYFYMKIP.mjs").then((c) => c.NhucaudathangComponent)
      },
      {
        path: "donhang",
        canActivate: [PermissionGuard],
        data: { permission: "donhang.view" },
        loadComponent: () => import("./chunk-JKEZNTLZ.mjs").then((c) => c.ListDonhangComponent),
        children: [
          {
            path: "",
            loadComponent: () => import("./chunk-JKEZNTLZ.mjs").then((c) => c.ListDonhangComponent)
          },
          {
            path: ":id",
            loadComponent: () => import("./chunk-WPXRVURP.mjs").then((c) => c.DetailDonhangComponent)
          }
        ]
      },
      {
        path: "vandon",
        canActivate: [PermissionGuard],
        data: { permission: "vandon.view" },
        loadComponent: () => import("./chunk-JJEYP34O.mjs").then((c) => c.VandonComponent)
      },
      {
        path: "phieuchuyen",
        canActivate: [PermissionGuard],
        data: { permission: "phieuchuyen.view" },
        loadComponent: () => import("./chunk-XGLNHI6Y.mjs").then((c) => c.ListPhieuchuyenComponent)
      },
      {
        path: "kho",
        loadComponent: () => import("./chunk-RB27MK6Y.mjs").then((c) => c.ListKhoComponent),
        children: [
          {
            path: "",
            loadComponent: () => import("./chunk-RB27MK6Y.mjs").then((c) => c.ListKhoComponent)
          },
          {
            path: ":id",
            loadComponent: () => import("./chunk-HRNCAWYS.mjs").then((c) => c.DetailKhoComponent)
          }
        ]
      },
      {
        path: "phieugiaohang",
        canActivate: [PermissionGuard],
        data: { permission: "phieugiaohang.view" },
        loadComponent: () => import("./chunk-ROWS7LZO.mjs").then((c) => c.ListPhieugiaohangComponent),
        children: [
          {
            path: "",
            loadComponent: () => import("./chunk-ROWS7LZO.mjs").then((c) => c.ListPhieugiaohangComponent)
          },
          {
            path: ":id",
            loadComponent: () => import("./chunk-SORC4VCM.mjs").then((c) => c.DetailPhieugiaohangComponent)
          }
        ]
      },
      {
        path: "phieuchiahang",
        canActivate: [PermissionGuard],
        data: { permission: "phieuchiahang.view" },
        loadComponent: () => import("./chunk-EORRNRI3.mjs").then((c) => c.ListPhieuchiahangComponent),
        children: [
          {
            path: "",
            loadComponent: () => import("./chunk-EORRNRI3.mjs").then((c) => c.ListPhieuchiahangComponent)
          },
          {
            path: ":id",
            loadComponent: () => import("./chunk-ZEVUSTXL.mjs").then((c) => c.DetailPhieuchiahangComponent)
          }
        ]
      },
      {
        path: "phieukho",
        canActivate: [PermissionGuard],
        data: { permission: "phieukho.view" },
        loadComponent: () => import("./chunk-DFVRR24T.mjs").then((c) => c.ListPhieukhoComponent),
        children: [
          {
            path: "",
            loadComponent: () => import("./chunk-DFVRR24T.mjs").then((c) => c.ListPhieukhoComponent)
          },
          {
            path: ":id",
            loadComponent: () => import("./chunk-LKYSHYOE.mjs").then((c) => c.DetailPhieukhoComponent)
          }
        ]
      },
      {
        path: "xuatnhapton",
        canActivate: [PermissionGuard],
        data: { permission: "xuatnhapton.view" },
        loadComponent: () => import("./chunk-P2LZS37L.mjs").then((c) => c.XuatnhaptonComponent)
        // children: [
        //   {
        //     path: ':id',
        //     loadComponent: () =>
        //       import('./admin/xuatnhapton/detailxuatnhapton/detailxuatnhapton').then(
        //         (c) => c.DetailXuatnhaptonComponent
        //       ),
        //   },
        // ],
      },
      {
        path: "chotkho",
        canActivate: [PermissionGuard],
        data: { permission: "chotkho.view" },
        loadChildren: () => import("./chunk-23J2M2VW.mjs").then((m) => m.ChotkhoRoutingModule)
      },
      {
        path: "congnokhachhang",
        canActivate: [PermissionGuard],
        data: { permission: "congnokhachhang.view" },
        loadComponent: () => import("./chunk-VW7TFZKN.mjs").then((c) => c.ListcongnokhachhangComponent),
        children: [
          {
            path: "",
            loadComponent: () => import("./chunk-VW7TFZKN.mjs").then((c) => c.ListcongnokhachhangComponent)
          },
          {
            path: ":id",
            loadComponent: () => import("./chunk-65CIOO47.mjs").then((c) => c.DetailCongnokhachhangComponent)
          }
        ]
      },
      {
        path: "userguide",
        canActivate: [PermissionGuard],
        data: { permission: "userguide.view" },
        loadComponent: () => import("./chunk-SPO5NLLY.mjs").then((c) => c.ListUserguideComponent),
        children: [
          {
            path: "",
            loadComponent: () => import("./chunk-SPO5NLLY.mjs").then((c) => c.ListUserguideComponent)
          },
          {
            path: ":id",
            loadComponent: () => import("./chunk-UPYVQMSF.mjs").then((c) => c.DetailUserguideComponent)
          }
        ]
      },
      {
        path: "congnoncc",
        canActivate: [PermissionGuard],
        data: { permission: "congnoncc.view" },
        loadComponent: () => import("./chunk-CFTKZNCO.mjs").then((c) => c.ListcongnonccComponent),
        children: [
          {
            path: "",
            loadComponent: () => import("./chunk-CFTKZNCO.mjs").then((c) => c.ListcongnonccComponent)
          },
          {
            path: ":id",
            loadComponent: () => import("./chunk-7FKYV475.mjs").then((c) => c.DetailCongnonccComponent)
          }
        ]
      },
      {
        path: "user",
        canActivate: [PermissionGuard],
        data: { permission: "user.view" },
        loadComponent: () => import("./chunk-4JPGO5JI.mjs").then((c) => c.ListUserComponent),
        children: [
          {
            path: "",
            loadComponent: () => import("./chunk-4JPGO5JI.mjs").then((c) => c.ListUserComponent)
          },
          {
            path: ":id",
            loadComponent: () => import("./chunk-I5UPZOQY.mjs").then((c) => c.DetailUserComponent)
          }
        ]
      },
      {
        path: "quanlyfile",
        canActivate: [PermissionGuard],
        data: { permission: "quanlyfile.view" },
        loadComponent: () => import("./chunk-RYZ5WQCO.mjs").then((c) => c.ListquanlyfileComponent),
        children: [
          {
            path: ":id",
            loadComponent: () => import("./chunk-PHCFWMAA.mjs").then((c) => c.DetailQuanlyfileComponent)
          }
        ]
      },
      {
        path: "profile",
        canActivate: [PermissionGuard],
        data: { permission: "profile.view" },
        loadComponent: () => import("./chunk-42TBOSKF.mjs").then((c) => c.ProfileComponent),
        children: [
          {
            path: "socialpage",
            loadComponent: () => import("./chunk-JR6DNLKT.mjs").then((c) => c.SocialComponent)
          }
        ]
      },
      {
        path: "account",
        redirectTo: "account/general",
        // Chuyển hướng đến 'account/password'
        pathMatch: "full"
        // Xác định khớp chính xác
      },
      {
        path: "account",
        loadComponent: () => import("./chunk-O6V74VTJ.mjs").then((c) => c.AccountComponent),
        children: [
          {
            path: "password",
            loadComponent: () => import("./chunk-LS53QIV3.mjs").then((c) => c.PasswordComponent)
          },
          {
            path: "general",
            loadComponent: () => import("./chunk-FMBBTE7X.mjs").then((c) => c.GeneralComponent)
          }
        ]
      }
    ]
  }, true ? { \u0275entryName: "src/app/admin/adminmain/adminmain.component.ts" } : {}),
  __spreadValues({
    path: "login",
    canActivate: [GuestGuard],
    canActivateChild: [GuestGuard],
    loadComponent: () => import("./chunk-SS7VJZ42.mjs").then((c) => c.LoginComponent)
  }, true ? { \u0275entryName: "src/app/shared/common/users/login/login.component.ts" } : {}),
  __spreadValues({
    path: "register",
    canActivate: [GuestGuard],
    canActivateChild: [GuestGuard],
    loadComponent: () => import("./chunk-GQTIIUL2.mjs").then((c) => c.RegisterComponent)
  }, true ? { \u0275entryName: "src/app/shared/common/users/register/register.component.ts" } : {}),
  __spreadValues({
    path: ":slug",
    loadComponent: () => import("./chunk-TT4UDW4Q.mjs").then((c) => c.SitemainComponent),
    resolve: { component: DynamicComponentResolver }
  }, true ? { \u0275entryName: "src/app/site/sitemain/sitemain.component.ts" } : {}),
  __spreadValues({
    path: "",
    loadComponent: () => import("./chunk-TT4UDW4Q.mjs").then((c) => c.SitemainComponent),
    // loadComponent: () =>import('./admin/hotro/listhotro/listhotro.component').then((c) => c.ListHotroComponent),
    // loadComponent: () =>import('./admin/vantay/vantay.component').then((c) => c.VantayComponent),
    //loadComponent: () =>import('./admin/facecomparison/facecomparison.component').then((c) => c.FacecomparisonComponent),
    children: [
      {
        path: "",
        loadComponent: () => import("./chunk-YA436JYU.mjs").then((c) => c.HomeComponent)
      },
      {
        path: "lien-he",
        loadComponent: () => import("./chunk-EUUC46HO.mjs").then((c) => c.LienheComponent)
      }
      /*
            {
              path: ':slug',
              resolve: { componentType: DynamicComponentResolver },
              loadComponent: async () => {
                const componentType = typeof history !== 'undefined' ? history?.state?.componentType : null;
                if (componentType) {
                  switch (componentType) {
                    case 'danhmucbaiviet':
                      const c = await import(
                        './site/danhmucbaiviet/danhmucbaiviet.component'
                      );
                      return c.DanhmucbaivietComponent;
                    case 'baiviet':
                      const c_1 = await import('./site/baiviet/baiviet.component');
                      return c_1.BaivietComponent;
                    case 'danhmuc':
                      const c_2 = await import('./site/danhmuc/danhmuc.component');
                      return c_2.DanhmucComponent;
                    case 'sanpham':
                      const c_3 = await import('./site/sanpham/sanpham.component');
                      return c_3.SanphamComponent;
                    case 'danhmucgioithieu':
                      const c_5 = await import(
                        './site/danhmucgioithieu/danhmucgioithieu.component'
                      );
                      return c_5.DanhmucgioithieuComponent;
                    case 'gioithieu':
                      const c_6 = await import(
                        './site/gioithieu/gioithieu.component'
                      );
                      return c_6.GioithieuComponent;
                    default:
                      const c_4 = await import('./site/notfound/notfound.component');
                      return c_4.NotfoundComponent; // Component mặc định
                  }
                } else {
                  return import('./site/home/home.component').then(
                    (c) => c.HomeComponent
                  );
                }
              },
            },
      */
    ]
  }, true ? { \u0275entryName: "src/app/site/sitemain/sitemain.component.ts" } : {})
];

// node_modules/@angular/platform-browser/fesm2022/animations/async.mjs
var ANIMATION_PREFIX = "@";
var AsyncAnimationRendererFactory = class _AsyncAnimationRendererFactory {
  doc;
  delegate;
  zone;
  animationType;
  moduleImpl;
  _rendererFactoryPromise = null;
  scheduler = null;
  injector = inject(Injector);
  loadingSchedulerFn = inject(\u0275ASYNC_ANIMATION_LOADING_SCHEDULER_FN, {
    optional: true
  });
  _engine;
  /**
   *
   * @param moduleImpl allows to provide a mock implmentation (or will load the animation module)
   */
  constructor(doc, delegate, zone, animationType, moduleImpl) {
    this.doc = doc;
    this.delegate = delegate;
    this.zone = zone;
    this.animationType = animationType;
    this.moduleImpl = moduleImpl;
  }
  /** @nodoc */
  ngOnDestroy() {
    this._engine?.flush();
  }
  /**
   * @internal
   */
  loadImpl() {
    const loadFn = () => this.moduleImpl ?? import("./chunk-O4W3EUJM.mjs").then((m) => m);
    let moduleImplPromise;
    if (this.loadingSchedulerFn) {
      moduleImplPromise = this.loadingSchedulerFn(loadFn);
    } else {
      moduleImplPromise = loadFn();
    }
    return moduleImplPromise.catch((e) => {
      throw new RuntimeError(5300, (typeof ngDevMode === "undefined" || ngDevMode) && "Async loading for animations package was enabled, but loading failed. Angular falls back to using regular rendering. No animations will be displayed and their styles won't be applied.");
    }).then(({
      \u0275createEngine,
      \u0275AnimationRendererFactory
    }) => {
      this._engine = \u0275createEngine(this.animationType, this.doc);
      const rendererFactory = new \u0275AnimationRendererFactory(this.delegate, this._engine, this.zone);
      this.delegate = rendererFactory;
      return rendererFactory;
    });
  }
  /**
   * This method is delegating the renderer creation to the factories.
   * It uses default factory while the animation factory isn't loaded
   * and will rely on the animation factory once it is loaded.
   *
   * Calling this method will trigger as side effect the loading of the animation module
   * if the renderered component uses animations.
   */
  createRenderer(hostElement, rendererType) {
    const renderer = this.delegate.createRenderer(hostElement, rendererType);
    if (renderer.\u0275type === 0) {
      return renderer;
    }
    if (typeof renderer.throwOnSyntheticProps === "boolean") {
      renderer.throwOnSyntheticProps = false;
    }
    const dynamicRenderer = new DynamicDelegationRenderer(renderer);
    if (rendererType?.data?.["animation"] && !this._rendererFactoryPromise) {
      this._rendererFactoryPromise = this.loadImpl();
    }
    this._rendererFactoryPromise?.then((animationRendererFactory) => {
      const animationRenderer = animationRendererFactory.createRenderer(hostElement, rendererType);
      dynamicRenderer.use(animationRenderer);
      this.scheduler ??= this.injector.get(ChangeDetectionScheduler, null, {
        optional: true
      });
      this.scheduler?.notify(
        11
        /* NotificationSource.AsyncAnimationsLoaded */
      );
    }).catch((e) => {
      dynamicRenderer.use(renderer);
    });
    return dynamicRenderer;
  }
  begin() {
    this.delegate.begin?.();
  }
  end() {
    this.delegate.end?.();
  }
  whenRenderingDone() {
    return this.delegate.whenRenderingDone?.() ?? Promise.resolve();
  }
  /**
   * Used during HMR to clear any cached data about a component.
   * @param componentId ID of the component that is being replaced.
   */
  componentReplaced(componentId) {
    this._engine?.flush();
    this.delegate.componentReplaced?.(componentId);
  }
  static \u0275fac = function AsyncAnimationRendererFactory_Factory(__ngFactoryType__) {
    \u0275\u0275invalidFactory();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _AsyncAnimationRendererFactory,
    factory: _AsyncAnimationRendererFactory.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AsyncAnimationRendererFactory, [{
    type: Injectable
  }], () => [{
    type: Document
  }, {
    type: RendererFactory2
  }, {
    type: NgZone
  }, {
    type: void 0
  }, {
    type: Promise
  }], null);
})();
var DynamicDelegationRenderer = class {
  delegate;
  // List of callbacks that need to be replayed on the animation renderer once its loaded
  replay = [];
  \u0275type = 1;
  constructor(delegate) {
    this.delegate = delegate;
  }
  use(impl) {
    this.delegate = impl;
    if (this.replay !== null) {
      for (const fn of this.replay) {
        fn(impl);
      }
      this.replay = null;
    }
  }
  get data() {
    return this.delegate.data;
  }
  destroy() {
    this.replay = null;
    this.delegate.destroy();
  }
  createElement(name, namespace) {
    return this.delegate.createElement(name, namespace);
  }
  createComment(value) {
    return this.delegate.createComment(value);
  }
  createText(value) {
    return this.delegate.createText(value);
  }
  get destroyNode() {
    return this.delegate.destroyNode;
  }
  appendChild(parent, newChild) {
    this.delegate.appendChild(parent, newChild);
  }
  insertBefore(parent, newChild, refChild, isMove) {
    this.delegate.insertBefore(parent, newChild, refChild, isMove);
  }
  removeChild(parent, oldChild, isHostElement) {
    this.delegate.removeChild(parent, oldChild, isHostElement);
  }
  selectRootElement(selectorOrNode, preserveContent) {
    return this.delegate.selectRootElement(selectorOrNode, preserveContent);
  }
  parentNode(node) {
    return this.delegate.parentNode(node);
  }
  nextSibling(node) {
    return this.delegate.nextSibling(node);
  }
  setAttribute(el, name, value, namespace) {
    this.delegate.setAttribute(el, name, value, namespace);
  }
  removeAttribute(el, name, namespace) {
    this.delegate.removeAttribute(el, name, namespace);
  }
  addClass(el, name) {
    this.delegate.addClass(el, name);
  }
  removeClass(el, name) {
    this.delegate.removeClass(el, name);
  }
  setStyle(el, style, value, flags) {
    this.delegate.setStyle(el, style, value, flags);
  }
  removeStyle(el, style, flags) {
    this.delegate.removeStyle(el, style, flags);
  }
  setProperty(el, name, value) {
    if (this.shouldReplay(name)) {
      this.replay.push((renderer) => renderer.setProperty(el, name, value));
    }
    this.delegate.setProperty(el, name, value);
  }
  setValue(node, value) {
    this.delegate.setValue(node, value);
  }
  listen(target, eventName, callback, options) {
    if (this.shouldReplay(eventName)) {
      this.replay.push((renderer) => renderer.listen(target, eventName, callback, options));
    }
    return this.delegate.listen(target, eventName, callback, options);
  }
  shouldReplay(propOrEventName) {
    return this.replay !== null && propOrEventName.startsWith(ANIMATION_PREFIX);
  }
};
var \u0275ASYNC_ANIMATION_LOADING_SCHEDULER_FN = new InjectionToken(ngDevMode ? "async_animation_loading_scheduler_fn" : "");
function provideAnimationsAsync(type = "animations") {
  performanceMarkFeature("NgAsyncAnimations");
  return makeEnvironmentProviders([{
    provide: RendererFactory2,
    useFactory: (doc, renderer, zone) => {
      return new AsyncAnimationRendererFactory(doc, renderer, zone, type);
    },
    deps: [DOCUMENT, DomRendererFactory2, NgZone]
  }, {
    provide: ANIMATION_MODULE_TYPE,
    useValue: type === "noop" ? "NoopAnimations" : "BrowserAnimations"
  }]);
}

// src/app/dynamic-date-adapter.ts
var DynamicDateAdapter = class _DynamicDateAdapter extends NativeDateAdapter {
  // Lấy múi giờ từ trình duyệt hoặc cấu hình (có thể thay đổi động)
  getUserTimezone() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
  // Tính offset từ UTC (đơn vị: milliseconds)
  getTimezoneOffsetMs(date) {
    const tz = this.getUserTimezone();
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false
    });
    const localTime = new Date(formatter.formatToParts(date).reduce((acc, part) => {
      if (part.type === "hour")
        acc.setHours(+part.value);
      if (part.type === "minute")
        acc.setMinutes(+part.value);
      if (part.type === "second")
        acc.setSeconds(+part.value);
      return acc;
    }, new Date(date)).toISOString());
    return date.getTime() - localTime.getTime();
  }
  // Hiển thị ngày theo múi giờ của người dùng
  format(date, displayFormat) {
    const offsetMs = this.getTimezoneOffsetMs(date);
    const localDate = new Date(date.getTime() + offsetMs);
    return super.format(localDate, displayFormat);
  }
  // Parse giá trị nhập vào, chuyển về UTC
  parse(value) {
    const date = super.parse(value);
    if (!date)
      return null;
    const offsetMs = this.getTimezoneOffsetMs(date);
    return new Date(date.getTime() - offsetMs);
  }
  // Tạo ngày mới ở UTC
  createDate(year, month, date) {
    return new Date(Date.UTC(year, month, date));
  }
  // Deserialize giá trị, chuyển về UTC
  deserialize(value) {
    const date = super.deserialize(value);
    if (!date)
      return null;
    const offsetMs = this.getTimezoneOffsetMs(date);
    return new Date(date.getTime() - offsetMs);
  }
  // Ngày hiện tại ở UTC
  today() {
    const now = /* @__PURE__ */ new Date();
    const offsetMs = this.getTimezoneOffsetMs(now);
    return new Date(now.getTime() - offsetMs);
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275DynamicDateAdapter_BaseFactory;
    return function DynamicDateAdapter_Factory(__ngFactoryType__) {
      return (\u0275DynamicDateAdapter_BaseFactory || (\u0275DynamicDateAdapter_BaseFactory = \u0275\u0275getInheritedFactory(_DynamicDateAdapter)))(__ngFactoryType__ || _DynamicDateAdapter);
    };
  })();
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DynamicDateAdapter, factory: _DynamicDateAdapter.\u0275fac });
};

// node_modules/@apollo/client/link/batch/batching.js
var OperationBatcher = (
  /** @class */
  function() {
    function OperationBatcher2(_a) {
      var batchDebounce = _a.batchDebounce, batchInterval = _a.batchInterval, batchMax = _a.batchMax, batchHandler = _a.batchHandler, batchKey = _a.batchKey;
      this.batchesByKey = /* @__PURE__ */ new Map();
      this.scheduledBatchTimerByKey = /* @__PURE__ */ new Map();
      this.batchDebounce = batchDebounce;
      this.batchInterval = batchInterval;
      this.batchMax = batchMax || 0;
      this.batchHandler = batchHandler;
      this.batchKey = batchKey || function() {
        return "";
      };
    }
    OperationBatcher2.prototype.enqueueRequest = function(request) {
      var _this = this;
      var requestCopy = __assign(__assign({}, request), {
        next: [],
        error: [],
        complete: [],
        subscribers: /* @__PURE__ */ new Set()
      });
      var key = this.batchKey(request.operation);
      if (!requestCopy.observable) {
        requestCopy.observable = new Observable2(function(observer) {
          var batch = _this.batchesByKey.get(key);
          if (!batch) _this.batchesByKey.set(key, batch = /* @__PURE__ */ new Set());
          var isFirstEnqueuedRequest = batch.size === 0;
          var isFirstSubscriber = requestCopy.subscribers.size === 0;
          requestCopy.subscribers.add(observer);
          if (isFirstSubscriber) {
            batch.add(requestCopy);
          }
          if (observer.next) {
            requestCopy.next.push(observer.next.bind(observer));
          }
          if (observer.error) {
            requestCopy.error.push(observer.error.bind(observer));
          }
          if (observer.complete) {
            requestCopy.complete.push(observer.complete.bind(observer));
          }
          if (isFirstEnqueuedRequest || _this.batchDebounce) {
            _this.scheduleQueueConsumption(key);
          }
          if (batch.size === _this.batchMax) {
            _this.consumeQueue(key);
          }
          return function() {
            var _a;
            if (requestCopy.subscribers.delete(observer) && requestCopy.subscribers.size < 1) {
              if (batch.delete(requestCopy) && batch.size < 1) {
                _this.consumeQueue(key);
                (_a = batch.subscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
              }
            }
          };
        });
      }
      return requestCopy.observable;
    };
    OperationBatcher2.prototype.consumeQueue = function(key) {
      if (key === void 0) {
        key = "";
      }
      var batch = this.batchesByKey.get(key);
      this.batchesByKey.delete(key);
      if (!batch || !batch.size) {
        return;
      }
      var operations = [];
      var forwards = [];
      var observables = [];
      var nexts = [];
      var errors = [];
      var completes = [];
      batch.forEach(function(request) {
        operations.push(request.operation);
        forwards.push(request.forward);
        observables.push(request.observable);
        nexts.push(request.next);
        errors.push(request.error);
        completes.push(request.complete);
      });
      var batchedObservable = this.batchHandler(operations, forwards) || Observable2.of();
      var onError = function(error) {
        errors.forEach(function(rejecters) {
          if (rejecters) {
            rejecters.forEach(function(e) {
              return e(error);
            });
          }
        });
      };
      batch.subscription = batchedObservable.subscribe({
        next: function(results) {
          if (!Array.isArray(results)) {
            results = [results];
          }
          if (nexts.length !== results.length) {
            var error = new Error("server returned results with length ".concat(results.length, ", expected length of ").concat(nexts.length));
            error.result = results;
            return onError(error);
          }
          results.forEach(function(result, index) {
            if (nexts[index]) {
              nexts[index].forEach(function(next) {
                return next(result);
              });
            }
          });
        },
        error: onError,
        complete: function() {
          completes.forEach(function(complete) {
            if (complete) {
              complete.forEach(function(c) {
                return c();
              });
            }
          });
        }
      });
      return observables;
    };
    OperationBatcher2.prototype.scheduleQueueConsumption = function(key) {
      var _this = this;
      clearTimeout(this.scheduledBatchTimerByKey.get(key));
      this.scheduledBatchTimerByKey.set(key, setTimeout(function() {
        _this.consumeQueue(key);
        _this.scheduledBatchTimerByKey.delete(key);
      }, this.batchInterval));
    };
    return OperationBatcher2;
  }()
);

// node_modules/@apollo/client/link/batch/batchLink.js
var BatchLink = (
  /** @class */
  function(_super) {
    __extends(BatchLink2, _super);
    function BatchLink2(fetchParams) {
      var _this = _super.call(this) || this;
      var _a = fetchParams || {}, batchDebounce = _a.batchDebounce, _b = _a.batchInterval, batchInterval = _b === void 0 ? 10 : _b, _c = _a.batchMax, batchMax = _c === void 0 ? 0 : _c, _d = _a.batchHandler, batchHandler = _d === void 0 ? function() {
        return null;
      } : _d, _e = _a.batchKey, batchKey = _e === void 0 ? function() {
        return "";
      } : _e;
      _this.batcher = new OperationBatcher({
        batchDebounce,
        batchInterval,
        batchMax,
        batchHandler,
        batchKey
      });
      if (fetchParams.batchHandler.length <= 1) {
        _this.request = function(operation) {
          return _this.batcher.enqueueRequest({
            operation
          });
        };
      }
      return _this;
    }
    BatchLink2.prototype.request = function(operation, forward) {
      return this.batcher.enqueueRequest({
        operation,
        forward
      });
    };
    return BatchLink2;
  }(ApolloLink)
);

// node_modules/apollo-angular/fesm2022/ngApolloLinkHttp.mjs
var fetch = (req, httpClient, extractFiles) => {
  const shouldUseBody = ["POST", "PUT", "PATCH"].indexOf(req.method.toUpperCase()) !== -1;
  const shouldStringify = (param) => ["variables", "extensions"].indexOf(param.toLowerCase()) !== -1;
  const isBatching = req.body.length;
  let shouldUseMultipart = req.options && req.options.useMultipart;
  let multipartInfo;
  if (shouldUseMultipart) {
    if (isBatching) {
      return new Observable((observer) => observer.error(new Error("File upload is not available when combined with Batching")));
    }
    if (!shouldUseBody) {
      return new Observable((observer) => observer.error(new Error("File upload is not available when GET is used")));
    }
    if (!extractFiles) {
      return new Observable((observer) => observer.error(new Error(`To use File upload you need to pass "extractFiles" function from "extract-files" library to HttpLink's options`)));
    }
    multipartInfo = extractFiles(req.body);
    shouldUseMultipart = !!multipartInfo.files.size;
  }
  let bodyOrParams = {};
  if (isBatching) {
    if (!shouldUseBody) {
      return new Observable((observer) => observer.error(new Error("Batching is not available for GET requests")));
    }
    bodyOrParams = {
      body: req.body
    };
  } else {
    const body = shouldUseMultipart ? multipartInfo.clone : req.body;
    if (shouldUseBody) {
      bodyOrParams = {
        body
      };
    } else {
      const params = Object.keys(req.body).reduce((obj, param) => {
        const value = req.body[param];
        obj[param] = shouldStringify(param) ? JSON.stringify(value) : value;
        return obj;
      }, {});
      bodyOrParams = {
        params
      };
    }
  }
  if (shouldUseMultipart && shouldUseBody) {
    const form = new FormData();
    form.append("operations", JSON.stringify(bodyOrParams.body));
    const map = {};
    const files = multipartInfo.files;
    let i = 0;
    files.forEach((paths) => {
      map[++i] = paths;
    });
    form.append("map", JSON.stringify(map));
    i = 0;
    files.forEach((_, file) => {
      form.append(++i + "", file, file.name);
    });
    bodyOrParams.body = form;
  }
  return httpClient.request(req.method, req.url, __spreadValues(__spreadValues({
    observe: "response",
    responseType: "json",
    reportProgress: false
  }, bodyOrParams), req.options));
};
var mergeHeaders = (source, destination) => {
  if (source && destination) {
    const merged = destination.keys().reduce((headers, name) => headers.set(name, destination.getAll(name)), source);
    return merged;
  }
  return destination || source;
};
function prioritize(...values) {
  return values.find((val) => typeof val !== "undefined");
}
function createHeadersWithClientAwareness(context) {
  let headers = context.headers && context.headers instanceof HttpHeaders ? context.headers : new HttpHeaders(context.headers);
  if (context.clientAwareness) {
    const {
      name,
      version
    } = context.clientAwareness;
    if (name && !headers.has("apollographql-client-name")) {
      headers = headers.set("apollographql-client-name", name);
    }
    if (version && !headers.has("apollographql-client-version")) {
      headers = headers.set("apollographql-client-version", version);
    }
  }
  return headers;
}
var defaults = {
  batchInterval: 10,
  batchMax: 10,
  uri: "graphql",
  method: "POST",
  withCredentials: false,
  includeQuery: true,
  includeExtensions: false,
  useMultipart: false
};
function pick(context, options, key) {
  return prioritize(context[key], options[key], defaults[key]);
}
var HttpBatchLinkHandler = class extends ApolloLink {
  httpClient;
  options;
  batcher;
  batchInterval;
  batchMax;
  print = print;
  constructor(httpClient, options) {
    super();
    this.httpClient = httpClient;
    this.options = options;
    this.batchInterval = options.batchInterval || defaults.batchInterval;
    this.batchMax = options.batchMax || defaults.batchMax;
    if (this.options.operationPrinter) {
      this.print = this.options.operationPrinter;
    }
    const batchHandler = (operations) => {
      return new Observable2((observer) => {
        const body = this.createBody(operations);
        const headers = this.createHeaders(operations);
        const {
          method,
          uri,
          withCredentials
        } = this.createOptions(operations);
        if (typeof uri === "function") {
          throw new Error(`Option 'uri' is a function, should be a string`);
        }
        const req = {
          method,
          url: uri,
          body,
          options: {
            withCredentials,
            headers
          }
        };
        const sub = fetch(req, this.httpClient, () => {
          throw new Error("File upload is not available when combined with Batching");
        }).subscribe({
          next: (result) => observer.next(result.body),
          error: (err) => observer.error(err),
          complete: () => observer.complete()
        });
        return () => {
          if (!sub.closed) {
            sub.unsubscribe();
          }
        };
      });
    };
    const batchKey = options.batchKey || ((operation) => {
      return this.createBatchKey(operation);
    });
    this.batcher = new BatchLink({
      batchInterval: this.batchInterval,
      batchMax: this.batchMax,
      batchKey,
      batchHandler
    });
  }
  createOptions(operations) {
    const context = operations[0].getContext();
    return {
      method: pick(context, this.options, "method"),
      uri: pick(context, this.options, "uri"),
      withCredentials: pick(context, this.options, "withCredentials")
    };
  }
  createBody(operations) {
    return operations.map((operation) => {
      const includeExtensions = prioritize(operation.getContext().includeExtensions, this.options.includeExtensions, false);
      const includeQuery = prioritize(operation.getContext().includeQuery, this.options.includeQuery, true);
      const body = {
        operationName: operation.operationName,
        variables: operation.variables
      };
      if (includeExtensions) {
        body.extensions = operation.extensions;
      }
      if (includeQuery) {
        body.query = this.print(operation.query);
      }
      return body;
    });
  }
  createHeaders(operations) {
    return operations.reduce((headers, operation) => {
      return mergeHeaders(headers, operation.getContext().headers);
    }, createHeadersWithClientAwareness({
      headers: this.options.headers,
      clientAwareness: operations[0]?.getContext()?.clientAwareness
    }));
  }
  createBatchKey(operation) {
    const context = operation.getContext();
    if (context.skipBatching) {
      return Math.random().toString(36).substring(2, 11);
    }
    const headers = context.headers && context.headers.keys().map((k) => context.headers.get(k));
    const opts = JSON.stringify({
      includeQuery: context.includeQuery,
      includeExtensions: context.includeExtensions,
      headers
    });
    return prioritize(context.uri, this.options.uri, "") + opts;
  }
  request(op) {
    return this.batcher.request(op);
  }
};
var HttpBatchLink = class _HttpBatchLink {
  httpClient;
  constructor(httpClient) {
    this.httpClient = httpClient;
  }
  create(options) {
    return new HttpBatchLinkHandler(this.httpClient, options);
  }
  static \u0275fac = function HttpBatchLink_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HttpBatchLink)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _HttpBatchLink,
    factory: _HttpBatchLink.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HttpBatchLink, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: HttpClient
  }], null);
})();
var HttpLinkHandler = class extends ApolloLink {
  httpClient;
  options;
  requester;
  print = print;
  constructor(httpClient, options) {
    super();
    this.httpClient = httpClient;
    this.options = options;
    if (this.options.operationPrinter) {
      this.print = this.options.operationPrinter;
    }
    this.requester = (operation) => new Observable2((observer) => {
      const context = operation.getContext();
      let method = pick(context, this.options, "method");
      const includeQuery = pick(context, this.options, "includeQuery");
      const includeExtensions = pick(context, this.options, "includeExtensions");
      const url = pick(context, this.options, "uri");
      const withCredentials = pick(context, this.options, "withCredentials");
      const useMultipart = pick(context, this.options, "useMultipart");
      const useGETForQueries = this.options.useGETForQueries === true;
      const isQuery = operation.query.definitions.some((def) => def.kind === "OperationDefinition" && def.operation === "query");
      if (useGETForQueries && isQuery) {
        method = "GET";
      }
      const req = {
        method,
        url: typeof url === "function" ? url(operation) : url,
        body: {
          operationName: operation.operationName,
          variables: operation.variables
        },
        options: {
          withCredentials,
          useMultipart,
          headers: this.options.headers
        }
      };
      if (includeExtensions) {
        req.body.extensions = operation.extensions;
      }
      if (includeQuery) {
        req.body.query = this.print(operation.query);
      }
      const headers = createHeadersWithClientAwareness(context);
      req.options.headers = mergeHeaders(req.options.headers, headers);
      const sub = fetch(req, this.httpClient, this.options.extractFiles).subscribe({
        next: (response) => {
          operation.setContext({
            response
          });
          observer.next(response.body);
        },
        error: (err) => observer.error(err),
        complete: () => observer.complete()
      });
      return () => {
        if (!sub.closed) {
          sub.unsubscribe();
        }
      };
    });
  }
  request(op) {
    return this.requester(op);
  }
};
var HttpLink = class _HttpLink {
  httpClient;
  constructor(httpClient) {
    this.httpClient = httpClient;
  }
  create(options) {
    return new HttpLinkHandler(this.httpClient, options);
  }
  static \u0275fac = function HttpLink_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HttpLink)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _HttpLink,
    factory: _HttpLink.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HttpLink, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: HttpClient
  }], null);
})();

// node_modules/@apollo/client/link/context/index.js
function setContext(setter) {
  return new ApolloLink(function(operation, forward) {
    var request = __rest(operation, []);
    return new Observable2(function(observer) {
      var handle;
      var closed = false;
      Promise.resolve(request).then(function(req) {
        return setter(req, operation.getContext());
      }).then(operation.setContext).then(function() {
        if (closed) return;
        handle = forward(operation).subscribe({
          next: observer.next.bind(observer),
          error: observer.error.bind(observer),
          complete: observer.complete.bind(observer)
        });
      }).catch(observer.error.bind(observer));
      return function() {
        closed = true;
        if (handle) handle.unsubscribe();
      };
    });
  });
}

// src/app/shared/interceptors/auth.interceptor.ts
var authInterceptor = (req, next) => {
  const storageService = inject(StorageService);
  const token = storageService.getItem("token");
  if (token) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedReq);
  }
  return next(req);
};

// src/app/app.config.ts
var MY_DATE_FORMATS = {
  parse: {
    dateInput: "DD/MM/YYYY"
  },
  display: {
    dateInput: "DD/MM/YYYY",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM YYYY"
  }
};
function createApollo(httpLink) {
  const authLink = setContext((_, { headers }) => {
    let token = null;
    if (typeof window !== "undefined" && window.localStorage) {
      const tokenStr = localStorage.getItem("token");
      if (tokenStr) {
        try {
          token = JSON.parse(tokenStr);
        } catch (e) {
          token = tokenStr;
        }
      }
    }
    return {
      headers: __spreadProps(__spreadValues({}, headers), {
        authorization: token ? `Bearer ${token}` : ""
      })
    };
  });
  const link = httpLink.create({
    uri: `${environment.APIURL}/graphql`
  });
  return {
    link: authLink.concat(link),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: { fetchPolicy: "network-only" },
      query: { fetchPolicy: "network-only" }
    }
  };
}
var appConfig = {
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },
    { provide: MAT_DATE_LOCALE, useValue: "vi-VN" },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: DateAdapter, useClass: DynamicDateAdapter },
    Apollo,
    HttpLink,
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink]
    },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideNativeDateAdapter(),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    provideAnimationsAsync(),
    provideServiceWorker("ngsw-worker.js", {
      enabled: false,
      // Keep disabled for now to ensure stable SSR
      registrationStrategy: "registerWhenStable:30000"
    })
  ]
};

// src/app/app.config.server.ts
var serverConfig = {
  providers: [
    provideServerRendering()
  ]
};
var config = mergeApplicationConfig(appConfig, serverConfig);

// src/main.server.ts
if (typeof global !== "undefined") {
  const windowMock = {
    document: {
      documentElement: { style: {} },
      body: { style: {} },
      createElement: () => ({
        style: {},
        getContext: () => ({}),
        setAttribute: () => {
        },
        appendChild: () => {
        },
        classList: { add: () => {
        }, remove: () => {
        } }
      }),
      getElementById: () => null,
      querySelector: () => null,
      querySelectorAll: () => [],
      addEventListener: () => {
      },
      removeEventListener: () => {
      }
    },
    localStorage: {
      getItem: () => null,
      setItem: () => {
      },
      removeItem: () => {
      },
      clear: () => {
      },
      key: () => null,
      length: 0
    },
    sessionStorage: {
      getItem: () => null,
      setItem: () => {
      },
      removeItem: () => {
      },
      clear: () => {
      },
      key: () => null,
      length: 0
    },
    navigator: {
      userAgent: "node",
      platform: "node",
      languages: ["en"]
    },
    location: {
      href: "",
      protocol: "http:",
      host: "localhost",
      hostname: "localhost",
      pathname: "/",
      search: "",
      hash: "",
      reload: () => {
      }
    },
    history: {
      pushState: () => {
      },
      replaceState: () => {
      },
      back: () => {
      },
      forward: () => {
      },
      go: () => {
      },
      length: 0,
      state: null
    },
    addEventListener: () => {
    },
    removeEventListener: () => {
    },
    getSelection: () => ({
      removeAllRanges: () => {
      },
      addRange: () => {
      }
    }),
    scrollTo: () => {
    },
    alert: () => {
    },
    confirm: () => true,
    prompt: () => "",
    setTimeout: global.setTimeout,
    clearTimeout: global.clearTimeout,
    setInterval: global.setInterval,
    clearInterval: global.clearInterval,
    requestAnimationFrame: (cb) => global.setTimeout(cb, 0),
    cancelAnimationFrame: (id) => global.clearTimeout(id),
    Node: function() {
    },
    HTMLElement: function() {
    },
    Event: function() {
    },
    CustomEvent: function() {
    },
    requestIdleCallback: (cb) => global.setTimeout(cb, 0),
    cancelIdleCallback: (id) => global.clearTimeout(id),
    matchMedia: () => ({
      matches: false,
      addListener: () => {
      },
      removeListener: () => {
      }
    })
  };
  windowMock.window = windowMock;
  windowMock.self = windowMock;
  windowMock.top = windowMock;
  windowMock.parent = windowMock;
  const safeDefineOnGlobal = (key, value) => {
    try {
      Object.defineProperty(global, key, {
        value,
        writable: true,
        configurable: true
      });
    } catch (e) {
      try {
        global[key] = value;
      } catch (err) {
        try {
          if (global[key] && typeof global[key] === "object") {
            Object.assign(global[key], value);
          }
        } catch (assignErr) {
          console.warn(`Could not set or extend global.${key}:`, assignErr);
        }
      }
    }
  };
  safeDefineOnGlobal("window", windowMock);
  safeDefineOnGlobal("document", windowMock.document);
  safeDefineOnGlobal("localStorage", windowMock.localStorage);
  safeDefineOnGlobal("sessionStorage", windowMock.sessionStorage);
  safeDefineOnGlobal("navigator", windowMock.navigator);
  safeDefineOnGlobal("location", windowMock.location);
  safeDefineOnGlobal("history", windowMock.history);
  safeDefineOnGlobal("getSelection", windowMock.getSelection);
  safeDefineOnGlobal("addEventListener", windowMock.addEventListener);
  safeDefineOnGlobal("removeEventListener", windowMock.removeEventListener);
}
var bootstrap = () => bootstrapApplication(AppComponent, config);
var main_server_default = bootstrap;
export {
  main_server_default as default,
  destroyAngularServerApp as \u0275destroyAngularServerApp,
  extractRoutesAndCreateRouteTree as \u0275extractRoutesAndCreateRouteTree,
  getOrCreateAngularServerApp as \u0275getOrCreateAngularServerApp,
  resetCompiledComponents as \u0275resetCompiledComponents
};
/*! Bundled license information:

@angular/platform-browser/fesm2022/animations/async.mjs:
  (**
   * @license Angular v19.1.6
   * (c) 2010-2024 Google LLC. https://angular.io/
   * License: MIT
   *)
*/
//# sourceMappingURL=main.server.mjs.map
