import {
  ListPhieuchiahangComponent
} from "./chunk-ZBYYBUBR.js";
import "./chunk-75A5UKLJ.js";
import {
  MatSlideToggle,
  MatSlideToggleModule
} from "./chunk-OTAJRW5P.js";
import {
  MatDialogModule
} from "./chunk-YS6BOFHA.js";
import "./chunk-7PZQL3Z5.js";
import "./chunk-VONEIXGX.js";
import "./chunk-S32RIQSG.js";
import "./chunk-CB53OP7A.js";
import "./chunk-OZX2XR6T.js";
import "./chunk-JFLWRVXN.js";
import {
  GenId,
  convertToSlug
} from "./chunk-657A73EG.js";
import "./chunk-MKCJCKWI.js";
import "./chunk-KRIHICU6.js";
import {
  MatSelectModule
} from "./chunk-VZZGNK7J.js";
import "./chunk-LIKOVN7R.js";
import "./chunk-3J77SWWE.js";
import {
  MatIcon,
  MatIconModule
} from "./chunk-ZAANGQNB.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MatFormField,
  MatFormFieldModule,
  MatInput,
  MatInputModule,
  MatLabel,
  NgControlStatus,
  NgModel,
  NumberValueAccessor
} from "./chunk-WEAWHMFJ.js";
import "./chunk-44ZKFD54.js";
import {
  environment
} from "./chunk-U3IXXJDR.js";
import {
  MatSnackBar,
  StorageService
} from "./chunk-WD36GM3Q.js";
import "./chunk-2AWV6PYA.js";
import "./chunk-4E5W4BJX.js";
import {
  MatButton,
  MatButtonModule,
  MatIconButton
} from "./chunk-HICNAP2H.js";
import "./chunk-LD5X4C2B.js";
import "./chunk-GWKJMKCD.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-JGMWTFVW.js";
import "./chunk-KJMZCM3Q.js";
import {
  CommonModule,
  NgIf
} from "./chunk-E6DSVUBK.js";
import {
  effect,
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-IHZ7YO24.js";
import "./chunk-E3MB3462.js";
import {
  __async
} from "./chunk-SXK72SKC.js";

// src/app/admin/phieuchiahang/phieuchiahang.service.ts
var PhieuchiahangService = class _PhieuchiahangService {
  _StorageService;
  router;
  constructor(_StorageService, router) {
    this._StorageService = _StorageService;
    this.router = router;
  }
  ListPhieuchiahang = signal([]);
  DetailPhieuchiahang = signal({});
  phieuchiahangId = signal(null);
  setPhieuchiahangId(id) {
    this.phieuchiahangId.set(id);
  }
  CreatePhieuchiahang(dulieu) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(dulieu)
        };
        const response = yield fetch(`${environment.APIURL}/phieuchiahang`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        if (!response.ok) {
        }
        this.getAllPhieuchiahang();
        this.phieuchiahangId.set(data.id);
      } catch (error) {
        return console.error(error);
      }
    });
  }
  getAllPhieuchiahang() {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this._StorageService.getItem("token")
          }
        };
        const response = yield fetch(`${environment.APIURL}/phieuchiahang`, options);
        if (!response.ok) {
        }
        const data = yield response.json();
      } catch (error) {
        return console.error(error);
      }
    });
  }
  getPhieuchiahangByid(id) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        };
        const response = yield fetch(`${environment.APIURL}/phieuchiahang/findid/${id}`, options);
        if (!response.ok) {
          if (response.status === 401) {
            const result = JSON.stringify({ code: response.status, title: "Vui l\xF2ng \u0111\u0103ng nh\u1EADp l\u1EA1i" });
            this.router.navigate(["/errorserver"], { queryParams: { data: result } });
          } else if (response.status === 403) {
            const result = JSON.stringify({ code: response.status, title: "B\u1EA1n kh\xF4ng c\xF3 quy\u1EC1n truy c\u1EADp" });
            this.router.navigate(["/errorserver"], { queryParams: { data: result } });
          } else if (response.status === 500) {
            const result = JSON.stringify({ code: response.status, title: "L\u1ED7i m\xE1y ch\u1EE7, vui l\xF2ng th\u1EED l\u1EA1i sau" });
            this.router.navigate(["/errorserver"], { queryParams: { data: result } });
          } else {
            const result = JSON.stringify({ code: response.status, title: "L\u1ED7i kh\xF4ng x\xE1c \u0111\u1ECBnh" });
            this.router.navigate(["/errorserver"], { queryParams: { data: result } });
          }
        }
        const data = yield response.json();
        this.DetailPhieuchiahang.set(data);
      } catch (error) {
        return console.error(error);
      }
    });
  }
  updatePhieuchiahang(dulieu) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(dulieu)
        };
        const response = yield fetch(`${environment.APIURL}/phieuchiahang/${dulieu.id}`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        if (!response.ok) {
        }
        this.getAllPhieuchiahang();
        this.getPhieuchiahangByid(dulieu.id);
      } catch (error) {
        return console.error(error);
      }
    });
  }
  DeletePhieuchiahang(item) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        };
        const response = yield fetch(`${environment.APIURL}/phieuchiahang/${item.id}`, options);
        if (!response.ok) {
          if (response.status === 401) {
            const result = JSON.stringify({ code: response.status, title: "Vui l\xF2ng \u0111\u0103ng nh\u1EADp l\u1EA1i" });
            this.router.navigate(["/errorserver"], { queryParams: { data: result } });
          } else if (response.status === 403) {
            const result = JSON.stringify({ code: response.status, title: "B\u1EA1n kh\xF4ng c\xF3 quy\u1EC1n truy c\u1EADp" });
            this.router.navigate(["/errorserver"], { queryParams: { data: result } });
          } else if (response.status === 500) {
            const result = JSON.stringify({ code: response.status, title: "L\u1ED7i m\xE1y ch\u1EE7, vui l\xF2ng th\u1EED l\u1EA1i sau" });
            this.router.navigate(["/errorserver"], { queryParams: { data: result } });
          } else {
            const result = JSON.stringify({ code: response.status, title: "L\u1ED7i kh\xF4ng x\xE1c \u0111\u1ECBnh" });
            this.router.navigate(["/errorserver"], { queryParams: { data: result } });
          }
        }
        this.getAllPhieuchiahang();
      } catch (error) {
        return console.error(error);
      }
    });
  }
  static \u0275fac = function PhieuchiahangService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PhieuchiahangService)(\u0275\u0275inject(StorageService), \u0275\u0275inject(Router));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PhieuchiahangService, factory: _PhieuchiahangService.\u0275fac, providedIn: "root" });
};

