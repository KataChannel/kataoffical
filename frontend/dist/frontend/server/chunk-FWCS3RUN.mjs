import './polyfills.server.mjs';
import {
  ListPhieukhoComponent
} from "./chunk-K4JQQCLR.mjs";
import {
  PhieukhoService
} from "./chunk-HIZ2UIRP.mjs";
import {
  KhoService
} from "./chunk-GHPWMJNO.mjs";
import {
  DathangService
} from "./chunk-VX6D2TRX.mjs";
import {
  SanphamService
} from "./chunk-ESYIALWJ.mjs";
import "./chunk-BMDXMCXP.mjs";
import "./chunk-CXFG5YDN.mjs";
import {
  MatSlideToggle,
  MatSlideToggleModule
} from "./chunk-J322K7NT.mjs";
import "./chunk-C4Q5BIA5.mjs";
import "./chunk-TGADPWSB.mjs";
import "./chunk-DWV2CVG4.mjs";
import {
  MatDialogModule
} from "./chunk-7O7BZAOJ.mjs";
import {
  removeVietnameseAccents
} from "./chunk-RGTCKLO2.mjs";
import "./chunk-GOLLTURE.mjs";
import {
  MatSelect,
  MatSelectModule
} from "./chunk-Z7QVUZWX.mjs";
import {
  GenId,
  convertToSlug
} from "./chunk-I23Q342N.mjs";
import {
  DonhangService
} from "./chunk-HQOWTRL4.mjs";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "./chunk-RUJ72W7P.mjs";
import "./chunk-TEMMKMG5.mjs";
import "./chunk-YOUETZOR.mjs";
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
  MatSuffix,
  NgControlStatus,
  NgModel,
  NumberValueAccessor
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
import {
  MatOption
} from "./chunk-7GJ6SLXG.mjs";
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
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction4,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-4EQURZBD.mjs";
import "./chunk-QS2IQGEQ.mjs";
import {
  __async
} from "./chunk-FMEBT56H.mjs";

