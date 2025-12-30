import { createSlice } from "@reduxjs/toolkit"

interface Product {
  id: number
  name: string
  price: number
  rating: number
  reviews: number
}

interface PopularProductsState {
  products: Product[]
}

const initialState: PopularProductsState = {
  products: [
    { id: 3, name: "Digital Smart Watch", price: 18999, rating: 4.9, reviews: 156 },
    { id: 5, name: "Chronograph Steel Watch", price: 22999, rating: 4.9, reviews: 167 },
    { id: 1, name: "Elegant Leather Watch", price: 15999, rating: 4.8, reviews: 124 },
    { id: 6, name: "Premium Tote Bag", price: 11999, rating: 4.8, reviews: 112 },
  ],
}

const popularProductsSlice = createSlice({
  name: "popularProducts",
  initialState,
  reducers: {},
})

export default popularProductsSlice.reducer
