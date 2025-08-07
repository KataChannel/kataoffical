import {
  ListBanggiaComponent
} from "./chunk-QVWLINDE.js";
import {
  require_html2canvas
} from "./chunk-65WN44DK.js";
import "./chunk-542P3TXC.js";
import {
  BanggiaService
} from "./chunk-VNCWOGLS.js";
import {
  KhachhangService
} from "./chunk-4UKCSTFJ.js";
import "./chunk-MDKJ5PGV.js";
import "./chunk-KRR6EHK2.js";
import {
  SanphamService
} from "./chunk-H3SQLGMC.js";
import "./chunk-56QAEOBZ.js";
import "./chunk-R5HFYA7U.js";
import {
  MatSlideToggle,
  MatSlideToggleModule
} from "./chunk-OTAJRW5P.js";
import "./chunk-UV2EYCAL.js";
import {
  MatDialogModule
} from "./chunk-YS6BOFHA.js";
import "./chunk-VONEIXGX.js";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "./chunk-S32RIQSG.js";
import {
  GoogleSheetService
} from "./chunk-CB53OP7A.js";
import {
  readExcelFile,
  writeExcelFile
} from "./chunk-OZX2XR6T.js";
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
  MatSortHeader,
  MatSortModule,
  MatTable,
  MatTableDataSource,
  MatTableModule
} from "./chunk-JFLWRVXN.js";
import {
  ConvertDriveData,
  convertToSlug
} from "./chunk-657A73EG.js";
import "./chunk-MKCJCKWI.js";
import "./chunk-KRIHICU6.js";
import {
  MatSelect,
  MatSelectModule
} from "./chunk-VZZGNK7J.js";
import {
  require_moment
} from "./chunk-LIKOVN7R.js";
import {
  MatMenuModule
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
  MatSuffix,
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
  DecimalPipe,
  NgIf
} from "./chunk-E6DSVUBK.js";
import {
  computed,
  effect,
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
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
  ɵɵpureFunction2,
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
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-IHZ7YO24.js";
import "./chunk-E3MB3462.js";
import {
  __async,
  __spreadValues,
  __toESM
} from "./chunk-SXK72SKC.js";

// src/app/admin/banggia/detailbanggia/detailbanggia.component.ts
var import_moment = __toESM(require_moment());
var import_html2canvas = __toESM(require_html2canvas());
var DetailBanggiaComponent_ng_container_22_Defer_30_DepsFn = () => [MatFormField, MatLabel, NgControlStatus, NgModel, MatIcon, MatIconButton, MatSelect, MatOption, NgIf, DecimalPipe, MatSort, MatSortHeader, MatTable, MatHeaderCellDef, MatHeaderRowDef, MatColumnDef, MatCellDef, MatRowDef, MatHeaderCell, MatCell, MatHeaderRow, MatRow, MatNoDataRow, import("./chunk-HOSLV6EC.js").then((m) => m.SearchfilterComponent)];
var _c0 = () => ({ standalone: true });
var _c1 = () => ({ id: 1, title: "B\xE1n S\u1EC9", value: "bansi" });
var _c2 = () => ({ id: 2, title: "B\xE1n L\u1EBB", value: "banle" });
var _c3 = (a0, a1) => [a0, a1];
var _c4 = () => [];
var _forTrack0 = ($index, $item) => $item.id;
function DetailBanggiaComponent_button_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 3);
    \u0275\u0275listener("click", function DetailBanggiaComponent_button_15_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.handleBanggiaAction());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "save");
    \u0275\u0275elementEnd()();
  }
}
function DetailBanggiaComponent_button_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 3);
    \u0275\u0275listener("click", function DetailBanggiaComponent_button_16_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleEdit());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "edit");
    \u0275\u0275elementEnd()();
  }
}
function DetailBanggiaComponent_ng_container_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 11)(2, "div", 12);
    \u0275\u0275text(3, "B\u1EA1n ch\u1EAFc ch\u1EAFn mu\u1ED1n xo\xE1 kh\xF4ng?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 13)(5, "button", 14);
    \u0275\u0275listener("click", function DetailBanggiaComponent_ng_container_21_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.DeleteData());
    });
    \u0275\u0275text(6, "\u0110\u1ED3ng \xDD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 15);
    \u0275\u0275listener("click", function DetailBanggiaComponent_ng_container_21_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleDelete());
    });
    \u0275\u0275text(8, "Hu\u1EF7 B\u1ECF");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementContainerEnd();
  }
}
function DetailBanggiaComponent_ng_container_22_For_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 22);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r6 = ctx.$implicit;
    \u0275\u0275property("value", item_r6.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r6.title);
  }
}
function DetailBanggiaComponent_ng_container_22_Defer_29_For_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 22);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r8 = ctx.$implicit;
    \u0275\u0275property("value", item_r8.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r8.title);
  }
}
function DetailBanggiaComponent_ng_container_22_Defer_29_ForEmpty_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 28);
    \u0275\u0275text(1, "Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u");
    \u0275\u0275elementEnd();
  }
}
function DetailBanggiaComponent_ng_container_22_Defer_29_For_17_th_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 39)(1, "span", 40);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const column_r9 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.ColumnName[column_r9], " ");
  }
}
function DetailBanggiaComponent_ng_container_22_Defer_29_For_17_td_2_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 42)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 30);
    \u0275\u0275listener("click", function DetailBanggiaComponent_ng_container_22_Defer_29_For_17_td_2_Case_1_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r10);
      const row_r11 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.RemoveSanpham(row_r11));
    });
    \u0275\u0275elementStart(4, "mat-icon");
    \u0275\u0275text(5, "delete");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const idx_r12 = \u0275\u0275nextContext().index;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", idx_r12 + 1, " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
  }
}
function DetailBanggiaComponent_ng_container_22_Defer_29_For_17_td_2_Case_2_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 47);
    \u0275\u0275listener("keydown.enter", function DetailBanggiaComponent_ng_container_22_Defer_29_For_17_td_2_Case_2_div_0_Template_div_keydown_enter_0_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r13 = \u0275\u0275nextContext(2);
      const row_r11 = ctx_r13.$implicit;
      const idx_r12 = ctx_r13.index;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.updateValue($event, idx_r12, row_r11, "giaban", "number"));
    });
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r11 = \u0275\u0275nextContext(2).$implicit;
    const column_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("contentEditable", true);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 2, row_r11[column_r9] || 0, "1.0-2"), " ");
  }
}
function DetailBanggiaComponent_ng_container_22_Defer_29_For_17_td_2_Case_2_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 43);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r11 = \u0275\u0275nextContext(2).$implicit;
    const column_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r11[column_r9], "1.0-2"), " ");
  }
}
function DetailBanggiaComponent_ng_container_22_Defer_29_For_17_td_2_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, DetailBanggiaComponent_ng_container_22_Defer_29_For_17_td_2_Case_2_div_0_Template, 3, 5, "div", 45)(1, DetailBanggiaComponent_ng_container_22_Defer_29_For_17_td_2_Case_2_span_1_Template, 3, 4, "span", 46);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275property("ngIf", ctx_r1.isEdit());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.isEdit());
  }
}
function DetailBanggiaComponent_ng_container_22_Defer_29_For_17_td_2_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 43);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r11 = \u0275\u0275nextContext().$implicit;
    const column_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r11[column_r9], "1.0-2"), " ");
  }
}
function DetailBanggiaComponent_ng_container_22_Defer_29_For_17_td_2_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 44);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r11 = \u0275\u0275nextContext().$implicit;
    const column_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r11[column_r9], " ");
  }
}
function DetailBanggiaComponent_ng_container_22_Defer_29_For_17_td_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 41);
    \u0275\u0275template(1, DetailBanggiaComponent_ng_container_22_Defer_29_For_17_td_2_Case_1_Template, 6, 2, "span", 42)(2, DetailBanggiaComponent_ng_container_22_Defer_29_For_17_td_2_Case_2_Template, 2, 2)(3, DetailBanggiaComponent_ng_container_22_Defer_29_For_17_td_2_Case_3_Template, 3, 4, "span", 43)(4, DetailBanggiaComponent_ng_container_22_Defer_29_For_17_td_2_Case_4_Template, 2, 1, "span", 44);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_17_0;
    const column_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_17_0 = column_r9) === "STT" ? 1 : tmp_17_0 === "giaban" ? 2 : tmp_17_0 === "giagoc" ? 3 : 4);
  }
}
function DetailBanggiaComponent_ng_container_22_Defer_29_For_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0, 33);
    \u0275\u0275template(1, DetailBanggiaComponent_ng_container_22_Defer_29_For_17_th_1_Template, 3, 1, "th", 37)(2, DetailBanggiaComponent_ng_container_22_Defer_29_For_17_td_2_Template, 5, 1, "td", 38);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const column_r9 = ctx.$implicit;
    \u0275\u0275property("matColumnDef", column_r9);
  }
}
function DetailBanggiaComponent_ng_container_22_Defer_29_tr_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 48);
  }
}
function DetailBanggiaComponent_ng_container_22_Defer_29_tr_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 49);
  }
}
function DetailBanggiaComponent_ng_container_22_Defer_29_tr_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 50)(1, "td", 51);
    \u0275\u0275text(2, "Kh\xF4ng t\xECm th\u1EA5y");
    \u0275\u0275elementEnd()();
  }
}
function DetailBanggiaComponent_ng_container_22_Defer_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 25)(1, "div", 5)(2, "mat-form-field", 26)(3, "mat-label");
    \u0275\u0275text(4, "T\xECnh Tr\u1EA1ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "mat-select", 27);
    \u0275\u0275twoWayListener("ngModelChange", function DetailBanggiaComponent_ng_container_22_Defer_29_Template_mat_select_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailBanggia().status, $event) || (ctx_r1.DetailBanggia().status = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275repeaterCreate(6, DetailBanggiaComponent_ng_container_22_Defer_29_For_7_Template, 2, 2, "mat-option", 22, \u0275\u0275repeaterTrackByIdentity, false, DetailBanggiaComponent_ng_container_22_Defer_29_ForEmpty_8_Template, 2, 0, "mat-option", 28);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "app-searchfilter", 29);
    \u0275\u0275listener("OutFilter", function DetailBanggiaComponent_ng_container_22_Defer_29_Template_app_searchfilter_OutFilter_9_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.DoOutFilter($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "app-searchfilter", 29);
    \u0275\u0275listener("OutFilter", function DetailBanggiaComponent_ng_container_22_Defer_29_Template_app_searchfilter_OutFilter_10_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.DoOutKhachhang($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 30);
    \u0275\u0275listener("click", function DetailBanggiaComponent_ng_container_22_Defer_29_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.EmptyCart());
    });
    \u0275\u0275elementStart(12, "mat-icon");
    \u0275\u0275text(13, "delete");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(14, "div", 31)(15, "table", 32);
    \u0275\u0275repeaterCreate(16, DetailBanggiaComponent_ng_container_22_Defer_29_For_17_Template, 3, 1, "ng-container", 33, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275template(18, DetailBanggiaComponent_ng_container_22_Defer_29_tr_18_Template, 1, 0, "tr", 34)(19, DetailBanggiaComponent_ng_container_22_Defer_29_tr_19_Template, 1, 0, "tr", 35)(20, DetailBanggiaComponent_ng_container_22_Defer_29_tr_20_Template, 3, 0, "tr", 36);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_10_0;
    let tmp_17_0;
    let tmp_19_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailBanggia().status);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(22, _c0));
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.ListStatus);
    \u0275\u0275advance(3);
    \u0275\u0275property("isEdit", ctx_r1.isEdit)("title", "S\u1EA3n Ph\u1EA9m")("ListFilter", ((tmp_10_0 = ctx_r1.DetailBanggia()) == null ? null : tmp_10_0.sanpham) || \u0275\u0275pureFunction0(23, _c4))("filterItem", ctx_r1.filterSanpham)("CountItems", ctx_r1.dataSource().filteredData.length)("fieldsearch", "title")("ListItem", ctx_r1._SanphamService.ListSanpham());
    \u0275\u0275advance();
    \u0275\u0275property("isEdit", ctx_r1.isEdit)("title", "Kh\xE1ch H\xE0ng")("ListFilter", ((tmp_17_0 = ctx_r1.DetailBanggia()) == null ? null : tmp_17_0.khachhang) || \u0275\u0275pureFunction0(24, _c4))("filterItem", ctx_r1.filterKhachhang)("CountItems", (tmp_19_0 = ctx_r1.DetailBanggia()) == null ? null : tmp_19_0.khachhang == null ? null : tmp_19_0.khachhang.length)("fieldsearch", "name")("ListItem", ctx_r1._KhachhangService.ListKhachhang());
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
    \u0275\u0275advance(4);
    \u0275\u0275property("dataSource", ctx_r1.dataSource());
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.displayedColumns);
    \u0275\u0275advance(2);
    \u0275\u0275property("matHeaderRowDef", ctx_r1.displayedColumns);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r1.displayedColumns);
  }
}
function DetailBanggiaComponent_ng_container_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0)(1);
    \u0275\u0275elementStart(2, "div", 16)(3, "mat-form-field", 17)(4, "mat-label");
    \u0275\u0275text(5, "Ti\xEAu \u0110\u1EC1");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "input", 18);
    \u0275\u0275twoWayListener("ngModelChange", function DetailBanggiaComponent_ng_container_22_Template_input_ngModelChange_6_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailBanggia().title, $event) || (ctx_r1.DetailBanggia().title = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("input", function DetailBanggiaComponent_ng_container_22_Template_input_input_6_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.FillSlug());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "mat-form-field", 17)(8, "mat-label");
    \u0275\u0275text(9, "Lo\u1EA1i");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "mat-select", 19);
    \u0275\u0275twoWayListener("ngModelChange", function DetailBanggiaComponent_ng_container_22_Template_mat_select_ngModelChange_10_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailBanggia().type, $event) || (ctx_r1.DetailBanggia().type = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(11, "div", 20)(12, "div", 21);
    \u0275\u0275repeaterCreate(13, DetailBanggiaComponent_ng_container_22_For_14_Template, 2, 2, "mat-option", 22, _forTrack0);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(15, "mat-form-field", 17)(16, "mat-label");
    \u0275\u0275text(17, "B\u1EAFt \u0110\u1EA7u");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "input", 23);
    \u0275\u0275twoWayListener("ngModelChange", function DetailBanggiaComponent_ng_container_22_Template_input_ngModelChange_18_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailBanggia().batdau, $event) || (ctx_r1.DetailBanggia().batdau = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275element(19, "mat-datepicker-toggle", 24)(20, "mat-datepicker", null, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "mat-form-field", 17)(23, "mat-label");
    \u0275\u0275text(24, "K\u1EBFt Th\xFAc");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "input", 23);
    \u0275\u0275twoWayListener("ngModelChange", function DetailBanggiaComponent_ng_container_22_Template_input_ngModelChange_25_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailBanggia().ketthuc, $event) || (ctx_r1.DetailBanggia().ketthuc = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275element(26, "mat-datepicker-toggle", 24)(27, "mat-datepicker", null, 1);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(29, DetailBanggiaComponent_ng_container_22_Defer_29_Template, 21, 25);
    \u0275\u0275defer(30, 29, DetailBanggiaComponent_ng_container_22_Defer_30_DepsFn);
    \u0275\u0275deferOnIdle();
    \u0275\u0275elementContainerEnd()();
  }
  if (rf & 2) {
    const pickerbatdau_r15 = \u0275\u0275reference(21);
    const pickerketthuc_r16 = \u0275\u0275reference(28);
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailBanggia().title);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailBanggia().type);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(15, _c0))("disabled", !ctx_r1.isEdit());
    \u0275\u0275advance(3);
    \u0275\u0275repeater(\u0275\u0275pureFunction2(18, _c3, \u0275\u0275pureFunction0(16, _c1), \u0275\u0275pureFunction0(17, _c2)));
    \u0275\u0275advance(5);
    \u0275\u0275property("matDatepicker", pickerbatdau_r15);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailBanggia().batdau);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(21, _c0))("disabled", !ctx_r1.isEdit());
    \u0275\u0275advance();
    \u0275\u0275property("for", pickerbatdau_r15);
    \u0275\u0275advance(6);
    \u0275\u0275property("matDatepicker", pickerketthuc_r16);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailBanggia().ketthuc);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(22, _c0))("disabled", !ctx_r1.isEdit());
    \u0275\u0275advance();
    \u0275\u0275property("for", pickerketthuc_r16);
  }
}
var DetailBanggiaComponent = class _DetailBanggiaComponent {
  _ListbanggiaComponent = inject(ListBanggiaComponent);
  _BanggiaService = inject(BanggiaService);
  _SanphamService = inject(SanphamService);
  _KhachhangService = inject(KhachhangService);
  _GoogleSheetService = inject(GoogleSheetService);
  _route = inject(ActivatedRoute);
  _router = inject(Router);
  _snackBar = inject(MatSnackBar);
  paginator;
  sort;
  displayedColumns = [
    "STT",
    "title",
    "masp",
    "dvt",
    "giaban"
  ];
  ColumnName = {
    STT: "STT",
    title: "Ti\xEAu \u0110\u1EC1",
    masp: "M\xE3 SP",
    dvt: "\u0110\u01A1n V\u1ECB T\xEDnh",
    giaban: "Gi\xE1 B\xE1n"
  };
  dataSource = signal(new MatTableDataSource([]));
  CountItem = computed(() => this.dataSource().data.length);
  filterSanpham = [];
  ListStatus = [
    { value: "baogia", title: "B\xE1o Gi\xE1" },
    { value: "dangban", title: "\u0110ang B\xE1n" },
    { value: "ngungban", title: "Ng\u1EEBng B\xE1n" }
  ];
  filterKhachhang = [];
  CheckListKhachhang = [];
  constructor() {
    this._route.paramMap.subscribe((params) => __async(this, null, function* () {
      const id = params.get("id");
      this._BanggiaService.setBanggiaId(id);
      yield this._SanphamService.getAllSanpham();
      this.filterSanpham = this._SanphamService.ListSanpham();
      yield this._KhachhangService.getAllKhachhang();
      this.filterKhachhang = this._KhachhangService.ListKhachhang().filter((v) => v.isActive);
    }));
    effect(() => __async(this, null, function* () {
      const id = this._BanggiaService.banggiaId();
      if (!id) {
        this._router.navigate(["/admin/banggia"]);
        this._ListbanggiaComponent.drawer.close();
      }
      if (id === "0") {
        this.DetailBanggia.set({
          title: `BG - ${(0, import_moment.default)().format("DD/MM/YYYY")}`,
          status: "baogia",
          type: "bansi",
          batdau: (0, import_moment.default)().startOf("month").toDate(),
          ketthuc: (0, import_moment.default)().endOf("month").toDate()
        });
        this._ListbanggiaComponent.drawer.open();
        this.isEdit.update((value) => !value);
        this._router.navigate(["/admin/banggia", "0"]);
      } else {
        yield this._BanggiaService.getBanggiaByid(id);
        this.dataSource().data = this.DetailBanggia().sanpham;
        this._ListbanggiaComponent.drawer.open();
        this._router.navigate(["/admin/banggia", id]);
      }
    }));
  }
  DetailBanggia = this._BanggiaService.DetailBanggia;
  isEdit = signal(false);
  isDelete = signal(false);
  banggiaId = this._BanggiaService.banggiaId;
  ngOnInit() {
    return __async(this, null, function* () {
      yield this._KhachhangService.getAllKhachhang();
      this.filterKhachhang = this._KhachhangService.ListKhachhang().filter((v) => v.isActive);
    });
  }
  ngAfterViewInit() {
    setTimeout(() => {
      if (this.paginator) {
        this.dataSource().sort = this.sort;
      }
    }, 300);
  }
  handleBanggiaAction() {
    return __async(this, null, function* () {
      this.DetailBanggia.update((v) => {
        v.sanpham?.forEach((item) => {
          item.sanphamId = item.id;
        });
        return v;
      });
      if (this.banggiaId() === "0") {
        yield this.createBanggia();
      } else {
        yield this.updateBanggia();
      }
    });
  }
  createBanggia() {
    return __async(this, null, function* () {
      try {
        yield this._BanggiaService.CreateBanggia(this.DetailBanggia());
        this._snackBar.open("T\u1EA1o M\u1EDBi Th\xE0nh C\xF4ng", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        this.isEdit.update((value) => !value);
      } catch (error) {
        console.error("L\u1ED7i khi t\u1EA1o banggia:", error);
      }
    });
  }
  updateBanggia() {
    return __async(this, null, function* () {
      try {
        yield this._BanggiaService.updateBanggia(this.DetailBanggia());
        this._snackBar.open("C\u1EADp Nh\u1EADt Th\xE0nh C\xF4ng", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        this.isEdit.update((value) => !value);
      } catch (error) {
        console.error("L\u1ED7i khi c\u1EADp nh\u1EADt banggia:", error);
      }
    });
  }
  DeleteData() {
    return __async(this, null, function* () {
      try {
        yield this._BanggiaService.DeleteBanggia(this.DetailBanggia());
        this._snackBar.open("X\xF3a Th\xE0nh C\xF4ng", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        this._router.navigate(["/admin/banggia"]);
      } catch (error) {
        console.error("L\u1ED7i khi x\xF3a banggia:", error);
      }
    });
  }
  goBack() {
    this._router.navigate(["/admin/banggia"]);
    this._ListbanggiaComponent.drawer.close();
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
    this.DetailBanggia.update((v) => {
      v.slug = convertToSlug(v.title);
      return v;
    });
  }
  updateValue(event, index, element, field, type) {
    const newValue = type === "number" ? Number(event.target.innerText.trim().replace(/[^0-9]/g, "")) || 0 : event.target.innerText.trim();
    const keyboardEvent = event;
    if (keyboardEvent.key === "Enter" && !keyboardEvent.shiftKey) {
      event.preventDefault();
    }
    if (type === "number") {
      const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];
      if (!/^\d$/.test(keyboardEvent.key) && !allowedKeys.includes(keyboardEvent.key)) {
        event.preventDefault();
      }
    }
    this.DetailBanggia.update((v) => {
      if (index !== null) {
        if (field === "giaban") {
          v.sanpham[index][field] = newValue;
          const inputs = document.querySelectorAll(".giaban-input");
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
        }
      } else {
        v[field] = newValue;
      }
      return v;
    });
    console.log(element, field, newValue);
    console.log("D\u1EEF li\u1EC7u \u0111\xE3 c\u1EADp nh\u1EADt:", this.DetailBanggia());
  }
  LoadDrive() {
    return __async(this, null, function* () {
      const DriveInfo = {
        IdSheet: "15npo25qyH5FmfcEjl1uyqqyFMS_vdFnmxM_kt0KYmZk",
        SheetName: "BGImport",
        ApiKey: "AIzaSyD33kgZJKdFpv1JrKHacjCQccL_O0a2Eao"
      };
      const result = yield this._GoogleSheetService.getDrive(DriveInfo);
      const data = ConvertDriveData(result.values);
      this.DoImportData(data);
    });
  }
  AddSanpham() {
  }
  EmptyCart() {
    this.DetailBanggia.update((v) => {
      v.sanpham = [];
      return v;
    });
    this.dataSource().data = this.DetailBanggia().sanpham;
    this.dataSource().sort = this.sort;
  }
  RemoveSanpham(item) {
    this.DetailBanggia.update((v) => {
      v.sanpham = v.sanpham.filter((v1) => v1.id !== item.id);
      return v;
    });
    this.dataSource().data = this.DetailBanggia().sanpham;
    this.dataSource().sort = this.sort;
  }
  CoppyDon() {
    this._snackBar.open("\u0110ang Coppy \u0110\u01A1n H\xE0ng", "", {
      duration: 1e3,
      horizontalPosition: "end",
      verticalPosition: "top",
      panelClass: ["snackbar-warning"]
    });
    this.DetailBanggia.update((v) => {
      delete v.id;
      v.title = `${v.title} - Coppy`;
      return v;
    });
    this._BanggiaService.CreateBanggia(this.DetailBanggia()).then((data) => {
      this._snackBar.open("Coppy \u0110\u01A1n H\xE0ng Th\xE0nh C\xF4ng", "", {
        duration: 1e3,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ["snackbar-success"]
      });
      this._router.navigate(["/admin/banggia", this.banggiaId()]);
    });
  }
  printContent() {
    const element = document.getElementById("printContent");
    if (!element)
      return;
    (0, import_html2canvas.default)(element, { scale: 2 }).then((canvas) => {
      const imageData = canvas.toDataURL("image/png");
      const printWindow = window.open("", "_blank");
      if (!printWindow)
        return;
      printWindow.document.write(`
            <html>
              <head>
                <title>${this.DetailBanggia()?.title}</title>
              </head>
              <body style="text-align: center;">
                <img src="${imageData}" style="max-width: 100%;"/>
                <script>
                  window.onload = function() {
                    window.print();
                    window.onafterprint = function() { window.close(); };
                  };
                <\/script>
              </body>
            </html>
          `);
      printWindow.document.close();
    });
  }
  ImporExcel(event) {
    return __async(this, null, function* () {
      const data = yield readExcelFile(event);
      this.DoImportData(data);
    });
  }
  ExportExcel(data, title) {
    const transformedData = data.data.map((v) => ({
      masp: v.masp?.trim() || "",
      giaban: Number(v.giaban) || 0
    }));
    writeExcelFile(transformedData, title);
  }
  DoImportData(data) {
    const transformedData = data.map((v) => ({
      masp: v.masp?.trim() || "",
      giaban: Number(v.giaban) || 0
    })).filter((v) => v.masp);
    this.DetailBanggia.update((v) => {
      const listdata = transformedData.map((item) => {
        item.masp = item.masp?.trim() || "";
        item.giaban = Number(item.giaban) || 0;
        const item1 = this._SanphamService.ListSanpham().find((v1) => v1.masp === item.masp);
        if (item1) {
          return __spreadValues(__spreadValues({}, item1), item);
        }
        return item;
      });
      v.sanpham = listdata;
      return v;
    });
    console.log(this.DetailBanggia().sanpham);
    this.dataSource().data = this.DetailBanggia().sanpham;
    this.dataSource().sort = this.sort;
    this._snackBar.open("C\u1EADp Nh\u1EADt Th\xE0nh C\xF4ng", "", {
      duration: 1e3,
      horizontalPosition: "end",
      verticalPosition: "top",
      panelClass: ["snackbar-success"]
    });
  }
  DoOutFilter(event) {
    this.filterSanpham = event;
    this.dataSource().data = event;
    this.dataSource().sort = this.sort;
    this.DetailBanggia.update((v) => {
      v.sanpham = event;
      return v;
    });
  }
  DoOutKhachhang(event) {
    return __async(this, null, function* () {
      const removeData = {
        banggiaId: this.banggiaId(),
        khachhangIds: this.DetailBanggia().khachhang.map((v) => v.id)
      };
      const removePromise = yield this._BanggiaService.removeKHfromBG(removeData);
      const addData = {
        banggiaId: this.banggiaId(),
        khachhangIds: event.map((v) => v.id)
      };
      const adddPromise = yield this._BanggiaService.addKHtoBG(addData);
    });
  }
  static \u0275fac = function DetailBanggiaComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DetailBanggiaComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DetailBanggiaComponent, selectors: [["app-detailbanggia"]], viewQuery: function DetailBanggiaComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(MatPaginator, 5);
      \u0275\u0275viewQuery(MatSort, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.paginator = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.sort = _t.first);
    }
  }, decls: 23, vars: 9, consts: [["pickerbatdau", ""], ["pickerketthuc", ""], [1, "flex", "flex-row", "justify-between", "items-center", "space-x-2", "p-2"], ["mat-icon-button", "", "color", "primary", 3, "click"], [1, "p-2", "min-w-28", "font-bold", "focus:border", "focus:rounded-lg", "focus:border-blue-600", "focus:bg-slate-100", "focus:outline-none", 3, "blur", "contentEditable"], [1, "flex", "flex-row", "space-x-2", "items-center"], [3, "ngModelChange", "ngModel", "disabled"], ["mat-icon-button", "", "color", "primary", 3, "click", 4, "ngIf"], ["mat-icon-button", "", "color", "warn", 3, "click"], [1, "relative", "flex", "flex-col", "w-full", "p-4", "overflow-auto"], [4, "ngIf"], [1, "flex", "flex-col", "space-y-4", "items-center", "justify-center"], [1, "font-bold", "text-2xl"], [1, "flex", "flex-row", "space-x-2", "items-center", "justify-center"], ["mat-flat-button", "", "color", "primary", 3, "click"], ["mat-flat-button", "", "color", "warn", 3, "click"], [1, "w-full", "flex", "flex-row", "space-x-2", "items-center"], ["appearance", "outline", "subscriptsizing", "dynamic", 1, "w-full"], ["matInput", "", "placeholder", "Vui l\xF2ng nh\u1EADp Ti\xEAu \u0110\u1EC1", 3, "ngModelChange", "input", "ngModel", "disabled"], [3, "ngModelChange", "ngModel", "ngModelOptions", "disabled"], [1, "w-full", "flex", "flex-col"], [1, "overflow-y-auto", "max-h-44"], [3, "value"], ["matInput", "", 3, "ngModelChange", "matDatepicker", "ngModel", "ngModelOptions", "disabled"], ["matIconSuffix", "", 3, "for"], [1, "cursor-pointer", "w-full", "relative", "flex", "lg:flex-row", "lg:space-y-2", "space-y-0", "flex-col", "space-x-2", "justify-between", "items-center", "p-2", "bg-white", "rounded-lg"], ["appearance", "outline", "subscriptSizing", "dynamic"], [3, "ngModelChange", "disabled", "ngModel", "ngModelOptions"], ["disabled", ""], [3, "OutFilter", "isEdit", "title", "ListFilter", "filterItem", "CountItems", "fieldsearch", "ListItem"], ["mat-icon-button", "", "color", "warn", 3, "click", "disabled"], [1, "w-full", "overflow-auto"], ["mat-table", "", "matSort", "", 1, "!border", "w-full", "cursor-pointer", 3, "dataSource"], [3, "matColumnDef"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["class", "mat-row", 4, "matNoDataRow"], ["class", "whitespace-nowrap", "mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["mat-header-cell", "", "mat-sort-header", "", 1, "whitespace-nowrap"], [1, "line-clamp-4", "me-4"], ["mat-cell", ""], [1, "max-w-20", "line-clamp-4", "flex", "flex-row", "items-center"], [1, "max-w-20", "line-clamp-4"], [1, "max-w-40", "line-clamp-4"], ["class", "giaban-input p-2 min-w-28 bg-slate-200 focus:border rounded-lg focus:border-blue-600 focus:bg-slate-100 focus:outline-none", 3, "contentEditable", "keydown.enter", 4, "ngIf"], ["class", "max-w-20 line-clamp-4", 4, "ngIf"], [1, "giaban-input", "p-2", "min-w-28", "bg-slate-200", "focus:border", "rounded-lg", "focus:border-blue-600", "focus:bg-slate-100", "focus:outline-none", 3, "keydown.enter", "contentEditable"], ["mat-header-row", ""], ["mat-row", ""], [1, "mat-row"], ["colspan", "4", 1, "mat-cell", "p-4"]], template: function DetailBanggiaComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 2)(1, "button", 3);
      \u0275\u0275listener("click", function DetailBanggiaComponent_Template_button_click_1_listener() {
        return ctx.goBack();
      });
      \u0275\u0275elementStart(2, "mat-icon");
      \u0275\u0275text(3, "arrow_back");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(4, "div", 4);
      \u0275\u0275listener("blur", function DetailBanggiaComponent_Template_div_blur_4_listener($event) {
        return ctx.updateValue($event, null, ctx.DetailBanggia(), "title", "string");
      });
      \u0275\u0275text(5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "div", 5)(7, "mat-slide-toggle", 6);
      \u0275\u0275twoWayListener("ngModelChange", function DetailBanggiaComponent_Template_mat_slide_toggle_ngModelChange_7_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.DetailBanggia().isActive, $event) || (ctx.DetailBanggia().isActive = $event);
        return $event;
      });
      \u0275\u0275text(8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "button", 3);
      \u0275\u0275listener("click", function DetailBanggiaComponent_Template_button_click_9_listener() {
        return ctx.CoppyDon();
      });
      \u0275\u0275elementStart(10, "mat-icon");
      \u0275\u0275text(11, "content_copy");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(12, "button", 3);
      \u0275\u0275listener("click", function DetailBanggiaComponent_Template_button_click_12_listener() {
        return ctx.printContent();
      });
      \u0275\u0275elementStart(13, "mat-icon");
      \u0275\u0275text(14, "print");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(15, DetailBanggiaComponent_button_15_Template, 3, 0, "button", 7)(16, DetailBanggiaComponent_button_16_Template, 3, 0, "button", 7);
      \u0275\u0275elementStart(17, "button", 8);
      \u0275\u0275listener("click", function DetailBanggiaComponent_Template_button_click_17_listener() {
        return ctx.toggleDelete();
      });
      \u0275\u0275elementStart(18, "mat-icon");
      \u0275\u0275text(19, "delete");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(20, "div", 9);
      \u0275\u0275template(21, DetailBanggiaComponent_ng_container_21_Template, 9, 0, "ng-container", 10)(22, DetailBanggiaComponent_ng_container_22_Template, 32, 23, "ng-container", 10);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_1_0;
      \u0275\u0275advance(4);
      \u0275\u0275property("contentEditable", true);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ((tmp_1_0 = ctx.DetailBanggia()) == null ? null : tmp_1_0.title) || "Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u", " ");
      \u0275\u0275advance(2);
      \u0275\u0275twoWayProperty("ngModel", ctx.DetailBanggia().isActive);
      \u0275\u0275property("disabled", !ctx.isEdit());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate(ctx.DetailBanggia().isActive ? "Hi\u1EC3n Th\u1ECB" : "\u1EA8n");
      \u0275\u0275advance(7);
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
    NgIf,
    MatSlideToggleModule,
    MatSlideToggle,
    MatDatepickerModule,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    MatMenuModule
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DetailBanggiaComponent, { className: "DetailBanggiaComponent", filePath: "src/app/admin/banggia/detailbanggia/detailbanggia.component.ts", lineNumber: 51 });
})();
export {
  DetailBanggiaComponent
};
//# sourceMappingURL=chunk-LTBQNO7C.js.map
