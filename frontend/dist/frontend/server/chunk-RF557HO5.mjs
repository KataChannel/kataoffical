import './polyfills.server.mjs';
import {
  SearchService
} from "./chunk-DZF5RARC.mjs";
import {
  DonhangService
} from "./chunk-HQOWTRL4.mjs";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "./chunk-RUJ72W7P.mjs";
import {
  require_moment
} from "./chunk-TEMMKMG5.mjs";
import {
  MatMenuModule
} from "./chunk-YOUETZOR.mjs";
import {
  MatIcon,
  MatIconModule
} from "./chunk-TGETIOQI.mjs";
import {
  DefaultValueAccessor,
  FormsModule,
  MatFormField,
  MatFormFieldModule,
  MatInput,
  MatInputModule,
  MatLabel,
  MatSuffix,
  NgControlStatus,
  NgModel
} from "./chunk-BTD2ENWJ.mjs";
import "./chunk-DRJRGOAY.mjs";
import {
  environment
} from "./chunk-QFPTY5IH.mjs";
import {
  StorageService
} from "./chunk-A6W66WDU.mjs";
import "./chunk-AVOXPLBL.mjs";
import "./chunk-MGLNC3ZQ.mjs";
import {
  MatButton,
  MatButtonModule
} from "./chunk-2QXHUJNF.mjs";
import {
  MatCommonModule,
  MatNativeDateModule
} from "./chunk-7GJ6SLXG.mjs";
import "./chunk-CE5R7E7Z.mjs";
import {
  Router
} from "./chunk-PLFAEF4K.mjs";
import "./chunk-HCNIBG7Y.mjs";
import {
  CommonModule,
  DatePipe,
  DecimalPipe,
  NgForOf,
  NgIf
} from "./chunk-H3GF4RFC.mjs";
import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  InjectionToken,
  Input,
  NgModule,
  ViewEncapsulation,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-4EQURZBD.mjs";
import "./chunk-QS2IQGEQ.mjs";
import {
  __async,
  __spreadValues,
  __toESM
} from "./chunk-FMEBT56H.mjs";

