'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react'
import { Product } from '@/types'
import { getImageSrc, formatNumber } from '@/lib/utils'
import { useCartStore } from '@/store/cart'

interface ProductSliderProps {
  products: Product[]
}

export default function ProductSlider({ products }: ProductSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { addItem } = useCartStore()
  
  const itemsPerView = {
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5
  }
  
  const itemsToShow = itemsPerView.lg // Default for desktop
  const maxIndex = Math.max(0, products.length - itemsToShow)

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  const getProductImageSrc = (product: Product): string => {
    if (!product.Image) return '/assets/images/noimage300x300.jpg'
    
    if (product.Image.Main) {
      return getImageSrc(product.Image.Main, 'main')
    }
    
    if (product.Image.Hinhchinh?.src) {
      return product.Image.Hinhchinh.src
    }
    
    return '/assets/images/noimage300x300.jpg'
  }

  const handleAddToCart = (product: Product) => {
    addItem(product, 1)
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Không có sản phẩm nào</p>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Navigation Buttons */}
      {currentIndex > 0 && (
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}
      
      {currentIndex < maxIndex && (
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Products Grid */}
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}
        >
          {products.map((product) => (
            <div 
              key={product.id} 
              className="flex-shrink-0 px-2"
              style={{ width: `${100 / itemsToShow}%` }}
            >
              <div className="border rounded-lg p-4 bg-white hover:shadow-lg transition-shadow group">
                <Link href={`/san-pham/${product.Slug}`} className="block">
                  <div className="aspect-square relative mb-3 overflow-hidden rounded-lg bg-gray-100">
                    <Image
                      src={getProductImageSrc(product)}
                      alt={product.Title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <h3 className="font-semibold text-sm line-clamp-2 mb-2 group-hover:text-[#57A345] transition-colors">
                    {product.Title}
                  </h3>
                </Link>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[#E1232A] font-bold text-base">
                      {formatNumber(product.giagoc || 0)}đ
                    </div>
                    {product.dvt && (
                      <div className="text-xs text-gray-500">/{product.dvt}</div>
                    )}
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleAddToCart(product)
                    }}
                    className="bg-[#FAA61A] hover:bg-[#D89016] text-white p-2 rounded-full transition-colors"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      {maxIndex > 0 && (
        <div className="flex justify-center space-x-2 mt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-[#57A345]' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}