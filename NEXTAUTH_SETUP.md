# NextAuth Setup Guide - MAYA RANG

## Overview
This guide will help you set up NextAuth with Google OAuth for MAYA RANG e-commerce platform.

## What's Implemented

### Authentication Features
- ✅ Google OAuth login integration
- ✅ Email/Password credentials login (demo: demo@mayarang.com / demo123)
- ✅ Automatic redirects for protected routes
- ✅ Session management
- ✅ User info display in header

### Protected Routes
- `/admin` - Admin dashboard (requires authentication)
- `/checkout` - Checkout page (requires authentication)

### Protected Actions
- Add to Cart (users must login)
- Submit Reviews (users must login)

## Setup Instructions

### 1. Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project called "MAYA RANG"
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Select "Web application"
6. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)
7. Copy your Client ID and Client Secret

### 2. Environment Variables

Create a `.env.local` file in your project root:

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-generated-secret-key-min-32-characters
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
MONGODB_URI=mongodb://localhost:27017/mayarang
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
NEXT_PUBLIC_WHATSAPP_NUMBER=8801XXXXXXXXX
```

### 3. Generate NextAuth Secret

Run this command to generate a secure secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 4. Testing Authentication

**Demo Credentials (Email/Password):**
- Email: `demo@mayarang.com`
- Password: `demo123`

**Test Google OAuth:**
1. Click "Login" button
2. Click "Google" button
3. Sign in with your Google account
4. You'll be redirected back to the home page

## How It Works

### Login Flow
1. User clicks login button on header or navigates to `/login`
2. User can choose:
   - Google OAuth (recommended)
   - Email/Password (demo credentials)
3. NextAuth creates a session
4. User is redirected to homepage
5. Header displays user name and logout button

### Protected Routes
- Accessing `/admin` without login redirects to `/login`
- "Add to Cart" requires login
- Rating submission requires login

### Session Data
User session includes:
- `session.user.name` - User's name
- `session.user.email` - User's email
- `session.user.image` - Profile picture (if using OAuth)

## Preview Mode vs Production Mode

### Preview Mode (v0.app)
The app runs in **preview mode** by default using localStorage for authentication:
- Demo credentials work: `demo@mayarang.com` / `demo123`
- No NextAuth server needed
- No environment variables required
- Perfect for testing UI/UX
- All glassy buttons and features work

### Production Mode (Local/Vercel)
When deployed locally or to Vercel, full NextAuth is activated:
- Google OAuth integration works
- Email/Password authentication
- Session management
- Protected routes and actions

## Usage in Components

### Check if User is Logged In

```tsx
import { useSession } from "next-auth/react"

export function MyComponent() {
  const { data: session } = useSession()
  
  if (!session) {
    return <p>Please log in</p>
  }
  
  return <p>Welcome, {session.user.name}!</p>
}
```

### Protect Routes

```tsx
import { auth } from "@/auth"

export default async function AdminPage() {
  const session = await auth()
  
  if (!session) {
    redirect("/login")
  }
  
  return <div>Admin Dashboard</div>
}
```

### Sign Out

```tsx
import { signOut } from "next-auth/react"

<button onClick={() => signOut()}>
  Sign Out
</button>
```

## Files Modified

- `auth.config.ts` - NextAuth configuration
- `auth.ts` - NextAuth export
- `app/api/auth/[...nextauth]/route.ts` - API route handler
- `app/providers.tsx` - SessionProvider wrapper
- `components/header.tsx` - User info display
- `app/login/page.tsx` - Login page with OAuth
- `app/register/page.tsx` - Register page
- `components/glassy-button.tsx` - Reusable button component

## Troubleshooting

### "Invalid redirect_uri"
- Make sure your redirect URI in Google Console matches your environment
- Development: `http://localhost:3000/api/auth/callback/google`
- Production: `https://yourdomain.com/api/auth/callback/google`

### Session not persisting
- Check that `NEXTAUTH_SECRET` is set
- Check that `NEXTAUTH_URL` matches your environment
- Clear browser cookies and try again

### Google OAuth not working
- Verify Client ID and Client Secret are correct
- Check that Google+ API is enabled
- Ensure redirect URIs are whitelisted in Google Console

## Production Deployment

When deploying to production:

1. Update `NEXTAUTH_URL` to your production domain
2. Add production redirect URI to Google Console
3. Generate a new `NEXTAUTH_SECRET`
4. Use environment variables from your hosting provider

## Security Notes

- Never commit `.env.local` to git
- Use strong, unique `NEXTAUTH_SECRET`
- Rotate secrets periodically
- Use HTTPS in production
- Keep dependencies updated

## Need Help?

- [NextAuth.js Docs](https://next-auth.js.org)
- [Google OAuth Setup](https://developers.google.com/identity/protocols/oauth2)
- Check console for error messages

---

**Last Updated:** December 2024
**NextAuth Version:** 5.0.0+
**Next.js Version:** 16.0.0+