// node_modules/@angular/material/fesm2022/card.mjs
var _c0 = ["*"];
var _c1 = [[["mat-card-title"], ["mat-card-subtitle"], ["", "mat-card-title", ""], ["", "mat-card-subtitle", ""], ["", "matCardTitle", ""], ["", "matCardSubtitle", ""]], [["", "mat-card-image", ""], ["", "matCardImage", ""], ["", "mat-card-sm-image", ""], ["", "matCardImageSmall", ""], ["", "mat-card-md-image", ""], ["", "matCardImageMedium", ""], ["", "mat-card-lg-image", ""], ["", "matCardImageLarge", ""], ["", "mat-card-xl-image", ""], ["", "matCardImageXLarge", ""]], "*"];
var _c2 = ["mat-card-title, mat-card-subtitle,\n      [mat-card-title], [mat-card-subtitle],\n      [matCardTitle], [matCardSubtitle]", "[mat-card-image], [matCardImage],\n                    [mat-card-sm-image], [matCardImageSmall],\n                    [mat-card-md-image], [matCardImageMedium],\n                    [mat-card-lg-image], [matCardImageLarge],\n                    [mat-card-xl-image], [matCardImageXLarge]", "*"];
var _c3 = [[["", "mat-card-avatar", ""], ["", "matCardAvatar", ""]], [["mat-card-title"], ["mat-card-subtitle"], ["", "mat-card-title", ""], ["", "mat-card-subtitle", ""], ["", "matCardTitle", ""], ["", "matCardSubtitle", ""]], "*"];
var _c4 = ["[mat-card-avatar], [matCardAvatar]", "mat-card-title, mat-card-subtitle,\n      [mat-card-title], [mat-card-subtitle],\n      [matCardTitle], [matCardSubtitle]", "*"];
var MAT_CARD_CONFIG = new InjectionToken("MAT_CARD_CONFIG");
var MatCard = class _MatCard {
  appearance;
  constructor() {
    const config = inject(MAT_CARD_CONFIG, {
      optional: true
    });
    this.appearance = config?.appearance || "raised";
  }
  static \u0275fac = function MatCard_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatCard)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MatCard,
    selectors: [["mat-card"]],
    hostAttrs: [1, "mat-mdc-card", "mdc-card"],
    hostVars: 4,
    hostBindings: function MatCard_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275classProp("mat-mdc-card-outlined", ctx.appearance === "outlined")("mdc-card--outlined", ctx.appearance === "outlined");
      }
    },
    inputs: {
      appearance: "appearance"
    },
    exportAs: ["matCard"],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function MatCard_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef();
        \u0275\u0275projection(0);
      }
    },
    styles: ['.mat-mdc-card{display:flex;flex-direction:column;box-sizing:border-box;position:relative;border-style:solid;border-width:0;background-color:var(--mdc-elevated-card-container-color, var(--mat-sys-surface-container-low));border-color:var(--mdc-elevated-card-container-color, var(--mat-sys-surface-container-low));border-radius:var(--mdc-elevated-card-container-shape, var(--mat-sys-corner-medium));box-shadow:var(--mdc-elevated-card-container-elevation, var(--mat-sys-level1))}.mat-mdc-card::after{position:absolute;top:0;left:0;width:100%;height:100%;border:solid 1px rgba(0,0,0,0);content:"";display:block;pointer-events:none;box-sizing:border-box;border-radius:var(--mdc-elevated-card-container-shape, var(--mat-sys-corner-medium))}.mat-mdc-card-outlined{background-color:var(--mdc-outlined-card-container-color, var(--mat-sys-surface));border-radius:var(--mdc-outlined-card-container-shape, var(--mat-sys-corner-medium));border-width:var(--mdc-outlined-card-outline-width, 1px);border-color:var(--mdc-outlined-card-outline-color, var(--mat-sys-outline-variant));box-shadow:var(--mdc-outlined-card-container-elevation, var(--mat-sys-level0))}.mat-mdc-card-outlined::after{border:none}.mdc-card__media{position:relative;box-sizing:border-box;background-repeat:no-repeat;background-position:center;background-size:cover}.mdc-card__media::before{display:block;content:""}.mdc-card__media:first-child{border-top-left-radius:inherit;border-top-right-radius:inherit}.mdc-card__media:last-child{border-bottom-left-radius:inherit;border-bottom-right-radius:inherit}.mat-mdc-card-actions{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;min-height:52px;padding:8px}.mat-mdc-card-title{font-family:var(--mat-card-title-text-font, var(--mat-sys-title-large-font));line-height:var(--mat-card-title-text-line-height, var(--mat-sys-title-large-line-height));font-size:var(--mat-card-title-text-size, var(--mat-sys-title-large-size));letter-spacing:var(--mat-card-title-text-tracking, var(--mat-sys-title-large-tracking));font-weight:var(--mat-card-title-text-weight, var(--mat-sys-title-large-weight))}.mat-mdc-card-subtitle{color:var(--mat-card-subtitle-text-color, var(--mat-sys-on-surface));font-family:var(--mat-card-subtitle-text-font, var(--mat-sys-title-medium-font));line-height:var(--mat-card-subtitle-text-line-height, var(--mat-sys-title-medium-line-height));font-size:var(--mat-card-subtitle-text-size, var(--mat-sys-title-medium-size));letter-spacing:var(--mat-card-subtitle-text-tracking, var(--mat-sys-title-medium-tracking));font-weight:var(--mat-card-subtitle-text-weight, var(--mat-sys-title-medium-weight))}.mat-mdc-card-title,.mat-mdc-card-subtitle{display:block;margin:0}.mat-mdc-card-avatar~.mat-mdc-card-header-text .mat-mdc-card-title,.mat-mdc-card-avatar~.mat-mdc-card-header-text .mat-mdc-card-subtitle{padding:16px 16px 0}.mat-mdc-card-header{display:flex;padding:16px 16px 0}.mat-mdc-card-content{display:block;padding:0 16px}.mat-mdc-card-content:first-child{padding-top:16px}.mat-mdc-card-content:last-child{padding-bottom:16px}.mat-mdc-card-title-group{display:flex;justify-content:space-between;width:100%}.mat-mdc-card-avatar{height:40px;width:40px;border-radius:50%;flex-shrink:0;margin-bottom:16px;object-fit:cover}.mat-mdc-card-avatar~.mat-mdc-card-header-text .mat-mdc-card-subtitle,.mat-mdc-card-avatar~.mat-mdc-card-header-text .mat-mdc-card-title{line-height:normal}.mat-mdc-card-sm-image{width:80px;height:80px}.mat-mdc-card-md-image{width:112px;height:112px}.mat-mdc-card-lg-image{width:152px;height:152px}.mat-mdc-card-xl-image{width:240px;height:240px}.mat-mdc-card-subtitle~.mat-mdc-card-title,.mat-mdc-card-title~.mat-mdc-card-subtitle,.mat-mdc-card-header .mat-mdc-card-header-text .mat-mdc-card-title,.mat-mdc-card-header .mat-mdc-card-header-text .mat-mdc-card-subtitle,.mat-mdc-card-title-group .mat-mdc-card-title,.mat-mdc-card-title-group .mat-mdc-card-subtitle{padding-top:0}.mat-mdc-card-content>:last-child:not(.mat-mdc-card-footer){margin-bottom:0}.mat-mdc-card-actions-align-end{justify-content:flex-end}'],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCard, [{
    type: Component,
    args: [{
      selector: "mat-card",
      host: {
        "class": "mat-mdc-card mdc-card",
        "[class.mat-mdc-card-outlined]": 'appearance === "outlined"',
        "[class.mdc-card--outlined]": 'appearance === "outlined"'
      },
      exportAs: "matCard",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>\n",
      styles: ['.mat-mdc-card{display:flex;flex-direction:column;box-sizing:border-box;position:relative;border-style:solid;border-width:0;background-color:var(--mdc-elevated-card-container-color, var(--mat-sys-surface-container-low));border-color:var(--mdc-elevated-card-container-color, var(--mat-sys-surface-container-low));border-radius:var(--mdc-elevated-card-container-shape, var(--mat-sys-corner-medium));box-shadow:var(--mdc-elevated-card-container-elevation, var(--mat-sys-level1))}.mat-mdc-card::after{position:absolute;top:0;left:0;width:100%;height:100%;border:solid 1px rgba(0,0,0,0);content:"";display:block;pointer-events:none;box-sizing:border-box;border-radius:var(--mdc-elevated-card-container-shape, var(--mat-sys-corner-medium))}.mat-mdc-card-outlined{background-color:var(--mdc-outlined-card-container-color, var(--mat-sys-surface));border-radius:var(--mdc-outlined-card-container-shape, var(--mat-sys-corner-medium));border-width:var(--mdc-outlined-card-outline-width, 1px);border-color:var(--mdc-outlined-card-outline-color, var(--mat-sys-outline-variant));box-shadow:var(--mdc-outlined-card-container-elevation, var(--mat-sys-level0))}.mat-mdc-card-outlined::after{border:none}.mdc-card__media{position:relative;box-sizing:border-box;background-repeat:no-repeat;background-position:center;background-size:cover}.mdc-card__media::before{display:block;content:""}.mdc-card__media:first-child{border-top-left-radius:inherit;border-top-right-radius:inherit}.mdc-card__media:last-child{border-bottom-left-radius:inherit;border-bottom-right-radius:inherit}.mat-mdc-card-actions{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;min-height:52px;padding:8px}.mat-mdc-card-title{font-family:var(--mat-card-title-text-font, var(--mat-sys-title-large-font));line-height:var(--mat-card-title-text-line-height, var(--mat-sys-title-large-line-height));font-size:var(--mat-card-title-text-size, var(--mat-sys-title-large-size));letter-spacing:var(--mat-card-title-text-tracking, var(--mat-sys-title-large-tracking));font-weight:var(--mat-card-title-text-weight, var(--mat-sys-title-large-weight))}.mat-mdc-card-subtitle{color:var(--mat-card-subtitle-text-color, var(--mat-sys-on-surface));font-family:var(--mat-card-subtitle-text-font, var(--mat-sys-title-medium-font));line-height:var(--mat-card-subtitle-text-line-height, var(--mat-sys-title-medium-line-height));font-size:var(--mat-card-subtitle-text-size, var(--mat-sys-title-medium-size));letter-spacing:var(--mat-card-subtitle-text-tracking, var(--mat-sys-title-medium-tracking));font-weight:var(--mat-card-subtitle-text-weight, var(--mat-sys-title-medium-weight))}.mat-mdc-card-title,.mat-mdc-card-subtitle{display:block;margin:0}.mat-mdc-card-avatar~.mat-mdc-card-header-text .mat-mdc-card-title,.mat-mdc-card-avatar~.mat-mdc-card-header-text .mat-mdc-card-subtitle{padding:16px 16px 0}.mat-mdc-card-header{display:flex;padding:16px 16px 0}.mat-mdc-card-content{display:block;padding:0 16px}.mat-mdc-card-content:first-child{padding-top:16px}.mat-mdc-card-content:last-child{padding-bottom:16px}.mat-mdc-card-title-group{display:flex;justify-content:space-between;width:100%}.mat-mdc-card-avatar{height:40px;width:40px;border-radius:50%;flex-shrink:0;margin-bottom:16px;object-fit:cover}.mat-mdc-card-avatar~.mat-mdc-card-header-text .mat-mdc-card-subtitle,.mat-mdc-card-avatar~.mat-mdc-card-header-text .mat-mdc-card-title{line-height:normal}.mat-mdc-card-sm-image{width:80px;height:80px}.mat-mdc-card-md-image{width:112px;height:112px}.mat-mdc-card-lg-image{width:152px;height:152px}.mat-mdc-card-xl-image{width:240px;height:240px}.mat-mdc-card-subtitle~.mat-mdc-card-title,.mat-mdc-card-title~.mat-mdc-card-subtitle,.mat-mdc-card-header .mat-mdc-card-header-text .mat-mdc-card-title,.mat-mdc-card-header .mat-mdc-card-header-text .mat-mdc-card-subtitle,.mat-mdc-card-title-group .mat-mdc-card-title,.mat-mdc-card-title-group .mat-mdc-card-subtitle{padding-top:0}.mat-mdc-card-content>:last-child:not(.mat-mdc-card-footer){margin-bottom:0}.mat-mdc-card-actions-align-end{justify-content:flex-end}']
    }]
  }], () => [], {
    appearance: [{
      type: Input
    }]
  });
})();
var MatCardTitle = class _MatCardTitle {
  static \u0275fac = function MatCardTitle_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatCardTitle)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatCardTitle,
    selectors: [["mat-card-title"], ["", "mat-card-title", ""], ["", "matCardTitle", ""]],
    hostAttrs: [1, "mat-mdc-card-title"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCardTitle, [{
    type: Directive,
    args: [{
      selector: `mat-card-title, [mat-card-title], [matCardTitle]`,
      host: {
        "class": "mat-mdc-card-title"
      }
    }]
  }], null, null);
})();
var MatCardTitleGroup = class _MatCardTitleGroup {
  static \u0275fac = function MatCardTitleGroup_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatCardTitleGroup)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MatCardTitleGroup,
    selectors: [["mat-card-title-group"]],
    hostAttrs: [1, "mat-mdc-card-title-group"],
    ngContentSelectors: _c2,
    decls: 4,
    vars: 0,
    template: function MatCardTitleGroup_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef(_c1);
        \u0275\u0275elementStart(0, "div");
        \u0275\u0275projection(1);
        \u0275\u0275elementEnd();
        \u0275\u0275projection(2, 1);
        \u0275\u0275projection(3, 2);
      }
    },
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCardTitleGroup, [{
    type: Component,
    args: [{
      selector: "mat-card-title-group",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      host: {
        "class": "mat-mdc-card-title-group"
      },
      template: '<div>\n  <ng-content\n      select="mat-card-title, mat-card-subtitle,\n      [mat-card-title], [mat-card-subtitle],\n      [matCardTitle], [matCardSubtitle]"></ng-content>\n</div>\n<ng-content select="[mat-card-image], [matCardImage],\n                    [mat-card-sm-image], [matCardImageSmall],\n                    [mat-card-md-image], [matCardImageMedium],\n                    [mat-card-lg-image], [matCardImageLarge],\n                    [mat-card-xl-image], [matCardImageXLarge]"></ng-content>\n<ng-content></ng-content>\n'
    }]
  }], null, null);
})();
var MatCardContent = class _MatCardContent {
  static \u0275fac = function MatCardContent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatCardContent)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatCardContent,
    selectors: [["mat-card-content"]],
    hostAttrs: [1, "mat-mdc-card-content"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCardContent, [{
    type: Directive,
    args: [{
      selector: "mat-card-content",
      host: {
        "class": "mat-mdc-card-content"
      }
    }]
  }], null, null);
})();
var MatCardSubtitle = class _MatCardSubtitle {
  static \u0275fac = function MatCardSubtitle_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatCardSubtitle)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatCardSubtitle,
    selectors: [["mat-card-subtitle"], ["", "mat-card-subtitle", ""], ["", "matCardSubtitle", ""]],
    hostAttrs: [1, "mat-mdc-card-subtitle"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCardSubtitle, [{
    type: Directive,
    args: [{
      selector: `mat-card-subtitle, [mat-card-subtitle], [matCardSubtitle]`,
      host: {
        "class": "mat-mdc-card-subtitle"
      }
    }]
  }], null, null);
})();
var MatCardActions = class _MatCardActions {
  // TODO(jelbourn): deprecate `align` in favor of `actionPosition` or `actionAlignment`
  // as to not conflict with the native `align` attribute.
  /** Position of the actions inside the card. */
  align = "start";
  static \u0275fac = function MatCardActions_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatCardActions)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatCardActions,
    selectors: [["mat-card-actions"]],
    hostAttrs: [1, "mat-mdc-card-actions", "mdc-card__actions"],
    hostVars: 2,
    hostBindings: function MatCardActions_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275classProp("mat-mdc-card-actions-align-end", ctx.align === "end");
      }
    },
    inputs: {
      align: "align"
    },
    exportAs: ["matCardActions"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCardActions, [{
    type: Directive,
    args: [{
      selector: "mat-card-actions",
      exportAs: "matCardActions",
      host: {
        "class": "mat-mdc-card-actions mdc-card__actions",
        "[class.mat-mdc-card-actions-align-end]": 'align === "end"'
      }
    }]
  }], null, {
    align: [{
      type: Input
    }]
  });
})();
var MatCardHeader = class _MatCardHeader {
  static \u0275fac = function MatCardHeader_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatCardHeader)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MatCardHeader,
    selectors: [["mat-card-header"]],
    hostAttrs: [1, "mat-mdc-card-header"],
    ngContentSelectors: _c4,
    decls: 4,
    vars: 0,
    consts: [[1, "mat-mdc-card-header-text"]],
    template: function MatCardHeader_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef(_c3);
        \u0275\u0275projection(0);
        \u0275\u0275elementStart(1, "div", 0);
        \u0275\u0275projection(2, 1);
        \u0275\u0275elementEnd();
        \u0275\u0275projection(3, 2);
      }
    },
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCardHeader, [{
    type: Component,
    args: [{
      selector: "mat-card-header",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      host: {
        "class": "mat-mdc-card-header"
      },
      template: '<ng-content select="[mat-card-avatar], [matCardAvatar]"></ng-content>\n<div class="mat-mdc-card-header-text">\n  <ng-content\n      select="mat-card-title, mat-card-subtitle,\n      [mat-card-title], [mat-card-subtitle],\n      [matCardTitle], [matCardSubtitle]"></ng-content>\n</div>\n<ng-content></ng-content>\n'
    }]
  }], null, null);
})();
var MatCardFooter = class _MatCardFooter {
  static \u0275fac = function MatCardFooter_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatCardFooter)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatCardFooter,
    selectors: [["mat-card-footer"]],
    hostAttrs: [1, "mat-mdc-card-footer"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCardFooter, [{
    type: Directive,
    args: [{
      selector: "mat-card-footer",
      host: {
        "class": "mat-mdc-card-footer"
      }
    }]
  }], null, null);
})();
var MatCardImage = class _MatCardImage {
  static \u0275fac = function MatCardImage_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatCardImage)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatCardImage,
    selectors: [["", "mat-card-image", ""], ["", "matCardImage", ""]],
    hostAttrs: [1, "mat-mdc-card-image", "mdc-card__media"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCardImage, [{
    type: Directive,
    args: [{
      selector: "[mat-card-image], [matCardImage]",
      host: {
        "class": "mat-mdc-card-image mdc-card__media"
      }
    }]
  }], null, null);
})();
var MatCardSmImage = class _MatCardSmImage {
  static \u0275fac = function MatCardSmImage_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatCardSmImage)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatCardSmImage,
    selectors: [["", "mat-card-sm-image", ""], ["", "matCardImageSmall", ""]],
    hostAttrs: [1, "mat-mdc-card-sm-image", "mdc-card__media"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCardSmImage, [{
    type: Directive,
    args: [{
      selector: "[mat-card-sm-image], [matCardImageSmall]",
      host: {
        "class": "mat-mdc-card-sm-image mdc-card__media"
      }
    }]
  }], null, null);
})();
var MatCardMdImage = class _MatCardMdImage {
  static \u0275fac = function MatCardMdImage_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatCardMdImage)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatCardMdImage,
    selectors: [["", "mat-card-md-image", ""], ["", "matCardImageMedium", ""]],
    hostAttrs: [1, "mat-mdc-card-md-image", "mdc-card__media"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCardMdImage, [{
    type: Directive,
    args: [{
      selector: "[mat-card-md-image], [matCardImageMedium]",
      host: {
        "class": "mat-mdc-card-md-image mdc-card__media"
      }
    }]
  }], null, null);
})();
var MatCardLgImage = class _MatCardLgImage {
  static \u0275fac = function MatCardLgImage_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatCardLgImage)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatCardLgImage,
    selectors: [["", "mat-card-lg-image", ""], ["", "matCardImageLarge", ""]],
    hostAttrs: [1, "mat-mdc-card-lg-image", "mdc-card__media"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCardLgImage, [{
    type: Directive,
    args: [{
      selector: "[mat-card-lg-image], [matCardImageLarge]",
      host: {
        "class": "mat-mdc-card-lg-image mdc-card__media"
      }
    }]
  }], null, null);
})();
var MatCardXlImage = class _MatCardXlImage {
  static \u0275fac = function MatCardXlImage_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatCardXlImage)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatCardXlImage,
    selectors: [["", "mat-card-xl-image", ""], ["", "matCardImageXLarge", ""]],
    hostAttrs: [1, "mat-mdc-card-xl-image", "mdc-card__media"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCardXlImage, [{
    type: Directive,
    args: [{
      selector: "[mat-card-xl-image], [matCardImageXLarge]",
      host: {
        "class": "mat-mdc-card-xl-image mdc-card__media"
      }
    }]
  }], null, null);
})();
var MatCardAvatar = class _MatCardAvatar {
  static \u0275fac = function MatCardAvatar_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatCardAvatar)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatCardAvatar,
    selectors: [["", "mat-card-avatar", ""], ["", "matCardAvatar", ""]],
    hostAttrs: [1, "mat-mdc-card-avatar"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCardAvatar, [{
    type: Directive,
    args: [{
      selector: "[mat-card-avatar], [matCardAvatar]",
      host: {
        "class": "mat-mdc-card-avatar"
      }
    }]
  }], null, null);
})();
var CARD_DIRECTIVES = [MatCard, MatCardActions, MatCardAvatar, MatCardContent, MatCardFooter, MatCardHeader, MatCardImage, MatCardLgImage, MatCardMdImage, MatCardSmImage, MatCardSubtitle, MatCardTitle, MatCardTitleGroup, MatCardXlImage];
var MatCardModule = class _MatCardModule {
  static \u0275fac = function MatCardModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatCardModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _MatCardModule
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [MatCommonModule, MatCommonModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCardModule, [{
    type: NgModule,
    args: [{
      imports: [MatCommonModule, ...CARD_DIRECTIVES],
      exports: [CARD_DIRECTIVES, MatCommonModule]
    }]
  }], null, null);
})();