// src/app/admin/phieukho/detailphieukho/detailphieukho.component.ts
var _c0 = () => ({ title: "Phi\u1EBFu Nh\u1EADp", value: "nhap" });
var _c1 = () => ({ title: "Phi\u1EBFu Xu\u1EA5t", value: "xuat" });
var _c2 = () => ({ title: "Chuy\u1EC3n Kho", value: "chuyenkho" });
var _c3 = () => ({ title: "\u0110i\u1EC1u Ch\u1EC9nh", value: "dieuchinh" });
var _c4 = (a0, a1, a2, a3) => [a0, a1, a2, a3];
var _c5 = () => ({ standalone: true });
var _forTrack0 = ($index, $item) => $item.id;
function DetailPhieukhoComponent_button_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 2);
    \u0275\u0275listener("click", function DetailPhieukhoComponent_button_9_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.handlePhieukhoAction());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "save");
    \u0275\u0275elementEnd()();
  }
}
function DetailPhieukhoComponent_button_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 2);
    \u0275\u0275listener("click", function DetailPhieukhoComponent_button_10_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleEdit());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "edit");
    \u0275\u0275elementEnd()();
  }
}
function DetailPhieukhoComponent_ng_container_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 10)(2, "div", 11);
    \u0275\u0275text(3, "B\u1EA1n ch\u1EAFc ch\u1EAFn mu\u1ED1n xo\xE1 kh\xF4ng?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 12)(5, "button", 13);
    \u0275\u0275listener("click", function DetailPhieukhoComponent_ng_container_15_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.DeleteData());
    });
    \u0275\u0275text(6, "\u0110\u1ED3ng \xDD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 14);
    \u0275\u0275listener("click", function DetailPhieukhoComponent_ng_container_15_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleDelete());
    });
    \u0275\u0275text(8, "Hu\u1EF7 B\u1ECF");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementContainerEnd();
  }
}
function DetailPhieukhoComponent_ng_container_16_mat_option_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 27);
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
function DetailPhieukhoComponent_ng_container_16_mat_option_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 27);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r7 = ctx.$implicit;
    \u0275\u0275property("value", item_r7.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" (", item_r7.makho, ")", item_r7.name, " ");
  }
}
function DetailPhieukhoComponent_ng_container_16_mat_form_field_18_mat_option_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 27);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r9 = ctx.$implicit;
    \u0275\u0275property("value", item_r9.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r9.madonhang, " ");
  }
}
function DetailPhieukhoComponent_ng_container_16_mat_form_field_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-form-field", 17)(1, "mat-label");
    \u0275\u0275text(2, "\u0110\u01A1n B\xE1n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "mat-select", 28);
    \u0275\u0275listener("selectionChange", function DetailPhieukhoComponent_ng_container_16_mat_form_field_18_Template_mat_select_selectionChange_3_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.ChosenDonhang($event, "xuat"));
    });
    \u0275\u0275template(4, DetailPhieukhoComponent_ng_container_16_mat_form_field_18_mat_option_4_Template, 2, 2, "mat-option", 20);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1._DonhangService.ListDonhang());
  }
}
function DetailPhieukhoComponent_ng_container_16_mat_form_field_19_mat_option_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 27);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r11 = ctx.$implicit;
    \u0275\u0275property("value", item_r11.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r11.madncc, " ");
  }
}
function DetailPhieukhoComponent_ng_container_16_mat_form_field_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-form-field", 17)(1, "mat-label");
    \u0275\u0275text(2, "\u0110\u01A1n Mua");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "mat-select", 28);
    \u0275\u0275listener("selectionChange", function DetailPhieukhoComponent_ng_container_16_mat_form_field_19_Template_mat_select_selectionChange_3_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.ChosenDonhang($event, "nhap"));
    });
    \u0275\u0275template(4, DetailPhieukhoComponent_ng_container_16_mat_form_field_19_mat_option_4_Template, 2, 2, "mat-option", 20);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1._DathangService.ListDathang());
  }
}
function DetailPhieukhoComponent_ng_container_16_For_29_For_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 27);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r14 = ctx.$implicit;
    \u0275\u0275property("value", item_r14.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", item_r14.title, " (", item_r14.dvt, ")");
  }
}
function DetailPhieukhoComponent_ng_container_16_For_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 25)(1, "mat-form-field", 17)(2, "mat-label");
    \u0275\u0275text(3, "S\u1EA3n Ph\u1EA9m");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "mat-select", 29);
    \u0275\u0275twoWayListener("ngModelChange", function DetailPhieukhoComponent_ng_container_16_For_29_Template_mat_select_ngModelChange_4_listener($event) {
      const \u0275$index_136_r13 = \u0275\u0275restoreView(_r12).$index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailPhieukho().sanpham[\u0275$index_136_r13].sanphamId, $event) || (ctx_r1.DetailPhieukho().sanpham[\u0275$index_136_r13].sanphamId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(5, "div", 30)(6, "div", 4)(7, "mat-form-field", 31)(8, "input", 32);
    \u0275\u0275listener("input", function DetailPhieukhoComponent_ng_container_16_For_29_Template_input_input_8_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.DoFindSanpham($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "button", 33)(10, "mat-icon");
    \u0275\u0275text(11, "add_circle");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "div", 34);
    \u0275\u0275repeaterCreate(13, DetailPhieukhoComponent_ng_container_16_For_29_For_14_Template, 2, 3, "mat-option", 27, _forTrack0);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(15, "mat-form-field", 35)(16, "mat-label");
    \u0275\u0275text(17, "S\u1ED1 L\u01B0\u1EE3ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "input", 36);
    \u0275\u0275twoWayListener("ngModelChange", function DetailPhieukhoComponent_ng_container_16_For_29_Template_input_ngModelChange_18_listener($event) {
      const \u0275$index_136_r13 = \u0275\u0275restoreView(_r12).$index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailPhieukho().sanpham[\u0275$index_136_r13].soluong, $event) || (ctx_r1.DetailPhieukho().sanpham[\u0275$index_136_r13].soluong = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function DetailPhieukhoComponent_ng_container_16_For_29_Template_input_change_18_listener($event) {
      const item_r15 = \u0275\u0275restoreView(_r12).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onChangeSoluong(item_r15, $event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "mat-form-field", 17)(20, "mat-label");
    \u0275\u0275text(21, "Ghi Ch\xFA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "input", 37);
    \u0275\u0275twoWayListener("ngModelChange", function DetailPhieukhoComponent_ng_container_16_For_29_Template_input_ngModelChange_22_listener($event) {
      const \u0275$index_136_r13 = \u0275\u0275restoreView(_r12).$index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailPhieukho().sanpham[\u0275$index_136_r13].ghichu, $event) || (ctx_r1.DetailPhieukho().sanpham[\u0275$index_136_r13].ghichu = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const \u0275$index_136_r13 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", !ctx_r1.isEdit)("disabled", !ctx_r1.isEdit());
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailPhieukho().sanpham[\u0275$index_136_r13].sanphamId);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(10, _c5));
    \u0275\u0275advance(9);
    \u0275\u0275repeater(ctx_r1.filterSP);
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailPhieukho().sanpham[\u0275$index_136_r13].soluong);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(11, _c5));
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailPhieukho().sanpham[\u0275$index_136_r13].ghichu);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(12, _c5));
  }
}
function DetailPhieukhoComponent_ng_container_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0)(1);
    \u0275\u0275elementStart(2, "div", 15)(3, "div", 16)(4, "mat-form-field", 17)(5, "mat-label");
    \u0275\u0275text(6, "Ti\xEAu \u0110\u1EC1");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "input", 18);
    \u0275\u0275twoWayListener("ngModelChange", function DetailPhieukhoComponent_ng_container_16_Template_input_ngModelChange_7_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailPhieukho().title, $event) || (ctx_r1.DetailPhieukho().title = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "mat-form-field", 17)(9, "mat-label");
    \u0275\u0275text(10, "Lo\u1EA1i Phi\u1EBFu");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "mat-select", 19);
    \u0275\u0275twoWayListener("ngModelChange", function DetailPhieukhoComponent_ng_container_16_Template_mat_select_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailPhieukho().type, $event) || (ctx_r1.DetailPhieukho().type = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("selectionChange", function DetailPhieukhoComponent_ng_container_16_Template_mat_select_selectionChange_11_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.ChangeType($event));
    });
    \u0275\u0275template(12, DetailPhieukhoComponent_ng_container_16_mat_option_12_Template, 2, 2, "mat-option", 20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "mat-form-field", 17)(14, "mat-label");
    \u0275\u0275text(15, "Kho");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "mat-select", 5);
    \u0275\u0275twoWayListener("ngModelChange", function DetailPhieukhoComponent_ng_container_16_Template_mat_select_ngModelChange_16_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailPhieukho().khoId, $event) || (ctx_r1.DetailPhieukho().khoId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275template(17, DetailPhieukhoComponent_ng_container_16_mat_option_17_Template, 2, 3, "mat-option", 20);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(18, DetailPhieukhoComponent_ng_container_16_mat_form_field_18_Template, 5, 2, "mat-form-field", 21)(19, DetailPhieukhoComponent_ng_container_16_mat_form_field_19_Template, 5, 2, "mat-form-field", 21);
    \u0275\u0275elementStart(20, "mat-form-field", 17)(21, "mat-label");
    \u0275\u0275text(22, "Ng\xE0y");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "input", 22);
    \u0275\u0275twoWayListener("ngModelChange", function DetailPhieukhoComponent_ng_container_16_Template_input_ngModelChange_23_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailPhieukho().ngay, $event) || (ctx_r1.DetailPhieukho().ngay = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275element(24, "mat-datepicker-toggle", 23)(25, "mat-datepicker", null, 0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div", 24);
    \u0275\u0275repeaterCreate(28, DetailPhieukhoComponent_ng_container_16_For_29_Template, 23, 13, "div", 25, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "div")(31, "button", 26);
    \u0275\u0275listener("click", function DetailPhieukhoComponent_ng_container_16_Template_button_click_31_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.AddSanpham());
    });
    \u0275\u0275elementStart(32, "span");
    \u0275\u0275text(33, "Th\xEAm");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "mat-icon");
    \u0275\u0275text(35, "add");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementContainerEnd()();
  }
  if (rf & 2) {
    const picker_r16 = \u0275\u0275reference(26);
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailPhieukho().title);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailPhieukho().type);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", \u0275\u0275pureFunction4(19, _c4, \u0275\u0275pureFunction0(15, _c0), \u0275\u0275pureFunction0(16, _c1), \u0275\u0275pureFunction0(17, _c2), \u0275\u0275pureFunction0(18, _c3)));
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailPhieukho().khoId);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1._KhoService.ListKho());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.DetailPhieukho().type == "xuat");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.DetailPhieukho().type == "nhap");
    \u0275\u0275advance(4);
    \u0275\u0275property("matDatepicker", picker_r16);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailPhieukho().ngay);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
    \u0275\u0275advance();
    \u0275\u0275property("for", picker_r16);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r1.DetailPhieukho().sanpham);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
  }
}
var DetailPhieukhoComponent = class _DetailPhieukhoComponent {
  _ListphieukhoComponent = inject(ListPhieukhoComponent);
  _PhieukhoService = inject(PhieukhoService);
  _KhoService = inject(KhoService);
  _DonhangService = inject(DonhangService);
  _DathangService = inject(DathangService);
  _SanphamService = inject(SanphamService);
  _route = inject(ActivatedRoute);
  _router = inject(Router);
  _snackBar = inject(MatSnackBar);
  filterSP = [];
  LoaiPhieu = [
    { title: "Phi\u1EBFu Nh\u1EADp", value: "nhap" },
    { title: "Phi\u1EBFu Xu\u1EA5t", value: "xuat" },
    { title: "Chuy\u1EC3n Kho", value: "chuyenkho" },
    { title: "\u0110i\u1EC1u Ch\u1EC9nh", value: "dieuchinh" }
  ];
  constructor() {
    this._route.paramMap.subscribe((params) => __async(this, null, function* () {
      const id = params.get("id");
      this._PhieukhoService.setPhieukhoId(id);
      yield this._DonhangService.getAllDonhang();
      yield this._DathangService.getAllDathang();
      yield this._SanphamService.getAllSanpham();
      yield this._KhoService.getAllKho();
      this.filterSP = this._SanphamService.ListSanpham();
    }));
    effect(() => __async(this, null, function* () {
      const id = this._PhieukhoService.phieukhoId();
      if (!id) {
        this._router.navigate(["/admin/phieukho"]);
        this._ListphieukhoComponent.drawer.close();
      }
      if (id === "0") {
        this.DetailPhieukho.set({ sanpham: [], ngay: /* @__PURE__ */ new Date() });
        this._ListphieukhoComponent.drawer.open();
        this.isEdit.update((value) => !value);
        this._router.navigate(["/admin/phieukho", "0"]);
      } else {
        yield this._PhieukhoService.getPhieukhoByid(id);
        this._ListphieukhoComponent.drawer.open();
        this._router.navigate(["/admin/phieukho", id]);
      }
    }));
  }
  ChangeType(event) {
  }
  ChosenDonhang(event, type) {
    console.log(event.value);
    if (type == "xuat") {
      this.DetailPhieukho.update((v) => {
        v.sanpham = this._DonhangService.ListDonhang().find((x) => x.id == event.value).sanpham.map((x) => {
          return {
            sanphamId: x.idSP,
            sldat: x.sldat || 0,
            soluong: x.sldat || 0,
            ghichu: x.ghichu
          };
        });
        return v;
      });
    } else {
      this.DetailPhieukho.update((v) => {
        v.sanpham = this._DathangService.ListDathang().find((x) => x.id == event.value).sanpham.map((x) => {
          return {
            sanphamId: x.idSP,
            sldat: x.sldat || 0,
            soluong: x.sldat || 0,
            ghichu: x.ghichu
          };
        });
        return v;
      });
    }
    console.log(this.DetailPhieukho());
  }
  DetailPhieukho = this._PhieukhoService.DetailPhieukho;
  isEdit = signal(false);
  isDelete = signal(false);
  phieukhoId = this._PhieukhoService.phieukhoId;
  ngOnInit() {
    return __async(this, null, function* () {
    });
  }
  handlePhieukhoAction() {
    return __async(this, null, function* () {
      if (this.phieukhoId() === "0") {
        yield this.createPhieukho();
      } else {
        yield this.updatePhieukho();
      }
    });
  }
  createPhieukho() {
    return __async(this, null, function* () {
      try {
        yield this._PhieukhoService.CreatePhieukho(this.DetailPhieukho());
        this._snackBar.open("T\u1EA1o M\u1EDBi Th\xE0nh C\xF4ng", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        this.isEdit.update((value) => !value);
      } catch (error) {
        console.error("L\u1ED7i khi t\u1EA1o phieukho:", error);
      }
      console.log(this.DetailPhieukho());
    });
  }
  updatePhieukho() {
    return __async(this, null, function* () {
      try {
        yield this._PhieukhoService.updatePhieukho(this.DetailPhieukho());
        this._snackBar.open("C\u1EADp Nh\u1EADt Th\xE0nh C\xF4ng", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        this.isEdit.update((value) => !value);
      } catch (error) {
        console.error("L\u1ED7i khi c\u1EADp nh\u1EADt phieukho:", error);
      }
      console.log(this.DetailPhieukho());
    });
  }
  DeleteData() {
    return __async(this, null, function* () {
      try {
        yield this._PhieukhoService.DeletePhieukho(this.DetailPhieukho());
        this._snackBar.open("X\xF3a Th\xE0nh C\xF4ng", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        this._router.navigate(["/admin/phieukho"]);
      } catch (error) {
        console.error("L\u1ED7i khi x\xF3a phieukho:", error);
      }
    });
  }
  goBack() {
    this._router.navigate(["/admin/phieukho"]);
    this._ListphieukhoComponent.drawer.close();
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
    this.DetailPhieukho.update((v) => {
      v.slug = convertToSlug(v.title);
      return v;
    });
  }
  DoFindSanpham(event) {
    const query = event.target.value.toLowerCase();
    this.filterSP = this._SanphamService.ListSanpham().filter((v) => removeVietnameseAccents(v.title).includes(query) || v.title.toLowerCase().includes(query));
  }
  onChangeSoluong(item, event) {
  }
  AddSanpham() {
    this.DetailPhieukho.update((v) => {
      v.sanpham.push({ id: GenId(8, false), idSP: "", sldat: 0, soluong: 0, ghichu: "" });
      return v;
    });
    console.log(this.DetailPhieukho());
  }
  static \u0275fac = function DetailPhieukhoComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DetailPhieukhoComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DetailPhieukhoComponent, selectors: [["app-detailphieukho"]], decls: 17, vars: 8, consts: [["picker", ""], [1, "flex", "flex-row", "justify-between", "items-center", "space-x-2", "p-2"], ["mat-icon-button", "", "color", "primary", 3, "click"], [1, "font-bold"], [1, "flex", "flex-row", "space-x-2", "items-center"], [3, "ngModelChange", "ngModel", "disabled"], ["mat-icon-button", "", "color", "primary", 3, "click", 4, "ngIf"], ["mat-icon-button", "", "color", "warn", 3, "click"], [1, "relative", "flex", "flex-col", "w-full", "p-4", "overflow-auto"], [4, "ngIf"], [1, "flex", "flex-col", "space-y-4", "items-center", "justify-center"], [1, "font-bold", "text-2xl"], [1, "flex", "flex-row", "space-x-2", "items-center", "justify-center"], ["mat-flat-button", "", "color", "primary", 3, "click"], ["mat-flat-button", "", "color", "warn", 3, "click"], [1, "w-full", "flex", "flex-col", "space-y-4"], [1, "w-full", "flex", "flex-row", "space-x-2"], ["appearance", "outline", "subscriptSizing", "dynamic", 1, "w-full"], ["matInput", "", "placeholder", "Vui l\xF2ng nh\u1EADp Ti\xEAu \u0110\u1EC1", 3, "ngModelChange", "ngModel", "disabled"], [3, "ngModelChange", "selectionChange", "ngModel", "disabled"], [3, "value", 4, "ngFor", "ngForOf"], ["class", "w-full", "appearance", "outline", "subscriptSizing", "dynamic", 4, "ngIf"], ["matInput", "", "placeholder", "Ch\u1ECDn ng\xE0y", 3, "ngModelChange", "matDatepicker", "ngModel", "disabled"], ["matSuffix", "", 3, "for"], [1, "w-full", "flex", "flex-col", "space-y-2", "items-center"], [1, "w-full", "flex", "flex-row", "space-x-2", "items-center"], ["mat-flat-button", "", "color", "primary", 3, "click", "disabled"], [3, "value"], [3, "selectionChange", "disabled"], [3, "ngModelChange", "disabled", "ngModel", "ngModelOptions"], [1, "w-full", "flex", "flex-col", "px-4"], ["appearance", "outline", "subscriptSizing", "dynamic", 1, "w-full", "p-2"], ["matInput", "", "placeholder", "T\xECm Ki\u1EBFm", 3, "input"], ["mat-icon-button", "", "color", "primary"], [1, "overflow-y-auto", "max-h-44"], ["appearance", "outline", "subscriptSizing", "dynamic", 1, "w-80"], ["matInput", "", "type", "number", "placeholder", "Vui l\xF2ng Nh\u1EADp S\u1ED1 L\u01B0\u1EE3ng", 3, "ngModelChange", "change", "disabled", "ngModel", "ngModelOptions"], ["matInput", "", "placeholder", "Vui l\xF2ng Nh\u1EADp Ghi Ch\xFA", 3, "ngModelChange", "disabled", "ngModel", "ngModelOptions"]], template: function DetailPhieukhoComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 1)(1, "button", 2);
      \u0275\u0275listener("click", function DetailPhieukhoComponent_Template_button_click_1_listener() {
        return ctx.goBack();
      });
      \u0275\u0275elementStart(2, "mat-icon");
      \u0275\u0275text(3, "arrow_back");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(4, "div", 3);
      \u0275\u0275text(5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "div", 4)(7, "mat-slide-toggle", 5);
      \u0275\u0275twoWayListener("ngModelChange", function DetailPhieukhoComponent_Template_mat_slide_toggle_ngModelChange_7_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.DetailPhieukho().isActive, $event) || (ctx.DetailPhieukho().isActive = $event);
        return $event;
      });
      \u0275\u0275text(8);
      \u0275\u0275elementEnd();
      \u0275\u0275template(9, DetailPhieukhoComponent_button_9_Template, 3, 0, "button", 6)(10, DetailPhieukhoComponent_button_10_Template, 3, 0, "button", 6);
      \u0275\u0275elementStart(11, "button", 7);
      \u0275\u0275listener("click", function DetailPhieukhoComponent_Template_button_click_11_listener() {
        return ctx.toggleDelete();
      });
      \u0275\u0275elementStart(12, "mat-icon");
      \u0275\u0275text(13, "delete");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(14, "div", 8);
      \u0275\u0275template(15, DetailPhieukhoComponent_ng_container_15_Template, 9, 0, "ng-container", 9)(16, DetailPhieukhoComponent_ng_container_16_Template, 36, 24, "ng-container", 9);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_0_0;
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(((tmp_0_0 = ctx.DetailPhieukho()) == null ? null : tmp_0_0.maphieu) || "Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u");
      \u0275\u0275advance(2);
      \u0275\u0275twoWayProperty("ngModel", ctx.DetailPhieukho().isActive);
      \u0275\u0275property("disabled", !ctx.isEdit());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate(ctx.DetailPhieukho().isActive ? "Hi\u1EC3n Th\u1ECB" : "\u1EA8n");
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
    MatSuffix,
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
    MatSelect,
    MatOption,
    MatDialogModule,
    CommonModule,
    NgForOf,
    NgIf,
    MatSlideToggleModule,
    MatSlideToggle,
    MatDatepickerModule,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DetailPhieukhoComponent, { className: "DetailPhieukhoComponent", filePath: "src/app/admin/phieukho/detailphieukho/detailphieukho.component.ts", lineNumber: 41 });
})();
export {
  DetailPhieukhoComponent
};
//# sourceMappingURL=chunk-FWCS3RUN.mjs.map
