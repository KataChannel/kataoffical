
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 1,
    "redirectTo": "/admin/lienheadmin",
    "route": "/"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-FW25PN46.js"
    ],
    "route": "/404"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-RRMHPXW6.js",
      "chunk-SAYINW7J.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-5FWO5VVL.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-RRMHPXW6.js",
      "chunk-SAYINW7J.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-5FWO5VVL.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/auditlog"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-RRMHPXW6.js",
      "chunk-SAYINW7J.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-5FWO5VVL.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/auditlog/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-RRMHPXW6.js",
      "chunk-SAYINW7J.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-5FWO5VVL.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/dashboard"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-RRMHPXW6.js",
      "chunk-SAYINW7J.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-5FWO5VVL.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/lienheadmin"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-RRMHPXW6.js",
      "chunk-SAYINW7J.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-5FWO5VVL.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/menu"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-RRMHPXW6.js",
      "chunk-SAYINW7J.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-5FWO5VVL.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/menu/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-RRMHPXW6.js",
      "chunk-SAYINW7J.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-5FWO5VVL.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/hotro"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-RRMHPXW6.js",
      "chunk-SAYINW7J.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-5FWO5VVL.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/hotro/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-RRMHPXW6.js",
      "chunk-SAYINW7J.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-5FWO5VVL.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/nhomuser"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-RRMHPXW6.js",
      "chunk-SAYINW7J.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-5FWO5VVL.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/nhomuser/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-RRMHPXW6.js",
      "chunk-SAYINW7J.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-5FWO5VVL.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/permission"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-RRMHPXW6.js",
      "chunk-SAYINW7J.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-5FWO5VVL.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/permission/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-RRMHPXW6.js",
      "chunk-SAYINW7J.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-5FWO5VVL.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/importdata"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-RRMHPXW6.js",
      "chunk-SAYINW7J.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-5FWO5VVL.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/importdata/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-RRMHPXW6.js",
      "chunk-SAYINW7J.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-5FWO5VVL.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/danhmuc"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-RRMHPXW6.js",
      "chunk-SAYINW7J.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-5FWO5VVL.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/danhmuc/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-RRMHPXW6.js",
      "chunk-SAYINW7J.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-5FWO5VVL.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/baiviet"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-RRMHPXW6.js",
      "chunk-SAYINW7J.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-5FWO5VVL.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/baiviet/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-RRMHPXW6.js",
      "chunk-SAYINW7J.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-5FWO5VVL.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/goooglesheets"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-RRMHPXW6.js",
      "chunk-SAYINW7J.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-5FWO5VVL.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/sanpham"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-RRMHPXW6.js",
      "chunk-SAYINW7J.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-5FWO5VVL.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/sanpham/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-RRMHPXW6.js",
      "chunk-SAYINW7J.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-5FWO5VVL.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/banggia"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-RRMHPXW6.js",
      "chunk-SAYINW7J.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-5FWO5VVL.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/banggia/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-RRMHPXW6.js",
      "chunk-SAYINW7J.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-5FWO5VVL.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/khachhang"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-RRMHPXW6.js",
      "chunk-SAYINW7J.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-5FWO5VVL.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/khachhang/dashboard"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-RRMHPXW6.js",
      "chunk-SAYINW7J.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-5FWO5VVL.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/khachhang/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-RRMHPXW6.js",
      "chunk-SAYINW7J.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-5FWO5VVL.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/nhomkhachhang"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-RRMHPXW6.js",
      "chunk-SAYINW7J.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-5FWO5VVL.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/nhomkhachhang/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-RRMHPXW6.js",
      "chunk-SAYINW7J.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-5FWO5VVL.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/nhacungcap"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-RRMHPXW6.js",
      "chunk-SAYINW7J.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-5FWO5VVL.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/nhacungcap/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-RRMHPXW6.js",
      "chunk-SAYINW7J.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-5FWO5VVL.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/dathang"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-RRMHPXW6.js",
      "chunk-SAYINW7J.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-5FWO5VVL.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/dathang/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-RRMHPXW6.js",
      "chunk-SAYINW7J.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-5FWO5VVL.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/nhucaudathang"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-RRMHPXW6.js",
      "chunk-SAYINW7J.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-5FWO5VVL.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/donhang"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-RRMHPXW6.js",
      "chunk-SAYINW7J.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-5FWO5VVL.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/donhang/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-RRMHPXW6.js",
      "chunk-SAYINW7J.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-5FWO5VVL.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/vandon"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-RRMHPXW6.js",
      "chunk-SAYINW7J.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-5FWO5VVL.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/phieuchuyen"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-RRMHPXW6.js",
      "chunk-SAYINW7J.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-5FWO5VVL.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/kho"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-RRMHPXW6.js",
      "chunk-SAYINW7J.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-5FWO5VVL.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/kho/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-RRMHPXW6.js",
      "chunk-SAYINW7J.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-5FWO5VVL.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/phieugiaohang"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-RRMHPXW6.js",
      "chunk-SAYINW7J.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-5FWO5VVL.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/phieugiaohang/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-RRMHPXW6.js",
      "chunk-SAYINW7J.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-5FWO5VVL.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/phieuchiahang"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-RRMHPXW6.js",
      "chunk-SAYINW7J.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-5FWO5VVL.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/phieuchiahang/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-RRMHPXW6.js",
      "chunk-SAYINW7J.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-5FWO5VVL.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/phieukho"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-RRMHPXW6.js",
      "chunk-SAYINW7J.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-5FWO5VVL.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/phieukho/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-RRMHPXW6.js",
      "chunk-SAYINW7J.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-5FWO5VVL.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/xuatnhapton"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-RRMHPXW6.js",
      "chunk-SAYINW7J.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-5FWO5VVL.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/congnokhachhang"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-RRMHPXW6.js",
      "chunk-SAYINW7J.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-5FWO5VVL.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/congnokhachhang/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-RRMHPXW6.js",
      "chunk-SAYINW7J.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-5FWO5VVL.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/userguide"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-RRMHPXW6.js",
      "chunk-SAYINW7J.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-5FWO5VVL.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/userguide/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-RRMHPXW6.js",
      "chunk-SAYINW7J.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-5FWO5VVL.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/congnoncc"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-RRMHPXW6.js",
      "chunk-SAYINW7J.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-5FWO5VVL.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/user"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-RRMHPXW6.js",
      "chunk-SAYINW7J.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-5FWO5VVL.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/user/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-RRMHPXW6.js",
      "chunk-SAYINW7J.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-5FWO5VVL.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/quanlyfile"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-RRMHPXW6.js",
      "chunk-SAYINW7J.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-5FWO5VVL.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/quanlyfile/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-RRMHPXW6.js",
      "chunk-SAYINW7J.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-5FWO5VVL.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/profile"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-RRMHPXW6.js",
      "chunk-SAYINW7J.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-5FWO5VVL.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/profile/socialpage"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-RRMHPXW6.js",
      "chunk-SAYINW7J.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-5FWO5VVL.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "redirectTo": "/admin/account/general",
    "route": "/admin/account"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-RRMHPXW6.js",
      "chunk-SAYINW7J.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-5FWO5VVL.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/account/password"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-RRMHPXW6.js",
      "chunk-SAYINW7J.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-5FWO5VVL.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/account/general"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-CVDX2MDY.js",
      "chunk-LSO2ECJT.js",
      "chunk-OU7W6YZE.js",
      "chunk-GTN5WOSG.js",
      "chunk-ZJKHI5OQ.js",
      "chunk-MZSAWWIW.js",
      "chunk-DRWWD46T.js",
      "chunk-SGXWTGL5.js"
    ],
    "route": "/login"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-YO3WSAZS.js"
    ],
    "route": "/register"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-CPAAUQCC.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/lien-he"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-CPAAUQCC.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/*"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 72816, hash: '38fe06d8179330ba503df8fd4051a227f43e35cb79e6e4497d8cf8cbd4c3265f', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 24107, hash: 'ae42786cc7218eaa37f81675dc1a48e0e117abb08d402515c999aa4c9bedc9f4', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-MEELTE5P.css': {size: 149756, hash: 'FLRECYc0lcM', text: () => import('./assets-chunks/styles-MEELTE5P_css.mjs').then(m => m.default)}
  },
};
