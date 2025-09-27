import apiClient from '@/lib/api'
import { Product, SearchParams, ApiResponse } from '@/types'

export const productService = {
  async getProducts(params: SearchParams): Promise<ApiResponse<Product>> {
    const response = await apiClient.get('/sanpham', { params })
    return response.data
  },

  async getProductById(id: string): Promise<Product> {
    const response = await apiClient.get(`/sanpham/${id}`)
    return response.data
  },

  async getProductBySlug(slug: string): Promise<Product> {
    const response = await apiClient.get(`/sanpham/slug/${slug}`)
    return response.data
  },

  async searchProducts(params: SearchParams & { Query?: string }): Promise<ApiResponse<Product>> {
    const response = await apiClient.get('/sanpham/search', { params })
    return response.data
  },

  async getFeaturedProducts(): Promise<Product[]> {
    const response = await apiClient.get('/sanpham/featured')
    return response.data
  },

  async getRelatedProducts(productId: string): Promise<Product[]> {
    const response = await apiClient.get(`/sanpham/${productId}/related`)
    return response.data
  },

  // Admin functions
  async createProduct(productData: any): Promise<Product> {
    const response = await apiClient.post('/sanpham', productData)
    return response.data
  },

  async updateProduct(id: string, productData: any): Promise<Product> {
    const response = await apiClient.put(`/sanpham/${id}`, productData)
    return response.data
  },

  async deleteProduct(id: string): Promise<void> {
    await apiClient.delete(`/sanpham/${id}`)
  },

  async uploadImage(file: File): Promise<{ url: string }> {
    const formData = new FormData()
    formData.append('file', file)
    
    const response = await apiClient.post('/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    
    return response.data
  },
}