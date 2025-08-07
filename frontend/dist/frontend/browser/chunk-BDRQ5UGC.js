import {
  UserguideService
} from "./chunk-YSHAUWVW.js";
import {
  SearchfilterComponent
} from "./chunk-X7ROAIMK.js";
import {
  MatDialog,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule
} from "./chunk-YS6BOFHA.js";
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
  MatTableModule,
  MatTooltip,
  MatTooltipModule
} from "./chunk-JFLWRVXN.js";
import {
  ConvertDriveData
} from "./chunk-657A73EG.js";
import {
  MatDrawer,
  MatDrawerContainer,
  MatSidenavModule
} from "./chunk-KRIHICU6.js";
import {
  MatSelectModule
} from "./chunk-VZZGNK7J.js";
import {
  MatMenu,
  MatMenuItem,
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
  MatPrefix,
  NgControlStatus,
  NgModel
} from "./chunk-WEAWHMFJ.js";
import {
  environment
} from "./chunk-U3IXXJDR.js";
import {
  MatSnackBar
} from "./chunk-WD36GM3Q.js";
import {
  MatButton,
  MatButtonModule,
  MatIconButton
} from "./chunk-HICNAP2H.js";
import {
  BreakpointObserver,
  Breakpoints
} from "./chunk-GWKJMKCD.js";
import {
  Router,
  RouterOutlet
} from "./chunk-JGMWTFVW.js";
import {
  CommonModule,
  DatePipe,
  NgIf
} from "./chunk-E6DSVUBK.js";
import {
  effect,
  inject,
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
  ɵɵtextInterpolate3,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-IHZ7YO24.js";
import {
  __decorate
} from "./chunk-E3MB3462.js";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-SXK72SKC.js";

// src/app/admin/userguide/listuserguide/listuserguide.component.ts
var _c0 = ["drawer"];
var _c1 = () => ({ standalone: true });
var _forTrack0 = ($index, $item) => $item.key;
function ListUserguideComponent_div_5_button_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 49);
    \u0275\u0275listener("click", function ListUserguideComponent_div_5_button_15_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext(2);
      const DeleteDialog_r5 = \u0275\u0275reference(44);
      return \u0275\u0275resetView(ctx_r2.openDeleteDialog(DeleteDialog_r5));
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "delete");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 36);
    \u0275\u0275text(4, "Xo\xE1");
    \u0275\u0275elementEnd()();
  }
}
function ListUserguideComponent_div_5_For_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 50);
    \u0275\u0275listener("click", function ListUserguideComponent_div_5_For_29_Template_button_click_0_listener($event) {
      const item_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      ctx_r2.toggleColumn(item_r7);
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
    const item_r7 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r7.isShow ? "check_box" : "check_box_outline_blank");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r7.value);
  }
}
function ListUserguideComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 27)(1, "div", 28)(2, "div", 29)(3, "div", 30)(4, "input", 31);
    \u0275\u0275listener("keyup", function ListUserguideComponent_div_5_Template_input_keyup_4_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.applyFilter($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 32)(6, "span", 33);
    \u0275\u0275text(7, "search");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(8, "span", 34);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "button", 35);
    \u0275\u0275listener("click", function ListUserguideComponent_div_5_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.create());
    });
    \u0275\u0275elementStart(11, "mat-icon");
    \u0275\u0275text(12, "add_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span", 36);
    \u0275\u0275text(14, "T\u1EA1o M\u1EDBi");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(15, ListUserguideComponent_div_5_button_15_Template, 5, 0, "button", 37);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 29)(17, "button", 38)(18, "mat-icon");
    \u0275\u0275text(19, "tune");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "mat-menu", null, 2)(22, "div", 39)(23, "mat-form-field", 40)(24, "input", 41);
    \u0275\u0275listener("input", function ListUserguideComponent_div_5_Template_input_input_24_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.doFilterColumns($event));
    })("click", function ListUserguideComponent_div_5_Template_input_click_24_listener($event) {
      \u0275\u0275restoreView(_r2);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "mat-icon", 42);
    \u0275\u0275text(26, "search");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(27, "div", 43);
    \u0275\u0275repeaterCreate(28, ListUserguideComponent_div_5_For_29_Template, 5, 2, "button", 44, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "button", 45);
    \u0275\u0275listener("click", function ListUserguideComponent_div_5_Template_button_click_30_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.ExportExcel(ctx_r2.Listuserguide(), "Menu"));
    });
    \u0275\u0275elementStart(31, "mat-icon");
    \u0275\u0275text(32, "file_download");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "button", 46);
    \u0275\u0275listener("click", function ListUserguideComponent_div_5_Template_button_click_33_listener() {
      \u0275\u0275restoreView(_r2);
      const uploadfile_r8 = \u0275\u0275reference(37);
      return \u0275\u0275resetView(uploadfile_r8.click());
    });
    \u0275\u0275elementStart(34, "mat-icon");
    \u0275\u0275text(35, "file_upload");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "input", 47, 5);
    \u0275\u0275listener("change", function ListUserguideComponent_div_5_Template_input_change_36_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.ImporExcel($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "button", 48);
    \u0275\u0275listener("click", function ListUserguideComponent_div_5_Template_button_click_38_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      const LoadDriveDialog_r9 = \u0275\u0275reference(46);
      return \u0275\u0275resetView(ctx_r2.OpenLoadDrive(LoadDriveDialog_r9));
    });
    \u0275\u0275elementStart(39, "mat-icon");
    \u0275\u0275text(40, "cloud_download");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const menu_r10 = \u0275\u0275reference(21);
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate1(" ", ctx_r2.Listuserguide().length, " Items ");
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", ctx_r2.EditList.length > 0);
    \u0275\u0275advance(2);
    \u0275\u0275property("matMenuTriggerFor", menu_r10);
    \u0275\u0275advance(11);
    \u0275\u0275repeater(ctx_r2.FilterColumns);
  }
}
function ListUserguideComponent_For_9_th_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "th", 53)(1, "span", 54);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "app-searchfilter", 55);
    \u0275\u0275listener("OutFilter", function ListUserguideComponent_For_9_th_1_Template_app_searchfilter_OutFilter_3_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.onOutFilter($event));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const column_r12 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.ColumnName[column_r12], " ");
    \u0275\u0275advance();
    \u0275\u0275property("icon", "filter_alt")("ListItem", ctx_r2.Listuserguide())("fieldsearch", column_r12)("ListFilter", ctx_r2.ListFilter)("filterItem", ctx_r2.FilterHederColumn(ctx_r2.dataSource.filteredData, column_r12));
  }
}
function ListUserguideComponent_For_9_td_2_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 59);
    \u0275\u0275listener("click", function ListUserguideComponent_For_9_td_2_Case_1_Template_span_click_0_listener() {
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
function ListUserguideComponent_For_9_td_2_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 58);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const idx_r15 = \u0275\u0275nextContext().index;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", idx_r15 + 1, " ");
  }
}
function ListUserguideComponent_For_9_td_2_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 58);
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
function ListUserguideComponent_For_9_td_2_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 58);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r14 = \u0275\u0275nextContext().$implicit;
    const column_r12 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r14[column_r12], "% ");
  }
}
function ListUserguideComponent_For_9_td_2_Case_5_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 60);
    \u0275\u0275text(1, "check_circle");
    \u0275\u0275elementEnd();
  }
}
function ListUserguideComponent_For_9_td_2_Case_5_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 61);
    \u0275\u0275text(1, "cancel");
    \u0275\u0275elementEnd();
  }
}
function ListUserguideComponent_For_9_td_2_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 58);
    \u0275\u0275template(1, ListUserguideComponent_For_9_td_2_Case_5_Conditional_1_Template, 2, 0, "mat-icon", 60)(2, ListUserguideComponent_For_9_td_2_Case_5_Conditional_2_Template, 2, 0, "mat-icon", 61);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r14 = \u0275\u0275nextContext().$implicit;
    const column_r12 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(row_r14[column_r12] ? 1 : 2);
  }
}
function ListUserguideComponent_For_9_td_2_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 58);
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
function ListUserguideComponent_For_9_td_2_Case_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 58);
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
function ListUserguideComponent_For_9_td_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 56);
    \u0275\u0275template(1, ListUserguideComponent_For_9_td_2_Case_1_Template, 2, 1, "span", 57)(2, ListUserguideComponent_For_9_td_2_Case_2_Template, 2, 1, "span", 58)(3, ListUserguideComponent_For_9_td_2_Case_3_Template, 3, 4, "span", 58)(4, ListUserguideComponent_For_9_td_2_Case_4_Template, 2, 1, "span", 58)(5, ListUserguideComponent_For_9_td_2_Case_5_Template, 3, 1, "span", 58)(6, ListUserguideComponent_For_9_td_2_Case_6_Template, 3, 4, "span", 58)(7, ListUserguideComponent_For_9_td_2_Case_7_Template, 2, 1, "span", 58);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_18_0;
    const column_r12 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_18_0 = column_r12) === "codeId" ? 1 : tmp_18_0 === "STT" ? 2 : tmp_18_0 === "createdAt" ? 3 : tmp_18_0 === "haohut" ? 4 : tmp_18_0 === "isActive" ? 5 : tmp_18_0 === "updatedAt" ? 6 : 7);
  }
}
function ListUserguideComponent_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0, 12);
    \u0275\u0275template(1, ListUserguideComponent_For_9_th_1_Template, 4, 6, "th", 51)(2, ListUserguideComponent_For_9_td_2_Template, 8, 1, "td", 52);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const column_r12 = ctx.$implicit;
    \u0275\u0275property("matColumnDef", column_r12);
  }
}
function ListUserguideComponent_tr_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 62);
  }
}
function ListUserguideComponent_tr_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 63);
    \u0275\u0275listener("click", function ListUserguideComponent_tr_11_Template_tr_click_0_listener() {
      const row_r17 = \u0275\u0275restoreView(_r16).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.AddToEdit(row_r17));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r17 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classMapInterpolate1("hover:bg-slate-100 ", ctx_r2.CheckItemInEdit(row_r17) ? "!bg-slate-200" : "", "");
  }
}
function ListUserguideComponent_tr_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 64)(1, "td", 65);
    \u0275\u0275text(2, "Kh\xF4ng t\xECm th\u1EA5y");
    \u0275\u0275elementEnd()();
  }
}
function ListUserguideComponent_ng_template_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-dialog-content")(1, "div", 66)(2, "div", 67);
    \u0275\u0275text(3, "X\xE1c Nh\u1EADn");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div");
    \u0275\u0275text(5, "B\u1EA1n ch\u1EAFc ch\u1EAFn mu\u1ED1n xo\xE1 kh\xF4ng?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 68)(7, "button", 69);
    \u0275\u0275text(8, "\u0110\u1ED3ng \xDD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 70);
    \u0275\u0275text(10, "Hu\u1EF7 B\u1ECF");
    \u0275\u0275elementEnd()()()();
  }
}
function ListUserguideComponent_ng_template_45_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-dialog-content", 71)(1, "div", 72)(2, "mat-form-field", 40)(3, "mat-label");
    \u0275\u0275text(4, "IdSheet");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "input", 73);
    \u0275\u0275twoWayListener("ngModelChange", function ListUserguideComponent_ng_template_45_Template_input_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r19);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.IdSheet, $event) || (ctx_r2.IdSheet = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "mat-form-field", 40)(7, "mat-label");
    \u0275\u0275text(8, "SheetName");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "input", 74);
    \u0275\u0275twoWayListener("ngModelChange", function ListUserguideComponent_ng_template_45_Template_input_ngModelChange_9_listener($event) {
      \u0275\u0275restoreView(_r19);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.SheetName, $event) || (ctx_r2.SheetName = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "button", 75);
    \u0275\u0275listener("click", function ListUserguideComponent_ng_template_45_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r19);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.LoadDrive());
    });
    \u0275\u0275elementStart(11, "mat-icon");
    \u0275\u0275text(12, "refresh");
    \u0275\u0275elementEnd()()();
    \u0275\u0275element(13, "div", 76);
    \u0275\u0275elementStart(14, "div", 77)(15, "button", 69);
    \u0275\u0275text(16, "\u0110\u1ED3ng \xDD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "button", 70);
    \u0275\u0275text(18, "Hu\u1EF7 B\u1ECF");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.IdSheet);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(4, _c1));
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.SheetName);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(5, _c1));
  }
}
var ListUserguideComponent = class _ListUserguideComponent {
  displayedColumns = [];
  ColumnName = {
    title: "Ti\xEAu \u0110\u1EC1",
    codeId: "M\xE3",
    time: "Th\u1EDDi Gian",
    description: "M\xF4 T\u1EA3",
    order: "Th\u1EE9 T\u1EF1",
    createdAt: "Ng\xE0y T\u1EA1o",
    updatedAt: "Ng\xE0y C\u1EADp Nh\u1EADt"
  };
  FilterColumns = JSON.parse(localStorage.getItem("UserguideColFilter") || "[]");
  Columns = [];
  totalItems = 0;
  pageSize = 10;
  currentPage = 1;
  totalPages = 1;
  paginator;
  sort;
  drawer;
  _UserguideService = inject(UserguideService);
  _breakpointObserver = inject(BreakpointObserver);
  _GoogleSheetService = inject(GoogleSheetService);
  _router = inject(Router);
  _dialog = inject(MatDialog);
  Listuserguide = this._UserguideService.ListUserguide;
  EditList = [];
  dataSource = new MatTableDataSource([]);
  userguideId = this._UserguideService.userguideId;
  _snackBar = inject(MatSnackBar);
  CountItem = 0;
  isSearch = false;
  constructor() {
    effect(() => {
      this.dataSource.data = this.Listuserguide();
      console.log(this.Listuserguide());
      this.totalItems = this.Listuserguide().length;
      this.calculateTotalPages();
    });
  }
  applyFilter(event) {
    const filterValue = event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngOnInit() {
    return __async(this, null, function* () {
      yield this._UserguideService.getAllUserguide();
      this.displayedColumns = Object.keys(this.ColumnName);
      console.log(this.displayedColumns);
      this.updateDisplayData();
      this.dataSource = new MatTableDataSource(this.Listuserguide());
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.initializeColumns();
      this.setupDrawer();
    });
  }
  refresh() {
    return __async(this, null, function* () {
      yield this._UserguideService.getAllUserguide();
    });
  }
  initializeColumns() {
    this.Columns = Object.keys(this.ColumnName).map((key) => ({
      key,
      value: this.ColumnName[key],
      isShow: true
    }));
    if (this.FilterColumns.length === 0) {
      this.FilterColumns = this.Columns;
    } else {
      localStorage.setItem("UserguideColFilter", JSON.stringify(this.FilterColumns));
    }
    this.displayedColumns = this.FilterColumns.filter((v) => v.isShow).map((item) => item.key);
    this.ColumnName = this.FilterColumns.reduce((obj, item) => {
      if (item.isShow)
        obj[item.key] = item.value;
      return obj;
    }, {});
  }
  setupDrawer() {
    this._breakpointObserver.observe([Breakpoints.Handset]).subscribe((result) => {
      if (result.matches) {
        this.drawer.mode = "over";
      } else {
        this.drawer.mode = "side";
      }
    });
  }
  toggleColumn(item) {
    const column = this.FilterColumns.find((v) => v.key === item.key);
    if (column) {
      column.isShow = !column.isShow;
      this.updateDisplayedColumns();
    }
  }
  FilterHederColumn(list, column) {
    const uniqueList = list.filter((obj, index, self) => index === self.findIndex((t) => t[column] === obj[column]));
    return uniqueList;
  }
  doFilterHederColumn(event, column) {
    this.dataSource.filteredData = this.Listuserguide().filter((v) => v[column].toLowerCase().includes(event.target.value.toLowerCase()));
    const query = event.target.value.toLowerCase();
  }
  ListFilter = [];
  ChosenItem(item, column) {
    const CheckItem = this.dataSource.filteredData.filter((v) => v[column] === item[column]);
    const CheckItem1 = this.ListFilter.filter((v) => v[column] === item[column]);
    if (CheckItem1.length > 0) {
      this.ListFilter = this.ListFilter.filter((v) => v[column] !== item[column]);
    } else {
      this.ListFilter = [...this.ListFilter, ...CheckItem];
    }
  }
  ChosenAll(list) {
    list.forEach((v) => {
      const CheckItem = this.ListFilter.find((v1) => v1.id === v.id) ? true : false;
      if (CheckItem) {
        this.ListFilter = this.ListFilter.filter((v2) => v2.id !== v2.id);
      } else {
        this.ListFilter.push(v);
      }
    });
  }
  ResetFilter() {
    this.ListFilter = this.Listuserguide();
  }
  EmptyFiter() {
    this.ListFilter = [];
  }
  CheckItem(item) {
    return this.ListFilter.find((v) => v.id === item.id) ? true : false;
  }
  ApplyFilterColum(menu) {
    this.dataSource.data = this.Listuserguide().filter((v) => this.ListFilter.some((v1) => v1.id === v.id));
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    menu.closeMenu();
  }
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
    localStorage.setItem("UserguideColFilter", JSON.stringify(this.FilterColumns));
  }
  doFilterColumns(event) {
    const query = event.target.value.toLowerCase();
    this.FilterColumns = this.Columns.filter((v) => v.value.toLowerCase().includes(query));
  }
  create() {
    this.drawer.open();
    this._router.navigate(["admin/userguide", "new"]);
  }
  openDeleteDialog(teamplate) {
    const dialogDeleteRef = this._dialog.open(teamplate, {
      hasBackdrop: true,
      disableClose: true
    });
    dialogDeleteRef.afterClosed().subscribe((result) => {
      if (result == "true") {
        this.DeleteListItem();
      }
    });
  }
  DeleteListItem() {
    this.EditList.forEach((item) => {
      this._UserguideService.DeleteUserguide(item);
    });
    this.EditList = [];
    this._snackBar.open("X\xF3a Th\xE0nh C\xF4ng", "", {
      duration: 1e3,
      horizontalPosition: "end",
      verticalPosition: "top",
      panelClass: ["snackbar-success"]
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
    this._UserguideService.setUserguideId(item.id);
    this._router.navigate(["admin/userguide", item.id]);
  }
  OpenLoadDrive(teamplate) {
    const dialogDeleteRef = this._dialog.open(teamplate, {
      hasBackdrop: true,
      disableClose: true
    });
    dialogDeleteRef.afterClosed().subscribe((result) => {
      if (result == "true") {
      }
    });
  }
  IdSheet = "15npo25qyH5FmfcEjl1uyqqyFMS_vdFnmxM_kt0KYmZk";
  SheetName = "SPImport";
  ImportIteam = [];
  ImportColumnName = {};
  ImportdisplayedColumns = [];
  LoadDrive() {
    return __async(this, null, function* () {
      const DriveInfo = {
        IdSheet: this.IdSheet,
        SheetName: this.SheetName,
        ApiKey: environment.GSApiKey
      };
      const result = yield this._GoogleSheetService.getDrive(DriveInfo);
      this.ImportIteam = ConvertDriveData(result.values);
      this.ImportColumnName = Object.fromEntries(result.values[0].map((key, i) => [key, result.values[1][i]]));
      this.ImportdisplayedColumns = result.values[0];
    });
  }
  DoImportData(data) {
    return __async(this, null, function* () {
      const transformedData = data.map((v) => ({
        title: v.title?.trim() || "",
        masp: v.masp?.trim() || "",
        giagoc: Number(v.giagoc) || 0,
        dvt: v.dvt?.trim() || "",
        soluong: Number(v.soluong) || 0,
        soluongkho: Number(v.soluongkho) || 0,
        haohut: Number(v.haohut) || 0,
        ghichu: v.ghichu?.trim() || ""
      }));
      const uniqueData = Array.from(new Map(transformedData.map((item) => [item.masp, item])).values());
      const existingUserguide = this._UserguideService.ListUserguide();
      const existingMasp = existingUserguide.map((v) => v.masp);
      const newMasp = uniqueData.map((v) => v.masp).filter((item) => !existingMasp.includes(item));
      yield Promise.all(uniqueData.map((v) => __async(this, null, function* () {
        const existingItem = existingUserguide.find((v1) => v1.masp === v.masp);
        if (existingItem) {
          const updatedItem = __spreadValues(__spreadValues({}, existingItem), v);
          yield this._UserguideService.updateUserguide(updatedItem);
        } else {
          yield this._UserguideService.CreateUserguide(v);
        }
      })));
      yield Promise.all(existingUserguide.filter((sp) => !uniqueData.some((item) => item.masp === sp.masp)).map((sp) => this._UserguideService.updateUserguide(__spreadProps(__spreadValues({}, sp), { isActive: false }))));
      this._snackBar.open("C\u1EADp Nh\u1EADt Th\xE0nh C\xF4ng", "", {
        duration: 1e3,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ["snackbar-success"]
      });
    });
  }
  ImporExcel(event) {
    return __async(this, null, function* () {
      const data = yield readExcelFile(event);
      this.DoImportData(data);
    });
  }
  ExportExcel(data, title) {
    const dulieu = data.map((v) => ({
      title: v.title,
      masp: v.masp,
      giagoc: v.giagoc,
      dvt: v.dvt,
      soluong: v.soluong,
      soluongkho: v.soluongkho,
      haohut: v.haohut,
      ghichu: v.ghichu
    }));
    writeExcelFile(dulieu, title);
  }
  trackByFn(index, item) {
    return item.id;
  }
  calculateTotalPages() {
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
  }
  onPageSizeChange(size, menuHienthi) {
    if (size > this.Listuserguide().length) {
      this.pageSize = this.Listuserguide().length;
      this._snackBar.open(`S\u1ED1 l\u01B0\u1EE3ng t\u1ED1i \u0111a ${this.Listuserguide().length}`, "", {
        duration: 1e3,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ["snackbar-success"]
      });
    } else {
      this.pageSize = size;
    }
    this.currentPage = 1;
    this.calculateTotalPages();
    this.updateDisplayData();
    menuHienthi.closeMenu();
  }
  onPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayData();
    }
  }
  onNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayData();
    }
  }
  updateDisplayData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    const pageData = this.Listuserguide().slice(startIndex, endIndex);
    this.dataSource.data = pageData;
  }
  static \u0275fac = function ListUserguideComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ListUserguideComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ListUserguideComponent, selectors: [["app-listuserguide"]], viewQuery: function ListUserguideComponent_Query(rf, ctx) {
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
  }, decls: 47, vars: 18, consts: [["drawer", ""], ["menuHienthi", "matMenuTrigger"], ["menu", "matMenu"], ["DeleteDialog", ""], ["LoadDriveDialog", ""], ["uploadfile", ""], ["autosize", "", 1, "w-full", "h-full"], ["mode", "over", 1, "flex", "flex-col", "!w-full", "h-full", 3, "position"], [1, "flex", "flex-col", "space-y-2", "h-screen-16", "w-full", "p-2"], ["class", "p-4 cursor-pointer w-full relative flex lg:flex-row lg:space-y-2 space-y-0 flex-col space-x-2 justify-between items-center bg-white rounded-lg", 4, "ngIf"], [1, "border", "rounded-lg", "w-full", "h-full", "overflow-auto"], ["mat-table", "", "matSort", "", 1, "!border", "w-full", "cursor-pointer", 3, "dataSource"], [3, "matColumnDef"], ["mat-header-row", "", 4, "matHeaderRowDef", "matHeaderRowDefSticky"], ["mat-row", "", 3, "class", "click", 4, "matRowDef", "matRowDefColumns"], ["class", "mat-row", 4, "matNoDataRow"], [1, "cursor-pointer", "border", "rounded-lg", "px-3", "p-1", "flex", "flex-row", "space-x-2", "items-center", "justify-between"], [1, "w-full", "flex", "lg:p-0", "p-2", "lg:flex-row", "lg:space-x-2", "lg:items-center", "lg:justify-between", "flex-col", "justify-center"], [1, "w-full", "text-center"], [1, "w-full", "flex", "flex-row", "space-x-2", "items-center", "lg:justify-end", "justify-center"], [1, "font-bold", "text-blue-600", 3, "matMenuTriggerFor"], [1, "w-full", "flex", "flex-col", "space-y-2", "p-4", 3, "click"], ["appearance", "outline", "subscriptSizing", "dynamic"], ["matInput", "", "placeholder", "Vui l\xF2ng Nh\u1EADp S\u1ED1 L\u01B0\u1EE3ng", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["mat-flat-button", "", "color", "primary", 3, "click"], [1, "pagination-controls"], ["mat-icon-button", "", "color", "primary", 3, "click", "disabled"], [1, "p-4", "cursor-pointer", "w-full", "relative", "flex", "lg:flex-row", "lg:space-y-2", "space-y-0", "flex-col", "space-x-2", "justify-between", "items-center", "bg-white", "rounded-lg"], [1, "w-full", "flex", "flex-col", "gap-2", "lg:flex-row", "lg:items-center", "lg:justify-between"], [1, "flex", "flex-row", "space-x-2", "items-center"], [1, "relative", "w-full"], ["type", "text", "placeholder", "T\xECm Ki\u1EBFm...", 1, "block", "w-full", "pl-10", "pr-4", "py-2", "text-gray-700", "bg-white", "border", "border-gray-300", "rounded-lg", "focus:border-blue-400", "focus:ring-blue-400", "focus:outline-none", "focus:ring", "focus:ring-opacity-40", 3, "keyup"], [1, "absolute", "inset-y-0", "left-0", "flex", "items-center", "pl-3", "pointer-events-none"], [1, "material-symbols-outlined", "text-gray-500"], [1, "lg:flex", "hidden", "whitespace-nowrap", "p-2", "rounded-lg", "bg-slate-200"], ["color", "primary", "matTooltip", "Th\xEAm m\u1EDBi", "mat-flat-button", "", 1, "flex", "flex-row", "items-center", 3, "click"], [1, "whitespace-nowrap"], ["class", "flex flex-row items-center", "color", "warn", "matTooltip", "Xo\xE1", "mat-flat-button", "", 3, "click", 4, "ngIf"], ["matTooltip", "\u1EA8n hi\u1EC7n c\u1ED9t", "mat-icon-button", "", "color", "primary", 3, "matMenuTriggerFor"], [1, "p-4"], ["appearance", "outline", "subscriptSizing", "dynamic", 1, "w-full"], ["matInput", "", "placeholder", "T\xECm Ki\u1EBFm", 3, "input", "click"], ["matPrefix", ""], [1, "flex", "flex-col", "max-h-80", "overflow-auto"], ["mat-menu-item", ""], ["matTooltip", "T\u1EA3i file excel M\u1EABu", "color", "primary", "mat-icon-button", "", 3, "click"], ["matTooltip", "T\u1EA3i l\xEAn file excel", "color", "primary", "mat-icon-button", "", 3, "click"], ["type", "file", 1, "hidden", 3, "change"], ["matTooltip", "T\u1EA3i d\u1EEF li\u1EC7u t\u1EEB drive", "color", "primary", "mat-icon-button", "", 3, "click"], ["color", "warn", "matTooltip", "Xo\xE1", "mat-flat-button", "", 1, "flex", "flex-row", "items-center", 3, "click"], ["mat-menu-item", "", 3, "click"], ["class", "whitespace-nowrap", "mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["mat-header-cell", "", "mat-sort-header", "", 1, "whitespace-nowrap"], [1, "max-w-40", "line-clamp-4", "me-4"], [3, "OutFilter", "icon", "ListItem", "fieldsearch", "ListFilter", "filterItem"], ["mat-cell", ""], [1, "max-w-40", "line-clamp-4", "font-bold", "text-blue-600"], [1, "max-w-40", "line-clamp-4"], [1, "max-w-40", "line-clamp-4", "font-bold", "text-blue-600", 3, "click"], [1, "text-green-500"], [1, "text-red-500"], ["mat-header-row", ""], ["mat-row", "", 3, "click"], [1, "mat-row"], ["colspan", "4", 1, "mat-cell", "p-4"], [1, "flex", "flex-col", "space-y-8", "items-center", "justify-center"], [1, "font-bold"], [1, "flex", "flex-row", "space-x-2", "items-center", "justify-center"], ["mat-flat-button", "", "color", "primary", "mat-dialog-close", "true"], ["mat-flat-button", "", "color", "warn", "mat-dialog-close", "false"], [1, "!w-screen", "!h-screen", "!max-h-screen", "!relative", "!flex", "flex-col", "space-y-8", "items-center", "justify-center"], [1, "relative", "flex", "flex-row", "space-x-2", "items-center"], ["matInput", "", "placeholder", "Vui l\xF2ng Nh\u1EADp IdSheet", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["matInput", "", "placeholder", "Vui l\xF2ng Nh\u1EADp SheetName", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["matTooltip", "Load D\u1EEF Li\u1EC7u", "color", "primary", "mat-icon-button", "", 3, "click"], [1, "relative", "h-full", "w-full", "overflow-auto"], [1, "relative", "flex", "flex-row", "space-x-2", "items-center", "justify-center"]], template: function ListUserguideComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "mat-drawer-container", 6)(1, "mat-drawer", 7, 0);
      \u0275\u0275element(3, "router-outlet");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 8);
      \u0275\u0275template(5, ListUserguideComponent_div_5_Template, 41, 3, "div", 9);
      \u0275\u0275elementStart(6, "div", 10)(7, "table", 11);
      \u0275\u0275repeaterCreate(8, ListUserguideComponent_For_9_Template, 3, 1, "ng-container", 12, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275template(10, ListUserguideComponent_tr_10_Template, 1, 0, "tr", 13)(11, ListUserguideComponent_tr_11_Template, 1, 3, "tr", 14)(12, ListUserguideComponent_tr_12_Template, 3, 0, "tr", 15);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(13, "div", 16)(14, "div", 17)(15, "span", 18);
      \u0275\u0275text(16, "\u0110ang Xem ");
      \u0275\u0275elementStart(17, "strong");
      \u0275\u0275text(18);
      \u0275\u0275elementEnd();
      \u0275\u0275text(19, " - ");
      \u0275\u0275elementStart(20, "strong");
      \u0275\u0275text(21);
      \u0275\u0275elementEnd();
      \u0275\u0275text(22);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "div", 19)(24, "span", 20, 1);
      \u0275\u0275text(26);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "mat-menu", null, 2)(29, "div", 21);
      \u0275\u0275listener("click", function ListUserguideComponent_Template_div_click_29_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView($event.stopPropagation());
      });
      \u0275\u0275elementStart(30, "span");
      \u0275\u0275text(31, "S\u1ED1 L\u01B0\u1EE3ng");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "mat-form-field", 22)(33, "input", 23);
      \u0275\u0275twoWayListener("ngModelChange", function ListUserguideComponent_Template_input_ngModelChange_33_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.pageSize, $event) || (ctx.pageSize = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(34, "button", 24);
      \u0275\u0275listener("click", function ListUserguideComponent_Template_button_click_34_listener() {
        \u0275\u0275restoreView(_r1);
        const menuHienthi_r18 = \u0275\u0275reference(25);
        return \u0275\u0275resetView(ctx.onPageSizeChange(ctx.pageSize, menuHienthi_r18));
      });
      \u0275\u0275text(35, "\xC1p D\u1EE5ng");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(36, "div", 25)(37, "button", 26);
      \u0275\u0275listener("click", function ListUserguideComponent_Template_button_click_37_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onPreviousPage());
      });
      \u0275\u0275elementStart(38, "mat-icon");
      \u0275\u0275text(39, "keyboard_arrow_left");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(40, "button", 26);
      \u0275\u0275listener("click", function ListUserguideComponent_Template_button_click_40_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onNextPage());
      });
      \u0275\u0275elementStart(41, "mat-icon");
      \u0275\u0275text(42, "keyboard_arrow_right");
      \u0275\u0275elementEnd()()()()()()()();
      \u0275\u0275template(43, ListUserguideComponent_ng_template_43_Template, 11, 0, "ng-template", null, 3, \u0275\u0275templateRefExtractor)(45, ListUserguideComponent_ng_template_45_Template, 19, 6, "ng-template", null, 4, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      const menu_r20 = \u0275\u0275reference(28);
      \u0275\u0275advance();
      \u0275\u0275property("position", "end");
      \u0275\u0275advance(4);
      \u0275\u0275property("ngIf", !ctx.isSearch);
      \u0275\u0275advance(2);
      \u0275\u0275property("dataSource", ctx.dataSource);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.displayedColumns);
      \u0275\u0275advance(2);
      \u0275\u0275property("matHeaderRowDef", ctx.displayedColumns)("matHeaderRowDefSticky", true);
      \u0275\u0275advance();
      \u0275\u0275property("matRowDefColumns", ctx.displayedColumns);
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate((ctx.currentPage - 1) * ctx.pageSize + 1);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.currentPage * ctx.pageSize > ctx.totalItems ? ctx.totalItems : ctx.currentPage * ctx.pageSize);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate3(" trong s\u1ED1 ", ctx.totalItems, " m\u1EE5c, ", ctx.currentPage, "/", ctx.totalPages, " Trang");
      \u0275\u0275advance(2);
      \u0275\u0275property("matMenuTriggerFor", menu_r20);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("Hi\u1EC7n Th\u1ECB : ", ctx.pageSize, " m\u1EE5c");
      \u0275\u0275advance(7);
      \u0275\u0275twoWayProperty("ngModel", ctx.pageSize);
      \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(17, _c1));
      \u0275\u0275advance(4);
      \u0275\u0275property("disabled", ctx.currentPage === 1);
      \u0275\u0275advance(3);
      \u0275\u0275property("disabled", ctx.currentPage === ctx.totalPages);
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
    CommonModule,
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
    SearchfilterComponent
  ], encapsulation: 2, changeDetection: 0 });
};
__decorate([
  memoize()
], ListUserguideComponent.prototype, "FilterHederColumn", null);
__decorate([
  Debounce(300)
], ListUserguideComponent.prototype, "doFilterHederColumn", null);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ListUserguideComponent, { className: "ListUserguideComponent", filePath: "src/app/admin/userguide/listuserguide/listuserguide.component.ts", lineNumber: 49 });
})();
function memoize() {
  return function(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    const cache = /* @__PURE__ */ new Map();
    descriptor.value = function(...args) {
      const key = JSON.stringify(args);
      if (cache.has(key)) {
        return cache.get(key);
      }
      const result = originalMethod.apply(this, args);
      cache.set(key, result);
      return result;
    };
    return descriptor;
  };
}
function Debounce(delay = 300) {
  return function(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    let timeoutId;
    descriptor.value = function(...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        originalMethod.apply(this, args);
      }, delay);
    };
    return descriptor;
  };
}

export {
  ListUserguideComponent
};
//# sourceMappingURL=chunk-BDRQ5UGC.js.map
