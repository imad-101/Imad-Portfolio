# Environment Variables for Production Deployment

## Required for Blog System:
1. **Database (PostgreSQL)**:
   - POSTGRES_PRISMA_URL
   - POSTGRES_URL_NON_POOLING

2. **Image Storage (Cloudinary)**:
   - NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
   - CLOUDINARY_API_KEY
   - CLOUDINARY_API_SECRET

3. **Email Service (Resend)**:
   - RESEND_API_KEY

4. **Authentication**:
   - NEXTAUTH_SECRET
   - NEXTAUTH_URL

## Setup Instructions:

### For Vercel Deployment:
1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings > Environment Variables
4. Add all the required environment variables above

### Quick Setup Services:

**Database (Free)**:
- Neon.tech or Supabase for PostgreSQL

**Image Storage (Free)**:
- Cloudinary.com (500MB free)

**Email Service (Free)**:
- Resend.com (3000 emails/month free)

### Test Locally:
1. Copy .env.example to .env.local
2. Fill in your credentials
3. Run: npm run dev

### Notes:
- The build will now succeed even without Resend API key
- Email functionality will show a user-friendly message if not configured
- All other features will work normally
