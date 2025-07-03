# KHUSHI Homes - Vercel Deployment Guide

## Overview
This guide will help you deploy the KHUSHI Homes PWA to Vercel for production use.

## Prerequisites
- Node.js 18+ installed
- Git repository
- Vercel account (free tier available)

## Quick Deployment Steps

### Method 1: Deploy from GitHub (Recommended)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Add PWA features and Vercel config"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with GitHub
   - Click "New Project"
   - Import your repository
   - Vercel will auto-detect the settings

3. **Configure Project**:
   - Project Name: `khushi-homes`
   - Framework Preset: `Vite`
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `dist` (auto-detected)
   - Install Command: `npm install` (auto-detected)

4. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete
   - Your app will be live at `https://your-project-name.vercel.app`

### Method 2: Deploy with Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel --prod
   ```

## Configuration Files Added

### 1. `vercel.json`
- Configures routing for SPA
- Sets up service worker headers
- Optimizes caching for static assets
- Handles PWA manifest properly

### 2. Updated `package.json`
- Changed name to "khushi-homes"
- Added `vercel-build` script
- Updated version to 1.0.0

### 3. Updated `vite.config.ts`
- Optimized build configuration
- Added code splitting for better performance
- Configured for production deployment

## Environment Variables (if needed)
If you add any environment variables in the future:

1. **In Vercel Dashboard**:
   - Go to Project Settings → Environment Variables
   - Add variables for Production, Preview, and Development

2. **Local Development**:
   ```bash
   # Create .env.local file
   VITE_API_URL=your_api_url
   ```

## Custom Domain Setup

1. **In Vercel Dashboard**:
   - Go to Project Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

2. **SSL Certificate**:
   - Automatically provided by Vercel
   - Required for PWA functionality

## PWA Verification

After deployment, verify PWA features:

1. **Lighthouse Audit**:
   - Open Chrome DevTools
   - Go to Lighthouse tab
   - Run PWA audit
   - Should score 90+ for PWA compliance

2. **Install Test**:
   - Visit your deployed site
   - Look for install prompt
   - Test installation on different devices

3. **Offline Test**:
   - Install the app
   - Disconnect internet
   - Verify core functionality works

## Performance Optimizations

### Automatic Optimizations by Vercel:
- ✅ Global CDN
- ✅ Automatic compression (Gzip/Brotli)
- ✅ Image optimization
- ✅ Edge caching
- ✅ HTTP/2 support

### Manual Optimizations Added:
- ✅ Code splitting in Vite config
- ✅ Service worker caching
- ✅ Optimized bundle chunks
- ✅ Proper cache headers

## Monitoring and Analytics

### Vercel Analytics (Optional):
1. Enable in Project Settings
2. Add analytics script to index.html if needed

### Performance Monitoring:
- Use Vercel's built-in performance metrics
- Monitor Core Web Vitals
- Check deployment logs for issues

## Troubleshooting

### Common Issues:

1. **Build Fails**:
   ```bash
   # Check build locally first
   npm run build
   npm run preview
   ```

2. **PWA Not Installing**:
   - Ensure HTTPS is enabled (automatic on Vercel)
   - Check manifest.json is accessible
   - Verify service worker registration

3. **Routing Issues**:
   - Verify vercel.json rewrites configuration
   - Test all routes after deployment

4. **Icons Not Loading**:
   - Check public folder structure
   - Verify icon paths in manifest.json

### Debug Commands:
```bash
# Test build locally
npm run build
npm run preview

# Check for TypeScript errors
npm run lint

# Verify all files are committed
git status
```

## Deployment Checklist

Before deploying:
- [ ] All code committed to Git
- [ ] Build works locally (`npm run build`)
- [ ] No TypeScript/ESLint errors
- [ ] PWA features tested locally
- [ ] Icons and manifest.json accessible

After deploying:
- [ ] Site loads correctly
- [ ] All routes work
- [ ] PWA install prompt appears
- [ ] Service worker registers
- [ ] Offline functionality works
- [ ] Performance audit passes

## Continuous Deployment

Vercel automatically redeploys when you push to your main branch:

1. **Make changes locally**
2. **Commit and push**:
   ```bash
   git add .
   git commit -m "Your changes"
   git push origin main
   ```
3. **Vercel automatically builds and deploys**

## Production URLs

After deployment, your app will be available at:
- **Vercel URL**: `https://your-project-name.vercel.app`
- **Custom Domain**: `https://your-domain.com` (if configured)

## Support

For deployment issues:
- Check Vercel documentation
- Review build logs in Vercel dashboard
- Test locally with `npm run build && npm run preview`

Your KHUSHI Homes PWA is now ready for production deployment on Vercel! 🚀
