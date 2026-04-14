@echo off
echo ============================================
echo   OASIS AI - Vercel Deployment Script
echo ============================================
echo.

echo Step 1: Logging into Vercel...
echo.
echo This will open your browser to authenticate with Vercel.
echo Please login/signup with your GitHub account for easy integration.
echo.
pause

vercel login

echo.
echo Step 2: Deploying to Vercel...
echo.
echo This will deploy your OASIS AI platform to production!
echo.
pause

vercel --prod

echo.
echo ============================================
echo   DEPLOYMENT COMPLETE!
echo ============================================
echo.
echo Your site is now live on Vercel!
echo.
echo Next: Connect your oasisai.work domain
echo 1. Go to Vercel Dashboard
echo 2. Settings -^> Domains
echo 3. Add: oasisai.work
echo 4. Follow DNS instructions in Cloudflare
echo.
pause
