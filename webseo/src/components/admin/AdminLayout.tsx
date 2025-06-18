'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings,
  Plus
} from 'lucide-react'

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return

    if (!session || session.user.role !== 'ADMIN') {
      router.push('/auth/login')
    }
  }, [session, status, router])

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!session || session.user.role !== 'ADMIN') {
    return null
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
        </div>
        
        <nav className="mt-6">
          <Link 
            href="/admin" 
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100"
          >
            <LayoutDashboard className="mr-3" size={20} />
            Dashboard
          </Link>
          
          <Link 
            href="/admin/posts" 
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100"
          >
            <FileText className="mr-3" size={20} />
            Bài viết
          </Link>
          
          <Link 
            href="/admin/posts/new" 
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100"
          >
            <Plus className="mr-3" size={20} />
            Viết bài mới
          </Link>
          
          <Link 
            href="/admin/users" 
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100"
          >
            <Users className="mr-3" size={20} />
            Người dùng
          </Link>
          
          <Link 
            href="/admin/settings" 
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100"
          >
            <Settings className="mr-3" size={20} />
            Cài đặt
          </Link>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  )
}