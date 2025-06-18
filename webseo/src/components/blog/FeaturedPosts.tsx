import { PostCard } from './PostCard'
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
        {/* {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))} */}
      </div>
    </section>
  )
}