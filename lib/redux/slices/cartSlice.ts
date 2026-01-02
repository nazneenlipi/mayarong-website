import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  maxStock?: number
}

interface CartState {
  items: CartItem[]
}

// Load cart from localStorage if available
const loadCart = (): CartItem[] => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("maya_rang_cart")
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        console.error("Failed to parse cart from local storage", e)
      }
    }
  }
  return []
}

const initialState: CartState = {
  items: loadCart(),
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("maya_rang_cart", JSON.stringify(state.items))
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
      if (typeof window !== "undefined") {
        localStorage.setItem("maya_rang_cart", JSON.stringify(state.items))
      }
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find((item) => item.id === action.payload.id)
      if (item) {
        item.quantity = Math.max(1, action.payload.quantity)
        if (typeof window !== "undefined") {
          localStorage.setItem("maya_rang_cart", JSON.stringify(state.items))
        }
      }
    },
    clearCart: (state) => {
      state.items = []
      if (typeof window !== "undefined") {
        localStorage.removeItem("maya_rang_cart")
      }
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer
