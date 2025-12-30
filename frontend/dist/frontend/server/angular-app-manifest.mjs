
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
      "chunk-GSC4GXCZ.js"
    ],
    "route": "/404"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/bulk-price-update"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/price-alerts"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/price-analytics"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/price-comparison"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/auditlog"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/auditlog/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/performance"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/dashboard"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/dashboard/baocaodoanhthu"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/thongke"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/thongke/khoiluong-khachhang"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/testing"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/lienheadmin"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/menu"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/menu/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/hotro"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/hotro/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/support"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/support/new"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/support/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/nhomuser"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/nhomuser/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/permission"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/permission/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/user-permission"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "redirectTo": "/admin/phongban/list",
    "route": "/admin/phongban"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/phongban/list"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/phongban/create"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/phongban/edit/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/phongban/detail/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "redirectTo": "/admin/nhanvien/list",
    "route": "/admin/nhanvien"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/nhanvien/list"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/nhanvien/create"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/nhanvien/edit/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/nhanvien/detail/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/importdata"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/importdata/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/danhmuc"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/danhmuc/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/baiviet"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/baiviet/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/goooglesheets"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/sanpham"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/sanpham/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/banggia"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/banggia/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/khachhang"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/khachhang/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/nhomkhachhang"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/nhomkhachhang/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/nhacungcap"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/nhacungcap/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/nhomncc"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/nhomncc/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/dathang"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/dathang/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/nhucaudathang"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/donhang"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/donhang/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/vandon"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/phieuthuchi"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/phieuthuchi/detail/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/thanhtoan"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/hoadon"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/cashflow"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/cron-management"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/phieuchuyen"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/kho"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/kho/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/phieugiaohang"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/phieugiaohang/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/phieuchiahang"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/phieuchiahang/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/phieukho"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/phieukho/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/xuatnhapton"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/chotkho"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/chotkho/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/congnokhachhang"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/congnokhachhang/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/userguide"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/userguide/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/congnoncc"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/congnoncc/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/user"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/user/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/quanlyfile"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/quanlyfile/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/profile"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/profile/socialpage"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "redirectTo": "/admin/account/general",
    "route": "/admin/account"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/account/password"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-J4VLW5ZY.js",
      "chunk-PG7YPV2R.js",
      "chunk-X6FAC3TC.js",
      "chunk-KRNJE5C7.js",
      "chunk-6EGVKZMR.js",
      "chunk-XOT4T2UU.js",
      "chunk-ZW44ZSN2.js",
      "chunk-GVDV5XYY.js",
      "chunk-V7AISDFT.js",
      "chunk-K7VAKZGX.js"
    ],
    "route": "/admin/account/general"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-5POL74T6.js",
      "chunk-HL53KBER.js",
      "chunk-KJWF7BNL.js",
      "chunk-ZYJCKYRU.js",
      "chunk-T35FXQFH.js",
      "chunk-6TVH3LYP.js",
      "chunk-U6KZWLBK.js",
      "chunk-YFWDM5WG.js",
      "chunk-BQUVTB3R.js",
      "chunk-VHP6CZNW.js"
    ],
    "route": "/login"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-GHB234G6.js",
      "chunk-YJGEU2CB.js",
      "chunk-YFWDM5WG.js"
    ],
    "route": "/confirm/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-FXLEPBLY.js"
    ],
    "route": "/register"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-XEPQCUBB.js",
      "chunk-GVDV5XYY.js"
    ],
    "route": "/lien-he"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-XEPQCUBB.js",
      "chunk-GVDV5XYY.js"
    ],
    "route": "/*"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 72880, hash: '5ad86ae164589eab26a7c30fd67c2007071f73da28c484f45ad92ec00bd7ebc9', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 24171, hash: 'd1074b2815c453d70bd6e13a525349dd10fb7efb91b8c576451a86ab7e7edf34', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-3YKPACMO.css': {size: 188380, hash: 'pBjPRlxJvXQ', text: () => import('./assets-chunks/styles-3YKPACMO_css.mjs').then(m => m.default)}
  },
};
