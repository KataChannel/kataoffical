import './polyfills.server.mjs';
import {
  SupportService
} from "./chunk-F63AK5BB.mjs";
import {
  GetImage
} from "./chunk-TACHADZV.mjs";
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterModule
} from "./chunk-TLYIA537.mjs";
import {
  MatChip,
  MatChipsModule
} from "./chunk-6YRKHWJL.mjs";
import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-KJH76OSC.mjs";
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardSubtitle,
  MatCardTitle
} from "./chunk-6DRHJEKQ.mjs";
import {
  MatInput,
  MatInputModule
} from "./chunk-KU7CK3YB.mjs";
import {
  DefaultValueAccessor,
  FormsModule,
  MatFormField,
  MatFormFieldModule,
  MatLabel,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  RequiredValidator,
  ɵNgNoValidate
} from "./chunk-K4777VIL.mjs";
import {
  MatIcon,
  MatIconModule
} from "./chunk-VOLHFDBH.mjs";
import "./chunk-A5AQV4K7.mjs";
import "./chunk-OWHCCJ6T.mjs";
import "./chunk-ZZDECD7O.mjs";
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
import "./chunk-VMLPK7VD.mjs";
import "./chunk-RILUB63S.mjs";
import "./chunk-AJDW274Y.mjs";
import {
  CommonModule,
  DatePipe
} from "./chunk-UP6A7POK.mjs";
import {
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
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
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-I6KZCWLZ.mjs";
import "./chunk-QS2IQGEQ.mjs";
import {
  __async
} from "./chunk-FMEBT56H.mjs";

// src/app/support/support-detail/support-detail.component.ts
var _c0 = () => ["/admin/support"];
var _forTrack0 = ($index, $item) => $item.id;
function SupportDetailComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275element(1, "mat-spinner");
    \u0275\u0275elementEnd();
  }
}
function SupportDetailComponent_Conditional_2_Conditional_19_For_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "img", 26);
    \u0275\u0275listener("click", function SupportDetailComponent_Conditional_2_Conditional_19_For_2_Conditional_1_Template_img_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const att_r3 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.openFile(att_r3.fileUrl));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const att_r3 = \u0275\u0275nextContext().$implicit;
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275property("src", ctx_r3.getFileUrl(att_r3.fileUrl), \u0275\u0275sanitizeUrl)("alt", att_r3.fileName);
  }
}
function SupportDetailComponent_Conditional_2_Conditional_19_For_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "video", 25);
  }
  if (rf & 2) {
    const att_r3 = \u0275\u0275nextContext().$implicit;
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275property("src", ctx_r3.getFileUrl(att_r3.fileUrl), \u0275\u0275sanitizeUrl);
  }
}
function SupportDetailComponent_Conditional_2_Conditional_19_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23);
    \u0275\u0275template(1, SupportDetailComponent_Conditional_2_Conditional_19_For_2_Conditional_1_Template, 1, 2, "img", 24)(2, SupportDetailComponent_Conditional_2_Conditional_19_For_2_Conditional_2_Template, 1, 1, "video", 25);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const att_r3 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(att_r3.fileType.startsWith("image/") ? 1 : att_r3.fileType.startsWith("video/") ? 2 : -1);
  }
}
function SupportDetailComponent_Conditional_2_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275repeaterCreate(1, SupportDetailComponent_Conditional_2_Conditional_19_For_2_Template, 3, 1, "div", 23, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r3.ticket().attachments);
  }
}
function SupportDetailComponent_Conditional_2_For_24_Conditional_12_For_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "img", 26);
    \u0275\u0275listener("click", function SupportDetailComponent_Conditional_2_For_24_Conditional_12_For_2_Conditional_1_Template_img_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const att_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r3.openFile(att_r6.fileUrl));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const att_r6 = \u0275\u0275nextContext().$implicit;
    const ctx_r3 = \u0275\u0275nextContext(4);
    \u0275\u0275property("src", ctx_r3.getFileUrl(att_r6.fileUrl), \u0275\u0275sanitizeUrl)("alt", att_r6.fileName);
  }
}
function SupportDetailComponent_Conditional_2_For_24_Conditional_12_For_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "video", 25);
  }
  if (rf & 2) {
    const att_r6 = \u0275\u0275nextContext().$implicit;
    const ctx_r3 = \u0275\u0275nextContext(4);
    \u0275\u0275property("src", ctx_r3.getFileUrl(att_r6.fileUrl), \u0275\u0275sanitizeUrl);
  }
}
function SupportDetailComponent_Conditional_2_For_24_Conditional_12_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23);
    \u0275\u0275template(1, SupportDetailComponent_Conditional_2_For_24_Conditional_12_For_2_Conditional_1_Template, 1, 2, "img", 24)(2, SupportDetailComponent_Conditional_2_For_24_Conditional_12_For_2_Conditional_2_Template, 1, 1, "video", 25);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const att_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(att_r6.fileType.startsWith("image/") ? 1 : att_r6.fileType.startsWith("video/") ? 2 : -1);
  }
}
function SupportDetailComponent_Conditional_2_For_24_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275repeaterCreate(1, SupportDetailComponent_Conditional_2_For_24_Conditional_12_For_2_Template, 3, 1, "div", 23, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const response_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275repeater(response_r7.attachments);
  }
}
function SupportDetailComponent_Conditional_2_For_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card")(1, "mat-card-header")(2, "mat-card-subtitle")(3, "div", 27)(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 28);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "date");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(9, "mat-card-content")(10, "p", 10);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275template(12, SupportDetailComponent_Conditional_2_For_24_Conditional_12_Template, 3, 0, "div", 11);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const response_r7 = ctx.$implicit;
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(response_r7.user.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(8, 4, response_r7.createdAt, "dd/MM/yyyy HH:mm"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(response_r7.content);
    \u0275\u0275advance();
    \u0275\u0275conditional((response_r7.attachments == null ? null : response_r7.attachments.length) ? 12 : -1);
  }
}
function SupportDetailComponent_Conditional_2_Conditional_43_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 29)(1, "div", 30)(2, "mat-icon", 31);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 31);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "button", 32);
    \u0275\u0275listener("click", function SupportDetailComponent_Conditional_2_Conditional_43_For_2_Template_button_click_6_listener() {
      const $index_r10 = \u0275\u0275restoreView(_r9).$index;
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.removeFile($index_r10));
    });
    \u0275\u0275elementStart(7, "mat-icon");
    \u0275\u0275text(8, "close");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const file_r11 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r3.getFileIcon(file_r11.type));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(file_r11.name);
  }
}
function SupportDetailComponent_Conditional_2_Conditional_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20);
    \u0275\u0275repeaterCreate(1, SupportDetailComponent_Conditional_2_Conditional_43_For_2_Template, 9, 2, "div", 29, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r3.responseFiles());
  }
}
function SupportDetailComponent_Conditional_2_Conditional_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 22);
  }
}
function SupportDetailComponent_Conditional_2_Conditional_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "send");
    \u0275\u0275elementEnd();
  }
}
function SupportDetailComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 3)(1, "button", 4)(2, "mat-icon");
    \u0275\u0275text(3, "arrow_back");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 5)(5, "div", 6)(6, "h1", 7);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "mat-chip");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "mat-chip");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 8);
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "date");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "mat-card", 9)(16, "mat-card-content")(17, "p", 10);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275template(19, SupportDetailComponent_Conditional_2_Conditional_19_Template, 3, 0, "div", 11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 12)(21, "h2", 13);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(23, SupportDetailComponent_Conditional_2_For_24_Template, 13, 7, "mat-card", null, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "mat-card")(26, "mat-card-header")(27, "mat-card-title");
    \u0275\u0275text(28, "Th\xEAm ph\u1EA3n h\u1ED3i");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "mat-card-content")(30, "form", 14);
    \u0275\u0275listener("submit", function SupportDetailComponent_Conditional_2_Template_form_submit_30_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.onSubmitResponse($event));
    });
    \u0275\u0275elementStart(31, "mat-form-field", 15)(32, "mat-label");
    \u0275\u0275text(33, "N\u1ED9i dung ph\u1EA3n h\u1ED3i");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "textarea", 16);
    \u0275\u0275twoWayListener("ngModelChange", function SupportDetailComponent_Conditional_2_Template_textarea_ngModelChange_34_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.responseContent, $event) || (ctx_r3.responseContent = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "div")(36, "div", 17)(37, "input", 18, 0);
    \u0275\u0275listener("change", function SupportDetailComponent_Conditional_2_Template_input_change_37_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.onFileSelected($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "button", 19);
    \u0275\u0275listener("click", function SupportDetailComponent_Conditional_2_Template_button_click_39_listener() {
      \u0275\u0275restoreView(_r1);
      const fileInput_r8 = \u0275\u0275reference(38);
      return \u0275\u0275resetView(fileInput_r8.click());
    });
    \u0275\u0275elementStart(40, "mat-icon");
    \u0275\u0275text(41, "attach_file");
    \u0275\u0275elementEnd();
    \u0275\u0275text(42, " \u0110\xEDnh k\xE8m file ");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(43, SupportDetailComponent_Conditional_2_Conditional_43_Template, 3, 0, "div", 20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "button", 21);
    \u0275\u0275template(45, SupportDetailComponent_Conditional_2_Conditional_45_Template, 1, 0, "mat-spinner", 22)(46, SupportDetailComponent_Conditional_2_Conditional_46_Template, 2, 0, "mat-icon");
    \u0275\u0275text(47, " G\u1EEDi ph\u1EA3n h\u1ED3i ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_10_0;
    let tmp_11_0;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction0(20, _c0));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r3.ticket().title);
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r3.getStatusClass(ctx_r3.ticket().status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r3.getStatusLabel(ctx_r3.ticket().status), " ");
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r3.getPriorityClass(ctx_r3.ticket().priority));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r3.getPriorityLabel(ctx_r3.ticket().priority), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" T\u1EA1o b\u1EDFi ", ctx_r3.ticket().user.name, " \u2022 ", \u0275\u0275pipeBind2(14, 17, ctx_r3.ticket().createdAt, "dd/MM/yyyy HH:mm"), " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r3.ticket().description);
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_10_0 = ctx_r3.ticket().attachments) == null ? null : tmp_10_0.length) ? 19 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Ph\u1EA3n h\u1ED3i (", ((tmp_11_0 = ctx_r3.ticket().responses) == null ? null : tmp_11_0.length) || 0, ")");
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r3.ticket().responses);
    \u0275\u0275advance(11);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.responseContent);
    \u0275\u0275advance(9);
    \u0275\u0275conditional(ctx_r3.responseFiles().length > 0 ? 43 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r3.responding() || !ctx_r3.responseContent);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.responding() ? 45 : 46);
  }
}
var SupportDetailComponent = class _SupportDetailComponent {
  supportService;
  route;
  router;
  snackBar;
  ticket = signal(null);
  loading = signal(true);
  responding = signal(false);
  responseContent = "";
  responseFiles = signal([]);
  ticketId = "";
  constructor(supportService, route, router, snackBar) {
    this.supportService = supportService;
    this.route = route;
    this.router = router;
    this.snackBar = snackBar;
  }
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.ticketId = params["id"];
      this.loadTicket();
    });
  }
  loadTicket() {
    this.loading.set(true);
    this.supportService.ticket(this.ticketId).subscribe({
      next: (res) => {
        this.ticket.set(res.data.ticket);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.snackBar.open("Kh\xF4ng t\xECm th\u1EA5y v\u1EA5n \u0111\u1EC1", "\u0110\xF3ng", {
          duration: 3e3,
          panelClass: ["snackbar-error"]
        });
        this.router.navigate(["/admin/support"]);
      }
    });
  }
  onFileSelected(event) {
    const files = Array.from(event.target.files);
    this.responseFiles.set([...this.responseFiles(), ...files]);
  }
  removeFile(index) {
    const files = this.responseFiles();
    files.splice(index, 1);
    this.responseFiles.set([...files]);
  }
  onSubmitResponse(e) {
    return __async(this, null, function* () {
      e.preventDefault();
      this.responding.set(true);
      try {
        let attachmentUrls = [];
        if (this.responseFiles().length > 0) {
          const uploadResult = yield this.supportService.uploadFiles(this.responseFiles()).toPromise();
          attachmentUrls = uploadResult?.map((r) => r.fileUrl) || [];
        }
        yield this.supportService.addResponse(this.ticketId, {
          content: this.responseContent,
          attachmentUrls
        }).toPromise();
        this.snackBar.open("\u0110\xE3 g\u1EEDi ph\u1EA3n h\u1ED3i th\xE0nh c\xF4ng!", "\u0110\xF3ng", {
          duration: 3e3,
          panelClass: ["snackbar-success"]
        });
        this.responseContent = "";
        this.responseFiles.set([]);
        this.loadTicket();
      } catch (error) {
        console.error("Error adding response:", error);
        this.snackBar.open("L\u1ED7i khi g\u1EEDi ph\u1EA3n h\u1ED3i. Vui l\xF2ng th\u1EED l\u1EA1i.", "\u0110\xF3ng", {
          duration: 3e3,
          panelClass: ["snackbar-error"]
        });
      } finally {
        this.responding.set(false);
      }
    });
  }
  getFileUrl(url) {
    return GetImage(url);
  }
  openFile(url) {
    window.open(this.getFileUrl(url), "_blank");
  }
  getFileIcon(type) {
    if (type.startsWith("image/"))
      return "image";
    if (type.startsWith("video/"))
      return "videocam";
    return "attach_file";
  }
  getStatusClass(status) {
    const classes = {
      open: "bg-blue-100 text-blue-800",
      inProgress: "bg-yellow-100 text-yellow-800",
      resolved: "bg-green-100 text-green-800",
      closed: "bg-gray-100 text-gray-800"
    };
    return classes[status] || "bg-gray-100";
  }
  getStatusLabel(status) {
    const labels = {
      open: "M\u1EDBi",
      inProgress: "\u0110ang x\u1EED l\xFD",
      resolved: "\u0110\xE3 gi\u1EA3i quy\u1EBFt",
      closed: "\u0110\xE3 \u0111\xF3ng"
    };
    return labels[status] || status;
  }
  getPriorityClass(priority) {
    const classes = {
      low: "bg-gray-100 text-gray-800",
      medium: "bg-blue-100 text-blue-800",
      high: "bg-orange-100 text-orange-800",
      urgent: "bg-red-100 text-red-800"
    };
    return classes[priority] || "bg-gray-100";
  }
  getPriorityLabel(priority) {
    const labels = {
      low: "Th\u1EA5p",
      medium: "Trung b\xECnh",
      high: "Cao",
      urgent: "Kh\u1EA9n c\u1EA5p"
    };
    return labels[priority] || priority;
  }
  static \u0275fac = function SupportDetailComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SupportDetailComponent)(\u0275\u0275directiveInject(SupportService), \u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(MatSnackBar));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SupportDetailComponent, selectors: [["app-support-detail"]], decls: 3, vars: 1, consts: [["fileInput", ""], [1, "container", "mx-auto", "p-4", "max-w-4xl"], [1, "flex", "justify-center", "p-12"], [1, "flex", "items-center", "gap-4", "mb-6"], ["mat-icon-button", "", 3, "routerLink"], [1, "flex-1"], [1, "flex", "items-center", "gap-3"], [1, "text-2xl", "font-bold"], [1, "text-sm", "text-gray-500", "mt-1"], [1, "mb-4"], [1, "whitespace-pre-wrap"], [1, "mt-4", "grid", "grid-cols-2", "md:grid-cols-4", "gap-2"], [1, "space-y-4", "mb-6"], [1, "text-xl", "font-bold"], [1, "space-y-4", 3, "submit"], ["appearance", "outline", 1, "w-full"], ["matInput", "", "name", "content", "required", "", "rows", "4", "placeholder", "Nh\u1EADp n\u1ED9i dung ph\u1EA3n h\u1ED3i...", 3, "ngModelChange", "ngModel"], [1, "border-2", "border-dashed", "border-gray-300", "rounded-lg", "p-4"], ["type", "file", "multiple", "", "accept", "image/*,video/*", 1, "hidden", 3, "change"], ["mat-stroked-button", "", "type", "button", 3, "click"], [1, "mt-2", "space-y-2"], ["mat-raised-button", "", "color", "primary", "type", "submit", 3, "disabled"], ["diameter", "20"], [1, "border", "rounded-lg", "overflow-hidden"], [1, "w-full", "h-32", "object-cover", "cursor-pointer", 3, "src", "alt"], ["controls", "", 1, "w-full", "h-32", "object-cover", 3, "src"], [1, "w-full", "h-32", "object-cover", "cursor-pointer", 3, "click", "src", "alt"], [1, "flex", "items-center", "justify-between"], [1, "text-xs"], [1, "flex", "items-center", "justify-between", "p-2", "bg-gray-50", "rounded"], [1, "flex", "items-center", "gap-2"], [1, "text-sm"], ["mat-icon-button", "", "type", "button", 3, "click"]], template: function SupportDetailComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 1);
      \u0275\u0275template(1, SupportDetailComponent_Conditional_1_Template, 2, 0, "div", 2)(2, SupportDetailComponent_Conditional_2_Template, 48, 21);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading() ? 1 : ctx.ticket() ? 2 : -1);
    }
  }, dependencies: [CommonModule, DatePipe, FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, NgModel, NgForm, RouterModule, RouterLink, MatButtonModule, MatButton, MatIconButton, MatCardModule, MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle, MatChipsModule, MatChip, MatFormFieldModule, MatFormField, MatLabel, MatInputModule, MatInput, MatIconModule, MatIcon, MatProgressSpinnerModule, MatProgressSpinner, MatSnackBarModule], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SupportDetailComponent, { className: "SupportDetailComponent", filePath: "src/app/support/support-detail/support-detail.component.ts", lineNumber: 177 });
})();
export {
  SupportDetailComponent
};
//# sourceMappingURL=chunk-HNW5VEDB.mjs.map
