'use client'

import { useEffect, useState } from 'react'
import { productService } from '@/services/product.service'
import { categoryService } from '@/services/category.service'
import { Product, Category } from '@/types'
import ProductSlider from '@/components/ui/ProductSlider'
import CategorySection from '@/components/ui/CategorySection'
import Hero from '@/components/ui/Hero'

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)
        
        // Load featured products
        const productsResult = await productService.getProducts({
          Status: 1,
          pageSize: 12,
          pageNumber: 0
        })
        setFeaturedProducts(productsResult.items)

        // Load categories
        const categoriesData = await categoryService.getCategoryTree()
        setCategories(categoriesData)
        
      } catch (error) {
        console.error('Failed to load homepage data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#57A345]"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <Hero />
      
      {/* Categories Section */}
      {categories.length > 0 && (
        <section className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Danh Mục Sản Phẩm</h2>
          <CategorySection categories={categories} />
        </section>
      )}
      
      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Sản Phẩm Nổi Bật</h2>
          <ProductSlider products={featuredProducts} />
        </section>
      )}
      
      {/* Call to Action */}
      <section className="bg-[#57A345] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Rau Sạch Chất Lượng Cao</h2>
          <p className="text-xl mb-8">Cam kết tươi ngon, an toàn cho sức khỏe</p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Chất Lượng Đảm Bảo</h3>
              <p>Rau sạch, không thuốc trừ sâu</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  <path d="M3 4a1 1 0 00-1 1v1a1 1 0 001 1h1a1 1 0 001-1V5a1 1 0 00-1-1H3zM3 10a1 1 0 00-1 1v1a1 1 0 001 1h1a1 1 0 001-1v-1a1 1 0 00-1-1H3zM3 16a1 1 0 00-1 1v1a1 1 0 001 1h1a1 1 0 001-1v-1a1 1 0 00-1-1H3zM7 4a1 1 0 000 2h11a1 1 0 100-2H7zM7 10a1 1 0 000 2h11a1 1 0 100-2H7zM7 16a1 1 0 000 2h11a1 1 0 100-2H7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Giao Hàng Nhanh</h3>
              <p>Giao hàng tận nơi trong ngày</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Giá Cả Hợp Lý</h3>
              <p>Giá tốt nhất thị trường</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}