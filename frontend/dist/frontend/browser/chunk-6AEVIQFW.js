import {
  ListKhachhangComponent
} from "./chunk-5GQ4E3DB.js";
import {
  BanggiaService
} from "./chunk-VNCWOGLS.js";
import {
  KhachhangService
} from "./chunk-4UKCSTFJ.js";
import "./chunk-KRR6EHK2.js";
import "./chunk-56QAEOBZ.js";
import "./chunk-R5HFYA7U.js";
import "./chunk-X7ROAIMK.js";
import {
  Debounce
} from "./chunk-FTMLWTPE.js";
import {
  MatSlideToggle,
  MatSlideToggleModule
} from "./chunk-OTAJRW5P.js";
import "./chunk-UV2EYCAL.js";
import {
  MatDialogModule
} from "./chunk-YS6BOFHA.js";
import "./chunk-S32RIQSG.js";
import "./chunk-CB53OP7A.js";
import "./chunk-OZX2XR6T.js";
import "./chunk-JFLWRVXN.js";
import {
  convertToSlug
} from "./chunk-657A73EG.js";
import {
  removeVietnameseAccents
} from "./chunk-MKCJCKWI.js";
import "./chunk-KRIHICU6.js";
import {
  MatSelect,
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
import {
  MatOption
} from "./chunk-GWKJMKCD.js";
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
  ɵɵpureFunction0,
  ɵɵpureFunction2,
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
import {
  __decorate
} from "./chunk-E3MB3462.js";
import {
  __async
} from "./chunk-SXK72SKC.js";

// src/app/admin/khachhang/detailkhachhang/detailkhachhang.component.ts
var _c0 = () => ({ value: "khachsi", title: "Kh\xE1ch S\u1EC9" });
var _c1 = () => ({ value: "khachle", title: "Kh\xE1ch L\u1EBB" });
var _c2 = (a0, a1) => [a0, a1];
function DetailKhachhangComponent_button_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 1);
    \u0275\u0275listener("click", function DetailKhachhangComponent_button_9_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.handleKhachhangAction());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "save");
    \u0275\u0275elementEnd()();
  }
}
function DetailKhachhangComponent_button_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 1);
    \u0275\u0275listener("click", function DetailKhachhangComponent_button_10_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleEdit());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "edit");
    \u0275\u0275elementEnd()();
  }
}
function DetailKhachhangComponent_ng_container_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 9)(2, "div", 10);
    \u0275\u0275text(3, "B\u1EA1n ch\u1EAFc ch\u1EAFn mu\u1ED1n xo\xE1 kh\xF4ng?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 11)(5, "button", 12);
    \u0275\u0275listener("click", function DetailKhachhangComponent_ng_container_15_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.DeleteData());
    });
    \u0275\u0275text(6, "\u0110\u1ED3ng \xDD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 13);
    \u0275\u0275listener("click", function DetailKhachhangComponent_ng_container_15_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleDelete());
    });
    \u0275\u0275text(8, "Hu\u1EF7 B\u1ECF");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementContainerEnd();
  }
}
function DetailKhachhangComponent_ng_container_16_mat_option_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 28);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r6 = ctx.$implicit;
    \u0275\u0275property("value", item_r6.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r6.title, " ");
  }
}
function DetailKhachhangComponent_ng_container_16_mat_option_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 28);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r7 = ctx.$implicit;
    \u0275\u0275property("value", item_r7.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r7.title, " ");
  }
}
function DetailKhachhangComponent_ng_container_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 14)(2, "mat-form-field", 15)(3, "mat-label");
    \u0275\u0275text(4, "T\xEAn Kh\xE1ch H\xE0ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "input", 16);
    \u0275\u0275twoWayListener("ngModelChange", function DetailKhachhangComponent_ng_container_16_Template_input_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailKhachhang().name, $event) || (ctx_r1.DetailKhachhang().name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("keyup", function DetailKhachhangComponent_ng_container_16_Template_input_keyup_5_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.autoSubtitle());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "mat-form-field", 15)(7, "mat-label");
    \u0275\u0275text(8, "Vi\u1EBFt T\u1EAFt");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "input", 17);
    \u0275\u0275twoWayListener("ngModelChange", function DetailKhachhangComponent_ng_container_16_Template_input_ngModelChange_9_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailKhachhang().subtitle, $event) || (ctx_r1.DetailKhachhang().subtitle = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "mat-form-field", 15)(11, "mat-label");
    \u0275\u0275text(12, "T\xEAn File");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "input", 18);
    \u0275\u0275twoWayListener("ngModelChange", function DetailKhachhangComponent_ng_container_16_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailKhachhang().tenfile, $event) || (ctx_r1.DetailKhachhang().tenfile = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "mat-form-field", 15)(15, "mat-label");
    \u0275\u0275text(16, "Lo\u1EA1i Kh\xE1ch H\xE0ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "mat-select", 4);
    \u0275\u0275twoWayListener("ngModelChange", function DetailKhachhangComponent_ng_container_16_Template_mat_select_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailKhachhang().loaikh, $event) || (ctx_r1.DetailKhachhang().loaikh = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275template(18, DetailKhachhangComponent_ng_container_16_mat_option_18_Template, 2, 2, "mat-option", 19);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "mat-form-field", 15)(20, "mat-label");
    \u0275\u0275text(21, "Email");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "input", 20);
    \u0275\u0275twoWayListener("ngModelChange", function DetailKhachhangComponent_ng_container_16_Template_input_ngModelChange_22_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailKhachhang().email, $event) || (ctx_r1.DetailKhachhang().email = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "mat-form-field", 15)(24, "mat-label");
    \u0275\u0275text(25, "S\u1ED1 \u0110i\u1EC7n Tho\u1EA1i");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "input", 21);
    \u0275\u0275twoWayListener("ngModelChange", function DetailKhachhangComponent_ng_container_16_Template_input_ngModelChange_26_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailKhachhang().sdt, $event) || (ctx_r1.DetailKhachhang().sdt = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "mat-form-field", 15)(28, "mat-label");
    \u0275\u0275text(29, "M\xE3 S\u1ED1 Thu\u1EBF");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "input", 22);
    \u0275\u0275twoWayListener("ngModelChange", function DetailKhachhangComponent_ng_container_16_Template_input_ngModelChange_30_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailKhachhang().mst, $event) || (ctx_r1.DetailKhachhang().mst = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "mat-form-field", 15)(32, "mat-label");
    \u0275\u0275text(33, "Gi\u1EDD Nh\u1EADn H\xE0ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "input", 23);
    \u0275\u0275twoWayListener("ngModelChange", function DetailKhachhangComponent_ng_container_16_Template_input_ngModelChange_34_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailKhachhang().gionhanhang, $event) || (ctx_r1.DetailKhachhang().gionhanhang = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "mat-form-field", 15)(36, "mat-label");
    \u0275\u0275text(37, "\u0110\u1ECBa Ch\u1EC9");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "input", 24);
    \u0275\u0275twoWayListener("ngModelChange", function DetailKhachhangComponent_ng_container_16_Template_input_ngModelChange_38_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailKhachhang().diachi, $event) || (ctx_r1.DetailKhachhang().diachi = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(39, "mat-form-field", 15)(40, "mat-label");
    \u0275\u0275text(41, "Qu\u1EADn");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "input", 25);
    \u0275\u0275twoWayListener("ngModelChange", function DetailKhachhangComponent_ng_container_16_Template_input_ngModelChange_42_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailKhachhang().quan, $event) || (ctx_r1.DetailKhachhang().quan = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(43, "mat-form-field", 15)(44, "mat-label");
    \u0275\u0275text(45, "B\u1EA3ng Gi\xE1");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "mat-select", 4);
    \u0275\u0275twoWayListener("ngModelChange", function DetailKhachhangComponent_ng_container_16_Template_mat_select_ngModelChange_46_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailKhachhang().banggiaId, $event) || (ctx_r1.DetailKhachhang().banggiaId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275template(47, DetailKhachhangComponent_ng_container_16_mat_option_47_Template, 2, 2, "mat-option", 19);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(48, "mat-slide-toggle", 26);
    \u0275\u0275twoWayListener("ngModelChange", function DetailKhachhangComponent_ng_container_16_Template_mat_slide_toggle_ngModelChange_48_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailKhachhang().hiengia, $event) || (ctx_r1.DetailKhachhang().hiengia = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275text(49, "Hi\u1EC7n Gi\xE1");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "mat-slide-toggle", 26);
    \u0275\u0275twoWayListener("ngModelChange", function DetailKhachhangComponent_ng_container_16_Template_mat_slide_toggle_ngModelChange_50_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailKhachhang().istitle2, $event) || (ctx_r1.DetailKhachhang().istitle2 = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275text(51, "Hi\u1EC7n T\xEAn S\u1EA3n Ph\u1EA9m 2");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "mat-slide-toggle", 26);
    \u0275\u0275twoWayListener("ngModelChange", function DetailKhachhangComponent_ng_container_16_Template_mat_slide_toggle_ngModelChange_52_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailKhachhang().isshowvat, $event) || (ctx_r1.DetailKhachhang().isshowvat = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275text(53, "Hi\u1EC7n VAT");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "mat-form-field", 15)(55, "mat-label");
    \u0275\u0275text(56, "Ghi Ch\xFA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(57, "textarea", 27);
    \u0275\u0275twoWayListener("ngModelChange", function DetailKhachhangComponent_ng_container_16_Template_textarea_ngModelChange_57_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailKhachhang().ghichu, $event) || (ctx_r1.DetailKhachhang().ghichu = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailKhachhang().name);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailKhachhang().subtitle);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailKhachhang().tenfile);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailKhachhang().loaikh);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", \u0275\u0275pureFunction2(34, _c2, \u0275\u0275pureFunction0(32, _c0), \u0275\u0275pureFunction0(33, _c1)));
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailKhachhang().email);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailKhachhang().sdt);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailKhachhang().mst);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailKhachhang().gionhanhang);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailKhachhang().diachi);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailKhachhang().quan);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailKhachhang().banggiaId);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1._BanggiaService.ListBanggia());
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailKhachhang().hiengia);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailKhachhang().istitle2);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailKhachhang().isshowvat);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailKhachhang().ghichu);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
  }
}
var DetailKhachhangComponent = class _DetailKhachhangComponent {
  _ListkhachhangComponent = inject(ListKhachhangComponent);
  _KhachhangService = inject(KhachhangService);
  _BanggiaService = inject(BanggiaService);
  _route = inject(ActivatedRoute);
  _router = inject(Router);
  _snackBar = inject(MatSnackBar);
  DetailKhachhang = this._KhachhangService.DetailKhachhang;
  ListFilter = [];
  filterItem = [];
  isEdit = signal(false);
  isDelete = signal(false);
  khachhangId = this._KhachhangService.khachhangId;
  constructor() {
    this._route.paramMap.subscribe((params) => {
      const id = params.get("id");
      this._KhachhangService.setKhachhangId(id);
    });
    effect(() => __async(this, null, function* () {
      const id = this._KhachhangService.khachhangId();
      yield this._BanggiaService.getAllBanggia();
      this.filterItem = this._BanggiaService.ListBanggia();
      if (!id) {
        this._router.navigate(["/admin/khachhang"]);
        this._ListkhachhangComponent.drawer.close();
      }
      if (id === "new") {
        this.DetailKhachhang.set({ loaikh: "khachsi" });
        this._ListkhachhangComponent.drawer.open();
        this.isEdit.update((value) => !value);
        this._router.navigate(["/admin/khachhang", "new"]);
      } else {
        console.log("KhachhangId:", id);
        yield this._KhachhangService.getKhachhangBy({ id, isOne: true });
        this.ListFilter = this._KhachhangService.DetailKhachhang().banggia;
        this._ListkhachhangComponent.drawer.open();
        this._router.navigate(["/admin/khachhang", id]);
      }
    }));
  }
  ngOnInit() {
    return __async(this, null, function* () {
      console.log("DetailKhachhang:", this.DetailKhachhang());
    });
  }
  handleKhachhangAction() {
    return __async(this, null, function* () {
      if (this.khachhangId() === "new") {
        yield this.createKhachhang();
      } else {
        yield this.updateKhachhang();
      }
    });
  }
  autoSubtitle() {
    this.DetailKhachhang.update((v) => {
      v.subtitle = removeVietnameseAccents(v.name);
      return v;
    });
  }
  createKhachhang() {
    return __async(this, null, function* () {
      try {
        yield this._KhachhangService.CreateKhachhang(this.DetailKhachhang());
        this._snackBar.open("T\u1EA1o M\u1EDBi Th\xE0nh C\xF4ng", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        this.isEdit.update((value) => !value);
      } catch (error) {
        console.error("L\u1ED7i khi t\u1EA1o khachhang:", error);
      }
    });
  }
  updateKhachhang() {
    return __async(this, null, function* () {
      try {
        yield this._KhachhangService.updateKhachhang(this.DetailKhachhang());
        this._snackBar.open("C\u1EADp Nh\u1EADt Th\xE0nh C\xF4ng", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        this.isEdit.update((value) => !value);
      } catch (error) {
        console.error("L\u1ED7i khi c\u1EADp nh\u1EADt khachhang:", error);
      }
    });
  }
  DeleteData() {
    return __async(this, null, function* () {
      try {
        yield this._KhachhangService.DeleteKhachhang(this.DetailKhachhang());
        this._snackBar.open("X\xF3a Th\xE0nh C\xF4ng", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        this._router.navigate(["/admin/khachhang"]);
      } catch (error) {
        console.error("L\u1ED7i khi x\xF3a khachhang:", error);
      }
    });
  }
  goBack() {
    this._router.navigate(["/admin/khachhang"]);
    this._ListkhachhangComponent.drawer.close();
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
    this.DetailKhachhang.update((v) => {
      v.slug = convertToSlug(v.title);
      return v;
    });
  }
  DoOutFilter(event) {
    this.DetailKhachhang.update((v) => {
      v.banggia = event;
      return v;
    });
  }
  static \u0275fac = function DetailKhachhangComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DetailKhachhangComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DetailKhachhangComponent, selectors: [["app-detailkhachhang"]], decls: 17, vars: 8, consts: [[1, "flex", "flex-row", "justify-between", "items-center", "space-x-2", "p-2"], ["mat-icon-button", "", "color", "primary", 3, "click"], [1, "font-bold"], [1, "flex", "flex-row", "space-x-2", "items-center"], [3, "ngModelChange", "ngModel", "disabled"], ["mat-icon-button", "", "color", "primary", 3, "click", 4, "ngIf"], ["mat-icon-button", "", "color", "warn", 3, "click"], [1, "relative", "flex", "flex-col", "w-full", "p-4", "overflow-auto"], [4, "ngIf"], [1, "flex", "flex-col", "space-y-4", "items-center", "justify-center"], [1, "font-bold", "text-2xl"], [1, "flex", "flex-row", "space-x-2", "items-center", "justify-center"], ["mat-flat-button", "", "color", "primary", 3, "click"], ["mat-flat-button", "", "color", "warn", 3, "click"], [1, "w-full", "grid", "grid-cols-2", "gap-4"], ["appearance", "outline", "subscriptSizing", "dynamic"], ["matInput", "", "placeholder", "Vui l\xF2ng nh\u1EADp T\xEAn Kh\xE1ch H\xE0ng", 3, "ngModelChange", "keyup", "ngModel", "disabled"], ["matInput", "", "placeholder", "Vui l\xF2ng nh\u1EADp Vi\u1EBFt T\u1EAFt", 3, "ngModelChange", "ngModel", "disabled"], ["matInput", "", "placeholder", "Vui l\xF2ng nh\u1EADp T\xEAn File", 3, "ngModelChange", "ngModel", "disabled"], [3, "value", 4, "ngFor", "ngForOf"], ["matInput", "", "placeholder", "Vui l\xF2ng nh\u1EADp Email", 3, "ngModelChange", "ngModel", "disabled"], ["matInput", "", "placeholder", "Vui l\xF2ng nh\u1EADp S\u1ED1 \u0110i\u1EC7n Tho\u1EA1i", 3, "ngModelChange", "ngModel", "disabled"], ["matInput", "", "placeholder", "Vui l\xF2ng nh\u1EADp M\xE3 S\u1ED1 Thu\u1EBF", 3, "ngModelChange", "ngModel", "disabled"], ["matInput", "", "placeholder", "Vui l\xF2ng nh\u1EADp Gi\u1EDD Nh\u1EADn H\xE0ng", 3, "ngModelChange", "ngModel", "disabled"], ["matInput", "", "placeholder", "Vui l\xF2ng nh\u1EADp \u0110\u1ECBa Ch\u1EC9", 3, "ngModelChange", "ngModel", "disabled"], ["matInput", "", "placeholder", "Vui l\xF2ng nh\u1EADp Qu\u1EADn", 3, "ngModelChange", "ngModel", "disabled"], ["color", "primary", 3, "ngModelChange", "ngModel", "disabled"], ["matInput", "", "placeholder", "Vui l\xF2ng nh\u1EADp Ghi Ch\xFA", 3, "ngModelChange", "ngModel", "disabled"], [3, "value"]], template: function DetailKhachhangComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "button", 1);
      \u0275\u0275listener("click", function DetailKhachhangComponent_Template_button_click_1_listener() {
        return ctx.goBack();
      });
      \u0275\u0275elementStart(2, "mat-icon");
      \u0275\u0275text(3, "arrow_back");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(4, "div", 2);
      \u0275\u0275text(5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "div", 3)(7, "mat-slide-toggle", 4);
      \u0275\u0275twoWayListener("ngModelChange", function DetailKhachhangComponent_Template_mat_slide_toggle_ngModelChange_7_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.DetailKhachhang().isActive, $event) || (ctx.DetailKhachhang().isActive = $event);
        return $event;
      });
      \u0275\u0275text(8);
      \u0275\u0275elementEnd();
      \u0275\u0275template(9, DetailKhachhangComponent_button_9_Template, 3, 0, "button", 5)(10, DetailKhachhangComponent_button_10_Template, 3, 0, "button", 5);
      \u0275\u0275elementStart(11, "button", 6);
      \u0275\u0275listener("click", function DetailKhachhangComponent_Template_button_click_11_listener() {
        return ctx.toggleDelete();
      });
      \u0275\u0275elementStart(12, "mat-icon");
      \u0275\u0275text(13, "delete");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(14, "div", 7);
      \u0275\u0275template(15, DetailKhachhangComponent_ng_container_15_Template, 9, 0, "ng-container", 8)(16, DetailKhachhangComponent_ng_container_16_Template, 58, 37, "ng-container", 8);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_0_0;
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(((tmp_0_0 = ctx.DetailKhachhang()) == null ? null : tmp_0_0.name) || "Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u");
      \u0275\u0275advance(2);
      \u0275\u0275twoWayProperty("ngModel", ctx.DetailKhachhang().isActive);
      \u0275\u0275property("disabled", !ctx.isEdit());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate(ctx.DetailKhachhang().isActive ? "Hi\u1EC3n Th\u1ECB" : "\u1EA8n");
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
    MatSelect,
    MatOption,
    MatDialogModule,
    CommonModule,
    NgForOf,
    NgIf,
    MatSlideToggleModule,
    MatSlideToggle
  ], encapsulation: 2 });
};
__decorate([
  Debounce(300)
], DetailKhachhangComponent.prototype, "autoSubtitle", null);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DetailKhachhangComponent, { className: "DetailKhachhangComponent", filePath: "src/app/admin/khachhang/detailkhachhang/detailkhachhang.component.ts", lineNumber: 37 });
})();
export {
  DetailKhachhangComponent
};
//# sourceMappingURL=chunk-6AEVIQFW.js.map
