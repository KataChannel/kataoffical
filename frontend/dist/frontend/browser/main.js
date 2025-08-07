import {
  APOLLO_OPTIONS,
  Apollo,
  ApolloLink,
  InMemoryCache,
  Observable as Observable2,
  print
} from "./chunk-WCX673AM.js";
import {
  FIREBASE_OPTIONS
} from "./chunk-PKPIUWLZ.js";
import "./chunk-7VZTPIES.js";
import "./chunk-R5HFYA7U.js";
import {
  UserService
} from "./chunk-XGCTO3IF.js";
import {
  environment
} from "./chunk-U3IXXJDR.js";
import {
  MatSnackBar
} from "./chunk-WD36GM3Q.js";
import "./chunk-2AWV6PYA.js";
import "./chunk-4E5W4BJX.js";
import "./chunk-HICNAP2H.js";
import "./chunk-LD5X4C2B.js";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  NativeDateAdapter,
  provideNativeDateAdapter
} from "./chunk-GWKJMKCD.js";
import {
  Router,
  RouterOutlet,
  provideRouter
} from "./chunk-JGMWTFVW.js";
import {
  DomRendererFactory2,
  HttpClient,
  HttpHeaders,
  Meta,
  Title,
  bootstrapApplication,
  provideClientHydration,
  provideHttpClient,
  withEventReplay,
  withFetch
} from "./chunk-KJMZCM3Q.js";
import {
  DOCUMENT
} from "./chunk-E6DSVUBK.js";
import {
  ANIMATION_MODULE_TYPE,
  APP_INITIALIZER,
  ApplicationRef,
  ChangeDetectionScheduler,
  Injectable,
  InjectionToken,
  Injector,
  NEVER,
  NgModule,
  NgZone,
  Observable,
  RendererFactory2,
  RuntimeError,
  Subject,
  concat,
  defer,
  delay,
  filter,
  finalize,
  from,
  fromEvent,
  inject,
  isDevMode,
  makeEnvironmentProviders,
  map,
  merge,
  of,
  performanceMarkFeature,
  provideZoneChangeDetection,
  publish,
  setClassMetadata,
  switchMap,
  take,
  tap,
  throwError,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵgetInheritedFactory,
  ɵɵinject,
  ɵɵinvalidFactory
} from "./chunk-IHZ7YO24.js";
import {
  __assign,
  __extends
} from "./chunk-E3MB3462.js";
import {
  __async,
  __spreadValues
} from "./chunk-SXK72SKC.js";

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
  constructor(router) {
    this.router = router;
  }
  resolve(route) {
    const slug = route.paramMap.get("slug");
    const lastPart = slug.slice(slug.lastIndexOf("-") + 1);
    const componentType = routeMap[lastPart] || "notfound";
    console.log(componentType);
    history.replaceState({ componentType }, "");
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
    return new (__ngFactoryType__ || _DynamicComponentResolver)(\u0275\u0275inject(Router));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DynamicComponentResolver, factory: _DynamicComponentResolver.\u0275fac, providedIn: "root" });
};

// src/app/shared/common/users/guards/auth.guard.ts
var AuthGuard = class _AuthGuard {
  _UserService;
  _router;
  constructor(_UserService, _router) {
    this._UserService = _UserService;
    this._router = _router;
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
    return this._UserService.checkDangnhap().pipe(switchMap((authenticated) => {
      if (!authenticated) {
        this._router.navigate(["/login"], { queryParams: { redirectURL } });
        return of(false);
      }
      return of(true);
    }), finalize(() => {
    }));
  }
  static \u0275fac = function AuthGuard_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AuthGuard)(\u0275\u0275inject(UserService), \u0275\u0275inject(Router));
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
  constructor(_UserService, router, _snackBar) {
    this._UserService = _UserService;
    this.router = router;
    this._snackBar = _snackBar;
  }
  canActivate(route) {
    const requiredPermission = route.data["permission"];
    if (!this._UserService.hasPermission(requiredPermission)) {
      this._snackBar.open("Ch\u01B0a C\xF3 Quy\u1EC1n Truy C\u1EADp", "", {
        duration: 1e3,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ["snackbar-warning"]
      });
      this.router.navigate(["/login"]);
      return false;
    } else {
      return true;
    }
  }
  static \u0275fac = function PermissionGuard_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PermissionGuard)(\u0275\u0275inject(UserService), \u0275\u0275inject(Router), \u0275\u0275inject(MatSnackBar));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PermissionGuard, factory: _PermissionGuard.\u0275fac, providedIn: "root" });
};

