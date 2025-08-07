import './polyfills.server.mjs';
import {
  lookup
} from "./chunk-BMDXMCXP.mjs";
import {
  openDB
} from "./chunk-CXFG5YDN.mjs";
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
  MatSortHeader,
  MatSortModule,
  MatTable,
  MatTableDataSource,
  MatTableModule,
  MatTooltip,
  MatTooltipModule
} from "./chunk-DWV2CVG4.mjs";
import {
  removeVietnameseAccents
} from "./chunk-RGTCKLO2.mjs";
import {
  MatDrawer,
  MatDrawerContainer,
  MatSidenavModule
} from "./chunk-GOLLTURE.mjs";
import {
  MatSelectModule
} from "./chunk-Z7QVUZWX.mjs";
import {
  ConvertDriveData
} from "./chunk-I23Q342N.mjs";
import {
  MatMenu,
  MatMenuItem,
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
  MatPrefix,
  NgControlStatus,
  NgModel
} from "./chunk-BTD2ENWJ.mjs";
import {
  environment
} from "./chunk-QFPTY5IH.mjs";
import {
  MatSnackBar,
  StorageService
} from "./chunk-A6W66WDU.mjs";
import {
  MatButton,
  MatButtonModule,
  MatIconButton
} from "./chunk-2QXHUJNF.mjs";
import {
  BreakpointObserver,
  Breakpoints
} from "./chunk-7GJ6SLXG.mjs";
import {
  Router,
  RouterOutlet
} from "./chunk-PLFAEF4K.mjs";
import {
  CommonModule,
  DatePipe,
  NgForOf,
  NgIf
} from "./chunk-H3GF4RFC.mjs";
import {
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵclassMapInterpolate1,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpropertyInterpolate1,
  ɵɵpureFunction0,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
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
} from "./chunk-4EQURZBD.mjs";
import {
  __async,
  __spreadValues
} from "./chunk-FMEBT56H.mjs";

