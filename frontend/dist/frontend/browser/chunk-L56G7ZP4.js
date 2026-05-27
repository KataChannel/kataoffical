import {
  GioiTinhLabels,
  NhanvienService,
  TrangThaiNhanvienLabels
} from "./chunk-IYLA2SGZ.js";
import "./chunk-CVAZHUNB.js";
import "./chunk-LIKOVN7R.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-2GXGFE2W.js";
import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-DGYBLSTA.js";
import "./chunk-F5CW4EPT.js";
import "./chunk-KFQ5QPP6.js";
import "./chunk-6ECEDFXD.js";
import {
  MatDivider,
  MatDividerModule
} from "./chunk-PPCKXQPD.js";
import {
  MatDialog
} from "./chunk-Y6PF6L3J.js";
import {
  MatSnackBar
} from "./chunk-3D4DVDG5.js";
import {
  MatChip,
  MatChipSet,
  MatChipsModule
} from "./chunk-4Q2WCKDS.js";
import "./chunk-TMSN764N.js";
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardTitle
} from "./chunk-M6ODRG7P.js";
import {
  MatIcon,
  MatIconModule
} from "./chunk-GSONKL3O.js";
import "./chunk-DKLGAVRA.js";
import "./chunk-6PYLDKWR.js";
import {
  MatButton,
  MatButtonModule,
  MatIconButton
} from "./chunk-FL6G6YYX.js";
import "./chunk-EPU6HK6I.js";
import "./chunk-XM7PTE63.js";
import {
  CommonModule
} from "./chunk-TAI2MURD.js";
import {
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-SEHLAVZZ.js";
import "./chunk-E3MB3462.js";
import {
  __async
} from "./chunk-SXK72SKC.js";

// src/app/admin/nhanvien/detailnhanvien/detailnhanvien.component.ts
function DetailNhanvienComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275element(1, "mat-spinner", 3);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "\u0110ang t\u1EA3i th\xF4ng tin nh\xE2n vi\xEAn...");
    \u0275\u0275elementEnd()();
  }
}
function DetailNhanvienComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-card", 2)(1, "mat-card-content")(2, "div", 4)(3, "mat-icon");
    \u0275\u0275text(4, "error_outline");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "h2");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 5);
    \u0275\u0275listener("click", function DetailNhanvienComponent_Conditional_2_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.goBack());
    });
    \u0275\u0275elementStart(8, "mat-icon");
    \u0275\u0275text(9, "arrow_back");
    \u0275\u0275elementEnd();
    \u0275\u0275text(10, " Quay l\u1EA1i danh s\xE1ch ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.error());
  }
}
function DetailNhanvienComponent_Conditional_3_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 39);
    \u0275\u0275listener("click", function DetailNhanvienComponent_Conditional_3_Conditional_11_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.unlinkUser());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "link_off");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " H\u1EE7y li\xEAn k\u1EBFt ");
    \u0275\u0275elementEnd();
  }
}
function DetailNhanvienComponent_Conditional_3_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 40);
    \u0275\u0275listener("click", function DetailNhanvienComponent_Conditional_3_Conditional_12_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.linkUser());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "link");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Li\xEAn k\u1EBFt t\xE0i kho\u1EA3n ");
    \u0275\u0275elementEnd();
  }
}
function DetailNhanvienComponent_Conditional_3_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-chip", 16)(1, "mat-icon");
    \u0275\u0275text(2, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " \u0110ang ho\u1EA1t \u0111\u1ED9ng ");
    \u0275\u0275elementEnd();
  }
}
function DetailNhanvienComponent_Conditional_3_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-chip", 17)(1, "mat-icon");
    \u0275\u0275text(2, "cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Kh\xF4ng ho\u1EA1t \u0111\u1ED9ng ");
    \u0275\u0275elementEnd();
  }
}
function DetailNhanvienComponent_Conditional_3_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.calculateAge(ctx_r1.nhanvien().ngaySinh), " tu\u1ED5i ");
  }
}
function DetailNhanvienComponent_Conditional_3_Conditional_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " N/A ");
  }
}
function DetailNhanvienComponent_Conditional_3_Conditional_70_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275textInterpolate1(" ", (tmp_2_0 = ctx_r1.nhanvien().phongban) == null ? null : tmp_2_0.ten, " ");
  }
}
function DetailNhanvienComponent_Conditional_3_Conditional_71_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Ch\u01B0a c\xF3 ");
  }
}
function DetailNhanvienComponent_Conditional_3_Conditional_144_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275textInterpolate1(" ", (tmp_2_0 = ctx_r1.nhanvien().phongban) == null ? null : tmp_2_0.ten, " ");
  }
}
function DetailNhanvienComponent_Conditional_3_Conditional_145_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Ch\u01B0a c\xF3 ");
  }
}
function DetailNhanvienComponent_Conditional_3_Conditional_176_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-chip", 32)(1, "mat-icon");
    \u0275\u0275text(2, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " \u0110\xE3 li\xEAn k\u1EBFt ");
    \u0275\u0275elementEnd();
  }
}
function DetailNhanvienComponent_Conditional_3_Conditional_177_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-chip", 33)(1, "mat-icon");
    \u0275\u0275text(2, "cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Ch\u01B0a li\xEAn k\u1EBFt ");
    \u0275\u0275elementEnd();
  }
}
function DetailNhanvienComponent_Conditional_3_Conditional_232_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card", 36)(1, "mat-card-header")(2, "mat-card-title")(3, "mat-icon");
    \u0275\u0275text(4, "note");
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " Ghi ch\xFA ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "mat-card-content")(7, "p");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r1.nhanvien().ghiChu);
  }
}
function DetailNhanvienComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 6)(1, "div", 7)(2, "button", 8);
    \u0275\u0275listener("click", function DetailNhanvienComponent_Conditional_3_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.goBack());
    });
    \u0275\u0275elementStart(3, "mat-icon");
    \u0275\u0275text(4, "arrow_back");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 9)(6, "h1");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 10);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "div", 11);
    \u0275\u0275template(11, DetailNhanvienComponent_Conditional_3_Conditional_11_Template, 4, 0, "button", 12)(12, DetailNhanvienComponent_Conditional_3_Conditional_12_Template, 4, 0, "button", 13);
    \u0275\u0275elementStart(13, "button", 5);
    \u0275\u0275listener("click", function DetailNhanvienComponent_Conditional_3_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.editNhanvien());
    });
    \u0275\u0275elementStart(14, "mat-icon");
    \u0275\u0275text(15, "edit");
    \u0275\u0275elementEnd();
    \u0275\u0275text(16, " Ch\u1EC9nh s\u1EEDa ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "button", 14);
    \u0275\u0275listener("click", function DetailNhanvienComponent_Conditional_3_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.confirmDelete());
    });
    \u0275\u0275elementStart(18, "mat-icon");
    \u0275\u0275text(19, "delete");
    \u0275\u0275elementEnd();
    \u0275\u0275text(20, " X\xF3a ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(21, "div", 15)(22, "mat-chip-set")(23, "mat-chip")(24, "mat-icon");
    \u0275\u0275text(25, "info");
    \u0275\u0275elementEnd();
    \u0275\u0275text(26);
    \u0275\u0275elementEnd();
    \u0275\u0275template(27, DetailNhanvienComponent_Conditional_3_Conditional_27_Template, 4, 0, "mat-chip", 16)(28, DetailNhanvienComponent_Conditional_3_Conditional_28_Template, 4, 0, "mat-chip", 17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "div", 18)(30, "mat-card", 19)(31, "mat-card-content")(32, "div", 20)(33, "mat-icon");
    \u0275\u0275text(34, "cake");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "div", 21)(36, "div", 22);
    \u0275\u0275text(37, "Tu\u1ED5i");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "div", 23);
    \u0275\u0275template(39, DetailNhanvienComponent_Conditional_3_Conditional_39_Template, 1, 1)(40, DetailNhanvienComponent_Conditional_3_Conditional_40_Template, 1, 0);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(41, "mat-card", 19)(42, "mat-card-content")(43, "div", 24)(44, "mat-icon");
    \u0275\u0275text(45, "work_history");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(46, "div", 21)(47, "div", 22);
    \u0275\u0275text(48, "Th\u1EDDi gian l\xE0m vi\u1EC7c");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "div", 23);
    \u0275\u0275text(50);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(51, "mat-card", 19)(52, "mat-card-content")(53, "div", 25)(54, "mat-icon");
    \u0275\u0275text(55, "payments");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(56, "div", 21)(57, "div", 22);
    \u0275\u0275text(58, "T\u1ED5ng l\u01B0\u01A1ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(59, "div", 23);
    \u0275\u0275text(60);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(61, "mat-card", 19)(62, "mat-card-content")(63, "div", 26)(64, "mat-icon");
    \u0275\u0275text(65, "business");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(66, "div", 21)(67, "div", 22);
    \u0275\u0275text(68, "Ph\xF2ng ban");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(69, "div", 23);
    \u0275\u0275template(70, DetailNhanvienComponent_Conditional_3_Conditional_70_Template, 1, 1)(71, DetailNhanvienComponent_Conditional_3_Conditional_71_Template, 1, 0);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(72, "div", 27)(73, "mat-card", 28)(74, "mat-card-header")(75, "mat-card-title")(76, "mat-icon");
    \u0275\u0275text(77, "person");
    \u0275\u0275elementEnd();
    \u0275\u0275text(78, " Th\xF4ng tin c\u01A1 b\u1EA3n ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(79, "mat-card-content")(80, "div", 29)(81, "div", 30);
    \u0275\u0275text(82, "M\xE3 nh\xE2n vi\xEAn:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(83, "div", 31);
    \u0275\u0275text(84);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(85, "mat-divider");
    \u0275\u0275elementStart(86, "div", 29)(87, "div", 30);
    \u0275\u0275text(88, "H\u1ECD v\xE0 t\xEAn:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(89, "div", 31);
    \u0275\u0275text(90);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(91, "mat-divider");
    \u0275\u0275elementStart(92, "div", 29)(93, "div", 30);
    \u0275\u0275text(94, "Gi\u1EDBi t\xEDnh:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(95, "div", 31);
    \u0275\u0275text(96);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(97, "mat-divider");
    \u0275\u0275elementStart(98, "div", 29)(99, "div", 30);
    \u0275\u0275text(100, "Ng\xE0y sinh:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(101, "div", 31);
    \u0275\u0275text(102);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(103, "mat-divider");
    \u0275\u0275elementStart(104, "div", 29)(105, "div", 30);
    \u0275\u0275text(106, "CMND/CCCD:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(107, "div", 31);
    \u0275\u0275text(108);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(109, "mat-divider");
    \u0275\u0275elementStart(110, "div", 29)(111, "div", 30);
    \u0275\u0275text(112, "S\u1ED1 \u0111i\u1EC7n tho\u1EA1i:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(113, "div", 31);
    \u0275\u0275text(114);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(115, "mat-divider");
    \u0275\u0275elementStart(116, "div", 29)(117, "div", 30);
    \u0275\u0275text(118, "Email:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(119, "div", 31);
    \u0275\u0275text(120);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(121, "mat-divider");
    \u0275\u0275elementStart(122, "div", 29)(123, "div", 30);
    \u0275\u0275text(124, "Qu\xEA qu\xE1n:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(125, "div", 31);
    \u0275\u0275text(126);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(127, "mat-divider");
    \u0275\u0275elementStart(128, "div", 29)(129, "div", 30);
    \u0275\u0275text(130, "\u0110\u1ECBa ch\u1EC9 hi\u1EC7n t\u1EA1i:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(131, "div", 31);
    \u0275\u0275text(132);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(133, "mat-card", 28)(134, "mat-card-header")(135, "mat-card-title")(136, "mat-icon");
    \u0275\u0275text(137, "work");
    \u0275\u0275elementEnd();
    \u0275\u0275text(138, " Th\xF4ng tin c\xF4ng vi\u1EC7c ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(139, "mat-card-content")(140, "div", 29)(141, "div", 30);
    \u0275\u0275text(142, "Ph\xF2ng ban:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(143, "div", 31);
    \u0275\u0275template(144, DetailNhanvienComponent_Conditional_3_Conditional_144_Template, 1, 1)(145, DetailNhanvienComponent_Conditional_3_Conditional_145_Template, 1, 0);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(146, "mat-divider");
    \u0275\u0275elementStart(147, "div", 29)(148, "div", 30);
    \u0275\u0275text(149, "Ch\u1EE9c v\u1EE5:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(150, "div", 31);
    \u0275\u0275text(151);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(152, "mat-divider");
    \u0275\u0275elementStart(153, "div", 29)(154, "div", 30);
    \u0275\u0275text(155, "V\u1ECB tr\xED:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(156, "div", 31);
    \u0275\u0275text(157);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(158, "mat-divider");
    \u0275\u0275elementStart(159, "div", 29)(160, "div", 30);
    \u0275\u0275text(161, "Ng\xE0y v\xE0o l\xE0m:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(162, "div", 31);
    \u0275\u0275text(163);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(164, "mat-divider");
    \u0275\u0275elementStart(165, "div", 29)(166, "div", 30);
    \u0275\u0275text(167, "Tr\u1EA1ng th\xE1i:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(168, "div", 31)(169, "mat-chip");
    \u0275\u0275text(170);
    \u0275\u0275elementEnd()()();
    \u0275\u0275element(171, "mat-divider");
    \u0275\u0275elementStart(172, "div", 29)(173, "div", 30);
    \u0275\u0275text(174, "T\xE0i kho\u1EA3n li\xEAn k\u1EBFt:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(175, "div", 31);
    \u0275\u0275template(176, DetailNhanvienComponent_Conditional_3_Conditional_176_Template, 4, 0, "mat-chip", 32)(177, DetailNhanvienComponent_Conditional_3_Conditional_177_Template, 4, 0, "mat-chip", 33);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(178, "mat-card", 28)(179, "mat-card-header")(180, "mat-card-title")(181, "mat-icon");
    \u0275\u0275text(182, "attach_money");
    \u0275\u0275elementEnd();
    \u0275\u0275text(183, " Th\xF4ng tin l\u01B0\u01A1ng ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(184, "mat-card-content")(185, "div", 29)(186, "div", 30);
    \u0275\u0275text(187, "L\u01B0\u01A1ng c\u01A1 b\u1EA3n:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(188, "div", 34);
    \u0275\u0275text(189);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(190, "mat-divider");
    \u0275\u0275elementStart(191, "div", 29)(192, "div", 30);
    \u0275\u0275text(193, "Ph\u1EE5 c\u1EA5p:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(194, "div", 34);
    \u0275\u0275text(195);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(196, "mat-divider");
    \u0275\u0275elementStart(197, "div", 29)(198, "div", 30);
    \u0275\u0275text(199, "H\u1EC7 s\u1ED1 l\u01B0\u01A1ng:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(200, "div", 31);
    \u0275\u0275text(201);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(202, "mat-divider");
    \u0275\u0275elementStart(203, "div", 35)(204, "div", 30);
    \u0275\u0275text(205, "T\u1ED5ng l\u01B0\u01A1ng:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(206, "div", 34);
    \u0275\u0275text(207);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(208, "mat-card", 28)(209, "mat-card-header")(210, "mat-card-title")(211, "mat-icon");
    \u0275\u0275text(212, "account_balance");
    \u0275\u0275elementEnd();
    \u0275\u0275text(213, " Th\xF4ng tin ng\xE2n h\xE0ng ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(214, "mat-card-content")(215, "div", 29)(216, "div", 30);
    \u0275\u0275text(217, "S\u1ED1 t\xE0i kho\u1EA3n:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(218, "div", 31);
    \u0275\u0275text(219);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(220, "mat-divider");
    \u0275\u0275elementStart(221, "div", 29)(222, "div", 30);
    \u0275\u0275text(223, "Ng\xE2n h\xE0ng:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(224, "div", 31);
    \u0275\u0275text(225);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(226, "mat-divider");
    \u0275\u0275elementStart(227, "div", 29)(228, "div", 30);
    \u0275\u0275text(229, "Chi nh\xE1nh:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(230, "div", 31);
    \u0275\u0275text(231);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275template(232, DetailNhanvienComponent_Conditional_3_Conditional_232_Template, 9, 1, "mat-card", 36);
    \u0275\u0275elementStart(233, "mat-card", 37)(234, "mat-card-content")(235, "div", 38)(236, "mat-icon");
    \u0275\u0275text(237, "access_time");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(238, "span");
    \u0275\u0275text(239);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(240, "div", 38)(241, "mat-icon");
    \u0275\u0275text(242, "update");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(243, "span");
    \u0275\u0275text(244);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_10_0;
    let tmp_20_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r1.nhanvien().hoTen);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.nhanvien().maNV);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.nhanvien().userId ? 11 : 12);
    \u0275\u0275advance(12);
    \u0275\u0275styleProp("background-color", ctx_r1.getTrangThaiColor(ctx_r1.nhanvien().trangThai));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.getTrangThaiLabel(ctx_r1.nhanvien().trangThai), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.nhanvien().isActive ? 27 : 28);
    \u0275\u0275advance(12);
    \u0275\u0275conditional(ctx_r1.calculateAge(ctx_r1.nhanvien().ngaySinh) ? 39 : 40);
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate(ctx_r1.calculateWorkDuration(ctx_r1.nhanvien().ngayVaoLam));
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate1("", ctx_r1.formatCurrency(ctx_r1.getTotalSalary(ctx_r1.nhanvien())), " VN\u0110");
    \u0275\u0275advance(10);
    \u0275\u0275conditional(((tmp_10_0 = ctx_r1.nhanvien().phongban) == null ? null : tmp_10_0.ten) ? 70 : 71);
    \u0275\u0275advance(14);
    \u0275\u0275textInterpolate(ctx_r1.nhanvien().maNV);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.nhanvien().hoTen);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.getGioiTinhLabel(ctx_r1.nhanvien().gioiTinh));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.formatDate(ctx_r1.nhanvien().ngaySinh));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.nhanvien().cmnd || "N/A");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.nhanvien().soDienThoai || "N/A");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.nhanvien().email || "N/A");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.nhanvien().queQuan || "N/A");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.nhanvien().diaChiHienTai || "N/A");
    \u0275\u0275advance(12);
    \u0275\u0275conditional(((tmp_20_0 = ctx_r1.nhanvien().phongban) == null ? null : tmp_20_0.ten) ? 144 : 145);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r1.nhanvien().chucVu || "N/A");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.nhanvien().viTri || "N/A");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.formatDate(ctx_r1.nhanvien().ngayVaoLam));
    \u0275\u0275advance(6);
    \u0275\u0275styleProp("background-color", ctx_r1.getTrangThaiColor(ctx_r1.nhanvien().trangThai));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getTrangThaiLabel(ctx_r1.nhanvien().trangThai), " ");
    \u0275\u0275advance(6);
    \u0275\u0275conditional(ctx_r1.nhanvien().userId ? 176 : 177);
    \u0275\u0275advance(13);
    \u0275\u0275textInterpolate1("", ctx_r1.formatCurrency(ctx_r1.nhanvien().luongCoBan), " VN\u0110");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("", ctx_r1.formatCurrency(ctx_r1.nhanvien().phuCap), " VN\u0110");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.nhanvien().heSoLuong || 1);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("", ctx_r1.formatCurrency(ctx_r1.getTotalSalary(ctx_r1.nhanvien())), " VN\u0110");
    \u0275\u0275advance(12);
    \u0275\u0275textInterpolate(ctx_r1.nhanvien().soTaiKhoan || "N/A");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.nhanvien().nganHang || "N/A");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.nhanvien().chiNhanh || "N/A");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.nhanvien().ghiChu ? 232 : -1);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1("T\u1EA1o l\xFAc: ", ctx_r1.formatDate(ctx_r1.nhanvien().createdAt), "");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("C\u1EADp nh\u1EADt l\u1EA7n cu\u1ED1i: ", ctx_r1.formatDate(ctx_r1.nhanvien().updatedAt), "");
  }
}
var DetailNhanvienComponent = class _DetailNhanvienComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  nhanvienService = inject(NhanvienService);
  dialog = inject(MatDialog);
  snackBar = inject(MatSnackBar);
  id = null;
  nhanvien = signal(null);
  loading = signal(true);
  error = signal(null);
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    if (this.id) {
      this.loadNhanvien();
    }
  }
  loadNhanvien() {
    return __async(this, null, function* () {
      if (!this.id)
        return;
      try {
        this.loading.set(true);
        this.error.set(null);
        const nhanvien = yield this.nhanvienService.getNhanvienById(this.id);
        this.nhanvien.set(nhanvien);
      } catch (error) {
        console.error("Error loading nhanvien:", error);
        this.error.set("Kh\xF4ng th\u1EC3 t\u1EA3i th\xF4ng tin nh\xE2n vi\xEAn");
        this.snackBar.open("Kh\xF4ng th\u1EC3 t\u1EA3i th\xF4ng tin nh\xE2n vi\xEAn", "\u0110\xF3ng", { duration: 3e3 });
      } finally {
        this.loading.set(false);
      }
    });
  }
  getTrangThaiLabel(trangThai) {
    return TrangThaiNhanvienLabels[trangThai] || trangThai;
  }
  getTrangThaiColor(trangThai) {
    const colorMap = {
      "DANGLAMVIEC": "#4caf50",
      "THUVIEC": "#ff9800",
      "NGHIPHEP": "#2196f3",
      "DANGHIVIEC": "#f44336",
      "TAMNGHI": "#9e9e9e",
      "KHAC": "#607d8b"
    };
    return colorMap[trangThai] || "#607d8b";
  }
  getGioiTinhLabel(gioiTinh) {
    if (!gioiTinh)
      return "N/A";
    return GioiTinhLabels[gioiTinh] || gioiTinh;
  }
  calculateAge(ngaySinh) {
    if (!ngaySinh)
      return null;
    const today = /* @__PURE__ */ new Date();
    const birthDate = new Date(ngaySinh);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || m === 0 && today.getDate() < birthDate.getDate()) {
      age--;
    }
    return age;
  }
  calculateWorkDuration(ngayVaoLam) {
    if (!ngayVaoLam)
      return "N/A";
    const today = /* @__PURE__ */ new Date();
    const startDate = new Date(ngayVaoLam);
    const diffTime = Math.abs(today.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1e3 * 60 * 60 * 24));
    const years = Math.floor(diffDays / 365);
    const months = Math.floor(diffDays % 365 / 30);
    if (years > 0) {
      return `${years} n\u0103m ${months} th\xE1ng`;
    }
    return `${months} th\xE1ng`;
  }
  getTotalSalary(nhanvien) {
    const luongCoBan = nhanvien.luongCoBan || 0;
    const phuCap = nhanvien.phuCap || 0;
    const heSo = nhanvien.heSoLuong || 1;
    return (luongCoBan + phuCap) * heSo;
  }
  editNhanvien() {
    if (this.id) {
      this.router.navigate(["/admin/nhanvien/edit", this.id]);
    }
  }
  confirmDelete() {
    return __async(this, null, function* () {
      if (!this.id)
        return;
      const confirmed = confirm("B\u1EA1n c\xF3 ch\u1EAFc ch\u1EAFn mu\u1ED1n x\xF3a nh\xE2n vi\xEAn n\xE0y?");
      if (!confirmed)
        return;
      try {
        yield this.nhanvienService.deleteNhanvien(this.id);
        this.snackBar.open("X\xF3a nh\xE2n vi\xEAn th\xE0nh c\xF4ng!", "\u0110\xF3ng", { duration: 3e3 });
        this.router.navigate(["/admin/nhanvien/list"]);
      } catch (error) {
        const message = error?.error?.message || "C\xF3 l\u1ED7i x\u1EA3y ra khi x\xF3a nh\xE2n vi\xEAn";
        this.snackBar.open(message, "\u0110\xF3ng", { duration: 5e3 });
        console.error("Error deleting nhanvien:", error);
      }
    });
  }
  linkUser() {
    return __async(this, null, function* () {
      this.snackBar.open("Ch\u1EE9c n\u0103ng li\xEAn k\u1EBFt t\xE0i kho\u1EA3n \u0111ang \u0111\u01B0\u1EE3c ph\xE1t tri\u1EC3n", "\u0110\xF3ng", { duration: 3e3 });
    });
  }
  unlinkUser() {
    return __async(this, null, function* () {
      if (!this.id)
        return;
      const confirmed = confirm("B\u1EA1n c\xF3 ch\u1EAFc ch\u1EAFn mu\u1ED1n h\u1EE7y li\xEAn k\u1EBFt t\xE0i kho\u1EA3n?");
      if (!confirmed)
        return;
      try {
        yield this.nhanvienService.unlinkFromUser(this.id);
        this.snackBar.open("H\u1EE7y li\xEAn k\u1EBFt t\xE0i kho\u1EA3n th\xE0nh c\xF4ng!", "\u0110\xF3ng", { duration: 3e3 });
        yield this.loadNhanvien();
      } catch (error) {
        const message = error?.error?.message || "C\xF3 l\u1ED7i x\u1EA3y ra khi h\u1EE7y li\xEAn k\u1EBFt";
        this.snackBar.open(message, "\u0110\xF3ng", { duration: 5e3 });
        console.error("Error unlinking user:", error);
      }
    });
  }
  goBack() {
    this.router.navigate(["/admin/nhanvien/list"]);
  }
  formatDate(date) {
    if (!date)
      return "N/A";
    return new Date(date).toLocaleDateString("vi-VN");
  }
  formatCurrency(amount) {
    if (!amount)
      return "0";
    return amount.toLocaleString("vi-VN");
  }
  static \u0275fac = function DetailNhanvienComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DetailNhanvienComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DetailNhanvienComponent, selectors: [["app-detailnhanvien"]], decls: 4, vars: 1, consts: [[1, "detail-container"], [1, "loading-container"], [1, "error-card"], ["diameter", "60"], [1, "error-content"], ["mat-raised-button", "", "color", "primary", 3, "click"], [1, "page-header"], [1, "header-left"], ["mat-icon-button", "", 1, "back-button", 3, "click"], [1, "header-info"], [1, "subtitle"], [1, "header-actions"], ["mat-stroked-button", "", "color", "warn"], ["mat-stroked-button", ""], ["mat-raised-button", "", "color", "warn", 3, "click"], [1, "status-section"], [1, "active-chip"], [1, "inactive-chip"], [1, "stats-grid"], [1, "stat-card"], [1, "stat-icon"], [1, "stat-details"], [1, "stat-label"], [1, "stat-value"], [1, "stat-icon", "work"], [1, "stat-icon", "salary"], [1, "stat-icon", "department"], [1, "info-grid"], [1, "info-card"], [1, "info-row"], [1, "info-label"], [1, "info-value"], [1, "linked-chip"], [1, "unlinked-chip"], [1, "info-value", "salary-value"], [1, "info-row", "total-salary"], [1, "note-card"], [1, "metadata-card"], [1, "metadata-row"], ["mat-stroked-button", "", "color", "warn", 3, "click"], ["mat-stroked-button", "", 3, "click"]], template: function DetailNhanvienComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275template(1, DetailNhanvienComponent_Conditional_1_Template, 4, 0, "div", 1)(2, DetailNhanvienComponent_Conditional_2_Template, 11, 1, "mat-card", 2)(3, DetailNhanvienComponent_Conditional_3_Template, 245, 38);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading() ? 1 : ctx.error() ? 2 : ctx.nhanvien() ? 3 : -1);
    }
  }, dependencies: [
    CommonModule,
    MatCardModule,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatButtonModule,
    MatButton,
    MatIconButton,
    MatIconModule,
    MatIcon,
    MatChipsModule,
    MatChip,
    MatChipSet,
    MatDividerModule,
    MatDivider,
    MatProgressSpinnerModule,
    MatProgressSpinner
  ], styles: ["\n\n.detail-container[_ngcontent-%COMP%] {\n  max-width: 1400px;\n  margin: 2rem auto;\n  padding: 0 1rem;\n}\n.loading-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 6rem 0;\n  gap: 1rem;\n}\n.loading-container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #666;\n  font-size: 1.1rem;\n}\n.error-card[_ngcontent-%COMP%] {\n  margin: 2rem 0;\n}\n.error-card[_ngcontent-%COMP%]   .error-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 3rem;\n  gap: 1.5rem;\n}\n.error-card[_ngcontent-%COMP%]   .error-content[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 4rem;\n  width: 4rem;\n  height: 4rem;\n  color: #f44336;\n}\n.error-card[_ngcontent-%COMP%]   .error-content[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #333;\n  margin: 0;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 1.5rem;\n  padding: 1.5rem;\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.page-header[_ngcontent-%COMP%]   .header-left[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.page-header[_ngcontent-%COMP%]   .header-left[_ngcontent-%COMP%]   .back-button[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  width: 1.5rem;\n  height: 1.5rem;\n}\n.page-header[_ngcontent-%COMP%]   .header-left[_ngcontent-%COMP%]   .header-info[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.75rem;\n  font-weight: 600;\n  color: #333;\n}\n.page-header[_ngcontent-%COMP%]   .header-left[_ngcontent-%COMP%]   .header-info[_ngcontent-%COMP%]   .subtitle[_ngcontent-%COMP%] {\n  margin: 0.25rem 0 0 0;\n  color: #666;\n  font-size: 1rem;\n}\n.page-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.75rem;\n}\n.page-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.page-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  width: 1.25rem;\n  height: 1.25rem;\n}\n.status-section[_ngcontent-%COMP%] {\n  margin-bottom: 1.5rem;\n}\n.status-section[_ngcontent-%COMP%]   mat-chip-set[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n}\n.status-section[_ngcontent-%COMP%]   mat-chip[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: white;\n}\n.status-section[_ngcontent-%COMP%]   mat-chip[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: white;\n  margin-right: 0.25rem;\n}\n.status-section[_ngcontent-%COMP%]   .active-chip[_ngcontent-%COMP%] {\n  background-color: #4caf50 !important;\n  color: white;\n}\n.status-section[_ngcontent-%COMP%]   .inactive-chip[_ngcontent-%COMP%] {\n  background-color: #9e9e9e !important;\n  color: white;\n}\n.stats-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 1rem;\n  margin-bottom: 2rem;\n}\n.stats-grid[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  padding: 1.5rem !important;\n}\n.stats-grid[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .stat-icon[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 60px;\n  height: 60px;\n  border-radius: 12px;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n}\n.stats-grid[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .stat-icon[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  width: 2rem;\n  height: 2rem;\n  color: white;\n}\n.stats-grid[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .stat-icon.work[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f093fb 0%,\n      #f5576c 100%);\n}\n.stats-grid[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .stat-icon.salary[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #4facfe 0%,\n      #00f2fe 100%);\n}\n.stats-grid[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .stat-icon.department[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #43e97b 0%,\n      #38f9d7 100%);\n}\n.stats-grid[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .stat-details[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.stats-grid[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .stat-details[_ngcontent-%COMP%]   .stat-label[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: #666;\n  margin-bottom: 0.25rem;\n}\n.stats-grid[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .stat-details[_ngcontent-%COMP%]   .stat-value[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  font-weight: 700;\n  color: #333;\n}\n.info-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 1.5rem;\n  margin-bottom: 1.5rem;\n}\n.info-grid[_ngcontent-%COMP%]   .info-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n  padding: 1rem 1.5rem;\n  border-radius: 4px 4px 0 0;\n  margin: -16px -16px 0 -16px;\n}\n.info-grid[_ngcontent-%COMP%]   .info-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 1.1rem;\n  font-weight: 600;\n  margin: 0;\n}\n.info-grid[_ngcontent-%COMP%]   .info-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  width: 1.5rem;\n  height: 1.5rem;\n}\n.info-grid[_ngcontent-%COMP%]   .info-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%] {\n  padding: 1.5rem !important;\n}\n.info-grid[_ngcontent-%COMP%]   .info-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0.75rem 0;\n}\n.info-grid[_ngcontent-%COMP%]   .info-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%]   .info-label[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #666;\n  font-size: 0.95rem;\n}\n.info-grid[_ngcontent-%COMP%]   .info-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%]   .info-value[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #333;\n  text-align: right;\n  font-size: 1rem;\n}\n.info-grid[_ngcontent-%COMP%]   .info-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%]   .info-value.salary-value[_ngcontent-%COMP%] {\n  color: #667eea;\n  font-weight: 700;\n}\n.info-grid[_ngcontent-%COMP%]   .info-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .info-row.total-salary[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      rgba(102, 126, 234, 0.0823529412) 0%,\n      rgba(118, 75, 162, 0.0823529412) 100%);\n  padding: 1rem;\n  margin: 0.5rem 0 0 0;\n  border-radius: 8px;\n}\n.info-grid[_ngcontent-%COMP%]   .info-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .info-row.total-salary[_ngcontent-%COMP%]   .info-label[_ngcontent-%COMP%], \n.info-grid[_ngcontent-%COMP%]   .info-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .info-row.total-salary[_ngcontent-%COMP%]   .info-value[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  font-weight: 700;\n}\n.info-grid[_ngcontent-%COMP%]   .info-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .info-row.total-salary[_ngcontent-%COMP%]   .info-value[_ngcontent-%COMP%] {\n  color: #764ba2;\n}\n.info-grid[_ngcontent-%COMP%]   .info-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   mat-divider[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.linked-chip[_ngcontent-%COMP%] {\n  background-color: #4caf50 !important;\n  color: white !important;\n}\n.linked-chip[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: white;\n  margin-right: 0.25rem;\n}\n.unlinked-chip[_ngcontent-%COMP%] {\n  background-color: #ff9800 !important;\n  color: white !important;\n}\n.unlinked-chip[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: white;\n  margin-right: 0.25rem;\n}\n.note-card[_ngcontent-%COMP%] {\n  margin-bottom: 1.5rem;\n}\n.note-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n  padding: 1rem 1.5rem;\n  border-radius: 4px 4px 0 0;\n  margin: -16px -16px 0 -16px;\n}\n.note-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 1.1rem;\n  font-weight: 600;\n  margin: 0;\n}\n.note-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  width: 1.5rem;\n  height: 1.5rem;\n}\n.note-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%] {\n  padding: 1.5rem !important;\n}\n.note-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  line-height: 1.6;\n  color: #333;\n  white-space: pre-wrap;\n}\n.metadata-card[_ngcontent-%COMP%] {\n  background-color: #f5f5f5;\n}\n.metadata-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 2rem;\n  padding: 1rem 1.5rem !important;\n}\n.metadata-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .metadata-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  color: #666;\n  font-size: 0.875rem;\n}\n.metadata-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .metadata-row[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  width: 1.25rem;\n  height: 1.25rem;\n  color: #999;\n}\n@media (max-width: 1024px) {\n  .stats-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n  .info-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 768px) {\n  .detail-container[_ngcontent-%COMP%] {\n    margin: 1rem auto;\n    padding: 0 0.5rem;\n  }\n  .page-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 1rem;\n    padding: 1rem;\n  }\n  .page-header[_ngcontent-%COMP%]   .header-left[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .page-header[_ngcontent-%COMP%]   .header-left[_ngcontent-%COMP%]   .header-info[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n  }\n  .page-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%] {\n    width: 100%;\n    flex-wrap: wrap;\n  }\n  .page-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    flex: 1;\n    min-width: calc(50% - 0.375rem);\n  }\n  .stats-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .stats-grid[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%] {\n    padding: 1rem !important;\n  }\n  .stats-grid[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .stat-icon[_ngcontent-%COMP%] {\n    width: 50px;\n    height: 50px;\n  }\n  .stats-grid[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .stat-icon[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n    width: 1.5rem;\n    height: 1.5rem;\n  }\n  .stats-grid[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .stat-details[_ngcontent-%COMP%]   .stat-value[_ngcontent-%COMP%] {\n    font-size: 1.1rem;\n  }\n  .info-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%] {\n    padding: 0.75rem 1rem;\n  }\n  .info-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%] {\n    font-size: 1rem;\n  }\n  .info-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n    font-size: 1.25rem;\n    width: 1.25rem;\n    height: 1.25rem;\n  }\n  .info-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%] {\n    padding: 1rem !important;\n  }\n  .info-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.25rem;\n  }\n  .info-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%]   .info-value[_ngcontent-%COMP%] {\n    text-align: left;\n  }\n  .metadata-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 0.75rem;\n  }\n}\n@media (max-width: 480px) {\n  .page-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    min-width: 100%;\n  }\n  .page-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .page-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n    margin: 0;\n  }\n  .status-section[_ngcontent-%COMP%]   mat-chip-set[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n}\n/*# sourceMappingURL=detailnhanvien.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DetailNhanvienComponent, { className: "DetailNhanvienComponent", filePath: "src/app/admin/nhanvien/detailnhanvien/detailnhanvien.component.ts", lineNumber: 34 });
})();
export {
  DetailNhanvienComponent
};
//# sourceMappingURL=chunk-L56G7ZP4.js.map
