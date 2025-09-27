'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/store/auth'

export function Providers({ children }: { children: React.ReactNode }) {
  const checkAuth = useAuthStore((state) => state.checkAuth)

  useEffect(() => {
    // Kiểm tra authentication khi app load
    checkAuth()
  }, [checkAuth])

  return <>{children}</>
}