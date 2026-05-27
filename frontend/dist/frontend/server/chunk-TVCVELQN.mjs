import './polyfills.server.mjs';
import {
  MatAutocomplete,
  MatAutocompleteModule,
  MatAutocompleteTrigger
} from "./chunk-MWHGBPZJ.mjs";
import {
  MatPaginator,
  MatPaginatorModule
} from "./chunk-PFX6ZNS2.mjs";
import {
  MatSort,
  MatSortHeader,
  MatSortModule
} from "./chunk-EB4UUH73.mjs";
import {
  TimezoneService
} from "./chunk-5FENH2CU.mjs";
import {
  writeExcelFile
} from "./chunk-KMEFW6OC.mjs";
import {
  require_moment
} from "./chunk-TEMMKMG5.mjs";
import {
  MatMenu,
  MatMenuItem,
  MatMenuModule,
  MatMenuTrigger
} from "./chunk-IQORQLD3.mjs";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "./chunk-AM3BBS5E.mjs";
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
} from "./chunk-3VZFOMYA.mjs";
import {
  GraphqlService
} from "./chunk-SLWHV4LF.mjs";
import {
  MatProgressSpinnerModule
} from "./chunk-KJH76OSC.mjs";
import {
  MatCardModule
} from "./chunk-6DRHJEKQ.mjs";
import {
  MatSelectModule
} from "./chunk-PQY5STY2.mjs";
import {
  MatInputModule
} from "./chunk-KU7CK3YB.mjs";
import {
  MatTooltip,
  MatTooltipModule
} from "./chunk-4QEJTP76.mjs";
import {
  DefaultValueAccessor,
  FormsModule,
  MatFormFieldModule,
  NgControlStatus,
  NgModel,
  ReactiveFormsModule
} from "./chunk-K4777VIL.mjs";
import {
  MatIconModule
} from "./chunk-VOLHFDBH.mjs";
import "./chunk-ZZDECD7O.mjs";
import {
  MatSnackBar,
  MatSnackBarModule
} from "./chunk-AF3EHXCM.mjs";
import "./chunk-LOJIWTVC.mjs";
import {
  MatButtonModule
} from "./chunk-K6ADGRHN.mjs";
import {
  MatNativeDateModule,
  MatOption
} from "./chunk-VMLPK7VD.mjs";
import "./chunk-RILUB63S.mjs";
import "./chunk-AJDW274Y.mjs";
import {
  CommonModule,
  DecimalPipe
} from "./chunk-UP6A7POK.mjs";
import {
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
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
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-I6KZCWLZ.mjs";
import "./chunk-QS2IQGEQ.mjs";
import "./chunk-3RMAAFYO.mjs";
import {
  __async,
  __toESM
} from "./chunk-FMEBT56H.mjs";

// src/app/admin/thongke/khoiluong-khachhang/khoiluong-khachhang.component.ts
var import_moment2 = __toESM(require_moment());

// src/app/admin/thongke/thongke-khoiluong.service.ts
var import_moment = __toESM(require_moment());
var ThongkeKhoiluongService = class _ThongkeKhoiluongService {
  graphqlService;
  timezoneService;
  isLoading = signal(false);
  result = signal(null);
  error = signal(null);
  constructor(graphqlService, timezoneService) {
    this.graphqlService = graphqlService;
    this.timezoneService = timezoneService;
  }
  /**
   * Lấy danh sách khách hàng để chọn
   */
  getAllKhachhang() {
    return __async(this, null, function* () {
      try {
        const response = yield this.graphqlService.findAll("khachhang", {
          take: 99999,
          aggressiveCache: true,
          enableParallelFetch: true,
          select: {
            id: true,
            makh: true,
            name: true,
            tenfile: true,
            loaikh: true,
            diachi: true,
            sdt: true,
            isActive: true
          },
          orderBy: { name: "asc" }
        });
        return response.data || [];
      } catch (error) {
        console.error("Error fetching khachhang:", error);
        return [];
      }
    });
  }
  /**
   * Thống kê khối lượng sản phẩm đã bán cho khách hàng theo khoảng thời gian
   */
  thongkeKhoiluongByKhachhang(khachhangId, batdau, ketthuc) {
    return __async(this, null, function* () {
      this.isLoading.set(true);
      this.error.set(null);
      try {
        const dateRange = this.timezoneService.getAPIDateRange(typeof batdau === "string" ? new Date(batdau) : batdau, typeof ketthuc === "string" ? new Date(ketthuc) : ketthuc);
        const khachhangResponse = yield this.graphqlService.findAll("khachhang", {
          take: 1,
          where: { id: khachhangId },
          select: {
            id: true,
            makh: true,
            name: true,
            tenfile: true
          }
        });
        if (!khachhangResponse.data || khachhangResponse.data.length === 0) {
          this.error.set("Kh\xF4ng t\xECm th\u1EA5y kh\xE1ch h\xE0ng");
          this.isLoading.set(false);
          return null;
        }
        const khachhang = khachhangResponse.data[0];
        console.log("\u{1F4CA} Query donhang v\u1EDBi params:", {
          khachhangId,
          dateRange,
          Batdau: dateRange.Batdau,
          Ketthuc: dateRange.Ketthuc
        });
        const donhangResponse = yield this.graphqlService.findAll("donhang", {
          take: 99999,
          enableParallelFetch: true,
          aggressiveCache: false,
          where: {
            khachhangId,
            createdAt: {
              gte: dateRange.Batdau,
              lte: dateRange.Ketthuc
            },
            status: {
              notIn: ["huy"]
              // Loại bỏ đơn hàng đã hủy
            }
          },
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            madonhang: true,
            ngaygiao: true,
            createdAt: true,
            status: true,
            tongtien: true,
            tongvat: true,
            sanpham: {
              select: {
                id: true,
                sldat: true,
                slgiao: true,
                slnhan: true,
                giaban: true,
                ttdat: true,
                ttgiao: true,
                ttnhan: true,
                sanpham: {
                  select: {
                    id: true,
                    masp: true,
                    title: true,
                    dvt: true
                  }
                }
              }
            }
          }
        });
        const donhangs = donhangResponse.data || [];
        console.log("\u{1F4CA} K\u1EBFt qu\u1EA3 donhang:", {
          tongDonhang: donhangs.length,
          donhangs: donhangs.slice(0, 3)
          // Log 3 đơn đầu tiên để debug
        });
        const sanphamMap = /* @__PURE__ */ new Map();
        const sortedDonhangs = donhangs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        sortedDonhangs.forEach((donhang) => {
          if (donhang.sanpham && Array.isArray(donhang.sanpham)) {
            donhang.sanpham.forEach((item) => {
              const sp = item.sanpham;
              if (!sp || !sp.id)
                return;
              const key = sp.id;
              const existing = sanphamMap.get(key);
              const sldat = Number(item.sldat) || 0;
              const slgiao = Number(item.slgiao) || 0;
              const slnhan = Number(item.slnhan) || 0;
              const giaban = Number(item.giaban) || 0;
              const giatri = slnhan * giaban;
              if (existing) {
                existing.tongSoluongDat += sldat;
                existing.tongSoluongGiao += slgiao;
                existing.tongSoluongNhan += slnhan;
                existing.tongGiaTri += giatri;
                existing.soLanMua += 1;
                if (!existing.donhangIds.includes(donhang.id)) {
                  existing.donhangIds.push(donhang.id);
                }
              } else {
                sanphamMap.set(key, {
                  sanphamId: sp.id,
                  masp: sp.masp || "",
                  title: sp.title || "",
                  dvt: sp.dvt || "",
                  giaSanpham: giaban,
                  // Giá từ đơn hàng mới nhất
                  tongSoluongDat: sldat,
                  tongSoluongGiao: slgiao,
                  tongSoluongNhan: slnhan,
                  tongGiaTri: giatri,
                  soLanMua: 1,
                  donhangIds: [donhang.id],
                  latestOrderDate: donhang.createdAt
                  // Lưu ngày đơn hàng mới nhất
                });
              }
            });
          }
        });
        const chiTietSanpham = Array.from(sanphamMap.values()).sort((a, b) => b.tongSoluongGiao - a.tongSoluongGiao);
        const tongGiaTri = chiTietSanpham.reduce((sum, sp) => sum + sp.tongGiaTri, 0);
        const result = {
          khachhangId: khachhang.id,
          khachhangName: khachhang.name || khachhang.tenfile || "",
          makh: khachhang.makh || "",
          batdau: (0, import_moment.default)(batdau).format("DD/MM/YYYY"),
          ketthuc: (0, import_moment.default)(ketthuc).format("DD/MM/YYYY"),
          tongDonhang: donhangs.length,
          tongGiaTri,
          tongSanpham: chiTietSanpham.length,
          chiTietSanpham
        };
        this.result.set(result);
        this.isLoading.set(false);
        return result;
      } catch (error) {
        console.error("Error in thongkeKhoiluongByKhachhang:", error);
        this.error.set(error.message || "C\xF3 l\u1ED7i x\u1EA3y ra khi th\u1ED1ng k\xEA");
        this.isLoading.set(false);
        return null;
      }
    });
  }
  /**
   * Export dữ liệu ra Excel
   */
  exportToExcel(result) {
    return result.chiTietSanpham.map((sp, index) => ({
      STT: index + 1,
      "M\xE3 SP": sp.masp,
      "T\xEAn s\u1EA3n ph\u1EA9m": sp.title,
      "\u0110VT": sp.dvt,
      "Gi\xE1 SP (VN\u0110)": sp.giaSanpham,
      "T\u1ED5ng Kh\u1ED1i L\u01B0\u1EE3ng": sp.tongSoluongNhan,
      "Gi\xE1 tr\u1ECB (VN\u0110)": sp.tongGiaTri,
      "S\u1ED1 l\u1EA7n mua": sp.soLanMua
    }));
  }
  /**
   * Reset kết quả
   */
  reset() {
    this.result.set(null);
    this.error.set(null);
    this.isLoading.set(false);
  }
  static \u0275fac = function ThongkeKhoiluongService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ThongkeKhoiluongService)(\u0275\u0275inject(GraphqlService), \u0275\u0275inject(TimezoneService));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ThongkeKhoiluongService, factory: _ThongkeKhoiluongService.\u0275fac, providedIn: "root" });
};

