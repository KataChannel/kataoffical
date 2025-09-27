import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import Cookies from 'js-cookie'
import { User, AuthResponse } from '@/types'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  
  // Actions
  login: (credentials: { SDT: string; password: string }) => Promise<AuthResponse>
  loginWithGoogle: (googleUser: any) => Promise<AuthResponse>
  logout: () => void
  checkAuth: () => void
  getProfile: () => Promise<User | null>
  setUser: (user: User) => void
  setToken: (token: string) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (credentials) => {
        set({ isLoading: true })
        
        try {
          const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
          })

          const data = await response.json()
          
          if (data[0] === 200) {
            const { access_token, user } = data[1]
            
            set({
              user,
              token: access_token,
              isAuthenticated: true,
              isLoading: false,
            })
            
            Cookies.set('token', access_token, { expires: 7 })
            
            return { success: true, access_token, user }
          } else {
            set({ isLoading: false })
            return { success: false, message: data[1] }
          }
        } catch (error) {
          set({ isLoading: false })
          return { success: false, message: 'Đăng nhập thất bại' }
        }
      },

      loginWithGoogle: async (googleUser) => {
        set({ isLoading: true })
        
        try {
          const response = await fetch('/api/users/loginbygoogle', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(googleUser),
          })

          const data = await response.json()
          
          if (data[0]) {
            const { access_token, user } = data[1]
            
            set({
              user,
              token: access_token,
              isAuthenticated: true,
              isLoading: false,
            })
            
            Cookies.set('token', access_token, { expires: 7 })
            
            return { success: true, access_token, user }
          } else {
            set({ isLoading: false })
            return { success: false, message: data[1] }
          }
        } catch (error) {
          set({ isLoading: false })
          return { success: false, message: 'Đăng nhập Google thất bại' }
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        })
        
        Cookies.remove('token')
        
        // Reload trang để clear state
        if (typeof window !== 'undefined') {
          window.location.href = '/'
        }
      },

      checkAuth: () => {
        const token = Cookies.get('token')
        
        if (token) {
          try {
            // Decode JWT để kiểm tra expiry
            const payload = JSON.parse(atob(token.split('.')[1]))
            const currentTime = Math.floor(Date.now() / 1000)
            
            if (payload.exp > currentTime) {
              set({
                token,
                isAuthenticated: true,
              })
              
              // Load user profile
              get().getProfile()
            } else {
              get().logout()
            }
          } catch (error) {
            get().logout()
          }
        }
      },

      getProfile: async () => {
        const { token } = get()
        
        if (!token) return null

        try {
          const response = await fetch('/api/users/profile', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          })

          if (response.ok) {
            const user = await response.json()
            set({ user })
            return user
          } else {
            get().logout()
            return null
          }
        } catch (error) {
          return null
        }
      },

      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
)