// src/app/admin/dashboard/dashboard.services.ts
var import_moment = __toESM(require_moment());
var DashboardService = class _DashboardService {
  _StorageService;
  router;
  constructor(_StorageService, router) {
    this._StorageService = _StorageService;
    this.router = router;
  }
  ListDashboard = signal([]);
  DetailDashboard = signal({});
  page = signal(1);
  pageCount = signal(1);
  total = signal(0);
  pageSize = signal(50);
  dashboardId = signal(null);
  setDashboardId(id) {
    this.dashboardId.set(id);
  }
  DonhangDashboard(params) {
    return __async(this, null, function* () {
      try {
        const queryParams = new URLSearchParams(params).toString();
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this._StorageService.getItem("token")
          }
        };
        const response = yield fetch(`${environment.APIURL}/dashboard/donhang?${queryParams}`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        console.log(data);
        return data;
      } catch (error) {
        return console.error(error);
      }
    });
  }
  getSLChogiao(SearchParams) {
    return __async(this, null, function* () {
      const payload = __spreadValues({}, SearchParams);
      payload.Batdau = (0, import_moment.default)(payload.Batdau).utc();
      payload.Ketthuc = (0, import_moment.default)(payload.Ketthuc).utc();
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this._StorageService.getItem("token")
          },
          body: JSON.stringify(payload)
        };
        const response = yield fetch(`${environment.APIURL}/dashboard/getchogiao`, options);
        if (!response.ok) {
        }
        const data = yield response.json();
        this.ListDashboard.set(data.data);
        this.page.set(data.pageNumber);
        this.pageCount.set(data.totalPages);
        this.total.set(data.total);
        this.pageSize.set(data.pageSize);
        return data;
      } catch (error) {
        return console.error(error);
      }
    });
  }
  searchDashboard(SearchParams) {
    return __async(this, null, function* () {
      const payload = __spreadValues({}, SearchParams);
      payload.Batdau = (0, import_moment.default)(payload.Batdau).utc();
      payload.Ketthuc = (0, import_moment.default)(payload.Ketthuc).utc();
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this._StorageService.getItem("token")
          },
          body: JSON.stringify(payload)
        };
        const response = yield fetch(`${environment.APIURL}/dashboard/search`, options);
        if (!response.ok) {
        }
        const data = yield response.json();
        console.log("search data", data);
        this.ListDashboard.set(data.data);
        this.page.set(data.pageNumber);
        this.pageCount.set(data.totalPages);
        this.total.set(data.total);
        this.pageSize.set(data.pageSize);
        return data;
      } catch (error) {
        return console.error(error);
      }
    });
  }
  searchCongno(SearchParams) {
    return __async(this, null, function* () {
      const payload = __spreadValues({}, SearchParams);
      payload.Batdau = (0, import_moment.default)(payload.Batdau).utc();
      payload.Ketthuc = (0, import_moment.default)(payload.Ketthuc).utc();
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this._StorageService.getItem("token")
          },
          body: JSON.stringify(payload)
        };
        const response = yield fetch(`${environment.APIURL}/dashboard/congnokhachhang`, options);
        if (!response.ok) {
        }
        const data = yield response.json();
        this.ListDashboard.set(data);
        return data;
      } catch (error) {
        return console.error(error);
      }
    });
  }
  Phieuchuyen(SearchParams) {
    return __async(this, null, function* () {
      const payload = __spreadValues({}, SearchParams);
      payload.Batdau = (0, import_moment.default)(payload.Batdau).utc();
      payload.Ketthuc = (0, import_moment.default)(payload.Ketthuc).utc();
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this._StorageService.getItem("token")
          },
          body: JSON.stringify(payload)
        };
        const response = yield fetch(`${environment.APIURL}/dashboard/phieuchuyen`, options);
        if (!response.ok) {
        }
        const data = yield response.json();
        this.ListDashboard.set(data);
      } catch (error) {
        return console.error(error);
      }
    });
  }
  Phieugiaohang(Params) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this._StorageService.getItem("token")
          },
          body: JSON.stringify(Params)
        };
        const response = yield fetch(`${environment.APIURL}/dashboard/phieugiao`, options);
        if (!response.ok) {
        }
        const data = yield response.json();
        this.DetailDashboard.set(data);
      } catch (error) {
        return console.error(error);
      }
    });
  }
  findbysanpham(id) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        };
        const response = yield fetch(`${environment.APIURL}/dashboard/findbysanpham/${id}`, options);
        if (!response.ok) {
        }
        const data = yield response.json();
        return data;
      } catch (error) {
        return console.error(error);
      }
    });
  }
  getAllDashboard() {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this._StorageService.getItem("token")
          }
        };
        const response = yield fetch(`${environment.APIURL}/dashboard`, options);
        if (!response.ok) {
        }
        const data = yield response.json();
        this.ListDashboard.set(data);
      } catch (error) {
        return console.error(error);
      }
    });
  }
  getDashboardByid(id) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        };
        const response = yield fetch(`${environment.APIURL}/dashboard/findid/${id}`, options);
        if (!response.ok) {
        }
        const data = yield response.json();
        this.DetailDashboard.set(data);
      } catch (error) {
        return console.error(error);
      }
    });
  }
  updateDashboard(dulieu) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(dulieu)
        };
        const response = yield fetch(`${environment.APIURL}/dashboard/${dulieu.id}`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        if (!response.ok) {
        }
        this.getAllDashboard();
        this.getDashboardByid(dulieu.id);
        return data;
      } catch (error) {
        return console.error(error);
      }
    });
  }
  updatePhieugiao(dulieu) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(dulieu)
        };
        const response = yield fetch(`${environment.APIURL}/dashboard/phieugiao/${dulieu.id}`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        if (!response.ok) {
        }
        this.getAllDashboard();
        this.Phieugiaohang({ id: dulieu.id });
      } catch (error) {
        return console.error(error);
      }
    });
  }
  DeleteDashboard(item) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        };
        const response = yield fetch(`${environment.APIURL}/dashboard/${item.id}`, options);
        if (!response.ok) {
        }
      } catch (error) {
        return console.error(error);
      }
    });
  }
  UpdateBulkDashboard(items) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(items)
        };
        const response = yield fetch(`${environment.APIURL}/dashboard/bulk`, options);
        if (!response.ok) {
        }
        this.getAllDashboard();
        const data = yield response.json();
        return data;
      } catch (error) {
        return console.error(error);
      }
    });
  }
  DeleteBulkDashboard(items) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(items)
        };
        const response = yield fetch(`${environment.APIURL}/dashboard/bulk`, options);
        if (!response.ok) {
        }
        this.getAllDashboard();
        const data = yield response.json();
        return data;
      } catch (error) {
        return console.error(error);
      }
    });
  }
  // async SearchDashboard(SearchParams:any) {
  //   try {
  //     const options = {
  //       method:'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(SearchParams),
  //     };
  //         const response = await fetch(`${environment.APIURL}/dashboard/search`,options);
  //         if (!response.ok) {
  //         }
  //         const data = await response.json();   
  //         this.ListDashboard.set(data.items)
  //         return data;
  //     } catch (error) {
  //         return console.error(error);
  //     }
  // }
  SearchField(SearchParams) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(SearchParams)
        };
        const response = yield fetch(`${environment.APIURL}/dashboard/searchfield`, options);
        if (!response.ok) {
        }
        const data = yield response.json();
        this.DetailDashboard.set(data);
        return data;
      } catch (error) {
        return console.error(error);
      }
    });
  }
  static \u0275fac = function DashboardService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DashboardService)(\u0275\u0275inject(StorageService), \u0275\u0275inject(Router));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DashboardService, factory: _DashboardService.\u0275fac, providedIn: "root" });
};

