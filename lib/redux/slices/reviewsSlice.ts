import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Review {
  id: string
  name: string
  email: string
  rating: number
  comment: string
  imageUrl?: string
  createdAt: string
}

interface ReviewsState {
  reviews: Review[]
}

const initialState: ReviewsState = {
  reviews: [
    {
      id: "1",
      name: "Fatima Khan",
      email: "fatima@example.com",
      rating: 5,
      comment: "Amazing product quality! The watch is absolutely stunning and arrived on time.",
      imageUrl: "/watch-review.jpg",
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      name: "Amina Ahmed",
      email: "amina@example.com",
      rating: 4,
      comment: "Beautiful bag, premium quality. Very satisfied with my purchase!",
      imageUrl: "/bag-review.jpg",
      createdAt: new Date().toISOString(),
    },
  ],
}

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    addReview: (state, action: PayloadAction<Review>) => {
      state.reviews.unshift(action.payload)
    },
    deleteReview: (state, action: PayloadAction<string>) => {
      state.reviews = state.reviews.filter((r) => r.id !== action.payload)
    },
  },
})

export const { addReview, deleteReview } = reviewsSlice.actions
export default reviewsSlice.reducer
