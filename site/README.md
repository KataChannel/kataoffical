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
npx ng g c game1 --skip-tests --standalone
npx ng g c sharedsanpham --skip-tests --standalone
npx ng g c dashboarsanpham --skip-tests --standalone
npx ng g c xuatnhapton --skip-tests --standalone
npx ng g c mathang --skip-tests --standalone
npx ng g c namno --skip-tests --standalone

npx ng g c donhang          --skip-tests --standalone
npx ng g c dathang          --skip-tests --standalone
npx ng g c baogia           --skip-tests --standalone
npx ng g c kho              --skip-tests --standalone
npx ng g c vanchuyen        --skip-tests --standalone
npx ng g c khachhang        --skip-tests --standalone
npx ng g c nhacungcap       --skip-tests --standalone
npx ng g c sanpham          --skip-tests --standalone
npx ng g c danhmuc          --skip-tests --standalone



