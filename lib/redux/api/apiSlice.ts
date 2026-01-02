import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { RootState } from "../store"

export interface Product {
  _id: string
  name: string
  price: number
  image: string
  images?: string[]
  rating: number
  reviews: number
  badge?: string
  category?: string
  description?: string
  details?: string
  colors?: string[]
  stock?: number
  status?: string
}

export interface User {
  _id: string
  name: string
  email: string
  role: string
}

export interface Order {
  _id: string
  date: string
  total: number
  status: string
  items: number
  customer?: string
  product?: string
  amount?: string // distinct from total if formatted
}

export interface Rating {
  _id: string
  productId: number
  userName: string
  rating: number
  title: string
  comment: string
  date: string
}

export interface Review {
  _id: string
  name: string
  email: string
  rating: number
  comment: string
  imageUrl?: string
  createdAt: string
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token
      if (token) {
        headers.set("authorization", `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ["User", "Product", "Order", "Rating", "Review"],
  endpoints: (builder) => ({
    // Authentication
    register: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    // Users
    getProfile: builder.query({
      query: () => "/users/profile",
      transformResponse: (response: any) => response.data,
      providesTags: ["User"],
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/users/profile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    getAllUsers: builder.query<User[], void>({
      query: () => "/users",
      transformResponse: (response: { data: User[] }) => response.data,
      providesTags: ["User"],
    }),

    // Products
    getProducts: builder.query<Product[], void>({
      query: () => "/products",
      transformResponse: (response: { data: Product[] }) => response.data,
      providesTags: ["Product"],
    }),
    getProduct: builder.query<Product, string>({
      query: (id) => `/products/${id}`,
      transformResponse: (response: { data: Product }) => response.data,
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: "/products",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: ({ _id, ...data }) => ({
        url: `/products/${_id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { _id }) => [{ type: "Product", id: _id }, "Product"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Product", id }, "Product"],
    }),

    // Orders
    createOrder: builder.mutation({
      query: (data) => ({
        url: "/orders",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Order"],
    }),
    getMyOrders: builder.query<Order[], void>({
      query: () => "/orders",
      transformResponse: (response: { data: Order[] }) => response.data,
      providesTags: ["Order"],
    }),
    getOrder: builder.query<Order, string>({
      query: (id) => `/orders/${id}`,
      transformResponse: (response: { data: Order }) => response.data,
      providesTags: (result, error, id) => [{ type: "Order", id }],
    }),
    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/orders/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Order", id }, "Order"],
    }),
    getAllOrders: builder.query<Order[], void>({
      query: () => "/orders/admin/all",
      transformResponse: (response: { data: Order[] }) => response.data,
      providesTags: ["Order"],
    }),

    // Ratings
    getRatings: builder.query<Rating[], void>({
      query: () => "/ratings",
      transformResponse: (response: { data: Rating[] }) => response.data,
      providesTags: ["Rating"],
    }),
    addRating: builder.mutation({
      query: (data) => ({
        url: "/ratings",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Rating", "Product"],
    }),
    updateRating: builder.mutation({
      query: ({ _id, ...data }) => ({
        url: `/ratings/${_id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Rating", "Product"],
    }),
    deleteRating: builder.mutation({
      query: (id) => ({
        url: `/ratings/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Rating", "Product"],
    }),

    // Reviews
    getReviews: builder.query<Review[], void>({
      query: () => "/reviews",
      transformResponse: (response: { data: Review[] }) => response.data,
      providesTags: ["Review"],
    }),
    addReview: builder.mutation({
      query: (data) => ({
        url: "/reviews",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Review", "Product"],
    }),
    updateReview: builder.mutation({
      query: ({ _id, ...data }) => ({
        url: `/reviews/${_id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Review", "Product"],
    }),
    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/reviews/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Review", "Product"],
    }),

    // System
    getHealth: builder.query({
      query: () => "/",
    }),
  }),
})

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetAllUsersQuery,
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useCreateOrderMutation,
  useGetMyOrdersQuery,
  useGetOrderQuery,
  useUpdateOrderStatusMutation,
  useGetAllOrdersQuery,
  useGetRatingsQuery,
  useAddRatingMutation,
  useUpdateRatingMutation,
  useDeleteRatingMutation,
  useGetReviewsQuery,
  useAddReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  useGetHealthQuery,
} = apiSlice