// src/app/admin/nhomkhachhang/nhomkhachhang.service.ts
var NhomkhachhangService = class _NhomkhachhangService {
  _StorageService;
  router;
  constructor(_StorageService, router) {
    this._StorageService = _StorageService;
    this.router = router;
  }
  ListNhomkhachhang = signal([]);
  DetailNhomkhachhang = signal({});
  nhomkhachhangId = signal(null);
  setNhomkhachhangId(id) {
    this.nhomkhachhangId.set(id);
  }
  socket = lookup(`${environment.APIURL}`, {
    transports: ["websocket", "polling"],
    // Thêm polling để fallback
    reconnectionAttempts: 5,
    // Giới hạn reconnect nếu fail
    timeout: 5e3
    // Timeout 5s
  });
  addKHtoNhom(dulieu) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(dulieu)
        };
        const response = yield fetch(`${environment.APIURL}/nhomkhachhang/addKHtoNhom`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        if (!response.ok) {
        }
      } catch (error) {
        return console.error(error);
      }
    });
  }
  removeKHfromNhom(dulieu) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(dulieu)
        };
        const response = yield fetch(`${environment.APIURL}/nhomkhachhang/removeKHfromNhom`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        if (!response.ok) {
        }
      } catch (error) {
        return console.error(error);
      }
    });
  }
  CreateNhomkhachhang(dulieu) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(dulieu)
        };
        const response = yield fetch(`${environment.APIURL}/nhomkhachhang`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        if (!response.ok) {
        }
        this.getAllNhomkhachhang();
        this.nhomkhachhangId.set(data.id);
      } catch (error) {
        return console.error(error);
      }
    });
  }
  getAllNhomkhachhang() {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this._StorageService.getItem("token")
          }
        };
        const response = yield fetch(`${environment.APIURL}/nhomkhachhang`, options);
        if (!response.ok) {
        }
        const data = yield response.json();
        this.ListNhomkhachhang.set(data);
      } catch (error) {
        return console.error(error);
      }
    });
  }
  // 3️⃣ Lắng nghe cập nhật từ WebSocket
  listenNhomkhachhangUpdates() {
    this.socket.on("nhomkhachhang-updated", () => __async(this, null, function* () {
      console.log("\u{1F504} D\u1EEF li\u1EC7u s\u1EA3n ph\u1EA9m thay \u0111\u1ED5i, c\u1EADp nh\u1EADt l\u1EA1i cache...");
      yield this.getAllNhomkhachhang();
    }));
  }
  // Khởi tạo IndexedDB
  initDB() {
    return __async(this, null, function* () {
      return yield openDB("NhomkhachhangDB", 1, {
        upgrade(db) {
          db.createObjectStore("nhomkhachhangs", { keyPath: "id" });
        }
      });
    });
  }
  getNhomkhachhangByid(id) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        };
        const response = yield fetch(`${environment.APIURL}/nhomkhachhang/findid/${id}`, options);
        if (!response.ok) {
          if (response.status === 401) {
            const result = JSON.stringify({ code: response.status, title: "Vui l\xF2ng \u0111\u0103ng nh\u1EADp l\u1EA1i" });
            this.router.navigate(["/errorserver"], { queryParams: { data: result } });
          } else if (response.status === 403) {
            const result = JSON.stringify({ code: response.status, title: "B\u1EA1n kh\xF4ng c\xF3 quy\u1EC1n truy c\u1EADp" });
            this.router.navigate(["/errorserver"], { queryParams: { data: result } });
          } else if (response.status === 500) {
            const result = JSON.stringify({ code: response.status, title: "L\u1ED7i m\xE1y ch\u1EE7, vui l\xF2ng th\u1EED l\u1EA1i sau" });
            this.router.navigate(["/errorserver"], { queryParams: { data: result } });
          } else {
            const result = JSON.stringify({ code: response.status, title: "L\u1ED7i kh\xF4ng x\xE1c \u0111\u1ECBnh" });
            this.router.navigate(["/errorserver"], { queryParams: { data: result } });
          }
        }
        const data = yield response.json();
        this.DetailNhomkhachhang.set(data);
      } catch (error) {
        return console.error(error);
      }
    });
  }
  updateNhomkhachhang(dulieu) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(dulieu)
        };
        const response = yield fetch(`${environment.APIURL}/nhomkhachhang/${dulieu.id}`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        if (!response.ok) {
        }
        this.getAllNhomkhachhang();
        this.getNhomkhachhangByid(dulieu.id);
      } catch (error) {
        return console.error(error);
      }
    });
  }
  DeleteNhomkhachhang(item) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        };
        const response = yield fetch(`${environment.APIURL}/nhomkhachhang/${item.id}`, options);
        if (!response.ok) {
          if (response.status === 401) {
            const result = JSON.stringify({ code: response.status, title: "Vui l\xF2ng \u0111\u0103ng nh\u1EADp l\u1EA1i" });
            this.router.navigate(["/errorserver"], { queryParams: { data: result } });
          } else if (response.status === 403) {
            const result = JSON.stringify({ code: response.status, title: "B\u1EA1n kh\xF4ng c\xF3 quy\u1EC1n truy c\u1EADp" });
            this.router.navigate(["/errorserver"], { queryParams: { data: result } });
          } else if (response.status === 500) {
            const result = JSON.stringify({ code: response.status, title: "L\u1ED7i m\xE1y ch\u1EE7, vui l\xF2ng th\u1EED l\u1EA1i sau" });
            this.router.navigate(["/errorserver"], { queryParams: { data: result } });
          } else {
            const result = JSON.stringify({ code: response.status, title: "L\u1ED7i kh\xF4ng x\xE1c \u0111\u1ECBnh" });
            this.router.navigate(["/errorserver"], { queryParams: { data: result } });
          }
        }
        this.getAllNhomkhachhang();
      } catch (error) {
        return console.error(error);
      }
    });
  }
  static \u0275fac = function NhomkhachhangService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NhomkhachhangService)(\u0275\u0275inject(StorageService), \u0275\u0275inject(Router));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _NhomkhachhangService, factory: _NhomkhachhangService.\u0275fac, providedIn: "root" });
};

