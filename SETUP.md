# MAYA RANG E-Commerce Platform - Setup Guide

## Overview
Complete e-commerce platform with frontend (Next.js), authentication (NextAuth), and admin dashboard.

## Project Structure

```
maya-rang/
├── app/
│   ├── page.tsx              # Home page
│   ├── login/page.tsx        # Login page
│   ├── register/page.tsx     # Register page
│   ├── products/page.tsx     # Products listing
│   ├── products/[id]/page.tsx # Product details
│   ├── admin/page.tsx        # Admin dashboard
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Theme colors (Magenta & Gold)
├── components/
│   ├── header.tsx
│   ├── footer.tsx
│   ├── hero.tsx
│   ├── product-showcase.tsx
│   ├── product-card.tsx
│   └── ui/                   # shadcn components
└── public/
    └── logo.png              # MAYA RANG logo
```

## Installation

### 1. Clone or Download
```bash
# Download the ZIP from v0 and extract it
cd maya-rang
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create `.env.local` file in the root:
```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-a-32-character-random-key
MONGODB_URI=mongodb://localhost:27017/mayarang
NEXT_PUBLIC_API_URL=http://localhost:3000
```

Generate a secure secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 4. Run Development Server
```bash
npm run dev
```

Visit http://localhost:3000

## Features Implemented

### Frontend
- ✅ Home page with hero section
- ✅ Product showcase with filtering (all/watches/bags)
- ✅ Product details page with related products
- ✅ Premium design using MAYA RANG brand colors (Magenta #E91E63, Gold #FFD700)
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Dummy data for all products

### Authentication (Ready for NextAuth)
- ✅ Login page
- ✅ Register page
- ✅ Form validation UI

### Admin Dashboard
- ✅ Complete admin panel with stats
- ✅ Recent orders table
- ✅ Order management UI
- ✅ Dashboard metrics (Revenue, Orders, Customers, Products)

### Design
- ✅ All colors from your MAYA RANG logo (Magenta, Gold, with neutrals)
- ✅ Premium and modern UI
- ✅ Proper separation of concerns with component structure

## Next Steps for Backend Integration

### 1. Setup MongoDB
```bash
# Install MongoDB locally or use MongoDB Atlas
# Update MONGODB_URI in .env.local
```

### 2. Setup NextAuth
```bash
npm install next-auth
```

Create `app/api/auth/[...nextauth]/route.ts` with your auth logic.

### 3. Create API Routes
- `app/api/products/route.ts` - Get products
- `app/api/auth/login/route.ts` - Login logic
- `app/api/auth/register/route.ts` - Register logic
- `app/api/admin/orders/route.ts` - Admin orders

### 4. Connect Database to Components
Replace dummy data with real API calls:
```typescript
const response = await fetch('/api/products')
const products = await response.json()
```

## Color Theme
- **Primary (Magenta)**: #E91E63
- **Secondary (Gold)**: #FFD700
- **Background**: White
- **Text**: Dark gray/black
- **Borders**: Light magenta tint

All colors are defined in `app/globals.css` as CSS variables.

## Deployment

### Deploy to Vercel (Recommended)
```bash
npm i -g vercel
vercel login
vercel
```

### Update Environment Variables
After deployment, add env vars in Vercel dashboard:
- `NEXTAUTH_URL` = your-vercel-url.vercel.app
- `NEXTAUTH_SECRET` = your-secret-key
- `MONGODB_URI` = your-mongodb-connection
- `NEXT_PUBLIC_API_URL` = your-vercel-url.vercel.app

## File Summary

| File | Purpose |
|------|---------|
| `app/page.tsx` | Home page with featured products |
| `app/products/page.tsx` | All products with filters |
| `app/products/[id]/page.tsx` | Product detail & related items |
| `app/admin/page.tsx` | Admin dashboard with stats |
| `app/login/page.tsx` | Login form |
| `app/register/page.tsx` | Register form |
| `components/header.tsx` | Navigation header with logo |
| `components/footer.tsx` | Footer with links |
| `app/globals.css` | Theme colors & design tokens |

## Support
- All components use TypeScript
- Responsive design with Tailwind CSS
- shadcn/ui for UI components
- Next.js 16 App Router
