import './polyfills.server.mjs';
import {
  ListcongnokhachhangComponent
} from "./chunk-5RDMX6L4.mjs";
import "./chunk-23PZ27G5.mjs";
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
import "./chunk-4WFBNVB3.mjs";
import "./chunk-CXFG5YDN.mjs";
import {
  MatSlideToggleModule
} from "./chunk-J322K7NT.mjs";
import "./chunk-C4Q5BIA5.mjs";
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
  MatSortHeader,
  MatSortModule,
  MatTable,
  MatTableDataSource,
  MatTableModule
} from "./chunk-DWV2CVG4.mjs";
import "./chunk-RCQ574CW.mjs";
import {
  MatDialogModule
} from "./chunk-7O7BZAOJ.mjs";
import "./chunk-RGTCKLO2.mjs";
import "./chunk-GOLLTURE.mjs";
import {
  MatSelectModule
} from "./chunk-Z7QVUZWX.mjs";
import {
  ConvertDriveData,
  GenId,
  convertToSlug
} from "./chunk-I23Q342N.mjs";
import {
  DonhangService
} from "./chunk-HQOWTRL4.mjs";
import {
  MatDatepickerModule
} from "./chunk-RUJ72W7P.mjs";
import {
  require_moment
} from "./chunk-TEMMKMG5.mjs";
import {
  MatMenuModule
} from "./chunk-YOUETZOR.mjs";
import {
  MatIcon,
  MatIconModule
} from "./chunk-TGETIOQI.mjs";
import {
  FormsModule,
  MatFormFieldModule,
  MatInputModule
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
import "./chunk-7GJ6SLXG.mjs";
import "./chunk-CE5R7E7Z.mjs";
import {
  ActivatedRoute,
  Router
} from "./chunk-PLFAEF4K.mjs";
import "./chunk-HCNIBG7Y.mjs";
import {
  CommonModule,
  DecimalPipe,
  NgIf
} from "./chunk-H3GF4RFC.mjs";
import {
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
  ɵɵpureFunction1,
  ɵɵqueryRefresh,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeHtml,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-4EQURZBD.mjs";
import "./chunk-QS2IQGEQ.mjs";
import {
  __async,
  __spreadValues,
  __toESM
} from "./chunk-FMEBT56H.mjs";

// src/app/admin/congnokhachhang/detailcongnokhachhang/detailcongnokhachhang.component.ts
var import_moment = __toESM(require_moment());
var DetailCongnokhachhangComponent_ng_container_22_div_25_Defer_2_DepsFn = () => [MatIcon, MatIconButton, DecimalPipe, MatTable, MatHeaderCellDef, MatHeaderRowDef, MatColumnDef, MatCellDef, MatRowDef, MatHeaderCell, MatCell, MatHeaderRow, MatRow, MatNoDataRow, MatSort, MatSortHeader, MatPaginator];
var _c0 = (a0) => [5, 10, 25, 100, a0];
var _forTrack0 = ($index, $item) => $item.id;
function DetailCongnokhachhangComponent_button_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 1);
    \u0275\u0275listener("click", function DetailCongnokhachhangComponent_button_15_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.handleDonhangAction());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "save");
    \u0275\u0275elementEnd()();
  }
}
function DetailCongnokhachhangComponent_button_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 5);
    \u0275\u0275listener("click", function DetailCongnokhachhangComponent_button_16_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleEdit());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "edit");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", ctx_r1.DetailDonhang().status == "danhan");
  }
}
function DetailCongnokhachhangComponent_ng_container_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 11)(2, "div", 12);
    \u0275\u0275text(3, "B\u1EA1n ch\u1EAFc ch\u1EAFn mu\u1ED1n xo\xE1 kh\xF4ng?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 13)(5, "button", 14);
    \u0275\u0275listener("click", function DetailCongnokhachhangComponent_ng_container_21_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.DeleteData());
    });
    \u0275\u0275text(6, "\u0110\u1ED3ng \xDD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 15);
    \u0275\u0275listener("click", function DetailCongnokhachhangComponent_ng_container_21_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleDelete());
    });
    \u0275\u0275text(8, "Hu\u1EF7 B\u1ECF");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementContainerEnd();
  }
}
function DetailCongnokhachhangComponent_ng_container_22_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26);
    \u0275\u0275element(1, "img", 27);
    \u0275\u0275elementStart(2, "div", 28)(3, "div", 29);
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
function DetailCongnokhachhangComponent_ng_container_22_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 30);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("innerHTML", ctx_r1.DetailDonhang().khachhang.ghichu, \u0275\u0275sanitizeHtml);
  }
}
function DetailCongnokhachhangComponent_ng_container_22_div_25_Defer_1_For_3_th_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 41)(1, "span", 42);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const column_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.ColumnName[column_r5], " ");
  }
}
function DetailCongnokhachhangComponent_ng_container_22_div_25_Defer_1_For_3_td_2_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 44)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 49);
    \u0275\u0275listener("click", function DetailCongnokhachhangComponent_ng_container_22_div_25_Defer_1_For_3_td_2_Case_1_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r6);
      const row_r7 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r1.RemoveSanpham(row_r7));
    });
    \u0275\u0275elementStart(4, "mat-icon");
    \u0275\u0275text(5, "delete");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const idx_r8 = \u0275\u0275nextContext().index;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", idx_r8 + 1, " ");
  }
}
function DetailCongnokhachhangComponent_ng_container_22_div_25_Defer_1_For_3_td_2_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 50);
    \u0275\u0275listener("blur", function DetailCongnokhachhangComponent_ng_container_22_div_25_Defer_1_For_3_td_2_Case_2_Template_div_blur_0_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r9 = \u0275\u0275nextContext();
      const row_r7 = ctx_r9.$implicit;
      const idx_r8 = ctx_r9.index;
      const ctx_r1 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r1.updateValue($event, idx_r8, row_r7, "slnhan", "number"));
    })("keydown.enter", function DetailCongnokhachhangComponent_ng_container_22_div_25_Defer_1_For_3_td_2_Case_2_Template_div_keydown_enter_0_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r9 = \u0275\u0275nextContext();
      const row_r7 = ctx_r9.$implicit;
      const idx_r8 = ctx_r9.index;
      const ctx_r1 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r1.updateValue($event, idx_r8, row_r7, "slnhan", "number"));
    });
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r7 = \u0275\u0275nextContext().$implicit;
    const column_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("contentEditable", true);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 2, row_r7[column_r5] || 0, "1.0-2"), " ");
  }
}
function DetailCongnokhachhangComponent_ng_container_22_div_25_Defer_1_For_3_td_2_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 46);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r7 = \u0275\u0275nextContext().$implicit;
    const column_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, row_r7[column_r5] || 0, "1.0-2"));
  }
}
function DetailCongnokhachhangComponent_ng_container_22_div_25_Defer_1_For_3_td_2_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 46);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r7 = \u0275\u0275nextContext().$implicit;
    const column_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, row_r7[column_r5] || 0, "1.0-2"));
  }
}
function DetailCongnokhachhangComponent_ng_container_22_div_25_Defer_1_For_3_td_2_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 46);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r7 = \u0275\u0275nextContext().$implicit;
    const column_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, row_r7[column_r5] || 0, "1.0-2"));
  }
}
function DetailCongnokhachhangComponent_ng_container_22_div_25_Defer_1_For_3_td_2_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 46);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r7 = \u0275\u0275nextContext().$implicit;
    const column_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, row_r7[column_r5] || 0, "1.0-2"));
  }
}
function DetailCongnokhachhangComponent_ng_container_22_div_25_Defer_1_For_3_td_2_Case_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 51);
    \u0275\u0275listener("blur", function DetailCongnokhachhangComponent_ng_container_22_div_25_Defer_1_For_3_td_2_Case_7_Template_div_blur_0_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r9 = \u0275\u0275nextContext();
      const row_r7 = ctx_r9.$implicit;
      const idx_r8 = ctx_r9.index;
      const ctx_r1 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r1.updateValue($event, idx_r8, row_r7, "ghichu", "string"));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r7 = \u0275\u0275nextContext().$implicit;
    const column_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("contentEditable", true);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r7[column_r5] || "", " ");
  }
}
function DetailCongnokhachhangComponent_ng_container_22_div_25_Defer_1_For_3_td_2_Case_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 48);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r7 = \u0275\u0275nextContext().$implicit;
    const column_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r7[column_r5], " ");
  }
}
function DetailCongnokhachhangComponent_ng_container_22_div_25_Defer_1_For_3_td_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 43);
    \u0275\u0275template(1, DetailCongnokhachhangComponent_ng_container_22_div_25_Defer_1_For_3_td_2_Case_1_Template, 6, 1, "span", 44)(2, DetailCongnokhachhangComponent_ng_container_22_div_25_Defer_1_For_3_td_2_Case_2_Template, 3, 5, "div", 45)(3, DetailCongnokhachhangComponent_ng_container_22_div_25_Defer_1_For_3_td_2_Case_3_Template, 3, 4, "div", 46)(4, DetailCongnokhachhangComponent_ng_container_22_div_25_Defer_1_For_3_td_2_Case_4_Template, 3, 4, "div", 46)(5, DetailCongnokhachhangComponent_ng_container_22_div_25_Defer_1_For_3_td_2_Case_5_Template, 3, 4, "div", 46)(6, DetailCongnokhachhangComponent_ng_container_22_div_25_Defer_1_For_3_td_2_Case_6_Template, 3, 4, "div", 46)(7, DetailCongnokhachhangComponent_ng_container_22_div_25_Defer_1_For_3_td_2_Case_7_Template, 2, 2, "div", 47)(8, DetailCongnokhachhangComponent_ng_container_22_div_25_Defer_1_For_3_td_2_Case_8_Template, 2, 1, "span", 48);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_16_0;
    const column_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_16_0 = column_r5) === "STT" ? 1 : tmp_16_0 === "slnhan" ? 2 : tmp_16_0 === "slgiao" ? 3 : tmp_16_0 === "sldat" ? 4 : tmp_16_0 === "giaban" ? 5 : tmp_16_0 === "ttnhan" ? 6 : tmp_16_0 === "ghichu" ? 7 : 8);
  }
}
function DetailCongnokhachhangComponent_ng_container_22_div_25_Defer_1_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0, 34);
    \u0275\u0275template(1, DetailCongnokhachhangComponent_ng_container_22_div_25_Defer_1_For_3_th_1_Template, 3, 1, "th", 39)(2, DetailCongnokhachhangComponent_ng_container_22_div_25_Defer_1_For_3_td_2_Template, 9, 1, "td", 40);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const column_r5 = ctx.$implicit;
    \u0275\u0275property("matColumnDef", column_r5);
  }
}
function DetailCongnokhachhangComponent_ng_container_22_div_25_Defer_1_tr_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 52);
  }
}
function DetailCongnokhachhangComponent_ng_container_22_div_25_Defer_1_tr_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 53);
  }
}
function DetailCongnokhachhangComponent_ng_container_22_div_25_Defer_1_tr_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 54)(1, "td", 55);
    \u0275\u0275text(2, "Kh\xF4ng t\xECm th\u1EA5y");
    \u0275\u0275elementEnd()();
  }
}
function DetailCongnokhachhangComponent_ng_container_22_div_25_Defer_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 32)(1, "table", 33);
    \u0275\u0275repeaterCreate(2, DetailCongnokhachhangComponent_ng_container_22_div_25_Defer_1_For_3_Template, 3, 1, "ng-container", 34, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275template(4, DetailCongnokhachhangComponent_ng_container_22_div_25_Defer_1_tr_4_Template, 1, 0, "tr", 35)(5, DetailCongnokhachhangComponent_ng_container_22_div_25_Defer_1_tr_5_Template, 1, 0, "tr", 36)(6, DetailCongnokhachhangComponent_ng_container_22_div_25_Defer_1_tr_6_Template, 3, 0, "tr", 37);
    \u0275\u0275elementEnd();
    \u0275\u0275element(7, "mat-paginator", 38);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("dataSource", ctx_r1.dataSource());
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.displayedColumns);
    \u0275\u0275advance(2);
    \u0275\u0275property("matHeaderRowDef", ctx_r1.displayedColumns);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r1.displayedColumns);
    \u0275\u0275advance(2);
    \u0275\u0275property("pageSizeOptions", \u0275\u0275pureFunction1(5, _c0, ctx_r1.dataSource().data.length))("pageSize", ctx_r1.dataSource().data.length);
  }
}
function DetailCongnokhachhangComponent_ng_container_22_div_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31);
    \u0275\u0275template(1, DetailCongnokhachhangComponent_ng_container_22_div_25_Defer_1_Template, 8, 7);
    \u0275\u0275defer(2, 1, DetailCongnokhachhangComponent_ng_container_22_div_25_Defer_2_DepsFn);
    \u0275\u0275deferOnIdle();
    \u0275\u0275elementEnd();
  }
}
function DetailCongnokhachhangComponent_ng_container_22_table_26_For_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 57)(1, "td", 63);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 58);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 63);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 64);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td", 65);
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td", 64);
    \u0275\u0275text(14);
    \u0275\u0275pipe(15, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "td", 64);
    \u0275\u0275text(17);
    \u0275\u0275pipe(18, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "td", 64);
    \u0275\u0275text(20);
    \u0275\u0275pipe(21, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "td", 58);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r12 = ctx.$implicit;
    const \u0275$index_251_r13 = ctx.$index;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275$index_251_r13 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r12.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r12.dvt);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(9, 9, item_r12.sldat, "1.0-2"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(12, 12, item_r12.slgiao, "1.0-2"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(15, 15, item_r12.slnhan, "1.0-2"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(18, 18, item_r12.giaban, "1.0-2"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(21, 21, item_r12.ttnhan, "1.0-2"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r12.ghichu);
  }
}
function DetailCongnokhachhangComponent_ng_container_22_table_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 56)(1, "thead")(2, "tr", 57)(3, "th", 58);
    \u0275\u0275text(4, "STT");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th", 58);
    \u0275\u0275text(6, "T\xEAn s\u1EA3n ph\u1EA9m");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th", 58);
    \u0275\u0275text(8, "\u0110VT");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th", 59);
    \u0275\u0275text(10, "SL \u0110\u1EB7t");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th", 59);
    \u0275\u0275text(12, "SL Giao");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th", 59);
    \u0275\u0275text(14, "SL Nh\u1EADn");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th", 59);
    \u0275\u0275text(16, "Gi\xE1 B\xE1n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "th", 59);
    \u0275\u0275text(18, "TT Nh\u1EADn");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "th", 58);
    \u0275\u0275text(20, "Ghi ch\xFA");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(21, "tbody");
    \u0275\u0275repeaterCreate(22, DetailCongnokhachhangComponent_ng_container_22_table_26_For_23_Template, 24, 24, "tr", 57, _forTrack0);
    \u0275\u0275elementStart(24, "tr", 57)(25, "td", 60);
    \u0275\u0275text(26, "T\u1ED5ng:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "td", 61);
    \u0275\u0275text(28);
    \u0275\u0275pipe(29, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "td", 61);
    \u0275\u0275text(31);
    \u0275\u0275pipe(32, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "td", 61);
    \u0275\u0275text(34);
    \u0275\u0275pipe(35, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275element(36, "td", 61);
    \u0275\u0275elementStart(37, "td", 61);
    \u0275\u0275text(38);
    \u0275\u0275pipe(39, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275element(40, "td", 62);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(22);
    \u0275\u0275repeater(ctx_r1.DetailDonhang().sanpham);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(29, 4, ctx_r1.TinhTong(ctx_r1.DetailDonhang().sanpham, "sldat"), "1.0-2"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(32, 7, ctx_r1.TinhTong(ctx_r1.DetailDonhang().sanpham, "slgiao"), "1.0-2"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(35, 10, ctx_r1.TinhTong(ctx_r1.DetailDonhang().sanpham, "slnhan"), "1.0-2"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(39, 13, ctx_r1.TinhTong(ctx_r1.DetailDonhang().sanpham, "ttnhan"), "1.0-2"));
  }
}
function DetailCongnokhachhangComponent_ng_container_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 16)(2, "div", 17);
    \u0275\u0275template(3, DetailCongnokhachhangComponent_ng_container_22_div_3_Template, 13, 0, "div", 18);
    \u0275\u0275elementStart(4, "div", 19);
    \u0275\u0275text(5, "B\u1EA3ng Sao K\xEA H\xE0ng Ng\xE0y");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275template(8, DetailCongnokhachhangComponent_ng_container_22_div_8_Template, 1, 1, "div", 20);
    \u0275\u0275elementStart(9, "div", 21)(10, "strong");
    \u0275\u0275text(11, "\u0110\u1ECBa Ch\u1EC9 : ");
    \u0275\u0275elementEnd();
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 21)(14, "strong");
    \u0275\u0275text(15, "Ghi Ch\xFA : ");
    \u0275\u0275elementEnd();
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 21)(18, "strong");
    \u0275\u0275text(19, "S\u1ED1 \u0110i\u1EC7n Tho\u1EA1i : ");
    \u0275\u0275elementEnd();
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 21)(22, "strong");
    \u0275\u0275text(23);
    \u0275\u0275pipe(24, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(25, DetailCongnokhachhangComponent_ng_container_22_div_25_Template, 4, 0, "div", 22)(26, DetailCongnokhachhangComponent_ng_container_22_table_26_Template, 41, 16, "table", 23);
    \u0275\u0275elementStart(27, "div", 24);
    \u0275\u0275text(28, "Ng\xE0y In:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "div", 25)(30, "p")(31, "strong");
    \u0275\u0275text(32, "Ng\u01B0\u1EDDi v\u1EADn chuy\u1EC3n");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "p")(34, "strong");
    \u0275\u0275text(35, "Ng\u01B0\u1EDDi nh\u1EADn h\xE0ng");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "p")(37, "strong");
    \u0275\u0275text(38, "Th\u1EE7 kho");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(39, "p")(40, "strong");
    \u0275\u0275text(41, "Ng\u01B0\u1EDDi l\u1EADp");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    let tmp_3_0;
    let tmp_4_0;
    let tmp_5_0;
    let tmp_6_0;
    let tmp_7_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", !ctx_r1.isEdit());
    \u0275\u0275advance(3);
    \u0275\u0275classMapInterpolate1("font-bold text-[18px] uppercase ", ((tmp_2_0 = ctx_r1.DetailDonhang()) == null ? null : tmp_2_0.khachhangId) ? "" : "text-red-700 italic", "");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(((tmp_3_0 = ctx_r1.getName((tmp_3_0 = ctx_r1.DetailDonhang()) == null ? null : tmp_3_0.khachhangId)) == null ? null : tmp_3_0.name) || "Ch\u01B0a Ch\u1ECDn Kh\xE1ch H\xE0ng");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isEdit() && ((tmp_4_0 = ctx_r1.DetailDonhang()) == null ? null : tmp_4_0.khachhang == null ? null : tmp_4_0.khachhang.ghichu));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", (tmp_5_0 = ctx_r1.DetailDonhang()) == null ? null : tmp_5_0.khachhang == null ? null : tmp_5_0.khachhang.diachi, "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", (tmp_6_0 = ctx_r1.DetailDonhang()) == null ? null : tmp_6_0.ghichu, "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", (tmp_7_0 = ctx_r1.DetailDonhang()) == null ? null : tmp_7_0.khachhang == null ? null : tmp_7_0.khachhang.sdt, "");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("T\u1ED5ng kh\u1ED1i l\u01B0\u1EE3ng nh\u1EADn : ", \u0275\u0275pipeBind2(24, 12, ctx_r1.TinhTong(ctx_r1.DetailDonhang().sanpham, "slnhan"), "1.0-2"), "");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.isEdit());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.isEdit());
  }
}
var DetailCongnokhachhangComponent = class _DetailCongnokhachhangComponent {
  _ListcongnokhachhangComponent = inject(ListcongnokhachhangComponent);
  _DonhangService = inject(DonhangService);
  _KhachhangService = inject(KhachhangService);
  _BanggiaService = inject(BanggiaService);
  _SanphamService = inject(SanphamService);
  _route = inject(ActivatedRoute);
  _router = inject(Router);
  _snackBar = inject(MatSnackBar);
  constructor() {
    this._route.paramMap.subscribe((params) => __async(this, null, function* () {
      const id = params.get("id");
      this._DonhangService.setDonhangId(id);
      yield this._KhachhangService.getAllKhachhang();
      this.filterKhachhang = this.ListKhachhang().filter((v) => v.isActive);
      yield this._BanggiaService.getAllBanggia();
      this.filterBanggia = this._BanggiaService.ListBanggia();
      yield this._SanphamService.getAllSanpham();
      this.filterSanpham = this._SanphamService.ListSanpham();
      this.dataSource().data = this.DetailDonhang().sanpham;
      this.dataSource().paginator = this.paginator;
      this.dataSource().sort = this.sort;
    }));
    effect(() => __async(this, null, function* () {
      const id = this._DonhangService.donhangId();
      if (!id) {
        this._router.navigate(["/admin/congnokhachhang"]);
        this._ListcongnokhachhangComponent.drawer.close();
      }
      if (id === "0") {
        this.DetailDonhang.set({
          title: GenId(8, false),
          madonhang: GenId(8, false),
          ngaygiao: (0, import_moment.default)().add(1, "days").format("YYYY-MM-DD")
        });
        this._ListcongnokhachhangComponent.drawer.open();
        this.isEdit.update((value) => !value);
        this._router.navigate(["/admin/congnokhachhang", "0"]);
      } else {
        yield this._DonhangService.getDonhangByid(id);
        this.DetailDonhang.update((v) => {
          v.sanpham.forEach((v1) => {
            v1.ttnhan = v1.slnhan * v1.giaban;
            return v1;
          });
          return v;
        });
        this._ListcongnokhachhangComponent.drawer.open();
        this._router.navigate(["/admin/congnokhachhang", id]);
      }
    }));
  }
  DetailDonhang = this._DonhangService.DetailDonhang;
  ListKhachhang = this._KhachhangService.ListKhachhang;
  isEdit = signal(false);
  isDelete = signal(false);
  filterKhachhang = [];
  filterBanggia = [];
  filterSanpham = [];
  donhangId = this._DonhangService.donhangId;
  ngOnInit() {
    return __async(this, null, function* () {
      document.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && document.activeElement?.getAttribute("contenteditable") === "true") {
          e.preventDefault();
        }
      });
    });
  }
  DoneDonhang() {
    this.DetailDonhang.update((v) => {
      v.status = "danhan";
      return v;
    });
    this._DonhangService.updateDonhang(this.DetailDonhang());
  }
  handleDonhangAction() {
    return __async(this, null, function* () {
      if (this.donhangId() === "0") {
        yield this.createDonhang();
      } else {
        yield this.updateDonhang();
      }
    });
  }
  createDonhang() {
    return __async(this, null, function* () {
      try {
        this.DetailDonhang.update((v) => {
          v.type = "donsi";
          return v;
        });
        this.DetailDonhang().sanpham = this.DetailDonhang().sanpham.map((v) => {
          v.ttgiao = Number(v.slgiao) * Number(v.giaban) || 0;
          return v;
        });
        yield this._DonhangService.CreateDonhang(this.DetailDonhang());
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
  updateDonhang() {
    return __async(this, null, function* () {
      try {
        this.DetailDonhang().sanpham = this.DetailDonhang().sanpham.map((v) => {
          v.ttgiao = Number(v.slgiao) * Number(v.giaban) || 0;
          return v;
        });
        yield this._DonhangService.updateDonhang(this.DetailDonhang());
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
        this._router.navigate(["/admin/congnokhachhang"]);
      } catch (error) {
        console.error("L\u1ED7i khi x\xF3a donhang:", error);
      }
    });
  }
  goBack() {
    this._router.navigate(["/admin/congnokhachhang"]);
    this._ListcongnokhachhangComponent.drawer.close();
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
    this.DetailDonhang.update((v) => {
      v.slug = convertToSlug(v.title);
      return v;
    });
  }
  DoFindKhachhang(event) {
    const query = event.target.value.toLowerCase();
    this.filterKhachhang = this.ListKhachhang().filter((v) => v.isActive && v.name?.toLowerCase().includes(query) || v.namenn?.toLowerCase().includes(query) || v.sdt?.toLowerCase().includes(query));
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
    const newValue = type === "number" ? Number(event.target.innerText.trim()) || 0 : event.target.innerText.trim();
    this.DetailDonhang.update((v) => {
      if (index !== null) {
        if (field === "slnhan") {
          const newNhan = newValue;
          if (Number(newNhan) < 0) {
            this._snackBar.open("S\u1ED1 l\u01B0\u1EE3ng giao ph\u1EA3i l\u1EDBn h\u01A1n ho\u1EB7c b\u1EB1ng 0", "", {
              duration: 1e3,
              horizontalPosition: "end",
              verticalPosition: "top",
              panelClass: ["snackbar-error"]
            });
          } else {
            v.sanpham[index]["slnhan"] = newNhan;
            v.sanpham[index]["ttnhan"] = v.sanpham[index]["slnhan"] * v.sanpham[index]["giaban"];
          }
        } else {
          v.sanpham[index][field] = newValue;
        }
      } else {
        v[field] = newValue;
      }
      return v;
    });
    setTimeout(() => {
      if (index !== null) {
        event.target.innerText = this.DetailDonhang()?.sanpham[index]?.slnhan || "0";
      }
    }, 0);
    console.log(this.DetailDonhang());
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
  SelectKhachhang(event) {
    const selectedKhachhang = this.ListKhachhang().find((v) => v.id === event.value);
    console.log(selectedKhachhang);
    if (selectedKhachhang) {
      this.DetailDonhang.update((v) => {
        const khachhang = {
          name: selectedKhachhang.name,
          diachi: selectedKhachhang.diachi,
          sdt: selectedKhachhang.sdt,
          ghichu: selectedKhachhang.ghichu
        };
        v.khachhangId = selectedKhachhang.id;
        v.khachhang = khachhang;
        v.banggiaId = selectedKhachhang.banggia.find((v2) => (0, import_moment.default)() > (0, import_moment.default)(v2.batdau) && (0, import_moment.default)() < (0, import_moment.default)(v2.ketthuc))?.id;
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
    "giaban",
    "ttnhan",
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
    giaban: "Gi\xE1 B\xE1n",
    ttnhan: "TT Nh\u1EADn",
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
          const item = this._SanphamService.ListSanpham().find((v2) => v2.masp === v1.masp);
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
      this.dataSource().paginator = this.paginator;
      this.dataSource().sort = this.sort;
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
    this.dataSource().paginator = this.paginator;
    this.dataSource().sort = this.sort;
    this.reloadfilter();
  }
  getName(id) {
    return this.ListKhachhang().find((v) => v.id === id);
  }
  reloadfilter() {
    this.filterSanpham = this._SanphamService.ListSanpham().filter((v) => !this.DetailDonhang().sanpham.some((v2) => v2.id === v.id));
  }
  // RemoveSanpham(item:any){
  //   this.DetailBanggia.update((v:any)=>{
  //     v.sanpham = v.sanpham.filter((v1:any) => v1.id !== item.id);
  //     this.reloadfilter();
  //     return v;
  //   })
  //   this.dataSource().data = this.DetailBanggia().sanpham;
  //   this.dataSource().paginator = this.paginator;
  //   this.dataSource().sort = this.sort;
  // }
  DoFindSanpham(event) {
    const value = event.target.value;
    console.log(value);
    this.filterSanpham = this._SanphamService.ListSanpham().filter((v) => v.title.toLowerCase().includes(value.toLowerCase()));
  }
  SelectSanpham(event) {
    const value = event.value;
    const item = this._SanphamService.ListSanpham().find((v) => v.id === value);
    this.DetailDonhang.update((v) => {
      if (!v.sanpham) {
        v.sanpham = [];
        item.sldat = item.slgiao = 1;
        v.sanpham.push(item);
      } else {
        item.sldat = item.slgiao = 1;
        v.sanpham.push(item);
      }
      this.reloadfilter();
      return v;
    });
    this.dataSource().data = this.DetailDonhang().sanpham;
    this.dataSource().paginator = this.paginator;
    this.dataSource().sort = this.sort;
  }
  RemoveSanpham(item) {
    this.DetailDonhang.update((v) => {
      v.sanpham = v.sanpham.filter((v1) => v1.id !== item.id);
      this.reloadfilter();
      return v;
    });
    this.dataSource().data = this.DetailDonhang().sanpham;
    this.dataSource().paginator = this.paginator;
    this.dataSource().sort = this.sort;
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
        this._router.navigate(["/admin/congnokhachhang", data.id]);
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
  static \u0275fac = function DetailCongnokhachhangComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DetailCongnokhachhangComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DetailCongnokhachhangComponent, selectors: [["app-detailcongnokhachhang"]], viewQuery: function DetailCongnokhachhangComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(MatPaginator, 5);
      \u0275\u0275viewQuery(MatSort, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.paginator = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.sort = _t.first);
    }
  }, decls: 23, vars: 9, consts: [[1, "flex", "flex-row", "justify-between", "items-center", "space-x-2", "p-2"], ["mat-icon-button", "", "color", "primary", 3, "click"], [1, "p-2", "min-w-28", "font-bold", "focus:border", "focus:rounded-lg", "focus:border-blue-600", "focus:bg-slate-100", "focus:outline-none", 3, "blur", "contentEditable"], [1, "flex", "flex-row", "space-x-2", "items-center"], ["mat-flat-button", "", "color", "primary", 3, "click", "disabled"], ["mat-icon-button", "", "color", "primary", 3, "click", "disabled"], ["mat-icon-button", "", "color", "primary", 3, "click", 4, "ngIf"], ["mat-icon-button", "", "color", "primary", 3, "disabled", "click", 4, "ngIf"], ["mat-icon-button", "", "color", "warn", 3, "click", "disabled"], [1, "relative", "flex", "flex-col", "w-full", "p-4", "overflow-auto"], [4, "ngIf"], [1, "flex", "flex-col", "space-y-4", "items-center", "justify-center"], [1, "font-bold", "text-2xl"], [1, "flex", "flex-row", "space-x-2", "items-center", "justify-center"], ["mat-flat-button", "", "color", "primary", 3, "click"], ["mat-flat-button", "", "color", "warn", 3, "click"], ["id", "printContent", 1, "min-w-[800px]", "flex", "flex-col", "space-y-6", "items-center", "p-2", "border", "rounded-lg"], [1, "w-full", "flex", "flex-col", "space-y-4", "items-center", "justify-center"], ["class", "w-full flex flex-row space-x-2 items-center justify-between", 4, "ngIf"], [1, "font-bold", "text-[18px]", "uppercase"], ["class", "p-2 rounded-lg border text-red-600", 3, "innerHTML", 4, "ngIf"], [1, "w-full", "flex", "items-start"], ["class", "w-full flex flex-col overflow-y-auto", 4, "ngIf"], ["class", "w-full border-collapse border mt-4", 4, "ngIf"], [1, "w-full", "text-end", "font-bold", "p-2"], [1, "w-full", "flex", "justify-between", "items-center", "text-center", "mt-6", "p-2"], [1, "w-full", "flex", "flex-row", "space-x-2", "items-center", "justify-between"], ["src", "/images/logo-full.png", 1, "h-20", "mx-auto"], [1, "w-2/3", "flex", "flex-col", "space-y-2"], [1, "font-bold", "text-[18px]"], [1, "p-2", "rounded-lg", "border", "text-red-600", 3, "innerHTML"], [1, "w-full", "flex", "flex-col", "overflow-y-auto"], [1, "w-full", "overflow-auto"], ["mat-table", "", "matSort", "", 1, "!border", "w-full", "cursor-pointer", 3, "dataSource"], [3, "matColumnDef"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["class", "mat-row", 4, "matNoDataRow"], [3, "pageSizeOptions", "pageSize"], ["class", "whitespace-nowrap", "mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["mat-header-cell", "", "mat-sort-header", "", 1, "whitespace-nowrap"], [1, "line-clamp-4", "me-4"], ["mat-cell", ""], [1, "max-w-20", "line-clamp-4", "flex", "flex-row", "items-center"], [1, "p-2", "min-w-28", "text-end", "bg-slate-200", "focus:border", "rounded-lg", "focus:border-blue-600", "focus:bg-slate-100", "focus:outline-none", 3, "contentEditable"], [1, "text-end"], [1, "p-2", "min-w-28", "bg-slate-200", "focus:border", "rounded-lg", "focus:border-blue-600", "focus:bg-slate-100", "focus:outline-none", 3, "contentEditable"], [1, "max-w-40", "line-clamp-4"], ["mat-icon-button", "", "color", "warn", 3, "click"], [1, "p-2", "min-w-28", "text-end", "bg-slate-200", "focus:border", "rounded-lg", "focus:border-blue-600", "focus:bg-slate-100", "focus:outline-none", 3, "blur", "keydown.enter", "contentEditable"], [1, "p-2", "min-w-28", "bg-slate-200", "focus:border", "rounded-lg", "focus:border-blue-600", "focus:bg-slate-100", "focus:outline-none", 3, "blur", "contentEditable"], ["mat-header-row", ""], ["mat-row", ""], [1, "mat-row"], ["colspan", "4", 1, "mat-cell", "p-4"], [1, "w-full", "border-collapse", "border", "mt-4"], [1, "border"], [1, "border", "p-2"], [1, "border", "p-2", "max-w-10"], ["colspan", "3", 1, "border", "p-2", "text-start"], [1, "border", "p-2", "text-end", "font-bold"], [1, "border", "p-2", "text-end"], [1, "border", "p-2", "text-center"], [1, "border", "p-2", "text-end", "max-w-10"], [1, "border", "p-2", "text-end", "max-w-"]], template: function DetailCongnokhachhangComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "button", 1);
      \u0275\u0275listener("click", function DetailCongnokhachhangComponent_Template_button_click_1_listener() {
        return ctx.goBack();
      });
      \u0275\u0275elementStart(2, "mat-icon");
      \u0275\u0275text(3, "arrow_back");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(4, "div", 2);
      \u0275\u0275listener("blur", function DetailCongnokhachhangComponent_Template_div_blur_4_listener($event) {
        return ctx.updateValue($event, null, ctx.DetailDonhang(), "title", "string");
      });
      \u0275\u0275text(5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "div", 3)(7, "button", 4);
      \u0275\u0275listener("click", function DetailCongnokhachhangComponent_Template_button_click_7_listener() {
        return ctx.DoneDonhang();
      });
      \u0275\u0275text(8, " \u0110\xE3 Nh\u1EADn");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "button", 5);
      \u0275\u0275listener("click", function DetailCongnokhachhangComponent_Template_button_click_9_listener() {
        return ctx.CoppyDon();
      });
      \u0275\u0275elementStart(10, "mat-icon");
      \u0275\u0275text(11, "content_copy");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(12, "button", 1);
      \u0275\u0275listener("click", function DetailCongnokhachhangComponent_Template_button_click_12_listener() {
        return ctx.printContent();
      });
      \u0275\u0275elementStart(13, "mat-icon");
      \u0275\u0275text(14, "print");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(15, DetailCongnokhachhangComponent_button_15_Template, 3, 0, "button", 6)(16, DetailCongnokhachhangComponent_button_16_Template, 3, 1, "button", 7);
      \u0275\u0275elementStart(17, "button", 8);
      \u0275\u0275listener("click", function DetailCongnokhachhangComponent_Template_button_click_17_listener() {
        return ctx.toggleDelete();
      });
      \u0275\u0275elementStart(18, "mat-icon");
      \u0275\u0275text(19, "delete");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(20, "div", 9);
      \u0275\u0275template(21, DetailCongnokhachhangComponent_ng_container_21_Template, 9, 0, "ng-container", 10)(22, DetailCongnokhachhangComponent_ng_container_22_Template, 42, 15, "ng-container", 10);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_1_0;
      \u0275\u0275advance(4);
      \u0275\u0275property("contentEditable", true);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ((tmp_1_0 = ctx.DetailDonhang()) == null ? null : tmp_1_0.madonhang) || "Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u", " ");
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.DetailDonhang().status == "danhan");
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.DetailDonhang().status == "danhan");
      \u0275\u0275advance(6);
      \u0275\u0275property("ngIf", ctx.isEdit());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isEdit());
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.DetailDonhang().status == "danhan");
      \u0275\u0275advance(4);
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
    CommonModule,
    NgIf,
    DecimalPipe,
    MatSlideToggleModule,
    MatMenuModule,
    MatDatepickerModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DetailCongnokhachhangComponent, { className: "DetailCongnokhachhangComponent", filePath: "src/app/admin/congnokhachhang/detailcongnokhachhang/detailcongnokhachhang.component.ts", lineNumber: 60 });
})();
export {
  DetailCongnokhachhangComponent
};
//# sourceMappingURL=chunk-KCKL4RRR.mjs.map
