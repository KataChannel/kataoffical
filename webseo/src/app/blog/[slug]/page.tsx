import { notFound } from 'next/navigation'
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
}