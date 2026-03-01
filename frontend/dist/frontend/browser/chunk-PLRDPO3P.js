import {
  PhongbanService
} from "./chunk-OX7MOXV2.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-AGKEHWOL.js";
import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-NOVTUKZ4.js";
import "./chunk-SSKGL4JO.js";
import "./chunk-5F4VG3UZ.js";
import "./chunk-43IDDEVP.js";
import {
  MatChip,
  MatChipsModule
} from "./chunk-QD44HLKX.js";
import "./chunk-XDPJU2GK.js";
import "./chunk-SOPKJ4GV.js";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardSubtitle,
  MatCardTitle
} from "./chunk-SROAYAK3.js";
import {
  MatIcon,
  MatIconModule
} from "./chunk-ZRMLZ234.js";
import "./chunk-4ERWVCO4.js";
import "./chunk-U5KYXYKC.js";
import "./chunk-FZT2LBIG.js";
import {
  MatButton,
  MatButtonModule
} from "./chunk-BRETK2KI.js";
import "./chunk-EMBYIBW3.js";
import "./chunk-HCACJZKN.js";
import {
  CommonModule,
  DatePipe,
  NgForOf,
  NgIf
} from "./chunk-RKTFENMZ.js";
import {
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-RBDY2J7V.js";
import "./chunk-E3MB3462.js";
import {
  __async
} from "./chunk-SXK72SKC.js";

// src/app/admin/phongban/detailphongban/detailphongban.component.ts
function DetailPhongbanComponent_mat_card_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card")(1, "mat-card-content", 2);
    \u0275\u0275element(2, "mat-spinner", 3);
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "\u0110ang t\u1EA3i d\u1EEF li\u1EC7u...");
    \u0275\u0275elementEnd()()();
  }
}
function DetailPhongbanComponent_mat_card_2_div_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "mat-icon");
    \u0275\u0275text(2, "account_tree");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 9)(4, "span", 10);
    \u0275\u0275text(5, "Thu\u1ED9c");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 11);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(((tmp_2_0 = ctx_r1.phongban()) == null ? null : tmp_2_0.parent == null ? null : tmp_2_0.parent.ten) || "N/A");
  }
}
function DetailPhongbanComponent_mat_card_2_div_58_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15)(1, "label");
    \u0275\u0275text(2, "Ph\xF2ng ban cha:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2("", (tmp_2_0 = ctx_r1.phongban()) == null ? null : tmp_2_0.parent == null ? null : tmp_2_0.parent.ma, " - ", (tmp_2_0 = ctx_r1.phongban()) == null ? null : tmp_2_0.parent == null ? null : tmp_2_0.parent.ten, "");
  }
}
function DetailPhongbanComponent_mat_card_2_div_64_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24)(1, "label");
    \u0275\u0275text(2, "M\xF4 t\u1EA3:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate((tmp_2_0 = ctx_r1.phongban()) == null ? null : tmp_2_0.moTa);
  }
}
function DetailPhongbanComponent_mat_card_2_div_65_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27)(1, "mat-icon");
    \u0275\u0275text(2, "person");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 28)(4, "span", 29);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 30);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const nv_r3 = ctx.$implicit;
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(nv_r3["ten"] || nv_r3["hoTen"] || "N/A");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(nv_r3["email"] || "Ch\u01B0a c\xF3 email");
  }
}
function DetailPhongbanComponent_mat_card_2_div_65_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "h3")(2, "mat-icon");
    \u0275\u0275text(3, "people");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 25);
    \u0275\u0275template(6, DetailPhongbanComponent_mat_card_2_div_65_div_6_Template, 8, 2, "div", 26);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_2_0;
    let tmp_3_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" Danh s\xE1ch nh\xE2n vi\xEAn (", ((tmp_2_0 = ctx_r1.phongban()) == null ? null : tmp_2_0.nhanviens == null ? null : tmp_2_0.nhanviens.length) || 0, ") ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", (tmp_3_0 = ctx_r1.phongban()) == null ? null : tmp_3_0.nhanviens);
  }
}
function DetailPhongbanComponent_mat_card_2_div_67_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31)(1, "mat-icon");
    \u0275\u0275text(2, "schedule");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "date");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("T\u1EA1o l\xFAc: ", \u0275\u0275pipeBind2(5, 1, (tmp_2_0 = ctx_r1.phongban()) == null ? null : tmp_2_0.createdAt, "dd/MM/yyyy HH:mm"), "");
  }
}
function DetailPhongbanComponent_mat_card_2_div_68_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31)(1, "mat-icon");
    \u0275\u0275text(2, "update");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "date");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("C\u1EADp nh\u1EADt: ", \u0275\u0275pipeBind2(5, 1, (tmp_2_0 = ctx_r1.phongban()) == null ? null : tmp_2_0.updatedAt, "dd/MM/yyyy HH:mm"), "");
  }
}
function DetailPhongbanComponent_mat_card_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-card")(1, "mat-card-header")(2, "div", 4)(3, "div", 5)(4, "mat-icon", 6);
    \u0275\u0275text(5, "business");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div")(7, "mat-card-title");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "mat-card-subtitle");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "mat-chip");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "mat-card-content")(14, "div", 7)(15, "div", 8)(16, "mat-icon");
    \u0275\u0275text(17, "layers");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 9)(19, "span", 10);
    \u0275\u0275text(20, "C\u1EA5p");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "span", 11);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(23, "div", 8)(24, "mat-icon");
    \u0275\u0275text(25, "people");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "div", 9)(27, "span", 10);
    \u0275\u0275text(28, "Nh\xE2n vi\xEAn");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "span", 11);
    \u0275\u0275text(30);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(31, DetailPhongbanComponent_mat_card_2_div_31_Template, 8, 1, "div", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "div", 13)(33, "h3")(34, "mat-icon");
    \u0275\u0275text(35, "info");
    \u0275\u0275elementEnd();
    \u0275\u0275text(36, " Th\xF4ng tin chi ti\u1EBFt ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "div", 14)(38, "div", 15)(39, "label");
    \u0275\u0275text(40, "M\xE3 ph\xF2ng ban:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "span");
    \u0275\u0275text(42);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(43, "div", 15)(44, "label");
    \u0275\u0275text(45, "T\xEAn ph\xF2ng ban:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "span");
    \u0275\u0275text(47);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(48, "div", 15)(49, "label");
    \u0275\u0275text(50, "Lo\u1EA1i:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "span");
    \u0275\u0275text(52);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(53, "div", 15)(54, "label");
    \u0275\u0275text(55, "C\u1EA5p:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(56, "span");
    \u0275\u0275text(57);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(58, DetailPhongbanComponent_mat_card_2_div_58_Template, 5, 2, "div", 16);
    \u0275\u0275elementStart(59, "div", 15)(60, "label");
    \u0275\u0275text(61, "S\u1ED1 nh\xE2n vi\xEAn:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(62, "span");
    \u0275\u0275text(63);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(64, DetailPhongbanComponent_mat_card_2_div_64_Template, 5, 1, "div", 17);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(65, DetailPhongbanComponent_mat_card_2_div_65_Template, 7, 2, "div", 18);
    \u0275\u0275elementStart(66, "div", 19);
    \u0275\u0275template(67, DetailPhongbanComponent_mat_card_2_div_67_Template, 6, 4, "div", 20)(68, DetailPhongbanComponent_mat_card_2_div_68_Template, 6, 4, "div", 20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(69, "mat-card-actions")(70, "button", 21);
    \u0275\u0275listener("click", function DetailPhongbanComponent_mat_card_2_Template_button_click_70_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.goBack());
    });
    \u0275\u0275elementStart(71, "mat-icon");
    \u0275\u0275text(72, "arrow_back");
    \u0275\u0275elementEnd();
    \u0275\u0275text(73, " Quay l\u1EA1i ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(74, "button", 22);
    \u0275\u0275listener("click", function DetailPhongbanComponent_mat_card_2_Template_button_click_74_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.edit());
    });
    \u0275\u0275elementStart(75, "mat-icon");
    \u0275\u0275text(76, "edit");
    \u0275\u0275elementEnd();
    \u0275\u0275text(77, " Ch\u1EC9nh s\u1EEDa ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(78, "button", 23);
    \u0275\u0275listener("click", function DetailPhongbanComponent_mat_card_2_Template_button_click_78_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.confirmDelete());
    });
    \u0275\u0275elementStart(79, "mat-icon");
    \u0275\u0275text(80, "delete");
    \u0275\u0275elementEnd();
    \u0275\u0275text(81, " X\xF3a ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_1_0;
    let tmp_2_0;
    let tmp_3_0;
    let tmp_4_0;
    let tmp_5_0;
    let tmp_6_0;
    let tmp_7_0;
    let tmp_8_0;
    let tmp_9_0;
    let tmp_10_0;
    let tmp_11_0;
    let tmp_12_0;
    let tmp_13_0;
    let tmp_14_0;
    let tmp_15_0;
    let tmp_16_0;
    let tmp_17_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate((tmp_1_0 = ctx_r1.phongban()) == null ? null : tmp_1_0.ten);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((tmp_2_0 = ctx_r1.phongban()) == null ? null : tmp_2_0.ma);
    \u0275\u0275advance();
    \u0275\u0275styleProp("background-color", ctx_r1.getLoaiColor(((tmp_3_0 = ctx_r1.phongban()) == null ? null : tmp_3_0.loai) || ""));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getLoaiLabel(((tmp_4_0 = ctx_r1.phongban()) == null ? null : tmp_4_0.loai) || ""), " ");
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate((tmp_5_0 = ctx_r1.phongban()) == null ? null : tmp_5_0.level);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(((tmp_6_0 = ctx_r1.phongban()) == null ? null : tmp_6_0.nhanviens == null ? null : tmp_6_0.nhanviens.length) || 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_7_0 = ctx_r1.phongban()) == null ? null : tmp_7_0.parentId);
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate((tmp_8_0 = ctx_r1.phongban()) == null ? null : tmp_8_0.ma);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate((tmp_9_0 = ctx_r1.phongban()) == null ? null : tmp_9_0.ten);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.getLoaiLabel(((tmp_10_0 = ctx_r1.phongban()) == null ? null : tmp_10_0.loai) || ""));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("C\u1EA5p ", (tmp_11_0 = ctx_r1.phongban()) == null ? null : tmp_11_0.level, "");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_12_0 = ctx_r1.phongban()) == null ? null : tmp_12_0.parent);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", ((tmp_13_0 = ctx_r1.phongban()) == null ? null : tmp_13_0.nhanviens == null ? null : tmp_13_0.nhanviens.length) || 0, " ng\u01B0\u1EDDi");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_14_0 = ctx_r1.phongban()) == null ? null : tmp_14_0.moTa);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ((tmp_15_0 = ctx_r1.phongban()) == null ? null : tmp_15_0.nhanviens) && (((tmp_15_0 = ctx_r1.phongban()) == null ? null : tmp_15_0.nhanviens == null ? null : tmp_15_0.nhanviens.length) || 0) > 0);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", (tmp_16_0 = ctx_r1.phongban()) == null ? null : tmp_16_0.createdAt);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_17_0 = ctx_r1.phongban()) == null ? null : tmp_17_0.updatedAt);
  }
}
function DetailPhongbanComponent_mat_card_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-card")(1, "mat-card-content", 32)(2, "mat-icon");
    \u0275\u0275text(3, "error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h2");
    \u0275\u0275text(5, "Kh\xF4ng t\xECm th\u1EA5y ph\xF2ng ban");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 33);
    \u0275\u0275listener("click", function DetailPhongbanComponent_mat_card_3_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.goBack());
    });
    \u0275\u0275elementStart(9, "mat-icon");
    \u0275\u0275text(10, "arrow_back");
    \u0275\u0275elementEnd();
    \u0275\u0275text(11, " Quay l\u1EA1i danh s\xE1ch ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1("ID: ", ctx_r1.id, "");
  }
}
var DetailPhongbanComponent = class _DetailPhongbanComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  phongbanService = inject(PhongbanService);
  id = "";
  phongban = signal(null);
  loading = signal(false);
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id") || "";
    if (this.id) {
      this.loadPhongban();
    }
  }
  loadPhongban() {
    return __async(this, null, function* () {
      try {
        this.loading.set(true);
        const data = yield this.phongbanService.getPhongbanById(this.id);
        this.phongban.set(data);
      } catch (error) {
        console.error("Error loading phongban:", error);
      } finally {
        this.loading.set(false);
      }
    });
  }
  getLoaiLabel(loai) {
    const labels = {
      "KINH_DOANH": "Kinh Doanh",
      "QUAN_LY": "Qu\u1EA3n L\xFD",
      "HANH_CHINH": "H\xE0nh Ch\xEDnh",
      "KY_THUAT": "K\u1EF9 Thu\u1EADt",
      "TAI_CHINH": "T\xE0i Ch\xEDnh",
      "NHAN_SU": "Nh\xE2n S\u1EF1",
      "MARKETING": "Marketing",
      "KHAC": "Kh\xE1c"
    };
    return labels[loai] || loai;
  }
  getLoaiColor(loai) {
    const colors = {
      "KINH_DOANH": "#4CAF50",
      "QUAN_LY": "#2196F3",
      "HANH_CHINH": "#FF9800",
      "KY_THUAT": "#9C27B0",
      "TAI_CHINH": "#F44336",
      "NHAN_SU": "#00BCD4",
      "MARKETING": "#E91E63",
      "KHAC": "#757575"
    };
    return colors[loai] || "#757575";
  }
  goBack() {
    this.router.navigate(["/admin/phongban/list"]);
  }
  edit() {
    this.router.navigate(["/admin/phongban/edit", this.id]);
  }
  confirmDelete() {
    return __async(this, null, function* () {
      if (!this.id)
        return;
      const confirmed = confirm(`B\u1EA1n c\xF3 ch\u1EAFc ch\u1EAFn mu\u1ED1n x\xF3a ph\xF2ng ban "${this.phongban()?.ten}"?

H\xE0nh \u0111\u1ED9ng n\xE0y kh\xF4ng th\u1EC3 ho\xE0n t\xE1c!`);
      if (confirmed) {
        try {
          yield this.phongbanService.deletePhongban(this.id);
          this.router.navigate(["/admin/phongban/list"]);
        } catch (error) {
          console.error("Error deleting phongban:", error);
        }
      }
    });
  }
  static \u0275fac = function DetailPhongbanComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DetailPhongbanComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DetailPhongbanComponent, selectors: [["app-detailphongban"]], decls: 4, vars: 3, consts: [[1, "container"], [4, "ngIf"], [1, "loading-container"], ["diameter", "40"], [1, "header-content"], [1, "title-section"], [1, "header-icon"], [1, "stats-grid"], [1, "stat-card"], [1, "stat-content"], [1, "stat-label"], [1, "stat-value"], ["class", "stat-card", 4, "ngIf"], [1, "detail-section"], [1, "detail-grid"], [1, "detail-item"], ["class", "detail-item", 4, "ngIf"], ["class", "detail-item full-width", 4, "ngIf"], ["class", "detail-section", 4, "ngIf"], [1, "metadata"], ["class", "metadata-item", 4, "ngIf"], ["mat-raised-button", "", 3, "click"], ["mat-raised-button", "", "color", "accent", 3, "click"], ["mat-raised-button", "", "color", "warn", 3, "click"], [1, "detail-item", "full-width"], [1, "employees-list"], ["class", "employee-item", 4, "ngFor", "ngForOf"], [1, "employee-item"], [1, "employee-info"], [1, "employee-name"], [1, "employee-details"], [1, "metadata-item"], [1, "error-container"], ["mat-raised-button", "", "color", "primary", 3, "click"]], template: function DetailPhongbanComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275template(1, DetailPhongbanComponent_mat_card_1_Template, 5, 0, "mat-card", 1)(2, DetailPhongbanComponent_mat_card_2_Template, 82, 18, "mat-card", 1)(3, DetailPhongbanComponent_mat_card_3_Template, 12, 1, "mat-card", 1);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.loading());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading() && ctx.phongban());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading() && !ctx.phongban());
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, DatePipe, MatCardModule, MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle, MatButtonModule, MatButton, MatIconModule, MatIcon, MatProgressSpinnerModule, MatProgressSpinner, MatChipsModule, MatChip], styles: ["\n\n.container[_ngcontent-%COMP%] {\n  padding: 24px;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.loading-container[_ngcontent-%COMP%], \n.error-container[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 60px 20px;\n}\n.loading-container[_ngcontent-%COMP%]   mat-spinner[_ngcontent-%COMP%] {\n  margin: 0 auto 20px;\n}\n.error-container[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 72px;\n  width: 72px;\n  height: 72px;\n  color: #999;\n  margin-bottom: 20px;\n}\n.error-container[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 20px 0 10px;\n  color: #333;\n}\n.error-container[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  margin-top: 20px;\n}\n.header-content[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  width: 100%;\n  padding: 16px 0;\n}\n.title-section[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n.header-icon[_ngcontent-%COMP%] {\n  font-size: 40px;\n  width: 40px;\n  height: 40px;\n  color: #1976d2;\n}\n.stats-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 16px;\n  margin: 20px 0;\n}\n.stat-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 20px;\n  background: #f5f5f5;\n  border-radius: 8px;\n  border-left: 4px solid #1976d2;\n}\n.stat-card[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 32px;\n  width: 32px;\n  height: 32px;\n  color: #1976d2;\n}\n.stat-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.stat-label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #666;\n  text-transform: uppercase;\n  font-weight: 500;\n}\n.stat-value[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: 600;\n  color: #333;\n}\n.detail-section[_ngcontent-%COMP%] {\n  margin: 30px 0;\n}\n.detail-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-bottom: 20px;\n  color: #333;\n  font-size: 18px;\n  font-weight: 500;\n  border-bottom: 2px solid #e0e0e0;\n  padding-bottom: 10px;\n}\n.detail-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #1976d2;\n}\n.detail-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 20px;\n}\n.detail-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.detail-item.full-width[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n}\n.detail-item[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #666;\n  font-size: 14px;\n}\n.detail-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 16px;\n  color: #333;\n}\n.employees-list[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));\n  gap: 12px;\n}\n.employee-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 12px;\n  background: #fafafa;\n  border-radius: 8px;\n  border: 1px solid #e0e0e0;\n  transition: all 0.2s;\n}\n.employee-item[_ngcontent-%COMP%]:hover {\n  background: #f5f5f5;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.employee-item[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #1976d2;\n}\n.employee-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  flex: 1;\n}\n.employee-name[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #333;\n}\n.employee-details[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #666;\n}\n.metadata[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 20px;\n  margin-top: 30px;\n  padding-top: 20px;\n  border-top: 1px solid #e0e0e0;\n}\n.metadata-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  color: #666;\n  font-size: 14px;\n}\n.metadata-item[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\nmat-card-actions[_ngcontent-%COMP%] {\n  padding: 16px;\n  display: flex;\n  gap: 12px;\n  justify-content: flex-end;\n}\n@media (max-width: 768px) {\n  .detail-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .header-content[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 12px;\n  }\n  .metadata[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 12px;\n  }\n}\n/*# sourceMappingURL=detailphongban.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DetailPhongbanComponent, { className: "DetailPhongbanComponent", filePath: "src/app/admin/phongban/detailphongban/detailphongban.component.ts", lineNumber: 407 });
})();
export {
  DetailPhongbanComponent
};
//# sourceMappingURL=chunk-PLRDPO3P.js.map