// src/app/admin/dashboard/dashboard.component.ts
function DashboardComponent_div_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24)(1, "div", 25);
    \u0275\u0275element(2, "div", 26);
    \u0275\u0275elementStart(3, "span", 27);
    \u0275\u0275text(4, "\u0110ang t\u1EA3i d\u1EEF li\u1EC7u...");
    \u0275\u0275elementEnd()()();
  }
}
function DashboardComponent_div_51_div_110_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 71)(1, "div", 72);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 73)(4, "p", 74);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 75)(7, "div", 76);
    \u0275\u0275element(8, "div", 77);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 78);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const product_r2 = ctx.$implicit;
    const i_r3 = ctx.index;
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r3.getProductColor(i_r3));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", i_r3 + 1, " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("title", product_r2.sanpham == null ? null : product_r2.sanpham.title);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r3.truncateText((product_r2.sanpham == null ? null : product_r2.sanpham.title) || "N/A", 25), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classMap(ctx_r3.getProductColor(i_r3));
    \u0275\u0275styleProp("width", ctx_r3.getBarHeight(ctx_r3.parseFloat(product_r2.soluong), ctx_r3.getMaxValue(ctx_r3.chartData.productChart, "soluong")));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.formatNumber(product_r2.soluong));
  }
}
function DashboardComponent_div_51_div_110_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 69);
    \u0275\u0275template(1, DashboardComponent_div_51_div_110_div_1_Template, 11, 10, "div", 70);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r3.chartData.productChart);
  }
}
function DashboardComponent_div_51_ng_template_111_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 79)(1, "mat-icon", 80);
    \u0275\u0275text(2, "inventory_2");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 81);
    \u0275\u0275text(4, "Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u s\u1EA3n ph\u1EA9m");
    \u0275\u0275elementEnd()();
  }
}
function DashboardComponent_div_51_div_120_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 82)(1, "div", 83)(2, "span", 84);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 85);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 86)(7, "div", 87)(8, "div", 88)(9, "div")(10, "span", 89);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "div", 88)(13, "div", 90)(14, "span", 89);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(16, "div", 91)(17, "span");
    \u0275\u0275text(18, "Hi\u1EC7n t\u1EA1i");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span");
    \u0275\u0275text(20, "K\u1EF3 tr\u01B0\u1EDBc");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(21, "div", 92)(22, "span", 93)(23, "mat-icon", 42);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd();
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r5 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r5.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", item_r5.current, " / ", item_r5.previous, "");
    \u0275\u0275advance(4);
    \u0275\u0275classMap(item_r5.color + " h-full transition-all duration-500 rounded-lg flex items-center justify-end pr-2");
    \u0275\u0275styleProp("width", ctx_r3.getBarHeight(item_r5.current, ctx_r3.mathMax(item_r5.current, item_r5.previous)));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r5.current);
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", ctx_r3.getBarHeight(item_r5.previous, ctx_r3.mathMax(item_r5.current, item_r5.previous)));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r5.previous);
    \u0275\u0275advance(7);
    \u0275\u0275classMap(ctx_r3.getChangeColor(ctx_r3.getPercentageChange(item_r5.current, item_r5.previous)));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.getChangeIcon(ctx_r3.getPercentageChange(item_r5.current, item_r5.previous)));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r3.getPercentageChange(item_r5.current, item_r5.previous), "% ");
  }
}
function DashboardComponent_div_51_tr_139_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 94)(1, "td", 95);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 96)(4, "div", 97);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td", 98)(7, "span", 99);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const product_r6 = ctx.$implicit;
    const i_r7 = ctx.index;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(i_r7 + 1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate((product_r6.sanpham == null ? null : product_r6.sanpham.title) || "N/A");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r3.formatNumber(product_r6.soluong), " ");
  }
}
function DashboardComponent_div_51_div_140_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 79)(1, "mat-icon", 80);
    \u0275\u0275text(2, "inventory_2");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 81);
    \u0275\u0275text(4, "Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u s\u1EA3n ph\u1EA9m trong \u0111\u01A1n h\xE0ng");
    \u0275\u0275elementEnd()();
  }
}
function DashboardComponent_div_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28)(1, "div", 29)(2, "div", 30)(3, "div")(4, "h2", 31);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "date");
    \u0275\u0275pipe(7, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 32);
    \u0275\u0275text(9, "D\u1EEF li\u1EC7u \u0111\u01B0\u1EE3c c\u1EADp nh\u1EADt t\u1EF1 \u0111\u1ED9ng");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 33)(11, "p", 34);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "p", 35);
    \u0275\u0275text(14, "Kho\u1EA3ng th\u1EDDi gian");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(15, "div", 36)(16, "div", 37)(17, "div", 30)(18, "div")(19, "p", 38);
    \u0275\u0275text(20, "T\u1ED5ng \u0110\u01A1n H\xE0ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "p", 39);
    \u0275\u0275text(22);
    \u0275\u0275pipe(23, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div", 40)(25, "span", 41)(26, "mat-icon", 42);
    \u0275\u0275text(27);
    \u0275\u0275elementEnd();
    \u0275\u0275text(28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "span", 43);
    \u0275\u0275text(30, "vs k\u1EF3 tr\u01B0\u1EDBc");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(31, "div", 44)(32, "mat-icon", 45);
    \u0275\u0275text(33, "shopping_cart");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(34, "div", 46)(35, "div", 30)(36, "div")(37, "p", 38);
    \u0275\u0275text(38, "Lo\u1EA1i S\u1EA3n Ph\u1EA9m");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "p", 39);
    \u0275\u0275text(40);
    \u0275\u0275pipe(41, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "p", 47);
    \u0275\u0275text(43, "Trong \u0111\u01A1n h\xE0ng");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(44, "div", 48)(45, "mat-icon", 49);
    \u0275\u0275text(46, "inventory_2");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(47, "div", 50)(48, "div", 30)(49, "div")(50, "p", 38);
    \u0275\u0275text(51, "Doanh Thu");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "p", 51);
    \u0275\u0275text(53);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "p", 47);
    \u0275\u0275text(55, "T\u1EEB \u0111\u01A1n h\xE0ng");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(56, "div", 52)(57, "mat-icon", 53);
    \u0275\u0275text(58, "monetization_on");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(59, "div", 36)(60, "div", 37)(61, "div", 30)(62, "div")(63, "p", 38);
    \u0275\u0275text(64, "T\u1ED5ng \u0110\u1EB7t H\xE0ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(65, "p", 39);
    \u0275\u0275text(66);
    \u0275\u0275pipe(67, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(68, "div", 40)(69, "span", 41)(70, "mat-icon", 42);
    \u0275\u0275text(71);
    \u0275\u0275elementEnd();
    \u0275\u0275text(72);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(73, "span", 43);
    \u0275\u0275text(74, "vs k\u1EF3 tr\u01B0\u1EDBc");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(75, "div", 44)(76, "mat-icon", 45);
    \u0275\u0275text(77, "shopping_cart");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(78, "div", 46)(79, "div", 30)(80, "div")(81, "p", 38);
    \u0275\u0275text(82, "Lo\u1EA1i S\u1EA3n Ph\u1EA9m");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(83, "p", 39);
    \u0275\u0275text(84);
    \u0275\u0275pipe(85, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(86, "p", 47);
    \u0275\u0275text(87, "Trong \u0111\u1EB7t h\xE0ng");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(88, "div", 48)(89, "mat-icon", 49);
    \u0275\u0275text(90, "inventory_2");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(91, "div", 50)(92, "div", 30)(93, "div")(94, "p", 38);
    \u0275\u0275text(95, "Ph\u1EA3i Tr\u1EA3");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(96, "p", 51);
    \u0275\u0275text(97);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(98, "p", 47);
    \u0275\u0275text(99, "T\u1EEB \u0111\u1EB7t h\xE0ng");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(100, "div", 52)(101, "mat-icon", 53);
    \u0275\u0275text(102, "monetization_on");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(103, "div", 54)(104, "div", 9)(105, "div", 55)(106, "h3", 56);
    \u0275\u0275text(107, "Top S\u1EA3n Ph\u1EA9m B\xE1n Ch\u1EA1y");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(108, "mat-icon", 57);
    \u0275\u0275text(109, "bar_chart");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(110, DashboardComponent_div_51_div_110_Template, 2, 1, "div", 58)(111, DashboardComponent_div_51_ng_template_111_Template, 5, 0, "ng-template", null, 2, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(113, "div", 9)(114, "div", 55)(115, "h3", 56);
    \u0275\u0275text(116, "So S\xE1nh Hi\u1EC7n T\u1EA1i vs K\u1EF3 Tr\u01B0\u1EDBc");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(117, "mat-icon", 57);
    \u0275\u0275text(118, "compare_arrows");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(119, "div", 28);
    \u0275\u0275template(120, DashboardComponent_div_51_div_120_Template, 26, 15, "div", 59);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(121, "div", 9)(122, "div", 55)(123, "h3", 56);
    \u0275\u0275text(124, "Chi Ti\u1EBFt S\u1EA3n Ph\u1EA9m Trong \u0110\u01A1n H\xE0ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(125, "span", 60);
    \u0275\u0275text(126);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(127, "div", 61)(128, "div", 62)(129, "table", 63)(130, "thead", 64)(131, "tr")(132, "th", 65);
    \u0275\u0275text(133, "#");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(134, "th", 65);
    \u0275\u0275text(135, "S\u1EA3n Ph\u1EA9m");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(136, "th", 65);
    \u0275\u0275text(137, "S\u1ED1 L\u01B0\u1EE3ng");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(138, "tbody", 66);
    \u0275\u0275template(139, DashboardComponent_div_51_tr_139_Template, 9, 3, "tr", 67);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275template(140, DashboardComponent_div_51_div_140_Template, 5, 0, "div", 68);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const noProducts_r8 = \u0275\u0275reference(112);
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate2("Th\u1ED1ng K\xEA T\u1EEB ", \u0275\u0275pipeBind2(6, 23, ctx_r3.batdau, "dd/MM/yyyy"), " \u0111\u1EBFn ", \u0275\u0275pipeBind2(7, 26, ctx_r3.ketthuc, "dd/MM/yyyy"), "");
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1("", ctx_r3.getDaysDifference(), " ng\xE0y");
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(23, 29, ctx_r3.dashboardData.donhang == null ? null : ctx_r3.dashboardData.donhang.total));
    \u0275\u0275advance(3);
    \u0275\u0275classMap(ctx_r3.getChangeColor(ctx_r3.getPercentageChange(ctx_r3.dashboardData.donhang == null ? null : ctx_r3.dashboardData.donhang.total, ctx_r3.dashboardData.donhang == null ? null : ctx_r3.dashboardData.donhang.previousTotal)));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.getChangeIcon(ctx_r3.getPercentageChange(ctx_r3.dashboardData.donhang == null ? null : ctx_r3.dashboardData.donhang.total, ctx_r3.dashboardData.donhang == null ? null : ctx_r3.dashboardData.donhang.previousTotal)));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r3.getPercentageChange(ctx_r3.dashboardData.donhang == null ? null : ctx_r3.dashboardData.donhang.total, ctx_r3.dashboardData.donhang == null ? null : ctx_r3.dashboardData.donhang.previousTotal), "% ");
    \u0275\u0275advance(12);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(41, 31, ctx_r3.dashboardData.donhang == null ? null : ctx_r3.dashboardData.donhang.sanphamCount));
    \u0275\u0275advance(13);
    \u0275\u0275textInterpolate(ctx_r3.formatCurrency((ctx_r3.dashboardData.revenue == null ? null : ctx_r3.dashboardData.revenue.donhang) || 0));
    \u0275\u0275advance(13);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(67, 33, ctx_r3.dashboardData.dathang == null ? null : ctx_r3.dashboardData.dathang.total));
    \u0275\u0275advance(3);
    \u0275\u0275classMap(ctx_r3.getChangeColor(ctx_r3.getPercentageChange(ctx_r3.dashboardData.dathang == null ? null : ctx_r3.dashboardData.dathang.total, ctx_r3.dashboardData.dathang == null ? null : ctx_r3.dashboardData.dathang.previousTotal)));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.getChangeIcon(ctx_r3.getPercentageChange(ctx_r3.dashboardData.dathang == null ? null : ctx_r3.dashboardData.dathang.total, ctx_r3.dashboardData.dathang == null ? null : ctx_r3.dashboardData.dathang.previousTotal)));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r3.getPercentageChange(ctx_r3.dashboardData.dathang == null ? null : ctx_r3.dashboardData.dathang.total, ctx_r3.dashboardData.dathang == null ? null : ctx_r3.dashboardData.dathang.previousTotal), "% ");
    \u0275\u0275advance(12);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(85, 35, ctx_r3.dashboardData.dathang == null ? null : ctx_r3.dashboardData.dathang.sanphamCount));
    \u0275\u0275advance(13);
    \u0275\u0275textInterpolate(ctx_r3.formatCurrency((ctx_r3.dashboardData.revenue == null ? null : ctx_r3.dashboardData.revenue.dathang) || 0));
    \u0275\u0275advance(13);
    \u0275\u0275property("ngIf", ctx_r3.chartData.productChart.length > 0)("ngIfElse", noProducts_r8);
    \u0275\u0275advance(10);
    \u0275\u0275property("ngForOf", ctx_r3.chartData.comparisonChart);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", (ctx_r3.dashboardData.productQuantities == null ? null : ctx_r3.dashboardData.productQuantities.donhang == null ? null : ctx_r3.dashboardData.productQuantities.donhang.length) || 0, " s\u1EA3n ph\u1EA9m ");
    \u0275\u0275advance(13);
    \u0275\u0275property("ngForOf", ctx_r3.dashboardData.productQuantities == null ? null : ctx_r3.dashboardData.productQuantities.donhang);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !(ctx_r3.dashboardData.productQuantities == null ? null : ctx_r3.dashboardData.productQuantities.donhang == null ? null : ctx_r3.dashboardData.productQuantities.donhang.length));
  }
}
var DashboardComponent = class _DashboardComponent {
  _PhieugiaohangService = inject(DonhangService);
  _DashboardService = inject(DashboardService);
  _SearchService = inject(SearchService);
  selectedFile;
  ketqua = [];
  isLoading = false;
  uploadMessage = "";
  dashboardData = null;
  // Date range properties
  batdau = /* @__PURE__ */ new Date();
  ketthuc = /* @__PURE__ */ new Date();
  // Chart data cho TailwindCSS
  chartData = {
    productChart: [],
    comparisonChart: [],
    topProducts: []
  };
  constructor() {
    this.ketthuc = /* @__PURE__ */ new Date();
    this.batdau = /* @__PURE__ */ new Date();
    this.batdau.setDate(this.batdau.getDate() - 30);
  }
  ngOnInit() {
    return __async(this, null, function* () {
      yield this.loadDashboardData();
    });
  }
  // Load dashboard data method
  loadDashboardData() {
    return __async(this, null, function* () {
      this.isLoading = true;
      try {
        const dashboardResult = yield this._DashboardService.DonhangDashboard({
          Batdau: this.batdau,
          Ketthuc: this.ketthuc
        });
        console.log("Dashboard Data:", dashboardResult);
        this.dashboardData = dashboardResult;
        this.prepareChartData();
      } catch (error) {
        console.error("Error loading dashboard:", error);
      } finally {
        this.isLoading = false;
      }
    });
  }
  // Apply date filter
  applyDateFilter() {
    return __async(this, null, function* () {
      yield this.loadDashboardData();
    });
  }
  // Quick date range setter
  setDateRange(range) {
    return __async(this, null, function* () {
      const today = /* @__PURE__ */ new Date();
      switch (range) {
        case "today":
          this.batdau = new Date(today);
          this.ketthuc = new Date(today);
          break;
        case "yesterday":
          const yesterday = new Date(today);
          yesterday.setDate(yesterday.getDate() - 1);
          this.batdau = new Date(yesterday);
          this.ketthuc = new Date(yesterday);
          break;
        case "last7days":
          this.ketthuc = new Date(today);
          this.batdau = new Date(today);
          this.batdau.setDate(this.batdau.getDate() - 6);
          break;
        case "last30days":
          this.ketthuc = new Date(today);
          this.batdau = new Date(today);
          this.batdau.setDate(this.batdau.getDate() - 29);
          break;
        case "thisMonth":
          this.batdau = new Date(today.getFullYear(), today.getMonth(), 1);
          this.ketthuc = new Date(today);
          break;
        case "lastMonth":
          const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
          this.batdau = new Date(lastMonth);
          this.ketthuc = new Date(today.getFullYear(), today.getMonth(), 0);
          break;
      }
      yield this.loadDashboardData();
    });
  }
  // Chuẩn bị dữ liệu cho các biểu đồ TailwindCSS
  prepareChartData() {
    if (!this.dashboardData)
      return;
    this.chartData.topProducts = this.dashboardData.productQuantities?.donhang?.sort((a, b) => parseFloat(b.soluong) - parseFloat(a.soluong))?.slice(0, 10) || [];
    this.chartData.comparisonChart = [
      {
        label: "\u0110\u01A1n H\xE0ng Hi\u1EC7n T\u1EA1i",
        current: this.dashboardData.donhang?.total || 0,
        previous: this.dashboardData.donhang?.previousTotal || 0,
        color: "bg-blue-500"
      },
      {
        label: "\u0110\u1EB7t H\xE0ng Hi\u1EC7n T\u1EA1i",
        current: this.dashboardData.dathang?.total || 0,
        previous: this.dashboardData.dathang?.previousTotal || 0,
        color: "bg-green-500"
      }
    ];
    this.chartData.productChart = this.chartData.topProducts.slice(0, 8);
  }
  // Helper methods cho TailwindCSS charts
  getBarHeight(value, maxValue) {
    if (maxValue === 0)
      return "2%";
    const percentage = value / maxValue * 100;
    return `${Math.max(percentage, 2)}%`;
  }
  getMaxValue(data, field) {
    return Math.max(...data.map((item) => parseFloat(item[field]) || 0));
  }
  getPercentageChange(current, previous) {
    if (previous === 0)
      return 0;
    return Number(((current - previous) / previous * 100).toFixed(1));
  }
  getChangeColor(change) {
    return change >= 0 ? "text-green-600" : "text-red-600";
  }
  getChangeIcon(change) {
    return change >= 0 ? "trending_up" : "trending_down";
  }
  formatCurrency(value) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND"
    }).format(value);
  }
  formatNumber(value) {
    return new Intl.NumberFormat("vi-VN").format(Number(value));
  }
  // Get color for each product bar
  getProductColor(index) {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-red-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-teal-500"
    ];
    return colors[index % colors.length];
  }
  truncateText(text, length = 20) {
    return text.length > length ? text.substring(0, length) + "..." : text;
  }
  // Template helper methods for global functions
  parseFloat(value) {
    return parseFloat(value);
  }
  mathMax(a, b) {
    return Math.max(a, b);
  }
  // Get days difference between start and end date
  getDaysDifference() {
    const diffTime = Math.abs(this.ketthuc.getTime() - this.batdau.getTime());
    const diffDays = Math.ceil(diffTime / (1e3 * 60 * 60 * 24)) + 1;
    return diffDays;
  }
  static \u0275fac = function DashboardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DashboardComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DashboardComponent, selectors: [["app-dashboard"]], decls: 52, vars: 10, consts: [["startPicker", ""], ["endPicker", ""], ["noProducts", ""], [1, "w-full", "flex", "flex-col", "space-y-6", "py-4", "items-center"], [1, "flex", "flex-row", "space-x-2", "justify-center", "items-center"], [1, "font-bold", "text-2xl", "text-gray-800"], [1, "material-symbols-outlined", "text-blue-600"], [1, "w-full", "lg:px-8", "px-4", "bg-gray-50", "min-h-screen"], [1, "w-full", "flex", "flex-col", "gap-6", "mx-auto", "max-w-7xl"], [1, "bg-white", "rounded-xl", "shadow-lg", "p-6"], [1, "flex", "flex-col", "sm:flex-row", "gap-4", "items-center"], [1, "flex-1"], ["appearance", "outline", "subscriptSizing", "dynamic", 1, "w-full"], ["matInput", "", "readonly", "", 3, "ngModelChange", "matDatepicker", "ngModel"], ["matIconSuffix", "", 3, "for"], [1, "flex", "gap-2", "items-center", "justify-center"], ["mat-raised-button", "", "color", "primary", 3, "click", "disabled"], [1, "mr-2"], ["mat-raised-button", "", 3, "click", "disabled"], [1, "flex", "flex-wrap", "items-center", "gap-2", "mt-4", "pt-4", "border-t", "border-gray-200"], [1, "text-sm", "text-gray-600", "mr-2"], ["mat-button", "", 1, "text-sm", 3, "click"], ["class", "flex justify-center items-center py-12", 4, "ngIf"], ["class", "space-y-6", 4, "ngIf"], [1, "flex", "justify-center", "items-center", "py-12"], [1, "flex", "flex-col", "items-center", "gap-4"], [1, "animate-spin", "rounded-full", "h-16", "w-16", "border-b-4", "border-blue-500"], [1, "text-gray-600", "text-lg"], [1, "space-y-6"], [1, "bg-gradient-to-r", "from-blue-500", "to-purple-600", "rounded-xl", "shadow-lg", "p-6", "text-white"], [1, "flex", "items-center", "justify-between"], [1, "text-xl", "font-semibold"], [1, "text-blue-100", "mt-1"], [1, "text-right"], [1, "text-2xl", "font-bold"], [1, "text-blue-100"], [1, "grid", "lg:grid-cols-3", "md:grid-cols-2", "grid-cols-1", "gap-6"], [1, "bg-white", "rounded-xl", "shadow-lg", "p-6", "border-l-4", "border-blue-500"], [1, "text-sm", "font-medium", "text-gray-600"], [1, "text-3xl", "font-bold", "text-gray-900"], [1, "flex", "items-center", "mt-2"], [1, "text-sm", "font-medium", "flex", "items-center"], [1, "text-sm", "mr-1"], [1, "text-sm", "text-gray-500", "ml-2"], [1, "h-12", "w-12", "bg-blue-100", "rounded-lg", "flex", "items-center", "justify-center"], [1, "text-blue-600"], [1, "bg-white", "rounded-xl", "shadow-lg", "p-6", "border-l-4", "border-green-500"], [1, "text-sm", "text-gray-500", "mt-2"], [1, "h-12", "w-12", "bg-green-100", "rounded-lg", "flex", "items-center", "justify-center"], [1, "text-green-600"], [1, "bg-white", "rounded-xl", "shadow-lg", "p-6", "border-l-4", "border-purple-500"], [1, "text-2xl", "font-bold", "text-gray-900"], [1, "h-12", "w-12", "bg-purple-100", "rounded-lg", "flex", "items-center", "justify-center"], [1, "text-purple-600"], [1, "grid", "lg:grid-cols-2", "gap-6"], [1, "flex", "items-center", "justify-between", "mb-6"], [1, "text-lg", "font-semibold", "text-gray-900"], [1, "text-gray-400"], ["class", "space-y-4", 4, "ngIf", "ngIfElse"], ["class", "space-y-3", 4, "ngFor", "ngForOf"], [1, "bg-blue-100", "text-blue-800", "text-sm", "font-medium", "px-3", "py-1", "rounded-full"], [1, "overflow-x-auto"], [1, "max-h-96", "overflow-y-auto"], [1, "min-w-full", "divide-y", "divide-gray-200"], [1, "bg-gray-50", "sticky", "top-0"], [1, "px-6", "py-3", "text-left", "text-xs", "font-medium", "text-gray-500", "uppercase", "tracking-wider"], [1, "bg-white", "divide-y", "divide-gray-200"], ["class", "hover:bg-gray-50 transition-colors", 4, "ngFor", "ngForOf"], ["class", "text-center py-8", 4, "ngIf"], [1, "space-y-4"], ["class", "flex items-center space-x-3", 4, "ngFor", "ngForOf"], [1, "flex", "items-center", "space-x-3"], [1, "flex-shrink-0", "w-8", "h-8", "rounded-full", "flex", "items-center", "justify-center", "text-white", "text-sm", "font-medium"], [1, "flex-1", "min-w-0"], [1, "text-sm", "font-medium", "text-gray-900", "truncate", 3, "title"], [1, "flex", "items-center", "mt-1"], [1, "flex-1", "bg-gray-200", "rounded-full", "h-2", "mr-3"], [1, "h-2", "rounded-full", "transition-all", "duration-300"], [1, "text-sm", "text-gray-600", "font-medium"], [1, "text-center", "py-8"], [1, "text-gray-400", "text-4xl"], [1, "text-gray-500", "mt-2"], [1, "space-y-3"], [1, "flex", "justify-between", "items-center"], [1, "text-sm", "font-medium", "text-gray-700"], [1, "text-sm", "text-gray-500"], [1, "relative"], [1, "flex", "space-x-2", "h-8"], [1, "flex-1", "bg-gray-200", "rounded-lg", "overflow-hidden"], [1, "text-white", "text-xs", "font-medium"], [1, "bg-gray-400", "h-full", "transition-all", "duration-500", "rounded-lg", "flex", "items-center", "justify-end", "pr-2"], [1, "flex", "justify-between", "text-xs", "text-gray-500", "mt-1"], [1, "text-center"], [1, "text-sm", "font-medium", "flex", "items-center", "justify-center"], [1, "hover:bg-gray-50", "transition-colors"], [1, "px-6", "py-4", "whitespace-nowrap", "text-sm", "text-gray-500"], [1, "px-6", "py-4", "whitespace-nowrap"], [1, "text-sm", "font-medium", "text-gray-900"], [1, "px-6", "py-4", "whitespace-nowrap", "text-sm", "text-gray-900"], [1, "inline-flex", "items-center", "px-2.5", "py-0.5", "rounded-full", "text-xs", "font-medium", "bg-blue-100", "text-blue-800"]], template: function DashboardComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 3)(1, "div", 4)(2, "span", 5);
      \u0275\u0275text(3, "Dashboard Qu\u1EA3n L\xFD \u0110\u01A1n H\xE0ng");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "span", 6);
      \u0275\u0275text(5, "dashboard");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div", 7)(7, "div", 8)(8, "div", 9)(9, "div", 10)(10, "div", 11)(11, "mat-form-field", 12)(12, "mat-label");
      \u0275\u0275text(13, "Ng\xE0y b\u1EAFt \u0111\u1EA7u");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "input", 13);
      \u0275\u0275twoWayListener("ngModelChange", function DashboardComponent_Template_input_ngModelChange_14_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.batdau, $event) || (ctx.batdau = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275element(15, "mat-datepicker-toggle", 14)(16, "mat-datepicker", null, 0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(18, "div", 11)(19, "mat-form-field", 12)(20, "mat-label");
      \u0275\u0275text(21, "Ng\xE0y k\u1EBFt th\xFAc");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "input", 13);
      \u0275\u0275twoWayListener("ngModelChange", function DashboardComponent_Template_input_ngModelChange_22_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.ketthuc, $event) || (ctx.ketthuc = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275element(23, "mat-datepicker-toggle", 14)(24, "mat-datepicker", null, 1);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(26, "div", 15)(27, "button", 16);
      \u0275\u0275listener("click", function DashboardComponent_Template_button_click_27_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.applyDateFilter());
      });
      \u0275\u0275elementStart(28, "mat-icon", 17);
      \u0275\u0275text(29, "search");
      \u0275\u0275elementEnd();
      \u0275\u0275text(30, " \xC1p d\u1EE5ng ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "button", 18);
      \u0275\u0275listener("click", function DashboardComponent_Template_button_click_31_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.loadDashboardData());
      });
      \u0275\u0275elementStart(32, "mat-icon", 17);
      \u0275\u0275text(33, "refresh");
      \u0275\u0275elementEnd();
      \u0275\u0275text(34, " L\xE0m m\u1EDBi ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(35, "div", 19)(36, "span", 20);
      \u0275\u0275text(37, "Ch\u1ECDn nhanh:");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(38, "button", 21);
      \u0275\u0275listener("click", function DashboardComponent_Template_button_click_38_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.setDateRange("today"));
      });
      \u0275\u0275text(39, " H\xF4m nay ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "button", 21);
      \u0275\u0275listener("click", function DashboardComponent_Template_button_click_40_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.setDateRange("yesterday"));
      });
      \u0275\u0275text(41, " H\xF4m qua ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(42, "button", 21);
      \u0275\u0275listener("click", function DashboardComponent_Template_button_click_42_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.setDateRange("last7days"));
      });
      \u0275\u0275text(43, " 7 ng\xE0y qua ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(44, "button", 21);
      \u0275\u0275listener("click", function DashboardComponent_Template_button_click_44_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.setDateRange("last30days"));
      });
      \u0275\u0275text(45, " 30 ng\xE0y qua ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(46, "button", 21);
      \u0275\u0275listener("click", function DashboardComponent_Template_button_click_46_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.setDateRange("thisMonth"));
      });
      \u0275\u0275text(47, " Th\xE1ng n\xE0y ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(48, "button", 21);
      \u0275\u0275listener("click", function DashboardComponent_Template_button_click_48_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.setDateRange("lastMonth"));
      });
      \u0275\u0275text(49, " Th\xE1ng tr\u01B0\u1EDBc ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(50, DashboardComponent_div_50_Template, 5, 0, "div", 22)(51, DashboardComponent_div_51_Template, 141, 37, "div", 23);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      const startPicker_r9 = \u0275\u0275reference(17);
      const endPicker_r10 = \u0275\u0275reference(25);
      \u0275\u0275advance(14);
      \u0275\u0275property("matDatepicker", startPicker_r9);
      \u0275\u0275twoWayProperty("ngModel", ctx.batdau);
      \u0275\u0275advance();
      \u0275\u0275property("for", startPicker_r9);
      \u0275\u0275advance(7);
      \u0275\u0275property("matDatepicker", endPicker_r10);
      \u0275\u0275twoWayProperty("ngModel", ctx.ketthuc);
      \u0275\u0275advance();
      \u0275\u0275property("for", endPicker_r10);
      \u0275\u0275advance(4);
      \u0275\u0275property("disabled", ctx.isLoading);
      \u0275\u0275advance(4);
      \u0275\u0275property("disabled", ctx.isLoading);
      \u0275\u0275advance(19);
      \u0275\u0275property("ngIf", ctx.isLoading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isLoading && ctx.dashboardData);
    }
  }, dependencies: [
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatSuffix,
    MatInputModule,
    MatInput,
    MatDatepickerModule,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatNativeDateModule,
    FormsModule,
    DefaultValueAccessor,
    NgControlStatus,
    NgModel,
    CommonModule,
    NgForOf,
    NgIf,
    DecimalPipe,
    DatePipe,
    MatButtonModule,
    MatButton,
    MatCardModule,
    MatIconModule,
    MatIcon,
    MatMenuModule
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DashboardComponent, { className: "DashboardComponent", filePath: "src/app/admin/dashboard/dashboard.component.ts", lineNumber: 34 });
})();
export {
  DashboardComponent
};
//# sourceMappingURL=chunk-RF557HO5.mjs.map
