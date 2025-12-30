import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface Rating {
  id: string
  productId: number
  userName: string
  rating: number
  title: string
  comment: string
  date: string
}

interface RatingsState {
  ratings: Rating[]
}

const initialState: RatingsState = {
  ratings: [
    {
      id: "1",
      productId: 1,
      userName: "Amira Khan",
      rating: 5,
      title: "Excellent quality",
      comment: "Best watch I have ever owned",
      date: "2025-01-15",
    },
    {
      id: "2",
      productId: 1,
      userName: "Samir Ahmed",
      rating: 4,
      title: "Very good",
      comment: "Great design and durability",
      date: "2025-01-10",
    },
    {
      id: "3",
      productId: 2,
      userName: "Fatima Hassan",
      rating: 5,
      title: "Perfect bag",
      comment: "Stylish and spacious",
      date: "2025-01-12",
    },
    {
      id: "4",
      productId: 3,
      userName: "Karim Ali",
      rating: 5,
      title: "Amazing smart watch",
      comment: "Features are amazing",
      date: "2025-01-08",
    },
  ],
}

const ratingsSlice = createSlice({
  name: "ratings",
  initialState,
  reducers: {
    addRating: (state, action: PayloadAction<Rating>) => {
      state.ratings.push(action.payload)
    },
    getRatingsByProduct: (state, action: PayloadAction<number>) => {
      return state.ratings.filter((r) => r.productId === action.payload)
    },
  },
})

export const { addRating } = ratingsSlice.actions
export default ratingsSlice.reducer
