@echo off
echo 🚀 Deploying Cattle AI Analyzer to Render...
echo.

echo 📋 Pre-deployment Checklist:
echo ✅ Requirements.txt updated
echo ✅ render.yaml configured
echo ✅ Model files present
echo ✅ App tested locally
echo.

echo 🌐 Deployment Options:
echo.
echo 1. Manual Deployment via Render Dashboard (Recommended)
echo    - Go to: https://dashboard.render.com
echo    - Click "New +" → "Web Service"
echo    - Connect your GitHub repository
echo    - Select the cattle_buffalo folder
echo    - Use the settings from render.yaml
echo.
echo 2. Blueprint Deployment (Automated)
echo    - Go to: https://dashboard.render.com
echo    - Click "New +" → "Blueprint"
echo    - Connect your GitHub repository
echo    - Render will auto-detect render.yaml
echo.

echo 📝 Important Notes:
echo - Make sure your code is committed to GitHub
echo - Ensure model files (*.pth) are in the repository
echo - Free tier has 15-minute sleep timeout
echo - First request after sleep takes ~30 seconds
echo.

echo 🎯 Your app will be available at:
echo https://cattle-ai-analyzer.onrender.com
echo.

echo 📊 API Endpoints:
echo - GET  / (Home page)
echo - POST /predict (Cattle classification)
echo - POST /analyze_structure (Body structure analysis)
echo.

echo 🚀 Ready to deploy! Follow the steps above.
pause
