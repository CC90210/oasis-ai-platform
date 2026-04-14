# 🚀 DEPLOY TO OASISAI.WORK - SIMPLE 3-STEP GUIDE

**Time to Complete:** 5-10 minutes  
**Requirements:** GitHub account, Vercel account (free), Cloudflare account (you already have)

---

## ✅ EVERYTHING IS READY:

- ✅ Code is production-ready
- ✅ Build successful (no errors)
- ✅ iOS optimized
- ✅ All commits made
- ✅ Git repository initialized

---

## 🎯 STEP 1: CREATE GITHUB REPOSITORY (2 minutes)

### **A) Create Repository:**

1. **Open browser and go to:** https://github.com/new
2. **Sign in to GitHub** if prompted
3. **Fill in repository details:**
   - **Repository name:** `oasis-ai-platform`
   - **Description:** `OASIS AI Solutions - Enterprise AI Automation Platform`
   - **Visibility:** Choose Public or Private (your choice)
   - **Do NOT** check "Add a README file"
   - **Do NOT** check "Add .gitignore"
   - **Click: "Create repository"**

### **B) Push Your Code:**

4. **Copy the commands GitHub shows** (should look like):
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/oasis-ai-platform.git
   git branch -M main
   git push -u origin main
   ```

5. **Open PowerShell in your project folder:**
   - Right-click in: `C:\Users\konam\.gemini\antigravity\scratch\oasis-ai`
   - Choose "Open in Terminal" or "Open PowerShell here"

6. **Run these commands ONE BY ONE:**
   ```powershell
   # First, change branch name from master to main
   git branch -M main
   
   # Add GitHub as remote (REPLACE YOUR_USERNAME with your actual GitHub username)
   git remote add origin https://github.com/YOUR_USERNAME/oasis-ai-platform.git
   
   # Push code to GitHub
   git push -u origin main
   ```

7. **If prompted for credentials:**
   - Use your GitHub username
   - For password, use a **Personal Access Token** (not your account password)
   - Don't have a token? Generate one at: https://github.com/settings/tokens
   - Select "classic" token with `repo` scope

8. **Verify:** Refresh GitHub page - you should see all your code!

---

## 🎯 STEP 2: DEPLOY TO VERCEL (3 minutes)

### **A) Connect GitHub to Vercel:**

1. **Go to:** https://vercel.com
2. **Click "Sign Up"** or **"Log In"**
3. **Choose:** "Continue with GitHub" (easiest option)
4. **Authorize** Vercel to access your GitHub

### **B) Import Project:**

5. **Click: "Add New..." → "Project"**
6. **Find** `oasis-ai-platform` in the list
7. **Click "Import"**

### **C) Configure Deployment:**

8. **Project Settings:**
   - **Framework Preset:** Vite (should auto-detect)
   - **Root Directory:** ./ (default)
   - **Build Command:** `npm run build:prod`
   - **Output Directory:** `dist` (default)
   - **Install Command:** `npm install` (default)

9. **Environment Variables:**
   - **Click "Environment Variables"**
   - Add these (optional for now, can add later):
     ```
     VITE_API_URL=https://api.oasisai.work
     VITE_APP_URL=https://oasisai.work
     VITE_APP_ENV=production
     ```

10. **Click "Deploy"**

11. **Wait 2-3 minutes** for deployment to complete

12. **Success!** You'll get a URL like: `oasis-ai-platform.vercel.app`
    - **Click** the URL to test your site
    - **Verify** it works perfectly!

---

## 🎯 STEP 3: CONNECT YOUR DOMAIN (5 minutes)

### **A) Add Domain in Vercel:**

1. **In Vercel Dashboard**, go to your project
2. **Click "Settings"** (top navigation)
3. **Click "Domains"** (left sidebar)
4. **Type:** `oasisai.work`
5. **Click "Add"**

6. Vercel will show **DNS instructions**. You'll see:
   - **A Record:** `@ → 76.76.21.21`
   - **CNAME Record:** `www → cname.vercel-dns.com`

### **B) Configure DNS in Cloudflare:**

7. **Go to:** https://dash.cloudflare.com
8. **Select** your domain: `oasisai.work`
9. **Click "DNS"** (left sidebar)
10. **Click "Add record"**

11. **ADD A RECORD:**
    - **Type:** A
    - **Name:** @
    - **IPv4 address:** `76.76.21.21`
    - **Proxy status:** DNS only (⚠️ Important - turn OFF orange cloud)
    - **TTL:** Auto
    - **Click "Save"**

12. **ADD CNAME RECORD:**
    - **Type:** CNAME
    - **Name:** `www`
    - **Target:** `cname.vercel-dns.com`
    - **Proxy status:** DNS only (⚠️ Important - turn OFF orange cloud)
    - **TTL:** Auto
    - **Click "Save"**

### **C) Verify Domain:**

13. **Go back to Vercel** → Settings → Domains
14. **Wait 30 seconds - 2 minutes**
15. **Refresh** - Status should change to ✅ **Valid Configuration**

### **D** Go Live!**

16. **Open a new browser tab**
17. **Visit:** https://oasisai.work
18. **🎉 YOUR SITE IS LIVE!**

---

## 🔄 AUTOMATIC DEPLOYMENTS (Bonus)

**Good news:** Now every time you push to GitHub, Vercel will automatically:
- ✅ Rebuild your site
- ✅ Deploy the changes
- ✅ Update oasisai.work

**To update your site in the future:**
```powershell
# Make your changes, then:
git add .
git commit -m "Your update message"
git push
```

**That's it!** Vercel handles the rest automatically.

---

## ✅ POST-DEPLOYMENT CHECKLIST

After your site is live, test these:

- [ ] Visit https://oasisai.work - homepage loads
- [ ] Visit https://www.oasisai.work - redirects to main site
- [ ] Click through all pages (Services, Pricing, About, Contact, Portal)
- [ ] Test on mobile phone
- [ ] Test on iOS Safari (if you have iPhone/iPad)
- [ ] Submit contact form
- [ ] Check logo displays everywhere
- [ ] Test floating CTA button (scroll down)

---

## 🆘 TROUBLESHOOTING

### **Issue: DNS not propagating**
- **Solution:** Wait 1530 minutes. DNS can take time.
- **Check status:** https://dnschecker.org (enter: oasisai.work)

### **Issue: Build fails on Vercel**
- **Solution:** Check build logs in Vercel dashboard
- **Common fix:** Ensure Node version 18+ (check .nvmrc)

### **Issue: Domain shows Vercel 404**
- **Solution:** Ensure DNS records are:
  - **NOT proxied** (gray cloud in Cloudflare)
  - Pointing to correct Vercel IPs

### **Issue: SSL Certificate not ready**
- **Solution:** Wait 10-15 minutes after DNS propagation
- Vercel automatically provisions SSL (Let's Encrypt)

---

## 📞 NEED HELP?

If you get stuck:
1. Check Vercel dashboard for error messages
2. Check Vercel build logs
3. Verify DNS settings in Cloudflare match exactly
4. Wait - DNS propagation can take up to 48 hours (usually 5-30 mins)

---

## 🎉 SUCCESS CRITERIA

**You'll know it worked when:**

✅ https://oasisai.work loads your site  
✅ SSL certificate shows (🔒 padlock in browser)  
✅ All pages work perfectly  
✅ Logo displays throughout  
✅ Portal login page looks branded  
✅ Mobile responsive  
✅ iOS optimized  

---

**Your site is ready deploy!** Follow these 3 steps and you'll be live on oasisai.work in 10 minutes! 🚀

---

**Current Status:**
- ✅ Code: 100% ready
- ✅ Build: Successful
- ✅ iOS: Optimized
- ⏳ GitHub: Waiting for you to create repo
- ⏳ Vercel: Waiting for deployment
- ⏳ Domain: Waiting for DNS configuration

**Next action:** Create GitHub repository (Step 1A)
