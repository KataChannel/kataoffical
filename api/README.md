npx bun add @nestjs/config @nestjs/jwt @nestjs/passport passport passport-jwt bcryptjs
npx bun add @prisma/client
npx bun add -d prisma
npx bun prisma migrate dev --name 22_02_2025
npx prisma db push
npx bun prisma generate


npx prisma db seed
npx katacreate --type nestjs --name menu --outputDir menu

Tình huống	Lệnh cần chạy
Thay đổi nhỏ (thêm/bớt cột)	npx bun prisma migrate dev --name update_schema
Thay đổi lớn (reset toàn bộ DB)	npx bun prisma migrate reset
Chỉ cần sync DB mà không tạo migration	npx prisma db push
Cập nhật Prisma Client	npx bun prisma generate