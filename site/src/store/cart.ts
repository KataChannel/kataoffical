import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem, Product } from '@/types'

interface CartState {
  items: CartItem[]
  isOpen: boolean
  
  // Actions
  addItem: (product: Product, quantity?: number) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, quantity = 1) => {
        const { items } = get()
        
        // Lấy giá mặc định
        const defaultPrice = product.Giagoc?.find(p => p.default) || product.Giagoc?.[0]
        
        if (!defaultPrice) return

        const existingItem = items.find(item => item.id === product.id)
        
        if (existingItem) {
          // Cập nhật số lượng
          set({
            items: items.map(item =>
              item.id === product.id
                ? {
                    ...item,
                    Soluong: item.Soluong + quantity,
                    Tongtien: (item.Soluong + quantity) * item.gia
                  }
                : item
            )
          })
        } else {
          // Thêm item mới
          const newItem: CartItem = {
            id: product.id,
            Title: product.Title,
            Image: product.Image?.Main || product.Image?.Hinhchinh?.src,
            Soluong: quantity,
            gia: defaultPrice.gia,
            khoiluong: defaultPrice.khoiluong,
            dvt: defaultPrice.dvt,
            Tongtien: quantity * defaultPrice.gia
          }
          
          set({ items: [...items, newItem] })
        }
      },

      removeItem: (itemId) => {
        set({
          items: get().items.filter(item => item.id !== itemId)
        })
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId)
          return
        }

        set({
          items: get().items.map(item =>
            item.id === itemId
              ? {
                  ...item,
                  Soluong: quantity,
                  Tongtien: quantity * item.gia
                }
              : item
          )
        })
      },

      clearCart: () => {
        set({ items: [] })
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.Soluong, 0)
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.Tongtien, 0)
      },

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set({ isOpen: !get().isOpen }),
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items }),
    }
  )
)