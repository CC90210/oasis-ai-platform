# 🚀 OASIS AI Platform - Netlify Deployment Guide

## Why Netlify is Better (and Easier!)

✅ **Simpler deployment** - Just drag & drop or one command  
✅ **Better dashboard** - Much more intuitive UI  
✅ **Automatic SSL** - Free HTTPS certificates  
✅ **Instant rollbacks** - One-click rollback to previous versions  
✅ **Better free tier** - Generous bandwidth and build minutes  
✅ **Form handling** - Built-in form submissions (no serverless needed)  
✅ **Environment variables** - Easy to manage in dashboard  

---

## 🎯 Quick Start: 3 Ways to Deploy

### Option 1: Drag & Drop (EASIEST!)

1. Build your site:
   ```bash
   npm run build
   ```

2. Go to [app.netlify.com](https://app.netlify.com)

3. **Drag the `dist` folder** directly into the dashboard

4. DONE! 🎉

---

### Option 2: CLI Deployment (ONE COMMAND!)

1. Just run:
   ```bash
   deploy-netlify.bat
   ```

2. Follow the prompts

3. DONE! 🎉

---

### Option 3: Git Integration (AUTO-DEPLOY)

1. Push to GitHub (if not already done):
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/oasis-ai.git
   git push -u origin main
   ```

2. Go to [app.netlify.com](https://app.netlify.com)

3. Click "Import from Git"

4. Select your repo

5. Netlify will auto-deploy on every push! 🎉

---

## ⚙️ Configuration

### Build Settings (already configured in `netlify.toml`):
- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Node version:** 20

### Environment Variables

Add these in Netlify Dashboard → Site Settings → Environment Variables:

```
VITE_N8N_WEBHOOK_URL=your_webhook_url
VITE_STRIPE_PUBLIC_KEY=your_stripe_key
VITE_API_URL=your_api_url
```

---

## 🌐 Custom Domain Setup

1. In Netlify Dashboard → Domain Settings
2. Click "Add custom domain"
3. Enter: `oasisai.work`
4. Update your DNS (Cloudflare):
   - Type: `A` Record
   - Name: `@`
   - Value: Netlify's IP (shown in dashboard)
   - Or use CNAME to your Netlify subdomain

---

## 🔧 Useful Commands

```bash
# Build locally
npm run build

# Preview build locally
npm run preview

# Deploy to Netlify (production)
netlify deploy --prod --dir=dist

# Deploy preview
netlify deploy --dir=dist

# Open Netlify dashboard
netlify open
```

---

## 📊 Deployment Status

- **Platform:** Netlify
- **Auto-deploy:** Ready to enable with Git
- **Custom domain:** Ready to configure
- **SSL:** Automatic (Let's Encrypt)

---

## 🆘 Troubleshooting

**Build fails?**
- Check `npm run build` works locally first
- Review build logs in Netlify dashboard

**404 errors on routes?**
- Redirects are configured in `netlify.toml`
- Should work automatically for React Router

**Environment variables not working?**
- Make sure they start with `VITE_`
- Rebuild after adding new variables

---

## 📝 Migration from Vercel Complete!

All your code is intact. The only changes:
- ✅ Added `netlify.toml` configuration
- ✅ Added `deploy-netlify.bat` script
- 🗑️ Can delete `vercel.json` and `.vercel` folder (optional)

**Your site is ready to deploy! Just choose one of the 3 options above.** 🚀
