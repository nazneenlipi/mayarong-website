# MAYA RANG Backend API Documentation

## Project Overview

This is a Node.js + TypeScript + Express + MongoDB (Mongoose) backend for the MAYA RANG e-commerce platform (luxury watches & bags).

---

## Backend Setup Instructions

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- TypeScript
- Postman or similar tool for testing

### Installation

```bash
npm install
# or
yarn install
```

### Environment Variables (.env)

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/mayarang
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d
BCRYPT_ROUNDS=10
FRONTEND_URL=http://localhost:3000
```

### Run Development Server

```bash
npm run dev
# or
npm start
```

---

## Database Models (Mongoose Schemas)

### 1. User Model

```typescript
interface IUser {
  _id: ObjectId
  name: string
  email: string (unique)
  password: string (hashed)
  role: "customer" | "admin" (default: "customer")
  phone?: string
  address?: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  createdAt: Date
  updatedAt: Date
}
```

### 2. Product Model

```typescript
interface IProduct {
  _id: ObjectId
  name: string
  category: "watches" | "bags"
  description: string
  price: number
  image: string (URL)
  badge?: "New" | "Popular" | "Best Seller" | "Luxury"
  stock: number
  rating: number (0-5)
  reviews: number (count)
  createdAt: Date
  updatedAt: Date
}
```

### 3. Order Model

```typescript
interface IOrder {
  _id: ObjectId
  userId: ObjectId (ref: User)
  items: [
    {
      productId: ObjectId (ref: Product)
      name: string
      price: number
      quantity: number
    }
  ]
  totalAmount: number
  status: "Pending" | "Processing" | "Completed" | "Cancelled"
  shippingAddress: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  createdAt: Date
  updatedAt: Date
}
```

### 4. Rating Model

```typescript
interface IRating {
  _id: ObjectId
  productId: ObjectId (ref: Product)
  userId: ObjectId (ref: User)
  userName: string
  rating: number (1-5)
  title: string
  comment: string
  date: Date
  createdAt: Date
  updatedAt: Date
}
```

### 5. Review Model

```typescript
interface IReview {
  _id: ObjectId
  name: string
  email: string
  rating: number (1-5)
  comment: string
  imageUrl?: string
  createdAt: Date
  updatedAt: Date
}
```

---

## API Endpoints

### Base URL

```
http://localhost:5000/api
```

---

## 1. Authentication Endpoints

### Register User

- **POST** `/auth/register`
- **Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

- **Response (201):**

```json
{
  "message": "User registered successfully",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer"
  },
  "token": "jwt-token-here"
}
```

### Login User

- **POST** `/auth/login`
- **Request Body:**

```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

- **Response (200):**

```json
{
  "message": "Login successful",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer"
  },
  "token": "jwt-token-here"
}
```

### Logout

- **POST** `/auth/logout`
- **Response (200):**

```json
{
  "message": "Logout successful"
}
```

---

## 2. Product Endpoints

### Get All Products

- **GET** `/products`
- **Query Params (optional):**
  - `category=watches` or `category=bags`
  - `page=1`
  - `limit=10`
  - `sort=price` (asc/desc)
- **Response (200):**

```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Elegant Leather Watch",
      "category": "watches",
      "price": 15999,
      "image": "/elegant-leather-watch.jpg",
      "rating": 4.8,
      "reviews": 124,
      "badge": "New",
      "description": "A timeless leather watch perfect for any occasion",
      "stock": 25
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 48
  }
}
```

### Get Product by ID

- **GET** `/products/:id`
- **Response (200):**

```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Elegant Leather Watch",
    "category": "watches",
    "price": 15999,
    "image": "/elegant-leather-watch.jpg",
    "rating": 4.8,
    "reviews": 124,
    "description": "A timeless leather watch",
    "stock": 25
  }
}
```

### Create Product (Admin Only)

- **POST** `/products`
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**

```json
{
  "name": "Elegant Leather Watch",
  "category": "watches",
  "description": "A timeless leather watch",
  "price": 15999,
  "image": "image-url",
  "badge": "New",
  "stock": 25
}
```

- **Response (201):**

