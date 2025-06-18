import { NextRequest, NextResponse } from 'next/server'
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
}