// src/app/admin/thongke/khoiluong-khachhang/khoiluong-khachhang.component.ts
var _c0 = ["trigger"];
var _c1 = ["khachhangInput"];
var _c2 = () => [10, 25, 50, 100];
var _forTrack0 = ($index, $item) => $item.id;
function KhoiluongKhachhangComponent_For_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 18)(1, "div", 35)(2, "span", 36);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 37);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const kh_r2 = ctx.$implicit;
    \u0275\u0275property("value", kh_r2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(kh_r2.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", kh_r2.makh, " \u2022 ", kh_r2.loaikh === "khachsi" ? "Kh\xE1ch s\u1EC9" : "Kh\xE1ch l\u1EBB", "");
  }
}
function KhoiluongKhachhangComponent_ForEmpty_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 19);
    \u0275\u0275text(1, " Kh\xF4ng t\xECm th\u1EA5y kh\xE1ch h\xE0ng ");
    \u0275\u0275elementEnd();
  }
}
function KhoiluongKhachhangComponent_Conditional_68_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 38);
    \u0275\u0275element(1, "circle", 39)(2, "path", 40);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "\u0110ang t\u1EA3i...");
    \u0275\u0275elementEnd();
  }
}
function KhoiluongKhachhangComponent_Conditional_69_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 41);
    \u0275\u0275element(1, "path", 42);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Th\u1ED1ng k\xEA");
    \u0275\u0275elementEnd();
  }
}
function KhoiluongKhachhangComponent_Conditional_70_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 31)(1, "div", 43);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 44);
    \u0275\u0275element(3, "path", 45);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "div", 46)(5, "p", 36);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 37);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "button", 47);
    \u0275\u0275listener("click", function KhoiluongKhachhangComponent_Conditional_70_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.clearKhachhang());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(10, "svg", 48);
    \u0275\u0275element(11, "path", 49);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r3.selectedKhachhang.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.selectedKhachhang.makh);
  }
}
function KhoiluongKhachhangComponent_Conditional_71_th_63_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 105);
    \u0275\u0275text(1, "STT");
    \u0275\u0275elementEnd();
  }
}
function KhoiluongKhachhangComponent_Conditional_71_td_64_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 106);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const i_r6 = ctx.index;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(i_r6 + 1);
  }
}
function KhoiluongKhachhangComponent_Conditional_71_th_66_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 107);
    \u0275\u0275text(1, "M\xE3 SP");
    \u0275\u0275elementEnd();
  }
}
function KhoiluongKhachhangComponent_Conditional_71_td_67_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 108)(1, "span", 109);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r7 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", row_r7.masp, " ");
  }
}
function KhoiluongKhachhangComponent_Conditional_71_th_69_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 110);
    \u0275\u0275text(1, "T\xEAn s\u1EA3n ph\u1EA9m");
    \u0275\u0275elementEnd();
  }
}
function KhoiluongKhachhangComponent_Conditional_71_td_70_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 108)(1, "span", 111);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r8 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("matTooltip", row_r8.title);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(row_r8.title);
  }
}
function KhoiluongKhachhangComponent_Conditional_71_th_72_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 107);
    \u0275\u0275text(1, "\u0110VT");
    \u0275\u0275elementEnd();
  }
}
function KhoiluongKhachhangComponent_Conditional_71_td_73_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 106);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r9 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(row_r9.dvt);
  }
}
function KhoiluongKhachhangComponent_Conditional_71_th_75_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 112);
    \u0275\u0275text(1, "Gi\xE1 SP");
    \u0275\u0275elementEnd();
  }
}
function KhoiluongKhachhangComponent_Conditional_71_td_76_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 113)(1, "span", 114);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "number");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r10 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(3, 1, row_r10.giaSanpham, "1.0-0"), "\u0111");
  }
}
function KhoiluongKhachhangComponent_Conditional_71_th_78_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 112);
    \u0275\u0275text(1, "T\u1ED5ng Kh\u1ED1i L\u01B0\u1EE3ng");
    \u0275\u0275elementEnd();
  }
}
function KhoiluongKhachhangComponent_Conditional_71_td_79_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 113)(1, "span", 115);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "number");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r11 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(3, 1, row_r11.tongSoluongNhan, "1.0-2"));
  }
}
function KhoiluongKhachhangComponent_Conditional_71_th_81_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 112);
    \u0275\u0275text(1, "Gi\xE1 tr\u1ECB");
    \u0275\u0275elementEnd();
  }
}
function KhoiluongKhachhangComponent_Conditional_71_td_82_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 113)(1, "span", 116);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "number");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r12 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(3, 1, row_r12.tongGiaTri, "1.0-0"), "\u0111");
  }
}
function KhoiluongKhachhangComponent_Conditional_71_th_84_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 117);
    \u0275\u0275text(1, "S\u1ED1 l\u1EA7n mua");
    \u0275\u0275elementEnd();
  }
}
function KhoiluongKhachhangComponent_Conditional_71_td_85_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 118)(1, "span", 119);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r13 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", row_r13.soLanMua, " ");
  }
}
function KhoiluongKhachhangComponent_Conditional_71_tr_86_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 120);
  }
}
function KhoiluongKhachhangComponent_Conditional_71_tr_87_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 121);
  }
}
function KhoiluongKhachhangComponent_Conditional_71_tr_88_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 122)(1, "td", 123)(2, "div", 124);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(3, "svg", 125);
    \u0275\u0275element(4, "path", 126);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "p", 127);
    \u0275\u0275text(6, "Kh\xF4ng t\xECm th\u1EA5y d\u1EEF li\u1EC7u");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275attribute("colspan", ctx_r3.displayedColumns.length);
  }
}
function KhoiluongKhachhangComponent_Conditional_71_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 50)(1, "div", 51)(2, "div", 52)(3, "div", 53);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(4, "svg", 54);
    \u0275\u0275element(5, "path", 55);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(6, "div")(7, "p", 9);
    \u0275\u0275text(8, "T\u1ED5ng \u0111\u01A1n h\xE0ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p", 56);
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "number");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(12, "div", 51)(13, "div", 52)(14, "div", 57);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(15, "svg", 58);
    \u0275\u0275element(16, "path", 59);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(17, "div")(18, "p", 9);
    \u0275\u0275text(19, "T\u1ED5ng s\u1EA3n ph\u1EA9m");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "p", 56);
    \u0275\u0275text(21);
    \u0275\u0275pipe(22, "number");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(23, "div", 51)(24, "div", 52)(25, "div", 60);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(26, "svg", 61);
    \u0275\u0275element(27, "path", 62);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(28, "div")(29, "p", 9);
    \u0275\u0275text(30, "T\u1ED5ng gi\xE1 tr\u1ECB");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "p", 56);
    \u0275\u0275text(32);
    \u0275\u0275pipe(33, "number");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(34, "div", 51)(35, "div", 52)(36, "div", 63);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(37, "svg", 64);
    \u0275\u0275element(38, "path", 65);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(39, "div")(40, "p", 9);
    \u0275\u0275text(41, "Kho\u1EA3ng th\u1EDDi gian");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "p", 66);
    \u0275\u0275text(43);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(44, "div", 67)(45, "div", 68)(46, "div")(47, "h2", 66);
    \u0275\u0275text(48, "Chi ti\u1EBFt kh\u1ED1i l\u01B0\u1EE3ng s\u1EA3n ph\u1EA9m");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "p", 9);
    \u0275\u0275text(50, "Danh s\xE1ch s\u1EA3n ph\u1EA9m \u0111\xE3 mua trong kho\u1EA3ng th\u1EDDi gian");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(51, "div", 69)(52, "div", 15);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(53, "svg", 70);
    \u0275\u0275element(54, "path", 71);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(55, "input", 72);
    \u0275\u0275twoWayListener("ngModelChange", function KhoiluongKhachhangComponent_Conditional_71_Template_input_ngModelChange_55_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.searchText, $event) || (ctx_r3.searchText = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("input", function KhoiluongKhachhangComponent_Conditional_71_Template_input_input_55_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.applyFilter());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(56, "button", 73);
    \u0275\u0275listener("click", function KhoiluongKhachhangComponent_Conditional_71_Template_button_click_56_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.exportExcel());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(57, "svg", 41);
    \u0275\u0275element(58, "path", 74);
    \u0275\u0275elementEnd();
    \u0275\u0275text(59, " Export Excel ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(60, "div", 75)(61, "table", 76);
    \u0275\u0275elementContainerStart(62, 77);
    \u0275\u0275template(63, KhoiluongKhachhangComponent_Conditional_71_th_63_Template, 2, 0, "th", 78)(64, KhoiluongKhachhangComponent_Conditional_71_td_64_Template, 2, 1, "td", 79);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(65, 80);
    \u0275\u0275template(66, KhoiluongKhachhangComponent_Conditional_71_th_66_Template, 2, 0, "th", 81)(67, KhoiluongKhachhangComponent_Conditional_71_td_67_Template, 3, 1, "td", 82);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(68, 83);
    \u0275\u0275template(69, KhoiluongKhachhangComponent_Conditional_71_th_69_Template, 2, 0, "th", 84)(70, KhoiluongKhachhangComponent_Conditional_71_td_70_Template, 3, 2, "td", 82);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(71, 85);
    \u0275\u0275template(72, KhoiluongKhachhangComponent_Conditional_71_th_72_Template, 2, 0, "th", 81)(73, KhoiluongKhachhangComponent_Conditional_71_td_73_Template, 2, 1, "td", 79);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(74, 86);
    \u0275\u0275template(75, KhoiluongKhachhangComponent_Conditional_71_th_75_Template, 2, 0, "th", 87)(76, KhoiluongKhachhangComponent_Conditional_71_td_76_Template, 4, 4, "td", 88);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(77, 89);
    \u0275\u0275template(78, KhoiluongKhachhangComponent_Conditional_71_th_78_Template, 2, 0, "th", 87)(79, KhoiluongKhachhangComponent_Conditional_71_td_79_Template, 4, 4, "td", 88);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(80, 90);
    \u0275\u0275template(81, KhoiluongKhachhangComponent_Conditional_71_th_81_Template, 2, 0, "th", 87)(82, KhoiluongKhachhangComponent_Conditional_71_td_82_Template, 4, 4, "td", 88);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(83, 91);
    \u0275\u0275template(84, KhoiluongKhachhangComponent_Conditional_71_th_84_Template, 2, 0, "th", 92)(85, KhoiluongKhachhangComponent_Conditional_71_td_85_Template, 3, 1, "td", 93);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(86, KhoiluongKhachhangComponent_Conditional_71_tr_86_Template, 1, 0, "tr", 94)(87, KhoiluongKhachhangComponent_Conditional_71_tr_87_Template, 1, 0, "tr", 95)(88, KhoiluongKhachhangComponent_Conditional_71_tr_88_Template, 7, 1, "tr", 96);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(89, "div", 97);
    \u0275\u0275element(90, "mat-paginator", 98);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(91, "div", 99)(92, "div", 100)(93, "div", 60)(94, "p", 101);
    \u0275\u0275text(95, "T\u1ED5ng Kh\u1ED1i L\u01B0\u1EE3ng (SL Nh\u1EADn)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(96, "p", 102);
    \u0275\u0275text(97);
    \u0275\u0275pipe(98, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(99, "div", 57)(100, "p", 103);
    \u0275\u0275text(101, "T\u1ED5ng Gi\xE1 Tr\u1ECB");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(102, "p", 104);
    \u0275\u0275text(103);
    \u0275\u0275pipe(104, "number");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(11, 15, ctx_r3.result().tongDonhang));
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(22, 17, ctx_r3.result().tongSanpham));
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(33, 19, ctx_r3.result().tongGiaTri, "1.0-0"), "\u0111");
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate2("", ctx_r3.result().batdau, " - ", ctx_r3.result().ketthuc, "");
    \u0275\u0275advance(12);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.searchText);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx_r3.result() || ctx_r3.result().chiTietSanpham.length === 0);
    \u0275\u0275advance(5);
    \u0275\u0275property("dataSource", ctx_r3.dataSource);
    \u0275\u0275advance(25);
    \u0275\u0275property("matHeaderRowDef", ctx_r3.displayedColumns)("matHeaderRowDefSticky", true);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r3.displayedColumns);
    \u0275\u0275advance(3);
    \u0275\u0275property("pageSizeOptions", \u0275\u0275pureFunction0(28, _c2))("pageSize", 25);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(98, 22, ctx_r3.getTotalNhan(), "1.0-2"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(104, 25, ctx_r3.getTotalGiaTri(), "1.0-0"), "\u0111");
  }
}
function KhoiluongKhachhangComponent_Conditional_72_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 32)(1, "div", 128)(2, "div", 129);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(3, "svg", 130);
    \u0275\u0275element(4, "path", 42);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "h3", 131);
    \u0275\u0275text(6, "Ch\u01B0a c\xF3 d\u1EEF li\u1EC7u th\u1ED1ng k\xEA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 132);
    \u0275\u0275text(8, " Vui l\xF2ng ch\u1ECDn kh\xE1ch h\xE0ng v\xE0 kho\u1EA3ng th\u1EDDi gian \u0111\u1EC3 xem th\u1ED1ng k\xEA kh\u1ED1i l\u01B0\u1EE3ng s\u1EA3n ph\u1EA9m ");
    \u0275\u0275elementEnd()()();
  }
}
function KhoiluongKhachhangComponent_Conditional_73_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 33)(1, "div", 133)(2, "div", 134);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(3, "svg", 135);
    \u0275\u0275element(4, "path", 136);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "div", 46)(6, "h3", 137);
    \u0275\u0275text(7, "C\xF3 l\u1ED7i x\u1EA3y ra");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 138);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "button", 139);
    \u0275\u0275listener("click", function KhoiluongKhachhangComponent_Conditional_73_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.thongke());
    });
    \u0275\u0275text(11, " Th\u1EED l\u1EA1i ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r3.error());
  }
}
function KhoiluongKhachhangComponent_Conditional_74_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 34)(1, "div", 140);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 141);
    \u0275\u0275element(3, "circle", 39)(4, "path", 40);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "p", 142);
    \u0275\u0275text(6, "\u0110ang t\u1EA3i d\u1EEF li\u1EC7u th\u1ED1ng k\xEA...");
    \u0275\u0275elementEnd()()();
  }
}
var KhoiluongKhachhangComponent = class _KhoiluongKhachhangComponent {
  thongkeService;
  graphqlService;
  timezoneService;
  snackBar;
  sort;
  paginator;
  autocompleteTrigger;
  khachhangInput;
  // Data
  listKhachhang = signal([]);
  filteredKhachhang = signal([]);
  selectedKhachhang = null;
  searchKhachhang = "";
  // Date range
  batdau = /* @__PURE__ */ new Date();
  ketthuc = /* @__PURE__ */ new Date();
  // Search
  searchText = "";
  // Table - Columns: STT, Mã SP, Tên SP, ĐVT, Giá SP, Tổng Khối Lượng
  displayedColumns = ["stt", "masp", "title", "dvt", "giaSanpham", "tongSoluongNhan"];
  dataSource = new MatTableDataSource([]);
  // Service signals
  result;
  isLoading;
  error;
  constructor(thongkeService, graphqlService, timezoneService, snackBar) {
    this.thongkeService = thongkeService;
    this.graphqlService = graphqlService;
    this.timezoneService = timezoneService;
    this.snackBar = snackBar;
    this.result = this.thongkeService.result;
    this.isLoading = this.thongkeService.isLoading;
    this.error = this.thongkeService.error;
    this.setThisMonth();
  }
  ngOnInit() {
    return __async(this, null, function* () {
      console.log("\u{1F504} Loading kh\xE1ch h\xE0ng...");
      try {
        const response = yield this.graphqlService.findAll("khachhang", {
          enableParallelFetch: true,
          take: 999999,
          aggressiveCache: true,
          orderBy: { name: "asc" },
          select: {
            id: true,
            makh: true,
            name: true,
            tenfile: true,
            loaikh: true,
            diachi: true,
            sdt: true,
            isActive: true
          }
        });
        console.log("\u{1F4E6} Kh\xE1ch h\xE0ng loaded:", response.data?.length, response.data);
        if (response.data && response.data.length > 0) {
          this.listKhachhang.set(response.data.filter((kh) => kh.isActive !== false));
          this.filteredKhachhang.set(this.listKhachhang());
        }
        console.log("\u2705 filteredKhachhang:", this.filteredKhachhang().length);
      } catch (error) {
        console.error("\u274C Error loading kh\xE1ch h\xE0ng:", error);
      }
    });
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  // Filter khách hàng
  filterKhachhang() {
    const search = this.searchKhachhang.toLowerCase().trim();
    if (!search) {
      this.filteredKhachhang.set(this.listKhachhang());
      return;
    }
    const filtered = this.listKhachhang().filter((kh) => kh.name?.toLowerCase().includes(search) || kh.makh?.toLowerCase().includes(search) || kh.tenfile?.toLowerCase().includes(search));
    this.filteredKhachhang.set(filtered);
  }
  // Focus khách hàng - hiển thị tất cả options khi focus
  onFocusKhachhang() {
    console.log("\u{1F50D} Focus v\xE0o input kh\xE1ch h\xE0ng");
    console.log("\u{1F4CB} listKhachhang:", this.listKhachhang().length);
    this.filteredKhachhang.set(this.listKhachhang());
    console.log("\u{1F4CB} filteredKhachhang set:", this.filteredKhachhang().length);
    setTimeout(() => {
      console.log("\u23F0 Trigger openPanel, autocompleteTrigger:", !!this.autocompleteTrigger);
      if (this.autocompleteTrigger) {
        this.autocompleteTrigger.openPanel();
      }
    }, 150);
  }
  // Select khách hàng
  onKhachhangSelected(event) {
    this.selectedKhachhang = event.option.value;
    this.searchKhachhang = this.selectedKhachhang.name;
  }
  // Display function for autocomplete
  displayKhachhang(kh) {
    return kh?.name || "";
  }
  // Clear selected khách hàng
  clearKhachhang() {
    this.selectedKhachhang = null;
    this.searchKhachhang = "";
    this.thongkeService.reset();
    this.dataSource.data = [];
  }
  // Thống kê
  thongke() {
    return __async(this, null, function* () {
      if (!this.selectedKhachhang) {
        this.snackBar.open("Vui l\xF2ng ch\u1ECDn kh\xE1ch h\xE0ng", "\u0110\xF3ng", { duration: 3e3 });
        return;
      }
      if (!this.batdau || !this.ketthuc) {
        this.snackBar.open("Vui l\xF2ng ch\u1ECDn kho\u1EA3ng th\u1EDDi gian", "\u0110\xF3ng", { duration: 3e3 });
        return;
      }
      if (this.batdau > this.ketthuc) {
        this.snackBar.open("Ng\xE0y b\u1EAFt \u0111\u1EA7u kh\xF4ng th\u1EC3 sau ng\xE0y k\u1EBFt th\xFAc", "\u0110\xF3ng", { duration: 3e3 });
        return;
      }
      console.log("\u{1F4CA} B\u1EAFt \u0111\u1EA7u th\u1ED1ng k\xEA v\u1EDBi params:", {
        khachhangId: this.selectedKhachhang.id,
        batdau: this.batdau,
        ketthuc: this.ketthuc
      });
      const result = yield this.thongkeService.thongkeKhoiluongByKhachhang(this.selectedKhachhang.id, this.batdau, this.ketthuc);
      console.log("\u{1F4CA} K\u1EBFt qu\u1EA3 th\u1ED1ng k\xEA:", result);
      if (result) {
        this.dataSource.data = result.chiTietSanpham;
        this.snackBar.open(`Th\u1ED1ng k\xEA th\xE0nh c\xF4ng: ${result.tongSanpham} s\u1EA3n ph\u1EA9m, ${result.tongDonhang} \u0111\u01A1n h\xE0ng`, "OK", {
          panelClass: "snackbar-success",
          duration: 3e3
        });
      }
    });
  }
  // Apply filter
  applyFilter() {
    this.dataSource.filter = this.searchText.trim().toLowerCase();
  }
  // Export Excel
  exportExcel() {
    const result = this.result();
    if (!result || result.chiTietSanpham.length === 0) {
      this.snackBar.open("Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u \u0111\u1EC3 xu\u1EA5t", "\u0110\xF3ng", {
        panelClass: "snackbar-error",
        duration: 3e3
      });
      return;
    }
    const exportData = this.thongkeService.exportToExcel(result);
    const headers = {
      STT: "STT",
      "M\xE3 SP": "M\xE3 SP",
      "T\xEAn s\u1EA3n ph\u1EA9m": "T\xEAn s\u1EA3n ph\u1EA9m",
      "\u0110VT": "\u0110VT",
      "Gi\xE1 SP (VN\u0110)": "Gi\xE1 SP (VN\u0110)",
      "T\u1ED5ng Kh\u1ED1i L\u01B0\u1EE3ng": "T\u1ED5ng Kh\u1ED1i L\u01B0\u1EE3ng",
      "Gi\xE1 tr\u1ECB (VN\u0110)": "Gi\xE1 tr\u1ECB (VN\u0110)",
      "S\u1ED1 l\u1EA7n mua": "S\u1ED1 l\u1EA7n mua"
    };
    const fileName = `ThongKe_KhoiLuong_${result.makh}_${(0, import_moment2.default)(this.batdau).format("DDMMYYYY")}_${(0, import_moment2.default)(this.ketthuc).format("DDMMYYYY")}`;
    writeExcelFile(exportData, fileName, Object.values(headers), headers);
    this.snackBar.open("Xu\u1EA5t Excel th\xE0nh c\xF4ng!", "OK", { duration: 3e3 });
  }
  // Quick date selections
  setToday() {
    this.batdau = /* @__PURE__ */ new Date();
    this.ketthuc = /* @__PURE__ */ new Date();
  }
  setYesterday() {
    const yesterday = (0, import_moment2.default)().subtract(1, "day");
    this.batdau = yesterday.toDate();
    this.ketthuc = yesterday.toDate();
  }
  setThisWeek() {
    this.batdau = (0, import_moment2.default)().startOf("week").toDate();
    this.ketthuc = (0, import_moment2.default)().endOf("week").toDate();
  }
  setLastWeek() {
    this.batdau = (0, import_moment2.default)().subtract(1, "week").startOf("week").toDate();
    this.ketthuc = (0, import_moment2.default)().subtract(1, "week").endOf("week").toDate();
  }
  setThisMonth() {
    this.batdau = (0, import_moment2.default)().startOf("month").toDate();
    this.ketthuc = (0, import_moment2.default)().endOf("month").toDate();
  }
  setLastMonth() {
    this.batdau = (0, import_moment2.default)().subtract(1, "month").startOf("month").toDate();
    this.ketthuc = (0, import_moment2.default)().subtract(1, "month").endOf("month").toDate();
  }
  setThisQuarter() {
    this.batdau = (0, import_moment2.default)().startOf("quarter").toDate();
    this.ketthuc = (0, import_moment2.default)().endOf("quarter").toDate();
  }
  setThisYear() {
    this.batdau = (0, import_moment2.default)().startOf("year").toDate();
    this.ketthuc = (0, import_moment2.default)().endOf("year").toDate();
  }
  // Totals
  getTotalDat() {
    const result = this.result();
    return result ? result.chiTietSanpham.reduce((sum, sp) => sum + sp.tongSoluongDat, 0) : 0;
  }
  getTotalGiao() {
    const result = this.result();
    return result ? result.chiTietSanpham.reduce((sum, sp) => sum + sp.tongSoluongGiao, 0) : 0;
  }
  getTotalNhan() {
    const result = this.result();
    return result ? result.chiTietSanpham.reduce((sum, sp) => sum + sp.tongSoluongNhan, 0) : 0;
  }
  getTotalGiaTri() {
    const result = this.result();
    return result ? result.chiTietSanpham.reduce((sum, sp) => sum + sp.tongGiaTri, 0) : 0;
  }
  static \u0275fac = function KhoiluongKhachhangComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _KhoiluongKhachhangComponent)(\u0275\u0275directiveInject(ThongkeKhoiluongService), \u0275\u0275directiveInject(GraphqlService), \u0275\u0275directiveInject(TimezoneService), \u0275\u0275directiveInject(MatSnackBar));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _KhoiluongKhachhangComponent, selectors: [["app-khoiluong-khachhang"]], viewQuery: function KhoiluongKhachhangComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(MatSort, 5);
      \u0275\u0275viewQuery(MatPaginator, 5);
      \u0275\u0275viewQuery(_c0, 5);
      \u0275\u0275viewQuery(_c1, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.sort = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.paginator = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.autocompleteTrigger = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.khachhangInput = _t.first);
    }
  }, decls: 75, vars: 18, consts: [["khachhangInput", "", "trigger", "matAutocompleteTrigger"], ["autoKhachhang", "matAutocomplete"], ["pickerBatdau", ""], ["pickerKetthuc", ""], ["quickDateMenu", "matMenu"], [1, "min-h-screen", "bg-slate-50/50", "p-6"], [1, "max-w-7xl", "mx-auto", "space-y-6"], [1, "space-y-1"], [1, "text-2xl", "font-semibold", "tracking-tight", "text-slate-900"], [1, "text-sm", "text-slate-500"], [1, "rounded-xl", "border", "border-slate-200", "bg-white", "shadow-sm"], [1, "p-6", "space-y-4"], [1, "grid", "grid-cols-1", "md:grid-cols-12", "gap-4", "items-end"], [1, "md:col-span-4"], [1, "text-sm", "font-medium", "text-slate-700", "mb-1.5", "block"], [1, "relative"], ["type", "text", "placeholder", "T\xECm ki\u1EBFm kh\xE1ch h\xE0ng...", 1, "w-full", "h-10", "px-3", "py-2", "text-sm", "border", "border-slate-200", "rounded-lg", "bg-white", "focus:outline-none", "focus:ring-2", "focus:ring-slate-900", "focus:border-transparent", "placeholder:text-slate-400", "transition-all", 3, "ngModelChange", "input", "focus", "ngModel", "matAutocomplete"], [1, "shadcn-autocomplete", 3, "optionSelected", "displayWith"], [1, "!py-2", 3, "value"], ["disabled", "", 1, "!py-2", "!text-slate-400"], [1, "md:col-span-2"], ["placeholder", "dd/mm/yyyy", 1, "w-full", "h-10", "px-3", "py-2", "text-sm", "border", "border-slate-200", "rounded-lg", "bg-white", "focus:outline-none", "focus:ring-2", "focus:ring-slate-900", "focus:border-transparent", "placeholder:text-slate-400", "transition-all", 3, "ngModelChange", "matDatepicker", "ngModel"], [1, "absolute", "right-1", "top-1/2", "-translate-y-1/2", "scale-75", "opacity-60", 3, "for"], [1, "w-full", "h-10", "px-3", "py-2", "text-sm", "border", "border-slate-200", "rounded-lg", "bg-white", "hover:bg-slate-50", "transition-colors", "flex", "items-center", "justify-between", 3, "matMenuTriggerFor"], [1, "text-slate-600"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-4", "h-4", "text-slate-400"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M19 9l-7 7-7-7"], [1, "shadcn-menu"], ["mat-menu-item", "", 1, "!text-sm", 3, "click"], [1, "text-sm", "font-medium", "text-slate-700", "mb-1.5", "block", "opacity-0"], [1, "w-full", "h-10", "px-4", "text-sm", "font-medium", "text-white", "bg-slate-900", "rounded-lg", "hover:bg-slate-800", "disabled:opacity-50", "disabled:cursor-not-allowed", "transition-colors", "flex", "items-center", "justify-center", "gap-2", 3, "click", "disabled"], [1, "flex", "items-center", "gap-2", "p-3", "rounded-lg", "bg-slate-100", "border", "border-slate-200"], [1, "rounded-xl", "border", "border-slate-200", "bg-white", "p-12", "shadow-sm"], [1, "rounded-xl", "border", "border-red-200", "bg-red-50", "p-6", "shadow-sm"], [1, "fixed", "inset-0", "bg-slate-900/20", "backdrop-blur-sm", "flex", "items-center", "justify-center", "z-50"], [1, "flex", "flex-col"], [1, "text-sm", "font-medium", "text-slate-900"], [1, "text-xs", "text-slate-500"], ["fill", "none", "viewBox", "0 0 24 24", 1, "animate-spin", "h-4", "w-4"], ["cx", "12", "cy", "12", "r", "10", "stroke", "currentColor", "stroke-width", "4", 1, "opacity-25"], ["fill", "currentColor", "d", "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z", 1, "opacity-75"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-4", "h-4"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"], [1, "w-8", "h-8", "rounded-full", "bg-slate-900", "flex", "items-center", "justify-center"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-4", "h-4", "text-white"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"], [1, "flex-1"], [1, "p-1.5", "rounded-md", "hover:bg-slate-200", "transition-colors", 3, "click"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-4", "h-4", "text-slate-500"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M6 18L18 6M6 6l12 12"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "lg:grid-cols-4", "gap-4"], [1, "rounded-xl", "border", "border-slate-200", "bg-white", "p-6", "shadow-sm"], [1, "flex", "items-center", "gap-4"], [1, "p-3", "rounded-lg", "bg-blue-50"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-6", "h-6", "text-blue-600"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"], [1, "text-2xl", "font-semibold", "text-slate-900"], [1, "p-3", "rounded-lg", "bg-emerald-50"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-6", "h-6", "text-emerald-600"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"], [1, "p-3", "rounded-lg", "bg-violet-50"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-6", "h-6", "text-violet-600"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"], [1, "p-3", "rounded-lg", "bg-amber-50"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-6", "h-6", "text-amber-600"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"], [1, "text-lg", "font-semibold", "text-slate-900"], [1, "rounded-xl", "border", "border-slate-200", "bg-white", "shadow-sm", "overflow-hidden"], [1, "p-4", "border-b", "border-slate-200", "flex", "flex-col", "sm:flex-row", "sm:items-center", "sm:justify-between", "gap-4"], [1, "flex", "items-center", "gap-3"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "absolute", "left-3", "top-1/2", "-translate-y-1/2", "w-4", "h-4", "text-slate-400"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"], ["type", "text", "placeholder", "T\xECm ki\u1EBFm s\u1EA3n ph\u1EA9m...", 1, "w-64", "h-9", "pl-9", "pr-3", "text-sm", "border", "border-slate-200", "rounded-lg", "bg-white", "focus:outline-none", "focus:ring-2", "focus:ring-slate-900", "focus:border-transparent", "placeholder:text-slate-400", "transition-all", 3, "ngModelChange", "input", "ngModel"], [1, "h-9", "px-4", "text-sm", "font-medium", "text-slate-700", "bg-white", "border", "border-slate-200", "rounded-lg", "hover:bg-slate-50", "disabled:opacity-50", "disabled:cursor-not-allowed", "transition-colors", "flex", "items-center", "gap-2", 3, "click", "disabled"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"], [1, "overflow-x-auto"], ["mat-table", "", "matSort", "", 1, "w-full", 3, "dataSource"], ["matColumnDef", "stt"], ["mat-header-cell", "", "class", "!bg-slate-50 !text-slate-600 !text-xs !font-medium !uppercase tracking-wider !py-3 !px-4", 4, "matHeaderCellDef"], ["mat-cell", "", "class", "!py-3 !px-4 text-sm text-slate-600", 4, "matCellDef"], ["matColumnDef", "masp"], ["mat-header-cell", "", "mat-sort-header", "", "class", "!bg-slate-50 !text-slate-600 !text-xs !font-medium !uppercase tracking-wider !py-3 !px-4", 4, "matHeaderCellDef"], ["mat-cell", "", "class", "!py-3 !px-4", 4, "matCellDef"], ["matColumnDef", "title"], ["mat-header-cell", "", "mat-sort-header", "", "class", "!bg-slate-50 !text-slate-600 !text-xs !font-medium !uppercase tracking-wider !py-3 !px-4 !min-w-[200px]", 4, "matHeaderCellDef"], ["matColumnDef", "dvt"], ["matColumnDef", "giaSanpham"], ["mat-header-cell", "", "mat-sort-header", "", "class", "!bg-slate-50 !text-slate-600 !text-xs !font-medium !uppercase tracking-wider !py-3 !px-4 !text-right", 4, "matHeaderCellDef"], ["mat-cell", "", "class", "!py-3 !px-4 text-right", 4, "matCellDef"], ["matColumnDef", "tongSoluongNhan"], ["matColumnDef", "tongGiaTri"], ["matColumnDef", "soLanMua"], ["mat-header-cell", "", "mat-sort-header", "", "class", "!bg-slate-50 !text-slate-600 !text-xs !font-medium !uppercase tracking-wider !py-3 !px-4 !text-center", 4, "matHeaderCellDef"], ["mat-cell", "", "class", "!py-3 !px-4 text-center", 4, "matCellDef"], ["mat-header-row", "", 4, "matHeaderRowDef", "matHeaderRowDefSticky"], ["mat-row", "", "class", "hover:bg-slate-50 transition-colors", 4, "matRowDef", "matRowDefColumns"], ["class", "mat-row", 4, "matNoDataRow"], [1, "border-t", "border-slate-200"], ["showFirstLastButtons", "", 1, "!border-0", 3, "pageSizeOptions", "pageSize"], [1, "rounded-xl", "border", "border-slate-200", "bg-white", "p-4", "shadow-sm"], [1, "grid", "grid-cols-2", "gap-4", "text-center"], [1, "text-xs", "text-violet-600", "mb-1"], [1, "text-lg", "font-bold", "text-violet-700"], [1, "text-xs", "text-emerald-600", "mb-1"], [1, "text-lg", "font-bold", "text-emerald-700"], ["mat-header-cell", "", 1, "!bg-slate-50", "!text-slate-600", "!text-xs", "!font-medium", "!uppercase", "tracking-wider", "!py-3", "!px-4"], ["mat-cell", "", 1, "!py-3", "!px-4", "text-sm", "text-slate-600"], ["mat-header-cell", "", "mat-sort-header", "", 1, "!bg-slate-50", "!text-slate-600", "!text-xs", "!font-medium", "!uppercase", "tracking-wider", "!py-3", "!px-4"], ["mat-cell", "", 1, "!py-3", "!px-4"], [1, "inline-flex", "items-center", "px-2.5", "py-0.5", "rounded-md", "text-xs", "font-medium", "bg-slate-100", "text-slate-800"], ["mat-header-cell", "", "mat-sort-header", "", 1, "!bg-slate-50", "!text-slate-600", "!text-xs", "!font-medium", "!uppercase", "tracking-wider", "!py-3", "!px-4", "!min-w-[200px]"], [1, "text-sm", "font-medium", "text-slate-900", "line-clamp-2", 3, "matTooltip"], ["mat-header-cell", "", "mat-sort-header", "", 1, "!bg-slate-50", "!text-slate-600", "!text-xs", "!font-medium", "!uppercase", "tracking-wider", "!py-3", "!px-4", "!text-right"], ["mat-cell", "", 1, "!py-3", "!px-4", "text-right"], [1, "text-sm", "font-semibold", "text-amber-600"], [1, "text-sm", "font-semibold", "text-violet-600"], [1, "text-sm", "font-semibold", "text-emerald-600"], ["mat-header-cell", "", "mat-sort-header", "", 1, "!bg-slate-50", "!text-slate-600", "!text-xs", "!font-medium", "!uppercase", "tracking-wider", "!py-3", "!px-4", "!text-center"], ["mat-cell", "", 1, "!py-3", "!px-4", "text-center"], [1, "inline-flex", "items-center", "justify-center", "w-8", "h-8", "rounded-full", "text-xs", "font-semibold", "bg-slate-900", "text-white"], ["mat-header-row", ""], ["mat-row", "", 1, "hover:bg-slate-50", "transition-colors"], [1, "mat-row"], [1, "mat-cell", "!py-12", "text-center", "text-slate-500"], [1, "flex", "flex-col", "items-center", "gap-2"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-12", "h-12", "text-slate-300"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"], [1, "text-sm"], [1, "flex", "flex-col", "items-center", "text-center"], [1, "p-4", "rounded-full", "bg-slate-100", "mb-4"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-12", "h-12", "text-slate-400"], [1, "text-lg", "font-semibold", "text-slate-900", "mb-1"], [1, "text-sm", "text-slate-500", "max-w-sm"], [1, "flex", "items-start", "gap-4"], [1, "p-2", "rounded-full", "bg-red-100"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-5", "h-5", "text-red-600"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"], [1, "text-sm", "font-semibold", "text-red-800", "mb-1"], [1, "text-sm", "text-red-600"], [1, "px-3", "py-1.5", "text-sm", "font-medium", "text-red-700", "bg-red-100", "rounded-lg", "hover:bg-red-200", "transition-colors", 3, "click"], [1, "rounded-xl", "bg-white", "p-6", "shadow-xl", "flex", "flex-col", "items-center", "gap-4"], ["fill", "none", "viewBox", "0 0 24 24", 1, "animate-spin", "h-8", "w-8", "text-slate-900"], [1, "text-sm", "font-medium", "text-slate-700"]], template: function KhoiluongKhachhangComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 5)(1, "div", 6)(2, "div", 7)(3, "h1", 8);
      \u0275\u0275text(4, " Th\u1ED1ng K\xEA Kh\u1ED1i L\u01B0\u1EE3ng S\u1EA3n Ph\u1EA9m ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 9);
      \u0275\u0275text(6, " Th\u1ED1ng k\xEA t\u1ED5ng kh\u1ED1i l\u01B0\u1EE3ng s\u1EA3n ph\u1EA9m \u0111\xE3 b\xE1n cho kh\xE1ch h\xE0ng theo kho\u1EA3ng th\u1EDDi gian ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "div", 10)(8, "div", 11)(9, "div", 12)(10, "div", 13)(11, "label", 14);
      \u0275\u0275text(12, "Kh\xE1ch h\xE0ng");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "div", 15)(14, "input", 16, 0);
      \u0275\u0275twoWayListener("ngModelChange", function KhoiluongKhachhangComponent_Template_input_ngModelChange_14_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.searchKhachhang, $event) || (ctx.searchKhachhang = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275listener("input", function KhoiluongKhachhangComponent_Template_input_input_14_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.filterKhachhang());
      })("focus", function KhoiluongKhachhangComponent_Template_input_focus_14_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onFocusKhachhang());
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "mat-autocomplete", 17, 1);
      \u0275\u0275listener("optionSelected", function KhoiluongKhachhangComponent_Template_mat_autocomplete_optionSelected_17_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onKhachhangSelected($event));
      });
      \u0275\u0275repeaterCreate(19, KhoiluongKhachhangComponent_For_20_Template, 6, 4, "mat-option", 18, _forTrack0, false, KhoiluongKhachhangComponent_ForEmpty_21_Template, 2, 0, "mat-option", 19);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(22, "div", 20)(23, "label", 14);
      \u0275\u0275text(24, "T\u1EEB ng\xE0y");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "div", 15)(26, "input", 21);
      \u0275\u0275twoWayListener("ngModelChange", function KhoiluongKhachhangComponent_Template_input_ngModelChange_26_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.batdau, $event) || (ctx.batdau = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275element(27, "mat-datepicker-toggle", 22)(28, "mat-datepicker", null, 2);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(30, "div", 20)(31, "label", 14);
      \u0275\u0275text(32, "\u0110\u1EBFn ng\xE0y");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "div", 15)(34, "input", 21);
      \u0275\u0275twoWayListener("ngModelChange", function KhoiluongKhachhangComponent_Template_input_ngModelChange_34_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.ketthuc, $event) || (ctx.ketthuc = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275element(35, "mat-datepicker-toggle", 22)(36, "mat-datepicker", null, 3);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(38, "div", 20)(39, "label", 14);
      \u0275\u0275text(40, "Ch\u1ECDn nhanh");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(41, "button", 23)(42, "span", 24);
      \u0275\u0275text(43, "Kho\u1EA3ng th\u1EDDi gian");
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(44, "svg", 25);
      \u0275\u0275element(45, "path", 26);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(46, "mat-menu", 27, 4)(48, "button", 28);
      \u0275\u0275listener("click", function KhoiluongKhachhangComponent_Template_button_click_48_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.setToday());
      });
      \u0275\u0275text(49, "H\xF4m nay");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(50, "button", 28);
      \u0275\u0275listener("click", function KhoiluongKhachhangComponent_Template_button_click_50_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.setYesterday());
      });
      \u0275\u0275text(51, "H\xF4m qua");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(52, "button", 28);
      \u0275\u0275listener("click", function KhoiluongKhachhangComponent_Template_button_click_52_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.setThisWeek());
      });
      \u0275\u0275text(53, "Tu\u1EA7n n\xE0y");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(54, "button", 28);
      \u0275\u0275listener("click", function KhoiluongKhachhangComponent_Template_button_click_54_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.setLastWeek());
      });
      \u0275\u0275text(55, "Tu\u1EA7n tr\u01B0\u1EDBc");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(56, "button", 28);
      \u0275\u0275listener("click", function KhoiluongKhachhangComponent_Template_button_click_56_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.setThisMonth());
      });
      \u0275\u0275text(57, "Th\xE1ng n\xE0y");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(58, "button", 28);
      \u0275\u0275listener("click", function KhoiluongKhachhangComponent_Template_button_click_58_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.setLastMonth());
      });
      \u0275\u0275text(59, "Th\xE1ng tr\u01B0\u1EDBc");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(60, "button", 28);
      \u0275\u0275listener("click", function KhoiluongKhachhangComponent_Template_button_click_60_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.setThisQuarter());
      });
      \u0275\u0275text(61, "Qu\xFD n\xE0y");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(62, "button", 28);
      \u0275\u0275listener("click", function KhoiluongKhachhangComponent_Template_button_click_62_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.setThisYear());
      });
      \u0275\u0275text(63, "N\u0103m nay");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(64, "div", 20)(65, "label", 29);
      \u0275\u0275text(66, "Action");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(67, "button", 30);
      \u0275\u0275listener("click", function KhoiluongKhachhangComponent_Template_button_click_67_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.thongke());
      });
      \u0275\u0275template(68, KhoiluongKhachhangComponent_Conditional_68_Template, 5, 0)(69, KhoiluongKhachhangComponent_Conditional_69_Template, 4, 0);
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(70, KhoiluongKhachhangComponent_Conditional_70_Template, 12, 2, "div", 31);
      \u0275\u0275elementEnd()();
      \u0275\u0275template(71, KhoiluongKhachhangComponent_Conditional_71_Template, 105, 29)(72, KhoiluongKhachhangComponent_Conditional_72_Template, 9, 0, "div", 32)(73, KhoiluongKhachhangComponent_Conditional_73_Template, 12, 1, "div", 33)(74, KhoiluongKhachhangComponent_Conditional_74_Template, 7, 0, "div", 34);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      const autoKhachhang_r15 = \u0275\u0275reference(18);
      const pickerBatdau_r16 = \u0275\u0275reference(29);
      const pickerKetthuc_r17 = \u0275\u0275reference(37);
      const quickDateMenu_r18 = \u0275\u0275reference(47);
      \u0275\u0275advance(14);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchKhachhang);
      \u0275\u0275property("matAutocomplete", autoKhachhang_r15);
      \u0275\u0275advance(3);
      \u0275\u0275property("displayWith", ctx.displayKhachhang);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.filteredKhachhang());
      \u0275\u0275advance(7);
      \u0275\u0275property("matDatepicker", pickerBatdau_r16);
      \u0275\u0275twoWayProperty("ngModel", ctx.batdau);
      \u0275\u0275advance();
      \u0275\u0275property("for", pickerBatdau_r16);
      \u0275\u0275advance(7);
      \u0275\u0275property("matDatepicker", pickerKetthuc_r17);
      \u0275\u0275twoWayProperty("ngModel", ctx.ketthuc);
      \u0275\u0275advance();
      \u0275\u0275property("for", pickerKetthuc_r17);
      \u0275\u0275advance(6);
      \u0275\u0275property("matMenuTriggerFor", quickDateMenu_r18);
      \u0275\u0275advance(26);
      \u0275\u0275property("disabled", !ctx.selectedKhachhang || ctx.isLoading());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isLoading() ? 68 : 69);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.selectedKhachhang ? 70 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.result() ? 71 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.result() && !ctx.isLoading() && !ctx.error() ? 72 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.error() ? 73 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isLoading() ? 74 : -1);
    }
  }, dependencies: [
    CommonModule,
    DecimalPipe,
    FormsModule,
    DefaultValueAccessor,
    NgControlStatus,
    NgModel,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOption,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatNativeDateModule,
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
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatTooltip,
    MatSnackBarModule,
    MatMenuModule,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatAutocompleteModule,
    MatAutocomplete,
    MatAutocompleteTrigger
  ], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n}\n.line-clamp-2[_ngcontent-%COMP%] {\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n  .mat-mdc-table {\n  background: transparent !important;\n}\n  .mat-mdc-header-row {\n  background: transparent !important;\n}\n  .mat-mdc-row:hover {\n  background-color: rgb(248, 250, 252) !important;\n}\n  .mat-mdc-paginator {\n  background: transparent !important;\n}\n  .mat-mdc-autocomplete-panel {\n  border-radius: 0.5rem !important;\n  border: 1px solid rgb(226, 232, 240) !important;\n  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1) !important;\n}\n  .mat-mdc-option {\n  font-size: 0.875rem !important;\n}\n  .mat-mdc-menu-panel {\n  border-radius: 0.5rem !important;\n  border: 1px solid rgb(226, 232, 240) !important;\n}\n  .mat-mdc-menu-item {\n  font-size: 0.875rem !important;\n  min-height: 36px !important;\n}\n/*# sourceMappingURL=khoiluong-khachhang.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(KhoiluongKhachhangComponent, { className: "KhoiluongKhachhangComponent", filePath: "src/app/admin/thongke/khoiluong-khachhang/khoiluong-khachhang.component.ts", lineNumber: 543 });
})();
export {
  KhoiluongKhachhangComponent
};
//# sourceMappingURL=chunk-TVCVELQN.mjs.map
