
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
      "chunk-XBE7EDUU.js",
      "chunk-CG335ZWK.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-5FWO5VVL.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-XBE7EDUU.js",
      "chunk-CG335ZWK.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-5FWO5VVL.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/auditlog"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-XBE7EDUU.js",
      "chunk-CG335ZWK.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-5FWO5VVL.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/auditlog/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-XBE7EDUU.js",
      "chunk-CG335ZWK.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-5FWO5VVL.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/dashboard"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-XBE7EDUU.js",
      "chunk-CG335ZWK.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-5FWO5VVL.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/lienheadmin"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-XBE7EDUU.js",
      "chunk-CG335ZWK.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-5FWO5VVL.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/menu"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-XBE7EDUU.js",
      "chunk-CG335ZWK.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-5FWO5VVL.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/menu/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-XBE7EDUU.js",
      "chunk-CG335ZWK.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-5FWO5VVL.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/hotro"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-XBE7EDUU.js",
      "chunk-CG335ZWK.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-5FWO5VVL.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/hotro/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-XBE7EDUU.js",
      "chunk-CG335ZWK.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-5FWO5VVL.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/nhomuser"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-XBE7EDUU.js",
      "chunk-CG335ZWK.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-5FWO5VVL.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/nhomuser/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-XBE7EDUU.js",
      "chunk-CG335ZWK.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-5FWO5VVL.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/permission"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-XBE7EDUU.js",
      "chunk-CG335ZWK.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-5FWO5VVL.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/permission/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-XBE7EDUU.js",
      "chunk-CG335ZWK.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-5FWO5VVL.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/importdata"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-XBE7EDUU.js",
      "chunk-CG335ZWK.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-5FWO5VVL.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/importdata/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-XBE7EDUU.js",
      "chunk-CG335ZWK.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-5FWO5VVL.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/danhmuc"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-XBE7EDUU.js",
      "chunk-CG335ZWK.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-5FWO5VVL.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/danhmuc/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-XBE7EDUU.js",
      "chunk-CG335ZWK.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-5FWO5VVL.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/baiviet"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-XBE7EDUU.js",
      "chunk-CG335ZWK.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-5FWO5VVL.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/baiviet/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-XBE7EDUU.js",
      "chunk-CG335ZWK.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-5FWO5VVL.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/goooglesheets"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-XBE7EDUU.js",
      "chunk-CG335ZWK.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-5FWO5VVL.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/sanpham"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-XBE7EDUU.js",
      "chunk-CG335ZWK.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-5FWO5VVL.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/sanpham/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-XBE7EDUU.js",
      "chunk-CG335ZWK.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-5FWO5VVL.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/banggia"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-XBE7EDUU.js",
      "chunk-CG335ZWK.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-5FWO5VVL.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/banggia/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-XBE7EDUU.js",
      "chunk-CG335ZWK.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-5FWO5VVL.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/khachhang"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-XBE7EDUU.js",
      "chunk-CG335ZWK.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-5FWO5VVL.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/khachhang/dashboard"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-XBE7EDUU.js",
      "chunk-CG335ZWK.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-5FWO5VVL.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/khachhang/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-XBE7EDUU.js",
      "chunk-CG335ZWK.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-5FWO5VVL.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/nhomkhachhang"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-XBE7EDUU.js",
      "chunk-CG335ZWK.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-5FWO5VVL.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/nhomkhachhang/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-XBE7EDUU.js",
      "chunk-CG335ZWK.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-5FWO5VVL.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/nhacungcap"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-XBE7EDUU.js",
      "chunk-CG335ZWK.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-5FWO5VVL.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/nhacungcap/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-XBE7EDUU.js",
      "chunk-CG335ZWK.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-5FWO5VVL.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/dathang"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-XBE7EDUU.js",
      "chunk-CG335ZWK.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-5FWO5VVL.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/dathang/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-XBE7EDUU.js",
      "chunk-CG335ZWK.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-5FWO5VVL.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/nhucaudathang"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-XBE7EDUU.js",
      "chunk-CG335ZWK.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-5FWO5VVL.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/donhang"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-XBE7EDUU.js",
      "chunk-CG335ZWK.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-5FWO5VVL.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/donhang/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-XBE7EDUU.js",
      "chunk-CG335ZWK.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-5FWO5VVL.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/vandon"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-XBE7EDUU.js",
      "chunk-CG335ZWK.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-5FWO5VVL.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/phieuchuyen"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-XBE7EDUU.js",
      "chunk-CG335ZWK.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-5FWO5VVL.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/kho"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-XBE7EDUU.js",
      "chunk-CG335ZWK.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-5FWO5VVL.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/kho/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-XBE7EDUU.js",
      "chunk-CG335ZWK.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-5FWO5VVL.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/phieugiaohang"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-XBE7EDUU.js",
      "chunk-CG335ZWK.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-5FWO5VVL.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/phieugiaohang/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-XBE7EDUU.js",
      "chunk-CG335ZWK.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-5FWO5VVL.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/phieuchiahang"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-XBE7EDUU.js",
      "chunk-CG335ZWK.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-5FWO5VVL.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/phieuchiahang/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-XBE7EDUU.js",
      "chunk-CG335ZWK.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-5FWO5VVL.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/phieukho"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-XBE7EDUU.js",
      "chunk-CG335ZWK.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-5FWO5VVL.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/phieukho/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-XBE7EDUU.js",
      "chunk-CG335ZWK.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-5FWO5VVL.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/xuatnhapton"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-XBE7EDUU.js",
      "chunk-CG335ZWK.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-5FWO5VVL.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/congnokhachhang"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-XBE7EDUU.js",
      "chunk-CG335ZWK.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-5FWO5VVL.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/congnokhachhang/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-XBE7EDUU.js",
      "chunk-CG335ZWK.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-5FWO5VVL.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/userguide"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-XBE7EDUU.js",
      "chunk-CG335ZWK.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-5FWO5VVL.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/userguide/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-XBE7EDUU.js",
      "chunk-CG335ZWK.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-5FWO5VVL.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/congnoncc"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-XBE7EDUU.js",
      "chunk-CG335ZWK.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-5FWO5VVL.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/user"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-XBE7EDUU.js",
      "chunk-CG335ZWK.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-5FWO5VVL.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/user/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-XBE7EDUU.js",
      "chunk-CG335ZWK.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-5FWO5VVL.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/quanlyfile"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-XBE7EDUU.js",
      "chunk-CG335ZWK.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-5FWO5VVL.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/quanlyfile/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-XBE7EDUU.js",
      "chunk-CG335ZWK.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-5FWO5VVL.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/profile"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-XBE7EDUU.js",
      "chunk-CG335ZWK.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-5FWO5VVL.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/profile/socialpage"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-XBE7EDUU.js",
      "chunk-CG335ZWK.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-5FWO5VVL.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
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
      "chunk-XBE7EDUU.js",
      "chunk-CG335ZWK.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-5FWO5VVL.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/account/password"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-XBE7EDUU.js",
      "chunk-CG335ZWK.js",
      "chunk-EZMPX6VN.js",
      "chunk-U3F6N5GW.js",
      "chunk-5FWO5VVL.js",
      "chunk-7VE7GFYV.js",
      "chunk-CUQ6QKAF.js",
      "chunk-3F7BKIWY.js",
      "chunk-ZW44ZSN2.js",
      "chunk-ZDGAGPNI.js"
    ],
    "route": "/admin/account/general"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-6GPXSID4.js",
      "chunk-LSO2ECJT.js",
      "chunk-GTN5WOSG.js",
      "chunk-OU7W6YZE.js",
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
    'index.csr.html': {size: 72816, hash: '7a1b61f5b4a9ee0ff6eac2b990c7a26c98ca5a7d551d16b5e7b4fb114aedd033', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 24107, hash: '87834bebe98dd39878623b9477ad101a82ccd783aabfd134e1b22a5d64da5485', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-4UA7OZ5T.css': {size: 147618, hash: 'XC8nnKuW9Og', text: () => import('./assets-chunks/styles-4UA7OZ5T_css.mjs').then(m => m.default)}
  },
};
