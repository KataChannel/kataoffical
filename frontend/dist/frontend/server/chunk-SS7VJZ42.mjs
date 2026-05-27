import './polyfills.server.mjs';
import {
  GoogleAuthProvider
} from "./chunk-7BX6HIE3.mjs";
import {
  AppCheckInstances
} from "./chunk-6TZMHUI4.mjs";
import {
  FIREBASE_APP_NAME,
  FIREBASE_OPTIONS,
  VERSION,
  pendingUntilEvent,
  ɵAngularFireSchedulers,
  ɵapplyMixins,
  ɵcacheInstance,
  ɵfirebaseAppFactory,
  ɵlazySDKProxy
} from "./chunk-YLEDBPUB.mjs";
import {
  firebase
} from "./chunk-ZAXNRHQN.mjs";
import "./chunk-CXFG5YDN.mjs";
import {
  MatCheckboxModule
} from "./chunk-ZVEFRUHR.mjs";
import {
  UserService
} from "./chunk-XHRWGDIX.mjs";
import {
  ActivatedRoute,
  Router
} from "./chunk-TLYIA537.mjs";
import {
  MatInput,
  MatInputModule
} from "./chunk-KU7CK3YB.mjs";
import {
  DefaultValueAccessor,
  FormsModule,
  MatFormField,
  MatLabel,
  MatPrefix,
  NgControlStatus,
  NgModel
} from "./chunk-K4777VIL.mjs";
import {
  MatIcon,
  MatIconModule
} from "./chunk-VOLHFDBH.mjs";
import {
  StorageService
} from "./chunk-A5AQV4K7.mjs";
import "./chunk-OWHCCJ6T.mjs";
import "./chunk-AF3EHXCM.mjs";
import "./chunk-LOJIWTVC.mjs";
import {
  MatButtonModule
} from "./chunk-K6ADGRHN.mjs";
import "./chunk-VMLPK7VD.mjs";
import "./chunk-RILUB63S.mjs";
import "./chunk-AJDW274Y.mjs";
import {
  isPlatformBrowser,
  isPlatformServer
} from "./chunk-UP6A7POK.mjs";
import {
  EnvironmentInjector,
  Inject,
  Injectable,
  InjectionToken,
  NgModule,
  NgZone,
  Observable,
  Optional,
  PLATFORM_ID,
  Subject,
  filter,
  first,
  from,
  inject,
  map,
  merge,
  observeOn,
  of,
  setClassMetadata,
  shareReplay,
  subscribeOn,
  switchMap,
  switchMapTo,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵresolveWindow,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-I6KZCWLZ.mjs";
import "./chunk-QS2IQGEQ.mjs";
import {
  __async
} from "./chunk-FMEBT56H.mjs";

// src/app/shared/common/users/login/login.ts
var Config = {
  Backgroup: { url: "", alt: "" },
  Logo: { url: "images/logo.svg", alt: "" }
};

// node_modules/@angular/fire/fesm2022/angular-fire-compat-auth.mjs
var proxyPolyfillCompat = {
  name: null,
  config: null,
  emulatorConfig: null,
  app: null,
  applyActionCode: null,
  checkActionCode: null,
  confirmPasswordReset: null,
  createUserWithEmailAndPassword: null,
  currentUser: null,
  fetchSignInMethodsForEmail: null,
  isSignInWithEmailLink: null,
  getRedirectResult: null,
  languageCode: null,
  settings: null,
  onAuthStateChanged: null,
  onIdTokenChanged: null,
  sendSignInLinkToEmail: null,
  sendPasswordResetEmail: null,
  setPersistence: null,
  signInAndRetrieveDataWithCredential: null,
  signInAnonymously: null,
  signInWithCredential: null,
  signInWithCustomToken: null,
  signInWithEmailAndPassword: null,
  signInWithPhoneNumber: null,
  signInWithEmailLink: null,
  signInWithPopup: null,
  signInWithRedirect: null,
  signOut: null,
  tenantId: null,
  updateCurrentUser: null,
  useDeviceLanguage: null,
  useEmulator: null,
  verifyPasswordResetCode: null
};
var USE_EMULATOR = new InjectionToken("angularfire2.auth.use-emulator");
var SETTINGS = new InjectionToken("angularfire2.auth.settings");
var TENANT_ID = new InjectionToken("angularfire2.auth.tenant-id");
var LANGUAGE_CODE = new InjectionToken("angularfire2.auth.langugage-code");
var USE_DEVICE_LANGUAGE = new InjectionToken("angularfire2.auth.use-device-language");
var PERSISTENCE = new InjectionToken("angularfire.auth.persistence");
var \u0275authFactory = (app, zone, useEmulator, tenantId, languageCode, useDeviceLanguage2, settings, persistence) => \u0275cacheInstance(`${app.name}.auth`, "AngularFireAuth", app.name, () => {
  const auth = zone.runOutsideAngular(() => app.auth());
  if (useEmulator) {
    auth.useEmulator(...useEmulator);
  }
  if (tenantId) {
    auth.tenantId = tenantId;
  }
  auth.languageCode = languageCode;
  if (useDeviceLanguage2) {
    auth.useDeviceLanguage();
  }
  if (settings) {
    for (const [k, v] of Object.entries(settings)) {
      auth.settings[k] = v;
    }
  }
  if (persistence) {
    auth.setPersistence(persistence);
  }
  return auth;
}, [useEmulator, tenantId, languageCode, useDeviceLanguage2, settings, persistence]);
var AngularFireAuth = class _AngularFireAuth {
  injector = inject(EnvironmentInjector);
  /**
   * Observable of authentication state; as of Firebase 4.0 this is only triggered via sign-in/out
   */
  authState;
  /**
   * Observable of the currently signed-in user's JWT token used to identify the user to a Firebase service (or null).
   */
  idToken;
  /**
   * Observable of the currently signed-in user (or null).
   */
  user;
  /**
   * Observable of the currently signed-in user's IdTokenResult object which contains the ID token JWT string and other
   * helper properties for getting different data associated with the token as well as all the decoded payload claims
   * (or null).
   */
  idTokenResult;
  /**
   * Observable of the currently signed-in user's credential, or null
   */
  credential;
  constructor(options, name, platformId, zone, schedulers, useEmulator, settings, tenantId, languageCode, useDeviceLanguage2, persistence, _appCheckInstances) {
    const logins = new Subject();
    const auth = of(void 0).pipe(observeOn(schedulers.outsideAngular), switchMap(() => zone.runOutsideAngular(() => import("./chunk-NO3WSHVT.mjs"))), map(() => \u0275firebaseAppFactory(options, zone, name)), map((app) => \u0275authFactory(app, zone, useEmulator, tenantId, languageCode, useDeviceLanguage2, settings, persistence)), shareReplay({
      bufferSize: 1,
      refCount: false
    }));
    if (isPlatformServer(platformId)) {
      this.authState = this.user = this.idToken = this.idTokenResult = this.credential = of(null);
    } else {
      auth.pipe(first()).subscribe();
      const redirectResult = auth.pipe(switchMap((auth2) => auth2.getRedirectResult().then((it) => it, () => null)), pendingUntilEvent(this.injector), shareReplay({
        bufferSize: 1,
        refCount: false
      }));
      const authStateChanged = auth.pipe(switchMap((auth2) => new Observable((sub) => ({
        unsubscribe: zone.runOutsideAngular(() => auth2.onAuthStateChanged((next) => sub.next(next), (err) => sub.error(err), () => sub.complete()))
      }))));
      const idTokenChanged = auth.pipe(switchMap((auth2) => new Observable((sub) => ({
        unsubscribe: zone.runOutsideAngular(() => auth2.onIdTokenChanged((next) => sub.next(next), (err) => sub.error(err), () => sub.complete()))
      }))));
      this.authState = redirectResult.pipe(switchMapTo(authStateChanged), subscribeOn(schedulers.outsideAngular), observeOn(schedulers.insideAngular));
      this.user = redirectResult.pipe(switchMapTo(idTokenChanged), subscribeOn(schedulers.outsideAngular), observeOn(schedulers.insideAngular));
      this.idToken = this.user.pipe(switchMap((user) => user ? from(user.getIdToken()) : of(null)));
      this.idTokenResult = this.user.pipe(switchMap((user) => user ? from(user.getIdTokenResult()) : of(null)));
      this.credential = merge(
        redirectResult,
        logins,
        // pipe in null authState to make credential zipable, just a weird devexp if
        // authState and user go null to still have a credential
        this.authState.pipe(filter((it) => !it))
      ).pipe(
        // handle the { user: { } } when a user is already logged in, rather have null
        // TODO handle the type corcersion better
        map((credential) => credential?.user ? credential : null),
        subscribeOn(schedulers.outsideAngular),
        observeOn(schedulers.insideAngular)
      );
    }
    return \u0275lazySDKProxy(this, auth, zone, {
      spy: {
        apply: (name2, _, val) => {
          if (name2.startsWith("signIn") || name2.startsWith("createUser")) {
            val.then((user) => logins.next(user));
          }
        }
      }
    });
  }
  static \u0275fac = function AngularFireAuth_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AngularFireAuth)(\u0275\u0275inject(FIREBASE_OPTIONS), \u0275\u0275inject(FIREBASE_APP_NAME, 8), \u0275\u0275inject(PLATFORM_ID), \u0275\u0275inject(NgZone), \u0275\u0275inject(\u0275AngularFireSchedulers), \u0275\u0275inject(USE_EMULATOR, 8), \u0275\u0275inject(SETTINGS, 8), \u0275\u0275inject(TENANT_ID, 8), \u0275\u0275inject(LANGUAGE_CODE, 8), \u0275\u0275inject(USE_DEVICE_LANGUAGE, 8), \u0275\u0275inject(PERSISTENCE, 8), \u0275\u0275inject(AppCheckInstances, 8));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _AngularFireAuth,
    factory: _AngularFireAuth.\u0275fac,
    providedIn: "any"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AngularFireAuth, [{
    type: Injectable,
    args: [{
      providedIn: "any"
    }]
  }], () => [{
    type: void 0,
    decorators: [{
      type: Inject,
      args: [FIREBASE_OPTIONS]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [FIREBASE_APP_NAME]
    }]
  }, {
    type: Object,
    decorators: [{
      type: Inject,
      args: [PLATFORM_ID]
    }]
  }, {
    type: NgZone
  }, {
    type: \u0275AngularFireSchedulers
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [USE_EMULATOR]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [SETTINGS]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [TENANT_ID]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [LANGUAGE_CODE]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [USE_DEVICE_LANGUAGE]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [PERSISTENCE]
    }]
  }, {
    type: AppCheckInstances,
    decorators: [{
      type: Optional
    }]
  }], null);
})();
\u0275applyMixins(AngularFireAuth, [proxyPolyfillCompat]);
var AngularFireAuthModule = class _AngularFireAuthModule {
  constructor() {
    firebase.registerVersion("angularfire", VERSION.full, "auth-compat");
  }
  static \u0275fac = function AngularFireAuthModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AngularFireAuthModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _AngularFireAuthModule
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    providers: [AngularFireAuth]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AngularFireAuthModule, [{
    type: NgModule,
    args: [{
      providers: [AngularFireAuth]
    }]
  }], () => [], null);
})();

