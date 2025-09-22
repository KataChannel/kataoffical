
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 1,
    "route": "/demoteamplate"
  },
  {
    "renderMode": 1,
    "route": "/admin"
  },
  {
    "renderMode": 1,
    "route": "/admin/donhang"
  },
  {
    "renderMode": 1,
    "route": "/admin/donhang/in/*"
  },
  {
    "renderMode": 1,
    "route": "/admin/donhang/donsi/*"
  },
  {
    "renderMode": 1,
    "route": "/admin/donhang/donle/*"
  },
  {
    "renderMode": 1,
    "route": "/admin/menu"
  },
  {
    "renderMode": 1,
    "route": "/admin/menu/*"
  },
  {
    "renderMode": 1,
    "route": "/admin/dashboard"
  },
  {
    "renderMode": 1,
    "route": "/admin/module"
  },
  {
    "renderMode": 1,
    "route": "/admin/page"
  },
  {
    "renderMode": 1,
    "route": "/admin/sanpham"
  },
  {
    "renderMode": 1,
    "route": "/admin/sanpham/*"
  },
  {
    "renderMode": 1,
    "route": "/admin/banggia"
  },
  {
    "renderMode": 1,
    "route": "/admin/banggia/*"
  },
  {
    "renderMode": 1,
    "route": "/admin/khachhang"
  },
  {
    "renderMode": 1,
    "route": "/admin/khachhang/*"
  },
  {
    "renderMode": 1,
    "route": "/admin/vandon"
  },
  {
    "renderMode": 1,
    "route": "/admin/xuatnhapton"
  },
  {
    "renderMode": 1,
    "route": "/admin/xuatnhapton/*"
  },
  {
    "renderMode": 1,
    "route": "/admin/quanlykho"
  },
  {
    "renderMode": 1,
    "route": "/admin/quanlykho/*"
  },
  {
    "renderMode": 1,
    "route": "/admin/dathangncc"
  },
  {
    "renderMode": 1,
    "route": "/admin/dathangncc/*"
  },
  {
    "renderMode": 1,
    "route": "/admin/nhacungcap"
  },
  {
    "renderMode": 1,
    "route": "/admin/nhacungcap/*"
  },
  {
    "renderMode": 1,
    "route": "/admin/user"
  },
  {
    "renderMode": 1,
    "route": "/admin/user/*"
  },
  {
    "renderMode": 1,
    "route": "/admin/slide"
  },
  {
    "renderMode": 1,
    "route": "/admin/slide/*"
  },
  {
    "renderMode": 1,
    "route": "/admin/danhmuc"
  },
  {
    "renderMode": 1,
    "route": "/admin/danhmuc/*"
  },
  {
    "renderMode": 1,
    "route": "/admin/lienhe"
  },
  {
    "renderMode": 1,
    "route": "/admin/lienhe/*"
  },
  {
    "renderMode": 1,
    "route": "/admin/khuyenmai"
  },
  {
    "renderMode": 1,
    "route": "/admin/usergroup"
  },
  {
    "renderMode": 1,
    "route": "/admin/usergroup/*"
  },
  {
    "renderMode": 1,
    "route": "/admin/demo"
  },
  {
    "renderMode": 1,
    "route": "/admin/demo/*"
  },
  {
    "renderMode": 1,
    "route": "/admin/cauhinh"
  },
  {
    "renderMode": 1,
    "route": "/admin/cauhinh/*"
  },
  {
    "renderMode": 1,
    "route": "/"
  },
  {
    "renderMode": 1,
    "route": "/gio-hang"
  },
  {
    "renderMode": 1,
    "route": "/thanh-toan"
  },
  {
    "renderMode": 1,
    "route": "/don-hang"
  },
  {
    "renderMode": 1,
    "route": "/cam-on"
  },
  {
    "renderMode": 1,
    "route": "/san-pham-yeu-thich"
  },
  {
    "renderMode": 1,
    "route": "/danh-muc"
  },
  {
    "renderMode": 1,
    "route": "/danh-muc/*"
  },
  {
    "renderMode": 1,
    "route": "/san-pham/*"
  },
  {
    "renderMode": 1,
    "route": "/blog/*"
  },
  {
    "renderMode": 1,
    "route": "/blog/*/*"
  },
  {
    "renderMode": 1,
    "route": "/lien-he"
  },
  {
    "renderMode": 1,
    "route": "/tra-cuu-don"
  },
  {
    "renderMode": 1,
    "route": "/profile"
  },
  {
    "renderMode": 1,
    "route": "/profile/general"
  },
  {
    "renderMode": 1,
    "route": "/profile/changepassword"
  },
  {
    "renderMode": 1,
    "route": "/profile/social"
  },
  {
    "renderMode": 1,
    "route": "/profile/myorder"
  },
  {
    "renderMode": 1,
    "route": "/profile/myorder/*"
  },
  {
    "renderMode": 1,
    "route": "/dangnhap"
  },
  {
    "renderMode": 1,
    "route": "/dangky"
  }
],
  assets: {
    'index.csr.html': {size: 142417, hash: 'bdd125c2c95e86d91eab1983aa9ae1e42e7f2c8b1c4f083dfaa18cb2718120da', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 89507, hash: '8ea60243631c5af6b9a6fdd564d268609c98d7ed03ba7fe6113dfc10fcd71a58', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-2IMTBKJL.css': {size: 322674, hash: '8rcTVa1SoMA', text: () => import('./assets-chunks/styles-2IMTBKJL_css.mjs').then(m => m.default)}
  },
};
