import './polyfills.server.mjs';
import {
  ListDonhangComponent
} from "./chunk-OTFJWT6C.mjs";
import "./chunk-KG6RBMPF.mjs";
import "./chunk-23PZ27G5.mjs";
import "./chunk-7QWUG222.mjs";
import {
  MatProgressSpinnerModule
} from "./chunk-PVLDU33E.mjs";
import {
  SanphamService
} from "./chunk-ESYIALWJ.mjs";
import {
  KhachhangService
} from "./chunk-FOXQ7452.mjs";
import {
  BanggiaService
} from "./chunk-UXO2SBGM.mjs";
import "./chunk-6R25CFXQ.mjs";
import "./chunk-BMDXMCXP.mjs";
import "./chunk-CXFG5YDN.mjs";
import {
  UserService
} from "./chunk-KPXPV3IG.mjs";
import {
  MatSlideToggleModule
} from "./chunk-J322K7NT.mjs";
import {
  readExcelFile,
  writeExcelFile
} from "./chunk-C4Q5BIA5.mjs";
import {
  GoogleSheetService
} from "./chunk-TGADPWSB.mjs";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatNoDataRow,
  MatPaginator,
  MatPaginatorModule,
  MatRow,
  MatRowDef,
  MatSort,
  MatSortModule,
  MatTable,
  MatTableDataSource,
  MatTableModule
} from "./chunk-DWV2CVG4.mjs";
import "./chunk-RCQ574CW.mjs";
import {
  MatDialog,
  MatDialogClose,
  MatDialogContent,
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
  ConvertDriveData,
  GenId,
  convertToSlug
} from "./chunk-I23Q342N.mjs";
import {
  SearchService
} from "./chunk-DZF5RARC.mjs";
import {
  DonhangService
} from "./chunk-HQOWTRL4.mjs";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "./chunk-RUJ72W7P.mjs";
import {
  require_moment
} from "./chunk-TEMMKMG5.mjs";
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
  MatSuffix,
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
  DecimalPipe,
  NgForOf,
  NgIf
} from "./chunk-H3GF4RFC.mjs";
import {
  Subject,
  computed,
  effect,
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMapInterpolate1,
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
  ɵɵpureFunction0,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeHtml,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-4EQURZBD.mjs";
import "./chunk-QS2IQGEQ.mjs";
import {
  __async,
  __spreadProps,
  __spreadValues,
  __toESM
} from "./chunk-FMEBT56H.mjs";

// src/app/admin/donhang/detaildonhang/detaildonhang.component.ts
var import_moment = __toESM(require_moment());
var _c0 = ["BgHethanDialog"];
var DetailDonhangComponent_ng_container_13_div_26_Defer_2_DepsFn = () => [MatFormField, MatLabel, MatInput, MatIcon, MatButton, MatIconButton, NgForOf, NgIf, DecimalPipe, MatMenu, MatMenuTrigger, MatTable, MatHeaderCellDef, MatHeaderRowDef, MatColumnDef, MatCellDef, MatRowDef, MatHeaderCell, MatCell, MatHeaderRow, MatRow, MatNoDataRow];
var _c1 = () => ({ standalone: true });
var _forTrack0 = ($index, $item) => $item.id;
function DetailDonhangComponent_Conditional_10_button_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 6);
    \u0275\u0275listener("click", function DetailDonhangComponent_Conditional_10_button_0_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.handleDonhangAction());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "save");
    \u0275\u0275elementEnd()();
  }
}
function DetailDonhangComponent_Conditional_10_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 6);
    \u0275\u0275listener("click", function DetailDonhangComponent_Conditional_10_button_1_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.toggleEdit());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "edit");
    \u0275\u0275elementEnd()();
  }
}
function DetailDonhangComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, DetailDonhangComponent_Conditional_10_button_0_Template, 3, 0, "button", 11)(1, DetailDonhangComponent_Conditional_10_button_1_Template, 3, 0, "button", 11);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("ngIf", ctx_r2.isEdit());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r2.isEdit());
  }
}
function DetailDonhangComponent_ng_container_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 12)(2, "div", 13);
    \u0275\u0275text(3, "B\u1EA1n ch\u1EAFc ch\u1EAFn mu\u1ED1n xo\xE1 kh\xF4ng?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 14)(5, "button", 15);
    \u0275\u0275listener("click", function DetailDonhangComponent_ng_container_12_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.DeleteData());
    });
    \u0275\u0275text(6, "\u0110\u1ED3ng \xDD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 16);
    \u0275\u0275listener("click", function DetailDonhangComponent_ng_container_12_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleDelete());
    });
    \u0275\u0275text(8, "Hu\u1EF7 B\u1ECF");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementContainerEnd();
  }
}
function DetailDonhangComponent_ng_container_13_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28);
    \u0275\u0275element(1, "img", 29);
    \u0275\u0275elementStart(2, "div", 30)(3, "div", 31);
    \u0275\u0275text(4, "C\xD4NG TY TNHH N\xD4NG S\u1EA2N TH\u1EF0C PH\u1EA8M TR\u1EA6N GIA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div");
    \u0275\u0275text(6, "H\u1EE3p t\xE1c x\xE3: \u1EA4p L\u1ED9c Ti\u1EBFn, X\xE3 M\u1EF9 L\u1ED9c, Huy\u1EC7n C\u1EA7n Giu\u1ED9c, T\u1EC9nh Long An");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div");
    \u0275\u0275text(8, "V\u0103n ph\xF2ng: T\xF2a nh\xE0 An Ph\xFA Plaza, 117-119 L\xFD Ch\xEDnh Th\u1EAFng, P.7, Q.3, TP.HCM");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div");
    \u0275\u0275text(10, "Kho s\u01A1 ch\u1EBF: 30 Kha V\u1EA1n C\xE2n, P. Hi\u1EC7p B\xECnh Ch\xE1nh, TP. Th\u1EE7 \u0110\u1EE9c, TP.HCM");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div");
    \u0275\u0275text(12, "Website: http://rausachtrangia.com - Hotline: 090.245.8081");
    \u0275\u0275elementEnd()()();
  }
}
function DetailDonhangComponent_ng_container_13_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 32);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("innerHTML", ctx_r2.DetailDonhang().khachhang.ghichu, \u0275\u0275sanitizeHtml);
  }
}
function DetailDonhangComponent_ng_container_13_div_9_div_8_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 42);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r7 = ctx.$implicit;
    \u0275\u0275property("value", item_r7.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r7.name);
  }
}
function DetailDonhangComponent_ng_container_13_div_9_div_8_ForEmpty_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 48);
    \u0275\u0275text(1, "Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u");
    \u0275\u0275elementEnd();
  }
}
function DetailDonhangComponent_ng_container_13_div_9_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 41);
    \u0275\u0275repeaterCreate(1, DetailDonhangComponent_ng_container_13_div_9_div_8_For_2_Template, 2, 2, "mat-option", 42, _forTrack0, false, DetailDonhangComponent_ng_container_13_div_9_div_8_ForEmpty_3_Template, 2, 0, "mat-option", 48);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.filterKhachhang);
  }
}
function DetailDonhangComponent_ng_container_13_div_9_For_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 42);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r8 = ctx.$implicit;
    \u0275\u0275property("value", item_r8.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r8.title, " ");
  }
}
function DetailDonhangComponent_ng_container_13_div_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 33)(1, "mat-form-field", 34)(2, "mat-label");
    \u0275\u0275text(3, "Kh\xE1ch H\xE0ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "mat-select", 35);
    \u0275\u0275twoWayListener("ngModelChange", function DetailDonhangComponent_ng_container_13_div_9_Template_mat_select_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.DetailDonhang().khachhangId, $event) || (ctx_r2.DetailDonhang().khachhangId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("selectionChange", function DetailDonhangComponent_ng_container_13_div_9_Template_mat_select_selectionChange_4_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.SelectKhachhang($event));
    });
    \u0275\u0275elementStart(5, "div", 36)(6, "mat-form-field", 37)(7, "input", 38);
    \u0275\u0275listener("input", function DetailDonhangComponent_ng_container_13_div_9_Template_input_input_7_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.DoFindKhachhang($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275template(8, DetailDonhangComponent_ng_container_13_div_9_div_8_Template, 4, 1, "div", 39);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "mat-form-field", 34)(10, "mat-label");
    \u0275\u0275text(11, "B\u1EA3ng Gi\xE1");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "mat-select", 35);
    \u0275\u0275twoWayListener("ngModelChange", function DetailDonhangComponent_ng_container_13_div_9_Template_mat_select_ngModelChange_12_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.DetailDonhang().khachhang.banggiaId, $event) || (ctx_r2.DetailDonhang().khachhang.banggiaId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("selectionChange", function DetailDonhangComponent_ng_container_13_div_9_Template_mat_select_selectionChange_12_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.SelectBanggia($event));
    });
    \u0275\u0275elementStart(13, "div", 36)(14, "mat-form-field", 37)(15, "input", 40);
    \u0275\u0275listener("input", function DetailDonhangComponent_ng_container_13_div_9_Template_input_input_15_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.DoFindBanggia($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 41);
    \u0275\u0275repeaterCreate(17, DetailDonhangComponent_ng_container_13_div_9_For_18_Template, 2, 2, "mat-option", 42, _forTrack0);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(19, "mat-form-field", 43)(20, "mat-label");
    \u0275\u0275text(21, "Ng\xE0y Giao H\xE0ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "input", 44);
    \u0275\u0275twoWayListener("ngModelChange", function DetailDonhangComponent_ng_container_13_div_9_Template_input_ngModelChange_22_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.DetailDonhang().ngaygiao, $event) || (ctx_r2.DetailDonhang().ngaygiao = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275element(23, "mat-datepicker-toggle", 45)(24, "mat-datepicker", null, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "mat-form-field", 46)(27, "mat-label");
    \u0275\u0275text(28, "Ghi Ch\xFA \u0110\u01A1n H\xE0ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "textarea", 47);
    \u0275\u0275twoWayListener("ngModelChange", function DetailDonhangComponent_ng_container_13_div_9_Template_textarea_ngModelChange_29_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.DetailDonhang().ghichu, $event) || (ctx_r2.DetailDonhang().ghichu = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const datepicker_r9 = \u0275\u0275reference(25);
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.DetailDonhang().khachhangId);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(14, _c1));
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r2.isLoadingKhachhang());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r2.isLoadingKhachhang());
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.DetailDonhang().khachhang.banggiaId);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(15, _c1));
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r2.filterBanggia);
    \u0275\u0275advance(2);
    \u0275\u0275property("appearance", "outline")("subscriptSizing", "dynamic");
    \u0275\u0275advance(3);
    \u0275\u0275property("matDatepicker", datepicker_r9);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.DetailDonhang().ngaygiao);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(16, _c1));
    \u0275\u0275advance();
    \u0275\u0275property("for", datepicker_r9);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.DetailDonhang().ghichu);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(17, _c1));
  }
}
function DetailDonhangComponent_ng_container_13_div_26_Defer_1_div_23_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 73);
    \u0275\u0275text(1, "check");
    \u0275\u0275elementEnd();
  }
}
function DetailDonhangComponent_ng_container_13_div_26_Defer_1_div_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 71);
    \u0275\u0275listener("click", function DetailDonhangComponent_ng_container_13_div_26_Defer_1_div_23_Template_div_click_0_listener() {
      const item_r12 = \u0275\u0275restoreView(_r11).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r2.ChosenItem(item_r12));
    });
    \u0275\u0275template(1, DetailDonhangComponent_ng_container_13_div_26_Defer_1_div_23_span_1_Template, 2, 0, "span", 72);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r12 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.CheckItem(item_r12));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r12.title || "Ch\u01B0a C\xF3 T\xEAn", " ");
  }
}
function DetailDonhangComponent_ng_container_13_div_26_Defer_1_For_39_th_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 76)(1, "span", 77);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const column_r14 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.ColumnName[column_r14], " ");
  }
}
function DetailDonhangComponent_ng_container_13_div_26_Defer_1_For_39_td_2_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 79)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 83);
    \u0275\u0275listener("click", function DetailDonhangComponent_ng_container_13_div_26_Defer_1_For_39_td_2_Case_1_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r15);
      const row_r16 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r2.RemoveSanpham(row_r16));
    });
    \u0275\u0275elementStart(4, "mat-icon");
    \u0275\u0275text(5, "delete");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const idx_r17 = \u0275\u0275nextContext().index;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", idx_r17 + 1, " ");
  }
}
function DetailDonhangComponent_ng_container_13_div_26_Defer_1_For_39_td_2_Case_2_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 85);
    \u0275\u0275listener("focus", function DetailDonhangComponent_ng_container_13_div_26_Defer_1_For_39_td_2_Case_2_Conditional_0_Template_div_focus_0_listener($event) {
      \u0275\u0275restoreView(_r18);
      const ctx_r2 = \u0275\u0275nextContext(7);
      return \u0275\u0275resetView(ctx_r2.onInputFocus($event));
    })("blur", function DetailDonhangComponent_ng_container_13_div_26_Defer_1_For_39_td_2_Case_2_Conditional_0_Template_div_blur_0_listener($event) {
      \u0275\u0275restoreView(_r18);
      const ctx_r18 = \u0275\u0275nextContext(2);
      const row_r16 = ctx_r18.$implicit;
      const idx_r17 = ctx_r18.index;
      const ctx_r2 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r2.updateBlurValue($event, idx_r17, row_r16, "sldat", "number"));
    })("keydown.enter", function DetailDonhangComponent_ng_container_13_div_26_Defer_1_For_39_td_2_Case_2_Conditional_0_Template_div_keydown_enter_0_listener($event) {
      \u0275\u0275restoreView(_r18);
      const ctx_r18 = \u0275\u0275nextContext(2);
      const row_r16 = ctx_r18.$implicit;
      const idx_r17 = ctx_r18.index;
      const ctx_r2 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r2.updateValue($event, idx_r17, row_r16, "sldat", "number"));
    });
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r16 = \u0275\u0275nextContext(2).$implicit;
    const column_r14 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("contentEditable", true);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 2, row_r16[column_r14] || 0, "1.0-2"), " ");
  }
}
function DetailDonhangComponent_ng_container_13_div_26_Defer_1_For_39_td_2_Case_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 80);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r16 = \u0275\u0275nextContext(2).$implicit;
    const column_r14 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, row_r16[column_r14] || 0, "1.0-2"));
  }
}
function DetailDonhangComponent_ng_container_13_div_26_Defer_1_For_39_td_2_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, DetailDonhangComponent_ng_container_13_div_26_Defer_1_For_39_td_2_Case_2_Conditional_0_Template, 3, 5, "div", 84)(1, DetailDonhangComponent_ng_container_13_div_26_Defer_1_For_39_td_2_Case_2_Conditional_1_Template, 3, 4, "div", 80);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(6);
    \u0275\u0275conditional((ctx_r2.permissions == null ? null : ctx_r2.permissions.includes("donhang.sldat")) ? 0 : 1);
  }
}
function DetailDonhangComponent_ng_container_13_div_26_Defer_1_For_39_td_2_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 80);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r16 = \u0275\u0275nextContext().$implicit;
    const column_r14 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, row_r16[column_r14] || 0, "1.0-2"));
  }
}
function DetailDonhangComponent_ng_container_13_div_26_Defer_1_For_39_td_2_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 80);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r16 = \u0275\u0275nextContext().$implicit;
    const column_r14 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, row_r16[column_r14] || 0, "1.0-2"));
  }
}
function DetailDonhangComponent_ng_container_13_div_26_Defer_1_For_39_td_2_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 86);
    \u0275\u0275listener("focus", function DetailDonhangComponent_ng_container_13_div_26_Defer_1_For_39_td_2_Case_5_Template_div_focus_0_listener($event) {
      \u0275\u0275restoreView(_r20);
      const ctx_r2 = \u0275\u0275nextContext(6);
      return \u0275\u0275resetView(ctx_r2.onInputFocus($event));
    })("blur", function DetailDonhangComponent_ng_container_13_div_26_Defer_1_For_39_td_2_Case_5_Template_div_blur_0_listener($event) {
      \u0275\u0275restoreView(_r20);
      const ctx_r18 = \u0275\u0275nextContext();
      const row_r16 = ctx_r18.$implicit;
      const idx_r17 = ctx_r18.index;
      const ctx_r2 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r2.updateBlurValue($event, idx_r17, row_r16, "ghichu", "string"));
    })("keydown.enter", function DetailDonhangComponent_ng_container_13_div_26_Defer_1_For_39_td_2_Case_5_Template_div_keydown_enter_0_listener($event) {
      \u0275\u0275restoreView(_r20);
      const ctx_r18 = \u0275\u0275nextContext();
      const row_r16 = ctx_r18.$implicit;
      const idx_r17 = ctx_r18.index;
      const ctx_r2 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r2.updateValue($event, idx_r17, row_r16, "ghichu", "string"));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r16 = \u0275\u0275nextContext().$implicit;
    const column_r14 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("contentEditable", true);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r16[column_r14] || "", " ");
  }
}
function DetailDonhangComponent_ng_container_13_div_26_Defer_1_For_39_td_2_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 82);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r16 = \u0275\u0275nextContext().$implicit;
    const column_r14 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r16[column_r14], " ");
  }
}
function DetailDonhangComponent_ng_container_13_div_26_Defer_1_For_39_td_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 78);
    \u0275\u0275template(1, DetailDonhangComponent_ng_container_13_div_26_Defer_1_For_39_td_2_Case_1_Template, 6, 1, "span", 79)(2, DetailDonhangComponent_ng_container_13_div_26_Defer_1_For_39_td_2_Case_2_Template, 2, 1)(3, DetailDonhangComponent_ng_container_13_div_26_Defer_1_For_39_td_2_Case_3_Template, 3, 4, "div", 80)(4, DetailDonhangComponent_ng_container_13_div_26_Defer_1_For_39_td_2_Case_4_Template, 3, 4, "div", 80)(5, DetailDonhangComponent_ng_container_13_div_26_Defer_1_For_39_td_2_Case_5_Template, 2, 2, "div", 81)(6, DetailDonhangComponent_ng_container_13_div_26_Defer_1_For_39_td_2_Case_6_Template, 2, 1, "span", 82);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_20_0;
    const column_r14 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_20_0 = column_r14) === "STT" ? 1 : tmp_20_0 === "sldat" ? 2 : tmp_20_0 === "slgiao" ? 3 : tmp_20_0 === "slnhan" ? 4 : tmp_20_0 === "ghichu" ? 5 : 6);
  }
}
function DetailDonhangComponent_ng_container_13_div_26_Defer_1_For_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0, 67);
    \u0275\u0275template(1, DetailDonhangComponent_ng_container_13_div_26_Defer_1_For_39_th_1_Template, 3, 1, "th", 74)(2, DetailDonhangComponent_ng_container_13_div_26_Defer_1_For_39_td_2_Template, 7, 1, "td", 75);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const column_r14 = ctx.$implicit;
    \u0275\u0275property("matColumnDef", column_r14);
  }
}
function DetailDonhangComponent_ng_container_13_div_26_Defer_1_tr_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 87);
  }
}
function DetailDonhangComponent_ng_container_13_div_26_Defer_1_tr_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 88);
  }
}
function DetailDonhangComponent_ng_container_13_div_26_Defer_1_tr_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 89)(1, "td", 90);
    \u0275\u0275text(2, "Kh\xF4ng t\xECm th\u1EA5y");
    \u0275\u0275elementEnd()();
  }
}
function DetailDonhangComponent_ng_container_13_div_26_Defer_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 50)(1, "div", 51)(2, "button", 52, 2);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "mat-menu", null, 3)(7, "div", 53);
    \u0275\u0275listener("click", function DetailDonhangComponent_ng_container_13_div_26_Defer_1_Template_div_click_7_listener($event) {
      \u0275\u0275restoreView(_r10);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(8, "div", 54)(9, "input", 55, 4);
    \u0275\u0275listener("keyup", function DetailDonhangComponent_ng_container_13_div_26_Defer_1_Template_input_keyup_9_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.doFilterSanpham($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 56)(12, "span", 57);
    \u0275\u0275text(13, "search");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "div", 58)(15, "div", 8)(16, "span", 59);
    \u0275\u0275listener("click", function DetailDonhangComponent_ng_container_13_div_26_Defer_1_Template_span_click_16_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.ChosenAll(ctx_r2.filterSanpham));
    });
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "span", 59);
    \u0275\u0275listener("click", function DetailDonhangComponent_ng_container_13_div_26_Defer_1_Template_span_click_18_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.EmptyFiter());
    });
    \u0275\u0275text(19, "Xo\xE1");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "span", 59);
    \u0275\u0275listener("click", function DetailDonhangComponent_ng_container_13_div_26_Defer_1_Template_span_click_20_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.ResetFilter());
    });
    \u0275\u0275text(21, "Reset");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 60);
    \u0275\u0275template(23, DetailDonhangComponent_ng_container_13_div_26_Defer_1_div_23_Template, 3, 2, "div", 61);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div", 62)(25, "button", 16);
    \u0275\u0275listener("click", function DetailDonhangComponent_ng_container_13_div_26_Defer_1_Template_button_click_25_listener() {
      \u0275\u0275restoreView(_r10);
      const menuTrigger_r13 = \u0275\u0275reference(3);
      return \u0275\u0275resetView(menuTrigger_r13.closeMenu());
    });
    \u0275\u0275text(26, "\u0110\xF3ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "button", 15);
    \u0275\u0275listener("click", function DetailDonhangComponent_ng_container_13_div_26_Defer_1_Template_button_click_27_listener() {
      \u0275\u0275restoreView(_r10);
      const menuTrigger_r13 = \u0275\u0275reference(3);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.ApplyFilterColum(menuTrigger_r13));
    });
    \u0275\u0275text(28, "\xC1p D\u1EE5ng");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(29, "mat-form-field", 34)(30, "mat-label");
    \u0275\u0275text(31, "T\xECm Ki\u1EBFm");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "input", 63);
    \u0275\u0275listener("keyup", function DetailDonhangComponent_ng_container_13_div_26_Defer_1_Template_input_keyup_32_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.applyFilter($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "button", 64);
    \u0275\u0275listener("click", function DetailDonhangComponent_ng_container_13_div_26_Defer_1_Template_button_click_33_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.EmptyCart());
    });
    \u0275\u0275elementStart(34, "mat-icon");
    \u0275\u0275text(35, "delete");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(36, "div", 65)(37, "table", 66);
    \u0275\u0275repeaterCreate(38, DetailDonhangComponent_ng_container_13_div_26_Defer_1_For_39_Template, 3, 1, "ng-container", 67, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275template(40, DetailDonhangComponent_ng_container_13_div_26_Defer_1_tr_40_Template, 1, 0, "tr", 68)(41, DetailDonhangComponent_ng_container_13_div_26_Defer_1_tr_41_Template, 1, 0, "tr", 69)(42, DetailDonhangComponent_ng_container_13_div_26_Defer_1_tr_42_Template, 3, 0, "tr", 70);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const menu_r21 = \u0275\u0275reference(6);
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx_r2.isEdit())("matMenuTriggerFor", menu_r21);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.ListFilter.length, " S\u1EA3n Ph\u1EA9m ");
    \u0275\u0275advance(13);
    \u0275\u0275textInterpolate1("Ch\u1ECDn T\u1EA5t C\u1EA3 ", ctx_r2.ListFilter.length, "");
    \u0275\u0275advance(6);
    \u0275\u0275property("ngForOf", ctx_r2.filterSanpham)("ngForTrackBy", ctx_r2.trackByFn);
    \u0275\u0275advance(10);
    \u0275\u0275property("disabled", !ctx_r2.isEdit());
    \u0275\u0275advance(4);
    \u0275\u0275property("dataSource", ctx_r2.dataSource());
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.displayedColumns);
    \u0275\u0275advance(2);
    \u0275\u0275property("matHeaderRowDef", ctx_r2.displayedColumns);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r2.displayedColumns);
  }
}
function DetailDonhangComponent_ng_container_13_div_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 49);
    \u0275\u0275template(1, DetailDonhangComponent_ng_container_13_div_26_Defer_1_Template, 43, 10);
    \u0275\u0275defer(2, 1, DetailDonhangComponent_ng_container_13_div_26_Defer_2_DepsFn);
    \u0275\u0275deferOnIdle();
    \u0275\u0275elementEnd();
  }
}
function DetailDonhangComponent_ng_container_13_table_27_For_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 92)(1, "td", 98);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 93);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 98);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 99);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td", 100);
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td", 99);
    \u0275\u0275text(14);
    \u0275\u0275pipe(15, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "td", 93);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r22 = ctx.$implicit;
    const \u0275$index_358_r23 = ctx.$index;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275$index_358_r23 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r22.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r22.dvt);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(9, 7, item_r22.sldat, "1.0-2"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(12, 10, item_r22.slgiao, "1.0-2"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(15, 13, item_r22.slnhan, "1.0-2"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r22.ghichu);
  }
}
function DetailDonhangComponent_ng_container_13_table_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 91)(1, "thead")(2, "tr", 92)(3, "th", 93);
    \u0275\u0275text(4, "STT");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th", 93);
    \u0275\u0275text(6, "T\xEAn s\u1EA3n ph\u1EA9m");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th", 93);
    \u0275\u0275text(8, "\u0110VT");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th", 94);
    \u0275\u0275text(10, "SL \u0110\u1EB7t");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th", 94);
    \u0275\u0275text(12, "SL Giao");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th", 94);
    \u0275\u0275text(14, "SL Nh\u1EADn");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th", 93);
    \u0275\u0275text(16, "Ghi ch\xFA");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "tbody");
    \u0275\u0275repeaterCreate(18, DetailDonhangComponent_ng_container_13_table_27_For_19_Template, 18, 16, "tr", 92, _forTrack0);
    \u0275\u0275elementStart(20, "tr", 92)(21, "td", 95);
    \u0275\u0275text(22, "T\u1ED5ng:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "td", 96);
    \u0275\u0275text(24);
    \u0275\u0275pipe(25, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "td", 96);
    \u0275\u0275text(27);
    \u0275\u0275pipe(28, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "td", 96);
    \u0275\u0275text(30);
    \u0275\u0275pipe(31, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275element(32, "td", 97);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(18);
    \u0275\u0275repeater(ctx_r2.DetailDonhang().sanpham);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(25, 3, ctx_r2.TinhTong(ctx_r2.DetailDonhang().sanpham, "sldat"), "1.0-2"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(28, 6, ctx_r2.TinhTong(ctx_r2.DetailDonhang().sanpham, "slgiao"), "1.0-2"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(31, 9, ctx_r2.TinhTong(ctx_r2.DetailDonhang().sanpham, "slnhan"), "1.0-2"), " ");
  }
}
function DetailDonhangComponent_ng_container_13_div_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 101);
    \u0275\u0275text(1, "Ng\xE0y In:");
    \u0275\u0275elementEnd();
  }
}
function DetailDonhangComponent_ng_container_13_div_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 102)(1, "p")(2, "strong");
    \u0275\u0275text(3, "Ng\u01B0\u1EDDi v\u1EADn chuy\u1EC3n");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "p")(5, "strong");
    \u0275\u0275text(6, "Ng\u01B0\u1EDDi nh\u1EADn h\xE0ng");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "p")(8, "strong");
    \u0275\u0275text(9, "Th\u1EE7 kho");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "p")(11, "strong");
    \u0275\u0275text(12, "Ng\u01B0\u1EDDi l\u1EADp");
    \u0275\u0275elementEnd()()();
  }
}
function DetailDonhangComponent_ng_container_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 17)(2, "div", 18);
    \u0275\u0275template(3, DetailDonhangComponent_ng_container_13_div_3_Template, 13, 0, "div", 19);
    \u0275\u0275elementStart(4, "div", 20);
    \u0275\u0275text(5, "B\u1EA3ng Sao K\xEA H\xE0ng Ng\xE0y");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275template(8, DetailDonhangComponent_ng_container_13_div_8_Template, 1, 1, "div", 21)(9, DetailDonhangComponent_ng_container_13_div_9_Template, 30, 18, "div", 22);
    \u0275\u0275elementStart(10, "div", 23)(11, "strong");
    \u0275\u0275text(12, "\u0110\u1ECBa Ch\u1EC9 : ");
    \u0275\u0275elementEnd();
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 23)(15, "strong");
    \u0275\u0275text(16, "Ghi Ch\xFA : ");
    \u0275\u0275elementEnd();
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 23)(19, "strong");
    \u0275\u0275text(20, "S\u1ED1 \u0110i\u1EC7n Tho\u1EA1i : ");
    \u0275\u0275elementEnd();
    \u0275\u0275text(21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div", 23)(23, "strong");
    \u0275\u0275text(24);
    \u0275\u0275pipe(25, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(26, DetailDonhangComponent_ng_container_13_div_26_Template, 4, 0, "div", 24)(27, DetailDonhangComponent_ng_container_13_table_27_Template, 33, 12, "table", 25)(28, DetailDonhangComponent_ng_container_13_div_28_Template, 2, 0, "div", 26)(29, DetailDonhangComponent_ng_container_13_div_29_Template, 13, 0, "div", 27);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    let tmp_3_0;
    let tmp_4_0;
    let tmp_5_0;
    let tmp_7_0;
    let tmp_8_0;
    let tmp_9_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", !ctx_r2.isEdit());
    \u0275\u0275advance(3);
    \u0275\u0275classMapInterpolate1("font-bold text-[18px] uppercase ", ((tmp_3_0 = ctx_r2.DetailDonhang()) == null ? null : tmp_3_0.khachhangId) ? "" : "text-red-700 italic", "");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ((tmp_4_0 = ctx_r2.DetailDonhang()) == null ? null : tmp_4_0.khachhang == null ? null : tmp_4_0.khachhang.name) || "Ch\u01B0a Ch\u1ECDn Kh\xE1ch H\xE0ng", "");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.isEdit() && ((tmp_5_0 = ctx_r2.DetailDonhang()) == null ? null : tmp_5_0.khachhang == null ? null : tmp_5_0.khachhang.ghichu));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.isEdit());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", (tmp_7_0 = ctx_r2.DetailDonhang()) == null ? null : tmp_7_0.khachhang == null ? null : tmp_7_0.khachhang.diachi, "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", (tmp_8_0 = ctx_r2.DetailDonhang()) == null ? null : tmp_8_0.ghichu, "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", (tmp_9_0 = ctx_r2.DetailDonhang()) == null ? null : tmp_9_0.khachhang == null ? null : tmp_9_0.khachhang.sdt, "");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("T\u1ED5ng kh\u1ED1i l\u01B0\u1EE3ng : ", \u0275\u0275pipeBind2(25, 15, ctx_r2.TinhTong(ctx_r2.DetailDonhang().sanpham, "slgiao"), "1.0-2"), "");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r2.isEdit());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r2.isEdit());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r2.isEdit());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r2.isEdit());
  }
}
function DetailDonhangComponent_ng_template_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-dialog-content", 103)(1, "div", 104)(2, "div", 105);
    \u0275\u0275text(3, "B\u1EA3ng gi\xE1 n\xE0y \u0111\xE3 h\u1EBFt h\u1EA1n, ti\u1EBFp t\u1EE5c s\u1EED d\u1EE5ng");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 106)(5, "button", 107);
    \u0275\u0275text(6, "\u0110\u1ED3ng \xDD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 108);
    \u0275\u0275text(8, "Hu\u1EF7 B\u1ECF");
    \u0275\u0275elementEnd()()();
  }
}
var DetailDonhangComponent = class _DetailDonhangComponent {
  _ListdonhangComponent = inject(ListDonhangComponent);
  _DonhangService = inject(DonhangService);
  _KhachhangService = inject(KhachhangService);
  _BanggiaService = inject(BanggiaService);
  _SanphamService = inject(SanphamService);
  _SearchService = inject(SearchService);
  _UserService = inject(UserService);
  _route = inject(ActivatedRoute);
  _router = inject(Router);
  _snackBar = inject(MatSnackBar);
  BgHethanDialog;
  ListFilter = [];
  constructor() {
    this._route.paramMap.subscribe((params) => __async(this, null, function* () {
      const id = params.get("id");
      this._DonhangService.setDonhangId(id);
    }));
    effect(() => __async(this, null, function* () {
      const id = this._DonhangService.donhangId();
      if (!id) {
        this._router.navigate(["/admin/donhang"]);
        this._ListdonhangComponent.drawer.close();
      }
      if (id === "new") {
        this.DetailDonhang.set({
          title: GenId(8, false),
          // madonhang: GenId(8, false),
          ngaygiao: (0, import_moment.default)().add(1, "days").format("YYYY-MM-DD"),
          khachhang: { banggiaId: "" }
        });
        this._ListdonhangComponent.drawer.open();
        this.isEdit.update((value) => !value);
        this.ListFilter = [];
        this._router.navigate(["/admin/donhang", "new"]);
      } else {
        yield this._DonhangService.getDonhangByid(id);
        this.ListFilter = this.DetailDonhang().sanpham;
        this.dataSource().data = this.DetailDonhang().sanpham;
        this.dataSource().data.sort((a, b) => a.order - b.order);
        this._ListdonhangComponent.drawer.open();
        this._router.navigate(["/admin/donhang", id]);
      }
      yield this._KhachhangService.getKhachhangforselect();
      this.filterKhachhang = this.ListKhachhang();
      yield this._SanphamService.getSanphamforselect();
      this.filterSanpham = this.ListSanpham();
    }));
  }
  DetailDonhang = this._DonhangService.DetailDonhang;
  ListKhachhang = this._KhachhangService.ListKhachhang;
  ListSanpham = this._SanphamService.ListSanpham;
  isEdit = signal(false);
  isDelete = signal(false);
  filterKhachhang = [];
  filterBanggia = [];
  filterSanpham = [];
  donhangId = this._DonhangService.donhangId;
  permissions = [];
  ngOnInit() {
    return __async(this, null, function* () {
      yield this._UserService.getProfile();
      this.permissions = this._UserService.profile().permissions.map((v) => v.name);
      yield this._BanggiaService.getAllBanggia();
      this.filterBanggia = this._BanggiaService.ListBanggia();
    });
  }
  handleDonhangAction() {
    return __async(this, null, function* () {
      const validationError = this.validateDonhang();
      if (validationError) {
        this._snackBar.open(validationError, "", {
          duration: 2e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
        return;
      }
      if (this.donhangId() === "new") {
        yield this.createDonhang();
      } else {
        yield this.updateDonhang();
      }
    });
  }
  validateDonhang() {
    const donhang = this.DetailDonhang();
    if (!donhang.title || donhang.title.trim() === "") {
      return "Vui l\xF2ng nh\u1EADp ti\xEAu \u0111\u1EC1 \u0111\u01A1n h\xE0ng";
    }
    if (!donhang.ngaygiao) {
      return "Vui l\xF2ng ch\u1ECDn ng\xE0y giao";
    }
    if (!donhang.khachhangId) {
      return "Vui l\xF2ng ch\u1ECDn kh\xE1ch h\xE0ng";
    }
    if (!donhang.sanpham || donhang.sanpham.length === 0) {
      return "Vui l\xF2ng th\xEAm \xEDt nh\u1EA5t m\u1ED9t s\u1EA3n ph\u1EA9m";
    }
    for (const sp of donhang.sanpham) {
      if (!sp.sldat || sp.sldat <= 0) {
        return `S\u1ED1 l\u01B0\u1EE3ng \u0111\u1EB7t c\u1EE7a s\u1EA3n ph\u1EA9m "${sp.title}" ph\u1EA3i l\u1EDBn h\u01A1n 0`;
      }
      if (sp.slgiao < sp.sldat) {
        return `S\u1ED1 l\u01B0\u1EE3ng giao c\u1EE7a s\u1EA3n ph\u1EA9m "${sp.title}" kh\xF4ng \u0111\u01B0\u1EE3c nh\u1ECF h\u01A1n s\u1ED1 l\u01B0\u1EE3ng \u0111\u1EB7t`;
      }
    }
    if (this.donhangId() === "new") {
      const ngayGiao = (0, import_moment.default)(donhang.ngaygiao);
      const today = (0, import_moment.default)().startOf("day");
      if (ngayGiao.isBefore(today)) {
        return "Ng\xE0y giao kh\xF4ng \u0111\u01B0\u1EE3c trong qu\xE1 kh\u1EE9";
      }
    }
    return null;
  }
  createDonhang() {
    return __async(this, null, function* () {
      try {
        this.DetailDonhang.update((v) => __spreadProps(__spreadValues({}, v), {
          type: "donsi",
          status: "dadat"
        }));
        yield this._DonhangService.CreateDonhang(this.DetailDonhang()).then((data) => {
          console.log(data);
        });
        this._snackBar.open("T\u1EA1o M\u1EDBi Th\xE0nh C\xF4ng", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        this.isEdit.update((value) => !value);
      } catch (error) {
        console.error("L\u1ED7i khi t\u1EA1o donhang:", error);
      }
    });
  }
  updateDonhang(status) {
    return __async(this, null, function* () {
      try {
        this.DetailDonhang.update((v) => __spreadProps(__spreadValues({}, v), {
          type: "donsi",
          status: status || v.status
        }));
        yield this._DonhangService.updateDonhang(this.DetailDonhang()).then((data) => {
          console.log(data);
        });
        this._snackBar.open("C\u1EADp Nh\u1EADt Th\xE0nh C\xF4ng", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        this.isEdit.update((value) => !value);
      } catch (error) {
        console.error("L\u1ED7i khi c\u1EADp nh\u1EADt donhang:", error);
      }
    });
  }
  UpdateStatus(status) {
    this.updateDonhang(status);
  }
  DeleteData() {
    return __async(this, null, function* () {
      try {
        yield this._DonhangService.DeleteDonhang(this.DetailDonhang());
        this._snackBar.open("X\xF3a Th\xE0nh C\xF4ng", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        this._router.navigate(["/admin/donhang"]);
      } catch (error) {
        console.error("L\u1ED7i khi x\xF3a donhang:", error);
      }
    });
  }
  goBack() {
    this._router.navigate(["/admin/donhang"]);
    this._ListdonhangComponent.drawer.close();
  }
  trackByFn(index, item) {
    return item.id;
  }
  // Method để auto-select text khi focus vào input - Same as detailphieugiaohang
  onInputFocus(event) {
    const target = event.target;
    if (target && target.isContentEditable) {
      setTimeout(() => {
        if (document.createRange && window.getSelection) {
          const range = document.createRange();
          range.selectNodeContents(target);
          const selection = window.getSelection();
          selection?.removeAllRanges();
          selection?.addRange(range);
        }
      }, 10);
    }
  }
  toggleEdit() {
    this.isEdit.update((value) => !value);
  }
  toggleDelete() {
    this.isDelete.update((value) => !value);
  }
  FillSlug() {
    this.DetailDonhang.update((v) => {
      v.slug = convertToSlug(v.title);
      return v;
    });
  }
  searchInput$ = new Subject();
  isLoadingKhachhang = signal(false);
  DoFindKhachhang(event) {
    return __async(this, null, function* () {
      const value = event.target.value.trim().toLowerCase();
      try {
        this.isLoadingKhachhang.set(true);
        if (value.length < 2) {
          this.filterKhachhang = this.ListKhachhang();
          return;
        }
        this.filterKhachhang = this.ListKhachhang().filter((v) => v.makh.toLowerCase().includes(value) || v.name.toLowerCase().includes(value) || removeVietnameseAccents(v.makh.toLowerCase()).includes(value) || removeVietnameseAccents(v.name.toLowerCase()).includes(value));
      } catch (error) {
        console.error("L\u1ED7i khi t\xECm ki\u1EBFm kh\xE1ch h\xE0ng:", error);
        this._snackBar.open("L\u1ED7i khi t\xECm ki\u1EBFm kh\xE1ch h\xE0ng", "", {
          duration: 2e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      } finally {
        this.isLoadingKhachhang.set(false);
      }
    });
  }
  DoFindBanggia(event) {
    const query = event.target.value.toLowerCase();
  }
  UpdateBangia() {
  }
  SelectBanggia(event) {
    console.log(event.value);
  }
  Chonkhachhang(item) {
    this.DetailDonhang.update((v) => {
      v.khachhangId = item.id;
      return v;
    });
  }
  updateValue(event, index, element, field, type) {
    const target = event.target;
    let newValue;
    if (type === "number") {
      const textContent = target.innerText.trim().replace(/,/g, ".");
      newValue = Number(textContent) || 0;
    } else {
      newValue = target.innerText.trim();
    }
    const keyboardEvent = event;
    if (keyboardEvent.key === "Enter" && !keyboardEvent.shiftKey) {
      event.preventDefault();
    }
    if (type === "number") {
      const allowedKeys = [
        "Backspace",
        "Delete",
        "ArrowLeft",
        "ArrowRight",
        "Tab",
        "Enter",
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        // Regular number keys
        ".",
        ",",
        // Decimal separators
        "Home",
        "End",
        "PageUp",
        "PageDown"
        // Navigation keys
      ];
      const isDigit = /^[0-9]$/.test(keyboardEvent.key);
      const isNumpadDigit = keyboardEvent.code && keyboardEvent.code.startsWith("Numpad") && /Numpad[0-9]/.test(keyboardEvent.code);
      const isDecimal = keyboardEvent.key === "." || keyboardEvent.key === ",";
      const isControlKey = allowedKeys.includes(keyboardEvent.key);
      if (!isDigit && !isNumpadDigit && !isDecimal && !isControlKey) {
        event.preventDefault();
        return;
      }
    }
    this.DetailDonhang.update((v) => {
      if (index !== null) {
        const itemIndex = v.sanpham.findIndex((v1) => v1.id === element.id);
        if (field === "sldat") {
          v.sanpham[itemIndex]["sldat"] = v.sanpham[itemIndex]["slgiao"] = v.sanpham[itemIndex]["slnhan"] = newValue;
          const inputs = document.querySelectorAll(".sldat-input");
          if (index < this.dataSource().filteredData.length - 1) {
            const nextInput = inputs[index + 1];
            if (nextInput) {
              if (nextInput instanceof HTMLInputElement) {
                nextInput.focus();
                nextInput.select();
              }
              setTimeout(() => {
                if (document.createRange && window.getSelection) {
                  const range = document.createRange();
                  range.selectNodeContents(nextInput);
                  const selection = window.getSelection();
                  selection?.removeAllRanges();
                  selection?.addRange(range);
                }
              }, 10);
            }
          }
        } else if (field === "ghichu") {
          v.sanpham[itemIndex][field] = newValue;
          const inputs = document.querySelectorAll(".ghichu-input");
          if (index < this.dataSource().filteredData.length - 1) {
            const nextInput = inputs[index + 1];
            if (nextInput) {
              if (nextInput instanceof HTMLInputElement) {
                nextInput.focus();
                nextInput.select();
              }
              setTimeout(() => {
                if (document.createRange && window.getSelection) {
                  const range = document.createRange();
                  range.selectNodeContents(nextInput);
                  const selection = window.getSelection();
                  selection?.removeAllRanges();
                  selection?.addRange(range);
                }
              }, 10);
            }
          }
        } else if (field === "slgiao") {
          const newGiao = newValue;
          if (newGiao < v.sanpham[itemIndex]["sldat"]) {
            v.sanpham[itemIndex]["slgiao"] = v.sanpham[itemIndex]["sldat"];
            this._snackBar.open("S\u1ED1 l\u01B0\u1EE3ng giao ph\u1EA3i l\u1EDBn h\u01A1n s\u1ED1 l\u01B0\u1EE3ng \u0111\u1EB7t", "", {
              duration: 1e3,
              horizontalPosition: "end",
              verticalPosition: "top",
              panelClass: ["snackbar-error"]
            });
          } else {
            v.sanpham[itemIndex]["slgiao"] = newGiao;
          }
        } else {
          v.sanpham[itemIndex][field] = newValue;
        }
      } else {
        v[field] = newValue;
      }
      return v;
    });
  }
  updateBlurValue(event, index, element, field, type) {
    const target = event.target;
    let newValue;
    if (type === "number") {
      const textContent = target.innerText.trim().replace(/,/g, ".");
      newValue = Number(textContent) || 0;
    } else {
      newValue = target.innerText.trim();
    }
    this.DetailDonhang.update((v) => {
      if (index !== null) {
        const itemIndex = v.sanpham.findIndex((v1) => v1.id === element.id);
        if (field === "sldat") {
          v.sanpham[itemIndex] = __spreadProps(__spreadValues({}, v.sanpham[itemIndex]), {
            sldat: newValue,
            slgiao: newValue,
            slnhan: newValue
          });
        } else if (field === "slgiao") {
          if (newValue < v.sanpham[itemIndex]["sldat"]) {
            v.sanpham[itemIndex]["slgiao"] = v.sanpham[itemIndex]["sldat"];
            this._snackBar.open("S\u1ED1 l\u01B0\u1EE3ng giao ph\u1EA3i l\u1EDBn h\u01A1n s\u1ED1 l\u01B0\u1EE3ng \u0111\u1EB7t", "", {
              duration: 1e3,
              horizontalPosition: "end",
              verticalPosition: "top",
              panelClass: ["snackbar-error"]
            });
          } else {
            v.sanpham[itemIndex]["slgiao"] = newValue;
          }
        } else {
          v.sanpham[itemIndex][field] = newValue;
        }
        console.log("v.sanpham[itemIndex]", v.sanpham[itemIndex]);
      } else {
        v[field] = newValue;
      }
      return v;
    });
    this.dataSource.update((ds) => {
      ds.data = [...this.DetailDonhang().sanpham];
      return ds;
    });
  }
  Tongcong = 0;
  Tong = 0;
  Tinhtongcong(value) {
    this.Tongcong = value.Tongcong;
    this.Tong = value.Tong;
  }
  TinhTong(items, fieldTong) {
    return items?.reduce((sum, item) => sum + (item[fieldTong] || 0), 0) || 0;
  }
  _dialog = inject(MatDialog);
  SelectKhachhang(event) {
    const selectedKhachhang = this.filterKhachhang.find((v) => v.id === event.value);
    console.log(selectedKhachhang);
    if (selectedKhachhang) {
      const isExpired = (0, import_moment.default)() > (0, import_moment.default)(selectedKhachhang?.banggia?.batdau) && (0, import_moment.default)() < (0, import_moment.default)(selectedKhachhang.banggia.ketthuc) ? true : false;
      console.log(selectedKhachhang);
      console.log(isExpired);
      if (!isExpired) {
        const dialogRef = this._dialog.open(this.BgHethanDialog, {
          hasBackdrop: true,
          disableClose: true
        });
        dialogRef.afterClosed().subscribe((result) => {
          if (result === "true") {
            this.DetailDonhang.update((v) => {
              v.khachhang.banggiaId = selectedKhachhang?.banggia?.id;
              console.log(v.khachhang.banggiaId);
              return v;
            });
          }
        });
      } else {
        this.DetailDonhang.update((v) => {
          v.khachhang.banggiaId = selectedKhachhang?.banggia?.id;
          return v;
        });
      }
      this.DetailDonhang.update((v) => {
        const khachhang = {
          name: selectedKhachhang.name,
          diachi: selectedKhachhang.diachi,
          sdt: selectedKhachhang.sdt,
          ghichu: selectedKhachhang.ghichu,
          banggiaId: selectedKhachhang?.banggia?.id
        };
        v.khachhangId = selectedKhachhang.id;
        v.khachhang = khachhang;
        return v;
      });
    }
    console.log(this.DetailDonhang());
  }
  displayedColumns = [
    "STT",
    "title",
    "masp",
    "dvt",
    "sldat",
    "slgiao",
    "slnhan",
    "ghichu"
  ];
  ColumnName = {
    STT: "STT",
    title: "Ti\xEAu \u0110\u1EC1",
    masp: "M\xE3 SP",
    dvt: "\u0110\u01A1n V\u1ECB T\xEDnh",
    sldat: "SL \u0110\u1EB7t",
    slgiao: "SL Giao",
    slnhan: "SL Nh\u1EADn",
    ghichu: "Ghi Ch\xFA"
  };
  dataSource = signal(new MatTableDataSource([]));
  CountItem = computed(() => this.dataSource().data.length);
  paginator;
  sort;
  _GoogleSheetService = inject(GoogleSheetService);
  LoadDrive() {
    return __async(this, null, function* () {
      const DriveInfo = {
        IdSheet: "15npo25qyH5FmfcEjl1uyqqyFMS_vdFnmxM_kt0KYmZk",
        SheetName: "GHImport",
        ApiKey: "AIzaSyD33kgZJKdFpv1JrKHacjCQccL_O0a2Eao"
      };
      const result = yield this._GoogleSheetService.getDrive(DriveInfo);
      const data = ConvertDriveData(result.values);
      console.log(data);
      this.DetailDonhang.update((v) => {
        v.sanpham = data.map((v1) => {
          v1.sldat = Number(v1.sldat) || 0;
          v1.slgiao = Number(v1.slgiao) || 0;
          v1.slnhan = Number(v1.slnhan) || 0;
          v1.ttdat = Number(v1.ttdat) || 0;
          v1.ttgiao = Number(v1.ttgiao) || 0;
          v1.ttnhan = Number(v1.ttnhan) || 0;
          const item = this.ListSanpham().find((v2) => v2.masp === v1.masp);
          console.log(item);
          if (item) {
            return __spreadValues(__spreadValues({}, item), v1);
          }
          return v1;
        });
        return v;
      });
      console.log(this.DetailDonhang());
      this.dataSource().data = this.DetailDonhang().sanpham;
      this.reloadfilter();
    });
  }
  applyFilter(event) {
    const filterValue = event.target.value;
    this.dataSource().filter = filterValue.trim().toLowerCase();
  }
  EmptyCart() {
    this.DetailDonhang.update((v) => {
      v.sanpham = [];
      return v;
    });
    this.dataSource().data = this.DetailDonhang().sanpham;
    this.ListFilter = [];
    this.reloadfilter();
  }
  getName(id) {
    return this.ListKhachhang().find((v) => v.id === id);
  }
  reloadfilter() {
    this.filterSanpham = this.ListSanpham().filter((v) => !this.DetailDonhang().sanpham.some((v2) => v2.id === v.id));
  }
  // RemoveSanpham(item:any){
  //   this.DetailBanggia.update((v:any)=>{
  //     v.sanpham = v.sanpham.filter((v1:any) => v1.id !== item.id);
  //     this.reloadfilter();
  //     return v;
  //   })
  //   this.dataSource().data = this.DetailBanggia().sanpham;
  //   
  //   this.dataSource().sort = this.sort;
  // }
  // SelectSanpham(event:any){
  //   const value = event.value;
  //   const item = this.ListSanpham().find((v:any) => v.id === value);
  //   this.DetailDonhang.update((v:any)=>{
  //     if(!v.sanpham){
  //       v.sanpham = [];
  //       item.sldat = item.slgiao = item.slnhan = 1;
  //       v.sanpham.push(item);
  //     }
  //     else{
  //         item.sldat = item.slgiao = item.slnhan = 1;
  //         v.sanpham.push(item);
  //     }
  //     this.reloadfilter();
  //     return v;
  //   })
  //   this.dataSource().data = this.DetailDonhang().sanpham;
  // }
  RemoveSanpham(item) {
    this.DetailDonhang.update((v) => {
      v.sanpham = v.sanpham.filter((v1) => v1.id !== item.id);
      this.reloadfilter();
      return v;
    });
    this.ListFilter = this.dataSource().data = this.DetailDonhang().sanpham;
  }
  CoppyDon() {
    this._snackBar.open("\u0110ang Coppy \u0110\u01A1n H\xE0ng", "", {
      duration: 1e3,
      horizontalPosition: "end",
      verticalPosition: "top",
      panelClass: ["snackbar-warning"]
    });
    this.DetailDonhang.update((v) => {
      delete v.id;
      v.title = `${v.title} - Coppy`;
      v.madonhang = GenId(8, false);
      return v;
    });
    console.log(this.DetailDonhang());
    this._DonhangService.CreateDonhang(this.DetailDonhang()).then((data) => {
      if (data) {
        this._snackBar.open("Coppy \u0110\u01A1n H\xE0ng Th\xE0nh C\xF4ng", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        this._router.navigate(["/admin/donhang", data.id]);
      } else {
        this._snackBar.open("Coppy \u0110\u01A1n H\xE0ng Th\u1EA5t B\u1EA1i", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      }
    });
  }
  printContent() {
    const printContent = document.getElementById("printContent");
    if (printContent) {
      const newWindow = window.open("", "_blank");
      const tailwindCSS = `
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        theme: { extend: {} }
      };
    </script>
  `;
      if (newWindow) {
        newWindow.document.write(`
          <html>
          <head>
            <title>In B\u1EA3ng</title>
             ${tailwindCSS}
            <style>
              body { font-size: 12px; font-family: Arial, sans-serif; }
              table { width: 100%; border-collapse: collapse; }
              th, td { border: 1px solid #000; padding: 4px; text-align: left; }
              @media print { 
              body { margin: 0; } 
              img {height:80px}
              }
            </style>
          </head>
          <body>
            ${printContent.outerHTML}
            <script>
              window.onload = function() { window.print(); window.close(); }
            </script>
          </body>
          </html>
        `);
        newWindow.document.close();
        this.DetailDonhang.update((v) => {
          v.printCount = v.printCount + 1;
          return v;
        });
        console.log(this.DetailDonhang());
        this._DonhangService.updateDonhang(this.DetailDonhang());
      } else {
        console.error("Kh\xF4ng th\u1EC3 m\u1EDF c\u1EEDa s\u1ED5 in");
      }
    } else {
      console.error("Kh\xF4ng t\xECm th\u1EA5y ph\u1EA7n t\u1EED printContent");
    }
  }
  GetGoiy(item) {
    return parseFloat(((item.soluongkho - item.soluong) * (1 + item.haohut / 100)).toString()).toFixed(2);
  }
  doFilterSanpham(event) {
    return __async(this, null, function* () {
      const value = event.target.value.trim().toLowerCase();
      if (value.length < 2) {
        this.filterSanpham = [...this.ListSanpham()];
        return;
      }
      const normalizedValue = removeVietnameseAccents(value);
      this.filterSanpham = this.ListSanpham().filter((product) => {
        const normalizedTitle = removeVietnameseAccents(product.title?.toLowerCase() || "");
        const normalizedMasp = removeVietnameseAccents(product.masp?.toLowerCase() || "");
        return normalizedTitle.includes(normalizedValue) || normalizedMasp.includes(normalizedValue) || product.title?.toLowerCase().includes(value) || product.masp?.toLowerCase().includes(value);
      }).sort((a, b) => {
        const aExactMatch = a.masp?.toLowerCase() === value || a.title?.toLowerCase() === value;
        const bExactMatch = b.masp?.toLowerCase() === value || b.title?.toLowerCase() === value;
        if (aExactMatch && !bExactMatch)
          return -1;
        if (!aExactMatch && bExactMatch)
          return 1;
        const titleA = removeVietnameseAccents(a.title || "").toLowerCase();
        const titleB = removeVietnameseAccents(b.title || "").toLowerCase();
        return titleA.localeCompare(titleB);
      });
      if (event.key === "Enter") {
        if (this.filterSanpham.length > 0) {
          this.ChosenItem(this.filterSanpham[0]);
        }
      }
    });
  }
  ChosenItem(item) {
    const CheckItem = this.filterSanpham.find((v) => v.id === item.id);
    const CheckItem1 = this.ListFilter.find((v) => v.id === item.id);
    if (CheckItem1) {
      this.ListFilter = this.ListFilter.filter((v) => v.id !== item.id);
    } else {
      CheckItem.order = this.ListFilter.length + 1;
      this.ListFilter.push(CheckItem);
    }
  }
  ChosenAll(list) {
    this.ListFilter = list;
  }
  ResetFilter() {
    this.ListFilter = this.ListSanpham();
    this.dataSource().data = this.filterSanpham;
  }
  EmptyFiter() {
    this.ListFilter = [];
  }
  CheckItem(item) {
    return this.ListFilter.find((v) => v.id === item.id) ? true : false;
  }
  ApplyFilterColum(menu) {
    this.ListFilter.forEach((v) => {
      const exists = this.dataSource().data.find((d) => d.id === v.id);
      v.sldat = exists?.sldat || 1;
      v.slgiao = exists?.slgiao || 1;
      v.slnhan = exists?.slnhan || 1;
    });
    this.DetailDonhang.update((v) => {
      v.sanpham = this.ListFilter;
      return v;
    });
    this.dataSource().data = this.ListFilter;
    this.dataSource().data.sort((a, b) => a.order - b.order);
    menu.closeMenu();
  }
  ImporExcel(event) {
    return __async(this, null, function* () {
      const data = yield readExcelFile(event);
      this.DoImportData(data);
    });
  }
  ExportExcel(data, title) {
    const transformedData = data.map((v) => ({
      masp: v.masp?.trim() || "",
      giaban: Number(v.giaban) || 0,
      sldat: Number(v.sldat) || 0,
      slgiao: Number(v.slgiao) || 0,
      slnhan: Number(v.slnhan) || 0,
      ttdat: Number(v.ttdat) || 0,
      ttgiao: Number(v.ttgiao) || 0,
      ttnhan: Number(v.ttnhan) || 0,
      ghichu: v.ghichu?.trim() || ""
    }));
    writeExcelFile(transformedData, title);
  }
  DoImportData(data) {
    const transformedData = data.map((v) => ({
      masp: v.masp?.trim() || "",
      giaban: Number(v.giaban) || 0,
      sldat: Number(v.sldat) || 0,
      slgiao: Number(v.slgiao) || 0,
      slnhan: Number(v.slnhan) || 0,
      ttdat: Number(v.ttdat) || 0,
      ttgiao: Number(v.ttgiao) || 0,
      ttnhan: Number(v.ttnhan) || 0,
      ghichu: v.ghichu?.trim() || ""
    }));
    this.ListFilter = transformedData.map((item) => {
      const item1 = this.ListSanpham().find((v1) => v1.masp === item.masp);
      if (item1) {
        return __spreadValues(__spreadValues({}, item1), item);
      }
      return item;
    });
    this.dataSource().data = this.ListFilter;
    this.DetailDonhang.update((v) => {
      v.sanpham = this.ListFilter;
      return v;
    });
    this._snackBar.open("C\u1EADp Nh\u1EADt Th\xE0nh C\xF4ng", "", {
      duration: 1e3,
      horizontalPosition: "end",
      verticalPosition: "top",
      panelClass: ["snackbar-success"]
    });
  }
  static \u0275fac = function DetailDonhangComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DetailDonhangComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DetailDonhangComponent, selectors: [["app-detaildonhang"]], viewQuery: function DetailDonhangComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 5);
      \u0275\u0275viewQuery(MatPaginator, 5);
      \u0275\u0275viewQuery(MatSort, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.BgHethanDialog = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.paginator = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.sort = _t.first);
    }
  }, decls: 16, vars: 4, consts: [["BgHethanDialog", ""], ["datepicker", ""], ["menuTrigger", "matMenuTrigger"], ["menu", "matMenu"], ["searchInput", ""], [1, "flex", "flex-row", "justify-between", "items-center", "space-x-2", "p-2"], ["mat-icon-button", "", "color", "primary", 3, "click"], [1, "p-2", "font-bold", "truncate"], [1, "flex", "flex-row", "space-x-2", "items-center"], [1, "relative", "flex", "flex-col", "w-full", "p-4", "overflow-auto"], [4, "ngIf"], ["mat-icon-button", "", "color", "primary", 3, "click", 4, "ngIf"], [1, "flex", "flex-col", "space-y-4", "items-center", "justify-center"], [1, "font-bold", "text-2xl"], [1, "flex", "flex-row", "space-x-2", "items-center", "justify-center"], ["mat-flat-button", "", "color", "primary", 3, "click"], ["mat-flat-button", "", "color", "warn", 3, "click"], ["id", "printContent", 1, "min-w-[800px]", "flex", "flex-col", "space-y-6", "items-center", "p-2", "border", "rounded-lg"], [1, "w-full", "flex", "flex-col", "space-y-4", "items-center", "justify-center"], ["class", "w-full flex flex-row space-x-2 items-center justify-between", 4, "ngIf"], [1, "font-bold", "text-[18px]", "uppercase"], ["class", "p-2 rounded-lg border text-red-600", 3, "innerHTML", 4, "ngIf"], ["class", "grid lg:grid-cols-3 grid-cols-1 gap-4", 4, "ngIf"], [1, "w-full", "flex", "items-start"], ["class", "w-full flex flex-col overflow-y-auto", 4, "ngIf"], ["class", "w-full border-collapse border mt-4", 4, "ngIf"], ["class", "w-full text-end font-bold p-2", 4, "ngIf"], ["class", "w-full flex justify-between items-center text-center mt-6 p-2", 4, "ngIf"], [1, "w-full", "flex", "flex-row", "space-x-2", "items-center", "justify-between"], ["src", "/images/logo-full.png", 1, "h-20", "mx-auto"], [1, "w-2/3", "flex", "flex-col", "space-y-2"], [1, "font-bold", "text-[18px]"], [1, "p-2", "rounded-lg", "border", "text-red-600", 3, "innerHTML"], [1, "grid", "lg:grid-cols-3", "grid-cols-1", "gap-4"], ["appearance", "outline", "subscriptSizing", "dynamic"], [3, "ngModelChange", "selectionChange", "ngModel", "ngModelOptions"], [1, "w-full", "flex", "flex-col"], ["appearance", "outline", "subscriptSizing", "dynamic", 1, "w-full", "p-2"], ["matInput", "", "placeholder", "T\xECm Ki\u1EBFm", 3, "input", "disabled"], ["class", "overflow-y-auto max-h-44", 4, "ngIf"], ["matInput", "", "placeholder", "T\xECm Ki\u1EBFm", 3, "input"], [1, "overflow-y-auto", "max-h-44"], [3, "value"], [3, "appearance", "subscriptSizing"], ["matInput", "", 3, "ngModelChange", "matDatepicker", "ngModel", "ngModelOptions"], ["matIconSuffix", "", 3, "for"], ["appearance", "outline", "subscriptSizing", "dynamic", 1, "w-full", "lg:col-span-3"], ["matInput", "", "placeholder", "Vui l\xF2ng Nh\u1EADp Ghi Ch\xFA", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["disabled", ""], [1, "w-full", "flex", "flex-col", "overflow-y-auto"], [1, "cursor-pointer", "w-full", "relative", "flex", "lg:flex-row", "lg:space-y-2", "space-y-0", "flex-col", "space-x-2", "justify-between", "items-center", "p-2", "bg-white", "rounded-lg"], [1, "w-full", "flex", "flex-row", "space-x-2", "items-center"], ["mat-flat-button", "", "color", "primary", 3, "disabled", "matMenuTriggerFor"], [1, "cursor-pointer", "flex", "flex-col", "space-y-4", "p-3", 3, "click"], [1, "relative", "w-full"], ["type", "text", "placeholder", "T\xECm Ki\u1EBFm...", 1, "block", "w-full", "pl-10", "pr-4", "py-2", "text-gray-700", "bg-white", "border", "border-gray-300", "rounded-lg", "focus:border-blue-400", "focus:ring-blue-400", "focus:outline-none", "focus:ring", "focus:ring-opacity-40", 3, "keyup"], [1, "absolute", "inset-y-0", "left-0", "flex", "items-center", "pl-3", "pointer-events-none"], [1, "material-symbols-outlined", "text-gray-500"], [1, "flex", "flex-row", "space-x-2", "items-center", "justify-between"], [1, "text-xs", "text-blue-600", "underline", 3, "click"], [1, "w-full", "flex", "flex-col", "space-y-2", "max-h-44", "overflow-auto"], ["class", "flex flex-row space-x-2 items-center p-2 rounded-lg hover:bg-slate-100", 3, "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "flex", "flex-row", "space-x-2", "items-end", "justify-end"], ["matInput", "", "placeholder", "T\xECm Ki\u1EBFm", 3, "keyup"], ["matTooltip", "L\xE0m Tr\u1ED1ng Gi\u1ECF H\xE0ng", "color", "warn", "mat-icon-button", "", 3, "click", "disabled"], [1, "w-full", "overflow-auto"], ["mat-table", "", 1, "!border", "w-full", "cursor-pointer", 3, "dataSource"], [3, "matColumnDef"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["class", "mat-row", 4, "matNoDataRow"], [1, "flex", "flex-row", "space-x-2", "items-center", "p-2", "rounded-lg", "hover:bg-slate-100", 3, "click"], ["class", "material-symbols-outlined text-blue-600", 4, "ngIf"], [1, "material-symbols-outlined", "text-blue-600"], ["class", "whitespace-nowrap", "mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["mat-header-cell", "", 1, "whitespace-nowrap"], [1, "line-clamp-4", "me-4"], ["mat-cell", ""], [1, "max-w-20", "line-clamp-4", "flex", "flex-row", "items-center"], [1, "text-end"], [1, "ghichu-input", "p-2", "min-w-28", "bg-slate-200", "focus:border", "rounded-lg", "focus:border-blue-600", "focus:bg-slate-100", "focus:outline-none", 3, "contentEditable"], [1, "max-w-40", "line-clamp-4"], ["mat-icon-button", "", "color", "warn", 3, "click"], [1, "sldat-input", "p-2", "min-w-28", "text-end", "bg-slate-200", "focus:border", "rounded-lg", "focus:border-blue-600", "focus:bg-slate-100", "focus:outline-none", 3, "contentEditable"], [1, "sldat-input", "p-2", "min-w-28", "text-end", "bg-slate-200", "focus:border", "rounded-lg", "focus:border-blue-600", "focus:bg-slate-100", "focus:outline-none", 3, "focus", "blur", "keydown.enter", "contentEditable"], [1, "ghichu-input", "p-2", "min-w-28", "bg-slate-200", "focus:border", "rounded-lg", "focus:border-blue-600", "focus:bg-slate-100", "focus:outline-none", 3, "focus", "blur", "keydown.enter", "contentEditable"], ["mat-header-row", ""], ["mat-row", ""], [1, "mat-row"], ["colspan", "4", 1, "mat-cell", "p-4"], [1, "w-full", "border-collapse", "border", "mt-4"], [1, "border"], [1, "border", "p-2"], [1, "border", "p-2", "max-w-10"], ["colspan", "3", 1, "border", "p-2", "text-start"], [1, "border", "p-2", "text-end", "font-bold"], [1, "border", "p-2", "text-end"], [1, "border", "p-2", "text-center"], [1, "border", "p-2", "text-end", "max-w-10"], [1, "border", "p-2", "text-end", "max-w-"], [1, "w-full", "text-end", "font-bold", "p-2"], [1, "w-full", "flex", "justify-between", "items-center", "text-center", "mt-6", "p-2"], [1, "!relative", "!flex", "flex-col", "space-y-8", "items-center", "justify-center"], [1, "relative", "flex", "flex-row", "space-x-2", "items-center"], [1, "text-red-600", "italic"], [1, "relative", "flex", "flex-row", "space-x-2", "items-center", "justify-center"], ["mat-flat-button", "", "color", "primary", "mat-dialog-close", "true"], ["mat-flat-button", "", "color", "warn", "mat-dialog-close", "false"]], template: function DetailDonhangComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 5)(1, "button", 6);
      \u0275\u0275listener("click", function DetailDonhangComponent_Template_button_click_1_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.goBack());
      });
      \u0275\u0275elementStart(2, "mat-icon");
      \u0275\u0275text(3, "arrow_back");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(4, "div", 7);
      \u0275\u0275text(5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "div", 8)(7, "button", 6);
      \u0275\u0275listener("click", function DetailDonhangComponent_Template_button_click_7_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.CoppyDon());
      });
      \u0275\u0275elementStart(8, "mat-icon");
      \u0275\u0275text(9, "content_copy");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(10, DetailDonhangComponent_Conditional_10_Template, 2, 2);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "div", 9);
      \u0275\u0275template(12, DetailDonhangComponent_ng_container_12_Template, 9, 0, "ng-container", 10)(13, DetailDonhangComponent_ng_container_13_Template, 30, 18, "ng-container", 10);
      \u0275\u0275elementEnd();
      \u0275\u0275template(14, DetailDonhangComponent_ng_template_14_Template, 9, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      let tmp_1_0;
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(((tmp_1_0 = ctx.DetailDonhang()) == null ? null : tmp_1_0.madonhang) || "Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u");
      \u0275\u0275advance(5);
      \u0275\u0275conditional(!ctx.DetailDonhang().status || ctx.DetailDonhang().status === "dadat" ? 10 : -1);
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
    MatDialogClose,
    MatDialogContent,
    CommonModule,
    NgIf,
    DecimalPipe,
    MatSlideToggleModule,
    MatMenuModule,
    MatDatepickerModule,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DetailDonhangComponent, { className: "DetailDonhangComponent", filePath: "src/app/admin/donhang/detaildonhang/detaildonhang.component.ts", lineNumber: 73 });
})();
export {
  DetailDonhangComponent
};
//# sourceMappingURL=chunk-UM23DPFW.mjs.map
