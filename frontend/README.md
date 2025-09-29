git add .
git commit -m "update"
git push

npx katacreate --type angular --name menu --outputDir menu
npx katacreate --type angular --name sanpham --outputDir .
npx katacreate --type angular --name banggia --outputDir .
npx katacreate --type angular --name nhacungcap --outputDir .
npx katacreate --type angular --name donhang --outputDir .
npx katacreate --type angular --name dathang --outputDir .
npx katacreate --type angular --name kho --outputDir .
npx katacreate --type angular --name xuatnhapkho --outputDir .
npx katacreate --type angular --name user --outputDir .
npx katacreate --type angular --name role --outputDir .
npx katacreate --type angular --name permission --outputDir .
npx katacreate --type angular --name nhomkhachhang --outputDir .
npx katacreate --type angular --name phieugiaohang --outputDir .
npx katacreate --type angular --name congnokhachhang --outputDir .
npx katacreate --type angular --name lead --outputDir .
npx katacreate --type angular --name task --outputDir .
npx katacreate --type angular --name quanlyqrcode --outputDir .
npx katacreate --type angular --name quanlydrive --outputDir .
npx katacreate --type angular --name quanlygooglesheet --outputDir .
npx katacreate --type angular --name dexuat --outputDir .
npx katacreate --type angular --name affiliate --outputDir .

npx ng g c congnokhachhang --skip-tests --standalone
npx ng g c congnoncc --skip-tests --standalone
npx ng g c keditor --skip-tests --standalone
npx ng g c ktable --skip-tests --standalone
npx ng g c welcome --skip-tests --standalone
npx ng g c landingpage --skip-tests --standalone
npx ng g c affiliate --skip-tests --standalone
npx ng g c newsfeed --skip-tests --standalone
npx ng g c notifications --skip-tests --standalone
npx ng g c taikhoanctv --skip-tests --standalone
npx ng g c leaderboard --skip-tests --standalone
npx ng g c ladictv --skip-tests --standalone
npx ng g c detailladictv --skip-tests --standalone
npx ng g c loginctv --skip-tests --standalone
npx ng g c thongkectv --skip-tests --standalone
npx ng g c dashboardthongke --skip-tests --standalone
npx ng g c dashboardctv --skip-tests --standalone
npx ng g c thongkectv --skip-tests --standalone
npx ng g c lienketctv --skip-tests --standalone
npx ng g c tainguyenctv --skip-tests --standalone
npx ng g c luottruycap --skip-tests --standalone
npx ng g c maindb --skip-tests --standalone
npx ng g c luotdangky   --skip-tests --standalone
npx ng g c luotden       --skip-tests --standalone
npx ng g c khoahoc      --skip-tests --standalone
npx ng g c doanhthu     --skip-tests --standalone
npx ng g c hoahong      --skip-tests --standalone

