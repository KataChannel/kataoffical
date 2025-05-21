npx bun add @nestjs/config @nestjs/jwt @nestjs/passport passport passport-jwt bcryptjs
npx bun add @prisma/client
npx bun add -d prisma
npx bun prisma migrate dev --name rau6.2
npx prisma db push
npx bun prisma generate
npx ts-node prisma/exportData.ts
npx ts-node prisma/update.ts
npx ts-node prisma/backup.ts
npx ts-node prisma/restorev2.ts


npx prisma db seed
npx katacreate --type nestjs --name menu --outputDir menu
npx katacreate --type nestjs --name sanpham --outputDir sanpham
npx katacreate --type nestjs --name donhang --outputDir donhang
npx katacreate --type nestjs --name banggia --outputDir banggia
npx katacreate --type nestjs --name giohang --outputDir giohang
npx katacreate --type nestjs --name khachhang --outputDir khachhang
npx katacreate --type nestjs --name nhacungcap --outputDir nhacungcap
npx katacreate --type nestjs --name dathang --outputDir dathang
npx katacreate --type nestjs --name kho --outputDir kho
npx katacreate --type nestjs --name phieukho --outputDir phieukho
npx katacreate --type nestjs --name role --outputDir role
npx katacreate --type nestjs --name permission --outputDir permission
npx katacreate --type nestjs --name googledrive --outputDir googledrive
npx katacreate --type nestjs --name errorlogs --outputDir errorlogs


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


nhacungcap: id,name,mancc,diachi,email,sdt,ghichu,isActive
dathang:id,madncc,title,status,isActive,nhacungcap,sanpham
1 nhacungcap - nhiều dathang
1 dathang - 1 nhacungcap
1 giohang - 1 dathang

model Giohang {
  id        String   @id @default(uuid())
  title     String
  donhang   Donhang  @relation(fields: [donhangId], references: [id])
  donhangId String   @unique
  order     Int
  isActive  Boolean  @default(false)
  sanpham   Giohangsanpham[]
}

Tạo Index Full-Text Search
ALTER TABLE Khachhang ADD COLUMN search_vector tsvector;
UPDATE Khachhang 
SET search_vector = to_tsvector('simple', name || ' ' || namenn || ' ' || diachi || ' ' || makh || ' ' || sdt  );
CREATE INDEX search_vector_idx ON Khachhang USING gin(search_vector);



{
  "model": "users",
  "filters": {
    "OR": [
      { "name": { "value": "John", "type": "contains" } },
      { "email": { "value": "john@example.com", "type": "equals" } }
    ],
    "age": { "value": 30, "type": "gte" },
    "profile": {
      "bio": { "value": "developer", "type": "contains" }
    }
  },
  "relations": {
    "profile": {
      "include": true,
      "filters": {
        "bio": { "value": "developer", "type": "contains" }
      }
    },
    "posts": {
      "include": true,
      "filters": {
        "title": { "value": "NestJS", "type": "contains" }
      }
    }
  },
  "orderBy": { "field": "id", "direction": "desc" },
  "skip": 0,
  "take": 10
}


[{"title":"Trứng bắc thảo","dvt":"Quả","khachhang":[{"name":"99 SOUL","data":{"SLDAT":1,"SLTT":"1,2"}},{"name":"NHÀ HÀNG DOOKKI","data":{"SLDAT":1,"SLTT":"1,2"}}]},{"title":"Bún gạo","dvt":"Kg","khachhang":[{"name":"99 SOUL","data":{"SLDAT":1,"SLTT":"1,2"}},{"name":"NHÀ HÀNG DOOKKI","data":{"SLDAT":"","SLTT":"1,2"}}]}]
