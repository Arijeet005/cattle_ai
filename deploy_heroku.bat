@echo off
echo ====================================
echo   Cattle Analyzer - Heroku Deploy
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
echo Creating Heroku app...
set /p app_name="Enter your Heroku app name (or press Enter for auto-generated): "

if "%app_name%"=="" (
    heroku create
) else (
    heroku create %app_name%
)

echo.
echo Setting environment variables...
heroku config:set FLASK_ENV=production
heroku config:set MAX_CONTENT_LENGTH=10485760

echo.
echo Deploying to Heroku...
git push heroku main

echo.
echo Scaling the app...
heroku ps:scale web=1

echo.
echo ====================================
echo   Deployment Complete!
echo ====================================
echo.
echo Opening your app...
heroku open

echo.
echo Your cattle analysis platform is now live!
pause