import {
  PermissionGraphQLService,
  UserPermissionGraphQLService
} from "./chunk-W4EEENZM.js";
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
  MatMenu,
  MatMenuItem,
  MatMenuModule,
  MatMenuTrigger
} from "./chunk-RUSDLITN.js";
import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-NOVTUKZ4.js";
import "./chunk-SSKGL4JO.js";
import {
  MatDialogModule
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
  MatCheckboxModule
} from "./chunk-6SHRRI2O.js";
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
  MatRow,
  MatRowDef,
  MatTable,
  MatTableModule
} from "./chunk-TUEMV45J.js";
import "./chunk-E3N2TZ4N.js";
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
  MatSuffix,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  RequiredValidator,
  ɵNgNoValidate
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
import {
  MatNativeDateModule,
  MatOption
} from "./chunk-EMBYIBW3.js";
import "./chunk-HCACJZKN.js";
import {
  CommonModule,
  DatePipe,
  NgForOf,
  NgIf
} from "./chunk-RKTFENMZ.js";
import {
  computed,
  effect,
  inject,
  input,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵreference,
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
  ɵɵtwoWayProperty
} from "./chunk-RBDY2J7V.js";
import "./chunk-E3MB3462.js";
import {
  __async
} from "./chunk-SXK72SKC.js";

