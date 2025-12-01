@echo off
echo ============================================
echo   OASIS AI - Netlify Deployment
echo   (Much Easier Than Vercel!)
echo ============================================
echo.

REM Step 1: Build the project
echo [1/3] Building your application...
echo.
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: Build failed!
    pause
    exit /b 1
)

echo.
echo ✓ Build successful!
echo.

REM Step 2: Install Netlify CLI if not present
echo [2/3] Checking Netlify CLI...
call npx netlify --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Installing Netlify CLI...
    call npm install -g netlify-cli
)

echo.
echo ✓ Netlify CLI ready!
echo.

REM Step 3: Deploy to Netlify
echo [3/3] Deploying to Netlify...
echo.
echo Choose deployment option:
echo   1. Deploy to production (recommended)
echo   2. Deploy preview/draft
echo.
set /p choice="Enter choice (1 or 2): "

if "%choice%"=="1" (
    echo.
    echo Deploying to PRODUCTION...
    call netlify deploy --prod --dir=dist
) else (
    echo.
    echo Deploying PREVIEW...
    call netlify deploy --dir=dist
)

echo.
echo ============================================
echo   DEPLOYMENT COMPLETE!
echo ============================================
echo.
echo Your OASIS AI platform is now live!
echo.
echo Next steps:
echo 1. Go to app.netlify.com
echo 2. Add your custom domain: oasisai.work
echo 3. Set up environment variables in Site Settings
echo.
pause
