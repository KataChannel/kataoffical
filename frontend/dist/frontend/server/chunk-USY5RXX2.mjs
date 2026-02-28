import './polyfills.server.mjs';
import {
  ListNhomnccComponent,
  NhomnccService
} from "./chunk-3XCTJ7WJ.mjs";
import "./chunk-QE2YIIVZ.mjs";
import "./chunk-XJHVYA25.mjs";
import "./chunk-RT23KED7.mjs";
import "./chunk-XQWRZCE6.mjs";
import "./chunk-WJ6GNNQZ.mjs";
import "./chunk-TEMMKMG5.mjs";
import "./chunk-CXFG5YDN.mjs";
import {
  convertToSlug
} from "./chunk-OLFDOXYK.mjs";
import {
  removeVietnameseAccents
} from "./chunk-RGTCKLO2.mjs";
import "./chunk-AESSWZ4W.mjs";
import {
  MatMenu,
  MatMenuModule,
  MatMenuTrigger
} from "./chunk-JNHRISVT.mjs";
import {
  ActivatedRoute,
  Router
} from "./chunk-HRPVH7WR.mjs";
import "./chunk-VF45CXPP.mjs";
import {
  GraphqlService
} from "./chunk-3I55OMWU.mjs";
import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-HAGRL2CT.mjs";
import "./chunk-ZYFSGH3S.mjs";
import "./chunk-BKGWM7TB.mjs";
import "./chunk-HJOOFARF.mjs";
import {
  MatSlideToggle,
  MatSlideToggleModule
} from "./chunk-6GML6PCL.mjs";
import "./chunk-LPLDGY7B.mjs";
import {
  MatDialogModule
} from "./chunk-E2GALVII.mjs";
import {
  MatSelectModule
} from "./chunk-GDGUHJEW.mjs";
import {
  MatInput,
  MatInputModule
} from "./chunk-UCMTPX2K.mjs";
import {
  DefaultValueAccessor,
  FormsModule,
  MatFormField,
  MatFormFieldModule,
  MatLabel,
  NgControlStatus,
  NgModel
} from "./chunk-VDRWKQ4T.mjs";
import "./chunk-Q2CU4U3P.mjs";
import {
  MatIcon,
  MatIconModule
} from "./chunk-27SFIHK6.mjs";
import {
  MatSnackBar
} from "./chunk-DZ43XGSB.mjs";
import "./chunk-BRLSQF3K.mjs";
import "./chunk-3B3VS2W4.mjs";
import {
  MatButton,
  MatButtonModule,
  MatIconButton
} from "./chunk-RDBGA3AP.mjs";
import "./chunk-KWDBPYQT.mjs";
import "./chunk-7GASYLAT.mjs";
import "./chunk-Y3VBDLFR.mjs";
import {
  CommonModule,
  NgForOf,
  NgIf
} from "./chunk-VNUZ7HP6.mjs";
import {
  effect,
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-6NXY6CBU.mjs";
import "./chunk-QS2IQGEQ.mjs";
import {
  __async
} from "./chunk-FMEBT56H.mjs";

// src/app/admin/nhomncc/detailnhomncc/detailnhomncc.component.ts
function DetailNhomnccComponent_mat_spinner_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 12);
  }
}
function DetailNhomnccComponent_button_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 13);
    \u0275\u0275listener("click", function DetailNhomnccComponent_button_10_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.handleNhomnccAction());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "save");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", ctx_r1.isLoading());
  }
}
function DetailNhomnccComponent_button_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 13);
    \u0275\u0275listener("click", function DetailNhomnccComponent_button_11_Template_button_click_0_listener() {
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
    \u0275\u0275property("disabled", ctx_r1.isLoading());
  }
}
function DetailNhomnccComponent_ng_container_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 14)(2, "div", 15);
    \u0275\u0275text(3, "B\u1EA1n ch\u1EAFc ch\u1EAFn mu\u1ED1n xo\xE1 kh\xF4ng?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 16)(5, "button", 17);
    \u0275\u0275listener("click", function DetailNhomnccComponent_ng_container_16_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.DeleteData());
    });
    \u0275\u0275text(6, "\u0110\u1ED3ng \xDD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 18);
    \u0275\u0275listener("click", function DetailNhomnccComponent_ng_container_16_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleDelete());
    });
    \u0275\u0275text(8, "Hu\u1EF7 B\u1ECF");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementContainerEnd();
  }
}
function DetailNhomnccComponent_ng_container_17_div_24_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 36);
    \u0275\u0275text(1, "check");
    \u0275\u0275elementEnd();
  }
}
function DetailNhomnccComponent_ng_container_17_div_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 34);
    \u0275\u0275listener("click", function DetailNhomnccComponent_ng_container_17_div_24_Template_div_click_0_listener() {
      const item_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.ChosenNcc(item_r7));
    });
    \u0275\u0275template(1, DetailNhomnccComponent_ng_container_17_div_24_span_1_Template, 2, 0, "span", 35);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r7 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.CheckNcc(item_r7));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", item_r7.name, " (", item_r7.mancc, ") ");
  }
}
function DetailNhomnccComponent_ng_container_17_For_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 33)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 37);
    \u0275\u0275listener("click", function DetailNhomnccComponent_ng_container_17_For_31_Template_span_click_3_listener() {
      const item_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.RemoveNcc(item_r10));
    });
    \u0275\u0275text(4, "close");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r10 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r10.name);
  }
}
function DetailNhomnccComponent_ng_container_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0)(1);
    \u0275\u0275elementStart(2, "div", 19)(3, "mat-form-field", 20)(4, "mat-label");
    \u0275\u0275text(5, "Nh\xF3m Nh\xE0 Cung C\u1EA5p");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "input", 21);
    \u0275\u0275twoWayListener("ngModelChange", function DetailNhomnccComponent_ng_container_17_Template_input_ngModelChange_6_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailNhomncc().name, $event) || (ctx_r1.DetailNhomncc().name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "mat-form-field", 20)(8, "mat-label");
    \u0275\u0275text(9, "M\xF4 T\u1EA3");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "input", 22);
    \u0275\u0275twoWayListener("ngModelChange", function DetailNhomnccComponent_ng_container_17_Template_input_ngModelChange_10_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailNhomncc().description, $event) || (ctx_r1.DetailNhomncc().description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 23)(12, "button", 24, 0);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "mat-menu", null, 1)(17, "div", 25);
    \u0275\u0275listener("click", function DetailNhomnccComponent_ng_container_17_Template_div_click_17_listener($event) {
      \u0275\u0275restoreView(_r5);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(18, "div", 26)(19, "input", 27);
    \u0275\u0275listener("keyup", function DetailNhomnccComponent_ng_container_17_Template_input_keyup_19_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.doFilterNcc($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 28)(21, "span", 29);
    \u0275\u0275text(22, "search");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(23, "div", 30);
    \u0275\u0275template(24, DetailNhomnccComponent_ng_container_17_div_24_Template, 3, 3, "div", 31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "div", 32)(26, "button", 18);
    \u0275\u0275listener("click", function DetailNhomnccComponent_ng_container_17_Template_button_click_26_listener() {
      \u0275\u0275restoreView(_r5);
      const menuTrigger_r8 = \u0275\u0275reference(13);
      return \u0275\u0275resetView(menuTrigger_r8.closeMenu());
    });
    \u0275\u0275text(27, "\u0110\xF3ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "button", 17);
    \u0275\u0275listener("click", function DetailNhomnccComponent_ng_container_17_Template_button_click_28_listener() {
      \u0275\u0275restoreView(_r5);
      const menuTrigger_r8 = \u0275\u0275reference(13);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.ApplyNcc(menuTrigger_r8));
    });
    \u0275\u0275text(29, "\xC1p D\u1EE5ng");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275repeaterCreate(30, DetailNhomnccComponent_ng_container_17_For_31_Template, 5, 1, "span", 33, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementContainerEnd()();
  }
  if (rf & 2) {
    const menu_r11 = \u0275\u0275reference(16);
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailNhomncc().name);
    \u0275\u0275property("disabled", !ctx_r1.isEdit() || ctx_r1.isLoading());
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailNhomncc().description);
    \u0275\u0275property("disabled", !ctx_r1.isEdit() || ctx_r1.isLoading());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx_r1.isEdit() || ctx_r1.isLoading())("matMenuTriggerFor", menu_r11);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.CheckListNcc.length, " Nh\xE0 Cung C\u1EA5p ");
    \u0275\u0275advance(10);
    \u0275\u0275property("ngForOf", ctx_r1.FilterNcc)("ngForTrackBy", ctx_r1.trackByFn);
    \u0275\u0275advance(6);
    \u0275\u0275repeater(ctx_r1.CheckListNcc);
  }
}
var DetailNhomnccComponent = class _DetailNhomnccComponent {
  _ListnhomnccComponent = inject(ListNhomnccComponent);
  _NhomnccService = inject(NhomnccService);
  // _NccService:NccService = inject(NccService)
  _GraphqlService = inject(GraphqlService);
  _route = inject(ActivatedRoute);
  _router = inject(Router);
  _snackBar = inject(MatSnackBar);
  // Signals for state management
  DetailNhomncc = this._NhomnccService.DetailNhomncc;
  isEdit = signal(false);
  isDelete = signal(false);
  isLoading = signal(false);
  nhomnccId = this._NhomnccService.nhomnccId;
  // Data properties
  ListNcc = [];
  FilterNcc = [];
  CheckListNcc = [];
  // Cleanup function for effect
  effectRef;
  isNavigating = false;
  // ✅ Flag to prevent navigation loops
  constructor() {
    this.initializeRouteSubscription();
    this.initializeEffect();
  }
  ngOnInit() {
    return __async(this, null, function* () {
      this.GetListNcc();
    });
  }
  ngOnDestroy() {
    if (this.effectRef) {
      this.effectRef.destroy();
    }
  }
  /**
   * Tối ưu hóa route subscription
   */
  initializeRouteSubscription() {
    this._route.paramMap.subscribe((params) => {
      const id = params.get("id");
      this._NhomnccService.setNhomnccId(id);
    });
  }
  /**
   * Tối ưu hóa effect với error handling và loading states
   */
  initializeEffect() {
    this.effectRef = effect(() => __async(this, null, function* () {
      const id = this._NhomnccService.nhomnccId();
      if (this.isNavigating) {
        return;
      }
      if (!id) {
        this.handleEmptyId();
        return;
      }
      this.isLoading.set(true);
      try {
        this.isNavigating = true;
        if (id === "new") {
          this.handleNewRecord();
        } else {
          yield this.handleExistingRecord(id);
        }
      } catch (error) {
        console.error("Error in effect:", error);
        this._snackBar.open("C\xF3 l\u1ED7i x\u1EA3y ra khi t\u1EA3i d\u1EEF li\u1EC7u", "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      } finally {
        this.isLoading.set(false);
        setTimeout(() => this.isNavigating = false, 100);
      }
    }));
  }
  /**
   * Xử lý khi không có ID
   */
  handleEmptyId() {
    this._ListnhomnccComponent.drawer.close();
    const currentRoute = this._router.url;
    if (currentRoute !== "/admin/nhomncc" && !currentRoute.includes("/admin/nhomncc/")) {
      this._router.navigate(["/admin/nhomncc"]);
    }
  }
  /**
   * Xử lý khi tạo mới (ID = 'new')
   */
  handleNewRecord() {
    this.DetailNhomncc.update(() => ({
      name: "",
      description: "",
      isActive: true
    }));
    this._ListnhomnccComponent.drawer.open();
    this.isEdit.set(true);
    const currentRoute = this._router.url;
    if (currentRoute !== "/admin/nhomncc/new") {
      this._router.navigate(["/admin/nhomncc", "new"]);
    }
  }
  /**
   * Xử lý khi chỉnh sửa record có sẵn
   */
  GetListNcc() {
    return __async(this, null, function* () {
      const Nccs = yield this._GraphqlService.findAll("Nhacungcap", {
        select: {
          id: true,
          name: true,
          mancc: true
        },
        take: 99999,
        aggressiveCache: true,
        enableParallelFetch: true
      });
      this.ListNcc = this.FilterNcc = Nccs.data;
      console.log(this.ListNcc);
    });
  }
  handleExistingRecord(id) {
    return __async(this, null, function* () {
      const currentRoute = this._router.url;
      const targetRoute = `/admin/nhomncc/${id}`;
      yield this.getNhomnccByid();
      this.CheckListNcc = this.DetailNhomncc()?.nhacungcap || [];
      this._ListnhomnccComponent.drawer.open();
      if (currentRoute !== targetRoute) {
        this._router.navigate(["/admin/nhomncc", id]);
      }
    });
  }
  getNhomnccByid() {
    return __async(this, null, function* () {
      const Detail = yield this._GraphqlService.findUnique("nhomncc", { id: this.nhomnccId() }, {
        select: {
          id: true,
          name: true,
          description: true,
          nhacungcap: { select: { id: true, name: true, mancc: true } }
        }
      });
      console.log(Detail);
      this.DetailNhomncc.update(() => Detail);
    });
  }
  handleNhomnccAction() {
    return __async(this, null, function* () {
      if (this.nhomnccId() === "new") {
        yield this.createNhomncc();
      } else {
        yield this.updateNhomncc();
      }
    });
  }
  createNhomncc() {
    return __async(this, null, function* () {
      console.log("Creating new nhomncc...");
      this.isLoading.set(true);
      try {
        const nhomnccData = {
          name: this.DetailNhomncc().name?.trim(),
          description: this.DetailNhomncc().description?.trim() || ""
        };
        if (!nhomnccData.name) {
          throw new Error("T\xEAn nh\xF3m kh\xE1ch h\xE0ng kh\xF4ng \u0111\u01B0\u1EE3c \u0111\u1EC3 tr\u1ED1ng");
        }
        const nccConnectionData = this.buildNccConnectionForCreate();
        if (nccConnectionData) {
          nhomnccData.nhacungcap = nccConnectionData;
          console.log("Adding ncc connections to create data:", nccConnectionData);
        }
        console.log("Creating nhomncc with data:", nhomnccData);
        const result = yield this._GraphqlService.createOne("nhomncc", nhomnccData, { include: { nhacungcap: true } });
        console.log("Created nhomncc result:", result);
        if (result && result?.id) {
          this._snackBar.open("T\u1EA1o M\u1EDBi Th\xE0nh C\xF4ng", "", {
            duration: 2e3,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-success"]
          });
          this._NhomnccService.setNhomnccId(result.id);
          this.isEdit.set(false);
          yield this.getNhomnccByid();
          this.CheckListNcc = this.DetailNhomncc()?.nhacungcap || [];
        }
      } catch (error) {
        console.error("L\u1ED7i khi t\u1EA1o nhomncc:", error);
        let errorMessage = "C\xF3 l\u1ED7i x\u1EA3y ra khi t\u1EA1o nh\xF3m kh\xE1ch h\xE0ng";
        if (error.message) {
          const errorMsg = error.message.toLowerCase();
          if (errorMsg.includes("unique constraint failed") && errorMsg.includes("name")) {
            errorMessage = `T\xEAn nh\xF3m kh\xE1ch h\xE0ng "${this.DetailNhomncc().name}" \u0111\xE3 t\u1ED3n t\u1EA1i. Vui l\xF2ng ch\u1ECDn t\xEAn kh\xE1c.`;
          } else if (errorMsg.includes("foreign key constraint")) {
            errorMessage = "C\xF3 l\u1ED7i li\xEAn k\u1EBFt d\u1EEF li\u1EC7u. Vui l\xF2ng ki\u1EC3m tra l\u1EA1i th\xF4ng tin kh\xE1ch h\xE0ng.";
          } else if (errorMsg.includes("not null constraint")) {
            errorMessage = "Thi\u1EBFu th\xF4ng tin b\u1EAFt bu\u1ED9c. Vui l\xF2ng \u0111i\u1EC1n \u0111\u1EA7y \u0111\u1EE7 c\xE1c tr\u01B0\u1EDDng.";
          } else {
            errorMessage = error.message;
          }
        }
        this._snackBar.open(errorMessage, "", {
          duration: 5e3,
          // Increased duration for error messages
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      } finally {
        this.isLoading.set(false);
      }
    });
  }
  /**
   * ✅ Build ncc connection data for create operation
   */
  buildNccConnectionForCreate() {
    try {
      const nccIds = this.CheckListNcc.map((v) => v.id).filter((id) => id && typeof id === "string" && id.trim() !== "" && id.length >= 36);
      console.log("Building ncc connection for create with IDs:", nccIds);
      if (nccIds.length === 0) {
        console.log("No valid ncc IDs found for connection");
        return null;
      }
      const connectionData = {
        connect: nccIds.map((id) => ({ id: id.trim() }))
      };
      console.log("Built ncc connection data:", connectionData);
      return connectionData;
    } catch (error) {
      console.error("L\u1ED7i khi build ncc connection for create:", error);
      return null;
    }
  }
  /**
   * ✅ Build ncc relation update data for updateOne operation
   */
  buildNccRelationUpdate() {
    try {
      const currentNccIds = this.DetailNhomncc()?.nhacungcap?.map((v) => v.id).filter((id) => id && typeof id === "string") || [];
      const newNccIds = this.CheckListNcc.map((v) => v.id).filter((id) => id && typeof id === "string");
      console.log("=== DEBUGGING NCC RELATION UPDATE ===");
      console.log("Current ncc IDs:", currentNccIds);
      console.log("New ncc IDs (from CheckListNcc):", newNccIds);
      const currentSorted = [...currentNccIds].sort();
      const newSorted = [...newNccIds].sort();
      console.log("Current IDs sorted:", currentSorted);
      console.log("New IDs sorted:", newSorted);
      console.log("Are arrays equal?", JSON.stringify(currentSorted) === JSON.stringify(newSorted));
      if (JSON.stringify(currentSorted) === JSON.stringify(newSorted)) {
        console.log("No relation changes detected for update");
        return null;
      }
      const toConnect = newNccIds.filter((id) => !currentNccIds.includes(id));
      const toDisconnect = currentNccIds.filter((id) => !newNccIds.includes(id));
      console.log("To connect:", toConnect);
      console.log("To disconnect:", toDisconnect);
      const relationData = {};
      if (toDisconnect.length > 0) {
        const validToDisconnect = toDisconnect.filter((id) => id && typeof id === "string" && id.trim() !== "" && id.length >= 36);
        console.log("Valid to disconnect:", validToDisconnect);
        if (validToDisconnect.length > 0) {
          relationData.disconnect = validToDisconnect.map((id) => ({
            id: id.trim()
          }));
        }
      }
      if (toConnect.length > 0) {
        const validToConnect = toConnect.filter((id) => id && typeof id === "string" && id.trim() !== "" && id.length >= 36);
        console.log("Valid to connect:", validToConnect);
        if (validToConnect.length > 0) {
          relationData.connect = validToConnect.map((id) => ({
            id: id.trim()
          }));
        }
      }
      console.log("Final relation update data:", relationData);
      console.log("=== END DEBUGGING ===");
      return Object.keys(relationData).length > 0 ? relationData : null;
    } catch (error) {
      console.error("L\u1ED7i khi build ncc relation update:", error);
      return null;
    }
  }
  updateNhomncc() {
    return __async(this, null, function* () {
      this.isLoading.set(true);
      try {
        const nhomnccData = {
          name: this.DetailNhomncc().name?.trim(),
          description: this.DetailNhomncc().description?.trim() || ""
        };
        if (!nhomnccData.name) {
          throw new Error("T\xEAn nh\xF3m kh\xE1ch h\xE0ng kh\xF4ng \u0111\u01B0\u1EE3c \u0111\u1EC3 tr\u1ED1ng");
        }
        const relationUpdateData = this.buildNccRelationUpdate();
        if (relationUpdateData) {
          nhomnccData.nhacungcap = relationUpdateData;
          console.log("Adding relation updates to update data:", relationUpdateData);
        } else {
          console.log("No relation changes detected - basic update only");
        }
        console.log("Updating nhomncc with data:", nhomnccData);
        const result = yield this._GraphqlService.updateOne("nhomncc", { id: this.nhomnccId() }, nhomnccData, { include: { nhacungcap: true } });
        console.log("Update result:", result);
        this._snackBar.open("C\u1EADp Nh\u1EADt Th\xE0nh C\xF4ng", "", {
          duration: 2e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        this.isEdit.set(false);
      } catch (error) {
        console.error("L\u1ED7i khi c\u1EADp nh\u1EADt nhomncc:", error);
        let errorMessage = "C\xF3 l\u1ED7i x\u1EA3y ra khi c\u1EADp nh\u1EADt nh\xF3m kh\xE1ch h\xE0ng";
        if (error.message) {
          const errorMsg = error.message.toLowerCase();
          if (errorMsg.includes("unique constraint failed") && errorMsg.includes("name")) {
            errorMessage = `T\xEAn nh\xF3m kh\xE1ch h\xE0ng "${this.DetailNhomncc().name}" \u0111\xE3 t\u1ED3n t\u1EA1i. Vui l\xF2ng ch\u1ECDn t\xEAn kh\xE1c.`;
          } else if (errorMsg.includes("foreign key constraint")) {
            errorMessage = "C\xF3 l\u1ED7i li\xEAn k\u1EBFt d\u1EEF li\u1EC7u. Vui l\xF2ng ki\u1EC3m tra l\u1EA1i th\xF4ng tin kh\xE1ch h\xE0ng.";
          } else if (errorMsg.includes("not null constraint")) {
            errorMessage = "Thi\u1EBFu th\xF4ng tin b\u1EAFt bu\u1ED9c. Vui l\xF2ng \u0111i\u1EC1n \u0111\u1EA7y \u0111\u1EE7 c\xE1c tr\u01B0\u1EDDng.";
          } else if (errorMsg.includes("record not found")) {
            errorMessage = "Kh\xF4ng t\xECm th\u1EA5y nh\xF3m kh\xE1ch h\xE0ng \u0111\u1EC3 c\u1EADp nh\u1EADt.";
          } else {
            errorMessage = error.message;
          }
        }
        this._snackBar.open(errorMessage, "", {
          duration: 5e3,
          // Increased duration for error messages
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      } finally {
        this.isLoading.set(false);
      }
    });
  }
  /**
   * ✅ Method để build nested relation data cho update operations
   */
  buildNestedRelationData() {
    try {
      const currentNccIds = this.DetailNhomncc()?.nhacungcap?.map((v) => v.id).filter((id) => id && typeof id === "string") || [];
      const newNccIds = this.CheckListNcc.map((v) => v.id).filter((id) => id && typeof id === "string");
      console.log("=== DEBUGGING NESTED RELATION DATA ===");
      console.log("Current nhomncc data:", this.DetailNhomncc());
      console.log("Current ncc from DetailNhomncc:", this.DetailNhomncc()?.nhacungcap);
      console.log("CheckListNcc:", this.CheckListNcc);
      console.log("Current ncc IDs:", currentNccIds);
      console.log("New ncc IDs (from CheckListNcc):", newNccIds);
      const currentSorted = [...currentNccIds].sort();
      const newSorted = [...newNccIds].sort();
      console.log("Current IDs sorted:", currentSorted);
      console.log("New IDs sorted:", newSorted);
      console.log("Are arrays equal?", JSON.stringify(currentSorted) === JSON.stringify(newSorted));
      if (JSON.stringify(currentSorted) === JSON.stringify(newSorted)) {
        console.log("No relation changes detected for nested update");
        return null;
      }
      const toConnect = newNccIds.filter((id) => !currentNccIds.includes(id));
      const toDisconnect = currentNccIds.filter((id) => !newNccIds.includes(id));
      console.log("To connect (nested):", toConnect);
      console.log("To disconnect (nested):", toDisconnect);
      const nestedRelationData = {};
      if (toDisconnect.length > 0) {
        const validToDisconnect = toDisconnect.filter((id) => id && typeof id === "string" && id.trim() !== "" && id.length >= 36);
        console.log("Valid to disconnect:", validToDisconnect);
        if (validToDisconnect.length > 0) {
          nestedRelationData.disconnect = validToDisconnect.map((id) => ({
            id: id.trim()
          }));
        }
      }
      if (toConnect.length > 0) {
        const validToConnect = toConnect.filter((id) => id && typeof id === "string" && id.trim() !== "" && id.length >= 36);
        console.log("Valid to connect:", validToConnect);
        if (validToConnect.length > 0) {
          nestedRelationData.connect = validToConnect.map((id) => ({
            id: id.trim()
          }));
        }
      }
      console.log("Final nested relation data:", nestedRelationData);
      console.log("=== END DEBUGGING ===");
      return Object.keys(nestedRelationData).length > 0 ? nestedRelationData : null;
    } catch (error) {
      console.error("L\u1ED7i khi build nested relation data:", error);
      return null;
    }
  }
  /**
   * ✅ Method riêng để xử lý relations (kept for ApplyNcc method)
   */
  updateNccRelations() {
    return __async(this, null, function* () {
      try {
        const currentNccIds = this.DetailNhomncc()?.nhacungcap?.map((v) => v.id).filter((id) => id && typeof id === "string") || [];
        const newNccIds = this.CheckListNcc.map((v) => v.id).filter((id) => id && typeof id === "string");
        console.log("Current ncc IDs:", currentNccIds);
        console.log("New ncc IDs:", newNccIds);
        if (JSON.stringify(currentNccIds.sort()) !== JSON.stringify(newNccIds.sort())) {
          const toConnect = newNccIds.filter((id) => !currentNccIds.includes(id));
          const toDisconnect = currentNccIds.filter((id) => !newNccIds.includes(id));
          console.log("To connect:", toConnect);
          console.log("To disconnect:", toDisconnect);
          const relationUpdateData = this.buildRelationUpdateData(toConnect, toDisconnect);
          if (relationUpdateData) {
            console.log("Updating relations with data:", relationUpdateData);
            const relationResult = yield this._GraphqlService.updateOne("nhomncc", { id: this.nhomnccId() }, relationUpdateData);
            console.log("Relation update result:", relationResult);
          }
        } else {
          console.log("No relation changes detected");
        }
      } catch (error) {
        console.error("L\u1ED7i khi c\u1EADp nh\u1EADt relations:", error);
        throw error;
      }
    });
  }
  DeleteData() {
    return __async(this, null, function* () {
      try {
        yield this._NhomnccService.DeleteNhomncc(this.DetailNhomncc());
        this._snackBar.open("X\xF3a Th\xE0nh C\xF4ng", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        this._router.navigate(["/admin/nhomncc"]);
      } catch (error) {
        console.error("L\u1ED7i khi x\xF3a nhomncc:", error);
      }
    });
  }
  goBack() {
    this._ListnhomnccComponent.drawer.close();
    this._NhomnccService.setNhomnccId(null);
    const currentRoute = this._router.url;
    if (currentRoute !== "/admin/nhomncc") {
      this._router.navigate(["/admin/nhomncc"]);
    }
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
    this.DetailNhomncc.update((v) => {
      v.slug = convertToSlug(v.title);
      return v;
    });
  }
  /**
   * Tối ưu hóa filter khách hàng với debounce
   */
  doFilterNcc(event) {
    const value = event.target.value;
    if (value.length < 2) {
      this.FilterNcc = this.ListNcc;
      return;
    }
    const normalizedFilter = removeVietnameseAccents(value.trim().toLowerCase());
    this.FilterNcc = this.ListNcc.filter((v) => removeVietnameseAccents(v.name.toLowerCase()).includes(normalizedFilter));
  }
  ChosenNcc(item) {
    const checkitem = this.CheckListNcc.find((v) => v.id === item.id);
    console.log(this.CheckListNcc);
    console.log(item);
    console.log(checkitem);
    if (!checkitem) {
      this.CheckListNcc = [...this.CheckListNcc, item];
    } else {
      this.CheckListNcc = this.CheckListNcc.filter((v) => v.id !== item.id);
    }
  }
  /**
   * Tối ưu hóa việc áp dụng khách hàng với GraphQL
   */
  ApplyNcc(menu) {
    return __async(this, null, function* () {
      menu.closeMenu();
    });
  }
  /**
   * ✅ Enhanced helper method để validate và build relation update data
   */
  buildRelationUpdateData(toConnect, toDisconnect) {
    const validToConnect = toConnect.filter(
      (id) => id && typeof id === "string" && id.trim() !== "" && id.length >= 36
      // Basic UUID length check
    );
    const validToDisconnect = toDisconnect.filter((id) => id && typeof id === "string" && id.trim() !== "" && id.length >= 36);
    console.log("Validated to connect:", validToConnect);
    console.log("Validated to disconnect:", validToDisconnect);
    if (validToConnect.length === 0 && validToDisconnect.length === 0) {
      console.log("No valid relation changes found");
      return null;
    }
    const updateData = {
      ncc: {}
    };
    if (validToDisconnect.length > 0) {
      updateData.ncc.disconnect = validToDisconnect.map((id) => ({
        id: id.trim()
      }));
    }
    if (validToConnect.length > 0) {
      updateData.ncc.connect = validToConnect.map((id) => ({
        id: id.trim()
      }));
    }
    console.log("Built relation update data:", updateData);
    return updateData;
  }
  /**
   * ✅ Enhanced error message handler for database constraint errors
   */
  getErrorMessage(error, operation = "create") {
    if (!error?.message) {
      return `C\xF3 l\u1ED7i x\u1EA3y ra khi ${operation === "create" ? "t\u1EA1o" : operation === "update" ? "c\u1EADp nh\u1EADt" : "x\xF3a"} nh\xF3m kh\xE1ch h\xE0ng`;
    }
    const errorMsg = error.message.toLowerCase();
    const currentName = this.DetailNhomncc()?.name || "nh\xF3m kh\xE1ch h\xE0ng";
    if (errorMsg.includes("unique constraint failed") && errorMsg.includes("name")) {
      return `T\xEAn nh\xF3m kh\xE1ch h\xE0ng "${currentName}" \u0111\xE3 t\u1ED3n t\u1EA1i. Vui l\xF2ng ch\u1ECDn t\xEAn kh\xE1c.`;
    }
    if (errorMsg.includes("foreign key constraint")) {
      return "C\xF3 l\u1ED7i li\xEAn k\u1EBFt d\u1EEF li\u1EC7u. Vui l\xF2ng ki\u1EC3m tra l\u1EA1i th\xF4ng tin kh\xE1ch h\xE0ng.";
    }
    if (errorMsg.includes("not null constraint")) {
      return "Thi\u1EBFu th\xF4ng tin b\u1EAFt bu\u1ED9c. Vui l\xF2ng \u0111i\u1EC1n \u0111\u1EA7y \u0111\u1EE7 c\xE1c tr\u01B0\u1EDDng.";
    }
    if (errorMsg.includes("record not found")) {
      return operation === "update" ? "Kh\xF4ng t\xECm th\u1EA5y nh\xF3m kh\xE1ch h\xE0ng \u0111\u1EC3 c\u1EADp nh\u1EADt." : "Kh\xF4ng t\xECm th\u1EA5y d\u1EEF li\u1EC7u.";
    }
    if (errorMsg.includes("permission") || errorMsg.includes("access")) {
      return "B\u1EA1n kh\xF4ng c\xF3 quy\u1EC1n th\u1EF1c hi\u1EC7n thao t\xE1c n\xE0y.";
    }
    if (errorMsg.includes("network") || errorMsg.includes("connection") || errorMsg.includes("timeout")) {
      return "L\u1ED7i k\u1EBFt n\u1ED1i. Vui l\xF2ng ki\u1EC3m tra internet v\xE0 th\u1EED l\u1EA1i.";
    }
    return error.message;
  }
  CheckNcc(item) {
    return this.CheckListNcc.find((v) => v.id === item.id) ? true : false;
  }
  /**
   * 🔍 Debug method để test relation updates
   */
  debugRelationUpdate() {
    console.log("=== MANUAL DEBUG TEST ===");
    const relationData = this.buildNestedRelationData();
    console.log("Manual test result:", relationData);
    console.log("Current DetailNhomncc:", this.DetailNhomncc());
    console.log("Current CheckListNcc:", this.CheckListNcc);
    if (this.CheckListNcc.length > 0) {
      console.log("CheckListNcc has items, should create relation updates");
    } else {
      console.log("CheckListNcc is empty, should disconnect all");
    }
    console.log("=== END MANUAL DEBUG ===");
  }
  /**
   * Xóa khách hàng khỏi danh sách nhóm khách hàng
   */
  RemoveNcc(item) {
    if (!item || !item.id) {
      console.warn("Invalid item to remove:", item);
      return;
    }
    this.CheckListNcc = this.CheckListNcc.filter((v) => v.id !== item.id);
    console.log(`\u0110\xE3 x\xF3a kh\xE1ch h\xE0ng ${item.name} kh\u1ECFi danh s\xE1ch`);
  }
  static \u0275fac = function DetailNhomnccComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DetailNhomnccComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DetailNhomnccComponent, selectors: [["app-detailnhomncc"]], decls: 18, vars: 10, consts: [["menuTrigger", "matMenuTrigger"], ["menu", "matMenu"], [1, "flex", "flex-row", "justify-between", "items-center", "space-x-2", "p-2"], ["mat-icon-button", "", "color", "primary", 3, "click"], [1, "font-bold"], [1, "flex", "flex-row", "space-x-2", "items-center"], ["diameter", "20", 4, "ngIf"], [3, "ngModelChange", "ngModel", "disabled"], ["mat-icon-button", "", "color", "primary", 3, "disabled", "click", 4, "ngIf"], ["mat-icon-button", "", "color", "warn", 3, "click", "disabled"], [1, "relative", "flex", "flex-col", "w-full", "p-4", "overflow-auto"], [4, "ngIf"], ["diameter", "20"], ["mat-icon-button", "", "color", "primary", 3, "click", "disabled"], [1, "flex", "flex-col", "space-y-4", "items-center", "justify-center"], [1, "font-bold", "text-2xl"], [1, "flex", "flex-row", "space-x-2", "items-center", "justify-center"], ["mat-flat-button", "", "color", "primary", 3, "click"], ["mat-flat-button", "", "color", "warn", 3, "click"], [1, "w-full", "flex", "flex-col", "space-y-2"], ["appearance", "outline"], ["matInput", "", "placeholder", "Vui l\xF2ng nh\u1EADp Nh\xF3m Nh\xE0 Cung C\u1EA5p", 3, "ngModelChange", "ngModel", "disabled"], ["matInput", "", "placeholder", "Vui l\xF2ng nh\u1EADp M\xF4 T\u1EA3", 3, "ngModelChange", "ngModel", "disabled"], [1, "flex", "flex-row", "flex-wrap", "gap-2"], ["mat-flat-button", "", "color", "primary", 3, "disabled", "matMenuTriggerFor"], [1, "cursor-pointer", "flex", "flex-col", "space-y-4", "p-3", 3, "click"], [1, "relative", "w-full"], ["type", "text", "placeholder", "T\xECm Ki\u1EBFm...", 1, "block", "w-full", "pl-10", "pr-4", "py-2", "text-gray-700", "bg-white", "border", "border-gray-300", "rounded-lg", "focus:border-blue-400", "focus:ring-blue-400", "focus:outline-none", "focus:ring", "focus:ring-opacity-40", 3, "keyup"], [1, "absolute", "inset-y-0", "left-0", "flex", "items-center", "pl-3", "pointer-events-none"], [1, "material-symbols-outlined", "text-gray-500"], [1, "w-full", "flex", "flex-col", "space-y-2", "max-h-44", "overflow-auto"], ["class", "flex flex-row space-x-2 items-center p-2 rounded-lg hover:bg-slate-100", 3, "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "flex", "flex-row", "space-x-2", "items-end", "justify-end"], [1, "flex", "whitespace-nowrap", "p-2", "rounded-lg", "bg-slate-200", "items-center"], [1, "flex", "flex-row", "space-x-2", "items-center", "p-2", "rounded-lg", "hover:bg-slate-100", 3, "click"], ["class", "material-symbols-outlined text-blue-600", 4, "ngIf"], [1, "material-symbols-outlined", "text-blue-600"], [1, "material-symbols-outlined", "text-red-600", "cursor-pointer", 3, "click"]], template: function DetailNhomnccComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 2)(1, "button", 3);
      \u0275\u0275listener("click", function DetailNhomnccComponent_Template_button_click_1_listener() {
        return ctx.goBack();
      });
      \u0275\u0275elementStart(2, "mat-icon");
      \u0275\u0275text(3, "arrow_back");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(4, "div", 4);
      \u0275\u0275text(5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "div", 5);
      \u0275\u0275template(7, DetailNhomnccComponent_mat_spinner_7_Template, 1, 0, "mat-spinner", 6);
      \u0275\u0275elementStart(8, "mat-slide-toggle", 7);
      \u0275\u0275twoWayListener("ngModelChange", function DetailNhomnccComponent_Template_mat_slide_toggle_ngModelChange_8_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.DetailNhomncc().isActive, $event) || (ctx.DetailNhomncc().isActive = $event);
        return $event;
      });
      \u0275\u0275text(9);
      \u0275\u0275elementEnd();
      \u0275\u0275template(10, DetailNhomnccComponent_button_10_Template, 3, 1, "button", 8)(11, DetailNhomnccComponent_button_11_Template, 3, 1, "button", 8);
      \u0275\u0275elementStart(12, "button", 9);
      \u0275\u0275listener("click", function DetailNhomnccComponent_Template_button_click_12_listener() {
        return ctx.toggleDelete();
      });
      \u0275\u0275elementStart(13, "mat-icon");
      \u0275\u0275text(14, "delete");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(15, "div", 10);
      \u0275\u0275template(16, DetailNhomnccComponent_ng_container_16_Template, 9, 0, "ng-container", 11)(17, DetailNhomnccComponent_ng_container_17_Template, 32, 9, "ng-container", 11);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_0_0;
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(((tmp_0_0 = ctx.DetailNhomncc()) == null ? null : tmp_0_0.name) || "Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u");
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.isLoading());
      \u0275\u0275advance();
      \u0275\u0275twoWayProperty("ngModel", ctx.DetailNhomncc().isActive);
      \u0275\u0275property("disabled", !ctx.isEdit() || ctx.isLoading());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.DetailNhomncc().isActive ? "Hi\u1EC3n Th\u1ECB" : "\u1EA8n", " ");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isEdit());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isEdit());
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.isLoading());
      \u0275\u0275advance(4);
      \u0275\u0275property("ngIf", ctx.isDelete());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isDelete());
    }
  }, dependencies: [
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatInputModule,
    MatInput,
    FormsModule,
    DefaultValueAccessor,
    NgControlStatus,
    NgModel,
    MatIconModule,
    MatIcon,
    MatButtonModule,
    MatButton,
    MatIconButton,
    MatSelectModule,
    MatDialogModule,
    CommonModule,
    NgForOf,
    NgIf,
    MatSlideToggleModule,
    MatSlideToggle,
    MatMenuModule,
    MatMenu,
    MatMenuTrigger,
    MatProgressSpinnerModule,
    MatProgressSpinner
  ], encapsulation: 2, changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DetailNhomnccComponent, { className: "DetailNhomnccComponent", filePath: "src/app/admin/nhomncc/detailnhomncc/detailnhomncc.component.ts", lineNumber: 40 });
})();
export {
  DetailNhomnccComponent
};
//# sourceMappingURL=chunk-USY5RXX2.mjs.map