// src/app/app.routes.ts
var routes = [
  { path: "", redirectTo: "admin/lienheadmin", pathMatch: "full" },
  __spreadValues({
    path: "404",
    loadComponent: () => import("./chunk-OL5DWLVR.js").then((c) => c.NotfoundComponent)
  }, false ? { \u0275entryName: "src/app/site/notfound/notfound.component.ts" } : {}),
  __spreadValues({
    path: "admin",
    canActivate: [AuthGuard],
    loadComponent: () => import("./chunk-3WZ5ZCVT.js").then((c) => c.AdminmainComponent),
    children: [
      {
        path: "auditlog",
        canActivate: [PermissionGuard],
        data: { permission: "auditlog.view" },
        loadChildren: () => import("./chunk-3H6RMMR3.js").then((m) => m.AuditlogRoutingModule)
      },
      {
        path: "dashboard",
        loadComponent: () => import("./chunk-AHBD2KHL.js").then((c) => c.DashboardComponent)
      },
      {
        path: "lienheadmin",
        loadComponent: () => import("./chunk-T6NUQZUJ.js").then((c) => c.LienheadminComponent)
      },
      {
        path: "menu",
        canActivate: [PermissionGuard],
        data: { permission: "menu.view" },
        loadComponent: () => import("./chunk-6CX6CUE4.js").then((c) => c.ListMenuComponent),
        children: [
          {
            path: "",
            loadComponent: () => import("./chunk-6CX6CUE4.js").then((c) => c.ListMenuComponent)
          },
          {
            path: ":id",
            loadComponent: () => import("./chunk-MX5QQWDF.js").then((c) => c.DetailMenuComponent)
          }
        ]
      },
      {
        path: "hotro",
        loadComponent: () => import("./chunk-ZNX5ZMBV.js").then((c) => c.ListHotroComponent),
        children: [
          {
            path: ":id",
            loadComponent: () => import("./chunk-4MMZJLGB.js").then((c) => c.DetailHotroComponent)
          }
        ]
      },
      {
        path: "nhomuser",
        canActivate: [PermissionGuard],
        data: { permission: "nhomuser.view" },
        loadComponent: () => import("./chunk-XVSNMAXF.js").then((c) => c.ListRoleComponent),
        children: [
          {
            path: "",
            loadComponent: () => import("./chunk-XVSNMAXF.js").then((c) => c.ListRoleComponent)
          },
          {
            path: ":id",
            loadComponent: () => import("./chunk-ICORG4YB.js").then((c) => c.DetailRoleComponent)
          }
        ]
      },
      {
        path: "permission",
        canActivate: [PermissionGuard],
        data: { permission: "permission.view" },
        loadComponent: () => import("./chunk-SS43I7J2.js").then((c) => c.ListPermissionComponent),
        children: [
          {
            path: "",
            loadComponent: () => import("./chunk-SS43I7J2.js").then((c) => c.ListPermissionComponent)
          },
          {
            path: ":id",
            loadComponent: () => import("./chunk-XFUETP5V.js").then((c) => c.DetailPermissionComponent)
          }
        ]
      },
      {
        path: "importdata",
        canActivate: [PermissionGuard],
        data: { permission: "importdata.view" },
        loadChildren: () => import("./chunk-6XNDGXMO.js").then((m) => m.ImportdataRoutingModule)
      },
      {
        path: "danhmuc",
        loadComponent: () => import("./chunk-QGUMOADA.js").then((c) => c.ListdanhmucComponent),
        children: [
          {
            path: ":id",
            loadComponent: () => import("./chunk-QBBTJ7A3.js").then((c) => c.DetailDanhmucComponent)
          }
        ]
      },
      {
        path: "baiviet",
        loadComponent: () => import("./chunk-XDIT6F7Y.js").then((c) => c.ListbaivietComponent),
        children: [
          {
            path: ":id",
            loadComponent: () => import("./chunk-AIPDCUMM.js").then((c) => c.DetailBaivietComponent)
          }
        ]
      },
      {
        path: "goooglesheets",
        loadComponent: () => import("./chunk-CO6V2MGS.js").then((c) => c.GooglesheetsComponent)
      },
      {
        path: "sanpham",
        canActivate: [PermissionGuard],
        data: { permission: "sanpham.view" },
        loadComponent: () => import("./chunk-Z4J2Z4TH.js").then((c) => c.ListSanphamComponent),
        children: [
          {
            path: "",
            loadComponent: () => import("./chunk-Z4J2Z4TH.js").then((c) => c.ListSanphamComponent)
          },
          {
            path: ":id",
            loadComponent: () => import("./chunk-73BZI753.js").then((c) => c.DetailSanphamComponent)
          }
        ]
      },
      {
        path: "banggia",
        canActivate: [PermissionGuard],
        data: { permission: "banggia.view" },
        loadComponent: () => import("./chunk-2JSCUDJL.js").then((c) => c.ListBanggiaComponent),
        children: [
          {
            path: "",
            loadComponent: () => import("./chunk-2JSCUDJL.js").then((c) => c.ListBanggiaComponent)
          },
          {
            path: ":id",
            loadComponent: () => import("./chunk-LTBQNO7C.js").then((c) => c.DetailBanggiaComponent)
          }
        ]
      },
      {
        path: "khachhang",
        canActivate: [PermissionGuard],
        data: { permission: "khachhang.view" },
        loadChildren: () => import("./chunk-5IXEZO5M.js").then((m) => m.KhachhangRoutingModule)
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
        loadComponent: () => import("./chunk-HK2YCZ2S.js").then((c) => c.ListNhomkhachhangComponent),
        children: [
          {
            path: "",
            loadComponent: () => import("./chunk-HK2YCZ2S.js").then((c) => c.ListNhomkhachhangComponent)
          },
          {
            path: ":id",
            loadComponent: () => import("./chunk-DXPPMPGW.js").then((c) => c.DetailNhomkhachhangComponent)
          }
        ]
      },
      {
        path: "nhacungcap",
        canActivate: [PermissionGuard],
        data: { permission: "nhacungcap.view" },
        loadChildren: () => import("./chunk-M6GOEZGU.js").then((m) => m.NhacungcapRoutingModule)
      },
      {
        path: "dathang",
        canActivate: [PermissionGuard],
        data: { permission: "dathang.view" },
        loadComponent: () => import("./chunk-ILKUBKTN.js").then((c) => c.ListDathangComponent),
        children: [
          {
            path: "",
            loadComponent: () => import("./chunk-ILKUBKTN.js").then((c) => c.ListDathangComponent)
          },
          {
            path: ":id",
            loadComponent: () => import("./chunk-ZRIMPBPB.js").then((c) => c.DetailDathangComponent)
          }
        ]
      },
      {
        path: "nhucaudathang",
        canActivate: [PermissionGuard],
        data: { permission: "nhucaudathang.view" },
        loadComponent: () => import("./chunk-CH6US7OL.js").then((c) => c.NhucaudathangComponent)
      },
      {
        path: "donhang",
        canActivate: [PermissionGuard],
        data: { permission: "donhang.view" },
        loadComponent: () => import("./chunk-HVDAFV76.js").then((c) => c.ListDonhangComponent),
        children: [
          {
            path: "",
            loadComponent: () => import("./chunk-HVDAFV76.js").then((c) => c.ListDonhangComponent)
          },
          {
            path: ":id",
            loadComponent: () => import("./chunk-EAU7LZ6I.js").then((c) => c.DetailDonhangComponent)
          }
        ]
      },
      {
        path: "vandon",
        canActivate: [PermissionGuard],
        data: { permission: "vandon.view" },
        loadComponent: () => import("./chunk-MOLHP4VH.js").then((c) => c.VandonComponent)
      },
      {
        path: "phieuchuyen",
        canActivate: [PermissionGuard],
        data: { permission: "phieuchuyen.view" },
        loadComponent: () => import("./chunk-ZLURWLWS.js").then((c) => c.ListPhieuchuyenComponent)
      },
      {
        path: "kho",
        loadComponent: () => import("./chunk-ESVBZMZ3.js").then((c) => c.ListKhoComponent),
        children: [
          {
            path: "",
            loadComponent: () => import("./chunk-ESVBZMZ3.js").then((c) => c.ListKhoComponent)
          },
          {
            path: ":id",
            loadComponent: () => import("./chunk-HMTZHYGO.js").then((c) => c.DetailKhoComponent)
          }
        ]
      },
      {
        path: "phieugiaohang",
        canActivate: [PermissionGuard],
        data: { permission: "phieugiaohang.view" },
        loadComponent: () => import("./chunk-LMT4W6H5.js").then((c) => c.ListPhieugiaohangComponent),
        children: [
          {
            path: "",
            loadComponent: () => import("./chunk-LMT4W6H5.js").then((c) => c.ListPhieugiaohangComponent)
          },
          {
            path: ":id",
            loadComponent: () => import("./chunk-Z6XIDHC6.js").then((c) => c.DetailPhieugiaohangComponent)
          }
        ]
      },
      {
        path: "phieuchiahang",
        canActivate: [PermissionGuard],
        data: { permission: "phieuchiahang.view" },
        loadComponent: () => import("./chunk-TMDMLZ6R.js").then((c) => c.ListPhieuchiahangComponent),
        children: [
          {
            path: "",
            loadComponent: () => import("./chunk-TMDMLZ6R.js").then((c) => c.ListPhieuchiahangComponent)
          },
          {
            path: ":id",
            loadComponent: () => import("./chunk-5R6IFY5S.js").then((c) => c.DetailPhieuchiahangComponent)
          }
        ]
      },
      {
        path: "phieukho",
        canActivate: [PermissionGuard],
        data: { permission: "phieukho.view" },
        loadComponent: () => import("./chunk-7Z7WAR2C.js").then((c) => c.ListPhieukhoComponent),
        children: [
          {
            path: "",
            loadComponent: () => import("./chunk-7Z7WAR2C.js").then((c) => c.ListPhieukhoComponent)
          },
          {
            path: ":id",
            loadComponent: () => import("./chunk-WRV7FMWE.js").then((c) => c.DetailPhieukhoComponent)
          }
        ]
      },
      {
        path: "xuatnhapton",
        canActivate: [PermissionGuard],
        data: { permission: "xuatnhapton.view" },
        loadComponent: () => import("./chunk-DLC2FK5E.js").then((c) => c.XuatnhaptonComponent),
        children: [
          {
            path: ":id",
            loadComponent: () => import("./chunk-L5ZWGI7X.js").then((c) => c.DetailXuatnhaptonComponent)
          }
        ]
      },
      //  {
      //       path: 'chotkho',
      //       canActivate: [PermissionGuard],
      //       data: { permission: 'chotkho.view' },
      //       loadChildren: () =>
      //         import('./admin/chotkho/chotkho.route').then(m => m.ChotkhoRoutingModule),
      // },
      {
        path: "congnokhachhang",
        canActivate: [PermissionGuard],
        data: { permission: "congnokhachhang.view" },
        loadComponent: () => import("./chunk-RADVQBGG.js").then((c) => c.ListcongnokhachhangComponent),
        children: [
          {
            path: "",
            loadComponent: () => import("./chunk-RADVQBGG.js").then((c) => c.ListcongnokhachhangComponent)
          },
          {
            path: ":id",
            loadComponent: () => import("./chunk-REWZXYYZ.js").then((c) => c.DetailCongnokhachhangComponent)
          }
        ]
      },
      {
        path: "userguide",
        canActivate: [PermissionGuard],
        data: { permission: "userguide.view" },
        loadComponent: () => import("./chunk-YFDNXDRX.js").then((c) => c.ListUserguideComponent),
        children: [
          {
            path: "",
            loadComponent: () => import("./chunk-YFDNXDRX.js").then((c) => c.ListUserguideComponent)
          },
          {
            path: ":id",
            loadComponent: () => import("./chunk-SOAI5M2S.js").then((c) => c.DetailUserguideComponent)
          }
        ]
      },
      {
        path: "congnoncc",
        canActivate: [PermissionGuard],
        data: { permission: "congnoncc.view" },
        loadComponent: () => import("./chunk-56IF5NJI.js").then((c) => c.CongnonccComponent)
      },
      {
        path: "user",
        canActivate: [PermissionGuard],
        data: { permission: "user.view" },
        loadComponent: () => import("./chunk-C56PDZJ2.js").then((c) => c.ListUserComponent),
        children: [
          {
            path: "",
            loadComponent: () => import("./chunk-C56PDZJ2.js").then((c) => c.ListUserComponent)
          },
          {
            path: ":id",
            loadComponent: () => import("./chunk-K263OYUU.js").then((c) => c.DetailUserComponent)
          }
        ]
      },
      {
        path: "quanlyfile",
        canActivate: [PermissionGuard],
        data: { permission: "quanlyfile.view" },
        loadComponent: () => import("./chunk-KNSYFULD.js").then((c) => c.ListquanlyfileComponent),
        children: [
          {
            path: ":id",
            loadComponent: () => import("./chunk-2HPJZJFW.js").then((c) => c.DetailQuanlyfileComponent)
          }
        ]
      },
      {
        path: "profile",
        canActivate: [PermissionGuard],
        data: { permission: "profile.view" },
        loadComponent: () => import("./chunk-ESOCFASI.js").then((c) => c.ProfileComponent),
        children: [
          {
            path: "socialpage",
            loadComponent: () => import("./chunk-PBYDICOQ.js").then((c) => c.SocialComponent)
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
        loadComponent: () => import("./chunk-LJRGZ3ES.js").then((c) => c.AccountComponent),
        children: [
          {
            path: "password",
            loadComponent: () => import("./chunk-FRZN4ZB2.js").then((c) => c.PasswordComponent)
          },
          {
            path: "general",
            loadComponent: () => import("./chunk-LZNFL4S4.js").then((c) => c.GeneralComponent)
          }
        ]
      }
    ]
  }, false ? { \u0275entryName: "src/app/admin/adminmain/adminmain.component.ts" } : {}),
  __spreadValues({
    path: "login",
    canActivate: [GuestGuard],
    canActivateChild: [GuestGuard],
    loadComponent: () => import("./chunk-ZURXDH62.js").then((c) => c.LoginComponent)
  }, false ? { \u0275entryName: "src/app/shared/common/users/login/login.component.ts" } : {}),
  __spreadValues({
    path: "register",
    canActivate: [GuestGuard],
    canActivateChild: [GuestGuard],
    loadComponent: () => import("./chunk-WB5I46OH.js").then((c) => c.RegisterComponent)
  }, false ? { \u0275entryName: "src/app/shared/common/users/register/register.component.ts" } : {}),
  __spreadValues({
    path: "",
    loadComponent: () => import("./chunk-55NO5N4V.js").then((c) => c.SitemainComponent),
    // loadComponent: () =>import('./admin/hotro/listhotro/listhotro.component').then((c) => c.ListHotroComponent),
    // loadComponent: () =>import('./admin/vantay/vantay.component').then((c) => c.VantayComponent),
    //loadComponent: () =>import('./admin/facecomparison/facecomparison.component').then((c) => c.FacecomparisonComponent),
    children: [
      {
        path: "",
        loadComponent: () => import("./chunk-OPA4C5XU.js").then((c) => c.HomeComponent)
      },
      {
        path: "lien-he",
        loadComponent: () => import("./chunk-C4YRSEPT.js").then((c) => c.LienheComponent)
      },
      {
        path: ":slug",
        resolve: { componentType: DynamicComponentResolver },
        loadComponent: () => __async(void 0, null, function* () {
          const componentType = history?.state?.componentType;
          if (componentType) {
            switch (componentType) {
              case "danhmucbaiviet":
                const c = yield import("./chunk-WJBKOQ3D.js");
                return c.DanhmucbaivietComponent;
              case "baiviet":
                const c_1 = yield import("./chunk-UDDIOM53.js");
                return c_1.BaivietComponent;
              case "danhmuc":
                const c_2 = yield import("./chunk-SNWLSVNS.js");
                return c_2.DanhmucComponent;
              case "sanpham":
                const c_3 = yield import("./chunk-F244M4BS.js");
                return c_3.SanphamComponent;
              case "danhmucgioithieu":
                const c_5 = yield import("./chunk-75Y3AZNB.js");
                return c_5.DanhmucgioithieuComponent;
              case "gioithieu":
                const c_6 = yield import("./chunk-HPA3VANR.js");
                return c_6.GioithieuComponent;
              default:
                const c_4 = yield import("./chunk-OL5DWLVR.js");
                return c_4.NotfoundComponent;
            }
          } else {
            return import("./chunk-OPA4C5XU.js").then((c) => c.HomeComponent);
          }
        })
      }
    ]
  }, false ? { \u0275entryName: "src/app/site/sitemain/sitemain.component.ts" } : {})
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
    const loadFn = () => this.moduleImpl ?? import("./chunk-BVI4BG45.js").then((m) => m);
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

// node_modules/@angular/service-worker/fesm2022/service-worker.mjs
var ERR_SW_NOT_SUPPORTED = "Service workers are disabled or not supported by this browser";
function errorObservable(message) {
  return defer(() => throwError(new Error(message)));
}
var NgswCommChannel = class {
  serviceWorker;
  worker;
  registration;
  events;
  constructor(serviceWorker) {
    this.serviceWorker = serviceWorker;
    if (!serviceWorker) {
      this.worker = this.events = this.registration = errorObservable(ERR_SW_NOT_SUPPORTED);
    } else {
      const controllerChangeEvents = fromEvent(serviceWorker, "controllerchange");
      const controllerChanges = controllerChangeEvents.pipe(map(() => serviceWorker.controller));
      const currentController = defer(() => of(serviceWorker.controller));
      const controllerWithChanges = concat(currentController, controllerChanges);
      this.worker = controllerWithChanges.pipe(filter((c) => !!c));
      this.registration = this.worker.pipe(switchMap(() => serviceWorker.getRegistration()));
      const rawEvents = fromEvent(serviceWorker, "message");
      const rawEventPayload = rawEvents.pipe(map((event) => event.data));
      const eventsUnconnected = rawEventPayload.pipe(filter((event) => event && event.type));
      const events = eventsUnconnected.pipe(publish());
      events.connect();
      this.events = events;
    }
  }
  postMessage(action, payload) {
    return this.worker.pipe(take(1), tap((sw) => {
      sw.postMessage(__spreadValues({
        action
      }, payload));
    })).toPromise().then(() => void 0);
  }
  postMessageWithOperation(type, payload, operationNonce) {
    const waitForOperationCompleted = this.waitForOperationCompleted(operationNonce);
    const postMessage = this.postMessage(type, payload);
    return Promise.all([postMessage, waitForOperationCompleted]).then(([, result]) => result);
  }
  generateNonce() {
    return Math.round(Math.random() * 1e7);
  }
  eventsOfType(type) {
    let filterFn;
    if (typeof type === "string") {
      filterFn = (event) => event.type === type;
    } else {
      filterFn = (event) => type.includes(event.type);
    }
    return this.events.pipe(filter(filterFn));
  }
  nextEventOfType(type) {
    return this.eventsOfType(type).pipe(take(1));
  }
  waitForOperationCompleted(nonce) {
    return this.eventsOfType("OPERATION_COMPLETED").pipe(filter((event) => event.nonce === nonce), take(1), map((event) => {
      if (event.result !== void 0) {
        return event.result;
      }
      throw new Error(event.error);
    })).toPromise();
  }
  get isEnabled() {
    return !!this.serviceWorker;
  }
};
var SwPush = class _SwPush {
  sw;
  /**
   * Emits the payloads of the received push notification messages.
   */
  messages;
  /**
   * Emits the payloads of the received push notification messages as well as the action the user
   * interacted with. If no action was used the `action` property contains an empty string `''`.
   *
   * Note that the `notification` property does **not** contain a
   * [Notification][Mozilla Notification] object but rather a
   * [NotificationOptions](https://notifications.spec.whatwg.org/#dictdef-notificationoptions)
   * object that also includes the `title` of the [Notification][Mozilla Notification] object.
   *
   * [Mozilla Notification]: https://developer.mozilla.org/en-US/docs/Web/API/Notification
   */
  notificationClicks;
  /**
   * Emits the currently active
   * [PushSubscription](https://developer.mozilla.org/en-US/docs/Web/API/PushSubscription)
   * associated to the Service Worker registration or `null` if there is no subscription.
   */
  subscription;
  /**
   * True if the Service Worker is enabled (supported by the browser and enabled via
   * `ServiceWorkerModule`).
   */
  get isEnabled() {
    return this.sw.isEnabled;
  }
  pushManager = null;
  subscriptionChanges = new Subject();
  constructor(sw) {
    this.sw = sw;
    if (!sw.isEnabled) {
      this.messages = NEVER;
      this.notificationClicks = NEVER;
      this.subscription = NEVER;
      return;
    }
    this.messages = this.sw.eventsOfType("PUSH").pipe(map((message) => message.data));
    this.notificationClicks = this.sw.eventsOfType("NOTIFICATION_CLICK").pipe(map((message) => message.data));
    this.pushManager = this.sw.registration.pipe(map((registration) => registration.pushManager));
    const workerDrivenSubscriptions = this.pushManager.pipe(switchMap((pm) => pm.getSubscription()));
    this.subscription = merge(workerDrivenSubscriptions, this.subscriptionChanges);
  }
  /**
   * Subscribes to Web Push Notifications,
   * after requesting and receiving user permission.
   *
   * @param options An object containing the `serverPublicKey` string.
   * @returns A Promise that resolves to the new subscription object.
   */
  requestSubscription(options) {
    if (!this.sw.isEnabled || this.pushManager === null) {
      return Promise.reject(new Error(ERR_SW_NOT_SUPPORTED));
    }
    const pushOptions = {
      userVisibleOnly: true
    };
    let key = this.decodeBase64(options.serverPublicKey.replace(/_/g, "/").replace(/-/g, "+"));
    let applicationServerKey = new Uint8Array(new ArrayBuffer(key.length));
    for (let i = 0; i < key.length; i++) {
      applicationServerKey[i] = key.charCodeAt(i);
    }
    pushOptions.applicationServerKey = applicationServerKey;
    return this.pushManager.pipe(switchMap((pm) => pm.subscribe(pushOptions)), take(1)).toPromise().then((sub) => {
      this.subscriptionChanges.next(sub);
      return sub;
    });
  }
  /**
   * Unsubscribes from Service Worker push notifications.
   *
   * @returns A Promise that is resolved when the operation succeeds, or is rejected if there is no
   *          active subscription or the unsubscribe operation fails.
   */
  unsubscribe() {
    if (!this.sw.isEnabled) {
      return Promise.reject(new Error(ERR_SW_NOT_SUPPORTED));
    }
    const doUnsubscribe = (sub) => {
      if (sub === null) {
        throw new Error("Not subscribed to push notifications.");
      }
      return sub.unsubscribe().then((success) => {
        if (!success) {
          throw new Error("Unsubscribe failed!");
        }
        this.subscriptionChanges.next(null);
      });
    };
    return this.subscription.pipe(take(1), switchMap(doUnsubscribe)).toPromise();
  }
  decodeBase64(input) {
    return atob(input);
  }
  static \u0275fac = function SwPush_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SwPush)(\u0275\u0275inject(NgswCommChannel));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _SwPush,
    factory: _SwPush.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SwPush, [{
    type: Injectable
  }], () => [{
    type: NgswCommChannel
  }], null);
})();
var SwUpdate = class _SwUpdate {
  sw;
  /**
   * Emits a `VersionDetectedEvent` event whenever a new version is detected on the server.
   *
   * Emits a `VersionInstallationFailedEvent` event whenever checking for or downloading a new
   * version fails.
   *
   * Emits a `VersionReadyEvent` event whenever a new version has been downloaded and is ready for
   * activation.
   */
  versionUpdates;
  /**
   * Emits an `UnrecoverableStateEvent` event whenever the version of the app used by the service
   * worker to serve this client is in a broken state that cannot be recovered from without a full
   * page reload.
   */
  unrecoverable;
  /**
   * True if the Service Worker is enabled (supported by the browser and enabled via
   * `ServiceWorkerModule`).
   */
  get isEnabled() {
    return this.sw.isEnabled;
  }
  constructor(sw) {
    this.sw = sw;
    if (!sw.isEnabled) {
      this.versionUpdates = NEVER;
      this.unrecoverable = NEVER;
      return;
    }
    this.versionUpdates = this.sw.eventsOfType(["VERSION_DETECTED", "VERSION_INSTALLATION_FAILED", "VERSION_READY", "NO_NEW_VERSION_DETECTED"]);
    this.unrecoverable = this.sw.eventsOfType("UNRECOVERABLE_STATE");
  }
  /**
   * Checks for an update and waits until the new version is downloaded from the server and ready
   * for activation.
   *
   * @returns a promise that
   * - resolves to `true` if a new version was found and is ready to be activated.
   * - resolves to `false` if no new version was found
   * - rejects if any error occurs
   */
  checkForUpdate() {
    if (!this.sw.isEnabled) {
      return Promise.reject(new Error(ERR_SW_NOT_SUPPORTED));
    }
    const nonce = this.sw.generateNonce();
    return this.sw.postMessageWithOperation("CHECK_FOR_UPDATES", {
      nonce
    }, nonce);
  }
  /**
   * Updates the current client (i.e. browser tab) to the latest version that is ready for
   * activation.
   *
   * In most cases, you should not use this method and instead should update a client by reloading
   * the page.
   *
   * <div class="docs-alert docs-alert-important">
   *
   * Updating a client without reloading can easily result in a broken application due to a version
   * mismatch between the application shell and other page resources,
   * such as lazy-loaded chunks, whose filenames may change between
   * versions.
   *
   * Only use this method, if you are certain it is safe for your specific use case.
   *
   * </div>
   *
   * @returns a promise that
   *  - resolves to `true` if an update was activated successfully
   *  - resolves to `false` if no update was available (for example, the client was already on the
   *    latest version).
   *  - rejects if any error occurs
   */
  activateUpdate() {
    if (!this.sw.isEnabled) {
      return Promise.reject(new Error(ERR_SW_NOT_SUPPORTED));
    }
    const nonce = this.sw.generateNonce();
    return this.sw.postMessageWithOperation("ACTIVATE_UPDATE", {
      nonce
    }, nonce);
  }
  static \u0275fac = function SwUpdate_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SwUpdate)(\u0275\u0275inject(NgswCommChannel));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _SwUpdate,
    factory: _SwUpdate.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SwUpdate, [{
    type: Injectable
  }], () => [{
    type: NgswCommChannel
  }], null);
})();
var SCRIPT = new InjectionToken(ngDevMode ? "NGSW_REGISTER_SCRIPT" : "");
function ngswAppInitializer(injector, script, options) {
  return () => {
    if (false) {
      return;
    }
    if (!("serviceWorker" in navigator && options.enabled !== false)) {
      return;
    }
    const ngZone = injector.get(NgZone);
    const appRef = injector.get(ApplicationRef);
    ngZone.runOutsideAngular(() => {
      const sw = navigator.serviceWorker;
      const onControllerChange = () => sw.controller?.postMessage({
        action: "INITIALIZE"
      });
      sw.addEventListener("controllerchange", onControllerChange);
      appRef.onDestroy(() => {
        sw.removeEventListener("controllerchange", onControllerChange);
      });
    });
    let readyToRegister$;
    if (typeof options.registrationStrategy === "function") {
      readyToRegister$ = options.registrationStrategy();
    } else {
      const [strategy, ...args] = (options.registrationStrategy || "registerWhenStable:30000").split(":");
      switch (strategy) {
        case "registerImmediately":
          readyToRegister$ = of(null);
          break;
        case "registerWithDelay":
          readyToRegister$ = delayWithTimeout(+args[0] || 0);
          break;
        case "registerWhenStable":
          const whenStable$ = from(injector.get(ApplicationRef).whenStable());
          readyToRegister$ = !args[0] ? whenStable$ : merge(whenStable$, delayWithTimeout(+args[0]));
          break;
        default:
          throw new Error(`Unknown ServiceWorker registration strategy: ${options.registrationStrategy}`);
      }
    }
    ngZone.runOutsideAngular(() => readyToRegister$.pipe(take(1)).subscribe(() => navigator.serviceWorker.register(script, {
      scope: options.scope
    }).catch((err) => console.error("Service worker registration failed with:", err))));
  };
}
function delayWithTimeout(timeout) {
  return of(null).pipe(delay(timeout));
}
function ngswCommChannelFactory(opts) {
  const isBrowser = true;
  return new NgswCommChannel(isBrowser && opts.enabled !== false ? navigator.serviceWorker : void 0);
}
var SwRegistrationOptions = class {
  /**
   * Whether the ServiceWorker will be registered and the related services (such as `SwPush` and
   * `SwUpdate`) will attempt to communicate and interact with it.
   *
   * Default: true
   */
  enabled;
  /**
   * A URL that defines the ServiceWorker's registration scope; that is, what range of URLs it can
   * control. It will be used when calling
   * [ServiceWorkerContainer#register()](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register).
   */
  scope;
  /**
   * Defines the ServiceWorker registration strategy, which determines when it will be registered
   * with the browser.
   *
   * The default behavior of registering once the application stabilizes (i.e. as soon as there are
   * no pending micro- and macro-tasks) is designed to register the ServiceWorker as soon as
   * possible but without affecting the application's first time load.
   *
   * Still, there might be cases where you want more control over when the ServiceWorker is
   * registered (for example, there might be a long-running timeout or polling interval, preventing
   * the app from stabilizing). The available option are:
   *
   * - `registerWhenStable:<timeout>`: Register as soon as the application stabilizes (no pending
   *     micro-/macro-tasks) but no later than `<timeout>` milliseconds. If the app hasn't
   *     stabilized after `<timeout>` milliseconds (for example, due to a recurrent asynchronous
   *     task), the ServiceWorker will be registered anyway.
   *     If `<timeout>` is omitted, the ServiceWorker will only be registered once the app
   *     stabilizes.
   * - `registerImmediately`: Register immediately.
   * - `registerWithDelay:<timeout>`: Register with a delay of `<timeout>` milliseconds. For
   *     example, use `registerWithDelay:5000` to register the ServiceWorker after 5 seconds. If
   *     `<timeout>` is omitted, is defaults to `0`, which will register the ServiceWorker as soon
   *     as possible but still asynchronously, once all pending micro-tasks are completed.
   * - An Observable factory function: A function that returns an `Observable`.
   *     The function will be used at runtime to obtain and subscribe to the `Observable` and the
   *     ServiceWorker will be registered as soon as the first value is emitted.
   *
   * Default: 'registerWhenStable:30000'
   */
  registrationStrategy;
};
function provideServiceWorker(script, options = {}) {
  return makeEnvironmentProviders([SwPush, SwUpdate, {
    provide: SCRIPT,
    useValue: script
  }, {
    provide: SwRegistrationOptions,
    useValue: options
  }, {
    provide: NgswCommChannel,
    useFactory: ngswCommChannelFactory,
    deps: [SwRegistrationOptions]
  }, {
    provide: APP_INITIALIZER,
    useFactory: ngswAppInitializer,
    deps: [Injector, SCRIPT, SwRegistrationOptions],
    multi: true
  }]);
}
var ServiceWorkerModule = class _ServiceWorkerModule {
  /**
   * Register the given Angular Service Worker script.
   *
   * If `enabled` is set to `false` in the given options, the module will behave as if service
   * workers are not supported by the browser, and the service worker will not be registered.
   */
  static register(script, options = {}) {
    return {
      ngModule: _ServiceWorkerModule,
      providers: [provideServiceWorker(script, options)]
    };
  }
  static \u0275fac = function ServiceWorkerModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ServiceWorkerModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _ServiceWorkerModule
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    providers: [SwPush, SwUpdate]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ServiceWorkerModule, [{
    type: NgModule,
    args: [{
      providers: [SwPush, SwUpdate]
    }]
  }], null, null);
})();

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
    const map2 = {};
    const files = multipartInfo.files;
    let i = 0;
    files.forEach((paths) => {
      map2[++i] = paths;
    });
    form.append("map", JSON.stringify(map2));
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
  return {
    link: httpLink.create({
      uri: `${environment.APIURL}/graphql`
    }),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "network-only"
      },
      query: {
        fetchPolicy: "network-only"
      }
    }
  };
}
var appConfig = {
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },
    { provide: MAT_DATE_LOCALE, useValue: "vi-VN" },
    // Ngôn ngữ tiếng Việt
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
    provideClientHydration(withEventReplay()),
    provideNativeDateAdapter(),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },
    provideServiceWorker("ngsw-worker.js", {
      enabled: !isDevMode(),
      registrationStrategy: "registerWhenStable:30000"
    })
  ]
};

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
    this.titleService.setTitle("My Dynamic Title");
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

// src/main.ts
bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
/*! Bundled license information:

@angular/platform-browser/fesm2022/animations/async.mjs:
  (**
   * @license Angular v19.1.6
   * (c) 2010-2024 Google LLC. https://angular.io/
   * License: MIT
   *)

@angular/service-worker/fesm2022/service-worker.mjs:
  (**
   * @license Angular v19.1.7
   * (c) 2010-2024 Google LLC. https://angular.io/
   * License: MIT
   *)
  (*!
   * @license
   * Copyright Google LLC All Rights Reserved.
   *
   * Use of this source code is governed by an MIT-style license that can be
   * found in the LICENSE file at https://angular.dev/license
   *)
*/
//# sourceMappingURL=main.js.map
