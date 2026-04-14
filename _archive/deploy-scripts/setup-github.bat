@echo off
echo ============================================
echo   OASIS AI - GitHub Setup Script  
echo ============================================
echo.

echo Step 1: Creating GitHub repository...
echo.
echo Please follow these steps in your browser:
echo.
echo 1. Opening GitHub in your browser...
start https://github.com/new?name=oasis-ai-platform^&description=OASIS+AI+Platform+-+Production+Deployment
echo.
echo 2. In the GitHub page that just opened:
echo    - Repository name should be: oasis-ai-platform
echo    - Choose Public or Private (your choice)
echo    - DO NOT check "Initialize with README"
echo    - Click "Create repository"
echo.
pause

echo.
echo Step 2: What is your GitHub username?
set /p GITHUB_USERNAME="Enter your GitHub username: "

echo.
echo Step 3: Adding remote and pushing code...
git remote add origin https://github.com/%GITHUB_USERNAME%/oasis-ai-platform.git
git branch -M main
git push -u origin main

echo.
echo ============================================
echo   SUCCESS! Code pushed to GitHub
echo ============================================
echo.
echo Repository: https://github.com/%GITHUB_USERNAME%/oasis-ai-platform
echo.
pause
