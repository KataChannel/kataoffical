
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 1,
    "redirectTo": "/admin/account",
    "route": "/"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-6CMESLLJ.js"
    ],
    "route": "/404"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-CSJY4MHC.js"
    ],
    "route": "/lienheadmin"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-FHDL7VWB.js",
      "chunk-WDQ4VQPI.js",
      "chunk-PXSZSJ6W.js",
      "chunk-OJAO3OLV.js",
      "chunk-SDZRBUC4.js",
      "chunk-ZBHKY25U.js",
      "chunk-3F7BKIWY.js",
      "chunk-NS3D3RP2.js",
      "chunk-3ZQCHC5I.js",
      "chunk-SFLISUEA.js"
    ],
    "route": "/admin"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-FHDL7VWB.js",
      "chunk-WDQ4VQPI.js",
      "chunk-PXSZSJ6W.js",
      "chunk-OJAO3OLV.js",
      "chunk-SDZRBUC4.js",
      "chunk-ZBHKY25U.js",
      "chunk-3F7BKIWY.js",
      "chunk-NS3D3RP2.js",
      "chunk-3ZQCHC5I.js",
      "chunk-SFLISUEA.js"
    ],
    "route": "/admin/dashboard"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-FHDL7VWB.js",
      "chunk-WDQ4VQPI.js",
      "chunk-PXSZSJ6W.js",
      "chunk-OJAO3OLV.js",
      "chunk-SDZRBUC4.js",
      "chunk-ZBHKY25U.js",
      "chunk-3F7BKIWY.js",
      "chunk-NS3D3RP2.js",
      "chunk-3ZQCHC5I.js",
      "chunk-SFLISUEA.js"
    ],
    "route": "/admin/menu"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-FHDL7VWB.js",
      "chunk-WDQ4VQPI.js",
      "chunk-PXSZSJ6W.js",
      "chunk-OJAO3OLV.js",
      "chunk-SDZRBUC4.js",
      "chunk-ZBHKY25U.js",
      "chunk-3F7BKIWY.js",
      "chunk-NS3D3RP2.js",
      "chunk-3ZQCHC5I.js",
      "chunk-SFLISUEA.js"
    ],
    "route": "/admin/menu/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-FHDL7VWB.js",
      "chunk-WDQ4VQPI.js",
      "chunk-PXSZSJ6W.js",
      "chunk-OJAO3OLV.js",
      "chunk-SDZRBUC4.js",
      "chunk-ZBHKY25U.js",
      "chunk-3F7BKIWY.js",
      "chunk-NS3D3RP2.js",
      "chunk-3ZQCHC5I.js",
      "chunk-SFLISUEA.js"
    ],
    "route": "/admin/hotro"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-FHDL7VWB.js",
      "chunk-WDQ4VQPI.js",
      "chunk-PXSZSJ6W.js",
      "chunk-OJAO3OLV.js",
      "chunk-SDZRBUC4.js",
      "chunk-ZBHKY25U.js",
      "chunk-3F7BKIWY.js",
      "chunk-NS3D3RP2.js",
      "chunk-3ZQCHC5I.js",
      "chunk-SFLISUEA.js"
    ],
    "route": "/admin/hotro/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-FHDL7VWB.js",
      "chunk-WDQ4VQPI.js",
      "chunk-PXSZSJ6W.js",
      "chunk-OJAO3OLV.js",
      "chunk-SDZRBUC4.js",
      "chunk-ZBHKY25U.js",
      "chunk-3F7BKIWY.js",
      "chunk-NS3D3RP2.js",
      "chunk-3ZQCHC5I.js",
      "chunk-SFLISUEA.js"
    ],
    "route": "/admin/nhomuser"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-FHDL7VWB.js",
      "chunk-WDQ4VQPI.js",
      "chunk-PXSZSJ6W.js",
      "chunk-OJAO3OLV.js",
      "chunk-SDZRBUC4.js",
      "chunk-ZBHKY25U.js",
      "chunk-3F7BKIWY.js",
      "chunk-NS3D3RP2.js",
      "chunk-3ZQCHC5I.js",
      "chunk-SFLISUEA.js"
    ],
    "route": "/admin/nhomuser/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-FHDL7VWB.js",
      "chunk-WDQ4VQPI.js",
      "chunk-PXSZSJ6W.js",
      "chunk-OJAO3OLV.js",
      "chunk-SDZRBUC4.js",
      "chunk-ZBHKY25U.js",
      "chunk-3F7BKIWY.js",
      "chunk-NS3D3RP2.js",
      "chunk-3ZQCHC5I.js",
      "chunk-SFLISUEA.js"
    ],
    "route": "/admin/permission"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-FHDL7VWB.js",
      "chunk-WDQ4VQPI.js",
      "chunk-PXSZSJ6W.js",
      "chunk-OJAO3OLV.js",
      "chunk-SDZRBUC4.js",
      "chunk-ZBHKY25U.js",
      "chunk-3F7BKIWY.js",
      "chunk-NS3D3RP2.js",
      "chunk-3ZQCHC5I.js",
      "chunk-SFLISUEA.js"
    ],
    "route": "/admin/permission/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-FHDL7VWB.js",
      "chunk-WDQ4VQPI.js",
      "chunk-PXSZSJ6W.js",
      "chunk-OJAO3OLV.js",
      "chunk-SDZRBUC4.js",
      "chunk-ZBHKY25U.js",
      "chunk-3F7BKIWY.js",
      "chunk-NS3D3RP2.js",
      "chunk-3ZQCHC5I.js",
      "chunk-SFLISUEA.js"
    ],
    "route": "/admin/danhmuc"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-FHDL7VWB.js",
      "chunk-WDQ4VQPI.js",
      "chunk-PXSZSJ6W.js",
      "chunk-OJAO3OLV.js",
      "chunk-SDZRBUC4.js",
      "chunk-ZBHKY25U.js",
      "chunk-3F7BKIWY.js",
      "chunk-NS3D3RP2.js",
      "chunk-3ZQCHC5I.js",
      "chunk-SFLISUEA.js"
    ],
    "route": "/admin/danhmuc/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-FHDL7VWB.js",
      "chunk-WDQ4VQPI.js",
      "chunk-PXSZSJ6W.js",
      "chunk-OJAO3OLV.js",
      "chunk-SDZRBUC4.js",
      "chunk-ZBHKY25U.js",
      "chunk-3F7BKIWY.js",
      "chunk-NS3D3RP2.js",
      "chunk-3ZQCHC5I.js",
      "chunk-SFLISUEA.js"
    ],
    "route": "/admin/baiviet"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-FHDL7VWB.js",
      "chunk-WDQ4VQPI.js",
      "chunk-PXSZSJ6W.js",
      "chunk-OJAO3OLV.js",
      "chunk-SDZRBUC4.js",
      "chunk-ZBHKY25U.js",
      "chunk-3F7BKIWY.js",
      "chunk-NS3D3RP2.js",
      "chunk-3ZQCHC5I.js",
      "chunk-SFLISUEA.js"
    ],
    "route": "/admin/baiviet/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-FHDL7VWB.js",
      "chunk-WDQ4VQPI.js",
      "chunk-PXSZSJ6W.js",
      "chunk-OJAO3OLV.js",
      "chunk-SDZRBUC4.js",
      "chunk-ZBHKY25U.js",
      "chunk-3F7BKIWY.js",
      "chunk-NS3D3RP2.js",
      "chunk-3ZQCHC5I.js",
      "chunk-SFLISUEA.js"
    ],
    "route": "/admin/goooglesheets"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-FHDL7VWB.js",
      "chunk-WDQ4VQPI.js",
      "chunk-PXSZSJ6W.js",
      "chunk-OJAO3OLV.js",
      "chunk-SDZRBUC4.js",
      "chunk-ZBHKY25U.js",
      "chunk-3F7BKIWY.js",
      "chunk-NS3D3RP2.js",
      "chunk-3ZQCHC5I.js",
      "chunk-SFLISUEA.js"
    ],
    "route": "/admin/sanpham"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-FHDL7VWB.js",
      "chunk-WDQ4VQPI.js",
      "chunk-PXSZSJ6W.js",
      "chunk-OJAO3OLV.js",
      "chunk-SDZRBUC4.js",
      "chunk-ZBHKY25U.js",
      "chunk-3F7BKIWY.js",
      "chunk-NS3D3RP2.js",
      "chunk-3ZQCHC5I.js",
      "chunk-SFLISUEA.js"
    ],
    "route": "/admin/sanpham/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-FHDL7VWB.js",
      "chunk-WDQ4VQPI.js",
      "chunk-PXSZSJ6W.js",
      "chunk-OJAO3OLV.js",
      "chunk-SDZRBUC4.js",
      "chunk-ZBHKY25U.js",
      "chunk-3F7BKIWY.js",
      "chunk-NS3D3RP2.js",
      "chunk-3ZQCHC5I.js",
      "chunk-SFLISUEA.js"
    ],
    "route": "/admin/banggia"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-FHDL7VWB.js",
      "chunk-WDQ4VQPI.js",
      "chunk-PXSZSJ6W.js",
      "chunk-OJAO3OLV.js",
      "chunk-SDZRBUC4.js",
      "chunk-ZBHKY25U.js",
      "chunk-3F7BKIWY.js",
      "chunk-NS3D3RP2.js",
      "chunk-3ZQCHC5I.js",
      "chunk-SFLISUEA.js"
    ],
    "route": "/admin/banggia/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-FHDL7VWB.js",
      "chunk-WDQ4VQPI.js",
      "chunk-PXSZSJ6W.js",
      "chunk-OJAO3OLV.js",
      "chunk-SDZRBUC4.js",
      "chunk-ZBHKY25U.js",
      "chunk-3F7BKIWY.js",
      "chunk-NS3D3RP2.js",
      "chunk-3ZQCHC5I.js",
      "chunk-SFLISUEA.js"
    ],
    "route": "/admin/khachhang"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-FHDL7VWB.js",
      "chunk-WDQ4VQPI.js",
      "chunk-PXSZSJ6W.js",
      "chunk-OJAO3OLV.js",
      "chunk-SDZRBUC4.js",
      "chunk-ZBHKY25U.js",
      "chunk-3F7BKIWY.js",
      "chunk-NS3D3RP2.js",
      "chunk-3ZQCHC5I.js",
      "chunk-SFLISUEA.js"
    ],
    "route": "/admin/khachhang/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-FHDL7VWB.js",
      "chunk-WDQ4VQPI.js",
      "chunk-PXSZSJ6W.js",
      "chunk-OJAO3OLV.js",
      "chunk-SDZRBUC4.js",
      "chunk-ZBHKY25U.js",
      "chunk-3F7BKIWY.js",
      "chunk-NS3D3RP2.js",
      "chunk-3ZQCHC5I.js",
      "chunk-SFLISUEA.js"
    ],
    "route": "/admin/nhomkhachhang"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-FHDL7VWB.js",
      "chunk-WDQ4VQPI.js",
      "chunk-PXSZSJ6W.js",
      "chunk-OJAO3OLV.js",
      "chunk-SDZRBUC4.js",
      "chunk-ZBHKY25U.js",
      "chunk-3F7BKIWY.js",
      "chunk-NS3D3RP2.js",
      "chunk-3ZQCHC5I.js",
      "chunk-SFLISUEA.js"
    ],
    "route": "/admin/nhomkhachhang/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-FHDL7VWB.js",
      "chunk-WDQ4VQPI.js",
      "chunk-PXSZSJ6W.js",
      "chunk-OJAO3OLV.js",
      "chunk-SDZRBUC4.js",
      "chunk-ZBHKY25U.js",
      "chunk-3F7BKIWY.js",
      "chunk-NS3D3RP2.js",
      "chunk-3ZQCHC5I.js",
      "chunk-SFLISUEA.js"
    ],
    "route": "/admin/nhacungcap"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-FHDL7VWB.js",
      "chunk-WDQ4VQPI.js",
      "chunk-PXSZSJ6W.js",
      "chunk-OJAO3OLV.js",
      "chunk-SDZRBUC4.js",
      "chunk-ZBHKY25U.js",
      "chunk-3F7BKIWY.js",
      "chunk-NS3D3RP2.js",
      "chunk-3ZQCHC5I.js",
      "chunk-SFLISUEA.js"
    ],
    "route": "/admin/nhacungcap/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-FHDL7VWB.js",
      "chunk-WDQ4VQPI.js",
      "chunk-PXSZSJ6W.js",
      "chunk-OJAO3OLV.js",
      "chunk-SDZRBUC4.js",
      "chunk-ZBHKY25U.js",
      "chunk-3F7BKIWY.js",
      "chunk-NS3D3RP2.js",
      "chunk-3ZQCHC5I.js",
      "chunk-SFLISUEA.js"
    ],
    "route": "/admin/dathang"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-FHDL7VWB.js",
      "chunk-WDQ4VQPI.js",
      "chunk-PXSZSJ6W.js",
      "chunk-OJAO3OLV.js",
      "chunk-SDZRBUC4.js",
      "chunk-ZBHKY25U.js",
      "chunk-3F7BKIWY.js",
      "chunk-NS3D3RP2.js",
      "chunk-3ZQCHC5I.js",
      "chunk-SFLISUEA.js"
    ],
    "route": "/admin/dathang/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-FHDL7VWB.js",
      "chunk-WDQ4VQPI.js",
      "chunk-PXSZSJ6W.js",
      "chunk-OJAO3OLV.js",
      "chunk-SDZRBUC4.js",
      "chunk-ZBHKY25U.js",
      "chunk-3F7BKIWY.js",
      "chunk-NS3D3RP2.js",
      "chunk-3ZQCHC5I.js",
      "chunk-SFLISUEA.js"
    ],
    "route": "/admin/nhucaudathang"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-FHDL7VWB.js",
      "chunk-WDQ4VQPI.js",
      "chunk-PXSZSJ6W.js",
      "chunk-OJAO3OLV.js",
      "chunk-SDZRBUC4.js",
      "chunk-ZBHKY25U.js",
      "chunk-3F7BKIWY.js",
      "chunk-NS3D3RP2.js",
      "chunk-3ZQCHC5I.js",
      "chunk-SFLISUEA.js"
    ],
    "route": "/admin/donhang"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-FHDL7VWB.js",
      "chunk-WDQ4VQPI.js",
      "chunk-PXSZSJ6W.js",
      "chunk-OJAO3OLV.js",
      "chunk-SDZRBUC4.js",
      "chunk-ZBHKY25U.js",
      "chunk-3F7BKIWY.js",
      "chunk-NS3D3RP2.js",
      "chunk-3ZQCHC5I.js",
      "chunk-SFLISUEA.js"
    ],
    "route": "/admin/donhang/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-FHDL7VWB.js",
      "chunk-WDQ4VQPI.js",
      "chunk-PXSZSJ6W.js",
      "chunk-OJAO3OLV.js",
      "chunk-SDZRBUC4.js",
      "chunk-ZBHKY25U.js",
      "chunk-3F7BKIWY.js",
      "chunk-NS3D3RP2.js",
      "chunk-3ZQCHC5I.js",
      "chunk-SFLISUEA.js"
    ],
    "route": "/admin/vandon"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-FHDL7VWB.js",
      "chunk-WDQ4VQPI.js",
      "chunk-PXSZSJ6W.js",
      "chunk-OJAO3OLV.js",
      "chunk-SDZRBUC4.js",
      "chunk-ZBHKY25U.js",
      "chunk-3F7BKIWY.js",
      "chunk-NS3D3RP2.js",
      "chunk-3ZQCHC5I.js",
      "chunk-SFLISUEA.js"
    ],
    "route": "/admin/phieuchuyen"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-FHDL7VWB.js",
      "chunk-WDQ4VQPI.js",
      "chunk-PXSZSJ6W.js",
      "chunk-OJAO3OLV.js",
      "chunk-SDZRBUC4.js",
      "chunk-ZBHKY25U.js",
      "chunk-3F7BKIWY.js",
      "chunk-NS3D3RP2.js",
      "chunk-3ZQCHC5I.js",
      "chunk-SFLISUEA.js"
    ],
    "route": "/admin/kho"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-FHDL7VWB.js",
      "chunk-WDQ4VQPI.js",
      "chunk-PXSZSJ6W.js",
      "chunk-OJAO3OLV.js",
      "chunk-SDZRBUC4.js",
      "chunk-ZBHKY25U.js",
      "chunk-3F7BKIWY.js",
      "chunk-NS3D3RP2.js",
      "chunk-3ZQCHC5I.js",
      "chunk-SFLISUEA.js"
    ],
    "route": "/admin/kho/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-FHDL7VWB.js",
      "chunk-WDQ4VQPI.js",
      "chunk-PXSZSJ6W.js",
      "chunk-OJAO3OLV.js",
      "chunk-SDZRBUC4.js",
      "chunk-ZBHKY25U.js",
      "chunk-3F7BKIWY.js",
      "chunk-NS3D3RP2.js",
      "chunk-3ZQCHC5I.js",
      "chunk-SFLISUEA.js"
    ],
    "route": "/admin/phieugiaohang"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-FHDL7VWB.js",
      "chunk-WDQ4VQPI.js",
      "chunk-PXSZSJ6W.js",
      "chunk-OJAO3OLV.js",
      "chunk-SDZRBUC4.js",
      "chunk-ZBHKY25U.js",
      "chunk-3F7BKIWY.js",
      "chunk-NS3D3RP2.js",
      "chunk-3ZQCHC5I.js",
      "chunk-SFLISUEA.js"
    ],
    "route": "/admin/phieugiaohang/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-FHDL7VWB.js",
      "chunk-WDQ4VQPI.js",
      "chunk-PXSZSJ6W.js",
      "chunk-OJAO3OLV.js",
      "chunk-SDZRBUC4.js",
      "chunk-ZBHKY25U.js",
      "chunk-3F7BKIWY.js",
      "chunk-NS3D3RP2.js",
      "chunk-3ZQCHC5I.js",
      "chunk-SFLISUEA.js"
    ],
    "route": "/admin/phieuchiahang"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-FHDL7VWB.js",
      "chunk-WDQ4VQPI.js",
      "chunk-PXSZSJ6W.js",
      "chunk-OJAO3OLV.js",
      "chunk-SDZRBUC4.js",
      "chunk-ZBHKY25U.js",
      "chunk-3F7BKIWY.js",
      "chunk-NS3D3RP2.js",
      "chunk-3ZQCHC5I.js",
      "chunk-SFLISUEA.js"
    ],
    "route": "/admin/phieuchiahang/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-FHDL7VWB.js",
      "chunk-WDQ4VQPI.js",
      "chunk-PXSZSJ6W.js",
      "chunk-OJAO3OLV.js",
      "chunk-SDZRBUC4.js",
      "chunk-ZBHKY25U.js",
      "chunk-3F7BKIWY.js",
      "chunk-NS3D3RP2.js",
      "chunk-3ZQCHC5I.js",
      "chunk-SFLISUEA.js"
    ],
    "route": "/admin/phieukho"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-FHDL7VWB.js",
      "chunk-WDQ4VQPI.js",
      "chunk-PXSZSJ6W.js",
      "chunk-OJAO3OLV.js",
      "chunk-SDZRBUC4.js",
      "chunk-ZBHKY25U.js",
      "chunk-3F7BKIWY.js",
      "chunk-NS3D3RP2.js",
      "chunk-3ZQCHC5I.js",
      "chunk-SFLISUEA.js"
    ],
    "route": "/admin/phieukho/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-FHDL7VWB.js",
      "chunk-WDQ4VQPI.js",
      "chunk-PXSZSJ6W.js",
      "chunk-OJAO3OLV.js",
      "chunk-SDZRBUC4.js",
      "chunk-ZBHKY25U.js",
      "chunk-3F7BKIWY.js",
      "chunk-NS3D3RP2.js",
      "chunk-3ZQCHC5I.js",
      "chunk-SFLISUEA.js"
    ],
    "route": "/admin/xuatnhapton"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-FHDL7VWB.js",
      "chunk-WDQ4VQPI.js",
      "chunk-PXSZSJ6W.js",
      "chunk-OJAO3OLV.js",
      "chunk-SDZRBUC4.js",
      "chunk-ZBHKY25U.js",
      "chunk-3F7BKIWY.js",
      "chunk-NS3D3RP2.js",
      "chunk-3ZQCHC5I.js",
      "chunk-SFLISUEA.js"
    ],
    "route": "/admin/congnokhachhang"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-FHDL7VWB.js",
      "chunk-WDQ4VQPI.js",
      "chunk-PXSZSJ6W.js",
      "chunk-OJAO3OLV.js",
      "chunk-SDZRBUC4.js",
      "chunk-ZBHKY25U.js",
      "chunk-3F7BKIWY.js",
      "chunk-NS3D3RP2.js",
      "chunk-3ZQCHC5I.js",
      "chunk-SFLISUEA.js"
    ],
    "route": "/admin/congnokhachhang/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-FHDL7VWB.js",
      "chunk-WDQ4VQPI.js",
      "chunk-PXSZSJ6W.js",
      "chunk-OJAO3OLV.js",
      "chunk-SDZRBUC4.js",
      "chunk-ZBHKY25U.js",
      "chunk-3F7BKIWY.js",
      "chunk-NS3D3RP2.js",
      "chunk-3ZQCHC5I.js",
      "chunk-SFLISUEA.js"
    ],
    "route": "/admin/congnoncc"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-FHDL7VWB.js",
      "chunk-WDQ4VQPI.js",
      "chunk-PXSZSJ6W.js",
      "chunk-OJAO3OLV.js",
      "chunk-SDZRBUC4.js",
      "chunk-ZBHKY25U.js",
      "chunk-3F7BKIWY.js",
      "chunk-NS3D3RP2.js",
      "chunk-3ZQCHC5I.js",
      "chunk-SFLISUEA.js"
    ],
    "route": "/admin/user"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-FHDL7VWB.js",
      "chunk-WDQ4VQPI.js",
      "chunk-PXSZSJ6W.js",
      "chunk-OJAO3OLV.js",
      "chunk-SDZRBUC4.js",
      "chunk-ZBHKY25U.js",
      "chunk-3F7BKIWY.js",
      "chunk-NS3D3RP2.js",
      "chunk-3ZQCHC5I.js",
      "chunk-SFLISUEA.js"
    ],
    "route": "/admin/user/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-FHDL7VWB.js",
      "chunk-WDQ4VQPI.js",
      "chunk-PXSZSJ6W.js",
      "chunk-OJAO3OLV.js",
      "chunk-SDZRBUC4.js",
      "chunk-ZBHKY25U.js",
      "chunk-3F7BKIWY.js",
      "chunk-NS3D3RP2.js",
      "chunk-3ZQCHC5I.js",
      "chunk-SFLISUEA.js"
    ],
    "route": "/admin/quanlyfile"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-FHDL7VWB.js",
      "chunk-WDQ4VQPI.js",
      "chunk-PXSZSJ6W.js",
      "chunk-OJAO3OLV.js",
      "chunk-SDZRBUC4.js",
      "chunk-ZBHKY25U.js",
      "chunk-3F7BKIWY.js",
      "chunk-NS3D3RP2.js",
      "chunk-3ZQCHC5I.js",
      "chunk-SFLISUEA.js"
    ],
    "route": "/admin/quanlyfile/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-FHDL7VWB.js",
      "chunk-WDQ4VQPI.js",
      "chunk-PXSZSJ6W.js",
      "chunk-OJAO3OLV.js",
      "chunk-SDZRBUC4.js",
      "chunk-ZBHKY25U.js",
      "chunk-3F7BKIWY.js",
      "chunk-NS3D3RP2.js",
      "chunk-3ZQCHC5I.js",
      "chunk-SFLISUEA.js"
    ],
    "route": "/admin/profile"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-FHDL7VWB.js",
      "chunk-WDQ4VQPI.js",
      "chunk-PXSZSJ6W.js",
      "chunk-OJAO3OLV.js",
      "chunk-SDZRBUC4.js",
      "chunk-ZBHKY25U.js",
      "chunk-3F7BKIWY.js",
      "chunk-NS3D3RP2.js",
      "chunk-3ZQCHC5I.js",
      "chunk-SFLISUEA.js"
    ],
    "route": "/admin/profile/socialpage"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-FHDL7VWB.js",
      "chunk-WDQ4VQPI.js",
      "chunk-PXSZSJ6W.js",
      "chunk-OJAO3OLV.js",
      "chunk-SDZRBUC4.js",
      "chunk-ZBHKY25U.js",
      "chunk-3F7BKIWY.js",
      "chunk-NS3D3RP2.js",
      "chunk-3ZQCHC5I.js",
      "chunk-SFLISUEA.js"
    ],
    "redirectTo": "/admin/account/general",
    "route": "/admin/account"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-FHDL7VWB.js",
      "chunk-WDQ4VQPI.js",
      "chunk-PXSZSJ6W.js",
      "chunk-OJAO3OLV.js",
      "chunk-SDZRBUC4.js",
      "chunk-ZBHKY25U.js",
      "chunk-3F7BKIWY.js",
      "chunk-NS3D3RP2.js",
      "chunk-3ZQCHC5I.js",
      "chunk-SFLISUEA.js"
    ],
    "route": "/admin/account/password"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-FHDL7VWB.js",
      "chunk-WDQ4VQPI.js",
      "chunk-PXSZSJ6W.js",
      "chunk-OJAO3OLV.js",
      "chunk-SDZRBUC4.js",
      "chunk-ZBHKY25U.js",
      "chunk-3F7BKIWY.js",
      "chunk-NS3D3RP2.js",
      "chunk-3ZQCHC5I.js",
      "chunk-SFLISUEA.js"
    ],
    "route": "/admin/account/general"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-FNEOGJAL.js",
      "chunk-LSO2ECJT.js",
      "chunk-CTRCZSM6.js",
      "chunk-SFLISUEA.js",
      "chunk-3UGJ7MPD.js",
      "chunk-GNPWSDAG.js",
      "chunk-SGXWTGL5.js"
    ],
    "route": "/login"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-MZACVIFH.js"
    ],
    "route": "/register"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-56YRUFJX.js",
      "chunk-ZBHKY25U.js"
    ],
    "route": "/lien-he"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-56YRUFJX.js",
      "chunk-ZBHKY25U.js"
    ],
    "route": "/*"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 72816, hash: '6fe8676b663c00aec15fe6e89b6b76ed30980a79ce83d68575179499eca25b76', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 24107, hash: 'db39b13216aba6438309c47fbbbc2fe477668dc2798d8bbd3b7595f1702b85f6', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-IRRMPQRF.css': {size: 143736, hash: 'NVDDjTRCzQA', text: () => import('./assets-chunks/styles-IRRMPQRF_css.mjs').then(m => m.default)}
  },
};
