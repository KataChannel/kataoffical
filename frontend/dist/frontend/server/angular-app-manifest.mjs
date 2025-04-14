
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 1,
    "redirectTo": "/welcome",
    "route": "/"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-LMF3S6CE.js",
      "chunk-5BO56RLT.js",
      "chunk-VODLHY7C.js",
      "chunk-EOEI42HP.js",
      "chunk-6XOJN6DV.js",
      "chunk-K2APTHBJ.js"
    ],
    "route": "/welcome"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-ZQJRAGUT.js"
    ],
    "route": "/404"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/welcome"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/dashboard"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/menu"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/menu/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/quanlyqrcode"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/quanlyqrcode/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/quanlydrive"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/quanlydrive/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/drivelocal"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/drivelocal/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/googlesheet"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/googlesheet/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/landingpage"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/landingpage/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/lead"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/lead/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/task"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/task/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/hotro"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/hotro/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/nhomuser"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/nhomuser/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/permission"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/permission/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/danhmuc"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/danhmuc/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/baiviet"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/baiviet/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/goooglesheets"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/sanpham"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/sanpham/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/trackingevent"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/trackingevent/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/banggia"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/banggia/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/khachhang"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/khachhang/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/affiliatelink"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/affiliatelink/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/nhomkhachhang"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/nhomkhachhang/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/nhacungcap"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/nhacungcap/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/dathang"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/dathang/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/donhang"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/donhang/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/vandon"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/kho"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/kho/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/phieugiaohang"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/phieugiaohang/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/phieuchiahang"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/phieuchiahang/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/phieukho"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/phieukho/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/xuatnhapton"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/congnokhachhang"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/congnokhachhang/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/congnoncc"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/user"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/user/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/quanlyfile"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/quanlyfile/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/profile"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/profile/socialpage"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/dexuat"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/dexuat/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "redirectTo": "/admin/account/general",
    "route": "/admin/account"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/account/password"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EWMNO6M4.js",
      "chunk-VF65XDTX.js",
      "chunk-YDXAKH7M.js",
      "chunk-UHR3QR5I.js",
      "chunk-D53XVDIO.js",
      "chunk-6XOJN6DV.js",
      "chunk-5WSCXALS.js",
      "chunk-EF567M4M.js",
      "chunk-AVIIXVGM.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/admin/account/general"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-ZW5OSIOQ.js",
      "chunk-KTSJXEGV.js",
      "chunk-EG2GFUPX.js",
      "chunk-4NZTMXFR.js",
      "chunk-VFJNSHJY.js",
      "chunk-K2APTHBJ.js",
      "chunk-4BS4FFWV.js"
    ],
    "route": "/login"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-QQVBRYFM.js"
    ],
    "route": "/register"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-R4B7AJNR.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/landingpage"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-R4B7AJNR.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/landingpage/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-R4B7AJNR.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/lien-he"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-R4B7AJNR.js",
      "chunk-B4FVYSZE.js"
    ],
    "route": "/*"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 72764, hash: '4e3f7a03a5b237bc2f561bcbf390bba2c3e0381eb60d6df5085574e384d33be9', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 24055, hash: '014bff6728dd9d1d5f2271d84558cb6d60190f8ed7289aafa09a606d16da0d73', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-EIPHPHFQ.css': {size: 371626, hash: 'rAPjQmy9BTA', text: () => import('./assets-chunks/styles-EIPHPHFQ_css.mjs').then(m => m.default)}
  },
};