```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    /* product object */
  }
}
```

### Update Product (Admin Only)

- **PUT** `/products/:id`
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:** (same as create, partial update supported)
- **Response (200):**

```json
{
  "success": true,
  "message": "Product updated successfully",
  "data": {
    /* updated product */
  }
}
```

### Delete Product (Admin Only)

- **DELETE** `/products/:id`
- **Headers:** `Authorization: Bearer <token>`
- **Response (200):**

```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

---

## 3. Order Endpoints

### Create Order

- **POST** `/orders`
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**

```json
{
  "items": [
    {
      "productId": "507f1f77bcf86cd799439011",
      "quantity": 2
    }
  ],
  "shippingAddress": {
    "street": "123 Main St",
    "city": "Dhaka",
    "state": "Dhaka",
    "zipCode": "1200",
    "country": "Bangladesh"
  }
}
```

- **Response (201):**

```json
{
  "success": true,
  "message": "Order created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "userId": "507f1f77bcf86cd799439011",
    "items": [
      /* populated items */
    ],
    "totalAmount": 31998,
    "status": "Pending",
    "shippingAddress": {
      /* ... */
    },
    "createdAt": "2025-01-15T10:30:00Z"
  }
}
```

### Get User Orders

- **GET** `/orders`
- **Headers:** `Authorization: Bearer <token>`
- **Response (200):**

```json
{
  "success": true,
  "data": [
    /* array of orders */
  ]
}
```

### Get Order by ID

- **GET** `/orders/:id`
- **Headers:** `Authorization: Bearer <token>`
- **Response (200):**

```json
{
  "success": true,
  "data": {
    /* order object */
  }
}
```

### Update Order Status (Admin Only)

- **PATCH** `/orders/:id/status`
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**

```json
{
  "status": "Completed"
}
```

- **Response (200):**

```json
{
  "success": true,
  "message": "Order status updated",
  "data": {
    /* updated order */
  }
}
```

### Get All Orders (Admin Only)

- **GET** `/orders/admin/all`
- **Headers:** `Authorization: Bearer <token>`
- **Query Params (optional):**
  - `status=Pending`
  - `page=1`
  - `limit=10`
- **Response (200):**

```json
{
  "success": true,
  "data": [
    /* array of all orders */
  ],
  "pagination": {
    /* ... */
  }
}
```

---

## 4. Rating Endpoints

### Get Ratings for Product

- **GET** `/ratings?productId=<productId>`
- **Response (200):**

```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "productId": "507f1f77bcf86cd799439011",
      "userName": "Amira Khan",
      "rating": 5,
      "title": "Excellent quality",
      "comment": "Best watch I have ever owned",
      "date": "2025-01-15"
    }
  ]
}
```

### Create Rating

- **POST** `/ratings`
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**

```json
{
  "productId": "507f1f77bcf86cd799439011",
  "rating": 5,
  "title": "Excellent quality",
  "comment": "Best watch I have ever owned"
}
```

- **Response (201):**

```json
{
  "success": true,
  "message": "Rating created successfully",
  "data": {
    /* rating object */
  }
}
```

### Update Rating

- **PUT** `/ratings/:id`
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:** (partial update)
- **Response (200):**

```json
{
  "success": true,
  "message": "Rating updated successfully",
  "data": {
    /* updated rating */
  }
}
```

### Delete Rating

- **DELETE** `/ratings/:id`
- **Headers:** `Authorization: Bearer <token>`
- **Response (200):**

```json
{
  "success": true,
  "message": "Rating deleted successfully"
}
```

---

## 5. Review Endpoints

### Get All Reviews

- **GET** `/reviews`
- **Query Params (optional):**
  - `page=1`
  - `limit=10`
- **Response (200):**

```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439014",
      "name": "Fatima Khan",
      "email": "fatima@example.com",
      "rating": 5,
      "comment": "Amazing product quality!",
      "imageUrl": "/watch-review.jpg",
      "createdAt": "2025-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    /* ... */
  }
}
```

### Create Review

- **POST** `/reviews`
- **Request Body:**

```json
{
  "name": "Fatima Khan",
  "email": "fatima@example.com",
  "rating": 5,
  "comment": "Amazing product quality! The watch is absolutely stunning.",
  "imageUrl": "/watch-review.jpg"
}
```

- **Response (201):**

```json
{
  "success": true,
  "message": "Review created successfully",
  "data": {
    /* review object */
  }
}
```

### Update Review

- **PUT** `/reviews/:id`
- **Request Body:** (partial update)
- **Response (200):**

```json
{
  "success": true,
  "message": "Review updated successfully",
  "data": {
    /* updated review */
  }
}
```

### Delete Review (Admin Only)

- **DELETE** `/reviews/:id`
- **Headers:** `Authorization: Bearer <token>`
- **Response (200):**

```json
{
  "success": true,
  "message": "Review deleted successfully"
}
```

---

## 6. User Endpoints

### Get User Profile

- **GET** `/users/profile`
- **Headers:** `Authorization: Bearer <token>`
- **Response (200):**

```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+8801XXX",
    "address": {
      /* ... */
    },
    "role": "customer"
  }
}
```

### Update User Profile

- **PUT** `/users/profile`
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**

```json
{
  "name": "John Doe",
  "phone": "+8801XXX",
  "address": {
    "street": "123 Main St",
    "city": "Dhaka",
    "state": "Dhaka",
    "zipCode": "1200",
    "country": "Bangladesh"
  }
}
```

- **Response (200):**

```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    /* updated user */
  }
}
```

### Get All Users (Admin Only)

- **GET** `/users`
- **Headers:** `Authorization: Bearer <token>`
- **Query Params (optional):**
  - `page=1`
  - `limit=10`
  - `role=customer`
- **Response (200):**

```json
{
  "success": true,
  "data": [
    /* array of users */
  ],
  "pagination": {
    /* ... */
  }
}
```

---

## Authentication & Authorization

### JWT Token

- Tokens are issued upon successful login/registration
- Token should be included in `Authorization` header: `Bearer <token>`
- Token expiry: 7 days (configurable via `JWT_EXPIRE`)

### Protected Routes

- Routes marked with **"(Admin Only)"** require:
  - Valid JWT token
  - User role must be `"admin"`

### Error Responses

```json
{
  "success": false,
  "message": "Error message here",
  "error": "error-code"
}
```

---

## Common HTTP Status Codes

| Code | Meaning                              |
| ---- | ------------------------------------ |
| 200  | OK - Request successful              |
| 201  | Created - Resource created           |
| 400  | Bad Request - Invalid input          |
| 401  | Unauthorized - Missing/invalid token |
| 403  | Forbidden - Insufficient permissions |
| 404  | Not Found - Resource not found       |
| 500  | Server Error                         |

---

## Pagination

Endpoints that support pagination include:

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

Response includes:

```json
{
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 48,
    "pages": 5
  }
}
```

---

## Frontend Integration (.env Variables)

Update your `.env` file in the Next.js frontend:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_AUTH_URL=http://localhost:5000/api/v1/auth
```

### Example Axios Setup (Frontend)

```typescript
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

---

## Testing with Postman

1. Create a Postman collection
2. Set base URL: `{{BASE_URL}}/api` (variable: `http://localhost:5000`)
3. Use `POST /auth/login` to get a token
4. Add token to Postman environment: `{{TOKEN}}`
5. Use `Bearer {{TOKEN}}` in Authorization header for protected routes

---

## Development Tips

1. **Validation**: Use libraries like `joi` or `zod` for input validation
2. **Error Handling**: Implement centralized error handling middleware
3. **Logging**: Use `winston` or `morgan` for API logging
4. **Database**: Use MongoDB indexes on frequently queried fields (`email`, `productId`, etc.)
5. **Security**: Always hash passwords, validate inputs, use HTTPS in production

---

## Deployment Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use production MongoDB URI
- [ ] Update `FRONTEND_URL` to production frontend URL
- [ ] Set strong `JWT_SECRET`
- [ ] Enable CORS for production domain
- [ ] Set up CI/CD pipeline
- [ ] Add rate limiting
- [ ] Set up monitoring/logging

---

**Last Updated:** January 2025
