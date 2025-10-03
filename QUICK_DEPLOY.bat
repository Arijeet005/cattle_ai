@echo off
echo 🚀 QUICK DEPLOY TO RENDER - Cattle AI Analyzer
echo ================================================
echo.

echo 📋 STEP 1: Open Render Dashboard
echo.
echo 1. Click this link: https://dashboard.render.com
echo 2. Sign up/Login with GitHub
echo 3. Click "New +" → "Web Service"
echo.

echo 📋 STEP 2: Connect Repository
echo.
echo 1. Connect your GitHub repository
echo 2. Select the "cattle_buffalo" folder as root directory
echo 3. Use these settings:
echo.
echo    Name: cattle-ai-analyzer
echo    Environment: Python 3
echo    Root Directory: model/cattle_buffalo
echo    Build Command: pip install -r requirements.txt
echo    Start Command: gunicorn app:app --bind 0.0.0.0:$PORT --workers 1 --timeout 300
echo.

echo 📋 STEP 3: Add Environment Variables
echo.
echo Add these in the Environment tab:
echo    FLASK_ENV = production
echo    MAX_CONTENT_LENGTH = 10485760
echo    PYTHONUNBUFFERED = 1
echo.

echo 📋 STEP 4: Deploy
echo.
echo 1. Click "Create Web Service"
echo 2. Wait for deployment (~5-10 minutes)
echo 3. Your app will be live at: https://cattle-ai-analyzer.onrender.com
echo.

echo 🎯 Your app will have these endpoints:
echo    GET  / (Home page)
echo    POST /predict (Cattle classification)
echo    POST /analyze_structure (Body structure analysis)
echo.

echo ⚠️  IMPORTANT: Make sure your code is committed to GitHub first!
echo.

echo 🚀 Ready to deploy? Press any key to open Render Dashboard...
pause > nul

start https://dashboard.render.com

echo.
echo 📞 Need help? Check the DEPLOYMENT_GUIDE.md file for detailed instructions.
echo.
pause
