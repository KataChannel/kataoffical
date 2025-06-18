# my-blog

Một website blog đầy đủ tính năng được xây dựng với Next.js 14, TypeScript, và Prisma.

## Tính năng chính

- ✅ **Quản lý bài viết**: Tạo, chỉnh sửa, xóa bài viết
- ✅ **Hệ thống xác thực**: Đăng ký, đăng nhập với NextAuth.js
- ✅ **Bình luận**: Hệ thống bình luận cho bài viết
- ✅ **Tìm kiếm**: Tìm kiếm bài viết theo tiêu đề và nội dung
- ✅ **Tags**: Phân loại bài viết theo tags
- ✅ **Admin Panel**: Quản lý bài viết và người dùng
- ✅ **Responsive**: Tối ưu cho mobile và desktop
- ✅ **SEO**: Tối ưu SEO với metadata
- ✅ **Dark Mode**: Hỗ trợ giao diện tối

## Công nghệ sử dụng

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite + Prisma ORM
- **Authentication**: NextAuth.js
- **State Management**: Zustand
- **Form**: React Hook Form
- **UI Components**: Lucide React Icons
- **Markdown**: React Markdown

## Cài đặt

### 1. Clone repository

```bash
git clone <repository-url>
cd my-blog
```

### 2. Cài đặt dependencies

```bash
npm install
# hoặc
yarn install
```

### 3. Cấu hình môi trường

```bash
cp .env.example .env.local
```

Chỉnh sửa file `.env.local`:

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
```

### 4. Khởi tạo database

```bash
npx prisma db push
npx prisma generate
```

### 5. Tạo admin user (tùy chọn)

```bash
npx prisma studio
```

Hoặc tạo user qua API:

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "admin123",
    "name": "Admin",
    "role": "ADMIN"
  }'
```

### 6. Chạy ứng dụng

```bash
npm run dev
# hoặc
yarn dev
```

Mở [http://localhost:3000](http://localhost:3000) để xem kết quả.

## Cấu trúc thư mục

```
my-blog/
├── src/
│   ├── app/                 # App Router pages
│   │   ├── api/            # API routes
│   │   ├── blog/           # Blog pages
│   │   ├── admin/          # Admin pages
│   │   └── auth/           # Auth pages
│   ├── components/         # React components
│   │   ├── ui/            # Base UI components
│   │   ├── blog/          # Blog components
│   │   ├── admin/         # Admin components
│   │   └── layout/        # Layout components
│   ├── lib/               # Utilities & configs
│   ├── hooks/             # Custom hooks
│   ├── types/             # TypeScript types
│   └── store/             # State management
├── public/                # Static files
├── prisma/                # Database schema
└── content/               # Markdown content
```

## API Endpoints

### Posts
- `GET /api/posts` - Lấy danh sách bài viết
- `POST /api/posts` - Tạo bài viết mới
- `GET /api/posts/[id]` - Lấy chi tiết bài viết
- `PUT /api/posts/[id]` - Cập nhật bài viết
- `DELETE /api/posts/[id]` - Xóa bài viết

### Comments
- `GET /api/comments?postId=[id]` - Lấy bình luận
- `POST /api/comments` - Tạo bình luận mới

### Auth
- `POST /api/auth/register` - Đăng ký
- `POST /api/auth/login` - Đăng nhập

## Deploy

### Vercel (Khuyến nghị)

1. Push code lên GitHub
2. Import project vào Vercel
3. Cấu hình environment variables
4. Deploy

### Docker

```bash
docker build -t my-blog .
docker run -p 3000:3000 my-blog
```

## Đóng góp

1. Fork project
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## License

MIT License - xem file [LICENSE](LICENSE) để biết thêm chi tiết.

## Hỗ trợ

Nếu bạn gặp vấn đề, hãy tạo issue trên GitHub hoặc liên hệ qua email.

---

Made with ❤️ by [Your Name]
```