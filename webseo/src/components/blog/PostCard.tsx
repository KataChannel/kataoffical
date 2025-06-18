import Link from 'next/link'
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
            href={`/blog/${post.slug}`}
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
}