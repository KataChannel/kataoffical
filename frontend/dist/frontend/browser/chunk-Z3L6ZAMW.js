import {
  ListChotkhoComponent
} from "./chunk-ZPHGGJKU.js";
import {
  ReconciliationDialogComponent
} from "./chunk-TVI6FWAK.js";
import {
  KhoService
} from "./chunk-WSPM3ROW.js";
import {
  ChotkhoService
} from "./chunk-FODOJXS2.js";
import "./chunk-42RMCTZZ.js";
import "./chunk-TK4U3V5E.js";
import {
  SanphamService
} from "./chunk-OYBNSF2S.js";
import "./chunk-FTMLWTPE.js";
import "./chunk-7SCXXJPI.js";
import "./chunk-4I62SID5.js";
import {
  MatSort,
  MatSortHeader,
  MatSortModule
} from "./chunk-DR2JAJDC.js";
import "./chunk-R5HFYA7U.js";
import {
  convertToSlug
} from "./chunk-I2ZL5X6B.js";
import {
  removeVietnameseAccents
} from "./chunk-MKCJCKWI.js";
import "./chunk-QY5L4FGH.js";
import {
  MatMenu,
  MatMenuModule,
  MatMenuTrigger
} from "./chunk-D7PAKJDY.js";
import {
  UserService
} from "./chunk-NL7URNET.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-2GXGFE2W.js";
import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-DGYBLSTA.js";
import "./chunk-F5CW4EPT.js";
import "./chunk-KFQ5QPP6.js";
import {
  MatSlideToggleModule
} from "./chunk-2WTGXRSQ.js";
import {
  MatDialog,
  MatDialogModule
} from "./chunk-Y6PF6L3J.js";
import {
  MatSnackBar
} from "./chunk-3D4DVDG5.js";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "./chunk-5Z5IQRCP.js";
import "./chunk-RYTJZHDX.js";
import "./chunk-FEROIANE.js";
import "./chunk-QEGCNOFQ.js";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatNoDataRow,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
  MatTableModule
} from "./chunk-SP2Z3Q73.js";
import "./chunk-4Q2WCKDS.js";
import "./chunk-TAPSLW5I.js";
import {
  MatSelect,
  MatSelectModule
} from "./chunk-GQA7LESQ.js";
import {
  MatInput,
  MatInputModule
} from "./chunk-FRF6QBEZ.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MatFormField,
  MatFormFieldModule,
  MatLabel,
  MatSuffix,
  NgControlStatus,
  NgModel
} from "./chunk-TMSN764N.js";
import {
  MatIcon,
  MatIconModule
} from "./chunk-GSONKL3O.js";
import "./chunk-DKLGAVRA.js";
import "./chunk-6PYLDKWR.js";
import {
  MatButton,
  MatButtonModule,
  MatIconButton
} from "./chunk-FL6G6YYX.js";
import {
  MatNativeDateModule,
  MatOption
} from "./chunk-EPU6HK6I.js";
import "./chunk-XM7PTE63.js";
import {
  CommonModule,
  DecimalPipe,
  NgClass,
  NgForOf,
  NgIf
} from "./chunk-TAI2MURD.js";
import {
  effect,
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵdefer,
  ɵɵdeferOnIdle,
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
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-SEHLAVZZ.js";
import "./chunk-E3MB3462.js";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-SXK72SKC.js";

// src/app/admin/chotkho/detailchotkho/detailchotkho.ts
var DetailChotkhoComponent_ng_container_10_div_3_div_1_Defer_2_DepsFn = () => [MatIcon, MatButton, MatIconButton, MatMenu, MatMenuTrigger, NgForOf, NgIf];
function DetailChotkhoComponent_button_7_mat_icon_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "save");
    \u0275\u0275elementEnd();
  }
}
function DetailChotkhoComponent_button_7_mat_spinner_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 14);
  }
}
function DetailChotkhoComponent_button_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 12);
    \u0275\u0275listener("click", function DetailChotkhoComponent_button_7_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.handleChotkhoAction());
    });
    \u0275\u0275template(1, DetailChotkhoComponent_button_7_mat_icon_1_Template, 2, 0, "mat-icon", 11)(2, DetailChotkhoComponent_button_7_mat_spinner_2_Template, 1, 0, "mat-spinner", 13);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", ctx_r1.isSaving());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.isSaving());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isSaving());
  }
}
function DetailChotkhoComponent_ng_container_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 15)(2, "div", 16);
    \u0275\u0275text(3, "B\u1EA1n ch\u1EAFc ch\u1EAFn mu\u1ED1n xo\xE1 kh\xF4ng?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 17)(5, "button", 18);
    \u0275\u0275listener("click", function DetailChotkhoComponent_ng_container_9_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.DeleteData());
    });
    \u0275\u0275text(6, "\u0110\u1ED3ng \xDD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 19);
    \u0275\u0275listener("click", function DetailChotkhoComponent_ng_container_9_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleDelete());
    });
    \u0275\u0275text(8, "Hu\u1EF7 B\u1ECF");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementContainerEnd();
  }
}
function DetailChotkhoComponent_ng_container_10_div_1_mat_option_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 34);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const kho_r5 = ctx.$implicit;
    \u0275\u0275property("value", kho_r5.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", kho_r5.name, " ");
  }
}
function DetailChotkhoComponent_ng_container_10_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 23)(1, "h3", 24);
    \u0275\u0275text(2, " Th\xF4ng tin ch\u1ED1t kho [H\u1EC7 th\u1ED1ng \u0111\xE3 c\u1EADp nh\u1EADt] ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 25)(4, "mat-form-field", 26)(5, "mat-label");
    \u0275\u0275text(6, "Ti\xEAu \u0110\u1EC1");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "input", 27);
    \u0275\u0275twoWayListener("ngModelChange", function DetailChotkhoComponent_ng_container_10_div_1_Template_input_ngModelChange_7_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailChotkho().title, $event) || (ctx_r1.DetailChotkho().title = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "mat-form-field", 26)(9, "mat-label");
    \u0275\u0275text(10, "Ng\xE0y Ch\u1ED1t");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "input", 28);
    \u0275\u0275twoWayListener("ngModelChange", function DetailChotkhoComponent_ng_container_10_div_1_Template_input_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailChotkho().ngaychot, $event) || (ctx_r1.DetailChotkho().ngaychot = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275element(12, "mat-datepicker-toggle", 29)(13, "mat-datepicker", null, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "mat-form-field", 26)(16, "mat-label");
    \u0275\u0275text(17, "Kho H\xE0ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "mat-select", 30);
    \u0275\u0275twoWayListener("ngModelChange", function DetailChotkhoComponent_ng_container_10_div_1_Template_mat_select_ngModelChange_18_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailChotkho().khoId, $event) || (ctx_r1.DetailChotkho().khoId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("selectionChange", function DetailChotkhoComponent_ng_container_10_div_1_Template_mat_select_selectionChange_18_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onWarehouseChange($event.value));
    });
    \u0275\u0275template(19, DetailChotkhoComponent_ng_container_10_div_1_mat_option_19_Template, 2, 2, "mat-option", 31);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "mat-form-field", 32)(21, "mat-label");
    \u0275\u0275text(22, "Ghi Ch\xFA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "textarea", 33);
    \u0275\u0275twoWayListener("ngModelChange", function DetailChotkhoComponent_ng_container_10_div_1_Template_textarea_ngModelChange_23_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailChotkho().ghichu, $event) || (ctx_r1.DetailChotkho().ghichu = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const picker_r6 = \u0275\u0275reference(14);
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailChotkho().title);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
    \u0275\u0275advance(4);
    \u0275\u0275property("matDatepicker", picker_r6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailChotkho().ngaychot);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
    \u0275\u0275advance();
    \u0275\u0275property("for", picker_r6);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailChotkho().khoId);
    \u0275\u0275property("disabled", !ctx_r1.isEdit() || ctx_r1.DetailChotkho().id);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.ListKho());
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailChotkho().ghichu);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
  }
}
function DetailChotkhoComponent_ng_container_10_div_2_div_14_span_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 51);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const sp_r10 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", sp_r10.sanpham == null ? null : sp_r10.sanpham.title, ": ", sp_r10.sldat, " ");
  }
}
function DetailChotkhoComponent_ng_container_10_div_2_div_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 44);
    \u0275\u0275listener("click", function DetailChotkhoComponent_ng_container_10_div_2_div_14_Template_div_click_0_listener() {
      const order_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.toggleOrderSelection(order_r9.id));
    });
    \u0275\u0275elementStart(1, "mat-icon", 45);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 46)(4, "div", 47);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 48);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 49);
    \u0275\u0275template(9, DetailChotkhoComponent_ng_container_10_div_2_div_14_span_9_Template, 2, 2, "span", 50);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const order_r9 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("ngClass", ctx_r1.selectedOrderIds().includes(order_r9.id) ? "border-blue-500 shadow-sm" : "border-slate-100 hover:border-slate-200");
    \u0275\u0275advance();
    \u0275\u0275property("color", ctx_r1.selectedOrderIds().includes(order_r9.id) ? "primary" : "");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.selectedOrderIds().includes(order_r9.id) ? "check_box" : "check_box_outline_blank", " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(order_r9.madncc);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(order_r9.nhacungcap == null ? null : order_r9.nhacungcap.name);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", order_r9.sanpham);
  }
}
function DetailChotkhoComponent_ng_container_10_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 35)(1, "div", 36)(2, "div", 37)(3, "mat-icon", 38);
    \u0275\u0275text(4, "assignment_turned_in");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "h4", 39);
    \u0275\u0275text(6, 'X\xE1c nh\u1EADn \u0111\u01A1n h\xE0ng "Qu\xEAn" (X\u1EED l\xFD b\xF9 ch\xEAnh l\u1EC7ch)');
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "button", 40);
    \u0275\u0275listener("click", function DetailChotkhoComponent_ng_container_10_div_2_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.autoSelectRelevantOrders());
    });
    \u0275\u0275elementStart(8, "mat-icon");
    \u0275\u0275text(9, "auto_awesome");
    \u0275\u0275elementEnd();
    \u0275\u0275text(10, " T\u1EF1 ch\u1ECDn li\xEAn quan ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "p", 41);
    \u0275\u0275text(12, ' * C\xE1c \u0111\u01A1n h\xE0ng b\u1EA1n ch\u1ECDn d\u01B0\u1EDBi \u0111\xE2y s\u1EBD \u0111\u01B0\u1EE3c t\u1EF1 \u0111\u1ED9ng chuy\u1EC3n sang tr\u1EA1ng th\xE1i "\u0110\xE3 nh\u1EADn" khi b\u1EA1n l\u01B0u phi\xEAn ch\u1ED1t kho n\xE0y. ');
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 42);
    \u0275\u0275template(14, DetailChotkhoComponent_ng_container_10_div_2_div_14_Template, 10, 6, "div", 43);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(14);
    \u0275\u0275property("ngForOf", ctx_r1.pendingOrders());
  }
}
function DetailChotkhoComponent_ng_container_10_div_3_div_1_Defer_1_div_30_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 95);
    \u0275\u0275text(1, "check_box");
    \u0275\u0275elementEnd();
  }
}
function DetailChotkhoComponent_ng_container_10_div_3_div_1_Defer_1_div_30_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 96);
    \u0275\u0275text(1, "check_box_outline_blank");
    \u0275\u0275elementEnd();
  }
}
function DetailChotkhoComponent_ng_container_10_div_3_div_1_Defer_1_div_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 89);
    \u0275\u0275listener("click", function DetailChotkhoComponent_ng_container_10_div_3_div_1_Defer_1_div_30_Template_div_click_0_listener() {
      const item_r14 = \u0275\u0275restoreView(_r13).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r1.ChosenItem(item_r14));
    });
    \u0275\u0275template(1, DetailChotkhoComponent_ng_container_10_div_3_div_1_Defer_1_div_30_span_1_Template, 2, 0, "span", 90)(2, DetailChotkhoComponent_ng_container_10_div_3_div_1_Defer_1_div_30_span_2_Template, 2, 0, "span", 91);
    \u0275\u0275elementStart(3, "div", 92)(4, "span", 93);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 94);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r14 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.CheckItem(item_r14));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.CheckItem(item_r14));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r14.title || "Ch\u01B0a C\xF3 T\xEAn");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("M\xE3: ", item_r14.masp, " - \u0110VT: ", item_r14.dvt, "");
  }
}
function DetailChotkhoComponent_ng_container_10_div_3_div_1_Defer_1_div_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 97);
    \u0275\u0275text(1, " Kh\xF4ng c\xF3 s\u1EA3n ph\u1EA9m kh\u1EA3 d\u1EE5ng ");
    \u0275\u0275elementEnd();
  }
}
function DetailChotkhoComponent_ng_container_10_div_3_div_1_Defer_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 65)(1, "div", 66)(2, "button", 67, 1)(4, "mat-icon");
    \u0275\u0275text(5, "inventory");
    \u0275\u0275elementEnd();
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "mat-menu", null, 2)(9, "div", 68);
    \u0275\u0275listener("click", function DetailChotkhoComponent_ng_container_10_div_3_div_1_Defer_1_Template_div_click_9_listener($event) {
      \u0275\u0275restoreView(_r12);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(10, "div", 69)(11, "div", 70);
    \u0275\u0275text(12, "T\xECnh tr\u1EA1ng s\u1EA3n ph\u1EA9m:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 71);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 72)(16, "input", 73, 3);
    \u0275\u0275listener("keyup", function DetailChotkhoComponent_ng_container_10_div_3_div_1_Defer_1_Template_input_keyup_16_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.doFilterSanpham($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 74)(19, "span", 75);
    \u0275\u0275text(20, "search");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(21, "div", 76)(22, "div", 8)(23, "span", 77);
    \u0275\u0275listener("click", function DetailChotkhoComponent_ng_container_10_div_3_div_1_Defer_1_Template_span_click_23_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.ChosenAll(ctx_r1.ListSanpham));
    });
    \u0275\u0275text(24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "span", 78);
    \u0275\u0275listener("click", function DetailChotkhoComponent_ng_container_10_div_3_div_1_Defer_1_Template_span_click_25_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.EmptyFiter());
    });
    \u0275\u0275text(26, "Xo\xE1 T\u1EA5t C\u1EA3");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "span", 79);
    \u0275\u0275listener("click", function DetailChotkhoComponent_ng_container_10_div_3_div_1_Defer_1_Template_span_click_27_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.ResetFilter());
    });
    \u0275\u0275text(28, "L\xE0m M\u1EDBi");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "div", 80);
    \u0275\u0275template(30, DetailChotkhoComponent_ng_container_10_div_3_div_1_Defer_1_div_30_Template, 8, 5, "div", 81)(31, DetailChotkhoComponent_ng_container_10_div_3_div_1_Defer_1_div_31_Template, 2, 0, "div", 82);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "div", 83)(33, "button", 19);
    \u0275\u0275listener("click", function DetailChotkhoComponent_ng_container_10_div_3_div_1_Defer_1_Template_button_click_33_listener() {
      \u0275\u0275restoreView(_r12);
      const menuTrigger_r15 = \u0275\u0275reference(3);
      return \u0275\u0275resetView(menuTrigger_r15.closeMenu());
    });
    \u0275\u0275text(34, "\u0110\xF3ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "button", 18);
    \u0275\u0275listener("click", function DetailChotkhoComponent_ng_container_10_div_3_div_1_Defer_1_Template_button_click_35_listener() {
      \u0275\u0275restoreView(_r12);
      const menuTrigger_r15 = \u0275\u0275reference(3);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.ApplyFilterColum(menuTrigger_r15));
    });
    \u0275\u0275text(36, "\xC1p D\u1EE5ng");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(37, "div", 84)(38, "button", 85);
    \u0275\u0275listener("click", function DetailChotkhoComponent_ng_container_10_div_3_div_1_Defer_1_Template_button_click_38_listener() {
      \u0275\u0275restoreView(_r12);
      const uploadfile_r16 = \u0275\u0275reference(42);
      return \u0275\u0275resetView(uploadfile_r16.click());
    });
    \u0275\u0275elementStart(39, "mat-icon");
    \u0275\u0275text(40, "file_upload");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(41, "input", 86, 4);
    \u0275\u0275listener("change", function DetailChotkhoComponent_ng_container_10_div_3_div_1_Defer_1_Template_input_change_41_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.ImportExcel($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "button", 87);
    \u0275\u0275listener("click", function DetailChotkhoComponent_ng_container_10_div_3_div_1_Defer_1_Template_button_click_43_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.ExportExample());
    });
    \u0275\u0275elementStart(44, "mat-icon");
    \u0275\u0275text(45, "file_download");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(46, "button", 88);
    \u0275\u0275listener("click", function DetailChotkhoComponent_ng_container_10_div_3_div_1_Defer_1_Template_button_click_46_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.EmptyCart());
    });
    \u0275\u0275elementStart(47, "mat-icon");
    \u0275\u0275text(48, "delete");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const menu_r17 = \u0275\u0275reference(8);
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx_r1.isEdit())("matMenuTriggerFor", menu_r17);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.ListFilter.length, " S\u1EA3n Ph\u1EA9m \u0110\xE3 Ch\u1ECDn ");
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate3(" \u2022 ", ctx_r1.ListFilter.length, " s\u1EA3n ph\u1EA9m \u0111\xE3 ch\u1ECDn \u2022 ", ctx_r1.ListSanpham.length - ctx_r1.ListFilter.length, " s\u1EA3n ph\u1EA9m kh\u1EA3 d\u1EE5ng \u2022 ", ctx_r1.ListSanpham.length, " t\u1ED5ng s\u1EA3n ph\u1EA9m ");
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate1("Ch\u1ECDn T\u1EA5t C\u1EA3 (", ctx_r1.ListSanpham.length - ctx_r1.ListFilter.length, " s\u1EA3n ph\u1EA9m kh\u1EA3 d\u1EE5ng)");
    \u0275\u0275advance(6);
    \u0275\u0275property("ngForOf", ctx_r1.getFilteredSanpham())("ngForTrackBy", ctx_r1.trackByFn);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.ListSanpham.length === 0);
    \u0275\u0275advance(15);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
  }
}
function DetailChotkhoComponent_ng_container_10_div_3_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 64);
    \u0275\u0275template(1, DetailChotkhoComponent_ng_container_10_div_3_div_1_Defer_1_Template, 49, 11);
    \u0275\u0275defer(2, 1, DetailChotkhoComponent_ng_container_10_div_3_div_1_Defer_2_DepsFn);
    \u0275\u0275deferOnIdle();
    \u0275\u0275elementEnd();
  }
}
function DetailChotkhoComponent_ng_container_10_div_3_For_12_th_1_br_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "br");
  }
}
function DetailChotkhoComponent_ng_container_10_div_3_For_12_th_1_small_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 103);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const column_r18 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" (", ctx_r1.ColumnDesc[column_r18], ") ");
  }
}
function DetailChotkhoComponent_ng_container_10_div_3_For_12_th_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 100)(1, "span", 101);
    \u0275\u0275text(2);
    \u0275\u0275template(3, DetailChotkhoComponent_ng_container_10_div_3_For_12_th_1_br_3_Template, 1, 0, "br", 11)(4, DetailChotkhoComponent_ng_container_10_div_3_For_12_th_1_small_4_Template, 2, 1, "small", 102);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const column_r18 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.ColumnName[column_r18], " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.ColumnDesc[column_r18]);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.ColumnDesc[column_r18]);
  }
}
function DetailChotkhoComponent_ng_container_10_div_3_For_12_td_2_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 105)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 109);
    \u0275\u0275listener("click", function DetailChotkhoComponent_ng_container_10_div_3_For_12_td_2_Case_1_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r19);
      const row_r20 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.RemoveSanpham(row_r20));
    });
    \u0275\u0275elementStart(4, "mat-icon");
    \u0275\u0275text(5, "delete");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const idx_r21 = \u0275\u0275nextContext().index;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", idx_r21 + 1, " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
  }
}
function DetailChotkhoComponent_ng_container_10_div_3_For_12_td_2_Case_2_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 112);
    \u0275\u0275listener("blur", function DetailChotkhoComponent_ng_container_10_div_3_For_12_td_2_Case_2_div_0_Template_div_blur_0_listener($event) {
      \u0275\u0275restoreView(_r22);
      const ctx_r22 = \u0275\u0275nextContext(2);
      const row_r20 = ctx_r22.$implicit;
      const idx_r21 = ctx_r22.index;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.updateValue($event, idx_r21, row_r20, "sltonthucte", "number"));
    })("keydown.enter", function DetailChotkhoComponent_ng_container_10_div_3_For_12_td_2_Case_2_div_0_Template_div_keydown_enter_0_listener($event) {
      \u0275\u0275restoreView(_r22);
      const ctx_r22 = \u0275\u0275nextContext(2);
      const row_r20 = ctx_r22.$implicit;
      const idx_r21 = ctx_r22.index;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.updateValue($event, idx_r21, row_r20, "sltonthucte", "number"));
    });
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r20 = \u0275\u0275nextContext(2).$implicit;
    const column_r18 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("contentEditable", true);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 2, row_r20[column_r18] || 0, "1.0-3"), " ");
  }
}
function DetailChotkhoComponent_ng_container_10_div_3_For_12_td_2_Case_2_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 108);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r20 = \u0275\u0275nextContext(2).$implicit;
    const column_r18 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r20[column_r18], "1.0-3"), " ");
  }
}
function DetailChotkhoComponent_ng_container_10_div_3_For_12_td_2_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, DetailChotkhoComponent_ng_container_10_div_3_For_12_td_2_Case_2_div_0_Template, 3, 5, "div", 110)(1, DetailChotkhoComponent_ng_container_10_div_3_For_12_td_2_Case_2_span_1_Template, 3, 4, "span", 111);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275property("ngIf", ctx_r1.isEdit());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.isEdit());
  }
}
function DetailChotkhoComponent_ng_container_10_div_3_For_12_td_2_Case_3_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r24 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 114);
    \u0275\u0275listener("blur", function DetailChotkhoComponent_ng_container_10_div_3_For_12_td_2_Case_3_div_0_Template_div_blur_0_listener($event) {
      \u0275\u0275restoreView(_r24);
      const ctx_r22 = \u0275\u0275nextContext(2);
      const row_r20 = ctx_r22.$implicit;
      const idx_r21 = ctx_r22.index;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.updateValue($event, idx_r21, row_r20, "slhuy", "number"));
    })("keydown.enter", function DetailChotkhoComponent_ng_container_10_div_3_For_12_td_2_Case_3_div_0_Template_div_keydown_enter_0_listener($event) {
      \u0275\u0275restoreView(_r24);
      const ctx_r22 = \u0275\u0275nextContext(2);
      const row_r20 = ctx_r22.$implicit;
      const idx_r21 = ctx_r22.index;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.updateValue($event, idx_r21, row_r20, "slhuy", "number"));
    });
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r20 = \u0275\u0275nextContext(2).$implicit;
    const column_r18 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("contentEditable", true);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 2, row_r20[column_r18] || 0, "1.0-3"), " ");
  }
}
function DetailChotkhoComponent_ng_container_10_div_3_For_12_td_2_Case_3_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 108);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r20 = \u0275\u0275nextContext(2).$implicit;
    const column_r18 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r20[column_r18], "1.0-3"), " ");
  }
}
function DetailChotkhoComponent_ng_container_10_div_3_For_12_td_2_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, DetailChotkhoComponent_ng_container_10_div_3_For_12_td_2_Case_3_div_0_Template, 3, 5, "div", 113)(1, DetailChotkhoComponent_ng_container_10_div_3_For_12_td_2_Case_3_span_1_Template, 3, 4, "span", 111);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275property("ngIf", ctx_r1.isEdit() && ctx_r1._UserService.hasPermission("slhuyedit"));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.isEdit() || !ctx_r1._UserService.hasPermission("slhuyedit"));
  }
}
function DetailChotkhoComponent_ng_container_10_div_3_For_12_td_2_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 108);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r20 = \u0275\u0275nextContext().$implicit;
    const column_r18 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275classMap(row_r20[column_r18] > 0 ? "text-green-600" : row_r20[column_r18] < 0 ? "text-red-600" : "text-yellow-600");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 3, row_r20[column_r18], "1.0-3"), " ");
  }
}
function DetailChotkhoComponent_ng_container_10_div_3_For_12_td_2_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 107);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r20 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r20.title || (row_r20.sanpham == null ? null : row_r20.sanpham.title), " ");
  }
}
function DetailChotkhoComponent_ng_container_10_div_3_For_12_td_2_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 107);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r20 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r20.masp || (row_r20.sanpham == null ? null : row_r20.sanpham.masp), " ");
  }
}
function DetailChotkhoComponent_ng_container_10_div_3_For_12_td_2_Case_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 107);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r20 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r20.dvt || (row_r20.sanpham == null ? null : row_r20.sanpham.dvt), " ");
  }
}
function DetailChotkhoComponent_ng_container_10_div_3_For_12_td_2_Case_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 108);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r20 = \u0275\u0275nextContext().$implicit;
    const column_r18 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r20[column_r18], "1.0-3"), " ");
  }
}
function DetailChotkhoComponent_ng_container_10_div_3_For_12_td_2_Case_9_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r25 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 117);
    \u0275\u0275listener("blur", function DetailChotkhoComponent_ng_container_10_div_3_For_12_td_2_Case_9_div_0_Template_div_blur_0_listener($event) {
      \u0275\u0275restoreView(_r25);
      const ctx_r22 = \u0275\u0275nextContext(2);
      const row_r20 = ctx_r22.$implicit;
      const idx_r21 = ctx_r22.index;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.updateValue($event, idx_r21, row_r20, "ghichu", "string"));
    })("keydown.enter", function DetailChotkhoComponent_ng_container_10_div_3_For_12_td_2_Case_9_div_0_Template_div_keydown_enter_0_listener($event) {
      \u0275\u0275restoreView(_r25);
      const ctx_r22 = \u0275\u0275nextContext(2);
      const row_r20 = ctx_r22.$implicit;
      const idx_r21 = ctx_r22.index;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.updateValue($event, idx_r21, row_r20, "ghichu", "string"));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r20 = \u0275\u0275nextContext(2).$implicit;
    const column_r18 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("contentEditable", true);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r20[column_r18] || "", " ");
  }
}
function DetailChotkhoComponent_ng_container_10_div_3_For_12_td_2_Case_9_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 107);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r20 = \u0275\u0275nextContext(2).$implicit;
    const column_r18 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r20[column_r18] || "", " ");
  }
}
function DetailChotkhoComponent_ng_container_10_div_3_For_12_td_2_Case_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, DetailChotkhoComponent_ng_container_10_div_3_For_12_td_2_Case_9_div_0_Template, 2, 2, "div", 115)(1, DetailChotkhoComponent_ng_container_10_div_3_For_12_td_2_Case_9_span_1_Template, 2, 1, "span", 116);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275property("ngIf", ctx_r1.isEdit());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.isEdit());
  }
}
function DetailChotkhoComponent_ng_container_10_div_3_For_12_td_2_Case_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 107);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r20 = \u0275\u0275nextContext().$implicit;
    const column_r18 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r20[column_r18], " ");
  }
}
function DetailChotkhoComponent_ng_container_10_div_3_For_12_td_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 104);
    \u0275\u0275template(1, DetailChotkhoComponent_ng_container_10_div_3_For_12_td_2_Case_1_Template, 6, 2, "span", 105)(2, DetailChotkhoComponent_ng_container_10_div_3_For_12_td_2_Case_2_Template, 2, 2)(3, DetailChotkhoComponent_ng_container_10_div_3_For_12_td_2_Case_3_Template, 2, 2)(4, DetailChotkhoComponent_ng_container_10_div_3_For_12_td_2_Case_4_Template, 3, 6, "span", 106)(5, DetailChotkhoComponent_ng_container_10_div_3_For_12_td_2_Case_5_Template, 2, 1, "span", 107)(6, DetailChotkhoComponent_ng_container_10_div_3_For_12_td_2_Case_6_Template, 2, 1, "span", 107)(7, DetailChotkhoComponent_ng_container_10_div_3_For_12_td_2_Case_7_Template, 2, 1, "span", 107)(8, DetailChotkhoComponent_ng_container_10_div_3_For_12_td_2_Case_8_Template, 3, 4, "span", 108)(9, DetailChotkhoComponent_ng_container_10_div_3_For_12_td_2_Case_9_Template, 2, 2)(10, DetailChotkhoComponent_ng_container_10_div_3_For_12_td_2_Case_10_Template, 2, 1, "span", 107);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_15_0;
    const column_r18 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_15_0 = column_r18) === "STT" ? 1 : tmp_15_0 === "sltonthucte" ? 2 : tmp_15_0 === "slhuy" ? 3 : tmp_15_0 === "chenhlech" ? 4 : tmp_15_0 === "title" ? 5 : tmp_15_0 === "masp" ? 6 : tmp_15_0 === "dvt" ? 7 : tmp_15_0 === "sltonhethong" ? 8 : tmp_15_0 === "ghichu" ? 9 : 10);
  }
}
function DetailChotkhoComponent_ng_container_10_div_3_For_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0, 60);
    \u0275\u0275template(1, DetailChotkhoComponent_ng_container_10_div_3_For_12_th_1_Template, 5, 3, "th", 98)(2, DetailChotkhoComponent_ng_container_10_div_3_For_12_td_2_Template, 11, 1, "td", 99);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const column_r18 = ctx.$implicit;
    \u0275\u0275property("matColumnDef", column_r18);
  }
}
function DetailChotkhoComponent_ng_container_10_div_3_tr_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 118);
  }
}
function DetailChotkhoComponent_ng_container_10_div_3_tr_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 119);
  }
}
function DetailChotkhoComponent_ng_container_10_div_3_tr_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 120)(1, "td", 121);
    \u0275\u0275text(2, "Kh\xF4ng t\xECm th\u1EA5y d\u1EEF li\u1EC7u");
    \u0275\u0275elementEnd()();
  }
}
function DetailChotkhoComponent_ng_container_10_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 52);
    \u0275\u0275template(1, DetailChotkhoComponent_ng_container_10_div_3_div_1_Template, 4, 0, "div", 53);
    \u0275\u0275elementStart(2, "div", 54)(3, "mat-form-field", 55)(4, "mat-label");
    \u0275\u0275text(5, "T\xECm ki\u1EBFm s\u1EA3n ph\u1EA9m trong danh s\xE1ch...");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "input", 56);
    \u0275\u0275listener("keyup", function DetailChotkhoComponent_ng_container_10_div_3_Template_input_keyup_6_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.applyFilter($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "mat-icon", 57);
    \u0275\u0275text(8, "search");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "div", 58)(10, "table", 59);
    \u0275\u0275repeaterCreate(11, DetailChotkhoComponent_ng_container_10_div_3_For_12_Template, 3, 1, "ng-container", 60, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275template(13, DetailChotkhoComponent_ng_container_10_div_3_tr_13_Template, 1, 0, "tr", 61)(14, DetailChotkhoComponent_ng_container_10_div_3_tr_14_Template, 1, 0, "tr", 62)(15, DetailChotkhoComponent_ng_container_10_div_3_tr_15_Template, 3, 0, "tr", 63);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isEdit());
    \u0275\u0275advance(9);
    \u0275\u0275property("dataSource", ctx_r1.dataSource());
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.displayedColumns);
    \u0275\u0275advance(2);
    \u0275\u0275property("matHeaderRowDef", ctx_r1.displayedColumns);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r1.displayedColumns);
  }
}
function DetailChotkhoComponent_ng_container_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, DetailChotkhoComponent_ng_container_10_div_1_Template, 24, 11, "div", 20)(2, DetailChotkhoComponent_ng_container_10_div_2_Template, 15, 1, "div", 21)(3, DetailChotkhoComponent_ng_container_10_div_3_Template, 16, 4, "div", 22);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.DetailChotkho());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isEdit() && ctx_r1.pendingOrders().length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.DetailChotkho());
  }
}
var DetailChotkhoComponent = class _DetailChotkhoComponent {
  ColumnDesc = {
    sltonhethong: "S\u1ED1 li\u1EC7u Snapshot",
    sltonthucte: "S\u1ED1 ki\u1EC3m \u0111\u1EBFm",
    slhuy: "H\xE0ng h\u01B0 h\u1ECFng",
    chenhlech: "H\u1EC7 th\u1ED1ng - Th\u1EF1c t\u1EBF"
  };
  _ListChotkhoComponent = inject(ListChotkhoComponent);
  _ChotkhoService = inject(ChotkhoService);
  _SanphamService = inject(SanphamService);
  _route = inject(ActivatedRoute);
  _router = inject(Router);
  _snackBar = inject(MatSnackBar);
  _dialog = inject(MatDialog);
  _UserService = inject(UserService);
  _KhoService = inject(KhoService);
  ListKho = signal([]);
  sort;
  // Table configuration
  dataSource = signal(new MatTableDataSource([]));
  displayedColumns = ["STT", "title", "masp", "dvt", "sltonhethong", "sltonthucte", "slhuy", "chenhlech", "ghichu"];
  ColumnName = {
    STT: "STT",
    title: "T\xEAn S\u1EA3n Ph\u1EA9m",
    masp: "M\xE3 SP",
    dvt: "\u0110\u01A1n V\u1ECB",
    sltonhethong: "SL H\u1EC7 Th\u1ED1ng",
    sltonthucte: "SL Th\u1EF1c T\u1EBF",
    slhuy: "SL H\u1EE7y",
    chenhlech: "Ch\xEAnh L\u1EC7ch",
    ghichu: "Ghi Ch\xFA"
  };
  // Initialize DetailChotkho with default structure
  DetailChotkho = signal({
    id: void 0,
    title: "",
    ngaychot: /* @__PURE__ */ new Date(),
    ghichu: "",
    khoId: "",
    userId: "",
    isActive: true,
    details: []
  });
  pendingOrders = signal([]);
  selectedOrderIds = signal([]);
  isPendingLoading = signal(false);
  isSaving = signal(false);
  constructor() {
    this._route.paramMap.subscribe((params) => {
      const id = params.get("id");
      this._ChotkhoService.setChotkhoId(id);
    });
    effect(() => __async(this, null, function* () {
      const serviceDetail = this._ChotkhoService.DetailChotkho();
      if (serviceDetail) {
        this.DetailChotkho.set(serviceDetail);
        this.dataSource.update((ds) => {
          ds.data = serviceDetail.details || [];
          return ds;
        });
        this.ListFilter = serviceDetail.details || [];
        if (this.ListSanpham.length > 0) {
          this.updateAvailableProducts();
        }
      }
    }));
    this.loadWarehouses();
  }
  isEdit = signal(false);
  isDelete = signal(false);
  chotkhoId = this._ChotkhoService.chotkhoId;
  // SearchFilter properties for product selection
  ListSanpham = [];
  filterSanpham = [];
  ListFilter = [];
  searchTerm = "";
  // Get filtered products for display in dropdown
  getFilteredSanpham() {
    if (!this.searchTerm || this.searchTerm.length < 2) {
      return this.ListSanpham;
    }
    const normalizedValue = removeVietnameseAccents(this.searchTerm.toLowerCase());
    return this.ListSanpham.filter((product) => {
      const normalizedTitle = removeVietnameseAccents(product.title?.toLowerCase() || "");
      const normalizedMasp = removeVietnameseAccents(product.masp?.toLowerCase() || "");
      return normalizedTitle.includes(normalizedValue) || normalizedMasp.includes(normalizedValue) || product.title?.toLowerCase().includes(this.searchTerm) || product.masp?.toLowerCase().includes(this.searchTerm);
    });
  }
  ngOnInit() {
    return __async(this, null, function* () {
      const id = this._ChotkhoService.chotkhoId();
      if (!id) {
        this._router.navigate(["/admin/chotkho"]);
        this._ListChotkhoComponent.drawer.close();
      }
      if (id === "new") {
        this.loadNewSanphamList();
        const newChotkhoData = {
          title: "Ch\u1ED1t Kho Ng\xE0y " + (/* @__PURE__ */ new Date()).toLocaleDateString(),
          ngaychot: /* @__PURE__ */ new Date(),
          ghichu: "",
          khoId: "",
          userId: "",
          isActive: true,
          details: []
        };
        this.DetailChotkho.set(newChotkhoData);
        this._ChotkhoService.DetailChotkho.set(newChotkhoData);
        this._ListChotkhoComponent.drawer.open();
        this.isEdit.update((value) => true);
        this._router.navigate(["/admin/chotkho", "new"]);
      } else if (id) {
        yield this._ChotkhoService.getChotkhoById(id);
        yield this.loadSanphamList();
        setTimeout(() => {
          const serviceData = this._ChotkhoService.DetailChotkho();
        }, 1e3);
        this._ListChotkhoComponent.drawer.open();
        this._router.navigate(["/admin/chotkho", id]);
      }
    });
  }
  ngAfterViewInit() {
    this.dataSource().sort = this.sort;
    this.dataSource().sortingDataAccessor = (item, property) => {
      switch (property) {
        case "title":
          return item.title || item.sanpham?.title || "";
        case "masp":
          return item.masp || item.sanpham?.masp || "";
        case "dvt":
          return item.dvt || item.sanpham?.dvt || "";
        default:
          return item[property];
      }
    };
    this.dataSource().filterPredicate = (data, filter) => {
      const term = filter.trim().toLowerCase();
      const title = (data.title || data.sanpham?.title || "").toLowerCase();
      const masp = (data.masp || data.sanpham?.masp || "").toLowerCase();
      const dvt = (data.dvt || data.sanpham?.dvt || "").toLowerCase();
      return title.includes(term) || masp.includes(term) || dvt.includes(term);
    };
  }
  handleChotkhoAction() {
    return __async(this, null, function* () {
      if (this.isSaving())
        return;
      const details = this.DetailChotkho()?.details || [];
      const discrepantItems = details.filter((item) => (item.chenhlech || 0) !== 0);
      if (discrepantItems.length > 0) {
        const dialogItems = discrepantItems.map((item) => ({
          sanphamId: item.sanphamId,
          masp: item.masp || item.sanpham?.masp || "",
          title: item.title || item.sanpham?.title || "",
          dvt: item.dvt || item.sanpham?.dvt || "",
          sltonhethong: Number(item.sltonhethong) || 0,
          sltonthucte: Number(item.sltonthucte) || 0,
          slhuy: Number(item.slhuy) || 0,
          chenhlech: Number(item.chenhlech) || 0,
          slDieuChinh: Number(item.sltonthucte) || 0,
          // Default is sltonthucte
          ghichuDieuChinh: ""
        }));
        const result = yield new Promise((resolve) => {
          const dialogRef = this._dialog.open(ReconciliationDialogComponent, {
            data: { items: dialogItems },
            width: "900px",
            disableClose: true
          });
          dialogRef.afterClosed().subscribe((res) => {
            resolve(res);
          });
        });
        if (!result) {
          return;
        }
        this.DetailChotkho.update((v) => {
          const updatedDetails = (v.details || []).map((detailItem) => {
            const adjustedItem = result.find((item) => item.sanphamId === detailItem.sanphamId);
            if (adjustedItem) {
              return __spreadProps(__spreadValues({}, detailItem), {
                sltonthucte: adjustedItem.slDieuChinh,
                slhuy: adjustedItem.slhuy,
                ghichu: adjustedItem.ghichuDieuChinh || detailItem.ghichu,
                chenhlech: adjustedItem.chenhlech
              });
            }
            return detailItem;
          });
          return __spreadProps(__spreadValues({}, v), {
            details: updatedDetails
          });
        });
        this.dataSource.update((ds) => {
          ds.data = [...this.DetailChotkho().details];
          ds.sort = this.sort;
          return ds;
        });
        this.ListFilter = this.DetailChotkho().details || [];
      }
      this.isSaving.set(true);
      try {
        if (this.chotkhoId() === "new") {
          yield this.createChotkho();
        } else {
          yield this.updateChotkho();
        }
      } finally {
        this.isSaving.set(false);
      }
    });
  }
  createChotkho() {
    return __async(this, null, function* () {
      try {
        const chotkhoData = __spreadProps(__spreadValues({}, this.DetailChotkho()), {
          confirmOrderIds: this.selectedOrderIds()
        });
        const result = yield this._ChotkhoService.createChotkhoWithDetails(chotkhoData);
        if (result && result.id) {
          this._router.navigate(["/admin/chotkho", result.id]);
        }
        this._snackBar.open("T\u1EA1o ch\u1ED1t kho th\xE0nh c\xF4ng", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        this.isEdit.update((value) => false);
      } catch (error) {
        console.error("L\u1ED7i khi t\u1EA1o ch\u1ED1t kho:", error);
        this._snackBar.open("L\u1ED7i khi t\u1EA1o ch\u1ED1t kho", "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      }
    });
  }
  updateChotkho() {
    return __async(this, null, function* () {
      try {
        const chotkhoData = this.DetailChotkho();
        if (chotkhoData?.id) {
          yield this._ChotkhoService.updateChotkhoWithDetails(chotkhoData.id, chotkhoData);
          this._snackBar.open("C\u1EADp nh\u1EADt th\xE0nh c\xF4ng", "", {
            duration: 1e3,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-success"]
          });
          this.isEdit.update((value) => false);
        }
      } catch (error) {
        console.error("L\u1ED7i khi c\u1EADp nh\u1EADt ch\u1ED1t kho:", error);
        this._snackBar.open("L\u1ED7i khi c\u1EADp nh\u1EADt ch\u1ED1t kho", "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      }
    });
  }
  DeleteData() {
    return __async(this, null, function* () {
      try {
        const chotkhoData = this.DetailChotkho();
        if (chotkhoData?.id) {
          yield this._ChotkhoService.deleteChotkho(chotkhoData.id);
          this._snackBar.open("X\xF3a th\xE0nh c\xF4ng", "", {
            duration: 1e3,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-success"]
          });
          this._router.navigate(["/admin/chotkho"]);
        }
      } catch (error) {
        console.error("L\u1ED7i khi x\xF3a ch\u1ED1t kho:", error);
        this._snackBar.open("L\u1ED7i khi x\xF3a ch\u1ED1t kho", "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      }
    });
  }
  onQuantityChange() {
    const detail = this.DetailChotkho();
    if (detail) {
      const sltonhethong = Number(detail.sltonhethong) || 0;
      const sltonthucte = Number(detail.sltonthucte) || 0;
      const slhuy = Number(detail.slhuy) || 0;
      const chenhlech = sltonhethong - sltonthucte - slhuy;
      this.DetailChotkho.update((v) => __spreadProps(__spreadValues({}, v), {
        chenhlech
      }));
    }
  }
  // Properties for detail table display
  detailDisplayedColumns = ["sanpham", "sltonhethong", "sltonthucte", "slhuy", "chenhlech", "actions"];
  removeDetail(detail) {
    const currentDetails = this.DetailChotkho().details || [];
    const updatedDetails = currentDetails.filter((d) => d !== detail);
    this.DetailChotkho.update((v) => __spreadProps(__spreadValues({}, v), {
      details: updatedDetails
    }));
  }
  deleteDetailFromDatabase(detail) {
    return __async(this, null, function* () {
      try {
        if (detail.id && this.DetailChotkho().id) {
          const success = yield this._ChotkhoService.deleteChotkhoDetail(detail.id, this.DetailChotkho().id);
          if (success) {
            this._snackBar.open("X\xF3a chi ti\u1EBFt th\xE0nh c\xF4ng", "", {
              duration: 1e3,
              horizontalPosition: "end",
              verticalPosition: "top",
              panelClass: ["snackbar-success"]
            });
          }
        } else {
          this.removeDetail(detail);
        }
      } catch (error) {
        console.error("L\u1ED7i khi x\xF3a chi ti\u1EBFt:", error);
        this._snackBar.open("L\u1ED7i khi x\xF3a chi ti\u1EBFt", "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      }
    });
  }
  loadPendingOrders(khoId) {
    return __async(this, null, function* () {
      if (!khoId)
        return;
      this.isPendingLoading.set(true);
      try {
        const orders = yield this._ChotkhoService.getPendingOrders(khoId);
        this.pendingOrders.set(orders);
      } catch (error) {
        console.error("Error loading pending orders:", error);
      } finally {
        this.isPendingLoading.set(false);
      }
    });
  }
  toggleOrderSelection(orderId) {
    const current = this.selectedOrderIds();
    if (current.includes(orderId)) {
      this.selectedOrderIds.set(current.filter((id) => id !== orderId));
    } else {
      this.selectedOrderIds.set([...current, orderId]);
    }
  }
  autoSelectRelevantOrders() {
    const details = this.DetailChotkho().details || [];
    const negativeProductIds = details.filter((d) => Number(d.sltonhethong) - Number(d.sltonthucte) - Number(d.slhuy) < 0).map((d) => d.sanphamId);
    if (negativeProductIds.length === 0)
      return;
    const relevantOrders = this.pendingOrders().filter((order) => order.sanpham.some((sp) => negativeProductIds.includes(sp.idSP)));
    const newIds = [.../* @__PURE__ */ new Set([...this.selectedOrderIds(), ...relevantOrders.map((o) => o.id)])];
    this.selectedOrderIds.set(newIds);
    this._snackBar.open(`\u0110\xE3 t\u1EF1 \u0111\u1ED9ng ch\u1ECDn ${relevantOrders.length} \u0111\u01A1n h\xE0ng li\xEAn quan`, "", { duration: 2e3 });
  }
  loadWarehouses() {
    return __async(this, null, function* () {
      try {
        const warehouses = yield this._KhoService.getAllKho();
        this.ListKho.set(warehouses);
      } catch (error) {
        console.error("Error loading warehouses:", error);
      }
    });
  }
  onWarehouseChange(khoId) {
    if (khoId) {
      this.loadPendingOrders(khoId);
      this.loadNewSanphamList();
    }
  }
  updateChenhLech(detail) {
    const sltonhethong = Number(detail.sltonhethong) || 0;
    const sltonthucte = Number(detail.sltonthucte) || 0;
    const slhuy = Number(detail.slhuy) || 0;
    detail.chenhlech = sltonhethong - sltonthucte - slhuy;
  }
  goBack() {
    this._router.navigate(["/admin/chotkho"]);
    this._ListChotkhoComponent.drawer.close();
  }
  trackByFn(index, item) {
    return item.id || index;
  }
  toggleEdit() {
    this.isEdit.update((value) => !value);
  }
  toggleDelete() {
    this.isDelete.update((value) => !value);
  }
  FillSlug() {
    this.DetailChotkho.update((v) => {
      v.slug = convertToSlug(v.title);
      return v;
    });
  }
  // SearchFilter methods (similar to banggia pattern)
  loadNewSanphamList() {
    return __async(this, null, function* () {
      try {
        const products = yield this._ChotkhoService.getAllProducts();
        const allProducts = products.map((product) => ({
          id: product.id,
          sanphamId: product.id,
          title: product.title,
          masp: product.masp,
          dvt: product.dvt,
          sltonhethong: product.tonkho?.slton || 0,
          sltonthucte: Math.max(0, product.tonkho?.slton || 0),
          // Mặc định là số tồn vật lý hiện tại (không âm)
          slhuy: product.tonkho?.slhuy || 0,
          chenhlech: 0,
          // Mặc định chưa có chênh lệch khi bắt đầu đếm
          dongia: product.dongia
        }));
        this.ListSanpham = allProducts;
        this.filterSanpham = this.ListSanpham.filter((item) => !this.ListFilter.find((selected) => selected.id === item.id));
        this.updateAvailableProducts();
      } catch (error) {
        console.error("Error loading sanpham list:", error);
        this._snackBar.open("L\u1ED7i khi t\u1EA3i danh s\xE1ch s\u1EA3n ph\u1EA9m", "\u0110\xF3ng", {
          duration: 3e3,
          panelClass: ["snackbar-error"]
        });
      }
    });
  }
  loadSanphamList() {
    return __async(this, null, function* () {
      try {
        const products = yield this._ChotkhoService.getAllProducts();
        const allProducts = products.map((product) => ({
          id: product.id,
          sanphamId: product.id,
          title: product.title,
          masp: product.masp,
          dvt: product.dvt,
          sltonhethong: product.sltonhethong || 0,
          sltonthucte: Math.max(0, product.sltonthucte || 0),
          slhuy: product.slhuy || 0,
          chenhlech: 0,
          dongia: product.dongia
        }));
        this.ListSanpham = allProducts;
        this.filterSanpham = this.ListSanpham.filter((item) => !this.ListFilter.find((selected) => selected.id === item.id));
        this.updateAvailableProducts();
      } catch (error) {
        console.error("Error loading sanpham list:", error);
        this._snackBar.open("L\u1ED7i khi t\u1EA3i danh s\xE1ch s\u1EA3n ph\u1EA9m", "\u0110\xF3ng", {
          duration: 3e3,
          panelClass: ["snackbar-error"]
        });
      }
    });
  }
  DoOutFilter(event) {
    return __async(this, null, function* () {
      console.log("C\u1EADp nh\u1EADt s\u1EA3n ph\u1EA9m cho ch\u1ED1t kho:", event);
      try {
        this.DetailChotkho.update((v) => {
          return __spreadProps(__spreadValues({}, v), {
            details: event.map((sp) => ({
              sanphamId: sp.sanphamId || sp.id,
              sanpham: {
                id: sp.sanphamId || sp.id,
                masp: sp.masp,
                title: sp.title,
                dvt: sp.dvt,
                dongia: sp.dongia
              },
              sltonhethong: Number(sp.sltonhethong) || 0,
              sltonthucte: Math.max(0, Number(sp.sltonthucte) || 0),
              slhuy: Math.max(0, Number(sp.slhuy) || 0),
              chenhlech: Number(sp.chenhlech) || 0,
              ghichu: sp.ghichu || "",
              isActive: true,
              // Fields for table display
              title: sp.title,
              masp: sp.masp,
              dvt: sp.dvt
            }))
          });
        });
        this.filterSanpham = this.DetailChotkho().details;
        this.dataSource.update((ds) => {
          ds.data = [...this.DetailChotkho().details];
          ds.sort = this.sort;
          return ds;
        });
        const selectedIds = event.map((sp) => sp.sanphamId || sp.id);
        this.ListSanpham = this.ListSanpham.filter((product) => !selectedIds.includes(product.id || product.sanphamId));
        this._snackBar.open("C\u1EADp nh\u1EADt s\u1EA3n ph\u1EA9m th\xE0nh c\xF4ng", "", {
          duration: 2e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
      } catch (error) {
        console.error("L\u1ED7i c\u1EADp nh\u1EADt s\u1EA3n ph\u1EA9m:", error);
        this._snackBar.open("L\u1ED7i c\u1EADp nh\u1EADt s\u1EA3n ph\u1EA9m", "", {
          duration: 2e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      }
    });
  }
  EmptyCart() {
    const currentDetails = this.DetailChotkho().details || [];
    this.DetailChotkho.update((v) => {
      return __spreadProps(__spreadValues({}, v), {
        details: []
      });
    });
    this.dataSource.update((ds) => {
      ds.data = [];
      return ds;
    });
    currentDetails.forEach((detail) => {
      const productToAdd = {
        id: detail.sanphamId || detail.id,
        sanphamId: detail.sanphamId || detail.id,
        title: detail.title || detail.sanpham?.title,
        masp: detail.masp || detail.sanpham?.masp,
        dvt: detail.dvt || detail.sanpham?.dvt,
        sltonhethong: detail.sltonhethong || 0,
        sltonthucte: detail.sltonthucte || 0,
        slhuy: detail.slhuy || 0,
        chenhlech: detail.chenhlech || 0,
        dongia: detail.dongia || detail.sanpham?.dongia || 0
      };
      const existsInList = this.ListSanpham.some((p) => p.id === productToAdd.id || p.sanphamId === productToAdd.id);
      if (!existsInList) {
        this.ListSanpham.push(productToAdd);
      }
    });
    console.log("Restored products to ListSanpham:", this.ListSanpham);
    this._snackBar.open("\u0110\xE3 x\xF3a t\u1EA5t c\u1EA3 s\u1EA3n ph\u1EA9m", "", {
      duration: 2e3,
      horizontalPosition: "end",
      verticalPosition: "top",
      panelClass: ["snackbar-success"]
    });
  }
  // Methods similar to banggia pattern
  RemoveSanpham(row) {
    const currentDetails = this.DetailChotkho().details || [];
    const updatedDetails = currentDetails.filter((detail) => detail.id !== row.id && detail.sanphamId !== row.sanphamId);
    this.DetailChotkho.update((v) => {
      return __spreadProps(__spreadValues({}, v), {
        details: updatedDetails
      });
    });
    this.dataSource.update((ds) => {
      ds.data = [...updatedDetails];
      return ds;
    });
    const removedProductId = row.sanphamId || row.id;
    const productToAdd = {
      id: removedProductId,
      sanphamId: removedProductId,
      title: row.title || row.sanpham?.title,
      masp: row.masp || row.sanpham?.masp,
      dvt: row.dvt || row.sanpham?.dvt,
      sltonhethong: row.sltonhethong || 0,
      sltonthucte: row.sltonthucte || 0,
      slhuy: row.slhuy || 0,
      chenhlech: row.chenhlech || 0,
      dongia: row.dongia || row.sanpham?.dongia || 0
    };
    const existsInList = this.ListSanpham.some((p) => p.id === removedProductId || p.sanphamId === removedProductId);
    if (!existsInList) {
      this.ListSanpham.push(productToAdd);
      console.log("Added product back to ListSanpham:", productToAdd);
    }
    this._snackBar.open("\u0110\xE3 x\xF3a s\u1EA3n ph\u1EA9m", "", {
      duration: 2e3,
      horizontalPosition: "end",
      verticalPosition: "top",
      panelClass: ["snackbar-success"]
    });
  }
  updateValue(event, index, row, field, type) {
    event.preventDefault();
    event.stopPropagation();
    let value = event.target.innerText.trim();
    if (type === "number") {
      const numericValue = value.replace(/,/g, "").replace(/[^0-9.-]/g, "");
      value = Number(numericValue) || 0;
      if (field === "sltonthucte" || field === "slhuy") {
        value = Math.max(0, Number(value) || 0);
      }
    }
    this.DetailChotkho.update((currentChotkho) => {
      const updatedDetails = (currentChotkho.details || []).map((detail, idx) => {
        if (idx === index || detail.sanphamId === row.sanphamId) {
          const updatedDetail = __spreadValues({}, detail);
          updatedDetail[field] = value;
          if (field === "sltonthucte" || field === "slhuy") {
            const sltonhethong = Number(updatedDetail.sltonhethong) || 0;
            const sltonthucte = Number(updatedDetail.sltonthucte) || 0;
            updatedDetail.chenhlech = sltonhethong - sltonthucte;
          }
          return updatedDetail;
        }
        return detail;
      });
      return __spreadProps(__spreadValues({}, currentChotkho), {
        details: updatedDetails
      });
    });
    const currentDetails = this.DetailChotkho().details || [];
    this.dataSource.update((ds) => {
      ds.data = [...currentDetails];
      return ds;
    });
  }
  // Product selection methods similar to detaildonhang
  doFilterSanpham(event) {
    return __async(this, null, function* () {
      const value = event.target.value.trim().toLowerCase();
      this.searchTerm = value;
      if (event.key === "Enter") {
        const filteredProducts = this.getFilteredSanpham();
        if (filteredProducts.length > 0) {
          const firstAvailable = filteredProducts.find((product) => !this.CheckItem(product));
          if (firstAvailable) {
            this.ChosenItem(firstAvailable);
            event.target.value = "";
            this.searchTerm = "";
          }
        }
      }
    });
  }
  ChosenItem(item) {
    let CheckItem = this.filterSanpham.find((v) => v.id === item.id);
    let CheckItem1 = this.ListFilter.find((v) => v.id === item.id || v.sanphamId === item.id);
    if (CheckItem1) {
      this.ListFilter = this.ListFilter.filter((v) => v.id !== item.id && v.sanphamId !== item.id);
      console.log(`Removed product: ${item.title}`);
    } else {
      if (CheckItem) {
        const itemCopy = __spreadProps(__spreadValues({}, CheckItem), {
          sanphamId: CheckItem.id,
          sltonhethong: CheckItem.sltonhethong || 0,
          sltonthucte: CheckItem.sltonthucte || 0,
          slhuy: CheckItem.slhuy || 0,
          chenhlech: CheckItem.chenhlech || 0,
          order: this.ListFilter.length + 1
        });
        const existingIndex = this.ListFilter.findIndex((existing) => existing.id === item.id || existing.sanphamId === item.id);
        if (existingIndex === -1) {
          this.ListFilter.push(itemCopy);
        }
      }
    }
  }
  ChosenAll(list) {
    return __async(this, null, function* () {
      const uniqueProducts = list.filter((item) => !this.ListFilter.find((existing) => existing.id === item.id || existing.sanphamId === item.id));
      const newProducts = uniqueProducts.map((item, index) => {
        const itemCopy = __spreadProps(__spreadValues({}, item), {
          sanphamId: item.id,
          sltonhethong: item.sltonhethong || 0,
          sltonthucte: item.sltonthucte || 0,
          slhuy: item.slhuy || 0,
          chenhlech: item.chenhlech || 0,
          order: this.ListFilter.length + index + 1
        });
        return itemCopy;
      });
      this.ListFilter = [...this.ListFilter, ...newProducts];
      console.log(`Added ${newProducts.length} unique products. Total: ${this.ListFilter.length} products`);
    });
  }
  ResetFilter() {
    this.filterSanpham = this.ListSanpham.filter((item) => !this.ListFilter.find((selected) => selected.id === item.id));
    console.log(`Reset filter. Showing ${this.filterSanpham.length} available products`);
  }
  EmptyFiter() {
    this.ListFilter = [];
    this.updateAvailableProducts();
    console.log("Cleared all selected products");
  }
  // New method to update available products (excluding already selected ones) - kept for compatibility
  updateAvailableProducts() {
  }
  CheckItem(item) {
    return this.ListFilter.find((v) => v.id === item.id || v.sanphamId === item.id) ? true : false;
  }
  ApplyFilterColum(menu) {
    this.DetailChotkho.update((v) => {
      v.details = [...this.ListFilter];
      return v;
    });
    this.dataSource.update((ds) => {
      ds.data = [...this.ListFilter];
      return ds;
    });
    menu.closeMenu();
    console.log("Applied filter. Selected products:", this.ListFilter.length);
  }
  applyFilter(event) {
    const filterValue = event.target.value;
    this.dataSource().filter = filterValue.trim().toLowerCase();
  }
  ImportExcel(event) {
    return __async(this, null, function* () {
      try {
        const file = event.target.files[0];
        if (!file) {
          this._snackBar.open("Vui l\xF2ng ch\u1ECDn file Excel", "\u0110\xF3ng", {
            duration: 3e3,
            panelClass: ["snackbar-error"]
          });
          return;
        }
        const validTypes = [
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "application/vnd.ms-excel",
          "application/octet-stream"
        ];
        if (!validTypes.includes(file.type) && !file.name.endsWith(".xlsx") && !file.name.endsWith(".xls")) {
          this._snackBar.open("Vui l\xF2ng ch\u1ECDn file Excel (.xlsx ho\u1EB7c .xls)", "\u0110\xF3ng", {
            duration: 3e3,
            panelClass: ["snackbar-error"]
          });
          return;
        }
        this._snackBar.open("\u0110ang x\u1EED l\xFD file Excel...", "", {
          duration: 2e3,
          panelClass: ["snackbar-info"]
        });
        const data = yield this.readExcelFile(file);
        if (!data || data.length === 0) {
          this._snackBar.open("File Excel kh\xF4ng c\xF3 d\u1EEF li\u1EC7u ho\u1EB7c kh\xF4ng h\u1EE3p l\u1EC7", "\u0110\xF3ng", {
            duration: 3e3,
            panelClass: ["snackbar-error"]
          });
          return;
        }
        if (this.ListSanpham.length === 0) {
          yield this.loadNewSanphamList();
        }
        const processedData = yield this.processExcelData(data);
        if (processedData.length === 0) {
          this._snackBar.open("Kh\xF4ng t\xECm th\u1EA5y s\u1EA3n ph\u1EA9m n\xE0o kh\u1EDBp v\u1EDBi m\xE3 s\u1EA3n ph\u1EA9m trong file Excel", "\u0110\xF3ng", {
            duration: 4e3,
            panelClass: ["snackbar-warning"]
          });
          return;
        }
        this.DetailChotkho.update((v) => {
          const existingDetails = v.details || [];
          const combinedDetails = [...existingDetails];
          processedData.forEach((importedItem) => {
            const existingIndex = combinedDetails.findIndex((existing) => existing.sanphamId === importedItem.sanphamId);
            if (existingIndex >= 0) {
              combinedDetails[existingIndex] = __spreadProps(__spreadValues(__spreadValues({}, combinedDetails[existingIndex]), importedItem), {
                // Recalculate chenhlech
                chenhlech: this.calculateChenhLech(importedItem.sltonhethong || combinedDetails[existingIndex].sltonhethong || 0, importedItem.sltonthucte || 0, importedItem.slhuy || 0)
              });
            } else {
              combinedDetails.push(importedItem);
            }
          });
          return __spreadProps(__spreadValues({}, v), {
            details: combinedDetails
          });
        });
        this.dataSource.update((ds) => {
          ds.data = [...this.DetailChotkho().details];
          ds.sort = this.sort;
          return ds;
        });
        this.ListFilter = this.DetailChotkho().details || [];
        event.target.value = "";
        this._snackBar.open(`Import th\xE0nh c\xF4ng ${processedData.length} s\u1EA3n ph\u1EA9m t\u1EEB Excel`, "\u0110\xF3ng", {
          duration: 4e3,
          panelClass: ["snackbar-success"]
        });
        console.log("Excel import completed:", {
          importedItems: processedData.length,
          totalDetails: this.DetailChotkho().details?.length || 0
        });
      } catch (error) {
        console.error("Error importing Excel:", error);
        this._snackBar.open(`L\u1ED7i khi import Excel: ${error instanceof Error ? error.message : "Unknown error"}`, "\u0110\xF3ng", {
          duration: 5e3,
          panelClass: ["snackbar-error"]
        });
      }
    });
  }
  readExcelFile(file) {
    return __async(this, null, function* () {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => __async(this, null, function* () {
          try {
            const XLSX = yield import("./chunk-JOVYPMSF.js");
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, {
              header: 1,
              defval: "",
              raw: false
            });
            resolve(jsonData);
          } catch (error) {
            reject(new Error("Kh\xF4ng th\u1EC3 \u0111\u1ECDc file Excel. Vui l\xF2ng ki\u1EC3m tra \u0111\u1ECBnh d\u1EA1ng file."));
          }
        });
        reader.onerror = () => {
          reject(new Error("L\u1ED7i khi \u0111\u1ECDc file"));
        };
        reader.readAsArrayBuffer(file);
      });
    });
  }
  processExcelData(rawData) {
    return __async(this, null, function* () {
      try {
        if (!rawData || rawData.length < 2) {
          throw new Error("File Excel ph\u1EA3i c\xF3 \xEDt nh\u1EA5t 2 d\xF2ng (header + data)");
        }
        const headers = rawData[0].map((h) => removeVietnameseAccents(String(h).toLowerCase().trim()));
        const columnIndices = {
          masp: this.findColumnIndex(headers, ["masp", "ma sp", "ma san pham", "product code", "ma hang"]),
          sltonthucte: this.findColumnIndex(headers, ["sltonthucte", "slton", "ton", "kiem ke", "sl ton thuc te", "so luong ton thuc te", "actual stock"]),
          slhuy: this.findColumnIndex(headers, ["slhuy", "huy", "sl huy", "so luong huy", "damaged quantity"])
        };
        if (columnIndices.masp === -1) {
          throw new Error('Kh\xF4ng t\xECm th\u1EA5y c\u1ED9t "masp" trong file Excel');
        }
        const processedData = [];
        const notFoundProducts = [];
        for (let i = 1; i < rawData.length; i++) {
          const row = rawData[i];
          if (!row || row.length === 0)
            continue;
          const masp = String(row[columnIndices.masp] || "").trim();
          if (!masp)
            continue;
          const serverProduct = this.ListSanpham.find((p) => p.masp?.toLowerCase().trim() === masp.toLowerCase().trim());
          if (!serverProduct) {
            notFoundProducts.push(masp);
            continue;
          }
          const rawSlton = columnIndices.sltonthucte !== -1 ? row[columnIndices.sltonthucte] : void 0;
          const rawSlhuy = columnIndices.slhuy !== -1 ? row[columnIndices.slhuy] : void 0;
          const sltonhethong = serverProduct.sltonhethong || 0;
          const sltonthucte = this.isValidNumber(rawSlton) ? this.parseNumber(rawSlton) : Math.max(0, sltonhethong);
          const slhuy = this.isValidNumber(rawSlhuy) ? this.parseNumber(rawSlhuy) : 0;
          const chenhlech = this.calculateChenhLech(sltonhethong, sltonthucte, slhuy);
          const detailItem = {
            id: void 0,
            // New item
            sanphamId: serverProduct.id,
            sanpham: {
              id: serverProduct.id,
              masp: serverProduct.masp,
              title: serverProduct.title,
              dvt: serverProduct.dvt,
              dongia: serverProduct.dongia
            },
            sltonhethong,
            sltonthucte,
            slhuy,
            chenhlech,
            ghichu: `Import t\u1EEB Excel - ${(/* @__PURE__ */ new Date()).toLocaleString()}`,
            isActive: true,
            // Fields for table display
            title: serverProduct.title,
            masp: serverProduct.masp,
            dvt: serverProduct.dvt
          };
          processedData.push(detailItem);
        }
        if (notFoundProducts.length > 0) {
          console.warn("Products not found in system:", notFoundProducts);
          this._snackBar.open(`C\u1EA3nh b\xE1o: ${notFoundProducts.length} s\u1EA3n ph\u1EA9m kh\xF4ng t\xECm th\u1EA5y trong h\u1EC7 th\u1ED1ng`, "Xem chi ti\u1EBFt", {
            duration: 5e3,
            panelClass: ["snackbar-warning"]
          }).onAction().subscribe(() => {
            console.log("Not found products:", notFoundProducts.join(", "));
          });
        }
        return processedData;
      } catch (error) {
        console.error("Error processing Excel data:", error);
        throw error;
      }
    });
  }
  isValidNumber(value) {
    if (value === void 0 || value === null || value === "" || String(value).trim() === "")
      return false;
    const stringValue = String(value).replace(/,/g, "").replace(/\s/g, "").trim();
    const parsed = parseFloat(stringValue);
    return !isNaN(parsed);
  }
  findColumnIndex(headers, possibleNames) {
    for (const name of possibleNames) {
      const normalizedName = removeVietnameseAccents(name.toLowerCase().trim());
      const index = headers.findIndex((header) => header.includes(normalizedName));
      if (index !== -1)
        return index;
    }
    return -1;
  }
  parseNumber(value) {
    if (value === void 0 || value === null || value === "" || String(value).trim() === "")
      return 0;
    const stringValue = String(value).replace(/,/g, "").replace(/\s/g, "").trim();
    const parsed = parseFloat(stringValue);
    if (isNaN(parsed))
      return 0;
    return Math.max(0, Math.floor(parsed));
  }
  calculateChenhLech(sltonhethong, sltonthucte, slhuy) {
    return (sltonhethong || 0) - (sltonthucte || 0);
  }
  ExportExample() {
    return __async(this, null, function* () {
      try {
        const XLSX = yield import("./chunk-JOVYPMSF.js");
        let XLSXStyle;
        try {
          XLSXStyle = yield import("./chunk-EF4VSNBV.js");
        } catch (e) {
          console.warn("xlsx-js-style not available, using standard XLSX");
        }
        if (this.ListSanpham.length === 0) {
          yield this.loadNewSanphamList();
        }
        const exampleData = this.createExampleData();
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.aoa_to_sheet(exampleData);
        const columnWidths = [
          { wch: 15 },
          // masp
          { wch: 35 },
          // title (for reference)
          { wch: 10 },
          // dvt (for reference)
          { wch: 20 },
          // sltonhethong (for reference)
          { wch: 15 },
          // sltonthucte
          { wch: 15 },
          // slhuy
          { wch: 50 }
          // notes
        ];
        worksheet["!cols"] = columnWidths;
        const headerCells = ["A1", "B1", "C1", "D1", "E1", "F1", "G1"];
        headerCells.forEach((cell) => {
          if (worksheet[cell]) {
            worksheet[cell].s = {
              font: { bold: true, color: { rgb: "FFFFFF" }, sz: 12 },
              fill: { fgColor: { rgb: "4472C4" } },
              alignment: { horizontal: "center", vertical: "center" },
              border: {
                top: { style: "thin" },
                bottom: { style: "thin" },
                left: { style: "thin" },
                right: { style: "thin" }
              }
            };
          }
        });
        for (let row = 2; row <= 14; row++) {
          const cellA = `A${row}`;
          if (worksheet[cellA]) {
            worksheet[cellA].s = {
              font: { color: { rgb: "0066CC" }, sz: 10, bold: row === 2 || row === 13 },
              fill: { fgColor: { rgb: "F0F8FF" } },
              alignment: { horizontal: "left", vertical: "center" }
            };
          }
        }
        const dataStartRow = 15;
        const sampleDataRows = Math.min(10, this.ListSanpham.length || 10);
        for (let row = dataStartRow; row < dataStartRow + sampleDataRows; row++) {
          ["A", "E", "F"].forEach((col) => {
            const cell = `${col}${row}`;
            if (worksheet[cell]) {
              worksheet[cell].s = {
                fill: { fgColor: { rgb: "FFFFCC" } },
                // Light yellow for editable fields
                border: {
                  top: { style: "thin" },
                  bottom: { style: "thin" },
                  left: { style: "thin" },
                  right: { style: "thin" }
                },
                alignment: { horizontal: "center", vertical: "center" }
              };
            }
          });
          ["B", "C", "D", "G"].forEach((col) => {
            const cell = `${col}${row}`;
            if (worksheet[cell]) {
              worksheet[cell].s = {
                fill: { fgColor: { rgb: "F5F5F5" } },
                // Light gray for reference only
                font: { color: { rgb: "666666" } },
                border: {
                  top: { style: "thin" },
                  bottom: { style: "thin" },
                  left: { style: "thin" },
                  right: { style: "thin" }
                },
                alignment: { horizontal: "left", vertical: "center" }
              };
            }
          });
        }
        XLSX.utils.book_append_sheet(workbook, worksheet, "M\u1EABu Import Ch\u1ED1t Kho");
        const now = /* @__PURE__ */ new Date();
        const dateStr = now.getFullYear() + String(now.getMonth() + 1).padStart(2, "0") + String(now.getDate()).padStart(2, "0");
        const timeStr = String(now.getHours()).padStart(2, "0") + String(now.getMinutes()).padStart(2, "0");
        const filename = `Mau_Import_ChotkKho_${dateStr}_${timeStr}.xlsx`;
        try {
          if (XLSXStyle && XLSXStyle.writeFile) {
            XLSXStyle.writeFile(workbook, filename);
          } else {
            XLSX.writeFile(workbook, filename);
          }
        } catch (styleError) {
          console.warn("Styled export failed, using regular export:", styleError);
          XLSX.writeFile(workbook, filename);
        }
        this._snackBar.open(`\u0110\xE3 t\u1EA3i xu\u1ED1ng file m\u1EABu: ${filename}`, "\u0110\xF3ng", {
          duration: 4e3,
          panelClass: ["snackbar-success"]
        });
        console.log("Excel template exported successfully:", filename);
      } catch (error) {
        console.error("Error exporting Excel template:", error);
        this._snackBar.open(`L\u1ED7i khi t\u1EA1o file m\u1EABu: ${error instanceof Error ? error.message : "Unknown error"}`, "\u0110\xF3ng", {
          duration: 5e3,
          panelClass: ["snackbar-error"]
        });
      }
    });
  }
  createExampleData() {
    const headers = [
      "masp",
      "title (Tham kh\u1EA3o - kh\xF4ng import)",
      "dvt (Tham kh\u1EA3o - kh\xF4ng import)",
      "sltonhethong (Tham kh\u1EA3o - t\u1EEB h\u1EC7 th\u1ED1ng)",
      "sltonthucte",
      "slhuy",
      "Ghi ch\xFA h\u01B0\u1EDBng d\u1EABn"
    ];
    const exampleRows = [];
    if (this.ListSanpham.length > 0) {
      const sampleProducts = this.ListSanpham.slice(0, Math.min(10, this.ListSanpham.length));
      sampleProducts.forEach((product, index) => {
        const sltonhethong = product.sltonhethong || Math.floor(Math.random() * 100) + 1;
        const sltonthucte = Math.floor(sltonhethong * (0.8 + Math.random() * 0.4));
        const slhuy = Math.floor(Math.random() * 5);
        exampleRows.push([
          product.masp || `SP${String(index + 1).padStart(3, "0")}`,
          product.title || `S\u1EA3n ph\u1EA9m m\u1EABu ${index + 1}`,
          product.dvt || "C\xE1i",
          sltonhethong,
          sltonthucte,
          slhuy,
          index === 0 ? "C\u1ED9t n\xE0y ch\u1EC9 \u0111\u1EC3 h\u01B0\u1EDBng d\u1EABn, kh\xF4ng \u0111\u01B0\u1EE3c import" : ""
        ]);
      });
    } else {
      for (let i = 1; i <= 10; i++) {
        const sltonhethong = Math.floor(Math.random() * 100) + 1;
        const sltonthucte = Math.floor(sltonhethong * (0.8 + Math.random() * 0.4));
        const slhuy = Math.floor(Math.random() * 5);
        exampleRows.push([
          `SP${String(i).padStart(3, "0")}`,
          `S\u1EA3n ph\u1EA9m m\u1EABu ${i}`,
          "C\xE1i",
          sltonhethong,
          sltonthucte,
          slhuy,
          i === 1 ? "C\u1ED9t n\xE0y ch\u1EC9 \u0111\u1EC3 h\u01B0\u1EDBng d\u1EABn, kh\xF4ng \u0111\u01B0\u1EE3c import" : ""
        ]);
      }
    }
    const instructionRows = [
      [],
      ["H\u01AF\u1EDANG D\u1EAAN S\u1EEC D\u1EE4NG:"],
      ["1. Ch\u1EC9 c\u1EA7n \u0111i\u1EC1n d\u1EEF li\u1EC7u v\xE0o c\xE1c c\u1ED9t: masp, sltonthucte, slhuy"],
      ['2. C\u1ED9t "masp" l\xE0 B\u1EAET BU\u1ED8C - ph\u1EA3i kh\u1EDBp v\u1EDBi m\xE3 s\u1EA3n ph\u1EA9m trong h\u1EC7 th\u1ED1ng'],
      ['3. C\u1ED9t "sltonthucte" l\xE0 s\u1ED1 l\u01B0\u1EE3ng t\u1ED3n th\u1EF1c t\u1EBF (m\u1EB7c \u0111\u1ECBnh 0 n\u1EBFu \u0111\u1EC3 tr\u1ED1ng)'],
      ['4. C\u1ED9t "slhuy" l\xE0 s\u1ED1 l\u01B0\u1EE3ng h\u1EE7y (m\u1EB7c \u0111\u1ECBnh 0 n\u1EBFu \u0111\u1EC3 tr\u1ED1ng)'],
      ['5. C\u1ED9t "sltonhethong" s\u1EBD \u0111\u01B0\u1EE3c l\u1EA5y t\u1EEB h\u1EC7 th\u1ED1ng t\u1EF1 \u0111\u1ED9ng'],
      ["6. Ch\xEAnh l\u1EC7ch = sltonhethong - sltonthucte - slhuy (t\u1EF1 \u0111\u1ED9ng t\xEDnh)"],
      ["7. C\xE1c c\u1ED9t kh\xE1c ch\u1EC9 \u0111\u1EC3 tham kh\u1EA3o, kh\xF4ng \u0111\u01B0\u1EE3c import"],
      ["8. X\xF3a c\xE1c d\xF2ng h\u01B0\u1EDBng d\u1EABn n\xE0y tr\u01B0\u1EDBc khi import"],
      [],
      ["D\u1EEE LI\u1EC6U M\u1EAAU (B\u1EAFt \u0111\u1EA7u t\u1EEB d\xF2ng ti\u1EBFp theo):"]
    ];
    return [
      headers,
      ...instructionRows,
      ...exampleRows
    ];
  }
  static \u0275fac = function DetailChotkhoComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DetailChotkhoComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DetailChotkhoComponent, selectors: [["app-detailchotkho"]], viewQuery: function DetailChotkhoComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(MatSort, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.sort = _t.first);
    }
  }, decls: 11, vars: 4, consts: [["picker", ""], ["menuTrigger", "matMenuTrigger"], ["menu", "matMenu"], ["searchInput", ""], ["uploadfile", ""], [1, "flex", "flex-row", "justify-between", "items-center", "space-x-2", "p-2"], ["mat-icon-button", "", "color", "primary", 3, "click"], [1, "font-bold"], [1, "flex", "flex-row", "space-x-2", "items-center"], ["mat-icon-button", "", "color", "primary", 3, "disabled", "click", 4, "ngIf"], [1, "relative", "flex", "flex-col", "w-full", "p-4", "overflow-auto"], [4, "ngIf"], ["mat-icon-button", "", "color", "primary", 3, "click", "disabled"], ["diameter", "24", 4, "ngIf"], ["diameter", "24"], [1, "flex", "flex-col", "space-y-4", "items-center", "justify-center"], [1, "font-bold", "text-2xl"], [1, "flex", "flex-row", "space-x-2", "items-center", "justify-center"], ["mat-flat-button", "", "color", "primary", 3, "click"], ["mat-flat-button", "", "color", "warn", 3, "click"], ["class", "bg-white p-6 rounded-lg border mb-4", 4, "ngIf"], ["class", "bg-amber-50 p-4 rounded-lg mb-4 border border-amber-200", 4, "ngIf"], ["class", "bg-white p-4 rounded-lg border", 4, "ngIf"], [1, "bg-white", "p-6", "rounded-lg", "border", "mb-4"], [1, "text-lg", "font-semibold", "mb-4", "text-slate-800", "flex", "items-center", "gap-2"], [1, "grid", "grid-cols-1", "md:grid-cols-3", "gap-4"], ["appearance", "outline", "subscriptSizing", "dynamic"], ["matInput", "", "placeholder", "Vui l\xF2ng nh\u1EADp ti\xEAu \u0111\u1EC1", 3, "ngModelChange", "ngModel", "disabled"], ["matInput", "", "placeholder", "Ch\u1ECDn ng\xE0y ch\u1ED1t", 3, "ngModelChange", "matDatepicker", "ngModel", "disabled"], ["matSuffix", "", 3, "for"], [3, "ngModelChange", "selectionChange", "ngModel", "disabled"], [3, "value", 4, "ngFor", "ngForOf"], ["appearance", "outline", "subscriptSizing", "dynamic", 1, "md:col-span-3"], ["matInput", "", "placeholder", "Vui l\xF2ng nh\u1EADp ghi ch\xFA", "rows", "2", 3, "ngModelChange", "ngModel", "disabled"], [3, "value"], [1, "bg-amber-50", "p-4", "rounded-lg", "mb-4", "border", "border-amber-200"], [1, "flex", "items-center", "justify-between", "mb-3"], [1, "flex", "items-center", "gap-2"], [1, "text-amber-600"], [1, "text-amber-800", "font-bold", "m-0", "uppercase", "text-sm", "tracking-wider"], ["mat-stroked-button", "", "color", "primary", "size", "small", 3, "click"], [1, "text-xs", "text-amber-700", "mb-4", "italic"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "lg:grid-cols-3", "gap-3"], ["class", "p-3 rounded-lg border-2 cursor-pointer transition-all flex items-start gap-3 bg-white", 3, "ngClass", "click", 4, "ngFor", "ngForOf"], [1, "p-3", "rounded-lg", "border-2", "cursor-pointer", "transition-all", "flex", "items-start", "gap-3", "bg-white", 3, "click", "ngClass"], [1, "mt-0.5", 3, "color"], [1, "flex-1"], [1, "text-[12px]", "font-bold", "text-slate-900"], [1, "text-[10px]", "text-slate-500", "mt-0.5"], [1, "flex", "flex-wrap", "gap-1", "mt-1.5"], ["class", "px-1.5 py-0.5 bg-slate-100 text-[9px] rounded text-slate-600 font-medium", 4, "ngFor", "ngForOf"], [1, "px-1.5", "py-0.5", "bg-slate-100", "text-[9px]", "rounded", "text-slate-600", "font-medium"], [1, "bg-white", "p-4", "rounded-lg", "border"], ["class", "w-full flex flex-col overflow-y-auto mb-4", 4, "ngIf"], [1, "w-full", "flex", "items-center", "justify-between", "mb-4"], ["appearance", "outline", "subscriptSizing", "dynamic", 1, "max-w-md", "w-full"], ["matInput", "", "placeholder", "Nh\u1EADp t\xEAn s\u1EA3n ph\u1EA9m ho\u1EB7c m\xE3 SP...", 3, "keyup"], ["matSuffix", ""], [1, "w-full", "overflow-auto"], ["mat-table", "", "matSort", "", 1, "!border", "w-full", "cursor-pointer", 3, "dataSource"], [3, "matColumnDef"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["class", "mat-row", 4, "matNoDataRow"], [1, "w-full", "flex", "flex-col", "overflow-y-auto", "mb-4"], [1, "cursor-pointer", "w-full", "relative", "flex", "lg:flex-row", "lg:space-y-2", "space-y-0", "flex-col", "space-x-2", "justify-between", "items-center", "p-2", "bg-white", "rounded-lg"], [1, "w-full", "flex", "lg:flex-row", "flex-col", "gap-2", "items-center"], ["mat-flat-button", "", "color", "primary", 3, "disabled", "matMenuTriggerFor"], [1, "cursor-pointer", "flex", "flex-col", "space-y-4", "p-3", 3, "click"], [1, "bg-blue-50", "p-2", "rounded-lg"], [1, "text-sm", "font-medium", "text-blue-800"], [1, "text-xs", "text-blue-600"], [1, "relative", "w-full"], ["type", "text", "placeholder", "T\xECm Ki\u1EBFm...", 1, "block", "w-full", "pl-10", "pr-4", "py-2", "text-gray-700", "bg-white", "border", "border-gray-300", "rounded-lg", "focus:border-blue-400", "focus:ring-blue-400", "focus:outline-none", "focus:ring", "focus:ring-opacity-40", 3, "keyup"], [1, "absolute", "inset-y-0", "left-0", "flex", "items-center", "pl-3", "pointer-events-none"], [1, "material-symbols-outlined", "text-gray-500"], [1, "flex", "flex-row", "space-x-2", "items-center", "justify-between"], [1, "text-xs", "text-blue-600", "underline", 3, "click"], [1, "text-xs", "text-red-600", "underline", 3, "click"], [1, "text-xs", "text-green-600", "underline", 3, "click"], [1, "w-full", "flex", "flex-col", "space-y-2", "max-h-44", "overflow-auto"], ["class", "flex flex-row space-x-2 items-center p-2 rounded-lg hover:bg-slate-100 cursor-pointer", 3, "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["class", "text-center text-gray-500 p-4", 4, "ngIf"], [1, "flex", "flex-row", "space-x-2", "items-end", "justify-end"], [1, "flex", "flex-row", "gap-2", "justify-items-center"], ["matTooltip", "T\u1EA3i l\xEAn file excel", "color", "primary", "mat-icon-button", "", 3, "click"], ["multiple", "", "type", "file", 1, "hidden", 3, "change"], ["matTooltip", "T\u1EA3i xu\u1ED1ng file m\u1EABu Excel", "color", "primary", "mat-icon-button", "", 3, "click"], ["matTooltip", "L\xE0m Tr\u1ED1ng Gi\u1ECF H\xE0ng", "color", "warn", "mat-icon-button", "", 3, "click", "disabled"], [1, "flex", "flex-row", "space-x-2", "items-center", "p-2", "rounded-lg", "hover:bg-slate-100", "cursor-pointer", 3, "click"], ["class", "material-symbols-outlined text-green-600", 4, "ngIf"], ["class", "material-symbols-outlined text-gray-400", 4, "ngIf"], [1, "flex", "flex-col", "flex-1"], [1, "font-medium"], [1, "text-xs", "text-gray-500"], [1, "material-symbols-outlined", "text-green-600"], [1, "material-symbols-outlined", "text-gray-400"], [1, "text-center", "text-gray-500", "p-4"], ["class", "whitespace-nowrap", "mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["mat-header-cell", "", "mat-sort-header", "", 1, "whitespace-nowrap"], [1, "line-clamp-4", "me-4"], ["class", "text-[10px] lowercase font-normal opacity-60 italic", 4, "ngIf"], [1, "text-[10px]", "lowercase", "font-normal", "opacity-60", "italic"], ["mat-cell", ""], [1, "max-w-20", "line-clamp-4", "flex", "flex-row", "items-center"], [1, "max-w-20", "line-clamp-4", 3, "class"], [1, "max-w-40", "line-clamp-4"], [1, "max-w-20", "line-clamp-4"], ["mat-icon-button", "", "color", "warn", 3, "click", "disabled"], ["class", "sltonthucte-input p-2 min-w-28 bg-slate-200 focus:border rounded-lg focus:border-blue-600 focus:bg-slate-100 focus:outline-none cursor-text", 3, "contentEditable", "blur", "keydown.enter", 4, "ngIf"], ["class", "max-w-20 line-clamp-4", 4, "ngIf"], [1, "sltonthucte-input", "p-2", "min-w-28", "bg-slate-200", "focus:border", "rounded-lg", "focus:border-blue-600", "focus:bg-slate-100", "focus:outline-none", "cursor-text", 3, "blur", "keydown.enter", "contentEditable"], ["class", "slhuy-input p-2 min-w-28 bg-slate-200 focus:border rounded-lg focus:border-blue-600 focus:bg-slate-100 focus:outline-none cursor-text", 3, "contentEditable", "blur", "keydown.enter", 4, "ngIf"], [1, "slhuy-input", "p-2", "min-w-28", "bg-slate-200", "focus:border", "rounded-lg", "focus:border-blue-600", "focus:bg-slate-100", "focus:outline-none", "cursor-text", 3, "blur", "keydown.enter", "contentEditable"], ["class", "ghichu-input p-2 min-w-40 bg-slate-200 focus:border rounded-lg focus:border-blue-600 focus:bg-slate-100 focus:outline-none cursor-text", 3, "contentEditable", "blur", "keydown.enter", 4, "ngIf"], ["class", "max-w-40 line-clamp-4", 4, "ngIf"], [1, "ghichu-input", "p-2", "min-w-40", "bg-slate-200", "focus:border", "rounded-lg", "focus:border-blue-600", "focus:bg-slate-100", "focus:outline-none", "cursor-text", 3, "blur", "keydown.enter", "contentEditable"], ["mat-header-row", ""], ["mat-row", ""], [1, "mat-row"], ["colspan", "9", 1, "mat-cell", "p-4"]], template: function DetailChotkhoComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 5)(1, "button", 6);
      \u0275\u0275listener("click", function DetailChotkhoComponent_Template_button_click_1_listener() {
        return ctx.goBack();
      });
      \u0275\u0275elementStart(2, "mat-icon");
      \u0275\u0275text(3, "arrow_back");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(4, "div", 7);
      \u0275\u0275text(5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "div", 8);
      \u0275\u0275template(7, DetailChotkhoComponent_button_7_Template, 3, 3, "button", 9);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "div", 10);
      \u0275\u0275template(9, DetailChotkhoComponent_ng_container_9_Template, 9, 0, "ng-container", 11)(10, DetailChotkhoComponent_ng_container_10_Template, 4, 3, "ng-container", 11);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_0_0;
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(((tmp_0_0 = ctx.DetailChotkho()) == null ? null : tmp_0_0.title) || "Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u");
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.isEdit());
      \u0275\u0275advance(2);
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
    MatDatepickerModule,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatNativeDateModule,
    MatTableModule,
    MatTable,
    MatHeaderCellDef,
    MatHeaderRowDef,
    MatColumnDef,
    MatCellDef,
    MatRowDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatNoDataRow,
    MatSortModule,
    MatSort,
    MatSortHeader,
    MatMenuModule,
    CommonModule,
    NgClass,
    NgForOf,
    NgIf,
    DecimalPipe,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatProgressSpinner
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DetailChotkhoComponent, { className: "DetailChotkhoComponent", filePath: "src/app/admin/chotkho/detailchotkho/detailchotkho.ts", lineNumber: 52 });
})();
export {
  DetailChotkhoComponent
};
//# sourceMappingURL=chunk-Z3L6ZAMW.js.map
