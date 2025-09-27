import Image from 'next/image'
import Link from 'next/link'
import { Category } from '@/types'
import { getImageSrc } from '@/lib/utils'

interface CategorySectionProps {
  categories: Category[]
}

export default function CategorySection({ categories }: CategorySectionProps) {
  const getCategoryImageSrc = (category: Category): string => {
    if (!category.Image) return '/assets/images/noimage.png'
    
    if (category.Image.Thumb) {
      return getImageSrc(category.Image.Thumb, 'thumb')
    }
    
    if (category.Image.Hinhchinh?.src) {
      return category.Image.Hinhchinh.src
    }
    
    return '/assets/images/noimage.png'
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/danh-muc/${category.Slug}`}
          className="group text-center"
        >
          <div className="aspect-square relative rounded-full overflow-hidden mb-3 bg-gray-100 group-hover:shadow-lg transition-shadow">
            <Image
              src={getCategoryImageSrc(category)}
              alt={category.Title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <h3 className="font-medium text-sm group-hover:text-[#57A345] transition-colors">
            {category.Title}
          </h3>
        </Link>
      ))}
    </div>
  )
}