@echo off
echo ============================================
echo   OASIS AI - COMPLETE DEPLOYMENT
echo ============================================
echo.
echo This script will:
echo 1. Set up GitHub repository
echo 2. Push your code
echo 3. Deploy to Vercel
echo 4. Guide you through domain setup
echo.
echo Let's get started!
echo.
pause

echo.
echo ============================================
echo   PART 1: GITHUB SETUP
echo ============================================
call setup-github.bat

echo.
echo ============================================
echo   PART 2: VERCEL DEPLOYMENT
echo ============================================
call deploy-vercel.bat

echo.
echo ============================================
echo   PART 3: DOMAIN SETUP (oasisai.work)
echo ============================================
echo.
echo Final step: Connect your Cloudflare domain
echo.
echo 1. Go to your Vercel dashboard
echo 2. Click on your project: oasis-ai-platform
echo 3. Go to Settings -^> Domains
echo 4. Type: oasisai.work and click Add
echo.
echo 5. In Cloudflare (https://dash.cloudflare.com):
echo    - Select oasisai.work
echo    - Go to DNS -^> Records
echo    - Add A record:
echo      Type: A
echo      Name: @
echo      IPv4: 76.76.21.21
echo      Proxy: Gray cloud (DNS only)
echo.
echo    - Add CNAME record:
echo      Type: CNAME
echo      Name: www
echo      Target: cname.vercel-dns.com
echo      Proxy: Gray cloud (DNS only)
echo.
echo 6. Wait 5-15 minutes for DNS propagation
echo.
echo ============================================
echo   ALL DONE!
echo ============================================
echo.
echo Your site will be live at: https://oasisai.work
echo.
echo Opening Cloudflare DNS settings...
start https://dash.cloudflare.com
echo.
pause
