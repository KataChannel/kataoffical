'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search, ShoppingCart, Menu, Phone, User, LogOut } from 'lucide-react'
import { useAuthStore } from '@/store/auth'
import { useCartStore } from '@/store/cart'
import { categoryService } from '@/services/category.service'
import { productService } from '@/services/product.service'
import { Category, Product } from '@/types'
import { getImageSrc, formatNumber } from '@/lib/utils'
import SearchDialog from '@/components/ui/SearchDialog'
import MobileMenu from '@/components/ui/MobileMenu'

export default function Header() {
  const [isSticky, setIsSticky] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const { user, isAuthenticated, logout } = useAuthStore()
  const { items, getTotalItems, getTotalPrice } = useCartStore()

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 80)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Load categories for menu
    const loadCategories = async () => {
      try {
        const data = await categoryService.getCategoryTree()
        setCategories(data)
      } catch (error) {
        console.error('Failed to load categories:', error)
      }
    }
    
    loadCategories()
  }, [])

  const handleSearch = async (query: string) => {
    if (query.length < 2) {
      setSearchResults([])
      return
    }

    setIsSearching(true)
    try {
      const result = await productService.searchProducts({
        Query: query,
        Status: 1,
        pageSize: 12,
        pageNumber: 0
      })
      setSearchResults(result.items)
    } catch (error) {
      console.error('Search failed:', error)
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  const getUserImageSrc = (): string => {
    if (!user?.Image) return '/assets/images/noimage.png'
    
    if (user.Image.Main) {
      if (user.Image.Main.startsWith('http')) {
        return user.Image.Main
      }
      return `/assets/images/${user.Image.Main}`
    }
    
    if (user.Image.Hinhchinh?.src) {
      return user.Image.Hinhchinh.src
    }
    
    return '/assets/images/noimage.png'
  }

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

  const menus = [
    { id: 1, Title: 'Về Chúng Tôi', Slug: '/blog/gioi-thieu/ve-chung-toi' },
    {
      id: 2, 
      Title: 'Sản Phẩm', 
      Slug: '/danh-muc', 
      children: categories
    },
    { id: 3, Title: 'Khuyến Mãi', Slug: '/blog/khuyen-mai' },
    { id: 4, Title: 'Món Ngon', Slug: '/blog/mon-ngon-moi-ngay' },
    { id: 5, Title: 'Tin tức', Slug: '/blog/tin-tuc' },
    { id: 6, Title: 'Liên hệ', Slug: '/lien-he' },
  ]

  return (
    <>
      <div className={`relative lg:bg-[#57A345] bg-white transition-all duration-300 ${isSticky ? 'fixed top-0 left-0 right-0 z-50 shadow-lg' : ''}`}>
        {/* Desktop Header */}
        <div className="lg:block hidden w-full h-full">
          <div className="h-full grid grid-cols-11">
            <div className="bg-white my-1"></div>
            
            {/* Logo */}
            <Link href="/" className="col-span-3 p-2 flex items-center justify-end pe-10 me-4 rounded-r-full bg-white my-1">
              <Image 
                src="/assets/images/logo-full.png" 
                alt="Rau Sạch Trần Gia"
                width={200}
                height={80}
                className="max-h-20 w-auto"
              />
            </Link>
            
            {/* Navigation & Search */}
            <div className="col-span-5 flex flex-col space-y-2 py-2 cursor-pointer justify-center">
              <div className="flex flex-row space-x-16 items-center">
                <div className="hidden lg:flex flex-row space-x-3 text-white">
                  {menus.map((item) => (
                    <div key={item.id} className="group relative">
                      <Link
                        href={item.Slug}
                        className="flex flex-row items-center header-link py-2 font-semibold uppercase transition-all hover:text-[#FAA61A]"
                      >
                        {item.Title}
                        {item.children && (
                          <span className="material-symbols-outlined ml-1">expand_more</span>
                        )}
                      </Link>
                      
                      {/* Mega Menu for Products */}
                      {item.id === 2 && item.children && (
                        <div className="absolute w-[80vw] -translate-x-1/2 left-1/2 text-black z-10 hidden group-hover:grid border rounded-lg grid-cols-3 gap-4 bg-white p-4 shadow-lg">
                          {item.children.map((category) => (
                            <div key={category.id} className="flex flex-row space-x-2 items-center py-2">
                              <Image
                                src={getCategoryImageSrc(category)}
                                alt={category.Title}
                                width={40}
                                height={40}
                                className="h-10 w-10 object-cover rounded"
                              />
                              <Link 
                                href={`/danh-muc/${category.Slug}`}
                                className="hover:text-[#57A345] transition-colors duration-200"
                              >
                                {category.Title}
                              </Link>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Phone & Search */}
              <div className="flex flex-row space-x-2 items-center w-full">
                <Phone className="text-[#FAA61A] border-2 border-[#FAA61A] rounded-full p-2 w-10 h-10" />
                <Link href="tel:0865770009" className="text-[#FAA61A] font-bold text-lg">
                  0865.77.0009
                </Link>
                <div className="relative w-1/2">
                  <input
                    type="text"
                    onClick={() => setSearchOpen(true)}
                    className="w-full py-2 px-4 pe-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                    placeholder="Tìm Kiếm"
                    readOnly
                  />
                  <div 
                    className="absolute inset-y-0 end-0 flex items-center pe-3 cursor-pointer"
                    onClick={() => setSearchOpen(true)}
                  >
                    <Search className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* User & Cart */}
            <div className="col-span-2 flex flex-col space-y-3 py-2 justify-center">
              <div className="justify-start items-center">
                {isAuthenticated && user ? (
                  <div className="mx-2 flex flex-row space-x-2 items-center text-white">
                    <Link href="/profile">
                      <Image
                        src={getUserImageSrc()}
                        alt={user.Hoten || 'User'}
                        width={40}
                        height={40}
                        className="rounded-full w-10 h-10 border object-cover"
                      />
                    </Link>
                    <button 
                      onClick={logout}
                      className="underline hover:text-[#FAA61A] transition-colors"
                    >
                      Đăng Xuất
                    </button>
                  </div>
                ) : (
                  <div className="hidden lg:flex flex-row space-x-2 items-center text-white">
                    <Link href="/dangnhap" className="px-2 underline hover:text-[#FAA61A] transition-colors">
                      Đăng Nhập
                    </Link>
                  </div>
                )}
              </div>
              
              {/* Cart */}
              <div className="flex flex-row space-x-1 items-center w-full">
                <div className="relative">
                  <Link href="/don-hang">
                    <ShoppingCart className="w-6 h-6 text-white" />
                    {getTotalItems() > 0 && (
                      <span className="absolute font-bold -top-1 right-0 bg-white text-red-500 text-xs px-2 py-1 rounded-full min-w-[20px] text-center">
                        {formatNumber(getTotalItems())}
                      </span>
                    )}
                  </Link>
                </div>
                <Link href="/don-hang" className="text-white text-sm">
                  {formatNumber(getTotalPrice())}đ
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Header */}
        <div className="lg:hidden flex flex-col w-full h-full">
          <div className="w-full flex flex-row justify-between items-center px-4 py-2">
            <button onClick={() => setMobileMenuOpen(true)}>
              <Menu className="w-6 h-6 text-[#E1232A]" />
            </button>
            
            <Link href="/" className="p-2">
              <Image 
                src="/assets/images/logo-full.png" 
                alt="Rau Sạch Trần Gia"
                width={120}
                height={48}
                className="max-h-12 w-auto"
              />
            </Link>
            
            <div className="flex flex-row space-x-2 items-center">
              <div className="relative">
                <Link href="/don-hang">
                  <ShoppingCart className="w-6 h-6 text-[#E1232A]" />
                  {getTotalItems() > 0 && (
                    <span className="absolute font-bold -top-1 right-0 bg-[#E1232A] text-white text-xs px-2 py-1 rounded-full min-w-[20px] text-center">
                      {formatNumber(getTotalItems())}
                    </span>
                  )}
                </Link>
              </div>
              <Link href="/don-hang" className="text-[#E1232A] text-sm">
                {formatNumber(getTotalPrice())}đ
              </Link>
            </div>
          </div>
          
          {/* Mobile Contact & Search */}
          <div className="flex flex-row space-x-2 items-center justify-between w-full bg-[#57A345] p-2">
            <Phone className="text-[#FAA61A] border-2 border-[#FAA61A] rounded-full p-2 w-10 h-10" />
            <Link href="tel:0865770009" className="text-[#FAA61A] font-bold text-lg">
              0865.77.0009
            </Link>
            <div className="relative w-1/2">
              <input
                type="text"
                onClick={() => setSearchOpen(true)}
                className="w-full py-2 px-4 pe-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 cursor-pointer"
                placeholder="Tìm Kiếm"
                readOnly
              />
              <div 
                className="absolute inset-y-0 end-0 flex items-center pe-3 cursor-pointer"
                onClick={() => setSearchOpen(true)}
              >
                <Search className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
          
          {/* Mobile Auth Links */}
          <div className="flex flex-row space-x-4 font-bold text-[#E1232A] items-center justify-center bg-gray-100 py-2">
            {isAuthenticated ? (
              <button onClick={logout} className="hover:text-[#C51D23] transition-colors">
                Đăng Xuất
              </button>
            ) : (
              <>
                <Link href="/dangnhap" className="hover:text-[#C51D23] transition-colors">
                  Đăng Nhập
                </Link>
                <span>|</span>
                <Link href="/dangky" className="hover:text-[#C51D23] transition-colors">
                  Đăng Ký
                </Link>
              </>
            )}
            <span>|</span>
            <Link href="/don-hang" className="hover:text-[#C51D23] transition-colors">
              Giỏ Hàng
            </Link>
          </div>
        </div>
      </div>
      
      {/* Search Dialog */}
      <SearchDialog 
        open={searchOpen}
        onOpenChange={setSearchOpen}
        onSearch={handleSearch}
        results={searchResults}
        isLoading={isSearching}
      />
      
      {/* Mobile Menu */}
      <MobileMenu 
        open={mobileMenuOpen}
        onOpenChange={setMobileMenuOpen}
        menus={menus}
        user={user}
        isAuthenticated={isAuthenticated}
        onLogout={logout}
      />
    </>
  )
}