import './polyfills.server.mjs';
import {
  DathangService
} from "./chunk-6C4QP5HU.mjs";
import {
  DonhangService
} from "./chunk-G2WBPEJY.mjs";
import {
  MatDialog,
  MatDialogActions,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle
} from "./chunk-E2GALVII.mjs";
import {
  MatInput,
  MatInputModule
} from "./chunk-UCMTPX2K.mjs";
import {
  DefaultValueAccessor,
  FormsModule,
  MatError,
  MatFormField,
  MatFormFieldModule,
  MatHint,
  MatLabel,
  MaxLengthValidator,
  NgControlStatus,
  NgModel,
  RequiredValidator
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
  MatButtonModule
} from "./chunk-RDBGA3AP.mjs";
import {
  CommonModule,
  NgIf
} from "./chunk-VNUZ7HP6.mjs";
import {
  inject,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-6NXY6CBU.mjs";
import {
  __async
} from "./chunk-FMEBT56H.mjs";

// src/app/shared/components/cancel-reason-dialog.component.ts
function CancelReasonDialogComponent_mat_error_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "L\xFD do h\u1EE7y ph\u1EA3i c\xF3 \xEDt nh\u1EA5t 10 k\xFD t\u1EF1");
    \u0275\u0275elementEnd();
  }
}
function CancelReasonDialogComponent_div_21_p_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p")(1, "strong");
    \u0275\u0275text(2, "Kh\xE1ch h\xE0ng:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.orderInfo.khachhang.name, " ");
  }
}
function CancelReasonDialogComponent_div_21_p_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p")(1, "strong");
    \u0275\u0275text(2, "Nh\xE0 cung c\u1EA5p:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.orderInfo.nhacungcap.name, " ");
  }
}
function CancelReasonDialogComponent_div_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14)(1, "p", 15)(2, "strong");
    \u0275\u0275text(3, "Th\xF4ng tin \u0111\u01A1n h\xE0ng:");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 16)(5, "p")(6, "strong");
    \u0275\u0275text(7, "M\xE3 \u0111\u01A1n:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275template(9, CancelReasonDialogComponent_div_21_p_9_Template, 4, 1, "p", 9)(10, CancelReasonDialogComponent_div_21_p_10_Template, 4, 1, "p", 9);
    \u0275\u0275elementStart(11, "p")(12, "strong");
    \u0275\u0275text(13, "Tr\u1EA1ng th\xE1i:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span", 17);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1(" ", ctx_r0.orderInfo.madonhang || ctx_r0.orderInfo.madncc, "");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.orderInfo.khachhang);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.orderInfo.nhacungcap);
    \u0275\u0275advance(4);
    \u0275\u0275classMap(ctx_r0.getStatusClass(ctx_r0.orderInfo.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getStatusLabel(ctx_r0.orderInfo.status), " ");
  }
}
var CancelReasonDialogComponent = class _CancelReasonDialogComponent {
  lydohuy = "";
  showError = false;
  orderInfo = null;
  hasInventory = false;
  dialogRef = inject(MatDialogRef);
  onCancel() {
    this.dialogRef.close(null);
  }
  onConfirm() {
    if (this.isValid()) {
      this.dialogRef.close(this.lydohuy.trim());
    } else {
      this.showError = true;
    }
  }
  onInputChange() {
    if (this.lydohuy.length >= 10) {
      this.showError = false;
    }
  }
  isValid() {
    return this.lydohuy.trim().length >= 10;
  }
  getStatusLabel(status) {
    const labels = {
      "dadat": "\u0110\xE3 \u0110\u1EB7t",
      "dagiao": "\u0110\xE3 Giao",
      "danhan": "\u0110\xE3 Nh\u1EADn",
      "huy": "\u0110\xE3 H\u1EE7y",
      "hoanthanh": "Ho\xE0n Th\xE0nh"
    };
    return labels[status] || status;
  }
  getStatusClass(status) {
    const classes = {
      "dadat": "bg-blue-100 text-blue-800",
      "dagiao": "bg-green-100 text-green-800",
      "danhan": "bg-purple-100 text-purple-800",
      "huy": "bg-red-100 text-red-800",
      "hoanthanh": "bg-gray-100 text-gray-800"
    };
    return classes[status] || "bg-gray-100 text-gray-800";
  }
  static \u0275fac = function CancelReasonDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CancelReasonDialogComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CancelReasonDialogComponent, selectors: [["app-cancel-reason-dialog"]], decls: 31, vars: 9, consts: [["mat-dialog-title", "", 1, "text-red-600", "font-bold"], [1, "align-middle", "mr-2"], [1, "mt-4"], [1, "mb-4", "p-3", "bg-yellow-50", "border-l-4", "border-yellow-400", "text-yellow-700"], [1, "text-sm"], ["appearance", "outline", 1, "w-full"], ["matInput", "", "rows", "5", "placeholder", "Vui l\xF2ng nh\u1EADp l\xFD do h\u1EE7y \u0111\u01A1n h\xE0ng (t\u1ED1i thi\u1EC3u 10 k\xFD t\u1EF1)", "required", "", "maxlength", "500", 3, "ngModelChange", "input", "ngModel"], ["align", "start"], ["align", "end"], [4, "ngIf"], ["class", "mt-4 p-3 bg-gray-50 rounded", 4, "ngIf"], ["align", "end", 1, "mt-4", "gap-2"], ["mat-button", "", "type", "button", 3, "click"], ["mat-raised-button", "", "color", "warn", "type", "button", 3, "click", "disabled"], [1, "mt-4", "p-3", "bg-gray-50", "rounded"], [1, "text-sm", "text-gray-600", "mb-2"], [1, "text-sm", "space-y-1"], [1, "px-2", "py-1", "rounded", "text-xs"]], template: function CancelReasonDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "h2", 0)(1, "mat-icon", 1);
      \u0275\u0275text(2, "warning");
      \u0275\u0275elementEnd();
      \u0275\u0275text(3, " X\xE1c Nh\u1EADn H\u1EE7y \u0110\u01A1n H\xE0ng ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "mat-dialog-content", 2)(5, "div", 3)(6, "p", 4)(7, "strong");
      \u0275\u0275text(8, "C\u1EA3nh b\xE1o:");
      \u0275\u0275elementEnd();
      \u0275\u0275text(9);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "mat-form-field", 5)(11, "mat-label");
      \u0275\u0275text(12, "L\xFD do h\u1EE7y \u0111\u01A1n h\xE0ng");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "textarea", 6);
      \u0275\u0275twoWayListener("ngModelChange", function CancelReasonDialogComponent_Template_textarea_ngModelChange_13_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.lydohuy, $event) || (ctx.lydohuy = $event);
        return $event;
      });
      \u0275\u0275listener("input", function CancelReasonDialogComponent_Template_textarea_input_13_listener() {
        return ctx.onInputChange();
      });
      \u0275\u0275text(14, "        ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "mat-hint", 7)(16, "span");
      \u0275\u0275text(17);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(18, "mat-hint", 8);
      \u0275\u0275text(19);
      \u0275\u0275elementEnd();
      \u0275\u0275template(20, CancelReasonDialogComponent_mat_error_20_Template, 2, 0, "mat-error", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275template(21, CancelReasonDialogComponent_div_21_Template, 16, 6, "div", 10);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "mat-dialog-actions", 11)(23, "button", 12);
      \u0275\u0275listener("click", function CancelReasonDialogComponent_Template_button_click_23_listener() {
        return ctx.onCancel();
      });
      \u0275\u0275elementStart(24, "mat-icon");
      \u0275\u0275text(25, "close");
      \u0275\u0275elementEnd();
      \u0275\u0275text(26, " H\u1EE7y B\u1ECF ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "button", 13);
      \u0275\u0275listener("click", function CancelReasonDialogComponent_Template_button_click_27_listener() {
        return ctx.onConfirm();
      });
      \u0275\u0275elementStart(28, "mat-icon");
      \u0275\u0275text(29, "check");
      \u0275\u0275elementEnd();
      \u0275\u0275text(30, " X\xE1c Nh\u1EADn H\u1EE7y \u0110\u01A1n ");
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(9);
      \u0275\u0275textInterpolate1(" H\xE0nh \u0111\u1ED9ng n\xE0y kh\xF4ng th\u1EC3 ho\xE0n t\xE1c. ", ctx.hasInventory ? "T\u1ED3n kho s\u1EBD \u0111\u01B0\u1EE3c \u0111i\u1EC1u ch\u1EC9nh t\u1EF1 \u0111\u1ED9ng." : "", " ");
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.lydohuy);
      \u0275\u0275advance(3);
      \u0275\u0275classProp("text-red-500", ctx.lydohuy.length < 10);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.lydohuy.length, "/10 k\xFD t\u1EF1 t\u1ED1i thi\u1EC3u ");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("", ctx.lydohuy.length, "/500");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.showError);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.orderInfo);
      \u0275\u0275advance(6);
      \u0275\u0275property("disabled", !ctx.isValid());
    }
  }, dependencies: [CommonModule, NgIf, MatDialogModule, MatDialogTitle, MatDialogActions, MatDialogContent, MatFormFieldModule, MatFormField, MatLabel, MatHint, MatError, MatInputModule, MatInput, MatButtonModule, MatButton, MatIconModule, MatIcon, FormsModule, DefaultValueAccessor, NgControlStatus, RequiredValidator, MaxLengthValidator, NgModel], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n}\nmat-dialog-content[_ngcontent-%COMP%] {\n  min-width: 500px;\n  max-width: 600px;\n}\n/*# sourceMappingURL=cancel-reason-dialog.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CancelReasonDialogComponent, { className: "CancelReasonDialogComponent", filePath: "src/app/shared/components/cancel-reason-dialog.component.ts", lineNumber: 101 });
})();

// src/app/shared/services/cancel-order.service.ts
var CancelOrderService = class _CancelOrderService {
  dialog = inject(MatDialog);
  snackBar = inject(MatSnackBar);
  donhangService = inject(DonhangService);
  dathangService = inject(DathangService);
  /**
   * Hủy đơn hàng bán (Donhang)
   * @param order Đơn hàng cần hủy
   * @returns Promise<boolean> true nếu hủy thành công, false nếu không
   */
  cancelDonhang(order) {
    return __async(this, null, function* () {
      if (order.status === "huy") {
        this.snackBar.open("\u274C \u0110\u01A1n h\xE0ng \u0111\xE3 \u0111\u01B0\u1EE3c h\u1EE7y tr\u01B0\u1EDBc \u0111\xF3", "\u0110\xF3ng", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
        return false;
      }
      const dialogRef = this.dialog.open(CancelReasonDialogComponent, {
        width: "500px",
        disableClose: true,
        data: {
          orderType: "donhang",
          orderId: order.id,
          orderCode: order.code || order.madonhang,
          currentStatus: order.status
        }
      });
      const lydohuy = yield dialogRef.afterClosed().toPromise();
      if (!lydohuy) {
        return false;
      }
      const loadingSnack = this.snackBar.open("\u23F3 \u0110ang x\u1EED l\xFD h\u1EE7y \u0111\u01A1n h\xE0ng...", "", {
        duration: 0,
        horizontalPosition: "end",
        verticalPosition: "top"
      });
      try {
        const result = yield this.donhangService.cancelDonhang(order.id, lydohuy);
        loadingSnack.dismiss();
        this.snackBar.open(`\u2705 ${result.message}`, "\u0110\xF3ng", {
          duration: 5e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        return true;
      } catch (error) {
        loadingSnack.dismiss();
        this.snackBar.open(`\u274C L\u1ED7i khi h\u1EE7y \u0111\u01A1n h\xE0ng: ${error.message}`, "\u0110\xF3ng", {
          duration: 5e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
        return false;
      }
    });
  }
  /**
   * Hủy đơn đặt hàng (Dathang)
   * @param order Đơn đặt hàng cần hủy
   * @returns Promise<boolean> true nếu hủy thành công, false nếu không
   */
  cancelDathang(order) {
    return __async(this, null, function* () {
      if (order.status === "huy") {
        this.snackBar.open("\u274C \u0110\u01A1n \u0111\u1EB7t h\xE0ng \u0111\xE3 \u0111\u01B0\u1EE3c h\u1EE7y tr\u01B0\u1EDBc \u0111\xF3", "\u0110\xF3ng", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
        return false;
      }
      const dialogRef = this.dialog.open(CancelReasonDialogComponent, {
        width: "500px",
        disableClose: true,
        data: {
          orderType: "dathang",
          orderId: order.id,
          orderCode: order.code || order.madathang,
          currentStatus: order.status
        }
      });
      const lydohuy = yield dialogRef.afterClosed().toPromise();
      if (!lydohuy) {
        return false;
      }
      const loadingSnack = this.snackBar.open("\u23F3 \u0110ang x\u1EED l\xFD h\u1EE7y \u0111\u01A1n \u0111\u1EB7t h\xE0ng...", "", {
        duration: 0,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ["snackbar-warning"]
      });
      try {
        const result = yield this.dathangService.cancelDathang(order.id, lydohuy);
        loadingSnack.dismiss();
        this.snackBar.open(`\u2705 ${result.message}`, "\u0110\xF3ng", {
          duration: 5e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        return true;
      } catch (error) {
        loadingSnack.dismiss();
        this.snackBar.open(`\u274C L\u1ED7i khi h\u1EE7y \u0111\u01A1n \u0111\u1EB7t h\xE0ng: ${error.message}`, "\u0110\xF3ng", {
          duration: 5e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
        return false;
      }
    });
  }
  /**
   * Kiểm tra xem đơn hàng có thể hủy hay không
   * @param order Đơn hàng cần kiểm tra
   * @returns true nếu có thể hủy, false nếu không
   */
  canCancelOrder(order) {
    return order.status !== "huy";
  }
  /**
   * Lấy tooltip message cho nút hủy
   * @param order Đơn hàng cần kiểm tra
   * @returns Tooltip message
   */
  getCancelButtonTooltip(order) {
    if (order.status === "huy") {
      return "\u0110\u01A1n h\xE0ng \u0111\xE3 \u0111\u01B0\u1EE3c h\u1EE7y";
    }
    return "H\u1EE7y \u0111\u01A1n h\xE0ng";
  }
  static \u0275fac = function CancelOrderService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CancelOrderService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _CancelOrderService, factory: _CancelOrderService.\u0275fac, providedIn: "root" });
};

export {
  CancelOrderService
};
//# sourceMappingURL=chunk-SZZULRUT.mjs.map