// src/app/admin/phieuchiahang/detailphieuchiahang/detailphieuchiahang.component.ts
function DetailPhieuchiahangComponent_button_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 1);
    \u0275\u0275listener("click", function DetailPhieuchiahangComponent_button_9_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.handlePhieuchiahangAction());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "save");
    \u0275\u0275elementEnd()();
  }
}
function DetailPhieuchiahangComponent_button_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 1);
    \u0275\u0275listener("click", function DetailPhieuchiahangComponent_button_10_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleEdit());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "edit");
    \u0275\u0275elementEnd()();
  }
}
function DetailPhieuchiahangComponent_ng_container_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 9)(2, "div", 10);
    \u0275\u0275text(3, "B\u1EA1n ch\u1EAFc ch\u1EAFn mu\u1ED1n xo\xE1 kh\xF4ng?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 11)(5, "button", 12);
    \u0275\u0275listener("click", function DetailPhieuchiahangComponent_ng_container_15_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.DeleteData());
    });
    \u0275\u0275text(6, "\u0110\u1ED3ng \xDD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 13);
    \u0275\u0275listener("click", function DetailPhieuchiahangComponent_ng_container_15_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleDelete());
    });
    \u0275\u0275text(8, "Hu\u1EF7 B\u1ECF");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementContainerEnd();
  }
}
function DetailPhieuchiahangComponent_ng_container_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0)(1);
    \u0275\u0275elementStart(2, "mat-form-field", 14)(3, "mat-label");
    \u0275\u0275text(4, "Ti\xEAu \u0110\u1EC1");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "input", 15);
    \u0275\u0275twoWayListener("ngModelChange", function DetailPhieuchiahangComponent_ng_container_16_Template_input_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailPhieuchiahang().title, $event) || (ctx_r1.DetailPhieuchiahang().title = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("input", function DetailPhieuchiahangComponent_ng_container_16_Template_input_input_5_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.FillSlug());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "mat-form-field", 14)(7, "mat-label");
    \u0275\u0275text(8, "M\xE3 S\u1EA3n Ph\u1EA9m");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "input", 16);
    \u0275\u0275twoWayListener("ngModelChange", function DetailPhieuchiahangComponent_ng_container_16_Template_input_ngModelChange_9_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailPhieuchiahang().masp, $event) || (ctx_r1.DetailPhieuchiahang().masp = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "mat-form-field", 14)(11, "mat-label");
    \u0275\u0275text(12, "Gi\xE1 G\u1ED1c");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "input", 17);
    \u0275\u0275twoWayListener("ngModelChange", function DetailPhieuchiahangComponent_ng_container_16_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailPhieuchiahang().giagoc, $event) || (ctx_r1.DetailPhieuchiahang().giagoc = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "mat-form-field", 14)(15, "mat-label");
    \u0275\u0275text(16, "\u0110\u01A1n V\u1ECB T\xEDnh");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "input", 16);
    \u0275\u0275twoWayListener("ngModelChange", function DetailPhieuchiahangComponent_ng_container_16_Template_input_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailPhieuchiahang().dvt, $event) || (ctx_r1.DetailPhieuchiahang().dvt = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 18)(19, "mat-form-field", 14)(20, "mat-label");
    \u0275\u0275text(21, "S\u1ED1 L\u01B0\u1EE3ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "input", 19);
    \u0275\u0275twoWayListener("ngModelChange", function DetailPhieuchiahangComponent_ng_container_16_Template_input_ngModelChange_22_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailPhieuchiahang().soluong, $event) || (ctx_r1.DetailPhieuchiahang().soluong = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "mat-form-field", 14)(24, "mat-label");
    \u0275\u0275text(25, "S\u1ED1 L\u01B0\u1EE3ng Kho");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "input", 19);
    \u0275\u0275twoWayListener("ngModelChange", function DetailPhieuchiahangComponent_ng_container_16_Template_input_ngModelChange_26_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailPhieuchiahang().soluongkho, $event) || (ctx_r1.DetailPhieuchiahang().soluongkho = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementContainerEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailPhieuchiahang().title);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailPhieuchiahang().masp);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailPhieuchiahang().giagoc);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailPhieuchiahang().dvt);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailPhieuchiahang().soluong);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailPhieuchiahang().soluongkho);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
  }
}
var DetailPhieuchiahangComponent = class _DetailPhieuchiahangComponent {
  _ListphieuchiahangComponent = inject(ListPhieuchiahangComponent);
  _PhieuchiahangService = inject(PhieuchiahangService);
  _route = inject(ActivatedRoute);
  _router = inject(Router);
  _snackBar = inject(MatSnackBar);
  constructor() {
    this._route.paramMap.subscribe((params) => {
      const id = params.get("id");
      this._PhieuchiahangService.setPhieuchiahangId(id);
    });
    effect(() => __async(this, null, function* () {
      const id = this._PhieuchiahangService.phieuchiahangId();
      if (!id) {
        this._router.navigate(["/admin/phieuchiahang"]);
        this._ListphieuchiahangComponent.drawer.close();
      }
      if (id === "0") {
        this.DetailPhieuchiahang.set({ title: GenId(8, false), slug: GenId(8, false) });
        this._ListphieuchiahangComponent.drawer.open();
        this.isEdit.update((value) => !value);
        this._router.navigate(["/admin/phieuchiahang", "0"]);
      } else {
        yield this._PhieuchiahangService.getPhieuchiahangByid(id);
        this._ListphieuchiahangComponent.drawer.open();
        this._router.navigate(["/admin/phieuchiahang", id]);
      }
    }));
  }
  DetailPhieuchiahang = this._PhieuchiahangService.DetailPhieuchiahang;
  isEdit = signal(false);
  isDelete = signal(false);
  phieuchiahangId = this._PhieuchiahangService.phieuchiahangId;
  ngOnInit() {
    return __async(this, null, function* () {
    });
  }
  handlePhieuchiahangAction() {
    return __async(this, null, function* () {
      if (this.phieuchiahangId() === "0") {
        yield this.createPhieuchiahang();
      } else {
        yield this.updatePhieuchiahang();
      }
    });
  }
  createPhieuchiahang() {
    return __async(this, null, function* () {
      try {
        yield this._PhieuchiahangService.CreatePhieuchiahang(this.DetailPhieuchiahang());
        this._snackBar.open("T\u1EA1o M\u1EDBi Th\xE0nh C\xF4ng", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        this.isEdit.update((value) => !value);
      } catch (error) {
        console.error("L\u1ED7i khi t\u1EA1o phieuchiahang:", error);
      }
    });
  }
  updatePhieuchiahang() {
    return __async(this, null, function* () {
      try {
        yield this._PhieuchiahangService.updatePhieuchiahang(this.DetailPhieuchiahang());
        this._snackBar.open("C\u1EADp Nh\u1EADt Th\xE0nh C\xF4ng", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        this.isEdit.update((value) => !value);
      } catch (error) {
        console.error("L\u1ED7i khi c\u1EADp nh\u1EADt phieuchiahang:", error);
      }
    });
  }
  DeleteData() {
    return __async(this, null, function* () {
      try {
        yield this._PhieuchiahangService.DeletePhieuchiahang(this.DetailPhieuchiahang());
        this._snackBar.open("X\xF3a Th\xE0nh C\xF4ng", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        this._router.navigate(["/admin/phieuchiahang"]);
      } catch (error) {
        console.error("L\u1ED7i khi x\xF3a phieuchiahang:", error);
      }
    });
  }
  goBack() {
    this._router.navigate(["/admin/phieuchiahang"]);
    this._ListphieuchiahangComponent.drawer.close();
  }
  trackByFn(index, item) {
    return item.id;
  }
  toggleEdit() {
    this.isEdit.update((value) => !value);
  }
  toggleDelete() {
    this.isDelete.update((value) => !value);
  }
  FillSlug() {
    this.DetailPhieuchiahang.update((v) => {
      v.slug = convertToSlug(v.title);
      return v;
    });
  }
  static \u0275fac = function DetailPhieuchiahangComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DetailPhieuchiahangComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DetailPhieuchiahangComponent, selectors: [["app-detailphieuchiahang"]], decls: 17, vars: 8, consts: [[1, "flex", "flex-row", "justify-between", "items-center", "space-x-2", "p-2"], ["mat-icon-button", "", "color", "primary", 3, "click"], [1, "font-bold"], [1, "flex", "flex-row", "space-x-2", "items-center"], [3, "ngModelChange", "ngModel", "disabled"], ["mat-icon-button", "", "color", "primary", 3, "click", 4, "ngIf"], ["mat-icon-button", "", "color", "warn", 3, "click"], [1, "relative", "flex", "flex-col", "w-full", "p-4", "overflow-auto"], [4, "ngIf"], [1, "flex", "flex-col", "space-y-4", "items-center", "justify-center"], [1, "font-bold", "text-2xl"], [1, "flex", "flex-row", "space-x-2", "items-center", "justify-center"], ["mat-flat-button", "", "color", "primary", 3, "click"], ["mat-flat-button", "", "color", "warn", 3, "click"], ["appearance", "outline"], ["matInput", "", "placeholder", "Vui l\xF2ng nh\u1EADp Ti\xEAu \u0110\u1EC1", 3, "ngModelChange", "input", "ngModel", "disabled"], ["matInput", "", "placeholder", "Vui l\xF2ng nh\u1EADp M\xE3 S\u1EA3n Ph\u1EA9m", 3, "ngModelChange", "ngModel", "disabled"], ["matInput", "", "type", "number", "placeholder", "Vui l\xF2ng nh\u1EADp Gi\xE1 G\u1ED1c", 3, "ngModelChange", "ngModel", "disabled"], [1, "flex", "flex-row", "space-x-2"], ["matInput", "", "type", "number", "placeholder", "Vui l\xF2ng nh\u1EADp M\xE3 S\u1EA3n Ph\u1EA9m", 3, "ngModelChange", "ngModel", "disabled"]], template: function DetailPhieuchiahangComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "button", 1);
      \u0275\u0275listener("click", function DetailPhieuchiahangComponent_Template_button_click_1_listener() {
        return ctx.goBack();
      });
      \u0275\u0275elementStart(2, "mat-icon");
      \u0275\u0275text(3, "arrow_back");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(4, "div", 2);
      \u0275\u0275text(5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "div", 3)(7, "mat-slide-toggle", 4);
      \u0275\u0275twoWayListener("ngModelChange", function DetailPhieuchiahangComponent_Template_mat_slide_toggle_ngModelChange_7_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.DetailPhieuchiahang().isActive, $event) || (ctx.DetailPhieuchiahang().isActive = $event);
        return $event;
      });
      \u0275\u0275text(8);
      \u0275\u0275elementEnd();
      \u0275\u0275template(9, DetailPhieuchiahangComponent_button_9_Template, 3, 0, "button", 5)(10, DetailPhieuchiahangComponent_button_10_Template, 3, 0, "button", 5);
      \u0275\u0275elementStart(11, "button", 6);
      \u0275\u0275listener("click", function DetailPhieuchiahangComponent_Template_button_click_11_listener() {
        return ctx.toggleDelete();
      });
      \u0275\u0275elementStart(12, "mat-icon");
      \u0275\u0275text(13, "delete");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(14, "div", 7);
      \u0275\u0275template(15, DetailPhieuchiahangComponent_ng_container_15_Template, 9, 0, "ng-container", 8)(16, DetailPhieuchiahangComponent_ng_container_16_Template, 27, 12, "ng-container", 8);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_0_0;
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(((tmp_0_0 = ctx.DetailPhieuchiahang()) == null ? null : tmp_0_0.title) || "Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u");
      \u0275\u0275advance(2);
      \u0275\u0275twoWayProperty("ngModel", ctx.DetailPhieuchiahang().isActive);
      \u0275\u0275property("disabled", !ctx.isEdit());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate(ctx.DetailPhieuchiahang().isActive ? "Hi\u1EC3n Th\u1ECB" : "\u1EA8n");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isEdit());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isEdit());
      \u0275\u0275advance(5);
      \u0275\u0275property("ngIf", ctx.isDelete());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isDelete());
    }
  }, dependencies: [
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatInputModule,
    MatInput,
    FormsModule,
    DefaultValueAccessor,
    NumberValueAccessor,
    NgControlStatus,
    NgModel,
    MatIconModule,
    MatIcon,
    MatButtonModule,
    MatButton,
    MatIconButton,
    MatSelectModule,
    MatDialogModule,
    CommonModule,
    NgIf,
    MatSlideToggleModule,
    MatSlideToggle
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DetailPhieuchiahangComponent, { className: "DetailPhieuchiahangComponent", filePath: "src/app/admin/phieuchiahang/detailphieuchiahang/detailphieuchiahang.component.ts", lineNumber: 32 });
})();
export {
  DetailPhieuchiahangComponent
};
//# sourceMappingURL=chunk-5R6IFY5S.js.map
