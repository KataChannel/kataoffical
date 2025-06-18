import { prisma } from './prisma'

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
}