// src/app/shared/common/users/login/login.component.ts
var _c0 = () => ({ standalone: true });
var LoginComponent = class _LoginComponent {
  auth;
  route;
  router;
  platformId;
  token;
  gotonew = "translate-x-0";
  _UserService = inject(UserService);
  _StorageService = inject(StorageService);
  Config = Config;
  order1 = "order-1";
  order2 = "order-2";
  rightpanel = "transform-x-0";
  leftpanel = "transform-x-0";
  // _spinner: NgxSpinnerService = inject(NgxSpinnerService);
  // _NotifierService: NotifierService = inject(NotifierService);
  User = {};
  constructor(auth, route, router, platformId) {
    this.auth = auth;
    this.route = route;
    this.router = router;
    this.platformId = platformId;
    if (isPlatformBrowser(this.platformId)) {
      this.token = localStorage.getItem("token") || null;
    }
  }
  onMessage(event) {
    if (event.origin !== "http://localhost:4300")
      return;
  }
  SlidingForm() {
    if (this.order1 == "order-1") {
      this.rightpanel = "opacity-0";
      this.leftpanel = "opacity-0";
    } else {
      this.rightpanel = "opacity-100";
      this.leftpanel = "opacity-100";
    }
    setTimeout(() => {
      this.order1 == "order-1" ? this.order1 = "order-2" : this.order1 = "order-1", this.order2 == "order-1" ? this.order2 = "order-2" : this.order2 = "order-1";
      this.rightpanel = "opacity-100";
      this.leftpanel = "opacity-100";
    }, 200);
  }
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const token = params["token"];
      if (token) {
        console.log("Token from URL:", token);
        this.validateToken(token);
      }
    });
  }
  validateToken(token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.exp && payload.exp < Date.now() / 1e3) {
      } else {
        this._StorageService.setItem("token", token);
        this._UserService.getProfile().then((res) => {
          if (res) {
            if (res.permissions > 0) {
              console.log(res);
              window.location.reload();
            } else {
              this.router.navigate(["/admin/lienheadmin"]);
            }
          }
        });
      }
    } catch (error) {
    }
  }
  Dangnhap() {
    return __async(this, null, function* () {
      if (this.User.SDT && this.User.SDT !== "" && (this.User.password && this.User.password !== "")) {
        this.User.email = this.User.SDT;
        try {
          this._UserService.login(this.User).then((data) => {
            console.log(data);
            if (data && data[0]) {
              setTimeout(() => {
                window.location.reload();
              }, 100);
            }
          }).catch((err) => {
            console.error("Login promise error:", err);
          });
        } catch (error) {
          console.error("Login catch error:", error);
        }
      } else {
        alert("Vui l\xF2ng \u0111i\u1EC1n \u0111\u1EE7 S\u1ED1 \u0111i\u1EC7n tho\u1EA1i v\xE0 M\u1EADt kh\u1EA9u");
      }
    });
  }
  loginWithGoogle() {
    return __async(this, null, function* () {
      const GoogleAuthProvider2 = new GoogleAuthProvider();
      try {
        const result = yield this.auth.signInWithPopup(GoogleAuthProvider2);
        console.log("Logged in:", result);
        console.log("Logged in:", result.user);
        console.log("Logged in:", result.user?.providerData[0]);
        this._UserService.LoginByGoogle(result.user?.providerData[0]).then((data) => {
          if (data[0]) {
            if (isPlatformBrowser(this.platformId)) {
            }
          }
        });
      } catch (error) {
        console.error("Login error:", error);
      }
    });
  }
  loginGoogle() {
    this._UserService.loginWithGoogle();
  }
  loginFacebook() {
    this._UserService.loginWithFacebook();
  }
  loginZalo() {
    this._UserService.loginWithZalo();
  }
  static \u0275fac = function LoginComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LoginComponent)(\u0275\u0275directiveInject(AngularFireAuth), \u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(PLATFORM_ID));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginComponent, selectors: [["app-login"]], hostBindings: function LoginComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("message", function LoginComponent_message_HostBindingHandler($event) {
        return ctx.onMessage($event);
      }, false, \u0275\u0275resolveWindow);
    }
  }, decls: 33, vars: 10, consts: [[1, "relative", "w-screen", "h-screen", "overflow-hidden", "flex", "flex-col", "bg-[#0A7A3D]"], [1, "absolute", "inset-0", "bg-black", "opacity-10"], [1, "relative", "z-10", "flex", "grow", "items-center", "justify-center", "p-4"], [1, "w-full", "max-w-lg"], [1, "relative", "w-full", "grid", "lg:grid-cols-1", "gap-8", "lg:p-16", "p-8", "overflow-hidden", "bg-white/90", "backdrop-blur-md", "rounded-2xl", "shadow-2xl"], [1, "relative", "flex", "flex-col", "space-y-6", "items-center", "w-full"], [1, "max-h-32", "w-auto", "drop-shadow-md", "mb-4", 3, "src", "alt"], ["subscriptSizing", "dynamic", "appearance", "outline", 1, "w-full"], ["type", "text", "matInput", "", 3, "ngModelChange", "ngModel", "ngModelOptions", "placeholder"], ["matPrefix", "", 1, "!mr-2", "text-green-600"], ["type", "password", "matInput", "", 3, "keyup.enter", "ngModelChange", "ngModel", "ngModelOptions", "placeholder"], [1, "w-full", "lg:w-64", "cursor-pointer", "flex", "items-center", "justify-center", "p-4", "rounded-xl", "bg-[#0A7A3D]", "text-white", "font-bold", "hover:bg-[#086331]", "transition-all", "duration-300", "shadow-lg", "shadow-green-900/20", "active:scale-95", 3, "click"], [1, "text-center", "font-bold"], [1, "cursor-pointer", "lg:w-64", "w-full"], [1, "border", "flex", "space-x-2", "items-center", "justify-center", "p-2", "rounded-lg", "bg-slate-100", "hover:bg-white", "transition-colors", "duration-200", 3, "click"], ["xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 48 48", 1, "w-8", "h-8"], ["fill", "#FFC107", "d", "M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"], ["fill", "#FF3D00", "d", "M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"], ["fill", "#4CAF50", "d", "M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"], ["fill", "#1976D2", "d", "M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"]], template: function LoginComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275element(1, "div", 1);
      \u0275\u0275elementStart(2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "div", 5);
      \u0275\u0275element(6, "img", 6);
      \u0275\u0275elementStart(7, "mat-form-field", 7)(8, "mat-label");
      \u0275\u0275text(9, "S\u1ED1 \u0111i\u1EC7n tho\u1EA1i");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "input", 8);
      \u0275\u0275twoWayListener("ngModelChange", function LoginComponent_Template_input_ngModelChange_10_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.User.SDT, $event) || (ctx.User.SDT = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "mat-icon", 9);
      \u0275\u0275text(12, "call");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(13, "mat-form-field", 7)(14, "mat-label");
      \u0275\u0275text(15, "M\u1EADt kh\u1EA9u");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "input", 10);
      \u0275\u0275listener("keyup.enter", function LoginComponent_Template_input_keyup_enter_16_listener() {
        return ctx.Dangnhap();
      });
      \u0275\u0275twoWayListener("ngModelChange", function LoginComponent_Template_input_ngModelChange_16_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.User.password, $event) || (ctx.User.password = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "mat-icon", 9);
      \u0275\u0275text(18, "lock");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(19, "button", 11);
      \u0275\u0275listener("click", function LoginComponent_Template_button_click_19_listener() {
        return ctx.Dangnhap();
      });
      \u0275\u0275elementStart(20, "span");
      \u0275\u0275text(21, "\u0110\u0103ng nh\u1EADp t\xE0i kho\u1EA3n");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(22, "div", 12);
      \u0275\u0275text(23, " Ho\u1EB7c \u0110\u0103ng Nh\u1EADp B\u1EB1ng");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "div", 13)(25, "span", 14);
      \u0275\u0275listener("click", function LoginComponent_Template_span_click_25_listener() {
        return ctx.loginGoogle();
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(26, "svg", 15);
      \u0275\u0275element(27, "path", 16)(28, "path", 17)(29, "path", 18)(30, "path", 19);
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(31, "span");
      \u0275\u0275text(32, "Gmail");
      \u0275\u0275elementEnd()()()()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(6);
      \u0275\u0275property("src", ctx.Config.Logo.url, \u0275\u0275sanitizeUrl)("alt", ctx.Config.Logo.alt);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.User.SDT);
      \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(8, _c0))("placeholder", "S\u1ED1 \u0111i\u1EC7n tho\u1EA1i");
      \u0275\u0275advance(6);
      \u0275\u0275twoWayProperty("ngModel", ctx.User.password);
      \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(9, _c0))("placeholder", "M\u1EADt kh\u1EA9u");
    }
  }, dependencies: [
    MatInputModule,
    MatInput,
    MatFormField,
    MatLabel,
    MatPrefix,
    MatCheckboxModule,
    MatButtonModule,
    FormsModule,
    DefaultValueAccessor,
    NgControlStatus,
    NgModel,
    MatIconModule,
    MatIcon
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginComponent, { className: "LoginComponent", filePath: "src/app/shared/common/users/login/login.component.ts", lineNumber: 28 });
})();
export {
  LoginComponent
};
//# sourceMappingURL=chunk-SS7VJZ42.mjs.map
