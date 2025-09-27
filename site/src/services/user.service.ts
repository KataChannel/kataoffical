import apiClient from '@/lib/api'
import { User, SearchParams, ApiResponse } from '@/types'

export const userService = {
  // Authentication
  async login(credentials: { SDT: string; password: string }) {
    const response = await apiClient.post('/users/login', credentials)
    return response.data
  },

  async loginWithGoogle(googleUser: any) {
    const response = await apiClient.post('/users/loginbygoogle', googleUser)
    return response.data
  },

  async register(userData: any) {
    const response = await apiClient.post('/users/register', userData)
    return response.data
  },

  async getProfile(): Promise<User> {
    const response = await apiClient.get('/users/profile')
    return response.data
  },

  async updateProfile(userData: Partial<User>) {
    const response = await apiClient.put('/users/profile', userData)
    return response.data
  },

  async resetPassword(data: { SDT?: string; email?: string }) {
    const response = await apiClient.post('/users/reset-password', data)
    return response.data
  },

  // Admin functions
  async getAllUsers(params: SearchParams): Promise<ApiResponse<User>> {
    const response = await apiClient.get('/users', { params })
    return response.data
  },

  async getUserById(id: string): Promise<User> {
    const response = await apiClient.get(`/users/${id}`)
    return response.data
  },

  async createUser(userData: any): Promise<User> {
    const response = await apiClient.post('/users', userData)
    return response.data
  },

  async updateUser(id: string, userData: any): Promise<User> {
    const response = await apiClient.put(`/users/${id}`, userData)
    return response.data
  },

  async deleteUser(id: string): Promise<void> {
    await apiClient.delete(`/users/${id}`)
  },
}