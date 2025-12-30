# MAYA RANG E-Commerce Platform - Deployment & Setup Guide

## Project Structure

```
maya-rang/
├── apps/
│   ├── web/                    # Next.js Frontend (TypeScript)
│   │   ├── app/               # App Router pages
│   │   ├── components/        # Reusable React components
│   │   ├── public/            # Static assets
│   │   └── app/api/          # API routes
│   │
│   └── backend/              # Backend folder (for your MongoDB setup)
│       ├── models/           # MongoDB schemas
│       ├── routes/           # Express routes
│       ├── middleware/       # Auth middleware
│       └── config/           # Database config
│
└── README.md
```

## Getting Started

### 1. Install Dependencies

```bash
# From root directory
npm install
# or
yarn install
```

### 2. Frontend Setup

```bash
cd apps/web

# Install frontend dependencies
npm install

# Create .env.local file with:
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXTAUTH_SECRET=your-secret-key-min-32-chars
NEXTAUTH_URL=http://localhost:3000

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:3000`

### 3. Backend Setup (MongoDB)

Your backend folder is ready for setup. Here's what you need to do:

1. **Install MongoDB**: Download from https://www.mongodb.com/try/download/community
2. **Install Express.js and dependencies**:
   ```bash
   cd apps/backend
   npm init -y
   npm install express mongoose bcryptjs jsonwebtoken cors dotenv
   npm install -D nodemon @types/node typescript ts-node
   ```

3. **Create backend/.env**:
   ```
   PORT=3001
   DATABASE_URL=mongodb://localhost:27017/mayarang
   JWT_SECRET=your-secret-key-min-32-chars
   NODE_ENV=development
   ```

4. **Create backend structure**:
   ```
   backend/
   ├── models/
   │   ├── User.ts
   │   ├── Product.ts
   │   └── Order.ts
   ├── routes/
   │   ├── auth.ts
   │   ├── products.ts
   │   └── orders.ts
   ├── middleware/
   │   └── auth.ts
   ├── server.ts
   └── .env
   ```

### 4. Connect Frontend to Backend

Update `apps/web/app/api/` route handlers to call your backend:

```typescript
// Example: apps/web/app/api/auth/login/route.ts
const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/auth/login', {
  method: 'POST',
  body: JSON.stringify({ email, password })
})
```

## Environment Variables

### Frontend (.env.local)
- `NEXT_PUBLIC_API_URL` - Backend API URL
- `NEXTAUTH_SECRET` - Authentication secret (min 32 characters)
- `NEXTAUTH_URL` - Frontend URL

### Backend (.env)
- `DATABASE_URL` - MongoDB connection string
- `PORT` - Server port (default: 3001)
- `JWT_SECRET` - JWT signing secret
- `NODE_ENV` - Environment (development/production)

## Database Models (MongoDB)

### User Schema
```typescript
interface User {
  _id: ObjectId
  firstName: string
  lastName: string
  email: string (unique)
  password: string (hashed)
  phone?: string
  address?: string
  createdAt: Date
  updatedAt: Date
}
```

### Product Schema
```typescript
interface Product {
  _id: ObjectId
  name: string
  category: 'Watches' | 'Bags'
  price: number
  originalPrice: number
  description: string
  images: string[]
  rating: number
  reviews: number
  features: string[]
  specifications: Record<string, string>
  inStock: boolean
  colors: string[]
  createdAt: Date
  updatedAt: Date
}
```

### Order Schema
```typescript
interface Order {
  _id: ObjectId
  userId: ObjectId
  items: Array<{
    productId: ObjectId
    quantity: number
    price: number
  }>
  totalPrice: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered'
  shippingAddress: string
  createdAt: Date
  updatedAt: Date
}
```

## Development Workflow

1. **Frontend Development**: `cd apps/web && npm run dev`
2. **Backend Development**: `cd apps/backend && npm run dev` (if using nodemon)
3. Both servers run simultaneously on different ports

## Production Deployment

### Frontend (Vercel)
```bash
npm run build
npm run start
```

### Backend (Your choice of hosting)
- Render.com
- Railway.app
- Heroku (free tier no longer available)
- AWS EC2
- DigitalOcean

## Color Scheme (MAYA RANG Brand)

- **Primary**: #E91E63 (Magenta/Pink)
- **Accent**: #FFD700 (Gold)
- **Neutral-950**: #030712 (Dark)
- **Neutral-50**: #F9FAFB (Light)

## Features Implemented

✓ Premium product showcase with filtering
✓ Product details page with related products
✓ Customer authentication (Login/Register)
✓ Responsive design (mobile-first)
✓ Wishlist functionality
✓ Product rating and reviews display
✓ Shopping cart integration ready

## Next Steps

1. Set up your MongoDB cluster
2. Create Express backend with the models above
3. Implement authentication with JWT
4. Connect frontend API routes to backend
5. Add payment integration (Stripe/Razorpay)
6. Test end-to-end flow
7. Deploy to production

## Support

For issues or questions, refer to:
- Next.js docs: https://nextjs.org/docs
- MongoDB docs: https://docs.mongodb.com
- Express.js docs: https://expressjs.com

Happy coding!
