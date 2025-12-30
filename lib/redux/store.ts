import { configureStore } from "@reduxjs/toolkit"
import ratingsReducer from "./slices/ratingsSlice"
import popularProductsReducer from "./slices/popularProductsSlice"
import reviewsReducer from "./slices/reviewsSlice"

export const store = configureStore({
  reducer: {
    ratings: ratingsReducer,
    popularProducts: popularProductsReducer,
    reviews: reviewsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
