import {
  ChotkhoService
} from "./chunk-3TIKQVOT.js";
import {
  MatProgressBar,
  MatProgressBarModule
} from "./chunk-T6HSD7WJ.js";
import {
  Debounce,
  memoize
} from "./chunk-FTMLWTPE.js";
import {
  SearchfilterComponent
} from "./chunk-U6AGDL5A.js";
import {
  MatPaginator,
  MatPaginatorModule
} from "./chunk-YK4IEOL5.js";
import {
  MatSort,
  MatSortHeader,
  MatSortModule
} from "./chunk-TVYI4UUP.js";
import {
  MatDrawer,
  MatDrawerContainer,
  MatSidenavModule
} from "./chunk-XY2N6Z76.js";
import {
  MatMenu,
  MatMenuItem,
  MatMenuModule,
  MatMenuTrigger
} from "./chunk-RUSDLITN.js";
import {
  Router,
  RouterOutlet
} from "./chunk-AGKEHWOL.js";
import {
  MatProgressSpinnerModule
} from "./chunk-NOVTUKZ4.js";
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
  MatCheckboxModule
} from "./chunk-6SHRRI2O.js";
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
import {
  MatChip,
  MatChipsModule
} from "./chunk-QD44HLKX.js";
import {
  MatTooltip,
  MatTooltipModule
} from "./chunk-E3N2TZ4N.js";
import {
  MatSelect,
  MatSelectModule
} from "./chunk-JNSSVLJO.js";
import {
  MatInput,
  MatInputModule
} from "./chunk-65RDCWJI.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MatFormField,
  MatFormFieldModule,
  MatLabel,
  MatPrefix,
  NgControlStatus,
  NgModel
} from "./chunk-XDPJU2GK.js";
import {
  MatIcon,
  MatIconModule
} from "./chunk-ZRMLZ234.js";
import {
  MatButton,
  MatButtonModule,
  MatIconButton
} from "./chunk-BRETK2KI.js";
import {
  BreakpointObserver,
  Breakpoints,
  MatOption
} from "./chunk-EMBYIBW3.js";
import {
  CommonModule,
  DatePipe,
  NgClass,
  NgIf
} from "./chunk-RKTFENMZ.js";
import {
  effect,
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMapInterpolate1,
  ɵɵconditional,
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
import {
  __decorate
} from "./chunk-E3MB3462.js";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-SXK72SKC.js";

// src/app/admin/chotkho/listchotkho/listchotkho.ts
var _c0 = ["drawer"];
var _c1 = () => ({ standalone: true });
var _forTrack0 = ($index, $item) => $item.key;
function ListChotkhoComponent_button_23_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 42);
    \u0275\u0275text(1, "autorenew");
    \u0275\u0275elementEnd();
  }
}
function ListChotkhoComponent_button_23_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "delete");
    \u0275\u0275elementEnd();
  }
}
function ListChotkhoComponent_button_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 41);
    \u0275\u0275listener("click", function ListChotkhoComponent_button_23_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      const DeleteDialog_r4 = \u0275\u0275reference(71);
      return \u0275\u0275resetView(ctx_r2.openDeleteDialog(DeleteDialog_r4));
    });
    \u0275\u0275template(1, ListChotkhoComponent_button_23_Conditional_1_Template, 2, 0, "mat-icon", 42)(2, ListChotkhoComponent_button_23_Conditional_2_Template, 2, 0, "mat-icon");
    \u0275\u0275elementStart(3, "span", 20);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", ctx_r2.isLoading());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.isLoading() ? 1 : 2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Xo\xE1 (", ctx_r2.EditList.length, ")");
  }
}
function ListChotkhoComponent_For_66_Conditional_1_th_0_For_16_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 55);
    \u0275\u0275listener("click", function ListChotkhoComponent_For_66_Conditional_1_th_0_For_16_Conditional_0_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r7);
      const item_r8 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(4);
      ctx_r2.toggleColumn(item_r8);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("disabled", true);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r8.isShow ? "check_box" : "check_box_outline_blank");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r8.value);
  }
}
function ListChotkhoComponent_For_66_Conditional_1_th_0_For_16_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 56);
    \u0275\u0275listener("click", function ListChotkhoComponent_For_66_Conditional_1_th_0_For_16_Conditional_1_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r9);
      const item_r8 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(4);
      ctx_r2.toggleColumn(item_r8);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r8.isShow ? "check_box" : "check_box_outline_blank");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r8.value);
  }
}
function ListChotkhoComponent_For_66_Conditional_1_th_0_For_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, ListChotkhoComponent_For_66_Conditional_1_th_0_For_16_Conditional_0_Template, 5, 3, "button", 53)(1, ListChotkhoComponent_For_66_Conditional_1_th_0_For_16_Conditional_1_Template, 5, 2, "button", 54);
  }
  if (rf & 2) {
    const item_r8 = ctx.$implicit;
    \u0275\u0275conditional(item_r8.key == "stt" ? 0 : 1);
  }
}
function ListChotkhoComponent_For_66_Conditional_1_th_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "th", 43)(1, "button", 47)(2, "mat-icon");
    \u0275\u0275text(3, "tune");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "mat-menu", null, 8)(6, "div", 48)(7, "mat-form-field", 49)(8, "input", 50);
    \u0275\u0275listener("input", function ListChotkhoComponent_For_66_Conditional_1_th_0_Template_input_input_8_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.doFilterColumns($event));
    })("click", function ListChotkhoComponent_For_66_Conditional_1_th_0_Template_input_click_8_listener($event) {
      \u0275\u0275restoreView(_r6);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "mat-icon", 51);
    \u0275\u0275text(10, "search");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "button", 32);
    \u0275\u0275listener("click", function ListChotkhoComponent_For_66_Conditional_1_th_0_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.updateDisplayedColumns());
    });
    \u0275\u0275elementStart(12, "mat-icon");
    \u0275\u0275text(13, "check_circle");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "div", 52);
    \u0275\u0275repeaterCreate(15, ListChotkhoComponent_For_66_Conditional_1_th_0_For_16_Template, 2, 1, null, null, _forTrack0);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const menu_r10 = \u0275\u0275reference(5);
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("matMenuTriggerFor", menu_r10);
    \u0275\u0275advance(14);
    \u0275\u0275repeater(ctx_r2.FilterColumns);
  }
}
function ListChotkhoComponent_For_66_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, ListChotkhoComponent_For_66_Conditional_1_th_0_Template, 17, 1, "th", 46);
  }
}
function ListChotkhoComponent_For_66_Conditional_2_th_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "th", 44)(1, "span", 58);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "app-searchfilter", 59);
    \u0275\u0275listener("OutFilter", function ListChotkhoComponent_For_66_Conditional_2_th_0_Template_app_searchfilter_OutFilter_3_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.onOutFilter($event));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const column_r12 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.ColumnName[column_r12], " ");
    \u0275\u0275advance();
    \u0275\u0275property("icon", "filter_alt")("ListItem", ctx_r2.Listchotkho())("fieldsearch", column_r12)("ListFilter", ctx_r2.ListFilter)("filterItem", ctx_r2.FilterHederColumn(ctx_r2.dataSource.filteredData, column_r12));
  }
}
function ListChotkhoComponent_For_66_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, ListChotkhoComponent_For_66_Conditional_2_th_0_Template, 4, 6, "th", 57);
  }
}
function ListChotkhoComponent_For_66_td_3_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 65);
    \u0275\u0275listener("click", function ListChotkhoComponent_For_66_td_3_Case_1_Template_span_click_0_listener() {
      \u0275\u0275restoreView(_r13);
      const row_r14 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.goToDetail(row_r14));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r14 = \u0275\u0275nextContext().$implicit;
    const column_r12 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r14[column_r12], " ");
  }
}
function ListChotkhoComponent_For_66_td_3_Case_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "check");
    \u0275\u0275elementEnd();
  }
}
function ListChotkhoComponent_For_66_td_3_Case_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const idx_r16 = \u0275\u0275nextContext(2).index;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(idx_r16 + 1);
  }
}
function ListChotkhoComponent_For_66_td_3_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 66);
    \u0275\u0275listener("click", function ListChotkhoComponent_For_66_td_3_Case_2_Template_span_click_0_listener() {
      \u0275\u0275restoreView(_r15);
      const row_r14 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.AddToEdit(row_r14));
    });
    \u0275\u0275template(1, ListChotkhoComponent_For_66_td_3_Case_2_Conditional_1_Template, 2, 0, "mat-icon")(2, ListChotkhoComponent_For_66_td_3_Case_2_Conditional_2_Template, 2, 1, "span");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r14 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.CheckSelect(row_r14) ? 1 : 2);
  }
}
function ListChotkhoComponent_For_66_td_3_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 63);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r14 = \u0275\u0275nextContext().$implicit;
    const column_r12 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r14[column_r12], "HH:mm:ss dd/MM/yyyy"), " ");
  }
}
function ListChotkhoComponent_For_66_td_3_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 63);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r14 = \u0275\u0275nextContext().$implicit;
    const column_r12 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r14[column_r12], "dd/MM/yyyy"), " ");
  }
}
function ListChotkhoComponent_For_66_td_3_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 63);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r14 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (row_r14.kho == null ? null : row_r14.kho.name) || (row_r14.kho == null ? null : row_r14.kho.makho) || "Ch\u01B0a ch\u1ECDn kho", " ");
  }
}
function ListChotkhoComponent_For_66_td_3_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 64)(1, "mat-chip", 67);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r14 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", (row_r14.details == null ? null : row_r14.details.length) || 0, " SP ");
  }
}
function ListChotkhoComponent_For_66_td_3_Case_7_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 68);
    \u0275\u0275text(1, "check_circle");
    \u0275\u0275elementEnd();
  }
}
function ListChotkhoComponent_For_66_td_3_Case_7_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 69);
    \u0275\u0275text(1, "cancel");
    \u0275\u0275elementEnd();
  }
}
function ListChotkhoComponent_For_66_td_3_Case_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 63);
    \u0275\u0275template(1, ListChotkhoComponent_For_66_td_3_Case_7_Conditional_1_Template, 2, 0, "mat-icon", 68)(2, ListChotkhoComponent_For_66_td_3_Case_7_Conditional_2_Template, 2, 0, "mat-icon", 69);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r14 = \u0275\u0275nextContext().$implicit;
    const column_r12 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(row_r14[column_r12] ? 1 : 2);
  }
}
function ListChotkhoComponent_For_66_td_3_Case_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 63);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r14 = \u0275\u0275nextContext().$implicit;
    const column_r12 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r14[column_r12], " ");
  }
}
function ListChotkhoComponent_For_66_td_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 60);
    \u0275\u0275template(1, ListChotkhoComponent_For_66_td_3_Case_1_Template, 2, 1, "span", 61)(2, ListChotkhoComponent_For_66_td_3_Case_2_Template, 3, 1, "span", 62)(3, ListChotkhoComponent_For_66_td_3_Case_3_Template, 3, 4, "span", 63)(4, ListChotkhoComponent_For_66_td_3_Case_4_Template, 3, 4, "span", 63)(5, ListChotkhoComponent_For_66_td_3_Case_5_Template, 2, 1, "span", 63)(6, ListChotkhoComponent_For_66_td_3_Case_6_Template, 3, 1, "span", 64)(7, ListChotkhoComponent_For_66_td_3_Case_7_Template, 3, 1, "span", 63)(8, ListChotkhoComponent_For_66_td_3_Case_8_Template, 2, 1, "span", 63);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_22_0;
    const column_r12 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_22_0 = column_r12) === "codeId" ? 1 : tmp_22_0 === "stt" ? 2 : tmp_22_0 === "createdAt" ? 3 : tmp_22_0 === "ngaychot" ? 4 : tmp_22_0 === "khoId" ? 5 : tmp_22_0 === "details" ? 6 : tmp_22_0 === "isActive" ? 7 : 8);
  }
}
function ListChotkhoComponent_For_66_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0, 37);
    \u0275\u0275template(1, ListChotkhoComponent_For_66_Conditional_1_Template, 1, 0, "th", 43)(2, ListChotkhoComponent_For_66_Conditional_2_Template, 1, 0, "th", 44)(3, ListChotkhoComponent_For_66_td_3_Template, 9, 1, "td", 45);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const column_r12 = ctx.$implicit;
    \u0275\u0275property("matColumnDef", column_r12);
    \u0275\u0275advance();
    \u0275\u0275conditional(column_r12 == "stt" ? 1 : 2);
  }
}
function ListChotkhoComponent_tr_67_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 70);
  }
}
function ListChotkhoComponent_tr_68_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 71);
    \u0275\u0275listener("click", function ListChotkhoComponent_tr_68_Template_tr_click_0_listener() {
      const row_r18 = \u0275\u0275restoreView(_r17).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.AddToEdit(row_r18));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r18 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classMapInterpolate1("hover:bg-slate-100 cursor-pointer ", ctx_r2.CheckItemInEdit(row_r18) ? "!bg-slate-200" : "", "");
  }
}
function ListChotkhoComponent_tr_69_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 72)(1, "td", 73);
    \u0275\u0275text(2, "Kh\xF4ng t\xECm th\u1EA5y");
    \u0275\u0275elementEnd()();
  }
}
function ListChotkhoComponent_ng_template_70_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-dialog-content")(1, "div", 74)(2, "div", 75);
    \u0275\u0275text(3, "X\xE1c Nh\u1EADn");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div");
    \u0275\u0275text(5, "B\u1EA1n ch\u1EAFc ch\u1EAFn mu\u1ED1n xo\xE1 kh\xF4ng?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 76)(7, "button", 77);
    \u0275\u0275text(8, "\u0110\u1ED3ng \xDD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 78);
    \u0275\u0275text(10, "Hu\u1EF7 B\u1ECF");
    \u0275\u0275elementEnd()()()();
  }
}
function ListChotkhoComponent_ng_template_72_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 81);
    \u0275\u0275element(1, "mat-progress-bar", 87);
    \u0275\u0275elementStart(2, "div", 88);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("value", ctx_r2.importProgress);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r2.importProgress, "% Complete");
  }
}
function ListChotkhoComponent_ng_template_72_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-dialog-content")(1, "div", 79)(2, "div", 80);
    \u0275\u0275text(3, "Import Excel File");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 81)(5, "input", 82);
    \u0275\u0275listener("change", function ListChotkhoComponent_ng_template_72_Template_input_change_5_listener($event) {
      \u0275\u0275restoreView(_r19);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onFileSelected($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275template(6, ListChotkhoComponent_ng_template_72_div_6_Template, 4, 2, "div", 83);
    \u0275\u0275elementStart(7, "div", 84)(8, "button", 85);
    \u0275\u0275listener("click", function ListChotkhoComponent_ng_template_72_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r19);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.startImport());
    });
    \u0275\u0275text(9, " Start Import ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "button", 86);
    \u0275\u0275text(11, "Cancel");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", ctx_r2.importProgress > 0);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx_r2.selectedFile || ctx_r2.importProgress > 0);
  }
}
function ListChotkhoComponent_ng_template_74_div_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 81);
    \u0275\u0275element(1, "mat-progress-bar", 87);
    \u0275\u0275elementStart(2, "div", 88);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("value", ctx_r2.exportProgress);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r2.exportProgress, "% Complete");
  }
}
function ListChotkhoComponent_ng_template_74_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-dialog-content")(1, "div", 79)(2, "div", 80);
    \u0275\u0275text(3, "Export to Excel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 81)(5, "mat-form-field", 89)(6, "mat-label");
    \u0275\u0275text(7, "Export Type");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "mat-select", 90);
    \u0275\u0275twoWayListener("valueChange", function ListChotkhoComponent_ng_template_74_Template_mat_select_valueChange_8_listener($event) {
      \u0275\u0275restoreView(_r20);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.exportType, $event) || (ctx_r2.exportType = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(9, "mat-option", 91);
    \u0275\u0275text(10, "All Data");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "mat-option", 92);
    \u0275\u0275text(12, "Filtered Data");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "mat-option", 93);
    \u0275\u0275text(14, "Selected Items");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275template(15, ListChotkhoComponent_ng_template_74_div_15_Template, 4, 2, "div", 83);
    \u0275\u0275elementStart(16, "div", 84)(17, "button", 85);
    \u0275\u0275listener("click", function ListChotkhoComponent_ng_template_74_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.startExport());
    });
    \u0275\u0275text(18, " Start Export ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "button", 86);
    \u0275\u0275text(20, "Cancel");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275twoWayProperty("value", ctx_r2.exportType);
    \u0275\u0275advance(7);
    \u0275\u0275property("ngIf", ctx_r2.exportProgress > 0);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r2.exportProgress > 0);
  }
}
function ListChotkhoComponent_ng_template_76_div_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 81)(1, "mat-form-field", 89)(2, "mat-label");
    \u0275\u0275text(3, "Backup Type");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "mat-select", 90);
    \u0275\u0275twoWayListener("valueChange", function ListChotkhoComponent_ng_template_76_div_4_Template_mat_select_valueChange_4_listener($event) {
      \u0275\u0275restoreView(_r22);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.backupType, $event) || (ctx_r2.backupType = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(5, "mat-option", 94);
    \u0275\u0275text(6, "Full Backup");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "mat-option", 95);
    \u0275\u0275text(8, "Incremental Backup");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "mat-form-field", 89)(10, "mat-label");
    \u0275\u0275text(11, "Backup Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "input", 96);
    \u0275\u0275twoWayListener("ngModelChange", function ListChotkhoComponent_ng_template_76_div_4_Template_input_ngModelChange_12_listener($event) {
      \u0275\u0275restoreView(_r22);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.backupName, $event) || (ctx_r2.backupName = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("value", ctx_r2.backupType);
    \u0275\u0275advance(8);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.backupName);
  }
}
function ListChotkhoComponent_ng_template_76_div_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 81)(1, "input", 97);
    \u0275\u0275listener("change", function ListChotkhoComponent_ng_template_76_div_5_Template_input_change_1_listener($event) {
      \u0275\u0275restoreView(_r23);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.onBackupFileSelected($event));
    });
    \u0275\u0275elementEnd()();
  }
}
function ListChotkhoComponent_ng_template_76_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 81);
    \u0275\u0275element(1, "mat-progress-bar", 87);
    \u0275\u0275elementStart(2, "div", 88);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("value", ctx_r2.backupProgress);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r2.backupProgress, "% Complete");
  }
}
function ListChotkhoComponent_ng_template_76_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-dialog-content")(1, "div", 79)(2, "div", 80);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, ListChotkhoComponent_ng_template_76_div_4_Template, 13, 2, "div", 83)(5, ListChotkhoComponent_ng_template_76_div_5_Template, 2, 0, "div", 83)(6, ListChotkhoComponent_ng_template_76_div_6_Template, 4, 2, "div", 83);
    \u0275\u0275elementStart(7, "div", 84)(8, "button", 85);
    \u0275\u0275listener("click", function ListChotkhoComponent_ng_template_76_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r21);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.isRestoreMode ? ctx_r2.startRestore() : ctx_r2.startBackup());
    });
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "button", 86);
    \u0275\u0275text(11, "Cancel");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.isRestoreMode ? "Restore Data" : "Create Backup");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r2.isRestoreMode);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.isRestoreMode);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.backupProgress > 0);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r2.backupProgress > 0 || ctx_r2.isRestoreMode && !ctx_r2.selectedBackupFile || !ctx_r2.isRestoreMode && !ctx_r2.backupName);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.isRestoreMode ? "Start Restore" : "Start Backup", " ");
  }
}
function ListChotkhoComponent_ng_template_78_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 101)(1, "div", 102)(2, "span", 103);
    \u0275\u0275text(3, "Database");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 104)(5, "mat-icon", 105);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 106);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "div", 102)(10, "span", 103);
    \u0275\u0275text(11, "API Server");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 104)(13, "mat-icon", 105);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span", 106);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "div", 102)(18, "span", 103);
    \u0275\u0275text(19, "Memory Usage");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 104)(21, "mat-icon", 105);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "span", 106);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(25, "div", 107)(26, "span", 103);
    \u0275\u0275text(27, "Last Check");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "span", 106);
    \u0275\u0275text(29);
    \u0275\u0275pipe(30, "date");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r2.healthCheck.database.status === "healthy" ? "bg-green-50" : "bg-red-50");
    \u0275\u0275advance(4);
    \u0275\u0275property("ngClass", ctx_r2.healthCheck.database.status === "healthy" ? "text-green-500" : "text-red-500");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.healthCheck.database.status === "healthy" ? "check_circle" : "error", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r2.healthCheck.database.responseTime, "ms");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r2.healthCheck.api.status === "healthy" ? "bg-green-50" : "bg-red-50");
    \u0275\u0275advance(4);
    \u0275\u0275property("ngClass", ctx_r2.healthCheck.api.status === "healthy" ? "text-green-500" : "text-red-500");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.healthCheck.api.status === "healthy" ? "check_circle" : "error", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r2.healthCheck.api.responseTime, "ms");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r2.healthCheck.memory.status === "healthy" ? "bg-green-50" : "bg-yellow-50");
    \u0275\u0275advance(4);
    \u0275\u0275property("ngClass", ctx_r2.healthCheck.memory.status === "healthy" ? "text-green-500" : "text-yellow-500");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.healthCheck.memory.status === "healthy" ? "check_circle" : "warning", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r2.healthCheck.memory.usage, "%");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(30, 13, ctx_r2.healthCheck.timestamp, "dd/MM/yyyy HH:mm:ss"));
  }
}
function ListChotkhoComponent_ng_template_78_Template(rf, ctx) {
  if (rf & 1) {
    const _r24 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-dialog-content")(1, "div", 98)(2, "div", 80);
    \u0275\u0275text(3, "System Health Status");
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, ListChotkhoComponent_ng_template_78_div_4_Template, 31, 16, "div", 99);
    \u0275\u0275elementStart(5, "div", 84)(6, "button", 100);
    \u0275\u0275listener("click", function ListChotkhoComponent_ng_template_78_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r24);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.checkSystemHealth());
    });
    \u0275\u0275text(7, " Refresh Status ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 86);
    \u0275\u0275text(9, "Close");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r2.healthCheck);
  }
}
function ListChotkhoComponent_ng_template_80_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 108)(1, "h2", 109);
    \u0275\u0275text(2, "X\xE1c nh\u1EADn x\xF3a");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 110);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 111)(6, "button", 77);
    \u0275\u0275text(7, "X\xE1c nh\u1EADn");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 78);
    \u0275\u0275text(9, "H\u1EE7y b\u1ECF");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" B\u1EA1n c\xF3 ch\u1EAFc ch\u1EAFn mu\u1ED1n x\xF3a ", ctx_r2.EditList.length, " m\u1EE5c \u0111\xE3 ch\u1ECDn kh\xF4ng? H\xE0nh \u0111\u1ED9ng n\xE0y kh\xF4ng th\u1EC3 ho\xE0n t\xE1c. ");
  }
}
var ListChotkhoComponent = class _ListChotkhoComponent {
  displayedColumns = [];
  ColumnName = {
    stt: "#",
    codeId: "M\xE3 ch\u1ED1t kho",
    title: "Ti\xEAu \u0111\u1EC1",
    // khoId: 'Kho',
    ngaychot: "Ng\xE0y ch\u1ED1t",
    ghichu: "Ghi ch\xFA",
    // isActive: 'Trạng thái',
    createdAt: "Ng\xE0y t\u1EA1o"
    // order: 'Thứ tự',
    // details: 'Số SP'
  };
  FilterColumns = JSON.parse(localStorage.getItem("ChotkhoColFilter") || "[]");
  Columns = [];
  paginator;
  sort;
  drawer;
  _ChotkhoService = inject(ChotkhoService);
  _breakpointObserver = inject(BreakpointObserver);
  _router = inject(Router);
  _dialog = inject(MatDialog);
  _snackBar = inject(MatSnackBar);
  Listchotkho = this._ChotkhoService.ListChotkho;
  page = this._ChotkhoService.page;
  totalPages = this._ChotkhoService.totalPages;
  total = this._ChotkhoService.total;
  pageSize = this._ChotkhoService.pageSize;
  chotkhoId = this._ChotkhoService.chotkhoId;
  isLoading = this._ChotkhoService.isLoading;
  isRefreshing = this._ChotkhoService.isRefreshing;
  lastUpdated = this._ChotkhoService.lastUpdated;
  dataSource = new MatTableDataSource([]);
  EditList = [];
  isSearch = signal(false);
  searchParam = {};
  // Performance tracking
  performanceMetrics = signal({
    loadTime: 0,
    renderTime: 0,
    totalItems: 0,
    lastRefresh: null
  });
  // Dialog-related properties
  selectedFile = null;
  selectedBackupFile = null;
  exportType = "all";
  backupType = "full";
  backupName = "";
  isRestoreMode = false;
  importProgress = 0;
  exportProgress = 0;
  backupProgress = 0;
  healthCheck = null;
  constructor() {
    effect(() => {
      const startTime = performance.now();
      this.dataSource.data = this.Listchotkho();
      this.dataSource.sort = this.sort;
      if (this.paginator) {
        this.paginator.pageIndex = this.page() - 1;
        this.paginator.pageSize = this.pageSize();
        this.paginator.length = this.total();
      }
      const endTime = performance.now();
      this.performanceMetrics.update((metrics) => __spreadProps(__spreadValues({}, metrics), {
        renderTime: endTime - startTime,
        totalItems: this.Listchotkho().length,
        lastRefresh: /* @__PURE__ */ new Date()
      }));
    });
  }
  ngOnInit() {
    return __async(this, null, function* () {
      const startTime = performance.now();
      yield this._ChotkhoService.getAllChotkho(this.searchParam);
      this.displayedColumns = Object.keys(this.ColumnName);
      this.dataSource = new MatTableDataSource(this.Listchotkho());
      this.dataSource.sort = this.sort;
      this.initializeColumns();
      this.setupDrawer();
      const endTime = performance.now();
      this.performanceMetrics.update((metrics) => __spreadProps(__spreadValues({}, metrics), {
        loadTime: endTime - startTime
      }));
    });
  }
  initializeColumns() {
    this.Columns = Object.entries(this.ColumnName).map(([key, value]) => ({ key, value, isShow: true }));
    this.FilterColumns = this.FilterColumns.length ? this.FilterColumns : this.Columns;
    localStorage.setItem("ChotkhoColFilter", JSON.stringify(this.FilterColumns));
    this.displayedColumns = this.FilterColumns.filter((col) => col.isShow).map((col) => col.key);
    this.ColumnName = this.FilterColumns.reduce((acc, { key, value, isShow }) => isShow ? __spreadProps(__spreadValues({}, acc), { [key]: value }) : acc, {});
  }
  applyFilter(event) {
    const filterValue = event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getUpdatedCodeIds() {
    return __async(this, null, function* () {
      yield this._ChotkhoService.getUpdatedCodeIds();
    });
  }
  setupDrawer() {
    this._breakpointObserver.observe([Breakpoints.Handset]).subscribe((result) => {
      if (result.matches) {
        this.drawer.mode = "over";
      } else {
        this.drawer.mode = "over";
      }
    });
  }
  toggleColumn(item) {
    const column = this.FilterColumns.find((v) => v.key === item.key);
    if (column) {
      column.isShow = !column.isShow;
    }
  }
  FilterHederColumn(list, column) {
    const uniqueList = list.filter((obj, index, self) => index === self.findIndex((t) => t[column] === obj[column]));
    return uniqueList;
  }
  ListFilter = [];
  onOutFilter(event) {
    this.dataSource.data = event;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  updateDisplayedColumns() {
    this.displayedColumns = this.FilterColumns.filter((v) => v.isShow).map((item) => item.key);
    this.ColumnName = this.FilterColumns.reduce((obj, item) => {
      if (item.isShow)
        obj[item.key] = item.value;
      return obj;
    }, {});
    localStorage.setItem("ChotkhoColFilter", JSON.stringify(this.FilterColumns));
  }
  doFilterColumns(event) {
    const query = event.target.value.toLowerCase();
    this.FilterColumns = this.Columns.filter((v) => v.value.toLowerCase().includes(query));
  }
  create() {
    this.drawer.open();
    this._router.navigate(["admin/chotkho", "new"]);
  }
  CheckSelect(item) {
    return this.EditList.some((v) => v.id === item.id) ? true : false;
  }
  openDeleteDialog(template) {
    const dialogDeleteRef = this._dialog.open(template, {
      hasBackdrop: true,
      disableClose: true
    });
    dialogDeleteRef.afterClosed().subscribe((result) => {
      if (result === "true") {
        this.DeleteListItem();
      }
    });
  }
  DeleteListItem() {
    return __async(this, null, function* () {
      if (!this.EditList?.length) {
        this._snackBar.open("Kh\xF4ng c\xF3 m\u1EE5c n\xE0o \u0111\u01B0\u1EE3c ch\u1ECDn \u0111\u1EC3 x\xF3a", "", {
          duration: 2e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-warning"]
        });
        return;
      }
      this.isLoading.set(true);
      try {
        let successCount = 0;
        let errorCount = 0;
        for (const item of this.EditList) {
          try {
            yield this._ChotkhoService.deleteChotkho(item.id);
            successCount++;
          } catch (error) {
            console.error("Error deleting item:", error);
            errorCount++;
          }
        }
        this._snackBar.open(`X\xF3a th\xE0nh c\xF4ng ${successCount} ch\u1ED7 kho${errorCount > 0 ? `, ${errorCount} l\u1ED7i` : ""}`, "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        this.EditList = [];
        yield this._ChotkhoService.getAllChotkho(this.searchParam);
      } catch (error) {
        console.error("Error during bulk delete:", error);
        this._snackBar.open(`L\u1ED7i khi x\xF3a: ${error.message}`, "", {
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
  AddToEdit(item) {
    const existingItem = this.EditList.find((v) => v.id === item.id);
    if (existingItem) {
      this.EditList = this.EditList.filter((v) => v.id !== item.id);
    } else {
      this.EditList.push(item);
    }
  }
  CheckItemInEdit(item) {
    return this.EditList.some((v) => v.id === item.id);
  }
  goToDetail(item) {
    this.drawer.open();
    this._ChotkhoService.setChotkhoId(item.id);
    this._router.navigate(["admin/chotkho", item.id]);
  }
  trackByFn(index, item) {
    return item.id;
  }
  // Phương thức xuất báo cáo
  generateReport() {
    return __async(this, null, function* () {
      const statistics = yield this._ChotkhoService.getStatistics();
      if (statistics) {
        const report = yield this._ChotkhoService.generateReport({
          dateFrom: new Date(Date.now() - 30 * 24 * 60 * 60 * 1e3).toISOString(),
          dateTo: (/* @__PURE__ */ new Date()).toISOString(),
          format: "json"
        });
        if (report) {
          this._snackBar.open("B\xE1o c\xE1o \u0111\xE3 \u0111\u01B0\u1EE3c t\u1EA1o th\xE0nh c\xF4ng", "", {
            duration: 2e3,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-success"]
          });
          const blob = new Blob([JSON.stringify(report, null, 2)], {
            type: "application/json"
          });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `bao-cao-chot-kho-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.json`;
          a.click();
          window.URL.revokeObjectURL(url);
        }
      }
    });
  }
  // Phương thức cập nhật hàng loạt trạng thái
  bulkUpdateStatus(status) {
    return __async(this, null, function* () {
      if (this.EditList.length === 0) {
        this._snackBar.open("Vui l\xF2ng ch\u1ECDn \xEDt nh\u1EA5t m\u1ED9t m\u1EE5c", "", {
          duration: 2e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-warning"]
        });
        return;
      }
      const ids = this.EditList.map((item) => item.id);
      const success = yield this._ChotkhoService.bulkUpdateStatus(ids, status);
      if (success) {
        this.EditList = [];
        this._snackBar.open(`C\u1EADp nh\u1EADt tr\u1EA1ng th\xE1i th\xE0nh c\xF4ng cho ${ids.length} m\u1EE5c`, "", {
          duration: 2e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
      }
    });
  }
  // Phương thức hiển thị thống kê
  showStatistics() {
    return __async(this, null, function* () {
      const stats = yield this._ChotkhoService.getStatistics();
      if (stats) {
        const message = `
        T\u1ED5ng s\u1ED1: ${stats.total}
        \u0110ang ho\u1EA1t \u0111\u1ED9ng: ${stats.active}
        Kh\xF4ng ho\u1EA1t \u0111\u1ED9ng: ${stats.inactive}
        Ch\xEAnh l\u1EC7ch trung b\xECnh: ${stats.averageChenhLech?.toFixed(3) || 0}
      `;
        this._snackBar.open(message, "\u0110\xF3ng", {
          duration: 5e3,
          horizontalPosition: "center",
          verticalPosition: "top",
          panelClass: ["snackbar-info"]
        });
      }
    });
  }
  // Phương thức tìm kiếm nâng cao
  advancedSearch(criteria) {
    return __async(this, null, function* () {
      this.searchParam = __spreadValues(__spreadValues({}, this.searchParam), criteria);
      yield this._ChotkhoService.getAllChotkho(this.searchParam);
    });
  }
  // Phương thức refresh dữ liệu
  refreshData() {
    return __async(this, null, function* () {
      this.isSearch.set(false);
      this.searchParam = {};
      this.EditList = [];
      yield this._ChotkhoService.getAllChotkho();
      this._snackBar.open("D\u1EEF li\u1EC7u \u0111\xE3 \u0111\u01B0\u1EE3c l\xE0m m\u1EDBi", "", {
        duration: 1e3,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ["snackbar-success"]
      });
    });
  }
  // Phương thức làm mới dữ liệu thông minh
  smartRefresh() {
    return __async(this, null, function* () {
      this.isSearch.set(false);
      this.searchParam = {};
      this.EditList = [];
      const loadingSnackBar = this._snackBar.open("\u0110ang c\u1EADp nh\u1EADt d\u1EEF li\u1EC7u...", "", {
        duration: 0,
        horizontalPosition: "center",
        verticalPosition: "top",
        panelClass: ["snackbar-info"]
      });
      try {
        yield this._ChotkhoService.getAllChotkho();
        loadingSnackBar.dismiss();
        this._snackBar.open("D\u1EEF li\u1EC7u \u0111\xE3 \u0111\u01B0\u1EE3c c\u1EADp nh\u1EADt", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
      } catch (error) {
        loadingSnackBar.dismiss();
        this._snackBar.open("L\u1ED7i c\u1EADp nh\u1EADt d\u1EEF li\u1EC7u", "", {
          duration: 2e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      }
    });
  }
  // Phương thức import Excel
  importExcel(event) {
    return __async(this, null, function* () {
      const file = event.target.files[0];
      if (!file)
        return;
      const loadingSnackBar = this._snackBar.open("\u0110ang import d\u1EEF li\u1EC7u...", "", {
        duration: 0,
        horizontalPosition: "center",
        verticalPosition: "top",
        panelClass: ["snackbar-info"]
      });
      try {
        const result = yield this._ChotkhoService.importFromExcel(file, {
          validateData: true,
          skipDuplicates: true
        });
        loadingSnackBar.dismiss();
        if (result) {
          this._snackBar.open(`Import th\xE0nh c\xF4ng ${result.successCount}/${result.totalCount} b\u1EA3n ghi`, "", {
            duration: 3e3,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-success"]
          });
        }
      } catch (error) {
        loadingSnackBar.dismiss();
        this._snackBar.open("L\u1ED7i import file", "", {
          duration: 2e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      }
      event.target.value = "";
    });
  }
  // Phương thức backup
  createBackup(type = "full") {
    return __async(this, null, function* () {
      const loadingSnackBar = this._snackBar.open("\u0110ang t\u1EA1o backup...", "", {
        duration: 0,
        horizontalPosition: "center",
        verticalPosition: "top",
        panelClass: ["snackbar-info"]
      });
      try {
        const success = yield this._ChotkhoService.backupData(type);
        loadingSnackBar.dismiss();
        if (success) {
          this._snackBar.open("Backup th\xE0nh c\xF4ng", "", {
            duration: 2e3,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-success"]
          });
        }
      } catch (error) {
        loadingSnackBar.dismiss();
        this._snackBar.open("L\u1ED7i t\u1EA1o backup", "", {
          duration: 2e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      }
    });
  }
  // Phương thức tối ưu hóa
  optimizeSystem() {
    return __async(this, null, function* () {
      const loadingSnackBar = this._snackBar.open("\u0110ang t\u1ED1i \u01B0u h\xF3a h\u1EC7 th\u1ED1ng...", "", {
        duration: 0,
        horizontalPosition: "center",
        verticalPosition: "top",
        panelClass: ["snackbar-info"]
      });
      try {
        const result = yield this._ChotkhoService.optimizePerformance();
        loadingSnackBar.dismiss();
        if (result) {
          this._snackBar.open(`T\u1ED1i \u01B0u h\xF3a th\xE0nh c\xF4ng! C\u1EA3i thi\u1EC7n hi\u1EC7u su\u1EA5t`, "", {
            duration: 3e3,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-success"]
          });
        }
      } catch (error) {
        loadingSnackBar.dismiss();
        this._snackBar.open("L\u1ED7i t\u1ED1i \u01B0u h\xF3a", "", {
          duration: 2e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      }
    });
  }
  // Phương thức kiểm tra sức khỏe hệ thống
  checkSystemHealth() {
    return __async(this, null, function* () {
      try {
        const health = yield this._ChotkhoService.getSystemHealth();
        if (health) {
          const message = `
\u{1F3E5} S\u1EE8C KH\u1ECEE H\u1EC6 TH\u1ED0NG:
\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501
\u{1F4BE} Database: ${health.database?.status || "OK"}
\u{1F504} API: ${health.api?.responseTime || "< 100"}ms
\u{1F4CA} Memory: ${health.memory?.usage || "< 80"}%
\u{1F50B} CPU: ${health.cpu?.usage || "< 60"}%
\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501
        `;
          this._snackBar.open(message, "\u0110\xF3ng", {
            duration: 8e3,
            horizontalPosition: "center",
            verticalPosition: "top",
            panelClass: ["snackbar-info"]
          });
        }
      } catch (error) {
        this._snackBar.open("Kh\xF4ng th\u1EC3 ki\u1EC3m tra s\u1EE9c kh\u1ECFe h\u1EC7 th\u1ED1ng", "", {
          duration: 2e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      }
    });
  }
  // Phương thức tạo mẫu import
  downloadImportTemplate(type = "standard") {
    return __async(this, null, function* () {
      try {
        const success = yield this._ChotkhoService.generateImportTemplate(type);
        if (success) {
          this._snackBar.open("\u0110\xE3 t\u1EA3i xu\u1ED1ng m\u1EABu import", "", {
            duration: 2e3,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-success"]
          });
        }
      } catch (error) {
        this._snackBar.open("L\u1ED7i t\u1EA3i m\u1EABu import", "", {
          duration: 2e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      }
    });
  }
  // Phương thức export dữ liệu nâng cao
  exportAdvanced(format = "excel") {
    return __async(this, null, function* () {
      const loadingSnackBar = this._snackBar.open(`\u0110ang export ${format.toUpperCase()}...`, "", {
        duration: 0,
        horizontalPosition: "center",
        verticalPosition: "top",
        panelClass: ["snackbar-info"]
      });
      try {
        const success = yield this._ChotkhoService.exportData(format, __spreadProps(__spreadValues({}, this.searchParam), {
          selectedIds: this.EditList.map((item) => item.id),
          includeDetails: true
        }));
        loadingSnackBar.dismiss();
        if (success) {
          this._snackBar.open(`Export ${format.toUpperCase()} th\xE0nh c\xF4ng`, "", {
            duration: 2e3,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-success"]
          });
        }
      } catch (error) {
        loadingSnackBar.dismiss();
        this._snackBar.open(`L\u1ED7i export ${format.toUpperCase()}`, "", {
          duration: 2e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      }
    });
  }
  // Phương thức kiểm tra chênh lệch thông minh
  smartCheckChenhLech() {
    return __async(this, null, function* () {
      if (!this.validateBeforeAction(this.EditList, "ki\u1EC3m tra ch\xEAnh l\u1EC7ch")) {
        return;
      }
      const loadingSnackBar = this._snackBar.open("\u0110ang ki\u1EC3m tra ch\xEAnh l\u1EC7ch...", "", {
        duration: 0,
        horizontalPosition: "center",
        verticalPosition: "top",
        panelClass: ["snackbar-info"]
      });
      try {
        const results = [];
        for (const item of this.EditList) {
          const result = yield this._ChotkhoService.smartCheckChenhLech(item.id);
          if (result) {
            results.push(result);
          }
        }
        loadingSnackBar.dismiss();
        const totalChenhLech = results.reduce((sum, r) => sum + (r.chenhLech || 0), 0);
        this._snackBar.open(`Ki\u1EC3m tra ho\xE0n t\u1EA5t. T\u1ED5ng ch\xEAnh l\u1EC7ch: ${totalChenhLech}`, "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: totalChenhLech === 0 ? ["snackbar-success"] : ["snackbar-warning"]
        });
        yield this.smartRefresh();
      } catch (error) {
        loadingSnackBar.dismiss();
        this.handleOperationError("ki\u1EC3m tra ch\xEAnh l\u1EC7ch", error);
      }
    });
  }
  // Phương thức xử lý lỗi thông minh
  handleOperationError(operation, error) {
    console.error(`L\u1ED7i ${operation}:`, error);
    this._snackBar.open(`C\xF3 l\u1ED7i x\u1EA3y ra khi ${operation}`, "Th\u1EED l\u1EA1i", {
      duration: 5e3,
      horizontalPosition: "end",
      verticalPosition: "top",
      panelClass: ["snackbar-error"]
    }).onAction().subscribe(() => {
      this.smartRefresh();
    });
  }
  // Phương thức validate before action
  validateBeforeAction(items, action) {
    if (items.length === 0) {
      this._snackBar.open(`Vui l\xF2ng ch\u1ECDn \xEDt nh\u1EA5t m\u1ED9t m\u1EE5c \u0111\u1EC3 ${action}`, "", {
        duration: 2e3,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ["snackbar-warning"]
      });
      return false;
    }
    return true;
  }
  // Phương thức cập nhật pageSize thông minh
  onPageSizeChange(size, menuHienthi) {
    const maxSize = this.total();
    const finalSize = size > maxSize ? maxSize : size;
    if (size > maxSize) {
      this._snackBar.open(`S\u1ED1 l\u01B0\u1EE3ng t\u1ED1i \u0111a ${maxSize}`, "", {
        duration: 1e3,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ["snackbar-warning"]
      });
    }
    this._ChotkhoService.pageSize.set(finalSize);
    this._ChotkhoService.page.set(1);
    this._ChotkhoService.getAllChotkho(this.searchParam);
    menuHienthi.closeMenu();
  }
  // Phương thức chuyển trang được tối ưu
  onPreviousPage() {
    return __async(this, null, function* () {
      if (this.page() > 1) {
        this._ChotkhoService.page.set(this.page() - 1);
        yield this._ChotkhoService.getAllChotkho(this.searchParam);
      }
    });
  }
  onNextPage() {
    return __async(this, null, function* () {
      if (this.page() < this.totalPages()) {
        this._ChotkhoService.page.set(this.page() + 1);
        yield this._ChotkhoService.getAllChotkho(this.searchParam);
      }
    });
  }
  // Enhanced dialog methods for template compatibility
  onFileSelected(event) {
    const file = event.target.files[0];
    if (file && (file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file.type === "application/vnd.ms-excel")) {
      this.selectedFile = file;
    } else {
      this._snackBar.open("Please select a valid Excel file (.xlsx or .xls)", "Close", { duration: 3e3 });
    }
  }
  onBackupFileSelected(event) {
    const file = event.target.files[0];
    if (file && file.name.endsWith(".backup")) {
      this.selectedBackupFile = file;
    } else {
      this._snackBar.open("Please select a valid backup file (.backup)", "Close", { duration: 3e3 });
    }
  }
  // Enhanced import method with progress
  startImport() {
    return __async(this, null, function* () {
      if (!this.selectedFile)
        return;
      this.importProgress = 0;
      const progressInterval = setInterval(() => {
        this.importProgress += 5;
        if (this.importProgress >= 95) {
          clearInterval(progressInterval);
        }
      }, 100);
      try {
        yield this._ChotkhoService.importFromExcel(this.selectedFile, {});
        this.importProgress = 100;
        setTimeout(() => {
          this.importProgress = 0;
          this.selectedFile = null;
          this._dialog.closeAll();
        }, 500);
      } catch (error) {
        clearInterval(progressInterval);
        this.importProgress = 0;
        this.handleOperationError("Import failed", error);
      }
    });
  }
  // Enhanced export method with progress  
  startExport() {
    return __async(this, null, function* () {
      this.exportProgress = 0;
      const progressInterval = setInterval(() => {
        this.exportProgress += 8;
        if (this.exportProgress >= 95) {
          clearInterval(progressInterval);
        }
      }, 150);
      try {
        yield this.exportExcel();
        this.exportProgress = 100;
        setTimeout(() => {
          this.exportProgress = 0;
          this._dialog.closeAll();
        }, 500);
      } catch (error) {
        clearInterval(progressInterval);
        this.exportProgress = 0;
        this.handleOperationError("Export failed", error);
      }
    });
  }
  // Enhanced backup method with progress
  startBackup() {
    return __async(this, null, function* () {
      if (!this.backupName) {
        this._snackBar.open("Please enter a backup name", "Close", { duration: 3e3 });
        return;
      }
      this.backupProgress = 0;
      const progressInterval = setInterval(() => {
        this.backupProgress += 6;
        if (this.backupProgress >= 95) {
          clearInterval(progressInterval);
        }
      }, 200);
      try {
        yield this._ChotkhoService.backupData(this.backupType);
        this.backupProgress = 100;
        setTimeout(() => {
          this.backupProgress = 0;
          this.backupName = "";
          this._dialog.closeAll();
        }, 500);
      } catch (error) {
        clearInterval(progressInterval);
        this.backupProgress = 0;
        this.handleOperationError("Backup failed", error);
      }
    });
  }
  // Enhanced restore method with progress
  startRestore() {
    return __async(this, null, function* () {
      if (!this.selectedBackupFile) {
        this._snackBar.open("Please select a backup file", "Close", { duration: 3e3 });
        return;
      }
      this.backupProgress = 0;
      const progressInterval = setInterval(() => {
        this.backupProgress += 7;
        if (this.backupProgress >= 95) {
          clearInterval(progressInterval);
        }
      }, 180);
      try {
        yield this._ChotkhoService.restoreFromBackup(this.selectedBackupFile);
        this.backupProgress = 100;
        setTimeout(() => {
          this.backupProgress = 0;
          this.selectedBackupFile = null;
          this._dialog.closeAll();
        }, 500);
      } catch (error) {
        clearInterval(progressInterval);
        this.backupProgress = 0;
        this.handleOperationError("Restore failed", error);
      }
    });
  }
  // Export method implementation
  exportExcel() {
    return __async(this, null, function* () {
      try {
        let dataToExport = [];
        switch (this.exportType) {
          case "all":
            dataToExport = this.Listchotkho();
            break;
          case "filtered":
            dataToExport = this.dataSource.filteredData;
            break;
          case "selected":
            dataToExport = this.EditList;
            break;
          default:
            dataToExport = this.Listchotkho();
        }
        yield this._ChotkhoService.exportData("excel", { data: dataToExport });
        this._snackBar.open("Export completed successfully", "Close", { duration: 3e3 });
      } catch (error) {
        this.handleOperationError("Export failed", error);
      }
    });
  }
  // Clear cache method implementation
  clearAllCacheMethod() {
    return __async(this, null, function* () {
      try {
        if ("caches" in window) {
          const cacheNames = yield caches.keys();
          yield Promise.all(cacheNames.map((name) => caches.delete(name)));
        }
        const keys = Object.keys(localStorage);
        keys.forEach((key) => {
          if (key.includes("chotkho") || key.includes("Chotkho")) {
            localStorage.removeItem(key);
          }
        });
        yield this.smartRefresh();
        this._snackBar.open("Cache cleared successfully", "Close", { duration: 3e3 });
      } catch (error) {
        this.handleOperationError("Clear cache failed", error);
      }
    });
  }
  // Method aliases for template compatibility  
  importFromExcel() {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".xlsx,.xls";
    fileInput.onchange = (event) => this.importExcel(event);
    fileInput.click();
  }
  exportToExcel() {
    this.exportAdvanced("excel");
  }
  restoreFromBackup() {
    this.isRestoreMode = true;
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".backup";
    fileInput.onchange = (event) => {
      this.onBackupFileSelected(event);
      if (this.selectedBackupFile) {
        this.startRestore();
      }
    };
    fileInput.click();
  }
  clearAllCache() {
    this.clearAllCacheMethod();
  }
  /**
   * Toggle all items selection
   */
  ToggleAll() {
    if (this.EditList.length === this.dataSource.filteredData.length) {
      this.EditList = [];
    } else {
      this.EditList = [...this.dataSource.filteredData];
    }
  }
  static \u0275fac = function ListChotkhoComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ListChotkhoComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ListChotkhoComponent, selectors: [["app-listchotkho"]], viewQuery: function ListChotkhoComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(MatPaginator, 5);
      \u0275\u0275viewQuery(MatSort, 5);
      \u0275\u0275viewQuery(_c0, 7);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.paginator = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.sort = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.drawer = _t.first);
    }
  }, decls: 82, vars: 20, consts: [["drawer", ""], ["menuHienthi", "matMenuTrigger"], ["menu1", "matMenu"], ["DeleteDialog", ""], ["ImportDialog", ""], ["ExportDialog", ""], ["BackupDialog", ""], ["HealthDialog", ""], ["menu", "matMenu"], ["autosize", "", 1, "w-full", "h-full"], ["mode", "over", 1, "flex", "flex-col", "!w-full", "h-full", 3, "position"], [1, "flex", "flex-col", "space-y-2", "h-screen-16", "w-full", "p-2"], [1, "p-2", "cursor-pointer", "w-full", "relative", "flex", "lg:flex-row", "lg:space-y-2", "space-y-0", "flex-col", "space-x-2", "justify-between", "items-center", "bg-white", "rounded-lg"], [1, "w-full", "flex", "flex-col", "gap-2", "lg:flex-row", "lg:items-center", "lg:justify-between"], [1, "flex", "flex-row", "space-x-2", "items-center"], [1, "relative", "w-full"], ["type", "text", "placeholder", "T\xECm Ki\u1EBFm...", 1, "block", "w-full", "pl-10", "pr-4", "py-2", "text-gray-700", "bg-white", "border", "border-gray-300", "rounded-lg", "focus:border-blue-400", "focus:ring-blue-400", "focus:outline-none", "focus:ring", "focus:ring-opacity-40", 3, "keyup"], [1, "absolute", "inset-y-0", "left-0", "flex", "items-center", "pl-3", "pointer-events-none"], [1, "material-symbols-outlined", "text-gray-500"], ["color", "primary", "matTooltip", "Th\xEAm m\u1EDBi", "mat-flat-button", "", 1, "flex", "flex-row", "items-center", 3, "click"], [1, "whitespace-nowrap"], ["color", "accent", "matTooltip", "Ch\u1ECDn/B\u1ECF ch\u1ECDn t\u1EA5t c\u1EA3", "mat-flat-button", "", 1, "flex", "flex-row", "items-center", "whitespace-nowrap", 3, "click"], ["class", "flex flex-row items-center", "color", "warn", "matTooltip", "Xo\xE1", "mat-flat-button", "", 3, "disabled", "click", 4, "ngIf"], ["color", "accent", "matTooltip", "Smart Refresh", "mat-flat-button", "", 1, "flex", "flex-row", "items-center", 3, "click", "disabled"], [1, "w-full", "flex", "flex-row", "space-x-4", "justify-end", "items-center"], [1, "flex", "items-center", "text-center"], [1, "flex", "items-center", "justify-center"], [1, "flex", "flex-row", "space-x-2", "justify-center", "items-center"], [1, "font-bold", "text-blue-600", 3, "matMenuTriggerFor"], [1, "w-full", "flex", "flex-row", "space-x-2", "p-4", 3, "click"], ["appearance", "outline", "subscriptSizing", "dynamic"], ["matInput", "", "placeholder", "Vui l\xF2ng Nh\u1EADp S\u1ED1 L\u01B0\u1EE3ng", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["mat-icon-button", "", "color", "primary", 3, "click"], [1, "flex", "flex-row", "items-center"], ["mat-icon-button", "", "color", "primary", 3, "click", "disabled"], [1, "w-full", "h-full", "overflow-auto"], ["mat-table", "", "matSort", "", 1, "!border", "w-full", "cursor-pointer", 3, "dataSource"], [3, "matColumnDef"], ["mat-header-row", "", 4, "matHeaderRowDef", "matHeaderRowDefSticky"], ["class", "border", "mat-row", "", 3, "class", "click", 4, "matRowDef", "matRowDefColumns"], ["class", "mat-row border", 4, "matNoDataRow"], ["color", "warn", "matTooltip", "Xo\xE1", "mat-flat-button", "", 1, "flex", "flex-row", "items-center", 3, "click", "disabled"], [1, "animate-spin"], ["mat-header-cell", "", 1, "flex", "!border", "!bg-slate-100", "justify-center"], ["mat-header-cell", "", "mat-sort-header", "", 1, "!border", "whitespace-nowrap", "!bg-slate-100"], ["class", "border", "mat-cell", "", 4, "matCellDef"], ["class", "flex !border !bg-slate-100 justify-center", "mat-header-cell", "", 4, "matHeaderCellDef"], ["matTooltip", "\u1EA8n hi\u1EC7n c\u1ED9t", "mat-icon-button", "", "color", "primary", 3, "matMenuTriggerFor"], [1, "flex", "flex-row", "space-x-2", "items-center", "p-4"], ["appearance", "outline", "subscriptSizing", "dynamic", 1, "w-full"], ["matInput", "", "placeholder", "T\xECm Ki\u1EBFm", 3, "input", "click"], ["matPrefix", ""], [1, "flex", "flex-col", "max-h-80", "overflow-auto"], ["mat-menu-item", "", 3, "disabled"], ["mat-menu-item", ""], ["mat-menu-item", "", 3, "click", "disabled"], ["mat-menu-item", "", 3, "click"], ["class", "!border whitespace-nowrap !bg-slate-100", "mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], [1, "max-w-40", "line-clamp-4", "me-4"], [3, "OutFilter", "icon", "ListItem", "fieldsearch", "ListFilter", "filterItem"], ["mat-cell", "", 1, "border"], [1, "max-w-40", "line-clamp-4", "font-bold", "text-blue-600"], [1, "flex", "justify-center", "items-center", "font-bold", "text-blue-600"], [1, "max-w-40", "line-clamp-4"], [1, "max-w-40", "line-clamp-4", "text-center"], [1, "max-w-40", "line-clamp-4", "font-bold", "text-blue-600", 3, "click"], [1, "flex", "justify-center", "items-center", "font-bold", "text-blue-600", 3, "click"], [1, "bg-blue-100", "text-blue-800"], [1, "text-green-500"], [1, "text-red-500"], ["mat-header-row", ""], ["mat-row", "", 1, "border", 3, "click"], [1, "mat-row", "border"], ["colspan", "4", 1, "mat-cell", "p-4"], [1, "flex", "flex-col", "space-y-8", "items-center", "justify-center"], [1, "font-bold"], [1, "flex", "flex-row", "space-x-2", "items-center", "justify-center"], ["mat-flat-button", "", "color", "primary", "mat-dialog-close", "true"], ["mat-flat-button", "", "color", "warn", "mat-dialog-close", "false"], [1, "flex", "flex-col", "space-y-4", "min-w-80"], [1, "font-bold", "text-center"], [1, "flex", "flex-col", "space-y-2"], ["type", "file", "accept", ".xlsx,.xls", 1, "block", "w-full", "text-sm", "text-gray-500", "file:mr-4", "file:py-2", "file:px-4", "file:rounded-full", "file:border-0", "file:text-sm", "file:font-semibold", "file:bg-blue-50", "file:text-blue-700", "hover:file:bg-blue-100", 3, "change"], ["class", "flex flex-col space-y-2", 4, "ngIf"], [1, "flex", "flex-row", "space-x-2", "justify-center"], ["mat-flat-button", "", "color", "primary", 3, "click", "disabled"], ["mat-flat-button", "", "color", "warn", "mat-dialog-close", ""], ["mode", "determinate", 3, "value"], [1, "text-sm", "text-center"], ["appearance", "outline"], [3, "valueChange", "value"], ["value", "all"], ["value", "filtered"], ["value", "selected"], ["value", "full"], ["value", "incremental"], ["matInput", "", "placeholder", "Enter backup name", 3, "ngModelChange", "ngModel"], ["type", "file", "accept", ".backup", 1, "block", "w-full", "text-sm", "text-gray-500", "file:mr-4", "file:py-2", "file:px-4", "file:rounded-full", "file:border-0", "file:text-sm", "file:font-semibold", "file:bg-green-50", "file:text-green-700", "hover:file:bg-green-100", 3, "change"], [1, "flex", "flex-col", "space-y-4", "min-w-96"], ["class", "flex flex-col space-y-3", 4, "ngIf"], ["mat-flat-button", "", "color", "primary", 3, "click"], [1, "flex", "flex-col", "space-y-3"], [1, "flex", "justify-between", "items-center", "p-2", "rounded", 3, "ngClass"], [1, "font-medium"], [1, "flex", "items-center", "space-x-2"], [3, "ngClass"], [1, "text-sm"], [1, "flex", "justify-between", "items-center", "p-2", "rounded", "bg-blue-50"], [1, "p-6"], [1, "text-xl", "font-semibold", "text-gray-800", "mb-4"], [1, "text-gray-600", "mb-6"], [1, "flex", "flex-row", "space-x-3", "justify-end"]], template: function ListChotkhoComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "mat-drawer-container", 9)(1, "mat-drawer", 10, 0);
      \u0275\u0275element(3, "router-outlet");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 11)(5, "div", 12)(6, "div", 13)(7, "div", 14)(8, "div", 15)(9, "input", 16);
      \u0275\u0275listener("keyup", function ListChotkhoComponent_Template_input_keyup_9_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.applyFilter($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "div", 17)(11, "span", 18);
      \u0275\u0275text(12, "search");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(13, "button", 19);
      \u0275\u0275listener("click", function ListChotkhoComponent_Template_button_click_13_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.create());
      });
      \u0275\u0275elementStart(14, "mat-icon");
      \u0275\u0275text(15, "add_circle");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "span", 20);
      \u0275\u0275text(17, "T\u1EA1o M\u1EDBi");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(18, "button", 21);
      \u0275\u0275listener("click", function ListChotkhoComponent_Template_button_click_18_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.ToggleAll());
      });
      \u0275\u0275elementStart(19, "mat-icon");
      \u0275\u0275text(20, "checklist");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "span", 20);
      \u0275\u0275text(22);
      \u0275\u0275elementEnd()();
      \u0275\u0275template(23, ListChotkhoComponent_button_23_Template, 5, 3, "button", 22);
      \u0275\u0275elementStart(24, "button", 23);
      \u0275\u0275listener("click", function ListChotkhoComponent_Template_button_click_24_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.smartRefresh());
      });
      \u0275\u0275elementStart(25, "mat-icon");
      \u0275\u0275text(26, "refresh");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "span", 20);
      \u0275\u0275text(28, "Refresh");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(29, "div", 24)(30, "div", 25)(31, "strong");
      \u0275\u0275text(32);
      \u0275\u0275elementEnd();
      \u0275\u0275text(33, " - ");
      \u0275\u0275elementStart(34, "strong");
      \u0275\u0275text(35);
      \u0275\u0275elementEnd();
      \u0275\u0275text(36);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "div", 26)(38, "span");
      \u0275\u0275text(39);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "span");
      \u0275\u0275text(41, "Trang");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(42, "div", 27)(43, "span", 28, 1);
      \u0275\u0275text(45);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(46, "mat-menu", null, 2)(48, "div", 29);
      \u0275\u0275listener("click", function ListChotkhoComponent_Template_div_click_48_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView($event.stopPropagation());
      });
      \u0275\u0275elementStart(49, "mat-form-field", 30)(50, "mat-label");
      \u0275\u0275text(51, "S\u1ED1 l\u01B0\u1EE3ng");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(52, "input", 31);
      \u0275\u0275twoWayListener("ngModelChange", function ListChotkhoComponent_Template_input_ngModelChange_52_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.pageSize, $event) || (ctx.pageSize = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(53, "button", 32);
      \u0275\u0275listener("click", function ListChotkhoComponent_Template_button_click_53_listener() {
        \u0275\u0275restoreView(_r1);
        const menuHienthi_r5 = \u0275\u0275reference(44);
        return \u0275\u0275resetView(ctx.onPageSizeChange(ctx.pageSize(), menuHienthi_r5));
      });
      \u0275\u0275elementStart(54, "mat-icon");
      \u0275\u0275text(55, "published_with_changes");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(56, "div", 33)(57, "button", 34);
      \u0275\u0275listener("click", function ListChotkhoComponent_Template_button_click_57_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onPreviousPage());
      });
      \u0275\u0275elementStart(58, "mat-icon");
      \u0275\u0275text(59, "keyboard_arrow_left");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(60, "button", 34);
      \u0275\u0275listener("click", function ListChotkhoComponent_Template_button_click_60_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onNextPage());
      });
      \u0275\u0275elementStart(61, "mat-icon");
      \u0275\u0275text(62, "keyboard_arrow_right");
      \u0275\u0275elementEnd()()()()()();
      \u0275\u0275elementStart(63, "div", 35)(64, "table", 36);
      \u0275\u0275repeaterCreate(65, ListChotkhoComponent_For_66_Template, 4, 2, "ng-container", 37, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275template(67, ListChotkhoComponent_tr_67_Template, 1, 0, "tr", 38)(68, ListChotkhoComponent_tr_68_Template, 1, 3, "tr", 39)(69, ListChotkhoComponent_tr_69_Template, 3, 0, "tr", 40);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275template(70, ListChotkhoComponent_ng_template_70_Template, 11, 0, "ng-template", null, 3, \u0275\u0275templateRefExtractor)(72, ListChotkhoComponent_ng_template_72_Template, 12, 2, "ng-template", null, 4, \u0275\u0275templateRefExtractor)(74, ListChotkhoComponent_ng_template_74_Template, 21, 3, "ng-template", null, 5, \u0275\u0275templateRefExtractor)(76, ListChotkhoComponent_ng_template_76_Template, 12, 6, "ng-template", null, 6, \u0275\u0275templateRefExtractor)(78, ListChotkhoComponent_ng_template_78_Template, 10, 1, "ng-template", null, 7, \u0275\u0275templateRefExtractor)(80, ListChotkhoComponent_ng_template_80_Template, 10, 1, "ng-template", null, 3, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      const menu1_r25 = \u0275\u0275reference(47);
      \u0275\u0275advance();
      \u0275\u0275property("position", "end");
      \u0275\u0275advance(21);
      \u0275\u0275textInterpolate(ctx.EditList.length > 0 ? "B\u1ECF ch\u1ECDn" : "Ch\u1ECDn t\u1EA5t c\u1EA3");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.EditList.length > 0);
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.isRefreshing);
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate((ctx.page() - 1) * ctx.pageSize() + 1);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.page() * ctx.pageSize() > ctx.total() ? ctx.total() : ctx.page() * ctx.pageSize());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" / ", ctx.total(), " m\u1EE5c ");
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate2("", ctx.page(), "/", ctx.totalPages(), " ");
      \u0275\u0275advance(4);
      \u0275\u0275property("matMenuTriggerFor", menu1_r25);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("", ctx.pageSize(), " m\u1EE5c");
      \u0275\u0275advance(7);
      \u0275\u0275twoWayProperty("ngModel", ctx.pageSize);
      \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(19, _c1));
      \u0275\u0275advance(5);
      \u0275\u0275property("disabled", ctx.page() === 1);
      \u0275\u0275advance(3);
      \u0275\u0275property("disabled", ctx.page() === ctx.totalPages());
      \u0275\u0275advance(4);
      \u0275\u0275property("dataSource", ctx.dataSource);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.displayedColumns);
      \u0275\u0275advance(2);
      \u0275\u0275property("matHeaderRowDef", ctx.displayedColumns)("matHeaderRowDefSticky", true);
      \u0275\u0275advance();
      \u0275\u0275property("matRowDefColumns", ctx.displayedColumns);
    }
  }, dependencies: [
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatPrefix,
    MatInputModule,
    MatInput,
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
    MatPaginatorModule,
    MatMenuModule,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatSidenavModule,
    MatDrawer,
    MatDrawerContainer,
    RouterOutlet,
    MatIconModule,
    MatIcon,
    MatButtonModule,
    MatButton,
    MatIconButton,
    MatSelectModule,
    MatSelect,
    MatOption,
    CommonModule,
    NgClass,
    NgIf,
    DatePipe,
    FormsModule,
    DefaultValueAccessor,
    NgControlStatus,
    NgModel,
    MatTooltipModule,
    MatTooltip,
    MatDialogModule,
    MatDialogClose,
    MatDialogContent,
    MatChipsModule,
    MatChip,
    SearchfilterComponent,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatProgressBar,
    MatCheckboxModule
  ], encapsulation: 2, changeDetection: 0 });
};
__decorate([
  Debounce(500)
], ListChotkhoComponent.prototype, "applyFilter", null);
__decorate([
  memoize()
], ListChotkhoComponent.prototype, "FilterHederColumn", null);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ListChotkhoComponent, { className: "ListChotkhoComponent", filePath: "src/app/admin/chotkho/listchotkho/listchotkho.ts", lineNumber: 55 });
})();

export {
  ListChotkhoComponent
};
//# sourceMappingURL=chunk-J7FLPRQ3.js.map
