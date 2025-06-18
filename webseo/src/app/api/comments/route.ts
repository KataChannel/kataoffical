import { NextRequest, NextResponse } from 'next/server'
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
}