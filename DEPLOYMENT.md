# OASIS AI Platform - Deployment Guide

## Your Domain: **oasisai.work**

This guide will help you deploy your OASIS AI platform to production with your Cloudflare domain.

---

## Prerequisites ✅

- [x] Domain purchased from Cloudflare: **oasisai.work**
- [ ] GitHub account (free)
- [ ] Vercel account (free) - https://vercel.com
- [ ] Git installed on your computer

---

## Step 1: Initialize Git Repository

Open terminal in your project directory and run:

```bash
git init
git add .
git commit -m "Initial commit - OASIS AI Platform"
```

---

## Step 2: Create GitHub Repository

1. Go to https://github.com/new
2. Create a new repository named `oasis-ai-platform`
3. DO NOT initialize with README (you already have code)
4. Click "Create repository"

Then push your code:

```bash
git remote add origin https://github.com/YOUR_USERNAME/oasis-ai-platform.git
git branch -M main
git push -u origin main
```

---

## Step 3: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. Go to https://vercel.com and sign up/login (use GitHub login for easy integration)
2. Click **"Add New Project"**
3. Click **"Import Git Repository"**
4. Select your `oasis-ai-platform` repository
5. Vercel will auto-detect Vite settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
6. Click **"Deploy"**

Your app will be live at: `https://oasis-ai-platform.vercel.app` (or similar)

### Option B: Deploy via Vercel CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

---

## Step 4: Connect Your Cloudflare Domain (oasisai.work)

### In Vercel:

1. Go to your project in Vercel Dashboard
2. Click **"Settings"** → **"Domains"**
3. Add your domain: **`oasisai.work`**
4. Vercel will show you DNS records to add

### In Cloudflare:

1. Log in to Cloudflare Dashboard
2. Select **oasisai.work** domain
3. Go to **DNS** → **Records**
4. Add the DNS records provided by Vercel:
   
   **For root domain (oasisai.work):**
   - Type: `A`
   - Name: `@`
   - Content: `76.76.21.21` (Vercel's IP)
   - Proxy: Either on or off (orange/gray cloud)

   **For www subdomain (www.oasisai.work):**
   - Type: `CNAME`
   - Name: `www`
   - Content: `cname.vercel-dns.com`
   - Proxy: Either on or off

5. Save the records
6. Wait 5-10 minutes for DNS propagation

### Alternative: Use CNAME for root domain

If A record doesn't work:
- Type: `CNAME`
- Name: `@`
- Content: `cname.vercel-dns.com`
- This requires "CNAME Flattening" (Cloudflare supports this)

---

## Step 5: Configure SSL/HTTPS

Both Cloudflare and Vercel provide free SSL certificates.

### In Cloudflare:
1. Go to **SSL/TLS** → **Overview**
2. Set encryption mode to **"Full"** or **"Full (strict)"**
3. Ensure **Always Use HTTPS** is enabled

### In Vercel:
- SSL is automatic! Vercel will provision a certificate within minutes

---

## Step 6: Test Your Deployment

1. Visit **https://oasisai.work**
2. Check all pages load correctly
3. Test the portal, billing, and other features
4. Ensure routing works (refresh on any page should work)

---

## Environment Variables (If Needed)

If you need to add API keys or environment variables:

1. In Vercel Dashboard → Your Project → **Settings** → **Environment Variables**
2. Add variables like:
   - `VITE_API_URL`
   - `VITE_STRIPE_PUBLIC_KEY`
   - etc.
3. Redeploy after adding environment variables

---

## Automatic Deployments

After initial setup, Vercel will automatically deploy:
- **Main branch** → Production (oasisai.work)
- **Other branches** → Preview URLs

Every `git push` triggers a new deployment!

---

## Custom Configuration

### Add www redirect:
Both `oasisai.work` and `www.oasisai.work` will work. To redirect www → non-www (or vice versa):

In Cloudflare:
- **Page Rules** → Add rule to redirect www to apex domain

---

## Monitoring & Analytics

- **Vercel Analytics**: Enable in Vercel Dashboard
- **Cloudflare Analytics**: Available in Cloudflare Dashboard
- Add Google Analytics by setting `VITE_GA_TRACKING_ID` env variable

---

## Troubleshooting

### Domain not working?
- Wait 10-15 minutes for DNS propagation
- Check DNS records are correct in Cloudflare
- Verify domain is added in Vercel

### Build failing?
- Check build logs in Vercel
- Ensure all dependencies are in `package.json`
- Run `npm run build` locally to test

### 404 errors on routes?
- Verify `vercel.json` is present with rewrite rules
- Check that SPA routing is enabled

---

## Next Steps

✅ Deploy to production
✅ Connect domain
⬜ Set up backend API
⬜ Configure Stripe billing
⬜ Set up database
⬜ Add authentication
⬜ Enable monitoring

---

## Support

- Vercel Docs: https://vercel.com/docs
- Cloudflare Docs: https://developers.cloudflare.com/
- Vite Docs: https://vitejs.dev/

---

**Your platform will be live at: https://oasisai.work** 🚀
