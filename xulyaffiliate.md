cấu trúc dự án affiliate
1. Frontend dự án frontend/academy (Angular)
1.1 site kết nối endpoint backend/affiliate
1.2 admin kết nối endpoint backend/shared-core

2. Backend đang sử dụng backend/affiliate và backend/shared-core

tôi cần điều chỉnh
1. Gộp tính năng và cơ sở dự liệu  backend/shared-core/prisma/schema.prisma vào backend/affiliate/prisma/schema.prisma để đồng bộ và thống nhất để frontend/academy chỉ sử dụng 1 backend/affiliate
2. Điều chỉnh frontend để sử dụng đúng với cấu trúc backend mới