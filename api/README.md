npx bun add @nestjs/config @nestjs/jwt @nestjs/passport passport passport-jwt bcryptjs
npx bun add @prisma/client
npx bun add -d prisma
npx bun prisma migrate dev --name rau1.1.2
npx prisma db push
npx bun prisma generate


npx prisma db seed
npx katacreate --type nestjs --name menu --outputDir menu
npx katacreate --type nestjs --name sanpham --outputDir sanpham
npx katacreate --type nestjs --name donhang --outputDir donhang
npx katacreate --type nestjs --name banggia --outputDir banggia
npx katacreate --type nestjs --name giohang --outputDir giohang


Tình huống	Lệnh cần chạy
Thay đổi nhỏ (thêm/bớt cột)	npx bun prisma migrate dev --name update_schema
Thay đổi lớn (reset toàn bộ DB)	npx bun prisma migrate reset
Chỉ cần sync DB mà không tạo migration	npx prisma db push
Cập nhật Prisma Client	npx bun prisma generate


sanpham : id,title,slug,masp,giagoc,dvt,hinhanh,soluong,soluongkho,ghichu

donhhang:id,title,type,giohang,khachhang,madonhang,ngaygiao,ghichu,

giohang:id,title,donhang,sanpham:[{idSP,title,sldat,slgiao,slnhan,ttdat,ttgiao,ttnhan}]
(sldat:Số Lượng đặt,slgiao:số lượng giao,slnhan:số lượng nhận,ttdat:tổng tiền đặt,ttgiao:tổng tiền giao,ttnhan:tổng tiền nhận)

banggia:id,title,type,batdau,ketthuc,sanpham

sanpham-giohang:n-n

giohang-donhang:1-1

banggia-sanpham:n-n

{
    "id": "098293bb-4ecc-4a01-89a3-5648d310ec99",
    "Title": "Khổ qua rừng",
    "Slug": "kho-qua-rung",
    "MaSP": "I100740",
    "giagoc": 0,
    "dvt": "Kg",
    "Image": {},
    "Soluong": 10,
    "SLTT": 1,
    "Tongtien": 0,
    "SLTG": 10,
    "TongtienG": 0,
    "SLTN": 1,
    "TongtienN": 0
}