import {
  DateHelpers
} from "./chunk-IGEDQWPE.js";
import {
  KhoService
} from "./chunk-P65SF2KI.js";
import {
  DathangService
} from "./chunk-542P3TXC.js";
import {
  NhacungcapService
} from "./chunk-MDKJ5PGV.js";
import "./chunk-KRR6EHK2.js";
import {
  SanphamService
} from "./chunk-H3SQLGMC.js";
import "./chunk-56QAEOBZ.js";
import {
  Apollo,
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  Observable,
  createHttpLink,
  gql
} from "./chunk-WCX673AM.js";
import "./chunk-R5HFYA7U.js";
import {
  ErrorLogService
} from "./chunk-UV2EYCAL.js";
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
  MatPaginator,
  MatPaginatorModule,
  MatSort,
  MatSortModule,
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
  require_moment
} from "./chunk-LIKOVN7R.js";
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
  MatPrefix,
  NgControlStatus,
  NgModel
} from "./chunk-WEAWHMFJ.js";
import "./chunk-44ZKFD54.js";
import {
  environment
} from "./chunk-U3IXXJDR.js";
import {
  MatSnackBar,
  StorageService
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
  BreakpointObserver,
  Breakpoints
} from "./chunk-GWKJMKCD.js";
import {
  Router,
  RouterOutlet
} from "./chunk-JGMWTFVW.js";
import "./chunk-KJMZCM3Q.js";
import {
  CommonModule,
  DecimalPipe,
  NgForOf,
  NgIf
} from "./chunk-E6DSVUBK.js";
import {
  EventEmitter,
  effect,
  firstValueFrom,
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
  ɵɵclassMapInterpolate1,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
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
  ɵɵpureFunction0,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-IHZ7YO24.js";
import {
  __decorate,
  __rest
} from "./chunk-E3MB3462.js";
import {
  __async,
  __spreadProps,
  __spreadValues,
  __toESM
} from "./chunk-SXK72SKC.js";

// src/app/admin/dathang/nhucaudathang/tablenhucaudathanh/tablenhucaudathanh.component.ts
function TablenhucaudathanhComponent_th_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "th", 8);
    \u0275\u0275listener("click", function TablenhucaudathanhComponent_th_9_Template_th_click_0_listener() {
      const item_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.FilterTable("", item_r2));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r2.name, " ");
  }
}
function TablenhucaudathanhComponent_tr_12_td_10_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275listener("blur", function TablenhucaudathanhComponent_tr_12_td_10_div_1_Template_div_blur_0_listener($event) {
      \u0275\u0275restoreView(_r6);
      const item_r7 = \u0275\u0275nextContext().$implicit;
      const j_r8 = \u0275\u0275nextContext().index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.updateBlur($event, ctx_r2.filterListSP[j_r8], item_r7));
    })("keyup.enter", function TablenhucaudathanhComponent_tr_12_td_10_div_1_Template_div_keyup_enter_0_listener($event) {
      \u0275\u0275restoreView(_r6);
      const item_r7 = \u0275\u0275nextContext().$implicit;
      const j_r8 = \u0275\u0275nextContext().index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.updateEnter($event, ctx_r2.filterListSP[j_r8], item_r7));
    });
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r7 = \u0275\u0275nextContext().$implicit;
    const j_r8 = \u0275\u0275nextContext().index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("contentEditable", true);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 2, ctx_r2.getSLDat(item_r7, ctx_r2.filterListSP[j_r8]), "1.0-2"), " ");
  }
}
function TablenhucaudathanhComponent_tr_12_td_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 12);
    \u0275\u0275template(1, TablenhucaudathanhComponent_tr_12_td_10_div_1_Template, 3, 5, "div", 15);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r7 = ctx.$implicit;
    const j_r8 = \u0275\u0275nextContext().index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.CheckSanphaminNCC(item_r7, ctx_r2.filterListSP[j_r8]));
  }
}
function TablenhucaudathanhComponent_tr_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 9)(1, "td", 10);
    \u0275\u0275listener("click", function TablenhucaudathanhComponent_tr_12_Template_td_click_1_listener() {
      const item_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.FilterTable(item_r5, ""));
    });
    \u0275\u0275elementStart(2, "span", 11);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td", 12)(5, "span", 13);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "td", 12)(8, "span", 13);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(10, TablenhucaudathanhComponent_tr_12_td_10_Template, 2, 1, "td", 14);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r5 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", item_r5.title, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", item_r5.masp, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2(" ", item_r5.goiy, " (", ctx_r2.DadatGoiy(item_r5) || 0, ") ");
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r2.filterListNCC);
  }
}
var TablenhucaudathanhComponent = class _TablenhucaudathanhComponent {
  ListFindNCC = [];
  EditList = [];
  ListDathang = [];
  ListDathangChange = new EventEmitter();
  _snackBar = inject(MatSnackBar);
  filterListNCC = [];
  filterListSP = [];
  ngAfterViewInit() {
    this.LoadTable(this.ListFindNCC, this.EditList);
    console.log("ListFindNCC", this.ListFindNCC);
    console.log("EditList", this.EditList);
  }
  LoadTable(ListFindNCC, EditList) {
    let vitri = 1;
    this.filterListNCC = ListFindNCC;
    this.filterListSP = EditList;
    this.filterListSP.forEach((item) => {
      const index = this.filterListNCC.findIndex((v) => v.Sanpham.some((x) => x.id === item.id));
      if (index !== -1 && this.filterListNCC[index].vitri === void 0) {
        this.filterListNCC[index].vitri = vitri;
        vitri++;
      }
    });
    this.filterListNCC.sort((a, b) => {
      if (a.vitri && b.vitri) {
        return a.vitri - b.vitri;
      }
      return 0;
    });
  }
  isFilter = false;
  FilterTable(sanpham, nhacungcap) {
    this.isFilter = !this.isFilter;
    if (this.isFilter) {
      if (sanpham && Object.keys(sanpham).length > 0) {
        const filteredEditList = this.EditList.filter((item) => item.id === sanpham.id);
        const filteredListNCC = this.ListFindNCC.filter((item) => item.Sanpham.some((sp) => sp.id === sanpham.id));
        this.LoadTable(filteredListNCC, filteredEditList);
      } else if (nhacungcap && Object.keys(nhacungcap).length > 0) {
        const filteredListNCC = this.ListFindNCC.filter((item) => item.id === nhacungcap.id);
        filteredListNCC.forEach((item) => {
          const matchedProducts = this.filterListSP.filter((sp) => item.Sanpham.some((p) => p.id === sp.id)).map((sp) => __spreadProps(__spreadValues({}, sp), {
            sldat: Number(sp.goiy)
          }));
          if (matchedProducts.length > 0) {
            item.sanpham = matchedProducts;
          }
        });
        const existingIndex = this.ListDathang.findIndex((entry) => entry.id === nhacungcap.id);
        if (existingIndex !== -1) {
          this.ListDathang[existingIndex] = __spreadValues(__spreadValues({}, this.ListDathang[existingIndex]), filteredListNCC[0]);
        } else {
          this.ListDathang.push(filteredListNCC[0]);
        }
        console.log("sanpham", sanpham);
        console.log("nhacungcap", nhacungcap);
        console.log("ListDathang", this.ListDathang);
        this.ListDathangChange.emit({ isSubmit: false, ListDathang: this.ListDathang });
        this.LoadTable(filteredListNCC, filteredListNCC[0].sanpham);
      }
    } else {
      this.LoadTable(this.ListFindNCC, this.EditList);
    }
  }
  ngOnChanges(changes) {
    if (changes["ListFindNCC"] || changes["EditList"]) {
      this.LoadTable(this.ListFindNCC, this.EditList);
    }
  }
  getSLDat(ncc, sanpham) {
    const existingItem = ncc.sanpham?.find((v) => v.id === sanpham.id);
    if (existingItem) {
      return existingItem.sldat || 0;
    } else {
      return 0;
    }
  }
  DadatGoiy(item) {
    const SLDat = this.ListDathang.reduce((acc, ncc) => {
      const sp = ncc.sanpham?.find((v) => v.id === item.id);
      return acc + (sp?.sldat ? Number(sp.sldat) : 0);
    }, 0);
    return (Number(item.goiy) - SLDat).toFixed(2);
  }
  trackByFn(index, item) {
    return item.id;
  }
  CheckSanphaminNCC(NCC, item) {
    const existingItem = NCC.Sanpham?.find((v) => v.id === item.id);
    return existingItem ? true : false;
  }
  updateEnter(event, Sanpham, Nhacungcap) {
    const allowedKeys = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
      "Home",
      "End"
    ];
    if (event.key >= "0" && event.key <= "9" || event.key >= "Numpad0" && event.key <= "Numpad9" || allowedKeys.includes(event.key)) {
    } else {
      event.preventDefault();
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      const inputElem = event.target.closest(".sldat-input");
      let newValue = 0;
      if (inputElem) {
        const value = inputElem.value || inputElem.innerText;
        newValue = Number(value.trim()) || 0;
      }
      let tempListDathang = JSON.parse(JSON.stringify(this.ListDathang));
      let tempNCC = tempListDathang.find((v) => v.id === Nhacungcap.id);
      if (tempNCC) {
        let tempSP = tempNCC.sanpham?.find((v) => v.id === Sanpham.id);
        if (tempSP) {
          tempSP.sldat = newValue;
        } else {
          Sanpham.sldat = newValue;
          tempNCC.sanpham = tempNCC.sanpham || [];
          tempNCC.sanpham.push(Sanpham);
        }
      } else {
        Sanpham.sldat = newValue;
        Nhacungcap.sanpham = [Sanpham];
        Nhacungcap.ngaynhan = /* @__PURE__ */ new Date();
        tempListDathang.push(Nhacungcap);
      }
      const checkValue = (() => {
        const SLDat = tempListDathang.reduce((acc, ncc) => {
          const sp = ncc.sanpham?.find((v) => v.id === Sanpham.id);
          return acc + (sp?.sldat ? Number(sp.sldat) : 0);
        }, 0);
        return (Number(Sanpham.goiy) - SLDat).toFixed(2);
      })();
      if (Number(checkValue) < 0) {
        this._snackBar.open("S\u1ED1 l\u01B0\u1EE3ng kh\xF4ng h\u1EE3p l\u1EC7", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
        return;
      }
      const exitNCC = this.ListDathang.find((v) => v.id === Nhacungcap.id);
      if (exitNCC) {
        const exitSP = exitNCC.sanpham?.find((v) => v.id === Sanpham.id);
        if (exitSP) {
          exitSP.sldat = newValue;
        } else {
          Sanpham.sldat = newValue;
          exitNCC.sanpham = exitNCC.sanpham || [];
          exitNCC.sanpham.push(Sanpham);
        }
      } else {
        Sanpham.sldat = newValue;
        Nhacungcap.sanpham = [Sanpham];
        Nhacungcap.ngaynhan = /* @__PURE__ */ new Date();
        this.ListDathang.push(Nhacungcap);
      }
      setTimeout(() => {
        const allInputs = Array.from(document.querySelectorAll(".sldat-input"));
        const currentIndex = allInputs.findIndex((input) => input === event.target);
        if (currentIndex !== -1 && currentIndex + 1 < allInputs.length) {
          allInputs[currentIndex + 1].focus();
        }
      });
      this.ListDathangChange.emit({ isSubmit: false, ListDathang: this.ListDathang });
    }
  }
  updateBlur(event, Sanpham, Nhacungcap) {
    const inputElem = event.target.closest(".sldat-input");
    let newValue = 0;
    if (inputElem) {
      const value = inputElem.value || inputElem.innerText;
      newValue = Number(value.trim()) || 0;
    }
    console.log("newValue", newValue);
    let tempListDathang = JSON.parse(JSON.stringify(this.ListDathang));
    let tempNCC = tempListDathang.find((v) => v.id === Nhacungcap.id);
    if (tempNCC) {
      let tempSP = tempNCC.sanpham?.find((v) => v.id === Sanpham.id);
      if (tempSP) {
        tempSP.sldat = newValue;
      } else {
        Sanpham.sldat = newValue;
        tempNCC.sanpham = tempNCC.sanpham || [];
        tempNCC.sanpham.push(Sanpham);
      }
    } else {
      Sanpham.sldat = newValue;
      Nhacungcap.sanpham = [Sanpham];
      Nhacungcap.ngaynhan = /* @__PURE__ */ new Date();
      tempListDathang.push(Nhacungcap);
    }
    const checkValue = (() => {
      const SLDat = tempListDathang.reduce((acc, ncc) => {
        const sp = ncc.sanpham?.find((v) => v.id === Sanpham.id);
        return acc + (sp?.sldat ? Number(sp.sldat) : 0);
      }, 0);
      return (Number(Sanpham.goiy) - SLDat).toFixed(2);
    })();
    if (Number(checkValue) < 0) {
      this._snackBar.open("S\u1ED1 l\u01B0\u1EE3ng kh\xF4ng h\u1EE3p l\u1EC7", "", {
        duration: 1e3,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ["snackbar-error"]
      });
      return;
    }
    const exitNCC = this.ListDathang.find((v) => v.id === Nhacungcap.id);
    let currentValue = 0;
    if (exitNCC) {
      const exitSP = exitNCC.sanpham?.find((v) => v.id === Sanpham.id);
      if (exitSP) {
        currentValue = exitSP.sldat || 0;
      }
    }
    if (newValue !== currentValue) {
      if (exitNCC) {
        const exitSP = exitNCC.sanpham?.find((v) => v.id === Sanpham.id);
        if (exitSP) {
          exitSP.sldat = newValue;
        } else {
          Sanpham.sldat = newValue;
          exitNCC.sanpham = exitNCC.sanpham || [];
          exitNCC.sanpham.push(Sanpham);
        }
      } else {
        Sanpham.sldat = newValue;
        Nhacungcap.sanpham = [Sanpham];
        Nhacungcap.ngaynhan = /* @__PURE__ */ new Date();
        this.ListDathang.push(Nhacungcap);
      }
      this.ListDathangChange.emit({ isSubmit: false, ListDathang: this.ListDathang });
      console.log(this.ListDathang);
    }
  }
  static \u0275fac = function TablenhucaudathanhComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TablenhucaudathanhComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TablenhucaudathanhComponent, selectors: [["app-tablenhucaudathanh"]], inputs: { ListFindNCC: "ListFindNCC", EditList: "EditList", ListDathang: "ListDathang" }, outputs: { ListDathangChange: "ListDathangChange" }, features: [\u0275\u0275NgOnChangesFeature], decls: 13, vars: 3, consts: [[1, "min-w-full", "divide-y", "divide-gray-200", "border", "border-gray-300", "rounded-lg", "shadow-md"], [1, "bg-gray-50", "rounded-t-lg", "cursor-pointer"], ["scope", "col", 1, "px-6", "py-3", "text-left", "text-xs", "font-medium", "text-gray-500", "uppercase", "tracking-wider", "first:rounded-tl-lg", "last:rounded-tr-lg"], ["scope", "col", 1, "px-6", "py-3", "text-left", "text-xs", "font-medium", "text-gray-500", "uppercase", "tracking-wider"], ["scope", "col", "class", "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hover:bg-slate-50", 3, "click", 4, "ngFor", "ngForOf"], ["scope", "col", 1, "px-6", "py-3", "text-left", "text-xs", "font-medium", "text-gray-500", "uppercase", "tracking-wider", "last:rounded-tr-lg"], [1, "bg-white", "divide-y", "divide-gray-200", "rounded-b-lg"], ["class", "last:rounded-b-lg cursor-pointer hover:bg-slate-50", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["scope", "col", 1, "px-6", "py-3", "text-left", "text-xs", "font-medium", "text-gray-500", "uppercase", "tracking-wider", "hover:bg-slate-50", 3, "click"], [1, "last:rounded-b-lg", "cursor-pointer", "hover:bg-slate-50"], [1, "whitespace-nowrap", "first:rounded-bl-lg", 3, "click"], [1, "max-w-40", "line-clamp-4", "p-2"], [1, "whitespace-nowrap"], [1, "max-w-40", "line-clamp-4"], ["class", "whitespace-nowrap", 4, "ngFor", "ngForOf"], ["class", "sldat-input p-2 min-w-28 text-end bg-slate-200 focus:border rounded-lg focus:border-blue-600 focus:bg-slate-100 focus:outline-none", 3, "contentEditable", "blur", "keyup.enter", 4, "ngIf"], [1, "sldat-input", "p-2", "min-w-28", "text-end", "bg-slate-200", "focus:border", "rounded-lg", "focus:border-blue-600", "focus:bg-slate-100", "focus:outline-none", 3, "blur", "keyup.enter", "contentEditable"]], template: function TablenhucaudathanhComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "table", 0)(1, "thead", 1)(2, "tr")(3, "th", 2);
      \u0275\u0275text(4, " T\xEAn S\u1EA3n Ph\u1EA9m ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "th", 3);
      \u0275\u0275text(6, " M\xE3 S\u1EA3n Ph\u1EA9m ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "th", 3);
      \u0275\u0275text(8, " G\u1EE3i \xDD ");
      \u0275\u0275elementEnd();
      \u0275\u0275template(9, TablenhucaudathanhComponent_th_9_Template, 2, 1, "th", 4);
      \u0275\u0275element(10, "th", 5);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "tbody", 6);
      \u0275\u0275template(12, TablenhucaudathanhComponent_tr_12_Template, 11, 5, "tr", 7);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(9);
      \u0275\u0275property("ngForOf", ctx.filterListNCC);
      \u0275\u0275advance(3);
      \u0275\u0275property("ngForOf", ctx.filterListSP)("ngForTrackBy", ctx.trackByFn);
    }
  }, dependencies: [
    CommonModule,
    NgForOf,
    NgIf,
    DecimalPipe,
    MatIconModule,
    MatButtonModule
  ], encapsulation: 2, changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TablenhucaudathanhComponent, { className: "TablenhucaudathanhComponent", filePath: "src/app/admin/dathang/nhucaudathang/tablenhucaudathanh/tablenhucaudathanh.component.ts", lineNumber: 18 });
})();

