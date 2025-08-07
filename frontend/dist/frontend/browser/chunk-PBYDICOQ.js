import {
  MatSelectModule
} from "./chunk-VZZGNK7J.js";
import {
  MatIconModule
} from "./chunk-ZAANGQNB.js";
import {
  FormsModule,
  MatFormFieldModule,
  MatInputModule
} from "./chunk-WEAWHMFJ.js";
import "./chunk-44ZKFD54.js";
import "./chunk-2AWV6PYA.js";
import "./chunk-4E5W4BJX.js";
import {
  MatButtonModule
} from "./chunk-HICNAP2H.js";
import "./chunk-LD5X4C2B.js";
import "./chunk-GWKJMKCD.js";
import "./chunk-KJMZCM3Q.js";
import {
  CommonModule
} from "./chunk-E6DSVUBK.js";
import {
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵtext
} from "./chunk-IHZ7YO24.js";
import "./chunk-E3MB3462.js";
import "./chunk-SXK72SKC.js";

// src/app/shared/common/users/profile/social/social.component.ts
var SocialComponent = class _SocialComponent {
  socialLinks = [];
  newSocialPlatform = "";
  availablePlatforms = ["Facebook", "Twitter", "LinkedIn", "Instagram", "YouTube"];
  constructor() {
  }
  ngOnInit() {
    this.socialLinks = [
      { platform: "Facebook", url: "" },
      { platform: "Twitter", url: "" }
    ];
  }
  addSocialLink() {
    if (this.newSocialPlatform) {
      this.socialLinks.push({ platform: this.newSocialPlatform, url: "" });
      this.newSocialPlatform = "";
    }
  }
  removeSocialLink(index) {
    this.socialLinks.splice(index, 1);
  }
  saveSocialLinks() {
    console.log("Saving social links:", this.socialLinks);
  }
  static \u0275fac = function SocialComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SocialComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SocialComponent, selectors: [["app-social"]], decls: 7, vars: 0, consts: [[1, "w-full", "mx-auto", "p-4", "bg-[#F7E6E9]", "rounded-lg", "shadow", "overflow-hidden"], [1, "text-2xl", "font-bold", "mb-6"], [1, "mb-4"], [1, "space-y-6"]], template: function SocialComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "h2", 1);
      \u0275\u0275text(2, "K\u1EBFt n\u1ED1i m\u1EA1ng x\xE3 h\u1ED9i");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "p", 2);
      \u0275\u0275text(4, "Li\xEAn k\u1EBFt t\xE0i kho\u1EA3n m\u1EA1ng x\xE3 h\u1ED9i c\u1EE7a b\u1EA1n \u0111\u1EC3 chia s\u1EBB v\xE0 k\u1EBFt n\u1ED1i d\u1EC5 d\xE0ng h\u01A1n.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "div", 3);
      \u0275\u0275text(6, " \u0110ang Ph\xE1t Tri\u1EC3n ");
      \u0275\u0275elementEnd()();
    }
  }, dependencies: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SocialComponent, { className: "SocialComponent", filePath: "src/app/shared/common/users/profile/social/social.component.ts", lineNumber: 25 });
})();
export {
  SocialComponent
};
//# sourceMappingURL=chunk-PBYDICOQ.js.map
