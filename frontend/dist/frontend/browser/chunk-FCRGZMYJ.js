import {
  ListPhieugiaohangComponent,
  LoadingUtils
} from "./chunk-UDC7KBEO.js";
import {
  SharedInputService
} from "./chunk-JBWIP75I.js";
import "./chunk-LX7Z3B5S.js";
import "./chunk-T6TCKYMX.js";
import {
  DonhangService
} from "./chunk-5Z2QWFRS.js";
import {
  SanphamService
} from "./chunk-LEINIWDA.js";
import "./chunk-LIZF5AEJ.js";
import {
  MatPaginator,
  MatPaginatorModule
} from "./chunk-YK4IEOL5.js";
import {
  MatSort,
  MatSortHeader,
  MatSortModule
} from "./chunk-TVYI4UUP.js";
import "./chunk-JWBKJV3R.js";
import "./chunk-DOJR6IHP.js";
import "./chunk-TF67DZTX.js";
import "./chunk-LIKOVN7R.js";
import {
  takeUntilDestroyed
} from "./chunk-VAYYIO2B.js";
import "./chunk-R5HFYA7U.js";
import {
  convertToSlug
} from "./chunk-EMT3PHD4.js";
import "./chunk-MKCJCKWI.js";
import "./chunk-XY2N6Z76.js";
import {
  MatMenu,
  MatMenuModule,
  MatMenuTrigger
} from "./chunk-RUSDLITN.js";
import {
  UserService
} from "./chunk-RP2YRSE3.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-AGKEHWOL.js";
import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-NOVTUKZ4.js";
import "./chunk-SSKGL4JO.js";
import "./chunk-5F4VG3UZ.js";
import {
  MatSlideToggle,
  MatSlideToggleModule
} from "./chunk-EWUH5CQR.js";
import {
  MatDialog,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule
} from "./chunk-FL27G2EY.js";
import {
  MatSnackBar
} from "./chunk-43IDDEVP.js";
import {
  MatDatepickerModule
} from "./chunk-Z46IZ3PI.js";
import "./chunk-Y4MVQOE5.js";
import "./chunk-IABB4NTX.js";
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
} from "./chunk-TUEMV45J.js";
import "./chunk-E3N2TZ4N.js";
import {
  MatSelectModule
} from "./chunk-JNSSVLJO.js";
import {
  MatInputModule
} from "./chunk-65RDCWJI.js";
import {
  FormsModule,
  MatFormFieldModule,
  NgControlStatus,
  NgModel
} from "./chunk-XDPJU2GK.js";
import "./chunk-SOPKJ4GV.js";
import {
  MatIcon,
  MatIconModule
} from "./chunk-ZRMLZ234.js";
import "./chunk-4ERWVCO4.js";
import "./chunk-U5KYXYKC.js";
import "./chunk-FZT2LBIG.js";
import {
  MatButton,
  MatButtonModule,
  MatIconButton
} from "./chunk-BRETK2KI.js";
import "./chunk-EMBYIBW3.js";
import {
  Title
} from "./chunk-HCACJZKN.js";
import {
  CommonModule,
  DatePipe,
  DecimalPipe,
  NgIf
} from "./chunk-RKTFENMZ.js";
import {
  ChangeDetectorRef,
  computed,
  effect,
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMapInterpolate1,
  ɵɵconditional,
  ɵɵdefer,
  ɵɵdeferOnIdle,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
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
  ɵɵpipeBind3,
  ɵɵproperty,
  ɵɵpropertyInterpolate1,
  ɵɵpureFunction0,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeHtml,
  ɵɵsanitizeUrl,
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
} from "./chunk-RBDY2J7V.js";
import "./chunk-E3MB3462.js";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-SXK72SKC.js";

