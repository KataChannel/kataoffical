import apiClient from '@/lib/api'
import { Category, SearchParams, ApiResponse } from '@/types'

export const categoryService = {
  async getCategories(params: SearchParams): Promise<ApiResponse<Category>> {
    const response = await apiClient.get('/danhmuc', { params })
    return response.data
  },

  async getCategoryById(id: string): Promise<Category> {
    const response = await apiClient.get(`/danhmuc/${id}`)
    return response.data
  },

  async getCategoryBySlug(slug: string): Promise<Category> {
    const response = await apiClient.get(`/danhmuc/slug/${slug}`)
    return response.data
  },

  async getCategoryTree(): Promise<Category[]> {
    const params = {
      Status: 1,
      pageSize: 100,
      pageNumber: 0,
      Type: 'sanpham'
    }
    const response = await apiClient.get('/danhmuc', { params })
    return response.data.items || []
  },

  async getProductsByCategory(categorySlug: string, params: SearchParams): Promise<any> {
    const response = await apiClient.get(`/danhmuc/${categorySlug}/products`, { params })
    return response.data
  },

  // Admin functions
  async createCategory(categoryData: any): Promise<Category> {
    const response = await apiClient.post('/danhmuc', categoryData)
    return response.data
  },

  async updateCategory(id: string, categoryData: any): Promise<Category> {
    const response = await apiClient.put(`/danhmuc/${id}`, categoryData)
    return response.data
  },

  async deleteCategory(id: string): Promise<void> {
    await apiClient.delete(`/danhmuc/${id}`)
  },
}