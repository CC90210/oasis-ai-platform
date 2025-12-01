@echo off
echo ============================================
echo   AUTOMATIC NETLIFY DEPLOYMENT
echo   Just follow the prompts!
echo ============================================
echo.
echo.

echo [1/4] Installing Netlify CLI...
echo.
call npm install -g netlify-cli
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Installing via npx instead...
    set NETLIFY_CMD=npx netlify-cli
) else (
    set NETLIFY_CMD=netlify
)

echo.
echo.
echo [2/4] Logging into Netlify...
echo.
echo This will open your browser. Since you're already logged in,
echo just click "Authorize" when it appears!
echo.
pause
call %NETLIFY_CMD% login

echo.
echo.
echo [3/4] Initializing site...
echo.
echo When asked:
echo  - "Create & configure a new site?" → Press ENTER (Yes)
echo  - "Team:" → Choose your team/account
echo  - "Site name:" → Type: oasis-ai (or press ENTER for random name)
echo.
pause
call %NETLIFY_CMD% init

echo.
echo.
echo [4/4] Deploying to production...
echo.
call %NETLIFY_CMD% deploy --prod --dir=dist

echo.
echo.
echo ============================================
echo   🎉 DEPLOYMENT COMPLETE!
echo ============================================
echo.
echo Your site is now LIVE!
echo.
echo To see your site:
call %NETLIFY_CMD% open:site
echo.
echo To open Netlify dashboard:
call %NETLIFY_CMD% open:admin
echo.
pause
