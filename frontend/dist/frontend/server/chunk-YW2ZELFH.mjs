import './polyfills.server.mjs';
import {
  TrangThaiDon
} from "./chunk-CY65G3O7.mjs";
import {
  MatAutocomplete,
  MatAutocompleteModule,
  MatAutocompleteTrigger
} from "./chunk-7YHWB3DF.mjs";
import {
  DathangService
} from "./chunk-6C4QP5HU.mjs";
import {
  html2canvas_esm_default
} from "./chunk-4WFBNVB3.mjs";
import {
  GoogleSheetService
} from "./chunk-QE2YIIVZ.mjs";
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
  readExcelFile
} from "./chunk-XQWRZCE6.mjs";
import {
  require_xlsx_min
} from "./chunk-WJ6GNNQZ.mjs";
import {
  require_moment
} from "./chunk-TEMMKMG5.mjs";
import {
  GenId,
  convertToSlug
} from "./chunk-OLFDOXYK.mjs";
import {
  removeVietnameseAccents
} from "./chunk-RGTCKLO2.mjs";
import {
  MatDrawer,
  MatDrawerContainer,
  MatSidenavModule
} from "./chunk-AESSWZ4W.mjs";
import {
  MatMenu,
  MatMenuItem,
  MatMenuModule,
  MatMenuTrigger
} from "./chunk-JNHRISVT.mjs";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "./chunk-NU7WWMYS.mjs";
import {
  Router,
  RouterOutlet
} from "./chunk-HRPVH7WR.mjs";
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
} from "./chunk-VF45CXPP.mjs";
import {
  GraphqlService
} from "./chunk-3I55OMWU.mjs";
import {
  MatChip,
  MatChipRemove,
  MatChipSet,
  MatChipsModule
} from "./chunk-UMQUK2UX.mjs";
import {
  MatTooltip,
  MatTooltipModule
} from "./chunk-LPLDGY7B.mjs";
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle
} from "./chunk-E2GALVII.mjs";
import {
  MatSelectModule
} from "./chunk-GDGUHJEW.mjs";
import {
  MatInput,
  MatInputModule
} from "./chunk-UCMTPX2K.mjs";
import {
  DefaultValueAccessor,
  FormsModule,
  MatFormField,
  MatFormFieldModule,
  MatLabel,
  MatPrefix,
  MatSuffix,
  NgControlStatus,
  NgModel
} from "./chunk-VDRWKQ4T.mjs";
import {
  MatIcon,
  MatIconModule
} from "./chunk-27SFIHK6.mjs";
import {
  MatSnackBar
} from "./chunk-DZ43XGSB.mjs";
import {
  MatButton,
  MatButtonModule,
  MatIconButton
} from "./chunk-RDBGA3AP.mjs";
import {
  BreakpointObserver,
  Breakpoints,
  MatOption
} from "./chunk-KWDBPYQT.mjs";
import {
  CommonModule,
  DatePipe,
  DecimalPipe,
  NgClass,
  NgForOf,
  NgIf
} from "./chunk-VNUZ7HP6.mjs";
import {
  inject,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMapInterpolate1,
  ɵɵclassProp,
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
  ɵɵpropertyInterpolate,
  ɵɵpureFunction0,
  ɵɵpureFunction5,
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
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-6NXY6CBU.mjs";
import {
  __decorate
} from "./chunk-QS2IQGEQ.mjs";
import {
  __async,
  __spreadProps,
  __spreadValues,
  __toESM
} from "./chunk-FMEBT56H.mjs";

// src/app/admin/congnoncc/listcongnoncc/listcongnoncc.component.ts
var XLSX = __toESM(require_xlsx_min());
var import_moment = __toESM(require_moment());
var _c0 = ["drawer"];
var _c1 = () => ({ standalone: true });
var _c2 = (a0, a1, a2, a3, a4) => ({ "text-blue-500": a0, "text-yellow-500": a1, "text-green-500": a2, "text-purple-500": a3, "text-red-500": a4 });
var _forTrack0 = ($index, $item) => $item.key;
function ListcongnonccComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 44)(1, "div", 45);
    \u0275\u0275element(2, "div", 46);
    \u0275\u0275elementStart(3, "span", 47);
    \u0275\u0275text(4, "\u0110ang t\u1EA3i d\u1EEF li\u1EC7u...");
    \u0275\u0275elementEnd()()();
  }
}
function ListcongnonccComponent_div_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 48);
    \u0275\u0275element(1, "div", 49);
    \u0275\u0275elementEnd();
  }
}
function ListcongnonccComponent_div_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 48);
    \u0275\u0275element(1, "div", 49);
    \u0275\u0275elementEnd();
  }
}
function ListcongnonccComponent_For_61_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 26);
    \u0275\u0275listener("click", function ListcongnonccComponent_For_61_Template_button_click_0_listener($event) {
      const item_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r4 = \u0275\u0275nextContext();
      ctx_r4.toggleColumn(item_r4);
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
    const item_r4 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r4.isShow ? "check_box" : "check_box_outline_blank");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r4.value);
  }
}
function ListcongnonccComponent_Conditional_65_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-chip", 61);
    \u0275\u0275listener("removed", function ListcongnonccComponent_Conditional_65_For_7_Template_mat_chip_removed_0_listener() {
      const nhomKH_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.removeSelectedNhomcongnoncc(nhomKH_r8));
    });
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 62)(4, "mat-icon");
    \u0275\u0275text(5, "cancel");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const nhomKH_r8 = ctx.$implicit;
    \u0275\u0275property("removable", true);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(typeof nhomKH_r8 === "string" ? nhomKH_r8 : nhomKH_r8.name);
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-label", "X\xF3a " + (typeof nhomKH_r8 === "string" ? nhomKH_r8 : nhomKH_r8.name));
  }
}
function ListcongnonccComponent_Conditional_65_For_13_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 64);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const option_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(option_r9.description);
  }
}
function ListcongnonccComponent_Conditional_65_For_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 57)(1, "span", 63);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, ListcongnonccComponent_Conditional_65_For_13_Conditional_3_Template, 2, 1, "small", 64);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const option_r9 = ctx.$implicit;
    \u0275\u0275property("value", typeof option_r9 === "string" ? option_r9 : option_r9.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(typeof option_r9 === "string" ? option_r9 : option_r9.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(typeof option_r9 !== "string" && option_r9.description ? 3 : -1);
  }
}
function ListcongnonccComponent_Conditional_65_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 65);
    \u0275\u0275listener("click", function ListcongnonccComponent_Conditional_65_Conditional_14_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.clearAllSelectedNhomCongnoncc());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "close");
    \u0275\u0275elementEnd()();
  }
}
function ListcongnonccComponent_Conditional_65_For_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-chip", 61);
    \u0275\u0275listener("removed", function ListcongnonccComponent_Conditional_65_For_21_Template_mat_chip_removed_0_listener() {
      const customer_r12 = \u0275\u0275restoreView(_r11).$implicit;
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.removeSelectedCustomer(customer_r12));
    });
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 62)(4, "mat-icon");
    \u0275\u0275text(5, "cancel");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const customer_r12 = ctx.$implicit;
    \u0275\u0275property("removable", true);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(typeof customer_r12 === "string" ? customer_r12 : customer_r12.name);
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-label", "X\xF3a " + (typeof customer_r12 === "string" ? customer_r12 : customer_r12.name));
  }
}
function ListcongnonccComponent_Conditional_65_For_27_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 64);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const option_r13 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("M\xE3 KH: ", option_r13.makh, "");
  }
}
function ListcongnonccComponent_Conditional_65_For_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 57)(1, "span", 63);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, ListcongnonccComponent_Conditional_65_For_27_Conditional_3_Template, 2, 1, "small", 64);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const option_r13 = ctx.$implicit;
    \u0275\u0275property("value", typeof option_r13 === "string" ? option_r13 : option_r13.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(typeof option_r13 === "string" ? option_r13 : option_r13.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(typeof option_r13 !== "string" && option_r13.makh ? 3 : -1);
  }
}
function ListcongnonccComponent_Conditional_65_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 66);
    \u0275\u0275listener("click", function ListcongnonccComponent_Conditional_65_Conditional_28_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.clearAllSelectedCustomers());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "close");
    \u0275\u0275elementEnd()();
  }
}
function ListcongnonccComponent_Conditional_65_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 36)(1, "div", 50)(2, "div", 51);
    \u0275\u0275text(3, "Nh\xF3m Nh\xE0 Cung C\u1EA5p ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "mat-form-field", 52)(5, "mat-chip-set", 53);
    \u0275\u0275repeaterCreate(6, ListcongnonccComponent_Conditional_65_For_7_Template, 6, 3, "mat-chip", 54, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "input", 55, 7);
    \u0275\u0275listener("keyup", function ListcongnonccComponent_Conditional_65_Template_input_keyup_8_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.doFilterNhomCongnoncc($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "mat-autocomplete", 56, 8);
    \u0275\u0275listener("optionSelected", function ListcongnonccComponent_Conditional_65_Template_mat_autocomplete_optionSelected_10_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.onNhomCongnonccSelected($event));
    });
    \u0275\u0275repeaterCreate(12, ListcongnonccComponent_Conditional_65_For_13_Template, 4, 3, "mat-option", 57, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275template(14, ListcongnonccComponent_Conditional_65_Conditional_14_Template, 3, 0, "button", 58);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 50)(16, "div", 51);
    \u0275\u0275text(17, "Nh\xE0 Cung C\u1EA5p ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "mat-form-field", 52)(19, "mat-chip-set", 59);
    \u0275\u0275repeaterCreate(20, ListcongnonccComponent_Conditional_65_For_21_Template, 6, 3, "mat-chip", 54, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "input", 55, 9);
    \u0275\u0275listener("keyup", function ListcongnonccComponent_Conditional_65_Template_input_keyup_22_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.doFilterCongnoncc($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "mat-autocomplete", 56, 10);
    \u0275\u0275listener("optionSelected", function ListcongnonccComponent_Conditional_65_Template_mat_autocomplete_optionSelected_24_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.onCustomerSelected($event));
    });
    \u0275\u0275repeaterCreate(26, ListcongnonccComponent_Conditional_65_For_27_Template, 4, 3, "mat-option", 57, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275template(28, ListcongnonccComponent_Conditional_65_Conditional_28_Template, 3, 0, "button", 60);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const autoNhom_r15 = \u0275\u0275reference(11);
    const auto_r16 = \u0275\u0275reference(25);
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("appearance", "outline")("subscriptSizing", "dynamic");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r4.SelectedNhomCongnoncc);
    \u0275\u0275advance(2);
    \u0275\u0275propertyInterpolate("placeholder", ctx_r4.SelectedNhomCongnoncc.length === 0 ? "T\xECm v\xE0 ch\u1ECDn nhi\u1EC1u nh\xF3m nh\xE0 cung c\u1EA5p" : "Th\xEAm nh\xF3m nh\xE0 cung c\u1EA5p");
    \u0275\u0275property("matAutocomplete", autoNhom_r15);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r4.filterListNhomCongnoncc);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r4.SelectedNhomCongnoncc.length > 0 ? 14 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275property("appearance", "outline")("subscriptSizing", "dynamic");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r4.SelectedCongnoncc);
    \u0275\u0275advance(2);
    \u0275\u0275propertyInterpolate("placeholder", ctx_r4.SelectedCongnoncc.length === 0 ? "T\xECm v\xE0 ch\u1ECDn nhi\u1EC1u nh\xE0 cung c\u1EA5p" : "Th\xEAm nh\xE0 cung c\u1EA5p");
    \u0275\u0275property("matAutocomplete", auto_r16);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r4.filterListCongnoncc);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r4.SelectedCongnoncc.length > 0 ? 28 : -1);
  }
}
function ListcongnonccComponent_div_67_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 67)(1, "div", 45);
    \u0275\u0275element(2, "div", 68);
    \u0275\u0275elementStart(3, "span", 69);
    \u0275\u0275text(4, "\u0110ang t\u1EA3i d\u1EEF li\u1EC7u...");
    \u0275\u0275elementEnd()()();
  }
}
function ListcongnonccComponent_For_70_th_1_div_23_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 90);
    \u0275\u0275text(1, "check");
    \u0275\u0275elementEnd();
  }
}
function ListcongnonccComponent_For_70_th_1_div_23_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r20 = \u0275\u0275nextContext().$implicit;
    const column_r18 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, item_r20[column_r18], "dd/MM/yyyy"));
  }
}
function ListcongnonccComponent_For_70_th_1_div_23_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r20 = \u0275\u0275nextContext().$implicit;
    const column_r18 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, item_r20[column_r18], "dd/MM/yyyy"));
  }
}
function ListcongnonccComponent_For_70_th_1_div_23_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r20 = \u0275\u0275nextContext().$implicit;
    const column_r18 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, item_r20[column_r18], "dd/MM/yyyy"));
  }
}
function ListcongnonccComponent_For_70_th_1_div_23_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r20 = \u0275\u0275nextContext().$implicit;
    const column_r18 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", item_r20[column_r18], "%");
  }
}
function ListcongnonccComponent_For_70_th_1_div_23_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r20 = \u0275\u0275nextContext().$implicit;
    const column_r18 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r20[column_r18] || "Tr\u1ED1ng", "");
  }
}
function ListcongnonccComponent_For_70_th_1_div_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 88);
    \u0275\u0275listener("click", function ListcongnonccComponent_For_70_th_1_div_23_Template_div_click_0_listener() {
      const item_r20 = \u0275\u0275restoreView(_r19).$implicit;
      const column_r18 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.ChosenItem(item_r20, column_r18));
    });
    \u0275\u0275template(1, ListcongnonccComponent_For_70_th_1_div_23_span_1_Template, 2, 0, "span", 89)(2, ListcongnonccComponent_For_70_th_1_div_23_Case_2_Template, 3, 4, "span")(3, ListcongnonccComponent_For_70_th_1_div_23_Case_3_Template, 3, 4, "span")(4, ListcongnonccComponent_For_70_th_1_div_23_Case_4_Template, 3, 4, "span")(5, ListcongnonccComponent_For_70_th_1_div_23_Case_5_Template, 2, 1, "span")(6, ListcongnonccComponent_For_70_th_1_div_23_Case_6_Template, 2, 1, "span");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_23_0;
    const item_r20 = ctx.$implicit;
    const column_r18 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r4.CheckItem(item_r20));
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_23_0 = column_r18) === "createdAt" ? 2 : tmp_23_0 === "updatedAt" ? 3 : tmp_23_0 === "ngaynhan" ? 4 : tmp_23_0 === "haohut" ? 5 : 6);
  }
}
function ListcongnonccComponent_For_70_th_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "th", 72)(1, "span", 73);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 74, 11);
    \u0275\u0275text(5, " filter_alt ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "mat-menu", null, 4)(8, "div", 75);
    \u0275\u0275listener("click", function ListcongnonccComponent_For_70_th_1_Template_div_click_8_listener($event) {
      \u0275\u0275restoreView(_r17);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(9, "div", 76)(10, "input", 77);
    \u0275\u0275listener("keyup", function ListcongnonccComponent_For_70_th_1_Template_input_keyup_10_listener($event) {
      \u0275\u0275restoreView(_r17);
      const column_r18 = \u0275\u0275nextContext().$implicit;
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.doFilterHederColumn($event, column_r18));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 78)(12, "span", 79);
    \u0275\u0275text(13, "search");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "div", 80)(15, "div", 81)(16, "span", 82);
    \u0275\u0275listener("click", function ListcongnonccComponent_For_70_th_1_Template_span_click_16_listener() {
      \u0275\u0275restoreView(_r17);
      const column_r18 = \u0275\u0275nextContext().$implicit;
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.ChosenAll(ctx_r4.FilterHederColumn(ctx_r4.dataSource.filteredData, column_r18)));
    });
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "span", 82);
    \u0275\u0275listener("click", function ListcongnonccComponent_For_70_th_1_Template_span_click_18_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.EmptyFiter());
    });
    \u0275\u0275text(19, "Xo\xE1");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "span", 82);
    \u0275\u0275listener("click", function ListcongnonccComponent_For_70_th_1_Template_span_click_20_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.ResetFilter());
    });
    \u0275\u0275text(21, "Reset");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 83);
    \u0275\u0275template(23, ListcongnonccComponent_For_70_th_1_div_23_Template, 7, 2, "div", 84);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div", 85)(25, "button", 86);
    \u0275\u0275listener("click", function ListcongnonccComponent_For_70_th_1_Template_button_click_25_listener() {
      \u0275\u0275restoreView(_r17);
      const menuTrigger_r21 = \u0275\u0275reference(4);
      return \u0275\u0275resetView(menuTrigger_r21.closeMenu());
    });
    \u0275\u0275text(26, " \u0110\xF3ng ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "button", 87);
    \u0275\u0275listener("click", function ListcongnonccComponent_For_70_th_1_Template_button_click_27_listener() {
      \u0275\u0275restoreView(_r17);
      const menuTrigger_r21 = \u0275\u0275reference(4);
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.ApplyFilterColum(menuTrigger_r21));
    });
    \u0275\u0275text(28, " \xC1p D\u1EE5ng ");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const menu_r22 = \u0275\u0275reference(7);
    const column_r18 = \u0275\u0275nextContext().$implicit;
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r4.ColumnName[column_r18], " ");
    \u0275\u0275advance();
    \u0275\u0275property("matMenuTriggerFor", menu_r22);
    \u0275\u0275advance(14);
    \u0275\u0275textInterpolate1("Ch\u1ECDn T\u1EA5t C\u1EA3 ", ctx_r4.FilterHederColumn(ctx_r4.dataSource.filteredData, column_r18).length || 0, "");
    \u0275\u0275advance(6);
    \u0275\u0275property("ngForOf", ctx_r4.FilterHederColumn(ctx_r4.dataSource.filteredData, column_r18))("ngForTrackBy", ctx_r4.trackByFn);
  }
}
function ListcongnonccComponent_For_70_td_2_Case_1_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 100);
    \u0275\u0275text(1, "check_box");
    \u0275\u0275elementEnd();
  }
}
function ListcongnonccComponent_For_70_td_2_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 98);
    \u0275\u0275listener("click", function ListcongnonccComponent_For_70_td_2_Case_1_Template_span_click_0_listener() {
      \u0275\u0275restoreView(_r23);
      const row_r24 = \u0275\u0275nextContext().$implicit;
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.toggleDathang(row_r24));
    });
    \u0275\u0275text(1);
    \u0275\u0275template(2, ListcongnonccComponent_For_70_td_2_Case_1_span_2_Template, 2, 0, "span", 99);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r24 = \u0275\u0275nextContext();
    const row_r24 = ctx_r24.$implicit;
    const idx_r26 = ctx_r24.index;
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", idx_r26 + 1, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r4.CheckItemInDathang(row_r24));
  }
}
function ListcongnonccComponent_For_70_td_2_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 93);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r24 = \u0275\u0275nextContext().$implicit;
    const column_r18 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r24[column_r18], " ");
  }
}
function ListcongnonccComponent_For_70_td_2_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 94);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r24 = \u0275\u0275nextContext().$implicit;
    const column_r18 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r24[column_r18], "HH:mm:ss dd/MM/yyyy"), " ");
  }
}
function ListcongnonccComponent_For_70_td_2_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 95);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r24 = \u0275\u0275nextContext().$implicit;
    const column_r18 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r24[column_r18], "dd/MM/yyyy"), " ");
  }
}
function ListcongnonccComponent_For_70_td_2_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 95);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r24 = \u0275\u0275nextContext().$implicit;
    const column_r18 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r24[column_r18].name, " ");
  }
}
function ListcongnonccComponent_For_70_td_2_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 96);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r24 = \u0275\u0275nextContext().$implicit;
    const column_r18 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r24[column_r18], " ");
  }
}
function ListcongnonccComponent_For_70_td_2_Case_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 96);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r24 = \u0275\u0275nextContext().$implicit;
    const column_r18 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r24[column_r18], "1.0-3"), " ");
  }
}
function ListcongnonccComponent_For_70_td_2_Case_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 96);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r24 = \u0275\u0275nextContext().$implicit;
    const column_r18 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r24[column_r18], "1.0-3"), " ");
  }
}
function ListcongnonccComponent_For_70_td_2_Case_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 96);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r24 = \u0275\u0275nextContext().$implicit;
    const column_r18 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r24[column_r18], "1.0-3"), " ");
  }
}
function ListcongnonccComponent_For_70_td_2_Case_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 96);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r24 = \u0275\u0275nextContext().$implicit;
    const column_r18 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r24[column_r18], "1.0-3"), " ");
  }
}
function ListcongnonccComponent_For_70_td_2_Case_11_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 101);
    \u0275\u0275text(1, "check_circle");
    \u0275\u0275elementEnd();
  }
}
function ListcongnonccComponent_For_70_td_2_Case_11_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 102);
    \u0275\u0275text(1, "cancel");
    \u0275\u0275elementEnd();
  }
}
function ListcongnonccComponent_For_70_td_2_Case_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 95);
    \u0275\u0275template(1, ListcongnonccComponent_For_70_td_2_Case_11_Conditional_1_Template, 2, 0, "mat-icon", 101)(2, ListcongnonccComponent_For_70_td_2_Case_11_Conditional_2_Template, 2, 0, "mat-icon", 102);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r24 = \u0275\u0275nextContext().$implicit;
    const column_r18 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(row_r24[column_r18] ? 1 : 2);
  }
}
function ListcongnonccComponent_For_70_td_2_Case_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 97);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r24 = \u0275\u0275nextContext().$implicit;
    const column_r18 = \u0275\u0275nextContext().$implicit;
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction5(2, _c2, row_r24[column_r18] === "dadat", row_r24[column_r18] === "dagiao", row_r24[column_r18] === "danhan", row_r24[column_r18] === "hoanthanh", row_r24[column_r18] === "huy"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r4.Trangthaidon[row_r24[column_r18]], " ");
  }
}
function ListcongnonccComponent_For_70_td_2_Case_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 94);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r24 = \u0275\u0275nextContext().$implicit;
    const column_r18 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r24[column_r18], "HH:mm:ss dd/MM/yyyy"), " ");
  }
}
function ListcongnonccComponent_For_70_td_2_Case_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 95);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r24 = \u0275\u0275nextContext().$implicit;
    const column_r18 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r24[column_r18], " ");
  }
}
function ListcongnonccComponent_For_70_td_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 91);
    \u0275\u0275template(1, ListcongnonccComponent_For_70_td_2_Case_1_Template, 3, 2, "span", 92)(2, ListcongnonccComponent_For_70_td_2_Case_2_Template, 2, 1, "span", 93)(3, ListcongnonccComponent_For_70_td_2_Case_3_Template, 3, 4, "span", 94)(4, ListcongnonccComponent_For_70_td_2_Case_4_Template, 3, 4, "span", 95)(5, ListcongnonccComponent_For_70_td_2_Case_5_Template, 2, 1, "span", 95)(6, ListcongnonccComponent_For_70_td_2_Case_6_Template, 2, 1, "span", 96)(7, ListcongnonccComponent_For_70_td_2_Case_7_Template, 3, 4, "span", 96)(8, ListcongnonccComponent_For_70_td_2_Case_8_Template, 3, 4, "span", 96)(9, ListcongnonccComponent_For_70_td_2_Case_9_Template, 3, 4, "span", 96)(10, ListcongnonccComponent_For_70_td_2_Case_10_Template, 3, 4, "span", 96)(11, ListcongnonccComponent_For_70_td_2_Case_11_Template, 3, 1, "span", 95)(12, ListcongnonccComponent_For_70_td_2_Case_12_Template, 2, 8, "span", 97)(13, ListcongnonccComponent_For_70_td_2_Case_13_Template, 3, 4, "span", 94)(14, ListcongnonccComponent_For_70_td_2_Case_14_Template, 2, 1, "span", 95);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_20_0;
    const column_r18 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_20_0 = column_r18) === "STT" ? 1 : tmp_20_0 === "madathang" ? 2 : tmp_20_0 === "createdAt" ? 3 : tmp_20_0 === "ngaynhan" ? 4 : tmp_20_0 === "congnoncc" ? 5 : tmp_20_0 === "dvt" ? 6 : tmp_20_0 === "soluong" ? 7 : tmp_20_0 === "tong" ? 8 : tmp_20_0 === "tongvat" ? 9 : tmp_20_0 === "tongtien" ? 10 : tmp_20_0 === "isActive" ? 11 : tmp_20_0 === "status" ? 12 : tmp_20_0 === "updatedAt" ? 13 : 14);
  }
}
function ListcongnonccComponent_For_70_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0, 40);
    \u0275\u0275template(1, ListcongnonccComponent_For_70_th_1_Template, 29, 5, "th", 70)(2, ListcongnonccComponent_For_70_td_2_Template, 15, 1, "td", 71);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const column_r18 = ctx.$implicit;
    \u0275\u0275property("matColumnDef", column_r18);
  }
}
function ListcongnonccComponent_tr_71_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 103);
  }
}
function ListcongnonccComponent_tr_72_Template(rf, ctx) {
  if (rf & 1) {
    const _r27 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 104);
    \u0275\u0275listener("click", function ListcongnonccComponent_tr_72_Template_tr_click_0_listener() {
      const row_r28 = \u0275\u0275restoreView(_r27).$implicit;
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.toggleDathang(row_r28));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r28 = ctx.$implicit;
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275classMapInterpolate1("hover:bg-slate-100 ", ctx_r4.CheckItemInDathang(row_r28) ? "!bg-slate-200" : "", "");
  }
}
function ListcongnonccComponent_tr_73_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 108)(1, "div", 109)(2, "mat-icon", 110);
    \u0275\u0275text(3, "search_off");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "span", 111);
    \u0275\u0275text(5, "Kh\xF4ng t\xECm th\u1EA5y d\u1EEF li\u1EC7u");
    \u0275\u0275elementEnd()();
  }
}
function ListcongnonccComponent_tr_73_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 105)(1, "td", 106);
    \u0275\u0275template(2, ListcongnonccComponent_tr_73_div_2_Template, 6, 0, "div", 107);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275attribute("colspan", ctx_r4.displayedColumns.length);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r4.isLoading);
  }
}
function ListcongnonccComponent_ng_template_74_ng_container_34_tr_1_td_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 125);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r30 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275attribute("rowspan", item_r30.sanpham.length);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 2, item_r30.ngaynhan, "dd/MM/yyyy"), " ");
  }
}
function ListcongnonccComponent_ng_template_74_ng_container_34_tr_1_td_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 125);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r30 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275attribute("rowspan", item_r30.sanpham.length);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r30.makh, " ");
  }
}
function ListcongnonccComponent_ng_template_74_ng_container_34_tr_1_td_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 125);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r30 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275attribute("rowspan", item_r30.sanpham.length);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r30.name, " ");
  }
}
function ListcongnonccComponent_ng_template_74_ng_container_34_tr_1_td_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 125);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r30 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275attribute("rowspan", item_r30.sanpham.length);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r30.madathang, " ");
  }
}
function ListcongnonccComponent_ng_template_74_ng_container_34_tr_1_td_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 125);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r30 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275attribute("rowspan", item_r30.sanpham.length);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 2, ctx_r4.TinhTong(item_r30.sanpham, "ttgiao"), "1.0-0"), " ");
  }
}
function ListcongnonccComponent_ng_template_74_ng_container_34_tr_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr");
    \u0275\u0275template(1, ListcongnonccComponent_ng_template_74_ng_container_34_tr_1_td_1_Template, 3, 5, "td", 121)(2, ListcongnonccComponent_ng_template_74_ng_container_34_tr_1_td_2_Template, 2, 2, "td", 121)(3, ListcongnonccComponent_ng_template_74_ng_container_34_tr_1_td_3_Template, 2, 2, "td", 121)(4, ListcongnonccComponent_ng_template_74_ng_container_34_tr_1_td_4_Template, 2, 2, "td", 121)(5, ListcongnonccComponent_ng_template_74_ng_container_34_tr_1_td_5_Template, 3, 5, "td", 121);
    \u0275\u0275elementStart(6, "td", 122);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td", 123);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td", 122);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td", 124);
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "td", 124);
    \u0275\u0275text(16);
    \u0275\u0275pipe(17, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "td", 124);
    \u0275\u0275text(19);
    \u0275\u0275pipe(20, "number");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item1_r31 = ctx.$implicit;
    const j_r32 = ctx.index;
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", j_r32 === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", j_r32 === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", j_r32 === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", j_r32 === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", j_r32 === 0);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", item1_r31.masp, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item1_r31.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", item1_r31.dvt, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(14, 11, item1_r31.soluong, "1.1-3"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(17, 14, item1_r31.giaban, "1.0-0"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(20, 17, item1_r31.ttgiao, "1.0-0"), " ");
  }
}
function ListcongnonccComponent_ng_template_74_ng_container_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, ListcongnonccComponent_ng_template_74_ng_container_34_tr_1_Template, 21, 20, "tr", 118);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const item_r30 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", item_r30.sanpham);
  }
}
function ListcongnonccComponent_ng_template_74_Template(rf, ctx) {
  if (rf & 1) {
    const _r29 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "h2", 112);
    \u0275\u0275text(1, " C\xF4ng N\u1EE3 ");
    \u0275\u0275elementStart(2, "button", 113);
    \u0275\u0275listener("click", function ListcongnonccComponent_ng_template_74_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r29);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.printContent());
    });
    \u0275\u0275elementStart(3, "mat-icon");
    \u0275\u0275text(4, "print");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(5, "mat-dialog-content")(6, "div", 114)(7, "div", 115)(8, "table", 116)(9, "thead")(10, "tr")(11, "th", 117);
    \u0275\u0275text(12, " NG\xC0Y NH\u1EACN ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th", 117);
    \u0275\u0275text(14, " M\xC3 NH\xC0 CUNG C\u1EA4P ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th", 117);
    \u0275\u0275text(16, " T\xCAN NH\xC0 CUNG C\u1EA4P ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "th", 117);
    \u0275\u0275text(18, " M\xC3 \u0110\u01A0N H\xC0NG ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "th", 117);
    \u0275\u0275text(20, " T\u1ED4NG TI\u1EC0N ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "th", 117);
    \u0275\u0275text(22, " M\xC3 H\xC0NG ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "th", 117);
    \u0275\u0275text(24, " T\xCAN H\xC0NG ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "th", 117);
    \u0275\u0275text(26, " \u0110VT ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "th", 117);
    \u0275\u0275text(28, " S\u1ED0 L\u01AF\u1EE2NG ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "th", 117);
    \u0275\u0275text(30, " \u0110\u01A0N GI\xC1 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "th", 117);
    \u0275\u0275text(32, " TH\xC0NH TI\u1EC0N ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(33, "tbody");
    \u0275\u0275template(34, ListcongnonccComponent_ng_template_74_ng_container_34_Template, 2, 1, "ng-container", 118);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(35, "mat-dialog-actions", 119)(36, "button", 120);
    \u0275\u0275text(37, "\u0110\xF3ng");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance(34);
    \u0275\u0275property("ngForOf", ctx_r4.editDathang);
    \u0275\u0275advance();
    \u0275\u0275property("align", "end");
  }
}
function ListcongnonccComponent_ng_template_76_tr_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 133)(1, "td", 122);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "td", 122);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td", 123);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td", 122);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td", 122);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td", 123);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td", 122);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "td", 124);
    \u0275\u0275text(17);
    \u0275\u0275pipe(18, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "td", 124);
    \u0275\u0275text(20);
    \u0275\u0275pipe(21, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "td", 124);
    \u0275\u0275text(23);
    \u0275\u0275pipe(24, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "td", 124);
    \u0275\u0275text(26);
    \u0275\u0275pipe(27, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "td", 124);
    \u0275\u0275text(29);
    \u0275\u0275pipe(30, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "td", 124);
    \u0275\u0275text(32);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r33 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(3, 13, item_r33.ngaynhan, "dd/MM/yyyy"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", item_r33.madncc, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", item_r33.mancc, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", item_r33.name, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", item_r33.masp, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", item_r33.tensp, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", item_r33.dvt, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(18, 16, item_r33.sldat, "1.1-3"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(21, 19, item_r33.slnhan, "1.1-3"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(24, 22, item_r33.slconlai, "1.1-3"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(27, 25, item_r33.gianhap, "1.1-3"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(30, 28, item_r33.thanhtien, "1.0-0"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", item_r33.tongtien, " ");
  }
}
function ListcongnonccComponent_ng_template_76_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h2", 112);
    \u0275\u0275text(1, "Xem Tr\u01B0\u1EDBc M\u1EABu Excel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "mat-dialog-content", 126)(3, "div", 115)(4, "table", 127)(5, "thead")(6, "tr", 128)(7, "th", 129);
    \u0275\u0275text(8, "NG\xC0Y NH\u1EACN");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th", 129);
    \u0275\u0275text(10, "M\xC3 \u0110\u01A0N NH\u1EACN H\xC0NG");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th", 129);
    \u0275\u0275text(12, "M\xC3 NH\xC0 CUNG C\u1EA4P");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th", 129);
    \u0275\u0275text(14, "T\xCAN NH\xC0 CUNG C\u1EA4P");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th", 129);
    \u0275\u0275text(16, "M\xC3 H\xC0NG");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "th", 129);
    \u0275\u0275text(18, "T\xCAN H\xC0NG");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "th", 129);
    \u0275\u0275text(20, "\u0110VT");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "th", 129);
    \u0275\u0275text(22, "S\u1ED0 L\u01AF\u1EE2NG \u0110\u1EB6T");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "th", 129);
    \u0275\u0275text(24, "S\u1ED0 L\u01AF\u1EE2NG TH\u1EF0C NH\xC2N");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "th", 129);
    \u0275\u0275text(26, "S\u1ED0 L\u01AF\u1EE2NG C\xD2N L\u1EA0I");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "th", 129);
    \u0275\u0275text(28, "\u0110\u01A0N GI\xC1");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "th", 129);
    \u0275\u0275text(30, "TH\xC0NH TI\u1EC0N");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "th", 129);
    \u0275\u0275text(32, "T\u1ED4NG TI\u1EC0N");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(33, "tbody");
    \u0275\u0275template(34, ListcongnonccComponent_ng_template_76_tr_34_Template, 33, 31, "tr", 130);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(35, "mat-dialog-actions", 131)(36, "button", 132);
    \u0275\u0275text(37, "\u0110\xF3ng");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance(34);
    \u0275\u0275property("ngForOf", ctx_r4.exampleExport);
  }
}
var ListcongnonccComponent = class _ListcongnonccComponent {
  Detail = {};
  // Loading states
  isLoading = false;
  isSearching = false;
  isExporting = false;
  isShowKH = true;
  displayedColumns = [
    "ngaynhan",
    "madncc",
    "mancc",
    "name",
    "soluong",
    "tongtien"
  ];
  ColumnName = {
    ngaynhan: "Ng\xE0y Nh\u1EADn",
    madncc: "M\xE3 \u0110\u01A1n Nh\xE0 Cung C\u1EA5p",
    mancc: "M\xE3 Nh\xE0 Cung C\u1EA5p",
    name: "T\xEAn Nh\xE0 Cung C\u1EA5p",
    soluong: "S\u1ED1 L\u01B0\u1EE3ng",
    tongtien: "T\u1ED5ng"
  };
  FilterColumns = JSON.parse(localStorage.getItem("CongnonccColFilter") || "[]");
  exampleExport = {};
  Columns = [];
  isFilter = false;
  Trangthaidon = TrangThaiDon;
  paginator;
  sort;
  drawer;
  filterValues = {};
  _DathangService = inject(DathangService);
  _breakpointObserver = inject(BreakpointObserver);
  _GoogleSheetService = inject(GoogleSheetService);
  _GraphqlService = inject(GraphqlService);
  _router = inject(Router);
  Listdathang = this._DathangService.ListDathang;
  ListCongnoncc = [];
  filterListCongnoncc = [];
  ListNhomCongnoncc = [];
  filterListNhomCongnoncc = [];
  SelectedCongnoncc = [];
  // Array to store selected customers
  SelectedNhomCongnoncc = [];
  // Array to store selected customers
  ListCongno = [];
  dataSource = new MatTableDataSource([]);
  dathangId = this._DathangService.dathangId;
  _snackBar = inject(MatSnackBar);
  CountItem = 0;
  SearchParams = {
    Batdau: (0, import_moment.default)().toDate(),
    Ketthuc: (0, import_moment.default)().toDate(),
    Status: ["danhan", "hoanthanh"],
    congnonccIds: []
    // Array of selected supplier IDs
  };
  ListDate = [
    { id: 1, Title: "1 Ng\xE0y", value: "day" },
    { id: 2, Title: "1 Tu\u1EA7n", value: "week" },
    { id: 3, Title: "1 Th\xE1ng", value: "month" },
    { id: 4, Title: "1 N\u0103m", value: "year" }
  ];
  Chonthoigian = "day";
  isSearch = false;
  constructor() {
    this.displayedColumns.forEach((column) => {
      this.filterValues[column] = "";
    });
  }
  // Display function for customer names in chips
  getCustomerName(customer) {
    return typeof customer === "string" ? customer : customer.name || customer.mancc || "Unknown";
  }
  // Display function for customer group names in chips
  getNhomCongnonccName(nhom) {
    return typeof nhom === "string" ? nhom : nhom.name || nhom.manhom || "Unknown";
  }
  onSelectionChange(event) {
    this.ngOnInit();
  }
  onDateChange(event) {
  }
  createFilter() {
    return (data, filter) => {
      const filterObject = JSON.parse(filter);
      let isMatch = true;
      this.displayedColumns.forEach((column) => {
        if (filterObject[column]) {
          const value = data[column] ? data[column].toString().toLowerCase() : "";
          isMatch = isMatch && value.includes(filterObject[column].toLowerCase());
        }
      });
      return isMatch;
    };
  }
  applyFilter(event) {
    return __async(this, null, function* () {
      const filterValue = event.target.value;
      console.log("filterValue", filterValue);
      this.SearchParams = __spreadProps(__spreadValues({}, this.SearchParams), {
        query: filterValue
      });
      this.loadData(this.SearchParams);
    });
  }
  ngOnInit() {
    return __async(this, null, function* () {
      this.initializeColumns();
      this.setupDrawer();
      this.loadData(this.SearchParams);
    });
  }
  doSearch() {
    return __async(this, null, function* () {
      this.isSearching = true;
      try {
        yield this.loadData(this.SearchParams);
      } finally {
        this.isSearching = false;
      }
    });
  }
  ListExport = [];
  onCongnonccChange(event) {
    this.onCustomerSelected(event);
  }
  onNhomCongnonccChange(event) {
    this.onNhomCongnonccSelected(event);
  }
  // Method to handle customer group selection from chips autocomplete
  onNhomCongnonccSelected(event) {
    const selectedValue = event.option.value;
    const fullObject = this.ListNhomCongnoncc.find((item) => (typeof item === "string" ? item : item.name) === selectedValue);
    const objectToAdd = fullObject || selectedValue;
    const isAlreadySelected = this.SelectedNhomCongnoncc.some((nhomKH) => (typeof nhomKH === "string" ? nhomKH : nhomKH.name) === selectedValue);
    if (!isAlreadySelected) {
      this.SelectedNhomCongnoncc.push(objectToAdd);
      this.addCustomersFromGroup(fullObject);
      this.refreshNhomCongnonccFilter();
      this.refreshCustomerFilter();
    }
    setTimeout(() => {
      const inputs = document.querySelectorAll("input[matautocomplete]");
      inputs.forEach((input) => {
        if (input.placeholder.includes("nh\xF3m nh\xE0 cung c\u1EA5p") || input.placeholder.includes("Th\xEAm nh\xF3m nh\xE0 cung c\u1EA5p")) {
          input.value = "";
        }
      });
    }, 100);
  }
  doFilterCongnoncc(event) {
    const query = event.target.value.toLowerCase();
    console.log("query", query);
    const selectedNames = this.SelectedCongnoncc.map((customer) => typeof customer === "string" ? customer : customer.name);
    let availableCustomers = this.ListCongnoncc.filter((item) => {
      const itemName = typeof item === "string" ? item : item.name;
      return !selectedNames.includes(itemName);
    });
    if (!query) {
      this.filterListCongnoncc = availableCustomers;
      return;
    }
    this.filterListCongnoncc = availableCustomers.filter((item) => item?.name?.toLowerCase().includes(query) || removeVietnameseAccents(item?.name).toLowerCase().includes(removeVietnameseAccents(query)) || item?.mancc?.toLowerCase().includes(query) || removeVietnameseAccents(item?.mancc).toLowerCase().includes(removeVietnameseAccents(query)));
  }
  doFilterNhomCongnoncc(event) {
    const query = event.target.value.toLowerCase();
    console.log("query", query);
    const selectedNames = this.SelectedNhomCongnoncc.map((nhomKH) => typeof nhomKH === "string" ? nhomKH : nhomKH.name);
    let availableGroups = this.ListNhomCongnoncc.filter((item) => {
      const itemName = typeof item === "string" ? item : item.name;
      return !selectedNames.includes(itemName);
    });
    if (!query) {
      this.filterListNhomCongnoncc = availableGroups;
      return;
    }
    this.filterListNhomCongnoncc = availableGroups.filter((item) => {
      const name = typeof item === "string" ? item : item.name || "";
      const description = typeof item !== "string" ? item.description || "" : "";
      return name.toLowerCase().includes(query) || removeVietnameseAccents(name).toLowerCase().includes(removeVietnameseAccents(query)) || description.toLowerCase().includes(query) || removeVietnameseAccents(description).toLowerCase().includes(removeVietnameseAccents(query));
    });
  }
  // Method to handle customer selection from chips autocomplete
  onCustomerSelected(event) {
    const selectedValue = event.option.value;
    const fullObject = this.ListCongnoncc.find((item) => (typeof item === "string" ? item : item.name) === selectedValue);
    const objectToAdd = fullObject || selectedValue;
    const isAlreadySelected = this.SelectedCongnoncc.some((customer) => (typeof customer === "string" ? customer : customer.name) === selectedValue);
    if (!isAlreadySelected) {
      this.SelectedCongnoncc.push(objectToAdd);
      this.SearchParams.congnonccIds = this.SelectedCongnoncc.map((customer) => typeof customer === "string" ? customer : customer.id);
      this.refreshCustomerFilter();
    }
    setTimeout(() => {
      const inputs = document.querySelectorAll("input[matautocomplete]");
      inputs.forEach((input) => {
        if (input.placeholder.includes("nh\xE0 cung c\u1EA5p") || input.placeholder.includes("Th\xEAm nh\xE0 cung c\u1EA5p")) {
          input.value = "";
        }
      });
    }, 100);
  }
  // Method to remove selected customer
  removeSelectedCustomer(customer) {
    const index = this.SelectedCongnoncc.findIndex((item) => (typeof item === "string" ? item : item.name) === (typeof customer === "string" ? customer : customer.name));
    if (index >= 0) {
      this.SelectedCongnoncc.splice(index, 1);
      this.SearchParams.congnonccIds = this.SelectedCongnoncc.map((customer2) => typeof customer2 === "string" ? customer2 : customer2.id);
      this.refreshCustomerFilter();
    }
  }
  removeSelectedNhomcongnoncc(nhomKH) {
    const index = this.SelectedNhomCongnoncc.findIndex((item) => (typeof item === "string" ? item : item.name) === (typeof nhomKH === "string" ? nhomKH : nhomKH.name));
    if (index >= 0) {
      this.removeCustomersFromGroup(nhomKH);
      this.SelectedNhomCongnoncc.splice(index, 1);
      this.refreshNhomCongnonccFilter();
      this.refreshCustomerFilter();
    }
  }
  // Method to clear all selected customers
  clearAllSelectedCustomers() {
    this.SelectedCongnoncc = [];
    this.SearchParams.congnonccIds = [];
    this.refreshCustomerFilter();
  }
  clearAllSelectedNhomCongnoncc() {
    this.SelectedNhomCongnoncc.forEach((nhomKH) => {
      this.removeCustomersFromGroup(nhomKH);
    });
    this.SelectedNhomCongnoncc = [];
    this.refreshNhomCongnonccFilter();
    this.refreshCustomerFilter();
  }
  // Helper methods to refresh filter lists
  refreshCustomerFilter() {
    const selectedNames = this.SelectedCongnoncc.map((customer) => typeof customer === "string" ? customer : customer.name);
    this.filterListCongnoncc = this.ListCongnoncc.filter((item) => {
      const itemName = typeof item === "string" ? item : item.name;
      return !selectedNames.includes(itemName);
    });
  }
  refreshNhomCongnonccFilter() {
    const selectedNames = this.SelectedNhomCongnoncc.map((nhomKH) => typeof nhomKH === "string" ? nhomKH : nhomKH.name);
    this.filterListNhomCongnoncc = this.ListNhomCongnoncc.filter((item) => {
      const itemName = typeof item === "string" ? item : item.name;
      return !selectedNames.includes(itemName);
    });
  }
  // Helper method to add customers from a selected customer group
  addCustomersFromGroup(nhomCongnoncc) {
    if (!nhomCongnoncc || typeof nhomCongnoncc === "string")
      return;
    const customersInGroup = nhomCongnoncc.congnoncc || [];
    customersInGroup.forEach((customer) => {
      const isAlreadySelected = this.SelectedCongnoncc.some((selectedCustomer) => (typeof selectedCustomer === "string" ? selectedCustomer : selectedCustomer.name) === customer.name);
      if (!isAlreadySelected) {
        this.SelectedCongnoncc.push(customer);
      }
    });
    this.SearchParams.congnonccIds = this.SelectedCongnoncc.map((customer) => typeof customer === "string" ? customer : customer.id);
  }
  // Helper method to remove customers from a deselected customer group
  removeCustomersFromGroup(nhomCongnoncc) {
    if (!nhomCongnoncc || typeof nhomCongnoncc === "string")
      return;
    const customersInGroup = nhomCongnoncc.congnoncc || [];
    customersInGroup.forEach((customer) => {
      const index = this.SelectedCongnoncc.findIndex((selectedCustomer) => (typeof selectedCustomer === "string" ? selectedCustomer : selectedCustomer.name) === customer.name);
      if (index >= 0) {
        this.SelectedCongnoncc.splice(index, 1);
      }
    });
    this.SearchParams.congnonccIds = this.SelectedCongnoncc.map((customer) => typeof customer === "string" ? customer : customer.id);
  }
  loadData(query) {
    return __async(this, null, function* () {
      this.isLoading = true;
      try {
        this.SearchCongno();
        this.CountItem = this.Listdathang().length || 0;
        const supplierTotals = /* @__PURE__ */ new Map();
        this.ListCongno = this.Listdathang();
        this.dataSource = new MatTableDataSource(this.ListCongno);
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = this.createFilter();
        const Congnonccs = yield this._GraphqlService.findAll("nhacungcap", {
          aggressiveCache: true,
          enableStreaming: true,
          select: {
            id: true,
            name: true,
            mancc: true
          }
        });
        this.ListCongnoncc = this.filterListCongnoncc = Congnonccs.data;
        const NhomCongnonccs = yield this._GraphqlService.findAll("nhomncc", {
          aggressiveCache: true,
          enableStreaming: true,
          select: {
            id: true,
            name: true,
            description: true,
            nhacungcap: {
              select: {
                id: true,
                name: true,
                mancc: true
              }
            }
          }
        });
        this.ListNhomCongnoncc = this.filterListNhomCongnoncc = NhomCongnonccs.data;
      } finally {
        this.isLoading = false;
      }
    });
  }
  SearchCongno() {
    return __async(this, null, function* () {
      const Dathangs = yield this._GraphqlService.findAll("dathang", {
        take: 999999,
        where: __spreadProps(__spreadValues({}, this.SearchParams.congnonccIds.length > 0 && {
          nhacungcapId: { in: this.SearchParams.congnonccIds }
        }), {
          ngaynhan: {
            gte: (0, import_moment.default)(this.SearchParams.Batdau).startOf("day").toDate(),
            lte: (0, import_moment.default)(this.SearchParams.Ketthuc).endOf("day").toDate()
          }
          // status: { in: this.SearchParams.Status }
        }),
        select: {
          id: true,
          ngaynhan: true,
          madncc: true,
          nhacungcap: {
            select: {
              id: true,
              name: true,
              mancc: true,
              nhomncc: {
                select: {
                  name: true
                }
              }
            }
          },
          sanpham: {
            select: {
              sanpham: {
                select: {
                  id: true,
                  title: true,
                  masp: true,
                  dvt: true
                }
              },
              sldat: true,
              slgiao: true,
              slnhan: true,
              gianhap: true
            }
          }
        }
      });
      this._DathangService.ListDathang.update(() => Dathangs.data.map((v) => __spreadProps(__spreadValues({}, v), {
        name: v.nhacungcap?.name || "",
        mancc: v.nhacungcap?.mancc || "",
        soluong: Number(v.sanpham.reduce((total, item) => total + (Number(item.slnhan) || 0), 0)),
        tongtien: Number(v.sanpham.reduce((total, item) => total + (Number(item.slnhan) * Number(item.gianhap) || 0), 0))
      })));
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
      localStorage.setItem("CongnonccColFilter", JSON.stringify(this.FilterColumns));
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
        this.paginator.hidePageSize = true;
      } else {
        this.drawer.mode = "side";
      }
    });
  }
  updateDisplayedColumns() {
    this.displayedColumns = this.FilterColumns.filter((v) => v.isShow).map((item) => item.key);
    this.ColumnName = this.FilterColumns.reduce((obj, item) => {
      if (item.isShow)
        obj[item.key] = item.value;
      return obj;
    }, {});
    localStorage.setItem("CongnonccColFilter", JSON.stringify(this.FilterColumns));
  }
  doFilterColumns(event) {
    const query = event.target.value.toLowerCase();
    this.FilterColumns = this.Columns.filter((v) => v.value.toLowerCase().includes(query));
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
    this.dataSource.filteredData = this.Listdathang().filter((v) => removeVietnameseAccents(v[column]).includes(event.target.value.toLowerCase()) || v[column].toLowerCase().includes(event.target.value.toLowerCase()));
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
    this.ListFilter = this.Listdathang();
    this.dataSource.data = this.Listdathang();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  EmptyFiter() {
    this.ListFilter = [];
  }
  CheckItem(item) {
    return this.ListFilter.find((v) => v.id === item.id) ? true : false;
  }
  ApplyFilterColum(menu) {
    this.dataSource.data = this.Listdathang().filter((v) => this.ListFilter.some((v1) => v1.id === v.id));
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    menu.closeMenu();
  }
  create() {
    this.drawer.open();
    this._router.navigate(["admin/congnocongnoncc", 0]);
  }
  goToDetail(item) {
    this._DathangService.setDathangId(item.id);
    this.drawer.open();
    this._router.navigate(["admin/congnocongnoncc", item.id]);
  }
  ToggleAll() {
    if (this.editDathang.length === this.dataSource.filteredData.length) {
      this.editDathang = [];
    } else {
      this.editDathang = [...this.dataSource.filteredData];
    }
  }
  editDathang = [];
  toggleDathang(item) {
    const index = this.editDathang.findIndex((v) => v.id === item.id);
    if (index !== -1) {
      this.editDathang.splice(index, 1);
    } else {
      this.editDathang.push(item);
    }
  }
  TinhTong(items, fieldTong) {
    return items?.reduce((sum, item) => sum + (item[fieldTong] || 0), 0) || 0;
  }
  dialog = inject(MatDialog);
  dialogCreateRef;
  Phieuchia = [];
  openCreateDialog(teamplate) {
    this.Phieuchia = this.editDathang.map((v) => ({
      mancc: v.congnoncc?.mancc,
      name: v.congnoncc?.name,
      madathang: v.madathang,
      ngaynhan: v.ngaynhan,
      sanpham: v.sanpham.map((v1) => ({
        masp: v1.masp,
        title: v1.title,
        dvt: v1.dvt,
        slgiao: v1.slgiao,
        giaban: v1.giaban,
        ttgiao: v1.ttgiao
      }))
    }));
    console.log(this.Phieuchia);
    this.dialogCreateRef = this.dialog.open(teamplate, {
      hasBackdrop: true,
      disableClose: true
    });
  }
  openPreviewExport(teamplate) {
    return __async(this, null, function* () {
      if (this.editDathang.length > 0) {
        this.exampleExport = this.convertFlatData(this.editDathang[0] || {});
        console.log(this.editDathang);
        console.log("exampleExport", this.exampleExport);
        this.dialogCreateRef = this.dialog.open(teamplate, {
          hasBackdrop: true,
          disableClose: true
        });
      } else {
        this._snackBar.open("Vui l\xF2ng ch\u1ECDn \xEDt nh\u1EA5t m\u1ED9t nh\xE0 cung c\u1EA5p", "\u0110\xF3ng", {
          duration: 3e3,
          horizontalPosition: "center",
          verticalPosition: "top",
          panelClass: ["snackbar-warning"]
        });
      }
    });
  }
  convertFlatData(data) {
    return data?.sanpham?.map((item) => ({
      madncc: data.madncc || "",
      ngaynhan: data.ngaynhan || "",
      masp: item.sanpham?.masp || "",
      tensp: item.sanpham?.title || "",
      dvt: item.sanpham?.dvt || "",
      sldat: Number(item.sldat) || 0,
      slnhan: Number(item.slnhan) || 0,
      slconlai: (Number(item.sldat) || 0) - (Number(item.slnhan) || 0),
      gianhap: Number(item.gianhap) || 0,
      thanhtien: (Number(item.slnhan) || 0) * (Number(item.gianhap) || 0),
      mancc: data.nhacungcap?.mancc || data.congnoncc?.mancc || "",
      name: data.nhacungcap?.name || data.congnoncc?.name || ""
    }));
  }
  BackStatus() {
    this.editDathang.forEach((v) => {
      v.status = "dadat";
      this._DathangService.updateDathang(v);
    });
    this.ngOnInit();
  }
  Hoanthanh() {
    this.editDathang.forEach((v) => {
      v.status = "hoanthanh";
      this._DathangService.updateDathang(v);
    });
  }
  getUniqueProducts() {
    const products = /* @__PURE__ */ new Set();
    this.Phieuchia.forEach((kh) => kh.sanpham.forEach((sp) => products.add(sp.title)));
    return Array.from(products);
  }
  getProductQuantity(product, mancc) {
    const customer = this.Phieuchia.find((kh) => kh.mancc === mancc);
    const item = customer?.sanpham.find((sp) => sp.title === product);
    return item ? item.slgiao : "";
  }
  getDvtForProduct(product) {
    const uniqueProducts = Array.from(new Map(this.Phieuchia.flatMap((c) => c.sanpham.map((sp) => __spreadProps(__spreadValues({}, sp), { mancc: c.mancc, name: c.name }))).map((p) => [p.title, p])).values());
    const item = uniqueProducts.find((sp) => sp.title === product);
    return item ? item.dvt : "";
  }
  CheckItemInDathang(item) {
    return this.editDathang.findIndex((v) => v.id === item.id) !== -1;
  }
  DeleteDathang() {
  }
  DoImportData(data) {
    const transformedData = data.map((v) => ({
      title: v.title?.trim() || "",
      masp: v.masp?.trim() || "",
      slug: `${convertToSlug(v?.title?.trim() || "")}_${GenId(5, false)}`,
      giagoc: Number(v.giagoc) || 0,
      dvt: v.dvt || "",
      soluong: Number(v.soluong) || 0,
      soluongkho: Number(v.soluongkho) || 0,
      ghichu: v.ghichu || "",
      order: Number(v.order) || 0
    }));
    const uniqueData = transformedData.filter((value, index, self) => index === self.findIndex((t) => t.masp === value.masp));
    const listId2 = uniqueData.map((v) => v.masp);
    const listId1 = this._DathangService.ListDathang().map((v) => v.masp);
    const listId3 = listId2.filter((item) => !listId1.includes(item));
    const createuppdateitem = uniqueData.map((v) => __async(this, null, function* () {
      const item = this._DathangService.ListDathang().find((v1) => v1.masp === v.masp);
      if (item) {
        const item1 = __spreadValues(__spreadValues({}, item), v);
        yield this._DathangService.updateDathang(item1);
      } else {
        yield this._DathangService.CreateDathang(v);
      }
    }));
    const disableItem = listId3.map((v) => __async(this, null, function* () {
      const item = this._DathangService.ListDathang().find((v1) => v1.masp === v);
      item.isActive = false;
      yield this._DathangService.updateDathang(item);
    }));
    Promise.all([...createuppdateitem, ...disableItem]).then(() => {
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
    return __async(this, null, function* () {
      this.isExporting = true;
      if (this.editDathang.length > 0) {
        this.SearchParams.ids = this.editDathang.map((v) => v.id);
      } else {
        this.SearchParams.ids = data.map((v) => v.id);
      }
      try {
        console.log("Attempting server-based Excel export...");
        this._snackBar.open("Xu\u1EA5t file Excel t\u1EEB server th\xE0nh c\xF4ng!", "\u0110\xF3ng", {
          duration: 3e3,
          horizontalPosition: "center",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        this.editDathang = [];
      } catch (serverError) {
        console.warn("Server export failed, falling back to client-side export:", serverError);
        try {
          console.log("Attempting client-side Excel export with table format...");
          let exportData = [];
          if (this.editDathang.length > 0) {
            exportData = this.editDathang.flatMap((order) => {
              console.log(order);
              return this.convertFlatData(order);
            });
          } else {
            exportData = data.flatMap((order) => {
              console.log(order);
              return this.convertFlatData(order);
            });
          }
          yield this.generateExcelWithTableFormat(exportData, title);
          this._snackBar.open("Xu\u1EA5t file Excel (\u0111\u1ECBnh d\u1EA1ng b\u1EA3ng) th\xE0nh c\xF4ng!", "\u0110\xF3ng", {
            duration: 3e3,
            horizontalPosition: "center",
            verticalPosition: "top",
            panelClass: ["snackbar-success"]
          });
          this.editDathang = [];
        } catch (clientError) {
          console.error("Client-side export also failed:", clientError);
          console.log("Attempting final fallback export...");
          yield this.ExportExcelFallback(data, title);
        }
      } finally {
        this.isExporting = false;
      }
    });
  }
  // New method for client-side table format export
  ExportExcelTableFormat(data, title) {
    return __async(this, null, function* () {
      this.isExporting = true;
      try {
        console.log("Exporting Excel with table format...");
        let rawData = [];
        if (this.editDathang.length > 0) {
          rawData = yield this.ChuyendoiExport(this.editDathang);
        } else {
          rawData = yield this.ChuyendoiExport(data);
        }
        let exportData = [];
        exportData = rawData.flatMap((order) => this.convertFlatData(order));
        yield this.generateExcelWithTableFormat(exportData, title);
        this.editDathang = [];
        this._snackBar.open("Xu\u1EA5t file Excel (\u0111\u1ECBnh d\u1EA1ng b\u1EA3ng) th\xE0nh c\xF4ng!", "\u0110\xF3ng", {
          duration: 3e3,
          horizontalPosition: "center",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
      } catch (error) {
        console.error("Error exporting Excel with table format:", error);
        this._snackBar.open("L\u1ED7i khi xu\u1EA5t file Excel (\u0111\u1ECBnh d\u1EA1ng b\u1EA3ng)!", "\u0110\xF3ng", {
          duration: 5e3,
          horizontalPosition: "center",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      } finally {
        this.isExporting = false;
      }
    });
  }
  ChuyendoiExport(item) {
    return __async(this, null, function* () {
      const where = {
        ngaynhan: { gte: (0, import_moment.default)(this.SearchParams.Batdau).startOf("day").toDate(), lte: (0, import_moment.default)(this.SearchParams.Ketthuc).endOf("day").toDate() }
      };
      if (item && item.length > 0) {
        where.id = { in: item.map((v) => v.id) };
      } else if (this.SearchParams.congnonccIds?.length > 0) {
        where.nhacungcapId = { in: this.SearchParams.congnonccIds };
      }
      const Dathangs = yield this._GraphqlService.findAll("dathang", {
        take: 999999,
        where,
        select: {
          id: true,
          ngaynhan: true,
          madncc: true,
          nhacungcap: {
            select: {
              id: true,
              name: true,
              mancc: true,
              nhomncc: {
                select: {
                  name: true
                }
              }
            }
          },
          sanpham: {
            select: {
              sanpham: {
                select: {
                  id: true,
                  title: true,
                  masp: true,
                  dvt: true
                }
              },
              sldat: true,
              slgiao: true,
              slnhan: true,
              gianhap: true
            }
          }
        }
      });
      return Dathangs.data.map((v) => __spreadProps(__spreadValues({}, v), {
        tongtien: Number(v.sanpham.reduce((total, item2) => total + (Number(item2.slnhan) * Number(item2.gianhap) || 0), 0))
      }));
    });
  }
  // Method for exporting Excel with two sheets (Summary and Details) with high-fidelity styling
  ExportExcelTwoSheets(data, title) {
    return __async(this, null, function* () {
      this.isExporting = true;
      try {
        console.log("Exporting Excel with two sheets (Formatted NCC)...");
        let rawData = [];
        if (this.editDathang.length > 0) {
          rawData = yield this.ChuyendoiExport(this.editDathang);
        } else {
          rawData = yield this.ChuyendoiExport(data);
        }
        if (!rawData || rawData.length === 0) {
          this._snackBar.open("Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u \u0111\u1EC3 xu\u1EA5t!", "\u0110\xF3ng", { duration: 3e3 });
          return;
        }
        const workbook = XLSX.utils.book_new();
        const borderThin = {
          top: { style: "thin" },
          bottom: { style: "thin" },
          left: { style: "thin" },
          right: { style: "thin" }
        };
        const styleHeaderYellow = {
          fill: { fgColor: { rgb: "FFFF00" } },
          font: { bold: true, name: "Calibri" },
          alignment: { horizontal: "center", vertical: "center", wrapText: true },
          border: borderThin
        };
        const styleHeaderGray = {
          fill: { fgColor: { rgb: "D9D9D9" } },
          font: { bold: true, name: "Calibri" },
          alignment: { horizontal: "center", vertical: "center", wrapText: true },
          border: borderThin
        };
        const styleHeaderBlue = {
          fill: { fgColor: { rgb: "1F4E78" } },
          font: { bold: true, color: { rgb: "FFFFFF" }, name: "Calibri" },
          alignment: { horizontal: "center", vertical: "center", wrapText: true },
          border: borderThin
        };
        const styleData = {
          font: { name: "Calibri" },
          alignment: { vertical: "center" },
          border: borderThin
        };
        const styleNumber = __spreadProps(__spreadValues({}, styleData), {
          alignment: { horizontal: "right", vertical: "center" },
          numFmt: "#,##0.00"
        });
        const styleTitle = {
          font: { bold: true, size: 16, name: "Calibri" },
          alignment: { horizontal: "center", vertical: "center" }
        };
        const styleSubTitle = {
          font: { bold: true, italic: true, name: "Calibri" },
          alignment: { horizontal: "center", vertical: "center" }
        };
        const summaryRows = [];
        summaryRows.push(["T\u1ED4NG H\u1EE2P C\xD4NG N\u1EE2 PH\u1EA2I TR\u1EA2 NH\xC0 CUNG C\u1EA4P"]);
        summaryRows.push(["T\xE0i kho\u1EA3n: 331", "", "", "", "", "", "T\u1EEB ng\xE0y " + (0, import_moment.default)(this.SearchParams.Batdau).format("DD/MM/YYYY") + " \u0110\u1EBFn ng\xE0y " + (0, import_moment.default)(this.SearchParams.Ketthuc).format("DD/MM/YYYY")]);
        summaryRows.push(["NH\xD3M NH\xC0 CUNG C\u1EA4P", "T\xEAn nh\xE0 cung c\u1EA5p", "TK c\xF4ng n\u1EE3", "S\u1ED1 d\u01B0 \u0111\u1EA7u k\u1EF3", "Ph\xE1t sinh t\u0103ng\n(DOANH S\u1ED0 T\u1ED4NG-VAT)", "Ph\xE1t sinh gi\u1EA3m", "S\u1ED1 d\u01B0 cu\u1ED1i k\u1EF3", "Trong \u0111\xF3", ""]);
        summaryRows.push(["", "", "", "", "", "", "", "Th\xE1ng " + (0, import_moment.default)(this.SearchParams.Ketthuc).format("MM/YYYY"), ""]);
        const summarySheet = XLSX.utils.aoa_to_sheet(summaryRows);
        summarySheet["A1"].s = styleTitle;
        summarySheet["A2"].s = styleSubTitle;
        summarySheet["G2"].s = styleSubTitle;
        ["A3", "B3", "E3"].forEach((c) => summarySheet[c].s = styleHeaderYellow);
        ["C3", "D3", "F3", "G3", "H3", "I3"].forEach((c) => summarySheet[c].s = styleHeaderGray);
        ["H4", "I4"].forEach((c) => summarySheet[c].s = styleHeaderGray);
        const supplierGroupsMap = /* @__PURE__ */ new Map();
        rawData.forEach((order) => {
          const supplierId = order.nhacungcap?.id || "unknown";
          if (!supplierGroupsMap.has(supplierId)) {
            supplierGroupsMap.set(supplierId, {
              groupName: order.nhacungcap?.nhomncc && order.nhacungcap.nhomncc.length > 0 ? order.nhacungcap.nhomncc[0].name : "Ch\u01B0a ph\xE2n nh\xF3m",
              supplierName: order.nhacungcap?.name || "Ch\u01B0a t\xEAn",
              mancc: order.nhacungcap?.mancc || "",
              increase: 0,
              decrease: 0
            });
          }
          const group = supplierGroupsMap.get(supplierId);
          group.increase += Number(order.tongtien) || 0;
        });
        let currentRowIdx = 4;
        const sortedSuppliers = Array.from(supplierGroupsMap.values()).sort((a, b) => a.groupName.localeCompare(b.groupName));
        const mergesSummary = [
          { s: { r: 0, c: 0 }, e: { r: 0, c: 8 } },
          // Title merge
          { s: { r: 1, c: 0 }, e: { r: 1, c: 5 } },
          // Tài khoản merge
          { s: { r: 1, c: 6 }, e: { r: 1, c: 8 } },
          // Từ ngày merge
          { s: { r: 2, c: 0 }, e: { r: 3, c: 0 } },
          // Nhóm NCC merge vertically
          { s: { r: 2, c: 1 }, e: { r: 3, c: 1 } },
          // Tên NCC merge vertically
          { s: { r: 2, c: 2 }, e: { r: 3, c: 2 } },
          // TK công nợ merge vertically
          { s: { r: 2, c: 3 }, e: { r: 3, c: 3 } },
          // Số dư đầu kỳ merge vertically
          { s: { r: 2, c: 4 }, e: { r: 3, c: 4 } },
          // Phát sinh tăng merge vertically
          { s: { r: 2, c: 5 }, e: { r: 3, c: 5 } },
          // Phát sinh giảm merge vertically
          { s: { r: 2, c: 6 }, e: { r: 3, c: 6 } },
          // Số dư cuối kỳ merge vertically
          { s: { r: 2, c: 7 }, e: { r: 2, c: 8 } }
          // "Trong đó" horizontal merge
        ];
        let lastGroupName = "";
        let groupStartRow = currentRowIdx;
        sortedSuppliers.forEach((sup, idx) => {
          const row = [
            sup.groupName,
            sup.supplierName,
            "331",
            0,
            sup.increase,
            0,
            sup.increase,
            sup.increase,
            ""
          ];
          XLSX.utils.sheet_add_aoa(summarySheet, [row], { origin: currentRowIdx });
          for (let c = 0; c <= 8; c++) {
            const cellRef = XLSX.utils.encode_cell({ r: currentRowIdx, c });
            summarySheet[cellRef].s = c >= 3 ? styleNumber : styleData;
          }
          if (sup.groupName !== lastGroupName) {
            if (idx > 0 && currentRowIdx - groupStartRow > 1) {
              mergesSummary.push({ s: { r: groupStartRow, c: 0 }, e: { r: currentRowIdx - 1, c: 0 } });
            }
            lastGroupName = sup.groupName;
            groupStartRow = currentRowIdx;
          }
          currentRowIdx++;
        });
        if (currentRowIdx - groupStartRow > 1) {
          mergesSummary.push({ s: { r: groupStartRow, c: 0 }, e: { r: currentRowIdx - 1, c: 0 } });
        }
        summarySheet["!merges"] = mergesSummary;
        summarySheet["!cols"] = [
          { wch: 15 },
          { wch: 35 },
          { wch: 10 },
          { wch: 15 },
          { wch: 20 },
          { wch: 15 },
          { wch: 15 },
          { wch: 15 },
          { wch: 15 }
        ];
        XLSX.utils.book_append_sheet(workbook, summarySheet, "T\u1ED5ng H\u1EE3p");
        const detailHeaders = [
          "Ng\xE0y Nh\u1EADn",
          "M\xE3 \u0110\u01A1n Nh\u1EADn",
          "M\xE3 Nh\xE0 CC",
          "T\xEAn Nh\xE0 Cung C\u1EA5p",
          "M\xE3 H\xE0ng",
          "T\xEAn H\xE0ng",
          "\u0110VT",
          "S\u1ED1 L\u01B0\u1EE3ng \u0110\u1EB7t",
          "S\u1ED1 L\u01B0\u1EE3ng Th\u1EF1c Nh\u1EADn",
          "S\u1ED1 L\u01B0\u1EE3ng C\xF2n L\u1EA1i",
          "\u0110\u01A1n Gi\xE1",
          "Th\xE0nh Ti\u1EC1n",
          "T\u1ED5ng Ti\u1EC1n \u0110\u01A1n",
          "T\u1ED5ng C\u1ED9ng NCC"
        ];
        const detailRows = [detailHeaders];
        const detailSheet = XLSX.utils.aoa_to_sheet(detailRows);
        for (let c = 0; c < detailHeaders.length; c++) {
          const cellRef = XLSX.utils.encode_cell({ r: 0, c });
          detailSheet[cellRef].s = styleHeaderBlue;
        }
        let detailRowIdx = 1;
        const mergesDetail = [];
        const supplierGrandTotals = /* @__PURE__ */ new Map();
        rawData.forEach((order) => {
          const supId = order.nhacungcap?.id;
          supplierGrandTotals.set(supId, (supplierGrandTotals.get(supId) || 0) + (Number(order.tongtien) || 0));
        });
        rawData.forEach((order) => {
          const items = order.sanpham || [];
          if (items.length === 0)
            return;
          const startRow = detailRowIdx;
          const supId = order.nhacungcap?.id;
          items.forEach((item, idx) => {
            const tt = (Number(item.slnhan) || 0) * (Number(item.gianhap) || 0);
            const rowDataArr = [
              (0, import_moment.default)(order.ngaynhan).format("DD/MM/YYYY"),
              order.madncc || "",
              order.nhacungcap?.mancc || "",
              order.nhacungcap?.name || "",
              item.sanpham?.masp || "",
              item.sanpham?.title || "",
              item.sanpham?.dvt || "",
              Number(item.sldat) || 0,
              Number(item.slnhan) || 0,
              (Number(item.sldat) || 0) - (Number(item.slnhan) || 0),
              Number(item.gianhap) || 0,
              tt,
              idx === 0 ? Number(order.tongtien) || 0 : "",
              idx === 0 ? supplierGrandTotals.get(supId) : ""
            ];
            XLSX.utils.sheet_add_aoa(detailSheet, [rowDataArr], { origin: detailRowIdx });
            for (let c = 0; c < rowDataArr.length; c++) {
              const cellRef = XLSX.utils.encode_cell({ r: detailRowIdx, c });
              const isNumber = [7, 8, 9, 10, 11, 12, 13].includes(c);
              detailSheet[cellRef].s = isNumber ? styleNumber : styleData;
            }
            detailRowIdx++;
          });
          if (items.length > 1) {
            [0, 1, 2, 3, 12, 13].forEach((c) => {
              mergesDetail.push({ s: { r: startRow, c }, e: { r: detailRowIdx - 1, c } });
            });
          }
        });
        detailSheet["!merges"] = mergesDetail;
        detailSheet["!cols"] = detailHeaders.map(() => ({ wch: 15 }));
        XLSX.utils.book_append_sheet(workbook, detailSheet, "Chi Ti\u1EBFt");
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const finalFileName = `${title}_${(0, import_moment.default)().format("DD_MM_YYYY")}.xlsx`;
        const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = finalFileName;
        link.click();
        window.URL.revokeObjectURL(url);
        this.editDathang = [];
        this._snackBar.open("Xu\u1EA5t file Excel th\xE0nh c\xF4ng!", "\u0110\xF3ng", { duration: 3e3 });
      } catch (error) {
        console.error("Error exporting Excel:", error);
        this._snackBar.open("L\u1ED7i khi xu\u1EA5t file Excel!", "\u0110\xF3ng", { duration: 5e3 });
      } finally {
        this.isExporting = false;
      }
    });
  }
  /**
   * Fallback method for Excel export using client-side generation
   */
  ExportExcelFallback(data, title) {
    return __async(this, null, function* () {
      try {
        const columns = [
          "Ng\xE0y",
          "M\xE3 Nh\xE0 Cung C\u1EA5p",
          "T\xEAn Nh\xE0 Cung C\u1EA5p",
          "M\xE3 \u0110\u01A1n H\xE0ng",
          "M\xE3 H\xE0ng",
          "T\xEAn H\xE0ng",
          "\u0110VT",
          "S\u1ED1 L\u01B0\u1EE3ng",
          "\u0110\u01A1n Gi\xE1",
          "Th\xE0nh Ti\u1EC1n Tr\u01B0\u1EDBc VAT",
          "VAT",
          "\u0110\u01A1n Gi\xE1 VAT",
          "Th\xE0nh Ti\u1EC1n Sau VAT",
          "Ghi Ch\xFA",
          "T\u1ED5ng Ti\u1EC1n Sau Thu\u1EBF"
        ];
        let groupedData = [];
        if (data.length > 0) {
          groupedData = this.groupDataByCustomer(data);
        } else {
          groupedData = this.groupDataByCustomer(this.ListCongno);
        }
        yield this.generateExcelWithSingleSheet(this.ListCongno, title);
      } catch (error) {
        console.error("Error in fallback Excel export:", error);
      }
    });
  }
  groupDataByCustomer(data) {
    const customerGroups = /* @__PURE__ */ new Map();
    data.forEach((item) => {
      const mancc = item.macongnoncc;
      if (!customerGroups.has(mancc)) {
        customerGroups.set(mancc, []);
      }
      customerGroups.get(mancc).push(item);
    });
    const result = [];
    customerGroups.forEach((items, mancc) => {
      const totalAmount = items.reduce((sum, item) => sum + (item.thanhtiensauvat || 0), 0);
      items.forEach((item, index) => {
        result.push(__spreadProps(__spreadValues({}, item), {
          tongtiensauthue: index === 0 ? totalAmount : null
          // Chỉ hiển thị tổng ở dòng đầu tiên
        }));
      });
    });
    return result;
  }
  createMergeRanges(data) {
    const mergeRanges = [];
    const customerGroups = /* @__PURE__ */ new Map();
    data.forEach((item, index) => {
      const mancc = item.macongnoncc;
      if (!customerGroups.has(mancc)) {
        customerGroups.set(mancc, { start: index + 1, count: 0 });
      }
      customerGroups.get(mancc).count++;
    });
    const totalColumnIndex = 14;
    customerGroups.forEach((group) => {
      if (group.count > 1) {
        mergeRanges.push({
          s: { r: group.start, c: totalColumnIndex },
          // start row, column
          e: { r: group.start + group.count - 1, c: totalColumnIndex }
          // end row, column
        });
      }
    });
    return mergeRanges;
  }
  saveAsExcelFile(buffer, fileName) {
    const data = new Blob([buffer], { type: "application/octet-stream" });
    const url = window.URL.createObjectURL(data);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${fileName}.xlsx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
  // Generate Excel with single sheet format
  generateExcelWithTableFormat(exportData, title) {
    return __async(this, null, function* () {
      try {
        const workbook = XLSX.utils.book_new();
        const orderTotals = /* @__PURE__ */ new Map();
        exportData.forEach((item) => {
          const madncc = item.madncc || "";
          if (!orderTotals.has(madncc)) {
            orderTotals.set(madncc, 0);
          }
          orderTotals.set(madncc, orderTotals.get(madncc) + (Number(item.thanhtien) || 0));
        });
        const worksheetData = [
          // Table headers
          [
            "NG\xC0Y NH\u1EACN",
            "M\xC3 \u0110\u01A0N H\xC0NG",
            "M\xC3 NCC",
            "T\xCAN NCC",
            "M\xC3 H\xC0NG",
            "T\xCAN H\xC0NG",
            "\u0110VT",
            "S\u1ED0 L\u01AF\u1EE2NG \u0110\u1EB6T",
            "S\u1ED0 L\u01AF\u1EE2NG NH\u1EACN",
            "S\u1ED0 L\u01AF\u1EE2NG C\xD2N L\u1EA0I",
            "GI\xC1 NH\u1EACP",
            "TH\xC0NH TI\u1EC0N",
            "T\u1ED4NG TI\u1EC0N \u0110\u01A0N H\xC0NG"
          ]
        ];
        const groupedData = /* @__PURE__ */ new Map();
        exportData.forEach((item) => {
          const madncc = item.madncc || "";
          if (!groupedData.has(madncc)) {
            groupedData.set(madncc, []);
          }
          groupedData.get(madncc).push(item);
        });
        let currentRow = 1;
        const mergeRanges = [];
        groupedData.forEach((items, madncc) => {
          const orderTotal = orderTotals.get(madncc);
          const startRow = currentRow;
          items.forEach((item, index) => {
            worksheetData.push([
              (0, import_moment.default)(item.ngaynhan).format("DD/MM/YYYY") || "",
              item.madncc || "",
              item.mancc || "",
              item.name || "",
              item.masp || "",
              item.tensp || "",
              item.dvt || "",
              Number(item.sldat) || 0,
              Number(item.slnhan) || 0,
              Number(item.slconlai) || 0,
              Number(item.gianhap) || 0,
              Number(item.thanhtien) || 0,
              index === 0 ? orderTotal : ""
              // Chỉ hiển thị tổng ở dòng đầu tiên
            ]);
            currentRow++;
          });
          if (items.length > 1) {
            mergeRanges.push({
              s: { r: startRow, c: 12 },
              // start row, column 12 (TỔNG TIỀN ĐƠN HÀNG)
              e: { r: currentRow - 1, c: 12 }
              // end row, column 12
            });
          }
        });
        const totalSldat = exportData.reduce((sum, item) => sum + (Number(item.sldat) || 0), 0);
        const totalSlnhan = exportData.reduce((sum, item) => sum + (Number(item.slnhan) || 0), 0);
        const totalSlconlai = exportData.reduce((sum, item) => sum + (Number(item.slconlai) || 0), 0);
        const totalThanhtien = exportData.reduce((sum, item) => sum + (Number(item.thanhtien) || 0), 0);
        const grandTotal = Array.from(orderTotals.values()).reduce((sum, total) => sum + total, 0);
        const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
        if (mergeRanges.length > 0) {
          worksheet["!merges"] = mergeRanges;
        }
        const columnWidths = [
          { wch: 12 },
          // NGÀY NHẬN
          { wch: 15 },
          // MÃ ĐƠN HÀNG
          { wch: 12 },
          // MÃ NCC
          { wch: 25 },
          // TÊN NCC
          { wch: 12 },
          // MÃ HÀNG
          { wch: 30 },
          // TÊN HÀNG
          { wch: 8 },
          // ĐVT
          { wch: 12 },
          // SỐ LƯỢNG ĐẶT
          { wch: 12 },
          // SỐ LƯỢNG NHẬN
          { wch: 12 },
          // SỐ LƯỢNG CÒN LẠI
          { wch: 12 },
          // GIÁ NHẬP
          { wch: 15 },
          // THÀNH TIỀN
          { wch: 18 }
          // TỔNG TIỀN ĐƠN HÀNG
        ];
        worksheet["!cols"] = columnWidths;
        XLSX.utils.book_append_sheet(workbook, worksheet, "C\xF4ng N\u1EE3 NCC");
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        this.saveAsExcelFile(excelBuffer, `${title}_${(0, import_moment.default)().format("DD_MM_YYYY")}`);
      } catch (error) {
        console.error("Error generating Excel with single sheet format:", error);
        throw error;
      }
    });
  }
  // Helper method to create a worksheet for each customer
  printContent() {
    const element = document.getElementById("printContent");
    if (!element)
      return;
    html2canvas_esm_default(element, { scale: 2 }).then((canvas) => {
      const imageData = canvas.toDataURL("image/png");
      const printWindow = window.open("", "_blank");
      if (!printWindow)
        return;
      printWindow.document.write(`
        <html>
          <head>
            <title>Phi\u1EBFu Chia H\xE0ng ${(0, import_moment.default)().format("DD/MM/YYYY")}</title>
          </head>
          <body style="text-align: center;">
            <img src="${imageData}" style="max-width: 100%;"/>
            <script>
              window.onload = function() {
                window.print();
                window.onafterprint = function() { window.close(); };
              };
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    });
  }
  generateExcelWithSingleSheet(data, title) {
    return __async(this, null, function* () {
      try {
        const workbook = XLSX.utils.book_new();
        const exportData = this.convertFlatData(data);
        const wsData = [];
        wsData.push(["C\xD4NG TY TNHH RAU S\u1EA0CH TR\u0102NG GI\xC1"]);
        wsData.push(["\u0110C: Ti\u1EC3u Khu 7, TT. Nga S\u01A1n, H. Nga S\u01A1n, T. Thanh H\xF3a"]);
        wsData.push([`${title} - ${(0, import_moment.default)().format("DD/MM/YYYY HH:mm:ss")}`]);
        wsData.push([]);
        const headers = [
          "M\xE3 \u0110NCC",
          "Ng\xE0y nh\u1EADn",
          "M\xE3 SP",
          "T\xEAn SP",
          "\u0110VT",
          "SL \u0111\u1EB7t",
          "SL nh\u1EADn",
          "SL c\xF2n l\u1EA1i",
          "Gi\xE1 nh\u1EADp",
          "Th\xE0nh ti\u1EC1n",
          "M\xE3 NCC",
          "T\xEAn NCC"
        ];
        wsData.push(headers);
        exportData.forEach((item) => {
          wsData.push([
            item.madncc || "",
            item.ngaynhan || "",
            item.masp || "",
            item.tensp || "",
            item.dvt || "",
            item.sldat || 0,
            item.slnhan || 0,
            item.slconlai || 0,
            item.gianhap || 0,
            item.thanhtien || 0,
            item.mancc || "",
            item.name || ""
          ]);
        });
        const worksheet = XLSX.utils.aoa_to_sheet(wsData);
        const range = XLSX.utils.decode_range(worksheet["!ref"] || "A1");
        worksheet["!merges"] = [
          { s: { r: 0, c: 0 }, e: { r: 0, c: headers.length - 1 } },
          // Tên công ty
          { s: { r: 1, c: 0 }, e: { r: 1, c: headers.length - 1 } },
          // Địa chỉ
          { s: { r: 2, c: 0 }, e: { r: 2, c: headers.length - 1 } }
          // Tiêu đề + ngày
        ];
        const colWidths = [];
        for (let c = 0; c <= range.e.c; c++) {
          let maxWidth = 10;
          for (let r = 0; r <= range.e.r; r++) {
            const cellAddress = XLSX.utils.encode_cell({ r, c });
            const cell = worksheet[cellAddress];
            if (cell && cell.v) {
              const cellLength = cell.v.toString().length;
              maxWidth = Math.max(maxWidth, cellLength + 2);
            }
          }
          colWidths.push({ wch: Math.min(maxWidth, 30) });
        }
        worksheet["!cols"] = colWidths;
        XLSX.utils.book_append_sheet(workbook, worksheet, "C\xF4ng n\u1EE3 NCC");
        const fileName = `${title}_${(0, import_moment.default)().format("YYYYMMDD_HHmmss")}.xlsx`;
        XLSX.writeFile(workbook, fileName);
      } catch (error) {
        console.error("Error generating single sheet Excel:", error);
      }
    });
  }
  trackByFn(index, item) {
    return item.id;
  }
  static \u0275fac = function ListcongnonccComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ListcongnonccComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ListcongnonccComponent, selectors: [["app-listcongnoncc"]], viewQuery: function ListcongnonccComponent_Query(rf, ctx) {
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
  }, decls: 78, vars: 35, consts: [["drawer", ""], ["pickerBatdau", ""], ["pickerKetthuc", ""], ["exportMenu", "matMenu"], ["menu", "matMenu"], ["dialogCreateTemplate", ""], ["dialogPreviewExport", ""], ["nhomKHInput", ""], ["autoNhom", "matAutocomplete"], ["customerInput", ""], ["auto", "matAutocomplete"], ["menuTrigger", "matMenuTrigger"], ["autosize", "", 1, "w-full", "h-full"], ["class", "fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50", 4, "ngIf"], ["mode", "over", 1, "flex", "flex-col", "!w-full", "h-full", 3, "position"], [1, "flex", "flex-col", "space-y-2", "h-screen-12", "w-full", "p-2"], [1, "w-full", "grid", "gap-2", "items-center"], [1, "w-full", "flex", "flex-row", "space-x-2", "items-center"], [1, "w-full", 3, "appearance", "subscriptSizing"], ["matInput", "", 3, "dateChange", "ngModelChange", "matDatepicker", "ngModel", "ngModelOptions"], ["matIconSuffix", "", 3, "for"], [1, "lg:flex", "cursor-pointer", "whitespace-nowrap", "p-2", "rounded-lg", "bg-slate-200", 3, "click"], [1, "lg:flex", "cursor-pointer", "whitespace-nowrap", "p-2", "rounded-lg", "bg-slate-200"], ["matTooltip", "Xem M\u1EABu", "mat-icon-button", "", "color", "primary", 3, "click"], ["matTooltip", "Xu\u1EA5t file Excel", "color", "primary", "mat-icon-button", "", 1, "relative", 3, "matMenuTriggerFor"], ["class", "absolute inset-0 flex items-center justify-center", 4, "ngIf"], ["mat-menu-item", "", 3, "click"], ["matTooltip", "T\xECm ki\u1EBFm", "color", "primary", "mat-icon-button", "", 1, "relative", 3, "click", "disabled"], ["matTooltip", "\u1EA8n hi\u1EC7n c\u1ED9t", "mat-icon-button", "", "color", "primary", "aria-label", "Example icon-button with a menu", 3, "matMenuTriggerFor"], [1, "p-4"], ["appearance", "outline", "subscriptSizing", "dynamic", 1, "w-full"], ["matInput", "", "placeholder", "T\xECm Ki\u1EBFm", 3, "input", "click"], ["matPrefix", ""], [1, "flex", "flex-col", "max-h-80", "overflow-auto"], ["mat-menu-item", ""], ["matTooltip", "\u1EA8n hi\u1EC7n Tool Nh\xE0 Cung C\u1EA5p", "mat-icon-button", "", "color", "primary", 3, "click"], [1, "w-full", "grid", "lg:grid-cols-2", "gap-2", "items-center"], [1, "w-full", "overflow-auto", "relative"], ["class", "absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 z-10", 4, "ngIf"], ["mat-table", "", "matSort", "", 1, "!border", "w-full", "cursor-pointer", 3, "dataSource"], [3, "matColumnDef"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 3, "class", "click", 4, "matRowDef", "matRowDefColumns"], ["class", "mat-row", 4, "matNoDataRow"], [1, "fixed", "inset-0", "bg-white", "bg-opacity-75", "flex", "items-center", "justify-center", "z-50"], [1, "flex", "flex-col", "items-center", "space-y-4"], [1, "animate-spin", "rounded-full", "h-12", "w-12", "border-b-2", "border-blue-600"], [1, "text-lg", "text-gray-700"], [1, "absolute", "inset-0", "flex", "items-center", "justify-center"], [1, "animate-spin", "rounded-full", "h-5", "w-5", "border-b-2", "border-blue-600"], [1, "flex", "flex-col", "space-y-2", "w-full"], [1, "font-bold"], [3, "appearance", "subscriptSizing"], ["aria-label", "Ch\u1ECDn nh\xF3m nh\xE0 cung c\u1EA5p"], [3, "removable"], ["matInput", "", 3, "keyup", "placeholder", "matAutocomplete"], ["panelWidth", "auto", 1, "max-w-none", 3, "optionSelected"], [1, "!whitespace-normal", "!h-auto", "!py-2", 3, "value"], ["matTooltip", "X\xF3a t\u1EA5t c\u1EA3 nh\xF3m nh\xE0 cung c\u1EA5p \u0111\xE3 ch\u1ECDn", "color", "warn", "mat-icon-button", "", "matSuffix", ""], ["aria-label", "Ch\u1ECDn nh\xE0 cung c\u1EA5p"], ["matTooltip", "X\xF3a t\u1EA5t c\u1EA3 nh\xE0 cung c\u1EA5p \u0111\xE3 ch\u1ECDn", "color", "warn", "mat-icon-button", "", "matSuffix", ""], [3, "removed", "removable"], ["matChipRemove", ""], [1, "text-sm"], [1, "text-xs", "text-gray-500", "block"], ["matTooltip", "X\xF3a t\u1EA5t c\u1EA3 nh\xF3m nh\xE0 cung c\u1EA5p \u0111\xE3 ch\u1ECDn", "color", "warn", "mat-icon-button", "", "matSuffix", "", 3, "click"], ["matTooltip", "X\xF3a t\u1EA5t c\u1EA3 nh\xE0 cung c\u1EA5p \u0111\xE3 ch\u1ECDn", "color", "warn", "mat-icon-button", "", "matSuffix", "", 3, "click"], [1, "absolute", "inset-0", "flex", "items-center", "justify-center", "bg-white", "bg-opacity-90", "z-10"], [1, "animate-spin", "rounded-full", "h-8", "w-8", "border-b-2", "border-blue-600"], [1, "text-gray-600"], ["class", "whitespace-nowrap", "mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["mat-header-cell", "", "mat-sort-header", "", 1, "whitespace-nowrap"], [1, "max-w-40", "line-clamp-4", "me-4"], [1, "z-10", "material-symbols-outlined", "text-gray-500", 3, "matMenuTriggerFor"], [1, "cursor-pointer", "flex", "flex-col", "space-y-4", "p-3", 3, "click"], [1, "relative", "w-full"], ["type", "text", "placeholder", "T\xECm Ki\u1EBFm...", 1, "block", "w-full", "pl-10", "pr-4", "py-2", "text-gray-700", "bg-white", "border", "border-gray-300", "rounded-lg", "focus:border-blue-400", "focus:ring-blue-400", "focus:outline-none", "focus:ring", "focus:ring-opacity-40", 3, "keyup"], [1, "absolute", "inset-y-0", "left-0", "flex", "items-center", "pl-3", "pointer-events-none"], [1, "material-symbols-outlined", "text-gray-500"], [1, "flex", "flex-row", "space-x-2", "items-center", "justify-between"], [1, "flex", "flex-row", "space-x-2", "items-center"], [1, "text-xs", "text-blue-600", "underline", 3, "click"], [1, "w-full", "flex", "flex-col", "space-y-2", "max-h-44", "overflow-auto"], ["class", "flex flex-row space-x-2 items-center p-2 rounded-lg hover:bg-slate-100", 3, "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "flex", "flex-row", "space-x-2", "items-end", "justify-end"], ["mat-flat-button", "", "color", "warn", 3, "click"], ["mat-flat-button", "", "color", "primary", 3, "click"], [1, "flex", "flex-row", "space-x-2", "items-center", "p-2", "rounded-lg", "hover:bg-slate-100", 3, "click"], ["class", "material-symbols-outlined text-blue-600", 4, "ngIf"], [1, "material-symbols-outlined", "text-blue-600"], ["mat-cell", ""], [1, "max-w-40", "line-clamp-4", "flex", "items-center"], [1, "max-w-40", "line-clamp-4", "font-bold", "text-blue-700"], [1, "max-w-40", "line-clamp-4", "text-xs"], [1, "max-w-40", "line-clamp-4"], [1, "max-w-40", "line-clamp-4", "text-end"], [1, "max-w-40", "line-clamp-4", "font-bold", 3, "ngClass"], [1, "max-w-40", "line-clamp-4", "flex", "items-center", 3, "click"], ["class", "material-symbols-outlined", 4, "ngIf"], [1, "material-symbols-outlined"], [1, "text-green-500"], [1, "text-red-500"], ["mat-header-row", ""], ["mat-row", "", 3, "click"], [1, "mat-row"], [1, "mat-cell", "p-4"], ["class", "text-center py-8", 4, "ngIf"], [1, "text-center", "py-8"], [1, "text-gray-500", "mb-2"], [1, "text-4xl"], [1, "text-gray-500"], ["mat-dialog-title", ""], ["mat-icon-button", "", "color", "primary", 3, "click"], [1, "lg:min-w-[400px]", "w-full", "h-full", "flex", "flex-col", "space-y-8", "items-center", "p-4"], [1, "w-full", "overflow-x-auto"], ["id", "printContent", 1, "w-full", "border-collapse"], [1, "p-2", "border", "border-gray-300", "bg-yellow-200", "text-center", "font-bold"], [4, "ngFor", "ngForOf"], [3, "align"], ["mat-flat-button", "", "color", "warn", "mat-dialog-close", "false"], ["class", "p-2 border border-gray-300 align-middle text-center", 4, "ngIf"], [1, "p-2", "border", "border-gray-300", "text-center"], [1, "p-2", "border", "border-gray-300"], [1, "p-2", "border", "border-gray-300", "text-right"], [1, "p-2", "border", "border-gray-300", "align-middle", "text-center"], [1, "mat-typography"], ["id", "exporttable", 1, "text-xs", "border-collapse", "border", "border-gray-300"], [1, "bg-gray-300"], [1, "p-2", "border", "border-gray-300", "text-center", "font-bold"], ["class", "hover:bg-gray-50", 4, "ngFor", "ngForOf"], ["align", "end"], ["mat-button", "", "mat-dialog-close", ""], [1, "hover:bg-gray-50"]], template: function ListcongnonccComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "mat-drawer-container", 12);
      \u0275\u0275template(1, ListcongnonccComponent_div_1_Template, 5, 0, "div", 13);
      \u0275\u0275elementStart(2, "mat-drawer", 14, 0);
      \u0275\u0275element(4, "router-outlet");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "div", 15)(6, "div", 16)(7, "div", 17)(8, "mat-form-field", 18)(9, "mat-label");
      \u0275\u0275text(10, "B\u1EAFt \u0110\u1EA7u");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "input", 19);
      \u0275\u0275listener("dateChange", function ListcongnonccComponent_Template_input_dateChange_11_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onDateChange($event));
      });
      \u0275\u0275twoWayListener("ngModelChange", function ListcongnonccComponent_Template_input_ngModelChange_11_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.SearchParams.Batdau, $event) || (ctx.SearchParams.Batdau = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275element(12, "mat-datepicker-toggle", 20)(13, "mat-datepicker", null, 1);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "mat-form-field", 18)(16, "mat-label");
      \u0275\u0275text(17, "K\u1EBFt Th\xFAc");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "input", 19);
      \u0275\u0275listener("dateChange", function ListcongnonccComponent_Template_input_dateChange_18_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onDateChange($event));
      });
      \u0275\u0275twoWayListener("ngModelChange", function ListcongnonccComponent_Template_input_ngModelChange_18_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.SearchParams.Ketthuc, $event) || (ctx.SearchParams.Ketthuc = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275element(19, "mat-datepicker-toggle", 20)(20, "mat-datepicker", null, 2);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "span", 21);
      \u0275\u0275listener("click", function ListcongnonccComponent_Template_span_click_22_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.ToggleAll());
      });
      \u0275\u0275text(23);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "span", 22);
      \u0275\u0275text(25);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "button", 23);
      \u0275\u0275listener("click", function ListcongnonccComponent_Template_button_click_26_listener() {
        \u0275\u0275restoreView(_r1);
        const dialogPreviewExport_r2 = \u0275\u0275reference(77);
        return \u0275\u0275resetView(ctx.openPreviewExport(dialogPreviewExport_r2));
      });
      \u0275\u0275elementStart(27, "mat-icon");
      \u0275\u0275text(28, "preview");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(29, "button", 24);
      \u0275\u0275template(30, ListcongnonccComponent_div_30_Template, 2, 0, "div", 25);
      \u0275\u0275elementStart(31, "mat-icon");
      \u0275\u0275text(32, "file_download");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(33, "mat-menu", null, 3)(35, "button", 26);
      \u0275\u0275listener("click", function ListcongnonccComponent_Template_button_click_35_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.ExportExcelTableFormat(ctx.editDathang, "Congnoncc"));
      });
      \u0275\u0275elementStart(36, "mat-icon");
      \u0275\u0275text(37, "table_view");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(38, "span");
      \u0275\u0275text(39, "Xu\u1EA5t \u0111\u1ECBnh d\u1EA1ng b\u1EA3ng (Chi ti\u1EBFt)");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(40, "button", 26);
      \u0275\u0275listener("click", function ListcongnonccComponent_Template_button_click_40_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.ExportExcelTwoSheets(ctx.editDathang, "Congnoncc"));
      });
      \u0275\u0275elementStart(41, "mat-icon");
      \u0275\u0275text(42, "library_books");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(43, "span");
      \u0275\u0275text(44, "Xu\u1EA5t \u0111\u1ECBnh d\u1EA1ng 2 sheet (T\u1ED5ng h\u1EE3p + Chi ti\u1EBFt)");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(45, "button", 27);
      \u0275\u0275listener("click", function ListcongnonccComponent_Template_button_click_45_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.doSearch());
      });
      \u0275\u0275template(46, ListcongnonccComponent_div_46_Template, 2, 0, "div", 25);
      \u0275\u0275elementStart(47, "mat-icon");
      \u0275\u0275text(48, "search");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(49, "button", 28)(50, "mat-icon");
      \u0275\u0275text(51, "tune");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(52, "mat-menu", null, 4)(54, "div", 29)(55, "mat-form-field", 30)(56, "input", 31);
      \u0275\u0275listener("input", function ListcongnonccComponent_Template_input_input_56_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.doFilterColumns($event));
      })("click", function ListcongnonccComponent_Template_input_click_56_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView($event.stopPropagation());
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(57, "mat-icon", 32);
      \u0275\u0275text(58, "search");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(59, "div", 33);
      \u0275\u0275repeaterCreate(60, ListcongnonccComponent_For_61_Template, 5, 2, "button", 34, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(62, "button", 35);
      \u0275\u0275listener("click", function ListcongnonccComponent_Template_button_click_62_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.isShowKH = !ctx.isShowKH);
      });
      \u0275\u0275elementStart(63, "mat-icon");
      \u0275\u0275text(64);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275template(65, ListcongnonccComponent_Conditional_65_Template, 29, 10, "div", 36);
      \u0275\u0275elementStart(66, "div", 37);
      \u0275\u0275template(67, ListcongnonccComponent_div_67_Template, 5, 0, "div", 38);
      \u0275\u0275elementStart(68, "table", 39);
      \u0275\u0275repeaterCreate(69, ListcongnonccComponent_For_70_Template, 3, 1, "ng-container", 40, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275template(71, ListcongnonccComponent_tr_71_Template, 1, 0, "tr", 41)(72, ListcongnonccComponent_tr_72_Template, 1, 3, "tr", 42)(73, ListcongnonccComponent_tr_73_Template, 3, 2, "tr", 43);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275template(74, ListcongnonccComponent_ng_template_74_Template, 38, 2, "ng-template", null, 5, \u0275\u0275templateRefExtractor)(76, ListcongnonccComponent_ng_template_76_Template, 38, 1, "ng-template", null, 6, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      const pickerBatdau_r34 = \u0275\u0275reference(14);
      const pickerKetthuc_r35 = \u0275\u0275reference(21);
      const exportMenu_r36 = \u0275\u0275reference(34);
      const menu_r37 = \u0275\u0275reference(53);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isLoading);
      \u0275\u0275advance();
      \u0275\u0275property("position", "end");
      \u0275\u0275advance(3);
      \u0275\u0275classProp("opacity-50", ctx.isLoading);
      \u0275\u0275advance(3);
      \u0275\u0275property("appearance", "outline")("subscriptSizing", "dynamic");
      \u0275\u0275advance(3);
      \u0275\u0275property("matDatepicker", pickerBatdau_r34);
      \u0275\u0275twoWayProperty("ngModel", ctx.SearchParams.Batdau);
      \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(33, _c1));
      \u0275\u0275advance();
      \u0275\u0275property("for", pickerBatdau_r34);
      \u0275\u0275advance(3);
      \u0275\u0275property("appearance", "outline")("subscriptSizing", "dynamic");
      \u0275\u0275advance(3);
      \u0275\u0275property("matDatepicker", pickerKetthuc_r35);
      \u0275\u0275twoWayProperty("ngModel", ctx.SearchParams.Ketthuc);
      \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(34, _c1));
      \u0275\u0275advance();
      \u0275\u0275property("for", pickerKetthuc_r35);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1(" ", ctx.CountItem, " B\u1EA3n Ghi ");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.editDathang.length, " \u0110\xE3 Ch\u1ECDn ");
      \u0275\u0275advance(4);
      \u0275\u0275property("matMenuTriggerFor", exportMenu_r36);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isExporting);
      \u0275\u0275advance();
      \u0275\u0275classProp("opacity-0", ctx.isExporting);
      \u0275\u0275advance(14);
      \u0275\u0275property("disabled", ctx.isSearching);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isSearching);
      \u0275\u0275advance();
      \u0275\u0275classProp("opacity-0", ctx.isSearching);
      \u0275\u0275advance(2);
      \u0275\u0275property("matMenuTriggerFor", menu_r37);
      \u0275\u0275advance(11);
      \u0275\u0275repeater(ctx.FilterColumns);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(ctx.isShowKH ? "visibility" : "visibility_off");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isShowKH ? 65 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.isLoading && ctx.dataSource.data.length === 0);
      \u0275\u0275advance();
      \u0275\u0275property("dataSource", ctx.dataSource);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.displayedColumns);
      \u0275\u0275advance(2);
      \u0275\u0275property("matHeaderRowDef", ctx.displayedColumns);
      \u0275\u0275advance();
      \u0275\u0275property("matRowDefColumns", ctx.displayedColumns);
    }
  }, dependencies: [
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatPrefix,
    MatSuffix,
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
    MatOption,
    CommonModule,
    NgClass,
    NgForOf,
    NgIf,
    DecimalPipe,
    DatePipe,
    FormsModule,
    DefaultValueAccessor,
    NgControlStatus,
    NgModel,
    MatTooltipModule,
    MatTooltip,
    MatDatepickerModule,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDialogModule,
    MatDialogClose,
    MatDialogTitle,
    MatDialogActions,
    MatDialogContent,
    MatAutocompleteModule,
    MatAutocomplete,
    MatAutocompleteTrigger,
    MatChipsModule,
    MatChip,
    MatChipRemove,
    MatChipSet
  ], styles: ['@charset "UTF-8";\n\n\n\n.w-full[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.h-full[_ngcontent-%COMP%] {\n  height: 100%;\n}\n.h-screen-12[_ngcontent-%COMP%] {\n  height: calc(100vh - 3rem);\n}\n.flex[_ngcontent-%COMP%] {\n  display: flex;\n}\n.flex-col[_ngcontent-%COMP%] {\n  flex-direction: column;\n}\n.flex-row[_ngcontent-%COMP%] {\n  flex-direction: row;\n}\n.space-y-2[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%]    + *[_ngcontent-%COMP%] {\n  margin-top: 0.5rem;\n}\n.space-x-2[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%]    + *[_ngcontent-%COMP%] {\n  margin-left: 0.5rem;\n}\n.grid[_ngcontent-%COMP%] {\n  display: grid;\n}\n@media (min-width: 1024px) {\n  .lg\\:grid-cols-2[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n}\n.gap-2[_ngcontent-%COMP%] {\n  gap: 0.5rem;\n}\n.items-center[_ngcontent-%COMP%] {\n  align-items: center;\n}\n.p-2[_ngcontent-%COMP%] {\n  padding: 0.5rem;\n}\n.fixed[_ngcontent-%COMP%] {\n  position: fixed;\n}\n.inset-0[_ngcontent-%COMP%] {\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n}\n.bg-white[_ngcontent-%COMP%] {\n  background-color: white;\n}\n.bg-opacity-75[_ngcontent-%COMP%] {\n  background-color: rgba(255, 255, 255, 0.75);\n}\n.justify-center[_ngcontent-%COMP%] {\n  justify-content: center;\n}\n.z-50[_ngcontent-%COMP%] {\n  z-index: 50;\n}\n.space-y-4[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%]    + *[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n}\n.animate-spin[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n}\n.rounded-full[_ngcontent-%COMP%] {\n  border-radius: 9999px;\n}\n.h-12[_ngcontent-%COMP%] {\n  height: 3rem;\n}\n.w-12[_ngcontent-%COMP%] {\n  width: 3rem;\n}\n.border-b-2[_ngcontent-%COMP%] {\n  border-bottom-width: 2px;\n}\n.border-blue-600[_ngcontent-%COMP%] {\n  border-color: #2563eb;\n}\n.text-lg[_ngcontent-%COMP%] {\n  font-size: 1.125rem;\n}\n.text-gray-700[_ngcontent-%COMP%] {\n  color: #374151;\n}\n.opacity-50[_ngcontent-%COMP%] {\n  opacity: 0.5;\n}\n@media (min-width: 1024px) {\n  .lg\\:flex[_ngcontent-%COMP%] {\n    display: flex;\n  }\n}\n.hidden[_ngcontent-%COMP%] {\n  display: none;\n}\n.cursor-pointer[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.whitespace-nowrap[_ngcontent-%COMP%] {\n  white-space: nowrap;\n}\n.rounded-lg[_ngcontent-%COMP%] {\n  border-radius: 0.5rem;\n}\n.bg-slate-200[_ngcontent-%COMP%] {\n  background-color: #e2e8f0;\n}\n.relative[_ngcontent-%COMP%] {\n  position: relative;\n}\n.absolute[_ngcontent-%COMP%] {\n  position: absolute;\n}\n.h-5[_ngcontent-%COMP%] {\n  height: 1.25rem;\n}\n.w-5[_ngcontent-%COMP%] {\n  width: 1.25rem;\n}\n.opacity-0[_ngcontent-%COMP%] {\n  opacity: 0;\n}\n.overflow-auto[_ngcontent-%COMP%] {\n  overflow: auto;\n}\n.flex-1[_ngcontent-%COMP%] {\n  flex: 1 1 0%;\n}\n.w-72[_ngcontent-%COMP%] {\n  width: 18rem;\n}\n.grid-cols-1[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(1, minmax(0, 1fr));\n}\n.gap-1[_ngcontent-%COMP%] {\n  gap: 0.25rem;\n}\n.max-h-40[_ngcontent-%COMP%] {\n  max-height: 10rem;\n}\n.max-h-96[_ngcontent-%COMP%] {\n  max-height: 24rem;\n}\n.hover\\:bg-gray-50[_ngcontent-%COMP%]:hover {\n  background-color: #f9fafb;\n}\n.text-blue-600[_ngcontent-%COMP%] {\n  color: #2563eb;\n}\n.hover\\:underline[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n.font-semibold[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n.text-green-600[_ngcontent-%COMP%] {\n  color: #059669;\n}\n.py-20[_ngcontent-%COMP%] {\n  padding-top: 5rem;\n  padding-bottom: 5rem;\n}\n.text-gray-500[_ngcontent-%COMP%] {\n  color: #6b7280;\n}\n.text-6xl[_ngcontent-%COMP%] {\n  font-size: 3.75rem;\n}\n.mb-4[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n}\n.text-xl[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n}\n.font-medium[_ngcontent-%COMP%] {\n  font-weight: 500;\n}\n.mb-2[_ngcontent-%COMP%] {\n  margin-bottom: 0.5rem;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.mat-mdc-table[_ngcontent-%COMP%] {\n  background: transparent;\n}\n.mat-mdc-header-row[_ngcontent-%COMP%] {\n  background-color: #f8fafc;\n}\n.mat-mdc-row[_ngcontent-%COMP%]:hover {\n  background-color: #f1f5f9;\n}\n.loading-state[_ngcontent-%COMP%] {\n  pointer-events: none;\n  opacity: 0.6;\n}\n@media (max-width: 768px) {\n  .mat-mdc-table[_ngcontent-%COMP%] {\n    font-size: 0.75rem;\n  }\n  .mat-mdc-header-cell[_ngcontent-%COMP%], \n   .mat-mdc-cell[_ngcontent-%COMP%] {\n    padding: 0.5rem 0.25rem;\n  }\n}\n.filter-active[_ngcontent-%COMP%] {\n  background-color: #dbeafe;\n  border-color: #3b82f6;\n}\n.export-animation[_ngcontent-%COMP%] {\n  transform: scale(0.95);\n  transition: transform 0.2s ease-in-out;\n}\n.export-animation[_ngcontent-%COMP%]:hover {\n  transform: scale(1);\n}\n.status-active[_ngcontent-%COMP%] {\n  color: #059669;\n  background-color: #d1fae5;\n  padding: 0.25rem 0.5rem;\n  border-radius: 0.375rem;\n  font-size: 0.75rem;\n  font-weight: 600;\n}\n.status-inactive[_ngcontent-%COMP%] {\n  color: #dc2626;\n  background-color: #fee2e2;\n  padding: 0.25rem 0.5rem;\n  border-radius: 0.375rem;\n  font-size: 0.75rem;\n  font-weight: 600;\n}\n.mat-drawer-container[_ngcontent-%COMP%] {\n  background-color: #fafafa;\n}\n.mat-drawer[_ngcontent-%COMP%] {\n  background-color: white;\n  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);\n}\n.mat-mdc-paginator[_ngcontent-%COMP%] {\n  background-color: white;\n  border-top: 1px solid #e5e7eb;\n}\n/*# sourceMappingURL=listcongnoncc.component.css.map */'] });
};
__decorate([
  Debounce(300)
], ListcongnonccComponent.prototype, "applyFilter", null);
__decorate([
  Debounce(100)
], ListcongnonccComponent.prototype, "doFilterCongnoncc", null);
__decorate([
  Debounce(100)
], ListcongnonccComponent.prototype, "doFilterNhomCongnoncc", null);
__decorate([
  memoize()
], ListcongnonccComponent.prototype, "FilterHederColumn", null);
__decorate([
  Debounce(300)
], ListcongnonccComponent.prototype, "doFilterHederColumn", null);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ListcongnonccComponent, { className: "ListcongnonccComponent", filePath: "src/app/admin/congnoncc/listcongnoncc/listcongnoncc.component.ts", lineNumber: 77 });
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
  ListcongnonccComponent
};
//# sourceMappingURL=chunk-YW2ZELFH.mjs.map