// src/app/admin/dathang/nhucaudathang/nhucaudathang.component.ts
var import_moment = __toESM(require_moment());

// node_modules/@apollo/client/link/context/index.js
function setContext(setter) {
  return new ApolloLink(function(operation, forward) {
    var request = __rest(operation, []);
    return new Observable(function(observer) {
      var handle;
      var closed = false;
      Promise.resolve(request).then(function(req) {
        return setter(req, operation.getContext());
      }).then(operation.setContext).then(function() {
        if (closed) return;
        handle = forward(operation).subscribe({
          next: observer.next.bind(observer),
          error: observer.error.bind(observer),
          complete: observer.complete.bind(observer)
        });
      }).catch(observer.error.bind(observer));
      return function() {
        closed = true;
        if (handle) handle.unsubscribe();
      };
    });
  });
}

// src/app/shared/services/graphql.service.ts
var GraphqlService = class _GraphqlService {
  apollo;
  _StorageService;
  _ErrorLogService;
  apolloClient;
  // Signals for reactive state management
  isLoading = signal(false);
  error = signal(null);
  constructor(apollo, _StorageService, _ErrorLogService) {
    this.apollo = apollo;
    this._StorageService = _StorageService;
    this._ErrorLogService = _ErrorLogService;
    DateHelpers.init();
    this.setupApolloClient();
  }
  /**
   * Setup Apollo Client with authentication
   */
  setupApolloClient() {
    const httpLink = createHttpLink({
      uri: `${environment.APIURL}/graphql`
    });
    const authLink = setContext((_, { headers }) => {
      const token = this._StorageService.getItem("token");
      return {
        headers: __spreadProps(__spreadValues({}, headers), {
          authorization: token ? `Bearer ${token}` : ""
        })
      };
    });
    this.apolloClient = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
      defaultOptions: {
        watchQuery: {
          fetchPolicy: "network-only"
        },
        query: {
          fetchPolicy: "network-only"
        }
      }
    });
    this.apollo.create({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
      defaultOptions: {
        watchQuery: {
          fetchPolicy: "network-only"
        },
        query: {
          fetchPolicy: "network-only"
        }
      }
    });
  }
  /**
   * Helper method to normalize model names (convert PascalCase to camelCase)
   */
  normalizeModelName(modelName) {
    return modelName.charAt(0).toLowerCase() + modelName.slice(1);
  }
  /**
   * Helper method to safely format dates for GraphQL queries
   */
  formatDateForGraphQL(date) {
    if (!date)
      return null;
    try {
      return DateHelpers.formatDateForAPI(date);
    } catch (error) {
      console.warn("Error formatting date for GraphQL:", error);
      return null;
    }
  }
  /**
   * Process filters to ensure dates are properly formatted
   */
  processFilters(filters) {
    if (!filters)
      return filters;
    const processedFilters = __spreadValues({}, filters);
    const dateFields = [
      "startDate",
      "endDate",
      "fromDate",
      "toDate",
      "createdAt",
      "updatedAt",
      "ngaytao",
      "ngaycapnhat",
      "ngaygiao",
      "ngaydat",
      "ngayxuat",
      "ngaynhap",
      "batdau",
      "ketthuc",
      "tungay",
      "denngay"
    ];
    for (const field of dateFields) {
      if (processedFilters[field]) {
        processedFilters[field] = this.formatDateForGraphQL(processedFilters[field]);
      }
    }
    if (processedFilters.dateRange) {
      if (processedFilters.dateRange.start) {
        processedFilters.dateRange.start = this.formatDateForGraphQL(processedFilters.dateRange.start);
      }
      if (processedFilters.dateRange.end) {
        processedFilters.dateRange.end = this.formatDateForGraphQL(processedFilters.dateRange.end);
      }
    }
    return processedFilters;
  }
  /**
   * Execute a GraphQL query or mutation using Apollo Client
   */
  executeGraphQL(query) {
    return __async(this, null, function* () {
      this.isLoading.set(true);
      this.error.set(null);
      try {
        const result = yield firstValueFrom(this.apollo.query({
          query: gql`${query.query}`,
          variables: query.variables,
          fetchPolicy: "network-only"
        }));
        if (result.errors && result.errors.length > 0) {
          const errorMessage = result.errors.map((err) => err.message).join(", ");
          this.error.set(errorMessage);
          yield this._ErrorLogService.logError("GraphQL Error", result.errors);
        }
        return {
          data: result.data,
          errors: result.errors ? result.errors.map((err) => ({
            message: err.message,
            locations: err.locations ? err.locations.map((loc) => ({ line: loc.line, column: loc.column })) : void 0,
            path: err.path ? [...err.path] : void 0
          })) : void 0
        };
      } catch (error) {
        const errorMessage = error?.message || "Unknown GraphQL error";
        this.error.set(errorMessage);
        yield this._ErrorLogService.logError("GraphQL Request Failed", error);
        throw error;
      } finally {
        this.isLoading.set(false);
      }
    });
  }
  /**
   * Execute a GraphQL mutation using Apollo Client
   */
  executeMutation(mutation) {
    return __async(this, null, function* () {
      this.isLoading.set(true);
      this.error.set(null);
      try {
        const result = yield firstValueFrom(this.apollo.mutate({
          mutation: gql`${mutation.query}`,
          variables: mutation.variables
        }));
        if (result.errors && result.errors.length > 0) {
          const errorMessage = result.errors.map((err) => err.message).join(", ");
          this.error.set(errorMessage);
          yield this._ErrorLogService.logError("GraphQL Error", result.errors);
        }
        return {
          data: result.data,
          errors: result.errors
        };
      } catch (error) {
        const errorMessage = error?.message || "Unknown GraphQL error";
        this.error.set(errorMessage);
        yield this._ErrorLogService.logError("GraphQL Mutation Failed", error);
        throw error;
      } finally {
        this.isLoading.set(false);
      }
    });
  }
  /**
   * Universal findMany using the actual GraphQL schema
   */
  findMany(_0) {
    return __async(this, arguments, function* (modelName, options = {}) {
      const normalizedModelName = this.normalizeModelName(modelName);
      const processedOptions = __spreadProps(__spreadValues({}, options), {
        where: this.processFilters(options.where)
      });
      console.log(`Finding many records for model: ${normalizedModelName}`, processedOptions);
      const query = `
      query FindMany($modelName: String!, $where: JSON, $orderBy: JSON, $skip: Float, $take: Float, $include: JSON) {
        findMany(
          modelName: $modelName
          where: $where
          orderBy: $orderBy
          skip: $skip
          take: $take
          include: $include
        )
      }
    `;
      try {
        const result = yield this.executeGraphQL({
          query,
          variables: __spreadValues({
            modelName: normalizedModelName
          }, processedOptions)
        });
        console.log(`GraphQL response for findMany on model ${normalizedModelName}:`, result);
        if (result.errors) {
          console.error("GraphQL Errors:", result.errors);
          throw new Error(result.errors.map((e) => e.message).join(", "));
        }
        if (result.data?.findMany) {
          return {
            data: {
              data: result.data.findMany,
              total: result.data.findMany.length,
              page: 1,
              pageSize: result.data.findMany.length
            },
            errors: result.errors
          };
        }
        return result;
      } catch (error) {
        console.error(`Error in findMany for model ${normalizedModelName}:`, error);
        throw error;
      }
    });
  }
  /**
   * Universal findUnique using model-specific queries
   */
  findOne(modelName, where, include) {
    return __async(this, null, function* () {
      const normalizedModelName = this.normalizeModelName(modelName);
      const query = `
      query FindOne($where: JSON, $include: JSON) {
        ${normalizedModelName}(where: $where, include: $include)
      }
    `;
      try {
        const result = yield this.executeGraphQL({
          query,
          variables: { where, include }
        });
        return result.data?.[normalizedModelName] || null;
      } catch (error) {
        console.error(`Error in findOne for model ${normalizedModelName}:`, error);
        return null;
      }
    });
  }
  /**
   * Universal create using mutations
   */
  create(modelName, data, include) {
    return __async(this, null, function* () {
      const normalizedModelName = this.normalizeModelName(modelName);
      const mutation = `
      mutation Create($data: JSON!, $include: JSON) {
        create${modelName}(data: $data, include: $include)
      }
    `;
      const result = yield this.executeMutation({
        query: mutation,
        variables: { data: this.processFilters(data), include }
      });
      if (result.errors) {
        throw new Error(result.errors[0].message);
      }
      return result.data?.[`create${modelName}`];
    });
  }
  /**
   * Universal update using mutations
   */
  update(modelName, where, data, include) {
    return __async(this, null, function* () {
      const mutation = `
      mutation Update($where: JSON!, $data: JSON!, $include: JSON) {
        update${modelName}(where: $where, data: $data, include: $include)
      }
    `;
      const result = yield this.executeMutation({
        query: mutation,
        variables: { where, data: this.processFilters(data), include }
      });
      if (result.errors) {
        throw new Error(result.errors[0].message);
      }
      return result.data?.[`update${modelName}`];
    });
  }
  /**
   * Universal delete using mutations
   */
  delete(modelName, where) {
    return __async(this, null, function* () {
      const mutation = `
      mutation Delete($where: JSON!) {
        delete${modelName}(where: $where)
      }
    `;
      const result = yield this.executeMutation({
        query: mutation,
        variables: { where }
      });
      if (result.errors) {
        throw new Error(result.errors[0].message);
      }
      return result.data?.[`delete${modelName}`];
    });
  }
  /**
   * Simplified search method
   */
  search(_0, _1, _2) {
    return __async(this, arguments, function* (modelName, searchTerm, searchFields, options = {}) {
      const where = __spreadValues({
        OR: searchFields.map((field) => ({
          [field]: {
            contains: searchTerm,
            mode: "insensitive"
          }
        }))
      }, options.where);
      const result = yield this.findMany(modelName, __spreadProps(__spreadValues({}, options), { where }));
      return {
        data: result.data?.data || [],
        total: result.data?.total || 0
      };
    });
  }
  /**
   * Debug method to test GraphQL connection
   */
  debugQuery() {
    return __async(this, null, function* () {
      try {
        const schemaQuery = `
        query IntrospectSchema {
          __schema {
            types {
              name
              kind
            }
          }
        }
      `;
        const schemaResult = yield this.executeGraphQL({ query: schemaQuery });
        const availableModels = ["khachhang", "sanpham", "donhang", "dathang", "nhacungcap"];
        console.log("Available types:", schemaResult.data?.__schema?.types?.filter((t) => !t.name.startsWith("__"))?.map((t) => t.name));
        const testResult = yield this.findMany("khachhang", { take: 1 });
        return {
          schema: schemaResult,
          testQuery: testResult,
          availableModels
        };
      } catch (error) {
        console.error("Debug query failed:", error);
        throw error;
      }
    });
  }
  /**
   * Get specific model data with proper typing
   */
  getKhachhangs() {
    return __async(this, arguments, function* (options = {}) {
      return this.findMany("khachhang", options);
    });
  }
  getSanphams() {
    return __async(this, arguments, function* (options = {}) {
      return this.findMany("sanpham", options);
    });
  }
  getDonhangs() {
    return __async(this, arguments, function* (options = {}) {
      return this.findMany("donhang", options);
    });
  }
  getDathangs() {
    return __async(this, arguments, function* (options = {}) {
      return this.findMany("dathang", options);
    });
  }
  getNhacungcaps() {
    return __async(this, arguments, function* (options = {}) {
      return this.findMany("nhacungcap", options);
    });
  }
  /**
   * Utility methods
   */
  clearError() {
    this.error.set(null);
  }
  isLoadingState() {
    return this.isLoading();
  }
  getCurrentError() {
    return this.error();
  }
  /**
   * Refresh Apollo Client cache
   */
  refreshCache() {
    return __async(this, null, function* () {
      yield this.apolloClient.resetStore();
    });
  }
  /**
   * Clear Apollo Client cache
   */
  clearCache() {
    return __async(this, null, function* () {
      yield this.apolloClient.clearStore();
    });
  }
  static \u0275fac = function GraphqlService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GraphqlService)(\u0275\u0275inject(Apollo), \u0275\u0275inject(StorageService), \u0275\u0275inject(ErrorLogService));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _GraphqlService, factory: _GraphqlService.\u0275fac, providedIn: "root" });
};