// src/app/admin/nhomkhachhang/listnhomkhachhang/listnhomkhachhang.component.ts
var _c0 = ["drawer"];
var _c1 = () => [5, 10, 25, 100];
var _c2 = () => ({ standalone: true });
var _forTrack0 = ($index, $item) => $item.key;
function ListNhomkhachhangComponent_For_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 32);
    \u0275\u0275listener("click", function ListNhomkhachhangComponent_For_24_Template_button_click_0_listener($event) {
      const item_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      ctx_r3.toggleColumn(item_r3);
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
    const item_r3 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r3.isShow ? "check_box" : "check_box_outline_blank");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r3.value);
  }
}
function ListNhomkhachhangComponent_div_41_mat_form_field_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-form-field", 35)(1, "mat-label");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 36);
    \u0275\u0275listener("keyup", function ListNhomkhachhangComponent_div_41_mat_form_field_1_Template_input_keyup_3_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.applyFilter());
    });
    \u0275\u0275twoWayListener("ngModelChange", function ListNhomkhachhangComponent_div_41_mat_form_field_1_Template_input_ngModelChange_3_listener($event) {
      const column_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r3.filterValues[column_r7], $event) || (ctx_r3.filterValues[column_r7] = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const column_r7 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.ColumnName[column_r7]);
    \u0275\u0275advance();
    \u0275\u0275propertyInterpolate1("placeholder", "Vui l\xF2ng Nh\u1EADp ", column_r7, "");
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.filterValues[column_r7]);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(5, _c2));
  }
}
function ListNhomkhachhangComponent_div_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33);
    \u0275\u0275template(1, ListNhomkhachhangComponent_div_41_mat_form_field_1_Template, 4, 6, "mat-form-field", 34);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r3.displayedColumns);
  }
}
function ListNhomkhachhangComponent_For_45_th_1_For_24_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 56);
    \u0275\u0275text(1, "check");
    \u0275\u0275elementEnd();
  }
}
function ListNhomkhachhangComponent_For_45_th_1_For_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 54);
    \u0275\u0275listener("click", function ListNhomkhachhangComponent_For_45_th_1_For_24_Template_div_click_0_listener() {
      const item_r11 = \u0275\u0275restoreView(_r10).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.ChosenItem(item_r11));
    });
    \u0275\u0275template(1, ListNhomkhachhangComponent_For_45_th_1_For_24_span_1_Template, 2, 0, "span", 55);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r11 = ctx.$implicit;
    const column_r9 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r3.CheckItem(item_r11));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r11[column_r9] || "Tr\u1ED1ng", " ");
  }
}
function ListNhomkhachhangComponent_For_45_th_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "th", 39)(1, "span", 40);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 41, 3);
    \u0275\u0275text(5, " filter_alt ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "mat-menu", null, 1)(8, "div", 42);
    \u0275\u0275listener("click", function ListNhomkhachhangComponent_For_45_th_1_Template_div_click_8_listener($event) {
      \u0275\u0275restoreView(_r8);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(9, "div", 43)(10, "input", 44);
    \u0275\u0275listener("keyup", function ListNhomkhachhangComponent_For_45_th_1_Template_input_keyup_10_listener($event) {
      \u0275\u0275restoreView(_r8);
      const column_r9 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.doFilterHederColumn($event, column_r9));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 45)(12, "span", 46);
    \u0275\u0275text(13, "search");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "div", 47)(15, "div", 8)(16, "span", 48);
    \u0275\u0275listener("click", function ListNhomkhachhangComponent_For_45_th_1_Template_span_click_16_listener() {
      \u0275\u0275restoreView(_r8);
      const column_r9 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.ChosenAll(ctx_r3.FilterHederColumn(ctx_r3.dataSource.filteredData, column_r9)));
    });
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "span", 48);
    \u0275\u0275listener("click", function ListNhomkhachhangComponent_For_45_th_1_Template_span_click_18_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.EmptyFiter());
    });
    \u0275\u0275text(19, "Xo\xE1");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "span", 48);
    \u0275\u0275listener("click", function ListNhomkhachhangComponent_For_45_th_1_Template_span_click_20_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.ResetFilter());
    });
    \u0275\u0275text(21, "Reset");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 49);
    \u0275\u0275repeaterCreate(23, ListNhomkhachhangComponent_For_45_th_1_For_24_Template, 3, 2, "div", 50, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "div", 51)(26, "button", 52);
    \u0275\u0275listener("click", function ListNhomkhachhangComponent_For_45_th_1_Template_button_click_26_listener() {
      \u0275\u0275restoreView(_r8);
      const menuTrigger_r12 = \u0275\u0275reference(4);
      return \u0275\u0275resetView(menuTrigger_r12.closeMenu());
    });
    \u0275\u0275text(27, "\u0110\xF3ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "button", 53);
    \u0275\u0275listener("click", function ListNhomkhachhangComponent_For_45_th_1_Template_button_click_28_listener() {
      \u0275\u0275restoreView(_r8);
      const menuTrigger_r12 = \u0275\u0275reference(4);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.ApplyFilterColum(menuTrigger_r12));
    });
    \u0275\u0275text(29, "\xC1p D\u1EE5ng");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const menu_r13 = \u0275\u0275reference(7);
    const column_r9 = \u0275\u0275nextContext().$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r3.ColumnName[column_r9], " ");
    \u0275\u0275advance();
    \u0275\u0275property("matMenuTriggerFor", menu_r13);
    \u0275\u0275advance(14);
    \u0275\u0275textInterpolate1("Ch\u1ECDn T\u1EA5t C\u1EA3 ", ctx_r3.FilterHederColumn(ctx_r3.dataSource.filteredData, column_r9).length || 0, "");
    \u0275\u0275advance(6);
    \u0275\u0275repeater(ctx_r3.FilterHederColumn(ctx_r3.dataSource.filteredData, column_r9));
  }
}
function ListNhomkhachhangComponent_For_45_td_2_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 58);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const idx_r14 = \u0275\u0275nextContext().index;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", idx_r14 + 1, " ");
  }
}
function ListNhomkhachhangComponent_For_45_td_2_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 59);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r15 = \u0275\u0275nextContext().$implicit;
    const column_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r15[column_r9], "HH:mm:ss dd/MM/yyyy"), " ");
  }
}
function ListNhomkhachhangComponent_For_45_td_2_Case_3_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 60);
    \u0275\u0275text(1, "check_circle");
    \u0275\u0275elementEnd();
  }
}
function ListNhomkhachhangComponent_For_45_td_2_Case_3_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 61);
    \u0275\u0275text(1, "cancel");
    \u0275\u0275elementEnd();
  }
}
function ListNhomkhachhangComponent_For_45_td_2_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 58);
    \u0275\u0275template(1, ListNhomkhachhangComponent_For_45_td_2_Case_3_Conditional_1_Template, 2, 0, "mat-icon", 60)(2, ListNhomkhachhangComponent_For_45_td_2_Case_3_Conditional_2_Template, 2, 0, "mat-icon", 61);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r15 = \u0275\u0275nextContext().$implicit;
    const column_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(row_r15[column_r9] ? 1 : 2);
  }
}
function ListNhomkhachhangComponent_For_45_td_2_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 59);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r15 = \u0275\u0275nextContext().$implicit;
    const column_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r15[column_r9], "HH:mm:ss dd/MM/yyyy"), " ");
  }
}
function ListNhomkhachhangComponent_For_45_td_2_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 58);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r15 = \u0275\u0275nextContext().$implicit;
    const column_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r15[column_r9], " ");
  }
}
function ListNhomkhachhangComponent_For_45_td_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 57);
    \u0275\u0275template(1, ListNhomkhachhangComponent_For_45_td_2_Case_1_Template, 2, 1, "span", 58)(2, ListNhomkhachhangComponent_For_45_td_2_Case_2_Template, 3, 4, "span", 59)(3, ListNhomkhachhangComponent_For_45_td_2_Case_3_Template, 3, 1, "span", 58)(4, ListNhomkhachhangComponent_For_45_td_2_Case_4_Template, 3, 4, "span", 59)(5, ListNhomkhachhangComponent_For_45_td_2_Case_5_Template, 2, 1, "span", 58);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_16_0;
    const column_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_16_0 = column_r9) === "STT" ? 1 : tmp_16_0 === "createdAt" ? 2 : tmp_16_0 === "isActive" ? 3 : tmp_16_0 === "updatedAt" ? 4 : 5);
  }
}
function ListNhomkhachhangComponent_For_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0, 27);
    \u0275\u0275template(1, ListNhomkhachhangComponent_For_45_th_1_Template, 30, 3, "th", 37)(2, ListNhomkhachhangComponent_For_45_td_2_Template, 6, 1, "td", 38);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const column_r9 = ctx.$implicit;
    \u0275\u0275property("matColumnDef", column_r9);
  }
}
function ListNhomkhachhangComponent_tr_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 62);
  }
}
function ListNhomkhachhangComponent_tr_47_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 63);
    \u0275\u0275listener("click", function ListNhomkhachhangComponent_tr_47_Template_tr_click_0_listener() {
      const row_r17 = \u0275\u0275restoreView(_r16).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.goToDetail(row_r17));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r17 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275classMapInterpolate1("hover:bg-slate-100 ", ctx_r3.nhomkhachhangId() == row_r17.id ? "!bg-slate-200" : "", "");
  }
}
function ListNhomkhachhangComponent_tr_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 64)(1, "td", 65);
    \u0275\u0275text(2, "Kh\xF4ng t\xECm th\u1EA5y");
    \u0275\u0275elementEnd()();
  }
}
var ListNhomkhachhangComponent = class _ListNhomkhachhangComponent {
  Detail = {};
  displayedColumns = [
    "name",
    "description",
    "createdAt",
    "updatedAt"
  ];
  ColumnName = {
    name: "Nh\xF3m Kh\xE1ch h\xE0ng",
    description: "M\xF4 T\u1EA3",
    createdAt: "Ng\xE0y T\u1EA1o",
    updatedAt: "Ng\xE0y C\u1EADp Nh\u1EADt"
  };
  FilterColumns = JSON.parse(localStorage.getItem("NhomkhachhangColFilter") || "[]");
  Columns = [];
  isFilter = false;
  paginator;
  sort;
  drawer;
  filterValues = {};
  _NhomkhachhangService = inject(NhomkhachhangService);
  _breakpointObserver = inject(BreakpointObserver);
  _GoogleSheetService = inject(GoogleSheetService);
  _router = inject(Router);
  Listnhomkhachhang = this._NhomkhachhangService.ListNhomkhachhang;
  dataSource = new MatTableDataSource([]);
  nhomkhachhangId = this._NhomkhachhangService.nhomkhachhangId;
  _snackBar = inject(MatSnackBar);
  CountItem = 0;
  constructor() {
    this.displayedColumns.forEach((column) => {
      this.filterValues[column] = "";
    });
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
  applyFilter() {
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }
  ngOnInit() {
    return __async(this, null, function* () {
      yield this._NhomkhachhangService.getAllNhomkhachhang();
      this.CountItem = this.Listnhomkhachhang().length;
      this.dataSource = new MatTableDataSource(this.Listnhomkhachhang());
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = this.createFilter();
      this.initializeColumns();
      this.setupDrawer();
      this.paginator._intl.itemsPerPageLabel = "S\u1ED1 l\u01B0\u1EE3ng 1 trang";
      this.paginator._intl.nextPageLabel = "Ti\u1EBFp Theo";
      this.paginator._intl.previousPageLabel = "V\u1EC1 Tr\u01B0\u1EDBc";
      this.paginator._intl.firstPageLabel = "Trang \u0110\u1EA7u";
      this.paginator._intl.lastPageLabel = "Trang Cu\u1ED1i";
    });
  }
  refresh() {
    return __async(this, null, function* () {
      yield this._NhomkhachhangService.getAllNhomkhachhang();
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
      localStorage.setItem("NhomkhachhangColFilter", JSON.stringify(this.FilterColumns));
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
    this.dataSource.filteredData = this.Listnhomkhachhang().filter((v) => removeVietnameseAccents(v[column]).includes(event.target.value.toLowerCase()) || v[column].toLowerCase().includes(event.target.value.toLowerCase()));
    const query = event.target.value.toLowerCase();
    console.log(query, column);
    console.log(this.dataSource.filteredData);
  }
  ListFilter = [];
  ChosenItem(item) {
    if (this.ListFilter.includes(item.id)) {
      this.ListFilter = this.ListFilter.filter((v) => v !== item.id);
    } else {
      this.ListFilter.push(item.id);
    }
    console.log(this.ListFilter);
  }
  ChosenAll(list) {
    list.forEach((v) => {
      if (this.ListFilter.includes(v.id)) {
        this.ListFilter = this.ListFilter.filter((v2) => v2 !== v2.id);
      } else {
        this.ListFilter.push(v.id);
      }
    });
  }
  ResetFilter() {
    this.ListFilter = this.Listnhomkhachhang().map((v) => v.id);
    this.dataSource.data = this.Listnhomkhachhang();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  EmptyFiter() {
    this.ListFilter = [];
  }
  CheckItem(item) {
    return this.ListFilter.includes(item.id);
  }
  ApplyFilterColum(menu) {
    this.dataSource.data = this.Listnhomkhachhang().filter((v) => this.ListFilter.includes(v.id));
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log(this.dataSource.data);
    menu.closeMenu();
  }
  updateDisplayedColumns() {
    this.displayedColumns = this.FilterColumns.filter((v) => v.isShow).map((item) => item.key);
    this.ColumnName = this.FilterColumns.reduce((obj, item) => {
      if (item.isShow)
        obj[item.key] = item.value;
      return obj;
    }, {});
    localStorage.setItem("NhomkhachhangColFilter", JSON.stringify(this.FilterColumns));
  }
  doFilterColumns(event) {
    const query = event.target.value.toLowerCase();
    this.FilterColumns = this.Columns.filter((v) => v.value.toLowerCase().includes(query));
  }
  create() {
    this.drawer.open();
    this._router.navigate(["admin/nhomkhachhang", 0]);
  }
  goToDetail(item) {
    this._NhomkhachhangService.setNhomkhachhangId(item.id);
    this.drawer.open();
    this._router.navigate(["admin/nhomkhachhang", item.id]);
  }
  LoadDrive() {
    return __async(this, null, function* () {
      const DriveInfo = {
        IdSheet: "15npo25qyH5FmfcEjl1uyqqyFMS_vdFnmxM_kt0KYmZk",
        SheetName: "NCCImport",
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
      name: v.name?.trim() || "",
      mancc: v.mancc?.trim() || "",
      sdt: v.sdt?.trim() || "",
      diachi: v.diachi?.trim() || "",
      ghichu: v.ghichu?.trim() || ""
    }));
    const uniqueData = transformedData.filter((value, index, self) => index === self.findIndex((t) => t.mancc === value.mancc));
    const listId2 = uniqueData.map((v) => v.mancc);
    const listId1 = this._NhomkhachhangService.ListNhomkhachhang().map((v) => v.mancc);
    const listId3 = listId2.filter((item) => !listId1.includes(item));
    const createuppdateitem = uniqueData.map((v) => __async(this, null, function* () {
      const item = this._NhomkhachhangService.ListNhomkhachhang().find((v1) => v1.mancc === v.mancc);
      if (item) {
        const item1 = __spreadValues(__spreadValues({}, item), v);
        yield this._NhomkhachhangService.updateNhomkhachhang(item1);
      } else {
        yield this._NhomkhachhangService.CreateNhomkhachhang(v);
      }
    }));
    const disableItem = listId3.map((v) => __async(this, null, function* () {
      const item = this._NhomkhachhangService.ListNhomkhachhang().find((v1) => v1.mancc === v);
      item.isActive = false;
      yield this._NhomkhachhangService.updateNhomkhachhang(item);
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
    writeExcelFile(data, title);
  }
  static \u0275fac = function ListNhomkhachhangComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ListNhomkhachhangComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ListNhomkhachhangComponent, selectors: [["app-listnhomkhachhang"]], viewQuery: function ListNhomkhachhangComponent_Query(rf, ctx) {
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
  }, decls: 50, vars: 12, consts: [["drawer", ""], ["menu", "matMenu"], ["uploadfile", ""], ["menuTrigger", "matMenuTrigger"], ["autosize", "", 1, "w-full", "h-full"], ["mode", "over", 1, "flex", "flex-col", "lg:!w-1/2", "!w-full", "h-full", 3, "position"], [1, "flex", "flex-col", "space-y-2", "h-screen-12", "w-full", "p-2"], [1, "cursor-pointer", "w-full", "relative", "flex", "lg:flex-row", "lg:space-y-2", "space-y-0", "flex-col", "space-x-2", "justify-between", "items-center", "p-2", "bg-white", "rounded-lg"], [1, "flex", "flex-row", "space-x-2", "items-center"], ["matTooltip", "Th\xEAm m\u1EDBi", "mat-flat-button", "", 1, "flex", "flex-row", "items-center", "btn-primary", 3, "click"], [1, "whitespace-nowrap"], ["matTooltip", "\u1EA8n hi\u1EC7n c\u1ED9t", "mat-icon-button", "", "color", "primary", "aria-label", "Example icon-button with a menu", 3, "matMenuTriggerFor"], [1, "p-4"], ["appearance", "outline", "subscriptSizing", "dynamic", 1, "w-full"], ["matInput", "", "placeholder", "T\xECm Ki\u1EBFm", 3, "input", "click"], ["matPrefix", ""], [1, "flex", "flex-col", "max-h-80", "overflow-auto"], ["mat-menu-item", ""], ["matTooltip", "B\u1ED9 L\u1ECDc", "color", "primary", "mat-icon-button", "", 3, "click"], ["matTooltip", "T\u1EA3i file excel M\u1EABu", "color", "primary", "mat-icon-button", "", 3, "click"], ["matTooltip", "T\u1EA3i l\xEAn file excel", "color", "primary", "mat-icon-button", "", 3, "click"], ["type", "file", 1, "hidden", 3, "change"], ["matTooltip", "T\u1EA3i d\u1EEF li\u1EC7u t\u1EEB drive", "color", "primary", "mat-icon-button", "", 3, "click"], [1, "lg:flex", "hidden", "whitespace-nowrap", "p-2", "rounded-lg", "bg-slate-200"], ["class", "w-full grid grid-cols-2 gap-2 lg:flex lg:flex-row lg:space-x-2 items-center", 4, "ngIf"], [1, "w-full", "overflow-auto"], ["mat-table", "", "matSort", "", 1, "!border", "w-full", "cursor-pointer", 3, "dataSource"], [3, "matColumnDef"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 3, "class", "click", 4, "matRowDef", "matRowDefColumns"], ["class", "mat-row", 4, "matNoDataRow"], [3, "pageSizeOptions"], ["mat-menu-item", "", 3, "click"], [1, "w-full", "grid", "grid-cols-2", "gap-2", "lg:flex", "lg:flex-row", "lg:space-x-2", "items-center"], ["appearance", "outline", "subscriptSizing", "dynamic", 4, "ngFor", "ngForOf"], ["appearance", "outline", "subscriptSizing", "dynamic"], ["matInput", "", 3, "keyup", "ngModelChange", "ngModel", "ngModelOptions", "placeholder"], ["class", "whitespace-nowrap", "mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["mat-header-cell", "", "mat-sort-header", "", 1, "whitespace-nowrap"], [1, "max-w-40", "line-clamp-4", "me-4"], [1, "z-10", "material-symbols-outlined", "text-gray-500", 3, "matMenuTriggerFor"], [1, "cursor-pointer", "flex", "flex-col", "space-y-4", "p-3", 3, "click"], [1, "relative", "w-full"], ["type", "text", "placeholder", "T\xECm Ki\u1EBFm...", 1, "block", "w-full", "pl-10", "pr-4", "py-2", "text-gray-700", "bg-white", "border", "border-gray-300", "rounded-lg", "focus:border-blue-400", "focus:ring-blue-400", "focus:outline-none", "focus:ring", "focus:ring-opacity-40", 3, "keyup"], [1, "absolute", "inset-y-0", "left-0", "flex", "items-center", "pl-3", "pointer-events-none"], [1, "material-symbols-outlined", "text-gray-500"], [1, "flex", "flex-row", "space-x-2", "items-center", "justify-between"], [1, "text-xs", "text-blue-600", "underline", 3, "click"], [1, "w-full", "flex", "flex-col", "space-y-2", "max-h-44", "overflow-auto"], [1, "flex", "flex-row", "space-x-2", "items-center", "p-2", "rounded-lg", "hover:bg-slate-100"], [1, "flex", "flex-row", "space-x-2", "items-end", "justify-end"], ["mat-flat-button", "", "color", "warn", 3, "click"], ["mat-flat-button", "", "color", "primary", 3, "click"], [1, "flex", "flex-row", "space-x-2", "items-center", "p-2", "rounded-lg", "hover:bg-slate-100", 3, "click"], ["class", "material-symbols-outlined text-blue-600", 4, "ngIf"], [1, "material-symbols-outlined", "text-blue-600"], ["mat-cell", ""], [1, "max-w-40", "line-clamp-4"], [1, "max-w-40", "line-clamp-4", "text-xs"], [1, "text-green-500"], [1, "text-red-500"], ["mat-header-row", ""], ["mat-row", "", 3, "click"], [1, "mat-row"], ["colspan", "4", 1, "mat-cell", "p-4"]], template: function ListNhomkhachhangComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "mat-drawer-container", 4)(1, "mat-drawer", 5, 0);
      \u0275\u0275element(3, "router-outlet");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 6)(5, "div", 7)(6, "div", 8)(7, "button", 9);
      \u0275\u0275listener("click", function ListNhomkhachhangComponent_Template_button_click_7_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.create());
      });
      \u0275\u0275elementStart(8, "mat-icon");
      \u0275\u0275text(9, "add_circle");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "span", 10);
      \u0275\u0275text(11, "T\u1EA1o M\u1EDBi");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(12, "button", 11)(13, "mat-icon");
      \u0275\u0275text(14, "tune");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(15, "mat-menu", null, 1)(17, "div", 12)(18, "mat-form-field", 13)(19, "input", 14);
      \u0275\u0275listener("input", function ListNhomkhachhangComponent_Template_input_input_19_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.doFilterColumns($event));
      })("click", function ListNhomkhachhangComponent_Template_input_click_19_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView($event.stopPropagation());
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "mat-icon", 15);
      \u0275\u0275text(21, "search");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(22, "div", 16);
      \u0275\u0275repeaterCreate(23, ListNhomkhachhangComponent_For_24_Template, 5, 2, "button", 17, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(25, "button", 18);
      \u0275\u0275listener("click", function ListNhomkhachhangComponent_Template_button_click_25_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.isFilter = !ctx.isFilter);
      });
      \u0275\u0275elementStart(26, "mat-icon");
      \u0275\u0275text(27, "filter_list");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(28, "button", 19);
      \u0275\u0275listener("click", function ListNhomkhachhangComponent_Template_button_click_28_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.ExportExcel(ctx.Listnhomkhachhang(), "Nhomkhachhang"));
      });
      \u0275\u0275elementStart(29, "mat-icon");
      \u0275\u0275text(30, "file_download");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(31, "button", 20);
      \u0275\u0275listener("click", function ListNhomkhachhangComponent_Template_button_click_31_listener() {
        \u0275\u0275restoreView(_r1);
        const uploadfile_r5 = \u0275\u0275reference(35);
        return \u0275\u0275resetView(uploadfile_r5.click());
      });
      \u0275\u0275elementStart(32, "mat-icon");
      \u0275\u0275text(33, "file_upload");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(34, "input", 21, 2);
      \u0275\u0275listener("change", function ListNhomkhachhangComponent_Template_input_change_34_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.ImporExcel($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "button", 22);
      \u0275\u0275listener("click", function ListNhomkhachhangComponent_Template_button_click_36_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.LoadDrive());
      });
      \u0275\u0275elementStart(37, "mat-icon");
      \u0275\u0275text(38, "cloud_download");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(39, "span", 23);
      \u0275\u0275text(40);
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(41, ListNhomkhachhangComponent_div_41_Template, 2, 1, "div", 24);
      \u0275\u0275elementStart(42, "div", 25)(43, "table", 26);
      \u0275\u0275repeaterCreate(44, ListNhomkhachhangComponent_For_45_Template, 3, 1, "ng-container", 27, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275template(46, ListNhomkhachhangComponent_tr_46_Template, 1, 0, "tr", 28)(47, ListNhomkhachhangComponent_tr_47_Template, 1, 3, "tr", 29)(48, ListNhomkhachhangComponent_tr_48_Template, 3, 0, "tr", 30);
      \u0275\u0275elementEnd();
      \u0275\u0275element(49, "mat-paginator", 31);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      const menu_r18 = \u0275\u0275reference(16);
      \u0275\u0275advance();
      \u0275\u0275property("position", "end");
      \u0275\u0275advance(11);
      \u0275\u0275property("matMenuTriggerFor", menu_r18);
      \u0275\u0275advance(11);
      \u0275\u0275repeater(ctx.FilterColumns);
      \u0275\u0275advance(2);
      \u0275\u0275classMap(ctx.isFilter ? "!bg-slate-200" : "");
      \u0275\u0275advance(15);
      \u0275\u0275textInterpolate1(" ", ctx.CountItem, " Nh\xE0 Cung C\u1EA5p ");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isFilter);
      \u0275\u0275advance(2);
      \u0275\u0275property("dataSource", ctx.dataSource);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.displayedColumns);
      \u0275\u0275advance(2);
      \u0275\u0275property("matHeaderRowDef", ctx.displayedColumns);
      \u0275\u0275advance();
      \u0275\u0275property("matRowDefColumns", ctx.displayedColumns);
      \u0275\u0275advance(2);
      \u0275\u0275property("pageSizeOptions", \u0275\u0275pureFunction0(11, _c1));
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
    MatPaginator,
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
    NgForOf,
    NgIf,
    DatePipe,
    FormsModule,
    DefaultValueAccessor,
    NgControlStatus,
    NgModel,
    MatTooltipModule,
    MatTooltip
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ListNhomkhachhangComponent, { className: "ListNhomkhachhangComponent", filePath: "src/app/admin/nhomkhachhang/listnhomkhachhang/listnhomkhachhang.component.ts", lineNumber: 44 });
})();

export {
  NhomkhachhangService,
  ListNhomkhachhangComponent
};
//# sourceMappingURL=chunk-7AOHPK6S.mjs.map
