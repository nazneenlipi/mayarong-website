# MAYA RANG E-Commerce Platform - Environment Variables & Setup Guide

## Complete Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in your project root and add the following variables:

```env
# NextAuth Configuration
NEXTAUTH_SECRET=your-generated-secret-key-min-32-chars
NEXTAUTH_URL=http://localhost:3000

# Google OAuth (Get from Google Cloud Console)
GOOGLE_ID=your-google-client-id
GOOGLE_SECRET=your-google-client-secret

# Cloudinary (For image uploads in reviews)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

# WhatsApp Integration (Optional - Add your WhatsApp Business number)
NEXT_PUBLIC_WHATSAPP_NUMBER=8801XXXXXXXXX

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 2. Generating NEXTAUTH_SECRET

Run this command in your terminal:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and paste it as your `NEXTAUTH_SECRET` value.

### 3. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials (Web application)
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (Development)
   - `https://yourdomain.com/api/auth/callback/google` (Production)
6. Copy Client ID and Client Secret to your `.env.local`

### 4. Cloudinary Setup (For Image Upload in Reviews)

1. Sign up at [Cloudinary](https://cloudinary.com)
2. Go to Dashboard and find:
   - Cloud Name
   - API Key
   - API Secret
3. Add these to your `.env.local`

### 5. WhatsApp Integration

1. Add your WhatsApp number to `NEXT_PUBLIC_WHATSAPP_NUMBER` in `.env.local`
2. Update the phone numbers in:
   - `app/contact/page.tsx`
   - `components/checkout-sidebar.tsx`

### 6. Running the Project

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
# Visit http://localhost:3000
```

## Features & Routes

### Public Routes
- `/` - Home page with hero banner (glassy effect)
- `/products` - Products listing with pagination
- `/ratings` - Customer reviews page (requires login to submit)
- `/contact` - Contact page with WhatsApp integration
- `/login` - Login with Google OAuth or demo credentials
- `/register` - User registration

### Protected Routes
- `/admin` - Admin dashboard (product management)

### Demo Credentials (for testing)
- Email: `demo@mayarang.com`
- Password: `demo123`

## Design Features

### Glassy Effects
All buttons and banners include premium glassy (glassmorphism) effects with:
- Backdrop blur: `backdrop-blur-md`
- Semi-transparent backgrounds
- Border with transparency
- Smooth hover transitions

### Button Classes
- `.btn-glass` - Basic glassy button
- `.btn-glass-primary` - Primary color glassy button
- `.btn-glass-accent` - Accent color glassy button

### Color Scheme
- **Primary**: #cf2d67 (Magenta/Pink)
- **Secondary**: #f2b6bb (Light Pink)
- **Accent**: #ffcf93 (Gold)

## Deployment

### Vercel Deployment (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your GitHub repository
4. Add environment variables in Vercel dashboard
5. Deploy!

### Environment Variables for Production

Update these URLs for production:
- `NEXTAUTH_URL=https://yourdomain.com`
- `NEXT_PUBLIC_API_URL=https://yourdomain.com`
- Update Google OAuth redirect URIs for your production domain

## Backend Setup (MongoDB)

When ready to connect MongoDB:

```bash
npm install mongoose
```

Create database models and API routes in `/app/api/` directory.

## API Routes

### Authentication
- `POST /api/auth/signin` - Sign in (NextAuth)
- `POST /api/auth/signup` - Sign up (NextAuth)
- `GET /api/auth/session` - Get current user session

### Products
- `GET /api/products` - Get all products
- `GET /api/products/[id]` - Get product details
- `POST /api/products` - Create product (admin)
- `PUT /api/products/[id]` - Update product (admin)
- `DELETE /api/products/[id]` - Delete product (admin)

### Reviews
- `GET /api/reviews` - Get all reviews
- `POST /api/reviews` - Create review
- `DELETE /api/reviews/[id]` - Delete review

## Troubleshooting

### WhatsApp Link Not Working
- Verify phone number format: `8801XXXXXXXXX`
- Ensure number has WhatsApp account
- Test with proper URL encoding

### Google OAuth Not Working
- Check `GOOGLE_ID` and `GOOGLE_SECRET` are correct
- Verify redirect URIs in Google Cloud Console
- Clear cookies and try again

### Image Upload Not Working (Cloudinary)
- Verify Cloudinary credentials
- Check file size (max 10MB recommended)
- Ensure Cloudinary API key has upload permission

### Glassy Effects Not Showing
- Clear browser cache
- Rebuild the project: `npm run build`
- Check if tailwind CSS is properly loaded

## Performance Tips

1. Use Next.js Image component for images
2. Enable static generation where possible
3. Optimize images with Cloudinary transformation URLs
4. Use Redux for state management (already configured)
5. Implement proper caching strategies

## Security Notes

- Never commit `.env.local` to version control
- Use HTTPS in production
- Validate all user inputs
- Implement rate limiting for APIs
- Keep NextAuth secret secure

## Support

For issues or questions:
- Email: support@mayarang.com
- WhatsApp: +880 1XXXXXXXXX
- GitHub Issues: [Your GitHub Repo]

---

**Last Updated**: December 2024
**Version**: 1.0.0
