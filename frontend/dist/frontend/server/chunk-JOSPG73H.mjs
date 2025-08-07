import './polyfills.server.mjs';
import {
  AdminmainComponent
} from "./chunk-WTLUYGW7.mjs";
import {
  UserService
} from "./chunk-KPXPV3IG.mjs";
import {
  MatPaginator,
  MatPaginatorModule,
  MatSort,
  MatSortModule,
  MatTableDataSource,
  MatTableModule,
  MatTooltip,
  MatTooltipModule
} from "./chunk-DWV2CVG4.mjs";
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle
} from "./chunk-7O7BZAOJ.mjs";
import {
  MatDrawer,
  MatDrawerContainer,
  MatSidenavModule
} from "./chunk-GOLLTURE.mjs";
import {
  MatSelect,
  MatSelectModule
} from "./chunk-Z7QVUZWX.mjs";
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
  NgControlStatus,
  NgModel
} from "./chunk-BTD2ENWJ.mjs";
import {
  environment
} from "./chunk-QFPTY5IH.mjs";
import {
  MatSnackBar,
  StorageService
} from "./chunk-A6W66WDU.mjs";
import {
  MatButton,
  MatButtonModule,
  MatIconButton
} from "./chunk-2QXHUJNF.mjs";
import {
  BreakpointObserver,
  Breakpoints,
  MatOption
} from "./chunk-7GJ6SLXG.mjs";
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from "./chunk-PLFAEF4K.mjs";
import {
  CommonModule,
  DatePipe,
  NgIf,
  isPlatformBrowser
} from "./chunk-H3GF4RFC.mjs";
import {
  PLATFORM_ID,
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMapInterpolate1,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpropertyInterpolate,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-4EQURZBD.mjs";
import {
  __async
} from "./chunk-FMEBT56H.mjs";

// src/app/admin/hotro/listhotro/listhotro.ts
var ListHotro = [
  {
    "id": "8efd5ba3-d073-4baf-ab89-31180ee7471d",
    "ref_id": "0",
    "gid": "",
    "fid": "",
    "zid": "",
    "pid": "",
    "SDT": "098765421",
    "idGroup": "",
    "Code": "751221",
    "Hoten": "test1",
    "Avatar": "",
    "Ngaysinh": null,
    "email": "test1@gmail.com",
    "Gioitinh": "",
    "EditChinhanhs": [],
    "Diachi": [],
    "password": "$2b$10$YSq7l4/1fe7ihGsxRaS/CuG0bP93xyYmcBWVuMbXr96c18HIQOU/e",
    "ListImage": [],
    "Profile": [],
    "Role": "user",
    "Phanquyen": [],
    "Menu": [],
    "fcmToken": [],
    "Type": "",
    "Ordering": 1,
    "idDelete": false,
    "Status": 0,
    "CreateAt": "2024-12-11T03:11:52.074Z",
    "UpdateAt": "2024-12-11T03:11:52.074Z",
    "DeleteAt": null,
    "idCreate": null
  },
  {
    "id": "930e46a3-c2be-4063-a395-0adda0c24218",
    "ref_id": "0",
    "gid": "115812709741721912709",
    "fid": "",
    "zid": "",
    "pid": "",
    "SDT": "",
    "idGroup": "",
    "Code": "655487",
    "Hoten": "",
    "Avatar": "",
    "Ngaysinh": null,
    "email": "quocbao280783@gmail.com",
    "Gioitinh": "",
    "EditChinhanhs": [],
    "Diachi": [],
    "password": "$2b$10$iqsxkNI.ljPmvC/Cu.0hWOtRVzRkcHmE.xz1Oc59godPAjdLJ.pTS",
    "ListImage": [],
    "Profile": [],
    "Role": "user",
    "Phanquyen": [],
    "Menu": [],
    "fcmToken": [],
    "Type": "",
    "Ordering": 1,
    "idDelete": false,
    "Status": 0,
    "CreateAt": "2024-12-06T07:23:12.949Z",
    "UpdateAt": "2024-12-10T05:06:03.000Z",
    "DeleteAt": null,
    "idCreate": null
  },
  {
    "id": "ba962571-6c61-4a63-8dfd-7550ef982468",
    "ref_id": "0",
    "gid": "",
    "fid": "",
    "zid": "",
    "pid": "",
    "SDT": "",
    "idGroup": "",
    "Code": "342212",
    "Hoten": "",
    "Avatar": "",
    "Ngaysinh": null,
    "email": "chikietit@gmail.com",
    "Gioitinh": "",
    "EditChinhanhs": [],
    "Diachi": [],
    "password": "$2b$10$f6emY.ehT0BnUnObpIz8iOERl8AOOsTDicz9VZsmKHrh5FQyHBRwi",
    "ListImage": [],
    "Profile": [],
    "Role": "user",
    "Phanquyen": [],
    "Menu": [],
    "fcmToken": [],
    "Type": "",
    "Ordering": 1,
    "idDelete": false,
    "Status": 0,
    "CreateAt": "2024-12-05T08:29:55.283Z",
    "UpdateAt": "2024-12-05T08:29:55.283Z",
    "DeleteAt": null,
    "idCreate": null
  },
  {
    "id": "e94a4da4-12d1-4e3c-8759-23a0a5914156",
    "ref_id": "0",
    "gid": "",
    "fid": "",
    "zid": "",
    "pid": "",
    "SDT": "",
    "idGroup": "",
    "Code": "470177",
    "Hoten": "",
    "Avatar": "",
    "Ngaysinh": null,
    "email": "wetdragon1996@gmail.com",
    "Gioitinh": "",
    "EditChinhanhs": [],
    "Diachi": [],
    "password": "$2b$10$HQqUp5pLAPDedsNI4h8s9eg/NB1FCBQ/HtOPOJx72i/v90J4ZV9SK",
    "ListImage": [],
    "Profile": [],
    "Role": "user",
    "Phanquyen": [],
    "Menu": [],
    "fcmToken": [],
    "Type": "",
    "Ordering": 1,
    "idDelete": false,
    "Status": 0,
    "CreateAt": "2024-12-02T03:09:43.472Z",
    "UpdateAt": "2024-12-05T09:02:12.000Z",
    "DeleteAt": null,
    "idCreate": null
  },
  {
    "id": "0ca0f7b4-56ad-414a-846b-4c867da4c891",
    "ref_id": "0",
    "gid": "116895729763152566602",
    "fid": "",
    "zid": "",
    "pid": "",
    "SDT": "",
    "idGroup": "",
    "Code": "256165",
    "Hoten": "",
    "Avatar": "",
    "Ngaysinh": null,
    "email": "katachanneloffical@gmail.com",
    "Gioitinh": "",
    "EditChinhanhs": [],
    "Diachi": [],
    "password": "$2b$10$pJxBQaiFty9D1e6Bjv.0j.GX5mobsLCt6t22/eoX.Hf8FfIQoo94u",
    "ListImage": [],
    "Profile": [],
    "Role": "user",
    "Phanquyen": [],
    "Menu": [],
    "fcmToken": [],
    "Type": "",
    "Ordering": 1,
    "idDelete": false,
    "Status": 0,
    "CreateAt": "2024-11-25T09:18:25.812Z",
    "UpdateAt": "2024-12-17T11:51:53.000Z",
    "DeleteAt": null,
    "idCreate": null
  },
  {
    "id": "7fa80031-41e4-4dea-ab3d-8b6b989cf124",
    "ref_id": "0",
    "gid": "",
    "fid": "",
    "zid": "",
    "pid": "",
    "SDT": "0934123456",
    "idGroup": "",
    "Code": "896331",
    "Hoten": "H\u1ED3 Anh Tu\u1EA5n",
    "Avatar": "",
    "Ngaysinh": null,
    "email": "tuan.mkt@tuanho.com",
    "Gioitinh": "",
    "EditChinhanhs": [],
    "Diachi": [],
    "password": "$2b$10$iZZK6SLEdvG2Wjj3cdsxFOQYwl.xx9zeRev6wZUG0FYcniyJpcPY6",
    "ListImage": [],
    "Profile": [],
    "Role": "customer",
    "Phanquyen": [],
    "Menu": [],
    "fcmToken": [],
    "Type": "",
    "Ordering": 1,
    "idDelete": false,
    "Status": 0,
    "CreateAt": "2024-01-19T01:26:43.112Z",
    "UpdateAt": "2024-01-19T01:26:43.112Z",
    "DeleteAt": null,
    "idCreate": null
  },
  {
    "id": "43921534-d600-443e-8ec1-26cc7d93ff18",
    "ref_id": "0",
    "gid": "",
    "fid": "",
    "zid": "",
    "pid": "",
    "SDT": "0987654321",
    "idGroup": "caaeadb0-64d3-4e5a-b42f-bc45abbbba06",
    "Code": "757379",
    "Hoten": "Tester",
    "Avatar": "",
    "Ngaysinh": null,
    "email": "tester@gmail.com",
    "Gioitinh": "",
    "EditChinhanhs": [
      {
        "Title": "Taza Skin Clinic ?\xE0 N?ng",
        "id": "9887ad61-4b2c-4db1-83e6-570f33cb540a",
        "Checked": false
      },
      {
        "Title": "Taza Skin Clinic Nha Trang",
        "id": "e173b1c0-fbdb-4eeb-a00c-b56664068515",
        "Checked": false
      },
      {
        "Title": "Taza Skin Clinic G\xF2 V?p",
        "id": "268b7a06-d2c5-4c98-af1d-334144ae280f",
        "Checked": false
      },
      {
        "Title": "Taza Skin Clinic Th? ??c",
        "id": "f54de1e1-66bd-4690-8015-ad7315d6f14e",
        "Checked": false
      },
      {
        "Title": "Taza Skin Clinic Qu?n 10",
        "id": "ca725bf4-4810-4ea2-8ef2-520b2a3121cc",
        "Checked": false
      },
      {
        "Title": "Timona Academy C? S? Qu?n 10",
        "id": "34aa91e2-c469-42bb-898b-a11618452ebd",
        "Checked": false
      },
      {
        "Title": "Timona Academy C? S? G\xF2 V?p",
        "id": "ee3d1ed9-eafa-4b89-b045-46fa347c377e",
        "Checked": false
      },
      {
        "Title": "Timona Academy c? s? ?\xE0 N?ng",
        "id": "7c152522-3858-4669-b745-a1fd2d25ad9a",
        "Checked": false
      },
      {
        "Title": "Timona Academy c? s? Nha Trang",
        "id": "9a5cdc4d-fbbf-41c2-9222-9c01d5433148",
        "Checked": false
      },
      {
        "Title": "Timona Academy c? s? Th? ??c",
        "id": "c4a68bd5-c120-4bf0-a4d1-447e4921eb76",
        "Checked": false
      },
      {
        "Title": "Timona Academy c? s? C\xE1ch M?ng Th\xE1ng 8",
        "id": "3b9e91d5-21ac-44b2-ba01-e87ee310fdcd",
        "Checked": false
      }
    ],
    "Diachi": [],
    "password": "$2b$10$YuEyU32KQxnI8JACV3/Ab.aSxLZilRAn1hcAmwBcUGJ2gp.t/7sI.",
    "ListImage": [],
    "Profile": [],
    "Role": "admin",
    "Phanquyen": [],
    "Menu": [],
    "fcmToken": [],
    "Type": "",
    "Ordering": 1,
    "idDelete": false,
    "Status": 0,
    "CreateAt": "2024-01-15T01:02:36.313Z",
    "UpdateAt": "2024-04-09T01:23:42.000Z",
    "DeleteAt": null,
    "idCreate": null
  },
  {
    "id": "b045e2e2-5c44-4bef-ba84-7cb6b14ef6a5",
    "ref_id": "0",
    "gid": "",
    "fid": "",
    "zid": "",
    "pid": "",
    "SDT": "0786810434",
    "idGroup": "e3be8e89-0530-435d-be42-29e8aef77794",
    "Code": "935519",
    "Hoten": "\u0110an Thanh",
    "Avatar": "",
    "Ngaysinh": null,
    "email": "leadercskh.cgo@tazagroup.vn",
    "Gioitinh": "",
    "EditChinhanhs": [
      {
        "Title": "Taza Skin Clinic ?\xE0 N?ng",
        "id": "9887ad61-4b2c-4db1-83e6-570f33cb540a",
        "Checked": true
      },
      {
        "Title": "Taza Skin Clinic Nha Trang",
        "id": "e173b1c0-fbdb-4eeb-a00c-b56664068515",
        "Checked": true
      },
      {
        "Title": "Taza Skin Clinic G\xF2 V?p",
        "id": "268b7a06-d2c5-4c98-af1d-334144ae280f",
        "Checked": true
      },
      {
        "Title": "Taza Skin Clinic Th? ??c",
        "id": "f54de1e1-66bd-4690-8015-ad7315d6f14e",
        "Checked": true
      },
      {
        "Title": "Taza Skin Clinic Qu?n 10",
        "id": "ca725bf4-4810-4ea2-8ef2-520b2a3121cc",
        "Checked": true
      }
    ],
    "Diachi": [],
    "password": "$2b$10$zimmBmMej7nv2Jpx.BH.JOQ6dSyUZIiKiHZoWBIyccflCxLqftyf2",
    "ListImage": [],
    "Profile": [],
    "Role": "admin",
    "Phanquyen": [],
    "Menu": [],
    "fcmToken": [],
    "Type": "",
    "Ordering": 1,
    "idDelete": false,
    "Status": 0,
    "CreateAt": "2023-12-14T01:51:51.061Z",
    "UpdateAt": "2024-11-26T05:07:30.000Z",
    "DeleteAt": null,
    "idCreate": null
  },
  {
    "id": "6a56a975-7244-4a50-9f2c-4b7c49b2b4ac",
    "ref_id": "0",
    "gid": "",
    "fid": "",
    "zid": "",
    "pid": "",
    "SDT": "0935380828",
    "idGroup": "4817d73d-1eba-4a57-97f1-13452e175478",
    "Code": "515874",
    "Hoten": "Anh S\u01A1n",
    "Avatar": "",
    "Ngaysinh": null,
    "email": "sonpham.design@gmail.com",
    "Gioitinh": "",
    "EditChinhanhs": [
      {
        "Title": "Taza Skin Clinic ?\xE0 N?ng",
        "id": "9887ad61-4b2c-4db1-83e6-570f33cb540a",
        "Checked": true
      },
      {
        "Title": "Taza Skin Clinic Nha Trang",
        "id": "e173b1c0-fbdb-4eeb-a00c-b56664068515",
        "Checked": true
      },
      {
        "Title": "Taza Skin Clinic G\xF2 V?p",
        "id": "268b7a06-d2c5-4c98-af1d-334144ae280f",
        "Checked": true
      },
      {
        "Title": "Taza Skin Clinic Th? ??c",
        "id": "f54de1e1-66bd-4690-8015-ad7315d6f14e",
        "Checked": true
      },
      {
        "Title": "Taza Skin Clinic Qu?n 10",
        "id": "ca725bf4-4810-4ea2-8ef2-520b2a3121cc",
        "Checked": true
      }
    ],
    "Diachi": [],
    "password": "$2b$10$YuEyU32KQxnI8JACV3/Ab.aSxLZilRAn1hcAmwBcUGJ2gp.t/7sI.",
    "ListImage": [],
    "Profile": [],
    "Role": "admin",
    "Phanquyen": [],
    "Menu": [],
    "fcmToken": [],
    "Type": "",
    "Ordering": 1,
    "idDelete": false,
    "Status": 0,
    "CreateAt": "2023-12-12T07:19:26.376Z",
    "UpdateAt": "2024-05-31T07:58:02.800Z",
    "DeleteAt": null,
    "idCreate": null
  },
  {
    "id": "6b6292d1-84f5-43af-920f-ea812df614a2",
    "ref_id": "0",
    "gid": "",
    "fid": "",
    "zid": "",
    "pid": "",
    "SDT": "0935670135",
    "idGroup": "4817d73d-1eba-4a57-97f1-13452e175478",
    "Code": "563050",
    "Hoten": "Tr\u1EA7n M\u1EF9 Duy\xEAn",
    "Avatar": "",
    "Ngaysinh": null,
    "email": "myduyen.cgo@tazagroup.vn",
    "Gioitinh": "",
    "EditChinhanhs": [
      {
        "Title": "Taza Skin Clinic ?\xE0 N?ng",
        "id": "9887ad61-4b2c-4db1-83e6-570f33cb540a",
        "Checked": true
      },
      {
        "Title": "Taza Skin Clinic Nha Trang",
        "id": "e173b1c0-fbdb-4eeb-a00c-b56664068515",
        "Checked": true
      },
      {
        "Title": "Taza Skin Clinic G\xF2 V?p",
        "id": "268b7a06-d2c5-4c98-af1d-334144ae280f",
        "Checked": true
      },
      {
        "Title": "Taza Skin Clinic Th? ??c",
        "id": "f54de1e1-66bd-4690-8015-ad7315d6f14e",
        "Checked": true
      },
      {
        "Title": "Taza Skin Clinic Qu?n 10",
        "id": "ca725bf4-4810-4ea2-8ef2-520b2a3121cc",
        "Checked": true
      }
    ],
    "Diachi": [],
    "password": "$2b$10$YuEyU32KQxnI8JACV3/Ab.aSxLZilRAn1hcAmwBcUGJ2gp.t/7sI.",
    "ListImage": [],
    "Profile": [],
    "Role": "admin",
    "Phanquyen": [],
    "Menu": [],
    "fcmToken": [],
    "Type": "",
    "Ordering": 1,
    "idDelete": false,
    "Status": 0,
    "CreateAt": "2023-12-12T07:18:24.127Z",
    "UpdateAt": "2024-05-31T07:58:38.118Z",
    "DeleteAt": null,
    "idCreate": null
  },
  {
    "id": "c47af21e-5d5a-490b-95f6-e86dacc21139",
    "ref_id": "0",
    "gid": "103386279635221088134",
    "fid": "",
    "zid": "",
    "pid": "",
    "SDT": "0977272967",
    "idGroup": "4817d73d-1eba-4a57-97f1-13452e175478",
    "Code": "604815",
    "Hoten": "Ph\u1EA1m Ch\xED Ki\u1EC7t",
    "Avatar": "",
    "Ngaysinh": null,
    "email": "chikiet88@gmail.com",
    "Gioitinh": "",
    "EditChinhanhs": [
      {
        "Title": "Taza Skin Clinic ?\xE0 N?ng",
        "id": "9887ad61-4b2c-4db1-83e6-570f33cb540a",
        "Checked": true
      },
      {
        "Title": "Taza Skin Clinic Nha Trang",
        "id": "e173b1c0-fbdb-4eeb-a00c-b56664068515",
        "Checked": true
      },
      {
        "Title": "Taza Skin Clinic G\xF2 V?p",
        "id": "268b7a06-d2c5-4c98-af1d-334144ae280f",
        "Checked": true
      },
      {
        "Title": "Taza Skin Clinic Th? ??c",
        "id": "f54de1e1-66bd-4690-8015-ad7315d6f14e",
        "Checked": true
      },
      {
        "Title": "Taza Skin Clinic Qu?n 10",
        "id": "ca725bf4-4810-4ea2-8ef2-520b2a3121cc",
        "Checked": true
      }
    ],
    "Diachi": [],
    "password": "$2b$10$PdDd7L4QuFht5iqEMWkPmeIjweFGnp3b.TCtBdZfp/Rpu7fv71hY.",
    "ListImage": [],
    "Profile": [],
    "Role": "admin",
    "Phanquyen": [],
    "Menu": [],
    "fcmToken": [],
    "Type": "",
    "Ordering": 1,
    "idDelete": false,
    "Status": 0,
    "CreateAt": "2023-12-11T07:57:50.473Z",
    "UpdateAt": "2024-12-10T13:50:52.000Z",
    "DeleteAt": null,
    "idCreate": null
  }
];
var ListType = [
  { id: 1, Title: "B\xE1o l\u1ED7i", value: "baoloi", bg: "bg-[#f44336]" },
  { id: 2, Title: "H\u1ED7 tr\u1EE3", value: "hotro", bg: "bg-[#4caf50]" },
  { id: 2, Title: "\u0110\u1EC1 Xu\u1EA5t", value: "dexuat", bg: "bg-[#2196f3]" },
  { id: 3, Title: "C\xF4ng vi\u1EC7c", value: "congviec", bg: "bg-[#ff9800]" },
  { id: 4, Title: "Kh\xE1c", value: "khac" }
];
var conver = {
  "channels": [
    {
      "id": 1,
      "name": "abc",
      "description": "K\xEAnh h\u1ED7 tr\u1EE3 chung"
    }
  ],
  "users": [
    {
      "id": 1,
      "username": "testuser",
      "email": "test@example.com"
    },
    {
      "id": 2,
      "username": "support_admin",
      "email": "support@example.com"
    }
  ],
  "tickets": [
    {
      "id": 101,
      "user_id": 1,
      "channel_id": 1,
      "message": "Xin ch\xE0o, t\xF4i g\u1EB7p l\u1ED7i khi \u0111\u0103ng nh\u1EADp v\xE0o h\u1EC7 th\u1ED1ng.",
      "created_at": "2024-02-10T14:00:00Z"
    }
  ],
  "replies": [
    {
      "id": 201,
      "ticket_id": 101,
      "user_id": 2,
      "message": "Ch\xE0o b\u1EA1n, b\u1EA1n c\xF3 th\u1EC3 cung c\u1EA5p \u1EA3nh ch\u1EE5p m\xE0n h\xECnh l\u1ED7i kh\xF4ng?",
      "created_at": "2024-02-10T14:05:00Z"
    },
    {
      "id": 202,
      "ticket_id": 101,
      "user_id": 1,
      "message": "\u0110\xE2y l\xE0 \u1EA3nh l\u1ED7i khi t\xF4i \u0111\u0103ng nh\u1EADp.",
      "created_at": "2024-02-10T14:10:00Z",
      "attachment": {
        "file_name": "login_error.png",
        "file_url": "https://example.com/files/login_error.png"
      }
    },
    {
      "id": 203,
      "ticket_id": 101,
      "user_id": 2,
      "message": "C\u1EA3m \u01A1n b\u1EA1n! B\u1EA1n th\u1EED x\xF3a cache tr\xECnh duy\u1EC7t v\xE0 th\u1EED l\u1EA1i nh\xE9.",
      "created_at": "2024-02-10T14:15:00Z"
    },
    {
      "id": 204,
      "ticket_id": 101,
      "user_id": 1,
      "message": "T\xF4i \u0111\xE3 th\u1EED nh\u01B0ng v\u1EABn g\u1EB7p l\u1ED7i.",
      "created_at": "2024-02-10T14:20:00Z"
    },
    {
      "id": 205,
      "ticket_id": 101,
      "user_id": 2,
      "message": "B\u1EA1n c\xF3 th\u1EC3 th\u1EED tr\xEAn m\u1ED9t tr\xECnh duy\u1EC7t kh\xE1c ho\u1EB7c b\u1EADt ch\u1EBF \u0111\u1ED9 \u1EA9n danh?",
      "created_at": "2024-02-10T14:25:00Z"
    }
  ]
};

// src/app/admin/hotro/listhotro/listhotro.service.ts
var HotrosService = class _HotrosService {
  _StorageService;
  platformId;
  router;
  _authenticated = false;
  APIURL = environment.APIURL;
  isBrowser;
  constructor(_StorageService, platformId, router) {
    this._StorageService = _StorageService;
    this.platformId = platformId;
    this.router = router;
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  ListHotro = signal([]);
  Hotro = signal({});
  CreateHotro(dulieu) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(dulieu)
        };
        const response = yield fetch(`${environment.APIURL}/hotro`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        if (!response.ok) {
        }
        this.ListHotro.update((current) => [...current, data]);
        this.getAllHotro();
        return data;
      } catch (error) {
        return console.error(error);
      }
    });
  }
  getAllHotro() {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this._StorageService.getItem("token")
          }
        };
        const response = yield fetch(`${environment.APIURL}/hotro?page=1&perPage=10`, options);
        if (!response.ok) {
        }
        const data = yield response.json();
        this.ListHotro.set(data.data);
        return data.data;
      } catch (error) {
        return console.error(error);
      }
    });
  }
  SearchHotro(SearchParams) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(SearchParams)
        };
        const response = yield fetch(`${environment.APIURL}/setting/search`, options);
        if (!response.ok) {
          if (response.status === 401) {
            const result = JSON.stringify({ code: response.status, title: "Vui l\xF2ng \u0111\u0103ng nh\u1EADp l\u1EA1i" });
            this.router.navigate(["/errorserver"], { queryParams: { data: result } });
          } else if (response.status === 403) {
            const result = JSON.stringify({ code: response.status, title: "B\u1EA1n kh\xF4ng c\xF3 quy\u1EC1n truy c\u1EADp" });
            this.router.navigate(["/errorserver"], { queryParams: { data: result } });
          } else if (response.status === 500) {
            const result = JSON.stringify({ code: response.status, title: "L\u1ED7i m\xE1y ch\u1EE7, vui l\xF2ng th\u1EED l\u1EA1i sau" });
            this.router.navigate(["/errorserver"], { queryParams: { data: result } });
          } else {
            const result = JSON.stringify({ code: response.status, title: "L\u1ED7i kh\xF4ng x\xE1c \u0111\u1ECBnh" });
            this.router.navigate(["/errorserver"], { queryParams: { data: result } });
          }
        }
        const data = yield response.json();
        this.Hotro.set(data.items);
        return data;
      } catch (error) {
        return console.error(error);
      }
    });
  }
  getHotroByid(id) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        };
        const response = yield fetch(`${environment.APIURL}/hotro/findid/${id}`, options);
        if (!response.ok) {
          if (response.status === 401) {
            const result = JSON.stringify({ code: response.status, title: "Vui l\xF2ng \u0111\u0103ng nh\u1EADp l\u1EA1i" });
            this.router.navigate(["/errorserver"], { queryParams: { data: result } });
          } else if (response.status === 403) {
            const result = JSON.stringify({ code: response.status, title: "B\u1EA1n kh\xF4ng c\xF3 quy\u1EC1n truy c\u1EADp" });
            this.router.navigate(["/errorserver"], { queryParams: { data: result } });
          } else if (response.status === 500) {
            const result = JSON.stringify({ code: response.status, title: "L\u1ED7i m\xE1y ch\u1EE7, vui l\xF2ng th\u1EED l\u1EA1i sau" });
            this.router.navigate(["/errorserver"], { queryParams: { data: result } });
          } else {
            const result = JSON.stringify({ code: response.status, title: "L\u1ED7i kh\xF4ng x\xE1c \u0111\u1ECBnh" });
            this.router.navigate(["/errorserver"], { queryParams: { data: result } });
          }
        }
        const data = yield response.json();
        this.Hotro.set(data);
        return data;
      } catch (error) {
        return console.error(error);
      }
    });
  }
  updateOneHotro(dulieu) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(dulieu)
        };
        const response = yield fetch(`${environment.APIURL}/hotro/${dulieu.id}`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        if (!response.ok) {
        }
        this.getAllHotro();
        return data;
      } catch (error) {
        return console.error(error);
      }
    });
  }
  DeleteHotro(item) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        };
        const response = yield fetch(`${environment.APIURL}/hotro/${item.id}`, options);
        if (!response.ok) {
          if (response.status === 401) {
            const result = JSON.stringify({ code: response.status, title: "Vui l\xF2ng \u0111\u0103ng nh\u1EADp l\u1EA1i" });
            this.router.navigate(["/errorserver"], { queryParams: { data: result } });
          } else if (response.status === 403) {
            const result = JSON.stringify({ code: response.status, title: "B\u1EA1n kh\xF4ng c\xF3 quy\u1EC1n truy c\u1EADp" });
            this.router.navigate(["/errorserver"], { queryParams: { data: result } });
          } else if (response.status === 500) {
            const result = JSON.stringify({ code: response.status, title: "L\u1ED7i m\xE1y ch\u1EE7, vui l\xF2ng th\u1EED l\u1EA1i sau" });
            this.router.navigate(["/errorserver"], { queryParams: { data: result } });
          } else {
            const result = JSON.stringify({ code: response.status, title: "L\u1ED7i kh\xF4ng x\xE1c \u0111\u1ECBnh" });
            this.router.navigate(["/errorserver"], { queryParams: { data: result } });
          }
        }
        this.getAllHotro();
        return yield response.json();
      } catch (error) {
        return console.error(error);
      }
    });
  }
  static \u0275fac = function HotrosService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HotrosService)(\u0275\u0275inject(StorageService), \u0275\u0275inject(PLATFORM_ID), \u0275\u0275inject(Router));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _HotrosService, factory: _HotrosService.\u0275fac, providedIn: "root" });
};

