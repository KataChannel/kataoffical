import './polyfills.server.mjs';
import {
  LoaiPhongban,
  LoaiPhongbanLabels
} from "./chunk-2EKXLKV7.mjs";
import {
  PhongbanService
} from "./chunk-HKPRFTZ7.mjs";
import {
  MatPaginator,
  MatPaginatorModule
} from "./chunk-XJHVYA25.mjs";
import {
  MatSort,
  MatSortHeader,
  MatSortModule
} from "./chunk-RT23KED7.mjs";
import {
  MatMenu,
  MatMenuItem,
  MatMenuModule,
  MatMenuTrigger
} from "./chunk-JNHRISVT.mjs";
import {
  Router
} from "./chunk-HRPVH7WR.mjs";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
  MatTableModule
} from "./chunk-VF45CXPP.mjs";
import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-HAGRL2CT.mjs";
import "./chunk-ZYFSGH3S.mjs";
import "./chunk-BKGWM7TB.mjs";
import {
  MatChip,
  MatChipsModule
} from "./chunk-UMQUK2UX.mjs";
import {
  MatTooltip,
  MatTooltipModule
} from "./chunk-LPLDGY7B.mjs";
import {
  MatDialog,
  MatDialogModule
} from "./chunk-E2GALVII.mjs";
import {
  MatSelect,
  MatSelectModule
} from "./chunk-GDGUHJEW.mjs";
import {
  MatInput,
  MatInputModule
} from "./chunk-UCMTPX2K.mjs";
import {
  FormsModule,
  MatFormField,
  MatFormFieldModule,
  MatLabel,
  MatPrefix,
  MatSuffix
} from "./chunk-VDRWKQ4T.mjs";
import "./chunk-Q2CU4U3P.mjs";
import {
  MatCard,
  MatCardContent,
  MatCardModule
} from "./chunk-CVXRITNT.mjs";
import {
  MatIcon,
  MatIconModule
} from "./chunk-27SFIHK6.mjs";
import {
  MatSnackBar
} from "./chunk-DZ43XGSB.mjs";
import "./chunk-BRLSQF3K.mjs";
import "./chunk-3B3VS2W4.mjs";
import {
  MatButton,
  MatButtonModule,
  MatIconButton
} from "./chunk-RDBGA3AP.mjs";
import {
  MatOption
} from "./chunk-KWDBPYQT.mjs";
import "./chunk-7GASYLAT.mjs";
import "./chunk-Y3VBDLFR.mjs";
import {
  CommonModule
} from "./chunk-VNUZ7HP6.mjs";
import {
  computed,
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
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
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-6NXY6CBU.mjs";
import "./chunk-QS2IQGEQ.mjs";
import {
  __async
} from "./chunk-FMEBT56H.mjs";

// src/app/admin/phongban/listphongban/listphongban.component.ts
var _c0 = () => [1, 2, 3];
var _c1 = () => [10, 25, 50, 100];
function ListPhongbanComponent_For_55_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card", 11)(1, "mat-card-content")(2, "div", 33)(3, "mat-icon");
    \u0275\u0275text(4, "layers");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 13)(6, "div", 14);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 15);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const level_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r2.stats().byLevel[level_r2]);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("C\u1EA5p ", level_r2, "");
  }
}
function ListPhongbanComponent_For_55_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, ListPhongbanComponent_For_55_Conditional_0_Template, 10, 2, "mat-card", 11);
  }
  if (rf & 2) {
    const level_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r2.stats().byLevel[level_r2] ? 0 : -1);
  }
}
function ListPhongbanComponent_Conditional_65_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 34);
    \u0275\u0275listener("click", function ListPhongbanComponent_Conditional_65_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      ctx_r2.searchText.set("");
      return \u0275\u0275resetView(ctx_r2.updateDataSource());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "close");
    \u0275\u0275elementEnd()();
  }
}
function ListPhongbanComponent_For_73_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 26);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const loai_r5 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("value", loai_r5);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.loaiPhongbanLabels[loai_r5]);
  }
}
function ListPhongbanComponent_Conditional_86_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 35);
    \u0275\u0275listener("click", function ListPhongbanComponent_Conditional_86_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.clearFilters());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "clear");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " X\xF3a b\u1ED9 l\u1ECDc ");
    \u0275\u0275elementEnd();
  }
}
function ListPhongbanComponent_Conditional_89_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29);
    \u0275\u0275element(1, "mat-spinner", 36);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "\u0110ang t\u1EA3i d\u1EEF li\u1EC7u...");
    \u0275\u0275elementEnd()();
  }
}
function ListPhongbanComponent_Conditional_90_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 30)(1, "mat-icon", 37);
    \u0275\u0275text(2, "error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 6);
    \u0275\u0275listener("click", function ListPhongbanComponent_Conditional_90_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onRefresh());
    });
    \u0275\u0275text(6, "Th\u1EED l\u1EA1i");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.error());
  }
}
function ListPhongbanComponent_Conditional_91_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 31)(1, "mat-icon");
    \u0275\u0275text(2, "inbox");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 6);
    \u0275\u0275listener("click", function ListPhongbanComponent_Conditional_91_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onCreate());
    });
    \u0275\u0275text(6, "Th\xEAm ph\xF2ng ban \u0111\u1EA7u ti\xEAn");
    \u0275\u0275elementEnd()();
  }
}
function ListPhongbanComponent_Conditional_92_th_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 54);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.columnLabels["stt"]);
  }
}
function ListPhongbanComponent_Conditional_92_td_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 55);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const i_r9 = ctx.index;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(i_r9 + 1);
  }
}
function ListPhongbanComponent_Conditional_92_th_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 56);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.columnLabels["ma"]);
  }
}
function ListPhongbanComponent_Conditional_92_td_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 55)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r10 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r10.ma);
  }
}
function ListPhongbanComponent_Conditional_92_th_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 56);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.columnLabels["ten"]);
  }
}
function ListPhongbanComponent_Conditional_92_td_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 55)(1, "div", 57)(2, "mat-icon", 58);
    \u0275\u0275text(3, "business");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const row_r11 = ctx.$implicit;
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(row_r11.ten);
  }
}
function ListPhongbanComponent_Conditional_92_th_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 56);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.columnLabels["lo\u1EA1i"]);
  }
}
function ListPhongbanComponent_Conditional_92_td_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 55)(1, "mat-chip", 59);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r12 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("color", ctx_r2.getLoaiColor(row_r12.loai));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.getLoaiLabel(row_r12.loai), " ");
  }
}
function ListPhongbanComponent_Conditional_92_th_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 56);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.columnLabels["level"]);
  }
}
function ListPhongbanComponent_Conditional_92_td_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 55)(1, "mat-chip", 60)(2, "mat-icon");
    \u0275\u0275text(3, "layers");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r13 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("color", ctx_r2.getLevelColor(row_r13.level));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", row_r13.level, " ");
  }
}
function ListPhongbanComponent_Conditional_92_th_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 54);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.columnLabels["parent"]);
  }
}
function ListPhongbanComponent_Conditional_92_td_19_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 61);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r14 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(row_r14.parent.ten);
  }
}
function ListPhongbanComponent_Conditional_92_td_19_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 62);
    \u0275\u0275text(1, "-");
    \u0275\u0275elementEnd();
  }
}
function ListPhongbanComponent_Conditional_92_td_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 55);
    \u0275\u0275template(1, ListPhongbanComponent_Conditional_92_td_19_Conditional_1_Template, 2, 1, "span", 61)(2, ListPhongbanComponent_Conditional_92_td_19_Conditional_2_Template, 2, 0, "span", 62);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r14 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(row_r14.parent ? 1 : 2);
  }
}
function ListPhongbanComponent_Conditional_92_th_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 54);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.columnLabels["nhanvienCount"]);
  }
}
function ListPhongbanComponent_Conditional_92_td_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 55)(1, "div", 63)(2, "mat-icon");
    \u0275\u0275text(3, "people");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const row_r15 = ctx.$implicit;
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate((row_r15._count == null ? null : row_r15._count.nhanviens) || 0);
  }
}
function ListPhongbanComponent_Conditional_92_th_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 54);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.columnLabels["childrenCount"]);
  }
}
function ListPhongbanComponent_Conditional_92_td_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 55)(1, "div", 63)(2, "mat-icon");
    \u0275\u0275text(3, "account_tree");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const row_r16 = ctx.$implicit;
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate((row_r16._count == null ? null : row_r16._count.children) || 0);
  }
}
function ListPhongbanComponent_Conditional_92_th_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 54);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.columnLabels["actions"]);
  }
}
function ListPhongbanComponent_Conditional_92_td_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 55)(1, "div", 64)(2, "button", 65);
    \u0275\u0275listener("click", function ListPhongbanComponent_Conditional_92_td_28_Template_button_click_2_listener() {
      const row_r18 = \u0275\u0275restoreView(_r17).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.onView(row_r18));
    });
    \u0275\u0275elementStart(3, "mat-icon");
    \u0275\u0275text(4, "visibility");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "button", 66);
    \u0275\u0275listener("click", function ListPhongbanComponent_Conditional_92_td_28_Template_button_click_5_listener() {
      const row_r18 = \u0275\u0275restoreView(_r17).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.onEdit(row_r18));
    });
    \u0275\u0275elementStart(6, "mat-icon");
    \u0275\u0275text(7, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "button", 67);
    \u0275\u0275listener("click", function ListPhongbanComponent_Conditional_92_td_28_Template_button_click_8_listener() {
      const row_r18 = \u0275\u0275restoreView(_r17).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.onDelete(row_r18));
    });
    \u0275\u0275elementStart(9, "mat-icon");
    \u0275\u0275text(10, "delete");
    \u0275\u0275elementEnd()()()();
  }
}
function ListPhongbanComponent_Conditional_92_tr_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 68);
  }
}
function ListPhongbanComponent_Conditional_92_tr_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 69);
  }
}
function ListPhongbanComponent_Conditional_92_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 32)(1, "table", 38);
    \u0275\u0275elementContainerStart(2, 39);
    \u0275\u0275template(3, ListPhongbanComponent_Conditional_92_th_3_Template, 2, 1, "th", 40)(4, ListPhongbanComponent_Conditional_92_td_4_Template, 2, 1, "td", 41);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(5, 42);
    \u0275\u0275template(6, ListPhongbanComponent_Conditional_92_th_6_Template, 2, 1, "th", 43)(7, ListPhongbanComponent_Conditional_92_td_7_Template, 3, 1, "td", 41);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(8, 44);
    \u0275\u0275template(9, ListPhongbanComponent_Conditional_92_th_9_Template, 2, 1, "th", 43)(10, ListPhongbanComponent_Conditional_92_td_10_Template, 6, 1, "td", 41);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(11, 45);
    \u0275\u0275template(12, ListPhongbanComponent_Conditional_92_th_12_Template, 2, 1, "th", 43)(13, ListPhongbanComponent_Conditional_92_td_13_Template, 3, 2, "td", 41);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(14, 46);
    \u0275\u0275template(15, ListPhongbanComponent_Conditional_92_th_15_Template, 2, 1, "th", 43)(16, ListPhongbanComponent_Conditional_92_td_16_Template, 5, 2, "td", 41);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(17, 47);
    \u0275\u0275template(18, ListPhongbanComponent_Conditional_92_th_18_Template, 2, 1, "th", 40)(19, ListPhongbanComponent_Conditional_92_td_19_Template, 3, 1, "td", 41);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(20, 48);
    \u0275\u0275template(21, ListPhongbanComponent_Conditional_92_th_21_Template, 2, 1, "th", 40)(22, ListPhongbanComponent_Conditional_92_td_22_Template, 6, 1, "td", 41);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(23, 49);
    \u0275\u0275template(24, ListPhongbanComponent_Conditional_92_th_24_Template, 2, 1, "th", 40)(25, ListPhongbanComponent_Conditional_92_td_25_Template, 6, 1, "td", 41);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(26, 50);
    \u0275\u0275template(27, ListPhongbanComponent_Conditional_92_th_27_Template, 2, 1, "th", 40)(28, ListPhongbanComponent_Conditional_92_td_28_Template, 11, 0, "td", 41);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(29, ListPhongbanComponent_Conditional_92_tr_29_Template, 1, 0, "tr", 51)(30, ListPhongbanComponent_Conditional_92_tr_30_Template, 1, 0, "tr", 52);
    \u0275\u0275elementEnd();
    \u0275\u0275element(31, "mat-paginator", 53);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("dataSource", ctx_r2.dataSource);
    \u0275\u0275advance(28);
    \u0275\u0275property("matHeaderRowDef", ctx_r2.displayedColumns);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r2.displayedColumns);
    \u0275\u0275advance();
    \u0275\u0275property("pageSizeOptions", \u0275\u0275pureFunction0(5, _c1))("pageSize", 25);
  }
}
var ListPhongbanComponent = class _ListPhongbanComponent {
  // Inject services
  phongbanService = inject(PhongbanService);
  router = inject(Router);
  dialog = inject(MatDialog);
  snackBar = inject(MatSnackBar);
  // ViewChild for table features
  paginator;
  sort;
  // Table configuration
  displayedColumns = [
    "stt",
    "ma",
    "ten",
    "loai",
    "level",
    "parent",
    "nhanvienCount",
    "childrenCount",
    "actions"
  ];
  columnLabels = {
    stt: "#",
    ma: "M\xE3",
    ten: "T\xEAn Ph\xF2ng Ban",
    loai: "Lo\u1EA1i",
    level: "C\u1EA5p",
    parent: "Thu\u1ED9c",
    nhanvienCount: "Nh\xE2n vi\xEAn",
    childrenCount: "B\u1ED9 ph\u1EADn con",
    actions: "H\xE0nh \u0111\u1ED9ng"
  };
  // Data source
  dataSource = new MatTableDataSource([]);
  // Reactive signals from service
  loading = this.phongbanService.loading;
  error = this.phongbanService.error;
  phongbans = this.phongbanService.ListPhongban;
  // Filter options
  loaiPhongbanOptions = Object.values(LoaiPhongban);
  loaiPhongbanLabels = LoaiPhongbanLabels;
  // Filter states
  searchText = signal("");
  selectedLoai = signal("");
  selectedLevel = signal("");
  // Computed filtered data
  filteredData = computed(() => {
    let data = this.phongbans();
    const search = this.searchText().toLowerCase();
    const loai = this.selectedLoai();
    const level = this.selectedLevel();
    if (search) {
      data = data.filter((pb) => pb.ma.toLowerCase().includes(search) || pb.ten.toLowerCase().includes(search));
    }
    if (loai) {
      data = data.filter((pb) => pb.loai === loai);
    }
    if (level !== "") {
      data = data.filter((pb) => pb.level === level);
    }
    return data;
  });
  // Statistics
  stats = computed(() => {
    const data = this.phongbans();
    return {
      total: data.length,
      byLevel: this.groupByLevel(data),
      totalNhanvien: data.reduce((sum, pb) => sum + (pb._count?.nhanviens || 0), 0)
    };
  });
  ngOnInit() {
    return __async(this, null, function* () {
      yield this.loadPhongbans();
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  /**
   * Load phòng ban list
   */
  loadPhongbans() {
    return __async(this, null, function* () {
      try {
        yield this.phongbanService.getAllPhongban({ includeChildren: false });
        this.updateDataSource();
      } catch (error) {
        console.error("Error loading phongbans:", error);
      }
    });
  }
  /**
   * Update table data source
   */
  updateDataSource() {
    this.dataSource.data = this.filteredData();
  }
  /**
   * Search handler
   */
  onSearch(event) {
    const value = event.target.value;
    this.searchText.set(value);
    this.updateDataSource();
  }
  /**
   * Filter by loại
   */
  onLoaiChange() {
    this.updateDataSource();
  }
  /**
   * Filter by level
   */
  onLevelChange() {
    this.updateDataSource();
  }
  /**
   * Clear all filters
   */
  clearFilters() {
    this.searchText.set("");
    this.selectedLoai.set("");
    this.selectedLevel.set("");
    this.updateDataSource();
  }
  /**
   * Navigate to create form
   */
  onCreate() {
    this.router.navigate(["/admin/phongban/create"]);
  }
  /**
   * Navigate to detail view
   */
  onView(phongban) {
    this.router.navigate(["/admin/phongban/detail", phongban.id]);
  }
  /**
   * Navigate to edit form
   */
  onEdit(phongban) {
    this.router.navigate(["/admin/phongban/edit", phongban.id]);
  }
  /**
   * Delete phòng ban
   */
  onDelete(phongban) {
    return __async(this, null, function* () {
      const hasChildren = (phongban._count?.children || 0) > 0;
      const hasNhanvien = (phongban._count?.nhanviens || 0) > 0;
      let message = `X\xE1c nh\u1EADn x\xF3a ph\xF2ng ban "${phongban.ten}"?`;
      if (hasChildren) {
        this.snackBar.open("Kh\xF4ng th\u1EC3 x\xF3a ph\xF2ng ban c\xF3 b\u1ED9 ph\u1EADn con. Vui l\xF2ng x\xF3a c\xE1c b\u1ED9 ph\u1EADn con tr\u01B0\u1EDBc.", "\u0110\xF3ng", { duration: 5e3 });
        return;
      }
      if (hasNhanvien) {
        this.snackBar.open(`Kh\xF4ng th\u1EC3 x\xF3a ph\xF2ng ban c\xF3 ${phongban._count?.nhanviens} nh\xE2n vi\xEAn. Vui l\xF2ng chuy\u1EC3n nh\xE2n vi\xEAn tr\u01B0\u1EDBc.`, "\u0110\xF3ng", { duration: 5e3 });
        return;
      }
      if (confirm(message)) {
        try {
          yield this.phongbanService.deletePhongban(phongban.id);
          this.updateDataSource();
        } catch (error) {
          console.error("Error deleting phongban:", error);
        }
      }
    });
  }
  /**
   * Navigate to tree view
   */
  onViewTree() {
    this.router.navigate(["/admin/phongban/tree"]);
  }
  /**
   * Refresh data
   */
  onRefresh() {
    return __async(this, null, function* () {
      yield this.loadPhongbans();
    });
  }
  /**
   * Export to Excel
   */
  onExport() {
    this.snackBar.open("T\xEDnh n\u0103ng xu\u1EA5t Excel \u0111ang \u0111\u01B0\u1EE3c ph\xE1t tri\u1EC3n", "\u0110\xF3ng", { duration: 3e3 });
  }
  /**
   * Get level badge color
   */
  getLevelColor(level) {
    const colors = ["primary", "accent", "warn"];
    return colors[Math.min(level - 1, colors.length - 1)];
  }
  /**
   * Get loại label
   */
  getLoaiLabel(loai) {
    return this.loaiPhongbanLabels[loai] || loai;
  }
  /**
   * Get loại badge color
   */
  getLoaiColor(loai) {
    const colorMap = {
      [LoaiPhongban.PHONGBAN]: "primary",
      [LoaiPhongban.BOPHAN]: "accent",
      [LoaiPhongban.PHONG]: "primary",
      [LoaiPhongban.BAN]: "primary",
      [LoaiPhongban.TO]: "accent",
      [LoaiPhongban.NHOM]: "accent",
      [LoaiPhongban.KHAC]: "warn"
    };
    return colorMap[loai] || "primary";
  }
  /**
   * Group phongbans by level for statistics
   */
  groupByLevel(data) {
    return data.reduce((acc, pb) => {
      acc[pb.level] = (acc[pb.level] || 0) + 1;
      return acc;
    }, {});
  }
  /**
   * Track by function for ngFor optimization
   */
  trackById(index, item) {
    return item.id;
  }
  static \u0275fac = function ListPhongbanComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ListPhongbanComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ListPhongbanComponent, selectors: [["app-listphongban"]], viewQuery: function ListPhongbanComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(MatPaginator, 5);
      \u0275\u0275viewQuery(MatSort, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.paginator = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.sort = _t.first);
    }
  }, decls: 93, vars: 15, consts: [["moreMenu", "matMenu"], [1, "phongban-container"], [1, "page-header"], [1, "header-title"], [1, "subtitle"], [1, "header-actions"], ["mat-raised-button", "", "color", "primary", 3, "click"], ["mat-button", "", 3, "click"], ["mat-icon-button", "", "matTooltip", "Th\xEAm", 3, "matMenuTriggerFor"], ["mat-menu-item", "", 3, "click"], [1, "stats-cards"], [1, "stat-card"], [1, "stat-icon", "primary"], [1, "stat-info"], [1, "stat-value"], [1, "stat-label"], [1, "stat-icon", "accent"], [1, "filter-card"], [1, "filter-row"], ["appearance", "outline", 1, "search-field"], ["matInput", "", "placeholder", "M\xE3 ho\u1EB7c t\xEAn ph\xF2ng ban...", 3, "input", "value"], ["matPrefix", ""], ["matSuffix", "", "mat-icon-button", ""], ["appearance", "outline"], [3, "valueChange", "selectionChange", "value"], ["value", ""], [3, "value"], ["mat-button", "", "color", "warn"], [1, "table-card"], [1, "loading-container"], [1, "error-container"], [1, "empty-container"], [1, "table-container"], [1, "stat-icon", "warn"], ["matSuffix", "", "mat-icon-button", "", 3, "click"], ["mat-button", "", "color", "warn", 3, "click"], ["diameter", "50"], ["color", "warn"], ["mat-table", "", "matSort", "", 1, "phongban-table", 3, "dataSource"], ["matColumnDef", "stt"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "ma"], ["mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], ["matColumnDef", "ten"], ["matColumnDef", "loai"], ["matColumnDef", "level"], ["matColumnDef", "parent"], ["matColumnDef", "nhanvienCount"], ["matColumnDef", "childrenCount"], ["matColumnDef", "actions"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", "class", "table-row", 4, "matRowDef", "matRowDefColumns"], ["showFirstLastButtons", "", 3, "pageSizeOptions", "pageSize"], ["mat-header-cell", ""], ["mat-cell", ""], ["mat-header-cell", "", "mat-sort-header", ""], [1, "ten-cell"], [1, "dept-icon"], ["highlighted", "", 3, "color"], [1, "level-chip", 3, "color"], [1, "parent-name"], [1, "text-muted"], [1, "count-badge"], [1, "action-buttons"], ["mat-icon-button", "", "matTooltip", "Xem chi ti\u1EBFt", "color", "primary", 3, "click"], ["mat-icon-button", "", "matTooltip", "Ch\u1EC9nh s\u1EEDa", "color", "accent", 3, "click"], ["mat-icon-button", "", "matTooltip", "X\xF3a", "color", "warn", 3, "click"], ["mat-header-row", ""], ["mat-row", "", 1, "table-row"]], template: function ListPhongbanComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "div", 3)(3, "h1")(4, "mat-icon");
      \u0275\u0275text(5, "business");
      \u0275\u0275elementEnd();
      \u0275\u0275text(6, " Qu\u1EA3n l\xFD Ph\xF2ng Ban ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "p", 4);
      \u0275\u0275text(8);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "div", 5)(10, "button", 6);
      \u0275\u0275listener("click", function ListPhongbanComponent_Template_button_click_10_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onCreate());
      });
      \u0275\u0275elementStart(11, "mat-icon");
      \u0275\u0275text(12, "add");
      \u0275\u0275elementEnd();
      \u0275\u0275text(13, " Th\xEAm Ph\xF2ng Ban ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "button", 7);
      \u0275\u0275listener("click", function ListPhongbanComponent_Template_button_click_14_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onViewTree());
      });
      \u0275\u0275elementStart(15, "mat-icon");
      \u0275\u0275text(16, "account_tree");
      \u0275\u0275elementEnd();
      \u0275\u0275text(17, " S\u01A1 \u0110\u1ED3 T\u1ED5 Ch\u1EE9c ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "button", 8)(19, "mat-icon");
      \u0275\u0275text(20, "more_vert");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(21, "mat-menu", null, 0)(23, "button", 9);
      \u0275\u0275listener("click", function ListPhongbanComponent_Template_button_click_23_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onRefresh());
      });
      \u0275\u0275elementStart(24, "mat-icon");
      \u0275\u0275text(25, "refresh");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "span");
      \u0275\u0275text(27, "L\xE0m m\u1EDBi");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(28, "button", 9);
      \u0275\u0275listener("click", function ListPhongbanComponent_Template_button_click_28_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onExport());
      });
      \u0275\u0275elementStart(29, "mat-icon");
      \u0275\u0275text(30, "download");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "span");
      \u0275\u0275text(32, "Xu\u1EA5t Excel");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(33, "div", 10)(34, "mat-card", 11)(35, "mat-card-content")(36, "div", 12)(37, "mat-icon");
      \u0275\u0275text(38, "business_center");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(39, "div", 13)(40, "div", 14);
      \u0275\u0275text(41);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(42, "div", 15);
      \u0275\u0275text(43, "T\u1ED5ng ph\xF2ng ban");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(44, "mat-card", 11)(45, "mat-card-content")(46, "div", 16)(47, "mat-icon");
      \u0275\u0275text(48, "people");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(49, "div", 13)(50, "div", 14);
      \u0275\u0275text(51);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(52, "div", 15);
      \u0275\u0275text(53, "T\u1ED5ng nh\xE2n vi\xEAn");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275repeaterCreate(54, ListPhongbanComponent_For_55_Template, 1, 1, null, null, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(56, "mat-card", 17)(57, "mat-card-content")(58, "div", 18)(59, "mat-form-field", 19)(60, "mat-label");
      \u0275\u0275text(61, "T\xECm ki\u1EBFm");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(62, "input", 20);
      \u0275\u0275listener("input", function ListPhongbanComponent_Template_input_input_62_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onSearch($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(63, "mat-icon", 21);
      \u0275\u0275text(64, "search");
      \u0275\u0275elementEnd();
      \u0275\u0275template(65, ListPhongbanComponent_Conditional_65_Template, 3, 0, "button", 22);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(66, "mat-form-field", 23)(67, "mat-label");
      \u0275\u0275text(68, "Lo\u1EA1i");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(69, "mat-select", 24);
      \u0275\u0275twoWayListener("valueChange", function ListPhongbanComponent_Template_mat_select_valueChange_69_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.selectedLoai, $event) || (ctx.selectedLoai = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275listener("selectionChange", function ListPhongbanComponent_Template_mat_select_selectionChange_69_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onLoaiChange());
      });
      \u0275\u0275elementStart(70, "mat-option", 25);
      \u0275\u0275text(71, "T\u1EA5t c\u1EA3");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(72, ListPhongbanComponent_For_73_Template, 2, 2, "mat-option", 26, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(74, "mat-form-field", 23)(75, "mat-label");
      \u0275\u0275text(76, "C\u1EA5p \u0111\u1ED9");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(77, "mat-select", 24);
      \u0275\u0275twoWayListener("valueChange", function ListPhongbanComponent_Template_mat_select_valueChange_77_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.selectedLevel, $event) || (ctx.selectedLevel = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275listener("selectionChange", function ListPhongbanComponent_Template_mat_select_selectionChange_77_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onLevelChange());
      });
      \u0275\u0275elementStart(78, "mat-option", 25);
      \u0275\u0275text(79, "T\u1EA5t c\u1EA3");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(80, "mat-option", 26);
      \u0275\u0275text(81, "C\u1EA5p 1");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(82, "mat-option", 26);
      \u0275\u0275text(83, "C\u1EA5p 2");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(84, "mat-option", 26);
      \u0275\u0275text(85, "C\u1EA5p 3");
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(86, ListPhongbanComponent_Conditional_86_Template, 4, 0, "button", 27);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(87, "mat-card", 28)(88, "mat-card-content");
      \u0275\u0275template(89, ListPhongbanComponent_Conditional_89_Template, 4, 0, "div", 29)(90, ListPhongbanComponent_Conditional_90_Template, 7, 1, "div", 30)(91, ListPhongbanComponent_Conditional_91_Template, 7, 0, "div", 31)(92, ListPhongbanComponent_Conditional_92_Template, 32, 6, "div", 32);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      const moreMenu_r19 = \u0275\u0275reference(22);
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate2("T\u1ED5ng s\u1ED1: ", ctx.stats().total, " ph\xF2ng ban | ", ctx.stats().totalNhanvien, " nh\xE2n vi\xEAn");
      \u0275\u0275advance(10);
      \u0275\u0275property("matMenuTriggerFor", moreMenu_r19);
      \u0275\u0275advance(23);
      \u0275\u0275textInterpolate(ctx.stats().total);
      \u0275\u0275advance(10);
      \u0275\u0275textInterpolate(ctx.stats().totalNhanvien);
      \u0275\u0275advance(3);
      \u0275\u0275repeater(\u0275\u0275pureFunction0(14, _c0));
      \u0275\u0275advance(8);
      \u0275\u0275property("value", ctx.searchText());
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.searchText() ? 65 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("value", ctx.selectedLoai);
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.loaiPhongbanOptions);
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("value", ctx.selectedLevel);
      \u0275\u0275advance(3);
      \u0275\u0275property("value", 1);
      \u0275\u0275advance(2);
      \u0275\u0275property("value", 2);
      \u0275\u0275advance(2);
      \u0275\u0275property("value", 3);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.searchText() || ctx.selectedLoai() || ctx.selectedLevel() ? 86 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.loading() ? 89 : ctx.error() ? 90 : ctx.filteredData().length === 0 ? 91 : 92);
    }
  }, dependencies: [
    CommonModule,
    FormsModule,
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
    MatPaginatorModule,
    MatPaginator,
    MatSortModule,
    MatSort,
    MatSortHeader,
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatPrefix,
    MatSuffix,
    MatInputModule,
    MatInput,
    MatButtonModule,
    MatButton,
    MatIconButton,
    MatIconModule,
    MatIcon,
    MatTooltipModule,
    MatTooltip,
    MatChipsModule,
    MatChip,
    MatSelectModule,
    MatSelect,
    MatOption,
    MatMenuModule,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatProgressSpinnerModule,
    MatProgressSpinner,
    MatDialogModule,
    MatCardModule,
    MatCard,
    MatCardContent
  ], styles: ["\n\n.phongban-container[_ngcontent-%COMP%] {\n  padding: 20px;\n  max-width: 1400px;\n  margin: 0 auto;\n}\n.phongban-container[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 24px;\n  flex-wrap: wrap;\n  gap: 16px;\n}\n.phongban-container[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%]   .header-title[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  font-size: 28px;\n  font-weight: 500;\n  margin: 0;\n  color: #1976d2;\n}\n.phongban-container[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%]   .header-title[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 32px;\n  width: 32px;\n  height: 32px;\n}\n.phongban-container[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%]   .header-title[_ngcontent-%COMP%]   .subtitle[_ngcontent-%COMP%] {\n  margin: 8px 0 0 44px;\n  color: #666;\n  font-size: 14px;\n}\n.phongban-container[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n}\n.phongban-container[_ngcontent-%COMP%]   .stats-cards[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 16px;\n  margin-bottom: 24px;\n}\n.phongban-container[_ngcontent-%COMP%]   .stats-cards[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 16px !important;\n}\n.phongban-container[_ngcontent-%COMP%]   .stats-cards[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .stat-icon[_ngcontent-%COMP%] {\n  width: 56px;\n  height: 56px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.phongban-container[_ngcontent-%COMP%]   .stats-cards[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .stat-icon[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 28px;\n  width: 28px;\n  height: 28px;\n  color: white;\n}\n.phongban-container[_ngcontent-%COMP%]   .stats-cards[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .stat-icon.primary[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #1976d2 0%,\n      #42a5f5 100%);\n}\n.phongban-container[_ngcontent-%COMP%]   .stats-cards[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .stat-icon.accent[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #7b1fa2 0%,\n      #ba68c8 100%);\n}\n.phongban-container[_ngcontent-%COMP%]   .stats-cards[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .stat-icon.warn[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f57c00 0%,\n      #ffb74d 100%);\n}\n.phongban-container[_ngcontent-%COMP%]   .stats-cards[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .stat-info[_ngcontent-%COMP%]   .stat-value[_ngcontent-%COMP%] {\n  font-size: 32px;\n  font-weight: 600;\n  line-height: 1;\n  color: #333;\n}\n.phongban-container[_ngcontent-%COMP%]   .stats-cards[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .stat-info[_ngcontent-%COMP%]   .stat-label[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #666;\n  margin-top: 4px;\n}\n.phongban-container[_ngcontent-%COMP%]   .filter-card[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.phongban-container[_ngcontent-%COMP%]   .filter-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%] {\n  padding: 16px !important;\n}\n.phongban-container[_ngcontent-%COMP%]   .filter-card[_ngcontent-%COMP%]   .filter-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  align-items: center;\n  flex-wrap: wrap;\n}\n.phongban-container[_ngcontent-%COMP%]   .filter-card[_ngcontent-%COMP%]   .filter-row[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 200px;\n}\n.phongban-container[_ngcontent-%COMP%]   .filter-card[_ngcontent-%COMP%]   .filter-row[_ngcontent-%COMP%]   .search-field[_ngcontent-%COMP%] {\n  flex: 2;\n  min-width: 300px;\n}\n.phongban-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%] {\n  padding: 0 !important;\n}\n.phongban-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%] {\n  overflow-x: auto;\n}\n.phongban-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .phongban-table[_ngcontent-%COMP%] {\n  width: 100%;\n  background: white;\n}\n.phongban-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .phongban-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  background-color: #f5f5f5;\n  font-weight: 600;\n  color: #333;\n  padding: 16px;\n}\n.phongban-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .phongban-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 16px;\n  border-bottom: 1px solid #e0e0e0;\n}\n.phongban-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .phongban-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%] {\n  transition: background-color 0.2s;\n}\n.phongban-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .phongban-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]:hover {\n  background-color: #f5f9ff;\n  cursor: pointer;\n}\n.phongban-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .phongban-table[_ngcontent-%COMP%]   .ten-cell[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.phongban-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .phongban-table[_ngcontent-%COMP%]   .ten-cell[_ngcontent-%COMP%]   .dept-icon[_ngcontent-%COMP%] {\n  color: #1976d2;\n  font-size: 20px;\n  width: 20px;\n  height: 20px;\n}\n.phongban-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .phongban-table[_ngcontent-%COMP%]   .parent-name[_ngcontent-%COMP%] {\n  color: #666;\n  font-size: 13px;\n}\n.phongban-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .phongban-table[_ngcontent-%COMP%]   .text-muted[_ngcontent-%COMP%] {\n  color: #999;\n}\n.phongban-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .phongban-table[_ngcontent-%COMP%]   .count-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  padding: 4px 12px;\n  background-color: #e3f2fd;\n  border-radius: 16px;\n  font-weight: 500;\n}\n.phongban-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .phongban-table[_ngcontent-%COMP%]   .count-badge[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n  width: 16px;\n  height: 16px;\n  color: #1976d2;\n}\n.phongban-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .phongban-table[_ngcontent-%COMP%]   .count-badge[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #1976d2;\n}\n.phongban-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .phongban-table[_ngcontent-%COMP%]   .level-chip[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n  width: 16px;\n  height: 16px;\n  margin-right: 4px;\n}\n.phongban-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .phongban-table[_ngcontent-%COMP%]   .action-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n}\n.phongban-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .phongban-table[_ngcontent-%COMP%]   .action-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n  width: 20px;\n  height: 20px;\n}\n.phongban-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   mat-paginator[_ngcontent-%COMP%] {\n  border-top: 1px solid #e0e0e0;\n}\n.phongban-container[_ngcontent-%COMP%]   .loading-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 60px 20px;\n  gap: 20px;\n}\n.phongban-container[_ngcontent-%COMP%]   .loading-container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #666;\n  font-size: 16px;\n}\n.phongban-container[_ngcontent-%COMP%]   .error-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 60px 20px;\n  gap: 16px;\n}\n.phongban-container[_ngcontent-%COMP%]   .error-container[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 64px;\n  width: 64px;\n  height: 64px;\n}\n.phongban-container[_ngcontent-%COMP%]   .error-container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #666;\n  font-size: 16px;\n  text-align: center;\n}\n.phongban-container[_ngcontent-%COMP%]   .empty-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 60px 20px;\n  gap: 16px;\n}\n.phongban-container[_ngcontent-%COMP%]   .empty-container[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 64px;\n  width: 64px;\n  height: 64px;\n  color: #bdbdbd;\n}\n.phongban-container[_ngcontent-%COMP%]   .empty-container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #999;\n  font-size: 16px;\n}\n@media (max-width: 960px) {\n  .phongban-container[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .phongban-container[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n  .phongban-container[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: flex-end;\n  }\n  .phongban-container[_ngcontent-%COMP%]   .stats-cards[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n  }\n  .phongban-container[_ngcontent-%COMP%]   .filter-card[_ngcontent-%COMP%]   .filter-row[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .phongban-container[_ngcontent-%COMP%]   .filter-card[_ngcontent-%COMP%]   .filter-row[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .phongban-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .phongban-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], \n   .phongban-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .phongban-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    padding: 12px 8px;\n    font-size: 13px;\n  }\n}\n@media (max-width: 599px) {\n  .phongban-container[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .phongban-container[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%]   .header-title[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 22px;\n  }\n  .phongban-container[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%]   .header-title[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n    font-size: 24px;\n    width: 24px;\n    height: 24px;\n  }\n  .phongban-container[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%]   .header-title[_ngcontent-%COMP%]   .subtitle[_ngcontent-%COMP%] {\n    margin-left: 36px;\n    font-size: 12px;\n  }\n  .phongban-container[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .phongban-container[_ngcontent-%COMP%]   .stats-cards[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .phongban-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%] {\n    -webkit-overflow-scrolling: touch;\n  }\n  .phongban-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .phongban-table[_ngcontent-%COMP%] {\n    min-width: 800px;\n  }\n}\nmat-chip[_ngcontent-%COMP%] {\n  font-size: 12px !important;\n  min-height: 28px !important;\n  padding: 4px 12px !important;\n}\nmat-card[_ngcontent-%COMP%] {\n  border-radius: 12px !important;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08) !important;\n}\nmat-form-field[_ngcontent-%COMP%] {\n  font-size: 14px;\n}\nmat-form-field[_ngcontent-%COMP%]   .mat-mdc-form-field-subscript-wrapper[_ngcontent-%COMP%] {\n  display: none;\n}\n/*# sourceMappingURL=listphongban.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ListPhongbanComponent, { className: "ListPhongbanComponent", filePath: "src/app/admin/phongban/listphongban/listphongban.component.ts", lineNumber: 63 });
})();
export {
  ListPhongbanComponent
};
//# sourceMappingURL=chunk-TNBQEIJY.mjs.map