// src/app/admin/dathang/nhucaudathang/nhucaudathang.component.ts
var _c0 = ["drawer"];
var _c1 = () => ({ standalone: true });
var _forTrack0 = ($index, $item) => $item.key;
function NhucaudathangComponent_For_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 44);
    \u0275\u0275listener("click", function NhucaudathangComponent_For_24_Template_button_click_0_listener($event) {
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
function NhucaudathangComponent_button_32_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 45);
    \u0275\u0275listener("click", function NhucaudathangComponent_button_32_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r3 = \u0275\u0275nextContext();
      const TaodonDialog_r6 = \u0275\u0275reference(90);
      return \u0275\u0275resetView(ctx_r3.OpenTaodonDialog(TaodonDialog_r6));
    });
    \u0275\u0275text(1, " T\u1EA1o M\u1EDBi ");
    \u0275\u0275elementEnd();
  }
}
function NhucaudathangComponent_tr_55_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 46);
    \u0275\u0275listener("click", function NhucaudathangComponent_tr_55_Template_tr_click_0_listener() {
      const item_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.AddToEdit(item_r8));
    });
    \u0275\u0275elementStart(1, "td", 47);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 47);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 47);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 48);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td", 48);
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td", 48);
    \u0275\u0275text(14);
    \u0275\u0275pipe(15, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "td", 48);
    \u0275\u0275text(17);
    \u0275\u0275pipe(18, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "td", 48);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r8 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275classMapInterpolate1("hover:bg-slate-100 ", ctx_r3.CheckItemInEdit(item_r8) ? "!bg-slate-200" : "", "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", item_r8.masp, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", item_r8.title, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", item_r8.dvt, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(9, 11, item_r8.slchogiao, "1.0-2"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(12, 14, item_r8.goiy, "1.0-2"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(15, 17, item_r8.slchonhap, "1.0-2"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(18, 20, item_r8.slton, "1.0-2"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", item_r8.haohut, "% ");
  }
}
function NhucaudathangComponent_tr_56_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 49);
    \u0275\u0275text(2, " Kh\xF4ng t\xECm th\u1EA5y d\u1EEF li\u1EC7u ");
    \u0275\u0275elementEnd()();
  }
}
function NhucaudathangComponent_ng_template_87_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-dialog-content")(1, "div", 50)(2, "div", 51);
    \u0275\u0275text(3, "X\xE1c Nh\u1EADn");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div");
    \u0275\u0275text(5, "B\u1EA1n ch\u1EAFc ch\u1EAFn mu\u1ED1n xo\xE1 kh\xF4ng?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 52)(7, "button", 53);
    \u0275\u0275text(8, "\u0110\u1ED3ng \xDD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 54);
    \u0275\u0275text(10, "Hu\u1EF7 B\u1ECF");
    \u0275\u0275elementEnd()()()();
  }
}
function NhucaudathangComponent_ng_template_89_button_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 41);
    \u0275\u0275listener("click", function NhucaudathangComponent_ng_template_89_button_7_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.CheckSubmit());
    });
    \u0275\u0275text(1, "Ki\u1EC3m Tra");
    \u0275\u0275elementEnd();
  }
}
function NhucaudathangComponent_ng_template_89_button_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "button", 53);
    \u0275\u0275text(1, "\u0110\u1ED3ng \xDD");
    \u0275\u0275elementEnd();
  }
}
function NhucaudathangComponent_ng_template_89_button_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "button", 54);
    \u0275\u0275text(1, "Hu\u1EF7 B\u1ECF");
    \u0275\u0275elementEnd();
  }
}
function NhucaudathangComponent_ng_template_89_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-dialog-content", 55)(1, "div", 56)(2, "div", 57);
    \u0275\u0275text(3, "\u0110\u1EB7t h\xE0ng nh\xE0 cung c\u1EA5p");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 58)(5, "app-tablenhucaudathanh", 59);
    \u0275\u0275listener("ListDathangChange", function NhucaudathangComponent_ng_template_89_Template_app_tablenhucaudathanh_ListDathangChange_5_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.onListDathangChange($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 52);
    \u0275\u0275template(7, NhucaudathangComponent_ng_template_89_button_7_Template, 2, 0, "button", 60)(8, NhucaudathangComponent_ng_template_89_button_8_Template, 2, 0, "button", 61)(9, NhucaudathangComponent_ng_template_89_button_9_Template, 2, 0, "button", 62);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275property("ListFindNCC", ctx_r3.ListFindNCC)("EditList", ctx_r3.EditList)("ListDathang", ctx_r3.ListDathang);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", !ctx_r3.isSubmit);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r3.isSubmit);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r3.isSubmit);
  }
}
var NhucaudathangComponent = class _NhucaudathangComponent {
  displayedColumns = [
    "title",
    "masp",
    "giagoc",
    "dvt",
    "slton",
    "slchogiao",
    "slchonhap",
    "haohut",
    "goiy"
  ];
  ColumnName = {
    title: "T\xEAn S\u1EA3n Ph\u1EA9m",
    masp: "M\xE3 S\u1EA3n Ph\u1EA9m",
    giagoc: "Gi\xE1 G\u1ED1c",
    dvt: "\u0110\u01A1n V\u1ECB T\xEDnh",
    slton: "T\u1ED3n",
    slchogiao: "Ch\u1EDD Giao",
    slchonhap: "Ch\u1EDD Nh\u1EADp",
    haohut: "Hao H\u1EE5t",
    goiy: "G\u1EE3i \xDD"
  };
  FilterColumns = JSON.parse(localStorage.getItem("NhucauColFilter") || "[]");
  Columns = [];
  //pagination
  totalItems = 0;
  pageSize = 10;
  currentPage = 1;
  totalPages = 1;
  paginator;
  sort;
  drawer;
  filterValues = {};
  _SanphamService = inject(SanphamService);
  _breakpointObserver = inject(BreakpointObserver);
  _GoogleSheetService = inject(GoogleSheetService);
  _NhacungcapService = inject(NhacungcapService);
  _DathangService = inject(DathangService);
  _KhoService = inject(KhoService);
  _GraphqlService = inject(GraphqlService);
  _router = inject(Router);
  _dialog = inject(MatDialog);
  Listsanpham = this._SanphamService.ListSanpham;
  EditList = [];
  dataSource = new MatTableDataSource();
  sanphamId = this._SanphamService.sanphamId;
  _snackBar = inject(MatSnackBar);
  CountItem = 0;
  isSearch = false;
  constructor() {
    this.displayedColumns.forEach((column) => {
      this.filterValues[column] = "";
    });
    effect(() => {
      this.dataSource.data = this.Listsanpham();
      this.totalItems = this.Listsanpham().length;
      this.calculateTotalPages();
    });
  }
  GetGoiy(item) {
    return parseFloat(((item.soluongkho - item.soluong) * (1 + item.haohut / 100)).toString()).toFixed(2);
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
      this.updateDisplayData();
      this.loadDathang();
      this._SanphamService.listenSanphamUpdates();
      yield this._SanphamService.getNhucau();
      this.dataSource = new MatTableDataSource(this.Listsanpham());
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.initializeColumns();
      this.setupDrawer();
    });
  }
  loadDathang() {
    return __async(this, null, function* () {
      const result = yield this._GraphqlService.findMany("Dathang", {
        orderBy: { createdAt: "desc" }
      });
      if (result.data) {
        console.log("Products:", result);
      }
    });
  }
  refresh() {
    return __async(this, null, function* () {
      yield this._SanphamService.getAllSanpham();
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
      localStorage.setItem("NhucauColFilter", JSON.stringify(this.FilterColumns));
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
    this.dataSource.filteredData = this.Listsanpham().filter((v) => v[column].toLowerCase().includes(event.target.value.toLowerCase()));
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
    this.ListFilter = this.Listsanpham();
    this.dataSource.data = this.Listsanpham();
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
    this.dataSource.data = this.Listsanpham().filter((v) => this.ListFilter.some((v1) => v1.id === v.id));
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    menu.closeMenu();
  }
  updateDisplayedColumns() {
    this.displayedColumns = this.FilterColumns.filter((v) => v.isShow).map((item) => item.key);
    this.ColumnName = this.FilterColumns.reduce((obj, item) => {
      if (item.isShow)
        obj[item.key] = item.value;
      return obj;
    }, {});
    localStorage.setItem("NhucauColFilter", JSON.stringify(this.FilterColumns));
  }
  doFilterColumns(event) {
    const query = event.target.value.toLowerCase();
    this.FilterColumns = this.Columns.filter((v) => v.value.toLowerCase().includes(query));
  }
  create() {
    this.drawer.open();
    this._router.navigate(["admin/sanpham", "new"]);
  }
  ListSPNCC = [];
  openDeleteDialog(teamplate) {
    return __async(this, null, function* () {
      const dialogDeleteRef = this._dialog.open(teamplate, {
        hasBackdrop: true,
        disableClose: true
      });
      dialogDeleteRef.afterClosed().subscribe((result) => {
        if (result == "true") {
          this.DeleteListItem();
        }
      });
    });
  }
  DeleteListItem() {
    this.EditList.forEach((item) => {
      this._SanphamService.DeleteSanpham(item);
    });
    this.EditList = [];
    this._snackBar.open("X\xF3a Th\xE0nh C\xF4ng", "", {
      duration: 1e3,
      horizontalPosition: "end",
      verticalPosition: "top",
      panelClass: ["snackbar-success"]
    });
  }
  ListFindNCC = [];
  ListDathang = [];
  isSubmit = false;
  onListDathangChange(event) {
    console.log(event);
    this.isSubmit = event.isSubmit;
    this.ListDathang = event.ListDathang;
    console.log(this.ListDathang);
  }
  CheckSubmit() {
    const hasNegative = this.ListDathang.some((ncc) => (ncc.sanpham || []).some((sp) => Number(sp.sldat) < 0));
    console.log(hasNegative);
    console.log(this.ListDathang);
    if (hasNegative) {
      this._snackBar.open("C\xF3 s\u1EA3n ph\u1EA9m c\xF3 s\u1ED1 l\u01B0\u1EE3ng \u0111\u1EB7t \xE2m!", "", {
        duration: 2e3,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ["snackbar-error"]
      });
      this.isSubmit = false;
      return false;
    } else {
      this.isSubmit = true;
      return true;
    }
  }
  OpenTaodonDialog(teamplate) {
    return __async(this, null, function* () {
      this.ListFindNCC = yield this._NhacungcapService.Findbyids(this.EditList.map((v) => v.id));
      this.EditList = this.EditList.filter((v) => this.ListFindNCC.some((v1) => v1.Sanpham.some((v3) => v3.id === v.id)));
      const dialogDeleteRef = this._dialog.open(teamplate, {
        hasBackdrop: true,
        disableClose: true
      });
      dialogDeleteRef.afterClosed().subscribe((result) => {
        if (result == "true") {
          console.log(this.ListDathang);
          (() => __async(this, null, function* () {
            for (const item of this.ListDathang) {
              yield this._DathangService.CreateByNhucau(item);
              yield new Promise((resolve) => setTimeout(resolve, 100));
            }
          }))().then(() => {
            this._snackBar.open("T\u1EA1o M\u1EDBi \u0111\u1EB7t h\xE0ng th\xE0nh c\xF4ng", "", {
              duration: 2e3,
              horizontalPosition: "end",
              verticalPosition: "top",
              panelClass: ["snackbar-success"]
            });
            this._router.navigate(["/admin/dathang"]);
          }).catch((error) => {
            this._snackBar.open("C\xF3 l\u1ED7i x\u1EA3y ra khi T\u1EA1o M\u1EDBi \u0111\u1EB7t h\xE0ng", "", {
              duration: 2e3,
              horizontalPosition: "end",
              verticalPosition: "top",
              panelClass: ["snackbar-error"]
            });
            console.error("Error creating orders:", error);
          });
        }
      });
    });
  }
  CheckSanphaminNCC(NCC, item) {
    const existingItem = NCC.Sanpham?.find((v) => v.id === item.id);
    return existingItem ? true : false;
  }
  updateValue(Soluong, Sanpham, Nhacungcap) {
    const newValue = Number(Soluong.target.innerText.trim()) || 0;
    const exitNCC = this.ListDathang.find((v) => v.id === Nhacungcap.id);
    console.log(exitNCC);
    if (exitNCC) {
      const exitSP = exitNCC.sanpham.find((v) => v.id === Sanpham.id);
      if (exitSP) {
        exitSP.sldat = newValue;
      } else {
        Sanpham.sldat = newValue;
        exitNCC.Sanpham.push(Sanpham);
      }
    } else {
      Sanpham.sldat = newValue;
      Nhacungcap.sanpham = [Sanpham];
      Nhacungcap.ngaynhan = /* @__PURE__ */ new Date();
      this.ListDathang.push(Nhacungcap);
    }
    console.log(this.ListDathang);
  }
  AddToEdit(item) {
    const existingItem = this.EditList.find((v) => v.id === item.id);
    if (existingItem) {
      this.EditList = this.EditList.filter((v) => v.id !== item.id);
    } else {
      this.EditList.push(item);
    }
  }
  ChoseAllEdit() {
    this.EditList = this.Listsanpham();
  }
  CheckItemInEdit(item) {
    return this.EditList.some((v) => v.id === item.id);
  }
  goToDetail(item) {
    this.drawer.open();
    this._SanphamService.setSanphamId(item.id);
    this._router.navigate(["admin/sanpham", item.id]);
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
      this.DoImportData(data);
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
      const existingSanpham = this._SanphamService.ListSanpham();
      const existingMasp = existingSanpham.map((v) => v.masp);
      const newMasp = uniqueData.map((v) => v.masp).filter((item) => !existingMasp.includes(item));
      yield Promise.all(uniqueData.map((v) => __async(this, null, function* () {
        const existingItem = existingSanpham.find((v1) => v1.masp === v.masp);
        if (existingItem) {
          const updatedItem = __spreadValues(__spreadValues({}, existingItem), v);
          yield this._SanphamService.updateSanpham(updatedItem);
        } else {
          yield this._SanphamService.CreateSanpham(v);
        }
      })));
      yield Promise.all(existingSanpham.filter((sp) => !uniqueData.some((item) => item.masp === sp.masp)).map((sp) => this._SanphamService.updateSanpham(__spreadProps(__spreadValues({}, sp), { isActive: false }))));
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
      const ListKho = yield this._KhoService.getAllKho();
      console.log(data);
      const dulieu = data.map((v) => ({
        ngaynhan: (0, import_moment.default)().format("YYYY-MM-DD"),
        mancc: v.mancc || "",
        nhacungcap: v.nhacungcap || "",
        masp: v.masp,
        title: v.title,
        dvt: v.dvt,
        // giagoc: v.giagoc,
        slchogiao: v.slchogiao,
        goiy: v.goiy,
        slchonhap: v.slchonhap,
        slton: v.slton,
        haohut: v.haohut,
        ghichu: v.ghichu
      }));
      const mapping = {
        ngaynhan: "Ng\xE0y Nh\u1EADn",
        mancc: "M\xE3 Nh\xE0 Cung C\u1EA5p",
        nhacungcap: "Nh\xE0 Cung C\u1EA5p",
        masp: "M\xE3 S\u1EA3n Ph\u1EA9m",
        title: "T\xEAn S\u1EA3n Ph\u1EA9m",
        dvt: "\u0110\u01A1n V\u1ECB T\xEDnh",
        // giagoc: 'Giá Gốc',
        slchogiao: "Ch\u1EDD Giao",
        goiy: "G\u1EE3i \xDD",
        slchonhap: "Ch\u1EDD Nh\u1EADp",
        slton: "T\u1ED3n Kho",
        haohut: "Hao H\u1EE5t",
        ghichu: "Ghi Ch\xFA"
      };
      ListKho.forEach((v) => {
        mapping[`makho_${v.makho}`] = v.makho;
      });
      writeExcelFile(dulieu, title, Object.values(mapping), mapping);
    });
  }
  trackByFn(index, item) {
    return item.id;
  }
  calculateTotalPages() {
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
  }
  onPageSizeChange(size, menuHienthi) {
    if (size > this.Listsanpham().length) {
      this.pageSize = this.Listsanpham().length;
      this._snackBar.open(`S\u1ED1 l\u01B0\u1EE3ng t\u1ED1i \u0111a ${this.Listsanpham().length}`, "", {
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
    const pageData = this.Listsanpham().slice(startIndex, endIndex);
    this.dataSource.data = pageData;
  }
  static \u0275fac = function NhucaudathangComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NhucaudathangComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NhucaudathangComponent, selectors: [["app-nhucaudathang"]], viewQuery: function NhucaudathangComponent_Query(rf, ctx) {
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
  }, decls: 91, vars: 18, consts: [["drawer", ""], ["menu", "matMenu"], ["uploadfile", ""], ["menuHienthi", "matMenuTrigger"], ["DeleteDialog", ""], ["TaodonDialog", ""], ["autosize", "", 1, "w-full", "h-full"], ["mode", "over", 1, "flex", "flex-col", "lg:!w-1/2", "!w-full", "h-full", 3, "position"], [1, "flex", "flex-col", "space-y-2", "h-screen-16", "w-full", "p-2"], [1, "border", "p-1", "cursor-pointer", "w-full", "relative", "flex", "lg:flex-row", "lg:space-y-2", "space-y-0", "flex-col", "space-x-2", "justify-between", "items-center", "bg-white", "rounded-lg"], [1, "w-full", "flex", "flex-row", "space-x-2", "items-center"], [1, "relative"], ["type", "text", "placeholder", "T\xECm Ki\u1EBFm...", 1, "block", "pl-10", "pr-4", "py-2", "text-gray-700", "bg-white", "border", "border-gray-300", "rounded-lg", "focus:border-blue-400", "focus:ring-blue-400", "focus:outline-none", "focus:ring", "focus:ring-opacity-40", 3, "keyup"], [1, "absolute", "inset-y-0", "left-0", "flex", "items-center", "pl-3", "pointer-events-none"], [1, "material-symbols-outlined", "text-gray-500"], ["matTooltip", "\u1EA8n hi\u1EC7n c\u1ED9t", "mat-icon-button", "", "color", "primary", "aria-label", "Example icon-button with a menu", 3, "matMenuTriggerFor"], [1, "p-4"], ["appearance", "outline", "subscriptSizing", "dynamic", 1, "w-full"], ["matInput", "", "placeholder", "T\xECm Ki\u1EBFm", 3, "input", "click"], ["matPrefix", ""], [1, "flex", "flex-col", "max-h-80", "overflow-auto"], ["mat-menu-item", ""], ["matTooltip", "T\u1EA3i file excel M\u1EABu", "color", "primary", "mat-icon-button", "", 3, "click"], ["type", "file", 1, "hidden", 3, "change"], [1, "lg:flex", "hidden", "whitespace-", "p-2", "rounded-lg", "bg-slate-200", 3, "click"], ["color", "primary", "mat-flat-button", "", 3, "click", 4, "ngIf"], [1, "border", "rounded-lg", "w-full", "h-full", "overflow-auto"], [1, "!border", "w-full", "cursor-pointer"], [1, "bg-gray-50", "sticky", "top-0"], [1, "px-4", "py-3", "text-left", "text-xs", "font-medium", "text-gray-500", "uppercase", "tracking-wider", "whitespace-nowrap"], [1, "bg-white", "divide-y", "divide-gray-200"], [3, "class", "click", 4, "ngFor", "ngForOf"], [4, "ngIf"], [1, "cursor-pointer", "border", "rounded-lg", "px-3", "p-1", "flex", "flex-row", "space-x-2", "items-center", "justify-between"], [1, "w-full", "flex", "lg:p-0", "p-2", "lg:flex-row", "lg:space-x-2", "lg:items-center", "lg:justify-between", "flex-col", "justify-center"], [1, "w-full", "text-center"], [1, "w-full", "flex", "flex-row", "space-x-2", "items-center", "lg:justify-end", "justify-center"], [1, "font-bold", "text-blue-600", 3, "matMenuTriggerFor"], [1, "w-full", "flex", "flex-col", "space-y-2", "p-4", 3, "click"], ["appearance", "outline", "subscriptSizing", "dynamic"], ["matInput", "", "placeholder", "Vui l\xF2ng Nh\u1EADp S\u1ED1 L\u01B0\u1EE3ng", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["mat-flat-button", "", "color", "primary", 3, "click"], [1, "pagination-controls"], ["mat-icon-button", "", "color", "primary", 3, "click", "disabled"], ["mat-menu-item", "", 3, "click"], ["color", "primary", "mat-flat-button", "", 3, "click"], [3, "click"], [1, "px-4", "py-4", "whitespace-nowrap", "text-sm", "text-gray-900"], [1, "px-4", "py-4", "whitespace-nowrap", "text-sm", "text-gray-900", "text-right"], ["colspan", "9", 1, "px-4", "py-4", "text-center", "text-sm", "text-gray-500"], [1, "flex", "flex-col", "space-y-8", "items-center", "justify-center"], [1, "font-bold"], [1, "flex", "flex-row", "space-x-2", "items-center", "justify-center"], ["mat-flat-button", "", "color", "primary", "mat-dialog-close", "true"], ["mat-flat-button", "", "color", "warn", "mat-dialog-close", "false"], [1, "!max-h-[90vh]", "!h-[90vh]", "!w-[90vw]"], [1, "h-full", "w-full", "flex", "flex-col", "space-y-8", "items-center"], [1, "flex", "font-bold"], [1, "flex", "h-full", "w-full", "overflow-auto"], [3, "ListDathangChange", "ListFindNCC", "EditList", "ListDathang"], ["mat-flat-button", "", "color", "primary", 3, "click", 4, "ngIf"], ["mat-flat-button", "", "color", "primary", "mat-dialog-close", "true", 4, "ngIf"], ["mat-flat-button", "", "color", "warn", "mat-dialog-close", "false", 4, "ngIf"]], template: function NhucaudathangComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "mat-drawer-container", 6)(1, "mat-drawer", 7, 0);
      \u0275\u0275element(3, "router-outlet");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 8)(5, "div", 9)(6, "div", 10)(7, "div", 11)(8, "input", 12);
      \u0275\u0275listener("keyup", function NhucaudathangComponent_Template_input_keyup_8_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.applyFilter($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "div", 13)(10, "span", 14);
      \u0275\u0275text(11, "search");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(12, "button", 15)(13, "mat-icon");
      \u0275\u0275text(14, "tune");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(15, "mat-menu", null, 1)(17, "div", 16)(18, "mat-form-field", 17)(19, "input", 18);
      \u0275\u0275listener("input", function NhucaudathangComponent_Template_input_input_19_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.doFilterColumns($event));
      })("click", function NhucaudathangComponent_Template_input_click_19_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView($event.stopPropagation());
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "mat-icon", 19);
      \u0275\u0275text(21, "search");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(22, "div", 20);
      \u0275\u0275repeaterCreate(23, NhucaudathangComponent_For_24_Template, 5, 2, "button", 21, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(25, "button", 22);
      \u0275\u0275listener("click", function NhucaudathangComponent_Template_button_click_25_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.ExportExcel(ctx.dataSource.data, "Tonghop"));
      });
      \u0275\u0275elementStart(26, "mat-icon");
      \u0275\u0275text(27, "file_download");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(28, "input", 23, 2);
      \u0275\u0275listener("change", function NhucaudathangComponent_Template_input_change_28_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.ImporExcel($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "span", 24);
      \u0275\u0275listener("click", function NhucaudathangComponent_Template_span_click_30_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.ChoseAllEdit());
      });
      \u0275\u0275text(31);
      \u0275\u0275elementEnd();
      \u0275\u0275template(32, NhucaudathangComponent_button_32_Template, 2, 0, "button", 25);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(33, "div", 26)(34, "div", 26)(35, "table", 27)(36, "thead", 28)(37, "tr")(38, "th", 29);
      \u0275\u0275text(39, " M\xE3 S\u1EA3n Ph\u1EA9m ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "th", 29);
      \u0275\u0275text(41, " T\xEAn S\u1EA3n Ph\u1EA9m ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(42, "th", 29);
      \u0275\u0275text(43, " \u0110\u01A1n V\u1ECB T\xEDnh ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(44, "th", 29);
      \u0275\u0275text(45, " SL \u0110\u1EB7t ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(46, "th", 29);
      \u0275\u0275text(47, " SL C\u1EA7n \u0110\u1EB7t ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(48, "th", 29);
      \u0275\u0275text(49, " SL B\xE1n ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(50, "th", 29);
      \u0275\u0275text(51, " T\u1ED3n ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(52, "th", 29);
      \u0275\u0275text(53, " Hao H\u1EE5t ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(54, "tbody", 30);
      \u0275\u0275template(55, NhucaudathangComponent_tr_55_Template, 21, 23, "tr", 31)(56, NhucaudathangComponent_tr_56_Template, 3, 0, "tr", 32);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(57, "div", 33)(58, "div", 34)(59, "span", 35);
      \u0275\u0275text(60, "\u0110ang Xem ");
      \u0275\u0275elementStart(61, "strong");
      \u0275\u0275text(62);
      \u0275\u0275elementEnd();
      \u0275\u0275text(63, " - ");
      \u0275\u0275elementStart(64, "strong");
      \u0275\u0275text(65);
      \u0275\u0275elementEnd();
      \u0275\u0275text(66);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(67, "div", 36)(68, "span", 37, 3);
      \u0275\u0275text(70);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(71, "mat-menu", null, 1)(73, "div", 38);
      \u0275\u0275listener("click", function NhucaudathangComponent_Template_div_click_73_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView($event.stopPropagation());
      });
      \u0275\u0275elementStart(74, "span");
      \u0275\u0275text(75, "S\u1ED1 L\u01B0\u1EE3ng");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(76, "mat-form-field", 39)(77, "input", 40);
      \u0275\u0275twoWayListener("ngModelChange", function NhucaudathangComponent_Template_input_ngModelChange_77_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.pageSize, $event) || (ctx.pageSize = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(78, "button", 41);
      \u0275\u0275listener("click", function NhucaudathangComponent_Template_button_click_78_listener() {
        \u0275\u0275restoreView(_r1);
        const menuHienthi_r9 = \u0275\u0275reference(69);
        return \u0275\u0275resetView(ctx.onPageSizeChange(ctx.pageSize, menuHienthi_r9));
      });
      \u0275\u0275text(79, "\xC1p D\u1EE5ng");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(80, "div", 42)(81, "button", 43);
      \u0275\u0275listener("click", function NhucaudathangComponent_Template_button_click_81_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onPreviousPage());
      });
      \u0275\u0275elementStart(82, "mat-icon");
      \u0275\u0275text(83, "keyboard_arrow_left");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(84, "button", 43);
      \u0275\u0275listener("click", function NhucaudathangComponent_Template_button_click_84_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onNextPage());
      });
      \u0275\u0275elementStart(85, "mat-icon");
      \u0275\u0275text(86, "keyboard_arrow_right");
      \u0275\u0275elementEnd()()()()()()()();
      \u0275\u0275template(87, NhucaudathangComponent_ng_template_87_Template, 11, 0, "ng-template", null, 4, \u0275\u0275templateRefExtractor)(89, NhucaudathangComponent_ng_template_89_Template, 10, 6, "ng-template", null, 5, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      const menu_r12 = \u0275\u0275reference(16);
      \u0275\u0275advance();
      \u0275\u0275property("position", "end");
      \u0275\u0275advance(11);
      \u0275\u0275property("matMenuTriggerFor", menu_r12);
      \u0275\u0275advance(11);
      \u0275\u0275repeater(ctx.FilterColumns);
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate1(" ", ctx.Listsanpham().length, " S\u1EA3n Ph\u1EA9m ");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.EditList.length > 0);
      \u0275\u0275advance(23);
      \u0275\u0275property("ngForOf", ctx.dataSource.filteredData);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.dataSource.filteredData.length === 0);
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate((ctx.currentPage - 1) * ctx.pageSize + 1);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.currentPage * ctx.pageSize > ctx.totalItems ? ctx.totalItems : ctx.currentPage * ctx.pageSize);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate3(" trong s\u1ED1 ", ctx.totalItems, " m\u1EE5c, ", ctx.currentPage, "/", ctx.totalPages, " Trang");
      \u0275\u0275advance(2);
      \u0275\u0275property("matMenuTriggerFor", menu_r12);
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
    MatPrefix,
    MatInputModule,
    MatInput,
    MatTableModule,
    MatSortModule,
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
    NgForOf,
    NgIf,
    DecimalPipe,
    FormsModule,
    DefaultValueAccessor,
    NgControlStatus,
    NgModel,
    MatTooltipModule,
    MatTooltip,
    MatDialogModule,
    MatDialogClose,
    MatDialogContent,
    TablenhucaudathanhComponent
  ], encapsulation: 2, changeDetection: 0 });
};
__decorate([
  memoize()
], NhucaudathangComponent.prototype, "FilterHederColumn", null);
__decorate([
  Debounce(300)
], NhucaudathangComponent.prototype, "doFilterHederColumn", null);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NhucaudathangComponent, { className: "NhucaudathangComponent", filePath: "src/app/admin/dathang/nhucaudathang/nhucaudathang.component.ts", lineNumber: 69 });
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
  NhucaudathangComponent
};
//# sourceMappingURL=chunk-CH6US7OL.js.map
