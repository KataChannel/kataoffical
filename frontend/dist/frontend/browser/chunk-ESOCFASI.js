import {
  NgxFileDropModule
} from "./chunk-KK6GX724.js";
import {
  UploadService
} from "./chunk-GW3FSJBW.js";
import "./chunk-WMRPSYJH.js";
import "./chunk-PKPIUWLZ.js";
import "./chunk-7VZTPIES.js";
import "./chunk-R5HFYA7U.js";
import {
  UserService
} from "./chunk-XGCTO3IF.js";
import {
  MatDatepickerModule
} from "./chunk-S32RIQSG.js";
import {
  MatSidenavModule
} from "./chunk-KRIHICU6.js";
import {
  MatSelectModule
} from "./chunk-VZZGNK7J.js";
import {
  MatFormFieldModule,
  MatInputModule
} from "./chunk-WEAWHMFJ.js";
import "./chunk-44ZKFD54.js";
import "./chunk-U3IXXJDR.js";
import "./chunk-WD36GM3Q.js";
import "./chunk-2AWV6PYA.js";
import "./chunk-4E5W4BJX.js";
import "./chunk-HICNAP2H.js";
import "./chunk-LD5X4C2B.js";
import {
  MatNativeDateModule
} from "./chunk-GWKJMKCD.js";
import {
  RouterModule,
  RouterOutlet
} from "./chunk-JGMWTFVW.js";
import {
  DomSanitizer
} from "./chunk-KJMZCM3Q.js";
import {
  CommonModule
} from "./chunk-E6DSVUBK.js";
import {
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵtext
} from "./chunk-IHZ7YO24.js";
import "./chunk-E3MB3462.js";
import {
  __async
} from "./chunk-SXK72SKC.js";

// src/app/shared/common/users/profile/profile.component.ts
var ProfileComponent = class _ProfileComponent {
  sanitizer;
  isMenuOpen = false;
  profileImageUrl = "avatar.png";
  // Default image
  constructor(sanitizer) {
    this.sanitizer = sanitizer;
  }
  isLoading = false;
  profile = signal({});
  isEditAvatar = false;
  files = [];
  _UserService = inject(UserService);
  _uploadService = inject(UploadService);
  Menus = [
    { id: 1, Title: "C\xE0i \u0111\u1EB7t t\xE0i kho\u1EA3n", Slug: "./account" },
    { id: 2, Title: "\u0110\u1ED5i m\u1EADt kh\u1EA9u", Slug: "./password" },
    { id: 3, Title: "K\u1EBFt n\u1ED1i", Slug: "./social" },
    { id: 4, Title: "Ch\xEDnh s\xE1ch b\u1EA3o m\u1EADt", Slug: "./privacy" },
    { id: 5, Title: "\u0110i\u1EC1u kho\u1EA3n & \u0110i\u1EC1u ki\u1EC7n", Slug: "./terms" }
  ];
  ngOnInit() {
    return __async(this, null, function* () {
      yield this._UserService.getProfile();
      this.profile = this._UserService.profile;
    });
  }
  getTrustUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  handlePaste(event) {
    this.isLoading = true;
    const clipboardItems = event.clipboardData?.items;
    if (clipboardItems) {
      for (let i = 0; i < clipboardItems.length; i++) {
        const item = clipboardItems[i];
        if (item.type.indexOf("image") !== -1) {
          const blob = item.getAsFile();
          if (blob) {
            console.log("Pasted image:", blob);
            const file = new File([blob], `${this.profile().email.split("@")[0]}_${(/* @__PURE__ */ new Date()).getTime()}.png`, {
              type: blob.type
            });
            this._uploadService.uploadDriver(file).then((res) => {
              console.log(res);
              this.profile().Avatar = res.fileId;
              this.isLoading = false;
              this.isEditAvatar = false;
              this._UserService.updateUser(this.profile());
            });
          }
        }
      }
    }
  }
  dropped(files) {
    this.isLoading = true;
    this.files = files;
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry;
        fileEntry.file((file) => {
          this._uploadService.uploadDriver(file).then((res) => {
            console.log(res);
            this.profile().Avatar = res.fileId;
            this.isLoading = false;
            this.isEditAvatar = false;
            this._UserService.updateUser(this.profile());
          });
        });
      }
    }
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  openImageUploader() {
  }
  static \u0275fac = function ProfileComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProfileComponent)(\u0275\u0275directiveInject(DomSanitizer));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProfileComponent, selectors: [["app-profile"]], decls: 30, vars: 0, consts: [[1, "flex", "flex-col", "space-y-4", "p-4"], [1, "w-full", "mx-auto", "bg-[#F7E6E9]", "rounded-lg", "shadow", "overflow-hidden"], [1, "relative", "col-span-2"], ["src", "https://png.pngtree.com/thumb_back/fw800/background/20240103/pngtree-vibrant-foliage-a-green-textured-background-of-banana-tree-leaves-image_13865143.png", "alt", "cover", 1, "w-full", "h-48", "object-cover"], [1, "absolute", "bottom-4", "left-4", "flex", "items-center"], ["src", "https://png.pngtree.com/thumb_back/fw800/background/20240103/pngtree-vibrant-foliage-a-green-textured-background-of-banana-tree-leaves-image_13865143.png", "alt", "avatar", 1, "w-20", "h-20", "rounded-full", "border-4", "border-white", "shadow-lg"], [1, "ml-4"], [1, "text-xl", "font-bold", "text-white"], [1, "text-sm", "text-gray-200"], [1, "border-t", "px-6", "py-4", "flex", "items-center", "justify-between"], [1, "flex", "space-x-6"], [1, "flex", "items-center", "text-gray-700", "font-medium", "hover:text-black"], [1, "material-icons", "mr-2"], [1, "flex", "items-center", "text-gray-500", "hover:text-black"]], template: function ProfileComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
      \u0275\u0275element(3, "img", 3);
      \u0275\u0275elementStart(4, "div", 4);
      \u0275\u0275element(5, "img", 5);
      \u0275\u0275elementStart(6, "div", 6)(7, "h2", 7);
      \u0275\u0275text(8, "Jaydon Frankie");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "p", 8);
      \u0275\u0275text(10, "CTO");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(11, "div", 9)(12, "div", 10)(13, "button", 11)(14, "span", 12);
      \u0275\u0275text(15, "account_circle");
      \u0275\u0275elementEnd();
      \u0275\u0275text(16, " Profile ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "button", 13)(18, "span", 12);
      \u0275\u0275text(19, "favorite");
      \u0275\u0275elementEnd();
      \u0275\u0275text(20, " Followers ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "button", 13)(22, "span", 12);
      \u0275\u0275text(23, "group");
      \u0275\u0275elementEnd();
      \u0275\u0275text(24, " Friends ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "button", 13)(26, "span", 12);
      \u0275\u0275text(27, "collections");
      \u0275\u0275elementEnd();
      \u0275\u0275text(28, " Gallery ");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275element(29, "router-outlet");
      \u0275\u0275elementEnd();
    }
  }, dependencies: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterModule,
    RouterOutlet,
    NgxFileDropModule,
    MatSidenavModule
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProfileComponent, { className: "ProfileComponent", filePath: "src/app/shared/common/users/profile/profile.component.ts", lineNumber: 31 });
})();
export {
  ProfileComponent
};
//# sourceMappingURL=chunk-ESOCFASI.js.map
