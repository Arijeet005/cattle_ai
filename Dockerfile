# This is a minimal Dockerfile to prevent Render from failing
# Render should use the render.yaml configuration instead
FROM python:3.10-slim

WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy application code
COPY . .

# Expose port
EXPOSE 5000

# Run the application
CMD ["gunicorn", "app:app", "--bind", "0.0.0.0:5000", "--workers", "1", "--timeout", "300"]
