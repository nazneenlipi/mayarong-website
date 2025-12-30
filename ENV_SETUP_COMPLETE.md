# Complete Environment Setup Guide

## All Required Environment Variables

### NextAuth Configuration
```env
# Required for authentication
NEXTAUTH_URL=http://localhost:3000          # Change to your domain in production
NEXTAUTH_SECRET=<your-32-char-secret>       # Generate: openssl rand -base64 32
```

### Google OAuth (Optional for production)
```env
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
```

### Database (For production backend)
```env
MONGODB_URI=mongodb://localhost:27017/mayarang
```

### Cloudinary (For image uploads in reviews)
```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=<your-cloud-name>
CLOUDINARY_API_KEY=<your-api-key>
CLOUDINARY_API_SECRET=<your-api-secret>
```

### WhatsApp Integration
```env
NEXT_PUBLIC_WHATSAPP_NUMBER=8801XXXXXXXXX
```

### API Configuration
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Step-by-Step Setup

### 1. Create .env.local file
In your project root, create `.env.local`:
```bash
touch .env.local
```

### 2. Generate NEXTAUTH_SECRET
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Copy the output and paste in .env.local

### 3. Add Basic Configuration
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<paste-generated-secret-here>
NEXT_PUBLIC_WHATSAPP_NUMBER=8801XXXXXXXXX
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 4. (Optional) Add Google OAuth
Only needed if you want Google login in production:
1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create OAuth 2.0 credentials
3. Add to .env.local:
```env
GOOGLE_CLIENT_ID=<your-client-id>
GOOGLE_CLIENT_SECRET=<your-client-secret>
```

### 5. (Optional) Add Cloudinary
For image uploads in reviews:
1. Create [Cloudinary](https://cloudinary.com/) account
2. Get your cloud name and API key
3. Add to .env.local:
```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=<your-cloud-name>
CLOUDINARY_API_KEY=<your-api-key>
CLOUDINARY_API_SECRET=<your-api-secret>
```

## Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Visit http://localhost:3000
```

## Testing Authentication

### Demo Credentials
- Email: demo@mayarang.com
- Password: demo123

Click Login and use these credentials to test the authentication flow.

## Vercel Deployment

1. Push to GitHub
2. Connect to Vercel
3. Add environment variables:
   - Go to Settings → Environment Variables
   - Add all required variables from above
4. Redeploy

## Troubleshooting

### NEXTAUTH_SECRET Error
- Make sure .env.local exists in project root
- Secret must be at least 32 characters
- Restart dev server after adding .env.local

### Google Login Not Working
- Check GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET
- Verify redirect URI in Google Cloud Console
- Make sure it matches: `http://localhost:3000/api/auth/callback/google`

### WhatsApp Integration Not Working
- Check NEXT_PUBLIC_WHATSAPP_NUMBER format
- Should be: country code + number (e.g., 8801XXXXXXXXX)
- Make sure it's a valid WhatsApp number

## Security Best Practices

1. Never commit .env.local to git
2. Use strong, random NEXTAUTH_SECRET
3. Keep API keys secret
4. Use HTTPS in production
5. Rotate secrets regularly
6. Monitor login attempts
7. Implement CSRF protection