// src/app/admin/phieugiaohang/detailphieugiaohang/detailphieugiaohang.component.ts
var _c0 = ["confirmRemoveDialog"];
var DetailPhieugiaohangComponent_ng_container_28_div_28_Defer_2_DepsFn = () => [NgControlStatus, NgModel, MatIcon, MatIconButton, DecimalPipe, MatSlideToggle, MatTable, MatHeaderCellDef, MatHeaderRowDef, MatColumnDef, MatCellDef, MatRowDef, MatHeaderCell, MatCell, MatHeaderRow, MatRow, MatNoDataRow, MatSort, MatSortHeader, MatProgressSpinner];
var _c1 = () => ({ standalone: true });
var _forTrack0 = ($index, $item) => $item.id;
function DetailPhieugiaohangComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 10);
  }
}
function DetailPhieugiaohangComponent_button_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 16);
    \u0275\u0275listener("click", function DetailPhieugiaohangComponent_button_22_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.printContent());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "print");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", ctx_r2.isLoading());
  }
}
function DetailPhieugiaohangComponent_button_23_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 17);
  }
}
function DetailPhieugiaohangComponent_button_23_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "save");
    \u0275\u0275elementEnd();
  }
}
function DetailPhieugiaohangComponent_button_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 16);
    \u0275\u0275listener("click", function DetailPhieugiaohangComponent_button_23_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.handlePhieugiaohangAction());
    });
    \u0275\u0275template(1, DetailPhieugiaohangComponent_button_23_Conditional_1_Template, 1, 0, "mat-spinner", 17)(2, DetailPhieugiaohangComponent_button_23_Conditional_2_Template, 2, 0, "mat-icon");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", ctx_r2.isSaving() || ctx_r2.isLoading());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.isSaving() ? 1 : 2);
  }
}
function DetailPhieugiaohangComponent_button_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 3);
    \u0275\u0275listener("click", function DetailPhieugiaohangComponent_button_24_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleEdit());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "edit");
    \u0275\u0275elementEnd()();
  }
}
function DetailPhieugiaohangComponent_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14)(1, "div", 18);
    \u0275\u0275element(2, "mat-spinner", 19);
    \u0275\u0275elementStart(3, "span", 20);
    \u0275\u0275text(4, "\u0110ang t\u1EA3i d\u1EEF li\u1EC7u phi\u1EBFu giao h\xE0ng...");
    \u0275\u0275elementEnd()()();
  }
}
function DetailPhieugiaohangComponent_ng_container_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 21)(2, "div", 22);
    \u0275\u0275text(3, "B\u1EA1n ch\u1EAFc ch\u1EAFn mu\u1ED1n xo\xE1 kh\xF4ng?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 23)(5, "button", 24);
    \u0275\u0275listener("click", function DetailPhieugiaohangComponent_ng_container_27_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.DeleteData());
    });
    \u0275\u0275text(6, "\u0110\u1ED3ng \xDD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 25);
    \u0275\u0275listener("click", function DetailPhieugiaohangComponent_ng_container_27_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleDelete());
    });
    \u0275\u0275text(8, "Hu\u1EF7 B\u1ECF");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementContainerEnd();
  }
}
function DetailPhieugiaohangComponent_ng_container_28_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 37);
    \u0275\u0275element(1, "img", 38);
    \u0275\u0275elementStart(2, "div", 39)(3, "div", 40);
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
    \u0275\u0275elementEnd()();
    \u0275\u0275element(13, "img", 41);
    \u0275\u0275elementEnd();
  }
}
function DetailPhieugiaohangComponent_ng_container_28_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 42);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("innerHTML", ctx_r2.DetailPhieugiaohang().khachhang.ghichu, \u0275\u0275sanitizeHtml);
  }
}
function DetailPhieugiaohangComponent_ng_container_28_div_28_Defer_1_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 17);
  }
}
function DetailPhieugiaohangComponent_ng_container_28_div_28_Defer_1_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 50);
    \u0275\u0275text(1, "search");
    \u0275\u0275elementEnd();
  }
}
function DetailPhieugiaohangComponent_ng_container_28_div_28_Defer_1_For_12_th_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 58)(1, "span", 59);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const column_r8 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.ColumnName[column_r8], " ");
  }
}
function DetailPhieugiaohangComponent_ng_container_28_div_28_Defer_1_For_12_td_2_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 61)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 64);
    \u0275\u0275listener("click", function DetailPhieugiaohangComponent_ng_container_28_div_28_Defer_1_For_12_td_2_Case_1_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r9);
      const row_r10 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r2.RemoveSanpham(row_r10));
    });
    \u0275\u0275elementStart(4, "mat-icon");
    \u0275\u0275text(5, "delete");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const idx_r11 = \u0275\u0275nextContext().index;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", idx_r11 + 1, " ");
  }
}
function DetailPhieugiaohangComponent_ng_container_28_div_28_Defer_1_For_12_td_2_Case_2_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 67);
    \u0275\u0275listener("focus", function DetailPhieugiaohangComponent_ng_container_28_div_28_Defer_1_For_12_td_2_Case_2_Conditional_0_Template_div_focus_0_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext(7);
      return \u0275\u0275resetView(ctx_r2.onInputFocus($event));
    })("blur", function DetailPhieugiaohangComponent_ng_container_28_div_28_Defer_1_For_12_td_2_Case_2_Conditional_0_Template_div_blur_0_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r12 = \u0275\u0275nextContext(2);
      const row_r10 = ctx_r12.$implicit;
      const idx_r11 = ctx_r12.index;
      const ctx_r2 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r2.updateBlurValue($event, idx_r11, row_r10, "sldat", "number"));
    })("keydown.enter", function DetailPhieugiaohangComponent_ng_container_28_div_28_Defer_1_For_12_td_2_Case_2_Conditional_0_Template_div_keydown_enter_0_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r12 = \u0275\u0275nextContext(2);
      const row_r10 = ctx_r12.$implicit;
      const idx_r11 = ctx_r12.index;
      const ctx_r2 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r2.updateValue($event, idx_r11, row_r10, "sldat", "number"));
    })("keydown", function DetailPhieugiaohangComponent_ng_container_28_div_28_Defer_1_For_12_td_2_Case_2_Conditional_0_Template_div_keydown_0_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext(7);
      return \u0275\u0275resetView(ctx_r2.validateKeyInput($event, "number"));
    });
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r12 = \u0275\u0275nextContext(2);
    const row_r10 = ctx_r12.$implicit;
    const idx_r11 = ctx_r12.index;
    const column_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("contentEditable", true);
    \u0275\u0275attribute("data-index", idx_r11)("data-id", row_r10.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 4, row_r10[column_r8] || 0, "1.0-2"), " ");
  }
}
function DetailPhieugiaohangComponent_ng_container_28_div_28_Defer_1_For_12_td_2_Case_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 66);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r10 = \u0275\u0275nextContext(2).$implicit;
    const column_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r10[column_r8] || 0, "1.0-2"), " ");
  }
}
function DetailPhieugiaohangComponent_ng_container_28_div_28_Defer_1_For_12_td_2_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, DetailPhieugiaohangComponent_ng_container_28_div_28_Defer_1_For_12_td_2_Case_2_Conditional_0_Template, 3, 7, "div", 65)(1, DetailPhieugiaohangComponent_ng_container_28_div_28_Defer_1_For_12_td_2_Case_2_Conditional_1_Template, 3, 4, "div", 66);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(6);
    \u0275\u0275conditional(ctx_r2.canEditSldat() ? 0 : 1);
  }
}
function DetailPhieugiaohangComponent_ng_container_28_div_28_Defer_1_For_12_td_2_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 62);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r10 = \u0275\u0275nextContext().$implicit;
    const column_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r10[column_r8] || 0, "1.0-2"), " ");
  }
}
function DetailPhieugiaohangComponent_ng_container_28_div_28_Defer_1_For_12_td_2_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 62);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r10 = \u0275\u0275nextContext().$implicit;
    const column_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r10[column_r8] || 0, "1.0-2"), " ");
  }
}
function DetailPhieugiaohangComponent_ng_container_28_div_28_Defer_1_For_12_td_2_Case_5_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 69);
    \u0275\u0275listener("focus", function DetailPhieugiaohangComponent_ng_container_28_div_28_Defer_1_For_12_td_2_Case_5_Conditional_0_Template_div_focus_0_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r2 = \u0275\u0275nextContext(7);
      return \u0275\u0275resetView(ctx_r2.onInputFocus($event));
    })("blur", function DetailPhieugiaohangComponent_ng_container_28_div_28_Defer_1_For_12_td_2_Case_5_Conditional_0_Template_div_blur_0_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r12 = \u0275\u0275nextContext(2);
      const row_r10 = ctx_r12.$implicit;
      const idx_r11 = ctx_r12.index;
      const ctx_r2 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r2.updateBlurValue($event, idx_r11, row_r10, "slgiao", "number"));
    })("keydown.enter", function DetailPhieugiaohangComponent_ng_container_28_div_28_Defer_1_For_12_td_2_Case_5_Conditional_0_Template_div_keydown_enter_0_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r12 = \u0275\u0275nextContext(2);
      const row_r10 = ctx_r12.$implicit;
      const idx_r11 = ctx_r12.index;
      const ctx_r2 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r2.updateValue($event, idx_r11, row_r10, "slgiao", "number"));
    })("keydown", function DetailPhieugiaohangComponent_ng_container_28_div_28_Defer_1_For_12_td_2_Case_5_Conditional_0_Template_div_keydown_0_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r2 = \u0275\u0275nextContext(7);
      return \u0275\u0275resetView(ctx_r2.validateKeyInput($event, "number"));
    });
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r12 = \u0275\u0275nextContext(2);
    const row_r10 = ctx_r12.$implicit;
    const idx_r11 = ctx_r12.index;
    const column_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("contentEditable", true);
    \u0275\u0275attribute("data-index", idx_r11)("data-id", row_r10.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 4, row_r10[column_r8] || 0, "1.0-2"), " ");
  }
}
function DetailPhieugiaohangComponent_ng_container_28_div_28_Defer_1_For_12_td_2_Case_5_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 66);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r10 = \u0275\u0275nextContext(2).$implicit;
    const column_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r10[column_r8] || 0, "1.0-2"), " ");
  }
}
function DetailPhieugiaohangComponent_ng_container_28_div_28_Defer_1_For_12_td_2_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, DetailPhieugiaohangComponent_ng_container_28_div_28_Defer_1_For_12_td_2_Case_5_Conditional_0_Template, 3, 7, "div", 68)(1, DetailPhieugiaohangComponent_ng_container_28_div_28_Defer_1_For_12_td_2_Case_5_Conditional_1_Template, 3, 4, "div", 66);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(6);
    \u0275\u0275conditional(ctx_r2.canEditSlgiao() ? 0 : 1);
  }
}
function DetailPhieugiaohangComponent_ng_container_28_div_28_Defer_1_For_12_td_2_Case_6_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 71);
    \u0275\u0275listener("focus", function DetailPhieugiaohangComponent_ng_container_28_div_28_Defer_1_For_12_td_2_Case_6_Conditional_0_Template_div_focus_0_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r2 = \u0275\u0275nextContext(7);
      return \u0275\u0275resetView(ctx_r2.onInputFocus($event));
    })("blur", function DetailPhieugiaohangComponent_ng_container_28_div_28_Defer_1_For_12_td_2_Case_6_Conditional_0_Template_div_blur_0_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r12 = \u0275\u0275nextContext(2);
      const row_r10 = ctx_r12.$implicit;
      const idx_r11 = ctx_r12.index;
      const ctx_r2 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r2.updateBlurValue($event, idx_r11, row_r10, "slnhan", "number"));
    })("keydown.enter", function DetailPhieugiaohangComponent_ng_container_28_div_28_Defer_1_For_12_td_2_Case_6_Conditional_0_Template_div_keydown_enter_0_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r12 = \u0275\u0275nextContext(2);
      const row_r10 = ctx_r12.$implicit;
      const idx_r11 = ctx_r12.index;
      const ctx_r2 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r2.updateValue($event, idx_r11, row_r10, "slnhan", "number"));
    })("keydown", function DetailPhieugiaohangComponent_ng_container_28_div_28_Defer_1_For_12_td_2_Case_6_Conditional_0_Template_div_keydown_0_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r2 = \u0275\u0275nextContext(7);
      return \u0275\u0275resetView(ctx_r2.validateKeyInput($event, "number"));
    });
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r12 = \u0275\u0275nextContext(2);
    const row_r10 = ctx_r12.$implicit;
    const idx_r11 = ctx_r12.index;
    const column_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("contentEditable", true);
    \u0275\u0275attribute("data-index", idx_r11)("data-id", row_r10.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 4, row_r10[column_r8] || 0, "1.0-2"), " ");
  }
}
function DetailPhieugiaohangComponent_ng_container_28_div_28_Defer_1_For_12_td_2_Case_6_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 66);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r10 = \u0275\u0275nextContext(2).$implicit;
    const column_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r10[column_r8] || 0, "1.0-2"), " ");
  }
}
function DetailPhieugiaohangComponent_ng_container_28_div_28_Defer_1_For_12_td_2_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, DetailPhieugiaohangComponent_ng_container_28_div_28_Defer_1_For_12_td_2_Case_6_Conditional_0_Template, 3, 7, "div", 70)(1, DetailPhieugiaohangComponent_ng_container_28_div_28_Defer_1_For_12_td_2_Case_6_Conditional_1_Template, 3, 4, "div", 66);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(6);
    \u0275\u0275conditional(ctx_r2.canEditSlnhan() ? 0 : 1);
  }
}
function DetailPhieugiaohangComponent_ng_container_28_div_28_Defer_1_For_12_td_2_Case_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 72);
    \u0275\u0275listener("focus", function DetailPhieugiaohangComponent_ng_container_28_div_28_Defer_1_For_12_td_2_Case_7_Template_div_focus_0_listener($event) {
      \u0275\u0275restoreView(_r16);
      const ctx_r2 = \u0275\u0275nextContext(6);
      return \u0275\u0275resetView(ctx_r2.onInputFocus($event));
    })("blur", function DetailPhieugiaohangComponent_ng_container_28_div_28_Defer_1_For_12_td_2_Case_7_Template_div_blur_0_listener($event) {
      \u0275\u0275restoreView(_r16);
      const ctx_r12 = \u0275\u0275nextContext();
      const row_r10 = ctx_r12.$implicit;
      const idx_r11 = ctx_r12.index;
      const ctx_r2 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r2.updateBlurValue($event, idx_r11, row_r10, "ghichu", "string"));
    })("keydown.enter", function DetailPhieugiaohangComponent_ng_container_28_div_28_Defer_1_For_12_td_2_Case_7_Template_div_keydown_enter_0_listener($event) {
      \u0275\u0275restoreView(_r16);
      const ctx_r12 = \u0275\u0275nextContext();
      const row_r10 = ctx_r12.$implicit;
      const idx_r11 = ctx_r12.index;
      const ctx_r2 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r2.updateValue($event, idx_r11, row_r10, "ghichu", "string"));
    })("keydown", function DetailPhieugiaohangComponent_ng_container_28_div_28_Defer_1_For_12_td_2_Case_7_Template_div_keydown_0_listener($event) {
      \u0275\u0275restoreView(_r16);
      const ctx_r2 = \u0275\u0275nextContext(6);
      return \u0275\u0275resetView(ctx_r2.validateKeyInput($event, "string"));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r12 = \u0275\u0275nextContext();
    const row_r10 = ctx_r12.$implicit;
    const idx_r11 = ctx_r12.index;
    const column_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("contentEditable", true);
    \u0275\u0275attribute("data-index", idx_r11)("data-id", row_r10.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r10[column_r8] || "", " ");
  }
}
function DetailPhieugiaohangComponent_ng_container_28_div_28_Defer_1_For_12_td_2_Case_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 59);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r10 = \u0275\u0275nextContext().$implicit;
    const column_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r10[column_r8], " ");
  }
}
function DetailPhieugiaohangComponent_ng_container_28_div_28_Defer_1_For_12_td_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 60);
    \u0275\u0275template(1, DetailPhieugiaohangComponent_ng_container_28_div_28_Defer_1_For_12_td_2_Case_1_Template, 6, 1, "span", 61)(2, DetailPhieugiaohangComponent_ng_container_28_div_28_Defer_1_For_12_td_2_Case_2_Template, 2, 1)(3, DetailPhieugiaohangComponent_ng_container_28_div_28_Defer_1_For_12_td_2_Case_3_Template, 3, 4, "div", 62)(4, DetailPhieugiaohangComponent_ng_container_28_div_28_Defer_1_For_12_td_2_Case_4_Template, 3, 4, "div", 62)(5, DetailPhieugiaohangComponent_ng_container_28_div_28_Defer_1_For_12_td_2_Case_5_Template, 2, 1)(6, DetailPhieugiaohangComponent_ng_container_28_div_28_Defer_1_For_12_td_2_Case_6_Template, 2, 1)(7, DetailPhieugiaohangComponent_ng_container_28_div_28_Defer_1_For_12_td_2_Case_7_Template, 2, 4, "div", 63)(8, DetailPhieugiaohangComponent_ng_container_28_div_28_Defer_1_For_12_td_2_Case_8_Template, 2, 1, "span", 59);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_18_0;
    const column_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_18_0 = column_r8) === "STT" ? 1 : tmp_18_0 === "sldat" ? 2 : tmp_18_0 === "giaban" ? 3 : tmp_18_0 === "ttgiao" ? 4 : tmp_18_0 === "slgiao" ? 5 : tmp_18_0 === "slnhan" ? 6 : tmp_18_0 === "ghichu" ? 7 : 8);
  }
}
function DetailPhieugiaohangComponent_ng_container_28_div_28_Defer_1_For_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0, 52);
    \u0275\u0275template(1, DetailPhieugiaohangComponent_ng_container_28_div_28_Defer_1_For_12_th_1_Template, 3, 1, "th", 56)(2, DetailPhieugiaohangComponent_ng_container_28_div_28_Defer_1_For_12_td_2_Template, 9, 1, "td", 57);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const column_r8 = ctx.$implicit;
    \u0275\u0275property("matColumnDef", column_r8);
  }
}
function DetailPhieugiaohangComponent_ng_container_28_div_28_Defer_1_tr_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 73);
  }
}
function DetailPhieugiaohangComponent_ng_container_28_div_28_Defer_1_tr_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 74);
  }
}
function DetailPhieugiaohangComponent_ng_container_28_div_28_Defer_1_tr_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 75)(1, "td", 76);
    \u0275\u0275text(2, "Kh\xF4ng t\xECm th\u1EA5y");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275attribute("colspan", ctx_r2.displayedColumns.length);
  }
}
function DetailPhieugiaohangComponent_ng_container_28_div_28_Defer_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 44)(1, "div", 8)(2, "mat-slide-toggle", 45);
    \u0275\u0275twoWayListener("ngModelChange", function DetailPhieugiaohangComponent_ng_container_28_div_28_Defer_1_Template_mat_slide_toggle_ngModelChange_2_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r2.DetailPhieugiaohang().isshowvat, $event) || (ctx_r2.DetailPhieugiaohang().isshowvat = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("toggleChange", function DetailPhieugiaohangComponent_ng_container_28_div_28_Defer_1_Template_mat_slide_toggle_toggleChange_2_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.onChangeVat());
    });
    \u0275\u0275elementStart(3, "span", 46);
    \u0275\u0275text(4, "VAT");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 47)(6, "input", 48);
    \u0275\u0275listener("keyup", function DetailPhieugiaohangComponent_ng_container_28_div_28_Defer_1_Template_input_keyup_6_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.applyFilter($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 49);
    \u0275\u0275template(8, DetailPhieugiaohangComponent_ng_container_28_div_28_Defer_1_Conditional_8_Template, 1, 0, "mat-spinner", 17)(9, DetailPhieugiaohangComponent_ng_container_28_div_28_Defer_1_Conditional_9_Template, 2, 0, "span", 50);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "table", 51);
    \u0275\u0275repeaterCreate(11, DetailPhieugiaohangComponent_ng_container_28_div_28_Defer_1_For_12_Template, 3, 1, "ng-container", 52, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275template(13, DetailPhieugiaohangComponent_ng_container_28_div_28_Defer_1_tr_13_Template, 1, 0, "tr", 53)(14, DetailPhieugiaohangComponent_ng_container_28_div_28_Defer_1_tr_14_Template, 1, 0, "tr", 54)(15, DetailPhieugiaohangComponent_ng_container_28_div_28_Defer_1_tr_15_Template, 3, 1, "tr", 55);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.DetailPhieugiaohang().isshowvat);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(8, _c1))("disabled", ctx_r2.isLoading() || ctx_r2.isUpdating());
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r2.isLoading() || ctx_r2.isLoadingProducts());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.isLoadingProducts() ? 8 : 9);
    \u0275\u0275advance(2);
    \u0275\u0275property("dataSource", ctx_r2.dataSource);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.displayedColumns);
    \u0275\u0275advance(2);
    \u0275\u0275property("matHeaderRowDef", ctx_r2.displayedColumns);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r2.displayedColumns);
  }
}
function DetailPhieugiaohangComponent_ng_container_28_div_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 43);
    \u0275\u0275template(1, DetailPhieugiaohangComponent_ng_container_28_div_28_Defer_1_Template, 16, 9);
    \u0275\u0275defer(2, 1, DetailPhieugiaohangComponent_ng_container_28_div_28_Defer_2_DepsFn);
    \u0275\u0275deferOnIdle();
    \u0275\u0275elementEnd();
  }
}
function DetailPhieugiaohangComponent_ng_container_28_table_29_th_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 83);
    \u0275\u0275text(1, "\u0110\u01A1n gi\xE1");
    \u0275\u0275elementEnd();
  }
}
function DetailPhieugiaohangComponent_ng_container_28_table_29_th_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 83);
    \u0275\u0275text(1, "Th\xE0nh Ti\u1EC1n");
    \u0275\u0275elementEnd();
  }
}
function DetailPhieugiaohangComponent_ng_container_28_table_29_For_19_td_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 92);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r17 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, item_r17.giaban, "1.0-2"), "");
  }
}
function DetailPhieugiaohangComponent_ng_container_28_table_29_For_19_td_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 92);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r17 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, item_r17.ttgiao, "1.0-2"), "");
  }
}
function DetailPhieugiaohangComponent_ng_container_28_table_29_For_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 78)(1, "td", 88);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 89);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 80);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 90);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275template(10, DetailPhieugiaohangComponent_ng_container_28_table_29_For_19_td_10_Template, 3, 4, "td", 91)(11, DetailPhieugiaohangComponent_ng_container_28_table_29_For_19_td_11_Template, 3, 4, "td", 91);
    \u0275\u0275elementStart(12, "td", 92);
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "td", 89);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_16_0;
    let tmp_19_0;
    let tmp_20_0;
    let tmp_21_0;
    const item_r17 = ctx.$implicit;
    const \u0275$index_322_r18 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275$index_322_r18 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(((tmp_16_0 = ctx_r2.DetailPhieugiaohang()) == null ? null : tmp_16_0.khachhang == null ? null : tmp_16_0.khachhang.istitle2) ? item_r17.title2 : item_r17.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r17.dvt);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(9, 8, item_r17.slgiao, "1.0-2"));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", (tmp_19_0 = ctx_r2.DetailPhieugiaohang()) == null ? null : tmp_19_0.khachhang == null ? null : tmp_19_0.khachhang.hiengia);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_20_0 = ctx_r2.DetailPhieugiaohang()) == null ? null : tmp_20_0.khachhang == null ? null : tmp_20_0.khachhang.hiengia);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(((tmp_21_0 = ctx_r2.DetailPhieugiaohang()) == null ? null : tmp_21_0.status) === "danhan" ? \u0275\u0275pipeBind3(14, 11, item_r17.slnhan, "1.0-2", "") : "");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r17.ghichu);
  }
}
function DetailPhieugiaohangComponent_ng_container_28_table_29_td_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "td", 85);
  }
}
function DetailPhieugiaohangComponent_ng_container_28_table_29_td_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 85);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, ctx_r2.TinhTong(ctx_r2.DetailPhieugiaohang().sanpham, "ttgiao"), "1.0-2"), "");
  }
}
function DetailPhieugiaohangComponent_ng_container_28_table_29_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 78)(1, "td", 93);
    \u0275\u0275text(2, "Vat:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 85);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275element(6, "td", 87)(7, "td", 87);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "tr", 78)(9, "td", 93);
    \u0275\u0275text(10, "T\u1ED5ng Ti\u1EC1n:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td", 85);
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275element(14, "td", 87)(15, "td", 87);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_5_0;
    let tmp_6_0;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(5, 2, (tmp_5_0 = ctx_r2.DetailPhieugiaohang()) == null ? null : tmp_5_0.tongvat, "1.0-2"));
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(13, 5, (tmp_6_0 = ctx_r2.DetailPhieugiaohang()) == null ? null : tmp_6_0.tongtien, "1.0-2"));
  }
}
function DetailPhieugiaohangComponent_ng_container_28_table_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 77)(1, "thead")(2, "tr", 78)(3, "th", 79);
    \u0275\u0275text(4, "STT");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th", 80);
    \u0275\u0275text(6, "T\xEAn s\u1EA3n ph\u1EA9m");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th", 80);
    \u0275\u0275text(8, "\u0110VT");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th", 81);
    \u0275\u0275text(10, "SL");
    \u0275\u0275elementEnd();
    \u0275\u0275template(11, DetailPhieugiaohangComponent_ng_container_28_table_29_th_11_Template, 2, 0, "th", 82)(12, DetailPhieugiaohangComponent_ng_container_28_table_29_th_12_Template, 2, 0, "th", 82);
    \u0275\u0275elementStart(13, "th", 83);
    \u0275\u0275text(14, "SL Nh\u1EADn");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th", 80);
    \u0275\u0275text(16, "Ghi ch\xFA");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "tbody");
    \u0275\u0275repeaterCreate(18, DetailPhieugiaohangComponent_ng_container_28_table_29_For_19_Template, 17, 15, "tr", 78, _forTrack0);
    \u0275\u0275elementStart(20, "tr", 78)(21, "td", 84);
    \u0275\u0275text(22, "T\u1ED5ng:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "td", 85);
    \u0275\u0275text(24);
    \u0275\u0275pipe(25, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275template(26, DetailPhieugiaohangComponent_ng_container_28_table_29_td_26_Template, 1, 0, "td", 86)(27, DetailPhieugiaohangComponent_ng_container_28_table_29_td_27_Template, 3, 4, "td", 86);
    \u0275\u0275elementStart(28, "td", 85);
    \u0275\u0275text(29);
    \u0275\u0275pipe(30, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275element(31, "td", 87);
    \u0275\u0275elementEnd();
    \u0275\u0275template(32, DetailPhieugiaohangComponent_ng_container_28_table_29_Conditional_32_Template, 16, 8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_4_0;
    let tmp_5_0;
    let tmp_8_0;
    let tmp_9_0;
    let tmp_10_0;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(11);
    \u0275\u0275property("ngIf", (tmp_4_0 = ctx_r2.DetailPhieugiaohang()) == null ? null : tmp_4_0.khachhang == null ? null : tmp_4_0.khachhang.hiengia);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_5_0 = ctx_r2.DetailPhieugiaohang()) == null ? null : tmp_5_0.khachhang == null ? null : tmp_5_0.khachhang.hiengia);
    \u0275\u0275advance(6);
    \u0275\u0275repeater(ctx_r2.dataSource.data);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(25, 7, ctx_r2.TinhTong(ctx_r2.DetailPhieugiaohang().sanpham, "slgiao"), "1.0-2"), "");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", (tmp_8_0 = ctx_r2.DetailPhieugiaohang()) == null ? null : tmp_8_0.khachhang == null ? null : tmp_8_0.khachhang.hiengia);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_9_0 = ctx_r2.DetailPhieugiaohang()) == null ? null : tmp_9_0.khachhang == null ? null : tmp_9_0.khachhang.hiengia);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(((tmp_10_0 = ctx_r2.DetailPhieugiaohang()) == null ? null : tmp_10_0.status) === "danhan" ? \u0275\u0275pipeBind2(30, 10, ctx_r2.TinhTong(ctx_r2.DetailPhieugiaohang().sanpham, "slnhan"), "1.0-2") : "");
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r2.DetailPhieugiaohang().isshowvat ? 32 : -1);
  }
}
function DetailPhieugiaohangComponent_ng_container_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 26)(2, "div", 27);
    \u0275\u0275template(3, DetailPhieugiaohangComponent_ng_container_28_div_3_Template, 14, 0, "div", 28);
    \u0275\u0275elementStart(4, "div", 29);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275template(9, DetailPhieugiaohangComponent_ng_container_28_div_9_Template, 1, 1, "div", 30);
    \u0275\u0275elementStart(10, "div", 31)(11, "div", 32)(12, "div", 33)(13, "strong");
    \u0275\u0275text(14, "\u0110\u1ECBa Ch\u1EC9 : ");
    \u0275\u0275elementEnd();
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 33)(17, "strong");
    \u0275\u0275text(18, "Ghi Ch\xFA : ");
    \u0275\u0275elementEnd();
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 33)(21, "strong");
    \u0275\u0275text(22, "S\u1ED1 \u0110i\u1EC7n Tho\u1EA1i : ");
    \u0275\u0275elementEnd();
    \u0275\u0275text(23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div", 33)(25, "strong");
    \u0275\u0275text(26);
    \u0275\u0275pipe(27, "number");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275template(28, DetailPhieugiaohangComponent_ng_container_28_div_28_Template, 4, 0, "div", 34)(29, DetailPhieugiaohangComponent_ng_container_28_table_29_Template, 33, 13, "table", 35);
    \u0275\u0275elementStart(30, "div", 36)(31, "p")(32, "strong");
    \u0275\u0275text(33, "Ng\u01B0\u1EDDi v\u1EADn chuy\u1EC3n");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "p")(35, "strong");
    \u0275\u0275text(36, "Ng\u01B0\u1EDDi nh\u1EADn h\xE0ng");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(37, "p")(38, "strong");
    \u0275\u0275text(39, "Ng\u01B0\u1EDDi l\u1EADp");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    let tmp_5_0;
    let tmp_6_0;
    let tmp_7_0;
    let tmp_8_0;
    let tmp_9_0;
    let tmp_10_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", !ctx_r2.isEdit());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("B\u1EA2NG K\xCA GIAO H\xC0NG NG\xC0Y ", \u0275\u0275pipeBind2(6, 14, ctx_r2.DetailPhieugiaohang().ngaygiao, "dd/MM/yyyy"), "");
    \u0275\u0275advance(2);
    \u0275\u0275classMapInterpolate1("font-bold text-[18px] uppercase ", ((tmp_5_0 = ctx_r2.DetailPhieugiaohang()) == null ? null : tmp_5_0.khachhangId) ? "" : "text-red-700 italic", "");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ((tmp_6_0 = ctx_r2.DetailPhieugiaohang()) == null ? null : tmp_6_0.khachhang == null ? null : tmp_6_0.khachhang.name) || "Ch\u01B0a Ch\u1ECDn Kh\xE1ch H\xE0ng", "");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.isEdit() && ((tmp_7_0 = ctx_r2.DetailPhieugiaohang()) == null ? null : tmp_7_0.khachhang == null ? null : tmp_7_0.khachhang.ghichu));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", (tmp_8_0 = ctx_r2.DetailPhieugiaohang()) == null ? null : tmp_8_0.khachhang == null ? null : tmp_8_0.khachhang.diachi, "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", (tmp_9_0 = ctx_r2.DetailPhieugiaohang()) == null ? null : tmp_9_0.ghichu, "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", (tmp_10_0 = ctx_r2.DetailPhieugiaohang()) == null ? null : tmp_10_0.khachhang == null ? null : tmp_10_0.khachhang.sdt, "");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("T\u1ED5ng kh\u1ED1i l\u01B0\u1EE3ng - \u0110\u01A1n V\u1ECB T\xEDnh : ", ctx_r2.GetDVT(ctx_r2.DetailPhieugiaohang()), " (", \u0275\u0275pipeBind2(27, 17, ctx_r2.DetailPhieugiaohang().loadpoint, "1.0-2"), ") ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r2.isEdit());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r2.isEdit());
  }
}
function DetailPhieugiaohangComponent_ng_template_29_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 108);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(' "', (ctx_r2.itemToRemove == null ? null : ctx_r2.itemToRemove.title) || "Kh\xF4ng c\xF3 t\xEAn", '" ');
  }
}
function DetailPhieugiaohangComponent_ng_template_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-dialog-content", 94)(1, "div", 95)(2, "mat-icon", 96);
    \u0275\u0275text(3, "warning");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 97);
    \u0275\u0275text(5, "X\xE1c nh\u1EADn x\xF3a s\u1EA3n ph\u1EA9m");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 98)(7, "div", 99);
    \u0275\u0275text(8, "B\u1EA1n c\xF3 ch\u1EAFc ch\u1EAFn mu\u1ED1n x\xF3a s\u1EA3n ph\u1EA9m");
    \u0275\u0275elementEnd();
    \u0275\u0275template(9, DetailPhieugiaohangComponent_ng_template_29_div_9_Template, 2, 1, "div", 100);
    \u0275\u0275elementStart(10, "div", 101);
    \u0275\u0275text(11, "kh\u1ECFi phi\u1EBFu giao h\xE0ng n\xE0y?");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 102)(13, "div", 103)(14, "mat-icon", 104);
    \u0275\u0275text(15, "info");
    \u0275\u0275elementEnd();
    \u0275\u0275text(16, " H\xE0nh \u0111\u1ED9ng n\xE0y s\u1EBD x\xF3a s\u1EA3n ph\u1EA9m kh\u1ECFi phi\u1EBFu giao h\xE0ng hi\u1EC7n t\u1EA1i v\xE0 c\xF3 th\u1EC3 \u0111\u01B0\u1EE3c ho\xE0n t\xE1c b\u1EB1ng c\xE1ch th\xEAm l\u1EA1i s\u1EA3n ph\u1EA9m. ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 105)(18, "button", 106)(19, "mat-icon");
    \u0275\u0275text(20, "delete");
    \u0275\u0275elementEnd();
    \u0275\u0275text(21, " X\xF3a s\u1EA3n ph\u1EA9m ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "button", 107)(23, "mat-icon");
    \u0275\u0275text(24, "cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275text(25, " H\u1EE7y b\u1ECF ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275property("ngIf", ctx_r2.itemToRemove);
  }
}
var DetailPhieugiaohangComponent = class _DetailPhieugiaohangComponent {
  sharedInputService;
  _ListphieugiaohangComponent = inject(ListPhieugiaohangComponent);
  _PhieugiaohangService = inject(DonhangService);
  _SanphamService = inject(SanphamService);
  _UserService = inject(UserService);
  _SharedInputService = inject(SharedInputService);
  _route = inject(ActivatedRoute);
  _router = inject(Router);
  _snackBar = inject(MatSnackBar);
  _dialog = inject(MatDialog);
  _cdr = inject(ChangeDetectorRef);
  titleService = inject(Title);
  displayedColumns = [
    "STT",
    "title",
    "masp",
    "dvt",
    "sldat",
    "slgiao",
    "giaban",
    "ttgiao",
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
    giaban: "Gi\xE1 B\xE1n",
    ttgiao: "TT Giao",
    slnhan: "Th\u1EF1c Nh\u1EADn",
    ghichu: "Ghi Ch\xFA"
  };
  dataSource = new MatTableDataSource([]);
  CountItem = computed(() => this.dataSource.data.length);
  paginator;
  sort;
  confirmRemoveDialog;
  DetailPhieugiaohang = this._PhieugiaohangService.DetailDonhang;
  profile = this._UserService.profile;
  // ListKhachhang: any = this._KhachhangService.ListKhachhang;
  isEdit = signal(true);
  isDelete = signal(false);
  isLoading = signal(false);
  isSaving = signal(false);
  isUpdating = signal(false);
  isLoadingProducts = signal(false);
  // Optimization: Request queue and debounce
  updateQueue = /* @__PURE__ */ new Map();
  updateDebounceTimer;
  UPDATE_DEBOUNCE_TIME = 500;
  // 500ms debounce
  MAX_CONCURRENT_UPDATES = 3;
  // Max concurrent update requests
  activeUpdateRequests = 0;
  originalData = null;
  // For rollback on errors
  filterKhachhang = [];
  filterBanggia = [];
  filterSanpham = [];
  phieugiaohangId = this._PhieugiaohangService.donhangId;
  ListSanpham = this._SanphamService.ListSanpham;
  // Store item to be removed for dialog
  itemToRemove = null;
  // Component key for loading utilities
  COMPONENT_KEY = "detailphieugiaohang";
  Trangthai = [
    { value: "dadat", title: "\u0110\xE3 \u0110\u1EB7t" },
    { value: "dagiao", title: "\u0110\xE3 Giao" },
    { value: "danhan", title: "\u0110\xE3 Nh\u1EADn" },
    { value: "huy", title: "H\u1EE7y" }
  ];
  constructor(sharedInputService) {
    this.sharedInputService = sharedInputService;
    this._route.paramMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      const id = params.get("id");
      this._PhieugiaohangService.setDonhangId(id);
      this.loadProductsAsync();
    });
    effect(() => {
      const user = this._UserService.profile();
      const id = this._PhieugiaohangService.donhangId();
      if (user && id && id !== "0") {
        setTimeout(() => this.loadPhieugiaohangData(id), 0);
      } else if (id === "0") {
        this._router.navigate(["/admin/phieugiaohang"]);
        this._ListphieugiaohangComponent.drawer.close();
      }
    });
  }
  loadProductsAsync() {
    return __async(this, null, function* () {
      this.isLoadingProducts.set(true);
      try {
        yield this._SanphamService.getAllSanpham({ pageSize: 1e3 });
        this.filterSanpham = this._SanphamService.ListSanpham();
      } catch (error) {
        console.error("Error loading products:", error);
        this._snackBar.open("L\u1ED7i khi t\u1EA3i danh s\xE1ch s\u1EA3n ph\u1EA9m", "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      } finally {
        this.isLoadingProducts.set(false);
      }
    });
  }
  loadPhieugiaohangData(id) {
    return __async(this, null, function* () {
      this.isLoading.set(true);
      try {
        yield this._PhieugiaohangService.Phieugiaohang({ id });
        const phieuGiaoHang = this.DetailPhieugiaohang();
        this.isEdit.set(phieuGiaoHang.status !== "danhan");
        const processedSanpham = phieuGiaoHang?.sanpham?.map((item) => __spreadProps(__spreadValues({}, item), {
          ttgiao: (Number(item.slgiao) || 0) * (Number(item.giaban) || 0)
        })) || [];
        processedSanpham.sort((a, b) => {
          const titleA = a.sanpham?.title || a.title || "";
          const titleB = b.sanpham?.title || b.title || "";
          return titleA.localeCompare(titleB, "vi", { sensitivity: "base" });
        });
        this.DetailPhieugiaohang.update((data) => __spreadProps(__spreadValues({}, data), {
          sanpham: processedSanpham
        }));
        this.dataSource.data = processedSanpham;
        setTimeout(() => {
          this.dataSource.sort = this.sort;
        }, 300);
        this.setupDataSource();
        this._ListphieugiaohangComponent.drawer.open();
        this._router.navigate(["/admin/phieugiaohang", id]);
      } catch (error) {
        console.error("Error loading phieugiaohang data:", error);
        this._snackBar.open("L\u1ED7i khi t\u1EA3i d\u1EEF li\u1EC7u phi\u1EBFu giao h\xE0ng", "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      } finally {
        this.isLoading.set(false);
      }
    });
  }
  getTitle(item) {
    return this.Trangthai.find((v) => v.value === item)?.title;
  }
  // Permission check methods
  hasPermission(permission) {
    return this._UserService.hasPermission(permission);
  }
  canEditSldat() {
    const result = this.hasPermission("phieugiaohang.sldat");
    console.log(result);
    return result;
  }
  canEditSlgiao() {
    const result = this.hasPermission("phieugiaohang.slgiao");
    return result;
  }
  canEditSlnhan() {
    const result = this.hasPermission("phieugiaohang.slnhan");
    return result;
  }
  ngOnInit() {
    return __async(this, null, function* () {
      yield this._UserService.getProfile();
      console.log(this.profile());
      this.canEditSlnhan();
      const phieugiaohangId = this.phieugiaohangId();
      if (!phieugiaohangId)
        return;
      try {
        yield this._PhieugiaohangService.Phieugiaohang({ id: phieugiaohangId });
        const phieuGiaoHang = this.DetailPhieugiaohang();
        this.isEdit.set(phieuGiaoHang.status !== "danhan");
        if (phieuGiaoHang?.sanpham?.length) {
          const processedSanpham = phieuGiaoHang.sanpham.map((item) => __spreadProps(__spreadValues({}, item), {
            ttgiao: (Number(item.slgiao) || 0) * (Number(item.giaban) || 0)
          }));
          processedSanpham.sort((a, b) => {
            const titleA = a.sanpham?.title || a.title || "";
            const titleB = b.sanpham?.title || b.title || "";
            return titleA.localeCompare(titleB, "vi", { sensitivity: "base" });
          });
          this.DetailPhieugiaohang.update((data) => __spreadProps(__spreadValues({}, data), {
            sanpham: processedSanpham
          }));
        }
      } catch (error) {
        console.error("Error loading phieu giao hang:", error);
        this._snackBar.open("L\u1ED7i khi t\u1EA3i phi\u1EBFu giao h\xE0ng", "", {
          duration: 2e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      }
      this.dataSource = new MatTableDataSource(this.DetailPhieugiaohang().sanpham);
      this.dataSource.sortingDataAccessor = (item, property) => {
        console.log(item, property);
        switch (property) {
          case "title":
            return item.sanpham?.title || item.title || "";
          default:
            return item[property] || "";
        }
      };
      this.dataSource.sortData = (data, sort) => {
        const active = sort.active;
        const direction = sort.direction;
        if (!active || direction === "") {
          return data;
        }
        return data.sort((a, b) => {
          let valueA = this.dataSource.sortingDataAccessor(a, active);
          let valueB = this.dataSource.sortingDataAccessor(b, active);
          if (typeof valueA === "string" && typeof valueB === "string") {
            const comparison2 = valueA.localeCompare(valueB, "vi", {
              sensitivity: "base",
              numeric: true,
              ignorePunctuation: true
            });
            return direction === "asc" ? comparison2 : -comparison2;
          }
          if (typeof valueA === "number" && typeof valueB === "number") {
            return direction === "asc" ? valueA - valueB : valueB - valueA;
          }
          const comparison = valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
          return direction === "asc" ? comparison : -comparison;
        });
      };
      setTimeout(() => {
        this.dataSource.sort = this.sort;
      }, 300);
      if (this.DetailPhieugiaohang()?.madonhang) {
        this.titleService.setTitle(`${this.DetailPhieugiaohang()?.madonhang}`);
      }
    });
  }
  ngAfterViewInit() {
    this.setupDataSource();
  }
  onChangeVat() {
    this.DetailPhieugiaohang.update((v) => {
      v.isshowvat = !v.isshowvat;
      return v;
    });
    console.log("VAT changed:", this.DetailPhieugiaohang().isshowvat);
  }
  setupDataSource() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }
  SortByVi(ListItem, field) {
    return ListItem.sort((a, b) => {
      const nameA = (a.sanpham?.[field] || a[field] || "").toLowerCase();
      const nameB = (b.sanpham?.[field] || b[field] || "").toLowerCase();
      return nameA.localeCompare(nameB, "vi", { sensitivity: "base" });
    });
  }
  GetDVT(item) {
    if (item?.sanpham?.length > 0) {
      return item?.sanpham[0]?.dvt || "";
    }
    return "";
  }
  // Thêm method để setup datasource
  handlePhieugiaohangAction() {
    return __async(this, null, function* () {
      if (this.isSaving() || this.isUpdating()) {
        console.warn("Update already in progress, skipping...");
        return;
      }
      this.isSaving.set(true);
      try {
        if (this.phieugiaohangId() === "0") {
        } else {
          yield this.updatePhieugiaohangOptimized();
        }
      } finally {
        this.isSaving.set(false);
      }
    });
  }
  // Optimized update method with debouncing and request limiting
  updatePhieugiaohangOptimized() {
    return __async(this, null, function* () {
      const phieugiaohangId = this.phieugiaohangId();
      if (!phieugiaohangId || phieugiaohangId === "0") {
        return;
      }
      this.updateQueue.set(phieugiaohangId, {
        data: this.prepareUpdateData(),
        timestamp: Date.now()
      });
      if (this.updateDebounceTimer) {
        clearTimeout(this.updateDebounceTimer);
      }
      this.updateDebounceTimer = setTimeout(() => {
        this.processUpdateQueue();
      }, this.UPDATE_DEBOUNCE_TIME);
    });
  }
  prepareUpdateData() {
    try {
      const sanphamWithCalculations = this.DetailPhieugiaohang().sanpham?.map((v) => {
        const slgiao = Number(v.slgiao) || 0;
        const giaban = Number(v.giaban) || 0;
        return __spreadProps(__spreadValues({}, v), {
          ttgiao: slgiao * giaban
        });
      }) || [];
      const tong = sanphamWithCalculations.reduce((sum, item) => sum + (item.ttgiao || 0), 0);
      const vat = Number(this.DetailPhieugiaohang().vat) || 0;
      const tongvat = tong * vat;
      const tongtien = tong * (1 + vat);
      return __spreadProps(__spreadValues({}, this.DetailPhieugiaohang()), {
        sanpham: sanphamWithCalculations,
        tongtien,
        tongvat
      });
    } catch (error) {
      console.error("Error preparing update data:", error);
      throw error;
    }
  }
  processUpdateQueue() {
    return __async(this, null, function* () {
      if (this.activeUpdateRequests >= this.MAX_CONCURRENT_UPDATES) {
        setTimeout(() => this.processUpdateQueue(), 100);
        return;
      }
      const entries = Array.from(this.updateQueue.entries());
      if (entries.length === 0)
        return;
      const latestUpdates = /* @__PURE__ */ new Map();
      entries.forEach(([id, data]) => {
        if (!latestUpdates.has(id) || data.timestamp > latestUpdates.get(id).timestamp) {
          latestUpdates.set(id, data);
        }
      });
      this.updateQueue.clear();
      for (const [id, updateData] of latestUpdates) {
        if (this.activeUpdateRequests >= this.MAX_CONCURRENT_UPDATES) {
          this.updateQueue.set(id, updateData);
          setTimeout(() => this.processUpdateQueue(), 200);
          break;
        }
        this.executeUpdate(updateData.data);
      }
    });
  }
  executeUpdate(data) {
    return __async(this, null, function* () {
      if (this.activeUpdateRequests >= this.MAX_CONCURRENT_UPDATES) {
        console.warn("Max concurrent updates reached, queuing...");
        return;
      }
      this.activeUpdateRequests++;
      this.isUpdating.set(true);
      try {
        this.updateUIOptimistically(data);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3e4);
        yield this._PhieugiaohangService.updatePhieugiao(data);
        clearTimeout(timeoutId);
        this._snackBar.open("C\u1EADp Nh\u1EADt Th\xE0nh C\xF4ng", "", {
          duration: 2e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        this.isEdit.update((value) => !value);
      } catch (error) {
        console.error("L\u1ED7i khi c\u1EADp nh\u1EADt phieugiaohang:", error);
        this.rollbackOptimisticUpdate();
        if (error instanceof Error && error.name === "AbortError") {
          this._snackBar.open("Timeout - Vui l\xF2ng th\u1EED l\u1EA1i", "", {
            duration: 3e3,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-warning"]
          });
        } else {
          this._snackBar.open("L\u1ED7i khi c\u1EADp nh\u1EADt phi\u1EBFu giao h\xE0ng", "", {
            duration: 3e3,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-error"]
          });
        }
      } finally {
        this.activeUpdateRequests--;
        this.isUpdating.set(false);
      }
    });
  }
  updateUIOptimistically(data) {
    this.originalData = __spreadValues({}, this.DetailPhieugiaohang());
    this.DetailPhieugiaohang.set(data);
    this._cdr.detectChanges();
  }
  rollbackOptimisticUpdate() {
    if (this.originalData) {
      this.DetailPhieugiaohang.set(this.originalData);
      this._cdr.detectChanges();
    }
  }
  // Keep original method for backward compatibility but mark as deprecated
  updatePhieugiaohang() {
    return __async(this, null, function* () {
      console.warn("updatePhieugiaohang is deprecated, use updatePhieugiaohangOptimized instead");
      return this.updatePhieugiaohangOptimized();
    });
  }
  // Optimized UpdateTongTongTienVat method
  UpdateTongTongTienVat() {
    try {
      const sanpham = this.DetailPhieugiaohang().sanpham || [];
      const vat = Number(this.DetailPhieugiaohang().vat) || 0;
      const tong = sanpham.reduce((sum, item) => {
        const slgiao = Number(item.slgiao) || 0;
        const giaban = Number(item.giaban) || 0;
        return sum + slgiao * giaban;
      }, 0);
      const tongvat = tong * vat;
      const tongtien = tong * (1 + vat);
      this.DetailPhieugiaohang.update((data) => __spreadProps(__spreadValues({}, data), {
        tongtien,
        tongvat
      }));
      this._cdr.detectChanges();
    } catch (error) {
      console.error("Error updating totals:", error);
    }
  }
  // Cleanup method to prevent memory leaks
  ngOnDestroy() {
    if (this.updateDebounceTimer) {
      clearTimeout(this.updateDebounceTimer);
    }
    this.updateQueue.clear();
    this.originalData = null;
  }
  // Performance monitoring method
  logPerformanceMetrics(operation, startTime) {
    const endTime = performance.now();
    const duration = endTime - startTime;
    console.log(`Performance [${operation}]:`, {
      duration: `${duration.toFixed(2)}ms`,
      activeRequests: this.activeUpdateRequests,
      queueSize: this.updateQueue.size,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
    if (duration > 1e3) {
      console.warn(`Slow operation detected: ${operation} took ${duration.toFixed(2)}ms`);
    }
  }
  // Method to manually trigger performance test (for debugging)
  testConcurrentUpdates(count = 10) {
    return __async(this, null, function* () {
      console.log(`Starting concurrent update test with ${count} requests...`);
      const startTime = performance.now();
      const promises = Array.from({ length: count }, (_, i) => {
        return this.updatePhieugiaohangOptimized();
      });
      try {
        yield Promise.all(promises);
        this.logPerformanceMetrics(`ConcurrentTest_${count}`, startTime);
      } catch (error) {
        console.error("Concurrent test failed:", error);
      }
    });
  }
  DeleteData() {
    return __async(this, null, function* () {
    });
  }
  goBack() {
    this._router.navigate(["/admin/phieugiaohang"]);
    this._ListphieugiaohangComponent.drawer.close();
  }
  trackByFn(index, item) {
    return item.id;
  }
  // Method để auto-select text khi focus vào input - Using shared service
  onInputFocus(event) {
    this.sharedInputService.onInputFocus(event);
  }
  // Method để validate keyboard input for decimal handling
  validateKeyInput(event, type) {
    return this.sharedInputService.handleKeyboardEvent(event, type);
  }
  // Method để xử lý input từ numpad và format số
  handleNumericInput(event, target) {
    if (event.code === "NumpadDecimal" || event.key === "." || event.key === ",") {
      const currentText = target.innerText;
      if (currentText.includes(".") || currentText.includes(",")) {
        event.preventDefault();
        return;
      }
    }
    if (event.code && event.code.startsWith("Numpad") && /Numpad[0-9]/.test(event.code)) {
      return;
    }
  }
  // Method để format số hiển thị
  formatNumberDisplay(value) {
    if (isNaN(value) || value === 0)
      return "0";
    return value.toLocaleString("vi-VN", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  }
  toggleEdit() {
    this.isEdit.update((value) => !value);
  }
  toggleDelete() {
    this.isDelete.update((value) => !value);
  }
  FillSlug() {
    this.DetailPhieugiaohang.update((v) => {
      v.slug = convertToSlug(v.title);
      return v;
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
    this.DetailPhieugiaohang.update((v) => {
      v.khachhangId = item.id;
      return v;
    });
  }
  updateValue(event, index, element, field, type) {
    this.sharedInputService.updateValue(event, "phieugiaohang", index, element, field, type, this.DetailPhieugiaohang().sanpham, (updateFn) => {
      this.DetailPhieugiaohang.update(updateFn);
      this.dataSource.data = [...this.DetailPhieugiaohang().sanpham];
    }, this.dataSource.filteredData.length);
  }
  updateBlurValue(event, index, element, field, type) {
    this.sharedInputService.updateBlurValue(event, "phieugiaohang", index, element, field, type, this.DetailPhieugiaohang().sanpham, (updateFn) => {
      this.DetailPhieugiaohang.update(updateFn);
      this.dataSource.data = [...this.DetailPhieugiaohang().sanpham];
    });
  }
  GiaoDonhang() {
    return __async(this, null, function* () {
      try {
        this.DetailPhieugiaohang.update((v) => {
          v.status = "dagiao";
          return v;
        });
        yield this._PhieugiaohangService.DagiaoDonhang(this.DetailPhieugiaohang());
        this._snackBar.open("Giao \u0111\u01A1n h\xE0ng th\xE0nh c\xF4ng", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
      } catch (error) {
        console.error("L\u1ED7i khi giao \u0111\u01A1n h\xE0ng:", error);
        this._snackBar.open("Giao \u0111\u01A1n h\xE0ng th\u1EA5t b\u1EA1i", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      }
    });
  }
  Danhanhang() {
    return __async(this, null, function* () {
      try {
        this.DetailPhieugiaohang.update((v) => {
          v.status = "danhan";
          return v;
        });
        yield this._PhieugiaohangService.updateDonhang(this.DetailPhieugiaohang());
        this._snackBar.open("\u0110\xE3 Nh\u1EADn \u0111\u01A1n h\xE0ng th\xE0nh c\xF4ng", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        this.isEdit.update((value) => !value);
      } catch (error) {
        console.error("L\u1ED7i khi nh\u1EADn \u0111\u01A1n h\xE0ng:", error);
        this._snackBar.open("Nh\u1EADn \u0111\u01A1n h\xE0ng th\u1EA5t b\u1EA1i", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      }
    });
  }
  Dagiaohang() {
    return __async(this, null, function* () {
      try {
        this.DetailPhieugiaohang.update((v) => {
          v.status = "dagiao";
          return v;
        });
        yield this._PhieugiaohangService.updateDonhang(this.DetailPhieugiaohang());
        this._snackBar.open("\u0110\xE3 Nh\u1EADn \u0111\u01A1n h\xE0ng th\xE0nh c\xF4ng", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        this.isEdit.update((value) => !value);
      } catch (error) {
        console.error("L\u1ED7i khi nh\u1EADn \u0111\u01A1n h\xE0ng:", error);
        this._snackBar.open("Nh\u1EADn \u0111\u01A1n h\xE0ng th\u1EA5t b\u1EA1i", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      }
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
  applyFilter(event) {
    const filterValue = event.target.value;
    this.debouncedSearch(filterValue);
  }
  // Debounced search function for better performance
  debouncedSearch = LoadingUtils.debounce((filterValue) => {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }, 300, `${this.COMPONENT_KEY}_search`);
  EmptyCart() {
    this.DetailPhieugiaohang.update((v) => {
      v.sanpham = [];
      return v;
    });
    this.dataSource.data = [...this.DetailPhieugiaohang().sanpham];
  }
  RemoveSanpham(item) {
    this.itemToRemove = item;
    const dialogRef = this._dialog.open(this.confirmRemoveDialog, {
      width: "400px",
      disableClose: true
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === "confirm") {
        this.confirmRemoveSanpham(this.itemToRemove);
      }
      this.itemToRemove = null;
    });
  }
  confirmRemoveSanpham(item) {
    console.log(item);
    this.DetailPhieugiaohang.update((v) => {
      v.sanpham = v.sanpham.filter((v1) => v1.id !== item.id);
      this.reloadfilter();
      return v;
    });
    this.dataSource.data = [...this.DetailPhieugiaohang().sanpham];
    this._snackBar.open(`\u0110\xE3 x\xF3a s\u1EA3n ph\u1EA9m: ${item.title}`, "\u0110\xF3ng", {
      duration: 3e3,
      horizontalPosition: "end",
      verticalPosition: "top",
      panelClass: ["snackbar-success"]
    });
    console.log(`Removed product: ${item.title}`);
  }
  reloadfilter() {
    this.filterSanpham = this.ListSanpham().filter((v) => !this.DetailPhieugiaohang().sanpham.some((v2) => v2.id === v.id));
  }
  CoppyDon() {
  }
  CheckVatDonhang() {
    console.log(this.DetailPhieugiaohang());
    if (this.DetailPhieugiaohang().isshowvat) {
      const tong = this.DetailPhieugiaohang().sanpham?.reduce((sum, item) => sum + (Number(item.slgiao) * Number(item.giaban) || 0), 0) || 0;
      const tongtien = tong * (1 + Number(this.DetailPhieugiaohang().vat));
      const tongvat = tong * this.DetailPhieugiaohang().vat;
      console.log("VAT changed:", 1 + this.DetailPhieugiaohang().vat);
      console.log("tong", tong);
      console.log("tongtien", tongtien);
      console.log("tongvat", tongvat);
      console.log("this.DetailPhieugiaohang().tongtien", this.DetailPhieugiaohang().tongtien);
      console.log("this.DetailPhieugiaohang().tongvat", this.DetailPhieugiaohang().tongvat);
      if (Number(tongtien) !== Number(this.DetailPhieugiaohang().tongtien)) {
        return false;
      }
      if (Number(tongvat) !== Number(this.DetailPhieugiaohang().tongvat)) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }
  printContent() {
    return __async(this, null, function* () {
      const isCheck = this.CheckVatDonhang();
      if (!isCheck) {
        this._snackBar.open("Vui l\xF2ng ki\u1EC3m tra l\u1EA1i VAT tr\u01B0\u1EDBc khi in phi\u1EBFu giao h\xE0ng", "", {
          duration: 2e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
        return;
      }
      const currentPhieugiaohang = this.DetailPhieugiaohang();
      if (currentPhieugiaohang && currentPhieugiaohang.id) {
        try {
          const oldPrintCount = currentPhieugiaohang.printCount || 0;
          const newPrintCount = oldPrintCount + 1;
          yield this._PhieugiaohangService.updateDonhang({
            id: currentPhieugiaohang.id,
            printCount: newPrintCount
          });
          currentPhieugiaohang.printCount = newPrintCount;
          console.log(`\u2705 [printContent] \u0110\xE3 c\u1EADp nh\u1EADt printCount: ${oldPrintCount} \u2192 ${newPrintCount}`);
          this._snackBar.open(`\u2705 \u0110\xE3 c\u1EADp nh\u1EADt tr\u1EA1ng th\xE1i in (l\u1EA7n th\u1EE9 ${newPrintCount})`, "", {
            duration: 2e3,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-success"]
          });
        } catch (error) {
          console.error("\u274C [printContent] L\u1ED7i khi c\u1EADp nh\u1EADt printCount:", error);
          this._snackBar.open("\u274C Kh\xF4ng th\u1EC3 c\u1EADp nh\u1EADt tr\u1EA1ng th\xE1i in. Vui l\xF2ng th\u1EED l\u1EA1i!", "", {
            duration: 3e3,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-error"]
          });
        }
      }
      const printContent = document.getElementById("printContent");
      if (printContent) {
        const newWindow = window.open("", "_blank");
        const tailwindCSS = `
    <script src="https://cdn.tailwindcss.com"><\/script>
    <script>
      tailwind.config = {
        theme: { extend: {} }
      };
    <\/script>
  `;
        if (newWindow) {
          newWindow.document.write(`
          <html>
          <head>
            <title>${this.DetailPhieugiaohang()?.madonhang}</title>
             ${tailwindCSS}
            <style>
              body { font-size: 12px; 'Times New Roman', Times, serif !important; }
              table { width: 100%; border-collapse: collapse; }
              th, td { border: 1px solid #000; padding: 4px; text-align: left; }
              .font-times {font-family: 'Times New Roman', Times, serif !important;}
              @media print { 
              body { margin: 0; font-family: 'Times New Roman', Times, serif !important;} 
              img {height:80px}
             .font-times {font-family: 'Times New Roman', Times, serif !important;}
              }
            </style>
          </head>
          <body>
            ${printContent.outerHTML}
            <script>
              window.onload = function() { window.print(); window.close(); }
            <\/script>
          </body>
          </html>
        `);
          newWindow.document.close();
          if (this.DetailPhieugiaohang().status === "dadat") {
            this.Dagiaohang();
          }
        } else {
          console.error("Kh\xF4ng th\u1EC3 m\u1EDF c\u1EEDa s\u1ED5 in");
        }
      } else {
        console.error("Kh\xF4ng t\xECm th\u1EA5y ph\u1EA7n t\u1EED printContent");
      }
    });
  }
  static \u0275fac = function DetailPhieugiaohangComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DetailPhieugiaohangComponent)(\u0275\u0275directiveInject(SharedInputService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DetailPhieugiaohangComponent, selectors: [["app-detailphieugiaohang"]], viewQuery: function DetailPhieugiaohangComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(MatPaginator, 5);
      \u0275\u0275viewQuery(MatSort, 5);
      \u0275\u0275viewQuery(_c0, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.paginator = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.sort = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.confirmRemoveDialog = _t.first);
    }
  }, decls: 31, vars: 23, consts: [["menu", "matMenu"], ["confirmRemoveDialog", ""], [1, "flex", "flex-row", "justify-between", "items-center", "space-x-2", "p-2"], ["mat-icon-button", "", "color", "primary", 3, "click"], [1, "flex", "items-center", "space-x-2", "p-2", "min-w-28", "font-bold", "focus:border", "focus:rounded-lg", "focus:border-blue-600", "focus:bg-slate-100", "focus:outline-none", "transition-colors", "duration-200"], ["color", "primary", "mat-icon-button", "", 3, "matMenuTriggerFor"], [1, "flex", "flex-col"], ["target", "_blank", 1, "p-4", "hover:bg-slate-100", 3, "href"], [1, "flex", "flex-row", "space-x-2", "items-center"], ["mat-flat-button", "", "color", "primary", 3, "click", "disabled"], ["diameter", "20", 1, "mr-2"], ["mat-icon-button", "", "color", "primary", 3, "disabled", "click", 4, "ngIf"], ["mat-icon-button", "", "color", "primary", 3, "click", 4, "ngIf"], [1, "relative", "flex", "flex-col", "w-full", "p-4", "overflow-auto"], [1, "absolute", "inset-0", "bg-white", "bg-opacity-75", "flex", "items-center", "justify-center", "z-10"], [4, "ngIf"], ["mat-icon-button", "", "color", "primary", 3, "click", "disabled"], ["diameter", "20"], [1, "flex", "flex-col", "items-center", "space-y-4"], ["diameter", "40"], [1, "text-sm", "text-gray-600"], [1, "flex", "flex-col", "space-y-4", "items-center", "justify-center"], [1, "font-bold", "text-2xl"], [1, "flex", "flex-row", "space-x-2", "items-center", "justify-center"], ["mat-flat-button", "", "color", "primary", 3, "click"], ["mat-flat-button", "", "color", "warn", 3, "click"], ["id", "printContent", 1, "font-times", "min-w-[800px]", "flex", "flex-col", "space-y-6", "items-center", "p-2", "rounded-lg"], [1, "w-full", "flex", "flex-col", "items-center", "justify-center"], ["class", "w-full flex flex-row space-x-2 items-center justify-between", 4, "ngIf"], [1, "font-bold", "text-[18px]", "uppercase"], ["class", "p-2 rounded-lg border text-red-600", 3, "innerHTML", 4, "ngIf"], [1, "w-full", "flex", "flex-row", "items-center", "mb-2"], [1, "w-full", "flex", "flex-col", "space-y-1", "divide-y", "divide-gray-300"], [1, "w-full", "flex", "items-start"], ["class", "w-full flex flex-col overflow-y-auto", 4, "ngIf"], ["class", "w-full border-collapse border mt-4", 4, "ngIf"], [1, "w-full", "flex", "justify-between", "items-center", "text-center", "mt-6", "p-2", "px-16"], [1, "w-full", "flex", "flex-row", "space-x-2", "items-center", "justify-between"], ["src", "/images/logo-dark.svg", 1, "h-14", "mx-auto"], [1, "w-2/3", "flex", "flex-col"], [1, "font-bold", "text-[18px]"], ["src", "/images/qrcodedonhang.svg", 1, "h-32", "ml-auto", "p-4"], [1, "p-2", "rounded-lg", "border", "text-red-600", 3, "innerHTML"], [1, "w-full", "flex", "flex-col", "overflow-y-auto"], [1, "w-full", "overflow-auto"], [3, "ngModelChange", "toggleChange", "ngModel", "ngModelOptions", "disabled"], [1, "font-medium"], [1, "relative", "w-full", "py-2"], ["type", "text", "placeholder", "T\xECm Ki\u1EBFm...", 1, "block", "w-full", "pl-10", "pr-4", "py-2", "text-gray-700", "bg-white", "border", "border-gray-300", "rounded-lg", "focus:border-blue-400", "focus:ring-blue-400", "focus:outline-none", "focus:ring", "focus:ring-opacity-40", "disabled:bg-gray-100", "disabled:cursor-not-allowed", 3, "keyup", "disabled"], [1, "absolute", "inset-y-0", "left-0", "flex", "items-center", "pl-3", "pointer-events-none"], [1, "material-symbols-outlined", "text-gray-500"], ["mat-table", "", "matSort", "", 1, "!border", "w-full", "cursor-pointer", 3, "dataSource"], [3, "matColumnDef"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["class", "mat-row", 4, "matNoDataRow"], ["class", "whitespace-nowrap", "mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["mat-header-cell", "", "mat-sort-header", "", 1, "whitespace-nowrap"], [1, "max-w-40", "line-clamp-4"], ["mat-cell", ""], [1, "max-w-20", "line-clamp-4", "flex", "flex-row", "items-center"], [1, "text-end"], [1, "ghichu-input", "p-2", "min-w-28", "bg-slate-200", "focus:border", "text-end", "rounded-lg", "focus:border-blue-600", "focus:bg-slate-100", "focus:outline-none", "transition-colors", "duration-200", 3, "contentEditable"], ["mat-icon-button", "", "color", "warn", 3, "click"], [1, "sldat-input", "p-2", "min-w-28", "bg-slate-200", "focus:border", "text-end", "rounded-lg", "focus:border-blue-600", "focus:bg-slate-100", "focus:outline-none", "transition-colors", "duration-200", 3, "contentEditable"], [1, "text-end", "p-2", "min-w-28", "bg-gray-100", "rounded-lg", "text-gray-600"], [1, "sldat-input", "p-2", "min-w-28", "bg-slate-200", "focus:border", "text-end", "rounded-lg", "focus:border-blue-600", "focus:bg-slate-100", "focus:outline-none", "transition-colors", "duration-200", 3, "focus", "blur", "keydown.enter", "keydown", "contentEditable"], [1, "slgiao-input", "p-2", "min-w-28", "bg-slate-200", "focus:border", "text-end", "rounded-lg", "focus:border-blue-600", "focus:bg-slate-100", "focus:outline-none", "transition-colors", "duration-200", 3, "contentEditable"], [1, "slgiao-input", "p-2", "min-w-28", "bg-slate-200", "focus:border", "text-end", "rounded-lg", "focus:border-blue-600", "focus:bg-slate-100", "focus:outline-none", "transition-colors", "duration-200", 3, "focus", "blur", "keydown.enter", "keydown", "contentEditable"], [1, "slnhan-input", "p-2", "min-w-28", "bg-slate-200", "focus:border", "rounded-lg", "focus:border-blue-600", "focus:bg-slate-100", "focus:outline-none", "transition-colors", "duration-200", 3, "contentEditable"], [1, "slnhan-input", "p-2", "min-w-28", "bg-slate-200", "focus:border", "rounded-lg", "focus:border-blue-600", "focus:bg-slate-100", "focus:outline-none", "transition-colors", "duration-200", 3, "focus", "blur", "keydown.enter", "keydown", "contentEditable"], [1, "ghichu-input", "p-2", "min-w-28", "bg-slate-200", "focus:border", "text-end", "rounded-lg", "focus:border-blue-600", "focus:bg-slate-100", "focus:outline-none", "transition-colors", "duration-200", 3, "focus", "blur", "keydown.enter", "keydown", "contentEditable"], ["mat-header-row", ""], ["mat-row", ""], [1, "mat-row"], [1, "mat-cell", "p-4"], [1, "w-full", "border-collapse", "border", "mt-4"], [1, "border"], [1, "border", "px-2", "max-w-10", "text-center"], [1, "border", "px-2", "text-center"], [1, "border", "px-2", "text-center", "max-w-10", "whitespace-nowrap"], ["class", "border px-2 text-center max-w-15 whitespace-nowrap", 4, "ngIf"], [1, "border", "px-2", "text-center", "max-w-15", "whitespace-nowrap"], ["colspan", "3", 1, "border", "px-2", "text-start"], [1, "border", "px-2", "text-end", "font-bold"], ["class", "border px-2 text-end font-bold", 4, "ngIf"], [1, "border", "px-2", "text-end"], [1, "border", "px-2", "text-center", "max-w-10"], [1, "border", "px-2"], [1, "border", "px-2", "text-end", "max-w-10"], ["class", "border px-2 text-end max-w-15", 4, "ngIf"], [1, "border", "px-2", "text-end", "max-w-15"], ["colspan", "5", 1, "border", "px-2", "text-start"], [1, "!relative", "!flex", "flex-col", "space-y-6", "items-center", "justify-center", "p-6"], [1, "flex", "flex-row", "space-x-3", "items-center"], [1, "text-amber-500", "text-3xl"], [1, "text-lg", "font-medium"], [1, "text-center"], [1, "text-gray-700"], ["class", "font-bold text-blue-600 mt-2", 4, "ngIf"], [1, "text-gray-700", "mt-2"], [1, "bg-yellow-50", "p-3", "rounded-lg", "border", "border-yellow-200"], [1, "text-sm", "text-yellow-800"], [1, "text-yellow-600", "text-sm", "mr-1"], [1, "flex", "flex-row", "space-x-3", "items-center", "justify-center"], ["mat-flat-button", "", "color", "warn", "mat-dialog-close", "confirm"], ["mat-flat-button", "", "mat-dialog-close", "cancel"], [1, "font-bold", "text-blue-600", "mt-2"]], template: function DetailPhieugiaohangComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 2)(1, "button", 3);
      \u0275\u0275listener("click", function DetailPhieugiaohangComponent_Template_button_click_1_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.goBack());
      });
      \u0275\u0275elementStart(2, "mat-icon");
      \u0275\u0275text(3, "arrow_back");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(4, "div", 4);
      \u0275\u0275text(5);
      \u0275\u0275elementStart(6, "button", 5)(7, "mat-icon");
      \u0275\u0275text(8, "info");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "mat-menu", null, 0)(11, "div", 6)(12, "a", 7);
      \u0275\u0275text(13);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "a", 7);
      \u0275\u0275text(15);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "a", 7);
      \u0275\u0275text(17);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(18, "div", 8)(19, "button", 9);
      \u0275\u0275listener("click", function DetailPhieugiaohangComponent_Template_button_click_19_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.Danhanhang());
      });
      \u0275\u0275template(20, DetailPhieugiaohangComponent_Conditional_20_Template, 1, 0, "mat-spinner", 10);
      \u0275\u0275text(21);
      \u0275\u0275elementEnd();
      \u0275\u0275template(22, DetailPhieugiaohangComponent_button_22_Template, 3, 1, "button", 11)(23, DetailPhieugiaohangComponent_button_23_Template, 3, 2, "button", 11)(24, DetailPhieugiaohangComponent_button_24_Template, 3, 0, "button", 12);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(25, "div", 13);
      \u0275\u0275template(26, DetailPhieugiaohangComponent_Conditional_26_Template, 5, 0, "div", 14)(27, DetailPhieugiaohangComponent_ng_container_27_Template, 9, 0, "ng-container", 15)(28, DetailPhieugiaohangComponent_ng_container_28_Template, 40, 20, "ng-container", 15);
      \u0275\u0275elementEnd();
      \u0275\u0275template(29, DetailPhieugiaohangComponent_ng_template_29_Template, 26, 1, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      let tmp_2_0;
      let tmp_4_0;
      let tmp_5_0;
      let tmp_6_0;
      let tmp_7_0;
      let tmp_8_0;
      let tmp_9_0;
      const menu_r19 = \u0275\u0275reference(10);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1(" ", ((tmp_2_0 = ctx.DetailPhieugiaohang()) == null ? null : tmp_2_0.madonhang) || "Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u", "\n");
      \u0275\u0275advance();
      \u0275\u0275property("matMenuTriggerFor", menu_r19);
      \u0275\u0275advance(6);
      \u0275\u0275propertyInterpolate1("href", "admin/khachhang/", (tmp_4_0 = ctx.DetailPhieugiaohang()) == null ? null : tmp_4_0.khachhang == null ? null : tmp_4_0.khachhang.id, "", \u0275\u0275sanitizeUrl);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate2("", (tmp_5_0 = ctx.DetailPhieugiaohang()) == null ? null : tmp_5_0.khachhang == null ? null : tmp_5_0.khachhang.name, " - ", (tmp_5_0 = ctx.DetailPhieugiaohang()) == null ? null : tmp_5_0.khachhang == null ? null : tmp_5_0.khachhang.makh, "");
      \u0275\u0275advance();
      \u0275\u0275propertyInterpolate1("href", "admin/banggia/", (tmp_6_0 = ctx.DetailPhieugiaohang()) == null ? null : tmp_6_0.banggia == null ? null : tmp_6_0.banggia.id, "", \u0275\u0275sanitizeUrl);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate2("(\u0110\u01A1n H\xE0ng) ", (tmp_7_0 = ctx.DetailPhieugiaohang()) == null ? null : tmp_7_0.banggia == null ? null : tmp_7_0.banggia.mabanggia, " - ", (tmp_7_0 = ctx.DetailPhieugiaohang()) == null ? null : tmp_7_0.banggia == null ? null : tmp_7_0.banggia.title, "");
      \u0275\u0275advance();
      \u0275\u0275propertyInterpolate1("href", "admin/banggia/", (tmp_8_0 = ctx.DetailPhieugiaohang()) == null ? null : tmp_8_0.khachhang == null ? null : tmp_8_0.khachhang.banggia == null ? null : tmp_8_0.khachhang.banggia.id, "", \u0275\u0275sanitizeUrl);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate2("(Kh\xE1ch h\xE0ng) ", (tmp_9_0 = ctx.DetailPhieugiaohang()) == null ? null : tmp_9_0.khachhang == null ? null : tmp_9_0.khachhang.banggia == null ? null : tmp_9_0.khachhang.banggia.mabanggia, " - ", (tmp_9_0 = ctx.DetailPhieugiaohang()) == null ? null : tmp_9_0.khachhang == null ? null : tmp_9_0.khachhang.banggia == null ? null : tmp_9_0.khachhang.banggia.title, "");
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.DetailPhieugiaohang().status == "danhan" || ctx.isUpdating() || ctx.isLoading());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isUpdating() ? 20 : -1);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.isUpdating() ? "\u0110ang x\u1EED l\xFD..." : "\u0110\xE3 Nh\u1EADn", " ");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isEdit());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isEdit());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isEdit());
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.isLoading() ? 26 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isDelete());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isDelete());
    }
  }, dependencies: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatIcon,
    MatButtonModule,
    MatButton,
    MatIconButton,
    MatSelectModule,
    MatDialogModule,
    MatDialogClose,
    MatDialogContent,
    CommonModule,
    NgIf,
    DecimalPipe,
    DatePipe,
    MatSlideToggleModule,
    MatMenuModule,
    MatMenu,
    MatMenuTrigger,
    MatDatepickerModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatProgressSpinner
  ], encapsulation: 2, changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DetailPhieugiaohangComponent, { className: "DetailPhieugiaohangComponent", filePath: "src/app/admin/phieugiaohang/detailphieugiaohang/detailphieugiaohang.component.ts", lineNumber: 74 });
})();
export {
  DetailPhieugiaohangComponent
};
//# sourceMappingURL=chunk-FCRGZMYJ.js.map
