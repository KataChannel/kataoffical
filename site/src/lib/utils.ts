import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price)
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('vi-VN').format(num)
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export function getImageSrc(
  imagePath: string | null | undefined,
  type: 'main' | 'thumb' | 'hinhchinh' = 'main'
): string {
  const placeholderImage = '/assets/images/noimage300x300.jpg'
  
  if (!imagePath || imagePath.trim() === '') {
    return placeholderImage
  }

  // Nếu là URL đầy đủ, trả về trực tiếp
  if (isValidUrl(imagePath)) {
    return imagePath
  }

  // Nếu bắt đầu với / hoặc assets, trả về trực tiếp
  if (imagePath.startsWith('/') || imagePath.startsWith('assets/')) {
    return imagePath
  }

  // Nếu không, thêm prefix dựa trên type
  if (type === 'main' || type === 'thumb') {
    return `/assets/images/sanpham/${imagePath}`
  }

  return imagePath
}

export function generateId(length: number = 8): string {
  return Math.random().toString(36).substring(2, length + 2)
}