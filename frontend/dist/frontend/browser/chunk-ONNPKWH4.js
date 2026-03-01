import {
  TrangThaiDon
} from "./chunk-T6TCKYMX.js";
import {
  DonhangService
} from "./chunk-5Z2QWFRS.js";
import {
  require_html2canvas
} from "./chunk-65WN44DK.js";
import {
  GoogleSheetService
} from "./chunk-LIZF5AEJ.js";
import {
  MatAutocomplete,
  MatAutocompleteModule,
  MatAutocompleteTrigger
} from "./chunk-Z5KZW63L.js";
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
  readExcelFile
} from "./chunk-DOJR6IHP.js";
import {
  require_xlsx_min
} from "./chunk-TF67DZTX.js";
import {
  require_moment
} from "./chunk-LIKOVN7R.js";
import {
  ConvertDriveData,
  GenId,
  convertToSlug
} from "./chunk-EMT3PHD4.js";
import {
  removeVietnameseAccents
} from "./chunk-MKCJCKWI.js";
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
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle
} from "./chunk-FL27G2EY.js";
import {
  MatSnackBar
} from "./chunk-43IDDEVP.js";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "./chunk-Z46IZ3PI.js";
import {
  GraphqlService
} from "./chunk-Y4MVQOE5.js";
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
  MatChipRemove,
  MatChipSet,
  MatChipsModule
} from "./chunk-QD44HLKX.js";
import {
  MatTooltip,
  MatTooltipModule
} from "./chunk-E3N2TZ4N.js";
import {
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
  MatSuffix,
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
  DecimalPipe,
  NgClass,
  NgForOf,
  NgIf
} from "./chunk-RKTFENMZ.js";
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
  __spreadValues,
  __toESM
} from "./chunk-SXK72SKC.js";

