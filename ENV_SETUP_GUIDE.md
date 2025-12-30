# Complete Environment Variables Guide - MAYA RANG

## Quick Start

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

Then edit `.env.local` with your actual credentials.

## All Environment Variables

### NextAuth (Authentication)

| Variable | Value | Example | Required |
|----------|-------|---------|----------|
| `NEXTAUTH_URL` | Your app URL | `http://localhost:3000` | ✅ Yes |
| `NEXTAUTH_SECRET` | 32+ char random string | `a1b2c3d4e5f6...` | ✅ Yes |
| `GOOGLE_CLIENT_ID` | From Google Console | `123456789.apps.googleusercontent.com` | ✅ Yes |
| `GOOGLE_CLIENT_SECRET` | From Google Console | `GOCSPX-abc123xyz...` | ✅ Yes |

### Database

| Variable | Value | Example | Required |
|----------|-------|---------|----------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/mayarang` | ✅ Yes |

### Cloudinary (Image Uploads)

| Variable | Value | Example | Required |
|----------|-------|---------|----------|
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Your cloud name | `my-cloud` | ❌ Optional* |
| `CLOUDINARY_API_KEY` | From Cloudinary | `123456789` | ❌ Optional* |
| `CLOUDINARY_API_SECRET` | From Cloudinary | `abc123xyz...` | ❌ Optional* |

*Only needed if you want to use image upload in ratings

### WhatsApp Integration

| Variable | Value | Example | Required |
|----------|-------|---------|----------|
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Phone number with country code | `8801XXXXXXXXX` | ✅ Yes |

### API Configuration

| Variable | Value | Example | Required |
|----------|-------|---------|----------|
| `NEXT_PUBLIC_API_URL` | API base URL | `http://localhost:3000` | ✅ Yes |

## Setup Instructions

### Step 1: Generate NEXTAUTH_SECRET

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and use it as `NEXTAUTH_SECRET`

### Step 2: Setup Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project → "MAYA RANG"
3. Enable "Google+ API"
4. Create OAuth 2.0 credentials (Web application)
5. Add redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Client Secret

### Step 3: Setup MongoDB

**Option A: Local MongoDB**
```
MONGODB_URI=mongodb://localhost:27017/mayarang
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create account and cluster
3. Get connection string
4. Use format: `mongodb+srv://username:password@cluster.mongodb.net/mayarang`

### Step 4: Setup Cloudinary (Optional)

1. Go to [Cloudinary](https://cloudinary.com/)
2. Sign up for free account
3. Go to Dashboard → Settings → API Keys
4. Copy Cloud Name, API Key, API Secret

### Step 5: Update WhatsApp Number

Replace `8801XXXXXXXXX` with your actual WhatsApp Business number

## Example .env.local

```env
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0

# Google OAuth
GOOGLE_CLIENT_ID=123456789-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-abcdefghijklmnop_qrstuvwxyz

# MongoDB
MONGODB_URI=mongodb://localhost:27017/mayarang

# Cloudinary (Optional)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=my-cloud
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abcdefghijklmnopqrstuvwxyz

# WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER=8801XXXXXXXXX

# API
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Environment-Specific Values

### Development

```env
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Production (e.g., Vercel)

```env
NEXTAUTH_URL=https://mayarang.com
NEXT_PUBLIC_API_URL=https://mayarang.com
```

## Important Notes

⚠️ **Never commit `.env.local` to git!**

The `.gitignore` already includes `.env.local`, but double-check it's there.

✅ **Do commit `.env.example`** with placeholder values

## Vercel Deployment

1. Go to Vercel Project Settings
2. Go to "Environment Variables"
3. Add each variable from `.env.local`
4. Redeploy

## Testing Your Setup

### Check NextAuth
1. Visit `http://localhost:3000/login`
2. Try login with Google
3. Should see your name in header after login

### Check MongoDB Connection
```javascript
// This happens automatically when you use databases
// If it fails, check MONGODB_URI format
```

### Check Cloudinary
- Try uploading image in ratings page
- Should upload without errors

### Check WhatsApp
- Visit `/contact`
- Click "Chat on WhatsApp"
- Should open WhatsApp with pre-filled message

## Troubleshooting

### "Invalid Client ID"
- Copy entire Google Client ID (including `.apps.googleusercontent.com`)
- Check it matches in Google Console

### "MongoDB connection failed"
- Check MONGODB_URI format
- Ensure MongoDB is running locally, or connection string is correct
- Verify firewall allows connection

### "WhatsApp link not working"
- Check NEXT_PUBLIC_WHATSAPP_NUMBER format (include country code)
- Number should be: countrycode+number (e.g., 8801234567890)

### "Cloudinary upload fails"
- Verify NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is correct
- Check API keys in Cloudinary dashboard

## What Each Variable Does

**NEXTAUTH_SECRET**: Encrypts session tokens. Must be 32+ characters.

**NEXTAUTH_URL**: Tells NextAuth where your app is deployed. Used for OAuth redirects.

**GOOGLE_CLIENT_ID/SECRET**: Credentials for Google OAuth login. Get from Google Console.

**MONGODB_URI**: Connection string to your MongoDB database.

**CLOUDINARY_***: Credentials for image uploads in reviews. Optional.

**NEXT_PUBLIC_WHATSAPP_NUMBER**: Phone number for WhatsApp contact integration. Public variable (visible in frontend).

**NEXT_PUBLIC_API_URL**: Base URL for API calls. Public variable (visible in frontend).

## Security Best Practices

✅ Use strong, random `NEXTAUTH_SECRET`
✅ Never share `.env.local` contents
✅ Rotate secrets periodically in production
✅ Use different secrets for dev/prod
✅ Store production secrets in secure vault
✅ Use HTTPS in production
✅ Keep `NEXT_PUBLIC_*` variables non-sensitive

---

**Questions?** Check the logs in console for detailed error messages.
