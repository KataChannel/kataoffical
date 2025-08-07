import {
  MatProgressBar,
  MatProgressBarModule
} from "./chunk-KRYPHFWV.js";
import {
  ListUserguideComponent
} from "./chunk-BDRQ5UGC.js";
import {
  UserguideService
} from "./chunk-YSHAUWVW.js";
import "./chunk-X7ROAIMK.js";
import {
  MatSlideToggle,
  MatSlideToggleModule
} from "./chunk-OTAJRW5P.js";
import "./chunk-UV2EYCAL.js";
import {
  MatDialogModule
} from "./chunk-YS6BOFHA.js";
import "./chunk-S32RIQSG.js";
import "./chunk-CB53OP7A.js";
import "./chunk-OZX2XR6T.js";
import "./chunk-JFLWRVXN.js";
import {
  convertToSlug
} from "./chunk-657A73EG.js";
import "./chunk-MKCJCKWI.js";
import "./chunk-KRIHICU6.js";
import {
  MatSelect,
  MatSelectModule
} from "./chunk-VZZGNK7J.js";
import "./chunk-LIKOVN7R.js";
import "./chunk-3J77SWWE.js";
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
  MatLabel,
  NgControlStatus,
  NgModel
} from "./chunk-WEAWHMFJ.js";
import "./chunk-44ZKFD54.js";
import {
  environment
} from "./chunk-U3IXXJDR.js";
import {
  MatSnackBar
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
  MatOption
} from "./chunk-GWKJMKCD.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-JGMWTFVW.js";
import {
  HttpClient,
  HttpEventType
} from "./chunk-KJMZCM3Q.js";
import {
  CommonModule,
  NgForOf,
  NgIf,
  NgSwitch,
  NgSwitchCase,
  NgSwitchDefault
} from "./chunk-E6DSVUBK.js";
import {
  effect,
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-IHZ7YO24.js";
import "./chunk-E3MB3462.js";
import {
  __async
} from "./chunk-SXK72SKC.js";

// src/app/admin/userguide/detailuserguide/detailuserguide.component.ts
function DetailUserguideComponent_button_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 3);
    \u0275\u0275listener("click", function DetailUserguideComponent_button_9_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.handleUserguideAction());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "save");
    \u0275\u0275elementEnd()();
  }
}
function DetailUserguideComponent_button_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 3);
    \u0275\u0275listener("click", function DetailUserguideComponent_button_10_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleEdit());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "edit");
    \u0275\u0275elementEnd()();
  }
}
function DetailUserguideComponent_div_21_button_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 3);
    \u0275\u0275listener("click", function DetailUserguideComponent_div_21_button_4_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const item_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.removeBlock(item_r6));
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "delete");
    \u0275\u0275elementEnd()();
  }
}
function DetailUserguideComponent_div_21_ng_container_20_button_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 35);
    \u0275\u0275listener("click", function DetailUserguideComponent_div_21_ng_container_20_button_6_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r9);
      \u0275\u0275nextContext();
      const imageInput_r10 = \u0275\u0275reference(5);
      return \u0275\u0275resetView(imageInput_r10.click());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "cloud_upload");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Ch\u1ECDn H\xECnh \u1EA2nh ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const i_r7 = \u0275\u0275nextContext(2).index;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", ctx_r1.uploadProgress[i_r7]);
  }
}
function DetailUserguideComponent_div_21_ng_container_20_button_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 36);
    \u0275\u0275listener("click", function DetailUserguideComponent_div_21_ng_container_20_button_7_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r11);
      const i_r7 = \u0275\u0275nextContext(2).index;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.removeMedia(i_r7, "image"));
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "delete");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const i_r7 = \u0275\u0275nextContext(2).index;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", ctx_r1.uploadProgress[i_r7]);
  }
}
function DetailUserguideComponent_div_21_ng_container_20_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 37);
    \u0275\u0275element(1, "mat-progress-bar", 38);
    \u0275\u0275elementStart(2, "div", 39);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const i_r7 = \u0275\u0275nextContext(2).index;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("value", ctx_r1.uploadProgress[i_r7]);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u0110ang t\u1EA3i l\xEAn... ", ctx_r1.uploadProgress[i_r7], "%");
  }
}
function DetailUserguideComponent_div_21_ng_container_20_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 40);
    \u0275\u0275element(1, "img", 41);
    \u0275\u0275elementStart(2, "div", 42);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const i_r7 = \u0275\u0275nextContext(2).index;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("src", ctx_r1.ImageURL + ctx_r1.DetailUserguide().UserguidBlocks[i_r7].imageUrl, \u0275\u0275sanitizeUrl)("alt", ctx_r1.DetailUserguide().UserguidBlocks[i_r7].imageAlt || "Preview");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.DetailUserguide().UserguidBlocks[i_r7].imageUrl, " ");
  }
}
function DetailUserguideComponent_div_21_ng_container_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 26)(2, "div", 27)(3, "div", 28)(4, "input", 29, 0);
    \u0275\u0275listener("change", function DetailUserguideComponent_div_21_ng_container_20_Template_input_change_4_listener($event) {
      \u0275\u0275restoreView(_r8);
      const i_r7 = \u0275\u0275nextContext().index;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onImageSelected($event, i_r7));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, DetailUserguideComponent_div_21_ng_container_20_button_6_Template, 4, 1, "button", 30)(7, DetailUserguideComponent_div_21_ng_container_20_button_7_Template, 3, 1, "button", 31);
    \u0275\u0275elementEnd();
    \u0275\u0275template(8, DetailUserguideComponent_div_21_ng_container_20_div_8_Template, 4, 2, "div", 32)(9, DetailUserguideComponent_div_21_ng_container_20_div_9_Template, 4, 3, "div", 33);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "mat-form-field", 10)(11, "mat-label");
    \u0275\u0275text(12, "M\xF4 t\u1EA3 h\xECnh \u1EA3nh");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "input", 34);
    \u0275\u0275twoWayListener("ngModelChange", function DetailUserguideComponent_div_21_ng_container_20_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r8);
      const i_r7 = \u0275\u0275nextContext().index;
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailUserguide().UserguidBlocks[i_r7].imageAlt, $event) || (ctx_r1.DetailUserguide().UserguidBlocks[i_r7].imageAlt = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const i_r7 = \u0275\u0275nextContext().index;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", ctx_r1.isEdit());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isEdit() && ctx_r1.DetailUserguide().UserguidBlocks[i_r7].imageUrl);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.uploadProgress[i_r7]);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.DetailUserguide().UserguidBlocks[i_r7].imageUrl && !ctx_r1.uploadProgress[i_r7]);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailUserguide().UserguidBlocks[i_r7].imageAlt);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
  }
}
function DetailUserguideComponent_div_21_ng_container_21_button_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 35);
    \u0275\u0275listener("click", function DetailUserguideComponent_div_21_ng_container_21_button_6_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r13);
      \u0275\u0275nextContext();
      const videoInput_r14 = \u0275\u0275reference(5);
      return \u0275\u0275resetView(videoInput_r14.click());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "videocam");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Ch\u1ECDn Video ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const i_r7 = \u0275\u0275nextContext(2).index;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", ctx_r1.uploadProgress[i_r7]);
  }
}
function DetailUserguideComponent_div_21_ng_container_21_button_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 36);
    \u0275\u0275listener("click", function DetailUserguideComponent_div_21_ng_container_21_button_7_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r15);
      const i_r7 = \u0275\u0275nextContext(2).index;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.removeMedia(i_r7, "video"));
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "delete");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const i_r7 = \u0275\u0275nextContext(2).index;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", ctx_r1.uploadProgress[i_r7]);
  }
}
function DetailUserguideComponent_div_21_ng_container_21_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 37);
    \u0275\u0275element(1, "mat-progress-bar", 38);
    \u0275\u0275elementStart(2, "div", 39);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const i_r7 = \u0275\u0275nextContext(2).index;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("value", ctx_r1.uploadProgress[i_r7]);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u0110ang t\u1EA3i l\xEAn... ", ctx_r1.uploadProgress[i_r7], "%");
  }
}
function DetailUserguideComponent_div_21_ng_container_21_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 40)(1, "video", 45);
    \u0275\u0275text(2, " Tr\xECnh duy\u1EC7t kh\xF4ng h\u1ED7 tr\u1EE3 video. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 42);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const i_r7 = \u0275\u0275nextContext(2).index;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("src", ctx_r1.ImageURL + ctx_r1.DetailUserguide().UserguidBlocks[i_r7].videoUrl, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.DetailUserguide().UserguidBlocks[i_r7].videoUrl, " ");
  }
}
function DetailUserguideComponent_div_21_ng_container_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 26)(2, "div", 27)(3, "div", 28)(4, "input", 43, 1);
    \u0275\u0275listener("change", function DetailUserguideComponent_div_21_ng_container_21_Template_input_change_4_listener($event) {
      \u0275\u0275restoreView(_r12);
      const i_r7 = \u0275\u0275nextContext().index;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onVideoSelected($event, i_r7));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, DetailUserguideComponent_div_21_ng_container_21_button_6_Template, 4, 1, "button", 30)(7, DetailUserguideComponent_div_21_ng_container_21_button_7_Template, 3, 1, "button", 31);
    \u0275\u0275elementEnd();
    \u0275\u0275template(8, DetailUserguideComponent_div_21_ng_container_21_div_8_Template, 4, 2, "div", 32)(9, DetailUserguideComponent_div_21_ng_container_21_div_9_Template, 5, 2, "div", 33);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "mat-form-field", 10)(11, "mat-label");
    \u0275\u0275text(12, "Lo\u1EA1i Video");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "input", 44);
    \u0275\u0275twoWayListener("ngModelChange", function DetailUserguideComponent_div_21_ng_container_21_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r12);
      const i_r7 = \u0275\u0275nextContext().index;
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailUserguide().UserguidBlocks[i_r7].videoType, $event) || (ctx_r1.DetailUserguide().UserguidBlocks[i_r7].videoType = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const i_r7 = \u0275\u0275nextContext().index;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", ctx_r1.isEdit());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isEdit() && ctx_r1.DetailUserguide().UserguidBlocks[i_r7].videoUrl);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.uploadProgress[i_r7]);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.DetailUserguide().UserguidBlocks[i_r7].videoUrl && !ctx_r1.uploadProgress[i_r7]);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailUserguide().UserguidBlocks[i_r7].videoType);
    \u0275\u0275property("disabled", true);
  }
}
function DetailUserguideComponent_div_21_ng_container_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function DetailUserguideComponent_div_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 16)(1, "div", 17)(2, "button", 18);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, DetailUserguideComponent_div_21_button_4_Template, 3, 0, "button", 7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "mat-form-field", 10)(6, "mat-label");
    \u0275\u0275text(7, "Ti\xEAu \u0110\u1EC1 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "input", 11);
    \u0275\u0275twoWayListener("ngModelChange", function DetailUserguideComponent_div_21_Template_input_ngModelChange_8_listener($event) {
      const i_r7 = \u0275\u0275restoreView(_r4).index;
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailUserguide().UserguidBlocks[i_r7].title, $event) || (ctx_r1.DetailUserguide().UserguidBlocks[i_r7].title = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "mat-form-field", 10)(10, "mat-label");
    \u0275\u0275text(11, "Lo\u1EA1i");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "mat-select", 6);
    \u0275\u0275twoWayListener("ngModelChange", function DetailUserguideComponent_div_21_Template_mat_select_ngModelChange_12_listener($event) {
      const i_r7 = \u0275\u0275restoreView(_r4).index;
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailUserguide().UserguidBlocks[i_r7].type, $event) || (ctx_r1.DetailUserguide().UserguidBlocks[i_r7].type = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(13, "mat-option", 19);
    \u0275\u0275text(14, "text");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "mat-option", 20);
    \u0275\u0275text(16, "image");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "mat-option", 21);
    \u0275\u0275text(18, "video");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementContainerStart(19, 22);
    \u0275\u0275template(20, DetailUserguideComponent_div_21_ng_container_20_Template, 14, 6, "ng-container", 23)(21, DetailUserguideComponent_div_21_ng_container_21_Template, 14, 6, "ng-container", 23)(22, DetailUserguideComponent_div_21_ng_container_22_Template, 1, 0, "ng-container", 24);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementStart(23, "mat-form-field", 10)(24, "mat-label");
    \u0275\u0275text(25, "N\u1ED9i dung");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "input", 25);
    \u0275\u0275twoWayListener("ngModelChange", function DetailUserguideComponent_div_21_Template_input_ngModelChange_26_listener($event) {
      const i_r7 = \u0275\u0275restoreView(_r4).index;
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailUserguide().UserguidBlocks[i_r7].description, $event) || (ctx_r1.DetailUserguide().UserguidBlocks[i_r7].description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const i_r7 = ctx.index;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(i_r7 + 1);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isEdit());
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailUserguide().UserguidBlocks[i_r7].title);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailUserguide().UserguidBlocks[i_r7].type);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
    \u0275\u0275advance(7);
    \u0275\u0275property("ngSwitch", ctx_r1.DetailUserguide().UserguidBlocks[i_r7].type);
    \u0275\u0275advance();
    \u0275\u0275property("ngSwitchCase", "image");
    \u0275\u0275advance();
    \u0275\u0275property("ngSwitchCase", "video");
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailUserguide().UserguidBlocks[i_r7].description);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
  }
}
var DetailUserguideComponent = class _DetailUserguideComponent {
  _ListUserguideComponent = inject(ListUserguideComponent);
  _UserguideService = inject(UserguideService);
  _route = inject(ActivatedRoute);
  _router = inject(Router);
  _snackBar = inject(MatSnackBar);
  _http = inject(HttpClient);
  // Upload progress tracking
  uploadProgress = {};
  // MinIO configuration
  minioApiUrl = environment.APIURL + "/minio/upload";
  constructor() {
    this._route.paramMap.subscribe((params) => {
      const id = params.get("id");
      this._UserguideService.setUserguideId(id);
    });
    effect(() => __async(this, null, function* () {
      const id = this._UserguideService.userguideId();
      if (!id) {
        this._router.navigate(["/admin/userguide"]);
        this._ListUserguideComponent.drawer.close();
      }
      if (id === "new") {
        this.DetailUserguide.set({});
        this._ListUserguideComponent.drawer.open();
        this.isEdit.update((value) => !value);
        this._router.navigate(["/admin/userguide", "new"]);
      } else {
        yield this._UserguideService.getUserguideBy({ id });
        this._ListUserguideComponent.drawer.open();
        this._router.navigate(["/admin/userguide", id]);
      }
    }));
  }
  DetailUserguide = this._UserguideService.DetailUserguide;
  ImageURL = environment.ImageURL?.replace("http://", "https://") || "";
  isEdit = signal(false);
  isDelete = signal(false);
  userguideId = this._UserguideService.userguideId;
  ngOnInit() {
    return __async(this, null, function* () {
    });
  }
  handleUserguideAction() {
    return __async(this, null, function* () {
      if (this.userguideId() === "new") {
        yield this.createUserguide();
      } else {
        yield this.updateUserguide();
      }
    });
  }
  createUserguide() {
    return __async(this, null, function* () {
      try {
        yield this._UserguideService.CreateUserguide(this.DetailUserguide());
        this._snackBar.open("T\u1EA1o M\u1EDBi Th\xE0nh C\xF4ng", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        this.isEdit.update((value) => !value);
      } catch (error) {
        console.error("L\u1ED7i khi t\u1EA1o userguide:", error);
      }
    });
  }
  updateUserguide() {
    return __async(this, null, function* () {
      try {
        yield this._UserguideService.updateUserguide(this.DetailUserguide());
        this._snackBar.open("C\u1EADp Nh\u1EADt Th\xE0nh C\xF4ng", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        this.isEdit.update((value) => !value);
      } catch (error) {
        console.error("L\u1ED7i khi c\u1EADp nh\u1EADt userguide:", error);
      }
    });
  }
  DeleteData() {
    return __async(this, null, function* () {
      try {
        yield this._UserguideService.DeleteUserguide(this.DetailUserguide());
        this._snackBar.open("X\xF3a Th\xE0nh C\xF4ng", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        this._router.navigate(["/admin/userguide"]);
      } catch (error) {
        console.error("L\u1ED7i khi x\xF3a userguide:", error);
      }
    });
  }
  goBack() {
    this._router.navigate(["/admin/userguide"]);
    this._ListUserguideComponent.drawer.close();
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
    this.DetailUserguide.update((v) => {
      v.slug = convertToSlug(v.title);
      return v;
    });
  }
  addBlock() {
    this.DetailUserguide.update((v) => {
      if (!v.UserguidBlocks) {
        v.UserguidBlocks = [];
      }
      v.UserguidBlocks.push({
        title: "",
        type: "text",
        description: ""
      });
      return v;
    });
  }
  removeBlock(item) {
    this.DetailUserguide.update((v) => {
      if (v.UserguidBlocks && v.UserguidBlocks.length > 0) {
        const index = v.UserguidBlocks.findIndex((block) => block.id === item.id);
        if (index > -1) {
          v.UserguidBlocks.splice(index, 1);
        }
      }
      return v;
    });
  }
  // Media Upload Methods
  onImageSelected(event, blockIndex) {
    const file = event.target.files[0];
    if (file) {
      this.uploadImageToMinio(file, blockIndex);
    }
    event.target.value = "";
  }
  onVideoSelected(event, blockIndex) {
    const file = event.target.files[0];
    if (file) {
      this.uploadVideoToMinio(file, blockIndex);
    }
    event.target.value = "";
  }
  uploadImageToMinio(file, blockIndex) {
    return __async(this, null, function* () {
      try {
        if (!file.type.startsWith("image/")) {
          this._snackBar.open("Ch\u1EC9 \u0111\u01B0\u1EE3c upload file h\xECnh \u1EA3nh", "", {
            duration: 3e3,
            panelClass: ["snackbar-error"]
          });
          return;
        }
        if (file.size > 10 * 1024 * 1024) {
          this._snackBar.open("File qu\xE1 l\u1EDBn. T\u1ED1i \u0111a 10MB", "", {
            duration: 3e3,
            panelClass: ["snackbar-error"]
          });
          return;
        }
        const uploadResult = yield this.uploadFileToMinio(file, "userguide/images", blockIndex);
        console.log("Upload result:", uploadResult);
        if (uploadResult) {
          this.DetailUserguide.update((v) => {
            v.UserguidBlocks[blockIndex].imageUrl = uploadResult.imageUrl;
            v.UserguidBlocks[blockIndex].imageAlt = v.UserguidBlocks[blockIndex].imageAlt || file.name;
            return v;
          });
          this._snackBar.open("Upload h\xECnh \u1EA3nh th\xE0nh c\xF4ng", "", {
            duration: 2e3,
            panelClass: ["snackbar-success"]
          });
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        this._snackBar.open("L\u1ED7i upload h\xECnh \u1EA3nh: " + (error.message || "Unknown error"), "", {
          duration: 5e3,
          panelClass: ["snackbar-error"]
        });
      } finally {
        delete this.uploadProgress[blockIndex];
      }
    });
  }
  uploadVideoToMinio(file, blockIndex) {
    return __async(this, null, function* () {
      try {
        if (!file.type.startsWith("video/")) {
          this._snackBar.open("Ch\u1EC9 \u0111\u01B0\u1EE3c upload file video", "", {
            duration: 3e3,
            panelClass: ["snackbar-error"]
          });
          return;
        }
        if (file.size > 100 * 1024 * 1024) {
          this._snackBar.open("File qu\xE1 l\u1EDBn. T\u1ED1i \u0111a 100MB", "", {
            duration: 3e3,
            panelClass: ["snackbar-error"]
          });
          return;
        }
        const uploadResult = yield this.uploadFileToMinio(file, "userguide/videos", blockIndex);
        if (uploadResult) {
          this.DetailUserguide.update((v) => {
            v.UserguidBlocks[blockIndex].videoUrl = uploadResult.imageUrl;
            v.UserguidBlocks[blockIndex].videoType = file.type;
            return v;
          });
          this._snackBar.open("Upload video th\xE0nh c\xF4ng", "", {
            duration: 2e3,
            panelClass: ["snackbar-success"]
          });
        }
      } catch (error) {
        console.error("Error uploading video:", error);
        this._snackBar.open("L\u1ED7i upload video: " + (error.message || "Unknown error"), "", {
          duration: 5e3,
          panelClass: ["snackbar-error"]
        });
      } finally {
        delete this.uploadProgress[blockIndex];
      }
    });
  }
  uploadFileToMinio(file, folder, blockIndex) {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);
      formData.append("originalName", file.name);
      this.uploadProgress[blockIndex] = 0;
      this._http.post(this.minioApiUrl, formData, {
        observe: "events",
        reportProgress: true
      }).subscribe({
        next: (event) => {
          if (event.type === HttpEventType.UploadProgress) {
            if (event.total) {
              this.uploadProgress[blockIndex] = Math.round(100 * event.loaded / event.total);
            }
          } else if (event.type === HttpEventType.Response) {
            resolve(event.body);
          }
        },
        error: (error) => {
          console.error("Upload error:", error);
          reject(error);
        }
      });
    });
  }
  removeMedia(blockIndex, mediaType) {
    this.DetailUserguide.update((v) => {
      if (mediaType === "image") {
        v.UserguidBlocks[blockIndex].imageUrl = "";
        v.UserguidBlocks[blockIndex].imageAlt = "";
      } else if (mediaType === "video") {
        v.UserguidBlocks[blockIndex].videoUrl = "";
        v.UserguidBlocks[blockIndex].videoType = "";
      }
      return v;
    });
    this._snackBar.open(`\u0110\xE3 x\xF3a ${mediaType === "image" ? "h\xECnh \u1EA3nh" : "video"}`, "", {
      duration: 2e3,
      panelClass: ["snackbar-success"]
    });
  }
  getMediaUrl(filePath) {
    if (!filePath)
      return "";
    if (filePath.startsWith("http://") || filePath.startsWith("https://")) {
      return filePath.replace("http://", "https://");
    }
    return `https://${environment.APIURL.replace("http://", "").replace("https://", "")}/files/${filePath}`;
  }
  static \u0275fac = function DetailUserguideComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DetailUserguideComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DetailUserguideComponent, selectors: [["app-detailuserguide"]], decls: 27, vars: 12, consts: [["imageInput", ""], ["videoInput", ""], [1, "flex", "flex-row", "justify-between", "items-center", "space-x-2", "p-2"], ["mat-icon-button", "", "color", "primary", 3, "click"], [1, "font-bold"], [1, "flex", "flex-row", "space-x-2", "items-center"], [3, "ngModelChange", "ngModel", "disabled"], ["mat-icon-button", "", "color", "primary", 3, "click", 4, "ngIf"], [1, "relative", "flex", "flex-col", "space-y-2", "w-full", "p-4", "overflow-auto"], [1, "w-full", "flex", "flex-col"], ["appearance", "outline"], ["matInput", "", "placeholder", "Vui l\xF2ng nh\u1EADp Ti\xEAu \u0110\u1EC1", 3, "ngModelChange", "ngModel", "disabled"], ["matInput", "", "placeholder", "Vui l\xF2ng nh\u1EADp M\xF4 T\u1EA3", 3, "ngModelChange", "ngModel", "disabled"], ["class", "grid lg:grid-cols-2 gap-2 p-2 rounded-lg border", 4, "ngFor", "ngForOf"], [1, "flex", "flex-row", "justify-center", "p-4", "bg-slate-50", "border-dashed", "border-2", "border-slate-300", "rounded-lg"], ["mat-flat-button", "", "color", "primary", 3, "click", "disabled"], [1, "grid", "lg:grid-cols-2", "gap-2", "p-2", "rounded-lg", "border"], [1, "lg:col-span-2", "flex", "flex-row", "justify-between", "items-center", "space-x-2"], ["mat-flat-button", "", "color", "primary"], ["value", "text"], ["value", "image"], ["value", "video"], [3, "ngSwitch"], [4, "ngSwitchCase"], [4, "ngSwitchDefault"], ["matInput", "", "placeholder", "Vui l\xF2ng nh\u1EADp n\u1ED9i dung", 3, "ngModelChange", "ngModel", "disabled"], [1, "lg:col-span-2", "space-y-4"], [1, "flex", "flex-col", "space-y-2"], [1, "flex", "items-center", "space-x-2"], ["type", "file", "accept", "image/*", 2, "display", "none", 3, "change"], ["mat-raised-button", "", "color", "primary", 3, "disabled", "click", 4, "ngIf"], ["mat-icon-button", "", "color", "warn", 3, "disabled", "click", 4, "ngIf"], ["class", "w-full", 4, "ngIf"], ["class", "mt-2 p-2 border border-gray-200 rounded-lg", 4, "ngIf"], ["matInput", "", "placeholder", "Vui l\xF2ng nh\u1EADp m\xF4 t\u1EA3 h\xECnh \u1EA3nh", 3, "ngModelChange", "ngModel", "disabled"], ["mat-raised-button", "", "color", "primary", 3, "click", "disabled"], ["mat-icon-button", "", "color", "warn", 3, "click", "disabled"], [1, "w-full"], ["mode", "determinate", 3, "value"], [1, "text-sm", "text-gray-600", "mt-1"], [1, "mt-2", "p-2", "border", "border-gray-200", "rounded-lg"], [1, "max-w-full", "h-48", "object-contain", "rounded", 3, "src", "alt"], [1, "text-sm", "text-gray-500", "mt-1", "break-all"], ["type", "file", "accept", "video/*", 2, "display", "none", 3, "change"], ["matInput", "", "placeholder", "T\u1EF1 \u0111\u1ED9ng ph\xE1t hi\u1EC7n", 3, "ngModelChange", "ngModel", "disabled"], ["controls", "", 1, "max-w-full", "h-48", "rounded", 3, "src"]], template: function DetailUserguideComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 2)(1, "button", 3);
      \u0275\u0275listener("click", function DetailUserguideComponent_Template_button_click_1_listener() {
        return ctx.goBack();
      });
      \u0275\u0275elementStart(2, "mat-icon");
      \u0275\u0275text(3, "arrow_back");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(4, "div", 4);
      \u0275\u0275text(5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "div", 5)(7, "mat-slide-toggle", 6);
      \u0275\u0275twoWayListener("ngModelChange", function DetailUserguideComponent_Template_mat_slide_toggle_ngModelChange_7_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.DetailUserguide().isActive, $event) || (ctx.DetailUserguide().isActive = $event);
        return $event;
      });
      \u0275\u0275text(8);
      \u0275\u0275elementEnd();
      \u0275\u0275template(9, DetailUserguideComponent_button_9_Template, 3, 0, "button", 7)(10, DetailUserguideComponent_button_10_Template, 3, 0, "button", 7);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "div", 8)(12, "div", 9)(13, "mat-form-field", 10)(14, "mat-label");
      \u0275\u0275text(15, "Ti\xEAu \u0110\u1EC1");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "input", 11);
      \u0275\u0275twoWayListener("ngModelChange", function DetailUserguideComponent_Template_input_ngModelChange_16_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.DetailUserguide().title, $event) || (ctx.DetailUserguide().title = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(17, "mat-form-field", 10)(18, "mat-label");
      \u0275\u0275text(19, "M\xF4 T\u1EA3");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "input", 12);
      \u0275\u0275twoWayListener("ngModelChange", function DetailUserguideComponent_Template_input_ngModelChange_20_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.DetailUserguide().description, $event) || (ctx.DetailUserguide().description = $event);
        return $event;
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(21, DetailUserguideComponent_div_21_Template, 27, 11, "div", 13);
      \u0275\u0275elementStart(22, "div", 14)(23, "button", 15);
      \u0275\u0275listener("click", function DetailUserguideComponent_Template_button_click_23_listener() {
        return ctx.addBlock();
      });
      \u0275\u0275text(24, " Th\xEAm Kh\u1ED1i ");
      \u0275\u0275elementStart(25, "mat-icon");
      \u0275\u0275text(26, "add");
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      let tmp_0_0;
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(((tmp_0_0 = ctx.DetailUserguide()) == null ? null : tmp_0_0.title) || "Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u");
      \u0275\u0275advance(2);
      \u0275\u0275twoWayProperty("ngModel", ctx.DetailUserguide().isActive);
      \u0275\u0275property("disabled", !ctx.isEdit());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate(ctx.DetailUserguide().isActive ? "Hi\u1EC3n Th\u1ECB" : "\u1EA8n");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isEdit());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isEdit());
      \u0275\u0275advance(6);
      \u0275\u0275twoWayProperty("ngModel", ctx.DetailUserguide().title);
      \u0275\u0275property("disabled", !ctx.isEdit());
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.DetailUserguide().description);
      \u0275\u0275property("disabled", !ctx.isEdit());
      \u0275\u0275advance();
      \u0275\u0275property("ngForOf", ctx.DetailUserguide().UserguidBlocks);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", !ctx.isEdit());
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
    MatSelect,
    MatOption,
    MatDialogModule,
    CommonModule,
    NgForOf,
    NgIf,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    MatSlideToggleModule,
    MatSlideToggle,
    MatProgressBarModule,
    MatProgressBar
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DetailUserguideComponent, { className: "DetailUserguideComponent", filePath: "src/app/admin/userguide/detailuserguide/detailuserguide.component.ts", lineNumber: 36 });
})();
export {
  DetailUserguideComponent
};
//# sourceMappingURL=chunk-SOAI5M2S.js.map
