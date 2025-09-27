'use client'

import { useState } from 'react'
import { X, Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/types'
import { getImageSrc, formatNumber } from '@/lib/utils'
import { useCartStore } from '@/store/cart'

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSearch: (query: string) => void
  results: Product[]
  isLoading: boolean
}

export default function SearchDialog({ 
  open, 
  onOpenChange, 
  onSearch, 
  results, 
  isLoading 
}: SearchDialogProps) {
  const [query, setQuery] = useState('')
  const { addItem } = useCartStore()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    onSearch(value)
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

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2 flex-1">
            <Search className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={query}
              onChange={handleInputChange}
              placeholder="Tìm kiếm sản phẩm..."
              className="flex-1 outline-none text-lg"
              autoFocus
            />
          </div>
          <button
            onClick={() => onOpenChange(false)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Results */}
        <div className="flex-1 overflow-auto p-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#57A345]"></div>
            </div>
          ) : results.length > 0 ? (
            <div className="grid lg:grid-cols-4 grid-cols-2 gap-4">
              {results.map((product) => (
                <div key={product.id} className="border rounded-lg p-3 bg-white hover:shadow-lg transition-shadow">
                  <Link 
                    href={`/san-pham/${product.Slug}`}
                    onClick={() => onOpenChange(false)}
                    className="block"
                  >
                    <div className="aspect-square relative mb-2">
                      <Image
                        src={getProductImageSrc(product)}
                        alt={product.Title}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <h3 className="font-bold text-sm line-clamp-2 mb-2">{product.Title}</h3>
                    {product.Mota && (
                      <p className="text-gray-400 text-xs line-clamp-2 mb-2">
                        {product.Mota.replace(/<[^>]*>/g, '')}
                      </p>
                    )}
                  </Link>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-[#E1232A] font-bold text-sm">
                      {formatNumber(product.giagoc || 0)}đ
                      {product.dvt && <span className="text-xs text-gray-500">/{product.dvt}</span>}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleAddToCart(product)
                      }}
                      className="bg-[#57A345] hover:bg-[#4a8f39] text-white p-2 rounded transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : query.length > 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Không tìm thấy sản phẩm nào</p>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">Nhập từ khóa để tìm kiếm</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}