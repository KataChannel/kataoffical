import './polyfills.server.mjs';
import {
  KhachhangGraphqlService,
  ListKhachhangComponent
} from "./chunk-IZ44ZFHX.mjs";
import {
  BanggiaService
} from "./chunk-D62AO4VY.mjs";
import {
  MatAutocomplete,
  MatAutocompleteModule,
  MatAutocompleteTrigger
} from "./chunk-MWHGBPZJ.mjs";
import "./chunk-VL2LVL37.mjs";
import {
  Debounce
} from "./chunk-2FMT7VQU.mjs";
import "./chunk-3XVDGDXS.mjs";
import "./chunk-7OSI4ORM.mjs";
import "./chunk-PFX6ZNS2.mjs";
import "./chunk-EB4UUH73.mjs";
import "./chunk-KMEFW6OC.mjs";
import "./chunk-TEMMKMG5.mjs";
import "./chunk-233BLFDB.mjs";
import {
  convertToSlug
} from "./chunk-TACHADZV.mjs";
import {
  removeVietnameseAccents
} from "./chunk-RGTCKLO2.mjs";
import "./chunk-DX7YIIY5.mjs";
import "./chunk-IQORQLD3.mjs";
import {
  MatSlideToggle,
  MatSlideToggleModule
} from "./chunk-EWXDPTNY.mjs";
import "./chunk-AM3BBS5E.mjs";
import {
  ActivatedRoute,
  Router
} from "./chunk-TLYIA537.mjs";
import "./chunk-3VZFOMYA.mjs";
import {
  MatDialog,
  MatDialogActions,
  MatDialogContent,
  MatDialogModule
} from "./chunk-5PWX7G23.mjs";
import {
  GraphqlService
} from "./chunk-SLWHV4LF.mjs";
import {
  MatProgressSpinnerModule
} from "./chunk-KJH76OSC.mjs";
import {
  MatSelectModule
} from "./chunk-PQY5STY2.mjs";
import {
  MatInput,
  MatInputModule
} from "./chunk-KU7CK3YB.mjs";
import "./chunk-4QEJTP76.mjs";
import {
  DefaultValueAccessor,
  FormsModule,
  MatFormField,
  MatFormFieldModule,
  MatHint,
  MatLabel,
  NgControlStatus,
  NgModel,
  RequiredValidator
} from "./chunk-K4777VIL.mjs";
import {
  MatIcon,
  MatIconModule
} from "./chunk-VOLHFDBH.mjs";
import "./chunk-A5AQV4K7.mjs";
import "./chunk-OWHCCJ6T.mjs";
import "./chunk-ZZDECD7O.mjs";
import {
  MatSnackBar
} from "./chunk-AF3EHXCM.mjs";
import "./chunk-LOJIWTVC.mjs";
import {
  MatButton,
  MatButtonModule,
  MatIconButton
} from "./chunk-K6ADGRHN.mjs";
import {
  MatOption
} from "./chunk-VMLPK7VD.mjs";
import "./chunk-RILUB63S.mjs";
import "./chunk-AJDW274Y.mjs";
import {
  CommonModule,
  NgForOf,
  NgIf
} from "./chunk-UP6A7POK.mjs";
import {
  effect,
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-I6KZCWLZ.mjs";
import {
  __decorate
} from "./chunk-QS2IQGEQ.mjs";
import "./chunk-3RMAAFYO.mjs";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-FMEBT56H.mjs";

// src/app/admin/khachhang/detailkhachhang/detailkhachhang.component.ts
var _c0 = ["createNhomkhachhangDialog"];
function DetailKhachhangComponent_button_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 6);
    \u0275\u0275listener("click", function DetailKhachhangComponent_button_9_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.handleKhachhangAction());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "save");
    \u0275\u0275elementEnd()();
  }
}
function DetailKhachhangComponent_button_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 6);
    \u0275\u0275listener("click", function DetailKhachhangComponent_button_10_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleEdit());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "edit");
    \u0275\u0275elementEnd()();
  }
}
function DetailKhachhangComponent_ng_container_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 14)(2, "div", 15);
    \u0275\u0275text(3, "B\u1EA1n ch\u1EAFc ch\u1EAFn mu\u1ED1n xo\xE1 kh\xF4ng?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 16)(5, "button", 17);
    \u0275\u0275listener("click", function DetailKhachhangComponent_ng_container_15_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.DeleteData());
    });
    \u0275\u0275text(6, "\u0110\u1ED3ng \xDD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 18);
    \u0275\u0275listener("click", function DetailKhachhangComponent_ng_container_15_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleDelete());
    });
    \u0275\u0275text(8, "Hu\u1EF7 B\u1ECF");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementContainerEnd();
  }
}
function DetailKhachhangComponent_ng_container_16_div_27_button_8_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 64);
  }
}
function DetailKhachhangComponent_ng_container_16_div_27_button_8_mat_icon_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 65);
    \u0275\u0275text(1, "check");
    \u0275\u0275elementEnd();
  }
}
function DetailKhachhangComponent_ng_container_16_div_27_button_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 57);
    \u0275\u0275listener("click", function DetailKhachhangComponent_ng_container_16_div_27_button_8_Template_button_click_0_listener() {
      const item_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.selectLoaikh(item_r9.value));
    });
    \u0275\u0275elementStart(1, "div", 58);
    \u0275\u0275template(2, DetailKhachhangComponent_ng_container_16_div_27_button_8_div_2_Template, 1, 0, "div", 59);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 60)(4, "div", 61);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 62);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(8, DetailKhachhangComponent_ng_container_16_div_27_button_8_mat_icon_8_Template, 2, 0, "mat-icon", 63);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_6_0;
    let tmp_7_0;
    let tmp_8_0;
    let tmp_9_0;
    let tmp_12_0;
    const item_r9 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("bg-primary-50", ((tmp_6_0 = ctx_r2.DetailKhachhang()) == null ? null : tmp_6_0.loaikh) === item_r9.value);
    \u0275\u0275advance();
    \u0275\u0275classProp("border-primary-500", ((tmp_7_0 = ctx_r2.DetailKhachhang()) == null ? null : tmp_7_0.loaikh) === item_r9.value)("border-gray-300", ((tmp_8_0 = ctx_r2.DetailKhachhang()) == null ? null : tmp_8_0.loaikh) !== item_r9.value);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ((tmp_9_0 = ctx_r2.DetailKhachhang()) == null ? null : tmp_9_0.loaikh) === item_r9.value);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r9.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r9.description);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ((tmp_12_0 = ctx_r2.DetailKhachhang()) == null ? null : tmp_12_0.loaikh) === item_r9.value);
  }
}
function DetailKhachhangComponent_ng_container_16_div_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 48)(1, "div", 49)(2, "h3", 50);
    \u0275\u0275text(3, "Ch\u1ECDn Lo\u1EA1i Kh\xE1ch H\xE0ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 51);
    \u0275\u0275listener("click", function DetailKhachhangComponent_ng_container_16_div_27_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.closeLoaikhDropdown());
    });
    \u0275\u0275elementStart(5, "mat-icon", 52);
    \u0275\u0275text(6, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(7, "div", 53);
    \u0275\u0275template(8, DetailKhachhangComponent_ng_container_16_div_27_button_8_Template, 9, 10, "button", 54);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 55)(10, "button", 56);
    \u0275\u0275listener("click", function DetailKhachhangComponent_ng_container_16_div_27_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.closeLoaikhDropdown());
    });
    \u0275\u0275text(11, " Xong ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(8);
    \u0275\u0275property("ngForOf", ctx_r2.loaikhOptions);
  }
}
function DetailKhachhangComponent_ng_container_16_div_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 66);
    \u0275\u0275listener("click", function DetailKhachhangComponent_ng_container_16_div_28_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.closeLoaikhDropdown());
    });
    \u0275\u0275elementEnd();
  }
}
function DetailKhachhangComponent_ng_container_16_div_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 67)(1, "div", 68)(2, "mat-icon", 69);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_4_0;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(((tmp_4_0 = ctx_r2.DetailKhachhang()) == null ? null : tmp_4_0.loaikh) === "khachsi" ? "store" : "person");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.getLoaikhTitle());
  }
}
function DetailKhachhangComponent_ng_container_16_div_39_button_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 82);
    \u0275\u0275listener("click", function DetailKhachhangComponent_ng_container_16_div_39_button_13_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.clearNhomSearch());
    });
    \u0275\u0275elementStart(1, "mat-icon", 83);
    \u0275\u0275text(2, "close");
    \u0275\u0275elementEnd()();
  }
}
function DetailKhachhangComponent_ng_container_16_div_39_div_21_button_1_mat_icon_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 90);
    \u0275\u0275text(1, "check");
    \u0275\u0275elementEnd();
  }
}
function DetailKhachhangComponent_ng_container_16_div_39_div_21_button_1_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 91);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const nhom_r14 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(nhom_r14.description);
  }
}
function DetailKhachhangComponent_ng_container_16_div_39_div_21_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 85);
    \u0275\u0275listener("click", function DetailKhachhangComponent_ng_container_16_div_39_div_21_button_1_Template_button_click_0_listener() {
      const nhom_r14 = \u0275\u0275restoreView(_r13).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r2.toggleNhomSelection(nhom_r14.id));
    });
    \u0275\u0275elementStart(1, "div", 86);
    \u0275\u0275template(2, DetailKhachhangComponent_ng_container_16_div_39_div_21_button_1_mat_icon_2_Template, 2, 0, "mat-icon", 87);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 60)(4, "div", 88);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, DetailKhachhangComponent_ng_container_16_div_39_div_21_button_1_div_6_Template, 2, 1, "div", 89);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const nhom_r14 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275classProp("bg-primary-50", ctx_r2.isNhomSelected(nhom_r14.id));
    \u0275\u0275advance();
    \u0275\u0275classProp("border-primary-500", ctx_r2.isNhomSelected(nhom_r14.id))("bg-primary-500", ctx_r2.isNhomSelected(nhom_r14.id))("border-gray-300", !ctx_r2.isNhomSelected(nhom_r14.id));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.isNhomSelected(nhom_r14.id));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(nhom_r14.name);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", nhom_r14.description);
  }
}
function DetailKhachhangComponent_ng_container_16_div_39_div_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275template(1, DetailKhachhangComponent_ng_container_16_div_39_div_21_button_1_Template, 7, 11, "button", 84);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r2.filteredNhomkhachhang())("ngForTrackBy", ctx_r2.trackByNhom);
  }
}
function DetailKhachhangComponent_ng_container_16_div_39_ng_template_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 92)(1, "mat-icon", 93);
    \u0275\u0275text(2, "search_off");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 94);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 95);
    \u0275\u0275listener("click", function DetailKhachhangComponent_ng_container_16_div_39_ng_template_22_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.createNhomFromSearch());
    });
    \u0275\u0275elementStart(6, "mat-icon", 96);
    \u0275\u0275text(7, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1('Kh\xF4ng t\xECm th\u1EA5y nh\xF3m "', ctx_r2.nhomSearchQuery(), '"');
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(' T\u1EA1o nh\xF3m "', ctx_r2.nhomSearchQuery(), '" ');
  }
}
function DetailKhachhangComponent_ng_container_16_div_39_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 70)(1, "div", 49)(2, "h3", 50);
    \u0275\u0275text(3, "Ch\u1ECDn Nh\xF3m Kh\xE1ch H\xE0ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 51);
    \u0275\u0275listener("click", function DetailKhachhangComponent_ng_container_16_div_39_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.closeNhomkhachhangDropdown());
    });
    \u0275\u0275elementStart(5, "mat-icon", 52);
    \u0275\u0275text(6, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(7, "div", 71)(8, "div", 72)(9, "mat-icon", 73);
    \u0275\u0275text(10, "search");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "input", 74, 2);
    \u0275\u0275listener("input", function DetailKhachhangComponent_ng_container_16_div_39_Template_input_input_11_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.onNhomSearchInput($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(13, DetailKhachhangComponent_ng_container_16_div_39_button_13_Template, 3, 0, "button", 75);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 53)(15, "button", 76);
    \u0275\u0275listener("click", function DetailKhachhangComponent_ng_container_16_div_39_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.openCreateNhomkhachhangDialog());
    });
    \u0275\u0275elementStart(16, "div", 77)(17, "mat-icon", 78);
    \u0275\u0275text(18, "add");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "span");
    \u0275\u0275text(20, "T\u1EA1o nh\xF3m m\u1EDBi...");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(21, DetailKhachhangComponent_ng_container_16_div_39_div_21_Template, 2, 2, "div", 79)(22, DetailKhachhangComponent_ng_container_16_div_39_ng_template_22_Template, 9, 2, "ng-template", null, 3, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div", 80)(25, "span", 81);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "button", 56);
    \u0275\u0275listener("click", function DetailKhachhangComponent_ng_container_16_div_39_Template_button_click_27_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.closeNhomkhachhangDropdown());
    });
    \u0275\u0275text(28, " Xong ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const noResults_r16 = \u0275\u0275reference(23);
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(11);
    \u0275\u0275property("value", ctx_r2.nhomSearchQuery());
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r2.nhomSearchQuery());
    \u0275\u0275advance(8);
    \u0275\u0275property("ngIf", ctx_r2.filteredNhomkhachhang().length > 0)("ngIfElse", noResults_r16);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", ctx_r2.selectedNhomkhachhangIds().length, " nh\xF3m \u0111\xE3 ch\u1ECDn");
  }
}
function DetailKhachhangComponent_ng_container_16_div_40_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 66);
    \u0275\u0275listener("click", function DetailKhachhangComponent_ng_container_16_div_40_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.closeNhomkhachhangDropdown());
    });
    \u0275\u0275elementEnd();
  }
}
function DetailKhachhangComponent_ng_container_16_p_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 97)(1, "mat-icon", 98);
    \u0275\u0275text(2, "warning");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Vui l\xF2ng ch\u1ECDn \xEDt nh\u1EA5t m\u1ED9t nh\xF3m kh\xE1ch h\xE0ng ");
    \u0275\u0275elementEnd();
  }
}
function DetailKhachhangComponent_ng_container_16_div_42_div_1_button_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 104);
    \u0275\u0275listener("click", function DetailKhachhangComponent_ng_container_16_div_42_div_1_button_3_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r18);
      const nhomId_r19 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      ctx_r2.removeNhomkhachhang(nhomId_r19);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(1, "mat-icon", 105);
    \u0275\u0275text(2, "close");
    \u0275\u0275elementEnd()();
  }
}
function DetailKhachhangComponent_ng_container_16_div_42_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 101)(1, "span", 102);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, DetailKhachhangComponent_ng_container_16_div_42_div_1_button_3_Template, 3, 0, "button", 103);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const nhomId_r19 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.getNhomkhachhangName(nhomId_r19));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.isEdit());
  }
}
function DetailKhachhangComponent_ng_container_16_div_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 99);
    \u0275\u0275template(1, DetailKhachhangComponent_ng_container_16_div_42_div_1_Template, 4, 2, "div", 100);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r2.selectedNhomkhachhangIds())("ngForTrackBy", ctx_r2.trackByNhomId);
  }
}
function DetailKhachhangComponent_ng_container_16_mat_option_77_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-option", 106);
    \u0275\u0275listener("click", function DetailKhachhangComponent_ng_container_16_mat_option_77_Template_mat_option_click_0_listener() {
      const item_r21 = \u0275\u0275restoreView(_r20).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.onBanggiaSelected(item_r21));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r21 = ctx.$implicit;
    \u0275\u0275property("value", item_r21);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", item_r21.title, " - ", item_r21.mabanggia, " ");
  }
}
function DetailKhachhangComponent_ng_container_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 19)(2, "mat-form-field", 20)(3, "mat-label");
    \u0275\u0275text(4, "T\xEAn Kh\xE1ch H\xE0ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "input", 21);
    \u0275\u0275listener("input", function DetailKhachhangComponent_ng_container_16_Template_input_input_5_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.updateName($event));
    })("keyup", function DetailKhachhangComponent_ng_container_16_Template_input_keyup_5_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.autoSubtitle());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "mat-form-field", 20)(7, "mat-label");
    \u0275\u0275text(8, "M\xE3 Kh\xE1ch H\xE0ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "input", 22);
    \u0275\u0275listener("input", function DetailKhachhangComponent_ng_container_16_Template_input_input_9_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.updateMakh($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "mat-form-field", 20)(11, "mat-label");
    \u0275\u0275text(12, "Vi\u1EBFt T\u1EAFt");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "input", 23);
    \u0275\u0275listener("input", function DetailKhachhangComponent_ng_container_16_Template_input_input_13_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.updateSubtitle($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "mat-form-field", 20)(15, "mat-label");
    \u0275\u0275text(16, "T\xEAn File");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "input", 24);
    \u0275\u0275listener("input", function DetailKhachhangComponent_ng_container_16_Template_input_input_17_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.updateTenfile($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div")(19, "div", 25)(20, "label", 26);
    \u0275\u0275text(21, "Lo\u1EA1i Kh\xE1ch H\xE0ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "button", 27);
    \u0275\u0275listener("click", function DetailKhachhangComponent_ng_container_16_Template_button_click_22_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleLoaikhDropdown());
    });
    \u0275\u0275elementStart(23, "span", 28);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "mat-icon", 29);
    \u0275\u0275text(26, "expand_more");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(27, DetailKhachhangComponent_ng_container_16_div_27_Template, 12, 1, "div", 30)(28, DetailKhachhangComponent_ng_container_16_div_28_Template, 1, 0, "div", 31);
    \u0275\u0275elementEnd();
    \u0275\u0275template(29, DetailKhachhangComponent_ng_container_16_div_29_Template, 6, 2, "div", 32);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "div")(31, "div", 25)(32, "label", 26);
    \u0275\u0275text(33, "Nh\xF3m Kh\xE1ch H\xE0ng *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "button", 27);
    \u0275\u0275listener("click", function DetailKhachhangComponent_ng_container_16_Template_button_click_34_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleNhomkhachhangDropdown());
    });
    \u0275\u0275elementStart(35, "span", 28);
    \u0275\u0275text(36);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "mat-icon", 29);
    \u0275\u0275text(38, "expand_more");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(39, DetailKhachhangComponent_ng_container_16_div_39_Template, 29, 5, "div", 33)(40, DetailKhachhangComponent_ng_container_16_div_40_Template, 1, 0, "div", 31);
    \u0275\u0275elementEnd();
    \u0275\u0275template(41, DetailKhachhangComponent_ng_container_16_p_41_Template, 4, 0, "p", 34)(42, DetailKhachhangComponent_ng_container_16_div_42_Template, 2, 2, "div", 35);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "mat-form-field", 20)(44, "mat-label");
    \u0275\u0275text(45, "Email");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "input", 36);
    \u0275\u0275listener("input", function DetailKhachhangComponent_ng_container_16_Template_input_input_46_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.updateEmail($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(47, "mat-form-field", 20)(48, "mat-label");
    \u0275\u0275text(49, "S\u1ED1 \u0110i\u1EC7n Tho\u1EA1i");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "input", 37);
    \u0275\u0275listener("input", function DetailKhachhangComponent_ng_container_16_Template_input_input_50_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.updateSdt($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(51, "mat-form-field", 20)(52, "mat-label");
    \u0275\u0275text(53, "M\xE3 S\u1ED1 Thu\u1EBF");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "input", 38);
    \u0275\u0275listener("input", function DetailKhachhangComponent_ng_container_16_Template_input_input_54_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.updateMst($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(55, "mat-form-field", 20)(56, "mat-label");
    \u0275\u0275text(57, "Gi\u1EDD Nh\u1EADn H\xE0ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "input", 39);
    \u0275\u0275listener("input", function DetailKhachhangComponent_ng_container_16_Template_input_input_58_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.updateGionhanhang($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(59, "mat-form-field", 20)(60, "mat-label");
    \u0275\u0275text(61, "M\xE3 Chuy\u1EBFn");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(62, "input", 40);
    \u0275\u0275listener("input", function DetailKhachhangComponent_ng_container_16_Template_input_input_62_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.updateMachuyen($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(63, "mat-form-field", 20)(64, "mat-label");
    \u0275\u0275text(65, "\u0110\u1ECBa Ch\u1EC9");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(66, "input", 41);
    \u0275\u0275listener("input", function DetailKhachhangComponent_ng_container_16_Template_input_input_66_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.updateDiachi($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(67, "mat-form-field", 20)(68, "mat-label");
    \u0275\u0275text(69, "Qu\u1EADn");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(70, "input", 42);
    \u0275\u0275listener("input", function DetailKhachhangComponent_ng_container_16_Template_input_input_70_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.updateQuan($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(71, "mat-form-field", 20)(72, "mat-label");
    \u0275\u0275text(73, "B\u1EA3ng Gi\xE1");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(74, "input", 43);
    \u0275\u0275listener("input", function DetailKhachhangComponent_ng_container_16_Template_input_input_74_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onBanggiaInput($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(75, "mat-autocomplete", 44, 1);
    \u0275\u0275template(77, DetailKhachhangComponent_ng_container_16_mat_option_77_Template, 2, 3, "mat-option", 45);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(78, "mat-slide-toggle", 46);
    \u0275\u0275listener("change", function DetailKhachhangComponent_ng_container_16_Template_mat_slide_toggle_change_78_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.updateHiengia($event));
    });
    \u0275\u0275text(79, "Hi\u1EC7n Gi\xE1");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(80, "mat-slide-toggle", 46);
    \u0275\u0275listener("change", function DetailKhachhangComponent_ng_container_16_Template_mat_slide_toggle_change_80_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.updateIstitle2($event));
    });
    \u0275\u0275text(81, "Hi\u1EC7n T\xEAn S\u1EA3n Ph\u1EA9m 2");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(82, "mat-slide-toggle", 46);
    \u0275\u0275listener("change", function DetailKhachhangComponent_ng_container_16_Template_mat_slide_toggle_change_82_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.updateIsshowvat($event));
    });
    \u0275\u0275text(83, "Hi\u1EC7n VAT");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(84, "mat-form-field", 20)(85, "mat-label");
    \u0275\u0275text(86, "Ghi Ch\xFA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(87, "textarea", 47);
    \u0275\u0275listener("input", function DetailKhachhangComponent_ng_container_16_Template_textarea_input_87_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.updateGhichu($event));
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    let tmp_3_0;
    let tmp_5_0;
    let tmp_7_0;
    let tmp_9_0;
    let tmp_12_0;
    let tmp_17_0;
    let tmp_26_0;
    let tmp_28_0;
    let tmp_30_0;
    let tmp_32_0;
    let tmp_34_0;
    let tmp_36_0;
    let tmp_38_0;
    let tmp_45_0;
    let tmp_47_0;
    let tmp_49_0;
    let tmp_51_0;
    const autoBanggia_r22 = \u0275\u0275reference(76);
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275property("value", ((tmp_3_0 = ctx_r2.DetailKhachhang()) == null ? null : tmp_3_0.name) || "")("disabled", !ctx_r2.isEdit());
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ((tmp_5_0 = ctx_r2.DetailKhachhang()) == null ? null : tmp_5_0.makh) || "")("disabled", !ctx_r2.isEdit());
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ((tmp_7_0 = ctx_r2.DetailKhachhang()) == null ? null : tmp_7_0.subtitle) || "")("disabled", !ctx_r2.isEdit());
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ((tmp_9_0 = ctx_r2.DetailKhachhang()) == null ? null : tmp_9_0.tenfile) || "")("disabled", !ctx_r2.isEdit());
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", !ctx_r2.isEdit());
    \u0275\u0275advance();
    \u0275\u0275classProp("text-gray-400", !((tmp_12_0 = ctx_r2.DetailKhachhang()) == null ? null : tmp_12_0.loaikh));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.getLoaikhTitle() || "Ch\u1ECDn lo\u1EA1i kh\xE1ch h\xE0ng...", " ");
    \u0275\u0275advance();
    \u0275\u0275classProp("rotate-180", ctx_r2.isLoaikhDropdownOpen());
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r2.isLoaikhDropdownOpen());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.isLoaikhDropdownOpen());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_17_0 = ctx_r2.DetailKhachhang()) == null ? null : tmp_17_0.loaikh);
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", !ctx_r2.isEdit());
    \u0275\u0275advance();
    \u0275\u0275classProp("text-gray-400", ctx_r2.selectedNhomkhachhangIds().length === 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.selectedNhomkhachhangIds().length > 0 ? ctx_r2.selectedNhomkhachhangIds().length + " nh\xF3m \u0111\xE3 ch\u1ECDn" : "Ch\u1ECDn nh\xF3m kh\xE1ch h\xE0ng...", " ");
    \u0275\u0275advance();
    \u0275\u0275classProp("rotate-180", ctx_r2.isNhomDropdownOpen());
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r2.isNhomDropdownOpen());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.isNhomDropdownOpen());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.selectedNhomkhachhangIds().length === 0 && ctx_r2.isEdit());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.selectedNhomkhachhangIds().length > 0);
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ((tmp_26_0 = ctx_r2.DetailKhachhang()) == null ? null : tmp_26_0.email) || "")("disabled", !ctx_r2.isEdit());
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ((tmp_28_0 = ctx_r2.DetailKhachhang()) == null ? null : tmp_28_0.sdt) || "")("disabled", !ctx_r2.isEdit());
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ((tmp_30_0 = ctx_r2.DetailKhachhang()) == null ? null : tmp_30_0.mst) || "")("disabled", !ctx_r2.isEdit());
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ((tmp_32_0 = ctx_r2.DetailKhachhang()) == null ? null : tmp_32_0.gionhanhang) || "")("disabled", !ctx_r2.isEdit());
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ((tmp_34_0 = ctx_r2.DetailKhachhang()) == null ? null : tmp_34_0.machuyen) || "")("disabled", !ctx_r2.isEdit());
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ((tmp_36_0 = ctx_r2.DetailKhachhang()) == null ? null : tmp_36_0.diachi) || "")("disabled", !ctx_r2.isEdit());
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ((tmp_38_0 = ctx_r2.DetailKhachhang()) == null ? null : tmp_38_0.quan) || "")("disabled", !ctx_r2.isEdit());
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ctx_r2.getSelectedBanggiaTitle())("matAutocomplete", autoBanggia_r22)("disabled", !ctx_r2.isEdit());
    \u0275\u0275advance();
    \u0275\u0275property("displayWith", ctx_r2.displayBanggia);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r2.filteredBanggia());
    \u0275\u0275advance();
    \u0275\u0275property("checked", (tmp_45_0 = ctx_r2.DetailKhachhang()) == null ? null : tmp_45_0.hiengia)("disabled", !ctx_r2.isEdit());
    \u0275\u0275advance(2);
    \u0275\u0275property("checked", (tmp_47_0 = ctx_r2.DetailKhachhang()) == null ? null : tmp_47_0.istitle2)("disabled", !ctx_r2.isEdit());
    \u0275\u0275advance(2);
    \u0275\u0275property("checked", (tmp_49_0 = ctx_r2.DetailKhachhang()) == null ? null : tmp_49_0.isshowvat)("disabled", !ctx_r2.isEdit());
    \u0275\u0275advance(5);
    \u0275\u0275property("value", ((tmp_51_0 = ctx_r2.DetailKhachhang()) == null ? null : tmp_51_0.ghichu) || "")("disabled", !ctx_r2.isEdit());
  }
}
function DetailKhachhangComponent_ng_template_17_mat_icon_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 121);
    \u0275\u0275text(1, "autorenew");
    \u0275\u0275elementEnd();
  }
}
function DetailKhachhangComponent_ng_template_17_span_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "T\u1EA1o Nh\xF3m");
    \u0275\u0275elementEnd();
  }
}
function DetailKhachhangComponent_ng_template_17_span_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "\u0110ang t\u1EA1o...");
    \u0275\u0275elementEnd();
  }
}
function DetailKhachhangComponent_ng_template_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 107)(1, "div", 108)(2, "h3", 109);
    \u0275\u0275text(3, "T\u1EA1o Nh\xF3m Kh\xE1ch H\xE0ng M\u1EDBi");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 110);
    \u0275\u0275listener("click", function DetailKhachhangComponent_ng_template_17_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r23);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeCreateNhomkhachhangDialog());
    });
    \u0275\u0275elementStart(5, "mat-icon");
    \u0275\u0275text(6, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(7, "mat-dialog-content", 111)(8, "div", 112)(9, "mat-form-field", 113)(10, "mat-label");
    \u0275\u0275text(11, "T\xEAn Nh\xF3m *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "input", 114, 4);
    \u0275\u0275twoWayListener("ngModelChange", function DetailKhachhangComponent_ng_template_17_Template_input_ngModelChange_12_listener($event) {
      \u0275\u0275restoreView(_r23);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newNhomkhachhang.name, $event) || (ctx_r2.newNhomkhachhang.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "mat-hint", 115);
    \u0275\u0275text(15, "V\xED d\u1EE5: Kh\xE1ch VIP, Kh\xE1ch M\u1EDBi, ...");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "mat-form-field", 113)(17, "mat-label");
    \u0275\u0275text(18, "M\xF4 T\u1EA3");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "textarea", 116);
    \u0275\u0275twoWayListener("ngModelChange", function DetailKhachhangComponent_ng_template_17_Template_textarea_ngModelChange_19_listener($event) {
      \u0275\u0275restoreView(_r23);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newNhomkhachhang.description, $event) || (ctx_r2.newNhomkhachhang.description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(20, "mat-dialog-actions", 117)(21, "button", 118);
    \u0275\u0275listener("click", function DetailKhachhangComponent_ng_template_17_Template_button_click_21_listener() {
      \u0275\u0275restoreView(_r23);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeCreateNhomkhachhangDialog());
    });
    \u0275\u0275text(22, " H\u1EE7y ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "button", 119);
    \u0275\u0275listener("click", function DetailKhachhangComponent_ng_template_17_Template_button_click_23_listener() {
      \u0275\u0275restoreView(_r23);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.createNewNhomkhachhang());
    });
    \u0275\u0275template(24, DetailKhachhangComponent_ng_template_17_mat_icon_24_Template, 2, 0, "mat-icon", 120)(25, DetailKhachhangComponent_ng_template_17_span_25_Template, 2, 0, "span", 13)(26, DetailKhachhangComponent_ng_template_17_span_26_Template, 2, 0, "span", 13);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(12);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newNhomkhachhang.name);
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newNhomkhachhang.description);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", !ctx_r2.newNhomkhachhang.name || ctx_r2.isCreatingNhomkhachhang());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.isCreatingNhomkhachhang());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r2.isCreatingNhomkhachhang());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.isCreatingNhomkhachhang());
  }
}
var DetailKhachhangComponent = class _DetailKhachhangComponent {
  createNhomkhachhangDialogRef;
  _ListkhachhangComponent = inject(ListKhachhangComponent);
  _KhachhangService = inject(KhachhangGraphqlService);
  _BanggiaService = inject(BanggiaService);
  _GraphqlService = inject(GraphqlService);
  _route = inject(ActivatedRoute);
  _router = inject(Router);
  _snackBar = inject(MatSnackBar);
  _dialog = inject(MatDialog);
  // GraphQL reactive signals
  DetailKhachhang = this._KhachhangService.DetailKhachhang;
  loading = this._KhachhangService.loading;
  error = this._KhachhangService.error;
  ListFilter = [];
  filterItem = [];
  isEdit = signal(false);
  isDelete = signal(false);
  khachhangId = this._KhachhangService.khachhangId;
  // Autocomplete properties
  filteredBanggia = signal([]);
  selectedBanggia = signal(null);
  // Nhomkhachhang properties
  ListNhomkhachhang = signal([]);
  filteredNhomkhachhang = signal([]);
  selectedNhomkhachhangIds = signal([]);
  isShowCreateNhomkhachhang = signal(false);
  isCreatingNhomkhachhang = signal(false);
  isNhomDropdownOpen = signal(false);
  nhomSearchQuery = signal("");
  newNhomkhachhang = { name: "", description: "" };
  dialogRef = null;
  // Loại Khách Hàng properties
  isLoaikhDropdownOpen = signal(false);
  loaikhOptions = [
    { value: "khachsi", title: "Kh\xE1ch S\u1EC9", description: "Kh\xE1ch h\xE0ng mua s\u1ED1 l\u01B0\u1EE3ng l\u1EDBn" },
    { value: "khachle", title: "Kh\xE1ch L\u1EBB", description: "Kh\xE1ch h\xE0ng mua l\u1EBB" }
  ];
  constructor() {
    this._route.paramMap.subscribe((params) => {
      const id = params.get("id");
      this._KhachhangService.setKhachhangId(id);
    });
    effect(() => __async(this, null, function* () {
      const id = this._KhachhangService.khachhangId();
      if (!id) {
        this._router.navigate(["/admin/khachhang"]);
        this._ListkhachhangComponent.drawer.close();
      }
      if (id === "new") {
        this.DetailKhachhang.set({ loaikh: "khachsi" });
        this.selectedNhomkhachhangIds.set([]);
        this._ListkhachhangComponent.drawer.open();
        this.isEdit.update((value) => !value);
        this._router.navigate(["/admin/khachhang", "new"]);
      } else {
        console.log("KhachhangId:", id);
        if (id) {
          yield this._KhachhangService.getKhachhangById(id);
          this.ListFilter = this._KhachhangService.DetailKhachhang().banggia;
          const nhomIds = this.DetailKhachhang()?.nhomkhachhang?.map((n) => n.id) || [];
          this.selectedNhomkhachhangIds.set(nhomIds);
        }
        this._ListkhachhangComponent.drawer.open();
        this._router.navigate(["/admin/khachhang", id]);
      }
    }));
  }
  ngOnInit() {
    return __async(this, null, function* () {
      yield this._BanggiaService.getAllBanggia();
      yield this.loadNhomkhachhang();
      this.filterItem = this._BanggiaService.ListBanggia();
      this.filteredBanggia.set(this._BanggiaService.ListBanggia());
      if (this.DetailKhachhang()?.banggiaId) {
        const selected = this._BanggiaService.ListBanggia().find((item) => item.id === this.DetailKhachhang().banggiaId);
        this.selectedBanggia.set(selected);
      }
      console.log("DetailKhachhang:", this.DetailKhachhang());
    });
  }
  // Load all Nhomkhachhang
  loadNhomkhachhang() {
    return __async(this, null, function* () {
      try {
        const result = yield this._GraphqlService.findMany("nhomkhachhang", {
          select: {
            id: true,
            name: true,
            description: true
          },
          orderBy: { name: "asc" }
        });
        this.ListNhomkhachhang.set(result || []);
        this.filteredNhomkhachhang.set(result || []);
      } catch (error) {
        console.error("Error loading nhomkhachhang:", error);
      }
    });
  }
  // =============== NHOM DROPDOWN METHODS (shadcn style) ===============
  // Toggle dropdown open/close
  toggleNhomkhachhangDropdown() {
    if (!this.isEdit())
      return;
    this.isNhomDropdownOpen.update((v) => !v);
    if (this.isNhomDropdownOpen()) {
      this.nhomSearchQuery.set("");
      this.filteredNhomkhachhang.set(this.ListNhomkhachhang());
    }
  }
  // Close dropdown
  closeNhomkhachhangDropdown() {
    this.isNhomDropdownOpen.set(false);
    this.nhomSearchQuery.set("");
  }
  // Handle search input
  onNhomSearchInput(event) {
    const query = event.target.value?.toLowerCase().trim() || "";
    this.nhomSearchQuery.set(query);
    if (!query) {
      this.filteredNhomkhachhang.set(this.ListNhomkhachhang());
      return;
    }
    const filtered = this.ListNhomkhachhang().filter((nhom) => nhom.name?.toLowerCase().includes(query) || nhom.description?.toLowerCase().includes(query));
    this.filteredNhomkhachhang.set(filtered);
  }
  // Clear search
  clearNhomSearch() {
    this.nhomSearchQuery.set("");
    this.filteredNhomkhachhang.set(this.ListNhomkhachhang());
  }
  // Check if nhom is selected
  isNhomSelected(nhomId) {
    return this.selectedNhomkhachhangIds().includes(nhomId);
  }
  // Toggle nhom selection
  toggleNhomSelection(nhomId) {
    const currentIds = this.selectedNhomkhachhangIds();
    let newIds;
    if (currentIds.includes(nhomId)) {
      newIds = currentIds.filter((id) => id !== nhomId);
    } else {
      newIds = [...currentIds, nhomId];
    }
    this.selectedNhomkhachhangIds.set(newIds);
    this.DetailKhachhang.update((v) => __spreadProps(__spreadValues({}, v), {
      nhomkhachhangIds: newIds
    }));
  }
  // Create nhom from search query
  createNhomFromSearch() {
    this.newNhomkhachhang = {
      name: this.nhomSearchQuery(),
      description: ""
    };
    this.closeNhomkhachhangDropdown();
    this.openCreateNhomkhachhangDialog();
  }
  // Track by functions for ngFor
  trackByNhom(index, nhom) {
    return nhom.id;
  }
  trackByNhomId(index, nhomId) {
    return nhomId;
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
    this.DetailKhachhang.update((v) => __spreadProps(__spreadValues({}, v), {
      subtitle: removeVietnameseAccents(v.name || "")
    }));
  }
  createKhachhang() {
    return __async(this, null, function* () {
      try {
        yield this._KhachhangService.createKhachhang(this.DetailKhachhang());
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
        const khachhangData = this.DetailKhachhang();
        const khachhangId = this.khachhangId();
        if (khachhangId && khachhangId !== "new") {
          yield this._KhachhangService.updateKhachhang(khachhangId, khachhangData);
          this._snackBar.open("C\u1EADp Nh\u1EADt Th\xE0nh C\xF4ng", "", {
            duration: 1e3,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-success"]
          });
          this.isEdit.update((value) => !value);
        }
      } catch (error) {
        console.error("L\u1ED7i khi c\u1EADp nh\u1EADt khachhang:", error);
      }
    });
  }
  DeleteData() {
    return __async(this, null, function* () {
      try {
        const khachhangData = this.DetailKhachhang();
        if (khachhangData?.id) {
          yield this._KhachhangService.deleteKhachhang(khachhangData.id);
          this._snackBar.open("X\xF3a Th\xE0nh C\xF4ng", "", {
            duration: 1e3,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-success"]
          });
          this._router.navigate(["/admin/khachhang"]);
        }
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
  // Autocomplete methods for Banggia
  onBanggiaInput(event) {
    const value = event.target.value.toLowerCase();
    const filtered = this._BanggiaService.ListBanggia().filter((item) => item.title.toLowerCase().includes(value) || item.mabanggia?.toLowerCase().includes(value));
    this.filteredBanggia.set(filtered);
  }
  onBanggiaSelected(banggia) {
    console.log("banggia selected:", banggia);
    if (banggia) {
      this.selectedBanggia.set(banggia);
      this.DetailKhachhang.update((v) => __spreadProps(__spreadValues({}, v), {
        banggiaId: banggia.id
      }));
    }
  }
  getSelectedBanggiaTitle() {
    const selected = this.selectedBanggia();
    if (selected) {
      return `${selected.title} - ${selected.mabanggia}`;
    }
    if (this.DetailKhachhang()?.banggiaId) {
      const banggia = this._BanggiaService.ListBanggia().find((item) => item.id === this.DetailKhachhang().banggiaId);
      if (banggia) {
        this.selectedBanggia.set(banggia);
        return `${banggia.title} - ${banggia.mabanggia}`;
      }
    }
    return "";
  }
  displayBanggia(banggia) {
    return banggia ? `${banggia.title} - ${banggia.mabanggia}` : "";
  }
  // Methods để xử lý slide toggle changes
  updateHiengia(event) {
    this.DetailKhachhang.update((v) => __spreadProps(__spreadValues({}, v), {
      hiengia: event.checked
    }));
  }
  updateIstitle2(event) {
    this.DetailKhachhang.update((v) => __spreadProps(__spreadValues({}, v), {
      istitle2: event.checked
    }));
  }
  updateIsshowvat(event) {
    this.DetailKhachhang.update((v) => __spreadProps(__spreadValues({}, v), {
      isshowvat: event.checked
    }));
  }
  updateIsActive(event) {
    this.DetailKhachhang.update((v) => __spreadProps(__spreadValues({}, v), {
      isActive: event.checked
    }));
  }
  // Methods để xử lý input changes
  updateName(event) {
    this.DetailKhachhang.update((v) => __spreadProps(__spreadValues({}, v), {
      name: event.target.value
    }));
  }
  updateMakh(event) {
    this.DetailKhachhang.update((v) => __spreadProps(__spreadValues({}, v), {
      makh: event.target.value
    }));
  }
  updateSubtitle(event) {
    this.DetailKhachhang.update((v) => __spreadProps(__spreadValues({}, v), {
      subtitle: event.target.value
    }));
  }
  updateTenfile(event) {
    this.DetailKhachhang.update((v) => __spreadProps(__spreadValues({}, v), {
      tenfile: event.target.value
    }));
  }
  // =============== LOẠI KHÁCH HÀNG DROPDOWN METHODS ===============
  // Toggle dropdown
  toggleLoaikhDropdown() {
    if (!this.isEdit())
      return;
    this.isLoaikhDropdownOpen.update((v) => !v);
  }
  // Close dropdown
  closeLoaikhDropdown() {
    this.isLoaikhDropdownOpen.set(false);
  }
  // Select loaikh option
  selectLoaikh(value) {
    this.DetailKhachhang.update((v) => __spreadProps(__spreadValues({}, v), {
      loaikh: value
    }));
    this.closeLoaikhDropdown();
  }
  // Get loaikh title
  getLoaikhTitle() {
    const loaikh = this.DetailKhachhang()?.loaikh;
    const option = this.loaikhOptions.find((o) => o.value === loaikh);
    return option?.title || "";
  }
  updateLoaikh(event) {
    this.DetailKhachhang.update((v) => __spreadProps(__spreadValues({}, v), {
      loaikh: event.value
    }));
  }
  updateEmail(event) {
    this.DetailKhachhang.update((v) => __spreadProps(__spreadValues({}, v), {
      email: event.target.value
    }));
  }
  updateSdt(event) {
    this.DetailKhachhang.update((v) => __spreadProps(__spreadValues({}, v), {
      sdt: event.target.value
    }));
  }
  updateMst(event) {
    this.DetailKhachhang.update((v) => __spreadProps(__spreadValues({}, v), {
      mst: event.target.value
    }));
  }
  updateGionhanhang(event) {
    this.DetailKhachhang.update((v) => __spreadProps(__spreadValues({}, v), {
      gionhanhang: event.target.value
    }));
  }
  updateMachuyen(event) {
    this.DetailKhachhang.update((v) => __spreadProps(__spreadValues({}, v), {
      machuyen: event.target.value
    }));
  }
  updateDiachi(event) {
    this.DetailKhachhang.update((v) => __spreadProps(__spreadValues({}, v), {
      diachi: event.target.value
    }));
  }
  updateQuan(event) {
    this.DetailKhachhang.update((v) => __spreadProps(__spreadValues({}, v), {
      quan: event.target.value
    }));
  }
  updateGhichu(event) {
    this.DetailKhachhang.update((v) => __spreadProps(__spreadValues({}, v), {
      ghichu: event.target.value
    }));
  }
  // =============== NHOMKHACHHANG METHODS ===============
  // Remove a nhomkhachhang from selection
  removeNhomkhachhang(nhomId) {
    const currentIds = this.selectedNhomkhachhangIds();
    const newIds = currentIds.filter((id) => id !== nhomId);
    this.selectedNhomkhachhangIds.set(newIds);
    this.DetailKhachhang.update((v) => __spreadProps(__spreadValues({}, v), {
      nhomkhachhangIds: newIds
    }));
  }
  // Get nhomkhachhang name by ID
  getNhomkhachhangName(nhomId) {
    const nhom = this.ListNhomkhachhang().find((n) => n.id === nhomId);
    return nhom?.name || "Unknown";
  }
  // Open create dialog using template
  openCreateNhomkhachhangDialog() {
    this.newNhomkhachhang = { name: "", description: "" };
    this.isShowCreateNhomkhachhang.set(true);
    const isMobile = window.innerWidth < 768;
    this.dialogRef = this._dialog.open(this.createNhomkhachhangDialogRef, {
      panelClass: ["nhomkh-create-dialog"],
      width: isMobile ? "100vw" : "450px",
      maxWidth: isMobile ? "100vw" : "450px",
      position: isMobile ? { bottom: "0" } : void 0,
      hasBackdrop: true,
      autoFocus: true,
      disableClose: false
    });
  }
  // Close create dialog
  closeCreateNhomkhachhangDialog() {
    this.isShowCreateNhomkhachhang.set(false);
    this.newNhomkhachhang = { name: "", description: "" };
    if (this.dialogRef) {
      this.dialogRef.close();
      this.dialogRef = null;
    }
  }
  // Create new nhomkhachhang
  createNewNhomkhachhang() {
    return __async(this, null, function* () {
      if (!this.newNhomkhachhang.name?.trim()) {
        this._snackBar.open("Vui l\xF2ng nh\u1EADp t\xEAn nh\xF3m", "", {
          duration: 2e3,
          horizontalPosition: "center",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
        return;
      }
      this.isCreatingNhomkhachhang.set(true);
      try {
        const newNhom = yield this._GraphqlService.createOne("nhomkhachhang", {
          name: this.newNhomkhachhang.name.trim(),
          description: this.newNhomkhachhang.description?.trim() || ""
        });
        this.ListNhomkhachhang.update((list) => [...list, newNhom]);
        const currentIds = this.selectedNhomkhachhangIds();
        this.selectedNhomkhachhangIds.set([...currentIds, newNhom.id]);
        this.DetailKhachhang.update((v) => __spreadProps(__spreadValues({}, v), {
          nhomkhachhangIds: [...currentIds, newNhom.id]
        }));
        this._snackBar.open("T\u1EA1o nh\xF3m kh\xE1ch h\xE0ng th\xE0nh c\xF4ng!", "", {
          duration: 2e3,
          horizontalPosition: "center",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        this.closeCreateNhomkhachhangDialog();
      } catch (error) {
        console.error("Error creating nhomkhachhang:", error);
        const errorMessage = error?.message?.includes("Unique constraint") ? "T\xEAn nh\xF3m \u0111\xE3 t\u1ED3n t\u1EA1i!" : "L\u1ED7i khi t\u1EA1o nh\xF3m kh\xE1ch h\xE0ng";
        this._snackBar.open(errorMessage, "", {
          duration: 3e3,
          horizontalPosition: "center",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      } finally {
        this.isCreatingNhomkhachhang.set(false);
      }
    });
  }
  static \u0275fac = function DetailKhachhangComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DetailKhachhangComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DetailKhachhangComponent, selectors: [["app-detailkhachhang"]], viewQuery: function DetailKhachhangComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.createNhomkhachhangDialogRef = _t.first);
    }
  }, decls: 19, vars: 8, consts: [["createNhomkhachhangDialog", ""], ["autoBanggia", "matAutocomplete"], ["nhomSearchInput", ""], ["noResults", ""], ["nhomNameInput", ""], [1, "flex", "flex-row", "justify-between", "items-center", "space-x-2", "p-2"], ["mat-icon-button", "", "color", "primary", 3, "click"], [1, "font-bold"], [1, "flex", "flex-row", "space-x-2", "items-center"], [3, "change", "checked", "disabled"], ["mat-icon-button", "", "color", "primary", 3, "click", 4, "ngIf"], ["mat-icon-button", "", "color", "warn", 3, "click"], [1, "relative", "flex", "flex-col", "w-full", "p-4", "overflow-auto"], [4, "ngIf"], [1, "flex", "flex-col", "space-y-4", "items-center", "justify-center"], [1, "font-bold", "text-2xl"], [1, "flex", "flex-row", "space-x-2", "items-center", "justify-center"], ["mat-flat-button", "", "color", "primary", 3, "click"], ["mat-flat-button", "", "color", "warn", 3, "click"], [1, "w-full", "grid", "grid-cols-2", "gap-4"], ["appearance", "outline", "subscriptSizing", "dynamic"], ["matInput", "", "placeholder", "Vui l\xF2ng nh\u1EADp T\xEAn Kh\xE1ch H\xE0ng", 3, "input", "keyup", "value", "disabled"], ["matInput", "", "placeholder", "Vui l\xF2ng nh\u1EADp M\xE3 Kh\xE1ch H\xE0ng", 3, "input", "value", "disabled"], ["matInput", "", "placeholder", "Vui l\xF2ng nh\u1EADp Vi\u1EBFt T\u1EAFt", 3, "input", "value", "disabled"], ["matInput", "", "placeholder", "Vui l\xF2ng nh\u1EADp T\xEAn File", 3, "input", "value", "disabled"], [1, "relative", "w-full"], [1, "block", "text-sm", "font-medium", "text-gray-700", "mb-1.5"], ["type", "button", 1, "flex", "items-center", "justify-between", "w-full", "min-h-[44px]", "px-3", "py-2", "text-sm", "bg-white", "border", "border-gray-200", "rounded-lg", "shadow-sm", "transition-all", "duration-200", "hover:border-gray-300", "focus:outline-none", "focus:ring-2", "focus:ring-primary-500", "focus:ring-offset-1", "focus:border-primary-500", "disabled:opacity-50", "disabled:cursor-not-allowed", "disabled:bg-gray-50", "active:scale-[0.99]", "touch-manipulation", 3, "click", "disabled"], [1, "flex-1", "text-left", "truncate"], [1, "!text-lg", "!w-5", "!h-5", "text-gray-400", "ml-2", "transition-transform", "duration-200"], ["class", "fixed md:absolute inset-0 md:inset-auto md:top-full md:left-0 md:right-0 z-50 \n                 bg-white md:mt-1 md:rounded-lg md:border md:border-gray-200 md:shadow-lg\n                 flex flex-col md:overflow-hidden", 4, "ngIf"], ["class", "fixed inset-0 bg-black/20 z-40 md:hidden", 3, "click", 4, "ngIf"], ["class", "mt-2", 4, "ngIf"], ["class", "fixed md:absolute inset-0 md:inset-auto md:top-full md:left-0 md:right-0 z-50 \n                 bg-white md:mt-1 md:rounded-lg md:border md:border-gray-200 md:shadow-lg md:max-h-80\n                 flex flex-col md:overflow-hidden", 4, "ngIf"], ["class", "mt-1.5 text-xs text-orange-500 flex items-center gap-1", 4, "ngIf"], ["class", "flex flex-wrap gap-1.5 mt-2", 4, "ngIf"], ["matInput", "", "placeholder", "Vui l\xF2ng nh\u1EADp Email", 3, "input", "value", "disabled"], ["matInput", "", "placeholder", "Vui l\xF2ng nh\u1EADp S\u1ED1 \u0110i\u1EC7n Tho\u1EA1i", 3, "input", "value", "disabled"], ["matInput", "", "placeholder", "Vui l\xF2ng nh\u1EADp M\xE3 S\u1ED1 Thu\u1EBF", 3, "input", "value", "disabled"], ["matInput", "", "placeholder", "Vui l\xF2ng nh\u1EADp Gi\u1EDD Nh\u1EADn H\xE0ng", 3, "input", "value", "disabled"], ["matInput", "", "placeholder", "Vui l\xF2ng nh\u1EADp M\xE3 Chuy\u1EBFn", 3, "input", "value", "disabled"], ["matInput", "", "placeholder", "Vui l\xF2ng nh\u1EADp \u0110\u1ECBa Ch\u1EC9", 3, "input", "value", "disabled"], ["matInput", "", "placeholder", "Vui l\xF2ng nh\u1EADp Qu\u1EADn", 3, "input", "value", "disabled"], ["matInput", "", "placeholder", "T\xECm ki\u1EBFm b\u1EA3ng gi\xE1...", 3, "input", "value", "matAutocomplete", "disabled"], [3, "displayWith"], [3, "value", "click", 4, "ngFor", "ngForOf"], ["color", "primary", 3, "change", "checked", "disabled"], ["matInput", "", "placeholder", "Vui l\xF2ng nh\u1EADp Ghi Ch\xFA", 3, "input", "value", "disabled"], [1, "fixed", "md:absolute", "inset-0", "md:inset-auto", "md:top-full", "md:left-0", "md:right-0", "z-50", "bg-white", "md:mt-1", "md:rounded-lg", "md:border", "md:border-gray-200", "md:shadow-lg", "flex", "flex-col", "md:overflow-hidden"], [1, "flex", "md:hidden", "items-center", "justify-between", "px-4", "py-3", "border-b", "border-gray-100", "bg-white", "sticky", "top-0"], [1, "text-base", "font-semibold", "text-gray-900"], ["type", "button", 1, "flex", "items-center", "justify-center", "w-8", "h-8", "rounded-full", "hover:bg-gray-100", "active:bg-gray-200", "transition-colors", 3, "click"], [1, "!text-xl", "text-gray-500"], [1, "flex-1", "overflow-y-auto", "overscroll-contain"], ["type", "button", "class", "flex items-center gap-3 w-full px-4 py-3.5 text-sm transition-colors\n                     hover:bg-gray-50 active:bg-gray-100", 3, "bg-primary-50", "click", 4, "ngFor", "ngForOf"], [1, "flex", "md:hidden", "items-center", "justify-end", "px-4", "py-3", "border-t", "border-gray-100", "bg-gray-50", "sticky", "bottom-0"], ["type", "button", 1, "px-6", "py-2.5", "text-sm", "font-medium", "text-white", "bg-primary-600", "rounded-lg", "hover:bg-primary-700", "active:bg-primary-800", "transition-colors", "shadow-sm", 3, "click"], ["type", "button", 1, "flex", "items-center", "gap-3", "w-full", "px-4", "py-3.5", "text-sm", "transition-colors", "hover:bg-gray-50", "active:bg-gray-100", 3, "click"], [1, "flex", "items-center", "justify-center", "w-5", "h-5", "rounded-full", "border-2", "transition-all", "duration-200"], ["class", "w-2.5 h-2.5 rounded-full bg-primary-500", 4, "ngIf"], [1, "flex-1", "min-w-0", "text-left"], [1, "font-medium", "text-gray-900"], [1, "text-xs", "text-gray-500", "mt-0.5"], ["class", "!text-lg !w-5 !h-5 text-primary-500", 4, "ngIf"], [1, "w-2.5", "h-2.5", "rounded-full", "bg-primary-500"], [1, "!text-lg", "!w-5", "!h-5", "text-primary-500"], [1, "fixed", "inset-0", "bg-black/20", "z-40", "md:hidden", 3, "click"], [1, "mt-2"], [1, "inline-flex", "items-center", "gap-1.5", "px-2.5", "py-1.5", "text-xs", "font-medium", "rounded-md", "bg-gray-100", "text-gray-700", "border", "border-gray-200"], [1, "!text-sm", "!w-4", "!h-4", "text-gray-500"], [1, "fixed", "md:absolute", "inset-0", "md:inset-auto", "md:top-full", "md:left-0", "md:right-0", "z-50", "bg-white", "md:mt-1", "md:rounded-lg", "md:border", "md:border-gray-200", "md:shadow-lg", "md:max-h-80", "flex", "flex-col", "md:overflow-hidden"], [1, "sticky", "top-0", "md:top-0", "p-3", "bg-white", "border-b", "border-gray-100", "z-10"], [1, "relative"], [1, "absolute", "left-3", "top-1/2", "-translate-y-1/2", "!text-lg", "!w-5", "!h-5", "text-gray-400"], ["type", "text", "placeholder", "T\xECm ki\u1EBFm nh\xF3m...", 1, "w-full", "h-11", "md:h-10", "pl-10", "pr-4", "text-sm", "bg-gray-50", "border", "border-gray-200", "rounded-lg", "placeholder:text-gray-400", "transition-all", "duration-200", "focus:outline-none", "focus:ring-2", "focus:ring-primary-500", "focus:border-primary-500", "focus:bg-white", 3, "input", "value"], ["type", "button", "class", "absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 rounded-full hover:bg-gray-200 transition-colors", 3, "click", 4, "ngIf"], ["type", "button", 1, "flex", "items-center", "gap-3", "w-full", "px-4", "py-3", "text-sm", "font-medium", "text-primary-600", "bg-primary-50/50", "hover:bg-primary-100", "active:bg-primary-200", "transition-colors", "border-b", "border-gray-100", 3, "click"], [1, "flex", "items-center", "justify-center", "w-8", "h-8", "rounded-lg", "bg-primary-100"], [1, "!text-lg", "text-primary-600"], [4, "ngIf", "ngIfElse"], [1, "flex", "md:hidden", "items-center", "justify-between", "px-4", "py-3", "border-t", "border-gray-100", "bg-gray-50", "sticky", "bottom-0"], [1, "text-sm", "text-gray-600"], ["type", "button", 1, "absolute", "right-2", "top-1/2", "-translate-y-1/2", "flex", "items-center", "justify-center", "w-6", "h-6", "rounded-full", "hover:bg-gray-200", "transition-colors", 3, "click"], [1, "!text-sm", "!w-4", "!h-4", "text-gray-400"], ["type", "button", "class", "flex items-center gap-3 w-full px-4 py-3 text-sm transition-colors\n                       hover:bg-gray-50 active:bg-gray-100", 3, "bg-primary-50", "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["type", "button", 1, "flex", "items-center", "gap-3", "w-full", "px-4", "py-3", "text-sm", "transition-colors", "hover:bg-gray-50", "active:bg-gray-100", 3, "click"], [1, "flex", "items-center", "justify-center", "w-5", "h-5", "rounded", "border-2", "transition-all", "duration-200"], ["class", "!text-xs !w-3 !h-3 text-white", 4, "ngIf"], [1, "font-medium", "text-gray-900", "truncate"], ["class", "text-xs text-gray-500 truncate mt-0.5", 4, "ngIf"], [1, "!text-xs", "!w-3", "!h-3", "text-white"], [1, "text-xs", "text-gray-500", "truncate", "mt-0.5"], [1, "flex", "flex-col", "items-center", "justify-center", "py-8", "px-4", "text-center"], [1, "!text-4xl", "!w-12", "!h-12", "text-gray-300", "mb-3"], [1, "text-sm", "text-gray-500"], ["type", "button", 1, "mt-3", "inline-flex", "items-center", "gap-1.5", "px-4", "py-2", "text-sm", "font-medium", "text-primary-600", "bg-primary-50", "rounded-lg", "hover:bg-primary-100", "active:bg-primary-200", "transition-colors", 3, "click"], [1, "!text-lg", "!w-5", "!h-5"], [1, "mt-1.5", "text-xs", "text-orange-500", "flex", "items-center", "gap-1"], [1, "!text-sm", "!w-4", "!h-4"], [1, "flex", "flex-wrap", "gap-1.5", "mt-2"], ["class", "inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md \n                 bg-gray-100 text-gray-700 border border-gray-200\n                 transition-all duration-200 hover:bg-gray-200", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "inline-flex", "items-center", "gap-1.5", "px-2.5", "py-1.5", "text-xs", "font-medium", "rounded-md", "bg-gray-100", "text-gray-700", "border", "border-gray-200", "transition-all", "duration-200", "hover:bg-gray-200"], [1, "truncate", "max-w-[120px]"], ["type", "button", "class", "flex items-center justify-center w-4 h-4 rounded hover:bg-gray-300 transition-colors -mr-0.5", 3, "click", 4, "ngIf"], ["type", "button", 1, "flex", "items-center", "justify-center", "w-4", "h-4", "rounded", "hover:bg-gray-300", "transition-colors", "-mr-0.5", 3, "click"], [1, "!text-xs", "!w-3", "!h-3", "text-gray-500"], [3, "click", "value"], [1, "flex", "flex-col", "w-full", "max-w-md", "bg-white", "rounded-2xl", "overflow-hidden"], [1, "flex", "items-center", "justify-between", "px-4", "py-3", "border-b", "border-gray-100", "bg-white"], [1, "text-lg", "font-semibold", "text-gray-900"], ["mat-icon-button", "", 1, "!-mr-2", 3, "click"], [1, "!p-4", "!max-h-[60vh]"], [1, "space-y-4"], ["appearance", "outline", "subscriptSizing", "dynamic", 1, "w-full"], ["matInput", "", "placeholder", "Nh\u1EADp t\xEAn nh\xF3m kh\xE1ch h\xE0ng", "required", "", 3, "ngModelChange", "ngModel"], [1, "text-gray-500"], ["matInput", "", "placeholder", "Nh\u1EADp m\xF4 t\u1EA3 cho nh\xF3m (kh\xF4ng b\u1EAFt bu\u1ED9c)", "rows", "3", 3, "ngModelChange", "ngModel"], [1, "!px-4", "!py-3", "border-t", "border-gray-100", "bg-gray-50", "!justify-end", "gap-2"], ["mat-stroked-button", "", 1, "!min-w-[80px]", 3, "click"], ["mat-flat-button", "", "color", "primary", 1, "!min-w-[100px]", 3, "click", "disabled"], ["class", "animate-spin !mr-1", 4, "ngIf"], [1, "animate-spin", "!mr-1"]], template: function DetailKhachhangComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 5)(1, "button", 6);
      \u0275\u0275listener("click", function DetailKhachhangComponent_Template_button_click_1_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.goBack());
      });
      \u0275\u0275elementStart(2, "mat-icon");
      \u0275\u0275text(3, "arrow_back");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(4, "div", 7);
      \u0275\u0275text(5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "div", 8)(7, "mat-slide-toggle", 9);
      \u0275\u0275listener("change", function DetailKhachhangComponent_Template_mat_slide_toggle_change_7_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.updateIsActive($event));
      });
      \u0275\u0275text(8);
      \u0275\u0275elementEnd();
      \u0275\u0275template(9, DetailKhachhangComponent_button_9_Template, 3, 0, "button", 10)(10, DetailKhachhangComponent_button_10_Template, 3, 0, "button", 10);
      \u0275\u0275elementStart(11, "button", 11);
      \u0275\u0275listener("click", function DetailKhachhangComponent_Template_button_click_11_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.toggleDelete());
      });
      \u0275\u0275elementStart(12, "mat-icon");
      \u0275\u0275text(13, "delete");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(14, "div", 12);
      \u0275\u0275template(15, DetailKhachhangComponent_ng_container_15_Template, 9, 0, "ng-container", 13)(16, DetailKhachhangComponent_ng_container_16_Template, 88, 54, "ng-container", 13);
      \u0275\u0275elementEnd();
      \u0275\u0275template(17, DetailKhachhangComponent_ng_template_17_Template, 27, 6, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      let tmp_1_0;
      let tmp_2_0;
      let tmp_4_0;
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(((tmp_1_0 = ctx.DetailKhachhang()) == null ? null : tmp_1_0.name) || "Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u");
      \u0275\u0275advance(2);
      \u0275\u0275property("checked", (tmp_2_0 = ctx.DetailKhachhang()) == null ? null : tmp_2_0.isActive)("disabled", !ctx.isEdit());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate(((tmp_4_0 = ctx.DetailKhachhang()) == null ? null : tmp_4_0.isActive) ? "Hi\u1EC3n Th\u1ECB" : "\u1EA8n");
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
    MatHint,
    MatInputModule,
    MatInput,
    FormsModule,
    DefaultValueAccessor,
    NgControlStatus,
    RequiredValidator,
    NgModel,
    MatIconModule,
    MatIcon,
    MatButtonModule,
    MatButton,
    MatIconButton,
    MatSelectModule,
    MatOption,
    MatDialogModule,
    MatDialogActions,
    MatDialogContent,
    CommonModule,
    NgForOf,
    NgIf,
    MatSlideToggleModule,
    MatSlideToggle,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatAutocomplete,
    MatAutocompleteTrigger
  ], styles: ["\n\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@keyframes _ngcontent-%COMP%_slideUp {\n  from {\n    transform: translateY(100%);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n@keyframes _ngcontent-%COMP%_spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n.animate-fadeIn[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeIn 0.2s ease-out;\n}\n.animate-slideUp[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_slideUp 0.3s ease-out;\n}\n.animate-spin[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n}\n.bg-primary-50[_ngcontent-%COMP%] {\n  background-color: rgb(239, 246, 255) !important;\n}\n.bg-primary-100[_ngcontent-%COMP%] {\n  background-color: rgb(219, 234, 254) !important;\n}\n.bg-primary-200[_ngcontent-%COMP%] {\n  background-color: rgb(191, 219, 254) !important;\n}\n.bg-primary-300[_ngcontent-%COMP%] {\n  background-color: rgb(147, 197, 253) !important;\n}\n.text-primary-600[_ngcontent-%COMP%] {\n  color: rgb(37, 99, 235) !important;\n}\n.text-primary-700[_ngcontent-%COMP%] {\n  color: rgb(29, 78, 216) !important;\n}\n.text-primary-800[_ngcontent-%COMP%] {\n  color: rgb(30, 64, 175) !important;\n}\n.border-primary-200[_ngcontent-%COMP%] {\n  border-color: rgb(191, 219, 254) !important;\n}\n  .nhomkh-panel {\n  max-height: 300px !important;\n}\n  .nhomkh-panel .mat-mdc-option {\n  min-height: 44px;\n  padding: 8px 16px;\n}\n  .nhomkh-panel .mat-mdc-option:first-child {\n  border-bottom: 1px solid rgb(229, 231, 235);\n  background-color: rgb(249, 250, 251);\n}\n  .nhomkh-panel .mat-mdc-option:first-child:hover {\n  background-color: rgb(239, 246, 255);\n}\n  .nhomkh-create-dialog .mat-mdc-dialog-container {\n  padding: 0 !important;\n}\n  .nhomkh-create-dialog .mat-mdc-dialog-container .mdc-dialog__surface {\n  border-radius: 16px !important;\n  overflow: hidden;\n}\n@media (max-width: 767px) {\n    .nhomkh-create-dialog .mat-mdc-dialog-container .mdc-dialog__surface {\n    border-radius: 16px 16px 0 0 !important;\n  }\n}\n[_nghost-%COMP%]     .mat-mdc-form-field {\n  width: 100%;\n}\n[_nghost-%COMP%]     .mat-mdc-form-field .mat-mdc-text-field-wrapper {\n  background-color: white;\n}\n@media (max-width: 640px) {\n  [_nghost-%COMP%]   .grid.grid-cols-2[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.rounded-full[_ngcontent-%COMP%] {\n  border-radius: 9999px;\n}\n.transition-all[_ngcontent-%COMP%] {\n  transition-property: all;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 150ms;\n}\n.transition-colors[_ngcontent-%COMP%] {\n  transition-property:\n    color,\n    background-color,\n    border-color;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 150ms;\n}\n.hover\\:bg-primary-200[_ngcontent-%COMP%]:hover {\n  background-color: rgb(191, 219, 254) !important;\n}\n.hover\\:bg-primary-300[_ngcontent-%COMP%]:hover {\n  background-color: rgb(147, 197, 253) !important;\n}\n.col-span-2[_ngcontent-%COMP%] {\n  grid-column: span 2/span 2;\n}\n@media (max-width: 768px) {\n  .col-span-2[_ngcontent-%COMP%] {\n    grid-column: span 1/span 1;\n  }\n}\n.bg-primary-500[_ngcontent-%COMP%] {\n  background-color: rgb(59, 130, 246) !important;\n}\n.bg-primary-600[_ngcontent-%COMP%] {\n  background-color: rgb(37, 99, 235) !important;\n}\n.bg-primary-700[_ngcontent-%COMP%] {\n  background-color: rgb(29, 78, 216) !important;\n}\n.bg-primary-800[_ngcontent-%COMP%] {\n  background-color: rgb(30, 64, 175) !important;\n}\n.border-primary-500[_ngcontent-%COMP%] {\n  border-color: rgb(59, 130, 246) !important;\n}\n.ring-primary-500[_ngcontent-%COMP%] {\n  --tw-ring-color: rgb(59 130 246 / 0.5);\n}\n.text-primary-500[_ngcontent-%COMP%] {\n  color: rgb(59, 130, 246) !important;\n}\n.nhom-dropdown-trigger[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  width: 100%;\n  min-height: 44px;\n  padding: 0.5rem 0.75rem;\n  font-size: 0.875rem;\n  background-color: white;\n  border: 1px solid rgb(229, 231, 235);\n  border-radius: 0.5rem;\n  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);\n  transition: all 0.2s;\n  touch-action: manipulation;\n  -webkit-tap-highlight-color: transparent;\n}\n.nhom-dropdown-trigger[_ngcontent-%COMP%]:hover {\n  border-color: rgb(209, 213, 219);\n}\n.nhom-dropdown-trigger[_ngcontent-%COMP%]:focus {\n  outline: none;\n  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);\n  border-color: rgb(59, 130, 246);\n}\n.nhom-dropdown-trigger[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n  background-color: rgb(249, 250, 251);\n}\n.nhom-dropdown-trigger[_ngcontent-%COMP%]:active {\n  transform: scale(0.99);\n}\n.touch-manipulation[_ngcontent-%COMP%] {\n  touch-action: manipulation;\n  -webkit-tap-highlight-color: transparent;\n}\n.rotate-180[_ngcontent-%COMP%] {\n  transform: rotate(180deg);\n}\n@keyframes _ngcontent-%COMP%_dropdownFadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(-8px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n@keyframes _ngcontent-%COMP%_mobileSlideUp {\n  from {\n    opacity: 0;\n    transform: translateY(100%);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n@media (min-width: 768px) {\n  [_nghost-%COMP%]   .nhom-dropdown-panel[_ngcontent-%COMP%] {\n    animation: _ngcontent-%COMP%_dropdownFadeIn 0.15s ease-out;\n  }\n}\n@media (max-width: 767px) {\n  [_nghost-%COMP%]   .nhom-dropdown-panel[_ngcontent-%COMP%] {\n    animation: _ngcontent-%COMP%_mobileSlideUp 0.25s ease-out;\n  }\n}\n.overscroll-contain[_ngcontent-%COMP%] {\n  overscroll-behavior: contain;\n  -webkit-overflow-scrolling: touch;\n}\n.overflow-y-auto[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 6px;\n}\n.overflow-y-auto[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: transparent;\n}\n.overflow-y-auto[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background-color: rgb(209, 213, 219);\n  border-radius: 3px;\n}\n.overflow-y-auto[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background-color: rgb(156, 163, 175);\n}\n.focus\\:ring-2[_ngcontent-%COMP%]:focus {\n  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);\n}\n.focus\\:ring-offset-1[_ngcontent-%COMP%]:focus {\n  box-shadow: 0 0 0 1px white, 0 0 0 3px rgba(59, 130, 246, 0.3);\n}\n.nhom-checkbox[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 1.25rem;\n  height: 1.25rem;\n  border-radius: 0.25rem;\n  border: 2px solid rgb(209, 213, 219);\n  transition: all 0.2s;\n}\n.nhom-checkbox.checked[_ngcontent-%COMP%] {\n  border-color: rgb(59, 130, 246);\n  background-color: rgb(59, 130, 246);\n}\n.nhom-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.375rem;\n  padding: 0.375rem 0.625rem;\n  font-size: 0.75rem;\n  font-weight: 500;\n  border-radius: 0.375rem;\n  background-color: rgb(243, 244, 246);\n  color: rgb(55, 65, 81);\n  border: 1px solid rgb(229, 231, 235);\n  transition: all 0.2s;\n}\n.nhom-chip[_ngcontent-%COMP%]:hover {\n  background-color: rgb(229, 231, 235);\n}\n.nhom-chip[_ngcontent-%COMP%]:focus-within {\n  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);\n}\n.nhom-empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 2rem 1rem;\n  text-align: center;\n}\n.nhom-empty-state[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: rgb(209, 213, 219);\n  font-size: 48px !important;\n  width: 48px !important;\n  height: 48px !important;\n}\n.nhom-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background-color: rgba(0, 0, 0, 0.2);\n  z-index: 40;\n  backdrop-filter: blur(2px);\n  -webkit-backdrop-filter: blur(2px);\n}\n@supports (padding-bottom: env(safe-area-inset-bottom)) {\n  .nhom-mobile-footer[_ngcontent-%COMP%] {\n    padding-bottom: calc(0.75rem + env(safe-area-inset-bottom));\n  }\n}\n/*# sourceMappingURL=detailkhachhang.component.css.map */"] });
};
__decorate([
  Debounce(150)
], DetailKhachhangComponent.prototype, "onNhomSearchInput", null);
__decorate([
  Debounce(300)
], DetailKhachhangComponent.prototype, "autoSubtitle", null);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DetailKhachhangComponent, { className: "DetailKhachhangComponent", filePath: "src/app/admin/khachhang/detailkhachhang/detailkhachhang.component.ts", lineNumber: 50 });
})();
export {
  DetailKhachhangComponent
};
//# sourceMappingURL=chunk-TSMYSPRU.mjs.map
