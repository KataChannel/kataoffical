import { PostCard } from '@/components/blog/PostCard'
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
}