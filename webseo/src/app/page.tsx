import { Hero } from '@/components/blog/Hero'
import { FeaturedPosts } from '@/components/blog/FeaturedPosts'
import { Newsletter } from '@/components/blog/Newsletter'
import { RecentPosts } from '@/components/blog/RecentPosts'

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
}