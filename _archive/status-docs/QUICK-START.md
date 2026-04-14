# 🎯 QUICK START: Deploy OASIS AI to Netlify NOW!

## ✅ Build Complete!
Your `dist` folder is ready with all your code.

---

## 🚀 EASIEST METHOD: Drag & Drop (2 Minutes!)

### Step 1: Sign Up/Login
1. Go to: **https://app.netlify.com**
2. Click "Sign up" (use GitHub for easy login)

### Step 2: Deploy
1. Once logged in, you'll see "Add new site"
2. Click **"Deploy manually"**
3. **DRAG the `dist` folder** from your project into the drop zone
4. Wait 10 seconds... DONE! 🎉

### Step 3: Get Your URL
- Netlify gives you a URL like: `random-name-123.netlify.app`
- Click "Site settings" → "Change site name" to customize it
- Example: `oasis-ai.netlify.app`

---

## 🔧 Add Your Environment Variables

1. In Netlify Dashboard → **Site settings**
2. Click **"Environment variables"** in sidebar
3. Add your variables:

```
VITE_N8N_WEBHOOK_URL = your_n8n_webhook_url
```

4. Click **"Deploy" → "Trigger deploy"** to rebuild with new variables

---

## 🌐 Connect Your Domain (oasisai.work)

1. In Netlify Dashboard → **Domain settings**
2. Click **"Add custom domain"**
3. Enter: `oasisai.work`
4. Netlify will show DNS instructions
5. Go to Cloudflare and add the DNS records Netlify provides

---

## 📍 YOUR FILES

- **Deployment Script:** `deploy-netlify.bat` (if you want CLI method)
- **Config File:** `netlify.toml` (already configured!)
- **Build Output:** `dist` folder (THIS is what you drag & drop!)

---

## 🎬 NEXT ACTION:

**Just open: https://app.netlify.com and drag your `dist` folder!**

That's it. Seriously. It's that easy. 😊
