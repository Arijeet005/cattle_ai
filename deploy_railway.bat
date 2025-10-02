@echo off
echo ====================================
echo   Cattle Analyzer - Railway Deploy
echo ====================================
echo.

echo Checking if git is initialized...
if not exist .git (
    echo Initializing git repository...
    git init
)

echo Adding all files to git...
git add .

echo Committing changes...
set /p commit_msg="Enter commit message (or press Enter for default): "
if "%commit_msg%"=="" set commit_msg=Deploy cattle analysis platform

git commit -m "%commit_msg%"

echo.
echo ====================================
echo   Railway Deployment Instructions
echo ====================================
echo.
echo 1. Go to https://railway.app
echo 2. Sign up/Login with GitHub
echo 3. Click "New Project"
echo 4. Select "Deploy from GitHub repo"
echo 5. Choose your cattle_buffalo repository
echo 6. Railway will auto-deploy!
echo.
echo Your app will be available at:
echo https://your-app-name.railway.app
echo.
echo ====================================

echo.
echo Would you like to push to GitHub now? (y/n)
set /p push_github=
if /i "%push_github%"=="y" (
    echo.
    echo Enter your GitHub repository URL:
    set /p github_url=
    git remote add origin %github_url%
    git branch -M main
    git push -u origin main
    echo.
    echo Pushed to GitHub! Now connect to Railway.
)

pause