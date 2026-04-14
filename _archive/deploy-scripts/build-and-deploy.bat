@echo off
echo ============================================
echo   OASIS AI - Complete Rebuild and Deploy
echo ============================================
echo.

echo [1/3] Building fresh production version...
call npm run build

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: Build failed! Check the errors above.
    pause
    exit /b 1
)

echo.
echo ✓ Build successful!
echo.

echo [2/3] Your website is ready in the 'dist' folder!
echo.

echo [3/3] Opening dist folder for you...
explorer dist

echo.
echo ============================================
echo   READY TO DEPLOY!
echo ============================================
echo.
echo Your website is built and ready!
echo.
echo TO DEPLOY:
echo  1. Go to: https://app.netlify.com/drop
echo  2. Drag the 'dist' folder (just opened) into the browser
echo  3. Your site will be live in 30 seconds!
echo.
pause
