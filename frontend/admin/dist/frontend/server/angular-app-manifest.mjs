
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 1,
    "redirectTo": "/admin/profile",
    "route": "/"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-O7TWKQJW.js"
    ],
    "route": "/404"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-JXGWXLF7.js",
      "chunk-4ZVT7MXR.js",
      "chunk-YDA6A3ZD.js",
      "chunk-GBWCB5PQ.js",
      "chunk-3EJWRICK.js",
      "chunk-MS4AQ6UA.js",
      "chunk-A7Z2CSQH.js",
      "chunk-MYSS4JYL.js",
      "chunk-J3C5VRUD.js",
      "chunk-HM2P4Q2W.js"
    ],
    "route": "/admin"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-JXGWXLF7.js",
      "chunk-4ZVT7MXR.js",
      "chunk-YDA6A3ZD.js",
      "chunk-GBWCB5PQ.js",
      "chunk-3EJWRICK.js",
      "chunk-MS4AQ6UA.js",
      "chunk-A7Z2CSQH.js",
      "chunk-MYSS4JYL.js",
      "chunk-J3C5VRUD.js",
      "chunk-HM2P4Q2W.js"
    ],
    "route": "/admin/welcome"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-JXGWXLF7.js",
      "chunk-4ZVT7MXR.js",
      "chunk-YDA6A3ZD.js",
      "chunk-GBWCB5PQ.js",
      "chunk-3EJWRICK.js",
      "chunk-MS4AQ6UA.js",
      "chunk-A7Z2CSQH.js",
      "chunk-MYSS4JYL.js",
      "chunk-J3C5VRUD.js",
      "chunk-HM2P4Q2W.js"
    ],
    "route": "/admin/dashboard"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-JXGWXLF7.js",
      "chunk-4ZVT7MXR.js",
      "chunk-YDA6A3ZD.js",
      "chunk-GBWCB5PQ.js",
      "chunk-3EJWRICK.js",
      "chunk-MS4AQ6UA.js",
      "chunk-A7Z2CSQH.js",
      "chunk-MYSS4JYL.js",
      "chunk-J3C5VRUD.js",
      "chunk-HM2P4Q2W.js"
    ],
    "route": "/admin/menu"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-JXGWXLF7.js",
      "chunk-4ZVT7MXR.js",
      "chunk-YDA6A3ZD.js",
      "chunk-GBWCB5PQ.js",
      "chunk-3EJWRICK.js",
      "chunk-MS4AQ6UA.js",
      "chunk-A7Z2CSQH.js",
      "chunk-MYSS4JYL.js",
      "chunk-J3C5VRUD.js",
      "chunk-HM2P4Q2W.js"
    ],
    "route": "/admin/menu/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-JXGWXLF7.js",
      "chunk-4ZVT7MXR.js",
      "chunk-YDA6A3ZD.js",
      "chunk-GBWCB5PQ.js",
      "chunk-3EJWRICK.js",
      "chunk-MS4AQ6UA.js",
      "chunk-A7Z2CSQH.js",
      "chunk-MYSS4JYL.js",
      "chunk-J3C5VRUD.js",
      "chunk-HM2P4Q2W.js"
    ],
    "route": "/admin/quanlyqrcode"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-JXGWXLF7.js",
      "chunk-4ZVT7MXR.js",
      "chunk-YDA6A3ZD.js",
      "chunk-GBWCB5PQ.js",
      "chunk-3EJWRICK.js",
      "chunk-MS4AQ6UA.js",
      "chunk-A7Z2CSQH.js",
      "chunk-MYSS4JYL.js",
      "chunk-J3C5VRUD.js",
      "chunk-HM2P4Q2W.js"
    ],
    "route": "/admin/quanlyqrcode/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-JXGWXLF7.js",
      "chunk-4ZVT7MXR.js",
      "chunk-YDA6A3ZD.js",
      "chunk-GBWCB5PQ.js",
      "chunk-3EJWRICK.js",
      "chunk-MS4AQ6UA.js",
      "chunk-A7Z2CSQH.js",
      "chunk-MYSS4JYL.js",
      "chunk-J3C5VRUD.js",
      "chunk-HM2P4Q2W.js"
    ],
    "route": "/admin/quanlydrive"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-JXGWXLF7.js",
      "chunk-4ZVT7MXR.js",
      "chunk-YDA6A3ZD.js",
      "chunk-GBWCB5PQ.js",
      "chunk-3EJWRICK.js",
      "chunk-MS4AQ6UA.js",
      "chunk-A7Z2CSQH.js",
      "chunk-MYSS4JYL.js",
      "chunk-J3C5VRUD.js",
      "chunk-HM2P4Q2W.js"
    ],
    "route": "/admin/quanlydrive/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-JXGWXLF7.js",
      "chunk-4ZVT7MXR.js",
      "chunk-YDA6A3ZD.js",
      "chunk-GBWCB5PQ.js",
      "chunk-3EJWRICK.js",
      "chunk-MS4AQ6UA.js",
      "chunk-A7Z2CSQH.js",
      "chunk-MYSS4JYL.js",
      "chunk-J3C5VRUD.js",
      "chunk-HM2P4Q2W.js"
    ],
    "route": "/admin/drivelocal"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-JXGWXLF7.js",
      "chunk-4ZVT7MXR.js",
      "chunk-YDA6A3ZD.js",
      "chunk-GBWCB5PQ.js",
      "chunk-3EJWRICK.js",
      "chunk-MS4AQ6UA.js",
      "chunk-A7Z2CSQH.js",
      "chunk-MYSS4JYL.js",
      "chunk-J3C5VRUD.js",
      "chunk-HM2P4Q2W.js"
    ],
    "route": "/admin/drivelocal/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-JXGWXLF7.js",
      "chunk-4ZVT7MXR.js",
      "chunk-YDA6A3ZD.js",
      "chunk-GBWCB5PQ.js",
      "chunk-3EJWRICK.js",
      "chunk-MS4AQ6UA.js",
      "chunk-A7Z2CSQH.js",
      "chunk-MYSS4JYL.js",
      "chunk-J3C5VRUD.js",
      "chunk-HM2P4Q2W.js"
    ],
    "route": "/admin/googlesheet"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-JXGWXLF7.js",
      "chunk-4ZVT7MXR.js",
      "chunk-YDA6A3ZD.js",
      "chunk-GBWCB5PQ.js",
      "chunk-3EJWRICK.js",
      "chunk-MS4AQ6UA.js",
      "chunk-A7Z2CSQH.js",
      "chunk-MYSS4JYL.js",
      "chunk-J3C5VRUD.js",
      "chunk-HM2P4Q2W.js"
    ],
    "route": "/admin/googlesheet/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-JXGWXLF7.js",
      "chunk-4ZVT7MXR.js",
      "chunk-YDA6A3ZD.js",
      "chunk-GBWCB5PQ.js",
      "chunk-3EJWRICK.js",
      "chunk-MS4AQ6UA.js",
      "chunk-A7Z2CSQH.js",
      "chunk-MYSS4JYL.js",
      "chunk-J3C5VRUD.js",
      "chunk-HM2P4Q2W.js"
    ],
    "route": "/admin/landingpage"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-JXGWXLF7.js",
      "chunk-4ZVT7MXR.js",
      "chunk-YDA6A3ZD.js",
      "chunk-GBWCB5PQ.js",
      "chunk-3EJWRICK.js",
      "chunk-MS4AQ6UA.js",
      "chunk-A7Z2CSQH.js",
      "chunk-MYSS4JYL.js",
      "chunk-J3C5VRUD.js",
      "chunk-HM2P4Q2W.js"
    ],
    "route": "/admin/landingpage/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-JXGWXLF7.js",
      "chunk-4ZVT7MXR.js",
      "chunk-YDA6A3ZD.js",
      "chunk-GBWCB5PQ.js",
      "chunk-3EJWRICK.js",
      "chunk-MS4AQ6UA.js",
      "chunk-A7Z2CSQH.js",
      "chunk-MYSS4JYL.js",
      "chunk-J3C5VRUD.js",
      "chunk-HM2P4Q2W.js"
    ],
    "route": "/admin/hotro"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-JXGWXLF7.js",
      "chunk-4ZVT7MXR.js",
      "chunk-YDA6A3ZD.js",
      "chunk-GBWCB5PQ.js",
      "chunk-3EJWRICK.js",
      "chunk-MS4AQ6UA.js",
      "chunk-A7Z2CSQH.js",
      "chunk-MYSS4JYL.js",
      "chunk-J3C5VRUD.js",
      "chunk-HM2P4Q2W.js"
    ],
    "route": "/admin/hotro/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-JXGWXLF7.js",
      "chunk-4ZVT7MXR.js",
      "chunk-YDA6A3ZD.js",
      "chunk-GBWCB5PQ.js",
      "chunk-3EJWRICK.js",
      "chunk-MS4AQ6UA.js",
      "chunk-A7Z2CSQH.js",
      "chunk-MYSS4JYL.js",
      "chunk-J3C5VRUD.js",
      "chunk-HM2P4Q2W.js"
    ],
    "route": "/admin/nhomuser"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-JXGWXLF7.js",
      "chunk-4ZVT7MXR.js",
      "chunk-YDA6A3ZD.js",
      "chunk-GBWCB5PQ.js",
      "chunk-3EJWRICK.js",
      "chunk-MS4AQ6UA.js",
      "chunk-A7Z2CSQH.js",
      "chunk-MYSS4JYL.js",
      "chunk-J3C5VRUD.js",
      "chunk-HM2P4Q2W.js"
    ],
    "route": "/admin/nhomuser/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-JXGWXLF7.js",
      "chunk-4ZVT7MXR.js",
      "chunk-YDA6A3ZD.js",
      "chunk-GBWCB5PQ.js",
      "chunk-3EJWRICK.js",
      "chunk-MS4AQ6UA.js",
      "chunk-A7Z2CSQH.js",
      "chunk-MYSS4JYL.js",
      "chunk-J3C5VRUD.js",
      "chunk-HM2P4Q2W.js"
    ],
    "route": "/admin/permission"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-JXGWXLF7.js",
      "chunk-4ZVT7MXR.js",
      "chunk-YDA6A3ZD.js",
      "chunk-GBWCB5PQ.js",
      "chunk-3EJWRICK.js",
      "chunk-MS4AQ6UA.js",
      "chunk-A7Z2CSQH.js",
      "chunk-MYSS4JYL.js",
      "chunk-J3C5VRUD.js",
      "chunk-HM2P4Q2W.js"
    ],
    "route": "/admin/permission/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-JXGWXLF7.js",
      "chunk-4ZVT7MXR.js",
      "chunk-YDA6A3ZD.js",
      "chunk-GBWCB5PQ.js",
      "chunk-3EJWRICK.js",
      "chunk-MS4AQ6UA.js",
      "chunk-A7Z2CSQH.js",
      "chunk-MYSS4JYL.js",
      "chunk-J3C5VRUD.js",
      "chunk-HM2P4Q2W.js"
    ],
    "route": "/admin/goooglesheets"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-JXGWXLF7.js",
      "chunk-4ZVT7MXR.js",
      "chunk-YDA6A3ZD.js",
      "chunk-GBWCB5PQ.js",
      "chunk-3EJWRICK.js",
      "chunk-MS4AQ6UA.js",
      "chunk-A7Z2CSQH.js",
      "chunk-MYSS4JYL.js",
      "chunk-J3C5VRUD.js",
      "chunk-HM2P4Q2W.js"
    ],
    "route": "/admin/khachhang"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-JXGWXLF7.js",
      "chunk-4ZVT7MXR.js",
      "chunk-YDA6A3ZD.js",
      "chunk-GBWCB5PQ.js",
      "chunk-3EJWRICK.js",
      "chunk-MS4AQ6UA.js",
      "chunk-A7Z2CSQH.js",
      "chunk-MYSS4JYL.js",
      "chunk-J3C5VRUD.js",
      "chunk-HM2P4Q2W.js"
    ],
    "route": "/admin/khachhang/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-JXGWXLF7.js",
      "chunk-4ZVT7MXR.js",
      "chunk-YDA6A3ZD.js",
      "chunk-GBWCB5PQ.js",
      "chunk-3EJWRICK.js",
      "chunk-MS4AQ6UA.js",
      "chunk-A7Z2CSQH.js",
      "chunk-MYSS4JYL.js",
      "chunk-J3C5VRUD.js",
      "chunk-HM2P4Q2W.js"
    ],
    "route": "/admin/nhomkhachhang"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-JXGWXLF7.js",
      "chunk-4ZVT7MXR.js",
      "chunk-YDA6A3ZD.js",
      "chunk-GBWCB5PQ.js",
      "chunk-3EJWRICK.js",
      "chunk-MS4AQ6UA.js",
      "chunk-A7Z2CSQH.js",
      "chunk-MYSS4JYL.js",
      "chunk-J3C5VRUD.js",
      "chunk-HM2P4Q2W.js"
    ],
    "route": "/admin/nhomkhachhang/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-JXGWXLF7.js",
      "chunk-4ZVT7MXR.js",
      "chunk-YDA6A3ZD.js",
      "chunk-GBWCB5PQ.js",
      "chunk-3EJWRICK.js",
      "chunk-MS4AQ6UA.js",
      "chunk-A7Z2CSQH.js",
      "chunk-MYSS4JYL.js",
      "chunk-J3C5VRUD.js",
      "chunk-HM2P4Q2W.js"
    ],
    "route": "/admin/user"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-JXGWXLF7.js",
      "chunk-4ZVT7MXR.js",
      "chunk-YDA6A3ZD.js",
      "chunk-GBWCB5PQ.js",
      "chunk-3EJWRICK.js",
      "chunk-MS4AQ6UA.js",
      "chunk-A7Z2CSQH.js",
      "chunk-MYSS4JYL.js",
      "chunk-J3C5VRUD.js",
      "chunk-HM2P4Q2W.js"
    ],
    "route": "/admin/user/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-JXGWXLF7.js",
      "chunk-4ZVT7MXR.js",
      "chunk-YDA6A3ZD.js",
      "chunk-GBWCB5PQ.js",
      "chunk-3EJWRICK.js",
      "chunk-MS4AQ6UA.js",
      "chunk-A7Z2CSQH.js",
      "chunk-MYSS4JYL.js",
      "chunk-J3C5VRUD.js",
      "chunk-HM2P4Q2W.js"
    ],
    "route": "/admin/quanlyfile"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-JXGWXLF7.js",
      "chunk-4ZVT7MXR.js",
      "chunk-YDA6A3ZD.js",
      "chunk-GBWCB5PQ.js",
      "chunk-3EJWRICK.js",
      "chunk-MS4AQ6UA.js",
      "chunk-A7Z2CSQH.js",
      "chunk-MYSS4JYL.js",
      "chunk-J3C5VRUD.js",
      "chunk-HM2P4Q2W.js"
    ],
    "route": "/admin/quanlyfile/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-JXGWXLF7.js",
      "chunk-4ZVT7MXR.js",
      "chunk-YDA6A3ZD.js",
      "chunk-GBWCB5PQ.js",
      "chunk-3EJWRICK.js",
      "chunk-MS4AQ6UA.js",
      "chunk-A7Z2CSQH.js",
      "chunk-MYSS4JYL.js",
      "chunk-J3C5VRUD.js",
      "chunk-HM2P4Q2W.js"
    ],
    "redirectTo": "/admin/profile/newsfeed",
    "route": "/admin/profile"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-JXGWXLF7.js",
      "chunk-4ZVT7MXR.js",
      "chunk-YDA6A3ZD.js",
      "chunk-GBWCB5PQ.js",
      "chunk-3EJWRICK.js",
      "chunk-MS4AQ6UA.js",
      "chunk-A7Z2CSQH.js",
      "chunk-MYSS4JYL.js",
      "chunk-J3C5VRUD.js",
      "chunk-HM2P4Q2W.js"
    ],
    "route": "/admin/profile/newsfeed"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-JXGWXLF7.js",
      "chunk-4ZVT7MXR.js",
      "chunk-YDA6A3ZD.js",
      "chunk-GBWCB5PQ.js",
      "chunk-3EJWRICK.js",
      "chunk-MS4AQ6UA.js",
      "chunk-A7Z2CSQH.js",
      "chunk-MYSS4JYL.js",
      "chunk-J3C5VRUD.js",
      "chunk-HM2P4Q2W.js"
    ],
    "route": "/admin/profile/socialpage"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-JXGWXLF7.js",
      "chunk-4ZVT7MXR.js",
      "chunk-YDA6A3ZD.js",
      "chunk-GBWCB5PQ.js",
      "chunk-3EJWRICK.js",
      "chunk-MS4AQ6UA.js",
      "chunk-A7Z2CSQH.js",
      "chunk-MYSS4JYL.js",
      "chunk-J3C5VRUD.js",
      "chunk-HM2P4Q2W.js"
    ],
    "route": "/admin/profile/activity"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-JXGWXLF7.js",
      "chunk-4ZVT7MXR.js",
      "chunk-YDA6A3ZD.js",
      "chunk-GBWCB5PQ.js",
      "chunk-3EJWRICK.js",
      "chunk-MS4AQ6UA.js",
      "chunk-A7Z2CSQH.js",
      "chunk-MYSS4JYL.js",
      "chunk-J3C5VRUD.js",
      "chunk-HM2P4Q2W.js"
    ],
    "route": "/admin/profile/gallery"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-JXGWXLF7.js",
      "chunk-4ZVT7MXR.js",
      "chunk-YDA6A3ZD.js",
      "chunk-GBWCB5PQ.js",
      "chunk-3EJWRICK.js",
      "chunk-MS4AQ6UA.js",
      "chunk-A7Z2CSQH.js",
      "chunk-MYSS4JYL.js",
      "chunk-J3C5VRUD.js",
      "chunk-HM2P4Q2W.js"
    ],
    "route": "/admin/dexuat"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-JXGWXLF7.js",
      "chunk-4ZVT7MXR.js",
      "chunk-YDA6A3ZD.js",
      "chunk-GBWCB5PQ.js",
      "chunk-3EJWRICK.js",
      "chunk-MS4AQ6UA.js",
      "chunk-A7Z2CSQH.js",
      "chunk-MYSS4JYL.js",
      "chunk-J3C5VRUD.js",
      "chunk-HM2P4Q2W.js"
    ],
    "route": "/admin/dexuat/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-JXGWXLF7.js",
      "chunk-4ZVT7MXR.js",
      "chunk-YDA6A3ZD.js",
      "chunk-GBWCB5PQ.js",
      "chunk-3EJWRICK.js",
      "chunk-MS4AQ6UA.js",
      "chunk-A7Z2CSQH.js",
      "chunk-MYSS4JYL.js",
      "chunk-J3C5VRUD.js",
      "chunk-HM2P4Q2W.js"
    ],
    "redirectTo": "/admin/account/general",
    "route": "/admin/account"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-JXGWXLF7.js",
      "chunk-4ZVT7MXR.js",
      "chunk-YDA6A3ZD.js",
      "chunk-GBWCB5PQ.js",
      "chunk-3EJWRICK.js",
      "chunk-MS4AQ6UA.js",
      "chunk-A7Z2CSQH.js",
      "chunk-MYSS4JYL.js",
      "chunk-J3C5VRUD.js",
      "chunk-HM2P4Q2W.js"
    ],
    "route": "/admin/account/password"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-JXGWXLF7.js",
      "chunk-4ZVT7MXR.js",
      "chunk-YDA6A3ZD.js",
      "chunk-GBWCB5PQ.js",
      "chunk-3EJWRICK.js",
      "chunk-MS4AQ6UA.js",
      "chunk-A7Z2CSQH.js",
      "chunk-MYSS4JYL.js",
      "chunk-J3C5VRUD.js",
      "chunk-HM2P4Q2W.js"
    ],
    "route": "/admin/account/general"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-JXGWXLF7.js",
      "chunk-4ZVT7MXR.js",
      "chunk-YDA6A3ZD.js",
      "chunk-GBWCB5PQ.js",
      "chunk-3EJWRICK.js",
      "chunk-MS4AQ6UA.js",
      "chunk-A7Z2CSQH.js",
      "chunk-MYSS4JYL.js",
      "chunk-J3C5VRUD.js",
      "chunk-HM2P4Q2W.js"
    ],
    "route": "/admin/account/notifications"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-JXGWXLF7.js",
      "chunk-4ZVT7MXR.js",
      "chunk-YDA6A3ZD.js",
      "chunk-GBWCB5PQ.js",
      "chunk-3EJWRICK.js",
      "chunk-MS4AQ6UA.js",
      "chunk-A7Z2CSQH.js",
      "chunk-MYSS4JYL.js",
      "chunk-J3C5VRUD.js",
      "chunk-HM2P4Q2W.js"
    ],
    "route": "/admin/account/billing"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-JXGWXLF7.js",
      "chunk-4ZVT7MXR.js",
      "chunk-YDA6A3ZD.js",
      "chunk-GBWCB5PQ.js",
      "chunk-3EJWRICK.js",
      "chunk-MS4AQ6UA.js",
      "chunk-A7Z2CSQH.js",
      "chunk-MYSS4JYL.js",
      "chunk-J3C5VRUD.js",
      "chunk-HM2P4Q2W.js"
    ],
    "route": "/admin/account/security"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-5OJT4JHU.js",
      "chunk-TUB2D2WT.js",
      "chunk-ISQJ54WM.js",
      "chunk-PKTJEQ3B.js",
      "chunk-KUSWFJMN.js",
      "chunk-J6BPCWMF.js",
      "chunk-VG4K7YZ2.js",
      "chunk-T3JISVU3.js"
    ],
    "route": "/login"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-OZX3MY2E.js"
    ],
    "route": "/register"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-5FVGYTBI.js",
      "chunk-MYSS4JYL.js",
      "chunk-54PG2AAV.js"
    ],
    "route": "/lien-he"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-5FVGYTBI.js",
      "chunk-MYSS4JYL.js",
      "chunk-54PG2AAV.js"
    ],
    "route": "/*"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 72766, hash: 'c6c15ce0e78e408c36eb1d8983c7e763ceef12eeb70fa4d06dda35aa12d374e3', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 24057, hash: '20e52f34b93c95ce0d154f11363d1dfffa831ffc994545a587780323cfa8dd7c', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-EJYDEVIY.css': {size: 140565, hash: 'uhfQObhFrag', text: () => import('./assets-chunks/styles-EJYDEVIY_css.mjs').then(m => m.default)}
  },
};
