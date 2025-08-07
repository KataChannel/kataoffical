import {
  ListNhacungcapComponent
} from "./chunk-W6DTH5OP.js";
import {
  NhacungcapService
} from "./chunk-MDKJ5PGV.js";
import "./chunk-KRR6EHK2.js";
import {
  SanphamService
} from "./chunk-H3SQLGMC.js";
import "./chunk-56QAEOBZ.js";
import "./chunk-R5HFYA7U.js";
import "./chunk-X7ROAIMK.js";
import "./chunk-FTMLWTPE.js";
import {
  MatSlideToggle,
  MatSlideToggleModule
} from "./chunk-OTAJRW5P.js";
import {
  MatDialogModule
} from "./chunk-YS6BOFHA.js";
import "./chunk-S32RIQSG.js";
import "./chunk-JFLWRVXN.js";
import {
  convertToSlug
} from "./chunk-657A73EG.js";
import "./chunk-MKCJCKWI.js";
import "./chunk-KRIHICU6.js";
import {
  MatSelectModule
} from "./chunk-VZZGNK7J.js";
import {
  MatMenu,
  MatMenuModule,
  MatMenuTrigger
} from "./chunk-3J77SWWE.js";
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
  NgModel
} from "./chunk-WEAWHMFJ.js";
import "./chunk-44ZKFD54.js";
import "./chunk-U3IXXJDR.js";
import {
  MatSnackBar
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
  NgForOf,
  NgIf
} from "./chunk-E6DSVUBK.js";
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
} from "./chunk-IHZ7YO24.js";
import "./chunk-E3MB3462.js";
import {
  __async
} from "./chunk-SXK72SKC.js";

