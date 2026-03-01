import './polyfills.server.mjs';
import {
  SupportService
} from "./chunk-LWMZEBGU.mjs";
import {
  RouterLink,
  RouterModule
} from "./chunk-XXHMETOB.mjs";
import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-XEJ7KODZ.mjs";
import "./chunk-2BTDEHR6.mjs";
import "./chunk-UYYJQ6OX.mjs";
import {
  MatChip,
  MatChipsModule
} from "./chunk-PGBOYRYY.mjs";
import {
  FormsModule
} from "./chunk-5444DBJD.mjs";
import "./chunk-IU3FX4W2.mjs";
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardSubtitle,
  MatCardTitle
} from "./chunk-QDIHOGXG.mjs";
import {
  MatIcon,
  MatIconModule
} from "./chunk-DV7552T6.mjs";
import "./chunk-WUOSISWE.mjs";
import "./chunk-SPQ4ZDSL.mjs";
import "./chunk-K2LNKYXW.mjs";
import {
  MatButton,
  MatButtonModule
} from "./chunk-7RV546X3.mjs";
import "./chunk-IKKFEUUM.mjs";
import "./chunk-DRZ4ITVR.mjs";
import "./chunk-2JIL42JL.mjs";
import {
  CommonModule,
  DatePipe
} from "./chunk-WGGH2PUJ.mjs";
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
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-ADMXANIA.mjs";
import "./chunk-QS2IQGEQ.mjs";
import "./chunk-FMEBT56H.mjs";

// src/app/support/support-list/support-list.component.ts
var _c0 = () => ["/admin/support/new"];
var _c1 = (a0) => ["/admin/support", a0];
var _forTrack0 = ($index, $item) => $item.id;
function SupportListComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4);
    \u0275\u0275element(1, "mat-spinner");
    \u0275\u0275elementEnd();
  }
}
function SupportListComponent_Conditional_9_For_2_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11)(1, "mat-icon", 12);
    \u0275\u0275text(2, "comment");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ticket_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", ticket_r1.responses.length, " ph\u1EA3n h\u1ED3i");
  }
}
function SupportListComponent_Conditional_9_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card", 6)(1, "mat-card-header")(2, "mat-card-title")(3, "div", 8)(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "mat-chip");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(8, "mat-card-subtitle")(9, "div", 9)(10, "mat-chip");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span");
    \u0275\u0275text(13, "\u2022");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span");
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "date");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(17, "mat-card-content")(18, "p", 10);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275template(20, SupportListComponent_Conditional_9_For_2_Conditional_20_Template, 5, 1, "div", 11);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ticket_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(14, _c1, ticket_r1.id));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ticket_r1.title);
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.getStatusClass(ticket_r1.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getStatusLabel(ticket_r1.status), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classMap(ctx_r1.getPriorityClass(ticket_r1.priority));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getPriorityLabel(ticket_r1.priority), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(16, 11, ticket_r1.createdAt, "dd/MM/yyyy HH:mm"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ticket_r1.description);
    \u0275\u0275advance();
    \u0275\u0275conditional((ticket_r1.responses == null ? null : ticket_r1.responses.length) ? 20 : -1);
  }
}
function SupportListComponent_Conditional_9_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7)(1, "mat-icon", 13);
    \u0275\u0275text(2, "inbox");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Ch\u01B0a c\xF3 v\u1EA5n \u0111\u1EC1 n\xE0o \u0111\u01B0\u1EE3c t\u1EA1o");
    \u0275\u0275elementEnd()();
  }
}
function SupportListComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275repeaterCreate(1, SupportListComponent_Conditional_9_For_2_Template, 21, 16, "mat-card", 6, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, SupportListComponent_Conditional_9_Conditional_3_Template, 5, 0, "div", 7);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.tickets());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.tickets().length === 0 ? 3 : -1);
  }
}
var SupportListComponent = class _SupportListComponent {
  supportService;
  tickets = signal([]);
  loading = signal(true);
  constructor(supportService) {
    this.supportService = supportService;
  }
  ngOnInit() {
    this.loadTickets();
  }
  loadTickets() {
    this.loading.set(true);
    this.supportService.tickets().subscribe({
      next: (res) => {
        this.tickets.set(res.data.tickets || []);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
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
  static \u0275fac = function SupportListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SupportListComponent)(\u0275\u0275directiveInject(SupportService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SupportListComponent, selectors: [["app-support-list"]], decls: 10, vars: 3, consts: [[1, "container", "mx-auto", "p-4"], [1, "flex", "justify-between", "items-center", "mb-6"], [1, "text-2xl", "font-bold"], ["mat-raised-button", "", "color", "primary", 3, "routerLink"], [1, "flex", "justify-center", "p-8"], [1, "grid", "gap-4"], [1, "cursor-pointer", "hover:shadow-lg", "transition-shadow", 3, "routerLink"], [1, "text-center", "p-12", "text-gray-500"], [1, "flex", "items-center", "justify-between"], [1, "flex", "items-center", "gap-2", "mt-2"], [1, "text-gray-600", "line-clamp-2"], [1, "flex", "items-center", "gap-2", "mt-2", "text-sm", "text-gray-500"], [1, "text-sm"], [1, "text-6xl", "mb-4"]], template: function SupportListComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1", 2);
      \u0275\u0275text(3, "H\u1ED7 tr\u1EE3 k\u1EF9 thu\u1EADt");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "button", 3)(5, "mat-icon");
      \u0275\u0275text(6, "add");
      \u0275\u0275elementEnd();
      \u0275\u0275text(7, " T\u1EA1o v\u1EA5n \u0111\u1EC1 m\u1EDBi ");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(8, SupportListComponent_Conditional_8_Template, 2, 0, "div", 4)(9, SupportListComponent_Conditional_9_Template, 4, 1);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275property("routerLink", \u0275\u0275pureFunction0(2, _c0));
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.loading() ? 8 : 9);
    }
  }, dependencies: [
    CommonModule,
    DatePipe,
    FormsModule,
    RouterModule,
    RouterLink,
    MatButtonModule,
    MatButton,
    MatCardModule,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatChipsModule,
    MatChip,
    MatIconModule,
    MatIcon,
    MatProgressSpinnerModule,
    MatProgressSpinner
  ], styles: ["\n\n.line-clamp-2[_ngcontent-%COMP%] {\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n/*# sourceMappingURL=support-list.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SupportListComponent, { className: "SupportListComponent", filePath: "src/app/support/support-list/support-list.component.ts", lineNumber: 94 });
})();
export {
  SupportListComponent
};
//# sourceMappingURL=chunk-X2LLI4PV.mjs.map
