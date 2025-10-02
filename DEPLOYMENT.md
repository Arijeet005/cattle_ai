# 🚀 Deployment Guide - AI Cattle Analysis Platform

## 📋 Table of Contents
- [🌐 Heroku Deployment (Recommended)](#-heroku-deployment-recommended)
- [☁️ Railway Deployment](#️-railway-deployment)
- [🐳 Docker Deployment](#-docker-deployment)
- [🖥️ Local Network Deployment](#️-local-network-deployment)
- [⚡ Performance Optimization](#-performance-optimization)

---

## 🌐 Heroku Deployment (Recommended)

### **Prerequisites**
- Heroku account (free tier available)
- Git installed
- Heroku CLI installed

### **Step 1: Install Heroku CLI**
```bash
# Windows (using Chocolatey)
choco install heroku-cli

# Or download from: https://devcenter.heroku.com/articles/heroku-cli
```

### **Step 2: Login to Heroku**
```bash
heroku login
```

### **Step 3: Initialize Git Repository**
```bash
cd "C:\Users\HP\Desktop\cow-buffalo-classifier-main"
git init
git add .
git commit -m "Initial commit for cattle analysis platform"
```

### **Step 4: Create Heroku App**
```bash
heroku create your-cattle-analyzer
# Replace 'your-cattle-analyzer' with your preferred app name
```

### **Step 5: Set Environment Variables**
```bash
heroku config:set FLASK_ENV=production
heroku config:set MAX_CONTENT_LENGTH=10485760
```

### **Step 6: Deploy to Heroku**
```bash
git push heroku main
```

### **Step 7: Scale the App**
```bash
heroku ps:scale web=1
```

### **Step 8: Open Your App**
```bash
heroku open
```

**Your app will be live at:** `https://your-cattle-analyzer.herokuapp.com`

---

## ☁️ Railway Deployment

### **Step 1: Create Railway Account**
- Visit: https://railway.app
- Sign up with GitHub

### **Step 2: Connect Repository**
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your cattle_buffalo repository

### **Step 3: Configure Environment**
```bash
# Railway will auto-detect your Python app
# Set these environment variables in Railway dashboard:
FLASK_ENV=production
MAX_CONTENT_LENGTH=10485760
```

### **Step 4: Deploy**
- Railway automatically deploys on git push
- Your app will be available at: `https://your-app.railway.app`

---

## 🐳 Docker Deployment

### **Step 1: Create Dockerfile**
```dockerfile
FROM python:3.10-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender-dev \
    libgomp1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose port
EXPOSE 5000

# Set environment variables
ENV FLASK_ENV=production
ENV PYTHONUNBUFFERED=1

# Run the application
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "1", "--timeout", "300", "app:app"]
```

### **Step 2: Create .dockerignore**
```
__pycache__
*.pyc
.git
.gitignore
README.md
.env
.venv
```

### **Step 3: Build and Run**
```bash
# Build the image
docker build -t cattle-analyzer .

# Run the container
docker run -p 5000:5000 cattle-analyzer
```

### **Step 4: Deploy to Docker Hub**
```bash
# Tag and push
docker tag cattle-analyzer yourusername/cattle-analyzer
docker push yourusername/cattle-analyzer
```

---

## 🖥️ Local Network Deployment

### **For LAN Access (Other devices on same network)**

```bash
# Run with network access
python app.py --host=0.0.0.0 --port=5000
```

Or modify `app.py`:
```python
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)
```

**Access from other devices:** `http://YOUR_IP:5000`

### **Using Ngrok (Public tunnel)**
```bash
# Install ngrok: https://ngrok.com/
ngrok http 5000
```

---

## ⚡ Performance Optimization

### **1. Model Optimization**
```python
# In app.py, add model optimization
import torch.jit

# Optimize models with TorchScript
cattle_model = torch.jit.script(cattle_model)
breed_model = torch.jit.script(breed_model)
```

### **2. Caching Setup**
```python
# Add to requirements.txt
redis==4.5.1

# Add to app.py
from flask_caching import Cache
cache = Cache(app, config={'CACHE_TYPE': 'simple'})
```

### **3. Gunicorn Configuration**
Create `gunicorn.conf.py`:
```python
bind = "0.0.0.0:5000"
workers = 2
worker_class = "sync"
worker_connections = 1000
timeout = 300
max_requests = 1000
max_requests_jitter = 100
```

### **4. Environment Variables**
Create `.env` file:
```env
FLASK_ENV=production
MAX_CONTENT_LENGTH=10485760
MODEL_PATH=./models/
UPLOAD_FOLDER=./static/uploads/
```

---

## 🔧 Deployment Checklist

### **Before Deployment:**
- [ ] Test application locally
- [ ] Verify all model files exist
- [ ] Check requirements.txt is complete
- [ ] Ensure Procfile is correct
- [ ] Test with different image types
- [ ] Verify error handling

### **Security Considerations:**
```python
# Add to app.py for production
app.config.update(
    SESSION_COOKIE_SECURE=True,
    SESSION_COOKIE_HTTPONLY=True,
    SESSION_COOKIE_SAMESITE='Lax',
)
```

### **Performance Monitoring:**
```python
# Add logging for production
import logging
logging.basicConfig(level=logging.INFO)
```

---

## 🎯 Quick Deployment Commands

### **Heroku (Fastest)**
```bash
git init
git add .
git commit -m "Deploy cattle analyzer"
heroku create your-app-name
git push heroku main
heroku open
```

### **Railway (Easiest)**
1. Push to GitHub
2. Connect to Railway
3. Auto-deploy!

### **Docker (Most Flexible)**
```bash
docker build -t cattle-analyzer .
docker run -p 5000:5000 cattle-analyzer
```

---

## 🆘 Troubleshooting

### **Common Issues:**

1. **Model files too large for Git:**
   ```bash
   # Use Git LFS for large files
   git lfs track "*.pth"
   git add .gitattributes
   ```

2. **Memory issues on free tier:**
   - Use CPU-only PyTorch version
   - Optimize model loading
   - Reduce worker count

3. **Timeout errors:**
   - Increase timeout in Procfile
   - Optimize image processing
   - Add loading indicators

### **Support Resources:**
- Heroku Docs: https://devcenter.heroku.com/
- Railway Docs: https://docs.railway.app/
- Docker Docs: https://docs.docker.com/

---

## 🎉 Success!

Once deployed, your AI Cattle Analysis Platform will be accessible worldwide! 

**Share your deployed app URL and let users:**
- Upload cattle images
- Get AI-powered analysis
- Download professional reports
- Experience modern livestock technology

**Happy Deploying! 🚀🐄**