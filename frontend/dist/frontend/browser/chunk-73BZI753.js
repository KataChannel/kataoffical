import {
  ListSanphamComponent
} from "./chunk-6XEPYK2O.js";
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
import {
  removeVietnameseAccents
} from "./chunk-MKCJCKWI.js";
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
  NgModel,
  NumberValueAccessor
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

// src/app/admin/sanpham/detailsanpham/detailsanpham.component.ts
function DetailSanphamComponent_button_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 3);
    \u0275\u0275listener("click", function DetailSanphamComponent_button_9_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.handleSanphamAction());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "save");
    \u0275\u0275elementEnd()();
  }
}
function DetailSanphamComponent_button_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 3);
    \u0275\u0275listener("click", function DetailSanphamComponent_button_10_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleEdit());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "edit");
    \u0275\u0275elementEnd()();
  }
}
function DetailSanphamComponent_ng_container_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 11)(2, "div", 12);
    \u0275\u0275text(3, "B\u1EA1n ch\u1EAFc ch\u1EAFn mu\u1ED1n xo\xE1 kh\xF4ng?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 13)(5, "button", 14);
    \u0275\u0275listener("click", function DetailSanphamComponent_ng_container_15_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.DeleteData());
    });
    \u0275\u0275text(6, "\u0110\u1ED3ng \xDD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 15);
    \u0275\u0275listener("click", function DetailSanphamComponent_ng_container_15_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleDelete());
    });
    \u0275\u0275text(8, "Hu\u1EF7 B\u1ECF");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementContainerEnd();
  }
}
function DetailSanphamComponent_ng_container_16_div_72_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 45);
    \u0275\u0275text(1, "check");
    \u0275\u0275elementEnd();
  }
}
function DetailSanphamComponent_ng_container_16_div_72_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 43);
    \u0275\u0275listener("click", function DetailSanphamComponent_ng_container_16_div_72_Template_div_click_0_listener() {
      const item_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.ChosenItem(item_r7));
    });
    \u0275\u0275template(1, DetailSanphamComponent_ng_container_16_div_72_span_1_Template, 2, 0, "span", 44);
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
    \u0275\u0275textInterpolate1(" ", item_r7.name, " ");
  }
}
function DetailSanphamComponent_ng_container_16_button_78_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "button", 46);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r9 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r9.name, " ");
  }
}
function DetailSanphamComponent_ng_container_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 16)(2, "mat-form-field", 17)(3, "mat-label");
    \u0275\u0275text(4, "Ti\xEAu \u0110\u1EC1");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "input", 18);
    \u0275\u0275twoWayListener("ngModelChange", function DetailSanphamComponent_ng_container_16_Template_input_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailSanpham().title, $event) || (ctx_r1.DetailSanpham().title = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "mat-form-field", 17)(7, "mat-label");
    \u0275\u0275text(8, "Ti\xEAu \u0110\u1EC1 2");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "input", 19);
    \u0275\u0275twoWayListener("ngModelChange", function DetailSanphamComponent_ng_container_16_Template_input_ngModelChange_9_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailSanpham().title2, $event) || (ctx_r1.DetailSanpham().title2 = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "mat-form-field", 17)(11, "mat-label");
    \u0275\u0275text(12, "G\u1EE3i \xDD T\xECm Ki\u1EBFm");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "input", 20);
    \u0275\u0275twoWayListener("ngModelChange", function DetailSanphamComponent_ng_container_16_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailSanpham().subtitle, $event) || (ctx_r1.DetailSanpham().subtitle = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "mat-form-field", 17)(15, "mat-label");
    \u0275\u0275text(16, "M\xE3 S\u1EA3n Ph\u1EA9m");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "input", 21);
    \u0275\u0275twoWayListener("ngModelChange", function DetailSanphamComponent_ng_container_16_Template_input_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailSanpham().masp, $event) || (ctx_r1.DetailSanpham().masp = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "mat-form-field", 17)(19, "mat-label");
    \u0275\u0275text(20, "Gi\xE1 G\u1ED1c");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "input", 22);
    \u0275\u0275twoWayListener("ngModelChange", function DetailSanphamComponent_ng_container_16_Template_input_ngModelChange_21_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailSanpham().giagoc, $event) || (ctx_r1.DetailSanpham().giagoc = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "mat-form-field", 17)(23, "mat-label");
    \u0275\u0275text(24, "Gi\xE1 B\xE1n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "input", 23);
    \u0275\u0275twoWayListener("ngModelChange", function DetailSanphamComponent_ng_container_16_Template_input_ngModelChange_25_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailSanpham().giaban, $event) || (ctx_r1.DetailSanpham().giaban = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "mat-form-field", 17)(27, "mat-label");
    \u0275\u0275text(28, "\u0110\u01A1n V\u1ECB T\xEDnh");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "input", 24);
    \u0275\u0275twoWayListener("ngModelChange", function DetailSanphamComponent_ng_container_16_Template_input_ngModelChange_29_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailSanpham().dvt, $event) || (ctx_r1.DetailSanpham().dvt = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "mat-form-field", 17)(31, "mat-label");
    \u0275\u0275text(32, "\u0110i\u1EC3m Tr\u1ECDng T\u1EA3i");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "input", 25);
    \u0275\u0275twoWayListener("ngModelChange", function DetailSanphamComponent_ng_container_16_Template_input_ngModelChange_33_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailSanpham().loadpoint, $event) || (ctx_r1.DetailSanpham().loadpoint = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "div", 26)(35, "mat-form-field", 17)(36, "mat-label");
    \u0275\u0275text(37, "S\u1ED1 L\u01B0\u1EE3ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "input", 27);
    \u0275\u0275twoWayListener("ngModelChange", function DetailSanphamComponent_ng_container_16_Template_input_ngModelChange_38_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailSanpham().soluong, $event) || (ctx_r1.DetailSanpham().soluong = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(39, "mat-form-field", 17)(40, "mat-label");
    \u0275\u0275text(41, "S\u1ED1 L\u01B0\u1EE3ng Kho");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "input", 27);
    \u0275\u0275twoWayListener("ngModelChange", function DetailSanphamComponent_ng_container_16_Template_input_ngModelChange_42_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailSanpham().soluongkho, $event) || (ctx_r1.DetailSanpham().soluongkho = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(43, "mat-form-field", 17)(44, "mat-label");
    \u0275\u0275text(45, "Hao H\u1EE5t %");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "input", 28);
    \u0275\u0275twoWayListener("ngModelChange", function DetailSanphamComponent_ng_container_16_Template_input_ngModelChange_46_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailSanpham().haohut, $event) || (ctx_r1.DetailSanpham().haohut = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(47, "mat-form-field", 17)(48, "mat-label");
    \u0275\u0275text(49, "Vat");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "input", 29);
    \u0275\u0275twoWayListener("ngModelChange", function DetailSanphamComponent_ng_container_16_Template_input_ngModelChange_50_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailSanpham().vat, $event) || (ctx_r1.DetailSanpham().vat = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(51, "div", 30)(52, "button", 31, 0);
    \u0275\u0275text(54, " Nh\xE0 Cung C\u1EA5p ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(55, "mat-menu", null, 1)(57, "div", 32);
    \u0275\u0275listener("click", function DetailSanphamComponent_ng_container_16_Template_div_click_57_listener($event) {
      \u0275\u0275restoreView(_r5);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(58, "div", 33)(59, "input", 34);
    \u0275\u0275listener("keyup", function DetailSanphamComponent_ng_container_16_Template_input_keyup_59_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.doSearch($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(60, "div", 35)(61, "span", 36);
    \u0275\u0275text(62, "search");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(63, "div", 37)(64, "div", 5)(65, "span", 38);
    \u0275\u0275listener("click", function DetailSanphamComponent_ng_container_16_Template_span_click_65_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.ChosenAll());
    });
    \u0275\u0275text(66);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(67, "span", 38);
    \u0275\u0275listener("click", function DetailSanphamComponent_ng_container_16_Template_span_click_67_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.EmptyFiter());
    });
    \u0275\u0275text(68, "Xo\xE1");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(69, "span", 38);
    \u0275\u0275listener("click", function DetailSanphamComponent_ng_container_16_Template_span_click_69_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.ResetFilter());
    });
    \u0275\u0275text(70, "Reset");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(71, "div", 39);
    \u0275\u0275template(72, DetailSanphamComponent_ng_container_16_div_72_Template, 4, 2, "div", 40);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(73, "div", 41)(74, "button", 15);
    \u0275\u0275listener("click", function DetailSanphamComponent_ng_container_16_Template_button_click_74_listener() {
      \u0275\u0275restoreView(_r5);
      const menuTrigger_r8 = \u0275\u0275reference(53);
      return \u0275\u0275resetView(menuTrigger_r8.closeMenu());
    });
    \u0275\u0275text(75, "\u0110\xF3ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(76, "button", 14);
    \u0275\u0275listener("click", function DetailSanphamComponent_ng_container_16_Template_button_click_76_listener() {
      \u0275\u0275restoreView(_r5);
      const menuTrigger_r8 = \u0275\u0275reference(53);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.ApplyFilterColum(menuTrigger_r8));
    });
    \u0275\u0275text(77, "\xC1p D\u1EE5ng");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275template(78, DetailSanphamComponent_ng_container_16_button_78_Template, 2, 1, "button", 42);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const menu_r10 = \u0275\u0275reference(56);
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailSanpham().title);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailSanpham().title2);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailSanpham().subtitle);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailSanpham().masp);
    \u0275\u0275property("disabled", true);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailSanpham().giagoc);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailSanpham().giaban);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailSanpham().dvt);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailSanpham().loadpoint);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailSanpham().soluong);
    \u0275\u0275property("disabled", true);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailSanpham().soluongkho);
    \u0275\u0275property("disabled", true);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailSanpham().haohut);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailSanpham().vat);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx_r1.isEdit())("matMenuTriggerFor", menu_r10);
    \u0275\u0275advance(14);
    \u0275\u0275textInterpolate1("Ch\u1ECDn T\u1EA5t C\u1EA3 ", ctx_r1.FilterListNCC.length || 0, "");
    \u0275\u0275advance(6);
    \u0275\u0275property("ngForOf", ctx_r1.FilterListNCC)("ngForTrackBy", ctx_r1.trackByFn);
    \u0275\u0275advance(6);
    \u0275\u0275property("ngForOf", ctx_r1.ChosenListNCC);
  }
}
var DetailSanphamComponent = class _DetailSanphamComponent {
  _ListsanphamComponent = inject(ListSanphamComponent);
  _SanphamService = inject(SanphamService);
  _NhacungcapService = inject(NhacungcapService);
  _route = inject(ActivatedRoute);
  _router = inject(Router);
  _snackBar = inject(MatSnackBar);
  ListNCC = [];
  ChosenListNCC = [];
  FilterListNCC = [];
  DetailSanpham = this._SanphamService.DetailSanpham;
  isEdit = signal(false);
  isDelete = signal(false);
  sanphamId = this._SanphamService.sanphamId;
  constructor() {
    this._route.paramMap.subscribe((params) => {
      const id = params.get("id");
      this._SanphamService.setSanphamId(id);
    });
    effect(() => __async(this, null, function* () {
      const id = this._SanphamService.sanphamId();
      yield this._NhacungcapService.getAllNhacungcap();
      this.ListNCC = this.FilterListNCC = this._NhacungcapService.ListNhacungcap();
      if (!id) {
        this._router.navigate(["/admin/sanpham"]);
        this._ListsanphamComponent.drawer.close();
      }
      if (id === "new") {
        this.DetailSanpham.set({});
        this._ListsanphamComponent.drawer.open();
        this.isEdit.update((value) => !value);
        this._router.navigate(["/admin/sanpham", "new"]);
        this.ChosenListNCC = this.DetailSanpham().Nhacungcap || [];
      } else {
        yield this._SanphamService.getSanphamByid(id);
        this._ListsanphamComponent.drawer.open();
        this._router.navigate(["/admin/sanpham", id]);
        this.ChosenListNCC = this.DetailSanpham().Nhacungcap || [];
        this.DetailSanpham.update((v) => {
          v.soluong = Number(parseFloat(v.soluong).toFixed(2));
          return v;
        });
      }
    }));
  }
  ngOnInit() {
    return __async(this, null, function* () {
    });
  }
  handleSanphamAction() {
    return __async(this, null, function* () {
      if (this.sanphamId() === "new") {
        yield this.createSanpham();
      } else {
        yield this.updateSanpham();
      }
    });
  }
  createSanpham() {
    return __async(this, null, function* () {
      try {
        yield this._SanphamService.CreateSanpham(this.DetailSanpham());
        this._snackBar.open("T\u1EA1o M\u1EDBi Th\xE0nh C\xF4ng", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        this.isEdit.update((value) => !value);
      } catch (error) {
        console.error("L\u1ED7i khi t\u1EA1o sanpham:", error);
      }
    });
  }
  updateSanpham() {
    return __async(this, null, function* () {
      try {
        yield this._SanphamService.updateSanpham(this.DetailSanpham());
        this._snackBar.open("C\u1EADp Nh\u1EADt Th\xE0nh C\xF4ng", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        this.isEdit.update((value) => !value);
      } catch (error) {
        console.error("L\u1ED7i khi c\u1EADp nh\u1EADt sanpham:", error);
      }
    });
  }
  DeleteData() {
    return __async(this, null, function* () {
      try {
        yield this._SanphamService.DeleteSanpham(this.DetailSanpham());
        this._snackBar.open("X\xF3a Th\xE0nh C\xF4ng", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        this._router.navigate(["/admin/sanpham"]);
      } catch (error) {
        console.error("L\u1ED7i khi x\xF3a sanpham:", error);
      }
    });
  }
  goBack() {
    this._router.navigate(["/admin/sanpham"]);
    this._ListsanphamComponent.drawer.close();
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
    this.DetailSanpham.update((v) => {
      v.slug = convertToSlug(v.title);
      return v;
    });
  }
  doSearch(event) {
    this.FilterListNCC = this.ListNCC.filter((v) => removeVietnameseAccents(v.name).includes(event.target.value.toLowerCase()) || v.name.toLowerCase().includes(event.target.value.toLowerCase()));
  }
  ChosenAll() {
    this.FilterListNCC.forEach((item) => {
      const isItemChosen = this.ChosenListNCC.some((chosenItem) => chosenItem.id === item.id);
      if (isItemChosen) {
        this.ChosenListNCC = this.ChosenListNCC.filter((chosenItem) => chosenItem.id !== item.id);
      } else {
        this.ChosenListNCC = [...this.ChosenListNCC, item];
      }
    });
  }
  EmptyFiter() {
    this.ChosenListNCC = [];
  }
  ResetFilter() {
    this.ChosenListNCC = this.ListNCC;
  }
  ChosenItem(item) {
    const isItemInFilterList = this.ChosenListNCC.some((v) => v.id === item.id);
    if (isItemInFilterList) {
      this.ChosenListNCC = this.ChosenListNCC.filter((v) => v.id !== item.id);
    } else {
      const itemToAdd = this.ListNCC.find((v) => v.id === item.id);
      if (itemToAdd) {
        this.ChosenListNCC = [...this.ChosenListNCC, itemToAdd];
      }
    }
  }
  CheckItem(item) {
    return this.ChosenListNCC.some((v) => v.id === item.id);
  }
  ApplyFilterColum(menu) {
    this.DetailSanpham.update((v) => {
      v.Nhacungcap = this.ChosenListNCC;
      return v;
    });
    menu.closeMenu();
  }
  static \u0275fac = function DetailSanphamComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DetailSanphamComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DetailSanphamComponent, selectors: [["app-detailsanpham"]], decls: 17, vars: 8, consts: [["menuTrigger", "matMenuTrigger"], ["menu", "matMenu"], [1, "flex", "flex-row", "justify-between", "items-center", "space-x-2", "p-2"], ["mat-icon-button", "", "color", "primary", 3, "click"], [1, "font-bold"], [1, "flex", "flex-row", "space-x-2", "items-center"], [3, "ngModelChange", "ngModel", "disabled"], ["mat-icon-button", "", "color", "primary", 3, "click", 4, "ngIf"], ["mat-icon-button", "", "color", "warn", 3, "click"], [1, "relative", "flex", "flex-col", "w-full", "p-4", "overflow-auto"], [4, "ngIf"], [1, "flex", "flex-col", "space-y-4", "items-center", "justify-center"], [1, "font-bold", "text-2xl"], [1, "flex", "flex-row", "space-x-2", "items-center", "justify-center"], ["mat-flat-button", "", "color", "primary", 3, "click"], ["mat-flat-button", "", "color", "warn", 3, "click"], [1, "w-full", "grid", "grid-cols-2", "gap-2", "p-2"], ["appearance", "outline"], ["matInput", "", "placeholder", "Vui l\xF2ng nh\u1EADp Ti\xEAu \u0110\u1EC1", 3, "ngModelChange", "ngModel", "disabled"], ["matInput", "", "placeholder", "Vui l\xF2ng nh\u1EADp Ti\xEAu \u0110\u1EC1 2", 3, "ngModelChange", "ngModel", "disabled"], ["matInput", "", "placeholder", "Vui l\xF2ng nh\u1EADp G\u1EE3i \xDD T\xECm Ki\u1EBFm", 3, "ngModelChange", "ngModel", "disabled"], ["matInput", "", "placeholder", "Vui l\xF2ng nh\u1EADp M\xE3 S\u1EA3n Ph\u1EA9m", 3, "ngModelChange", "ngModel", "disabled"], ["matInput", "", "type", "number", "placeholder", "Vui l\xF2ng nh\u1EADp Gi\xE1 G\u1ED1c", 3, "ngModelChange", "ngModel", "disabled"], ["matInput", "", "type", "number", "placeholder", "Vui l\xF2ng nh\u1EADp Gi\xE1 B\xE1n", 3, "ngModelChange", "ngModel", "disabled"], ["matInput", "", "placeholder", "Vui l\xF2ng nh\u1EADp \u0110\u01A1n V\u1ECB T\xEDnh", 3, "ngModelChange", "ngModel", "disabled"], ["matInput", "", "type", "number", "placeholder", "Vui l\xF2ng nh\u1EADp \u0110i\u1EC3m Tr\u1ECDng T\u1EA3i", 3, "ngModelChange", "ngModel", "disabled"], [1, "col-span-2", "flex", "flex-row", "space-x-2"], ["matInput", "", "type", "number", "placeholder", "Vui l\xF2ng nh\u1EADp M\xE3 S\u1EA3n Ph\u1EA9m", 3, "ngModelChange", "ngModel", "disabled"], ["matInput", "", "type", "number", "placeholder", "Vui l\xF2ng nh\u1EADp haohut", 3, "ngModelChange", "ngModel", "disabled"], ["matInput", "", "type", "number", "placeholder", "Vui l\xF2ng nh\u1EADp vat", 3, "ngModelChange", "ngModel", "disabled"], [1, "col-span-2", "w-full", "flex", "flex-wrap", "gap-2"], ["mat-flat-button", "", "color", "primary", 3, "disabled", "matMenuTriggerFor"], [1, "cursor-pointer", "flex", "flex-col", "space-y-4", "p-3", 3, "click"], [1, "relative", "w-full"], ["type", "text", "placeholder", "T\xECm Ki\u1EBFm...", 1, "block", "w-full", "pl-10", "pr-4", "py-2", "text-gray-700", "bg-white", "border", "border-gray-300", "rounded-lg", "focus:border-blue-400", "focus:ring-blue-400", "focus:outline-none", "focus:ring", "focus:ring-opacity-40", 3, "keyup"], [1, "absolute", "inset-y-0", "left-0", "flex", "items-center", "pl-3", "pointer-events-none"], [1, "material-symbols-outlined", "text-gray-500"], [1, "flex", "flex-row", "space-x-2", "items-center", "justify-between"], [1, "text-xs", "text-blue-600", "underline", 3, "click"], [1, "w-full", "flex", "flex-col", "space-y-2", "max-h-44", "overflow-auto"], ["class", "flex flex-row space-x-2 items-center p-2 rounded-lg hover:bg-slate-100", 3, "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "flex", "flex-row", "space-x-2", "items-end", "justify-end"], ["mat-flat-button", "", "disabled", "true", 4, "ngFor", "ngForOf"], [1, "flex", "flex-row", "space-x-2", "items-center", "p-2", "rounded-lg", "hover:bg-slate-100", 3, "click"], ["class", "material-symbols-outlined text-blue-600", 4, "ngIf"], [1, "material-symbols-outlined", "text-blue-600"], ["mat-flat-button", "", "disabled", "true"]], template: function DetailSanphamComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 2)(1, "button", 3);
      \u0275\u0275listener("click", function DetailSanphamComponent_Template_button_click_1_listener() {
        return ctx.goBack();
      });
      \u0275\u0275elementStart(2, "mat-icon");
      \u0275\u0275text(3, "arrow_back");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(4, "div", 4);
      \u0275\u0275text(5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "div", 5)(7, "mat-slide-toggle", 6);
      \u0275\u0275twoWayListener("ngModelChange", function DetailSanphamComponent_Template_mat_slide_toggle_ngModelChange_7_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.DetailSanpham().isActive, $event) || (ctx.DetailSanpham().isActive = $event);
        return $event;
      });
      \u0275\u0275text(8);
      \u0275\u0275elementEnd();
      \u0275\u0275template(9, DetailSanphamComponent_button_9_Template, 3, 0, "button", 7)(10, DetailSanphamComponent_button_10_Template, 3, 0, "button", 7);
      \u0275\u0275elementStart(11, "button", 8);
      \u0275\u0275listener("click", function DetailSanphamComponent_Template_button_click_11_listener() {
        return ctx.toggleDelete();
      });
      \u0275\u0275elementStart(12, "mat-icon");
      \u0275\u0275text(13, "delete");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(14, "div", 9);
      \u0275\u0275template(15, DetailSanphamComponent_ng_container_15_Template, 9, 0, "ng-container", 10)(16, DetailSanphamComponent_ng_container_16_Template, 79, 30, "ng-container", 10);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_0_0;
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(((tmp_0_0 = ctx.DetailSanpham()) == null ? null : tmp_0_0.title) || "Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u");
      \u0275\u0275advance(2);
      \u0275\u0275twoWayProperty("ngModel", ctx.DetailSanpham().isActive);
      \u0275\u0275property("disabled", !ctx.isEdit());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate(ctx.DetailSanpham().isActive ? "Hi\u1EC3n Th\u1ECB" : "\u1EA8n");
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
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DetailSanphamComponent, { className: "DetailSanphamComponent", filePath: "src/app/admin/sanpham/detailsanpham/detailsanpham.component.ts", lineNumber: 36 });
})();
export {
  DetailSanphamComponent
};
//# sourceMappingURL=chunk-73BZI753.js.map