// src/app/admin/nhacungcap/detailnhacungcap/detailnhacungcap.component.ts
function DetailNhacungcapComponent_button_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 3);
    \u0275\u0275listener("click", function DetailNhacungcapComponent_button_9_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.handleNhacungcapAction());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "save");
    \u0275\u0275elementEnd()();
  }
}
function DetailNhacungcapComponent_button_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 3);
    \u0275\u0275listener("click", function DetailNhacungcapComponent_button_10_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleEdit());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "edit");
    \u0275\u0275elementEnd()();
  }
}
function DetailNhacungcapComponent_ng_container_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 11)(2, "div", 12);
    \u0275\u0275text(3, "B\u1EA1n ch\u1EAFc ch\u1EAFn mu\u1ED1n xo\xE1 kh\xF4ng?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 13)(5, "button", 14);
    \u0275\u0275listener("click", function DetailNhacungcapComponent_ng_container_15_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.DeleteData());
    });
    \u0275\u0275text(6, "\u0110\u1ED3ng \xDD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 15);
    \u0275\u0275listener("click", function DetailNhacungcapComponent_ng_container_15_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleDelete());
    });
    \u0275\u0275text(8, "Hu\u1EF7 B\u1ECF");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementContainerEnd();
  }
}
function DetailNhacungcapComponent_ng_container_16_div_47_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 39);
    \u0275\u0275text(1, "check");
    \u0275\u0275elementEnd();
  }
}
function DetailNhacungcapComponent_ng_container_16_div_47_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 37);
    \u0275\u0275listener("click", function DetailNhacungcapComponent_ng_container_16_div_47_Template_div_click_0_listener() {
      const item_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.ChosenItem(item_r7));
    });
    \u0275\u0275template(1, DetailNhacungcapComponent_ng_container_16_div_47_span_1_Template, 2, 0, "span", 38);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r7 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.CheckItem(item_r7));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", item_r7.title, " ");
  }
}
function DetailNhacungcapComponent_ng_container_16_button_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "button", 40);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r9 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r9.title, " ");
  }
}
function DetailNhacungcapComponent_ng_container_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 16)(2, "mat-form-field", 17)(3, "mat-label");
    \u0275\u0275text(4, "T\xEAn Nh\xE0 Cung C\u1EA5p");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "input", 18);
    \u0275\u0275twoWayListener("ngModelChange", function DetailNhacungcapComponent_ng_container_16_Template_input_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailNhacungcap().name, $event) || (ctx_r1.DetailNhacungcap().name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "mat-form-field", 17)(7, "mat-label");
    \u0275\u0275text(8, "M\xE3 Nh\xE0 Cung C\u1EA5p");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "input", 19);
    \u0275\u0275twoWayListener("ngModelChange", function DetailNhacungcapComponent_ng_container_16_Template_input_ngModelChange_9_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailNhacungcap().mancc, $event) || (ctx_r1.DetailNhacungcap().mancc = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "mat-form-field", 17)(11, "mat-label");
    \u0275\u0275text(12, "\u0110\u1ECBa Ch\u1EC9");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "input", 20);
    \u0275\u0275twoWayListener("ngModelChange", function DetailNhacungcapComponent_ng_container_16_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailNhacungcap().diachi, $event) || (ctx_r1.DetailNhacungcap().diachi = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "mat-form-field", 17)(15, "mat-label");
    \u0275\u0275text(16, "Email");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "input", 21);
    \u0275\u0275twoWayListener("ngModelChange", function DetailNhacungcapComponent_ng_container_16_Template_input_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailNhacungcap().email, $event) || (ctx_r1.DetailNhacungcap().email = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "mat-form-field", 17)(19, "mat-label");
    \u0275\u0275text(20, "S\u1ED1 \u0110i\u1EC7n Tho\u1EA1i");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "input", 22);
    \u0275\u0275twoWayListener("ngModelChange", function DetailNhacungcapComponent_ng_container_16_Template_input_ngModelChange_21_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailNhacungcap().sdt, $event) || (ctx_r1.DetailNhacungcap().sdt = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "mat-form-field", 17)(23, "mat-label");
    \u0275\u0275text(24, "Ghi Ch\xFA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "textarea", 23);
    \u0275\u0275twoWayListener("ngModelChange", function DetailNhacungcapComponent_ng_container_16_Template_textarea_ngModelChange_25_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailNhacungcap().ghichu, $event) || (ctx_r1.DetailNhacungcap().ghichu = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 24)(27, "button", 25, 0);
    \u0275\u0275text(29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "mat-menu", null, 1)(32, "div", 26);
    \u0275\u0275listener("click", function DetailNhacungcapComponent_ng_container_16_Template_div_click_32_listener($event) {
      \u0275\u0275restoreView(_r5);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(33, "div", 27)(34, "input", 28);
    \u0275\u0275listener("keyup", function DetailNhacungcapComponent_ng_container_16_Template_input_keyup_34_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.doSearch($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "div", 29)(36, "span", 30);
    \u0275\u0275text(37, "search");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(38, "div", 31)(39, "div", 5)(40, "span", 32);
    \u0275\u0275listener("click", function DetailNhacungcapComponent_ng_container_16_Template_span_click_40_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.ChosenAll());
    });
    \u0275\u0275text(41);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "span", 32);
    \u0275\u0275listener("click", function DetailNhacungcapComponent_ng_container_16_Template_span_click_42_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.EmptyFiter());
    });
    \u0275\u0275text(43, "Xo\xE1");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(44, "span", 32);
    \u0275\u0275listener("click", function DetailNhacungcapComponent_ng_container_16_Template_span_click_44_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.ResetFilter());
    });
    \u0275\u0275text(45, "Reset");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(46, "div", 33);
    \u0275\u0275template(47, DetailNhacungcapComponent_ng_container_16_div_47_Template, 4, 2, "div", 34);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "div", 35)(49, "button", 15);
    \u0275\u0275listener("click", function DetailNhacungcapComponent_ng_container_16_Template_button_click_49_listener() {
      \u0275\u0275restoreView(_r5);
      const menuTrigger_r8 = \u0275\u0275reference(28);
      return \u0275\u0275resetView(menuTrigger_r8.closeMenu());
    });
    \u0275\u0275text(50, "\u0110\xF3ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "button", 14);
    \u0275\u0275listener("click", function DetailNhacungcapComponent_ng_container_16_Template_button_click_51_listener() {
      \u0275\u0275restoreView(_r5);
      const menuTrigger_r8 = \u0275\u0275reference(28);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.ApplyFilterColum(menuTrigger_r8));
    });
    \u0275\u0275text(52, "\xC1p D\u1EE5ng");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275template(53, DetailNhacungcapComponent_ng_container_16_button_53_Template, 2, 1, "button", 36);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const menu_r10 = \u0275\u0275reference(31);
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailNhacungcap().name);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailNhacungcap().mancc);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailNhacungcap().diachi);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailNhacungcap().email);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailNhacungcap().sdt);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailNhacungcap().ghichu);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx_r1.isEdit())("matMenuTriggerFor", menu_r10);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" S\u1EA3n Ph\u1EA9m (", ctx_r1.ChosenListSanpham.length || 0, ") ");
    \u0275\u0275advance(12);
    \u0275\u0275textInterpolate1("Ch\u1ECDn T\u1EA5t C\u1EA3 ", ctx_r1.FilterSanpham.length || 0, "");
    \u0275\u0275advance(6);
    \u0275\u0275property("ngForOf", ctx_r1.FilterSanpham)("ngForTrackBy", ctx_r1.trackByFn);
    \u0275\u0275advance(6);
    \u0275\u0275property("ngForOf", ctx_r1.ChosenListSanpham);
  }
}
var DetailNhacungcapComponent = class _DetailNhacungcapComponent {
  _ListnhacungcapComponent = inject(ListNhacungcapComponent);
  _NhacungcapService = inject(NhacungcapService);
  _SanphamService = inject(SanphamService);
  _route = inject(ActivatedRoute);
  _router = inject(Router);
  _snackBar = inject(MatSnackBar);
  constructor() {
    this._route.paramMap.subscribe((params) => {
      const id = params.get("id");
      this._NhacungcapService.setNhacungcapId(id);
    });
    effect(() => __async(this, null, function* () {
      const id = this._NhacungcapService.nhacungcapId();
      yield this._SanphamService.getAllSanpham();
      this.ListSanpham = this.FilterSanpham = this._SanphamService.ListSanpham();
      if (!id) {
        this._router.navigate(["/admin/nhacungcap"]);
        this._ListnhacungcapComponent.drawer.close();
      }
      if (id === "new") {
        this.DetailNhacungcap.set({ Sanpham: [], isActive: true });
        this._ListnhacungcapComponent.drawer.open();
        this.isEdit.update((value) => !value);
        this._router.navigate(["/admin/nhacungcap", "new"]);
      } else {
        yield this._NhacungcapService.getNhacungcapBy({ id, isOne: true });
        this.ChosenListSanpham = this.DetailNhacungcap()?.Sanpham || [];
        this._ListnhacungcapComponent.drawer.open();
        console.log(id);
        this._router.navigate(["/admin/nhacungcap", id]);
      }
    }));
  }
  DetailNhacungcap = this._NhacungcapService.DetailNhacungcap;
  isEdit = signal(false);
  isDelete = signal(false);
  nhacungcapId = this._NhacungcapService.nhacungcapId;
  ngOnInit() {
    return __async(this, null, function* () {
      this.ChosenListSanpham = this.DetailNhacungcap()?.Sanpham || [];
    });
  }
  handleNhacungcapAction() {
    return __async(this, null, function* () {
      if (this.nhacungcapId() === "new") {
        yield this.createNhacungcap();
      } else {
        yield this.updateNhacungcap();
      }
    });
  }
  createNhacungcap() {
    return __async(this, null, function* () {
      try {
        yield this._NhacungcapService.CreateNhacungcap(this.DetailNhacungcap());
        this.isEdit.update((value) => !value);
      } catch (error) {
        console.error("L\u1ED7i khi t\u1EA1o nhacungcap:", error);
      }
    });
  }
  updateNhacungcap() {
    return __async(this, null, function* () {
      try {
        yield this._NhacungcapService.updateNhacungcap(this.DetailNhacungcap());
        this._snackBar.open("C\u1EADp Nh\u1EADt Th\xE0nh C\xF4ng", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        this.isEdit.update((value) => !value);
      } catch (error) {
        console.error("L\u1ED7i khi c\u1EADp nh\u1EADt nhacungcap:", error);
      }
    });
  }
  DeleteData() {
    return __async(this, null, function* () {
      try {
        yield this._NhacungcapService.DeleteNhacungcap(this.DetailNhacungcap());
        this._snackBar.open("X\xF3a Th\xE0nh C\xF4ng", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        this._router.navigate(["/admin/nhacungcap"]);
      } catch (error) {
        console.error("L\u1ED7i khi x\xF3a nhacungcap:", error);
      }
    });
  }
  goBack() {
    this._router.navigate(["/admin/nhacungcap"]);
    this._ListnhacungcapComponent.drawer.close();
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
    this.DetailNhacungcap.update((v) => {
      v.slug = convertToSlug(v.title);
      return v;
    });
  }
  ListSanpham = [];
  FilterSanpham = [];
  ChosenListSanpham = [];
  doSearch(event) {
    return __async(this, null, function* () {
      const query = event.target.value.toLowerCase();
      yield this._SanphamService.getSanphamBy({ subtitle: query, title: query, pageSize: 1e3 });
      this.FilterSanpham = this._SanphamService.ListSanpham();
    });
  }
  ChosenAll() {
    this.FilterSanpham.forEach((item) => {
      const isItemChosen = this.ChosenListSanpham.some((chosenItem) => chosenItem.id === item.id);
      if (isItemChosen) {
        this.ChosenListSanpham = this.ChosenListSanpham.filter((chosenItem) => chosenItem.id !== item.id);
      } else {
        this.ChosenListSanpham = [...this.ChosenListSanpham, item];
      }
    });
  }
  EmptyFiter() {
    this.ChosenListSanpham = [];
  }
  ResetFilter() {
    return __async(this, null, function* () {
      yield this._SanphamService.getSanphamBy({ subtitle: "", title: "", pageSize: 1e3 });
      this.ChosenListSanpham = this._SanphamService.ListSanpham();
    });
  }
  ChosenItem(item) {
    const isItemInFilterList = this.ChosenListSanpham.some((v) => v.id === item.id);
    if (isItemInFilterList) {
      this.ChosenListSanpham = this.ChosenListSanpham.filter((v) => v.id !== item.id);
    } else {
      const itemToAdd = this.ListSanpham.find((v) => v.id === item.id);
      if (itemToAdd) {
        this.ChosenListSanpham = [...this.ChosenListSanpham, itemToAdd];
      }
    }
  }
  CheckItem(item) {
    return this.ChosenListSanpham.some((v) => v.id === item.id);
  }
  ApplyFilterColum(menu) {
    this.DetailNhacungcap.update((v) => {
      v.Sanpham = this.ChosenListSanpham;
      return v;
    });
    menu.closeMenu();
  }
  static \u0275fac = function DetailNhacungcapComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DetailNhacungcapComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DetailNhacungcapComponent, selectors: [["app-detailnhacungcap"]], decls: 17, vars: 8, consts: [["menuTrigger", "matMenuTrigger"], ["menu", "matMenu"], [1, "flex", "flex-row", "justify-between", "items-center", "space-x-2", "p-2"], ["mat-icon-button", "", "color", "primary", 3, "click"], [1, "font-bold"], [1, "flex", "flex-row", "space-x-2", "items-center"], [3, "ngModelChange", "ngModel", "disabled"], ["mat-icon-button", "", "color", "primary", 3, "click", 4, "ngIf"], ["mat-icon-button", "", "color", "warn", 3, "click"], [1, "relative", "flex", "flex-col", "w-full", "p-4", "overflow-auto"], [4, "ngIf"], [1, "flex", "flex-col", "space-y-4", "items-center", "justify-center"], [1, "font-bold", "text-2xl"], [1, "flex", "flex-row", "space-x-2", "items-center", "justify-center"], ["mat-flat-button", "", "color", "primary", 3, "click"], ["mat-flat-button", "", "color", "warn", 3, "click"], [1, "w-full", "grid", "lg:grid-cols-2", "gap-2", "p-2"], ["appearance", "outline"], ["matInput", "", "placeholder", "Vui l\xF2ng nh\u1EADp T\xEAn Nh\xE0 Cung C\u1EA5p", 3, "ngModelChange", "ngModel", "disabled"], ["matInput", "", "placeholder", "Vui l\xF2ng nh\u1EADp M\xE3 Nh\xE0 Cung C\u1EA5p", 3, "ngModelChange", "ngModel", "disabled"], ["matInput", "", "placeholder", "Vui l\xF2ng nh\u1EADp \u0110\u1ECBa Ch\u1EC9", 3, "ngModelChange", "ngModel", "disabled"], ["matInput", "", "placeholder", "Vui l\xF2ng nh\u1EADp Email", 3, "ngModelChange", "ngModel", "disabled"], ["matInput", "", "placeholder", "Vui l\xF2ng nh\u1EADp S\u1ED1 \u0110i\u1EC7n Tho\u1EA1i", 3, "ngModelChange", "ngModel", "disabled"], ["matInput", "", "placeholder", "Vui l\xF2ng nh\u1EADp Ghi Ch\xFA", 3, "ngModelChange", "ngModel", "disabled"], [1, "lg:col-span-2", "py-2", "w-full", "flex", "flex-wrap", "gap-2"], ["mat-flat-button", "", "color", "primary", 3, "disabled", "matMenuTriggerFor"], [1, "cursor-pointer", "flex", "flex-col", "space-y-4", "p-3", 3, "click"], [1, "relative", "w-full"], ["type", "text", "placeholder", "T\xECm Ki\u1EBFm...", 1, "block", "w-full", "pl-10", "pr-4", "py-2", "text-gray-700", "bg-white", "border", "border-gray-300", "rounded-lg", "focus:border-blue-400", "focus:ring-blue-400", "focus:outline-none", "focus:ring", "focus:ring-opacity-40", 3, "keyup"], [1, "absolute", "inset-y-0", "left-0", "flex", "items-center", "pl-3", "pointer-events-none"], [1, "material-symbols-outlined", "text-gray-500"], [1, "flex", "flex-row", "space-x-2", "items-center", "justify-between"], [1, "text-xs", "text-blue-600", "underline", 3, "click"], [1, "w-full", "flex", "flex-col", "space-y-2", "max-h-44", "overflow-auto"], ["class", "flex flex-row space-x-2 items-center p-2 rounded-lg hover:bg-slate-100", 3, "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "flex", "flex-row", "space-x-2", "items-end", "justify-end"], ["mat-flat-button", "", "disabled", "true", 4, "ngFor", "ngForOf"], [1, "flex", "flex-row", "space-x-2", "items-center", "p-2", "rounded-lg", "hover:bg-slate-100", 3, "click"], ["class", "material-symbols-outlined text-blue-600", 4, "ngIf"], [1, "material-symbols-outlined", "text-blue-600"], ["mat-flat-button", "", "disabled", "true"]], template: function DetailNhacungcapComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 2)(1, "button", 3);
      \u0275\u0275listener("click", function DetailNhacungcapComponent_Template_button_click_1_listener() {
        return ctx.goBack();
      });
      \u0275\u0275elementStart(2, "mat-icon");
      \u0275\u0275text(3, "arrow_back");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(4, "div", 4);
      \u0275\u0275text(5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "div", 5)(7, "mat-slide-toggle", 6);
      \u0275\u0275twoWayListener("ngModelChange", function DetailNhacungcapComponent_Template_mat_slide_toggle_ngModelChange_7_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.DetailNhacungcap().isActive, $event) || (ctx.DetailNhacungcap().isActive = $event);
        return $event;
      });
      \u0275\u0275text(8);
      \u0275\u0275elementEnd();
      \u0275\u0275template(9, DetailNhacungcapComponent_button_9_Template, 3, 0, "button", 7)(10, DetailNhacungcapComponent_button_10_Template, 3, 0, "button", 7);
      \u0275\u0275elementStart(11, "button", 8);
      \u0275\u0275listener("click", function DetailNhacungcapComponent_Template_button_click_11_listener() {
        return ctx.toggleDelete();
      });
      \u0275\u0275elementStart(12, "mat-icon");
      \u0275\u0275text(13, "delete");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(14, "div", 9);
      \u0275\u0275template(15, DetailNhacungcapComponent_ng_container_15_Template, 9, 0, "ng-container", 10)(16, DetailNhacungcapComponent_ng_container_16_Template, 54, 19, "ng-container", 10);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_0_0;
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(((tmp_0_0 = ctx.DetailNhacungcap()) == null ? null : tmp_0_0.name) || "Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u");
      \u0275\u0275advance(2);
      \u0275\u0275twoWayProperty("ngModel", ctx.DetailNhacungcap().isActive);
      \u0275\u0275property("disabled", !ctx.isEdit());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate(ctx.DetailNhacungcap().isActive ? "Hi\u1EC3n Th\u1ECB" : "\u1EA8n");
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
  ], encapsulation: 2, changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DetailNhacungcapComponent, { className: "DetailNhacungcapComponent", filePath: "src/app/admin/nhacungcap/detailnhacungcap/detailnhacungcap.component.ts", lineNumber: 37 });
})();
export {
  DetailNhacungcapComponent
};
//# sourceMappingURL=chunk-QFDQ6ZLB.js.map
