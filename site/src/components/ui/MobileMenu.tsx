'use client'

import { X, ChevronRight, LogOut } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { User, Category } from '@/types'

interface MenuItem {
  id: number
  Title: string
  Slug: string
  children?: Category[]
}

interface MobileMenuProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  menus: MenuItem[]
  user: User | null
  isAuthenticated: boolean
  onLogout: () => void
}

export default function MobileMenu({ 
  open, 
  onOpenChange, 
  menus, 
  user, 
  isAuthenticated, 
  onLogout 
}: MobileMenuProps) {
  const [expandedMenus, setExpandedMenus] = useState<Set<number>>(new Set())

  const toggleMenu = (menuId: number) => {
    const newExpanded = new Set(expandedMenus)
    if (newExpanded.has(menuId)) {
      newExpanded.delete(menuId)
    } else {
      newExpanded.add(menuId)
    }
    setExpandedMenus(newExpanded)
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

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50"
        onClick={() => onOpenChange(false)}
      />
      
      {/* Menu */}
      <div className="fixed left-0 top-0 bottom-0 w-80 bg-white shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <Link href="/" onClick={() => onOpenChange(false)}>
            <Image 
              src="/assets/images/logo.webp" 
              alt="Rau Sạch Trần Gia"
              width={80}
              height={40}
              className="h-10 w-auto"
            />
          </Link>
          <button
            onClick={() => onOpenChange(false)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Navigation */}
        <div className="flex-1 overflow-auto">
          {menus.map((menu) => (
            <div key={menu.id}>
              <div className="flex items-center">
                <Link
                  href={menu.Slug}
                  onClick={() => onOpenChange(false)}
                  className="flex-1 px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  {menu.Title}
                </Link>
                {menu.children && menu.children.length > 0 && (
                  <button
                    onClick={() => toggleMenu(menu.id)}
                    className="p-3 hover:bg-gray-50"
                  >
                    <ChevronRight 
                      className={`w-5 h-5 transition-transform ${
                        expandedMenus.has(menu.id) ? 'rotate-90' : ''
                      }`} 
                    />
                  </button>
                )}
              </div>
              
              {/* Submenu */}
              {menu.children && expandedMenus.has(menu.id) && (
                <div className="bg-gray-50">
                  {menu.children.map((child) => (
                    <Link
                      key={child.id}
                      href={`/danh-muc/${child.Slug}`}
                      onClick={() => onOpenChange(false)}
                      className="block px-8 py-2 text-sm hover:bg-gray-100 transition-colors"
                    >
                      {child.Title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* User Section */}
        <div className="border-t p-4">
          {isAuthenticated && user ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Image
                  src={getUserImageSrc()}
                  alt={user.Hoten || 'User'}
                  width={40}
                  height={40}
                  className="rounded-full w-10 h-10 border object-cover"
                />
                <span className="font-bold">{user.Hoten || 'Guest'}</span>
              </div>
              <button
                onClick={() => {
                  onLogout()
                  onOpenChange(false)
                }}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="flex space-x-2">
              <Link
                href="/dangnhap"
                onClick={() => onOpenChange(false)}
                className="flex-1 p-2 border rounded-full bg-slate-200 text-blue-500 hover:bg-blue-500 hover:text-white text-center transition-colors"
              >
                Đăng Nhập
              </Link>
              <Link
                href="/dangky"
                onClick={() => onOpenChange(false)}
                className="flex-1 p-2 border rounded-full bg-slate-200 text-blue-500 hover:bg-blue-500 hover:text-white text-center transition-colors"
              >
                Đăng Ký
              </Link>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="text-gray-400 text-sm text-center p-4 border-t">
          <p>© Copyright {new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  )
}