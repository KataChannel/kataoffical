// Base types
export interface User {
  id: string
  SDT: string
  email?: string
  Hoten?: string
  Image?: {
    Main?: string
    Hinhchinh?: {
      src?: string
    }
  }
  roles?: string[]
  gid?: string
}

export interface Category {
  id: string
  Title: string
  Slug: string
  Status: number
  Type: string
  Image?: {
    Main?: string
    Thumb?: string
    Hinhchinh?: {
      src?: string
    }
  }
  children?: Category[]
}

export interface Product {
  id: string
  Title: string
  Slug: string
  Mota?: string
  Status: number
  giagoc?: number
  dvt?: string
  Image?: {
    Main?: string
    Hinhchinh?: {
      src?: string
    }
  }
  Giagoc?: PriceOption[]
}

export interface PriceOption {
  id: string
  gia: number
  khoiluong: number
  dvt: string
  default: boolean
}

export interface CartItem {
  id: string
  Title: string
  Image?: string
  Soluong: number
  gia: number
  khoiluong: number
  dvt: string
  Tongtien: number
}

export interface Order {
  id?: string
  Khachhang?: User
  Giohangs?: CartItem[]
  Tongtien?: number
  Status?: number
  createdAt?: string
}

export interface SearchParams {
  Query?: string
  Status?: number
  pageSize?: number
  pageNumber?: number
  Type?: string
}

export interface ApiResponse<T> {
  items: T[]
  totalCount: number
  pageNumber: number
  pageSize: number
}

export interface AuthResponse {
  success: boolean
  access_token?: string
  user?: User
  message?: string
}