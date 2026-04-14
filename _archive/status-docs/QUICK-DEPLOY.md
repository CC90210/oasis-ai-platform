# 🚀 QUICK DEPLOY TO oasisai.work

## ✅ What I've Set Up For You:

1. ✅ Git repository initialized
2. ✅ All files committed
3. ✅ Build tested and working (dist folder ready)
4. ✅ Vercel configuration (`vercel.json`) created
5. ✅ Environment variables template (`.env.example`)
6. ✅ `.gitignore` configured

---

## 📋 YOUR NEXT STEPS (5 Minutes):

### Step 1: Push to GitHub (2 minutes)

1. Go to https://github.com/new
2. Repository name: `oasis-ai-platform`
3. Make it Private or Public (your choice)
4. **DO NOT** check "Initialize with README"
5. Click "Create repository"

Then run these commands:

```bash
git remote add origin https://github.com/YOUR_USERNAME/oasis-ai-platform.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

---

### Step 2: Deploy to Vercel (2 minutes)

1. Go to **https://vercel.com**
2. Click "Sign Up" or "Login" (use GitHub for easy connection)
3. Click **"Add New..."** → **"Project"**
4. Find your `oasis-ai-platform` repository
5. Click **"Import"**
6. Vercel will auto-detect settings:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
7. Click **"Deploy"**

Wait 1-2 minutes... and your site will be live at something like:
`https://oasis-ai-platform.vercel.app`

---

### Step 3: Connect oasisai.work Domain (1 minute)

**In Vercel Dashboard:**

1. Go to your project
2. Go to **Settings** → **Domains**
3. Type: `oasisai.work`
4. Click "Add"
5. Vercel will show DNS settings

**In Cloudflare Dashboard:**

1. Log into Cloudflare
2. Select **oasisai.work**
3. Go to **DNS** → **Records**
4. Add these DNS records:

   **Option A - Using A Record (Recommended):**
   ```
   Type: A
   Name: @
   IPv4 address: 76.76.21.21
   Proxy status: DNS only (gray cloud) OR Proxied (orange) - either works
   TTL: Auto
   ```

   **For www subdomain:**
   ```
   Type: CNAME
   Name: www
   Target: cname.vercel-dns.com
   Proxy status: DNS only (gray cloud)
   TTL: Auto
   ```

   **Option B - Using CNAME (Alternative):**
   ```
   Type: CNAME
   Name: @
   Target: cname.vercel-dns.com
   Proxy status: DNS only (gray cloud)
   TTL: Auto
   ```

5. Save the records
6. Wait 5-15 minutes for DNS propagation

---

## 🎯 DONE!

After DNS propagates, your site will be live at:

### 🌐 **https://oasisai.work**

And auto-deployments are enabled! Every time you push to GitHub main branch, Vercel will automatically rebuild and deploy.

---

## 📝 Future Updates

To update your site:

```bash
# Make changes to your code
git add .
git commit -m "Your update message"
git push
```

That's it! Vercel will automatically redeploy.

---

## 🔐 SSL/HTTPS

- Vercel provides FREE SSL certificates automatically
- Your site will be HTTPS within minutes of connecting the domain
- In Cloudflare, set SSL/TLS mode to **"Full"** for best security

---

## 🆘 Troubleshooting

**Domain not working after 15 minutes?**
- Check DNS records in Cloudflare match exactly
- Try clearing your DNS cache: `ipconfig /flushdns` (Windows)
- Check https://dnschecker.org to see if DNS has propagated globally

**Build failing in Vercel?**
- Check the build logs in Vercel dashboard
- Make sure Node.js version is compatible (16.x or 18.x recommended)

---

## 📱 Share With Clients

Once live, share this link with your clients:

**https://oasisai.work**

They'll see your beautiful OASIS AI platform! 🎉
