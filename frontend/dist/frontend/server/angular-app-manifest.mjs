
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
      "chunk-BOIFPWL3.js"
    ],
    "route": "/404"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/bulk-price-update"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/price-alerts"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/price-analytics"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/price-comparison"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/auditlog"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/auditlog/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/performance"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/dashboard"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/dashboard/baocaodoanhthu"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/thongke"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/thongke/khoiluong-khachhang"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/testing"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/lienheadmin"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/menu"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/menu/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/hotro"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/hotro/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/support"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/support/new"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/support/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/nhomuser"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/nhomuser/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/permission"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/permission/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/user-permission"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "redirectTo": "/admin/phongban/list",
    "route": "/admin/phongban"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/phongban/list"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/phongban/create"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/phongban/edit/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/phongban/detail/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "redirectTo": "/admin/nhanvien/list",
    "route": "/admin/nhanvien"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/nhanvien/list"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/nhanvien/create"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/nhanvien/edit/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/nhanvien/detail/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/importdata"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/importdata/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/danhmuc"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/danhmuc/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/baiviet"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/baiviet/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/goooglesheets"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/sanpham"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/sanpham/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/banggia"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/banggia/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/khachhang"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/khachhang/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/nhomkhachhang"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/nhomkhachhang/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/nhacungcap"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/nhacungcap/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/nhomncc"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/nhomncc/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/dathang"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/dathang/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/nhucaudathang"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/donhang"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/donhang/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/vandon"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/phieuchuyen"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/kho"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/kho/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/phieugiaohang"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/phieugiaohang/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/phieuchiahang"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/phieuchiahang/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/phieukho"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/phieukho/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/xuatnhapton"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/chotkho"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/chotkho/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/congnokhachhang"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/congnokhachhang/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/userguide"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/userguide/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/congnoncc"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/congnoncc/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/user"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/user/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/quanlyfile"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/quanlyfile/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/profile"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/profile/socialpage"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "redirectTo": "/admin/account/general",
    "route": "/admin/account"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/account/password"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJZHBSMI.js",
      "chunk-WVICYZKP.js",
      "chunk-N4YJJV3U.js",
      "chunk-MAS7DPQZ.js",
      "chunk-ZQXFRXA5.js",
      "chunk-STTHC4C4.js",
      "chunk-ZW44ZSN2.js",
      "chunk-NBRWFLNC.js",
      "chunk-NJTM6TIW.js",
      "chunk-5D3ARLRI.js"
    ],
    "route": "/admin/account/general"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SIBJL42Q.js",
      "chunk-HL53KBER.js",
      "chunk-QLH4GF5G.js",
      "chunk-XKWEYHLJ.js",
      "chunk-XBYFTIM3.js",
      "chunk-5PCRWSUQ.js",
      "chunk-VYSL3BUN.js",
      "chunk-Q4HMHGF2.js",
      "chunk-VHP6CZNW.js"
    ],
    "route": "/login"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-XSLTJRJF.js"
    ],
    "route": "/register"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-6SXD4Q5O.js",
      "chunk-NBRWFLNC.js"
    ],
    "route": "/lien-he"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-6SXD4Q5O.js",
      "chunk-NBRWFLNC.js"
    ],
    "route": "/*"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 72880, hash: 'ede04e48c5dd5a1d6bd24494c8c4b0a5422c91e8014e48f661316f002fd75fcf', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 24171, hash: '8c3f2cd44a29bb2406fe34f449b5906d9a77a9660afeb66ab356e0885fbbcaff', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-UTFBOJVN.css': {size: 182765, hash: 'NbXV3gioR4g', text: () => import('./assets-chunks/styles-UTFBOJVN_css.mjs').then(m => m.default)}
  },
};
