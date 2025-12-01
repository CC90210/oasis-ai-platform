# 🔗 Deploy OASIS AI via Git Integration

If you're using Git integration instead of drag-and-drop:

## Steps:

1. **Select your repository:**
   - Choose `oasis-ai` or whatever you named it
   
2. **Configure build settings:**
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Base directory:** (leave empty)

3. **Add environment variables (IMPORTANT!):**
   Click "Show advanced" → "New variable" and add:
   ```
   VITE_N8N_WEBHOOK_URL = your_webhook_url
   ```

4. **Click "Deploy site"**

5. **Wait 2-3 minutes** for the build to complete

## ✅ After Deploy:

Your site will be live at: `https://[your-site-name].netlify.app`

### Auto-Deploy Enabled!
Every time you push to GitHub, Netlify will automatically rebuild and deploy! 🎉
