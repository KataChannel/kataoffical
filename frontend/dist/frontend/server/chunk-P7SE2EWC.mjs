import './polyfills.server.mjs';
import {
  MatExpansionModule,
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "./chunk-UE3XUXQM.mjs";
import {
  MatBadge,
  MatBadgeModule,
  MatList,
  MatListItem,
  MatListItemIcon,
  MatListItemLine,
  MatListItemMeta,
  MatListItemTitle,
  MatListModule
} from "./chunk-V26EXVGC.mjs";
import "./chunk-DEL52QRL.mjs";
import {
  MatSlideToggle,
  MatSlideToggleModule
} from "./chunk-EWXDPTNY.mjs";
import {
  MatChip,
  MatChipsModule
} from "./chunk-6YRKHWJL.mjs";
import {
  MatDialog,
  MatDialogModule
} from "./chunk-5PWX7G23.mjs";
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardTitle
} from "./chunk-6DRHJEKQ.mjs";
import {
  MatSelect,
  MatSelectModule
} from "./chunk-PQY5STY2.mjs";
import {
  MatInput,
  MatInputModule
} from "./chunk-KU7CK3YB.mjs";
import {
  MatTooltip,
  MatTooltipModule
} from "./chunk-4QEJTP76.mjs";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  MatFormField,
  MatLabel,
  MatPrefix,
  MatSuffix,
  NgControlStatus,
  NgControlStatusGroup,
  NumberValueAccessor,
  ReactiveFormsModule,
  RequiredValidator,
  Validators,
  ɵNgNoValidate
} from "./chunk-K4777VIL.mjs";
import {
  MatIcon,
  MatIconModule
} from "./chunk-VOLHFDBH.mjs";
import {
  MatSnackBar,
  MatSnackBarModule
} from "./chunk-AF3EHXCM.mjs";
import "./chunk-LOJIWTVC.mjs";
import {
  MatButton,
  MatButtonModule,
  MatIconButton
} from "./chunk-K6ADGRHN.mjs";
import {
  MatOption
} from "./chunk-VMLPK7VD.mjs";
import "./chunk-RILUB63S.mjs";
import "./chunk-AJDW274Y.mjs";
import {
  CommonModule,
  NgForOf,
  NgIf
} from "./chunk-UP6A7POK.mjs";
import {
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-I6KZCWLZ.mjs";
import "./chunk-QS2IQGEQ.mjs";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-FMEBT56H.mjs";

// src/app/admin/banggia/price-alerts/price-alerts.component.ts
function PriceAlertsComponent_mat_option_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 33);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const banggia_r1 = ctx.$implicit;
    \u0275\u0275property("value", banggia_r1.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", banggia_r1.title, " ");
  }
}
function PriceAlertsComponent_div_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 34)(1, "mat-form-field", 35)(2, "mat-label");
    \u0275\u0275text(3, "Ng\u01B0\u1EE1ng ti\u1EC1n");
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "input", 36);
    \u0275\u0275elementStart(5, "span", 37);
    \u0275\u0275text(6, "\u0111");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "mat-form-field", 35)(8, "mat-label");
    \u0275\u0275text(9, "Ng\u01B0\u1EE1ng %");
    \u0275\u0275elementEnd();
    \u0275\u0275element(10, "input", 38);
    \u0275\u0275elementStart(11, "span", 37);
    \u0275\u0275text(12, "%");
    \u0275\u0275elementEnd()()();
  }
}
function PriceAlertsComponent_mat_list_77_mat_list_item_1_span_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const alert_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" - ", alert_r3.sanphamTitle, "");
  }
}
function PriceAlertsComponent_mat_list_77_mat_list_item_1_mat_icon_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 50);
    \u0275\u0275text(1, "notifications");
    \u0275\u0275elementEnd();
  }
}
function PriceAlertsComponent_mat_list_77_mat_list_item_1_mat_icon_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 51);
    \u0275\u0275text(1, "email");
    \u0275\u0275elementEnd();
  }
}
function PriceAlertsComponent_mat_list_77_mat_list_item_1_mat_icon_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 52);
    \u0275\u0275text(1, "sms");
    \u0275\u0275elementEnd();
  }
}
function PriceAlertsComponent_mat_list_77_mat_list_item_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-list-item")(1, "mat-icon", 40);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 41)(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "mat-chip");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 42);
    \u0275\u0275text(9);
    \u0275\u0275template(10, PriceAlertsComponent_mat_list_77_mat_list_item_1_span_10_Template, 2, 1, "span", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 43);
    \u0275\u0275template(12, PriceAlertsComponent_mat_list_77_mat_list_item_1_mat_icon_12_Template, 2, 0, "mat-icon", 44)(13, PriceAlertsComponent_mat_list_77_mat_list_item_1_mat_icon_13_Template, 2, 0, "mat-icon", 45)(14, PriceAlertsComponent_mat_list_77_mat_list_item_1_mat_icon_14_Template, 2, 0, "mat-icon", 46);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 47)(16, "button", 48);
    \u0275\u0275listener("click", function PriceAlertsComponent_mat_list_77_mat_list_item_1_Template_button_click_16_listener() {
      const alert_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.toggleAlert(alert_r3));
    });
    \u0275\u0275elementStart(17, "mat-icon");
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "button", 49);
    \u0275\u0275listener("click", function PriceAlertsComponent_mat_list_77_mat_list_item_1_Template_button_click_19_listener() {
      const alert_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.deleteAlert(alert_r3.id));
    });
    \u0275\u0275elementStart(20, "mat-icon");
    \u0275\u0275text(21, "delete");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const alert_r3 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275classProp("enabled", alert_r3.enabled)("disabled", !alert_r3.enabled);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r3.getAlertTypeIcon(alert_r3.type), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r3.getAlertTypeLabel(alert_r3.type));
    \u0275\u0275advance();
    \u0275\u0275classProp("enabled-chip", alert_r3.enabled)("disabled-chip", !alert_r3.enabled);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", alert_r3.enabled ? "\u0110ang b\u1EADt" : "\u0110\xE3 t\u1EAFt", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", alert_r3.banggiaTitle, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", alert_r3.sanphamTitle);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", alert_r3.notifyInApp);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", alert_r3.notifyEmail);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", alert_r3.notifySMS);
    \u0275\u0275advance(2);
    \u0275\u0275property("matTooltip", alert_r3.enabled ? "T\u1EAFt" : "B\u1EADt");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(alert_r3.enabled ? "toggle_on" : "toggle_off");
  }
}
function PriceAlertsComponent_mat_list_77_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-list");
    \u0275\u0275template(1, PriceAlertsComponent_mat_list_77_mat_list_item_1_Template, 22, 18, "mat-list-item", 39);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r3.alerts());
  }
}
function PriceAlertsComponent_div_78_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 53)(1, "mat-icon");
    \u0275\u0275text(2, "notifications_off");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Ch\u01B0a c\xF3 c\u1EA3nh b\xE1o n\xE0o");
    \u0275\u0275elementEnd()();
  }
}
function PriceAlertsComponent_div_91_mat_expansion_panel_1_mat_icon_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 68);
    \u0275\u0275text(1, "fiber_manual_record");
    \u0275\u0275elementEnd();
  }
}
function PriceAlertsComponent_div_91_mat_expansion_panel_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-expansion-panel")(1, "mat-expansion-panel-header", 56);
    \u0275\u0275listener("click", function PriceAlertsComponent_div_91_mat_expansion_panel_1_Template_mat_expansion_panel_header_click_1_listener() {
      const notification_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.markAsRead(notification_r6));
    });
    \u0275\u0275elementStart(2, "mat-panel-title")(3, "mat-icon");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "strong");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "mat-chip");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "mat-panel-description");
    \u0275\u0275text(10);
    \u0275\u0275template(11, PriceAlertsComponent_div_91_mat_expansion_panel_1_mat_icon_11_Template, 2, 0, "mat-icon", 57);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 58)(13, "div", 59)(14, "span", 60);
    \u0275\u0275text(15, "B\u1EA3ng gi\xE1:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "span", 61);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 62)(19, "span", 60);
    \u0275\u0275text(20, "Gi\xE1 c\u0169:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "span", 63);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "div", 62)(24, "span", 60);
    \u0275\u0275text(25, "Gi\xE1 m\u1EDBi:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "span", 64);
    \u0275\u0275text(27);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "div", 59)(29, "span", 60);
    \u0275\u0275text(30, "Ch\xEAnh l\u1EC7ch:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "span", 65);
    \u0275\u0275text(32);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "div", 59)(34, "span", 60);
    \u0275\u0275text(35, "L\xFD do:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "span", 61);
    \u0275\u0275text(37);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(38, "div", 59)(39, "span", 60);
    \u0275\u0275text(40, "Ng\u01B0\u1EDDi thay \u0111\u1ED5i:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "span", 61);
    \u0275\u0275text(42);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(43, "div", 66)(44, "button", 67);
    \u0275\u0275listener("click", function PriceAlertsComponent_div_91_mat_expansion_panel_1_Template_button_click_44_listener() {
      const notification_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.deleteNotification(notification_r6.id));
    });
    \u0275\u0275elementStart(45, "mat-icon");
    \u0275\u0275text(46, "delete");
    \u0275\u0275elementEnd();
    \u0275\u0275text(47, " X\xF3a ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const notification_r6 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("unread", !notification_r6.read);
    \u0275\u0275advance(3);
    \u0275\u0275classProp("price-increase", notification_r6.change > 0)("price-decrease", notification_r6.change < 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", notification_r6.change > 0 ? "trending_up" : "trending_down", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(notification_r6.sanphamTitle);
    \u0275\u0275advance();
    \u0275\u0275classProp("increase", notification_r6.change > 0)("decrease", notification_r6.change < 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", notification_r6.changePercent > 0 ? "+" : "", "", notification_r6.changePercent.toFixed(1), "% ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r3.formatRelativeTime(notification_r6.timestamp), " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !notification_r6.read);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(notification_r6.banggiaTitle);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r3.formatCurrency(notification_r6.oldPrice));
    \u0275\u0275advance(4);
    \u0275\u0275classProp("increase", notification_r6.change > 0)("decrease", notification_r6.change < 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r3.formatCurrency(notification_r6.newPrice), " ");
    \u0275\u0275advance(4);
    \u0275\u0275classProp("increase", notification_r6.change > 0)("decrease", notification_r6.change < 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", notification_r6.change > 0 ? "+" : "", "", ctx_r3.formatCurrency(notification_r6.change), " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(notification_r6.reason);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(notification_r6.changedBy);
  }
}
function PriceAlertsComponent_div_91_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 54);
    \u0275\u0275template(1, PriceAlertsComponent_div_91_mat_expansion_panel_1_Template, 48, 31, "mat-expansion-panel", 55);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r3.notifications());
  }
}
function PriceAlertsComponent_div_92_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 53)(1, "mat-icon");
    \u0275\u0275text(2, "notifications_none");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Ch\u01B0a c\xF3 th\xF4ng b\xE1o n\xE0o");
    \u0275\u0275elementEnd()();
  }
}
var PriceAlertsComponent = class _PriceAlertsComponent {
  fb;
  snackBar;
  dialog;
  alertForm;
  // Signals
  loading = signal(false);
  alerts = signal([]);
  notifications = signal([]);
  unreadCount = signal(0);
  // Data
  banggiaList = signal([]);
  sanphamList = signal([]);
  constructor(fb, snackBar, dialog) {
    this.fb = fb;
    this.snackBar = snackBar;
    this.dialog = dialog;
  }
  ngOnInit() {
    this.initForm();
    this.loadData();
  }
  initForm() {
    this.alertForm = this.fb.group({
      type: ["change", Validators.required],
      banggiaId: ["", Validators.required],
      sanphamId: [""],
      threshold: [0],
      percentThreshold: [10],
      notifyEmail: [true],
      notifySMS: [false],
      notifyInApp: [true]
    });
  }
  loadData() {
    return __async(this, null, function* () {
      this.loading.set(true);
      try {
        yield this.loadAlerts();
        yield this.loadNotifications();
        yield this.loadBanggiaList();
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        this.loading.set(false);
      }
    });
  }
  loadAlerts() {
    return __async(this, null, function* () {
      const mockAlerts = [
        {
          id: "alert-1",
          type: "increase",
          banggiaId: "bg-1",
          banggiaTitle: "B\u1EA3ng gi\xE1 b\xE1n l\u1EBB",
          threshold: 10,
          percentThreshold: 15,
          enabled: true,
          notifyEmail: true,
          notifySMS: false,
          notifyInApp: true,
          createdAt: /* @__PURE__ */ new Date()
        },
        {
          id: "alert-2",
          type: "change",
          banggiaId: "bg-2",
          banggiaTitle: "B\u1EA3ng gi\xE1 b\xE1n s\u1EC9",
          sanphamId: "sp-1",
          sanphamTitle: "Rau xanh",
          enabled: true,
          notifyEmail: false,
          notifySMS: false,
          notifyInApp: true,
          createdAt: /* @__PURE__ */ new Date()
        }
      ];
      this.alerts.set(mockAlerts);
    });
  }
  loadNotifications() {
    return __async(this, null, function* () {
      const mockNotifications = [
        {
          id: "notif-1",
          alertId: "alert-1",
          sanphamTitle: "Rau xanh",
          banggiaTitle: "B\u1EA3ng gi\xE1 b\xE1n l\u1EBB",
          oldPrice: 1e4,
          newPrice: 12e3,
          change: 2e3,
          changePercent: 20,
          reason: "T\u0103ng gi\xE1 theo th\u1ECB tr\u01B0\u1EDDng",
          changedBy: "admin",
          timestamp: /* @__PURE__ */ new Date(),
          read: false
        },
        {
          id: "notif-2",
          alertId: "alert-2",
          sanphamTitle: "Rau c\u1EA3i",
          banggiaTitle: "B\u1EA3ng gi\xE1 b\xE1n s\u1EC9",
          oldPrice: 15e3,
          newPrice: 13500,
          change: -1500,
          changePercent: -10,
          reason: "Khuy\u1EBFn m\xE3i",
          changedBy: "manager",
          timestamp: new Date(Date.now() - 36e5),
          read: true
        }
      ];
      this.notifications.set(mockNotifications);
      this.unreadCount.set(mockNotifications.filter((n) => !n.read).length);
    });
  }
  loadBanggiaList() {
    return __async(this, null, function* () {
      this.banggiaList.set([
        { id: "bg-1", title: "B\u1EA3ng gi\xE1 b\xE1n l\u1EBB" },
        { id: "bg-2", title: "B\u1EA3ng gi\xE1 b\xE1n s\u1EC9" },
        { id: "bg-3", title: "B\u1EA3ng gi\xE1 kh\xE1ch VIP" }
      ]);
    });
  }
  createAlert() {
    return __async(this, null, function* () {
      if (!this.alertForm.valid) {
        this.snackBar.open("Vui l\xF2ng \u0111i\u1EC1n \u0111\u1EA7y \u0111\u1EE7 th\xF4ng tin", "\u0110\xF3ng", { duration: 3e3 });
        return;
      }
      const formValue = this.alertForm.value;
      const newAlert = {
        id: `alert-${Date.now()}`,
        type: formValue.type,
        banggiaId: formValue.banggiaId,
        banggiaTitle: this.banggiaList().find((b) => b.id === formValue.banggiaId)?.title || "",
        sanphamId: formValue.sanphamId || void 0,
        threshold: formValue.threshold || void 0,
        percentThreshold: formValue.percentThreshold || void 0,
        enabled: true,
        notifyEmail: formValue.notifyEmail,
        notifySMS: formValue.notifySMS,
        notifyInApp: formValue.notifyInApp,
        createdAt: /* @__PURE__ */ new Date()
      };
      this.alerts.update((alerts) => [...alerts, newAlert]);
      this.snackBar.open("\u0110\xE3 t\u1EA1o c\u1EA3nh b\xE1o th\xE0nh c\xF4ng", "\u0110\xF3ng", { duration: 3e3 });
      this.alertForm.reset({ type: "change", notifyEmail: true, notifyInApp: true });
    });
  }
  toggleAlert(alert) {
    this.alerts.update((alerts) => alerts.map((a) => a.id === alert.id ? __spreadProps(__spreadValues({}, a), { enabled: !a.enabled }) : a));
    const message = alert.enabled ? "\u0110\xE3 t\u1EAFt c\u1EA3nh b\xE1o" : "\u0110\xE3 b\u1EADt c\u1EA3nh b\xE1o";
    this.snackBar.open(message, "\u0110\xF3ng", { duration: 2e3 });
  }
  deleteAlert(alertId) {
    if (!confirm("B\u1EA1n c\xF3 ch\u1EAFc ch\u1EAFn mu\u1ED1n x\xF3a c\u1EA3nh b\xE1o n\xE0y?"))
      return;
    this.alerts.update((alerts) => alerts.filter((a) => a.id !== alertId));
    this.snackBar.open("\u0110\xE3 x\xF3a c\u1EA3nh b\xE1o", "\u0110\xF3ng", { duration: 2e3 });
  }
  markAsRead(notification) {
    this.notifications.update((notifications) => notifications.map((n) => n.id === notification.id ? __spreadProps(__spreadValues({}, n), { read: true }) : n));
    this.updateUnreadCount();
  }
  markAllAsRead() {
    this.notifications.update((notifications) => notifications.map((n) => __spreadProps(__spreadValues({}, n), { read: true })));
    this.unreadCount.set(0);
    this.snackBar.open("\u0110\xE3 \u0111\xE1nh d\u1EA5u t\u1EA5t c\u1EA3 l\xE0 \u0111\xE3 \u0111\u1ECDc", "\u0110\xF3ng", { duration: 2e3 });
  }
  deleteNotification(notificationId) {
    this.notifications.update((notifications) => notifications.filter((n) => n.id !== notificationId));
    this.updateUnreadCount();
  }
  updateUnreadCount() {
    const unread = this.notifications().filter((n) => !n.read).length;
    this.unreadCount.set(unread);
  }
  getAlertTypeLabel(type) {
    const labels = {
      increase: "T\u0103ng gi\xE1",
      decrease: "Gi\u1EA3m gi\xE1",
      change: "Thay \u0111\u1ED5i b\u1EA5t k\u1EF3",
      threshold: "V\u01B0\u1EE3t ng\u01B0\u1EE1ng"
    };
    return labels[type] || type;
  }
  getAlertTypeIcon(type) {
    const icons = {
      increase: "trending_up",
      decrease: "trending_down",
      change: "notifications_active",
      threshold: "warning"
    };
    return icons[type] || "notifications";
  }
  formatCurrency(value) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND"
    }).format(value);
  }
  formatRelativeTime(date) {
    const now = /* @__PURE__ */ new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 6e4);
    const hours = Math.floor(diff / 36e5);
    const days = Math.floor(diff / 864e5);
    if (minutes < 1)
      return "V\u1EEBa xong";
    if (minutes < 60)
      return `${minutes} ph\xFAt tr\u01B0\u1EDBc`;
    if (hours < 24)
      return `${hours} gi\u1EDD tr\u01B0\u1EDBc`;
    return `${days} ng\xE0y tr\u01B0\u1EDBc`;
  }
  static \u0275fac = function PriceAlertsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PriceAlertsComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(MatSnackBar), \u0275\u0275directiveInject(MatDialog));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PriceAlertsComponent, selectors: [["app-price-alerts"]], decls: 93, vars: 15, consts: [[1, "price-alerts-container"], [1, "header-card"], ["matBadgeColor", "warn", 3, "matBadge", "matBadgeHidden"], [1, "description"], [1, "content-grid"], [1, "left-column"], [1, "create-alert-card"], [3, "ngSubmit", "formGroup"], ["appearance", "outline", 1, "full-width"], ["formControlName", "type"], ["value", "increase"], ["value", "decrease"], ["value", "change"], ["value", "threshold"], ["matPrefix", ""], ["formControlName", "banggiaId", "required", ""], [3, "value", 4, "ngFor", "ngForOf"], ["formControlName", "sanphamId"], ["value", ""], ["class", "threshold-group", 4, "ngIf"], [1, "notification-channels"], [1, "channel-toggles"], ["formControlName", "notifyInApp"], ["formControlName", "notifyEmail"], ["formControlName", "notifySMS"], ["mat-raised-button", "", "color", "primary", "type", "submit", 3, "disabled"], [1, "alerts-list-card"], [4, "ngIf"], ["class", "empty-state", 4, "ngIf"], [1, "right-column"], [1, "notifications-card"], ["mat-button", "", 3, "click", "disabled"], ["class", "notifications-list", 4, "ngIf"], [3, "value"], [1, "threshold-group"], ["appearance", "outline"], ["matInput", "", "type", "number", "formControlName", "threshold"], ["matSuffix", ""], ["matInput", "", "type", "number", "formControlName", "percentThreshold"], [4, "ngFor", "ngForOf"], ["matListItemIcon", ""], ["matListItemTitle", ""], ["matListItemLine", ""], ["matListItemLine", "", 1, "notification-info"], ["class", "mini-icon", "matTooltip", "Th\xF4ng b\xE1o trong app", 4, "ngIf"], ["class", "mini-icon", "matTooltip", "Th\xF4ng b\xE1o qua email", 4, "ngIf"], ["class", "mini-icon", "matTooltip", "Th\xF4ng b\xE1o qua SMS", 4, "ngIf"], ["matListItemMeta", "", 1, "actions"], ["mat-icon-button", "", 3, "click", "matTooltip"], ["mat-icon-button", "", "color", "warn", "matTooltip", "X\xF3a", 3, "click"], ["matTooltip", "Th\xF4ng b\xE1o trong app", 1, "mini-icon"], ["matTooltip", "Th\xF4ng b\xE1o qua email", 1, "mini-icon"], ["matTooltip", "Th\xF4ng b\xE1o qua SMS", 1, "mini-icon"], [1, "empty-state"], [1, "notifications-list"], [3, "unread", 4, "ngFor", "ngForOf"], [3, "click"], ["class", "unread-indicator", 4, "ngIf"], [1, "notification-details"], [1, "detail-row"], [1, "label"], [1, "value"], [1, "detail-row", "price-comparison"], [1, "value", "old-price"], [1, "value", "new-price"], [1, "value", "change-amount"], [1, "notification-actions"], ["mat-button", "", "color", "warn", 3, "click"], [1, "unread-indicator"]], template: function PriceAlertsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "mat-card", 1)(2, "mat-card-header")(3, "mat-card-title")(4, "mat-icon", 2);
      \u0275\u0275text(5, " notifications_active ");
      \u0275\u0275elementEnd();
      \u0275\u0275text(6, " C\u1EA3nh B\xE1o Gi\xE1 ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "mat-card-content")(8, "p", 3);
      \u0275\u0275text(9, " Theo d\xF5i thay \u0111\u1ED5i gi\xE1 v\xE0 nh\u1EADn th\xF4ng b\xE1o qua Email, SMS ho\u1EB7c \u1EE9ng d\u1EE5ng ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(10, "div", 4)(11, "div", 5)(12, "mat-card", 6)(13, "mat-card-header")(14, "mat-card-title")(15, "mat-icon");
      \u0275\u0275text(16, "add_alert");
      \u0275\u0275elementEnd();
      \u0275\u0275text(17, " T\u1EA1o C\u1EA3nh B\xE1o M\u1EDBi ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(18, "mat-card-content")(19, "form", 7);
      \u0275\u0275listener("ngSubmit", function PriceAlertsComponent_Template_form_ngSubmit_19_listener() {
        return ctx.createAlert();
      });
      \u0275\u0275elementStart(20, "mat-form-field", 8)(21, "mat-label");
      \u0275\u0275text(22, "Lo\u1EA1i c\u1EA3nh b\xE1o");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "mat-select", 9)(24, "mat-option", 10);
      \u0275\u0275text(25, "T\u0103ng gi\xE1");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "mat-option", 11);
      \u0275\u0275text(27, "Gi\u1EA3m gi\xE1");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "mat-option", 12);
      \u0275\u0275text(29, "Thay \u0111\u1ED5i b\u1EA5t k\u1EF3");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "mat-option", 13);
      \u0275\u0275text(31, "V\u01B0\u1EE3t ng\u01B0\u1EE1ng");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(32, "mat-icon", 14);
      \u0275\u0275text(33);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(34, "mat-form-field", 8)(35, "mat-label");
      \u0275\u0275text(36, "B\u1EA3ng gi\xE1");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "mat-select", 15);
      \u0275\u0275template(38, PriceAlertsComponent_mat_option_38_Template, 2, 2, "mat-option", 16);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(39, "mat-icon", 14);
      \u0275\u0275text(40, "list");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(41, "mat-form-field", 8)(42, "mat-label");
      \u0275\u0275text(43, "S\u1EA3n ph\u1EA9m (t\xF9y ch\u1ECDn)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(44, "mat-select", 17)(45, "mat-option", 18);
      \u0275\u0275text(46, "T\u1EA5t c\u1EA3 s\u1EA3n ph\u1EA9m");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(47, "mat-icon", 14);
      \u0275\u0275text(48, "inventory");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(49, PriceAlertsComponent_div_49_Template, 13, 0, "div", 19);
      \u0275\u0275elementStart(50, "div", 20)(51, "h4");
      \u0275\u0275text(52, "K\xEAnh th\xF4ng b\xE1o");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(53, "div", 21)(54, "mat-slide-toggle", 22)(55, "mat-icon");
      \u0275\u0275text(56, "notifications");
      \u0275\u0275elementEnd();
      \u0275\u0275text(57, " Trong \u1EE9ng d\u1EE5ng ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(58, "mat-slide-toggle", 23)(59, "mat-icon");
      \u0275\u0275text(60, "email");
      \u0275\u0275elementEnd();
      \u0275\u0275text(61, " Email ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(62, "mat-slide-toggle", 24)(63, "mat-icon");
      \u0275\u0275text(64, "sms");
      \u0275\u0275elementEnd();
      \u0275\u0275text(65, " SMS ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(66, "button", 25)(67, "mat-icon");
      \u0275\u0275text(68, "add");
      \u0275\u0275elementEnd();
      \u0275\u0275text(69, " T\u1EA1o C\u1EA3nh B\xE1o ");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(70, "mat-card", 26)(71, "mat-card-header")(72, "mat-card-title")(73, "mat-icon");
      \u0275\u0275text(74, "list");
      \u0275\u0275elementEnd();
      \u0275\u0275text(75);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(76, "mat-card-content");
      \u0275\u0275template(77, PriceAlertsComponent_mat_list_77_Template, 2, 1, "mat-list", 27)(78, PriceAlertsComponent_div_78_Template, 5, 0, "div", 28);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(79, "div", 29)(80, "mat-card", 30)(81, "mat-card-header")(82, "mat-card-title")(83, "mat-icon", 2);
      \u0275\u0275text(84, " inbox ");
      \u0275\u0275elementEnd();
      \u0275\u0275text(85, " Th\xF4ng B\xE1o ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(86, "button", 31);
      \u0275\u0275listener("click", function PriceAlertsComponent_Template_button_click_86_listener() {
        return ctx.markAllAsRead();
      });
      \u0275\u0275elementStart(87, "mat-icon");
      \u0275\u0275text(88, "done_all");
      \u0275\u0275elementEnd();
      \u0275\u0275text(89, " \u0110\xE1nh d\u1EA5u \u0111\xE3 \u0111\u1ECDc ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(90, "mat-card-content");
      \u0275\u0275template(91, PriceAlertsComponent_div_91_Template, 2, 1, "div", 32)(92, PriceAlertsComponent_div_92_Template, 5, 0, "div", 28);
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275property("matBadge", ctx.unreadCount())("matBadgeHidden", ctx.unreadCount() === 0);
      \u0275\u0275advance(15);
      \u0275\u0275property("formGroup", ctx.alertForm);
      \u0275\u0275advance(14);
      \u0275\u0275textInterpolate(ctx.getAlertTypeIcon(ctx.alertForm.value.type));
      \u0275\u0275advance(5);
      \u0275\u0275property("ngForOf", ctx.banggiaList());
      \u0275\u0275advance(11);
      \u0275\u0275property("ngIf", ctx.alertForm.value.type === "threshold");
      \u0275\u0275advance(17);
      \u0275\u0275property("disabled", !ctx.alertForm.valid);
      \u0275\u0275advance(9);
      \u0275\u0275textInterpolate1(" Danh S\xE1ch C\u1EA3nh B\xE1o (", ctx.alerts().length, ") ");
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.alerts().length > 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.alerts().length === 0);
      \u0275\u0275advance(5);
      \u0275\u0275property("matBadge", ctx.unreadCount())("matBadgeHidden", ctx.unreadCount() === 0);
      \u0275\u0275advance(3);
      \u0275\u0275property("disabled", ctx.unreadCount() === 0);
      \u0275\u0275advance(5);
      \u0275\u0275property("ngIf", ctx.notifications().length > 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.notifications().length === 0);
    }
  }, dependencies: [
    CommonModule,
    NgForOf,
    NgIf,
    FormsModule,
    \u0275NgNoValidate,
    DefaultValueAccessor,
    NumberValueAccessor,
    NgControlStatus,
    NgControlStatusGroup,
    RequiredValidator,
    ReactiveFormsModule,
    FormGroupDirective,
    FormControlName,
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
    MatListModule,
    MatList,
    MatListItem,
    MatListItemIcon,
    MatListItemLine,
    MatListItemTitle,
    MatListItemMeta,
    MatBadgeModule,
    MatBadge,
    MatSlideToggleModule,
    MatSlideToggle,
    MatInputModule,
    MatInput,
    MatFormField,
    MatLabel,
    MatPrefix,
    MatSuffix,
    MatSelectModule,
    MatSelect,
    MatOption,
    MatChipsModule,
    MatChip,
    MatTooltipModule,
    MatTooltip,
    MatSnackBarModule,
    MatDialogModule,
    MatExpansionModule,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription
  ], styles: ["\n\n.price-alerts-container[_ngcontent-%COMP%] {\n  padding: 20px;\n  max-width: 1600px;\n  margin: 0 auto;\n}\n.price-alerts-container[_ngcontent-%COMP%]   .header-card[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.price-alerts-container[_ngcontent-%COMP%]   .header-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  font-size: 24px;\n  color: #1976d2;\n}\n.price-alerts-container[_ngcontent-%COMP%]   .header-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 32px;\n  width: 32px;\n  height: 32px;\n}\n.price-alerts-container[_ngcontent-%COMP%]   .header-card[_ngcontent-%COMP%]   .description[_ngcontent-%COMP%] {\n  color: #666;\n  margin: 10px 0 0;\n}\n.price-alerts-container[_ngcontent-%COMP%]   .content-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 20px;\n}\n.price-alerts-container[_ngcontent-%COMP%]   .content-grid[_ngcontent-%COMP%]   .left-column[_ngcontent-%COMP%], \n.price-alerts-container[_ngcontent-%COMP%]   .content-grid[_ngcontent-%COMP%]   .right-column[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n.price-alerts-container[_ngcontent-%COMP%]   .create-alert-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 18px;\n}\n.price-alerts-container[_ngcontent-%COMP%]   .create-alert-card[_ngcontent-%COMP%]   form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 15px;\n}\n.price-alerts-container[_ngcontent-%COMP%]   .create-alert-card[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .full-width[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.price-alerts-container[_ngcontent-%COMP%]   .create-alert-card[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .threshold-group[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 10px;\n}\n.price-alerts-container[_ngcontent-%COMP%]   .create-alert-card[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .notification-channels[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0 0 10px;\n  color: #333;\n  font-size: 14px;\n  font-weight: 600;\n}\n.price-alerts-container[_ngcontent-%COMP%]   .create-alert-card[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .notification-channels[_ngcontent-%COMP%]   .channel-toggles[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.price-alerts-container[_ngcontent-%COMP%]   .create-alert-card[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .notification-channels[_ngcontent-%COMP%]   .channel-toggles[_ngcontent-%COMP%]   mat-slide-toggle[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.price-alerts-container[_ngcontent-%COMP%]   .create-alert-card[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .notification-channels[_ngcontent-%COMP%]   .channel-toggles[_ngcontent-%COMP%]   mat-slide-toggle[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n  width: 20px;\n  height: 20px;\n}\n.price-alerts-container[_ngcontent-%COMP%]   .alerts-list-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 18px;\n}\n.price-alerts-container[_ngcontent-%COMP%]   .alerts-list-card[_ngcontent-%COMP%]   mat-list-item[_ngcontent-%COMP%] {\n  margin-bottom: 10px;\n  border: 1px solid #e0e0e0;\n  border-radius: 8px;\n  background: #fafafa;\n}\n.price-alerts-container[_ngcontent-%COMP%]   .alerts-list-card[_ngcontent-%COMP%]   mat-list-item[_ngcontent-%COMP%]:hover {\n  background: #f5f5f5;\n}\n.price-alerts-container[_ngcontent-%COMP%]   .alerts-list-card[_ngcontent-%COMP%]   mat-list-item[_ngcontent-%COMP%]   mat-icon.enabled[_ngcontent-%COMP%] {\n  color: #4caf50;\n}\n.price-alerts-container[_ngcontent-%COMP%]   .alerts-list-card[_ngcontent-%COMP%]   mat-list-item[_ngcontent-%COMP%]   mat-icon.disabled[_ngcontent-%COMP%] {\n  color: #9e9e9e;\n}\n.price-alerts-container[_ngcontent-%COMP%]   .alerts-list-card[_ngcontent-%COMP%]   mat-list-item[_ngcontent-%COMP%]   mat-icon.mini-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n  margin-right: 5px;\n  color: #666;\n}\n.price-alerts-container[_ngcontent-%COMP%]   .alerts-list-card[_ngcontent-%COMP%]   mat-list-item[_ngcontent-%COMP%]   mat-chip[_ngcontent-%COMP%] {\n  font-size: 11px;\n  height: 20px;\n  margin-left: 10px;\n}\n.price-alerts-container[_ngcontent-%COMP%]   .alerts-list-card[_ngcontent-%COMP%]   mat-list-item[_ngcontent-%COMP%]   mat-chip.enabled-chip[_ngcontent-%COMP%] {\n  background: #e8f5e9;\n  color: #2e7d32;\n}\n.price-alerts-container[_ngcontent-%COMP%]   .alerts-list-card[_ngcontent-%COMP%]   mat-list-item[_ngcontent-%COMP%]   mat-chip.disabled-chip[_ngcontent-%COMP%] {\n  background: #f5f5f5;\n  color: #9e9e9e;\n}\n.price-alerts-container[_ngcontent-%COMP%]   .alerts-list-card[_ngcontent-%COMP%]   mat-list-item[_ngcontent-%COMP%]   .notification-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  margin-top: 5px;\n}\n.price-alerts-container[_ngcontent-%COMP%]   .alerts-list-card[_ngcontent-%COMP%]   mat-list-item[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 5px;\n}\n.price-alerts-container[_ngcontent-%COMP%]   .alerts-list-card[_ngcontent-%COMP%]   .empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 40px 20px;\n  color: #999;\n}\n.price-alerts-container[_ngcontent-%COMP%]   .alerts-list-card[_ngcontent-%COMP%]   .empty-state[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 60px;\n  width: 60px;\n  height: 60px;\n  margin-bottom: 10px;\n  color: #bdbdbd;\n}\n.price-alerts-container[_ngcontent-%COMP%]   .notifications-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.price-alerts-container[_ngcontent-%COMP%]   .notifications-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 18px;\n}\n.price-alerts-container[_ngcontent-%COMP%]   .notifications-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n}\n.price-alerts-container[_ngcontent-%COMP%]   .notifications-card[_ngcontent-%COMP%]   .notifications-list[_ngcontent-%COMP%] {\n  max-height: 800px;\n  overflow-y: auto;\n}\n.price-alerts-container[_ngcontent-%COMP%]   .notifications-card[_ngcontent-%COMP%]   .notifications-list[_ngcontent-%COMP%]   mat-expansion-panel[_ngcontent-%COMP%] {\n  margin-bottom: 10px;\n  border: 1px solid #e0e0e0;\n}\n.price-alerts-container[_ngcontent-%COMP%]   .notifications-card[_ngcontent-%COMP%]   .notifications-list[_ngcontent-%COMP%]   mat-expansion-panel.unread[_ngcontent-%COMP%] {\n  background: #e3f2fd;\n  border-left: 4px solid #1976d2;\n}\n.price-alerts-container[_ngcontent-%COMP%]   .notifications-card[_ngcontent-%COMP%]   .notifications-list[_ngcontent-%COMP%]   mat-expansion-panel[_ngcontent-%COMP%]   mat-expansion-panel-header[_ngcontent-%COMP%]   mat-panel-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.price-alerts-container[_ngcontent-%COMP%]   .notifications-card[_ngcontent-%COMP%]   .notifications-list[_ngcontent-%COMP%]   mat-expansion-panel[_ngcontent-%COMP%]   mat-expansion-panel-header[_ngcontent-%COMP%]   mat-panel-title[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n  width: 24px;\n  height: 24px;\n}\n.price-alerts-container[_ngcontent-%COMP%]   .notifications-card[_ngcontent-%COMP%]   .notifications-list[_ngcontent-%COMP%]   mat-expansion-panel[_ngcontent-%COMP%]   mat-expansion-panel-header[_ngcontent-%COMP%]   mat-panel-title[_ngcontent-%COMP%]   mat-icon.price-increase[_ngcontent-%COMP%] {\n  color: #f44336;\n}\n.price-alerts-container[_ngcontent-%COMP%]   .notifications-card[_ngcontent-%COMP%]   .notifications-list[_ngcontent-%COMP%]   mat-expansion-panel[_ngcontent-%COMP%]   mat-expansion-panel-header[_ngcontent-%COMP%]   mat-panel-title[_ngcontent-%COMP%]   mat-icon.price-decrease[_ngcontent-%COMP%] {\n  color: #4caf50;\n}\n.price-alerts-container[_ngcontent-%COMP%]   .notifications-card[_ngcontent-%COMP%]   .notifications-list[_ngcontent-%COMP%]   mat-expansion-panel[_ngcontent-%COMP%]   mat-expansion-panel-header[_ngcontent-%COMP%]   mat-panel-title[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.price-alerts-container[_ngcontent-%COMP%]   .notifications-card[_ngcontent-%COMP%]   .notifications-list[_ngcontent-%COMP%]   mat-expansion-panel[_ngcontent-%COMP%]   mat-expansion-panel-header[_ngcontent-%COMP%]   mat-panel-title[_ngcontent-%COMP%]   mat-chip[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n.price-alerts-container[_ngcontent-%COMP%]   .notifications-card[_ngcontent-%COMP%]   .notifications-list[_ngcontent-%COMP%]   mat-expansion-panel[_ngcontent-%COMP%]   mat-expansion-panel-header[_ngcontent-%COMP%]   mat-panel-title[_ngcontent-%COMP%]   mat-chip.increase[_ngcontent-%COMP%] {\n  background: #ffebee;\n  color: #f44336;\n}\n.price-alerts-container[_ngcontent-%COMP%]   .notifications-card[_ngcontent-%COMP%]   .notifications-list[_ngcontent-%COMP%]   mat-expansion-panel[_ngcontent-%COMP%]   mat-expansion-panel-header[_ngcontent-%COMP%]   mat-panel-title[_ngcontent-%COMP%]   mat-chip.decrease[_ngcontent-%COMP%] {\n  background: #e8f5e9;\n  color: #4caf50;\n}\n.price-alerts-container[_ngcontent-%COMP%]   .notifications-card[_ngcontent-%COMP%]   .notifications-list[_ngcontent-%COMP%]   mat-expansion-panel[_ngcontent-%COMP%]   mat-expansion-panel-header[_ngcontent-%COMP%]   mat-panel-description[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  color: #666;\n}\n.price-alerts-container[_ngcontent-%COMP%]   .notifications-card[_ngcontent-%COMP%]   .notifications-list[_ngcontent-%COMP%]   mat-expansion-panel[_ngcontent-%COMP%]   mat-expansion-panel-header[_ngcontent-%COMP%]   mat-panel-description[_ngcontent-%COMP%]   .unread-indicator[_ngcontent-%COMP%] {\n  font-size: 12px;\n  width: 12px;\n  height: 12px;\n  color: #1976d2;\n}\n.price-alerts-container[_ngcontent-%COMP%]   .notifications-card[_ngcontent-%COMP%]   .notifications-list[_ngcontent-%COMP%]   mat-expansion-panel[_ngcontent-%COMP%]   .notification-details[_ngcontent-%COMP%] {\n  padding: 15px 0;\n}\n.price-alerts-container[_ngcontent-%COMP%]   .notifications-card[_ngcontent-%COMP%]   .notifications-list[_ngcontent-%COMP%]   mat-expansion-panel[_ngcontent-%COMP%]   .notification-details[_ngcontent-%COMP%]   .detail-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 120px 1fr;\n  gap: 10px;\n  padding: 8px 0;\n  border-bottom: 1px solid #f0f0f0;\n}\n.price-alerts-container[_ngcontent-%COMP%]   .notifications-card[_ngcontent-%COMP%]   .notifications-list[_ngcontent-%COMP%]   mat-expansion-panel[_ngcontent-%COMP%]   .notification-details[_ngcontent-%COMP%]   .detail-row[_ngcontent-%COMP%]:last-of-type {\n  border-bottom: none;\n}\n.price-alerts-container[_ngcontent-%COMP%]   .notifications-card[_ngcontent-%COMP%]   .notifications-list[_ngcontent-%COMP%]   mat-expansion-panel[_ngcontent-%COMP%]   .notification-details[_ngcontent-%COMP%]   .detail-row[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #666;\n}\n.price-alerts-container[_ngcontent-%COMP%]   .notifications-card[_ngcontent-%COMP%]   .notifications-list[_ngcontent-%COMP%]   mat-expansion-panel[_ngcontent-%COMP%]   .notification-details[_ngcontent-%COMP%]   .detail-row[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n  color: #333;\n}\n.price-alerts-container[_ngcontent-%COMP%]   .notifications-card[_ngcontent-%COMP%]   .notifications-list[_ngcontent-%COMP%]   mat-expansion-panel[_ngcontent-%COMP%]   .notification-details[_ngcontent-%COMP%]   .detail-row[_ngcontent-%COMP%]   .value.old-price[_ngcontent-%COMP%] {\n  text-decoration: line-through;\n  color: #999;\n}\n.price-alerts-container[_ngcontent-%COMP%]   .notifications-card[_ngcontent-%COMP%]   .notifications-list[_ngcontent-%COMP%]   mat-expansion-panel[_ngcontent-%COMP%]   .notification-details[_ngcontent-%COMP%]   .detail-row[_ngcontent-%COMP%]   .value.new-price[_ngcontent-%COMP%], \n.price-alerts-container[_ngcontent-%COMP%]   .notifications-card[_ngcontent-%COMP%]   .notifications-list[_ngcontent-%COMP%]   mat-expansion-panel[_ngcontent-%COMP%]   .notification-details[_ngcontent-%COMP%]   .detail-row[_ngcontent-%COMP%]   .value.change-amount[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n.price-alerts-container[_ngcontent-%COMP%]   .notifications-card[_ngcontent-%COMP%]   .notifications-list[_ngcontent-%COMP%]   mat-expansion-panel[_ngcontent-%COMP%]   .notification-details[_ngcontent-%COMP%]   .detail-row[_ngcontent-%COMP%]   .value.new-price.increase[_ngcontent-%COMP%], \n.price-alerts-container[_ngcontent-%COMP%]   .notifications-card[_ngcontent-%COMP%]   .notifications-list[_ngcontent-%COMP%]   mat-expansion-panel[_ngcontent-%COMP%]   .notification-details[_ngcontent-%COMP%]   .detail-row[_ngcontent-%COMP%]   .value.change-amount.increase[_ngcontent-%COMP%] {\n  color: #f44336;\n}\n.price-alerts-container[_ngcontent-%COMP%]   .notifications-card[_ngcontent-%COMP%]   .notifications-list[_ngcontent-%COMP%]   mat-expansion-panel[_ngcontent-%COMP%]   .notification-details[_ngcontent-%COMP%]   .detail-row[_ngcontent-%COMP%]   .value.new-price.decrease[_ngcontent-%COMP%], \n.price-alerts-container[_ngcontent-%COMP%]   .notifications-card[_ngcontent-%COMP%]   .notifications-list[_ngcontent-%COMP%]   mat-expansion-panel[_ngcontent-%COMP%]   .notification-details[_ngcontent-%COMP%]   .detail-row[_ngcontent-%COMP%]   .value.change-amount.decrease[_ngcontent-%COMP%] {\n  color: #4caf50;\n}\n.price-alerts-container[_ngcontent-%COMP%]   .notifications-card[_ngcontent-%COMP%]   .notifications-list[_ngcontent-%COMP%]   mat-expansion-panel[_ngcontent-%COMP%]   .notification-details[_ngcontent-%COMP%]   .notification-actions[_ngcontent-%COMP%] {\n  margin-top: 15px;\n  padding-top: 15px;\n  border-top: 1px solid #e0e0e0;\n  display: flex;\n  justify-content: flex-end;\n}\n.price-alerts-container[_ngcontent-%COMP%]   .notifications-card[_ngcontent-%COMP%]   .empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 60px 20px;\n  color: #999;\n}\n.price-alerts-container[_ngcontent-%COMP%]   .notifications-card[_ngcontent-%COMP%]   .empty-state[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 80px;\n  width: 80px;\n  height: 80px;\n  margin-bottom: 15px;\n  color: #bdbdbd;\n}\n@media (max-width: 1024px) {\n  .price-alerts-container[_ngcontent-%COMP%]   .content-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 768px) {\n  .price-alerts-container[_ngcontent-%COMP%] {\n    padding: 10px;\n  }\n  .price-alerts-container[_ngcontent-%COMP%]   .threshold-group[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr !important;\n  }\n}\n/*# sourceMappingURL=price-alerts.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PriceAlertsComponent, { className: "PriceAlertsComponent", filePath: "src/app/admin/banggia/price-alerts/price-alerts.component.ts", lineNumber: 73 });
})();
export {
  PriceAlertsComponent
};
//# sourceMappingURL=chunk-P7SE2EWC.mjs.map