// src/app/admin/user-permission/user-permission-management.component.ts
var _c0 = () => [5, 10, 25, 50];
function UserPermissionManagementComponent_div_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26);
    \u0275\u0275element(1, "mat-spinner", 27);
    \u0275\u0275elementStart(2, "p", 28);
    \u0275\u0275text(3, "\u0110ang t\u1EA3i d\u1EEF li\u1EC7u...");
    \u0275\u0275elementEnd()();
  }
}
function UserPermissionManagementComponent_div_45_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 26)(1, "mat-icon", 29);
    \u0275\u0275text(2, "error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 30);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 31);
    \u0275\u0275listener("click", function UserPermissionManagementComponent_div_45_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.loadUserPermissions());
    });
    \u0275\u0275text(6, " Th\u1EED l\u1EA1i ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.error());
  }
}
function UserPermissionManagementComponent_div_46_th_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 48);
    \u0275\u0275text(1, "Quy\u1EC1n");
    \u0275\u0275elementEnd();
  }
}
function UserPermissionManagementComponent_div_46_td_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 49)(1, "div", 50)(2, "span", 51);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 52);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const element_r3 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(element_r3.permission == null ? null : element_r3.permission.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(element_r3.permission == null ? null : element_r3.permission.description);
  }
}
function UserPermissionManagementComponent_div_46_th_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 53);
    \u0275\u0275text(1, "Lo\u1EA1i");
    \u0275\u0275elementEnd();
  }
}
function UserPermissionManagementComponent_div_46_td_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 49)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const element_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275classMap(element_r4.isGranted ? "bg-green-100 text-green-800 px-2 py-1 rounded text-xs" : "bg-red-100 text-red-800 px-2 py-1 rounded text-xs");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", element_r4.isGranted ? "\u0110\u01B0\u1EE3c c\u1EA5p" : "B\u1ECB t\u1EEB ch\u1ED1i", " ");
  }
}
function UserPermissionManagementComponent_div_46_th_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 53);
    \u0275\u0275text(1, "Ng\u01B0\u1EDDi c\u1EA5p");
    \u0275\u0275elementEnd();
  }
}
function UserPermissionManagementComponent_div_46_td_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 49);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const element_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (element_r5.grantedByUser == null ? null : element_r5.grantedByUser.name) || (element_r5.grantedByUser == null ? null : element_r5.grantedByUser.email) || "N/A", " ");
  }
}
function UserPermissionManagementComponent_div_46_th_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 48);
    \u0275\u0275text(1, "Ng\xE0y c\u1EA5p");
    \u0275\u0275elementEnd();
  }
}
function UserPermissionManagementComponent_div_46_td_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 49);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const element_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, element_r6.grantedAt, "dd/MM/yyyy HH:mm"), " ");
  }
}
function UserPermissionManagementComponent_div_46_th_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 53);
    \u0275\u0275text(1, "H\u1EBFt h\u1EA1n");
    \u0275\u0275elementEnd();
  }
}
function UserPermissionManagementComponent_div_46_td_16_div_1_span_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 56);
    \u0275\u0275text(1, "\u0110\xE3 h\u1EBFt h\u1EA1n");
    \u0275\u0275elementEnd();
  }
}
function UserPermissionManagementComponent_div_46_td_16_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, UserPermissionManagementComponent_div_46_td_16_div_1_span_4_Template, 2, 0, "span", 55);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const element_r7 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.isExpired(element_r7.expiresAt) ? "text-red-600 font-medium" : "text-gray-700");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(3, 4, element_r7.expiresAt, "dd/MM/yyyy HH:mm"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.isExpired(element_r7.expiresAt));
  }
}
function UserPermissionManagementComponent_div_46_td_16_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 57);
    \u0275\u0275text(1, "V\u0129nh vi\u1EC5n");
    \u0275\u0275elementEnd();
  }
}
function UserPermissionManagementComponent_div_46_td_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 49);
    \u0275\u0275template(1, UserPermissionManagementComponent_div_46_td_16_div_1_Template, 5, 7, "div", 54)(2, UserPermissionManagementComponent_div_46_td_16_ng_template_2_Template, 2, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const element_r7 = ctx.$implicit;
    const noExpiry_r8 = \u0275\u0275reference(3);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", element_r7.expiresAt)("ngIfElse", noExpiry_r8);
  }
}
function UserPermissionManagementComponent_div_46_th_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 53);
    \u0275\u0275text(1, "L\xFD do");
    \u0275\u0275elementEnd();
  }
}
function UserPermissionManagementComponent_div_46_td_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 58)(1, "span", 59);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const element_r9 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("title", element_r9.reason);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", element_r9.reason || "Kh\xF4ng c\xF3 ghi ch\xFA", " ");
  }
}
function UserPermissionManagementComponent_div_46_th_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 53);
    \u0275\u0275text(1, "Thao t\xE1c");
    \u0275\u0275elementEnd();
  }
}
function UserPermissionManagementComponent_div_46_td_22_mat_icon_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "more_vert");
    \u0275\u0275elementEnd();
  }
}
function UserPermissionManagementComponent_div_46_td_22_mat_spinner_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 65);
  }
}
function UserPermissionManagementComponent_div_46_td_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 49)(1, "button", 60);
    \u0275\u0275template(2, UserPermissionManagementComponent_div_46_td_22_mat_icon_2_Template, 2, 0, "mat-icon", 61)(3, UserPermissionManagementComponent_div_46_td_22_mat_spinner_3_Template, 1, 0, "mat-spinner", 62);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "mat-menu", null, 1)(6, "button", 63);
    \u0275\u0275listener("click", function UserPermissionManagementComponent_div_46_td_22_Template_button_click_6_listener() {
      const element_r11 = \u0275\u0275restoreView(_r10).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.editPermission(element_r11));
    });
    \u0275\u0275elementStart(7, "mat-icon");
    \u0275\u0275text(8, "edit");
    \u0275\u0275elementEnd();
    \u0275\u0275text(9, " Ch\u1EC9nh s\u1EEDa ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "button", 64);
    \u0275\u0275listener("click", function UserPermissionManagementComponent_div_46_td_22_Template_button_click_10_listener() {
      const element_r11 = \u0275\u0275restoreView(_r10).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.revokePermission(element_r11));
    });
    \u0275\u0275elementStart(11, "mat-icon");
    \u0275\u0275text(12, "delete");
    \u0275\u0275elementEnd();
    \u0275\u0275text(13, " Thu h\u1ED3i quy\u1EC1n ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const element_r11 = ctx.$implicit;
    const actionMenu_r12 = \u0275\u0275reference(5);
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("matMenuTriggerFor", actionMenu_r12)("disabled", ctx_r1.processingPermission() === element_r11.id);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.processingPermission() !== element_r11.id);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.processingPermission() === element_r11.id);
  }
}
function UserPermissionManagementComponent_div_46_tr_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 66);
  }
}
function UserPermissionManagementComponent_div_46_tr_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 67);
  }
  if (rf & 2) {
    const row_r13 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("opacity-50", ctx_r1.isExpired(row_r13.expiresAt));
  }
}
function UserPermissionManagementComponent_div_46_div_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 26)(1, "mat-icon", 68);
    \u0275\u0275text(2, "assignment_ind");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 69);
    \u0275\u0275text(4, "Kh\xF4ng c\xF3 quy\u1EC1n \u0111\u1EB7c bi\u1EC7t n\xE0o \u0111\u01B0\u1EE3c c\u1EA5p");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 31);
    \u0275\u0275listener("click", function UserPermissionManagementComponent_div_46_div_25_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openAssignDialog());
    });
    \u0275\u0275text(6, " Th\xEAm quy\u1EC1n \u0111\u1EA7u ti\xEAn ");
    \u0275\u0275elementEnd()();
  }
}
function UserPermissionManagementComponent_div_46_mat_paginator_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-paginator", 70);
    \u0275\u0275listener("page", function UserPermissionManagementComponent_div_46_mat_paginator_26_Template_mat_paginator_page_0_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onPageChange($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("length", ctx_r1.totalCount())("pageSize", ctx_r1.pageSize())("pageSizeOptions", \u0275\u0275pureFunction0(3, _c0));
  }
}
function UserPermissionManagementComponent_div_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 32)(1, "table", 33);
    \u0275\u0275elementContainerStart(2, 34);
    \u0275\u0275template(3, UserPermissionManagementComponent_div_46_th_3_Template, 2, 0, "th", 35)(4, UserPermissionManagementComponent_div_46_td_4_Template, 6, 2, "td", 36);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(5, 37);
    \u0275\u0275template(6, UserPermissionManagementComponent_div_46_th_6_Template, 2, 0, "th", 38)(7, UserPermissionManagementComponent_div_46_td_7_Template, 3, 3, "td", 36);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(8, 39);
    \u0275\u0275template(9, UserPermissionManagementComponent_div_46_th_9_Template, 2, 0, "th", 38)(10, UserPermissionManagementComponent_div_46_td_10_Template, 2, 1, "td", 36);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(11, 40);
    \u0275\u0275template(12, UserPermissionManagementComponent_div_46_th_12_Template, 2, 0, "th", 35)(13, UserPermissionManagementComponent_div_46_td_13_Template, 3, 4, "td", 36);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(14, 41);
    \u0275\u0275template(15, UserPermissionManagementComponent_div_46_th_15_Template, 2, 0, "th", 38)(16, UserPermissionManagementComponent_div_46_td_16_Template, 4, 2, "td", 36);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(17, 42);
    \u0275\u0275template(18, UserPermissionManagementComponent_div_46_th_18_Template, 2, 0, "th", 38)(19, UserPermissionManagementComponent_div_46_td_19_Template, 3, 2, "td", 43);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(20, 44);
    \u0275\u0275template(21, UserPermissionManagementComponent_div_46_th_21_Template, 2, 0, "th", 38)(22, UserPermissionManagementComponent_div_46_td_22_Template, 14, 4, "td", 36);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(23, UserPermissionManagementComponent_div_46_tr_23_Template, 1, 0, "tr", 45)(24, UserPermissionManagementComponent_div_46_tr_24_Template, 1, 2, "tr", 46);
    \u0275\u0275elementEnd();
    \u0275\u0275template(25, UserPermissionManagementComponent_div_46_div_25_Template, 7, 0, "div", 22)(26, UserPermissionManagementComponent_div_46_mat_paginator_26_Template, 1, 4, "mat-paginator", 47);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("dataSource", ctx_r1.displayedPermissions());
    \u0275\u0275advance(22);
    \u0275\u0275property("matHeaderRowDef", ctx_r1.displayedColumns);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r1.displayedColumns);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.displayedPermissions().length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.displayedPermissions().length > 0);
  }
}
function UserPermissionManagementComponent_div_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 71)(1, "h3", 72);
    \u0275\u0275text(2, "Th\u1ED1ng k\xEA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 73)(4, "div")(5, "span", 74);
    \u0275\u0275text(6, "T\u1ED5ng quy\u1EC1n:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 75);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div")(10, "span", 74);
    \u0275\u0275text(11, "\u0110\u01B0\u1EE3c c\u1EA5p:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span", 76);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div")(15, "span", 74);
    \u0275\u0275text(16, "B\u1ECB t\u1EEB ch\u1ED1i:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "span", 77);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div")(20, "span", 74);
    \u0275\u0275text(21, "\u0110\xE3 h\u1EBFt h\u1EA1n:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "span", 78);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r1.statistics().total);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.statistics().granted);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.statistics().denied);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.statistics().expired);
  }
}
function UserPermissionManagementComponent_div_48_mat_option_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 90);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const permission_r17 = ctx.$implicit;
    \u0275\u0275property("value", permission_r17.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", permission_r17.name, " - ", permission_r17.description, " ");
  }
}
function UserPermissionManagementComponent_div_48_mat_spinner_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 98);
  }
}
function UserPermissionManagementComponent_div_48_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 79);
    \u0275\u0275listener("click", function UserPermissionManagementComponent_div_48_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeAssignDialog());
    });
    \u0275\u0275elementStart(1, "div", 80);
    \u0275\u0275listener("click", function UserPermissionManagementComponent_div_48_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r16);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 81)(3, "h3", 82);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 83);
    \u0275\u0275listener("click", function UserPermissionManagementComponent_div_48_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeAssignDialog());
    });
    \u0275\u0275elementStart(6, "mat-icon");
    \u0275\u0275text(7, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(8, "form", 84);
    \u0275\u0275listener("ngSubmit", function UserPermissionManagementComponent_div_48_Template_form_ngSubmit_8_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.handleAssignPermission());
    });
    \u0275\u0275elementStart(9, "div", 85)(10, "mat-form-field", 86)(11, "mat-label");
    \u0275\u0275text(12, "Ch\u1ECDn quy\u1EC1n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "mat-select", 87);
    \u0275\u0275twoWayListener("ngModelChange", function UserPermissionManagementComponent_div_48_Template_mat_select_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.assignForm.permissionId, $event) || (ctx_r1.assignForm.permissionId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(14, "mat-option", 15);
    \u0275\u0275text(15, "-- Ch\u1ECDn quy\u1EC1n --");
    \u0275\u0275elementEnd();
    \u0275\u0275template(16, UserPermissionManagementComponent_div_48_mat_option_16_Template, 2, 3, "mat-option", 88);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "mat-form-field", 86)(18, "mat-label");
    \u0275\u0275text(19, "Lo\u1EA1i quy\u1EC1n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "mat-select", 89);
    \u0275\u0275twoWayListener("ngModelChange", function UserPermissionManagementComponent_div_48_Template_mat_select_ngModelChange_20_listener($event) {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.assignForm.isGranted, $event) || (ctx_r1.assignForm.isGranted = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(21, "mat-option", 90);
    \u0275\u0275text(22, "C\u1EA5p quy\u1EC1n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "mat-option", 90);
    \u0275\u0275text(24, "T\u1EEB ch\u1ED1i quy\u1EC1n");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(25, "mat-form-field", 86)(26, "mat-label");
    \u0275\u0275text(27, "Ng\xE0y h\u1EBFt h\u1EA1n (t\xF9y ch\u1ECDn)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "input", 91);
    \u0275\u0275twoWayListener("ngModelChange", function UserPermissionManagementComponent_div_48_Template_input_ngModelChange_28_listener($event) {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.assignForm.expiresAt, $event) || (ctx_r1.assignForm.expiresAt = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275element(29, "mat-datepicker-toggle", 92)(30, "mat-datepicker", null, 2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "mat-form-field", 86)(33, "mat-label");
    \u0275\u0275text(34, "L\xFD do");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "textarea", 93);
    \u0275\u0275twoWayListener("ngModelChange", function UserPermissionManagementComponent_div_48_Template_textarea_ngModelChange_35_listener($event) {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.assignForm.reason, $event) || (ctx_r1.assignForm.reason = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(36, "div", 94)(37, "button", 95);
    \u0275\u0275listener("click", function UserPermissionManagementComponent_div_48_Template_button_click_37_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeAssignDialog());
    });
    \u0275\u0275text(38, " H\u1EE7y ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "button", 96);
    \u0275\u0275template(40, UserPermissionManagementComponent_div_48_mat_spinner_40_Template, 1, 0, "mat-spinner", 97);
    \u0275\u0275text(41);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const picker_r18 = \u0275\u0275reference(31);
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.editingPermission() ? "Ch\u1EC9nh s\u1EEDa quy\u1EC1n" : "Th\xEAm quy\u1EC1n m\u1EDBi");
    \u0275\u0275advance(9);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.assignForm.permissionId);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r1.availablePermissions());
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.assignForm.isGranted);
    \u0275\u0275advance();
    \u0275\u0275property("value", true);
    \u0275\u0275advance(2);
    \u0275\u0275property("value", false);
    \u0275\u0275advance(5);
    \u0275\u0275property("matDatepicker", picker_r18);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.assignForm.expiresAt);
    \u0275\u0275advance();
    \u0275\u0275property("for", picker_r18);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.assignForm.reason);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", !ctx_r1.assignForm.permissionId || ctx_r1.isAssigning());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isAssigning());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.editingPermission() ? "C\u1EADp nh\u1EADt" : "Th\xEAm quy\u1EC1n", " ");
  }
}
var UserPermissionManagementComponent = class _UserPermissionManagementComponent {
  userPermissionService = inject(UserPermissionGraphQLService);
  permissionService = inject(PermissionGraphQLService);
  snackBar = inject(MatSnackBar);
  // Input - User ID to manage permissions for
  userId = input.required();
  // UI State
  isLoading = signal(false);
  error = signal(null);
  processingPermission = signal(null);
  showAssignDialog = signal(false);
  isAssigning = signal(false);
  editingPermission = signal(null);
  // Data
  userPermissions = signal([]);
  availablePermissions = signal([]);
  // Filters
  searchTerm = signal("");
  selectedType = signal("");
  selectedStatus = signal("");
  // Pagination
  pageSize = signal(10);
  currentPage = signal(0);
  totalCount = signal(0);
  // Assign form
  assignForm = {
    permissionId: "",
    isGranted: true,
    expiresAt: null,
    reason: ""
  };
  displayedColumns = ["permission", "type", "grantedBy", "grantedAt", "expiresAt", "reason", "actions"];
  // Computed properties
  displayedPermissions = computed(() => {
    let filtered = this.userPermissions();
    if (this.searchTerm()) {
      const search = this.searchTerm().toLowerCase();
      filtered = filtered.filter((up) => up.permission?.name?.toLowerCase().includes(search) || up.permission?.description?.toLowerCase().includes(search));
    }
    if (this.selectedType()) {
      const isGranted = this.selectedType() === "granted";
      filtered = filtered.filter((up) => up.isGranted === isGranted);
    }
    if (this.selectedStatus()) {
      const now = /* @__PURE__ */ new Date();
      if (this.selectedStatus() === "expired") {
        filtered = filtered.filter((up) => up.expiresAt && new Date(up.expiresAt) < now);
      } else if (this.selectedStatus() === "active") {
        filtered = filtered.filter((up) => !up.expiresAt || new Date(up.expiresAt) >= now);
      }
    }
    const start = this.currentPage() * this.pageSize();
    const end = start + this.pageSize();
    this.totalCount?.set(filtered.length);
    return filtered.slice(start, end);
  });
  statistics = computed(() => {
    const permissions = this.userPermissions();
    const now = /* @__PURE__ */ new Date();
    return {
      total: permissions.length,
      granted: permissions.filter((p) => p.isGranted).length,
      denied: permissions.filter((p) => !p.isGranted).length,
      expired: permissions.filter((p) => p.expiresAt && new Date(p.expiresAt) < now).length
    };
  });
  constructor() {
    effect(() => {
      if (this.userId()) {
        this.loadUserPermissions();
        this.loadAvailablePermissions();
      }
    });
  }
  loadUserPermissions() {
    return __async(this, null, function* () {
      if (!this.userId())
        return;
      try {
        this.isLoading.set(true);
        this.error.set(null);
        const result = yield this.userPermissionService.getUserPermissions(this.userId());
        this.userPermissions.set(result);
      } catch (error) {
        console.error("Error loading user permissions:", error);
        this.error.set("Kh\xF4ng th\u1EC3 t\u1EA3i danh s\xE1ch quy\u1EC1n");
      } finally {
        this.isLoading.set(false);
      }
    });
  }
  loadAvailablePermissions() {
    return __async(this, null, function* () {
      try {
        const permissions = yield this.permissionService.loadAllPermissions();
        this.availablePermissions.set(permissions);
      } catch (error) {
        console.error("Error loading available permissions:", error);
      }
    });
  }
  onSearchChange() {
    this.currentPage.set(0);
  }
  onPageChange(event) {
    this.currentPage.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }
  clearFilters() {
    this.searchTerm.set("");
    this.selectedType.set("");
    this.selectedStatus.set("");
    this.currentPage.set(0);
  }
  isExpired(expiresAt) {
    if (!expiresAt)
      return false;
    return new Date(expiresAt) < /* @__PURE__ */ new Date();
  }
  openAssignDialog() {
    this.editingPermission.set(null);
    this.resetAssignForm();
    this.showAssignDialog.set(true);
  }
  closeAssignDialog() {
    this.showAssignDialog.set(false);
    this.editingPermission.set(null);
    this.resetAssignForm();
  }
  editPermission(permission) {
    this.editingPermission.set(permission);
    this.assignForm = {
      permissionId: permission.permissionId,
      isGranted: permission.isGranted,
      expiresAt: permission.expiresAt ? new Date(permission.expiresAt) : null,
      reason: permission.reason || ""
    };
    this.showAssignDialog.set(true);
  }
  handleAssignPermission() {
    return __async(this, null, function* () {
      if (!this.userId() || !this.assignForm.permissionId)
        return;
      try {
        this.isAssigning.set(true);
        if (this.editingPermission()) {
          yield this.userPermissionService.updateUserPermission(this.editingPermission().id, {
            isGranted: this.assignForm.isGranted,
            grantedBy: "current-user",
            // TODO: Get current user ID
            expiresAt: this.assignForm.expiresAt || void 0,
            reason: this.assignForm.reason || void 0
          });
          this.snackBar.open("C\u1EADp nh\u1EADt quy\u1EC1n th\xE0nh c\xF4ng", "\u0110\xF3ng", { duration: 3e3 });
        } else {
          yield this.userPermissionService.assignPermissionToUser({
            userId: this.userId(),
            permissionId: this.assignForm.permissionId,
            isGranted: this.assignForm.isGranted,
            expiresAt: this.assignForm.expiresAt || void 0,
            reason: this.assignForm.reason || void 0,
            grantedBy: "current-user"
            // TODO: Get current user ID
          });
          this.snackBar.open("Th\xEAm quy\u1EC1n th\xE0nh c\xF4ng", "\u0110\xF3ng", { duration: 3e3 });
        }
        yield this.loadUserPermissions();
        this.closeAssignDialog();
      } catch (error) {
        console.error("Error assigning permission:", error);
        this.snackBar.open(error.message || "C\xF3 l\u1ED7i x\u1EA3y ra khi x\u1EED l\xFD quy\u1EC1n", "\u0110\xF3ng", { duration: 5e3 });
      } finally {
        this.isAssigning.set(false);
      }
    });
  }
  revokePermission(permission) {
    return __async(this, null, function* () {
      if (!confirm("B\u1EA1n c\xF3 ch\u1EAFc ch\u1EAFn mu\u1ED1n thu h\u1ED3i quy\u1EC1n n\xE0y kh\xF4ng?")) {
        return;
      }
      try {
        this.processingPermission.set(permission.id);
        yield this.userPermissionService.deleteUserPermission(permission.id);
        this.snackBar.open("Thu h\u1ED3i quy\u1EC1n th\xE0nh c\xF4ng", "\u0110\xF3ng", { duration: 3e3 });
        yield this.loadUserPermissions();
      } catch (error) {
        console.error("Error revoking permission:", error);
        this.snackBar.open(error.message || "C\xF3 l\u1ED7i x\u1EA3y ra khi thu h\u1ED3i quy\u1EC1n", "\u0110\xF3ng", { duration: 5e3 });
      } finally {
        this.processingPermission.set(null);
      }
    });
  }
  resetAssignForm() {
    this.assignForm = {
      permissionId: "",
      isGranted: true,
      expiresAt: null,
      reason: ""
    };
  }
  static \u0275fac = function UserPermissionManagementComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UserPermissionManagementComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UserPermissionManagementComponent, selectors: [["app-user-permission-management"]], inputs: { userId: [1, "userId"] }, decls: 49, vars: 9, consts: [["noExpiry", ""], ["actionMenu", "matMenu"], ["picker", ""], [1, "user-permission-management", "p-4"], [1, "header", "mb-4"], [1, "flex", "justify-between", "items-center"], [1, "text-xl", "font-bold"], ["mat-raised-button", "", "color", "primary", 3, "click", "disabled"], [1, "text-gray-600", "mt-2"], [1, "filters", "mb-4", "p-4", "bg-gray-50", "rounded"], [1, "grid", "grid-cols-1", "md:grid-cols-4", "gap-4"], ["appearance", "outline"], ["matInput", "", "placeholder", "T\xEAn quy\u1EC1n...", 3, "ngModelChange", "input", "ngModel"], ["matSuffix", ""], [3, "ngModelChange", "selectionChange", "ngModel"], ["value", ""], ["value", "granted"], ["value", "denied"], ["value", "active"], ["value", "expired"], [1, "flex", "items-end"], ["mat-stroked-button", "", 3, "click"], ["class", "text-center py-8", 4, "ngIf"], ["class", "table-container", 4, "ngIf"], ["class", "statistics mt-6 p-4 bg-blue-50 rounded", 4, "ngIf"], ["class", "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", 3, "click", 4, "ngIf"], [1, "text-center", "py-8"], [1, "mx-auto"], [1, "mt-4", "text-gray-600"], [1, "text-red-500", "text-4xl"], [1, "mt-2", "text-red-600"], ["mat-raised-button", "", "color", "primary", 1, "mt-4", 3, "click"], [1, "table-container"], ["mat-table", "", "matSort", "", 1, "w-full", 3, "dataSource"], ["matColumnDef", "permission"], ["mat-header-cell", "", "mat-sort-header", "", "class", "font-bold", 4, "matHeaderCellDef"], ["mat-cell", "", "class", "py-3", 4, "matCellDef"], ["matColumnDef", "type"], ["mat-header-cell", "", "class", "font-bold", 4, "matHeaderCellDef"], ["matColumnDef", "grantedBy"], ["matColumnDef", "grantedAt"], ["matColumnDef", "expiresAt"], ["matColumnDef", "reason"], ["mat-cell", "", "class", "py-3 max-w-xs", 4, "matCellDef"], ["matColumnDef", "actions"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 3, "opacity-50", 4, "matRowDef", "matRowDefColumns"], ["showFirstLastButtons", "", 3, "length", "pageSize", "pageSizeOptions", "page", 4, "ngIf"], ["mat-header-cell", "", "mat-sort-header", "", 1, "font-bold"], ["mat-cell", "", 1, "py-3"], [1, "flex", "flex-col"], [1, "font-medium"], [1, "text-sm", "text-gray-500"], ["mat-header-cell", "", 1, "font-bold"], [4, "ngIf", "ngIfElse"], ["class", "block text-xs text-red-500", 4, "ngIf"], [1, "block", "text-xs", "text-red-500"], [1, "text-green-600", "text-sm"], ["mat-cell", "", 1, "py-3", "max-w-xs"], [1, "text-sm", "text-gray-700", "line-clamp-2", 3, "title"], ["mat-icon-button", "", 3, "matMenuTriggerFor", "disabled"], [4, "ngIf"], ["diameter", "20", 4, "ngIf"], ["mat-menu-item", "", 3, "click"], ["mat-menu-item", "", 1, "text-red-600", 3, "click"], ["diameter", "20"], ["mat-header-row", ""], ["mat-row", ""], [1, "text-gray-400", "text-4xl"], [1, "mt-2", "text-gray-600"], ["showFirstLastButtons", "", 3, "page", "length", "pageSize", "pageSizeOptions"], [1, "statistics", "mt-6", "p-4", "bg-blue-50", "rounded"], [1, "font-semibold", "mb-2"], [1, "grid", "grid-cols-2", "md:grid-cols-4", "gap-4", "text-sm"], [1, "text-gray-600"], [1, "font-semibold", "ml-1"], [1, "font-semibold", "ml-1", "text-green-600"], [1, "font-semibold", "ml-1", "text-red-600"], [1, "font-semibold", "ml-1", "text-orange-600"], [1, "fixed", "inset-0", "bg-black", "bg-opacity-50", "flex", "items-center", "justify-center", "z-50", 3, "click"], [1, "bg-white", "rounded-lg", "p-6", "max-w-md", "w-full", "mx-4", 3, "click"], [1, "flex", "justify-between", "items-center", "mb-4"], [1, "text-lg", "font-semibold"], ["mat-icon-button", "", 3, "click"], [3, "ngSubmit"], [1, "space-y-4"], ["appearance", "outline", 1, "w-full"], ["name", "permissionId", "required", "", 3, "ngModelChange", "ngModel"], [3, "value", 4, "ngFor", "ngForOf"], ["name", "isGranted", "required", "", 3, "ngModelChange", "ngModel"], [3, "value"], ["matInput", "", "name", "expiresAt", 3, "ngModelChange", "matDatepicker", "ngModel"], ["matIconSuffix", "", 3, "for"], ["matInput", "", "name", "reason", "rows", "3", "placeholder", "Nh\u1EADp l\xFD do c\u1EA5p/t\u1EEB ch\u1ED1i quy\u1EC1n n\xE0y...", 3, "ngModelChange", "ngModel"], [1, "flex", "justify-end", "space-x-2", "mt-6"], ["type", "button", "mat-stroked-button", "", 3, "click"], ["type", "submit", "mat-raised-button", "", "color", "primary", 3, "disabled"], ["diameter", "20", "class", "mr-2", 4, "ngIf"], ["diameter", "20", 1, "mr-2"]], template: function UserPermissionManagementComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 3)(1, "div", 4)(2, "div", 5)(3, "h2", 6);
      \u0275\u0275text(4, "Qu\u1EA3n L\xFD Quy\u1EC1n \u0110\u1EB7c Bi\u1EC7t");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "button", 7);
      \u0275\u0275listener("click", function UserPermissionManagementComponent_Template_button_click_5_listener() {
        return ctx.openAssignDialog();
      });
      \u0275\u0275elementStart(6, "mat-icon");
      \u0275\u0275text(7, "add");
      \u0275\u0275elementEnd();
      \u0275\u0275text(8, " Th\xEAm Quy\u1EC1n ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "p", 8);
      \u0275\u0275text(10, " Qu\u1EA3n l\xFD c\xE1c quy\u1EC1n \u0111\u1EB7c bi\u1EC7t cho user n\xE0y (s\u1EBD ghi \u0111\xE8 quy\u1EC1n t\u1EEB roles) ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "div", 9)(12, "div", 10)(13, "mat-form-field", 11)(14, "mat-label");
      \u0275\u0275text(15, "T\xECm ki\u1EBFm quy\u1EC1n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "input", 12);
      \u0275\u0275twoWayListener("ngModelChange", function UserPermissionManagementComponent_Template_input_ngModelChange_16_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.searchTerm, $event) || (ctx.searchTerm = $event);
        return $event;
      });
      \u0275\u0275listener("input", function UserPermissionManagementComponent_Template_input_input_16_listener() {
        return ctx.onSearchChange();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "mat-icon", 13);
      \u0275\u0275text(18, "search");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(19, "mat-form-field", 11)(20, "mat-label");
      \u0275\u0275text(21, "Lo\u1EA1i quy\u1EC1n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "mat-select", 14);
      \u0275\u0275twoWayListener("ngModelChange", function UserPermissionManagementComponent_Template_mat_select_ngModelChange_22_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.selectedType, $event) || (ctx.selectedType = $event);
        return $event;
      });
      \u0275\u0275listener("selectionChange", function UserPermissionManagementComponent_Template_mat_select_selectionChange_22_listener() {
        return ctx.loadUserPermissions();
      });
      \u0275\u0275elementStart(23, "mat-option", 15);
      \u0275\u0275text(24, "T\u1EA5t c\u1EA3");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "mat-option", 16);
      \u0275\u0275text(26, "\u0110\u01B0\u1EE3c c\u1EA5p");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "mat-option", 17);
      \u0275\u0275text(28, "B\u1ECB t\u1EEB ch\u1ED1i");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(29, "mat-form-field", 11)(30, "mat-label");
      \u0275\u0275text(31, "Tr\u1EA1ng th\xE1i");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "mat-select", 14);
      \u0275\u0275twoWayListener("ngModelChange", function UserPermissionManagementComponent_Template_mat_select_ngModelChange_32_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.selectedStatus, $event) || (ctx.selectedStatus = $event);
        return $event;
      });
      \u0275\u0275listener("selectionChange", function UserPermissionManagementComponent_Template_mat_select_selectionChange_32_listener() {
        return ctx.loadUserPermissions();
      });
      \u0275\u0275elementStart(33, "mat-option", 15);
      \u0275\u0275text(34, "T\u1EA5t c\u1EA3");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(35, "mat-option", 18);
      \u0275\u0275text(36, "Ho\u1EA1t \u0111\u1ED9ng");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "mat-option", 19);
      \u0275\u0275text(38, "\u0110\xE3 h\u1EBFt h\u1EA1n");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(39, "div", 20)(40, "button", 21);
      \u0275\u0275listener("click", function UserPermissionManagementComponent_Template_button_click_40_listener() {
        return ctx.clearFilters();
      });
      \u0275\u0275elementStart(41, "mat-icon");
      \u0275\u0275text(42, "clear");
      \u0275\u0275elementEnd();
      \u0275\u0275text(43, " X\xF3a b\u1ED9 l\u1ECDc ");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275template(44, UserPermissionManagementComponent_div_44_Template, 4, 0, "div", 22)(45, UserPermissionManagementComponent_div_45_Template, 7, 1, "div", 22)(46, UserPermissionManagementComponent_div_46_Template, 27, 5, "div", 23)(47, UserPermissionManagementComponent_div_47_Template, 24, 4, "div", 24);
      \u0275\u0275elementEnd();
      \u0275\u0275template(48, UserPermissionManagementComponent_div_48_Template, 42, 13, "div", 25);
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275property("disabled", !ctx.userId() || ctx.isLoading());
      \u0275\u0275advance(11);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchTerm);
      \u0275\u0275advance(6);
      \u0275\u0275twoWayProperty("ngModel", ctx.selectedType);
      \u0275\u0275advance(10);
      \u0275\u0275twoWayProperty("ngModel", ctx.selectedStatus);
      \u0275\u0275advance(12);
      \u0275\u0275property("ngIf", ctx.isLoading());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.error());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isLoading() && !ctx.error());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isLoading() && !ctx.error());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.showAssignDialog());
    }
  }, dependencies: [
    CommonModule,
    NgForOf,
    NgIf,
    DatePipe,
    FormsModule,
    \u0275NgNoValidate,
    DefaultValueAccessor,
    NgControlStatus,
    NgControlStatusGroup,
    RequiredValidator,
    NgModel,
    NgForm,
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatSuffix,
    MatInputModule,
    MatInput,
    MatButtonModule,
    MatButton,
    MatIconButton,
    MatIconModule,
    MatIcon,
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
    MatSelectModule,
    MatSelect,
    MatOption,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatNativeDateModule,
    MatMenuModule,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatProgressSpinner
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UserPermissionManagementComponent, { className: "UserPermissionManagementComponent", filePath: "src/app/admin/user-permission/user-permission-management.component.ts", lineNumber: 322 });
})();
export {
  UserPermissionManagementComponent
};
//# sourceMappingURL=chunk-GJUGZST7.js.map