// src/app/admin/congnokhachhang/listcongnokhachhang/listcongnokhachhang.component.ts
var XLSX = __toESM(require_xlsx_min());
var import_moment = __toESM(require_moment());
var import_html2canvas = __toESM(require_html2canvas());
var _c0 = ["drawer"];
var _c1 = ["ConfirmDongboDialog"];
var _c2 = () => ({ standalone: true });
var _c3 = (a0, a1, a2, a3, a4) => ({ "text-blue-500": a0, "text-yellow-500": a1, "text-green-500": a2, "text-purple-500": a3, "text-red-500": a4 });
var _forTrack0 = ($index, $item) => $item.key;
function ListcongnokhachhangComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 46)(1, "div", 47);
    \u0275\u0275element(2, "div", 48);
    \u0275\u0275elementStart(3, "span", 49);
    \u0275\u0275text(4, "\u0110ang t\u1EA3i d\u1EEF li\u1EC7u...");
    \u0275\u0275elementEnd()()();
  }
}
function ListcongnokhachhangComponent_div_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 50);
    \u0275\u0275element(1, "div", 51);
    \u0275\u0275elementEnd();
  }
}
function ListcongnokhachhangComponent_div_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 50);
    \u0275\u0275element(1, "div", 51);
    \u0275\u0275elementEnd();
  }
}
function ListcongnokhachhangComponent_For_66_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 27);
    \u0275\u0275listener("click", function ListcongnokhachhangComponent_For_66_Template_button_click_0_listener($event) {
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
function ListcongnokhachhangComponent_Conditional_73_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-chip", 63);
    \u0275\u0275listener("removed", function ListcongnokhachhangComponent_Conditional_73_For_7_Template_mat_chip_removed_0_listener() {
      const nhomKH_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.removeSelectedNhomkhachhang(nhomKH_r8));
    });
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 64)(4, "mat-icon");
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
function ListcongnokhachhangComponent_Conditional_73_For_13_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 66);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const option_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(option_r9.description);
  }
}
function ListcongnokhachhangComponent_Conditional_73_For_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 59)(1, "span", 65);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, ListcongnokhachhangComponent_Conditional_73_For_13_Conditional_3_Template, 2, 1, "small", 66);
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
function ListcongnokhachhangComponent_Conditional_73_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 67);
    \u0275\u0275listener("click", function ListcongnokhachhangComponent_Conditional_73_Conditional_14_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.clearAllSelectedNhomKhachhang());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "close");
    \u0275\u0275elementEnd()();
  }
}
function ListcongnokhachhangComponent_Conditional_73_For_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-chip", 63);
    \u0275\u0275listener("removed", function ListcongnokhachhangComponent_Conditional_73_For_21_Template_mat_chip_removed_0_listener() {
      const customer_r12 = \u0275\u0275restoreView(_r11).$implicit;
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.removeSelectedCustomer(customer_r12));
    });
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 64)(4, "mat-icon");
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
function ListcongnokhachhangComponent_Conditional_73_For_27_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 66);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const option_r13 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("M\xE3 KH: ", option_r13.makh, "");
  }
}
function ListcongnokhachhangComponent_Conditional_73_For_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 59)(1, "span", 65);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, ListcongnokhachhangComponent_Conditional_73_For_27_Conditional_3_Template, 2, 1, "small", 66);
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
function ListcongnokhachhangComponent_Conditional_73_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 68);
    \u0275\u0275listener("click", function ListcongnokhachhangComponent_Conditional_73_Conditional_28_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.clearAllSelectedCustomers());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "close");
    \u0275\u0275elementEnd()();
  }
}
function ListcongnokhachhangComponent_Conditional_73_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 38)(1, "div", 52)(2, "div", 53);
    \u0275\u0275text(3, "Nh\xF3m Kh\xE1ch H\xE0ng ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "mat-form-field", 54)(5, "mat-chip-set", 55);
    \u0275\u0275repeaterCreate(6, ListcongnokhachhangComponent_Conditional_73_For_7_Template, 6, 3, "mat-chip", 56, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "input", 57, 8);
    \u0275\u0275listener("keyup", function ListcongnokhachhangComponent_Conditional_73_Template_input_keyup_8_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.doFilterNhomKhachhang($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "mat-autocomplete", 58, 9);
    \u0275\u0275listener("optionSelected", function ListcongnokhachhangComponent_Conditional_73_Template_mat_autocomplete_optionSelected_10_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.onNhomKhachhangSelected($event));
    });
    \u0275\u0275repeaterCreate(12, ListcongnokhachhangComponent_Conditional_73_For_13_Template, 4, 3, "mat-option", 59, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275template(14, ListcongnokhachhangComponent_Conditional_73_Conditional_14_Template, 3, 0, "button", 60);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 52)(16, "div", 53);
    \u0275\u0275text(17, "Kh\xE1ch H\xE0ng ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "mat-form-field", 54)(19, "mat-chip-set", 61);
    \u0275\u0275repeaterCreate(20, ListcongnokhachhangComponent_Conditional_73_For_21_Template, 6, 3, "mat-chip", 56, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "input", 57, 10);
    \u0275\u0275listener("keyup", function ListcongnokhachhangComponent_Conditional_73_Template_input_keyup_22_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.doFilterKhachhang($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "mat-autocomplete", 58, 11);
    \u0275\u0275listener("optionSelected", function ListcongnokhachhangComponent_Conditional_73_Template_mat_autocomplete_optionSelected_24_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.onCustomerSelected($event));
    });
    \u0275\u0275repeaterCreate(26, ListcongnokhachhangComponent_Conditional_73_For_27_Template, 4, 3, "mat-option", 59, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275template(28, ListcongnokhachhangComponent_Conditional_73_Conditional_28_Template, 3, 0, "button", 62);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const autoNhom_r15 = \u0275\u0275reference(11);
    const auto_r16 = \u0275\u0275reference(25);
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("appearance", "outline")("subscriptSizing", "dynamic");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r4.SelectedNhomKhachhang);
    \u0275\u0275advance(2);
    \u0275\u0275propertyInterpolate("placeholder", ctx_r4.SelectedNhomKhachhang.length === 0 ? "T\xECm v\xE0 ch\u1ECDn nhi\u1EC1u nh\xF3m kh\xE1ch h\xE0ng" : "Th\xEAm nh\xF3m kh\xE1ch h\xE0ng");
    \u0275\u0275property("matAutocomplete", autoNhom_r15);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r4.filterListNhomKhachhang);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r4.SelectedNhomKhachhang.length > 0 ? 14 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275property("appearance", "outline")("subscriptSizing", "dynamic");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r4.SelectedKhachhang);
    \u0275\u0275advance(2);
    \u0275\u0275propertyInterpolate("placeholder", ctx_r4.SelectedKhachhang.length === 0 ? "T\xECm v\xE0 ch\u1ECDn nhi\u1EC1u kh\xE1ch h\xE0ng" : "Th\xEAm kh\xE1ch h\xE0ng");
    \u0275\u0275property("matAutocomplete", auto_r16);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r4.filterListKhachhang);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r4.SelectedKhachhang.length > 0 ? 28 : -1);
  }
}
function ListcongnokhachhangComponent_div_75_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 69)(1, "div", 47);
    \u0275\u0275element(2, "div", 70);
    \u0275\u0275elementStart(3, "span", 71);
    \u0275\u0275text(4, "\u0110ang t\u1EA3i d\u1EEF li\u1EC7u...");
    \u0275\u0275elementEnd()()();
  }
}
function ListcongnokhachhangComponent_For_78_th_1_div_23_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 92);
    \u0275\u0275text(1, "check");
    \u0275\u0275elementEnd();
  }
}
function ListcongnokhachhangComponent_For_78_th_1_div_23_Case_2_Template(rf, ctx) {
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
function ListcongnokhachhangComponent_For_78_th_1_div_23_Case_3_Template(rf, ctx) {
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
function ListcongnokhachhangComponent_For_78_th_1_div_23_Case_4_Template(rf, ctx) {
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
function ListcongnokhachhangComponent_For_78_th_1_div_23_Case_5_Template(rf, ctx) {
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
function ListcongnokhachhangComponent_For_78_th_1_div_23_Case_6_Template(rf, ctx) {
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
function ListcongnokhachhangComponent_For_78_th_1_div_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 90);
    \u0275\u0275listener("click", function ListcongnokhachhangComponent_For_78_th_1_div_23_Template_div_click_0_listener() {
      const item_r20 = \u0275\u0275restoreView(_r19).$implicit;
      const column_r18 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.ChosenItem(item_r20, column_r18));
    });
    \u0275\u0275template(1, ListcongnokhachhangComponent_For_78_th_1_div_23_span_1_Template, 2, 0, "span", 91)(2, ListcongnokhachhangComponent_For_78_th_1_div_23_Case_2_Template, 3, 4, "span")(3, ListcongnokhachhangComponent_For_78_th_1_div_23_Case_3_Template, 3, 4, "span")(4, ListcongnokhachhangComponent_For_78_th_1_div_23_Case_4_Template, 3, 4, "span")(5, ListcongnokhachhangComponent_For_78_th_1_div_23_Case_5_Template, 2, 1, "span")(6, ListcongnokhachhangComponent_For_78_th_1_div_23_Case_6_Template, 2, 1, "span");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_24_0;
    const item_r20 = ctx.$implicit;
    const column_r18 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r4.CheckItem(item_r20));
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_24_0 = column_r18) === "createdAt" ? 2 : tmp_24_0 === "updatedAt" ? 3 : tmp_24_0 === "ngaygiao" ? 4 : tmp_24_0 === "haohut" ? 5 : 6);
  }
}
function ListcongnokhachhangComponent_For_78_th_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "th", 74)(1, "span", 75);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 76, 12);
    \u0275\u0275text(5, " filter_alt ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "mat-menu", null, 4)(8, "div", 77);
    \u0275\u0275listener("click", function ListcongnokhachhangComponent_For_78_th_1_Template_div_click_8_listener($event) {
      \u0275\u0275restoreView(_r17);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(9, "div", 78)(10, "input", 79);
    \u0275\u0275listener("keyup", function ListcongnokhachhangComponent_For_78_th_1_Template_input_keyup_10_listener($event) {
      \u0275\u0275restoreView(_r17);
      const column_r18 = \u0275\u0275nextContext().$implicit;
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.doFilterHederColumn($event, column_r18));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 80)(12, "span", 81);
    \u0275\u0275text(13, "search");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "div", 82)(15, "div", 83)(16, "span", 84);
    \u0275\u0275listener("click", function ListcongnokhachhangComponent_For_78_th_1_Template_span_click_16_listener() {
      \u0275\u0275restoreView(_r17);
      const column_r18 = \u0275\u0275nextContext().$implicit;
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.ChosenAll(ctx_r4.FilterHederColumn(ctx_r4.dataSource.filteredData, column_r18)));
    });
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "span", 84);
    \u0275\u0275listener("click", function ListcongnokhachhangComponent_For_78_th_1_Template_span_click_18_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.EmptyFiter());
    });
    \u0275\u0275text(19, "Xo\xE1");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "span", 84);
    \u0275\u0275listener("click", function ListcongnokhachhangComponent_For_78_th_1_Template_span_click_20_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.ResetFilter());
    });
    \u0275\u0275text(21, "Reset");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 85);
    \u0275\u0275template(23, ListcongnokhachhangComponent_For_78_th_1_div_23_Template, 7, 2, "div", 86);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div", 87)(25, "button", 88);
    \u0275\u0275listener("click", function ListcongnokhachhangComponent_For_78_th_1_Template_button_click_25_listener() {
      \u0275\u0275restoreView(_r17);
      const menuTrigger_r21 = \u0275\u0275reference(4);
      return \u0275\u0275resetView(menuTrigger_r21.closeMenu());
    });
    \u0275\u0275text(26, " \u0110\xF3ng ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "button", 89);
    \u0275\u0275listener("click", function ListcongnokhachhangComponent_For_78_th_1_Template_button_click_27_listener() {
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
function ListcongnokhachhangComponent_For_78_td_2_Case_1_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 102);
    \u0275\u0275text(1, "check_box");
    \u0275\u0275elementEnd();
  }
}
function ListcongnokhachhangComponent_For_78_td_2_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 100);
    \u0275\u0275listener("click", function ListcongnokhachhangComponent_For_78_td_2_Case_1_Template_span_click_0_listener() {
      \u0275\u0275restoreView(_r23);
      const row_r24 = \u0275\u0275nextContext().$implicit;
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.toggleDonhang(row_r24));
    });
    \u0275\u0275text(1);
    \u0275\u0275template(2, ListcongnokhachhangComponent_For_78_td_2_Case_1_span_2_Template, 2, 0, "span", 101);
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
    \u0275\u0275property("ngIf", ctx_r4.CheckItemInDonhang(row_r24));
  }
}
function ListcongnokhachhangComponent_For_78_td_2_Case_2_Template(rf, ctx) {
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
function ListcongnokhachhangComponent_For_78_td_2_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 96);
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
function ListcongnokhachhangComponent_For_78_td_2_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 97);
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
function ListcongnokhachhangComponent_For_78_td_2_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 97);
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
function ListcongnokhachhangComponent_For_78_td_2_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 98);
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
function ListcongnokhachhangComponent_For_78_td_2_Case_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 98);
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
function ListcongnokhachhangComponent_For_78_td_2_Case_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 98);
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
function ListcongnokhachhangComponent_For_78_td_2_Case_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 98);
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
function ListcongnokhachhangComponent_For_78_td_2_Case_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 98);
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
function ListcongnokhachhangComponent_For_78_td_2_Case_11_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 103);
    \u0275\u0275text(1, "check_circle");
    \u0275\u0275elementEnd();
  }
}
function ListcongnokhachhangComponent_For_78_td_2_Case_11_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 104);
    \u0275\u0275text(1, "cancel");
    \u0275\u0275elementEnd();
  }
}
function ListcongnokhachhangComponent_For_78_td_2_Case_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 97);
    \u0275\u0275template(1, ListcongnokhachhangComponent_For_78_td_2_Case_11_Conditional_1_Template, 2, 0, "mat-icon", 103)(2, ListcongnokhachhangComponent_For_78_td_2_Case_11_Conditional_2_Template, 2, 0, "mat-icon", 104);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r24 = \u0275\u0275nextContext().$implicit;
    const column_r18 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(row_r24[column_r18] ? 1 : 2);
  }
}
function ListcongnokhachhangComponent_For_78_td_2_Case_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 99);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r24 = \u0275\u0275nextContext().$implicit;
    const column_r18 = \u0275\u0275nextContext().$implicit;
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction5(2, _c3, row_r24[column_r18] === "dadat", row_r24[column_r18] === "dagiao", row_r24[column_r18] === "danhan", row_r24[column_r18] === "hoanthanh", row_r24[column_r18] === "huy"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r4.Trangthaidon[row_r24[column_r18]], " ");
  }
}
function ListcongnokhachhangComponent_For_78_td_2_Case_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 96);
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
function ListcongnokhachhangComponent_For_78_td_2_Case_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 97);
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
function ListcongnokhachhangComponent_For_78_td_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 93);
    \u0275\u0275template(1, ListcongnokhachhangComponent_For_78_td_2_Case_1_Template, 3, 2, "span", 94)(2, ListcongnokhachhangComponent_For_78_td_2_Case_2_Template, 2, 1, "span", 95)(3, ListcongnokhachhangComponent_For_78_td_2_Case_3_Template, 3, 4, "span", 96)(4, ListcongnokhachhangComponent_For_78_td_2_Case_4_Template, 3, 4, "span", 97)(5, ListcongnokhachhangComponent_For_78_td_2_Case_5_Template, 2, 1, "span", 97)(6, ListcongnokhachhangComponent_For_78_td_2_Case_6_Template, 2, 1, "span", 98)(7, ListcongnokhachhangComponent_For_78_td_2_Case_7_Template, 3, 4, "span", 98)(8, ListcongnokhachhangComponent_For_78_td_2_Case_8_Template, 3, 4, "span", 98)(9, ListcongnokhachhangComponent_For_78_td_2_Case_9_Template, 3, 4, "span", 98)(10, ListcongnokhachhangComponent_For_78_td_2_Case_10_Template, 3, 4, "span", 98)(11, ListcongnokhachhangComponent_For_78_td_2_Case_11_Template, 3, 1, "span", 97)(12, ListcongnokhachhangComponent_For_78_td_2_Case_12_Template, 2, 8, "span", 99)(13, ListcongnokhachhangComponent_For_78_td_2_Case_13_Template, 3, 4, "span", 96)(14, ListcongnokhachhangComponent_For_78_td_2_Case_14_Template, 2, 1, "span", 97);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_21_0;
    const column_r18 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_21_0 = column_r18) === "STT" ? 1 : tmp_21_0 === "madonhang" ? 2 : tmp_21_0 === "createdAt" ? 3 : tmp_21_0 === "ngaygiao" ? 4 : tmp_21_0 === "khachhang" ? 5 : tmp_21_0 === "dvt" ? 6 : tmp_21_0 === "soluong" ? 7 : tmp_21_0 === "tong" ? 8 : tmp_21_0 === "tongvat" ? 9 : tmp_21_0 === "tongtien" ? 10 : tmp_21_0 === "isActive" ? 11 : tmp_21_0 === "status" ? 12 : tmp_21_0 === "updatedAt" ? 13 : 14);
  }
}
function ListcongnokhachhangComponent_For_78_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0, 42);
    \u0275\u0275template(1, ListcongnokhachhangComponent_For_78_th_1_Template, 29, 5, "th", 72)(2, ListcongnokhachhangComponent_For_78_td_2_Template, 15, 1, "td", 73);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const column_r18 = ctx.$implicit;
    \u0275\u0275property("matColumnDef", column_r18);
  }
}
function ListcongnokhachhangComponent_tr_79_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 105);
  }
}
function ListcongnokhachhangComponent_tr_80_Template(rf, ctx) {
  if (rf & 1) {
    const _r27 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 106);
    \u0275\u0275listener("click", function ListcongnokhachhangComponent_tr_80_Template_tr_click_0_listener() {
      const row_r28 = \u0275\u0275restoreView(_r27).$implicit;
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.toggleDonhang(row_r28));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r28 = ctx.$implicit;
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275classMapInterpolate1("hover:bg-slate-100 ", ctx_r4.CheckItemInDonhang(row_r28) ? "!bg-slate-200" : "", "");
  }
}
function ListcongnokhachhangComponent_tr_81_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 110)(1, "div", 111)(2, "mat-icon", 112);
    \u0275\u0275text(3, "search_off");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "span", 113);
    \u0275\u0275text(5, "Kh\xF4ng t\xECm th\u1EA5y d\u1EEF li\u1EC7u");
    \u0275\u0275elementEnd()();
  }
}
function ListcongnokhachhangComponent_tr_81_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 107)(1, "td", 108);
    \u0275\u0275template(2, ListcongnokhachhangComponent_tr_81_div_2_Template, 6, 0, "div", 109);
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
function ListcongnokhachhangComponent_ng_template_82_ng_container_34_tr_1_td_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 127);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r30 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275attribute("rowspan", item_r30.sanpham.length);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 2, item_r30.ngaygiao, "dd/MM/yyyy"), " ");
  }
}
function ListcongnokhachhangComponent_ng_template_82_ng_container_34_tr_1_td_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 127);
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
function ListcongnokhachhangComponent_ng_template_82_ng_container_34_tr_1_td_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 127);
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
function ListcongnokhachhangComponent_ng_template_82_ng_container_34_tr_1_td_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 127);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r30 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275attribute("rowspan", item_r30.sanpham.length);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r30.madonhang, " ");
  }
}
function ListcongnokhachhangComponent_ng_template_82_ng_container_34_tr_1_td_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 127);
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
function ListcongnokhachhangComponent_ng_template_82_ng_container_34_tr_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr");
    \u0275\u0275template(1, ListcongnokhachhangComponent_ng_template_82_ng_container_34_tr_1_td_1_Template, 3, 5, "td", 123)(2, ListcongnokhachhangComponent_ng_template_82_ng_container_34_tr_1_td_2_Template, 2, 2, "td", 123)(3, ListcongnokhachhangComponent_ng_template_82_ng_container_34_tr_1_td_3_Template, 2, 2, "td", 123)(4, ListcongnokhachhangComponent_ng_template_82_ng_container_34_tr_1_td_4_Template, 2, 2, "td", 123)(5, ListcongnokhachhangComponent_ng_template_82_ng_container_34_tr_1_td_5_Template, 3, 5, "td", 123);
    \u0275\u0275elementStart(6, "td", 124);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td", 125);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td", 124);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td", 126);
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "td", 126);
    \u0275\u0275text(16);
    \u0275\u0275pipe(17, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "td", 126);
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
function ListcongnokhachhangComponent_ng_template_82_ng_container_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, ListcongnokhachhangComponent_ng_template_82_ng_container_34_tr_1_Template, 21, 20, "tr", 120);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const item_r30 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", item_r30.sanpham);
  }
}
function ListcongnokhachhangComponent_ng_template_82_Template(rf, ctx) {
  if (rf & 1) {
    const _r29 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "h2", 114);
    \u0275\u0275text(1, " C\xF4ng N\u1EE3 ");
    \u0275\u0275elementStart(2, "button", 115);
    \u0275\u0275listener("click", function ListcongnokhachhangComponent_ng_template_82_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r29);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.printContent());
    });
    \u0275\u0275elementStart(3, "mat-icon");
    \u0275\u0275text(4, "print");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(5, "mat-dialog-content")(6, "div", 116)(7, "div", 117)(8, "table", 118)(9, "thead")(10, "tr")(11, "th", 119);
    \u0275\u0275text(12, " NG\xC0Y GIAO ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th", 119);
    \u0275\u0275text(14, " M\xC3 KH\xC1CH H\xC0NG ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th", 119);
    \u0275\u0275text(16, " T\xCAN KH\xC1CH H\xC0NG ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "th", 119);
    \u0275\u0275text(18, " M\xC3 \u0110\u01A0N H\xC0NG ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "th", 119);
    \u0275\u0275text(20, " T\u1ED4NG TI\u1EC0N ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "th", 119);
    \u0275\u0275text(22, " M\xC3 H\xC0NG ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "th", 119);
    \u0275\u0275text(24, " T\xCAN H\xC0NG ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "th", 119);
    \u0275\u0275text(26, " \u0110VT ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "th", 119);
    \u0275\u0275text(28, " S\u1ED0 L\u01AF\u1EE2NG ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "th", 119);
    \u0275\u0275text(30, " \u0110\u01A0N GI\xC1 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "th", 119);
    \u0275\u0275text(32, " TH\xC0NH TI\u1EC0N ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(33, "tbody");
    \u0275\u0275template(34, ListcongnokhachhangComponent_ng_template_82_ng_container_34_Template, 2, 1, "ng-container", 120);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(35, "mat-dialog-actions", 121)(36, "button", 122);
    \u0275\u0275text(37, "\u0110\xF3ng");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance(34);
    \u0275\u0275property("ngForOf", ctx_r4.editDonhang);
    \u0275\u0275advance();
    \u0275\u0275property("align", "end");
  }
}
function ListcongnokhachhangComponent_ng_template_84_tr_76_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 144)(1, "td", 124);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "td", 124);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td", 125);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td", 124);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td", 124);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td", 125);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td", 124);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "td", 126);
    \u0275\u0275text(17);
    \u0275\u0275pipe(18, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "td", 126);
    \u0275\u0275text(20);
    \u0275\u0275pipe(21, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "td", 126);
    \u0275\u0275text(23);
    \u0275\u0275pipe(24, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "td", 126);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r33 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(3, 11, item_r33.ngaygiao, "dd/MM/yyyy"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", item_r33.makh, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", item_r33.tenkh, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", item_r33.madonhang, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", item_r33.masp, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", item_r33.tensp, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", item_r33.dvt, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(18, 14, item_r33.slnhan, "1.1-3"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(21, 17, item_r33.giaban, "1.0-0"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(24, 20, item_r33.ttnhan, "1.0-0"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", item_r33.ghichu, " ");
  }
}
function ListcongnokhachhangComponent_ng_template_84_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h2", 114);
    \u0275\u0275text(1, "Xem Tr\u01B0\u1EDBc M\u1EABu Excel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "mat-dialog-content", 128)(3, "div", 117)(4, "table", 129)(5, "thead")(6, "tr")(7, "th", 130);
    \u0275\u0275element(8, "img", 131);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th", 132)(10, "span", 133);
    \u0275\u0275text(11, "C\xD4NG TY TNHH N\xD4NG S\u1EA2N TH\u1EF0C PH\u1EA8M TR\u1EA6N GIA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span");
    \u0275\u0275text(13, "HTX: \u1EA4p L\u1ED9c Ti\u1EBFn, X\xE3 M\u1EF9 L\u1ED9c, Huy\u1EC7n C\u1EA7n Giu\u1ED9c, T\u1EC9nh Long An");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span");
    \u0275\u0275text(15, "VP: T\xF2a nh\xE0 An Ph\xFA Plaza, 117-119 L\xFD Ch\xEDnh Th\u1EAFng, P.7. Q.3,");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "span");
    \u0275\u0275text(17, "TP.HCM Kho s\u01A1 ch\u1EBF: 30 Kha V\u1EA1n C\xE2n, P. Hi\u1EC7p B\xECnh Ch\xE1nh,");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "span");
    \u0275\u0275text(19, "TP.Th\u1EE7 \u0110\u1EE9c, TP.HCM Kho \u0110\xE0 L\u1EA1t: 69 Tr\u1EA7n Th\u1EE7 \u0110\u1ED9,");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "span");
    \u0275\u0275text(21, "TT Li\xEAn Ngh\u0129a, Huy\u1EC7n \u0110\u1EE9c Tr\u1ECDng, T\u1EC9nh L\xE2m \u0110\u1ED3ng.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "span");
    \u0275\u0275text(23, "Website: rausachtrangia.com - Hotline: 090.245.8081");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(24, "thead")(25, "tr")(26, "th", 134);
    \u0275\u0275text(27, "CHI TI\u1EBET \u0110\u1ED0I CHI\u1EBEU C\xD4NG N\u1EE2");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(28, "thead")(29, "tr")(30, "th", 135);
    \u0275\u0275text(31);
    \u0275\u0275pipe(32, "date");
    \u0275\u0275pipe(33, "date");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(34, "thead")(35, "tr")(36, "th", 135);
    \u0275\u0275text(37);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(38, "thead")(39, "tr")(40, "th", 135);
    \u0275\u0275text(41);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(42, "tbody")(43, "tr")(44, "th", 130);
    \u0275\u0275text(45);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "th", 136);
    \u0275\u0275text(47);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(48, "thead")(49, "tr", 137);
    \u0275\u0275element(50, "th", 138);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(51, "thead")(52, "tr", 139)(53, "th", 140);
    \u0275\u0275text(54, "NG\xC0Y GIAO");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(55, "th", 140);
    \u0275\u0275text(56, "M\xC3 KH\xC1CH H\xC0NG");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(57, "th", 140);
    \u0275\u0275text(58, "T\xCAN KH\xC1CH H\xC0NG");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(59, "th", 140);
    \u0275\u0275text(60, "M\xC3 \u0110\u01A0N H\xC0NG");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(61, "th", 140);
    \u0275\u0275text(62, "M\xC3 H\xC0NG");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(63, "th", 140);
    \u0275\u0275text(64, "T\xCAN H\xC0NG");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(65, "th", 140);
    \u0275\u0275text(66, "\u0110VT");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(67, "th", 140);
    \u0275\u0275text(68, "S\u1ED0 L\u01AF\u1EE2NG");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(69, "th", 140);
    \u0275\u0275text(70, "\u0110\u01A0N GI\xC1");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(71, "th", 140);
    \u0275\u0275text(72, "TH\xC0NH TI\u1EC0N");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(73, "th", 140);
    \u0275\u0275text(74, "GHI CH\xDA");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(75, "tbody");
    \u0275\u0275template(76, ListcongnokhachhangComponent_ng_template_84_tr_76_Template, 27, 23, "tr", 141);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(77, "mat-dialog-actions", 142)(78, "button", 143);
    \u0275\u0275text(79, "\u0110\xF3ng");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance(31);
    \u0275\u0275textInterpolate2(" T\u1EEB Ng\xE0y ", \u0275\u0275pipeBind2(32, 7, ctx_r4.SearchParams.Batdau, "dd/MM/yyyy"), " : - \u0110\u1EBFn Ng\xE0y : ", \u0275\u0275pipeBind2(33, 10, ctx_r4.SearchParams.Ketthuc, "dd/MM/yyyy"), " ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("T\xEAn Kh\xE1ch H\xE0ng : ", ctx_r4.exampleExport[0] == null ? null : ctx_r4.exampleExport[0].tenkh, "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("\u0110\u1ECBa Ch\u1EC9 : ", ctx_r4.exampleExport[0] == null ? null : ctx_r4.exampleExport[0].diachi, "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("Ng\u01B0\u1EDDi Li\xEAn h\u1EC7 : ", ctx_r4.exampleExport[0] == null ? null : ctx_r4.exampleExport[0].lienhe, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Email : ", ctx_r4.exampleExport[0] == null ? null : ctx_r4.exampleExport[0].email, "");
    \u0275\u0275advance(29);
    \u0275\u0275property("ngForOf", ctx_r4.exampleExport);
  }
}
function ListcongnokhachhangComponent_ng_template_86_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 145)(1, "mat-icon", 146);
    \u0275\u0275text(2, "currency_exchange");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 147);
    \u0275\u0275text(4, "X\xE1c nh\u1EADn \u0111\u1ED3ng b\u1ED9 gi\xE1 v\xE0 VAT");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "mat-dialog-content", 128)(6, "div", 148)(7, "div", 149)(8, "mat-icon", 150);
    \u0275\u0275text(9, "info");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 151)(11, "h4", 152);
    \u0275\u0275text(12, "Th\xF4ng tin \u0111\u1ED3ng b\u1ED9");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "p", 153);
    \u0275\u0275text(14, " \u0110\u1ED3ng b\u1ED9 gi\xE1 v\xE0 VAT cho ");
    \u0275\u0275elementStart(15, "strong", 154);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275text(17, " \u0111\u01B0\u1EE3c ch\u1ECDn ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "div", 155)(19, "h4", 156);
    \u0275\u0275text(20, "Thao t\xE1c s\u1EBD th\u1EF1c hi\u1EC7n:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "ul", 157)(22, "li", 158)(23, "mat-icon", 159);
    \u0275\u0275text(24, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "span");
    \u0275\u0275text(26, "C\u1EADp nh\u1EADt gi\xE1 b\xE1n t\u1EEB b\u1EA3ng gi\xE1 t\u01B0\u01A1ng \u1EE9ng");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "li", 158)(28, "mat-icon", 159);
    \u0275\u0275text(29, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "span");
    \u0275\u0275text(31, "T\xEDnh l\u1EA1i t\u1ED5ng ti\u1EC1n c\u1EE7a \u0111\u01A1n h\xE0ng");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "li", 158)(33, "mat-icon", 159);
    \u0275\u0275text(34, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "span");
    \u0275\u0275text(36, "T\xEDnh l\u1EA1i VAT d\u1EF1a tr\xEAn t\u1ED5ng ti\u1EC1n v\xE0 t\u1EF7 l\u1EC7 VAT");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(37, "li", 158)(38, "mat-icon", 159);
    \u0275\u0275text(39, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "span");
    \u0275\u0275text(41, "C\u1EADp nh\u1EADt tr\u01B0\u1EDDng tongvat cho t\u1EA5t c\u1EA3 \u0111\u01A1n h\xE0ng");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(42, "li", 158)(43, "mat-icon", 159);
    \u0275\u0275text(44, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "span");
    \u0275\u0275text(46, "L\u01B0u thay \u0111\u1ED5i v\xE0o c\u01A1 s\u1EDF d\u1EEF li\u1EC7u");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(47, "div", 160)(48, "mat-icon", 161);
    \u0275\u0275text(49, "warning");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "div", 151)(51, "h4", 162);
    \u0275\u0275text(52, "L\u01B0u \xFD quan tr\u1ECDng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(53, "p", 163);
    \u0275\u0275text(54, " Thao t\xE1c n\xE0y s\u1EBD thay \u0111\u1ED5i d\u1EEF li\u1EC7u hi\u1EC7n t\u1EA1i v\xE0 kh\xF4ng th\u1EC3 ho\xE0n t\xE1c. Vui l\xF2ng \u0111\u1EA3m b\u1EA3o b\u1EA1n \u0111\xE3 ki\u1EC3m tra k\u1EF9 tr\u01B0\u1EDBc khi th\u1EF1c hi\u1EC7n. ");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(55, "mat-dialog-actions", 164)(56, "button", 143);
    \u0275\u0275text(57, "H\u1EE7y");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "button", 165)(59, "mat-icon", 166);
    \u0275\u0275text(60, "currency_exchange");
    \u0275\u0275elementEnd();
    \u0275\u0275text(61, " X\xE1c nh\u1EADn \u0111\u1ED3ng b\u1ED9 ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance(16);
    \u0275\u0275textInterpolate1("", ctx_r4.editDonhang.length, " \u0111\u01A1n h\xE0ng");
    \u0275\u0275advance(42);
    \u0275\u0275property("mat-dialog-close", "true");
  }
}
var ListcongnokhachhangComponent = class _ListcongnokhachhangComponent {
  Detail = {};
  // Loading states
  isLoading = false;
  isSearching = false;
  isExporting = false;
  isShowKH = true;
  displayedColumns = [
    "ngaygiao",
    "madonhang",
    "makh",
    "name",
    "soluong",
    "tong",
    "tongvat",
    "tongtien"
  ];
  ColumnName = {
    ngaygiao: "Ng\xE0y Giao",
    madonhang: "M\xE3 \u0110\u01A1n H\xE0ng",
    makh: "M\xE3 Kh\xE1ch H\xE0ng",
    name: "T\xEAn Kh\xE1ch H\xE0ng",
    soluong: "S\u1ED1 L\u01B0\u1EE3ng",
    tong: "T\u1ED5ng",
    tongvat: "T\u1ED5ng VAT",
    tongtien: "T\u1ED5ng Ti\u1EC1n"
  };
  FilterColumns = JSON.parse(localStorage.getItem("CongnoColFilter") || "[]");
  exampleExport = {};
  Columns = [];
  isFilter = false;
  Trangthaidon = TrangThaiDon;
  paginator;
  sort;
  drawer;
  confirmDongboDialog;
  filterValues = {};
  _DonhangService = inject(DonhangService);
  _breakpointObserver = inject(BreakpointObserver);
  _GoogleSheetService = inject(GoogleSheetService);
  _GraphqlService = inject(GraphqlService);
  _router = inject(Router);
  Listdonhang = this._DonhangService.ListDonhang;
  ListKhachhang = [];
  filterListKhachhang = [];
  ListNhomKhachhang = [];
  filterListNhomKhachhang = [];
  SelectedKhachhang = [];
  // Array to store selected customers
  SelectedNhomKhachhang = [];
  // Array to store selected customers
  ListCongno = [];
  dataSource = new MatTableDataSource([]);
  donhangId = this._DonhangService.donhangId;
  _snackBar = inject(MatSnackBar);
  CountItem = 0;
  SearchParams = {
    Batdau: (0, import_moment.default)().toDate(),
    Ketthuc: (0, import_moment.default)().toDate(),
    Type: "donsi",
    Status: ["danhan", "hoanthanh"],
    khachhangIds: []
    // Array of selected customer IDs
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
    return typeof customer === "string" ? customer : customer.name || customer.makh || "Unknown";
  }
  // Display function for customer group names in chips
  getNhomKhachhangName(nhom) {
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
  onKhachhangChange(event) {
    this.onCustomerSelected(event);
  }
  onNhomKhachhangChange(event) {
    this.onNhomKhachhangSelected(event);
  }
  // Method to handle customer group selection from chips autocomplete
  onNhomKhachhangSelected(event) {
    const selectedValue = event.option.value;
    const fullObject = this.ListNhomKhachhang.find((item) => (typeof item === "string" ? item : item.name) === selectedValue);
    const objectToAdd = fullObject || selectedValue;
    const isAlreadySelected = this.SelectedNhomKhachhang.some((nhomKH) => (typeof nhomKH === "string" ? nhomKH : nhomKH.name) === selectedValue);
    if (!isAlreadySelected) {
      this.SelectedNhomKhachhang.push(objectToAdd);
      this.addCustomersFromGroup(fullObject);
      this.refreshNhomKhachhangFilter();
      this.refreshCustomerFilter();
    }
    setTimeout(() => {
      const inputs = document.querySelectorAll("input[matautocomplete]");
      inputs.forEach((input) => {
        if (input.placeholder.includes("nh\xF3m kh\xE1ch h\xE0ng") || input.placeholder.includes("Th\xEAm nh\xF3m kh\xE1ch h\xE0ng")) {
          input.value = "";
        }
      });
    }, 100);
  }
  doFilterKhachhang(event) {
    const query = event.target.value.toLowerCase();
    console.log("query", query);
    const selectedNames = this.SelectedKhachhang.map((customer) => typeof customer === "string" ? customer : customer.name);
    let availableCustomers = this.ListKhachhang.filter((item) => {
      const itemName = typeof item === "string" ? item : item.name;
      return !selectedNames.includes(itemName);
    });
    if (!query) {
      this.filterListKhachhang = availableCustomers;
      return;
    }
    this.filterListKhachhang = availableCustomers.filter((item) => item?.name?.toLowerCase().includes(query) || removeVietnameseAccents(item?.name).toLowerCase().includes(removeVietnameseAccents(query)) || item?.makh?.toLowerCase().includes(query) || removeVietnameseAccents(item?.makh).toLowerCase().includes(removeVietnameseAccents(query)));
  }
  doFilterNhomKhachhang(event) {
    const query = event.target.value.toLowerCase();
    console.log("query", query);
    const selectedNames = this.SelectedNhomKhachhang.map((nhomKH) => typeof nhomKH === "string" ? nhomKH : nhomKH.name);
    let availableGroups = this.ListNhomKhachhang.filter((item) => {
      const itemName = typeof item === "string" ? item : item.name;
      return !selectedNames.includes(itemName);
    });
    if (!query) {
      this.filterListNhomKhachhang = availableGroups;
      return;
    }
    this.filterListNhomKhachhang = availableGroups.filter((item) => {
      const name = typeof item === "string" ? item : item.name || "";
      const description = typeof item !== "string" ? item.description || "" : "";
      return name.toLowerCase().includes(query) || removeVietnameseAccents(name).toLowerCase().includes(removeVietnameseAccents(query)) || description.toLowerCase().includes(query) || removeVietnameseAccents(description).toLowerCase().includes(removeVietnameseAccents(query));
    });
  }
  // Method to handle customer selection from chips autocomplete
  onCustomerSelected(event) {
    const selectedValue = event.option.value;
    const fullObject = this.ListKhachhang.find((item) => (typeof item === "string" ? item : item.name) === selectedValue);
    const objectToAdd = fullObject || selectedValue;
    const isAlreadySelected = this.SelectedKhachhang.some((customer) => (typeof customer === "string" ? customer : customer.name) === selectedValue);
    if (!isAlreadySelected) {
      this.SelectedKhachhang.push(objectToAdd);
      this.SearchParams.khachhangIds = this.SelectedKhachhang.map((customer) => typeof customer === "string" ? customer : customer.id);
      this.refreshCustomerFilter();
    }
    setTimeout(() => {
      const inputs = document.querySelectorAll("input[matautocomplete]");
      inputs.forEach((input) => {
        if (input.placeholder.includes("kh\xE1ch h\xE0ng") || input.placeholder.includes("Th\xEAm kh\xE1ch h\xE0ng")) {
          input.value = "";
        }
      });
    }, 100);
  }
  // Method to remove selected customer
  removeSelectedCustomer(customer) {
    const index = this.SelectedKhachhang.findIndex((item) => (typeof item === "string" ? item : item.name) === (typeof customer === "string" ? customer : customer.name));
    if (index >= 0) {
      this.SelectedKhachhang.splice(index, 1);
      this.SearchParams.khachhangIds = this.SelectedKhachhang.map((customer2) => typeof customer2 === "string" ? customer2 : customer2.id);
      this.refreshCustomerFilter();
    }
  }
  removeSelectedNhomkhachhang(nhomKH) {
    const index = this.SelectedNhomKhachhang.findIndex((item) => (typeof item === "string" ? item : item.name) === (typeof nhomKH === "string" ? nhomKH : nhomKH.name));
    if (index >= 0) {
      this.removeCustomersFromGroup(nhomKH);
      this.SelectedNhomKhachhang.splice(index, 1);
      this.refreshNhomKhachhangFilter();
      this.refreshCustomerFilter();
    }
  }
  // Method to clear all selected customers
  clearAllSelectedCustomers() {
    this.SelectedKhachhang = [];
    this.SearchParams.khachhangIds = [];
    this.refreshCustomerFilter();
  }
  clearAllSelectedNhomKhachhang() {
    this.SelectedNhomKhachhang.forEach((nhomKH) => {
      this.removeCustomersFromGroup(nhomKH);
    });
    this.SelectedNhomKhachhang = [];
    this.refreshNhomKhachhangFilter();
    this.refreshCustomerFilter();
  }
  // Helper methods to refresh filter lists
  refreshCustomerFilter() {
    const selectedNames = this.SelectedKhachhang.map((customer) => typeof customer === "string" ? customer : customer.name);
    this.filterListKhachhang = this.ListKhachhang.filter((item) => {
      const itemName = typeof item === "string" ? item : item.name;
      return !selectedNames.includes(itemName);
    });
  }
  refreshNhomKhachhangFilter() {
    const selectedNames = this.SelectedNhomKhachhang.map((nhomKH) => typeof nhomKH === "string" ? nhomKH : nhomKH.name);
    this.filterListNhomKhachhang = this.ListNhomKhachhang.filter((item) => {
      const itemName = typeof item === "string" ? item : item.name;
      return !selectedNames.includes(itemName);
    });
  }
  // Helper method to add customers from a selected customer group
  addCustomersFromGroup(nhomKhachhang) {
    if (!nhomKhachhang || typeof nhomKhachhang === "string")
      return;
    const customersInGroup = nhomKhachhang.khachhang || [];
    customersInGroup.forEach((customer) => {
      const isAlreadySelected = this.SelectedKhachhang.some((selectedCustomer) => (typeof selectedCustomer === "string" ? selectedCustomer : selectedCustomer.name) === customer.name);
      if (!isAlreadySelected) {
        this.SelectedKhachhang.push(customer);
      }
    });
    this.SearchParams.khachhangIds = this.SelectedKhachhang.map((customer) => typeof customer === "string" ? customer : customer.id);
  }
  // Helper method to remove customers from a deselected customer group
  removeCustomersFromGroup(nhomKhachhang) {
    if (!nhomKhachhang || typeof nhomKhachhang === "string")
      return;
    const customersInGroup = nhomKhachhang.khachhang || [];
    customersInGroup.forEach((customer) => {
      const index = this.SelectedKhachhang.findIndex((selectedCustomer) => (typeof selectedCustomer === "string" ? selectedCustomer : selectedCustomer.name) === customer.name);
      if (index >= 0) {
        this.SelectedKhachhang.splice(index, 1);
      }
    });
    this.SearchParams.khachhangIds = this.SelectedKhachhang.map((customer) => typeof customer === "string" ? customer : customer.id);
  }
  loadData(query) {
    return __async(this, null, function* () {
      this.isLoading = true;
      try {
        yield this._DonhangService.searchCongno(query);
        this.CountItem = this.Listdonhang().length || 0;
        const customerTotals = /* @__PURE__ */ new Map();
        this.ListCongno = this.Listdonhang();
        console.log("this.ListCongno", this.ListCongno);
        this.dataSource = new MatTableDataSource(this.ListCongno);
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = this.createFilter();
        const Khachhangs = yield this._GraphqlService.findAll("khachhang", {
          aggressiveCache: true,
          enableStreaming: true,
          select: {
            id: true,
            name: true,
            makh: true
          }
        });
        this.ListKhachhang = this.filterListKhachhang = Khachhangs.data;
        const NhomKhachhangs = yield this._GraphqlService.findAll("nhomkhachhang", {
          aggressiveCache: true,
          enableStreaming: true,
          select: {
            id: true,
            name: true,
            description: true,
            khachhang: { select: {
              id: true,
              name: true,
              makh: true
            } }
          }
        });
        this.ListNhomKhachhang = this.filterListNhomKhachhang = NhomKhachhangs.data;
      } finally {
        this.isLoading = false;
      }
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
      localStorage.setItem("CongnoColFilter", JSON.stringify(this.FilterColumns));
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
    localStorage.setItem("CongnoColFilter", JSON.stringify(this.FilterColumns));
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
    this.dataSource.filteredData = this.Listdonhang().filter((v) => removeVietnameseAccents(v[column]).includes(event.target.value.toLowerCase()) || v[column].toLowerCase().includes(event.target.value.toLowerCase()));
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
    this.ListFilter = this.Listdonhang();
    this.dataSource.data = this.Listdonhang();
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
    this.dataSource.data = this.Listdonhang().filter((v) => this.ListFilter.some((v1) => v1.id === v.id));
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    menu.closeMenu();
  }
  create() {
    this.drawer.open();
    this._router.navigate(["admin/congnokhachhang", 0]);
  }
  goToDetail(item) {
    this._DonhangService.setDonhangId(item.id);
    this.drawer.open();
    this._router.navigate(["admin/congnokhachhang", item.id]);
  }
  ToggleAll() {
    if (this.editDonhang.length === this.dataSource.filteredData.length) {
      this.editDonhang = [];
    } else {
      this.editDonhang = [...this.dataSource.filteredData];
    }
  }
  editDonhang = [];
  toggleDonhang(item) {
    const index = this.editDonhang.findIndex((v) => v.id === item.id);
    if (index !== -1) {
      this.editDonhang.splice(index, 1);
    } else {
      this.editDonhang.push(item);
    }
  }
  TinhTong(items, fieldTong) {
    return items?.reduce((sum, item) => sum + (item[fieldTong] || 0), 0) || 0;
  }
  dialog = inject(MatDialog);
  dialogCreateRef;
  Phieuchia = [];
  openCreateDialog(teamplate) {
    this.Phieuchia = this.editDonhang.map((v) => ({
      makh: v.khachhang?.makh,
      name: v.khachhang?.name,
      madonhang: v.madonhang,
      ngaygiao: v.ngaygiao,
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
      if (this.editDonhang.length > 0) {
        const ListExport = yield this.ChuyendoiExport(this.editDonhang);
        this.exampleExport = this.convertFlatData(ListExport[0] || {});
        console.log("exampleExport", this.exampleExport);
        this.dialogCreateRef = this.dialog.open(teamplate, {
          hasBackdrop: true,
          disableClose: true
        });
      } else {
        this._snackBar.open("Vui l\xF2ng ch\u1ECDn \xEDt nh\u1EA5t m\u1ED9t kh\xE1ch h\xE0ng", "\u0110\xF3ng", {
          duration: 3e3,
          horizontalPosition: "center",
          verticalPosition: "top",
          panelClass: ["snackbar-warning"]
        });
      }
    });
  }
  convertFlatData(data) {
    return data?.sanpham?.filter((item) => Number(item.slnhan) > 0)?.map((item) => ({
      "madonhang": data.madonhang,
      "ngaygiao": data.ngaygiao,
      "masp": item.sanpham.masp,
      "tensp": item.sanpham.title,
      "dvt": item.sanpham.dvt,
      "slnhan": item.slnhan,
      "giaban": item.giaban,
      "ttnhan": item.ttnhan,
      "makh": data.khachhang.makh,
      "tenkh": data.khachhang.name,
      "diachi": data.khachhang.diachi || "",
      "email": data.khachhang.email || "",
      "ghichu": item.ghichu || ""
    }));
  }
  ChuyendoiExport(item) {
    return __async(this, null, function* () {
      const where = {
        ngaygiao: { gte: (0, import_moment.default)(this.SearchParams.Batdau).startOf("day").toDate(), lte: (0, import_moment.default)(this.SearchParams.Ketthuc).endOf("day").toDate() },
        status: { in: this.SearchParams.Status }
      };
      if (item && item.length > 0) {
        where.id = { in: item.map((v) => v.id) };
      } else if (this.SearchParams.khachhangIds?.length > 0) {
        where.khachhangId = { in: this.SearchParams.khachhangIds };
      }
      const Donhangs = yield this._GraphqlService.findAll("donhang", {
        aggressiveCache: true,
        enableStreaming: true,
        take: 999999,
        where,
        orderBy: [
          { khachhang: { name: "asc" } },
          { ngaygiao: "asc" }
        ],
        select: {
          id: true,
          madonhang: true,
          ngaygiao: true,
          tongtien: true,
          tongvat: true,
          isshowvat: true,
          vat: true,
          sanpham: {
            select: {
              slnhan: true,
              ttnhan: true,
              giaban: true,
              vat: true,
              ghichu: true,
              sanpham: {
                select: {
                  masp: true,
                  title: true,
                  dvt: true
                }
              }
            }
          },
          khachhang: {
            select: {
              id: true,
              makh: true,
              name: true,
              diachi: true,
              email: true,
              nhomkhachhang: {
                select: {
                  name: true
                }
              }
            }
          }
        }
      });
      return Donhangs.data;
    });
  }
  BackStatus() {
    this.editDonhang.forEach((v) => {
      v.status = "dadat";
      this._DonhangService.updateDonhang(v);
    });
    this.ngOnInit();
  }
  Hoanthanh() {
    this.editDonhang.forEach((v) => {
      v.status = "hoanthanh";
      this._DonhangService.updateDonhang(v);
    });
  }
  getUniqueProducts() {
    const products = /* @__PURE__ */ new Set();
    this.Phieuchia.forEach((kh) => kh.sanpham.forEach((sp) => products.add(sp.title)));
    return Array.from(products);
  }
  getProductQuantity(product, makh) {
    const customer = this.Phieuchia.find((kh) => kh.makh === makh);
    const item = customer?.sanpham.find((sp) => sp.title === product);
    return item ? item.slgiao : "";
  }
  getDvtForProduct(product) {
    const uniqueProducts = Array.from(new Map(this.Phieuchia.flatMap((c) => c.sanpham.map((sp) => __spreadProps(__spreadValues({}, sp), { makh: c.makh, name: c.name }))).map((p) => [p.title, p])).values());
    const item = uniqueProducts.find((sp) => sp.title === product);
    return item ? item.dvt : "";
  }
  CheckItemInDonhang(item) {
    return this.editDonhang.findIndex((v) => v.id === item.id) !== -1;
  }
  DeleteDonhang() {
  }
  LoadDrive() {
    return __async(this, null, function* () {
      const DriveInfo = {
        IdSheet: "15npo25qyH5FmfcEjl1uyqqyFMS_vdFnmxM_kt0KYmZk",
        SheetName: "SPImport",
        ApiKey: "AIzaSyD33kgZJKdFpv1JrKHacjCQccL_O0a2Eao"
      };
      const result = yield this._GoogleSheetService.getDrive(DriveInfo);
      const data = ConvertDriveData(result.values);
      console.log(data);
      this.DoImportData(data);
    });
  }
  DoImportData(data) {
    console.log(data);
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
    const listId1 = this._DonhangService.ListDonhang().map((v) => v.masp);
    const listId3 = listId2.filter((item) => !listId1.includes(item));
    const createuppdateitem = uniqueData.map((v) => __async(this, null, function* () {
      const item = this._DonhangService.ListDonhang().find((v1) => v1.masp === v.masp);
      if (item) {
        const item1 = __spreadValues(__spreadValues({}, item), v);
        yield this._DonhangService.updateDonhang(item1);
      } else {
        yield this._DonhangService.CreateDonhang(v);
      }
    }));
    const disableItem = listId3.map((v) => __async(this, null, function* () {
      const item = this._DonhangService.ListDonhang().find((v1) => v1.masp === v);
      item.isActive = false;
      yield this._DonhangService.updateDonhang(item);
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
      if (this.editDonhang.length > 0) {
        this.SearchParams.ids = this.editDonhang.map((v) => v.id);
      } else {
        this.SearchParams.ids = data.map((v) => v.id);
      }
      try {
        console.log("Attempting server-based Excel export...");
        yield this._DonhangService.downloadCongno(this.SearchParams);
        this._snackBar.open("Xu\u1EA5t file Excel t\u1EEB server th\xE0nh c\xF4ng!", "\u0110\xF3ng", {
          duration: 3e3,
          horizontalPosition: "center",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        this.editDonhang = [];
      } catch (serverError) {
        console.warn("Server export failed, falling back to client-side export:", serverError);
        try {
          console.log("Attempting client-side Excel export with table format...");
          let exportData = [];
          if (this.editDonhang.length > 0) {
            const selectedOrders = yield this.ChuyendoiExport(this.editDonhang);
            exportData = selectedOrders.flatMap((order) => this.convertFlatData(order));
          } else {
            const allOrders = yield this.ChuyendoiExport(data);
            exportData = allOrders.flatMap((order) => this.convertFlatData(order));
          }
          yield this.generateExcelWithTableFormat(exportData, title);
          this._snackBar.open("Xu\u1EA5t file Excel (\u0111\u1ECBnh d\u1EA1ng b\u1EA3ng) th\xE0nh c\xF4ng!", "\u0110\xF3ng", {
            duration: 3e3,
            horizontalPosition: "center",
            verticalPosition: "top",
            panelClass: ["snackbar-success"]
          });
          this.editDonhang = [];
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
        let exportData = [];
        if (this.editDonhang.length > 0) {
          const selectedOrders = yield this.ChuyendoiExport(this.editDonhang);
          exportData = selectedOrders.flatMap((order) => this.convertFlatData(order));
        } else {
          const allOrders = yield this.ChuyendoiExport(data);
          exportData = allOrders.flatMap((order) => this.convertFlatData(order));
        }
        yield this.generateExcelWithTableFormat(exportData, title);
        this.editDonhang = [];
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
  // Method for exporting Excel with two sheets (Summary and Details) with high-fidelity styling
  ExportExcelTwoSheets(data, title) {
    return __async(this, null, function* () {
      this.isExporting = true;
      try {
        console.log("Exporting Excel with two sheets (Formatted)...");
        let rawData = [];
        if (this.editDonhang.length > 0) {
          rawData = yield this.ChuyendoiExport(this.editDonhang);
        } else {
          rawData = yield this.ChuyendoiExport(data);
        }
        if (!rawData || rawData.length === 0) {
          this._snackBar.open("Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u \u0111\u1EC3 xu\u1EA5t!", "\u0110\xF3ng", { duration: 3e3 });
          return;
        }
        rawData = JSON.parse(JSON.stringify(rawData));
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
        summaryRows.push(["T\u1ED4NG H\u1EE2P C\xD4NG N\u1EE2 PH\u1EA2I THU KH\xC1CH H\xC0NG"]);
        summaryRows.push(["T\xE0i kho\u1EA3n: 131", "", "", "", "", "", "T\u1EEB ng\xE0y " + (0, import_moment.default)(this.SearchParams.Batdau).format("DD/MM/YYYY") + " \u0110\u1EBFn ng\xE0y " + (0, import_moment.default)(this.SearchParams.Ketthuc).format("DD/MM/YYYY")]);
        summaryRows.push(["NH\xD3M KH\xC1CH H\xC0NG", "T\xEAn kh\xE1ch h\xE0ng", "TK c\xF4ng n\u1EE3", "S\u1ED1 d\u01B0 \u0111\u1EA7u k\u1EF3", "Ph\xE1t sinh t\u0103ng\n(DOANH S\u1ED0 T\u1ED4NG-VAT)", "Ph\xE1t sinh gi\u1EA3m", "S\u1ED1 d\u01B0 cu\u1ED1i k\u1EF3", "Trong \u0111\xF3", ""]);
        summaryRows.push(["", "", "", "", "", "", "", "Th\xE1ng " + (0, import_moment.default)(this.SearchParams.Ketthuc).format("MM/YYYY"), ""]);
        const summarySheet = XLSX.utils.aoa_to_sheet(summaryRows);
        summarySheet["A1"].s = styleTitle;
        summarySheet["A2"].s = styleSubTitle;
        summarySheet["G2"].s = styleSubTitle;
        ["A3", "B3", "E3"].forEach((c) => summarySheet[c].s = styleHeaderYellow);
        ["C3", "D3", "F3", "G3", "H3", "I3"].forEach((c) => summarySheet[c].s = styleHeaderGray);
        ["H4", "I4"].forEach((c) => summarySheet[c].s = styleHeaderGray);
        rawData.forEach((order) => {
          const orderItems = (order.sanpham || []).filter((it) => Number(it.slnhan) > 0);
          const isShowVat = order.isshowvat === true;
          let orderTotalBeforeVat = 0;
          let orderTotalAfterVat = 0;
          let orderTotalVat = 0;
          orderItems.forEach((item) => {
            const vatRate = isShowVat ? Number(item.vat) || 0 : 0;
            const ttPreVat = (Number(item.slnhan) || 0) * (Number(item.giaban) || 0);
            const ttAfterVat = ttPreVat * (1 + vatRate);
            orderTotalBeforeVat += ttPreVat;
            orderTotalAfterVat += ttAfterVat;
            orderTotalVat += ttAfterVat - ttPreVat;
          });
          order.calculatedTotalBeforeVat = orderTotalBeforeVat;
          order.calculatedTotalAfterVat = orderTotalAfterVat;
          order.calculatedTotalVat = orderTotalVat;
        });
        const customerGroupsMap = /* @__PURE__ */ new Map();
        rawData.forEach((order) => {
          const customerId = order.khachhang?.id || "unknown";
          if (!customerGroupsMap.has(customerId)) {
            customerGroupsMap.set(customerId, {
              groupName: order.khachhang?.nhomkhachhang && order.khachhang.nhomkhachhang.length > 0 ? order.khachhang.nhomkhachhang[0].name : "Ch\u01B0a ph\xE2n nh\xF3m",
              customerName: order.khachhang?.name || "Ch\u01B0a t\xEAn",
              makh: order.khachhang?.makh || "",
              increase: 0,
              decrease: 0
            });
          }
          const group = customerGroupsMap.get(customerId);
          group.increase += order.calculatedTotalAfterVat;
        });
        let currentRowIdx = 4;
        const sortedCustomers = Array.from(customerGroupsMap.values()).sort((a, b) => a.groupName.localeCompare(b.groupName));
        const mergesSummary = [
          { s: { r: 0, c: 0 }, e: { r: 0, c: 8 } },
          // Title merge
          { s: { r: 1, c: 0 }, e: { r: 1, c: 5 } },
          // Tài khoản merge
          { s: { r: 1, c: 6 }, e: { r: 1, c: 8 } },
          // Từ ngày merge
          { s: { r: 2, c: 0 }, e: { r: 3, c: 0 } },
          // Nhóm KH merge vertically
          { s: { r: 2, c: 1 }, e: { r: 3, c: 1 } },
          // Tên KH merge vertically
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
        sortedCustomers.forEach((cust, idx) => {
          const row = [
            cust.groupName,
            cust.customerName,
            "131",
            0,
            cust.increase,
            0,
            cust.increase,
            cust.increase,
            ""
          ];
          XLSX.utils.sheet_add_aoa(summarySheet, [row], { origin: currentRowIdx });
          for (let c = 0; c <= 8; c++) {
            const cellRef = XLSX.utils.encode_cell({ r: currentRowIdx, c });
            summarySheet[cellRef].s = c >= 3 ? styleNumber : styleData;
          }
          if (cust.groupName !== lastGroupName) {
            if (idx > 0 && currentRowIdx - groupStartRow > 1) {
              mergesSummary.push({ s: { r: groupStartRow, c: 0 }, e: { r: currentRowIdx - 1, c: 0 } });
            }
            lastGroupName = cust.groupName;
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
          "Ng\xE0y Giao",
          "M\xE3 Kh\xE1ch H\xE0ng",
          "T\xEAn Kh\xE1ch H\xE0ng",
          "M\xE3 \u0110\u01A1n H\xE0ng",
          "M\xE3 H\xE0ng",
          "T\xEAn H\xE0ng",
          "\u0110VT",
          "S\u1ED1 L\u01B0\u1EE3ng",
          "\u0110\u01A1n Gi\xE1",
          "Th\xE0nh Ti\u1EC1n Tr\u01B0\u1EDBc VAT",
          "Ghi Ch\xFA",
          "VAT (%)",
          "\u0110\u01A1n Gi\xE1 VAT",
          "Th\xE0nh Ti\u1EC1n Sau VAT",
          "T\u1ED5ng Ti\u1EC1n Sau Thu\u1EBF",
          "T\u1ED5ng Ti\u1EC1n Tr\u01B0\u1EDBc Thu\u1EBF",
          "T\u1ED5ng C\u1ED9ng Kh\xE1ch H\xE0ng"
        ];
        const detailRows = [detailHeaders];
        const detailSheet = XLSX.utils.aoa_to_sheet(detailRows);
        for (let c = 0; c < detailHeaders.length; c++) {
          const cellRef = XLSX.utils.encode_cell({ r: 0, c });
          detailSheet[cellRef].s = styleHeaderBlue;
        }
        let detailRowIdx = 1;
        const mergesDetail = [];
        const customerGrandTotals = /* @__PURE__ */ new Map();
        rawData.forEach((order) => {
          const custId = order.khachhang?.id;
          customerGrandTotals.set(custId, (customerGrandTotals.get(custId) || 0) + order.calculatedTotalAfterVat);
        });
        rawData.forEach((order) => {
          const items = (order.sanpham || []).filter((it) => Number(it.slnhan) > 0);
          if (items.length === 0)
            return;
          const startRow = detailRowIdx;
          const custId = order.khachhang?.id;
          items.forEach((item, idx) => {
            const isShowVat = order.isshowvat === true;
            const vatRate = isShowVat ? Number(item.vat) || 0 : 0;
            const giabanPreVat = Number(item.giaban) || 0;
            const ttPreVat = (Number(item.slnhan) || 0) * giabanPreVat;
            const ttAfterVat = ttPreVat * (1 + vatRate);
            const rowDataArr = [
              (0, import_moment.default)(order.ngaygiao).format("DD/MM/YYYY"),
              order.khachhang?.makh || "",
              order.khachhang?.name || "",
              order.madonhang || "",
              item.sanpham?.masp || "",
              item.sanpham?.title || "",
              item.sanpham?.dvt || "",
              Number(item.slnhan) || 0,
              giabanPreVat,
              ttPreVat,
              item.ghichu || "",
              vatRate * 100 + "%",
              // Convert 0.05 to 5%
              giabanPreVat * (1 + vatRate),
              ttAfterVat,
              idx === 0 ? order.calculatedTotalAfterVat : "",
              // Total for order
              idx === 0 ? order.calculatedTotalBeforeVat : "",
              idx === 0 ? customerGrandTotals.get(custId) : ""
            ];
            XLSX.utils.sheet_add_aoa(detailSheet, [rowDataArr], { origin: detailRowIdx });
            for (let c = 0; c < rowDataArr.length; c++) {
              const cellRef = XLSX.utils.encode_cell({ r: detailRowIdx, c });
              const isNumber = [7, 8, 9, 12, 13, 14, 15, 16].includes(c);
              detailSheet[cellRef].s = isNumber ? styleNumber : styleData;
            }
            detailRowIdx++;
          });
          if (items.length > 1) {
            [0, 1, 2, 3, 14, 15, 16].forEach((c) => {
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
        this.editDonhang = [];
        this._snackBar.open("Xu\u1EA5t file Excel th\xE0nh c\xF4ng!", "\u0110\xF3ng", { duration: 3e3, context: "success" });
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
          "M\xE3 Kh\xE1ch H\xE0ng",
          "T\xEAn Kh\xE1ch H\xE0ng",
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
        this.writeExcelFileWithMergedCells(groupedData, title, columns);
      } catch (error) {
        console.error("Error in fallback Excel export:", error);
      }
    });
  }
  groupDataByCustomer(data) {
    const customerGroups = /* @__PURE__ */ new Map();
    data.forEach((item) => {
      const makh = item.makhachhang;
      if (!customerGroups.has(makh)) {
        customerGroups.set(makh, []);
      }
      customerGroups.get(makh).push(item);
    });
    const result = [];
    customerGroups.forEach((items, makh) => {
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
  writeExcelFileWithMergedCells(data, title, columns) {
    const worksheetData = data.map((item) => ({
      "Ng\xE0y": (0, import_moment.default)(item.ngaygiao).format("DD/MM/YYYY"),
      "M\xE3 Kh\xE1ch H\xE0ng": item.makhachhang,
      "T\xEAn Kh\xE1ch H\xE0ng": item.tenkhachhang,
      "M\xE3 \u0110\u01A1n H\xE0ng": item.madonhang,
      "M\xE3 H\xE0ng": item.mahang,
      "T\xEAn H\xE0ng": item.tenhang,
      "\u0110VT": item.dvt,
      "S\u1ED1 L\u01B0\u1EE3ng": item.soluong,
      "\u0110\u01A1n Gi\xE1": item.dongia,
      "Th\xE0nh Ti\u1EC1n Tr\u01B0\u1EDBc VAT": item.thanhtientruocvat,
      "VAT": item.vat,
      "\u0110\u01A1n Gi\xE1 VAT": item.dongiavathoadon,
      "Th\xE0nh Ti\u1EC1n Sau VAT": item.thanhtiensauvat,
      "Ghi Ch\xFA": item.ghichu,
      "T\u1ED5ng Ti\u1EC1n Sau Thu\u1EBF": item.tongtiensauthue
    }));
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const mergeRanges = this.createMergeRanges(data);
    if (mergeRanges.length > 0) {
      worksheet["!merges"] = mergeRanges;
    }
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "CongNo");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    this.saveAsExcelFile(excelBuffer, `${title}_${(0, import_moment.default)().format("DD_MM_YYYY")}`);
  }
  createMergeRanges(data) {
    const mergeRanges = [];
    const customerGroups = /* @__PURE__ */ new Map();
    data.forEach((item, index) => {
      const makh = item.makhachhang;
      if (!customerGroups.has(makh)) {
        customerGroups.set(makh, { start: index + 1, count: 0 });
      }
      customerGroups.get(makh).count++;
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
  // Generate Excel with the same format as exporttable - Multiple sheets by customer
  generateExcelWithTableFormat(exportData, title) {
    return __async(this, null, function* () {
      try {
        const workbook = XLSX.utils.book_new();
        const customerGroups = /* @__PURE__ */ new Map();
        exportData.forEach((item) => {
          const makh = item.makh || "Unknown";
          const tenkh = item.tenkh || item.tenkhachhang || "Unknown Customer";
          const key = `${makh}_${tenkh}`;
          if (!customerGroups.has(key)) {
            customerGroups.set(key, []);
          }
          customerGroups.get(key).push(item);
        });
        if (customerGroups.size === 0) {
          yield this.createCustomerSheet(workbook, exportData, "All Customers", exportData[0] || {});
        } else {
          const usedSheetNames = /* @__PURE__ */ new Set();
          customerGroups.forEach((customerData, key) => {
            const customerInfo = customerData[0] || {};
            const customerName = customerInfo.tenkh || customerInfo.tenkhachhang || "Unknown Customer";
            let sanitizedSheetName = this.sanitizeSheetName(customerName);
            let uniqueSheetName = sanitizedSheetName;
            let counter = 1;
            while (usedSheetNames.has(uniqueSheetName)) {
              const suffix = `_${counter}`;
              const maxBaseLength = 31 - suffix.length;
              const baseName = sanitizedSheetName.substring(0, maxBaseLength);
              uniqueSheetName = `${baseName}${suffix}`;
              counter++;
            }
            usedSheetNames.add(uniqueSheetName);
            this.createCustomerSheet(workbook, customerData, uniqueSheetName, customerInfo);
          });
        }
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        this.saveAsExcelFile(excelBuffer, `${title}_${(0, import_moment.default)().format("DD_MM_YYYY")}`);
      } catch (error) {
        console.error("Error generating Excel with table format:", error);
        throw error;
      }
    });
  }
  // Helper method to create a worksheet for each customer
  createCustomerSheet(workbook, customerData, sheetName, customerInfo) {
    const worksheetData = [
      // Row 1: Logo section (colspan 4) + Company info section (colspan 7)
      ["LOGO", "", "", "", "C\xD4NG TY TNHH N\xD4NG S\u1EA2N TH\u1EF0C PH\u1EA8M TR\u1EA6N GIA", "", "", "", "", "", ""],
      ["", "", "", "", "HTX: \u1EA4p L\u1ED9c Ti\u1EBFn, X\xE3 M\u1EF9 L\u1ED9c, Huy\u1EC7n C\u1EA7n Giu\u1ED9c, T\u1EC9nh Long An", "", "", "", "", "", ""],
      ["", "", "", "", "VP: T\xF2a nh\xE0 An Ph\xFA Plaza, 117-119 L\xFD Ch\xEDnh Th\u1EAFng, P.7. Q.3,", "", "", "", "", "", ""],
      ["", "", "", "", "TP.HCM Kho s\u01A1 ch\u1EBF: 30 Kha V\u1EA1n C\xE2n, P. Hi\u1EC7p B\xECnh Ch\xE1nh,", "", "", "", "", "", ""],
      ["", "", "", "", "TP.Th\u1EE7 \u0110\u1EE9c, TP.HCM Kho \u0110\xE0 L\u1EA1t: 69 Tr\u1EA7n Th\u1EE7 \u0110\u1ED9,", "", "", "", "", "", ""],
      ["", "", "", "", "TT Li\xEAn Ngh\u0129a, Huy\u1EC7n \u0110\u1EE9c Tr\u1ECDng, T\u1EC9nh L\xE2m \u0110\u1ED3ng.", "", "", "", "", "", ""],
      ["", "", "", "", "Website: rausachtrangia.com - Hotline: 090.245.8081", "", "", "", "", "", ""],
      // Report title row
      ["CHI TI\u1EBET \u0110\u1ED0I CHI\u1EBEU C\xD4NG N\u1EE2", "", "", "", "", "", "", "", "", "", ""],
      // Date range row
      [`T\u1EEB Ng\xE0y ${(0, import_moment.default)(this.SearchParams.Batdau).format("DD/MM/YYYY")} : - \u0110\u1EBFn Ng\xE0y : ${(0, import_moment.default)(this.SearchParams.Ketthuc).format("DD/MM/YYYY")}`, "", "", "", "", "", "", "", "", "", ""],
      // Customer info rows
      [`T\xEAn Kh\xE1ch H\xE0ng : ${customerInfo.tenkh || customerInfo.tenkhachhang || ""}`, "", "", "", "", "", "", "", "", "", ""],
      [`\u0110\u1ECBa Ch\u1EC9 : ${customerInfo.diachi || ""}`, "", "", "", "", "", "", "", "", "", ""],
      [`Ng\u01B0\u1EDDi Li\xEAn h\u1EC7 : ${customerInfo.lienhe || ""}`, "", "", "", `Email : ${customerInfo.email || ""}`, "", "", "", "", "", ""],
      // Empty row (spacing like in HTML)
      ["", "", "", "", "", "", "", "", "", "", ""],
      // Table headers with exact same text as HTML
      ["NG\xC0Y GIAO", "M\xC3 KH\xC1CH H\xC0NG", "T\xCAN KH\xC1CH H\xC0NG", "M\xC3 \u0110\u01A0N H\xC0NG", "M\xC3 H\xC0NG", "T\xCAN H\xC0NG", "\u0110VT", "S\u1ED0 L\u01AF\u1EE2NG", "\u0110\u01A0N GI\xC1", "TH\xC0NH TI\u1EC0N", "GHI CH\xDA"]
    ];
    customerData.sort((a, b) => (a.tensp || "").localeCompare(b.tensp || ""));
    customerData.forEach((item) => {
      worksheetData.push([
        (0, import_moment.default)(item.ngaygiao).format("DD/MM/YYYY") || "",
        item.makh || "",
        item.tenkh || item.tenkhachhang || "",
        item.madonhang || "",
        item.masp || "",
        item.tensp || "",
        item.dvt || "",
        Number(item.slnhan) || 0,
        Number(item.giaban) || 0,
        Number(item.ttnhan) || 0,
        item.ghichu || ""
      ]);
    });
    const totalQuantity = customerData.reduce((sum, item) => sum + (Number(item.slnhan) || 0), 0);
    const totalAmount = customerData.reduce((sum, item) => sum + (Number(item.ttnhan) || 0), 0);
    worksheetData.push([
      "",
      "",
      "",
      "",
      "",
      "T\u1ED4NG C\u1ED8NG:",
      "",
      totalQuantity,
      "",
      totalAmount,
      ""
    ]);
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const columnWidths = [
      { wch: 12 },
      // NGÀY GIAO
      { wch: 15 },
      // MÃ KHÁCH HÀNG
      { wch: 25 },
      // TÊN KHÁCH HÀNG
      { wch: 15 },
      // MÃ ĐƠN HÀNG
      { wch: 12 },
      // MÃ HÀNG
      { wch: 30 },
      // TÊN HÀNG
      { wch: 8 },
      // ĐVT
      { wch: 12 },
      // SỐ LƯỢNG
      { wch: 15 },
      // ĐƠN GIÁ
      { wch: 15 },
      // THÀNH TIỀN
      { wch: 20 }
      // GHI CHÚ
    ];
    worksheet["!cols"] = columnWidths;
    const merges = [
      // Logo section (rows 0-6, cols 0-3)
      { s: { r: 0, c: 0 }, e: { r: 6, c: 3 } },
      // Logo area
      // Company info section (rows 0-6, cols 4-10)
      { s: { r: 0, c: 4 }, e: { r: 0, c: 10 } },
      // Company name
      { s: { r: 1, c: 4 }, e: { r: 1, c: 10 } },
      // HTX address
      { s: { r: 2, c: 4 }, e: { r: 2, c: 10 } },
      // VP address line 1
      { s: { r: 3, c: 4 }, e: { r: 3, c: 10 } },
      // VP address line 2
      { s: { r: 4, c: 4 }, e: { r: 4, c: 10 } },
      // Kho address line 1
      { s: { r: 5, c: 4 }, e: { r: 5, c: 10 } },
      // Kho address line 2
      { s: { r: 6, c: 4 }, e: { r: 6, c: 10 } },
      // Website and hotline
      // Report title
      { s: { r: 7, c: 0 }, e: { r: 7, c: 10 } },
      // Report title
      // Date range
      { s: { r: 8, c: 0 }, e: { r: 8, c: 10 } },
      // Date range
      // Customer info
      { s: { r: 9, c: 0 }, e: { r: 9, c: 10 } },
      // Customer name
      { s: { r: 10, c: 0 }, e: { r: 10, c: 10 } },
      // Customer address
      // Contact person and email row (matching HTML: colspan 4 and colspan 7)
      { s: { r: 11, c: 0 }, e: { r: 11, c: 3 } },
      // Contact person (colspan 4)
      { s: { r: 11, c: 4 }, e: { r: 11, c: 10 } },
      // Email (colspan 7)
      // Empty row
      { s: { r: 12, c: 0 }, e: { r: 12, c: 10 } }
      // Empty spacing row
    ];
    worksheet["!merges"] = merges;
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  }
  // Helper method to sanitize sheet names for Excel compatibility
  sanitizeSheetName(name) {
    let sanitized = name.replace(/[\/\\?*\[\]]/g, "_").trim();
    if (sanitized.length > 31) {
      sanitized = sanitized.substring(0, 31);
    }
    if (!sanitized || sanitized.length === 0) {
      sanitized = "Customer";
    }
    return sanitized;
  }
  // Method to add company logo to Excel worksheet
  addLogoToWorksheet(worksheet, workbook) {
    return __async(this, null, function* () {
      try {
        const logoUrl = "/images/logo.svg";
        const logoBase64 = yield this.loadImageAsBase64(logoUrl);
        if (logoBase64) {
          console.log("Logo loaded successfully for Excel");
        }
        const logoCell = worksheet["A1"];
        if (logoCell) {
          logoCell.s = {
            font: {
              bold: true,
              size: 12,
              color: { rgb: "2E5A87" },
              name: "Arial"
            },
            alignment: {
              horizontal: "center",
              vertical: "center"
            },
            fill: {
              fgColor: { rgb: "F8F9FA" }
            },
            border: {
              top: { style: "thin", color: { rgb: "D1D5DB" } },
              bottom: { style: "thin", color: { rgb: "D1D5DB" } },
              left: { style: "thin", color: { rgb: "D1D5DB" } },
              right: { style: "thin", color: { rgb: "D1D5DB" } }
            }
          };
          logoCell.v = "C\xD4NG TY TR\u1EA6N GIA";
          logoCell.t = "s";
        }
      } catch (error) {
        console.warn("Could not load/add logo to Excel file:", error);
        const logoCell = worksheet["A1"];
        if (logoCell) {
          logoCell.v = "LOGO";
          logoCell.s = {
            font: { bold: true, size: 10 },
            alignment: { horizontal: "center", vertical: "center" },
            fill: { fgColor: { rgb: "E5E7EB" } }
          };
        }
      }
    });
  }
  // Method to load image as base64
  loadImageAsBase64(imageUrl) {
    return __async(this, null, function* () {
      try {
        const response = yield fetch(imageUrl);
        if (!response.ok)
          throw new Error("Failed to load image");
        const blob = yield response.blob();
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      } catch (error) {
        console.warn("Failed to load image:", error);
        return null;
      }
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
            <title>Phi\u1EBFu Chia H\xE0ng ${(0, import_moment.default)().format("DD/MM/YYYY")}</title>
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
  /**
   * Đồng bộ giá và VAT cho các đơn hàng đã chọn
   */
  DongboVat() {
    return __async(this, null, function* () {
      this.openDongboDialog();
    });
  }
  /**
   * Mở dialog xác nhận đồng bộ
   */
  openDongboDialog() {
    if (this.editDonhang.length === 0) {
      this._snackBar.open("Kh\xF4ng c\xF3 \u0111\u01A1n h\xE0ng n\xE0o \u0111\u1EC3 \u0111\u1ED3ng b\u1ED9", "", {
        duration: 3e3,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ["snackbar-warning"]
      });
      return;
    }
    const dialogRef = this.dialog.open(this.confirmDongboDialog, {
      hasBackdrop: true,
      disableClose: true,
      width: "600px",
      maxWidth: "90vw"
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === "true") {
        this.executeDongboVat();
      }
    });
  }
  /**
   * Thực thi đồng bộ giá và VAT
   */
  executeDongboVat() {
    return __async(this, null, function* () {
      this.isLoading = true;
      let progressSnackbar = this._snackBar.open(`\u0110ang \u0111\u1ED3ng b\u1ED9 gi\xE1 v\xE0 VAT cho ${this.editDonhang.length} \u0111\u01A1n h\xE0ng...`, "\u0110ang x\u1EED l\xFD", {
        duration: 0,
        // Không tự động đóng
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ["snackbar-info"]
      });
      try {
        const priceResult = yield this._DonhangService.DongboGia(this.editDonhang);
        if (!priceResult || priceResult.status !== "success") {
          throw new Error(priceResult?.message || "L\u1ED7i \u0111\u1ED3ng b\u1ED9 gi\xE1");
        }
        let vatUpdatedCount = 0;
        let vatErrorCount = 0;
        const vatErrors = [];
        yield this.loadData(this.SearchParams);
        for (const order of this.editDonhang) {
          try {
            const updatedOrder = this.dataSource.data.find((o) => o.id === order.id);
            const isshowvat = updatedOrder?.isshowvat ?? order.isshowvat;
            const tong = Number(updatedOrder?.tong || order.tong) || 0;
            const vatRate = isshowvat ? Number(updatedOrder?.vat ?? order.vat) ?? 0.05 : 0;
            const tongvat = tong * vatRate;
            const tongtien = tong + tongvat;
            yield this._GraphqlService.updateOne("donhang", { id: order.id }, {
              tongvat: Math.round(tongvat * 100) / 100,
              // Làm tròn 2 chữ số thập phân
              tongtien: Math.round(tongtien * 100) / 100,
              vat: vatRate
            });
            order.tongvat = Math.round(tongvat * 100) / 100;
            order.tongtien = Math.round(tongtien * 100) / 100;
            order.tong = tong;
            order.vat = vatRate;
            order.isshowvat = isshowvat;
            vatUpdatedCount++;
          } catch (error) {
            console.error(`Error updating VAT for order ${order.madonhang}:`, error);
            vatErrorCount++;
            vatErrors.push(`${order.madonhang}: ${error.message || "L\u1ED7i kh\xF4ng x\xE1c \u0111\u1ECBnh"}`);
          }
        }
        progressSnackbar.dismiss();
        if (priceResult.updatedCount > 0 || vatUpdatedCount > 0) {
          let message = `\u2705 \u0110\u1ED3ng b\u1ED9 ho\xE0n t\u1EA5t!
`;
          if (priceResult.updatedCount !== void 0) {
            const priceSuccessRate = Math.round(priceResult.updatedCount / priceResult.totalProcessed * 100);
            message += `\u{1F4CA} Gi\xE1: ${priceResult.updatedCount}/${priceResult.totalProcessed} \u0111\u01A1n h\xE0ng (${priceSuccessRate}%)
`;
            if (priceResult.errorCount > 0) {
              message += `\u26A0\uFE0F L\u1ED7i gi\xE1: ${priceResult.errorCount} \u0111\u01A1n h\xE0ng
`;
            }
          }
          const vatSuccessRate = Math.round(vatUpdatedCount / this.editDonhang.length * 100);
          message += `\u{1F4B0} VAT: ${vatUpdatedCount}/${this.editDonhang.length} \u0111\u01A1n h\xE0ng (${vatSuccessRate}%)`;
          if (vatErrorCount > 0) {
            message += `
\u26A0\uFE0F L\u1ED7i VAT: ${vatErrorCount} \u0111\u01A1n h\xE0ng`;
            console.warn("VAT sync errors:", vatErrors);
          }
          this._snackBar.open(message, "\u2705 Th\xE0nh c\xF4ng", {
            duration: 8e3,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-success"]
          });
          yield this.loadData(this.SearchParams);
          this.editDonhang = [];
        } else {
          this._snackBar.open("\u274C Kh\xF4ng c\xF3 \u0111\u01A1n h\xE0ng n\xE0o \u0111\u01B0\u1EE3c c\u1EADp nh\u1EADt", "\u0110\xF3ng", {
            duration: 4e3,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-error"]
          });
        }
      } catch (error) {
        console.error("Error syncing prices and VAT:", error);
        progressSnackbar.dismiss();
        let errorMessage = "L\u1ED7i khi \u0111\u1ED3ng b\u1ED9 gi\xE1 v\xE0 VAT";
        if (error?.error?.message) {
          errorMessage = error.error.message;
          if (error.error.message.includes("Transaction already closed")) {
            errorMessage = "\u23F1\uFE0F Thao t\xE1c m\u1EA5t qu\xE1 nhi\u1EC1u th\u1EDDi gian. Vui l\xF2ng th\u1EED l\u1EA1i v\u1EDBi \xEDt \u0111\u01A1n h\xE0ng h\u01A1n.";
          }
        } else if (error?.message) {
          errorMessage = error.message;
          if (error.message.includes("timeout")) {
            errorMessage = "\u23F1\uFE0F H\u1EBFt th\u1EDDi gian ch\u1EDD. H\u1EC7 th\u1ED1ng \u0111ang x\u1EED l\xFD qu\xE1 nhi\u1EC1u \u0111\u01A1n h\xE0ng c\xF9ng l\xFAc.";
          }
        }
        this._snackBar.open(`\u274C ${errorMessage}`, "\u0110\xF3ng", {
          duration: 6e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      } finally {
        this.isLoading = false;
      }
    });
  }
  trackByFn(index, item) {
    return item.id;
  }
  static \u0275fac = function ListcongnokhachhangComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ListcongnokhachhangComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ListcongnokhachhangComponent, selectors: [["app-listcongnokhachhang"]], viewQuery: function ListcongnokhachhangComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(MatPaginator, 5);
      \u0275\u0275viewQuery(MatSort, 5);
      \u0275\u0275viewQuery(_c0, 7);
      \u0275\u0275viewQuery(_c1, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.paginator = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.sort = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.drawer = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.confirmDongboDialog = _t.first);
    }
  }, decls: 88, vars: 36, consts: [["drawer", ""], ["pickerBatdau", ""], ["pickerKetthuc", ""], ["exportMenu", "matMenu"], ["menu", "matMenu"], ["dialogCreateTemplate", ""], ["dialogPreviewExport", ""], ["ConfirmDongboDialog", ""], ["nhomKHInput", ""], ["autoNhom", "matAutocomplete"], ["customerInput", ""], ["auto", "matAutocomplete"], ["menuTrigger", "matMenuTrigger"], ["autosize", "", 1, "w-full", "h-full"], ["class", "fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50", 4, "ngIf"], ["mode", "over", 1, "flex", "flex-col", "!w-full", "h-full", 3, "position"], [1, "flex", "flex-col", "space-y-2", "h-screen-12", "w-full", "p-2"], [1, "w-full", "grid", "gap-2", "items-center"], [1, "w-full", "flex", "flex-row", "space-x-2", "items-center"], [1, "w-full", 3, "appearance", "subscriptSizing"], ["matInput", "", 3, "dateChange", "ngModelChange", "matDatepicker", "ngModel", "ngModelOptions"], ["matIconSuffix", "", 3, "for"], [1, "lg:flex", "hidden", "cursor-pointer", "whitespace-nowrap", "p-2", "rounded-lg", "bg-slate-200", 3, "click"], [1, "lg:flex", "hidden", "cursor-pointer", "whitespace-nowrap", "p-2", "rounded-lg", "bg-slate-200"], ["matTooltip", "Xem M\u1EABu", "mat-icon-button", "", "color", "primary", 3, "click"], ["matTooltip", "Xu\u1EA5t file Excel", "color", "primary", "mat-icon-button", "", 1, "relative", 3, "matMenuTriggerFor"], ["class", "absolute inset-0 flex items-center justify-center", 4, "ngIf"], ["mat-menu-item", "", 3, "click"], ["matTooltip", "T\xECm ki\u1EBFm", "color", "primary", "mat-icon-button", "", 1, "relative", 3, "click", "disabled"], ["matTooltip", "\u1EA8n hi\u1EC7n c\u1ED9t", "mat-icon-button", "", "color", "primary", "aria-label", "Example icon-button with a menu", 3, "matMenuTriggerFor"], [1, "p-4"], ["appearance", "outline", "subscriptSizing", "dynamic", 1, "w-full"], ["matInput", "", "placeholder", "T\xECm Ki\u1EBFm", 3, "input", "click"], ["matPrefix", ""], [1, "flex", "flex-col", "max-h-80", "overflow-auto"], ["mat-menu-item", ""], ["matTooltip", "\u1EA8n hi\u1EC7n Tool Kh\xE1ch H\xE0ng", "mat-icon-button", "", "color", "primary", 3, "click"], ["mat-icon-button", "", "color", "primary", "matTooltip", "\u0110\u1ED3ng b\u1ED9 gi\xE1 t\u1EEB b\u1EA3ng gi\xE1 cho t\u1EA5t c\u1EA3 \u0111\u01A1n h\xE0ng \u0111\xE3 ch\u1ECDn", 3, "click", "disabled"], [1, "w-full", "grid", "lg:grid-cols-2", "gap-2", "items-center"], [1, "w-full", "overflow-auto", "relative"], ["class", "absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 z-10", 4, "ngIf"], ["mat-table", "", "matSort", "", 1, "!border", "w-full", "cursor-pointer", 3, "dataSource"], [3, "matColumnDef"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 3, "class", "click", 4, "matRowDef", "matRowDefColumns"], ["class", "mat-row", 4, "matNoDataRow"], [1, "fixed", "inset-0", "bg-white", "bg-opacity-75", "flex", "items-center", "justify-center", "z-50"], [1, "flex", "flex-col", "items-center", "space-y-4"], [1, "animate-spin", "rounded-full", "h-12", "w-12", "border-b-2", "border-blue-600"], [1, "text-lg", "text-gray-700"], [1, "absolute", "inset-0", "flex", "items-center", "justify-center"], [1, "animate-spin", "rounded-full", "h-5", "w-5", "border-b-2", "border-blue-600"], [1, "flex", "flex-col", "space-y-2", "w-full"], [1, "font-bold"], [3, "appearance", "subscriptSizing"], ["aria-label", "Ch\u1ECDn nh\xF3m kh\xE1ch h\xE0ng"], [3, "removable"], ["matInput", "", 3, "keyup", "placeholder", "matAutocomplete"], ["panelWidth", "auto", 1, "max-w-none", 3, "optionSelected"], [1, "!whitespace-normal", "!h-auto", "!py-2", 3, "value"], ["matTooltip", "X\xF3a t\u1EA5t c\u1EA3 nh\xF3m kh\xE1ch h\xE0ng \u0111\xE3 ch\u1ECDn", "color", "warn", "mat-icon-button", "", "matSuffix", ""], ["aria-label", "Ch\u1ECDn kh\xE1ch h\xE0ng"], ["matTooltip", "X\xF3a t\u1EA5t c\u1EA3 kh\xE1ch h\xE0ng \u0111\xE3 ch\u1ECDn", "color", "warn", "mat-icon-button", "", "matSuffix", ""], [3, "removed", "removable"], ["matChipRemove", ""], [1, "text-sm"], [1, "text-xs", "text-gray-500", "block"], ["matTooltip", "X\xF3a t\u1EA5t c\u1EA3 nh\xF3m kh\xE1ch h\xE0ng \u0111\xE3 ch\u1ECDn", "color", "warn", "mat-icon-button", "", "matSuffix", "", 3, "click"], ["matTooltip", "X\xF3a t\u1EA5t c\u1EA3 kh\xE1ch h\xE0ng \u0111\xE3 ch\u1ECDn", "color", "warn", "mat-icon-button", "", "matSuffix", "", 3, "click"], [1, "absolute", "inset-0", "flex", "items-center", "justify-center", "bg-white", "bg-opacity-90", "z-10"], [1, "animate-spin", "rounded-full", "h-8", "w-8", "border-b-2", "border-blue-600"], [1, "text-gray-600"], ["class", "whitespace-nowrap", "mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["mat-header-cell", "", "mat-sort-header", "", 1, "whitespace-nowrap"], [1, "max-w-40", "line-clamp-4", "me-4"], [1, "z-10", "material-symbols-outlined", "text-gray-500", 3, "matMenuTriggerFor"], [1, "cursor-pointer", "flex", "flex-col", "space-y-4", "p-3", 3, "click"], [1, "relative", "w-full"], ["type", "text", "placeholder", "T\xECm Ki\u1EBFm...", 1, "block", "w-full", "pl-10", "pr-4", "py-2", "text-gray-700", "bg-white", "border", "border-gray-300", "rounded-lg", "focus:border-blue-400", "focus:ring-blue-400", "focus:outline-none", "focus:ring", "focus:ring-opacity-40", 3, "keyup"], [1, "absolute", "inset-y-0", "left-0", "flex", "items-center", "pl-3", "pointer-events-none"], [1, "material-symbols-outlined", "text-gray-500"], [1, "flex", "flex-row", "space-x-2", "items-center", "justify-between"], [1, "flex", "flex-row", "space-x-2", "items-center"], [1, "text-xs", "text-blue-600", "underline", 3, "click"], [1, "w-full", "flex", "flex-col", "space-y-2", "max-h-44", "overflow-auto"], ["class", "flex flex-row space-x-2 items-center p-2 rounded-lg hover:bg-slate-100", 3, "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "flex", "flex-row", "space-x-2", "items-end", "justify-end"], ["mat-flat-button", "", "color", "warn", 3, "click"], ["mat-flat-button", "", "color", "primary", 3, "click"], [1, "flex", "flex-row", "space-x-2", "items-center", "p-2", "rounded-lg", "hover:bg-slate-100", 3, "click"], ["class", "material-symbols-outlined text-blue-600", 4, "ngIf"], [1, "material-symbols-outlined", "text-blue-600"], ["mat-cell", ""], [1, "max-w-40", "line-clamp-4", "flex", "items-center"], [1, "max-w-40", "line-clamp-4", "font-bold", "text-blue-700"], [1, "max-w-40", "line-clamp-4", "text-xs"], [1, "max-w-40", "line-clamp-4"], [1, "max-w-40", "line-clamp-4", "text-end"], [1, "max-w-40", "line-clamp-4", "font-bold", 3, "ngClass"], [1, "max-w-40", "line-clamp-4", "flex", "items-center", 3, "click"], ["class", "material-symbols-outlined", 4, "ngIf"], [1, "material-symbols-outlined"], [1, "text-green-500"], [1, "text-red-500"], ["mat-header-row", ""], ["mat-row", "", 3, "click"], [1, "mat-row"], [1, "mat-cell", "p-4"], ["class", "text-center py-8", 4, "ngIf"], [1, "text-center", "py-8"], [1, "text-gray-500", "mb-2"], [1, "text-4xl"], [1, "text-gray-500"], ["mat-dialog-title", ""], ["mat-icon-button", "", "color", "primary", 3, "click"], [1, "lg:min-w-[400px]", "w-full", "h-full", "flex", "flex-col", "space-y-8", "items-center", "p-4"], [1, "w-full", "overflow-x-auto"], ["id", "printContent", 1, "w-full", "border-collapse"], [1, "p-2", "border", "border-gray-300", "bg-yellow-200", "text-center", "font-bold"], [4, "ngFor", "ngForOf"], [3, "align"], ["mat-flat-button", "", "color", "warn", "mat-dialog-close", "false"], ["class", "p-2 border border-gray-300 align-middle text-center", 4, "ngIf"], [1, "p-2", "border", "border-gray-300", "text-center"], [1, "p-2", "border", "border-gray-300"], [1, "p-2", "border", "border-gray-300", "text-right"], [1, "p-2", "border", "border-gray-300", "align-middle", "text-center"], [1, "mat-typography"], ["id", "exporttable", 1, "text-xs", "border-collapse", "border", "border-gray-300"], ["colspan", "4", 1, "text-start", "p-2", "border"], ["src", "/images/logo.svg", 1, "h-20", "mx-auto"], ["colspan", "7", 1, "text-start", "p-2", "flex", "flex-col", "gap-2"], [1, "text-md", "font-bold"], ["colspan", "11", 1, "text-md", "font-bold", "text-start", "p-2", "border"], ["colspan", "11", 1, "text-start", "p-2", "border"], ["colspan", "7", 1, "text-start", "p-2", "border"], [1, "text-start"], ["colspan", "11", 1, "p-8"], [1, "bg-gray-300"], [1, "p-2", "border", "border-gray-300", "text-center", "font-bold"], ["class", "hover:bg-gray-50", 4, "ngFor", "ngForOf"], ["align", "end"], ["mat-button", "", "mat-dialog-close", ""], [1, "hover:bg-gray-50"], ["mat-dialog-title", "", 1, "flex", "items-center", "space-x-2"], ["color", "primary"], [1, "font-semibold", "text-xl"], [1, "flex", "flex-col", "space-y-4", "py-4"], [1, "flex", "items-start", "space-x-3", "p-4", "bg-blue-50", "rounded-lg", "border-l-4", "border-blue-400"], [1, "text-blue-600", "mt-1"], [1, "flex-1"], [1, "font-semibold", "text-blue-800", "mb-2"], [1, "text-sm", "text-blue-700"], [1, "font-semibold"], [1, "space-y-3"], [1, "font-semibold", "text-gray-800"], [1, "space-y-2", "text-sm", "text-gray-700"], [1, "flex", "items-start", "space-x-2"], [1, "text-green-600", "text-base", "mt-0.5"], [1, "flex", "items-start", "space-x-3", "p-4", "bg-amber-50", "rounded-lg", "border-l-4", "border-amber-400"], [1, "text-amber-600", "mt-1"], [1, "font-semibold", "text-amber-800", "mb-2"], [1, "text-sm", "text-amber-700"], ["align", "end", 1, "border-t", "pt-4"], ["mat-flat-button", "", "color", "primary", 1, "ml-2", 3, "mat-dialog-close"], [1, "mr-1"]], template: function ListcongnokhachhangComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "mat-drawer-container", 13);
      \u0275\u0275template(1, ListcongnokhachhangComponent_div_1_Template, 5, 0, "div", 14);
      \u0275\u0275elementStart(2, "mat-drawer", 15, 0);
      \u0275\u0275element(4, "router-outlet");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "div", 16)(6, "div", 17)(7, "div", 18)(8, "mat-form-field", 19)(9, "mat-label");
      \u0275\u0275text(10, "B\u1EAFt \u0110\u1EA7u");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "input", 20);
      \u0275\u0275listener("dateChange", function ListcongnokhachhangComponent_Template_input_dateChange_11_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onDateChange($event));
      });
      \u0275\u0275twoWayListener("ngModelChange", function ListcongnokhachhangComponent_Template_input_ngModelChange_11_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.SearchParams.Batdau, $event) || (ctx.SearchParams.Batdau = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275element(12, "mat-datepicker-toggle", 21)(13, "mat-datepicker", null, 1);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "mat-form-field", 19)(16, "mat-label");
      \u0275\u0275text(17, "K\u1EBFt Th\xFAc");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "input", 20);
      \u0275\u0275listener("dateChange", function ListcongnokhachhangComponent_Template_input_dateChange_18_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onDateChange($event));
      });
      \u0275\u0275twoWayListener("ngModelChange", function ListcongnokhachhangComponent_Template_input_ngModelChange_18_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.SearchParams.Ketthuc, $event) || (ctx.SearchParams.Ketthuc = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275element(19, "mat-datepicker-toggle", 21)(20, "mat-datepicker", null, 2);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "span", 22);
      \u0275\u0275listener("click", function ListcongnokhachhangComponent_Template_span_click_22_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.ToggleAll());
      });
      \u0275\u0275text(23);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "span", 23);
      \u0275\u0275text(25);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "button", 24);
      \u0275\u0275listener("click", function ListcongnokhachhangComponent_Template_button_click_26_listener() {
        \u0275\u0275restoreView(_r1);
        const dialogPreviewExport_r2 = \u0275\u0275reference(85);
        return \u0275\u0275resetView(ctx.openPreviewExport(dialogPreviewExport_r2));
      });
      \u0275\u0275elementStart(27, "mat-icon");
      \u0275\u0275text(28, "preview");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(29, "button", 25);
      \u0275\u0275template(30, ListcongnokhachhangComponent_div_30_Template, 2, 0, "div", 26);
      \u0275\u0275elementStart(31, "mat-icon");
      \u0275\u0275text(32, "file_download");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(33, "mat-menu", null, 3)(35, "button", 27);
      \u0275\u0275listener("click", function ListcongnokhachhangComponent_Template_button_click_35_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.ExportExcel(ctx.editDonhang, "Congno"));
      });
      \u0275\u0275elementStart(36, "mat-icon");
      \u0275\u0275text(37, "cloud_download");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(38, "span");
      \u0275\u0275text(39, "Xu\u1EA5t t\u1EEB Server (Nhanh)");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(40, "button", 27);
      \u0275\u0275listener("click", function ListcongnokhachhangComponent_Template_button_click_40_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.ExportExcelTableFormat(ctx.editDonhang, "Congno"));
      });
      \u0275\u0275elementStart(41, "mat-icon");
      \u0275\u0275text(42, "table_view");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(43, "span");
      \u0275\u0275text(44, "Xu\u1EA5t \u0111\u1ECBnh d\u1EA1ng b\u1EA3ng (Chi ti\u1EBFt)");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(45, "button", 27);
      \u0275\u0275listener("click", function ListcongnokhachhangComponent_Template_button_click_45_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.ExportExcelTwoSheets(ctx.editDonhang, "Congno"));
      });
      \u0275\u0275elementStart(46, "mat-icon");
      \u0275\u0275text(47, "library_books");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(48, "span");
      \u0275\u0275text(49, "Xu\u1EA5t \u0111\u1ECBnh d\u1EA1ng 2 sheet (T\u1ED5ng h\u1EE3p + Chi ti\u1EBFt)");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(50, "button", 28);
      \u0275\u0275listener("click", function ListcongnokhachhangComponent_Template_button_click_50_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.doSearch());
      });
      \u0275\u0275template(51, ListcongnokhachhangComponent_div_51_Template, 2, 0, "div", 26);
      \u0275\u0275elementStart(52, "mat-icon");
      \u0275\u0275text(53, "search");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(54, "button", 29)(55, "mat-icon");
      \u0275\u0275text(56, "tune");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(57, "mat-menu", null, 4)(59, "div", 30)(60, "mat-form-field", 31)(61, "input", 32);
      \u0275\u0275listener("input", function ListcongnokhachhangComponent_Template_input_input_61_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.doFilterColumns($event));
      })("click", function ListcongnokhachhangComponent_Template_input_click_61_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView($event.stopPropagation());
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(62, "mat-icon", 33);
      \u0275\u0275text(63, "search");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(64, "div", 34);
      \u0275\u0275repeaterCreate(65, ListcongnokhachhangComponent_For_66_Template, 5, 2, "button", 35, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(67, "button", 36);
      \u0275\u0275listener("click", function ListcongnokhachhangComponent_Template_button_click_67_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.isShowKH = !ctx.isShowKH);
      });
      \u0275\u0275elementStart(68, "mat-icon");
      \u0275\u0275text(69);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(70, "button", 37);
      \u0275\u0275listener("click", function ListcongnokhachhangComponent_Template_button_click_70_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.DongboVat());
      });
      \u0275\u0275elementStart(71, "mat-icon");
      \u0275\u0275text(72, "currency_exchange");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275template(73, ListcongnokhachhangComponent_Conditional_73_Template, 29, 10, "div", 38);
      \u0275\u0275elementStart(74, "div", 39);
      \u0275\u0275template(75, ListcongnokhachhangComponent_div_75_Template, 5, 0, "div", 40);
      \u0275\u0275elementStart(76, "table", 41);
      \u0275\u0275repeaterCreate(77, ListcongnokhachhangComponent_For_78_Template, 3, 1, "ng-container", 42, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275template(79, ListcongnokhachhangComponent_tr_79_Template, 1, 0, "tr", 43)(80, ListcongnokhachhangComponent_tr_80_Template, 1, 3, "tr", 44)(81, ListcongnokhachhangComponent_tr_81_Template, 3, 2, "tr", 45);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275template(82, ListcongnokhachhangComponent_ng_template_82_Template, 38, 2, "ng-template", null, 5, \u0275\u0275templateRefExtractor)(84, ListcongnokhachhangComponent_ng_template_84_Template, 80, 13, "ng-template", null, 6, \u0275\u0275templateRefExtractor)(86, ListcongnokhachhangComponent_ng_template_86_Template, 62, 2, "ng-template", null, 7, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      const pickerBatdau_r34 = \u0275\u0275reference(14);
      const pickerKetthuc_r35 = \u0275\u0275reference(21);
      const exportMenu_r36 = \u0275\u0275reference(34);
      const menu_r37 = \u0275\u0275reference(58);
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
      \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(34, _c2));
      \u0275\u0275advance();
      \u0275\u0275property("for", pickerBatdau_r34);
      \u0275\u0275advance(3);
      \u0275\u0275property("appearance", "outline")("subscriptSizing", "dynamic");
      \u0275\u0275advance(3);
      \u0275\u0275property("matDatepicker", pickerKetthuc_r35);
      \u0275\u0275twoWayProperty("ngModel", ctx.SearchParams.Ketthuc);
      \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(35, _c2));
      \u0275\u0275advance();
      \u0275\u0275property("for", pickerKetthuc_r35);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1(" ", ctx.CountItem, " B\u1EA3n Ghi ");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.editDonhang.length, " \u0110\xE3 Ch\u1ECDn ");
      \u0275\u0275advance(4);
      \u0275\u0275property("matMenuTriggerFor", exportMenu_r36);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isExporting);
      \u0275\u0275advance();
      \u0275\u0275classProp("opacity-0", ctx.isExporting);
      \u0275\u0275advance(19);
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
      \u0275\u0275property("disabled", ctx.isLoading || ctx.editDonhang.length === 0);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.isShowKH ? 73 : -1);
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
  ], encapsulation: 2 });
};
__decorate([
  Debounce(300)
], ListcongnokhachhangComponent.prototype, "applyFilter", null);
__decorate([
  Debounce(100)
], ListcongnokhachhangComponent.prototype, "doFilterKhachhang", null);
__decorate([
  Debounce(100)
], ListcongnokhachhangComponent.prototype, "doFilterNhomKhachhang", null);
__decorate([
  memoize()
], ListcongnokhachhangComponent.prototype, "FilterHederColumn", null);
__decorate([
  Debounce(300)
], ListcongnokhachhangComponent.prototype, "doFilterHederColumn", null);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ListcongnokhachhangComponent, { className: "ListcongnokhachhangComponent", filePath: "src/app/admin/congnokhachhang/listcongnokhachhang/listcongnokhachhang.component.ts", lineNumber: 75 });
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
  ListcongnokhachhangComponent
};
//# sourceMappingURL=chunk-ONNPKWH4.js.map
