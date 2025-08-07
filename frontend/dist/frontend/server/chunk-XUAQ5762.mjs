import './polyfills.server.mjs';
import {
  ListNhomkhachhangComponent,
  NhomkhachhangService
} from "./chunk-7AOHPK6S.mjs";
import {
  KhachhangService
} from "./chunk-FOXQ7452.mjs";
import "./chunk-6R25CFXQ.mjs";
import "./chunk-BMDXMCXP.mjs";
import "./chunk-CXFG5YDN.mjs";
import {
  MatSlideToggle,
  MatSlideToggleModule
} from "./chunk-J322K7NT.mjs";
import "./chunk-C4Q5BIA5.mjs";
import "./chunk-TGADPWSB.mjs";
import "./chunk-DWV2CVG4.mjs";
import "./chunk-RCQ574CW.mjs";
import {
  MatDialogModule
} from "./chunk-7O7BZAOJ.mjs";
import "./chunk-RGTCKLO2.mjs";
import "./chunk-GOLLTURE.mjs";
import {
  MatSelectModule
} from "./chunk-Z7QVUZWX.mjs";
import {
  convertToSlug
} from "./chunk-I23Q342N.mjs";
import "./chunk-TEMMKMG5.mjs";
import {
  MatMenu,
  MatMenuModule,
  MatMenuTrigger
} from "./chunk-YOUETZOR.mjs";
import {
  MatIcon,
  MatIconModule
} from "./chunk-TGETIOQI.mjs";
import {
  DefaultValueAccessor,
  FormsModule,
  MatFormField,
  MatFormFieldModule,
  MatInput,
  MatInputModule,
  MatLabel,
  NgControlStatus,
  NgModel
} from "./chunk-BTD2ENWJ.mjs";
import "./chunk-DRJRGOAY.mjs";
import "./chunk-QFPTY5IH.mjs";
import {
  MatSnackBar
} from "./chunk-A6W66WDU.mjs";
import "./chunk-AVOXPLBL.mjs";
import "./chunk-MGLNC3ZQ.mjs";
import {
  MatButton,
  MatButtonModule,
  MatIconButton
} from "./chunk-2QXHUJNF.mjs";
import "./chunk-7GJ6SLXG.mjs";
import "./chunk-CE5R7E7Z.mjs";
import {
  ActivatedRoute,
  Router
} from "./chunk-PLFAEF4K.mjs";
import "./chunk-HCNIBG7Y.mjs";
import {
  CommonModule,
  NgForOf,
  NgIf
} from "./chunk-H3GF4RFC.mjs";
import {
  effect,
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-4EQURZBD.mjs";
import "./chunk-QS2IQGEQ.mjs";
import {
  __async
} from "./chunk-FMEBT56H.mjs";

// src/app/admin/nhomkhachhang/detailnhomkhachhang/detailnhomkhachhang.component.ts
function DetailNhomkhachhangComponent_button_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 3);
    \u0275\u0275listener("click", function DetailNhomkhachhangComponent_button_9_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.handleNhomkhachhangAction());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "save");
    \u0275\u0275elementEnd()();
  }
}
function DetailNhomkhachhangComponent_button_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 3);
    \u0275\u0275listener("click", function DetailNhomkhachhangComponent_button_10_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleEdit());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "edit");
    \u0275\u0275elementEnd()();
  }
}
function DetailNhomkhachhangComponent_ng_container_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 11)(2, "div", 12);
    \u0275\u0275text(3, "B\u1EA1n ch\u1EAFc ch\u1EAFn mu\u1ED1n xo\xE1 kh\xF4ng?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 13)(5, "button", 14);
    \u0275\u0275listener("click", function DetailNhomkhachhangComponent_ng_container_15_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.DeleteData());
    });
    \u0275\u0275text(6, "\u0110\u1ED3ng \xDD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 15);
    \u0275\u0275listener("click", function DetailNhomkhachhangComponent_ng_container_15_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleDelete());
    });
    \u0275\u0275text(8, "Hu\u1EF7 B\u1ECF");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementContainerEnd();
  }
}
function DetailNhomkhachhangComponent_ng_container_16_div_24_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 31);
    \u0275\u0275text(1, "check");
    \u0275\u0275elementEnd();
  }
}
function DetailNhomkhachhangComponent_ng_container_16_div_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 29);
    \u0275\u0275listener("click", function DetailNhomkhachhangComponent_ng_container_16_div_24_Template_div_click_0_listener() {
      const item_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.ChosenKhachhang(item_r7));
    });
    \u0275\u0275template(1, DetailNhomkhachhangComponent_ng_container_16_div_24_span_1_Template, 2, 0, "span", 30);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r7 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.CheckKhachhang(item_r7));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r7.name, " ");
  }
}
function DetailNhomkhachhangComponent_ng_container_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0)(1);
    \u0275\u0275elementStart(2, "div", 16)(3, "mat-form-field", 17)(4, "mat-label");
    \u0275\u0275text(5, "Nh\xF3m Kh\xE1ch h\xE0ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "input", 18);
    \u0275\u0275twoWayListener("ngModelChange", function DetailNhomkhachhangComponent_ng_container_16_Template_input_ngModelChange_6_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailNhomkhachhang().name, $event) || (ctx_r1.DetailNhomkhachhang().name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("input", function DetailNhomkhachhangComponent_ng_container_16_Template_input_input_6_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.FillSlug());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "mat-form-field", 17)(8, "mat-label");
    \u0275\u0275text(9, "M\xF4 T\u1EA3");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "input", 19);
    \u0275\u0275twoWayListener("ngModelChange", function DetailNhomkhachhangComponent_ng_container_16_Template_input_ngModelChange_10_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailNhomkhachhang().description, $event) || (ctx_r1.DetailNhomkhachhang().description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("input", function DetailNhomkhachhangComponent_ng_container_16_Template_input_input_10_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.FillSlug());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div")(12, "span", 20, 0);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "mat-menu", null, 1)(17, "div", 21);
    \u0275\u0275listener("click", function DetailNhomkhachhangComponent_ng_container_16_Template_div_click_17_listener($event) {
      \u0275\u0275restoreView(_r5);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(18, "div", 22)(19, "input", 23);
    \u0275\u0275listener("keyup", function DetailNhomkhachhangComponent_ng_container_16_Template_input_keyup_19_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.doFilterKhachhang($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 24)(21, "span", 25);
    \u0275\u0275text(22, "search");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(23, "div", 26);
    \u0275\u0275template(24, DetailNhomkhachhangComponent_ng_container_16_div_24_Template, 3, 2, "div", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "div", 28)(26, "button", 15);
    \u0275\u0275listener("click", function DetailNhomkhachhangComponent_ng_container_16_Template_button_click_26_listener() {
      \u0275\u0275restoreView(_r5);
      const menuTrigger_r8 = \u0275\u0275reference(13);
      return \u0275\u0275resetView(menuTrigger_r8.closeMenu());
    });
    \u0275\u0275text(27, "\u0110\xF3ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "button", 14);
    \u0275\u0275listener("click", function DetailNhomkhachhangComponent_ng_container_16_Template_button_click_28_listener() {
      \u0275\u0275restoreView(_r5);
      const menuTrigger_r8 = \u0275\u0275reference(13);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.ApplyKhachhang(menuTrigger_r8));
    });
    \u0275\u0275text(29, "\xC1p D\u1EE5ng");
    \u0275\u0275elementEnd()()()()()();
    \u0275\u0275elementContainerEnd()();
  }
  if (rf & 2) {
    const menu_r9 = \u0275\u0275reference(16);
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailNhomkhachhang().name);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailNhomkhachhang().description);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
    \u0275\u0275advance(2);
    \u0275\u0275property("matMenuTriggerFor", menu_r9);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.CheckListKhachhang.length, " Kh\xE1ch H\xE0ng ");
    \u0275\u0275advance(10);
    \u0275\u0275property("ngForOf", ctx_r1.ListKhachhang)("ngForTrackBy", ctx_r1.trackByFn);
  }
}
var DetailNhomkhachhangComponent = class _DetailNhomkhachhangComponent {
  _ListnhomkhachhangComponent = inject(ListNhomkhachhangComponent);
  _NhomkhachhangService = inject(NhomkhachhangService);
  _KhachhangService = inject(KhachhangService);
  _route = inject(ActivatedRoute);
  _router = inject(Router);
  _snackBar = inject(MatSnackBar);
  constructor() {
    this._route.paramMap.subscribe((params) => {
      const id = params.get("id");
      this._NhomkhachhangService.setNhomkhachhangId(id);
    });
    effect(() => __async(this, null, function* () {
      const id = this._NhomkhachhangService.nhomkhachhangId();
      if (!id) {
        this._router.navigate(["/admin/nhomkhachhang"]);
        this._ListnhomkhachhangComponent.drawer.close();
      }
      if (id === "0") {
        this.DetailNhomkhachhang.update(() => {
          return {};
        });
        this._ListnhomkhachhangComponent.drawer.open();
        this.isEdit.update((value) => !value);
        this._router.navigate(["/admin/nhomkhachhang", "0"]);
      } else {
        yield this._NhomkhachhangService.getNhomkhachhangByid(id);
        yield this._KhachhangService.getAllKhachhang();
        this.ListKhachhang = this._KhachhangService.ListKhachhang();
        this.CheckListKhachhang = this.DetailNhomkhachhang().khachhang;
        this._ListnhomkhachhangComponent.drawer.open();
        this._router.navigate(["/admin/nhomkhachhang", id]);
      }
    }));
  }
  DetailNhomkhachhang = this._NhomkhachhangService.DetailNhomkhachhang;
  isEdit = signal(false);
  isDelete = signal(false);
  nhomkhachhangId = this._NhomkhachhangService.nhomkhachhangId;
  ngOnInit() {
    return __async(this, null, function* () {
    });
  }
  handleNhomkhachhangAction() {
    return __async(this, null, function* () {
      if (this.nhomkhachhangId() === "0") {
        yield this.createNhomkhachhang();
      } else {
        yield this.updateNhomkhachhang();
      }
    });
  }
  createNhomkhachhang() {
    return __async(this, null, function* () {
      try {
        this.DetailNhomkhachhang.update((v) => {
          delete v.khachhang;
          return v;
        });
        yield this._NhomkhachhangService.CreateNhomkhachhang(this.DetailNhomkhachhang());
        this._snackBar.open("T\u1EA1o M\u1EDBi Th\xE0nh C\xF4ng", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        this.isEdit.update((value) => !value);
      } catch (error) {
        console.error("L\u1ED7i khi t\u1EA1o nhomkhachhang:", error);
      }
    });
  }
  updateNhomkhachhang() {
    return __async(this, null, function* () {
      try {
        this.DetailNhomkhachhang.update((v) => {
          delete v.khachhang;
          return v;
        });
        yield this._NhomkhachhangService.updateNhomkhachhang(this.DetailNhomkhachhang());
        this._snackBar.open("C\u1EADp Nh\u1EADt Th\xE0nh C\xF4ng", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        this.isEdit.update((value) => !value);
      } catch (error) {
        console.error("L\u1ED7i khi c\u1EADp nh\u1EADt nhomkhachhang:", error);
      }
    });
  }
  DeleteData() {
    return __async(this, null, function* () {
      try {
        yield this._NhomkhachhangService.DeleteNhomkhachhang(this.DetailNhomkhachhang());
        this._snackBar.open("X\xF3a Th\xE0nh C\xF4ng", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        this._router.navigate(["/admin/nhomkhachhang"]);
      } catch (error) {
        console.error("L\u1ED7i khi x\xF3a nhomkhachhang:", error);
      }
    });
  }
  goBack() {
    this._router.navigate(["/admin/nhomkhachhang"]);
    this._ListnhomkhachhangComponent.drawer.close();
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
    this.DetailNhomkhachhang.update((v) => {
      v.slug = convertToSlug(v.title);
      return v;
    });
  }
  ListKhachhang = [];
  CheckListKhachhang = [];
  doFilterKhachhang(event) {
    const value = event.target.value;
    this.ListKhachhang = this._KhachhangService.ListKhachhang().filter((v) => v.name.toLowerCase().includes(value.toLowerCase()));
  }
  ChosenKhachhang(item) {
    const checkitem = this.CheckListKhachhang.find((v) => v.id === item.id);
    if (!checkitem) {
      this.CheckListKhachhang.push(item);
    } else {
      this.CheckListKhachhang = this.CheckListKhachhang.filter((v) => v.id !== item.id);
    }
  }
  ApplyKhachhang(menu) {
    return __async(this, null, function* () {
      console.log(this.DetailNhomkhachhang());
      console.log(this.CheckListKhachhang);
      const removeData = {
        nhomId: this.nhomkhachhangId(),
        khachhangIds: this.DetailNhomkhachhang().khachhang.map((v) => v.id)
      };
      const removePromise = yield this._NhomkhachhangService.removeKHfromNhom(removeData);
      const addData = {
        nhomId: this.nhomkhachhangId(),
        khachhangIds: this.CheckListKhachhang.map((v) => v.id)
      };
      const adddPromise = yield this._NhomkhachhangService.addKHtoNhom(addData);
      Promise.all([removePromise, adddPromise]).then(() => {
        menu.closeMenu();
      });
    });
  }
  CheckKhachhang(item) {
    return this.CheckListKhachhang.find((v) => v.id === item.id) ? true : false;
  }
  static \u0275fac = function DetailNhomkhachhangComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DetailNhomkhachhangComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DetailNhomkhachhangComponent, selectors: [["app-detailnhomkhachhang"]], decls: 17, vars: 8, consts: [["menuTrigger", "matMenuTrigger"], ["menu", "matMenu"], [1, "flex", "flex-row", "justify-between", "items-center", "space-x-2", "p-2"], ["mat-icon-button", "", "color", "primary", 3, "click"], [1, "font-bold"], [1, "flex", "flex-row", "space-x-2", "items-center"], [3, "ngModelChange", "ngModel", "disabled"], ["mat-icon-button", "", "color", "primary", 3, "click", 4, "ngIf"], ["mat-icon-button", "", "color", "warn", 3, "click"], [1, "relative", "flex", "flex-col", "w-full", "p-4", "overflow-auto"], [4, "ngIf"], [1, "flex", "flex-col", "space-y-4", "items-center", "justify-center"], [1, "font-bold", "text-2xl"], [1, "flex", "flex-row", "space-x-2", "items-center", "justify-center"], ["mat-flat-button", "", "color", "primary", 3, "click"], ["mat-flat-button", "", "color", "warn", 3, "click"], [1, "w-full", "flex", "flex-col", "space-y-2"], ["appearance", "outline"], ["matInput", "", "placeholder", "Vui l\xF2ng nh\u1EADp Nh\xF3m Kh\xE1ch h\xE0ng", 3, "ngModelChange", "input", "ngModel", "disabled"], ["matInput", "", "placeholder", "Vui l\xF2ng nh\u1EADp M\xF4 T\u1EA3", 3, "ngModelChange", "input", "ngModel", "disabled"], [1, "lg:flex", "hidden", "whitespace-nowrap", "p-2", "rounded-lg", "bg-slate-200", 3, "matMenuTriggerFor"], [1, "cursor-pointer", "flex", "flex-col", "space-y-4", "p-3", 3, "click"], [1, "relative", "w-full"], ["type", "text", "placeholder", "T\xECm Ki\u1EBFm...", 1, "block", "w-full", "pl-10", "pr-4", "py-2", "text-gray-700", "bg-white", "border", "border-gray-300", "rounded-lg", "focus:border-blue-400", "focus:ring-blue-400", "focus:outline-none", "focus:ring", "focus:ring-opacity-40", 3, "keyup"], [1, "absolute", "inset-y-0", "left-0", "flex", "items-center", "pl-3", "pointer-events-none"], [1, "material-symbols-outlined", "text-gray-500"], [1, "w-full", "flex", "flex-col", "space-y-2", "max-h-44", "overflow-auto"], ["class", "flex flex-row space-x-2 items-center p-2 rounded-lg hover:bg-slate-100", 3, "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "flex", "flex-row", "space-x-2", "items-end", "justify-end"], [1, "flex", "flex-row", "space-x-2", "items-center", "p-2", "rounded-lg", "hover:bg-slate-100", 3, "click"], ["class", "material-symbols-outlined text-blue-600", 4, "ngIf"], [1, "material-symbols-outlined", "text-blue-600"]], template: function DetailNhomkhachhangComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 2)(1, "button", 3);
      \u0275\u0275listener("click", function DetailNhomkhachhangComponent_Template_button_click_1_listener() {
        return ctx.goBack();
      });
      \u0275\u0275elementStart(2, "mat-icon");
      \u0275\u0275text(3, "arrow_back");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(4, "div", 4);
      \u0275\u0275text(5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "div", 5)(7, "mat-slide-toggle", 6);
      \u0275\u0275twoWayListener("ngModelChange", function DetailNhomkhachhangComponent_Template_mat_slide_toggle_ngModelChange_7_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.DetailNhomkhachhang().isActive, $event) || (ctx.DetailNhomkhachhang().isActive = $event);
        return $event;
      });
      \u0275\u0275text(8);
      \u0275\u0275elementEnd();
      \u0275\u0275template(9, DetailNhomkhachhangComponent_button_9_Template, 3, 0, "button", 7)(10, DetailNhomkhachhangComponent_button_10_Template, 3, 0, "button", 7);
      \u0275\u0275elementStart(11, "button", 8);
      \u0275\u0275listener("click", function DetailNhomkhachhangComponent_Template_button_click_11_listener() {
        return ctx.toggleDelete();
      });
      \u0275\u0275elementStart(12, "mat-icon");
      \u0275\u0275text(13, "delete");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(14, "div", 9);
      \u0275\u0275template(15, DetailNhomkhachhangComponent_ng_container_15_Template, 9, 0, "ng-container", 10)(16, DetailNhomkhachhangComponent_ng_container_16_Template, 30, 8, "ng-container", 10);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_0_0;
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(((tmp_0_0 = ctx.DetailNhomkhachhang()) == null ? null : tmp_0_0.name) || "Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u");
      \u0275\u0275advance(2);
      \u0275\u0275twoWayProperty("ngModel", ctx.DetailNhomkhachhang().isActive);
      \u0275\u0275property("disabled", !ctx.isEdit());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate(ctx.DetailNhomkhachhang().isActive ? "Hi\u1EC3n Th\u1ECB" : "\u1EA8n");
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
    NgForOf,
    NgIf,
    MatSlideToggleModule,
    MatSlideToggle,
    MatMenuModule,
    MatMenu,
    MatMenuTrigger
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DetailNhomkhachhangComponent, { className: "DetailNhomkhachhangComponent", filePath: "src/app/admin/nhomkhachhang/detailnhomkhachhang/detailnhomkhachhang.component.ts", lineNumber: 35 });
})();
export {
  DetailNhomkhachhangComponent
};
//# sourceMappingURL=chunk-XUAQ5762.mjs.map