// src/app/admin/hotro/listhotro/listhotro.component.ts
var _c0 = ["drawer"];
var _c1 = (a0) => [a0];
var _c2 = () => ({ standalone: true });
var _forTrack0 = ($index, $item) => $item.id;
function ListHotroComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 8)(1, "mat-form-field", 16)(2, "mat-label");
    \u0275\u0275text(3, "T\xECm Ki\u1EBFm");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 17, 2);
    \u0275\u0275listener("keyup", function ListHotroComponent_div_7_Template_input_keyup_4_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.applyFilter($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "button", 18);
    \u0275\u0275listener("click", function ListHotroComponent_div_7_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.isSearch = !ctx_r1.isSearch);
    });
    \u0275\u0275elementStart(7, "mat-icon");
    \u0275\u0275text(8, "close");
    \u0275\u0275elementEnd()()();
  }
}
function ListHotroComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 19)(1, "button", 20);
    \u0275\u0275listener("click", function ListHotroComponent_div_8_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      const dialogCreateTemplate_r4 = \u0275\u0275reference(18);
      return \u0275\u0275resetView(ctx_r1.openCreateDialog(dialogCreateTemplate_r4));
    });
    \u0275\u0275elementStart(2, "mat-icon");
    \u0275\u0275text(3, "add_circle");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "button", 21);
    \u0275\u0275listener("click", function ListHotroComponent_div_8_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.isSearch = !ctx_r1.isSearch);
    });
    \u0275\u0275elementStart(5, "mat-icon");
    \u0275\u0275text(6, "search");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "button", 22);
    \u0275\u0275listener("click", function ListHotroComponent_div_8_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.writeExcelFile());
    });
    \u0275\u0275elementStart(8, "mat-icon");
    \u0275\u0275text(9, "file_download");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "button", 23);
    \u0275\u0275listener("click", function ListHotroComponent_div_8_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r3);
      const uploadfile_r5 = \u0275\u0275reference(14);
      return \u0275\u0275resetView(uploadfile_r5.click());
    });
    \u0275\u0275elementStart(11, "mat-icon");
    \u0275\u0275text(12, "file_upload");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "input", 24, 3);
    \u0275\u0275listener("change", function ListHotroComponent_div_8_Template_input_change_13_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.readExcelFile($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "button", 25);
    \u0275\u0275listener("click", function ListHotroComponent_div_8_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.LoadDrive());
    });
    \u0275\u0275elementStart(16, "mat-icon");
    \u0275\u0275text(17, "cloud_download");
    \u0275\u0275elementEnd()()();
  }
}
function ListHotroComponent_For_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 26);
    \u0275\u0275listener("click", function ListHotroComponent_For_11_Template_div_click_0_listener() {
      const item_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.FilterType(item_r7));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_13_0;
    let tmp_14_0;
    const item_r7 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classMapInterpolate1("whitespace-nowrap rounded-lg p-1 text-white ", ((tmp_13_0 = ctx_r1.GetNameType(item_r7.value)) == null ? null : tmp_13_0.bg) || "bg-slate-600", "");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", ((tmp_14_0 = ctx_r1.GetNameType(item_r7.value)) == null ? null : tmp_14_0.Title) || "Kh\xF4ng c\xF3 m\xF4 t\u1EA3", " (", ctx_r1.CountListType(item_r7), ") ");
  }
}
function ListHotroComponent_For_14_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 27);
  }
  if (rf & 2) {
    const item_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275propertyInterpolate("src", item_r8 == null ? null : item_r8.Nguoitao == null ? null : item_r8.Nguoitao.avatar == null ? null : item_r8.Nguoitao.avatar.url, \u0275\u0275sanitizeUrl);
  }
}
function ListHotroComponent_For_14_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 28);
    \u0275\u0275text(1, " account_circle");
    \u0275\u0275elementEnd();
  }
}
function ListHotroComponent_For_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 14);
    \u0275\u0275template(1, ListHotroComponent_For_14_Conditional_1_Template, 1, 1, "img", 27)(2, ListHotroComponent_For_14_Conditional_2_Template, 2, 0, "span", 28);
    \u0275\u0275elementStart(3, "div", 29)(4, "div", 30)(5, "div", 31);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 31);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 32);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div")(13, "span");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_18_0;
    let tmp_19_0;
    const item_r8 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("href", \u0275\u0275pureFunction1(13, _c1, "admin/hotro" + item_r8.id), \u0275\u0275sanitizeUrl)("routerLink", item_r8.id);
    \u0275\u0275advance();
    \u0275\u0275conditional((item_r8 == null ? null : item_r8.Nguoitao == null ? null : item_r8.Nguoitao.avatar) ? 1 : 2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate((item_r8 == null ? null : item_r8.Hoten) || "Ch\u01B0a C\xF3 T\xEAn");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(9, 10, item_r8 == null ? null : item_r8.CreateAt, "dd/MM/yyyy"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r8.Title);
    \u0275\u0275advance(2);
    \u0275\u0275classMapInterpolate1("rounded-lg p-1 text-white ", ((tmp_18_0 = ctx_r1.GetNameType(item_r8.Type)) == null ? null : tmp_18_0.bg) || "bg-slate-600", "");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(((tmp_19_0 = ctx_r1.GetNameType(item_r8.Type)) == null ? null : tmp_19_0.Title) || "Kh\xF4ng c\xF3 m\xF4 t\u1EA3");
  }
}
function ListHotroComponent_ForEmpty_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275text(1, "Kh\xF4ng t\xECm th\u1EA5y d\u1EEF li\u1EC7u.");
    \u0275\u0275elementEnd();
  }
}
function ListHotroComponent_ng_template_17_For_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 41);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r10 = ctx.$implicit;
    \u0275\u0275property("value", item_r10.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r10.Title);
  }
}
function ListHotroComponent_ng_template_17_ForEmpty_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275text(1, "Kh\xF4ng t\xECm th\u1EA5y d\u1EEF li\u1EC7u.");
    \u0275\u0275elementEnd();
  }
}
function ListHotroComponent_ng_template_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "h2", 33);
    \u0275\u0275text(1, "T\u1EA1o M\u1EDBi H\u1ED7 Tr\u1EE3");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "mat-dialog-content")(3, "div", 34)(4, "mat-form-field", 16)(5, "mat-label");
    \u0275\u0275text(6, "Ti\xEAu \u0110\u1EC1");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "input", 35);
    \u0275\u0275twoWayListener("ngModelChange", function ListHotroComponent_ng_template_17_Template_input_ngModelChange_7_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.Detail.Title, $event) || (ctx_r1.Detail.Title = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "mat-form-field", 16)(9, "mat-label");
    \u0275\u0275text(10, "Danh M\u1EE5c");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "mat-select", 36);
    \u0275\u0275twoWayListener("ngModelChange", function ListHotroComponent_ng_template_17_Template_mat_select_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.Detail.Type, $event) || (ctx_r1.Detail.Type = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(12, "div", 37)(13, "mat-form-field", 38)(14, "input", 39);
    \u0275\u0275listener("input", function ListHotroComponent_ng_template_17_Template_input_input_14_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.DoFindKhachhang($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 40);
    \u0275\u0275repeaterCreate(16, ListHotroComponent_ng_template_17_For_17_Template, 2, 2, "mat-option", 41, _forTrack0, false, ListHotroComponent_ng_template_17_ForEmpty_18_Template, 2, 0, "div", 15);
    \u0275\u0275elementEnd()()()()()();
    \u0275\u0275elementStart(19, "mat-dialog-actions", 42)(20, "button", 43);
    \u0275\u0275text(21, "\u0110\xF3ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "button", 44);
    \u0275\u0275listener("click", function ListHotroComponent_ng_template_17_Template_button_click_22_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.create());
    });
    \u0275\u0275text(23, "T\u1EA1o");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.Detail.Title);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(5, _c2));
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.Detail.Type);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(6, _c2));
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r1.FilterListType);
  }
}
var ListHotroComponent = class _ListHotroComponent {
  _breakpointObserver;
  _router;
  platformId;
  Detail = { Type: "baoloi" };
  dataSource;
  displayedColumns = [];
  ColumnName = { "STT": "STT" };
  FilterColumns = [];
  Columns = [];
  ListHotro = signal([]);
  InitHotro = [];
  CountItem = 0;
  isFullScreen = false;
  profile = {};
  paginator;
  sort;
  drawer;
  constructor(_breakpointObserver, _router, platformId) {
    this._breakpointObserver = _breakpointObserver;
    this._router = _router;
    this.platformId = platformId;
    if (isPlatformBrowser(this.platformId)) {
      this.FilterColumns = JSON.parse(localStorage.getItem("hotro_FilterColumns") || "[]");
    }
    this._AdminmainComponent.drawer1.close();
    this._AdminmainComponent.drawer.close();
    this._AdminmainComponent.drawer.mode = "over";
  }
  _hotrosService = inject(HotrosService);
  _UserService = inject(UserService);
  _AdminmainComponent = inject(AdminmainComponent);
  _snackBar = inject(MatSnackBar);
  ngOnInit() {
    return __async(this, null, function* () {
      this.profile = yield this._UserService.getProfile();
      yield this._hotrosService.getAllHotro();
      this.ListHotro = this._hotrosService.ListHotro;
      this.InitHotro = this.ListHotro();
      this.initializeColumns();
      this.setupDataSource();
      this.setupDrawer();
    });
  }
  initializeColumns() {
    this.Columns = Object.keys(ListHotro[0]).map((key) => ({
      key,
      value: ListHotro[0][key],
      isShow: true
    }));
    if (this.FilterColumns.length === 0) {
      this.FilterColumns = this.Columns;
    } else {
      localStorage.setItem("hotro_FilterColumns", JSON.stringify(this.FilterColumns));
    }
    this.displayedColumns = this.FilterColumns.filter((v) => v.isShow).map((item) => item.key);
    this.ColumnName = this.FilterColumns.reduce((obj, item) => {
      if (item.isShow)
        obj[item.key] = item.value;
      return obj;
    }, {});
  }
  setupDataSource() {
    this.dataSource = new MatTableDataSource(this.ListHotro().slice(1).map((v) => this.FilterColumns.filter((item) => item.isShow).reduce((obj, item) => {
      obj[item.key] = v[item.key];
      return obj;
    }, {})));
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (this.dataSource.paginator) {
      this.paginator._intl.itemsPerPageLabel = "S\u1ED1 l\u01B0\u1EE3ng 1 trang";
      this.paginator._intl.nextPageLabel = "Ti\u1EBFp Theo";
      this.paginator._intl.previousPageLabel = "V\u1EC1 Tr\u01B0\u1EDBc";
      this.paginator._intl.firstPageLabel = "Trang \u0110\u1EA7u";
      this.paginator._intl.lastPageLabel = "Trang Cu\u1ED1i";
    }
  }
  setupDrawer() {
    this._breakpointObserver.observe([Breakpoints.Handset]).subscribe((result) => {
      if (result.matches) {
        this.drawer.mode = "side";
      } else {
        this.drawer.mode = "side";
      }
    });
  }
  toggleColumn(item) {
    const column = this.FilterColumns.find((v) => v.key === item.key);
    if (column) {
      column.isShow = !column.isShow;
      this.updateDisplayedColumns();
    }
  }
  updateDisplayedColumns() {
    this.displayedColumns = this.FilterColumns.filter((v) => v.isShow).map((item) => item.key);
    this.ColumnName = this.FilterColumns.reduce((obj, item) => {
      if (item.isShow)
        obj[item.key] = item.value;
      return obj;
    }, {});
    this.setupDataSource();
    localStorage.setItem("hotro_FilterColumns", JSON.stringify(this.FilterColumns));
  }
  doFilterColumns(event) {
    const query = event.target.value.toLowerCase();
    this.FilterColumns = this.Columns.filter((v) => v.value.toLowerCase().includes(query));
  }
  applyFilter(event) {
    const filterValue = event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  create() {
    return __async(this, null, function* () {
      if (!this.Detail.Title || this.Detail.Title == "") {
        this._snackBar.open("Vui l\xF2ng nh\u1EADp ti\xEAu \u0111\u1EC1", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-warning"]
        });
      } else {
        this.Detail.idCreate = this.profile.id;
        const newItem = yield this._hotrosService.CreateHotro(this.Detail);
        this.dialogCreateRef.close();
        this.Detail = { Type: "baoloi" };
        this._router.navigate(["admin/hotro", newItem.id]);
      }
    });
  }
  // goToDetail(item: any): void {
  //   this.drawer.open();
  //   this.Detail = item;
  //   this._router.navigate(['admin/hotros', item.id]);
  // }
  dialog = inject(MatDialog);
  dialogCreateRef;
  openCreateDialog(teamplate) {
    this.dialogCreateRef = this.dialog.open(teamplate, {
      hasBackdrop: true,
      disableClose: true
    });
  }
  FilterListType = ListType;
  GetNameType(value) {
    const type = ListType.find((v) => v.value === value);
    return type;
  }
  FilterType(item) {
    this.ListHotro.set(this.InitHotro.filter((v) => v.Type === item.value));
  }
  CountListType(item) {
    return this.InitHotro.filter((v) => v.Type === item.value).length;
  }
  DoFindKhachhang(event) {
    const query = event.target.value.toLowerCase();
    this.FilterListType = ListType.filter((v) => v.Title.toLowerCase().includes(query));
  }
  applyFilterType(event) {
    const filterValue = event.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  isSearch = false;
  writeExcelFile() {
  }
  readExcelFile(event) {
  }
  LoadDrive() {
  }
  static \u0275fac = function ListHotroComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ListHotroComponent)(\u0275\u0275directiveInject(BreakpointObserver), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(PLATFORM_ID));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ListHotroComponent, selectors: [["app-listhotro"]], viewQuery: function ListHotroComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(MatPaginator, 5);
      \u0275\u0275viewQuery(MatSort, 5);
      \u0275\u0275viewQuery(_c0, 7);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.paginator = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.sort = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.drawer = _t.first);
    }
  }, decls: 19, vars: 7, consts: [["drawer", ""], ["dialogCreateTemplate", ""], ["input", ""], ["uploadfile", ""], ["autosize", "", 1, "w-full", "h-full"], [3, "position"], [1, "flex", "flex-col", "space-y-2", "h-screen-16", "w-full", "justify-between"], [1, "relative", "flex", "flex-col", "space-y-2", "w-full", "h-full", "p-2"], [1, "w-full", "flex", "flex-row", "space-x-2", "items-center"], ["class", "w-full flex flex-row space-x-2 items-center", 4, "ngIf"], ["class", "flex flex-row space-x-2 items-center", 4, "ngIf"], [1, "flex", "flex-row", "space-x-2", "items-center", "cursor-pointer"], [3, "class"], [1, "relative", "w-full", "overflow-auto", "cursor-pointer"], ["routerLinkActive", "bg-slate-100", 1, "flex", "flex-row", "space-x-2", "items-center", "hover:bg-slate-100", "rounded-lg", 3, "href", "routerLink"], [1, "p-2", "text-center", "text-red-700", "font-bold"], ["appearance", "outline", "subscriptSizing", "dynamic", 1, "w-full"], ["matInput", "", 1, "!rounded-lg", 3, "keyup"], ["matTooltip", "\u0110\xF3ng", "color", "primary", "mat-icon-button", "", 3, "click"], [1, "flex", "flex-row", "space-x-2", "items-center"], ["matTooltip", "Th\xEAm m\u1EDBi", "color", "primary", "mat-icon-button", "", 3, "click"], ["matTooltip", "T\xECm Ki\u1EBFm", "color", "primary", "mat-icon-button", "", 3, "click"], ["matTooltip", "T\u1EA3i file excel M\u1EABu", "color", "primary", "mat-icon-button", "", 3, "click"], ["matTooltip", "T\u1EA3i l\xEAn file excel", "color", "primary", "mat-icon-button", "", 3, "click"], ["type", "file", 1, "hidden", 3, "change"], ["matTooltip", "T\u1EA3i d\u1EEF li\u1EC7u t\u1EEB drive", "color", "primary", "mat-icon-button", "", 3, "click"], [3, "click"], [1, "w-8", "h-8", "rounded-full", 3, "src"], [1, "text-[48px]", "material-symbols-outlined"], [1, "w-full", "flex", "flex-col", "space-y-1", "p-2"], [1, "w-full", "flex", "flex-row", "items-center", "space-x-2", "justify-between"], [1, "text-xs", "italic"], [1, "font-bold"], ["mat-dialog-title", ""], [1, "lg:min-w-[400px]", "w-full", "h-full", "flex", "flex-col", "space-y-8", "items-center", "p-4"], ["matInput", "", "placeholder", "Vui l\xF2ng Nh\u1EADp Ti\xEAu \u0110\u1EC1", 3, "ngModelChange", "ngModel", "ngModelOptions"], [3, "ngModelChange", "ngModel", "ngModelOptions"], [1, "w-full", "flex", "flex-col"], ["appearance", "outline", "subscriptSizing", "dynamic", 1, "w-full", "p-2"], ["matInput", "", "placeholder", "T\xECm Ki\u1EBFm", 3, "input"], [1, "overflow-y-auto", "max-h-44"], [3, "value"], ["align", "end"], ["mat-flat-button", "", "color", "warn", "mat-dialog-close", "false"], ["mat-flat-button", "", "color", "primary", 3, "click"]], template: function ListHotroComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "mat-drawer-container", 4)(1, "mat-drawer", 5, 0);
      \u0275\u0275element(3, "router-outlet");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 6)(5, "div", 7)(6, "div", 8);
      \u0275\u0275template(7, ListHotroComponent_div_7_Template, 9, 0, "div", 9)(8, ListHotroComponent_div_8_Template, 18, 0, "div", 10);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "div", 11);
      \u0275\u0275repeaterCreate(10, ListHotroComponent_For_11_Template, 2, 5, "div", 12, _forTrack0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "div", 13);
      \u0275\u0275repeaterCreate(13, ListHotroComponent_For_14_Template, 15, 15, "a", 14, \u0275\u0275repeaterTrackByIndex, false, ListHotroComponent_ForEmpty_15_Template, 2, 0, "div", 15);
      \u0275\u0275element(16, "div");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275template(17, ListHotroComponent_ng_template_17_Template, 24, 7, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275classMapInterpolate1("flex flex-col ", ctx.isFullScreen ? "lg:!w-full" : "lg:!w-2/3", " !w-screen h-full");
      \u0275\u0275property("position", "end");
      \u0275\u0275advance(6);
      \u0275\u0275property("ngIf", ctx.isSearch);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isSearch);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.FilterListType);
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.ListHotro());
    }
  }, dependencies: [
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatInputModule,
    MatInput,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatMenuModule,
    MatSidenavModule,
    MatDrawer,
    MatDrawerContainer,
    RouterOutlet,
    MatIconModule,
    MatIcon,
    MatButtonModule,
    MatButton,
    MatIconButton,
    MatSelectModule,
    MatSelect,
    MatOption,
    CommonModule,
    NgIf,
    DatePipe,
    FormsModule,
    DefaultValueAccessor,
    NgControlStatus,
    NgModel,
    RouterLink,
    RouterLinkActive,
    MatDialogModule,
    MatDialogClose,
    MatDialogTitle,
    MatDialogActions,
    MatDialogContent,
    MatTooltipModule,
    MatTooltip
  ], encapsulation: 2, changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ListHotroComponent, { className: "ListHotroComponent", filePath: "src/app/admin/hotro/listhotro/listhotro.component.ts", lineNumber: 50 });
})();

export {
  ListHotro,
  ListType,
  conver,
  HotrosService,
  ListHotroComponent
};
//# sourceMappingURL=chunk-JOSPG73H.mjs.map
