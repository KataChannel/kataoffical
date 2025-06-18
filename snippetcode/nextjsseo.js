#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

class BlogGenerator {
  constructor(projectName = 'webseo') {
    this.projectName = projectName;
    this.rootDir = path.join(process.cwd(), projectName);
    this.srcDir = path.join(this.rootDir, 'src');
    this.appDir = path.join(this.srcDir, 'app');
    this.componentsDir = path.join(this.srcDir, 'components');
    this.libDir = path.join(this.srcDir, 'lib');
  }

  // Tạo cấu trúc thư mục
  createDirectories() {
    const dirs = [
      this.rootDir,
      this.srcDir,
      this.appDir,
      path.join(this.appDir, 'api', 'posts'),
      path.join(this.appDir, 'api', 'auth'),
      path.join(this.appDir, 'api', 'comments'),
      path.join(this.appDir, 'blog'),
      path.join(this.appDir, 'blog', '[slug]'),
      path.join(this.appDir, 'admin'),
      path.join(this.appDir, 'auth'),
      path.join(this.componentsDir, 'ui'),
      path.join(this.componentsDir, 'layout'),
      path.join(this.componentsDir, 'blog'),
      path.join(this.componentsDir, 'admin'),
      this.libDir,
      path.join(this.srcDir, 'hooks'),
      path.join(this.srcDir, 'types'),
      path.join(this.srcDir, 'store'),
      path.join(this.rootDir, 'public', 'images'),
      path.join(this.rootDir, 'content', 'posts'),
      path.join(this.rootDir, 'prisma')
    ];

    dirs.forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`Created directory: ${dir}`);
      }
    });
  }

  // Tạo package.json
  createPackageJson() {
    const packageJson = {
      "name": this.projectName,
      "version": "0.1.0",
      "private": true,
      "scripts": {
        "dev": "next dev",
        "build": "next build",
        "start": "next start",
        "lint": "next lint",
        "db:push": "prisma db push",
        "db:generate": "prisma generate",
        "db:studio": "prisma studio"
      },
      "dependencies": {
        "next": "14.0.0",
        "react": "^18",
        "react-dom": "^18",
        "@prisma/client": "^5.0.0",
        "next-auth": "^4.24.0",
        "bcryptjs": "^2.4.3",
        "react-hook-form": "^7.45.0",
        "react-markdown": "^9.0.0",
        "gray-matter": "^4.0.3",
        "lucide-react": "^0.263.1",
        "clsx": "^2.0.0",
        "tailwind-merge": "^2.0.0",
        "date-fns": "^3.0.0",
        "react-hot-toast": "^2.4.1",
        "zustand": "^4.4.0"
      },
      "devDependencies": {
        "typescript": "^5",
        "@types/node": "^20",
        "@types/react": "^18",
        "@types/react-dom": "^18",
        "@types/bcryptjs": "^2.4.4",
        "prisma": "^5.0.0",
        "eslint": "^8",
        "eslint-config-next": "14.0.0",
        "tailwindcss": "^3.3.0",
        "autoprefixer": "^10.0.1",
        "postcss": "^8"
      }
    };

    this.writeFile('package.json', JSON.stringify(packageJson, null, 2));
  }

  // Tạo Next.js config
  createNextConfig() {
    const config = `/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['localhost', 'your-domain.com'],
  },
}

module.exports = nextConfig`;

    this.writeFile('next.config.js', config);
  }

  // Tạo Tailwind config
  createTailwindConfig() {
    const config = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'inherit',
            a: {
              color: '#3b82f6',
              '&:hover': {
                color: '#1d4ed8',
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}`;

    this.writeFile('tailwind.config.js', config);
  }

  // Tạo TypeScript config
  createTsConfig() {
    const config = {
      "compilerOptions": {
        "target": "es5",
        "lib": ["dom", "dom.iterable", "es6"],
        "allowJs": true,
        "skipLibCheck": true,
        "strict": true,
        "noEmit": true,
        "esModuleInterop": true,
        "module": "esnext",
        "moduleResolution": "bundler",
        "resolveJsonModule": true,
        "isolatedModules": true,
        "jsx": "preserve",
        "incremental": true,
        "plugins": [
          {
            "name": "next"
          }
        ],
        "baseUrl": ".",
        "paths": {
          "@/*": ["./src/*"]
        }
      },
      "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
      "exclude": ["node_modules"]
    };

    this.writeFile('tsconfig.json', JSON.stringify(config, null, 2));
  }

  // Tạo Prisma schema
  createPrismaSchema() {
    const schema = `// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  password  String
  role      Role     @default(USER)
  posts     Post[]
  comments  Comment[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Post {
  id          String    @id @default(cuid())
  title       String
  slug        String    @unique
  content     String
  excerpt     String?
  published   Boolean   @default(false)
  featured    Boolean   @default(false)
  imageUrl    String?
  tags        Tag[]
  author      User      @relation(fields: [authorId], references: [id])
  authorId    String
  comments    Comment[]
  views       Int       @default(0)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

model Tag {
  id    String @id @default(cuid())
  name  String @unique
  posts Post[]
}

model Comment {
  id       String @id @default(cuid())
  content  String
  author   User   @relation(fields: [authorId], references: [id])
  authorId String
  post     Post   @relation(fields: [postId], references: [id])
  postId   String
  createdAt DateTime @default(now())
}

enum Role {
  USER
  ADMIN
}`;

    this.writeFile('prisma/schema.prisma', schema);
  }

  // Tạo layout chính
  createRootLayout() {
    const layout = `import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/Providers'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My Blog - Chia sẻ kiến thức và kinh nghiệm',
  description: 'Blog chia sẻ kiến thức về lập trình, công nghệ và cuộc sống',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  )
}`;

    this.writeFile('src/app/layout.tsx', layout);
  }

  // Tạo trang chủ
  createHomePage() {
    const page = `import { Hero } from '@/components/blog/Hero'
import { FeaturedPosts } from '@/components/blog/FeaturedPosts'
import { RecentPosts } from '@/components/blog/RecentPosts'
import { Newsletter } from '@/components/blog/Newsletter'

export default function HomePage() {
  return (
    <div>
      <Hero />
      <div className="container mx-auto px-4 py-8">
        <FeaturedPosts />
        <RecentPosts />
        <Newsletter />
      </div>
    </div>
  )
}`;

    this.writeFile('src/app/page.tsx', page);
  }

  // Tạo trang blog listing
  createBlogPage() {
    const page = `import { PostCard } from '@/components/blog/PostCard'
import { SearchBar } from '@/components/blog/SearchBar'
import { TagFilter } from '@/components/blog/TagFilter'
import { Pagination } from '@/components/ui/Pagination'
import { getPosts } from '@/lib/posts'

interface BlogPageProps {
  searchParams: {
    page?: string
    search?: string
    tag?: string
  }
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const page = parseInt(searchParams.page || '1')
  const search = searchParams.search || ''
  const tag = searchParams.tag || ''
  
  const { posts, totalPages } = await getPosts({
    page,
    search,
    tag,
    published: true
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-gray-600">Khám phá các bài viết mới nhất</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <SearchBar />
          <div className="grid gap-6 mt-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          <Pagination 
            currentPage={page}
            totalPages={totalPages}
            basePath="/blog"
          />
        </div>
        
        <div className="lg:w-1/3">
          <TagFilter />
        </div>
      </div>
    </div>
  )
}`;

    this.writeFile('src/app/blog/page.tsx', page);
  }

  // Tạo trang chi tiết bài viết
  createPostDetailPage() {
    const page = `import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { PostContent } from '@/components/blog/PostContent'
import { CommentSection } from '@/components/blog/CommentSection'
import { RelatedPosts } from '@/components/blog/RelatedPosts'
import { getPostBySlug, incrementPostViews } from '@/lib/posts'

interface PostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: 'Bài viết không tồn tại'
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.imageUrl ? [post.imageUrl] : [],
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug)
  
  if (!post || !post.published) {
    notFound()
  }

  // Tăng lượt xem
  await incrementPostViews(post.id)

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-4xl mx-auto">
        <PostContent post={post} />
        <CommentSection postId={post.id} />
      </article>
      <RelatedPosts currentPostId={post.id} tags={post.tags} />
    </div>
  )
}`;

    this.writeFile('src/app/blog/[slug]/page.tsx', page);
  }

  // Tạo API routes
  createApiRoutes() {
    // API Posts
    const postsApi = `import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')
  const search = searchParams.get('search') || ''
  const tag = searchParams.get('tag') || ''

  try {
    const where = {
      published: true,
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { content: { contains: search, mode: 'insensitive' } }
        ]
      }),
      ...(tag && {
        tags: {
          some: {
            name: tag
          }
        }
      })
    }

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        include: {
          author: { select: { name: true, email: true } },
          tags: true,
          _count: { select: { comments: true } }
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.post.count({ where })
    ])

    return NextResponse.json({
      posts,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Lỗi khi tải bài viết' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json(
      { error: 'Không có quyền truy cập' },
      { status: 401 }
    )
  }

  try {
    const body = await request.json()
    const { title, content, excerpt, slug, published, featured, imageUrl, tags } = body

    const post = await prisma.post.create({
      data: {
        title,
        content,
        excerpt,
        slug,
        published: published || false,
        featured: featured || false,
        imageUrl,
        authorId: session.user.id,
        tags: {
          connectOrCreate: tags?.map((tag: string) => ({
            where: { name: tag },
            create: { name: tag }
          })) || []
        }
      },
      include: {
        author: { select: { name: true } },
        tags: true
      }
    })

    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json(
      { error: 'Lỗi khi tạo bài viết' },
      { status: 500 }
    )
  }
}`;

    this.writeFile('src/app/api/posts/route.ts', postsApi);

    // API Comments
    const commentsApi = `import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const postId = searchParams.get('postId')

  if (!postId) {
    return NextResponse.json(
      { error: 'Post ID là bắt buộc' },
      { status: 400 }
    )
  }

  try {
    const comments = await prisma.comment.findMany({
      where: { postId },
      include: {
        author: { select: { name: true } }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(comments)
  } catch (error) {
    return NextResponse.json(
      { error: 'Lỗi khi tải bình luận' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return NextResponse.json(
      { error: 'Vui lòng đăng nhập để bình luận' },
      { status: 401 }
    )
  }

  try {
    const body = await request.json()
    const { content, postId } = body

    const comment = await prisma.comment.create({
      data: {
        content,
        postId,
        authorId: session.user.id
      },
      include: {
        author: { select: { name: true } }
      }
    })

    return NextResponse.json(comment)
  } catch (error) {
    return NextResponse.json(
      { error: 'Lỗi khi tạo bình luận' },
      { status: 500 }
    )
  }
}`;

    this.writeFile('src/app/api/comments/route.ts', commentsApi);
  }

  // Tạo components
  createComponents() {
    // Header component
    const header = `'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/Button'
import { Search, Menu, X } from 'lucide-react'
import { useState } from 'react'

export function Header() {
  const { data: session } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            MyBlog
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              Trang chủ
            </Link>
            <Link href="/blog" className="text-gray-600 hover:text-gray-900">
              Blog
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900">
              Về chúng tôi
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900">
              Liên hệ
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {session ? (
              <div className="flex items-center space-x-4">
                {session.user.role === 'ADMIN' && (
                  <Link href="/admin">
                    <Button variant="outline" size="sm">
                      Admin
                    </Button>
                  </Link>
                )}
                <span className="text-sm text-gray-600">
                  Xin chào, {session.user.name}
                </span>
                <Button
                  onClick={() => signOut()}
                  variant="outline"
                  size="sm"
                >
                  Đăng xuất
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/auth/login">
                  <Button variant="outline" size="sm">
                    Đăng nhập
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button size="sm">
                    Đăng ký
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-600">Trang chủ</Link>
              <Link href="/blog" className="text-gray-600">Blog</Link>
              <Link href="/about" className="text-gray-600">Về chúng tôi</Link>
              <Link href="/contact" className="text-gray-600">Liên hệ</Link>
              
              {session ? (
                <div className="flex flex-col space-y-2 pt-4 border-t">
                  {session.user.role === 'ADMIN' && (
                    <Link href="/admin">
                      <Button variant="outline" size="sm">Admin</Button>
                    </Link>
                  )}
                  <Button onClick={() => signOut()} variant="outline" size="sm">
                    Đăng xuất
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 pt-4 border-t">
                  <Link href="/auth/login">
                    <Button variant="outline" size="sm">Đăng nhập</Button>
                  </Link>
                  <Link href="/auth/register">
                    <Button size="sm">Đăng ký</Button>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}`;

    this.writeFile('src/components/layout/Header.tsx', header);

    // Button component
    const button = `import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
          {
            'bg-blue-600 text-white hover:bg-blue-700': variant === 'default',
            'border border-gray-300 bg-white hover:bg-gray-50': variant === 'outline',
            'hover:bg-gray-100': variant === 'ghost',
            'h-8 px-3 text-sm': size === 'sm',
            'h-10 px-4': size === 'md',
            'h-12 px-6 text-lg': size === 'lg',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

export { Button }`;

    this.writeFile('src/components/ui/Button.tsx', button);

    // PostCard component
    const postCard = `import Link from 'next/link'
import Image from 'next/image'
import { formatDate } from '@/lib/utils'
import { Eye, MessageCircle } from 'lucide-react'

interface PostCardProps {
  post: {
    id: string
    title: string
    slug: string
    excerpt?: string
    imageUrl?: string
    createdAt: Date
    views: number
    author: {
      name: string
    }
    tags: {
      name: string
    }[]
    _count: {
      comments: number
    }
  }
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {post.imageUrl && (
        <div className="relative h-48 w-full">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag.name}
              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
            >
              {tag.name}
            </span>
          ))}
        </div>

        <h2 className="text-xl font-bold mb-3 line-clamp-2">
          <Link 
            href={\`/blog/\${post.slug}\`}
            className="hover:text-blue-600 transition-colors"
          >
            {post.title}
          </Link>
        </h2>

        {post.excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {post.excerpt}
          </p>
        )}

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <span>Bởi {post.author.name}</span>
            <span>{formatDate(post.createdAt)}</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Eye size={16} />
              <span>{post.views}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle size={16} />
              <span>{post._count.comments}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}`;

    this.writeFile('src/components/blog/PostCard.tsx', postCard);
  }

  // Tạo utility functions
  createUtils() {
    const utils = `import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return format(dateObj, 'dd/MM/yyyy', { locale: vi })
}

export function formatDateRelative(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return format(dateObj, 'dd MMM yyyy', { locale: vi })
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/\s+/g, '-')
    .trim()
}

export function truncateText(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length) + '...'
}`;

    this.writeFile('src/lib/utils.ts', utils);

    // Database connection
    const prisma = `import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma`;

    this.writeFile('src/lib/prisma.ts', prisma);

    // Posts service
    const posts = `import { prisma } from './prisma'

export interface GetPostsParams {
  page?: number
  limit?: number
  search?: string
  tag?: string
  published?: boolean
  featured?: boolean
}

export async function getPosts(params: GetPostsParams = {}) {
  const {
    page = 1,
    limit = 10,
    search = '',
    tag = '',
    published,
    featured
  } = params

  const where = {
    ...(published !== undefined && { published }),
    ...(featured !== undefined && { featured }),
    ...(search && {
      OR: [
        { title: { contains: search, mode: 'insensitive' as const } },
        { content: { contains: search, mode: 'insensitive' as const } },
        { excerpt: { contains: search, mode: 'insensitive' as const } }
      ]
    }),
    ...(tag && {
      tags: {
        some: {
          name: { equals: tag, mode: 'insensitive' as const }
        }
      }
    })
  }

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        tags: true,
        _count: {
          select: {
            comments: true
          }
        }
      },
      orderBy: [
        { featured: 'desc' },
        { createdAt: 'desc' }
      ],
      skip: (page - 1) * limit,
      take: limit
    }),
    prisma.post.count({ where })
  ])

  return {
    posts,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page
  }
}

export async function getPostBySlug(slug: string) {
  return await prisma.post.findUnique({
    where: { slug },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true
        }
      },
      tags: true,
      comments: {
        include: {
          author: {
            select: {
              name: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      }
    }
  })
}

export async function incrementPostViews(postId: string) {
  return await prisma.post.update({
    where: { id: postId },
    data: {
      views: {
        increment: 1
      }
    }
  })
}

export async function getFeaturedPosts(limit: number = 3) {
  return await prisma.post.findMany({
    where: {
      published: true,
      featured: true
    },
    include: {
      author: {
        select: {
          name: true
        }
      },
      tags: true,
      _count: {
        select: {
          comments: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: limit
  })
}

export async function getRelatedPosts(currentPostId: string, tags: string[], limit: number = 3) {
  if (tags.length === 0) {
    return await prisma.post.findMany({
      where: {
        published: true,
        id: { not: currentPostId }
      },
      include: {
        author: {
          select: {
            name: true
          }
        },
        tags: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: limit
    })
  }

  return await prisma.post.findMany({
    where: {
      published: true,
      id: { not: currentPostId },
      tags: {
        some: {
          name: { in: tags }
        }
      }
    },
    include: {
      author: {
        select: {
          name: true
        }
      },
      tags: true
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: limit
  })
}`;

    this.writeFile('src/lib/posts.ts', posts);

    // Auth configuration
    const auth = `import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { prisma } from './prisma'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })

        if (!user) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!
        session.user.role = token.role as string
      }
      return session
    }
  },
  pages: {
    signIn: '/auth/login',
    signUp: '/auth/register'
  }
}`;

    this.writeFile('src/lib/auth.ts', auth);
  }

  // Tạo thêm components
  createMoreComponents() {
    // Hero component
    const hero = `'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'

export function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-6">
          Chào mừng đến với Blog của chúng tôi
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Khám phá những bài viết chất lượng về công nghệ, lập trình, 
          và nhiều chủ đề thú vị khác từ cộng đồng của chúng tôi.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/blog">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Khám phá Blog
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
          <Link href="/about">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              Tìm hiểu thêm
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}`;

    this.writeFile('src/components/blog/Hero.tsx', hero);

    // Featured Posts component
    const featuredPosts = `import { PostCard } from './PostCard'
import { getFeaturedPosts } from '@/lib/posts'

export async function FeaturedPosts() {
  const posts = await getFeaturedPosts(3)

  if (posts.length === 0) {
    return null
  }

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Bài viết nổi bật</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  )
}`;

    this.writeFile('src/components/blog/FeaturedPosts.tsx', featuredPosts);

    // Admin layout
    const adminLayout = `'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings,
  Plus
} from 'lucide-react'

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return

    if (!session || session.user.role !== 'ADMIN') {
      router.push('/auth/login')
    }
  }, [session, status, router])

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!session || session.user.role !== 'ADMIN') {
    return null
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
        </div>
        
        <nav className="mt-6">
          <Link 
            href="/admin" 
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100"
          >
            <LayoutDashboard className="mr-3" size={20} />
            Dashboard
          </Link>
          
          <Link 
            href="/admin/posts" 
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100"
          >
            <FileText className="mr-3" size={20} />
            Bài viết
          </Link>
          
          <Link 
            href="/admin/posts/new" 
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100"
          >
            <Plus className="mr-3" size={20} />
            Viết bài mới
          </Link>
          
          <Link 
            href="/admin/users" 
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100"
          >
            <Users className="mr-3" size={20} />
            Người dùng
          </Link>
          
          <Link 
            href="/admin/settings" 
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100"
          >
            <Settings className="mr-3" size={20} />
            Cài đặt
          </Link>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  )
}`;

    this.writeFile('src/components/admin/AdminLayout.tsx', adminLayout);

    // Login page
    const login = `'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      })

      if (result?.error) {
        toast.error('Email hoặc mật khẩu không đúng')
      } else {
        toast.success('Đăng nhập thành công!')
        router.push('/')
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Đăng nhập tài khoản
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Hoặc{' '}
            <Link href="/auth/register" className="font-medium text-blue-600 hover:text-blue-500">
              tạo tài khoản mới
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1"
                placeholder="your@email.com"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mật khẩu
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1"
                placeholder="••••••••"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </Button>
        </form>
      </div>
    </div>
  )
}`;

    this.writeFile('src/app/auth/login/page.tsx', login);

    // Input component
    const input = `import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'

export { Input }`;

    this.writeFile('src/components/ui/Input.tsx', input);
  }

  // Tạo config files
  createConfigFiles() {
    // Global CSS
    const globalCss = `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }
  
  body {
    font-family: var(--font-inter), sans-serif;
  }
}

@layer components {
  .line-clamp-1 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }
  
  .line-clamp-2 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  
  .line-clamp-3 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
}

/* Prose styles for blog content */
.prose {
  max-width: none;
}

.prose h1 {
  @apply text-3xl font-bold text-gray-900 mb-4;
}

.prose h2 {
  @apply text-2xl font-bold text-gray-900 mb-3 mt-8;
}

.prose h3 {
  @apply text-xl font-bold text-gray-900 mb-2 mt-6;
}

.prose p {
  @apply text-gray-700 mb-4 leading-relaxed;
}

.prose a {
  @apply text-blue-600 hover:text-blue-700 underline;
}

.prose ul {
  @apply list-disc pl-6 mb-4;
}

.prose ol {
  @apply list-decimal pl-6 mb-4;
}

.prose li {
  @apply mb-2;
}

.prose blockquote {
  @apply border-l-4 border-blue-500 pl-4 italic text-gray-600 mb-4;
}

.prose code {
  @apply bg-gray-100 px-2 py-1 rounded text-sm font-mono;
}

.prose pre {
  @apply bg-gray-900 text-white p-4 rounded-lg overflow-x-auto mb-4;
}

.prose pre code {
  @apply bg-transparent p-0;
}`;

    this.writeFile('src/app/globals.css', globalCss);

    // Environment variables
    const envExample = `# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Optional: External services
CLOUDINARY_URL="cloudinary://your-cloudinary-url"
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"`;

    this.writeFile('.env.example', envExample);

    // ESLint config
    const eslintConfig = {
      "extends": ["next/core-web-vitals"],
      "rules": {
        "no-unused-vars": "warn",
        "@typescript-eslint/no-unused-vars": "warn"
      }
    };

    this.writeFile('.eslintrc.json', JSON.stringify(eslintConfig, null, 2));

    // PostCSS config
    const postcssConfig = `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`;

    this.writeFile('postcss.config.js', postcssConfig);

    // Gitignore
    const gitignore = `# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/

# Next.js
.next/
out/

# Production
build/
dist/

# Misc
.DS_Store
*.pem

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Local env files
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Vercel
.vercel

# Typescript
*.tsbuildinfo
next-env.d.ts

# Database
*.db
*.db-journal
prisma/migrations/

# IDE
.vscode/
.idea/
*.swp
*.swo

# Logs
logs/
*.log`;

    this.writeFile('.gitignore', gitignore);
  }

  // Tạo README
  createReadme() {
    const readme = `# ${this.projectName}

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

\`\`\`bash
git clone <repository-url>
cd ${this.projectName}
\`\`\`

### 2. Cài đặt dependencies

\`\`\`bash
npm install
# hoặc
yarn install
\`\`\`

### 3. Cấu hình môi trường

\`\`\`bash
cp .env.example .env.local
\`\`\`

Chỉnh sửa file \`.env.local\`:

\`\`\`env
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
\`\`\`

### 4. Khởi tạo database

\`\`\`bash
npx prisma db push
npx prisma generate
\`\`\`

### 5. Tạo admin user (tùy chọn)

\`\`\`bash
npx prisma studio
\`\`\`

Hoặc tạo user qua API:

\`\`\`bash
curl -X POST http://localhost:3000/api/auth/register \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "admin@example.com",
    "password": "admin123",
    "name": "Admin",
    "role": "ADMIN"
  }'
\`\`\`

### 6. Chạy ứng dụng

\`\`\`bash
npm run dev
# hoặc
yarn dev
\`\`\`

Mở [http://localhost:3000](http://localhost:3000) để xem kết quả.

## Cấu trúc thư mục

\`\`\`
${this.projectName}/
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
\`\`\`

## API Endpoints

### Posts
- \`GET /api/posts\` - Lấy danh sách bài viết
- \`POST /api/posts\` - Tạo bài viết mới
- \`GET /api/posts/[id]\` - Lấy chi tiết bài viết
- \`PUT /api/posts/[id]\` - Cập nhật bài viết
- \`DELETE /api/posts/[id]\` - Xóa bài viết

### Comments
- \`GET /api/comments?postId=[id]\` - Lấy bình luận
- \`POST /api/comments\` - Tạo bình luận mới

### Auth
- \`POST /api/auth/register\` - Đăng ký
- \`POST /api/auth/login\` - Đăng nhập

## Deploy

### Vercel (Khuyến nghị)

1. Push code lên GitHub
2. Import project vào Vercel
3. Cấu hình environment variables
4. Deploy

### Docker

\`\`\`bash
docker build -t ${this.projectName} .
docker run -p 3000:3000 ${this.projectName}
\`\`\`

## Đóng góp

1. Fork project
2. Tạo feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to branch (\`git push origin feature/AmazingFeature\`)
5. Tạo Pull Request

## License

MIT License - xem file [LICENSE](LICENSE) để biết thêm chi tiết.

## Hỗ trợ

Nếu bạn gặp vấn đề, hãy tạo issue trên GitHub hoặc liên hệ qua email.

---

Made with ❤️ by [Your Name]
\`\`\``;

    this.writeFile('README.md', readme);
  }

  // Utility function để ghi file
  writeFile(filePath, content) {
    const fullPath = path.join(this.rootDir, filePath);
    const dir = path.dirname(fullPath);
    
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(fullPath, content);
    console.log(`Created: ${filePath}`);
  }

  // Hàm chính để tạo toàn bộ project
  async generate() {
    console.log(`🚀 Bắt đầu tạo blog project: ${this.projectName}`);
    
    try {
      this.createDirectories();
      this.createPackageJson();
      this.createNextConfig();
      this.createTailwindConfig();
      this.createTsConfig();
      this.createPrismaSchema();
      this.createRootLayout();
      this.createHomePage();
      this.createBlogPage();
      this.createPostDetailPage();
      this.createApiRoutes();
      this.createComponents();
      this.createUtils();
      this.createMoreComponents();
      this.createConfigFiles();
      this.createReadme();
      
      console.log(`\n✅ Hoàn thành! Blog project đã được tạo tại: ${this.rootDir}`);
      console.log(`\n📝 Các bước tiếp theo:`);
      console.log(`1. cd ${this.projectName}`);
      console.log(`2. npm install`);
      console.log(`3. cp .env.example .env.local`);
      console.log(`4. npx prisma db push`);
      console.log(`5. npm run dev`);
      console.log(`\n🎉 Chúc bạn coding vui vẻ!`);
      
    } catch (error) {
      console.error('❌ Lỗi khi tạo project:', error);
    }
  }
}

// Sử dụng script
const args = process.argv.slice(2);
const projectName = args[0] || 'my-blog';

const generator = new BlogGenerator(projectName);
generator.generate();